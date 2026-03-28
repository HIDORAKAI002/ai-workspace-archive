---
name: "typescript-vite-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-vite-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general TypeScript best practices, including using interfaces, avoiding enums, and using functional components.
globs: **/*.ts
---
- Use TypeScript for all code; prefer interfaces over types for their extendability and ability to merge.
- Avoid enums; use maps instead for better type safety and flexibility.
- Use functional components with TypeScript interfaces.
```