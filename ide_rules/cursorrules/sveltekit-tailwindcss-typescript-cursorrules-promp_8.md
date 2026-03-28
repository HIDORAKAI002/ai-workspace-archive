---
name: "sveltekit-tailwindcss-typescript-cursorrules-promp Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for sveltekit-tailwindcss-typescript-cursorrules-promp

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Describes the project file structure, including component grouping, pages, layouts, utility functions, and types. This encourages a well-organized and maintainable project structure.
globs: **/src/**/*
---
- File Structure
  - Group related components in subdirectories under src/lib/components/
  - Keep pages in src/routes/
  - Use +page.svelte for page components and +layout.svelte for layouts
  - Place reusable utility functions in src/lib/utils/
  - Store types and interfaces in src/lib/types/
```