---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for ensuring reproducibility and proper version control in chemistry machine learning projects.
globs: .git/**/*
---
- Use version control (Git) for both code and datasets.
- Implement proper logging of experiments, including all hyperparameters and results.
- Use tools like MLflow or Weights & Biases for experiment tracking.
- Ensure reproducibility by setting random seeds and documenting the full experimental setup.
```