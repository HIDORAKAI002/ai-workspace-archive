---
name: "nextjs-vercel-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-vercel-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines how to interact with Vercel's KV database for storing and retrieving session and application data.
globs: **/*.ts
---
- Use Vercel's KV database to store and retrieve session data.
- Utilize `kv.set`, `kv.get`, and `kv.delete` to manage data.
- Ensure the database operations are asynchronous to avoid blocking server-side rendering (SSR).
```