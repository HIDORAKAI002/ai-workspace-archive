---
name: "python-312-fastapi-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-312-fastapi-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies that Alembic should be used for managing database migrations, ensuring controlled schema evolution.
globs: **/migrations/**/*.*
---
- Use alembic for database migrations.
```