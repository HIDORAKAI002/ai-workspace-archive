# Tala ng mga Pagbabago: Kurikulum ng MCP para sa mga Baguhan

Ang dokumentong ito ay nagsisilbing talaan ng lahat ng mahahalagang pagbabago na ginawa sa kurikulum ng Model Context Protocol (MCP) para sa mga Baguhan. Ang mga pagbabago ay naitala sa reverse chronological order (pinakabago muna).

## Hulyo 2, 2026

### Bagong Aralin: The 2026-07-28 MCP Specification Release Candidate

Idinagdag ang saklaw para sa nalalapit na `2026-07-28` MCP specification release candidate (inaanunsyo noong Mayo 21, 2026; nakatakdang opisyal na ilabas sa Hulyo 28, 2026), na binuod mula sa [opisyal na anunsyo ng blog post](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Mananatiling **MCP Specification 2025-11-25** ang baseline ng kurikulum hanggang sa mailabas ang bagong bersyon, kaya ito ay ipinapakita bilang patnubay para sa hinaharap at hindi bilang muling pagsulat ng mga umiiral na aralin.

- **Bago**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — isang buong aralin na sumasaklaw sa stateless protocol core (alisin ang `initialize` handshake at `Mcp-Session-Id`), ang bagong `Mcp-Method`/`Mcp-Name` routing headers, `ttlMs`/`cacheScope` caching metadata, W3C Trace Context sa `_meta`, ang pormal na Extensions framework (MCP Apps at ang bagong Tasks extension), anim na authorization-hardening SEPs, ang pag-deprecate ng Roots/Sampling/Logging, at ang paglipat sa full JSON Schema 2020-12 para sa mga tool schemas.
- **Na-update** na may mga patnubay na tumutukoy sa bagong aralin:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): tala ng bersyon ng protocol, mga seksyon ng Sampling/Roots/Logging/Tasks, at "Ano ang susunod"
  - [02-Security/README.md](./02-Security/README.md): tawag para sa authorization hardening
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): tawag sa stateless transport
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): tawag sa pag-deprecate ng Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): tawag sa pag-deprecate ng Logging at Tasks extension
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): tawag sa stateless/session-routing
  - [README.md](./README.md): tala ng "Pagtanaw sa hinaharap" sa seksyon ng specification at bagong `1.1` entry sa talahanayan ng module ng kurikulum
  - [study_guide.md](./study_guide.md): bullet para sa hinaharap sa pangkalahatang-ideya ng Core Concepts at isang may petsang addendum na tala
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): tawag sa `mcp-session-id` transport map bago ang stateless request model
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): tawag sa pangkalahatang-ideya ng module tungkol sa pag-deprecate ng Root Contexts/Sampling at ang Tasks extension
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): tawag para sa authorization hardening

## Hunyo 24, 2026

### Bagong Aralin: Paggamit ng MCP sa Copilot app

- [Seksyon ng Tooling](./12-tooling/README.md) Idinagdag ang seksyon ng tooling.
- [MCP sa Copilot app](./12-tooling/01-copilot-app/README.md)

## Hunyo 16, 2026

### Pag-align ng MCP Specification at Pag-validate ng Sample

Pinatotohanan ang kurikulum laban sa kasalukuyang **MCP Specification 2025-11-25** at sa pinakabagong opisyal na SDK, pagkatapos ay inayos ang natitirang lumang sanggunian sa specification at kinumpirma na ang mga pangunahing sample ay patuloy na nagbuo at tumatakbo.

#### Pagwawasto ng Bersyon ng Specification (2025-06-18 / 2025-03-26 → 2025-11-25)

In-update ang nilalamang Ingles kung saan ito ay nagsasabing ang mas lumang bersyon na bersyon ng spec ay ang *kasalukuyan/pinakabago* na standard, at muling tinuro ang mga link sa canonical na `modelcontextprotocol.io` spec paths:
- **05-AdvancedTopics/mcp-security/README.md**: In-update ang banner ng "Current Standard", panimula, heading ng core security principles, heading ng mandatory requirements, seksyon ng Microsoft Entra ID, mga link ng References & Resources, at panapos na paalala sa seguridad (8 sanggunian) sa 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: In-update ang Additional Resources spec link at ang banner ng "Current Standard" sa 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Pinalitan ang lipas na `2025-03-26` security-and-trust link ng kasalukuyang pahina ng pinakamahusay na gawi sa seguridad ng 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: In-update ang opisyal na sampling docs link sa 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: In-update ang kasalukuyang paggamit ng "current MCP specification" at ang Additional Resources spec link sa 2025-11-25 (pinanatili ang makasaysayang tala ng SSE-deprecation para sa katumpakan)

#### Pag-validate ng Sample Laban sa Kasalukuyang SDK

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` ay gumamit ng `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` ay pumasa nang walang mga type errors — ang umiiral na `McpServer`/`StdioServerTransport` APIs ay nananatiling balido
- **Python (03-GettingStarted/01-first-server/solution/python)**: Na-validate sa isang isolated na `.venv` gamit ang `mcp[cli]` (1.27.2); `py_compile` ay pumasa at `FastMCP.list_tools()` ay tama ang naibalik na `add` at `subtract` tools
- Kinumpirma ang lahat ng saklaw ng bersyon ng sample na `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) ay malinaw na nagreresolba sa kasalukuyang `1.29.0` nang walang mga breaking API changes

#### Pag-align ng Dependency Pin (pagsara ng mga version gap)

In-update ang mga lumang SDK pins upang ang bawat sample ay sumunod sa kasalukuyang MCP release, alinsunod sa pamantayan ng buong repositoryo:

- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: In-update ang `@modelcontextprotocol/sdk` mula `^1.8.0` → `>=1.26.0` at in-update ang lumang paglalarawan ng package na `"updated for MCP 2025-06-18"` sa `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** at **lab4/code/github_mcp_server/pyproject.toml**: In-update ang eksaktong pin `mcp==1.23.0` → `mcp>=1.26.0`; na-regenerate ang parehong `uv.lock` files (`uv lock`) upang matiyak na ang mga lockfiles ay naga-resolve sa kasalukuyang `mcp 1.27.2` at nananatiling naka-sync sa mga manifests

#### Pagsusuri ng Curriculum Gap — Pinakabagong Saklaw ng Tampok sa Spec

Kinikilala na ang curriculum ay sumasakop na sa lahat ng mga bagong paunang kaalaman/primitibo na ipinakilala/pinalawak sa MCP 2025-11-25, kaya walang naiiwang mga kakulangan sa nilalaman:
- **Sampling**: Leksyon 03-GettingStarted/14-sampling pati na rin 05-AdvancedTopics/mcp-sampling
- **Elicitation (kasama ang URL mode)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Naitala sa 00-Introduction, 01-CoreConcepts, at 05-AdvancedTopics/mcp-root-contexts
- **Mga Gawain (eksperimental, pang-matagalang operasyon)**: Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features
- **Mga Anotasyon ng Tool** (`readOnlyHint` / `destructiveHint`): Naitala sa 01-CoreConcepts at 05-AdvancedTopics/mcp-protocol-features

### Pagtitibay ng Seguridad at Pag-ayos ng mga Kahinaan sa Dependency

Nagsagawa ng buong pagsuri sa seguridad sa bawat dependency manifest at halimbawa ng source code, pagkatapos ay inayos ang lahat ng iniulat na npm advisories at isang isyu sa antas ng code. Pagkatapos ay nag-ulat ang `npm audit` ng **0 vulnerabilities** sa bawat sinuring direktoryo.

#### Mga Kahinaan sa npm Dependency (transitive) — Naayos

Sinuri ang lahat ng 15 na committed na `package-lock.json` files. Ang mga kahinaan ay limitado sa mga transitive dependencies na ginagamit ng MCP Inspector dev tool, OpenAI client, at MCP SDK; lahat ay naayos na nang hindi nasisira ang mga halimbawa:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** at **lab3/code/weather_mcp/inspector**: In-update ang `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), na nagtanggal sa mga bundled na `ajv`, `brace-expansion`, `diff`, `path-to-regexp` at `ws` advisories. Nagdagdag ng npm `overrides` entry para pilitin ang patched na `shell-quote@1.8.4` upang alisin ang natitirang critical advisory na dala ng `concurrently`; na-regenerate ang parehong lockfiles (ngayon 0 vulnerabilities)
- **03-GettingStarted/samples/typescript**: In-update ng `npm audit fix` ang transitive na `qs` (moderate) sa isang patched release
- **03-GettingStarted/samples/javascript**: In-update ng `npm audit fix` ang transitive na `hono` (moderate) sa isang patched release
- **03-GettingStarted/03-llm-client/solution/typescript**: In-update ng `npm audit fix` ang transitive na `form-data` (high) sa isang patched release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Nalikha ang nawawalang `package-lock.json` upang ang proyekto ay reproducible at masusuri (0 vulnerabilities)

#### Pag-ayos ng Seguridad sa Antas ng Code (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tinanggal ang `shell=True` mula sa `open_in_vscode` na tool. Ang nakaraang `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` ay nagpapahintulot sa shell metacharacters sa path ng folder na ma-interpret ng `cmd.exe` (vector para sa command-injection). Ngayon, direkta nitong inilulunsad ang na-resolve na `Code.exe` gamit ang folder bilang argumento — walang shell — na pantay ang functionality at ligtas

#### Pagsusuri ng Python Dependency

- Sinuri ang bawat set ng Python requirements gamit ang `pip-audit`. "05-AdvancedTopics" at "03-GettingStarted/samples/python" ang nag-ulat ng **walang kilalang kahinaan** (ang kanilang `mcp` / `httpx` / `pydantic` / `python-dotenv` na mga range ay naga-resolve sa kasalukuyang mga patched release)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: Nag-ulat ang `pip-audit` ng transitive dependency na **`werkzeug` 3.1.1** na may tatlong `safe_join` Windows device-name DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, at `CVE-2026-27199` (lahat ay naayos sa 3.1.6). Nagdagdag ng tahasang security pin na `werkzeug>=3.1.6` para ang patched release ay ma-resolve; kinumpirma ang malinaw na pag-resolve ng constraint sa `chainlit` / `mcp` / `semantic-kernel` stack

### Pag-rebrand ng Pangalan ng Produkto

In-update ang lahat ng nilalaman ng kurikulum upang ipakita ang pag-rebrand ng produkto ng Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: In-update ang link ng Discord community
- **AGENTS.md**: In-update ang reference sa Discord server
- **README.md**: In-update ang mga reference ng technology ecosystem
- **study_guide.md**: In-update ang mga reference ng case study
- **05-AdvancedTopics/README.md**: In-update ang pamagat at paglalarawan ng Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: In-update ang header ng seksyon at paglalarawan
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Buong pag-update ng pamagat ng module at nilalaman
- **05-AdvancedTopics/mcp-security-entra/README.md**: In-update ang cross-reference link
- **07-LessonsfromEarlyAdoption/README.md**: In-update ang mga reference ng case study
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: In-update ang header ng Seksyon 9, badges, at mga kakayahan
- **08-BestPractices/README.md**: In-update ang Discord community link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: In-update ang reference sa Discord channel
- **09-CaseStudy/docs-mcp/solution/python/README.md**: In-update ang reference sa pag-deploy ng modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: In-update ang table ng AI Services

- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Na-update na mga reperensya ng resources

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para sa VS Code

- **README.md**: In-update ang mga pangunahing sanggunian ng kurikulum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Na-update ang pamagat ng module, overview, at lahat ng mga header ng module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Na-update ang pamagat, mga layunin sa pagkatuto, mga tagubilin sa pagsasaayos, at mga resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Na-update ang pamagat, mga layunin sa pagkatuto, talahanayan ng mga MCP hosts, at mga cross-references
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Na-update ang pamagat, badges, prerequisites, at mga resources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Na-update ang mga sanggunian ng Agent Builder at link ng feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Na-update ang mga prerequisites at mga sanggunian sa extension

---

## Abril 11, 2026

### Bagong Aralin, Mga Pag-aayos sa Dokumentasyon, at Mga Update sa Dependency

#### Idinagdag na Bagong Nilalaman ng Kurikulum

**Module 05 - Advanced Topics**
- **Lesson 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Bagong masusing gabay na sumasaklaw sa adversarial debate pattern para sa multi-agent systems
  - Diagram ng arkitektura gamit ang Mermaid: dalawang ahente → shared MCP server → debate transcript → hukom → hatol
  - Shared MCP tool server (`web_search` + `run_python`) na ipinatupad sa Python at TypeScript
  - Mga naglalabang sistema ng prompt (FOR / AGAINST / Judge) na may malinaw na mga kinakailangan sa paggamit ng tool
  - Debate orchestrator sa Python, TypeScript, at C# na nagmamaniobra ng mga round at nagruruta ng mga argumento
  - MCP `ClientSession` wiring para sa orchestrator papunta sa mga tunay na tawag ng tool
  - Talahanayan ng mga kaso ng paggamit (hallucination detection, threat modeling, API design review, factual verification, pagpili ng teknolohiya)
  - Mga konsiderasyon sa seguridad: sandboxed execution, pag-validate ng pagtawag sa tool, rate limiting, audit logging
  - Estrukturadong ehersisyo na may tatlong praktikal na scenario (code review, architecture decision, content moderation)

#### Mga Pag-aayos sa Dokumentasyon

**Module 03 - Pagsisimula**
- **05-stdio-server/README.md**: Naayos ang di-kompletong halimbawang TypeScript stdio server — idinagdag ang nawawalang paglikha ng transport (`new StdioServerTransport()`) at tawag na `server.connect(transport)` upang tumugma sa mga halimbawa sa Python at .NET sa parehong seksyon
- **14-sampling/README.md**: Naayos ang typo — naitama ang `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Idinagdag ang entry 5.17 (Adversarial Multi-Agent Reasoning with MCP) sa talahanayan ng kurikulum na may direktang link sa bagong aralin

**05-AdvancedTopics/README.md**
- Idinagdag ang row ng Lesson 5.17 sa talahanayan ng mga aralin

**study_guide.md**
- Idinagdag ang paksa ng Adversarial Multi-Agent Reasoning sa mind-map at paglalarawan sa panitikan ng Advanced Topics

#### Mga Ayos sa Code at Seguridad

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Pag-ayos sa seguridad — command injection**: Pinalitan ang `execSync` shell interpolation ng `execFile` + `promisify` sa TypeScript `run_python` tool, na tinanggal ang command injection surface (ang code na kinokontrol ng LLM ay ipinapasa na ngayon bilang literal na bahagi ng argv na walang kinalaman ang shell)
- **MCP tool loop wiring**: In-update ang Python debate orchestrator para gamitin ang `AsyncAnthropic` client (pinalitan ang blocking sync `Anthropic`), ipasa ang live na `ClientSession` direkta sa bawat turn ng agent, kunin ang mga depinisyon ng tool gamit ang `session.list_tools()` bawat turn, at i-dispatch ang mga `tool_use` block gamit ang `session.call_tool()` sa isang loop hanggang maglabas ang modelo ng panghuling sagot na teksto

#### Mga Update sa Dependency

- Tumaas ang bersyon ng `hono` sa 4.12.12 sa maraming mga package (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Tumaas ang bersyon ng `@hono/node-server` mula 1.19.11 sa 1.19.13 sa mga TypeScript package
- Tumaas ang bersyon ng `cryptography` mula 46.0.5 sa 46.0.7 sa mga Python package (10-StreamliningAIWorkflows labs 3 at 4)
- Tumaas ang bersyon ng `lodash` mula 4.17.23 sa 4.18.1 sa 10-StreamliningAIWorkflows inspector

#### Mga Pagsasalin

- Na-synchronize ang mga pagsasalin para sa 48+ na mga wika kasama ang pinakabagong mga pagbabago sa source (i18n update)

---

## Pebrero 5, 2026

### Panghimpilanang Pagsubok at Mga Pagbuti sa Navigasyon ng Repository

#### Idinagdag na Bagong Nilalaman ng Kurikulum

**Module 03 - Pagsisimula**
- **12-mcp-hosts/README.md**: Bagong masusing gabay para sa pagsasaayos ng MCP hosts
  - Mga halimbawa ng pagsasaayos para sa Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON configuration templates para sa lahat ng pangunahing hosts
  - Talahanayan ng paghahambing ng mga uri ng transport (stdio, SSE/HTTP, WebSocket)
  - Pagsusuri ng mga karaniwang isyu sa koneksyon
  - Pinakamahusay na kasanayan sa seguridad para sa pagsasaayos ng host

- **13-mcp-inspector/README.md**: Bagong gabay sa pag-debug para sa MCP Inspector
  - Mga paraan ng pag-install (npx, npm global, mula sa source)
  - Pagkonekta sa mga server gamit ang stdio at HTTP/SSE
  - Mga tool sa pagsubok, resources, at mga workflow ng prompt
  - Integrasyon sa VS Code gamit ang MCP Inspector
  - Mga karaniwang senaryo sa pag-debug na may mga solusyon

**Module 04 - Praktikal na Implementasyon**
- **pagination/README.md**: Bagong gabay sa implementasyon ng pagination
  - Mga pattern ng cursor-based pagination sa Python, TypeScript, Java
  - Pagpapangasiwa ng client-side pagination
  - Mga estratehiya sa disenyo ng cursor (opaque vs. structured)
  - Mga rekomendasyon sa pag-optimize ng performance

**Module 05 - Advanced Topics**
- **mcp-protocol-features/README.md**: Bagong malalim na pagtalakay sa mga tampok ng protocol
  - Implementasyon ng mga notification ng progreso
  - Mga pattern ng pagkansela ng kahilingan
  - Mga resource template na may mga pattern ng URI
  - Pamamahala ng lifecycle ng server
  - Kontrol ng antas ng pag-log
  - Mga pattern sa paghawak ng error gamit ang JSON-RPC codes

#### Mga Pag-aayos sa Navigasyon (24+ na mga file na na-update)

**Pangunahing Mga README ng Module**
 Ngayon ay naglalaman ng mga link sa unang aralin AT sa susunod na module

**02-Security Sub-files**
- Lahat ng 5 karagdagang dokumento sa seguridad ngayon ay may "What's Next" na navigasyon:

**09-CaseStudy Files**
- Lahat ng mga file ng case study ay mayroon nang sunud-sunod na navigasyon:

**10-StreamliningAI Labs**
Idinagdag ang seksyong What's Next sa pangkalahatang-ideya ng Module 10 at Module 11

#### Mga Ayos sa Code at Nilalaman

**SDK at Mga Update sa Dependency**
Inayos ang walang laman na bersyon ng openai sa `^4.95.0`
In-update ang SDK mula `^1.8.0` hanggang `>=1.26.0`
In-update ang mcp version pins sa `>=1.26.0`

**Pag-ayos ng Code**
Inayos ang invalid na modelo `gpt-4o-mini` sa `gpt-4.1-mini`

**Pag-aayos ng Nilalaman**
Inayos ang sirang link `READMEmd` → `README.md`, inayos ang header ng kurikulum `Module 1-3` → `Module 0-3`, inayos ang case-sensitive na path
Tinanggal ang corrupt na duplicate ng nilalaman ng Case Study 5

**Pagpapahusay sa Patnubay para sa mga Baguhan**
Idinagdag ang tamang introduksyon, mga layunin sa pagkatuto, at mga kinakailangan para sa mga baguhan

#### Mga Update sa Kurikulum

**Pangunahing README.md**
- Idinagdag ang mga entry 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) sa talahanayan ng kurikulum

**Mga README ng Module**
Idinagdag ang mga aralin 12 at 13 sa listahan ng mga aralin
Idinagdag ang seksyon ng Praktikal na Gabay na may link sa pagination
Idinagdag ang mga aralin 5.15 (Custom Transport) at 5.16 (Protocol Features)

**study_guide.md**
- In-update ang mindmap na may lahat ng bagong paksa: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## Enero 28, 2026

### Pagsusuri ng Pagsunod sa MCP Specification 2025-11-25

#### Pagpapahusay ng Core Concepts (01-CoreConcepts/)
- **Bagong Client Primitive - Roots**: Idinagdag ang masusing dokumentasyon sa Roots client primitive, na nagpapahintulot sa mga server na maunawaan ang mga hangganan ng filesystem at mga pahintulot sa pag-access
- **Tool Annotations**: Idinagdag ang dokumentasyon sa mga anotasyon ng asal ng tool (`readOnlyHint`, `destructiveHint`) para sa mas mahusay na mga desisyon sa pagpapatupad ng tool
- **Tool Calling sa Sampling**: In-update ang dokumentasyon ng Sampling upang isama ang mga parameter na `tools` at `toolChoice` para sa model-driven tool invocation sa panahon ng sampling requests
- **URL Mode Elicitation**: Idinagdag ang dokumentasyon sa URL-based elicitation para sa mga panlabas na web interaction na sinimulan ng server
- **Mga Gawain (Experimental)**: Idinagdag ang bagong seksyon na nagdodokumento sa experimental na tampok ng Tasks para sa matibay na execution wrappers at deferred na pagkuha ng resulta
- **Suporta sa Icons**: Napansin na ang mga tool, resources, resource template, at mga prompt ay maaaring magsama na ngayon ng mga icon bilang karagdagang metadata

#### Mga Update sa Dokumentasyon
- **README.md**: Idinagdag ang MCP Specification 2025-11-25 na bersyon at paliwanag sa versioning ayon sa petsa
- **study_guide.md**: In-update ang mapa ng kurikulum upang isama ang Tasks at Tool Annotations sa seksyong Core Concepts; in-update ang timestamp ng dokumento

#### Pagpapatunay sa Pagsunod sa Specification
- **Bersyon ng Protocol**: Pinatunayan na lahat ng dokumentasyon ay tumutukoy sa kasalukuyang MCP Specification 2025-11-25
- **Pagkakasunod ng Arkitektura**: Nakumpirma ang katumpakan ng dokumentasyon ng two-layer architecture (Data Layer + Transport Layer)
- **Dokumentasyon ng Primitives**: Pinatunayan ang mga server primitives (Resources, Prompts, Tools) at client primitives (Sampling, Elicitation, Logging, Roots)
- **Mga Mekanismo ng Transport**: Pinatunayan ang katumpakan ng dokumentasyon ng STDIO at Streamable HTTP transport
- **Patnubay sa Seguridad**: Nakumpirma ang pagkakasunod sa kasalukuyang MCP Security Best Practices na dokumentasyon

#### Mga Pangunahing Tampok ng MCP 2025-11-25 na Naidokumento
- **OpenID Connect Discovery**: Pagdiskubre ng auth server sa pamamagitan ng OIDC
- **OAuth Client ID Metadata Documents**: Inirerekomendang mekanismo ng pagpaparehistro ng client
- **JSON Schema 2020-12**: Default na dialect para sa definisyon ng MCP schema
- **Sistema ng Pag-tier ng SDK**: Pormal na mga kinakailangan para sa suporta at pagpapanatili ng mga tampok ng SDK
- **Estruktura ng Pamamahala**: Pormal na mga Working Groups at Interest Groups sa pamamahala ng MCP

### Pangunahing Update sa Dokumentasyon ng Seguridad (02-Security/)

#### Integrasyon ng MCP Security Summit Workshop (Sherpa)
- **Bagong Hands-On Training Resource**: Idinagdag ang masusing integrasyon sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) sa lahat ng dokumentasyon ng seguridad
- **Saklaw ng Ruta ng Expedition**: Dinokumento ang kumpletong pag-usad mula camp-to-camp mula Base Camp hanggang Summit
- **Pagkakasunod sa OWASP**: Lahat ng patnubay sa seguridad ay naka-map na ngayon sa OWASP MCP Azure Security Guide na mga panganib

#### Integrasyon ng OWASP MCP Top 10
- **Bagong Seksyon**: Idinagdag ang talahanayan ng OWASP MCP Top 10 Security Risks na may mga mitigasyon ng Azure sa pangunahing Security README
- **Dokumentasyon Batay sa Panganib**: In-update ang mcp-security-controls-2025.md na may mga sanggunian sa panganib ng OWASP MCP para sa bawat domain ng seguridad
- **Reference Architecture**: Nag-link sa OWASP MCP Azure Security Guide reference architecture at mga pattern ng implementasyon

#### Na-update na Mga File ng Seguridad
- **README.md**: Idinagdag ang pangkalahatang-ideya ng Sherpa Workshop, talahanayan ng ruta ng expedition, buod ng OWASP MCP Top 10 risks, at seksyon ng hands-on training
- **mcp-security-controls-2025.md**: In-update ang header sa Pebrero 2026, idinagdag ang mga sanggunian ng panganib ng OWASP (MCP01-MCP08), inayos ang inconsistency sa bersyon ng spec
- **mcp-security-best-practices-2025.md**: Idinagdag ang mga seksyon ng Sherpa at OWASP resources, in-update ang timestamp
- **mcp-best-practices.md**: Idinagdag ang seksyon ng hands-on training na may mga link sa Sherpa at OWASP
- **azure-content-safety-implementation.md**: Idinagdag ang OWASP MCP06 na sanggunian, pag-align sa Sherpa Camp 3, at karagdagang seksyon ng mga resources

#### Idinagdag na Mga Link sa Mga Resource
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Mga indibidwal na pahina ng panganib ng OWASP MCP (MCP01-MCP10)

### Pagkakasunod ng Buong Kurikulum sa MCP Specification 2025-11-25

#### Module 03 - Pagsisimula
- **Dokumentasyon ng SDK**: Idinagdag ang Go SDK sa opisyal na listahan ng SDK; in-update lahat ng sanggunian ng SDK upang tumugma sa MCP Specification 2025-11-25
- **Paglilinaw sa Transport**: In-update ang mga paglalarawan ng STDIO at HTTP Streaming transport na may malinaw na sanggunian sa spec

#### Module 04 - Praktikal na Implementasyon
- **Mga Update sa SDK**: Idinagdag ang Go SDK; in-update ang listahan ng SDK na may sanggunian sa bersyon ng specification
- **Authorization Spec**: In-update ang MCP Authorization specification link sa kasalukuyang bersyon na 2025-11-25

#### Module 05 - Advanced Topics
- **Mga Bagong Tampok**: Idinagdag ang tala tungkol sa mga bagong tampok ng MCP Specification 2025-11-25 (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Mga Resource sa Seguridad**: Idinagdag ang mga link ng OWASP MCP Top 10 at Sherpa workshop sa karagdagang mga sanggunian

#### Module 06 - Kontribusyon ng Komunidad
- **Listahan ng SDK**: Idinagdag ang Swift at Rust SDKs; in-update ang sanggunian ng specification sa 2025-11-25
- **Sanggunian sa Spec**: In-update ang link ng MCP Specification sa direktang URL ng specification

#### Module 07 - Mga Aralin mula sa Maagang Pagtanggap

- **Mga Update sa Resource**: Idinagdag ang MCP Specification 2025-11-25 na link at OWASP MCP Top 10 sa mga karagdagang resources

#### Module 08 - Pinakamagandang Kasanayan
- **Bersyon ng Spec**: In-update ang MCP Specification reference sa 2025-11-25
- **Mga Security Resource**: Idinagdag ang OWASP MCP Top 10 at Sherpa workshop sa mga karagdagang sanggunian

#### Module 10 - Pagpapadali ng AI Workflows
- **Update ng Badge**: Binago ang MCP version badge mula sa SDK version (1.9.3) papuntang specification version (2025-11-25)
- **Mga Link ng Resource**: In-update ang MCP Specification link; idinagdag ang OWASP MCP Top 10

#### Module 11 - MCP Server Hands-On Labs
- **Spec Reference**: In-update ang MCP Specification link sa bersyon na 2025-11-25
- **Mga Security Resource**: Idinagdag ang OWASP MCP Top 10 sa mga opisyal na resources

## Disyembre 18, 2025

### Update sa Dokumentasyon sa Seguridad - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Update ng Bersyon ng Specification
- **Pag-update ng Bersyon ng Protocol**: In-update upang i-reference ang pinakabagong MCP Specification 2025-11-25 (nilabas noong Nobyembre 25, 2025)
  - In-update ang lahat ng reference sa bersyon ng specification mula 2025-06-18 papuntang 2025-11-25
  - In-update ang mga petsa ng dokumento mula Agosto 18, 2025 papuntang Disyembre 18, 2025
  - Naverify na lahat ng mga URL ng specification ay nakaturo sa kasalukuyang dokumentasyon
- **Pag-validate ng Nilalaman**: Komprehensibong pag-validate ng mga pinakamahusay na kasanayan sa seguridad laban sa pinakabagong mga pamantayan
  - **Microsoft Security Solutions**: Naverify ang kasalukuyang terminolohiya at mga link para sa Prompt Shields (dating "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, at Azure Key Vault
  - **Seguridad sa OAuth 2.1**: Kinumpirma ang pagsunod sa pinakabagong mga pinakamahusay na kasanayan sa seguridad ng OAuth
  - **Pamantayan ng OWASP**: Na-validate ang OWASP Top 10 para sa LLMs na tumutukoy na nananatiling kasalukuyan
  - **Mga Serbisyo ng Azure**: Naverify ang lahat ng mga link sa dokumentasyon ng Microsoft Azure at mga pinakamahusay na kasanayan
- **Pagsunod sa Pamantayan**: Lahat ng nireferensiyang mga pamantayan sa seguridad ay nakumpirma ang kasalukuyan
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Mga Pinakamahusay na Kasanayan sa Seguridad ng OAuth 2.1
  - Mga framework ng seguridad at pagsunod ng Azure
- **Mga Resource para sa Implementasyon**: Naverify ang lahat ng mga link sa gabay sa implementasyon at mga resource
  - Mga pattern ng authentication ng Azure API Management
  - Mga gabay sa integrasyon ng Microsoft Entra ID
  - Pamamahala ng mga sekreto ng Azure Key Vault
  - Mga pipeline ng DevSecOps at mga solusyon sa pagmamanman

### Pagsigurado sa Kalidad ng Dokumentasyon
- **Pagsunod sa Specification**: Tiniyak na lahat ng mga mandatory MCP na pangangailangan sa seguridad (MUST/MUST NOT) ay nakaayon sa pinakabagong specification
- **Kasapatan ng Resource**: Naverify ang lahat ng external na link sa dokumentasyon ng Microsoft, mga pamantayan sa seguridad, at mga gabay sa implementasyon
- **Saklaw ng Pinakamahusay na Kasanayan**: Kinumpleto ang saklaw ng authentication, authorization, mga tukoy na banta sa AI, seguridad sa supply chain, at mga pattern sa enterprise

## Oktubre 6, 2025

### Pagpapalawak ng Seksyon sa Pagsisimula – Advanced Server Usage & Simpleng Authentication

#### Advanced Server Usage (03-GettingStarted/10-advanced)
- **Bagong Kabanata Idinagdag**: Nagpakilala ng komprehensibong gabay sa advanced MCP server usage, na sumasaklaw sa parehong regular at low-level na arkitektura ng server.
  - **Regular vs. Low-Level na Server**: Detalyadong paghahambing at mga halimbawa ng code sa Python at TypeScript para sa parehong pamamaraan.
  - **Handler-Based na Disenyo**: Paliwanag sa handler-based na pamamahala ng tool/resource/prompt para sa scalable at flexible na mga implementasyon ng server.
  - **Mga Praktikal na Pattern**: Mga totoong senaryo kung saan kapaki-pakinabang ang mga low-level na pattern ng server para sa mga advanced na tampok at arkitektura.

#### Simpleng Authentication (03-GettingStarted/11-simple-auth)
- **Bagong Kabanata Idinagdag**: Step-by-step na gabay sa pagpapatupad ng simpleng authentication sa mga MCP server.
  - **Mga Konsepto sa Auth**: Maliwanag na paliwanag ng authentication kumpara sa authorization, at pamamahala sa kredensyal.
  - **Basic Auth Implementation**: Middleware-based na mga pattern ng authentication sa Python (Starlette) at TypeScript (Express), kasama ang mga sample na code.
  - **Pag-unlad Patungo sa Advanced na Seguridad**: Patnubay mula sa simpleng auth papuntang OAuth 2.1 at RBAC, na may mga sanggunian sa mga advanced na security module.

Ang mga dagdag na ito ay nagbibigay ng praktikal at hands-on na gabay para sa pagbuo ng mas matibay, ligtas, at flexible na mga implementasyon ng MCP server, na nag-uugnay ng mga pundasyong konsepto sa mga advanced na pattern ng produksyon.

## Setyembre 29, 2025

### MCP Server Database Integration Labs - Komprehensibong Hands-On Learning Path

#### 11-MCPServerHandsOnLabs - Bagong Kumpletong Kurikulum sa Database Integration
- **Kompletong 13-Lab Learning Path**: Idinagdag ang komprehensibong hands-on na kurikulum para sa pagbuo ng production-ready na MCP servers na may integrasyon ng PostgreSQL database
  - **Real-World Implementation**: Zava Retail analytics use case na nagpapakita ng mga pattern na pang-enterprise grade
  - **Strukturadong Progression sa Pag-aaral**:
    - **Labs 00-03: Mga Pundasyon** - Introduksyon, Core Arkitektura, Seguridad & Multi-Tenancy, Environment Setup
    - **Labs 04-06: Pagbuo ng MCP Server** - Database Design & Schema, Implementasyon ng MCP Server, Pagbuo ng Tool  
    - **Labs 07-09: Mga Advanced na Tampok** - Semantic Search Integration, Testing & Debugging, VS Code Integration
    - **Labs 10-12: Produksyon at Pinakamahusay na Kasanayan** - Mga Estratehiya sa Deployment, Monitoring & Observability, Pinakamahusay na Kasanayan at Optimization
  - **Mga Teknolohiyang Enterprise**: FastMCP framework, PostgreSQL na may pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Mga Advanced na Tampok**: Row Level Security (RLS), semantic search, multi-tenant data access, vector embeddings, real-time monitoring

#### Standardisasyon ng Terminolohiya - Pag-convert mula Module papuntang Lab
- **Komprehensibong Update sa Dokumentasyon**: Sistematikong in-update lahat ng README files sa 11-MCPServerHandsOnLabs upang gamitin ang terminong "Lab" imbes na "Module"
  - **Mga Header ng Seksyon**: In-update ang "What This Module Covers" sa "What This Lab Covers" sa lahat ng 13 labs
  - **Paglalarawan ng Nilalaman**: Pinalitan ang "This module provides..." ng "This lab provides..." sa buong dokumentasyon
  - **Mga Layunin sa Pag-aaral**: In-update ang "By the end of this module..." sa "By the end of this lab..."
  - **Mga Navigation Link**: Pinalitan lahat ng reference ng "Module XX:" sa "Lab XX:" sa mga cross-reference at navigation
  - **Pagsubaybay sa Pagtatapos**: In-update ang "After completing this module..." sa "After completing this lab..."
  - **Napanatili ang mga Teknikal na Reference**: Pinanatili ang mga reference sa Python module sa mga configuration file (hal., `"module": "mcp_server.main"`)

#### Pagpapahusay ng Study Guide (study_guide.md)
- **Visual Curriculum Map**: Idinagdag ang bagong seksyon na "11. Database Integration Labs" na may komprehensibong visualisasyon ng istraktura ng lab
- **Istraktura ng Repository**: In-update mula sa sampu papuntang labing-isa ang mga pangunahing seksyon na may detalyadong paglalarawan ng 11-MCPServerHandsOnLabs
- **Patnubay sa Learning Path**: Pinahusay ang mga tagubilin sa pag-navigate para masaklaw ang mga seksyon 00-11
- **Saklaw ng Teknolohiya**: Idinagdag ang mga detalye ng integrasyon ng FastMCP, PostgreSQL, at mga serbisyo ng Azure
- **Mga Kinalabasan sa Pag-aaral**: Binigyang-diin ang pagbuo ng production-ready na server, mga pattern ng integrasyon ng database, at seguridad sa enterprise

#### Pagpapahusay ng Pangunahing README Istraktura
- **Terminolohiya Batay sa Lab**: In-update ang pangunahing README.md sa 11-MCPServerHandsOnLabs upang gamitin nang consistent ang "Lab" na istraktura
- **Organisasyon ng Learning Path**: Malinaw na progression mula sa mga pundasyong konsepto hanggang sa advanced na implementasyon at deployment sa produksyon
- **Pokus sa Real-World**: Pagbibigay-diin sa praktikal at hands-on na pag-aaral kasama ang mga pattern at teknolohiyang pang-enterprise

### Pagpapahusay sa Kalidad at Konsistensi ng Dokumentasyon
- **Pagtutok sa Hands-On Learning**: Pinatatag ang praktikal at lab-based na pamamaraan sa buong dokumentasyon
- **Pokus sa Mga Pattern ng Enterprise**: Ipinakita ang mga implementasyong handa para sa produksyon at mga konsiderasyon sa seguridad ng enterprise
- **Integrasyon ng Teknolohiya**: Komprehensibong saklaw ng mga modernong serbisyo ng Azure at mga pattern ng integrasyon ng AI
- **Progression sa Pag-aaral**: Malinaw at estrukturadong landas mula sa mga basic na konsepto hanggang sa deployment sa produksyon

## Setyembre 26, 2025

### Pagpapahusay ng Case Studies - GitHub MCP Registry Integration

#### Case Studies (09-CaseStudy/) - Pokus sa Pagpapaunlad ng Ecosystem
- **README.md**: Malaking pagpapalawak na may komprehensibong study case ng GitHub MCP Registry
  - **GitHub MCP Registry Case Study**: Bagong komprehensibong case study na sinusuri ang paglulunsad ng GitHub MCP Registry noong Setyembre 2025
    - **Pagsusuri sa Problema**: Detalyadong pagsusuri sa fragmented MCP server discovery at deployment challenges
    - **Arkitektura ng Solusyon**: Centralized registry approach ng GitHub na may one-click na pag-install sa VS Code
    - **Epekto sa Negosyo**: Nasusukat na pagpapabuti sa onboarding at produktibidad ng developer
    - **Halaga ng Estratehiya**: Pokus sa modular na deployment ng agent at cross-tool interoperability
    - **Pag-unlad ng Ecosystem**: Posisyong bilang pundasyong plataporma para sa agentic integration
  - **Pinahusay na Estruktura ng Case Study**: In-update ang lahat ng pitong case studies na may consistent na format at komprehensibong mga paglalarawan
    - Azure AI Travel Agents: Pokus sa multi-agent orchestration
    - Azure DevOps Integration: Pokus sa pag-automate ng workflow
    - Real-Time Documentation Retrieval: Implementasyon ng Python console client
    - Interactive Study Plan Generator: Chainlit conversational web app
    - In-Editor Documentation: Integrasyon ng VS Code at GitHub Copilot
    - Azure API Management: Mga pattern ng enterprise API integration
    - GitHub MCP Registry: Pag-unlad ng ecosystem at platform ng komunidad
  - **Komprehensibong Konklusyon**: Muling isinulat ang seksyon ng konklusyon na nagha-highlight ng pitong case studies na sumasaklaw sa iba't ibang dimensyon ng implementasyon ng MCP
    - Enterprise Integration, Multi-Agent Orchestration, Developer Productivity
    - Pag-unlad ng Ecosystem, Kategorya ng Mga Aplikasyong Pang-edukasyon
    - Pinahusay na mga insight sa mga pattern ng arkitektura, mga estratehiya sa implementasyon, at mga pinakamahusay na kasanayan
    - Pagbibigay-diin sa MCP bilang mature at handa sa produksyon na protocol

#### Updates sa Study Guide (study_guide.md)
- **Visual Curriculum Map**: In-update ang mindmap para isama ang GitHub MCP Registry sa seksyon ng Case Studies
- **Paglalarawan ng Case Studies**: Pinahusay mula sa generic na mga paglalarawan hanggang sa detaladong paghahati ng pitong komprehensibong case studies
- **Istraktura ng Repository**: In-update ang seksyon 10 upang ipakita ang komprehensibong saklaw ng case study na may mga partikular na detalye sa implementasyon
- **Integrasyon ng Changelog**: Idinagdag ang entry ng Setyembre 26, 2025 na nagtala ng pagdaragdag ng GitHub MCP Registry at pagpapahusay ng case studies
- **Pag-update ng Petsa**: In-update ang footer timestamp upang ipakita ang pinakabagong rebisyon (Setyembre 26, 2025)

### Pagpapahusay ng Kalidad ng Dokumentasyon
- **Pagpapahusay ng Konsistensi**: Standardisadong format at estruktura ng mga case study sa lahat ng pitong halimbawa
- **Komprehensibong Saklaw**: Ang mga case study ay sumasaklaw na ngayon sa enterprise, produktibidad ng developer, at mga senaryo ng pag-unlad ng ecosystem
- **Estratehikong Posisyon**: Pinahusay ang pokus sa MCP bilang pundasyong plataporma para sa deployment ng agentic system
- **Integrasyon ng Resource**: In-update ang mga karagdagang resource upang isama ang link ng GitHub MCP Registry

## Setyembre 15, 2025

### Pagpapalawak ng Mga Advanced na Paksa - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Bagong Gabay sa Advanced na Implementasyon
- **README.md**: Kumpletong gabay sa implementasyon para sa mga custom na mekanismo ng MCP transport
  - **Azure Event Grid Transport**: Komprehensibong serverless event-driven transport implementation
    - Mga halimbawa sa C#, TypeScript, at Python na may Azure Functions integration
    - Mga pattern ng event-driven architecture para sa scalable na MCP solutions
    - Mga webhook receiver at push-based na pamamahala ng mensahe
  - **Azure Event Hubs Transport**: High-throughput streaming transport implementation
    - Mga kagalingan sa real-time streaming para sa mga low-latency na senaryo
    - Mga estratehiya sa partitioning at checkpoint management
    - Mensahe batching at pag-optimize ng performance
  - **Mga Pattern ng Enterprise Integration**: Mga production-ready na halimbawa ng arkitektura
    - Distributed MCP processing sa maraming Azure Functions
    - Hybrid na arkitektura ng transport na pinagsasama ang iba't ibang uri ng transport
    - Mga estratehiya sa durability, reliability, at error handling ng mensahe
  - **Seguridad at Monitoring**: Azure Key Vault integration at mga pattern ng observability
    - Authentication gamit ang managed identity at least privilege access
    - Application Insights telemetry at performance monitoring
    - Circuit breakers at mga pattern ng fault tolerance
  - **Mga Testing Framework**: Komprehensibong mga estratehiya sa pagsusuri para sa mga custom na transport
    - Unit testing gamit ang test doubles at mocking frameworks
    - Integration testing gamit ang Azure Test Containers
    - Mga konsiderasyon sa performance at load testing

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Umuusbong na Disiplina sa AI
- **README.md**: Komprehensibong pagtalakay sa context engineering bilang isang umuusbong na larangan
  - **Pangunahing Prinsipyo**: Kumpletong pagbabahagi ng konteksto, kamalayan sa desisyon ng aksyon, at pamamahala ng context window
  - **Pagkakatugma sa MCP Protocol**: Paano tinutugunan ng disenyo ng MCP ang mga hamon ng context engineering
    - Mga limitasyon ng context window at mga progresibong estratehiya sa pag-load
    - Pagtukoy ng kaugnayan at dynamic na pagkuha ng konteksto
    - Multi-modal na pamamahala ng konteksto at mga konsiderasyon sa seguridad
  - **Mga Paraan sa Implementasyon**: Single-threaded kumpara sa multi-agent na mga arkitektura
    - Mga teknik sa pagchunk at pag-prioritize ng konteksto
    - Progresibong pag-load ng konteksto at mga estratehiya sa compression
    - Mga layered na paraan ng konteksto at pag-optimize sa pagkuha nito
  - **Framework ng Pagsukat**: Umuusbong na mga metro para sa pagsusuri ng bisa ng konteksto
    - Input efficiency, performance, kalidad, at mga konsiderasyon sa karanasan ng user
    - Mga experimental na paraan sa pag-optimize ng konteksto
    - Pagsusuri sa pagkabigo at mga metodolohiya ng pagpapabuti

#### Updates sa Navigation ng Kurikulum (README.md)
- **Pinahusay na Istraktura ng Module**: In-update ang talahanayan ng kurikulum upang isama ang mga bagong advanced na paksa
  - Idinagdag ang Context Engineering (5.14) at Custom Transport (5.15)
  - Consistent na format at mga link sa navigation sa lahat ng mga module
  - In-update ang mga paglalarawan upang ipakita ang kasalukuyang saklaw ng nilalaman

### Pagpapahusay ng Istraktura ng Direktoryo
- **Standardisasyon ng Pangalan**: Pinalitan ang "mcp transport" sa "mcp-transport" para sa pagkakapare-pareho sa ibang mga folder ng advanced topics
- **Organisasyon ng Nilalaman**: Lahat ng 05-AdvancedTopics folder ngayon ay sumusunod sa consistent na pattern ng pangalan (mcp-[topic])

### Pagpapahusay sa Kalidad ng Dokumentasyon
- **Pagkakatugma sa MCP Specification**: Lahat ng bagong nilalaman ay nagre-reference sa kasalukuyang MCP Specification 2025-06-18
- **Mga Halimbawa sa Maramihang Wika**: Komprehensibong mga halimbawa ng code sa C#, TypeScript, at Python

- **Pagtuon sa Enterprise**: Mga pattern na handa na para sa produksyon at integrasyon ng Azure cloud sa buong sistema
- **Visual na Dokumentasyon**: Mga diagram ng Mermaid para sa arkitektura at biswal na pag-aanalisa ng daloy

## Agosto 18, 2025

### Komprehensibong Update sa Dokumentasyon - Mga Pamantayan ng MCP 2025-06-18

#### Pinakamahusay na Praktis sa Seguridad ng MCP (02-Security/) - Kompleto at Modernisasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Buong muling pagsulat na naaayon sa MCP Specification 2025-06-18
  - **Mga Sapilitang Kinakailangan**: Idinagdag ang malinaw na MUST/MUST NOT na mga kinakailangan mula sa opisyal na espesipikasyon na may mga malinaw na visual na tagapagpahiwatig
  - **12 Pangunahing Praktis sa Seguridad**: MulIing inayos mula sa 15-item na listahan patungo sa komprehensibong mga domain ng seguridad
    - Seguridad ng Token at Pagpapatunay gamit ang integrasyon ng external identity provider
    - Pamamahala ng Sesyon at Seguridad sa Transportasyon gamit ang mga kinakailangan sa cryptographic
    - AI-Specific Threat Protection gamit ang integrasyon ng Microsoft Prompt Shields
    - Kontrol sa Akses at Pahintulot gamit ang prinsipyo ng pinakamaliit na pribilehiyo
    - Kaligtasan at Pagsubaybay ng Nilalaman gamit ang integrasyon ng Azure Content Safety
    - Seguridad sa Supply Chain gamit ang komprehensibong beripikasyon ng mga bahagi
    - Seguridad ng OAuth at Pag-iwas sa Confused Deputy gamit ang implementasyon ng PKCE
    - Pagtugon sa Insidente at Pag-recover gamit ang mga automated na kakayahan
    - Pagsunod at Pamamahala gamit ang pagsunod sa regulasyon
    - Mga Advanced na Kontrol sa Seguridad gamit ang zero trust architecture
    - Integrasyon sa Microsoft Security Ecosystem gamit ang komprehensibong mga solusyon
    - Patuloy na Pagbabago sa Seguridad gamit ang mga adaptive na praktis
  - **Mga Solusyon sa Seguridad ng Microsoft**: Pinalawak na gabay sa integrasyon para sa Prompt Shields, Azure Content Safety, Entra ID, at GitHub Advanced Security
  - **Mga Mapagkukunan para sa Implementasyon**: Naka-kategoryang komprehensibong mga link ng mapagkukunan ayon sa Opisyal na Dokumentasyon ng MCP, Mga Solusyon sa Seguridad ng Microsoft, Mga Pamantayan sa Seguridad, at Mga Gabay sa Implementasyon

#### Mga Advanced na Kontrol sa Seguridad (02-Security/) - Implementasyon sa Enterprise
- **MCP-SECURITY-CONTROLS-2025.md**: Buong rebisyon gamit ang enterprise-grade na balangkas ng seguridad
  - **9 Komprehensibong Domain ng Seguridad**: Pinalawak mula sa mga pangunahing kontrol patungo sa detalyadong enterprise framework
    - Advanced Authentication at Authorization gamit ang integrasyon ng Microsoft Entra ID
    - Seguridad ng Token at Anti-Passthrough Controls gamit ang komprehensibong beripikasyon
    - Mga Kontrol sa Seguridad ng Sesyon na may pag-iwas sa pag-hijack
    - Mga AI-Specific Security Controls na may pag-iwas sa prompt injection at tool poisoning
    - Pag-iwas sa Confused Deputy Attack gamit ang seguridad ng OAuth proxy
    - Seguridad sa Pagpapatakbo ng Tool gamit ang sandboxing at isolation
    - Mga Kontrol sa Seguridad ng Supply Chain gamit ang beripikasyon ng dependency
    - Mga Kontrol sa Pagsubaybay at Pag-detect gamit ang integrasyon ng SIEM
    - Pagtugon sa Insidente at Pag-recover gamit ang mga automated na kakayahan
  - **Mga Halimbawa ng Implementasyon**: Idinagdag ang detalyadong mga YAML na bloke ng configuration at mga halimbawa ng code
  - **Integrasyon ng Mga Solusyon ng Microsoft**: Komprehensibong saklaw ng mga serbisyo sa seguridad ng Azure, GitHub Advanced Security, at pamamahala ng identidad sa enterprise

#### Mga Advanced na Paksa sa Seguridad (05-AdvancedTopics/mcp-security/) - Produkson-Handa na Implementasyon
- **README.md**: Buong muling pagsulat para sa implementasyon ng seguridad sa enterprise
  - **Kasulukuyang Pagsunod sa Espesipikasyon**: Na-update ayon sa MCP Specification 2025-06-18 na may mga sapilitang kinakailangan sa seguridad
  - **Pinahusay na Pagpapatunay**: Integrasyon ng Microsoft Entra ID na may komprehensibong mga halimbawa sa .NET at Java Spring Security
  - **Integrasyon ng AI Security**: Implementasyon ng Microsoft Prompt Shields at Azure Content Safety na may detalyadong mga halimbawa sa Python
  - **Advanced Threat Mitigation**: Komprehensibong mga halimbawa ng implementasyon para sa
    - Pag-iwas sa Confused Deputy Attack gamit ang PKCE at validation ng user consent
    - Pag-iwas sa Token Passthrough gamit ang pag-validate ng audience at secure na pamamahala ng token
    - Pag-iwas sa Session Hijacking gamit ang cryptographic binding at behavioral analysis
  - **Integrasyon sa Seguridad ng Enterprise**: Pagsubaybay gamit ang Azure Application Insights, mga pipeline sa pagtuklas ng banta, at seguridad sa supply chain
  - **Checklist para sa Implementasyon**: Malinaw na mga sapilitang vs. inirerekomendang kontrol sa seguridad na may mga benepisyo ng Microsoft security ecosystem

### Kalidad ng Dokumentasyon at Pagsunod sa Pamantayan
- **Mga Sanggunian sa Espesipikasyon**: Na-update lahat ng sanggunian sa kasalukuyang MCP Specification 2025-06-18
- **Microsoft Security Ecosystem**: Pinahusay na gabay sa integrasyon sa lahat ng dokumentasyong may kinalaman sa seguridad
- **Praktikal na Implementasyon**: Idinagdag ang mga detalyadong halimbawa ng code sa .NET, Java, at Python na may mga pattern para sa enterprise
- **Organisasyon ng Mga Mapagkukunan**: Komprehensibong pagkakategorya ng opisyal na dokumentasyon, mga pamantayan sa seguridad, at mga gabay sa implementasyon
- **Visual na Tagapagpahiwatig**: Malinaw na pagmamarka ng sapilitang mga kinakailangan laban sa mga inirerekomendang praktis


#### Pangunahing Konsepto (01-CoreConcepts/) - Ganap na Modernisasyon
- **Pag-update ng Bersyon ng Protocol**: Na-update upang tukuyin ang kasalukuyang MCP Specification 2025-06-18 na may date-based versioning (format na YYYY-MM-DD)
- **Pagpapahusay ng Arkitektura**: Pinahusay na mga paglalarawan ng Mga Host, Kliyente, at Server upang ipakita ang kasalukuyang mga pattern ng arkitektura ng MCP
  - Ang mga Host ay malinaw nang itinuturing bilang mga AI application na nagkokordina ng maraming koneksyon ng MCP client
  - Ang mga Client ay inilalarawan bilang mga konektor ng protocol na nagpapanatili ng one-to-one na relasyon sa server
  - Ang mga Server ay pinalawak upang ipakita ang mga lokal vs. remote na senaryo ng deployment
- **Pagsasaayos ng Primitive**: Buong rebisyon ng mga primitive ng server at client
  - Mga Primitive ng Server: Mga Resources (pinagkukunan ng data), Mga Prompt (template), Mga Tools (maaaring patakbuhin na mga function) na may detalyadong mga paliwanag at halimbawa
  - Mga Primitive ng Client: Sampling (LLM completions), Elicitation (input ng user), Logging (debugging/pagsubaybay)
  - Na-update gamit ang kasalukuyang mga pattern sa discovery (`*/list`), retrieval (`*/get`), at execution (`*/call`)
- **Arkitektura ng Protocol**: Ipinakilala ang dalawang-layer na modelo ng arkitektura
  - Data Layer: Pundasyon ng JSON-RPC 2.0 na may lifecycle management at mga primitive
  - Transport Layer: STDIO (lokal) at Streamable HTTP na may SSE (remote) na mga mekanismo ng transportasyon
- **Balangkas ng Seguridad**: Komprehensibong mga prinsipyo ng seguridad kabilang ang malinaw na pahintulot ng user, proteksyon sa privacy ng data, kaligtasan sa pagpapatakbo ng tool, at seguridad ng transport layer
- **Mga Pattern ng Komunikasyon**: Na-update ang mga protocol message para ipakita ang initialization, discovery, execution, at notifications flows
- **Mga Halimbawa ng Code**: Ni-refres ang mga halimbawa sa maraming wika (.NET, Java, Python, JavaScript) upang ipakita ang kasalukuyang mga pattern ng MCP SDK

#### Seguridad (02-Security/) - Komprehensibong Rebisyon sa Seguridad  
- **Pagsunod sa Pamantayan**: Kumpletong pagsunod sa mga kinakailangan sa seguridad ng MCP Specification 2025-06-18
- **Ebolusyon ng Pagpapatunay**: Idokumento ang ebolusyon mula sa custom OAuth servers patungo sa delegasyon ng external identity provider (Microsoft Entra ID)
- **AI-Specific Threat Analysis**: Pinalawak na saklaw ng mga modernong AI attack vectors
  - Detalyadong mga senaryo ng prompt injection attack na may mga totoong halimbawa
  - Mga mekanismo ng tool poisoning at mga pattern ng "rug pull" attack
  - Pag-poison ng context window at mga atake sa pagkagulo ng modelo
- **Mga Solusyon sa Seguridad ng Microsoft AI**: Komprehensibong saklaw ng Microsoft security ecosystem
  - AI Prompt Shields na may advanced detection, spotlighting, at mga delimiter technique
  - Mga pattern ng integrasyon ng Azure Content Safety
  - GitHub Advanced Security para sa proteksyon ng supply chain
- **Advanced Threat Mitigation**: Detalyadong mga kontrol sa seguridad para sa
  - Session hijacking gamit ang MCP-specific na mga senaryo ng atake at mga kinakailangan sa cryptographic session ID
  - Mga problema ng confused deputy sa mga MCP proxy na senaryo na may malinaw na mga requirements sa consent
  - Mga kahinaan sa token passthrough na may mga sapilitang kontrol sa beripikasyon
- **Seguridad sa Supply Chain**: Pinalawak na saklaw ng AI supply chain kabilang ang mga foundation model, embeddings services, context providers, at third-party APIs
- **Seguridad sa Foundation**: Pinahusay na integrasyon gamit ang mga pattern ng seguridad sa enterprise kabilang ang zero trust architecture at Microsoft security ecosystem
- **Organisasyon ng Mga Mapagkukunan**: Naka-kategoryang komprehensibong mga link ng mapagkukunan ayon sa uri (Opisyal na Docs, Pamantayan, Pananaliksik, Mga Solusyon ng Microsoft, Gabay sa Implementasyon)

### Mga Pagpapabuti sa Kalidad ng Dokumentasyon
- **Nakaayos na Mga Layunin sa Pagkatuto**: Pinahusay ang mga layunin sa pagkatuto na may mga tiyak at magagawa na kinalabasan 
- **Mga Cross-Reference**: Idinagdag ang mga link sa pagitan ng mga related na paksa sa seguridad at pangunahing konsepto
- **Kasalukuyang Impormasyon**: Na-update lahat ng petsa at link ng espesipikasyon sa mga kasalukuyang pamantayan
- **Gabay sa Implementasyon**: Idinagdag ang tiyak at magagawang mga gabay sa implementasyon sa buong dalawang seksyon

## Hulyo 16, 2025

### Pagpapahusay ng README at Navigasyon
- Ganap na dinebelop ang pag-navigate ng kurikulum sa README.md
- Pinalitan ang mga `<details>` tag ng mas madaling ma-access na format na batay sa talahanayan
- Nilikha ang mga alternatibong layout na opsyon sa bagong folder na "alternative_layouts"
- Idinagdag ang mga halimbawa ng card-based, tabbed-style, at accordion-style na pag-navigate
- Na-update ang bahagi ng estruktura ng repository upang isama lahat ng pinakabagong mga file
- Pinahusay ang seksyon na "Paano Gamitin ang Kurikulum" na may malinaw na mga rekomendasyon
- Na-update ang mga link ng MCP specification upang tumutok sa tamang mga URL
- Idinagdag ang seksyon ng Context Engineering (5.14) sa estruktura ng kurikulum

### Mga Update sa Gabay sa Pag-aaral
- Ganap na nirebisa ang gabay sa pag-aaral upang tumugma sa kasalukuyang estruktura ng repository
- Idinagdag ang mga bagong seksyon para sa MCP Clients at Tools, at Mga Popular na MCP Servers
- Na-update ang Visual Curriculum Map upang tumpak na ipakita lahat ng mga paksa
- Pinahusay ang mga paglalarawan ng Advanced Topics upang masaklaw ang lahat ng espesyal na lugar
- Na-update ang seksyon ng Case Studies upang ipakita ang mga totoong halimbawa
- Idinagdag ang komprehensibong changelog na ito

### Mga Ambag ng Komunidad (06-CommunityContributions/)
- Idinagdag ang detalyadong impormasyon tungkol sa mga MCP server para sa paggawa ng larawan
- Idinagdag ang komprehensibong seksyon sa paggamit ng Claude sa VSCode
- Idinagdag ang mga tagubilin sa pag-setup at paggamit ng Cline terminal client
- Na-update ang seksyon ng MCP client upang isama lahat ng mga popular na opsyon ng client
- Pinahusay ang mga halimbawa ng kontribusyon gamit ang mas tumpak na mga sample ng code

### Mga Advanced na Paksa (05-AdvancedTopics/)
- Inayos ang lahat ng mga folder na may espesyal na paksa na may magkakatugmang pangalan
- Idinagdag ang mga materyales at halimbawa ng context engineering
- Idinagdag ang dokumentasyon ng integrasyon ng Foundry agent
- Pinahusay ang dokumentasyon ng seguridad ng integrasyon ng Entra ID

## Hunyo 11, 2025

### Paunang Paglikha
- Inilabas ang unang bersyon ng MCP for Beginners curriculum
- Nilikha ang pangunahing estruktura para sa lahat ng 10 pangunahing seksyon
- Ipinatupad ang Visual Curriculum Map para sa pag-navigate
- Idinagdag ang mga paunang proyekto sa maraming wika ng programming

### Pagsisimula (03-GettingStarted/)
- Nilikha ang mga unang halimbawa ng implementasyon ng server
- Idinagdag ang gabay sa pag-develop ng client
- Isinama ang mga tagubilin sa integrasyon ng LLM client
- Idinagdag ang dokumentasyon ng integrasyon sa VS Code
- Ipinatupad ang mga halimbawa ng Server-Sent Events (SSE) server

### Pangunahing Konsepto (01-CoreConcepts/)
- Idinagdag ang detalyadong paliwanag ng client-server architecture
- Nilikha ang dokumentasyon sa mga pangunahing bahagi ng protocol
- Idinokumento ang mga pattern ng messaging sa MCP

## Mayo 23, 2025

### Estruktura ng Repositoryo
- Inumpisahan ang repository gamit ang pangunahing estruktura ng folder
- Nilikha ang README files para sa bawat pangunahing seksyon
- Naitayo ang imprastruktura para sa pagsasalin
- Idinagdag ang mga asset ng larawan at mga diagram

### Dokumentasyon
- Nilikha ang paunang README.md na may pangkalahatang-ideya ng kurikulum
- Idinagdag ang CODE_OF_CONDUCT.md at SECURITY.md
- Naitayo ang SUPPORT.md na may gabay para sa pagkuha ng tulong
- Nilikha ang preliminariong estruktura ng gabay sa pag-aaral

## Abril 15, 2025

### Pagpaplano at Balangkas
- Paunang pagpaplano para sa MCP for Beginners curriculum
- Tinukoy ang mga layunin sa pagkatuto at target na madla
- Inilatag ang 10-seksyon na estruktura ng kurikulum
- Dinivelop ang konseptwal na balangkas para sa mga halimbawa at case study
- Nilikha ang paunang prototipo ng mga halimbawa para sa mga pangunahing konsepto

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->