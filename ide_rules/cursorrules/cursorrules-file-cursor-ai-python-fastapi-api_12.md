---
name: "cursorrules-file-cursor-ai-python-fastapi-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-file-cursor-ai-python-fastapi-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Recommends minimizing the use of startup and shutdown events in favor of lifespan context managers.
globs: **/main.py
---
- Minimize @app.on_event("startup") and @app.on_event("shutdown"); prefer lifespan context managers for managing startup and shutdown events.
```