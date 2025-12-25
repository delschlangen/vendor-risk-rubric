# Jurisdiction & Regulatory Considerations

Legal and regulatory requirements that affect vendor risk assessments based on jurisdiction and industry. Use this guide alongside the risk rubric to ensure compliance obligations are addressed.

---

## 1. EU AI Act

The EU AI Act creates supply chain obligations for organizations using AI systems from vendors. These requirements affect how you assess and contract with AI vendors.

### When AI/ML Dimension Triggers High-Risk Classification

Under Article 6, AI systems are classified as **high-risk** when used in these areas:

| High-Risk Category | Examples |
|-------------------|----------|
| Employment & workers | CV screening, interview analysis, performance monitoring, promotion decisions |
| Credit & financial services | Credit scoring, loan approval, insurance pricing |
| Education | Student assessment, admission decisions, exam proctoring |
| Essential services | Benefits eligibility, credit scoring, emergency response prioritization |
| Law enforcement | Risk assessment, evidence analysis, crime prediction |
| Migration & border | Visa processing, asylum applications, border surveillance |
| Justice | Sentencing assistance, parole decisions, evidence evaluation |

**Assessment trigger:** If your AI/ML dimension score is 2+ AND the vendor's AI is used in any high-risk category above, additional EU AI Act requirements apply.

### Supply Chain Obligations for High-Risk AI

If you deploy a high-risk AI system from a vendor, you become a **deployer** with these obligations:

| Obligation | What It Means | Contract Implication |
|------------|---------------|---------------------|
| Human oversight | Ensure humans can monitor and intervene | Require vendor to enable oversight mechanisms |
| Risk management | Maintain awareness of AI risks | Require vendor documentation of risks and mitigations |
| Data governance | Ensure training data quality | Require vendor disclosure of training data practices |
| Technical documentation | Access to system documentation | Require vendor to provide Article 11 documentation |
| Record keeping | Log AI system operation | Require vendor to enable logging; retain logs |
| Transparency | Inform affected individuals | Require vendor to support transparency notices |
| Accuracy monitoring | Monitor for performance degradation | Require vendor to provide performance metrics |

### EU AI Act Contract Clauses

Add these clauses when contracting with AI vendors for EU deployment:

**High-Risk AI Documentation:**
> Vendor shall provide technical documentation required under EU AI Act Article 11, including: (a) general description of the AI system; (b) detailed description of elements and development process; (c) monitoring, functioning, and control mechanisms; (d) risk management system description; (e) data governance measures; (f) performance metrics and limitations.

**Conformity & CE Marking:**
> For high-risk AI systems, Vendor represents that the system bears CE marking and complies with EU AI Act conformity assessment requirements. Vendor shall provide Declaration of Conformity upon request.

**Incident Reporting:**
> Vendor shall notify Company within 24 hours of any serious incident involving the AI system, including malfunctions resulting in death, serious damage to health, property, or environment, or serious fundamental rights violations.

**Human Oversight Enablement:**
> Vendor shall design and maintain the AI system to enable effective human oversight, including the ability to: (a) understand system capabilities and limitations; (b) monitor operation; (c) interpret outputs; (d) override or reverse outputs; (e) interrupt operation via "stop" mechanism.

---

## 2. GDPR Considerations

When vendors process personal data of EU residents, GDPR creates specific contractual and operational requirements.

### When Data Processing Agreements Are Required

A **Data Processing Agreement (DPA)** is legally required when:

| Scenario | DPA Required? |
|----------|---------------|
| Vendor stores EU customer data | Yes |
| Vendor processes EU employee data | Yes |
| Vendor has access to EU personal data for support | Yes |
| Vendor only processes anonymized/aggregated data | No |
| Vendor is a joint controller (co-determines purposes) | No — requires Joint Controller Agreement instead |

**Assessment trigger:** If Data Sensitivity dimension is 2+ AND data includes EU residents, a DPA is mandatory under GDPR Article 28.

### Controller vs Processor Classification

Correct classification determines legal obligations:

| Role | Definition | Example |
|------|------------|---------|
| **Controller** | Determines purposes and means of processing | Your company decides what data to collect and why |
| **Processor** | Processes data on controller's behalf | SaaS vendor storing your customer data |
| **Joint Controller** | Two+ parties jointly determine purposes | Partnership where both parties decide data use |
| **Sub-processor** | Processor engaged by your processor | Cloud provider used by your SaaS vendor |

**Common mistakes:**
- Assuming all vendors are processors (some are joint controllers)
- Not requiring processor to disclose sub-processors
- Not flowing down requirements to sub-processors

### Data Transfer Mechanisms

When vendor transfers EU personal data outside the EEA:

| Transfer Destination | Mechanism Required |
|---------------------|-------------------|
| **Adequate country** (e.g., Canada, Japan, UK, Switzerland) | None — adequacy decision covers it |
| **US** (post-DPF) | Data Privacy Framework certification OR SCCs |
| **US** (no DPF) | Standard Contractual Clauses (SCCs) + Transfer Impact Assessment |
| **Other countries** | SCCs + Transfer Impact Assessment |

**Required contract clause for transfers:**

> **International Transfers.** Vendor shall not transfer Personal Data outside the European Economic Area unless: (a) the transfer is to a country with an adequacy decision; (b) Vendor has executed EU Standard Contractual Clauses with the recipient; or (c) another GDPR Article 46 safeguard applies. Vendor shall conduct and document a Transfer Impact Assessment for transfers to countries without adequacy decisions.

### GDPR-Specific Contract Requirements

DPAs must include these Article 28 requirements:

| Requirement | Contract Language |
|-------------|-------------------|
| Processing only on instructions | "Processor shall process Personal Data only on documented instructions from Controller" |
| Confidentiality | "Processor shall ensure persons processing data are subject to confidentiality obligations" |
| Security measures | "Processor shall implement appropriate technical and organizational measures" |
| Sub-processor restrictions | "Processor shall not engage sub-processors without prior written authorization" |
| Assistance with data subject rights | "Processor shall assist Controller in responding to data subject requests" |
| Deletion/return | "Upon termination, Processor shall delete or return all Personal Data" |
| Audit rights | "Processor shall make available information necessary to demonstrate compliance and allow audits" |
| Breach notification | "Processor shall notify Controller without undue delay after becoming aware of a breach" |

---

## 3. CCPA/CPRA (California)

California's privacy laws create specific vendor classification and contract requirements when handling California consumers' personal information.

### Service Provider vs Contractor Classification

CPRA distinguishes between service providers and contractors:

| Classification | Definition | Key Requirement |
|----------------|------------|-----------------|
| **Service Provider** | Processes PI on business's behalf for business purpose | Cannot use PI for own purposes; cannot sell/share |
| **Contractor** | Processes PI pursuant to written contract | Same restrictions but via contract certification |
| **Third Party** | Anyone else receiving PI | Consumer can opt out of sales/sharing |

**Why it matters:** If your vendor is classified as a "third party" rather than a "service provider," their receipt of data may constitute a "sale" requiring consumer opt-out rights.

### Required Contract Language

CCPA/CPRA requires specific contract terms for service providers and contractors:

**Service Provider/Contractor Certification:**
> Vendor certifies that it: (a) understands the restrictions in CCPA/CPRA and will comply with them; (b) will not sell or share Personal Information received from Company; (c) will not retain, use, or disclose Personal Information for any purpose other than performing services under this Agreement; (d) will not retain, use, or disclose Personal Information outside the direct business relationship; (e) will not combine Personal Information received from Company with PI from other sources except as permitted by CPRA.

**Prohibition on Secondary Use:**
> Vendor shall not retain, use, or disclose Personal Information received from Company for any commercial purpose other than providing the services specified in this Agreement.

**Compliance Verification:**
> Company may take reasonable steps to ensure Vendor uses Personal Information consistently with Company's CCPA/CPRA obligations. Vendor shall notify Company if it determines it can no longer meet its CCPA/CPRA obligations.

### Opt-Out Obligations

When vendors may receive data subject to opt-out:

| Scenario | Vendor Obligation |
|----------|-------------------|
| Vendor receives data for targeted advertising | Honor Global Privacy Control (GPC) signals |
| Vendor combines data across businesses | Restricted unless consumer consented |
| Vendor uses data for cross-context behavioral advertising | Must honor opt-out preferences |

**Contract clause for opt-out compliance:**
> Vendor shall implement mechanisms to receive and honor opt-out preference signals, including Global Privacy Control (GPC). Vendor shall not process Personal Information of consumers who have opted out of sale/sharing for purposes that would constitute a sale or sharing under CPRA.

---

## 4. Sector-Specific Requirements

### HIPAA — Healthcare

When vendors access Protected Health Information (PHI), HIPAA requires a **Business Associate Agreement (BAA)**.

**When BAA is required:**

| Vendor Activity | BAA Required? |
|-----------------|---------------|
| Stores or processes PHI | Yes |
| Has access to PHI for support/maintenance | Yes |
| Provides treatment, payment, or healthcare operations services | Yes |
| Only handles de-identified data | No |
| Acts as a conduit (transmission only, no storage) | No |

**Assessment trigger:** If Data Sensitivity = 3 AND data includes health information, a BAA is required.

**BAA Required Terms:**

| Requirement | Description |
|-------------|-------------|
| Permitted uses | Specify allowed uses of PHI |
| Safeguards | Require appropriate administrative, physical, technical safeguards |
| Reporting | Report any use/disclosure not permitted; report security incidents |
| Subcontractors | Ensure subcontractors agree to same restrictions |
| Access | Make PHI available for individual access requests |
| Amendment | Make PHI available for amendment |
| Accounting | Document disclosures for accounting of disclosures |
| Compliance | Make practices available to HHS for compliance review |
| Return/destruction | Return or destroy PHI on termination |
| Breach notification | Notify covered entity of breaches |

**Sample BAA clause:**
> Business Associate agrees to: (a) not use or disclose PHI other than as permitted by this Agreement or required by law; (b) use appropriate safeguards to prevent unauthorized use or disclosure; (c) report any unauthorized use, disclosure, or security incident; (d) ensure subcontractors agree to the same restrictions; (e) make PHI available for individual access within 15 days of request; (f) return or destroy all PHI upon termination.

### SOX — Financial Reporting

Sarbanes-Oxley affects vendors who impact financial reporting systems or controls.

**When SOX applies:**

| Vendor Type | SOX Relevance |
|-------------|---------------|
| ERP/financial system vendors | Direct impact on financial reporting |
| IT infrastructure (hosting financial systems) | Supports financial reporting controls |
| Payroll processors | Affects financial statement accuracy |
| Revenue recognition systems | Direct impact on reported revenue |
| Audit/compliance tools | Supports SOX compliance |

**Assessment trigger:** If Business Continuity = 2+ AND vendor affects financial reporting systems, SOX considerations apply.

**SOX-Related Contract Terms:**

> **Internal Controls.** Vendor shall maintain internal controls over services that may affect Company's financial reporting. Vendor shall provide SOC 1 Type II report annually covering controls relevant to Company's financial reporting.

> **Change Management.** Vendor shall notify Company at least 30 days prior to changes that may affect financial reporting controls. Vendor shall not implement changes during Company's financial close periods without prior approval.

> **Audit Support.** Vendor shall cooperate with Company's internal and external auditors. Vendor shall provide access to records and personnel as reasonably necessary for Company to meet its SOX obligations.

> **Documentation.** Vendor shall maintain documentation of controls, processes, and system changes sufficient to support Company's SOX compliance documentation.

### GLBA — Financial Services

Gramm-Leach-Bliley Act applies when vendors access consumer financial information.

**When GLBA applies:**

| Data Type | GLBA Applies? |
|-----------|---------------|
| Consumer account information | Yes |
| Transaction history | Yes |
| Credit card numbers | Yes |
| Loan application data | Yes |
| Aggregated/anonymized financial data | No |

**Assessment trigger:** If Data Sensitivity = 2+ AND you are a financial institution AND vendor accesses consumer financial data.

**GLBA Contract Requirements:**

Under the Safeguards Rule, contracts with service providers must:

| Requirement | Description |
|-------------|-------------|
| Due diligence | Select providers capable of maintaining appropriate safeguards |
| Contract requirements | Require providers to implement appropriate safeguards |
| Monitoring | Monitor providers to confirm safeguards are maintained |

**Sample GLBA clause:**
> Vendor shall implement and maintain a comprehensive information security program with administrative, technical, and physical safeguards designed to: (a) ensure the security and confidentiality of customer information; (b) protect against anticipated threats or hazards; (c) protect against unauthorized access or use. Vendor's program shall comply with the FTC Safeguards Rule (16 CFR Part 314).

---

## 5. Jurisdiction Quick Reference

Use this matrix to identify which requirements apply:

| If vendor handles... | And you have... | Then require... |
|---------------------|-----------------|-----------------|
| Any AI/ML in high-risk category | EU operations or customers | EU AI Act documentation & clauses |
| EU personal data | EU establishment or EU customers | GDPR DPA + transfer mechanisms |
| California consumer PI | California customers | CCPA/CPRA service provider terms |
| Protected health information | HIPAA-covered operations | BAA |
| Financial reporting data | Public company status | SOX controls + SOC 1 |
| Consumer financial information | Financial institution status | GLBA safeguards clause |

---

## 6. Regulatory Clause Library

### Combined Privacy Addendum (Multi-Jurisdiction)

For vendors handling data across multiple jurisdictions:

> **Data Protection Addendum.** This Addendum applies to Vendor's processing of Personal Data under the Agreement.
>
> **1. GDPR.** Where Vendor processes Personal Data subject to GDPR, Vendor acts as Processor. Vendor shall: process only on documented instructions; ensure personnel confidentiality; implement appropriate security measures; assist with data subject requests; delete/return data on termination; allow audits; notify breaches without undue delay.
>
> **2. International Transfers.** Vendor shall not transfer Personal Data outside the EEA except: (a) to adequate countries; (b) under EU SCCs (Module 2 incorporated by reference); (c) under other Article 46 safeguards.
>
> **3. CCPA/CPRA.** Where Vendor processes Personal Information of California consumers, Vendor is a Service Provider. Vendor shall not: sell or share PI; retain/use/disclose PI except for Agreement purposes; retain/use/disclose PI outside direct business relationship.
>
> **4. Sub-processors.** Vendor shall not engage sub-processors without prior written consent. Vendor shall impose equivalent obligations on sub-processors and remain liable for sub-processor compliance.

### AI Transparency Notice Template

For high-risk AI systems under EU AI Act:

> **AI System Transparency Notice**
>
> This service uses an AI system for [purpose]. The AI system: (a) processes [data types]; (b) produces [outputs/decisions]; (c) is designed for [intended use]; (d) has limitations including [limitations].
>
> Decisions are subject to human review. You may request human review of any AI-assisted decision by contacting [contact].

---

## 7. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12 | Initial release |
