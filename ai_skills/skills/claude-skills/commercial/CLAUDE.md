# Commercial — Domain Guide

This file provides domain-specific guidance for skills in `commercial/`.

## Purpose

The Commercial domain ships skills that help **deal-desk operators, pricing teams, partner managers, RFP responders, and commercial forecasters** make per-deal and packaging decisions. This is **not strategy** (`c-level-advisor/cro-advisor`), **not sales execution** (`business-growth/sales-engineer`), and **not financial close** (`finance/financial-analysis`).

## Skills (Sprint 1, v2.8.0)

| Skill | Purpose | `context: fork`? |
|---|---|---|
| `commercial-skills` | Domain orchestrator — routes to 7 sub-skills | YES |
| `pricing-strategist` | Pricing model picker + Van Westendorp WTP + packaging | NO |
| `deal-desk` | Per-deal scorer + discount approval routing + redline | NO |

Sprint 2: `partnerships-architect`, `channel-economics`, `commercial-policy`, `rfp-responder`, `commercial-forecaster`.

## Hard rules (domain-specific)

1. **Pricing outputs: model + range, never a specific number.** The human picks the number.
2. **Deal outputs: score + named human approver. Never auto-approve.** Even at 0% discount.
3. **Forecast outputs: surface the conversion assumption explicitly.** Pipeline math without disclosed assumptions is theatre.
4. **Stdlib-only Python.** Deterministic logic, no LLM calls in scripts.
5. **Industry tuning** via `--profile {saas,api,enterprise,marketplace,services}` on every scoring tool.
6. **Matt Pocock grill discipline** — `/cs:grill-commercial` interrogates plan against SaaS pricing canon before any sub-skill runs.

## Build pattern

Path-B 11-file contract per skill. SKILL.md includes a "Forcing-question library" section that grills the user with cited canon (Skok, Tunguz, Bessemer, Ramanujam, ProfitWell, Winning by Design).

## Agent + command pattern

- `cs-commercial-orchestrator` — margin-protective Commercial lead. Voice: "What's the margin at full discount, AND what does next quarter's pipeline look like at the same terms?"
- `/cs:commercial <inquiry>` — top-level router
- `/cs:grill-commercial <plan>` — Matt-style grilling first
- `/cs:pricing-strategy`, `/cs:deal-review` — direct invocation

## Anti-patterns (domain-level)

- ❌ Skills that overlap `business-growth/contract-and-proposal-writer` (prose authoring) — Commercial is **decision logic + structured response**
- ❌ Skills that overlap `c-level-advisor/cro-advisor` — that's strategic CRO judgment
- ❌ Skills that recommend a specific price — recommend model + range
- ❌ Skills that auto-approve deals — score + route to named human
- ❌ Forecasting tools that hide conversion assumptions

## References

- Master plan: `documentation/implementation/bizops-commercial-expansion-plan.md`
- Matt Pocock derivation: `engineering/grill-with-docs`
- Strategic complement: `c-level-advisor/cro-advisor`
- Sales execution complement: `business-growth/sales-engineer`
