# 🧠 Open Source AI Assistant Archive

Welcome to the **Massive AI Assistant Archive**. This repository is split into two primary massive local libraries to power up any AI agent, coding assistant, or local model.

## 🗂️ Archive Structure

```text
ai_skills/
├── 📁 ai_skills/            # 11,000+ Agent Skills & Prompts
│   ├── skills/              # The deep-categorized markdown prompts
│   ├── scripts/             # The aggregation script to parse prompts
│   ├── sources/             # The raw 23+ source repositories
│   └── templates/           # The prompt templates
│
├── 📁 mcps/                 # 243+ Model Context Protocol (MCP) Servers
│   ├── Official Anthropic/  # Core MCP repositories
│   ├── Browser Automation/  # Servers controlling Playwright, Stagehand, etc.
│   ├── Databases/           # Postgres, SQLite, Redis SQL interfaces
│   ├── Developer Tools/     # Filesystem, Docker, Command-line access
│   └── (... and 10+ other categories)
│
├── 📄 all_mcp_servers.json  # The raw metadata map of the MCP library
└── 📄 setup_mcps.py         # The master extraction and cloning script
```

## 1. AI Skills & Prompts Library (`/ai_skills`)
A massive library of over **11,200** expertly formatted Markdown files. These are instructions, system prompts, workflows, and rulesets originally sourced from 23 different Github repositories. They are deeply categorized into domains like `development/frontend`, `productivity/planning`, `creative/design`, etc.

*To see how this section works, navigate into `/ai_skills/README.md`.*

## 2. MCP Servers Library (`/mcps`)
Model Context Protocol servers are fully functional plugins that grant AI assistants tools (accessting the browser, making database queries, reading your terminal, etc).

We have executed a **shallow clone** on over **240+** top community and official MCP repositories. They are locally archived in `/mcps/` under their respective utility category. 
- You can navigate to any MCP, run `npm install` or `uv sync` depending on the stack, and boot it up!
- Ultra-massive frameworks like *Langchain* and *CrewAI* are present as linking `.md` files to conserve workspace bandwidth and space.

## ⚙️ Maintenance & Syncing
Both sides of this project come with their own dedicated automation pipelines.
- To update the Prompts library: run `./ai_skills/scripts/sync.ps1`
- To re-fetch the MCP clones: run `python setup_mcps.py`
