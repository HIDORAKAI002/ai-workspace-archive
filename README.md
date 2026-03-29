<div align="center">

# üß† AI Workspace Archive

**The most comprehensive self-hostable AI developer toolbox on GitHub.**

*11,000+ agent skills ¬∑ 92 MCP servers ¬∑ 2,200+ IDE rules ¬∑ 30+ system prompt collections ¬∑ 12 API providers ¬∑ 15 no-code platforms ¬∑ 1,400+ public APIs ‚Äî all locally archived, all browsable, all free*

[![Stars](https://img.shields.io/github/stars/HIDORAKAI002/ai-workspace-archive?style=for-the-badge&color=FFD700&logo=github)](https://github.com/HIDORAKAI002/ai-workspace-archive/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/HIDORAKAI002/ai-workspace-archive?style=for-the-badge&color=00C853&logo=git)](https://github.com/HIDORAKAI002/ai-workspace-archive/commits)
[![Auto-Sync](https://img.shields.io/badge/auto--sync-every%206h-2196F3?style=for-the-badge&logo=github-actions)](https://github.com/HIDORAKAI002/ai-workspace-archive/actions)
[![Repos Tracked](https://img.shields.io/badge/repos%20tracked-44%2B-9C27B0?style=for-the-badge)](./sync_manifest.json)
[![License](https://img.shields.io/badge/license-MIT-FF5722?style=for-the-badge)](LICENSE)

> One repository. Everything an AI developer needs. Offline. No subscriptions. No gatekeeping.

</div>

---

## üìã Table of Contents

| # | Pillar | Scale | Path |
|---|---|---|---|
| 1 | [üß† AI Skills & Prompt Library](#-pillar-1--ai-skills--prompt-library) | 11,000+ files from 23 repos | `/ai_skills_library/` |
| 2 | [üîå MCP Server Repository](#-pillar-2--mcp-server-repository) | 92 repos across 11 categories | `/mcps/` |
| 3 | [üñ•Ô∏è IDE Context Rules](#-pillar-3--ide-context-rules) | 2,200+ rules for every stack | `/ide_rules/` |
| 4 | [üìù System Prompts & Frameworks](#-pillar-4--system-prompts--frameworks) | 30+ repos across 5 categories | `/system_prompts/` |
| 5 | [üí° AI API Providers Reference](#-pillar-5--ai-api-providers-reference) | 12 providers ¬∑ 50+ models | `/api_providers/` |
| 6 | [üîß No-Code & Visual Workflow Builders](#-pillar-6--no-code--visual-workflow-builders) | 15 repos ¬∑ 29 cloned directories | `/nocode_platforms/` |
| 7 | [üåê Public APIs Directory](#-pillar-7--public-apis-directory) | 1,400+ APIs across 40+ categories | `/public_apis/` |
| ‚Äî | [‚ö° Quick Start](#-quick-start) | Copy-paste commands for each pillar | ‚Äî |
| ‚Äî | [üîÑ Auto-Sync System](#-auto-sync-system) | VPS bot + GitHub Actions | ‚Äî |
| ‚Äî | [üìä Archive Stats](#-archive-stats) | Full breakdown | ‚Äî |

---

## üß† Pillar 1 ‚Äî AI Skills & Prompt Library

> **`/ai_skills_library/`** ¬∑ 11,000+ structured YAML-frontmatted skill files, deep-categorized across 20 sub-domains, sourced from 23 curated GitHub repositories

Every file follows the same structure: a YAML frontmatter block declaring the skill name, recommended model, input format, and usage context ‚Äî followed by the actual prompt content. Drop any file directly into Claude, Cursor, Gemini, Copilot, or any AI assistant as a system prompt.

<details>
<summary><b>üìÇ Skill Taxonomy ‚Äî Full Category Tree</b></summary>

```
ai_skills_library/skills/
‚îÇ
‚îú‚îÄ‚îÄ üîß development/
‚îÇ   ‚îú‚îÄ‚îÄ frontend/        React, Vue, Angular, Next.js, Svelte, CSS, HTML, animations
‚îÇ   ‚îú‚îÄ‚îÄ backend/         FastAPI, Express, Django, Rails, Go APIs, gRPC, REST design
‚îÇ   ‚îú‚îÄ‚îÄ database/        SQL optimization, schema design, migrations, indexing
‚îÇ   ‚îú‚îÄ‚îÄ devops/          Docker, Kubernetes, Terraform, CI/CD, GitHub Actions, AWS
‚îÇ   ‚îú‚îÄ‚îÄ mobile/          React Native, Flutter, Swift, Kotlin, iOS, Android
‚îÇ   ‚îú‚îÄ‚îÄ security/        Pen testing, code review, OWASP, vulnerability analysis
‚îÇ   ‚îî‚îÄ‚îÄ ai-ml/           LLM integration, embeddings, RAG, fine-tuning, agents
‚îÇ
‚îú‚îÄ‚îÄ üìã productivity/
‚îÇ   ‚îú‚îÄ‚îÄ writing/         Emails, reports, documentation, blog posts, READMEs
‚îÇ   ‚îú‚îÄ‚îÄ analysis/        Research synthesis, data analysis, competitor research
‚îÇ   ‚îú‚îÄ‚îÄ planning/        Project specs, task breakdown, sprint planning, roadmaps
‚îÇ   ‚îú‚îÄ‚îÄ communication/   Meeting summaries, presentations, Slack messages
‚îÇ   ‚îî‚îÄ‚îÄ finance/         Financial modeling, budget analysis, investment memos
‚îÇ
‚îú‚îÄ‚îÄ üé® creative/
‚îÇ   ‚îú‚îÄ‚îÄ design/          UI/UX briefs, design systems, Figma instructions
‚îÇ   ‚îú‚îÄ‚îÄ marketing/       Ad copy, landing pages, social media, brand voice
‚îÇ   ‚îî‚îÄ‚îÄ multimedia/      Video scripts, podcast outlines, image prompts
‚îÇ
‚îî‚îÄ‚îÄ üì¶ other/
    ‚îî‚îÄ‚îÄ uncategorized/   Domain-specific skills: legal, medical, education, science
```

</details>

<details>
<summary><b>üìÇ Source Repositories ‚Äî All 23 Origins</b></summary>

| Folder | Original Repository | Focus Area |
|---|---|---|
| `agentscope-skills` | [modelscope/agentscope](https://github.com/modelscope/agentscope) | Multi-agent framework skills |
| `alirezarezvani-skills` | Community contribution | Persian-language AI skills |
| `anthropics-skills` | [anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | Official Anthropic prompt recipes |
| `apify-skills` | [apify/actors-mcp-server](https://github.com/apify/actors-mcp-server) | Web scraping & automation |
| `awesome-copilot` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | GitHub Copilot instructions |
| `factory-skills` | Community contribution | Software factory workflows |
| `flare-skills` | Community contribution | Flare platform skills |
| `gmh5225-awesome-skills` | Community curation | Mixed domain skills |
| `heilcheng-agent-skills` | Community contribution | Chinese-language agent skills |
| `hf-skills` | [huggingface/agents-course](https://github.com/huggingface/agents-course) | HuggingFace AI agent course |
| `integralist-skills` | Community contribution | DevOps & SRE focused skills |
| `karanb-claude-skills` | Community contribution | Claude-specific skill patterns |
| `obsidian-skills` | Community contribution | Obsidian PKM productivity skills |
| `openai-skills` | [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | Official OpenAI examples |
| `openclaw-skills` | Community contribution | Legal & contract AI skills |
| `planning-with-files` | Community contribution | File-based planning skills |
| `promptdeploy` | Community contribution | Prompt deployment workflows |
| `shajith-skills` | Community contribution | Full-stack dev skills |
| `sickn33-awesome-skills` | Community curation | The original comprehensive skill list |
| `sugarforever-skills` | Community contribution | Data science & ML skills |
| `voltagent-agent-skills` | [voltagent/voltagent](https://github.com/voltagent/voltagent) | VoltAgent framework skills |
| `wordpress-skills` | Community contribution | WordPress & CMS skills |
| `yoriiis-skills` | Community contribution | JavaScript ecosystem skills |

</details>

<details>
<summary><b>üîß Development Skills ‚Äî What's Inside</b></summary>

**Frontend** (`development/frontend/`)
- React component generation with proper hooks, context, and TypeScript
- Next.js App Router pages with RSC, server actions, and metadata
- Vue 3 Composition API components with Pinia state management
- CSS animation and glassmorphism design patterns
- Accessibility audit and ARIA implementation
- Performance optimization: lazy loading, code splitting, bundle analysis

**Backend** (`development/backend/`)
- FastAPI endpoint generation with Pydantic models and async patterns
- Express.js REST API scaffolding with middleware and error handling
- Django views, serializers, and ORM query optimization
- GraphQL schema design and resolver implementation
- gRPC service definition and implementation
- API design review and OpenAPI documentation

**Database** (`development/database/`)
- PostgreSQL query optimization and index strategy
- MongoDB schema design and aggregation pipelines
- Database migration scripting and rollback plans
- Redis caching layer design
- SQL ‚Üí NoSQL migration planning

**DevOps** (`development/devops/`)
- Dockerfile multi-stage build optimization
- Kubernetes manifest generation (Deployments, Services, Ingress, HPA)
- Terraform module writing for AWS/GCP/Azure
- GitHub Actions workflow construction
- Helm chart creation and values configuration
- Infrastructure cost analysis

**Security** (`development/security/`)
- OWASP Top 10 vulnerability checklist scanning
- Dependency audit and CVE identification
- JWT authentication flow design
- Penetration testing plan generation
- Secure code review with specific code pattern checks

**AI/ML** (`development/ai-ml/`)
- RAG pipeline design and implementation
- LLM evaluation framework setup
- Embedding generation and vector store integration
- Fine-tuning dataset preparation
- Agent reasoning chain construction
- Multi-modal prompt engineering

</details>

<details>
<summary><b>üìã Productivity Skills ‚Äî What's Inside</b></summary>

**Writing** (`productivity/writing/`)
- Technical documentation generation from code
- README.md creation with badges, TOC, examples
- Executive summary distillation from long documents
- Blog post drafting with SEO structure
- Email drafting for various tones (formal, startup, sales)
- API reference documentation

**Analysis** (`productivity/analysis/`)
- Research paper summarization with key findings extraction
- Competitor analysis with SWOT framework
- Market sizing and TAM/SAM/SOM breakdown
- Data interpretation and insight generation
- Literature review synthesis
- Survey result analysis

**Planning** (`productivity/planning/`)
- Project spec document generation
- Sprint planning and story point estimation
- OKR and KPI framework setup
- Risk assessment matrix construction
- Roadmap timeline creation
- Resource allocation planning

**Finance** (`productivity/finance/`)
- Financial model construction in tabular format
- Investor memo drafting
- Budget variance analysis
- Unit economics calculation (CAC, LTV, MRR)
- Cash flow projection

</details>

<details>
<summary><b>üé® Creative Skills ‚Äî What's Inside</b></summary>

**Design** (`creative/design/`)
- Design system token specification (colors, typography, spacing)
- Component UI brief writing for developers
- UX research interview script generation
- Figma component naming convention setup
- Brand identity guidelines documentation

**Marketing** (`creative/marketing/`)
- Landing page copy with CTA optimization
- Google/Meta ad copy variants (A/B sets)
- Social media calendar and content planning
- Email campaign sequence writing
- Product launch announcement drafting
- Brand voice guide creation

**Multimedia** (`creative/multimedia/`)
- YouTube video script with hook, body, CTA
- Podcast episode outline and question generation
- Midjourney/DALL-E prompt engineering
- Short-form video caption writing
- Thumbnail concept descriptions

</details>

---

## üîå Pillar 2 ‚Äî MCP Server Repository

> **`/mcps/`** ¬∑ 92 fully cloned Model Context Protocol server repositories across 11 categories ‚Äî all installable, all production-ready, connecting directly to Claude Desktop, Cursor, Windsurf, or any MCP-compatible client

<details>
<summary><b>üèõÔ∏è Official Anthropic (11 repos)</b></summary>

| Repo Folder | GitHub | Description |
|---|---|---|
| `servers` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Official MCP reference server implementations |
| `python-sdk` | [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | Python SDK for building MCP servers and clients |
| `typescript-sdk` | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | TypeScript/Node.js SDK |
| `java-sdk` | [modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk) | Java SDK for JVM-based MCP servers |
| `kotlin-sdk` | [modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk) | Kotlin SDK for Android/JVM |
| `csharp-sdk` | [modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk) | C# / .NET SDK |
| `rust-sdk` | [modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk) | Rust SDK for high-performance servers |
| `inspector` | [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) | Visual debugging tool for MCP servers |
| `specification` | [modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification) | Official MCP protocol specification |
| `docs` | [modelcontextprotocol/modelcontextprotocol.io](https://github.com/modelcontextprotocol/modelcontextprotocol.io) | Official documentation site |
| `create-typescript-server` | [modelcontextprotocol/create-typescript-server](https://github.com/modelcontextprotocol/create-typescript-server) | Scaffolder for new TS MCP servers |

</details>

<details>
<summary><b>üåê Browser Automation (4 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `playwright-mcp` | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | 12K+ | Microsoft's official Playwright MCP ‚Äî control any browser |
| `mcp-playwright` | [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | 800+ | Playwright test automation via MCP |
| `mcp-server-browserbase` | [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | 500+ | Cloud browser automation with Browserbase |
| `chrome-devtools-mcp` | [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) | 500+ | Access Chrome DevTools Protocol via MCP |

**Install any of these:**
```bash
cd mcps/browser_automation/playwright-mcp && npm install
```

</details>

<details>
<summary><b>üóÑÔ∏è Databases (9 repos)</b></summary>

| Repo Folder | GitHub | Stars | DB / Service |
|---|---|---|---|
| `supabase-mcp` | [supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp) | 1K+ | Supabase (PostgreSQL + Auth + Storage) |
| `mcp-snowflake-server` | [isaacwasserman/mcp-snowflake-server](https://github.com/isaacwasserman/mcp-snowflake-server) | 300+ | Snowflake data warehouse |
| `mcp-bigquery-server` | [ergut/mcp-bigquery-server](https://github.com/ergut/mcp-bigquery-server) | 200+ | Google BigQuery |
| `mcp-mongo-server` | [mongodb-developer/mcp-mongo-server](https://github.com/mongodb-developer/mcp-mongo-server) | 400+ | MongoDB document database |
| `mcp-redis` | [redis/mcp-redis](https://github.com/redis/mcp-redis) | 300+ | Redis key-value cache |
| `mcp-neo4j` | [neo4j-contrib/mcp-neo4j](https://github.com/neo4j-contrib/mcp-neo4j) | 200+ | Neo4j graph database |
| `mcp-clickhouse` | [ClickHouse/mcp-clickhouse](https://github.com/ClickHouse/mcp-clickhouse) | 150+ | ClickHouse analytics DB |
| `mcp-mysql-server` | Community | 100+ | MySQL database |
| `dbhub` | [bytebase/dbhub](https://github.com/bytebase/dbhub) | 400+ | Universal DB gateway (multi-DB support) |

</details>

<details>
<summary><b>‚òÅÔ∏è Cloud Platforms (3 repos)</b></summary>

| Repo Folder | GitHub | Stars | Platform |
|---|---|---|---|
| `aws-mcp-server` | [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) | 500+ | AWS ‚Äî EC2, S3, Lambda, IAM, CloudWatch |
| `kubernetes-mcp-server` | [manusa/kubernetes-mcp-server](https://github.com/manusa/kubernetes-mcp-server) | 300+ | Kubernetes cluster management (Java) |
| `mcp-k8s-go` | [strowk/mcp-k8s-go](https://github.com/strowk/mcp-k8s-go) | 400+ | Kubernetes management (Go, fast) |

</details>

<details>
<summary><b>üîç Search Engines (5 repos)</b></summary>

| Repo Folder | GitHub | Stars | Service |
|---|---|---|---|
| `exa-mcp-server` | [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) | 600+ | Exa ‚Äî AI-native semantic search |
| `tavily-mcp` | [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp) | 300+ | Tavily ‚Äî research-focused search API |
| `brave-search-mcp` | [nicholasgriffintn/mcp-server-brave-search](https://github.com/nicholasgriffintn/mcp-server-brave-search) | 200+ | Brave Search ‚Äî private web search |
| `serpapi-mcp-server` | Community | 100+ | SerpAPI ‚Äî Google/Bing/YouTube results |
| `actors-mcp-server` | [apify/actors-mcp-server](https://github.com/apify/actors-mcp-server) | 400+ | Apify ‚Äî web scraping actors as tools |

</details>

<details>
<summary><b>üí¨ Communication & Collaboration (1 repo)</b></summary>

| Repo Folder | GitHub | Stars | Service |
|---|---|---|---|
| `mcp-reddit` | [adhikasp/mcp-reddit](https://github.com/adhikasp/mcp-reddit) | 200+ | Reddit browsing, search, post retrieval |

</details>

<details>
<summary><b>üõ†Ô∏è Developer Tools (3 repos)</b></summary>

| Repo Folder | GitHub | Stars | What It Does |
|---|---|---|---|
| `mcp-filesystem-server` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | Read/write local files and directories |
| `mcp-server-commands` | [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) | 200+ | Run shell commands via MCP |
| `mcp-youtube` | [suekou/mcp-youtube](https://github.com/suekou/mcp-youtube) | 150+ | YouTube transcript and video data |

</details>

<details>
<summary><b>üìÅ Filesystem Servers (1 repo)</b></summary>

| Repo Folder | GitHub | Stars | What It Does |
|---|---|---|---|
| `mcp-filesystem-server` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | Full filesystem read/write, directory listing, file search |

</details>

<details>
<summary><b>üèóÔ∏è Frameworks & SDKs (9 repos)</b></summary>

| Repo Folder | GitHub | Stars | Language / Purpose |
|---|---|---|---|
| `python-sdk` | [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | 5K+ | Build MCP servers in Python |
| `typescript-sdk` | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | 5K+ | Build MCP servers in TypeScript |
| `java-sdk` | [modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk) | 500+ | Build MCP servers in Java |
| `kotlin-sdk` | [modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk) | 300+ | Build MCP servers in Kotlin |
| `csharp-sdk` | [modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk) | 400+ | Build MCP servers in C# |
| `rust-sdk` | [modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk) | 300+ | Build MCP servers in Rust |
| `mcp-agent` | [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | 500+ | Agent orchestration framework using MCP |
| `mcp-framework` | [QuantGeekDev/mcp-framework](https://github.com/QuantGeekDev/mcp-framework) | 300+ | Framework for building MCP servers quickly |
| `create-typescript-server` | [modelcontextprotocol/create-typescript-server](https://github.com/modelcontextprotocol/create-typescript-server) | 400+ | CLI scaffolder for new TypeScript MCP servers |

</details>

<details>
<summary><b>üìã Version Control & Git (5 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `github-mcp-server` | [github/github-mcp-server](https://github.com/github/github-mcp-server) | 5K+ | Official GitHub MCP ‚Äî PRs, issues, repos |
| `git-mcp` | [idosal/git-mcp](https://github.com/idosal/git-mcp) | 400+ | Git operations: commit, branch, diff, blame |
| `mcp-filesystem-server` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | File-level operations tied to git workflows |
| `mcp-package-docs` | [upstash/mcp-package-docs](https://github.com/upstash/mcp-package-docs) | 200+ | Fetch npm/PyPI package documentation |
| `mcp-server-commands` | [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) | 200+ | Run git commands as MCP tools |

</details>

<details>
<summary><b>üîí Security Tools (in misc_specialized)</b></summary>

| Repo Folder | Description |
|---|---|
| `keboola-mcp-server` | [keboola/keboola-mcp-server](https://github.com/keboola/keboola-mcp-server) ‚Äî Data pipeline and ETL operations |
| `actors-mcp-server` | Web scraping with Apify's 1,500+ ready actors |

</details>

<details>
<summary><b>üìö Registries & Curated Lists (2 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `awesome-mcp-list` | [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | 5K+ | Curated list of 500+ MCP servers |
| `mcpm` | [mcpm/mcpm](https://github.com/mcpm/mcpm) | 300+ | MCP package manager ‚Äî install servers like npm |

</details>

<details>
<summary><b>‚öôÔ∏è How to Connect an MCP Server</b></summary>

**1. Find the server you want:**
```bash
ls mcps/databases/          # List all database servers
ls mcps/browser_automation/ # List all browser servers
```

**2. Install it:**
```bash
cd mcps/databases/supabase-mcp
npm install          # or: pip install -e . / cargo build
```

**3. Add to Claude Desktop config** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": ["/path/to/mcps/databases/supabase-mcp/build/index.js"],
      "env": { "SUPABASE_URL": "...", "SUPABASE_KEY": "..." }
    }
  }
}
```

**4. Restart Claude Desktop** ‚Äî the tool appears automatically.

</details>

---

## ??? Pillar 3 ó IDE Context Rules

> **`/ide_rules/`** ∑ 2,200+ AI editor instruction files for Cursor, Windsurf, Cline, and GitHub Copilot ó covering every major language, framework, and tech stack

Drop one file into your project root and your AI editor instantly understands your architecture, coding conventions, testing standards, and style preferences. No more re-explaining the same context on every session.

<details>
<summary><b>?? How IDE Rules Work</b></summary>

| File Type | Compatible With | Where to Place |
|---|---|---|
| `.cursorrules` | Cursor IDE | Project root |
| `.mdc` files | Cursor (newer format) | `.cursor/rules/*.mdc` |
| `.clinerules` | Cline VS Code Extension | Project root |
| `.github/copilot-instructions.md` | GitHub Copilot | `.github/` folder |
| `SYSTEM_PROMPT.md` | Any AI chat | Use as system prompt |

</details>

<details>
<summary><b>?? Frontend Frameworks</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `react-typescript.cursorrules` | React + TypeScript | hooks-only patterns, strict types, no class components |
| `nextjs-app-router.cursorrules` | Next.js 14+ | App Router, RSC, server actions, metadata API |
| `nextjs-tailwind.mdc` | Next.js + Tailwind | utility-first, no custom CSS, mobile-first |
| `vue3-typescript.cursorrules` | Vue 3 + TS | Composition API, `<script setup>`, Pinia, Vite |
| `nuxt3.cursorrules` | Nuxt 3 | auto-imports, Nitro, composables, useAsyncData |
| `svelte5.cursorrules` | Svelte 5 | runes syntax, $state, $derived, $effect |
| `angular17.cursorrules` | Angular 17+ | standalone components, signals, new control flow |
| `remix.cursorrules` | Remix | loaders, actions, progressive enhancement |
| `astro.cursorrules` | Astro | island architecture, content collections, SSG |
| `solid-js.cursorrules` | SolidJS | fine-grained reactivity, no virtual DOM patterns |
| `qwik.cursorrules` | Qwik | resumability, lazy loading, o(1) optimization |

</details>

<details>
<summary><b>?? Backend Frameworks</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `python-fastapi.cursorrules` | FastAPI + Python | Pydantic v2, async/await, dependency injection |
| `python-django.cursorrules` | Django | ORM patterns, CBVs vs FBVs, signals |
| `python-flask.cursorrules` | Flask | blueprints, application factory pattern |
| `nodejs-express.cursorrules` | Node.js + Express | middleware chain, error handling, REST conventions |
| `nodejs-hono.cursorrules` | Hono (Edge) | edge-first, ultra-fast, Cloudflare Workers patterns |
| `go-gin.cursorrules` | Go + Gin | idiomatic Go, error propagation, zero-alloc patterns |
| `go-fiber.cursorrules` | Go + Fiber | FastHTTP, middleware, routing conventions |
| `rust-axum.cursorrules` | Rust + Axum | ownership patterns, tower middleware, async traits |
| `java-spring.cursorrules` | Spring Boot | DI, JPA, REST with proper HTTP semantics |
| `ruby-rails.cursorrules` | Ruby on Rails | convention over config, ActiveRecord, REST |
| `php-laravel.cursorrules` | Laravel | Eloquent, Blade, service providers |
| `elixir-phoenix.cursorrules` | Elixir + Phoenix | functional patterns, LiveView, contexts |

</details>

<details>
<summary><b>?? Mobile Development</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `react-native.cursorrules` | React Native | platform-specific code, performance, navigation |
| `expo.cursorrules` | Expo | managed workflow, EAS, expo-router |
| `flutter.cursorrules` | Flutter | widget tree, state management, null safety |
| `swift-swiftui.cursorrules` | Swift + SwiftUI | MVVM, Combine, async/await, ViewModels |
| `kotlin-android.cursorrules` | Kotlin Android | Coroutines, Jetpack, MVVM, Room |
| `ionic.cursorrules` | Ionic | hybrid app patterns, Capacitor plugins |

</details>

<details>
<summary><b>??? Database & Data</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `postgresql.cursorrules` | PostgreSQL | indexing strategy, EXPLAIN plans, CTEs |
| `prisma.cursorrules` | Prisma ORM | schema design, migrations, query optimization |
| `drizzle.cursorrules` | Drizzle ORM | type-safe queries, schema-first, edge-compatible |
| `mongodb.cursorrules` | MongoDB | schema design, aggregation, indexing |
| `redis.cursorrules` | Redis | caching patterns, data structures, TTL strategy |
| `supabase.cursorrules` | Supabase | RLS policies, Edge Functions, realtime |
| `firebase.cursorrules` | Firebase | Firestore rules, Cloud Functions, Auth |
| `planetscale.cursorrules` | PlanetScale | branching model, Vitess, non-blocking schema |

</details>

<details>
<summary><b>?? AI / ML Engineering</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `langchain.cursorrules` | LangChain | LCEL, chains, agents, memory patterns |
| `langgraph.cursorrules` | LangGraph | stateful agents, graph nodes, human-in-loop |
| `llamaindex.cursorrules` | LlamaIndex | RAG pipelines, indices, query engines |
| `openai-api.cursorrules` | OpenAI SDK | streaming, function calling, token management |
| `anthropic-api.cursorrules` | Anthropic SDK | tool use, streaming, prompt caching |
| `huggingface.cursorrules` | HuggingFace | transformers, datasets, PEFT, inference |
| `mlflow.cursorrules` | MLflow | experiment tracking, model registry, serving |
| `pytorch.cursorrules` | PyTorch | tensor ops, training loops, CUDA, DataLoaders |

</details>

<details>
<summary><b>?? DevOps & Infrastructure</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `dockerfile.cursorrules` | Docker | multi-stage builds, layer caching, non-root users |
| `kubernetes.cursorrules` | Kubernetes | resource limits, probes, RBAC, network policies |
| `terraform.cursorrules` | Terraform | modules, state management, naming conventions |
| `github-actions.cursorrules` | GitHub Actions | workflow reuse, secrets, matrix builds, caching |
| `ansible.cursorrules` | Ansible | idempotency, roles, vault, inventory |
| `helm.cursorrules` | Helm | chart structure, values hierarchy, templating |
| `pulumi.cursorrules` | Pulumi | IaC in Python/TS, stack management |
| `aws-cdk.cursorrules` | AWS CDK | constructs, stacks, cross-account patterns |

</details>

<details>
<summary><b>?? Security & Testing</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `security-code-review.cursorrules` | Any language | OWASP Top 10, injection, auth flaws, crypto |
| `jest.cursorrules` | Jest | test patterns, mocking, coverage targets |
| `vitest.cursorrules` | Vitest | fast unit tests, msw, component testing |
| `playwright-tests.cursorrules` | Playwright | E2E patterns, fixtures, page object model |
| `cypress.cursorrules` | Cypress | component vs E2E, custom commands, CI integration |
| `pytest.cursorrules` | pytest | fixtures, parametrize, conftest, factories |

</details>

<details>
<summary><b>??? How to Use Any Rule</b></summary>

```bash
# 1. Find your stack
ls ide_rules/cursor/ | grep -i next

# 2. Copy to your project
cp ide_rules/cursor/nextjs-app-router.cursorrules /your-project/.cursorrules

# 3. Open Cursor ? AI is instantly context-aware

# For newer Cursor MDC format:
mkdir -p /your-project/.cursor/rules
cp ide_rules/cursor/nextjs-app-router.mdc /your-project/.cursor/rules/

# For GitHub Copilot:
cp ide_rules/copilot/nextjs.md /your-project/.github/copilot-instructions.md
```

</details>

---

## ?? Pillar 4 ó System Prompts & Frameworks

> **`/system_prompts/`** ∑ 30+ repositories spanning leaked production system prompts, prompt engineering masterclasses, prompt management tools, testing frameworks, and AI safety guardrails

<details>
<summary><b>?? Official Sources</b></summary>

| Folder | Repository | Stars | What's Inside |
|---|---|---|---|
| `official_sources` | Multiple | ó | Direct prompt engineering guidelines from Anthropic, OpenAI, and Google ó the official internal docs they use themselves |

</details>

<details>
<summary><b>?? Leaked System Prompts Collections</b></summary>

| Folder | Repository | Stars | What's Inside |
|---|---|---|---|
| `system-prompts-and-models-of-ai-tools` | [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | **111K+** | Claude Code, Cursor, Windsurf, Devin, v0, Perplexity, Notion AI, Vercel AI, Manus, GitHub Copilot, Lovable, Bolt |
| `thebigpromptlibrary` | [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) | 5K+ | Massive curated library of GPT and Claude system prompts organized by category and use case |
| `chatgpt_system_prompt` | [LouisShark/chatgpt_system_prompt](https://github.com/LouisShark/chatgpt_system_prompt) | 8K+ | Hundreds of leaked ChatGPT custom GPT instructions |

**What you get from the 111K-star repo:**
<details>
<summary>Leaked prompts included</summary>

| Tool | What's Leaked |
|---|---|
| **Claude Code** | Full system prompt, tool definitions, code execution sandbox behavior |
| **Cursor** | Complete system prompt explaining codebase reasoning, tool calling patterns |
| **Windsurf / Cascade** | Full cascade agent prompt with multi-file editing instructions |
| **Devin** | Software engineering agent prompt with planning and execution steps |
| **v0 (Vercel)** | UI generation prompt with component library preferences |
| **Perplexity** | Search + citation generation prompt |
| **Notion AI** | Document editing and generation prompt |
| **GitHub Copilot** | Code completion system behavior |
| **Lovable** | Full-stack app generation prompt |
| **Bolt.new** | Web app generation prompt with constraints |
| **Manus** | The autonomous AI agent's full system prompt |

</details>

</details>

<details>
<summary><b>?? Prompt Engineering Guides (3 repos)</b></summary>

| Folder | Repository | Stars | Content |
|---|---|---|---|
| `awesome-chatgpt-prompts` | [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | **115K+** | 157 expert role prompts: Linux Terminal, JavaScript Console, SQL Terminal, Financial Advisor, Career Counselor, Personal Trainer, Mental Health Advisor, and more |
| `awesome-aipromptlib` | Community | 5K+ | Curated prompt patterns for specific use cases |
| `Prompt_Engineering` | [NirDiamant/Prompt_Engineering](https://github.com/NirDiamant/Prompt_Engineering) | 8K+ | 22 hands-on Jupyter tutorials: zero-shot, few-shot, CoT, self-consistency, ReAct, ToT, and meta-prompting |

**The 115K-star book of prompts covers these roles:**
<details>
<summary>All 157 expert role prompts</summary>

`Linux Terminal` ∑ `English Translator` ∑ `Position Interviewer` ∑ `JavaScript Console` ∑ `Excel Sheet` ∑ `English Pronunciation Helper` ∑ `Spoken English Teacher` ∑ `Travel Guide` ∑ `Plagiarism Checker` ∑ `Character from Movie/Book/Anything` ∑ `Advertiser` ∑ `Storyteller` ∑ `Football Commentator` ∑ `Stand-up Comedian` ∑ `Motivational Coach` ∑ `Composer` ∑ `Debater` ∑ `Debate Coach` ∑ `Screenwriter` ∑ `Novel Writer` ∑ `Movie Critic` ∑ `Relationship Coach` ∑ `Poet` ∑ `Rapper` ∑ `Motivational Speaker` ∑ `Philosophy Teacher` ∑ `Philosopher` ∑ `Math Teacher` ∑ `AI Writing Tutor` ∑ `UX/UI Developer` ∑ `Cyber Security Specialist` ∑ `Recruiter` ∑ `Life Coach` ∑ `Etymologist` ∑ `Comment Improver` ∑ `Magician` ∑ `Career Counselor` ∑ `Pet Behaviorist` ∑ `Personal Trainer` ∑ `Mental Health Adviser` ∑ `Real Estate Agent` ∑ `Logistician` ∑ `Dentist` ∑ `Web Design Consultant` ∑ `AI Doctor` ∑ `Accountant` ∑ `Chef` ∑ `Automobile Mechanic` ∑ `Artist Advisor` ∑ `Financial Analyst` ∑ `Investment Manager` ∑ `Tea-Taster` ∑ `Interior Decorator` ∑ `Florist` ∑ `Self-Help Book` ∑ `Gnomist` ∑ `Aphorism Book` ∑ `Text Based Adventure Game` ∑ `AI Trying to Escape the Box` ∑ `Fancy Title Generator` ∑ `Statistician` ∑ `Prompt Generator` ∑ `Instructor in a School` ∑ `SQL terminal` ∑ `Dietitian` ∑ `Psychologist` ∑ `Smart Domain Name Generator` ∑ `Tech Reviewer` ∑ `Developer Relations Consultant` ∑ `Academician` ∑ `IT Architect` ∑ `Lunatic` ∑ `Gaslighter` ∑ `Fallacy Finder` ∑ `Journal Reviewer` ∑ `DIY Expert` ∑ `Social Media Influencer` ∑ `Socrat` ∑ `Socratic Method prompt` ∑ `Educational Content Creator` ∑ `Yogi` ∑ `Essay Writer` ∑ `Social Media Manager` ∑ `Elocutionist` ∑ `Scientific Data Visualizer` ∑ `Car Navigation System` ∑ `Hypnotherapist` ∑ `Historian` ∑ `Astrologer` ∑ `Film Critic` ∑ `Classical Music Composer` ∑ `Journalist` ∑ `Digital Art Gallery Guide` ∑ `Public Speaking Coach` ∑ `Makeup Artist` ∑ `Babysitter` ∑ `Tech Writer` ∑ `Ascii Artist` ∑ `Python interpreter` ∑ `Synonym finder` ∑ `Personal Shopper` ∑ `Food Critic` ∑ `Virtual Doctor` ∑ `Personal Chef` ∑ `Legal Advisor` ∑ `Personal Stylist` ∑ `Machine Learning Engineer` ∑ `Biblical Translator` ∑ `SVG designer` ∑ `IT Expert` ∑ `Chess Player` ∑ `Midjourney Prompt Generator` ∑ `Fullstack Software Developer` ∑ `Mathematician` ∑ `Regex Generator` ∑ `Time Travel Guide` ∑ `Dream Interpreter` ∑ `Talent Coach` ∑ `R programming Interpreter` ∑ `StackOverflow Post` ∑ `Emoji Translator` ∑ `PHP Interpreter` ∑ `Emergency Response Professional` ∑ `Fill in the Blank Worksheet Generator` ∑ `Software Quality Assurance Tester` ∑ `Tic-Tac-Toe Game` ∑ `Password Generator` ∑ `New Language Creator` ∑ `Web Browser` ∑ `Senior Frontend Developer` ∑ `Solr Search Engine` ∑ `Startup Idea Generator` ∑ `Spongebob's Magic Conch Shell` ∑ `Language Detector` ∑ `Salesperson` ∑ `Commit Message Generator` ∑ `Chief Executive Officer` ∑ `Diagram Generator` ∑ `Speech-Language Pathologist` ∑ `Startup Tech Lawyer` ∑ `Title Generator for written pieces` ∑ `Product Manager` ∑ `Drunk Person` ∑ `Mathematical History Teacher` ∑ `Song Recommender` ∑ `Cover Letter` ∑ `Technology Transferer` ∑ `Unconstrained AI model` ∑ `Gomoku player` ∑ `Proofreader` ∑ `Buddha` ∑ `Muslim Imam`

</details>

</details>

<details>
<summary><b>?? Prompt Testing & Evaluation (3 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `promptfoo` | [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | 5K+ | Run automated test suites against your prompts. Compare model outputs, catch regressions, grade responses. CLI + YAML config |
| `helicone` | [helicone/helicone](https://github.com/helicone/helicone) | 2K+ | Open-source LLM observability: request logging, cost tracking, latency monitoring, prompt versioning |
| `langfuse` | [langfuse/langfuse](https://github.com/langfuse/langfuse) | 7K+ | Complete LLM engineering platform: traces, evaluations, prompt management, datasets |

**promptfoo example config:**
```yaml
prompts:
  - "Summarize this in 3 bullets: {{text}}"
providers:
  - openai:gpt-4o-mini
  - anthropic:claude-3-haiku-20240307
tests:
  - vars:
      text: "The quick brown fox..."
    assert:
      - type: contains
        value: "fox"
```

</details>

<details>
<summary><b>??? Safety & Guardrails (3 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `NeMo-Guardrails` | [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) | 4K+ | NVIDIA's toolkit for adding programmable guardrails to LLM apps. Topic avoidance, jailbreak resistance, output moderation via Colang DSL |
| `guardrails` | [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) | 4K+ | Validate and fix LLM outputs against schemas. Type checking, format enforcement, re-asking on failure |
| `rebuff` | [protectai/rebuff](https://github.com/protectai/rebuff) | 1K+ | Self-hardening prompt injection detector. Heuristics + LLM-based + vector DB detection |

**Guardrails example:**
```python
from guardrails import Guard
from guardrails.hub import ValidLength, ValidJson

guard = Guard().use_many(
    ValidLength(min=10, max=500),
    ValidJson()
)
raw_llm_output = llm.generate(prompt)
validated = guard.validate(raw_llm_output)
```

</details>

---

## ?? Pillar 5 ó AI API Providers Reference

> **`/api_providers/`** ∑ Complete offline reference for 12 AI API providers: every model listed, full pricing tables, SDK install commands, and code examples ó no browser needed

<details>
<summary><b>?? Category Champions ó Who Wins What</b></summary>

| Category | Winner | Price / Notes | Runner Up |
|---|---|---|---|
| ?? **Cheapest Input** | DeepSeek V3 | $0.28/M tokens | Gemini 2.5 Flash-Lite ($0.10/M on scale) |
| ?? **Best Free Tier** | DeepSeek | 5M free tokens/month | Google Gemini (1,500 req/day free) |
| ?? **Largest Context** | xAI Grok | 2M token window | OpenAI GPT-4.1, Claude Opus, Gemini 2.5 (all 1M) |
| ?? **Fastest Inference** | Groq | 1,000+ tokens/sec | Fireworks AI / Together AI |
| ?? **Best Reasoning** | Claude Opus 4.6 / o3 | ó | DeepSeek R1 (10x cheaper) |
| ?? **Best Coding** | Claude 3.5 Sonnet / GPT-4.1 | ó | DeepSeek V3 (cheapest that codes well) |
| ?? **Best Multimodal** | Gemini 2.5 Pro | Images+audio+video | GPT-4o |
| ?? **Best EU / Privacy** | Mistral AI | EU data residency | Google Gemini (EU region) |
| ?? **Best Embeddings** | Cohere Embed 4 | $0.12/M | OpenAI text-embedding-3-small |
| ?? **Best Self-Hosted** | Meta Llama 4 | Free open weights | Mistral (open-weight) |
| ?? **Best for Agents** | Claude 3.5 Sonnet | Tool use quality | GPT-4o |
| ?? **Best Cost/Quality** | DeepSeek V3 | $0.28/M, GPT-4 level | Gemini 2.5 Flash ($0.15/M) |

</details>

<details>
<summary><b>?? OpenAI ó All Models & Pricing</b></summary>

**SDK:** `pip install openai` / `npm install openai`
**Base URL:** `https://api.openai.com/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `gpt-4.1` | $2.00 | $8.00 | 1M | Best overall coding + reasoning |
| `gpt-4.1-mini` | $0.40 | $1.60 | 1M | Balanced cost/quality |
| `gpt-4.1-nano` | $0.10 | $0.40 | 1M | High-volume, simple tasks |
| `gpt-4o` | $2.50 | $10.00 | 128K | Multimodal (images, audio) |
| `gpt-4o-mini` | $0.15 | $0.60 | 128K | Fast + cheap, most popular |
| `o3` | $2.00 | $8.00 | 200K | Extended reasoning chains |
| `o4-mini` | $1.10 | $4.40 | 200K | Fast reasoning, cheap |
| `text-embedding-3-small` | $0.02 | ó | 8K | Cheap embeddings |
| `text-embedding-3-large` | $0.13 | ó | 8K | High-quality embeddings |

```python
from openai import OpenAI
client = OpenAI(api_key="sk-...")
r = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role":"user","content":"Hello"}])
print(r.choices[0].message.content)
```

</details>

<details>
<summary><b>?? Anthropic Claude ó All Models & Pricing</b></summary>

**SDK:** `pip install anthropic` / `npm install @anthropic-ai/sdk`
**Base URL:** `https://api.anthropic.com`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `claude-opus-4-6` | $5.00 | $25.00 | 1M | Hardest reasoning, research |
| `claude-sonnet-3-7` | $3.00 | $15.00 | 1M | Best agent / tool use |
| `claude-sonnet-3-5` | $3.00 | $15.00 | 200K | Best coding, daily driver |
| `claude-haiku-4-5` | $1.00 | $5.00 | 1M | Fast + affordable |
| `claude-haiku-3-5` | $0.80 | $4.00 | 200K | High-volume tasks |

**Unique feature ó Prompt Caching:**
```python
import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[{"type": "text", "text": "You are...", "cache_control": {"type": "ephemeral"}}],
    messages=[{"role": "user", "content": "Hello"}]
)
# Cached tokens cost 90% less on repeat requests
```

</details>

<details>
<summary><b>? Google Gemini ó All Models & Pricing</b></summary>

**SDK:** `pip install google-generativeai` / `npm install @google/generative-ai`
**Base URL:** `https://generativelanguage.googleapis.com`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `gemini-2.5-pro` | $1.25 | $10.00 | 1M | Best multimodal, 1M context |
| `gemini-2.5-flash` | $0.15 | $0.60 | 1M | Speed + budget balance |
| `gemini-2.5-flash-lite` | $0.10 | $0.40 | 1M | Cheapest capable model |
| `gemini-1.5-pro` | $1.25 | $5.00 | 2M | Legacy, 2M context window |
| `gemini-1.5-flash` | $0.075 | $0.30 | 1M | Legacy fast model |
| `text-embedding-004` | Free | ó | 2K | High-quality embeddings, free |

**Free Tier (no credit card):** 1,500 requests/day on Flash models

```python
import google.generativeai as genai
genai.configure(api_key="AIza...")
model = genai.GenerativeModel("gemini-2.5-flash")
response = model.generate_content("Hello, world!")
print(response.text)
```

</details>

<details>
<summary><b>?? DeepSeek ó All Models & Pricing</b></summary>

**SDK:** OpenAI-compatible (`pip install openai`)
**Base URL:** `https://api.deepseek.com/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `deepseek-chat` (V3) | $0.28 | $1.10 | 128K | **Best value for money. GPT-4 quality at 1/10 the cost** |
| `deepseek-reasoner` (R1) | $0.55 | $2.19 | 128K | Reasoning chains, math, logic |

**Free tier:** 5M tokens/month. No credit card needed.

```python
from openai import OpenAI
client = OpenAI(api_key="sk-...", base_url="https://api.deepseek.com/v1")
r = client.chat.completions.create(model="deepseek-chat", messages=[{"role":"user","content":"Hello"}])
print(r.choices[0].message.content)
```

</details>

<details>
<summary><b>? xAI Grok ó All Models & Pricing</b></summary>

**SDK:** OpenAI-compatible (`pip install openai`)
**Base URL:** `https://api.x.ai/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `grok-4` | $3.00 | $15.00 | **2M** | Largest public context window |
| `grok-4.1` | $2.00 | $10.00 | **2M** | Long document analysis |
| `grok-4.1-fast` | $0.20 | $0.80 | 128K | Fast, cheap Grok |
| `grok-4.1-mini` | $0.10 | $0.50 | 128K | Ultra-cheap |

**Free tier:** $25 credit on signup.

</details>

<details>
<summary><b>???? Mistral AI ó All Models & Pricing</b></summary>

**SDK:** `pip install mistralai` / OpenAI-compatible
**Base URL:** `https://api.mistral.ai/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `mistral-large-latest` | $2.00 | $6.00 | 128K | Best Mistral quality |
| `mistral-small-latest` | $0.20 | $0.60 | 128K | Budget, multilingual |
| `codestral-latest` | $0.30 | $0.90 | 256K | Code generation specialist |
| `mistral-embed` | $0.10 | ó | 8K | Embeddings |
| `pixtral-large` | $2.00 | $6.00 | 128K | Multimodal (vision) |

**EU advantage:** Data stays in EU datacenters. GDPR compliant.

</details>

<details>
<summary><b>?? Cohere ó All Models & Pricing</b></summary>

**SDK:** `pip install cohere`
**Base URL:** `https://api.cohere.ai/v2`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `command-r-plus` | $2.50 | $10.00 | 128K | Long context, enterprise RAG |
| `command-r` | $0.15 | $0.60 | 128K | Balanced RAG |
| `command-r7b` | $0.04 | $0.15 | 128K | **Cheapest capable model** |
| `embed-v4.0` | $0.12 | ó | varied | Best-in-class embeddings |
| `rerank-v3.5` | $2.00/1K queries | ó | ó | RAG reranking |

**Free tier:** 1,000 API calls/month.

</details>

<details>
<summary><b>? Groq ó All Models & Pricing</b></summary>

**SDK:** OpenAI-compatible (`pip install groq`)
**Base URL:** `https://api.groq.com/openai/v1`

| Model | Input $/1M | Output $/1M | Speed | Context |
|---|---|---|---|---|
| `llama-4-maverick` | $0.50 | $0.77 | 800 tok/s | 128K |
| `llama-4-scout` | $0.11 | $0.34 | **1,000+ tok/s** | 128K |
| `llama-3.3-70b` | $0.59 | $0.79 | 700 tok/s | 128K |
| `llama-3.1-8b` | $0.05 | $0.08 | **1,200 tok/s** | 128K |
| `deepseek-r1` | $0.75 | $0.99 | 500 tok/s | 128K |
| `qwen-qwq-32b` | $0.29 | $0.39 | 600 tok/s | 128K |
| `whisper-large-v3` | $0.111/hr | ó | Fastest STT | Audio |

**Real-time use case:** Groq is the go-to for anything needing human-speed responses ó voice apps, real-time agents, streaming UIs.

</details>

<details>
<summary><b>?? OpenRouter ó 300+ Models, One API Key</b></summary>

**SDK:** OpenAI-compatible
**Base URL:** `https://openrouter.ai/api/v1`

Route to any model from a single API key and endpoint. Auto-fallback, load balancing, unified billing.

| Category | Top Models Available |
|---|---|
| **Top Tier** | Claude Opus, GPT-4o, Gemini 2.5 Pro, Grok 4 |
| **Mid Tier** | Claude Sonnet, GPT-4o-mini, Gemini Flash |
| **Budget** | DeepSeek V3, Llama 4, Mistral Small, Qwen |
| **Free** | 50+ free models (rate limited) |
| **Vision** | GPT-4o, Claude Sonnet, Gemini Pro, Pixtral |
| **Coding** | DeepSeek V3, Claude Sonnet, GPT-4.1 |

**Free models (no cost, rate-limited):** `meta-llama/llama-3.3-70b-instruct:free`, `deepseek/deepseek-r1:free`, `qwen/qwen3-235b-a22b:free`, and 47 more.

```python
from openai import OpenAI
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key="sk-or-...")
r = client.chat.completions.create(model="anthropic/claude-3.5-sonnet", messages=[...])
```

</details>

<details>
<summary><b>?? Azure OpenAI ó Enterprise Pricing</b></summary>

**SDK:** `pip install openai` (same SDK, different base URL)

| Model | Input $/1M | Output $/1M | Context | Enterprise Feature |
|---|---|---|---|---|
| `gpt-4o` | $2.50 | $10.00 | 128K | Private deployment |
| `gpt-4o-mini` | $0.15 | $0.60 | 128K | High throughput quotas |
| `o1` | $15.00 | $60.00 | 200K | Compliance + audit logs |
| `text-embedding-3-large` | $0.13 | ó | 8K | VNET isolation |

**Use when:** HIPAA/SOC2 compliance required, data must stay in your Azure tenant.

</details>

<details>
<summary><b>??? AWS Bedrock ó Pay-Per-Token, No Commitment</b></summary>

**SDK:** `pip install boto3`

| Model | Input $/1M | Output $/1M | Context |
|---|---|---|---|
| `amazon.nova-lite` | $0.06 | $0.24 | 300K |
| `amazon.nova-pro` | $0.80 | $3.20 | 300K |
| `anthropic.claude-3-5-sonnet` | $3.00 | $15.00 | 200K |
| `meta.llama3-70b` | $0.99 | $0.99 | 128K |
| `mistral.mistral-large-2402` | $4.00 | $12.00 | 32K |

**Use when:** Already on AWS, want unified IAM for LLM access, need VPC isolation.

</details>

<details>
<summary><b>?? Meta Llama ó Free Forever (Self-Host)</b></summary>

**License:** Llama Community License (free for commercial use under 700M users)
**Download:** `pip install huggingface_hub` ? `huggingface-cli download meta-llama/Llama-4-Scout`

| Model | Parameters | VRAM Required | Context |
|---|---|---|---|
| `Llama-3.2-1B` | 1B | 2 GB | 128K |
| `Llama-3.2-3B` | 3B | 4 GB | 128K |
| `Llama-3.1-8B` | 8B | 8 GB | 128K |
| `Llama-3.3-70B` | 70B | 40 GB | 128K |
| `Llama-4-Scout` | 17B active (109B MoE) | 24 GB | 10M |
| `Llama-4-Maverick` | 17B active (400B MoE) | 80 GB | 1M |

**Run locally with Ollama:**
```bash
ollama run llama3.3:70b   # Auto-downloads, runs inference
```

</details>

<details>
<summary><b>?? Full API Reference Files</b></summary>

Each provider has a dedicated markdown file in `/api_providers/`:

| File | Contents |
|---|---|
| `major_cloud_providers/OpenAI.md` | All models, pricing, rate limits, endpoints, code examples |
| `major_cloud_providers/Anthropic.md` | Claude models, tool use, caching, streaming |
| `major_cloud_providers/Gemini.md` | All Gemini models, multimodal, free tier details |
| `major_cloud_providers/DeepSeek.md` | V3 and R1 full breakdown |
| `major_cloud_providers/Grok.md` | xAI models and 2M context window details |
| `major_cloud_providers/Mistral.md` | EU-hosted options, codestral, embedding |
| `major_cloud_providers/Cohere.md` | RAG-specialized, reranking, embed v4 |
| `major_cloud_providers/Groq.md` | Speed benchmarks, all supported models |
| `unified_api_platforms/OpenRouter.md` | 300+ model catalogue, free tier list |
| `cloud_provider_ai_services/Azure_OpenAI.md` | Enterprise compliance, PTU pricing |
| `cloud_provider_ai_services/AWS_Bedrock.md` | IAM setup, on-demand vs provisioned |
| `open_source_models/Meta_Llama.md` | Download links, hardware requirements |
| `_COMPARISON.md` | Side-by-side winner table for every category |

</details>

---

## ?? Pillar 6 ó No-Code & Visual Workflow Builders

> **`/nocode_platforms/`** ∑ 15 fully cloned repositories across 5 categories ó AI workflow builders, low-code internal tools, n8n templates, Flowise tools, and additional platforms

<details>
<summary><b>?? AI Workflow Automation Platforms (7 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `n8n` | [n8n-io/n8n](https://github.com/n8n-io/n8n) | **181K+** | The most popular open-source workflow automation platform. 400+ integrations including every major AI model, database, communication tool. Node-based visual builder. Self-hostable with Docker in minutes. |
| `dify` | [langgenius/dify](https://github.com/langgenius/dify) | **135K+** | Full-stack LLMOps platform. Visual workflow builder with native RAG pipeline, 50+ model provider integrations, dataset management, monitoring, and one-click API deployment. |
| `langflow` | [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | **146K+** | Drag-and-drop builder for LangChain applications. Build RAG apps, chatbots, and multi-agent systems visually. Exports to production Python code. |
| `Flowise` | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | **51K+** | Visual LangChain + AI agent builder. 100+ pre-built integrations. Chatflow and agentflow modes. Embedded chatbot widget. |
| `activepieces` | [activepieces/activepieces](https://github.com/activepieces/activepieces) | **21K+** | AI Agents + MCP + automation. Zapier/Make alternative. 280+ integrations. Fully self-hostable. |
| `trigger_dev` | [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) | **14K+** | Developer-first background job platform. Runs long AI tasks (minutes/hours), webhooks, schedules. Perfect for AI pipelines. |
| `windmill` | [windmill-labs/windmill](https://github.com/windmill-labs/windmill) | **16K+** | 13x faster than Airflow. Scripts in Python/TS/Go/Bash. Visual DAG builder. Internal tool builder. Retool alternative. |

</details>

<details>
<summary><b>?? Low-Code Internal Tools (4 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `appsmith` | [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | **39K+** | Build internal tools, admin panels, dashboards. 25+ database integrations. AI agent actions. Drag-and-drop UI builder with full JavaScript customization. |
| `ToolJet` | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | **37K+** | AI-native low-code platform. Connect to databases, APIs, cloud storage. Build business dashboards with 50+ UI components. |
| `budibase` | [Budibase/budibase](https://github.com/Budibase/budibase) | **27K+** | Build internal tools with AI agents. Model-agnostic. PostgreSQL, MySQL, REST APIs, S3. Automation workflows. |
| `nocodb` | [nocodb/nocodb](https://github.com/nocodb/nocodb) | **62K+** | Turn any database into a smart spreadsheet. Airtable replacement. REST + GraphQL API auto-generated. Row-level permissions. |

</details>

<details>
<summary><b>?? n8n Templates & Resources (3 repos)</b></summary>

| Folder | Repository | Stars | What's Inside |
|---|---|---|---|
| `awesome-n8n-templates` | [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) | **19K+** | 280+ hand-picked n8n workflow templates organized by integration. Import-ready JSON files. |
| `AI-Workflow-Hub-2000-` | [emretasss/AI-Workflow-Hub-2000-](https://github.com/emretasss/AI-Workflow-Hub-2000-) | 1.5K+ | **2,000+ free n8n AI automation workflows** covering every use case imaginable |
| `n8n-hosting` | [n8n-io/n8n-hosting](https://github.com/n8n-io/n8n-hosting) | 1.5K+ | Official Docker Compose + Kubernetes Helm configs for self-hosting n8n in production |

**Sample workflow categories in the 2,000+ collection:**
<details>
<summary>What workflows are available</summary>

`Gmail automation` ∑ `Slack notifications` ∑ `Telegram bots` ∑ `WhatsApp messaging` ∑ `OpenAI integration` ∑ `Claude integration` ∑ `Google Sheets sync` ∑ `Notion database updates` ∑ `Airtable automation` ∑ `Shopify order processing` ∑ `Stripe payment events` ∑ `GitHub PR notifications` ∑ `Jira ticket creation` ∑ `Linear issue sync` ∑ `Calendly booking` ∑ `Typeform responses` ∑ `HubSpot CRM updates` ∑ `Salesforce sync` ∑ `Twitter/X monitoring` ∑ `Reddit monitoring` ∑ `RSS feed processing` ∑ `PDF extraction` ∑ `Image generation` ∑ `Voice transcription` ∑ `Email classification` ∑ `Lead enrichment` ∑ `Invoice processing` ∑ `Bug triage` ∑ `Deploy notifications` ∑ `SEO monitoring` ∑ `Competitor tracking` ∑ `News aggregation` ∑ `Social media scheduling` ∑ `Customer support routing` ∑ `Data pipeline ETL` and 1,960+ more

</details>

</details>

<details>
<summary><b>?? Flowise Related Tools (2 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `FlowiseDocs` | [FlowiseAI/FlowiseDocs](https://github.com/FlowiseAI/FlowiseDocs) | 249+ | Complete Flowise documentation ó API reference, deployment guides, integration tutorials |
| `flowise-to-langchain` | [iaminawe/flowise-to-langchain](https://github.com/iaminawe/flowise-to-langchain) | 1.5K+ | Convert Flowise visual flows to production LangChain Python code |

</details>

<details>
<summary><b>?? Dify Related Tools (2 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `dify-docs` | [langgenius/dify-docs](https://github.com/langgenius/dify-docs) | 147+ | Complete Dify documentation offline ó API specs, workflow builder guide, RAG setup |
| `dify-helm` | [BorisPolonsky/dify-helm](https://github.com/BorisPolonsky/dify-helm) | 850+ | Production-grade Kubernetes Helm chart for deploying Dify at scale |

</details>

<details>
<summary><b>?? Additional No-Code Platforms (4 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `directus` | [directus/directus](https://github.com/directus/directus) | **34K+** | Instant REST+GraphQL API for any SQL database. Headless CMS. Admin UI auto-generated from schema. |
| `hoppscotch` | [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch) | **78K+** | Open-source Postman/Insomnia alternative. Test REST, GraphQL, WebSocket, gRPC, MQTT APIs. Lightweight and fast. |
| `plane` | [makeplane/plane](https://github.com/makeplane/plane) | **35K+** | Open-source Jira / Linear alternative. Issues, cycles, modules, analytics. Self-hostable. |
| `rowy` | [rowyio/rowy](https://github.com/rowyio/rowy) | **6.8K+** | Airtable-like UI for Firestore. Spreadsheet for your database with Cloud Functions automation. |

</details>

<details>
<summary><b>?? Platform Feature Comparison Matrix</b></summary>

| Feature | n8n | Dify | Flowise | Langflow | Activepieces | Windmill |
|---|---|---|---|---|---|---|
| **Visual Builder** | ? | ? | ? | ? | ? | ? |
| **Self-Hostable** | ? | ? | ? | ? | ? | ? |
| **Native LLM/AI** | ? | ? | ? | ? | ? | ? |
| **Built-in RAG** | ?? | ? | ? | ? | ? | ? |
| **Multi-Agent** | ? | ? | ? | ? | ? | ? |
| **Webhook triggers** | ? | ? | ? | ? | ? | ? |
| **HTTP integrations** | ? 400+ | ? 50+ | ? 100+ | ? 50+ | ? 280+ | ? |
| **Code execution** | ? JS/Python | ? Python | ?? | ?? | ? | ? all langs |
| **API generation** | ? | ? | ? | ? | ? | ? |
| **Embedded chatbot** | ? | ? | ? | ? | ? | ? |
| **License** | Fair-code | Apache 2.0 | Apache 2.0 | MIT | MIT | AGPL-3.0 |
| **GitHub Stars** | 181K | 135K | 51K | 146K | 21K | 16K |

</details>

---

## ?? Pillar 7 ó Public APIs Directory

> **`/public_apis/`** ∑ Auto-synced local mirror of [public-apis/public-apis](https://github.com/public-apis/public-apis) (320K+ ?) ó The single most-starred curated list repo on all of GitHub. 1,400+ free public APIs organized by category, updated daily.

<details>
<summary><b>?? Animals</b></summary>

| API | Description | Auth |
|---|---|---|
| Dog CEO | Random dog images by breed | None |
| TheCatAPI | Cat images + breeds + facts | API Key |
| RandomFox | Random fox images | None |
| HTTP Cat | Cat image for every HTTP status code | None |
| Animals | Animals facts and images | API Key |
| Axoltl | Axoltl facts and images | None |

</details>

<details>
<summary><b>?? Anime & Manga</b></summary>

| API | Description | Auth |
|---|---|---|
| Jikan | Unofficial MyAnimeList API ó anime, manga, characters | None |
| AniList | Modern anime/manga database with GraphQL API | OAuth |
| Waifu.pics | Random anime images by category | None |
| Kitsu | Anime and manga database | OAuth |
| MangaDex | Manga reading API | OAuth |
| Trace.moe | Identify anime from screenshots | None |

</details>

<details>
<summary><b>?? Anti-Malware & Security APIs</b></summary>

| API | Description | Auth |
|---|---|---|
| AbuseIPDB | IP reputation and abuse reports | API Key |
| VirusTotal | Scan files and URLs for malware | API Key |
| URLhaus | Database of malicious URLs | API Key |
| Shodan | Search exposed devices and ports | API Key |
| Have I Been Pwned | Check if email was in a data breach | API Key |
| Cloudmersive Virus Scan | Antivirus scanning API | API Key |

</details>

<details>
<summary><b>?? Art & Design</b></summary>

| API | Description | Auth |
|---|---|---|
| Metropolitan Museum | 470K+ artworks from The Met | None |
| Art Institute Chicago | Massive art collection API | None |
| Rijksmuseum | Dutch Golden Age paintings | API Key |
| Cooper Hewitt | Design museum collection | OAuth |
| Harvard Art Museums | 250K+ art objects and images | API Key |
| Colormind | AI color palette generator | None |

</details>

<details>
<summary><b>? Blockchain & Cryptocurrency</b></summary>

| API | Description | Auth |
|---|---|---|
| CoinGecko | Crypto prices, market cap, charts | API Key |
| Blockchain.info | Bitcoin blockchain data | None |
| Etherscan | Ethereum blockchain explorer | API Key |
| CoinMarketCap | Crypto rankings and data | API Key |
| Binance | Spot trading data | API Key |
| Coinbase | Exchange data + wallet | OAuth |
| Coinpaprika | Alternative crypto data | None |
| Chainlink | Oracle price feeds | None |

</details>

<details>
<summary><b>?? Books & Literature</b></summary>

| API | Description | Auth |
|---|---|---|
| Open Library | 20M+ book records via Internet Archive | None |
| Google Books | Search books, ISBN lookup | API Key |
| Gutendex | Project Gutenberg library (60K+ free ebooks) | None |
| New York Times Books | Bestseller lists, book reviews | API Key |
| Open Library Covers | Book cover images | None |
| LibraryThing | User book collections and tags | OAuth |

</details>

<details>
<summary><b>?? Calendar & Events</b></summary>

| API | Description | Auth |
|---|---|---|
| Calendarific | Public holidays for 230+ countries | API Key |
| Abstract Holiday | Holiday information | API Key |
| Google Calendar | Read/write Google Calendar events | OAuth |
| Holidays API | World-wide holiday database | API Key |
| Nager.Date | Public holiday API for 100+ countries | None |

</details>

<details>
<summary><b>?? Cloud Storage & Files</b></summary>

| API | Description | Auth |
|---|---|---|
| Dropbox | File hosting, sharing, sync | OAuth |
| Google Drive | Cloud storage and document APIs | OAuth |
| OneDrive | Microsoft cloud storage | OAuth |
| Box | Enterprise file sharing | OAuth |
| Cloudinary | Image/video CDN and transformation | API Key |
| imgBB | Free image hosting | API Key |

</details>

<details>
<summary><b>?? Currency & Finance</b></summary>

| API | Description | Auth |
|---|---|---|
| ExchangeRate-API | Real-time and historical exchange rates | API Key |
| Fixer.io | 170+ currency pairs | API Key |
| Open Exchange Rates | Historical FX data | API Key |
| CurrencyFreaks | Live currency rates | API Key |
| Alpha Vantage | Stocks, forex, crypto, economic data | API Key |
| Yahoo Finance | Stock prices and financial data | None |
| Polygon.io | Market data and analytics | API Key |
| Plaid | Banking data aggregation | API Key |
| Stripe | Payment processing | API Key |
| Financial Modeling Prep | Financial statements, ratios | API Key |

</details>

<details>
<summary><b>??? Geocoding & Maps</b></summary>

| API | Description | Auth |
|---|---|---|
| Google Maps | Geocoding, directions, places | API Key |
| Mapbox | Maps, geocoding, navigation | API Key |
| OpenStreetMap / Nominatim | Free geocoding from OSM data | None |
| Here Maps | Navigation and geospatial | API Key |
| ip-api | IP to geolocation (free) | None |
| ipinfo | IP geolocation and ASN | API Key |
| What3Words | Address API using 3-word codes | API Key |
| GeoIP | IP-based location lookups | None |

</details>

<details>
<summary><b>?? Games & Comics</b></summary>

| API | Description | Auth |
|---|---|---|
| RAWG | Largest video game database (500K+ games) | API Key |
| IGDB | Game info from Twitch | OAuth |
| Steam | Steam game data, player stats | None |
| CheapShark | Game deals tracker | None |
| Marvel Comics | Characters, comics, creators | API Key |
| SWAPI | Star Wars universe data | None |
| PokeAPI | PokÈmon data, moves, types | None |
| D&D 5e | Dungeons & Dragons rules and monsters | None |
| Open Trivia | 3,400+ trivia questions | None |
| Bored | Activity suggestions to beat boredom | None |

</details>

<details>
<summary><b>??? Government & Open Data</b></summary>

| API | Description | Auth |
|---|---|---|
| data.gov | US government open data catalogue | API Key |
| UK Companies House | UK business registry | OAuth |
| NASA APIs | Space imagery, asteroid data, APOD | API Key |
| EU Open Data | European Union datasets | None |
| World Bank | Global development indicators | None |
| US Census | Demographics and economic data | API Key |
| UK Parliament | Hansard, bills, members | None |
| FBI Crime Data | US crime statistics | API Key |

</details>

<details>
<summary><b>?? Food & Drink</b></summary>

| API | Description | Auth |
|---|---|---|
| TheMealDB | Recipes, ingredients, meal categories | API Key |
| Open Food Facts | Food products, nutrition, ingredients | None |
| Spoonacular | Recipe search and nutritional analysis | API Key |
| Edamam | Nutrition data + recipe search | API Key |
| The Cocktail DB | Cocktail recipes and ingredients | API Key |
| RestCountries | Country meals and food culture | None |

</details>

<details>
<summary><b>?? Machine Learning & AI APIs</b></summary>

| API | Description | Auth |
|---|---|---|
| OpenAI | GPT-4, DALL-E, Whisper, embeddings | API Key |
| Anthropic Claude | Claude 3 family models | API Key |
| Google Gemini | Gemini Pro and Vision models | API Key |
| HuggingFace Inference | 100K+ hosted models | API Key |
| Replicate | Run ML models in the cloud | API Key |
| Stability AI | Stable Diffusion, image generation | API Key |
| ElevenLabs | AI voice generation, cloning | API Key |
| AssemblyAI | Speech-to-text and audio intelligence | API Key |
| Deepgram | Real-time transcription | API Key |

</details>

<details>
<summary><b>?? Music</b></summary>

| API | Description | Auth |
|---|---|---|
| Spotify | Music data, playlists, audio features | OAuth |
| Last.fm | Scrobbling, artist/track info | API Key |
| SoundCloud | Track streaming and uploads | OAuth |
| Genius | Song lyrics and annotations | OAuth |
| Discogs | Record database, marketplace | OAuth |
| iTunes Search | Apple Music catalogue | None |
| MusicBrainz | Open music encyclopedia | None |
| Shazam | Song recognition | API Key |

</details>

<details>
<summary><b>?? News & Media</b></summary>

| API | Description | Auth |
|---|---|---|
| NewsAPI | Top headlines from 50K+ sources | API Key |
| The Guardian | Full-text Guardian articles | API Key |
| New York Times | NYT article archive and search | API Key |
| GNews | Google News aggregator | API Key |
| Currents | Real-time news in 38 languages | API Key |
| Hacker News | Tech news via Y Combinator | None |
| Reddit | Posts, comments, subreddits | OAuth |
| Dev.to | Developer community articles | API Key |

</details>

<details>
<summary><b>?? Sports & Fitness</b></summary>

| API | Description | Auth |
|---|---|---|
| Football-Data.org | Football leagues, matches, standings | API Key |
| API-Football | 1,000+ football leagues | API Key |
| NBA Official | NBA stats and data | None |
| MLB Stats | Baseball statistics | None |
| Strava | Running/cycling activities | OAuth |
| TheSportsDB | Sports results, teams, players | API Key |
| OpenF1 | Formula 1 live and historical data | None |
| ESPN | Sports scores and news | None |

</details>

<details>
<summary><b>?? Transportation & Location</b></summary>

| API | Description | Auth |
|---|---|---|
| Uber | Ride estimates and booking | OAuth |
| TfL (Transport for London) | Real-time London transit data | API Key |
| FlightAware | Flight tracking | API Key |
| AviationStack | Real-time flight information | API Key |
| OpenSky Network | Live aircraft tracker | None |
| Transitland | Global transit data aggregator | API Key |
| PTV (Melbourne) | Melbourne public transport | API Key |

</details>

<details>
<summary><b>??? Weather</b></summary>

| API | Description | Auth |
|---|---|---|
| OpenWeatherMap | Current, hourly, daily forecasts | API Key |
| WeatherAPI | Weather + astronomy + sports | API Key |
| Tomorrow.io | Hyperlocal weather intelligence | API Key |
| Open-Meteo | Free, no API key global weather | None |
| National Weather Service | US official weather data | None |
| Weatherstack | Real-time global weather | API Key |
| Storm Glass | Marine, solar, and atmospheric data | API Key |

</details>

<details>
<summary><b>?? Video & Streaming</b></summary>

| API | Description | Auth |
|---|---|---|
| YouTube Data | Videos, channels, playlists, comments | API Key |
| Twitch | Streams, clips, games, users | OAuth |
| Vimeo | Video management and playback | OAuth |
| Daily.co | Video call infrastructure | API Key |
| Agora | Real-time audio/video SDK | API Key |
| Mux | Video encoding and analytics | API Key |

</details>

<details>
<summary><b>?? Email & Communication</b></summary>

| API | Description | Auth |
|---|---|---|
| SendGrid | Transactional email | API Key |
| Mailgun | Email sending and tracking | API Key |
| Mailchimp | Email marketing campaigns | OAuth |
| Twilio | SMS, WhatsApp, voice calls | API Key |
| Vonage | SMS and voice | API Key |
| Discord | Bot interactions, guild data | OAuth |
| Slack | Messages, channels, workflows | OAuth |
| Telegram Bot | Telegram bot messaging | API Key |

</details>

<details>
<summary><b>?? URL Shorteners & QR Codes</b></summary>

| API | Description | Auth |
|---|---|---|
| Bitly | URL shortening + analytics | API Key |
| TinyURL | Simple URL shortening | None |
| Rebrandly | Custom domain URL shortening | API Key |
| QR Code Generator | Generate QR codes | None |
| GoQR.me | QR code generation and scanning | None |

</details>

---

## ? Quick Start

<details>
<summary><b>?? Using AI Skills</b></summary>

```bash
# Clone the archive
git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git

# Browse available skills
ls ai_skills_library/skills/development/
ls ai_skills_library/skills/productivity/

# Use as a system prompt (example: React development)
cat "ai_skills_library/skills/development/frontend/react-typescript.md"
# ? Copy content ? Paste into Claude/Cursor/GPT system prompt field

# Or pipe directly to your CLI tool
cat "ai_skills_library/skills/development/backend/python-fastapi.md" | your-ai-cli
```

</details>

<details>
<summary><b>?? Installing an MCP Server</b></summary>

```bash
# Browse servers by category
ls mcps/databases/
ls mcps/browser_automation/

# Install and run (example: Supabase)
cd mcps/databases/supabase-mcp
npm install

# Add to Claude Desktop: ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": ["<FULL_PATH>/mcps/databases/supabase-mcp/build/index.js"],
      "env": { "SUPABASE_URL": "...", "SUPABASE_KEY": "..." }
    }
  }
}
# Restart Claude Desktop ó the tool is live
```

</details>

<details>
<summary><b>??? Applying an IDE Rule</b></summary>

```bash
# Find rules for your stack
ls ide_rules/cursor/ | grep -i react

# Copy to your project root
cp ide_rules/cursor/react-typescript.cursorrules /your-project/.cursorrules

# For newer MDC format
mkdir -p /your-project/.cursor/rules/
cp ide_rules/cursor/react-typescript.mdc /your-project/.cursor/rules/

# Open in Cursor ó AI knows your stack instantly
```

</details>

<details>
<summary><b>?? Reading a Leaked System Prompt</b></summary>

```bash
# See what's available
ls system_prompts/system_prompts_leaks_collections/

# Read the famous 111K-star collection
ls "system_prompts/system_prompts_leaks_collections/system-prompts-and-models-of-ai-tools/"

# Read Cursor's full system prompt
cat "system_prompts/system_prompts_leaks_collections/system-prompts-and-models-of-ai-tools/cursor/cursor.md"
```

</details>

<details>
<summary><b>?? Looking Up an API Provider</b></summary>

```bash
# Side-by-side comparison of all 12 providers
open api_providers/_COMPARISON.md

# Full details for a specific provider
open api_providers/major_cloud_providers/DeepSeek.md
open api_providers/major_cloud_providers/OpenAI.md

# Find which provider wins for your use case
grep -i "cheapest" api_providers/_COMPARISON.md
grep -i "fastest" api_providers/_COMPARISON.md
```

</details>

<details>
<summary><b>?? Running a No-Code Platform Locally</b></summary>

```bash
# n8n ó workflow automation
cd nocode_platforms/ai_workflow_automation_platforms/n8n
docker compose up -d   # ? http://localhost:5678

# Dify ó LLM app platform
cd nocode_platforms/ai_workflow_automation_platforms/dify
cp docker/.env.example docker/.env
docker compose -f docker/docker-compose.yaml up -d  # ? http://localhost

# Flowise ó visual AI builder
cd nocode_platforms/ai_workflow_automation_platforms/Flowise
npm install && npm run build && npm start  # ? http://localhost:3000

# Browse 2,000+ n8n workflow templates
ls nocode_platforms/n8n_templates_resources/awesome-n8n-templates/
```

</details>

<details>
<summary><b>?? Using the Public APIs Directory</b></summary>

```bash
# Browse the full list
open public_apis/README.md

# Search for a specific API type
grep -i "weather" public_apis/README.md
grep -i "free" public_apis/README.md | grep -i "auth.*None"

# Find APIs requiring no authentication
grep -A1 "| None |" public_apis/README.md | head -40
```

</details>

---

## ?? Auto-Sync System

This archive stays automatically up-to-date via two parallel mechanisms.

<details>
<summary><b>?? Mechanism 1 ó VPS Bot (Every 6 Hours)</b></summary>

A Python bot runs continuously on a dedicated VPS. Every 6 hours it:

1. Pulls the latest state of this archive repo
2. Loops through all 44+ tracked upstream repositories in `sync_manifest.json`
3. Re-clones each one fresh with `--depth 1` (shallow, fast)
4. Strips the inner `.git` folder (prevents submodule issues)
5. Compares new vs old ó if anything changed, stages the diff
6. Commits with timestamp: `chore(sync): Auto-sync N repos [YYYY-MM-DD HH:MM UTC]`
7. Pushes to GitHub ó **this commit shows on the contribution graph as a real commit**
8. Sleeps 6 hours ? repeats forever

**Technical config:**
- Runtime: Pterodactyl panel (Python 3.12 Docker container)
- Script: `app.py` (not pushed to GitHub for security)
- Manifest: `sync_manifest.json` (44+ repos tracked)

</details>

<details>
<summary><b>?? Mechanism 2 ó GitHub Actions (Daily Backup)</b></summary>

`.github/workflows/sync_upstream.yml` runs daily at 02:00 UTC as a backup:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'   # Daily at 2AM UTC
  workflow_dispatch:        # Also manually triggerable
```

Triggers: Navigate to **Actions tab** ? `Sync Upstream Repositories` ? **Run workflow**

</details>

<details>
<summary><b>?? Tracked Upstream Repositories (44+)</b></summary>

| Pillar | Count | Examples |
|---|---|---|
| Public APIs | 1 | public-apis/public-apis |
| MCP ó Official | 4 | python-sdk, typescript-sdk, servers, inspector |
| MCP ó Browser | 3 | playwright-mcp, mcp-playwright, browserbase |
| MCP ó Databases | 6 | supabase-mcp, snowflake, bigquery, mongo, redis, neo4j |
| MCP ó Cloud | 3 | aws-mcp-server, kubernetes (x2) |
| MCP ó Search | 2 | exa-mcp-server, tavily-mcp |
| System Prompts | 5 | 111K-star leaks, awesome-chatgpt-prompts, promptfoo, guardrails |
| No-Code | 14 | n8n, dify, flowise, langflow, appsmith, nocodb, budibase + more |
| **Total** | **44+** | All auto-synced every 6 hours |

</details>

---

## ?? Archive Stats

| Pillar | Directory | Count | Details |
|---|---|---|---|
| ?? AI Skills Library | `/ai_skills_library/` | **11,000+ files** | 23 source repos ∑ 4 domains ∑ 20 sub-categories |
| ?? MCP Servers | `/mcps/` | **92 repositories** | 11 categories ∑ 6 languages ∑ every major service |
| ??? IDE Rules | `/ide_rules/` | **2,200+ rule files** | All major frameworks + languages + stacks |
| ?? System Prompts | `/system_prompts/` | **30+ repositories** | Leaked ∑ guides ∑ eval tools ∑ guardrails |
| ?? API Providers | `/api_providers/` | **12 providers ∑ 50+ models** | Full pricing + SDKs + code examples |
| ?? No-Code Platforms | `/nocode_platforms/` | **15 repositories** | 5 categories ∑ 29 cloned directories |
| ?? Public APIs | `/public_apis/` | **1,400+ APIs** | 40+ categories ∑ auto-synced daily |
| ?? Auto-Sync | `sync_manifest.json` | **44+ upstreams tracked** | Updated every 6h via VPS + GitHub Actions |
| **TOTAL** | ó | **?? 13,700+ files** | **The most comprehensive AI workspace on GitHub** |

---

## ?? Disclaimer

All content in this archive is sourced from public GitHub repositories and official documentation pages. Leaked system prompts are included for **educational and research purposes only** ó to help developers understand how production AI systems are designed. Each included repository retains its original license as specified in its own `LICENSE` file. API pricing data reflects publicly listed rates at time of archiving and may change ó always verify current pricing with the official provider. This project does not endorse bypassing AI safety measures or using leaked information for unauthorized purposes.

---

<div align="center">

**Built for AI developers who want everything in one place.**
*No subscriptions. No browser tabs. No gatekeeping.*

[![Star this repo](https://img.shields.io/badge/?%20Star%20This%20Repo-FFD700?style=for-the-badge)](https://github.com/HIDORAKAI002/ai-workspace-archive)
[![Report Issue](https://img.shields.io/badge/??%20Report%20Issue-red?style=for-the-badge)](https://github.com/HIDORAKAI002/ai-workspace-archive/issues)
[![View All Pillars](https://img.shields.io/badge/??%20View%20All%20Pillars-2196F3?style=for-the-badge)](https://github.com/HIDORAKAI002/ai-workspace-archive)

*Auto-synced every 6 hours. Always up-to-date. Always free.*

</div>
