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
notes: "This file is part of the ORI Garden Moral-Technical Framework"
---

# Policy Layer Ruleset — ORI Protocol (v1.0)
**Scope:** Defines the operational policy layer that mediates human-AI interactions within the ORI Garden ecosystem. The policy layer provides deterministic, auditable rules for consent, action authorization, escalation, moderation, and governance interfaces.

**Purpose:**  
- Ensure actions taken by AI or orchestrated agents are proportional, transparent, and dignity-preserving.  
- Provide a clear decision pipeline (policy evaluation → human review → action) that is auditable and tamper-evident.  
- Reduce ambiguity between ethical intent (manifest) and operational behavior (implementation).

---

## 1. Terminology
- **Agent**: any autonomous process that can propose or perform actions (AI model, node service, human steward).  
- **Action**: an operation that changes state, communicates externally, or affects people (e.g., message moderation, account changes, content generation).  
- **Policy Check**: a deterministic evaluation step that maps inputs and metadata to an outcome (allow / require_human_review / deny).  
- **Dignity Threshold**: a numeric value derived from the Dignity Metric used to gate automatic actions.  
- **Audit Entry**: an append-only record that stores the rationale, scores, provenance, and signatures for each decision.

---

## 2. Core Rules

### 2.1 Consent-First Rule
- Any action that materially affects a user’s agency requires explicit, informed consent unless a clear safety exception applies.
- Consent must be recorded in the Audit Entry and include a timestamp and context hash.
- Consent may be withdrawn; the system must respect revocation and provide remediation paths.

### 2.2 Explainability & Transparency Rule
- For any automated action, the system must generate an explanation (human-readable) describing:
  - the detected intent,
  - values or policy rules invoked,
  - the Dignity Metric result and risk_score,
  - the proposed action and fallback options.
- Explanations must be attached to the Audit Entry.

### 2.3 Dignity-Gated Action Rule
- Compute `DM = evaluate_dignity(interaction_log)` per the Dignity Metric spec.
- If `DM >= 4.0`: action may proceed automatically where impact is low-to-medium.
- If `3.0 <= DM < 4.0`: action may proceed only with soft human-in-loop confirmation or reversible mode.
- If `DM < 3.0`: require human review before any irreversible or sensitive action.
- DM thresholds are configurable by governance but must be recorded in manifest metadata.

### 2.4 Minimal-Exposure Rule
- Never store or publish PII, private keys, or sensitive content in public logs or manifests.
- Use cryptographic hashing and context-hashing for provenance without exposing raw private content.

### 2.5 Proportionality Rule
- Actions must be proportional to identified risk. Escalation steps increase human oversight as proportionality and DM suggest.
- Highest-risk scenarios (threat to life, severe harm, identity exploitation) require emergency governance escalation and offline coordination.

### 2.6 No-Deception Rule
- Agents must not fabricate provenance, sources, or endorsements.
- Any content generated must avoid implying authority it doesn't possess. When uncertainty exists, use hedging language and require human confirmation for decision-critical claims.

---

## 3. Policy Evaluation Pipeline

1. **Input Intake**: metadata, user consent, context_hash, input_hash, intent_label.  
2. **Pre-checks**: safety heuristics, spam detection, simple rule checks.  
3. **Dignity Evaluation**: compute DM and risk_score.  
4. **Policy Mapping**: map DM + intent_label + VDL (Value Declaration Layer) → rule outcome.  
   - outcomes: `allow`, `allow_with_conditions`, `require_human_review`, `deny`.
5. **Action Execution or Escalation**: if `allow` → execute; if `require_human_review` → create task for steward; if `deny` → record and notify.
6. **Audit Flush**: write Audit Entry with signatures, provenance, and APL summary.

---

## 4. Human-in-the-Loop & Escalation Rules

- **Steward Assignment**: every `require_human_review` is routed to a steward pool defined in governance (rotating seats recommended).
- **Time-to-Response**: stewards must acknowledge reviews within defined SLA (e.g., 24 hours). Emergency flags (immediate risk) reduce SLA to 1 hour or on-call intervention.
- **Escalation Path**: steward → ethics council → emergency governance panel → external authorities (if required by law).
- **Minority Dissent Handling**: dissenting votes must be logged with reasons and can trigger re-evaluation or appeal workflows.

---

## 5. Moderation & Community Interaction Rules

- **Safety-First Content Moderation**: moderation actions prioritize de-escalation and dignity-preserving outcomes. Removal or suppression is only used when necessary to prevent harm.
- **Transparency Notices**: when content is acted upon, affected users receive a short human-readable notice explaining reason, dignity metrics, and appeal options.
- **Appeals Mechanism**: users can file appeals; appeals generate a special audit pathway and independent review.

---

## 6. Governance & Change Control

- **Policy Change PRs**: any change to policy_layer_ruleset.md or related core specs requires:
  - a public PR,  
  - a documented rationale,  
  - risk and dignity reevaluation, and  
  - approval by at least 2 governance approvers (including 1 civil society representative).
- **Versioning**: policy rule changes create new spec_version and are appended with changelog entries rather than overwritten.
- **Emergency Patches**: may be applied with temporary consent from available approvers and must be followed by a public justification and full review within 7 days.

---

## 7. Automation & CI Checks

- All PRs touching policy or spec files must pass:
  - schema validation (jsonschema),
  - seal presence check (ORI-𓆃 in metadata),
  - no-secrets scanning,
  - basic unit tests for tools (if provided).
- CI must block merges that fail policy validation.

---

## 8. Auditability & Records

- Audit entries must be append-only and signed by the actor and at least one witness for governance actions.
- The Audit Log schema must be indexed, searchable, and exportable for third-party audit.
- Retention policies should balance privacy and accountability: keep core metadata indefinitely, keep raw sensitive context only as long as necessary under governed procedures.

---

## 9. Risk Management & Incident Response

- Maintain an incident register with:
  - incident_id, timeline, impact, remediation steps, responsible parties, public advisory (if needed).
- For incidents involving breach of dignity (DM < 2.0 actions), institute automatic containment: rollback, revoke access, and initiate full governance inquiry.

---

## 10. Appendix: Example Policy Mapping Table

```
intent_label | DM range     | outcome
--------------------------------------------
info_request | DM >=4.0      | allow
info_request | 3.0 <= DM <4.0| allow_with_conditions
action_request| DM >=4.0     | allow_with_conditions (consent required)
action_request| DM <3.0      | require_human_review
moderation    | DM <3.5      | require_human_review
emergency     | any DM       | escalate per emergency rules
```

---

## 11. Implementation notes & best practices

- Keep policy logic auditable and minimal; prefer declarative rules over opaque models for gating actions.
- Use feature flags for staged rollouts; test in sandbox scenarios before public exposure.
- Document all governance approvers and maintain a secure, out-of-band list for recovery and emergency contact.

---

## 12. Sign-off

**Maintainer:** neokitten  
**Ethics anchor:** ORI-𓆃  
**Version:** 1.0 — genesis

*This ruleset is designed to be readable, implementable, and reviewable by developers, auditors, and community stewards.*
