---
name: "qwik-basic-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for qwik-basic-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies Qwik.js best practices for files within the src directory, focusing on lazy-loading, reactive state, data fetching, and side effects.
globs: src/**/*.*
---
- Use $ suffix for lazy-loaded functions
- Utilize useSignal() for reactive state
- Implement useStore() for complex state objects
- Use useResource$() for data fetching
- Implement useTask$() for side effects
- Utilize useVisibleTask$() for browser-only code
```