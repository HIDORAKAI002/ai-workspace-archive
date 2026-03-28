---
name: "graphical-apps-development-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for graphical-apps-development-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General Python project rules for all Python files in the project. Enforces specific Python versions and class usage.
globs: /**/*.*.py
---
- Always use UV when installing dependencies.
- Always use Python 3.12.
- Always use classes instead of functions.
- Docstrings should use a NumPy/SciPy style.
```