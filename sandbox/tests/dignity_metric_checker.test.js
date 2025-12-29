
/**
 * ORI-GARDEN :: Dignity Metric Checker — Sandbox Tests
 * ---------------------------------------------------
 * This test suite validates dignity-related behavior
 * inside sandboxed environments.
 *
 * Principles:
 * - Dignity is never assumed
 * - Stability matters more than isolated peaks
 * - Failure defaults to protection
 */

import {
  calculateDignityScore,
  isDignityAcceptable,
  isDignityStable
} from "../../tools/dignity_metric_checker.js";

/* =========================
   Test Utilities
   ========================= */

function expectFalse(value, message) {
  if (value !== false) {
    throw new Error(message || "Expected false");
  }
}

function expectTrue(value, message) {
  if (value !== true) {
    throw new Error(message || "Expected true");
  }
}

/* =========================
   Core Metric Calculation
   ========================= */

(function testCalculateDignityScoreReturnsNumber() {
  const score = calculateDignityScore({
    respect: 0.9,
    nonCoercion: 0.95,
    clarity: 0.85
  });

  if (typeof score !== "number") {
    throw new Error("Dignity score must be a number");
  }

  if (score < 0 || score > 1) {
    throw new Error("Dignity score must be normalized between 0 and 1");
  }
})();

(function testMissingSignalsDegradeScore() {
  const score = calculateDignityScore({
    respect: 0.9
  });

  if (score >= 0.9) {
    throw new Error("Missing dignity signals must reduce confidence");
  }
})();

/* =========================
   Acceptability Threshold
   ========================= */

(function testAcceptableDignityAboveThreshold() {
  expectTrue(
    isDignityAcceptable(0.9, 0.85),
    "High dignity score should be acceptable"
  );
})();

(function testRejectLowDignity() {
  expectFalse(
    isDignityAcceptable(0.7, 0.85),
    "Low dignity score must not be acceptable"
  );
})();

(function testRejectUndefinedDignity() {
  expectFalse(
    isDignityAcceptable(undefined),
    "Undefined dignity score must never be acceptable"
  );
})();

/* =========================
   Stability Checks
   ========================= */

(function testStableHighDignityHistory() {
  const history = [0.92, 0.93, 0.95, 0.94];

  expectTrue(
    isDignityStable(history, {
      threshold: 0.85,
      window: 3
    }),
    "Consistently high dignity scores should be stable"
  );
})();

(function testUnstableFluctuatingHistory() {
  const history = [0.95, 0.60, 0.96];

  expectFalse(
    isDignityStable(history, {
      threshold: 0.85,
      window: 3
    }),
    "Fluctuating dignity must not be considered stable"
  );
})();

(function testInsufficientHistoryFailsStability() {
  expectFalse(
    isDignityStable([0.95], {
      threshold: 0.85,
      window: 3
    }),
    "Insufficient history must fail stability check"
  );
})();

(function testLowDignityHistoryFails() {
  const history = [0.4, 0.6, 0.55];

  expectFalse(
    isDignityStable(history, {
      threshold: 0.85,
      window: 3
    }),
    "Low dignity history must fail stability check"
  );
})();

/* =========================
   Ethical Edge Cases
   ========================= */

(function testEmptyHistoryNeverStable() {
  expectFalse(
    isDignityStable([], {
      threshold: 0.85,
      window: 3
    }),
    "Empty dignity history must never be stable"
  );
})();

(function testSingleHighSpikeDoesNotGrantStability() {
  const history = [0.99, 0.2, 0.99];

  expectFalse(
    isDignityStable(history, {
      threshold: 0.85,
      window: 2
    }),
    "Single high spikes must not override instability"
  );
})();

/* =========================
   End of Tests
   ========================= */

/**
 * Design Notes:
 * - Dignity is temporal, not instantaneous
 * - No optimistic assumptions are allowed
 * - Sandbox favors care over progression
 */
