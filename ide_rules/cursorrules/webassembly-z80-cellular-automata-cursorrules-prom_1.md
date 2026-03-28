---
name: "webassembly-z80-cellular-automata-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for webassembly-z80-cellular-automata-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for creating the data synchronization system, keeping the region grid data synchronized between the JavaScript UI and the WASM simulation.
globs: /data_sync/**/*.*
---
- Implement Data Synchronization:
  - Create an efficient system for keeping the region grid data synchronized between the JavaScript UI and the WASM simulation. This might involve:
    a. Implementing periodic updates at set intervals.
    b. Creating an event-driven synchronization system that updates when changes occur.
    c. Optimizing large data transfers to maintain smooth performance, possibly using typed arrays or other efficient data structures.
    d. Implementing a queuing system for updates to prevent overwhelming the simulation with rapid changes.
```