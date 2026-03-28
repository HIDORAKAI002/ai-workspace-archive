# Mastra Code Setup

Using planning-with-files with [Mastra Code](https://code.mastra.ai/).

---

## Overview

Mastra Code auto-discovers skills from `.mastracode/skills/` directories. It also has built-in Claude Code compatibility, so it reads `.claude/skills/` too — but the dedicated `.mastracode/` integration gives you native hooks support.

## Installation

### Method 1: Workspace Installation (Recommended)

Share the skill with your entire team by adding it to your repository:

```bash
# In your project repository
git clone https://github.com/OthmanAdi/planning-with-files.git /tmp/planning-with-files

# Copy the Mastra Code skill to your repo
cp -r /tmp/planning-with-files/.mastracode .

# Commit to share with team
git add .mastracode/
git commit -m "Add planning-with-files skill for Mastra Code"
git push

# Clean up
rm -rf /tmp/planning-with-files
```

Now everyone on your team using Mastra Code will have access to the skill.

### Method 2: Personal Installation

Install just for yourself:

```bash
# Clone the repo
git clone https://github.com/OthmanAdi/planning-with-files.git /tmp/planning-with-files

# Copy skill to your personal Mastra Code skills folder
mkdir -p ~/.mastracode/skills
cp -r /tmp/planning-with-files/.mastracode/skills/planning-with-files ~/.mastracode/skills/

# Copy hooks (required for plan enforcement)
# If you already have ~/.mastracode/hooks.json, merge the entries manually
cp /tmp/planning-with-files/.mastracode/hooks.json ~/.mastracode/hooks.json

# Clean up
rm -rf /tmp/planning-with-files
```

> **Note:** If you already have a `~/.mastracode/hooks.json`, do not overwrite it. Instead, merge the PreToolUse, PostToolUse, and Stop entries from the skill's hooks.json into your existing file.

### Verification

```bash
ls -la ~/.mastracode/skills/planning-with-files/SKILL.md
```

Restart your Mastra Code session. The skill auto-activates when you work on complex tasks.

---

## How It Works

### Hooks (via hooks.json)

Mastra Code uses a separate `hooks.json` file for lifecycle hooks. This is different from Claude Code, which defines hooks in SKILL.md frontmatter. Mastra Code reads hooks from:

1. `.mastracode/hooks.json` (project-level, highest priority)
2. `~/.mastracode/hooks.json` (global)

This integration includes a pre-configured `hooks.json` with all three hooks:

| Hook | Matcher | What It Does |
|------|---------|--------------|
| **PreToolUse** | Write, Edit, Bash, Read, Glob, Grep | Reads first 30 lines of `task_plan.md` to keep goals in attention |
| **PostToolUse** | Write, Edit | Reminds you to update plan status after file changes |
| **Stop** | (all) | Runs `check-complete.sh` to verify all phases are done |

### Auto-Activation

The skill activates when you:
- Mention "complex task" or "multi-step project"
- Ask to "plan out" or "break down" work
- Request help organizing or tracking progress
- Start research tasks requiring >5 tool calls

### The Three Files

Once activated, the skill creates:

| File | Purpose | Location |
|------|---------|----------|
| `task_plan.md` | Phases, progress, decisions | Your project root |
| `findings.md` | Research, discoveries | Your project root |
| `progress.md` | Session log, test results | Your project root |

---

## Claude Code Compatibility

Mastra Code reads from `.claude/skills/` as a fallback. If you already have planning-with-files installed for Claude Code, it will work — but the dedicated `.mastracode/` installation gives you:

- Native hooks via `hooks.json` (PreToolUse, PostToolUse, Stop)
- Correct script path resolution for Mastra Code directories
- No path conflicts with Claude Code plugin root

---

## Session Recovery

When your context fills up and you run `/clear`, the skill can recover your previous session.

Run manually:

```bash
# Linux/macOS
python3 ~/.mastracode/skills/planning-with-files/scripts/session-catchup.py "$(pwd)"
```

```powershell
# Windows PowerShell
python "$env:USERPROFILE\.mastracode\skills\planning-with-files\scripts\session-catchup.py" (Get-Location)
```

---

## Team Workflow

### Workspace Skills (Recommended)

With workspace installation (`.mastracode/skills/`):
- Everyone on team has the skill
- Consistent planning across projects
- Version controlled with your repo
- Changes sync via git

### Personal Skills

With personal installation (`~/.mastracode/skills/`):
- Use across all your projects
- Keep it even if you switch teams
- Not shared with teammates

---

## Troubleshooting

### Skill Not Activating?

1. Verify the file exists: `ls ~/.mastracode/skills/planning-with-files/SKILL.md`
2. Restart Mastra Code — skills are scanned on startup
3. Use trigger phrases: "plan out", "break down", "organize", "track progress"

### Hooks Not Running?

Mastra Code reads hooks from `hooks.json`, not from SKILL.md frontmatter. Verify:

1. Check that `.mastracode/hooks.json` exists in your project root (workspace install) or `~/.mastracode/hooks.json` (personal install)
2. Verify the file contains PreToolUse, PostToolUse, and Stop entries
3. Restart Mastra Code after adding or modifying hooks.json

### Already Using Claude Code?

No conflict. Mastra Code checks `.mastracode/skills/` first, then falls back to `.claude/skills/`. You can have both installed.

---

## Support

- **GitHub Issues:** https://github.com/OthmanAdi/planning-with-files/issues
- **Mastra Code Docs:** https://code.mastra.ai/configuration
- **Author:** [@OthmanAdi](https://github.com/OthmanAdi)

---

## See Also

- [Quick Start Guide](quickstart.md)
- [Workflow Diagram](workflow.md)
- [Manus Principles](../skills/planning-with-files/reference.md)
- [Real Examples](../skills/planning-with-files/examples.md)
