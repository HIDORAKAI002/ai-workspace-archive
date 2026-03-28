---
name: "typescript-nextjs-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for performance optimization, including minimizing client-side code and optimizing images.
globs: **/*.{ts,tsx,js,jsx}
---
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.
```