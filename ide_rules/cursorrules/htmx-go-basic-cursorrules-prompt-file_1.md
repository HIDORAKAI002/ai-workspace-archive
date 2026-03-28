---
name: "htmx-go-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-go-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general best practices for using HTMX with Go, focusing on server-side rendering and request handling.
globs: **/*.go
---
- Use html/template for server-side rendering
- Implement http.HandlerFunc for handling HTMX requests
- Utilize gorilla/mux for routing if needed
- Use encoding/json for JSON responses
- Implement proper error handling and logging
- Utilize context for request cancellation and timeouts
```