---
name: "go-backend-scalability-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for go-backend-scalability-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Best practices when interacting with databases in backend Go code.
globs: */db/**/*.go
---
When interacting with databases:
- Use prepared statements to prevent SQL injection.
- Handle database errors gracefully.
- Consider using an ORM for complex queries and data modeling.
- Close database connections when they are no longer needed.
- Use connection pooling to improve performance.
```