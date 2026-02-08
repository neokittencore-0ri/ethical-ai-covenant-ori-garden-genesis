
pragma circom 2.1.6;

/**
 * ORI-GARDEN :: Economic Flow Constraint Circuit
 *
 * Proves that an economic distribution followed covenant rules
 * without revealing internal accounting numbers.
 */

include "circomlib/comparators.circom";
include "circomlib/poseidon.circom";

/* ============================================================
   BASIS POINT CONSTANT
============================================================ */

template MulBps() {
    signal input value;
    signal input bps;     // basis points (0 - 10000)
    signal output out;

    // out = value * bps
    out <== value * bps;
}

/* ============================================================
   ECONOMIC FLOW CHECK
============================================================ */

template EconomicFlowCheck(N) {

    /* --------------------------------------------------------
       PUBLIC INPUTS
    -------------------------------------------------------- */

    signal input flowCommitment;
    signal input covenantHash;

    signal input benevolenceMinBps;
    signal input originatorMaxBps;
    signal input systemMinBps;

    /* --------------------------------------------------------
       PRIVATE INPUTS
    -------------------------------------------------------- */

    signal input allocations[N]; // values
    signal input totalValue;
    signal input salt;

    // index mapping (private, flexible covenant layout)
    signal input benevolenceIndex;
    signal input originatorIndex;
    signal input systemIndex;

    /* --------------------------------------------------------
       OUTPUT
    -------------------------------------------------------- */

    signal output isValid;

    /* ========================================================
       CONSERVATION CHECK
    ======================================================== */

    signal sum;
    sum <== 0;

    for (var i = 0; i < N; i++) {
        sum <== sum + allocations[i];
    }

    signal sumOk;
    sumOk <== sum === totalValue;

    /* ========================================================
       THRESHOLD CHECKS
    ======================================================== */

    component beneMul = MulBps();
    beneMul.value <== totalValue;
    beneMul.bps <== benevolenceMinBps;

    component origMul = MulBps();
    origMul.value <== totalValue;
    origMul.bps <== originatorMaxBps;

    component sysMul = MulBps();
    sysMul.value <== totalValue;
    sysMul.bps <== systemMinBps;

    component beneCmp = GreaterEqThan(252);
    component origCmp = LessEqThan(252);
    component sysCmp = GreaterEqThan(252);

    beneCmp.in[0] <== allocations[benevolenceIndex];
    beneCmp.in[1] <== beneMul.out;

    origCmp.in[0] <== allocations[originatorIndex];
    origCmp.in[1] <== origMul.out;

    sysCmp.in[0] <== allocations[systemIndex];
    sysCmp.in[1] <== sysMul.out;

    /* ========================================================
       FINAL VALIDITY
    ======================================================== */

    signal thresholdsOk;
    thresholdsOk <== beneCmp.out * origCmp.out * sysCmp.out;

    isValid <== thresholdsOk * sumOk;

    /* ========================================================
       COMMITMENT BINDING
    ======================================================== */

    component hasher = Poseidon(N + 5);

    var idx = 0;

    for (var i = 0; i < N; i++) {
        hasher.inputs[idx] <== allocations[i];
        idx++;
    }

    hasher.inputs[idx] <== totalValue; idx++;
    hasher.inputs[idx] <== covenantHash; idx++;
    hasher.inputs[idx] <== salt; idx++;
    hasher.inputs[idx] <== isValid; idx++;

    // final bind
    hasher.out === flowCommitment;
}

/* ============================================================
   MAIN CONFIG
============================================================ */

component main = EconomicFlowCheck(8);
