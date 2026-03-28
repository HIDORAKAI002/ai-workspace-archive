---
name: "nodejs-mongodb-cursorrules-prompt-file-tutorial Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nodejs-mongodb-cursorrules-prompt-file-tutorial

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules related to managing requests and implementing state transitions
globs: /requests/**/*.*
---
- Limit Requests to 3 per User per Pool
- Track Requests and Entries separately (numbered 1, 2, 3)
- Implement payment status tracking in Request model
- Create Entry only after admin approval and payment completion
- Implement state transitions (Request: pending -> approved -> Entry created)
```