---
name: "nextjs-supabase-shadcn-pwa-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-supabase-shadcn-pwa-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Outlines the monorepo structure and tooling conventions, emphasizing the use of Taskfile.yml, and proper handling of environment variables.
globs: **/packages/**/*, **/app/**/*
---
- If using a monorepo structure, place shared code in a `packages/` directory and app-specific code in `app/`.
- Use `Taskfile.yml` commands for development, testing, and deployment tasks.
- Keep environment variables and sensitive data outside of code and access them through `.env` files or similar configuration.
```