---
name: "typescript-clasp-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-clasp-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guides the correct usage of TypeScript features like interfaces, types, and enums within Google Apps Script.
globs: **/*.ts
---
- Use TypeScript for all code; prefer interfaces over types.
- Use enums when appropriate for Google Apps Script constants.
- Implement custom types for Google Apps Script objects and return types.
```