---
name: "py-fast-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for py-fast-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for creating Pydantic models, focusing on versioning and usage within the project.
globs: **/models/*.py
---
- Use type hints for all function signatures. Prefer Pydantic models over raw dictionaries for input validation.
- Use Pydantic v2.
- Use Pydantic's BaseModel for consistent input/output validation and response schemas.
```