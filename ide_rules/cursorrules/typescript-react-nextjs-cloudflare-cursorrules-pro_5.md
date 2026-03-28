---
name: "typescript-react-nextjs-cloudflare-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-react-nextjs-cloudflare-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Focuses on performance optimization techniques, including minimizing client-side rendering and optimizing images.
globs: **/*.{ts,tsx,js,jsx}
---
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.
```