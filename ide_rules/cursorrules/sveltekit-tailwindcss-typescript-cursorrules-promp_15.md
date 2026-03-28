---
name: "sveltekit-tailwindcss-typescript-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-tailwindcss-typescript-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the use of Tailwind CSS for styling with dynamic classes in Svelte components. This provides a consistent and efficient way to style components using utility classes.
globs: **/*.svelte
---
- Styling
  - Use Tailwind CSS for styling
  - Utilize Tailwind's utility classes directly in the markup
  - For complex components, consider using Tailwind's @apply directive in a scoped <style> block
  - Use dynamic classes with template literals when necessary:
    svelte
    <div class={`bg-blue-500 p-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}></div>
```