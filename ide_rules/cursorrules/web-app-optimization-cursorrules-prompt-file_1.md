---
name: "web-app-optimization-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for web-app-optimization-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Accessibility rules for Svelte and SvelteKit
globs: **/*.svelte
---
- Ensure proper semantic HTML structure in Svelte components.
- Implement ARIA attributes where necessary.
- Ensure keyboard navigation support for interactive elements.
- Use Svelte's bind:this for managing focus programmatically.
- Ensure text scaling and font adjustments for accessibility.
```