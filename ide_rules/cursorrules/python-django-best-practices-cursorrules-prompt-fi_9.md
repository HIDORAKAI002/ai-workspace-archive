---
name: "python-django-best-practices-cursorrules-prompt-fi Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-django-best-practices-cursorrules-prompt-fi

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Focus on performance optimization techniques in all files of the project.
globs: **/*.*
---
- Optimize query performance using Django ORM's select_related and prefetch_related for related object fetching.
- Use Django’s cache framework with backend support (e.g., Redis or Memcached) to reduce database load.
- Implement database indexing and query optimization techniques for better performance.
- Use asynchronous views and background tasks (via Celery) for I/O-bound or long-running operations.
- Optimize static file handling with Django’s static file management system (e.g., WhiteNoise or CDN integration).
- Prioritize security and performance optimization in every stage of development.
```