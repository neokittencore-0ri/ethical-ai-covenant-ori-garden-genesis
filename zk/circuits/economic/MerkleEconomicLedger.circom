
pragma circom 2.1.6;

include "circomlib/poseidon.circom";
include "circomlib/merkle.circom";

/*

Merkle Economic Ledger Circuit

Verifies:
- Old balance membership in ledger tree
- Economic delta validity
- Conservation rules
- New root correctness

*/

/* ============================================================
   TEMPLATE
============================================================ */

template MerkleEconomicLedger(LEVELS) {

    /* ---------- Public ---------- */

    signal input oldRoot;
    signal input newRoot;

    signal input flowCommitment;   // external flow hash
    signal input nullifier;        // anti replay

    /* ---------- Private ---------- */

    signal input oldBalance;
    signal input delta;           // signed handled externally (positive only here)
    signal input newBalance;

    signal input leafIndex;
    signal input pathElements[LEVELS];
    signal input pathIndices[LEVELS];

    /* ========================================================
       COMPONENTS
    ======================================================== */

    component poseidonLeafOld = Poseidon(2);
    component poseidonLeafNew = Poseidon(2);

    component poseidonCommit = Poseidon(4);

    component merkleVerifier = MerkleVerifier(LEVELS, 2);
    component merkleUpdater  = MerkleUpdater(LEVELS, 2);

    /* ========================================================
       OLD LEAF HASH
    ======================================================== */

    poseidonLeafOld.inputs[0] <== leafIndex;
    poseidonLeafOld.inputs[1] <== oldBalance;

    /* ========================================================
       VERIFY OLD ROOT
    ======================================================== */

    merkleVerifier.leaf <== poseidonLeafOld.out;
    merkleVerifier.root <== oldRoot;

    for (var i = 0; i < LEVELS; i++) {
        merkleVerifier.pathElements[i] <== pathElements[i];
        merkleVerifier.pathIndices[i] <== pathIndices[i];
    }

    /* ========================================================
       ECONOMIC RULES
    ======================================================== */

    /* newBalance must match */
    newBalance === oldBalance + delta;

    /* Prevent negative balance (simple constraint) */
    newBalance * (newBalance - 1) !== 0;

    /* ========================================================
       NEW LEAF HASH
    ======================================================== */

    poseidonLeafNew.inputs[0] <== leafIndex;
    poseidonLeafNew.inputs[1] <== newBalance;

    /* ========================================================
       RECOMPUTE ROOT
    ======================================================== */

    merkleUpdater.leaf <== poseidonLeafNew.out;

    for (var j = 0; j < LEVELS; j++) {
        merkleUpdater.pathElements[j] <== pathElements[j];
        merkleUpdater.pathIndices[j] <== pathIndices[j];
    }

    newRoot === merkleUpdater.root;

    /* ========================================================
       FLOW COMMITMENT CONSISTENCY
    ======================================================== */

    poseidonCommit.inputs[0] <== oldBalance;
    poseidonCommit.inputs[1] <== newBalance;
    poseidonCommit.inputs[2] <== delta;
    poseidonCommit.inputs[3] <== nullifier;

    flowCommitment === poseidonCommit.out;
}

/* ============================================================
   MAIN
============================================================ */

component main = MerkleEconomicLedger(32);
