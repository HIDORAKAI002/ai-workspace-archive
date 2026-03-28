---
name: "python-github-setup-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-github-setup-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Configures logging practices for Python applications, including using the Python logging module and defining log levels.
globs: **/*.py
---
- Use the Python logging module for logging.
- Use log levels: debug, info, warn, error.
- Set a log retention policy of 7 days.
```