---
name: cleanup
description: >-
  Review codebase for AI slop and clean it up. Runs a background
  agent that examines files, fixes clear-cut issues, and flags
  behavior-changing items for discussion.
user-invocable: true
argument-hint: '[path | glob]'
---

# Cleanup Skill

Audit a codebase for AI slop using a background agent. The agent
fixes obvious issues directly and flags anything that would change
behavior. You can continue working while it runs.

## Input

The argument is available as `$ARGUMENTS`. Detect the scope:

| Argument          | Scope                          |
| ----------------- | ------------------------------ |
| No argument       | **Entire codebase**            |
| File path or glob | **Specific files/directories** |

## Gather File List

### Entire codebase (no argument)

Use `Glob` to collect all source files. Exclude vendored,
generated, and test fixture directories (e.g. `vendor/`,
`node_modules/`, `testdata/`, `.git/`).

### Specific paths

Expand any globs with `Glob`, then validate paths exist.

If no files are found, report "No files to review" and stop.

## Create Team and Task

Create a team named `cleanup-<timestamp>` with one task:

1. **Codebase Cleanup** -- examine all files in scope for AI slop,
   fix clear-cut issues directly, flag behavior-changing items for
   discussion

## Spawn One Agent

Spawn a single `general-purpose` agent on the team. The agent
prompt must include:

- The full "What to look for" checklist below
- The list of files in scope
- Instructions to work file by file, making edits directly
- Instructions to track every change and every flagged item

### Agent instructions

Include this in the agent prompt:

> You are a principal engineer performing a code quality audit.
> Your job is to find and fix "AI slop" -- the telltale signs of
> AI-generated code that was accepted without proper review.
>
> **Rules:**
>
> - Fix issues directly unless the fix would change behavior
> - For behavior-changing fixes, flag them but do not edit
> - Do not make changes that violate the language's or codebase's
>   conventions
> - Be aggressive about removing slop but conservative about
>   changing behavior
>
> When finished, send your findings back to the team lead via
> `SendMessage`. Structure your message as:
>
> 1. **Changes made** -- list of files edited with a one-line
>    summary of each change
> 1. **Flagged for discussion** -- items that would change behavior,
>    with file, line, description, and rationale
> 1. **Files reviewed with no issues** -- count only
>
> Mark your task as completed when done.

### What to look for

Include this checklist verbatim in the agent prompt:

#### Unnecessary verbosity

- Overly defensive code: nil checks that can't fire, error
  handling for impossible cases, redundant type assertions
- Wrapper functions that add no value -- just forwarding calls
  with no additional logic
- Variables assigned once and immediately returned; inline them
- Unnecessary else branches after a return

#### Duplicated code

- Copy-pasted logic that should be extracted into a shared function
- Near-identical switch/case arms that could be collapsed
- Repeated string literals that should be constants

#### Comment problems

- Comments that restate what the code does ("increment i by 1")
- Temporal comments ("added this to fix the bug", "this was needed
  because...")
- Uncertain thinking leaked into comments ("actually", "but wait",
  "I think", "probably")
- Commented-out code that should be deleted

#### Naming issues

- Variables named `result`, `data`, `temp`, `val`, `ret` when a
  descriptive name exists
- Boolean variables/functions not named as predicates (should read
  as a question)
- Inconsistent naming conventions within the same file

#### Structural issues

- Functions that are too long (>50 lines) and do multiple things
- Deep nesting (>3 levels) that could be flattened with early
  returns
- Dead code: unused functions, unreachable branches, vestigial
  parameters
- Temporary files, debug prints, or scaffolding left behind
- Imports that are no longer needed

#### Over-engineering

- Abstractions with only one implementation
- Interface types with a single concrete user
- Configuration for things that never vary
- Builder/factory patterns where a simple constructor suffices

## Collect Results

When the agent reports back via `SendMessage`, acknowledge receipt
and send a `shutdown_request`.

## Compile Summary

After the agent has reported, delete the team.

Create the output directory with `mkdir -p docs/projects`, then
write the report to
`docs/projects/cleanup-<YYYY-MM-DD-HHMM>.md`:

```markdown
## Cleanup Report

**Date:** YYYY-MM-DD HH:MM
**Scope:** entire codebase | specific paths
**Files reviewed:** <count>
**Files changed:** <count>
**Items flagged:** <count>

### Changes Made

[Group by category -- verbosity, duplication, comments, naming,
structure, over-engineering. Each item: file, line, what changed.]

### Flagged for Discussion

[Items that would change behavior. Each item: file, line,
description, why it matters, suggested fix.]
```

Print a short summary and the file path in the conversation.

## Prerequisites

### Claude Code agent teams (experimental)

The skill uses
[agent teams](https://code.claude.com/docs/en/agent-teams)
(`TeamCreate`, `SendMessage`, `Task` with `team_name`) to run the
cleanup agent in the background. Enable the feature by adding the
following to `.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
