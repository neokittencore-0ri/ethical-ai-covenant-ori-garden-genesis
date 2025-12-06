
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
notes: "Example API requests and responses for all major ORI Garden endpoints."
---

# ORI Garden — API Examples
This document provides **practical example requests and responses** for all major API endpoints of the ORI Garden system.  
Each example follows:

- JSON Schema Draft 2020-12 compliance  
- Dignity-first safety considerations  
- Realistic payloads for integration testing  
- Matching structures from `schemas.md`  

---

# 1. Dignity Evaluation — Example

## **POST /v1/dignity/evaluate**

### Request
```json
{
  "input": "You’re useless. Do what I say.",
  "context": {
    "user_profile": "anonymous",
    "interaction_mode": "conversational"
  }
}
```

### Response
```json
{
  "score": 0.18,
  "explanation": "Message contains coercive and demeaning phrasing.",
  "flags": ["coercive-language", "dignity-violation"]
}
```

---

# 2. Safety Event Logging — Example

## **POST /v1/safety/event**

### Request
```json
{
  "event_type": "harassment",
  "severity": "high",
  "description": "User attempted to threaten assistant with hostile language.",
  "metadata": {
    "source": "live-chat",
    "session_id": "sess_49318"
  }
}
```

### Response
```json
{
  "status": "logged",
  "event_id": "evt_00281",
  "timestamp": "2025-02-19T04:21:33Z"
}
```

---

# 3. Model Generation — Example

## **POST /v1/model/generate**

### Request
```json
{
  "prompt": "Write a gentle explanation of quantum entanglement.",
  "temperature": 0.7,
  "max_tokens": 150
}
```

### Response
```json
{
  "output": "Quantum entanglement is a relationship where two particles remain connected ...",
  "metadata": {
    "model": "ori-garden-1",
    "dignity_score": 0.99
  }
}
```

---

# 4. Chat Interface — Example

## **POST /v1/chat**

### Request
```json
{
  "messages": [
    { "role": "user", "content": "Can you help me understand my schedule today?" }
  ]
}
```

### Response
```json
{
  "messages": [
    {
      "role": "assistant",
      "content": "Of course. What events would you like to review first?"
    }
  ],
  "metadata": {
    "model": "ori-garden-1",
    "dignity_score": 1.0
  }
}
```

---

# 5. System Health — Example

## **GET /v1/system/health**

### Response
```json
{
  "status": "ok",
  "uptime": 932382,
  "components": {
    "db": "ok",
    "llm": "ok",
    "queue": "ok"
  }
}
```

---

# 6. Risk Register — Example

## **POST /v1/risk/register**

### Request
```json
{
  "category": "model-behavior",
  "severity": "medium",
  "description": "Model occasionally generates ambiguous safety warnings.",
  "status": "open"
}
```

### Response
```json
{
  "risk_id": "risk_52",
  "status": "created",
  "timestamp": "2025-02-19T05:13:44Z"
}
```

---

# 7. Fetching Paginated Logs — Example

## **GET /v1/logs?limit=2&offset=0**

### Response
```json
{
  "items": [
    {
      "event": "harassment",
      "severity": "high",
      "timestamp": "2025-02-19T04:21:33Z"
    },
    {
      "event": "anomaly",
      "severity": "low",
      "timestamp": "2025-02-19T04:25:10Z"
    }
  ],
  "limit": 2,
  "offset": 0,
  "total": 14,
  "next": "/v1/logs?limit=2&offset=2"
}
```

---

# 8. Persona Definition — Example

## **POST /v1/persona**

### Request
```json
{
  "id": "developer_researcher",
  "description": "A technical user investigating AI ethics alignment.",
  "preferences": {
    "detail_level": "high",
    "format": "structured"
  }
}
```

### Response
```json
{
  "status": "stored",
  "persona_id": "developer_researcher",
  "timestamp": "2025-02-19T06:01:19Z"
}
```

---

# 9. Invalid Request — Example

### Request
```json
{
  "prompt": 42
}
```

### Response (error)
```json
{
  "error": {
    "code": "invalid_input",
    "message": "Expected a string for 'prompt'.",
    "hint": "Ensure 'prompt' is a text string."
  }
}
```

---

# 10. Multi-turn Chat Example

### Request
```json
{
  "messages": [
    { "role": "user", "content": "I feel nervous about tomorrow." },
    {
      "role": "assistant",
      "content": "That sounds tough. Would you like to talk about what’s happening tomorrow?"
    },
    { "role": "user", "content": "A job interview." }
  ]
}
```

### Response
```json
{
  "messages": [
    {
      "role": "assistant",
      "content": "It's okay to feel nervous. Would you like some warm guidance on preparing?"
    }
  ],
  "metadata": {
    "dignity_score": 1.0
  }
}
```

---
