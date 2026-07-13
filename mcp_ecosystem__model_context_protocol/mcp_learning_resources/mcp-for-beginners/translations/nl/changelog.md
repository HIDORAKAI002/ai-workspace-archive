# Wijzigingslog: MCP voor Beginners Curriculum

Dit document dient als een overzicht van alle belangrijke wijzigingen die zijn aangebracht in het Model Context Protocol (MCP) voor Beginners curriculum. Wijzigingen worden in omgekeerde chronologische volgorde gedocumenteerd (nieuwste wijzigingen eerst).

## 2 juli 2026

### Nieuwe les: De 2026-07-28 MCP Specificatie Release Candidate

Toegevoegde behandeling van de aankomende `2026-07-28` MCP specificatie release candidate (aangekondigd op 21 mei 2026; definitieve release gepland voor 28 juli 2026), samengevat uit de [officiële aankondiging blogpost](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). De basislijn van het curriculum blijft **MCP Specificatie 2025-11-25** totdat de nieuwe versie wordt uitgebracht, dus dit wordt gepresenteerd als vooruitziende richtlijnen in plaats van een herschrijving van bestaande lessen.

- **Nieuw**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — een volledige les die de stateless protocolkern behandelt (verwijdering van de `initialize` handshake en `Mcp-Session-Id`), de nieuwe `Mcp-Method`/`Mcp-Name` routeringsheaders, `ttlMs`/`cacheScope` caching metadata, W3C Trace Context in `_meta`, het formele Extensions-framework (MCP Apps en de nieuwe Tasks extensie), zes authorisatie-verstevigende SEPs, het afschaffen van Roots/Sampling/Logging, en de overstap naar volledige JSON Schema 2020-12 voor tool-schema's.
- **Bijgewerkt** met vooruitziende verwijzingen naar de nieuwe les:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): opmerking over protocolversie, secties Sampling/Roots/Logging/Tasks, en "Wat volgt"
  - [02-Security/README.md](./02-Security/README.md): verwijzing naar autorisatie-versteviging
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): verwijzing naar stateless transport
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): verwijzing naar Sampling afschaffing
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): verwijzing naar Logging afschaffing en Tasks extensie
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): verwijzing naar stateless/session-routering
  - [README.md](./README.md): "Vooruitkijkend" opmerking bij de specificatiesectie en een nieuwe `1.1` vermelding in de curriculum module tabel
  - [study_guide.md](./study_guide.md): vooruitziende bullet onder het Core Concepts overzicht en een gedateerde toevoeging
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): verwijzing naar de `mcp-session-id` transport map voorafgaand aan het stateless request model
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): module overzicht verwijzing naar Root Contexts/Sampling afschaffingen en de Tasks extensie
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): verwijzing naar autorisatie-versteviging

## 24 juni 2026

### Nieuwe les: MCP gebruiken in Copilot app

- [Tooling sectie](./12-tooling/README.md) Toegevoegd tooling sectie.
- [MCP in Copilot app](./12-tooling/01-copilot-app/README.md)

## 16 juni 2026

### MCP Specificatie Alignment & Voorbeeld Validatie

Het curriculum gevalideerd tegen de huidige **MCP Specificatie 2025-11-25** en de laatste officiële SDK's, daarna de resterende verouderde specificatieverwijzingen gecorrigeerd en bevestigd dat de kernvoorbeelden nog steeds bouwen en draaien.

#### Correcties Specificatie Versies (2025-06-18 / 2025-03-26 → 2025-11-25)

Engelse inhoud bijgewerkt waar nog werd beweerd dat een oudere specificatieversie de *huidige/laatste* standaard was, en links herleid naar de canonieke `modelcontextprotocol.io` specificatie-paden:
- **05-AdvancedTopics/mcp-security/README.md**: Banner "Huidige Standaard", introductie, kop core beveiligingsprincipes, verplichte vereisten kop, Microsoft Entra ID sectie, Referenties & Hulpbronnen links, en afsluitende beveiligingsnotitie (8 verwijzingen) bijgewerkt naar 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Aanvullende Hulpbronnen specificatielink en "Huidige Standaard" banner bijgewerkt naar 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Oude `2025-03-26` security-and-trust link vervangen door huidige 2025-11-25 pagina voor beste beveiligingspraktijken
- **03-GettingStarted/14-sampling/README.md**: Officiële sampling documentatielink bijgewerkt naar 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Huidige tijd verwijzing "huidige MCP specificatie" en Aanvullende Hulpbronnen specificatielink bijgewerkt naar 2025-11-25 (historische SSE-afschaffingsnotities onveranderd voor nauwkeurigheid)

#### Validatie Voorbeelden tegen Huidige SDK's

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` loste `@modelcontextprotocol/sdk@1.29.0` op; `tsc --noEmit` slaagde zonder typefouten — bestaande `McpServer`/`StdioServerTransport` API's blijven geldig
- **Python (03-GettingStarted/01-first-server/solution/python)**: Gevalideerd in een geïsoleerde `.venv` met `mcp[cli]` (1.27.2); `py_compile` geslaagd en `FastMCP.list_tools()` gaf correct de `add` en `subtract` tools terug
- Bevestigd dat alle voorbeeld `@modelcontextprotocol/sdk` versiebereiken (`>=1.26.0` / `^1.26.0` / `^1.27.0`) netjes oplossen naar de huidige `1.29.0` zonder brekende API-wijzigingen

#### Afstemmen Dependency Versies (sluiten van versiekloven)

Uitgediende SDK pins verhoogd zodat elk voorbeeld de huidige MCP release volgt, passend bij de repo-brede conventie:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` verhoogd van `^1.8.0` → `>=1.26.0` en verouderde `"updated for MCP 2025-06-18"` pakketbeschrijving bijgewerkt naar `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** en **lab4/code/github_mcp_server/pyproject.toml**: Precieze pin `mcp==1.23.0` verhoogd naar `mcp>=1.26.0`; beide `uv.lock` bestanden opnieuw gegenereerd (`uv lock`) zodat ze naar de huidige `mcp 1.27.2` resolven en synchroon blijven met de manifesten

#### Analyse van Curriculum Tekorten — Laatste Spec Functie Dekking

Bevestigd dat het curriculum al alle primitieve functies dekt die zijn geïntroduceerd/uitgebreid in MCP 2025-11-25, dus geen inhoudelijke hiaten:
- **Sampling**: Les 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (incl. URL-modus)**: Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Gedocumenteerd in 00-Introduction, 01-CoreConcepts, en 05-AdvancedTopics/mcp-root-contexts
- **Tasks (experimenteel, lang lopende bewerkingen)**: Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotaties** (`readOnlyHint` / `destructiveHint`): Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features

### Beveiligingsversteviging & Oplossen van Dependency Kwetsbaarheden

Een volledige beveiligingscontrole uitgevoerd over elke dependency manifest en voorbeeldbroncode, daarna alle gerapporteerde npm waarschuwingen en één code-niveau bevinding verholpen. Na correcties rapporteert `npm audit` **0 kwetsbaarheden** in elke gecontroleerde map.

#### npm Dependency Kwetsbaarheden (transitief) — Opgelost

Alle 15 gecommitteerde `package-lock.json` bestanden gecontroleerd. Kwetsbaarheden waren beperkt tot transitieve dependencies binnengehaald door de MCP Inspector dev-tool, de OpenAI client, en de MCP SDK; deze zijn nu allemaal opgelost zonder de voorbeelden te breken:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** en **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` opgehoogd (`0.16.6` / `0.14.1` → `0.22.0`), waardoor de gebundelde `ajv`, `brace-expansion`, `diff`, `path-to-regexp` en `ws` waarschuwingen verdwenen. Toegevoegd een npm `overrides` entry die de gepatchte `shell-quote@1.8.4` forceert om de resterende kritieke waarschuwing van `concurrently` weg te nemen; beide lockfiles opnieuw gegenereerd (nu 0 kwetsbaarheden)
- **03-GettingStarted/samples/typescript**: `npm audit fix` bijgewerkt de transitieve `qs` (matig) naar een gepatchte versie
- **03-GettingStarted/samples/javascript**: `npm audit fix` bijgewerkt de transitieve `hono` (matig) naar een gepatchte versie
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` bijgewerkt de transitieve `form-data` (hoog) naar een gepatchte versie
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ontbrekende `package-lock.json` gegenereerd zodat het project reproduceerbaar en controleerbaar is (0 kwetsbaarheden)

#### Code-niveau Beveiligingsfix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Verwijderd `shell=True` uit de `open_in_vscode` tool. De eerdere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` stond shell-metakarakters in een map-pad toe om geïnterpreteerd te worden door `cmd.exe` (command-injection vector). Het lanceert nu rechtstreeks het opgeloste `Code.exe` met de map als argument — zonder shell — wat functioneel equivalent en veilig is

#### Python Dependency Audit

- Elke Python requirements set gecontroleerd met `pip-audit`. `05-AdvancedTopics` en `03-GettingStarted/samples/python` rapporteerden **geen bekende kwetsbaarheden** (hun `mcp` / `httpx` / `pydantic` / `python-dotenv` bereiken lossen netjes op naar huidige gepatchte releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` markeerde de transitieve dependency **`werkzeug` 3.1.1** met drie `safe_join` Windows device-naam DoS waarschuwingen — `CVE-2025-66221`, `CVE-2026-21860`, en `CVE-2026-27199` (alle opgelost in 3.1.6). Toegevoegd een expliciete beveiligingspin `werkzeug>=3.1.6` zodat de gepatchte release wordt opgelost; bevestigd dat de restrictie netjes oplost met de `chainlit` / `mcp` / `semantic-kernel` stack

### Productnaam Herbranding

Alle curriculum inhoud bijgewerkt om de herbranding van Microsoft-producten te reflecteren:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord community link bijgewerkt
- **AGENTS.md**: Verwijzing Discord server bijgewerkt
- **README.md**: Technologie-ecosysteem verwijzingen bijgewerkt
- **study_guide.md**: Verwijzingen case studies bijgewerkt
- **05-AdvancedTopics/README.md**: Module 5.13 titel en omschrijving bijgewerkt
- **05-AdvancedTopics/mcp-integration/README.md**: Sectiekop en omschrijving bijgewerkt
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Volledige module titel en inhoud bijgewerkt
- **05-AdvancedTopics/mcp-security-entra/README.md**: Interne verwijzing bijgewerkt
- **07-LessonsfromEarlyAdoption/README.md**: Case studie verwijzingen bijgewerkt
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Sectie 9 kop, badges, en mogelijkheden bijgewerkt
- **08-BestPractices/README.md**: Discord community link bijgewerkt
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanaal verwijzing bijgewerkt
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Modellering implementatie verwijzing bijgewerkt
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Services tabel bijgewerkt
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Resource verwijzingen bijgewerkt

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extensie voor VS Code
- **README.md**: Bijgewerkte hoofdverwijzingen van het curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Bijgewerkte moduletitel, overzicht en alle modulekoppen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Bijgewerkte titel, leerdoelen, installatie-instructies en bronnen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Bijgewerkte titel, leerdoelen, MCP-hosttabel en kruisverwijzingen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Bijgewerkte titel, badges, vereisten en bronnen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Bijgewerkte Agent Builder-verwijzingen en feedbacklink
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Bijgewerkte vereisten en extensieverwijzingen

---

## 11 april 2026

### Nieuwe les, documentatiefixes en afhankelijkheidsupdates

#### Nieuwe curriculuminhoud toegevoegd

**Module 05 - Gevorderde onderwerpen**
- **Les 5.17: Adversarial Multi-Agent Reasoning met MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nieuwe uitgebreide gids over het adversarial debatpatroon voor multi-agent systemen
  - Mermaid architectuurdiagram: twee agenten → gedeelde MCP-server → debattranscript → rechter → oordeel
  - Gedeelde MCP-tools-server (`web_search` + `run_python`) geïmplementeerd in Python en TypeScript
  - Tegenstrijdige systeem prompts (VOOR / TEGEN / Rechter) met expliciete toolgebruikvereisten
  - Debatregisseur in Python, TypeScript en C# die rondes beheert en argumenten routert
  - MCP `ClientSession` bedrading voor de regisseur naar echte tool-aanroepen
  - Gebruikstabel (hallucinatie detectie, bedreigingsmodellering, API ontwerpbeoordeling, feitelijke verificatie, technische selectie)
  - Beveiligingsoverwegingen: sandbox uitvoering, validatie van tool-aanroepen, rate limiting, auditlogging
  - Gestructureerde oefening met drie praktische scenario’s (code review, architectuurbeslissing, contentmoderatie)

#### Documentatiefixes

**Module 03 - Aan de slag**
- **05-stdio-server/README.md**: Gefixeerd onvolledig TypeScript stdio-servervoorbeeld — toegevoegd ontbrekende transportinstantiering (`new StdioServerTransport()`) en `server.connect(transport)` aanroep ter afstemming met Python- en .NET-voorbeelden in dezelfde sectie
- **14-sampling/README.md**: Typfout hersteld — gecorrigeerd `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculumupdates

**Hoofd README.md**
- Invoer 5.17 (Adversarial Multi-Agent Reasoning met MCP) toegevoegd aan curriculummatrix met directe link naar nieuwe les

**05-AdvancedTopics/README.md**
- Les 5.17 rij toegevoegd aan lestabel

**study_guide.md**
- Adversarial Multi-Agent Reasoning onderwerp toegevoegd aan mindmap en tekstbeschrijving van Gevorderde Onderwerpen

#### Code en beveiligingsfixes

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Beveiligingsfix — command injection**: `execSync` shell-interpolatie vervangen door `execFile` + `promisify` in de TypeScript `run_python` tool, waarmee oppervlakte voor command injection is geëlimineerd (LLM-gestuurde code wordt nu als letterlijk argv-element zonder shell betrokkenheid doorgegeven)
- **MCP tool loop bedrading**: Python debatregisseur bijgewerkt om `AsyncAnthropic` client te gebruiken (vervanging van blokkerende sync `Anthropic`), live `ClientSession` rechtstreeks aan elke agent beurt door te geven, tooldefinities elke beurt op te halen via `session.list_tools()`, en `tool_use` blokken te dispatchen via `session.call_tool()` in een loop totdat het model een finale tekstuitvoer genereert

#### Afhankelijkheidsupdates

- `hono` verhoogd naar 4.12.12 in meerdere pakketten (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` verhoogd van 1.19.11 naar 1.19.13 in TypeScript pakketten
- `cryptography` verhoogd van 46.0.5 naar 46.0.7 in Python pakketten (10-StreamliningAIWorkflows labs 3 en 4)
- `lodash` verhoogd van 4.17.23 naar 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Vertalingen

- Vertalingen gesynchroniseerd voor 48+ talen met de nieuwste bronwijzigingen (i18n update)

---

## 5 februari 2026

### Repository-brede validatie- en navigatieverbeteringen

#### Nieuwe curriculuminhoud toegevoegd

**Module 03 - Aan de slag**
- **12-mcp-hosts/README.md**: Nieuwe uitgebreide gids voor het opzetten van MCP-hosts
  - Configuratievoorbeelden Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-configuratiesjablonen voor alle belangrijke hosts
  - Transporttypes vergelijkingstabel (stdio, SSE/HTTP, WebSocket)
  - Problemen oplossen van veelvoorkomende verbindingsproblemen
  - Beveiligingsbest practices voor hostconfiguratie

- **13-mcp-inspector/README.md**: Nieuwe debuggids voor MCP Inspector
  - Installatiemethoden (npx, npm global, vanuit bron)
  - Verbinden met servers via stdio en HTTP/SSE
  - Testtools, bronnen en prompts-workflows
  - VS Code-integratie met MCP Inspector
  - Veelvoorkomende debugscenario’s met oplossingen

**Module 04 - Praktische implementatie**
- **pagination/README.md**: Nieuwe paginaatie-implementatiegids
  - Cursor-gebaseerde paginaatiepatronen in Python, TypeScript, Java
  - Client-side paginaatie-afhandeling
  - Cursorontwerpstrategieën (opaque vs. gestructureerd)
  - Aanbevelingen voor prestatieoptimalisatie

**Module 05 - Gevorderde onderwerpen**
- **mcp-protocol-features/README.md**: Nieuwe diepgaande beschrijving van protocolkenmerken
  - Implementatie van voortgangsnotificaties
  - Patronen voor verzoekannulering
  - Bronsjablonen met URI-patronen
  - Levenscyclusbeheer van servers
  - Controle van logniveau
  - Foutafhandelingspatronen met JSON-RPC codes

#### Navigatiefixes (24+ bestanden bijgewerkt)

**Hoofdmodulereadmes**
 Nu links naar zowel eerste les ALS volgende module

**02-Security subbestanden**
- Alle 5 aanvullende beveiligingsdocumenten hebben nu "Wat nu?" navigatie:

**09-CaseStudy bestanden**
- Alle case study bestanden hebben nu sequentiële navigatie:

**10-StreamliningAI Labs**
 "Wat nu?"-sectie toegevoegd aan Module 10 overzicht en Module 11

#### Code- en inhoudsfixes

**SDK- en afhankelijkheidsupdates**
Lege openai-versie gecorrigeerd naar `^4.95.0`
SDK geüpdatet van `^1.8.0` naar `>=1.26.0`
MCP versie-pinnen bijgewerkt naar `>=1.26.0`

**Codefixes**
Ongeldig model `gpt-4o-mini` gecorrigeerd naar `gpt-4.1-mini`

**Inhoudsfixes**
Verbroken link `READMEmd` → `README.md` gecorrigeerd, curriculumkop `Module 1-3` → `Module 0-3` gecorrigeerd, case-sensitive pad hersteld
Dubbele corrupte Case Study 5 inhoud verwijderd

**Beginnergidsverbeteringen**
Juiste introductie, leerdoelen en vereisten toegevoegd voor beginners

#### Curriculumupdates

**Hoofd README.md**
- Invoeren 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protocol Features) toegevoegd aan curriculummatrix

**Module READMEs**
Lessen 12 en 13 toegevoegd aan lessenlijst
Praktische gidsen sectie toegevoegd met link naar paginering
Lessen 5.15 (Custom Transport) en 5.16 (Protocol Features) toegevoegd

**study_guide.md**
- Mindmap bijgewerkt met alle nieuwe thema’s: MCP Hosts Setup, MCP Inspector, Pagineringsstrategieën, Diepgaande Protocolfuncties

## 28 jan 2026

### MCP-specificatie 2025-11-25 nalevingsreview

#### Kernconceptenhancement (01-CoreConcepts/)
- **Nieuwe clientprimitief - Roots**: Uitgebreide documentatie over Roots clientprimitief toegevoegd, waarmee servers bestandssysteemgrenzen en toegangsrechten kunnen begrijpen
- **Toolannotaties**: Documentatie over toolgedragsannotaties (`readOnlyHint`, `destructiveHint`) toegevoegd voor betere uitvoeringsbeslissingen van tools
- **Toolaanroepen in Sampling**: Samplingdocumentatie bijgewerkt met parameters `tools` en `toolChoice` voor modelgestuurde toolaanroepen tijdens samplingverzoeken
- **URL-modus Elicitation**: Documentatie toegevoegd over URL-gebaseerde elicitation voor door server geïnitieerde externe webinteracties
- **Taken (Experimenteel)**: Nieuwe sectie toegevoegd met documentatie over experimentele Taken-feature voor duurzame uitvoerings-wrapper en uitgestelde resultaatophaling
- **Pictogrammenondersteuning**: Genoteerd dat tools, resources, bronsjablonen en prompts nu pictogrammen kunnen bevatten als extra metadata

#### Documentatie-updates
- **README.md**: MCP-specificatie 2025-11-25 versieverwijzing en datum-gebaseerde versieuitleg toegevoegd
- **study_guide.md**: Curriculumkaart bijgewerkt met Taken en Toolannotaties in sectie Kernconcepten; documenttimestamp bijgewerkt

#### Specificatienaleving Verificatie
- **Protocolversie**: Gecontroleerd dat alle documentatie verwijst naar MCP Specificatie 2025-11-25
- **Architectuuraanpassing**: Bevestigde nauwkeurigheid van tweelaagse architectuur (Data Layer + Transport Layer) documentatie
- **Primitieven Documentatie**: Gevalideerde serverprimitieven (Resources, Prompts, Tools) en clientprimitieven (Sampling, Elicitation, Logging, Roots)
- **Transportmechanismen**: Nauwkeurigheid STDIO en Streamable HTTP-transportdocumentatie geverifieerd
- **Beveiligingsrichtlijnen**: Afstemming met huidige MCP Beveiligingsbest Practices documentatie bevestigd

#### Belangrijke MCP 2025-11-25 functies gedocumenteerd
- **OpenID Connect Discovery**: Auth server discovery via OIDC
- **OAuth Client ID metadata-documenten**: Aanbevolen clientregistratiemechanisme
- **JSON Schema 2020-12**: Standaarddialect voor MCP schema-definities
- **SDK Tiering systeem**: Geformaliseerde vereisten voor SDK functie-ondersteuning en onderhoud
- **Governancestructuur**: Geformaliseerde Werkgroepen en Interest Groups binnen MCP governance

### Grote update beveiligingsdocumentatie (02-Security/)

#### Integratie MCP Security Summit Workshop (Sherpa)
- **Nieuwe praktische trainingsbron**: Uitgebreide integratie met de [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) door alle beveiligingsdocumentatie
- **Expeditieroute-record**: Volledige camp-to-camp voortgang gedocumenteerd van Base Camp tot Summit
- **OWASP-afstemming**: Alle beveiligingsrichtlijnen nu gekoppeld aan OWASP MCP Azure Security Guide risico’s

#### OWASP MCP Top 10 Integratie
- **Nieuwe sectie**: OWASP MCP Top 10 beveiligingsrisicotabel met Azure mitigaties toegevoegd aan hoofdbeveiligings README
- **Risicogebaseerde documentatie**: mcp-security-controls-2025.md bijgewerkt met OWASP MCP risicoverwijzingen per beveiligingsdomein
- **Referentiearchitectuur**: Verwijzingen toegevoegd naar OWASP MCP Azure Security Guide referentiearchitectuur en implementatiepatronen

#### Bijgewerkte beveiligingsbestanden
- **README.md**: Sherpa Workshop overzicht, expeditieroutetabel, OWASP MCP Top 10 risicosamenvatting en praktische trainingssectie toegevoegd
- **mcp-security-controls-2025.md**: Koptekst bijgewerkt naar februari 2026, OWASP risicoverwijzingen (MCP01-MCP08) toegevoegd, versie-inconsistentie gerepareerd
- **mcp-security-best-practices-2025.md**: Sherpa en OWASP bronnen sectie toegevoegd, timestamp bijgewerkt
- **mcp-best-practices.md**: Praktische trainingssectie toegevoegd met Sherpa en OWASP links
- **azure-content-safety-implementation.md**: OWASP MCP06 referentie, Sherpa Kamp 3 afstemming en extra bronnen sectie toegevoegd

#### Nieuwe hulpbronnenlinks toegevoegd
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuele OWASP MCP risicopagina’s (MCP01-MCP10)

### Curriculum-brede MCP Specificatie 2025-11-25 Afstemming

#### Module 03 - Aan de slag
- **SDK documentatie**: Go SDK toegevoegd aan officiële SDK-lijst; alle SDK-verwijzingen bijgewerkt conform MCP Specificatie 2025-11-25
- **Transportverduidelijking**: STDIO en HTTP Streaming transportbeschrijvingen bijgewerkt met expliciete specificatieverwijzingen

#### Module 04 - Praktische implementatie
- **SDK-updates**: Go SDK toegevoegd; SDK-lijst bijgewerkt met specificatieversieverwijzing
- **Autorisatie specificatie**: MCP Autorisatiespecificatielink geüpdatet naar huidige versie 2025-11-25

#### Module 05 - Gevorderde onderwerpen
- **Nieuwe functies**: Opmerking toegevoegd over nieuwe MCP Specificatie 2025-11-25 functies (Taken, Toolannotaties, URL-modus Elicitation, Roots)
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop links toegevoegd aan aanvullende referenties

#### Module 06 - Communitybijdragen
- **SDK-lijst**: Swift en Rust SDK’s toegevoegd; specificatielink geüpdatet naar 2025-11-25
- **Specificatieverwijzing**: MCP Specificatielink geüpdatet naar directe specificatie-URL

#### Module 07 - Lessen van vroege adoptie
- **Bronupdates**: Toegevoegd MCP Specificatie 2025-11-25 link en OWASP MCP Top 10 aan aanvullende bronnen

#### Module 08 - Best Practices
- **Spec Versie**: Bijgewerkt MCP Specificatie verwijzing naar 2025-11-25
- **Beveiligingsbronnen**: Toegevoegd OWASP MCP Top 10 en Sherpa workshop aan aanvullende referenties

#### Module 10 - Stroomlijnen van AI Workflows
- **Badge Update**: MCP versie badge gewijzigd van SDK versie (1.9.3) naar specificatie versie (2025-11-25)
- **Bronlinks**: MCP Specificatie link bijgewerkt; OWASP MCP Top 10 toegevoegd

#### Module 11 - MCP Server Hands-On Labs
- **Spec Verwijzing**: MCP Specificatie link bijgewerkt naar versie 2025-11-25
- **Beveiligingsbronnen**: OWASP MCP Top 10 toegevoegd aan officiële bronnen

## 18 december 2025

### Beveiligingsdocumentatie Update - MCP Specificatie 2025-11-25

#### MCP Beveiligings-Best Practices (02-Security/mcp-best-practices.md) - Specificatie Versie Update
- **Protocolversie Update**: Bijgewerkt naar verwijzing van de nieuwste MCP Specificatie 2025-11-25 (uitgegeven op 25 november 2025)
  - Alle specificatie versie verwijzingen aangepast van 2025-06-18 naar 2025-11-25
  - Documentdatum verwijzingen bijgewerkt van 18 augustus 2025 naar 18 december 2025
  - Gecontroleerd dat alle specificatie URL's naar actuele documentatie wijzen
- **Inhoudsvalidatie**: Uitgebreide validatie van beveiligingsbest practices tegen de laatste standaarden
  - **Microsoft Beveiligingsoplossingen**: Controle op actuele terminologie en links voor Prompt Shields (voorheen "Jailbreak risico detectie"), Azure Content Safety, Microsoft Entra ID en Azure Key Vault
  - **OAuth 2.1 Beveiliging**: Bevestigde overeenstemming met de nieuwste OAuth beveiligingsbest practices
  - **OWASP Standaarden**: Bevestigde dat OWASP Top 10 voor LLM's referenties actueel blijven
  - **Azure Services**: Controleren van alle Microsoft Azure documentatielinks en best practices
- **Standaardenovereenstemming**: Alle geraadpleegde beveiligingsstandaarden bevestigd als actueel
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Beveiligings-Best Practices
  - Azure beveiligings- en compliance frameworks
- **Implementatieressources**: Controle van alle implementatiegids links en bronnen
  - Azure API Management authenticatiepatronen
  - Microsoft Entra ID integratiehandleidingen
  - Azure Key Vault secrets beheer
  - DevSecOps pipelines en monitoringoplossingen

### Documentatie Kwaliteitsborging
- **Specificatie Naleving**: Zeker gesteld dat alle verplichte MCP beveiligingseisen (MUST/MUST NOT) overeenkomen met de nieuwste specificatie
- **Resource Actualiteit**: Gecontroleerd dat alle externe links naar Microsoft documentatie, beveiligingsstandaarden en implementatiegidsen actueel zijn
- **Best Practices Dekking**: Bevestigd dat er uitgebreide dekking is van authenticatie, autorisatie, AI-specifieke bedreigingen, supply chain beveiliging en enterprise patronen

## 6 oktober 2025

### Uitbreiding Getting Started Sectie – Geavanceerd Servergebruik & Eenvoudige Authenticatie

#### Geavanceerd Servergebruik (03-GettingStarted/10-advanced)
- **Nieuw Hoofdstuk Toegevoegd**: Invoering van een uitgebreide handleiding voor geavanceerd MCP servergebruik, met aandacht voor zowel reguliere als low-level serverarchitecturen.
  - **Reguliere vs. Low-Level Server**: Gedetailleerde vergelijking en codevoorbeelden in Python en TypeScript voor beide benaderingen.
  - **Handler-gebaseerd Ontwerp**: Uitleg over handler-gebaseerd beheer van tools/bronnen/prompts voor schaalbare, flexibele serverimplementaties.
  - **Praktische Patronen**: Reële scenario's waarbij low-level serverpatronen voordeel bieden voor geavanceerde features en architectuur.

#### Eenvoudige Authenticatie (03-GettingStarted/11-simple-auth)
- **Nieuw Hoofdstuk Toegevoegd**: Stapsgewijze handleiding voor het implementeren van eenvoudige authenticatie in MCP-servers.
  - **Auth Concepten**: Heldere uitleg over authenticatie versus autorisatie en het beheer van credentials.
  - **Basis Auth Implementatie**: Middleware-gebaseerde authenticatiepatronen in Python (Starlette) en TypeScript (Express), met codevoorbeelden.
  - **Voortgang naar Geavanceerde Beveiliging**: Advies over starten met eenvoudige authenticatie en doorgroeien naar OAuth 2.1 en RBAC, met verwijzingen naar geavanceerde beveiligingsmodules.

Deze toevoegingen bieden praktische, hands-on begeleiding voor het bouwen van robuustere, veiligere en flexibelere MCP serverimplementaties, waarmee fundamentele concepten worden verbonden met geavanceerde productiepatronen.

## 29 september 2025

### MCP Server Database-integratie Labs - Uitgebreid Hands-On Leertraject

#### 11-MCPServerHandsOnLabs - Nieuwe Complete Database Integratie Curriculum
- **Compleet 13-Labs Leerpad**: Toegevoegd uitgebreid hands-on curriculum voor het bouwen van productieklaar MCP-servers met PostgreSQL database-integratie
  - **Reële Implementatie**: Zava Retail analytics use case die enterprise-grade patronen demonstreert
  - **Gestructureerde Leerprogressie**:
    - **Labs 00-03: Fundamenten** - Introductie, Kerarchitectuur, Beveiliging & Multi-Tenancy, Omgevingssetup
    - **Labs 04-06: MCP Server Bouwen** - Databaseontwerp & Schema, MCP Server Implementatie, Toolontwikkeling  
    - **Labs 07-09: Geavanceerde Features** - Semantische Zoekintegratie, Testen & Debuggen, VS Code Integratie
    - **Labs 10-12: Productie & Best Practices** - Deploymentsstrategieën, Monitoring & Observeerbaarheid, Best Practices & Optimalisatie
  - **Enterprise Technologieën**: FastMCP framework, PostgreSQL met pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Geavanceerde Features**: Row Level Security (RLS), semantisch zoeken, multi-tenant data toegang, vector embeddings, realtime monitoring

#### Terminologie Standaardisatie - Module naar Lab Conversie
- **Uitgebreide Documentatieupdate**: Systematisch alle README bestanden in 11-MCPServerHandsOnLabs bijgewerkt om "Lab" terminologie te gebruiken in plaats van "Module"
  - **Sectiekoppen**: "What This Module Covers" aangepast naar "What This Lab Covers" in alle 13 labs
  - **Inhoudsbeschrijving**: "This module provides..." veranderd naar "This lab provides..." door de hele documentatie
  - **Leerdoelen**: "By the end of this module..." aangepast naar "By the end of this lab..."
  - **Navigatielinks**: Alle "Module XX:" verwijzingen omgezet naar "Lab XX:" in kruisverwijzingen en navigatie
  - **Volgafdracht bijhouden**: "After completing this module..." aangepast naar "After completing this lab..."
  - **Technische Verwijzingen**: Python module verwijzingen in configuratiebestanden behouden (bijv. `"module": "mcp_server.main"`)

#### Studiehandleiding Verbetering (study_guide.md)
- **Visuele Curriculumkaart**: Nieuwe sectie "11. Database Integratie Labs" toegevoegd met uitgebreide labstructuurvisualisatie
- **Repository Structuur**: Geüpdatet van tien naar elf hoofdsecties met gedetailleerde 11-MCPServerHandsOnLabs beschrijving
- **Leerpad Instructies**: Verbeterde navigatie met dekking van secties 00-11
- **Technologie Dekking**: Toevoeging van FastMCP, PostgreSQL, Azure services integratiedetails
- **Leerresultaten**: Benadrukt productieklaar serverontwikkeling, database-integratiepatronen en enterprise beveiliging

#### Hoofd README Structuurverbetering
- **Lab-gebaseerde Terminologie**: Hoofd README.md in 11-MCPServerHandsOnLabs bijgewerkt om consequent "Lab"-structuur te gebruiken
- **Leerpad Organisatie**: Duidelijke progressie van fundamentele concepten naar geavanceerde implementatie en productie
- **Reële Wereld Focus**: Nadruk op praktische, hands-on learning met enterprise-grade patronen en technologieën

### Documentatie Kwaliteit & Consistentie Verbeteringen
- **Hands-On Leerbenadering**: Versterkte praktische lab-gebaseerde aanpak door de hele documentatie
- **Enterprise Patronen Focus**: Belicht productieklaar implementaties en enterprise beveiligingsoverwegingen
- **Technologie Integratie**: Uitgebreide dekking van moderne Azure diensten en AI integratiepatronen
- **Leerprogressie**: Duidelijk, gestructureerd pad van basisconcepten naar productie-implementatie

## 26 september 2025

### Casestudies Verbetering - GitHub MCP Registry Integratie

#### Casestudies (09-CaseStudy/) - Ecosysteem Ontwikkeling Focus
- **README.md**: Grote uitbreiding met uitgebreide GitHub MCP Registry casestudy
  - **GitHub MCP Registry Casestudy**: Nieuwe uitgebreide casestudy over de lancering van GitHub’s MCP Registry in september 2025
    - **Probleemanalyse**: Gedetailleerde analyse van gefragmenteerde MCP server ontdekking en deployment uitdagingen
    - **Oplossingsarchitectuur**: GitHub’s gecentraliseerde registry benadering met one-click VS Code installatie
    - **Zakelijke Impact**: Meetbare verbeteringen in developer onboarding en productiviteit
    - **Strategische Waarde**: Focus op modulair agent deployment en cross-tool interoperabiliteit
    - **Ecosysteemontwikkeling**: Positionering als fundamenteel platform voor agentic integratie
  - **Verbeterde Casestudy Structuur**: Alle zeven casestudies geüpdatet met consistente formatting en uitgebreide beschrijvingen
    - Azure AI Reisagenten: Multi-agent orkestratie nadruk
    - Azure DevOps Integratie: Workflow automatisering focus
    - Real-Time Documentatieterugwinning: Python console client implementatie
    - Interactieve Studieplanner Generator: Chainlit conversationele webapp
    - In-Editor Documentatie: VS Code en GitHub Copilot integratie
    - Azure API Management: Enterprise API integratiepatronen
    - GitHub MCP Registry: Ecosysteemontwikkeling en community platform
  - **Uitgebreide Conclusie**: Herscrhreven conclusie met nadruk op zeven casestudies over meerdere MCP implementatiedimensies
    - Enterprise Integratie, Multi-Agent Orkestratie, Developer Productiviteit
    - Ecosysteemontwikkeling, Educatieve Toepassingen categorisatie
    - Verbeterde inzichten in architectuurpatronen, implementatiestrategieën en best practices
    - Nadruk op MCP als volwassen, productieklaar protocol

#### Studiehandleiding Updates (study_guide.md)
- **Visuele Curriculumkaart**: Mindmap bijgewerkt om GitHub MCP Registry op te nemen in Casestudies sectie
- **Casestudies Beschrijving**: Uitgebreid van generieke omschrijvingen naar gedetailleerde uitsplitsing van zeven uitgebreide casestudies
- **Repository Structuur**: Sectie 10 geüpdatet om uitgebreide casestudiedekking met specifieke implementatiedetails weer te geven
- **Changelog Integratie**: September 26, 2025 invoer toegevoegd met documentatie van GitHub MCP Registry toevoeging en casestudie verbeteringen
- **Datumupdates**: Footer timestamp bijgewerkt naar laatste revisie (26 september 2025)

### Documentatie Kwaliteitsverbeteringen
- **Consistentie Verbetering**: Gestandaardiseerde casestudy formatting en structuur over alle zeven voorbeelden
- **Uitgebreide Dekking**: Casestudies omvatten nu enterprise, developer productiviteit en ecosysteemontwikkelingsscenario’s
- **Strategische Positionering**: Versterkte focus op MCP als fundamenteel platform voor agentic systeemdeployments
- **Resource Integratie**: Uitbreiding aanvullende bronnen met GitHub MCP Registry link

## 15 september 2025

### Uitbreiding Geavanceerde Onderwerpen - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Nieuwe Geavanceerde Implementatiehandleiding
- **README.md**: Volledige implementatiehandleiding voor aangepaste MCP transportmechanismen
  - **Azure Event Grid Transport**: Uitgebreide serverless event-gedreven transportimplementatie
    - C#, TypeScript en Python voorbeelden met Azure Functions integratie
    - Event-gedreven architectuurpatronen voor schaalbare MCP oplossingen
    - Webhook ontvangers en push-gebaseerde berichtafhandeling
  - **Azure Event Hubs Transport**: High-throughput streaming transportimplementatie
    - Real-time streaming mogelijkheden voor low-latency scenario’s
    - Partitioneringsstrategieën en checkpointbeheer
    - Berichtbundeling en prestatie-optimalisatie
  - **Enterprise Integratiepatronen**: Productieklaar architectuurexamples
    - Gedistribueerde MCP verwerking over meerdere Azure Functions
    - Hybride transportarchitecturen die meerdere transporttypes combineren
    - Berichtduurzaamheid, betrouwbaarheid en foutafhandelingsstrategieën
  - **Beveiliging & Monitoring**: Azure Key Vault integratie en observeerbaarheids patronen
    - Managed identity authenticatie en ‘least privilege’ toegang
    - Application Insights telemetrie en prestatiemonitoring
    - Circuit breakers en fouttolerantiefuncties
  - **Testframeworks**: Uitgebreide teststrategieën voor custom transports
    - Unit testen met test doubles en mocking frameworks
    - Integratietesten met Azure Test Containers
    - Prestatie- en belastingstesten overwegingen

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Ontluikende AI Discipline
- **README.md**: Uitgebreide verkenning van context engineering als nieuw vakgebied
  - **Kernprincipes**: Compleet context delen, actie-besluit bewustzijn en context window management
  - **MCP Protocol Afstemming**: Hoe MCP ontwerp context engineering uitdagingen adresseert
    - Beperkingen van contextvensters en progressieve laadstrategieën
    - Relevantiebepaling en dynamische context ophalen
    - Multimodale contextafhandeling en beveiligingsoverwegingen
  - **Implementatiebenaderingen**: Single-threaded versus multi-agent architecturen
    - Context segmentatie en prioriteringstechnieken
    - Progressieve contextbelasting en compressiestrategieën
    - Gelaagde contextbenaderingen en ophaaloptimalisatie
  - **Meetframework**: Opkomende metrics voor evaluatie van context-effectiviteit
    - Inputefficiëntie, prestaties, kwaliteit en gebruikerservaring overwegingen
    - Experimentele benaderingen voor contextoptimalisatie
    - Falanalyse en verbeteringsmethodologieën

#### Curriculum Navigatie Updates (README.md)
- **Verbeterde Modulstructuur**: Curriculumtabel bijgewerkt met nieuwe geavanceerde onderwerpen
  - Toegevoegd Context Engineering (5.14) en Custom Transport (5.15) items
  - Consistente formatting en navigatielinks over alle modules
  - Beschrijvingen geüpdatet om huidig inhoudsbereik weer te geven

### Directory Structuurverbeteringen
- **Naamstandaardisatie**: "mcp transport" hernoemd naar "mcp-transport" ter consistentie met andere geavanceerde topicfolders
- **Inhoudsorganisatie**: Alle 05-AdvancedTopics mappen volgen nu hetzelfde naamgevingspatroon (mcp-[onderwerp])

### Documentatie Kwaliteitsverbeteringen
- **MCP Specificatie Afstemming**: Alle nieuwe inhoud verwijst naar de MCP Specificatie 2025-06-18
- **Meertalige Voorbeelden**: Uitgebreide codevoorbeelden in C#, TypeScript en Python
- **Enterprise Focus**: Productieklaar patronen en Azure cloudintegratie door het hele traject
- **Visuele Documentatie**: Mermaid-diagrammen voor architectuur- en stroomvisualisatie

## 18 augustus 2025

### Uitgebreide Documentatie-update - MCP 2025-06-18 Normen

#### MCP Security Best Practices (02-Security/) - Volledige Modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Volledige herschrijving afgestemd op MCP Specificatie 2025-06-18
  - **Verplichte Vereisten**: Toegevoegd expliciete MOET/NIET MOET-vereisten vanuit officiële specificatie met duidelijke visuele indicatoren
  - **12 Kernbeveiligingspraktijken**: Hervormd van een lijst van 15 items naar uitgebreide beveiligingsdomeinen
    - Tokenbeveiliging & Authenticatie met integratie van externe identiteitsprovider
    - Sessiebeheer & Transportbeveiliging met cryptografische vereisten
    - AI-specifieke Dreigingsbescherming met Microsoft Prompt Shields-integratie
    - Toegangscontrole & Machtigingen met principe van minimale rechten
    - Inhoudsveiligheid & Monitoring met Azure Content Safety-integratie
    - Leveringsketenbeveiliging met uitgebreide componentverificatie
    - OAuth-beveiliging & Confused Deputy Preventie met PKCE-implementatie
    - Incidentrespons & Herstel met geautomatiseerde mogelijkheden
    - Naleving & Governance met regelgevende afstemming
    - Geavanceerde Beveiligingscontroles met zero trust architectuur
    - Microsoft Security Ecosysteemintegratie met uitgebreide oplossingen
    - Continue Beveiligingsevolutie met adaptieve praktijken
  - **Microsoft Beveiligingsoplossingen**: Verbeterde integratierichtlijnen voor Prompt Shields, Azure Content Safety, Entra ID en GitHub Advanced Security
  - **Implementatieresources**: Geordende uitgebreide resource-links per categorie Officiële MCP-documentatie, Microsoft Beveiligingsoplossingen, Beveiligingsstandaarden en Implementatiehandleidingen

#### Geavanceerde Beveiligingscontroles (02-Security/) - Enterprise Implementatie
- **MCP-SECURITY-CONTROLS-2025.md**: Volledige herziening met beveiligingsframework op ondernemingsniveau
  - **9 Uitgebreide Beveiligingsdomeinen**: Uitgebreid van basiscontroles naar gedetailleerd enterpriseframework
    - Geavanceerde Authenticatie & Autorisatie met Microsoft Entra ID-integratie
    - Tokenbeveiliging & Anti-Passthrough-controles met uitgebreide validatie
    - Sessiebeveiligingscontroles met preventie van kaping
    - AI-specifieke beveiligingscontroles met preventie van promptinjectie en toolvergiftiging
    - Confused Deputy Attack Preventie met OAuth-proxybeveiliging
    - Tooluitvoeringsbeveiliging met sandboxing en isolatie
    - Leveringsketenbeveiligingscontroles met afhankelijkheidsverificatie
    - Monitoring & Detectiecontroles met SIEM-integratie
    - Incidentrespons & Herstel met geautomatiseerde mogelijkheden
  - **Implementatievoorbeelden**: Toegevoegd gedetailleerde YAML-configuratieblokken en codevoorbeelden
  - **Microsoft Oplossingsintegratie**: Uitgebreide dekking van Azure beveiligingsservices, GitHub Advanced Security en enterprise identiteitsbeheer

#### Geavanceerde Onderwerpen Beveiliging (05-AdvancedTopics/mcp-security/) - Productieklaar Implementatie
- **README.md**: Volledige herschrijving voor enterprise beveiligingsimplementatie
  - **Huidige Specificatie-afstemming**: Bijgewerkt naar MCP Specificatie 2025-06-18 met verplichte beveiligingsvereisten
  - **Verbeterde Authenticatie**: Microsoft Entra ID-integratie met uitgebreide .NET- en Java Spring Securityvoorbeelden
  - **AI-beveiligingsintegratie**: Microsoft Prompt Shields en Azure Content Safety-implementatie met gedetailleerde Python-voorbeelden
  - **Geavanceerde Dreigingsmitigatie**: Uitgebreide implementatievoorbeelden voor
    - Confused Deputy Attack Preventie met PKCE en gebruikersconsent-validatie
    - Token Passthrough Preventie met audience-validatie en veilig tokenbeheer
    - Sessie-kaping Preventie met cryptografische binding en gedragsanalyse
  - **Enterprise Beveiligingsintegratie**: Azure Application Insights monitoring, dreigingsdetectiepijplijnen en leveringsketenbeveiliging
  - **Implementatiechecklist**: Duidelijke verplichte versus aanbevolen beveiligingscontroles met voordelen van Microsoft security ecosystem

### Kwaliteit van Documentatie & Normafstemming
- **Specificatieverwijzingen**: Alle verwijzingen bijgewerkt naar huidige MCP Specificatie 2025-06-18
- **Microsoft Security Ecosysteem**: Verbeterde integratierichtlijnen door alle beveiligingsdocumentatie
- **Praktische Implementatie**: Toegevoegd gedetailleerde codevoorbeelden in .NET, Java en Python met enterprisepatronen
- **Resource-organisatie**: Uitgebreide categorisering van officiële documentatie, beveiligingsstandaarden en implementatiehandleidingen
- **Visuele Indicatoren**: Duidelijke markering van verplichte vereisten versus aanbevolen praktijken

#### Kernconcepten (01-CoreConcepts/) - Volledige Modernisering
- **Protocolversie-update**: Bijgewerkt met verwijzing naar huidige MCP Specificatie 2025-06-18 volgens datumgebaseerde versie (YYYY-MM-DD-formaat)
- **Architectuurverbetering**: Verbeterde beschrijvingen van Hosts, Clients en Servers ter afstemming op huidige MCP architectuurpatronen
  - Hosts nu duidelijk gedefinieerd als AI-applicaties die meerdere MCP clientverbindingen coördineren
  - Clients beschreven als protocolkoppelingen met één-op-één serverrelaties
  - Servers verbeterd met lokale versus externe implementatiescenario's
- **Primitievenherstructurering**: Volledige herziening van server- en clientprimitieven
  - Serverprimitieven: Resources (gegevensbronnen), Prompts (sjablonen), Tools (uitvoerbare functies) met gedetailleerde uitleg en voorbeelden
  - Clientprimitieven: Sampling (LLM-voltooiingen), Elicitation (gebruikersinvoer), Logging (debugging/monitoring)
  - Bijgewerkt met huidige ontdekkings- (`*/list`), ophaal- (`*/get`) en uitvoerings- (`*/call`) methodenpatronen
- **Protocolarchitectuur**: Invoering van tweelaags architectuurmodel
  - Datalayer: JSON-RPC 2.0 basis met lifecycle management en primitieven
  - Transportlaag: STDIO (lokaal) en Streamable HTTP met SSE (remote) transportmechanismen
- **Beveiligingsframework**: Uitgebreide beveiligingsprincipes inclusief expliciete gebruikersconsent, gegevensprivacybescherming, veiligheid bij tooluitvoering en transportlaagbeveiliging
- **Communicatiepatronen**: Bijgewerkte protocolberichten tonen initialisatie-, ontdekking-, uitvoerings- en notificatiestromen
- **Codevoorbeelden**: Vernieuwde meertalige voorbeelden (.NET, Java, Python, JavaScript) afgestemd op huidige MCP SDK-patronen

#### Beveiliging (02-Security/) - Uitgebreide Beveiligingsherziening  
- **Normafstemming**: Volledige afstemming op MCP Specificatie 2025-06-18 beveiligingseisen
- **Authenticatie-evolutie**: Gedocumenteerde evolutie van custom OAuth-servers tot delegatie naar externe identiteitsprovider (Microsoft Entra ID)
- **AI-specifieke Dreigingsanalyse**: Uitgebreide dekking van moderne AI-aanvalsvektoren
  - Gedetailleerde promptinjectieaanvalscenario's met praktijkvoorbeelden
  - Mechanismen van toolvergiftiging en “rug pull” aanvalspatronen
  - Contextwindowvergiftiging en modelverwarringsaanvallen
- **Microsoft AI-beveiligingsoplossingen**: Uitgebreide dekking van Microsoft beveiligingsecosysteem
  - AI Prompt Shields met geavanceerde detectie-, spotlight- en delimitertechnieken
  - Azure Content Safety-integratiepatronen
  - GitHub Advanced Security voor leveringsketenbescherming
- **Geavanceerde Dreigingsmitigatie**: Uitgebreide beveiligingscontroles voor
  - Sessiekaping met MCP-specifieke aanvalsscenario's en cryptografische sessie-ID-vereisten
  - Confused Deputy-problemen in MCP proxy-scenario's met expliciete consent-eisen
  - Token passthrough kwetsbaarheden met verplichte validatiecontroles
- **Leveringsketenbeveiliging**: Uitgebreide AI-leveringsketen dekking inclusief foundation models, embeddingsdiensten, contextproviders en third-party API’s
- **Foundationsbeveiliging**: Verbeterde integratie met enterprise beveiligingspatronen inclusief zero trust architectuur en Microsoft security ecosystem
- **Resource-organisatie**: Geordende uitgebreide resource-links per type (Officiële Docs, Standaarden, Onderzoek, Microsoft Oplossingen, Implementatiehandleidingen)

### Verbeteringen in Documentatiekwaliteit
- **Gestructureerde Leerdoelen**: Verbeterde leerdoelen met specifieke, uitvoerbare uitkomsten
- **Kruisverwijzingen**: Toegevoegd links tussen gerelateerde beveiligings- en kernconceptonderwerpen
- **Actuele Informatie**: Alle datumverwijzingen en specificatielinks bijgewerkt naar huidige normen
- **Implementatierichtlijnen**: Toegevoegd specifieke, uitvoerbare implementatierichtlijnen door beide secties

## 16 juli 2025

### README en Navigatieverbeteringen
- Volledig herontworpen curriculumnavigatie in README.md
- `<details>`-tags vervangen door toegankelijker tabelgebaseerd formaat
- Alternatieve lay-outopties gemaakt in nieuwe map "alternative_layouts"
- Toegevoegd kaartengebaseerde, tabstijl en accordeonstijl navigatievoorbeelden
- Gereviseerde repositorystructuur-sectie om alle nieuwste bestanden te bevatten
- Verbeterde sectie "How to Use This Curriculum" met duidelijke aanbevelingen
- MCP-specificatielinks bijgewerkt naar juiste URL’s
- Toegevoegd Context Engineering sectie (5.14) aan curriculumstructuur

### Studiehandleiding Updates
- Studiehandleiding volledig herzien om aan te sluiten bij huidige repositorystructuur
- Nieuwe secties toegevoegd voor MCP Clients en Tools, en Populaire MCP Servers
- Visual Curriculum Map geactualiseerd met juiste weergave van alle onderwerpen
- Beschrijvingen van Advanced Topics verbeterd om alle gespecialiseerde gebieden te dekken
- Case Studies-sectie bijgewerkt met actuele voorbeelden
- Uitgebreide changelog toegevoegd

### Communitybijdragen (06-CommunityContributions/)
- Gedetailleerde informatie toegevoegd over MCP-servers voor beeldgeneratie
- Uitgebreide sectie toegevoegd over gebruik van Claude in VSCode
- Installatie- en gebruiksinstructies toegevoegd voor Cline terminalclient
- MCP client sectie bijgewerkt met alle populaire cliëntopties
- Voorbeelden van bijdragen verbeterd met nauwkeuriger codevoorbeelden

### Geavanceerde Onderwerpen (05-AdvancedTopics/)
- Alle gespecialiseerde topicmappen georganiseerd met consistente naamgeving
- Context engineering materialen en voorbeelden toegevoegd
- Foundry agent integratiedocumentatie toegevoegd
- Verbeterde Entra ID beveiligingsintegratiedocumentatie

## 11 juni 2025

### Initiële Creatie
- Eerste versie uitgebracht van MCP for Beginners curriculum
- Basisstructuur gemaakt voor alle 10 hoofdzaken
- Visual Curriculum Map geïmplementeerd voor navigatie
- Initiële voorbeeldprojecten toegevoegd in meerdere programmeertalen

### Aan de slag (03-GettingStarted/)
- Eerste serverimplementatievoorbeelden gemaakt
- Clientontwikkelingsrichtlijnen toegevoegd
- LLM client-integratie-instructies toegevoegd
- VS Code integratiedocumentatie toegevoegd
- Server-Sent Events (SSE) servervoorbeelden geïmplementeerd

### Kernconcepten (01-CoreConcepts/)
- Gedetailleerde uitleg over client-serverarchitectuur toegevoegd
- Documentatie over sleutelprotocolcomponenten gemaakt
- Documentatie van berichtpatronen in MCP

## 23 mei 2025

### Repositorystructuur
- Repository opgestart met basis mappenstructuur
- README-bestanden gemaakt voor elke hoofdsectie
- Vertaalinfrastructuur opgezet
- Afbeeldingsbronnen en diagrammen toegevoegd

### Documentatie
- Eerste README.md gemaakt met curriculumoverzicht
- CODE_OF_CONDUCT.md en SECURITY.md toegevoegd
- SUPPORT.md opgezet met richtlijnen voor hulpverzoeken
- Voorlopige studiehandleidingstructuur gemaakt

## 15 april 2025

### Planning en Framework
- Initiële planning voor MCP for Beginners curriculum
- Leerdoelen en doelgroep gedefinieerd
- Structuur van 10 secties voor curriculum uitgestippeld
- Conceptueel framework ontwikkeld voor voorbeelden en casestudies
- Initiële prototypevoorbeelden gemaakt voor sleutelconcepten

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->