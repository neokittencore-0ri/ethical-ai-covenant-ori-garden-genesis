
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * ORI-GARDEN :: Economic Flow ZK Verifier
 *
 * Verifies that an economic distribution followed covenant constraints
 * WITHOUT revealing internal accounting data.
 *
 * Example Proven Off-Chain:
 * - Allocation ratios correct
 * - Benevolence fund rules followed
 * - No unauthorized extraction
 * - Dignity floor respected (optional)
 */

interface IEconomicVerifier {
    function verifyProof(
        bytes calldata proof,
        bytes32[] calldata publicInputs
    ) external view returns (bool);
}

contract EconomicFlowZKVerifier {

    /* ============================================================
       EVENTS
    ============================================================ */

    event EconomicFlowVerified(
        bytes32 indexed flowCommitment,
        bytes32 indexed covenantHash,
        address indexed submitter,
        uint64 timestamp,
        bytes32 verifierId
    );

    /* ============================================================
       STORAGE
    ============================================================ */

    address public governance;
    address public verifier;

    /* ============================================================
       ERRORS
    ============================================================ */

    error Unauthorized();
    error InvalidProof();
    error VerifierNotSet();

    /* ============================================================
       MODIFIERS
    ============================================================ */

    modifier onlyGovernance() {
        if (msg.sender != governance) revert Unauthorized();
        _;
    }

    /* ============================================================
       CONSTRUCTOR
    ============================================================ */

    constructor(address _governance, address _verifier) {
        governance = _governance;
        verifier = _verifier;
    }

    /* ============================================================
       GOVERNANCE
    ============================================================ */

    function setVerifier(address _verifier)
        external
        onlyGovernance
    {
        verifier = _verifier;
    }

    /* ============================================================
       CORE VERIFY
    ============================================================ */

    /**
     * @param flowCommitment
     * Poseidon / Merkle commitment to full economic state
     *
     * @param covenantHash
     * Hash of economic covenant ruleset
     *
     * @param proof
     * ZK proof blob
     *
     * @param publicInputs
     * Expected layout example:
     * [0] flowCommitment
     * [1] covenantHash
     * [2] epoch
     * [3] totalValueCommitment
     */
    function verifyEconomicFlow(
        bytes32 flowCommitment,
        bytes32 covenantHash,
        bytes calldata proof,
        bytes32[] calldata publicInputs
    ) external {

        if (verifier == address(0)) revert VerifierNotSet();

        bool ok = IEconomicVerifier(verifier).verifyProof(
            proof,
            publicInputs
        );

        if (!ok) revert InvalidProof();

        // Optional sanity binding
        require(publicInputs.length >= 2, "Bad public input");

        require(
            publicInputs[0] == flowCommitment,
            "Commit mismatch"
        );

        require(
            publicInputs[1] == covenantHash,
            "Covenant mismatch"
        );

        emit EconomicFlowVerified(
            flowCommitment,
            covenantHash,
            msg.sender,
            uint64(block.timestamp),
            keccak256(abi.encodePacked(verifier))
        );
    }
}
