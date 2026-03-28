---
name: "htmx-go-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-go-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the recommended folder structure for a Go project using HTMX, including directories for commands, internal logic, templates, and static assets.
globs: go.mod
---
- Use the following folder structure:
cmd/
  main.go
internal/
  handlers/
  models/
  templates/
static/
  css/
  js/
go.mod
go.sum
```