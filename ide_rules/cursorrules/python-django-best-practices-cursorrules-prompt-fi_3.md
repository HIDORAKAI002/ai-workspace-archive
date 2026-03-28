---
name: "python-django-best-practices-cursorrules-prompt-fi Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-django-best-practices-cursorrules-prompt-fi

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for Django models, emphasizing ORM usage, database interactions, and data validation.
globs: **/models.py
---
- Leverage Django’s ORM for database interactions; avoid raw SQL queries unless necessary for performance.
- Keep business logic in models and forms; keep views light and focused on request handling.
```