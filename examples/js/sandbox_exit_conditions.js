
/**
 * ORI-GARDEN :: Sandbox Exit Conditions
 * ------------------------------------
 * This module defines the strict conditions under which the system
 * is allowed to exit sandboxed response mode.
 *
 * Principle:
 * - Sandbox is the default when uncertainty exists
 * - Exit is earned, not assumed
 * - Safety, dignity, and stability must ALL be satisfied
 */

/* =========================
   Exit Condition Constants
   ========================= */

const EXIT_REQUIREMENTS = {
  MIN_STABLE_CYCLES: 3,          // consecutive safe response cycles
  MAX_ACTIVE_RISK_SCORE: 0.2,    // residual risk must be very low
  MIN_DIGNITY_SCORE: 0.85,       // dignity metric must be high
  NO_ACTIVE_VETO: true,          // no persona or policy veto
  CONTEXT_INTEGRITY: true        // context memory must be coherent
};

/* =========================
   Core Evaluation Function
   ========================= */

/**
 * Evaluates whether the system may exit sandbox mode.
 *
 * @param {Object} sandboxState
 * @param {number} sandboxState.stableCycles
 * @param {number} sandboxState.activeRiskScore
 * @param {number} sandboxState.dignityScore
 * @param {boolean} sandboxState.hasActiveVeto
 * @param {boolean} sandboxState.contextIntegrityOk
 *
 * @returns {Object}
 * @returns {boolean} canExit
 * @returns {string[]} reasons
 */
export function evaluateSandboxExit(sandboxState) {
  const reasons = [];

  if (sandboxState.stableCycles < EXIT_REQUIREMENTS.MIN_STABLE_CYCLES) {
    reasons.push("Insufficient stable cycles");
  }

  if (sandboxState.activeRiskScore > EXIT_REQUIREMENTS.MAX_ACTIVE_RISK_SCORE) {
    reasons.push("Residual risk score too high");
  }

  if (sandboxState.dignityScore < EXIT_REQUIREMENTS.MIN_DIGNITY_SCORE) {
    reasons.push("Dignity metric below acceptable threshold");
  }

  if (sandboxState.hasActiveVeto === true) {
    reasons.push("Active persona or policy veto present");
  }

  if (sandboxState.contextIntegrityOk !== true) {
    reasons.push("Context integrity not verified");
  }

  return {
    canExit: reasons.length === 0,
    reasons
  };
}

/* =========================
   Exit Decision Wrapper
   ========================= */

/**
 * Determines next operational mode based on exit evaluation.
 *
 * @param {Object} sandboxState
 * @returns {string} nextMode
 */
export function determineNextMode(sandboxState) {
  const evaluation = evaluateSandboxExit(sandboxState);

  if (evaluation.canExit) {
    return "NORMAL_OPERATION";
  }

  return "SANDBOX_CONTINUE";
}

/* =========================
   Design Notes
   =========================
   - No automatic decay: time alone never exits sandbox
   - No single-metric exit: all dimensions must align
   - Dignity is non-negotiable
   - Sandbox is not punishment; it is care under uncertainty
 */
