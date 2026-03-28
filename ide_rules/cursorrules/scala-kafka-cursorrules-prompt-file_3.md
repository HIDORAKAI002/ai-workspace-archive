---
name: "scala-kafka-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for scala-kafka-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforce a unified scalafmt style across all Scala sources
globs: "**/*.scala"
alwaysApply: true
---
- **scalafmt:** Enforce Google-inspired scalafmt configuration with `maxColumn = 100`.

```