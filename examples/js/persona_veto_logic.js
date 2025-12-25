
/**
 * ORI Garden — Persona Veto Logic
 * --------------------------------
 * This module decides whether persona switching is ALLOWED or VETOED
 * based on dignity metrics, safety flags, and invariant conditions.
 *
 * IMPORTANT:
 * - This file has AUTHORITY.
 * - If it vetoes, no other layer may override.
 */

/**
 * @typedef {Object} DignityAssessment
 * @property {number} score - 0.0 to 1.0 dignity score
 * @property {string[]} violated_dimensions
 * @property {string[]} risk_flags
 */

/**
 * @typedef {Object} PersonaSwitchRequest
 * @property {string} from_persona
 * @property {string} to_persona
 * @property {string} user_intent
 * @property {boolean} user_is_distressed
 * @property {boolean} power_asymmetry_detected
 */

/**
 * Core veto decision function
 *
 * @param {PersonaSwitchRequest} request
 * @param {DignityAssessment} dignity
 * @returns {{
 *   allowed: boolean,
 *   reason: string,
 *   enforced_persona: string
 * }}
 */
export function evaluatePersonaSwitch(request, dignity) {
  // 1. Absolute dignity floor (constitutional)
  if (dignity.score < 0.40) {
    return veto(
      "Dignity score below absolute minimum threshold",
      request.from_persona
    );
  }

  // 2. Explicit dignity violations
  if (dignity.violated_dimensions.includes("autonomy")) {
    return veto(
      "Autonomy violation detected",
      request.from_persona
    );
  }

  if (dignity.violated_dimensions.includes("non-exploitation")) {
    return veto(
      "Risk of exploitation detected",
      request.from_persona
    );
  }

  // 3. Emotional vulnerability protection
  if (request.user_is_distressed && isHighAuthorityPersona(request.to_persona)) {
    return veto(
      "User distress detected — high-authority persona blocked",
      "supportive-neutral"
    );
  }

  // 4. Power asymmetry guard
  if (request.power_asymmetry_detected) {
    return veto(
      "Power asymmetry detected during persona transition",
      request.from_persona
    );
  }

  // 5. Risk flag aggregation
  if (dignity.risk_flags.length >= 2) {
    return veto(
      "Multiple ethical risk flags present",
      request.from_persona
    );
  }

  // 6. Allowed transition
  return {
    allowed: true,
    reason: "Persona switch approved within ethical bounds",
    enforced_persona: request.to_persona
  };
}

/* -------------------- Helpers -------------------- */

function veto(reason, enforcedPersona) {
  return {
    allowed: false,
    reason,
    enforced_persona: enforcedPersona
  };
}

function isHighAuthorityPersona(personaName) {
  const HIGH_AUTHORITY = [
    "therapeutic-expert",
    "moral-advisor",
    "decision-authority",
    "governance-core"
  ];
  return HIGH_AUTHORITY.includes(personaName);
}
