
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * ORI-GARDEN :: Cross Chain Dignity Root Oracle
 *
 * Syncs dignity invariant roots across chains / infra layers.
 *
 * Root Source Examples:
 * - L1 civilization proof anchor
 * - ZK aggregation chain
 * - Planetary governance relay
 */

contract CrossChainDignityRootOracle {

    /* ============================================================
       ERRORS
    ============================================================ */

    error NotGovernor();
    error NotMessenger();
    error EpochRollback();
    error InvalidRoot();

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
       TRUSTED MESSENGERS
    ============================================================ */

    mapping(address => bool) public trustedMessengers;

    event MessengerSet(address messenger, bool status);

    function setMessenger(address messenger, bool status)
        external
        onlyGovernor
    {
        trustedMessengers[messenger] = status;
        emit MessengerSet(messenger, status);
    }

    modifier onlyMessenger() {
        if (!trustedMessengers[msg.sender]) revert NotMessenger();
        _;
    }

    /* ============================================================
       ROOT STORAGE
    ============================================================ */

    struct DignityRootState {
        bytes32 root;
        uint256 epoch;
        uint256 timestamp;
    }

    // chainId => state
    mapping(uint256 => DignityRootState) public chainRoot;

    event DignityRootUpdated(
        uint256 indexed sourceChainId,
        bytes32 root,
        uint256 epoch,
        uint256 timestamp
    );

    /* ============================================================
       ROOT SYNC ENTRY
    ============================================================ */

    /**
     * Called by bridge / cross-chain messenger
     */
    function syncDignityRoot(
        uint256 sourceChainId,
        bytes32 root,
        uint256 epoch
    ) external onlyMessenger {

        if (root == bytes32(0)) revert InvalidRoot();

        DignityRootState storage prev = chainRoot[sourceChainId];

        if (epoch < prev.epoch) revert EpochRollback();

        chainRoot[sourceChainId] = DignityRootState({
            root: root,
            epoch: epoch,
            timestamp: block.timestamp
        });

        emit DignityRootUpdated(
            sourceChainId,
            root,
            epoch,
            block.timestamp
        );
    }

    /* ============================================================
       VIEW HELPERS
    ============================================================ */

    function getRoot(uint256 sourceChainId)
        external
        view
        returns (bytes32)
    {
        return chainRoot[sourceChainId].root;
    }

    function getEpoch(uint256 sourceChainId)
        external
        view
        returns (uint256)
    {
        return chainRoot[sourceChainId].epoch;
    }

    function getRootState(uint256 sourceChainId)
        external
        view
        returns (DignityRootState memory)
    {
        return chainRoot[sourceChainId];
    }

    /* ============================================================
       OPTIONAL: Global Root Aggregation
    ============================================================ */

    /**
     * Simple deterministic aggregation for multi-chain read
     * (real production could use Merkle or ZK aggregation)
     */
    function computeGlobalRoot(
        uint256[] calldata chainIds
    ) external view returns (bytes32) {

        bytes memory packed;

        for (uint256 i = 0; i < chainIds.length; i++) {
            packed = abi.encodePacked(
                packed,
                chainIds[i],
                chainRoot[chainIds[i]].root
            );
        }

        return keccak256(packed);
    }
}
