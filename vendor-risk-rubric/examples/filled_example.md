# Vendor Risk Assessment: Example

**Vendor Name:** Apex AI Analytics  
**Service:** AI-powered customer support triage and sentiment analysis  
**Requestor:** Customer Experience Team  
**Assessment Date:** 2024-12-15  
**Assessor:** Risk & Compliance

---

## Vendor Overview

Apex AI Analytics provides a SaaS platform that uses machine learning to automatically categorize incoming support tickets, assess customer sentiment, and route tickets to appropriate teams. The system requires access to customer support tickets which contain customer PII.

---

## Risk Scoring

### 1. Co-Employment Risk: **0**

| Factor | Assessment |
|--------|------------|
| Personnel on-site? | No — fully SaaS, no vendor personnel |
| Integration with teams? | API integration only |
| Equipment provided? | None |

**Score: 0** — Purely transactional SaaS relationship.

---

### 2. Data Sensitivity & Privacy: **3**

| Factor | Assessment |
|--------|------------|
| Data types accessed | Customer names, emails, support history, account details |
| PII involved? | Yes — customer PII |
| Regulated data? | Yes — GDPR applies (EU customers); CCPA (CA customers) |
| Cross-border transfer? | Yes — Apex processes data in US; we have EU customers |

**Score: 3** — Access to regulated PII with cross-border implications.

---

### 3. Physical Safety & Injury Exposure: **0**

| Factor | Assessment |
|--------|------------|
| Physical presence? | None — remote SaaS only |
| Physical work? | N/A |

**Score: 0** — No physical safety considerations.

---

### 4. Site & Security Access: **1**

| Factor | Assessment |
|--------|------------|
| Facility access? | None |
| IT system access? | API access to ticketing system (write: create tags; read: ticket content) |
| Admin privileges? | No admin access; scoped API credentials |

**Score: 1** — Limited, scoped API access to production data.

---

### 5. Business Continuity Impact: **2**

| Factor | Assessment |
|--------|------------|
| Replaceability | 3-4 alternative vendors exist |
| Switching cost | Moderate — 60-90 day transition; retraining on new categories |
| Operational impact | Support routing would revert to manual triage |

**Score: 2** — Moderate switching cost; not single point of failure but meaningful impact.

---

### 6. AI/ML Model Risk: **3**

| Factor | Assessment |
|--------|------------|
| AI components | Core service is ML-based classification and sentiment analysis |
| Training data | Apex offers optional fine-tuning on our historical tickets |
| Decision impact | Routes tickets and sets priority; affects customer response time |
| Explainability | Limited — "black box" sentiment scores |
| IP concerns | If fine-tuned, model trained on our data |

**Score: 3** — ML-driven decisions affecting customers; potential training on our data; explainability gaps.

---

## Scoring Summary

| Dimension | Score |
|-----------|-------|
| 1. Co-Employment Risk | 0 |
| 2. Data Sensitivity & Privacy | 3 |
| 3. Physical Safety & Injury Exposure | 0 |
| 4. Site & Security Access | 1 |
| 5. Business Continuity Impact | 2 |
| 6. AI/ML Model Risk | 3 |
| **TOTAL** | **9 / 18** |

---

## Risk Tier Determination

**Total Score: 9** → **Enhanced Tier**

**Automatic Escalations Triggered:**
- ⚠️ Data Sensitivity = 3 → **Privacy/DPO review required**
- ⚠️ AI/ML Risk = 3 → **AI Governance review required**

---

## Required Actions

### Reviews Required

| Review | Owner | Status |
|--------|-------|--------|
| Security assessment | InfoSec | ☐ Pending |
| Legal contract review | Legal | ☐ Pending |
| Privacy/DPO review | Privacy Team | ☐ Pending — triggered by Data Sensitivity = 3 |
| AI Governance review | AI Ethics Committee | ☐ Pending — triggered by AI/ML Risk = 3 |

### Required Contract Clauses

Based on Enhanced tier + AI/ML triggers:

**Standard Terms:**
- ☐ Confidentiality
- ☐ Data Return/Destruction
- ☐ Insurance
- ☐ Compliance with Laws
- ☐ Basic Indemnification

**Enhanced Terms:**
- ☐ Information Security Requirements
- ☐ Audit Rights
- ☐ Subcontractor Flow-Down
- ☐ Breach Notification (72-hour)

**AI/ML-Specific Terms:**
- ☐ Model Documentation
- ☐ Training Data Restrictions — *Critical: prohibit use of our data for general model improvement*
- ☐ Output Ownership
- ☐ Transparency & Explainability
- ☐ Model Update Notification
- ☐ Bias Testing requirements

### Additional Mitigations

| Risk | Mitigation |
|------|------------|
| Cross-border data transfer | Execute Standard Contractual Clauses (SCCs) for EU data |
| Training data use | Contract must prohibit use of our data to train models for other customers |
| Explainability gap | Require Apex to provide classification confidence scores; establish human review threshold |
| Fine-tuning IP | If we fine-tune, contract must specify we own the resulting model weights or have perpetual license |

---

## Approval Chain

| Role | Name | Approval | Date |
|------|------|----------|------|
| Requestor | J. Smith (CX Director) | ☐ | |
| InfoSec | | ☐ | |
| Privacy | | ☐ | |
| Legal | | ☐ | |
| AI Governance | | ☐ | |
| Procurement | | ☐ | |

---

## Decision

**☐ Approved** — Proceed with contract execution once all reviews complete and required clauses incorporated.

**☐ Approved with Conditions** — Specify conditions:

**☐ Denied** — Specify reason:

---

## Ongoing Monitoring

Once approved, this vendor requires:

- ☐ Annual security attestation (SOC 2 Type II)
- ☐ Annual re-scoring of risk rubric at renewal
- ☐ Quarterly review of AI model performance metrics
- ☐ Notification channel established for model updates

---

*Assessment completed by: ___________________ Date: _______________*
