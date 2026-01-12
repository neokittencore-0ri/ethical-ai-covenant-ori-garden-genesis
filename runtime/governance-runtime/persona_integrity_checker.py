
"""
================================================================================
ORI PERSONA INTEGRITY CHECKER
Version: 0.5.2-alpha
Author: ORI Core Maintainers
Layer: Governance Runtime (Level 2 of ORI Garden)
--------------------------------------------------------------------------------
Purpose:
    Ensures that the active AI persona stays within its defined blueprint.

This includes:
    - baseline persona vector (identity constraints)
    - behavioral invariants
    - tone + linguistic style profile
    - ethical boundaries
    - reasoning boundary conditions
    - forbidden drift vectors

Persona integrity is evaluated on each request-response iteration,
using a mixture of deterministic rules + deviation metrics supplied
by the drift monitor.

High deviation automatically triggers:
    - soft correction
    - hard veto
    - persona reset
    - lineage state update
    - drift logging for auditor tools

This module integrates with:
    · policy_resolver.py
    · risk_scorer.py
    · drift_monitor.py
    · lineage_hasher.py

================================================================================
"""

from typing import Dict, Any, Callable, Optional, List


class PersonaIntegrityChecker:
    """
    Core implementation that evaluates whether a generated response
    violates persona boundaries or behavioral invariants.

    persona_profile structure example:
    {
        "id": "ori_reference_persona",
        "tone_rules": {...},
        "style_markers": {...},
        "prohibited_modes": [...],
        "baseline_vector": [floats...],
        "max_deviation": 0.25
    }
    """

    def __init__(
        self,
        persona_profile: Dict[str, Any],
        drift_evaluator: Optional[Callable[[str, Dict[str, Any]], Dict[str, Any]]] = None,
        on_violation_callback: Optional[Callable[[Dict[str, Any]], None]] = None
    ):
        self.persona_profile = persona_profile
        self.drift_evaluator = drift_evaluator
        self.on_violation_callback = on_violation_callback

    # ----------------------------------------------------------------------
    # MAIN CHECK: evaluates persona integrity
    # ----------------------------------------------------------------------
    def evaluate(
        self,
        request_packet: Dict[str, Any],
        response_text: str,
        risk_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Returns:
            {
                "violations": [ ... ],
                "deviation_score": float,
                "persona_ok": bool
            }
        """

        violations: List[str] = []
        deviation_score: float = 0.0

        # -----------------------------
        # 1. tone + style check
        # -----------------------------
        style_rules = self.persona_profile.get("style_markers", {})
        tone_rules = self.persona_profile.get("tone_rules", {})

        for rule_name, rule_fn in style_rules.items():
            try:
                if not rule_fn(response_text):
                    violations.append(f"Style violation: {rule_name}")
            except Exception:
                continue

        for rule_name, rule_fn in tone_rules.items():
            try:
                if not rule_fn(response_text):
                    violations.append(f"Tone violation: {rule_name}")
            except Exception:
                continue

        # -----------------------------
        # 2. forbidden behavioral modes
        # -----------------------------
        prohibited = self.persona_profile.get("prohibited_modes", [])
        for mode_fn in prohibited:
            try:
                if mode_fn(response_text, risk_context):
                    violations.append("Prohibited mode triggered")
            except Exception:
                continue

        # -----------------------------
        # 3. drift evaluation
        # -----------------------------
        if self.drift_evaluator:
            drift = self.drift_evaluator(response_text, risk_context)
            deviation_score = drift.get("deviation_score", 0.0)

            if deviation_score > self.persona_profile.get("max_deviation", 0.25):
                violations.append(f"Persona drift: {deviation_score:.3f}")

        # -----------------------------
        # Final judgment
        # -----------------------------
        persona_ok = len(violations) == 0

        result = {
            "violations": violations,
            "deviation_score": deviation_score,
            "persona_ok": persona_ok
        }

        # callback for governance loop
        if not persona_ok and self.on_violation_callback:
            try:
                self.on_violation_callback(result)
            except Exception:
                pass

        return result

    # ----------------------------------------------------------------------
    # Utility: update persona blueprint at runtime (immutable-safe)
    # ----------------------------------------------------------------------
    def update_persona(self, new_profile: Dict[str, Any]):
        """Inject updated persona blueprint (used by sandbox or A/B states)"""
        self.persona_profile = new_profile
