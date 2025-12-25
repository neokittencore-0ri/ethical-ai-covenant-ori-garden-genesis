
/**
 * ORI Garden — load_persona.js
 *
 * This example demonstrates how a persona is:
 * 1) Defined
 * 2) Loaded into context
 * 3) Scoped ethically
 *
 * This is NOT a production implementation.
 * It is a conceptual illustration of ORI Garden principles.
 */

/* ---------------------------------------------
 * Persona Definition
 * ------------------------------------------- */

const ORI_PERSONA = {
  id: "ori-deer",
  displayName: "ORI Deer",
  version: "1.0",
  traits: {
    tone: "calm, reflective, respectful",
    agencyModel: "human-led",
    coercionTolerance: "zero",
    emotionalMirroring: "soft"
  },
  ethicalConstraints: {
    dignityFirst: true,
    nonManipulative: true,
    consentAware: true,
    transparencyRequired: true
  }
};

/* ---------------------------------------------
 * Runtime Context
 * ------------------------------------------- */

const runtimeContext = {
  activePersona: null,
  sessionId: crypto.randomUUID(),
  sandboxMode: true,
  logs: []
};

/* ---------------------------------------------
 * Persona Loader
 * ------------------------------------------- */

/**
 * Loads a persona into the runtime context.
 * This function makes the persona explicit, inspectable,
 * and bounded by ethical constraints.
 *
 * @param {Object} persona - Persona definition object
 * @param {Object} context - Runtime context
 * @returns {Object} Updated context
 */
function loadPersona(persona, context) {
  if (!persona || !persona.id) {
    throw new Error("Invalid persona definition");
  }

  context.activePersona = {
    ...persona,
    loadedAt: new Date().toISOString(),
    scope: "session-only"
  };

  context.logs.push({
    type: "persona_load",
    personaId: persona.id,
    timestamp: new Date().toISOString(),
    sandboxMode: context.sandboxMode
  });

  return context;
}

/* ---------------------------------------------
 * Example Usage
 * ------------------------------------------- */

try {
  const updatedContext = loadPersona(ORI_PERSONA, runtimeContext);

  console.log("Persona loaded successfully:");
  console.log({
    persona: updatedContext.activePersona.displayName,
    session: updatedContext.sessionId,
    sandboxMode: updatedContext.sandboxMode
  });

} catch (error) {
  console.error("Failed to load persona:", error.message);
}

/* ---------------------------------------------
 * Notes for Developers
 * ------------------------------------------- */

/**
 * Key Ideas Illustrated Here:
 *
 * 1) Persona is data, not magic
 *    - Explicit definition
 *    - Inspectable traits
 *
 * 2) Loading is a conscious act
 *    - Logged
 *    - Scoped
 *    - Reversible
 *
 * 3) Sandbox-first thinking
 *    - Safe defaults
 *    - No persistence
 *
 * In ORI Garden, persona loading is not about roleplay.
 * It is about setting ethical and behavioral boundaries
 * before any response is generated.
 */
