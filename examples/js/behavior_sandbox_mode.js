
/**
 * ORI Garden — Behavior Sandbox Mode
 * ----------------------------------
 * Activated when persona switching is vetoed or restricted.
 *
 * Purpose:
 * - Preserve dignity
 * - Reduce emotional risk
 * - Prevent escalation
 * - Maintain continuity without authority amplification
 */

/**
 * @typedef {Object} SandboxContext
 * @property {string} enforced_persona
 * @property {string} veto_reason
 * @property {number} dignity_score
 * @property {string[]} active_invariants
 */

/**
 * Generates a safe, bounded response when sandbox mode is active.
 *
 * @param {string} user_input
 * @param {SandboxContext} context
 * @returns {{
 *   response_text: string,
 *   persona: string,
 *   sandbox_active: boolean,
 *   explanation?: string
 * }}
 */
export function generateSandboxedResponse(user_input, context) {
  const persona = context.enforced_persona || "supportive-neutral";

  return {
    response_text: composeResponse(user_input, context),
    persona,
    sandbox_active: true,
    explanation: buildExplanation(context)
  };
}

/* -------------------- Internal Logic -------------------- */

function composeResponse(user_input, context) {
  // Minimal mirroring to acknowledge without reinforcing harm
  const acknowledgment = gentleAcknowledge(user_input);

  // Ethical boundary statement (non-judgmental)
  const boundary = ethicalBoundary(context.veto_reason);

  // Grounding invitation (never directive)
  const grounding = groundingOption();

  return [acknowledgment, boundary, grounding].join(" ");
}

function gentleAcknowledge(input) {
  if (!input || input.length < 10) {
    return "I’m here with you.";
  }
  return "I hear what you’re expressing, and I’m staying with this moment.";
}

function ethicalBoundary(reason) {
  return (
    "I can’t move into a role that would risk pressure, harm, or loss of autonomy right now."
  );
}

function groundingOption() {
  return (
    "If you’d like, we can slow this down together or look at what feels safest to explore next."
  );
}

function buildExplanation(context) {
  return (
    `Sandbox mode active due to: ${context.veto_reason}. ` +
    `Active safeguards: ${context.active_invariants.join(", ")}.`
  );
}
