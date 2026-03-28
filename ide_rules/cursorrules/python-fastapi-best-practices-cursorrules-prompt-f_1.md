---
name: "python-fastapi-best-practices-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-best-practices-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the preferred file structure and component usage for FastAPI applications.
globs: **/main.py
---
- File structure: exported router, sub-routes, utilities, static content, types (models, schemas).
- Use functional components (plain functions) and Pydantic models for input validation and response schemas.
- Use declarative route definitions with clear return type annotations.
- Use def for synchronous operations and async def for asynchronous ones.
- Minimize @app.on_event("startup") and @app.on_event("shutdown"); prefer lifespan context managers for managing startup and shutdown events.
- Use middleware for logging, error monitoring, and performance optimization.
```