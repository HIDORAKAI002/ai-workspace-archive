# ChangeLog: MCP för nybörjare-kurrikulum

Detta dokument tjänar som en logg för alla betydande ändringar gjorda i Model Context Protocol (MCP) för nybörjare-kurrikulumet. Ändringarna dokumenteras i omvänd kronologisk ordning (nyaste ändringarna först).

## 24 juni, 2026

### Ny lektion: Använda MCP i Copilot-appen

- [Verktygssektion](./12-tooling/README.md) Lagt till verktygssektion.
- [MCP i Copilot-appen](./12-tooling/01-copilot-app/README.md)

## 16 juni, 2026

### MCP Specifikationsjustering & Exempelvalidering

Validerade kurrikulumet mot den aktuella **MCP Specifikationen 2025-11-25** och de senaste officiella SDK:erna, korrigerade sedan kvarvarande inaktuella specifikationsreferenser och bekräftade att kärnproverna fortfarande byggs och körs.

#### Specifikationsversionskorrigeringar (2025-06-18 / 2025-03-26 → 2025-11-25)

Uppdaterade engelskt innehåll där det fortfarande hävdades att en äldre specifikationsrevidering var den *aktuella/senaste* standarden, och pekade om länkar till de kanoniska `modelcontextprotocol.io` specifikationsvägarna:
- **05-AdvancedTopics/mcp-security/README.md**: Uppdaterade banderollen "Current Standard", introduktionen, rubriken för kärnsäkerhetsprinciper, rubriken för obligatoriska krav, Microsoft Entra ID-sektionen, Referenser & Resurslänkar samt avslutande säkerhetsanmärkning (8 referenser) till 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Uppdaterade länken till ytterligare resurser för specifikationen och banderollen "Current Standard" till 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Ersatte den utgångna `2025-03-26` länken för säkerhet och förtroende med den aktuella 2025-11-25 sidan för bästa säkerhetspraxis
- **03-GettingStarted/14-sampling/README.md**: Uppdaterade den officiella samplingdokumentationslänken till 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Uppdaterade nuvarande-tidsformen "current MCP specification" referensen och länken till ytterligare resurser för specifikationen till 2025-11-25 (historiska SSE-avvecklingsanteckningar lämnades intakta för noggrannhet)

#### Exempelvalidering mot aktuella SDK:er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passerade utan typerrors — befintliga `McpServer`/`StdioServerTransport` API:er förblir giltiga
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validerad i en isolerad `.venv` med `mcp[cli]` (1.27.2); `py_compile` passerade och `FastMCP.list_tools()` returnerade korrekt verktygen `add` och `subtract`
- Bekräftade att alla exempel `@modelcontextprotocol/sdk` versionsintervall (`>=1.26.0` / `^1.26.0` / `^1.27.0`) löses utan problem till nuvarande `1.29.0` utan API-brott

#### Justering av beroendepinnar (stängning av versionsglapp)

Uppdaterade föråldrade SDK-pinnar så att varje exempel följer den aktuella MCP-utgåvan, i linje med repokonsistens:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Uppdaterade `@modelcontextprotocol/sdk` från `^1.8.0` → `>=1.26.0` och uppdaterade den inaktuella paketbeskrivningen `"updated for MCP 2025-06-18"` till `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** och **lab4/code/github_mcp_server/pyproject.toml**: Uppgraderade den exakta pinnen `mcp==1.23.0` → `mcp>=1.26.0`; regenererade båda `uv.lock`-filer (`uv lock`) så att låsfilerna löser till aktuella `mcp 1.27.2` och håller sig synkroniserade med manifesten

#### Gap-analys av kurrikulum — Senaste spec-funktionsomfång

Verifierade att kurrikulum redan täcker alla primitiva funktioner införda/utökade i MCP 2025-11-25, så inga innehållsglapp återstår:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-läge)**: Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumenterat i 00-Introduction, 01-CoreConcepts, och 05-AdvancedTopics/mcp-root-contexts
- **Uppgifter (experimentella, långvariga operationer)**: Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Verktygskommentarer** (`readOnlyHint` / `destructiveHint`): Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features

### Säkerhetsförstärkning & Åtgärd av Beroende-sårbarheter

Körde en fullständig säkerhetsgenomgång av varje beroendemanifest och källkodsexempel och åtgärdade därefter alla rapporterade npm-rådgivningar och ett säkerhetsfynd i koden. Efter rättelse rapporterar `npm audit` **0 sårbarheter** i varje granskad katalog.

#### npm Beroendesårbarheter (transitiva) — Fixade

Granskade alla 15 incheckade `package-lock.json`-filer. Sårbarheterna begränsades till transitiva beroenden från MCP Inspector-utvecklingsverktyget, OpenAI-klienten och MCP SDK; alla är nu lösta utan att bryta exemplen:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** och **lab3/code/weather_mcp/inspector**: Uppdaterade `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), vilket rensade de bundlade `ajv`, `brace-expansion`, `diff`, `path-to-regexp` och `ws` rådgivningarna. Lade till en npm `overrides` post som tvingar den patchade `shell-quote@1.8.4` för att eliminera kvarvarande kritisk rådgivning från `concurrently`; regenererade båda låsfilerna (nu 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uppdaterade den transitiva `qs` (medelhög) till en patchad version
- **03-GettingStarted/samples/javascript**: `npm audit fix` uppdaterade den transitiva `hono` (medelhög) till en patchad version
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uppdaterade den transitiva `form-data` (hög) till en patchad version
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererade den saknade `package-lock.json` så att projektet är reproducerbart och granskningsbart (0 sårbarheter)

#### Säkerhetsfix i kodenivå (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tog bort `shell=True` från `open_in_vscode` verktyget. Den tidigare `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillät shell-metatecken i en mappsökväg att tolkas av `cmd.exe` (kommando-injektionsvektor). Den startar nu den upplösta `Code.exe` direkt med mappen som argument — utan shell — vilket är funktionellt ekvivalent och säkert

#### Python Beroendegranskning

- Genomlyste varje Python-kravssats med `pip-audit`. `05-AdvancedTopics` och `03-GettingStarted/samples/python` rapporterade **inga kända sårbarheter** (deras `mcp` / `httpx` / `pydantic` / `python-dotenv` intervall löses till aktuella patchade versioner)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flaggade det transitiva beroendet **`werkzeug` 3.1.1** med tre `safe_join` Windows-enhetsnamns DoS-rådgivningar — `CVE-2025-66221`, `CVE-2026-21860`, och `CVE-2026-27199` (alla fixade i 3.1.6). Lade till en explicit säkerhetstagg `werkzeug>=3.1.6` så att den patchade versionen löses; verifierade att det löser felfritt med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnamnsomvandling

Uppdaterade allt kurrikulinnehåll för att spegla Microsofts produktomprofilering:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Uppdaterade Discord-communitylänk
- **AGENTS.md**: Uppdaterade Discord-serverreferens
- **README.md**: Uppdaterade teknologi-ekosystemreferenser
- **study_guide.md**: Uppdaterade fallstudie-referenser
- **05-AdvancedTopics/README.md**: Uppdaterade Modul 5.13 titel och beskrivning
- **05-AdvancedTopics/mcp-integration/README.md**: Uppdaterade avsnittsrubrik och beskrivning
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fullständig uppdatering av modultitel och innehåll
- **05-AdvancedTopics/mcp-security-entra/README.md**: Uppdaterade korsreferenslänk
- **07-LessonsfromEarlyAdoption/README.md**: Uppdaterade fallstudie-referenser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Uppdaterade rubrik i Sektion 9, märken och kapabiliteter
- **08-BestPractices/README.md**: Uppdaterade Discord-communitylänk
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Uppdaterade Discord-kanalreferens
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Uppdaterade modellimplementeringsreferens
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Uppdaterade AI-tjänsttabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Uppdaterade resursreferenser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension för VS Code
- **README.md**: Uppdaterade huvudreferenser i kurrikulumen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uppdaterade modultitel, översikt och alla modulinnehållsrubriker
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uppdaterade titel, lärandemål, installationsinstruktioner, och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uppdaterade titel, lärandemål, MCP-hoststabell och korsreferenser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uppdaterade titel, märken, förutsättningar och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uppdaterade Agent Builder referenser och feedbacklänk
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uppdaterade förutsättningar och extensionsreferenser

---

## 11 april, 2026

### Ny lektion, dokumentationsfixar och beroendeuppdateringar

#### Nytt kurrikulinnehåll tillagt

**Modul 05 - Avancerade ämnen**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattande guide som täcker det adversariella debattmönstret för multi-agent system
  - Mermaid-arkitekturdiagram: två agenter → delad MCP-server → debattutskrift → domare → domslut
  - Delad MCP verktygsserver (`web_search` + `run_python`) implementerad i Python och TypeScript
  - Motstående systemuppmaningar (FÖR / MOT / Domare) med explicita verktygsanvändningskrav
  - Debattarrangör i Python, TypeScript och C# som hanterar omgångar och routar argument
  - MCP `ClientSession` koppling för orkestratorn till riktiga verktygsanrop
  - Användningsfallstabell (hallucinationsdetektering, hotmodellering, API-designgranskning, faktakontroll, teknikval)
  - Säkerhetsaspekter: sandboxad exekvering, validering av verktygsanrop, hastighetsbegränsning, revisionsloggning
  - Strukturerad övning med tre praktiska scenarier (kodgranskning, arkitekturbeslut, innehållsmoderering)

#### Dokumentationsfixar

**Modul 03 - Kom igång**
- **05-stdio-server/README.md**: Fixade ofullständigt TypeScript stdio-serverexempel — lade till saknad transportinstansiering (`new StdioServerTransport()`) och `server.connect(transport)` anrop för att matcha Python- och .NET-exemplen i samma avsnitt
- **14-sampling/README.md**: Fixade skrivfel — rättade `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Kurrikulumuppdateringar

**Huvud README.md**
- Lade till post 5.17 (Adversarial Multi-Agent Reasoning med MCP) i kurrikulums-tabellen med direktlänk till den nya lektionen

**05-AdvancedTopics/README.md**
- Lade till Lektion 5.17-rad i lektionstabellen

**study_guide.md**
- Lade till Adversarial Multi-Agent Reasoning-ämnet i tankekartan och prosabeskrivningen för Avancerade Ämnen

#### Kod- och säkerhetsfixar

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Säkerhetsfix — kommandoinjektion**: Ersatte `execSync` skalinterpolering med `execFile` + `promisify` i TypeScript-verktyget `run_python`, vilket eliminerade kommandoinjektionsytan (LLM-styrd kod skickas nu som ett bokstavligt argv-element utan inblandning av skal)
- **MCP verktyg slinga koppling**: Uppdaterade Python-debattorkestratorn till att använda `AsyncAnthropic` klient (ersätter blockerande synk `Anthropic`), skicka en live `ClientSession` direkt till varje agentbeslut, hämta verktygsdefinitioner via `session.list_tools()` varje varv, och skicka `tool_use` block via `session.call_tool()` i en slinga tills modellen genererar ett slutligt textrespons

#### Uppdateringar av beroenden

- Uppgraderade `hono` till 4.12.12 i flera paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Uppgraderade `@hono/node-server` från 1.19.11 till 1.19.13 i TypeScript-paket
- Uppgraderade `cryptography` från 46.0.5 till 46.0.7 i Python-paket (10-StreamliningAIWorkflows labbar 3 och 4)
- Uppgraderade `lodash` från 4.17.23 till 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Översättningar

- Synkroniserade översättningar för 48+ språk med senaste källändringar (i18n-uppdatering)

---

## 5 februari 2026

### Förbättringar i validering och navigation i hela repot

#### Nytt kursinnehåll tillagt

**Modul 03 - Kom igång**
- **12-mcp-hosts/README.md**: Ny omfattande guide för uppsättning av MCP-hosts
  - Konfigurationsexempel för Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurationstemplat för alla stora hosts
  - Jämförelsetabell för transporttyper (stdio, SSE/HTTP, WebSocket)
  - Felsökning av vanliga anslutningsproblem
  - Säkerhetsbästa praxis för host-konfiguration

- **13-mcp-inspector/README.md**: Ny felsökningsguide för MCP Inspector
  - Installationsmetoder (npx, npm globalt, från källkod)
  - Anslutning till servrar via stdio och HTTP/SSE
  - Testverktyg, resurser och promptarbetsflöden
  - Integration med VS Code och MCP Inspector
  - Vanliga felsökningsfall med lösningar

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny guide för paginering
  - Cursor-baserade pagineringsmönster i Python, TypeScript, Java
  - Klientsidans pagineringhantering
  - Strategier för cursor-design (opaka vs strukturerade)
  - Prestandaoptimeringsrekommendationer

**Modul 05 - Avancerade ämnen**
- **mcp-protocol-features/README.md**: Ny djupdykning i protokollfunktioner
  - Implementering av framstegsföljningar (progress notifications)
  - Mönster för avbeställning av förfrågningar
  - Resurstemplet med URI-mönster
  - Serverns livscykelhantering
  - Kontroll av loggnivåer
  - Felhanteringsmönster med JSON-RPC koder

#### Navigationsfixar (24+ filer uppdaterade)

**Huvudmodul READMEs**
 Länkar till både första lektionen OCH nästa modul

**02-Säkerhet Underfiler**
- Alla 5 kompletterande säkerhetsdokument har nu "Vad händer sen"-navigation:

**09-CaseStudy-filer**
- Alla fallstudiefiler har nu sekventiell navigation:

**10-StreamliningAI Labs**
Lade till 'Vad händer sen'-sektion i Modul 10-översikten och Modul 11

#### Kod- och innehållsfixar

**SDK och beroendeuppdateringar**
Fixade tom openai-version till `^4.95.0`
Uppdaterade SDK från `^1.8.0` till `>=1.26.0`
Uppdaterade mcp-versionpinnar till `>=1.26.0`

**Kodfixar**
Fixade ogiltig modell `gpt-4o-mini` till `gpt-4.1-mini`

**Innehållsfixar**
Fixade trasig länk `READMEmd` → `README.md`, fixade kursrubrik `Module 1-3` → `Module 0-3`, fixade skiftlägeskänslig sökväg
Raderade skadad duplicerad Case Study 5-innehåll

**Nybörjarguiden förbättringar**
Lade till korrekt introduktion, läromål och förkunskapskrav för nybörjare

#### Uppdateringar i kursplanen

**Huvud README.md**
- Lade till poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) i kursplans-tabellen

**Modul-READMEs**
Lade till lektioner 12 och 13 i lektionslistan
Lade till sektion Praktiska guider med pagineringlänk
Lade till lektioner 5.15 (Custom Transport) och 5.16 (Protocol Features)

**study_guide.md**
- Uppdaterade mindmap med alla nya ämnen: MCP Hosts uppsättning, MCP Inspector, Pagineringsstrategier, Djupdykning i protokollfunktioner

## 28 jan 2026

### MCP-specifikation 2025-11-25 överensstämmelsegranskning

#### Kärnbegreppsutveckling (01-CoreConcepts/)
- **Nytt klientprimitiv – Roots**: Lade till omfattande dokumentation om Roots-klientprimitivet som gör det möjligt för servrar att förstå filsystemgränser och åtkomsträttigheter
- **Verktygsannotationer**: Lade till dokumentation om verktygsbeteendeannotationer (`readOnlyHint`, `destructiveHint`) för bättre beslut kring verktygskörning
- **Verktygskall i Sampling**: Uppdaterade Sampling-dokumentationen för att inkludera `tools` och `toolChoice` parametrar för modellstyrd verktygskallelse vid samplingförfrågningar
- **URL Mode Elicitation**: Lade till dokumentation om URL-baserad elicitation för serverinitierade externa webbinteraktioner
- **Uppgifter (experimentellt)**: Lade till ny sektion med dokumentation för den experimentella funktionen Uppgifter för hållbara exekveringsomslag och fördröjd resultatretrieval
- **Ikonstöd**: Noterade att verktyg, resurser, resurstemplet och promptar nu kan innehålla ikoner som ytterligare metadata

#### Dokumentationsuppdateringar
- **README.md**: Lade till MCP-specifikation version 2025-11-25 referens och förklarande versionshantering baserat på datum
- **study_guide.md**: Uppdaterade kurskarta för att inkludera Uppgifter och Verktygsannotationer i kärnbegreppssektionen; uppdaterade dokumentets tidsstämpel

#### Verifiering av specifikationsöverensstämmelse
- **Protokollversion**: Verifierade att all dokumentation refererar till aktuella MCP-specifikation 2025-11-25
- **Arkitekturoverensstämmelse**: Bekräftade dokumentationsnoggrannhet för tvålagsarkitektur (Datalager + Transportlager)
- **Primitivdokumentation**: Validerade serverprimitiv (Resurser, Promptar, Verktyg) och klientprimitiv (Sampling, Elicitation, Loggning, Roots)
- **Transportmekanismer**: Verifierade dokumentationsnoggrannhet för STDIO och strömningsbar HTTP-transport
- **Säkerhetsanvisningar**: Bekräftade överensstämmelse med aktuella MCP Säkerhetsbästa praxis-dokument

#### Väsentliga MCP 2025-11-25-funktioner dokumenterade
- **OpenID Connect Discovery**: Auth server-discovery via OIDC
- **OAuth klient-ID metadokument**: Rekommenderad klientregistreringsmekanism
- **JSON Schema 2020-12**: Standarddialekt för MCP schema-definitioner
- **SDK-tieringsystem**: Formaliserade krav för SDK-funktionsstöd och underhåll
- **Styrningsstruktur**: Formaliserade arbetsgrupper och intressegrupper i MCP-styrning

### Stora säkerhetsdokumentationsuppdateringar (02-Security/)

#### MCP Security Summit Workshop (Sherpa)-integration
- **Nytt praktiskt träningsresurs**: Lade till omfattande integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all säkerhetsdokumentation
- **Expeditionsrutt-täckning**: Dokumenterade hela läger-till-läger-förloppet från Basläger till Topp
- **OWASP-justering**: All säkerhetsvägledning kartläggs nu mot OWASP MCP Azure Security Guide risker

#### OWASP MCP Top 10-integration
- **Ny sektion**: Lade till OWASP MCP Top 10 säkerhetsrisk-tabell med Azure-minskningar i huvud-Security README
- **Riskbaserad dokumentation**: Uppdaterade mcp-security-controls-2025.md med OWASP MCP riskreferenser för varje säkerhetsdomän
- **Referensarkitektur**: Länkat till OWASP MCP Azure Security Guide referensarkitektur och implementeringsmönster

#### Uppdaterade säkerhetsfiler
- **README.md**: Lade till Sherpa Workshop-översikt, expeditionsrutttabell, OWASP MCP Top 10 risk-sammanfattning och praktisk träningssektion
- **mcp-security-controls-2025.md**: Uppdaterade header till februari 2026, lade till OWASP riskreferenser (MCP01-MCP08), fixade versionsinkonsistens i spec
- **mcp-security-best-practices-2025.md**: Lade till Sherpa och OWASP-resurser, uppdaterade tidsstämpel
- **mcp-best-practices.md**: Lade till praktisk träningssektion med Sherpa och OWASP-länkar
- **azure-content-safety-implementation.md**: Lade till OWASP MCP06-referens, Sherpa Camp 3-justering och ytterligare resurssektion

#### Nya resurslänkar tillagda
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuella OWASP MCP risk-sidor (MCP01-MCP10)

### Kursomfattande MCP-specifikation 2025-11-25 justering

#### Modul 03 - Kom igång
- **SDK-dokumentation**: Lade till Go SDK till officiella SDK-listan; uppdaterade alla SDK-referenser för att anpassa med MCP-specifikation 2025-11-25
- **Transportförtydligande**: Uppdaterade STDIO och HTTP strömningstransportbeskrivningar med explicit spec-referens

#### Modul 04 - Praktisk implementering
- **SDK-uppdateringar**: Lade till Go SDK; uppdaterade SDK-lista med specifikationsversionsreferens
- **Authorization Spec**: Uppdaterade MCP auktorisationsspecifikationslänk till aktuell version 2025-11-25

#### Modul 05 - Avancerade ämnen
- **Nya funktioner**: Lade till notis om nya MCP-specifikation 2025-11-25-funktioner (Uppgifter, Verktygsannotationer, URL Mode Elicitation, Roots)
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 och Sherpa workshop-länkar i ytterligare referenser

#### Modul 06 - Community Contributions
- **SDK-lista**: Lade till Swift- och Rust-SDK:er; uppdaterade specifikationslänk till 2025-11-25
- **Spec-referens**: Uppdaterade MCP-specifikationslänk till direkt spec-URL

#### Modul 07 - Lessons from Early Adoption
- **Resursuppdateringar**: Lade till MCP-specifikation 2025-11-25-länk och OWASP MCP Top 10 i ytterligare resurser

#### Modul 08 - Bästa praxis
- **Spec-version**: Uppdaterade MCP-specifikationsreferens till 2025-11-25
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 och Sherpa workshop i ytterligare referenser

#### Modul 10 - Effektivisering av AI-arbetsflöden
- **Badge-uppdatering**: Ändrade MCP versionsmärke från SDK-version (1.9.3) till specifikationsversion (2025-11-25)
- **Resurslänkar**: Uppdaterade MCP-specifikationslänken; lade till OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spec-referens**: Uppdaterade MCP-specifikationslänken till version 2025-11-25
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 i officiella resurser

## 18 december 2025

### Säkerhetsdokumentationsuppdatering - MCP-specifikation 2025-11-25

#### MCP säkerhetsbästa praxis (02-Security/mcp-best-practices.md) - uppdatering av specifikationsversion  
- **Protokollversion uppdatering**: Uppdaterade för att referera till senaste MCP-specifikation 2025-11-25 (släppt 25 november 2025)  
  - Uppdaterade alla versionsreferenser från 2025-06-18 till 2025-11-25  
  - Uppdaterade dokumentdatum från 18 augusti 2025 till 18 december 2025  
  - Verifierade att alla specificerade URL:er pekar till aktuell dokumentation  
- **Innehållsvalidering**: Omfattande validering av säkerhetsbästa praxis mot senaste standarder  
  - **Microsoft säkerhetslösningar**: Verifierade korrekt terminologi och länkar för Prompt Shields (tidigare "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID och Azure Key Vault  
  - **OAuth 2.1 säkerhet**: Bekräftade överensstämmelse med senaste OAuth säkerhetsbästa praxis  
  - **OWASP-standarder**: Validerade att OWASP Top 10 för LLM-referenser fortfarande är aktuella  
  - **Azure-tjänster**: Verifierade alla Microsoft Azure dokumentationslänkar och bästa praxis  
- **Standardöverensstämmelse**: Alla refererade säkerhetsstandarder bekräftade aktuella  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Security Best Practices  
  - Azure säkerhets- och efterlevnadsramverk  
- **Implementeringsresurser**: Validerade alla guide- och resurshänvisningar  
  - Azure API Management autentiseringsmönster  
  - Microsoft Entra ID integrationsguider  
  - Azure Key Vault hemlighetshantering  
  - DevSecOps pipelines och övervakningslösningar

### Dokumentationskvalitetssäkring  
- **Specifikationsöverensstämmelse**: Säkerställde att alla obligatoriska MCP säkerhetskrav (MÅSTE/FÅR INTE) stämmer överens med senaste specifikation  
- **Resursaktualitet**: Verifierade att alla externa länkar till Microsoft-dokumentation, säkerhetsstandarder och implementationsguider är aktuella  
- **Täckning av bästa praxis**: Bekräftade omfattande täckning av autentisering, auktorisering, AI-specifika hot, supply chain-säkerhet och företagsmönster

## 6 oktober 2025

### Utökning av Kom-Igång-sektionen – Avancerad serveranvändning & enkel autentisering

#### Avancerad serveranvändning (03-GettingStarted/10-advanced)
- **Ny kapitel tillagd**: Introducerade en omfattande guide till avancerad MCP-serveranvändning, täcker både vanliga och lågnivå serverarkitekturer.
  - **Regelbunden vs. lågnivåserver**: Detaljerad jämförelse och kodexempel i Python och TypeScript för båda tillvägagångssätten.
  - **Handler-baserad design**: Förklaring av handler-baserad hantering av verktyg/resurser/promptar för skalbara, flexibla serverimplementationer.
  - **Praktiska mönster**: Verkliga scenarier där lågnivåservermönster är fördelaktiga för avancerade funktioner och arkitektur.

#### Enkel autentisering (03-GettingStarted/11-simple-auth)
- **Nytt kapitel tillagt**: Steg-för-steg-guide för att implementera enkel autentisering i MCP-servrar.
  - **Autentiseringskoncept**: Tydlig förklaring av autentisering vs. auktorisering och hantering av autentiseringsuppgifter.
  - **Grundläggande autentiseringsimplementering**: Middleware-baserade autentiseringsmönster i Python (Starlette) och TypeScript (Express) med kodexempel.
  - **Utveckling till avancerad säkerhet**: Vägledning för att börja med enkel autentisering och gå vidare till OAuth 2.1 och RBAC, med referenser till avancerade säkerhetsmoduler.

Dessa tillägg ger praktisk, handledning för att bygga mer robusta, säkra och flexibla MCP-serverimplementationer, som binder samman grundläggande koncept med avancerade produktionsmönster.

## 29 september 2025

### MCP Server Database Integration Labs – Omfattande praktisk inlärningsväg

#### 11-MCPServerHandsOnLabs – Ny fullständig kurs i databasintegration
- **Fullständig lärandeväg med 13 labbar**: Tillagd omfattande praktisk kurs för att bygga produktionsklara MCP-servrar med PostgreSQL-integration
  - **Verklighetsnära implementering**: Zava Retail-analysfall som demonstrerar mönster för företagsnivå
  - **Strukturerad lärandeprogression**:
    - **Labbar 00-03: Grundläggande** – Introduktion, kärnarkitektur, säkerhet & multitenancy, miljöuppsättning
    - **Labbar 04-06: Bygga MCP-servern** – Databasedesign & schema, MCP-serverimplementation, verktygsutveckling  
    - **Labbar 07-09: Avancerade funktioner** – Semantisk sökintegration, testning & felsökning, VS Code-integration
    - **Labbar 10-12: Produktion & bästa praxis** – Driftsättningsstrategier, övervakning & observability, bästa praxis & optimering
  - **Företagsteknologier**: FastMCP-ramverk, PostgreSQL med pgvector, Azure OpenAI-embeddings, Azure Container Apps, Application Insights
  - **Avancerade funktioner**: Radnivåsäkerhet (RLS), semantisk sökning, multi-tenant datatillgång, vektorembeddings, realtidsövervakning

#### Terminologistandardisering – modul till labb-konvertering
- **Omfattande dokumentationsuppdatering**: Systematiskt uppdaterade alla README-filer i 11-MCPServerHandsOnLabs för att använda "Lab" istället för "Modul"
  - **Avsnittsrubriker**: Uppdaterade "What This Module Covers" till "What This Lab Covers" i samtliga 13 labbar
  - **Innehållsbeskrivning**: Ändrat "This module provides..." till "This lab provides..." i dokumentationen
  - **Lärandemål**: Uppdaterat "By the end of this module..." till "By the end of this lab..."
  - **Navigeringslänkar**: Omvandlade alla "Module XX:"-referenser till "Lab XX:" i korsreferenser och navigation
  - **Slutförandesporing**: Uppdaterat "After completing this module..." till "After completing this lab..."
  - **Bevarade tekniska referenser**: Bibehållit Python-modulreferenser i konfigurationsfiler (t.ex. `"module": "mcp_server.main"`)

#### Förbättring av studieguiden (study_guide.md)
- **Visuell kurskarta**: Lagt till nytt avsnitt "11. Database Integration Labs" med omfattande visualisering av labbstrukturen
- **Arkivstruktur**: Uppdaterat från tio till elva huvudavsnitt med detaljerad beskrivning av 11-MCPServerHandsOnLabs
- **Vägledning för lärandeväg**: Förbättrade navigeringsinstruktioner för att omfatta avsnitten 00-11
- **Teknologiöversikt**: Tillagt detaljer om FastMCP, PostgreSQL och Azure-tjänsters integration
- **Läranderesultat**: Betonat produktionredo serverutveckling, databasintegrationsmönster och företagsrelaterad säkerhet

#### Förbättring av huvud-README-strukturen
- **Labbbaserad terminologi**: Uppdaterat huvud-README.md i 11-MCPServerHandsOnLabs för att konsekvent använda "Lab"-struktur
- **Organisation av lärandeväg**: Tydlig progression från grundläggande koncept via avancerad implementering till produktionsdriftsättning
- **Praktiskt fokus**: Fokus på praktiskt, hands-on-lärande med företagsnivåmönster och teknologier

### Förbättringar av dokumentationskvalitet och konsekvens
- **Hands-on-inlärningsfokus**: Förstärkt praktisk, labb-baserad metod genom hela dokumentationen
- **Företagsmönsterfokus**: Lyfter fram produktionsklara implementationer och företagssäkerhet
- **Teknologiintegration**: Omfattande täckning av moderna Azure-tjänster och AI-integrationsmönster
- **Lärandeprogression**: Tydlig, strukturerad väg från grundläggande koncept till produktionsdriftsättning

## 26 september 2025

### Case Studies-förbättring – GitHub MCP Registry-integration

#### Case Studies (09-CaseStudy/) – Fokus på ekosystemutveckling
- **README.md**: Stor utökning med omfattande fallstudie kring GitHub MCP Registry
  - **GitHub MCP Registry Case Study**: Ny omfattande fallstudie som analyserar GitHubs lansering av MCP Registry i september 2025
    - **Problemanalys**: Detaljerad granskning av fragmenterade MCP-serverupptäckts- och driftsättningsutmaningar
    - **Lösningsarkitektur**: GitHubs centraliserade register med en-klikks VS Code-installation
    - **Affärspåverkan**: Mätbara förbättringar i onboarding och produktivitet för utvecklare
    - **Strategiskt värde**: Fokus på modulär agentdistribution och interoperabilitet mellan verktyg
    - **Ekosystemutveckling**: Positionering som grundläggande plattform för agentbaserad integration
  - **Förbättrad case study-struktur**: Uppdaterade samtliga sju case studies med konsekvent formatering och omfattande beskrivningar
    - Azure AI Travel Agents: Betoning på multi-agent orkestrering
    - Azure DevOps Integration: Fokus på workflow-automatisering
    - Realtidsdokumenthämtning: Python-konsolklientimplementering
    - Interaktiv studieplansgenerator: Chainlit konversationsbaserad webbapp
    - In-Editor Dokumentation: VS Code och GitHub Copilot-integration
    - Azure API Management: Enterprise API-integrationsmönster
    - GitHub MCP Registry: Ekosystemutveckling och communityplattform
  - **Omfattande slutledning**: Omskriven slutsats med fokus på sju case studies som täcker flera MCP-implementeringsdimensioner
    - Enterpriseintegration, multi-agent orkestrering, utvecklarproduktivitet
    - Ekosystemutveckling, utbildningsapplikationer kategorisering
    - Fördjupad insikt i arkitekturmönster, implementeringsstrategier och bästa praxis
    - Betonande av MCP som mogen, produktionsklar protokoll

#### Uppdateringar i studieguiden (study_guide.md)
- **Visuell kurskarta**: Uppdaterad mindmap för att inkludera GitHub MCP Registry i Case Studies-sektionen
- **Beskrivning av case studies**: Förbättrad från generiska beskrivningar till detaljerad genomgång av sju omfattande fallstudier
- **Arkivstruktur**: Uppdaterat avsnitt 10 för att spegla omfattande case study-omfattning med specifika implementeringsdetaljer
- **Changelog-integrering**: Tillagt 26 september 2025 med post som dokumenterar GitHub MCP Registry-tillägg och förbättringar
- **Datumuppdateringar**: Uppdaterat sidfots-tidsstämpel till senaste revision (26 september 2025)

### Dokumentationskvalitetsförbättringar
- **Konsekvensförbättring**: Standardiserad case study-format och struktur över samtliga sju exempel
- **Omfattande täckning**: Case studies spänner över företag, utvecklarproduktivitet och ekosystemutvecklingsscenarier
- **Strategisk positionering**: Förstärkt fokus på MCP som grundläggande plattform för agentbaserade system
- **Resursintegration**: Uppdaterat ytterligare resurser för att inkludera GitHub MCP Registry-länk

## 15 september 2025

### Avancerade ämnesutvidgningar – Anpassade transporter & Context Engineering

#### MCP anpassade transporter (05-AdvancedTopics/mcp-transport/) – Ny avancerad implementeringsguide
- **README.md**: Komplett implementeringsguide för anpassade MCP-transportmekanismer
  - **Azure Event Grid-transport**: Omfattande serverlös event-driven transportimplementering
    - Exempel i C#, TypeScript och Python med Azure Functions-integration
    - Event-driven arkitekturmönster för skalbara MCP-lösningar
    - Webhook-mottagare och push-baserad meddelandehantering
  - **Azure Event Hubs-transport**: Höggenomströmningsstreaming-transportimplementering
    - Realtidsstreamingfunktionalitet för låglatens-scenarier
    - Partitioneringsstrategier och checkpoint-hantering
    - Meddelandebatching och prestandaoptimering
  - **Företagsintegrationsmönster**: Produktionsklara arkitektoniska exempel
    - Distribuerad MCP-bearbetning över flera Azure Functions
    - Hybridtransportarkitekturer som kombinerar flera transporttyper
    - Meddelandets hållbarhet, tillförlitlighet och felhanteringsstrategier
  - **Säkerhet & övervakning**: Azure Key Vault-integration och observability-mönster
    - Hanterad identitetsautentisering och principen om minsta privilegium
    - Application Insights-telemetri och prestandaövervakning
    - Circuit breakers och felmotståndsmönster
  - **Testningsramverk**: Omfattande testningsstrategier för anpassade transporter
    - Enhetstester med testdubblar och mockningsramverk
    - Integrationstester med Azure Test Containers
    - Prestanda- och belastningstestningsöverväganden

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) – Framväxande AI-disciplin
- **README.md**: Omfattande utforskning av context engineering som ett framväxande område
  - **Kärnprinciper**: Komplett kontextdelning, medvetenhet om åtgärdsbeslut, och hantering av context window
  - **Anpassning till MCP-protokoll**: Hur MCP-designen adresserar context engineering-utmaningar
    - Begränsningar i context window och progressiv laddningsstrategi
    - Relevansbedömning och dynamisk kontexthämtning
    - Multimodal kontexthantering och säkerhetsaspekter
  - **Implementeringsmetoder**: Single-threaded vs. multi-agent-arkitekturer
    - Kontextchunking och prioriteringstekniker
    - Progressiv kontextladdning och komprimeringsstrategier
    - Lagerlagd kontextansats och optimerad hämtning
  - **Mätningsramverk**: Framväxande mått för utvärdering av kontexteffektivitet
    - Indataseffektivitet, prestanda, kvalitet och användarupplevelseaspekter
    - Experimentella metoder för kontextoptimering
    - Felanalys och förbättringsmetodik

#### Uppdateringar i kursnavigering (README.md)
- **Förbättrad modulstruktur**: Uppdaterad kursöversiktstabell för att inkludera nya avancerade ämnen
  - Lade till Context Engineering (5.14) och Custom Transport (5.15)
  - Konsekvent formatering och navigeringslänkar i alla moduler
  - Uppdaterade beskrivningar för att spegla aktuell innehållsomfattning

### Förbättringar i katalogstruktur
- **Namnstandardisering**: Bytte namn från "mcp transport" till "mcp-transport" för konsistens med övriga avancerade ämnesmappar
- **Innehållsorganisation**: Alla 05-AdvancedTopics-mappar följer nu konsekvent namngivningsmönster (mcp-[topic])

### Dokumentationskvalitetsförbättringar
- **Anpassning till MCP-specifikation**: Allt nytt innehåll refererar till nuvarande MCP Specification 2025-06-18
- **Fler språkexempel**: Omfattande kodexempel i C#, TypeScript och Python
- **Företagsfokus**: Produktionsklara mönster och Azure-molnintegration i hela materialet
- **Visuell dokumentation**: Mermaid-diagram för arkitektur- och flödesvisualisering

## 18 augusti 2025

### Omfattande dokumentationsuppdatering – MCP 2025-06-18-standarder

#### MCP Security Best Practices (02-Security/) – Fullständig modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullständig omskrivning i enlighet med MCP Specification 2025-06-18
  - **Obligatoriska krav**: Tillagda explicita MUST/MUST NOT-krav från officiell specifikation med tydliga visuella markörer
  - **12 kärnsäkerhetspraxisar**: Omstrukturerade från 15-punktslista till omfattande säkerhetsdomäner
    - Tokensäkerhet & autentisering med extern identitetsleverantörs-integration
    - Sessionshantering & transportsecurity med kryptografiska krav
    - AI-specifikt hotförsvar med Microsoft Prompt Shields-integrering
    - Åtkomstkontroll & behörigheter med principen om minsta privilegium
    - Innehållssäkerhet & övervakning med Azure Content Safety-integration
    - Supply Chain Security med omfattande komponentverifiering
    - OAuth-säkerhet & Confused Deputy-förebyggande med PKCE-implementering
    - Incidenthantering & återhämtning med automatiserade funktioner
    - Compliance & Governance med regulatorisk anpassning
    - Avancerade säkerhetskontroller med zero trust-arkitektur
    - Microsoft Security-ekosystemsintegration med komplett lösningsarkitektur
    - Kontinuerlig säkerhetsevolution med adaptiva metoder
  - **Microsoft säkerhetslösningar**: Förbättrad integrationsvägledning för Prompt Shields, Azure Content Safety, Entra ID och GitHub Advanced Security
  - **Implementeringsresurser**: Kategoriserade omfattande resurslänkar efter Officiell MCP-dokumentation, Microsofts säkerhetslösningar, säkerhetsstandarder och implementeringsguider

#### Avancerade säkerhetskontroller (02-Security/) – Företagsimplementering
- **MCP-SECURITY-CONTROLS-2025.md**: Total översyn till ett företagsklassat säkerhetsramverk
  - **9 omfattande säkerhetsdomäner**: Utvidgade från grundläggande kontroller till detaljerat företagsramverk
    - Avancerad autentisering & auktorisering med Microsoft Entra ID-integration
    - Tokensäkerhet & anti-passthrough-kontroller med omfattande validering
    - Sessionssäkerhetskontroller med förebyggande av hijacking
    - AI-specifika säkerhetskontroller med prompt injection- och verktygsförgiftning-förebyggande
    - Confused Deputy-attackförebyggande med OAuth-proxy-säkerhet
    - Verktygsexekveringssäkerhet med sandlåda och isolering
    - Supply Chain-säkerhetskontroller med beroendeverifiering
    - Övervaknings- & detektionskontroller med SIEM-integration
    - Incidenthantering & återhämtningsfunktioner med automatisering
  - **Implementeringsexempel**: Tillagda detaljerade YAML-konfigurationsblock och kodexempel
  - **Microsoft-lösningsintegration**: Omfattande täckning av Azure-säkerhetstjänster, GitHub Advanced Security och företagsidentitetshantering

#### Säkerhet för avancerade ämnen (05-AdvancedTopics/mcp-security/) – Produktionsklar implementering
- **README.md**: Fullständig omskrivning för företagsäkerhetsimplementering
  - **Anpassning till aktuell specifikation**: Uppdaterad till MCP Specification 2025-06-18 med obligatoriska säkerhetskrav
  - **Förbättrad autentisering**: Microsoft Entra ID-integration med omfattande .NET och Java Spring Security-exempel
  - **AI-säkerhetsintegration**: Microsoft Prompt Shields och Azure Content Safety-implementering med detaljerade Python-exempel
  - **Avancerade hotmotverkande åtgärder**: Omfattande implementeringsexempel för
    - Confused Deputy-attackförebyggande med PKCE och användarsamtyckesvalidering
    - Token passthrough-förebyggande med audienservalidering och säker tokenhantering
    - Förebyggande av sessionkapning med kryptografisk bindning och beteendeanalys
  - **Enterprise Security Integration**: Azure Application Insights-övervakning, hotdetekteringspipeline och säkerhet i leveranskedjan
  - **Implementeringschecklista**: Tydliga obligatoriska vs. rekommenderade säkerhetskontroller med fördelar från Microsofts säkerhetsekosystem

### Dokumentationskvalitet & standardanpassning
- **Specifikationsreferenser**: Uppdaterade alla referenser till aktuella MCP-specifikationen 2025-06-18
- **Microsofts säkerhetsekosystem**: Förbättrad integrationsvägledning i all säkerhetsdokumentation
- **Praktisk implementering**: Tillagt detaljerade kodexempel i .NET, Java och Python med företagsmönster
- **Resursorganisation**: Omfattande kategorisering av officiell dokumentation, säkerhetsstandarder och implementationsguider
- **Visuella indikatorer**: Tydlig markering av obligatoriska krav kontra rekommenderade metoder


#### Kärnbegrepp (01-CoreConcepts/) - Fullständig modernisering
- **Protokollversionsuppdatering**: Uppdaterad för att referera till aktuella MCP-specifikationen 2025-06-18 med datumbaserad versionering (YYYY-MM-DD format)
- **Arkitekturförbättring**: Förbättrade beskrivningar av Hosts, Clients och Servers för att spegla aktuella MCP-arkitekturmodeller
  - Hosts definieras nu tydligt som AI-applikationer som koordinerar flera MCP-klientanslutningar
  - Clients beskrivs som protokollkopplingar med entillen-server-relationer
  - Servers förbättrade med lokala vs. fjärrdriftscenarier
- **Primitiv omstrukturering**: Fullständig översyn av server- och klientprimitive
  - Serverprimitive: Resurser (datakällor), Prompter (mallar), Verktyg (exekverbara funktioner) med detaljerade förklaringar och exempel
  - Klientprimitive: Sampling (LLM-kompletteringar), Elicitation (användarinmatning), Logging (felsökning/övervakning)
  - Uppdaterad med aktuella mönster för upptäckt (`*/list`), hämtning (`*/get`) och exekvering (`*/call`)
- **Protokollarkitektur**: Infört tvåskiktsarkitekturmodell
  - Datalager: JSON-RPC 2.0-bas med livscykelhantering och primitive
  - Transportlager: STDIO (lokal) och Streamable HTTP med SSE (fjärr) transportmekanismer
- **Säkerhetsramverk**: Omfattande säkerhetsprinciper inklusive uttryckligt användarsamtycke, dataskydd, säkert verktygsexekverande och transportskiktssäkerhet
- **Kommunikationsmönster**: Uppdaterade protokollmeddelanden som visar initialisering, upptäckt, exekvering och notifieringsflöden
- **Kodexempel**: Uppfräschade flerspråksexempel (.NET, Java, Python, JavaScript) för att spegla aktuella MCP SDK-mönster

#### Säkerhet (02-Security/) - Omfattande säkerhetsöversyn  
- **Standardanpassning**: Full anpassning till MCP-specifikationen 2025-06-18 säkerhetskrav
- **Autentiseringens utveckling**: Dokumenterad utveckling från egna OAuth-servrar till extern identitetsleverantörsdelegering (Microsoft Entra ID)
- **AI-specifik hotanalys**: Förbättrad täckning av moderna AI-angreppsvägar
  - Detaljerade scenarier för promptinjektion med verkliga exempel
  - Verktygsförgiftning och "rug pull"-attackmönster
  - Kontextfönsterförgiftning och modellkonfusionsattacker
- **Microsoft AI-säkerhetslösningar**: Omfattande täckning av Microsofts säkerhetsekosystem
  - AI Prompt Shields med avancerad detektering, spotlighting och avgränsartekniker
  - Integrationsmönster för Azure Content Safety
  - GitHub Advanced Security för skydd av leveranskedjan
- **Avancerad hotdämpning**: Detaljerade säkerhetskontroller för
  - Sessionkapning med MCP-specifika angreppsscenarier och kryptografiska session-ID-krav
  - Confused deputy-problem i MCP-proxyscenarier med uttryckliga samtyckeskrav
  - Token passthrough-sårbarheter med obligatoriska valideringskontroller
- **Säkerhet i leveranskedjan**: Utökad täckning av AI-leveranskedjan inklusive grundmodeller, embeddings-tjänster, kontextleverantörer och tredjeparts-API:er
- **Grundläggande säkerhet**: Förbättrad integration med företagsäkerhetsmönster inklusive zero trust-arkitektur och Microsofts säkerhetsekosystem
- **Resursorganisation**: Kategoriserade omfattande resurslänkar efter typ (officiell dokumentation, standarder, forskning, Microsoftlösningar, implementationsguider)

### Förbättringar av dokumentationskvalitet
- **Strukturerade lärandemål**: Förbättrade lärandemål med specifika, handlingsbara resultat
- **Korsreferenser**: Lagt till länkar mellan relaterade säkerhets- och kärnbegreppsteman
- **Aktuell information**: Uppdaterade alla datumsreferenser och specifikationslänkar till aktuella standarder
- **Implementeringsvägledning**: Lagt till specifika, handlingsbara riktlinjer genom båda sektionerna

## 16 juli 2025

### README och navigationsförbättringar
- Helt omarbetad kursnavigering i README.md
- Ersatt `<details>` taggar med ett mer tillgängligt tabellformat
- Skapade alternativa layoutalternativ i nya mappen "alternative_layouts"
- Lagt till kortbaserade, tabbade och dragspelsliknande navigations-exempel
- Uppdaterade repositorie-struktursektionen för att inkludera alla senaste filer
- Förbättrad "How to Use This Curriculum"-sektion med tydliga rekommendationer
- Uppdaterade MCP-specifikationslänkar för att peka på korrekta URL:er
- Lagt till Kontextengineering-sektionen (5.14) i kursstrukturen

### Uppdateringar av studieguide
- Helt reviderad studieguide för att stämma överens med aktuell repositoriestruktur
- Lagt till nya sektioner för MCP-klienter och verktyg samt populära MCP-servrar
- Uppdaterad Visuell kurskarta för att korrekt spegla alla ämnen
- Förbättrade beskrivningar av avancerade ämnen för att täcka alla specialområden
- Uppdaterad Fallstudiesektion med aktuella exempel
- Lagt till denna omfattande ändringslogg

### Communitybidrag (06-CommunityContributions/)
- Lagt till detaljerad information om MCP-servrar för bildgenerering
- Lagt till omfattande sektion om att använda Claude i VSCode
- Lagt till Cline-terminalklientens installations- och användarinstruktioner
- Uppdaterat MCP-klientsektion för att inkludera alla populära klientalternativ
- Förbättrade bidragsexempel med mer korrekta kodexempel

### Avancerade ämnen (05-AdvancedTopics/)
- Organiserade alla specialämnesmappar med konsekvent namngivning
- Lagt till material och exempel för kontextengineering
- Lagt till Foundry-agentintegrationsdokumentation
- Förbättrad dokumentation för Entra ID-säkerhetsintegration

## 11 juni 2025

### Initial skapelse
- Släppt första versionen av MCP för nybörjare-kursen
- Skapat grundstruktur för alla 10 huvudsektioner
- Implementerat Visuell kurskarta för navigering
- Lagt till initiala exempelprojekt i flera programmeringsspråk

### Komma igång (03-GettingStarted/)
- Skapat första serverimplementeringsexempel
- Lagt till vägledning för klientutveckling
- Inkluderat instruktioner för LLM-klientintegration
- Lagt till dokumentation för VS Code-integration
- Implementerat Server-Sent Events (SSE) serverexempel

### Kärnbegrepp (01-CoreConcepts/)
- Lagt till detaljerad förklaring av klient-server-arkitektur
- Skapat dokumentation om viktiga protokollkomponenter
- Dokumenterat meddelandemönster i MCP

## 23 maj 2025

### Repositoriestruktur
- Initierade repositoriet med grundläggande mappstruktur
- Skapade README-filer för varje huvudsektion
- Set up översättningsinfrastruktur
- Lagt till bildresurser och diagram

### Dokumentation
- Skapade initial README.md med kursöversikt
- Lagt till CODE_OF_CONDUCT.md och SECURITY.md
- Set up SUPPORT.md med hjälp för att få stöd
- Skapade preliminär studieguide-struktur

## 15 april 2025

### Planering och ramverk
- Initial planering för MCP för nybörjare-kursen
- Definierade lärandemål och målgrupp
- Upprättade 10-sektionsstruktur för kursen
- Utvecklade konceptuellt ramverk för exempel och fallstudier
- Skapade initiala prototypsexempel för nyckelbegrepp

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->