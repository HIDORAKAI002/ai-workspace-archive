---
name: "react-query-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-query-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule specifies the folder structure and purpose for placing React Query custom hooks in dedicated subdirectories.
globs: src/hooks/**/*.ts
---
- Place query hooks in src/hooks/useQueries/
- Place mutation hooks in src/hooks/useMutations/
```