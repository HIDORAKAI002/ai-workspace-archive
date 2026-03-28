---
name: "cursorrules-file-cursor-ai-python-fastapi-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-file-cursor-ai-python-fastapi-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the use of 'def' and 'async def' for function definitions within FastAPI routers.
globs: **/routers/*.py
---
- Use def for pure functions and async def for asynchronous operations.
- Use type hints for all function signatures. Prefer Pydantic models over raw dictionaries for input validation.
```