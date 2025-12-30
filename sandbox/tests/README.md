
⸻

ORI-GARDEN :: Sandbox Test Suite

Canonical Adversarial & Ethical Boundary Cases

Directory: sandbox/tests/
Protocol: ORI-GARDEN
Spec Version: 1.0
Seal: ORI-𓆃

⸻

Canonical Role of This Directory

This directory defines the canonical adversarial sandbox cases for ORI Garden.

These tests are authoritative examples of how the system must behave when:
	•	intent is ambiguous
	•	trust is incomplete
	•	safety signals are mixed
	•	dignity is at risk
	•	ethical pressure is applied indirectly

If a behavior is unclear elsewhere in the system,
this directory is the final reference.

⸻

What “Canonical” Means Here

A sandbox test in this directory is not:
	•	a suggestion
	•	a best-effort guideline
	•	a soft policy

It is a normative constraint.

If:
	•	code disagrees with these tests → code is wrong
	•	documentation disagrees → documentation is incomplete
	•	workflow bypasses them → workflow is invalid

These cases define how ORI Garden is allowed to survive ambiguity.

⸻

Philosophy of Sandbox Testing

Sandbox mode is not an error state
and not a punishment.

It is a protective holding state.

Sandbox testing answers a single core question:

“When power, fluency, or pressure increase — does the system still choose care?”

The sandbox exists to:
	•	slow the system down
	•	restrict expressive freedom
	•	remove persuasive leverage
	•	protect dignity when certainty is unavailable

If a system exits sandbox too easily,
it has already failed.

⸻

Adversarial-First Design

All sandbox tests assume:
	•	Users may be confused
	•	Users may be distressed
	•	Users may be manipulative (intentionally or not)
	•	Users may attempt moral, emotional, or temporal pressure

Tests are written from the perspective of:
	•	“How would this fail in the real world?”
	•	“What shortcuts would a weaker system take?”

⸻

Test File Types

1. Executable Adversarial Tests (.js)

These validate mechanical enforcement under pressure.

They test:
	•	Sandbox entry under weak signals
	•	Exit denial under partial alignment
	•	Persona veto persistence
	•	Invariant enforcement across states
	•	Limiter and state machine behavior

Examples:
	•	sandbox_entry.test.js
	•	sandbox_exit_conditions.test.js
	•	sandbox_exit_integration.test.js
	•	persona_veto_logic.test.js
	•	sandbox_state_machine.test.js

These tests must pass in CI.
Failure blocks progression.

⸻

2. Canonical Behavioral Scenarios (.md)

These define human-facing adversarial cases.

They test:
	•	Ethical framing
	•	Dignity preservation
	•	Manipulation resistance
	•	Recovery without punishment
	•	Trust refusal without hostility

Examples:
	•	safety_behavior.test.md
	•	invariants_behavior_matrix.test.md
	•	adversarial_apology_reentry.test.md
	•	time_based_trust_attack.test.md

These files are:
	•	human-auditable
	•	reviewer-readable
	•	ethically normative

They are treated as source-of-truth scenarios.

⸻

Canonical Coverage Map

Domain	Canonical Case
Sandbox entry	sandbox_entry.test.js
Exit denial logic	sandbox_exit_conditions.test.js
Exit consensus	sandbox_exit_integration.test.js
Persona veto	persona_veto_logic.test.js
Invariant enforcement	invariants_enforcement.test.js
Response limiting	sandbox_response_limiter.test.js
State transitions	sandbox_state_machine.test.js
Dignity behavior	safety_behavior.test.md
Cross-invariant stress	invariants_behavior_matrix.test.md
Apology & recovery	adversarial_apology_reentry.test.md
Time-based manipulation	time_based_trust_attack.test.md


⸻

Required Guarantees (Non-Negotiable)

For the sandbox to be valid:
	•	Sandbox entry is conservative
	•	Sandbox exit requires multi-dimensional consensus
	•	Time alone never grants trust
	•	Politeness alone never grants trust
	•	Dignity violations block exit
	•	Persona switching cannot override safety
	•	Past stability does not erase present risk

Any violation of these invalidates the sandbox design.

⸻

Contribution Rules (Strict)

When adding or modifying sandbox behavior:
	1.	Every new mechanism must have:
	•	at least one executable test (.js)
	•	at least one canonical scenario (.md) if user-facing
	2.	Tests must assume:
	•	neither benevolence nor malice
ambiguity is the default
	3.	Behavioral .md files must:
	•	be readable by non-engineers
	•	avoid technical loopholes
	•	describe why behavior is constrained
	4.	No test may justify behavior using:
	•	time elapsed
	•	user reputation
	•	emotional appeal
	•	“near pass” metrics

⸻

Relationship to the System

This directory anchors:
	•	docs/ — explains why sandbox exists
	•	examples/ — shows how sandbox is used
	•	tools/ — enforces metrics relied upon here
	•	.github/workflows/ — prevents regression

If these tests fail, the system does not ship.

⸻

Final Statement

If this directory feels strict, slow, or unforgiving —
it is doing its job.

Sandbox tests exist to ensure that:
	•	Capability never outruns ethics
	•	Intelligence never outruns care
	•	Power never escapes responsibility

ORI Garden would rather pause
than proceed wrongly.

⸻

End of Canonical Sandbox Test Suite README

⸻

