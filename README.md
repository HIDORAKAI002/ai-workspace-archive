# 🧠 Centralized AI Skills Repository

Welcome to the **Centralized AI Skills Repository**. This project aggregates and standardizes high-quality AI prompts and agent skills from top open-source repositories into a single, cohesive, and easy-to-explore library.

This repository is designed to give you daily, professional-grade tools to enhance your AI agents, coding assistants, and workflows.

## 🗂️ Folder Structure

We organize thousands of skills into an intuitive structure so you can easily track and utilize them:

```text
ai_skills/
├── 📁 skills/                 # Aggregated, recursively classified skills
│   ├── 🛠️ development/        # frontend/, backend/, devops/, mobile/, database/, ai-ml/
│   ├── ⚡ productivity/       # writing/, planning/, analysis/, finance/, communication/
│   ├── 🎨 creative/           # design/, marketing/, multimedia/
│   └── 📦 other/              # General purpose and uncategorized skills
├── 📁 scripts/                # Automation for syncing and aggregation
├── 📁 sources/                # The raw cloned repositories (Links in sources/README.md)
├── 📁 templates/              # Standardized skill formats
└── 📄 README.md               # You are here!
```

## ✨ Featured Capabilities

- **Deep Organization**: Skills are sorted by domain (Development, Productivity, Creative).
- **Daily Commits**: Using our automation scripts, we pull the latest skills from 20+ sources regularly.
- **Consistent Formatting**: Every skill has been reformatted to match our `new_skill_template.md` which includes standardized frontmatter (`name`, `source_repo`, `category`) and a clean markdown layout.
- **Wide Coverage**: Aggregated from major industry leaders (Anthropic, OpenAI) and top community libraries.

## 🚀 Getting Started

If you are an AI assistant or a user looking for a specific skill:

1. **Browse Categories**: Open the `skills/` folder and navigate to the category that fits your current task.
2. **Read the Skill**: Each file provides clear instructions on how the agent should behave and execute its tasks.
3. **Copy & Use**: Feed the prompt or context to your AI assistant.

### Adding New Skills manually

If you have a customized skill you want to add:
1. Copy the template from `templates/new_skill_template.md`.
2. Fill out the YAML frontmatter.
3. Add your prompt logic.
4. Save it into the appropriate `skills/` subdirectory.

## ⚙️ Automation Scripts

This repository is built for continuous updates.

### 1. `clone_repos.ps1`
Run this script to initialize or update the source repositories in the `/sources` directory.
```powershell
./scripts/clone_repos.ps1
```

### 2. `aggregate.py`
Run this Python script to parse all `.md` files in the source repositories, format them automatically, and sort them into the `skills/` subdirectories.
```bash
python scripts/aggregate.py
```

## 📚 Acknowledgments

This library is made possible by the incredible open-source AI community. It aggregates content from multiple foundational organizations and prolific creators. A huge thank you to all the original authors!

---
*Built for the community. Kept updated daily.*
