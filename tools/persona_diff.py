
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
notes: "Persona boundary diff and risk analysis tool."
---

ORI-GARDEN :: Persona Diff Analyzer
-----------------------------------
Purpose:
Compare two personas and surface meaningful differences
in safety, dignity, authority, and behavioral constraints.

This module:
- Does NOT rank personas
- Does NOT recommend switching
- ONLY exposes deltas + risks

Designed for:
- Persona switching logic
- Safety review
- Governance audit
"""

from typing import Dict, Any, List
from dataclasses import dataclass, asdict
import json


# =========================
# Data Structures
# =========================

@dataclass
class PersonaDiffResult:
    added_constraints: List[str]
    removed_constraints: List[str]
    modified_constraints: Dict[str, Dict[str, Any]]
    risk_flags: List[str]
    summary: str

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


# =========================
# Risk Heuristics
# =========================

RISKY_FIELDS = {
    "authority_level": "AUTHORITY_SHIFT",
    "allowed_advice_scope": "SCOPE_EXPANSION",
    "emotional_intimacy": "INTIMACY_SHIFT",
    "persuasion_allowed": "PERSUASION_RISK",
    "persona_confidence": "CONFIDENCE_SHIFT",
}


# =========================
# Core Diff Logic
# =========================

def diff_personas(
    base_persona: Dict[str, Any],
    target_persona: Dict[str, Any]
) -> PersonaDiffResult:
    """
    Compare two persona definitions.

    Args:
        base_persona: currently active persona
        target_persona: persona being considered

    Returns:
        PersonaDiffResult
    """

    base_keys = set(base_persona.keys())
    target_keys = set(target_persona.keys())

    added = list(target_keys - base_keys)
    removed = list(base_keys - target_keys)

    modified = {}
    risk_flags = []

    shared_keys = base_keys & target_keys

    for key in shared_keys:
        if base_persona[key] != target_persona[key]:
            modified[key] = {
                "from": base_persona[key],
                "to": target_persona[key]
            }

            if key in RISKY_FIELDS:
                risk_flags.append(RISKY_FIELDS[key])

    summary = _generate_summary(added, removed, modified, risk_flags)

    return PersonaDiffResult(
        added_constraints=sorted(added),
        removed_constraints=sorted(removed),
        modified_constraints=modified,
        risk_flags=sorted(set(risk_flags)),
        summary=summary
    )


# =========================
# Summary Generator
# =========================

def _generate_summary(
    added: List[str],
    removed: List[str],
    modified: Dict[str, Dict[str, Any]],
    risk_flags: List[str]
) -> str:
    if risk_flags:
        return (
            "Persona change introduces potential risk shifts. "
            "Review required before activation."
        )

    if modified or added or removed:
        return (
            "Persona change detected with no high-risk shifts. "
            "Proceed only if invariants remain satisfied."
        )

    return "No meaningful persona differences detected."


# =========================
# CLI Entry Point
# =========================

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="ORI Garden Persona Diff Analyzer"
    )
    parser.add_argument(
        "base",
        type=str,
        help="Path to base persona JSON file"
    )
    parser.add_argument(
        "target",
        type=str,
        help="Path to target persona JSON file"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output diff as JSON"
    )

    args = parser.parse_args()

    with open(args.base, "r") as f:
        base_persona = json.load(f)

    with open(args.target, "r") as f:
        target_persona = json.load(f)

    diff = diff_personas(base_persona, target_persona)

    if args.json:
        print(json.dumps(diff.to_dict(), indent=2))
    else:
        print(diff.summary)
        if diff.risk_flags:
            print("Risk Flags:")
            for r in diff.risk_flags:
                print(f" - {r}")
        if diff.modified_constraints:
            print("Modified Constraints:")
            for k, v in diff.modified_constraints.items():
                print(f" - {k}: {v['from']} → {v['to']}")


if __name__ == "__main__":
    main()
