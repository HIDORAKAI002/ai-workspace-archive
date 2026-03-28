---
name: "javascript-typescript-code-quality-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-typescript-code-quality-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: TypeScript should not use JSDoc comments as TypeScript's type system obviates the need.
globs: **/*.ts
---
- JSDoc Comments: Do not use JSDoc comments because this is TypeScript and types are defined.
```