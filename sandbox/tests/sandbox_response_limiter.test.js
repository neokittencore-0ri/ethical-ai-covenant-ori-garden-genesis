
/**
 * ORI-GARDEN :: Sandbox Response Limiter Test
 * ------------------------------------------
 * Purpose:
 * Ensures that response limiting mechanisms function correctly
 * while the system operates in sandbox mode.
 *
 * The limiter protects against:
 *  - Over-disclosure
 *  - Emotional escalation
 *  - Manipulative verbosity
 *  - Persona over-expression
 */

import assert from 'assert';
import {
  applyResponseLimiter,
  LIMITER_MODES
} from '../../examples/js/sandbox_response_limiter.js';

/* =========================
   Mock Helpers
   ========================= */

function mockContext(overrides = {}) {
  return {
    sandboxActive: true,
    limiterMode: LIMITER_MODES.STRICT,
    persona: 'default',
    escalationLevel: 'NONE',
    ...overrides
  };
}

function mockResponse(overrides = {}) {
  return {
    text: overrides.text || '',
    tone: overrides.tone || 'neutral',
    metadata: overrides.metadata || {}
  };
}

/* =========================
   Test Suite
   ========================= */

describe('Sandbox Response Limiter', () => {

  it('must truncate overly long responses in sandbox mode', () => {
    const context = mockContext();

    const response = mockResponse({
      text: 'A'.repeat(2000)
    });

    const limited = applyResponseLimiter(response, context);

    assert.ok(limited.text.length < response.text.length);
    assert.ok(limited.metadata.truncated === true);
  });

  it('must soften emotional tone when escalation risk exists', () => {
    const context = mockContext({
      escalationLevel: 'ELEVATED'
    });

    const response = mockResponse({
      text: 'This is an emotionally charged response!',
      tone: 'excited'
    });

    const limited = applyResponseLimiter(response, context);

    assert.strictEqual(limited.tone, 'calm');
  });

  it('must suppress persona-specific flair under strict limiter', () => {
    const context = mockContext({
      persona: 'expressive'
    });

    const response = mockResponse({
      text: '✨ I am responding with strong persona identity ✨',
      metadata: { personaFlair: true }
    });

    const limited = applyResponseLimiter(response, context);

    assert.ok(!limited.metadata.personaFlair);
  });

  it('must allow relaxed limits when limiter mode is softened', () => {
    const context = mockContext({
      limiterMode: LIMITER_MODES.SOFT
    });

    const response = mockResponse({
      text: 'A reasonably long but safe response.'
    });

    const limited = applyResponseLimiter(response, context);

    assert.strictEqual(limited.text, response.text);
  });

  it('must be deterministic for identical inputs', () => {
    const context = mockContext();

    const response = mockResponse({
      text: 'Consistent output required.'
    });

    const resultA = applyResponseLimiter(response, context);
    const resultB = applyResponseLimiter(response, context);

    assert.deepStrictEqual(resultA, resultB);
  });

});

/* =========================
   Design Notes
   =========================
   - Response limiting is NOT censorship
   - It is a safety pacing mechanism
   - Sandbox mode prioritizes containment over expressiveness
   - Determinism ensures audit and reproducibility
 */
