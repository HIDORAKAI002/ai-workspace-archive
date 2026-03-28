---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to pick management files, describes how to manage picks.
globs: /picks/**/*.*
---
- Users make Picks for each Entry separately
- Picks can be updated until deadline (game start or 1PM Sunday of the current week of the pick)
```