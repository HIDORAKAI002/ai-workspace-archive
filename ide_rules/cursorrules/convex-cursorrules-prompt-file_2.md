---
name: "convex-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for convex-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Provides guidance on using built-in system fields and data types when defining Convex schemas to ensure proper data handling.
globs: **/convex/schema.ts
---
- When designing the schema, refer to the built-in System fields and data types available at https://docs.convex.dev/database/types.
- Pay special attention to the correct usage of the `v` validator builder (https://docs.convex.dev/api/modules/values#v) for defining schema types.
```