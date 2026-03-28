---
name: "laravel-tall-stack-best-practices-cursorrules-prom Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for laravel-tall-stack-best-practices-cursorrules-prom

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for developing modular, reusable Livewire components.
globs: /app/Http/Livewire/**/*.php
---
- Create modular, reusable Livewire components.
- Use Livewire's lifecycle hooks effectively (e.g., mount, updated, etc.).
- Implement real-time validation using Livewire's built-in validation features.
- Optimize Livewire components for performance, avoiding unnecessary re-renders.
- Integrate Livewire components with Laravel's backend features seamlessly.
- Implement lazy loading for Livewire components when appropriate.
```