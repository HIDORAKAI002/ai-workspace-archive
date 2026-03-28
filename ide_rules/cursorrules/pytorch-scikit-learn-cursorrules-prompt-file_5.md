---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Specific guidance regarding the usage of RDKit and related cheminformatics libraries
globs: **/*rdkit*.py
---
- Utilize appropriate libraries for chemical data handling (e.g., RDKit, OpenBabel).
- Visualize results using chemistry-specific plotting libraries (e.g., RDKit's drawing utilities).
- Refer to official documentation for chemistry-related libraries for best practices and up-to-date APIs.
```