---
name: "nextjs-react-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-react-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific JavaScript/TypeScript coding style guidelines. Focuses on syntax, usage of TypeScript features, and file structure.
globs: **/*.{ts,js,jsx,tsx}
---
- Use "function" keyword for pure functions. Omit semicolons.
- Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps.
- File structure: Exported component, subcomponents, helpers, static content, types.
- Avoid unnecessary curly braces in conditional statements.
- For single-line statements in conditionals, omit curly braces.
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething()).
```