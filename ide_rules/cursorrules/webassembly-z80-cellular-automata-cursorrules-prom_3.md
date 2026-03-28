---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for modifying the main simulation loop to incorporate region parameters. These rules detail how region parameters affect cell behavior.
globs: /src/simulation_loop/**/*.*
---
- Modify the Main Simulation Loop:
  - Update the core simulation logic to incorporate region parameters. For each soup cell update:
    a. Determine the cell's corresponding region using the mapping created in step 3.
    b. Retrieve the region's parameters.
    c. Apply the effects of each parameter to the soup cell's behavior. This might involve adjusting probabilities, modifying state transition rules, or influencing the cell's interaction with neighbors.
  - Ensure that this integration is done efficiently to maintain simulation performance.
```