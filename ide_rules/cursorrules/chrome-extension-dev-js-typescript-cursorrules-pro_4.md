---
name: "chrome-extension-dev-js-typescript-cursorrules-pro Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for chrome-extension-dev-js-typescript-cursorrules-pro

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for structuring the architecture of a Chrome extension, including separation of concerns and message passing.
globs: **/background_worker.js, **/content_script.js, **/popup.js, **/options.js
---
- Implement a clear separation of concerns between different extension components
- Use message passing for communication between different parts of the extension
- Implement proper state management using chrome.storage API
```