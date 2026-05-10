---
title: "Chaos Engineering — Experiments That Don't Become Outages"
description: "End-to-end chaos engineering discipline for Claude Code: design experiments with hypothesis + steady-state + blast radius + abort criteria, calculate risk against error budget, and generate blameless postmortems. 3 stdlib Python tools, 4 references covering principles + design + 7-attack taxonomy + tooling. Composes with feature-flags-architect and kubernetes-operator."
---

# Chaos Engineering

<div class="page-meta" markdown>
<span class="meta-badge">:material-rocket-launch: Engineering - POWERFUL</span>
<span class="meta-badge">:material-identifier: `chaos-engineering`</span>
<span class="meta-badge">:material-github: <a href="https://github.com/alirezarezvani/claude-skills/tree/main/engineering/chaos-engineering">Source</a></span>
</div>

<div class="install-banner" markdown>
<span class="install-label">Install:</span> <code>claude /plugin install chaos-engineering</code>
</div>

Design experiments that surface real weaknesses in production systems — without becoming outages. Most "chaos engineering" attempts skip steady-state measurement, define no abort criteria, and have no blast-radius bound. This skill enforces the discipline that makes chaos experiments safe and useful.

## When to use

- Planning a chaos experiment (what to break, where, when, how to abort)
- Calculating blast radius before running
- Reviewing an experiment plan for safety
- Choosing a chaos tool (Chaos Toolkit / Mesh / Litmus / Gremlin / AWS FIS)
- Writing a chaos experiment postmortem
- Running a Game Day exercise

## When NOT to use

- General incident response → `incident-response`
- Threat hunting / red-team → `red-team`, `threat-detection`
- Performance load testing (different goal — chaos is failure modes, not capacity)

## Core principle: chaos without abort criteria is an outage

The 4 founding principles + 1 mandatory addition:

1. Build a hypothesis around steady-state behavior — measurable, falsifiable
2. Vary real-world events — realistic faults only
3. Run experiments in production — staging never has prod failure modes
4. Automate experiments to run continuously — single experiment = press release
5. **Define abort criteria up front** — no abort = outage

## The 3 Python tools

All stdlib-only. Karpathy complexity 95/100 — best score in the portfolio.

### `experiment_designer.py`

Generates a structured experiment plan. Enforces hypothesis, steady-state, blast radius, abort criteria, rollback.

```bash
python scripts/experiment_designer.py \
  --target checkout-svc \
  --hypothesis "p99 < 500ms when payment slows" \
  --attack latency --magnitude "+200ms" \
  --abort-if "p99 > 1000ms OR error_rate > +1pp"
```

### `blast_radius_calculator.py`

Computes affected users, error budget consumed, and risk score (GREEN/YELLOW/RED).

```bash
python scripts/blast_radius_calculator.py \
  --traffic-share 0.05 --user-pop 1000000 --duration-min 15
```

GREEN = <1% error budget; YELLOW = 1-10%; RED = >10% (ABORT/REDUCE).

### `experiment_postmortem.py`

Generates a blameless postmortem from plan + result log. Detects blame-laden language.

```bash
python scripts/experiment_postmortem.py \
  --plan plan.json --result-log results.txt
```

## The 7 attack types

| Attack | Tests |
|---|---|
| **Latency** | Timeouts, retries, circuit breakers |
| **Error** | Error handling, fallback paths |
| **Resource** | Saturation, autoscaling, OOM |
| **Network partition** | Consensus, leader election, failover |
| **Dependency failure** | Graceful degradation |
| **Time skew** | Clocks, TTLs, retry backoff |
| **Infrastructure** | Auto-recovery, replica maintenance |

See `references/attack_taxonomy.md` for full magnitude examples and tooling per attack.

## Tooling chooser

| Tool | Stack | OSS |
|---|---|---|
| **Chaos Toolkit** | Any | Yes |
| **Chaos Mesh** | Kubernetes | Yes |
| **Litmus** | Kubernetes | Yes |
| **Gremlin** | Any (commercial) | No |
| **AWS FIS** | AWS | Paid |
| **Custom** | Any | DIY |

## Composition

| Skill | Composition |
|---|---|
| `feature-flags-architect` | Kill switches there are abort triggers here |
| `kubernetes-operator` | Operators are common chaos targets |
| `incident-response` | Chaos that escalates becomes an incident |

## Slash command

`/chaos-experiment` — Interactive design wizard.

## Reference docs

- `references/chaos_principles.md` — 4 principles + 5th abort principle, history, when to start
- `references/experiment_design.md` — 7 sections, pre-flight checklist, time-boxing
- `references/attack_taxonomy.md` — 7 attacks with magnitudes and tooling
- `references/tooling_landscape.md` — full provider comparison

## Verifiable success

A team using this skill should achieve:

- 100% of experiments have written hypothesis, abort criteria, blast-radius calc
- Blast radius for any single experiment ≤10% of monthly error budget
- Mean time between experiments <14 days
- Each experiment produces ≥1 follow-up action that gets shipped
- No chaos experiment escalates to a customer-impacting incident in trailing 90 days
