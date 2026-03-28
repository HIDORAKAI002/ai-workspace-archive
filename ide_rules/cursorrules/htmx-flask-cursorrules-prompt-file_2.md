---
name: "htmx-flask-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-flask-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces a standard folder structure for Flask projects with Python files.
globs: *.py
---
- Define the following folder structure:

app/
  templates/
  static/
    css/
    js/
  models/
  routes/
  __init__.py
config.py
run.py
```