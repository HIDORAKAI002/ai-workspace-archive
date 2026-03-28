---
name: "nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general coding principles and best practices for TypeScript and React development across the project.
globs: **/*.{ts,tsx}
---
- Write concise, readable TypeScript code.
- Use functional and declarative programming patterns.
- Follow DRY (Don't Repeat Yourself) principle.
- Implement early returns for better readability.
- Structure components logically: exports, subcomponents, helpers, types.
- Use descriptive names with auxiliary verbs (isLoading, hasError).
- Prefix event handlers with 'handle' (handleClick, handleSubmit).
- Use TypeScript for all code.
- Prefer interfaces over types.
- Avoid enums; use const maps instead.
- Implement proper type safety and inference.
- Use `satisfies` operator for type validation.
```