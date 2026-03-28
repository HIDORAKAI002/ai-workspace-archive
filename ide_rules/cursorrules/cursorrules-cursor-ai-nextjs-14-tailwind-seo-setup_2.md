---
name: "cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for implementing error handling in Next.js 14 using error.tsx files.
globs: **/app/error.tsx
---
- For error handling (in error.tsx):
  tsx
  'use client'
  export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (



    );
  }
```