---
name: "convex-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for convex-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the understanding that Convex automatically handles system fields (_id, _creationTime) and that manual index creation for these fields is unnecessary.
globs: **/convex/schema.ts
---
- Understand that Convex automatically generates system fields `_id` and `_creationTime` for every document.
- Do not manually add indices for `_id` and `_creationTime` as they are added automatically.
```