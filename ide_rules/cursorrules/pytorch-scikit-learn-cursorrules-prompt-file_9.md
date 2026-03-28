---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for implementing testing and validation procedures specific to chemistry applications.
globs: tests/**/*.py
---
- Implement unit tests for data processing functions and custom model components.
- Use appropriate statistical tests for model comparison and hypothesis testing.
- Implement validation protocols specific to chemistry (e.g., time-split validation for QSAR models).
```