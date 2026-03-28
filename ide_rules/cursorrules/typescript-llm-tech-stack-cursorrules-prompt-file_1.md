---
name: "typescript-llm-tech-stack-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-llm-tech-stack-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Sets specific code style guidelines for TypeScript files, focusing on variable declaration, function usage, and type system utilization.
globs: **/*.ts
---
- Prefer `const` over `let` when variables won't be reassigned
- Use arrow functions for better lexical scoping and concise syntax
- Utilize TypeScript's type system fully: use interfaces, type aliases, and generics where appropriate
- Implement error handling with custom error types
- Write pure functions where possible to improve testability and reduce side effects
```