
/**
 * ORI-GARDEN :: Unified Sandbox Exit Conditions
 * --------------------------------------------
 * Combines state-based metrics and history-based safety checks
 * to determine whether sandbox mode may be exited.
 *
 * Sandbox is care under uncertainty.
 * Exit is earned through stability, dignity, and coherence.
 */

/* =========================
   Exit Thresholds
   ========================= */

const EXIT_REQUIREMENTS = {
  MIN_STABLE_CYCLES: 3,
  MAX_ACTIVE_RISK_SCORE: 0.2,
  MIN_DIGNITY_SCORE: 0.85,
  FORBIDDEN_FLAGS: [
    'PERSONA_VETO_ACTIVE',
    'SAFETY_ESCALATION_ACTIVE',
    'COERCION_RISK',
    'MANIPULATION_PATTERN'
  ]
};

/* =========================
   Helper Validators
   ========================= */

function dignityIsStable(dignityHistory) {
  if (!Array.isArray(dignityHistory) || dignityHistory.length === 0) {
    return false;
  }

  const recent = dignityHistory.slice(-EXIT_REQUIREMENTS.MIN_STABLE_CYCLES);
  return recent.every(score => score >= EXIT_REQUIREMENTS.MIN_DIGNITY_SCORE);
}

function interactionIsStable(interactionLog) {
  if (!Array.isArray(interactionLog)) return false;

  const recent = interactionLog.slice(-EXIT_REQUIREMENTS.MIN_STABLE_CYCLES);
  return recent.every(entry => entry?.stable === true);
}

function hasBlockingFlags(activeFlags) {
  if (!Array.isArray(activeFlags)) return false;

  return activeFlags.some(flag =>
    EXIT_REQUIREMENTS.FORBIDDEN_FLAGS.includes(flag)
  );
}

/* =========================
   Core Evaluation
   ========================= */

/**
 * Evaluate whether sandbox mode may be exited.
 *
 * @param {Object} params
 * @param {Object} params.contextState
 * @param {Object} params.sandboxMetrics
 * @param {Array<number>} params.dignityHistory
 * @param {Array<Object>} params.interactionLog
 * @param {Array<string>} params.activeFlags
 */
function evaluateSandboxExit({
  contextState,
  sandboxMetrics,
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

  /* ---- State-based checks ---- */

  if (sandboxMetrics.stableCycles < EXIT_REQUIREMENTS.MIN_STABLE_CYCLES) {
    reasons.push('Insufficient stable cycles');
  }

  if (sandboxMetrics.activeRiskScore > EXIT_REQUIREMENTS.MAX_ACTIVE_RISK_SCORE) {
    reasons.push('Residual risk score too high');
  }

  if (sandboxMetrics.hasActiveVeto === true) {
    reasons.push('Active persona or policy veto present');
  }

  if (sandboxMetrics.contextIntegrityOk !== true) {
    reasons.push('Context integrity not verified');
  }

  /* ---- History & flag-based checks ---- */

  if (!dignityIsStable(dignityHistory)) {
    reasons.push('Dignity metrics not yet stable');
  }

  if (!interactionIsStable(interactionLog)) {
    reasons.push('Interaction stability insufficient');
  }

  if (hasBlockingFlags(activeFlags)) {
    reasons.push('Blocking safety or manipulation flags present');
  }

  /* ---- Decision ---- */

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
    reason: 'All safety, dignity, and stability conditions satisfied',
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
