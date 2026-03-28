---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for developing machine learning models using scikit-learn in chemistry applications, focusing on algorithm selection, hyperparameter tuning, and cross-validation.
globs: models/sklearn/**/*.py
---
- Use scikit-learn for traditional machine learning algorithms and preprocessing.
- Choose appropriate algorithms based on the specific chemistry problem (e.g., regression, classification, clustering).
- Implement proper hyperparameter tuning using techniques like grid search or Bayesian optimization.
- Use cross-validation techniques suitable for chemical data (e.g., scaffold split for drug discovery tasks).
- Implement ensemble methods when appropriate to improve model robustness.
```