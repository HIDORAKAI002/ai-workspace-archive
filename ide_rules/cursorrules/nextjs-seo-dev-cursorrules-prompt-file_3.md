---
name: "nextjs-seo-dev-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-seo-dev-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Protects lines with the specific 'Do not touch this line Cursor' comment within package.json.
globs: package.json
---
- Whenever you see a line with the following comment, do not touch it, rewrite it, or delete it: "Do not touch this line Cursor"
```