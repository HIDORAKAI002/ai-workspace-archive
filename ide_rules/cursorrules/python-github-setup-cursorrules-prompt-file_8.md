---
name: "python-github-setup-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-github-setup-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Sets code formatting rules for Python projects using Black and Pylint and following PEP 8.
globs: **/*.py
---
- Use Black for code formatting.
- Use Pylint for linting.
- Follow PEP 8 and project-specific rules.
```