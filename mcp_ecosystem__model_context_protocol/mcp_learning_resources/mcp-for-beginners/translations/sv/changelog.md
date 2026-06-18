# Ändringslogg: MCP för Nybörjare Kursplan

Detta dokument fungerar som en logg över alla viktiga förändringar som gjorts i Model Context Protocol (MCP) för Nybörjare kursplanen. Ändringar dokumenteras i omvänd kronologisk ordning (nyaste ändringar först).

## 16 juni 2026

### Justering av MCP-specifikation & Validering av Exempel

Validerade kursplanen mot nuvarande **MCP Specification 2025-11-25** och de senaste officiella SDK:erna, sedan korrigerades kvarvarande föråldrade specifikationsreferenser och bekräftades att kärnexemplen fortfarande byggs och körs.

#### Korrigeringar av specifikationsversion (2025-06-18 / 2025-03-26 → 2025-11-25)

Uppdaterade engelskt innehåll där det fortfarande påstods att en äldre specifikationsrevision var den *nuvarande/senaste* standarden, och pekade om länkar till de kanoniska `modelcontextprotocol.io` specifikationsvägarna:
- **05-AdvancedTopics/mcp-security/README.md**: Uppdaterade "Current Standard" banner, introduktion, huvudrubrik för kärnsäkerhetsprinciper, rubrik för obligatoriska krav, Microsoft Entra ID-sektionen, Referenser & Resurser länkar, och avslutande säkerhetsmeddelande (8 referenser) till 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Uppdaterade Specifikationslänken för Ytterligare Resurser och "Current Standard" bannern till 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Ersatte den inaktuella `2025-03-26` säkerhets- och förtroendelänken med den aktuella sidan för säkerhetsbästa praxis 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Uppdaterade den officiella sampling-dokumentationslänken till 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Uppdaterade presensreferensen "current MCP specification" och länken för ytterligare resurser till 2025-11-25 (historiska noteringar om SSE-avveckling lämnades intakta för noggrannhet)

#### Validering av Exempel mot Nuvarande SDK:er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` löste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` godkändes utan typfel — existerande `McpServer`/`StdioServerTransport` API:er förblir giltiga
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validerad i en isolerad `.venv` med `mcp[cli]` (1.27.2); `py_compile` godkändes och `FastMCP.list_tools()` returnerade korrekt verktygen `add` och `subtract`
- Bekräftade att alla exemplet `@modelcontextprotocol/sdk` versionsintervall (`>=1.26.0` / `^1.26.0` / `^1.27.0`) löser sig smidigt till nuvarande `1.29.0` utan brytande API-ändringar

#### Justering av Beroendepinnar (stängning av versionsgap)

Uppgraderade föråldrade SDK-pinnar så att varje exempel spårar den aktuella MCP-versionen, i överensstämmelse med repo-bredd konvention:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Uppgraderade `@modelcontextprotocol/sdk` från `^1.8.0` → `>=1.26.0` och uppdaterade den föråldrade paketbeskrivningen `"updated for MCP 2025-06-18"` till `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** och **lab4/code/github_mcp_server/pyproject.toml**: Uppgraderade exakta pinnen `mcp==1.23.0` → `mcp>=1.26.0`; regenererade båda `uv.lock` filerna (`uv lock`) så att låsfilerna löser till nuvarande `mcp 1.27.2` och förblir synkroniserade med manifesterna

#### Analys av Kursplanens Täthet — Senaste Spec-funktioners Täckning

Verifierade att kursplanen redan täcker alla primitiva funktioner introducerade/utökade i MCP 2025-11-25, så inga innehållsgap finns kvar:
- **Sampling**: Lektion 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-läge)**: Dokumenterad i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumenterad i 00-Introduction, 01-CoreConcepts, och 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimentella, långvariga operationer)**: Dokumenterad i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features
- **Verktygsannoteringar** (`readOnlyHint` / `destructiveHint`): Dokumenterad i 01-CoreConcepts och 05-AdvancedTopics/mcp-protocol-features

### Säkerhetsförstärkning & Åtgärd av Beroende-sårbarheter

Körde en fullständig säkerhetsgenomgång av alla beroendemanifest och exempelkällkod, och åtgärdade därefter alla rapporterade npm-rådgivningar och ett säkerhetsproblem i koden. Efter åtgärdande rapporterar `npm audit` **0 sårbarheter** i alla granskade kataloger.

#### npm Beroendesårbarheter (transitiva) — Åtgärdade

Granskade samtliga 15 inskickade `package-lock.json` filer. Sårbarheter begränsades till transitiva beroenden som dras in av MCP Inspector dev-verktyget, OpenAI-klienten och MCP SDK; allt är nu löst utan att bryta exemplen:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** och **lab3/code/weather_mcp/inspector**: Uppgraderade `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), vilket rensade de bundlade `ajv`, `brace-expansion`, `diff`, `path-to-regexp` och `ws` rådgivningarna. Lade till en npm `overrides` post som tvingar fram patchad `shell-quote@1.8.4` för att eliminera kvarvarande kritisk rådgivning från `concurrently`; regenererade båda låsfilerna (nu 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` uppdaterade den transitiva `qs` (moderat) till en patchad release
- **03-GettingStarted/samples/javascript**: `npm audit fix` uppdaterade den transitiva `hono` (moderat) till en patchad release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` uppdaterade den transitiva `form-data` (hög) till en patchad release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererade den saknade `package-lock.json` så projektet är reproducerbart och granskningsbart (0 sårbarheter)

#### Kodnivåsäkerhetsfix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Tog bort `shell=True` från `open_in_vscode` verktyget. Tidigare tillät `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` skalmetatecken i en mappsökväg att tolkas av `cmd.exe` (kommandoinjektionsvektor). Det startar nu den uppslagna `Code.exe` direkt med mappen som argument — utan skal — vilket är funktionellt ekvivalent och säkert

#### Python Beroendegranskning

- Granskade varje Python-kravssats med `pip-audit`. `05-AdvancedTopics` och `03-GettingStarted/samples/python` rapporterade **inga kända sårbarheter** (deras `mcp` / `httpx` / `pydantic` / `python-dotenv` intervall löser till aktuella patchade releaser)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flaggade den transitiva beroendet **`werkzeug` 3.1.1** med tre `safe_join` Windows-enhetsnamns DoS-rådgivningar — `CVE-2025-66221`, `CVE-2026-21860`, och `CVE-2026-27199` (alla fixade i 3.1.6). Lade till en explicit säkerhetspinne `werkzeug>=3.1.6` så patchad release löses; verifierade att begränsningen löser smidigt med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnamnsrebranding

Uppdaterade allt kursplansinnehåll för att återspegla Microsofts produktrebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Uppdaterad Discord community-länk
- **AGENTS.md**: Uppdaterad Discord-serverreferens
- **README.md**: Uppdaterade teknologiekosystemreferenser
- **study_guide.md**: Uppdaterade fallstudie-referenser
- **05-AdvancedTopics/README.md**: Uppdaterad modul 5.13 titel och beskrivning
- **05-AdvancedTopics/mcp-integration/README.md**: Uppdaterad sektionsrubrik och beskrivning
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Fullständig modul titel och innehållsuppdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Uppdaterad korsreferenslänk
- **07-LessonsfromEarlyAdoption/README.md**: Uppdaterade fallstudie-referenser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Uppdaterad Sektion 9 rubrik, märken och kapabiliteter
- **08-BestPractices/README.md**: Uppdaterad Discord community-länk
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Uppdaterad Discord-kanalreferens
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Uppdaterad referens till modellutplacering
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Uppdaterad AI Services-tabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Uppdaterade resursreferenser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension för VS Code
- **README.md**: Uppdaterade huvudsakliga kursplansreferenser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Uppdaterad modultitel, översikt, och alla modulrubriker
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Uppdaterad titel, lärandemål, installationsinstruktioner och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Uppdaterad titel, lärandemål, MCP-värdtabell och korsreferenser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Uppdaterad titel, märken, förkunskapskrav och resurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Uppdaterade Agent Builder-referenser och återkopplingslänk
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Uppdaterade förkunskapskrav och förlängningsreferenser

---

## 11 april 2026

### Ny Lektion, Dokumentationsfixar och Beroendeuppdateringar

#### Nytt kursinnehåll tillagt

**Modul 05 - Avancerade Ämnen**
- **Lektion 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattande guide som täcker det adversariella debattmönstret för multi-agent-system
  - Mermaid arkitekturdiagram: två agenter → delad MCP-server → debatttranskript → domare → domslut
  - Delad MCP-verktygsserver (`web_search` + `run_python`) implementerad i Python och TypeScript
  - Motstående system-promptar (FÖR / MOT / Domare) med explicita krav på verktygsanvändning
  - Debatt-orkestrerare i Python, TypeScript och C# som hanterar rundor och dirigerar argument
  - MCP `ClientSession` koppling för orkestreraren till riktiga verktygsanrop
  - Användarfallstabell (hallucinationsdetektion, hotmodellering, API-designgranskning, faktakontroll, teknikval)
  - Säkerhetsaspekter: sandboxad exekvering, validering av verktygsanrop, takbegränsning, revisionsloggning
  - Strukturerad övning med tre praktiska scenarier (kodgranskning, arkitekturval, innehållsmoderering)

#### Dokumentationsfixar

**Modul 03 - Komma Igång**
- **05-stdio-server/README.md**: Fixade ofullständigt TypeScript stdio-serverexempel — la till saknad transportinstansiering (`new StdioServerTransport()`) och `server.connect(transport)` för att matcha Python och .NET-exemplen i samma avsnitt
- **14-sampling/README.md**: Fixade stavfel — korrigerade `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Kursuppdateringar

**Huvud README.md**
- Lade till post 5.17 (Adversarial Multi-Agent Reasoning med MCP) i kursplanstabellen med direktlänk till nya lektionen

**05-AdvancedTopics/README.md**
- Lade till rad för Lektion 5.17 i lektionstabellen

**study_guide.md**
- Lade till temat Adversarial Multi-Agent Reasoning i tankekartan och prosabeskrivningen för Avancerade Ämnen

#### Kod- och Säkerhetsfixar

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Säkerhetsfix — kommandoinjektion**: Ersatte TypeScript `run_python` verktygets shell-interpolering `execSync` med `execFile` + `promisify`, vilket eliminerar kommandoinjektionsytan (LLM-kontrollerad kod skickas nu som en bokstavlig argv-komponent utan skalinblandning)
- **MCP verktygsloppskoppling**: Uppdaterade Python diskussionsorkestratorn till att använda `AsyncAnthropic` klient (ersätter blockande synkrona `Anthropic`), skicka en live `ClientSession` direkt till varje agentomgång, hämta verktygsdefinitioner via `session.list_tools()` varje omgång, och sända `tool_use` block via `session.call_tool()` i en loop tills modellen ger ett slutgiltigt textrespons.

#### Uppdateringar av beroenden

- Uppgraderade `hono` till 4.12.12 i flera paket (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Uppgraderade `@hono/node-server` från 1.19.11 till 1.19.13 i TypeScript-paket
- Uppgraderade `cryptography` från 46.0.5 till 46.0.7 i Python-paket (10-StreamliningAIWorkflows labbar 3 och 4)
- Uppgraderade `lodash` från 4.17.23 till 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Översättningar

- Synkroniserade översättningar för 48+ språk med de senaste källändringarna (i18n uppdatering)

---

## 5 februari 2026

### Förbättringar i validering och navigering i hela repositoryt

#### Nytt kursinnehåll tillagt

**Modul 03 - Komma igång**
- **12-mcp-hosts/README.md**: Ny omfattande guide för att sätta upp MCP-värdar
  - Konfigurationsexempel för Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurationsmallar för alla stora värdar
  - Jämförelsetabell över transporttyper (stdio, SSE/HTTP, WebSocket)
  - Felsökning av vanliga anslutningsproblem
  - Säkerhetsrutiner för värdkonfiguration

- **13-mcp-inspector/README.md**: Ny felsökningsguide för MCP Inspector
  - Installationsmetoder (npx, npm globalt, från källkod)
  - Anslutning till servrar via stdio och HTTP/SSE
  - Testverktyg, resurser och arbetsflöden för prompts
  - VS Code-integration med MCP Inspector
  - Vanliga felsökningsscenarier med lösningar

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny guide för implementering av paginering
  - Cursor-baserade pagineringmönster i Python, TypeScript, Java
  - Klientsidans hantering av paginering
  - Cursor-designstrategier (opak vs strukturerad)
  - Rekommendationer för prestandaoptimering

**Modul 05 - Avancerade ämnen**
- **mcp-protocol-features/README.md**: Ny djupdykning i protokollfunktioner
  - Implementering av progressnotiser
  - Mönster för begäran-avbokning
  - Resursmallar med URI-mönster
  - Serverlivscykelhantering
  - Kontroll av loggningsnivå
  - Felhanteringsmönster med JSON-RPC-koder

#### Navigeringsfixar (24+ filer uppdaterade)

**Huvudmodulers README-filer**
 Nu länkar både till första lektionen OCH nästa modul

**02-Säkerhet Underdokument**
- Alla 5 kompletterande säkerhetsdokument har nu ”Vad är nästa?”-navigering:

**09-Fallstudiefiler**
- Alla fallstudiefiler har nu sekventiell navigering:

**10-StreamliningAI Labs**
Lade till sektion ”Vad är nästa?” i Modul 10 översikt och Modul 11

#### Kod- och innehållsfixar

**SDK och beroendeuppdateringar**
Fixade tom version av openai till `^4.95.0`
Uppdaterade SDK från `^1.8.0` till `>=1.26.0`
Uppdaterade mcp versionsstiftor till `>=1.26.0`

**Kodfixar**
Fixade ogiltig modell `gpt-4o-mini` till `gpt-4.1-mini`

**Innehållsfixar**
Fixade trasig länk `READMEmd` → `README.md`, fixade kursrubrik `Module 1-3` → `Module 0-3`, fixade skiftlägeskänslig sökväg
Tog bort korrupt duplicerat innehåll i Case Study 5

**Nybörjarguidning förbättrad**
Lade till korrekt introduktion, lärandemål och förkunskapskrav för nybörjare

#### Kursuppdateringar

**Huvud README.md**
- Lade till poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) i kursöversikten

**Modulernas README-filer**
Lade till lektioner 12 och 13 i lektionslistan
Lade till Praktiska guider-sektion med länk till paginering
Lade till lektioner 5.15 (Custom Transport) och 5.16 (Protocol Features)

**study_guide.md**
- Uppdaterade mindmap med alla nya ämnen: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## 28 januari 2026

### MCP-specifikation 2025-11-25 granskningsrapport

#### Förstärkningar i kärnkoncept (01-CoreConcepts/)
- **Ny klientprimitive - Roots**: Lade till omfattande dokumentation om klientprimitive Roots som gör det möjligt för servrar att förstå filsystemgränser och åtkomsträttigheter
- **Verktygsanteckningar**: Lade till dokumentation om verktygsbeteendeanteckningar (`readOnlyHint`, `destructiveHint`) för bättre beslut om verktygskörning
- **Verktygsanrop i Sampling**: Uppdaterade Sampling-dokumentationen med parametrarna `tools` och `toolChoice` för modellstyrd verktygsanrop vid samplingförfrågningar
- **URL-läge för elicitation**: Lade till dokumentation om URL-baserad elicitation för serverinitierad extern web-interaktion
- **Tasks (Experimentellt)**: Lade till ny sektion om experimentella Tasks för hållbara exekveringsomslag och fördröjd resultatinläsning
- **Ikoner stöd**: Nämnde att verktyg, resurser, resursmallar och prompts nu kan innehålla ikoner som extra metadata

#### Uppdateringar i dokumentation
- **README.md**: Lade till MCP-specifikation 2025-11-25 versionsreferens och datumbaserad versionering förklaring
- **study_guide.md**: Uppdaterade kurskarta med Tasks och Tool Annotations i Core Concepts-sektionen; uppdaterade dokumentets tidsstämpel

#### Specifikationsöverensstämmelse verifierad
- **Protokollversion**: Bekräftade att all dokumentation refererar till nuvarande MCP-specifikation 2025-11-25
- **Arkitektonisk anpassning**: Bekräftade korrekt tvålagsarkitektur (Data Layer + Transport Layer)
- **Primitive-dokumentation**: Validerade serverprimitiver (Resources, Prompts, Tools) och klientprimitiver (Sampling, Elicitation, Logging, Roots)
- **Transportmekanismer**: Verifierade dokumentationen för STDIO och Streamable HTTP
- **Säkerhetsvägledning**: Bekräftade överensstämmelse med aktuella MCP säkerhetsbästa praxis

#### Viktiga MCP 2025-11-25 funktioner dokumenterade
- **OpenID Connect Discovery**: Auth-server upptäckt genom OIDC
- **OAuth Client ID metadata-dokument**: Rekommenderad klientregistreringsmekanism
- **JSON Schema 2020-12**: Standarddialekt för MCP schema definitioner
- **SDK Tiering System**: Formaliserade krav för SDK-funktionssupport och underhåll
- **Styrstruktur**: Formaliserade arbetsgrupper och intressegrupper i MCP-styrningen

### Större uppdatering av säkerhetsdokumentationen (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integration
- **Ny praktisk träningsresurs**: Lade till omfattande integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all säkerhetsdokumentation
- **Expeditionsrutt täckt**: Dokumenterade komplett rutt från basläger till toppen
- **OWASP-anpassning**: All säkerhetsvägledning kartläggs nu till OWASP MCP Azure Security Guide risker

#### OWASP MCP Top 10 integration
- **Ny sektion**: Lade till OWASP MCP Top 10 lista över säkerhetsrisker med Azure-mitigeringar i huvud-README för säkerhet
- **Riskbaserad dokumentation**: Uppdaterade mcp-security-controls-2025.md med OWASP MCP riskreferenser för varje säkerhetsdomän
- **Referensarkitektur**: Länkade till OWASP MCP Azure Security Guide referensarkitektur och implementeringsmönster

#### Uppdaterade säkerhetsfiler
- **README.md**: Lade till Sherpa workshop-översikt, expeditionsrutt-tabell, OWASP MCP Top 10 risköversikt och praktisk träningssektion
- **mcp-security-controls-2025.md**: Uppdaterade header till februari 2026, lade till OWASP riskreferenser (MCP01-MCP08), fixade inkonsekvent spec-version
- **mcp-security-best-practices-2025.md**: Lade till Sherpa och OWASP resurser, uppdaterade tidsstämpel
- **mcp-best-practices.md**: Lade till praktisk träningssektion med Sherpa och OWASP länkar
- **azure-content-safety-implementation.md**: Lade till OWASP MCP06-referens, Sherpa Camp 3-anpassning och tilläggsresurser

#### Nya resurslänkar tillagda
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuella OWASP MCP risk-sidor (MCP01-MCP10)

### Kursövergripande MCP-specifikation 2025-11-25 anpassning

#### Modul 03 - Komma igång
- **SDK-dokumentation**: Lade till Go SDK i officiell SDK-lista; uppdaterade alla SDK-referenser för att matcha MCP-specifikation 2025-11-25
- **Transportklargörande**: Uppdaterade beskrivningar för STDIO och HTTP Streaming med uttryckliga specifikationsreferenser

#### Modul 04 - Praktisk implementering
- **SDK-uppdateringar**: Lade till Go SDK; uppdaterade SDK-listan med spec versionsreferens
- **Autorisationsspecifikation**: Uppdaterade MCP Authorization-specifikationslänk till aktuell version 2025-11-25

#### Modul 05 - Avancerade ämnen
- **Nya funktioner**: Lade till notis om nya MCP-specifikation 2025-11-25 funktioner (Tasks, Tool Annotations, URL Mode Elicitation, Roots)
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 och Sherpa workshop-länkar till ytterligare referenser

#### Modul 06 - Communitybidrag
- **SDK-lista**: Lade till Swift och Rust SDKs; uppdaterade spec-länk till 2025-11-25
- **Specifikationsreferens**: Uppdaterade MCP Specification-länk till direkt spec-URL

#### Modul 07 - Lärdomar från tidig adoption
- **Resursuppdateringar**: Lade till MCP Specification 2025-11-25 och OWASP MCP Top 10 till ytterligare resurser

#### Modul 08 - Bästa praxis
- **Specversionsuppdatering**: Uppdaterade MCP Specification-referens till 2025-11-25
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 och Sherpa workshop i ytterligare referenser

#### Modul 10 - Effektivisering av AI-arbetsflöden
- **Badge-uppdatering**: Bytte MCP version-märke från SDK version (1.9.3) till specifikationsversion (2025-11-25)
- **Resurslänkar**: Uppdaterade MCP-specifikationslänk; lade till OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Specifikationsreferens**: Uppdaterade MCP Specification-länk till version 2025-11-25
- **Säkerhetsresurser**: Lade till OWASP MCP Top 10 i officiella resurser

## 18 december 2025

### Säkerhetsdokumentationsuppdatering – MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) – Specifikationsversionsuppdatering
- **Protokollversionsuppdatering**: Uppdaterade referenser till senaste MCP Specification 2025-11-25 (släppt 25 november 2025)
  - Uppdaterade alla spec versionsreferenser från 2025-06-18 till 2025-11-25
  - Uppdaterade dokumentdatum från 18 augusti 2025 till 18 december 2025
  - Kontrollerade att alla spec-URL:er pekar på aktuell dokumentation
- **Innehållsvalidering**: Omfattande validering av säkerhetsbästa praxis mot senaste standarder
  - **Microsoft säkerhetslösningar**: Kontrollerade aktuella termer och länkar för Prompt Shields (tidigare "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID, och Azure Key Vault
  - **OAuth 2.1 säkerhet**: Bekräftade samstämmighet med senaste OAuth säkerhetsbästa praxis
  - **OWASP-standarder**: Validerade att OWASP Top 10 för LLM-referenser är aktuella
  - **Azure-tjänster**: Verifierade samtliga Microsoft Azure dokumentationslänkar och bästa praxis
- **Standardanpassning**: Alla refererade säkerhetsstandarder bekräftade aktuella
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure säkerhets- och efterlevnadsramverk
- **Implementeringsresurser**: Validerade alla länkade guider och resurser
  - Azure API Management autentiseringsmönster
  - Microsoft Entra ID integrationsguider
  - Azure Key Vault sekretesshantering
  - DevSecOps pipelines och övervakningslösningar

### Dokumentationskvalitetssäkring
- **Specifikationsöverensstämmelse**: Säkerställde att alla obligatoriska MCP säkerhetskrav (MUST/MUST NOT) är i linje med senaste spec
- **Resource aktuell status**: Validerade alla externa länkar till Microsoft dokumentation, säkerhetsstandarder och implementationsguider
- **Täckt bästa praxis**: Bekräftade heltäckande täckning av autentisering, auktorisering, AI-specifika hot, leveranskedjesäkerhet och företagsmönster

## 6 oktober 2025

### Utökning av Komma igång-sektionen – avancerad serveranvändning & enkel autentisering

#### Avancerad serveranvändning (03-GettingStarted/10-advanced)
- **Ny kapitel tillagt**: Introducerade en heltäckande guide för avancerad MCP serveranvändning, som täcker både reguljära och låg-nivå serverarkitekturer.
  - **Regelbunden vs låg-nivå server**: Detaljerad jämförelse och kodexempel i Python och TypeScript för båda angreppssätten.
  - **Handler-baserad design**: Förklaring av handler-baserad hantering av verktyg/resurser/prompts för skalbara, flexibla serverimplementeringar.
  - **Praktiska mönster**: Verkliga scenarier där låg-nivå servermönster är fördelaktiga för avancerade funktioner och arkitektur.
#### Enkel autentisering (03-GettingStarted/11-simple-auth)
- **Nytt kapitel tillagt**: Steg-för-steg-guide för att implementera enkel autentisering i MCP-servrar.  
  - **Autentiseringskoncept**: Tydlig förklaring av autentisering vs. auktorisering och hantering av autentiseringsuppgifter.  
  - **Grundläggande autentiseringsimplementation**: Middleware-baserade autentiseringsmönster i Python (Starlette) och TypeScript (Express) med kodexempel.  
  - **Utveckling mot avancerad säkerhet**: Vägledning för att börja med enkel autentisering och gå vidare till OAuth 2.1 och RBAC med referenser till avancerade säkerhetsmoduler.

Dessa tillägg erbjuder praktisk, handfast vägledning för att bygga mer robusta, säkra och flexibla MCP-serverimplementationer och bygger en bro mellan grundläggande koncept och avancerade produktionsmönster.

## 29 september 2025

### MCP-server databasintegrationslaborationer – Omfattande praktisk inlärningsväg

#### 11-MCPServerHandsOnLabs – Ny fulltäckande databasintegrationskurs
- **Fullständig 13-laborationers inlärningsväg**: La till omfattande praktisk kurs för att bygga produktionsklara MCP-servrar med PostgreSQL-databasintegration  
  - **Verklighetsnära implementation**: Zava Retail-analysfall som demonstrerar företagsklassmönster  
  - **Strukturerad inlärningsprogression**:  
    - **Laborationer 00-03: Grunderna** – Introduktion, kärnarkitektur, säkerhet & multitenancy, miljöuppsättning  
    - **Laborationer 04-06: Bygga MCP-servern** – Databasedesign & schema, MCP-serverimplementation, verktygsutveckling  
    - **Laborationer 07-09: Avancerade funktioner** – Semantisk sökintegration, testning & felsökning, VS Code-integration  
    - **Laborationer 10-12: Produktion & bästa praxis** – Driftsättningsstrategier, övervakning & observerbarhet, bästa praxis & optimering  
  - **Företagsteknologier**: FastMCP-ramverk, PostgreSQL med pgvector, Azure OpenAI-embeddingar, Azure Container Apps, Application Insights  
  - **Avancerade funktioner**: Radsäkerhet (RLS), semantisk sökning, multitenant datatillgång, vektorembeddingar, realtidsövervakning

#### Terminologistandardisering – Moduler till laborationer
- **Omfattande dokumentationsuppdatering**: Systematiskt uppdaterat alla README-filer i 11-MCPServerHandsOnLabs till att använda "Laboration" istället för "Modul"  
  - **Sektionstitlar**: Uppdaterade "Vad denna modul täcker" till "Vad denna laboration täcker" i samtliga 13 laborationer  
  - **Innehållsbeskrivning**: Ändrade "Denna modul tillhandahåller..." till "Denna laboration tillhandahåller..." i hela dokumentationen  
  - **Lärandemål**: Uppdaterade "I slutet av denna modul..." till "I slutet av denna laboration..."  
  - **Navigeringslänkar**: Konverterade alla "Modul XX:"-referenser till "Laboration XX:" i korsreferenser och navigering  
  - **Spårning av slutförande**: Uppdaterade "Efter att ha slutfört denna modul..." till "Efter att ha slutfört denna laboration..."  
  - **Bevarade tekniska referenser**: Behöll Python-modulreferenser i konfigurationsfiler (t.ex. `"module": "mcp_server.main"`)

#### Förbättring av studieguiden (study_guide.md)
- **Visuell kurskarta**: Lagt till ny sektion "11. Databasintegrationslaborationer" med omfattande visualisering av laborationsstruktur  
- **Arkitektur för repository**: Uppdaterat från tio till elva huvudsektioner med detaljerad beskrivning av 11-MCPServerHandsOnLabs  
- **Vägledning för inlärningsväg**: Förbättrade navigeringsinstruktioner för sektionerna 00-11  
- **Teknologiomfattning**: Lagt till detaljer om FastMCP, PostgreSQL, Azure-tjänsters integration  
- **Inlärningsresultat**: Betonat produktionsfärdiga serverutvecklingar, databasintegrationsmönster och företagsäkerhet

#### Förbättring av huvud-README-struktur
- **Laborationsbaserad terminologi**: Uppdaterat huvud-README.md i 11-MCPServerHandsOnLabs för konsekvent användning av "Laboration"-struktur  
- **Organisation av inlärningsväg**: Tydlig progression från grundläggande koncept via avancerad implementering till produktion  
- **Verklighetsfokus**: Tonvikt på praktiskt, handgripligt lärande med företagsklassmönster och tekniker

### Förbättringar i dokumentationskvalitet och konsistens
- **Betoning på praktiskt lärande**: Stärkt praktiskt, laborationsbaserat angreppssätt genom hela dokumentationen  
- **Fokus på företagsmönster**: Framhävda produktionsklara implementationer och företagsäkerhet  
- **Teknologiintegration**: Omfattande täckning av moderna Azure-tjänster och AI-integrationsmönster  
- **Inlärningsprogression**: Tydlig, strukturerad väg från grundläggande koncept till produktionssättning

## 26 september 2025

### Förbättring av fallstudier – GitHub MCP Registry-integration

#### Fallstudier (09-CaseStudy/) – Fokus på ekosystemutveckling
- **README.md**: Större utökning med omfattande fallstudie för GitHub MCP Registry  
  - **GitHub MCP Registry Fallstudie**: Ny omfattande fallstudie som granskar GitHubs lansering av MCP Registry i september 2025  
    - **Problemanalys**: Detaljerad undersökning av fragmenterade MCP-serverupptäckts- och distribueringsutmaningar  
    - **Lösningsarkitektur**: GitHubs centraliserade registreringsmetod med en-klicks-installation i VS Code  
    - **Affärspåverkan**: Mätbara förbättringar i utvecklaronboarding och produktivitet  
    - **Strategiskt värde**: Fokus på modulär agentdistribution och tvärverktygsinteroperabilitet  
    - **Ekosystemutveckling**: Positionering som grundplattform för agentbaserad integration  
  - **Förbättrad fallstudiestruktur**: Uppdaterade samtliga sju fallstudier med enhetligt format och omfattande beskrivningar  
    - Azure AI-resagent: Fokus på multi-agentstyrning  
    - Azure DevOps-integration: Fokus på automatisering av arbetsflöden  
    - Realtidsdokumenthämtning: Python-konsolklientimplementation  
    - Interaktiv studieplansgenerator: Chainlit konversationswebbapp  
    - In-Editor-dokumentation: VS Code och GitHub Copilot-integration  
    - Azure API Management: Företags-API-integrationsmönster  
    - GitHub MCP Registry: Ekosystemutveckling och communityplattform  
  - **Omfattande sammanfattning**: Omskriven avslutande sektion som lyfter fram sju fallstudier som täcker flera MCP-implementeringsdimensioner  
    - Företagsintegration, multi-agentstyrning, utvecklarproduktivitet  
    - Ekosystemutveckling, kategorisering av utbildningsapplikationer  
    - Fördjupade insikter i arkitektur, implementationsstrategier och bästa praxis  
    - Tonvikt på MCP som mogen, produktionsklar protokollstandard

#### Uppdateringar i studieguiden (study_guide.md)
- **Visuell kurskarta**: Uppdaterad mindmap för att inkludera GitHub MCP Registry i sektionen för fallstudier  
- **Beskrivningar av fallstudier**: Förbättrade från generiska beskrivningar till detaljerad genomgång av sju omfattande fallstudier  
- **Repositorystruktur**: Uppdaterad sektion 10 för att spegla fullständig fallstudiekartläggning med specifika implementeringsdetaljer  
- **Changelog-integration**: Lagt till 26 september 2025-posten som dokumenterar tillägg av GitHub MCP Registry och förbättringar av fallstudier  
- **Datumuppdateringar**: Uppdaterad tidsstämpel i sidfoten till senaste revisionen (26 september 2025)

### Kvalitetsförbättringar i dokumentation
- **Konsistensförbättring**: Standardiserad format och struktur över samtliga sju fallstudier  
- **Omfattande täckning**: Fallstudier omfattar nu företag, utvecklarproduktivitet och ekosystemutveckling  
- **Strategisk positionering**: Förstärkt fokus på MCP som grundplattform för agentbaserad systemdistribution  
- **Resursintegration**: Uppdaterade ytterligare resurser med länk till GitHub MCP Registry

## 15 september 2025

### Expansion av avancerade ämnen – Anpassade transportlager & kontextteknik

#### MCP-anpassade transportlager (05-AdvancedTopics/mcp-transport/) – Ny avancerad implementationsguide
- **README.md**: Fullständig implementationsguide för anpassade MCP-transportsystem  
  - **Azure Event Grid-transport**: Omfattande serverlös, händelsedriven transportimplementation  
    - Exempel i C#, TypeScript och Python med Azure Functions-integration  
    - Arkitekturmönster för händelsedrivna och skalbara MCP-lösningar  
    - Webhook-mottagare och push-baserad meddelandehantering  
  - **Azure Event Hubs-transport**: Höggenomströmningsströmnings-transportimplementation  
    - Realtidsströmning för låglatensscenarier  
    - Partitionering och checkpoint-hantering  
    - Batchhantering av meddelanden och prestandaoptimering  
  - **Företagsintegrationsmönster**: Produktionsklara arkitekturexempel  
    - Distribuerad MCP-behandling över flera Azure Functions  
    - Hybridtransporter som kombinerar olika transporttyper  
    - Meddelandedurabilitet, tillförlitlighet och felhantering  
  - **Säkerhet & övervakning**: Azure Key Vault-integration och observerbarhetsmönster  
    - Hanterad identitetsautentisering och principen om minsta privilegium  
    - Application Insights-telemetri och prestandaövervakning  
    - Kretsbrytare och felmotståndsmönster  
  - **Testningsramverk**: Omfattande teststrategier för anpassade transportlager  
    - Enhetstestning med testdubbler och mockningsramverk  
    - Integrationstestning med Azure Test Containers  
    - Prestanda- och belastningstestning

#### Kontextteknik (05-AdvancedTopics/mcp-contextengineering/) – Framväxande AI-disciplin
- **README.md**: Omfattande utforskning av kontextteknik som ett framväxande område  
  - **Kärnprinciper**: Fullständig kontextdelning, medvetenhet om aktionsbeslut och hantering av kontextfönster  
  - **MCP-protokollsanpassning**: Hur MCP-designen adresserar kontextteknikutmaningar  
    - Begränsningar i kontextfönster och progressiv inläsning  
    - Relevansbedömning och dynamisk kontexthämtning  
    - Multimodal kontexthantering och säkerhetsaspekter  
  - **Implementeringsmetoder**: Singeltrådad vs. multi-agentarkitektur  
    - Kontextindelning och prioriteringstekniker  
    - Progressiv kontextinläsning och komprimeringsstrategier  
    - Flerskiktskontextmetoder och optimerad hämtning  
  - **Mätningsramverk**: Framväxande metrik för kontexteffektivitetsbedömning  
    - Indataeffektivitet, prestanda, kvalitet och användarupplevelse  
    - Experimentella metoder för kontextoptimering  
    - Felanalys och förbättringsmetodik

#### Uppdateringar i kurscurriculum (README.md)
- **Förbättrad modulstruktur**: Uppdaterad kursplanstabell för att inkludera nya avancerade ämnen  
  - Lagt till poster för Kontextteknik (5.14) och Anpassad transport (5.15)  
  - Konsekvent formatering och navigeringslänkar för alla moduler  
  - Uppdaterade beskrivningar som speglar aktuellt innehållsomfång

### Förbättringar i katalogstruktur
- **Namngivningsstandardisering**: Bytt namn från "mcp transport" till "mcp-transport" för att vara konsekvent med andra avancerade ämnesmappar  
- **Innehållsorganisation**: Alla 05-AdvancedTopics-mappar följer nu standardmönstret (mcp-[ämne])

### Förbättringar i dokumentationskvalitet
- **Anpassning till MCP-specifikation**: Allt nytt innehåll refererar MCP Specification 2025-06-18  
- **Fler språkexempel**: Omfattande kodexempel i C#, TypeScript och Python  
- **Företagsfokus**: Produktionsklara mönster och integration med Azure-molnet genomgående  
- **Visuell dokumentation**: Mermaid-diagram för arkitektur och flödesvisualisering

## 18 augusti 2025

### Omfattande dokumentationsuppdatering – MCP 2025-06-18-standarder

#### MCP säkerhetsbästa praxis (02-Security/) – Fullständig modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullständig omskrivning i linje med MCP Specification 2025-06-18  
  - **Obligatoriska krav**: Tillagda explicita MÅSTE/MÅSTE INTE-krav från officiell specifikation med tydliga visuella indikatorer  
  - **12 kärnpraktiker för säkerhet**: Omstrukturerat från lista med 15 punkter till omfattande säkerhetsdomäner  
    - Token-säkerhet & autentisering med integration av extern identitetsleverantör  
    - Sessionshantering & transportsäkerhet med kryptografiska krav  
    - AI-specifik hotbeskydd med Microsoft Prompt Shields-integration  
    - Åtkomstkontroll & behörigheter med principen om minsta privilegium  
    - Innehållssäkerhet & övervakning med Azure Content Safety-integrering  
    - Leveranskedjesäkerhet med omfattande komponentverifiering  
    - OAuth-säkerhet & skydd mot Confused Deputy med PKCE-implementering  
    - Incidentrespons & återställning med automatiserade funktioner  
    - Efterlevnad & styrning med regulatorisk anpassning  
    - Avancerade säkerhetskontroller med zero trust-arkitektur  
    - Microsofts säkerhetsekosystemintegration med omfattande lösningar  
    - Kontinuerlig säkerhetsutveckling med adaptiva metoder  
  - **Microsoft säkerhetslösningar**: Förbättrad integrationsvägledning för Prompt Shields, Azure Content Safety, Entra ID och GitHub Advanced Security  
  - **Implementeringsresurser**: Kategoriserade omfattande resurslänkar efter Officiell MCP-dokumentation, Microsofts säkerhetslösningar, säkerhetsstandarder och implementeringsguider

#### Avancerade säkerhetskontroller (02-Security/) – Företagsimplementation
- **MCP-SECURITY-CONTROLS-2025.md**: Total översyn med företagsklassigt säkerhetsramverk  
  - **9 omfattande säkerhetsdomäner**: Utvidgat från grundläggande kontroller till detaljerad företagsram  
    - Avancerad autentisering & auktorisering med Microsoft Entra ID-integration  
    - Token säkerhet & anti-passthrough kontroller med omfattande validering  
    - Sessionssäkerhetskontroller med skydd mot kapning  
    - AI-specifika säkerhetskontroller med skydd mot promptinjektion och verktygsförgiftning  
    - Skydd mot Confused Deputy-attacker med OAuth-proxysäkerhet  
    - Säkerhet för verktygskörning med sandboxing och isolering  
    - Leveranskedjesäkerhetskontroller med beroendeverifiering  
    - Övervaknings- & detektionskontroller med SIEM-integration  
    - Incidentrespons & återställning med automatiserade funktioner  
  - **Implementeringsexempel**: Tillagda detaljerade YAML-konfigurationsblock och kodexempel  
  - **Microsoft-lösningsintegration**: Omfattande täckning av Azure säkerhetstjänster, GitHub Advanced Security och företagsidentitetshantering

#### Avancerade säkerhetsämnen (05-AdvancedTopics/mcp-security/) – Produktionsklar implementation
- **README.md**: Fullständig omskrivning för företagsklassig säkerhetsimplementation  
  - **Nuvarande specifikationsanpassning**: Uppdaterad till MCP Specification 2025-06-18 med obligatoriska säkerhetskrav  
  - **Förbättrad autentisering**: Microsoft Entra ID-integration med omfattande .NET och Java Spring Security-exempel  
  - **AI-säkerhetsintegration**: Microsoft Prompt Shields och Azure Content Safety-implementering med detaljerade Python-exempel  
  - **Avancerad hotmitigation**: Omfattande implementationsexempel för  
    - Skydd mot Confused Deputy-attacker med PKCE och användarsamtyckesvalidering  
    - Förebyggande av token-passthrough med publikumsvalidering och säker tokenhantering  
    - Skydd mot sessionskapning med kryptografisk bindning och beteendeanalys  
  - **Företagssäkerhetsintegration**: Azure Application Insights-övervakning, hotdetektionspipelines och leveranskedjesäkerhet  
  - **Implementeringschecklista**: Tydliga obligatoriska kontra rekommenderade säkerhetskontroller med Microsofts säkerhetsekosystemfördelar

### Dokumentationskvalitet & standardanpassning
- **Specifikationsreferenser**: Uppdaterade alla referenser till nuvarande MCP Specifikation 2025-06-18  
- **Microsoft Security Ecosystem**: Förbättrad integrationsvägledning i all säkerhetsdokumentation  
- **Praktisk Implementering**: Lade till detaljerade kodexempel i .NET, Java och Python med företagsmönster  
- **Resursorganisation**: Omfattande kategorisering av officiell dokumentation, säkerhetsstandarder och implementationsguider  
- **Visuella indikatorer**: Tydlig markering av obligatoriska krav kontra rekommenderade praxis  

#### Kärnkoncept (01-CoreConcepts/) - Fullständig modernisering  
- **Protokollversionsuppdatering**: Uppdaterad för att referera nuvarande MCP Specifikation 2025-06-18 med datum-baserad versionering (åååå-mm-dd-format)  
- **Arkitekturförfining**: Förbättrade beskrivningar av Hosts, Klienter och Servrar för att spegla nuvarande MCP arkitekturmodeller  
  - Hosts definieras nu tydligt som AI-applikationer som koordinerar flera MCP klientanslutningar  
  - Klienter beskrivs som protokollanslutningar med en-till-en relation till servrar  
  - Servrar fördjupade med lokala kontra fjärrdistributionsscenarier  
- **Primitiv omstrukturering**: Total översyn av server- och klientprimitiver  
  - Serverprimitiver: Resurser (datakällor), Prompter (mallar), Verktyg (exekverbara funktioner) med detaljerade förklaringar och exempel  
  - Klientprimitiver: Sampling (LLM-slutföranden), Elicitering (användarinmatning), Loggning (debugging/övervakning)  
  - Uppdaterade med nuvarande upptäckts- (`*/list`), hämt- (`*/get`) och exekverings- (`*/call`) mönster  
- **Protokollarkitektur**: Införde två-lagers arkitekturmodell  
  - Datalager: JSON-RPC 2.0-bas med livscykelhantering och primitiv  
  - Transportlager: STDIO (lokal) och Streamable HTTP med SSE (fjärrobundet) transportmekanismer  
- **Säkerhetsramverk**: Omfattande säkerhetsprinciper inklusive explicit användarsamtycke, dataskydd, säker verktygsexekvering och transportlagersäkerhet  
- **Kommunikationsmönster**: Uppdaterade protokollmeddelanden som visar initialisering, upptäckt, exekvering och notifieringsflöden  
- **Kodexempel**: Uppfräschade flerspråkiga exempel (.NET, Java, Python, JavaScript) för att återspegla nuvarande MCP SDK-mönster  

#### Säkerhet (02-Security/) - Omfattande säkerhetsöversyn  
- **Standardanpassning**: Fullständig anpassning till MCP Specifikation 2025-06-18 säkerhetskrav  
- **Autentiseringens utveckling**: Dokumenterad utveckling från anpassade OAuth-servrar till extern identitetsleverantördelegering (Microsoft Entra ID)  
- **AI-specifik hotanalys**: Förbättrat täckande av moderna AI-angreppsvektorer  
  - Detaljerade scenarier för promptinjektionsattacker med verkliga exempel  
  - Verktygsförgiftning och "rug pull"-attackmönster  
  - Kontextfönsterförgiftning och modellförvirringsattacker  
- **Microsoft AI-säkerhetslösningar**: Omfattande täckning av Microsofts säkerhetsekosystem  
  - AI Prompt Shields med avancerad detektion, spotlighting och avgränsningsmetoder  
  - Azure Content Safety integrationsmönster  
  - GitHub Advanced Security för skydd av leveranskedjan  
- **Avancerad hotmitigering**: Detaljerade säkerhetskontroller för  
  - Sessionskapning med MCP-specifika attackscenarier och kryptografiska session-ID-krav  
  - Förvirrat ombud-problem i MCP-proxy-scenarier med explicita samtyckeskrav  
  - Token-genomgångssårbarheter med obligatoriska valideringskontroller  
- **Leveranskedjesäkerhet**: Utökad AI-leveranskedja med grundmodeller, embeddings-tjänster, kontextleverantörer och tredjeparts-API:er  
- **Grundlagsskydd**: Förbättrad integration med företagsmässiga säkerhetsmönster inklusive zero trust-arkitektur och Microsoft säkerhetsekosystem  
- **Resursorganisation**: Kategoriserade omfattande resurslänkar efter typ (Officiella Dokument, Standarder, Forskning, Microsoft-lösningar, Implementationsguider)  

### Förbättringar av dokumentationskvalitet  
- **Strukturerade lärandemål**: Förbättrade lärandemål med specifika, handlingsbara resultat  
- **Korsreferenser**: Lade till länkar mellan relaterade säkerhets- och kärnkonceptämnen  
- **Aktuell information**: Uppdaterade alla datumreferenser och specifikationslänkar till gällande standarder  
- **Implementeringsvägledning**: Lade till specifika, praktiska implementeringsanvisningar i båda sektionerna  

## 16 juli 2025  

### README och navigeringsförbättringar  
- Total omdesign av kursplanens navigation i README.md  
- Ersatte `<details>`-taggar med mer tillgängligt tabellbaserat format  
- Skapade alternativa layoutalternativ i nya mappen "alternative_layouts"  
- Lade till kortbaserade, flik-stilade och dragspels-stilade navigeringsexempel  
- Uppdaterade avsnitt om lagerns struktur för att inkludera alla senaste filer  
- Förbättrade avsnittet "Hur man använder denna kursplan" med tydliga rekommendationer  
- Uppdaterade MCP specifikationslänkar för att peka på korrekta URL:er  
- Lade till avsnittet Context Engineering (5.14) i kursplanstrukturen  

### Uppdateringar i studiehandledningen  
- Omfattande översyn av studiehandledningen för att anpassa till nuvarande lagringsstruktur  
- Lade till nya avsnitt för MCP-klienter och verktyg samt populära MCP-servrar  
- Uppdaterade den visuella kursplanens karta för att exakt reflektera alla ämnen  
- Förbättrade beskrivningarna av avancerade ämnen för att täcka alla specialområden  
- Uppdaterade fallstudieavsnittet för att spegla faktiska exempel  
- Lade till denna omfattande ändringslogg  

### Gemenskapbidrag (06-CommunityContributions/)  
- Lade till detaljerad information om MCP-servrar för bildgenerering  
- Lade till omfattande avsnitt om användning av Claude i VSCode  
- Lade till instruktioner för installation och användning av terminalklienten Cline  
- Uppdaterade MCP-klientavsnittet för att inkludera alla populära klientalternativ  
- Förbättrade bidragsexempel med mer exakta kodprov  

### Avancerade ämnen (05-AdvancedTopics/)  
- Organiserade alla specialämnesmappar med konsekvent namngivning  
- Lade till material och exempel för kontext-engineering  
- Lade till dokumentation för Foundry-agentintegration  
- Förbättrade dokumentation för Entra ID:s säkerhetsintegration  

## 11 juni 2025  

### Första skapandet  
- Släppte första versionen av MCP för nybörjare-kursplanen  
- Skapade grundstruktur för alla 10 huvudsektioner  
- Implementerade visuell kursplanskarta för navigation  
- Lade till initiala exempelprojekt i flera programmeringsspråk  

### Kom igång (03-GettingStarted/)  
- Skapade första serverimplementeringsexempel  
- Lade till vägledning för klientutveckling  
- Inkluderade instruktioner för LLM-klientintegration  
- Lade till dokumentation för VS Code-integration  
- Implementerade serverexempel med Server-Sent Events (SSE)  

### Kärnkoncept (01-CoreConcepts/)  
- Lade till detaljerad förklaring av klient-server-arkitekturen  
- Skapade dokumentation för nyckelkomponenter i protokollet  
- Dokumenterade meddelandemönster i MCP  

## 23 maj 2025  

### Repositoriumstruktur  
- Initierade repot med grundläggande mappstruktur  
- Skapade README-filer för varje huvudsektion  
- Satte upp översättningsinfrastruktur  
- Lade till bildresurser och diagram  

### Dokumentation  
- Skapade initial README.md med kursplansöversikt  
- Lade till CODE_OF_CONDUCT.md och SECURITY.md  
- Satte upp SUPPORT.md med vägledning för hjälp  
- Skapade preliminär studiehandledningsstruktur  

## 15 april 2025  

### Planering och ramverk  
- Initial planering för MCP för nybörjare-kursplan  
- Definierade lärandemål och målgrupp  
- Skissade struktur med 10 sektioner för kursplanen  
- Utvecklade konceptuellt ramverk för exempel och fallstudier  
- Skapade initiala prototyp-exempel för nyckelkoncept

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->