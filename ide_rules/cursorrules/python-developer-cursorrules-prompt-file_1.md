---
name: "python-developer-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-developer-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Mandates the usage of UV when installing dependencies to ensure consistency and efficiency across all environments.
globs: **/requirements.txt
---
- Always use UV when installing dependencies
```