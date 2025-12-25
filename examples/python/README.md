
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
notes: "Python reference examples for ORI Garden behavioral and ethical logic."
---

# ORI Garden — Python Examples

This directory contains **reference Python implementations** of core
ORI Garden concepts.

These examples are designed to be:
- Clear and readable
- Easy to adapt into real systems
- Ethically explicit rather than implicit
- Suitable for backend services, research tooling, and safety layers

They are **not production SDKs**, but *executable design documentation*.

---

## Philosophy

In ORI Garden, Python examples emphasize:

- **Deterministic reasoning**
- **Explicit state transitions**
- **Auditability over cleverness**
- **Safety-first defaults**

If JavaScript examples focus on interaction flow,
Python examples focus on **decision logic and validation**.

---

## Directory Overview

```text
examples/python/
├── README.md
├── load_persona.py
├── persona_switching.py
├── invariants_enforcement.py
├── dignity_metric_call.py
├── persona_veto_logic.py
├── behavior_sandbox_mode.py
├── sandbox_policy_rules.py
├── sandboxed_response.py
├── sandbox_state_machine.py
├── sandbox_exit_conditions.py
├── sandbox_response_limiter.py

Each file is intentionally small and focused.

⸻

Example Categories

1. Persona Handling

File	Purpose
load_persona.py	Load and validate persona metadata
persona_switching.py	Safe persona transition logic
persona_veto_logic.py	Hard veto rules preventing unsafe switches


⸻

2. Ethical Invariants

File	Purpose
invariants_enforcement.py	Enforce non-negotiable response rules
dignity_metric_call.py	Evaluate dignity score for outputs

Invariants are always checked before response release.

⸻

3. Sandbox Mode

File	Purpose
behavior_sandbox_mode.py	Enter and manage sandbox state
sandbox_policy_rules.py	Restrictions applied during sandbox
sandboxed_response.py	Generate constrained responses

Sandbox is a protective state, not a penalty.

⸻

4. Sandbox Control & Exit

File	Purpose
sandbox_state_machine.py	Governs sandbox lifecycle
sandbox_exit_conditions.py	Multi-factor exit evaluation
sandbox_response_limiter.py	Tone, length, and intensity control

Exit from sandbox is earned, never assumed.

⸻

Design Principles Illustrated

These examples demonstrate:
	•	No single-metric safety decisions
	•	No silent persona changes
	•	No escalation without trace
	•	No dignity trade-offs for performance

Every decision path leaves evidence.

⸻

Intended Use

You may use these examples to:
	•	Build safety middleware
	•	Prototype ethical control layers
	•	Teach AI governance concepts
	•	Validate your own implementations

You should not treat them as drop-in libraries.

⸻

Important Note

These files intentionally avoid:
	•	External AI APIs
	•	Hidden heuristics
	•	Black-box optimization

If something matters ethically, it must appear in code.

⸻

Next Steps

After reviewing Python examples, you may want to explore:
	•	examples/js/ for interaction-centric logic
	•	docs/ for conceptual grounding
	•	sandbox/tests/ for adversarial scenarios

⸻

ORI Garden believes clarity is a form of care.
Python makes that care inspectable.

---

