---
name: "python-fastapi-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces FastAPI best practices for application code within the 'app' directory, including data validation, dependency injection, and asynchronous operations.
globs: app/**/*.*
---
- Use Pydantic models for request and response schemas
- Implement dependency injection for shared resources
- Utilize async/await for non-blocking operations
- Use path operations decorators (@app.get, @app.post, etc.)
- Implement proper error handling with HTTPException
- Use FastAPI's built-in OpenAPI and JSON Schema support
```