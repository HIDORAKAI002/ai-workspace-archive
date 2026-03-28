# BoxLite Setup

Using planning-with-files inside [BoxLite](https://boxlite.ai) micro-VM sandboxes via [ClaudeBox](https://github.com/boxlite-ai/claudebox).

---

## Overview

BoxLite is a micro-VM sandbox runtime — hardware-isolated, stateful, embeddable as a library with no daemon and no root required. The analogy their team uses is "SQLite for sandboxing": you import it directly into your application and each box gets its own kernel, not just namespaces or containers.

[ClaudeBox](https://github.com/boxlite-ai/claudebox) is BoxLite's official Claude Code integration layer. It runs the Claude Code CLI inside a BoxLite micro-VM with persistent workspaces, optional skills, security policies, and resource limits. planning-with-files loads into ClaudeBox as a Skill object — the skill's SKILL.md and scripts get injected into the VM filesystem at startup, exactly where Claude Code expects to find them.

**Why use this combination:**
- Run untrusted AI-generated code in hardware isolation without touching your host filesystem
- planning files (`task_plan.md`, `findings.md`, `progress.md`) persist across sessions via ClaudeBox's stateful workspaces at `~/.claudebox/sessions/`
- Snapshot before a risky phase, roll back if needed
- All hooks (PreToolUse, PostToolUse, Stop) work because Claude Code runs natively inside the VM

---

## Prerequisites

- Python 3.10+
- BoxLite runtime (installed automatically as a ClaudeBox dependency)
- Docker — used to pull and manage OCI images (the sandbox itself runs as a micro-VM, not a Docker container)
- `CLAUDE_CODE_OAUTH_TOKEN` or `ANTHROPIC_API_KEY` set

---

## Installation

### Install ClaudeBox

```bash
pip install claudebox
```

### Set your API credentials

```bash
export CLAUDE_CODE_OAUTH_TOKEN=sk-ant-oat01-...
# or
export ANTHROPIC_API_KEY=sk-ant-...
```

---

## Quick Start

The minimal example — planning-with-files inside a BoxLite VM:

```python
import asyncio
from pathlib import Path
from claudebox import ClaudeBox, Skill

# Load the SKILL.md content from the installed skill
SKILL_MD = Path.home() / ".claude" / "skills" / "planning-with-files" / "SKILL.md"

PLANNING_SKILL = Skill(
    name="planning-with-files",
    description="Manus-style file-based planning with persistent markdown",
    files={
        "/root/.claude/skills/planning-with-files/SKILL.md": SKILL_MD.read_text()
    }
)

async def main():
    async with ClaudeBox(
        session_id="my-project",
        skills=[PLANNING_SKILL]
    ) as box:
        result = await box.code(
            "Plan and implement a user authentication feature for the Express API"
        )
        print(result.response)

asyncio.run(main())
```

Claude Code finds the skill at `/root/.claude/skills/planning-with-files/SKILL.md` inside the VM. The three planning files (`task_plan.md`, `findings.md`, `progress.md`) are written to the box's working directory and persist across sessions.

---

## Persistent Sessions

ClaudeBox workspaces survive restarts. Pick up exactly where you left off:

```python
async def main():
    # First session — starts the plan
    async with ClaudeBox(session_id="auth-feature", skills=[PLANNING_SKILL]) as box:
        await box.code("Create task_plan.md for the authentication feature")

    # Later session — same workspace, plan files still there
    async with ClaudeBox.reconnect("auth-feature") as box:
        await box.code("Continue implementing the login endpoint from the plan")

    # Clean up when done
    await ClaudeBox.cleanup_session("auth-feature", remove_workspace=True)

asyncio.run(main())
```

---

## How Hooks Work Inside the VM

ClaudeBox runs Claude Code CLI natively inside the BoxLite micro-VM. This means planning-with-files hooks execute exactly as they do on your local machine:

| Hook | Trigger | What It Does |
|------|---------|--------------|
| **PreToolUse** | Before Write, Edit, Bash, Read, Glob, Grep | Reads first 30 lines of `task_plan.md` — keeps goals in attention |
| **PostToolUse** | After Write, Edit | Reminds agent to update plan status after file changes |
| **Stop** | When agent finishes | Runs completion check script before stopping |

The hook scripts need to be injected alongside SKILL.md. See the full example in `examples/boxlite/quickstart.py` for how to include them.

---

## Session Recovery

When your context fills up and you run `/clear`, the skill recovers the previous session automatically on next activation. Inside a ClaudeBox session, run manually:

```python
async with ClaudeBox.reconnect("my-project") as box:
    await box.code(
        "Run session catchup: python3 ~/.claude/skills/planning-with-files/scripts/session-catchup.py $(pwd)"
    )
```

---

## Snapshots

BoxLite supports checkpointing. Snapshot before a risky implementation phase:

```python
from claudebox import ClaudeBox
from boxlite import Box

async def main():
    async with ClaudeBox(session_id="risky-refactor", skills=[PLANNING_SKILL]) as box:
        # Phase 1 complete — snapshot before the destructive refactor
        await box.box.snapshot("pre-refactor")

        result = await box.code("Refactor the database layer")

        if "error" in result.response.lower():
            await box.box.restore("pre-refactor")
            print("Rolled back to pre-refactor snapshot")

asyncio.run(main())
```

---

## Troubleshooting

### Skill not activating inside the VM?

The skill file must be at `/root/.claude/skills/planning-with-files/SKILL.md` inside the VM. Verify by injecting a validation step:

```python
result = await box.code("ls ~/.claude/skills/planning-with-files/")
print(result.response)
```

### Hooks not running?

The Stop hook script (`check-complete.sh`) must also be injected. Add it to the `files` dict in your Skill object. See `examples/boxlite/quickstart.py` for the full implementation.

### Docker not found?

ClaudeBox uses Docker to pull OCI images for the VM. Install Docker Desktop (macOS/Windows) or Docker Engine (Linux). The sandbox itself does not run as a Docker container — Docker is only used for image management.

### BoxLite not available on Windows host?

BoxLite requires Linux KVM (Linux) or Hypervisor.framework (macOS). On Windows, use WSL2 with KVM enabled.

---

## See Also

- [BoxLite documentation](https://docs.boxlite.ai)
- [ClaudeBox repository](https://github.com/boxlite-ai/claudebox)
- [boxlite-mcp](https://github.com/boxlite-labs/boxlite-mcp) — MCP server for BoxLite sandboxing
- [Quick Start Guide](quickstart.md)
- [Workflow Diagram](workflow.md)
- [Author: @OthmanAdi](https://github.com/OthmanAdi)
