---
name: "laravel-tall-stack-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for laravel-tall-stack-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Key conventions to follow within the TALL stack project.
globs: /**/*.*
---
- Follow Laravel's MVC architecture.
- Use Laravel's routing system for defining application endpoints.
- Implement proper request validation using Form Requests.
- Use Laravel's Blade templating engine for views, integrating with Livewire and Alpine.js.
- Implement proper database relationships using Eloquent.
- Use Laravel's built-in authentication scaffolding.
- Implement proper API resource transformations.
- Use Laravel's event and listener system for decoupled code.
```