---
name: "optimize-dry-solid-principles-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for optimize-dry-solid-principles-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the use of UV for dependency installation and Python 3.12 within the service-1 directory.
globs: /service-1/**/*.*
---
- Always use UV when installing dependencies.
- Always use Python 3.12.
- Always use classes instead of functions.
```