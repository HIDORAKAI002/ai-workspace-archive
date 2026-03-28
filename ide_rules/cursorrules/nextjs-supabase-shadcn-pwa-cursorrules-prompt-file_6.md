---
name: "nextjs-supabase-shadcn-pwa-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-supabase-shadcn-pwa-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Sets conventions for Next.js 15+ projects, including leveraging the App Router, React Server Components (RSC), SSR capabilities, and Zustand for state management.
globs: **/*.js, **/*.jsx, **/*.ts, **/*.tsx
---
- Target **Next.js 15+** and leverage the App Router, React Server Components (RSC), and SSR capabilities.
- Use Zustand for state management in client components when necessary.
- Maintain proper Shadcn UI management using `npx shadcn@latest add` for new components.
- Follow a mobile-first approach and responsive design patterns.
- Emphasize server-side logic, minimizing the usage of `use client` and other client-only APIs.
- Structure project as Progressive Web App (PWA) with offline capabilities, app-like experience, and installability across devices.
```