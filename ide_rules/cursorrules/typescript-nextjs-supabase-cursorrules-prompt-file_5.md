---
name: "typescript-nextjs-supabase-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-supabase-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for optimizing performance in Next.js applications, focusing on minimizing client-side code and optimizing images.
globs: /**/*.(ts|tsx)
---
- Minimize 'use client', 'useEffect', and 'useState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use Next.js Image component, include size data, implement lazy loading.
```