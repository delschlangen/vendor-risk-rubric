# Vendor Risk Assessment Framework

**A complete, practical framework for assessing third-party vendor risk.**

Stop handling vendors inconsistently. This framework provides scoring criteria, decision workflows, contract clauses, and templates you can use today.

---

## Why Use This?

| Without a framework | With this framework |
|---------------------|---------------------|
| Every vendor gets different scrutiny | Consistent, scored approach |
| Contract protections are missed | Tiered clause library matched to risk |
| Reviews take forever (or don't happen) | Clear workflows with timelines |
| AI/ML risks are overlooked | AI is a core risk dimension |
| Accountability is unclear | RACI matrix defines who does what |

**This framework is used by organizations that:**
- Engage 50+ vendors
- Handle sensitive or regulated data
- Use AI/ML services from vendors
- Want a defensible, documented process

---

## Quick Start

### For a new vendor:

1. **Gather information** — Have the requestor complete the [intake questionnaire](templates/intake_questionnaire.md)
2. **Score the vendor** — Use the [risk rubric](rubric/risk_rubric.md) or [quick reference card](docs/quick_reference.md)
3. **Determine review pathway** — Follow the [decision tree](rubric/decision_tree.md)
4. **Select contract clauses** — Pick from the [clause library](clauses/contract_clauses.md)
5. **Document the assessment** — Use the [blank assessment template](templates/blank_assessment.md)

### For leadership buy-in:

Share the [executive summary](docs/executive_summary.md) — a one-page overview of the framework and its benefits.

### To implement in your organization:

Follow the [adoption guide](docs/adoption_guide.md) — a phased rollout plan with common pitfalls to avoid.

---

## What's Included

### Core Framework

| Document | What It Does |
|----------|--------------|
| [Risk Rubric](rubric/risk_rubric.md) | 6-dimension scoring criteria (0–3 each) |
| [Decision Tree](rubric/decision_tree.md) | Workflow for routing vendors to review tracks |
| [Contract Clauses](clauses/contract_clauses.md) | Tiered contract language library |

### Templates

| Document | What It Does |
|----------|--------------|
| [Blank Assessment](templates/blank_assessment.md) | Fillable assessment form |
| [Intake Questionnaire](templates/intake_questionnaire.md) | Form to gather info from requestors |

### Guides & Reference

| Document | What It Does |
|----------|--------------|
| [Quick Reference](docs/quick_reference.md) | One-page scoring cheat sheet |
| [Adoption Guide](docs/adoption_guide.md) | How to implement the framework |
| [RACI Matrix](docs/raci_matrix.md) | Who is responsible for what |
| [Jurisdiction Guide](docs/jurisdiction_considerations.md) | EU AI Act, GDPR, CCPA, HIPAA, SOX, GLBA |
| [Executive Summary](docs/executive_summary.md) | Leadership-level overview |
| [FAQ](docs/faq.md) | Common questions answered |

### Examples

| Vendor Type | Key Risks Illustrated |
|-------------|----------------------|
| [AI Analytics Vendor](examples/filled_example.md) | Data sensitivity + AI/ML risk |
| [Staffing Agency](examples/staffing_agency.md) | Co-employment + security access |
| [Low-Risk SaaS](examples/low_risk_saas.md) | Standard tier flow |
| [Construction Vendor](examples/construction_vendor.md) | Physical safety escalation |

---

## The Risk Dimensions

| # | Dimension | What It Measures |
|---|-----------|-----------------|
| 1 | **Co-Employment** | Could vendor workers be classified as our employees? |
| 2 | **Data Sensitivity** | What sensitive/regulated data do they access? |
| 3 | **Physical Safety** | Are there injury risks from their work? |
| 4 | **Site & Security Access** | Do they have facility or system access? |
| 5 | **Business Continuity** | What if they fail or we need to switch? |
| 6 | **AI/ML Risk** | Are AI/ML systems involved? Training on our data? |

---

## Risk Tiers

| Total Score | Tier | Review Level | Timeline |
|-------------|------|--------------|----------|
| 0–5 | **Standard** | Procurement only | 1–2 weeks |
| 6–10 | **Enhanced** | + Security + Legal | 3–6 weeks |
| 11–15 | **High** | + Exec sponsor + Full assessment | 6–12 weeks |
| 16–18 | **Critical** | + C-suite + Board notification | 6–12 weeks |

**Escalation triggers:** Any single dimension = 3 automatically requires specialist review (even if total score is low).

---

## Project Structure

```
vendor-risk-rubric/
├── rubric/
│   ├── risk_rubric.md          # Scoring criteria
│   └── decision_tree.md        # Review workflows
├── clauses/
│   └── contract_clauses.md     # Tiered contract language
├── templates/
│   ├── blank_assessment.md     # Fillable assessment
│   └── intake_questionnaire.md # Information gathering form
├── examples/
│   ├── filled_example.md       # AI vendor (Enhanced tier)
│   ├── staffing_agency.md      # Contractor (High tier)
│   ├── low_risk_saas.md        # Simple SaaS (Standard tier)
│   └── construction_vendor.md  # Physical work (Enhanced tier)
├── docs/
│   ├── quick_reference.md      # One-page cheat sheet
│   ├── adoption_guide.md       # Implementation guide
│   ├── raci_matrix.md          # Role accountability
│   ├── jurisdiction_considerations.md  # Regulatory requirements
│   ├── executive_summary.md    # Leadership overview
│   └── faq.md                  # Common questions
├── README.md
└── LICENSE
```

---

## Customizing for Your Organization

1. **Adjust scoring thresholds** — The tier boundaries (0–5, 6–10, etc.) are starting points. Lower them for more conservative risk posture, raise them for faster processing.

2. **Add organization-specific indicators** — Each dimension lists "Key indicators." Add ones specific to your industry or operations.

3. **Customize contract clauses** — Have Legal review and adapt the clause language for your jurisdiction.

4. **Assign named owners** — Replace generic role names in the RACI and decision tree with actual people/teams.

5. **Add dimensions** — Need ESG or geographic risk? Add a seventh dimension following the same 0–3 scoring pattern.

---

## Framework Alignment

This framework aligns with:

- **NIST Cybersecurity Framework** — Supply chain risk management
- **ISO 27001 Annex A.15** — Supplier relationship security
- **NIST AI RMF** — AI supply chain considerations
- **Common regulatory expectations** — GDPR, HIPAA, SOX vendor oversight requirements

---

## Contributing

This framework is MIT licensed. Fork it, customize it, make it yours.

Contributions welcome:
- New examples for different vendor types
- Industry-specific adaptations
- Additional contract clauses
- Translations

---

## License

MIT License — See [LICENSE](LICENSE)

---

*Built by Del Schlangen | [LinkedIn](https://linkedin.com/in/del-s-759557175/)*
