---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines the rules for entry management, including the number of entries per user, entry numbering, and pick management.
globs: */entry-management/**/*.*
---
- Each user can have up to 3 Entries per Pool.
- Entries are numbered 1, 2, 3.
- Picks are made and tracked separately for each Entry.
```