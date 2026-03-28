---
name: "python-fastapi-best-practices-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-best-practices-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines how errors should be handled within FastAPI applications using middleware.
globs: **/middleware.py
---
- Use middleware for handling unexpected errors, logging, and error monitoring.
- Prioritize error handling and edge cases.
- Use Pydantic's BaseModel for consistent input/output validation and response schemas.
```