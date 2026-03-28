---
name: "qwik-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for qwik-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Recommends a specific folder structure for Qwik projects to maintain organization and separation of concerns. Applies to the project root.
globs: qwik.config.js
---
- Recommended folder structure:
  
  src/
    components/
    routes/
    global.css
    root.tsx
    entry.ssr.tsx
  public/
  tailwind.config.js
  postcss.config.js
  vite.config.ts
  tsconfig.json
```