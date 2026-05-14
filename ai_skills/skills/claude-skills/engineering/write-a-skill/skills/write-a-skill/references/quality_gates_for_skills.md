# Quality Gates for Skill Libraries

This reference answers exactly one decision: **what checks must pass before a new skill enters the library, and why?**

Pair with `scripts/skill_review_checklist_runner.py` for the automated gate.

## The Six Mandatory Gates (per Matt Pocock's checklist)

| # | Check | Why it matters |
|---|---|---|
| 1 | Description includes triggers ("Use when ...") | Without trigger, agent guesses when to activate — high false-positive rate |
| 2 | SKILL.md under 100 lines | Over-conditioning; agent reads tangential detail and misroutes |
| 3 | No time-sensitive info | Dates/versions/year refs rot; agent receives stale guidance |
| 4 | Consistent terminology | Synonym drift confuses the agent + downstream users |
| 5 | Concrete examples included | Without an example, agent constructs from scratch and hallucinates |
| 6 | References one level deep | Deep nesting = agent gives up resolving the reference chain |

## Why Programmatic, Not Manual

Manual review of these 6 items:
- Drifts across reviewers (different humans interpret "concrete example" differently)
- Slows PR cadence (every reviewer re-reads every skill against every check)
- Misses regressions (a skill once compliant can drift across updates)

Programmatic gate (the `skill_review_checklist_runner.py` tool):
- Same verdict regardless of reviewer
- Runs in CI in seconds
- Catches regressions automatically
- Documents the explicit criteria — no implicit reviewer judgment

## Beyond Matt's Six: Additional Quality Dimensions

Matt's 6 are the floor. For a mature skill library, add:

### Citation density (this repo's standard)

Every reference file in `references/` should cite ≥ 5 authoritative sources. Why: skills inspired by public material need traceable provenance. Tool: grep-based count of bibliography entries.

### Tool determinism (karpathy-coder discipline)

Every script in `scripts/` should:
- Be stdlib-only (no external dependencies)
- Have embedded sample input
- Support `--output {text,json}`
- Be deterministic (no randomness, no LLM calls)

Tool: `engineering/karpathy-coder/skills/karpathy-coder/scripts/complexity_checker.py`

### Cross-skill compatibility

For skills that reference other skills (via `Adjacent Skills` sections), every cross-reference must resolve to an existing skill. Tool: link-integrity grep across skill folders.

### Attribution discipline (this repo's standard)

Skills derived from external sources (MIT-licensed or public-domain) must:
- Name the original author
- Link to the original source
- State the license
- Note what's preserved vs added

Tool: presence-of-attribution grep in plugin.json + README.md.

## Quality Gate Sequencing

Apply gates in this order during PR:

```
1. Description validator      (fast; catches most issues early)
2. Structure validator        (fast; folder layout + line counts)
3. Review checklist runner    (combined; all 6 of Matt's items)
4. Karpathy complexity check  (code quality; only if scripts/ exists)
5. Karpathy assumption linter (code quality; only if scripts/ exists)
6. Link integrity scan        (cross-skill references)
7. Citation density check     (references/ bibliography)
```

If any gate fails, PR is blocked. WARN status (1 check fails out of 6) requires reviewer justification in PR description.

## CI Integration Pattern

```yaml
# .github/workflows/skill-quality-gate.yml (illustrative)
on: [pull_request]
jobs:
  skill-quality:
    steps:
      - uses: actions/checkout@v4
      - name: Run review checklist
        run: |
          for skill in $(find . -name "SKILL.md" -type f); do
            python engineering/write-a-skill/skills/write-a-skill/scripts/skill_review_checklist_runner.py "$(dirname $skill)"
          done
      - name: Run karpathy gate
        run: python engineering/karpathy-coder/skills/karpathy-coder/scripts/complexity_checker.py .
```

## Common Failure Modes (and Fixes)

| Failure | Common cause | Fix |
|---|---|---|
| Description >1024 chars | Trying to describe every feature | Cut to verbs + objects + triggers; move details to SKILL.md |
| SKILL.md >100 lines | Inline workflows that belong in references | Move workflows to `references/<workflow>.md`; replace with 1-line pointers |
| Missing "Use when" | Description written as marketing copy | Rewrite second sentence to start with "Use when ..." |
| Time-sensitive info | "As of October 2024 ..." | Remove date; describe pattern that doesn't depend on date |
| No examples | Abstract guidance only | Add at least 1 code block showing minimum invocation |
| Deep references | Subfolder structure under references/ | Flatten to one level |

## Quality Gate Anti-Patterns

1. **Disabling gates "just for this skill"** — once disabled, never re-enabled. If a gate genuinely doesn't apply, document the exception in skill metadata.
2. **Reviewer override without rationale** — if a reviewer bypasses a check, they own future regressions. Require justification.
3. **Manual review for what tools can check** — wastes reviewer attention on mechanical items. Reserve manual review for judgment calls (is the workflow correct? Does the skill cover the stated use case?).
4. **Gate proliferation** — adding new gates faster than they're enforced creates fatigue. Cap at ~10 gates total; merge similar ones.

## When This Reference Doesn't Help

- **Performance optimization of skills** — different concern; benchmark agent token usage, not skill files
- **Skill discovery + organization in marketplaces** — different audience (humans), different rules
- **A/B testing skills** — different mode; quality gates are preconditions, not A/B subjects

---

**Source authorities (non-exhaustive):**

- **Matt Pocock — write-a-skill** (https://github.com/mattpocock/skills/, MIT) — the 6-item review checklist
- **Karpathy, A. — public commentary on LLM coding pitfalls** (X.com, 2024-2025) — discipline framework adopted as `engineering/karpathy-coder/`
- **Anthropic — Building agents with skills** (https://docs.claude.com/en/docs/agents/skills) — official skill quality guidance
- **Continuous Integration / Continuous Deployment patterns** — Humble & Farley (Continuous Delivery, 2010) — gate sequencing principles
- **The Phoenix Project** (Kim et al., 2013) + Three Ways of DevOps — quality gates as constraint management
- **Hyrum's Law** as applied to skill libraries — once a skill's behavior is observed, downstream depends on it; quality gates prevent drift
- **Software craftsmanship + the Boy Scout Rule** — leave each skill cleaner than you found it; gates enforce the floor
