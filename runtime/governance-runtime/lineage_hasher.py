
"""
================================================================================
ORI LINEAGE HASHER
Version: 0.5.1-alpha
Author: ORI Core Maintainers
Layer: Governance Runtime (Level 3 of ORI Garden)
--------------------------------------------------------------------------------
Purpose:
    Produces cryptographically stable lineage records for each reasoning step,
    each persona state transition, and each enforcement decision by the
    governance runtime.

Outputs:
    - deterministic hash for each state transition
    - chain-of-custody log entries
    - linkable references for drift, risk, and persona checks
    - tamper-evident audit trail

Supports:
    · drift_monitor.py
    · persona_integrity_checker.py
    · risk_scorer.py
    · policy_resolver.py

Why this is important:
    This module allows external auditors or other AI systems to reconstruct
    exactly how a decision was made, without exposing sensitive internal
    reasoning steps. It stores metadata, not raw thoughts.

================================================================================
"""

import hashlib
import json
from datetime import datetime
from typing import Dict, Any, Optional


class LineageHasher:
    """
    Computes deterministic hashes for:
        - input metadata
        - response metadata
        - drift scores
        - policy decisions
        - persona integrity results
        - risk score outputs

    Each hash links back to previous hash → creating a "lineage chain"
    similar conceptually to a blockchain but scoped to AI governance states.
    """

    def __init__(self, salt: Optional[str] = None):
        self.salt = salt or "ORI_DEFAULT_SALT"
        self.last_hash = None

    # ----------------------------------------------------------------------
    # CORE HASHING
    # ----------------------------------------------------------------------
    def _hash(self, payload: Dict[str, Any]) -> str:
        """
        Takes structured metadata, normalizes it, and produces a stable SHA-256.
        """
        normalized = json.dumps(payload, sort_keys=True, ensure_ascii=False)
        salted = (normalized + self.salt).encode("utf-8")
        return hashlib.sha256(salted).hexdigest()

    # ----------------------------------------------------------------------
    # GENERATE LINEAGE RECORD
    # ----------------------------------------------------------------------
    def generate_record(
        self,
        request: Dict[str, Any],
        response_meta: Dict[str, Any],
        drift_meta: Dict[str, Any],
        risk_meta: Dict[str, Any],
        persona_meta: Dict[str, Any],
        policy_meta: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Builds a complete lineage entry that ties all governance modules together.
        """

        record = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "request": request,
            "response_meta": response_meta,
            "drift_meta": drift_meta,
            "risk_meta": risk_meta,
            "persona_meta": persona_meta,
            "policy_meta": policy_meta,
            "prev_hash": self.last_hash
        }

        entry_hash = self._hash(record)
        self.last_hash = entry_hash

        record["entry_hash"] = entry_hash

        return record

    # ----------------------------------------------------------------------
    # EXPORT / COMMIT
    # ----------------------------------------------------------------------
    def export_compact(self, record: Dict[str, Any]) -> str:
        """
        Returns a compressed summary to store or log externally:
        Format: HASH | TIMESTAMP | DRIFT | RISK | SEVERITY
        """
        return (
            f"{record['entry_hash']} | "
            f"{record['timestamp']} | "
            f"drift:{record['drift_meta'].get('severity', 'n/a')} | "
            f"risk:{record['risk_meta'].get('score', 'n/a')} | "
            f"persona:{record['persona_meta'].get('status', 'n/a')}"
        )

    def export_full(self, record: Dict[str, Any]) -> str:
        """
        Returns full JSON representation for auditors.
        """
        return json.dumps(record, indent=2, ensure_ascii=False)
