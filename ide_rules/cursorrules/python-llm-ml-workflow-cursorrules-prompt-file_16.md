---
name: "python-llm-ml-workflow-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-llm-ml-workflow-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Mandates strict type hinting using the typing module for all Python functions, methods, and class members.
globs: **/*.py
---
- **Type Hinting:** Strictly use the `typing` module. All functions, methods, and class members must have type annotations.
```