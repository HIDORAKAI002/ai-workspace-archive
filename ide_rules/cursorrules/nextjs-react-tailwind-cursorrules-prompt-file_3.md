---
name: "nextjs-react-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-react-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for adhering to Next.js conventions, including data fetching, rendering, routing, and using 'nuqs' for URL search parameter state management.
globs: src/**/*
---
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
  - Favor server components and Next.js SSR.
  - Use only for Web API access in small components.
  - Avoid for data fetching or state management.
- Follow Next.js docs for Data Fetching, Rendering, and Routing.
- Place both the /app and /components folders under a /src directory.
```