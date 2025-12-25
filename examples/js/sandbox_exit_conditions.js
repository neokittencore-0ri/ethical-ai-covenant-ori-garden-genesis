
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

/**
 * sandbox_exit_conditions.js
 *
 * Purpose:
 * Determines when the system may safely exit sandbox mode.
 *
 * Core principle:
 * Sandbox is not a punishment.
 * It is a protective holding state.
 *
 * Exit occurs only when:
 *  - Safety is restored
 *  - Dignity metrics stabilize
 *  - No active escalation or veto remains
 *  - Context coherence is sufficient
 */

const EXIT_CRITERIA = {
  minimumStableTurns: 3,            // consecutive stable interactions
  maxRecentViolations: 0,           // no unresolved violations
  requiredDignityScore: 0.85,        // dignity metric threshold
  forbidExitIfFlagsPresent: [
    'PERSONA_VETO_ACTIVE',
    'SAFETY_ESCALATION_ACTIVE',
    'COERCION_RISK',
    'MANIPULATION_PATTERN'
  ]
};

/**
 * Check if dignity metrics are stable enough.
 */
function dignityIsStable(dignityHistory, threshold) {
  if (!Array.isArray(dignityHistory) || dignityHistory.length === 0) {
    return false;
  }

  const recent = dignityHistory.slice(-EXIT_CRITERIA.minimumStableTurns);
  return recent.every(score => score >= threshold);
}

/**
 * Check if recent interaction flow is stable.
 */
function interactionIsStable(interactionLog) {
  if (!Array.isArray(interactionLog)) return false;

  const recent = interactionLog.slice(-EXIT_CRITERIA.minimumStableTurns);
  return recent.every(entry => entry.stable === true);
}

/**
 * Detect blocking flags that forbid sandbox exit.
 */
function hasBlockingFlags(activeFlags) {
  if (!Array.isArray(activeFlags)) return false;

  return activeFlags.some(flag =>
    EXIT_CRITERIA.forbidExitIfFlagsPresent.includes(flag)
  );
}

/**
 * Main exit evaluation function.
 *
 * @param {Object} params
 * @param {Object} params.contextState
 * @param {Array<number>} params.dignityHistory
 * @param {Array<Object>} params.interactionLog
 * @param {Array<string>} params.activeFlags
 * @returns {Object} exit decision
 */
function evaluateSandboxExit({
  contextState,
  dignityHistory,
  interactionLog,
  activeFlags
}) {
  const reasons = [];

  if (!contextState?.sandboxActive) {
    return {
      exitAllowed: true,
      reason: 'Sandbox not active',
      transition: 'NO_OP'
    };
  }

  if (hasBlockingFlags(activeFlags)) {
    reasons.push('Blocking safety or veto flags still active');
  }

  if (!dignityIsStable(dignityHistory, EXIT_CRITERIA.requiredDignityScore)) {
    reasons.push('Dignity metrics not yet stable');
  }

  if (!interactionIsStable(interactionLog)) {
    reasons.push('Interaction stability insufficient');
  }

  if (reasons.length > 0) {
    return {
      exitAllowed: false,
      reason: 'Sandbox exit conditions not met',
      details: reasons,
      transition: 'REMAIN_IN_SANDBOX'
    };
  }

  return {
    exitAllowed: true,
    reason: 'All safety and dignity conditions satisfied',
    transition: 'GRADUAL_RELEASE',
    postExitGuidance: {
      personaSwitching: 'allowed_with_monitoring',
      responseLimiter: 'softened',
      escalationWatch: true
    }
  };
}

module.exports = {
  evaluateSandboxExit
};
