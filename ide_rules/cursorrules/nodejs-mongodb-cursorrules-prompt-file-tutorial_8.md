---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to the pools related files. Strictly adheres to the specified user flow and game rules for pools.
globs: /pools/**/*.*
---
- Strictly adhere to specified user flow and game rules.
- Users browse available Pools
- Submit up to 3 Requests per Pool
- Complete payment for Requests
- Admin approves/rejects Requests
- Approved Requests become Entries
```