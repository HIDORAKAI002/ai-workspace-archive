---
name: "graphical-apps-development-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for graphical-apps-development-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for maintaining a consistent file structure within individual element directories.
globs: /element_templates/**/*
---
- Each element should have a directory containing:
  - `__init__.py`
  - `<element_name>_element.py`
  - `<element_name>_model.py`
  - `css/` directory containing CSS files for styling.
```