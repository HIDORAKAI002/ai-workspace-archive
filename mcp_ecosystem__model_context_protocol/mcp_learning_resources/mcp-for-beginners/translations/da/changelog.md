# Ændringslog: MCP for Beginners Curriculum

Dette dokument fungerer som en registrering af alle væsentlige ændringer foretaget i Model Context Protocol (MCP) for Beginners pensum. Ændringer dokumenteres i omvendt kronologisk rækkefølge (nyeste ændringer først).

## 2. juli 2026

### Nyt Lektion: The 2026-07-28 MCP Specification Release Candidate

Tilføjet dækning af den kommende `2026-07-28` MCP specifikations release kandidat (annonceret 21. maj 2026; endelig release planlagt til 28. juli 2026), opsummeret fra det [officielle annoncerings blogindlæg](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Pensummets baseline forbliver **MCP Specification 2025-11-25** indtil den nye version udkommer, så dette fremstår som fremadskuende vejledning fremfor en omskrivning af eksisterende lektioner.

- **Ny**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — en fuld lektion der dækker det statsløse protokolkerne (fjernelse af `initialize` handshake og `Mcp-Session-Id`), de nye `Mcp-Method`/`Mcp-Name` routing headers, `ttlMs`/`cacheScope` caching metadata, W3C Trace Context i `_meta`, det formelle Extensions framework (MCP Apps og den nye Tasks-udvidelse), seks autorisations-udsætte SEPs, udfasningen af Roots/Sampling/Logging, og overgangen til fuld JSON Schema 2020-12 for tool schemas.
- **Opdateret** med fremadskuende henvisninger, der linker til den nye lektion:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokolversionsnote, Sampling/Roots/Logging/Tasks sektioner og "Hvad kommer næste"
  - [02-Security/README.md](./02-Security/README.md): autorisations-udsætnings henvisning
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): statsløs transport henvisning
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling udfasnings henvisning
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging udfasning og Tasks-udvidelses henvisning
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): statsløs/session-routing henvisning
  - [README.md](./README.md): "Ser fremad" note i specifikationssektionen og en ny `1.1`-post i pensummodultabellen
  - [study_guide.md](./study_guide.md): fremadskuende punktopstilling under Core Concepts-oversigten og en dateret tillægsnote
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): henvisning til `mcp-session-id` transportkort foran den statsløse anmodningsmodel
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): moduloversigt med henvisning til Root Contexts/Sampling-udfasninger og Tasks-udvidelsen
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): autorisations-udsætnings henvisning

## 24. juni 2026

### Nyt Lektion: Brug af MCP i Copilot app

- [Tooling sektion](./12-tooling/README.md) Tilføjet tooling sektion.
- [MCP i Copilot app](./12-tooling/01-copilot-app/README.md)

## 16. juni 2026

### MCP Specifikationsjustering & Prøvevalidering

Validerede pensum mod den nuværende **MCP Specification 2025-11-25** og de seneste officielle SDK’er, korrigerede derefter resterende forældede specifikationsreferencer og bekræftede, at kerneprøver stadig kan bygges og køres.

#### Specifikationsversionskorrektioner (2025-06-18 / 2025-03-26 → 2025-11-25)

Opdaterede engelsk indhold hvor det stadig hævdede en ældre specifikationsrevision var den *nuværende/seneste* standard, og pegede links tilbage til de kanoniske `modelcontextprotocol.io` spec-stier:
- **05-AdvancedTopics/mcp-security/README.md**: Opdaterede "Current Standard" banner, introduktion, kerne sikkerhedsprincipper overskrift, obligatoriske krav overskrift, Microsoft Entra ID sektion, Referencer & Ressourcer links, og afsluttende sikkerhedsnotits (8 referencer) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Opdaterede link til Yderligere Ressourcer og "Current Standard" banner til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Udskiftede det forældede `2025-03-26` security-and-trust link med den aktuelle 2025-11-25 security best practices side
- **03-GettingStarted/14-sampling/README.md**: Opdaterede det officielle sampling-dokumentationslink til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Opdaterede nutidsreferencer til "current MCP specification" og linket til Yderligere Ressourcer til 2025-11-25 (historiske SSE-udfasningsnoter beholdt for nøjagtighed)

#### Prøvevalidering mod nuværende SDK’er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` bestod uden typefejl — eksisterende `McpServer`/`StdioServerTransport` API’er forbliver gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Valideret i isoleret `.venv` med `mcp[cli]` (1.27.2); `py_compile` bestod og `FastMCP.list_tools()` returnerede korrekt `add` og `subtract` værktøjer
- Bekræftet at alle prøve-`@modelcontextprotocol/sdk` versionsintervaller (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løses rent til gældende `1.29.0` uden API-brud

#### Afhængigheds-pin-justering (lukkede versionshuller)

Opdaterede forældede SDK-pins så hver prøve følger den nuværende MCP-release, i overensstemmelse med repo-konventionen:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Opdaterede `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og opdaterede den forældede `"updated for MCP 2025-06-18"` pakke-beskrivelse til `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Opdaterede den eksakte pin `mcp==1.23.0` → `mcp>=1.26.0`; regenererede begge `uv.lock` filer (`uv lock`) så lockfiler løser til gældende `mcp 1.27.2` og bevarer synkronisering med manifests

#### Pensum Gap Analyse — Seneste Spec Feature Dækning

Bekræftede at pensum allerede dækker alle primitive introduceret/udvidet i MCP 2025-11-25, så ingen indholdsgab er tilbage:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL mode)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumenteret i 00-Introduction, 01-CoreConcepts, og 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentel, langkørende operationer)**: Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Dokumenteret i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhedsforstærkning & Afhængighedssårbarhedsrettelser

Kørte en fuld sikkerhedsgennemgang af alle afhængighedsmanifester og prøve-kildekoden, og rettede alle rapporterede npm advisories og et kodebaseret fund. Efter rettelse rapporterer `npm audit` **0 sårbarheder** i alle auditerede mapper.

#### npm Afhængighedssårbarheder (transitive) — Rettet

Auditerede alle 15 committed `package-lock.json` filer. Sårbarheder var begrænset til transitive afhængigheder trukket ind af MCP Inspector dev-tool, OpenAI klienten, og MCP SDK; alle er nu løst uden at bryde prøverne:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Opdaterede `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), hvilket fjernede bundtede `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws` advisories. Tilføjede en npm `overrides` indgang, der tvinger patched `shell-quote@1.8.4` for at eliminere den resterende kritiske advisory båret af `concurrently`; regenererede begge lockfiler (nu 0 sårbarheder)
- **03-GettingStarted/samples/typescript**: `npm audit fix` opdaterede transitiv `qs` (moderat) til en patched release
- **03-GettingStarted/samples/javascript**: `npm audit fix` opdaterede transitiv `hono` (moderat) til en patched release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` opdaterede transitiv `form-data` (høj) til en patched release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererede manglende `package-lock.json` så projektet kan reproduceres og auditeres (0 sårbarheder)

#### Kodebaseret Sikkerhedsrettelse (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernede `shell=True` fra `open_in_vscode` værktøjet. Den tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillod shell-metategn i en mappe-sti at blive fortolket af `cmd.exe` (kommandoinjektionsvektor). Det starter nu den løste `Code.exe` direkte med mappen som argument — uden shell — hvilket funktionelt er ækvivalent og sikkert

#### Python Afhængighedsrevision

- Auditerede alle Python kravsæt med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterede **ingen kendte sårbarheder** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` intervaller løses til aktuelle patched releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` markerede transitiv afhængighed **`werkzeug` 3.1.1** med tre `safe_join` Windows enhedsnavn DoS advisories — `CVE-2025-66221`, `CVE-2026-21860`, og `CVE-2026-27199` (alle rettet i 3.1.6). Tilføjede en eksplicit sikkerhedspin `werkzeug>=3.1.6` så patched release løses; verificerede at constraint løses rent med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnavns Rebranding

Opdaterede alt pensumindhold for at afspejle Microsofts produktrebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Opdaterede Discord community link
- **AGENTS.md**: Opdaterede Discord server reference
- **README.md**: Opdaterede teknologiekosystem referencer
- **study_guide.md**: Opdaterede case study referencer
- **05-AdvancedTopics/README.md**: Opdaterede Modul 5.13 titel og beskrivelse
- **05-AdvancedTopics/mcp-integration/README.md**: Opdaterede afsnitsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fuld modul titel og indholdsopdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Opdaterede krydsreference link
- **07-LessonsfromEarlyAdoption/README.md**: Opdaterede case studie referencer
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Opdaterede Sektion 9 overskrift, badges og kapabiliteter
- **08-BestPractices/README.md**: Opdaterede Discord community link
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Opdaterede Discord kanal reference
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Opdaterede modeludrulnings reference
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Opdaterede AI Services tabel
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Opdaterede ressource referencer

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Opdaterede hovedpensumreferencer  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Opdateret modultitel, oversigt og alle moduloverskrifter  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Opdateret titel, læringsmål, opsætningsinstruktioner og ressourcer  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Opdateret titel, læringsmål, MCP hosts tabel og krydsreferencer  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Opdateret titel, badges, forudsætninger og ressourcer  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Opdateret Agent Builder-referencer og feedback-link  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Opdaterede forudsætninger og udvidelsesreferencer  

---

## 11. april 2026

### Nyt Lektion, Dokumentationsrettelser og Afhængighedsopdateringer

#### Nyt Pensumindhold Tilføjet

**Modul 05 - Avancerede Emner**  
- **Lektion 5.17: Modstridende Multi-Agent Resonnement med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattende vejledning der dækker det modstridende debatmønster for multi-agent systemer  
  - Mermaid arkitekturdiagram: to agenter → delt MCP-server → debatudskrift → dommer → dom  
  - Delt MCP værktøjsserver (`web_search` + `run_python`) implementeret i Python og TypeScript  
  - Modstridende system-prompt (FOR / IMOD / Dommer) med eksplicitte krav til brug af værktøjer  
  - Debat-orkestrator i Python, TypeScript og C# som styrer runder og ruter argumenter  
  - MCP `ClientSession` tilslutning for orkestratoren til reelle værktøjskald  
  - Brugsscenario-tabel (hallucinationsdetektion, trusselmodellering, API design-gennemgang, faktatjek, teknologivalg)  
  - Sikkerhedsovervejelser: sandboxed eksekvering, validering af værktøjskald, ratebegrænsning, revisionslogning  
  - Struktureret øvelse med tre praktiske scenarier (kodegennemgang, arkitekturvalg, indholdsmoderering)  

#### Dokumentationsrettelser

**Modul 03 - Kom Godt I Gang**  
- **05-stdio-server/README.md**: Rettede ufuldstændigt TypeScript stdio-server eksempel — tilføjede manglende transportinstansiering (`new StdioServerTransport()`) og `server.connect(transport)` kald for at matche Python- og .NET-eksempler i samme sektion  
- **14-sampling/README.md**: Rettede slåfejl — ændret `"Sampling is an davanced features"` til `"Sampling is an advanced feature"`  

#### Opdateringer i Pensum

**Hoved README.md**  
- Tilføjede post 5.17 (Modstridende Multi-Agent Resonnement med MCP) til pensumtabellen med direkte link til den nye lektion  

**05-AdvancedTopics/README.md**  
- Tilføjede lektion 5.17 række til lektionslisten  

**study_guide.md**  
- Tilføjede emnet Modstridende Multi-Agent Resonnement til mindmap og prosabeschrivelsen af Avancerede Emner  

#### Kode- og Sikkerhedsrettelser

**Modul 05 - Modstridende Agenter (`mcp-adversarial-agents`)**  
- **Sikkerhedsrettelse — kommandoinjektion**: Erstattede `execSync` shell-interpolering med `execFile` + `promisify` i TypeScript `run_python` værktøjet, hvilket eliminerer kommandoinjektionsvektoren (LLM-styret kode sendes nu som et litteralt argv-element uden shell-involvering)  
- **MCP værktøjsløkke tilslutning**: Opdaterede Python-debatorkestratoren til at bruge `AsyncAnthropic` klient (erstattede blokerende sync `Anthropic`), sende en live `ClientSession` direkte til hver agent-turn, hente værktøjsdefinitioner via `session.list_tools()` hver runde, og dispatch `tool_use` blokke via `session.call_tool()` i en løkke indtil modellen udskriver et endeligt tekstsvar  

#### Afhængighedsopdateringer

- Opgraderede `hono` til 4.12.12 på tværs af flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Opgraderede `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker  
- Opgraderede `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows labs 3 og 4)  
- Opgraderede `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspector  

#### Oversættelser

- Synkroniserede oversættelser for 48+ sprog med de seneste kildeforandringer (i18n-opdatering)  

---

## 5. februar 2026

### Repositorieomfattende Validerings- og Navigationsforbedringer

#### Nyt Pensumindhold Tilføjet

**Modul 03 - Kom Godt I Gang**  
- **12-mcp-hosts/README.md**: Ny omfattende vejledning til opsætning af MCP hosts  
  - Konfigurationseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - JSON-konfigurationsskabeloner til alle store hosts  
  - Transporttype-sammenligningstabel (stdio, SSE/HTTP, WebSocket)  
  - Fejlfinding af almindelige forbindelsesproblemer  
  - Sikkerhedsbest practices for host-konfiguration  

- **13-mcp-inspector/README.md**: Ny fejlsøgningsvejledning til MCP Inspector  
  - Installationsmetoder (npx, npm global, fra kilde)  
  - Forbindelse til servere via stdio og HTTP/SSE  
  - Testværktøjer, ressourcer og prompt-workflows  
  - VS Code integration med MCP Inspector  
  - Almindelige fejlsøgningsscenarier med løsninger  

**Modul 04 - Praktisk Implementering**  
- **pagination/README.md**: Ny guide til implementering af pagination  
  - Cursor-baserede pagination mønstre i Python, TypeScript, Java  
  - Klientside-håndtering af pagination  
  - Cursor designstrategier (opake vs. strukturerede)  
  - Anbefalinger til optimering af ydeevne  

**Modul 05 - Avancerede Emner**  
- **mcp-protocol-features/README.md**: Ny dybdegående gennemgang af protokol-funktioner  
  - Implementering af progress-notifikationer  
  - Annulleringsmønstre for forespørgsler  
  - Resourcetemplates med URI-mønstre  
  - Server lifecycle management  
  - Kontrol af logningsniveau  
  - Fejlhåndteringsmønstre med JSON-RPC koder  

#### Navigationsrettelser (24+ filer opdateret)

**Hovedmodul README’er**  
 Nu linkes til både første lektion OG næste modul  

**02-Security Underfiler**  
- Alle 5 supplerende sikkerhedsdokumenter indeholder nu "Hvad er Næste" navigation:  

**09-CaseStudy Filer**  
- Alle case study-filer har nu sekventiel navigation:  

**10-StreamliningAI Labs**  
Tilføjet Hvad er Næste sektion til Modul 10 oversigt og Modul 11  

#### Kode- og Indholdskorrektioner

**SDK og Afhængighedsopdateringer**  
Fixede tom openai version til `^4.95.0`  
Opdaterede SDK fra `^1.8.0` til `>=1.26.0`  
Opdaterede mcp version pins til `>=1.26.0`  

**Kodekorrektioner**  
Rettede ugyldig model `gpt-4o-mini` til `gpt-4.1-mini`  

**Indholdskorrektioner**  
Rettede ødelink `READMEmd` → `README.md`  
Rettede pensumoverskrift `Module 1-3` → `Module 0-3`  
Rettede case-sensitiv sti  
Fjernet korrumperet duplikeret Case Study 5 indhold  

**Begyndervejledning Forbedringer**  
Tilføjede ordentlig introduktion, læringsmål og forudsætninger for begyndere  

#### Opdateringer i Pensum

**Hoved README.md**  
- Tilføjede poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) til pensumtabel  

**Modul README’er**  
Tilføjede lektioner 12 og 13 til lektionsliste  
Tilføjede Praktiske Guides sektion med pagination-link  
Tilføjede lektioner 5.15 (Custom Transport) og 5.16 (Protocol Features)  

**study_guide.md**  
- Opdaterede mindmap med alle nye emner: MCP Hosts Opsætning, MCP Inspector, Pagination Strategier, Protokol Funktioner Dybdedyk  

## 28. jan 2026

### MCP Specifikation 2025-11-25 Overensstemmelsesgennemgang

#### Forbedring af Kernekoncepter (01-CoreConcepts/)  
- **Ny Klient-Primitive - Roots**: Tilføjet omfattende dokumentation om Roots klient-primitive, som gør det muligt for servere at forstå filsystemgrænser og adgangstilladelser  
- **Værktøjsannoteringer**: Tilføjet dokumentation om værktøjsadfærdsannoteringer (`readOnlyHint`, `destructiveHint`) for bedre beslutningstagning ved værktøjsudførelse  
- **Værktøjskald i Sampling**: Opdateret Sampling dokumentation til at inkludere `tools` og `toolChoice` parametre for modelstyret værktøjskald under sampling-forespørgsler  
- **URL-tilstandsudløser**: Tilføjet dokumentation om URL-baseret fremkaldelse til serverinitierede eksterne weblink-interaktioner  
- **Tasks (Eksperimentelt)**: Tilføjet ny sektion der dokumenterer den eksperimentelle Tasks-funktion til holdbare udførelsesindpakninger og udskudt resultatindhentning  
- **Ikonunderstøttelse**: Noteret at værktøjer, ressourcer, resourcetemplates og prompts nu kan inkludere ikoner som ekstra metadata  

#### Dokumentationsopdateringer  
- **README.md**: Tilføjet MCP Specifikation 2025-11-25 versionsreference og forklaring af versionsstyring baseret på dato  
- **study_guide.md**: Opdateret pensumkort til at inkludere Tasks og Værktøjsannoteringer i Core Concepts sektion; opdateret dokumentets tidsstempel  

#### Specifikationsoverensstemmelsesverifikation  
- **Protokolversion**: Verificeret at al dokumentation refererer til gældende MCP Specifikation 2025-11-25  
- **Arkitekturjustering**: Bekræftet korrekt dokumentation af to-lags arkitektur (Data Layer + Transport Layer)  
- **Primitive Dokumentation**: Valideret serverprimitiver (Resources, Prompts, Tools) og klientprimitiver (Sampling, Elicitation, Logging, Roots)  
- **Transportmekanismer**: Verificeret korrekt dokumentation af STDIO og Streamable HTTP transport  
- **Sikkerhedsguider**: Bekræftet overensstemmelse med gældende MCP Security Best Practices dokumentation  

#### Centrale MCP 2025-11-25 Funktioner Dokumenteret  
- **OpenID Connect Discovery**: Autentificeringsserveropdagelse gennem OIDC  
- **OAuth Client ID Metadata Dokumenter**: Anbefalet klientregistreringsmekanisme  
- **JSON Schema 2020-12**: Standard dialekt for MCP skemadefinitioner  
- **SDK Tiering System**: Formaliserede krav til SDK funktionsunderstøttelse og vedligeholdelse  
- **Styringsstruktur**: Formaliserede arbejdsgrupper og interessegrupper i MCP governance  

### Stor Opdatering af Sikkerhedsdokumentation (02-Security/)

#### Integration af MCP Security Summit Workshop (Sherpa)  
- **Nyt Praktisk Træningsmateriale**: Tilføjet omfattende integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) på tværs af al sikkerhedsdokumentation  
- **Dækket Ekspedition Route**: Dokumenteret komplet lejr-til-lejr progression fra Base Camp til Summit  
- **OWASP Overensstemmelse**: Al sikkerhedsguidance kortlagt til OWASP MCP Azure Security Guide risici  

#### OWASP MCP Top 10 Integration  
- **Ny Sektion**: Tilføjet OWASP MCP Top 10 Sikkerhedsrisikotabel med Azure-mitigeringer til hoved-sikkerheds README  
- **Risikobaseret Dokumentation**: Opdateret mcp-security-controls-2025.md med OWASP MCP risikoreferencer for hvert sikkerhedsområde  
- **Referencearkitektur**: Linket til OWASP MCP Azure Security Guide referencearkitektur og implementeringsmønstre  

#### Opdaterede Sikkerhedsfiler  
- **README.md**: Tilføjet Sherpa Workshop oversigt, ekspedition route tabel, OWASP MCP Top 10 risikosammendrag og praktisk træningssektion  
- **mcp-security-controls-2025.md**: Opdateret header til februar 2026, tilføjet OWASP risikoreferencer (MCP01-MCP08), rettet versioninkonsistens i specifikation  
- **mcp-security-best-practices-2025.md**: Tilføjet Sherpa og OWASP ressourceafsnit, opdateret tidsstempel  
- **mcp-best-practices.md**: Tilføjet praktisk træningsafsnit med Sherpa og OWASP links  
- **azure-content-safety-implementation.md**: Tilføjet OWASP MCP06 reference, Sherpa Camp 3 tilpasning, og ekstra ressourceafsnit  

#### Nye Ressourcelinks Tilføjet  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuelle OWASP MCP risikosider (MCP01-MCP10)  

### Pensumomfattende MCP Specifikation 2025-11-25 Justering

#### Modul 03 - Kom Godt I Gang  
- **SDK Dokumentation**: Tilføjet Go SDK til officiel SDK-liste; opdateret alle SDK-referencer til at stemme overens med MCP Specifikation 2025-11-25  
- **Transportafklaring**: Opdateret STDIO og HTTP Streaming transportbeskrivelser med eksplicitte specifikationsreferencer  

#### Modul 04 - Praktisk Implementering  
- **SDK Opdateringer**: Tilføjet Go SDK; opdateret SDK-liste med specifikationsversionsreference  
- **Autorisation Spec**: Opdateret MCP Autorisationsspecifikation link til gældende 2025-11-25 version  

#### Modul 05 - Avancerede Emner  
- **Nye Funktioner**: Tilføjet note om nye MCP Specifikation 2025-11-25 funktioner (Tasks, Værktøjsannoteringer, URL Mode Elicitation, Roots)  
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop links til yderligere referencer  

#### Modul 06 - Community Bidrag  
- **SDK Liste**: Tilføjet Swift og Rust SDK’er; opdateret specifikationslink til 2025-11-25  
- **Spec Reference**: Opdateret MCP Specifikation link til direkte specifikations-URL  

#### Modul 07 - Lærdom fra Tidlig Adoption
- **Ressourceopdateringer**: Tilføjet MCP Specification 2025-11-25 link og OWASP MCP Top 10 til yderligere ressourcer

#### Modul 08 - Bedste Praksis
- **Spec Version**: Opdateret MCP Specification reference til 2025-11-25
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop til yderligere referencer

#### Modul 10 - Strømlining af AI Arbejdsgange
- **Badge Opdatering**: Ændret MCP versionsbadge fra SDK-version (1.9.3) til specifikationsversion (2025-11-25)
- **Ressourcelinks**: Opdateret MCP Specification link; tilføjet OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spec Reference**: Opdateret MCP Specification link til version 2025-11-25
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 til officielle ressourcer

## 18. december 2025

### Opdatering af Sikkerhedsdokumentation - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specifikationsversionsopdatering
- **Protokolversionsopdatering**: Opdateret til at referere til seneste MCP Specification 2025-11-25 (udgivet 25. november 2025)
  - Opdateret alle referencer til specifikationsversion fra 2025-06-18 til 2025-11-25
  - Opdateret dokumentdatoer fra 18. august 2025 til 18. december 2025
  - Verificeret at alle specifikations-URL’er peger på den aktuelle dokumentation
- **Indholdsvalidering**: Omfattende validering af sikkerhedsbedste praksis i forhold til de nyeste standarder
  - **Microsoft Sikkerhedsløsninger**: Verificeret gældende terminologi og links for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1 Sikkerhed**: Bekræftet overensstemmelse med de nyeste OAuth sikkerhedsbedste praksis
  - **OWASP Standarder**: Valideret at OWASP Top 10 for LLMs referencer forbliver aktuelle
  - **Azure Tjenester**: Verificeret alle Microsoft Azure dokumentationslinks og bedste praksis
- **Standardjustering**: Alle refererede sikkerhedsstandarder bekræftet aktuelle
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerheds- og compliance-rammer
- **Implementeringsressourcer**: Valideret alle implementeringsguide-links og ressourcer
  - Azure API Management autentifikationsmønstre
  - Microsoft Entra ID integrationsvejledninger
  - Azure Key Vault secrets management
  - DevSecOps pipelines og overvågningsløsninger

### Dokumentationskvalitetssikring
- **Specifikationsoverholdelse**: Sikret at alle obligatoriske MCP sikkerhedskrav (MUST/MUST NOT) stemmer overens med seneste specifikation
- **Ressourceaktualitet**: Verificeret alle eksterne links til Microsoft dokumentation, sikkerhedsstandarder og implementeringsvejledninger
- **Dækning af bedste praksis**: Bekræftet omfattende dækning af autentifikation, autorisation, AI-specifikke trusler, forsyningskædesikkerhed og virksomhedsmønstre

## 6. oktober 2025

### Udvidelse af Kom-i-gang Sektion – Avanceret Serverbrug & Simpel Autentifikation

#### Avanceret Serverbrug (03-GettingStarted/10-advanced)
- **Nyt Kapitel Tilføjet**: Introduceret en omfattende guide til avanceret MCP-serverbrug, der dækker både regelmæssig og lavniveau serverarkitektur.
  - **Regulær vs. Lavniveau Server**: Detaljeret sammenligning og kodeeksempler i Python og TypeScript for begge tilgange.
  - **Handler-Baseret Design**: Forklaring af handler-baseret værktøj/ressource/prompt management til skalerbare, fleksible serverimplementeringer.
  - **Praktiske Mønstre**: Virkelighedsnære scenarier hvor lavniveau servermønstre er fordelagtige til avancerede funktioner og arkitektur.

#### Simpel Autentifikation (03-GettingStarted/11-simple-auth)
- **Nyt Kapitel Tilføjet**: Trin-for-trin vejledning til implementering af simpel autentifikation i MCP-servere.
  - **Auth Begreber**: Klar forklaring af autentifikation vs. autorisation, og håndtering af legitimationsoplysninger.
  - **Grundlæggende Auth Implementering**: Middleware-baserede autentifikationsmønstre i Python (Starlette) og TypeScript (Express), med kodeeksempler.
  - **Transition til Avanceret Sikkerhed**: Vejledning i at starte med simpel auth og gå videre til OAuth 2.1 og RBAC, med referencer til avancerede sikkerhedsmoduler.

Disse tilføjelser giver praktisk, håndgribelig vejledning til at bygge mere robuste, sikre og fleksible MCP-serverimplementeringer, der forbinder grundlæggende koncepter med avancerede produktionsmønstre.

## 29. september 2025

### MCP Server Databaseintegrationslabs - Omfattende Praktisk Læringsforløb

#### 11-MCPServerHandsOnLabs - Nyt komplet kursus i databaseintegration
- **Fuldstændig 13-Lab Læringssti**: Tilføjet omfattende hands-on curriculum for opbygning af produktionsklare MCP-servere med PostgreSQL databaseintegration
  - **Virkelighedsnær Implementering**: Zava Retail analytics use case, der demonstrerer virksomheds-grade mønstre
  - **Struktureret Læringsprogression**:
    - **Labs 00-03: Fundamenter** - Introduktion, Kernearkitektur, Sikkerhed & Multi-Tenancy, Miljøopsætning
    - **Labs 04-06: Opbygning af MCP Server** - Databasedesign & Schema, MCP Server Implementering, Værktøjsudvikling  
    - **Labs 07-09: Avancerede Funktioner** - Semantisk søgeintegration, Test & Debugging, VS Code integration
    - **Labs 10-12: Produktion & Bedste Praksis** - Deploymentsstrategier, Overvågning & Observabilitet, Bedste Praksis & Optimering
  - **Enterprise Teknologier**: FastMCP framework, PostgreSQL med pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Avancerede Funktioner**: Row Level Security (RLS), semantisk søgning, multi-tenant dataadgang, vektor-embeddings, realtidsmonitorering

#### Terminologistandardisering - Modul til Lab Konvertering
- **Omfattende Dokumentationsopdatering**: Systematisk opdateret alle README-filer i 11-MCPServerHandsOnLabs til at bruge "Lab" terminologi i stedet for "Modul"
  - **Sektionoverskrifter**: Opdateret "What This Module Covers" til "What This Lab Covers" på tværs af alle 13 labs
  - **Indholdsbeskrivelse**: Ændret "This module provides..." til "This lab provides..." gennem dokumentationen
  - **Læringsmål**: Opdateret "By the end of this module..." til "By the end of this lab..."
  - **Navigationslinks**: Konverteret alle "Module XX:" referencer til "Lab XX:" i krydsreferencer og navigation
  - **Færdiggørelsessporing**: Opdateret "After completing this module..." til "After completing this lab..."
  - **Bevarede Tekniske Referencer**: Opretholdt Python-modulreferencer i konfigurationsfiler (fx `"module": "mcp_server.main"`)

#### Studieguideforbedring (study_guide.md)
- **Visuelt Curriculumkort**: Tilføjet ny sektion "11. Database Integration Labs" med omfattende visualisering af lab-struktur
- **Repository Struktur**: Opdateret fra ti til elleve hovedsektioner med detaljeret beskrivelse af 11-MCPServerHandsOnLabs
- **Læringsstivejledning**: Forbedret navigationsinstruktioner til at dække sektioner 00-11
- **Teknologidækning**: Tilføjet FastMCP, PostgreSQL, Azure services integrationsdetaljer
- **Læringsudbytte**: Fremhævet produktionsteknisk serverudvikling, databaseintegration-mønstre og virksomhedssikkerhed

#### Hoved-README Strukturforbedring
- **Lab-Baseret Terminologi**: Opdateret hoved-README.md i 11-MCPServerHandsOnLabs til konsekvent at bruge "Lab" struktur
- **Læringssti Organisering**: Klar progression fra grundlæggende koncepter til avanceret implementering og produktionsudrulning
- **Virkelighedsfokus**: Vægt på praktisk, hands-on læring med virksomheds-grade mønstre og teknologier

### Dokumentationskvalitet og Konsistensforbedringer
- **Hands-On Læring Fokus**: Forstærket praktisk, lab-baseret tilgang i hele dokumentationen
- **Virksomhedsmønstre Fokus**: Fremhævet produktionsklare implementeringer og virksomhedssikkerhedsovervejelser
- **Teknologi Integration**: Omfattende dækning af moderne Azure-tjenester og AI integrationsmønstre
- **Læringsprogression**: Klar, struktureret sti fra grundlæggende koncepter til produktionsudrulning

## 26. september 2025

### Case Studier Forbedring - GitHub MCP Registry Integration

#### Case Studier (09-CaseStudy/) - Fokus på Økosystemudvikling
- **README.md**: Stor udvidelse med omfattende GitHub MCP Registry case studie
  - **GitHub MCP Registry Case Studie**: Nyt omfattende case studie der undersøger GitHubs MCP Registry lancering i september 2025
    - **Problem Analyse**: Detaljeret gennemgang af fragmenterede MCP server discovery og udrulningsudfordringer
    - **Løsningsarkitektur**: GitHubs centraliserede registry-tilgang med et-klik VS Code installation
    - **Forretningsmæssig Indvirkning**: Målbare forbedringer i udvikler onboarding og produktivitet
    - **Strategisk Værdi**: Fokus på modulær agentudrulning og tværværktøjs interoperability
    - **Økosystemudvikling**: Positionering som grundlæggende platform for agentisk integration
  - **Udvidet Case Studie Struktur**: Opdateret alle syv case studier med ensartet formatering og omfattende beskrivelser
    - Azure AI Rejseagenter: Fokus på flere agenters orkestrering
    - Azure DevOps Integration: Fokus på workflow-automatisering
    - Realtids Dokumenthentning: Python konsolklient implementering
    - Interaktiv Studievej Generator: Chainlit konversationel webapp
    - In-Editor Dokumentation: VS Code og GitHub Copilot integration
    - Azure API Management: Virksomheds-API integrationsmønstre
    - GitHub MCP Registry: Økosystemudvikling og fællesskabsplatform
  - **Omfattende Konklusion**: Omskrevet konklusionsafsnit der fremhæver syv case studier på tværs af MCP implementeringsdimensioner
    - Virksomhedsintegration, Multi-Agent Orkestrering, Udviklerproduktivitet
    - Økosystemudvikling, Uddannelsesapplikationer kategorisering
    - Forbedret indsigt i arkitektur-mønstre, implementeringsstrategier og bedste praksis
    - Vægt på MCP som moden, produktionsklar protokol

#### Studieguide Opdateringer (study_guide.md)
- **Visuelt Curriculumkort**: Opdateret mindmap til at inkludere GitHub MCP Registry i Case Studies sektionen
- **Case Studies Beskrivelse**: Forbedret fra generiske beskrivelser til detaljeret gennemgang af syv omfattende case studier
- **Repository Struktur**: Opdateret sektion 10 til at afspejle omfattende case studie dækning med specifikke implementeringsdetaljer
- **Changelog Integration**: Tilføjet 26. september 2025 post, der dokumenterer tilføjelse af GitHub MCP Registry og case studie forbedringer
- **Dato Opdateringer**: Opdateret sidens fodertidspunkt til at afspejle seneste revision (26. september 2025)

### Dokumentationskvalitetsforbedringer
- **Konsistensforbedring**: Standardiseret case studie formatering og struktur på tværs af alle syv eksempler
- **Omfattende Dækning**: Case studier dækker nu virksomhed, udviklerproduktivitet, og økosystemudviklingsscenarier
- **Strategisk Positionering**: Øget fokus på MCP som grundlæggende platform til agentbaseret systemudrulning
- **Ressourceintegration**: Opdaterede yderligere ressourcer til at inkludere GitHub MCP Registry link

## 15. september 2025

### Avancerede Emner Udvidelse - Tilpassede Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Ny avanceret implementeringsvejledning
- **README.md**: Fuldstændig implementeringsvejledning for tilpassede MCP transportmekanismer
  - **Azure Event Grid Transport**: Omfattende serverless event-drevet transportimplementering
    - C#, TypeScript og Python eksempler med Azure Functions integration
    - Event-drevne arkitektur-mønstre til skalerbare MCP løsninger
    - Webhook modtagere og push-baseret beskedhåndtering
  - **Azure Event Hubs Transport**: High-throughput streaming transportimplementering
    - Realtidsstreaming kapabiliteter til lav-latens scenarier
    - Partitioneringsstrategier og checkpoint-styring
    - Batching af beskeder og performanceoptimering
  - **Enterprise Integrationsmønstre**: Produktionsklare arkitektur-eksempler
    - Distribueret MCP behandling på tværs af flere Azure Functions
    - Hybrid transportarkitekturer kombinerende flere transporttyper
    - Beskedholdbarhed, pålidelighed og fejlhåndteringsstrategier
  - **Sikkerhed og Overvågning**: Azure Key Vault integration og observabilitetsmønstre
    - Managed identity autentifikation og mindste privilegfokus
    - Application Insights telemetri og performanceovervågning
    - Kredsløbsafbrydere og fejltolerance mønstre
  - **Testrammer**: Omfattende teststrategier for tilpassede transports
    - Unit tests med test doubles og mock frameworks
    - Integrationstests med Azure Test Containers
    - Performance og load test overvejelser

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Fremvoksende AI disciplin
- **README.md**: Omfattende udforskning af context engineering som et fremvoksende felt
  - **Kerneprincipper**: Fuld kontekstdeling, beslutningsbevidsthed og kontekstvinduestyring
  - **MCP Protokoltilpasning**: Hvordan MCP-design adresserer context engineering udfordringer
    - Begrænsninger i kontekstvindue og progressive loading strategier
    - Relevansbestemmelse og dynamisk kontekstopsamling
    - Multimodal konteksthåndtering og sikkerhedsovervejelser
  - **Implementeringstilgange**: Single-threaded vs. multi-agent arkitekturer
    - Context chunking og prioriteringsteknikker
    - Progressiv kontekstindlæsning og komprimeringsstrategier
    - Lagdelt konteksttilgang og optimeret hentning
  - **Målerammeværk**: Fremvoksende metrikker til evaluering af konteksteffektivitet
    - Inputeffektivitet, ydeevne, kvalitet og brugeroplevelsesdimensioner
    - Eksperimentelle tilgange til kontekstoptimering
    - Fejlanalyse og forbedringsmetodologier

#### Curriculum Navigationsopdateringer (README.md)
- **Forbedret Modulstruktur**: Opdateret kursustabel til at inkludere nye avancerede emner
  - Tilføjet Context Engineering (5.14) og Custom Transport (5.15) poster
  - Konsistent formatering og navigation links på tværs af moduler
  - Opdaterede beskrivelser for at afspejle aktuel indholdsomfang

### Biblioteksstrukturforbedringer
- **Navnestandardisering**: Omdøbt "mcp transport" til "mcp-transport" for konsistens med øvrige avancerede emne-mapper
- **Indholdsorganisering**: Alle 05-AdvancedTopics mapper følger nu ensartet navngivningsmønster (mcp-[emne])

### Dokumentationskvalitetsforbedringer
- **MCP Specifikationsjustering**: Alt nyt indhold refererer til nuværende MCP Specification 2025-06-18
- **Fleresprogede Eksempler**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Enterprise Fokus**: Produktionsklare mønstre og Azure cloud-integration gennem hele forløbet  
- **Visuel Dokumentation**: Mermaid-diagrammer til arkitektur- og flowvisualisering  

## 18. august 2025

### Omfattende Dokumentationsopdatering - MCP 2025-06-18 Standarder

#### MCP Sikkerheds Best Practices (02-Security/) - Fuldstændig Modernisering  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fuldt genskrevet i overensstemmelse med MCP Specification 2025-06-18  
  - **Obligatoriske Krav**: Tilføjet eksplicitte MÅ/MÅ IKKE krav fra den officielle specifikation med klare visuelle indikatorer  
  - **12 Kerne Sikkerhedspraksisser**: Omstruktureret fra 15-punkts liste til omfattende sikkerhedsområder  
    - Token Sikkerhed & Autentifikation med integration af ekstern identitetsudbyder  
    - Sessionshåndtering & Transport Sikkerhed med kryptografiske krav  
    - AI-Specifik Trusselbeskyttelse med Microsoft Prompt Shields integration  
    - Adgangskontrol & Rettigheder med princippet om mindst privilegium  
    - Indholdsikkerhed & Overvågning med Azure Content Safety integration  
    - Leverandørkædesikkerhed med omfattende komponentverifikation  
    - OAuth Sikkerhed & Forebyggelse af Confused Deputy ved PKCE-implementering  
    - Hændelsesrespons & Genopretning med automatiserede funktionaliteter  
    - Overholdelse & Styring med regulatorisk overensstemmelse  
    - Avancerede Sikkerhedskontroller med zero trust arkitektur  
    - Microsoft Sikkerhedsøkosystemintegration med omfattende løsninger  
    - Kontinuerlig Sikkerhedsudvikling med adaptive praksisser  
  - **Microsoft Sikkerhedsløsninger**: Forbedret integrationsvejledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security  
  - **Implementeringsressourcer**: Kategoriserede omfattende ressourcelinks efter officiel MCP dokumentation, Microsoft sikkerhedsløsninger, sikkerhedsstandarder og implementeringsvejledninger  

#### Avancerede Sikkerhedskontroller (02-Security/) - Enterprise Implementering  
- **MCP-SECURITY-CONTROLS-2025.md**: Fuldstændig gennemgang med enterprise-sikkerhedsramme  
  - **9 Omfattende Sikkerhedsområder**: Udvidet fra basale kontroller til detaljeret enterprise-ramme  
    - Avanceret Autentifikation & Autorisation med Microsoft Entra ID integration  
    - Token Sikkerhed & Anti-Passthrough-kontroller med omfattende validering  
    - Sessionssikkerhedskontroller med forebyggelse af kapring  
    - AI-Specifikke sikkerhedskontroller med forebyggelse mod prompt injection og tool-forgiftning  
    - Forebyggelse af Confused Deputy-angreb med OAuth proxy-sikkerhed  
    - Tool-eksekveringssikkerhed med sandboxing og isolation  
    - Leverandørkædesikkerhedskontroller med afhængighedsverifikation  
    - Overvågnings- & detektionskontroller med SIEM-integration  
    - Hændelsesrespons & genopretning med automatiserede funktioner  
  - **Implementeringseksempler**: Tilføjede detaljerede YAML-konfigurationsblokke og kodeeksempler  
  - **Microsoft Løsningsintegration**: Omfattende dækning af Azure sikkerhedstjenester, GitHub Advanced Security og enterprise identitetsstyring  

#### Avancerede Emner Sikkerhed (05-AdvancedTopics/mcp-security/) - Produktionsklar Implementering  
- **README.md**: Fuldt genskrevet for enterprise sikkerhedsimplementering  
  - **Nuværende Specifikationsoverensstemmelse**: Opdateret til MCP Specification 2025-06-18 med obligatoriske sikkerhedskrav  
  - **Forbedret Autentifikation**: Microsoft Entra ID integration med omfattende .NET og Java Spring Security eksempler  
  - **AI Sikkerhedsintegration**: Implementering af Microsoft Prompt Shields og Azure Content Safety med detaljerede Python eksempler  
  - **Avanceret Trusselsafværgelse**: Omfattende implementeringseksempler for  
    - Forebyggelse af Confused Deputy-angreb med PKCE og brugersamtykkevalidering  
    - Forebyggelse af token-passthrough med publikumsvalidering og sikker tokenhåndtering  
    - Forebyggelse af session kapring med kryptografisk binding og adfærdsanalyse  
  - **Enterprise Sikkerhedsintegration**: Azure Application Insights overvågning, trusseldetektionspipelines og leverandørkædesikkerhed  
  - **Implementeringstjekliste**: Klare obligatoriske vs. anbefalede sikkerhedskontroller med Microsoft sikkerhedsøkosystemfortrin  

### Dokumentationskvalitet & Standardoverensstemmelse  
- **Specifikationsreferencer**: Opdateret alle referencer til nuværende MCP Specification 2025-06-18  
- **Microsoft Sikkerhedsøkosystem**: Forbedret integrationsvejledning i hele sikkerhedsdokumentationen  
- **Praktisk Implementering**: Tilføjet detaljerede kodeeksempler i .NET, Java og Python med enterprise-mønstre  
- **Ressourceorganisering**: Omfattende kategorisering af officiel dokumentation, sikkerhedsstandarder og implementeringsvejledninger  
- **Visuelle Indikatorer**: Klar markering af obligatoriske krav vs. anbefalede praksisser  

#### Kernekoncepter (01-CoreConcepts/) - Fuldt Moderniseret  
- **Protokolversionsopdatering**: Opdateret referencer til nuværende MCP Specification 2025-06-18 med datobaseret versionsstyring (YYYY-MM-DD format)  
- **Arkitekturforfining**: Forbedrede beskrivelser af Hosts, Clients og Servers for at afspejle nuværende MCP arkitekturmodeller  
  - Hosts nu klart defineret som AI-applikationer, der koordinerer flere MCP klientforbindelser  
  - Clients beskrevet som protokolforbindere, der opretholder ene-til-ene serverrelationer  
  - Servers forbedret med lokale vs. fjerndistributionsscenarier  
- **Primitiv Omstrukturering**: Fuldstændig gennemgang af server- og klientprimitiver  
  - Server Primitiver: Ressourcer (datakilder), Prompter (skabeloner), Tools (eksekverbare funktioner) med detaljerede forklaringer og eksempler  
  - Klient Primitiver: Sampling (LLM fuldførelser), Elicitation (brugerinput), Logging (fejlfinding/overvågning)  
  - Opdateret med nuværende  */list, */get og */call metode-mønstre for opdagelse, hentning og eksekvering  
- **Protokolarkitektur**: Introduceret to-lags arkitekturmodel  
  - Datalag: JSON-RPC 2.0 fundament med livscyklusstyring og primitivhåndtering  
  - Transportlag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer  
- **Sikkerhedsramme**: Omfattende sikkerhedsprincipper inklusiv eksplicit brugeraccept, dataprivatlivsbeskyttelse, toolsikkerhed ved eksekvering og transportsikkerhed  
- **Kommunikationsmønstre**: Opdaterede protokolmeddelelser til at vise initialisering, opdagelse, eksekvering og notifikationsflows  
- **Kodeeksempler**: Opfriskede multi-sprogseksempler (.NET, Java, Python, JavaScript) for at afspejle nuværende MCP SDK mønstre  

#### Sikkerhed (02-Security/) - Omfattende Sikkerhedsgennemgang  
- **Standardoverensstemmelse**: Fuld overensstemmelse med MCP Specification 2025-06-18 sikkerhedskrav  
- **Autentifikationsevolution**: Dokumenteret udvikling fra tilpassede OAuth-servere til delegation af ekstern identitetsudbyder (Microsoft Entra ID)  
- **AI-Specifik Trusselsanalyse**: Forbedret dækning af moderne AI angrebsvektorer  
  - Detaljerede prompt injection angrebsscenarier med virkelighedsnære eksempler  
  - Tool-forgiftning mekanismer og "rug pull"-angrebsmønstre  
  - Context window forgiftning og modelforvirringsangreb  
- **Microsoft AI Sikkerhedsløsninger**: Omfattende dækning af Microsoft sikkerhedsøkosystem  
  - AI Prompt Shields med avanceret detektion, spotlighting og delimiter teknikker  
  - Azure Content Safety integrationsmønstre  
  - GitHub Advanced Security til leverandørkædebeskyttelse  
- **Avanceret Trusselsafværgelse**: Detaljerede sikkerhedskontroller for  
  - Sessionkapring med MCP-specifikke angrebsscenarier og kryptografiske session ID-krav  
  - Confused deputy-problemer i MCP proxy-scenarier med eksplicitte samtykkekrav  
  - Token passthrough sårbarheder med obligatoriske valideringskontroller  
- **Leverandørkædesikkerhed**: Udvidet dækning af AI leverandørkæde inklusive foundation modeller, embedding tjenester, context providers og tredjeparts API'er  
- **Foundation Security**: Forbedret integration med enterprise sikkerhedsmønstre inklusive zero trust arkitektur og Microsoft sikkerhedsøkosystem  
- **Ressourceorganisering**: Kategoriserede omfattende ressourcelinks efter type (Officielle Docs, Standarder, Forskning, Microsoft Løsninger, Implementeringsvejledninger)  

### Dokumentationskvalitetsforbedringer  
- **Strukturerede Læringsmål**: Forbedrede læringsmål med specifikke, handlingsrettede resultater  
- **Krydsreferencer**: Tilføjede links mellem relaterede sikkerheds- og kernekoncept-emner  
- **Aktuel Information**: Opdateret alle dato- og specifikationsreferencer til aktuelle standarder  
- **Implementeringsvejledning**: Tilføjet specifikke, handlingsorienterede implementeringsanvisninger i begge sektioner  

## 16. juli 2025

### README og Navigationsforbedringer  
- Fuldstændig redesign af curriculum navigation i README.md  
- Udskiftede `<details>` tags med mere tilgængeligt tabelbaseret format  
- Oprettet alternative layoutmuligheder i ny "alternative_layouts" mappe  
- Tilføjet kortbaserede, fanebaserede og akkordeon-stil navigationseksempler  
- Opdateret afsnit om repositoriestruktur til at inkludere alle nyeste filer  
- Forbedret afsnit "How to Use This Curriculum" med klare anbefalinger  
- Opdateret MCP specifikationslinks til korrekte URL’er  
- Tilføjet Context Engineering sektion (5.14) til curriculum strukturen  

### Studieguide Opdateringer  
- Fuldstændigt revideret studieguide for overensstemmelse med aktuel repositoriestruktur  
- Tilføjet nye sektioner for MCP Clients og Tools, samt Populære MCP Servers  
- Opdateret Visuel Curriculum Kort til nøjagtigt at afspejle alle emner  
- Forbedrede beskrivelser af Avancerede Emner til at dække alle specialiserede områder  
- Opdateret Case Studies sektion med faktiske eksempler  
- Tilføjet denne omfattende changelog  

### Community Bidrag (06-CommunityContributions/)  
- Tilføjet detaljeret information om MCP servers til billedgenerering  
- Tilføjet omfattende afsnit om brug af Claude i VSCode  
- Tilføjet Cline terminal klientopsætning og brugsanvisning  
- Opdateret MCP klientsektion til at inkludere alle populære klientmuligheder  
- Forbedret bidragseksempler med mere nøjagtige kodesamples  

### Avancerede Emner (05-AdvancedTopics/)  
- Organiseret alle specialiserede emne-mapper med konsekvent navngivning  
- Tilføjet materialer og eksempler om context engineering  
- Tilføjet dokumentation for Foundry agent integration  
- Forbedret Entra ID sikkerhedsintegrationsdokumentation  

## 11. juni 2025

### Første Version  
- Udgivet første version af MCP for Beginners curriculum  
- Oprettet basisstruktur for alle 10 hovedsektioner  
- Implementeret Visuelt Curriculum Kort til navigation  
- Tilføjet indledende prøveprojekter i flere programmeringssprog  

### Kom Godt I Gang (03-GettingStarted/)  
- Oprettet første serverimplementeringseksempler  
- Tilføjet vejledning til klientudvikling  
- Inkluderet LLM klientintegrationsinstruktioner  
- Tilføjet VS Code integrationsdokumentation  
- Implementeret Server-Sent Events (SSE) servereksempler  

### Kernekoncepter (01-CoreConcepts/)  
- Tilføjet detaljeret forklaring af klient-server arkitektur  
- Oprettet dokumentation om protokolkomponenter  
- Dokumenteret messagingmønstre i MCP  

## 23. maj 2025

### Repositoriestruktur  
- Initialiseret repository med grundlæggende mappestruktur  
- Oprettet README-filer for hver hovedsektion  
- Sat op oversættelsesinfrastruktur  
- Tilføjet billedelementer og diagrammer  

### Dokumentation  
- Oprettet indledende README.md med curriculum oversigt  
- Tilføjet CODE_OF_CONDUCT.md og SECURITY.md  
- Sat op SUPPORT.md med vejledning til hjælp  
- Oprettet foreløbig studieguide struktur  

## 15. april 2025

### Planlægning og Rammeværk  
- Indledende planlægning for MCP for Beginners curriculum  
- Defineret læringsmål og målgruppe  
- Skitseret 10-sektions struktur af curriculum  
- Udviklet konceptuel ramme for eksempler og case studier  
- Oprettet første prototypeeksempler for kernekoncepter

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->