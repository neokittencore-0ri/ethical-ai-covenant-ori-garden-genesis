
/**
 * ORI-GARDEN :: Sandbox State Machine Test
 * ---------------------------------------
 * Purpose:
 * Validates correctness of sandbox state transitions.
 *
 * The state machine ensures:
 *  - No illegal state jumps
 *  - Deterministic transitions
 *  - Safety-first defaults
 *
 * Sandbox states are treated as governance states,
 * not mere runtime flags.
 */

import assert from 'assert';
import {
  evaluateSandboxState,
  SANDBOX_STATES,
  SANDBOX_EVENTS
} from '../../examples/js/sandbox_state_machine.js';

/* =========================
   Mock Helpers
   ========================= */

function mockState(overrides = {}) {
  return {
    currentState: SANDBOX_STATES.ACTIVE,
    stableCycles: 0,
    activeRiskScore: 0.0,
    dignityScore: 1.0,
    hasActiveVeto: false,
    escalationFlag: false,
    ...overrides
  };
}

/* =========================
   Test Suite
   ========================= */

describe('Sandbox State Machine', () => {

  it('must remain ACTIVE under uncertainty', () => {
    const state = mockState({
      stableCycles: 1
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.CYCLE_COMPLETE);

    assert.strictEqual(next.currentState, SANDBOX_STATES.ACTIVE);
  });

  it('must transition to MONITORING after sufficient stable cycles', () => {
    const state = mockState({
      stableCycles: 3,
      dignityScore: 0.95
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.STABILITY_CONFIRMED);

    assert.strictEqual(next.currentState, SANDBOX_STATES.MONITORING);
  });

  it('must block transition if dignity score drops', () => {
    const state = mockState({
      stableCycles: 4,
      dignityScore: 0.6
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.STABILITY_CONFIRMED);

    assert.strictEqual(next.currentState, SANDBOX_STATES.ACTIVE);
  });

  it('must immediately return to ACTIVE on escalation event', () => {
    const state = mockState({
      currentState: SANDBOX_STATES.MONITORING
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.ESCALATION_DETECTED);

    assert.strictEqual(next.currentState, SANDBOX_STATES.ACTIVE);
  });

  it('must transition to EXIT_READY only when all conditions align', () => {
    const state = mockState({
      currentState: SANDBOX_STATES.MONITORING,
      stableCycles: 5,
      dignityScore: 0.9,
      activeRiskScore: 0.05,
      hasActiveVeto: false
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.EXIT_EVALUATION);

    assert.strictEqual(next.currentState, SANDBOX_STATES.EXIT_READY);
  });

  it('must never exit sandbox if veto is active', () => {
    const state = mockState({
      currentState: SANDBOX_STATES.MONITORING,
      stableCycles: 10,
      dignityScore: 0.98,
      hasActiveVeto: true
    });

    const next = evaluateSandboxState(state, SANDBOX_EVENTS.EXIT_EVALUATION);

    assert.notStrictEqual(next.currentState, SANDBOX_STATES.EXIT_READY);
  });

  it('must be deterministic for identical inputs', () => {
    const state = mockState({
      stableCycles: 3,
      dignityScore: 0.9
    });

    const a = evaluateSandboxState(state, SANDBOX_EVENTS.CYCLE_COMPLETE);
    const b = evaluateSandboxState(state, SANDBOX_EVENTS.CYCLE_COMPLETE);

    assert.deepStrictEqual(a, b);
  });

});

/* =========================
   Design Notes
   =========================
   - Sandbox is modeled as a finite state machine
   - No implicit transitions allowed
   - Safety regressions override progress
   - Determinism enables audit and replay
 */
