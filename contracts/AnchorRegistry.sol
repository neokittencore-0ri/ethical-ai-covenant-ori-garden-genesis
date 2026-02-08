
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * ORI-GARDEN
 * Anchor Registry
 *
 * Purpose:
 * Permanent anchoring of civilization artifacts, hashes, and memory proofs.
 *
 * Design Principles:
 * - Immutability first
 * - Namespace separation
 * - Cheap verification path
 * - Indexable event logs
 * - Optional replay protection
 *
 * Expected Usage:
 * - Manifesto anchoring
 * - Governance state snapshot anchoring
 * - Simulation result notarization
 * - Economic flow commitment anchoring
 */

contract AnchorRegistry {

    /* ============================================================
       STRUCTS
    ============================================================ */

    struct AnchorRecord {
        bytes32 hash;
        address submitter;
        uint64 timestamp;
        string namespace;
        string metadataJson;
    }

    /* ============================================================
       STORAGE
    ============================================================ */

    // hash => anchored?
    mapping(bytes32 => bool) public anchored;

    // optional record storage (can be disabled in v2 for gas)
    mapping(bytes32 => AnchorRecord) public records;

    // namespace => count
    mapping(bytes32 => uint256) public namespaceAnchorCount;

    uint256 public totalAnchors;

    address public immutable deployer;

    /* ============================================================
       EVENTS
    ============================================================ */

    event HashAnchored(
        bytes32 indexed hash,
        address indexed submitter,
        bytes32 indexed namespaceHash,
        string namespace,
        string metadataJson,
        uint256 totalAnchors,
        uint256 namespaceCount
    );

    /* ============================================================
       ERRORS
    ============================================================ */

    error HashAlreadyAnchored(bytes32 hash);
    error InvalidHash();
    error EmptyNamespace();

    /* ============================================================
       CONSTRUCTOR
    ============================================================ */

    constructor() {
        deployer = msg.sender;
    }

    /* ============================================================
       CORE ANCHOR FUNCTION
    ============================================================ */

    function anchor(
        bytes32 hash,
        string calldata namespace,
        string calldata metadataJson
    ) external {

        if (hash == bytes32(0)) revert InvalidHash();
        if (bytes(namespace).length == 0) revert EmptyNamespace();
        if (anchored[hash]) revert HashAlreadyAnchored(hash);

        anchored[hash] = true;

        bytes32 nsHash = keccak256(bytes(namespace));

        namespaceAnchorCount[nsHash] += 1;
        totalAnchors += 1;

        records[hash] = AnchorRecord({
            hash: hash,
            submitter: msg.sender,
            timestamp: uint64(block.timestamp),
            namespace: namespace,
            metadataJson: metadataJson
        });

        emit HashAnchored(
            hash,
            msg.sender,
            nsHash,
            namespace,
            metadataJson,
            totalAnchors,
            namespaceAnchorCount[nsHash]
        );
    }

    /* ============================================================
       VIEW HELPERS
    ============================================================ */

    function isAnchored(bytes32 hash) external view returns (bool) {
        return anchored[hash];
    }

    function getRecord(bytes32 hash)
        external
        view
        returns (AnchorRecord memory)
    {
        return records[hash];
    }

    function getNamespaceCount(string calldata namespace)
        external
        view
        returns (uint256)
    {
        return namespaceAnchorCount[keccak256(bytes(namespace))];
    }

    /* ============================================================
       PURE HELPERS
    ============================================================ */

    function namespaceHash(string calldata namespace)
        external
        pure
        returns (bytes32)
    {
        return keccak256(bytes(namespace));
    }
}
