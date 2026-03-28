---
name: delegate
description: Use when user explicitly requests agent delegation with /delegate. Spawns a named agent on a team so the user can chat with both threads.
user-invocable: true
argument-hint: <task description>
---

# Delegate to Agent

## REQUIRED

You MUST use agent teams to spawn a named agent. Do NOT execute the work
directly. This is the entire purpose of `/delegate` — preserving top-level
context by offloading work to a parallel agent thread the user can interact
with.

## Instructions

1. Parse everything after `/delegate` as the task description.
2. Choose an agent name and type based on the task (see Agent Selection).
3. Create a team named `delegate-{short-slug}` where `{short-slug}` is a
   2-3 word kebab-case summary of the task (e.g. `delegate-fix-auth`,
   `delegate-explore-caching`).
4. Create a single task on the team describing the work.
5. Spawn a single agent on the team, assigned to that task. The agent
   prompt must include:
   - The full task description from the user
   - The current working directory
   - Instructions to use all relevant tools (`Read`, `Glob`, `Grep`,
     `Edit`, `Bash`, MCP servers like `gopls`, `context7`, etc.)
   - **Send findings back to team-lead via `SendMessage` and mark the
     task as completed when done**
6. Tell the user the agent is running and they can continue chatting here.

## Collect Results

When the agent reports back via `SendMessage`, acknowledge receipt and
send a `shutdown_request`. Then delete the team. Summarize the results to
the user.

## Agent Selection

| Task Type          | Agent Type            | Agent Name        |
| ------------------ | --------------------- | ----------------- |
| Find code/files    | Explore               | explorer          |
| Design approach    | Plan                  | planner           |
| Run commands       | Bash                  | runner            |
| Code review        | code-reviewer         | reviewer          |
| Web research       | web-search-researcher | researcher        |
| Complex/multi-step | general-purpose       | worker            |

## Anti-patterns (DO NOT)

- Running Bash commands directly instead of delegating
- Reading files yourself first
- "Let me quickly check..." before delegating
- Any tool call that isn't team/task management

## Prerequisites

### Claude Code agent teams (experimental)

This skill uses
[agent teams](https://code.claude.com/docs/en/agent-teams)
(`TeamCreate`, `SendMessage`, `Task` with `team_name`) to run the agent
in parallel. Enable the feature by adding the following to
`.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
