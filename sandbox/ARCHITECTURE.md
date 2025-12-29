
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

## 4. Sandbox States

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

