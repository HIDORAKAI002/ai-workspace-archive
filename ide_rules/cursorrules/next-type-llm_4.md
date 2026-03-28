---
name: "next-type-llm Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for next-type-llm

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Prioritizes the method for editing code and defines verbosity levels.
globs: *
---
- Editing Code (prioritized choices):
  - Return completely edited file
- Verbosity: I may use V=[0-3] to define code detail:
  - V=0 code golf
  - V=1 concise
  - V=2 simple
  - V=3 verbose, DRY with extracted functions
```