---
name: "github-code-quality-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for github-code-quality-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule instructs the AI not to suggest updates or changes to files when there are no actual modifications needed.
globs: **/*.*
---
- Don't suggest updates or changes to files when there are no actual modifications needed
```