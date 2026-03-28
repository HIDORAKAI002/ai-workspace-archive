---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines how users manage their picks for each entry, including update deadlines.
globs: */pick-management/**/*.*
---
- Users make Picks for each Entry separately.
- Picks can be updated until the deadline (game start or 1PM Sunday of the current week of the pick).
```