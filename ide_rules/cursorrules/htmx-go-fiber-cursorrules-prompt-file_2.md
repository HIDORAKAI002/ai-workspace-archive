---
name: "htmx-go-fiber-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-go-fiber-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Focuses on routing, CSRF protection, context handling, and template usage within the internal handlers directory.
globs: internal/handlers/**/*.go
---
- Use Fiber's App.Get/Post/etc for routing HTMX requests
- Implement CSRF protection with Fiber middleware
- Utilize Fiber's Context for handling HTMX-specific headers
- Use Fiber's template engine for server-side rendering
```