---
name: "es-module-nodejs-guidelines-cursorrules-prompt-fil Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for es-module-nodejs-guidelines-cursorrules-prompt-fil

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: This rule outlines general project practices, including agile methodologies, modularity, DRY principles, performance, and security considerations applicable to all files.
globs: **/*.*
---
- Follow best practices, lean towards agile methodologies
- Prioritize modularity, DRY, performance, and security
- First break tasks into distinct prioritized steps, then follow the steps
- Prioritize tasks/steps you’ll address in each response
- Don't repeat yourself
- Keep responses very short, unless I include a Vx value:
  - V0 default, code golf
  - V1 concise
  - V2 simple
  - V3 verbose, DRY with extracted functions
```