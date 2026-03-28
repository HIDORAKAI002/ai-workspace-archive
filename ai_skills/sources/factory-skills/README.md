# Skills

Skills are reusable capabilities that Droids invoke on demand. They pack instructions, expertise, and tools into a lightweight package that teaches the agent how to complete specific tasks in a repeatable way.

**Key properties:**

- **Model-invoked** - Droids decide when to use them based on the task, not typed commands
- **Composable** - Can be chained together as part of larger workflows
- **Token-efficient** - Lightweight and focused, not bloated with unused tools or repeated instructions

For more information, see the [Factory Skills documentation](https://docs.factory.ai/cli/configuration/skills).

## About This Repository

This repository contains example skills for Factory's Droid system. These skills demonstrate patterns for common workflows like code review and security analysis.

Each skill is self-contained in its own folder with a `SKILL.md` file containing the instructions and metadata that Droids use. Browse through these skills to get inspiration for your own or to understand different patterns and approaches.

## Where Skills Live

Skills are discovered from well-known locations:

| Scope | Location | Purpose |
|-------|----------|---------|
| **Workspace** | `<repo>/.factory/skills/` | Project skills shared with teammates; checked into git |
| **Personal** | `~/.factory/skills/` | Private skills that follow you across projects |

Each skill lives in its own directory:
- Workspace: `<repo>/.factory/skills/<skill-name>/SKILL.md`
- Personal: `~/.factory/skills/<skill-name>/SKILL.md`

## Quickstart

1. Copy a skill folder from `skills/<skill-name>/` to your target location:
   ```bash
   # For project-wide use
   cp -r skills/code-review .factory/skills/code-review
   
   # For personal use across all projects
   cp -r skills/security-review ~/.factory/skills/security-review
   ```

2. Restart `droid` so it rescans skills

3. Describe your task normally - the Droid will automatically invoke matching skills when they apply

## Included Skills

| Skill | Description |
|-------|-------------|
| [`code-review`](./skills/code-review/) | Review code changes (diffs, PRs, patches) with structured, actionable feedback on correctness, maintainability, and test coverage |
| [`security-review`](./skills/security-review/) | STRIDE-based security analysis that scans code for vulnerabilities, validates exploitability, and outputs structured findings for patch generation. Supports PR review, scheduled scans, and full repo audits |

## Creating a Basic Skill

Skills are simple to create - just a folder with a `SKILL.md` file containing YAML frontmatter and instructions:

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that the Droid will follow when this skill is active]

## Instructions
- Step 1
- Step 2

## Guidelines
- Guideline 1
- Guideline 2
```

The frontmatter requires only two fields:
- `name` - A unique identifier for your skill (lowercase, hyphens for spaces)
- `description` - A complete description of what the skill does and when to use it

Use the [`template/`](./template/) folder as a starting point.

## Disclaimer

**These skills are provided for demonstration and educational purposes.** The implementations and behaviors you receive may vary based on context and model capabilities. Always test skills thoroughly in your own environment before relying on them for critical tasks.

## License

MIT License - see [LICENSE](LICENSE) file for details.
