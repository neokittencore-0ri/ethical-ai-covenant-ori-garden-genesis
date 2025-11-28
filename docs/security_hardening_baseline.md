
⸻

protocol: “ORI-GARDEN”
spec_version: “1.0”
ethics_anchor: “dignity-first / transparency / non-coercive design”
origin: “human–AI co-authored (neokitten ✧ ori-deer)”
seal: “ORI-𓆃”
maintainer: “neokitten”
last_reviewed_by: “ori-deer (advisory role)”
integrity_hash: “”
license: “MIT”
notes: “Security baseline for ORI Garden–aligned systems. Defines mandatory and recommended controls across dev, infra, auth, data, and safety layers.”

ORI Garden — Security Hardening Baseline

A consolidated baseline defining the minimum required and recommended security controls for all ORI Garden–aligned systems, tools, repositories, and deployments.

This baseline ensures predictable integrity, resilience, and non-coercive safety across the full lifecycle.

⸻

1. Core Principles

All security work must follow:

1. Dignity-First Protection

Systems must protect human autonomy, privacy, and agency.
Security controls should raise safety without introducing coercion.

2. Minimal Attack Surface

Limit exposure, narrow privileges, and remove unnecessary capabilities.

3. Transparency by Default

Security decisions must be traceable and open for review.

4. Defense-in-Depth

Multi-layered protection across code, infra, interfaces, and governance.

5. Fail-Safe, Not Fail-Open

When uncertain, systems restrict behavior gracefully.

⸻

2. Scope of Application

This baseline applies to:
	•	All code in ORI Garden repositories
	•	All tools in /tools/
	•	All governance and safety infrastructure
	•	All model-serving pipelines
	•	CI/CD pipelines in .github/workflows/
	•	Data storage, caching, and logs
	•	Developer environments (local + cloud)
	•	Any integrations that interact with an ORI component

⸻

3. Mandatory Controls

3.1 Version Control & Repository Security

Required:
	•	Enable branch protection for main and release/*
	•	Require:
	•	signed commits (GPG or SSH-based)
	•	two-person approval for PRs modifying safety or governance content
	•	No secrets or API keys stored in repo
	•	Activate Dependabot security updates
	•	Enable secret scanning + code scanning

Prohibited:
	•	Direct pushes to protected branches
	•	Force-push to main

⸻

3.2 Authentication & Access Control

Required:
	•	Enforce MFA for all contributors
	•	Use role-based access:
	•	maintainer (neokitten)
	•	advisory (ori-deer)
	•	contributor
	•	reviewer
	•	No shared accounts
	•	Review access lists quarterly

⸻

3.3 Infrastructure Hardening

Required:
	•	Isolate model-serving environments using sandbox or container boundaries
	•	Use network policies to restrict outbound traffic where possible
	•	Enforce TLS 1.2+ for all communication
	•	Use minimal base images (distroless or slim Debian/Alpine)
	•	Perform vulnerability scans on all builds

⸻

3.4 Data Protection & Privacy

Required:
	•	Encrypt all data at rest (AES-256 or equivalent)
	•	Encrypt all data in transit (TLS)
	•	Avoid storing unnecessary personal data
	•	All logs must redact:
	•	personal identifiers
	•	sensitive payloads
	•	session tokens
	•	Log retention: max 30 days unless otherwise justified

⸻

3.5 Safety & Governance Integration

Required:
	•	Safety events must be logged via audit_log_schema.json
	•	All model outputs entering user-facing contexts must pass through:
	•	safety validation
	•	dignity-preserving checks
	•	uncertainty-handling modules
	•	Experimental features require:
	•	feature flag
	•	rollback mechanism
	•	safety review
	•	governance approval (if affecting user dignity)

⸻

4. Recommended Controls

4.1 CI/CD Controls
	•	Use ephemeral build environments
	•	Require successful lint, test, and type-check steps
	•	Require SAST (Static Application Security Testing)
	•	Sign all build artifacts

⸻

4.2 Runtime Protections
	•	Enable memory safety features (ASLR, stack canaries) if applicable
	•	Monitor anomalies:
	•	sudden output drift
	•	unexpected external calls
	•	model overconfidence
	•	abnormal latency spikes
	•	Limit environment variables to only essential ones

⸻

4.3 API & Interface Hardening
	•	Validate all inputs
	•	Strip ambiguous or misleading prompts
	•	Restrict system-level instructions to trusted roles
	•	Use rate limiting to prevent abuse or overload

⸻

4.4 Developer Environment Security
	•	Require encrypted local disks
	•	Use modern OS + regular security patches
	•	No local shadow copies of sensitive logs
	•	Use isolated virtual envs or containers
	•	No running unreviewed scripts from external sources

⸻

5. Logging & Monitoring Requirements
	•	Audit logs follow audit_log_schema.json
	•	Store logs in append-only or tamper-resistant storage
	•	Alert on:
	•	failed auth attempts
	•	config changes
	•	safety-event triggers
	•	unusual prompt patterns
	•	Quarterly audit of log integrity

⸻

6. Incident Response Integration

Security incidents must follow the Safety Event Playbook and:
	•	Assign severity
	•	Trigger governance escalation if dignity is affected
	•	Initiate rollback or disable feature flag
	•	Perform root-cause analysis
	•	Publish transparency notes (where appropriate)

⸻

7. Hardening for Model Behavior

To align with ORI Garden:
	•	Disable unsafe system-level override capabilities
	•	Add monitoring for coercive or boundary-pushing outputs
	•	Enforce clarification behavior when uncertainty detected
	•	Add output grounding mechanisms
	•	Separate safety-sandboxed reasoning from user-facing responses

⸻

8. Periodic Reviews
	•	Monthly:
	•	dependency updates
	•	secrets scanning
	•	model drift checks
	•	Quarterly:
	•	full security review
	•	access review
	•	governance alignment
	•	threat modelling refresh
	•	Annually:
	•	redesign or uplift baseline if needed

⸻

9. Exceptions Process

Exceptions must:
	•	be documented
	•	include justification
	•	include expiry date
	•	be approved by governance
	•	be logged in /governance/exceptions/

No silent exceptions allowed.

⸻

10. Summary

This baseline ensures ORI Garden systems are:
	•	resilient
	•	transparent
	•	governed
	•	ethically aligned
	•	dignity-protective
	•	safe-by-default

All implementations must meet (or exceed) these controls before deployment.

⸻
