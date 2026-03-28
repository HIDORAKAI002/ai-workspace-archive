---
name: code-research
description: >-
  Triggers when user mentions a repo by name or GitHub URL — e.g.
  "check the spotless repo", "look at the
  github.com/fastly/spotless repo". Locates the repo locally under
  ~/code or clones it with gh.
user-invocable: true
argument-hint: <repo-name | github-url>
---

# Code Research

Look at, explore, or research a repository by name or GitHub URL.

## When to use

- User asks to look at, explore, or research a repo.
- Input is a GitHub URL (`https://github.com/{org}/{repo}`) or a
  bare repo name (optionally with org prefix like `org/repo`).

## Parse input

Extract `{org}` and `{repo}` from the argument:

1. **GitHub URL** — strip `https://github.com/` prefix, split on `/`
   to get `{org}` and `{repo}`. Remove any trailing `.git`.
1. **`org/repo` form** — split on `/`.
1. **Bare repo name** — no `/` present; `{org}` is unknown.

## Locate locally

1. If `{org}` is known, check whether `~/code/{org}/{repo}` exists.
1. If only a bare name, search `~/code/*/{repo}` for a matching
   directory.
   - If exactly one match is found, use it.
   - If multiple matches are found, list them and ask the user which
     one to use.
   - If no match is found, ask the user for the org (or full URL) so
     you can clone it.

## Clone if missing

If the repo is not found locally and `{org}` is known:

```bash
gh repo clone {org}/{repo} ~/code/{org}/{repo}
```

## When in doubt, ask

Do not guess. If any of the following are unclear, stop and ask the
user before proceeding:

- The input is ambiguous (e.g. a bare name that could match multiple
  orgs, or a name that doesn't match any known repo).
- You aren't sure what the user wants to know about the repo.
- The clone would go to an unexpected location.
- The repo doesn't exist on GitHub (clone fails).

Prefer a short clarifying question over a wrong assumption.

## Create Team and Task

Create a team named `code-research-{repo}` with one task:

1. **Research** — explore the repo and answer the user's question

## Spawn Agent

Spawn a single `general-purpose` agent named `code-researcher` on
the team, assigned to the **Research** task. The agent prompt must
include:

- The repo path (`~/code/{org}/{repo}`)
- The user's question or research goal
- Instructions to use `Read`, `Glob`, `Grep`, and Explore patterns
  to investigate the codebase
- Instructions to use any relevant MCP servers available in the
  session (e.g. `gopls` for Go projects — `go_search`,
  `go_file_context`, `go_package_api`; `context7` for library
  documentation lookups)
- **Send findings back to team-lead via `SendMessage` and mark the
  task as completed when done**

## Main Agent Continues

While `@code-researcher` runs, the main agent remains available
(can answer other questions, do lightweight lookups, etc.).

## Collect Results

When `@code-researcher` reports back via `SendMessage`, acknowledge
receipt and send a `shutdown_request`. Then delete the team.

## Present Findings

Summarize the research to the user, then prompt if they want a
project plan document created around it. See
@../project-plan/SKILL.md

## Prerequisites

### Claude Code agent teams (experimental)

The skill uses
[agent teams](https://code.claude.com/docs/en/agent-teams)
(`TeamCreate`, `SendMessage`, `Task` with `team_name`) to run the
research agent in parallel. Enable the feature by adding the
following to `.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
