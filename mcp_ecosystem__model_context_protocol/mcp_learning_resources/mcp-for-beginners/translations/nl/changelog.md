# Changelog: MCP voor Beginners Curriculum

Dit document dient als een overzicht van alle belangrijke wijzigingen die zijn aangebracht in het Model Context Protocol (MCP) voor Beginners curriculum. Wijzigingen worden gedocumenteerd in omgekeerde chronologische volgorde (nieuwste wijzigingen eerst).

## 24 juni 2026

### Nieuwe Les: Gebruik van MCP in Copilot-app

- [Tooling-sectie](./12-tooling/README.md) Toegevoegde tooling-sectie.
- [MCP in Copilot-app](./12-tooling/01-copilot-app/README.md)

## 16 juni 2026

### Afstemming MCP-specificatie & Validatie Voorbeelden

Het curriculum gevalideerd tegen de huidige **MCP Specificatie 2025-11-25** en de meest recente officiële SDK's, waarna resterende verouderde specificatieverwijzingen zijn gecorrigeerd en bevestigd dat de kernvoorbeelden nog steeds bouwen en draaien.

#### Correcties Specificatieversies (2025-06-18 / 2025-03-26 → 2025-11-25)

Engelse inhoud bijgewerkt waar nog werd gesteld dat een oudere specificatierevisie de *huidige/laatste* standaard was, en links opnieuw gericht naar de canonieke `modelcontextprotocol.io` specificatiepaden:
- **05-AdvancedTopics/mcp-security/README.md**: Bijgewerkt banner “Huidige Standaard”, introductie, kop kernbeveiligingsprincipes, kop verplichte vereisten, sectie Microsoft Entra ID, links Referenties & Bronnen en afsluitende beveiligingsmelding (8 verwijzingen) naar 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Bijgewerkt link aanvullende bronnen specificatie en banner “Huidige Standaard” naar 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Verouderde `2025-03-26` security-and-trust link vervangen door actuele 2025-11-25 pagina met beveiligingsbest practices
- **03-GettingStarted/14-sampling/README.md**: Link officiële sampling-documentatie bijgewerkt naar 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Huidige tijd “huidige MCP-specificatie” verwijzing en link aanvullende bronnen afgewerkt naar 2025-11-25 (historische SSE-deprecatie-opmerkingen ongewijzigd voor nauwkeurigheid)

#### Validatie Voorbeelden tegen Huidige SDK's

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` loste `@modelcontextprotocol/sdk@1.29.0` op; `tsc --noEmit` slaagde zonder typefouten — bestaande `McpServer`/`StdioServerTransport` API's blijven geldig
- **Python (03-GettingStarted/01-first-server/solution/python)**: Gevalideerd in geïsoleerde `.venv` met `mcp[cli]` (1.27.2); `py_compile` slaagde en `FastMCP.list_tools()` retourneerde correct de `add` en `subtract` tools
- Bevestigd dat alle voorbeeldversies `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) netjes oplossen naar huidige `1.29.0` zonder brekende API-wijzigingen

#### Afstemming Dependency Pins (sluiting versiespleten)

Verouderde SDK-pins verhoogd zodat elk voorbeeld de huidige MCP-release volgt, overeenkomstig de repo-brede conventie:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` verhoogd van `^1.8.0` → `>=1.26.0` en de verouderde `"updated for MCP 2025-06-18"` pakketbeschrijving gewijzigd in `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** en **lab4/code/github_mcp_server/pyproject.toml**: Exacte pin `mcp==1.23.0` verhoogd → `mcp>=1.26.0`; beide `uv.lock` bestanden opnieuw gegenereerd (`uv lock`) zodat de lockfiles oplossen naar huidige `mcp 1.27.2` en synchronisatie met manifesten behouden blijft

#### Analyse Curriculummiddelen — Laatste Spec Feature Dekking

Gecontroleerd dat het curriculum al alle primitieve types omvat die zijn geïntroduceerd/uitgebreid in MCP 2025-11-25, er zijn dus geen inhoudelijke hiaten:
- **Sampling**: Les 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (incl. URL-modus)**: Documentatie in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentatie in 00-Introduction, 01-CoreConcepts en 05-AdvancedTopics/mcp-root-contexts
- **Taken (experimenteel, langdurige operaties)**: Documentatie in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Toolannotaties** (`readOnlyHint` / `destructiveHint`): Documentatie in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features

### Versterking Beveiliging & Oplossen Dependency Kwetsbaarheden

Een volledige beveiligingscontrole uitgevoerd over elk dependency manifest en de voorbeeldbroncode, waarna alle gerapporteerde npm-waarschuwingen en één beveiligingsprobleem op code-niveau zijn opgelost. Na correctie rapporteert `npm audit` **0 kwetsbaarheden** in elke gecontroleerde map.

#### npm Dependency Kwetsbaarheden (transitief) — Verholpen

Alle 15 ingediende `package-lock.json` bestanden geaudit. Kwetsbaarheden waren beperkt tot transitieve dependencies geïntroduceerd door de MCP Inspector dev tool, de OpenAI client en de MCP SDK; deze zijn nu opgelost zonder de voorbeelden te breken:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** en **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` verhoogd (`0.16.6` / `0.14.1` → `0.22.0`), waarmee advisories van gebundelde `ajv`, `brace-expansion`, `diff`, `path-to-regexp` en `ws` werden opgelost. npm `overrides` toegevoegd om gepatchte `shell-quote@1.8.4` af te dwingen en de resterende kritieke waarschuwing verwijderd die door `concurrently` werd veroorzaakt; beide lockfiles opnieuw gegenereerd (nu 0 kwetsbaarheden)
- **03-GettingStarted/samples/typescript**: `npm audit fix` update voor transitieve `qs` (matig) naar gepatchte release
- **03-GettingStarted/samples/javascript**: `npm audit fix` update voor transitieve `hono` (matig) naar gepatchte release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` update voor transitieve `form-data` (hoog) naar gepatchte release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ontbrekende `package-lock.json` aangemaakt zodat het project reproduceerbaar en controleerbaar is (0 kwetsbaarheden)

#### Beveiligingsfix op Code-Niveau (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `shell=True` verwijderd uit de `open_in_vscode` tool. De vorige `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` liet shell meta-tekens in een pad voor een map toe die door `cmd.exe` geïnterpreteerd konden worden (command-injectievector). Nu wordt de opgehelderde `Code.exe` direct gelanceerd met de map als argument — zonder shell — functioneel equivalent en veilig

#### Python Dependency Audit

- Elke Python requirements set geaudit met `pip-audit`. `05-AdvancedTopics` en `03-GettingStarted/samples/python` meldden **geen bekende kwetsbaarheden** (hun `mcp` / `httpx` / `pydantic` / `python-dotenv` versiebereiken lossen op naar actuele gepatchte releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` gaf een waarschuwing voor transitieve dependency **`werkzeug` 3.1.1** met drie `safe_join` Windows apparaatnaam DoS advisories — `CVE-2025-66221`, `CVE-2026-21860` en `CVE-2026-27199` (alle opgelost in 3.1.6). Expliciete beveiligingspin `werkzeug>=3.1.6` toegevoegd zodat de gepatchte release gebruikt wordt; bevestigde dat constraint netjes oplost met de `chainlit` / `mcp` / `semantic-kernel` stack

### Productnaam Rebranding

Alle curriculuminhoud geüpdatet om de productrebranding van Microsoft weer te geven:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord community link bijgewerkt
- **AGENTS.md**: Discord server verwijzing bijgewerkt
- **README.md**: Technologische ecosysteemverwijzingen bijgewerkt
- **study_guide.md**: Verwijzingen case study bijgewerkt
- **05-AdvancedTopics/README.md**: Titel en beschrijving module 5.13 bijgewerkt
- **05-AdvancedTopics/mcp-integration/README.md**: Sektionkop en beschrijving bijgewerkt
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Volledige titel en inhoud module bijgewerkt
- **05-AdvancedTopics/mcp-security-entra/README.md**: Cross-referentielink bijgewerkt
- **07-LessonsfromEarlyAdoption/README.md**: Verwijzingen case study bijgewerkt
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Sectiekop 9, badges en mogelijkheden bijgewerkt
- **08-BestPractices/README.md**: Discord community link bijgewerkt
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanaal verwijzing bijgewerkt
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Model deployment verwijzing bijgewerkt
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Services tabel bijgewerkt
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Resource verwijzingen bijgewerkt

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension voor VS Code
- **README.md**: Hoofdreferenties in curriculum bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Module titel, overzicht en alle modulekoppen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titel, leerdoelen, setup-instructies en bronnen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titel, leerdoelen, MCP hosts tabel en cross-referenties bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titel, badges, prerequisites en bronnen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder verwijzingen en feedback link bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prerequisites en extensieverwijzingen bijgewerkt

---

## 11 april 2026

### Nieuwe Les, Documentatiefixes en Dependency Updates

#### Nieuwe Curriculum Inhoud Toegevoegd

**Module 05 - Gevorderde Onderwerpen**
- **Les 5.17: Adversarial Multi-Agent Reasoning met MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nieuwe uitgebreide gids over het adversarial debate patroon voor multi-agent systemen
  - Mermaid architectuurdiagram: twee agenten → gedeelde MCP-server → debattranscriptie → rechter → oordeel
  - Gedeelde MCP toolserver (`web_search` + `run_python`) geïmplementeerd in Python en TypeScript
  - Tegenwerkende systeem prompts (VOOR / TEGEN / Rechter) met expliciete tool-gebruiksvereisten
  - Debatregisseur in Python, TypeScript en C# die rondes beheert en argumenten routeert
  - MCP `ClientSession` wiring voor de regisseur naar echte toolaanroepen
  - Use-case tabel (hallucinatie detectie, dreigingsmodellering, API ontwerp review, feitelijke verificatie, tech selectie)
  - Beveiligingsoverwegingen: sandboxed uitvoering, tool-aanroep validatie, rate limiting, audit logging
  - Gestructureerde oefening met drie praktische scenario's (code review, architectuurbeslissing, contentmoderatie)

#### Documentatiefixes

**Module 03 - Aan de Slag**
- **05-stdio-server/README.md**: Fout in incompleet TypeScript stdio server voorbeeld gecorrigeerd — missende transportinstantiering toegevoegd (`new StdioServerTransport()`) en `server.connect(transport)` aanroep om te voldoen aan Python en .NET voorbeelden in dezelfde sectie
- **14-sampling/README.md**: Typo gecorrigeerd — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum Updates

**Hoofd README.md**
- Invoeging van entry 5.17 (Adversarial Multi-Agent Reasoning met MCP) in de curriculumtabel met een directe link naar de nieuwe les

**05-AdvancedTopics/README.md**
- Rij voor Les 5.17 toegevoegd aan de lestabel

**study_guide.md**
- Adversarial Multi-Agent Reasoning onderwerp toegevoegd aan de mindmap en prozabeschrijving van Gevorderde Onderwerpen

#### Code- en Beveiligingsfixes

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Beveiligingsfix — commandoinjectie**: `execSync` shell-interpolatie vervangen door `execFile` + `promisify` in de TypeScript `run_python` tool, waardoor het risico op commandoinjectie is geëlimineerd (LLM-gestuurde code wordt nu als letterlijk argv-element doorgegeven zonder shell-betrokkenheid)
- **MCP-tool loop bekabeling**: De Python debatregisseur bijgewerkt om `AsyncAnthropic` client te gebruiken (vervangt blokkerende synchrone `Anthropic`), een live `ClientSession` direct door te geven aan elke agent beurt, tooldefinities op te halen via `session.list_tools()` elke beurt en `tool_use` blokken te dispatchen via `session.call_tool()` in een loop totdat het model een definitieve tekstreactie uitzendt

#### Afhankelijkheidsupdates

- `hono` verhoogd naar 4.12.12 in meerdere pakketten (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` verhoogd van 1.19.11 naar 1.19.13 in TypeScript pakketten
- `cryptography` verhoogd van 46.0.5 naar 46.0.7 in Python pakketten (10-StreamliningAIWorkflows labs 3 en 4)
- `lodash` verhoogd van 4.17.23 naar 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Vertalingen

- Vertalingen voor 48+ talen gesynchroniseerd met laatste bronwijzigingen (i18n update)

---

## 5 februari 2026

### Verbeteringen in repository-brede validatie en navigatie

#### Nieuwe Curriculum-inhoud toegevoegd

**Module 03 - Aan de slag**
- **12-mcp-hosts/README.md**: Nieuwe uitgebreide handleiding voor het opzetten van MCP hosts
  - Configuratievoorbeelden voor Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-configuratiesjablonen voor alle belangrijke hosts
  - Vergelijkingstabel van transporttypes (stdio, SSE/HTTP, WebSocket)
  - Problemen met verbinding oplossen
  - Beveiligingsbest practices voor hostconfiguratie

- **13-mcp-inspector/README.md**: Nieuwe debughandleiding voor MCP Inspector
  - Installatiemethoden (npx, npm global, vanaf bron)
  - Verbinding maken met servers via stdio en HTTP/SSE
  - Testtools, middelen en prompts-workflows
  - VS Code integratie met MCP Inspector
  - Veelvoorkomende debugscenario’s met oplossingen

**Module 04 - Praktische implementatie**
- **pagination/README.md**: Nieuwe implementatiehandleiding voor pagina’s
  - Cursor-gebaseerde paginapatronen in Python, TypeScript, Java
  - Client-side paginabehandeling
  - Cursorontwerpstrategieën (opaque versus gestructureerd)
  - Prestatieoptimalisatie aanbevelingen

**Module 05 - Geavanceerde onderwerpen**
- **mcp-protocol-features/README.md**: Nieuwe diepgaande informatie over protocolfuncties
  - Implementatie van voortgangsnotificaties
  - Patronen voor verzoekannulering
  - Resourcetemplates met URI-patronen
  - Server lifecycle management
  - Beheersing van logniveaus
  - Patronen voor foutafhandeling met JSON-RPC-codes

#### Navigatieverbeteringen (24+ bestanden bijgewerkt)

**Hoofdmodule READMEs**  
 Nu linken ze naar zowel de eerste les ALS de volgende module

**02-Security subbestanden**  
- Alle 5 aanvullende beveiligingsdocumenten hebben nu "Wat is hierna" navigatie:

**09-CaseStudy bestanden**  
- Alle case study bestanden hebben nu sequentiële navigatie:

**10-StreamliningAI Labs**  
"Wat is hierna"-sectie toegevoegd aan Module 10 overzicht en Module 11

#### Code- en inhoudsfixes

**SDK en afhankelijkheidsupdates**  
Lege openai versie gefixed naar `^4.95.0`  
SDK geüpdatet van `^1.8.0` naar `>=1.26.0`  
MCP-versiepinnen geüpdatet naar `>=1.26.0`

**Codefixes**  
Ongeldige model `gpt-4o-mini` gefixed naar `gpt-4.1-mini`

**Inhoudsfixes**  
Verbroke link `READMEmd` → `README.md` gefixed, curriculumkop `Module 1-3` → `Module 0-3` gefixed, hoofdlettergevoelige pad gefixed  
Dubbele corrupte inhoud van Case Study 5 verwijderd

**Beginnergids-verbeteringen**  
Introductie, leerdoelen en vereisten voor beginners toegevoegd

#### Curriculum Updates

**Hoofd README.md**  
- Items 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) toegevoegd aan curriculumtabel

**Module READMEs**  
Lessons 12 en 13 toegevoegd aan lessentabel  
Praktische gidsen sectie toegevoegd met link naar pagination  
Lessons 5.15 (Custom Transport) en 5.16 (Protocol Features) toegevoegd

**study_guide.md**  
- Mindmap geüpdatet met alle nieuwe onderwerpen: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## 28 jan 2026

### MCP-specificatie 2025-11-25 nalevingsreview

#### Kernconcepten verbeterd (01-CoreConcepts/)
- **Nieuwe cliëntprimitief - Roots**: Uitgebreide documentatie toegevoegd over Roots cliëntprimitief, waarmee servers bestandssysteemgrenzen en toegangsrechten kunnen begrijpen  
- **Toolannotaties**: Documentatie over toolgedragsannotaties (`readOnlyHint`, `destructiveHint`) toegevoegd voor betere beslissingen bij het uitvoeren van tools  
- **Toolaanroepen bij Sampling**: Sampling-documentatie bijgewerkt met parameters `tools` en `toolChoice` voor door model gestuurde toolaanroepen tijdens sampling-verzoeken  
- **URL Mode Elicitation**: Documentatie toegevoegd over URL-gebaseerde elicitation voor server-gestuurde externe webinteracties  
- **Taken (experimenteel)**: Nieuwe sectie met documentatie over experimentele Tasks-functie voor duurzame uitvoeringswrappers en uitgestelde opvraging van resultaten  
- **Iconenondersteuning**: Opgemerkt dat tools, resources, resourcetemplates en prompts nu iconen kunnen bevatten als extra metadata

#### Documentatie-updates  
- **README.md**: MCP-specificatie 2025-11-25 versiereferentie en uitleg over op datum gebaseerde versienummering toegevoegd  
- **study_guide.md**: Curriculumkaart geüpdatet met Tasks en Toolannotaties in Core Concepts sectie; documenttimestamps geüpdatet

#### Controle naleving specificatie  
- **Protocolversie**: Bevestigd dat alle documentatie verwijst naar actuele MCP-specificatie 2025-11-25  
- **Architectuuraansluiting**: Bevestigde juistheid van tweelaagse architectuur (Data Layer + Transport Layer) documentatie  
- **Primitieven documentatie**: Serverprimitieven (Resources, Prompts, Tools) en cliëntprimitieven (Sampling, Elicitation, Logging, Roots) gevalideerd  
- **Transportmechanismen**: Documentatie over STDIO en streamable HTTP transport gecontroleerd  
- **Beveiligingsrichtlijnen**: Afstemming met actuele MCP Security Best Practices bevestigd

#### Belangrijke MCP 2025-11-25 functies gedocumenteerd  
- **OpenID Connect Discovery**: Authserver-detectie via OIDC  
- **OAuth Client ID Metadata Documenten**: Aanbevolen clientregistratiemechanisme  
- **JSON Schema 2020-12**: Standaarddialect voor MCP schema-definities  
- **SDK Tiering-systeem**: Formele vereisten voor SDK-functieondersteuning en onderhoud  
- **Governancestructuur**: Formele werkgroepen en interestgroepen in MCP governance

### Grote update beveiligingsdocumentatie (02-Security/)

#### Integratie MCP Security Summit Workshop (Sherpa)  
- **Nieuwe hands-on trainingsresource**: Uitgebreide integratie met [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) toegevoegd in alle beveiligingsdocumentatie  
- **Expeditieroute dekking**: Documentatie van complete kamp-tot-kamp progressie van Base Camp tot Summit  
- **OWASP afstemming**: Alle beveiligingsrichtlijnen nu gekoppeld aan OWASP MCP Azure Security Guide risico’s

#### Integratie OWASP MCP Top 10  
- **Nieuwe sectie**: Tabel met OWASP MCP Top 10 beveiligingsrisico’s en Azure mitigaties toegevoegd aan hoofdsecurity README  
- **Risicogebaseerde documentatie**: mcp-security-controls-2025.md bijgewerkt met OWASP MCP risicoreferenties voor elk beveiligingsdomein  
- **Referentiearchitectuur**: Gelinkt aan OWASP MCP Azure Security Guide referentiearchitectuur en implementatiepatronen

#### Bijgewerkte beveiligingsbestanden  
- **README.md**: Sherpa Workshop overzicht, expeditieroutetabel, OWASP MCP Top 10 risicosamenvatting en hands-on trainingssectie toegevoegd  
- **mcp-security-controls-2025.md**: Header bijgewerkt naar februari 2026, OWASP risicoreferenties (MCP01-MCP08) toegevoegd, specificatieversie-inconsistentie gefixt  
- **mcp-security-best-practices-2025.md**: Sherpa en OWASP bronnen sectie toegevoegd, timestamp geüpdatet  
- **mcp-best-practices.md**: Hands-on trainingssectie met Sherpa en OWASP-links toegevoegd  
- **azure-content-safety-implementation.md**: OWASP MCP06 referentie, Sherpa Camp 3 afstemming en aanvullende bronnen sectie toegevoegd

#### Nieuwe bronnen toegevoegd  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuele OWASP MCP risicopagina’s (MCP01-MCP10)

### Curriculum-brede afstemming op MCP-specificatie 2025-11-25

#### Module 03 - Aan de slag  
- **SDK-documentatie**: Go SDK toegevoegd aan officiële SDK-lijst; alle SDK-verwijzingen geüpdatet volgens MCP-specificatie 2025-11-25  
- **Transport verduidelijking**: Beschrijvingen van STDIO en HTTP streaming transport geüpdatet met expliciete specificatieverwijzingen

#### Module 04 - Praktische Implementatie  
- **SDK-updates**: Go SDK toegevoegd; SDK-lijst geüpdatet met specificatieversiereferentie  
- **Autorisatiespecificatie**: MCP Authorization specificatielink geüpdatet naar huidige 2025-11-25 versie

#### Module 05 - Geavanceerde onderwerpen  
- **Nieuwe functies**: Opmerking toegevoegd over nieuwe MCP-specificatie 2025-11-25 functies (Tasks, Toolannotaties, URL Mode Elicitation, Roots)  
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop links toegevoegd aan aanvullende referenties

#### Module 06 - Communitybijdragen  
- **SDK-lijst**: Swift en Rust SDK’s toegevoegd; specificatielink geüpdatet naar 2025-11-25  
- **Specificatiereferentie**: MCP-specificatielink geüpdatet naar directe specificatie-URL

#### Module 07 - Lessen van vroege adoptie  
- **Resource updates**: MCP-specificatie 2025-11-25 link en OWASP MCP Top 10 toegevoegd aan aanvullende bronnen

#### Module 08 - Best Practices  
- **Specificatieversie**: MCP-specificatiereferentie geüpdatet naar 2025-11-25  
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop toegevoegd aan aanvullende referenties

#### Module 10 - Streamlining AI Workflows  
- **Badge-update**: MCP-versiebadge gewijzigd van SDK-versie (1.9.3) naar specificatieversie (2025-11-25)  
- **Bronlinks**: MCP-specificatielink geüpdatet; OWASP MCP Top 10 toegevoegd

#### Module 11 - MCP Server Hands-On Labs  
- **Specificatielink**: MCP-specificatielink geüpdatet naar 2025-11-25 versie  
- **Beveiligingsbronnen**: OWASP MCP Top 10 toegevoegd aan officiële bronnen

## 18 december 2025

### Update beveiligingsdocumentatie - MCP-specificatie 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specificatieversie update  
- **Protocolversie update**: Geüpdatet naar nieuwste MCP-specificatie 2025-11-25 (uitgebracht op 25 november 2025)  
  - Alle specificatieversiereferenties geüpdatet van 2025-06-18 naar 2025-11-25  
  - Documentdatumreferenties bijgewerkt van 18 augustus 2025 naar 18 december 2025  
  - Alle specificatie-URL’s geverifieerd en wijzen naar actuele documentatie  
- **Inhoudsvalidatie**: Uitgebreide validatie van beveiligingsbest practices gegoten in nieuwste standaarden  
  - **Microsoft Security Solutions**: Huidige terminologie en links geverifieerd voor Prompt Shields (voorheen "Jailbreak risicodetectie"), Azure Content Safety, Microsoft Entra ID en Azure Key Vault  
  - **OAuth 2.1 beveiliging**: Afstemming met laatste OAuth-beveiligingsbest practices bevestigd  
  - **OWASP-standaarden**: OWASP Top 10 voor LLM’s referenties zijn actueel  
  - **Azure-diensten**: Alle Microsoft Azure documentatielinks en best practices geverifieerd  
- **Standaardafstemming**: Alle gerefereerde beveiligingsstandaarden zijn actueel  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Security Best Practices  
  - Azure beveiligings- en compliancekaders  
- **Implementatiebronnen**: Alle implementatiegids links en bronnen gevalideerd  
  - Azure API Management authenticatiepatronen  
  - Microsoft Entra ID integratiehandleidingen  
  - Azure Key Vault geheimenbeheer  
  - DevSecOps pipelines en monitoringoplossingen

### Documentatie kwaliteitsborging  
- **Specificatie naleving**: Alle verplichte MCP beveiligingseisen (MUST/MUST NOT) afgestemd met nieuwste specificatie  
- **Bronnen actualiteit**: Alle externe links aan Microsoft documentatie, beveiligingsstandaarden en implementatiegidsen gecontroleerd  
- **Best practices dekking**: Volledige dekking van authenticatie, autorisatie, AI-specifieke bedreigingen, supply chain beveiliging en bedrijfspatronen bevestigd

## 6 oktober 2025

### Uitbreiding Getting Started Sectie – Geavanceerd Servergebruik & Eenvoudige authenticatie

#### Geavanceerd Servergebruik (03-GettingStarted/10-advanced)  
- **Nieuw hoofdstuk toegevoegd**: Uitgebreide gids geïntroduceerd over geavanceerd MCP servergebruik, met zowel reguliere als laag-niveau serverarchitecturen.
  - **Reguliere versus low-level server**: Gedetailleerde vergelijking en codevoorbeelden in Python en TypeScript voor beide benaderingen.
  - **Handler-gebaseerd ontwerp**: Uitleg over handler-gebaseerd beheer van tools/resources/prompts voor schaalbare, flexibele serverimplementaties.
  - **Praktische patronen**: Realistische scenario's waar low-level serverpatronen nuttig zijn voor geavanceerde functies en architectuur.

#### Eenvoudige authenticatie (03-GettingStarted/11-simple-auth)
- **Nieuw hoofdstuk toegevoegd**: Stapsgewijze gids voor het implementeren van eenvoudige authenticatie in MCP-servers.
  - **Authenticatieconcepten**: Helder uitleg over authenticatie versus autorisatie, en het omgaan met inloggegevens.
  - **Basisimplementatie van authenticatie**: Middleware-gebaseerde authenticatiepatronen in Python (Starlette) en TypeScript (Express), met codevoorbeelden.
  - **Vooruitgang naar geavanceerde beveiliging**: Richtlijnen om te starten met eenvoudige authenticatie en door te groeien naar OAuth 2.1 en RBAC, inclusief verwijzingen naar geavanceerde beveiligingsmodules.

Deze toevoegingen bieden praktische, hands-on begeleiding voor het bouwen van robuustere, veiligere en flexibelere MCP-serverimplementaties, waarbij fundamentele concepten worden verbonden met geavanceerde productiepatronen.

## 29 september 2025

### MCP Server Database-integratielabs - Uitgebreid praktijkleerpad

#### 11-MCPServerHandsOnLabs - Nieuwe complete database-integratie curriculum
- **Compleet 13-labs leerpad**: Toegevoegd uitgebreid praktijkcurriculum voor het bouwen van productieklare MCP-servers met PostgreSQL database-integratie
  - **Praktische implementatie**: Zava Retail analytics use case die enterprise-grade patronen laat zien
  - **Gestructureerde leerprogressie**:
    - **Labs 00-03: Basis** - Introductie, kernarchitectuur, beveiliging & multi-tenancy, omgeving opzetten
    - **Labs 04-06: MCP-server bouwen** - Databaseontwerp & schema, MCP-serverimplementatie, toolontwikkeling  
    - **Labs 07-09: Geavanceerde functies** - Semantische zoekintegratie, testen & debuggen, VS Code-integratie
    - **Labs 10-12: Productie & best practices** - Deploymentsstrategieën, monitoring & observability, best practices & optimalisatie
  - **Enterprise-technologieën**: FastMCP framework, PostgreSQL met pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Geavanceerde functies**: Row Level Security (RLS), semantische zoekopdrachten, multi-tenant toegangsbeheer, vector embeddings, real-time monitoring

#### Terminologie standaardisatie - Module naar lab conversie
- **Uitgebreide documentatie-update**: Alle README-bestanden in 11-MCPServerHandsOnLabs systematisch bijgewerkt om "Lab" terminologie te gebruiken in plaats van "Module"
  - **Sectiekoppen**: "Wat behandelt deze module" gewijzigd naar "Wat behandelt dit lab" in alle 13 labs
  - **Inhoudsbeschrijving**: "Deze module biedt..." veranderd naar "Dit lab biedt..." door de gehele documentatie
  - **Leerdoelen**: "Aan het einde van deze module..." aangepast naar "Aan het einde van dit lab..."
  - **Navigatielinks**: Alle verwijzingen "Module XX:" omgezet naar "Lab XX:" in kruisverwijzingen en navigatie
  - **Voltooiingstracking**: "Na het voltooien van deze module..." veranderd naar "Na het voltooien van dit lab..."
  - **Technische verwijzingen behouden**: Python moduleverwijzingen in configuratiebestanden (b.v. `"module": "mcp_server.main"`) ongewijzigd

#### Studiehandleiding verbetering (study_guide.md)
- **Visuele curriculumkaart**: Nieuwe sectie "11. Database Integration Labs" toegevoegd met uitgebreide visualisatie van lab-structuur
- **Repo-structuur**: Uitgebreid van tien naar elf hoofdsecties, inclusief gedetailleerde beschrijving van 11-MCPServerHandsOnLabs
- **Leerpadsrichting**: Verbeterde navigatie-instructies voor secties 00-11
- **Technologiedekking**: Toevoeging FastMCP, PostgreSQL, Azure services integratiedetails
- **Leeruitkomsten**: Benadrukt productieklare serverontwikkeling, database-integratiepatronen en enterprise beveiliging

#### Hoofd README-structuur verbetering
- **Lab-gebaseerde terminologie**: Hoofd README.md in 11-MCPServerHandsOnLabs consistent aangepast naar "Lab" structuur
- **Leerpadorganisatie**: Duidelijke progressie van basisconcepten via geavanceerde implementatie naar productie-deployment
- **Realistische focus**: Nadruk op praktijkgericht, hands-on leren met enterprise-grade patronen en technologieën

### Documentatie kwaliteit & consistentie verbeteringen
- **Hands-on leerbenadering**: Praktische lab-gebaseerde aanpak versterkt door gehele documentatie
- **Enterprise patronenfocus**: Productieklare implementaties en enterprise beveiliging prominent belicht
- **Technologie-integratie**: Uitgebreide coverage van moderne Azure diensten en AI-integratiepatronen
- **Leerprogressie**: Duidelijk gestructureerd pad van basisconcepten tot productie-deployment

## 26 september 2025

### Case Studies verbetering - GitHub MCP Registry Integratie

#### Case Studies (09-CaseStudy/) - Focus op ecosysteemontwikkeling
- **README.md**: Grote uitbreiding met uitgebreide GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Nieuwe uitgebreide case study over de lancering van GitHub's MCP Registry in september 2025
    - **Probleemanalyse**: Gedetailleerde analyse van gefragmenteerde MCP server ontdekking en deployment-uitdagingen
    - **Oplossingsarchitectuur**: GitHub’s gecentraliseerde registry aanpak met one-click VS Code installatie
    - **Zakelijke impact**: Meetbare verbeteringen in developer onboarding en productiviteit
    - **Strategische waarde**: Focus op modulaire agent deployment en tooloverstijgende interoperabiliteit
    - **Ecosysteemontwikkeling**: Positionering als fundamenteel platform voor agent-gebaseerde integratie
  - **Verbeterde case study structuur**: Alle zeven case studies bijgewerkt met uniforme opmaak en uitgebreide beschrijvingen
    - Azure AI Reisagenten: Multi-agent orchestratie nadruk
    - Azure DevOps Integratie: Workflow automatisering focus
    - Real-time document retrieval: Python console client implementatie
    - Interactieve studieplangenerator: Chainlit conversatie webapp
    - In-editor documentatie: VS Code en GitHub Copilot integratie
    - Azure API Management: Enterprise API-integratiepatronen
    - GitHub MCP Registry: Ecosysteemontwikkeling en community platform
  - **Uitgebreide conclusie**: Herschreven slotdeel met nadruk op zeven case studies over diverse MCP implementatiedimensies
    - Enterprise integratie, multi-agent orchestratie, developer productiviteit
    - Ecosysteemontwikkeling, educatieve toepassingen categorisatie
    - Aangedikte inzichten in architectuurpatronen, implementatiestrategieën en best practices
    - Benadrukt MCP als volwassen, productieklare protocol

#### Studiehandleiding updates (study_guide.md)
- **Visuele curriculumkaart**: Mindmap bijgewerkt met opname van GitHub MCP Registry in sectie Case Studies
- **Case studies beschrijving**: Uitgebreid van algemene beschrijvingen naar gedetailleerde opsplitsing van zeven uitgebreide case studies
- **Repo-structuur**: Sectie 10 bijgewerkt voor uitgebreide case study coverage met specifieke implementatiedetails
- **Changelog integratie**: 26 september 2025 toegevoegd ter documentatie van GitHub MCP Registry toevoeging en case study verbeteringen
- **Datumupdates**: Voetteksttimestamp bijgewerkt naar laatste revisiedatum (26 september 2025)

### Documentatie kwaliteitsverbeteringen
- **Consistentieverhoging**: Uniforme case study opmaak en structuur over alle zeven voorbeelden
- **Uitgebreide dekking**: Case studies bestrijken nu enterprise, developer productiviteit en ecosysteemontwikkelingsscenario's
- **Strategische positionering**: Verbeterde focus op MCP als fundamenteel platform voor agent-gebaseerde systeemdeployment
- **Resource-integratie**: Aanvullende resources geüpdatet met GitHub MCP Registry link

## 15 september 2025

### Uitbreiding geavanceerde onderwerpen - Aangepaste transporten & context engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Nieuwe geavanceerde implementatiegids
- **README.md**: Volledige implementatiegids voor aangepaste MCP transportmechanismen
  - **Azure Event Grid Transport**: Volledige serverless event-gedreven transportimplementatie
    - C#, TypeScript en Python voorbeelden met Azure Functions integratie
    - Event-gedreven architectuurpatronen voor schaalbare MCP-oplossingen
    - Webhook ontvangers en push-gebaseerde berichtverwerking
  - **Azure Event Hubs Transport**: High-throughput streaming transportimplementatie
    - Real-time streamingmogelijkheden voor lage-latentiescenario's
    - Partitioneringsstrategieën en checkpointbeheer
    - Berichtbundeling en prestatieoptimalisatie
  - **Enterprise integratiepatronen**: Productieklare architectuurvoorbeelden
    - Gedistribueerde MCP verwerking over meerdere Azure Functions
    - Hybride transportarchitecturen die verschillende transporttypes combineren
    - Berichtduurzaamheid, betrouwbaarheid en foutafhandelingsstrategieën
  - **Beveiliging & monitoring**: Azure Key Vault integratie en observability patronen
    - Managed identity authenticatie en minimale toegangsrechten
    - Application Insights telemetrie en prestatiemonitoring
    - Circuit breakers en fouttolerantiepatronen
  - **Testframeworks**: Omvattende teststrategieën voor aangepaste transporten
    - Unittests met test doubles en mocking frameworks
    - Integratietests met Azure Test Containers
    - Prestatie- en loadtestoverwegingen

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Opkomend AI-discipline
- **README.md**: Uitgebreide verkenning van context engineering als opkomend vakgebied
  - **Kernprincipes**: Volledige contextdeling, bewustzijn van beslissingen over acties, en beheer van contextvensters
  - **MCP protocol-afstemming**: Hoe MCP-ontwerp context engineering-uitdagingen adresseert
    - Beperkingen van contextvensters en progressieve laadstrategieën
    - Relevantiebepaling en dynamische contextopvraging
    - Multi-modale contextafhandeling en beveiligingsoverwegingen
  - **Implementatiebenaderingen**: Single-threaded versus multi-agent architecturen
    - Context chunking en prioriteringstechnieken
    - Progressief laden van context en compressiestrategieën
    - Gelaagde contextbenaderingen en retrievaloptimalisatie
  - **Meetkader**: Opkomende metrics voor effectiviteit van context
    - Inputefficiëntie, prestaties, kwaliteit en gebruikerservaringsoverwegingen
    - Experimentele benaderingen voor contextoptimalisatie
    - Faalanalyse en verbeteringsmethodologieën

#### Curriculum navigatie-updates (README.md)
- **Verbeterde modulestructuur**: Curriculumtabel bijgewerkt met nieuwe geavanceerde onderwerpen
  - Toegevoegd Context Engineering (5.14) en Custom Transport (5.15) onderdelen
  - Consistente opmaak en navigatielinks in alle modules
  - Beschrijvingen geüpdatet naar huidige inhoudsomvang

### Mappenstructuur verbeteringen
- **Naamgevingsstandaardisatie**: "mcp transport" hernoemd naar "mcp-transport" voor consistentie met andere geavanceerde onderwerpen folders
- **Inhoudsorganisatie**: Alle 05-AdvancedTopics mappen volgen nu consistente naamgevingspatroon (mcp-[topic])

### Documentatie kwaliteitsverbeteringen
- **MCP specificatie-afstemming**: Alle nieuwe inhoud verwijst naar MCP Specification 2025-06-18
- **Multi-taal voorbeelden**: Volledige codevoorbeelden in C#, TypeScript en Python
- **Enterprise focus**: Productieklare patronen en Azure cloud integratie doorlopend aanwezig
- **Visuele documentatie**: Mermaid diagrammen voor architectuur- en stroomsvisualisatie

## 18 augustus 2025

### Uitgebreide documentatie-update - MCP 2025-06-18 standaarden

#### MCP veiligheidsbest practices (02-Security/) - Volledige modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Volledige herziening afgestemd op MCP Specification 2025-06-18
  - **Verplichte eisen**: Toevoeging van expliciete MOET/MOET NIET vereisten uit officiële specificatie met duidelijke visuele indicatoren
  - **12 kern beveiligingspraktijken**: Omgebouwd van 15-puntenlijst naar uitgebreide beveiligingsdomeinen
    - Tokenbeveiliging & authenticatie met externe identity provider integratie
    - Sessiebeheer & transportbeveiliging met cryptografische vereisten
    - AI-specifieke dreigingsbescherming met Microsoft Prompt Shields integratie
    - Toegangscontrole & permissies met principe van minste privilege
    - Content veiligheid & monitoring met Azure Content Safety integratie
    - Supply chain beveiliging met uitgebreide componentverificatie
    - OAuth beveiliging & verwarringsaanvalpreventie met PKCE implementatie
    - Incident response & herstel met geautomatiseerde mogelijkheden
    - Compliance & governance met regelgeving naleving
    - Geavanceerde beveiligingscontroles met zero trust architectuur
    - Microsoft beveiliging ecosysteem integratie met complete oplossingen
    - Continue beveiliging evolutie met adaptieve benodigheden
  - **Microsoft beveiligingsoplossingen**: Verbeterde integratierichtlijnen voor Prompt Shields, Azure Content Safety, Entra ID en GitHub Advanced Security
  - **Implementatieressources**: Geclassificeerde uitgebreide resourcelinks per Officiële MCP documentatie, Microsoft beveiligingsoplossingen, beveiligingsstandaarden en implementatiehandleidingen

#### Geavanceerde beveiligingscontroles (02-Security/) - Enterprise-implementatie
- **MCP-SECURITY-CONTROLS-2025.md**: Volledige herschikking met enterprise-grade beveiligingskader
  - **9 uitgebreide beveiligingsdomeinen**: Uitgebreid van basale controles naar gedetailleerd enterprise kader
    - Geavanceerde authenticatie & autorisatie met Microsoft Entra ID integratie
    - Tokenbeveiliging & anti-passthrough controles met uitgebreide validatie
    - Sessiebeveiligingscontroles met hijacking preventie
    - AI-specifieke beveiligingscontroles met promptinjectie en toolvergiftiging preventie
    - Preventie van verwarringsaanvallen met OAuth proxy beveiliging
    - Tooluitvoeringsbeveiliging met sandboxing en isolatie
    - Supply chain beveiligingscontroles met afhankelijkheidsverificatie
    - Monitoring & detectiecontroles met SIEM integratie
    - Incident response & herstel met geautomatiseerde mogelijkheden
  - **Implementatievoorbeelden**: Toegevoegd gedetailleerde YAML configuratieblokken en codevoorbeelden
  - **Microsoft oplossingen integratie**: Uitgebreide dekking van Azure beveiligingsdiensten, GitHub Advanced Security en enterprise identiteitsbeheer

#### Beveiliging geavanceerde onderwerpen (05-AdvancedTopics/mcp-security/) - Productieklare implementatie
- **README.md**: Volledige herschrijving voor enterprise beveiligingsimplementatie
  - **Huidige specificatie-afstemming**: Bijgewerkt naar MCP Specification 2025-06-18 met verplichte beveiligingseisen
  - **Verbeterde authenticatie**: Microsoft Entra ID integratie met uitgebreide .NET en Java Spring Security voorbeelden
  - **AI beveiligingsintegratie**: Microsoft Prompt Shields en Azure Content Safety implementatie met gedetailleerde Python voorbeelden
  - **Geavanceerde dreigingsmitigatie**: Omvattende implementatievoorbeelden voor
    - Preventie van verwarringsaanvallen met PKCE en gebruikersconsent validatie
    - Token Passthrough preventie met audience validatie en veilig tokenbeheer
  - Voorkoming van sessiekapingen met cryptografische binding en gedragsanalyse
  - **Integratie van Enterprise Security**: Azure Application Insights monitoring, dreigingsdetectiepijplijnen en beveiliging van de toeleveringsketen
  - **Implementatie Checklist**: Duidelijke verplichte versus aanbevolen beveiligingscontroles met voordelen van het Microsoft beveiligingsecosysteem

### Kwaliteit van documentatie & afstemming op standaarden
- **Specificatieverwijzingen**: Alle verwijzingen geüpdatet naar huidige MCP-specificatie 2025-06-18
- **Microsoft beveiligingsecosysteem**: Verbeterde integratierichtlijnen door alle beveiligingsdocumentatie heen
- **Praktische implementatie**: Toegevoegd gedetailleerde codevoorbeelden in .NET, Java en Python met enterprise-patronen
- **Organisatie van bronnen**: Uitgebreide categorisatie van officiële documentatie, beveiligingsstandaarden en implementatiehandleidingen
- **Visuele indicatoren**: Duidelijke markering van verplichte eisen versus aanbevolen praktijken


#### Kernconcepten (01-CoreConcepts/) - Volledige modernisering
- **Protocolversie-update**: Bijgewerkt naar verwijzing naar huidige MCP-specificatie 2025-06-18 met datum-gebaseerde versie (YYYY-MM-DD-formaat)
- **Architectuurverfijning**: Verbeterde beschrijvingen van Hosts, Clients en Servers om huidige MCP-architectuurpatronen te weerspiegelen
  - Hosts nu duidelijk gedefinieerd als AI-applicaties die meerdere MCP-clientverbindingen coördineren
  - Clients beschreven als protocolverbindingen die één-op-één serverrelaties onderhouden
  - Servers verbeterd met lokale versus externe implementatiescenario’s
- **Herstructurering van primitieven**: Volledige herziening van server- en clientprimitieven
  - Serverprimitieven: Resources (gegevensbronnen), Prompts (sjablonen), Tools (uitvoerbare functies) met gedetailleerde uitleg én voorbeelden
  - Clientprimitieven: Sampling (LLM-voltooiingen), Elicitation (gebruikersinput), Logging (debuggen/monitoren)
  - Geüpdatet met huidige ontdekking (`*/list`), ophalen (`*/get`), en uitvoerings (`*/call`) methodpatronen
- **Protocolarchitectuur**: Ingevoerd tweelaags architectuurmodel
  - Datalayer: JSON-RPC 2.0 basis met levenscyclusbeheer en primitieven
  - Transportlaag: STDIO (lokaal) en Streamable HTTP met SSE (extern) transportmechanismen
- **Beveiligingsraamwerk**: Uitgebreide beveiligingsprincipes inclusief expliciete gebruikersconsent, gegevensprivacybescherming, veilige tooluitvoering en transportlaagbeveiliging
- **Communicatiepatronen**: Bijgewerkte protocolberichten tonen initialisatie-, ontdekking-, uitvoerings- en notificatiestromen
- **Codevoorbeelden**: Vernieuwde meertalige voorbeelden (.NET, Java, Python, JavaScript) die huidige MCP SDK-patronen weerspiegelen

#### Beveiliging (02-Security/) - Uitgebreide beveiligingsherziening  
- **Afstemming op standaarden**: Volledige afstemming met MCP-specificatie 2025-06-18 beveiligingseisen
- **Authenticatie-evolutie**: Gedocumenteerde evolutie van aangepaste OAuth-servers naar extern identity provider delegatie (Microsoft Entra ID)
- **Aan AI-gerelateerde dreigingsanalyse**: Uitgebreide dekking van moderne AI-aanvalvectoren
  - Gedetailleerde prompt-injectieaanvalscenario’s met praktijkvoorbeelden
  - Mechanismen voor toolvergiftiging en "rug pull"-aanvalpatronen
  - Contextvenstervergiftiging en modelverwarringaanvallen
- **Microsoft AI-beveiligingsoplossingen**: Uitgebreide dekking van Microsoft beveiligingsecosysteem
  - AI Prompt Shields met geavanceerde detectie-, spotlight- en delimiter-technieken
  - Azure Content Safety integratiepatronen
  - GitHub Advanced Security voor bescherming van de toeleveringsketen
- **Geavanceerde dreigingsmitigatie**: Gedetailleerde beveiligingscontroles voor
  - Sessiekapingen met MCP-specifieke aanvalsscenario’s en cryptografische sessie-ID-vereisten
  - Confused deputy-problemen in MCP-proxyscenario’s met expliciete toestemmingsvereisten
  - Token passthrough-kwetsbaarheden met verplichte validatiecontroles
- **Beveiliging van de toeleveringsketen**: Uitgebreide AI-toeleveringsketendekking inclusief foundationmodellen, embedservices, contextproviders en API’s van derden
- **Foundation-beveiliging**: Verbeterde integratie met enterprise beveiligingspatronen inclusief zero trust architectuur en Microsoft beveiligingsecosysteem
- **Organisatie van bronnen**: Categoriseerde uitgebreide resourcelinks op type (Officiële documentatie, Standaarden, Onderzoek, Microsoft-oplossingen, Implementatiehandleidingen)

### Verbeteringen in documentatiekwaliteit
- **Gestructureerde leerdoelen**: Verbeterde leerdoelen met specifieke, uitvoerbare resultaten
- **Kruisverwijzingen**: Toegevoegde links tussen gerelateerde beveiligings- en kernconceptonderwerpen
- **Huidige informatie**: Alle datumverwijzingen en specificatielinks geüpdatet naar actuele standaarden
- **Implementatierichtlijnen**: Toegevoegde specifieke, uitvoerbare implementatierichtlijnen door beide secties heen

## 16 juli 2025

### README en navigatieverbeteringen
- Volledig herontworpen curriculumnavigatie in README.md
- Vervanging van `<details>`-tags door beter toegankelijke tabelindeling
- Nieuwe alternatieve lay-outopties in map "alternative_layouts"
- Toegevoegd kaartgebaseerde, tabstijl- en accordionstijl navigatievoorbeelden
- Bijgewerkte sectie over de repositorystructuur met alle nieuwste bestanden
- Verbeterde sectie "Hoe gebruik je dit curriculum" met duidelijke aanbevelingen
- MCP-specificatielinks bijgewerkt naar correcte URL’s
- Context Engineering sectie (5.14) toegevoegd aan curriculumstructuur

### Updates studiegids
- Volledig herschreven studiegids om aan te sluiten op huidige repositorystructuur
- Nieuwe secties toegevoegd voor MCP Clients en Tools, en Populaire MCP Servers
- Visual Curriculum Map bijgewerkt om alle onderwerpen nauwkeurig weer te geven
- Uitgebreidere beschrijvingen van Gevorderde Onderwerpen om alle gespecialiseerde gebieden te omvatten
- Case Studies-sectie bijgewerkt met actuele voorbeelden
- Deze uitgebreide changelog toegevoegd

### Communitybijdragen (06-CommunityContributions/)
- Gedetailleerde informatie over MCP-servers voor beeldgeneratie toegevoegd
- Uitgebreide sectie toegevoegd over het gebruik van Claude in VSCode
- Cline terminal client installatie- en gebruiksinstructies toegevoegd
- MCP clientsectie bijgewerkt met alle populaire clientopties
- Bijgedragen voorbeelden met nauwkeurigere codevoorbeelden verbeterd

### Gevorderde onderwerpen (05-AdvancedTopics/)
- Alle gespecialiseerde onderwerpmappen georganiseerd met consistente naamgeving
- Materialen en voorbeelden context engineering toegevoegd
- Documentatie Foundry agent integratie toegevoegd
- Verbeterde Entra ID beveiligingsintegratie documentatie

## 11 juni 2025

### Initiële creatie
- Eerste versie van MCP for Beginners curriculum uitgebracht
- Basisstructuur gemaakt voor alle 10 hoofdsecties
- Visual Curriculum Map geïmplementeerd voor navigatie
- Initiële voorbeeldprojecten toegevoegd in meerdere programmeertalen

### Aan de slag (03-GettingStarted/)
- Eerste serverimplementatievoorbeelden gemaakt
- Richtlijnen voor clientontwikkeling toegevoegd
- Instructies voor integratie LLM client toegevoegd
- Documentatie voor VS Code integratie toegevoegd
- Server-Sent Events (SSE) servervoorbeelden geïmplementeerd

### Kernconcepten (01-CoreConcepts/)
- Gedetailleerde uitleg van client-serverarchitectuur toegevoegd
- Documentatie over kernprotocolcomponenten gemaakt
- Berichtenpatronen in MCP gedocumenteerd

## 23 mei 2025

### Repositorystructuur
- Repository gestart met basismappenstructuur
- README-bestanden gemaakt voor elke hoofdsectie
- Vertaalinfrastructuur opgezet
- Beeldmiddelen en diagrammen toegevoegd

### Documentatie
- Initiële README.md met cursusoverzicht aangemaakt
- CODE_OF_CONDUCT.md en SECURITY.md toegevoegd
- SUPPORT.md opgezet met hulpinstructies
- Voorlopige structuur studiegids gemaakt

## 15 april 2025

### Planning en raamwerk
- Initiële planning MCP for Beginners curriculum
- Leerdoelen en doelgroep gedefinieerd
- Structuur van 10 secties van het curriculum geschetst
- Conceptueel raamwerk ontwikkeld voor voorbeelden en casestudies
- Eerste prototypevoorbeelden voor kernconcepten gemaakt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->