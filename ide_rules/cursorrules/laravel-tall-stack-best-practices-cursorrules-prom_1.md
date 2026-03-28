---
name: "laravel-tall-stack-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for laravel-tall-stack-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for using Alpine.js for declarative JavaScript functionality.
globs: /resources/views/**/*.blade.php
---
- Use Alpine.js directives (x-data, x-bind, x-on, etc.) for declarative JavaScript functionality.
- Implement small, focused Alpine.js components for specific UI interactions.
- Combine Alpine.js with Livewire for enhanced interactivity when necessary.
- Keep Alpine.js logic close to the HTML it manipulates, preferably inline.
```