---
name: "nextjs-vercel-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-vercel-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies specifically to the `middleware.ts` file to manage requests and sessions using Vercel's KV database.
globs: middleware.ts
---
- Use Vercel middleware to handle incoming requests.
- Use middleware to parse user input and manage sessions with the KV database.
- Use Vercel's KV database for managing stateful data.
```