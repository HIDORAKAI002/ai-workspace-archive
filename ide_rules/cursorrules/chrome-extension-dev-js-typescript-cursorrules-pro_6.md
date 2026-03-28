---
name: "chrome-extension-dev-js-typescript-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for chrome-extension-dev-js-typescript-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for configuring the extension manifest and handling permissions securely.
globs: **/manifest.json
---
- Use the latest manifest version (v3) unless there's a specific need for v2
- Follow the principle of least privilege for permissions
- Implement optional permissions where possible
```