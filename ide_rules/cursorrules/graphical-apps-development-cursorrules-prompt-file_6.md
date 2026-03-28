---
name: "graphical-apps-development-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for graphical-apps-development-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules related to Param, to be applied when defining models. Models use Param to define parameters with validation and reactivity.
globs: /**/*_model.py
---
- Use Param to create parameterized classes.
- Param should handle type validation, default values, and constraints.
- Use Param's reactivity features (event handlers) to catch changes.
```