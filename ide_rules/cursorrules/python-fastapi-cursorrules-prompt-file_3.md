---
name: "python-fastapi-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies guidelines for the main application file in FastAPI projects, focusing on application initialization and configuration.
globs: app/main.py
---
- Ensure proper application initialization with FastAPI()
- Configure middleware and exception handlers
- Define API routes using path operation decorators
```