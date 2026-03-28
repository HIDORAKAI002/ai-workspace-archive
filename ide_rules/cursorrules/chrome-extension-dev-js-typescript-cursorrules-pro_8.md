---
name: "chrome-extension-dev-js-typescript-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for chrome-extension-dev-js-typescript-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules to ensure the security and privacy of the Chrome extension and its users.
globs: **/*.{js,ts,html}
---
- Implement Content Security Policy (CSP) in manifest.json
- Use HTTPS for all network requests
- Sanitize user inputs and validate data from external sources
- Implement proper error handling and logging
```