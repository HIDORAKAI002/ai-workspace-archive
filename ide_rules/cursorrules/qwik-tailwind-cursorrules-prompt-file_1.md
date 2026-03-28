---
name: "qwik-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for qwik-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies best practices for Qwik.js development with Tailwind CSS, including using specific suffixes, reactive state management, and styling approaches.
globs: src/**/*.{ts,tsx,css}
---
- Use $ suffix for lazy-loaded functions
- Utilize useSignal() for reactive state
- Implement Tailwind CSS classes for styling
- Use @apply directive in CSS files for reusable styles
- Implement responsive design using Tailwind's responsive classes
- Utilize Tailwind's configuration file for customization
- Leverage TypeScript for type safety
- Use Vite's fast HMR for development
```