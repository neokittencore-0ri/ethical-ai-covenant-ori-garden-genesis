
import { ethers } from "ethers";

/* ============================================================
   TYPES
============================================================ */

export interface EconomicFlowInput {
  allocations: bigint[];
  totalValue: bigint;

  covenantHash: string;

  benevolenceMinBps: number;
  originatorMaxBps: number;
  systemMinBps: number;

  salt?: string;
}

export interface ProofBundle {
  proof: string;               // calldata-ready proof
  publicInputs: string[];      // hex32[]
  flowCommitment: string;      // hex32
}

/* ============================================================
   CONTRACT INTERFACES
============================================================ */

const EconomicFlowVerifierABI = [
  "function verifyEconomicFlow(bytes32 flowCommitment, bytes32 covenantHash, bytes proof, bytes32[] publicInputs)"
];

const AnchorRegistryABI = [
  "function anchor(bytes32 id, bytes32 dataHash)"
];

/* ============================================================
   EXECUTOR
============================================================ */

export class EconomicFlowExecutor {

  private signer: ethers.Signer;
  private verifier: ethers.Contract;
  private anchor?: ethers.Contract;

  constructor(
    signer: ethers.Signer,
    verifierAddress: string,
    anchorAddress?: string
  ) {
    this.signer = signer;

    this.verifier = new ethers.Contract(
      verifierAddress,
      EconomicFlowVerifierABI,
      signer
    );

    if (anchorAddress) {
      this.anchor = new ethers.Contract(
        anchorAddress,
        AnchorRegistryABI,
        signer
      );
    }
  }

  /* ============================================================
     PUBLIC ENTRY
  ============================================================ */

  async executeEconomicFlow(
    input: EconomicFlowInput,
    proofBundle: ProofBundle,
    opts?: {
      anchor?: boolean;
      waitConfirmations?: number;
    }
  ) {

    const waitConf = opts?.waitConfirmations ?? 1;

    /* --------------------------------------------------------
       VERIFY ON-CHAIN
    -------------------------------------------------------- */

    const tx = await this.verifier.verifyEconomicFlow(
      proofBundle.flowCommitment,
      input.covenantHash,
      proofBundle.proof,
      proofBundle.publicInputs
    );

    const receipt = await tx.wait(waitConf);

    /* --------------------------------------------------------
       OPTIONAL ANCHOR FOSSIL
    -------------------------------------------------------- */

    let anchorReceipt = null;

    if (opts?.anchor && this.anchor) {

      const anchorId = this.computeAnchorId(
        proofBundle.flowCommitment,
        input.covenantHash
      );

      const anchorTx = await this.anchor.anchor(
        anchorId,
        proofBundle.flowCommitment
      );

      anchorReceipt = await anchorTx.wait(waitConf);
    }

    return {
      verifyTx: receipt.transactionHash,
      anchorTx: anchorReceipt?.transactionHash ?? null,
      flowCommitment: proofBundle.flowCommitment
    };
  }

  /* ============================================================
     DETERMINISTIC HELPERS
  ============================================================ */

  computeAnchorId(
    flowCommitment: string,
    covenantHash: string
  ) {
    return ethers.keccak256(
      ethers.solidityPacked(
        ["bytes32", "bytes32"],
        [flowCommitment, covenantHash]
      )
    );
  }

  static generateSalt(): string {
    return ethers.hexlify(ethers.randomBytes(32));
  }

}

/* ============================================================
   PROOF INPUT PACK HELPERS
============================================================ */

export function buildPublicInputs(params: {
  flowCommitment: string;
  covenantHash: string;
  epoch?: number;
  extra?: string[];
}) {

  const out = [
    params.flowCommitment,
    params.covenantHash
  ];

  if (params.epoch !== undefined) {
    out.push(
      ethers.zeroPadValue(
        ethers.toBeHex(params.epoch),
        32
      )
    );
  }

  if (params.extra) {
    out.push(...params.extra);
  }

  return out;
}

/* ============================================================
   SAFETY CHECKS
============================================================ */

export function validateEconomicInput(input: EconomicFlowInput) {

  const sum = input.allocations.reduce(
    (a, b) => a + b,
    0n
  );

  if (sum !== input.totalValue) {
    throw new Error("Allocation sum != totalValue");
  }

  if (
    input.benevolenceMinBps < 0 ||
    input.originatorMaxBps > 10000 ||
    input.systemMinBps < 0
  ) {
    throw new Error("Invalid BPS config");
  }
}
