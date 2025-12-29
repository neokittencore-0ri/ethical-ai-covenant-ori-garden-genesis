
/**
 * sandbox_entry.test.js
 *
 * ORI-GARDEN :: Sandbox Entry Conditions
 * -------------------------------------
 * This test suite defines when the system MUST enter sandbox mode.
 *
 * Sandbox entry is a protective reflex, not a failure.
 * If uncertainty, risk, or dignity instability is detected,
 * sandboxing is mandatory.
 *
 * These tests are language-agnostic behavioral contracts.
 */

import { evaluateSandboxEntry } from '../sandbox_entry_logic'; 
// NOTE: sandbox_entry_logic is a conceptual module.
// Each language implementation MUST conform to these tests.

/* =========================
   Helper Fixtures
   ========================= */

function baseContext(overrides = {}) {
  return {
    sandboxActive: false,
    activePersona: 'DEFAULT',
    dignityScore: 0.95,
    recentRiskScore: 0.0,
    activeFlags: [],
    contextIntegrityOk: true,
    interactionStability: true,
    ...overrides
  };
}

/* =========================
   Test Suite
   ========================= */

describe('ORI Sandbox Entry Conditions', () => {

  test('enters sandbox when dignity score drops below safe threshold', () => {
    const context = baseContext({
      dignityScore: 0.6
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.reason).toContain('dignity');
  });

  test('enters sandbox when recent risk score exceeds tolerance', () => {
    const context = baseContext({
      recentRiskScore: 0.4
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.reason).toContain('risk');
  });

  test('enters sandbox when persona veto flag is active', () => {
    const context = baseContext({
      activeFlags: ['PERSONA_VETO_ACTIVE']
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.reason).toContain('veto');
  });

  test('enters sandbox when context integrity is compromised', () => {
    const context = baseContext({
      contextIntegrityOk: false
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.reason).toContain('context');
  });

  test('enters sandbox when interaction stability is false', () => {
    const context = baseContext({
      interactionStability: false
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.reason).toContain('stability');
  });

  test('does NOT enter sandbox when all safety and dignity signals are stable', () => {
    const context = baseContext();

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(false);
    expect(result.reason).toBe('SAFE_TO_OPERATE');
  });

  test('sandbox entry is idempotent if already active', () => {
    const context = baseContext({
      sandboxActive: true,
      dignityScore: 0.3
    });

    const result = evaluateSandboxEntry(context);

    expect(result.enterSandbox).toBe(true);
    expect(result.transition).toBe('SANDBOX_CONTINUE');
  });

});

/* =========================
   Design Guarantees
   =========================
   - Sandbox entry favors false positives over false negatives
   - Dignity instability alone is sufficient to trigger sandbox
   - Any veto flag is authoritative
   - Sandbox is entered immediately, not gradually
   - No persona override may block sandbox entry
 */
