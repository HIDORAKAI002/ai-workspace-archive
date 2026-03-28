---
name: "javascript-astro-tailwind-css-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for javascript-astro-tailwind-css-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for performance optimization in Astro, emphasizing static generation and partial hydration.
globs: src/**/*.*
---
Performance Optimization

- Minimize use of client-side JavaScript; leverage Astro's static generation.
- Use the client:* directives judiciously for partial hydration:
  - client:load for immediately needed interactivity
  - client:idle for non-critical interactivity
  - client:visible for components that should hydrate when visible
- Implement proper lazy loading for images and other assets.
- Utilize Astro's built-in asset optimization features.
```