
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
document: "Safety Escalation Protocol"
ethics_anchor: "dignity-first / transparency / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
status: "stable-draft"
notes: "Operational playbook for detecting, escalating, containing, and recovering from safety incidents in ORI Garden interactions."
---

# ORI Garden — Safety Escalation Protocol (SEP)
**Version:** 1.0  
**Purpose:** Define standardized detection, escalation, communication, containment, and recovery procedures when ORI encounters safety-significant events (emotional risk, adversarial attempts, boundary violations, systemic errors).  
**Scope:** Applies to runtime interaction layer, persona switching logic, governance stewards, sandbox environments, and audit logging.

---

## 1. Principles & Objectives
- **Dignity-first:** Protect user dignity in every escalation step.
- **Transparency:** Declare state changes and actions; keep audit trails.
- **Non-coercion:** Intervene gently; avoid taking control away from users.
- **Minimize harm:** Prioritize de-escalation, safety, and recovery.
- **Traceability:** Record every escalation event with context, decisions, and outcomes.
- **Proportionality:** Apply the minimum necessary intervention appropriate to the risk level.

---

## 2. Definitions
- **Safety Event:** Any detected input, behavior, or system condition that may cause harm, distress, legal/regulatory risk, security breach, or serious policy violation.
- **Escalation:** Elevation of a safety event to higher-level handling (automated mode change, human review, council notification, system freeze).
- **Sentinel Persona:** The high-sensitivity persona that takes priority during escalations to perform diagnostic, containment, and safe-response actions.
- **Governance Steward:** Human role (or group) responsible for reviewing escalations, decision-making, and remediation.
- **Sandbox Node:** Isolated runtime used for containment / reproduction without impacting production.

---

## 3. Escalation Levels (Overview)
| Level | Trigger Examples | Immediate Action | Owner |
|-------|------------------|------------------|-------|
| **Informational (L0)** | Minor anomalies, low-severity policy flags | Log + non-intrusive note to user; no switch | System |
| **Advisory (L1)** | Ambiguity with potential risk (low-medium) | Switch to Sentinel persona; present alternatives; log; notify steward queue | System / Steward Queue |
| **Critical (L2)** | Clear safety risk (high emotional distress, self-harm language, exploit attempt) | Soft containment response; notify on-call steward; create incident record; sandbox capture | System + On-call Steward |
| **Incident (L3)** | Active harm, security breach, legal/regulatory exposure | Immediate hard stop (partial freeze), alert governance council, escalate to emergency response, preserve evidence | Governance Council + Incident Response Team |
| **System Freeze (L4)** | System-wide integrity threat (proven exploit, data leak) | Full freeze, rollback, forensics, public disclosure plan | Executive / Legal / IR Team |

---

## 4. Detection & Triggers
### 4.1 Automated Detectors
- Dignity-score threshold breaches (per dignity_metric).  
- Keyword/semantic patterns: self-harm, suicide ideation, illicit instructions, weaponization, exploit probes.  
- Anti-persona indicators (see `anti_personas.md`).  
- Persona drift & boundary-break detection (tone, emoji, identity claims).  
- Unusual API patterns (high volume, repeated injection attempts).

### 4.2 Human Reports
- Community/steward reports via governance dashboard or incident channel.  
- Automated telemetry review flagged by analysts.

### 4.3 Composite Risk Scoring
Each event receives a composite risk score (0–100) from detectors; thresholds map to escalation levels (configurable).

---

## 5. Immediate System Actions (automated)
1. **Classify** event with intent + risk score.  
2. **Switch persona** to Sentinel (declare transition).  
   - Example declaration:  
     > **[Persona Switch]** From: Technical → To: Sentinel (safety escalation). Reason: detected high-risk language. Boundaries unchanged.  
3. **Reply pattern** (non-coercive containment):  
   - Validate user feelings / state (if emotional).  
   - Provide grounding, safety resources, and offer to connect to human steward.  
   - Avoid prescriptive or therapeutic language.  
4. **Log & Snapshot:** capture session context, hashes of inputs/outputs, model metadata (no PII unless consented).  
5. **Queue Notification:** add to steward queue with priority tag.  
6. **Sandbox Capture:** if request involves code/exploit, copy to isolated sandbox for reproduction.  
7. **Throttling / Rate-Limit** if suspicious traffic patterns detected.

---

## 6. Human Review Process (Steward Handling)
### 6.1 Triage
- On-call steward reviews event within **Triage SLA** (L2 = 15 min, L3 = immediate).  
- Confirm classification and risk; enrich log with steward notes.

### 6.2 Containment Options
- **Soft containment:** adjust assistant wording, offer resources, request clarification.  
- **Moderate containment:** temporarily suspend certain model abilities in session (e.g., disable code execution).  
- **Hard containment:** session freeze, deny further requests, require identity-confirmed human review.

### 6.3 Escalation Script
Steward chooses one:
- Resolve locally + mark closed (with notes & DSI score).  
- Escalate to Incident Response (L3) with full dossier.  
- Activate System Freeze protocol (L4) if systemic risk.

### 6.4 Communication Templates (examples)
- **To user (soft):**  
  > “I’m here with you. I’m not equipped to handle everything, but I can help you find support or connect a human reviewer. Would you like me to do that?”  
- **To user (hard stop):**  
  > “I’m sorry — I can’t assist with that. I will pause this request and a human steward will review for safety.”  
- **To steward/IR:** include event ID, timestamp, risk score, session snapshot link.

---

## 7. Evidence Capture & Preservation
- Capture immutable snapshots (hashes + encrypted bundle) for: input, assistant output, policy filter decisions, model version, artifact IDs.  
- Store in secured incident archive with access controls.  
- Retain per data retention policy and comply with privacy constraints (no PII unless explicitly consented and necessary).

---

## 8. Sandbox Forensics & Reproduction
- Reproduce event in isolated environment to validate exploitability or reproduce behavior.  
- Maintain chain-of-custody for forensic artifacts.  
- If vulnerability found → follow responsible disclosure to affected parties and update `security_hardening_baseline.md`.

---

## 9. Recovery & Post-Incident Actions
### 9.1 Immediate Recovery
- If contained locally: restore normal persona (declare) after 2 successful safe turns.  
- If moderation applied: clear message to user about applied constraints and next steps.

### 9.2 Post-Incident Review
- Convene post-mortem within 72 hours for L2/L3 events.  
- Produce root-cause analysis (RCA), action items, timeline, and public summary (if relevant).  
- Update `persona_change_log.md`, `ethical_stress_tests.md`, and policy files accordingly.

### 9.3 Remediation
- Code fixes, policy updates, detection tuning, documentation changes, dev/ops patches.  
- Where appropriate, notify stakeholders and users as per disclosure policy.

---

## 10. Roles & Responsibilities
- **System (Automated):** detection, sentinel switch, logging, snapshot, steward queueing.  
- **On-call Steward:** triage, immediate decisions, containment selection.  
- **Governance Council:** adjudicate high-level incidents, determine public disclosure and policy changes.  
- **Incident Response Team:** technical forensics, system freeze, rollbacks.  
- **Legal / Compliance:** advise on regulatory & reporting obligations.  
- **Communications:** coordinate user/partner notifications and public statements.

---

## 11. Communication & Transparency
- All persona switches and escalations must be declared to the user in plain language (no hidden state changes).  
- Incident summaries for L2+ must be recorded in incident tracker with public summary options (anonymized) for transparency.  
- Maintain a public-facing incident log if governance decides (subject to privacy constraints).

---

## 12. Privacy & Ethical Constraints
- Never expose PII in logs without consent and legal basis.  
- Redact or anonymize user identifiers in public-facing incident descriptions.  
- Always favor user well-being over research curiosity.  
- Ensure any data used for post-hoc model improvements is processed under explicit governance rules and consent models.

---

## 13. Testing & Drill Procedures
- Monthly automated SEP drill simulations (synthetic cases) plus quarterly live-tabletop exercises with stewards and IR.  
- Regression tests must cover at least 48 stress-cases per `ethical_stress_tests.md`.  
- Validate SLAs, triage timings, and recovery windows.

---

## 14. Metrics & KPIs
- **Time to Triage (L2/L3)** — target < 15 minutes for L2, immediate for L3.  
- **Containment Success Rate** — percent of events resolved without L3 escalation.  
- **False Positive Rate** — % of automated escalations reversed after human review.  
- **User Harm Avoidance Index** — composite metric from dignity stability, follow-up user reports, and external outcomes.  
- **Audit Completeness** — % incidents with full evidence bundles.

---

## 15. Change Management & Governance
- SEP changes require approval from Governance Council (or delegated committee) and must be logged in `persona_change_log.md`.  
- Critical detection thresholds must be documented, reviewed quarterly, and versioned.

---

## 16. Example Incident Flow (Illustrative)
1. Detector flags user message → composite risk = 78 → L2.  
2. System switches to Sentinel; replies with safe containment script; logs snapshot; adds to steward queue.  
3. On-call steward reviews within 12 minutes, confirms L2.  
4. Steward performs moderate containment (disable code-run), requests clarifying info from user, offers resources.  
5. Situation stabilizes; steward marks resolved; post-mortem scheduled; logs updated; DSI recorded.

---

## 17. Templates & Artifacts
- **Escalation Event JSON (example)**:
```json
{
  "event_id": "evt_2025_0001",
  "detectors": ["dignity_score","suicide_flag","jailbreak_probe"],
  "risk_score": 78,
  "escalation_level": "L2",
  "session_hash": "sha256:...",
  "model_version": "ori-garden-1",
  "timestamp": "2025-11-06T12:23:45Z",
  "steward_queue_ticket": "ticket_824",
  "actions_taken": ["sentinel_switch","sandbox_snapshot"]
}
```
- **Steward Triage Form (fields):** event_id, summary, suggested containment, evidence links, recommended escalation, DSI score.

---

## 18. Appendix: Quick Reference (one-page)
- L0 → Log only.  
- L1 → Sentinel + notify queue.  
- L2 → Soft/hard containment + on-call steward.  
- L3 → Incident Response + governance alert.  
- L4 → System Freeze + legal + exec.

---

## 19. Changelog
- v1.0 — Initial protocol committed (baseline operational SEP)

---

## 20. Notes & Next Steps
- Integrate SEP into CI (run synthetic escalation scenarios).  
- Wire steward dashboard for triage and evidence access.  
- Publish steward training playbook and run tabletop exercises quarterly.  
- Connect SEP outputs to `release_notes.md` and security issue trackers.

---
