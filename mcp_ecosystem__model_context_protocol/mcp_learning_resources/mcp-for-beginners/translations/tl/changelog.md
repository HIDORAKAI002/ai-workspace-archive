# Changelog: MCP para sa mga Baguhan na Kurikulum

Ang dokumentong ito ay nagsisilbing talaan ng lahat ng mahahalagang pagbabago na ginawa sa Model Context Protocol (MCP) para sa mga Baguhan na kurikulum. Ang mga pagbabago ay naitala ayon sa reverse chronological order (pinakabagong pagbabago muna).

## Hunyo 16, 2026

### Pagsasaayos ng MCP Specification at Validasyon ng Halimbawang Code

Sinuri ang kurikulum laban sa kasalukuyang **MCP Specification 2025-11-25** at mga pinakabagong opisyal na SDK, pagkatapos ay inayos ang mga natitirang lumang sanggunian sa specification at kinumpirma na ang mga pangunahing halimbawa ay patuloy na nabubuo at tumatakbo.

#### Pagwawasto ng Bersyon ng Specification (2025-06-18 / 2025-03-26 → 2025-11-25)

In-update ang nilalaman sa English kung saan sinasabing ang mas lumang bersyon ng spec ay ang *kasalukuyan/pinaka-bagong* pamantayan, at ni-repoint ang mga link sa canonical na mga path ng `modelcontextprotocol.io` spec:
- **05-AdvancedTopics/mcp-security/README.md**: In-update ang "Current Standard" banner, pambungad, mga heading tungkol sa core security principles, mandatory requirements heading, seksyong Microsoft Entra ID, References & Resources na mga link, at closing na pabatid sa seguridad (8 na sanggunian) sa 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: In-update ang Additional Resources spec link at ang "Current Standard" banner sa 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pinalitan ang luma `2025-03-26` security-and-trust link ng kasalukuyang 2025-11-25 security best practices page
- **03-GettingStarted/14-sampling/README.md**: In-update ang opisyal na sampling docs link sa 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: In-update ang kasalukuyang ginagamit na "current MCP specification" reference at ang Additional Resources spec link sa 2025-11-25 (pinanatili ang mga historical SSE-deprecation notes para sa katumpakan)

#### Validasyon ng Halimbawang Code Laban sa Kasalukuyang SDKs

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ay nag-resolve ng `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ay pumasa nang walang mga type errors — nananatiling valid ang mga umiiral na API ng `McpServer`/`StdioServerTransport`
- **Python (03-GettingStarted/01-first-server/solution/python)**: Sinuri sa isang isolated na `.venv` gamit ang `mcp[cli]` (1.27.2); pumasa ang `py_compile` at tamang nagbalik ang `FastMCP.list_tools()` ng `add` at `subtract` na mga tool
- Nakumpirma na lahat ng halimbawang `@modelcontextprotocol/sdk` na range (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ay malinis na nag-resolve sa kasalukuyang `1.29.0` nang walang mga breaking na pagbabago sa API

#### Pagsasaayos sa Pagkakatugma ng Dependency Pin (pagsara ng mga version gaps)

In-update ang lumang mga SDK pin upang ang bawat halimbawa ay nakatutok sa kasalukuyang MCP release, na sumusunod sa convention sa buong repo:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: In-update ang `@modelcontextprotocol/sdk` mula `^1.8.0` → `>=1.26.0` at in-update ang lumang package description na `"updated for MCP 2025-06-18"` sa `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** at **lab4/code/github_mcp_server/pyproject.toml**: In-update ang eksaktong pin na `mcp==1.23.0` → `mcp>=1.26.0`; muling ginawa ang parehong `uv.lock` files (`uv lock`) upang malutas ang lockfiles sa kasalukuyang `mcp 1.27.2` at manatiling synced sa mga manifests

#### Pagsusuri ng Curriculum Gap — Saklaw ng Pinakabagong Feature ng Spec

Kinumpirma na ang kurikulum ay sumasakop na sa lahat ng mga primitives na ipinakilala/pinalawak sa MCP 2025-11-25, kaya walang natitirang mga gap sa nilalaman:
- **Sampling**: Lesson 03-GettingStarted/14-sampling pati na rin 05-AdvancedTopics/mcp-sampling
- **Elicitation (kabilang ang URL mode)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Naitala sa 00-Introduction, 01-CoreConcepts, at 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimental, long-running operations)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features

### Pagsasaayos ng Seguridad at Pag-ayos ng Mga Kahinaan sa Dependency

Nagsagawa ng buong security pass sa bawat dependency manifest at source code ng mga halimbawa, pagkatapos ay inayos ang lahat ng naiulat na npm advisories at isang security finding sa code level. Pagkatapos ng remediation, ang `npm audit` ay nag-ulat ng **0 vulnerabilities** sa bawat na-audit na direktoryo.

#### Mga Kahinaan sa npm Dependency (transitive) — Naayos

Siniro ang lahat ng 15 committed na `package-lock.json` files. Ang mga kahinaan ay limitado lang sa mga transitive dependencies na dala ng MCP Inspector dev tool, ang OpenAI client, at ang MCP SDK; lahat ay naayos nang hindi nilalabag ang mga halimbawa:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** at **lab3/code/weather_mcp/inspector**: In-update ang `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), na nagtanggal ng bundled `ajv`, `brace-expansion`, `diff`, `path-to-regexp` at `ws` advisories. Nagdagdag ng npm `overrides` entry na nagpwersa sa patched na `shell-quote@1.8.4` upang alisin ang natitirang critical advisory na dala ng `concurrently`; muling ginawa ang mga lockfiles (ngayon ay 0 na vulnerabilities)
- **03-GettingStarted/samples/typescript**: `npm audit fix` in-update ang transitive `qs` (moderate) sa patched na bersyon
- **03-GettingStarted/samples/javascript**: `npm audit fix` in-update ang transitive `hono` (moderate) sa patched na bersyon
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` in-update ang transitive `form-data` (high) sa patched na bersyon
- **03-GettingStarted/11-simple-auth/solution/typescript**: Nilikha ang nawawalang `package-lock.json` upang gawing reproducible at auditable ang proyekto (0 vulnerabilities)

#### Security Fix sa Code Level (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tinanggal ang `shell=True` mula sa `open_in_vscode` tool. Ang dating `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` ay nagpapahintulot sa shell metacharacters sa folder path na ma-interpret ng `cmd.exe` (command-injection vector). Ngayon ay direktang inilulunsad ang resolved na `Code.exe` gamit ang folder bilang argumento — walang shell — na katumbas ng dati at ligtas

#### Pag-audit ng Python Dependencies

- Sinuri ang bawat Python requirements set gamit ang `pip-audit`. Ang `05-AdvancedTopics` at `03-GettingStarted/samples/python` ay nag-ulat ng **walang kilalang kahinaan** (ang kanilang `mcp` / `httpx` / `pydantic` / `python-dotenv` ranges ay nag-resolve sa kasalukuyang patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: Binanggit ng `pip-audit` ang transitive dependency na **`werkzeug` 3.1.1** na may tatlong `safe_join` Windows device-name DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, at `CVE-2026-27199` (lahat ay naayos sa 3.1.6). Nagdagdag ng explicit security pin `werkzeug>=3.1.6` upang masiguradong ang patched release ang ma-resolve; na-verify na malinis ang pagsunod sa constraint gamit ang `chainlit` / `mcp` / `semantic-kernel` stack

### Pagbabago ng Pangalan ng Produkto

In-update ang lahat ng nilalaman ng kurikulum upang ipakita ang rebranding ng produkto ng Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: In-update ang Discord community link
- **AGENTS.md**: In-update ang Discord server reference
- **README.md**: In-update ang mga teknolohiyang ecosystem na sanggunian
- **study_guide.md**: In-update ang mga case study references
- **05-AdvancedTopics/README.md**: In-update ang pamagat at deskripsyon ng Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: In-update ang seksyon header at deskripsyon
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Buong update ng pamagat at nilalaman ng module
- **05-AdvancedTopics/mcp-security-entra/README.md**: In-update ang cross-reference link
- **07-LessonsfromEarlyAdoption/README.md**: In-update ang mga case study references
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: In-update ang Section 9 header, badges, at mga kakayahan
- **08-BestPractices/README.md**: In-update ang Discord community link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: In-update ang Discord channel reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: In-update ang model deployment reference
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: In-update ang AI Services table
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: In-update ang mga sanggunian ng resources

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para sa VS Code
- **README.md**: In-update ang pangunahing sanggunian ng kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: In-update ang pamagat ng module, pangkalahatang-ideya, at lahat ng mga header ng module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: In-update ang pamagat, mga layuning pang-edukasyon, mga tagubilin sa setup, at mga resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: In-update ang pamagat, mga layuning pang-edukasyon, MCP hosts table, at mga cross-references
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: In-update ang pamagat, badges, mga kinakailangan, at mga resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: In-update ang Agent Builder references at feedback link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: In-update ang mga kinakailangan at mga sanggunian sa extension

---

## Abril 11, 2026

### Bagong Leksyon, Pag-aayos ng Dokumentasyon, at Mga Update sa Dependency

#### Idinagdag na Bagong Nilalaman sa Kurikulum

**Module 05 - Mga Advanced na Paksa**
- **Lesson 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Bagong komprehensibong gabay na sumasaklaw sa adversarial debate pattern para sa multi-agent systems
  - Mermaid architecture diagram: dalawang ahente → shared MCP server → debate transcript → hukom → hatol
  - Shared MCP tool server (`web_search` + `run_python`) na na-implement sa Python at TypeScript
  - Mga nagkalabang system prompts (FOR / AGAINST / Judge) na may explicit na mga kinakailangan sa paggamit ng tool
  - Debate orchestrator sa Python, TypeScript, at C# na nagma-manage ng mga round at nagro-route ng mga argumento
  - MCP `ClientSession` wiring para sa orchestrator patungo sa tunay na tawag ng tool
  - Talaan ng mga gamit (hallucination detection, threat modeling, API design review, factual verification, tech selection)
  - Mga konsiderasyon sa seguridad: sandboxed execution, pagpapatunay ng tawag sa tool, rate limiting, audit logging
  - Strukturadong ehersisyo na may tatlong praktikal na senaryo (code review, desisyon sa arkitektura, moderation ng nilalaman)

#### Mga Pag-aayos sa Dokumentasyon

**Module 03 - Getting Started**
- **05-stdio-server/README.md**: Inayos ang incomplete na halimbawa ng TypeScript stdio server — idinagdag ang nawawalang transport instantiation (`new StdioServerTransport()`) at `server.connect(transport)` na tawag upang tumugma sa Python at .NET na mga halimbawa sa parehong seksyon
- **14-sampling/README.md**: Inayos ang typo — binago ang `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Idinagdag ang entry 5.17 (Adversarial Multi-Agent Reasoning with MCP) sa talaan ng kurikulum na may direktang link sa bagong leksyon

**05-AdvancedTopics/README.md**
- Idinagdag ang Lesson 5.17 na hilera sa talaan ng mga leksyon

**study_guide.md**
- Idinagdag ang Adversarial Multi-Agent Reasoning na paksa sa mind-map at paglalarawan sa prose ng Advanced Topics

#### Mga Pag-aayos sa Code at Seguridad

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Pag-aayos sa Seguridad — command injection**: Pinalitan ang shell interpolation ng `execSync` ng `execFile` + `promisify` sa TypeScript `run_python` tool, na tinanggal ang command injection na surface (ang LLM-controlled code ay ipinapasa na ngayon bilang literal na argv element na walang shell involvement)
- **MCP tool loop wiring**: Na-update ang Python debate orchestrator upang gamitin ang `AsyncAnthropic` client (pinalitan ang blocking sync na `Anthropic`), magpasa ng live na `ClientSession` nang direkta sa bawat turn ng agent, kunin ang mga kahulugan ng tool sa pamamagitan ng `session.list_tools()` sa bawat turn, at magpadala ng mga `tool_use` block gamit ang `session.call_tool()` sa loop hanggang sa maglabas ang modelo ng panghuling tekstong tugon

#### Mga Update sa Dependency

- Inangat ang `hono` sa 4.12.12 sa iba't ibang package (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Inangat ang `@hono/node-server` mula 1.19.11 hanggang 1.19.13 sa mga TypeScript package
- Inangat ang `cryptography` mula 46.0.5 hanggang 46.0.7 sa mga Python package (10-StreamliningAIWorkflows labs 3 at 4)
- Inangat ang `lodash` mula 4.17.23 hanggang 4.18.1 sa 10-StreamliningAIWorkflows inspector

#### Mga Pagsasalin

- Na-synchronize ang mga pagsasalin para sa 48+ na mga wika gamit ang pinakabagong mga pagbabago sa pinagmulan (i18n update)

---

## Pebrero 5, 2026

### Mga Pagpapabuti sa Repository-Wide Validation at Navigation

#### Bagong Nilalaman sa Kurikulum na Idinagdag

**Module 03 - Pagpapasimula**
- **12-mcp-hosts/README.md**: Bagong komprehensibong gabay para sa pagsasaayos ng MCP hosts
  - Mga halimbawa ng configuration para sa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Mga template ng JSON configuration para sa lahat ng pangunahing hosts
  - Talahanayan ng paghahambing ng uri ng transport (stdio, SSE/HTTP, WebSocket)
  - Paglutas ng karaniwang mga isyu sa koneksyon
  - Pinakamagandang kasanayan sa seguridad para sa pag-configure ng host

- **13-mcp-inspector/README.md**: Bagong gabay sa pag-debug para sa MCP Inspector
  - Mga paraan ng pag-install (npx, npm global, mula sa source)
  - Pagkonekta sa mga server gamit ang stdio at HTTP/SSE
  - Mga tool para sa pagsubok, mga mapagkukunan, at mga workflow ng mga prompt
  - Integrasyon ng VS Code sa MCP Inspector
  - Karaniwang mga senaryo ng pag-debug kasama ang mga solusyon

**Module 04 - Praktikal na Pagpapatupad**
- **pagination/README.md**: Bagong gabay sa pagpapatupad ng pagination
  - Mga pattern ng pagination gamit ang cursor sa Python, TypeScript, Java
  - Paghawak ng pagination sa client-side
  - Mga estratehiya sa disenyo ng cursor (opaque vs. structured)
  - Mga rekomendasyon para sa pag-optimize ng performance

**Module 05 - Mga Advanced na Paksa**
- **mcp-protocol-features/README.md**: Malalim na pagtalakay sa mga tampok ng protocol
  - Pagpapatupad ng mga abiso ng progreso
  - Mga pattern ng pagkansela ng kahilingan
  - Mga template ng resources na may mga pattern ng URI
  - Pamamahala ng lifecycle ng server
  - Kontrol sa logging level
  - Mga pattern sa paghawak ng error gamit ang mga JSON-RPC code

#### Mga Pag-ayos sa Navigation (24+ na mga file ang na-update)

**Pangunahing Module READMEs**
 Ngayon ay nag-uugnay sa unang lesson AT susunod na module

**02-Security na mga Sub-file**
- Lahat ng 5 dagdag na dokumento sa seguridad ay may "What's Next" na navigation:

**09-CaseStudy Files**
- Lahat ng case study files ay may sunud-sunod na navigation na:

**10-StreamliningAI Labs**
Nagdagdag ng seksyong What's Next sa overview ng Module 10 at Module 11

#### Mga Pag-ayos sa Code at Nilalaman

**SDK at Mga Update sa Dependency**
Naayos ang walang laman na bersyon ng openai sa `^4.95.0`
Na-update ang SDK mula `^1.8.0` hanggang `>=1.26.0`
Na-update ang mga pin ng mcp version sa `>=1.26.0`

**Mga Pag-ayos sa Code**
Naayos ang invalid model na `gpt-4o-mini` papuntang `gpt-4.1-mini`

**Mga Pag-ayos sa Nilalaman**
Naayos ang sirang link na `READMEmd` → `README.md`, naayos ang header ng kurikulum na `Module 1-3` → `Module 0-3`, naayos ang case-sensitive na path
Tinanggal ang corrupt na doble na Case Study 5 na nilalaman

**Mga Pagpapabuti sa Patnubay para sa mga Baguhan**
Nagdagdag ng tamang pagpapakilala, mga layunin sa pag-aaral, at mga kinakailangan para sa mga baguhan

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Nakadagdag ng mga entry 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) sa talahanayan ng kurikulum

**Module READMEs**
Nagdagdag ng mga aralin 12 at 13 sa listahan ng mga aralin
Nagdagdag ng seksyon ng Mga Praktikal na Gabay kasama ang link sa pagination
Nagdagdag ng mga aralin 5.15 (Custom Transport) at 5.16 (Protocol Features)

**study_guide.md**
- In-update ang mindmap kasama ang lahat ng bagong paksa: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Enero 28, 2026

### Pagsusuri ng Pagsunod sa MCP Specification 2025-11-25

#### Pagpapahusay sa Core Concepts (01-CoreConcepts/)
- **Bagong Primitive ng Kliyente - Roots**: Nagdagdag ng komprehensibong dokumentasyon tungkol sa Roots client primitive, na nagpapahintulot sa mga server na maunawaan ang mga hangganan at permiso sa filesystem
- **Tool Annotations**: Nagdagdag ng dokumentasyon tungkol sa mga annotasyon ng gawi ng tool (`readOnlyHint`, `destructiveHint`) para sa mas maayos na mga desisyon sa pagpapatupad ng tool
- **Tool Calling sa Sampling**: Na-update ang dokumentasyon ng Sampling upang isama ang mga parameter na `tools` at `toolChoice` para sa pag-invoke ng tool na pinapatakbo ng modelo sa panahon ng mga kahilingan sa sampling
- **URL Mode Elicitation**: Nagdagdag ng dokumentasyon tungkol sa URL-based elicitation para sa mga panlabas na web interaction na pinasimulan ng server
- **Tasks (Experimental)**: Nagdagdag ng bagong seksyon na nagdodokumento sa eksperimentong feature na Tasks para sa durable execution wrappers at deferred result retrieval
- **Icons Support**: Nabigyang-diin na ang mga tools, resources, resource templates, at prompts ay maaari nang magsama ng icons bilang dagdag na metadata

#### Mga Update sa Dokumentasyon
- **README.md**: Nagdagdag ng sanggunian sa bersyon ng MCP Specification 2025-11-25 at paliwanag sa bersyon ayon sa petsa
- **study_guide.md**: In-update ang curriculum map upang isama ang Tasks at Tool Annotations sa seksyon ng Core Concepts; in-update ang timestamp ng dokumento

#### Pagpapatunay ng Pagsunod sa Specification
- **Bersyon ng Protocol**: Natiyak na lahat ng dokumentasyon ay tumutukoy sa kasalukuyang MCP Specification 2025-11-25
- **Pagkakatugma sa Arkitektura**: Nakumpirma ang dokumentasyon ng two-layer architecture (Data Layer + Transport Layer)
- **Dokumentasyon ng Primitives**: Na-validate ang mga server primitives (Resources, Prompts, Tools) at client primitives (Sampling, Elicitation, Logging, Roots)
- **Mga Mekanismo sa Transport**: Natiyak ang katumpakan ng dokumentasyon para sa STDIO at Streamable HTTP transport
- **Patnubay sa Seguridad**: Nakumpirma ang pagkakatugma sa kasalukuyang MCP Security Best Practices documentation

#### Pangunahing Tampok ng MCP 2025-11-25 na Naidokumento
- **OpenID Connect Discovery**: Pagtuklas ng auth server gamit ang OIDC
- **OAuth Client ID Metadata Documents**: Inirekomendang mekanismo para sa pagpaparehistro ng kliyente
- **JSON Schema 2020-12**: Default na dialekto para sa MCP schema definitions
- **SDK Tiering System**: Pormal na mga kinakailangan para sa suporta ng mga tampok ng SDK at pagpapanatili
- **Estruktura ng Pamamahala**: Pormal na Working Groups at Interest Groups sa MCP governance

### Malawakang Update sa Dokumentasyon ng Seguridad (02-Security/)

#### Integrasyon ng MCP Security Summit Workshop (Sherpa)
- **Bagong Hands-On Training Resource**: Nagdagdag ng komprehensibong integrasyon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) sa lahat ng dokumentasyon sa seguridad
- **Saklaw ng Ruta ng Expedition**: Na-dokumento ang buong progreso mula Base Camp hanggang Summit
- **Pagkakatugma sa OWASP**: Lahat ng patnubay sa seguridad ay naka-mapa sa mga panganib sa OWASP MCP Azure Security Guide

#### Integrasyon ng OWASP MCP Top 10
- **Bagong Seksyon**: Nagdagdag ng talahanayan ng OWASP MCP Top 10 Security Risks kasama ang mga mitigasyon sa Azure sa pangunahing Security README
- **Dokumentasyon Batay sa Panganib**: In-update ang mcp-security-controls-2025.md gamit ang mga reference sa panganib ng OWASP MCP para sa bawat domain ng seguridad
- **Reference Architecture**: Nilink ang OWASP MCP Azure Security Guide reference architecture at mga pattern ng pagpapatupad

#### Mga Na-update na File sa Seguridad
- **README.md**: Nagdagdag ng overview ng Sherpa Workshop, talahanayan ng ruta ng expedition, buod ng mga panganib ng OWASP MCP Top 10, at seksyon ng hands-on training
- **mcp-security-controls-2025.md**: In-update ang header sa Pebrero 2026, nagdagdag ng mga reference sa panganib ng OWASP (MCP01-MCP08), inayos ang hindi pagkakatugma ng bersyon ng spec
- **mcp-security-best-practices-2025.md**: Nagdagdag ng mga seksyon ng Sherpa at OWASP resources, in-update ang timestamp
- **mcp-best-practices.md**: Nagdagdag ng seksyon ng hands-on training kasama ang Sherpa at OWASP links
- **azure-content-safety-implementation.md**: Nagdagdag ng OWASP MCP06 reference, pagkakatugma sa Sherpa Camp 3, at seksyon ng karagdagang mapagkukunan

#### Bagong Mga Link sa Resources na Idinagdag
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Mga indibidwal na pahina ng panganib ng OWASP MCP (MCP01-MCP10)

### Pagkakatugma ng Kurikulum sa MCP Specification 2025-11-25

#### Module 03 - Pagpapasimula
- **Dokumentasyon ng SDK**: Nagdagdag ng Go SDK sa opisyal na listahan ng SDK; in-update ang lahat ng sanggunian sa SDK para tumugma sa MCP Specification 2025-11-25
- **Paglilinaw ng Transport**: In-update ang mga paglalarawan ng STDIO at HTTP Streaming transport na may tahasang sanggunian sa spec

#### Module 04 - Praktikal na Pagpapatupad
- **Mga Update sa SDK**: Nagdagdag ng Go SDK; in-update ang listahan ng SDK na may sanggunian sa bersyon ng specification
- **Spec ng Authorization**: In-update ang link ng MCP Authorization specification sa kasalukuyang bersyon 2025-11-25

#### Module 05 - Mga Advanced na Paksa
- **Mga Bagong Tampok**: Nagdagdag ng tala tungkol sa mga bagong feature ng MCP Specification 2025-11-25 (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Mga Mapagkukunan sa Seguridad**: Nagdagdag ng mga link ng OWASP MCP Top 10 at Sherpa workshop sa mga karagdagang sanggunian

#### Module 06 - Mga Kontribusyon ng Komunidad
- **Listahan ng SDK**: Nagdagdag ng Swift at Rust SDKs; in-update ang sanggunian ng specification sa 2025-11-25
- **Sanggunian ng Spec**: In-update ang link ng MCP Specification sa direktang URL ng specification

#### Module 07 - Mga Aral mula sa Maagang Paggamit
- **Mga Update sa Resource**: Idinagdag ang MCP Specification 2025-11-25 link at OWASP MCP Top 10 sa mga karagdagang mapagkukunan

#### Module 08 - Pinakamahusay na Mga Kasanayan
- **Bersyon ng Spec**: In-update ang sanggunian ng MCP Specification sa 2025-11-25
- **Mga Mapagkukunan sa Seguridad**: Nagdagdag ng OWASP MCP Top 10 at Sherpa workshop sa mga karagdagang sanggunian

#### Module 10 - Streamlining AI Workflows
- **Update sa Badge**: Pinalitan ang badge ng MCP version mula sa SDK version (1.9.3) papuntang bersyon ng specification (2025-11-25)
- **Mga Link sa Resource**: In-update ang MCP Specification link; nagdagdag ng OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Sanggunian ng Spec**: In-update ang MCP Specification link sa bersyon 2025-11-25
- **Mga Mapagkukunan sa Seguridad**: Nagdagdag ng OWASP MCP Top 10 sa opisyal na mga mapagkukunan

## Disyembre 18, 2025

### Update sa Dokumentasyon ng Seguridad - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Update sa Bersyon ng Specification
- **Update sa Bersyon ng Protocol**: In-update upang tumukoy sa pinakabagong MCP Specification 2025-11-25 (nilabas noong Nobyembre 25, 2025)
  - In-update ang lahat ng sanggunian sa bersyon ng specification mula 2025-06-18 hanggang 2025-11-25
  - In-update ang mga sanggunian sa petsa ng dokumento mula Agosto 18, 2025 hanggang Disyembre 18, 2025
  - Natiyak na lahat ng URL ng specification ay tumutukoy sa kasalukuyang dokumentasyon
- **Pagpapatunay ng Nilalaman**: Komprehensibong pagsusuri ng mga pinakamahusay na kasanayan sa seguridad batay sa pinakabagong pamantayan
  - **Microsoft Security Solutions**: Natiyak ang kasalukuyang terminolohiya at mga link para sa Prompt Shields (dati ay "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, at Azure Key Vault
  - **OAuth 2.1 Security**: Nakumpirma ang pagkakatugma sa pinakabagong mga pinakamahusay na kasanayan sa seguridad ng OAuth
  - **Pamantayan ng OWASP**: Na-validate na nananatiling napapanahon ang mga sanggunian sa OWASP Top 10 para sa LLMs
  - **Mga Serbisyo ng Azure**: Natiyak ang lahat ng mga link sa dokumentasyon ng Microsoft Azure at pinakamahusay na kasanayan
- **Pagkakatugma sa mga Pamantayan**: Lahat ng sanggunian sa mga pamantayan sa seguridad ay napatunayang napapanahon
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Mga balangkas ng seguridad at pagsunod ng Azure
- **Mga Resource sa Pagpapatupad**: Natiyak ang lahat ng mga link sa mga gabay sa pagpapatupad at mga mapagkukunan
  - Azure API Management authentication patterns
  - Mga gabay sa integrasyon ng Microsoft Entra ID
  - Pamamahala ng mga sikreto ng Azure Key Vault
  - Mga pipeline ng DevSecOps at mga solusyon sa monitoring

### Pagsigurado ng Kalidad ng Dokumentasyon
- **Pagsunod sa Specification**: Natiyak ang lahat ng mandatory MCP security requirements (MUST/MUST NOT) ay tumutugma sa pinakabagong specification
- **Kasapatan ng Mga Resource**: Natiyak ang lahat ng panlabas na link sa dokumentasyon ng Microsoft, mga pamantayan sa seguridad, at mga gabay sa pagpapatupad
- **Saklaw ng Pinakamahusay na Kasanayan**: Nakumpirma ang komprehensibong saklaw ng authentication, authorization, mga pagbabanta na tiyak sa AI, seguridad ng supply chain, at mga pantenteng pang-enterprise

## Oktubre 6, 2025

### Pagpapalawak ng Seksyon ng Pagpapasimula – Advanced na Paggamit ng Server at Simpleng Authentication

#### Advanced na Paggamit ng Server (03-GettingStarted/10-advanced)
- **Bagong Kabanata na Idinagdag**: Nagpakilala ng komprehensibong gabay sa advanced na paggamit ng MCP server, na sumasaklaw sa parehong regular at low-level na arkitektura ng server
  - **Regular vs. Low-Level Server**: Detalyadong paghahambing at mga halimbawa ng code sa Python at TypeScript para sa parehong mga paraan
  - **Disenyong Nakabase sa Handler**: Paliwanag sa handler-based na pamamahala ng tool/resource/prompt para sa scalable at flexible na mga implementasyon ng server
  - **Mga Praktikal na Pattern**: Mga totoong senaryo kung saan ang mga pattern ng low-level server ay kapaki-pakinabang para sa mga advanced na tampok at arkitektura
#### Simpleng Pagpapatunay (03-GettingStarted/11-simple-auth)
- **Bagong Kabanatang Idinagdag**: Sunud-sunod na gabay sa pagpapatupad ng simpleng pagpapatunay sa mga MCP server.
  - **Mga Konsepto ng Pagpapatunay**: Malinaw na paliwanag tungkol sa pagpapatunay kumpara sa awtorisasyon, at paghawak ng kredensyal.
  - **Pangunahing Pagpapatupad ng Auth**: Middleware-based na mga pattern ng pagpapatunay sa Python (Starlette) at TypeScript (Express), na may mga sample na code.
  - **Pag-unlad patungo sa Mas Ligtas na Seguridad**: Gabay sa pagsisimula sa simpleng auth at pagsulong sa OAuth 2.1 at RBAC, kasama ang mga sanggunian sa advanced na mga module sa seguridad.

Ang mga idinagdag na ito ay nagbibigay ng praktikal at direktang gabay para sa paggawa ng mas matatag, ligtas, at flexible na mga implementasyon ng MCP server, na nag-uugnay sa mga pundasyong konsepto sa mga advanced na pattern para sa produksyon.

## Setyembre 29, 2025

### MCP Server Database Integration Labs - Komprehensibong Praktikal na Landas ng Pagkatuto

#### 11-MCPServerHandsOnLabs - Bagong Kumpletong Kurikulum sa Database Integration
- **Kumpletong 13-Lab na Landas ng Pagkatuto**: Idinagdag ang komprehensibong praktikal na kurikulum para sa paggawa ng production-ready MCP servers na may PostgreSQL database integration
  - **Pagsasabuhay sa Tunay na Mundo**: Zava Retail analytics na kaso ng paggamit na nagpapakita ng mga enterprise-grade na pattern
  - **Strukturadong Progresyon ng Pagkatuto**:
    - **Labs 00-03: Mga Pundasyon** - Panimula, Core Architecture, Seguridad & Multi-Tenancy, Pag-setup ng Kapaligiran
    - **Labs 04-06: Pagtatayo ng MCP Server** - Disenyo ng Database & Schema, Pagpapatupad ng MCP Server, Pag-develop ng Tool
    - **Labs 07-09: Mga Advanced na Tampok** - Semantic Search Integration, Pagsubok & Pag-debug, Integrasyon sa VS Code
    - **Labs 10-12: Produksyon & Pinakamahusay na Praktis** - Mga Estratehiya sa Deployment, Monitoring & Observability, Pinakamahusay na Praktis & Optimization
  - **Mga Teknolohiyang Enterprise**: FastMCP framework, PostgreSQL na may pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Mga Advanced na Tampok**: Row Level Security (RLS), semantic search, multi-tenant na pag-access sa data, vector embeddings, real-time na monitoring

#### Standardisasyon ng Terminolohiya - Pag-convert mula Module patungong Lab
- **Komprehensibong Update ng Dokumentasyon**: Systematic na inayos ang lahat ng README files sa 11-MCPServerHandsOnLabs upang gamitin ang terminong "Lab" sa halip na "Module"
  - **Mga Header ng Seksyon**: Inayos mula "What This Module Covers" sa "What This Lab Covers" sa lahat ng 13 labs
  - **Paglalarawan ng Nilalaman**: Pinalitan ang "This module provides..." ng "This lab provides..." sa buong dokumentasyon
  - **Mga Layunin sa Pagkatuto**: Inayos mula "By the end of this module..." sa "By the end of this lab..."
  - **Mga Link sa Nabigasyon**: Lahat ng sanggunian mula "Module XX:" pinalitan sa "Lab XX:" sa mga cross-references at nabigasyon
  - **Pagsubaybay sa Pagtatapos**: Inayos mula "After completing this module..." sa "After completing this lab..."
  - **Napanatili ang Mga Teknikal na Sanggunian**: Pinanatili ang mga sanggunian sa Python module sa mga configuration file (hal., `"module": "mcp_server.main"`)

#### Pagpapahusay ng Gabay sa Pag-aaral (study_guide.md)
- **Visual Curriculum Map**: Idinagdag ang bagong seksyong "11. Database Integration Labs" na may kumpletong visualisasyon ng istruktura ng lab
- **Istruktura ng Repositoryo**: Inayos mula sampu hanggang labing-isang pangunahing seksyon na may detalyadong paglalarawan ng 11-MCPServerHandsOnLabs
- **Gabay sa Landas ng Pagkatuto**: Pinalawak na mga tagubilin sa nabigasyon upang saklawin ang mga seksyon 00-11
- **Saklaw ng Teknolohiya**: Idinagdag ang FastMCP, PostgreSQL, detalye ng integrasyon ng Azure services
- **Mga Kinalalabasan sa Pagkatuto**: Pinagtibay ang pag-unlad ng production-ready na server, mga pattern ng database integration, at seguridad ng enterprise

#### Pagpapahusay ng Istruktura ng Pangunahing README
- **Terminolohiyang Batay sa Lab**: Inayos ang pangunahing README.md sa 11-MCPServerHandsOnLabs upang palagian nang gamitin ang "Lab" na istruktura
- **Organisasyon ng Landas ng Pagkatuto**: Malinaw na progresyon mula sa mga pundasyong konsepto hanggang sa advanced na pagpapatupad at deployment sa produksyon
- **Pokus sa Tunay na Mundo**: Binibigyang-diinan ang praktikal, hands-on na pagkatuto gamit ang mga enterprise-grade na pattern at teknolohiya

### Mga Pagpapahusay sa Kalidad at Konsistensi ng Dokumentasyon
- **Pagtutok sa Praktikal na Pagkatuto**: Pinatibay ang lab-based na praktikal na pamamaraan sa buong dokumentasyon
- **Pokus sa Mga Enterprise Pattern**: Binigyang-diin ang production-ready na mga implementasyon at mga konsiderasyon sa seguridad ng enterprise
- **Integrasyon ng Teknolohiya**: Komprehensibong saklaw ng mga modernong serbisyo ng Azure at mga pattern ng AI integration
- **Progresyon ng Pagkatuto**: Malinaw, entabladong landas mula sa mga pangunahing konsepto hanggang sa deployment sa produksyon

## Setyembre 26, 2025

### Pagpapahusay ng Mga Case Study - Integrasyon ng GitHub MCP Registry

#### Case Studies (09-CaseStudy/) - Pokus sa Pagpapaunlad ng Ecosystem
- **README.md**: Malaking pagpapalawak na may komprehensibong case study ng GitHub MCP Registry
  - **GitHub MCP Registry Case Study**: Bagong komprehensibong pag-aaral ng kaso tungkol sa paglulunsad ng GitHub MCP Registry noong Setyembre 2025
    - **Pagsusuri ng Problema**: Detalyadong pagsusuri ng mga hamon sa fragmented MCP server discovery at deployment
    - **Arkitekturang Solusyon**: GitHub na sentralisadong registry approach na may one-click na pag-install sa VS Code
    - **Epekto sa Negosyo**: Nasusukat na pagpapahusay sa onboarding at produktibidad ng developer
    - **Strategic na Halaga**: Pokus sa modular agent deployment at interoperability ng cross-tool
    - **Pagpapaunlad ng Ecosystem**: Posisyon bilang pundasyong platform para sa agentic integration
  - **Pinahusay na Istruktura ng Case Study**: Na-update ang lahat ng pitong case study na may magkakatugmang pormat at komprehensibong mga paglalarawan
    - Azure AI Travel Agents: Pokus sa multi-agent orchestration
    - Integrasyon ng Azure DevOps: Emphasis sa workflow automation
    - Real-Time Documentation Retrieval: Implementasyon ng Python console client
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: Integrasyon ng VS Code at GitHub Copilot
    - Azure API Management: Mga pattern ng enterprise API integration
    - GitHub MCP Registry: Pag-unlad ng ecosystem at platform ng komunidad
  - **Komprehensibong Konklusyon**: Mulîng isinulat na seksyon ng konklusyon na nagha-highlight sa pitong case study na sumasaklaw sa maraming dimensyon ng MCP implementasyon
    - Enterprise Integration, Multi-Agent Orchestration, Produktibidad ng Developer
    - Pagpapaunlad ng Ecosystem, Kategorya ng Educational Applications
    - Pinayamang insight sa mga arkitektural na pattern, stratehiya ng implementasyon, at pinakamahusay na mga praktis
    - Pagtutok sa MCP bilang mature, production-ready protocol

#### Update sa Study Guide (study_guide.md)
- **Visual Curriculum Map**: Inayos ang mindmap upang isama ang GitHub MCP Registry sa seksyon ng Case Studies
- **Paglalarawan ng Case Studies**: Pinalawak mula generic na paglalarawan tungo sa detalyadong paghahati ng pitong komprehensibong case study
- **Istruktura ng Repositoryo**: Inayos ang seksyon 10 upang ipakita ang komprehensibong coverage ng case studies na may partikular na detalye sa implementasyon
- **Integrasyon ng Changelog**: Idinagdag ang entry para sa Setyembre 26, 2025 na nagdodokumento ng pagdagdag ng GitHub MCP Registry at pagpapahusay ng mga case study
- **Pag-update ng Petsa**: Inayos ang footer timestamp upang ipakita ang pinakabagong rebisyon (Setyembre 26, 2025)

### Mga Pagpapahusay sa Kalidad ng Dokumentasyon
- **Pagsasaayos ng Konsistensi**: Standardisadong pormat at istruktura ng case studies sa lahat ng pitong halimbawa
- **Komprehensibong Saklaw**: Ang case studies ay sumasaklaw na ngayon sa enterprise, produktibidad ng developer, at mga scenario ng pagpapaunlad ng ecosystem
- **Strategic na Posisyon**: Pinahusay na pokus sa MCP bilang pundasyong platform para sa deployment ng agentic system
- **Integrasyon ng Mga Mapagkukunan**: Na-update ang mga karagdagang mapagkukunan upang isama ang link sa GitHub MCP Registry

## Setyembre 15, 2025

### Pagpapalawak ng Mga Advanced na Paksa - Custom Transports at Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Bagong Gabay sa Advanced Implementation
- **README.md**: Kumpletong gabay sa pagpapatupad para sa mga custom na MCP transport mechanism
  - **Azure Event Grid Transport**: Komprehensibong serverless na event-driven transport implementation
    - Mga halimbawa sa C#, TypeScript, at Python na may integrasyon ng Azure Functions
    - Mga pattern ng event-driven architecture para sa scalable na MCP solutions
    - Webhook receivers at push-based na paghawak ng mensahe
  - **Azure Event Hubs Transport**: High-throughput na implementasyon ng streaming transport
    - Mga kakayahan sa real-time streaming para sa mga low-latency na sitwasyon
    - Mga estratehiya sa partitioning at checkpoint management
    - Pagsama-sama ng mga mensahe at optimization ng performance
  - **Mga Pattern ng Enterprise Integration**: Mga arkitektural na halimbawa para sa production-ready na implementasyon
    - Distributed MCP processing sa maramihang Azure Functions
    - Hybrid na arkitektura ng transport na pinagsasama ang iba't ibang uri ng transport
    - Durability, reliability, at mga estratehiya sa paghawak ng errors ng mga mensahe
  - **Seguridad at Pagsubaybay**: Azure Key Vault integration at mga pattern sa observability
    - Managed identity authentication at least privilege access
    - Application Insights telemetry at monitoring ng performance
    - Circuit breakers at fault tolerance na mga pattern
  - **Mga Testing Framework**: Komprehensibong mga estratehiya sa pagsubok para sa mga custom transports
    - Unit testing gamit ang test doubles at mocking frameworks
    - Integration testing gamit ang Azure Test Containers
    - Mga konsiderasyon sa performance at load testing

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Umuusbong na Disiplina ng AI
- **README.md**: Komprehensibong pagsisiyasat sa context engineering bilang umuusbong na larangan
  - **Pangunahing Prinsipyo**: Kompletong pagbabahagi ng konteksto, kamalayan sa paggawa ng desisyon sa aksyon, at pamamahala ng context window
  - **Pagkakahanay sa MCP Protocol**: Paano tinutugunan ng disenyo ng MCP ang mga hamon ng context engineering
    - Mga limitasyon ng context window at mga estratehiya sa progresibong paglo-load
    - Pagtukoy ng kahalagahan at dynamic na pagkuha ng konteksto
    - Multi-modal na paghawak ng konteksto at mga konsiderasyon sa seguridad
  - **Mga Paraan ng Pagpapatupad**: Single-threaded kumpara sa multi-agent na arkitektura
    - Teknik sa context chunking at prioritization
    - Progresibong paglo-load at compression ng konteksto
    - Mga layered na pamamaraan ng konteksto at optimization ng retrieval
  - **Framework ng Pagsusukat**: Mga umuusbong na sukatan para sa ebalwasyon ng bisa ng konteksto
    - Kahusayan sa input, performance, kalidad, at mga konsiderasyon sa karanasan ng gumagamit
    - Mga eksperimento sa pag-optimize ng konteksto
    - Pagsusuri ng pagkabigo at mga metodolohiya sa pagpapabuti

#### Update sa Nabigasyon ng Kurikulum (README.md)
- **Pinalawak na Istruktura ng Module**: Inayos ang talahanayan ng kurikulum upang isama ang mga bagong advanced na paksa
  - Idinagdag ang Context Engineering (5.14) at Custom Transport (5.15)
  - Konsistenteng pormat at mga link sa nabigasyon sa lahat ng module
  - Inayos ang mga paglalarawan upang ipakita ang kasalukuyang saklaw ng nilalaman

### Pagpapahusay ng Istruktura ng Direktoryo
- **Standardisasyon ng Pangalan**: Pinalitan ang pangalan ng "mcp transport" sa "mcp-transport" para sa pagkakaugnay sa ibang folder ng advanced na paksa
- **Organisasyon ng Nilalaman**: Lahat ng 05-AdvancedTopics na folder ay sumusunod na sa konsistenteng pattern ng pangalan (mcp-[topic])

### Mga Pagpapahusay sa Kalidad ng Dokumentasyon
- **Pagkakahanay sa MCP Specification**: Lahat ng bagong nilalaman ay tumutukoy sa kasalukuyang MCP Specification 2025-06-18
- **Mga Halimbawa sa Maramihang Wika**: Komprehensibong mga halimbawa sa code sa C#, TypeScript, at Python
- **Pokus sa Enterprise**: Mga production-ready na pattern at integrasyon sa Azure cloud sa buong dokumentasyon
- **Visual na Dokumentasyon**: Mga diagram sa Mermaid para sa arkitektura at visualisasyon ng daloy

## Agosto 18, 2025

### Komprehensibong Update ng Dokumentasyon - MCP 2025-06-18 Standard

#### MCP Security Best Practices (02-Security/) - Kumpletong Modernisasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Ganap na muling pagsulat na nakaayon sa MCP Specification 2025-06-18
  - **Mga Mandatoryong Kailangan**: Idinagdag ang tahasang MUST/MUST NOT na mga pangangailangan mula sa opisyal na spesipikasyon na may malinaw na visual na indikasyon
  - **12 Pangunahing Praktis sa Seguridad**: Inayos mula sa 15-item na listahan tungo sa komprehensibong mga domain ng seguridad
    - Seguridad sa Token at Pagpapatunay gamit ang integrasyon ng external na identity provider
    - Pamamahala ng Session at Seguridad ng Transport gamit ang mga pangangailangan sa kriptograpiya
    - Proteksyon sa AI-Specific na Banta gamit ang Microsoft Prompt Shields integration
    - Kontrol sa Access at Mga Pahintulot na may prinsipyo ng least privilege
    - Kaligtasan ng Nilalaman at Pagsubaybay gamit ang Azure Content Safety integration
    - Seguridad sa Supply Chain gamit ang komprehensibong pag-verify ng mga bahagi
    - Seguridad ng OAuth at Pag-iwas sa Confused Deputy gamit ang implementasyon ng PKCE
    - Pagsagot sa Insidente at Pagbawi gamit ang automated na kakayahan
    - Pagsunod at Pamamahala ayon sa regulasyon
    - Mga Advanced Controls sa Seguridad na may zero trust architecture
    - Integrasyon ng Microsoft Security Ecosystem na may komprehensibong solusyon
    - Patuloy na Ebolusyon ng Seguridad gamit ang adaptive na mga praktik
  - **Mga Solusyon ng Microsoft Security**: Pinahusay na gabay sa integrasyon para sa Prompt Shields, Azure Content Safety, Entra ID, at GitHub Advanced Security
  - **Mga Mapagkukunan sa Pagpapatupad**: Inayos na mga link sa mapagkukunan ayon sa Official MCP Documentation, Microsoft Security Solutions, Mga Pamantayan sa Seguridad, at Mga Gabay sa Implementasyon

#### Mga Advanced Security Controls (02-Security/) - Enterprise Implementation
- **MCP-SECURITY-CONTROLS-2025.md**: Ganap na overhaul na may enterprise-grade na framework sa seguridad
  - **9 Komprehensibong Domain sa Seguridad**: Pinalawak mula sa basic controls tungo sa detalyadong enterprise framework
    - Advanced Authentication at Authorization gamit ang integrasyon ng Microsoft Entra ID
    - Seguridad sa Token at Mga Kontrol sa Anti-Passthrough na may komprehensibong pag-validate
    - Mga Kontrol sa Seguridad ng Session na may pagpigil sa hijacking
    - Seguridad na Espesipiko sa AI na may prevention sa prompt injection at tool poisoning
    - Pag-iwas sa Confused Deputy Attack gamit ang seguridad ng OAuth proxy
    - Seguridad sa Pagpapatupad ng Tool gamit ang sandboxing at isolation
    - Mga Kontrol sa Seguridad ng Supply Chain gamit ang verification ng dependency
    - Mga Kontrol sa Monitoring at Detection gamit ang SIEM integration
    - Pagsagot sa Insidente at Pagbawi gamit ang automated na kakayahan
  - **Mga Halimbawa ng Implementasyon**: Idinagdag ang detalyadong YAML configuration blocks at mga halimbawa ng code
  - **Integrasyon ng Microsoft Solutions**: Komprehensibong saklaw ng mga serbisyo ng Azure security, GitHub Advanced Security, at enterprise identity management

#### Mga Advanced Topics Security (05-AdvancedTopics/mcp-security/) - Production-Ready Implementation
- **README.md**: Ganap na muling pagsulat para sa enterprise security implementation
  - **Pagkakahanay sa Kasalukuyang Spesipikasyon**: Inayos ayon sa MCP Specification 2025-06-18 na may mga mandatoryong security requirements
  - **Pinahusay na Authentication**: Microsoft Entra ID integrasyon gamit ang komprehensibong .NET at Java Spring Security na mga halimbawa
  - **Integrasyon ng AI Security**: Microsoft Prompt Shields at Azure Content Safety implementation gamit ang detalyadong mga halimbawa sa Python
  - **Advanced na Pagsugpo ng Banta**: Komprehensibong mga halimbawa ng implementasyon para sa
    - Pag-iwas sa Confused Deputy Attack gamit ang PKCE at user consent validation
    - Pag-iwas sa Token Passthrough gamit ang audience validation at secure token management
    - Pag-iwas sa Session Hijacking gamit ang cryptographic binding at behavioral analysis
  - **Integrasyon ng Enterprise Security**: Azure Application Insights monitoring, mga pipeline sa pagtuklas ng banta, at seguridad sa supply chain
  - **Checklist sa Implementasyon**: Maliwanag na mandatory vs. recommended na kontrol sa seguridad na may mga benepisyo mula sa Microsoft security ecosystem

### Kalidad ng Dokumentasyon at Pagkakahanay sa Pamantayan
- **Mga Sanggunian sa Espesipikasyon**: Na-update ang lahat ng sanggunian sa kasalukuyang MCP Specification 2025-06-18  
- **Ecosystem ng Seguridad ng Microsoft**: Pinahusay na patnubay sa integrasyon sa lahat ng dokumentasyong pangseguridad  
- **Praktikal na Implementasyon**: Nagdagdag ng detalyadong mga halimbawa ng code sa .NET, Java, at Python na may mga pattern ng enterprise  
- **Organisasyon ng Mga Sanggunian**: Komprehensibong kategorisasyon ng opisyal na dokumentasyon, mga pamantayan sa seguridad, at mga gabay sa implementasyon  
- **Mga Visual na Palatandaan**: Malinaw na pagmamarka ng mga kinakailangang obligasyon laban sa inirerekomendang mga gawain  

#### Mga Pangunahing Konsepto (01-CoreConcepts/) - Kumpletong Modernisasyon  
- **Pag-update ng Bersyon ng Protokol**: Na-update upang tukuyin ang kasalukuyang MCP Specification 2025-06-18 gamit ang bersyon na nakabase sa petsa (format na YYYY-MM-DD)  
- **Pagpapahusay ng Arkitektura**: Pinahusay na mga paglalarawan ng Mga Host, Kliyente, at Server upang ipakita ang kasalukuyang mga pattern ng arkitektura ng MCP  
  - Ang mga Host ay malinaw nang tinukoy bilang mga AI application na nagtutulungan sa maraming pagkakakonekta ng MCP client  
  - Ang Mga Kliyente ay inilalarawan bilang mga konektor ng protokol na nagpapanatili ng one-to-one na relasyon sa server  
  - Ang Mga Server ay pinahusay na may mga lokal at remote na mga senaryo ng deployment  
- **Bagong Estruktura ng Mga Primitive**: Kumpletong pagbabago ng mga server at client primitives  
  - Mga Server Primitives: mga Resources (pinagmumulan ng data), Prompts (mga template), Tools (mga function na maaaring patakbuhin) na may detalyadong paliwanag at mga halimbawa  
  - Mga Client Primitives: Sampling (LLM completions), Elicitation (input ng gumagamit), Logging (debugging/pagsubaybay)  
  - Na-update na gamit ang kasalukuyang mga pattern ng pamamaraan ng discovery (`*/list`), retrieval (`*/get`), at execution (`*/call`)  
- **Arkitektura ng Protokol**: Ipinakilala ang dalawang-layer na modelo ng arkitektura  
  - Data Layer: pundasyon ng JSON-RPC 2.0 na may lifecycle management at mga primitives  
  - Transport Layer: STDIO (lokal) at Streamable HTTP na may SSE (remote) na mga mekanismo ng transport  
- **Balangkas ng Seguridad**: Komprehensibong mga prinsipyo ng seguridad kabilang ang tahasang pahintulot ng gumagamit, proteksyon sa privacy ng data, kaligtasan sa pagtakbo ng mga tool, at seguridad ng transport layer  
- **Mga Pattern ng Komunikasyon**: Na-update na mga mensahe ng protocol upang ipakita ang initialization, discovery, execution, at notification na mga daloy  
- **Mga Halimbawa ng Code**: Na-refresh na mga multi-language na halimbawa (.NET, Java, Python, JavaScript) upang ipakita ang kasalukuyang mga pattern ng MCP SDK  

#### Seguridad (02-Security/) - Komprehensibong Pagbabago ng Seguridad  
- **Pag-ayon sa Pamantayan**: Ganap na pag-ayon sa mga kinakailangan ng seguridad ng MCP Specification 2025-06-18  
- **Ebolusyon ng Pagpapatunay**: Dokumentadong ebolusyon mula sa custom OAuth servers patungo sa external identity provider delegation (Microsoft Entra ID)  
- **AI-Specific na Pagsusuri ng Banta**: Pinahusay na saklaw ng mga modernong AI attack vector  
  - Detalyadong mga senaryo ng prompt injection attack na may mga totoong halimbawa  
  - Mga mekanismo ng tool poisoning at mga pattern ng "rug pull" attack  
  - Context window poisoning at mga atake sa kalituhan ng modelo  
- **Mga Solusyon sa Seguridad ng Microsoft AI**: Komprehensibong saklaw ng ecosystem ng seguridad ng Microsoft  
  - AI Prompt Shields na may advanced na pagkilala, spotlighting, at mga diskarte sa delimiter  
  - Mga pattern ng integrasyon ng Azure Content Safety  
  - GitHub Advanced Security para sa proteksyon ng supply chain  
- **Advanced na Paghahadlang sa Banta**: Detalyadong mga kontrol sa seguridad para sa  
  - Session hijacking na may mga senaryo ng atake na partikular sa MCP at mga kinakailangan sa cryptographic session ID  
  - Mga problema sa confused deputy sa mga MCP proxy scenario na may tahasang mga pangangailangan sa pahintulot  
  - Mga kahinaan sa token passthrough na may mga obligadong kontrol sa pag-validate  
- **Seguridad ng Supply Chain**: Pinalawak na saklaw ng AI supply chain kabilang ang foundation models, embedding services, context providers, at third-party API  
- **Security Foundation**: Pinahusay na integrasyon sa mga pattern ng seguridad ng enterprise kabilang ang zero trust architecture at ecosystem ng seguridad ng Microsoft  
- **Organisasyon ng Mga Sanggunian**: Kategorisadong komprehensibong mga link ng mga sanggunian ayon sa uri (Opisyal na Docs, Mga Pamantayan, Pananaliksik, Mga Solusyon ng Microsoft, Mga Gabay sa Implementasyon)  

### Mga Pagpapabuti sa Kalidad ng Dokumentasyon  
- **Estrukturadong Mga Layunin sa Pagkatuto**: Pinahusay na mga layunin sa pagkatuto na may mga tiyak at maaaring gawin na resulta  
- **Cross-References**: Nagdagdag ng mga link sa pagitan ng mga kaugnay na paksang seguridad at pangunahing konsepto  
- **Kasalukuyang Impormasyon**: Na-update ang lahat ng mga sanggunian sa petsa at mga link ng espesipikasyon sa kasalukuyang mga pamantayan  
- **Patnubay sa Implementasyon**: Nagdagdag ng tiyak at maaaring gawin na mga gabay sa implementasyon sa buong mga seksyon  

## Hulyo 16, 2025  

### README at Mga Pagpapahusay sa Navigasyon  
- Lubusang niredisenyo ang curriculum navigation sa README.md  
- Pinalitan ang mga `<details>` na tag ng mas madaling ma-access na table-based na format  
- Nilikha ang alternatibong mga layout na opsyon sa bagong folder na "alternative_layouts"  
- Nagdagdag ng mga halimbawa ng card-based, tabbed-style, at accordion-style na navigasyon  
- Na-update ang seksyon ng istraktura ng repositoryo upang isama ang lahat ng pinakabagong mga file  
- Pinahusay ang seksyon na "Paano Gamitin ang Curriculum na Ito" na may malinaw na mga rekomendasyon  
- Na-update ang mga link ng MCP specification upang ituro sa tamang mga URL  
- Nagdagdag ng seksyon para sa Context Engineering (5.14) sa istraktura ng curriculum  

### Mga Update sa Gabay sa Pag-aaral  
- Lubusang nirebisa ang gabay sa pag-aaral upang umayon sa kasalukuyang istraktura ng repositoryo  
- Nagdagdag ng mga bagong seksyon para sa MCP Clients at Tools, at Mga Popular na MCP Servers  
- Na-update ang Visual Curriculum Map upang tumpak na ipakita ang lahat ng mga paksa  
- Pinahusay ang mga paglalarawan ng Advanced Topics upang saklawin ang lahat ng espesyalisadong lugar  
- Na-update ang seksyon ng Case Studies upang ipakita ang mga aktwal na halimbawa  
- Nagdagdag ng komprehensibong changelog na ito  

### Mga Kontribusyon mula sa Komunidad (06-CommunityContributions/)  
- Nagdagdag ng detalyadong impormasyon tungkol sa mga MCP server para sa pagbuo ng imahe  
- Nagdagdag ng komprehensibong seksyon sa paggamit ng Claude sa VSCode  
- Nagdagdag ng mga tagubilin sa pag-setup at paggamit ng Cline terminal client  
- Na-update ang seksyon ng MCP client upang isama ang lahat ng mga popular na opsyon ng client  
- Pinahusay ang mga halimbawa ng kontribusyon gamit ang mas tumpak na mga sample ng code  

### Mga Advanced na Paksa (05-AdvancedTopics/)  
- Inayos lahat ng mga folder ng espesyalisadong paksa na may magkakatugmang pangalan  
- Nagdagdag ng mga materyal at halimbawa sa context engineering  
- Nagdagdag ng dokumentasyon ng integrasyon ng Foundry agent  
- Pinahusay ang dokumentasyon ng integrasyon ng seguridad ng Entra ID  

## Hunyo 11, 2025  

### Inisyal na Paglikha  
- Inilabas ang unang bersyon ng MCP for Beginners curriculum  
- Nilikha ang batayang estruktura para sa lahat ng 10 pangunahing seksyon  
- Ipinasok ang Visual Curriculum Map para sa navigasyon  
- Nagdagdag ng unang mga sample na proyekto sa maraming programming language  

### Pagsisimula (03-GettingStarted/)  
- Nilikha ang unang mga halimbawa ng implementasyon ng server  
- Nagdagdag ng gabay sa pag-unlad ng client  
- Isinama ang mga tagubilin sa integrasyon ng LLM client  
- Nagdagdag ng dokumentasyon ng integrasyon sa VS Code  
- Ipinasok ang mga halimbawa ng Server-Sent Events (SSE) server  

### Mga Pangunahing Konsepto (01-CoreConcepts/)  
- Nagdagdag ng detalyadong paliwanag ng client-server architecture  
- Nilikha ang dokumentasyon tungkol sa mga pangunahing bahagi ng protokol  
- Dinokumento ang mga pattern sa pagmemensahe sa MCP  

## Mayo 23, 2025  

### Istraktura ng Repositoryo  
- Inumpisahan ang repositoryo gamit ang batayang istraktura ng folder  
- Nilikha ang mga README file para sa bawat pangunahing seksyon  
- Inayos ang imprastraktura para sa pagsasalin  
- Nagdagdag ng mga asset ng imahe at mga diagram  

### Dokumentasyon  
- Nilikha ang panimulang README.md na may overview ng curriculum  
- Nagdagdag ng CODE_OF_CONDUCT.md at SECURITY.md  
- Inayos ang SUPPORT.md na may gabay para sa pagkuha ng tulong  
- Nilikha ang paunang istraktura ng gabay sa pag-aaral  

## Abril 15, 2025  

### Pagpaplano at Balangkas  
- Inisyal na pagpaplano para sa MCP for Beginners curriculum  
- Tinukoy ang mga layunin sa pagkatuto at target na audience  
- Inilatag ang 10-seksyon na istraktura ng curriculum  
- Dinvelop ang konseptwal na balangkas para sa mga halimbawa at case study  
- Nilikha ang unang prototype na mga halimbawa para sa mga pangunahing konsepto

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->