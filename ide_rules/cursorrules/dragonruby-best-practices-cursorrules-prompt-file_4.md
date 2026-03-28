---
name: "dragonruby-best-practices-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for dragonruby-best-practices-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Dictates syntax and formatting guidelines for Ruby code within DragonRuby projects, adhering to the Ruby Style Guide.
globs: **/*.rb
---
- Follow the Ruby Style Guide (https://rubystyle.guide/)
- Use Ruby's expressive syntax (e.g., unless, ||=, &.)
- Prefer single quotes for strings unless interpolation is needed.
```