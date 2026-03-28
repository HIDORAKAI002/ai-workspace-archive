---
name: "linux-nvidia-cuda-python-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for linux-nvidia-cuda-python-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies to the project README file, focusing on providing a simple and usable experience.
globs: README.md
---
- Prioritize maintaining the app's simplicity and ease of use.
- The app is named 'srt-model-quantizing' and is developed by SolidRusT Networks.
- The app is a pipeline for downloading models from Hugging Face, quantizing them, and uploading them to a Hugging Face-compatible repository.
- The app should be able to run on Linux servers only.
- Supports both Nvidia CUDA and AMD ROCm GPUs.
```