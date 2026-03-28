---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule requires the AI to provide all edits in a single chunk, avoiding multiple-step instructions for the same file.
globs: **/*.*
---
- Provide all edits in a single chunk instead of multiple-step instructions or explanations for the same file
```