---
name: "pandas-scikit-learn-guide-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pandas-scikit-learn-guide-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific optimization strategies for Python scripts working with larger-than-memory datasets via Dask.
globs: **/dask_analysis/*.py
---
- Consider using dask for larger-than-memory datasets.
```