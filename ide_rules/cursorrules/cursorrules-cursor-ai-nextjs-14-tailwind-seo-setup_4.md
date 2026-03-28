---
name: "cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for cursorrules-cursor-ai-nextjs-14-tailwind-seo-setup

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for defining metadata in Next.js 14 components for SEO optimization.
globs: **/app/**/*.tsx
---
- For metadata (in .tsx files):
  tsx
  import type { Metadata } from 'next'
  export const metadata: Metadata = {
    title: 'Page Title',
    description: 'Page description',
  }
```