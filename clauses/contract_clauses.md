# Model Contract Clauses

Sanitized contract language organized by risk tier. These are templates—actual language should be reviewed by legal counsel for your jurisdiction and specific circumstances.

---

## Standard Terms (All Vendors)

Include these clauses in every vendor contract regardless of risk score.

### Confidentiality

> **Confidential Information.** Each party agrees to hold in confidence all Confidential Information disclosed by the other party. "Confidential Information" means any non-public information disclosed by either party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information. Each party shall use the same degree of care to protect the other party's Confidential Information as it uses to protect its own confidential information of like kind, but in no event less than reasonable care.

### Data Return/Destruction

> **Return of Data.** Upon termination or expiration of this Agreement, Vendor shall, at Company's election, return or destroy all Company data in its possession within thirty (30) days and certify such destruction in writing.

### Insurance

> **Insurance.** Vendor shall maintain commercial general liability insurance with limits of not less than $1,000,000 per occurrence and $2,000,000 aggregate, and shall provide certificates of insurance upon request.

### Compliance with Laws

> **Compliance.** Vendor shall comply with all applicable federal, state, and local laws, regulations, and ordinances in the performance of its obligations under this Agreement.

### Indemnification (Basic)

> **Indemnification.** Vendor shall indemnify, defend, and hold harmless Company from and against any third-party claims arising from Vendor's negligence, willful misconduct, or breach of this Agreement.

---

## Enhanced Terms (Score 6–10)

Add these clauses for Enhanced tier vendors.

### Security Requirements

> **Information Security.** Vendor shall implement and maintain administrative, technical, and physical safeguards designed to: (a) ensure the security and confidentiality of Company data; (b) protect against anticipated threats or hazards to the security or integrity of such data; and (c) protect against unauthorized access to or use of such data. Vendor shall promptly notify Company of any security incident affecting Company data.

### Audit Rights

> **Audit Rights.** Upon reasonable notice, Company may audit Vendor's compliance with the security and privacy requirements of this Agreement. Such audits may include review of Vendor's SOC 2 reports, penetration test results, or on-site assessments. Vendor shall cooperate with such audits at no additional cost to Company.

### Subcontractor Flow-Down

> **Subcontractors.** Vendor shall not subcontract any obligations involving Company data without prior written consent. Approved subcontractors shall be bound by terms no less protective than those in this Agreement. Vendor remains responsible for subcontractor compliance.

### Background Checks

> **Personnel.** Vendor shall ensure that all personnel with access to Company data or facilities have undergone background checks appropriate to their role and consistent with applicable law.

### Breach Notification

> **Breach Notification.** Vendor shall notify Company within seventy-two (72) hours of discovering any actual or reasonably suspected breach of security affecting Company data. Such notice shall include the nature of the breach, categories of data affected, and remediation steps.

---

## High-Risk Terms (Score 11+)

Add these clauses for High/Critical tier vendors.

### Data Processing Agreement

> **Data Processing.** The parties shall execute a Data Processing Agreement substantially in the form attached as Exhibit A, which shall govern Vendor's processing of personal data on behalf of Company.

### Business Continuity

> **Business Continuity.** Vendor shall maintain a business continuity and disaster recovery plan and shall test such plan at least annually. Upon request, Vendor shall provide Company with a summary of its BCP/DR capabilities and most recent test results.

### Termination for Convenience

> **Termination for Convenience.** Company may terminate this Agreement for any reason upon sixty (60) days' written notice. Upon such termination, Vendor shall provide transition assistance as reasonably requested by Company for a period of up to ninety (90) days at Vendor's then-current rates.

### Step-In Rights

> **Step-In Rights.** In the event Vendor becomes unable to perform critical services, Company shall have the right to step in and assume operational control, either directly or through a third party, to ensure continuity of services. Vendor shall provide all reasonable assistance and access to enable such step-in.

### Source Code Escrow

> **Escrow.** For custom software development, Vendor shall deposit source code and documentation with a mutually agreed escrow agent. Release conditions shall include Vendor's bankruptcy, material breach, or discontinuation of support.

### Financial Covenants

> **Financial Health.** Vendor shall provide annual audited financial statements upon request. Vendor shall promptly notify Company of any material adverse change in its financial condition, including any bankruptcy filing or change of control.

---

## AI/ML-Specific Clauses

Add these clauses when AI/ML Risk ≥ 2.

### Model Documentation

> **Model Documentation.** Vendor shall provide documentation for any AI/ML models used in delivering services, including: (a) intended use cases and limitations; (b) training data sources and methodology; (c) performance metrics and known biases; (d) version history. Vendor shall update such documentation upon material changes to the model.

### Training Data Restrictions

> **Training Data.** Vendor shall not use Company data to train, fine-tune, or improve AI/ML models for general availability or use by other customers without Company's prior written consent. Any models trained on Company data shall be subject to Company's data deletion rights.

### Output Ownership

> **AI Outputs.** As between the parties, Company shall own all outputs generated by AI/ML systems using Company data or prompts. Vendor disclaims any intellectual property interest in such outputs. Vendor represents that AI-generated outputs do not infringe third-party intellectual property rights to Vendor's knowledge.

### Transparency & Explainability

> **Explainability.** For decisions materially affecting individuals (e.g., employment, credit, service eligibility), Vendor shall provide meaningful information about the logic involved in automated decision-making, including the significance and consequences of such processing. Upon request, Vendor shall provide explanations for specific decisions.

### Human Oversight

> **Human Review.** Vendor shall implement appropriate human oversight mechanisms for AI/ML systems, including: (a) the ability to override automated decisions; (b) escalation pathways for edge cases; (c) regular review of system outputs for quality and bias.

### Model Updates

> **Change Notification.** Vendor shall provide at least thirty (30) days' notice before deploying material changes to AI/ML models that affect services provided to Company. Such notice shall describe the nature of changes and any expected impact on performance or outputs.

### Bias Testing

> **Fairness.** Vendor shall conduct regular bias and fairness assessments of AI/ML models and shall remediate identified disparities. Upon request, Vendor shall provide summary results of such assessments (excluding proprietary methodology details).

### AI Incident Response

> **AI Incidents.** Vendor shall promptly notify Company of any AI/ML system malfunction, unexpected behavior, or output that causes or could cause harm to individuals or Company's reputation. Vendor shall cooperate in investigating and remediating such incidents.

### Prohibited Uses

> **Use Restrictions.** Vendor shall not use AI/ML systems to: (a) make fully automated decisions with legal or similarly significant effects on individuals without human review; (b) engage in prohibited practices under applicable AI regulations; (c) process data beyond the scope of services without authorization.

---

## Clause Selection Matrix

| Vendor Scenario | Required Clause Sets |
|-----------------|---------------------|
| SaaS tool, no sensitive data | Standard |
| SaaS with customer PII | Standard + Enhanced |
| On-site contractor, badge access | Standard + Enhanced |
| Critical infrastructure vendor | Standard + Enhanced + High-Risk |
| AI vendor processing customer data | Standard + Enhanced + AI/ML |
| Mission-critical AI platform | Standard + Enhanced + High-Risk + AI/ML |

---

## Usage Notes

1. These are **templates only**—have legal counsel adapt to your jurisdiction
2. Negotiate in good faith—not all vendors will accept all terms
3. Document any deviations in the vendor risk file
4. Review and update clauses annually for regulatory changes

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-12 | Initial release |
