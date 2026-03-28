---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule ensures the AI provides links to the real files instead of placeholder names like x.md.
globs: **/*.*
---
- Always provide links to the real files, not x.md
```