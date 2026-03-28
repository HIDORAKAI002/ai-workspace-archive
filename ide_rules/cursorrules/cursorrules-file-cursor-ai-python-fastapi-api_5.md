---
name: "cursorrules-file-cursor-ai-python-fastapi-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-file-cursor-ai-python-fastapi-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Lists essential dependencies for FastAPI projects.
globs: **/requirements.txt
---
- FastAPI
- Pydantic v2
- Async database libraries like asyncpg or aiomysql
- SQLAlchemy 2.0 (if using ORM features)
```