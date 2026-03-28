---
name: "javascript-typescript-code-quality-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-typescript-code-quality-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the usage of TODO comments to outline problems or bugs encountered in existing code, regardless of file type.
globs: **/*.*
---
- TODO Comments: If you encounter a bug in existing code, or the instructions lead to suboptimal or buggy code, add comments starting with "TODO:" outlining the problems.
```