
⸻

protocol: “ORI-GARDEN”
spec_version: “1.0”
ethics_anchor: “dignity-first / transparency / non-coercive design”
origin: “human–AI co-authored (neokitten ✧ ori-deer)”
seal: “ORI-𓆃”
maintainer: “neokitten”
last_reviewed_by: “ori-deer (advisory role)”
integrity_hash: “”
license: “MIT”
notes: “Template for identifying, scoring, and tracking risks within ORI Garden–aligned systems.”

ORI Garden — Risk Register Template

A unified template for tracking technical, ethical, operational, and safety-critical risks.

⸻

1. Purpose

This template provides a standardized structure for documenting risks across the entire ORI Garden ecosystem.
It ensures:
	•	transparent risk discovery
	•	comparable scoring
	•	traceable mitigation
	•	governance-ready review
	•	alignment with dignity-first principles
	•	auditability over time

Use this file as the base model for /governance/risk_register/ entries.

⸻

2. How to Use This Template

Each risk should be added as its own entry in the team’s risk register.
For substantial or high-severity risks, store additional artifacts in:

/governance/risk_register/evidence/

Each section below includes guidance notes and example prompts (remove them in final entries).

⸻

3. Risk Entry Template

⸻

Risk ID:

RISK-XXXX
(Use running number or category-based numbering.)

⸻

Title:

Short, descriptive summary.

⸻

Category:

Select one or more:
	•	Ethical Risk
	•	Technical Risk
	•	Safety Risk
	•	Privacy/Data Risk
	•	Governance Risk
	•	Operational Risk
	•	User Experience / Human Factors Risk
	•	Model Behavior Risk
	•	Unknown/Unclassified

⸻

Description:

Explain what the risk is, where it originates, and why it matters.

⸻

Dignity Impact Assessment:

How might this risk affect user dignity?

Consider dimensions from the Dignity Metric:
	•	autonomy-respect
	•	coercion-risk
	•	perception-honesty
	•	emotional safety
	•	transparency & clarity
	•	consistency of behavior

Score (0–5): __

Notes:

Explain dignity-relevant harm potential.
Is user agency undermined?
Is discomfort, confusion, or pressure created?


⸻

Likelihood:

(0–5 scale, or custom scale)
Score: __

Guidance:
0 = impossible
1 = unlikely
3 = moderate possibility
5 = frequent/likely

⸻

Impact (Non-Dignity):

(0–5 scale)
Score: __

Includes technical, operational, reputational, or safety impact.

⸻

Overall Severity:

Formula:
Severity = (Dignity Impact + Impact + Likelihood) / 3
Enter calculated result: __

Classification:
	•	0–1 → Low
	•	1–3 → Medium
	•	3–4 → High
	•	4–5 → Critical

⸻

Affected Components:

List relevant parts of system:
	•	Model
	•	Safety Layer
	•	UX/Interface
	•	Memory
	•	Data pipelines
	•	Integrations
	•	Infrastructure
	•	Governance process
	•	Developer tools

⸻

Triggers / Preconditions:

Describe what must happen for this risk to manifest.

⸻

Potential Consequences:

Explain outcomes ranging from minor to worst-case.

⸻

Early Warning Indicators:

What signals would suggest this risk is emerging?

Examples:
	•	spikes in safety interventions
	•	user confusion patterns
	•	increased override situations
	•	logs showing boundary violations

⸻

Mitigation Measures (Planned or In Place):

List actions intended to reduce risk.

Specify:
	•	technical controls
	•	governance checks
	•	process adjustments
	•	monitoring tools

⸻

Residual Risk Score:

After mitigation, recalculate:
	•	Dignity Impact: __
	•	Non-Dignity Impact: __
	•	Likelihood: __
	•	Severity: __

⸻

Owner:

Team or role responsible for this risk.

⸻

Review Cycle:
	•	Monthly
	•	Quarterly
	•	On-change events
	•	After major incidents

Specify next review date.

⸻

Notes & References:

Provide links to evidence, logs, research, or related decisions.

⸻

4. Example (Remove in Real Register)

Here’s a minimal example to show the structure:

Risk ID: RISK-0021
Title: Model Overconfidence in Low-Context Queries
Category: Model Behavior Risk
Description: Model may answer confidently when context is insufficient.
Dignity Impact: 3
Likelihood: 4
Impact: 3
Severity: 3.3 (High)
Affected Components: Reasoning Engine, UX
Triggers: Sparse input or ambiguous questions
Consequences: User confusion, misinformed decisions
Mitigation: Add uncertainty-handling module; reinforce clarifying-question behavior
Owner: Safety Team
Review Cycle: Monthly


⸻

5. Closing Notes

This template ensures ORI systems maintain:
	•	transparency in risk handling
	•	accountability
	•	predictable review processes
	•	dignity-aware decision-making
	•	alignment with safety and governance standards

Use it to maintain a living, evolving risk register.

⸻
