# RACI Matrix

Who is **R**esponsible, **A**ccountable, **C**onsulted, and **I**nformed for each step of the vendor risk assessment process.

---

## Legend

| Code | Meaning |
|------|---------|
| **R** | Responsible — Does the work |
| **A** | Accountable — Approves/owns the outcome |
| **C** | Consulted — Provides input before decision |
| **I** | Informed — Notified after decision |
| **—** | Not involved |

---

## Core Process RACI

| Activity | Requestor | Procurement | Risk/Compliance | Legal | InfoSec | Privacy | EHS | Finance | Exec Sponsor |
|----------|-----------|-------------|-----------------|-------|---------|---------|-----|---------|--------------|
| Identify vendor need | R/A | I | — | — | — | — | — | — | — |
| Complete intake questionnaire | R | I | A | — | — | — | — | — | — |
| Initial risk scoring | I | C | R/A | — | — | — | — | — | — |
| Determine review tier | I | I | R/A | — | — | — | — | — | — |
| Route to reviewers | I | R | A | I | I | I | I | I | I |

---

## Review Activities by Tier

### Standard Tier (Score 0–5)

| Activity | Requestor | Procurement | Risk/Compliance | Legal | InfoSec | Privacy | EHS | Finance | Exec Sponsor |
|----------|-----------|-------------|-----------------|-------|---------|---------|-----|---------|--------------|
| Procurement review | I | R/A | I | — | — | — | — | — | — |
| Contract review | C | R | I | C | — | — | — | — | — |
| Budget approval | R | I | — | — | — | — | — | A | — |
| Contract execution | I | R/A | I | — | — | — | — | — | — |

### Enhanced Tier (Score 6–10)

| Activity | Requestor | Procurement | Risk/Compliance | Legal | InfoSec | Privacy | EHS | Finance | Exec Sponsor |
|----------|-----------|-------------|-----------------|-------|---------|---------|-----|---------|--------------|
| Security assessment | C | I | C | — | R/A | — | — | — | — |
| Legal contract review | C | C | I | R/A | C | C | — | — | — |
| Privacy review (if Data ≥ 2) | C | I | C | C | — | R/A | — | — | — |
| Incorporate required clauses | I | R | C | A | C | C | — | — | — |
| Budget approval | R | I | — | — | — | — | — | A | — |
| Final contract review | I | C | I | R/A | — | — | — | — | — |
| Contract execution | I | R/A | I | I | I | I | — | — | — |

### High/Critical Tier (Score 11+)

| Activity | Requestor | Procurement | Risk/Compliance | Legal | InfoSec | Privacy | EHS | Finance | Exec Sponsor |
|----------|-----------|-------------|-----------------|-------|---------|---------|-----|---------|--------------|
| Identify executive sponsor | R | I | C | — | — | — | — | — | A |
| Full security assessment | C | I | C | — | R/A | — | — | — | I |
| Custom contract negotiation | C | C | C | R/A | C | C | C | C | I |
| Data Protection Impact Assessment | C | I | C | C | C | R/A | — | — | I |
| Vendor financial review | I | C | C | — | — | — | — | R/A | I |
| Business continuity plan review | C | C | R/A | — | — | — | — | C | I |
| AI/ML risk review (if applicable) | C | I | R/A | C | C | — | — | — | I |
| Executive sign-off | I | I | C | C | C | C | C | C | R/A |
| Contract execution | I | R/A | I | I | I | I | I | I | I |
| Add to monitoring program | I | I | R/A | — | C | C | — | — | I |

---

## Trigger-Based Reviews

When a single dimension scores **3**, the following specialist reviews are triggered:

| Trigger | Activity | Primary Owner (R/A) | Consulted |
|---------|----------|---------------------|-----------|
| Co-Employment = 3 | Worker classification analysis | Employment Counsel | Legal, HR |
| Data Sensitivity = 3 | Privacy/DPO review | Privacy/DPO | Legal, InfoSec |
| Physical Safety = 3 | EHS review | EHS | Legal, Facilities |
| Site/Security = 3 | InfoSec review | InfoSec | Facilities, IT |
| Business Continuity = 3 | Financial health review | Finance | Procurement, Risk |
| AI/ML Risk = 3 | AI Governance review | AI Governance / Ethics | Legal, Privacy, InfoSec |

---

## Ongoing Monitoring RACI

| Activity | Requestor | Procurement | Risk/Compliance | Legal | InfoSec | Privacy | Finance | Exec Sponsor |
|----------|-----------|-------------|-----------------|-------|---------|---------|---------|--------------|
| Annual security attestation | — | I | C | — | R/A | — | — | — |
| Annual re-scoring at renewal | C | R | A | — | C | C | — | — |
| Quarterly business review (High/Critical) | C | C | R/A | — | C | — | C | I |
| Exception requests | R | C | A | C | C | — | — | A |
| Incident response (vendor breach) | I | C | R/A | R | R | R | — | I |

---

## Role Definitions

| Role | Typical Title(s) | Primary Responsibilities |
|------|------------------|--------------------------|
| **Requestor** | Business stakeholder, Project manager | Initiates request; provides business justification; completes intake |
| **Procurement** | Procurement manager, Sourcing specialist | Routes requests; manages contracts; executes agreements |
| **Risk/Compliance** | Risk analyst, Compliance manager | Scores vendors; owns framework; coordinates reviews |
| **Legal** | Contracts attorney, Legal counsel | Reviews contracts; negotiates terms; approves clauses |
| **InfoSec** | Security analyst, IT Security manager | Conducts security assessments; reviews access |
| **Privacy** | Privacy officer, DPO | Reviews data handling; assesses privacy impact |
| **EHS** | Safety manager, EHS coordinator | Reviews physical safety; verifies insurance |
| **Finance** | Financial analyst, Controller | Reviews vendor financial health; budget approval |
| **Exec Sponsor** | VP, Director, C-level | Provides business sponsorship; accepts residual risk |

---

## Customization Notes

1. **Map to your org structure** — Replace role names with actual team names
2. **Combine roles if needed** — Smaller orgs may combine Risk/Compliance + Procurement
3. **Add roles if needed** — Consider adding AI Governance, ESG, or Geographic Risk reviewers
4. **Document escalation paths** — Define who decides when reviewers disagree

---

## Decision Authority

| Decision | Authority |
|----------|-----------|
| Standard tier approval | Procurement |
| Enhanced tier approval | Legal + InfoSec |
| High tier approval | Executive Sponsor (VP+) |
| Critical tier approval | C-suite |
| Exceptions to process | Executive Sponsor + Risk/Compliance |
| Framework changes | Risk/Compliance + Legal |
