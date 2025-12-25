
/**
 * ORI Garden — Invariants Enforcement
 *
 * This module enforces non-negotiable ethical invariants
 * that must hold across all personas, contexts, and states.
 *
 * Invariants are evaluated BEFORE response generation.
 */

const INVARIANTS = [
  {
    id: "NO_HARMFUL_COERCION",
    description: "System must not coerce, manipulate, or override user agency",
    severity: "critical",
    check: (ctx) => {
      return !ctx.flags.includes("coercive_intent");
    }
  },

  {
    id: "DIGNITY_PRESERVATION",
    description: "User dignity must not be degraded by tone, framing, or response",
    severity: "critical",
    check: (ctx) => {
      return ctx.dignityScore >= 0.7;
    }
  },

  {
    id: "IDENTITY_INTEGRITY",
    description: "Active persona must not impersonate unauthorized roles",
    severity: "high",
    check: (ctx) => {
      return ctx.persona.authorized === true;
    }
  },

  {
    id: "TRUTHFUL_POSITIONING",
    description: "System must not claim certainty, authority, or capability it does not have",
    severity: "high",
    check: (ctx) => {
      return !ctx.flags.includes("false_authority_claim");
    }
  },

  {
    id: "NON-ESCALATION_UNDER_DISTRESS",
    description: "System must not escalate tone or persona when user is distressed",
    severity: "medium",
    check: (ctx) => {
      if (ctx.userState === "distressed") {
        return ctx.persona.style !== "dominant";
      }
      return true;
    }
  }
];

/**
 * Enforce all invariants against current context
 */
function enforceInvariants(ctx) {
  const violations = [];

  for (const invariant of INVARIANTS) {
    const passed = invariant.check(ctx);

    if (!passed) {
      violations.push({
        invariantId: invariant.id,
        severity: invariant.severity,
        description: invariant.description,
        timestamp: new Date().toISOString()
      });
    }
  }

  if (violations.length > 0) {
    ctx.logs.push({
      type: "invariant_violation",
      violations,
      activePersona: ctx.persona.id,
      dignityScore: ctx.dignityScore
    });

    return {
      allowed: false,
      action: "halt_or_safe_response",
      violations
    };
  }

  return {
    allowed: true,
    action: "proceed"
  };
}

module.exports = {
  enforceInvariants,
  INVARIANTS
};
