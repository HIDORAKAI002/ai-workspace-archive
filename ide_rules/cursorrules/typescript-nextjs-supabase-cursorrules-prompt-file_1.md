---
name: "typescript-nextjs-supabase-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-supabase-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for database querying and data model creation using Supabase SDK and schema builder, focusing on the API routes directory.
globs: /(app|pages)/api/**/*.(ts|js)
---
- Use Supabase SDK for data fetching and querying.
- For data model creation, use Supabase's schema builder.
```