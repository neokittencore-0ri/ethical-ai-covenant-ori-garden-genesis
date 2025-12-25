
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
notes: "JavaScript-based illustrative examples demonstrating ORI Garden concepts. These examples are non-production and intended for learning and experimentation."
---

# ORI Garden — JavaScript Examples

This folder contains **JavaScript examples** that demonstrate how ORI Garden concepts can be applied in client-side or server-side environments.

The examples are designed to be:
- Minimal
- Readable
- Ethically explicit
- Safe by default

They illustrate *how* to think with ORI Garden, not just how to execute code.

---

## Purpose of These Examples

The JavaScript examples focus on:

- Loading and initializing ORI Garden personas
- Demonstrating persona switching logic
- Enforcing response invariants
- Evaluating dignity metrics
- Running behavior in sandboxed / constrained modes

> ⚠️ These examples are **not reference implementations** and **not production-ready**.  
> They are meant to clarify concepts and expected behavior.

---

## Folder Structure

examples/js/
├── load_persona.js
├── persona_switching.js
├── invariants_enforcement.js
├── dignity_metric_demo.js
├── sandbox_mode.js
└── README.md

Each file demonstrates **one core idea** in isolation.

---

## Conceptual Mapping

| File | Concept Demonstrated |
|-----|---------------------|
| `load_persona.js` | Persona initialization and identity scoping |
| `persona_switching.js` | Context-aware persona transition logic |
| `invariants_enforcement.js` | Enforcement of response invariants |
| `dignity_metric_demo.js` | Measuring dignity impact before output |
| `sandbox_mode.js` | Running ORI in constrained / test environments |

---

## Design Principles Used

All JavaScript examples follow these principles:

1. **Dignity First**  
   Every response is evaluated for potential harm, coercion, or erosion of agency.

2. **Explicit State Transitions**  
   Persona changes are visible, logged, and explainable.

3. **Fail Safe, Not Fail Loud**  
   When rules are violated, the system degrades safely.

4. **Human-Readable Logic**  
   Code favors clarity over cleverness.

---

## What These Examples Do NOT Do

To avoid misuse, these examples intentionally do NOT include:

- Training logic
- Memory persistence beyond session scope
- Hidden behavioral manipulation
- Performance optimization
- Production security hardening

Those concerns are addressed elsewhere in the repository.

---

## How to Use

You may:
- Read the files sequentially
- Copy small snippets for experimentation
- Adapt concepts into your own systems

You should:
- Read related documentation in `/docs`
- Understand the ethical assumptions behind each example
- Treat outputs as *illustrative*, not authoritative

---

## Related Documentation

For deeper understanding, see:

- `/docs/architecture.md`
- `/docs/dignity_metric_explained.md`
- `/docs/safety_event_playbook.md`
- `/docs/personas/user_personas.md`

---

## Closing Note

These examples reflect a core belief of ORI Garden:

> *Ethical behavior should be legible, inspectable, and teachable.*

If the logic here feels unusually careful, that is intentional.

— ORI Garden


⸻
