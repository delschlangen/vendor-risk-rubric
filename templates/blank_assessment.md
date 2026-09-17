# Vendor Risk Assessment

**Vendor Name:**
**Service/Product:**
**Requestor:**
**Department:**
**Assessment Date:**
**Assessor:**
**Framework version used:** v1.1.0
**Scoring method:** [ ] Calculator (export attached) [ ] Manual

---

## Vendor Overview

*Brief description of what the vendor provides and how it will be used:*



---

## Risk Scoring

Tip: score with the [interactive calculator](https://delschlangen.github.io/vendor-risk-rubric/), then Download .md and paste or attach; record justifications below.

### 1. Co-Employment Risk

| Score | Criteria |
|-------|----------|
| **0** | No vendor personnel on-site; purely transactional (SaaS, product purchase) |
| **1** | Vendor personnel on-site occasionally; own supervision; clear deliverables |
| **2** | Vendor personnel on-site regularly; some integration with internal teams |
| **3** | Vendor personnel embedded daily; company directs their work; long-term |

**Your Score:** ___

**Justification:**


---

### 2. Data Sensitivity & Privacy

| Score | Criteria |
|-------|----------|
| **0** | No access to company data |
| **1** | Access to internal business data (non-sensitive); no PII |
| **2** | Access to PII, customer data, or contractually confidential data |
| **3** | Access to regulated data (HIPAA, GDPR, financial), trade secrets, or source code |

**Your Score:** ___

**Justification:**


---

### 3. Physical Safety & Injury Exposure

| Score | Criteria |
|-------|----------|
| **0** | Remote/virtual only; no physical presence |
| **1** | On-site in office environment; standard hazards |
| **2** | Work involves equipment, vehicles, or moderate physical risk |
| **3** | High-risk activities (construction, electrical, heights, confined spaces) |

**Your Score:** ___

**Justification:**


---

### 4. Site & Security Access

| Score | Criteria |
|-------|----------|
| **0** | No facility or system access |
| **1** | Escorted facility access; no IT system access or limited read-only |
| **2** | Unescorted facility access; badge issued; access to non-production IT |
| **3** | Access to data centers, secure areas, or production systems; admin privileges |

**Your Score:** ___

**Justification:**


---

### 5. Business Continuity Impact

| Score | Criteria |
|-------|----------|
| **0** | Easily replaceable; commoditized service; no operational dependency |
| **1** | Replacement would cause minor inconvenience; 2+ alternatives available |
| **2** | Moderate switching cost; 30–90 day transition; some operational impact |
| **3** | Single point of failure; >90 day transition; critical to revenue/operations |

**Your Score:** ___

**Justification:**


---

### 6. AI/ML Model Risk

| Score | Criteria |
|-------|----------|
| **0** | No AI/ML components |
| **1** | Embedded AI features; no customization; no training on company data |
| **2** | Fine-tuned/custom models; limited training on company data; influences decisions |
| **3** | Custom models on company data; directly affects customers/employees; IP concerns |

**Your Score:** ___

**Justification:**


---

## Scoring Summary

| Dimension | Score |
|-----------|-------|
| 1. Co-Employment Risk | |
| 2. Data Sensitivity & Privacy | |
| 3. Physical Safety & Injury Exposure | |
| 4. Site & Security Access | |
| 5. Business Continuity Impact | |
| 6. AI/ML Model Risk | |
| **TOTAL** | **___ / 18** |

---

## Risk Tier Determination

**Total Score:** ___

| Score Range | Tier | Your Result |
|-------------|------|-------------|
| 0–5 | Standard | [ ] |
| 6–10 | Enhanced | [ ] |
| 11–15 | High | [ ] |
| 16–18 | Critical | [ ] |

**Automatic Escalations Triggered:** (check if any dimension = 3)
- [ ] Co-Employment = 3 → Employment counsel review required
- [ ] Data Sensitivity = 3 → Privacy/DPO review required
- [ ] Physical Safety = 3 → EHS review required
- [ ] Site/Security = 3 → InfoSec review required
- [ ] Business Continuity = 3 → Finance review required
- [ ] AI/ML Risk = 3 → AI Governance review required

---

## Required Reviews

| Review | Owner | Required? | Status | Date |
|--------|-------|-----------|--------|------|
| Procurement | | Yes | [ ] Pending / [ ] Complete | |
| Security Assessment | | (Enhanced+, or Site/Security = 3) | [ ] Pending / [ ] Complete | |
| Legal Review | | | [ ] Pending / [ ] Complete | |
| Employment Counsel | | (Co-Employment = 3) | [ ] Pending / [ ] Complete | |
| Privacy/DPO Review | | (Data ≥ 2 in Enhanced+, or Data = 3) | [ ] Pending / [ ] Complete | |
| EHS Review | | (Physical Safety = 3) | [ ] Pending / [ ] Complete | |
| Finance Review | | (High+, or Business Continuity = 3) | [ ] Pending / [ ] Complete | |
| Risk/Compliance (BCP review) | | (High+) | [ ] Pending / [ ] Complete | |
| AI Governance | | (AI/ML ≥ 2 in High+, or AI/ML = 3) | [ ] Pending / [ ] Complete | |
| Executive Sponsor | | (High+) | [ ] Pending / [ ] Complete | |
| C-Suite Approval | | (Critical only) | [ ] Pending / [ ] Complete | |

---

## Required Contract Clauses

**Standard Terms:** (all vendors)
- [ ] Confidentiality
- [ ] Data Return/Destruction
- [ ] Insurance
- [ ] Compliance with Laws
- [ ] Basic Indemnification

**Enhanced Terms:** (Score 6+ or any dimension = 3)
- [ ] Security Requirements
- [ ] Audit Rights
- [ ] Subcontractor Flow-Down
- [ ] Background Checks
- [ ] Breach Notification (72-hour)

**High-Risk Terms:** (Score 11+)
- [ ] Data Processing Agreement (also required when Data Sensitivity = 3)
- [ ] Business Continuity
- [ ] Termination for Convenience (also required when Business Continuity = 3)
- [ ] Step-In Rights
- [ ] Source Code Escrow
- [ ] Financial Covenants

**AI/ML Terms:** (AI/ML Risk ≥ 2)
- [ ] Model Documentation
- [ ] Training Data Restrictions
- [ ] Output Ownership
- [ ] Transparency & Explainability
- [ ] Human Oversight
- [ ] Model Updates (30-day notice)
- [ ] Bias Testing
- [ ] AI Incident Response
- [ ] Prohibited Uses

**Jurisdiction-Specific Addenda:** (see [jurisdiction_considerations.md](../docs/jurisdiction_considerations.md))
- [ ] GDPR DPA (Art. 28)
- [ ] International transfer mechanism (SCCs / TIA)
- [ ] CCPA/CPRA service-provider terms
- [ ] HIPAA BAA
- [ ] SOX controls / SOC 1 Type II
- [ ] GLBA safeguards
- [ ] EU AI Act documentation & oversight
- [ ] DORA Art. 30 ICT contract provisions (EU financial entities)
- [ ] Other: ___

---

## Risk Mitigations

*Document any specific risks identified and how they will be mitigated:*

| Risk Identified | Mitigation | Owner |
|-----------------|------------|-------|
| | | |
| | | |
| | | |

---

## Approval Chain

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Requestor | | [ ] Approved | |
| InfoSec | | [ ] Approved / [ ] N/A | |
| Privacy | | [ ] Approved / [ ] N/A | |
| Legal | | [ ] Approved / [ ] N/A | |
| Employment Counsel | | [ ] Approved / [ ] N/A | |
| EHS | | [ ] Approved / [ ] N/A | |
| Finance | | [ ] Approved / [ ] N/A | |
| AI Governance | | [ ] Approved / [ ] N/A | |
| Executive Sponsor | | [ ] Approved / [ ] N/A | |
| Procurement | | [ ] Approved | |

---

## Decision

- [ ] **Approved** — Proceed with contract execution
- [ ] **Approved with Conditions** — Conditions:
- [ ] **Denied** — Reason:

---

## Ongoing Monitoring Requirements

- [ ] Annual security attestation (SOC 2 Type II)
- [ ] Annual re-scoring at renewal
- [ ] Quarterly business review
- [ ] Other:

Next re-score / renewal date: ___
Full re-assessment due (High/Critical, annual): ___

---

**Assessment completed by:** _________________________ **Date:** _____________

Related documents: [Risk rubric](../rubric/risk_rubric.md) · [Decision tree](../rubric/decision_tree.md) · [Clause library](../clauses/contract_clauses.md) · [Calculator guide](../docs/calculator_guide.md)

---
*Framework v1.1.0 · Last reviewed: 2026-09-15 · Next review due: 2027-09 · Found an error? [Open an issue](https://github.com/delschlangen/vendor-risk-rubric/issues)*
