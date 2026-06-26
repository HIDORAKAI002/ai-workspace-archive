<div align="center">

# AI Workspace Archive

**The most comprehensive self-hostable AI developer toolbox on GitHub.**

*29,746 agent skills & files | 23 MCP servers | 3,348 IDE rules | 8 system prompt collections | 12 API providers | 15 no-code platforms | 1,400+ public APIs -- 174 curated upstream repos, all free*

> One repository. Everything an AI developer needs. Offline. No subscriptions. No gatekeeping.

[ ![File Count Shield](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/HIDORAKAI002/ai-workspace-archive/main/file_counts.json) ](https://github.com/HIDORAKAI002/ai-workspace-archive/blob/main/file_counts.json)

</div>

---

## Table of Contents

| # | Pillar | Scale | Path |
|---|---|---|---|
| 1 | [AI Skills and Prompt Library](#pillar-1--ai-skills-and-prompt-library) | 29,746 files from curated repos | `/ai_skills_library/` |
| 2 | [MCP Server Repository](#pillar-2--mcp-server-repository) | 23 repos across 11 categories | `/mcps/` |
| 3 | [IDE Context Rules](#pillar-3--ide-context-rules) | 3,348 AI rules for every stack | `/ide_rules/` |
| 4 | [System Prompts and Frameworks](#pillar-4--system-prompts-and-frameworks) | 8 repos across 4 categories | `/system_prompts/` |
| 5 | [AI API Providers Reference](#pillar-5--ai-api-providers-reference) | 12 providers, 50+ models | `/api_providers/` |
| 6 | [No-Code and Visual Workflow Builders](#pillar-6--no-code-and-visual-workflow-builders) | 15 repos, 29 cloned directories | `/nocode_platforms/` |
| 7 | [Public APIs Directory](#pillar-7--public-apis-directory) | 1,400+ APIs across 40+ categories | `/public_apis/` |
| 8 | [AI Agents & Advanced Tooling](#pillar-8--ai-agents--advanced-tooling) | Autonomous agents, frameworks & scraping | `/ai_agents/` |
| - | [Quick Start](#quick-start) | Copy-paste commands for each pillar | - |
| - | [Auto-Sync System](#auto-sync-system) | VPS bot + GitHub Actions | - |
| - | [Archive Stats](#archive-stats) | Full breakdown | - |

---

## Pillar 1 -- AI Skills and Prompt Library

> **`/ai_skills_library/`** -- 29,746 structured YAML-frontmatted skill files, deep-categorized across 20 sub-domains, sourced from curated GitHub repositories

Every file follows the same structure: a YAML frontmatter block declaring the skill name, recommended model, input format, and usage context -- followed by the actual prompt content. Drop any file directly into Claude, Cursor, Gemini, Copilot, or any AI assistant as a system prompt.

<details>
<summary><b>Skill Taxonomy -- Full Category Tree</b></summary>

```
ai_skills_library/skills/
|
+-- development/
|   +-- frontend/        React, Vue, Angular, Next.js, Svelte, CSS, HTML, animations
|   +-- backend/         FastAPI, Express, Django, Rails, Go APIs, gRPC, REST design
|   +-- database/        SQL optimization, schema design, migrations, indexing
|   +-- devops/          Docker, Kubernetes, Terraform, CI/CD, GitHub Actions, AWS
|   +-- mobile/          React Native, Flutter, Swift, Kotlin, iOS, Android
|   +-- security/        Pen testing, code review, OWASP, vulnerability analysis
|   +-- ai-ml/           LLM integration, embeddings, RAG, fine-tuning, agents
|
+-- productivity/
|   +-- writing/         Emails, reports, documentation, blog posts, READMEs
|   +-- analysis/        Research synthesis, data analysis, competitor research
|   +-- planning/        Project specs, task breakdown, sprint planning, roadmaps
|   +-- communication/   Meeting summaries, presentations, Slack messages
|   +-- finance/         Financial modeling, budget analysis, investment memos
|
+-- creative/
|   +-- design/          UI/UX briefs, design systems, Figma instructions
|   +-- marketing/       Ad copy, landing pages, social media, brand voice
|   +-- multimedia/      Video scripts, podcast outlines, image prompts
|
+-- other/
    +-- uncategorized/   Domain-specific skills: legal, medical, education, science
```

</details>

<details>
<summary><b>Source Repositories -- All 23 Origins</b></summary>

| Folder | Original Repository | Focus Area |
|---|---|---|
| `agentscope-skills` | [modelscope/agentscope](https://github.com/modelscope/agentscope) | Multi-agent framework skills |
| [Auferet](https://auferet.com) | AI game master that remembers your world: persistent memory for characters, places, and lore you upload; solo or multiplayer, 5e & Pathfinder 2e | — |
| `alirezarezvani-skills` | Community contribution | Persian-language AI skills |
| `anthropics-skills` | [anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | Official Anthropic prompt recipes |
| `apify-skills` | [apify/actors-mcp-server](https://github.com/apify/actors-mcp-server) | Web scraping and automation |
| `awesome-copilot` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | GitHub Copilot instructions |
| `factory-skills` | Community contribution | Software factory workflows |
| `flare-skills` | Community contribution | Flare platform skills |
| `gmh5225-awesome-skills` | Community curation | Mixed domain skills |
| `heilcheng-agent-skills` | Community contribution | Chinese-language agent skills |
| `hf-skills` | [huggingface/agents-course](https://github.com/huggingface/agents-course) | HuggingFace AI agent course |
| `integralist-skills` | Community contribution | DevOps and SRE focused skills |
| `karanb-claude-skills` | Community contribution | Claude-specific skill patterns |
| `obsidian-skills` | Community contribution | Obsidian PKM productivity skills |
| `openai-skills` | [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | Official OpenAI examples |
| `openclaw-skills` | Community contribution | Legal and contract AI skills |
| `planning-with-files` | Community contribution | File-based planning skills |
| `promptdeploy` | Community contribution | Prompt deployment workflows |
| `shajith-skills` | Community contribution | Full-stack dev skills |
| `sickn33-awesome-skills` | Community curation | The original comprehensive skill list |
| `sugarforever-skills` | Community contribution | Data science and ML skills |
| `voltagent-agent-skills` | [voltagent/voltagent](https://github.com/voltagent/voltagent) | VoltAgent framework skills |
| `wordpress-skills` | Community contribution | WordPress and CMS skills |
| `yoriiis-skills` | Community contribution | JavaScript ecosystem skills |

</details>

<details>
<summary><b>Development Skills -- What is Inside</b></summary>

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
- SQL to NoSQL migration planning

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
<summary><b>Productivity Skills -- What is Inside</b></summary>

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
<summary><b>Creative Skills -- What is Inside</b></summary>

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

## Pillar 2 -- MCP Server Repository

> **`/mcps/`** -- 23 fully cloned Model Context Protocol server repositories across 11 categories -- all installable, all production-ready, connecting directly to Claude Desktop, Cursor, Windsurf, or any MCP-compatible client

<details>
<summary><b>Official Anthropic (11 repos)</b></summary>

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
<summary><b>Browser Automation (4 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `playwright-mcp` | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | 12K+ | Microsoft official Playwright MCP -- control any browser |
| `mcp-playwright` | [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | 800+ | Playwright test automation via MCP |
| `mcp-server-browserbase` | [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | 500+ | Cloud browser automation with Browserbase |
| `chrome-devtools-mcp` | [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) | 500+ | Access Chrome DevTools Protocol via MCP |

</details>

<details>
<summary><b>Databases (12 repos)</b></summary>

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
| `mcp-database-server` | Community | - | Universal database MCP |
| `mysql_mcp_server` | Community | - | Secondary MySQL implementation |
| `mcp-sqlite-server` | Community | - | Local SQLite DB via MCP |

</details>

<details>
<summary><b>Cloud Platforms (3 repos)</b></summary>

| Repo Folder | GitHub | Stars | Platform |
|---|---|---|---|
| `aws-mcp-server` | [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) | 500+ | AWS -- EC2, S3, Lambda, IAM, CloudWatch |
| `kubernetes-mcp-server` | [manusa/kubernetes-mcp-server](https://github.com/manusa/kubernetes-mcp-server) | 300+ | Kubernetes cluster management (Java) |
| `mcp-k8s-go` | [strowk/mcp-k8s-go](https://github.com/strowk/mcp-k8s-go) | 400+ | Kubernetes management (Go, fast) |

</details>

<details>
<summary><b>Search Engines (5 repos)</b></summary>

| Repo Folder | GitHub | Stars | Service |
|---|---|---|---|
| `exa-mcp-server` | [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) | 600+ | Exa -- AI-native semantic search |
| `tavily-mcp` | [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp) | 300+ | Tavily -- research-focused search API |
| `brave-search-mcp` | Community | 200+ | Brave Search -- private web search |
| `serpapi-mcp-server` | Community | 100+ | SerpAPI -- Google/Bing/YouTube results |
| `actors-mcp-server` | [apify/actors-mcp-server](https://github.com/apify/actors-mcp-server) | 400+ | Apify -- web scraping actors as tools |

</details>

<details>
<summary><b>Developer & Filesystem Tools (5 repos)</b></summary>

| Repo Folder | GitHub | Stars | What It Does |
|---|---|---|---|
| `mcp-filesystem-server` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | Read/write local files and directories |
| `mcp-server-commands` | [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) | 200+ | Run shell commands via MCP |
| `mcp-youtube` | [suekou/mcp-youtube](https://github.com/suekou/mcp-youtube) | 150+ | YouTube transcript and video data |
| `filesystem_servers` | Community | - | Additional filesystem integration wrappers |
| `delimit-mcp-server` | [delimit-ai/delimit-mcp-server](https://github.com/delimit-ai/delimit-mcp-server) | 10+ | API governance, persistent memory, multi-model context, policy enforcement |

</details>

<details>
<summary><b>Frameworks and SDKs (12 repos)</b></summary>

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
| `mcphost` | Community | - | MCP Host implementation |
| `inspector` | [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) | - | Inspector tools |
| `openai-agents-python` | Community | - | Python agents integration |

</details>

<details>
<summary><b>Version Control and Git (5 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `github-mcp-server` | [github/github-mcp-server](https://github.com/github/github-mcp-server) | 5K+ | Official GitHub MCP -- PRs, issues, repos |
| `git-mcp` | [idosal/git-mcp](https://github.com/idosal/git-mcp) | 400+ | Git operations: commit, branch, diff, blame |
| `mcp-filesystem-server` | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 15K+ | File-level operations tied to git workflows |
| `mcp-package-docs` | [upstash/mcp-package-docs](https://github.com/upstash/mcp-package-docs) | 200+ | Fetch npm/PyPI package documentation |
| `mcp-server-commands` | [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) | 200+ | Run git commands as MCP tools |

</details>

<details>
<summary><b>Registries and Curated Lists (3 repos)</b></summary>

| Repo Folder | GitHub | Stars | Description |
|---|---|---|---|
| `awesome-mcp-list` | [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | 5K+ | Curated list of 500+ MCP servers |
| `mcpm` | [mcpm/mcpm](https://github.com/mcpm/mcpm) | 300+ | MCP package manager -- install servers like npm |
| `curated_awesome_lists` | Community | - | Additional curated references |

</details>

<details>
<summary><b>AI & ML Services (6 repos)</b></summary>

| Repo Folder | Category | Description |
|---|---|---|
| `mcp-agent` | Discovery | Agent orchestration via MCP |
| `mcp-hfspace` | HuggingFace | Access HuggingFace Spaces from MCP |
| `mcp-k8s-go` | Infra | Kubernetes management via AI |
| `mcp-snowflake-server` | Data | Snowflake database intel |
| `mcphost` | Server | Hosting bindings |
| `openai-agents-python` | Python | SDK integration layer |

</details>

<details>
<summary><b>Miscellaneous & Specialized (27 repos)</b></summary>

Includes 27 deeply specialized MCP implementations ranging across APIs, niche data platforms, communication bridges (Slack/Teams), and local productivity bridges:
- Miscellaneous standalone servers (25 repos)
- Communication & Collaboration servers (1 repo)
- Additional Productivity tools (1 repo)

These can be browsed safely via the `mcps/misc_specialized/` folder.

</details>

<details>
<summary><b>How to Connect an MCP Server</b></summary>

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

**4. Restart Claude Desktop** -- the tool appears automatically.

</details>


---

## Pillar 3 -- IDE Context Rules

> **`/ide_rules/`** -- 3,348 AI editor instruction files for Cursor, Windsurf, Cline, and GitHub Copilot -- covering every major language, framework, and tech stack

Drop one file into your project root and your AI editor instantly understands your architecture, coding conventions, testing standards, and style preferences.

<details>
<summary><b>How IDE Rules Work</b></summary>

| File Type | Compatible With | Where to Place |
|---|---|---|
| `.cursorrules` | Cursor IDE | Project root |
| `.mdc` files | Cursor (newer format) | `.cursor/rules/*.mdc` |
| `.clinerules` | Cline VS Code Extension | Project root |
| `.github/copilot-instructions.md` | GitHub Copilot | `.github/` folder |
| `SYSTEM_PROMPT.md` | Any AI chat | Use as system prompt |

</details>

<details>
<summary><b>Frontend Frameworks</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `react-typescript.cursorrules` | React + TypeScript | hooks-only patterns, strict types, no class components |
| `nextjs-app-router.cursorrules` | Next.js 14+ | App Router, RSC, server actions, metadata API |
| `nextjs-tailwind.mdc` | Next.js + Tailwind | utility-first, no custom CSS, mobile-first |
| `vue3-typescript.cursorrules` | Vue 3 + TS | Composition API, script setup, Pinia, Vite |
| `nuxt3.cursorrules` | Nuxt 3 | auto-imports, Nitro, composables, useAsyncData |
| `svelte5.cursorrules` | Svelte 5 | runes syntax, $state, $derived, $effect |
| `angular17.cursorrules` | Angular 17+ | standalone components, signals, new control flow |
| `remix.cursorrules` | Remix | loaders, actions, progressive enhancement |
| `astro.cursorrules` | Astro | island architecture, content collections, SSG |
| `solid-js.cursorrules` | SolidJS | fine-grained reactivity, no virtual DOM patterns |

</details>

<details>
<summary><b>Backend Frameworks</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `python-fastapi.cursorrules` | FastAPI + Python | Pydantic v2, async/await, dependency injection |
| `python-django.cursorrules` | Django | ORM patterns, CBVs vs FBVs, signals |
| `python-flask.cursorrules` | Flask | blueprints, application factory pattern |
| `nodejs-express.cursorrules` | Node.js + Express | middleware chain, error handling, REST conventions |
| `go-gin.cursorrules` | Go + Gin | idiomatic Go, error propagation, zero-alloc patterns |
| `rust-axum.cursorrules` | Rust + Axum | ownership patterns, tower middleware, async traits |
| `java-spring.cursorrules` | Spring Boot | DI, JPA, REST with proper HTTP semantics |
| `ruby-rails.cursorrules` | Ruby on Rails | convention over config, ActiveRecord, REST |
| `php-laravel.cursorrules` | Laravel | Eloquent, Blade, service providers |
| `elixir-phoenix.cursorrules` | Elixir + Phoenix | functional patterns, LiveView, contexts |

</details>

<details>
<summary><b>Mobile Development</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `react-native.cursorrules` | React Native | platform-specific code, performance, navigation |
| `expo.cursorrules` | Expo | managed workflow, EAS, expo-router |
| `flutter.cursorrules` | Flutter | widget tree, state management, null safety |
| `swift-swiftui.cursorrules` | Swift + SwiftUI | MVVM, Combine, async/await, ViewModels |
| `kotlin-android.cursorrules` | Kotlin Android | Coroutines, Jetpack, MVVM, Room |

</details>

<details>
<summary><b>Database and Data</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `postgresql.cursorrules` | PostgreSQL | indexing strategy, EXPLAIN plans, CTEs |
| `prisma.cursorrules` | Prisma ORM | schema design, migrations, query optimization |
| `drizzle.cursorrules` | Drizzle ORM | type-safe queries, schema-first, edge-compatible |
| `mongodb.cursorrules` | MongoDB | schema design, aggregation, indexing |
| `supabase.cursorrules` | Supabase | RLS policies, Edge Functions, realtime |
| `firebase.cursorrules` | Firebase | Firestore rules, Cloud Functions, Auth |

</details>

<details>
<summary><b>AI / ML Engineering</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `langchain.cursorrules` | LangChain | LCEL, chains, agents, memory patterns |
| `langgraph.cursorrules` | LangGraph | stateful agents, graph nodes, human-in-loop |
| `llamaindex.cursorrules` | LlamaIndex | RAG pipelines, indices, query engines |
| `openai-api.cursorrules` | OpenAI SDK | streaming, function calling, token management |
| `anthropic-api.cursorrules` | Anthropic SDK | tool use, streaming, prompt caching |
| `huggingface.cursorrules` | HuggingFace | transformers, datasets, PEFT, inference |
| `pytorch.cursorrules` | PyTorch | tensor ops, training loops, CUDA, DataLoaders |

</details>

<details>
<summary><b>DevOps and Infrastructure</b></summary>

| Rule File | Stack | What It Enforces |
|---|---|---|
| `dockerfile.cursorrules` | Docker | multi-stage builds, layer caching, non-root users |
| `kubernetes.cursorrules` | Kubernetes | resource limits, probes, RBAC, network policies |
| `terraform.cursorrules` | Terraform | modules, state management, naming conventions |
| `github-actions.cursorrules` | GitHub Actions | workflow reuse, secrets, matrix builds, caching |
| `helm.cursorrules` | Helm | chart structure, values hierarchy, templating |

</details>

<details>
<summary><b>How to Use Any Rule</b></summary>

```bash
# 1. Find your stack
ls ide_rules/cursor/ | grep -i next

# 2. Copy to your project
cp ide_rules/cursor/nextjs-app-router.cursorrules /your-project/.cursorrules

# 3. Open Cursor -- AI is instantly context-aware

# For newer Cursor MDC format:
mkdir -p /your-project/.cursor/rules
cp ide_rules/cursor/nextjs-app-router.mdc /your-project/.cursor/rules/

# For GitHub Copilot:
cp ide_rules/copilot/nextjs.md /your-project/.github/copilot-instructions.md
```

</details>

---

## Pillar 4 -- System Prompts and Frameworks

> **`/system_prompts/`** -- 8 carefully curated repositories spanning leaked production system prompts, prompt engineering masterclasses, prompt management tools, testing frameworks, and AI safety guardrails

> [!WARNING]
> **Legal & Educational Disclaimer**: The leaked proprietary system prompts below (e.g., Claude Code, Cursor, Devin) are archived **strictly for educational research, syntax analysis, and safe-guard testing**. We do not claim ownership of these prompt strings. Users are responsible for adhering to all creator ToS and DMCA regulations.

<details>
<summary><b>Leaked System Prompts Collections</b></summary>

| Folder | Repository | Stars | What is Inside |
|---|---|---|---|
| `system-prompts-and-models-of-ai-tools` | [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | **111K+** | Claude Code, Cursor, Windsurf, Devin, v0, Perplexity, Notion AI, GitHub Copilot, Lovable, Bolt |
| `thebigpromptlibrary` | [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) | 5K+ | Massive curated library of GPT and Claude system prompts |
| `chatgpt_system_prompt` | [LouisShark/chatgpt_system_prompt](https://github.com/LouisShark/chatgpt_system_prompt) | 8K+ | Hundreds of leaked ChatGPT custom GPT instructions |

**What you get from the 111K-star repo:** Full system prompts for Claude Code, Cursor, Windsurf/Cascade, Devin, v0 (Vercel), Perplexity, Notion AI, GitHub Copilot, Lovable, Bolt.new, and Manus.

</details>

<details>
<summary><b>Prompt Engineering Guides (3 repos)</b></summary>

| Folder | Repository | Stars | Content |
|---|---|---|---|
| `awesome-chatgpt-prompts` | [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | **115K+** | 157 expert role prompts |
| `awesome-aipromptlib` | Community | 5K+ | Curated prompt patterns |
| `Prompt_Engineering` | [NirDiamant/Prompt_Engineering](https://github.com/NirDiamant/Prompt_Engineering) | 8K+ | 22 hands-on Jupyter tutorials: zero-shot, few-shot, CoT, ReAct, ToT |

</details>

<details>
<summary><b>Prompt Testing and Evaluation (3 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `promptfoo` | [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | 5K+ | Run automated test suites against your prompts. Compare model outputs, catch regressions |
| `helicone` | [helicone/helicone](https://github.com/helicone/helicone) | 2K+ | LLM observability: request logging, cost tracking, latency, prompt versioning |
| `langfuse` | [langfuse/langfuse](https://github.com/langfuse/langfuse) | 7K+ | LLM engineering platform: traces, evaluations, prompt management |

</details>

<details>
<summary><b>Safety and Guardrails (3 repos)</b></summary>

| Folder | Repository | Stars | What It Does |
|---|---|---|---|
| `NeMo-Guardrails` | [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) | 4K+ | NVIDIA toolkit for programmable guardrails via Colang DSL |
| `guardrails` | [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) | 4K+ | Validate and fix LLM outputs against schemas |
| `rebuff` | [protectai/rebuff](https://github.com/protectai/rebuff) | 1K+ | Self-hardening prompt injection detector |

</details>

---

## Pillar 5 -- AI API Providers Reference

> **`/api_providers/`** -- Complete offline reference for 12 AI API providers: every model listed, full pricing tables, SDK install commands, and code examples

<details>
<summary><b>Category Champions -- Who Wins What</b></summary>

| Category | Winner | Details | Runner Up |
|---|---|---|---|
| Cheapest Input | DeepSeek V3 | $0.28/M tokens | Gemini 2.5 Flash-Lite ($0.10/M) |
| Best Free Tier | DeepSeek | 5M free tokens/month | Google Gemini (1,500 req/day) |
| Largest Context | xAI Grok | 2M token window | OpenAI GPT-4.1 / Claude / Gemini (1M) |
| Fastest Inference | Groq | 1,000+ tokens/sec | Fireworks / Together AI |
| Best Reasoning | Claude Opus 4.6 / o3 | - | DeepSeek R1 (10x cheaper) |
| Best Coding | Claude 3.5 Sonnet / GPT-4.1 | - | DeepSeek V3 |
| Best Multimodal | Gemini 2.5 Pro | Images+audio+video | GPT-4o |
| Best EU/Privacy | Mistral AI | EU data residency | Google Gemini EU |
| Best Embeddings | Cohere Embed 4 | $0.12/M | OpenAI text-embedding-3-small |
| Best Self-Hosted | Meta Llama 4 | Free open weights | Mistral (open-weight) |

</details>

<details>
<summary><b>OpenAI -- All Models and Pricing</b></summary>

**SDK:** `pip install openai` / `npm install openai`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `gpt-4.1` | $2.00 | $8.00 | 1M | Best overall coding + reasoning |
| `gpt-4.1-mini` | $0.40 | $1.60 | 1M | Balanced cost/quality |
| `gpt-4.1-nano` | $0.10 | $0.40 | 1M | High-volume, simple tasks |
| `gpt-4o` | $2.50 | $10.00 | 128K | Multimodal (images, audio) |
| `gpt-4o-mini` | $0.15 | $0.60 | 128K | Fast + cheap, most popular |
| `o3` | $2.00 | $8.00 | 200K | Extended reasoning chains |
| `o4-mini` | $1.10 | $4.40 | 200K | Fast reasoning, cheap |

```python
from openai import OpenAI
client = OpenAI(api_key="sk-...")
r = client.chat.completions.create(model="gpt-4o-mini", messages=[{"role":"user","content":"Hello"}])
print(r.choices[0].message.content)
```

</details>

<details>
<summary><b>Anthropic Claude -- All Models and Pricing</b></summary>

**SDK:** `pip install anthropic` / `npm install @anthropic-ai/sdk`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `claude-opus-4-6` | $5.00 | $25.00 | 1M | Hardest reasoning, research |
| `claude-sonnet-3-7` | $3.00 | $15.00 | 1M | Best agent / tool use |
| `claude-sonnet-3-5` | $3.00 | $15.00 | 200K | Best coding, daily driver |
| `claude-haiku-4-5` | $1.00 | $5.00 | 1M | Fast + affordable |

</details>

<details>
<summary><b>Google Gemini -- All Models and Pricing</b></summary>

**SDK:** `pip install google-generativeai`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `gemini-2.5-pro` | $1.25 | $10.00 | 1M | Best multimodal, 1M context |
| `gemini-2.5-flash` | $0.15 | $0.60 | 1M | Speed + budget balance |
| `gemini-2.5-flash-lite` | $0.10 | $0.40 | 1M | Cheapest capable model |

**Free Tier (no credit card):** 1,500 requests/day on Flash models

</details>

<details>
<summary><b>DeepSeek -- All Models and Pricing</b></summary>

**SDK:** OpenAI-compatible (`pip install openai`), Base URL: `https://api.deepseek.com/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `deepseek-chat` (V3) | $0.28 | $1.10 | 128K | Best value for money -- GPT-4 quality at 1/10 cost |
| `deepseek-reasoner` (R1) | $0.55 | $2.19 | 128K | Reasoning chains, math, logic |

**Free tier:** 5M tokens/month. No credit card needed.

</details>

<details>
<summary><b>xAI Grok -- All Models and Pricing</b></summary>

**SDK:** OpenAI-compatible, Base URL: `https://api.x.ai/v1`

| Model | Input $/1M | Output $/1M | Context | Best For |
|---|---|---|---|---|
| `grok-4` | $3.00 | $15.00 | **2M** | Largest public context window |
| `grok-4.1` | $2.00 | $10.00 | **2M** | Long document analysis |
| `grok-4.1-fast` | $0.20 | $0.80 | 128K | Fast, cheap Grok |

</details>

<details>
<summary><b>Groq -- All Models and Pricing</b></summary>

**SDK:** OpenAI-compatible (`pip install groq`), Base URL: `https://api.groq.com/openai/v1`

| Model | Input $/1M | Output $/1M | Speed | Context |
|---|---|---|---|---|
| `llama-4-maverick` | $0.50 | $0.77 | 800 tok/s | 128K |
| `llama-4-scout` | $0.11 | $0.34 | **1,000+ tok/s** | 128K |
| `llama-3.1-8b` | $0.05 | $0.08 | **1,200 tok/s** | 128K |
| `whisper-large-v3` | $0.111/hr | - | Fastest STT | Audio |

**Real-time use case:** Groq is the go-to for human-speed responses -- voice apps, real-time agents, streaming UIs.

</details>

<details>
<summary><b>OpenRouter -- 300+ Models, One API Key</b></summary>

**SDK:** OpenAI-compatible, Base URL: `https://openrouter.ai/api/v1`

Route to any model from a single API key. Auto-fallback, load balancing, unified billing.

| Category | Top Models Available |
|---|---|
| Top Tier | Claude Opus, GPT-4o, Gemini 2.5 Pro, Grok 4 |
| Mid Tier | Claude Sonnet, GPT-4o-mini, Gemini Flash |
| Budget | DeepSeek V3, Llama 4, Mistral Small, Qwen |
| Free | 50+ free models (rate limited) |

</details>

<details>
<summary><b>Meta Llama -- Free Forever (Self-Host)</b></summary>

| Model | Parameters | VRAM Required | Context |
|---|---|---|---|
| `Llama-3.2-1B` | 1B | 2 GB | 128K |
| `Llama-3.2-3B` | 3B | 4 GB | 128K |
| `Llama-3.1-8B` | 8B | 8 GB | 128K |
| `Llama-3.3-70B` | 70B | 40 GB | 128K |
| `Llama-4-Scout` | 17B active (109B MoE) | 24 GB | 10M |
| `Llama-4-Maverick` | 17B active (400B MoE) | 80 GB | 1M |

**Run locally:** `ollama run llama3.3:70b`

</details>

<details>
<summary><b>Full API Reference Files</b></summary>

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

## Pillar 6 -- No-Code and Visual Workflow Builders

> **`/nocode_platforms/`** -- 15 fully cloned repositories across 5 categories -- AI workflow builders, low-code internal tools, n8n templates, Flowise tools, and additional platforms

<details>
<summary><b>AI Workflow Automation Platforms (7 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `n8n` | [n8n-io/n8n](https://github.com/n8n-io/n8n) | **181K+** | Most popular open-source workflow automation. 400+ integrations, native AI, self-hostable |
| `dify` | [langgenius/dify](https://github.com/langgenius/dify) | **135K+** | Full-stack LLMOps platform. Visual workflow builder with RAG, 50+ model providers |
| `langflow` | [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | **146K+** | Drag-and-drop builder for LangChain and RAG applications |
| `Flowise` | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | **51K+** | Visual LangChain + AI agent builder. 100+ integrations |
| `activepieces` | [activepieces/activepieces](https://github.com/activepieces/activepieces) | **21K+** | AI Agents + MCP + automation. Zapier alternative |
| `trigger_dev` | [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev) | **14K+** | Developer-first background jobs. Perfect for AI pipelines |
| `windmill` | [windmill-labs/windmill](https://github.com/windmill-labs/windmill) | **16K+** | 13x faster than Airflow. Retool alternative |

</details>

<details>
<summary><b>Low-Code Internal Tools (4 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `appsmith` | [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | **39K+** | Build admin panels, dashboards. 25+ DB integrations |
| `ToolJet` | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | **37K+** | AI-native low-code platform. 50+ UI components |
| `budibase` | [Budibase/budibase](https://github.com/Budibase/budibase) | **27K+** | Build internal tools with AI agents. Model agnostic |
| `nocodb` | [nocodb/nocodb](https://github.com/nocodb/nocodb) | **62K+** | Airtable replacement. REST + GraphQL auto-generated |

</details>

<details>
<summary><b>n8n Templates and Resources (3 repos)</b></summary>

| Folder | Repository | Stars | What is Inside |
|---|---|---|---|
| `awesome-n8n-templates` | [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) | **19K+** | 280+ hand-picked n8n workflow templates |
| `AI-Workflow-Hub-2000-` | [emretasss/AI-Workflow-Hub-2000-](https://github.com/emretasss/AI-Workflow-Hub-2000-) | 1.5K+ | **2,000+ free n8n AI automation workflows** |
| `n8n-hosting` | [n8n-io/n8n-hosting](https://github.com/n8n-io/n8n-hosting) | 1.5K+ | Official Docker + Kubernetes configs for self-hosting |

</details>

<details>
<summary><b>Flowise Related Tools (2 repos)</b></summary>

| Folder | Repository | Description |
|---|---|---|
| `FlowiseDocs` | [FlowiseAI/FlowiseDocs](https://github.com/FlowiseAI/FlowiseDocs) | Complete Flowise documentation |
| `flowise-to-langchain` | [iaminawe/flowise-to-langchain](https://github.com/iaminawe/flowise-to-langchain) | Convert Flowise flows to production LangChain code |

</details>

<details>
<summary><b>Dify Related Tools (2 repos)</b></summary>

| Folder | Repository | Description |
|---|---|---|
| `dify-docs` | [langgenius/dify-docs](https://github.com/langgenius/dify-docs) | Complete Dify documentation offline |
| `dify-helm` | [BorisPolonsky/dify-helm](https://github.com/BorisPolonsky/dify-helm) | Kubernetes Helm chart for deploying Dify |

</details>

<details>
<summary><b>Additional No-Code Platforms (4 repos)</b></summary>

| Folder | Repository | Stars | What It Is |
|---|---|---|---|
| `directus` | [directus/directus](https://github.com/directus/directus) | **34K+** | Instant REST+GraphQL API for any SQL database |
| `hoppscotch` | [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch) | **78K+** | Open-source Postman alternative |
| `plane` | [makeplane/plane](https://github.com/makeplane/plane) | **35K+** | Open-source Jira / Linear alternative |
| `rowy` | [rowyio/rowy](https://github.com/rowyio/rowy) | **6.8K+** | Airtable-like UI for Firestore |

</details>

<details>
<summary><b>Platform Feature Comparison</b></summary>

| Feature | n8n | Dify | Flowise | Langflow | Activepieces | Windmill |
|---|---|---|---|---|---|---|
| Visual Builder | Yes | Yes | Yes | Yes | Yes | Yes |
| Self-Hostable | Yes | Yes | Yes | Yes | Yes | Yes |
| Native LLM/AI | Yes | Yes | Yes | Yes | Yes | Yes |
| Built-in RAG | Partial | Yes | Yes | Yes | No | No |
| Multi-Agent | Yes | Yes | Yes | Yes | Yes | No |
| Integrations | 400+ | 50+ | 100+ | 50+ | 280+ | Any |
| License | Fair-code | Apache 2.0 | Apache 2.0 | MIT | MIT | AGPL-3.0 |

</details>

---

## Pillar 7 -- Public APIs Directory

> **`/public_apis/`** -- Auto-synced local mirror of [public-apis/public-apis](https://github.com/public-apis/public-apis) (320K+ stars) -- the single most-starred curated list on all of GitHub. 1,400+ free public APIs organized by category, updated daily.

<details>
<summary><b>Animals</b></summary>

| API | Description | Auth |
|---|---|---|
| Dog CEO | Random dog images by breed | None |
| TheCatAPI | Cat images + breeds + facts | API Key |
| RandomFox | Random fox images | None |
| HTTP Cat | Cat image for every HTTP status code | None |

</details>

<details>
<summary><b>Anime and Manga</b></summary>

| API | Description | Auth |
|---|---|---|
| Jikan | Unofficial MyAnimeList API | None |
| AniList | Modern anime/manga database (GraphQL) | OAuth |
| Waifu.pics | Random anime images | None |
| Kitsu | Anime and manga database | OAuth |
| Trace.moe | Identify anime from screenshots | None |

</details>

<details>
<summary><b>Blockchain and Cryptocurrency</b></summary>

| API | Description | Auth |
|---|---|---|
| CoinGecko | Crypto prices, market cap, charts | API Key |
| Etherscan | Ethereum blockchain explorer | API Key |
| CoinMarketCap | Crypto rankings and data | API Key |
| Binance | Spot trading data | API Key |
| Coinbase | Exchange data + wallet | OAuth |

</details>

<details>
<summary><b>Books and Literature</b></summary>

| API | Description | Auth |
|---|---|---|
| Open Library | 20M+ book records | None |
| Google Books | Search books, ISBN lookup | API Key |
| Gutendex | 60K+ free ebooks (Project Gutenberg) | None |

</details>

<details>
<summary><b>Currency and Finance</b></summary>

| API | Description | Auth |
|---|---|---|
| ExchangeRate-API | Real-time exchange rates | API Key |
| Alpha Vantage | Stocks, forex, crypto | API Key |
| Yahoo Finance | Stock prices and data | None |
| Polygon.io | Market data and analytics | API Key |
| Plaid | Banking data aggregation | API Key |
| Stripe | Payment processing | API Key |

</details>

<details>
<summary><b>Games and Comics</b></summary>

| API | Description | Auth |
|---|---|---|
| RAWG | Largest video game database | API Key |
| IGDB | Game info from Twitch | OAuth |
| Steam | Steam game data | None |
| PokeAPI | Pokemon data | None |
| SWAPI | Star Wars data | None |
| Marvel Comics | Characters, comics | API Key |

</details>

<details>
<summary><b>Geocoding and Maps</b></summary>

| API | Description | Auth |
|---|---|---|
| Google Maps | Geocoding, directions, places | API Key |
| Mapbox | Maps, geocoding, navigation | API Key |
| OpenStreetMap | Free geocoding from OSM | None |
| ip-api | IP to geolocation | None |

</details>

<details>
<summary><b>Government and Open Data</b></summary>

| API | Description | Auth |
|---|---|---|
| data.gov | US government open data | API Key |
| NASA APIs | Space imagery, asteroids, APOD | API Key |
| World Bank | Global development indicators | None |
| US Census | Demographics and economic data | API Key |

</details>

<details>
<summary><b>Machine Learning and AI</b></summary>

| API | Description | Auth |
|---|---|---|
| OpenAI | GPT-4, DALL-E, Whisper, embeddings | API Key |
| Anthropic | Claude 3 family models | API Key |
| Google Gemini | Gemini Pro and Vision models | API Key |
| HuggingFace | 100K+ hosted models | API Key |
| Replicate | Run ML models in the cloud | API Key |
| ElevenLabs | AI voice generation, cloning | API Key |

</details>

<details>
<summary><b>Music</b></summary>

| API | Description | Auth |
|---|---|---|
| Spotify | Music data, playlists, audio features | OAuth |
| Last.fm | Scrobbling, artist/track info | API Key |
| Genius | Song lyrics and annotations | OAuth |
| MusicBrainz | Open music encyclopedia | None |

</details>

<details>
<summary><b>News and Media</b></summary>

| API | Description | Auth |
|---|---|---|
| NewsAPI | Top headlines from 50K+ sources | API Key |
| The Guardian | Full-text Guardian articles | API Key |
| New York Times | NYT article archive | API Key |
| Hacker News | Tech news via Y Combinator | None |

</details>

<details>
<summary><b>Sports and Fitness</b></summary>

| API | Description | Auth |
|---|---|---|
| Football-Data.org | Football leagues, matches | API Key |
| NBA Official | NBA stats and data | None |
| Strava | Running/cycling activities | OAuth |
| OpenF1 | Formula 1 live and historical | None |

</details>

<details>
<summary><b>Weather</b></summary>

| API | Description | Auth |
|---|---|---|
| OpenWeatherMap | Current, hourly, daily forecasts | API Key |
| WeatherAPI | Weather + astronomy | API Key |
| Open-Meteo | Free global weather, no key needed | None |
| Tomorrow.io | Hyperlocal weather intelligence | API Key |

</details>

<details>
<summary><b>Video and Streaming</b></summary>

| API | Description | Auth |
|---|---|---|
| YouTube Data | Videos, channels, playlists | API Key |
| Twitch | Streams, clips, games, users | OAuth |
| Vimeo | Video management | OAuth |

</details>

<details>
<summary><b>Email and Communication</b></summary>

| API | Description | Auth |
|---|---|---|
| SendGrid | Transactional email | API Key |
| Twilio | SMS, WhatsApp, voice calls | API Key |
| Discord | Bot interactions, guild data | OAuth |
| Slack | Messages, channels, workflows | OAuth |
| Telegram Bot | Telegram bot messaging | API Key |

</details>

<details>
<summary><b>Food and Drink</b></summary>

| API | Description | Auth |
|---|---|---|
| TheMealDB | Recipes, ingredients | API Key |
| Open Food Facts | Food products, nutrition | None |
| Spoonacular | Recipe search + nutrition | API Key |
| The Cocktail DB | Cocktail recipes | API Key |

</details>

<details>
<summary><b>Security APIs</b></summary>

| API | Description | Auth |
|---|---|---|
| AbuseIPDB | IP reputation reports | API Key |
| VirusTotal | Scan files/URLs for malware | API Key |
| Shodan | Search exposed devices | API Key |
| Have I Been Pwned | Data breach checks | API Key |

</details>

<details>
<summary><b>Art and Design</b></summary>

| API | Description | Auth |
|---|---|---|
| Metropolitan Museum | 470K+ artworks | None |
| Art Institute Chicago | Art collection API | None |
| Colormind | AI color palette generator | None |

</details>

<details>
<summary><b>Transportation</b></summary>

| API | Description | Auth |
|---|---|---|
| Uber | Ride estimates and booking | OAuth |
| FlightAware | Flight tracking | API Key |
| OpenSky Network | Live aircraft tracker | None |

</details>

---

## Pillar 8 -- AI Agents & Advanced Tooling

> **`/ai_agents/` & related** -- Full implementations, reasoning frameworks, and tool configs for advanced autonomous agents, personal assistants, and AI infrastructure.

<details>
<summary><b>Personal Assistants</b></summary>

| Folder | Repository | Description |
|---|---|---|
| `hermes_agent` | [nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent) | Agent that grows with you. **Added the full implementation under the personal assistants folder. It includes the reasoning framework and tool configs that make this level of autonomy possible.** |
| `openclaw` | [openclaw/openclaw](https://github.com/openclaw/openclaw) | Open source AI personal assistant. |

</details>

<details>
<summary><b>Web Scraping & Infrastructure</b></summary>

| Folder | Repository | Description |
|---|---|---|
| `scrapegraph_ai` | [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) | Smart open-source scraper based on AI. Automates web scraping with LLMs. Supports multi-page and local LLM execution. |

</details>

<details>
<summary><b>Agent Frameworks & Super Agents</b></summary>

| Folder | Repository | Description |
|---|---|---|
| `deerflow` | [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | ByteDance SuperAgent. #1 GitHub Trending Feb 2026. 45K+ stars. Replaces Perplexity/ChatGPT subs. |
| `code-review-graph` | [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Persistent knowledge graph for Claude Code. 5-10x fewer tokens per review. |
| `hindsight` | [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) | Memory systems for AI agents. |
| `mastra` | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | AI Agent framework. |
| `superpowers` | [obra/superpowers](https://github.com/obra/superpowers) | Lab environment for AI superpowers. |

</details>

---

## Quick Start

<details>
<summary><b>Using AI Skills</b></summary>

```bash
git clone https://github.com/HIDORAKAI002/ai-workspace-archive.git
ls ai_skills_library/skills/development/
# Copy any skill file -> paste as system prompt in Claude/Cursor/GPT
```

</details>

<details>
<summary><b>Installing an MCP Server</b></summary>

```bash
cd mcps/databases/supabase-mcp
npm install
# Add to claude_desktop_config.json -> restart Claude Desktop
```

</details>

<details>
<summary><b>Applying an IDE Rule</b></summary>

```bash
cp ide_rules/cursor/react-typescript.cursorrules /your-project/.cursorrules
# Open in Cursor -- AI knows your stack instantly
```

</details>

<details>
<summary><b>Reading a Leaked System Prompt</b></summary>

```bash
ls system_prompts/system_prompts_leaks_collections/
cat "system_prompts/system_prompts_leaks_collections/system-prompts-and-models-of-ai-tools/cursor/cursor.md"
```

</details>

<details>
<summary><b>Running a No-Code Platform Locally</b></summary>

```bash
# n8n
cd nocode_platforms/ai_workflow_automation_platforms/n8n
docker compose up -d   # -> http://localhost:5678

# Flowise
cd nocode_platforms/ai_workflow_automation_platforms/Flowise
npm install && npm run build && npm start  # -> http://localhost:3000
```

</details>

---

## Auto-Sync System

This archive stays automatically up-to-date via two parallel mechanisms.

<details>
<summary><b>Mechanism 1 -- VPS Bot (Every 6 Hours)</b></summary>

A Python bot runs on a dedicated VPS. Every 6 hours it:

1. Checks each upstream repository for new commits (one at a time, no bulk storage)
2. If changed: clones fresh, strips `.git` folder, pushes the diff
3. Commits with timestamp -- shows on contribution graph as a real commit
4. Cleans temp files between each repo to minimize disk usage
5. Sleeps 6 hours, repeats forever

</details>

<details>
<summary><b>Mechanism 2 -- GitHub Actions (Daily Backup)</b></summary>

`.github/workflows/sync_upstream.yml` runs daily at 02:00 UTC as a backup.

Trigger manually: Actions tab -> Sync Upstream Repositories -> Run workflow

</details>

<details>
<summary><b>Tracked Upstream Repositories (45+)</b></summary>

| Pillar | Count | Examples |
|---|---|---|
| Public APIs | 1 | public-apis/public-apis |
| MCP -- Official | 4 | python-sdk, typescript-sdk, servers, inspector |
| MCP -- Browser | 3 | playwright-mcp, mcp-playwright, browserbase |
| MCP -- Databases | 6 | supabase-mcp, snowflake, bigquery, mongo, redis, neo4j |
| MCP -- Cloud | 3 | aws-mcp-server, kubernetes (x2) |
| MCP -- Search | 2 | exa-mcp-server, tavily-mcp |
| System Prompts | 5 | 111K-star leaks, awesome-chatgpt-prompts, promptfoo, guardrails |
| No-Code | 14 | n8n, dify, flowise, langflow, appsmith, nocodb + more |
| AI Agents & Tooling | 8 | hermes-agent, Scrapegraph-ai, deer-flow, code-review-graph |
| **Total** | **55+** | All auto-synced every 6 hours |

</details>

---

## Archive Stats

| Pillar | Directory | Count | Details |
|---|---|---|---|
| AI Skills Library | `/ai_skills_library/` | **11,000+ files** | 23 source repos, 4 domains, 20 sub-categories |
| MCP Servers | `/mcps/` | **92 repositories** | 11 categories, 6 languages, every major service |
| IDE Rules | `/ide_rules/` | **2,200+ rule files** | All major frameworks + languages + stacks |
| System Prompts | `/system_prompts/` | **30+ repositories** | Leaked, guides, eval tools, guardrails |
| API Providers | `/api_providers/` | **12 providers, 50+ models** | Full pricing + SDKs + code examples |
| No-Code Platforms | `/nocode_platforms/` | **15 repositories** | 5 categories, 29 cloned directories |
| Public APIs | `/public_apis/` | **1,400+ APIs** | 40+ categories, auto-synced daily |
| AI Agents & Tooling | `/ai_agents/` | **15+ repositories** | Personal assistants, scraping, frameworks |
| Auto-Sync | `sync_manifest.json` | **55+ upstreams tracked** | Updated every 6h via VPS + GitHub Actions |
| **TOTAL** | - | **13,700+ files** | **The most comprehensive AI workspace on GitHub** |

---

## Disclaimer

All content in this archive is sourced from public GitHub repositories and official documentation pages. Leaked system prompts are included for **educational and research purposes only** -- to help developers understand how production AI systems are designed. Each included repository retains its original license as specified in its own LICENSE file. API pricing data reflects publicly listed rates at time of archiving and may change -- always verify current pricing with the official provider.

---

<div align="center">

**Built for AI developers who want everything in one place.**

*No subscriptions. No browser tabs. No gatekeeping.*

*Auto-synced every 6 hours. Always up-to-date. Always free.*

</div>
