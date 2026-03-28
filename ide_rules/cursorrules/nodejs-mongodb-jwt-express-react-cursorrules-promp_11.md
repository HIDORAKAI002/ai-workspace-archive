---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies how picks are scored, how entries advance or are eliminated, and how entries are ranked.
globs: */scoring-ranking/**/*.*
---
- Picks scored after games complete.
- Win: Entry moves to the next week.
- Loss: Entry eliminated from Pool.
- Each Entry ranked separately in Pool standings.
```