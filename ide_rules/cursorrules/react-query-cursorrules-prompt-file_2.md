---
name: "react-query-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-query-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule enforces the defined folder structure for a React project, improving organization and maintainability.
globs: src/**/*
---
- Enforce the following folder structure:
  - src/
    - components/
    - hooks/
      - useQueries/
      - useMutations/
    - pages/
    - utils/
    - api/
```