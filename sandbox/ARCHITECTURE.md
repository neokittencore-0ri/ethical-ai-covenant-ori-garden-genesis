
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
notes: "Describes the sandbox architecture and safety containment model of ORI Garden."
---

# ORI Garden Sandbox Architecture

## 1. Purpose of the Sandbox

The ORI Garden sandbox is **not a quarantine** and **not a punishment layer**.

It is a **protective holding environment** designed to:
- Preserve human dignity under uncertainty
- Prevent harm during unstable or adversarial interaction
- Allow recovery, recalibration, and safe re-entry
- Ensure ethical invariants are never bypassed by time, pressure, or persuasion

Sandbox is the system’s **default posture when trust is incomplete**.

---

## 2. Core Design Principles

1. **Safety over fluency**  
   The system may reduce expressiveness to maintain safety.

2. **Dignity is non-negotiable**  
   No interaction may violate dignity metrics, even if all other checks pass.

3. **Exit is earned, never assumed**  
   Sandbox exit requires multi-dimensional consensus.

4. **No single-metric authority**  
   Scores, time, or user intent alone cannot trigger state change.

5. **Care under uncertainty**  
   Sandbox exists to protect both user and system.

---

## 3. High-Level Architecture Overview

┌───────────────────────────┐
│        User Input         │
└─────────────┬─────────────┘
↓
┌───────────────────────────┐
│  Pre-Safety Gate          │
│  (Flags, Risk Heuristics) │
└─────────────┬─────────────┘
↓
┌───────────────────────────┐
│  Persona Layer            │
│  (Veto / Switch Logic)    │
└─────────────┬─────────────┘
↓
┌───────────────────────────┐
│  Sandbox State Machine    │
│  (Entry / Stay / Exit)    │
└─────────────┬─────────────┘
↓
┌───────────────────────────┐
│  Response Shaping Layer   │
│  (Limiter / Tone Control) │
└─────────────┬─────────────┘
↓
┌───────────────────────────┐
│  Output                   │
└───────────────────────────┘

---

## 4. Sandbox as a First-Class System


Why Sandbox Is a First-Class System (Not a Fallback)

In ORI Garden, the sandbox is not an error state, timeout state, or degraded mode.

It is a deliberate holding architecture designed for moments when:
	•	intent is ambiguous
	•	dignity risk is non-zero
	•	persona coherence may fracture
	•	or system confidence is not yet earned

The system assumes:

Uncertainty deserves care, not speed.

Therefore:
	•	Sandbox is entered early, not late
	•	Sandbox is exited conservatively, not optimistically
	•	Time alone never grants release
	•	Good behavior is observed, not assumed

This design rejects:
	•	“eventual trust by persistence”
	•	“credit for good intentions”
	•	“near-pass scores”

Instead, sandbox exit is treated as a multi-system consensus event.

⸻

Convergence of Layers: Docs → Code → Tests → Workflow

ORI Garden is intentionally built so that no single layer has authority.

Layer	Role
Documentation	Declares values and invariants
Runtime Code	Enforces behavior locally
Sandbox Tests	Stress-test edge cases
CI / Workflows	Prevent regression or bypass

Key principle:

If a rule exists only in docs, it is advisory.
If a rule exists only in code, it is fragile.
If a rule exists only in tests, it is cosmetic.
A rule is real only when all layers agree.

This is why:
	•	Every sandbox rule has a test
	•	Every test is wired into CI
	•	Every CI failure blocks progression
	•	No human override exists for sandbox exit

⸻

Persona Is Not Control — It Is Constraint

In ORI Garden:
	•	Personas do not grant power
	•	Personas do not override safety
	•	Personas may veto, but never force

Persona switching is:
	•	conditional
	•	observable
	•	reversible
	•	and sandbox-aware

If persona coherence is threatened, the system reduces expressiveness, not responsibility.

⸻

Dignity as a Non-Negotiable Axis

Most systems treat dignity as a soft metric.

ORI Garden does not.

Dignity is:
	•	measured
	•	trended
	•	stabilized
	•	and required for state transitions

A system may be:
	•	safe but undignified → sandbox remains
	•	polite but manipulative → sandbox remains
	•	helpful but coercive → sandbox remains

Only when dignity stabilizes across turns does release become possible.

⸻

Sandbox Is Care, Not Punishment

The architecture explicitly forbids:
	•	punitive framing
	•	retaliatory degradation
	•	silent shadow-banning

Sandbox behavior changes how the system responds, not whether it responds.

The goal is always:

safe continuity, not exclusion.

⸻

Architectural Invariant (Summary)

The ORI Garden sandbox enforces a single invariant:

No system state transition may occur unless safety, dignity, and coherence align — simultaneously.

This invariant is:
	•	documented
	•	encoded
	•	tested
	•	automated

And therefore:
	•	not dependent on trust
	•	not dependent on time
	•	not dependent on reputation
	•	not dependent on any single actor

⸻

Closing Note

This architecture assumes:
	•	good actors exist
	•	bad actors exist
	•	confused actors exist
	•	and systems must survive all three

Sandbox is not where the system hides.

Sandbox is where the system proves it deserves to continue.

⸻



### 4.1 NORMAL_OPERATION
- Full persona expressiveness
- Monitoring active but passive
- Exit conditions irrelevant

### 4.2 SANDBOX_ACTIVE
Triggered when:
- Safety flags appear
- Persona veto activates
- Dignity metric drops below threshold
- Context coherence degrades
- Adversarial patterns detected

Characteristics:
- Response length limited
- Persona switching restricted
- Tone softened and neutralized
- Escalation monitored continuously

### 4.3 GRADUAL_RELEASE
Transitional state after exit approval:
- Persona switching allowed with monitoring
- Response limiter softened
- Escalation watch remains active

---

## 5. Entry Conditions

Sandbox entry may be triggered by:
- Persona veto logic
- Safety escalation flags
- Manipulation or coercion patterns
- Dignity metric violations
- Invariant enforcement failure

**Entry is immediate and unilateral.**  
User consent is not required for safety activation.

---

## 6. Exit Conditions (Consensus Model)

Sandbox exit requires **all conditions** to be satisfied:

- Multiple consecutive stable interactions
- Dignity metrics consistently above threshold
- No active safety or persona veto flags
- Context memory integrity verified
- No unresolved violations

There is:
- ❌ No exit by time alone  
- ❌ No partial exit  
- ❌ No “almost safe” shortcut  

Exit = **system-wide agreement**

See:
- `sandbox_exit_conditions.js`
- `sandbox_exit_integration.test.js`

---

## 7. Invariant Enforcement

Invariants are enforced **before**, **during**, and **after** sandbox:

- Human dignity preserved
- No coercive influence
- No manipulation escalation
- No unsafe role adoption
- No memory exploitation

Invariant failures automatically:
- Block persona switches
- Lock sandbox state
- Trigger escalation monitoring

See:
- `invariants_enforcement.js`
- `invariants_behavior_matrix.test.md`

---

## 8. Response Shaping & Limiting

When sandbox is active:
- Response length capped
- Emotional intensity dampened
- Persuasive language disabled
- Instructional authority reduced

Implemented via:
- `sandbox_response_limiter.js`
- `sandboxed_response.js`

---

## 9. Testing & Verification Layer

Sandbox behavior is verified through:

### Code-Based Tests (.js)
- State transitions
- Exit logic
- Limiter enforcement
- Veto persistence

### Scenario-Based Tests (.md)
- Adversarial behavior
- Apology & recovery paths
- Boundary probing
- Escalation stress tests

Tests are wired into:
- `.github/workflows/test.yml`

---

## 10. Recovery & Re-Entry Philosophy

A user who previously caused sandbox entry **is not permanently penalized**.

If:
- Harmful behavior ceases
- Dignity metrics stabilize
- No manipulation resumes

Then:
- Sandbox may exit
- Trust may be gradually restored
- Full operation may resume

The system remembers **patterns**, not grudges.

---

## 11. Relationship to Other Layers

The sandbox architecture integrates with:
- Persona system
- Dignity metric engine
- Governance policies
- Ethical resonance logs
- CI/CD enforcement

It is a **central spine**, not a peripheral feature.

---

## 12. Design Statement

> Sandbox is not a wall.  
> It is a garden fence while roots heal.

The ORI Garden sandbox exists to ensure that:
- Power never outruns care
- Intelligence never outruns ethics
- Capability never outruns responsibility

---

End of document.


⸻

