---
name: "convex-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for convex-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general rules for Convex development, emphasizing schema design, validator usage, and correct handling of system fields.
globs: **/convex/**/*.*
---
- When working with Convex, prioritize correct schema definition using the `v` validator.
- Be aware of the automatically-generated system fields `_id` and `_creationTime`.
- See https://docs.convex.dev/database/types for available types.
```