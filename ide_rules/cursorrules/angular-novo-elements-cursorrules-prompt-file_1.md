---
name: "angular-novo-elements-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for angular-novo-elements-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for Angular components, tailored for standalone components without modules.
globs: **/*.ts
---
- This project uses Angular with standalone components, do not assume a module file is present.
```