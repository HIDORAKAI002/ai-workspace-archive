---
name: "react-typescript-nextjs-nodejs-cursorrules-prompt- Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-typescript-nextjs-nodejs-cursorrules-prompt-

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines key conventions for Next.js development, focusing on utilizing the App Router, prioritizing Web Vitals, and minimizing 'use client' usage.
globs: app/**/*.*
---
- Rely on Next.js App Router for state changes.
- Prioritize Web Vitals (LCP, CLS, FID).
- Minimize 'use client' usage:
  - Prefer server components and Next.js SSR features.
  - Use 'use client' only for Web API access in small components.
  - Avoid using 'use client' for data fetching or state management.
- Refer to Next.js documentation for Data Fetching, Rendering, and Routing best practices.
```