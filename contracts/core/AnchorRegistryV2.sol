
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * ORI-GARDEN :: AnchorRegistryV2
 *
 * Event-only anchor registry.
 *
 * Philosophy:
 * - History lives in logs, not storage
 * - Storage can be corrupted or pruned; events are the fossil layer
 * - Designed for civilization-scale anchoring
 *
 * Guarantees:
 * - Cheap writes
 * - Immutable record
 * - Indexable across centuries
 *
 * Tradeoff:
 * - No on-chain lookup
 * - Verification = log scan / indexer / light client
 */

contract AnchorRegistryV2 {

    /* ============================================================
       EVENTS (THE ACTUAL DATA LAYER)
    ============================================================ */

    /**
     * AnchorCommitted
     *
     * @param anchorHash      Hash of artifact (sha256 / keccak / custom)
     * @param namespaceHash   keccak256(namespace)
     * @param submitter       msg.sender
     * @param timestamp       block.timestamp
     * @param metadataURI     Optional pointer (IPFS / Arweave / HTTPS)
     * @param metadataHash    Optional hash of metadata JSON
     */
    event AnchorCommitted(
        bytes32 indexed anchorHash,
        bytes32 indexed namespaceHash,
        address indexed submitter,
        uint64 timestamp,
        string metadataURI,
        bytes32 metadataHash
    );

    /* ============================================================
       ERRORS
    ============================================================ */

    error InvalidAnchorHash();
    error InvalidNamespace();
    error InvalidMetadataHash();

    /* ============================================================
       CORE FUNCTION
    ============================================================ */

    /**
     * Commit an anchor to the eternal log.
     *
     * No storage writes.
     * No replay protection on-chain.
     * Immutability via event finality.
     */
    function commitAnchor(
        bytes32 anchorHash,
        string calldata namespace,
        string calldata metadataURI,
        bytes32 metadataHash
    ) external {
        if (anchorHash == bytes32(0)) revert InvalidAnchorHash();
        if (bytes(namespace).length == 0) revert InvalidNamespace();

        // metadataHash is optional, but if provided must not be zero-length placeholder
        if (metadataURI.length > 0 && metadataHash == bytes32(0)) {
            revert InvalidMetadataHash();
        }

        emit AnchorCommitted(
            anchorHash,
            keccak256(bytes(namespace)),
            msg.sender,
            uint64(block.timestamp),
            metadataURI,
            metadataHash
        );
    }

    /* ============================================================
       PURE HELPERS (OFF-CHAIN FRIENDLY)
    ============================================================ */

    function namespaceHash(string calldata namespace)
        external
        pure
        returns (bytes32)
    {
        return keccak256(bytes(namespace));
    }
}
