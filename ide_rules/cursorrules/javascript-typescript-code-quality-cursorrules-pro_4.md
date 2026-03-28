---
name: "javascript-typescript-code-quality-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-typescript-code-quality-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies guidelines for descriptive naming conventions and usage of constants over functions in all files.
globs: **/*.*
---
- Descriptive Names: Use descriptive names for variables and functions. Prefix event handler functions with "handle" (e.g., handleClick, handleKeyDown).
- Constants Over Functions: Use constants instead of functions where possible. Define types if applicable.
```