---
name: "python-fastapi-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for defining Pydantic models within the models directory of a FastAPI project to ensure data validation and serialization.
globs: app/models/*.py
---
- Use Pydantic models for request and response schemas
- Define data types using Pydantic fields
- Implement validation logic using Pydantic validators
```