# Business Operations — Domain Guide

This file provides domain-specific guidance for skills in `business-operations/`.

## Purpose

The Business Operations domain ships skills that help **internal operators** (BizOps lead, COO direct reports, vendor management office, IT ops) run the company day-to-day. This is **not strategy** (that's `c-level-advisor/`) and **not external sales** (that's `business-growth/`).

## Skills (Sprint 1, v2.8.0)

| Skill | Purpose | `context: fork`? |
|---|---|---|
| `business-operations-skills` | Domain orchestrator — routes inquiries to the 6 sub-skills | YES |
| `process-mapper` | BPMN-style process docs + bottleneck + cycle-time | YES |
| `vendor-management` | Vendor scoring + SLA + third-party risk | YES |

Sprint 2 will add: `capacity-planner`, `internal-comms`, `knowledge-ops`, `procurement-optimizer`.

## Build pattern

Path-B 11-file contract per skill (Matt Pocock-derived discipline preserved):

```
skill/
├── SKILL.md                  # YAML frontmatter + workflow + forcing-question library
├── scripts/                  # 3 stdlib-only Python CLI tools
├── references/               # 3 ref docs, ≥ 7 cited sources each
└── assets/                   # ≥ 1 user-customizable template
```

## Hard rules

1. **Stdlib-only Python** — no `requests`, `pandas`, `numpy`. Just `argparse`, `json`, `sys`, `pathlib`, `statistics`, `dataclasses`, `enum`, `datetime`.
2. **Deterministic logic** — no LLM calls in scripts. Same input → same output.
3. **Industry tuning** — every scoring tool exposes `--profile {saas,services,manufacturing,healthcare,…}` for threshold calibration.
4. **Matt Pocock grill discipline** — orchestrator routes via one-question-per-turn with a recommended answer + canon citation. Never bundles questions. Never auto-routes silently after a question.
5. **Output is recommendation, not approval** — `vendor-management` never says "replace this vendor"; it scores + routes to a named human.

## Agent + command pattern

- `cs-bizops-orchestrator` — the persona agent. Voice: "Where does the work spend most of its time waiting?" (Theory of Constraints anchor).
- `/cs:bizops <inquiry>` — top-level router.
- `/cs:grill-bizops <plan>` — Matt-style docs-anchored grilling **before** routing.
- `/cs:process-map`, `/cs:vendor-review`, ... — direct per-skill invocation.

## Anti-patterns (domain-level)

- ❌ Skills that overlap `business-growth/*` (external sales motion) — BizOps is **internal**
- ❌ Skills that overlap `c-level-advisor/coo-advisor` — that's strategic; BizOps is tactical
- ❌ "Process improvement consultant" generic skills — every skill must answer a SPECIFIC question (e.g., "where's the bottleneck?", "is this vendor delivering?", not "how can we improve operations?")
- ❌ Tools without `--profile` tuning — every score must be industry-tunable
- ❌ Bundled questions in the orchestrator — Matt's rule: one at a time, with a recommended answer

## References

- Master plan: `documentation/implementation/bizops-commercial-expansion-plan.md`
- Matt Pocock derivation: `engineering/grill-me`, `engineering/grill-with-docs`
- Strategic complement: `c-level-advisor/coo-advisor`
