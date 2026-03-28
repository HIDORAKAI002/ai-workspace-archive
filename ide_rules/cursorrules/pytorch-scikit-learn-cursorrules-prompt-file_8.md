---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for integrating machine learning models with a Tauri frontend via a backend like Flask
globs: frontend/**/*.rs
---
- Implement a clean API for the ML models to be consumed by the Flask backend.
- Ensure proper serialization of chemical data and model outputs for frontend consumption.
- Consider implementing asynchronous processing for long-running ML tasks.
```