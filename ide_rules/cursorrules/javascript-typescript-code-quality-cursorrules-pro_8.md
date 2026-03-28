---
name: "javascript-typescript-code-quality-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-typescript-code-quality-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the principle of making minimal code changes to avoid introducing bugs or technical debt in any file.
globs: **/*.*
---
- Only modify sections of the code related to the task at hand.
- Avoid modifying unrelated pieces of code.
- Accomplish goals with minimal code changes.
```