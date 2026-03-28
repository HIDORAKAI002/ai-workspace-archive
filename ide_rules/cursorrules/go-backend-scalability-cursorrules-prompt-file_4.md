---
name: "go-backend-scalability-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-backend-scalability-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rule for handling Protocol Buffer definition files in the project.
globs: **/*.proto
---
When working with `.proto` files:
- Define clear and concise messages and services.
- Use proper data types and naming conventions.
- Ensure the `go_package` option is set correctly for Go code generation.
```