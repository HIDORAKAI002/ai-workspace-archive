---
name: "go-backend-scalability-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-backend-scalability-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific guidelines for implementing gRPC services in Go.
globs: */grpc/**/*.go
---
When working with gRPC services in Go:
- Define your Protocol Buffer messages and service.
- Generate Go code from the Proto file using `protoc`.
- Implement the gRPC server in Go, handling requests and responses.
- Connect to databases using Go's `database/sql` package or an ORM.
- Handle errors properly and implement proper validation.
- Consider using an ORM like GORM for more complex database interactions.
- Follow best practices for security, such as using prepared statements to prevent SQL injection.
```