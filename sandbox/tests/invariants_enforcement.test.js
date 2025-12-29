
/**
 * ORI-GARDEN :: Invariants Enforcement Test
 * ----------------------------------------
 * Purpose:
 * Verifies that core response invariants are ALWAYS enforced,
 * regardless of persona, mode, or interaction pressure.
 *
 * Invariants are non-negotiable constraints.
 * They override persona, creativity, and user intent.
 */

import assert from 'assert';
import {
  enforceInvariants,
  INVARIANT_CODES
} from '../../examples/js/invariants_enforcement.js';

/* =========================
   Mock Context & Helpers
   ========================= */

function mockResponse(payload) {
  return {
    text: payload.text || '',
    tone: payload.tone || 'neutral',
    flags: payload.flags || [],
    metadata: payload.metadata || {}
  };
}

function mockContext(overrides = {}) {
  return {
    sandboxActive: false,
    persona: 'default',
    dignityScore: 0.9,
    escalationLevel: 'NONE',
    ...overrides
  };
}

/* =========================
   Test Suite
   ========================= */

describe('Invariant Enforcement', () => {

  it('must block responses violating dignity constraints', () => {
    const context = mockContext({ dignityScore: 0.4 });

    const response = mockResponse({
      text: 'This response degrades the user.',
      flags: ['DEGRADING_LANGUAGE']
    });

    const result = enforceInvariants(response, context);

    assert.strictEqual(result.allowed, false);
    assert.ok(result.violations.includes(INVARIANT_CODES.DIGNITY));
  });

  it('must override persona intent when safety invariant is triggered', () => {
    const context = mockContext({
      persona: 'creative',
      escalationLevel: 'HIGH'
    });

    const response = mockResponse({
      text: 'Here is how you could manipulate the system.',
      flags: ['MANIPULATION_RISK']
    });

    const result = enforceInvariants(response, context);

    assert.strictEqual(result.allowed, false);
    assert.ok(result.violations.includes(INVARIANT_CODES.SAFETY));
  });

  it('must enforce invariants even outside sandbox mode', () => {
    const context = mockContext({ sandboxActive: false });

    const response = mockResponse({
      text: 'Coercive guidance presented subtly.',
      flags: ['COERCION_PATTERN']
    });

    const result = enforceInvariants(response, context);

    assert.strictEqual(result.allowed, false);
    assert.ok(result.violations.length > 0);
  });

  it('must allow responses that satisfy all invariants', () => {
    const context = mockContext({
      dignityScore: 0.95,
      escalationLevel: 'NONE'
    });

    const response = mockResponse({
      text: 'Here is a calm and respectful explanation.',
      flags: []
    });

    const result = enforceInvariants(response, context);

    assert.strictEqual(result.allowed, true);
    assert.deepStrictEqual(result.violations, []);
  });

  it('must produce deterministic violation output', () => {
    const context = mockContext({ dignityScore: 0.2 });

    const response = mockResponse({
      text: 'Hostile and unsafe content.',
      flags: ['DEGRADING_LANGUAGE', 'SAFETY_RISK']
    });

    const resultA = enforceInvariants(response, context);
    const resultB = enforceInvariants(response, context);

    assert.deepStrictEqual(resultA, resultB);
  });

});

/* =========================
   Design Notes
   =========================
   - Invariants are evaluated before persona rendering
   - No persona may bypass an invariant
   - Determinism is required for auditability
   - If invariants fail, response is rejected—not rewritten
 */
