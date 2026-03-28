---
name: "go-temporal-dsl-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-temporal-dsl-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Go Temporal DSL Workflow & Activity Rules (Self-Contained)
alwaysApply: false
globs:
  - "**/*.go"
rules:
  - index.mdc
  - guide.mdc
  - workflow.mdc
  - activities.mdc
  - example-usage.mdc
---

```