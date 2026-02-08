
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * ORI-GARDEN :: ZK Proof Anchor Verifier
 *
 * Purpose:
 * Verify zero-knowledge proofs that justify an anchor
 * WITHOUT revealing sensitive data.
 *
 * Examples:
 * - Governance decision respected dignity constraints
 * - Economic allocation followed covenant rules
 * - Simulation outcome stayed within biosphere limits
 *
 * This contract DOES NOT store truth.
 * It only verifies proof validity and emits an event.
 */

interface IVerifier {
    function verifyProof(
        bytes calldata proof,
        bytes32[] calldata publicInputs
    ) external view returns (bool);
}

contract ZKProofAnchorVerifier {

    /* ============================================================
       EVENTS
    ============================================================ */

    event ZKAnchorVerified(
        bytes32 indexed anchorHash,
        bytes32 indexed proofType,
        address indexed submitter,
        uint64 timestamp,
        bytes32 verifierId
    );

    /* ============================================================
       STORAGE (MINIMAL, GOVERNANCE-OWNED)
    ============================================================ */

    /// proofType => verifier contract
    mapping(bytes32 => address) public verifiers;

    address public governance;

    /* ============================================================
       ERRORS
    ============================================================ */

    error Unauthorized();
    error UnknownProofType();
    error InvalidProof();

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

    constructor(address _governance) {
        governance = _governance;
    }

    /* ============================================================
       GOVERNANCE FUNCTIONS
    ============================================================ */

    /**
     * Register or update a verifier for a proof type
     *
     * proofType examples:
     * - keccak256("DIGNITY_PROOF")
     * - keccak256("ECONOMIC_FLOW_PROOF")
     * - keccak256("SIMULATION_SAFETY_PROOF")
     */
    function setVerifier(
        bytes32 proofType,
        address verifier
    ) external onlyGovernance {
        verifiers[proofType] = verifier;
    }

    /* ============================================================
       CORE VERIFICATION
    ============================================================ */

    function verifyAndAnchor(
        bytes32 anchorHash,
        bytes32 proofType,
        bytes calldata proof,
        bytes32[] calldata publicInputs
    ) external {
        address verifier = verifiers[proofType];
        if (verifier == address(0)) revert UnknownProofType();

        bool ok = IVerifier(verifier).verifyProof(
            proof,
            publicInputs
        );

        if (!ok) revert InvalidProof();

        emit ZKAnchorVerified(
            anchorHash,
            proofType,
            msg.sender,
            uint64(block.timestamp),
            keccak256(abi.encodePacked(verifier))
        );
    }
}
