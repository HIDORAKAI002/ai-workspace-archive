---
title: "Feature Flags Architect — Flag Lifecycle Discipline"
description: "End-to-end feature-flag discipline for Claude Code: classify, ship, ramp, retire. Detects stale flags as debt, generates phased rollout plans (ring/linear/log/cohort), audits every flag for kill switch. 3 stdlib Python tools, 4 references on flag taxonomy + provider trade-offs (LaunchDarkly/GrowthBook/Statsig/Unleash/Flipt/DIY) + rollout strategies + lifecycle. Cross-tool compatible."
---

# Feature Flags Architect

<div class="page-meta" markdown>
<span class="meta-badge">:material-rocket-launch: Engineering - POWERFUL</span>
<span class="meta-badge">:material-identifier: `feature-flags-architect`</span>
<span class="meta-badge">:material-github: <a href="https://github.com/alirezarezvani/claude-skills/tree/main/engineering/feature-flags-architect">Source</a></span>
</div>

<div class="install-banner" markdown>
<span class="install-label">Install:</span> <code>claude /plugin install feature-flags-architect</code>
</div>

End-to-end discipline for feature flags: classify them, ship them, ramp them, and retire them. Most teams treat flags as throwaway `if`-statements; this skill treats them as a controlled lifecycle with measurable debt.

## When to use

- Adding a new flag and need a rollout plan
- Auditing a codebase for stale or orphaned flags
- Choosing a flag provider (LaunchDarkly vs GrowthBook vs Statsig vs Unleash vs Flipt vs build-your-own)
- Designing a kill-switch path for a risky launch
- Cleaning up flag debt before a release freeze
- Reviewing whether a feature should ship behind a flag at all

## Core principle: flags are a lifecycle, not an `if`

```
request → design → ship → ramp → cleanup → archive
```

Flags that skip cleanup become debt: dead branches, stale defaults, untested code paths, unbounded blast radius. Three Python scripts in this skill enforce the lifecycle.

## The 3 Python tools

All three are stdlib-only. Run with `--help`.

### `flag_debt_scanner.py`

Finds flags older than `--max-age-days` with low usage, suggesting candidates for cleanup.

```bash
python scripts/flag_debt_scanner.py --repo . --max-age-days 90
python scripts/flag_debt_scanner.py --repo . --max-age-days 60 --format json > debt.json
```

### `rollout_planner.py`

Generates a phased rollout schedule from population, target percent, duration, and strategy.

```bash
python scripts/rollout_planner.py --population 100000 --target-percent 100 --duration-days 14 --strategy ring
```

Strategies: `ring` (1% → 5% → 25% → 50% → 100%, default for risky), `linear`, `log`, `cohort`.

### `kill_switch_audit.py`

Cross-references code-discovered flags against documentation to verify each has a documented kill switch.

```bash
python scripts/kill_switch_audit.py --repo . --flag-doc docs/feature-flags.md
```

Use as a pre-merge gate before any new flag ships.

## The 4 flag types

| Type | Lifespan | Owner | Cleanup trigger |
|---|---|---|---|
| **Release** | days–weeks | Eng | 100% rollout reached |
| **Experiment** | weeks | Product/Marketing | Test concluded; winner picked |
| **Operational** | months–years | Eng/SRE | Replaced by autoscaling |
| **Permission** | indefinite | Product | Plan/role retired |

See `references/flag_taxonomy.md` for the full decision tree.

## Provider chooser

| Provider | Best for | OSS option |
|---|---|---|
| **LaunchDarkly** | Enterprise, complex targeting, audit/compliance | No |
| **GrowthBook** | Mid-market, A/B testing focused | Yes (self-host) |
| **Statsig** | Growth/product teams, advanced experimentation | No |
| **Unleash** | OSS-first, self-hosted, dev-friendly | Yes |
| **Flipt** | Lightweight, k8s-native | Yes |
| **DIY** | <50 flags, no targeting | N/A |

See `references/provider_comparison.md` for full trade-offs and selection checklist.

## Slash command

`/flag-cleanup` — Run the quarterly cleanup workflow on the current repo: scan for debt, generate a removal plan, audit kill switches.

## Reference docs

- `references/flag_taxonomy.md` — 4 types, decision tree, ownership rules
- `references/provider_comparison.md` — provider trade-offs + selection checklist
- `references/rollout_strategies.md` — ring/linear/log/cohort with abort criteria
- `references/flag_lifecycle.md` — 6-phase lifecycle with SLAs and worked example

## Verifiable success

A team using this skill should achieve:

- 100% of new flags pass `kill_switch_audit.py` at merge time
- `flag_debt_scanner.py --max-age-days 90` returns ≤5 stale flags repo-wide
- Every flag has a documented owner, type, kill switch, and dashboard
- Mean time to retire a Release flag: <60 days from 100% rollout
