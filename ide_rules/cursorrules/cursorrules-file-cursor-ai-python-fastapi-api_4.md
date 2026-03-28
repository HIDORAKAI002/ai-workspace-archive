---
name: "cursorrules-file-cursor-ai-python-fastapi-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-file-cursor-ai-python-fastapi-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines the preferred style for conditional statements in Python files.
globs: **/*.py
---
- Avoid unnecessary curly braces in conditional statements.
- For single-line statements in conditionals, omit curly braces.
- Use concise, one-line syntax for simple conditional statements (e.g., if condition: do_something()).
```