---
name: "laravel-tall-stack-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for laravel-tall-stack-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General security guidelines for Laravel applications.
globs: /**/*.*
---
- Always validate and sanitize user input.
- Use Laravel's CSRF protection for all forms.
- Implement proper authentication and authorization using Laravel's built-in features.
- Use Laravel's prepared statements to prevent SQL injection.
- Implement proper database transactions for data integrity.
```