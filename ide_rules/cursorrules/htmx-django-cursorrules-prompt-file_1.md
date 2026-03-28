---
name: "htmx-django-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-django-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Advises using Django's class-based views when constructing HTMX responses in view files. Class-based views provide a structured way to handle different HTTP methods.
globs: **/views.py
---
- Use Django's class-based views for HTMX responses
```