# Claude Code Configuration

This repository contains my **global Claude Code configuration** — skills,
agents, and project instructions designed to be used across all projects when
working with Claude AI.

## Components

### Skills (`skills/`)

[Claude Code Skills](https://code.claude.com/docs/en/skills) are custom code
capabilities that extend Claude's ability to perform specific tasks, follow
particular patterns, or apply specialized knowledge. Skills act as reusable
instructions invoked with `/skill-name`.

Skills can include:

- **Coding conventions** and style preferences
- **Architecture patterns** and best practices
- **Testing strategies** and patterns
- **Framework-specific** patterns and idioms
- **Domain-specific** knowledge and approaches

### Agents (`.claude/agents/`)

[Custom agents](https://code.claude.com/docs/en/agents) are specialized
sub-agents that Claude can spawn via the Task tool. Each agent has a specific
purpose and can be configured with different models and instructions.

Current agents:

- **code-improvement-reviewer** — Reviews code for readability, performance, and
  best practices with concrete before/after suggestions

### Rules (`.claude/rules/`)

[Rules](https://code.claude.com/docs/en/memory#modular-rules-with-claude%2Frules%2F)
are modular, topic-specific instruction files that Claude loads automatically.
Unlike skills (which are invoked explicitly), rules apply passively — scoped to
file patterns via YAML frontmatter `paths` globs.

Current rules:

- **go.md** — Go coding conventions: struct layout, error handling, logging,
  observability, testing, and layer separation. Scoped to `**/*.go`.
- **markdown.md** — Markdown formatting, code blocks, and inclusive language
  linting. Scoped to `**/*.md`.

### Project Instructions (`.claude/CLAUDE.md`)

The [CLAUDE.md file](https://code.claude.com/docs/en/memory#claudemd) defines
working relationship preferences and tooling guidelines that apply globally.
This includes:

- Communication style (concise, no sycophancy)
- Tooling preferences (prefer Makefile targets, use Edit over sed)
- Collaboration norms (challenge assumptions, do things right)

## Global Configuration

Everything in this repository is intended to be **global** — applying across all
projects rather than being specific to a single codebase. These are universal
patterns, conventions, and preferences I want Claude to follow consistently.

## Structure

```plain
.claude/
├── CLAUDE.md           # Global project instructions
├── agents/
│   └── *.md            # Custom agent definitions
├── rules/
│   ├── go.md           # Go conventions
│   └── markdown.md     # Markdown linting
└── skills/
    ├── cleanup/
    ├── code-research/
    ├── code-review/
    ├── commit/
    ├── delegate/
    ├── go-api/
    ├── go-testing/
    ├── grepai/
    ├── markdown-to-skill/
    ├── next-task/
    ├── project-plan/
    ├── systematic-debugging/
    └── test-feedback/
```

> [!NOTE]
> If you need to generate Markdown files for the `markdown-to-skill` Skill, then
> you can use [`rodydavis/agent-skills-generator`][agent-skills-generator].

```shell
git clone https://github.com/rodydavis/agent-skills-generator.git

cd agent-skills-generator

cat <<EOF > .skillcontext
https://www.fastly.com/documentation/developers/*
https://docs.fastly.com/*
EOF

go run main.go crawl
```

## Contributing

When adding to this repository:

1. Ensure additions are truly **global** and applicable across multiple projects
1. Write clear, concise descriptions to ensure Claude interprets them accurately.
1. Include examples where helpful
1. Avoid project-specific details or configurations
1. Test with Claude to ensure the desired behavior

## License

This repository contains personal coding skills and preferences. Feel free to
use and adapt these skills for your own projects.

## Notes

I have a global gitignore that prevents `.claude/` from being committed. So I
have to `git add -f .claude/` every time I make a change.

[agent-skills-generator]: https://github.com/rodydavis/agent-skills-generator
