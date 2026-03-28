---
name: "typescript-shadcn-ui-nextjs-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-shadcn-ui-nextjs-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces Next.js specific conventions for data fetching, rendering, and routing in the 'pages' directory.
globs: pages/**/*
---
- Use 'nuqs' for URL search parameter state management
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components and Next.js SSR
  - Use only for Web API access in small components
  - Avoid for data fetching or state management
- Follow Next.js docs for Data Fetching, Rendering, and Routing
```