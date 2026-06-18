# Changelog: MCP for Beginners Curriculum

Dette dokument tjener som en oversigt over alle væsentlige ændringer foretaget i Model Context Protocol (MCP) for Beginners pensum. Ændringer dokumenteres i omvendt kronologisk rækkefølge (nyere ændringer først).

## 16. juni 2026

### MCP Specifikationsjustering & Eksempelvalidering

Validerede pensummet mod den aktuelle **MCP Specification 2025-11-25** og de seneste officielle SDK'er, derefter rettede de resterende forældede specifikationsreferencer og bekræftede, at kernesamples stadig kan bygges og køre.

#### Korrektioner af specifikationsversioner (2025-06-18 / 2025-03-26 → 2025-11-25)

Opdaterede det engelske indhold, hvor det stadig hævdede, at en ældre specifikationsrevision var den *nuværende/seneste* standard, og rettede links til de kanoniske `modelcontextprotocol.io` spec-stier:
- **05-AdvancedTopics/mcp-security/README.md**: Opdaterede banneret "Current Standard", introduktionen, overskriften om kerneprincipper for sikkerhed, overskriften om obligatoriske krav, afsnittet Microsoft Entra ID, Referencer & Ressourcer-links, og afsluttende sikkerhedsmeddelelse (8 referencer) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Opdaterede linket til yderligere ressourcer og banneret "Current Standard" til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Udskiftede den forældede `2025-03-26` security-and-trust link med den aktuelle 2025-11-25 sikkerhedspraksis-side
- **03-GettingStarted/14-sampling/README.md**: Opdaterede det officielle sampling-dokumentationslink til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Opdaterede den nutidige "current MCP specification" reference og linket til yderligere ressourcer til 2025-11-25 (historiske SSE-fasthenvisninger bevaret for nøjagtighed)

#### Eksempelvalidering mod nuværende SDK'er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` bestod uden typefejl — eksisterende `McpServer`/`StdioServerTransport` API'er forbliver gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Valideret i et isoleret `.venv` med `mcp[cli]` (1.27.2); `py_compile` bestod og `FastMCP.list_tools()` returnerede korrekt værktøjerne `add` og `subtract`
- Bekræftet at alle sample `@modelcontextprotocol/sdk` versionsområder (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løser sig rent til aktuelle `1.29.0` uden API-brydende ændringer

#### Afhængighedspindestyring (lukning af versionshuller)

Opgraderede forældede SDK-pins, så hver sample følger den aktuelle MCP-udgivelse, i overensstemmelse med repo-konventionen:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Opgraderede `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og opdaterede den forældede `"updated for MCP 2025-06-18"` pakke-beskrivelse til `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Opgraderede den eksakte pin `mcp==1.23.0` → `mcp>=1.26.0`; regenererede begge `uv.lock` filer (`uv lock`) så lockfilerne løser til aktuelle `mcp 1.27.2` og forbliver synkroniseret med manifestene

#### Pensum Gap-analyse — Seneste Spec Funktionsdækning

Bekræftede, at pensummet allerede dækker alle primitive introduceret/udvidet i MCP 2025-11-25, så ingen indholdsgab er tilbage:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-tilstand)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumenteret i 00-Introduction, 01-CoreConcepts, og 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentelle, langvarige operationer)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhedshærdning & Afhjælpning af Afhængighedssårbarheder

Kørte en fuld sikkerhedsgennemgang af alle afhængighedsmanifester og sample kildekode, og afhjalp alle rapporterede npm advisoryer og en kodefejl. Efter rettelser rapporterer `npm audit` **0 sårbarheder** i alle reviderede mapper.

#### npm Afhængighedssårbarheder (transitive) — Rettet

Reviderede alle 15 indleverede `package-lock.json` filer. Sårbarheder var begrænset til transitive afhængigheder, som blev hentet af MCP Inspector udviklingsværktøjet, OpenAI klienten og MCP SDK; alle er nu løst uden at ødelægge samples:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Opgraderede `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), hvilket fjernede de bundtede advisoryer til `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws`. Tilføjede en npm `overrides`-post, der tvinger patched `shell-quote@1.8.4` for at eliminere den resterende kritiske advisory båret af `concurrently`; regenererede begge lockfiler (nu 0 sårbarheder)
- **03-GettingStarted/samples/typescript**: `npm audit fix` opgraderede den transitive `qs` (moderat) til en patched version
- **03-GettingStarted/samples/javascript**: `npm audit fix` opgraderede den transitive `hono` (moderat) til en patched version
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` opgraderede den transitive `form-data` (høj) til en patched version
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererede den manglende `package-lock.json`, så projektet er reproducerbart og reviderbart (0 sårbarheder)

#### Kode-Sikkerhedsrettelse (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernede `shell=True` fra `open_in_vscode` værktøjet. Den tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillod shell-metategn i et mappesti at blive fortolket af `cmd.exe` (kommando-injektionsvektor). Det lancerer nu den resolvede `Code.exe` direkte med mappen som argument — uden shell — hvilket er funktionelt ækvivalent og sikkert

#### Python Afhængighedsrevision

- Reviderede alle Python requirements sæt med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterede **ingen kendte sårbarheder** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` versionsområder løser til aktuelle patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` fandt den transitive afhængighed **`werkzeug` 3.1.1** med tre `safe_join` Windows-enhedsnavn DoS advisoryer — `CVE-2025-66221`, `CVE-2026-21860` og `CVE-2026-27199` (alle rettet i 3.1.6). Tilføjede et eksplicit sikkerheds-pin `werkzeug>=3.1.6`, så den patched release bliver løst; verificerede at constraint løser rent med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnavn Rebranding

Opdaterede alt pensumindhold for at afspejle Microsofts produktrebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Opdaterede Discord fællesskabslink
- **AGENTS.md**: Opdaterede reference til Discord-server
- **README.md**: Opdaterede teknologiøkosystem-referencer
- **study_guide.md**: Opdaterede case study-referencer
- **05-AdvancedTopics/README.md**: Opdaterede titel og beskrivelse for modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Opdaterede afsnitsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fuldt modul titel- og indholdsopdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Opdaterede krydsreference-link
- **07-LessonsfromEarlyAdoption/README.md**: Opdaterede case study-referencer
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Opdaterede afsnit 9 overskrift, badges og kapabiliteter
- **08-BestPractices/README.md**: Opdaterede Discord fællesskabslink
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Opdaterede Discord kanals reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Opdaterede model deployment reference
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Opdaterede AI Services tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Opdaterede ressource-referencer

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Opdaterede hovedpensumreferencer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Opdaterede modultitel, oversigt og alle moduloverskrifter
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Opdaterede titel, læringsmål, opsætningsinstruktioner og ressourcer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Opdaterede titel, læringsmål, MCP hosts tabel og krydsreferencer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Opdaterede titel, badges, forudsætninger og ressourcer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Opdaterede Agent Builder referencer og feedback-link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Opdaterede forudsætninger og extensionsreferencer

---

## 11. april 2026

### Ny lektion, dokumentationsrettelser og opdateringer af afhængigheder

#### Nyt pensumindhold tilføjet

**Modul 05 - Avancerede emner**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattende vejledning omhandlende den modstridende debatmodel for multi-agent systemer
  - Mermaid arkitekturdiagram: to agenter → delt MCP server → debattranskript → dommer → afgørelse
  - Delt MCP værktøjsserver (`web_search` + `run_python`) implementeret i Python og TypeScript
  - Modstridende systemprompter (FOR / IMOD / Dommer) med eksplicitte krav til værktøjsbrug
  - Debat-orkestrator i Python, TypeScript og C# som styrer runder og ruter argumenter
  - MCP `ClientSession` kobling for orkestratoren til reelle værktøjskald
  - Use-case tabel (hallucinationsdetektion, trusselsmodellering, API design review, faktuel verifikation, teknologiudvælgelse)
  - Sikkerhedsovervejelser: sandkasse-udførelse, validering af værktøjskald, ratebegrænsning, revisionslogning
  - Struktureret øvelse med tre praktiske scenarier (kodegennemgang, arkitekturbeslutning, indholdsmæssig moderation)

#### Dokumentationsrettelser

**Modul 03 - Kom godt i gang**
- **05-stdio-server/README.md**: Rettede ufuldstændigt TypeScript stdio-server eksempel — tilføjede manglende transport-instansiering (`new StdioServerTransport()`) og `server.connect(transport)` opkald for at matche Python og .NET eksemplerne i samme afsnit
- **14-sampling/README.md**: Rettede tastefejl — korrigerede `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Pensumopdateringer

**Hoved README.md**
- Tilføjede post 5.17 (Adversarial Multi-Agent Reasoning med MCP) til pensumtabellen med et direkte link til den nye lektion

**05-AdvancedTopics/README.md**
- Tilføjede række for Lektion 5.17 i lektionstabellen

**study_guide.md**
- Tilføjede emnet Adversarial Multi-Agent Reasoning til tankekort og beskrivende tekst om Avancerede emner

#### Kode- og sikkerhedsrettelser

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Sikkerhedsrettelse — kommando-injektion**: Udskiftede `execSync` shell-interpolation med `execFile` + `promisify` i TypeScript `run_python` værktøjet, hvilket eliminerer kommando-injektionsfladen (LLM-styret kode sendes nu som et litteralt argv-element uden shell involvering)
- **MCP værktøjsloop ledningsføring**: Opdaterede Python debatorkestratoren til at bruge `AsyncAnthropic` klienten (erstatte blokerende synkron `Anthropic`), sende en live `ClientSession` direkte til hver agentomgang, hente værktøjsdefinitioner via `session.list_tools()` hver omgang og sende `tool_use` blokke via `session.call_tool()` i en løkke, indtil modellen udsender et endeligt tekstsvar

#### Opdateringer af afhængigheder

- Opgraderede `hono` til 4.12.12 på tværs af flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Opgraderede `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker
- Opgraderede `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows lab 3 og 4)
- Opgraderede `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspektør

#### Oversættelser

- Synkroniserede oversættelser for 48+ sprog med de seneste kildeændringer (i18n opdatering)

---

## 5. februar 2026

### Repository-dækkende validerings- og navigationsforbedringer

#### Nyt curriculumindhold tilføjet

**Modul 03 - Kom godt i gang**
- **12-mcp-hosts/README.md**: Ny omfattende guide til opsætning af MCP hosts
  - Konfigurationseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfiguration skabeloner til alle hovedhosts
  - Sammenligningstabel for transporttyper (stdio, SSE/HTTP, WebSocket)
  - Fejlfinding af almindelige forbindelsesproblemer
  - Sikkerhedspraksis for hostkonfiguration

- **13-mcp-inspector/README.md**: Ny debug-guide til MCP Inspector
  - Installationsmetoder (npx, npm global, fra kilde)
  - Forbindelse til servere via stdio og HTTP/SSE
  - Testværktøjer, ressourcer og prompt workflows
  - VS Code integration med MCP Inspector
  - Almindelige debugging scenarier med løsninger

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny guide til implementering af paginering
  - Cursor-baserede pagineringsmønstre i Python, TypeScript, Java
  - Client-side håndtering af paginering
  - Cursor designstrategier (opaque vs. struktureret)
  - Anbefalinger til performanceoptimering

**Modul 05 - Avancerede emner**
- **mcp-protocol-features/README.md**: Ny dybdegående gennemgang af protokolfunktioner
  - Implementering af notifikationer om fremdrift
  - Mønstre for aflysning af forespørgsler
  - Ressource skabeloner med URI-mønstre
  - Server lifecycle management
  - Kontrol af logniveauer
  - Fejlhåndteringsmønstre med JSON-RPC koder

#### Navigationsrettelser (24+ filer opdateret)

**Hovedmodul README-filer**
 Nu linker til både første lektion OG næste modul

**02-Sikkerheds underfiler**
- Alle 5 supplerende sikkerhedsdokumenter har nu "Hvad så?" navigation:

**09-CaseStudy filer**
- Alle case study filer har nu sekventiel navigation:

**10-StreamliningAI lab**
Tilføjede "Hvad så?" sektion til Modul 10 oversigt og Modul 11

#### Kode- og indholdsrettelser

**SDK og afhængighedsopdateringer**
Rettede tom openai version til `^4.95.0`
Opdaterede SDK fra `^1.8.0` til `>=1.26.0`
Opdaterede mcp versionsfikser til `>=1.26.0`

**Kode rettelser**
Rettede ugyldigt modelnavn `gpt-4o-mini` til `gpt-4.1-mini`

**Indholdsrettelser**
Rettede ødelagt link `READMEmd` → `README.md`, rettede curriculum header `Module 1-3` → `Module 0-3`, rettede case-sensitive sti
Fjernede korrumperet duplikeret indhold i Case Study 5

**Begynderguidance forbedringer**
Tilføjede korrekt introduktion, læringsmål og forudsætninger for begyndere

#### Curriculumopdateringer

**Hoved README.md**
- Tilføjede poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protokolfunktioner) til curriculumtabel

**Modul README-filer**
Tilføjede lektioner 12 og 13 til lektionsliste
Tilføjede Praktiske Guider sektion med pagineringslink
Tilføjede lektioner 5.15 (Custom Transport) og 5.16 (Protokolfunktioner)

**study_guide.md**
- Opdaterede mindmap med alle nye emner: MCP Hosts opsætning, MCP Inspector, Paginering strategier, Protokolfunktioner dybdegående

## 28. januar 2026

### MCP Specification 2025-11-25 Overholdelsesgennemgang

#### Kernemæssige konceptforbedringer (01-CoreConcepts/)
- **Nyt klient-primitiv - Roots**: Tilføjet omfattende dokumentation om Roots klient-primitivet, som gør det muligt for servere at forstå filsystemgrænser og adgangstilladelser
- **Værktøjsannoteringer**: Tilføjet dokumentation om værktøjsadfærdsannoteringer (`readOnlyHint`, `destructiveHint`) for bedre beslutninger om værktøjsudførelse
- **Værktøjskald i Sampling**: Opdateret Sampling dokumentation til at inkludere `tools` og `toolChoice` parametre til model-drevet værktøjskald under sampling-forespørgsler
- **URL Mode Elicitation**: Tilføjet dokumentation om URL-baseret elicitation til serverinitierede eksterne web-interaktioner
- **Tasks (Eksperimentelt)**: Tilføjet ny sektion, der dokumenterer det eksperimentelle Tasks feature til holdbar udførelsesomslag og udskudt resultatindhentning
- **Ikonunderstøttelse**: Noteret at værktøjer, ressourcer, resource skabeloner og prompts nu kan inkludere ikoner som yderligere metadata

#### Dokumentationsopdateringer
- **README.md**: Tilføjet MCP Specification 2025-11-25 versionsreference og forklaring af datobaseret versionering
- **study_guide.md**: Opdateret curriculumkort til at inkludere Tasks og Tool Annotations i Core Concepts sektionen; opdateret dokumentets tidsstempel

#### Overholdelsesverifikation for specifikation
- **Protokolversion**: Bekræftet at al dokumentation refererer til gældende MCP Specification 2025-11-25
- **Arkitekturtilpasning**: Bekræftet nøjagtighed af to-lags arkitektur (Data Layer + Transport Layer) dokumentation
- **Primitiver dokumentation**: Valideret serverprimitiver (Ressourcer, Prompts, Værktøjer) og klientprimitiver (Sampling, Elicitation, Logging, Roots)
- **Transportmekanismer**: Verificeret STDIO og Streamable HTTP transportdokumentation
- **Sikkerhedsanvisninger**: Bekræftet overensstemmelse med gældende MCP Security Best Practices dokumentation

#### Vigtige MCP 2025-11-25 funktioner dokumenteret
- **OpenID Connect Discovery**: Auth server discovery via OIDC
- **OAuth Client ID Metadata-dokumenter**: Anbefalet klientregistreringsmekanisme
- **JSON Schema 2020-12**: Standard dialekt for MCP schemaspecifikationer
- **SDK Tiering System**: Formaliserede krav til SDK funktionsunderstøttelse og vedligeholdelse
- **Governance Struktur**: Formaliserede arbejdsgrupper og interessegrupper i MCP governance

### Større sikkerhedsdokumentationsopdatering (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integration
- **Nye hands-on træningsressourcer**: Tilføjet omfattende integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i hele sikkerhedsdokumentationen
- **Ekspeditionsrute dækning**: Dokumenteret komplet camp-til-camp progression fra Base Camp til Summit
- **OWASP Tilpasning**: Al sikkerhedsanvisning er nu knyttet til OWASP MCP Azure Security Guide risici

#### OWASP MCP Top 10 integration
- **Ny sektion**: Tilføjet OWASP MCP Top 10 sikkerhedsrisikotabel med Azure-mitigeringer til hovedsikkerheds-README
- **Risikobaseret dokumentation**: Opdateret mcp-security-controls-2025.md med OWASP MCP risikoreferencer for hver sikkerhedsdomain
- **Referencearkitektur**: Linket til OWASP MCP Azure Security Guide referencearkitektur og implementeringsmønstre

#### Opdaterede sikkerhedsfiler
- **README.md**: Tilføjet Sherpa Workshop oversigt, ekspeditionsrutetabel, OWASP MCP Top 10 risikosammendrag og hands-on træningssektion
- **mcp-security-controls-2025.md**: Opdateret header til februar 2026, tilføjet OWASP risikoreferencer (MCP01-MCP08), rettet specifikationsversionsinkonsistens
- **mcp-security-best-practices-2025.md**: Tilføjet Sherpa og OWASP ressourcer sektion, opdateret tidsstempel
- **mcp-best-practices.md**: Tilføjet hands-on træningssektion med Sherpa og OWASP links
- **azure-content-safety-implementation.md**: Tilføjet OWASP MCP06 reference, Sherpa Camp 3 tilpasning, og ekstra ressourcer sektion

#### Nye ressourcelinks tilføjet
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP risikosider (MCP01-MCP10)

### Curriculum-dækkende MCP Specification 2025-11-25 tilpasning

#### Modul 03 - Kom godt i gang
- **SDK dokumentation**: Tilføjet Go SDK til den officielle SDK-liste; opdateret alle SDK referencer til MCP Specification 2025-11-25
- **Transportklargørelse**: Opdateret beskrivelser af STDIO og HTTP Streaming transport med eksplicitte specifikationsreferencer

#### Modul 04 - Praktisk implementering
- **SDK opdateringer**: Tilføjet Go SDK; opdateret SDK-liste med specifikationsversionsreference
- **Autorisation spec**: Opdateret MCP autorisationsspecifikationslink til nuværende 2025-11-25 version

#### Modul 05 - Avancerede emner
- **Nye funktioner**: Tilføjet note om nye MCP Specification 2025-11-25 funktioner (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop links til yderligere referencer

#### Modul 06 - Community bidrag
- **SDK-liste**: Tilføjet Swift og Rust SDK’er; opdateret specifikationslink til 2025-11-25
- **Spec reference**: Opdateret MCP Specification link til direkte specifikations-URL

#### Modul 07 - Læringer fra tidlig adoption
- **Ressourceopdateringer**: Tilføjet MCP Specification 2025-11-25 link og OWASP MCP Top 10 til yderligere ressourcer

#### Modul 08 - Bedste praksis
- **Spec versionsopdatering**: Opdateret MCP Specification reference til 2025-11-25
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop til yderligere referencer

#### Modul 10 - Effektivisering af AI Workflows
- **Badge opdatering**: Ændret MCP versionsbadge fra SDK version (1.9.3) til specifikationsversion (2025-11-25)
- **Ressourcelinks**: Opdateret MCP Specification link; tilføjet OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spec reference**: Opdateret MCP Specification link til 2025-11-25 version
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 til officielle ressourcer

## 18. december 2025

### Opdatering af sikkerhedsdokumentation - MCP Specification 2025-11-25

#### MCP sikkerhed bedste praksis (02-Security/mcp-best-practices.md) - versionsopdatering
- **Protokolversionsopdatering**: Opdateret til at referere til seneste MCP Specification 2025-11-25 (udgivet 25. november 2025)
  - Opdateret alle specifikationsversionsreferencer fra 2025-06-18 til 2025-11-25
  - Opdateret dokumentdato fra 18. august 2025 til 18. december 2025
  - Verificeret at alle specifikations-URL’er peger på aktuel dokumentation
- **Indholdsvalidering**: Omfattende validering af sikkerhedsbedste praksis i forhold til de seneste standarder
  - **Microsoft sikkerhedsløsninger**: Verificeret aktuelt sprogbrug og links for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, og Azure Key Vault
  - **OAuth 2.1 sikkerhed**: Bekræftet tilpasning til seneste OAuth sikkerhedsbedste praksis
  - **OWASP standarder**: Valideret at OWASP Top 10 for LLM’er referencer er opdaterede
  - **Azure services**: Verificeret alle Microsoft Azure dokumentationslinks og bedste praksis
- **Standardtilpasning**: Alle refererede sikkerhedsstandarder bekræftet aktuelle
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerheds- og compliance-rammer
- **Implementeringsressourcer**: Valideret alle implementeringsvejledninger og ressource-links
  - Azure API Management autentificeringsmønstre
  - Microsoft Entra ID integrationsvejledninger
  - Azure Key Vault secrets management
  - DevSecOps pipelines og overvågningsløsninger

### Dokumentationskvalitetssikring
- **Specifikationsoverholdelse**: Sikret at alle obligatoriske MCP sikkerhedskrav (MUST/MUST NOT) stemmer overens med seneste specifikation
- **Ressourceaktualitet**: Verificeret at alle eksterne links til Microsoft dokumentation, sikkerhedsstandarder og implementeringsvejledninger er aktuelle
- **Dækning af bedste praksis**: Bekræftet omfattende dækning af autentificering, autorisation, AI-specifikke trusler, supply chain sikkerhed og virksomhedsrelaterede mønstre

## 6. oktober 2025

### Udvidelse af kom godt i gang sektion – Avanceret serverbrug & Enkel autentificering

#### Avanceret serverbrug (03-GettingStarted/10-advanced)
- **Nyt kapitel tilføjet**: Introduceret en omfattende guide til avanceret MCP serverbrug, der dækker både almindelige og lavniveau serverarkitekturer.
  - **Almindelig vs. lavniveau server**: Detaljeret sammenligning og kodeeksempler i Python og TypeScript for begge tilgange.
  - **Handler-baseret design**: Forklaring af handler-baseret værktøj/ressource/prompt management for skalerbare, fleksible serverimplementeringer.
  - **Praktiske mønstre**: Virkelige scenarier, hvor lavniveau servermønstre er fordelagtige til avancerede features og arkitektur.
#### Simpel Godkendelse (03-GettingStarted/11-simple-auth)
- **Nyt Kapitel Tilføjet**: Trin-for-trin vejledning til implementering af simpel godkendelse i MCP-servere.  
  - **Godkendelseskoncepter**: Klar forklaring af godkendelse vs. autorisation og håndtering af legitimationsoplysninger.  
  - **Grundlæggende Godkendelsesimplementering**: Middleware-baserede godkendelsesmønstre i Python (Starlette) og TypeScript (Express) med kodeeksempler.  
  - **Overgang til Avanceret Sikkerhed**: Vejledning til at starte med simpel godkendelse og avancere til OAuth 2.1 og RBAC, med henvisninger til avancerede sikkerhedsmoduler.

Disse tilføjelser giver praktisk, hands-on vejledning til at bygge mere robuste, sikre og fleksible MCP-serverimplementeringer, som forbinder grundlæggende koncepter med avancerede produktionsmønstre.

## 29. september 2025

### MCP Server Database Integrationslaboratorier – Omfattende Praktisk Læringssti

#### 11-MCPServerHandsOnLabs – Nyt komplet databaseintegrationspensum 
- **Komplet 13-Lab læringssti**: Tilføjet omfattende praktisk pensum til opbygning af produktionsklare MCP-servere med PostgreSQL databaseintegration  
  - **Virkelighedsnær implementering**: Zava Retail-analysebrugssag der demonstrerer virksomhedsniveau mønstre  
  - **Struktureret læringsforløb**:  
    - **Lab 00-03: Grundlag** – Introduktion, kernearkitektur, sikkerhed & multi-tenancy, miljøopsætning  
    - **Lab 04-06: Opbygning af MCP-serveren** – Databasedesign & skema, MCP-serverimplementering, værktøjsudvikling  
    - **Lab 07-09: Avancerede funktioner** – Semantisk søgeintegration, test & fejlfinding, VS Code-integration  
    - **Lab 10-12: Produktion & bedste praksis** – Udrulningsstrategier, overvågning & observabilitet, bedste praksis & optimering  
  - **Virksomhedsteknologier**: FastMCP-framework, PostgreSQL med pgvector, Azure OpenAI-embedding, Azure Container Apps, Application Insights  
  - **Avancerede funktioner**: Row Level Security (RLS), semantisk søgning, multi-tenant dataadgang, vektorembedding, realtidsmonitorering

#### Terminologistandardisering – Modul til Lab-konvertering  
- **Omfattende dokumentationsopdatering**: Systematisk opdatering af alle README-filer i 11-MCPServerHandsOnLabs til at anvende "Lab"-terminologi i stedet for "Modul"  
  - **Afsnitsoverskrifter**: Opdateret "What This Module Covers" til "What This Lab Covers" i alle 13 laboratorier  
  - **Indholdsbeschrivelse**: Skiftet "This module provides..." til "This lab provides..." gennem dokumenterne  
  - **Læringsmål**: Opdateret "By the end of this module..." til "By the end of this lab..."  
  - **Navigationlinks**: Konverteret alle "Module XX:" henvisninger til "Lab XX:" i krydshenvisninger og navigation  
  - **Færdiggørelsessporing**: Opdateret "After completing this module..." til "After completing this lab..."  
  - **Bevarede tekniske referencer**: Opretholdt Python modulreferencer i konfigurationsfiler (fx `"module": "mcp_server.main"`)

#### Studieguideforbedring (study_guide.md)  
- **Visuelt pensumkort**: Tilføjet nyt afsnit "11. Database Integration Labs" med omfattende visualisering af lab-struktur  
- **Repositorystruktur**: Opdateret fra ti til elleve hovedafsnit med detaljeret beskrivelse af 11-MCPServerHandsOnLabs  
- **Vejledning til læringssti**: Forbedret navigation til at dække afsnit 00-11  
- **Teknologidækning**: Tilføjet detaljer om FastMCP, PostgreSQL, Azure-services integration  
- **Læringsresultater**: Fremhævet udvikling af produktionsklare servere, databaseintegrationsmønstre og virksomhedssikkerhed

#### Strukturforbedring i hoved-README  
- **Lab-baseret terminologi**: Opdateret hoved-README.md i 11-MCPServerHandsOnLabs til konsekvent brug af "Lab"-struktur  
- **Læringssti-organisering**: Klar progression fra grundlæggende koncepter over avanceret implementering til produktionsudrulning  
- **Virkelighedsfokus**: Betonede praktisk, hands-on læring med virksomhedsniveau mønstre og teknologier

### Dokumentationskvalitet & Konsistensforbedringer  
- **Hands-on læringsfokus**: Forstærket praktisk, lab-baseret tilgang gennem hele dokumentationen  
- **Virksomhedsmønsterfokus**: Fremhævet produktionsklare implementeringer og virksomhedssikkerhedsovervejelser  
- **Teknologiintegration**: Omfattende dækning af moderne Azure-services og AI-integrationsmønstre  
- **Læringsprogression**: Klar, struktureret vej fra grundlæggende koncepter til produktionsudrulning

## 26. september 2025

### Case Studies-forbedring – GitHub MCP Registry-integration

#### Case Studies (09-CaseStudy/) – Fokus på økosystemudvikling  
- **README.md**: Større udvidelse med omfattende GitHub MCP Registry case study  
  - **GitHub MCP Registry Case Study**: Ny omfattende case study der undersøger GitHub’s MCP Registry-lancering i september 2025  
    - **Problemets analyse**: Detaljeret gennemgang af fragmenteret MCP-server-registrering og udrulningsudfordringer  
    - **Løsningsarkitektur**: GitHubs centraliserede registry-tilgang med ét-klik VS Code installation  
    - **Forretningspåvirkning**: Målbare forbedringer i onboarding og udviklerproduktivitet  
    - **Strategisk værdi**: Fokus på modulær agentudrulning og tværværktøjs interoperabilitet  
    - **Økosystemudvikling**: Positionering som fundamentalt platform for agentintegrering  
  - **Forbedret case study-struktur**: Opdateret alle syv case studies med ensartet formatering og omfattende beskrivelser  
    - Azure AI Travel Agents: Fleragent orkestreringsfokus  
    - Azure DevOps Integration: Workflow-automatiseringernes fokus  
    - Real-time dokumenthentning: Python konsolklientimplementering  
    - Interaktiv studieplansgenerator: Chainlit konversationswebapp  
    - In-editor dokumentation: VS Code og GitHub Copilot integration  
    - Azure API Management: Virksomheds-API integrationsmønstre  
    - GitHub MCP Registry: Økosystemudvikling og community-platform  
  - **Omfattende konklusion**: Omskrevet konklusionsafsnit der fremhæver syv case studies på tværs af MCP implementeringsdimensioner  
    - Virksomhedsintegration, multi-agent orkestrering, udviklerproduktivitet  
    - Økosystemudvikling, uddannelsesmæssige applikationer kategorisering  
    - Forbedret indsigt i arkitekturmodeller, implementeringsstrategier og bedste praksis  
    - Betoning af MCP som moden, produktionsklar protokol

#### Studieguideopdateringer (study_guide.md)  
- **Visuelt pensumkort**: Opdateret mindmap til at inkludere GitHub MCP Registry i Case Studies-sektionen  
- **Case Studies-beskrivelse**: Udvidet fra generiske beskrivelser til detaljeret gennemgang af syv omfattende case studies  
- **Repositorystruktur**: Opdateret afsnit 10 til at afspejle omfattende case study-dækning med specifikke implementeringsdetaljer  
- **Changelog Integration**: Tilføjet 26. september 2025 post med dokumentation af GitHub MCP Registry-tilføjelse og case study-forbedringer  
- **Datoopdatering**: Opdateret footertidsstempel til at afspejle nyeste revision (26. september 2025)

### Dokumentationskvalitetsforbedringer  
- **Konsistensforbedring**: Standardiseret case study-formatering og struktur på tværs af alle syv eksempler  
- **Omfattende dækning**: Case studies omfatter nu virksomhed, udviklerproduktivitet og økosystemudviklingsscenarier  
- **Strategisk positionering**: Forbedret fokus på MCP som grundlæggende platform til agentbaseret systemudrulning  
- **Ressourceintegration**: Opdaterede yderligere ressourcer til at inkludere GitHub MCP Registry-link

## 15. september 2025

### Avancerede Emner Udvidelse – Tilpassede Transports & Kontekst Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) – Ny avanceret implementationsguide  
- **README.md**: Komplets implementeringsguide for tilpassede MCP transportmekanismer  
  - **Azure Event Grid Transport**: Omfattende serverløs, eventdrevet transportimplementering  
    - C#, TypeScript og Python eksempler med Azure Functions-integration  
    - Eventdrevet arkitekturmodeller for skalerbare MCP-løsninger  
    - Webhook-modtagere og push-baseret meddelelseshåndtering  
  - **Azure Event Hubs Transport**: Højgennemstrømnings streaming transportimplementering  
    - Realtids streaming kapaciteter for lav-latens scenarier  
    - Partitioneringsstrategier og checkpoint management  
    - Meddelelsesbatch og performanceoptimering  
  - **Virksomhedsintegrationsmønstre**: Produktionsklare arkitektureksempler  
    - Distribueret MCP-behandling på tværs af flere Azure Functions  
    - Hybrid transportarkitekturer der kombinerer flere transporttyper  
    - Meddelelsesdokumentering, pålidelighed og fejlhåndteringsstrategier  
  - **Sikkerhed & Overvågning**: Azure Key Vault integration og observabilitetsmønstre  
    - Managed identity-godkendelse og mindst privilegeret adgang  
    - Application Insights telemetri og performanceovervågning  
    - Kredsløbsafbrydere og fejltolerancemønstre  
  - **Test Frameworks**: Omfattende teststrategier for tilpassede transports  
    - Enhedstest med dobbelte og mocking frameworks  
    - Integrationstest med Azure Test Containers  
    - Performance- og belastningstest overvejelser

#### Kontekst Engineering (05-AdvancedTopics/mcp-contextengineering/) – Fremvoksende AI disciplin  
- **README.md**: Omfattende gennemgang af kontekst engineering som et fremvoksende felt  
  - **Kerneprincipper**: Kompletdeling af kontekst, handlingsbeslutningsbevidsthed og kontekstvinduestyring  
  - **MCP protokoltilpasning**: Hvordan MCP design adresserer kontekst engineering-udfordringer  
    - Begrænsninger i kontekstvindue og progressive load-strategier  
    - Relevansbestemmelse og dynamisk kontekstfremskaffelse  
    - Multi-modal konteksthåndtering og sikkerhedsovervejelser  
  - **Implementeringstilgange**: Single-threaded vs. multi-agent arkitekturer  
    - Kontextudstykning og prioriteringsteknikker  
    - Progressiv kontekstindlæsning og komprimeringsstrategier  
    - Lagdelte konteksttilgange og optimering af fremskaffelse  
  - **Målerammeværk**: Fremvoksende metrikker til evaluering af konteksteffektivitet  
    - Inputeffektivitet, performance, kvalitet og brugeroplevelsesovervejelser  
    - Eksperimentelle tilgange til kontekstoptimering  
    - Fejl-analyse og forbedringsmetodik

#### Pensumnavigation Opdateringer (README.md)  
- **Forbedret modulstruktur**: Opdateret curriculum-tabel til at inkludere nye avancerede emner  
  - Tilføjet Context Engineering (5.14) og Custom Transport (5.15)  
  - Ensartet formatering og navigationslinks på tværs af alle moduler  
  - Opdaterede beskrivelser til at afspejle aktuelt indholdsomfang

### Katalogstrukturforbedringer  
- **Navnestandardisering**: Omdøbte "mcp transport" til "mcp-transport" for konsistens med andre avancerede emner-mapper  
- **Indholdsorganisation**: Alle 05-AdvancedTopics mapper følger nu ensartet navngivningsmønster (mcp-[topic])

### Dokumentationskvalitetsforbedringer  
- **MCP-specifikationsjustering**: Alt nyt indhold refererer til nuværende MCP Specification 2025-06-18  
- **Multi-sprogseksempler**: Omfattende kodeeksempler i C#, TypeScript og Python  
- **Virksomhedsfokus**: Produktionsklare mønstre og Azure cloud-integration gennemgående  
- **Visuel dokumentation**: Mermaid-diagrammer til arkitektur- og flowvisualisering

## 18. august 2025

### Omfattende Dokumentationsopdatering – MCP 2025-06-18 Standarder

#### MCP Sikkerhed Bedste Praksis (02-Security/) – Komplett modernisering  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Total omskrivning tilpasset MCP Specification 2025-06-18  
  - **Obligatoriske krav**: Tilføjet eksplicitte SKAL/MÅ IKKE krav fra officiel specifikation med klare visuelle indikatorer  
  - **12 kerne sikkerhedspraksisser**: Omstruktureret fra 15-punktsliste til omfattende sikkerhedsområder  
    - Tokensikkerhed & godkendelse med ekstern identitetsudbyderintegration  
    - Sessionsstyring & transporstsikkerhed med kryptografiske krav  
    - AI-specifik trusselsbeskyttelse med Microsoft Prompt Shields integration  
    - Adgangskontrol & tilladelser med mindst privilegium-princippet  
    - Indholdssikkerhed & overvågning med Azure Content Safety integration  
    - Forsyningskædesikkerhed med omfattende komponentverifikation  
    - OAuth-sikkerhed & Confused Deputy-forebyggelse med PKCE-implementering  
    - Incidentrespons & genopretning med automatiserede muligheder  
    - Compliance & governance med regulatorisk tilpasning  
    - Avancerede sikkerhedskontroller med zero trust-arkitektur  
    - Microsoft sikkerhedsøkosystem integration med omfattende løsninger  
    - Kontinuerlig sikkerhedsudvikling med adaptive praksisser  
  - **Microsoft sikkerhedsløsninger**: Forbedret integrationsvejledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security  
  - **Implementeringsressourcer**: Kategoriserede omfattende ressourcelinks efter Officiel MCP Dokumentation, Microsoft sikkerhedsløsninger, sikkerhedsstandarder og implementationsguider

#### Avancerede Sikkerhedskontroller (02-Security/) – Virksomhedsimplementering  
- **MCP-SECURITY-CONTROLS-2025.md**: Total gennemgang med virksomheds-klart sikkerhedsrammeværk  
  - **9 omfattende sikkerhedsområder**: Udvidet fra grundlæggende kontroller til detaljeret virksomhedsrammeværk  
    - Avanceret godkendelse & autorisation med Microsoft Entra ID integration  
    - Tokensikkerhed & anti-passthrough-kontroller med omfattende validering  
    - Sessionssikkerhedskontroller med kapring-forebyggelse  
    - AI-specifikke sikkerhedskontroller med prompt injection og tool poisoning-forebyggelse  
    - Confused Deputy-angrebsforebyggelse med OAuth proxy-sikkerhed  
    - Værktøjseksekveringssikkerhed med sandboxing og isolation  
    - Forsyningskædesikkerhedskontroller med afhængighedsverifikation  
    - Overvågnings- & detektionskontroller med SIEM-integration  
    - Incidentrespons & genopretning med automatiserede muligheder  
  - **Implementeringseksempler**: Tilføjet detaljerede YAML-konfigurationsblokke og kodeeksempler  
  - **Microsoft løsninger integration**: Omfattende dækning af Azure sikkerhedstjenester, GitHub Advanced Security og virksomhedsidentitetsstyring

#### Avancerede Emner Sikkerhed (05-AdvancedTopics/mcp-security/) – Produktionsklar Implementering  
- **README.md**: Total omskrivning for virksomheds-sikkerhedsimplementering  
  - **Aktuel specifikationsjustering**: Opdateret til MCP Specification 2025-06-18 med obligatoriske sikkerhedskrav  
  - **Forbedret godkendelse**: Microsoft Entra ID-integration med omfattende .NET og Java Spring Security eksempler  
  - **AI-sikkerhedsintegration**: Microsoft Prompt Shields og Azure Content Safety-implementering med detaljerede Python-eksempler  
  - **Avanceret trusselsafværgelse**: Omfattende implementeringseksempler på  
    - Confused Deputy-angrebsforebyggelse med PKCE og brugerconsent-validering  
    - Token Passthrough-forebyggelse med audience-validering og sikker tokenstyring  
    - Sessionkapringsforebyggelse med kryptografisk binding og adfærdsanalyse  
  - **Virksomhedssikkerhedsintegration**: Azure Application Insights-overvågning, trusseldetektionspipelines og forsyningskædesikkerhed  
  - **Implementeringscheckliste**: Klar oversigt over obligatoriske vs. anbefalede sikkerhedskontroller med Microsoft sikkerhedsøkosystemfordele

### Dokumentationskvalitet & Standardtilpasning
- **Specifikationsreferencer**: Opdateret alle referencer til nuværende MCP-specifikation 2025-06-18
- **Microsoft Security-økosystem**: Forbedret integrationsvejledning i hele sikkerhedsdokumentationen
- **Praktisk Implementering**: Tilføjet detaljerede kodeeksempler i .NET, Java og Python med enterprise-mønstre
- **Ressourceorganisering**: Omfattende kategorisering af officiel dokumentation, sikkerhedsstandarder og implementeringsvejledninger
- **Visuelle Indikatorer**: Klar markering af obligatoriske krav versus anbefalede praksisser


#### Grundlæggende Begreber (01-CoreConcepts/) - Fuld Modernisering
- **Protokolversionsopdatering**: Opdateret til at referere til nuværende MCP-specifikation 2025-06-18 med datobaseret versionskontrol (YYYY-MM-DD format)
- **Arkitekturforfining**: Forbedrede beskrivelser af Hosts, Klienter og Servere for at afspejle aktuelle MCP-arkitektur mønstre
  - Hosts er nu klart defineret som AI-applikationer, der koordinerer flere MCP-klientforbindelser
  - Klienter beskrevet som protokolforbindere, der opretholder en-til-en serverrelationer
  - Servere forbedret med lokale vs. fjernudrulningsscenarier
- **Primitiv Omstrukturering**: Fuldstændig revision af server- og klientprimitiver
  - Serverprimitiver: Ressourcer (datakilder), Prompter (skabeloner), Værktøjer (eksekverbare funktioner) med detaljerede forklaringer og eksempler
  - Klientprimitiver: Sampling (LLM-fuldførelser), Elicitering (brugerinput), Logging (debugging/overvågning)
  - Opdateret med aktuelle opdagelses- (`*/list`), hentnings- (`*/get`) og eksekverings- (`*/call`) metodemønstre
- **Protokolarkitektur**: Introduceret to-lags arkitekturmodel
  - Data-lag: JSON-RPC 2.0 fundament med livscyklushåndtering og primitiver
  - Transport-lag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer
- **Sikkerhedsramme**: Omfattende sikkerhedsprincipper inklusiv eksplicit bruger samtykke, databeskyttelse, sikker eksekvering af værktøjer og transportsikkerhed
- **Kommunikationsmønstre**: Opdaterede protokolmeddelelser til at vise initialisering, opdagelse, eksekvering og notifikationsflows
- **Kodeeksempler**: Opfriskede flersprogs eksempler (.NET, Java, Python, JavaScript) til at afspejle aktuelle MCP SDK-mønstre

#### Sikkerhed (02-Security/) - Omfattende Sikkerhedsrevision  
- **Standardtilpasning**: Fuld tilpasning til MCP-specifikation 2025-06-18 sikkerhedskrav
- **Autentificeringsudvikling**: Dokumenteret udvikling fra brugerdefinerede OAuth-servere til ekstern identitetsudbyderdelegering (Microsoft Entra ID)
- **AI-specifik Trusselanalyse**: Forbedret dækning af moderne AI-angrebsvektorer
  - Detaljerede prompt injektionsangrebsscenarier med virkelige eksempler
  - Værktøjforgiftning mekanismer og "rug pull" angrebsmønstre
  - Kontekstvindu-forgiftning og modelforvirringsangreb
- **Microsoft AI Sikkerhedsløsninger**: Omfattende dækning af Microsoft sikkerhedsøkosystem
  - AI Prompt Shields med avanceret detektion, spotlighting og delimiter-teknikker
  - Azure Content Safety integrationsmønstre
  - GitHub Advanced Security til forsyningskædebeskyttelse
- **Avancerede Trusselsbekæmpelse**: Detaljerede sikkerhedskontroller for
  - Session hijacking med MCP-specifikke angrebsscenarier og kryptografiske session ID-krav
  - Confused deputy-problemer i MCP proxy-scenarier med eksplicitte samtykkekrav
  - Token passthrough-sårbarheder med obligatoriske valideringskontroller
- **Forsyningskædesikkerhed**: Udvidet AI-forsyningskædedækning inklusive foundation-modeller, embedding-services, kontekstudbydere og tredjeparts API’er
- **Foundationsikkerhed**: Forbedret integration med enterprise sikkerhedsmønstre inklusive zero trust arkitektur og Microsoft sikkerhedsøkosystem
- **Ressourceorganisering**: Kategoriserede omfattende ressource links efter type (officiel dokumentation, standarder, forskning, Microsoft-løsninger, implementeringsvejledninger)

### Kvalitetsforbedringer i Dokumentation
- **Strukturerede Læringsmål**: Forbedrede læringsmål med specifikke, handlingsorienterede resultater
- **Tværreferencer**: Tilføjede links mellem relaterede sikkerheds- og kernebegrebsemner
- **Aktuel Information**: Opdaterede alle datoreferencer og specifikationslinks til gældende standarder
- **Implementeringsvejledning**: Tilføjede specifikke, handlingsorienterede implementeringsanvisninger i begge sektioner

## 16. juli 2025

### README og Navigation Forbedringer
- Gennemgribende redesign af pensumnavigation i README.md
- Udskiftede `<details>` tags med mere tilgængeligt tabelbaseret format
- Oprettede alternative layoutmuligheder i ny mappe "alternative_layouts"
- Tilføjede kortbaserede, fanebaserede og accordion-stil navigationseksempler
- Opdaterede repository strukturafsnit til at inkludere alle nyeste filer
- Forbedrede afsnittet "Hvordan man bruger dette pensum" med klare anbefalinger
- Opdaterede MCP specifikationslinks til korrekte URL’er
- Tilføjede afsnit om Context Engineering (5.14) til pensumstruktur

### Studieguide Opdateringer
- Gennemgribende revision af studieguide til at stemme overens med aktuel repositorystruktur
- Tilføjede nye sektioner for MCP-klienter og værktøjer samt populære MCP-servere
- Opdaterede det visuelle penumsoversigt til nøjagtigt at afspejle alle emner
- Forbedrede beskrivelser af avancerede emner til at dække alle specialiserede områder
- Opdaterede Case Studies-sektionen til at afspejle faktiske eksempler
- Tilføjede denne omfattende ændringslog

### Community-bidrag (06-CommunityContributions/)
- Tilføjede detaljeret information om MCP servere til billedgenerering
- Tilføjede omfattende sektion om brug af Claude i VSCode
- Tilføjede Cline terminal-klient opsætning og brugsanvisninger
- Opdaterede MCP klientsektion til at inkludere alle populære klientmuligheder
- Forbedrede bidragseksempler med mere præcise kodeeksempler

### Avancerede Emner (05-AdvancedTopics/)
- Organiserede alle specialiserede emne-mapper med konsekvent navngivning
- Tilføjede materialer og eksempler til kontekst engineering
- Tilføjede Foundry agent integrationsdokumentation
- Forbedrede Entra ID sikkerhedsintegrationsdokumentation

## 11. juni 2025

### Første Oprettelse
- Udgivet første version af MCP for Beginners pensum
- Oprettet grundstruktur for alle 10 hovedsektioner
- Implementeret visuel kurveoversigt til navigation
- Tilføjet indledende prøveprojekter i flere programmeringssprog

### Kom Godt I Gang (03-GettingStarted/)
- Oprettet første serverimplementering eksempler
- Tilføjet vejledning til klientudvikling
- Inkluderet LLM klient integrationsinstruktioner
- Tilføjet VS Code integrationsdokumentation
- Implementeret Server-Sent Events (SSE) servereksempler

### Grundlæggende Begreber (01-CoreConcepts/)
- Tilføjet detaljeret forklaring af klient-server arkitektur
- Oprettet dokumentation om nøgleprotokolkomponenter
- Dokumenteret messaging-mønstre i MCP

## 23. maj 2025

### Repository Struktur
- Initialiseret repository med grundlæggende mappestruktur
- Oprettet README-filer for hver hovedsektion
- Opsat oversættelsesinfrastruktur
- Tilføjet billedressourcer og diagrammer

### Dokumentation
- Oprettet indledende README.md med pensumoversigt
- Tilføjet CODE_OF_CONDUCT.md og SECURITY.md
- Opsat SUPPORT.md med vejledning til hjælp
- Oprettet foreløbig studieguide struktur

## 15. april 2025

### Planlægning og Rammeværk
- Indledende planlægning for MCP for Beginners pensum
- Defineret læringsmål og målgruppe
- Skitseret 10-sektioners struktur for pensum
- Udviklet konceptuelt rammeværk for eksempler og case-studier
- Oprettet indledende prototypeeksempler for nøglebegreber

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->