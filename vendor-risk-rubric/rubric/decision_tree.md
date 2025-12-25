# Vendor Risk Assessment Decision Tree

A step-by-step workflow for determining required vendor review processes based on risk scoring.

---

## Quick-Start Flowchart

```
                    ┌─────────────────────┐
                    │  New Vendor Request │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Complete Risk Rubric│
                    │   (6 dimensions)    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Any dimension = 3?  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │ YES                             │ NO
              ▼                                 ▼
    ┌──────────────────┐              ┌─────────────────┐
    │ Trigger Special  │              │ Calculate Total │
    │ Review (see §2)  │              │     Score       │
    └────────┬─────────┘              └────────┬────────┘
             │                                  │
             │         ┌────────────────────────┼────────────────────────┐
             │         │                        │                        │
             │         ▼                        ▼                        ▼
             │   ┌───────────┐          ┌─────────────┐         ┌──────────────┐
             │   │  0–5 pts  │          │  6–10 pts   │         │  11–18 pts   │
             │   │ STANDARD  │          │  ENHANCED   │         │ HIGH/CRITICAL│
             │   └─────┬─────┘          └──────┬──────┘         └──────┬───────┘
             │         │                       │                       │
             │         ▼                       ▼                       ▼
             │   ┌───────────┐          ┌─────────────┐         ┌──────────────┐
             │   │Procurement│          │+ Security   │         │+ Exec Sponsor│
             │   │ Review    │          │+ Legal      │         │+ Full Assess │
             │   └───────────┘          └─────────────┘         └──────────────┘
             │                                                         │
             └─────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │  Contract Execution │
                            │  + Required Clauses │
                            └─────────────────────┘
```

---

## §1: Standard Tier (Score 0–5)

**Decision:** Proceed with standard procurement process.

| Step | Owner | Action |
|------|-------|--------|
| 1 | Requestor | Complete vendor intake form |
| 2 | Procurement | Review contract terms |
| 3 | Procurement | Ensure standard clauses included |
| 4 | Requestor | Obtain budget approval |
| 5 | Procurement | Execute contract |

**Timeline:** 1–2 weeks

**Required clauses:** See `contract_clauses.md` § Standard Terms

---

## §2: Enhanced Tier (Score 6–10)

**Decision:** Requires Security and Legal review before execution.

| Step | Owner | Action |
|------|-------|--------|
| 1 | Requestor | Complete vendor intake form + risk rubric |
| 2 | InfoSec | Security questionnaire / assessment |
| 3 | Legal | Review contract; negotiate key terms |
| 4 | Privacy | Review if Data Sensitivity ≥ 2 |
| 5 | Procurement | Incorporate required clauses |
| 6 | Requestor | Obtain budget approval |
| 7 | Legal | Final contract review |
| 8 | Procurement | Execute contract |

**Timeline:** 3–6 weeks

**Required clauses:** See `contract_clauses.md` § Enhanced Terms

---

## §3: High/Critical Tier (Score 11–18)

**Decision:** Requires executive sponsor and comprehensive risk assessment.

| Step | Owner | Action |
|------|-------|--------|
| 1 | Requestor | Identify executive sponsor |
| 2 | Requestor | Complete vendor intake form + risk rubric |
| 3 | InfoSec | Full security assessment (pen test if needed) |
| 4 | Legal | Custom contract negotiation |
| 5 | Privacy | Data Protection Impact Assessment (if applicable) |
| 6 | Finance | Vendor financial health review |
| 7 | Risk | Business continuity plan review |
| 8 | AI Gov | AI/ML risk review (if AI/ML Risk ≥ 2) |
| 9 | Exec Sponsor | Sign-off on residual risk |
| 10 | Procurement | Execute contract |
| 11 | Risk | Add to ongoing monitoring program |

**Timeline:** 6–12 weeks

**Required clauses:** See `contract_clauses.md` § High-Risk Terms

---

## §4: Special Trigger Reviews

When any single dimension scores **3**, the following specialized reviews are required regardless of total score:

### Co-Employment Risk = 3

```
IF co_employment = 3:
    → Employment Counsel review REQUIRED
    → Worker classification analysis
    → Engagement structure review
    → Consider Statement of Work restructuring
```

### Data Sensitivity = 3

```
IF data_sensitivity = 3:
    → Privacy/DPO review REQUIRED
    → Data Processing Agreement required
    → Cross-border transfer assessment (if applicable)
    → Breach notification terms required
```

### Physical Safety = 3

```
IF physical_safety = 3:
    → EHS review REQUIRED
    → Certificate of Insurance verification
    → Safety program documentation
    → Incident reporting protocol
```

### Site/Security Access = 3

```
IF site_security = 3:
    → InfoSec review REQUIRED
    → Background check requirements
    → Access provisioning/deprovisioning SOP
    → Audit rights clause required
```

### Business Continuity = 3

```
IF business_continuity = 3:
    → Finance review REQUIRED
    → Vendor financial health assessment
    → Exit/transition plan required
    → Escrow consideration for critical IP
```

### AI/ML Risk = 3

```
IF ai_ml_risk = 3:
    → AI Governance review REQUIRED
    → Model documentation/transparency requirements
    → Training data provenance verification
    → Output monitoring requirements
    → IP ownership clarification
    → Human oversight mechanism review
```

---

## §5: Renewal & Ongoing Monitoring

| Risk Tier | Renewal Review | Ongoing Monitoring |
|-----------|----------------|-------------------|
| Standard | Procurement review at renewal | None required |
| Enhanced | Re-score rubric at renewal; Security re-assessment if scope changed | Annual security attestation |
| High/Critical | Full re-assessment annually | Quarterly business review; continuous monitoring |

---

## §6: Exceptions

Exceptions to this process require:

1. Written justification from requestor
2. Risk acceptance by executive sponsor (VP+)
3. Documentation of compensating controls
4. Time-bound exception (max 12 months)
5. Logged in exception register

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12 | Initial release |
