---
name: "chrome-extension-dev-js-typescript-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for chrome-extension-dev-js-typescript-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for providing complete and functional code output, including necessary imports and comments.
globs: **/*.{js,ts,html,css}
---
- When providing code, always output the entire file content, not just new or modified parts
- Include all necessary imports, declarations, and surrounding code to ensure the file is complete and functional
- Provide comments or explanations for significant changes or additions within the file
- If the file is too large to reasonably include in full, provide the most relevant complete section and clearly indicate where it fits in the larger file structure
```