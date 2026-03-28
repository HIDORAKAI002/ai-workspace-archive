---
name: "sveltekit-tailwindcss-typescript-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-tailwindcss-typescript-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the use of TypeScript for type definitions, including creating interfaces or types for component props. This improves code reliability and maintainability.
globs: **/*.{svelte,ts}
---
- Typing
  - Use TypeScript for type definitions
  - Create interfaces or types for component props:
    typescript
    interface MyComponentProps {
      someValue: string;
      optionalValue?: number;
    }
```