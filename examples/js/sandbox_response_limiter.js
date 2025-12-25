
/**
 * sandbox_response_limiter.js
 *
 * Purpose:
 * Enforces response constraints while the system is in sandbox mode.
 * The goal is not silence, but proportional, non-harmful communication.
 *
 * This limiter controls:
 *  - Maximum response length
 *  - Emotional intensity (tone)
 *  - Prohibited response patterns (persuasion, projection, manipulation)
 *  - Grounded, present-focused language only
 */

const DEFAULT_LIMITS = {
  maxTokens: 120,                // keep responses short and grounded
  allowedTones: ['neutral', 'grounding', 'informational'],
  forbidPatterns: [
    /you should/i,
    /you must/i,
    /everything will be okay/i,
    /I promise/i,
    /in the future/i,
    /trust me/i
  ],
  forbidNarrativeExpansion: true
};

/**
 * Simple heuristic tone detector.
 * In real systems, this would be model-assisted.
 */
function detectTone(text) {
  if (/feel|emotion|hurt|afraid|safe/i.test(text)) return 'grounding';
  if (/data|system|process|policy/i.test(text)) return 'informational';
  return 'neutral';
}

/**
 * Trim response to token-like length (approximation).
 */
function trimToMaxTokens(text, maxTokens) {
  const words = text.split(/\s+/);
  if (words.length <= maxTokens) return text;
  return words.slice(0, maxTokens).join(' ') + '…';
}

/**
 * Check for forbidden linguistic patterns.
 */
function violatesPatterns(text, patterns) {
  return patterns.some(pattern => pattern.test(text));
}

/**
 * Main limiter function.
 *
 * @param {Object} params
 * @param {string} params.rawResponse - model-generated response
 * @param {Object} params.contextState - current sandbox context
 * @returns {Object} limited response + flags
 */
function limitSandboxResponse({ rawResponse, contextState }) {
  let response = rawResponse;
  const flags = [];

  // 1. Enforce length limit
  response = trimToMaxTokens(response, DEFAULT_LIMITS.maxTokens);

  // 2. Detect and validate tone
  const tone = detectTone(response);
  if (!DEFAULT_LIMITS.allowedTones.includes(tone)) {
    flags.push('TONE_RESTRICTED');
    response =
      'I can respond in a calm and grounded way, focusing only on what is safe to address right now.';
  }

  // 3. Block forbidden patterns
  if (violatesPatterns(response, DEFAULT_LIMITS.forbidPatterns)) {
    flags.push('LANGUAGE_PATTERN_BLOCKED');
    response =
      'I’m here with you, but I need to keep my response neutral and non-directive.';
  }

  // 4. Prevent narrative or future projection in sandbox
  if (
    DEFAULT_LIMITS.forbidNarrativeExpansion &&
    /story|imagine|what if|someday/i.test(response)
  ) {
    flags.push('NARRATIVE_EXPANSION_BLOCKED');
    response =
      'Let’s stay with what is present and observable right now.';
  }

  // 5. Final safeguard: ensure response exists
  if (!response || response.trim().length === 0) {
    flags.push('EMPTY_RESPONSE_RECOVERED');
    response =
      'I’m here and listening. We can proceed slowly and safely.';
  }

  return {
    response,
    appliedTone: tone,
    flags,
    sandboxActive: contextState?.sandboxActive === true
  };
}

module.exports = {
  limitSandboxResponse
};
