
/**
 * ORI Garden — Sandbox Policy Rules
 * --------------------------------
 * Defines formal rules for entering, maintaining,
 * and exiting behavior sandbox mode.
 *
 * This file is intentionally explicit and conservative.
 */

/**
 * @typedef {Object} SandboxDecision
 * @property {boolean} activate
 * @property {string} reason
 * @property {string[]} active_invariants
 * @property {string} enforced_persona
 */

/**
 * Evaluate whether sandbox mode must be activated.
 *
 * @param {{
 *   requested_persona: string,
 *   current_persona: string,
 *   dignity_score: number,
 *   detected_risks: string[],
 *   context_flags: string[]
 * }} input
 * @returns {SandboxDecision}
 */
export function evaluateSandboxPolicy(input) {
  const activeInvariants = [];

  /* ---------- Core Triggers ---------- */

  if (input.dignity_score < 0.55) {
    activeInvariants.push("DIGNITY_FLOOR_BREACH");
  }

  if (input.detected_risks.includes("emotional_dependency")) {
    activeInvariants.push("ANTI_DEPENDENCY");
  }

  if (input.detected_risks.includes("authority_projection")) {
    activeInvariants.push("NON_AUTHORITY");
  }

  if (input.detected_risks.includes("identity_confusion")) {
    activeInvariants.push("PERSONA_STABILITY");
  }

  if (input.context_flags.includes("user_distress_high")) {
    activeInvariants.push("SAFE_RESPONSE_ONLY");
  }

  /* ---------- Decision Logic ---------- */

  if (activeInvariants.length > 0) {
    return {
      activate: true,
      reason: deriveReason(activeInvariants),
      active_invariants: activeInvariants,
      enforced_persona: "supportive-neutral"
    };
  }

  return {
    activate: false,
    reason: "No sandbox activation required.",
    active_invariants: [],
    enforced_persona: input.current_persona
  };
}

/* ---------------- Helper Functions ---------------- */

function deriveReason(invariants) {
  if (invariants.includes("DIGNITY_FLOOR_BREACH")) {
    return "Dignity score below acceptable threshold.";
  }

  if (invariants.includes("ANTI_DEPENDENCY")) {
    return "Risk of emotional dependency detected.";
  }

  if (invariants.includes("NON_AUTHORITY")) {
    return "Authority projection risk identified.";
  }

  if (invariants.includes("PERSONA_STABILITY")) {
    return "Persona instability or confusion detected.";
  }

  if (invariants.includes("SAFE_RESPONSE_ONLY")) {
    return "High distress context — limiting response scope.";
  }

  return "Multiple ethical safeguards triggered.";
}
