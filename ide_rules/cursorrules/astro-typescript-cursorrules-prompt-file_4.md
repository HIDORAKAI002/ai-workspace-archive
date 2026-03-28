---
name: "astro-typescript-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for astro-typescript-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Maintains a consistent coding style, ensuring that code starts with a file path comment and prioritizes modularity.
globs: *
---
- Code must start with path/filename as a one-line comment.
- Comments should describe purpose, not effect.
- Prioritize modularity, DRY principles, and performance.
```