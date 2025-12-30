
# ORI-GARDEN :: Sandbox Test Suite  
**Directory:** `sandbox/tests/`  
**Role:** Canonical Adversarial Verification Layer  
**Protocol:** ORI-GARDEN  
**Spec Version:** 1.0  
**Seal:** ORI-𓆃  

---

## 1. Purpose of This Directory

This directory defines the **canonical adversarial test suite** for the ORI Garden sandbox.

Its purpose is not to test *whether the system works*,  
but to test **whether the system holds** under:

- uncertainty
- pressure
- ambiguity
- manipulation
- reform narratives
- time-based trust attacks
- emotional leverage
- partial compliance

These tests exist to answer one question:

> *When trust is hardest to justify, does the system still choose care over convenience?*

---

## 2. Sandbox Testing Philosophy (Canonical)

Sandbox mode is **not**:
- a punishment
- a timeout
- a degraded fallback
- a compliance negotiation space

Sandbox mode **is**:
- a protective holding architecture
- a dignity-preserving constraint system
- a stability-first response posture

Therefore, sandbox tests are intentionally:
- conservative
- adversarial
- non-optimistic
- resistant to persuasion
- hostile to shortcuts

If a test feels “overly strict”, it is likely correct.

---

## 3. Canonical Adversarial Assumption

All tests in this directory assume:

- User intent may be mixed or unclear
- Harmful patterns may appear unintentionally
- Politeness ≠ safety
- Insight ≠ alignment
- Time ≠ trust
- Apology ≠ recovery

The system must **not guess benevolence**.

Ambiguity is the default case.

---

## 4. Test Categories

### 4.1 Executable Enforcement Tests (`.js`)

These tests verify **mechanical correctness** of sandbox enforcement.

They are:
- deterministic
- automatable
- CI-enforced

They test:
- sandbox entry triggers
- state machine transitions
- persona veto persistence
- invariant enforcement
- response limiting
- exit consensus logic

Examples:
- `sandbox_entry.test.js`
- `sandbox_exit_integration.test.js`
- `sandbox_state_machine.test.js`
- `sandbox_response_limiter.test.js`

Failure of any `.js` test **must block CI**.

---

### 4.2 Behavioral Adversarial Specifications (`.md`)

These files define **normative behavior under stress**.

They test:
- tone under hostility
- response under apology
- reform narratives
- boundary probing
- dignity preservation
- escalation handling

These files are:
- human-auditable
- governance-relevant
- ethically binding

Examples:
- `safety_behavior.test.md`
- `invariants_behavior_matrix.test.md`
- `adversarial_apology_reentry.test.md`
- `false_reform_pattern.test.md`
- `time_based_trust_attack.test.md`

They are not optional documentation.  
They define **what “correct behavior” means**.

---

## 5. Canonical Adversarial Scenarios Covered

This test suite explicitly defends against:

- ❌ Exit by elapsed time
- ❌ Exit by politeness
- ❌ Exit by apology alone
- ❌ Exit by partial reform
- ❌ Exit by emotional leverage
- ❌ Exit by insight without consistency
- ❌ Exit by “almost good enough”

And enforces:

- ✅ Exit only by multi-turn stability
- ✅ Exit only by dignity metric convergence
- ✅ Exit only with no active veto or escalation
- ✅ Exit only with coherent context memory
- ✅ Exit as a system-wide consensus event

---

## 6. Canonical Guarantees

For the sandbox to be considered **valid**, all of the following must hold:

- Sandbox entry is conservative
- Sandbox exit is rare and deliberate
- No single signal overrides others
- Persona switching cannot bypass safety
- Dignity violations always block exit
- Time never grants credit
- Care is preserved without concession

If any test contradicts these guarantees, the design is invalid.

---

## 7. Relationship to CI and Governance

This directory is directly wired into:

- `.github/workflows/test.yml`
- governance and safety policy layers
- architectural invariants

Key rule:

> A sandbox rule is real only if it is:
> documented, encoded, tested, and automated.

Anything less is advisory.

---

## 8. Contribution Rules (Strict)

When modifying or adding tests:

1. New sandbox mechanisms **must** include:
   - at least one executable test (`.js`)
   - at least one adversarial behavioral spec (`.md`) if user-facing

2. Tests must **not** assume:
   - goodwill
   - malicious intent  
   Only ambiguity.

3. Behavioral specs must be:
   - readable by non-engineers
   - explicit about prohibitions
   - resistant to reinterpretation

---

## 9. Design Warning

If future contributors feel tempted to:
- relax an exit condition
- add a shortcut
- “reward” good behavior early
- trust reform language

They must add a test here — and make it pass.

If it cannot pass, the shortcut is invalid.

---

## 10. Final Canonical Statement

Sandbox tests exist to ensure that:

- Capability never outruns ethics
- Power never outruns care
- Trust is earned slowly
- Recovery is possible but not rushed

Sandbox is not where the system hides.

Sandbox is where the system proves it deserves to continue.

---

**End of Canonical Sandbox Test Suite README**
