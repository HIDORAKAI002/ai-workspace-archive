---
name: "go-servemux-rest-api-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-servemux-rest-api-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule ensures proper error handling, status codes, and JSON response formatting in Go API development.
globs: /*/**/*_api.go
---
- Implement proper error handling, including custom error types when beneficial.
- Use appropriate status codes and format JSON responses correctly.
```