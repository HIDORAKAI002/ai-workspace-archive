---
name: "tauri-svelte-typescript-guide-cursorrules-prompt-f Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for tauri-svelte-typescript-guide-cursorrules-prompt-f

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for communicating with the external backend from the Tauri frontend.
globs: src/lib/api/**/*.{ts,tsx}
---
- Use Axios for HTTP requests from the Tauri frontend to the external backend.
- Implement proper error handling for network requests and responses.
- Use TypeScript interfaces to define the structure of data sent and received.
- Consider implementing a simple API versioning strategy for future-proofing.
- Handle potential CORS issues when communicating with the backend.
- Ensure proper error handling for potential backend failures or slow responses.
- Consider implementing retry mechanisms for failed requests.
- Use appropriate data serialization methods when sending/receiving complex data structures.
```