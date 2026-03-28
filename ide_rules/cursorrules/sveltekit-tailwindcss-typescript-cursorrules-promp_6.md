---
name: "sveltekit-tailwindcss-typescript-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-tailwindcss-typescript-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Recommends using aliased imports as defined in svelte.config.js. This improves code organization and readability, especially when dealing with complex project structures.
globs: **/*.{svelte,js,ts}
---
- Imports
  - Use aliased imports where applicable (as defined in svelte.config.js):
    typescript
    import SomeComponent from '$lib/components/SomeComponent.svelte';
    import { someUtil } from '$lib/utils';
```