# 🧠 AI Workspace Archive

> **The most comprehensive self-hostable AI toolbox on GitHub.**
> One repository. Six massive libraries. Everything you need to build, run, and supercharge AI agents — available offline, right on your machine.

---

## 📦 What's Inside

This archive is split into **5 distinct, self-contained pillars**. Each one is a standalone library that can be used independently or combined with the others.

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
│   └── AI & ML Services/       # HuggingFace Spaces, Together AI
│
├── 📁 ide_rules/               # 2,200+ AI Editor Context Rules
│   ├── cursor/                 # .cursorrules + .mdc files for Cursor AI
│   │   └── ... (2,200+ files for every major framework & language)
│   └── cline/                  # Rule presets for the Cline VSCode agent
│
├── 📁 system_prompts/          # 30+ Cloned Prompt Frameworks & Collections
│   ├── system_prompts_leaks_collections/   # Leaked prompts from AI tools
│   ├── prompt_engineering_guides/          # Tutorials + paper-backed techniques
│   ├── prompt_management_tools/            # Langfuse, Helicone, Agenta
│   ├── prompt_testing_evaluation/          # Promptfoo, TruLens, W&B Weave
│   └── safety_guardrails/                 # NeMo-Guardrails, Guardrails-AI, Rebuff
│
└── 📁 api_providers/           # 12 AI API Providers — Full Reference Guide
    ├── _COMPARISON.md          # Side-by-side pricing & winner breakdown
    ├── major_cloud_providers/  # OpenAI, Anthropic, Gemini, DeepSeek, Grok, Mistral, Cohere, Groq
    ├── unified_api_platforms/  # OpenRouter (300+ models, one endpoint)
    ├── cloud_provider_ai_services/ # Azure OpenAI, AWS Bedrock
    └── open_source_models/     # Meta Llama (self-hostable, free weights)

└── 📁 nocode_platforms/        # 15 Cloned No-Code & Visual AI Workflow Builders
    ├── ai_workflow_automation_platforms/ # n8n, Dify, Flowise, Langflow, Trigger.dev, Windmill
    ├── low_code_internal_tools/          # Appsmith, ToolJet, Budibase, NocoDB
    ├── n8n_templates_resources/          # 2,000+ ready-made n8n workflow templates
    ├── flowise_related_tools/            # Flowise → LangChain converter, official docs
    ├── dify_related_tools/               # Dify docs, Kubernetes Helm chart
    └── additional_no_code_platforms/     # Directus, Hoppscotch, Plane, Rowy
```

---

## 📚 Pillar 1 — AI Skills & Prompt Library (`/ai_skills_library`)

**11,000+ structured, ready-to-use AI skill files.**

Every file is a fully-standardized, YAML-frontmatted instruction set sourced from **23 of the most respected AI skill repos on GitHub** — including Anthropic's official skill library, OpenAI skills, HuggingFace tools, and multiple community curations.

### What you get:
- 🔧 **Development** — Generate clean React components, debug FastAPI routes, write Terraform configs, review security vulnerabilities
- 📋 **Productivity** — Summarize research papers, draft project specs, create meeting agendas, write executive reports
- 🎨 **Creative** — Write marketing copy, generate brand guidelines, produce UI design briefs, compose technical documentation
- 🔬 **Domain-specific** — Finance modeling, academic writing, scientific explanations, legal drafting

### How to use:
1. Navigate to the relevant category (e.g., `skills/development/frontend/`)
2. Open any `.md` file — the YAML frontmatter tells you what the skill does, which model works best, and what input to provide
3. Drop the content directly into Claude, Cursor, Gemini, or any AI assistant as a system prompt

---

## 🔌 Pillar 2 — MCP Server Repository (`/mcps`)

**92 fully cloned Model Context Protocol (MCP) server repositories.**

MCP servers are the "plugins" that give AI assistants real superpowers — the ability to browse the web, query your database, read your filesystem, send Slack messages, and much more. Every repo here is a working, installable server that connects directly to Claude Desktop, Cursor, Windsurf, or any MCP-compatible client.

### What you get:
- 🌐 **Browser Automation** — Playwright, Chrome DevTools, Browserbase cloud browsers
- 🗄️ **Database Access** — PostgreSQL, SQLite, BigQuery, Snowflake, MongoDB
- ☁️ **Cloud Platforms** — AWS, Google Cloud, Azure connectors via natural language
- 🔍 **Web Search** — Brave Search, Exa, Perplexity-style search APIs
- 💬 **Communication** — Slack, email, Google Calendar, Discord
- 🛠️ **Dev Tools** — Filesystem reader/writer, Git operations, Docker control, terminal

### How to use:
1. Navigate to the specific server (e.g., `mcps/Databases/postgres-mcp-server/`)
2. Follow the `README.md` inside for installation (usually `npm install` or `uv sync`)
3. Add the server config to your `claude_desktop_config.json` or equivalent

---

## 🖥️ Pillar 3 — IDE Context Rules (`/ide_rules`)

**2,200+ editor-specific AI instruction files for Cursor, Windsurf, and Cline.**

`.cursorrules` and `.mdc` files that instantly prime your AI editor for any tech stack — React, Next.js, FastAPI, Go, Rust, Solidity, and 300+ more frameworks.

### How to use:
1. Find your stack in `/ide_rules/cursor/` (e.g., `nextjs-tailwind.mdc`)
2. Copy the file to the root of your project as `.cursorrules`
3. The AI in your editor will immediately start coding exactly the way you want

---

## 📝 Pillar 4 — System Prompts & Frameworks (`/system_prompts`)

**30+ cloned repos of leaked system prompts, engineering guides, and evaluation tooling.**

### What you get:
- 🔓 **Leaked System Prompts** — The actual instructions running inside Claude Code, Cursor, Windsurf, Devin, v0, Perplexity, Notion AI, and 30+ other tools (30,000+ lines)
- 📖 **Prompt Engineering Guides** — 22 hands-on tutorials + the original `awesome-chatgpt-prompts` (115K ⭐)
- 🧪 **Evaluation Frameworks** — Promptfoo, TruLens, W&B Weave for testing and scoring prompts
- 🛡️ **Safety & Guardrails** — NeMo-Guardrails, Guardrails-AI, Rebuff for prompt injection protection

---

## 💡 Pillar 5 — AI API Providers Reference (`/api_providers`)

**The complete reference guide for 12 major AI API providers — pricing, models, SDK installs, and code snippets.**

No more switching between 12 different docs sites. Every provider is documented in a single, clean markdown file with everything you need to start making API calls in minutes.

### Providers covered:
| Provider | Best For | Free Tier |
|---|---|---|
| **OpenAI** | GPT-4.1, o3, GPT-5 | $5-18 initial credit |
| **Anthropic (Claude)** | Claude Opus 4.6, Sonnet 4.6 | None (pay-as-you-go) |
| **Google Gemini** | Multimodal, Google Search grounding | 1,500 req/day free |
| **DeepSeek** | Ultra-low cost, no rate limits | 5M free tokens |
| **xAI (Grok)** | 2M token context, real-time X data | $25 free credits |
| **Mistral AI** | EU/GDPR compliance, open weights | Yes (with limits) |
| **Cohere** | Best embeddings (Embed 4), Rerank | 1,000 calls/month |
| **Groq** | Fastest inference (1,000+ tok/sec) | Yes (with limits) |
| **OpenRouter** | 300+ models, single API endpoint | 50 req/day free |
| **Azure OpenAI** | Enterprise SLA, HIPAA, VPC | $200 Azure credit |
| **AWS Bedrock** | Multi-provider, serverless, IAM | AWS Free Tier |
| **Meta (Llama)** | Free open weights, self-hosting | FREE forever |

### What each file includes:
- API endpoint URL and authentication method
- Full pricing table per model (input/output/cached tokens)
- SDK install commands for Python and Node.js
- Key features and rate limits
- What each model is best suited for

### 🏆 Category winners (from `_COMPARISON.md`):
- **Cheapest:** DeepSeek V4 at $0.30/M input tokens
- **Best Free Tier:** DeepSeek (5M tokens) and Google Gemini (1,500 req/day)
- **Largest Context:** xAI Grok (2M tokens)
- **Fastest:** Groq (400-1,000+ tokens/sec on LPU hardware)
- **Best Reasoning:** Claude Opus 4.6
- **Best for EU/GDPR:** Mistral AI
- **Best Embeddings:** Cohere Embed 4
- **Best Self-Hosted:** Meta Llama (free weights)

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

### Look up an API provider
```
Open: api_providers/_COMPARISON.md    ← side-by-side winner breakdown
Open: api_providers/major_cloud_providers/OpenAI.md   ← full pricing + SDK
```

---

## 📊 Archive Stats

| Pillar | Contents | Scale |
|---|---|---|
| 🧠 AI Skills Library | Structured prompt files from 23 repos | 11,000+ files |
| 🔌 MCP Servers | Fully cloned, installable server repos | 92 repositories |
| 🖥️ IDE Rules | `.cursorrules` + `.mdc` for every major stack | 2,200+ files |
| 📝 System Prompts | Leaked prompts, guides, eval & safety tools | 30+ repositories |
| 💡 API Providers | Full reference guide for 12 providers (50+ models) | 13 markdown files |
| **Total** | **Everything an AI developer needs** | **13,000+ files** |

---

## ⚠️ Disclaimer

All content is sourced from public GitHub repositories and official documentation. Leaked system prompts are shared for educational and research purposes only. Each MCP server retains its original license as specified in its own `LICENSE` file. Pricing data reflects publicly listed rates as of the last update date and may change.

---

*Built for AI developers who want everything in one place. No subscriptions, no APIs, no gatekeeping.*
