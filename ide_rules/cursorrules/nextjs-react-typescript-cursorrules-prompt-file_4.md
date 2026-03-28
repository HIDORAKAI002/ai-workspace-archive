---
name: "nextjs-react-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-react-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Key Next.js conventions for state changes, web vitals, and client-side code usage.
globs: **/*.{ts,js,jsx,tsx}
---
- Rely on Next.js App Router for state changes.
- Prioritize Web Vitals (LCP, CLS, FID).
- Minimize 'use client' usage:
  - Prefer server components and Next.js SSR features.
  - Use 'use client' only for Web API access in small components.
  - Avoid using 'use client' for data fetching or state management.
  - Refer to Next.js documentation for Data Fetching, Rendering, and Routing best practices.
```