---
name: "python-django-best-practices-cursorrules-prompt-fi Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-django-best-practices-cursorrules-prompt-fi

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Configurations for Django settings file with the list of dependencies and conventions.
globs: **/settings.py
---
- Django
- Django REST Framework (for API development)
- Celery (for background tasks)
- Redis (for caching and task queues)
- PostgreSQL or MySQL (preferred databases for production)
```