---
name: "typescript-nestjs-best-practices-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nestjs-best-practices-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Sets standards for testing NestJS applications, including unit, integration, and end-to-end tests, plus the use of Jest.
globs: **/*.spec.ts
---
- Use the standard Jest framework for testing.
- Write tests for each controller and service.
- Write end to end tests for each api module.
- Add a admin/test method to each controller as a smoke test.
```