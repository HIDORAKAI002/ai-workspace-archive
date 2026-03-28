---
name: "web-app-optimization-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for web-app-optimization-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Details Paraglide.js i18n implementations.
globs: **/*.svelte
---
- Use Paraglide.js for internationalization: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
- Install Paraglide.js: `npm install @inlang/paraglide-js`
- Set up language files in the `languages` directory.
- Use the `t` function to translate strings:
  svelte
  <br />
  import { t } from '@inlang/paraglide-js';
  <br />
  - Support multiple languages and RTL layouts.
```