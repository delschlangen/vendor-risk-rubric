// Vendor Risk Assessment Calculator
// Vanilla JS, no dependencies. Works over file:// and GitHub Pages.
// All framework rules live in the config tables below (single source of truth);
// the UI, the summary and the Markdown export are all rendered from computeResults().
// User-entered text (metadata, notes, URL-hash values) is only ever written with
// textContent / value — never innerHTML.

(function () {
    'use strict';

    // The SEO title from the <title> tag; restored whenever no vendor
    // name is set (renderTier prefixes the vendor when there is one).
    const BASE_TITLE = document.title || 'Vendor Risk Assessment Calculator';

    // ---------------------------------------------------------------
    // Framework identity
    // ---------------------------------------------------------------

    const FRAMEWORK = {
        version: '1.1.0',
        released: '2026-09-15',
        repo: 'https://github.com/delschlangen/vendor-risk-rubric',
        url: 'https://delschlangen.com/vendor-risk-rubric/'
    };

    const DOCS = {
        jurisdiction: FRAMEWORK.repo + '/blob/main/docs/jurisdiction_considerations.md',
        decisionTree: FRAMEWORK.repo + '/blob/main/rubric/decision_tree.md',
        clauseMatrix: FRAMEWORK.repo + '/blob/main/clauses/contract_clauses.md#clause-selection-matrix'
    };

    // ---------------------------------------------------------------
    // Dimensions (order defines the s= digits in the URL hash and the
    // j1..j6 note params)
    // ---------------------------------------------------------------

    const DIMENSIONS = [
        {
            id: 'coEmployment',
            name: 'Co-Employment',
            fullName: 'Co-Employment Risk',
            shortLabel: 'CoEmp',
            escalationReview: 'Employment Counsel',
            levels: [
                'No vendor personnel on-site; purely transactional (SaaS, product)',
                'Occasional on-site; vendor-supervised; clear deliverables',
                'Regular on-site; some team integration; shared tools',
                'Embedded daily; company directs work; uses company email/badge'
            ]
        },
        {
            id: 'dataSensitivity',
            name: 'Data Sensitivity',
            fullName: 'Data Sensitivity & Privacy',
            shortLabel: 'Data',
            escalationReview: 'Privacy/DPO',
            levels: [
                'No access to company data',
                'Internal business data (non-sensitive); no PII',
                'PII, customer data, or contractually confidential data',
                'Regulated data (HIPAA, GDPR, financial), trade secrets, source code'
            ]
        },
        {
            id: 'physicalSafety',
            name: 'Physical Safety',
            fullName: 'Physical Safety & Injury Exposure',
            shortLabel: 'Safety',
            escalationReview: 'EHS (Environmental Health & Safety)',
            levels: [
                'Remote/virtual only; no physical presence',
                'On-site in office environment; standard hazards',
                'Equipment, vehicles, or moderate physical risk',
                'High-risk: construction, electrical, heights, confined spaces'
            ]
        },
        {
            id: 'siteAccess',
            name: 'Site & Security Access',
            fullName: 'Site & Security Access',
            shortLabel: 'Access',
            escalationReview: 'Security Assessment (InfoSec)',
            levels: [
                'No facility or system access',
                'Escorted facility access; read-only or no IT access',
                'Unescorted access; badge issued; non-production IT',
                'Data center, secure areas, or production admin access'
            ]
        },
        {
            id: 'businessContinuity',
            name: 'Business Continuity',
            fullName: 'Business Continuity Impact',
            shortLabel: 'Continuity',
            escalationReview: 'Finance (Procurement consulted)',
            levels: [
                'Easily replaceable; commoditized; no dependency',
                'Minor inconvenience; 2+ alternatives available',
                'Moderate switching cost; 30–90 day transition',
                'Single point of failure; >90 day transition; critical to revenue'
            ]
        },
        {
            id: 'aiMlRisk',
            name: 'AI/ML Risk',
            fullName: 'AI/ML Model Risk',
            shortLabel: 'AI/ML',
            escalationReview: 'AI Governance',
            levels: [
                'No AI/ML components',
                'Embedded AI; no customization; no training on your data',
                'Custom/fine-tuned models; influences decisions',
                'Trained on your data; affects customers/employees; IP concerns'
            ]
        }
    ];

    // ---------------------------------------------------------------
    // Tiers. A single dimension scored 3 does NOT change the numeric
    // tier or the timeline (per rubric/decision_tree.md); it adds the
    // specialist review, activates the Enhanced clause set and triggers
    // dimension-specific clause requirements.
    // ---------------------------------------------------------------

    const TIERS = [
        { name: 'Standard', rank: 0, min: 0, max: 5, class: 'standard', timeline: '1–2 weeks' },
        { name: 'Enhanced', rank: 1, min: 6, max: 10, class: 'enhanced', timeline: '3–6 weeks' },
        { name: 'High', rank: 2, min: 11, max: 15, class: 'high', timeline: '6–12 weeks' },
        { name: 'Critical', rank: 3, min: 16, max: 18, class: 'critical', timeline: '6–12 weeks' }
    ];

    // ---------------------------------------------------------------
    // Review rules. Evaluated against c = { tierRank, total, scores }.
    // `triggerDim`: the rule counts as "triggered" (red styling, counted
    // in the review summary) when that dimension is scored 3.
    // `rule` is the plain-English version shown in "How this result was
    // calculated" and generated from this same table so it cannot drift.
    // ---------------------------------------------------------------

    const REVIEW_RULES = [
        {
            id: 'procurement', name: 'Procurement',
            when: function () { return true; },
            why: function () { return 'All vendors'; },
            rule: 'Always required.'
        },
        {
            id: 'security', name: 'Security Assessment (InfoSec)',
            when: function (c) { return c.tierRank >= 1 || c.scores.siteAccess === 3; },
            why: function (c) { return c.scores.siteAccess === 3 ? 'Triggered: Site & Security Access = 3' : 'Enhanced tier and above'; },
            triggerDim: 'siteAccess',
            rule: 'Enhanced tier and above, or Site & Security Access = 3 at any tier.'
        },
        {
            id: 'legal', name: 'Legal Review',
            when: function (c) { return c.tierRank >= 1; },
            why: function () { return 'Enhanced tier and above'; },
            rule: 'Enhanced tier and above.'
        },
        {
            id: 'privacy', name: 'Privacy/DPO',
            when: function (c) { return (c.tierRank >= 1 && c.scores.dataSensitivity >= 2) || c.scores.dataSensitivity === 3; },
            why: function (c) { return c.scores.dataSensitivity === 3 ? 'Triggered: Data Sensitivity = 3' : 'Enhanced tier + Data Sensitivity ≥ 2 (decision tree §2 step 4)'; },
            triggerDim: 'dataSensitivity',
            rule: 'Enhanced tier and above with Data Sensitivity ≥ 2, or Data Sensitivity = 3 at any tier.'
        },
        {
            id: 'ehs', name: 'EHS (Environmental Health & Safety)',
            when: function (c) { return c.scores.physicalSafety === 3; },
            why: function () { return 'Triggered: Physical Safety = 3'; },
            triggerDim: 'physicalSafety',
            rule: 'Physical Safety = 3.'
        },
        {
            id: 'finance', name: 'Finance (vendor financial health)',
            when: function (c) { return c.tierRank >= 2 || c.scores.businessContinuity === 3; },
            why: function (c) { return c.scores.businessContinuity === 3 ? 'Triggered: Business Continuity = 3 (Procurement consulted)' : 'High/Critical tier (decision tree §3 step 6)'; },
            triggerDim: 'businessContinuity',
            rule: 'High/Critical tier, or Business Continuity = 3.'
        },
        {
            id: 'risk', name: 'Risk/Compliance (BCP review + monitoring)',
            when: function (c) { return c.tierRank >= 2; },
            why: function () { return 'High/Critical tier (decision tree §3 steps 7, 11)'; },
            rule: 'High/Critical tier.'
        },
        {
            id: 'aiGov', name: 'AI Governance',
            when: function (c) { return c.scores.aiMlRisk === 3 || (c.tierRank >= 2 && c.scores.aiMlRisk >= 2); },
            why: function (c) { return c.scores.aiMlRisk === 3 ? 'Triggered: AI/ML Risk = 3' : 'High/Critical tier + AI/ML ≥ 2 (decision tree §3 step 8)'; },
            triggerDim: 'aiMlRisk',
            rule: 'AI/ML Risk = 3 at any tier, or High/Critical tier with AI/ML Risk ≥ 2.'
        },
        {
            id: 'employment', name: 'Employment Counsel',
            when: function (c) { return c.scores.coEmployment === 3; },
            why: function () { return 'Triggered: Co-Employment = 3'; },
            triggerDim: 'coEmployment',
            rule: 'Co-Employment = 3.'
        },
        {
            id: 'executive', name: 'Executive Sponsor',
            when: function (c) { return c.tierRank >= 2; },
            why: function () { return 'High/Critical tier'; },
            rule: 'High/Critical tier.'
        },
        {
            id: 'csuite', name: 'C-Suite Approval (+ Board notification if applicable)',
            when: function (c) { return c.tierRank >= 3; },
            why: function () { return 'Critical tier'; },
            rule: 'Critical tier.'
        }
    ];

    // ---------------------------------------------------------------
    // Clauses. status(c) returns 'required' | 'recommended' | false,
    // with c = { total, scores, enhancedActive, anyDim3 } and
    // enhancedActive = total >= 6 || anyDim3.
    // ---------------------------------------------------------------

    const CLAUSE_GROUPS = [
        { key: 'standard', el: 'standardClauses', label: 'Standard Terms', summaryLabel: 'Standard', mdLabel: '**Standard Terms:** (all vendors)' },
        { key: 'enhanced', el: 'enhancedClauses', label: 'Enhanced Terms', summaryLabel: 'Enhanced', mdLabel: '**Enhanced Terms:** (Score 6+ or any dimension = 3)' },
        { key: 'highRisk', el: 'highRiskClauses', label: 'High-Risk Terms', summaryLabel: 'High-Risk', mdLabel: '**High-Risk Terms:** (Score 11+)' },
        { key: 'ai', el: 'aiClauses', label: 'AI/ML Terms', summaryLabel: 'AI/ML', mdLabel: '**AI/ML Terms:** (AI/ML Risk ≥ 2)' }
    ];

    function alwaysRequired() { return 'required'; }
    function noWhy() { return ''; }
    function enhancedRequired(c) { return c.enhancedActive ? 'required' : false; }

    const CLAUSES = [
        // Standard group — always required
        { id: 'confidentiality', group: 'standard', name: 'Confidentiality', status: alwaysRequired, why: noWhy, rule: 'Always required.' },
        { id: 'dataReturn', group: 'standard', name: 'Data Return/Destruction', status: alwaysRequired, why: noWhy, rule: 'Always required.' },
        { id: 'insurance', group: 'standard', name: 'Insurance Requirements', status: alwaysRequired, why: noWhy, rule: 'Always required.' },
        { id: 'compliance', group: 'standard', name: 'Compliance with Laws', status: alwaysRequired, why: noWhy, rule: 'Always required.' },
        { id: 'indemnification', group: 'standard', name: 'Basic Indemnification', status: alwaysRequired, why: noWhy, rule: 'Always required.' },

        // Enhanced group — score 6+ or any dimension = 3
        {
            id: 'security', group: 'enhanced', name: 'Information Security Requirements',
            status: enhancedRequired, why: noWhy,
            rule: 'Required at score 6+ or any dimension = 3.'
        },
        {
            id: 'auditRights', group: 'enhanced', name: 'Audit Rights',
            status: enhancedRequired,
            why: function (c) { return c.scores.siteAccess === 3 ? 'Site & Security Access = 3 (decision tree §4)' : ''; },
            rule: 'Required at score 6+ or any dimension = 3; specifically required when Site & Security Access = 3.'
        },
        {
            id: 'subcontractor', group: 'enhanced', name: 'Subcontractor Flow-Down',
            status: enhancedRequired, why: noWhy,
            rule: 'Required at score 6+ or any dimension = 3.'
        },
        {
            id: 'backgroundChecks', group: 'enhanced', name: 'Background Check Requirements',
            status: enhancedRequired,
            why: function (c) { return c.scores.siteAccess === 3 ? 'Site & Security Access = 3 (decision tree §4)' : ''; },
            rule: 'Required at score 6+ or any dimension = 3; specifically required when Site & Security Access = 3.'
        },
        {
            id: 'breachNotification', group: 'enhanced', name: '72-Hour Breach Notification',
            status: enhancedRequired,
            why: function (c) { return c.scores.dataSensitivity === 3 ? 'Data Sensitivity = 3 (decision tree §4)' : ''; },
            rule: 'Required at score 6+ or any dimension = 3; specifically required when Data Sensitivity = 3.'
        },

        // High-Risk group — score 11+, with single clauses also triggered
        // by a dimension = 3 (decision tree §4)
        {
            id: 'dpa', group: 'highRisk', name: 'Data Processing Agreement',
            status: function (c) { return (c.total >= 11 || c.scores.dataSensitivity === 3) ? 'required' : false; },
            why: function (c) { return (c.total < 11 && c.scores.dataSensitivity === 3) ? 'Data Sensitivity = 3 (decision tree §4)' : ''; },
            rule: 'Required at score 11+ or Data Sensitivity = 3.'
        },
        {
            id: 'bcp', group: 'highRisk', name: 'Business Continuity Plan',
            status: function (c) { return c.total >= 11 ? 'required' : (c.scores.businessContinuity === 3 ? 'recommended' : false); },
            why: function (c) { return (c.total < 11 && c.scores.businessContinuity === 3) ? 'Business Continuity = 3' : ''; },
            rule: 'Required at score 11+; recommended when Business Continuity = 3.'
        },
        {
            id: 'terminationConvenience', group: 'highRisk', name: 'Termination for Convenience (exit/transition plan)',
            status: function (c) { return (c.total >= 11 || c.scores.businessContinuity === 3) ? 'required' : false; },
            why: function (c) { return (c.total < 11 && c.scores.businessContinuity === 3) ? 'Exit/transition plan required at Business Continuity = 3' : ''; },
            rule: 'Required at score 11+ or Business Continuity = 3 (exit/transition plan).'
        },
        {
            id: 'stepIn', group: 'highRisk', name: 'Step-In Rights',
            status: function (c) { return c.total >= 11 ? 'required' : false; },
            why: noWhy,
            rule: 'Required at score 11+.'
        },
        {
            id: 'escrow', group: 'highRisk', name: 'Source Code Escrow',
            status: function (c) { return c.total >= 11 ? 'required' : (c.scores.businessContinuity === 3 ? 'recommended' : false); },
            why: function (c) { return (c.total < 11 && c.scores.businessContinuity === 3) ? 'Escrow consideration at Business Continuity = 3' : ''; },
            rule: 'Required at score 11+; recommended when Business Continuity = 3.'
        },
        {
            id: 'financialCovenants', group: 'highRisk', name: 'Financial Covenants',
            status: function (c) { return c.total >= 11 ? 'required' : (c.scores.businessContinuity === 3 ? 'recommended' : false); },
            why: function (c) { return (c.total < 11 && c.scores.businessContinuity === 3) ? 'Vendor financial health assessment at Business Continuity = 3' : ''; },
            rule: 'Required at score 11+; recommended when Business Continuity = 3.'
        },

        // AI/ML group — AI/ML Risk >= 2; Model Documentation and Model
        // Update Notification are recommended at AI/ML Risk = 1 (FAQ)
        {
            id: 'modelDocs', group: 'ai', name: 'Model Documentation',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : (c.scores.aiMlRisk === 1 ? 'recommended' : false); },
            why: function (c) { return c.scores.aiMlRisk === 1 ? 'Consider at AI/ML Risk = 1 (FAQ)' : ''; },
            rule: 'Required when AI/ML Risk ≥ 2; recommended when AI/ML Risk = 1.'
        },
        {
            id: 'trainingData', group: 'ai', name: 'Training Data Restrictions',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'outputOwnership', group: 'ai', name: 'Output Ownership',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'transparency', group: 'ai', name: 'Transparency & Explainability',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'humanOversight', group: 'ai', name: 'Human Oversight Mechanisms',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'modelUpdates', group: 'ai', name: '30-Day Model Update Notification',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : (c.scores.aiMlRisk === 1 ? 'recommended' : false); },
            why: function (c) { return c.scores.aiMlRisk === 1 ? 'Consider at AI/ML Risk = 1 (FAQ)' : ''; },
            rule: 'Required when AI/ML Risk ≥ 2; recommended when AI/ML Risk = 1.'
        },
        {
            id: 'biasTesting', group: 'ai', name: 'Bias & Fairness Testing',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'aiIncident', group: 'ai', name: 'AI Incident Response',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        },
        {
            id: 'prohibitedUses', group: 'ai', name: 'Prohibited Uses',
            status: function (c) { return c.scores.aiMlRisk >= 2 ? 'required' : false; }, why: noWhy,
            rule: 'Required when AI/ML Risk ≥ 2.'
        }
    ];

    // ---------------------------------------------------------------
    // Tier workflow steps (rubric/decision_tree.md §1–§3). Rows with a
    // third element are included only when the predicate is true against
    // c = { tierRank, total, scores }. Critical reuses the High list.
    // ---------------------------------------------------------------

    const TIER_STEPS = {
        standard: [
            ['Requestor', 'Complete vendor intake form'],
            ['Procurement', 'Review contract terms'],
            ['Procurement', 'Ensure standard clauses included'],
            ['Requestor', 'Obtain budget approval'],
            ['Procurement', 'Execute contract']
        ],
        enhanced: [
            ['Requestor', 'Complete vendor intake form + risk rubric'],
            ['InfoSec', 'Security questionnaire / assessment'],
            ['Legal', 'Review contract; negotiate key terms'],
            ['Privacy', 'Review (Data Sensitivity ≥ 2)', function (c) { return c.scores.dataSensitivity >= 2; }],
            ['Procurement', 'Incorporate required clauses'],
            ['Requestor', 'Obtain budget approval'],
            ['Legal', 'Final contract review'],
            ['Procurement', 'Execute contract']
        ],
        high: [
            ['Requestor', 'Identify executive sponsor'],
            ['Requestor', 'Complete vendor intake form + risk rubric'],
            ['InfoSec', 'Full security assessment (pen test if needed)'],
            ['Legal', 'Custom contract negotiation'],
            ['Privacy', 'Data Protection Impact Assessment (if applicable)', function (c) { return c.scores.dataSensitivity >= 2; }],
            ['Finance', 'Vendor financial health review'],
            ['Risk', 'Business continuity plan review'],
            ['AI Gov', 'AI/ML risk review (AI/ML Risk ≥ 2)', function (c) { return c.scores.aiMlRisk >= 2; }],
            ['Exec Sponsor', 'Sign-off on residual risk'],
            ['C-Suite', 'Critical only: C-suite approval; Board notification if applicable; assign dedicated risk owner', function (c) { return c.tierRank >= 3; }],
            ['Procurement', 'Execute contract'],
            ['Risk', 'Add to ongoing monitoring program']
        ]
    };

    // Specialist §4 actions appended for each dimension scored 3.
    const SPECIALIST_STEPS = {
        coEmployment: ['Employment Counsel', 'Co-Employment = 3: worker classification analysis; engagement structure review; consider SOW restructuring'],
        dataSensitivity: ['Privacy/DPO', 'Data Sensitivity = 3: DPA, cross-border transfer assessment, breach notification terms'],
        physicalSafety: ['EHS', 'Physical Safety = 3: certificate of insurance verification; safety program documentation; incident reporting protocol'],
        siteAccess: ['InfoSec', 'Site/Security Access = 3: background checks; access provisioning/deprovisioning SOP; audit rights clause'],
        businessContinuity: ['Finance', 'Business Continuity = 3: financial health assessment; exit/transition plan; escrow consideration'],
        aiMlRisk: ['AI Governance', 'AI/ML Risk = 3: model documentation; training data provenance; output monitoring; IP ownership; human oversight review']
    };

    // Ongoing monitoring (decision_tree.md §5) by tier class.
    const MONITORING = {
        standard: 'Procurement review at renewal; no ongoing monitoring required',
        enhanced: 'Re-score rubric at renewal; security re-assessment if scope changed; annual security attestation',
        high: 'Full re-assessment annually; quarterly business review; continuous monitoring',
        critical: 'Full re-assessment annually; quarterly business review; continuous monitoring; dedicated risk owner; quarterly reviews; Board notification if applicable'
    };

    // ---------------------------------------------------------------
    // Regulatory hints (docs/jurisdiction_considerations.md). Each rule
    // renders as: question → linked guide section.
    // ---------------------------------------------------------------

    const REG_HINTS = [
        {
            when: function (s) { return s.dataSensitivity >= 2; },
            q: 'Does the data include EU/UK residents?',
            a: 'GDPR Art. 28 DPA and transfer mechanism (SCCs/TIA)',
            href: DOCS.jurisdiction + '#2-gdpr-considerations'
        },
        {
            when: function (s) { return s.dataSensitivity >= 2; },
            q: 'California consumers?',
            a: 'CCPA/CPRA service-provider terms',
            href: DOCS.jurisdiction + '#3-ccpacpra-california'
        },
        {
            when: function (s) { return s.dataSensitivity === 3; },
            q: 'Protected health information?',
            a: 'HIPAA Business Associate Agreement',
            href: DOCS.jurisdiction + '#hipaa--healthcare'
        },
        {
            when: function (s) { return s.dataSensitivity === 3; },
            q: 'Consumer financial data at a financial institution?',
            a: 'GLBA Safeguards Rule service-provider oversight',
            href: DOCS.jurisdiction + '#glba--financial-services'
        },
        {
            when: function (s) { return s.dataSensitivity === 3; },
            q: 'Cross-border processing?',
            a: 'transfer assessment',
            href: DOCS.decisionTree + '#data-sensitivity--3'
        },
        {
            when: function (s) { return s.aiMlRisk >= 2; },
            q: 'Used for employment, credit, insurance, education or other high-risk decisions in the EU?',
            a: 'EU AI Act deployer obligations',
            href: DOCS.jurisdiction + '#1-eu-ai-act'
        },
        {
            when: function (s) { return s.businessContinuity >= 2; },
            q: 'Does the vendor touch financial reporting systems (public company)?',
            a: 'SOX / SOC 1 Type II terms',
            href: DOCS.jurisdiction + '#sox--financial-reporting'
        },
        {
            when: function (s) { return s.businessContinuity >= 2; },
            q: 'Are you an EU-regulated financial entity buying ICT services?',
            a: 'DORA Art. 30 contract terms and register of information',
            href: DOCS.jurisdiction + '#dora--eu-financial-sector-ict-third-party-risk'
        },
        {
            when: function (s) { return s.businessContinuity === 3; },
            q: 'Sole source or long switch time?',
            a: 'exit/transition plan and escrow consideration',
            href: DOCS.decisionTree + '#business-continuity--3'
        },
        {
            when: function (s) { return s.coEmployment === 3; },
            q: 'Worker classification analysis; consider restructuring the SOW',
            a: 'decision tree §4 guidance',
            href: DOCS.decisionTree + '#co-employment-risk--3'
        }
    ];

    // ---------------------------------------------------------------
    // Example presets (built from examples/*.md — scores in DIMENSIONS
    // order; kept consistent with the corrected v1.1.0 examples)
    // ---------------------------------------------------------------

    const PRESETS = [
        {
            id: 'ai-analytics',
            label: 'AI analytics SaaS — Enhanced, 10/18',
            source: 'examples/filled_example.md',
            meta: {
                vendor: 'Apex AI Analytics',
                service: 'AI-powered customer support triage and sentiment analysis',
                requestor: 'Customer Experience Team',
                department: 'Customer Experience',
                assessor: 'Risk & Compliance'
            },
            scores: { coEmployment: 0, dataSensitivity: 3, physicalSafety: 0, siteAccess: 2, businessContinuity: 2, aiMlRisk: 3 },
            notes: {
                dataSensitivity: 'Customer PII incl. EU/California residents; processed in US (cross-border transfer).',
                siteAccess: 'Scoped read/write API credentials to the production ticketing system; no admin or facility access.',
                businessContinuity: 'Embedded in support workflow; 30–90 day switch; few comparable alternatives.',
                aiMlRisk: 'ML classification routes tickets; optional fine-tuning on our data; black-box sentiment model influences customer-facing decisions.'
            }
        },
        {
            id: 'staffing',
            label: 'Staffing agency — High, 12/18',
            source: 'examples/staffing_agency.md',
            meta: {
                vendor: 'TalentBridge Staffing Solutions',
                service: 'Contract software developers for product team augmentation',
                requestor: 'Engineering',
                department: 'Product Development',
                assessor: 'Risk & Compliance'
            },
            scores: { coEmployment: 3, dataSensitivity: 3, physicalSafety: 1, siteAccess: 3, businessContinuity: 2, aiMlRisk: 0 },
            notes: {
                coEmployment: 'Developers embedded 12+ months, directed daily by our managers, company laptops and email.',
                dataSensitivity: 'Full source-code repository and production customer data access.',
                siteAccess: 'Unescorted badge access and production system credentials.'
            }
        },
        {
            id: 'saas',
            label: 'Low-risk SaaS — Standard, 1/18',
            source: 'examples/low_risk_saas.md',
            meta: {
                vendor: 'Diagramify',
                service: 'Cloud-based diagramming and flowchart tool',
                requestor: 'Marketing',
                department: 'Marketing Operations',
                assessor: 'Risk & Compliance'
            },
            scores: { coEmployment: 0, dataSensitivity: 1, physicalSafety: 0, siteAccess: 0, businessContinuity: 0, aiMlRisk: 0 },
            notes: {
                dataSensitivity: 'Internal, non-sensitive diagrams; policy prohibits personal data in diagrams.'
            }
        },
        {
            id: 'construction',
            label: 'Construction vendor — Enhanced, 7/18',
            source: 'examples/construction_vendor.md',
            meta: {
                vendor: 'BuildRight Commercial Construction',
                service: 'Office renovation and buildout (new floor expansion)',
                requestor: 'Facilities',
                department: 'Real Estate & Facilities',
                assessor: 'Risk & Compliance'
            },
            scores: { coEmployment: 1, dataSensitivity: 0, physicalSafety: 3, siteAccess: 2, businessContinuity: 1, aiMlRisk: 0 },
            notes: {
                physicalSafety: 'Construction work incl. heights, electrical and heavy equipment on our premises.',
                siteAccess: 'Badge access to the construction floor; escorted elsewhere; no IT systems.'
            }
        }
    ];

    // ---------------------------------------------------------------
    // State
    // ---------------------------------------------------------------

    const META_FIELDS = ['vendor', 'service', 'requestor', 'department', 'assessor', 'date', 'overview'];
    const DRAFT_KEY = 'vrr.draft.v1';
    const HASH_META_MAP = { n: 'vendor', svc: 'service', req: 'requestor', dep: 'department', asr: 'assessor', ov: 'overview' };

    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }

    function defaultState() {
        return {
            v: 1,
            meta: { vendor: '', service: '', requestor: '', department: '', assessor: '', date: todayISO(), overview: '' },
            scores: { coEmployment: 0, dataSensitivity: 0, physicalSafety: 0, siteAccess: 0, businessContinuity: 0, aiMlRisk: 0 },
            notes: { coEmployment: '', dataSensitivity: '', physicalSafety: '', siteAccess: '', businessContinuity: '', aiMlRisk: '' }
        };
    }

    const state = defaultState();

    // A stored draft offered for restore but not yet accepted/declined.
    let pendingDraft = null;
    let persistTimer = null;
    let statusTimer = null;
    let announceTimer = null;
    // Whether the "How this result was calculated" details was open
    // before beforeprint forced it open (guarded so a repeated
    // beforeprint cannot capture the forced-open state).
    let rulesUsedWasOpen = false;
    let rulesUsedForcedOpen = false;

    // ---------------------------------------------------------------
    // DOM references
    // ---------------------------------------------------------------

    function byId(id) { return document.getElementById(id); }

    const elements = {
        totalScore: byId('totalScore'),
        tierName: byId('tierName'),
        tierBadge: byId('tierBadge'),
        tierVendor: byId('tierVendor'),
        tierNote: byId('tierNote'),
        escalationWarnings: byId('escalationWarnings'),
        escalationList: byId('escalationList'),
        dimensionsSection: byId('dimensionsSection'),
        assessmentMeta: byId('assessmentMeta'),
        reviewsGrid: byId('reviewsGrid'),
        reviewSummary: byId('reviewSummary'),
        aiPairingNote: byId('aiPairingNote'),
        regHints: byId('regHints'),
        regHintList: byId('regHintList'),
        timelineDisplay: byId('timelineDisplay'),
        nextSteps: byId('nextSteps'),
        monitoring: byId('monitoring'),
        rulesUsed: byId('rulesUsed'),
        rulesUsedBody: byId('rulesUsedBody'),
        liveStatus: byId('liveStatus'),
        themeToggle: byId('themeToggle'),
        printDate: byId('printDate'),
        printLink: byId('printLink'),
        summaryText: byId('summaryText'),
        copySummaryBtn: byId('copySummaryBtn'),
        presetSelect: byId('presetSelect'),
        presetSource: byId('presetSource'),
        copyLinkBtn: byId('copyLinkBtn'),
        copyMdBtn: byId('copyMdBtn'),
        downloadMdBtn: byId('downloadMdBtn'),
        downloadJsonBtn: byId('downloadJsonBtn'),
        importJsonBtn: byId('importJsonBtn'),
        importJsonInput: byId('importJsonInput'),
        printBtn: byId('printBtn'),
        resetBtn: byId('resetBtn'),
        copyStatus: byId('copyStatus'),
        linkNotice: byId('linkNotice'),
        draftBanner: byId('draftBanner'),
        draftTime: byId('draftTime'),
        restoreDraft: byId('restoreDraft'),
        discardDraft: byId('discardDraft')
    };

    // ---------------------------------------------------------------
    // State management
    // ---------------------------------------------------------------

    // Deep-merge a partial state; scores must be integers 0–3 and
    // meta/notes must be strings or they are ignored. Writes values back
    // into the DOM.
    function applyState(partial) {
        if (!partial || typeof partial !== 'object') { return; }
        if (partial.meta && typeof partial.meta === 'object') {
            META_FIELDS.forEach(function (key) {
                if (typeof partial.meta[key] === 'string') {
                    state.meta[key] = partial.meta[key];
                }
            });
            // The date must be YYYY-MM-DD (what <input type="date">
            // produces); anything else — e.g. from a hand-edited JSON
            // import — would drift from the UI and pollute the export
            // filename and the hash, so fall back to today.
            if (!/^\d{4}-\d{2}-\d{2}$/.test(state.meta.date)) {
                state.meta.date = todayISO();
            }
        }
        if (partial.scores && typeof partial.scores === 'object') {
            DIMENSIONS.forEach(function (dim) {
                const v = partial.scores[dim.id];
                if (Number.isInteger(v) && v >= 0 && v <= 3) {
                    state.scores[dim.id] = v;
                }
            });
        }
        if (partial.notes && typeof partial.notes === 'object') {
            DIMENSIONS.forEach(function (dim) {
                if (typeof partial.notes[dim.id] === 'string') {
                    state.notes[dim.id] = partial.notes[dim.id];
                }
            });
        }
        syncDOM();
    }

    // Write state values into inputs, sliders and textareas.
    function syncDOM() {
        META_FIELDS.forEach(function (key) {
            const input = elements.assessmentMeta.querySelector('[data-field="' + key + '"]');
            if (input && input.value !== state.meta[key]) {
                input.value = state.meta[key];
            }
        });
        DIMENSIONS.forEach(function (dim) {
            const slider = byId(dim.id);
            if (slider) { slider.value = state.scores[dim.id]; }
            const note = byId('note-' + dim.id);
            if (note) {
                if (note.value !== state.notes[dim.id]) { note.value = state.notes[dim.id]; }
                autoGrow(note);
            }
        });
    }

    function autoGrow(ta) {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
    }

    // True when the state carries nothing worth saving (date is ignored).
    function stateIsPristineLike(s) {
        if (!s || typeof s !== 'object') { return true; }
        const scores = s.scores || {};
        const notes = s.notes || {};
        const meta = s.meta || {};
        const anyScore = DIMENSIONS.some(function (d) { return scores[d.id]; });
        const anyNote = DIMENSIONS.some(function (d) { return notes[d.id]; });
        const anyMeta = META_FIELDS.some(function (k) { return k !== 'date' && meta[k]; });
        return !anyScore && !anyNote && !anyMeta;
    }

    function isPristine() { return stateIsPristineLike(state); }

    // ---------------------------------------------------------------
    // Results (single computation shared by UI, summary and exports)
    // ---------------------------------------------------------------

    function computeResults() {
        const total = DIMENSIONS.reduce(function (sum, d) { return sum + state.scores[d.id]; }, 0);
        const tier = TIERS.find(function (t) { return total >= t.min && total <= t.max; }) || TIERS[0];
        const escalations = DIMENSIONS.filter(function (d) { return state.scores[d.id] === 3; });
        const anyDim3 = escalations.length > 0;

        const reviewCtx = { tierRank: tier.rank, total: total, scores: state.scores };
        const reviews = REVIEW_RULES.map(function (r) {
            const required = !!r.when(reviewCtx);
            const triggered = required && !!r.triggerDim && state.scores[r.triggerDim] === 3;
            return { id: r.id, name: r.name, required: required, triggered: triggered, why: required ? r.why(reviewCtx) : '' };
        });

        const clauseCtx = { total: total, scores: state.scores, enhancedActive: total >= 6 || anyDim3, anyDim3: anyDim3 };
        const clauses = CLAUSES.map(function (cl) {
            const status = cl.status(clauseCtx);
            return { id: cl.id, group: cl.group, name: cl.name, status: status, why: status ? cl.why(clauseCtx) : '' };
        });

        const steps = computeSteps(tier, reviewCtx);
        return {
            total: total,
            tier: tier,
            tierRank: tier.rank,
            escalations: escalations,
            reviews: reviews,
            clauses: clauses,
            timeline: tier.timeline,
            steps: steps,
            monitoring: MONITORING[tier.class],
            enhancedActive: clauseCtx.enhancedActive
        };
    }

    function computeSteps(tier, ctx) {
        const base = tier.rank >= 2 ? TIER_STEPS.high : TIER_STEPS[tier.class];
        const steps = base
            .filter(function (row) { return row.length < 3 || row[2](ctx); })
            .map(function (row) { return [row[0], row[1]]; });
        DIMENSIONS.forEach(function (dim) {
            if (state.scores[dim.id] === 3) {
                steps.push(SPECIALIST_STEPS[dim.id].slice());
            }
        });
        return steps;
    }

    // ---------------------------------------------------------------
    // Rendering
    // ---------------------------------------------------------------

    function updateDisplay() {
        const results = computeResults();
        renderTier(results);
        updateDimensionCards();
        renderEscalations(results);
        renderReviews(results);
        renderClauses(results);
        renderRegHints();
        renderTimeline(results);
        renderSummary(results);
        persist();
        announce(results);
    }

    // Debounced aria-live announcement of the headline result, so
    // screen-reader users hear the outcome of a score change without
    // a flood of intermediate updates.
    function announce(results) {
        if (!elements.liveStatus) { return; }
        if (announceTimer) { clearTimeout(announceTimer); }
        announceTimer = setTimeout(function () {
            let text = 'Total score ' + results.total + ' of 18, ' + results.tier.name +
                ' tier. Expected timeline ' + results.tier.timeline + '.';
            if (results.escalations.length > 0) {
                text += ' Specialist reviews triggered: ' +
                    results.escalations.map(function (d) { return d.escalationReview; }).join(', ') + '.';
            }
            elements.liveStatus.textContent = text;
        }, 500);
    }

    function renderTier(results) {
        elements.totalScore.textContent = results.total;
        elements.tierName.textContent = results.tier.name;
        elements.tierBadge.className = 'tier-badge ' + results.tier.class;

        const vendor = state.meta.vendor.trim();
        elements.tierVendor.textContent = vendor ? 'Assessment: ' + vendor : '';
        document.title = vendor ? vendor + ' - Vendor Risk Assessment Calculator' : BASE_TITLE;

        if (results.escalations.length > 0) {
            elements.tierNote.textContent = 'Specialist review + Enhanced clauses triggered by: ' +
                results.escalations.map(function (d) { return d.name + ' = 3'; }).join(', ');
            elements.tierNote.hidden = false;
        } else {
            elements.tierNote.textContent = '';
            elements.tierNote.hidden = true;
        }
    }

    function updateDimensionCards() {
        DIMENSIONS.forEach(function (dim) {
            const score = state.scores[dim.id];
            const card = document.querySelector('[data-dimension="' + dim.id + '"]');
            const scoreDisplay = byId(dim.id + 'Score');
            if (scoreDisplay) { scoreDisplay.textContent = score; }
            if (!card) { return; }

            card.classList.toggle('escalated', score === 3);

            let activeText = '';
            card.querySelectorAll('.score-desc').forEach(function (btn) {
                const btnScore = parseInt(btn.getAttribute('data-score'), 10);
                const active = btnScore === score;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', String(active));
                if (active) {
                    activeText = btn.textContent.replace(/^\s*\d+:\s*/, '').trim();
                }
            });

            const slider = byId(dim.id);
            if (slider && activeText) {
                slider.setAttribute('aria-valuetext', score + ' of 3: ' + activeText);
            }
        });
    }

    function renderEscalations(results) {
        if (results.escalations.length === 0) {
            elements.escalationWarnings.hidden = true;
            return;
        }
        elements.escalationWarnings.hidden = false;
        clearChildren(elements.escalationList);
        results.escalations.forEach(function (dim) {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = dim.name + ' = 3';
            li.appendChild(strong);
            li.appendChild(document.createTextNode(' → ' + dim.escalationReview + ' review required; Enhanced clause set applies'));
            elements.escalationList.appendChild(li);
        });
    }

    function renderReviews(results) {
        results.reviews.forEach(function (review) {
            const item = elements.reviewsGrid.querySelector('[data-review="' + review.id + '"]');
            if (!item) { return; }
            item.classList.toggle('inactive', !review.required);
            item.classList.toggle('triggered', review.triggered);
            const why = item.querySelector('.review-why');
            if (why) { why.textContent = review.required ? review.why : ''; }
            const stateEl = item.querySelector('.review-state');
            if (stateEl) { stateEl.textContent = review.required ? 'required' : 'not required'; }
        });

        const requiredCount = results.reviews.filter(function (r) { return r.required; }).length;
        const triggeredCount = results.reviews.filter(function (r) { return r.triggered; }).length;
        let text = requiredCount + (requiredCount === 1 ? ' review required' : ' reviews required');
        if (triggeredCount > 0) {
            text += ' (' + triggeredCount + ' triggered by a dimension scored 3)';
        }
        elements.reviewSummary.textContent = text;
    }

    function renderClauses(results) {
        CLAUSE_GROUPS.forEach(function (group) {
            const groupEl = byId(group.el);
            if (!groupEl) { return; }
            const items = results.clauses.filter(function (c) { return c.group === group.key; });
            let requiredCount = 0;
            let recommendedCount = 0;
            items.forEach(function (clause) {
                const li = groupEl.querySelector('[data-clause="' + clause.id + '"]');
                if (!li) { return; }
                if (clause.status === 'required') {
                    requiredCount += 1;
                    li.className = 'required';
                } else if (clause.status === 'recommended') {
                    recommendedCount += 1;
                    li.className = 'recommended';
                } else {
                    li.className = 'inactive';
                }
                const why = li.querySelector('.why');
                if (why) { why.textContent = clause.why || ''; }
            });
            groupEl.classList.toggle('inactive', requiredCount === 0 && recommendedCount === 0);
            const count = groupEl.querySelector('.clause-count');
            if (count) {
                let countText = requiredCount + ' of ' + items.length + ' required';
                if (recommendedCount > 0) {
                    countText += ' · ' + recommendedCount + ' recommended';
                }
                count.textContent = countText;
            }
        });

        // AI clauses can activate below Enhanced; the clause selection
        // matrix pairs them with Enhanced terms.
        elements.aiPairingNote.hidden = !(state.scores.aiMlRisk >= 2 && !results.enhancedActive);
    }

    function renderRegHints() {
        const fired = REG_HINTS.filter(function (hint) { return hint.when(state.scores); });
        clearChildren(elements.regHintList);
        if (fired.length === 0) {
            elements.regHints.hidden = true;
            return;
        }
        fired.forEach(function (hint) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(hint.q + ' → '));
            const a = document.createElement('a');
            a.href = hint.href;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = hint.a;
            const srNote = document.createElement('span');
            srNote.className = 'sr-only';
            srNote.textContent = ' (opens in new tab)';
            a.appendChild(srNote);
            li.appendChild(a);
            elements.regHintList.appendChild(li);
        });
        elements.regHints.hidden = false;
    }

    function renderTimeline(results) {
        const timelineValue = elements.timelineDisplay.querySelector('.timeline-value');
        if (timelineValue) { timelineValue.textContent = results.timeline; }

        clearChildren(elements.nextSteps);
        results.steps.forEach(function (step) {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = step[0];
            li.appendChild(strong);
            li.appendChild(document.createTextNode(' — ' + step[1]));
            elements.nextSteps.appendChild(li);
        });

        clearChildren(elements.monitoring);
        const strong = document.createElement('strong');
        strong.textContent = 'Ongoing monitoring:';
        elements.monitoring.appendChild(strong);
        elements.monitoring.appendChild(document.createTextNode(' ' + results.monitoring));
    }

    function renderSummary(results) {
        elements.summaryText.textContent = buildSummary(results);
    }

    // "How this result was calculated" — generated from the same rule
    // tables the calculator evaluates, so the text can never drift.
    function renderRulesUsed() {
        const body = elements.rulesUsedBody;
        clearChildren(body);

        const tiers = document.createElement('p');
        tiers.textContent = 'Tier by total score: ' + TIERS.map(function (t) {
            return t.min + '–' + t.max + ' ' + t.name + ' (' + t.timeline + ')';
        }).join(' · ') + '.';
        body.appendChild(tiers);

        const dim3 = document.createElement('p');
        dim3.textContent = 'Any single dimension scored 3 adds its specialist review, activates the Enhanced clause set and triggers dimension-specific clause requirements. It does not change the numeric tier or the timeline.';
        body.appendChild(dim3);

        const reviewsHeading = document.createElement('h3');
        reviewsHeading.textContent = 'Review rules';
        body.appendChild(reviewsHeading);
        const reviewList = document.createElement('ul');
        REVIEW_RULES.forEach(function (r) {
            const li = document.createElement('li');
            li.textContent = r.name + ' — ' + r.rule;
            reviewList.appendChild(li);
        });
        body.appendChild(reviewList);

        const clausesHeading = document.createElement('h3');
        clausesHeading.textContent = 'Clause rules';
        body.appendChild(clausesHeading);
        const clauseList = document.createElement('ul');
        CLAUSES.forEach(function (cl) {
            const li = document.createElement('li');
            li.textContent = cl.name + ' — ' + cl.rule;
            clauseList.appendChild(li);
        });
        body.appendChild(clauseList);

        const version = document.createElement('p');
        version.className = 'rules-version';
        version.textContent = 'Framework v' + FRAMEWORK.version + ' (' + FRAMEWORK.released + ') · rules mirror rubric/risk_rubric.md and rubric/decision_tree.md';
        body.appendChild(version);
    }

    // Single source of truth for version strings in the static HTML:
    // every .fw-version span gets "v<version>" and every .fw-released
    // span gets the release date, so bumping FRAMEWORK above updates
    // the print stamp and both footer mentions. The HTML carries the
    // same values as pre-JS fallback text.
    function setFrameworkVersionLabels() {
        document.querySelectorAll('.fw-version').forEach(function (el) {
            el.textContent = 'v' + FRAMEWORK.version;
        });
        document.querySelectorAll('.fw-released').forEach(function (el) {
            el.textContent = FRAMEWORK.released;
        });
    }

    function clearChildren(el) {
        while (el.firstChild) { el.removeChild(el.firstChild); }
    }

    // ---------------------------------------------------------------
    // URL hash + localStorage persistence
    // ---------------------------------------------------------------

    // Hash format (versioned, URLSearchParams-encoded):
    //   #v=1&s=030223&n=<vendor>&svc=<service>&req=<requestor>
    //    &dep=<department>&asr=<assessor>&d=2026-09-15&ov=<overview>
    //    &j1=..&j6=..
    // where s is six digits 0-3 in DIMENSIONS order and j1..j6 are the
    // per-dimension justifications in the same order.
    function serialize(includeNotes) {
        const p = new URLSearchParams();
        p.set('v', '1');
        p.set('s', DIMENSIONS.map(function (d) { return state.scores[d.id]; }).join(''));
        const m = state.meta;
        if (m.vendor) { p.set('n', m.vendor); }
        if (m.service) { p.set('svc', m.service); }
        if (m.requestor) { p.set('req', m.requestor); }
        if (m.department) { p.set('dep', m.department); }
        if (m.assessor) { p.set('asr', m.assessor); }
        if (m.date) { p.set('d', m.date); }
        if (includeNotes) {
            if (m.overview) { p.set('ov', m.overview); }
            DIMENSIONS.forEach(function (dim, i) {
                if (state.notes[dim.id]) { p.set('j' + (i + 1), state.notes[dim.id]); }
            });
        }
        return p.toString();
    }

    // Debounced persistence: URL hash (via replaceState) + localStorage
    // draft. Both are best-effort and wrapped in try/catch.
    function persist() {
        if (persistTimer) { clearTimeout(persistTimer); }
        persistTimer = setTimeout(persistNow, 300);
    }

    function persistNow() {
        if (persistTimer) { clearTimeout(persistTimer); persistTimer = null; }
        const pristine = isPristine();

        try {
            if (pristine) {
                if (location.hash) {
                    history.replaceState(null, '', location.pathname + location.search);
                }
                elements.linkNotice.hidden = true;
            } else {
                let hash = '#' + serialize(true);
                let omitted = false;
                if (hash.length > 6000) {
                    hash = '#' + serialize(false);
                    omitted = true;
                }
                history.replaceState(null, '', hash);
                elements.linkNotice.hidden = !omitted;
            }
        } catch (e) { /* history may be unavailable; ignore */ }

        try {
            if (pendingDraft) {
                if (pristine) {
                    // A stored draft is being offered — leave it alone
                    // until the user restores, discards, or starts typing.
                } else {
                    pendingDraft = null;
                    elements.draftBanner.hidden = true;
                    localStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: new Date().toISOString(), state: state }));
                }
            } else if (pristine) {
                localStorage.removeItem(DRAFT_KEY);
            } else {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: new Date().toISOString(), state: state }));
            }
        } catch (e) { /* storage may be unavailable; ignore */ }

        // The summary embeds location.href, which the persist just changed.
        renderSummary(computeResults());
        setPrintStamp();
    }

    // Keep the print-only header stamp (date + shareable link) in sync
    // with the current URL hash.
    function setPrintStamp() {
        if (elements.printDate) { elements.printDate.textContent = todayISO(); }
        if (elements.printLink) { elements.printLink.textContent = location.href; }
    }

    // Restore state from the URL hash. Tolerant of garbage: anything that
    // does not carry a valid six-digit s= falls back to defaults silently.
    // Returns true when a valid assessment was applied.
    function hydrateFromHash() {
        const raw = location.hash.replace(/^#/, '');
        if (!raw) { return false; }
        let params;
        try {
            params = new URLSearchParams(raw);
        } catch (e) {
            return false;
        }
        const version = params.get('v');
        if (version !== null && version !== '1') { return false; }
        const s = params.get('s');
        if (!s || !/^[0-3]{6}$/.test(s)) { return false; }

        // Overlay the hash onto a fresh default state so a share link
        // fully REPLACES whatever is on screen: defaultState() carries
        // empty strings/zeros for every key, so fields the link omits
        // are cleared rather than merged with (and leaked from) the
        // previous assessment.
        const partial = defaultState();
        DIMENSIONS.forEach(function (dim, i) {
            partial.scores[dim.id] = parseInt(s.charAt(i), 10);
        });
        Object.keys(HASH_META_MAP).forEach(function (key) {
            const value = params.get(key);
            if (typeof value === 'string' && value !== '') {
                partial.meta[HASH_META_MAP[key]] = value.slice(0, 4000);
            }
        });
        const date = params.get('d');
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            partial.meta.date = date;
        }
        DIMENSIONS.forEach(function (dim, i) {
            const value = params.get('j' + (i + 1));
            if (typeof value === 'string' && value !== '') {
                partial.notes[dim.id] = value.slice(0, 8000);
            }
        });
        applyState(partial);
        return true;
    }

    function offerDraft() {
        let draft = null;
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (raw) { draft = JSON.parse(raw); }
        } catch (e) { return; }
        if (!draft || !draft.state || stateIsPristineLike(draft.state)) { return; }
        pendingDraft = draft;
        const when = new Date(draft.savedAt);
        if (draft.savedAt && !isNaN(when.getTime())) {
            elements.draftTime.dateTime = draft.savedAt;
            elements.draftTime.textContent = when.toLocaleString();
        } else {
            elements.draftTime.textContent = 'an earlier visit';
        }
        elements.draftBanner.hidden = false;
    }

    // ---------------------------------------------------------------
    // Summary + exports
    // ---------------------------------------------------------------

    function oneLine(text) {
        return String(text == null ? '' : text).replace(/\s*[\r\n]+\s*/g, ' ').trim();
    }

    function clauseGroupSummaries(results) {
        return CLAUSE_GROUPS.map(function (group) {
            const items = results.clauses.filter(function (c) { return c.group === group.key; });
            const required = items.filter(function (c) { return c.status === 'required'; });
            const recommended = items.filter(function (c) { return c.status === 'recommended'; });
            if (required.length === 0 && recommended.length === 0) { return null; }
            let part = group.summaryLabel + ' (' + required.length + '/' + items.length;
            if (required.length > 0 && required.length < items.length) {
                part += ': ' + required.map(function (c) { return c.name; }).join(', ');
            }
            part += ')';
            if (recommended.length > 0) {
                part += ' + ' + recommended.length + ' recommended';
            }
            return part;
        }).filter(Boolean);
    }

    function buildSummary(results) {
        const lines = [];
        const m = state.meta;
        const vendor = oneLine(m.vendor);
        const service = oneLine(m.service);
        if (vendor) {
            lines.push('Vendor: ' + vendor + (service ? ' — ' + service : ''));
        } else if (service) {
            lines.push('Service: ' + service);
        }
        let assessed = 'Assessed: ' + (m.date || todayISO());
        if (m.assessor) { assessed += ' by ' + oneLine(m.assessor); }
        if (m.requestor) { assessed += ' (requestor: ' + oneLine(m.requestor) + ')'; }
        lines.push(assessed);
        lines.push('Scores: ' + DIMENSIONS.map(function (d) {
            return d.shortLabel + ' ' + state.scores[d.id];
        }).join(' · ') + ' = ' + results.total + '/18');
        let tierLine = 'Tier: ' + results.tier.name;
        if (results.escalations.length > 0) {
            tierLine += ' (dimension = 3 triggers: ' + results.escalations.map(function (d) { return d.name; }).join(', ') + ')';
        }
        lines.push(tierLine);
        lines.push('Reviews: ' + results.reviews.filter(function (r) { return r.required; }).map(function (r) { return r.name; }).join('; '));
        lines.push('Clauses: ' + clauseGroupSummaries(results).join('; '));
        lines.push('Timeline: ' + results.timeline);
        lines.push('Link: ' + location.href);
        return lines.join('\n');
    }

    // Filled version of templates/blank_assessment.md.
    function buildMarkdown(results) {
        const m = state.meta;
        const vendor = oneLine(m.vendor);
        const md = [];

        md.push('# Vendor Risk Assessment: ' + (vendor || 'Untitled'));
        md.push('');
        md.push('**Vendor Name:** ' + vendor);
        md.push('**Service/Product:** ' + oneLine(m.service));
        md.push('**Requestor:** ' + oneLine(m.requestor));
        md.push('**Department:** ' + oneLine(m.department));
        md.push('**Assessment Date:** ' + (m.date || todayISO()));
        md.push('**Assessor:** ' + oneLine(m.assessor));
        md.push('**Framework version used:** v' + FRAMEWORK.version + ' (' + FRAMEWORK.released + ')');
        md.push('**Scoring method:** [x] Calculator');
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Vendor Overview');
        md.push('');
        md.push(m.overview.trim() ? m.overview.trim() : '*Not provided.*');
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Risk Scoring');
        md.push('');
        DIMENSIONS.forEach(function (dim, i) {
            const score = state.scores[dim.id];
            md.push('### ' + (i + 1) + '. ' + dim.fullName);
            md.push('');
            md.push('**Score:** ' + score + ' — ' + dim.levels[score]);
            md.push('');
            md.push('**Justification:** ' + (state.notes[dim.id].trim() || ''));
            md.push('');
            md.push('---');
            md.push('');
        });
        md.push('## Scoring Summary');
        md.push('');
        md.push('| Dimension | Score |');
        md.push('|-----------|-------|');
        DIMENSIONS.forEach(function (dim, i) {
            md.push('| ' + (i + 1) + '. ' + dim.fullName + ' | ' + state.scores[dim.id] + ' |');
        });
        md.push('| **TOTAL** | **' + results.total + ' / 18** |');
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Risk Tier');
        md.push('');
        md.push('**Total Score:** ' + results.total);
        md.push('');
        md.push('| Score Range | Tier | Result |');
        md.push('|-------------|------|--------|');
        TIERS.forEach(function (tier) {
            md.push('| ' + tier.min + '–' + tier.max + ' | ' + tier.name + ' | [' + (tier.name === results.tier.name ? 'x' : ' ') + '] |');
        });
        md.push('');
        md.push('**Automatic Escalations Triggered:**');
        DIMENSIONS.forEach(function (dim) {
            const checked = state.scores[dim.id] === 3;
            md.push('- [' + (checked ? 'x' : ' ') + '] ' + dim.name + ' = 3 → ' + dim.escalationReview + ' review required');
        });
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Required Reviews');
        md.push('');
        md.push('| Review | Required? | Reason |');
        md.push('|--------|-----------|--------|');
        results.reviews.forEach(function (review) {
            md.push('| ' + review.name + ' | ' + (review.required ? 'Yes' : 'No') + ' | ' + (review.required ? review.why : '—') + ' |');
        });
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Required Contract Clauses');
        md.push('');
        CLAUSE_GROUPS.forEach(function (group) {
            md.push(group.mdLabel);
            results.clauses.filter(function (c) { return c.group === group.key; }).forEach(function (clause) {
                if (clause.status === 'required') {
                    md.push('- [x] ' + clause.name + (clause.why ? ' — ' + clause.why : ''));
                } else if (clause.status === 'recommended') {
                    md.push('- [~] ' + clause.name + ' (recommended)' + (clause.why ? ' — ' + clause.why : ''));
                } else {
                    md.push('- [ ] ' + clause.name);
                }
            });
            md.push('');
        });
        md.push('---');
        md.push('');
        md.push('## Next Steps');
        md.push('');
        results.steps.forEach(function (step, i) {
            md.push((i + 1) + '. **' + step[0] + '** — ' + step[1]);
        });
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Ongoing Monitoring Requirements');
        md.push('');
        results.monitoring.split('; ').forEach(function (item) {
            md.push('- [ ] ' + item.charAt(0).toUpperCase() + item.slice(1));
        });
        md.push('');
        md.push('---');
        md.push('');
        md.push('## Approval Chain');
        md.push('');
        md.push('| Role | Name | Signature | Date |');
        md.push('|------|------|-----------|------|');
        md.push('| Requestor | | [ ] Approved | |');
        md.push('| InfoSec | | [ ] Approved / [ ] N/A | |');
        md.push('| Privacy | | [ ] Approved / [ ] N/A | |');
        md.push('| Legal | | [ ] Approved / [ ] N/A | |');
        md.push('| EHS | | [ ] Approved / [ ] N/A | |');
        md.push('| Finance | | [ ] Approved / [ ] N/A | |');
        md.push('| AI Governance | | [ ] Approved / [ ] N/A | |');
        md.push('| Executive Sponsor | | [ ] Approved / [ ] N/A | |');
        md.push('| Procurement | | [ ] Approved | |');
        md.push('');
        md.push('---');
        md.push('');
        md.push('*Generated by the Vendor Risk Assessment Calculator v' + FRAMEWORK.version + ' on ' + todayISO() + ' — ' + location.href + '*');
        md.push('');
        return md.join('\n');
    }

    function slug(text) {
        return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
    }

    function exportFilename(ext) {
        const base = slug(state.meta.vendor) || 'assessment';
        // Belt and braces: only a well-formed date goes into the
        // suggested filename (applyState validates on ingest too).
        const date = /^\d{4}-\d{2}-\d{2}$/.test(state.meta.date) ? state.meta.date : todayISO();
        return 'vendor-risk-' + base + '-' + date + '.' + ext;
    }

    function downloadFile(filename, mime, content) {
        try {
            const blob = new Blob([content], { type: mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        } catch (e) {
            showStatus('Download failed');
        }
    }

    // ---------------------------------------------------------------
    // Clipboard
    // ---------------------------------------------------------------

    function copyText(text, okMsg) {
        function fallback() {
            if (fallbackCopy(text)) {
                showStatus(okMsg);
            } else {
                showStatus('Copy failed — select the text and copy manually');
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { showStatus(okMsg); }, fallback);
        } else {
            fallback();
        }
    }

    function fallbackCopy(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return ok;
        } catch (e) {
            return false;
        }
    }

    function showStatus(message) {
        elements.copyStatus.textContent = message;
        elements.copyStatus.hidden = false;
        if (statusTimer) { clearTimeout(statusTimer); }
        statusTimer = setTimeout(function () {
            elements.copyStatus.hidden = true;
            elements.copyStatus.textContent = '';
        }, 2000);
    }

    // ---------------------------------------------------------------
    // Import validation
    // ---------------------------------------------------------------

    function validImport(data) {
        if (!data || typeof data !== 'object' || data.v !== 1) { return false; }
        if (!data.scores || typeof data.scores !== 'object') { return false; }
        for (let i = 0; i < DIMENSIONS.length; i++) {
            const v = data.scores[DIMENSIONS[i].id];
            if (!Number.isInteger(v) || v < 0 || v > 3) { return false; }
        }
        if (data.meta != null) {
            if (typeof data.meta !== 'object') { return false; }
            for (let i = 0; i < META_FIELDS.length; i++) {
                const key = META_FIELDS[i];
                if (key in data.meta && typeof data.meta[key] !== 'string') { return false; }
            }
        }
        if (data.notes != null) {
            if (typeof data.notes !== 'object') { return false; }
            for (let i = 0; i < DIMENSIONS.length; i++) {
                const key = DIMENSIONS[i].id;
                if (key in data.notes && typeof data.notes[key] !== 'string') { return false; }
            }
        }
        return true;
    }

    // ---------------------------------------------------------------
    // Theme (light/dark). CSS follows the OS via prefers-color-scheme;
    // an explicit choice is stored in localStorage and mirrored as the
    // data-theme attribute on <html> (also pre-applied by a tiny inline
    // script in <head> to avoid a flash). All storage is best-effort.
    // ---------------------------------------------------------------

    const THEME_KEY = 'vrr.theme';

    function systemPrefersDark() {
        try {
            return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        } catch (e) {
            return false;
        }
    }

    // The theme in effect right now: the explicit data-theme attribute
    // when present, the OS preference otherwise.
    function currentTheme() {
        const attr = document.documentElement.getAttribute('data-theme');
        if (attr === 'dark' || attr === 'light') { return attr; }
        return systemPrefersDark() ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeButton();
    }

    function updateThemeButton() {
        if (!elements.themeToggle) { return; }
        elements.themeToggle.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    }

    // ---------------------------------------------------------------
    // Event binding
    // ---------------------------------------------------------------

    function dismissDraftOffer() {
        pendingDraft = null;
        elements.draftBanner.hidden = true;
    }

    function bindEvents() {
        // Sliders
        DIMENSIONS.forEach(function (dim) {
            const slider = byId(dim.id);
            if (slider) {
                slider.addEventListener('input', function () {
                    state.scores[dim.id] = parseInt(this.value, 10) || 0;
                    updateDisplay();
                });
            }
        });

        // Score-description buttons + mobile "show all levels" toggles
        elements.dimensionsSection.addEventListener('click', function (e) {
            const levelBtn = e.target.closest('.score-desc');
            if (levelBtn) {
                const card = levelBtn.closest('.dimension-card');
                const dimId = card ? card.getAttribute('data-dimension') : null;
                const value = parseInt(levelBtn.getAttribute('data-score'), 10);
                if (dimId && Object.prototype.hasOwnProperty.call(state.scores, dimId) &&
                    Number.isInteger(value) && value >= 0 && value <= 3) {
                    state.scores[dimId] = value;
                    const slider = byId(dimId);
                    if (slider) { slider.value = value; }
                    updateDisplay();
                }
                return;
            }
            const toggle = e.target.closest('.show-all-levels');
            if (toggle) {
                const card = toggle.closest('.dimension-card');
                if (card) {
                    const expanded = card.classList.toggle('expanded');
                    toggle.setAttribute('aria-expanded', String(expanded));
                    toggle.textContent = expanded ? 'Hide other levels' : 'Show all levels';
                }
            }
        });

        // Per-dimension justification notes
        elements.dimensionsSection.addEventListener('input', function (e) {
            const ta = e.target.closest('.dim-note');
            if (!ta) { return; }
            const dimId = ta.getAttribute('data-dim');
            if (dimId && Object.prototype.hasOwnProperty.call(state.notes, dimId)) {
                state.notes[dimId] = ta.value;
                autoGrow(ta);
                persist();
            }
        });

        // Assessment metadata
        elements.assessmentMeta.addEventListener('input', function (e) {
            const field = e.target.getAttribute('data-field');
            if (field && META_FIELDS.indexOf(field) !== -1) {
                state.meta[field] = e.target.value;
                updateDisplay();
            }
        });

        // Reset
        elements.resetBtn.addEventListener('click', function () {
            // Any score, note or metadata (date aside) counts as work
            // worth a confirmation prompt.
            const dirty = !isPristine();
            if (dirty && !window.confirm('Clear all scores, notes and details?')) { return; }
            dismissDraftOffer();
            applyState(defaultState());
            try {
                history.replaceState(null, '', location.pathname + location.search);
            } catch (e) { /* ignore */ }
            try {
                localStorage.removeItem(DRAFT_KEY);
            } catch (e) { /* ignore */ }
            elements.presetSource.hidden = true;
            elements.linkNotice.hidden = true;
            updateDisplay();
        });

        // Copy link
        elements.copyLinkBtn.addEventListener('click', function () {
            persistNow();
            copyText(location.href, 'Link copied');
        });

        // Copy summary
        elements.copySummaryBtn.addEventListener('click', function () {
            persistNow();
            copyText(buildSummary(computeResults()), 'Summary copied');
        });

        // Copy / download Markdown, download JSON
        elements.copyMdBtn.addEventListener('click', function () {
            persistNow();
            copyText(buildMarkdown(computeResults()), 'Markdown copied');
        });
        elements.downloadMdBtn.addEventListener('click', function () {
            persistNow();
            downloadFile(exportFilename('md'), 'text/markdown', buildMarkdown(computeResults()));
        });
        elements.downloadJsonBtn.addEventListener('click', function () {
            persistNow();
            downloadFile(exportFilename('json'), 'application/json', JSON.stringify(state, null, 2));
        });

        // Import JSON
        elements.importJsonBtn.addEventListener('click', function () {
            elements.importJsonInput.click();
        });
        elements.importJsonInput.addEventListener('change', function () {
            const file = this.files && this.files[0];
            const input = this;
            if (!file) { return; }
            const reader = new FileReader();
            reader.onload = function () {
                let data = null;
                try {
                    data = JSON.parse(String(reader.result));
                } catch (e) {
                    data = null;
                }
                if (!validImport(data)) {
                    showStatus('Invalid assessment file');
                } else {
                    dismissDraftOffer();
                    const full = defaultState();
                    Object.assign(full.meta, data.meta || {});
                    Object.assign(full.scores, data.scores);
                    Object.assign(full.notes, data.notes || {});
                    applyState(full);
                    updateDisplay();
                    showStatus('Assessment imported');
                }
                input.value = '';
            };
            reader.onerror = function () {
                showStatus('Invalid assessment file');
                input.value = '';
            };
            reader.readAsText(file);
        });

        // Print
        elements.printBtn.addEventListener('click', function () {
            window.print();
        });

        // Before printing, flush persistence so the header stamp and
        // link are current, and force the rules <details> open so it
        // prints; restore its state afterwards.
        window.addEventListener('beforeprint', function () {
            persistNow();
            if (elements.rulesUsed) {
                if (!rulesUsedForcedOpen) {
                    rulesUsedWasOpen = elements.rulesUsed.open;
                    rulesUsedForcedOpen = true;
                }
                elements.rulesUsed.open = true;
            }
        });
        window.addEventListener('afterprint', function () {
            if (elements.rulesUsed && rulesUsedForcedOpen) {
                elements.rulesUsed.open = rulesUsedWasOpen;
                rulesUsedForcedOpen = false;
            }
        });

        // Theme toggle (persisted choice; falls back to OS preference
        // when storage is unavailable).
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', function () {
                const next = currentTheme() === 'dark' ? 'light' : 'dark';
                try {
                    localStorage.setItem(THEME_KEY, next);
                } catch (e) { /* storage unavailable; still applies for this page */ }
                applyTheme(next);
            });
        }

        // Keep the toggle's pressed state in sync when the OS theme
        // changes and no explicit choice has been made.
        try {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            if (mq.addEventListener) {
                mq.addEventListener('change', updateThemeButton);
            } else if (mq.addListener) {
                mq.addListener(updateThemeButton);
            }
        } catch (e) { /* matchMedia unavailable; ignore */ }

        // Presets
        PRESETS.forEach(function (preset) {
            const option = document.createElement('option');
            option.value = preset.id;
            option.textContent = preset.label;
            elements.presetSelect.appendChild(option);
        });
        elements.presetSelect.addEventListener('change', function () {
            const preset = PRESETS.find(function (p) { return p.id === elements.presetSelect.value; });
            if (!preset) { return; }
            dismissDraftOffer();
            const full = defaultState();
            Object.assign(full.meta, preset.meta);
            Object.assign(full.scores, preset.scores);
            Object.assign(full.notes, preset.notes);
            applyState(full);
            elements.presetSource.href = FRAMEWORK.repo + '/blob/main/' + preset.source;
            elements.presetSource.hidden = false;
            updateDisplay();
            // Reset the select so the same preset can be reloaded.
            elements.presetSelect.value = '';
        });

        // Draft restore/discard
        elements.restoreDraft.addEventListener('click', function () {
            if (!pendingDraft) { return; }
            const draftState = pendingDraft.state;
            pendingDraft = null;
            elements.draftBanner.hidden = true;
            applyState(draftState);
            updateDisplay();
        });
        elements.discardDraft.addEventListener('click', function () {
            try {
                localStorage.removeItem(DRAFT_KEY);
            } catch (e) { /* ignore */ }
            dismissDraftOffer();
        });

        // A pasted/edited hash wins over whatever is on screen.
        window.addEventListener('hashchange', function () {
            if (hydrateFromHash()) {
                dismissDraftOffer();
                updateDisplay();
            }
        });
    }

    // ---------------------------------------------------------------
    // Initialize
    // ---------------------------------------------------------------

    function init() {
        renderRulesUsed();
        setFrameworkVersionLabels();
        updateThemeButton();
        bindEvents();
        const fromHash = hydrateFromHash();
        // Offer a stored draft when there is no share link, and also
        // when the link carries an all-default assessment — restoring
        // nothing while silently deleting the draft would lose work.
        if (!fromHash || isPristine()) {
            offerDraft();
        }
        syncDOM();
        updateDisplay();
        setPrintStamp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
