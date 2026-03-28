---
name: "htmx-flask-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for htmx-flask-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Provides additional instructions for HTMX and Flask, primarily related to templating.
globs: templates/**/*.*
---
- Use Jinja2 templating with HTMX attributes
- Implement proper CSRF protection with Flask-WTF
- Utilize Flask's request object for handling HTMX requests
- Use Flask-Migrate for database migrations
- Implement proper error handling and logging
- Follow Flask's application factory pattern
- Use environment variables for configuration
```