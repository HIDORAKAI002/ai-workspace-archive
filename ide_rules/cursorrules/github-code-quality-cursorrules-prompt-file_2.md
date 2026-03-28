---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule instructs the AI to make changes file by file, allowing the user to review each change individually.
globs: **/*.*
---
- Make changes file by file and give me a chance to spot mistakes
```