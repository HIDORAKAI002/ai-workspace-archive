---
name: "sveltekit-restful-api-tailwind-css-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-restful-api-tailwind-css-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies guidelines for Windows compatibility, including providing PowerShell commands and avoiding Unix-specific commands. This rule ensures cross-platform compatibility for Windows users.
globs: **/*
---
- |-
  12. Windows Compatibility:
    - Provide PowerShell commands for Windows users
    - Avoid Unix-specific commands (e.g., use `Remove-Item` instead of `rm`)
    - Use cross-platform Node.js commands when possible
```