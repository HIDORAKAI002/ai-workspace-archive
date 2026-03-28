---
name: "htmx-django-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-django-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies best practices for HTMX and Django integration, focusing on template usage within the 'templates' directory. It encourages using Django's templating engine with HTMX attributes.
globs: **/templates/**/*.*
---
- Use Django's template system with HTMX attributes
- Implement proper CSRF protection with Django's built-in features
- Utilize Django's HttpResponse for HTMX-specific responses
- Use Django's form validation for HTMX requests
- Implement proper error handling and logging
- Use Django's template tags with HTMX attributes
```