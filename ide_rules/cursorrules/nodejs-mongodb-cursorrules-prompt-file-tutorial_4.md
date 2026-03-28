---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to the entries related files. Details entry management related requirements.
globs: /entries/**/*.*
---
- Each user can have up to 3 Entries per Pool
- Entries are numbered 1, 2, 3
- Picks are made and tracked separately for each Entry
```