---
name: "python-github-setup-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-github-setup-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces security best practices for Python code, including requiring HTTPS, input sanitization, and using environment variables.
globs: **/*.py
---
- Require HTTPS for secure connections.
- Sanitize all inputs.
- Validate all inputs.
- Use environment variables for sensitive configuration.
```