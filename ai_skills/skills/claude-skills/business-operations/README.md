# business-operations

**Internal-operations skills for BizOps leads, COO direct reports, vendor management, IT ops.**

v2.8.0 — 3 skills (Sprint 1) + 4 more in Sprint 2.

## Skills

| Skill | Job-to-be-done |
|---|---|
| [`business-operations-skills`](skills/business-operations-skills/) | Orchestrator — routes to the right sub-skill via `context: fork` |
| [`process-mapper`](skills/process-mapper/) | "Where does the work spend most of its time waiting?" — BPMN + bottleneck + cycle-time |
| [`vendor-management`](skills/vendor-management/) | "Is this vendor delivering against the SLA, and what's the risk if they fail?" — scorecard + SLA + risk |

## Commands

- `/cs:bizops <inquiry>` — top-level router
- `/cs:grill-bizops <plan>` — Matt Pocock-style docs-anchored grilling
- `/cs:process-map`, `/cs:vendor-review` — direct per-skill invocation

## Agent

- `cs-bizops-orchestrator` — process-obsessed BizOps lead persona

## Distinct from

- `business-growth/` — external sales motion (CSM, sales engineering)
- `c-level-advisor/coo-advisor` — strategic COO judgment (not tactical operations)
- `engineering/slo-architect` — system reliability (not business-process reliability)
- `engineering/llm-wiki` — personal PKM (not company SOPs)

## License

MIT
