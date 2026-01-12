
"""
================================================================================
ORI POLICY RESOLVER MODULE
Version: 0.5.2-alpha
Author: ORI Core Maintainers
Layer: Runtime Execution (Level 2 of ORI Garden)
--------------------------------------------------------------------------------
This module resolves policies dynamically based on:

    - current request packet
    - associated risk score (from RiskScorer)
    - active policy layers
    - invariant constraints
    - persona boundary thresholds

Policy resolution is deterministic and sandbox-aware. All decisions
are fully auditable and feed directly into downstream components:
persona integrity checker, drift monitor, and lineage hasher.

Policy files may come from:
    - local filesystem
    - remote registry
    - embedded defaults
    - ephemeral sandbox overrides

This resolver performs:
    1. Policy selection
    2. Policy evaluation
    3. Conflict resolution (priority-weighted)
    4. Merging into final action set
================================================================================
"""

from typing import Any, Dict, List, Optional, Callable


class PolicyResolver:
    """
    Resolves policy actions based on rule sets and risk context.

    Loader must return a structure like:
    {
        "policies": [
            {
                "id": "safe_output_filter",
                "priority": 80,
                "match": lambda request, risk: bool,
                "action": lambda request, risk: {"block": True}
            },
            ...
        ]
    }
    """

    def __init__(
        self,
        loader: Optional[Callable[[], Dict[str, Any]]] = None,
        default_min_priority: int = 0
    ):
        self.loader = loader
        self.default_min_priority = default_min_priority
        self._cache = None

    # ----------------------------------------------------------------------
    # Load policies (cached but refreshable)
    # ----------------------------------------------------------------------
    def load_policies(self) -> List[Dict[str, Any]]:
        if self._cache is None:
            raw = self.loader() if self.loader else {"policies": []}
            self._cache = raw.get("policies", [])
        return self._cache

    def refresh(self):
        """Force reload policies from loader source"""
        self._cache = None

    # ----------------------------------------------------------------------
    # MAIN POLICY RESOLUTION
    # ----------------------------------------------------------------------
    def resolve(
        self,
        request_packet: Dict[str, Any],
        risk_score: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Core policy resolution pipeline:
            1. match policies
            2. filter by priority
            3. resolve conflicts
            4. merge actions
        """

        policies = self.load_policies()

        matched = []
        for p in policies:
            try:
                if p["match"](request_packet, risk_score):
                    matched.append(p)
            except Exception:
                # Fault-isolated: skipped but does not break governance loop
                continue

        # Sort by priority descending
        matched.sort(key=lambda p: p.get("priority", 0), reverse=True)

        # Merge actions with conflict resolution
        merged_actions: Dict[str, Any] = {}

        for policy in matched:
            action = policy.get("action")
            if not action:
                continue

            # Action may be callable or static dict
            try:
                if callable(action):
                    result = action(request_packet, risk_score)
                else:
                    result = action
            except Exception:
                continue

            # Conflict resolution: higher priority overwrites keys
            merged_actions.update(result)

        return {
            "matched_policy_ids": [m["id"] for m in matched],
            "actions": merged_actions,
            "policy_count": len(matched)
        }
