---
name: "typescript-nodejs-nextjs-react-ui-css-cursorrules- Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nodejs-nextjs-react-ui-css-cursorrules-

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces specific TypeScript coding practices, including using interfaces over types and avoiding enums in favor of maps, across all TypeScript files in the project.
globs: **/*.{ts,tsx}
---
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.
```