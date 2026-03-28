---
name: "tailwind-css-nextjs-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for tailwind-css-nextjs-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general TypeScript best practices to all TypeScript files in the project.
globs: **/*.ts
---
- Enable all strict mode options in tsconfig.json
- Explicitly type all variables, parameters, and return values
- Use utility types, mapped types, and conditional types
- Prefer 'interface' for extendable object shapes
- Use 'type' for unions, intersections, and primitive compositions
- Document complex types with JSDoc
- Avoid ambiguous union types, use discriminated unions when necessary
```