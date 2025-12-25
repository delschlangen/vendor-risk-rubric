# vendor-risk-rubric

**A structured framework for assessing third-party vendor risk, with model contract clauses.**

Translates co-employment, privacy, safety, security, continuity, and AI/ML concerns into a scored rubric that determines review pathways and required contract protections.

## Why This Exists

Vendor risk lives at the intersection of legal, security, and operations—and most organizations handle it inconsistently. This framework provides a repeatable scoring methodology that routes vendors to appropriate review tracks and ensures the right contract protections are in place. Includes modern AI/ML risk considerations that most vendor frameworks miss.

## Quick Start

1. **Score the vendor** using `rubric/risk_rubric.md` (6 dimensions, 0–3 each)
2. **Determine review pathway** using `rubric/decision_tree.md`
3. **Select required clauses** from `clauses/contract_clauses.md`
4. **See it in action:** `examples/filled_example.md` shows a complete AI vendor assessment

## What's Included

### Rubric (`rubric/`)

| Document | Purpose |
|----------|---------|
| `risk_rubric.md` | Scoring criteria for 6 risk dimensions |
| `decision_tree.md` | Workflow for routing vendors to review tracks |

**Risk Dimensions:**
1. Co-employment risk
2. Data sensitivity & privacy
3. Physical safety & injury exposure
4. Site & security access
5. Business continuity impact
6. **AI/ML model risk** ← often missing from standard frameworks

**Risk Tiers:**
| Score | Tier | Review Level |
|-------|------|--------------|
| 0–5 | Standard | Procurement |
| 6–10 | Enhanced | + Security + Legal |
| 11–15 | High | + Executive sponsor + Full assessment |
| 16–18 | Critical | + C-suite + Ongoing monitoring |

### Contract Clauses (`clauses/`)

| Clause Set | When to Use |
|------------|-------------|
| Standard Terms | All vendors |
| Enhanced Terms | Score 6+ or any dimension = 3 |
| High-Risk Terms | Score 11+ |
| AI/ML-Specific | AI/ML Risk ≥ 2 |

**AI/ML clauses cover:**
- Training data restrictions
- Model documentation requirements
- Output ownership
- Explainability requirements
- Bias testing obligations
- Model update notifications

### Example (`examples/`)

`filled_example.md` — Complete assessment of a hypothetical AI analytics vendor, showing:
- How to score each dimension
- How triggers escalate review requirements
- Which clauses to require
- Approval workflow

## Project Structure

```
vendor-risk-rubric/
├── rubric/
│   ├── risk_rubric.md      # Scoring criteria (6 dimensions)
│   └── decision_tree.md    # Review pathway workflow
├── clauses/
│   └── contract_clauses.md # Model contract language by tier
├── examples/
│   └── filled_example.md   # Sample AI vendor assessment
├── README.md
└── LICENSE
```

## Usage

**For a new vendor engagement:**

```
1. Open rubric/risk_rubric.md
2. Score each of the 6 dimensions (0–3)
3. Sum the scores
4. Check for any single dimension = 3 (triggers escalation)
5. Follow decision_tree.md for required reviews
6. Pull required clauses from contract_clauses.md
7. Document in your vendor file
```

**Adapting for your organization:**

- Adjust scoring thresholds to match your risk appetite
- Add organization-specific review owners to decision tree
- Customize clause language with your legal team
- Add additional dimensions if needed (e.g., ESG, geographic risk)

## Next Steps

- [ ] Add blank assessment template (fillable)
- [ ] Create vendor intake questionnaire
- [ ] Add regulatory-specific addenda (HIPAA BAA, GDPR DPA templates)
- [ ] Build simple web form for scoring

## Related Frameworks

This rubric aligns with concepts from:
- NIST Cybersecurity Framework (supply chain risk)
- ISO 27001 Annex A.15 (supplier relationships)
- NIST AI RMF (AI supply chain considerations)

## License

MIT License — See [LICENSE](LICENSE)

---

*Built by Del Schlangen | [LinkedIn](https://linkedin.com/in/del-s-759557175/)*
