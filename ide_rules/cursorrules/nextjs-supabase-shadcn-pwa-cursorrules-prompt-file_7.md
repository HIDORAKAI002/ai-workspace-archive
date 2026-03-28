---
name: "nextjs-supabase-shadcn-pwa-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-supabase-shadcn-pwa-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies the importance of reviewing and maintaining project context files, ensuring stability, selective updates, and accessibility for future developers.
globs: **/*.*
---
- You must review the `projectContext.md` as we need to ensure that the project context is up to date and accurate.
- **Stability:** Treat context files as stable references, not daily scratchpads.
- **Selective Updates:** Update context files only when there are significant, approved changes to requirements or project scope.
- **Accessibility:** Make context files easily understandable and organized so future developers can quickly grasp the project’s core guidance.
```