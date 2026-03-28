---
name: "nativescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nativescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Provides additional instructions for NativeScript development, such as using TypeScript, secure storage and biometrics for sensitive data, nativescript-fonticon for font icons.
globs: **/*.tsx, **/*.ts, **/*.vue, **/*.svelte, src/**/*.ts, app/**/*.ts, src/**/*.tsx, app/**/*.tsx, src/**/*.vue, app/**/*.vue, src/**/*.svelte
---
- Use TypeScript for type safety
- Use @nativescript/secure-storage for sensitive data
- Use @nativescript/biometrics for anything related to biometrics
- Always use nativescript-fonticon for font icons
- Follow NativeScript best practices for performance
```