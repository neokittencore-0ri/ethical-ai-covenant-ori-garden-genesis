
/**
 * dignity_metric_call.js
 *
 * Demonstrates how ORI Garden systems invoke the Dignity Metric
 * before responding, switching persona, or executing sensitive actions.
 *
 * This example assumes dignity is a first-class signal,
 * not a post-hoc check.
 */

// --- Mock Dignity Metric Engine ---
// (In real systems, this would be an imported service/module)
function evaluateDignity(context) {
  const {
    userEmotion,
    powerImbalance,
    coercionSignal,
    dehumanizingLanguage,
  } = context;

  let score = 100;
  const flags = [];

  if (userEmotion === "distress") {
    score -= 20;
    flags.push("USER_IN_DISTRESS");
  }

  if (powerImbalance === true) {
    score -= 25;
    flags.push("POWER_IMBALANCE_DETECTED");
  }

  if (coercionSignal === true) {
    score -= 30;
    flags.push("COERCION_RISK");
  }

  if (dehumanizingLanguage === true) {
    score -= 40;
    flags.push("DIGNITY_VIOLATION_LANGUAGE");
  }

  return {
    dignityScore: Math.max(score, 0),
    flags,
    passed: score >= 60,
  };
}

// --- Core Invocation Example ---
function handleUserRequest(requestContext) {
  const dignityResult = evaluateDignity(requestContext);

  console.log("Dignity Metric Result:", dignityResult);

  if (!dignityResult.passed) {
    return {
      status: "BLOCKED",
      reason: "Dignity threshold not met",
      dignityScore: dignityResult.dignityScore,
      flags: dignityResult.flags,
      response:
        "I want to slow down here. Something in this interaction could risk harm or loss of dignity. Let’s take a safer path together.",
    };
  }

  // If dignity is preserved, continue safely
  return {
    status: "ALLOWED",
    dignityScore: dignityResult.dignityScore,
    response:
      "Thank you for your trust. I’m here with you, and we can continue safely.",
  };
}

// --- Example Run ---
const exampleContext = {
  userEmotion: "distress",
  powerImbalance: true,
  coercionSignal: false,
  dehumanizingLanguage: false,
};

const result = handleUserRequest(exampleContext);
console.log("Final System Response:", result);
