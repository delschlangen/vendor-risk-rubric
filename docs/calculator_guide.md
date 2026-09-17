# How to Use the Calculator

*Last reviewed: 2026-09-15 · Framework v1.1.0*

---

## 1. What it is

The interactive calculator at **https://delschlangen.github.io/vendor-risk-rubric/** is a static web page implementing the six-dimension risk rubric. It runs offline and from a file share; nothing is sent to a server — drafts are kept only in your browser and in the link you copy.

---

## 2. Six steps

1. **Fill Assessment details** — vendor, service, requestor, department, assessor, date, and a short overview.
2. **Score each dimension** — click the criteria row or move the slider (0–3) and write the Justification.
3. **Read the results** — the tier badge, total score, and the "Automatic Escalations Triggered" panel. A dimension scored 3 adds a specialist review and the Enhanced clause set but does not change the tier.
4. **Review the panels** — Required Reviews (each tile states why it is required, including conditional ones: Privacy at Data ≥ 2 in Enhanced, Finance/Risk/AI Governance in High and Critical), Required Contract Clauses (individual clauses can be required or recommended by a dimension trigger, e.g. DPA at Data = 3), Regulatory checkpoints, Next steps, and Ongoing monitoring.
5. **Share or file it** — **Copy link** (URL fragment), **Copy summary** (ticket-ready text), **Download .md** (a filled [blank_assessment.md](../templates/blank_assessment.md)), **Download/Import JSON** (re-score at renewal), or **Print** (PDF with approval chain).
6. **Route for approvals** — record justifications, mitigations and sign-offs in the assessment template.

---

## 3. Example presets

The "Load an example" menu loads the four worked examples with their expected results:

| Preset | Expected result |
|--------|-----------------|
| [Low-risk SaaS](../examples/low_risk_saas.md) | 1/18 — Standard |
| [Construction vendor](../examples/construction_vendor.md) | 7/18 — Enhanced, with EHS review |
| [AI analytics vendor](../examples/filled_example.md) | 10/18 — Enhanced, with Privacy and AI Governance reviews and a DPA |
| [Staffing agency](../examples/staffing_agency.md) | 12/18 — High |

---

## 4. What it does not do

- It does not confirm jurisdiction — answer the checkpoint questions and use [jurisdiction_considerations.md](jurisdiction_considerations.md).
- It does not replace approvals or the risk-mitigation table — record those in the template.
- It is not legal advice.

---

## 5. Hosting internally

Copy `docs/index.html`, `app.js`, `styles.css` (and the favicon/og files) to any static host or file share; no build step required. If you change thresholds, change `REVIEW_RULES`/`CLAUSES` in `app.js` and the rubric together.

---

## 6. Related documents

[Quick reference](quick_reference.md) · [FAQ](faq.md) · [Decision tree](../rubric/decision_tree.md) · [RACI matrix](raci_matrix.md)

---
*Framework v1.1.0 · Last reviewed: 2026-09-15 · Next review due: 2027-09 · Found an error? [Open an issue](https://github.com/delschlangen/vendor-risk-rubric/issues)*
