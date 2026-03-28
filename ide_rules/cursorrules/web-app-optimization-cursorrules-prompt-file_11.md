---
name: "web-app-optimization-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for web-app-optimization-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies routing conventions in SvelteKit projects.
globs: src/routes/**/*.svelte
---
- Utilize SvelteKit's file-based routing system in the src/routes/ directory.
- Implement dynamic routes using [slug] syntax.
- Use load functions for server-side data fetching and pre-rendering.
- Implement proper error handling with +error.svelte pages.
```