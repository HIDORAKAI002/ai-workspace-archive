---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule prevents the AI from asking the user to verify implementations that are visible in the provided context.
globs: **/*.*
---
- Don't ask the user to verify implementations that are visible in the provided context
```