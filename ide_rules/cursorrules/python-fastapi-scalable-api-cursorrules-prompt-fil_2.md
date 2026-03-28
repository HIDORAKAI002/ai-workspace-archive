---
name: "python-fastapi-scalable-api-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-fastapi-scalable-api-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules regarding docker usage in the project.
globs: Dockerfile*
---
- Use Docker for containerization and ensure easy deployment.
- Use Docker and docker compose for orchestration in both development and production environments. Avoid using the obsolete `docker-compose` command.
```