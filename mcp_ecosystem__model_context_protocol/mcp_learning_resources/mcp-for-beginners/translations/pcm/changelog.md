# Changelog: MCP for Beginners Curriculum

Dis document na record of all di important changes wey dem make to di Model Context Protocol (MCP) for Beginners curriculum. Di changes dem dey put for reverse chronological order (newest changes first).

## July 2nd, 2026

### New Lesson: The 2026-07-28 MCP Specification Release Candidate

Dem add coverage of di upcoming `2026-07-28` MCP specification release candidate (wey dem announce May 21, 2026; final release dey schedule for July 28, 2026), wey dem summarize from di [official announcement blog post](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Di curriculum baseline still remain **MCP Specification 2025-11-25** until di new version launch, so na as forward-looking advice dem present am, no be rewrite of di existing lessons.

- **New**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — full lesson wey cover di stateless protocol core (wey involve removal of di `initialize` handshake and `Mcp-Session-Id`), di new `Mcp-Method`/`Mcp-Name` routing headers, `ttlMs`/`cacheScope` caching metadata, W3C Trace Context inside `_meta`, di formal Extensions framework (MCP Apps and di new Tasks extension), six authorization-hardening SEPs, di deprecation of Roots/Sampling/Logging, and di move to full JSON Schema 2020-12 for tool schemas.
- **Updated** with forward-looking callouts wey dey link to di new lesson:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protocol version note, Sampling/Roots/Logging/Tasks sections, and "Wetyn next"
  - [02-Security/README.md](./02-Security/README.md): authorization hardening callout
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): stateless transport callout
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling deprecation callout
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging deprecation and Tasks extension callout
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): stateless/session-routing callout
  - [README.md](./README.md): "Looking ahead" note for di specification section and a new `1.1` entry inside di curriculum module table
  - [study_guide.md](./study_guide.md): forward-looking bullet under di Core Concepts overview plus dated addendum note
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): callout on di `mcp-session-id` transport map ahead of di stateless request model
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): module overview callout on Root Contexts/Sampling deprecations and di Tasks extension
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): authorization hardening callout

## June 24th, 2026

### New Lesson: Using MCP for Copilot app

- [Tooling section](./12-tooling/README.md) Dem add tooling section.
- [MCP for Copilot app](./12-tooling/01-copilot-app/README.md)

## June 16, 2026

### MCP Specification Alignment & Sample Validation

Dem verify di curriculum against di current **MCP Specification 2025-11-25** and di latest official SDKs, den dem correct di remaining old specification references and confirm say di main samples still dey build and run well.

#### Specification Version Corrections (2025-06-18 / 2025-03-26 → 2025-11-25)

Dem update di English content where e still talk say older spec revision na di *current/latest* standard, and dem change di links to di main `modelcontextprotocol.io` spec paths:
- **05-AdvancedTopics/mcp-security/README.md**: Updated di "Current Standard" banner, introduction, core security principles heading, mandatory requirements heading, Microsoft Entra ID section, References & Resources links, and closing security notice (8 references) to 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Updated Additional Resources spec link and "Current Standard" banner to 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Replace old `2025-03-26` security-and-trust link with di current 2025-11-25 security best practices page
- **03-GettingStarted/14-sampling/README.md**: Update di official sampling docs link to 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Update di present-tense "current MCP specification" reference and Additional Resources spec link to 2025-11-25 (leave historical SSE-deprecation notes as e be for accuracy)

#### Sample Validation Against Current SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolve `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pass with no type errors — di existing `McpServer`/`StdioServerTransport` APIs still dey valid
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validate inside isolated `.venv` with `mcp[cli]` (1.27.2); `py_compile` pass and `FastMCP.list_tools()` return am well di `add` and `subtract` tools
- Confirm say all sample `@modelcontextprotocol/sdk` version ranges (`>=1.26.0` / `^1.26.0` / `^1.27.0`) resolve clean to di current `1.29.0` with no breaking API changes

#### Dependency Pin Alignment (close version gaps)

Dem bump outdated SDK pins so every sample go follow di current MCP release, as di repo-wide convention be:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Bump `@modelcontextprotocol/sdk` from `^1.8.0` → `>=1.26.0` and update di old `"updated for MCP 2025-06-18"` package description to `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** and **lab4/code/github_mcp_server/pyproject.toml**: Bump exact pin `mcp==1.23.0` → `mcp>=1.26.0`; regenerate both `uv.lock` files (`uv lock`) so di lockfiles resolve to di current `mcp 1.27.2` and stay synchronized with di manifests

#### Curriculum Gap Analysis — Latest Spec Feature Coverage

Dem confirm say di curriculum don already cover all di primitives wey MCP 2025-11-25 introduce or expand, so no content gap remain:
- **Sampling**: Lesson 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (incl. URL mode)**: Document for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Document for 00-Introduction, 01-CoreConcepts, and 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimental, long-running operations)**: Document for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Document for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features

### Security Hardening & Dependency Vulnerability Remediation

Dem run full security check for every dependency manifest and di sample source code, then dem fix all reported npm advisories and one code-level issue. After dem fix am, `npm audit` report say **0 vulnerabilities** for every audited directory.

#### npm Dependency Vulnerabilities (transitive) — Fixed

Dem audit all 15 committed `package-lock.json` files. Di vulnerabilities limit to di transitive dependencies wey MCP Inspector dev tool, OpenAI client, and MCP SDK carry come; all dem don resolve without breaking di samples:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** and **lab3/code/weather_mcp/inspector**: Bump `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), weh clear di bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` and `ws` advisories. Add npm `overrides` entry wey force patched `shell-quote@1.8.4` to remove di last critical advisory from `concurrently`; regenerate both lockfiles (now 0 vulnerabilities)
- **03-GettingStarted/samples/typescript**: `npm audit fix` update the transitive `qs` (moderate) to patched release
- **03-GettingStarted/samples/javascript**: `npm audit fix` update di transitive `hono` (moderate) to patched release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` update di transitive `form-data` (high) to patched release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generate di missing `package-lock.json` so di project fit reproduce and audit (0 vulnerabilities)

#### Code-Level Security Fix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Remove `shell=True` from di `open_in_vscode` tool. Di old `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` fit allow shell metacharacters for folder path make cmd.exe interpret am (this na command-injection vector). Now e just open di resolved `Code.exe` direct with di folder as argument — no shell — and this na equivalent and safe.

#### Python Dependency Audit

- Dem audit every Python requirements set with `pip-audit`. `05-AdvancedTopics` and `03-GettingStarted/samples/python` report say **no known vulnerabilities** (their `mcp` / `httpx` / `pydantic` / `python-dotenv` versions resolve to current patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flag di transitive dependency **`werkzeug` 3.1.1** with three `safe_join` Windows device-name DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, and `CVE-2026-27199` (all fix for 3.1.6). Add explicit security pin `werkzeug>=3.1.6` so di patched release fit resolve; confirm say di constraint resolve well with `chainlit` / `mcp` / `semantic-kernel` stack

### Product Name Rebranding

Dem update all curriculum content to reflect say Microsoft don change di product name:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Update Discord community link
- **AGENTS.md**: Update Discord server reference
- **README.md**: Update technology ecosystem references
- **study_guide.md**: Update case study references
- **05-AdvancedTopics/README.md**: Update Module 5.13 title and description
- **05-AdvancedTopics/mcp-integration/README.md**: Update section header and description
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Full module title and content update
- **05-AdvancedTopics/mcp-security-entra/README.md**: Update cross-reference link
- **07-LessonsfromEarlyAdoption/README.md**: Update case study references
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Update Section 9 header, badges, and capabilities
- **08-BestPractices/README.md**: Update Discord community link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Update Discord channel reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Update model deployment reference
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Update AI Services table
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Update resource references

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Update main curriculum references
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Update module title, overview, and all module headers
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Update title, learning objectives, setup instructions, and resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Update title, learning objectives, MCP hosts table, and cross-references
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Update title, badges, prerequisites, and resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Update Agent Builder references and feedback link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Update prerequisites and extension references

---

## April 11, 2026

### New Lesson, Documentation Fixes, and Dependency Updates

#### New Curriculum Content Added

**Module 05 - Advanced Topics**
- **Lesson 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): New complete guide wey cover adversarial debate pattern for multi-agent systems
  - Mermaid architecture diagram: two agents → shared MCP server → debate transcript → judge → verdict
  - Shared MCP tool server (`web_search` + `run_python`) wey e implement for Python and TypeScript
  - Opposing system prompts (FOR / AGAINST / Judge) with clear tool-use requirements
  - Debate orchestrator for Python, TypeScript, and C# wey dey manage rounds and route arguments
  - MCP `ClientSession` wiring for the orchestrator to real tool calls
  - Use-case table (hallucination detection, threat modeling, API design review, factual verification, tech selection)
  - Security considerations: sandboxed execution, tool-call validation, rate limiting, audit logging
  - Structured exercise with three practical scenarios (code review, architecture decision, content moderation)

#### Documentation Fixes

**Module 03 - Getting Started**
- **05-stdio-server/README.md**: Fix incomplete TypeScript stdio server example — add missing transport instantiation (`new StdioServerTransport()`) and `server.connect(transport)` call to match Python and .NET examples for the same section
- **14-sampling/README.md**: Fix typo — correct `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum Updates

**Main README.md**
- Add entry 5.17 (Adversarial Multi-Agent Reasoning with MCP) to the curriculum table with direct link to the new lesson

**05-AdvancedTopics/README.md**
- Add Lesson 5.17 row to the lessons table

**study_guide.md**
- Add Adversarial Multi-Agent Reasoning topic to the mind-map and prose description of Advanced Topics

#### Code and Security Fixes

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Security fix — command injection**: Replace `execSync` shell interpolation with `execFile` + `promisify` inside TypeScript `run_python` tool, remove command injection surface (LLM-controlled code now dey pass as literal argv element with no shell involvement)
- **MCP tool loop wiring**: Update Python debate orchestrator to use `AsyncAnthropic` client (replace blocking sync `Anthropic`), pass live `ClientSession` directly to each agent turn, fetch tool definitions via `session.list_tools()` each turn, and dispatch `tool_use` blocks via `session.call_tool()` in loop until model give final text response

#### Dependency Updates

- Bump `hono` to 4.12.12 across multiple packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Bump `@hono/node-server` from 1.19.11 to 1.19.13 in TypeScript packages
- Bump `cryptography` from 46.0.5 to 46.0.7 in Python packages (10-StreamliningAIWorkflows labs 3 and 4)
- Bump `lodash` from 4.17.23 to 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Translations

- Sync translations for 48+ languages with latest source changes (i18n update)

---

## February 5, 2026

### Repository-Wide Validation and Navigation Improvements

#### New Curriculum Content Added

**Module 03 - Getting Started**
- **12-mcp-hosts/README.md**: New complete guide for setup of MCP hosts
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf configuration examples
  - JSON configuration templates for all major hosts
  - Transport types comparison table (stdio, SSE/HTTP, WebSocket)
  - Troubleshooting common connection issues
  - Security best practices for host configuration

- **13-mcp-inspector/README.md**: New debugging guide for MCP Inspector
  - Installation methods (npx, npm global, from source)
  - Connect to servers via stdio and HTTP/SSE
  - Testing tools, resources, and prompt workflows
  - VS Code integration with MCP Inspector
  - Common debugging scenarios with solutions

**Module 04 - Practical Implementation**
- **pagination/README.md**: New pagination implementation guide
  - Cursor-based pagination patterns for Python, TypeScript, Java
  - Client-side pagination handling
  - Cursor design strategies (opaque vs. structured)
  - Performance optimization recommendations

**Module 05 - Advanced Topics**
- **mcp-protocol-features/README.md**: New protocol features deep dive
  - Progress notifications implementation
  - Request cancellation patterns
  - Resource templates with URI patterns
  - Server lifecycle management
  - Logging level control
  - Error handling patterns with JSON-RPC codes

#### Navigation Fixes (24+ files updated)

**Main Module READMEs**
 Now links to both first lesson AND next module

**02-Security Sub-files**
- All 5 extra security documents now get "What's Next" navigation:

**09-CaseStudy Files**
- All case study files now get sequential navigation:

**10-StreamliningAI Labs**
Add "What's Next" section to Module 10 overview and Module 11

#### Code and Content Fixes

**SDK and Dependency Updates**
Fix empty openai version to `^4.95.0`
Update SDK from `^1.8.0` to `>=1.26.0`
Update mcp version pins to `>=1.26.0`

**Code Fixes**
Fix invalid model `gpt-4o-mini` to `gpt-4.1-mini`

**Content Fixes**
Fix broken link `READMEmd` → `README.md`, fix curriculum header `Module 1-3` → `Module 0-3`, fix case-sensitive path
Remove corrupted duplicate Case Study 5 content

**Beginner Guidance Improvements**
Add proper introduction, learning objectives, and prerequisites for beginners

#### Curriculum Updates

**Main README.md**
- Add entries 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) to curriculum table

**Module READMEs**
Add lessons 12 and 13 to lesson list
Add Practical Guides section with pagination link
Add lessons 5.15 (Custom Transport) and 5.16 (Protocol Features)

**study_guide.md**
- Update mindmap with all new topics: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Jan 28, 2026

### MCP Specification 2025-11-25 Compliance Review

#### Core Concepts Enhancement (01-CoreConcepts/)
- **New Client Primitive - Roots**: Add complete documentation on Roots client primitive, wey allow servers understand filesystem boundaries and access permissions
- **Tool Annotations**: Add documentation on tool behavioral annotations (`readOnlyHint`, `destructiveHint`) for better tool execution decisions
- **Tool Calling in Sampling**: Update Sampling documentation to include `tools` and `toolChoice` parameters for model-driven tool invocation during sampling requests
- **URL Mode Elicitation**: Add documentation on URL-based elicitation for server-initiated external web interactions
- **Tasks (Experimental)**: Add new section documenting experimental Tasks feature for durable execution wrappers and deferred result retrieval
- **Icons Support**: Note say tools, resources, resource templates, and prompts fit now include icons as extra metadata

#### Documentation Updates
- **README.md**: Add MCP Specification 2025-11-25 version reference and date-based versioning explanation
- **study_guide.md**: Update curriculum map to include Tasks and Tool Annotations in Core Concepts section; update document timestamp

#### Specification Compliance Verification
- **Protocol Version**: Verify all documentation reference current MCP Specification 2025-11-25
- **Architecture Alignment**: Confirm two-layer architecture (Data Layer + Transport Layer) documentation accuracy
- **Primitives Documentation**: Validate server primitives (Resources, Prompts, Tools) and client primitives (Sampling, Elicitation, Logging, Roots)
- **Transport Mechanisms**: Verify STDIO and Streamable HTTP transport documentation accuracy
- **Security Guidance**: Confirm alignment with current MCP Security Best Practices documentation

#### Key MCP 2025-11-25 Features Documented
- **OpenID Connect Discovery**: Auth server discovery through OIDC
- **OAuth Client ID Metadata Documents**: Recommended client registration mechanism
- **JSON Schema 2020-12**: Default dialect for MCP schema definitions
- **SDK Tiering System**: Formalized requirements for SDK feature support and maintenance
- **Governance Structure**: Formalized Working Groups and Interest Groups in MCP governance

### Security Documentation Major Update (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **New Hands-On Training Resource**: Add complete integration with [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) for all security documentation
- **Expedition Route Coverage**: Document full camp-to-camp progression from Base Camp to Summit
- **OWASP Alignment**: All security guidance now map to OWASP MCP Azure Security Guide risks

#### OWASP MCP Top 10 Integration
- **New Section**: Add OWASP MCP Top 10 Security Risks table with Azure mitigations to main Security README
- **Risk-Based Documentation**: Update mcp-security-controls-2025.md with OWASP MCP risk references for each security domain
- **Reference Architecture**: Link to OWASP MCP Azure Security Guide reference architecture and implementation patterns

#### Updated Security Files
- **README.md**: Add Sherpa Workshop overview, expedition route table, OWASP MCP Top 10 risks summary, and hands-on training section
- **mcp-security-controls-2025.md**: Update header to February 2026, add OWASP risk references (MCP01-MCP08), fix spec version inconsistency
- **mcp-security-best-practices-2025.md**: Add Sherpa and OWASP resources section, update timestamp
- **mcp-best-practices.md**: Add hands-on training section with Sherpa and OWASP links
- **azure-content-safety-implementation.md**: Add OWASP MCP06 reference, Sherpa Camp 3 alignment, and additional resources section

#### New Resource Links Added
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individual OWASP MCP risk pages (MCP01-MCP10)

### Curriculum-Wide MCP Specification 2025-11-25 Alignment

#### Module 03 - Getting Started
- **SDK Documentation**: Add Go SDK to official SDK list; update all SDK references to align with MCP Specification 2025-11-25
- **Transport Clarification**: Update STDIO and HTTP Streaming transport descriptions with explicit spec references

#### Module 04 - Practical Implementation
- **SDK Updates**: Add Go SDK; update SDK list with specification version reference
- **Authorization Spec**: Update MCP Authorization specification link to current 2025-11-25 version

#### Module 05 - Advanced Topics
- **New Features**: Add note about new MCP Specification 2025-11-25 features (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Security Resources**: Add OWASP MCP Top 10 and Sherpa workshop links to additional references

#### Module 06 - Community Contributions
- **SDK List**: Add Swift and Rust SDKs; update specification link to 2025-11-25
- **Spec Reference**: Update MCP Specification link to direct specification URL

#### Module 07 - Lessons from Early Adoption
- **Resource Updates**: Add MCP Specification 2025-11-25 link an OWASP MCP Top 10 go inside additional resources

#### Module 08 - Best Practices
- **Spec Version**: Update MCP Specification reference go 2025-11-25
- **Security Resources**: Add OWASP MCP Top 10 an Sherpa workshop go additional references

#### Module 10 - Streamlining AI Workflows
- **Badge Update**: Change MCP version badge from SDK version (1.9.3) go specification version (2025-11-25)
- **Resource Links**: Update MCP Specification link; add OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Spec Reference**: Update MCP Specification link go 2025-11-25 version
- **Security Resources**: Add OWASP MCP Top 10 go official resources

## December 18, 2025

### Security Documentation Update - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specification Version Update
- **Protocol Version Update**: Update to reference latest MCP Specification 2025-11-25 (wey dem release November 25, 2025)
  - Update all specification version references from 2025-06-18 go 2025-11-25
  - Update document date references from August 18, 2025 go December 18, 2025
  - Confirm say all specification URLs dey point to current documentation
- **Content Validation**: Full validation of security best practices against latest standards
  - **Microsoft Security Solutions**: Confirm say current terminology an links for Prompt Shields (wey dem bin call "Jailbreak risk detection" before), Azure Content Safety, Microsoft Entra ID, an Azure Key Vault
  - **OAuth 2.1 Security**: Confirm say e dey follow latest OAuth security best practices well well
  - **OWASP Standards**: Confirm OWASP Top 10 for LLMs references still current
  - **Azure Services**: Confirm all Microsoft Azure documentation links an best practices correct
- **Standards Alignment**: Confirm say all referenced security standards dey current
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure security an compliance frameworks
- **Implementation Resources**: Confirm say all implementation guide links an resources dey correct
  - Azure API Management authentication patterns
  - Microsoft Entra ID integration guides
  - Azure Key Vault secrets management
  - DevSecOps pipelines an monitoring solutions

### Documentation Quality Assurance
- **Specification Compliance**: Confirm say all mandatory MCP security requirements (MUST/MUST NOT) dey align with latest specification
- **Resource Currency**: Confirm say all external links to Microsoft documentation, security standards, an implementation guides correct
- **Best Practices Coverage**: Confirm say e cover well authentication, authorization, AI-specific threats, supply chain security, an enterprise patterns

## October 6, 2025

### Getting Started Section Expansion – Advanced Server Usage & Simple Authentication

#### Advanced Server Usage (03-GettingStarted/10-advanced)
- **New Chapter Added**: Show full guide on advanced MCP server usage, cover both regular an low-level server architectures.
  - **Regular vs. Low-Level Server**: Detailed comparison an code examples inside Python an TypeScript for both ways.
  - **Handler-Based Design**: Explain handler-based tool/resource/prompt management wey fit scale an flexible for server implementations.
  - **Practical Patterns**: Real-world example dem wey low-level server patterns dey useful for advanced features an architecture.

#### Simple Authentication (03-GettingStarted/11-simple-auth)
- **New Chapter Added**: Step-by-step guide to implement simple authentication inside MCP servers.
  - **Auth Concepts**: Clear explanation for authentication vs. authorization, an how dem handle credentials.
  - **Basic Auth Implementation**: Middleware-based authentication patterns for Python (Starlette) an TypeScript (Express), with code samples.
  - **Progression to Advanced Security**: Guide on how to start with simple auth an move go OAuth 2.1 an RBAC, plus references to advanced security modules.

These additions go give practical hands-on guidance to build better, secure, an flexible MCP server implementations, join foundational concepts with advanced production patterns.

## September 29, 2025

### MCP Server Database Integration Labs - Comprehensive Hands-On Learning Path

#### 11-MCPServerHandsOnLabs - New Complete Database Integration Curriculum
- **Complete 13-Lab Learning Path**: Add full hands-on curriculum for build production-ready MCP servers with PostgreSQL database integration
  - **Real-World Implementation**: Zava Retail analytics case wey show enterprise-grade patterns
  - **Structured Learning Progression**:
    - **Labs 00-03: Foundations** - Introduction, Core Architecture, Security & Multi-Tenancy, Environment Setup
    - **Labs 04-06: Building the MCP Server** - Database Design & Schema, MCP Server Implementation, Tool Development  
    - **Labs 07-09: Advanced Features** - Semantic Search Integration, Testing & Debugging, VS Code Integration
    - **Labs 10-12: Production & Best Practices** - Deployment Strategies, Monitoring & Observability, Best Practices & Optimization
  - **Enterprise Technologies**: FastMCP framework, PostgreSQL with pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Advanced Features**: Row Level Security (RLS), semantic search, multi-tenant data access, vector embeddings, real-time monitoring

#### Terminology Standardization - Module to Lab Conversion
- **Comprehensive Documentation Update**: Systematically update all README files for 11-MCPServerHandsOnLabs to use "Lab" terminology instead of "Module"
  - **Section Headers**: Update "What This Module Covers" go "What This Lab Covers" for all 13 labs
  - **Content Description**: Change "This module provides..." go "This lab provides..." inside documentation
  - **Learning Objectives**: Update "By the end of this module..." go "By the end of this lab..."
  - **Navigation Links**: Change all "Module XX:" references go "Lab XX:" for cross-references an navigation
  - **Completion Tracking**: Update "After completing this module..." go "After completing this lab..."
  - **Preserved Technical References**: Keep Python module references inside configuration files (e.g., `"module": "mcp_server.main"`)

#### Study Guide Enhancement (study_guide.md)
- **Visual Curriculum Map**: Add new "11. Database Integration Labs" section with full lab structure visualization
- **Repository Structure**: Update from ten to eleven main sections with detailed 11-MCPServerHandsOnLabs description
- **Learning Path Guidance**: Improve navigation instructions to cover sections 00-11
- **Technology Coverage**: Add FastMCP, PostgreSQL, Azure services integration details
- **Learning Outcomes**: Show production-ready server development, database integration patterns, an enterprise security

#### Main README Structure Enhancement
- **Lab-Based Terminology**: Update main README.md for 11-MCPServerHandsOnLabs to always use "Lab" structure
- **Learning Path Organization**: Clear pass from foundational concepts through advanced implementation go production deployment
- **Real-World Focus**: Emphasis on practical hands-on learning with enterprise-grade patterns an technologies

### Documentation Quality & Consistency Improvements
- **Hands-On Learning Emphasis**: Strong practical, lab-based approach through documentation
- **Enterprise Patterns Focus**: Show production-ready implementations an enterprise security matters
- **Technology Integration**: Full coverage of modern Azure services an AI integration patterns
- **Learning Progression**: Clear, structured pass from basic concepts go production deployment

## September 26, 2025

### Case Studies Enhancement - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Ecosystem Development Focus
- **README.md**: Big expansion with full GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: New full case study wey look GitHub MCP Registry launch for September 2025
    - **Problem Analysis**: Detail check for fragmented MCP server discovery an deployment wahala
    - **Solution Architecture**: GitHub centralized registry approach wey get one-click VS Code installation
    - **Business Impact**: Measurable beta on developer onboarding an productivity
    - **Strategic Value**: Focus on modular agent deployment an cross-tool interoperability
    - **Ecosystem Development**: Position am as foundational platform for agentic integration
  - **Enhanced Case Study Structure**: Update all seven case studies with uniform format an full descriptions
    - Azure AI Travel Agents: Multi-agent orchestration focus
    - Azure DevOps Integration: Workflow automation matter
    - Real-Time Documentation Retrieval: Python console client implementation
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: VS Code an GitHub Copilot integration
    - Azure API Management: Enterprise API integration patterns
    - GitHub MCP Registry: Ecosystem development an community platform
  - **Comprehensive Conclusion**: Rework conclusion section highlight seven case studies wey cover different MCP implementation sides
    - Enterprise Integration, Multi-Agent Orchestration, Developer Productivity
    - Ecosystem Development, Educational Applications categories
    - Better insight into architectural patterns, implementation strategies, an best practices
    - Emphasis on MCP as mature, production-ready protocol

#### Study Guide Updates (study_guide.md)
- **Visual Curriculum Map**: Update mindmap to add GitHub MCP Registry for Case Studies section
- **Case Studies Description**: Upgrade from generic comments to detailed breakdown of seven big case studies
- **Repository Structure**: Update section 10 to show full case study content with implementation details
- **Changelog Integration**: Add September 26, 2025 entry wey talk GitHub MCP Registry addition an case study updates
- **Date Updates**: Update footer timestamp to show latest revision (September 26, 2025)

### Documentation Quality Improvements
- **Consistency Enhancement**: Standardize case study formatting an structure for all seven examples
- **Comprehensive Coverage**: Case studies now cover enterprise, developer productivity, an ecosystem development situations
- **Strategic Positioning**: Better focus on MCP as foundational platform for agentic system deployment
- **Resource Integration**: Update additional resources to include GitHub MCP Registry link

## September 15, 2025

### Advanced Topics Expansion - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - New Advanced Implementation Guide
- **README.md**: Complete guide to custom MCP transport mechanisms
  - **Azure Event Grid Transport**: Full serverless event-driven transport implementation
    - C#, TypeScript, an Python examples with Azure Functions integration
    - Event-driven architecture patterns for scalable MCP solutions
    - Webhook receivers an push-based message handling
  - **Azure Event Hubs Transport**: High-throughput streaming transport implementation
    - Real-time streaming power for low-latency use cases
    - Partitioning strategies an checkpoint management
    - Message batching an performance optimization
  - **Enterprise Integration Patterns**: Production-ready architectural examples
    - Distributed MCP processing across many Azure Functions
    - Hybrid transport architectures wey combine many transport types
    - Message durability, reliability, an error handling strategies
  - **Security & Monitoring**: Azure Key Vault integration an observability patterns
    - Managed identity authentication an least privilege access
    - Application Insights telemetry an performance monitoring
    - Circuit breakers an fault tolerance patterns
  - **Testing Frameworks**: Full testing strategies for custom transports
    - Unit testing with test doubles an mocking frameworks
    - Integration testing with Azure Test Containers
    - Performance an load testing ideas

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Emerging AI Discipline
- **README.md**: Full exploration of context engineering as new field
  - **Core Principles**: Complete context sharing, action decision awareness, an context window management
  - **MCP Protocol Alignment**: How MCP design dey face context engineering challenges
    - Context window limits an progressive loading strategies
    - Relevance determination an dynamic context retrieval
    - Multi-modal context handling an security considerations
  - **Implementation Approaches**: Single-threaded vs. multi-agent architectures
    - Context chunking an prioritization ways
    - Progressive context loading an compression approaches
    - Layered context approaches an retrieval optimization
  - **Measurement Framework**: New metrics for context effectiveness evaluation
    - Input efficiency, performance, quality, an user experience matters
    - Experimental ways to context optimization
    - Failure analysis an improvement methods

#### Curriculum Navigation Updates (README.md)
- **Enhanced Module Structure**: Update curriculum table to add new advanced topics
  - Add Context Engineering (5.14) an Custom Transport (5.15) entries
  - Consistent formatting an navigation links across all modules
  - Update descriptions to show current content range

### Directory Structure Improvements
- **Naming Standardization**: Rename "mcp transport" go "mcp-transport" to match other advanced topic folders
- **Content Organization**: All 05-AdvancedTopics folders now follow same naming pattern (mcp-[topic])

### Documentation Quality Enhancements
- **MCP Specification Alignment**: All new content reference current MCP Specification 2025-06-18
- **Multi-Language Examples**: Complete code examples for C#, TypeScript, an Python
- **Enterprise Focus**: Production-ready patterns and Azure cloud integration throughout
- **Visual Documentation**: Mermaid diagrams for architecture and flow visualization

## August 18, 2025

### Documentation Comprehensive Update - MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) - Complete Modernization
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Complete rewrite aligned with MCP Specification 2025-06-18
  - **Mandatory Requirements**: Added explicit MUST/MUST NOT requirements from official specification with clear visual indicators
  - **12 Core Security Practices**: Restructured from 15-item list to comprehensive security domains
    - Token Security & Authentication with external identity provider integration
    - Session Management & Transport Security with cryptographic requirements
    - AI-Specific Threat Protection with Microsoft Prompt Shields integration
    - Access Control & Permissions with principle of least privilege
    - Content Safety & Monitoring with Azure Content Safety integration
    - Supply Chain Security with comprehensive component verification
    - OAuth Security & Confused Deputy Prevention with PKCE implementation
    - Incident Response & Recovery with automated capabilities
    - Compliance & Governance with regulatory alignment
    - Advanced Security Controls with zero trust architecture
    - Microsoft Security Ecosystem Integration with comprehensive solutions
    - Continuous Security Evolution with adaptive practices
  - **Microsoft Security Solutions**: Enhanced integration guidance for Prompt Shields, Azure Content Safety, Entra ID, and GitHub Advanced Security
  - **Implementation Resources**: Categorized comprehensive resource links by Official MCP Documentation, Microsoft Security Solutions, Security Standards, and Implementation Guides

#### Advanced Security Controls (02-Security/) - Enterprise Implementation
- **MCP-SECURITY-CONTROLS-2025.md**: Complete overhaul with enterprise-grade security framework
  - **9 Comprehensive Security Domains**: Expanded from basic controls to detailed enterprise framework
    - Advanced Authentication & Authorization with Microsoft Entra ID integration
    - Token Security & Anti-Passthrough Controls with comprehensive validation
    - Session Security Controls with hijacking prevention
    - AI-Specific Security Controls with prompt injection and tool poisoning prevention
    - Confused Deputy Attack Prevention with OAuth proxy security
    - Tool Execution Security with sandboxing and isolation
    - Supply Chain Security Controls with dependency verification
    - Monitoring & Detection Controls with SIEM integration
    - Incident Response & Recovery with automated capabilities
  - **Implementation Examples**: Added detailed YAML configuration blocks and code examples
  - **Microsoft Solutions Integration**: Comprehensive coverage of Azure security services, GitHub Advanced Security, and enterprise identity management

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) - Production-Ready Implementation
- **README.md**: Complete rewrite for enterprise security implementation
  - **Current Specification Alignment**: Updated to MCP Specification 2025-06-18 with mandatory security requirements
  - **Enhanced Authentication**: Microsoft Entra ID integration with comprehensive .NET and Java Spring Security examples
  - **AI Security Integration**: Microsoft Prompt Shields and Azure Content Safety implementation with detailed Python examples
  - **Advanced Threat Mitigation**: Comprehensive implementation examples for
    - Confused Deputy Attack Prevention with PKCE and user consent validation
    - Token Passthrough Prevention with audience validation and secure token management
    - Session Hijacking Prevention with cryptographic binding and behavioral analysis
  - **Enterprise Security Integration**: Azure Application Insights monitoring, threat detection pipelines, and supply chain security
  - **Implementation Checklist**: Clear mandatory vs. recommended security controls with Microsoft security ecosystem benefits

### Documentation Quality & Standards Alignment
- **Specification References**: Updated all references to current MCP Specification 2025-06-18
- **Microsoft Security Ecosystem**: Enhanced integration guidance throughout all security documentation
- **Practical Implementation**: Added detailed code examples in .NET, Java, and Python with enterprise patterns
- **Resource Organization**: Comprehensive categorization of official documentation, security standards, and implementation guides
- **Visual Indicators**: Clear marking of mandatory requirements vs. recommended practices


#### Core Concepts (01-CoreConcepts/) - Complete Modernization
- **Protocol Version Update**: Updated to reference current MCP Specification 2025-06-18 with date-based versioning (YYYY-MM-DD format)
- **Architecture Refinement**: Enhanced descriptions of Hosts, Clients, and Servers to reflect current MCP architecture patterns
  - Hosts now clearly defined as AI applications coordinating multiple MCP client connections
  - Clients described as protocol connectors maintaining one-to-one server relationships
  - Servers enhanced with local vs. remote deployment scenarios
- **Primitive Restructuring**: Complete overhaul of server and client primitives
  - Server Primitives: Resources (data sources), Prompts (templates), Tools (executable functions) with detailed explanations and examples
  - Client Primitives: Sampling (LLM completions), Elicitation (user input), Logging (debugging/monitoring)
  - Updated with current discovery (`*/list`), retrieval (`*/get`), and execution (`*/call`) method patterns
- **Protocol Architecture**: Introduced two-layer architecture model
  - Data Layer: JSON-RPC 2.0 foundation with lifecycle management and primitives
  - Transport Layer: STDIO (local) and Streamable HTTP with SSE (remote) transport mechanisms
- **Security Framework**: Comprehensive security principles including explicit user consent, data privacy protection, tool execution safety, and transport layer security
- **Communication Patterns**: Updated protocol messages to show initialization, discovery, execution, and notification flows
- **Code Examples**: Refreshed multi-language examples (.NET, Java, Python, JavaScript) to reflect current MCP SDK patterns

#### Security (02-Security/) - Comprehensive Security Overhaul  
- **Standards Alignment**: Full alignment with MCP Specification 2025-06-18 security requirements
- **Authentication Evolution**: Documented evolution from custom OAuth servers to external identity provider delegation (Microsoft Entra ID)
- **AI-Specific Threat Analysis**: Enhanced coverage of modern AI attack vectors
  - Detailed prompt injection attack scenarios with real-world examples
  - Tool poisoning mechanisms and "rug pull" attack patterns
  - Context window poisoning and model confusion attacks
- **Microsoft AI Security Solutions**: Comprehensive coverage of Microsoft security ecosystem
  - AI Prompt Shields with advanced detection, spotlighting, and delimiter techniques
  - Azure Content Safety integration patterns
  - GitHub Advanced Security for supply chain protection
- **Advanced Threat Mitigation**: Detailed security controls for
  - Session hijacking with MCP-specific attack scenarios and cryptographic session ID requirements
  - Confused deputy problems in MCP proxy scenarios with explicit consent requirements
  - Token passthrough vulnerabilities with mandatory validation controls
- **Supply Chain Security**: Expanded AI supply chain coverage including foundation models, embeddings services, context providers, and third-party APIs
- **Foundation Security**: Enhanced integration with enterprise security patterns including zero trust architecture and Microsoft security ecosystem
- **Resource Organization**: Categorized comprehensive resource links by type (Official Docs, Standards, Research, Microsoft Solutions, Implementation Guides)

### Documentation Quality Improvements
- **Structured Learning Objectives**: Enhanced learning objectives with specific, actionable outcomes 
- **Cross-References**: Added links between related security and core concept topics
- **Current Information**: Updated all date references and specification links to current standards
- **Implementation Guidance**: Added specific, actionable implementation guidelines throughout both sections

## July 16, 2025

### README and Navigation Improvements
- Completely redesigned the curriculum navigation in README.md
- Replaced `<details>` tags with more accessible table-based format
- Created alternative layout options in new "alternative_layouts" folder
- Added card-based, tabbed-style, and accordion-style navigation examples
- Updated repository structure section to include all latest files
- Enhanced "How to Use This Curriculum" section with clear recommendations
- Updated MCP specification links to point to correct URLs
- Added Context Engineering section (5.14) to the curriculum structure

### Study Guide Updates
- Completely revised the study guide to align with current repository structure
- Added new sections for MCP Clients and Tools, and Popular MCP Servers
- Updated the Visual Curriculum Map to accurately reflect all topics
- Enhanced descriptions of Advanced Topics to cover all specialized areas
- Updated Case Studies section to reflect actual examples
- Added this comprehensive changelog

### Community Contributions (06-CommunityContributions/)
- Added detailed information about MCP servers for image generation
- Added comprehensive section on using Claude in VSCode
- Added Cline terminal client setup and usage instructions
- Updated MCP client section to include all popular client options
- Enhanced contribution examples with more accurate code samples

### Advanced Topics (05-AdvancedTopics/)
- Organized all specialized topic folders with consistent naming
- Added context engineering materials and examples
- Added Foundry agent integration documentation
- Enhanced Entra ID security integration documentation

## June 11, 2025

### Initial Creation
- Released first version of the MCP for Beginners curriculum
- Created basic structure for all 10 main sections
- Implemented Visual Curriculum Map for navigation
- Added initial sample projects in multiple programming languages

### Getting Started (03-GettingStarted/)
- Created first server implementation examples
- Added client development guidance
- Included LLM client integration instructions
- Added VS Code integration documentation
- Implemented Server-Sent Events (SSE) server examples

### Core Concepts (01-CoreConcepts/)
- Added detailed explanation of client-server architecture
- Created documentation on key protocol components
- Documented messaging patterns in MCP

## May 23, 2025

### Repository Structure
- Initialized the repository with basic folder structure
- Created README files for each major section
- Set up translation infrastructure
- Added image assets and diagrams

### Documentation
- Created initial README.md with curriculum overview
- Added CODE_OF_CONDUCT.md and SECURITY.md
- Set up SUPPORT.md with guidance for getting help
- Created preliminary study guide structure

## April 15, 2025

### Planning and Framework
- Initial planning for MCP for Beginners curriculum
- Defined learning objectives and target audience
- Outlined 10-section structure of the curriculum
- Developed conceptual framework for examples and case studies
- Created initial prototype examples for key concepts

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->