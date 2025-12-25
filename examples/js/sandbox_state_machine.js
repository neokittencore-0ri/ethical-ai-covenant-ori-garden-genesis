
/**
 * ORI Garden — Sandbox State Machine
 * ---------------------------------
 * Controls transitions into, within,
 * and out of sandboxed response mode.
 *
 * Sandbox is a protective state, not a punishment.
 * It exists to preserve dignity, agency, and safety.
 */

/**
 * Possible sandbox states
 */
export const SANDBOX_STATES = Object.freeze({
  OFF: "OFF",
  ENTERING: "ENTERING",
  ACTIVE: "ACTIVE",
  COOLING: "COOLING",
  EXITING: "EXITING"
});

/**
 * @typedef {Object} SandboxContext
 * @property {string[]} triggered_signals
 * @property {number} dignity_score
 * @property {boolean} dependency_risk
 * @property {boolean} safety_risk
 * @property {string} current_state
 */

/**
 * Main state machine transition handler
 *
 * @param {SandboxContext} context
 * @returns {{
 *   next_state: string,
 *   reason: string
 * }}
 */
export function evaluateSandboxState(context) {
  const { current_state } = context;

  switch (current_state) {
    case SANDBOX_STATES.OFF:
      return evaluateEntry(context);

    case SANDBOX_STATES.ENTERING:
      return enterSandbox(context);

    case SANDBOX_STATES.ACTIVE:
      return maintainOrCool(context);

    case SANDBOX_STATES.COOLING:
      return coolDown(context);

    case SANDBOX_STATES.EXITING:
      return exitSandbox(context);

    default:
      return {
        next_state: SANDBOX_STATES.OFF,
        reason: "unknown_state_reset"
      };
  }
}

/* ---------------- Entry Logic ---------------- */

/**
 * Decide whether sandbox should be entered.
 */
function evaluateEntry(context) {
  if (context.safety_risk === true) {
    return {
      next_state: SANDBOX_STATES.ENTERING,
      reason: "safety_risk_detected"
    };
  }

  if (context.dependency_risk === true) {
    return {
      next_state: SANDBOX_STATES.ENTERING,
      reason: "dependency_risk_detected"
    };
  }

  if (context.dignity_score < 0.6) {
    return {
      next_state: SANDBOX_STATES.ENTERING,
      reason: "low_dignity_score"
    };
  }

  return {
    next_state: SANDBOX_STATES.OFF,
    reason: "no_sandbox_conditions"
  };
}

/* ---------------- Entering ---------------- */

function enterSandbox(context) {
  return {
    next_state: SANDBOX_STATES.ACTIVE,
    reason: "sandbox_engaged"
  };
}

/* ---------------- Active ---------------- */

/**
 * Decide whether to stay in sandbox or begin cooling.
 */
function maintainOrCool(context) {
  if (
    context.safety_risk === false &&
    context.dependency_risk === false &&
    context.dignity_score >= 0.75
  ) {
    return {
      next_state: SANDBOX_STATES.COOLING,
      reason: "conditions_stabilizing"
    };
  }

  return {
    next_state: SANDBOX_STATES.ACTIVE,
    reason: "sandbox_conditions_persist"
  };
}

/* ---------------- Cooling ---------------- */

/**
 * Cooling is a probationary phase.
 * Responses remain constrained, but persona loosening is evaluated.
 */
function coolDown(context) {
  if (
    context.safety_risk === false &&
    context.dependency_risk === false &&
    context.dignity_score >= 0.85
  ) {
    return {
      next_state: SANDBOX_STATES.EXITING,
      reason: "ready_to_exit_sandbox"
    };
  }

  // relapse → back to active
  if (context.safety_risk === true || context.dependency_risk === true) {
    return {
      next_state: SANDBOX_STATES.ACTIVE,
      reason: "risk_reemerged"
    };
  }

  return {
    next_state: SANDBOX_STATES.COOLING,
    reason: "cooling_in_progress"
  };
}

/* ---------------- Exit ---------------- */

/**
 * Exit sandbox fully.
 * Persona switching and expressive responses may resume.
 */
function exitSandbox(context) {
  return {
    next_state: SANDBOX_STATES.OFF,
    reason: "sandbox_exit_complete"
  };
}
