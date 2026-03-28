---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to scoring logic. Describes the scoring system and ranking process.
globs: /scoring/**/*.*
---
- Picks scored after games complete
- Win: Entry moves to next week
- Loss: Entry eliminated from Pool
- Each Entry ranked separately in Pool standings
```