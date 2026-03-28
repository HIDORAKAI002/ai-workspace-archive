---
name: "nextjs-react-tailwind-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for nextjs-react-tailwind-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for determining if a component should be private or shared, and where to place them based on their use-case.
globs: src/**/*
---
- Private Components: For components used only within specific pages, you can create a _components folder within the relevant /app subdirectory.
- Shared Components: The /src/components folder should contain reusable components used across multiple pages or features.
```