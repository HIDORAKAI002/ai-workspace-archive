<div align="center">

# 🧠 AI Workspace Archive

**The most comprehensive self-hostable AI developer toolbox on GitHub.**

*11,000+ agent skills · 92 MCP servers · 2,200+ IDE rules · 30+ system prompt collections · 12 API providers · 15 no-code platforms · 1,400+ public APIs*

[![Stars](https://img.shields.io/github/stars/HIDORAKAI002/ai-workspace-archive?style=for-the-badge&color=gold)](https://github.com/HIDORAKAI002/ai-workspace-archive/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/HIDORAKAI002/ai-workspace-archive?style=for-the-badge&color=green)](https://github.com/HIDORAKAI002/ai-workspace-archive/commits)
[![Auto-Sync](https://img.shields.io/badge/auto--sync-every%206h-blue?style=for-the-badge)](https://github.com/HIDORAKAI002/ai-workspace-archive/actions)
[![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge)](LICENSE)

> One repository. Everything an AI developer needs. Offline. No subscriptions. No gatekeeping.

</div>

---

## 📋 Table of Contents

- [🧠 Pillar 1 — AI Skills & Prompt Library](#-pillar-1--ai-skills--prompt-library)
- [🔌 Pillar 2 — MCP Server Repository](#-pillar-2--mcp-server-repository)
- [🖥️ Pillar 3 — IDE Context Rules](#%EF%B8%8F-pillar-3--ide-context-rules)
- [📝 Pillar 4 — System Prompts & Frameworks](#-pillar-4--system-prompts--frameworks)
- [💡 Pillar 5 — AI API Providers Reference](#-pillar-5--ai-api-providers-reference)
- [🔧 Pillar 6 — No-Code & Visual Workflow Builders](#-pillar-6--no-code--visual-workflow-builders)
- [🌐 Pillar 7 — Public APIs Directory](#-pillar-7--public-apis-directory)
- [⚡ Quick Start](#-quick-start)
- [🔄 Auto-Sync](#-auto-sync)
- [📊 Archive Stats](#-archive-stats)
- [⚠️ Disclaimer](#%EF%B8%8F-disclaimer)

---

## 🧠 Pillar 1 — AI Skills & Prompt Library

> **`/ai_skills_library/`** — 11,000+ structured, categorized, ready-to-use AI skill files

Every file is a YAML-frontmatted instruction set sourced from 23 of the most starred AI skill repos on GitHub. Drop any file directly into Claude, Cursor, Gemini, or any AI tool as a system prompt.

<details>
<summary><b>📂 Source Repositories (23 repos)</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | 10K+ | Official Anthropic prompt recipes |
| [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | 60K+ | Official OpenAI examples & guides |
| [microsoft/promptflow](https://github.com/microsoft/promptflow) | 10K+ | Microsoft prompt engineering tools |
| [huggingface/agents-course](https://github.com/huggingface/agents-course) | 15K+ | HuggingFace AI agents course |
| [NirDiamant/GenAI_Agents](https://github.com/NirDiamant/GenAI_Agents) | 8K+ | GenAI agent implementations |
| [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | 14K+ | Curated AI agents list |
| + 17 more | — | Community skill libraries |

</details>

<details>
<summary><b>📂 Skill Categories</b></summary>

| Category | Sub-Categories | Examples |
|---|---|---|
| **Development** | frontend, backend, devops, security | React components, FastAPI routes, Terraform, pen testing |
| **Productivity** | writing, analysis, planning | Research summaries, project specs, meeting agendas |
| **Creative** | marketing, design, content | Brand copy, UI briefs, technical documentation |
| **Finance** | analysis, modeling | Financial reports, investment analysis |
| **Education** | tutoring, explanations | Academic writing, concept explanations |
| **Science** | research, data | Scientific summaries, data interpretation |

</details>

**How to use:** Open any `.md` file → copy the content → paste as a system prompt into your AI tool.

---

## 🔌 Pillar 2 — MCP Server Repository

> **`/mcps/`** — 92 fully cloned Model Context Protocol server repositories

MCP servers are plugins that give AI assistants real capabilities — browse the web, query databases, control your filesystem, send messages, manage cloud infra. Every repo here is installable and connects directly to Claude Desktop, Cursor, or Windsurf.

<details>
<summary><b>🌐 Browser Automation</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | 12K+ | Control browsers with Playwright via MCP |
| [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | 500+ | Cloud browser automation |
| [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | 800+ | Playwright test automation MCP |
| [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) | 500+ | Browser DevTools access |

</details>

<details>
<summary><b>🗄️ Databases</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp) | 1K+ | Supabase database MCP |
| [isaacwasserman/mcp-snowflake-server](https://github.com/isaacwasserman/mcp-snowflake-server) | 300+ | Snowflake data warehouse MCP |
| [ergut/mcp-bigquery-server](https://github.com/ergut/mcp-bigquery-server) | 200+ | Google BigQuery MCP |
| [keboola/keboola-mcp-server](https://github.com/keboola/keboola-mcp-server) | 100+ | Keboola data platform MCP |

</details>

<details>
<summary><b>☁️ Cloud Platforms</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) | 500+ | AWS infrastructure management |
| [strowk/mcp-k8s-go](https://github.com/strowk/mcp-k8s-go) | 400+ | Kubernetes cluster control (Go) |
| [manusa/kubernetes-mcp-server](https://github.com/manusa/kubernetes-mcp-server) | 300+ | Java-based Kubernetes MCP |

</details>

<details>
<summary><b>🔍 Search Engines</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) | 600+ | Exa AI-native search MCP |
| [fatwang2/search1api-mcp](https://github.com/fatwang2/search1api-mcp) | 400+ | Multi-engine search API |
| [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp) | 300+ | Tavily research search MCP |

</details>

<details>
<summary><b>💬 Communication & Productivity</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server) | 2K+ | Official Notion MCP |
| [github/github-mcp-server](https://github.com/github/github-mcp-server) | 5K+ | Official GitHub MCP |
| [Klaviyo/mcp-server-klaviyo](https://github.com/Klaviyo/mcp-server-klaviyo) | 200+ | Klaviyo email marketing MCP |

</details>

<details>
<summary><b>🛠️ Developer Tools</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [mark3labs/mcphost](https://github.com/mark3labs/mcphost) | 1K+ | CLI host for running MCP servers |
| [idosal/git-mcp](https://github.com/idosal/git-mcp) | 400+ | Git operations via MCP |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | Official MCP reference servers |

</details>

<details>
<summary><b>🤖 AI & ML Services</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [evalstate/mcp-hfspace](https://github.com/evalstate/mcp-hfspace) | 300+ | HuggingFace Spaces MCP |
| [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | 500+ | Agent framework for MCP |

</details>

**How to use:**
```bash
cd mcps/browser_automation/playwright-mcp
npm install
# Add to claude_desktop_config.json and restart Claude Desktop
```

---

## 🖥️ Pillar 3 — IDE Context Rules

> **`/ide_rules/`** — 2,200+ AI editor instruction files for Cursor, Windsurf, and Cline

Pre-written `.cursorrules` and `.mdc` files that instantly prime your AI editor for your exact tech stack. Drop one into your project root and the AI immediately understands your architecture, conventions, and preferences.

<details>
<summary><b>📂 Available Framework Rules (selection)</b></summary>

| Framework | File | What It Does |
|---|---|---|
| React + TypeScript | `react-typescript.cursorrules` | Enforces hooks patterns, component structure, typing |
| Next.js + Tailwind | `nextjs-tailwind.mdc` | App Router, RSC, utility-first styling |
| Python FastAPI | `python-fastapi.cursorrules` | Pydantic models, async endpoints, error handling |
| Node.js + Express | `nodejs-express.cursorrules` | REST conventions, middleware patterns |
| Solidity / Web3 | `solidity.cursorrules` | Smart contract patterns, security checks |
| Go | `golang.cursorrules` | Idiomatic Go, error handling, interfaces |
| Rust | `rust.cursorrules` | Ownership patterns, error propagation |
| Swift / SwiftUI | `swift.cursorrules` | MVVM, Combine, SwiftUI idioms |
| Vue 3 | `vue3.cursorrules` | Composition API, TypeScript |
| Django | `django.cursorrules` | ORM patterns, views, templates |
| Flutter | `flutter.cursorrules` | Widget tree, state management |
| + 300 more | — | Every major language and framework |

</details>

**How to use:**
```bash
# Find your stack
ls ide_rules/cursor/ | grep react

# Copy to your project
cp ide_rules/cursor/react-typescript.cursorrules /your-project/.cursorrules

# Open in Cursor — AI is instantly primed
```

---

## 📝 Pillar 4 — System Prompts & Frameworks

> **`/system_prompts/`** — 30+ repos of leaked prompts, engineering guides, and evaluation tooling

<details>
<summary><b>🔓 Leaked System Prompts Collections</b></summary>

| Repository | Stars | What's Inside |
|---|---|---|
| [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 111K+ | Claude Code, Cursor, Devin, v0, Windsurf, Perplexity, Notion AI |
| [LouisShark/chatgpt_system_prompt](https://github.com/LouisShark/chatgpt_system_prompt) | 8K+ | ChatGPT custom GPT system prompts |
| [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) | 5K+ | Massive collection of GPT/Claude prompts |

</details>

<details>
<summary><b>📖 Prompt Engineering Guides</b></summary>

| Repository | Stars | What's Inside |
|---|---|---|
| [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | 115K+ | 157 expert role prompts (developer, researcher, etc.) |
| [NirDiamant/Prompt_Engineering](https://github.com/NirDiamant/Prompt_Engineering) | 8K+ | 22 hands-on Jupyter tutorials |
| [brexhq/prompt-engineering](https://github.com/brexhq/prompt-engineering) | 8K+ | Brex internal prompt engineering guide |

</details>

<details>
<summary><b>🧪 Prompt Testing & Evaluation</b></summary>

| Repository | Stars | What's Inside |
|---|---|---|
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | 5K+ | CLI tool to test and compare prompts |
| [trulens/trulens](https://github.com/trulens/trulens) | 2K+ | LLM feedback scoring framework |
| [wandb/weave](https://github.com/wandb/weave) | 500+ | W&B trace-based LLM debugging |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | 7K+ | Open-source LLM observability |

</details>

<details>
<summary><b>🛡️ Safety & Guardrails</b></summary>

| Repository | Stars | What's Inside |
|---|---|---|
| [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) | 4K+ | Rails for topic avoidance, jailbreak resistance |
| [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) | 4K+ | Schema validation for LLM outputs |
| [protectai/rebuff](https://github.com/protectai/rebuff) | 1K+ | Real-time prompt injection detection |

</details>

---

## 💡 Pillar 5 — AI API Providers Reference

> **`/api_providers/`** — Complete reference for 12 major AI API providers: pricing, models, SDKs, and code examples

<details>
<summary><b>🏆 Category Winners</b></summary>

| Category | Winner | Details | Runner-Up |
|---|---|---|---|
| **Cheapest** | DeepSeek V4 | $0.30/M input | Gemini 2.5 Flash-Lite ($0.10/M) |
| **Best Free Tier** | DeepSeek | 5M free tokens | Google Gemini (1,500 req/day) |
| **Largest Context** | xAI Grok | 2M tokens | GPT-4.1 / Claude 4.6 / Gemini 2.5 (1M) |
| **Fastest** | Groq | 1,000+ tok/sec | Together AI / Fireworks |
| **Best Reasoning** | Claude Opus 4.6 | $5/M input | OpenAI o3 ($2/M) |
| **Best EU/GDPR** | Mistral AI | EU data residency | Google Gemini EU |
| **Best Embeddings** | Cohere Embed 4 | $0.12/M | OpenAI text-embedding-3-small |
| **Best Self-Hosted** | Meta Llama | Free open weights | Mistral (open-weight) |

</details>

<details>
<summary><b>💰 Provider Pricing Summary</b></summary>

| Provider | Cheapest Model | Best Model | Free Tier | Context |
|---|---|---|---|---|
| **OpenAI** | GPT-4.1 Nano ($0.10/M) | o3 ($2/M) | $5-18 credit | 1M |
| **Anthropic** | Claude Haiku 4.5 ($1/M) | Claude Opus 4.6 ($5/M) | None | 1M |
| **Google Gemini** | Flash-Lite ($0.10/M) | Gemini 2.5 Pro ($1.25/M) | 1,500 req/day | 1M |
| **DeepSeek** | Chat V3.2 ($0.28/M) | R1 ($0.55/M) | 5M tokens | 128K |
| **xAI Grok** | Grok 4.1 Fast ($0.20/M) | Grok 4 ($3/M) | $25 credit | 2M |
| **Mistral AI** | Small 3.1 ($0.20/M) | Large 3 ($2/M) | Yes (limited) | 128K |
| **Cohere** | Command R7B ($0.04/M) | Command R+ ($2.50/M) | 1K calls/mo | 128K |
| **Groq** | Llama 3.1 8B ($0.05/M) | Llama 4 Maverick ($0.50/M) | Yes (limited) | 128K |
| **OpenRouter** | 25+ free models | 300+ models | 50 req/day | varies |
| **Azure OpenAI** | GPT-4o mini ($0.15/M) | o1 ($15/M) | $200 credit | 128K |
| **AWS Bedrock** | Amazon Nova ($0.03/M) | Claude 3.5 Sonnet ($3/M) | AWS Free Tier | 200K |
| **Meta Llama** | FREE (self-host) | FREE (self-host) | Always free | 200K |

</details>

<details>
<summary><b>⚡ Quick Code Snippets</b></summary>

**OpenAI:**
```python
from openai import OpenAI
client = OpenAI(api_key="your-key")
response = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role":"user","content":"Hello"}])
print(response.choices[0].message.content)
```

**Anthropic Claude:**
```python
from anthropic import Anthropic
client = Anthropic(api_key="your-key")
response = client.messages.create(model="claude-3-5-sonnet-20241022", max_tokens=1024, messages=[{"role":"user","content":"Hello"}])
print(response.content[0].text)
```

**DeepSeek (OpenAI-compatible):**
```python
from openai import OpenAI
client = OpenAI(api_key="your-key", base_url="https://api.deepseek.com/v1")
response = client.chat.completions.create(model="deepseek-chat", messages=[{"role":"user","content":"Hello"}])
print(response.choices[0].message.content)
```

</details>

Full per-provider markdown files: [`/api_providers/`](./api_providers/) — each file includes models table, rate limits, feature list, SDK install commands.

---

## 🔧 Pillar 6 — No-Code & Visual Workflow Builders

> **`/nocode_platforms/`** — 15 fully cloned no-code and low-code platforms for building AI workflows visually

<details>
<summary><b>🤖 AI Workflow Automation Platforms</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 181K+ | The most popular open-source workflow automation. 400+ integrations, native AI, self-hostable |
| [langgenius/dify](https://github.com/langgenius/dify) | 135K+ | Full-stack LLM app platform. Visual workflow builder with RAG, LLMOps, 50+ tools |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | 146K+ | Visual builder for LangChain and RAG applications |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | 51K+ | Drag-and-drop LLM orchestration and AI agent builder |
| [activepieces/activepieces](https://github.com/activepieces/activepieces) | 21K+ | AI Agents + MCPs + workflow automation. Zapier alternative |
| [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) | 14K+ | Developer-first background jobs and AI workflow automation |
| [windmill-labs/windmill](https://github.com/windmill-labs/windmill) | 16K+ | Fastest workflow engine (13x Airflow). Retool alternative |

</details>

<details>
<summary><b>🏢 Low-Code Internal Tools</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | 39K+ | Build admin panels, dashboards, internal tools. 25+ DB integrations |
| [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | 37K+ | AI-native internal tool platform for dashboards and business apps |
| [Budibase/budibase](https://github.com/Budibase/budibase) | 27K+ | AI agents that run your operations. Model agnostic |
| [nocodb/nocodb](https://github.com/nocodb/nocodb) | 62K+ | Free, self-hostable Airtable alternative with REST API |

</details>

<details>
<summary><b>📚 n8n Templates (2,000+ Workflows)</b></summary>

| Repository | Stars | Description |
|---|---|---|
| [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) | 19K+ | 280+ templates for Gmail, Telegram, Slack, WhatsApp, OpenAI, Notion |
| [emretasss/AI-Workflow-Hub-2000-](https://github.com/emretasss/AI-Workflow-Hub-2000-) | 1.5K+ | 2,000+ free n8n AI automation workflows |
| [n8n-io/n8n-hosting](https://github.com/n8n-io/n8n-hosting) | 1.5K+ | Official Docker + Kubernetes configs for self-hosting n8n |

</details>

<details>
<summary><b>📊 Platform Comparison</b></summary>

| Feature | n8n | Dify | Flowise | Langflow |
|---|---|---|---|---|
| **Visual Builder** | ✅ | ✅ | ✅ | ✅ |
| **Self-Hostable** | ✅ | ✅ | ✅ | ✅ |
| **Native AI/LLM** | ✅ | ✅ | ✅ | ✅ |
| **RAG** | ⚠️ | ✅ | ✅ | ✅ |
| **Multi-Agent** | ✅ | ✅ | ✅ | ✅ |
| **Integrations** | 400+ | 50+ | 100+ | 50+ |
| **License** | Fair-code | Apache 2.0 | Apache 2.0 | MIT |

</details>

---

## 🌐 Pillar 7 — Public APIs Directory

> **`/public_apis/`** — Auto-synced mirror of [public-apis/public-apis](https://github.com/public-apis/public-apis) (320K+ ⭐)

The single most-starred curated list on GitHub. 1,400+ free public APIs organized by category.

<details>
<summary><b>📂 API Categories (A–Z)</b></summary>

| Category | Examples |
|---|---|
| **Animals** | Dog API, Cat Facts, RandomFox |
| **Anime** | Jikan (MyAnimeList), AniList, Waifu.pics |
| **Anti-Malware** | AbuseIPDB, VirusTotal, URLhaus |
| **Art & Design** | Metropolitan Museum, Art Institute Chicago |
| **Authentication** | Auth0, Okta, Firebase Auth |
| **Blockchain** | Etherscan, Blockchain.info, Chainlink |
| **Books** | Open Library, Google Books, Gutendex |
| **Business** | Companies House, Clearbit, Hunter.io |
| **Calendar** | Calendarific, Abstract Holidays |
| **Cloud Storage** | Dropbox, Google Drive, OneDrive |
| **Continuous Integration** | CircleCI, Travis CI, GitHub Actions |
| **Cryptocurrency** | CoinGecko, Binance, Coinbase |
| **Currency Exchange** | ExchangeRate-API, Fixer, Open Exchange |
| **Data Validation** | Mailboxlayer, numverify, Abstract Email |
| **Development** | GitHub, GitLab, StackOverflow |
| **Dictionaries** | Merriam-Webster, Oxford, WordsAPI |
| **Documents & Productivity** | Google Docs, Notion API, Airtable |
| **Email** | Mailchimp, SendGrid, Mailgun |
| **Entertainment** | Chuck Norris, Bored API, Numbers API |
| **Environment** | OpenAQ, Carbon Interface, AirVisual |
| **Events** | Eventbrite, Ticketmaster, Meetup |
| **Finance** | Alpha Vantage, Yahoo Finance, Plaid |
| **Food & Drink** | TheMealDB, Open Food Facts, Spoonacular |
| **Games & Comics** | RAWG, IGDB, Marvel Comics |
| **Geocoding** | Google Maps, Mapbox, Here Maps |
| **Government** | US Gov Data, UK Companies House, NASA |
| **Health** | Open FDA, WHO, Disease.sh |
| **Jobs** | GitHub Jobs, Reed, The Muse |
| **Machine Learning** | OpenAI, Hugging Face, Cohere |
| **Music** | Spotify, Last.fm, SoundCloud |
| **News** | NewsAPI, Guardian, NY Times |
| **Open Data** | data.gov, World Bank, CERN |
| **Security** | Have I Been Pwned, Shodan, VirusTotal |
| **Shopping** | Amazon, eBay, Etsy |
| **Social** | Twitter/X, Reddit, Discord |
| **Sports & Fitness** | Strava, NFL, NBA, Football-Data.org |
| **Text Analysis** | MonkeyLearn, MeaningCloud, Textgears |
| **Transportation** | Uber, Lyft, TfL (Transport for London) |
| **URL Shorteners** | Bitly, TinyURL, Rebrandly |
| **Vehicle** | NHTSA, CarQuery, Edmunds |
| **Video** | YouTube, Twitch, Vimeo |
| **Weather** | OpenWeather, WeatherAPI, Tomorrow.io |

</details>

This folder auto-syncs daily — always up to date with upstream.

---

## ⚡ Quick Start

### Clone the archive
```bash
git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git
cd ai-workspace-archive
```

### Use a Cursor Rule immediately
```bash
# Find your stack
ls ide_rules/cursor/ | grep next

# Apply it
cp ide_rules/cursor/nextjs-tailwind.mdc /your-project/.cursorrules
# Open in Cursor → AI is instantly primed for your stack
```

### Boot an MCP server
```bash
cd mcps/browser_automation/playwright-mcp
npm install
# Add to claude_desktop_config.json → restart Claude Desktop
```

### Browse leaked system prompts
```bash
# See what tools' system prompts are available
ls system_prompts/system_prompts_leaks_collections/

# Pick one
cat system_prompts/system_prompts_leaks_collections/system-prompts-and-models-of-ai-tools/cursor/cursor.md
```

### Look up an API provider
```bash
# Side-by-side winner comparison
open api_providers/_COMPARISON.md

# Specific provider details
open api_providers/major_cloud_providers/OpenAI.md
```

### Find a no-code workflow template
```bash
# Browse 2,000+ n8n templates
ls nocode_platforms/n8n_templates_resources/awesome-n8n-templates/

# Or open the n8n source directly
ls nocode_platforms/ai_workflow_automation_platforms/n8n/
```

---

## 🔄 Auto-Sync

This archive stays up-to-date automatically.

<details>
<summary><b>How it works</b></summary>

A bot runs every **6 hours** on a dedicated VPS, checking each of the 44+ tracked upstream repositories for new commits. When changes are detected:

1. The upstream repo is re-cloned fresh (`--depth 1`)
2. The `.git` folder is stripped
3. The updated files replace the old ones in this archive
4. A timestamped commit is pushed: `chore(sync): Auto-sync N repos [YYYY-MM-DD HH:MM UTC]`

The GitHub Actions workflow in `.github/workflows/sync_upstream.yml` also runs daily as a backup.

</details>

<details>
<summary><b>Tracked repositories (44+)</b></summary>

| Pillar | Repos Tracked |
|---|---|
| Public APIs | 1 (public-apis/public-apis) |
| MCP Servers | 20 (official + browser + DB + cloud + search + dev tools) |
| System Prompts | 9 (leaks + guides + eval + guardrails) |
| No-Code Platforms | 14 (n8n + Dify + Flowise + Appsmith + NocoDB + more) |
| Total | **44+ upstream repositories** |

</details>

---

## 📊 Archive Stats

| Pillar | Scale | Key Contents |
|---|---|---|
| 🧠 AI Skills Library | 11,000+ files | Agent skills from 23 repos across 6 domains |
| 🔌 MCP Servers | 92 repositories | Browser, DB, cloud, search, communication, dev tools |
| 🖥️ IDE Rules | 2,200+ files | `.cursorrules` + `.mdc` for every major stack |
| 📝 System Prompts | 30+ repositories | Leaked prompts + guides + eval + guardrails |
| 💡 API Providers | 12 providers · 50+ models | Full pricing, SDKs, code examples |
| 🔧 No-Code Platforms | 15 repositories | n8n, Dify, Flowise, Appsmith, NocoDB + 10 more |
| 🌐 Public APIs | 1,400+ APIs | Every major public API, categorized |
| **Total** | **13,000+ files** | **Everything an AI developer needs** |

---

## ⚠️ Disclaimer

All content is sourced from public GitHub repositories and official documentation. Leaked system prompts are included for educational and research purposes only. Each included repository retains its original license as specified in its own `LICENSE` file. Pricing data for API providers reflects publicly listed rates and may change — always verify with the official provider.

---

<div align="center">

*Built for AI developers who want everything in one place.*
*No subscriptions. No APIs required. No gatekeeping.*

**[⭐ Star this repo](https://github.com/HIDORAKAI002/ai-workspace-archive) · [🐛 Report Issue](https://github.com/HIDORAKAI002/ai-workspace-archive/issues) · [🤝 Contribute](https://github.com/HIDORAKAI002/ai-workspace-archive/pulls)**

</div>
