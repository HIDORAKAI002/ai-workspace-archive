---
name: "python-llm-ml-workflow-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-llm-ml-workflow-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces code formatting using Ruff, replacing Black, isort, and flake8 for consistent style.
globs: **/*.py
---
- **Code Formatting:** Ruff (replaces `black`, `isort`, `flake8`)
```