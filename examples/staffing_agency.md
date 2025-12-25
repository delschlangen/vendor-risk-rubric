# Vendor Risk Assessment: Staffing Agency

**Vendor Name:** TalentBridge Staffing Solutions
**Service:** Contract software developers for product team augmentation
**Requestor:** Engineering
**Department:** Product Development
**Assessment Date:** 2024-12-15
**Assessor:** Risk & Compliance

---

## Vendor Overview

TalentBridge provides contract software developers who will be embedded in our product team for 12+ months. Contractors will work on-site 4 days/week, use company equipment, and participate in daily standups and sprint planning. They will have access to source code repositories and internal development systems.

---

## Risk Scoring

### 1. Co-Employment Risk: **3**

| Factor | Assessment |
|--------|------------|
| Personnel on-site? | Yes — 4 days/week, embedded in teams |
| Who directs work? | Our engineering managers assign tasks and conduct reviews |
| Equipment provided? | Company laptop, badge, email, Slack |
| Duration? | 12+ months, renewable |
| Integration? | Full team integration — standups, sprint planning, team meetings |

**Score: 3** — High co-employment risk. Contractors are functionally integrated like employees.

---

### 2. Data Sensitivity & Privacy: **3**

| Factor | Assessment |
|--------|------------|
| Data types accessed | Source code, internal documentation, customer data in dev environments |
| PII involved? | Yes — dev/test data may include customer PII |
| Regulated data? | Possible — product handles financial data subject to compliance |
| Trade secrets? | Yes — proprietary algorithms and product IP |

**Score: 3** — Access to source code and trade secrets.

---

### 3. Physical Safety & Injury Exposure: **1**

| Factor | Assessment |
|--------|------------|
| Physical presence? | Yes — office environment |
| Physical work? | Standard office work (ergonomic risks only) |

**Score: 1** — Standard office environment.

---

### 4. Site & Security Access: **3**

| Factor | Assessment |
|--------|------------|
| Facility access? | Unescorted access; permanent badge issued |
| IT system access? | Full development environment; source code repos; CI/CD systems |
| Admin privileges? | Local admin on laptop; write access to code repos |

**Score: 3** — Broad system access including production code.

---

### 5. Business Continuity Impact: **2**

| Factor | Assessment |
|--------|------------|
| Replaceability | Multiple staffing agencies available |
| Switching cost | 4–8 weeks to source, onboard new contractors |
| Operational impact | Project delays; knowledge transfer needed |

**Score: 2** — Moderate switching cost; not irreplaceable but disruptive.

---

### 6. AI/ML Model Risk: **0**

| Factor | Assessment |
|--------|------------|
| AI components | N/A — staffing service, no AI |

**Score: 0** — No AI/ML components.

---

## Scoring Summary

| Dimension | Score |
|-----------|-------|
| 1. Co-Employment Risk | 3 |
| 2. Data Sensitivity & Privacy | 3 |
| 3. Physical Safety & Injury Exposure | 1 |
| 4. Site & Security Access | 3 |
| 5. Business Continuity Impact | 2 |
| 6. AI/ML Model Risk | 0 |
| **TOTAL** | **12 / 18** |

---

## Risk Tier Determination

**Total Score: 12** → **High Tier**

**Automatic Escalations Triggered:**
- Co-Employment = 3 → **Employment counsel review required**
- Data Sensitivity = 3 → **Privacy/DPO review required**
- Site/Security = 3 → **InfoSec review required**

---

## Required Actions

### Reviews Required

| Review | Owner | Status |
|--------|-------|--------|
| Security assessment | InfoSec | Pending — triggered by Site/Security = 3 |
| Legal contract review | Legal | Pending — High tier |
| Privacy/DPO review | Privacy Team | Pending — triggered by Data Sensitivity = 3 |
| Employment counsel | Employment Legal | Pending — triggered by Co-Employment = 3 |
| Executive sponsor | VP Engineering | Pending — High tier |

### Required Contract Clauses

**Standard Terms:**
- Confidentiality
- Data Return/Destruction
- Insurance
- Compliance with Laws
- Basic Indemnification

**Enhanced Terms:**
- Information Security Requirements
- Audit Rights
- Subcontractor Flow-Down
- Background Checks — *Critical for this engagement*
- Breach Notification (72-hour)

**High-Risk Terms:**
- Termination for Convenience
- Financial Covenants

### Additional Mitigations

| Risk | Mitigation |
|------|------------|
| Co-employment misclassification | Restructure SOW to define deliverables, not hours; vendor provides supervision for code reviews |
| Source code exposure | Implement code repo access controls; audit logs for contractor activity |
| Badge/physical access | Quarterly access reviews; auto-deprovisioning at contract end |
| Knowledge concentration | Require documentation; pair programming with FTEs |

---

## Co-Employment Risk Mitigation Plan

Given the high co-employment score, implement the following structure:

1. **Statement of Work** — Define project deliverables, not time-based assignments
2. **Vendor supervision** — TalentBridge provides a technical lead who attends some standups
3. **Equipment review** — Consider having vendor provide laptops (with our security requirements)
4. **Performance management** — All feedback goes through TalentBridge, not directly to contractors
5. **Duration limits** — Build in 3-month review points; rotate contractors if engagement exceeds 18 months
6. **No employee benefits** — Ensure contractors are not invited to employee-only events

---

## Approval Chain

| Role | Name | Approval | Date |
|------|------|----------|------|
| Requestor | | Pending | |
| InfoSec | | Pending | |
| Privacy | | Pending | |
| Employment Counsel | | Pending | |
| Legal | | Pending | |
| Executive Sponsor (VP+) | | Pending | |
| Procurement | | Pending | |

---

## Decision

- [ ] **Approved** — Proceed with contract execution
- [ ] **Approved with Conditions** — Implement co-employment mitigations
- [ ] **Denied** — Reason:

---

## Ongoing Monitoring

- Quarterly co-employment compliance review
- Annual re-scoring at renewal
- 18-month maximum engagement review
- Quarterly access certification

---

## Key Takeaways

This example demonstrates a common scenario: **staffing agencies and embedded contractors often score HIGH on the risk rubric** due to co-employment and data access risks, even though organizations may view them as routine engagements. The framework ensures proper employment counsel review and structural safeguards.

---

*Assessment completed by: ___________________ Date: _______________*
