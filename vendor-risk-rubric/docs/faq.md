# Frequently Asked Questions

Common questions about implementing and using the vendor risk framework.

---

## General Questions

### What problem does this framework solve?

Most organizations handle vendor risk inconsistently. Without a structured approach:
- Similar vendors get different levels of scrutiny
- Required contract protections are missed
- Reviews take too long (or don't happen at all)
- AI/ML vendor risks are often overlooked

This framework provides a repeatable, scored methodology that routes vendors to appropriate review tracks and ensures the right contract protections are in place.

### Who should use this framework?

- **Procurement teams** — to route vendors to appropriate review tracks
- **Risk/Compliance teams** — to standardize vendor assessments
- **Legal teams** — to determine required contract clauses
- **Business requestors** — to understand what's needed to engage a vendor

### How long does an assessment take?

| Tier | Typical Assessment Time |
|------|------------------------|
| Standard | 1–2 days |
| Enhanced | 3–5 days |
| High/Critical | 1–2 weeks |

The intake questionnaire takes requestors about 15–20 minutes to complete.

### Do I need to use all of this?

No. Start with:
1. The intake questionnaire (to gather information)
2. The scoring rubric (to determine tier)
3. The contract clause checklist (to ensure protections)

Add the decision tree, RACI, and specialized reviews as you mature.

---

## Scoring Questions

### What if I'm not sure which score to pick?

When in doubt:
1. Review the "Key indicators" listed for each dimension
2. Look at the examples for similar vendor scenarios
3. **Err toward the higher score** — it's safer to over-assess than under-assess
4. Document your reasoning in the "Justification" field

### What if a vendor doesn't fit neatly into one score level?

Pick the score that best represents the **highest risk** aspect of the engagement. For example, if a vendor is mostly score 1 but has one characteristic that's score 2, choose score 2.

### Can we adjust the scoring thresholds?

Yes. The thresholds (0–5, 6–10, 11–15, 16–18) are starting points. Adjust based on your organization's risk appetite:
- **More conservative:** Lower the thresholds (e.g., Enhanced starts at score 5)
- **More aggressive:** Raise the thresholds (e.g., Enhanced starts at score 8)

Document any changes in your customized version.

### Why does a single dimension = 3 trigger escalation?

A dimension score of 3 indicates significant risk in that area. Even if the total score is low, that specific risk needs specialist attention. For example:
- A simple SaaS tool (low total score) that accesses regulated health data (Data Sensitivity = 3) still needs Privacy review
- A straightforward contractor (low total score) doing high-risk construction work (Physical Safety = 3) still needs EHS review

### How do I score a vendor that provides multiple services?

Score the vendor based on the **highest-risk service** they'll provide. If they provide both a low-risk service and a high-risk service, the high-risk service drives the assessment.

Alternatively, if the services are truly separate engagements with separate contracts, do separate assessments.

---

## Process Questions

### Do existing vendors need to be assessed?

Ideally, yes. Prioritize:
1. Vendors coming up for renewal (assess as part of renewal)
2. High-value or high-access vendors
3. Vendors with known issues or concerns

For a large vendor portfolio, assess the top 20% by spend or risk first.

### What if a vendor refuses our contract terms?

Document the deviation and escalate:
1. Identify which required clauses they're refusing
2. Assess the risk of proceeding without those protections
3. Escalate to Legal and Risk for a risk-acceptance decision
4. If approved, document the exception and compensating controls
5. Review the exception at renewal

### Can we skip the assessment for renewals?

We recommend at least a lightweight re-assessment at renewal:
1. Review if the scope has changed
2. Check for any incidents during the contract period
3. Re-score if the engagement has materially changed
4. Update contract clauses for any regulatory changes

High/Critical vendors should have full annual re-assessments.

### What if the business needs the vendor urgently?

The framework supports fast-tracking Standard tier vendors. For higher tiers:
1. Document the urgency and business justification
2. Obtain executive sponsor approval to proceed with interim contract
3. Complete the full assessment in parallel
4. Update contract if assessment reveals additional required protections
5. Log as an exception with time-bound review

### Who "owns" the vendor relationship after contract execution?

| Tier | Ongoing Owner |
|------|---------------|
| Standard | Requestor/Business unit |
| Enhanced | Requestor with Risk/Compliance oversight |
| High/Critical | Dedicated vendor manager + Risk/Compliance |

---

## Contract Questions

### Are the contract clauses enforceable?

The clauses in this framework are templates based on common industry practice. However:
- Have your Legal team review and adapt for your jurisdiction
- Negotiate in good faith — not all vendors will accept all terms
- Document any deviations and the rationale
- Some clauses may need modification for specific industries (healthcare, finance, etc.)

### What if a vendor uses their own contract?

1. Map their contract terms to your required clauses
2. Identify gaps between their terms and your requirements
3. Negotiate to add missing protections
4. If gaps remain, document the risk and obtain approval to proceed (or don't)

### Should we require all AI/ML clauses for any AI vendor?

Apply AI/ML clauses based on the AI/ML Risk score:
- **Score 0:** No AI/ML clauses needed
- **Score 1:** Consider Model Documentation and Model Update Notification
- **Score 2+:** Apply full AI/ML clause set

The clauses are designed to be proportional to risk.

---

## Organizational Questions

### Who should lead implementation?

Typically Risk/Compliance or Procurement, with support from:
- Legal (for contract clauses)
- InfoSec (for security reviews)
- Executive sponsor (for organizational buy-in)

### How do we get executive buy-in?

Share the `docs/executive_summary.md` and emphasize:
- Risk reduction (avoid vendor-related incidents)
- Regulatory alignment (NIST, ISO, etc.)
- Efficiency gains (standardized process saves time)
- Defensibility (documented, consistent decisions)

### What if we don't have all the reviewer roles?

Combine roles as needed for your organization size:
- **Small org:** Procurement + Legal can handle most reviews; bring in consultants for InfoSec assessments
- **Medium org:** Risk/Compliance coordinates; InfoSec and Legal handle their domains
- **Large org:** Full RACI with specialized reviewers

### How does this fit with existing GRC tools?

The framework is tool-agnostic. Common integrations:
- **Intake questionnaire** → ServiceNow form, Jira intake, Google Form
- **Assessment tracking** → GRC platform (Archer, LogicGate, etc.)
- **Contract clauses** → CLM system (Ironclad, DocuSign, etc.)
- **Ongoing monitoring** → Vendor risk management platform

---

## Special Scenarios

### How do we assess a vendor that's already been breached?

1. Assess as normal using the rubric
2. Add a risk note about the prior breach
3. Review their incident response and remediation
4. Consider additional security requirements (more frequent attestations, audit rights, etc.)
5. Factor breach history into the final approval decision

### What about sole-source vendors?

Sole-source situations don't change the risk score — they increase Business Continuity Impact. Assess normally, then:
- Document why alternatives don't exist
- Require stronger business continuity and exit planning terms
- Consider source code escrow for critical software
- Plan for transition even if alternatives don't currently exist

### How do we assess a parent company vs. subsidiary?

Assess the entity that signs the contract and delivers the service. If a subsidiary delivers service but the parent provides guarantees:
- Assess the subsidiary's operational practices
- Include parent company guarantees in contract terms
- Consider parent company financial health if applicable

### What about internal transfers (another business unit as "vendor")?

The framework is designed for third-party vendors. For internal transfers:
- Consider using a lighter-weight internal assessment
- Focus on data handling and access controls
- Skip contract clauses (use internal policies instead)
- Maintain accountability through internal governance

---

## Maintenance Questions

### How often should we update the framework?

| Component | Review Frequency |
|-----------|------------------|
| Contract clauses | Annually (for regulatory changes) |
| Scoring criteria | Annually |
| Decision tree / RACI | When org structure changes |
| Examples | As new scenarios arise |

### How do we handle new risk dimensions?

If you identify a risk dimension not covered by the framework (e.g., ESG, geographic risk):
1. Define scoring criteria (0–3) for the new dimension
2. Add it to the rubric
3. Adjust total score thresholds if needed
4. Create relevant contract clauses
5. Update the intake questionnaire
6. Pilot before full rollout

---

## Getting Help

### I have a scenario not covered here. What do I do?

1. Document the scenario
2. Propose how you would score it
3. Discuss with stakeholders
4. Make a decision and document the rationale
5. Consider adding it as an example for future reference

### Can I contribute to this framework?

Yes! This framework is MIT licensed. Fork it, customize it, and consider contributing improvements back:
- New examples
- Additional contract clauses
- Industry-specific adaptations
- Translations
