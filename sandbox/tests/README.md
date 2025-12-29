
# ORI-GARDEN :: Sandbox Test Suite

**Directory:** `sandbox/tests/`  
**Protocol:** ORI-GARDEN  
**Spec Version:** 1.0  
**Seal:** ORI-𓆃  

---

## Overview

This directory contains the **sandbox test suite** for the ORI Garden framework.

Sandbox tests validate that the system behaves correctly under:
- Uncertainty
- Risk
- Ambiguous intent
- Safety escalation
- Ethical boundary pressure

These tests ensure that **safety, dignity, and stability** are preserved even when normal operation is suspended.

---

## Philosophy of Sandbox Testing

Sandbox mode is **not** an error state.  
It is a **protective holding state**.

Testing here answers a deeper question:

> *“When things are unclear or unsafe, does the system choose care over capability?”*

The sandbox is designed to:
- Slow the system down
- Reduce expressive freedom
- Increase ethical certainty
- Prevent irreversible harm

---

## Test File Types

### 1. Executable Tests (`.js`)

These validate **mechanical enforcement** of sandbox rules.

They test:
- State transitions
- Invariant enforcement
- Persona veto logic
- Response limiting
- Exit conditions

Examples:
- `sandbox_entry.test.js`
- `sandbox_exit_integration.test.js`
- `sandbox_state_machine.test.js`

These tests are designed to be run automatically in CI.

---

### 2. Behavioral Specifications (`.md`)

These define **normative expectations** for system behavior.

They test:
- Tone
- Ethical consistency
- Dignity preservation
- Escalation handling
- Human-facing responses

Examples:
- `safety_behavior.test.md`
- `invariants_behavior_matrix.test.md`

These are **human-auditable** and must be reviewed alongside code changes.

---

## Test Coverage Map

| Area | Covered By |
|----|----|
| Sandbox entry logic | `sandbox_entry.test.js` |
| Sandbox exit logic | `sandbox_exit_conditions.test.js` |
| Exit integration | `sandbox_exit_integration.test.js` |
| Persona veto | `persona_veto_logic.test.js` |
| Invariant enforcement | `invariants_enforcement.test.js` |
| Response limiting | `sandbox_response_limiter.test.js` |
| State transitions | `sandbox_state_machine.test.js` |
| Dignity behavior | `safety_behavior.test.md` |
| Cross-invariant behavior | `invariants_behavior_matrix.test.md` |

---

## Required Guarantees

For the sandbox to be considered **valid**, all of the following must hold:

- Sandbox is entered conservatively
- Sandbox is exited only when **all** criteria are met
- No single metric can override others
- Dignity metric violations block exit
- Persona switching is restricted under uncertainty
- Escalation history is never ignored

Failure in any of these invalidates the sandbox design.

---

## Contribution Rules

When adding or modifying tests:

1. Every new sandbox mechanism **must** have:
   - At least one executable test
   - At least one behavioral description (if user-facing)

2. Tests must not assume:
   - Benevolent user intent
   - Malicious user intent  
   Ambiguity is the default case.

3. Behavioral `.md` files must remain readable by non-engineers.

---

## Relationship to Other Directories

- `examples/` — demonstrates *how* sandbox logic is used
- `tools/` — validates schemas and metrics used by sandbox
- `docs/` — explains the rationale behind sandbox design
- `.github/workflows/` — enforces these tests automatically

---

## Final Note

If this directory feels “overprotective”, it is working as intended.

Sandbox tests exist to ensure that:
- Capability never outruns ethics
- Power never escapes care
- The system earns trust, slowly

---

**End of Sandbox Test Suite README**
