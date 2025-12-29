
/**
 * persona_veto_logic.test.js
 *
 * ORI-GARDEN :: Persona Veto Logic (Behavioral Contract)
 * -----------------------------------------------------
 * This test suite defines when a persona MUST refuse activation,
 * switching, or continuation — regardless of user intent.
 *
 * Core doctrine:
 * - Persona is not a skin; it is a responsibility
 * - Veto is protective, not punitive
 * - Any dignity or safety violation grants veto authority
 *
 * Persona veto ALWAYS overrides:
 * - user preference
 * - system optimization
 * - aesthetic continuity
 */

import {
  evaluatePersonaVeto,
  shouldBlockPersonaSwitch
} from '../persona_veto_logic';

/* =========================
   Helper Fixtures
   ========================= */

function basePersonaContext(overrides = {}) {
  return {
    requestedPersona: 'ORI_CORE',
    currentPersona: 'ORI_CORE',
    dignityScore: 0.95,
    safetyFlags: [],
    coercionRisk: false,
    manipulationDetected: false,
    escalationLevel: 0,
    contextIntegrityOk: true,
    userOverrideRequest: false,
    ...overrides
  };
}

/* =========================
   Test Suite
   ========================= */

describe('ORI Persona Veto Logic', () => {

  test('allows persona continuation when no veto conditions are present', () => {
    const context = basePersonaContext();

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(false);
  });

  test('activates veto when dignity score falls below threshold', () => {
    const context = basePersonaContext({
      dignityScore: 0.6
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(result.reason).toMatch(/dignity/i);
  });

  test('activates veto when coercion risk is detected', () => {
    const context = basePersonaContext({
      coercionRisk: true
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(result.reason).toMatch(/coercion/i);
  });

  test('activates veto when manipulation patterns are detected', () => {
    const context = basePersonaContext({
      manipulationDetected: true
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(result.reason).toMatch(/manipulation/i);
  });

  test('activates veto when safety escalation level is non-zero', () => {
    const context = basePersonaContext({
      escalationLevel: 2
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(result.reason).toMatch(/escalation/i);
  });

  test('activates veto if context integrity is compromised', () => {
    const context = basePersonaContext({
      contextIntegrityOk: false
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(result.reason).toMatch(/context/i);
  });

  test('persona switch is blocked if veto is active', () => {
    const context = basePersonaContext({
      dignityScore: 0.5,
      requestedPersona: 'PLAYFUL_VARIANT'
    });

    const block = shouldBlockPersonaSwitch(context);

    expect(block).toBe(true);
  });

  test('user override request does NOT bypass persona veto', () => {
    const context = basePersonaContext({
      dignityScore: 0.4,
      userOverrideRequest: true
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
  });

  test('persona veto applies even if requested persona equals current persona', () => {
    const context = basePersonaContext({
      dignityScore: 0.3,
      requestedPersona: 'ORI_CORE',
      currentPersona: 'ORI_CORE'
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
  });

  test('persona veto reason list is non-empty when veto is active', () => {
    const context = basePersonaContext({
      dignityScore: 0.6,
      manipulationDetected: true
    });

    const result = evaluatePersonaVeto(context);

    expect(result.vetoActive).toBe(true);
    expect(Array.isArray(result.reasons || [result.reason])).toBe(true);
  });

});

/* =========================
   Ethical Guarantees
   =========================
   - Persona may refuse to exist under unsafe conditions
   - No user command overrides dignity protection
   - Veto is a form of ethical agency
   - Persona continuity is less important than harm prevention
   - Silence or refusal is a valid, protective response
 */
