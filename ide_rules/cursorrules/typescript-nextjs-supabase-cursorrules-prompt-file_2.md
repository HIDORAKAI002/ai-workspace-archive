---
name: "typescript-nextjs-supabase-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-nextjs-supabase-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: General project rules for TypeScript, Node.js, and Next.js projects, covering code style, structure, naming conventions, and TypeScript usage.
globs: /**/*.(ts|tsx|js|jsx)
---
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use const objects or as const assertions instead.
- Use functional components with TypeScript interfaces.
- Use arrow functions for components and handlers.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.
```