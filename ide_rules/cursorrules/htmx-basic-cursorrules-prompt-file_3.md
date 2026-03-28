---
name: "htmx-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces a specific folder structure within the 'src' directory for HTMX projects, promoting organization and maintainability of templates, static assets, and application logic.
globs: src/**/*.*
---
- Enforce the following folder structure:
  
  src/
    templates/
    static/
      css/
      js/
    app.py
```