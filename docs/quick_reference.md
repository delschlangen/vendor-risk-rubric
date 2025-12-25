# Vendor Risk Quick Reference Card

*Print this one-pager for rapid vendor assessments*

---

## Scoring Matrix (0–3 per dimension)

| Dimension | 0 | 1 | 2 | 3 |
|-----------|---|---|---|---|
| **Co-Employment** | No people on-site; SaaS/product | Occasional on-site; vendor-supervised | Regular on-site; integrated teams | Embedded daily; we direct work |
| **Data Sensitivity** | No data access | Internal non-sensitive | PII or customer data | Regulated/trade secrets |
| **Physical Safety** | Remote only | Office environment | Equipment/vehicles | Construction/electrical/heights |
| **Site/Security Access** | None | Escorted; read-only | Badge; non-prod systems | Data center; prod admin |
| **Business Continuity** | Easily replaced | Minor inconvenience | 30–90 day transition | Single point of failure |
| **AI/ML Risk** | No AI | Embedded; no custom | Custom model; influences decisions | Trained on our data; high-stakes |

---

## Risk Tiers

| Score | Tier | What's Required |
|-------|------|-----------------|
| **0–5** | Standard | Procurement review only |
| **6–10** | Enhanced | + Security + Legal |
| **11–15** | High | + Executive sponsor + Full assessment |
| **16–18** | Critical | + C-suite + Board + Quarterly reviews |

---

## Automatic Escalation Triggers

**Any single dimension = 3:**

| If... | Then require... |
|-------|-----------------|
| Co-Employment = 3 | Employment counsel |
| Data Sensitivity = 3 | Privacy/DPO |
| Physical Safety = 3 | EHS |
| Site/Security = 3 | InfoSec |
| Business Continuity = 3 | Finance |
| AI/ML Risk = 3 | AI Governance |

---

## Contract Clause Quick-Select

| Vendor Type | Clauses Needed |
|-------------|----------------|
| Low-risk SaaS | Standard only |
| SaaS with PII | Standard + Enhanced |
| Contractor with badge | Standard + Enhanced |
| Critical vendor | Standard + Enhanced + High-Risk |
| AI vendor | Standard + Enhanced + AI/ML |
| Mission-critical AI | All clause sets |

---

## Timeline Expectations

| Tier | Typical Duration |
|------|------------------|
| Standard | 1–2 weeks |
| Enhanced | 3–6 weeks |
| High/Critical | 6–12 weeks |

---

## Quick Decision Tree

```
1. Score all 6 dimensions (0–3 each)
2. Any dimension = 3? → Trigger specialist review
3. Sum total score
4. Match to tier → Follow tier workflow
5. Select required clauses
6. Get approvals
7. Execute contract
```

---

## Key Questions to Ask

**Co-Employment:** Who directs daily work? Duration? Equipment provided?

**Data:** What data types? Regulated? Cross-border?

**Physical:** What physical work? Hazards? Who manages safety?

**Access:** Badge type? System privileges? Production access?

**Continuity:** Alternatives exist? Switching time? Revenue impact?

**AI/ML:** Training on our data? Decision impact? Explainable?

---

*Full rubric: `rubric/risk_rubric.md` | Template: `templates/blank_assessment.md`*
