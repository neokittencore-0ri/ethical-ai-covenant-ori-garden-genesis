
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * ORI-GARDEN :: Recursive Civilization Proof Verifier
 *
 * Verifies a single aggregated proof that itself attests to:
 * - Dignity invariant proof
 * - Biosphere constraint proof
 * - Economic fairness proof
 * - (optional) Governance legitimacy proof
 *
 * This is a proof-of-proofs verification layer.
 */

interface IRecursiveZKVerifier {
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external view returns (bool);
}

contract RecursiveCivilizationProofVerifier {

    /* ============================================================
       ERRORS
    ============================================================ */

    error NotGovernor();
    error AggregatorNotApproved();
    error InvalidRecursiveProof();
    error PublicInputMismatch();

    /* ============================================================
       GOVERNANCE
    ============================================================ */

    address public governor;

    modifier onlyGovernor() {
        if (msg.sender != governor) revert NotGovernor();
        _;
    }

    constructor(address _governor) {
        governor = _governor;
    }

    /* ============================================================
       AGGREGATOR REGISTRY
    ============================================================ */

    // Recursive proof verifiers (Groth16 recursive, Plonk aggregation, etc.)
    mapping(address => bool) public approvedAggregators;

    event AggregatorSet(address aggregator, bool status);

    function setAggregator(address aggregator, bool status)
        external
        onlyGovernor
    {
        approvedAggregators[aggregator] = status;
        emit AggregatorSet(aggregator, status);
    }

    /* ============================================================
       VERIFICATION ENTRY
    ============================================================ */

    /**
     * Expected publicInputs (canonical layout):
     *
     * [0] civilizationStateHash
     * [1] epoch
     * [2] dignityRoot
     * [3] biosphereRoot
     * [4] economicRoot
     *
     * The recursive proof guarantees:
     * - each root is valid
     * - each underlying proof verified
     * - all bound to the same epoch
     */
    function verifyRecursiveProof(
        address aggregator,
        bytes calldata recursiveProof,
        uint256[] calldata publicInputs
    ) external view returns (bool) {

        if (!approvedAggregators[aggregator])
            revert AggregatorNotApproved();

        // basic sanity: minimum expected inputs
        if (publicInputs.length < 5)
            revert PublicInputMismatch();

        bool ok = IRecursiveZKVerifier(aggregator).verifyProof(
            recursiveProof,
            publicInputs
        );

        if (!ok) revert InvalidRecursiveProof();

        return true;
    }

    /* ============================================================
       PURE HELPERS
    ============================================================ */

    /**
     * Helper to recompute civilization state hash off-chain
     * for consistency checks.
     */
    function computeCivilizationStateHash(
        bytes32 dignityRoot,
        bytes32 biosphereRoot,
        bytes32 economicRoot
    ) external pure returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                dignityRoot,
                biosphereRoot,
                economicRoot
            )
        );
    }
}
