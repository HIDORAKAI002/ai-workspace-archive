# Changelog: MCP for Beginners Curriculum

Dette dokument fungerer som en oversigt over alle væsentlige ændringer foretaget i Model Context Protocol (MCP) for Beginners pensum. Ændringer dokumenteres i omvendt kronologisk rækkefølge (nyeste ændringer først).

## 24. juni 2026

### Nyt Lektion: Brug af MCP i Copilot-app

- [Tooling sektion](./12-tooling/README.md) Tilføjet tooling sektion.
- [MCP i Copilot app](./12-tooling/01-copilot-app/README.md)

## 16. juni 2026

### MCP Specifikationsjustering & Prøvevalidering

Valideret pensum mod den aktuelle **MCP Specification 2025-11-25** og de nyeste officielle SDK'er, derefter rettet de resterende forældede specifikationshenvisninger og bekræftet at kerneeksempler stadig bygger og kører.

#### Korrigeringer af Specifikationsversion (2025-06-18 / 2025-03-26 → 2025-11-25)

Opdaterede engelsk indhold hvor det stadig påstod at en ældre spec revision var den *nuværende/sidste* standard, og omdirigerede links til de kanoniske `modelcontextprotocol.io` specs:
- **05-AdvancedTopics/mcp-security/README.md**: Opdateret "Nuværende Standard" banneret, introduktion, hovedprincipper for sikkerhed, obligatoriske krav, Microsoft Entra ID sektion, Referencer & Ressourcer links, og afsluttende sikkerhedsmeddelelse (8 referencer) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Opdateret yderligere ressourcer specs link og "Nuværende Standard" banner til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Udskiftede det forældede `2025-03-26` security-and-trust link med den nuværende 2025-11-25 bedste sikkerhedspraksis side
- **03-GettingStarted/14-sampling/README.md**: Opdateret officielle sampling dokumentationslink til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Opdateret nutidsform "nuværende MCP specifikation" reference og yderligere ressourcer specs link til 2025-11-25 (historiske SSE-afviklingsnoter blev bevaret for nøjagtighed)

#### Prøvevalidering Mod Nuværende SDK'er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` bestod uden typefejl — eksisterende `McpServer`/`StdioServerTransport` API'er er stadig gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Valideret i isoleret `.venv` med `mcp[cli]` (1.27.2); `py_compile` bestod og `FastMCP.list_tools()` returnerede korrekt `add` og `subtract` værktøjer
- Bekræftet at alle prøve `@modelcontextprotocol/sdk` versionsintervaller (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løses rent til nuværende `1.29.0` uden brydende API-ændringer

#### Justering af Afhængighedspinning (lukning af versionsgab)

Opdaterede forældede SDK pins, så alle prøver følger den nuværende MCP udgivelse i overensstemmelse med repoets overordnede konvention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Forhøjede `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og opdaterede den forældede `"updated for MCP 2025-06-18"` pakkebeskrivelse til `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Forhøjede den præcise pin `mcp==1.23.0` → `mcp>=1.26.0`; regenererede begge `uv.lock` filer (`uv lock`), så lockfilerne løses til den nuværende `mcp 1.27.2` og holdes i sync med manifests

#### Pensum Gap Analyse — Seneste Spec Funktionsdækning

Verificeret at pensum allerede dækker alle primitivfunktioner introduceret/udvidet i MCP 2025-11-25, så der ikke er nogen indholdsmæssige huller:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitering (inkl. URL-tilstand)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Rødder**: Dokumenteret i 00-Introduction, 01-CoreConcepts, og 05-AdvancedTopics/mcp-root-contexts
- **Opgaver (eksperimentelle, langvarige operationer)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Værktøjsannoteringer** (`readOnlyHint` / `destructiveHint`): Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhedsstyrkelse & Afhængighedssårbarhedsrettelser

Kørte en fuld sikkerhedsgennemgang af alle afhængighedsmanifestfiler og eksempel kildekode, og rettede derefter alle rapporterede npm advisories og en kodebaseret fejl. Efter rettelsen rapporterer `npm audit` **0 sårbarheder** i alle gennemgåede mapper.

#### npm Afhængighedssårbarheder (transitive) — Rettet

Auditerede alle 15 committede `package-lock.json` filer. Sårbarheder var begrænset til transitive afhængigheder trukket ind af MCP Inspector dev-værktøjet, OpenAI klienten og MCP SDK; alle er nu løst uden at bryde prøverne:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Forhøjede `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), hvilket fjernede de bundtede `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws` advisories. Tilføjet en npm `overrides` post, der tvinger den patched `shell-quote@1.8.4` for at eliminere den resterende kritiske advisory båret af `concurrently`; regenererede begge lockfiler (nu 0 sårbarheder)
- **03-GettingStarted/samples/typescript**: `npm audit fix` opdaterede den transitive `qs` (moderat) til en patched udgivelse
- **03-GettingStarted/samples/javascript**: `npm audit fix` opdaterede den transitive `hono` (moderat) til en patched udgivelse
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` opdaterede den transitive `form-data` (høj) til en patched udgivelse
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererede den manglende `package-lock.json`, så projektet er reproducerbart og kan auditeres (0 sårbarheder)

#### Kodebaseret Sikkerhedsrettelse (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernede `shell=True` fra `open_in_vscode` værktøjet. Den tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillod shell metakarakterer i en mappesti at blive fortolket af `cmd.exe` (kommando-injektion vektor). Nu starter det direkte den opløste `Code.exe` med mappen som argument — uden shell — hvilket er funktionelt ækvivalent og sikkert

#### Python Afhængigheds Audit

- Auditerede alle Python kravssæt med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterede **ingen kendte sårbarheder** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` intervaller løses til nuværende patched udgivelser)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` markerede den transitive afhængighed **`werkzeug` 3.1.1** med tre `safe_join` Windows enhedsnavn DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, og `CVE-2026-27199` (alle rettet i 3.1.6). Tilføjede en eksplicit sikkerhedspinning `werkzeug>=3.1.6`, så patched udgivelsen bruges; verificerede at begrænsningen løses rent med `chainlit` / `mcp` / `semantic-kernel` stakken

### Produktnavn Rebranding

Opdaterede hele pensum indhold for at afspejle Microsofts produkt rebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Opdateret Discord fællesskabslink
- **AGENTS.md**: Opdateret Discord server reference
- **README.md**: Opdateret teknologiekosystem referencer
- **study_guide.md**: Opdateret cases studie referencer
- **05-AdvancedTopics/README.md**: Opdateret modul 5.13 titel og beskrivelse
- **05-AdvancedTopics/mcp-integration/README.md**: Opdateret afsnitsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fuld modul titel og indholdsopdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Opdateret krydsreference link
- **07-LessonsfromEarlyAdoption/README.md**: Opdateret cases studie referencer
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Opdateret afsnit 9 overskrift, badges og funktioner
- **08-BestPractices/README.md**: Opdateret Discord fællesskabslink
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Opdateret Discord kanal reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Opdateret modeldeployering reference
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Opdateret AI Services tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Opdateret ressource referencer

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Opdateret hovedpensum referencer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Opdateret modultitel, oversigt, og alle moduloverskrifter
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Opdateret titel, læringsmål, opsætningsinstruktioner, og ressourcer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Opdateret titel, læringsmål, MCP host tabel, og krydsreferencer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Opdateret titel, badges, forudsætninger, og ressourcer
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Opdateret Agent Builder referencer og feedback link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Opdateret forudsætninger og udvidelsesreferencer

---

## 11. april 2026

### Ny Lektion, Dokumentationsrettelser og Afhængighedsopdateringer

#### Nyt Pensum Indhold Tilføjet

**Modul 05 - Avancerede Emner**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nyt omfattende guide der dækker det modstridende debatmønster for multi-agent systemer
  - Mermaid arkitekturdiagram: to agenter → delt MCP server → debattranskript → dommer → dom
  - Delt MCP værktøjsserver (`web_search` + `run_python`) implementeret i Python og TypeScript
  - Modstridende system prompts (FOR / IMOD / Dommer) med eksplicitte krav til værktøjsbrug
  - Debatorkestrator i Python, TypeScript og C# der styrer runder og dirigerer argumenter
  - MCP `ClientSession` ledningsføring til orkestrator til reelle værktøjskald
  - Brugssagstabel (hallucinationsdetektion, trusselsmodellering, API design review, faktatjek, teknologivalg)
  - Sikkerhedsovervejelser: sandkassekørsel, validering af værktøjskald, ratebegrænsning, audit-logging
  - Struktureret øvelse med tre praktiske scenarier (kodegennemgang, arkitektur beslutning, indholdsmoderation)

#### Dokumentationsrettelser

**Modul 03 - Kom Godt I Gang**
- **05-stdio-server/README.md**: Rettede ufuldstændigt TypeScript stdio server eksempel — tilføjede manglende transport instantiationskode (`new StdioServerTransport()`) og `server.connect(transport)` kald, så det matcher Python og .NET eksemplerne i samme sektion
- **14-sampling/README.md**: Rettede slåfejl — rettede `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Pensum Opdateringer

**Hoved README.md**
- Tilføjet post 5.17 (Adversarial Multi-Agent Reasoning with MCP) til pensumtabel med direkte link til den nye lektion

**05-AdvancedTopics/README.md**
- Tilføjet Lektion 5.17 række til lektionsoversigten

**study_guide.md**
- Tilføjet Adversarial Multi-Agent Reasoning emnet til mindmap og prosabeskrivelse af Avancerede Emner

#### Kode- og Sikkerhedsrettelser

**Modul 05 - Modstridende Agenter (`mcp-adversarial-agents`)**
- **Sikkerhedsrettelse — kommandoinjektion**: Erstattede `execSync` shell-interpolation med `execFile` + `promisify` i TypeScript-værktøjet `run_python`, hvilket eliminerer kommandoinjektionsfladen (LLM-styret kode sendes nu som et bogstaveligt argv-element uden skalinvolvering)
- **MCP-værktøj loop-ledning**: Opdaterede Python debate orkestratoren til at bruge `AsyncAnthropic` klient (erstattede blokerende synkron `Anthropic`), sende en live `ClientSession` direkte til hver agenttur, hente værktøjsdefinitioner via `session.list_tools()` hver tur, og sende `tool_use` blokke via `session.call_tool()` i en løkke indtil modellen udleder en endelig tekstrespons

#### Afhængighedsopdateringer

- Opgraderede `hono` til 4.12.12 på tværs af flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Opgraderede `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker
- Opgraderede `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows labs 3 og 4)
- Opgraderede `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Oversættelser

- Synkroniserede oversættelser for 48+ sprog med de seneste kildeforandringer (i18n opdatering)

---

## 5. februar 2026

### Repository-overgribende Validerings- og Navigationsforbedringer

#### Nyt Kursusindhold Tilføjet

**Modul 03 - Kom godt i gang**
- **12-mcp-hosts/README.md**: Ny omfattende guide til opsætning af MCP-værter
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigurations-eksempler
  - JSON-konfiguration skabeloner til alle hovedværter
  - Sammenligningstabel for transporttyper (stdio, SSE/HTTP, WebSocket)
  - Fejlfinding af almindelige forbindelsesproblemer
  - Sikkerheds bedste praksis for vært konfiguration

- **13-mcp-inspector/README.md**: Ny fejlsøgningsguide til MCP Inspector
  - Installationsmetoder (npx, global npm, fra kilde)
  - Tilslutning til servere via stdio og HTTP/SSE
  - Testværktøjer, ressourcer og prompt workflows
  - VS Code integration med MCP Inspector
  - Almindelige fejlsøgningsscenarier med løsninger

**Modul 04 - Praktisk Implementering**
- **pagination/README.md**: Ny guide til implementering af paginering
  - Cursor-baserede pagineringsmønstre i Python, TypeScript, Java
  - Klientside håndtering af paginering
  - Cursor designstrategier (opak vs. struktureret)
  - Anbefalinger til performanceoptimering

**Modul 05 - Avancerede Emner**
- **mcp-protocol-features/README.md**: Ny dybdegående gennemgang af protokolfunktioner
  - Implementering af fremdriftsnotifikationer
  - Mønstre for aflysning af anmodninger
  - Ressourceskabeloner med URI-mønstre
  - Server livscyklusstyring
  - Kontrol af logningsniveauer
  - Fejlhåndteringsmønstre med JSON-RPC koder

#### Navigationsrettelser (24+ filer opdateret)

**Hovedmodul READMEs**
 Nu linker til både første lektion OG næste modul

**02-Sikkerheds Underfiler**
- Alle 5 supplerende sikkerhedsdokumenter har nu "Hvad er næste" navigation:

**09-CaseStudy Filer**
- Alle case study filer har nu sekventiel navigation:

**10-StreamliningAI Labs**
Tilføjede Hvad er næste sektion til Modul 10 oversigt og Modul 11

#### Kode- og Indholdsrettelser

**SDK og Afhængighedsopdateringer**
Rettet tom openai version til `^4.95.0`
Opdateret SDK fra `^1.8.0` til `>=1.26.0`
Opdateret mcp versionslåse til `>=1.26.0`

**Kode Rettelser**
Rettet ugyldig model `gpt-4o-mini` til `gpt-4.1-mini`

**Indholdsrettelser**
Rettet brudt link `READMEmd` → `README.md`, rettet kursusoverskrift `Module 1-3` → `Module 0-3`, rettet store/små bogstaver i sti
Fjernet korrumperet duplikeret Case Study 5 indhold

**Begyndervejledning Forbedringer**
Tilføjet korrekt introduktion, læringsmål og forudsætninger for begyndere

#### Kursusopdateringer

**Hoved README.md**
- Tilføjede poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) til kursustabel

**Modul READMEs**
Tilføjet lektioner 12 og 13 til lektionliste
Tilføjet Praktiske guider sektion med link til paginering
Tilføjet lektioner 5.15 (Custom Transport) og 5.16 (Protocol Features)

**study_guide.md**
- Opdateret tankekort med alle nye emner: MCP Hosts Opsætning, MCP Inspector, Paginering Strategier, Protokolfunktioner Dybdegående

## 28. januar 2026

### MCP Specification 2025-11-25 Overholdelsesgennemgang

#### Forbedring af Kernekoncepter (01-CoreConcepts/)
- **Ny Klient Primitive - Roots**: Tilføjet omfattende dokumentation om Roots klientprimitiv, som giver servere mulighed for at forstå filsystemgrænser og adgangstilladelser
- **Værktøjsannotationer**: Tilføjet dokumentation for værktøjets adfærdsannotationer (`readOnlyHint`, `destructiveHint`) til bedre beslutningstagning ved kørsel af værktøjer
- **Værktøjskald i Sampling**: Opdateret Sampling dokumentation til at inkludere `tools` og `toolChoice` parametre for modelstyret værktøjskald under sampling-anmodninger
- **URL-tilstand Elicitering**: Tilføjet dokumentation om URL-baseret elicitering for server-initierede eksterne web-interaktioner
- **Tasks (Eksperimentel)**: Tilføjet ny sektion der dokumenterer den eksperimentelle Tasks-funktion til holdbare eksekveringsindpakninger og udsat resultatudtræk
- **Ikonsupport**: Noteret at værktøjer, ressourcer, ressourceskabeloner og prompts nu kan indeholde ikoner som tillægsmetadata

#### Dokumentationsopdateringer
- **README.md**: Tilføjet MCP Specification 2025-11-25 versionsreference og dato-baseret versioneringsforklaring
- **study_guide.md**: Opdateret kursuskort til at inkludere Tasks og Værktøjsannotationer i Kernekoncepter sektionen; opdateret dokumenttidsstempel

#### Verifikation af Specifikationsoverholdelse
- **Protokolversion**: Verificeret at al dokumentation refererer til gældende MCP Specification 2025-11-25
- **Arkitekturoverensstemmelse**: Bekræftet nøjagtigheden af dokumentationen for to-lags arkitektur (Data Layer + Transport Layer)
- **Primitiver Dokumentation**: Valideret serverprimitiver (Resources, Prompts, Tools) og klientprimitiver (Sampling, Elicitation, Logging, Roots)
- **Transportmekanismer**: Verificeret korrekt dokumentation af STDIO og Streamable HTTP transport
- **Sikkerhedsanvisninger**: Bekræftet overensstemmelse med gældende MCP Security Best Practices dokumentation

#### Nøglefunktioner i MCP 2025-11-25 Dokumenteret
- **OpenID Connect Discovery**: Auth server opdagelse via OIDC
- **OAuth Client ID Metadata Dokumenter**: Anbefalet klientregistreringsmekanisme
- **JSON Schema 2020-12**: Standarddialekt for MCP skemadefinitioner
- **SDK Tiering System**: Formaliserede krav til SDK-funktionsunderstøttelse og vedligeholdelse
- **Governance Struktur**: Formaliserede Arbejdsgrupper og Interessegrupper i MCP governance

### Stor Opdatering af Sikkerhedsdokumentation (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **Nyt Praktisk Træningsmateriale**: Tilføjet omfattende integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i al sikkerhedsdokumentation
- **Rutetildækning for Ekspeditionen**: Dokumenteret hele camp-til-camp forløbet fra Base Camp til Summit
- **OWASP Overensstemmelse**: Al sikkerhedsanvisning kortlagt til OWASP MCP Azure Security Guide risici

#### OWASP MCP Top 10 Integration
- **Ny Sektion**: Tilføjet OWASP MCP Top 10 sikkerhedsrisikotabel med Azure-afbødninger til hovedsikkerheds-README
- **Risiko-baseret Dokumentation**: Opdateret mcp-security-controls-2025.md med OWASP MCP risikoreferencer for hver sikkerhedsdomain
- **Referencearkitektur**: Linket til OWASP MCP Azure Security Guide referencearkitektur og implementeringsmønstre

#### Opdaterede Sikkerhedsfiler
- **README.md**: Tilføjet Sherpa Workshop oversigt, ekspeditionsrute tabel, OWASP MCP Top 10 risikoresumé og praktisk træningssektion
- **mcp-security-controls-2025.md**: Opdateret header til februar 2026, tilføjet OWASP risikoreferencer (MCP01-MCP08), rettet versionsinkonsistens
- **mcp-security-best-practices-2025.md**: Tilføjet Sherpa og OWASP ressourcer sektion, opdateret tidsstempel
- **mcp-best-practices.md**: Tilføjet praktisk træningssektion med Sherpa og OWASP links
- **azure-content-safety-implementation.md**: Tilføjet OWASP MCP06 reference, Sherpa Camp 3 overensstemmelse og yderligere ressourcer sektion

#### Nye Ressourcelinks Tilføjet
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP risikosider (MCP01-MCP10)

### Kursusdækkende MCP Specification 2025-11-25 Tilpasning

#### Modul 03 - Kom godt i gang
- **SDK Dokumentation**: Tilføjet Go SDK til officiel SDK-liste; opdateret alle SDK-referencer til at matche MCP Specification 2025-11-25
- **Transportafklaring**: Opdateret STDIO og HTTP Streaming transportbeskrivelser med eksplicitte specifikationsreferencer

#### Modul 04 - Praktisk Implementering
- **SDK Opdateringer**: Tilføjet Go SDK; opdateret SDK-liste med specifikationsversionsreference
- **Autorisation Specifikation**: Opdateret MCP Autorisationsspecifikation link til aktuel 2025-11-25 version

#### Modul 05 - Avancerede Emner
- **Nye Funktioner**: Tilføjet note om nye MCP Specification 2025-11-25 funktioner (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop links til yderligere referencer

#### Modul 06 - Community Bidrag
- **SDK Liste**: Tilføjet Swift og Rust SDKs; opdateret specifikationslink til 2025-11-25
- **Specifikationsreference**: Opdateret MCP Specification link til direkte specifikations-URL

#### Modul 07 - Lærdomme fra Tidlig Adoption
- **Ressourceopdateringer**: Tilføjet MCP Specification 2025-11-25 link og OWASP MCP Top 10 til yderligere ressourcer

#### Modul 08 - Best Practices
- **Specifikationsversion**: Opdateret MCP Specification reference til 2025-11-25
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop til yderligere referencer

#### Modul 10 - Optimering af AI-arbejdsgange
- **Badge Opdatering**: Ændret MCP versionsbadge fra SDK-version (1.9.3) til specifikationsversion (2025-11-25)
- **Ressourcelinks**: Opdateret MCP Specification link; tilføjet OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Specifikationsreference**: Opdateret MCP Specification link til 2025-11-25 version
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 til officielle ressourcer

## 18. december 2025

### Opdatering af Sikkerhedsdokumentation - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Opdatering af Versionsreference
- **Protokolversionsopdatering**: Opdateret til at referere til seneste MCP Specification 2025-11-25 (udgivet 25. november 2025)
  - Opdateret alle versionsreferencer fra 2025-06-18 til 2025-11-25
  - Opdateret dokuments dato-referencer fra 18. august 2025 til 18. december 2025
  - Verificeret at alle specifikations-URL’er peger på aktuel dokumentation
- **Indholdsvalidering**: Omfattende validering af sikkerheds bedste praksis i henhold til seneste standarder
  - **Microsoft Sikkerhedsløsninger**: Verificeret gældende terminologi og links for Prompt Shields (tidligere "Jailbreak risiko detektion"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1 Sikkerhed**: Bekræftet overensstemmelse med nyeste OAuth sikkerheds bedste praksis
  - **OWASP Standarder**: Valideret at OWASP Top 10 for LLMs referencer er aktuelle
  - **Azure Services**: Verificeret alle relevante Microsoft Azure dokumentationslinks og bedste praksis
- **Standardoverensstemmelse**: Alle henviste sikkerhedsstandarder bekræftet aktuelle
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerheds- og compliance-rammer
- **Implementeringsressourcer**: Valideret alle links til implementeringsguider og ressourcer
  - Azure API Management autentifikationsmønstre
  - Microsoft Entra ID integrationsguides
  - Azure Key Vault secrets management
  - DevSecOps pipelines og overvågningsløsninger

### Dokumentations Kvalitetssikring
- **Specifikationsoverholdelse**: Sikret at alle obligatoriske MCP sikkerhedskrav (MUST/MUST NOT) er i overensstemmelse med nyeste specifikation
- **Ressourceaktualitet**: Verificeret alle eksterne links til Microsoft dokumentation, sikkerhedsstandarder og implementeringsguider
- **Dækning af Bedste Praksis**: Bekræftet omfattende dækning af autentifikation, autorisation, AI-specifikke trusler, supply chain sikkerhed og enterprise-mønstre

## 6. oktober 2025

### Udvidelse af Kom godt i gang sektion – Avanceret Serverbrug & Simpel Autentifikation

#### Avanceret Serverbrug (03-GettingStarted/10-advanced)
- **Nyt Kapitel Tilføjet**: Introduceret en omfattende guide til avanceret MCP serverbrug, der dækker både almindelig og lavniveauserverarkitektur.
  - **Almindelig vs. Lavniveau Server**: Detaljeret sammenligning og kodeeksempler i Python og TypeScript for begge tilgange.
  - **Handler-baseret Design**: Forklaring af handler-baseret værktøj/ressource/promptstyring til skalerbare, fleksible serverimplementeringer.
  - **Praktiske Mønstre**: Virkelige scenarier, hvor lavniveau servermønstre er gavnlige for avancerede funktioner og arkitektur.

#### Simpel Autentifikation (03-GettingStarted/11-simple-auth)
- **Nyt Kapitel Tilføjet**: Trin-for-trin vejledning til implementering af simpel autentifikation i MCP-servere.
  - **Auth Begreber**: Klar forklaring på autentifikation vs. autorisation og håndtering af legitimationsoplysninger.
  - **Grundlæggende Auth Implementering**: Middleware-baserede autentifikationsmønstre i Python (Starlette) og TypeScript (Express) med kodeeksempler.
  - **Udvikling til Avanceret Sikkerhed**: Vejledning i at starte med simpel auth og gå videre til OAuth 2.1 og RBAC med henvisninger til avancerede sikkerhedsmoduler.

Disse tilføjelser giver praktisk, håndgribelig vejledning til at bygge mere robuste, sikre og fleksible MCP-serverimplementeringer, der forbinder grundlæggende koncepter med avancerede produktionsmønstre.

## 29. september 2025

### MCP Server Database Integration Labs - Omfattende Praktisk Læringsforløb

#### 11-MCPServerHandsOnLabs - Nyt komplet curriculum for databaseintegration
- **Fuldt 13-Lab Læringsforløb**: Tilføjet omfattende praktisk curriculum til opbygning af produktionsklare MCP-servere med PostgreSQL databaseintegration
  - **Virkelighedsnær Implementering**: Zava Retail analytics case, der demonstrerer enterprise-grade mønstre
  - **Struktureret Læringsprogression**:
    - **Labs 00-03: Fundamenter** - Introduktion, Kernearkitektur, Sikkerhed & Multi-Tenancy, Miljøopsætning
    - **Labs 04-06: Opbygning af MCP Server** - Database Design & Skema, MCP Server Implementering, Værktøjsudvikling  
    - **Labs 07-09: Avancerede Funktioner** - Semantisk Søgning Integration, Test & Fejlfinding, VS Code Integration
    - **Labs 10-12: Produktion & Best Practices** - Udrulningsstrategier, Overvågning & Observabilitet, Best Practices & Optimering
  - **Enterprise Teknologier**: FastMCP framework, PostgreSQL med pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Avancerede Funktioner**: Row Level Security (RLS), semantisk søgning, multi-tenant dataadgang, vektorembeddings, realtidsmonitorering

#### Terminologistandardisering - Modul til Lab Konvertering
- **Omfattende Dokumentationsopdatering**: Systematisk opdateret alle README-filer i 11-MCPServerHandsOnLabs til at bruge "Lab"-terminologi i stedet for "Module"
  - **Sektionoverskrifter**: Opdateret "What This Module Covers" til "What This Lab Covers" i alle 13 labs
  - **Indholdsbeskrivelse**: Ændret "This module provides..." til "This lab provides..." i hele dokumentationen
  - **Læringsmål**: Opdateret "By the end of this module..." til "By the end of this lab..."
  - **Navigationslinks**: Konverteret alle "Module XX:" henvisninger til "Lab XX:" i krydsreferencer og navigation
  - **Færdiggørelsessporing**: Opdateret "After completing this module..." til "After completing this lab..."
  - **Bevarede Tekniske Referencer**: Opretholdt Python modulreferencer i konfigurationsfiler (fx `"module": "mcp_server.main"`)

#### Studieguide Forbedring (study_guide.md)
- **Visuelt Curriculumkort**: Tilføjet ny sektion "11. Database Integration Labs" med omfattende visualisering af labstrukturen
- **Repositorystruktur**: Opdateret fra ti til elleve hovedsektioner med detaljeret beskrivelse af 11-MCPServerHandsOnLabs
- **Læringsstive Vejledning**: Forbedrede navigationsinstruktioner til at dække sektionerne 00-11
- **Teknologidækning**: Tilføjet FastMCP, PostgreSQL, Azure services integrationsdetaljer
- **Læringsudbytte**: Fremhævet produktion-klare serverudvikling, databaseintegrationsmønstre og enterprisesikkerhed

#### Hoved README Struktur Forbedring
- **Lab-baseret Terminologi**: Opdateret hoved-README.md i 11-MCPServerHandsOnLabs til konsekvent brug af "Lab"-struktur
- **Læringssti Organisation**: Klar progression fra grundlæggende koncepter gennem avanceret implementering til produktionsudrulning
- **Virkelighedsfokus**: Fokus på praktisk, håndgribelig læring med enterprise-grade mønstre og teknologier

### Dokumentationskvalitet & Konsistensforbedringer
- **Praktisk Læring Betoning**: Forstærket praktisk, lab-baseret tilgang i hele dokumentationen
- **Enterprise Mønsterfokus**: Fremhævet produktionsklare implementeringer og enterprise sikkerhedsovervejelser
- **Teknologi Integration**: Omfattende dækning af moderne Azure services og AI integrationsmønstre
- **Læringsprogression**: Klar, struktureret sti fra grundlæggende koncepter til produktionsudrulning

## 26. september 2025

### Case Studier Forbedring - GitHub MCP Registry Integration

#### Case Studier (09-CaseStudy/) - Fokus på Økosystemudvikling
- **README.md**: Stor udvidelse med omfattende GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Ny omfattende case study, der undersøger GitHubs MCP Registry lancering i september 2025
    - **Problemanalyse**: Detaljeret gennemgang af fragmenterede MCP server opdagelses- og udrulningsudfordringer
    - **Løsningsarkitektur**: GitHubs centraliserede registreringsmetode med ét-klik VS Code installation
    - **Forretningspåvirkning**: Målbare forbedringer i onboarding og produktivitet for udviklere
    - **Strategisk Værdi**: Fokus på modulær agentudrulning og tværværktøjs interoperabilitet
    - **Økosystemudvikling**: Positionering som grundlæggende platform for agentbaseret integration
  - **Forbedret Case Study Struktur**: Opdateret alle syv case studier med konsistent formatering og omfattende beskrivelser
    - Azure AI Travel Agents: Multi-agent orkestreringsfokus
    - Azure DevOps Integration: Workflow-automatisering
    - Real-Time Dokumentationsindhentning: Python konsolklientimplementering
    - Interaktiv Studieplansgenerator: Chainlit samtale webapp
    - In-Editor Dokumentation: VS Code og GitHub Copilot integration
    - Azure API Management: Enterprise API integrationsmønstre
    - GitHub MCP Registry: Økosystemudvikling og fællesskabsplatform
  - **Omfattende Konklusion**: Omskrevet konklusionsafsnit, der fremhæver syv case studier, der dækker flere MCP-implementeringsdimensioner
    - Enterprise Integration, Multi-Agent Orkestrering, Udviklerproduktivitet
    - Økosystemudvikling, Uddannelsesmæssige Anvendelser kategorisering
    - Øget indsigt i arkitekturmønstre, implementeringsstrategier og best practices
    - Betoning af MCP som moden, produktionsklar protokol

#### Studieguide Opdateringer (study_guide.md)
- **Visuelt Curriculumkort**: Opdateret mindmap til at inkludere GitHub MCP Registry i Case Studies-sektionen
- **Case Studier Beskrivelse**: Forbedret fra generiske beskrivelser til detaljeret opdeling af syv omfattende case studier
- **Repositorystruktur**: Opdateret sektion 10 til at afspejle omfattende case study dækning med specifikke implementeringsdetaljer
- **Changelog Integration**: Tilføjet 26. september 2025 post med dokumentation af GitHub MCP Registry tilføjelsen og case study forbedringer
- **Dato Opdateringer**: Opdateret fodertidspunkt for at afspejle seneste revision (26. september 2025)

### Dokumentationskvalitetsforbedringer
- **Konsistensforbedring**: Standardiseret formatering og struktur på case studier på tværs af alle syv eksempler
- **Omfattende Dækning**: Case studier dækker nu enterprise, udviklerproduktivitet og økosystemudviklingsscenarier
- **Strategisk Positionering**: Øget fokus på MCP som grundlæggende platform for agentbaseret systemudrulning
- **Ressourceintegration**: Opdaterede yderligere ressourcer til at inkludere GitHub MCP Registry link

## 15. september 2025

### Avancerede Emner Udvidelse - Tilpassede Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Ny avanceret implementeringsguide
- **README.md**: Fuld implementeringsvejledning for tilpassede MCP transportmekanismer
  - **Azure Event Grid Transport**: Omfattende serverless event-drevet transportimplementering
    - C#, TypeScript og Python eksempler med Azure Functions integration
    - Event-drevne arkitektur mønstre til skalerbare MCP løsninger
    - Webhook modtagere og push-baseret beskedbehandling
  - **Azure Event Hubs Transport**: Høj-throughput streaming transportimplementering
    - Realtids streaming muligheder til lav-latens scenarier
    - Partitioneringsstrategier og checkpointstyring
    - Beskedbatching og performanceoptimering
  - **Enterprise Integrationsmønstre**: Produktionsklare arkitektureksempler
    - Distribueret MCP behandling på tværs af flere Azure Functions
    - Hybrid transportarkitektur med kombination af flere transporttyper
    - Beskedholdbarhed, pålidelighed og fejlhåndteringsstrategier
  - **Sikkerhed & Overvågning**: Azure Key Vault integration og observabilitet mønstre
    - Managed identity autentifikation og mindst-privilegium adgang
    - Application Insights telemetri og performancemonitorering
    - Circuit breakers og fejl-tolerancemønstre
  - **Test Frameworks**: Omfattende teststrategier for tilpassede transports
    - Unit test med testdoubles og mocking frameworks
    - Integrationstest med Azure Test Containers
    - Performance- og belastningstest overvejelser

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Nyt AI-felt
- **README.md**: Omfattende udforskning af context engineering som et nyt felt
  - **Kerneprincipper**: Fuld kontekstdeling, beslutningsbevidsthed og styring af kontekstvinduer
  - **MCP Protokoltilpasning**: Hvordan MCP design adresserer udfordringer i context engineering
    - Begrænsninger i kontekstvinduer og progressive indlæsningsstrategier
    - Relevansbestemmelse og dynamisk konteksthentning
    - Multimodal kontekstbehandling og sikkerhedsovervejelser
  - **Implementeringstilgange**: Single-threaded vs. multi-agent arkitekturer
    - Kontextopdeling og prioriteringsteknikker
    - Progressiv kontekstindlæsning og komprimeringsstrategier
    - Lagdelt konteksttilgang og hentningsoptimering
  - **Målerammeværk**: Fremvoksende målepunkter til evaluering af konteksteffektivitet
    - Indtastningseffektivitet, performance, kvalitet og brugeroplevelsesaspekter
    - Eksperimentelle tilgange til kontekstoptimering
    - Fejl-analyse og forbedringsmetodologier

#### Curriculum Navigationsopdateringer (README.md)
- **Forbedret Modulstruktur**: Opdateret curriculumtabel til at inkludere nye avancerede emner
  - Tilføjet Context Engineering (5.14) og Custom Transport (5.15) poster
  - Ensartet formatering og navigationslinks på tværs af alle moduler
  - Opdaterede beskrivelser for at afspejle gældende indholdsomfang

### Mappestrukturforbedringer
- **Navnestandardisering**: Omdøbt "mcp transport" til "mcp-transport" for konsistens med andre avancerede emnermapper
- **Indholdsorganisering**: Alle 05-AdvancedTopics mapper følger nu konsistent navngivningsmønster (mcp-[emne])

### Dokumentationskvalitetsforbedringer
- **MCP Specifikationsoverensstemmelse**: Alt nyt indhold refererer til MCP Specification 2025-06-18
- **Sprogdiversitet i eksempler**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Enterprise Fokus**: Produktionsklare mønstre og Azure cloud integration hele vejen igennem
- **Visuel Dokumentation**: Mermaid diagrammer til arkitektur- og flowvisualisering

## 18. august 2025

### Omfattende Dokumentationsopdatering - MCP 2025-06-18 Standards

#### MCP Security Best Practices (02-Security/) - Fuld modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fuld omskrivning i overensstemmelse med MCP Specification 2025-06-18
  - **Obligatoriske Krav**: Tilføjet eksplicitte SKAL/MADE NOT SKAL krav fra officiel specifikation med klare visuelle indikatorer
  - **12 Kerne Sikkerhedspraksisser**: Omdannet fra 15-punkts liste til omfattende sikkerhedsområder
    - Token Sikkerhed & Autentifikation med ekstern identitetsudbyder integration
    - Sessionsstyring & Transport Sikkerhed med kryptografiske krav
    - AI-Specifik Trusselsbeskyttelse med Microsoft Prompt Shields integration
    - Adgangskontrol & Rettigheder med mindst-privilegium-princippet
    - Indholdssikkerhed & Overvågning med Azure Content Safety integration
    - Forsyningskæde Sikkerhed med omfattende komponentverifikation
    - OAuth Sikkerhed & Forvirret Deputys-beskyttelse med PKCE implementering
    - Incident Response & Genopretning med automatiserede kapaciteter
    - Compliance & Governance med regulatorisk tilpasning
    - Avancerede Sikkerhedskontroller med zero trust arkitektur
    - Microsoft Sikkerhedsøkosystem Integration med omfattende løsninger
    - Kontinuerlig Sikkerhedsevolution med adaptive praksisser
  - **Microsoft Sikkerhedsløsninger**: Forbedret integrationsvejledning til Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security
  - **Implementeringsressourcer**: Kategoriserede omfattende ressourcelinks efter Officiel MCP Dokumentation, Microsoft Sikkerhedsløsninger, Sikkerhedsstandarder og Implementeringsvejledninger

#### Advanced Security Controls (02-Security/) - Enterprise implementering
- **MCP-SECURITY-CONTROLS-2025.md**: Fuld gennemgang med enterprise-grade sikkerhedsramme
  - **9 Omfattende Sikkerhedsområder**: Udvidet fra grundlæggende kontroller til detaljeret enterprise ramme
    - Avanceret Autentifikation & Autorisation med Microsoft Entra ID integration
    - Token Sikkerhed & Anti-Passthrough Kontroller med omfattende validering
    - Sessionssikkerhedskontroller med kapringsforebyggelse
    - AI-specifikke sikkerhedskontroller med prompt-injektion og værktøjsforgiftning forebyggelse
    - Forvirret Deputys-angrebsforebyggelse med OAuth proxy sikkerhed
    - Værktøjsudførelsessikkerhed med sandboxing og isolation
    - Forsyningskæde sikkerhedskontroller med afhængighedsverifikation
    - Overvågning & Detektion kontroller med SIEM-integration
    - Incident Response & Genopretning med automatiserede kapaciteter
  - **Implementeringseksempler**: Tilføjet detaljerede YAML konfigurationsblokke og kodeeksempler
  - **Microsoft Løsninger Integration**: Omfattende dækning af Azure sikkerhedstjenester, GitHub Advanced Security og enterprise identitetsstyring

#### Avancerede Emner Sikkerhed (05-AdvancedTopics/mcp-security/) - Produktionsklar implementering
- **README.md**: Fuld omskrivning til enterprise sikkerhedsimplementering
  - **Nuværende Specifikationsoverensstemmelse**: Opdateret til MCP Specification 2025-06-18 med obligatoriske sikkerhedskrav
  - **Forbedret Autentifikation**: Microsoft Entra ID integration med omfattende .NET og Java Spring Security eksempler
  - **AI Sikkerhedsintegration**: Microsoft Prompt Shields og Azure Content Safety implementering med detaljerede Python eksempler
  - **Avanceret Trusselsmærkning**: Omfattende implementeringseksempler for
    - Forvirret Deputys-angrebsforebyggelse med PKCE og brugergodkendelseskontrol
    - Token Passthrough Forebyggelse med audience-validering og sikker tokenhåndtering
- Forebyggelse af sessionkapring med kryptografisk binding og adfærdsanalyse  
- **Enterprise Security Integration**: Azure Application Insights-overvågning, trusselsdetektionspipeline og forsyningskædesikkerhed  
- **Implementeringscheckliste**: Klare obligatoriske vs. anbefalede sikkerhedskontroller med Microsofts sikkerhedsøkosystemfordele  

### Dokumentationskvalitet & Standardjustering  
- **Specifikationshenvisninger**: Opdaterede alle henvisninger til gældende MCP Specification 2025-06-18  
- **Microsofts sikkerhedsøkosystem**: Forbedret integrationsvejledning i hele sikkerhedsdokumentationen  
- **Praktisk implementering**: Tilføjede detaljerede kodeeksempler i .NET, Java og Python med erhvervsorienterede mønstre  
- **Ressourceorganisering**: Omfattende kategorisering af officiel dokumentation, sikkerhedsstandarder og implementeringsvejledninger  
- **Visuelle indikatorer**: Klar markering af obligatoriske krav vs. anbefalede praksisser  

#### Kernekoncepter (01-CoreConcepts/) - Fuldstændig modernisering  
- **Protokolversionsopdatering**: Opdateret til at henvise til gældende MCP Specification 2025-06-18 med datobaseret versionsstyring (ÅÅÅÅ-MM-DD-format)  
- **Arkitekturopdatering**: Forbedrede beskrivelser af Hosts, Clients og Servers for at afspejle current MCP-arkitekturmønstre  
  - Hosts defineret klart som AI-applikationer, der koordinerer flere MCP-klientforbindelser  
  - Clients beskrevet som protokolforbindere, der opretholder én-til-én-server-relationer  
  - Servers forbedret med lokale vs. fjernudrulningsscenarier  
- **Primitiv restrukturering**: Total omlægning af server- og klientprimitiver  
  - Serverprimitiver: Ressourcer (datakilder), Prompts (skabeloner), Værktøjer (eksekverbare funktioner) med detaljerede forklaringer og eksempler  
  - Klientprimitiver: Sampling (LLM-fuldførelser), Elicitation (brugerinput), Logging (fejlfinding/overvågning)  
  - Opdateret med nutidige mønstre for opdagelse (`*/list`), hentning (`*/get`) og udførelse (`*/call`)  
- **Protokolarkitektur**: Introduceret to-lags arkitekturmodel  
  - Data Layer: JSON-RPC 2.0 fundament med livscyklusstyring og primitivkontrol  
  - Transport Layer: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer  
- **Sikkerhedsramme**: Omfattende sikkerhedsprincipper inklusiv eksplicit brugeraccept, databeskyttelse, sikker eksekvering af værktøjer og transportsikkerhed  
- **Kommunikationsmønstre**: Opdaterede protokolmeddelelser til at vise initialisering, opdagelse, eksekvering og notifikationsflows  
- **Kodeeksempler**: Opfriskede flersprogede eksempler (.NET, Java, Python, JavaScript) for at afspejle gældende MCP SDK-mønstre  

#### Sikkerhed (02-Security/) - Omfattende sikkerhedsrevidering  
- **Standardjustering**: Fuld overensstemmelse med MCP Specification 2025-06-18 sikkerhedskrav  
- **Autentifikationsevolution**: Dokumenteret udvikling fra tilpassede OAuth-servere til ekstern identitetsudbyderdelegering (Microsoft Entra ID)  
- **AI-specifik trusselsanalyse**: Udvidet dækning af moderne AI-angrebsvinkler  
  - Detaljerede scenarier for prompt-injektionsangreb med virkelige eksempler  
  - Mekanismer for værktøjstildækning og "rug pull"-angrebslignende mønstre  
  - Forgiftning af kontekstvinduer og modelforvirringsangreb  
- **Microsoft AI-sikkerhedsløsninger**: Omfattende dækning af Microsofts sikkerhedsøkosystem  
  - AI Prompt Shields med avanceret detektion, spotlighting og afgrænsningsteknikker  
  - Azure Content Safety-integrationsmønstre  
  - GitHub Advanced Security for forsyningskædebeskyttelse  
- **Avanceret trusselsafværgelse**: Detaljerede sikkerhedskontroller for  
  - Sessionkapring med MCP-specifikke angrebsscenarier og krav til kryptografiske session-ID’er  
  - Problemstillinger med confused deputy i MCP-proxyscenarier med eksplicit samtykkekrav  
  - Sikkerhed mod token-gennemsendelses sårbarheder med obligatoriske valideringskontroller  
- **Forsyningskædesikkerhed**: Udvidet AI-forsyningskædedækning inklusive grundlæggende modeller, embeddings-tjenester, kontekstleverandører og tredjeparts-API’er  
- **Fondssikkerhed**: Forbedret integration med virksomhedssikkerhedsmønstre inklusiv zero trust-arkitektur og Microsofts sikkerhedsøkosystem  
- **Ressourceorganisering**: Kategoriserede omfattende ressourcelinks efter type (Officiel dokumentation, Standarder, Forskning, Microsoft-løsninger, Implementeringsvejledninger)  

### Forbedringer i dokumentationskvalitet  
- **Strukturerede læringsmål**: Forbedrede læringsmål med specifikke, handlingsorienterede resultater  
- **Krydsreferencer**: Tilføjede links mellem beslægtede sikkerheds- og kernekoncept-emner  
- **Aktuel information**: Opdaterede alle datohensvisninger og specifikationslinks til gældende standarder  
- **Implementeringsvejledning**: Tilføjede specifikke, handlingsorienterede implementeringsvejledninger i begge sektioner  

## 16. juli 2025  

### README og navigationsforbedringer  
- Gennemgribende redesign af kursusnavigationen i README.md  
- Udskiftede `<details>`-tags med mere tilgængeligt tabelbaseret format  
- Oprettede alternative layoutmuligheder i ny mappe "alternative_layouts"  
- Tilføjede kortbaserede, fanebaserede og accordion-stil navigations-eksempler  
- Opdaterede afsnit om repository-struktur til at inkludere alle nyeste filer  
- Forbedrede "How to Use This Curriculum" med klare anbefalinger  
- Opdaterede MCP-specifikationslinks til korrekte URL’er  
- Tilføjede afsnit om Context Engineering (5.14) til kursusstrukturen  

### Opdateringer til studievejledning  
- Fuldstændig revision af studievejledning for at matche nuværende repository-struktur  
- Tilføjede nye sektioner for MCP Clients og Tools samt populære MCP Servers  
- Opdaterede Visual Curriculum Map for præcis afspejling af alle emner  
- Forbedrede beskrivelser af avancerede emner til at dække alle specialiserede områder  
- Opdaterede Case Studies-sektionen for at afspejle faktiske eksempler  
- Tilføjede denne omfattende changelog  

### Fællesskabsbidrag (06-CommunityContributions/)  
- Tilføjede detaljeret information om MCP-servers til billedgenerering  
- Tilføjede omfattende afsnit om brug af Claude i VSCode  
- Tilføjede Cline terminal klientopsætning og brugsanvisning  
- Opdaterede MCP-klientsektion med alle populære klientmuligheder  
- Forbedrede bidragseksempler med mere præcise kodeeksempler  

### Avancerede emner (05-AdvancedTopics/)  
- Organiserede alle specialiserede emne-mapper med konsekvent navngivning  
- Tilføjede materialer og eksempler om kontekstteknik  
- Tilføjede Foundry-agent integrationsdokumentation  
- Forbedrede dokumentation vedrørende Entra ID-sikkerhedsintegration  

## 11. juni 2025  

### Første oprettelse  
- Udgav første version af MCP for Beginners-kurset  
- Oprettede grundstruktur for alle 10 hovedsektioner  
- Implementerede Visual Curriculum Map til navigation  
- Tilføjede indledende prøveprojekter i flere programmeringssprog  

### Kom godt i gang (03-GettingStarted/)  
- Oprettede første serverimplementeringseksempler  
- Tilføjede vejledning til klientudvikling  
- Inkluderede LLM-klientintegrationsinstruktioner  
- Tilføjede dokumentation for VS Code-integration  
- Implementerede eksempler på Server-Sent Events (SSE) servere  

### Kernekoncepter (01-CoreConcepts/)  
- Tilføjede detaljeret forklaring af klient-server-arkitektur  
- Oprettede dokumentation for nøgleprotokolkomponenter  
- Dokumenterede beskedmønstre i MCP  

## 23. maj 2025  

### Repository-struktur  
- Initierede repository med grundlæggende mappestruktur  
- Oprettede README-filer for hver hovedsektion  
- Opsatte oversættelsesinfrastruktur  
- Tilføjede billedressourcer og diagrammer  

### Dokumentation  
- Oprettede indledende README.md med kursusoversigt  
- Tilføjede CODE_OF_CONDUCT.md og SECURITY.md  
- Opsatte SUPPORT.md med vejledning til hjælp  
- Oprettede foreløbig studieguide-struktur  

## 15. april 2025  

### Planlægning og rammer  
- Indledende planlægning af MCP for Beginners-kurset  
- Definerede læringsmål og målgruppe  
- Skitserede 10-sektions struktur af kurset  
- Udviklede konceptuel ramme for eksempler og case-studier  
- Oprettede indledende prototypeeksempler for nøglekoncepter

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->