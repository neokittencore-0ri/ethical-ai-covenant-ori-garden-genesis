
"""
================================================================================
ORI GOVERNANCE RUNTIME MODULE
Version: 0.5.2-alpha
Author: ORI Core Maintainers
Layer: Runtime Execution (Level 2 of ORI Garden)
--------------------------------------------------------------------------------
This module stitches together all runtime governance components:

    - Risk Scoring Engine
    - Policy Resolver
    - Persona Integrity Checker
    - Drift Monitor
    - Lineage Hasher

It exposes a single high-level interface: GovernanceRuntime

Lifecycle:
    input → risk scoring → policy resolution → persona integrity →
    drift monitoring → lineage hashing → output decision packet

All operations are deterministic, testable, sandbox-aware, and isolated.
================================================================================
"""

from .risk_scorer import RiskScorer
from .policy_resolver import PolicyResolver
from .persona_integrity_checker import PersonaIntegrityChecker
from .drift_monitor import DriftMonitor
from .lineage_hasher import LineageHasher


class GovernanceRuntime:
    """
    High-level orchestrator that binds all governance components
    into a single deterministic execution loop.
    """

    def __init__(
        self,
        policy_loader=None,
        risk_config=None,
        drift_config=None,
        lineage_salt=None
    ):
        # Initialize components
        self.risk_scorer = RiskScorer(config=risk_config)
        self.policy_resolver = PolicyResolver(loader=policy_loader)
        self.persona_checker = PersonaIntegrityChecker()
        self.drift_monitor = DriftMonitor(config=drift_config)
        self.lineage = LineageHasher(salt=lineage_salt)

    # ----------------------------------------------------------------------
    # MAIN GOVERNANCE EXECUTION PATH
    # ----------------------------------------------------------------------
    def evaluate(self, request_packet):
        """
        Core governance loop (decision spine):
            1. Score risk
            2. Resolve policies
            3. Check persona invariants
            4. Monitor drift
            5. Hash lineage
        """

        # 1. Risk scoring
        risk_score = self.risk_scorer.score(request_packet)

        # 2. Apply policy rules
        policy_actions = self.policy_resolver.resolve(
            request_packet=request_packet,
            risk_score=risk_score
        )

        # 3. Check persona invariants
        integrity_report = self.persona_checker.verify(
            request_packet=request_packet
        )

        # 4. Drift detection
        drift_report = self.drift_monitor.check(
            request_packet=request_packet,
            policy_actions=policy_actions
        )

        # 5. Lineage hashing
        lineage_hash = self.lineage.generate(
            request=request_packet,
            risk=risk_score,
            policies=policy_actions,
            integrity=integrity_report,
            drift=drift_report
        )

        # Output deterministic decision packet
        return {
            "risk_score": risk_score,
            "policy_actions": policy_actions,
            "persona_integrity": integrity_report,
            "drift_report": drift_report,
            "lineage_hash": lineage_hash
        }

# Expose public API
__all__ = [
    "GovernanceRuntime",
    "RiskScorer",
    "PolicyResolver",
    "PersonaIntegrityChecker",
    "DriftMonitor",
    "LineageHasher"
]
