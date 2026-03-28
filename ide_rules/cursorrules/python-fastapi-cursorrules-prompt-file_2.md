---
name: "python-fastapi-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the recommended folder structure for FastAPI projects to maintain organization and separation of concerns within the 'app' directory.
globs: app/**/*.*
---
- Follow this folder structure:

app/
  main.py
  models/
  schemas/
  routers/
  dependencies/
  services/
  tests/
```