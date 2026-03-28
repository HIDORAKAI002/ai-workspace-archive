---
name: "qwik-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for qwik-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Provides guidelines and the expected folder structure for a Qwik.js project.
globs: *
---
- Use the following folder structure:
  
  src/
    components/
    routes/
    global.css
    root.tsx
    entry.ssr.tsx
  public/
  vite.config.ts
  tsconfig.json
```