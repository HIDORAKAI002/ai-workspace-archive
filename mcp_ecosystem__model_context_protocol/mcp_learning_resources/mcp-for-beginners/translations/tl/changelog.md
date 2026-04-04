# Changelog: MCP para sa Mga Nagsisimula Kurikulum

Ang dokumentong ito ay nagsisilbing talaan ng lahat ng mahahalagang pagbabago na ginawa sa Model Context Protocol (MCP) para sa Kurikulum ng mga Nagsisimula. Ang mga pagbabago ay naka-dokumento sa reverse chronological order (pinakabago muna).

## Pebrero 5, 2026

### Mga Pagpapabuti sa Repository-Wide Validation at Navigation

#### Bagong Nilalaman ng Kurikulum ang Idinagdag

**Module 03 - Pagsisimula**
- **12-mcp-hosts/README.md**: Bagong komprehensibong gabay sa pagsasaayos ng MCP hosts
  - Mga halimbawa ng pagsasaayos para sa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mga template ng JSON configuration para sa lahat ng pangunahing hosts
  - Talahanayan ng paghahambing ng mga uri ng transport (stdio, SSE/HTTP, WebSocket)
  - Pagsasaayos ng mga karaniwang isyu sa koneksyon
  - Mga pinakamahusay na kasanayan sa seguridad para sa pagsasaayos ng host

- **13-mcp-inspector/README.md**: Bagong gabay sa pag-debug para sa MCP Inspector
  - Mga pamamaraan sa pag-install (npx, npm global, mula sa source)
  - Pagkonekta sa mga server gamit ang stdio at HTTP/SSE
  - Mga tool sa pagsusuri, mga mapagkukunan, at workflows ng prompts
  - Integrasyon ng VS Code sa MCP Inspector
  - Mga karaniwang senaryo ng pag-debug at mga solusyon

**Module 04 - Praktikal na Pagpapatupad**
- **pagination/README.md**: Bagong gabay sa pagpapatupad ng pagination
  - Mga pattern ng cursor-based pagination sa Python, TypeScript, Java
  - Paghawak ng client-side pagination
  - Mga diskarte sa disenyo ng cursor (opaque vs. structured)
  - Mga rekomendasyon sa pag-optimize ng pagganap

**Module 05 - Advanced na Mga Paksa**
- **mcp-protocol-features/README.md**: Malalimang talakayan sa mga bagong tampok ng protocol
  - Pagpapatupad ng mga progress notifications
  - Mga pattern ng pagkansela ng request
  - Mga template ng resource na may mga pattern ng URI
  - Pamamahala ng lifecycle ng server
  - Kontrol ng antas ng logging
  - Mga pattern ng paghawak ng error gamit ang mga JSON-RPC code

#### Mga Pag-aayos sa Navigation (24+ na file ang na-update)

**Mga Pangunahing README ng Module**
 Ngayon ay may mga link sa parehong unang leksyon AT susunod na module

**Mga Sub-file ng 02-Security**
- Lahat ng 5 dagdag na dokumento ng seguridad ngayon ay may "What's Next" navigation:

**Mga File ng 09-CaseStudy**
- Lahat ng mga file ng case study ay may sunud-sunod na navigation:

**10-StreamliningAI Labs**
Dinagdag ang seksyong What's Next sa overview ng Module 10 at Module 11

#### Mga Pag-aayos ng Code at Nilalaman

**Mga Update sa SDK at Dependency**
Naayos ang walang laman na bersyon ng openai sa `^4.95.0`
In-update ang SDK mula `^1.8.0` hanggang `>=1.26.0`
In-update ang mga bersyon ng mcp pins sa `>=1.26.0`

**Mga Pag-aayos sa Code**
Naayos ang maling modelong `gpt-4o-mini` sa `gpt-4.1-mini`

**Mga Pag-aayos sa Nilalaman**
Naayos ang sirang link na `READMEmd` → `README.md`, naayos ang header ng kurikulum na `Module 1-3` → `Module 0-3`, naayos ang case-sensitive na path
Tinanggal ang corrupt na duplicate na nilalaman ng Case Study 5

**Mga Pagpapabuti sa Gabay para sa mga Nagsisimula**
Dinagdag ang tamang pagpapakilala, mga layunin sa pagkatuto, at mga prerequisito para sa mga nagsisimula

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Dinagdag ang mga entry 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) sa talahanayan ng kurikulum

**Mga README ng Module**
Dinagdag ang mga leksyon 12 at 13 sa listahan ng mga leksyon
Dinagdag ang seksyong Practical Guides na may link sa pagination
Dinagdag ang mga leksyon 5.15 (Custom Transport) at 5.16 (Protocol Features)

**study_guide.md**
- In-update ang mindmap na may lahat ng bagong paksa: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Enero 28, 2026

### Pagsusuri ng Pagsunod sa MCP Specification 2025-11-25

#### Pagpapahusay ng Core Concepts (01-CoreConcepts/)
- **Bagong Client Primitive - Roots**: Idinagdag ang komprehensibong dokumentasyon sa Roots client primitive, para matulungan ang mga server na maintindihan ang mga hangganan ng filesystem at mga pahintulot sa akses
- **Tool Annotations**: Idinagdag ang dokumentasyon tungkol sa behavioral annotations ng tool (`readOnlyHint`, `destructiveHint`) para sa mas mahusay na mga desisyon sa pagpapatupad ng tool
- **Pagtawag ng Tool sa Sampling**: In-update ang dokumentasyon ng Sampling upang isama ang mga parameter na `tools` at `toolChoice` para sa pagpapatupad ng tool na pinapatakbo ng modelo sa panahon ng sampling na mga request
- **URL Mode Elicitation**: Idinagdag ang dokumentasyon sa URL-based elicitation para sa panlabas na mga interaksyon sa web na pinasimulan ng server
- **Mga Tasks (Experimental)**: Idinagdag ang bagong seksyon na nagdodokumento ng experimental na tampok na Tasks para sa matibay na execution wrappers at postponed na pagkuha ng resulta
- **Suporta sa Icons**: Napansin na ang mga tools, resources, mga template ng resource, at mga prompts ay maaari nang magsama ng icons bilang dagdag na metadata

#### Mga Update sa Dokumentasyon
- **README.md**: Dinagdag ang reference sa MCP Specification 2025-11-25 at paliwanag sa bersyon batay sa petsa
- **study_guide.md**: In-update ang curriculum map upang isama ang Tasks at Tool Annotations sa seksyon ng Core Concepts; in-update ang timestamp ng dokumento

#### Pag-verify ng Pagsunod sa Specification
- **Bersyon ng Protocol**: Napatunayan na ang lahat ng dokumentasyon ay tumutukoy sa kasalukuyang MCP Specification 2025-11-25
- **Pagkakasunod ng Arkitektura**: Kumpirmadong tama ang dokumentasyon para sa dalawang-layer na arkitektura (Data Layer + Transport Layer)
- **Dokumentasyon ng Primitives**: Napatunayan ang mga server primitives (Resources, Prompts, Tools) at mga client primitives (Sampling, Elicitation, Logging, Roots)
- **Mga Mekanismo ng Transport**: Napatunayan ang katumpakan ng dokumentasyon para sa STDIO at Streamable HTTP transport
- **Gabay sa Seguridad**: Kinumpirma ang pagsunod sa kasalukuyang MCP Security Best Practices na dokumentasyon

#### Mahahalagang Tampok ng MCP 2025-11-25 na Naidokumento
- **OpenID Connect Discovery**: Pagdiskubre ng auth server gamit ang OIDC
- **OAuth Client ID Metadata Documents**: Inirekomendang mekanismo sa pagrehistro ng kliyente
- **JSON Schema 2020-12**: Default na dialekto para sa MCP schema definitions
- **SDK Tiering System**: Pormal na mga pangangailangan para sa pag-suporta at pagpapanatili ng mga tampok ng SDK
- **Estruktura ng Pamamahala**: Pormal na Working Groups at Interest Groups sa pamamahala ng MCP

### Malaking Update sa Dokumentasyon ng Seguridad (02-Security/)

#### Integrasyon ng MCP Security Summit Workshop (Sherpa)
- **Bagong Hands-On Training Resource**: Idinagdag ang komprehensibong integrasyon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) sa lahat ng dokumentasyon ng seguridad
- **Coverage ng Expedition Route**: Nadokumento ang kumpletong pag-progreso mula Base Camp hanggang Summit
- **Pagsunod sa OWASP**: Lahat ng gabay sa seguridad ay naka-map sa OWASP MCP Azure Security Guide risks

#### Integrasyon ng OWASP MCP Top 10
- **Bagong Seksyon**: Idinagdag ang talahanayan ng OWASP MCP Top 10 Security Risks kasama ang mga mitigations ng Azure sa pangunahing Security README
- **Dokumentasyon Batay sa Panganib**: In-update ang mcp-security-controls-2025.md na may mga reference sa OWASP MCP risk para sa bawat domain ng seguridad
- **Reference Architecture**: Nakalink sa OWASP MCP Azure Security Guide reference architecture at mga pattern ng implementasyon

#### Mga Na-update na File ng Seguridad
- **README.md**: Dinagdag Sherpa Workshop overview, talahanayan ng ruta ng ekspedisyon, buod ng mga panganib ng OWASP MCP Top 10, at seksyon ng hands-on training
- **mcp-security-controls-2025.md**: In-update ang header sa Pebrero 2026, dinagdag ang mga reference ng panganib ng OWASP (MCP01-MCP08), inayos ang inconsistency ng spec version
- **mcp-security-best-practices-2025.md**: Dinagdag ang seksyon ng Sherpa at OWASP resources, in-update ang timestamp
- **mcp-best-practices.md**: Dinagdag ang seksyon ng hands-on training na may Sherpa at OWASP links
- **azure-content-safety-implementation.md**: Dinagdag ang OWASP MCP06 reference, Sherpa Camp 3 alignment, at seksyon ng karagdagang mga mapagkukunan

#### Mga Bagong Link ng Resource na Idinagdag
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Mga indibidwal na pahina ng panganib ng OWASP MCP (MCP01-MCP10)

### Pagsunod sa MCP Specification 2025-11-25 sa Buong Kurikulum

#### Module 03 - Pagsisimula
- **Dokumentasyon ng SDK**: Dinagdag ang Go SDK sa opisyal na listahan ng SDK; in-update ang lahat ng reference ng SDK upang tumugma sa MCP Specification 2025-11-25
- **Paglilinaw sa Transport**: In-update ang mga paglalarawan ng STDIO at HTTP Streaming transport na may malinaw na mga spec reference

#### Module 04 - Praktikal na Pagpapatupad
- **Mga Update sa SDK**: Dinagdag ang Go SDK; in-update ang listahan ng SDK na may reference sa bersyon ng specification
- **Spec ng Authorization**: In-update ang link ng MCP Authorization specification sa kasalukuyang bersyon ng 2025-11-25

#### Module 05 - Advanced na Mga Paksa
- **Bagong Mga Tampok**: Idinagdag ang tala tungkol sa mga bagong tampok ng MCP Specification 2025-11-25 (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Mga Mapagkukunan sa Seguridad**: Dinagdag ang OWASP MCP Top 10 at mga link ng Sherpa workshop sa mga karagdagang reference

#### Module 06 - Mga Kontribusyon ng Komunidad
- **Listahan ng SDK**: Dinagdag ang Swift at Rust SDKs; in-update ang link ng specification sa 2025-11-25
- **Reference sa Spec**: In-update ang link ng MCP Specification sa direktang URL ng specification

#### Module 07 - Mga Aral mula sa Maagang Paggamit
- **Mga Update sa Resource**: Dinagdag ang link ng MCP Specification 2025-11-25 at OWASP MCP Top 10 sa mga karagdagang mapagkukunan

#### Module 08 - Mga Pinakamahuhusay na Kasanayan
- **Bersyon ng Spec**: In-update ang reference ng MCP Specification sa 2025-11-25
- **Mga Mapagkukunan sa Seguridad**: Dinagdag ang OWASP MCP Top 10 at Sherpa workshop sa mga karagdagang reference

#### Module 10 - Streamlining AI Workflows
- **Update ng Badge**: Pinalitan ang MCP version badge mula SDK version (1.9.3) patungong specification version (2025-11-25)
- **Mga Link ng Resource**: In-update ang MCP Specification link; dinagdag ang OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Reference sa Spec**: In-update ang MCP Specification link sa bersyon 2025-11-25
- **Mga Mapagkukunan sa Seguridad**: Dinagdag ang OWASP MCP Top 10 sa opisyal na mga resource

## Disyembre 18, 2025

### Update sa Dokumentasyon ng Seguridad - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Update ng Bersyon ng Specification
- **Update ng Bersyon ng Protocol**: In-update upang tumukoy sa pinakabagong MCP Specification 2025-11-25 (inilabas Nobyembre 25, 2025)
  - In-update lahat ng reference ng bersyon ng specification mula 2025-06-18 hanggang 2025-11-25
  - In-update ang mga petsa ng dokumento mula Agosto 18, 2025 hanggang Disyembre 18, 2025
  - Kinikilalang lahat ng URL ng specification ay tumutukoy sa kasalukuyang dokumentasyon
- **Pagpapatunay ng Nilalaman**: Komprehensibong pagpapatunay ng mga pinakamahusay na kasanayan sa seguridad laban sa pinakabagong mga pamantayan
  - **Mga Solusyon sa Seguridad ng Microsoft**: Kinikilala ang kasalukuyang terminolohiya at mga link para sa Prompt Shields (dating "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, at Azure Key Vault
  - **Seguridad ng OAuth 2.1**: Kinumpirma ang pagsunod sa pinakabagong pinakamahusay na kasanayan sa seguridad ng OAuth
  - **Mga Pamantayan ng OWASP**: Pinatunayan na ang mga reference sa OWASP Top 10 para sa LLMs ay napapanahon
  - **Mga Serbisyo ng Azure**: Kinumpirma ang lahat ng link sa dokumentasyon ng Microsoft Azure at mga pinakamahusay na kasanayan
- **Pagkakatugma sa Mga Pamantayan**: Lahat ng tinukoy na mga pamantayan sa seguridad ay napapanahon
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure security at compliance frameworks
- **Mga Mapagkukunan sa Implementasyon**: Pinatunayan lahat ng link sa gabay sa implementasyon at mga mapagkukunan
  - Mga pattern ng authentication ng Azure API Management
  - Mga gabay sa integrasyon ng Microsoft Entra ID
  - Pamamahala ng sikreto ng Azure Key Vault
  - Mga pipeline ng DevSecOps at mga solusyon sa pagmamanman

### Pagsiguro sa Kalidad ng Dokumentasyon
- **Pagsunod sa Specification**: Tiniyak na lahat ng mandatory MCP security requirements (MUST/MUST NOT) ay naaayon sa pinakabagong specification
- **Pagkakapanahon ng Resource**: Kinikilala ang lahat ng panlabas na link sa dokumentasyon ng Microsoft, mga pamantayan sa seguridad, at mga gabay sa implementasyon
- **Saklaw ng Pinakamahuhusay na Kasanayan**: Pinatunayan ang komprehensibong pagtakip sa authentication, authorization, mga tukoy na banta sa AI, seguridad sa supply chain, at mga pattern ng enterprise

## Oktubre 6, 2025

### Pagpapalawak ng Seksyon ng Pagsisimula – Advanced na Paggamit ng Server at Simpleng Authentication

#### Advanced na Paggamit ng Server (03-GettingStarted/10-advanced)
- **Bagong Kabanata ang Idinagdag**: Inilunsad ang isang komprehensibong gabay sa advanced na paggamit ng MCP server, na sumasaklaw sa regular at low-level na mga arkitektura ng server.
  - **Regular vs. Low-Level Server**: Detalyadong paghahambing at mga halimbawa ng code sa Python at TypeScript para sa parehong mga paraan.
  - **Disenyo na Batay sa Handler**: Paliwanag tungkol sa handler-based na pamamahala ng tool/resource/prompt para sa scalable at flexible na pagpapatupad ng server.
  - **Mga Praktikal na Pattern**: Mga totoong senaryo kung saan kapaki-pakinabang ang low-level server patterns para sa mga advanced na tampok at arkitektura.

#### Simpleng Authentication (03-GettingStarted/11-simple-auth)
- **Bagong Kabanata ang Idinagdag**: Hakbang-hakbang na gabay sa pagpapatupad ng simpleng authentication sa mga MCP server.
  - **Mga Konsepto ng Auth**: Malinaw na paliwanag ng authentication vs. authorization, at pamamahala ng kredensyal.
  - **Pangunahing Implementasyon ng Auth**: Mga middleware-based authentication pattern sa Python (Starlette) at TypeScript (Express), na may mga halimbawa ng code.
  - **Pag-usad patungo sa Advanced Security**: Gabay sa pagsisimula gamit ang simpleng auth at pag-usad sa OAuth 2.1 at RBAC, kasama ang mga reference sa mga advanced na module ng seguridad.

Ang mga karagdagang ito ay nagbigay ng praktikal at hands-on na gabay para sa paggawa ng mas matibay, ligtas, at flexible na mga pagpapatupad ng MCP server, na nag-uugnay ng mga pundamental na konsepto sa mga advanced na production pattern.

## Setyembre 29, 2025

### MCP Server Database Integration Labs - Komprehensibong Hands-On na Landas ng Pagkatuto

#### 11-MCPServerHandsOnLabs - Bagong Kumpletong Kurikulum sa Database Integration
- **Kumpletong 13-Lab Learning Path**: Idinagdag ang komprehensibong hands-on na kurikulum para sa pagbuo ng production-ready MCP servers na may PostgreSQL database integration
  - **Real-World Implementation**: Zava Retail analytics use case na nagpapakita ng enterprise-grade na mga pattern
  - **Structured Learning Progression**:
    - **Labs 00-03: Foundations** - Panimula, Core Architecture, Seguridad at Multi-Tenancy, Pagsasaayos ng Kapaligiran
    - **Labs 04-06: Building the MCP Server** - Disenyo ng Database at Schema, MCP Server Implementation, Pagbuo ng Tool  
    - **Labs 07-09: Advanced Features** - Semantic Search Integration, Pagsubok at Pag-debug, VS Code Integration
    - **Labs 10-12: Production & Best Practices** - Mga Estratehiya sa Deployment, Monitoring at Observability, Best Practices at Optimization
  - **Enterprise Technologies**: FastMCP framework, PostgreSQL na may pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Advanced Features**: Row Level Security (RLS), semantic search, multi-tenant na pag-access ng data, vector embeddings, real-time monitoring

#### Terminology Standardization - Pag-convert mula Module sa Lab
- **Komprehensibong Pag-update ng Dokumentasyon**: Sistematikong in-update ang lahat ng README files sa 11-MCPServerHandsOnLabs upang gamitin ang terminong "Lab" sa halip na "Module"
  - **Mga Header ng Seksyon**: In-update ang "What This Module Covers" sa "What This Lab Covers" sa lahat ng 13 labs
  - **Paglalarawan ng Nilalaman**: Pinalitan ang "This module provides..." sa "This lab provides..." sa buong dokumentasyon
  - **Mga Layunin sa Pag-aaral**: In-update ang "By the end of this module..." sa "By the end of this lab..."
  - **Mga Link para sa Navigasyon**: Kinonvert lahat ng "Module XX:" references sa "Lab XX:" sa cross-references at navigasyon
  - **Pagsubaybay ng Pagtatapos**: In-update ang "After completing this module..." sa "After completing this lab..."
  - **Pinananatiling Teknikal na Sanggunian**: Pinanatili ang Python module references sa configuration files (hal. `"module": "mcp_server.main"`)

#### Pagpapahusay ng Study Guide (study_guide.md)
- **Visual Curriculum Map**: Idinagdag ang bagong seksyong "11. Database Integration Labs" na may komprehensibong visualisasyon ng istruktura ng lab
- **Istruktura ng Repository**: In-update mula sampu patungo labing isang pangunahing seksyon na may detalyadong paglalarawan ng 11-MCPServerHandsOnLabs
- **Gabay sa Learning Path**: Pinahusay ang mga tagubilin sa navigasyon para masaklaw ang mga seksyon 00-11
- **Saklaw ng Teknolohiya**: Idinagdag ang detalye ng FastMCP, PostgreSQL, at integreisyon ng Azure services
- **Mga Kinalabasan ng Pagkatuto**: Binigyang-diin ang pagbuo ng production-ready server, database integration na mga pattern, at enterprise na seguridad

#### Pagpapahusay ng Pangunahing README Istruktura
- **Lab-Based Terminology**: In-update ang pangunahing README.md sa 11-MCPServerHandsOnLabs upang tuloy-tuloy gamitin ang "Lab" na istruktura
- **Organisasyon ng Learning Path**: Malinaw na progresyon mula sa mga pundamental na konsepto hanggang sa advanced na implementasyon at production deployment
- **Real-World Focus**: Binibigyang-diin ang praktikal, hands-on na pagkatuto gamit ang mga enterprise-grade na pattern at teknolohiya

### Pagbuti ng Kalidad at Konsistensi ng Dokumentasyon
- **Pagtutok sa Hands-On Learning**: Pinalakas ang praktikal, lab-based na diskarte sa buong dokumentasyon
- **Pagtuon sa Enterprise Patterns**: Pinalabas ang production-ready implementations at mga pagsasaalang-alang sa enterprise security
- **Integrasyon ng Teknolohiya**: Komprehensibong saklaw ng modernong Azure services at AI integration patterns
- **Progresyon ng Pagkatuto**: Malinaw at istrukturadong path mula basic na konsepto hanggang production deployment

## Setyembre 26, 2025

### Pagpapahusay ng Case Studies - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Pagtutok sa Ecosystem Development
- **README.md**: Malawakang pagpapalawak gamit ang komprehensibong GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Bagong komprehensibong case study na sinusuri ang paglulunsad ng GitHub's MCP Registry noong Setyembre 2025
    - **Pagsusuri ng Problema**: Detalyadong pagsusuri sa fragmented MCP server discovery at mga hamon sa deployment
    - **Arkitekturang Solusyon**: Centralized registry approach ng GitHub na may one-click VS Code installation
    - **Epekto sa Negosyo**: Nasusukat na mga pagpapabuti sa developer onboarding at produktibidad
    - **Estratehikong Halaga**: Pagtutok sa modular agent deployment at interoperability ng mga tool
    - **Ecosystem Development**: Posisyon bilang pundasyon na plataporma para sa agentic integration
  - **Pinahusay na Istruktura ng Case Study**: In-update ang lahat ng pitong case studies na may pare-parehong format at komprehensibong paglalarawan
    - Azure AI Travel Agents: Pagtuon sa multi-agent orchestration
    - Azure DevOps Integration: Pagtutok sa workflow automation
    - Real-Time Documentation Retrieval: Implementasyon ng Python console client
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: VS Code at GitHub Copilot integration
    - Azure API Management: Mga pattern ng enterprise API integration
    - GitHub MCP Registry: Ecosystem development at community platform
  - **Komprehensibong Konklusyon**: Muling sinulat na seksyon ng konklusyon na nagha-highlight ng pitong case studies na sumasaklaw sa iba't ibang dimensyon ng MCP implementation
    - Enterprise Integration, Multi-Agent Orchestration, Developer Productivity
    - Ecosystem Development, mga kategoriyang pang-edukasyon
    - Pinalalalim na mga insight sa arkitektural na mga pattern, mga estratehiya sa implementasyon, at mga best practices
    - Binibigyang diin ang MCP bilang mature, production-ready na protocol

#### Updates sa Study Guide (study_guide.md)
- **Visual Curriculum Map**: In-update ang mindmap upang maisama ang GitHub MCP Registry sa Case Studies na seksyon
- **Paglalarawan ng Case Studies**: Pinahusay mula sa mga generic na paglalarawan patungo sa detalyadong pagbabahagi ng pitong komprehensibong case studies
- **Istruktura ng Repository**: In-update ang seksyon 10 upang ipakita ang komprehensibong coverage ng case studies na may partikular na detalye ng implementasyon
- **Integrasyon ng Changelog**: Idinagdag ang tala ng Setyembre 26, 2025 na nagdodokumento ng pagdaragdag ng GitHub MCP Registry at mga pagpapahusay ng case studies
- **Pag-update ng Petsa**: In-update ang footer timestamp upang ipakita ang pinakabagong rebisyon (Setyembre 26, 2025)

### Pagbuti ng Kalidad ng Dokumentasyon
- **Pagpapabuti ng Konsistensi**: Standardisado ang formatting at istruktura ng case study sa lahat ng pitong halimbawa
- **Komprehensibong Saklaw**: Sumasaklaw ang mga case studies sa enterprise, developer productivity, at ecosystem development scenarios
- **Estratehikong Posisyon**: Pinalalim ang pagtutok sa MCP bilang pundasyong plataporma para sa agentic system deployment
- **Integrasyon ng Mga Mapagkukunan**: In-update ang karagdagang mapagkukunan upang isama ang link ng GitHub MCP Registry

## Setyembre 15, 2025

### Pagpapalawak ng Advanced Topics - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Bagong Gabay sa Advanced Implementation
- **README.md**: Kumpletong gabay sa implementasyon para sa custom MCP transport mechanisms
  - **Azure Event Grid Transport**: Komprehensibong serverless event-driven transport implementation
    - Mga halimbawa sa C#, TypeScript, at Python na may Azure Functions integration
    - Event-driven architecture patterns para sa scalable MCP solutions
    - Mga webhook receiver at push-based message handling
  - **Azure Event Hubs Transport**: High-throughput streaming transport implementation
    - Real-time streaming na kakayahan para sa low-latency na mga scenario
    - Mga stratehiya sa partitioning at checkpoint management
    - Message batching at optimization ng performance
  - **Patterns ng Enterprise Integration**: Mga production-ready architectural example
    - Distributed MCP processing sa maraming Azure Functions
    - Hybrid transport architectures na gumagamit ng maraming uri ng transport
    - Mga stratehiya para sa message durability, reliability, at error handling
  - **Seguridad at Monitoring**: Azure Key Vault integration at mga pattern para sa observability
    - Managed identity authentication at least privilege access
    - Application Insights telemetry at pag-monitor ng performance
    - Circuit breakers at fault tolerance patterns
  - **Testing Frameworks**: Komprehensibong mga stratehiya sa pagsubok para sa custom transports
    - Unit testing gamit ang test doubles at mocking frameworks
    - Integration testing gamit ang Azure Test Containers
    - Mga konsiderasyon para sa performance at load testing

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Lumilitaw na Disiplina ng AI
- **README.md**: Komprehensibong pagsisiyasat ng context engineering bilang lumalabas na larangan
  - **Mga Pangunahing Prinsipyo**: Kompletong pagbabahagi ng konteksto, pagkaalam sa action decision, at pamamahala ng context window
  - **Pagkakahanay sa MCP Protocol**: Paano tinutugunan ng disenyo ng MCP ang mga hamon sa context engineering
    - Mga limitasyon ng context window at mga stratehiya sa progresibong pag-load
    - Pagtukoy ng relevance at dynamic na pagkuha ng konteksto
    - Multi-modal na paghawak ng konteksto at mga pagsasaalang-alang sa seguridad
  - **Mga Paraan ng Implementasyon**: Single-threaded kumpara sa multi-agent architectures
    - Mga teknik sa pag-chunk at pag-prioritize ng konteksto
    - Progresibong pag-load ng konteksto at mga stratehiya sa compression
    - Mga nakalap na pamamaraan ng konteksto at optimization ng pagkuha
  - **Balangkas ng Pagsusukat**: Mga umuusbong na sukatan para sa pagsusuri ng bisa ng konteksto
    - Kahusayan ng input, performance, kalidad, at karanasan ng gumagamit
    - Mga eksperimento para sa pag-optimisa ng konteksto
    - Pagsusuri sa mga pagkabigo at metodolohiya ng pagpapabuti

#### Updates sa Navigasyon ng Kurikulum (README.md)
- **Pinahusay na Istruktura ng Module**: In-update ang talaan ng kurikulum upang isama ang mga bagong advanced topics
  - Idinagdag ang Context Engineering (5.14) at Custom Transport (5.15)
  - Tuloy-tuloy na format at mga link sa navigasyon sa lahat ng mga module
  - In-update ang mga paglalarawan upang ipakita ang kasalukuyang saklaw ng nilalaman

### Pagbuti sa Istruktura ng Direktoryo
- **Standardisasyon ng Pangalan**: Pinalitan ang "mcp transport" ng "mcp-transport" para sa konsistensi sa ibang mga folder ng advanced topic
- **Organisasyon ng Nilalaman**: Lahat ng mga folder sa 05-AdvancedTopics ay sumusunod ngayon sa consistent na pattern ng pangalan (mcp-[topic])

### Pagpapahusay ng Kalidad ng Dokumentasyon
- **Pagkakahanay sa MCP Specification**: Lahat ng bagong nilalaman ay tumutukoy sa kasalukuyang MCP Specification 2025-06-18
- **Mga Halimbawa sa Maramihang Wika**: Komprehensibong mga halimbawa ng code sa C#, TypeScript, at Python
- **Pagtutok sa Enterprise**: Mga production-ready na pattern at integrasyon sa Azure cloud sa buong dokumentasyon
- **Visual Documentation**: Mga diagram gamit ang Mermaid para sa arkitektura at visualisasyon ng daloy

## Agosto 18, 2025

### Kumpletong Pag-update ng Dokumentasyon - MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) - Kumpletong Modernisasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Buong pagsusulat muli ayon sa MCP Specification 2025-06-18
  - **Mandatory Requirements**: Idinagdag ang malinaw na mga MUST/MUST NOT requirements mula sa opisyal na specification na may malinaw na visual indicators
  - **12 Pangunahing Praktis ng Seguridad**: Muling inayos mula sa 15-item list patungo sa komprehensibong mga domain ng seguridad
    - Token Security at Authentication na may integrasyon ng external identity provider
    - Session Management at Transport Security na may mga kinakailangang kriptograpiko
    - AI-Specific Threat Protection na may Microsoft Prompt Shields integration
    - Access Control at Permissions gamit ang prinsipyo ng least privilege
    - Content Safety at Monitoring gamit ang Azure Content Safety integration
    - Supply Chain Security gamit ang komprehensibong pag-verifica ng mga bahagi
    - OAuth Security at Pag-iwas sa Confused Deputy gamit ang PKCE implementation
    - Incident Response at Recovery na may automated capabilities
    - Compliance at Governance na naka-align sa regulasyon
    - Advanced Security Controls gamit ang zero trust architecture
    - Microsoft Security Ecosystem Integration gamit ang komprehensibong mga solusyon
    - Continuous Security Evolution gamit ang adaptive na mga praktis
  - **Microsoft Security Solutions**: Pinahusay na gabay sa integrasyon para sa Prompt Shields, Azure Content Safety, Entra ID, at GitHub Advanced Security
  - **Mga Mapagkukunan para sa Implementasyon**: Naka-kategorya nang maayos ang mga link ng mga mapagkukunan ayon sa Opisyal na MCP Dokumentasyon, Microsoft Security Solutions, Mga Pamantayan sa Seguridad, at Mga Gabay sa Implementasyon

#### Advanced Security Controls (02-Security/) - Enterprise Implementation
- **MCP-SECURITY-CONTROLS-2025.md**: Kumpletong pagbabago gamit ang enterprise-grade na security framework
  - **9 Komprehensibong Security Domain**: Pinalawak mula sa mga pangunahing control patungo sa detalyadong enterprise framework
    - Advanced Authentication at Authorization na may Microsoft Entra ID integration
    - Token Security at Anti-Passthrough Controls na may komprehensibong validation
    - Session Security Controls na may pag-iwas sa hijacking
    - AI-Specific Security Controls na may proteksyon laban sa prompt injection at tool poisoning
    - Confused Deputy Attack Prevention gamit ang OAuth proxy security
    - Tool Execution Security na may sandboxing at isolation
    - Supply Chain Security Controls na may dependency verification
    - Monitoring at Detection Controls na may SIEM integration
    - Incident Response at Recovery na may automated capabilities
  - **Mga Halimbawa ng Implementasyon**: Idinagdag ang detalyadong YAML configuration blocks at mga halimbawa ng code
  - **Integrasyon ng Microsoft Solutions**: Komprehensibong saklaw ng Azure security services, GitHub Advanced Security, at enterprise identity management

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) - Production-Ready Implementation
- **README.md**: Kumpletong pagsusulat muli para sa implementasyon ng enterprise security
  - **Pagkakahanay sa Kasalukuyang Specification**: In-update sa MCP Specification 2025-06-18 na may mga mandatory security requirements
  - **Pinahusay na Authentication**: Microsoft Entra ID integration na may komprehensibong halimbawa sa .NET at Java Spring Security
  - **AI Security Integration**: Implementasyon ng Microsoft Prompt Shields at Azure Content Safety na may detalyadong halimbawa sa Python
  - **Pagsugpo sa Advanced Threats**: Komprehensibong mga halimbawa ng implementasyon para sa
    - Pag-iwas sa Confused Deputy Attack gamit ang PKCE at user consent validation
    - Pag-iwas sa Token Passthrough gamit ang audience validation at secure token management
    - Pag-iwas sa Session Hijacking gamit ang cryptographic binding at behavioral analysis
  - **Integrasyon ng Enterprise Security**: Azure Application Insights monitoring, threat detection pipelines, at supply chain security
  - **Checklist sa Implementasyon**: Malinaw na paghahati ng mandatory vs. recommended security controls kasama ang mga benepisyo ng Microsoft security ecosystem

### Kalidad at Pagkakahanay ng Dokumentasyon sa Mga Pamantayan
- **Mga Sanggunian sa Specification**: In-update ang lahat ng sanggunian sa kasalukuyang MCP Specification 2025-06-18
- **Ecosystem ng Seguridad ng Microsoft**: Pinahusay ang gabay sa integrasyon sa buong dokumentasyon ng seguridad
- **Praktikal na Implementasyon**: Idinagdag ang detalyadong mga halimbawa ng code sa .NET, Java, at Python na may mga enterprise pattern
- **Organisasyon ng Mga Mapagkukunan**: Komprehensibong kategorya para sa opisyal na dokumentasyon, mga pamantayan sa seguridad, at mga gabay sa implementasyon
- **Visual na Palatandaan**: Malinaw na pagtanda ng mga mandatory requirements kontra recommended na praktis


#### Core Concepts (01-CoreConcepts/) - Kumpletong Modernisasyon
- **Pag-update ng Bersyon ng Protocol**: In-update upang tukuyin ang kasalukuyang MCP Specification 2025-06-18 na may date-based na bersyon (format na YYYY-MM-DD)
- **Pagpino ng Arkitektura**: Pinahusay na mga paglalarawan ng Hosts, Clients, at Servers upang ipakita ang kasalukuyang mga arkitektural na pattern ng MCP
  - Ang mga Host ay malinaw na tinukoy bilang mga AI application na nag-uugnay ng maraming MCP client connections
  - Ang mga Client ay inilalarawan bilang mga protocol connector na nagpapanatili ng one-to-one server relationships
  - Ang mga Server ay pinahusay na may lokal laban sa remote deployment scenarios
- **Primitive Restructuring**: Kumpletong pagbabago ng server at client primitives
  - Server Primitives: Mga Resources (pinagmumulan ng data), Prompts (mga template), Tools (mga executable na function) na may detalyadong paliwanag at halimbawa
  - Client Primitives: Sampling (LLM completions), Elicitation (input ng user), Logging (debugging/pagsubaybay)
  - Na-update gamit ang kasalukuyang discovery (`*/list`), retrieval (`*/get`), at execution (`*/call`) method patterns
- **Protocol Architecture**: Inilunsad ang dalawang-layer na modelong arkitektura
  - Data Layer: JSON-RPC 2.0 na pundasyon na may lifecycle management at primitives
  - Transport Layer: STDIO (lokal) at Streamable HTTP na may SSE (remote) na mga mekanismo ng transportasyon
- **Security Framework**: Komprehensibong mga prinsipyo ng seguridad kabilang ang malinaw na pahintulot ng user, proteksyon sa privacy ng data, kaligtasan ng pagpapatakbo ng tool, at seguridad ng transport layer
- **Communication Patterns**: Na-update ang mga protocol message upang ipakita ang initialization, discovery, execution, at notification flows
- **Code Examples**: Pinahusay na mga multi-language na halimbawa (.NET, Java, Python, JavaScript) upang sumalamin sa kasalukuyang MCP SDK patterns

#### Security (02-Security/) - Komprehensibong Pagbabago sa Seguridad  
- **Standards Alignment**: Buong pagsunod sa MCP Specification 2025-06-18 na mga kinakailangan sa seguridad
- **Authentication Evolution**: Dokumentadong ebolusyon mula sa custom OAuth servers papunta sa external identity provider delegation (Microsoft Entra ID)
- **AI-Specific Threat Analysis**: Pinalawak na saklaw ng mga modernong AI attack vectors
  - Detalyadong mga senaryo ng prompt injection attack na may mga totoong halimbawa
  - Mga mekanismo ng tool poisoning at mga pattern ng "rug pull" attack
  - Context window poisoning at mga atake sa kalituhan ng modelo
- **Microsoft AI Security Solutions**: Komprehensibong saklaw ng Microsoft security ecosystem
  - AI Prompt Shields na may advanced detection, spotlighting, at delimiter techniques
  - Azure Content Safety integration patterns
  - GitHub Advanced Security para sa proteksyon ng supply chain
- **Advanced Threat Mitigation**: Detalyadong mga kontrol sa seguridad para sa
  - Session hijacking na may mga MCP-specific attack scenarios at mga kinakailangan sa cryptographic session ID
  - Mga problema sa confused deputy sa MCP proxy scenarios na may malinaw na mga pangangailangan sa pahintulot
  - Mga kahinaan sa token passthrough na may mandatory validation controls
- **Supply Chain Security**: Pinalawak na coverage sa AI supply chain kabilang ang foundation models, embeddings services, context providers, at third-party APIs
- **Foundation Security**: Pinahusay na integrasyon sa mga enterprise security pattern kabilang ang zero trust architecture at Microsoft security ecosystem
- **Resource Organization**: Inayos ang mga komprehensibong link ng mga resources ayon sa uri (Official Docs, Standards, Research, Microsoft Solutions, Implementation Guides)

### Documentation Quality Improvements
- **Structured Learning Objectives**: Pinahusay ang mga learning objectives na may tiyak at konkretong mga resulta
- **Cross-References**: Nagdagdag ng mga link sa pagitan ng mga kaugnay na paksa sa seguridad at pangunahing konsepto
- **Current Information**: Na-update ang lahat ng petsa at specification links sa kasalukuyang mga pamantayan
- **Implementation Guidance**: Nagdagdag ng tiyak at konkretong mga gabay sa pagpapatupad sa buong mga seksyon

## July 16, 2025

### README and Navigation Improvements
- Lubos na niredisenyo ang curriculum navigation sa README.md
- Pinalitan ang mga `<details>` tags ng mas accessible na table-based format
- Nilikha ang mga alternatibong layout na opsyon sa bagong folder na "alternative_layouts"
- Nagdagdag ng card-based, tabbed-style, at accordion-style na mga halimbawa ng navigation
- Na-update ang seksyon ng repository structure upang isama ang lahat ng pinakabagong files
- Pinahusay ang seksyon na "How to Use This Curriculum" na may malinaw na mga rekomendasyon
- Na-update ang MCP specification links upang ituro sa tamang mga URL
- Nagdagdag ng seksyon ng Context Engineering (5.14) sa istruktura ng curriculum

### Study Guide Updates
- Lubos na nirebisang study guide upang umayon sa kasalukuyang istruktura ng repository
- Nagdagdag ng mga bagong seksyon para sa MCP Clients at Tools, at Popular MCP Servers
- Na-update ang Visual Curriculum Map upang tumpak na ipakita ang lahat ng mga paksa
- Pinahusay ang mga paglalarawan ng Advanced Topics upang masaklaw ang lahat ng mga espesyal na larangan
- Na-update ang seksyon ng Case Studies upang sumalamin sa mga aktwal na halimbawa
- Idinagdag ang komprehensibong changelog na ito

### Community Contributions (06-CommunityContributions/)
- Nagdagdag ng detalyadong impormasyon tungkol sa mga MCP server para sa image generation
- Nagdagdag ng komprehensibong seksyon sa paggamit ng Claude sa VSCode
- Nagdagdag ng mga tagubilin sa setup at paggamit ng Cline terminal client
- Na-update ang MCP client section upang isama ang lahat ng popular na client options
- Pinahusay ang mga halimbawa ng kontribusyon gamit ang mas tumpak na mga code sample

### Advanced Topics (05-AdvancedTopics/)
- Inayos ang lahat ng specialized topic folders na may consistent na pagnenega
- Nagdagdag ng mga materyales at halimbawa sa context engineering
- Nagdagdag ng dokumentasyon ng integrasyon ng Foundry agent
- Pinahusay ang dokumentasyon ng integrasyon ng Entra ID security

## June 11, 2025

### Initial Creation
- Inilabas ang unang bersyon ng MCP for Beginners curriculum
- Nilikha ang batayang istruktura para sa lahat ng 10 pangunahing seksyon
- Ipinasok ang Visual Curriculum Map para sa navigation
- Nagdagdag ng mga unang sample projects sa iba't ibang programming languages

### Getting Started (03-GettingStarted/)
- Nilikha ang unang mga halimbawa ng server implementation
- Nagdagdag ng mga gabay sa pag-develop ng client
- Kasama ang mga tagubilin sa LLM client integration
- Nagdagdag ng dokumentasyon sa VS Code integration
- Ipinasok ang Server-Sent Events (SSE) server examples

### Core Concepts (01-CoreConcepts/)
- Nagdagdag ng detalyadong paliwanag ng client-server architecture
- Nilikha ang dokumentasyon sa mga key protocol components
- Nakadokumento ang messaging patterns sa MCP

## May 23, 2025

### Repository Structure
- Inisyalisa ang repository kasama ang batayang istruktura ng folder
- Nilikha ang mga README files para sa bawat pangunahing seksyon
- Inayos ang translation infrastructure
- Nagdagdag ng mga image assets at diagrams

### Documentation
- Nilikha ang unang README.md na may curriculum overview
- Nagdagdag ng CODE_OF_CONDUCT.md at SECURITY.md
- Inayos ang SUPPORT.md na may mga gabay para sa paghingi ng tulong
- Nilikha ang paunang istruktura ng study guide

## April 15, 2025

### Planning and Framework
- Inisyal na pagpaplano para sa MCP for Beginners curriculum
- Tinukoy ang mga learning objectives at target audience
- Inilatag ang 10-section na istruktura ng curriculum
- Bumuo ng conceptual framework para sa mga halimbawa at case studies
- Nilikha ang unang mga prototype na halimbawa para sa mga pangunahing konsepto

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatakwil**:
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat aming pinagsisikapang maging tama ang pagsasalin, mangyaring tandaan na ang awtomatikong pagsasalin ay maaaring magkaroon ng mga pagkakamali o di-katiyakan. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na opisyal na sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot para sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->