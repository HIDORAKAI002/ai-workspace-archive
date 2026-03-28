---
name: "python-github-setup-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-github-setup-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specifies requirements for testing Python code, including requiring tests, coverage targets, and test types.
globs: **/test_*.py
---
- Require tests for all code.
- Aim for 80% test coverage.
- Include unit and integration tests.
```