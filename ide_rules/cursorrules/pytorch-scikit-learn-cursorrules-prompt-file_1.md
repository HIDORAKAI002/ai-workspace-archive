---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for data handling and preprocessing scripts in chemistry ML projects, emphasizing robust pipelines and appropriate techniques for chemical data.
globs: data_processing/**/*.py
---
- Implement robust data loading and preprocessing pipelines.
- Use appropriate techniques for handling chemical data (e.g., molecular fingerprints, SMILES strings).
- Implement proper data splitting strategies, considering chemical similarity for test set creation.
- Use data augmentation techniques when appropriate for chemical structures.
- Utilize efficient data structures for chemical representations.
- Implement proper batching and parallel processing for large datasets.
```