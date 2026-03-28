---
name: "htmx-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general HTMX best practices to all HTML files in the project, ensuring consistent use of HTMX attributes for requests, content swapping, and user feedback.
globs: **/*.html
---
- Use hx-get for GET requests
- Implement hx-post for POST requests
- Utilize hx-trigger for custom events
- Use hx-swap to control how content is swapped
- Implement hx-target to specify where to swap content
- Utilize hx-indicator for loading indicators
```