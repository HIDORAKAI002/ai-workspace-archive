---
name: "typescript-zod-tailwind-nextjs-cursorrules-prompt- Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-zod-tailwind-nextjs-cursorrules-prompt-

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines performance optimization techniques, such as minimizing useEffect and setState, using Suspense, and optimizing images.
globs: **/*.{js,jsx,ts,tsx}
---
- Minimize 'useEffect', and 'setState'; favor React Remix Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.
```