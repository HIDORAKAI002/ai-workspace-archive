---
name: "nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the best practices for building React components within the Next.js 15 App Router structure.
globs: app/**/*
---
- Favor React Server Components (RSC) where possible.
- Minimize 'use client' directives.
- Implement proper error boundaries.
- Use Suspense for async operations.
- Optimize for performance and Web Vitals.
```