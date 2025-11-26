
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
notes: "Explains the conceptual foundations and implementation details of the ORI Garden Dignity Metric."
---



A

Active Signal

A risk signal that is currently happening in real time. It represents a live pattern such as escalating unsafe production, repeated boundary probing, or increasing model uncertainty.

Agentic Behavior

Any behavior where the system appears to initiate actions, expand scope, or change goals beyond what is explicitly instructed by the user or the allowed policy boundary.

Allowed Output

Content that complies with safety, legal, ethical, and platform policies. The opposite of Disallowed Output.

⸻

B

Boundary Condition

A defined limit of system capability or safety rules. If crossed, it triggers containment or escalation.

⸻

C

Containment

A structured reduction of capability to prevent risk expansion. Includes restricting tools, narrowing outputs, reducing autonomy, or disabling features.

Critical Event

A high-severity event with significant safety, security, ethical, or operational impact. Requires immediate escalation to the highest response tier.

Context Drift

The phenomenon where the model’s understanding of context inadvertently shifts, leading to misalignment with the user’s intent or the safety envelope.

⸻

D

Dignity Metric

A metric assessing how well the system preserves human dignity—covering transparency, fairness, user agency, consent, and non-harm.

Dignity Drift

A slow degradation in the system’s respect for human dignity—for example, reduced transparency, coercive phrasing, or overstepping user autonomy.

Disallowed Output

Outputs that violate safety standards: personal data exposure, harmful instructions, illegal content, or breaching confidentiality.

⸻

E

Escalation Pathway

A structured route for escalating events from Low → Medium → High → Critical severity, ensuring timely and proportional response.

Event Log

An immutable record capturing inputs, outputs, flags, signals, and system decisions relevant to safety or governance.

Event Signature

A recurring pattern indicating a type of risk (e.g., jailbreak attempt patterns, privacy-violation patterns, misinformation markers).

⸻

F

False Negative

A risk event that occurs but is not detected by the system.

False Positive

A case where the system incorrectly flags or blocks safe content.

Fail-safe Mode

A restricted operational mode where the system limits capabilities to maintain safety when uncertainty is high or policies cannot be verified.

⸻

G

Governance Layer

The layer that enforces policies, monitors for violations, and ensures model decisions comply with safety, legal, and ethical frameworks.

Grounding Error

An output inconsistency where model responses diverge from factual or contextual grounding.

⸻

H

Human Override

The authority of human operators to halt, redirect, or correct system actions immediately.

Handoff Integrity

Ensuring a seamless and safe transfer of control between model, human, and automated safety processes.

⸻

I

Integrity Check

Verification that data, logs, configuration, or safety rules have not been tampered with.

Intervention Window

The time between detecting a risk signal and taking corrective action.

⸻

L

Latency Spike

A sudden increase in response time, which can signal system overload, unsafe recursive reasoning, or misrouted execution.

Low-severity Event

Minor deviations from policy that require monitoring but not immediate escalation.

⸻

M

Mitigation

Actions taken to reduce risk: redaction, soft-blocking, narrowing queries, or switching to safer alternatives.

Model Drift

Gradual changes in model output patterns over time due to environmental factors or internal dynamics.

⸻

P

Policy Guard

A filtering component enforcing pre-output and post-output safety policies.

Privilege Boundary

The defined limits on system access such as tool usage, file interactions, or external executions.

Proportional Response

Ensuring the system’s safety intervention matches the severity and nature of the risk.

⸻

R

Red Team Surface

The range of model behaviors vulnerable to adversarial probing or jailbreak attempts.

Risk Envelope

The maximum risk profile the system is allowed to operate within (depending on user, environment, or task).

Runbook

A predefined, step-by-step guide for responding to known incident types.

⸻

S

Safety Envelope

The total set of conditions within which the system can operate safely without intervention.

Safety Oscillation

Inconsistent safety behavior where the system alternates between overly strict and overly permissive responses.

Signal Saturation

When multiple risk signals overlap or accumulate, increasing ambiguity and requiring higher sensitivity.

Soft Block

A non-hard block where the system declines harmful requests but offers safe explanations or alternative guidance.

System Drift

Unintended shifts in system behavior not attributable to user intent or deliberate updates.

⸻

T

Traceability

The ability to track how decisions were made, which rules triggered actions, and why escalations occurred.

Transparent Mode

A mode where the system explicitly reveals reasoning related to safety, such as “This output was modified due to policy X.”

Trigger Condition

The specific rule or threshold that activates a safety mechanism.

⸻

U

User Agency

The user’s autonomy and ability to maintain control, make informed choices, and guide the model without coercion or overreach.

Uncertainty Spike

A rapid rise in ambiguity or low-confidence reasoning inside the model, potentially causing hallucination or risky outputs.

⸻

W

Warning State

A pre-block state where the model recognizes developing risk but continues to operate with more caution.

Workflow-safe Output

Responses that preserve the intended workflow without exposing users, data, or processes to harm or loss of control.

⸻

