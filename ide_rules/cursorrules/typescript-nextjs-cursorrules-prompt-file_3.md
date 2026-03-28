---
name: "typescript-nextjs-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Key Conventions for Next.js projects like usage of 'nuqs', web vitals optimization, and limitation of client-side components.
globs: **/*.{ts,tsx,js,jsx}
---
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
  - Favor server components and Next.js SSR.
  - Use only for Web API access in small components.
  - Avoid for data fetching or state management.
```