---
name: "web-app-optimization-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for web-app-optimization-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines UI and styling conventions using Tailwind CSS and Shadcn components, emphasizing utility-first styling and reusable UI elements.
globs: **/*.svelte
---
- Use Tailwind CSS for utility-first styling approach.
- Leverage Shadcn components for pre-built, customizable UI elements.
- Import Shadcn components from `$lib/components/ui`.
- Organize Tailwind classes using the `cn()` utility from `$lib/utils`.
- Use Svelte's built-in transition and animation features.
- Shadcn Color Conventions:
  - Use `background` and `foreground` convention for colors.
  - Define CSS variables without color space function:
    css
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    
  - Usage example:
    svelte
```