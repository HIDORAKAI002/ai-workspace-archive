---
name: "typescript-clasp-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-clasp-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces specific code style and structure guidelines for TypeScript and Google Apps Script development.
globs: **/*.ts
---
- Write concise, technical TypeScript code with accurate examples for Google Apps Script.
- Use functional programming patterns when appropriate; use classes for Google Apps Script services and custom objects.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isProcessing, hasError).
- Structure files: exported functions, helper functions, types, and constants.
```