# Planning file templates (reference)

Bootstrap copies the canonical templates from `assets/templates/` into `.kiro/plan/`. This page is a **compact reference** (inline skeletons) when you need to paste structure without opening those files.

To use as a Kiro **manual steering** document, copy this file to `.kiro/steering/planning-templates.md` and add front matter:

```yaml
---
inclusion: manual
name: planning-templates
description: Markdown templates for task_plan, findings, and progress.
---
```

---

## task_plan.md

```markdown
# Task Plan

## Goal
[One sentence describing the end state]

## Current Phase
Phase X: [Name] - [Status]

## Phases

### Phase 1: [Name]
**Status:** pending | in_progress | complete
- [ ] Step 1
- [ ] Step 2

### Phase 2: [Name]
**Status:** pending
- [ ] Step 1
- [ ] Step 2

## Key Questions
- Question 1?
- Question 2?

## Decisions Made
| Decision | Rationale | Date |
|----------|-----------|------|

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
```

## findings.md

```markdown
# Findings

## Requirements
- Requirement 1
- Requirement 2

## Research Findings
### [Topic 1]
- Finding 1
- Finding 2

## Technical Decisions
| Decision | Options Considered | Chosen | Why |
|----------|-------------------|--------|-----|

## Resources
- [Resource 1](url)
- [Resource 2](url)
```

## progress.md

```markdown
# Progress Log

## Session: [Date]
**Phase:** [Current phase]
**Start Time:** [Time]

### Actions Taken
1. Action 1
2. Action 2

### Files Modified
- `file1.js` — Added feature X
- `file2.py` — Fixed bug Y

### Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|

### Error Log
| Time | Error | Attempt | Resolution |
|------|-------|---------|------------|
```
