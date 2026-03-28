---
name: code-review
description: >-
  Code review using a team of specialized agents. Analyzes
  consistency, idiomatic Go, data correctness, security, and architecture.
  Works on PRs (/code-review <PR_URL>) or local code
  (/code-review, /code-review --diff, /code-review --uncommitted,
  /code-review path/to/file.go).
user-invocable: true
argument-hint: '[PR_URL | --diff | --uncommitted | path]'
---

# Code Review Skill

Review code using five specialized agents working in parallel.
Each agent focuses on a different review dimension. Works against
GitHub PRs or local code changes.

## Input

The argument is available as `$ARGUMENTS`. Detect the mode:

| Argument                      | Mode                                  |
| ----------------------------- | ------------------------------------- |
| PR URL or `owner/repo#number` | **PR mode**                           |
| `--diff` or no argument       | **Local: branch diff** vs main/master |
| `--uncommitted`               | **Local: uncommitted changes**        |
| File path or glob pattern     | **Local: explicit paths**             |

## PR Mode: Fetch Context

Use the GitHub MCP tools to fetch PR metadata and the full diff.
If any MCP call fails (e.g., 403 SAML enforcement), fall back to the
`gh` CLI equivalents shown below.

### Primary: GitHub MCP

1. `mcp__github__pull_request_read` with `method: "get"`, `owner`,
   `repo`, `pullNumber` — returns title, body, base/head refs,
   additions, deletions
1. `mcp__github__pull_request_read` with `method: "get_files"`,
   `owner`, `repo`, `pullNumber` — returns the list of changed files
1. `mcp__github__pull_request_read` with `method: "get_diff"`,
   `owner`, `repo`, `pullNumber` — returns the full diff

### Fallback: `gh` CLI

1. `gh pr view <number> --repo <owner>/<repo> --json title,body,baseRefName,headRefName,additions,deletions`
1. `gh pr diff <number> --repo <owner>/<repo> --name-only`
1. `gh pr diff <number> --repo <owner>/<repo>`

## Local Mode: Gather Context

### Detect the default branch

Run these in order until one succeeds:

1. `git rev-parse --verify main` — use `main`
1. `git rev-parse --verify master` — use `master`
1. `git symbolic-ref refs/remotes/origin/HEAD` — parse the branch
   name from the output

Store the result as `DEFAULT_BRANCH`.

### Branch diff (default / `--diff`)

```bash
BASE=$(git merge-base HEAD "$DEFAULT_BRANCH")
git diff "$BASE"...HEAD
git diff --name-only "$BASE"...HEAD
```

### Uncommitted (`--uncommitted`)

```bash
# tracked changes (staged + unstaged)
git diff HEAD
git diff --name-only HEAD

# untracked files — list them, then read with the Read tool
git status --porcelain | sed -n 's/^?? //p'
```

For any untracked files listed above, read each one with the `Read`
tool and include its contents as additional context alongside the
diff.

### Explicit paths

For each provided path or glob pattern:

1. Expand globs using `Glob`
1. Read file contents using `Read`
1. If tracked, get the diff: `git diff HEAD -- <paths>`

### No changes

If the diff is empty and no files are found, report
"No changes to review" and stop.

### Large diffs

If the diff exceeds ~3000 lines, pass only the file list to agents
and instruct them to read files individually via `Read` rather than
embedding the entire diff in the prompt.

## Create Team and Tasks

Create a team named `code-review-<branch-or-context>` with five
tasks:

1. **Consistency Review** — naming patterns, code style consistency, error
   handling patterns, metric/label/logging consistency, structural consistency
   with existing codebase
1. **Idiomatic Go Review** — idiomatic Go as detailed in
   https://go.dev/doc/effective_go
1. **Data Consistency Review** — correctness of computations and state, race
   conditions in concurrent access, correct context/value propagation, resource
   lifecycle (leaks, double-close), appropriate data structure choices, error path
   completeness
1. **Security Review** — injection/cardinality attacks on labels or inputs,
   information leakage, unbounded reads or allocations, resource exhaustion,
   dependency security, timing side channels, authentication/authorization gaps
1. **Architecture Review** — separation of concerns, dependency direction (no
   circular or upward dependencies), interface design and abstraction boundaries,
   package cohesion and coupling, adherence to existing architectural patterns in
   the codebase, inappropriate layering violations, single-responsibility at the
   package and type level, extensibility without over-engineering

## Spawn Five Agents in Parallel

Spawn five `general-purpose` agents on the team, one per task. Each
agent prompt must include:

- The review dimension and what to focus on
- For the **Idiomatic Go Review** agent: instructions to MUST read
  https://go.dev/doc/effective_go for the full Effective Go guidelines before
  beginning the review
- The list of changed files
- **PR mode only:** `owner`, `repo`, `pullNumber`, the PR title,
  and the PR description — agents need these to call the GitHub
  MCP tools listed below

### PR mode agent instructions

Primary (GitHub MCP):

- Use `mcp__github__pull_request_read` with `method: "get_diff"`,
  `owner`, `repo`, `pullNumber` for the full diff
- Use `mcp__github__get_file_contents` with `owner`, `repo`, `path`,
  and `ref: "refs/heads/<head-branch>"` to read full file context

Fallback (`gh` CLI) — use if MCP calls fail:

- `gh pr diff <number> --repo <owner>/<repo>` for the full diff
- `gh api repos/<owner>/<repo>/contents/<path>?ref=<head-branch>`
  to read full file context

### Local mode agent instructions

- The diff is included directly in the agent prompt (unless the
  diff is too large — see "Large diffs" above)
- Use `Read`, `Glob`, `Grep` for file access when full context
  is needed beyond the diff

### All agents

- **DO NOT add comments to any PR. Send findings back to team-lead
  via SendMessage.**
- Mark their task as completed when done

## Collect Results

As each agent reports back via SendMessage, acknowledge receipt and
send a shutdown_request.

## Compile Summary

After all five agents have reported, delete the team.

### PR mode output

Present a consolidated review in the conversation:

```markdown
## PR #<number> Review Summary: "<title>"

**Overall assessment:** [1-2 sentence summary of PR quality]

### Actionable Items

Items worth discussing or changing, ordered by severity
(High/Medium/Low). Each item should include:
- The file and approximate line reference
- A code snippet if relevant
- Why it matters
- Suggestion for improvement

### Informational / No Action Needed

Brief bullet points for things that are fine or only worth noting
for awareness.
```

### Local mode output

Create the output directory with `mkdir -p docs/projects`, then
write the review to
`docs/projects/code-review-<YYYY-MM-DD-HHMM>.md`:

```markdown
## Code Review: <branch-name or "uncommitted" or path>

**Date:** YYYY-MM-DD HH:MM
**Mode:** branch-diff | uncommitted | paths
**Branch:** <branch-name>
**Base:** <merge-base-ref> (if applicable)
**Files reviewed:** <count>

### Actionable Items

[Same structure as PR mode — severity-ordered with file, line,
snippet, rationale, suggestion]

### Informational / No Action Needed

[Same structure as PR mode]
```

Print a short summary and the file path in the conversation.

Deduplicate findings across agents — if multiple agents flag the
same issue, combine them into a single item citing all relevant
perspectives.

## Notes

- The review is language-aware but optimized for Go codebases. The idiomatic Go
  agent uses the inlined Effective Go document at https://go.dev/doc/effective_go.
- For non-Go PRs, the idiomatic Go agent should be replaced with
  language-appropriate idiom checking, or omitted.
- All agents should read full file context (not just the diff) when needed to
  understand surrounding code patterns.
- The skill does not post any comments to the PR — all output stays in the
  conversation or in the local review file.

## References

- https://go.dev/doc/effective_go — Full Effective Go document used by the
  Idiomatic Go Review agent

## Prerequisites

### GitHub access (PR mode only)

Local mode needs no extra setup. PR mode needs one of the following
(tried in order):

#### Option 1: GitHub MCP server (preferred)

The skill uses `mcp__github__pull_request_read` and
`mcp__github__get_file_contents` from the
[GitHub MCP server](https://github.com/github/github-mcp-server).

Install it:

```bash
go install github.com/github/github-mcp-server/cmd/github-mcp-server@latest
```

Then add it to Claude Code with at least the `repos` and
`pull_requests` toolsets enabled and a
[GitHub personal access token](https://github.com/settings/tokens)
with `repo` scope:

```bash
claude mcp add github \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_... \
  -e GITHUB_TOOLSETS=context,repos,pull_requests \
  -- github-mcp-server stdio
```

**SAML SSO orgs:** If you get a 403 "Resource protected by
organization SAML enforcement" error, go to
[github.com/settings/tokens](https://github.com/settings/tokens),
click **Configure SSO** next to your token, and **Authorize** it for
the org. Alternatively the `gh` CLI fallback (below) will be used
automatically.

#### Option 2: `gh` CLI (fallback)

If the GitHub MCP server is unavailable or returns errors, the skill
falls back to the
[GitHub CLI](https://cli.github.com/) (`gh`). Authenticate with:

```bash
gh auth login
```

The `gh` CLI uses browser-based OAuth which inherits your SSO
sessions, so it works with SAML-enforced orgs out of the box.

### Claude Code agent teams (experimental)

The skill uses [agent teams](https://code.claude.com/docs/en/agent-teams)
(`TeamCreate`, `SendMessage`, `Task` with `team_name`) to run four
review agents in parallel. Enable the feature by adding the
following to `.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
