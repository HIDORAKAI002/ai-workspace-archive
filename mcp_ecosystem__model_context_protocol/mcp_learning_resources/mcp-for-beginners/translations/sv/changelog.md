# Ändringslogg: MCP för nybörjare kursplan

Detta dokument fungerar som en register över alla betydande förändringar som gjorts i Model Context Protocol (MCP) för nybörjare-kursplanen. Ändringarna dokumenteras i omvänd kronologisk ordning (senaste ändringar först).

## 2 juli 2026

### Ny lektion: 2026-07-28 MCP-specifikationsutgåva kandidat

Lagt till täckning av den kommande `2026-07-28` MCP-specifikationsutgåvan kandidat (annonserad 21 maj 2026; slutgiltig utgåva planerad till 28 juli 2026), sammanfattad från [den officiella tillkännagivandebloggen](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Kursplanens baslinje förblir **MCP Specification 2025-11-25** tills den nya versionen släpps, så detta presenteras som framåtblickande vägledning snarare än en omskrivning av befintliga lektioner.

- **Ny**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — en fullständig lektion som täcker den tillståndslösa protokollkärnan (borttagning av `initialize` handslag och `Mcp-Session-Id`), de nya `Mcp-Method`/`Mcp-Name` routningshuvudena, `ttlMs`/`cacheScope` cachemetadatana, W3C Trace Context i `_meta`, det formella Extensions-ramverket (MCP Apps och den nya Tasks-förlängningen), sex auktorisationsförstärkande SEPs, avvecklingen av Roots/Sampling/Logging och övergången till full JSON Schema 2020-12 för verktygsscheman.
- **Uppdaterad** med framåtblickande hänvisningar som länkar till den nya lektionen:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokollversionsnot, Sampling/Roots/Logging/Tasks sektioner, och "Vad händer härnäst"
  - [02-Security/README.md](./02-Security/README.md): auktorisationsförstärkningshänvisning
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): tillståndslös transporthänvisning
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Samplingavvecklingshänvisning
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Loggingavvecklings- och Tasks-förlängningshänvisning
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): tillståndslös/session-routningshänvisning
  - [README.md](./README.md): "Ser framåt" notis i specifikationssektionen och en ny `1.1` post i kursplansmodultabellen
  - [study_guide.md](./study_guide.md): framåtblickande punkt under Core Concepts översikten och ett daterat tilläggsnotis
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): hänvisning om `mcp-session-id` transportkartan före det tillståndslösa förfrågningsmodellen
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): modulöversiktshänvisning om Root Contexts/Sampling-avvecklingar och Tasks-förlängningen
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): auktorisationsförstärkningshänvisning

## 24 juni 2026

### Ny lektion: Använda MCP i Copilot-app

- [Verktygssektion](./12-tooling/README.md) Lade till verktygssektion.
- [MCP i Copilot-app](./12-tooling/01-copilot-app/README.md)

## 16 juni 2026

### MCP-specifikationsjustering och provvalidering

Validerade kursplanen mot nuvarande **MCP Specification 2025-11-25** och de senaste officiella SDK:erna, korrigerade sedan återstående föråldrade specifikationsreferenser och bekräftade att kärnproverna fortfarande kompilerar och körs.

#### Specifikationsversionskorrigeringar (2025-06-18 / 2025-03-26 → 2025-11-25)

Uppdaterade engelskt innehåll där det fortfarande hävdades att nyare spec-revision var den *nuvarande/senaste* standarden, och ompekade länkar till de kanoniska `modelcontextprotocol.io` spec-vägarna:
- **05-AdvancedTopics/mcp-security/README.md**: Uppdaterade "Current Standard" banner, introduktion, kärnsäkerhetsprinciper, obligatoriska krav, Microsoft Entra ID-sektion, Referenser & Resurslänkar samt avslutande säkerhetsmeddelande (8 referenser) till 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Uppdaterade Spec-länken för Ytterligare Resurser och "Current Standard" banner till 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Ersatte den föråldrade `2025-03-26` säkerhets- och tillit-länken med den aktuella 2025-11-25 säkerhetsbästa praxis-sidan
- **03-GettingStarted/14-sampling/README.md**: Uppdaterade den officiella samplingdokumentationslänken till 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Uppdaterade nuvarande tidsform "nuvarande MCP-specifikation" referens och Ytterligare Resurser spec-länk till 2025-11-25 (historiska SSE-avvecklingsnotiser lämnade intakta för noggrannhet)

#### Provvalidering mot aktuella SDK:er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passerade utan typfel — befintliga `McpServer`/`StdioServerTransport` API:er förblir giltiga
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validerades i isolerad `.venv` med `mcp[cli]` (1.27.2); `py_compile` passerade och `FastMCP.list_tools()` returnerade korrekt `add` och `subtract` verktygen
- Bekräftade att alla prov `@modelcontextprotocol/sdk` versionsintervall (`>=1.26.0` / `^1.26.0` / `^1.27.0`) löser rent till aktuella `1.29.0` utan brytande API-ändringar

#### Beroendepinjustering (stänger versionsgap)

Uppdaterade föråldrade SDK-pinnar så varje prov följer aktuell MCP-utgåva, i enlighet med repo-omfattande konventionen:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Uppgraderade `@modelcontextprotocol/sdk` från `^1.8.0` → `>=1.26.0` och uppdaterade den utdaterade `"updated for MCP 2025-06-18"` paketbeskrivningen till `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** och **lab4/code/github_mcp_server/pyproject.toml**: Uppgraderade den exakta pinnen `mcp==1.23.0` → `mcp>=1.26.0`; återgenererade båda `uv.lock` filerna (`uv lock`) så låsfilerna löser till aktuella `mcp 1.27.2` och hålls i synk med manifesterna

#### Kursplan Gap-analys — Senaste Spec-funktäckning

Verifierade att kursplanen redan täcker alla primitiva som introducerats/utvidgats i MCP 2025-11-25, så inga innehållsglapp finns kvar:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-läge)**: Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumenterat i 00-Introduction, 01-CoreConcepts och 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentella, långkörande operationer)**: Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Verktygsanteckningar** (`readOnlyHint` / `destructiveHint`): Dokumenterat i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features

### Säkerhetsförstärkning & Beroendesårbarhetsreparation

Körde en fullständig säkerhetsgenomgång av varje beroendelista och provkällkod, sedan åtgärdades alla rapporterade npm-advisories och en kodnivåfynd. Efter åtgärd rapporterar `npm audit` **0 sårbarheter** i varje granskad mapp.

#### npm Beroendesårbarheter (transitiva) — Åtgärdade

Granskade alla 15 inskickade `package-lock.json`-filer. Sårbarheter var begränsade till transitiva beroenden hämtade av MCP Inspector utv-verktyget, OpenAI-klienten och MCP SDK; alla är nu lösta utan att bryta proven:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** och **lab3/code/weather_mcp/inspector**: Uppgraderade `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), vilket rensade bundlade `ajv`, `brace-expansion`, `diff`, `path-to-regexp` och `ws` advisories. Lade till en npm `overrides` post som tvingar patchad `shell-quote@1.8.4` för att eliminera kvarvarande kritisk advisory som bars av `concurrently`; återgenererade båda låsfilerna (nu 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uppdaterade transitive `qs` (moderat) till en patchad utgåva
- **03-GettingStarted/samples/javascript**: `npm audit fix` uppdaterade transitive `hono` (moderat) till en patchad utgåva
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uppdaterade transitive `form-data` (hög) till en patchad utgåva
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererade den saknade `package-lock.json` så projektet är reproducerbart och granskningsbart (0 sårbarheter)

#### Kodnivåsäkerhetsfix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tog bort `shell=True` från `open_in_vscode` verktyget. Tidigare `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillät skalmetatecken i en mappsökväg att tolkas av `cmd.exe` (kommandoinjektionsvektor). Den startar nu den lösta `Code.exe` direkt med mappen som argument — utan skal — vilket är funktionellt ekvivalent och säkert

#### Python Beroendegranskning

- Granskade varje Python kravanvändning med `pip-audit`. `05-AdvancedTopics` och `03-GettingStarted/samples/python` rapporterade **inga kända sårbarheter** (deras `mcp` / `httpx` / `pydantic` / `python-dotenv` intervall löser till aktuella patchade versioner)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flaggade transitivt beroende **`werkzeug` 3.1.1** med tre `safe_join` Windows-enhetsnamns DoS-advisories — `CVE-2025-66221`, `CVE-2026-21860` och `CVE-2026-27199` (alla fixade i 3.1.6). Lade till en uttrycklig säkerhetspin `werkzeug>=3.1.6` så patchad version löses; verifierade att restriktionen löser rent med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnamnsrebranding

Uppdaterade allt kursplansinnehåll för att spegla Microsofts produktrebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Uppdaterade Discord-communitylänk
- **AGENTS.md**: Uppdaterade Discord-serverreferens
- **README.md**: Uppdaterade teknologiekosystemreferenser
- **study_guide.md**: Uppdaterade fallstudie-referenser
- **05-AdvancedTopics/README.md**: Uppdaterade Modul 5.13 titel och beskrivning
- **05-AdvancedTopics/mcp-integration/README.md**: Uppdaterade sektionsrubrik och beskrivning
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fullständig modul titel och innehållsuppdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Uppdaterade korsreferenslänk
- **07-LessonsfromEarlyAdoption/README.md**: Uppdaterade fallstudie-referenser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Uppdaterade avsnitt 9 rubrik, märken och kapabiliteter
- **08-BestPractices/README.md**: Uppdaterade Discord-communitylänk
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Uppdaterade Discord-kanalreferens
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Uppdaterade modellutplaceringsreferens
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Uppdaterade AI Services tabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Uppdaterade resursreferenser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension för VS Code

- **README.md**: Uppdaterade huvudreferenser i läroplanen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uppdaterad modultitel, översikt och alla modulhuvuden
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uppdaterad titel, lärandemål, installationsinstruktioner och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uppdaterad titel, lärandemål, MCP-värdtabell och korsreferenser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uppdaterad titel, märken, förkunskaper och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uppdaterade referenser till Agent Builder och feedbacklänk
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uppdaterade förkunskaper och tilläggsreferenser

---

## 11 april 2026

### Ny Lektion, Dokumentationskorrigeringar och Uppdateringar av Beroenden

#### Nytt Läroplansinnehåll tillagt

**Modul 05 - Avancerade Ämnen**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattande guide som täcker det antagonistiska debattmönstret för multi-agent-system
  - Mermaid arkitekturdiagram: två agenter → gemensam MCP-server → debatttranskript → domare → domslut
  - Gemensam MCP-verktygsserver (`web_search` + `run_python`) implementerad i Python och TypeScript
  - Motstående systempromptar (FÖR / EMOT / Domare) med explicita krav på verktygsanvändning
  - Debatt-orkestrator i Python, TypeScript och C# som hanterar rundor och dirigerar argument
  - MCP `ClientSession` -anslutning för orkestratorn till verkliga verktygsanrop
  - Användningsfallstabell (hallucinationsdetektion, hotmodellering, API-designgranskning, faktakontroll, teknologival)
  - Säkerhetsöverväganden: sandlådemiljö, validering av verktygsanrop, hastighetsbegränsning, revisionsloggning
  - Strukturerad övning med tre praktiska scenarier (kodgranskning, arkitekturval, innehållsmoderering)

#### Dokumentationskorrigeringar

**Modul 03 - Komma igång**
- **05-stdio-server/README.md**: Fixade ofullständigt TypeScript stdio-serverexempel — lade till saknad transportinstansiering (`new StdioServerTransport()`) och anropet `server.connect(transport)` för att matcha Python- och .NET-exemplen i samma avsnitt
- **14-sampling/README.md**: Rättade stavfel — korrigerade `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Uppdateringar i Läroplan

**Huvud README.md**
- Lade till post 5.17 (Adversarial Multi-Agent Reasoning med MCP) i läroplanstabellen med direktlänk till nya lektionen

**05-AdvancedTopics/README.md**
- Lade till Lektion 5.17 rad i lektionstabellen

**study_guide.md**
- Lade till ämnet Adversarial Multi-Agent Reasoning till tankekartan och beskrivande text för Avancerade Ämnen

#### Kod- och säkerhetskorrigeringar

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Säkerhetsfix — kommandoinjektion**: Ersatte `execSync` skalinterpolering med `execFile` + `promisify` i TypeScript-verktyget `run_python`, vilket eliminerar kommandoinjektionsytan (LLM-styrd kod skickas nu som ett bokstavligt argv-element utan skalengagemang)
- **MCP-verktygskoppling**: Uppdaterade Python-debattorkestratorn att använda `AsyncAnthropic` klient (ersätter blockerande synkrona `Anthropic`), skicka en levande `ClientSession` direkt till varje agentomgång, hämta verktygsdefinitioner via `session.list_tools()` varje omgång, och skicka `tool_use` block via `session.call_tool()` i en loop tills modellen genererar ett slutgiltigt textsvar

#### Uppdateringar av Beroenden

- Uppgraderade `hono` till 4.12.12 i flera paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Uppgraderade `@hono/node-server` från 1.19.11 till 1.19.13 i TypeScript-paket
- Uppgraderade `cryptography` från 46.0.5 till 46.0.7 i Python-paket (10-StreamliningAIWorkflows labbar 3 och 4)
- Uppgraderade `lodash` från 4.17.23 till 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Översättningar

- Synkroniserade översättningar för 48+ språk med senaste källändringarna (i18n-uppdatering)

---

## 5 februari 2026

### Repositoriumsövergripande validerings- och navigationsförbättringar

#### Nytt Läroplansinnehåll tillagt

**Modul 03 - Komma igång**
- **12-mcp-hosts/README.md**: Ny omfattande guide för att ställa in MCP-värdar
  - Konfigurationsexempel för Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurationsmallar för alla större värdar
  - Jämförelsetabell för transporttyper (stdio, SSE/HTTP, WebSocket)
  - Felsökning av vanliga anslutningsproblem
  - Säkerhetsbästa praxis för värdkonfiguration

- **13-mcp-inspector/README.md**: Ny felsökningsguide för MCP Inspector
  - Installationsmetoder (npx, global npm, från källkod)
  - Anslutning till servrar via stdio och HTTP/SSE
  - Testverktyg, resurser och promptarbetsflöden
  - VS Code-integration med MCP Inspector
  - Vanliga felsökningsscenarier med lösningar

**Modul 04 - Praktisk Implementering**
- **pagination/README.md**: Ny guide för pagination-implementering
  - Cursor-baserade pagineringsmönster i Python, TypeScript, Java
  - Hantering av paginering på klientsidan
  - Designstrategier för cursor (opak kontra strukturerad)
  - Rekommendationer för prestandaoptimering

**Modul 05 - Avancerade Ämnen**
- **mcp-protocol-features/README.md**: Ny djupdykning i protokollfunktioner
  - Implementering av progressmeddelanden
  - Mönster för avbokning av förfrågningar
  - Resursmallar med URI-mönster
  - Hantering av serverns livscykel
  - Styrning av loggnivå
  - Felhanteringsmönster med JSON-RPC-koder

#### Navigationskorrigeringar (24+ filer uppdaterade)

**Huvudmodulernas READMEs**
 Nu länkar både till första lektionen OCH nästa modul

**02-Säkerhets Underfiler**
- Alla 5 kompletterande säkerhetsdokument har nu "Vad kommer näst" navigation:

**09-CaseStudy-filer**
- Alla fallstudiefiler har nu sekventiell navigering:

**10-StreamliningAI Labs**
Lade till avsnittet Vad kommer näst i modul 10 översikt och modul 11

#### Kod- och innehållskorrigeringar

**SDK och beroendeuppdateringar**
Fixade tom version av openai till `^4.95.0`
Uppdaterade SDK från `^1.8.0` till `>=1.26.0`
Uppdaterade MCP versionspinnar till `>=1.26.0`

**Kodkorrigeringar**
Fixade ogiltig modell `gpt-4o-mini` till `gpt-4.1-mini`

**Innehållskorrigeringar**
Fixade trasig länk `READMEmd` → `README.md`, rättade läroplanshuvud `Module 1-3` → `Module 0-3`, fixade skiftlägeskänslig sökväg
Tog bort korrupt dubblerat innehåll från Case Study 5

**Förbättringar för nybörjarguide**
Lade till korrekt introduktion, lärandemål och förkunskaper för nybörjare

#### Läroplansuppdateringar

**Huvud README.md**
- Lade till poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) i läroplanstabell

**Modul READMEs**
Lade till lektioner 12 och 13 i lektionslistan
Lade till Praktiska guider-avsnitt med pagination-länk
Lade till lektioner 5.15 (Custom Transport) och 5.16 (Protocol Features)

**study_guide.md**
- Uppdaterade tankekarta med alla nya ämnen: MCP Hosts Setup, MCP Inspector, Pagination-strategier, Protokollfunktioner djupdykning

## 28 januari 2026

### MCP Specifikation 2025-11-25 Efterlevnadsgranskning

#### Förbättring av kärnkoncept (01-CoreConcepts/)
- **Ny Client Primitive - Roots**: Lade till omfattande dokumentation om Roots client primitive, vilket möjliggör för servrar att förstå filsystemgränser och åtkomsträttigheter
- **Verktygsanteckningar**: Lade till dokumentation om beteendeanteckningar för verktyg (`readOnlyHint`, `destructiveHint`) för bättre beslut vid verktygsexekvering
- **Verktygsanrop i Sampling**: Uppdaterade Sampling-dokumentation för att inkludera `tools` och `toolChoice` parametrar för modellerad verktygsanrop vid samplingförfrågningar
- **URL-läges-framkallning**: Lade till dokumentation om URL-baserad framkallning för externa webbinteraktioner initierade av servern
- **Uppgifter (Experimentella)**: Lade till nytt avsnitt som dokumenterar den experimentella Uppgiftsfunktionen för hållbara exekveringswrapperar och uppskjutna resultatåtervinningar
- **Ikonsupport**: Noterat att verktyg, resurser, resursmallar och prompts nu kan inkludera ikoner som extra metadata

#### Dokumentationsuppdateringar
- **README.md**: Lade till MCP Specifikation 2025-11-25 versionsreferens och versionsförklaring baserat på datum
- **study_guide.md**: Uppdaterade läroplanskarta för att inkludera Uppgifter och Verktygsanteckningar i Kärnkoncept-avsnittet; uppdaterade dokumentets tidsstämpel

#### Verifiering av specifikationsefterlevnad
- **Protokollversion**: Verifierade att all dokumentation refererar till aktuell MCP Specifikation 2025-11-25
- **Arkitekturjustering**: Bekräftade dubbel-lagers arkitektur (Data Layer + Transport Layer) dokumentationsnoggrannhet
- **Primitivdokumentation**: Validerade serverprimitiver (Resurser, Prompts, Verktyg) och klientprimitiver (Sampling, Framkallning, Loggning, Roots)
- **Transportmekanismer**: Verifierade noggrannheten i STDIO och Streambart HTTP-transportdokument
- **Säkerhetsvägledning**: Bekräftade överensstämmelse med nuvarande MCP säkerhetsbästa praxis

#### Nyckelfunktioner i MCP 2025-11-25 Dokumenterade
- **OpenID Connect Discovery**: Auktoriseringsservers upptäckt via OIDC
- **OAuth Client ID Metadata-dokument**: Rekommenderad klientregistreringsmekanism
- **JSON Schema 2020-12**: Standarddialekt för MCP-schema-definitioner
- **SDK-tieringsystem**: Formaliserade krav på SDK-funktionsstöd och underhåll
- **Styrningsstruktur**: Formaliserade arbetsgrupper och intressegrupper i MCP-styrningen

### Större Säkerhetsdokumentationsuppdatering (02-Security/)

#### Integrering av MCP Security Summit Workshop (Sherpa)
- **Nytt praktiskt träningsmaterial**: Lade till omfattande integrering med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all säkerhetsdokumentation
- **Ruttöversikt för expedition**: Dokumenterade hela läger-till-läger progressionen från Base Camp till Summit
- **OWASP-anpassning**: All säkerhetsvägledning kartläggs nu till OWASP MCP Azure Security Guide risker

#### Integrering av OWASP MCP Top 10
- **Nytt avsnitt**: Lade till OWASP MCP Top 10 säkerhetsriskers tabell med Azure-mitigeringar i huvudsektionen för Säkerhet
- **Riskbaserad dokumentation**: Uppdaterade mcp-security-controls-2025.md med OWASP MCP-riskreferenser för varje säkerhetsdomän
- **Referensarkitektur**: Länkade till OWASP MCP Azure Security Guide:s referensarkitektur och implementeringsmönster

#### Uppdaterade säkerhetsfiler
- **README.md**: Lade till översikt för Sherpa Workshop, tabell över expeditionens rutter, sammanfattning av OWASP MCP Top 10 risker och sektion för praktisk träning
- **mcp-security-controls-2025.md**: Uppdaterade header till februari 2026, lade till OWASP riskreferenser (MCP01-MCP08), korrigerade speversion inkonsekvens
- **mcp-security-best-practices-2025.md**: Lade till Sherpa och OWASP-resursavsnitt, uppdaterade tidsstämpel
- **mcp-best-practices.md**: Lade till avsnitt för praktisk träning med länkar till Sherpa och OWASP
- **azure-content-safety-implementation.md**: Lade till OWASP MCP06-referens, Sherpa Camp 3-anpassning och ytterligare resursavsnitt

#### Nya resurslänkar tillagda
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuella OWASP MCP-risk-sidor (MCP01-MCP10)

### Läroplansövergripande Justering till MCP Specifikation 2025-11-25

#### Modul 03 - Komma igång
- **SDK-dokumentation**: Lade till Go SDK till den officiella SDK-listan; uppdaterade alla SDK-referenser för att överensstämma med MCP Specifikation 2025-11-25
- **Transportförtydligande**: Uppdaterade STDIO- och HTTP Streaming-transportbeskrivningar med explicita specifikationsreferenser

#### Modul 04 - Praktisk Implementering
- **SDK-uppdateringar**: Lade till Go SDK; uppdaterade SDK-lista med versionsreferens till specifikation
- **Auktoriseringsspecifikation**: Uppdaterade MCP Auktoriseringsspecifikationslänk till nuvarande version 2025-11-25

#### Modul 05 - Avancerade Ämnen
- **Nya funktioner**: Lade till notis om nya funktioner i MCP Specifikation 2025-11-25 (Uppgifter, Verktygsanteckningar, URL-lägesframkallning, Roots)
- **Säkerhetsresurser**: Lade till länkar till OWASP MCP Top 10 och Sherpa Workshop som ytterligare referenser

#### Modul 06 - Gemenskapsbidrag
- **SDK-lista**: Lade till Swift och Rust SDK:er; uppdaterade specifikationslänk till 2025-11-25
- **Specifikationsreferens**: Uppdaterade MCP Specifikationslänk till direkt URL till specifikationen

#### Modul 07 - Lärdomar från tidiga adoptioner

- **Resursuppdateringar**: Lagt till MCP Specification 2025-11-25-länk och OWASP MCP Top 10 till ytterligare resurser

#### Modul 08 - Bästa praxis
- **Spec Version**: Uppdaterad MCP Specification-referens till 2025-11-25
- **Säkerhetsresurser**: Lagt till OWASP MCP Top 10 och Sherpa-workshop till ytterligare referenser

#### Modul 10 - Effektivisering av AI-arbetsflöden
- **Badge-uppdatering**: Ändrade MCP versionsbadge från SDK-version (1.9.3) till specifikationsversion (2025-11-25)
- **Resurslänkar**: Uppdaterad MCP Specification-länk; lagt till OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spec-referens**: Uppdaterad MCP Specification-länk till version 2025-11-25
- **Säkerhetsresurser**: Lagt till OWASP MCP Top 10 till officiella resurser

## 18 december, 2025

### Uppdatering av säkerhetsdokumentation - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specifikationsuppdatering
- **Protokollversionsuppdatering**: Uppdaterad för att referera till senaste MCP Specification 2025-11-25 (publicerad 25 november 2025)
  - Uppdaterade alla specifikationsversionsreferenser från 2025-06-18 till 2025-11-25
  - Uppdaterade dokumentdatumreferenser från 18 augusti 2025 till 18 december 2025
  - Verifierade att alla specifikations-URL:er pekar till aktuell dokumentation
- **Innehållsvalidering**: Omfattande validering av säkerhetsbästa praxis mot senaste standarder
  - **Microsoft Security Solutions**: Verifierad aktuell terminologi och länkar för Prompt Shields (tidigare "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID och Azure Key Vault
  - **OAuth 2.1 Security**: Bekräftad överensstämmelse med senaste OAuth säkerhetsbästa praxis
  - **OWASP-standarder**: Validerad att OWASP Top 10 för LLMs-referenser är aktuella
  - **Azure-tjänster**: Verifierade alla Microsoft Azure-dokumentationslänkar och bästa praxis
- **Standardanpassning**: Alla refererade säkerhetsstandarder bekräftade aktuella
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure säkerhets- och efterlevnadsramverk
- **Implementeringsresurser**: Validerade alla länkade implementeringsguider och resurser
  - Azure API Management autentiseringsmönster
  - Microsoft Entra ID integrationsguider
  - Azure Key Vault hemlighetshantering
  - DevSecOps-pipelines och övervakningslösningar

### Dokumentationskvalitetssäkring
- **Specifikationsöverensstämmelse**: Säkerställt att alla obligatoriska MCP säkerhetskrav (MÅSTE/MÅSTE INTE) överensstämmer med senaste specifikationen
- **Resursaktuallitet**: Verifierat alla externa länkar till Microsoft-dokumentation, säkerhetsstandarder och implementeringsguider
- **Täckt bästa praxis**: Bekräftat heltäckande täckning av autentisering, auktorisering, AI-specifika hot, leverantörskedjesäkerhet och företagsmönster

## 6 oktober, 2025

### Utökning av Kom igång-sektion – Avancerad serveranvändning & Enkel autentisering

#### Avancerad serveranvändning (03-GettingStarted/10-advanced)
- **Nytt kapitel tillagt**: Introducerade en omfattande guide för avancerad MCP-serveranvändning, som täcker både vanliga och lågnivåserverarkitekturer.
  - **Vanlig vs. lågnivåserver**: Detaljerad jämförelse och kodexempel i Python och TypeScript för båda tillvägagångssätten.
  - **Handler-baserad design**: Förklaring av handler-baserad verktyg-/resurs-/prompt-hantering för skalbara, flexibla serverimplementationer.
  - **Praktiska mönster**: Verkliga scenarier där lågnivåservermönster är fördelaktiga för avancerade funktioner och arkitektur.

#### Enkel autentisering (03-GettingStarted/11-simple-auth)
- **Nytt kapitel tillagt**: Steg-för-steg-guide för att implementera enkel autentisering i MCP-servrar.
  - **Auth-koncept**: Tydlig förklaring av autentisering vs. auktorisering samt hantering av referenser.
  - **Grundläggande autentiseringsimplementering**: Middleware-baserade autentiseringsmönster i Python (Starlette) och TypeScript (Express), med kodexempel.
  - **Utveckling till avancerad säkerhet**: Vägledning för att börja med enkel autentisering och avancera till OAuth 2.1 och RBAC, med referenser till avancerade säkerhetsmoduler.

Dessa tillägg ger praktisk, hands-on vägledning för att bygga mer robusta, säkra och flexibla MCP-serverimplementationer, som förenar grundläggande koncept med avancerade produktionsmönster.

## 29 september, 2025

### MCP Server Database Integration Labs - Omfattande praktisk inlärningsväg

#### 11-MCPServerHandsOnLabs - Ny komplett databasintegrationskurs
- **Fullständig 13-labbars inlärningsväg**: Lagt till omfattande praktisk kurs för att bygga produktionsfärdiga MCP-servrar med PostgreSQL databasintegration
  - **Verklig implementation**: Zava Retail analytics-användningsfall som demonstrerar företagsklassmönster
  - **Strukturerad inlärningsprogression**:
    - **Laborationer 00-03: Grunderna** - Introduktion, kärnarkitektur, säkerhet & multi-tenant, miljöinställning
    - **Laborationer 04-06: Bygga MCP-servern** - Databasdesign & schema, MCP Server-implementation, verktygsutveckling  
    - **Laborationer 07-09: Avancerade funktioner** - Semantisk sökintegration, testning & felsökning, VS Code-integration
    - **Laborationer 10-12: Produktion & bästa praxis** - Driftsättningsstrategier, övervakning & observerbarhet, bästa praxis & optimering
  - **Företagsteknologier**: FastMCP-ramverk, PostgreSQL med pgvector, Azure OpenAI-embeddingar, Azure Container Apps, Application Insights
  - **Avancerade funktioner**: Radnivåsäkerhet (RLS), semantisk sökning, multi-tenant dataåtkomst, vektor-embeddingar, realtidsövervakning

#### Terminologistandardisering - Omvandling från modul till labb
- **Omfattande dokumentationsuppdatering**: Systematiskt uppdaterat alla README-filer i 11-MCPServerHandsOnLabs för att använda "Labb" istället för "Modul"
  - **Sektionstitlar**: Uppdaterat "Vad denna modul täcker" till "Vad detta labb täcker" i alla 13 labbar
  - **Innehållsbeskrivning**: Ändrat "Denna modul tillhandahåller..." till "Detta labb tillhandahåller..." i dokumentation
  - **Lärandemål**: Uppdaterat "I slutet av denna modul..." till "I slutet av detta labb..." 
  - **Navigationslänkar**: Konverterat alla "Modul XX:"-referenser till "Labb XX:" i korsreferenser och navigation
  - **Slutföringsspårning**: Uppdaterat "Efter att ha slutfört denna modul..." till "Efter att ha slutfört detta labb..."
  - **Bevarade tekniska referenser**: Bibehållit Python-modulreferenser i konfigurationsfiler (t.ex. `"module": "mcp_server.main"`)

#### Studievägledning Förbättring (study_guide.md)
- **Visuell kurskarta**: Lagt till ny sektion "11. Database Integration Labs" med omfattande labbstruktursvisualisering
- **Förvaringsstruktur**: Uppdaterat från tio till elva huvudsektioner med detaljerad beskrivning av 11-MCPServerHandsOnLabs
- **Lärandestyrning**: Förbättrade navigationsinstruktioner för sektionerna 00-11
- **Teknikomfattning**: Lagt till FastMCP, PostgreSQL, Azure-tjänsteintegration detaljer
- **Läranderesultat**: Betoning på produktionsfärdig serverutveckling, databasintegrationsmönster och företagsäkerhet

#### Huvud-README Strukturförbättring
- **Labb-baserad terminologi**: Uppdaterat huvud-README.md i 11-MCPServerHandsOnLabs för konsekvent användning av "Labb"-struktur
- **Lärandestyrningsorganisation**: Tydlig progression från grundläggande koncept till avancerad implementation och produktionsdrift
- **Verklighetsfokus**: Betoning på praktisk, hands-on inlärning med företagsklassmönster och teknologier

### Dokumentationskvalitet & konsekvensförbättringar
- **Hands-on-inlärningsfokus**: Förstärkt praktiskt, labb-baserat tillvägagångssätt genom hela dokumentationen
- **Företagsmönsterfokus**: Framlyft produktionsfärdiga implementationer och företagsäkerhetsaspekter
- **Teknikintegration**: Omfattande täckning av moderna Azure-tjänster och AI-integrationsmönster
- **Lärandeprogression**: Tydlig, strukturerad väg från grundläggande koncept till produktionsdrift

## 26 september, 2025

### Fallstudier Förbättringar - GitHub MCP Registry Integration

#### Fallstudier (09-CaseStudy/) - Ekosystemutvecklingsfokus
- **README.md**: Stor utökning med omfattande GitHub MCP Registry-fallstudie
  - **GitHub MCP Registry Fallstudie**: Ny omfattande fallstudie som undersöker GitHubs lansering av MCP Registry i september 2025
    - **Problemanalys**: Detaljerad granskning av fragmenterade MCP-serverupptäckts- och driftsättningsutmaningar
    - **Lösningsarkitektur**: GitHubs centraliserade registry-ansats med en-klikks-installation för VS Code
    - **Affärspåverkan**: Mätbara förbättringar i utvecklarintroduktion och produktivitet
    - **Strategiskt värde**: Fokus på modulär agentdistribution och verktygsintegration
    - **Ekosystemutveckling**: Positionering som grundläggande plattform för agentbaserad integration
  - **Förbättrad fallstudiestruktur**: Uppdaterade samtliga sju fallstudier med konsekvent formatering och omfattande beskrivningar
    - Azure AI Travel Agents: Fleragentorkestreringsfokus
    - Azure DevOps Integration: Arbetsflödesautomatiseringsfokus
    - Realtidsdokumentationshämtning: Python-konsolklientimplementation
    - Interaktiv studieplansgenerator: Chainlit konverserande webbapp
    - Dokumentation i redigerare: VS Code och GitHub Copilot-integration
    - Azure API Management: Företags-API integrationsmönster
    - GitHub MCP Registry: Ekosystemutveckling och communityplattform
  - **Omfattande slutsats**: Omskriven slutsatssektion som lyfter fram sju fallstudier över flera MCP-implementeringsdimensioner
    - Företagsintegration, Fleragentsorkestrering, Utvecklarproduktivitet
    - Ekosystemutveckling, Kategorisering av utbildningsapplikationer
    - Förbättrade insikter i arkitektur-mönster, implementeringsstrategier och bästa praxis
    - Betoning på MCP som mogen, produktionsfärdig protokoll

#### Uppdateringar i studievägledning (study_guide.md)
- **Visuell kurskarta**: Uppdaterad mindmap för att inkludera GitHub MCP Registry i fallstudiesektionen
- **Fallstudiebeskrivning**: Förbättrad från generiska beskrivningar till detaljerad uppdelning av sju omfattande fallstudier
- **Förvaringsstruktur**: Uppdaterad sektion 10 för att spegla omfattande fallstudietäckning med specifika implementationsdetaljer
- **Changelog-integration**: Lagt till 26 september 2025 post som dokumenterar GitHub MCP Registry-tillägg och fallstudieförbättringar
- **Datumuppdateringar**: Uppdaterat sidfots tidsstämpel för att spegla senaste revision (26 september 2025)

### Dokumentationskvalitetsförbättringar
- **Konsekvensförbättring**: Standardiserad fallstudieformatering och struktur i samtliga sju exempel
- **Omfattande täckning**: Fallstudier spänner nu över företags-, utvecklarproduktivitet och ekosystemutvecklingsscenarier
- **Strategisk positionering**: Förstärkt fokus på MCP som grundläggande plattform för agentbaserad systemsdistribution
- **Resursintegration**: Uppdaterade ytterligare resurser för att inkludera länk till GitHub MCP Registry

## 15 september, 2025

### Utökning av avancerade ämnen - Anpassade transportlager & Kontextteknik

#### MCP Anpassade Transporter (05-AdvancedTopics/mcp-transport/) - Ny avancerad implementeringsguide
- **README.md**: Fullständig implementeringsguide för anpassade MCP-transportmekanismer
  - **Azure Event Grid Transport**: Omfattande serverlös, händelsedriven transportimplementation
    - C#, TypeScript och Python-exempel med Azure Functions-integration
    - Händelsedrivna arkitektur-mönster för skalbara MCP-lösningar
    - Webhook-mottagare och pushbaserad meddelandehantering
  - **Azure Event Hubs Transport**: Höggenomströmning streamingtransport-implementation
    - Realtidsstreamingfunktioner för låg-latensscenarier
    - Partitioneringsstrategier och checkpoint-hantering
    - Meddelandebatchning och prestandaoptimering
  - **Företagsintegrationsmönster**: Produktionsfärdiga arkitekturexempel
    - Distribuerad MCP-bearbetning över flera Azure Functions
    - Hybridtransportarkitekturer som kombinerar flera transporttyper
    - Meddelandets hållbarhet, tillförlitlighet och felhanteringsstrategier
  - **Säkerhet & Övervakning**: Azure Key Vault-integration och observerbarhetsmönster
    - Hanterad identitetsautentisering och minsta privilegietillgång
    - Application Insights telemetri och prestandaövervakning
    - Strömavbrottsbrytare och fel-toleransmönster
  - **Testningsramverk**: Omfattande testningsstrategier för anpassade transporter
    - Enhetstester med testdubbletter och mocking-ramverk
    - Integrationstester med Azure Test Containers
    - Prestanda- och belastningstesters aspekter

#### Kontextteknik (05-AdvancedTopics/mcp-contextengineering/) - Framväxande AI-disciplin
- **README.md**: Omfattande utforskning av kontextteknik som ett framväxande område
  - **Kärnprinciper**: Komplett kontextdelning, handlingsbeslutsmedvetenhet och hantering av kontextfönster
  - **MCP Protokollanpassning**: Hur MCP-design adresserar kontexttekniksutmaningar
    - Begränsningar i kontextfönster och progressiva inladdningsstrategier
    - Relevansbestämning och dynamisk kontexthämtning
    - Multimodal kontexthantering och säkerhetsaspekter
  - **Implementeringsmetoder**: Entrådad vs. fleragentarkitektur
    - Kontextuppdelning och prioriteringstekniker
    - Progressiv kontextinladdning och komprimeringsstrategier
    - Lager-på-lager-kontextmetoder och optimering för hämtning
  - **Mätningsramverk**: Framväxande mått för kontexteffektivitetsbedömning
    - Input-effektivitet, prestanda, kvalitet och användarupplevelse
    - Experimentella metoder för kontextoptimering
    - Felanalys och förbättringsmetodik

#### Uppdateringar i kursnavigering (README.md)
- **Förbättrad modulstruktur**: Uppdaterad kurslista för att inkludera nya avancerade ämnen
  - Tillagt Kontextteknik (5.14) och Anpassad Transport (5.15)
  - Konsekvent formatering och navigationslänkar över alla moduler
  - Uppdaterade beskrivningar för att spegla aktuellt innehållsomfång

### Förbättringar i katalogstruktur
- **Namnstandardisering**: Omdöpt "mcp transport" till "mcp-transport" för konsekvens med andra avancerade ämnesmappar
- **Innehållsorganisation**: Alla 05-AdvancedTopics-mappar följer nu konsekvent namngivningsmönster (mcp-[ämne])

### Dokumentationskvalitetsförbättringar
- **MCP Specifikationens Anpassning**: Allt nytt innehåll refererar till aktuella MCP Specification 2025-06-18
- **Fler-språkliga exempel**: Omfattande kodexempel i C#, TypeScript och Python

- **Företagsfokus**: Produktionsfärdiga mönster och integration med Azure-molnet genomgående  
- **Visuell dokumentation**: Mermaid-diagram för arkitektur och flödesvisualisering  

## 18 augusti 2025  

### Omfattande dokumentationsuppdatering - MCP 2025-06-18 standarder  

#### MCP Säkerhetsbästa praxis (02-Security/) - Fullständig modernisering  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullständig omskrivning i linje med MCP Specifikation 2025-06-18  
  - **Obligatoriska krav**: Tillagda uttryckliga MÅSTE/MÅSTE INTE-krav från officiell specifikation med tydliga visuella indikatorer  
  - **12 kärnsäkerhetspraxis**: Omstrukturerade från en lista på 15 punkter till omfattande säkerhetsdomäner  
    - Token-säkerhet & autentisering med integration av extern identitetsleverantör  
    - Sessionshantering & transportsäkerhet med kryptografiska krav  
    - AI-specifik hotbeskydd med Microsoft Prompt Shields-integration  
    - Åtkomstkontroll & behörigheter med principen om minsta privilegium  
    - Innehållssäkerhet & övervakning med Azure Content Safety-integration  
    - Säkerhet i leverantörskedjan med omfattande komponentverifiering  
    - OAuth-säkerhet & förhindrande av förväxling med PKCE-implementering  
    - Incidenthantering & återhämtning med automatiserade funktioner  
    - Efterlevnad & styrning med regulatorisk anpassning  
    - Avancerade säkerhetskontroller med zero trust-arkitektur  
    - Microsofts säkerhetsekosystemintegration med omfattande lösningar  
    - Kontinuerlig säkerhetsevolution med adaptiva praxis  
  - **Microsoft säkerhetslösningar**: Förbättrad integrationsvägledning för Prompt Shields, Azure Content Safety, Entra ID och GitHub Advanced Security  
  - **Implementeringsresurser**: Kategoriserade omfattande resurslänkar efter Officiell MCP-dokumentation, Microsoft säkerhetslösningar, säkerhetsstandarder och implementationsguider  

#### Avancerade säkerhetskontroller (02-Security/) - Företagsimplementering  
- **MCP-SECURITY-CONTROLS-2025.md**: Total översyn med företagsklassad säkerhetsram  
  - **9 omfattande säkerhetsdomäner**: Utökade från grundläggande kontroller till detaljerad företagsram  
    - Avancerad autentisering & auktorisering med Microsoft Entra ID-integration  
    - Token-säkerhet & anti-passthrough-kontroller med omfattande validering  
    - Sessionssäkerhetskontroller med kapningsskydd  
    - AI-specifika säkerhetskontroller med skydd mot promptinjektion och verktygsförgiftning  
    - Förhindrande av confused deputy-attacker med OAuth-proxy-säkerhet  
    - Verktygsexekveringssäkerhet med sandboxing och isolering  
    - Säkerhetskontroller för leverantörskedjan med beroendeverifiering  
    - Övervaknings- & detektionskontroller med SIEM-integration  
    - Incidenthantering & återhämtning med automatiserade funktioner  
  - **Implementeringsexempel**: Tillagda detaljerade YAML-konfigurationsblock och kodexempel  
  - **Microsoft lösningsintegration**: Omfattande täckning av Azure säkerhetstjänster, GitHub Advanced Security och företagsidentitetshantering  

#### Avancerade säkerhetsteman (05-AdvancedTopics/mcp-security/) - Produktionsfärdig implementation  
- **README.md**: Fullständig omskrivning för företags säkerhetsimplementering  
  - **Aktuell specifikationsanpassning**: Uppdaterad till MCP Specifikation 2025-06-18 med obligatoriska säkerhetskrav  
  - **Förstärkt autentisering**: Microsoft Entra ID-integration med omfattande .NET och Java Spring Security-exempel  
  - **AI-säkerhetsintegration**: Implementering av Microsoft Prompt Shields och Azure Content Safety med detaljerade Python-exempel  
  - **Avancerad hotmildring**: Omfattande implementeringsexempel för  
    - Förhindrande av confused deputy-attacker med PKCE och användarsamtyckesvalidering  
    - Förhindrande av token-passthrough med auditorievalidering och säker tokenhantering  
    - Förhindrande av sessionkapning med kryptografisk bindning och beteendeanalys  
  - **Företagssäkerhetsintegration**: Azure Application Insights-övervakning, hotdetektionspipelines och leverantörskedjesäkerhet  
  - **Implementeringschecklista**: Tydliga obligatoriska kontra rekommenderade säkerhetskontroller med fördelar från Microsofts säkerhetsekosystem  

### Dokumentationskvalitet & standardanpassning  
- **Specifikationsreferenser**: Uppdaterade alla referenser till aktuella MCP Specifikation 2025-06-18  
- **Microsoft säkerhetsekosystem**: Förbättrad integrationsvägledning genom all säkerhetsdokumentation  
- **Praktisk implementering**: Tillagda detaljerade kodexempel i .NET, Java och Python med företagsmönster  
- **Resursorganisation**: Omfattande kategorisering av officiell dokumentation, säkerhetsstandarder och implementationsguider  
- **Visuella indikatorer**: Tydlig markering av obligatoriska krav kontra rekommenderade praxis  


#### Grundläggande koncept (01-CoreConcepts/) - Fullständig modernisering  
- **Protokollversionsuppdatering**: Uppdaterad för att referera till aktuella MCP Specifikation 2025-06-18 med datum-baserad versionering (ÅÅÅÅ-MM-DD-format)  
- **Arkitekturförfining**: Förbättrade beskrivningar av Hosts, Clients och Servers för att spegla aktuella MCP-arkitektur mönster  
  - Hosts definierade tydligt som AI-applikationer som koordinerar flera MCP-klientanslutningar  
  - Clients beskrivna som protokollkopplingar som upprätthåller ett-till-ett serverrelationer  
  - Servers förbättrade med lokala kontra fjärrutplaceringsscenarier  
- **Primitiv omstrukturering**: Total översyn av server- och klientprimitiver  
  - Serverprimitiver: Resurser (dataströmmar), Prompter (mallar), Verktyg (körbara funktioner) med detaljerade förklaringar och exempel  
  - Klientprimitiver: Sampling (LLM-kompletteringar), Framkallning (användarinmatning), Loggning (felsökning/övervakning)  
  - Uppdaterade med aktuella mönster för sökning (`*/list`), hämtning (`*/get`) och exekvering (`*/call`)  
- **Protokollarkitektur**: Infört tvålagers arkitekturmodell  
  - Dataskikt: JSON-RPC 2.0-bas med livscykelhantering och primitiver  
  - Transportskikt: STDIO (lokal) och Streamable HTTP med SSE (fjärrobilitet) transportmekanismer  
- **Säkerhetsramverk**: Omfattande säkerhetsprinciper inklusive uttryckligt användarsamtycke, dataskydd, verktygsexekveringssäkerhet och transportskiktssäkerhet  
- **Kommunikationsmönster**: Uppdaterade protokollmeddelanden för att visa initialisering, sökning, exekvering och notifieringsflöden  
- **Kodexempel**: Uppdaterade flerspråkiga exempel (.NET, Java, Python, JavaScript) för att spegla aktuella MCP SDK-mönster  

#### Säkerhet (02-Security/) - Omfattande säkerhetsöversyn  
- **Standardanpassning**: Fullständig anpassning till MCP Specifikation 2025-06-18 säkerhetskrav  
- **Autentiseringens utveckling**: Dokumenterad utveckling från egna OAuth-servrar till delegation av extern identitetsleverantör (Microsoft Entra ID)  
- **AI-specifik hotanalys**: Förbättrad täckning av moderna AI-attackvektorer  
  - Detaljerade scenarier för promptinjektionsattacker med verkliga exempel  
  - Verktygsförgiftningsmekanismer och "rug pull"-attackmönster  
  - Förgiftning av kontextfönster och förvirringsattacker mot modeller  
- **Microsoft AI-säkerhetslösningar**: Omfattande täckning av Microsofts säkerhetsekosystem  
  - AI Prompt Shields med avancerad detektion, spotlighting och avgränsartekniker  
  - Azure Content Safety-integrationsmönster  
  - GitHub Advanced Security för skydd av leverantörskedja  
- **Avancerad hotmildring**: Detaljerade säkerhetskontroller för  
  - Sessionskapning med MCP-specifika attackscenarier och kryptografiska sessions-ID-krav  
  - Problem med confused deputy i MCP proxy-scenarier med uttryckliga samtyckeskrav  
  - Sårbarheter vid token-passthrough med obligatoriska valideringskontroller  
- **Säkerhet i leverantörskedjan**: Utökad AI-leverantörskedjetäckning inklusive grundmodeller, embeddings-tjänster, kontextleverantörer och tredjeparts-API:er  
- **Foundationssäkerhet**: Förbättrad integration med företags säkerhetsmönster inklusive zero trust-arkitektur och Microsoft säkerhetsekosystem  
- **Resursorganisation**: Kategoriserade omfattande resurslänkar efter typ (Officiell dokumentation, standarder, forskning, Microsoft-lösningar, implementationsguider)  

### Förbättringar av dokumentationskvalitet  
- **Strukturerade lärandemål**: Förbättrade lärandemål med specifika, genomförbara utfall  
- **Korsreferenser**: Tillagda länkar mellan relaterade säkerhets- och grundläggandekonceptämnen  
- **Aktuell information**: Uppdaterade alla datumreferenser och specifikationslänkar till gällande standarder  
- **Implementeringsvägledning**: Tillagda specifika, genomförbara implementeringsriktlinjer i båda sektionerna  

## 16 juli 2025  

### README och navigationsförbättringar  
- Fullständigt omdesignad kursnavigering i README.md  
- Ersatt `<details>`-taggar med mer tillgängligt tabellbaserat format  
- Skapat alternativa layoutalternativ i den nya mappen "alternative_layouts"  
- Tillagda navigeringsexempel baserade på kort, flikar och dragspelsstil  
- Uppdaterat avsnittet för arkivstruktur för att inkludera alla senaste filer  
- Förbättrat avsnittet "Hur man använder denna kurs" med tydliga rekommendationer  
- Uppdaterat MCP-specifikationslänkar för att peka till korrekta URL:er  
- Tillagt avsnittet Kontext Engineering (5.14) till kursstrukturen  

### Uppdateringar i studiehandledningen  
- Fullständigt reviderad studiehandledning för att överensstämma med aktuell arkivstruktur  
- Tillagda nya sektioner för MCP-klienter och verktyg, samt populära MCP-servrar  
- Uppdaterad visuell kurskarta för att korrekt återspegla alla ämnen  
- Förbättrade beskrivningar av avancerade ämnen för att täcka alla specialiserade områden  
- Uppdaterat avsnittet Fallstudier för att återspegla verkliga exempel  
- Tillagt denna omfattande ändringslogg  

### Gemenskapsbidrag (06-CommunityContributions/)  
- Tillagda detaljerade uppgifter om MCP-servrar för bildgenerering  
- Tillagt omfattande avsnitt om att använda Claude i VSCode  
- Tillagt anvisningar för installation och användning av Cline terminalklient  
- Uppdaterat MCP-klientavsnitt för att inkludera alla populära klientalternativ  
- Förbättrade exempel på bidrag med mer exakta kodexempel  

### Avancerade ämnen (05-AdvancedTopics/)  
- Organiserade alla specialiserade ämnesmappar med konsekvent namngivning  
- Tillagda material och exempel för kontextteknik  
- Tillagt dokumentation för Foundry-agentintegration  
- Förbättrad dokumentation för Entra ID-säkerhetsintegration  

## 11 juni 2025  

### Första skapandet  
- Publicerade första versionen av MCP för nybörjare-kursen  
- Skapade grundstruktur för alla 10 huvudsektioner  
- Implementerade visuell kurskarta för navigering  
- Tillagda initiala exempelprojekt i flera programmeringsspråk  

### Kom igång (03-GettingStarted/)  
- Skapade första serverimplementeringsexemplen  
- Tillagda riktlinjer för klientutveckling  
- Inkluderade anvisningar för integration av LLM-klient  
- Tillagd dokumentation för VS Code-integration  
- Implementerade serverexempel för Server-Sent Events (SSE)  

### Grundläggande koncept (01-CoreConcepts/)  
- Tillagd detaljerad förklaring av klient-server-arkitektur  
- Skapade dokumentation om nyckelkomponenter i protokollet  
- Dokumenterade meddelandemönster i MCP  

## 23 maj 2025  

### Arkivstruktur  
- Initierade arkivet med grundläggande mappstruktur  
- Skapade README-filer för varje huvudsektion  
- Satte upp översättningsinfrastruktur  
- Tillagda bildresurser och diagram  

### Dokumentation  
- Skapade initial README.md med kursöversikt  
- Tillagde CODE_OF_CONDUCT.md och SECURITY.md  
- Satte upp SUPPORT.md med vägledning för att få hjälp  
- Skapade preliminär struktur för studiehandledning  

## 15 april 2025  

### Planering och ramverk  
- Initial planering för MCP för nybörjare-kursen  
- Definierade lärandemål och målgrupp  
- Skisserade 10-sektionsstruktur för kursen  
- Utvecklade konceptuellt ramverk för exempel och fallstudier  
- Skapade initiala prototypexempel för nyckelkoncept  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->