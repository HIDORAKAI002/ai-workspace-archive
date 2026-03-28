---
name: "javascript-typescript-code-quality-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-typescript-code-quality-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the function ordering conventions, where functions that compose other functions appear earlier in the file, regardless of the file type.
globs: **/*.*
---
- Order functions with those that are composing other functions appearing earlier in the file. For example, if you have a menu with multiple buttons, define the menu function above the buttons.
```