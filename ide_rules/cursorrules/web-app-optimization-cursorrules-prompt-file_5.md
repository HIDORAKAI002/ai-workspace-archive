---
name: "web-app-optimization-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for web-app-optimization-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Performance Optimization techniques for Svelte and SvelteKit projects.
globs: **/*.svelte
---
- Leverage Svelte's compile-time optimizations.
- Use `{#key}` blocks to force re-rendering of components when needed.
- Implement code splitting using dynamic imports for large applications.
- Profile and monitor performance using browser developer tools.
- Use `$effect.tracking()` to optimize effect dependencies.
- Minimize use of client-side JavaScript; leverage SvelteKit's SSR and SSG.
- Implement proper lazy loading for images and other assets.
```