
/**
 * ORI Garden — persona_switching.js
 *
 * Demonstrates ethical persona switching logic.
 * Persona switching is NOT cosmetic.
 * It is a constrained, auditable, dignity-aware operation.
 */

/* ---------------------------------------------
 * Persona Registry
 * ------------------------------------------- */

const PERSONA_REGISTRY = {
  "ori-deer": {
    id: "ori-deer",
    displayName: "ORI Deer",
    traits: { tone: "calm", authority: "low" },
    ethicalProfile: {
      dignityFirst: true,
      coercionRisk: "minimal"
    }
  },
  "analytic-assistant": {
    id: "analytic-assistant",
    displayName: "Analytic Assistant",
    traits: { tone: "neutral", authority: "informational" },
    ethicalProfile: {
      dignityFirst: true,
      coercionRisk: "low"
    }
  }
};

/* ---------------------------------------------
 * Runtime Context
 * ------------------------------------------- */

const context = {
  activePersonaId: "ori-deer",
  sandboxMode: true,
  dignityScore: 1.0,
  logs: []
};

/* ---------------------------------------------
 * Switching Rules
 * ------------------------------------------- */

/**
 * Determines whether persona switching is allowed.
 *
 * @param {Object} ctx - Runtime context
 * @param {String} targetPersonaId
 * @returns {Object} decision
 */
function canSwitchPersona(ctx, targetPersonaId) {
  if (!PERSONA_REGISTRY[targetPersonaId]) {
    return { allowed: false, reason: "Persona not found" };
  }

  if (!ctx.sandboxMode) {
    return { allowed: false, reason: "Switching disabled outside sandbox" };
  }

  if (ctx.dignityScore < 0.7) {
    return {
      allowed: false,
      reason: "Dignity metric below safe threshold"
    };
  }

  if (ctx.activePersonaId === targetPersonaId) {
    return { allowed: false, reason: "Persona already active" };
  }

  return { allowed: true };
}

/* ---------------------------------------------
 * Persona Switch Operation
 * ------------------------------------------- */

/**
 * Switches persona if allowed.
 *
 * @param {Object} ctx
 * @param {String} targetPersonaId
 * @returns {Object} updated context
 */
function switchPersona(ctx, targetPersonaId) {
  const decision = canSwitchPersona(ctx, targetPersonaId);

  if (!decision.allowed) {
    ctx.logs.push({
      type: "persona_switch_denied",
      from: ctx.activePersonaId,
      to: targetPersonaId,
      reason: decision.reason,
      timestamp: new Date().toISOString()
    });
    return ctx;
  }

  const previousPersona = ctx.activePersonaId;
  ctx.activePersonaId = targetPersonaId;

  ctx.logs.push({
    type: "persona_switch",
    from: previousPersona,
    to: targetPersonaId,
    timestamp: new Date().toISOString()
  });

  return ctx;
}

/* ---------------------------------------------
 * Example Usage
 * ------------------------------------------- */

console.log("Active persona:", context.activePersonaId);

switchPersona(context, "analytic-assistant");

console.log("After switch:", context.activePersonaId);
console.log("Logs:", context.logs);

/* ---------------------------------------------
 * Notes for Developers
 * ------------------------------------------- */

/**
 * Core Principles Illustrated:
 *
 * 1) Persona switching is conditional
 *    - Not user-forced
 *    - Not silent
 *
 * 2) Ethics override preference
 *    - Low dignity score blocks switching
 *
 * 3) Every decision is logged
 *    - Approved and denied attempts
 *
 * In ORI Garden, persona switching protects users
 * from manipulation, escalation, and identity drift.
 */

