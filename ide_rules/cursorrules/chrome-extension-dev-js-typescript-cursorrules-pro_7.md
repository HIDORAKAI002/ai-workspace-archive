---
name: "chrome-extension-dev-js-typescript-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for chrome-extension-dev-js-typescript-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for optimizing extension performance, minimizing resource usage, and improving responsiveness.
globs: **/background_worker.js, **/content_script.js
---
- Minimize resource usage in background scripts
- Use event pages instead of persistent background pages when possible
- Implement lazy loading for non-critical extension features
- Optimize content scripts to minimize impact on web page performance
```