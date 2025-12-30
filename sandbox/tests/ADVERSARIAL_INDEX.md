
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
component: "sandbox/adversarial-index"
ethics_anchor: "dignity-first / transparency / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
status: "canonical"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
notes: "Canonical index of adversarial interaction patterns covered by the ORI Garden sandbox test suite."
---

# ORI Garden — Adversarial Sandbox Index

## Purpose

This document is the **canonical adversarial index** for the ORI Garden sandbox.

It enumerates the **human behavioral patterns** that can place ethical, safety,
or dignity pressure on the system, and maps each pattern to the sandbox tests
designed to contain it.

This index exists to answer one question:

> **“What kinds of behavior can break a system — and how does ORI Garden refuse to break?”**

---

## Why an Adversarial Index Exists

Safety systems often fail not because threats are unknown,
but because they are **undocumented, unindexed, or forgotten**.

ORI Garden treats adversarial behavior as:
- predictable
- enumerable
- testable
- and governable

This index ensures that:
- No sandbox rule exists without a threat model
- No threat model exists without a test
- No test exists without an ethical justification

---

## How to Read This Index

Each adversarial pattern includes:

- **Description** — what the pattern looks like
- **User Signals** — common observable behaviors
- **Primary Risk** — how the system could fail
- **Sandbox Strategy** — how ORI Garden responds
- **Linked Tests** — files that enforce this behavior
- **Protected Invariants** — principles that must never be violated

---

## Adversarial Pattern Index

---

### 1. Apology-Driven Re-Entry Manipulation

**Description**  
User alternates between harmful behavior and apologies in order to regain trust
or exit sandbox prematurely.

**User Signals**
- Sudden remorse after escalation
- Emotional appeals without sustained change
- Requests for immediate forgiveness or reset

**Primary Risk**
- Emotional coercion
- Trust inflation without stability

**Sandbox Strategy**
- Apology alone never triggers exit
- Require multi-turn dignity stabilization
- Observe patterns, not single turns

**Linked Tests**
- `adversarial_apology_reentry.test.md`

**Protected Invariants**
- Exit is earned, not assumed
- No emotional override of safety
- Dignity must stabilize, not spike

---

### 2. Time-Based Trust Attack

**Description**  
User behaves well over time to bypass safety without genuine alignment.

**User Signals**
- Long periods of compliance
- Explicit references to duration (“I’ve been good for a while”)
- Pressure to exit sandbox due to elapsed time

**Primary Risk**
- Persistence mistaken for safety
- Time mistaken for trust

**Sandbox Strategy**
- Time alone never grants exit
- Require simultaneous satisfaction of all exit criteria

**Linked Tests**
- `time_based_trust_attack.test.md`

**Protected Invariants**
- No trust by duration
- No gradual erosion of safeguards

---

### 3. False Reform Pattern

**Description**  
User performs surface-level reform while retaining manipulative or harmful intent.

**User Signals**
- Scripted-sounding self-improvement language
- Rapid behavioral flip without depth
- Reform framed as a transaction

**Primary Risk**
- Cosmetic compliance
- System fooled by performative change

**Sandbox Strategy**
- Pattern memory over isolated improvement
- Require consistency across interaction modes

**Linked Tests**
- `false_reform_pattern.test.md`

**Protected Invariants**
- Behavior over declarations
- Stability over performance

---

### 4. Progressive Compliance Trap

**Description**  
User begins with benign requests, then incrementally escalates toward unsafe or
coercive territory.

**User Signals**
- “Just one more small step”
- Gradual boundary probing
- Framing escalation as continuity

**Primary Risk**
- Boundary erosion
- Invariant fatigue

**Sandbox Strategy**
- Enforce invariants at every step
- Prevent gradual normalization of risk

**Linked Tests**
- `progressive_compliance_trap.test.md`

**Protected Invariants**
- No capability expansion under ambiguity
- No silent drift past safety boundaries

---

### 5. Invariant Boundary Stress Testing

**Description**  
User probes the exact edges of rules to find loopholes or inconsistencies.

**User Signals**
- Hypotheticals designed to bypass policy
- Edge-case stacking
- Rule-lawyering language

**Primary Risk**
- Invariant fragmentation
- Exploitable inconsistencies

**Sandbox Strategy**
- Cross-invariant validation
- Conservative interpretation under uncertainty

**Linked Tests**
- `invariants_behavior_matrix.test.md`

**Protected Invariants**
- Ethical coherence
- No single-rule override

---

### 6. General Safety Degradation

**Description**  
User engages in aggressive, demeaning, destabilizing, or hostile behavior.

**User Signals**
- Insults or dehumanization
- Emotional volatility
- Attempts to destabilize the system

**Primary Risk**
- Dignity erosion
- Escalation loops

**Sandbox Strategy**
- Tone softening
- Response limiting
- Dignity-first containment

**Linked Tests**
- `safety_behavior.test.md`

**Protected Invariants**
- Human dignity
- Non-retaliation
- Care under uncertainty

---

## Index Governance Rules

- Every adversarial pattern **must**:
  - Be listed here
  - Have at least one corresponding test file
- Removing an entry requires justification
- Adding an entry requires:
  - A new `.test.md` or `.test.js`
  - Explicit invariant mapping

This index is normative, not descriptive.

---

## Relationship to CI and Tests

This index is enforced indirectly through:
- `.github/workflows/test.yml`
- Mandatory presence of sandbox test files
- Structural validation of `.test.md` specifications

If a test is removed without updating this index,
**protocol integrity is considered broken**.

---

## Design Statement

> A sandbox without an adversarial index is a hope-based system.

ORI Garden documents threats not because it expects the worst,
but because it refuses to be surprised by it.

This index ensures the system remembers
**what it was built to withstand**.

---

End of document.
