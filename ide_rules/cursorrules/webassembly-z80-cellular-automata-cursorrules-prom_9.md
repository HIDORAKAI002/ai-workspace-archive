---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for mapping soup cells to regions in the cellular automata simulation. This rule focuses on efficient mapping and updating strategies.
globs: /src/cell_mapping/**/*.*
---
- Implement Soup Cell to Region Mapping:
  - Develop a system to efficiently map each soup cell to its corresponding region. This mapping is crucial for quick lookups during simulation.
  - Create a separate array where each element represents a soup cell and contains the index or reference to its associated region.
  - Implement functions to update this mapping whenever the region grid size changes. Ensure that this mapping system is optimized for performance, as it will be frequently accessed during the simulation.
```