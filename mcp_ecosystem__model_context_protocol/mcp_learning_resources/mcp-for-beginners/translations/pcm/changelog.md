# Changelog: MCP for Beginners Curriculum

Dis dokument na record of all big changes wey dem do for Model Context Protocol (MCP) for Beginners curriculum. Dem dey put changes for reverse order wey dem do dem (newest changes first).

## February 5, 2026

### Repository-Wide Validation and Navigation Improvements

#### New Curriculum Content Added

**Module 03 - Getting Started**
- **12-mcp-hosts/README.md**: New full guide for how to set up MCP hosts
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf configuration examples
  - JSON configuration templates for all important hosts
  - Transport types comparison table (stdio, SSE/HTTP, WebSocket)
  - How to troubleshoot common connection problems
  - Security best practices for host configuration

- **13-mcp-inspector/README.md**: New debugging guide for MCP Inspector
  - How to install (npx, npm global, from source)
  - How to connect to servers via stdio and HTTP/SSE
  - Testing tools, resources, and prompts workflows
  - VS Code integration with MCP Inspector
  - Common debugging scenarios with their solutions

**Module 04 - Practical Implementation**
- **pagination/README.md**: New pagination implementation guide
  - Cursor-based pagination patterns for Python, TypeScript, Java
  - How to handle client-side pagination
  - Cursor design strategies (opaque vs. structured)
  - Performance optimization recommendations

**Module 05 - Advanced Topics**
- **mcp-protocol-features/README.md**: New protocol features deep dive
  - How to implement progress notifications
  - Request cancellation patterns
  - Resource templates with URI patterns
  - Server lifecycle management
  - Logging level control
  - Error handling patterns with JSON-RPC codes

#### Navigation Fixes (24+ files updated)

**Main Module READMEs**
 Now e dey link to both first lesson AND the next module

**02-Security Sub-files**
- All 5 security supplementary documents now get "What's Next" navigation:

**09-CaseStudy Files**
- All case study files now dey get sequential navigation:

**10-StreamliningAI Labs**
Added "What's Next" section to Module 10 overview and Module 11

#### Code and Content Fixes

**SDK and Dependency Updates**
Fixed empty openai version to `^4.95.0`
Updated SDK from `^1.8.0` to `>=1.26.0`
Updated mcp version pins to `>=1.26.0`

**Code Fixes**
Fixed wrong model `gpt-4o-mini` to `gpt-4.1-mini`

**Content Fixes**
Fixed broken link `READMEmd` → `README.md`, fixed curriculum header from `Module 1-3` to `Module 0-3`, fixed case-sensitive path
Removed corrupted duplicate Case Study 5 content

**Beginner Guidance Improvements**
Added correct introduction, learning objectives, and prerequisites for beginners

#### Curriculum Updates

**Main README.md**
- Added entries 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) to curriculum table

**Module READMEs**
Added lessons 12 and 13 to lesson list
Added Practical Guides section with pagination link
Added lessons 5.15 (Custom Transport) and 5.16 (Protocol Features)

**study_guide.md**
- Updated mindmap with all new topics: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Jan 28, 2026

### MCP Specification 2025-11-25 Compliance Review

#### Core Concepts Enhancement (01-CoreConcepts/)
- **New Client Primitive - Roots**: Added detailed documentation on Roots client primitive, wey make servers fit understand filesystem boundaries and permission access
- **Tool Annotations**: Added documentation on tool behavioral annotations (`readOnlyHint`, `destructiveHint`) to help decision making for tool execution
- **Tool Calling in Sampling**: Updated Sampling documentation to include `tools` and `toolChoice` parameters for model-driven tool calling during sampling requests
- **URL Mode Elicitation**: Added documentation on URL-based way to do elicitation for server-started external web interactions
- **Tasks (Experimental)**: Added new section wey explain the experimental Tasks feature for durable execution wrappers and deferred result retrieval
- **Icons Support**: Noted say tools, resources, resource templates, and prompts fit now include icons as extra metadata

#### Documentation Updates
- **README.md**: Added MCP Specification 2025-11-25 version reference and explanation for date-based versioning
- **study_guide.md**: Updated curriculum map to include Tasks and Tool Annotations in Core Concepts section; updated document timestamp

#### Specification Compliance Verification
- **Protocol Version**: Confirm say all documentation dey reference the current MCP Specification 2025-11-25
- **Architecture Alignment**: Confirm the two-layer architecture (Data Layer + Transport Layer) document dey accurate
- **Primitives Documentation**: Checked server primitives (Resources, Prompts, Tools) and client primitives (Sampling, Elicitation, Logging, Roots)
- **Transport Mechanisms**: Verified STDIO and Streamable HTTP transport documentation dey correct
- **Security Guidance**: Confirm alignment with current MCP Security Best Practices documentation

#### Key MCP 2025-11-25 Features Documented
- **OpenID Connect Discovery**: Auth server discovery through OIDC
- **OAuth Client ID Metadata Documents**: Recommended way for client registration
- **JSON Schema 2020-12**: Default dialect for MCP schema definitions
- **SDK Tiering System**: Formalized SDK features support and maintenance requirements
- **Governance Structure**: Formalized Working Groups and Interest Groups inside MCP governance

### Security Documentation Major Update (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **New Hands-On Training Resource**: Added full integration with the [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) across all security documentation
- **Expedition Route Coverage**: Documented the full camp-to-camp progression from Base Camp to Summit
- **OWASP Alignment**: All security guidance now match OWASP MCP Azure Security Guide risks

#### OWASP MCP Top 10 Integration
- **New Section**: Added OWASP MCP Top 10 Security Risks table with Azure mitigations to main Security README
- **Risk-Based Documentation**: Updated mcp-security-controls-2025.md with OWASP MCP risk references for every security domain
- **Reference Architecture**: Linked to OWASP MCP Azure Security Guide reference architecture and implementation patterns

#### Updated Security Files
- **README.md**: Added Sherpa Workshop overview, expedition route table, OWASP MCP Top 10 risks summary, and hands-on training section
- **mcp-security-controls-2025.md**: Updated header to February 2026, added OWASP risk references (MCP01-MCP08), fixed spec version inconsistency
- **mcp-security-best-practices-2025.md**: Added Sherpa and OWASP resources section, updated timestamp
- **mcp-best-practices.md**: Added hands-on training section with Sherpa and OWASP links
- **azure-content-safety-implementation.md**: Added OWASP MCP06 reference, Sherpa Camp 3 alignment, and extra resources section

#### New Resource Links Added
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individual OWASP MCP risk pages (MCP01-MCP10)

### Curriculum-Wide MCP Specification 2025-11-25 Alignment

#### Module 03 - Getting Started
- **SDK Documentation**: Added Go SDK to official SDK list; updated all SDK references to fit MCP Specification 2025-11-25
- **Transport Clarification**: Updated STDIO and HTTP Streaming transport descriptions with clear spec references

#### Module 04 - Practical Implementation
- **SDK Updates**: Added Go SDK; updated SDK list with specification version reference
- **Authorization Spec**: Updated MCP Authorization specification link to current 2025-11-25 version

#### Module 05 - Advanced Topics
- **New Features**: Added note about new MCP Specification 2025-11-25 features (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Security Resources**: Added OWASP MCP Top 10 and Sherpa workshop links to extra references

#### Module 06 - Community Contributions
- **SDK List**: Added Swift and Rust SDKs; updated specification link to 2025-11-25
- **Spec Reference**: Updated MCP Specification link to direct spec URL

#### Module 07 - Lessons from Early Adoption
- **Resource Updates**: Added MCP Specification 2025-11-25 link and OWASP MCP Top 10 to extra resources

#### Module 08 - Best Practices
- **Spec Version**: Updated MCP Specification reference to 2025-11-25
- **Security Resources**: Added OWASP MCP Top 10 and Sherpa workshop to extra references

#### Module 10 - Streamlining AI Workflows
- **Badge Update**: Changed MCP version badge from SDK version (1.9.3) to specification version (2025-11-25)
- **Resource Links**: Updated MCP Specification link; added OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Spec Reference**: Updated MCP Specification link to 2025-11-25 version
- **Security Resources**: Added OWASP MCP Top 10 to official resources

## December 18, 2025

### Security Documentation Update - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specification Version Update
- **Protocol Version Update**: Updated to reference the latest MCP Specification 2025-11-25 (wey dem release November 25, 2025)
  - Updated all spec version references from 2025-06-18 to 2025-11-25
  - Updated document date references from August 18, 2025 to December 18, 2025
  - Verified all spec URLs point to the current documentation
- **Content Validation**: Full check of security best practices against the latest standards
  - **Microsoft Security Solutions**: Verified current terms and links for Prompt Shields (wey dem before call "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, and Azure Key Vault
  - **OAuth 2.1 Security**: Confirmed alignment with latest OAuth security best practices
  - **OWASP Standards**: Checked OWASP Top 10 for LLMs references remain current
  - **Azure Services**: Verified all Microsoft Azure documentation links and best practices
- **Standards Alignment**: All referenced security standards confirmed current
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure security and compliance frameworks
- **Implementation Resources**: Verified all implementation guide links and resources
  - Azure API Management authentication patterns
  - Microsoft Entra ID integration guides
  - Azure Key Vault secrets management
  - DevSecOps pipelines and monitoring solutions

### Documentation Quality Assurance
- **Specification Compliance**: Made sure all mandatory MCP security requirements (MUST/MUST NOT) align with latest specification
- **Resource Currency**: Verified all external links to Microsoft docs, security standards, and implementation guides
- **Best Practices Coverage**: Confirmed full coverage of authentication, authorization, AI-specific threats, supply chain security, and enterprise patterns

## October 6, 2025

### Getting Started Section Expansion – Advanced Server Usage & Simple Authentication

#### Advanced Server Usage (03-GettingStarted/10-advanced)
- **New Chapter Added**: Introduced comprehensive guide to advanced MCP server usage, covering both regular and low-level server architectures.
  - **Regular vs. Low-Level Server**: Detailed comparison and code examples for Python and TypeScript of both methods.
  - **Handler-Based Design**: Explanation of handler-based tool/resource/prompt management for scalable, flexible server implementations.
  - **Practical Patterns**: Real-world situations where low-level server patterns fit well for advanced features and architecture.

#### Simple Authentication (03-GettingStarted/11-simple-auth)
- **New Chapter Added**: Step-by-step guide to implement simple authentication in MCP servers.
  - **Auth Concepts**: Clear explanation of authentication vs. authorization, and how to handle credentials.
  - **Basic Auth Implementation**: Middleware-based authentication patterns in Python (Starlette) and TypeScript (Express), with code samples.
  - **Progression to Advanced Security**: Guidance on starting with simple auth and moving to OAuth 2.1 and RBAC, with references to advanced security modules.

These additions provide practical, hands-on guidance to build more strong, secure, and flexible MCP server implementations, connecting foundational concepts with advanced production patterns.

## September 29, 2025

### MCP Server Database Integration Labs - Comprehensive Hands-On Learning Path

#### 11-MCPServerHandsOnLabs - New Complete Database Integration Curriculum
- **Complete 13-Lab Learning Path**: Ad don add full hands-on curriculum for building production-ready MCP servers wit PostgreSQL database integration
  - **Real-World Implementation**: Zava Retail analytics use case wey show enterprise-grade patterns
  - **Structured Learning Progression**:
    - **Labs 00-03: Foundations** - Introduction, Core Architecture, Security & Multi-Tenancy, Environment Setup
    - **Labs 04-06: Building the MCP Server** - Database Design & Schema, MCP Server Implementation, Tool Development  
    - **Labs 07-09: Advanced Features** - Semantic Search Integration, Testing & Debugging, VS Code Integration
    - **Labs 10-12: Production & Best Practices** - Deployment Strategies, Monitoring & Observability, Best Practices & Optimization
  - **Enterprise Technologies**: FastMCP framework, PostgreSQL wit pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Advanced Features**: Row Level Security (RLS), semantic search, multi-tenant data access, vector embeddings, real-time monitoring

#### Terminology Standardization - Module to Lab Conversion
- **Comprehensive Documentation Update**: Systematically update all README files for 11-MCPServerHandsOnLabs to use "Lab" terminology instead of "Module"
  - **Section Headers**: Update "What This Module Covers" to "What This Lab Covers" across all 13 labs
  - **Content Description**: Change "This module provides..." to "This lab provides..." throughout documentation
  - **Learning Objectives**: Update "By the end of this module..." to "By the end of this lab..."
  - **Navigation Links**: Convert all "Module XX:" references to "Lab XX:" for cross-references and navigation
  - **Completion Tracking**: Update "After completing this module..." to "After completing this lab..."
  - **Preserved Technical References**: Keep Python module references in configuration files (e.g., `"module": "mcp_server.main"`)

#### Study Guide Enhancement (study_guide.md)
- **Visual Curriculum Map**: Add new "11. Database Integration Labs" section wit full lab structure visualization
- **Repository Structure**: Update from ten to eleven main sections wit detailed 11-MCPServerHandsOnLabs description
- **Learning Path Guidance**: Enhance navigation instructions to cover sections 00-11
- **Technology Coverage**: Add FastMCP, PostgreSQL, Azure services integration details
- **Learning Outcomes**: Emphasize production-ready server development, database integration patterns, and enterprise security

#### Main README Structure Enhancement
- **Lab-Based Terminology**: Update main README.md for 11-MCPServerHandsOnLabs to consistently use "Lab" structure
- **Learning Path Organization**: Clear progression from foundational concepts through advanced implementation to production deployment
- **Real-World Focus**: Emphasize practical, hands-on learning wit enterprise-grade patterns and technologies

### Documentation Quality & Consistency Improvements
- **Hands-On Learning Emphasis**: Reinforce practical, lab-based approach throughout documentation
- **Enterprise Patterns Focus**: Highlight production-ready implementations and enterprise security considerations
- **Technology Integration**: Comprehensive coverage of modern Azure services and AI integration patterns
- **Learning Progression**: Clear, structured path from basic concepts to production deployment

## September 26, 2025

### Case Studies Enhancement - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Ecosystem Development Focus
- **README.md**: Major expansion wit comprehensive GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: New full case study wey examine GitHub's MCP Registry launch for September 2025
    - **Problem Analysis**: Detailed look into fragmented MCP server discovery and deployment challenges
    - **Solution Architecture**: GitHub's centralized registry approach wit one-click VS Code installation
    - **Business Impact**: Measurable improvements for developer onboarding and productivity
    - **Strategic Value**: Focus on modular agent deployment and cross-tool interoperability
    - **Ecosystem Development**: Position as foundational platform for agentic integration
  - **Enhanced Case Study Structure**: Update all seven case studies wit consistent formatting and full descriptions
    - Azure AI Travel Agents: Multi-agent orchestration emphasis
    - Azure DevOps Integration: Workflow automation focus
    - Real-Time Documentation Retrieval: Python console client implementation
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: VS Code and GitHub Copilot integration
    - Azure API Management: Enterprise API integration patterns
    - GitHub MCP Registry: Ecosystem development and community platform
  - **Comprehensive Conclusion**: Rewrite conclusion section highlighting seven case studies wey span multiple MCP implementation dimensions
    - Enterprise Integration, Multi-Agent Orchestration, Developer Productivity
    - Ecosystem Development, Educational Applications categorization
    - Enhanced insights into architectural patterns, implementation strategies, and best practices
    - Emphasize MCP as mature, production-ready protocol

#### Study Guide Updates (study_guide.md)
- **Visual Curriculum Map**: Update mindmap to include GitHub MCP Registry inside Case Studies section
- **Case Studies Description**: Enhance from generic descriptions to detailed breakdown of seven full case studies
- **Repository Structure**: Update section 10 to reflect full case study coverage wit specific implementation details
- **Changelog Integration**: Add September 26, 2025 entry wey document GitHub MCP Registry addition and case study enhancements
- **Date Updates**: Update footer timestamp to reflect latest revision (September 26, 2025)

### Documentation Quality Improvements
- **Consistency Enhancement**: Standardize case study formatting and structure for all seven examples
- **Comprehensive Coverage**: Case studies now cover enterprise, developer productivity, and ecosystem development scenarios
- **Strategic Positioning**: Enhance focus on MCP as foundational platform for agentic system deployment
- **Resource Integration**: Update additional resources to include GitHub MCP Registry link

## September 15, 2025

### Advanced Topics Expansion - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - New Advanced Implementation Guide
- **README.md**: Complete implementation guide for custom MCP transport mechanisms
  - **Azure Event Grid Transport**: Full serverless event-driven transport implementation
    - C#, TypeScript, and Python examples wit Azure Functions integration
    - Event-driven architecture patterns for scalable MCP solutions
    - Webhook receivers and push-based message handling
  - **Azure Event Hubs Transport**: High-throughput streaming transport implementation
    - Real-time streaming capabilities for low-latency scenarios
    - Partitioning strategies and checkpoint management
    - Message batching and performance optimization
  - **Enterprise Integration Patterns**: Production-ready architectural examples
    - Distributed MCP processing across multiple Azure Functions
    - Hybrid transport architectures combining multiple transport types
    - Message durability, reliability, and error handling strategies
  - **Security & Monitoring**: Azure Key Vault integration and observability patterns
    - Managed identity authentication and least privilege access
    - Application Insights telemetry and performance monitoring
    - Circuit breakers and fault tolerance patterns
  - **Testing Frameworks**: Full testing strategies for custom transports
    - Unit testing wit test doubles and mocking frameworks
    - Integration testing wit Azure Test Containers
    - Performance and load testing considerations

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Emerging AI Discipline
- **README.md**: Comprehensive exploration of context engineering as new field
  - **Core Principles**: Full context sharing, action decision awareness, and context window management
  - **MCP Protocol Alignment**: How MCP design address context engineering challenges
    - Context window limitations and progressive loading strategies
    - Relevance determination and dynamic context retrieval
    - Multi-modal context handling and security considerations
  - **Implementation Approaches**: Single-threaded vs. multi-agent architectures
    - Context chunking and prioritization techniques
    - Progressive context loading and compression strategies
    - Layered context approaches and retrieval optimization
  - **Measurement Framework**: New metrics for context effectiveness evaluation
    - Input efficiency, performance, quality, and user experience considerations
    - Experimental approaches to context optimization
    - Failure analysis and improvement methodologies

#### Curriculum Navigation Updates (README.md)
- **Enhanced Module Structure**: Update curriculum table to include new advanced topics
  - Add Context Engineering (5.14) and Custom Transport (5.15) entries
  - Consistent formatting and navigation links across all modules
  - Update descriptions to reflect current content scope

### Directory Structure Improvements
- **Naming Standardization**: Rename "mcp transport" to "mcp-transport" for consistency wit other advanced topics folders
- **Content Organization**: All 05-AdvancedTopics folders now follow consistent naming pattern (mcp-[topic])

### Documentation Quality Enhancements
- **MCP Specification Alignment**: All new content reference current MCP Specification 2025-06-18
- **Multi-Language Examples**: Full code examples in C#, TypeScript, and Python
- **Enterprise Focus**: Production-ready patterns and Azure cloud integration throughout
- **Visual Documentation**: Mermaid diagrams for architecture and flow visualization

## August 18, 2025

### Documentation Comprehensive Update - MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) - Complete Modernization
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Complete rewrite aligned wit MCP Specification 2025-06-18
  - **Mandatory Requirements**: Add explicit MUST/MUST NOT requirements from official specification wit clear visual indicators
  - **12 Core Security Practices**: Restructure from 15-item list to full security domains
    - Token Security & Authentication wit external identity provider integration
    - Session Management & Transport Security wit cryptographic requirements
    - AI-Specific Threat Protection wit Microsoft Prompt Shields integration
    - Access Control & Permissions wit principle of least privilege
    - Content Safety & Monitoring wit Azure Content Safety integration
    - Supply Chain Security wit full component verification
    - OAuth Security & Confused Deputy Prevention wit PKCE implementation
    - Incident Response & Recovery wit automated capabilities
    - Compliance & Governance wit regulatory alignment
    - Advanced Security Controls wit zero trust architecture
    - Microsoft Security Ecosystem Integration wit full solutions
    - Continuous Security Evolution wit adaptive practices
  - **Microsoft Security Solutions**: Enhance integration guidance for Prompt Shields, Azure Content Safety, Entra ID, and GitHub Advanced Security
  - **Implementation Resources**: Categorize full resource links by Official MCP Documentation, Microsoft Security Solutions, Security Standards, and Implementation Guides

#### Advanced Security Controls (02-Security/) - Enterprise Implementation
- **MCP-SECURITY-CONTROLS-2025.md**: Complete overhaul wit enterprise-grade security framework
  - **9 Comprehensive Security Domains**: Expand from basic controls to detailed enterprise framework
    - Advanced Authentication & Authorization wit Microsoft Entra ID integration
    - Token Security & Anti-Passthrough Controls wit full validation
    - Session Security Controls wit hijacking prevention
    - AI-Specific Security Controls wit prompt injection and tool poisoning prevention
    - Confused Deputy Attack Prevention wit OAuth proxy security
    - Tool Execution Security wit sandboxing and isolation
    - Supply Chain Security Controls wit dependency verification
    - Monitoring & Detection Controls wit SIEM integration
    - Incident Response & Recovery wit automated capabilities
  - **Implementation Examples**: Add detailed YAML configuration blocks and code examples
  - **Microsoft Solutions Integration**: Full coverage of Azure security services, GitHub Advanced Security, and enterprise identity management

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) - Production-Ready Implementation
- **README.md**: Complete rewrite for enterprise security implementation
  - **Current Specification Alignment**: Update to MCP Specification 2025-06-18 wit mandatory security requirements
  - **Enhanced Authentication**: Microsoft Entra ID integration wit full .NET and Java Spring Security examples
  - **AI Security Integration**: Microsoft Prompt Shields and Azure Content Safety implementation wit detailed Python examples
  - **Advanced Threat Mitigation**: Full implementation examples for
    - Confused Deputy Attack Prevention wit PKCE and user consent validation
    - Token Passthrough Prevention wit audience validation and secure token management
    - Session Hijacking Prevention wit cryptographic binding and behavioral analysis
  - **Enterprise Security Integration**: Azure Application Insights monitoring, threat detection pipelines, and supply chain security
  - **Implementation Checklist**: Clear mandatory vs. recommended security controls wit Microsoft security ecosystem benefits

### Documentation Quality & Standards Alignment
- **Specification References**: Update all references to current MCP Specification 2025-06-18
- **Microsoft Security Ecosystem**: Enhance integration guidance throughout all security documentation
- **Practical Implementation**: Add detailed code examples in .NET, Java, and Python wit enterprise patterns
- **Resource Organization**: Full categorization of official documentation, security standards, and implementation guides
- **Visual Indicators**: Clear marking of mandatory requirements vs. recommended practices


#### Core Concepts (01-CoreConcepts/) - Complete Modernization
- **Protocol Version Update**: Update to reference current MCP Specification 2025-06-18 wit date-based versioning (YYYY-MM-DD format)
- **Architecture Refinement**: Enhance descriptions of Hosts, Clients, and Servers to reflect current MCP architecture patterns
  - Hosts dem don clearly define as AI applications wey dey coordinate many MCP client connections
  - Clients dem describe as protocol connectors wey dey maintain one-to-one server relationships
  - Servers dem improve with local vs. remote deployment tins
- **Primitive Restructuring**: Complete overhaul of server and client primitives
  - Server Primitives: Resources (data sources), Prompts (templates), Tools (executable functions) with detailed explanations and examples
  - Client Primitives: Sampling (LLM completions), Elicitation (user input), Logging (debugging/monitoring)
  - Updated with current discovery (`*/list`), retrieval (`*/get`), and execution (`*/call`) method patterns
- **Protocol Architecture**: Introduce two-layer architecture model
  - Data Layer: JSON-RPC 2.0 foundation with lifecycle management and primitives
  - Transport Layer: STDIO (local) and Streamable HTTP with SSE (remote) transport mechanisms
- **Security Framework**: Complete security principles wey include explicit user consent, data privacy protection, tool execution safety, and transport layer security
- **Communication Patterns**: Update protocol messages to show initialization, discovery, execution, and notification flows
- **Code Examples**: Refreshed multi-language examples (.NET, Java, Python, JavaScript) to reflect current MCP SDK patterns

#### Security (02-Security/) - Complete Security Overhaul  
- **Standards Alignment**: Full alignment with MCP Specification 2025-06-18 security requirements
- **Authentication Evolution**: Document evolution from custom OAuth servers to external identity provider delegation (Microsoft Entra ID)
- **AI-Specific Threat Analysis**: Enhanced coverage of modern AI attack vectors
  - Detailed prompt injection attack scenarios with real-world examples
  - Tool poisoning mechanisms and "rug pull" attack patterns
  - Context window poisoning and model confusion attacks
- **Microsoft AI Security Solutions**: Complete coverage of Microsoft security ecosystem
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
- Completely redesign the curriculum navigation for README.md
- Replace `<details>` tags with more accessible table-based format
- Create alternative layout options for new "alternative_layouts" folder
- Add card-based, tabbed-style, and accordion-style navigation examples
- Update repository structure section to include all latest files
- Enhance "How to Use This Curriculum" section with clear recommendations
- Update MCP specification links to point to correct URLs
- Add Context Engineering section (5.14) to the curriculum structure

### Study Guide Updates
- Completely revise the study guide to align with current repository structure
- Add new sections for MCP Clients and Tools, and Popular MCP Servers
- Update Visual Curriculum Map to accurately reflect all topics
- Enhance descriptions of Advanced Topics to cover all specialized areas
- Update Case Studies section to reflect actual examples
- Add this comprehensive changelog

### Community Contributions (06-CommunityContributions/)
- Add detailed information about MCP servers for image generation
- Add comprehensive section on using Claude in VSCode
- Add Cline terminal client setup and usage instructions
- Update MCP client section to include all popular client options
- Enhance contribution examples with more accurate code samples

### Advanced Topics (05-AdvancedTopics/)
- Organize all specialized topic folders with consistent naming
- Add context engineering materials and examples
- Add Foundry agent integration documentation
- Enhance Entra ID security integration documentation

## June 11, 2025

### Initial Creation
- Release first version of the MCP for Beginners curriculum
- Create basic structure for all 10 main sections
- Implement Visual Curriculum Map for navigation
- Add initial sample projects in multiple programming languages

### Getting Started (03-GettingStarted/)
- Create first server implementation examples
- Add client development guidance
- Include LLM client integration instructions
- Add VS Code integration documentation
- Implement Server-Sent Events (SSE) server examples

### Core Concepts (01-CoreConcepts/)
- Add detailed explanation of client-server architecture
- Create documentation on key protocol components
- Document messaging patterns in MCP

## May 23, 2025

### Repository Structure
- Initialize the repository with basic folder structure
- Create README files for each major section
- Set up translation infrastructure
- Add image assets and diagrams

### Documentation
- Create initial README.md with curriculum overview
- Add CODE_OF_CONDUCT.md and SECURITY.md
- Set up SUPPORT.md with guidance for getting help
- Create preliminary study guide structure

## April 15, 2025

### Planning and Framework
- Initial planning for MCP for Beginners curriculum
- Define learning objectives and target audience
- Outline 10-section structure of the curriculum
- Develop conceptual framework for examples and case studies
- Create initial prototype examples for key concepts

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis document don translate wit AI translation service wey dem dey call [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg understand say automated translation fit get some errors or wahala. Di original document wey e dey for im correct language na di ogbonge source. If na serious matter, e better make person wey sabi human translation do am. We no go take any blame if you misunderstanding or misinterpret wetin dis translation talk.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->