# 🧠 AI Workspace Archive

> **The most comprehensive self-hostable AI toolbox on GitHub.**
> One repository. Four massive libraries. Everything you need to build, run, and supercharge AI agents — available offline, right on your machine.

---

## 📦 What's Inside

This archive is split into **4 distinct, self-contained pillars**. Each one is a standalone library that can be used independently or combined with the others.

```text
ai-workspace-archive/
│
├── 📁 ai_skills_library/       # 11,000+ Agent Skills & Prompt Templates
│   ├── skills/
│   │   ├── development/        # Code generation, debugging, architecture
│   │   │   ├── frontend/       # React, Vue, CSS, HTML
│   │   │   ├── backend/        # APIs, databases, microservices
│   │   │   ├── devops/         # Docker, CI/CD, cloud infra
│   │   │   └── security/       # Pen testing, code reviews
│   │   ├── productivity/       # Planning, research, summaries
│   │   │   ├── writing/        # Emails, reports, documentation
│   │   │   ├── analysis/       # Data analysis, research synthesis
│   │   │   └── planning/       # Tasks, project management
│   │   ├── creative/           # Design, marketing, creative writing
│   │   └── other/              # Finance, education, science
│   ├── sources/                # 23 upstream skill repositories (raw)
│   ├── scripts/                # Automation scripts for daily syncing
│   └── templates/              # Skill file template
│
├── 📁 mcps/                    # 92 Cloned MCP Server Repositories
│   ├── Official Anthropic/     # Core protocol SDKs (Python, TS, Java, Rust, etc.)
│   ├── Browser Automation/     # Playwright, Puppeteer, Browserbase, Stagehand
│   ├── Databases/              # PostgreSQL, SQLite, Snowflake, BigQuery, MongoDB
│   ├── Developer Tools/        # Filesystem access, Git, Docker, terminal
│   ├── Cloud Platforms/        # AWS, GCP, Azure connectors
│   ├── Search Engines/         # Brave Search, Exa, SerpAPI
│   ├── Communication/          # Slack, Discord, email, calendar
│   ├── Productivity/           # Notion, Linear, Jira, GitHub Issues
│   ├── AI & ML Services/       # HuggingFace Spaces, Together AI
│   └── Monitoring/             # Observability and infra tooling
│
├── 📁 ide_rules/               # 2,200+ AI Editor Context Rules
│   ├── cursor/                 # .cursorrules + .mdc files for Cursor AI
│   │   ├── react.cursorrules
│   │   ├── nextjs-tailwind.mdc
│   │   ├── python-fastapi.cursorrules
│   │   └── ... (2,200+ files for every major framework)
│   └── cline/                  # Rule presets for the Cline VSCode agent
│
└── 📁 system_prompts/          # 30+ Cloned Prompt Frameworks & Collections
    ├── system_prompts_leaks_collections/   # Leaked prompts from AI tools
    ├── prompt_engineering_guides/          # Tutorials + paper-backed techniques
    ├── prompt_management_tools/            # Langfuse, Helicone, Agenta
    ├── prompt_testing_evaluation/          # Promptfoo, TruLens, W&B Weave
    └── safety_guardrails/                 # NeMo-Guardrails, Guardrails-AI, Rebuff
```

---

## 📚 Pillar 1 — AI Skills & Prompt Library (`/ai_skills_library`)

**11,000+ structured, ready-to-use AI skill files.**

These are not raw prompts. Every single file is a fully-standardized, YAML-frontmatted instruction set sourced from **23 of the most respected AI skill repositories on GitHub**, including Anthropic's official skill library, OpenAI skills, HuggingFace tools, and multiple community curations.

### What you get:
- 🔧 **Development skills** — Generate clean React components, debug FastAPI routes, write Terraform configs, review security vulnerabilities.
- 📋 **Productivity skills** — Summarize research papers, draft project specs, create meeting agendas, write executive reports.
- 🎨 **Creative skills** — Write marketing copy, generate brand guidelines, produce UI design briefs, compose technical documentation.
- 🔬 **Domain-specific** — Finance modeling, academic writing, scientific explanations, legal drafting.

### How to use:
1. Navigate to the relevant category (e.g., `skills/development/frontend/`)
2. Open any `.md` file — the YAML frontmatter tells you what the skill does, which model works best, and what input to provide
3. Drop the content directly into Claude, Cursor, Gemini, or any AI assistant as a system prompt

---

## 🔌 Pillar 2 — MCP Server Repository (`/mcps`)

**92 fully cloned Model Context Protocol (MCP) server repositories.**

MCP servers are the "plugins" that give AI assistants real superpowers — the ability to browse the web, query your database, read your filesystem, send Slack messages, and much more. Every repo here is a working, installable server that connects directly to Claude Desktop, Cursor, Windsurf, or any MCP-compatible client.

### What you get:
- 🌐 **Browser Automation** — Run Playwright, control Chrome DevTools, use Browserbase for cloud browsers
- 🗄️ **Database Access** — Direct SQL query tools for PostgreSQL, SQLite, BigQuery, Snowflake, MongoDB
- ☁️ **Cloud Platforms** — AWS, Google Cloud, Azure MCP connectors that let you manage infra via natural language
- 🔍 **Web Search** — Brave Search, Exa, Perplexity-style search APIs
- 💬 **Communication** — Slack, email, Google Calendar, Discord integrations
- 🛠️ **Dev Tools** — Filesystem reader/writer, Git operations, Docker control, terminal access

### How to use:
1. Navigate to the specific server (e.g., `mcps/Databases/postgres-mcp-server/`)
2. Follow the `README.md` inside the repo for installation (usually `npm install` or `uv sync`)
3. Add the server config to your `claude_desktop_config.json` or equivalent

---

## 🖥️ Pillar 3 — IDE Context Rules (`/ide_rules`)

**2,200+ editor-specific AI instruction files for Cursor, Windsurf, and Cline.**

When you open a project in Cursor or Windsurf, the AI needs to understand your tech stack, coding style, and architecture preferences. These `.cursorrules` and `.mdc` files are pre-written, hyper-specific instruction sets that instantly prime the AI for the exact framework you're working with.

### What you get:
- **React + TypeScript** rules that enforce proper component patterns, hooks usage, and testing conventions
- **Next.js + Tailwind** rules for App Router, RSC, and utility-first styling
- **Python FastAPI** rules that keep the AI writing Pydantic models, async endpoints, and proper error handling
- **Solidity / Web3** rules for smart contract development
- **Go, Rust, Java, Swift** — all major languages covered
- **300+ framework-specific** configurations in total

### How to use:
1. Find your stack in `/ide_rules/cursor/` (e.g., `nextjs-tailwind.mdc`)
2. Copy the file to the root of your project as `.cursorrules`
3. The AI in your editor will immediately start coding exactly the way you want

---

## 📝 Pillar 4 — System Prompts & Frameworks (`/system_prompts`)

**30+ cloned repositories of leaked system prompts, engineering guides, and evaluation tooling.**

This pillar gives you the behind-the-scenes instructions that power the world's most popular AI tools — plus the infrastructure to test, evaluate, and protect your own prompts.

### What you get:

**🔓 Leaked System Prompts** (`/system_prompts_leaks_collections/`)
- The actual system prompts running inside **Claude Code, Cursor, Windsurf, Devin, v0, Perplexity, Notion AI, and 30+ other tools**
- Over 30,000 lines of real-world system prompt engineering you can study and adapt

**📖 Prompt Engineering Guides** (`/prompt_engineering_guides/`)
- 22 hands-on tutorials covering Chain-of-Thought, Tree-of-Thought, few-shot, and meta-prompting
- The original `awesome-chatgpt-prompts` (115,000+ ⭐) with 157 expert role prompts
- Curated battle-tested templates for Claude, ChatGPT, and Gemini

**🧪 Evaluation Frameworks** (`/prompt_testing_evaluation/`)
- **Promptfoo** — battle-test your prompts against adversarial inputs and regressions
- **TruLens** — feedback scoring for LLM pipelines using real metrics
- **W&B Weave** — trace-based debugging from Weights & Biases

**🛡️ Safety & Guardrails** (`/safety_guardrails/`)
- **NVIDIA NeMo-Guardrails** — define rails for topic avoidance and jailbreak resistance
- **Guardrails-AI** — schema validation for model outputs
- **Rebuff** — real-time prompt injection detection

---

## ⚡ Quick Start

### Clone the archive
```bash
git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git
```

### Use a Cursor Rule instantly
```bash
cp ide_rules/cursor/nextjs-tailwind.mdc /your-project/.cursorrules
# Open your project in Cursor — the AI is now primed for your stack
```

### Boot an MCP Server
```bash
cd mcps/Databases/postgres-mcp-server
npm install
# Add to your claude_desktop_config.json and restart Claude Desktop
```

### Browse the Skills Library
```
Open: ai_skills_library/skills/development/frontend/
Pick any .md file and paste it as a system prompt into your AI tool of choice.
```

---

## 📊 Archive Stats

| Pillar | Contents | Scale |
|---|---|---|
| 🧠 AI Skills Library | Structured prompt files from 23 repos | 11,000+ files |
| 🔌 MCP Servers | Fully cloned, installable server repos | 92 repositories |
| 🖥️ IDE Rules | `.cursorrules` + `.mdc` for every major stack | 2,200+ files |
| 📝 System Prompts | Leaked prompts, guides, eval & safety tools | 30+ repositories |
| **Total** | **Everything an AI developer needs** | **13,000+ files** |

---

## ⚠️ Disclaimer

All content is sourced from public GitHub repositories and official documentation. Leaked system prompts are shared for educational and research purposes only. Each MCP server retains its original license as specified in its own `LICENSE` file.

---

*Built for AI developers who want everything in one place. No subscriptions, no APIs, no gatekeeping.*
