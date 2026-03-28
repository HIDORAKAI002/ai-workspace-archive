---
name: "tauri-svelte-typescript-guide-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for tauri-svelte-typescript-guide-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for integrating Tauri's native APIs in the frontend application.
globs: src/lib/tauri/**/*.{ts,tsx}
---
- Utilize Tauri's APIs for native desktop integration (file system access, system tray, etc.).
- Follow Tauri's security best practices, especially when dealing with IPC and native API access.
- Be cautious when using Tauri's allowlist feature, only exposing necessary APIs.
```