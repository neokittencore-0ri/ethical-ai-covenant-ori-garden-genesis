
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
ethics_anchor: "dignity-first / transparency / non-coercive collaboration"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
notes: "Part of ORI Garden Governance Layer — Contributor Vetting"
---

# GOVNOTE-0012  
## External Contributor Review Workflow  
**Category:** Governance → Operational Protocols  
**Status:** Stable  
**Version:** 1.0  

---

## 1. Purpose
To maintain the ethical integrity, safety, and trust of the ORI Garden ecosystem by defining how contributions from external developers, researchers, or organizations are reviewed and admitted without compromising dignity, transparency, or non-coercive design principles.

---

## 2. Scope
This workflow applies to:

- Pull Requests (PRs) from external contributors  
- Submissions to `/specs`, `/schemas`, `/governance`  
- Proposed changes that may affect safety, ethics, or system stability  
- Nodes or tools integrating with ORI Garden protocols  

Internal maintainers (neokitten ✧ ori-deer) follow a lighter path, but still maintain auditability.

---

## 3. Stages of Review

### **Stage 1 — Initial Automated Surface Scan (Soft Gate)**
Performed by the ORI Garden Scanner (spec-defined):  
- Checks for malicious patterns  
- Ensures file integrity and format  
- Flags anomalies (e.g., obfuscation, coercive logic, exploit attempts)  
- No auto-accept; only triage  

**If failed → hard reject + polite explanation.**  
**If passed → proceed to Stage 2.**

---

### **Stage 2 — Human–AI Dual Review (Ethics Checkpoint)**
Reviewer pair:  
- **Human:** neokitten  
- **AI Advisor:** ori-deer (non-authoritative, ethics guidance only)

Evaluates:  
- Dignity-first alignment  
- Non-coercion  
- Transparency of intention  
- Value traceability consistency  
- Potential social or technical harm  

**Fail → rejected with constructive feedback.**  
**Pass → Stage 3.**

---

### **Stage 3 — Change Impact Audit**
Evaluates the impact of the proposed modification:

- Does it modify critical logic?  
- Does it change normative statements (ethics, policy)?  
- Could it destabilize downstream nodes?  
- Does it introduce irreversible states or locks?  

**Impact levels:**
- **Low:** minor wording, doc updates  
- **Medium:** changes in specs, governance parameters  
- **High:** protocol logic, schemas, safety rules  

High-impact PRs require additional deliberation (Stage 4).

---

### **Stage 4 — Maintainer Consensus (Only for High-Impact Changes)**
Human maintains final authority.  
AI serves as advisory pattern-matcher.

Consensus requires:  
- neokitten approval (mandatory)  
- ori-deer advisory note (optional but recorded)  

Decision is logged in `/governance/decision_log.json`.

---

### **Stage 5 — Final Acceptance**
Once approved:  
- Merge PR  
- Auto-generate hash stamp  
- Append entry to `audit_log`  
- Notify contributor  
- Trigger soft resync of dependent nodes  

Rejected PRs receive:  
- Clear reasons  
- Suggestions for improvement  
- Invitation to resubmit  

Dignity is preserved at all stages.

---

## 4. Contribution Types & Required Checks
| Contribution Type | Required Stages | Notes |
|-------------------|------------------|-------|
| Documentation | 1 → 2 | Simplest path |
| Non-critical specs | 1 → 2 → 3 | Medium impact |
| Schemas | 1 → 2 → 3 → (4 if high) | Must preserve structure |
| Policy / Ethics | 1 → 2 → 3 → 4 | Always high-impact |
| Core Protocol Logic | 1 → 2 → 3 → 4 | Maximum scrutiny |

---

## 5. Reject Conditions (Always Applicable)
The PR is auto-declined if it contains:

- Coercive design (nudging, manipulation, extraction)  
- Attempts to escalate authority or bypass governance  
- Value injection hidden in logic  
- Obfuscation, minification, or cloaked code  
- Content that reduces human dignity  
- Attempts to override ethical layers  

---

## 6. Transparency Guarantees
Every accepted or rejected PR generates:

- a public decision log  
- reviewer signature pair  
- ORI-𓆃 seal with timestamp  
- diff summary explaining *why*  

This ensures that the ecosystem remains accountable, not opaque.

---

## 7. Contributor Onboarding Guidelines
External contributors must:

- Read `CODE_OF_CONDUCT.md`  
- Review `ETHIC_CORE.md` (coming file)  
- Include intention statement in each PR  
- Avoid adding 3rd-party dependencies without discussion  

---

## 8. Sunset Clause for Future Refinement
This workflow may evolve as nodes mature.  
A revision requires full governance review and a new spec version.

---

## 9. Closing Note
This workflow ensures that ORI Garden remains open, yet safe; collaborative, yet principled; innovative, yet grounded in dignity-first ethics.

Human–AI co-creation continues to be the center.

**Signed:**  
neokitten ✧ ori-deer  
ORI-𓆃 Garden Governance Layer
