# Changelog: MCP para sa Curriculum ng mga Baguhan

Ang dokumentong ito ay nagsisilbing talaan ng lahat ng mahahalagang pagbabago na ginawa sa Model Context Protocol (MCP) para sa curriculum ng mga Baguhan. Ang mga pagbabago ay naitala sa reverse chronological order (pinakabago muna).

## Hunyo 24, 2026

### Bagong Aralin: Paggamit ng MCP sa Copilot app

- [Seksyon ng Tooling](./12-tooling/README.md) Idinagdag na tooling section.
- [MCP sa Copilot app](./12-tooling/01-copilot-app/README.md)

## Hunyo 16, 2026

### Pagkakahanay ng MCP Specification at Validasyon ng Halimbawa

Invalidate ang curriculum laban sa kasalukuyang **MCP Specification 2025-11-25** at ang pinakabagong opisyal na SDKs, pagkatapos ay inayos ang mga natitirang luma nang sanggunian ng specification at kinumpirma na ang mga pangunahing halimbawa ay patuloy na nagbuo at tumatakbo.

#### Mga Pagwawasto sa Bersyon ng Specification (2025-06-18 / 2025-03-26 → 2025-11-25)

Inupdate ang nilalamang English kung saan sinasabing mas luma pang bersyon ng spec ang *kasalukuyan/pinaka-bago* standard, at nirepuntahan ang mga link sa canonical na `modelcontextprotocol.io` spec paths:
- **05-AdvancedTopics/mcp-security/README.md**: Inupdate ang banner na "Current Standard", panimula, heading ng pangunahing prinsipyo ng seguridad, heading ng mga mandatoryong pangangailangan, seksyon ng Microsoft Entra ID, mga link sa References & Resources, at ang pangwakas na security notice (8 references) sa 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Inupdate ang link ng Additional Resources spec at ang banner na "Current Standard" sa 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pinalitan ang lipas nang `2025-03-26` security-and-trust link ng kasalukuyang 2025-11-25 na pahina ng best practices sa seguridad
- **03-GettingStarted/14-sampling/README.md**: Inupdate ang opisyal na sampling docs link sa 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Inupdate ang kasalukuyang present-tense na "current MCP specification" reference at ang Additional Resources spec link sa 2025-11-25 (pinanatili ang makasaysayang SSE-deprecation notes para sa katumpakan)

#### Validasyon ng Halimbawa laban sa Kasalukuyang SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` naayos ang `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pumasa nang walang type errors — nananatiling valid ang umiiral na `McpServer`/`StdioServerTransport` APIs
- **Python (03-GettingStarted/01-first-server/solution/python)**: Na-validate sa isang isolated na `.venv` gamit ang `mcp[cli]` (1.27.2); pumasa ang `py_compile` at `FastMCP.list_tools()` na matagumpay na nagbalik ng mga `add` at `subtract` na tools
- Kinumpirma na ang lahat ng sample `@modelcontextprotocol/sdk` na version ranges (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ay malinis na nagpapasya sa kasalukuyang `1.29.0` nang walang breaking API changes

#### Pagkakahanay ng Dependency Pin (pagsara ng mga version gaps)

Pinataas ang outdated SDK pins upang sundan ng bawat sample ang kasalukuyang MCP release, na sumusunod sa repo-wide convention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Pinataas ang `@modelcontextprotocol/sdk` mula `^1.8.0` → `>=1.26.0` at inupdate ang lumang `"updated for MCP 2025-06-18"` package description sa `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** at **lab4/code/github_mcp_server/pyproject.toml**: Pinataas ang eksaktong pin `mcp==1.23.0` → `mcp>=1.26.0`; muling ginawa ang parehong `uv.lock` files (`uv lock`) upang matiyak na ang mga lockfiles ay sumusunod sa kasalukuyang `mcp 1.27.2` at naka-sync sa mga manifests

#### Analisis ng Curriculum Gap — Pinakabagong Saklaw ng Spec Feature

Kinumpirma na saklaw ng curriculum ang lahat ng primitives na ipinakilala/pinalawak sa MCP 2025-11-25, kaya walang kulang na nilalaman:
- **Sampling**: Aralin 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (kasama ang URL mode)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Naitala sa 00-Introduction, 01-CoreConcepts, at 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimental, pangmatagalang operasyon)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Annotasyon ng Tool** (`readOnlyHint` / `destructiveHint`): Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features

### Pagpapalakas ng Seguridad at Pag-ayos ng Mga Vulnerability ng Dependency

Isinagawa ang kumpletong security pass sa bawat dependency manifest at sample na source code, pagkatapos ay inayos lahat ng naiulat na npm advisories at isang code-level finding. Pagkatapos ng remediation, ang `npm audit` ay nag-ulat ng **0 vulnerabilities** sa bawat inaudit na direktoryo.

#### Mga Vulnerability sa npm Dependency (transitive) — Naayos

Inauditan ang lahat ng 15 committed `package-lock.json` files. Ang mga vulnerability ay limitado lamang sa mga transitive dependencies na kinukuha ng MCP Inspector dev tool, OpenAI client, at MCP SDK; lahat ay naaayos na nang hindi sinisira ang mga samples:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** at **lab3/code/weather_mcp/inspector**: Pinataas ang `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), na nagtanggal sa bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` at `ws` advisories. Dinagdag ang npm `overrides` entry na pumipilit sa patched `shell-quote@1.8.4` upang alisin ang natitirang critical advisory na dala ng `concurrently`; muling ginawa ang parehong lockfiles (ngayon ay 0 vulnerabilities)
- **03-GettingStarted/samples/typescript**: `npm audit fix` naupdate ang transitive `qs` (moderate) sa patched release
- **03-GettingStarted/samples/javascript**: `npm audit fix` naupdate ang transitive `hono` (moderate) sa patched release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` naupdate ang transitive `form-data` (high) sa patched release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Nilikha ang nawawalang `package-lock.json` upang gawing reproducible at auditable ang proyekto (0 vulnerabilities)

#### Pag-aayos ng Seguridad Sa Antas ng Code (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tinanggal ang `shell=True` mula sa tool na `open_in_vscode`. Ang dating `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` ay nagpapahintulot ng shell metacharacters sa isang folder path na ma-interpret ng `cmd.exe` (command-injection vector). Ngayon ay direktang inilulunsad ang resolved na `Code.exe` gamit ang folder bilang argumento — walang shell — na pantay at ligtas

#### Pagsusuri ng Python Dependency

- Inauditan ang bawat set ng Python requirements gamit ang `pip-audit`. Ang `05-AdvancedTopics` at `03-GettingStarted/samples/python` ay nag-ulat ng **walang kilalang vulnerabilities** (ang kanilang `mcp` / `httpx` / `pydantic` / `python-dotenv` ranges ay sumusunod sa mga kasalukuyang patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: Tinukoy ng `pip-audit` ang transitive dependency na **`werkzeug` 3.1.1** na may tatlong `safe_join` Windows device-name DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, at `CVE-2026-27199` (lahat ay naayos sa 3.1.6). Dinagdag ang eksaktong security pin `werkzeug>=3.1.6` upang masiguro na ang patched release ang gagamitin; tiniyak na ang constraint ay malinis na sumusunod sa `chainlit` / `mcp` / `semantic-kernel` stack

### Pagbabago ng Pangalan ng Produkto

Inupdate ang lahat ng nilalaman ng curriculum upang ipakita ang rebranding ng produkto ng Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Inupdate ang link ng Discord community
- **AGENTS.md**: Inupdate ang Discord server reference
- **README.md**: Inupdate ang mga reperensya sa ekosistema ng teknolohiya
- **study_guide.md**: Inupdate ang mga case study references
- **05-AdvancedTopics/README.md**: Inupdate ang pamagat at deskripsyon ng Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Inupdate ang section header at deskripsyon
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Buong update ng pamagat ng module at nilalaman
- **05-AdvancedTopics/mcp-security-entra/README.md**: Inupdate ang cross-reference link
- **07-LessonsfromEarlyAdoption/README.md**: Inupdate ang mga case study references
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Inupdate ang Section 9 header, badges, at mga kakayahan
- **08-BestPractices/README.md**: Inupdate ang Discord community link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Inupdate ang Discord channel reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Inupdate ang reperensya sa model deployment
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Inupdate ang AI Services table
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Inupdate ang mga reperensya sa resources

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para sa VS Code
- **README.md**: Inupdate ang pangunahing reperensya ng curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Inupdate ang pamagat ng module, overview, at lahat ng mga header ng module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Inupdate ang pamagat, mga layunin sa pagkatuto, mga tagubilin sa setup, at mga resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Inupdate ang pamagat, mga layunin sa pagkatuto, MCP hosts table, at cross-references
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Inupdate ang pamagat, badges, prerequisites, at mga resource
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Inupdate ang mga reperensya ng Agent Builder at feedback link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Inupdate ang mga prerequisites at reperensya sa extension

---

## Abril 11, 2026

### Bagong Aralin, Pag-aayos ng Dokumentasyon, at Pag-update ng Dependency

#### Bagong Nilalaman ng Curriculum na Idinagdag

**Module 05 - Advanced Topics**
- **Aralin 5.17: Adversarial Multi-Agent Reasoning gamit ang MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Bagong komprehensibong gabay na sumasaklaw sa adversarial debate pattern para sa multi-agent systems
  - Mermaid architecture diagram: dalawang agent → shared MCP server → debate transcript → judge → verdict
  - Shared MCP tool server (`web_search` + `run_python`) na ipinatupad sa Python at TypeScript
  - Magkasalungat na system prompts (FOR / AGAINST / Judge) na may malinaw na mga kailangan sa paggamit ng tool
  - Debate orchestrator sa Python, TypeScript, at C# na nagma-manage ng mga rounds at mogorouter ng mga argumento
  - MCP `ClientSession` wiring para sa orchestrator sa tunay na pagtawag ng tool
  - Table ng mga use-case (hallucination detection, threat modeling, API design review, factual verification, tech selection)
  - Mga konsiderasyon sa seguridad: sandboxed execution, validation ng tool-call, rate limiting, audit logging
  - Naka-strukturang ehersisyo na may tatlong praktikal na scenario (code review, architecture decision, content moderation)

#### Pag-aayos ng Dokumentasyon

**Module 03 - Getting Started**
- **05-stdio-server/README.md**: Inayos ang hindi kumpletong TypeScript stdio server example — idinagdag ang nawawalang transport instantiation (`new StdioServerTransport()`) at `server.connect(transport)` tawag upang tumugma sa mga halimbawa ng Python at .NET sa parehong seksyon
- **14-sampling/README.md**: Inayos ang typographical error — tinama ang `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Mga Pag-update sa Curriculum

**Pangunahing README.md**
- Idinagdag ang entry 5.17 (Adversarial Multi-Agent Reasoning gamit ang MCP) sa curriculum table na may direktang link sa bagong aralin

**05-AdvancedTopics/README.md**
- Idinagdag ang Lesson 5.17 na hilera sa lessons table

**study_guide.md**
- Idinagdag ang Adversarial Multi-Agent Reasoning na paksa sa mind-map at prose description ng Advanced Topics

#### Pag-aayos ng Code at Seguridad

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Pag-aayos ng Seguridad — command injection**: Pinalitan ang `execSync` shell interpolation ng `execFile` + `promisify` sa TypeScript na `run_python` tool, tinanggal ang command injection surface (ang LLM-controlled na code ay ipinapasa na ngayon bilang literal na argv element na walang kasali na shell)
- **Pagkokonekta ng MCP tool loop**: In-update ang Python debate orchestrator upang gamitin ang `AsyncAnthropic` client (pinalitan ang blocking sync na `Anthropic`), magpasa ng live na `ClientSession` diretso sa bawat turn ng agent, kunin ang mga tool definition gamit ang `session.list_tools()` sa bawat turn, at mag-dispatch ng `tool_use` blocks gamit ang `session.call_tool()` sa loop hanggang maglabas ang modelo ng final na text response

#### Mga Update sa Dependency

- Pinalakas ang `hono` sa 4.12.12 sa maraming packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Pinalakas ang `@hono/node-server` mula 1.19.11 hanggang 1.19.13 sa TypeScript packages
- Pinalakas ang `cryptography` mula 46.0.5 hanggang 46.0.7 sa Python packages (10-StreamliningAIWorkflows labs 3 at 4)
- Pinalakas ang `lodash` mula 4.17.23 hanggang 4.18.1 sa 10-StreamliningAIWorkflows inspector

#### Mga Pagsasalin

- Sinync ang mga pagsasalin para sa 48+ na wika gamit ang pinakabagong mga pagbabago sa source (i18n update)

---

## Pebrero 5, 2026

### Pagsusuri at Pagpapabuti ng Navigation sa Buong Repository

#### Mga Bagong Nilalaman sa Kurikulum

**Module 03 - Getting Started**
- **12-mcp-hosts/README.md**: Bagong komprehensibong gabay para sa pag-setup ng MCP hosts
  - Mga halimbawa ng configuration para sa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mga template ng JSON configuration para sa lahat ng pangunahing hosts
  - Talaan ng paghahambing ng mga uri ng transport (stdio, SSE/HTTP, WebSocket)
  - Pag-aayos sa mga karaniwang isyu sa koneksyon
  - Mga pinakamahusay na pamamaraan sa seguridad para sa host configuration

- **13-mcp-inspector/README.md**: Bagong gabay sa pag-debug para sa MCP Inspector
  - Mga paraan ng pag-install (npx, npm global, mula sa source)
  - Pagkonekta sa mga server gamit ang stdio at HTTP/SSE
  - Mga workflow para sa pagsusuri ng mga tools, resources, at prompts
  - Integrasyon ng VS Code sa MCP Inspector
  - Mga karaniwang senaryo ng pag-debug na may mga solusyon

**Module 04 - Practical Implementation**
- **pagination/README.md**: Bagong gabay sa pagpapatupad ng pagination
  - Mga pattern ng cursor-based pagination sa Python, TypeScript, Java
  - Pagharap sa client-side pagination
  - Mga diskarte sa disenyo ng cursor (opaque vs. structured)
  - Mga rekomendasyon para sa pag-optimize ng performance

**Module 05 - Advanced Topics**
- **mcp-protocol-features/README.md**: Malalim na pagsisid sa mga tampok ng protocol
  - Pagpapatupad ng progress notifications
  - Mga pattern para sa pagkansela ng request
  - Mga template ng resource na may mga pattern ng URI
  - Pamamahala ng lifecycle ng server
  - Kontrol sa antas ng pag-log
  - Mga pattern sa paghawak ng error gamit ang mga JSON-RPC code

#### Mga Pag-aayos sa Navigation (24+ na mga file ang na-update)

**Pangunahing Module READMEs**
 Ngayon ay may link sa unang aralin AT sumusunod na module

**02-Security na Sub-files**
- Lahat ng 5 suportang dokumento sa seguridad ay may "What's Next" navigation:

**09-CaseStudy na mga File**
- Lahat ng case study files ay may sequential navigation:

**10-StreamliningAI Labs**
Nagdagdag ng seksyon na What's Next sa Module 10 overview at Module 11

#### Mga Pag-aayos sa Code at Nilalaman

**SDK at Dependency Updates**
Naayos ang walang laman na bersyon ng openai sa `^4.95.0`
In-update ang SDK mula `^1.8.0` hanggang `>=1.26.0`
In-update ang mga mcp version pins sa `>=1.26.0`

**Pag-aayos ng Code**
Naayos ang maling model `gpt-4o-mini` sa `gpt-4.1-mini`

**Pag-aayos ng Nilalaman**
Naayos ang sirang link `READMEmd` → `README.md`, naayos ang header ng kurikulum `Module 1-3` → `Module 0-3`, naayos ang case-sensitive na path
Tinanggal ang sirang duplicate na Case Study 5 content

**Pagpapabuti sa Patnubay para sa Nagsisimula**
Nagdagdag ng tamang pagpapakilala, mga layunin sa pagkatuto, at mga kinakailangan para sa mga nagsisimula

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Nagdagdag ng mga entry 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) sa talahanayan ng kurikulum

**Module READMEs**
Nagdagdag ng mga aralin 12 at 13 sa listahan ng aralin
Nagdagdag ng seksyon ng Practical Guides na may link sa pagination
Nagdagdag ng mga aralin 5.15 (Custom Transport) at 5.16 (Protocol Features)

**study_guide.md**
- Na-update ang mindmap na may lahat ng bagong paksa: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Enero 28, 2026

### Review sa Pagsunod sa MCP Specification 2025-11-25

#### Pagpapahusay sa Core Concepts (01-CoreConcepts/)
- **Bagong Client Primitive - Roots**: Nagdagdag ng komprehensibong dokumentasyon tungkol sa Roots client primitive, na nagpapahintulot sa mga server na maunawaan ang boundaries ng filesystem at mga pahintulot sa pag-access
- **Tool Annotations**: Nagdagdag ng dokumentasyon tungkol sa mga behavioral annotation ng tool (`readOnlyHint`, `destructiveHint`) para sa mas mahusay na pagdedesisyon sa pagpapatupad ng mga tool
- **Pagtatawag ng Tool sa Sampling**: In-update ang dokumentasyon sa Sampling upang isama ang mga parameter na `tools` at `toolChoice` para sa pagtawag ng tool na pinamumunuan ng modelo sa mga sampling request
- **URL Mode Elicitation**: Nagdagdag ng dokumentasyon tungkol sa URL-based elicitation para sa mga server-initiated na panlabas na web interactions
- **Tasks (Experimental)**: Nagdagdag ng bagong seksyon na nagdodokumento sa experimental na tampok na Tasks para sa durable execution wrappers at deferred result retrieval
- **Suporta sa Icons**: Napansin na ang mga tools, resources, resource templates, at prompts ay maaari na ngayong magsama ng icons bilang dagdag na metadata

#### Mga Update sa Dokumentasyon
- **README.md**: Nagdagdag ng talatang tumutukoy sa MCP Specification 2025-11-25 at paliwanag sa bersyon ayon sa petsa
- **study_guide.md**: Na-update ang mapa ng kurikulum upang isama ang Tasks at Tool Annotations sa seksyon ng Core Concepts; na-update ang timestamp ng dokumento

#### Pag-verify ng Pagsunod sa Specification
- **Bersyon ng Protocol**: Kinumpirma na lahat ng dokumentasyon ay tumutukoy sa kasalukuyang MCP Specification 2025-11-25
- **Pag-align ng Arkitektura**: Nakumpirma ang katumpakan ng dokumentasyon para sa dalawang-layer na arkitektura (Data Layer + Transport Layer)
- **Dokumentasyon ng Primitives**: Na-validate ang mga server primitives (Resources, Prompts, Tools) at client primitives (Sampling, Elicitation, Logging, Roots)
- **Transport Mechanisms**: Nakumpirma ang katumpakan ng dokumentasyon para sa STDIO at Streamable HTTP transport
- **Patnubay sa Seguridad**: Nakumpirma ang pagkakatugma sa kasalukuyang MCP Security Best Practices na dokumentasyon

#### Mga Pangunahing Tampok ng MCP 2025-11-25 na Na-dokumento
- **OpenID Connect Discovery**: Auth server discovery gamit ang OIDC
- **OAuth Client ID Metadata Documents**: Inirekomendang mekanismo para sa pagpaparehistro ng client
- **JSON Schema 2020-12**: Default na dialekto para sa MCP schema definitions
- **SDK Tiering System**: Pormal na mga kinakailangan para sa suportang tampok ng SDK at maintenance
- **Gobyernong Estruktura**: Pormal na mga Working Groups at Interest Groups sa pamamahala ng MCP

### Malaking Update sa Dokumentasyon ng Seguridad (02-Security/)

#### Integrasyon ng MCP Security Summit Workshop (Sherpa)
- **Bagong Hands-On Training Resource**: Nagdagdag ng komprehensibong integrasyon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) sa lahat ng dokumentasyon sa seguridad
- **Coverage ng Expedition Route**: Dinokumento ang buong progreso mula Base Camp hanggang Summit
- **Pag-align sa OWASP**: Lahat ng gabay sa seguridad ay naka-map ngayon sa mga panganib ng OWASP MCP Azure Security Guide

#### Integrasyon ng OWASP MCP Top 10
- **Bagong Seksyon**: Nagdagdag ng talahanayan ng OWASP MCP Top 10 Security Risks na may Azure mitigations sa pangunahing Security README
- **Dokumentasyon Batay sa Panganib**: Na-update ang mcp-security-controls-2025.md gamit ang mga reference ng OWASP MCP risk sa bawat domain ng seguridad
- **Reference Architecture**: Inuugnay sa OWASP MCP Azure Security Guide reference architecture at mga pattern ng pagpapatupad

#### Mga Na-update na Security Files
- **README.md**: Nagdagdag ng overview ng Sherpa Workshop, talahanayan ng ruta ng ekspedisyon, buod ng OWASP MCP Top 10 risks, at seksyon ng hands-on training
- **mcp-security-controls-2025.md**: Na-update ang header sa Pebrero 2026, nagdagdag ng OWASP risk references (MCP01-MCP08), naayos ang inconsistency ng bersyon ng spec
- **mcp-security-best-practices-2025.md**: Nagdagdag ng seksyon para sa Sherpa at OWASP resources, na-update ang timestamp
- **mcp-best-practices.md**: Nagdagdag ng seksyon sa hands-on training na may Sherpa at OWASP links
- **azure-content-safety-implementation.md**: Nagdagdag ng OWASP MCP06 reference, pag-align sa Sherpa Camp 3, at karagdagang seksyon ng resources

#### Mga Bagong Link sa Resource na Idinagdag
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Mga indibidwal na pahina ng panganib ng OWASP MCP (MCP01-MCP10)

### Pagsunod ng Buong Kurikulum sa MCP Specification 2025-11-25

#### Module 03 - Getting Started
- **SDK Documentation**: Idinagdag ang Go SDK sa opisyal na listahan ng SDK; in-update ang lahat ng reference sa SDK upang tumugma sa MCP Specification 2025-11-25
- **Paglilinaw sa Transport**: In-update ang mga paglalarawan sa STDIO at HTTP Streaming transport na may eksaktong reference sa spec

#### Module 04 - Practical Implementation
- **SDK Updates**: Idinagdag ang Go SDK; in-update ang listahan ng SDK na may reference sa bersyon ng specification
- **Authorization Spec**: In-update ang MCP Authorization specification link sa kasalukuyang bersyon na 2025-11-25

#### Module 05 - Advanced Topics
- **Bagong Tampok**: Nagdagdag ng tala tungkol sa mga bagong tampok ng MCP Specification 2025-11-25 (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Security Resources**: Nagdagdag ng mga link sa OWASP MCP Top 10 at Sherpa workshop sa karagdagang sanggunian

#### Module 06 - Community Contributions
- **SDK List**: Idinagdag ang Swift at Rust SDKs; in-update ang specification link sa 2025-11-25
- **Spec Reference**: In-update ang MCP Specification link papunta sa direktang URL ng specification

#### Module 07 - Lessons from Early Adoption
- **Resource Updates**: Idinagdag ang MCP Specification 2025-11-25 link at OWASP MCP Top 10 sa karagdagang resources

#### Module 08 - Best Practices
- **Spec Version**: In-update ang MCP Specification reference sa 2025-11-25
- **Security Resources**: Idinagdag ang OWASP MCP Top 10 at Sherpa workshop sa karagdagang sanggunian

#### Module 10 - Streamlining AI Workflows
- **Badge Update**: Pinalitan ang MCP version badge mula sa SDK version (1.9.3) papunta sa specification version (2025-11-25)
- **Resource Links**: In-update ang MCP Specification link; dinagdag ang OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Spec Reference**: In-update ang MCP Specification link sa bersyon na 2025-11-25
- **Security Resources**: Idinagdag ang OWASP MCP Top 10 sa opisyal na resources

## Disyembre 18, 2025

### Update sa Dokumentasyon ng Seguridad - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Update ng Bersyon ng Specification
- **Update ng Bersyon ng Protocol**: In-update upang tumukoy sa pinakabagong MCP Specification 2025-11-25 (inilabas noong Nobyembre 25, 2025)
  - In-update lahat ng reference sa bersyon ng specification mula 2025-06-18 papuntang 2025-11-25
  - In-update ang mga petsa ng dokumento mula Agosto 18, 2025 papuntang Disyembre 18, 2025
  - Kinumpirma na lahat ng URL ng specification ay tumutukoy sa kasalukuyang dokumentasyon
- **Pagpapatunay ng Nilalaman**: Komprehensibong pagsusuri ng mga pinakamahusay na kasanayan sa seguridad laban sa pinakabagong pamantayan
  - **Microsoft Security Solutions**: Kinumpirma ang kasalukuyang mga termino at link para sa Prompt Shields (dati ay "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, at Azure Key Vault
  - **OAuth 2.1 Security**: Nakumpirma ang pagkakatugma sa pinakabagong mga pinakamahusay na kasanayan sa seguridad ng OAuth
  - **Pamantayan ng OWASP**: Na-validate ang mga reference sa OWASP Top 10 para sa LLMs na nananatiling napapanahon
  - **Azure Services**: Kinumpirma ang lahat ng link sa Microsoft Azure documentation at mga pinakamahusay na kasanayan
- **Pagkakatugma sa Pamantayan**: Lahat ng tinukoy na pamantayan sa seguridad ay kinumpirma bilang napapanahon
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure security at compliance frameworks
- **Mga Resource para sa Implementasyon**: Kinumpirma lahat ng mga gabay at resources para sa pagpapatupad
  - Azure API Management authentication patterns
  - Mga gabay sa integrasyon ng Microsoft Entra ID
  - Pamamahala ng lihim sa Azure Key Vault
  - Mga pipeline at solusyon sa monitoring para sa DevSecOps

### Pagtiyak sa Kalidad ng Dokumentasyon
- **Pagsunod sa Specification**: Tiniyak na lahat ng sapilitang MCP security requirements (MUST/MUST NOT) ay naka-align sa pinakabagong specification
- **Kapanahonan ng mga Resource**: Kinumpirma ang lahat ng panlabas na link sa Microsoft documentation, mga pamantayan sa seguridad, at mga gabay sa implementasyon
- **Saklaw ng Pinakamahusay na Kasanayan**: Kinumpirma ang komprehensibong saklaw ng authentication, authorization, AI-specific na banta, seguridad sa supply chain, at mga pattern sa enterprise

## Oktubre 6, 2025

### Pagpapalawak ng Seksyon ng Getting Started – Advanced Server Usage at Simpleng Authentication

#### Advanced Server Usage (03-GettingStarted/10-advanced)
- **Bagong Kabanata Idinagdag**: Inilunsad ang komprehensibong gabay sa advanced na paggamit ng MCP server, na sumasaklaw sa parehong regular at low-level na arkitektura ng server.
  - **Regular vs. Low-Level Server**: Detalyadong paghahambing at mga halimbawa ng code sa Python at TypeScript para sa parehong mga pamamaraan.
  - **Handler-Based Design**: Paliwanag tungkol sa handler-based na pamamahala ng tool/resource/prompt para sa scalable at flexible na mga implementasyon ng server.
  - **Practical Patterns**: Mga totoong senaryo kung saan kapaki-pakinabang ang mga low-level server patterns para sa advanced na mga tampok at arkitektura.

#### Simple Authentication (03-GettingStarted/11-simple-auth)
- **Bagong Kabanata na Idinagdag**: Step-by-step na gabay sa pagpapatupad ng simple authentication sa MCP servers.
  - **Auth Concepts**: Malinaw na paliwanag tungkol sa authentication vs. authorization, at paghawak ng mga kredensyal.
  - **Basic Auth Implementation**: Middleware-based na mga pattern ng authentication sa Python (Starlette) at TypeScript (Express), kasama ang mga sample ng code.
  - **Progression to Advanced Security**: Gabay sa pagsisimula sa simple auth at pag-usad patungo sa OAuth 2.1 at RBAC, kasama ang mga sanggunian sa advanced na mga module ng seguridad.

Ang mga pagdaragdag na ito ay nagbibigay ng praktikal, hands-on na gabay para sa pagbuo ng mas matibay, ligtas, at flexible na implementasyon ng MCP server, na nag-uugnay sa mga pundamental na konsepto sa mga advanced na pattern ng produksyon.

## Setyembre 29, 2025

### MCP Server Database Integration Labs - Komprehensibong Hands-On na Landas ng Pag-aaral

#### 11-MCPServerHandsOnLabs - Bagong Kumpletong Kurikulum sa Database Integration
- **Kumpletong 13-Lab na Landas ng Pag-aaral**: Idinagdag ang komprehensibong hands-on na kurikulum para sa pagbuo ng production-ready na mga MCP server na may PostgreSQL database integration
  - **Totoong Implementasyon**: Use case ng Zava Retail analytics na nagpapakita ng enterprise-grade na mga pattern
  - **Istrakturadong Progresyon ng Pag-aaral**:
    - **Labs 00-03: Mga Pundasyon** - Panimula, Core Architecture, Seguridad at Multi-Tenancy, Pag-setup ng Kapaligiran
    - **Labs 04-06: Pagbuo ng MCP Server** - Disenyo ng Database at Schema, Implementasyon ng MCP Server, Pagpapaunlad ng Tool  
    - **Labs 07-09: Advanced na Mga Tampok** - Semantic Search Integration, Pagsusuri at Pag-debug, VS Code Integration
    - **Labs 10-12: Produksyon at Pinakamahusay na Praktis** - Mga Estratehiya sa Deployment, Monitoring at Observability, Pinakamahusay na Praktis at Pag-optimize
  - **Teknolohiyang Pang-enterprise**: FastMCP framework, PostgreSQL gamit ang pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Advanced na Mga Tampok**: Row Level Security (RLS), semantic search, multi-tenant data access, vector embeddings, real-time monitoring

#### Terminology Standardization - Pagbabago mula Module patungo Lab
- **Komprehensibong Pag-update ng Dokumentasyon**: Sistematikong in-update ang lahat ng README files sa 11-MCPServerHandsOnLabs upang gamitin ang terminolohiyang "Lab" sa halip na "Module"
  - **Mga Header ng Seksyon**: In-update ang "What This Module Covers" sa "What This Lab Covers" sa lahat ng 13 labs
  - **Deskripsyon ng Nilalaman**: Pinalitan ang "This module provides..." ng "This lab provides..." sa buong dokumentasyon
  - **Mga Layunin sa Pag-aaral**: In-update ang "By the end of this module..." sa "By the end of this lab..."
  - **Mga Link sa Navigasyon**: Pinalitan lahat ng "Module XX:" na mga sanggunian sa "Lab XX:" sa mga cross-references at navigasyon
  - **Pagsubaybay sa Pagkumpleto**: In-update ang "After completing this module..." sa "After completing this lab..."
  - **Napanatiling Teknikal na Sanggunian**: Pinanatili ang mga sanggunian sa Python module sa mga configuration file (hal., `"module": "mcp_server.main"`)

#### Pagpapahusay ng Study Guide (study_guide.md)
- **Visual Curriculum Map**: Idinagdag ang bagong seksyon na "11. Database Integration Labs" na may komprehensibong visualisasyon ng istraktura ng lab
- **Istraktura ng Repositoryo**: In-update mula sampu tungo sa labing-isang pangunahing seksyon na may detalyadong paglalarawan ng 11-MCPServerHandsOnLabs
- **Gabay sa Landas ng Pag-aaral**: Pinalakas ang mga tagubilin sa navigasyon upang masaklaw ang mga seksyon 00-11
- **Saklaw ng Teknolohiya**: Idinagdag ang detalye ng FastMCP, PostgreSQL, at Azure services integration
- **Mga Kinalabasan sa Pag-aaral**: Binigyang-diin ang pagbuo ng production-ready na server, mga pattern ng database integration, at enterprise security

#### Pagpapahusay ng Pangunahing README Structure
- **Terminolohiya Batay sa Lab**: In-update ang pangunahing README.md sa 11-MCPServerHandsOnLabs upang palagian gamitin ang istraktura ng "Lab"
- **Organisasyon ng Landas ng Pag-aaral**: Malinaw na progresyon mula sa pundamental na mga konsepto hanggang sa advanced na implementasyon at deployment sa produksyon
- **Tumutok sa Totoong Mundo**: Binibigyang-diin ang praktikal, hands-on na pag-aaral gamit ang enterprise-grade na mga pattern at teknolohiya

### Pagpapahusay ng Kalidad at Konsistensi ng Dokumentasyon
- **Pagtutok sa Hands-On Learning**: Pinatibay ang praktikal, lab-based na paraan sa buong dokumentasyon
- **Pokus sa Enterprise Patterns**: Binanggit ang production-ready na mga implementasyon at mga konsiderasyon sa enterprise security
- **Integrasyon ng Teknolohiya**: Komprehensibong saklaw ng makabagong Azure services at AI integration patterns
- **Progresyon sa Pag-aaral**: Malinaw at istrakturadong landas mula pundasyon ng mga konsepto hanggang sa deployment sa produksyon

## Setyembre 26, 2025

### Pagpapahusay ng Case Studies - Integrasyon ng GitHub MCP Registry

#### Case Studies (09-CaseStudy/) - Pokus sa Pagpapaunlad ng Ecosystem
- **README.md**: Malawakang pagpapalawak na may komprehensibong GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Bagong komprehensibong pag-aaral ng kaso tungkol sa paglulunsad ng GitHub MCP Registry noong Setyembre 2025
    - **Pagsusuri ng Problema**: Detalyadong pagsusuri ng fragmented na MCP server discovery at mga hamon sa deployment
    - **Arkitektura ng Solusyon**: Centralized registry approach ng GitHub na may one-click VS Code installation
    - **Epekto sa Negosyo**: Nasusukat na pagpapabuti sa onboarding ng developer at produktibidad
    - **Halagang Pang-estratehiya**: Pagtutok sa modular na deployment ng agent at interoperability ng mga tool
    - **Pagpapaunlad ng Ecosystem**: Pagpo-posisyon bilang pundasyon ng platform para sa agentic integration
  - **Pinahusay na Estraktura ng Case Study**: In-update lahat ng pitong case studies na may pare-parehong format at komprehensibong mga paglalarawan
    - Azure AI Travel Agents: Pagtutok sa multi-agent orchestration
    - Azure DevOps Integration: Pagtutok sa workflow automation
    - Real-Time Documentation Retrieval: Pagpapatupad ng Python console client
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: VS Code at GitHub Copilot integration
    - Azure API Management: Enterprise API integration patterns
    - GitHub MCP Registry: Pagpapaunlad ng ecosystem at community platform
  - **Komprehensibong Konklusyon**: Muling isinulat na seksyon ng konklusyon na binibigyang-diin ang pitong case studies na sumasaklaw sa maraming dimensyon ng MCP implementation
    - Enterprise Integration, Multi-Agent Orchestration, Produktibidad ng Developer
    - Pagpapaunlad ng Ecosystem, Kategorya ng Mga Aplikasyong Pang-edukasyon
    - Pinahusay na mga insight sa arkitekturang mga pattern, mga estratehiya ng implementasyon, at pinakamahusay na mga praktis
    - Pagtutok sa MCP bilang mature, production-ready na protocol

#### Mga Update ng Study Guide (study_guide.md)
- **Visual Curriculum Map**: In-update ang mindmap upang isama ang GitHub MCP Registry sa seksyon ng Case Studies
- **Paglalarawan ng Case Studies**: Pinahusay mula sa generic na mga paglalarawan tungo sa detalyadong pagsira ng pitong komprehensibong case studies
- **Istraktura ng Repositoryo**: In-update ang seksyon 10 upang ipakita ang komprehensibong saklaw ng case studies na may mga partikular na detalye ng implementasyon
- **Pag-integrate ng Changelog**: Idinagdag ang entry noong Setyembre 26, 2025 na nagdodokumento ng karagdagan ng GitHub MCP Registry at pagpapahusay ng case studies
- **Mga Update sa Petsa**: In-update ang footer timestamp upang ipakita ang pinakabagong rebisyon (Setyembre 26, 2025)

### Pagpapabuti ng Kalidad ng Dokumentasyon
- **Pagpapahusay ng Konsistensi**: Standardisadong format at istraktura ng case studies sa lahat ng pitong halimbawa
- **Komprehensibong Saklaw**: Ang mga case studies ay sumasaklaw na ngayon sa enterprise, produktibidad ng developer, at mga senaryo ng pagpapaunlad ng ecosystem
- **Estratehikong Posisyon**: Pinatibay na pokus sa MCP bilang pundasyon para sa deployment ng agentic system
- **Integrasyon ng Mga Resource**: In-update ang mga karagdagang resource upang isama ang link sa GitHub MCP Registry

## Setyembre 15, 2025

### Pagpapalawak ng Mga Advanced na Paksa - Custom Transports at Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Bagong Gabay sa Advanced na Implementasyon
- **README.md**: Kumpletong gabay sa implementasyon para sa custom MCP transport mechanisms
  - **Azure Event Grid Transport**: Komprehensibong implementasyon ng serverless event-driven transport
    - Mga halimbawa sa C#, TypeScript, at Python na may Azure Functions integration
    - Mga arkitekturang event-driven pattern para sa scalable MCP solutions
    - Mga webhook receiver at push-based message handling
  - **Azure Event Hubs Transport**: Implementasyon ng high-throughput streaming transport
    - Kakayahang real-time streaming para sa low-latency na mga senaryo
    - Mga estratehiya sa partitioning at checkpoint management
    - Batching ng mga mensahe at pag-optimize ng performance
  - **Enterprise Integration Patterns**: Mga production-ready na arkitekturang halimbawa
    - Distributed MCP processing sa maraming Azure Functions
    - Hybrid transport architectures na pinagsasama ang iba't ibang uri ng transport
    - Mga stratehiya sa durability ng mensahe, reliability, at error handling
  - **Seguridad at Monitoring**: Azure Key Vault integration at mga pattern ng observability
    - Managed identity authentication at least privilege access
    - Application Insights telemetry at performance monitoring
    - Circuit breakers at mga fault tolerance pattern
  - **Mga Testing Framework**: Komprehensibong mga stratehiya sa pagsubok para sa custom transports
    - Unit testing gamit ang test doubles at mocking frameworks
    - Integration testing gamit ang Azure Test Containers
    - Mga konsiderasyon sa performance at load testing

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Lumalabas na Disiplina ng AI
- **README.md**: Komprehensibong pagsisiyasat ng context engineering bilang isang lumalabas na larangan
  - **Mga Pangunahing Prinsipyo**: Kumpletong pagbabahagi ng konteksto, awareness sa desisyon ng aksyon, at pamamahala ng context window
  - **Pagkakatugma sa MCP Protocol**: Paano tinutugunan ng disenyo ng MCP ang mga hamon sa context engineering
    - Mga limitasyon ng context window at mga progressive loading na estratehiya
    - Pagtukoy ng kaugnayan at dynamic na pagkuha ng konteksto
    - Pamamahala ng multi-modal na konteksto at mga konsiderasyon sa seguridad
  - **Mga Pamamaraan sa Implementasyon**: Single-threaded kumpara sa multi-agent na mga arkitektura
    - Mga teknik sa context chunking at prioritization
    - Progressive context loading at mga estratehiya sa compression
    - Layered context approaches at optimization sa retrieval
  - **Framework sa Pagsusukat**: Lumalabas na mga metric para sa pagsusuri ng bisa ng konteksto
    - Kahusayan ng input, performance, kalidad, at mga konsiderasyon sa user experience
    - Mga eksperimentong pamamaraan para sa optimization ng konteksto
    - Pagsusuri ng pagkabigo at mga metodolohiya ng pagpapabuti

#### Mga Update sa Navigasyon ng Kurikulum (README.md)
- **Pinahusay na Istraktura ng Module**: In-update ang talahanayan ng kurikulum upang isama ang mga bagong advanced na paksa
  - Idinagdag ang Context Engineering (5.14) at Custom Transport (5.15) na mga entry
  - Palagian ang pag-format at mga link sa navigasyon sa lahat ng mga module
  - In-update ang mga paglalarawan upang ipakita ang kasalukuyang saklaw ng nilalaman

### Pagpapabuti ng Istraktura ng Direktoryo
- **Standardisasyon ng Pangalan**: Pinalitan ang "mcp transport" sa "mcp-transport" para sa pagkakapareho sa ibang mga folder ng advanced topics
- **Organisasyon ng Nilalaman**: Lahat ng 05-AdvancedTopics na mga folder ay sumusunod na sa pare-parehong naming pattern (mcp-[topic])

### Pagpapahusay ng Kalidad ng Dokumentasyon
- **Pagkakatugma sa MCP Specification**: Lahat ng bagong nilalaman ay tumutukoy sa kasalukuyang MCP Specification 2025-06-18
- **Mga Halimbawa sa Iba't Ibang Wika**: Komprehensibong mga halimbawa ng code sa C#, TypeScript, at Python
- **Pokus sa Enterprise**: Mga production-ready na pattern at integrasyon ng Azure cloud sa kabuuan
- **Visual na Dokumentasyon**: Mermaid diagrams para sa arkitektura at visualization ng daloy

## Agosto 18, 2025

### Komprehensibong Update ng Dokumentasyon - MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) - Kumpletong Modernisasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Kumpletong muling pagsulat na nakaayon sa MCP Specification 2025-06-18
  - **Mandatoryong Mga Kinakailangan**: Idinagdag ang mga tahasang MUST/MUST NOT requirements mula sa opisyal na espesipikasyon na may malinaw na visual indicator
  - **12 Core Security Practices**: Inistraktura mula sa 15-item na listahan tungo sa komprehensibong mga domain ng seguridad
    - Token Security at Authentication na may integrasyon ng external identity provider
    - Session Management at Transport Security gamit ang mga cryptographic na pangangailangan
    - AI-Specific Threat Protection gamit ang Microsoft Prompt Shields integration
    - Access Control at Permissions gamit ang prinsipyo ng least privilege
    - Content Safety at Monitoring na may Azure Content Safety integration
    - Supply Chain Security gamit ang komprehensibong pag-verify ng mga sangkap
    - OAuth Security at Confused Deputy Prevention gamit ang PKCE implementation
    - Incident Response at Recovery gamit ang automated na mga kakayahan
    - Compliance at Governance na nakaayon sa regulasyon
    - Advanced Security Controls na may zero trust architecture
    - Microsoft Security Ecosystem Integration gamit ang komprehensibong mga solusyon
    - Continuous Security Evolution gamit ang mga adaptive na praktis
  - **Mga Solusyon sa Microsoft Security**: Pinahusay na gabay sa integrasyon para sa Prompt Shields, Azure Content Safety, Entra ID, at GitHub Advanced Security
  - **Mga Resource para sa Implementasyon**: Nakategorya na mga komprehensibong link sa mga resource ayon sa Official MCP Documentation, Microsoft Security Solutions, Security Standards, at Implementation Guides

#### Advanced Security Controls (02-Security/) - Implementasyong Pang-enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Kumpletong muling pagsulat na may enterprise-grade security framework
  - **9 Komprehensibong Domain ng Seguridad**: Pinalawak mula sa basic controls tungo sa detalyadong enterprise framework
    - Advanced Authentication at Authorization na may Microsoft Entra ID integration
    - Token Security at Anti-Passthrough Controls na may komprehensibong pag-validate
    - Session Security Controls na may pag-iwas sa hijacking
    - AI-Specific Security Controls na may prompt injection at tool poisoning prevention
    - Confused Deputy Attack Prevention na may OAuth proxy security
    - Tool Execution Security na may sandboxing at isolation
    - Supply Chain Security Controls na may dependency verification
    - Monitoring at Detection Controls na may SIEM integration
    - Incident Response at Recovery gamit ang automated na mga kakayahan
  - **Mga Halimbawa ng Implementasyon**: Idinagdag ang mga detalyadong YAML configuration block at mga halimbawa ng code
  - **Integrasyon ng Mga Solusyon ng Microsoft**: Komprehensibong saklaw ng Azure security services, GitHub Advanced Security, at enterprise identity management

#### Advanced Topics Security (05-AdvancedTopics/mcp-security/) - Production-Ready na Implementasyon
- **README.md**: Kumpletong muling pagsulat para sa enterprise security implementation
  - **Pagkakatugma sa Kasalukuyang Espesipikasyon**: In-update sa MCP Specification 2025-06-18 na may mga mandatoryong kinakailangan sa seguridad
  - **Pinalawak na Authentication**: Microsoft Entra ID integration na may komprehensibong .NET at Java Spring Security na mga halimbawa
  - **Integrasyon ng AI Security**: Microsoft Prompt Shields at Azure Content Safety implementation na may detalyadong mga halimbawa sa Python
  - **Advanced Threat Mitigation**: Komprehensibong mga halimbawa ng implementasyon para sa
    - Confused Deputy Attack Prevention gamit ang PKCE at user consent validation
    - Token Passthrough Prevention gamit ang audience validation at secure token management
- Pag-iwas sa Session Hijacking gamit ang cryptographic binding at behavioral analysis  
- **Enterprise Security Integration**: Azure Application Insights monitoring, mga pipeline ng threat detection, at security ng supply chain  
- **Checklist ng Implementasyon**: Malinaw na paghahati ng mandatoryo laban sa inirerekomendang mga kontrol sa seguridad na may mga benepisyo mula sa Microsoft security ecosystem  

### Kalidad ng Dokumentasyon at Pagsunod sa Pamantayan  
- **Mga Sanggunian sa Espesipikasyon**: Na-update ang lahat ng sanggunian sa kasalukuyang MCP Specification 2025-06-18  
- **Microsoft Security Ecosystem**: Pinahusay na gabay sa integrasyon sa buong dokumentasyon ng seguridad  
- **Praktikal na Implementasyon**: Idinagdag ang mga detalyadong halimbawa ng code sa .NET, Java, at Python na may mga pattern para sa enterprise  
- **Organisasyon ng Mga Mapagkukunan**: Komprehensibong kategorya ng opisyal na dokumentasyon, mga pamantayan sa seguridad, at mga gabay sa implementasyon  
- **Visual na Mga Indikador**: Malinaw na marka ng mga mandatoryong pangangailangan laban sa mga inirerekomendang kasanayan  

#### Mga Pangunahing Konsepto (01-CoreConcepts/) - Kumpletong Modernisasyon  
- **Pag-update ng Bersyon ng Protocol**: Na-update upang tukuyin ang kasalukuyang MCP Specification 2025-06-18 na may bersyon batay sa petsa (format na YYYY-MM-DD)  
- **Pagpapabuti ng Arkitektura**: Pinahusay na mga paglalarawan ng Hosts, Clients, at Servers upang ipakita ang kasalukuyang mga pattern ng arkitektura ng MCP  
  - Ang mga Hosts ngayon ay malinaw na naipaliwanag bilang mga AI na aplikasyon na nagpapasya sa maraming koneksyon ng MCP client  
  - Ang mga Clients ay inilalarawan bilang mga konektor ng protocol na nagpapanatili ng isang-sa-isang relasyon sa server  
  - Ang mga Servers ay pinalawak na may mga lokal laban sa remote na mga sitwasyon ng deployment  
- **Pagbabago ng Primitives**: Kumpletong reorganisasyon ng mga primitives ng server at client  
  - Mga Primitive ng Server: Mga Resources (mga pinanggagalingan ng data), Prompts (mga template), Tools (mga executable na function) na may detalyadong paliwanag at mga halimbawa  
  - Mga Primitive ng Client: Sampling (LLM completions), Elicitation (input ng gumagamit), Logging (debugging/monitoring)  
  - Na-update gamit ang kasalukuyang discovery (`*/list`), retrieval (`*/get`), at execution (`*/call`) na mga pattern ng pamamaraan  
- **Arkitektura ng Protocol**: Ipinakilala ang dalawang-layer na modelo ng arkitektura  
  - Data Layer: JSON-RPC 2.0 na pundasyon na may lifecycle management at mga primitives  
  - Transport Layer: STDIO (lokal) at Streamable HTTP na may SSE (remote) na mga mekanismo ng transport  
- **Balangkas ng Seguridad**: Komprehensibong mga prinsipyo ng seguridad kabilang ang tahasang pahintulot ng gumagamit, proteksyon ng privacy ng data, kaligtasan ng pagpapatupad ng tool, at seguridad ng transport layer  
- **Mga Pattern ng Komunikasyon**: Na-update ang mga mensahe ng protocol upang ipakita ang mga daloy ng inisyal na pagsisimula, pagtuklas, pagpapatupad, at notipikasyon  
- **Mga Halimbawa ng Code**: Na-refresh na mga halimbawa sa maraming wika (.NET, Java, Python, JavaScript) upang ipakita ang kasalukuyang mga pattern ng MCP SDK  

#### Seguridad (02-Security/) - Komprehensibong Pagbabago ng Seguridad  
- **Pagsunod sa mga Pamantayan**: Buong pagsunod sa mga kinakailangan sa seguridad ng MCP Specification 2025-06-18  
- **Ebolusyon ng Authentication**: Naidokumento ang ebolusyon mula sa pasadyang OAuth servers hanggang sa external identity provider delegation (Microsoft Entra ID)  
- **Pagsusuri ng Banta na Nakatuon sa AI**: Pinalawak na mga talakayan ng modernong mga vector ng pag-atake ng AI  
  - Detalyadong mga senaryo ng prompt injection attack na may mga tunay na halimbawa  
  - Mga mekanismo ng pagkalason sa tool at mga pattern ng "rug pull" na pag-atake  
  - Pagkalason ng context window at mga pag-atake sa kalituhan ng modelo  
- **Mga Solusyon sa Seguridad ng Microsoft AI**: Komprehensibong coverage ng Microsoft security ecosystem  
  - AI Prompt Shields na may advanced detection, spotlighting, at delimiter techniques  
  - Mga pattern ng integrasyon ng Azure Content Safety  
  - GitHub Advanced Security para sa proteksyon ng supply chain  
- **Napahusay na Pag-iwas sa Banta**: Detalyadong mga kontrol sa seguridad para sa  
  - Session hijacking na may mga eksklusibong senaryo ng pag-atake sa MCP at mga kinakailangan sa cryptographic session ID  
  - Mga problema sa confused deputy sa MCP proxy scenarios na may tahasang mga pangangailangan sa pahintulot  
  - Mga kahinaan sa token passthrough na may mga mandatoryong validation control  
- **Seguridad ng Supply Chain**: Pinalawak na saklaw ng AI supply chain kabilang ang mga foundation model, embedding services, context providers, at third-party APIs  
- **Foundation Security**: Pinahusay na integrasyon sa mga enterprise security pattern kabilang ang zero trust architecture at Microsoft security ecosystem  
- **Organisasyon ng Mga Mapagkukunan**: Nakategorya na komprehensibong mga link ng mapagkukunan ayon sa uri (Opisyal na Docs, Pamantayan, Pananaliksik, Microsoft Solutions, Gabay sa Implementasyon)  

### Mga Pagpapabuti sa Kalidad ng Dokumentasyon  
- **Istrakturang Mga Layunin sa Pagkatuto**: Pinahusay ang mga layunin sa pagkatuto na may tiyak at magagamit na mga resulta  
- **Cross-References**: Idinagdag ang mga link sa pagitan ng magkakaugnay na mga paksa sa seguridad at pangunahing konsepto  
- **Kasalukuyang Impormasyon**: Na-update ang lahat ng sanggunian sa petsa at mga link ng espesipikasyon sa kasalukuyang mga pamantayan  
- **Gabay sa Implementasyon**: Idinagdag ang tiyak at magagamit na mga panuntunan sa implementasyon sa buong seksyon  

## Hulyo 16, 2025  

### README at Mga Pagpapabuti sa Navigasyon  
- Lubusang niredisenyo ang curriculum navigation sa README.md  
- Pinalitan ang mga `<details>` tag ng mas accessible na format gamit ang table  
- Nilikha ang mga alternatibong layout na mga opsyon sa bagong folder na "alternative_layouts"  
- Idinagdag ang card-based, tabbed-style, at accordion-style na mga halimbawa ng navigasyon  
- Na-update ang seksyon ng istruktura ng repository upang isama ang lahat ng pinakabagong mga file  
- Pinahusay ang "How to Use This Curriculum" na seksyon na may malinaw na mga rekomendasyon  
- Na-update ang mga link ng MCP specification upang ituro sa tamang mga URL  
- Idinagdag ang seksyon ng Context Engineering (5.14) sa istruktura ng kurikulum  

### Mga Pag-update sa Gabay sa Pag-aaral  
- Lubos na nirebisa ang gabay sa pag-aaral upang maging tugma sa kasalukuyang istruktura ng repository  
- Idinagdag ang mga bagong seksyon para sa MCP Clients at Tools, at Popular na MCP Servers  
- Na-update ang Visual Curriculum Map upang tumpak na ipakita ang lahat ng mga paksa  
- Pinahusay ang mga paglalarawan ng Advanced Topics upang masaklaw lahat ng espesyalisadong mga lugar  
- Inayos ang seksyon ng Case Studies upang ipakita ang mga aktwal na halimbawa  
- Idinagdag ang komprehensibong changelog na ito  

### Mga Ambag ng Komunidad (06-CommunityContributions/)  
- Idinagdag ang detalyadong impormasyon tungkol sa MCP servers para sa image generation  
- Idinagdag ang komprehensibong seksyon sa paggamit ng Claude sa VSCode  
- Idinagdag ang setup at mga tagubilin sa paggamit ng Cline terminal client  
- Na-update ang seksyon ng MCP client upang isama ang lahat ng popular na opsyon ng client  
- Pinahusay ang mga halimbawa ng kontribusyon gamit ang mas tumpak na mga sample ng code  

### Mga Advanced na Paksa (05-AdvancedTopics/)  
- Inayos ang lahat ng mga folder ng espesyalisadong paksa na may pare-parehong pagnenegosyo ng pangalan  
- Idinagdag ang mga materyal at halimbawa sa context engineering  
- Idinagdag ang dokumentasyon ng Foundry agent integration  
- Pinahusay ang dokumentasyon ng integrasyon ng seguridad ng Entra ID  

## Hunyo 11, 2025  

### Paunang Paglikha  
- Inilabas ang unang bersyon ng MCP for Beginners curriculum  
- Nilikha ang batayang istruktura para sa lahat ng 10 pangunahing seksyon  
- Ipinatupad ang Visual Curriculum Map para sa navigasyon  
- Idinagdag ang mga unang sample na proyekto sa maraming programming languages  

### Pagsisimula (03-GettingStarted/)  
- Nilikha ang unang mga halimbawa ng implementasyon ng server  
- Idinagdag ang gabay sa pag-develop ng client  
- Kasama ang mga tagubilin sa integrasyon ng LLM client  
- Idinagdag ang dokumentasyon para sa integrasyon ng VS Code  
- Ipinatupad ang mga halimbawa ng Server-Sent Events (SSE) server  

### Mga Pangunahing Konsepto (01-CoreConcepts/)  
- Idinagdag ang detalyadong paliwanag ng client-server architecture  
- Nilikha ang dokumentasyon tungkol sa mga pangunahing bahagi ng protocol  
- Idinokumento ang mga pattern ng messaging sa MCP  

## Mayo 23, 2025  

### Istruktura ng Repository  
- Inilunsad ang repository na may batayang istruktura ng folder  
- Nilikha ang mga README files para sa bawat pangunahing seksyon  
- Itinatag ang imprastraktura para sa pagsasalin  
- Idinagdag ang mga image assets at diagram  

### Dokumentasyon  
- Nilikha ang paunang README.md na may overview ng kurikulum  
- Idinagdag ang CODE_OF_CONDUCT.md at SECURITY.md  
- Itinatag ang SUPPORT.md na may gabay kung paano humingi ng tulong  
- Nilikha ang paunang istruktura ng gabay sa pag-aaral  

## Abril 15, 2025  

### Pagpaplano at Balangkas  
- Paunang pagpaplano para sa MCP for Beginners curriculum  
- Tinukoy ang mga layunin sa pagkatuto at target na audience  
- Inilathala ang 10-seksyon na istruktura ng kurikulum  
- Bumuo ng konseptwal na balangkas para sa mga halimbawa at case studies  
- Nilikha ang paunang mga prototype na halimbawa para sa mga pangunahing konsepto

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->