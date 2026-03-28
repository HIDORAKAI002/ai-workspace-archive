---
name: "nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs15-react19-vercelai-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Dictates how asynchronous requests should be handled within Next.js 15, specifically concerning runtime APIs.
globs: app/**/*
---
- Always use async versions of runtime APIs:
  typescript
  const cookieStore = await cookies()
  const headersList = await headers()
  const { isEnabled } = await draftMode()
  
- Handle async params in layouts/pages:
  typescript
  const params = await props.params
  const searchParams = await props.searchParams
```