---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Limits the number of requests a user can make per pool to 3.
globs: */request-handling/**/*.*
---
- Limit Requests to 3 per User per Pool.
```