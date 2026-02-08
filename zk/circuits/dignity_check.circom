
pragma circom 2.1.6;

/**
 * ORI-GARDEN :: Dignity Constraint Circuit
 *
 * Purpose:
 * Prove that an action / allocation respects dignity invariants
 * without revealing sensitive internal data.
 *
 * Compatible with:
 * - Groth16
 * - Plonk (with wrapper)
 *
 * Inputs Philosophy:
 * Public:
 *   - commitment root
 *   - global thresholds
 *
 * Private:
 *   - individual dignity scores
 *   - harm metrics
 */

include "circomlib/comparators.circom";
include "circomlib/poseidon.circom";

/* ============================================================
   CONFIG
============================================================ */

template DignityCheck(N) {

    /* --------------------------------------------------------
       PUBLIC INPUTS
    -------------------------------------------------------- */

    // commitment to internal state (Merkle root / Poseidon commitment)
    signal input stateCommitment;

    // minimum dignity allowed
    signal input dignityMinThreshold;

    // maximum harm allowed
    signal input harmMaxThreshold;

    /* --------------------------------------------------------
       PRIVATE INPUTS
    -------------------------------------------------------- */

    // dignity score per entity
    signal input dignityScores[N];

    // harm score per entity
    signal input harmScores[N];

    // salt for commitment binding
    signal input salt;

    /* --------------------------------------------------------
       OUTPUT
    -------------------------------------------------------- */

    signal output isValid;

    /* ========================================================
       CHECKS
    ======================================================== */

    component dignityCmp[N];
    component harmCmp[N];

    signal dignityOk[N];
    signal harmOk[N];

    for (var i = 0; i < N; i++) {

        // dignityScores[i] >= dignityMinThreshold
        dignityCmp[i] = GreaterEqThan(252);
        dignityCmp[i].in[0] <== dignityScores[i];
        dignityCmp[i].in[1] <== dignityMinThreshold;

        dignityOk[i] <== dignityCmp[i].out;

        // harmScores[i] <= harmMaxThreshold
        harmCmp[i] = LessEqThan(252);
        harmCmp[i].in[0] <== harmScores[i];
        harmCmp[i].in[1] <== harmMaxThreshold;

        harmOk[i] <== harmCmp[i].out;
    }

    /* ========================================================
       AGGREGATE VALIDITY
    ======================================================== */

    signal allDignityOk;
    signal allHarmOk;

    allDignityOk <== 1;
    allHarmOk <== 1;

    for (var i = 0; i < N; i++) {
        allDignityOk <== allDignityOk * dignityOk[i];
        allHarmOk <== allHarmOk * harmOk[i];
    }

    isValid <== allDignityOk * allHarmOk;

    /* ========================================================
       COMMITMENT BINDING
    ======================================================== */

    component hasher = Poseidon(2*N + 2);

    var idx = 0;

    for (var i = 0; i < N; i++) {
        hasher.inputs[idx] <== dignityScores[i];
        idx++;
    }

    for (var i = 0; i < N; i++) {
        hasher.inputs[idx] <== harmScores[i];
        idx++;
    }

    hasher.inputs[idx] <== salt;
    idx++;

    hasher.inputs[idx] <== isValid;

    hasher.out === stateCommitment;
}

/* ============================================================
   MAIN
============================================================ */

component main = DignityCheck(8);
