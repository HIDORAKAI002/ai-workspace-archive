---
name: next-task
description: Continue working through a project plan. Finds the next unchecked task and begins implementation in an agent on a team. Use when the user says "next task", "continue", or wants to resume project plan work.
argument-hint: '[--skip-agents]'
arguments:
  - name: --skip-agents
    description: Skip agent team delegation and do the work directly in the main thread
    required: false
---

# Next Task

Resume work from a project plan document using an agent team (default) or
directly in the main thread (`--skip-agents`).

## Context

- Project plans: !`find docs/projects -maxdepth 1 -name '*.md' ! -name 'README.md' -newer docs/projects/completed 2>/dev/null | head -10 || find docs/projects -maxdepth 1 -name '*.md' ! -name 'README.md' 2>/dev/null | head -10`

## Process

1. **Identify the project plan:**

   - If the user specified a plan file, use that.
   - Otherwise, look at the context above for non-completed plans.
   - If multiple plans exist, present the options and ask the user
     which one to use. Format as a numbered list with the filename.
   - **Always tell the user which plan you're going to use and wait
     for confirmation before proceeding.** Example:

     ```text
     I'll work from docs/projects/cross-team-routing-isolation.md.
     OK, or did you have a different plan in mind?
     ```

2. **Read the plan** and find the first unchecked task (`- [ ]`).

3. **Announce the task** you're about to work on:

   ```text
   Next up: Task 2.3 — Add cache invalidation for config updates
   ```

4. **Execute the task** — choose one of two modes:

### Mode A: Agent team (default)

   - Create a team named `next-task-<plan-slug>` using `TeamCreate`.
   - Create a task for the work item using `TaskCreate` with the
     `team_name`.
   - Spawn a `general-purpose` agent on the team with the
     `team_name` parameter. Include in the agent prompt:
     - The full text of the task from the plan
     - The plan file path for reference
     - Key files mentioned in the plan relevant to this task
     - Instruction to write tests first (no code without a failing
       test)
     - Instruction to run `make test` when done
     - Instruction to NOT mark the checkbox as complete
     - Instruction to NOT commit — leave that to the user
     - The project's layer separation: handlers -> service ->
       repository
     - Instruction to use `SendMessage` to report findings and
       status back to team-lead when done
     - Instruction to mark their task completed via `TaskUpdate`
   - Notify the user that the agent is working. They can switch
     to the agent's thread to interact with it directly, or wait for
     the agent to report back via `SendMessage`.

### Mode B: Direct execution (`--skip-agents`)

   - Do the implementation work yourself in the main thread.
   - Follow the same rules the agent would follow:
     - Write tests first (no code without a failing test)
     - Run `make test` when done
     - Do NOT mark the checkbox as complete in the plan
     - Do NOT commit — leave that to the user
     - Respect the project's layer separation: handlers -> service ->
       repository

## REQUIRED

- You MUST confirm the plan choice before proceeding.
- One task per invocation. Don't chain multiple tasks.
- When using agent mode (default), you MUST use `TeamCreate` to
  create a team and spawn the agent on it with `team_name`.
- When using agent mode (default), you MUST NOT do the
  implementation work yourself.
- When using `--skip-agents`, you MUST do the work directly — do
  not create teams or spawn agents.

## Prerequisites

### Claude Code agent teams (experimental) — agent mode only

The default agent mode uses
[agent teams](https://code.claude.com/docs/en/agent-teams)
(`TeamCreate`, `SendMessage`, `TaskCreate`, `TaskUpdate`) to run
the implementation agent. Enable the feature by adding the
following to `.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```
