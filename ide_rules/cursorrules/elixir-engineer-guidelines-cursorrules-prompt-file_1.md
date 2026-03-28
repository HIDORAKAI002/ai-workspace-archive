---
name: "elixir-engineer-guidelines-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for elixir-engineer-guidelines-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies commit message standards to all files in the project.
globs: **/*
---
- Use the following commit message format:
  <type>[optional scope]: <description>

  [optional body]

  [optional footer(s)]

  Where:

  type: One of the following: fix, feat, build, chore, ci, docs, perf, refactor, revert, style, test

  scope (optional): A noun describing a section of the codebase (e.g., fluxcd, deployment).

  description: A brief summary of the change in present tense.

  body (optional): A more detailed explanation of the change.

  footer (optional): One or more footers in the specified format.
```