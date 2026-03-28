---
name: "react-nextjs-ui-development-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-nextjs-ui-development-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific rules for the Next.js App Router directory, ensuring the AI avoids the Pages Router.
globs: app/**/*.*
---
- This project uses Next.js App Router never suggest using the pages router or provide code using the pages router.
```