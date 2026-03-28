---
name: "svelte-5-vs-svelte-4-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for svelte-5-vs-svelte-4-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General rules for Svelte 5 projects, including using runes for reactivity and simplifying event handlers.
globs: **/*.svelte
---
- Always use Svelte 5 instead of Svelte 4.
- Use runes for controlling reactivity; runes replace certain non-runes features and provide more explicit control over state and effects.
- Treat event handlers as properties for simpler use and integration.
```