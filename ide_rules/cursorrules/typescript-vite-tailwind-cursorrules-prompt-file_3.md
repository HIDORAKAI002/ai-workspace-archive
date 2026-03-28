---
name: "typescript-vite-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-vite-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General rule for performance optimization that includes lazy loading, image optimization, and Web Vitals.
globs: src/**/*.*
---
- Implement lazy loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.
- Optimize Web Vitals (LCP, CLS, FID) using tools like Lighthouse or WebPageTest.
```