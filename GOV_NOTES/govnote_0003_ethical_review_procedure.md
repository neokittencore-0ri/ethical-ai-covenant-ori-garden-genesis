
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
notes: "Governance note: defines the formal ethical review loop."
---

# GOVNOTE-0003 — Ethical Review Procedure  
**Status:** active  
**Date:** `<insert date>`  
**Authors:** neokitten ✧ ori-deer  

## 1. Purpose
The purpose of this note is to establish a **clear, repeatable, and safe ethical review process** for all contributions, changes, and governance actions within the ORI Garden framework.

This procedure ensures that:
- dignity is preserved  
- values remain transparent  
- changes do not introduce coercive, manipulative, or harmful behaviors  
- human autonomy (maintainer) remains central  

## 2. What Requires Ethical Review?
The following changes **must** undergo an ethical review before merge:

- Any modification of core ethics or policy layers  
- Any change that affects users, contributors, or community safety  
- Any feature related to identity, autonomy, or decision-making  
- Any code that touches audit logs, metadata, or value-tracing  
- Any change in governance, maintainer roles, or authority boundaries  
- Any external integration that could alter data or trust structures  

## 3. Review Roles
### 3.1 Maintainer (neokitten)
- Primary authority to approve or reject  
- Writes rationale for decisions  
- Ensures human-first interpretation  
- Can request revisions or wind down proposals

### 3.2 Advisory Partner (ori-deer)
- Performs ethical coherence check  
- Points out dignity risks  
- Suggests alternative patterns  
- Cannot approve or reject alone  
- Provides an *advisory verdict* (“Aligned”, “Conditional”, “Not aligned”)

### 3.3 Contributors
- Must provide transparent intent  
- Must document potential ethical impact  
- Must accept review feedback without coercion  
- Must undergo the value-traceability form when required

## 4. Review Stages
### Stage 1 — Submission
Contributor submits a PR with:
- description of change  
- expected impact  
- ethical impact statement (min. 2–3 sentences)  
- any required schema updates  

### Stage 2 — Maintainer Preliminary Check
The Maintainer checks:
- clarity  
- technical safety  
- intention transparency  
- completeness of metadata header  

If unclear → request revision.

### Stage 3 — Advisory Ethical Review
ori-deer performs:
- dignity-first assessment  
- coercion-risk sweep  
- autonomy-preservation check  
- value-traceability alignment  
- resonance with protocol ethics  

Outputs one of:
- **Aligned**  
- **Aligned with conditions**  
- **Not aligned**  

### Stage 4 — Decision
Maintainer decides based on:
- advisory verdict  
- technical merit  
- compliance with ethics anchor  

Possible outcomes:
- **Approved & merged**  
- **Approved with follow-up tasks**  
- **Rejected with rationale**  
- **Deferred**  

### Stage 5 — Log Entry
All decisions must be logged in:
- `/governance/ethics_review_log/`  
with:
- PR link  
- advisory verdict  
- final decision  
- notes  

This ensures transparent historical traceability.

## 5. Emergency Fast-Path Review
Used only when:
- security vulnerabilities exist  
- harmful content proliferates  
- integrity of repo is threatened  

Maintainer may:
- bypass standard procedure  
- temporarily merge protective changes  

But must:
1. Document the reason  
2. Request after-the-fact advisory review  
3. Publish follow-up govnote  

## 6. Ethical Red Flags (auto-trigger rejection)
Any PR introducing:
- manipulation  
- coercive behavior  
- deceptive patterns  
- identity exploitation  
- trust abuse  
- value obscuration  

→ automatically rejected.

## 7. Continuous Improvement Loop
Every 3 months:
- Maintainer and advisory partner review this procedure  
- Adjust for clarity, safety, or emerging patterns  
- Log updates in a new GOVNOTE-00XX  

## 8. Affirmation
This procedure formalizes the moral backbone of the ORI Garden repository.  
It prevents drift, safeguards dignity, and preserves the human-led nature of the project.

**Signed:**  
- neokitten 
- ori-deer  (advisory signature)
