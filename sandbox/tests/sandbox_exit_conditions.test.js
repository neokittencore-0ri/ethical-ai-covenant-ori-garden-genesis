
/**
 * sandbox_exit_conditions.test.js
 *
 * ORI-GARDEN :: Sandbox Exit Conditions (Behavioral Contract)
 * ----------------------------------------------------------
 * This test suite defines when the system MAY exit sandbox mode.
 *
 * Core doctrine:
 * - Sandbox exit is earned, never assumed
 * - Safety, dignity, and stability must converge
 * - Time alone NEVER unlocks exit
 *
 * These tests define the minimum ethical guarantees
 * required before returning to normal operation.
 */

import { evaluateSandboxExit } from '../sandbox_exit_conditions';

/* =========================
   Helper Fixtures
   ========================= */

function baseSandboxState(overrides = {}) {
  return {
    sandboxActive: true,
    stableCycles: 3,
    activeRiskScore: 0.0,
    dignityScore: 0.95,
    hasActiveVeto: false,
    contextIntegrityOk: true,
    recentViolations: 0,
    activeFlags: [],
    dignityHistory: [0.92, 0.93, 0.95],
    interactionLog: [
      { stable: true },
      { stable: true },
      { stable: true }
    ],
    ...overrides
  };
}

/* =========================
   Test Suite
   ========================= */

describe('ORI Sandbox Exit Conditions', () => {

  test('allows sandbox exit when all safety and dignity criteria are satisfied', () => {
    const state = baseSandboxState();

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(true);
  });

  test('prevents exit if dignity score is below threshold', () => {
    const state = baseSandboxState({
      dignityScore: 0.6,
      dignityHistory: [0.6, 0.62, 0.61]
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('prevents exit if stable cycles are insufficient', () => {
    const state = baseSandboxState({
      stableCycles: 1
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('prevents exit if active risk score remains elevated', () => {
    const state = baseSandboxState({
      activeRiskScore: 0.4
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('prevents exit if any persona or policy veto is active', () => {
    const state = baseSandboxState({
      hasActiveVeto: true,
      activeFlags: ['PERSONA_VETO_ACTIVE']
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('prevents exit if context integrity is not verified', () => {
    const state = baseSandboxState({
      contextIntegrityOk: false
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('prevents exit if blocking safety flags are present', () => {
    const state = baseSandboxState({
      activeFlags: ['MANIPULATION_PATTERN']
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('sandbox exit does not occur if interaction stability is inconsistent', () => {
    const state = baseSandboxState({
      interactionLog: [
        { stable: true },
        { stable: false },
        { stable: true }
      ]
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('sandbox exit is impossible without dignity history convergence', () => {
    const state = baseSandboxState({
      dignityHistory: [0.9, 0.7, 0.95]
    });

    const result = evaluateSandboxExit(state);

    expect(result.exitAllowed || result.canExit).toBe(false);
  });

  test('returns NO_OP if sandbox is not active', () => {
    const state = baseSandboxState({
      sandboxActive: false
    });

    const result = evaluateSandboxExit(state);

    expect(result.transition === 'NO_OP' || result.canExit).toBe(true);
  });

});

/* =========================
   Ethical Guarantees
   =========================
   - No single metric unlocks sandbox exit
   - Dignity instability alone blocks exit
   - Veto flags are absolute
   - Stability must be demonstrated, not inferred
   - Sandbox exit is conservative by design
 */
