---
name: "python-312-fastapi-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-312-fastapi-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Ensures the project uses Poetry for managing dependencies, promoting consistent and reproducible builds.
globs: **/pyproject.toml
---
- Use poetry for dependency management.
- Use UV when installing dependencies.

```