---
name: "nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the recommended state management strategies for Next.js 15 applications, including server and client contexts.
globs: app/**/*
---
- Use `useActionState` instead of deprecated `useFormState`.
- Leverage enhanced `useFormStatus` with new properties (data, method, action).
- Implement URL state management with 'nuqs'.
- Minimize client-side state.
```