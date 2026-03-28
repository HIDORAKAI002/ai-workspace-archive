# Planning rules (full reference)

All paths below are under the workspace root.

## The 3-Strike Error Protocol

```
ATTEMPT 1: Diagnose & Fix
ATTEMPT 2: Alternative approach (never repeat the exact same failing action)
ATTEMPT 3: Broader rethink; update the plan if needed
AFTER 3 FAILURES: Escalate to the user with evidence
```

## Read vs Write Decision Matrix

| Situation | Action |
|-----------|--------|
| Just wrote a file | Do not re-read unless stale |
| Viewed image/PDF/browser output | Write to `.kiro/plan/findings.md` immediately |
| Starting a new phase | Read `.kiro/plan/task_plan.md` and `findings.md` |
| Resuming after a gap | Read all files under `.kiro/plan/` |

## The 5-Question Reboot Test

| Question | Answer source |
|----------|----------------|
| Where am I? | `.kiro/plan/task_plan.md` |
| Where am I going? | Remaining phases in `task_plan.md` |
| What's the goal? | Goal section in `task_plan.md` |
| What have I learned? | `.kiro/plan/findings.md` |
| What have I done? | `.kiro/plan/progress.md` |

## Phase status values

- `pending` — not started
- `in_progress` — active
- `complete` — done

## Error log (in `task_plan.md`)

```markdown
## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
```
