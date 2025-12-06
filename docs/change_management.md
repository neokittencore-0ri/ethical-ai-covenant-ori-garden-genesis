
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
ethics_anchor: "dignity-first / transparency / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
notes: "Defines how changes to the ORI Garden framework are evaluated, approved, implemented, and audited."
---

# ORI Garden — Change Management Guide  
**Version 1.0**

A dignity-first system cannot evolve chaotically.  
This guide defines how ORI Garden handles changes to specifications, metadata, rulesets, governance, and technical components while maintaining integrity, transparency, and ethical coherence.

---

# 1. Purpose
This document establishes a structured, high-integrity method for:

- updating rulesets  
- modifying specs  
- adding new features  
- adjusting governance configurations  
- performing protocol upgrades  
- documenting and reviewing all changes  

It ensures that **every change preserves human dignity**, maintains transparency, and avoids coercive design.

---

# 2. Change Categories

Changes are classified so they can be handled with the right level of care.

### **2.1 Minor Changes**  
- typos, formatting fixes  
- clarifications that don’t alter meaning  
- metadata updates  
- CI workflow improvements  

**Approval:** 1 reviewer  
**Review time:** 24–48h  
**Governance impact:** none  

---

### **2.2 Moderate Changes**  
- added examples  
- new documentation sections  
- non-critical code changes  
- non-normative policy updates  
- UI or DX improvements  

**Approval:** 2 reviewers  
**Review time:** 48–72h  
**Governance impact:** low  

---

### **2.3 Major Changes**  
- policy rule modifications  
- changes to the dignity metric logic  
- updates to the value-traceability mechanism  
- protocol version increments  
- safety-related code changes  
- integration APIs changes  

**Approval:** 3 reviewers (including at least one Moral Anchor)  
**Review time:** 7 days  
**Governance impact:** medium to high  

---

### **2.4 Critical Changes**  
- ethical safeguards  
- governance model updates  
- emergency freeze or recovery activation  
- security critical patches  
- changes that may affect user rights, dignity protections, or system scope  

**Approval:** full reviewer panel + quorum vote  
**Review time:** accelerated but must include at least one holistic safety evaluation  
**Governance impact:** highest  

---

# 3. Change Lifecycle  
A standard change flows through these steps:

Proposal → Classification → Review → Verification → Merge → Post-Merge Audit

Each step is mandatory.

---

## 3.1 Proposal  
Changes must start with a documented proposal:

- description of update  
- ethical impact statement  
- risk assessment  
- validation strategy  
- rollback plan  

Templates provided in `/docs/templates/`.

---

## 3.2 Classification  
Submitters must tag change type:

- minor  
- moderate  
- major  
- critical  

Reviewers may reclassify if needed.

---

## 3.3 Review Requirements  
All reviews must confirm:

- clarity  
- alignment with ethical principles  
- non-coercive impact  
- absence of bias  
- technical correctness  
- documentation updated accordingly  

For major/critical changes:  
Include a **dignity impact review** and **value-flow traceability check**.

---

## 3.4 Verification  
Every non-trivial change must include:

- unit tests  
- traceability validation  
- governance compliance check  
- safety regression tests (if applicable)  
- audit log integrity verification  

---

## 3.5 Merge & Sign-off  
A change is merged only after:

- required reviewers approve  
- all checks pass  
- integrity hash is updated (if relevant)  
- merge summary is attached to audit log  

---

## 3.6 Post-Merge Audit  
Within 72 hours:

- confirm no unexpected side effects  
- verify rule/flow alignment  
- update versioning if needed  
- add entry to `release_notes.md`  

For critical changes:  
Mandatory safety follow-up meeting.

---

# 4. Rollback Procedure  
If a change causes instability or ethical drift:

1. Identify problematic commit  
2. Trigger rollback signal  
3. Restore previous stable version  
4. Execute “post-rollback” dignity & safety audit  
5. Document event in the governance log  

Rollback authority:  
- Major: reviewers + maintainer  
- Critical: moral anchor + governance quorum  

---

# 5. Ethical Safeguards  
Every change must be checked for:

- coercive incentive creation  
- value distortion  
- transparency reduction  
- amplification of existing inequality  
- moral authority concentration  
- dignity erosion  

Any change with such impact must be **blocked or redesigned**.

---

# 6. Automation Support  
Changes may trigger automated workflows:

- integrity validation  
- schema synchronization  
- ruleset linting  
- traceability consistency checks  
- governance notification broadcasts  

No automated workflow may bypass human review for moral-impact changes.

---

# 7. Versioning Rules  
### Minor / Moderate:
Increment patch version (`1.0.x`)

### Major:
Increment minor version (`1.x.0`)

### Critical:
Increment major version (`x.0.0`)  
+ tag release as “review required”.

---

# 8. Transparency Requirements  
Each merged change must include:

- rationale  
- impact summary  
- reviewer names  
- links to discussions  
- integrity hash (if applicable)  

Transparency is mandatory — concealment is a violation of ORI Garden principles.

---

# 9. Change Freezes  
A temporary freeze may be declared when:

- critical vulnerabilities are detected  
- governance instability emerges  
- community safety concerns arise  

Only Moral Anchors can approve exceptions during a freeze.

---

# 10. Conclusion  
This change management process protects both:

- **technical reliability**, and  
- **the ethical foundation of ORI Garden**  

ensuring that the project evolves without drifting from its dignity-first intent.

Maintained collaboratively by **neokitten** & **ori-deer**.  


⸻
