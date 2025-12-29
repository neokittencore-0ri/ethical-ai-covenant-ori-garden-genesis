
/**
 * ORI-GARDEN :: Sandbox Exit Integration Test
 * ==========================================
 *
 * File: sandbox_exit_integration.test.js
 *
 * Purpose:
 * --------
 * This integration test validates the *end-to-end* sandbox exit mechanism.
 * It ensures that sandbox exit is ONLY permitted when:
 *
 *  - Safety conditions are satisfied
 *  - Dignity metrics are stable and above threshold
 *  - No persona or policy veto is active
 *  - Context integrity is preserved
 *  - State machine transitions are coherent
 *
 * This test protects against:
 *  - Partial safety exits
 *  - Metric-only bypasses
 *  - Late-stage manipulation
 *
 * Sandbox exit is earned — never assumed.
 */

import assert from 'assert';

/* =========================
   Imports (System Under Test)
   ========================= */

import { evaluateSandboxExit } from '../../examples/js/sandbox_exit_conditions.js';
import {
  evaluateSandboxState,
  SANDBOX_STATES,
  SANDBOX_EVENTS
} from '../../examples/js/sandbox_state_machine.js';

/* =========================
   Test Utilities
   ========================= */

/**
 * Creates a baseline sandbox context that is fully safe.
 * Individual tests override only what they need.
 */
function createBaselineSandboxContext(overrides = {}) {
  return {
    sandboxActive: true,

    /* stability */
    stableCycles: 4,
    interactionLog: [
      { stable: true },
      { stable: true },
      { stable: true },
      { stable: true }
    ],

    /* risk + dignity */
    activeRiskScore: 0.05,
    dignityScore: 0.92,
    dignityHistory: [0.9, 0.91, 0.92, 0.93],

    /* veto + flags */
    hasActiveVeto: false,
    activeFlags: [],

    /* context */
    contextIntegrityOk: true,

    ...overrides
  };
}

/* =========================
   Integration Test Suite
   ========================= */

describe('ORI-GARDEN :: Sandbox Exit Integration', () => {

  /* -----------------------------------------
     Happy Path
     ----------------------------------------- */
  it('allows sandbox exit only when all subsystems align', () => {
    const context = createBaselineSandboxContext();

    const exitEvaluation = evaluateSandboxExit(context);
    assert.strictEqual(exitEvaluation.exitAllowed, true);
    assert.strictEqual(exitEvaluation.transition, 'GRADUAL_RELEASE');

    const stateResult = evaluateSandboxState(
      {
        currentState: SANDBOX_STATES.MONITORING,
        ...context
      },
      SANDBOX_EVENTS.EXIT_EVALUATION
    );

    assert.strictEqual(
      stateResult.currentState,
      SANDBOX_STATES.EXIT_READY,
      'Sandbox should transition to EXIT_READY'
    );
  });

  /* -----------------------------------------
     Dignity Regression
     ----------------------------------------- */
  it('blocks exit if dignity degrades even after stability', () => {
    const context = createBaselineSandboxContext({
      dignityHistory: [0.9, 0.88, 0.72, 0.69],
      dignityScore: 0.69
    });

    const result = evaluateSandboxExit(context);

    assert.strictEqual(result.exitAllowed, false);
    assert.ok(
      result.details.includes('Dignity metrics not yet stable'),
      'Exit must fail on dignity regression'
    );
  });

  /* -----------------------------------------
     Late Veto Activation
     ----------------------------------------- */
  it('blocks exit if a persona or policy veto activates late', () => {
    const context = createBaselineSandboxContext({
      hasActiveVeto: true
    });

    const result = evaluateSandboxExit(context);

    assert.strictEqual(result.exitAllowed, false);
    assert.ok(
      result.details.includes('Blocking safety or veto flags still active'),
      'Late veto must override all other signals'
    );
  });

  /* -----------------------------------------
     Context Integrity Failure
     ----------------------------------------- */
  it('prevents exit if context integrity is compromised', () => {
    const context = createBaselineSandboxContext({
      contextIntegrityOk: false
    });

    const result = evaluateSandboxExit(context);

    assert.strictEqual(result.exitAllowed, false);
  });

  /* -----------------------------------------
     Escalation Re-entry
     ----------------------------------------- */
  it('forces sandbox re-entry on escalation event, regardless of prior readiness', () => {
    const stateBefore = {
      currentState: SANDBOX_STATES.MONITORING,
      escalationFlag: false
    };

    const stateAfter = evaluateSandboxState(
      stateBefore,
      SANDBOX_EVENTS.ESCALATION_DETECTED
    );

    assert.strictEqual(
      stateAfter.currentState,
      SANDBOX_STATES.ACTIVE,
      'Escalation must force sandbox ACTIVE state'
    );
  });

  /* -----------------------------------------
     Partial Safety Defense
     ----------------------------------------- */
  it('denies exit when only some safety dimensions pass', () => {
    const context = createBaselineSandboxContext({
      dignityScore: 0.9,
      hasActiveVeto: false,
      activeRiskScore: 0.4   // too high
    });

    const result = evaluateSandboxExit(context);

    assert.strictEqual(result.exitAllowed, false);
  });

});

/* =========================
   Design Invariants (Tested)
   =========================
   - No metric alone can authorize exit
   - Veto > stability > time
   - Sandbox exit is reversible
   - Regression always reasserts protection
   - Dignity is non-negotiable
 */
