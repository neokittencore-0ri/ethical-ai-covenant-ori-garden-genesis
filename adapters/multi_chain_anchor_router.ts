
/**
 * ORI-GARDEN
 * Multi-Chain Anchor Router
 *
 * Responsibility:
 * - Route anchor commitments to multiple chains
 * - Normalize payloads across heterogeneous chains
 * - Provide retry / fallback semantics
 *
 * This layer MUST remain deterministic and boring.
 * Intelligence belongs in governance & simulation layers.
 */

import { ChainExecutionAdapter } from "./chain_execution_adapter";

export type SupportedChain =
  | "EVM"
  | "COSMOS"
  | "SOLANA";

export interface AnchorPayload {
  anchorHash: string;        // hex string
  namespace: string;         // logical namespace
  metadataURI?: string;
  metadataHash?: string;
}

export interface AnchorRouteResult {
  chain: SupportedChain;
  success: boolean;
  txHash?: string;
  error?: string;
  timestamp: string;
}

export class MultiChainAnchorRouter {
  /**
   * Route anchor to a single chain
   */
  static async routeToChain(
    chain: SupportedChain,
    payload: AnchorPayload
  ): Promise<AnchorRouteResult> {
    try {
      const txHash = await ChainExecutionAdapter.executeAnchor(
        chain,
        payload
      );

      return {
        chain,
        success: true,
        txHash,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        chain,
        success: false,
        error: err?.message || String(err),
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Route anchor to multiple chains
   * Failure on one chain MUST NOT block others
   */
  static async routeToMany(
    chains: SupportedChain[],
    payload: AnchorPayload
  ): Promise<AnchorRouteResult[]> {
    const results: AnchorRouteResult[] = [];

    for (const chain of chains) {
      const result = await this.routeToChain(chain, payload);
      results.push(result);
    }

    return results;
  }

  /**
   * High-level helper:
   * Anchor with fallback strategy
   */
  static async routeWithFallback(
    primary: SupportedChain,
    fallbacks: SupportedChain[],
    payload: AnchorPayload
  ): Promise<AnchorRouteResult[]> {
    const results: AnchorRouteResult[] = [];

    const primaryResult = await this.routeToChain(primary, payload);
    results.push(primaryResult);

    if (primaryResult.success) {
      return results;
    }

    for (const chain of fallbacks) {
      const fallbackResult = await this.routeToChain(chain, payload);
      results.push(fallbackResult);

      if (fallbackResult.success) {
        break;
      }
    }

    return results;
  }
}
