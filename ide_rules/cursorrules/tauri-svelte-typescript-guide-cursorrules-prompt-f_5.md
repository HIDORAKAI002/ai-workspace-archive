---
name: "tauri-svelte-typescript-guide-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for tauri-svelte-typescript-guide-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Security-related rules for Tauri application development.
globs: src/**/*.{svelte,ts,tsx}
---
- Follow Tauri's security best practices, especially when dealing with IPC and native API access.
- Implement proper input validation and sanitization on the frontend.
- Use HTTPS for all communications with external services.
- Implement proper authentication and authorization mechanisms if required.
- Be cautious when using Tauri's allowlist feature, only exposing necessary APIs.
```