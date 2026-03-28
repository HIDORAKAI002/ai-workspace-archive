---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines how results and standings are displayed to users, including pick visibility and pool standings.
globs: */results-standings/**/*.*
---
- Users view Picks/scores for each Entry separately.
- Pool standings show all Entries (multiple per User possible).
- Pool members can view all Picks after scoring.
```