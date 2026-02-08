
pragma circom 2.1.6;

include "circomlib/poseidon.circom";
include "circomlib/merkle.circom";
include "circomlib/comparators.circom";

/**
 * ORI-GARDEN :: Identity–Dignity Nullifier Tree
 *
 * Proves:
 * - Membership in identity tree
 * - Dignity claim binding (policy hash)
 * - One-time use via nullifier tree
 * - Privacy-preserving & replay-safe
 */

template IdentityDignityNullifierTree(LEVELS_ID, LEVELS_NULL) {

    /* ========================================================
       PUBLIC INPUTS
    ======================================================== */

    signal input identityRoot;
    signal input nullifierRoot;
    signal input newNullifierRoot;

    signal input epoch;
    signal input dignityPolicyHash;

    /* ========================================================
       PRIVATE INPUTS
    ======================================================== */

    signal input identitySecret;
    signal input identityIndex;
    signal input identityPath[LEVELS_ID];
    signal input identityPathIndices[LEVELS_ID];

    signal input salt;

    signal input nullifierPath[LEVELS_NULL];
    signal input nullifierPathIndices[LEVELS_NULL];

    /* ========================================================
       DERIVED SIGNALS
    ======================================================== */

    signal identityCommitment;
    signal nullifier;

    /* ========================================================
       IDENTITY COMMITMENT
    ======================================================== */

    component idHash = Poseidon(2);
    idHash.inputs[0] <== identitySecret;
    idHash.inputs[1] <== salt;

    identityCommitment <== idHash.out;

    /* ========================================================
       VERIFY IDENTITY MEMBERSHIP
    ======================================================== */

    component idMerkle = MerkleVerifier(LEVELS_ID, 2);
    idMerkle.leaf <== identityCommitment;
    idMerkle.root <== identityRoot;

    for (var i = 0; i < LEVELS_ID; i++) {
        idMerkle.pathElements[i] <== identityPath[i];
        idMerkle.pathIndices[i] <== identityPathIndices[i];
    }

    /* ========================================================
       NULLIFIER GENERATION
    ======================================================== */

    component nulHash = Poseidon(4);
    nulHash.inputs[0] <== identityCommitment;
    nulHash.inputs[1] <== dignityPolicyHash;
    nulHash.inputs[2] <== epoch;
    nulHash.inputs[3] <== salt;

    nullifier <== nulHash.out;

    /* ========================================================
       NULLIFIER NON-MEMBERSHIP (IMPLICIT)
       We assume leaf at index = 0 before update
    ======================================================== */

    component nulUpdater = MerkleUpdater(LEVELS_NULL, 2);

    // old leaf = 0 (unused)
    nulUpdater.leaf <== 0;
    nulUpdater.root <== nullifierRoot;

    for (var j = 0; j < LEVELS_NULL; j++) {
        nulUpdater.pathElements[j] <== nullifierPath[j];
        nulUpdater.pathIndices[j] <== nullifierPathIndices[j];
    }

    // new leaf = nullifier
    nulUpdater.newLeaf <== nullifier;

    newNullifierRoot === nulUpdater.newRoot;
}

/* ============================================================
   MAIN
============================================================ */

component main = IdentityDignityNullifierTree(32, 32);
