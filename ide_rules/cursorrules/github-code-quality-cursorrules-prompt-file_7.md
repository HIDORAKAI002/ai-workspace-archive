---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule instructs the AI not to consider any previous x.md files in its memory, ensuring it treats each run independently.
globs: **/*.*
---
- Do not consider any previous x.md files in your memory. Complain if the contents are the same as previous runs.
```