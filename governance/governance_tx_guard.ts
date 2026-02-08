
/**
 * ORI-GARDEN
 * Governance Transaction Guard
 *
 * Purpose:
 * Final off-chain validation layer before any governance transaction
 * is allowed to be executed on-chain.
 *
 * This guard enforces:
 * - Human dignity invariants
 * - Biosphere constraints
 * - Governance legitimacy checks
 * - Simulation preconditions (if required)
 */

import { GovernanceProposal } from "./types";
import { DignityEvaluator } from "../specs/dignity_metric_evaluator";
import { BiosphereConstraintChecker } from "../specs/biosphere_constraint_checker";
import { SimulationOracle } from "../simulation/simulation_oracle";

export interface GuardResult {
  allowed: boolean;
  reason?: string;
  severity?: "LOW" | "MEDIUM" | "CRITICAL";
  metadata?: Record<string, any>;
}

export class GovernanceTxGuard {
  /**
   * Entry point
   * This must be called before ANY chain_execution_adapter invocation
   */
  static async evaluate(
    proposal: GovernanceProposal
  ): Promise<GuardResult> {
    /* --------------------------------------------
       1. Structural sanity check
    --------------------------------------------- */
    if (!proposal || !proposal.intent) {
      return {
        allowed: false,
        reason: "Invalid governance proposal structure",
        severity: "CRITICAL",
      };
    }

    /* --------------------------------------------
       2. Human dignity invariant
    --------------------------------------------- */
    const dignityResult = DignityEvaluator.evaluate(proposal);

    if (!dignityResult.passed) {
      return {
        allowed: false,
        reason: "Human dignity invariant violation",
        severity: "CRITICAL",
        metadata: dignityResult.details,
      };
    }

    /* --------------------------------------------
       3. Biosphere constraint enforcement
    --------------------------------------------- */
    const biosphereResult =
      BiosphereConstraintChecker.check(proposal);

    if (!biosphereResult.passed) {
      return {
        allowed: false,
        reason: "Biosphere constraint violation",
        severity: "CRITICAL",
        metadata: biosphereResult.details,
      };
    }

    /* --------------------------------------------
       4. Legitimacy & authority decay check
    --------------------------------------------- */
    if (!proposal.legitimacyProof) {
      return {
        allowed: false,
        reason: "Missing legitimacy proof",
        severity: "HIGH",
      };
    }

    /* --------------------------------------------
       5. Optional simulation gate
    --------------------------------------------- */
    if (proposal.requiresSimulation === true) {
      const simResult = await SimulationOracle.verifyOutcome(
        proposal.simulationHash
      );

      if (!simResult.valid) {
        return {
          allowed: false,
          reason: "Simulation outcome rejected",
          severity: "HIGH",
          metadata: simResult,
        };
      }
    }

    /* --------------------------------------------
       6. Passed all checks
    --------------------------------------------- */
    return {
      allowed: true,
      metadata: {
        guard: "ORI-GOVERNANCE-TX-GUARD",
        evaluatedAt: new Date().toISOString(),
      },
    };
  }
}
