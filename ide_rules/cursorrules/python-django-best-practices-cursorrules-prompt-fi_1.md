---
name: "python-django-best-practices-cursorrules-prompt-fi Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-django-best-practices-cursorrules-prompt-fi

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for Django forms, focusing on form handling, validation, and model form usage.
globs: **/forms.py
---
- Utilize Django's form and model form classes for form handling and validation.
- Use Django's validation framework to validate form and model data.
- Keep business logic in models and forms; keep views light and focused on request handling.
```