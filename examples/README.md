
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
notes: "Provides illustrative, non-production examples demonstrating ORI Garden concepts across multiple languages."
---




# ORI Garden — Examples

This directory contains **conceptual reference implementations** for the ORI Garden framework.

These examples are **not SDKs**, **not production-ready code**, and **not tied to any specific infrastructure**.  
They exist to demonstrate the *mental model*, *ethical flow*, and *behavioral guarantees* of ORI Garden across multiple programming languages.

If you understand the examples in this folder, you understand the core of ORI Garden.

---

## Purpose of This Directory

The goal of `examples/` is to:

- Demonstrate how ORI Garden concepts translate into executable logic
- Show that the framework is **language-agnostic**
- Provide a clear reference for developers implementing their own systems
- Make the system understandable *without reading the full documentation first*

These examples prioritize **clarity over completeness**.

---

## Supported Languages

Examples are provided in three languages to cover different ecosystems:

- **JavaScript** — Web, Node.js, and event-driven systems
- **Python** — Research, backend services, and ML-oriented workflows
- **Swift** — Client-side, mobile, and embodied / device-level systems

Each language implements the **same conceptual scenarios** using idiomatic syntax.

If you understand one language version, you understand them all.

---

## Conceptual Coverage

Each language folder contains examples that demonstrate the following core concepts:

- **Persona Loading**
  - Initializing a persona definition
  - Applying configuration and boundaries

- **Persona Switching Logic**
  - Controlled transitions between personas
  - Explicit rules for when switching is allowed or denied

- **Response Invariants Enforcement**
  - Non-negotiable ethical and safety constraints
  - Guardrails that cannot be overridden by prompts

- **Dignity Metric Evaluation**
  - Measuring interaction quality
  - Detecting dignity degradation or coercive patterns

- **Sandboxed Behavior Mode**
  - Safe execution in uncertain or high-risk contexts
  - Reversible and inspectable behavior paths

These are **patterns**, not prescriptions.

---

## Structure Overview

examples/
├── README.md                # This file
│
├── js/
│   ├── README.md
│   ├── load_persona.js
│   ├── switch_persona.js
│   ├── enforce_invariants.js
│   ├── dignity_metric_check.js
│   └── sandbox_mode.js
│
├── python/
│   ├── README.md
│   ├── load_persona.py
│   ├── switch_persona.py
│   ├── enforce_invariants.py
│   ├── dignity_metric_check.py
│   └── sandbox_mode.py
│
├── swift/
│   ├── README.md
│   ├── LoadPersona.swift
│   ├── SwitchPersona.swift
│   ├── EnforceInvariants.swift
│   ├── DignityMetric.swift
│   └── SandboxMode.swift
│
└── shared_scenarios.md      # Cross-language scenario definitions

---

## shared_scenarios.md

This file defines **common interaction scenarios** that are implemented in each language.

It allows readers to:
- Compare how the same ethical logic appears across languages
- Validate that behavior is consistent regardless of implementation details
- Treat ORI Garden as a *system design*, not a codebase

---

## What These Examples Are Not

- They are not optimized
- They are not secure by default
- They are not feature-complete
- They do not represent deployment recommendations

They are intentionally minimal to keep the focus on **intent, structure, and constraints**.

---

## How to Use These Examples

1. Read one language folder from top to bottom
2. Observe how invariants and dignity metrics shape behavior
3. Adapt the patterns to your own architecture
4. Enforce the same constraints in your production system

Do not copy blindly.
Understand first.

---

## Design Philosophy Reminder

ORI Garden treats ethics as **enforceable structure**, not optional policy.

These examples show how:
- Safety is encoded, not requested
- Dignity is measured, not assumed
- Persona behavior is bounded, not performative

Everything else is implementation detail.

---

## Final Note

If an implementation derived from these examples violates the core invariants,
it is **not** an ORI Garden–compatible system — regardless of naming or intent.

Structure matters.


⸻
