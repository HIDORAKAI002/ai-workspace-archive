---
name: "python-django-best-practices-cursorrules-prompt-fi Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-django-best-practices-cursorrules-prompt-fi

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific guidelines for Django views, focusing on class-based vs. function-based views, error handling, and request handling.
globs: **/views.py
---
- Use Django’s class-based views (CBVs) for more complex views; prefer function-based views (FBVs) for simpler logic.
- Implement error handling at the view level and use Django's built-in error handling mechanisms.
- Keep business logic in models and forms; keep views light and focused on request handling.
```