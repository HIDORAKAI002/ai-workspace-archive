---
name: "go-servemux-rest-api-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-servemux-rest-api-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule enforces the use of Go's standard library for API development, focusing on idiomatic and efficient code.
globs: /*/**/*_api.go
---
- Use the standard library's net/http package for API development.
- Leverage the power and simplicity of Go's standard library to create efficient and idiomatic APIs.
```