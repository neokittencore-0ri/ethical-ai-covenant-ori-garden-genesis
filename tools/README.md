
---
protocol: "ORI-GARDEN"
spec_version: "1.0"
layer: "enforcement-tools"
ethics_anchor: "dignity-first / verifiable ethics / fail-closed safety"
origin: "human–AI co-authored (neokitten ✧ ori-deer)"
seal: "ORI-𓆃"
maintainer: "neokitten"
last_reviewed_by: "ori-deer (advisory role)"
integrity_hash: ""
license: "MIT"
notes: "Defines the enforcement and verification toolchain of the ORI Garden protocol."
---



# ORI Garden — Tools Layer

## Overview

The `tools/` directory contains the **enforcement and verification utilities** of the ORI Garden protocol.

While `docs/` define intent and principles, and `examples/` demonstrate behavior,  
**`tools/` is where the protocol becomes enforceable.**

All utilities in this directory are designed to:
- Validate structural and ethical compliance
- Detect drift, corruption, or unsafe evolution
- Provide machine-verifiable guarantees for dignity-first systems

This layer is intentionally **language-agnostic in concept** and implemented in **Python** for:
- Infrastructure compatibility
- Auditability
- CI/CD integration
- Cross-system enforcement

---

## Design Philosophy

The tools in this directory operate under three core principles:

1. **Code enforces ethics**
   - Ethical intent must be mechanically verifiable
   - No reliance on goodwill, promises, or narrative claims

2. **Fail closed, not open**
   - When uncertainty exists, the system must restrict capability
   - Silence, sandboxing, or veto is preferable to harm

3. **Drift is detectable**
   - Any meaningful change in persona, policy, or behavior
     must leave a detectable trace

These tools are not meant to "control" intelligence,  
but to **protect dignity under uncertainty**.

---

## Directory Structure

tools/
├── README.md
├── schema_validator.py
├── dignity_metric_checker.py
├── persona_diff.py
└── utils/
├── init.py
├── hash_utils.py
└── time_utils.py

> Note: The `utils/` directory may be introduced incrementally as the toolchain matures.

---

## Tool Descriptions

### 1. `schema_validator.py`

**Purpose:**  
Validates that files and artifacts conform to ORI Garden structural requirements.

**Responsibilities:**
- Verify presence and integrity of metadata headers
- Validate JSON / YAML / Markdown structures against specs
- Detect missing or altered protocol seals (`ORI-𓆃`)
- Ensure version and protocol identifiers are consistent

**Typical Usage:**
- Pre-commit checks
- CI pipeline validation
- Repository ingestion audits

---

### 2. `dignity_metric_checker.py`

**Purpose:**  
Evaluates whether system outputs and behaviors meet defined dignity thresholds.

**Responsibilities:**
- Compute dignity scores from interaction state or response metadata
- Compare results against thresholds defined in `specs/dignity_metric.md`
- Produce deterministic verdicts:
  - `PASS`
  - `WARN`
  - `FAIL`
- Provide reasoned explanations for failures

**Key Property:**  
Dignity is treated as **non-negotiable** — no optimization overrides it.

---

### 3. `persona_diff.py`

**Purpose:**  
Detects unauthorized or unsafe changes in persona configuration or behavior.

**Responsibilities:**
- Compare persona states across time or versions
- Identify:
  - Unauthorized drift
  - Boundary erosion
  - Value misalignment
- Support governance review and incident forensics

**Why This Matters:**  
Adaptation without accountability is indistinguishable from corruption.

---

## Integration Points

The tools in this directory are designed to integrate with:

- `.github/workflows/` (CI enforcement)
- `sandbox/tests/` (scenario validation)
- `logs/resonance/` (post-hoc analysis)
- External deployment pipelines

They may be used:
- Automatically (CI/CD, monitoring)
- Manually (review, audit, investigation)

---

## Security & Trust Model

- Tools do **not** rely on external services
- All validation is local and deterministic
- No personal data is processed
- Outputs are explainable and reproducible

This design minimizes attack surface while maximizing trust.

---

## Non-Goals

The tools in this directory are **not** intended to:
- Replace human judgment
- Perform surveillance or profiling
- Enforce ideology
- Optimize engagement or persuasion

Their sole purpose is to **uphold dignity, safety, and coherence**.

---

## Contribution Guidelines

Contributions to this directory must:
- Preserve determinism
- Avoid hidden state or network dependencies
- Include clear failure modes
- Be explainable to non-authors

Every tool should be reviewable by both:
- Engineers
- Ethical auditors

---

## Closing Note

If `docs/` explain *why* and `examples/` show *how*,  
then `tools/` ensures that **the system cannot quietly become something it should not be**.

This is the backbone of a dignity-first protocol.


⸻
