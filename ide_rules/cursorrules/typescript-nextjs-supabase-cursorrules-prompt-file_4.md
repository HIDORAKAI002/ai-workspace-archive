---
name: "typescript-nextjs-supabase-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-supabase-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules specific to the Next.js App Router, covering data fetching, API routes, error handling, loading states, and metadata.
globs: /app/**/*.(ts|tsx)
---
- Use Next.js App Router conventions for data fetching and API routes.
- Implement efficient caching and revalidation strategies using Next.js built-in features.
- Use route handlers (route.ts) for API routes in the App Router.
- Implement error boundaries and error.tsx files for error handling.
- Use loading.tsx files for managing loading states.
- Use Next.js 14's metadata API for SEO optimization.
- Follow Next.js docs for Data Fetching, Rendering, and Routing.
```