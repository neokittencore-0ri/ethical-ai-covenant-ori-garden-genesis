
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * ORI-GARDEN :: Civilization State Invariant Kernel
 *
 * Aggregates multi-domain invariants:
 * - Human Dignity
 * - Biosphere Survival Constraints
 * - Economic Fairness Constraints
 *
 * Acts as civilization-level execution gate.
 */

interface ICivilizationZKVerifier {
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external view returns (bool);
}

contract CivilizationStateInvariant {

    /* ============================================================
       ERRORS
    ============================================================ */

    error NotGovernor();
    error VerifierNotApproved();
    error PolicyNotApproved();
    error EpochMismatch();
    error NullifierUsed();
    error ProofInvalid();
    error CivilizationHalted();
    error CivilizationStateHashMismatch();

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
       APPROVAL REGISTRIES
    ============================================================ */

    mapping(address => bool) public approvedVerifiers;
    mapping(bytes32 => bool) public approvedPolicyHashes;
    mapping(bytes32 => bool) public consumedNullifiers;

    /* ============================================================
       CIVILIZATION GLOBAL STATE
    ============================================================ */

    uint256 public currentEpoch;
    bytes32 public currentCivilizationStateHash;
    bool public civilizationHalt;

    /* ============================================================
       EVENTS
    ============================================================ */

    event VerifierSet(address verifier, bool status);
    event PolicySet(bytes32 policyHash, bool status);
    event EpochUpdated(uint256 epoch);
    event CivilizationStateHashUpdated(bytes32 stateHash);
    event CivilizationHaltSet(bool halted);
    event NullifierConsumed(bytes32 nullifier);

    event CivilizationProofAccepted(
        address indexed caller,
        address indexed verifier,
        bytes32 indexed nullifier,
        bytes32 policyHash,
        bytes32 civilizationStateHash,
        uint256 epoch
    );

    /* ============================================================
       GOVERNANCE CONTROL
    ============================================================ */

    function setVerifier(address verifier, bool status)
        external
        onlyGovernor
    {
        approvedVerifiers[verifier] = status;
        emit VerifierSet(verifier, status);
    }

    function setPolicy(bytes32 policyHash, bool status)
        external
        onlyGovernor
    {
        approvedPolicyHashes[policyHash] = status;
        emit PolicySet(policyHash, status);
    }

    function setEpoch(uint256 epoch)
        external
        onlyGovernor
    {
        currentEpoch = epoch;
        emit EpochUpdated(epoch);
    }

    function setCivilizationStateHash(bytes32 stateHash)
        external
        onlyGovernor
    {
        currentCivilizationStateHash = stateHash;
        emit CivilizationStateHashUpdated(stateHash);
    }

    function setCivilizationHalt(bool halted)
        external
        onlyGovernor
    {
        civilizationHalt = halted;
        emit CivilizationHaltSet(halted);
    }

    /* ============================================================
       CORE ENTRY
    ============================================================ */

    /**
     * Expected publicInputs layout (example):
     * [0] nullifier
     * [1] policyHash
     * [2] epoch
     * [3] civilizationStateHash
     *
     * civilizationStateHash =
     * keccak256(dignityRoot || biosphereRoot || economicRoot)
     */
    function submitCivilizationProof(
        address verifier,
        bytes calldata proof,
        uint256[] calldata publicInputs
    ) external {

        if (civilizationHalt) revert CivilizationHalted();
        if (!approvedVerifiers[verifier]) revert VerifierNotApproved();

        bytes32 nullifier = bytes32(publicInputs[0]);
        bytes32 policyHash = bytes32(publicInputs[1]);
        uint256 epoch = publicInputs[2];
        bytes32 stateHash = bytes32(publicInputs[3]);

        if (!approvedPolicyHashes[policyHash]) revert PolicyNotApproved();
        if (epoch != currentEpoch) revert EpochMismatch();
        if (stateHash != currentCivilizationStateHash)
            revert CivilizationStateHashMismatch();

        if (consumedNullifiers[nullifier]) revert NullifierUsed();

        bool ok = ICivilizationZKVerifier(verifier).verifyProof(
            proof,
            publicInputs
        );

        if (!ok) revert ProofInvalid();

        consumedNullifiers[nullifier] = true;

        emit NullifierConsumed(nullifier);

        emit CivilizationProofAccepted(
            msg.sender,
            verifier,
            nullifier,
            policyHash,
            stateHash,
            epoch
        );
    }

    /* ============================================================
       VIEW HELPERS
    ============================================================ */

    function isNullifierConsumed(bytes32 n)
        external
        view
        returns (bool)
    {
        return consumedNullifiers[n];
    }

    function isVerifierApproved(address v)
        external
        view
        returns (bool)
    {
        return approvedVerifiers[v];
    }

    function isPolicyApproved(bytes32 p)
        external
        view
        returns (bool)
    {
        return approvedPolicyHashes[p];
    }
}
