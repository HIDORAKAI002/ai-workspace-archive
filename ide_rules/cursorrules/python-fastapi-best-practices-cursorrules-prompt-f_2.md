---
name: "python-fastapi-best-practices-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-best-practices-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the preferred asynchronous database libraries and interaction patterns for FastAPI applications.
globs: **/db/**/*.py
---
- Async database libraries like asyncpg or aiomysql.
- SQLAlchemy 2.0 (if using ORM features).
- Minimize blocking I/O operations; use asynchronous operations for all database calls.
```