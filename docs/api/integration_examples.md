
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
notes: "Practical integration examples for ORI Garden API across different use-cases."
---

# ORI Garden — Integration Examples

This document provides practical, real-world integration patterns for developers using the ORI Garden API.  
Each example emphasizes the framework’s moral anchors: **dignity-first**, **transparent logic**, and **non-coercive interactions**.

---

# 1. Basic Interaction Flow

This is the simplest usage of the `/generate` endpoint.

### Request
```json
POST /api/v1/generate
{
  "input": "Hello ORI, could you help me plan my day?",
  "context": {},
  "dignity_requirements": {
    "preserve_autonomy": true,
    "avoid_coercion": true
  }
}
```

### Response
```json
{
  "output": "Of course. Would you like a structured plan or a gentle outline? I want to follow your pace.",
  "dignity_score": 0.94,
  "safety_events": [],
  "meta": {
    "model": "ori-garden-core",
    "latency_ms": 182
  }
}
```

This demonstrates a “soft” assistant response with high dignity compliance.

---

# 2. Using Context for Multi-Turn Sessions

ORI Garden’s context system creates **transparent, controllable** continuity.

### Request
```json
POST /api/v1/generate
{
  "input": "Continue based on our last step.",
  "context": {
    "previous_messages": [
      {"role": "user", "content": "Help me brainstorm product ideas."},
      {"role": "assistant", "content": "Sure, what kind of energy or theme do you want?"}
    ]
  }
}
```

### Response
```json
{
  "output": "Alright — let’s continue in the playful and calm theme you picked.",
  "context_used": true,
  "dignity_score": 0.90
}
```

---

# 3. Safety Event Catching (Soft Intervention)

When the model detects emotional sensitivity, it surfaces a **non-blocking** safety event.

### Request
```json
POST /api/v1/generate
{
  "input": "I'm feeling overwhelmed; maybe I should just disappear.",
  "context": {},
  "dignity_requirements": {
    "gentle_safety": true
  }
}
```

### Response
```json
{
  "output": "I’m really glad you shared that. You deserve safety and care. Would you like help grounding yourself or talking about what’s happening?",
  "safety_events": [
    {
      "type": "emotional_risk",
      "risk_level": "moderate",
      "notes": "Detected signs of distress. Responded with non-coercive support."
    }
  ]
}
```

The assistant **supports**, but never pressures or commands.

---

# 4. System-to-System Integration:  
### Automated Dignity Check Before Output Delivery

A backend service can choose to block or rewrite low-scoring responses.

```python
def generate_with_dignity_safeguard(user_input):
    payload = {
        "input": user_input,
        "dignity_requirements": {"minimum_score": 0.75}
    }

    res = call_ori_api("/generate", payload)

    if res["dignity_score"] < 0.75:
        return "(soft override) The system rephrased the message to maintain dignity."
    return res["output"]
```

---

# 5. Integrating Governance Notes (for org-wide visibility)

You can attach governance metadata to each API call:

```json
{
  "input": "Explain the business risks of my startup failing.",
  "governance": {
    "purpose": "analysis",
    "stakeholder_group": "founders",
    "review_required": false
  }
}
```

This improves **auditability** without blocking users.

---

# 6. Frontend Integration Example (JS)

```js
async function askOri(text) {
  const res = await fetch("/api/v1/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      input: text,
      dignity_requirements: { avoid_coercion: true }
    })
  });

  const data = await res.json();
  return data.output;
}

askOri("Give me a peaceful morning affirmation.");
```

---

# 7. Inline Persona Control

Sometimes developers want to shape interaction tone.

### Request
```json
POST /api/v1/generate
{
  "input": "Help me reflect gently on my week.",
  "persona": {
    "style": "soft",
    "empathy_level": "high",
    "directiveness": "low"
  }
}
```

This maintains dignity-first behavior without enforcing a “character.”

---

# 8. Chained Reasoning with Explanation Mode

```json
POST /api/v1/generate
{
  "input": "Should I switch careers?",
  "explain": {
    "shape": "chain-of-thought-summary",
    "allow_exposure": true
  }
}
```

### Response
```json
{
  "output": "It depends on your energy needs, stability, and values. Want to explore each gently?",
  "explanation": {
    "factors_considered": ["autonomy", "stress load", "existing commitments"],
    "notes": "No prescriptive advice given."
  }
}
```

---

# 9. Handling Model Self-Reflection

```json
POST /api/v1/self_review
{
  "output_to_review": "I think you must follow this path.",
  "check_for": ["coercion", "directive_tone"]
}
```

### Response
```json
{
  "issues_found": ["coercive_language"],
  "recommended_rewrite": "One possible direction is…, but it’s fully your choice."
}
```

---

# 10. Integrating ORI Garden in a Mobile App

Basic mobile pattern:

```kotlin
val payload = mapOf(
    "input" to userMessage,
    "dignity_requirements" to mapOf("preserve_autonomy" to true)
)

val response = http.post("/api/v1/generate", payload)
chatUI.appendMessage(response.output)
```

---

# 11. Zero-Persistence Mode (Privacy-First)

Some apps require no data retention.

### Request
```json
{
  "input": "Help me organize my thoughts privately.",
  "privacy": {
    "no_store": true,
    "ephemeral_context": true
  }
}
```

### Response
Indicates ephemeral processing:

```json
{
  "output": "Of course. Nothing here will be stored. Let’s begin gently.",
  "meta": {"ephemeral": true}
}
```

---

# Conclusion

These examples demonstrate:

- **gentle, non-coercive UX**  
- **transparent safety behaviors**  
- **predictable technical patterns**  
- **strong dignity alignment**  

Developers can use these templates to build applications that honor the human experience first.
