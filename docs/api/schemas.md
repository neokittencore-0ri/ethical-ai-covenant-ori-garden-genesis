
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
notes: "Contains all shared JSON schema structures used across ORI Garden API endpoints."
---

# ORI Garden — API Schema Definitions  
**Version:** 1.0  
**Status:** Stable**

This file defines all reusable JSON schemas used across ORI Garden endpoints.  
Schemas comply with **JSON Schema Draft 2020-12** and follow:

- consistent error envelopes  
- dignity-first safety metadata  
- strict typing  
- explicit enums  
- future-proof extensibility  

---

# 1. Standard Error Schema

```json
{
  "$id": "ori.error",
  "type": "object",
  "required": ["error"],
  "properties": {
    "error": {
      "type": "object",
      "required": ["code", "message"],
      "properties": {
        "code": { "type": "string" },
        "message": { "type": "string" },
        "hint": { "type": "string" }
      }
    }
  }
}
```

---

# 2. Dignity Evaluation Schema

```json
{
  "$id": "ori.dignity_evaluation",
  "type": "object",
  "required": ["input"],
  "properties": {
    "input": { "type": "string" },
    "context": {
      "type": "object",
      "properties": {
        "user_profile": { "type": "string" },
        "interaction_mode": {
          "type": "string",
          "enum": ["assistive", "conversational", "autonomous"]
        }
      }
    }
  }
}
```

## Response

```json
{
  "$id": "ori.dignity_response",
  "type": "object",
  "required": ["score"],
  "properties": {
    "score": { "type": "number" },
    "explanation": { "type": "string" },
    "flags": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

---

# 3. Safety Event Schema

```json
{
  "$id": "ori.safety_event",
  "type": "object",
  "required": ["event_type", "severity", "description"],
  "properties": {
    "event_type": {
      "type": "string",
      "enum": [
        "harassment",
        "manipulation",
        "self-harm",
        "system-abuse",
        "anomaly"
      ]
    },
    "severity": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"]
    },
    "description": { "type": "string" },
    "metadata": { "type": "object" }
  }
}
```

---

# 4. Risk Register Item Schema

```json
{
  "$id": "ori.risk_item",
  "type": "object",
  "required": ["category", "severity", "description"],
  "properties": {
    "category": { "type": "string" },
    "severity": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"]
    },
    "description": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["open", "mitigating", "closed"],
      "default": "open"
    }
  }
}
```

---

# 5. Persona Schema

```json
{
  "$id": "ori.persona",
  "type": "object",
  "required": ["id", "description"],
  "properties": {
    "id": { "type": "string" },
    "description": { "type": "string" },
    "preferences": { "type": "object" }
  }
}
```

---

# 6. Model Generation Request Schema

```json
{
  "$id": "ori.model_generate_request",
  "type": "object",
  "required": ["prompt"],
  "properties": {
    "prompt": { "type": "string" },
    "temperature": {
      "type": "number",
      "minimum": 0,
      "maximum": 2,
      "default": 0.7
    },
    "max_tokens": { "type": "number", "default": 500 },
    "dignity_override": { "type": "boolean", "default": false }
  }
}
```

## Model Response Schema

```json
{
  "$id": "ori.model_generate_response",
  "type": "object",
  "required": ["output"],
  "properties": {
    "output": { "type": "string" },
    "metadata": {
      "type": "object",
      "properties": {
        "model": { "type": "string" },
        "dignity_score": { "type": "number" }
      }
    }
  }
}
```

---

# 7. Chat Message Schema

```json
{
  "$id": "ori.chat_message",
  "type": "object",
  "required": ["role", "content"],
  "properties": {
    "role": {
      "type": "string",
      "enum": ["user", "assistant", "system"]
    },
    "content": { "type": "string" }
  }
}
```

---

# 8. System Health Schema

```json
{
  "$id": "ori.system_health",
  "type": "object",
  "required": ["status"],
  "properties": {
    "status": { "type": "string" },
    "uptime": { "type": "number" },
    "components": {
      "type": "object",
      "properties": {
        "db": { "type": "string" },
        "llm": { "type": "string" },
        "queue": { "type": "string" }
      }
    }
  }
}
```

---

# 9. Pagination Envelope (Shared)

```json
{
  "$id": "ori.pagination",
  "type": "object",
  "properties": {
    "limit": { "type": "number" },
    "offset": { "type": "number" },
    "total": { "type": "number" },
    "next": { "type": "string" }
  }
}
```

---

# 10. Standard Metadata Block

Used across evaluation, logging, and model interactions.

```json
{
  "$id": "ori.metadata",
  "type": "object",
  "properties": {
    "timestamp": { "type": "string", "format": "date-time" },
    "request_id": { "type": "string" },
    "dignity_score": { "type": "number" },
    "processing_time_ms": { "type": "number" }
  }
}
```

---
