---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for developing the user interface for manipulating the region grid. This rule focuses on interactive elements and visual representation.
globs: /ui/**/*.*
---
- Develop the User Interface:
  - Design and implement a comprehensive user interface for manipulating the region grid. This should include:
    a. A visual representation of the region grid, possibly overlaid on the main simulation view.
    b. Interactive elements for each region, allowing users to adjust parameters individually.
    c. Global controls for setting grid size and applying presets.
    d. A system for selecting different "brushes" or tools for painting parameter values across multiple regions.
    e. Real-time feedback showing the effects of parameter changes on the simulation.
  - Ensure that the UI is intuitive and responsive, providing users with immediate visual feedback on their actions.
```