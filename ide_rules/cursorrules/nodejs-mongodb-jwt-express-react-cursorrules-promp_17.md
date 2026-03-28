---
name: "nodejs-mongodb-jwt-express-react-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-jwt-express-react-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the user flow for browsing pools, submitting requests, completing payments, and admin approval.
globs: */user-flow/**/*.*
---
- Users browse available Pools.
- Users submit up to 3 Requests per Pool.
- Users complete payment for Requests.
- Admin approves/rejects Requests.
- Approved Requests become Entries.
```