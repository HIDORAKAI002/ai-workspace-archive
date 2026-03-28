---
name: "cursorrules-file-cursor-ai-python-fastapi-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-file-cursor-ai-python-fastapi-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the use of functional components and Pydantic models for input validation in FastAPI routes.
globs: **/routers/*.py
---
- Use functional components (plain functions) and Pydantic models for input validation and response schemas.
- Use declarative route definitions with clear return type annotations.
```