---
name: "svelte-5-vs-svelte-4-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for svelte-5-vs-svelte-4-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for handling reactivity and reactive statements in Svelte 5.
globs: **/*.svelte
---
- Prefer runes over reactive declarations ( `$:`) for reactivity, e.g. `bind:value`
- Treat event handlers as properties, simplifying their use.
```