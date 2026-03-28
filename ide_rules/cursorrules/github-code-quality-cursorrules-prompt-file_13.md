---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule instructs the AI to preserve existing code and functionalities, avoiding unnecessary removal of code.
globs: **/*.*
---
- Don't remove unrelated code or functionalities. Pay attention to preserving existing structures.
```