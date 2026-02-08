
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * ORI-GARDEN :: Global Dignity Invariant
 *
 * Civilization-level invariant enforcement layer.
 *
 * This contract DOES NOT verify ZK proofs directly.
 * It orchestrates trusted verifiers + invariant policy binding.
 */

interface IZKVerifier {
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external view returns (bool);
}

contract GlobalDignityInvariant {

    /* ============================================================
       ERRORS
    ============================================================ */

    error NotAuthorizedVerifier();
    error InvalidProof();
    error NullifierAlreadyUsed();
    error PolicyNotApproved();
    error EpochOutOfRange();
    error InvariantViolationFlagged();

    /* ============================================================
       GOVERNANCE
    ============================================================ */

    address public governor;

    modifier onlyGovernor() {
        require(msg.sender == governor, "not governor");
        _;
    }

    constructor(address _governor) {
        governor = _governor;
    }

    /* ============================================================
       GLOBAL STATE
    ============================================================ */

    mapping(address => bool) public approvedVerifiers;
    mapping(bytes32 => bool) public approvedPolicyHashes;
    mapping(bytes32 => bool) public usedNullifiers;

    uint256 public currentEpoch;
    bool public globalInvariantViolation;

    /* ============================================================
       EVENTS
    ============================================================ */

    event VerifierApproved(address verifier, bool status);
    event PolicyApproved(bytes32 policyHash, bool status);
    event NullifierConsumed(bytes32 nullifier);
    event EpochUpdated(uint256 epoch);
    event GlobalInvariantFlagged(bool status);

    event DignityProofAccepted(
        address indexed caller,
        address indexed verifier,
        bytes32 indexed nullifier,
        bytes32 policyHash,
        uint256 epoch
    );

    /* ============================================================
       GOVERNANCE CONTROLS
    ============================================================ */

    function setVerifier(address verifier, bool status)
        external
        onlyGovernor
    {
        approvedVerifiers[verifier] = status;
        emit VerifierApproved(verifier, status);
    }

    function setPolicy(bytes32 policyHash, bool status)
        external
        onlyGovernor
    {
        approvedPolicyHashes[policyHash] = status;
        emit PolicyApproved(policyHash, status);
    }

    function setEpoch(uint256 epoch)
        external
        onlyGovernor
    {
        currentEpoch = epoch;
        emit EpochUpdated(epoch);
    }

    function flagGlobalInvariant(bool status)
        external
        onlyGovernor
    {
        globalInvariantViolation = status;
        emit GlobalInvariantFlagged(status);
    }

    /* ============================================================
       CORE ENTRY
    ============================================================ */

    /**
     * Expected publicInputs layout (example):
     * [0] nullifier
     * [1] policyHash
     * [2] epoch
     */
    function submitDignityProof(
        address verifier,
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external {

        if (globalInvariantViolation) revert InvariantViolationFlagged();
        if (!approvedVerifiers[verifier]) revert NotAuthorizedVerifier();

        bytes32 nullifier = bytes32(publicInputs[0]);
        bytes32 policyHash = bytes32(publicInputs[1]);
        uint256 epoch = publicInputs[2];

        if (!approvedPolicyHashes[policyHash]) revert PolicyNotApproved();
        if (epoch != currentEpoch) revert EpochOutOfRange();
        if (usedNullifiers[nullifier]) revert NullifierAlreadyUsed();

        bool ok = IZKVerifier(verifier).verifyProof(proof, publicInputs);
        if (!ok) revert InvalidProof();

        usedNullifiers[nullifier] = true;

        emit NullifierConsumed(nullifier);

        emit DignityProofAccepted(
            msg.sender,
            verifier,
            nullifier,
            policyHash,
            epoch
        );
    }

    /* ============================================================
       VIEW HELPERS
    ============================================================ */

    function isNullifierUsed(bytes32 n) external view returns (bool) {
        return usedNullifiers[n];
    }

    function isPolicyApproved(bytes32 p) external view returns (bool) {
        return approvedPolicyHashes[p];
    }

    function isVerifierApproved(address v) external view returns (bool) {
        return approvedVerifiers[v];
    }
}
