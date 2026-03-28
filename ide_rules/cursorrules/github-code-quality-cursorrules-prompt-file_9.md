---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule instructs the AI to avoid providing feedback about understanding in comments or documentation.
globs: **/*.*
---
- Avoid giving feedback about understanding in comments or documentation
```