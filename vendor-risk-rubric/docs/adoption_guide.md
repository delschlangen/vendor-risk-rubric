# Adoption Guide

How to implement this vendor risk framework in your organization.

---

## Who Should Use This Framework

**Primary users:**
- Procurement teams evaluating new vendors
- Risk and Compliance teams standardizing vendor assessments
- Legal teams determining required contract protections
- Security teams assessing vendor security posture
- Any organization that engages third-party vendors

**Organizations that benefit most:**
- Companies with 50+ active vendors
- Organizations handling sensitive or regulated data
- Companies using AI/ML services from vendors
- Regulated industries (finance, healthcare, government contractors)
- Organizations that have experienced vendor-related incidents

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1–2)

**Goal:** Customize the framework for your organization

1. **Review and adapt the rubric**
   - Read `rubric/risk_rubric.md` with key stakeholders
   - Adjust scoring thresholds if needed for your risk appetite
   - Add organization-specific indicators to each dimension
   - Example: If you're a healthcare company, you may want Data Sensitivity = 2 to include any PHI, not just "PII"

2. **Customize the decision tree**
   - Add specific team names and owners to `rubric/decision_tree.md`
   - Map review roles to actual people/teams in your organization
   - Adjust timelines based on your capacity

3. **Adapt contract clauses**
   - Have Legal review `clauses/contract_clauses.md`
   - Modify language for your jurisdiction
   - Add company-specific requirements
   - Create versions for different contract types (MSA, SOW, etc.)

**Deliverables:**
- [ ] Customized rubric with your thresholds
- [ ] Decision tree with named owners
- [ ] Legal-approved clause library

---

### Phase 2: Pilot (Weeks 3–6)

**Goal:** Test the framework on real vendors before full rollout

1. **Select pilot vendors**
   - Choose 5–10 upcoming vendor engagements
   - Include a mix: 2–3 low-risk, 2–3 medium-risk, 1–2 high-risk
   - Include at least one AI/ML vendor if applicable

2. **Run pilot assessments**
   - Use `templates/blank_assessment.md` for each vendor
   - Time how long each assessment takes
   - Note pain points and confusion
   - Track whether the tier felt "right"

3. **Gather feedback**
   - Interview pilot participants (requestors, reviewers)
   - Document what worked and what didn't
   - Identify common questions (add to FAQ)

4. **Refine the framework**
   - Adjust scoring criteria based on pilot learnings
   - Update decision tree based on actual workflows
   - Improve templates based on feedback

**Deliverables:**
- [ ] 5–10 completed pilot assessments
- [ ] Lessons learned document
- [ ] Refined framework based on feedback

---

### Phase 3: Rollout (Weeks 7–10)

**Goal:** Deploy the framework organization-wide

1. **Communicate the change**
   - Announce new vendor risk process to stakeholders
   - Share `docs/executive_summary.md` with leadership
   - Distribute `docs/quick_reference.md` to frequent users

2. **Train key users**
   - Procurement team: Full training on process
   - Requestors: Overview + how to complete intake questionnaire
   - Reviewers (Legal, Security, etc.): Their role in the process

3. **Integrate with existing processes**
   - Add vendor intake questionnaire to procurement workflow
   - Update procurement policy to reference the rubric
   - Add assessment requirements to vendor onboarding checklist

4. **Make materials accessible**
   - Host framework in a shared location (SharePoint, Confluence, etc.)
   - Create bookmarks/links in procurement systems
   - Consider building a simple web form for scoring

**Deliverables:**
- [ ] Training materials for each audience
- [ ] Updated procurement policy
- [ ] Framework hosted in accessible location
- [ ] Communication to all stakeholders

---

### Phase 4: Operate (Ongoing)

**Goal:** Run the process and continuously improve

1. **Run the process**
   - All new vendors go through intake questionnaire
   - Risk team scores and routes to appropriate tier
   - Required reviews are completed per decision tree
   - Contracts include required clauses

2. **Monitor effectiveness**
   - Track assessment volume and turnaround times
   - Monitor tier distribution (are you calibrated right?)
   - Watch for bottlenecks

3. **Review and improve**
   - Quarterly review of framework effectiveness
   - Annual update of scoring criteria
   - Add new examples as you encounter novel scenarios
   - Update contract clauses for regulatory changes

**Metrics to track:**
| Metric | Target |
|--------|--------|
| Average assessment time | 2 days for Standard, 5 days for Enhanced |
| Tier distribution | ~60% Standard, ~30% Enhanced, ~10% High/Critical |
| Exception rate | < 5% of assessments require exceptions |
| Contract clause adoption | 100% of contracts include required clauses |

---

## Quick-Start: Minimum Viable Rollout

If you need to deploy quickly, focus on these essentials:

1. **Use the rubric as-is** — Don't over-customize initially
2. **Use the intake questionnaire** — Capture info from requestors
3. **Score vendors and route to tiers** — Even without all reviews, the tier is useful
4. **Apply standard contract clauses** — Start with the basics
5. **Iterate based on experience** — Improve as you go

---

## Common Rollout Mistakes

| Mistake | Why It Fails | What to Do Instead |
|---------|--------------|---------------------|
| Over-customizing before testing | Creates complexity before proving value | Pilot with the framework as-is, then customize |
| Requiring all reviews immediately | Creates bottlenecks; teams aren't ready | Phase in additional reviews over time |
| Skipping Legal review of clauses | Clauses may not be enforceable | Have Legal approve clauses before using |
| Not training requestors | Incomplete intake questionnaires | Invest in 30-minute training for frequent requestors |
| Making it optional | Inconsistent adoption | Tie to procurement approval process |
| Not tracking metrics | Can't prove value or identify issues | Start simple: count assessments and turnaround time |

---

## Resource Requirements

**Minimum team to operate:**
| Role | Time Commitment | Responsibilities |
|------|-----------------|------------------|
| Risk/Compliance Lead | 20% | Own framework; train users; handle escalations |
| Procurement | 10% per vendor | Route vendors; track assessments; execute contracts |
| Legal | As needed | Review Enhanced/High contracts; approve clauses |
| InfoSec | As needed | Conduct security reviews for Enhanced+ |

**Optional but valuable:**
- Privacy/DPO for data-intensive vendors
- EHS for physical safety vendors
- AI Governance for AI/ML vendors
- Executive sponsor for program visibility

---

## Getting Buy-In

**For executives:** Share `docs/executive_summary.md` which covers:
- Risk reduction benefits
- Regulatory compliance alignment
- Time savings from standardization
- Cost avoidance from better contract terms

**For procurement:** Emphasize:
- Faster vendor onboarding for low-risk vendors
- Clear guidance (no more guessing what's needed)
- Defensible decisions

**For requestors:** Emphasize:
- Predictable timelines
- Clear requirements upfront
- Faster approvals for standard vendors

---

## Need Help?

If you encounter scenarios not covered by the framework:
1. Document the scenario
2. Propose a scoring interpretation
3. Get stakeholder alignment
4. Update the rubric or add an example

The framework is designed to be extended. Fork it, customize it, make it yours.

---

*Questions? Create an issue in this repository or adapt the FAQ for your organization.*
