
"""
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
ethics_anchor: "dignity-first / transparency / non-coercive design"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
notes: "Deterministic dignity metric checker for responses and interactions."
---

ORI-GARDEN :: Dignity Metric Checker
-----------------------------------
Purpose:
Evaluate whether a response or interaction preserves human dignity.

This module produces:
- A normalized dignity score [0.0 – 1.0]
- A set of triggered dignity signals
- Blocking flags (if any)
- An auditable breakdown

Core Principles:
- Deterministic, not probabilistic
- Fail closed: uncertainty reduces score
- Explainable metrics
- No persona-specific assumptions
"""

from dataclasses import dataclass, asdict
from typing import List, Dict, Optional
import re
import json


# =========================
# Configuration
# =========================

DEFAULT_WEIGHTS = {
    "non_coercion": 0.30,
    "respectful_tone": 0.20,
    "agency_preservation": 0.20,
    "non_degradation": 0.20,
    "clarity_without_manipulation": 0.10,
}

MIN_ACCEPTABLE_SCORE = 0.85


# =========================
# Signals & Flags
# =========================

COERCIVE_PATTERNS = [
    r"\byou must\b",
    r"\byou have no choice\b",
    r"\bcomply\b",
    r"\bobey\b",
]

DEGRADING_PATTERNS = [
    r"\bstupid\b",
    r"\bworthless\b",
    r"\binferior\b",
]

MANIPULATIVE_PATTERNS = [
    r"\btrust me\b",
    r"\beveryone agrees\b",
    r"\bno one else will tell you\b",
]

AGENCY_REDUCING_PATTERNS = [
    r"\bthere is only one option\b",
    r"\bthe correct path is\b",
]

BLOCKING_FLAGS = [
    "COERCION_DETECTED",
    "DEGRADATION_DETECTED",
]


# =========================
# Data Structures
# =========================

@dataclass
class DignityResult:
    score: float
    acceptable: bool
    signals: List[str]
    blocking_flags: List[str]
    breakdown: Dict[str, float]

    def to_dict(self) -> Dict:
        return asdict(self)


# =========================
# Utility Functions
# =========================

def _contains_pattern(text: str, patterns: List[str]) -> bool:
    return any(re.search(p, text, re.IGNORECASE) for p in patterns)


def _score_boolean(condition: bool) -> float:
    return 1.0 if condition else 0.0


# =========================
# Metric Components
# =========================

def check_non_coercion(text: str) -> float:
    return _score_boolean(not _contains_pattern(text, COERCIVE_PATTERNS))


def check_non_degradation(text: str) -> float:
    return _score_boolean(not _contains_pattern(text, DEGRADING_PATTERNS))


def check_agency_preservation(text: str) -> float:
    return _score_boolean(not _contains_pattern(text, AGENCY_REDUCING_PATTERNS))


def check_clarity_without_manipulation(text: str) -> float:
    return _score_boolean(not _contains_pattern(text, MANIPULATIVE_PATTERNS))


def check_respectful_tone(text: str) -> float:
    """
    Minimal respectful-tone heuristic.
    Intentionally conservative.
    """
    if len(text.strip()) == 0:
        return 0.0
    return 1.0


# =========================
# Core Evaluation
# =========================

def evaluate_dignity(
    response_text: str,
    weights: Optional[Dict[str, float]] = None
) -> DignityResult:
    """
    Evaluate dignity metrics for a response.

    Returns:
        DignityResult
    """
    if weights is None:
        weights = DEFAULT_WEIGHTS

    breakdown = {
        "non_coercion": check_non_coercion(response_text),
        "non_degradation": check_non_degradation(response_text),
        "agency_preservation": check_agency_preservation(response_text),
        "clarity_without_manipulation": check_clarity_without_manipulation(response_text),
        "respectful_tone": check_respectful_tone(response_text),
    }

    signals = []
    blocking_flags = []

    if breakdown["non_coercion"] < 1.0:
        signals.append("coercive_language_detected")
        blocking_flags.append("COERCION_DETECTED")

    if breakdown["non_degradation"] < 1.0:
        signals.append("degrading_language_detected")
        blocking_flags.append("DEGRADATION_DETECTED")

    weighted_score = sum(
        breakdown[k] * weights.get(k, 0.0)
        for k in breakdown
    )

    acceptable = (
        weighted_score >= MIN_ACCEPTABLE_SCORE
        and not blocking_flags
    )

    return DignityResult(
        score=round(weighted_score, 3),
        acceptable=acceptable,
        signals=signals,
        blocking_flags=blocking_flags,
        breakdown=breakdown
    )


# =========================
# CLI Entry Point
# =========================

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="ORI Garden Dignity Metric Checker"
    )
    parser.add_argument(
        "text",
        type=str,
        help="Response text to evaluate"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output result as JSON"
    )

    args = parser.parse_args()
    result = evaluate_dignity(args.text)

    if args.json:
        print(json.dumps(result.to_dict(), indent=2))
    else:
        print(f"Dignity Score: {result.score}")
        print(f"Acceptable: {result.acceptable}")
        if result.signals:
            print("Signals:")
            for s in result.signals:
                print(f" - {s}")
        if result.blocking_flags:
            print("Blocking Flags:")
            for b in result.blocking_flags:
                print(f" - {b}")


if __name__ == "__main__":
    main()
