"""
planning-with-files + BoxLite quickstart

Runs Claude Code with the planning-with-files skill inside a BoxLite micro-VM.
The skill is injected into the VM filesystem via ClaudeBox's Skill API.

Requirements:
    pip install claudebox
    export CLAUDE_CODE_OAUTH_TOKEN=sk-ant-oat01-...

Usage:
    python quickstart.py
"""

import asyncio
from pathlib import Path

from claudebox import ClaudeBox, Skill


def load_skill() -> Skill:
    """
    Build a ClaudeBox Skill from the planning-with-files SKILL.md.

    Reads the SKILL.md from your local Claude Code skills directory.
    If not installed locally, falls back to fetching from the repo.
    """
    skill_base = Path.home() / ".claude" / "skills" / "planning-with-files"
    skill_md_path = skill_base / "SKILL.md"
    check_complete_path = skill_base / "scripts" / "check-complete.sh"

    if not skill_md_path.exists():
        raise FileNotFoundError(
            "planning-with-files is not installed locally.\n"
            "Install it first:\n"
            "  /plugin marketplace add OthmanAdi/planning-with-files\n"
            "  /plugin install planning-with-files@planning-with-files"
        )

    files = {
        "/root/.claude/skills/planning-with-files/SKILL.md": skill_md_path.read_text(),
    }

    # Include the stop hook script if available
    if check_complete_path.exists():
        files["/root/.claude/skills/planning-with-files/scripts/check-complete.sh"] = (
            check_complete_path.read_text()
        )

    return Skill(
        name="planning-with-files",
        description=(
            "Manus-style file-based planning. Creates task_plan.md, findings.md, "
            "and progress.md. Use for complex multi-step tasks requiring >5 tool calls."
        ),
        files=files,
    )


async def main():
    skill = load_skill()

    print("Starting BoxLite VM with planning-with-files skill...")

    async with ClaudeBox(
        session_id="planning-demo",
        skills=[skill],
    ) as box:
        print("VM running. Invoking planning session...\n")

        result = await box.code(
            "/planning-with-files:plan\n\n"
            "Task: Build a REST API endpoint for user authentication with JWT tokens. "
            "Plan the implementation phases, identify the key files to create, "
            "and list the dependencies needed."
        )

        print("=== Claude Code Output ===")
        print(result.response)
        print("==========================")

        # Show what planning files were created inside the VM
        files_result = await box.code(
            "ls -la task_plan.md findings.md progress.md 2>/dev/null && "
            "echo '---' && head -20 task_plan.md 2>/dev/null"
        )
        print("\n=== Planning Files in VM ===")
        print(files_result.response)

    print("\nSession complete. Workspace persists at ~/.claudebox/sessions/planning-demo")
    print("Reconnect later with: ClaudeBox.reconnect('planning-demo')")


async def persistent_session_example():
    """
    Example of a multi-session workflow.
    Session 1 creates the plan. Session 2 continues from it.
    """
    skill = load_skill()

    # Session 1
    async with ClaudeBox(session_id="multi-session-demo", skills=[skill]) as box:
        await box.code(
            "/planning-with-files:plan\n\n"
            "Task: Refactor the user service to support multi-tenancy."
        )
        print("Session 1 complete. Plan created inside VM.")

    # Session 2 — same workspace, plan files intact
    async with ClaudeBox.reconnect("multi-session-demo") as box:
        result = await box.code(
            "Read task_plan.md and continue with the next incomplete phase."
        )
        print("Session 2:", result.response[:200])

    # Clean up
    await ClaudeBox.cleanup_session("multi-session-demo", remove_workspace=True)
    print("Workspace cleaned up.")


if __name__ == "__main__":
    asyncio.run(main())
