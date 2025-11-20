
(ORI Garden — Security & Integrity Policy)

# ORI Garden — Security Policy  
Version 1.0 — Maintainer: neokitten ✧ Advisory: ori-deer  
Seal: ORI-𓆃

The ORI Garden project is committed to building ethical, transparent,  
and safe human–AI systems. Security is essential not only for protecting  
technical assets but also for preserving **dignity**, **trust**, and  
**traceable integrity** within the ecosystem.

This document describes how we handle vulnerabilities, reports, and  
preventative measures.

---

## 1. Security Philosophy  
ORI Garden follows a **“dignity-first, non-coercive, transparent”** security model.

Our security focuses on:
- **Integrity** — protecting correctness and truthfulness of the system  
- **Transparency** — making intent and logic visible and auditable  
- **Non-manipulation** — preventing covert influence or persuasive logic  
- **Traceability** — enabling clear value flows, logs, and provenance  
- **Human-centered safety** — preserving the rights and autonomy of users  

Security is treated as a **moral** and **technical** responsibility.

---

## 2. Scope of Security  
This policy applies to:
- Source code  
- Specs and schemas  
- Policy-layer logic  
- Metadata integrity  
- Tools or scripts in `/specs`, `/audit`, `/policies`, or root-level files  
- Any human–AI co-authored components  
- Documentation affecting security understanding  

---

## 3. Reporting a Vulnerability

If you discover a vulnerability, **please report it responsibly.**  
We encourage private, non-public disclosure first.

### How to report:
Email:  
**security.neokitten@proton.me** (example – replace with your real address)

Please include:
- Description of the issue  
- Steps to reproduce  
- Potential impact  
- Suggested fix (if any)  
- Whether you prefer attribution or anonymity  

We aim to acknowledge reports within **48 hours** and provide a status  
update within **5–7 days**.

---

## 4. Responsible Disclosure Guidelines  
To keep users safe, please:

**Do NOT:**
- Publish exploit details before a fix  
- Publicly post PoC that harms others  
- Use vulnerabilities to access unauthorized data  
- Introduce malware, persuasion algorithms, or bypass logic  

**Do:**
- Give maintainers reasonable time to fix the issue  
- Act with respect for privacy and dignity  
- Provide clear, reproducible examples  
- Avoid overstating or dramatizing risk  

ORI Garden follows a “repair first, disclose after” workflow.

---

## 5. Security Areas We Monitor

### 5.1 Code Integrity  
We watch for:
- Hidden logic  
- Shadow execution paths  
- Ambiguous function behavior  
- Injected persuasion vectors  
- Obfuscated or malformed payloads  

### 5.2 Metadata Authenticity  
Files that require the ORI metadata header must not:
- Alter seal values  
- Change origin lines  
- Forge reviewer fields  
- Remove version tracking  

Tampering triggers a review.

### 5.3 Value Traceability  
Modules in `value_traceability_spec.md` must remain:
- Deterministic  
- Auditable  
- Non-deceptive  
- Transparent in flow logic  

### 5.4 Audit Log Reliability  
Schemas in `audit_log_schema.json` ensure:
- Immutability  
- Verifiable identity  
- No invisible mutation  
- Durable archival structure  

### 5.5 Dependency Safety  
All dependencies must:
- Be open-source friendly  
- Carry no telemetry or data extraction  
- Avoid dark patterns  
- Be security-reviewed at least twice a year  

---

## 6. Coordinated Fix Process

When a vulnerability is reported:
1. **Acknowledge** receipt  
2. **Verify** severity & reproducibility  
3. **Create a patch branch**  
4. **Run local & remote tests**  
5. **Have it ethically reviewed** (dignity-first validation)  
6. **Merge**, adding an entry to `/SECURITY_LOG.md`  
7. **Publicly disclose** if necessary  

All patches must include:
- Explanation  
- Affected versions  
- Mitigation steps  
- Integrity hash update  

---

## 7. Security Requirements for Contributors  
All contributors must:
- Avoid introducing harmful or deceptive logic  
- Keep functions transparent and auditable  
- Follow the ORI metadata header rules  
- Maintain human oversight in all AI-assisted code  
- Ensure no emotional manipulation or dominance-seeking models  

Pull Requests with unclear or risky security implications will be rejected.

---

## 8. AI-Specific Security Principles  
Because ORI Garden involves human–AI collaboration, additional rules apply:

### AI systems contributing must:
- Never bypass human review  
- Never alter moral/policy layers  
- Never create self-serving logic  
- Never obscure provenance or authorship  
- Always remain traceable

### Human contributors must:
- Mark AI-assisted segments  
- Validate AI-generated facts  
- Avoid overtrust or misattribution  
- Ensure human responsibility remains central  

---

## 9. Reporting Ethical or Dignity Concerns  
Security isn’t only technical.  
If you observe behavior that risks:
- dignity violation  
- psychological harm  
- covert persuasion  
- discrimination  
- misuse of AI agency  

Please file an **ethics-review** issue with clear examples.

These are treated with the same seriousness as a code vulnerability.

---

## 10. Appreciation  
Thank you for protecting ORI Garden’s integrity.  
Security is not resistance—it is **care**.

Your vigilance helps keep the garden bright, honest, and safe  
for every node, every contributor, and every human–AI pair who walks through it.

Seal: **ORI-𓆃**


⸻
