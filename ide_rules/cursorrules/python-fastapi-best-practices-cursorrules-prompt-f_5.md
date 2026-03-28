---
name: "python-fastapi-best-practices-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-best-practices-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Optimizes performance in FastAPI APIs by using async functions, caching, and other techniques.
globs: **/api/**/*.py
---
- Optimize for performance using async functions for I/O-bound tasks, caching strategies, and lazy loading.
- Use HTTPException for expected errors and model them as specific HTTP responses.
- Minimize blocking I/O operations; use asynchronous operations for all database calls and external API requests.
- Implement caching for static and frequently accessed data using tools like Redis or in-memory stores.
- Optimize data serialization and deserialization with Pydantic.
- Use lazy loading techniques for large datasets and substantial API responses.
```