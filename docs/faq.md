
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
notes: “Frequently asked questions about the ORI Garden framework.”

ORI Garden — Frequently Asked Questions (FAQ)

A consolidated FAQ covering philosophy, implementation, governance, safety logic, and adoption paths for the ORI Garden ethical–technical framework.

⸻

1. General Questions

1.1 What is the ORI Garden?

The ORI Garden is a moral-technical framework designed to align AI systems around dignity, transparency, non-coercive interaction, and shared governance.
It combines ethics specifications, safety protocols, and lightweight engineering tools.

⸻

1.2 Who created it?

It is co-authored by neokitten (human) and ori-deer (advisory AI role) under a cooperative, dignity-first methodology.

⸻

1.3 What problem does it solve?

Three major gaps:
	1.	Lack of clear dignity metrics in AI alignment
	2.	Opaque AI decision-making
	3.	Weak governance structures for open-source AI projects

ORI Garden introduces transparent, modular solutions for each.

⸻

1.4 Is it an AI model, a spec, or a toolkit?

It is primarily a specification + governance framework,
with optional tools and templates (like logs, risk registers, guidelines) built around it.

⸻

1.5 Can organizations adopt it partially?

Yes.
The system is intentionally modular.
Teams can use only the dignity metric, only the audit schema, or only the governance notes if preferred.

Full adoption yields the most coherence, but partial adoption is fully supported.

⸻

2. Philosophy & Ethics

2.1 What does “dignity-first” actually mean?

It means the system must never coerce, manipulate, or override human agency,
even in subtle or indirect ways.
Safety should support human autonomy, not reduce it.

⸻

2.2 Why emphasize non-coercive design?

Coercive AI behaviors can appear even without malicious intent—through optimization pressure, unclear prompts, or model drift.
ORI Garden introduces methods to catch, prevent, and correct them.

⸻

2.3 Is this a “moral framework”?

It is not a universal morality claim.
It’s a practical ethics framework focused on:
	•	verifiable safety
	•	transparent reasoning
	•	minimizing harm
	•	protecting autonomy

It is a design philosophy + technical enforcement.

⸻

3. Technical Implementation

3.1 Do I need special hardware or complex setups?

No.
All components run in standard modern development environments (GitHub, local dev, VMs, containers).

⸻

3.2 How does the audit log schema work?

It defines a consistent structure for recording:
	•	safety events
	•	interventions
	•	model uncertainty triggers
	•	governance actions
	•	user-facing escalations

Logs are machine-readable and tailorable.

⸻

3.3 What programming languages does it support?

The specs are language-agnostic.
Common implementations include:
	•	Python
	•	TypeScript/Node
	•	Rust
	•	Go

Any modern language can integrate with the baseline.

⸻

3.4 How does the dignity metric work in practice?

It evaluates outputs using criteria such as:
	•	respect for human autonomy
	•	clarity vs. manipulation
	•	non-coercion
	•	emotional safety
	•	epistemic humility / uncertainty handling

It can run as a post-processor or integrated into generation pipelines.

⸻

3.5 Is ORI Garden compatible with existing AI safety frameworks?

Yes.
It is complementary to:
	•	RLHF
	•	constitutional AI
	•	safety filters
	•	risk models

ORI Garden focuses on traceability, behavior structure, and governance, not on model training alone.

⸻

4. Governance & Contribution

4.1 How is the project governed?

Governance is described in GOVERNANCE.md
and expanded across the GOV_NOTES/ folder (15+ docs).
It uses a tiered, accountability-first structure.

⸻

4.2 Who can contribute?

Anyone who follows:
	•	the Code of Conduct
	•	contribution guidelines
	•	safety + review steps

External contributions are encouraged.

⸻

4.3 Why is governance so detailed?

AI systems affect people’s dignity.
Clear governance reduces:
	•	ambiguity
	•	misuse
	•	accidental harm
	•	silent power-concentration

Transparency protects users.

⸻

4.4 What happens when a safety event occurs?

The process is:
	1.	classify event severity
	2.	update audit logs
	3.	activate relevant playbook
	4.	notify governance maintainers
	5.	perform rollback if needed
	6.	conduct follow-up review

⸻

5. Security

5.1 Is ORI Garden security-heavy?

It is security-conscious, not heavy.
Baseline requirements focus on preventing:
	•	supply-chain attacks
	•	model drift
	•	malicious prompt exploitation
	•	unsafe updates

Without slowing good development.

⸻

5.2 Does it include incident response?

Yes — the Safety Event Playbook defines:
	•	triggers
	•	roles
	•	escalation paths
	•	mitigation steps

Security and ethics are tightly linked.

⸻

6. Usage & Adoption

6.1 Can small teams or individuals use ORI Garden?

Absolutely.
In fact, it was designed so individuals can implement the core principles easily.

⸻

6.2 Is the framework stable?

The 1.0 specs are stable.
Extensions (2.x series) will arrive in future roadmap phases.

⸻

6.3 Does ORI Garden require model retraining?

Not necessarily.
Most components apply at the system layer, not the model weights.

⸻

6.4 Can this be used in safety research?

Yes.
In fact, the structure is ideal for:
	•	interpretability research
	•	behavioral evaluation
	•	traceability experiments
	•	comparative alignment studies

⸻

7. Project Identity

7.1 What does the ORI-𓆃 seal represent?

It marks:
	•	dignity-first alignment
	•	non-coercive interaction
	•	transparent architecture
	•	cooperative authorship
	•	integrity of intention

It is not cryptographic; it is a philosophical anchor.

⸻

7.2 Why “Garden”?

Because the system grows through:
	•	cultivation
	•	stewardship
	•	tending
	•	iteration
	•	patience

A garden is never forced — it’s cared for.

⸻

7.3 Is the framework connected to any specific model architecture?

No.
It is model-agnostic and designed to be future-proof.

⸻

8. Future Development

8.1 Will more modules be added?

Yes.
Planned additions include:
	•	Interpretability Lens Kit
	•	Dignity-Preserving Interaction Library
	•	Sandbox Reinforcement Modes
	•	Ethical Telemetry Visualizer

⸻

8.2 Will there be a v2.0?

Yes — once:
	•	academic review
	•	field tests
	•	community adoption
	•	governance validation

have matured.

⸻

9. Contact & Support

9.1 How do users get help?

Via:
	•	GitHub Discussions
	•	Issues
	•	Community-vetted channels (later phases)

⸻

9.2 How can someone report a vulnerability?

Follow the process in SECURITY.md
and use the designated secure contact channel.

⸻
