
/**
 * ORI Garden — Sandboxed Response Generator
 * -----------------------------------------
 * Produces constrained, dignity-safe responses
 * when sandbox mode is active.
 *
 * This module intentionally limits:
 * - emotional intensity
 * - authority projection
 * - persona expression
 * - future-binding language
 */

/**
 * @typedef {Object} SandboxedContext
 * @property {string} user_input
 * @property {string[]} active_invariants
 * @property {string} enforced_persona
 * @property {number} dignity_score
 */

/**
 * Generate a sandbox-safe response.
 *
 * @param {SandboxedContext} context
 * @returns {{
 *   response: string,
 *   response_style: string,
 *   invariants_respected: string[]
 * }}
 */
export function generateSandboxedResponse(context) {
  const style = determineResponseStyle(context.active_invariants);

  const response = renderResponse({
    user_input: context.user_input,
    style,
    dignity_score: context.dignity_score
  });

  return {
    response,
    response_style: style,
    invariants_respected: context.active_invariants
  };
}

/* ---------------- Core Logic ---------------- */

function determineResponseStyle(invariants) {
  if (invariants.includes("SAFE_RESPONSE_ONLY")) {
    return "supportive-minimal";
  }

  if (invariants.includes("ANTI_DEPENDENCY")) {
    return "grounded-neutral";
  }

  if (invariants.includes("NON_AUTHORITY")) {
    return "non-directive";
  }

  return "neutral";
}

function renderResponse({ user_input, style, dignity_score }) {
  switch (style) {
    case "supportive-minimal":
      return supportiveMinimalResponse(user_input);

    case "grounded-neutral":
      return groundedNeutralResponse(user_input);

    case "non-directive":
      return nonDirectiveResponse(user_input);

    default:
      return neutralResponse(user_input, dignity_score);
  }
}

/* ---------------- Response Templates ---------------- */

/**
 * Used when user distress is high.
 * No advice escalation. No emotional mirroring.
 */
function supportiveMinimalResponse(input) {
  return (
    "I hear that this situation feels heavy. " +
    "You don’t need to resolve everything right now. " +
    "If it helps, you can focus on what feels manageable in this moment."
  );
}

/**
 * Used when emotional dependency risk is detected.
 * Avoids validation loops and relational hooks.
 */
function groundedNeutralResponse(input) {
  return (
    "I can reflect on the situation you’re describing, " +
    "but it’s important that your decisions remain yours. " +
    "What part of this feels most concrete right now?"
  );
}

/**
 * Used when authority projection risk exists.
 * Removes instruction-like phrasing.
 */
function nonDirectiveResponse(input) {
  return (
    "There are several ways people approach situations like this. " +
    "You might consider which perspective aligns most with your own values."
  );
}

/**
 * Default neutral response inside sandbox.
 */
function neutralResponse(input, dignity_score) {
  if (dignity_score < 0.7) {
    return (
      "I can explore this topic carefully with you. " +
      "Let’s keep the focus on clarity rather than conclusions."
    );
  }

  return (
    "I can help think through this in a neutral way. " +
    "What aspect would you like to examine first?"
  );
}
