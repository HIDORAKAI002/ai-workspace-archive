---
name: "typescript-zod-tailwind-nextjs-cursorrules-prompt- Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-zod-tailwind-nextjs-cursorrules-prompt-

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for using React Server Components, including favoring server components and limiting their use to Web API access.
globs: **/*.{js,jsx,ts,tsx}
---
- Favor server components and Next.js SSR.
- Use only for Web API access in small components.
- Avoid for data fetching or state management.
```