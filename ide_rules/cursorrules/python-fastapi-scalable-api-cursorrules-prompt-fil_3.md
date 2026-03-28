---
name: "python-fastapi-scalable-api-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-scalable-api-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines conventions specific to FastAPI usage in the backend.
globs: backend/src/**/*.py
---
- Follow RESTful API design principles.
- Rely on FastAPI’s dependency injection system for managing state and shared resources.
- Use SQLAlchemy 2.0 for ORM features, if applicable.
- Ensure CORS is properly configured for local development.
- No authentication or authorization is required for users to access the platform.
```