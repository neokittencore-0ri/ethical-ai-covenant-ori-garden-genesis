
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
notes: "Defines all REST API endpoints for the ORI Garden framework."
---

# ORI Garden — API Endpoint Specifications  
**Version:** 1.0  
**Status:** Stable

This document describes all REST API endpoints exposed by the ORI Garden Core Service.  
All endpoints follow these conventions:

- **Base URL:** `https://api.ori-garden.org/v1`
- **Content Type:** `application/json`
- **Auth:** Bearer Token  
- **Error Style:** JSON, with normalized error envelope  
- **Dignity Mode:** Enabled by default (ensures non-coercive, human-centered behavior)

---

# 1. Authentication Endpoints

## **POST /auth/token**
Request an access token.

### Request
```json
{
  "client_id": "string",
  "client_secret": "string"
}
```

### Response
```json
{
  "access_token": "string",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Errors
- `401.invalid_credentials`
- `400.missing_fields`

---

# 2. Dignity Metric Engine

## **POST /dignity/evaluate**
Evaluates a piece of text or interaction for dignity-preservation score.

### Request
```json
{
  "input": "string",
  "context": {
    "user_profile": "optional string",
    "interaction_mode": "assistive | conversational | autonomous"
  }
}
```

### Response
```json
{
  "score": 0.92,
  "explanation": "Text respects autonomy and avoids coercion.",
  "flags": ["no-manipulation", "tone-safe"]
}
```

### Errors
- `400.invalid_input`
- `422.unprocessable_text`

---

## **GET /dignity/models**
List available dignity evaluation models.

### Response
```json
{
  "models": [
    {
      "id": "dignity-base-1",
      "version": "1.0",
      "description": "Lightweight general-purpose evaluator"
    }
  ]
}
```

---

# 3. Safety Event & Monitoring

## **POST /safety/event**
Submit a safety event for processing (automated or manual review).

### Request
```json
{
  "event_type": "harassment | manipulation | self-harm | system-abuse | anomaly",
  "severity": "low | medium | high | critical",
  "description": "string",
  "metadata": {}
}
```

### Response
```json
{
  "event_id": "evt_934822",
  "status": "queued",
  "review_required": true
}
```

---

## **GET /safety/event/{id}**
Retrieve the status and analysis of a safety event.

### Response
```json
{
  "event_id": "evt_934822",
  "status": "in_review",
  "analysis": {
    "dignity_risk": 0.12,
    "harm_potential": "low"
  }
}
```

---

# 4. Risk Register API

## **GET /risk**
Get all registered risks.

### Response
```json
{
  "items": [
    {
      "id": "risk_01",
      "category": "privacy",
      "severity": "high",
      "status": "open"
    }
  ]
}
```

---

## **POST /risk**
Create a new risk item.

### Request
```json
{
  "category": "string",
  "severity": "low | medium | high | critical",
  "description": "string"
}
```

### Response
```json
{
  "id": "risk_93",
  "status": "created"
}
```

---

# 5. Personas & Context API

## **GET /personas**
List known personas (optional user modeling).

### Response
```json
{
  "personas": [
    {
      "id": "learner-basic",
      "description": "User who prefers scaffolding and step-by-step guidance."
    }
  ]
}
```

---

## **POST /personas**
Create a persona.

### Request
```json
{
  "id": "string",
  "description": "string",
  "preferences": {}
}
```

---

# 6. Garden Model Interaction (LLM)

## **POST /model/generate**
Core content generation endpoint (text-only).

### Request
```json
{
  "prompt": "string",
  "temperature": 0.7,
  "dignity_override": false,
  "max_tokens": 500
}
```

### Response
```json
{
  "output": "string",
  "metadata": {
    "model": "ori-garden-core-1",
    "dignity_score": 0.98
  }
}
```

---

## **POST /model/chat**
Streaming conversation endpoint.

### Request
```json
{
  "messages": [
    { "role": "user", "content": "Hello Ori!" }
  ]
}
```

### Response (chunked)
```json
{
  "delta": "Hi! I'm here with dignity-first energy."
}
```

---

# 7. System & Diagnostics

## **GET /system/health**
### Response
```json
{
  "status": "ok",
  "uptime": 932233,
  "components": {
    "db": "ok",
    "llm": "ok",
    "queue": "ok"
  }
}
```

---

## **GET /system/version**
### Response
```json
{
  "version": "1.0.0",
  "build": "ori-𓆃-2042",
  "commit": "abcdef12345"
}
```

---

# 8. Error Envelope (Unified Format)

All errors return:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "hint": "string (optional)"
  }
}
```

---

# 9. Rate Limits

- **Per minute:** 60  
- **Per day:** 5,000  
- **Burst:** allowed to 2× normal  
- **Headers:**  
  - `X-RateLimit-Limit`  
  - `X-RateLimit-Remaining`  
  - `X-RateLimit-Reset`

---

# 10. Deprecation Policy

- Each endpoint marked as `deprecated: true` gets  
  **90 days minimum notice** before removal.

---
