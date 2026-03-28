---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to results related files, includes all the logic that involves presenting the result to the user.
globs: /results/**/*.*
---
- Users view Picks/scores for each Entry separately
- Pool standings show all Entries (multiple per User possible)
- Pool members can view all Picks after scoring
```