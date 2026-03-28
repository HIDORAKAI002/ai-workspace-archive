---
name: "pandas-scikit-learn-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pandas-scikit-learn-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Governs error handling and data validation practices, including data quality checks, missing data handling, and data type validation.
globs: **/*.py
---
- Implement data quality checks at the beginning of analysis.
- Handle missing data appropriately (imputation, removal, or flagging).
- Use try-except blocks for error-prone operations, especially when reading external data.
- Validate data types and ranges to ensure data integrity.
```