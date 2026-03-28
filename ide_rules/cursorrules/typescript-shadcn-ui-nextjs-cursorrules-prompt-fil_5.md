---
name: "typescript-shadcn-ui-nextjs-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-shadcn-ui-nextjs-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies performance optimization techniques specifically to React components, focusing on minimizing client-side rendering and optimizing resource loading.
globs: components/**/*.tsx
---
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading
```