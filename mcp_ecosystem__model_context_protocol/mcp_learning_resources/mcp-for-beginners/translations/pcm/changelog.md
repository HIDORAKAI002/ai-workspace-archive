# Changelog: MCP for Beginners Curriculum

Dis dokument na record of all big changes wey dem make for Model Context Protocol (MCP) for Beginners curriculum. Dem dey document changes for reverse chronological order (newest changes first).

## June 16, 2026

### MCP Specification Alignment & Sample Validation

We validate di curriculum against di current **MCP Specification 2025-11-25** and di latest official SDKs, then we correct di remaining stale specification references and confirm say di core samples still dey build and run.

#### Specification Version Corrections (2025-06-18 / 2025-03-26 → 2025-11-25)

We update English content wey still talk say older spec revision na *current/latest* standard, and we repoint links to di canonical `modelcontextprotocol.io` spec paths:
- **05-AdvancedTopics/mcp-security/README.md**: We update di "Current Standard" banner, introduction, core security principles heading, mandatory requirements heading, Microsoft Entra ID section, References & Resources links, and closing security notice (8 references) to 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: We update di Additional Resources spec link and di "Current Standard" banner to 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: We replace di outdated `2025-03-26` security-and-trust link with di current 2025-11-25 security best practices page
- **03-GettingStarted/14-sampling/README.md**: We update di official sampling docs link to 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: We update di present-tense "current MCP specification" reference and di Additional Resources spec link to 2025-11-25 (historical SSE-deprecation notes dey intact for accuracy)

#### Sample Validation Against Current SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolve `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pass with no type errors — existing `McpServer`/`StdioServerTransport` APIs still valid
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validate am inside separate `.venv` with `mcp[cli]` (1.27.2); `py_compile` pass and `FastMCP.list_tools()` correctly return di `add` and `subtract` tools
- Confirm say all sample `@modelcontextprotocol/sdk` version ranges (`>=1.26.0` / `^1.26.0` / `^1.27.0`) dey resolve clear to di current `1.29.0` with no breaking API changes

#### Dependency Pin Alignment (closing version gaps)

We bump outdated SDK pins so every sample go dey track di current MCP release, matching di repo-wide convention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Bump `@modelcontextprotocol/sdk` from `^1.8.0` → `>=1.26.0` and update di stale `"updated for MCP 2025-06-18"` package description to `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** and **lab4/code/github_mcp_server/pyproject.toml**: Bump di exact pin `mcp==1.23.0` → `mcp>=1.26.0`; regenerate both `uv.lock` files (`uv lock`) so di lockfiles go resolve to di current `mcp 1.27.2` and stay in sync with di manifests

#### Curriculum Gap Analysis — Latest Spec Feature Coverage

We verify say di curriculum don already cover all di primitives wey dem introduce/expand for MCP 2025-11-25, so no content gaps remain:
- **Sampling**: Lesson 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (including URL mode)**: Documented for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documented for 00-Introduction, 01-CoreConcepts, and 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimental, long-running operations)**: Documented for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Documented for 01-CoreConcepts and 05-AdvancedTopics/mcp-protocol-features

### Security Hardening & Dependency Vulnerability Remediation

We run full security pass on every dependency manifest and di sample source code, then we fix all di reported npm advisories and one code-level finding. After di fix, `npm audit` report **0 vulnerabilities** for every audited directory.

#### npm Dependency Vulnerabilities (transitive) — Fixed

We audit all 15 committed `package-lock.json` files. Vulnerabilities dey limited to transitive dependencies wey MCP Inspector dev tool, OpenAI client, and MCP SDK dey pull, and dem don resolve am without breaking di samples:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** and **lab3/code/weather_mcp/inspector**: We bump `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), wey clear di bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` and `ws` advisories. We add npm `overrides` entry wey force di patched `shell-quote@1.8.4` to kill di remaining critical advisory wey `concurrently` carry; regenerate both lockfiles (now 0 vulnerabilities)
- **03-GettingStarted/samples/typescript**: `npm audit fix` update di transitive `qs` (moderate) to patched release
- **03-GettingStarted/samples/javascript**: `npm audit fix` update di transitive `hono` (moderate) to patched release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` update di transitive `form-data` (high) to patched release
- **03-GettingStarted/11-simple-auth/solution/typescript**: We generate di missing `package-lock.json` make the project dey reproducible and auditable (0 vulnerabilities)

#### Code-Level Security Fix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: We remove `shell=True` from di `open_in_vscode` tool. Before, di `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` allow shell metacharacters inside folder path to dey interpreted by `cmd.exe` (command-injection vector). Now e dey launch di resolved `Code.exe` directly with folder as argument — no shell — wey na di same function but e safe.

#### Python Dependency Audit

- We audit every Python requirements set with `pip-audit`. `05-AdvancedTopics` and `03-GettingStarted/samples/python` report **no known vulnerabilities** (their `mcp` / `httpx` / `pydantic` / `python-dotenv` range dey resolve to current patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flag di transitive dependency **`werkzeug` 3.1.1** with three `safe_join` Windows device-name DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, and `CVE-2026-27199` (all fix for 3.1.6). We add explicit security pin `werkzeug>=3.1.6` make di patched release dey resolve cleanly; we verify di constraint resolve well wit di `chainlit` / `mcp` / `semantic-kernel` stack

### Product Name Rebranding

We update all curriculum content to show Microsoft's product rebranding:

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
- **Lesson 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): New comprehensive guide wey talk about di adversarial debate pattern for multi-agent systems
  - Mermaid architecture diagram: two agents → shared MCP server → debate transcript → judge → verdict
  - Shared MCP tool server (`web_search` + `run_python`) implement for Python and TypeScript
  - Opposing system prompts (FOR / AGAINST / Judge) with explicit tool-use requirements
  - Debate orchestrator for Python, TypeScript, and C# wey dey manage rounds and route arguments
  - MCP `ClientSession` wiring for di orchestrator to real tool calls
  - Use-case table (hallucination detection, threat modeling, API design review, factual verification, tech selection)
  - Security considerations: sandboxed execution, tool-call validation, rate limiting, audit logging
  - Structured exercise with three practical scenarios (code review, architecture decision, content moderation)

#### Documentation Fixes

**Module 03 - Getting Started**
- **05-stdio-server/README.md**: Fix incomplete TypeScript stdio server example — add missing transport instantiation (`new StdioServerTransport()`) and `server.connect(transport)` call to match di Python and .NET examples for di same section
- **14-sampling/README.md**: Fix typo — correct `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum Updates

**Main README.md**
- Add entry 5.17 (Adversarial Multi-Agent Reasoning with MCP) for di curriculum table with direct link to di new lesson

**05-AdvancedTopics/README.md**
- Add Lesson 5.17 row to di lessons table

**study_guide.md**
- Add Adversarial Multi-Agent Reasoning topic to di mind-map and prose description of Advanced Topics

#### Code and Security Fixes

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Security fix — command injection**: Replace `execSync` shell interpolation with `execFile` + `promisify` for di TypeScript `run_python` tool, wey remove di command injection surface (LLM-controlled code now dey passed as literal argv element with no shell involvement)
- **MCP tool loop wiring**: Updated di Python debate orchestrator to use `AsyncAnthropic` client (wey replace di blocking sync `Anthropic`), pass live `ClientSession` direkt to each agent turn, fetch tool definitions via `session.list_tools()` every turn, and dispatch `tool_use` blocks via `session.call_tool()` for loop untill di model send final text response

#### Dependency Updates

- Bump `hono` to 4.12.12 for plenty packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Bump `@hono/node-server` from 1.19.11 to 1.19.13 for TypeScript packages
- Bump `cryptography` from 46.0.5 to 46.0.7 for Python packages (10-StreamliningAIWorkflows labs 3 and 4)
- Bump `lodash` from 4.17.23 to 4.18.1 for 10-StreamliningAIWorkflows inspector

#### Translations

- Synced translations for 48+ languages with di latest source changes (i18n update)

---

## February 5, 2026

### Repository-Wide Validation and Navigation Improvements

#### New Curriculum Content Added

**Module 03 - Getting Started**
- **12-mcp-hosts/README.md**: New comprehensive guide for setting up MCP hosts
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf configuration examples
  - JSON configuration templates for all major hosts
  - Transport types comparison table (stdio, SSE/HTTP, WebSocket)
  - Troubleshooting common connection issues
  - Security best practices for host configuration

- **13-mcp-inspector/README.md**: New debugging guide for MCP Inspector
  - Installation methods (npx, npm global, from source)
  - Connecting to servers via stdio and HTTP/SSE
  - Testing tools, resources, and prompts workflows
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
- All 5 supplementary security documents now get "What's Next" navigation

**09-CaseStudy Files**
- All case study files now get sequential navigation

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
- **New Client Primitive - Roots**: Add comprehensive documentation on di Roots client primitive, wey enable servers understand filesystem boundaries and access permissions
- **Tool Annotations**: Add documentation on tool behavioral annotations (`readOnlyHint`, `destructiveHint`) for better tool execution decisions
- **Tool Calling in Sampling**: Update Sampling documentation to include `tools` and `toolChoice` parameters for model-driven tool invocation during sampling requests
- **URL Mode Elicitation**: Add documentation on URL-based elicitation for server-initiated external web interactions
- **Tasks (Experimental)**: Add new section documenting di experimental Tasks feature for durable execution wrappers and deferred result retrieval
- **Icons Support**: Note say tools, resources, resource templates, and prompts fit now include icons as additional metadata

#### Documentation Updates
- **README.md**: Add MCP Specification 2025-11-25 version reference and date-based versioning explanation
- **study_guide.md**: Update curriculum map to include Tasks and Tool Annotations for Core Concepts section; update document timestamp

#### Specification Compliance Verification
- **Protocol Version**: Verify all documentation references current MCP Specification 2025-11-25
- **Architecture Alignment**: Confirm two-layer architecture (Data Layer + Transport Layer) documentation accuracy
- **Primitives Documentation**: Validate server primitives (Resources, Prompts, Tools) and client primitives (Sampling, Elicitation, Logging, Roots)
- **Transport Mechanisms**: Verify STDIO and Streamable HTTP transport documentation accuracy
- **Security Guidance**: Confirm alignment with current MCP Security Best Practices documentation

#### Key MCP 2025-11-25 Features Documented
- **OpenID Connect Discovery**: Auth server discovery through OIDC
- **OAuth Client ID Metadata Documents**: Recommend client registration mechanism
- **JSON Schema 2020-12**: Default dialect for MCP schema definitions
- **SDK Tiering System**: Formalize requirements for SDK feature support and maintenance
- **Governance Structure**: Formalize Working Groups and Interest Groups in MCP governance

### Security Documentation Major Update (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **New Hands-On Training Resource**: Add comprehensive integration with di [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) throughout all security documentation
- **Expedition Route Coverage**: Document di complete camp-to-camp progression from Base Camp to Summit
- **OWASP Alignment**: All security guidance now map to OWASP MCP Azure Security Guide risks

#### OWASP MCP Top 10 Integration
- **New Section**: Add OWASP MCP Top 10 Security Risks table with Azure mitigations for main Security README
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
- **Resource Updates**: Add MCP Specification 2025-11-25 link and OWASP MCP Top 10 to additional resources

#### Module 08 - Best Practices
- **Spec Version**: Update MCP Specification reference to 2025-11-25
- **Security Resources**: Add OWASP MCP Top 10 and Sherpa workshop to additional references

#### Module 10 - Streamlining AI Workflows
- **Badge Update**: Change MCP version badge from SDK version (1.9.3) to specification version (2025-11-25)
- **Resource Links**: Update MCP Specification link; add OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Spec Reference**: Update MCP Specification link to 2025-11-25 version
- **Security Resources**: Add OWASP MCP Top 10 to official resources

## December 18, 2025

### Security Documentation Update - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specification Version Update
- **Protocol Version Update**: Update to reference latest MCP Specification 2025-11-25 (wey dem release November 25, 2025)
  - Update all specification version references from 2025-06-18 to 2025-11-25
  - Update document date references from August 18, 2025 to December 18, 2025
  - Verify all specification URLs point to current documentation
- **Content Validation**: Comprehensive validation of security best practices against latest standards
  - **Microsoft Security Solutions**: Verify current terminology and links for Prompt Shields (wey before na "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, and Azure Key Vault
  - **OAuth 2.1 Security**: Confirm alignment with latest OAuth security best practices
  - **OWASP Standards**: Validate OWASP Top 10 for LLMs references still dey current
  - **Azure Services**: Verify all Microsoft Azure documentation links and best practices
- **Standards Alignment**: All referenced security standards confirmed current
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure security and compliance frameworks
- **Implementation Resources**: Validate all implementation guide links and resources
  - Azure API Management authentication patterns
  - Microsoft Entra ID integration guides
  - Azure Key Vault secrets management
  - DevSecOps pipelines and monitoring solutions

### Documentation Quality Assurance
- **Specification Compliance**: Make sure all mandatory MCP security requirements (MUST/MUST NOT) align with latest specification
- **Resource Currency**: Verify all external links to Microsoft documentation, security standards, and implementation guides
- **Best Practices Coverage**: Confirm comprehensive coverage of authentication, authorization, AI-specific threats, supply chain security, and enterprise patterns

## October 6, 2025

### Getting Started Section Expansion – Advanced Server Usage & Simple Authentication

#### Advanced Server Usage (03-GettingStarted/10-advanced)
- **New Chapter Added**: Introduce comprehensive guide to advanced MCP server usage, covering both regular and low-level server architectures.
  - **Regular vs. Low-Level Server**: Detail comparison and code examples in Python and TypeScript for both ways.
  - **Handler-Based Design**: Explain handler-based tool/resource/prompt management for scalable, flexible server implementations.
  - **Practical Patterns**: Real-world scenarios where low-level server patterns dey beneficial for advanced features and architecture.
#### Simple Authentication (03-GettingStarted/11-simple-auth)
- **New Chapter Added**: Step-by-step guide to implementing simple authentication for MCP servers.
  - **Auth Concepts**: Clear explanation of authentication versus authorization, and how to handle credentials.
  - **Basic Auth Implementation**: Middleware-based authentication patterns for Python (Starlette) and TypeScript (Express), with code samples.
  - **Progression to Advanced Security**: Guidance on how to start with simple auth and move forward to OAuth 2.1 and RBAC, with references to advanced security modules.

Dem additions dey provide practical, hands-on guidance for building more robust, secure, and flexible MCP server implementations, wey bridge foundational concepts with advanced production patterns.

## September 29, 2025

### MCP Server Database Integration Labs - Comprehensive Hands-On Learning Path

#### 11-MCPServerHandsOnLabs - New Complete Database Integration Curriculum
- **Complete 13-Lab Learning Path**: Added comprehensive hands-on curriculum for building production-ready MCP servers with PostgreSQL database integration
  - **Real-World Implementation**: Zava Retail analytics use case wey show enterprise-grade patterns
  - **Structured Learning Progression**:
    - **Labs 00-03: Foundations** - Introduction, Core Architecture, Security & Multi-Tenancy, Environment Setup
    - **Labs 04-06: Building the MCP Server** - Database Design & Schema, MCP Server Implementation, Tool Development  
    - **Labs 07-09: Advanced Features** - Semantic Search Integration, Testing & Debugging, VS Code Integration
    - **Labs 10-12: Production & Best Practices** - Deployment Strategies, Monitoring & Observability, Best Practices & Optimization
  - **Enterprise Technologies**: FastMCP framework, PostgreSQL with pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Advanced Features**: Row Level Security (RLS), semantic search, multi-tenant data access, vector embeddings, real-time monitoring

#### Terminology Standardization - Module to Lab Conversion
- **Comprehensive Documentation Update**: Systematically updated all README files in 11-MCPServerHandsOnLabs to use "Lab" terminology instead of "Module"
  - **Section Headers**: Updated "What This Module Covers" to "What This Lab Covers" across all 13 labs
  - **Content Description**: Changed "This module provides..." to "This lab provides..." throughout documentation
  - **Learning Objectives**: Updated "By the end of this module..." to "By the end of this lab..." 
  - **Navigation Links**: Converted all "Module XX:" references to "Lab XX:" in cross-references and navigation
  - **Completion Tracking**: Updated "After completing this module..." to "After completing this lab..."
  - **Preserved Technical References**: Maintained Python module references in configuration files (e.g., `"module": "mcp_server.main"`)

#### Study Guide Enhancement (study_guide.md)
- **Visual Curriculum Map**: Added new "11. Database Integration Labs" section with comprehensive lab structure visualization
- **Repository Structure**: Updated from ten to eleven main sections with detailed 11-MCPServerHandsOnLabs description
- **Learning Path Guidance**: Enhanced navigation instructions to cover sections 00-11
- **Technology Coverage**: Added FastMCP, PostgreSQL, Azure services integration details
- **Learning Outcomes**: Emphasized production-ready server development, database integration patterns, and enterprise security

#### Main README Structure Enhancement
- **Lab-Based Terminology**: Updated main README.md in 11-MCPServerHandsOnLabs to consistently use "Lab" structure
- **Learning Path Organization**: Clear progression from foundational concepts through advanced implementation to production deployment
- **Real-World Focus**: Emphasis on practical, hands-on learning with enterprise-grade patterns and technologies

### Documentation Quality & Consistency Improvements
- **Hands-On Learning Emphasis**: Reinforced practical, lab-based approach throughout documentation
- **Enterprise Patterns Focus**: Highlighted production-ready implementations and enterprise security considerations
- **Technology Integration**: Comprehensive coverage of modern Azure services and AI integration patterns
- **Learning Progression**: Clear, structured path from basic concepts to production deployment

## September 26, 2025

### Case Studies Enhancement - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Ecosystem Development Focus
- **README.md**: Major expansion with comprehensive GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: New comprehensive case study wey dey examine GitHub's MCP Registry launch for September 2025
    - **Problem Analysis**: Detailed look at fragmented MCP server discovery and deployment wahala
    - **Solution Architecture**: GitHub centralized registry approach wey get one-click VS Code installation
    - **Business Impact**: Measurable improvements for developer onboarding and productivity
    - **Strategic Value**: Focus on modular agent deployment and cross-tool interoperability
    - **Ecosystem Development**: Position as foundational platform for agentic integration
  - **Enhanced Case Study Structure**: Updated all seven case studies with consistent formatting and complete descriptions
    - Azure AI Travel Agents: Multi-agent orchestration focus
    - Azure DevOps Integration: Workflow automation focus
    - Real-Time Documentation Retrieval: Python console client implementation
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: VS Code and GitHub Copilot integration
    - Azure API Management: Enterprise API integration patterns
    - GitHub MCP Registry: Ecosystem development and community platform
  - **Comprehensive Conclusion**: Rewritten conclusion section highlighting seven case studies wey span many MCP implementation areas
    - Enterprise Integration, Multi-Agent Orchestration, Developer Productivity
    - Ecosystem Development, Educational Applications classification
    - Enhanced insights into architectural patterns, implementation strategies, and best practices
    - Emphasis on MCP as mature, production-ready protocol

#### Study Guide Updates (study_guide.md)
- **Visual Curriculum Map**: Updated mindmap to include GitHub MCP Registry for Case Studies section
- **Case Studies Description**: Enhanced from generic descriptions to detailed breakdown of seven comprehensive case studies
- **Repository Structure**: Updated section 10 to reflect comprehensive case study coverage with specific implementation details
- **Changelog Integration**: Added September 26, 2025 entry wey document GitHub MCP Registry addition and case study improvements
- **Date Updates**: Updated footer timestamp to reflect latest revision (September 26, 2025)

### Documentation Quality Improvements
- **Consistency Enhancement**: Standardized case study formatting and structure across all seven examples
- **Comprehensive Coverage**: Case studies now cover enterprise, developer productivity, and ecosystem development scenarios
- **Strategic Positioning**: Enhanced focus on MCP as foundational platform for agentic system deployment
- **Resource Integration**: Updated additional resources to include GitHub MCP Registry link

## September 15, 2025

### Advanced Topics Expansion - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - New Advanced Implementation Guide
- **README.md**: Complete implementation guide for custom MCP transport mechanisms
  - **Azure Event Grid Transport**: Complete serverless event-driven transport implementation
    - C#, TypeScript, and Python examples with Azure Functions integration
    - Event-driven architecture patterns for scalable MCP solutions
    - Webhook receivers and push-based message handling
  - **Azure Event Hubs Transport**: High-throughput streaming transport implementation
    - Real-time streaming capabilities for low-latency scenarios
    - Partitioning strategies and checkpoint management
    - Message batching and performance optimization
  - **Enterprise Integration Patterns**: Production-ready architectural examples
    - Distributed MCP processing across many Azure Functions
    - Hybrid transport architectures combining multiple transport types
    - Message durability, reliability, and error handling strategies
  - **Security & Monitoring**: Azure Key Vault integration and observability patterns
    - Managed identity authentication and least privilege access
    - Application Insights telemetry and performance monitoring
    - Circuit breakers and fault tolerance patterns
  - **Testing Frameworks**: Comprehensive testing strategies for custom transports
    - Unit testing with test doubles and mocking frameworks
    - Integration testing with Azure Test Containers
    - Performance and load testing considerations

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Emerging AI Discipline
- **README.md**: Comprehensive exploration of context engineering as emerging field
  - **Core Principles**: Complete context sharing, action decision awareness, and context window management
  - **MCP Protocol Alignment**: How MCP design dey address context engineering challenges
    - Context window limitations and progressive loading strategies
    - Relevance determination and dynamic context retrieval
    - Multi-modal context handling and security considerations
  - **Implementation Approaches**: Single-threaded vs. multi-agent architectures
    - Context chunking and prioritization techniques
    - Progressive context loading and compression strategies
    - Layered context approaches and retrieval optimization
  - **Measurement Framework**: Emerging metrics for context effectiveness evaluation
    - Input efficiency, performance, quality, and user experience considerations
    - Experimental approaches to context optimization
    - Failure analysis and improvement methodologies

#### Curriculum Navigation Updates (README.md)
- **Enhanced Module Structure**: Updated curriculum table to include new advanced topics
  - Added Context Engineering (5.14) and Custom Transport (5.15) entries
  - Consistent formatting and navigation links across all modules
  - Updated descriptions to reflect current content scope

### Directory Structure Improvements
- **Naming Standardization**: Renamed "mcp transport" to "mcp-transport" for consistency with other advanced topic folders
- **Content Organization**: All 05-AdvancedTopics folders now follow consistent naming pattern (mcp-[topic])

### Documentation Quality Enhancements
- **MCP Specification Alignment**: All new content dey reference current MCP Specification 2025-06-18
- **Multi-Language Examples**: Comprehensive code examples for C#, TypeScript, and Python
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
- **Specification References**: Dem update all di references to current MCP Specification 2025-06-18
- **Microsoft Security Ecosystem**: Dem improve integration guidance all ova all security documentation
- **Practical Implementation**: Dem add detailed code examples for .NET, Java, and Python wit enterprise patterns
- **Resource Organization**: Complete organisation of official documentation, security standards, and implementation guides
- **Visual Indicators**: Clear marking of mandatory requirements vs. recommended practices


#### Core Concepts (01-CoreConcepts/) - Complete Modernization
- **Protocol Version Update**: Dem update am to refer current MCP Specification 2025-06-18 wit date-based versioning (YYYY-MM-DD format)
- **Architecture Refinement**: Dem improve di descriptions of Hosts, Clients, and Servers make e reflect current MCP architecture patterns
  - Hosts now dey clearly define as AI applications wey dey coordinate many MCP client connections
  - Clients dem describe as protocol connectors wey dey maintain one-to-one server relationships
  - Servers dem improve wit local vs. remote deployment scenarios
- **Primitive Restructuring**: Dem do complete overhaul of server and client primitives
  - Server Primitives: Resources (data sources), Prompts (templates), Tools (executable functions) wit detailed explanations and examples
  - Client Primitives: Sampling (LLM completions), Elicitation (user input), Logging (debugging/monitoring)
  - Dem update wit current discovery (`*/list`), retrieval (`*/get`), and execution (`*/call`) method patterns
- **Protocol Architecture**: Dem introduce two-layer architecture model
  - Data Layer: JSON-RPC 2.0 foundation wit lifecycle management and primitives
  - Transport Layer: STDIO (local) and Streamable HTTP wit SSE (remote) transport mechanisms
- **Security Framework**: Complete security principles, include explicit user consent, data privacy protection, tool execution safety, and transport layer security
- **Communication Patterns**: Dem update protocol messages to show initialization, discovery, execution, and notification flows
- **Code Examples**: Dem refresh multi-language examples (.NET, Java, Python, JavaScript) to reflect current MCP SDK patterns

#### Security (02-Security/) - Comprehensive Security Overhaul  
- **Standards Alignment**: Full alignment wit MCP Specification 2025-06-18 security requirements
- **Authentication Evolution**: Dem document how e take change from custom OAuth servers go external identity provider delegation (Microsoft Entra ID)
- **AI-Specific Threat Analysis**: Dem improve coverage of modern AI attack vectors
  - Detailed prompt injection attack scenarios wit real-world examples
  - Tool poisoning mechanisms and "rug pull" attack patterns
  - Context window poisoning and model confusion attacks
- **Microsoft AI Security Solutions**: Complete coverage of Microsoft security ecosystem
  - AI Prompt Shields wit advanced detection, spotlighting, and delimiter techniques
  - Azure Content Safety integration patterns
  - GitHub Advanced Security for supply chain protection
- **Advanced Threat Mitigation**: Detailed security controls for
  - Session hijacking wit MCP-specific attack scenarios and cryptographic session ID requirements
  - Confused deputy problems for MCP proxy scenarios wit explicit consent requirements
  - Token passthrough vulnerabilities wit mandatory validation controls
- **Supply Chain Security**: Expanded AI supply chain coverage including foundation models, embeddings services, context providers, and third-party APIs
- **Foundation Security**: Improved integration wit enterprise security patterns including zero trust architecture and Microsoft security ecosystem
- **Resource Organization**: Categorize comprehensive resource links by type (Official Docs, Standards, Research, Microsoft Solutions, Implementation Guides)

### Documentation Quality Improvements
- **Structured Learning Objectives**: Dem improve learning objectives wit specific, actionable outcomes 
- **Cross-References**: Dem add links between related security and core concept topics
- **Current Information**: Dem update all date references and specification links to current standards
- **Implementation Guidance**: Dem add specific, actionable implementation guidelines all ova both sections

## July 16, 2025

### README and Navigation Improvements
- Dem completely redesign curriculum navigation for README.md
- Dem replace `<details>` tags wit more accessible table-based format
- Dem create alternative layout options for new "alternative_layouts" folder
- Dem add card-based, tabbed-style, and accordion-style navigation examples
- Dem update repository structure section to include all latest files
- Dem improve "How to Use This Curriculum" section wit clear recommendations
- Dem update MCP specification links to point to correct URLs
- Dem add Context Engineering section (5.14) to the curriculum structure

### Study Guide Updates
- Dem completely revise study guide to align wit current repository structure
- Dem add new sections for MCP Clients and Tools, and Popular MCP Servers
- Dem update Visual Curriculum Map to properly reflect all topics
- Dem improve descriptions of Advanced Topics to cover all specialized areas
- Dem update Case Studies section to reflect real examples
- Dem add this comprehensive changelog

### Community Contributions (06-CommunityContributions/)
- Dem add detailed information about MCP servers for image generation
- Dem add comprehensive section on using Claude in VSCode
- Dem add Cline terminal client setup and usage instructions
- Dem update MCP client section to include all popular client options
- Dem improve contribution examples wit more accurate code samples

### Advanced Topics (05-AdvancedTopics/)
- Dem organize all specialized topic folders wit consistent naming
- Dem add context engineering materials and examples
- Dem add Foundry agent integration documentation
- Dem improve Entra ID security integration documentation

## June 11, 2025

### Initial Creation
- Dem release first version of MCP for Beginners curriculum
- Dem create basic structure for all 10 main sections
- Dem implement Visual Curriculum Map for navigation
- Dem add initial sample projects wit multiple programming languages

### Getting Started (03-GettingStarted/)
- Dem create first server implementation examples
- Dem add client development guidance
- Dem include LLM client integration instructions
- Dem add VS Code integration documentation
- Dem implement Server-Sent Events (SSE) server examples

### Core Concepts (01-CoreConcepts/)
- Dem add detailed explanation of client-server architecture
- Dem create documentation on key protocol components
- Dem document messaging patterns in MCP

## May 23, 2025

### Repository Structure
- Dem start repository wit basic folder structure
- Dem create README files for each major section
- Dem setup translation infrastructure
- Dem add image assets and diagrams

### Documentation
- Dem create initial README.md wit curriculum overview
- Dem add CODE_OF_CONDUCT.md and SECURITY.md
- Dem setup SUPPORT.md wit guidance for getting help
- Dem create preliminary study guide structure

## April 15, 2025

### Planning and Framework
- Initial planning for MCP for Beginners curriculum
- Dem define learning objectives and target audience
- Dem outline 10-section structure of the curriculum
- Dem develop conceptual framework for examples and case studies
- Dem create initial prototype examples for key concepts

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->