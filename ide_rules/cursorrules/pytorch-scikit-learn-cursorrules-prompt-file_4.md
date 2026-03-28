---
name: "pytorch-scikit-learn-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for pytorch-scikit-learn-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Guidelines for deep learning model development with PyTorch in chemistry applications, including network architecture, batch processing, and optimization techniques.
globs: models/pytorch/**/*.py
---
- Leverage PyTorch for deep learning models and when GPU acceleration is needed.
- Design neural network architectures suitable for chemical data (e.g., graph neural networks for molecular property prediction).
- Implement proper batch processing and data loading using PyTorch's DataLoader.
- Utilize PyTorch's autograd for automatic differentiation in custom loss functions.
- Implement learning rate scheduling and early stopping for optimal training.
- Use GPU acceleration when available, especially for PyTorch models.
```