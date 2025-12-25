# Vendor Risk Assessment Rubric

A standardized scoring framework for evaluating third-party vendor risk across six dimensions. Each dimension is scored 0–3, with total scores determining the required review pathway.

---

## Scoring Dimensions

### 1. Co-Employment Risk

Risk that vendor workers could be legally classified as employees, triggering benefits, tax, and liability obligations.

| Score | Criteria |
|-------|----------|
| **0** | No vendor personnel on-site; purely transactional (SaaS, product purchase) |
| **1** | Vendor personnel on-site occasionally; own supervision; clear deliverables |
| **2** | Vendor personnel on-site regularly; some integration with internal teams; shared tools |
| **3** | Vendor personnel embedded daily; company directs their work; uses company email/badge; long-term engagement |

**Key indicators:** Duration of engagement, who directs daily work, equipment/tools provided, integration with internal teams.

---

### 2. Data Sensitivity & Privacy

Risk related to vendor access to sensitive, regulated, or proprietary data.

| Score | Criteria |
|-------|----------|
| **0** | No access to company data |
| **1** | Access to internal business data (non-sensitive); no PII or regulated data |
| **2** | Access to PII, customer data, or data subject to contractual confidentiality |
| **3** | Access to regulated data (HIPAA, GDPR, financial), trade secrets, or source code |

**Key indicators:** Data classification levels accessed, regulatory frameworks applicable, cross-border data transfers.

---

### 3. Physical Safety & Injury Exposure

Risk of physical harm to vendor personnel, employees, or third parties arising from vendor activities.

| Score | Criteria |
|-------|----------|
| **0** | Remote/virtual only; no physical presence |
| **1** | On-site presence in office environment; standard occupational hazards |
| **2** | Work involves equipment, vehicles, or moderate physical risk; contractor-managed safety |
| **3** | High-risk activities (construction, electrical, heights, confined spaces); direct company oversight of safety |

**Key indicators:** Nature of physical work, OSHA-recordable risk potential, safety program requirements.

---

### 4. Site & Security Access

Risk from vendor access to physical facilities or IT systems.

| Score | Criteria |
|-------|----------|
| **0** | No facility or system access |
| **1** | Escorted facility access; no IT system access or limited read-only |
| **2** | Unescorted facility access; badge issued; access to non-production IT systems |
| **3** | Access to data centers, secure areas, or production systems; admin privileges |

**Key indicators:** Badge type, escorted vs. unescorted, system privilege level, access to critical infrastructure.

---

### 5. Business Continuity Impact

Risk that vendor failure or termination would disrupt critical business operations.

| Score | Criteria |
|-------|----------|
| **0** | Easily replaceable; commoditized service; no operational dependency |
| **1** | Replacement would cause minor inconvenience; 2+ alternative vendors available |
| **2** | Moderate switching cost; 30–90 day transition; some operational impact |
| **3** | Single point of failure; >90 day transition; critical to revenue or operations |

**Key indicators:** Vendor concentration, switching costs, data portability, contractual lock-in.

---

### 6. AI/ML Model Risk

Risk from vendor use of artificial intelligence or machine learning in delivered services.

| Score | Criteria |
|-------|----------|
| **0** | No AI/ML components |
| **1** | Embedded AI features; no model customization; no training on company data |
| **2** | Fine-tuned or custom models; limited training on company data; model outputs influence decisions |
| **3** | Custom models trained on company data; AI outputs directly affect customers, employees, or high-stakes decisions; IP/ownership concerns |

**Key indicators:** Model training data sources, decision automation level, explainability requirements, IP ownership.

---

## Scoring Summary

| Dimension | Score (0–3) |
|-----------|-------------|
| 1. Co-Employment Risk | ___ |
| 2. Data Sensitivity & Privacy | ___ |
| 3. Physical Safety & Injury Exposure | ___ |
| 4. Site & Security Access | ___ |
| 5. Business Continuity Impact | ___ |
| 6. AI/ML Model Risk | ___ |
| **TOTAL** | ___ / 18 |

---

## Risk Tiers & Required Actions

| Total Score | Risk Tier | Review Pathway |
|-------------|-----------|----------------|
| **0–5** | Standard | Standard procurement; contract review by procurement team |
| **6–10** | Enhanced | Security review required; Legal review of key terms; InfoSec assessment |
| **11–15** | High | Executive sponsor required; full security assessment; custom contract negotiation; ongoing monitoring |
| **16–18** | Critical | C-suite approval; Board notification (if applicable); dedicated risk owner; quarterly reviews |

---

## Additional Triggers

Regardless of total score, escalate to **Enhanced** or **High** tier if any single dimension scores **3**.

| Single Dimension = 3 | Auto-Escalation |
|---------------------|-----------------|
| Co-Employment = 3 | Employment counsel review required |
| Data Sensitivity = 3 | Privacy/DPO review required |
| Physical Safety = 3 | EHS review required |
| Site/Security Access = 3 | InfoSec review required |
| Business Continuity = 3 | Procurement + Finance review required |
| AI/ML Risk = 3 | AI governance/ethics review required |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12 | Initial release |
