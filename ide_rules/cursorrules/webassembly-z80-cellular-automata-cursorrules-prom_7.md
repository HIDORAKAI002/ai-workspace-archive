---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for developing the region visualization system. The region grid and its effects are visually represented, allowing users to see the influence of their changes on the simulation.
globs: /visualization/**/*.*
---
- Create a Region Visualization System:
  - Develop a robust visualization system for the regions. This should:
    a. Visually represent the various parameters of each region, possibly using color coding, patterns, or overlays.
    b. Update in real-time as parameters are changed, providing immediate feedback to the user.
    c. Implement different visualization modes to focus on specific parameters or overall region states.
    d. Ensure that the visualization is clear and distinguishable from the underlying soup cell simulation.
```