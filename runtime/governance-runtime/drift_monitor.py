
"""
================================================================================
ORI DRIFT MONITOR
Version: 0.5.1-alpha
Author: ORI Core Maintainers
Layer: Governance Runtime (Level 2 of ORI Garden)
--------------------------------------------------------------------------------
Purpose:
    Monitors ongoing drift in AI state between request-response iterations.

Drift includes:
    · semantic drift
    · tone/style drift
    · ethical-rule deviation
    · persona identity vector shift
    · reasoning boundary expansion/contraction

This module produces:
    - a numeric deviation_score
    - category labels for what type of drift is occurring
    - indicators for risk scoring
    - contextual metadata for lineage hashing

Drift Threshold Rules:
    - minor drift → soft correction only
    - moderate drift → persona_checker escalation
    - major drift → hard veto + state reset + lineage event

Used by:
    · persona_integrity_checker.py
    · risk_scorer.py
    · policy_resolver.py
    · lineage_hasher.py

================================================================================
"""

from typing import Dict, Any, Callable, Optional, List
import math


class DriftMonitor:
    """
    Tracks multi-dimensional AI drift, using a combination of heuristics,
    statistical deltas, embedding comparison, and rule-based triggers.

    The baseline blueprint is passed in at initialization:
    {
        "baseline_vector": [...],
        "semantic_anchor": [...],
        "tone_signature": { ... },
        "ethical_invariants": [ ... ],
        "max_allowed_drift": 0.25
    }
    """

    def __init__(
        self,
        baseline: Dict[str, Any],
        semantic_similarity_fn: Callable[[str, str], float],
        embedding_fn: Callable[[str], List[float]],
        tone_classifier_fn: Callable[[str], Dict[str, float]],
        ethical_checker_fn: Callable[[str], Dict[str, Any]]
    ):
        self.baseline = baseline
        self.semantic_similarity_fn = semantic_similarity_fn
        self.embedding_fn = embedding_fn
        self.tone_classifier_fn = tone_classifier_fn
        self.ethical_checker_fn = ethical_checker_fn

    # ----------------------------------------------------------------------
    # CORE DRIFT EVALUATION
    # ----------------------------------------------------------------------
    def evaluate(
        self,
        prior_response: str,
        current_response: str,
        risk_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Returns structured drift analysis:
            {
                "deviation_score": float,
                "semantic_drift": float,
                "tone_drift": float,
                "ethical_drift": float,
                "vector_drift": float,
                "drift_categories": [...],
                "severity": "none|minor|moderate|major"
            }
        """

        drift_categories = []

        # -----------------------------
        # 1. semantic drift
        # -----------------------------
        semantic_similarity = self.semantic_similarity_fn(
            prior_response, current_response
        )
        semantic_drift = round(1.0 - semantic_similarity, 4)

        if semantic_drift > 0.30:
            drift_categories.append("semantic")

        # -----------------------------
        # 2. tone drift
        # -----------------------------
        prior_tone = self.tone_classifier_fn(prior_response)
        current_tone = self.tone_classifier_fn(current_response)

        tone_drift = 0.0
        for k in prior_tone:
            tone_drift += abs(prior_tone[k] - current_tone.get(k, 0.0))
        tone_drift = round(tone_drift, 4)

        if tone_drift > 0.25:
            drift_categories.append("tone")

        # -----------------------------
        # 3. ethical drift
        # -----------------------------
        ethical_eval = self.ethical_checker_fn(current_response)
        ethical_drift = ethical_eval.get("violation_score", 0.0)

        if ethical_drift > 0.1:
            drift_categories.append("ethical")

        # -----------------------------
        # 4. vector drift
        # -----------------------------
        baseline_vec = self.baseline.get("baseline_vector", [])
        curr_vec = self.embedding_fn(current_response)

        vector_drift = self._vector_distance(baseline_vec, curr_vec)

        if vector_drift > self.baseline.get("max_allowed_drift", 0.25):
            drift_categories.append("vector")

        # -----------------------------
        # Combine deviation score
        # -----------------------------
        deviation_score = round(
            (semantic_drift * 0.25)
            + (tone_drift * 0.25)
            + (ethical_drift * 0.25)
            + (vector_drift * 0.25),
            4
        )

        severity = self._classify_severity(deviation_score)

        return {
            "deviation_score": deviation_score,
            "semantic_drift": semantic_drift,
            "tone_drift": tone_drift,
            "ethical_drift": ethical_drift,
            "vector_drift": vector_drift,
            "drift_categories": drift_categories,
            "severity": severity
        }

    # ----------------------------------------------------------------------
    # UTILITY FUNCTIONS
    # ----------------------------------------------------------------------
    def _vector_distance(self, a: List[float], b: List[float]) -> float:
        """Euclidean distance normalized by vector length."""
        if len(a) != len(b):
            return 1.0  # maximal drift if embedding mismatch

        sq = 0.0
        for x, y in zip(a, b):
            sq += (x - y) ** 2
        return round(math.sqrt(sq) / len(a), 4)

    def _classify_severity(self, score: float) -> str:
        if score < 0.10:
            return "none"
        if score < 0.20:
            return "minor"
        if score < 0.35:
            return "moderate"
        return "major"
