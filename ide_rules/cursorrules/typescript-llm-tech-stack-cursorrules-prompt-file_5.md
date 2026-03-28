---
name: "typescript-llm-tech-stack-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for typescript-llm-tech-stack-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Provides guidelines for effective utilization of specific libraries within the project, including axios, js-yaml, mime-types, node-gyp, uuid, and zod.
globs: **/*.ts
---
- Utilize the following libraries effectively:
  - axios (^1.7.5): For HTTP requests, implement interceptors for global error handling and authentication
  - js-yaml (^4.1.0): For parsing and stringifying YAML, use type-safe schemas
  - mime-types (^2.1.35): For MIME type detection and file extension mapping
  - node-gyp (^10.2.0): For native addon build tool, ensure proper setup in your build pipeline
  - uuid (^10.0.0): For generating unique identifiers, prefer v4 for random UUIDs
  - zod (^3.23.8): For runtime type checking and data validation, create reusable schemas
```