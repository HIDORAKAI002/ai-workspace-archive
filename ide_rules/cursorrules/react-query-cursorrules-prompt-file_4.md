---
name: "react-query-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for react-query-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule outlines the general best practices for using React Query throughout the React project.
globs: src/**/*.tsx
---
- Use QueryClient and QueryClientProvider at the root of your app
- Implement custom hooks for queries and mutations
- Utilize query keys for effective caching
- Use prefetching for improved performance
- Implement proper error and loading states
```