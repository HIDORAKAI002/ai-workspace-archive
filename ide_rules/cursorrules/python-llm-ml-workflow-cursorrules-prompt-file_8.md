---
name: "python-llm-ml-workflow-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for python-llm-ml-workflow-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Recommends using Hydra or YAML for experiment configuration to ensure clarity and reproducibility.
globs: **/configs/*.yaml
---
- **Experiment Configuration:** Use `hydra` or `yaml` for clear and reproducible experiment configurations.
```