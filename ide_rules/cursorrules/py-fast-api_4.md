---
name: "py-fast-api Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for py-fast-api

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for structuring routes and dependencies in FastAPI applications, stored in the routers directory.
globs: **/routers/*.py
---
- File structure: exported router, sub-routes, utilities, static content, types (models, schemas).
- Avoid unnecessary curly braces in conditional statements.
- For single-line statements in conditionals, omit curly braces.
- Use concise, one-line syntax for simple conditional statements (e.g., if condition: do_something()).
- Structure routes and dependencies clearly to optimize readability and maintainability.
```