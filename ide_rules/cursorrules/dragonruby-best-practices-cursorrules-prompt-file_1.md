---
name: "dragonruby-best-practices-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for dragonruby-best-practices-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Defines error handling and validation strategies within Ruby code in DragonRuby projects.
globs: **/*.rb
---
- Use exceptions for exceptional cases, not for control flow.
- Implement proper error logging and user-friendly messages.
```