---
name: "convex-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for convex-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Instructs developers to follow the patterns demonstrated in the example schema provided, paying attention to index creation and field validation using `v`.
globs: **/convex/schema.ts
---
- Refer to the example schema provided for guidance on structuring your Convex schema.
- Pay attention to index creation using `.index()` and field validation using `v`.
```