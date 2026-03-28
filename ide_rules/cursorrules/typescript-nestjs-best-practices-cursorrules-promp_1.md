---
name: "typescript-nestjs-best-practices-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nestjs-best-practices-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces specific guidelines for the core module in NestJS, focusing on global filters, middleware, guards, and interceptors.
globs: src/core/**/*.*
---
- Global filters for exception handling.
- Global middlewares for request management.
- Guards for permission management.
- Interceptors for request management.
```