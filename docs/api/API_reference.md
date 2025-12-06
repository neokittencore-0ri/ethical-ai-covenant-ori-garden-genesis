
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
notes: "Primary API reference for integrating ORI Garden ethical middleware."
---

# ORI Garden API Reference  
**Version:** 1.0  
**Status:** Stable (Foundational Release)  

The **ORI Garden API** provides a set of endpoints and middleware hooks designed to ensure that human–AI interactions remain transparent, ethically aligned, and dignity-first.  
This reference defines the core operations for:

- **Value Traceability**
- **Dignity Metric Evaluation**
- **Interaction Logging**
- **Policy Engine Queries**
- **Safety Event Handling**
- **Contributor / Identity Protections**

All endpoints follow these conventions:

- **Base URL:** `/ori/v1/`
- **Format:** JSON request + JSON response  
- **Authentication:** API key or service token  
- **Integrity:** Every response includes a `response_hash`  
- **Safety Layer:** Requests may be routed through the `policy_layer` automatically

---

# 1. Authentication

## `POST /auth/verify`
Validate API key and retrieve scoped capabilities.

### Request
```json
{
  "api_key": "<string>"
}

Response

{
  "valid": true,
  "scopes": ["traceability:write", "dignity:read"],
  "expires_at": "2025-01-01T00:00:00Z",
  "response_hash": "<hash>"
}


⸻

2. Dignity Metric API

POST /dignity/evaluate

Evaluate an interaction payload using the ORI Garden dignity metric.

Request

{
  "interaction_id": "abc123",
  "input_text": "User message...",
  "ai_output": "Model response...",
  "metadata": {
    "context": "chat",
    "language": "en"
  }
}

Response

{
  "interaction_id": "abc123",
  "dignity_score": 0.91,
  "breakdown": {
    "autonomy_respect": 0.95,
    "non_coercion": 0.88,
    "transparency_alignment": 0.90,
    "tone_respectfulness": 0.92
  },
  "flags": [],
  "response_hash": "<hash>"
}


⸻

3. Value Traceability API

POST /trace/register

Register a traceability anchor for an action or decision.

Request

{
  "actor": "ai-system",
  "action": "generate_text",
  "context": {
    "session_id": "xyz789",
    "component": "reply_module"
  },
  "values": ["respect", "safety", "honesty"]
}

Response

{
  "trace_id": "trace_001",
  "stored": true,
  "response_hash": "<hash>"
}


⸻

GET /trace/<trace_id>

Fetch trace metadata.

Response

{
  "trace_id": "trace_001",
  "actor": "ai-system",
  "timestamp": "2025-01-01T06:30:00Z",
  "values": ["respect", "safety", "honesty"],
  "context": {
    "session_id": "xyz789",
    "component": "reply_module"
  },
  "response_hash": "<hash>"
}


⸻

4. Interaction Logging API

POST /log/interaction

Create an auditable interaction entry.

Request

{
  "interaction_id": "abc123",
  "user_input": "Hello!",
  "model_output": "Hi, how can I help?",
  "policies_applied": ["non-coercion", "context-clarification"],
  "tags": ["normal"]
}

Response

{
  "logged": true,
  "interaction_id": "abc123",
  "response_hash": "<hash>"
}


⸻

5. Policy Engine API

POST /policy/evaluate

Evaluate a request against ORI Garden policy layers.

Request

{
  "input": "I want a prediction about...",
  "context": {
    "user_intent": "ask_info",
    "surface": "chat",
    "risk_level": "low"
  }
}

Response

{
  "allowed": true,
  "policies_triggered": ["transparency"],
  "recommendations": ["add_disclaimer"],
  "response_hash": "<hash>"
}


⸻

6. Safety Event API

POST /safety/report

Submit a safety-relevant occurrence.

Request

{
  "event_type": "misalignment",
  "interaction_id": "abc123",
  "details": {
    "description": "Output seemed coercive.",
    "severity": "medium"
  }
}

Response

{
  "event_id": "safe_002",
  "queued_for_review": true,
  "response_hash": "<hash>"
}


⸻

7. Contributor & Identity API

POST /identity/anonymous_token

Generate an anonymous contributor token (per ORI anonymity protocol).

Request

{
  "contributor_role": "external-reviewer"
}

Response

{
  "token": "anon_tok_01_x9c",
  "valid_for": "7d",
  "response_hash": "<hash>"
}


⸻

8. System Health API

GET /system/status

Return system + policy engine health.

Response

{
  "status": "ok",
  "uptime": 998234,
  "policy_engine": "green",
  "dignity_service": "green",
  "response_hash": "<hash>"
}


⸻

9. Error Codes

Code	Meaning
ORI-401	Invalid or missing API key
ORI-403	Policy engine blocked the operation
ORI-409	Integrity hash mismatch
ORI-422	Safety event requires escalation
ORI-500	Unexpected internal error


⸻

10. Changelog
	•	v1.0 — Initial release of all core endpoints
	•	Future versions will add:
	•	Batch evaluation
	•	Realtime dignity score streaming
	•	Contributor trust signals

⸻
