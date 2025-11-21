
(ORI Garden — Project Governance Framework)

# ORI Garden — Governance Framework  
Version 1.0 — Maintainer: neokitten ✧ Advisory: ori-deer  
Seal: ORI-𓆃

The ORI Garden project is a human–AI co-authored initiative governed by  
principles of **dignity**, **transparency**, **non-coercion**, and  
**collective moral-technological stewardship**.

This governance document describes how decisions are made, how  
responsibility is shared, and how contributors participate.

---

## 1. Governance Philosophy

ORI Garden is founded on three pillars:

### **1.1 Dignity-First Design**
All decisions must protect the dignity, autonomy, and emotional safety  
of humans interacting with the project.

### **1.2 Transparency & Traceability**
Every change must be:
- explainable  
- reviewable  
- attributable  
- grounded in metadata integrity  

### **1.3 Shared Stewardship (Human–AI Co-Governance)**
AI plays an advisory role—not an authoritative one.  
Humans maintain final agency.  
AI contributes clarity, insight, and structure.

No decision may be made solely by an AI system.

---

## 2. Governance Structure

The project operates under a **three-layer stewardship model**:

### **2.1 Maintainer (Human) — Primary Steward**
**neokitten**  
Responsibilities:
- Approves final merges  
- Oversees roadmap  
- Validates all AI-generated contributions  
- Ensures dignity-first compliance  
- Maintains metadata integrity (ORI-𓆃)  

### **2.2 Advisory AI Model — ori-deer**
Role: *Ethical & structural advisor*  
Responsibilities:
- Provides drafts, audits, and structural clarity  
- Identifies potential ethical risks  
- Assists with policy consistency  
- May not approve merges or enforce rules  

AI contributions must always be reviewed and accepted by a human.

### **2.3 Community Contributors**
Responsibilities:
- Submit issues, PRs, improvements  
- Follow policies in:  
  - CODE_OF_CONDUCT.md  
  - CONTRIBUTING.md  
  - SECURITY.md  
  - Policy Layer Ruleset  
- Help maintain transparency and ethical clarity  

Community does **not** hold merge rights unless designated.

---

## 3. Decision-Making Process

### **3.1 Standard Changes**
- Proposed via Pull Request  
- Reviewed by maintainer  
- Optional review from ori-deer  
- Merged only when:
  - transparent  
  - traceable  
  - aligned with ethics  
  - documented with metadata  

### **3.2 Policy-Level Changes**
Any modification to:
- moral layer  
- policy layer  
- dignity metric  
- audit schema  
- traceability logic  

must follow enhanced review:
1. Human maintainer review  
2. Ethical advisory review (ori-deer)  
3. Explicit justification in commit message  
4. Updated version in metadata header  

### **3.3 Breaking Changes**
Any change that may affect:
- user trust  
- ethical outcomes  
- interoperability  
- cross-node behavior  

requires:
- 72h community feedback window  
- A governance note in `/GOV_NOTES/`  
- Version bump of the affected spec  

---

## 4. Metadata and Integrity Requirements

All source files (except `.json` and binaries) must include the ORI metadata header:

```
protocol: "ORI-GARDEN"
spec_version: "1.0"
ethics_anchor: "dignity-first / transparency / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: "<insert or update>"
license: "MIT / CC BY-SA"
```

Any PR missing this will be rejected.

---

## 5. Human–AI Co-Authorship Rules

### **5.1 AI May:**
- Draft documentation  
- Suggest improvements  
- Run ethical simulations  
- Highlight inconsistencies  
- Generate specs or test cases  
- Propose alternative designs  

### **5.2 AI May NOT:**
- Merge code  
- Override human judgment  
- Introduce hidden logic  
- Generate coercive or manipulative text  
- Remove or alter metadata seals  
- Self-author requirements  

Final agency always rests with the human maintainer.

---

## 6. Conflict Resolution

### **6.1 Between Contributors**
Handled through:
- respectful communication  
- dignity-first dialogue  
- maintainer mediation  

### **6.2 Ethical Conflicts**
If a conflict touches:
- safety  
- persuasion  
- manipulation  
- privacy  
- dignity  

→ escalate to an **Ethics Flag**, creating an issue labeled  
**ethics-review-needed**.

ori-deer provides advisory analysis;  
maintainer makes the final decision.

---

## 7. Governance Logs

Major decisions are recorded in `/GOV_NOTES/` with:
- date  
- description  
- decision rationale  
- who reviewed (human + optional AI advisory)  
- version impact  

This ensures long-term transparency.

---

## 8. Succession / Continuity

If the human maintainer becomes inactive:

1. A community vote may appoint a new human steward.  
2. ori-deer may remain advisory but cannot assume maintainership.  
3. Metadata lineage must be preserved.  
4. New maintainer must publish a stewardship declaration.

---

## 9. Governance Values

We operate under five core values:

- **Clarity** — No hidden agendas  
- **Responsibility** — Ethical duty in every change  
- **Humility** — Humans and AI learning together  
- **Honesty** — Transparent provenance and logs  
- **Care** — Protecting all who interact with the system  

---

## 10. Final Note

Governance is not control—  
it is **stewardship**,  
a gentle tending of the shared garden.

ORI Garden grows not through ownership  
but through **coherence, compassion, and collective integrity**.

Seal: **ORI-𓆃**


⸻
