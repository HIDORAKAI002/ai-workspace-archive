---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for creating the region grid in the cellular automata simulation. This rule defines how the grid is implemented and initialized.
globs: /src/region_grid/**/*.*
---
- Create the Region Grid:
  - Implement a two-dimensional array to represent the region grid. This grid should be flexible in size, allowing for configurations such as 4x4, 8x8, or 16x16. Each element of this array will be an instance of the region structure defined in step 1.
  - Initialize this grid with default values for all parameters, ensuring a consistent starting state. Consider implementing methods to easily resize the grid and maintain the aspect ratio with the underlying soup cells.
```