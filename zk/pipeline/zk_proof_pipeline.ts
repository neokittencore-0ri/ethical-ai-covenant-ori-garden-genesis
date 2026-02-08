
import fs from "fs";
import path from "path";
import crypto from "crypto";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const snarkjs = require("snarkjs");

/* ============================================================
   TYPES
============================================================ */

export interface ZKCircuitArtifacts {
  wasmPath: string;
  zkeyPath: string;
  vkeyPath?: string;
}

export interface ZKProofResult {
  proof: any;
  publicSignals: string[];
  calldata: string;
  proofHash: string;
}

/* ============================================================
   MAIN PIPELINE
============================================================ */

export class ZKProofPipeline {

  /* --------------------------------------------------------
     Generate Witness + Proof
  -------------------------------------------------------- */

  static async generateProof(
    artifacts: ZKCircuitArtifacts,
    input: Record<string, any>
  ): Promise<ZKProofResult> {

    this.assertFile(artifacts.wasmPath);
    this.assertFile(artifacts.zkeyPath);

    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve(
        input,
        artifacts.wasmPath,
        artifacts.zkeyPath
      );

    const calldata =
      await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      );

    const proofHash = this.hashProof(
      proof,
      publicSignals
    );

    return {
      proof,
      publicSignals,
      calldata,
      proofHash
    };
  }

  /* --------------------------------------------------------
     Verify Proof Locally
  -------------------------------------------------------- */

  static async verifyProof(
    vkeyPath: string,
    publicSignals: string[],
    proof: any
  ): Promise<boolean> {

    this.assertFile(vkeyPath);

    const vKey = JSON.parse(
      fs.readFileSync(vkeyPath, "utf8")
    );

    return snarkjs.groth16.verify(
      vKey,
      publicSignals,
      proof
    );
  }

  /* --------------------------------------------------------
     Calldata → Contract Friendly Bytes
  -------------------------------------------------------- */

  static calldataToBytes(calldata: string): string {
    const argv = calldata
      .replace(/["[\]\s]/g, "")
      .split(",");

    return "0x" + argv.map(x =>
      BigInt(x).toString(16).padStart(64, "0")
    ).join("");
  }

  /* --------------------------------------------------------
     Public Signals → bytes32[]
  -------------------------------------------------------- */

  static publicSignalsToBytes32Array(
    publicSignals: string[]
  ): string[] {
    return publicSignals.map(sig =>
      "0x" + BigInt(sig).toString(16).padStart(64, "0")
    );
  }

  /* --------------------------------------------------------
     Proof Hash (For caching / replay detect)
  -------------------------------------------------------- */

  static hashProof(
    proof: any,
    publicSignals: string[]
  ): string {

    const h = crypto.createHash("sha256");

    h.update(JSON.stringify(proof));
    h.update(JSON.stringify(publicSignals));

    return "0x" + h.digest("hex");
  }

  /* --------------------------------------------------------
     Helpers
  -------------------------------------------------------- */

  private static assertFile(p: string) {
    if (!fs.existsSync(p)) {
      throw new Error(`Missing file: ${p}`);
    }
  }
}
