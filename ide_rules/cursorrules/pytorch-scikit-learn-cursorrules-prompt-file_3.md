---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Rules for model evaluation and interpretation scripts in chemistry ML projects, emphasizing appropriate metrics, error analysis, and visualization techniques.
globs: evaluation/**/*.py
---
- Use appropriate metrics for chemistry tasks (e.g., RMSE, R², ROC AUC, enrichment factor).
- Implement techniques for model interpretability (e.g., SHAP values, integrated gradients).
- Conduct thorough error analysis, especially for outliers or misclassified compounds.
- Visualize results using chemistry-specific plotting libraries (e.g., RDKit's drawing utilities).
```