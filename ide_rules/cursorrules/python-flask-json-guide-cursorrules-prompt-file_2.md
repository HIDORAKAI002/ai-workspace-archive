---
name: "python-flask-json-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-flask-json-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines general Python version and dependency management rules for the project.
globs: **/*.py
---
- Always use UV when installing dependencies.
- Always use Python 3.12.
- Always use classes instead of functions when appropriate.
```