
/**
 * ORI-GARDEN
 * Chain Execution Adapter
 *
 * Purpose:
 * Unified interface for civilization kernel → blockchain execution layer
 *
 * Design Goals:
 * - Chain agnostic surface
 * - Deterministic execution paths
 * - Hash anchoring ready
 * - Governance / Economic flow compatible
 * - Simulation mode support
 */

import { ethers } from "ethers";

/* ============================================================
   TYPES
============================================================ */

export type ChainType =
  | "EVM"
  | "COSMOS"
  | "SOLANA"
  | "SUBSTRATE"
  | "CUSTOM";

export interface ChainConfig {
  chainType: ChainType;
  rpcUrl: string;
  chainId?: number;
  explorerUrl?: string;
}

export interface TxRequest {
  to: string;
  data?: string;
  value?: string; // wei string
  gasLimit?: string;
}

export interface ExecutionResult {
  txHash: string;
  blockNumber?: number;
  success: boolean;
  raw?: any;
}

export interface AnchorPayload {
  hash: string;
  namespace?: string;
  metadata?: Record<string, any>;
}

export interface SimulationResult {
  success: boolean;
  gasEstimate?: string;
  error?: string;
}

/* ============================================================
   CORE ADAPTER
============================================================ */

export class ChainExecutionAdapter {
  private provider: ethers.JsonRpcProvider;
  private wallet?: ethers.Wallet;
  private config: ChainConfig;

  constructor(config: ChainConfig, privateKey?: string) {
    this.config = config;

    if (config.chainType !== "EVM") {
      throw new Error("Only EVM supported in v1 adapter");
    }

    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey, this.provider);
    }
  }

  /* ============================================================
     WALLET STATE
  ============================================================ */

  public getAddress(): string | null {
    return this.wallet?.address ?? null;
  }

  public async getBalance(address?: string): Promise<string> {
    const addr = address ?? this.wallet?.address;
    if (!addr) throw new Error("No address available");

    const balance = await this.provider.getBalance(addr);
    return balance.toString();
  }

  /* ============================================================
     TRANSACTION EXECUTION
  ============================================================ */

  public async executeTx(req: TxRequest): Promise<ExecutionResult> {
    if (!this.wallet) throw new Error("Wallet not configured");

    const tx = await this.wallet.sendTransaction({
      to: req.to,
      data: req.data,
      value: req.value ? BigInt(req.value) : undefined,
      gasLimit: req.gasLimit ? BigInt(req.gasLimit) : undefined,
    });

    const receipt = await tx.wait();

    return {
      txHash: tx.hash,
      blockNumber: receipt?.blockNumber,
      success: receipt?.status === 1,
      raw: receipt,
    };
  }

  /* ============================================================
     SIMULATION (PRE-FLIGHT)
  ============================================================ */

  public async simulateTx(req: TxRequest): Promise<SimulationResult> {
    try {
      const gas = await this.provider.estimateGas({
        to: req.to,
        data: req.data,
        value: req.value ? BigInt(req.value) : undefined,
      });

      return {
        success: true,
        gasEstimate: gas.toString(),
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message ?? "Simulation failed",
      };
    }
  }

  /* ============================================================
     HASH ANCHORING (GENESIS / CIVILIZATION MEMORY)
  ============================================================ */

  public async anchorHash(
    contractAddress: string,
    anchorPayload: AnchorPayload,
    abi: any[]
  ): Promise<ExecutionResult> {
    if (!this.wallet) throw new Error("Wallet not configured");

    const contract = new ethers.Contract(
      contractAddress,
      abi,
      this.wallet
    );

    /**
     * Expect contract function:
     * anchor(bytes32 hash, string namespace, string metadataJson)
     */
    const tx = await contract.anchor(
      anchorPayload.hash,
      anchorPayload.namespace ?? "ORI_GARDEN",
      JSON.stringify(anchorPayload.metadata ?? {})
    );

    const receipt = await tx.wait();

    return {
      txHash: tx.hash,
      blockNumber: receipt?.blockNumber,
      success: receipt?.status === 1,
      raw: receipt,
    };
  }

  /* ============================================================
     READ CONTRACT STATE
  ============================================================ */

  public getReadOnlyContract(address: string, abi: any[]) {
    return new ethers.Contract(address, abi, this.provider);
  }

  /* ============================================================
     STATIC HELPERS
  ============================================================ */

  public static normalizeHash(input: string): string {
    if (input.startsWith("0x")) return input;
    return "0x" + input;
  }
}

/* ============================================================
   FACTORY
============================================================ */

export function createChainAdapter(
  config: ChainConfig,
  privateKey?: string
): ChainExecutionAdapter {
  return new ChainExecutionAdapter(config, privateKey);
}
