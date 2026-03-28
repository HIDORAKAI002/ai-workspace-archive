---
name: "py-fast-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for py-fast-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for interacting with databases using async libraries within the db directory.
globs: **/db/*.py
---
- Async database libraries like asyncpg or aiomysql
- SQLAlchemy 2.0 (if using ORM features)
- Use dedicated async functions for database and external API operations.
```