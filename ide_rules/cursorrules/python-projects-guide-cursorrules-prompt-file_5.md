---
name: "python-projects-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-projects-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies uv (preferred) for dependency management and virtual environments for consistent and isolated project dependencies.
globs: /**/pyproject.toml
---
- Manage dependencies via https://github.com/astral-sh/uv and virtual environments.
```