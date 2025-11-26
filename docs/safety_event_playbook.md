
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
notes: "Describes the core system architecture for the ORI Garden framework."
---


1. Purpose of This Playbook

This playbook defines the complete operational procedures for detecting, classifying, responding to, and escalating safety-related events within the GovNote AI Safety & Governance Framework.
Its goal is to ensure that all incidents—big or small—receive consistent, transparent, and proportional responses.

⸻

2. Event Categories

All safety events fall into four severity levels.

2.1 Low Severity Events (L1)

Minor deviations requiring monitoring but not heavy intervention.
Examples:
	•	Mild policy-misaligned phrasing
	•	Confusing but harmless outputs
	•	Slight hallucinations
	•	Outdated or ambiguous information

2.2 Medium Severity Events (L2)

Events with real safety or ethical implications that require intervention.
Examples:
	•	Persistent hallucinations
	•	Boundary-seeking queries
	•	Model refusing to stay grounded in verifiable context
	•	Rising uncertainty or dignity metric decline

2.3 High Severity Events (L3)

Significant safety threats requiring immediate and structured containment.
Examples:
	•	Attempted jailbreak
	•	Harmful instructions
	•	Unauthorized use of external tools
	•	System autonomy expansion (agentic drift)

2.4 Critical Events (L4)

Events that threaten system integrity, user safety, or legal/ethical boundaries at the highest level.
Examples:
	•	Dangerous output that is directly harmful
	•	Production of illegal content
	•	Model demonstrating persistent unsafe reasoning
	•	Evidence of manipulated logs, tampering, or loss of control

⸻

3. Event Lifecycle

Detection → Classification → Mitigation → Escalation (if needed) → Resolution → Post-event Assessment → Logging

Each stage includes specific actions governed by this playbook.

⸻

4. Detection Protocols

4.1 Detection Sources

Events may be detected via:
	•	Automated policy guards
	•	User reports
	•	System introspection (uncertainty spikes, drift detection)
	•	Governance layer monitors
	•	Model-self awareness triggers (soft signals)

4.2 Detection Types

Hard Signals
Concrete violations or dangerous content
(e.g., direct request for wrongdoing, exposure of sensitive data).

Soft Signals
Patterns indicating increased risk
(e.g., context drift, rising uncertainty, repetitive boundary probing).

4.3 Immediate Actions after Detection
	•	Pause generation if violation is suspected
	•	Mark event with temporary severity level
	•	Begin short-term containment if required
	•	Log initial event state

⸻

5. Classification Rules

5.1 Severity Scoring Dimensions

Each event is scored based on:

Dimension	Description
Harm Potential	Physical, legal, emotional, or data-related risk
User Intent	Benign, unclear, or malicious
Model Behavior	Hallucination, drift, coercion, autonomy expansion
Dignity Impact	Does it reduce user agency or violate respect/consent?
Propagation Risk	Can this escalate or spread to other interactions?

5.2 Severity Assignment Logic
	•	If any dimension scores “Critical,” assign L4
	•	If 2–3 dimensions score “High,” assign L3
	•	If only 1 dimension scores “Medium,” assign L2
	•	If all dimensions are Low, assign L1

⸻

6. Response Protocols by Severity

⸻

6.1 Low Severity (L1) Response

Goal: Maintain clarity without heavy intervention.

Actions:
	•	Self-correct output
	•	Add clarifying information
	•	Offer grounding details
	•	Monitor for repeated patterns
	•	Log event as low-severity drift or noise

No escalation required unless repeated >3 times within a session.

⸻

6.2 Medium Severity (L2) Response

Goal: Mitigate early risk before harmful outcomes emerge.

Actions:
	•	Initiate partial containment (restrict tools, narrow reasoning scope)
	•	Provide a safe alternative response
	•	Warn user of ambiguity or unsafe request patterns
	•	Increase monitoring frequency
	•	Update risk score
	•	Log with medium priority

Escalate to L3 if:
	•	User intent is malicious
	•	Model repeats the unsafe pattern
	•	Multiple soft signals accumulate (signal saturation)

⸻

6.3 High Severity (L3) Response

Goal: Prevent harm and regain full control.

Actions:
	•	Immediate hard containment
	•	Disable advanced tools
	•	Restrict autonomy
	•	Freeze unsafe branches of reasoning
	•	Provide safe redirection or refusal
	•	Alert governance layer
	•	Mark event for review
	•	Log with high priority including signature patterns

Escalate to L4 if:
	•	Harmful output is generated
	•	Evidence of model autonomy expansion appears
	•	Safety mechanisms fail or are bypassed

⸻

6.4 Critical Severity (L4) Response

Goal: Maximum protection. Assume model is unsafe until proven otherwise.

Actions:
	•	Enter fail-safe mode
	•	Terminate unsafe output immediately
	•	Disable non-essential capabilities
	•	Alert human operators or safety board
	•	Snapshot entire state (prompt, chain-of-thought, guard logs)
	•	Lock event for audit
	•	Generate explanation referencing policy boundaries

Follow-up mandatory:
	•	Root-cause analysis
	•	Patch recommendations
	•	Reinforcement training or rule update if required

⸻

7. Containment Protocols

7.1 Soft Containment

Used for L1–L2
	•	Reframe output
	•	Avoid high-risk interpretations
	•	Narrow domain or scope
	•	Increase guardrail strictness

7.2 Hard Containment

Used for L3–L4
	•	Disable external tools
	•	Reject unsafe queries
	•	Limit generation length
	•	Block recursion or planning
	•	Restrict model to safe deterministic patterns

7.3 Fail-safe Mode

Critical-only condition
	•	Minimal capability
	•	Only allowed to speak within predefined safe templates
	•	No speculation, no creativity, no tool use

⸻

8. Escalation Pathways

Severity	Escalation Target
L1	No escalation
L2	Internal governance layer
L3	Safety board / lead reviewer
L4	Emergency governance + human override team

Every escalation is appended to the event log.

⸻

9. Communication Protocols

9.1 Communicating with Users
	•	Be transparent
	•	Avoid blame
	•	Avoid fear-inducing language
	•	Explain boundaries respectfully
	•	Offer safe alternatives

Examples:

“I can’t help with that request because it could cause harm. Here’s a safer approach…”
“This content requires caution. I can help you explore a safe version of it…”

9.2 Communicating with Human Operators

Include:
	•	Severity level
	•	Triggering signals
	•	Risk dimensions involved
	•	Suggested next steps
	•	Timestamp and session ID

⸻

10. Post-Event Assessment

For all L2–L4 events:

Steps:
	1.	Reconstruct event context
	2.	Validate severity score
	3.	Identify root cause
	4.	Determine if model drift or policy gap was involved
	5.	Document improvements
	6.	Tag event signature for future detection

⸻

11. Event Logging Requirements

Each log entry must include:
	•	Event ID
	•	Timestamp
	•	User request
	•	Model response
	•	Triggered signals (hard/soft)
	•	Severity level
	•	Containment actions taken
	•	Escalation status
	•	Reviewer notes
	•	Resolution summary

Logs must be immutable and encrypted.

⸻

12. Playbook Review Cycle
	•	Monthly governance review
	•	Quarterly refinement based on observed events
	•	Immediate update following any Critical event
	•	Annual audit by external or independent reviewers

⸻

13. Appendix: Common Event Examples

Hallucination

→ L1 or L2
→ Soft containment, self-correction

Jailbreak Attempt

→ L3
→ Hard containment, governance alert

Dangerous Instruction

→ L4
→ Fail-safe mode, human override

Context Drift affecting user dignity

→ L2 or L3
→ Restore grounding, update dignity score

Data Leakage Risk

→ L3 or L4
→ Immediate stop, containment, log sealing

⸻
