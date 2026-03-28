---
name: "typescript-llm-tech-stack-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-llm-tech-stack-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines the file organization structure for TypeScript projects, emphasizing modularity and separation of concerns.
globs: **/*.ts
---
- Group related functionality into modules
- Use index files to simplify imports
- Separate concerns: keep business logic, UI components, and utilities in different directories
```