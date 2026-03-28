# Compatibility policy

This repo is an authoring workspace for WordPress-focused Agent Skills.

## Compatibility contract (v1)

Skills in this repo target:

- WordPress core **6.9+**
- PHP **7.2.24+** (minimum supported by WordPress 6.9)

## Authoring rules

Skills should:

- Prefer stable WordPress APIs and best practices.
- Prefer detection + guardrails (triage) over hard-coded assumptions.
- If a task requires behavior that differs across core versions, ask for a target version (but default guidance should assume WP 6.9+).
