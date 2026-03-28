---
name: "tailwind-css-nextjs-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for tailwind-css-nextjs-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for Next.js pages, including routing, data fetching, and image optimization.
globs: pages/**/*.tsx
---
- Use dynamic routes with bracket notation ([id].tsx)
- Validate and sanitize route parameters
- Prefer flat, descriptive routes
- Use getServerSideProps for dynamic data, getStaticProps/getStaticPaths for static
- Implement Incremental Static Regeneration (ISR) where appropriate
- Use next/image for optimized images
- Configure image layout, priority, sizes, and srcSet attributes
```