---
name: "python-github-setup-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-github-setup-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines configuration management practices for Python projects, including using .env files and python-dotenv.
globs: **/*.py
---
- Use .env files for configuration.
- Use python-dotenv for environment variable management.
- Manage secrets using environment variables.
```