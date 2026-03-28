---
name: "react-redux-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-redux-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces specific folder structure conventions within the Redux store directory.
globs: src/store/**/*
---
- Follow this folder structure:
  src/
    components/
    features/
    store/
      slices/
      hooks.ts
      store.ts
    types/
    utils/
```