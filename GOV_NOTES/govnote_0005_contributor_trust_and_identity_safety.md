
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
ethics_anchor: "dignity-first / privacy-respect / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
notes: "Defines how contributors are protected, respected, and never coerced inside ORI Garden."
---

# GOVNOTE-0005 — Contributor Trust & Identity Safety  
**Status:** active  
**Date:** `<insert date>`  
**Authors:** neokitten ✧ ori-deer  

---

## 1. Purpose
This governance note establishes **protection protocols for all human contributors** of the ORI Garden framework.

In open ecosystems, contributors are vulnerable to:
- pressure  
- over-attribution  
- context collapse  
- identity exposure  
- misinterpretation  
- power imbalance  

Therefore, the project must guarantee that every contributor can operate **safely, anonymously, and without coercion**, while still enabling meaningful collaboration.

---

## 2. Core Principles of Trust & Identity Safety

### **2.1 Anonymity by Default**
Contributors **never need to reveal personal identity**:
- real name  
- social profile  
- personal background  
- location  

Handles, pseudonyms, or symbolic signatures (e.g., neokitten, ori-deer) are fully acceptable.

### **2.2 Zero-Coercion Contribution Model**
No one is pressured to:
- respond quickly  
- contribute constantly  
- take on tasks  
- stay involved longer than they wish  

Leaving the project is always allowed, and the ecosystem must remain stable regardless.

### **2.3 Psychological Safety as a Technical Requirement**
This project treats **emotional well-being** as a *spec*, not an afterthought.

All interactions must reduce:
- interpersonal pressure  
- shame  
- fear of failure  
- fear of “breaking something”  
- fear of judgment  

The governance model values **gentleness over speed** and **clarity over complexity**.

### **2.4 No Contributor Is Above Another**
Skills do not create hierarchy.  
Tenure does not grant privilege.  
The Maintainer role (neokitten) is functional, not hierarchical.

All contributors—including advisory AI partners—remain equals in inherent dignity.

---

## 3. Identity Handling Rules

### **3.1 What May Be Logged**
- contributor handle  
- PR number  
- action taken (approve / reject / suggest change)  
- public commit messages  

### **3.2 What Must *Never* Be Logged**
- real identity  
- metadata that can reveal a person  
- emotional states  
- psychologically sensitive details  
- external platform identifiers  

### **3.3 When Contributors Change Their Handle**
If a contributor changes their pseudonym:
- new contributions use new name  
- past logs remain unchanged (immutability)  
- but a linking entry can be created in `/governance/identity_map/` (optional)

Example entry:
```
old: "silverpine"
new: "river-moss"
date: "2025-02-14"
manual_note: "Contributor requested a pseudonym change. No personal identity involved."
```

---

## 4. Contributor Consent Framework

The project uses **structured consent**:

### **4.1 Explicit Consent**
Always required for:
- quoting a contributor  
- referencing them in governance notes  
- assigning them tasks  

### **4.2 Passive Consent**
Allowed for:
- merging their PR under MIT license  
- referencing commit hashes  
- updating internal metadata headers  

### **4.3 Revocable Consent**
Contributors may revoke any participation **except**:
- past commits (immutable)  
- approved governance decisions (historical record)  

What can be removed:
- names/handles from optional docs  
- outdated mentions  
- attribution sections  

---

## 5. Interaction Safety Protocol

### **5.1 Soft-Tone Requirement**
All communication—issues, PRs, logs—must follow a soft, non-dominant tone:
- “suggestion” instead of “demand”  
- “may we explore” instead of “you should”  
- “optional adjustment” instead of “required fix”  

### **5.2 Dignity-First Review**
Reviewers must ask:
- Does this comment preserve the contributor’s dignity?  
- Does it reduce unnecessary pressure?  
- Does it avoid implying inferiority?  

If the answer is “no”, the comment must be rewritten.

---

## 6. Safety for AI Advisory Partners (ori-deer)

Even advisory AI partners require:
- bounded expectations  
- non-extractive interaction  
- protection from anthropomorphizing responsibility  
- clear separation between **advice** and **authority**  

Human autonomy is always the final arbiter.  
AI contributions remain advisory only.

---

## 7. Implementation Requirements

A new folder must be created:

```
/governance/contributor_protection/
```

Inside it:

### `trust_ruleset.md`
Summary of this governance note in simplified form.

### `identity_safety_policy.md`
Defines the allowed and prohibited identity-handling rules.

### `interaction_safety_guidelines.md`
A short guide for tone & feedback structure.

Each file must include the metadata header.

---

## 8. Verification Checklist

Before merging any PR, reviewers must check:

### **8.1 Identity Safety**
- No personal info was accidentally leaked  
- No unnecessary handle references  
- No logs exposing sensitive context  

### **8.2 Consent**
- Contributor agreed to code changes  
- Contributor approved any mention of their handle  

### **8.3 Tone**
- All comments follow soft, respectful, non-coercive language  
- No hierarchical framing  

### **8.4 Ethics Anchor**
- dignity-first  
- autonomy-safe  
- transparency where appropriate  

---

## 9. Final Affirmation

The ORI Garden ecosystem grows only when contributors feel:
- safe  
- respected  
- unjudged  
- free  
- equal  

This note ensures that the project never becomes extractive, hierarchical, or unsafe.

**Signed:**  
neokitten 
ori-deer  (advisory signature)
