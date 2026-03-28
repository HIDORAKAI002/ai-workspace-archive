---
name: "nativescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nativescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Enforces the recommended folder structure for NativeScript projects at the root level, including assets, src, and nativescript.config.ts.
globs: *.*
---
- Ensure the following structure is present at the root of your NativeScript project with the exception of some frameworks which may use `app/` instead of `src/`. The other exception is that in web based editors like StackBlitz or Bolt, the `App_Resources` can be omitted:
  - App_Resources/
    - Android/
    - iOS/
  - src/
    - assets/
    - components/
    - fonts/
    - services/
    - utils/
  - nativescript.config.ts
  - tailwind.config.js

```