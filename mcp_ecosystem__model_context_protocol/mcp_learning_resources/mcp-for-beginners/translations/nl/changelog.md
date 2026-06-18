# Changelog: MCP voor Beginners Curriculum

Dit document dient als een overzicht van alle belangrijke wijzigingen die zijn aangebracht in het Model Context Protocol (MCP) voor Beginners curriculum. Wijzigingen worden gedocumenteerd in omgekeerde chronologische volgorde (nieuwste wijzigingen eerst).

## 16 juni 2026

### MCP Specificatie Afstemming & Voorbeeldvalidatie

Het curriculum gevalideerd aan de hand van de huidige **MCP Specificatie 2025-11-25** en de nieuwste officiële SDK's, daarna de resterende verouderde specificatieverwijzingen gecorrigeerd en bevestigd dat de kernvoorbeelden nog steeds bouwen en draaien.

#### Correcties Specificatieversies (2025-06-18 / 2025-03-26 → 2025-11-25)

Engelse inhoud bijgewerkt waar nog werd beweerd dat een oudere specificatiewijziging de *huidige/laatste* standaard was, en links aangepast naar de canonieke `modelcontextprotocol.io` specificatiepaden:
- **05-AdvancedTopics/mcp-security/README.md**: Banner "Huidige Standaard", inleiding, kop kernveiligheidsprincipes, kop verplichte eisen, Microsoft Entra ID sectie, Referenties & Bronnen links, en afsluitende veiligheidsmelding (8 verwijzingen) bijgewerkt naar 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Link naar Extra Bronnen-spec en banner "Huidige Standaard" bijgewerkt naar 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Verouderde `2025-03-26` security-and-trust link vervangen door de actuele pagina over beveiligingsbest practices 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Officiële sampling documentatie link bijgewerkt naar 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Huidige tijd "huidige MCP-specificatie" verwijzing en link naar Extra Bronnen-spec bijgewerkt naar 2025-11-25 (historische SSE-afschaffingsnotities ongewijzigd voor nauwkeurigheid)

#### Validatie Voorbeelden Tegen Huidige SDK's

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` loste `@modelcontextprotocol/sdk@1.29.0` op; `tsc --noEmit` slaagde zonder typefouten — bestaande `McpServer`/`StdioServerTransport` API's blijven geldig
- **Python (03-GettingStarted/01-first-server/solution/python)**: Gevalideerd in een geïsoleerde `.venv` met `mcp[cli]` (1.27.2); `py_compile` geslaagd en `FastMCP.list_tools()` gaf correct de `add` en `subtract` tools terug
- Bevestigd dat alle voorbeeld `@modelcontextprotocol/sdk` versiebereiken (`>=1.26.0` / `^1.26.0` / `^1.27.0`) netjes oplossen naar de actuele `1.29.0` zonder brekende API-wijzigingen

#### Afstemming Dependency-versies (sluiting versiegaten)

Verouderde SDK-versies opgehoogd zodat elk voorbeeld de actuele MCP-release volgt, conform de repo-brede conventie:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk` opgehoogd van `^1.8.0` naar `>=1.26.0` en de verouderde `"updated for MCP 2025-06-18"` pakketbeschrijving gewijzigd naar `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** en **lab4/code/github_mcp_server/pyproject.toml**: Exacte pin `mcp==1.23.0` opgehoogd naar `mcp>=1.26.0`; beide `uv.lock` bestanden opnieuw gegenereerd (`uv lock`) zodat de lockfiles oplossen naar de actuele `mcp 1.27.2` en gesynchroniseerd blijven met de manifests

#### Analyse van Curriculumgaten — Laatste Spec Functie Dekking

Geverifieerd dat het curriculum al alle primitieve types omvat die zijn geïntroduceerd/uitgebreid in MCP 2025-11-25, dus geen inhoudelijke gaten meer:
- **Sampling**: Les 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitering (incl. URL modus)**: Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Gedocumenteerd in 00-Introduction, 01-CoreConcepts en 05-AdvancedTopics/mcp-root-contexts
- **Taken (experimenteel, langdurige operaties)**: Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotaties** (`readOnlyHint` / `destructiveHint`): Gedocumenteerd in 01-CoreConcepts en 05-AdvancedTopics/mcp-protocol-features

### Versterking Veiligheid & Herstel van Dependency Kwetsbaarheden

Volledige veiligheidscontrole uitgevoerd over elke dependency manifest en de voorbeeldbroncode, waarna alle gerapporteerde npm waarschuwingen en één code-gerelateerd probleem verholpen. Na herstel meldt `npm audit` **0 kwetsbaarheden** in iedere gecontroleerde map.

#### npm Dependency Kwetsbaarheden (transitief) — Verholpen

Alle 15 ingediende `package-lock.json` bestanden geaudit. Kwetsbaarheden waren beperkt tot transitieve dependencies van de MCP Inspector dev tool, de OpenAI client en de MCP SDK; alles is nu verholpen zonder de voorbeelden te breken:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** en **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` verhoogd (`0.16.6` / `0.14.1` → `0.22.0`), hiermee opgelost de gebundelde `ajv`, `brace-expansion`, `diff`, `path-to-regexp` en `ws` waarschuwingen. Toegevoegd een npm `overrides` regel die de gepatchte `shell-quote@1.8.4` afdwingt die de resterende kritische waarschuwing bij `concurrently` elimineert; beide lockfiles opnieuw gegenereerd (nu 0 kwetsbaarheden)
- **03-GettingStarted/samples/typescript**: `npm audit fix` heeft de transitieve `qs` (matig) geüpdatet naar een gepatchte release
- **03-GettingStarted/samples/javascript**: `npm audit fix` heeft de transitieve `hono` (matig) geüpdatet naar een gepatchte release
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` heeft de transitieve `form-data` (hoog) geüpdatet naar een gepatchte release
- **03-GettingStarted/11-simple-auth/solution/typescript**: Ontbrak `package-lock.json` gegenereerd zodat het project reproduceerbaar en auditbaar is (0 kwetsbaarheden)

#### Code-niveau Veiligheidsfix (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `shell=True` verwijderd uit de `open_in_vscode` tool. De eerdere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` liet shell metakarakters in een map-pad door `cmd.exe` interpreteren (command-injectie risico). Het opent nu het opgeloste `Code.exe` direct met de map als argument — geen shell — functioneel hetzelfde en veilig

#### Python Dependency Audit

- Elke Python requirements-set geaudit met `pip-audit`. `05-AdvancedTopics` en `03-GettingStarted/samples/python` rapporteerden **geen bekende kwetsbaarheden** (hun `mcp` / `httpx` / `pydantic` / `python-dotenv` versiebereiken lossen op naar actuele gepatchte releases)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` waarschuwde voor transitieve dependency **`werkzeug` 3.1.1** met drie `safe_join` Windows device-naam DoS waarschuwingen — `CVE-2025-66221`, `CVE-2026-21860` en `CVE-2026-27199` (alle drie opgelost in 3.1.6). Toegevoegd een expliciete beveiligingspin `werkzeug>=3.1.6` zodat de gepatchte release wordt gebruikt; geverifieerd dat de beperking netjes oplost met de `chainlit` / `mcp` / `semantic-kernel` stack

### Herbenoeming Productnaam

Alle curricula-inhoud bijgewerkt om de producthernoeming van Microsoft te weerspiegelen:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord community link bijgewerkt
- **AGENTS.md**: Discord server referentie aangepast
- **README.md**: Verwijzingen naar technologie-ecosysteem bijgewerkt
- **study_guide.md**: Casestudyverwijzingen bijgewerkt
- **05-AdvancedTopics/README.md**: Module 5.13 titel en beschrijving bijgewerkt
- **05-AdvancedTopics/mcp-integration/README.md**: Sectiekop en beschrijving bijgewerkt
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Volledige modultitel en inhoud geüpdatet
- **05-AdvancedTopics/mcp-security-entra/README.md**: Kruisverwijzing link bijgewerkt
- **07-LessonsfromEarlyAdoption/README.md**: Casestudyverwijzingen aangepast
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Sectie 9 kop, badges en capabilities bijgewerkt
- **08-BestPractices/README.md**: Discord community link aangepast
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord kanaalverwijzing aangepast
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Model deployment verwijzing aangepast
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI Services tabel bijgewerkt
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Resource verwijzingen bijgewerkt

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension voor VS Code
- **README.md**: Hoofdcurriculumverwijzingen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Modultitel, overzicht en alle modulekoppen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Titel, leerdoelen, setup-instructies en bronnen aangepast
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Titel, leerdoelen, MCP hosts tabel en kruisverwijzingen aangepast
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Titel, badges, vereisten en bronnen bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Verwijzingen naar Agent Builder en feedback link bijgewerkt
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Vereisten en extensiereferenties aangepast

---

## 11 april 2026

### Nieuwe Les, Documentatiefixes en Dependency Updates

#### Nieuwe Curriculuminhoud Toegevoegd

**Module 05 - Advanced Topics**
- **Les 5.17: Adversarial Multi-Agent Reasoning met MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nieuwe uitgebreide gids over het adversarial debatpatroon voor multi-agent systemen
  - Mermaid architectuurdiagram: twee agents → gedeelde MCP server → debat transcript → rechter → oordeel
  - Gedeelde MCP toolserver (`web_search` + `run_python`) geïmplementeerd in Python en TypeScript
  - Tegenstrijdige systeem prompts (VOOR / TEGEN / Rechter) met expliciete tool-gebruiksvereisten
  - Debat regisseur in Python, TypeScript en C# die rondes beheert en argumenten doorstuurt
  - MCP `ClientSession` bekabeling voor de regisseur naar echte tool-aanroepen
  - Use-case tabel (hallucinatie detectie, dreigingsmodellering, API design review, feitelijke verificatie, technologiekeuze)
  - Veiligheidsoverwegingen: sandboxed uitvoering, tool-aanroep validatie, rate limiting, audit logging
  - Gestructureerde oefening met drie praktische scenario's (code review, architectuurbeslissing, content moderatie)

#### Documentatiefixes

**Module 03 - Getting Started**
- **05-stdio-server/README.md**: TypeScript stdio server voorbeeld gecorrigeerd — ontbrak transportinstantiatie (`new StdioServerTransport()`) en `server.connect(transport)` opgeroepen om aan te sluiten op de Python en .NET voorbeelden in dezelfde sectie
- **14-sampling/README.md**: Typfout opgelost — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Curriculum Updates

**Hoofd README.md**
- Invoer 5.17 (Adversarial Multi-Agent Reasoning met MCP) toegevoegd aan de curriculumtabel met directe link naar de nieuwe les

**05-AdvancedTopics/README.md**
- Les 5.17 toegevoegd aan de lestabel

**study_guide.md**
- Adversarial Multi-Agent Reasoning onderwerp toegevoegd aan de mindmap en prozabeschrijving van Advanced Topics

#### Code en Veiligheidsfixes

**Module 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Veiligheidsfix — command injectie**: `execSync` shell interpolatie vervangen door `execFile` + `promisify` in de TypeScript `run_python` tool, waardoor het oppervlak voor command injectie verwijderd is (LLM-gestuurde code wordt nu als een letterlijk argv-element doorgegeven zonder shell betrokkene)
- **MCP-tool lus bedrading**: De Python debatorkestrator bijgewerkt om de `AsyncAnthropic` client te gebruiken (in plaats van de blokkerende synchrone `Anthropic`), een live `ClientSession` direct door te geven aan elke agentbeurt, tooldefinities op te halen via `session.list_tools()` elke beurt, en `tool_use` blokken te versturen via `session.call_tool()` in een lus totdat het model een definitieve tekstrespons genereert

#### Updates afhankelijkheden

- `hono` verhoogd naar 4.12.12 in meerdere pakketten (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` verhoogd van 1.19.11 naar 1.19.13 in TypeScript-pakketten
- `cryptography` verhoogd van 46.0.5 naar 46.0.7 in Python-pakketten (10-StreamliningAIWorkflows labs 3 en 4)
- `lodash` verhoogd van 4.17.23 naar 4.18.1 in 10-StreamliningAIWorkflows inspector

#### Vertalingen

- Vertalingen gesynchroniseerd voor 48+ talen met de laatste bronwijzigingen (i18n update)

---

## 5 februari 2026

### Repository-brede validatie en verbeteringen in navigatie

#### Nieuwe curriculuminhoud toegevoegd

**Module 03 - Aan de slag**
- **12-mcp-hosts/README.md**: Nieuwe uitgebreide gids voor het opzetten van MCP hosts
  - Configuratievoorbeelden Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-configuratietemplates voor alle grote hosts
  - Vergelijkingstabel transporttypes (stdio, SSE/HTTP, WebSocket)
  - Problemen met verbinding oplossen
  - Best practices beveiliging voor hostconfiguratie

- **13-mcp-inspector/README.md**: Nieuwe debuggids voor MCP Inspector
  - Installatiemethoden (npx, globale npm, vanuit bron)
  - Verbinding maken met servers via stdio en HTTP/SSE
  - Testtools, bronnen en prompt-workflows
  - VS Code-integratie met MCP Inspector
  - Veelvoorkomende debugscenario’s met oplossingen

**Module 04 - Praktische implementatie**
- **pagination/README.md**: Nieuwe gids voor paginering implementatie
  - Cursor-gebaseerde paginering patronen in Python, TypeScript, Java
  - Paginering aan de clientzijde afhandelen
  - Cursor ontwerpstrategieën (ondoorzichtig vs. gestructureerd)
  - Aanbevelingen voor prestatie-optimalisatie

**Module 05 - Gevorderde onderwerpen**
- **mcp-protocol-features/README.md**: Nieuwe diepgaande uitleg van protocolfuncties
  - Implementatie van voortgangsnotificaties
  - Patronen voor annuleren van verzoeken
  - Resource-templates met URI-patronen
  - Server lifecycle management
  - Logging niveau controle
  - Foutenafhandelingspatronen met JSON-RPC codes

#### Navigatiefouten opgelost (24+ bestanden bijgewerkt)

**Hoofdmodule README’s**  
Nu links naar zowel eerste les ALS volgende module bevatten

**02-Security subbestanden**  
Alle 5 aanvullende beveiligingsdocumenten hebben nu "What’s Next" navigatie:

**09-CaseStudy bestanden**  
Alle case study bestanden hebben nu sequentiële navigatie:

**10-StreamliningAI Labs**  
“What's Next” sectie toegevoegd aan Module 10 overzicht en Module 11

#### Code- en inhoudsverbeteringen

**SDK- en afhankelijkheidsupdates**  
Lege openai versie gerepareerd naar `^4.95.0`  
SDK bijgewerkt van `^1.8.0` naar `>=1.26.0`  
mcp versie vastzettingen bijgewerkt naar `>=1.26.0`

**Code-fixes**  
Ongeldig model `gpt-4o-mini` aangepast naar `gpt-4.1-mini`

**Inhoudsfixes**  
Gebraakte link `READMEmd` → `README.md` hersteld, curriculumkop `Module 1-3` → `Module 0-3` aangepast, hoofdlettergevoelige padcorrectie  
Beschadigde dubbele Case Study 5 inhoud verwijderd

**Verbeteringen voor beginners**  
Introductie, leerdoelen en vereisten voor beginners toegevoegd

#### Curriculumupdates

**Hoofd README.md**  
Invoer 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protocol Features) toegevoegd aan curriculumtabel

**Module README’s**  
Lessen 12 en 13 toegevoegd aan lessenlijst  
Sectie Praktische Gidsen met link paginering toegevoegd  
Lessen 5.15 (Custom Transport) en 5.16 (Protocol Features) toegevoegd

**study_guide.md**  
Mindmap bijgewerkt met alle nieuwe onderwerpen: MCP Hosts Setup, MCP Inspector, Paginering Strategieën, Protocol Functies Diepgaand

## 28 januari 2026

### MCP-specificatie 2025-11-25 compliance review

#### Kernconcepten-uitbreiding (01-CoreConcepts/)
- **Nieuwe clientprimitief - Roots**: Uitgebreide documentatie toegevoegd over de Roots clientprimitief, waarmee servers bestandssysteem-grenzen en toegangsrechten kunnen begrijpen
- **Tool annotaties**: Documentatie toegevoegd over tool gedrag annotaties (`readOnlyHint`, `destructiveHint`) voor betere beslissingen bij tooluitvoering
- **Tool-aanroepen bij Sampling**: Sampling documentatie aangepast om `tools` en `toolChoice` parameters op te nemen voor door model gestuurde toolaanroepen tijdens sampling verzoeken
- **URL Mode Elicitation**: Documentatie toegevoegd over URL-gebaseerde elicitation voor door server geïnitieerde externe webinteracties
- **Tasks (experimenteel)**: Nieuwe sectie toegevoegd met documentatie over experimentele Tasks-functie voor duurzame uitvoering wrappers en uitgestelde resultaatopvraging
- **Iconenondersteuning**: Opgemerkt dat tools, resources, resource templates en prompts nu iconen kunnen bevatten als aanvullende metadata

#### Documentatie-updates  
- **README.md**: MCP Specificatie 2025-11-25 versieverwijzing en uitleg over op datum gebaseerde versie toegevoegd  
- **study_guide.md**: Curriculumkaart bijgewerkt met Tasks en Tool Annotaties in de Kernconcepten sectie; documenttijdstempel geüpdatet

#### Specificatie compliantieverificatie  
- **Protocolversie**: Alle documentatie verwijst naar actuele MCP Specificatie 2025-11-25  
- **Architectuuraansluiting**: Bevestigde twee-laags architectuur (Data Layer + Transport Layer) documentatienauwkeurigheid  
- **Primitieven documentatie**: Serversprimitieven (Resources, Prompts, Tools) en clientprimitieven (Sampling, Elicitation, Logging, Roots) gevalideerd  
- **Transportmechanismen**: STDIO en Streamable HTTP transportdocumentatie geverifieerd  
- **Beveiligingsrichtlijnen**: Afstemming met actuele MCP Security Best Practices geverifieerd

#### Belangrijke MCP 2025-11-25 features gedocumenteerd  
- **OpenID Connect Discovery**: Auth server discovery via OIDC  
- **OAuth Client ID metadata-documenten**: Aanbevolen client-registratiemechanisme  
- **JSON Schema 2020-12**: Standaard dialect voor MCP schema-definities  
- **SDK tieringsysteem**: Geformaliseerde eisen voor SDK functionaliteitssteun en onderhoud  
- **Governance-structuur**: Geformaliseerde werkgroepen en belangengroepen in MCP governance

### Grote update beveiligingsdocumentatie (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integratie  
- **Nieuwe hands-on trainingsbron**: Uitgebreide integratie met de [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) door alle beveiligingsdocumentatie  
- **Expeditieroute-dekking**: Documentatie van complete route van Base Camp tot Summit  
- **OWASP-afstemming**: Alle beveiligingsrichtlijnen gekoppeld aan OWASP MCP Azure Security Guide risico’s

#### OWASP MCP Top 10 integratie  
- **Nieuwe sectie**: OWASP MCP Top 10 Risicotabel met Azure mitigaties toegevoegd aan hoofd Security README  
- **Risicogebaseerde documentatie**: `mcp-security-controls-2025.md` geüpdatet met OWASP MCP risicoverwijzingen per beveiligingsdomein  
- **Referentiearchitectuur**: Verwijzingen naar OWASP MCP Azure Security Guide architectuur en implementatiepatronen toegevoegd

#### Bijgewerkte beveiligingsbestanden  
- **README.md**: Sherpa Workshop overzicht, expeditieroutetabel, OWASP MCP Top 10 risicosamenvatting en hands-on training sectie toegevoegd  
- **mcp-security-controls-2025.md**: Header bijgewerkt naar februari 2026, OWASP risicoverwijzingen (MCP01-MCP08) toegevoegd, specificatieversie inconsistentie hersteld  
- **mcp-security-best-practices-2025.md**: Sherpa en OWASP bronnen sectie toegevoegd, tijdstempel geüpdatet  
- **mcp-best-practices.md**: Hands-on trainingssectie met Sherpa en OWASP links toegevoegd  
- **azure-content-safety-implementation.md**: OWASP MCP06 verwijzing, Sherpa Camp 3 afstemming en aanvullende bronnen toegevoegd

#### Nieuwe bronnenlinks toegevoegd  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuele OWASP MCP risicopagina’s (MCP01-MCP10)

### Curriculum-brede MCP Specificatie 2025-11-25 afstemming

#### Module 03 - Aan de slag  
- **SDK-documentatie**: Go SDK toegevoegd aan officiële SDK-lijst; alle SDK-verwijzingen geüpdatet naar MCP Specificatie 2025-11-25  
- **Transport verduidelijking**: Beschrijvingen van STDIO en HTTP Streaming transporten geüpdatet met expliciete specificatieverwijzingen

#### Module 04 - Praktische implementatie  
- **SDK-updates**: Go SDK toegevoegd; SDK-lijst bijgewerkt met specificatieversieverwijzing  
- **Autorisatiespecificatie**: MCP Authorization specificatielink geüpdatet naar huidige 2025-11-25 versie

#### Module 05 - Geavanceerde onderwerpen  
- **Nieuwe functies**: Notitie toegevoegd over nieuwe MCP Specificatie 2025-11-25 functies (Tasks, Tool Annotaties, URL Mode Elicitation, Roots)  
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop links toegevoegd aan aanvullende referenties

#### Module 06 - Community bijdragen  
- **SDK-lijst**: Swift en Rust SDK’s toegevoegd; specificatielink geüpdatet naar 2025-11-25  
- **Spec-verwijzing**: MCP Specificatie link geüpdatet naar directe specificatie-URL

#### Module 07 - Lessen van vroege adoptie  
- **Resource-updates**: MCP Specificatie 2025-11-25 link en OWASP MCP Top 10 toegevoegd aan aanvullende bronnen

#### Module 08 - Best practices  
- **Spec-versie**: MCP Specificatie referentie geüpdatet naar 2025-11-25  
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop toegevoegd aan aanvullende referenties

#### Module 10 - AI Workflows stroomlijnen  
- **Badge-update**: MCP versiebadge gewijzigd van SDK-versie (1.9.3) naar specificatieversie (2025-11-25)  
- **Bronlinks**: MCP Specificatie link geüpdatet; OWASP MCP Top 10 toegevoegd

#### Module 11 - MCP Server hands-on labs  
- **Spec-verwijzing**: MCP Specificatie link geüpdatet naar versie 2025-11-25  
- **Beveiligingsbronnen**: OWASP MCP Top 10 toegevoegd aan officiële bronnen

## 18 december 2025

### Update beveiligingsdocumentatie - MCP Specificatie 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specificatieversie update  
- **Protocolversie update**: Verwezen naar nieuwste MCP Specificatie 2025-11-25 (uitgebracht 25 november 2025)  
  - Alle versieverwijzingen aangepast van 2025-06-18 naar 2025-11-25  
  - Documentdatum aangepast van 18 augustus 2025 naar 18 december 2025  
  - Alle specificatie-URL’s geverifieerd als actueel  
- **Inhoudvalidatie**: Uitgebreide validatie van beveiligingsbest practices tegen actuele standaarden  
  - **Microsoft Security Solutions**: Huidige terminologie en links gecontroleerd voor Prompt Shields (voorheen "Jailbreak risico detectie"), Azure Content Safety, Microsoft Entra ID en Azure Key Vault  
  - **OAuth 2.1 beveiliging**: Afstemming op nieuwste OAuth beveiligingsbest practices bevestigd  
  - **OWASP-standaarden**: OWASP Top 10 voor LLMs referenties geverifieerd als actueel  
  - **Azure services**: Alle Microsoft Azure documentatielinks en best practices geverifieerd  
- **Standaardafstemming**: Alle genoemde beveiligingsstandaarden als actueel bevestigd  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Security Best Practices  
  - Azure beveiligings- en complianceframeworks  
- **Implementatiebronnen**: Alle implementatiegidslinks en resources gecontroleerd  
  - Azure API Management authenticatiepatronen  
  - Microsoft Entra ID integratiehandleidingen  
  - Azure Key Vault geheimenbeheer  
  - DevSecOps pipelines en monitoringoplossingen

### Kwaliteitsborging documentatie  
- **Specificatie compliance**: Alle verplichte MCP beveiligingseisen (MUST/MUST NOT) zijn in overeenstemming met de nieuwste specificatie  
- **Broncurrency**: Alle externe links naar Microsoft documentatie, beveiligingsstandaarden en implementatiegidsen geverifieerd  
- **Best practices dekking**: Uitgebreide dekking van authenticatie, autorisatie, LLM-specifieke bedreigingen, supply chain beveiliging en enterprisepatronen bevestigd

## 6 oktober 2025

### Uitbreiding Getting Started sectie – Geavanceerd servergebruik & eenvoudige authenticatie

#### Geavanceerd servergebruik (03-GettingStarted/10-advanced)  
- **Nieuw hoofdstuk toegevoegd**: Uitgebreide gids geïntroduceerd voor geavanceerd MCP-servergebruik, met reguliere en laag-niveau serverarchitecturen  
  - **Reguliere vs. laag-niveau server**: Gedetailleerde vergelijking en codevoorbeelden in Python en TypeScript voor beide benaderingen  
  - **Handler-gebaseerd ontwerp**: Uitleg over handler-gebaseerde tool/resource/prompt beheer voor schaalbare, flexibele serverimplementaties  
  - **Praktische patronen**: Scenario’s uit de praktijk waarbij laag-niveau serverpatronen voordelen bieden voor geavanceerde functies en architectuur
#### Eenvoudige authenticatie (03-GettingStarted/11-simple-auth)
- **Nieuw hoofdstuk toegevoegd**: Stapsgewijze handleiding voor het implementeren van eenvoudige authenticatie in MCP-servers.
  - **Authenticatieconcepten**: Duidelijke uitleg over authenticatie versus autorisatie en het omgaan met referenties.
  - **Basisimplementatie authenticatie**: Middleware-gebaseerde authenticatiepatronen in Python (Starlette) en TypeScript (Express), met codevoorbeelden.
  - **Doorontwikkeling naar geavanceerde beveiliging**: Richtlijnen voor het starten met eenvoudige authenticatie en doorgroeien naar OAuth 2.1 en RBAC, met verwijzingen naar geavanceerde beveiligingsmodules.

Deze aanvullingen bieden praktische, hands-on begeleiding voor het bouwen van robuustere, veiligere en flexibelere MCP-serverimplementaties, die fundamentele concepten verbinden met geavanceerde productiemethoden.

## 29 september 2025

### MCP Server Database Integratie Labs - Uitgebreid Praktisch Leertraject

#### 11-MCPServerHandsOnLabs - Nieuwe complete database-integratie cursus
- **Complete leerroute van 13 labs**: Toegevoegd uitgebreid praktijkgerichte cursus voor het bouwen van productieklare MCP-servers met PostgreSQL-database-integratie
  - **Implementatie uit de praktijk**: Zava Retail analytics use case die enterprise-grade patronen demonstreert
  - **Gestructureerde leerprogressie**:
    - **Labs 00-03: Funderingen** - Introductie, kernarchitectuur, beveiliging & multi-tenancy, omgevingssetup
    - **Labs 04-06: Bouwen van de MCP-server** - Databaseontwerp & schema, MCP-serverimplementatie, toolontwikkeling  
    - **Labs 07-09: Geavanceerde functies** - Semantische zoekintegratie, testen & debuggen, VS Code-integratie
    - **Labs 10-12: Productie & best practices** - Deploymentstrategieën, monitoring & observeerbaarheid, best practices & optimalisatie
  - **Enterprise technologieën**: FastMCP-framework, PostgreSQL met pgvector, Azure OpenAI-embedings, Azure Container Apps, Application Insights
  - **Geavanceerde functies**: Row Level Security (RLS), semantische zoekfunctie, multi-tenant data toegang, vector embeddings, realtime monitoring

#### Terminologiestandaardisatie - Module naar Lab conversie
- **Uitgebreide documentatie-update**: Systematische aanpassing van alle README-bestanden in 11-MCPServerHandsOnLabs naar het gebruik van de term "Lab" in plaats van "Module"
  - **Sectiekoppen**: "Wat deze module behandelt" aangepast naar "Wat dit lab behandelt" in alle 13 labs
  - **Inhoudsbeschrijving**: "Deze module biedt..." gewijzigd in "Dit lab biedt..." door de hele documentatie
  - **Leerdoelen**: "Aan het einde van deze module..." gewijzigd in "Aan het einde van dit lab..."
  - **Navigatielinks**: Alle verwijzingen "Module XX:" omgezet naar "Lab XX:" in kruisverwijzingen en navigatie
  - **Volgtracking**: "Na het afronden van deze module..." aangepast naar "Na het afronden van dit lab..."
  - **Technische referenties behouden**: Python-moduleverwijzingen in configuratiebestanden onveranderd gelaten (bijv. `"module": "mcp_server.main"`)

#### Studiegidsverbetering (study_guide.md)
- **Visuele curriculumkaart**: Nieuw onderdeel "11. Database Integratie Labs" toegevoegd met uitgebreide labstructuurvisualisatie
- **Repositorystructuur**: Aantal hoofdsecties uitgebreid van tien naar elf met gedetailleerde beschrijving van 11-MCPServerHandsOnLabs
- **Leerroute begeleiding**: Navigatie-instructies uitgebreid om secties 00-11 te omvatten
- **Technologiedekking**: Toevoeging van FastMCP, PostgreSQL, Azure-diensten integratie details
- **Leerresultaten**: Uitgelicht productieklare serverontwikkeling, database-integratiepatronen en enterprise beveiliging

#### Hoofd README structuurverbetering
- **Lab-gebaseerde terminologie**: Hoofd README.md in 11-MCPServerHandsOnLabs consequent aangepast naar "Lab" structuur
- **Leerrouteorganisatie**: Duidelijke progressie van fundamentele concepten via geavanceerde implementatie naar productie-implementatie
- **Focus op de praktijk**: Benadrukking van praktisch, hands-on leren met enterprise-grade patronen en technologieën

### Documentatiekwaliteit & consistentieverbeteringen
- **Nadruk op praktijkgericht leren**: Versterkte praktijkgerichte lab-aanpak door de hele documentatie
- **Enterprise patronen focus**: Benadrukte productieklare implementaties en enterprise beveiligingsoverwegingen
- **Technologie-integratie**: Uitgebreide dekking van moderne Azure-diensten en AI-integratiepatronen
- **Leerprogressie**: Duidelijk gestructureerd traject van basisconcepten tot productie-implementatie

## 26 september 2025

### Case Studies Uitbreiding - GitHub MCP Registry Integratie

#### Case Studies (09-CaseStudy/) - Focus op ecosysteemontwikkeling
- **README.md**: Grote uitbreiding met uitgebreide GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Nieuwe uitgebreide case study over de lancering van GitHub’s MCP Registry in september 2025
    - **Probleemanalyse**: Gedetailleerde analyse van gefragmenteerde MCP-server ontdekking en implementatie-uitdagingen
    - **Oplossingsarchitectuur**: GitHub's gecentraliseerde registry-benadering met één-klik VS Code installatie
    - **Zakelijke impact**: Meetbare verbeteringen in developer onboarding en productiviteit
    - **Strategische waarde**: Focus op modulaire agent-deployment en interoperabiliteit tussen tools
    - **Ecosysteemontwikkeling**: Positionering als fundamenteel platform voor agentische integratie
  - **Verbeterde case study structuur**: Alle zeven case studies bijgewerkt met consistente opmaak en uitgebreide beschrijvingen
    - Azure AI Travel Agents: nadruk op multi-agent orchestratie
    - Azure DevOps Integratie: workflow automatisering focus
    - Realtime documentatie ophalen: Python console client implementatie
    - Interactieve studieplangenerator: Chainlit conversational web app
    - Documentatie in editor: VS Code en GitHub Copilot integratie
    - Azure API Management: enterprise API-integratiepatronen
    - GitHub MCP Registry: ecosysteemontwikkeling en communityplatform
  - **Uitgebreide conclusie**: Herschreven slotsectie met nadruk op zeven case studies over diverse MCP-implementatiedimensies
    - Enterprise integratie, multi-agent orchestratie, developer productiviteit
    - Ecosysteemontwikkeling, onderwijstoepassingen categorisering
    - Versterkte inzichten in architectuurpatronen, implementatiestrategieën en best practices
    - Nadruk op MCP als volwassen, productieklare protocol

#### Studiegids-updates (study_guide.md)
- **Visuele curriculumkaart**: Mindmap bijgewerkt met GitHub MCP Registry in Case Studies sectie
- **Case studies beschrijving**: Uitgebreide details toegevoegd over zeven grondige case studies
- **Repositorystructuur**: Sectie 10 aangepast om case study dekking met specifieke implementaties te reflecteren
- **Changelog integratie**: Invoer voor 26 september 2025 toegevoegd met documentatie over GitHub MCP Registry toevoeging en case study verbeteringen
- **Datumupdates**: Footer timestamp bijgewerkt naar laatste revisiedatum (26 september 2025)

### Documentatiekwaliteitsverbeteringen
- **Consistentieverbetering**: Case study opmaak en structuur genormaliseerd over alle zeven voorbeelden
- **Omvattende dekking**: Case studies bestrijken nu enterprise, developer productiviteit en ecosysteemontwikkelingsscenario’s
- **Strategische positionering**: Versterkte focus op MCP als fundamenteel platform voor agentische systeemimplementatie
- **Bronintegratie**: Toegevoegde aanvullende bronnen met GitHub MCP Registry link

## 15 september 2025

### Uitbreiding geavanceerde onderwerpen - Custom transports & context engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Nieuwe geavanceerde implementatiehandleiding
- **README.md**: Volledige implementatiehandleiding voor aangepaste MCP-transports
  - **Azure Event Grid Transport**: Uitgebreide serverless event-gedreven transportimplementatie
    - C#, TypeScript, en Python voorbeelden met Azure Functions integratie
    - Event-gedreven architectuurpatronen voor schaalbare MCP-oplossingen
    - Webhook-ontvangers en push-gebaseerde berichtverwerking
  - **Azure Event Hubs Transport**: Hoogdoorvoers streaming transportimplementatie
    - Real-time streaming mogelijkheden voor lage latentie scenario’s
    - Partitioneringsstrategieën en checkpointbeheer
    - Batchverwerking en prestatieoptimalisatie
  - **Enterprise integratiepatronen**: Productieklare architecturale voorbeelden
    - Gedistribueerde MCP-verwerking over meerdere Azure Functions
    - Hybride transportarchitecturen die meerdere transporttypen combineren
    - Berichtenduurzaamheid, betrouwbaarheid en foutafhandelingsstrategieën
  - **Beveiliging & monitoring**: Azure Key Vault integratie en observeerbaarheidspatronen
    - Managed identity authenticatie en least privilege toegang
    - Application Insights telemetrie en prestatiemonitoring
    - Circuit breakers en fouttolerantiepatronen
  - **Testframeworks**: Volledige teststrategieën voor aangepaste transports
    - Unittesten met testen dubbels en mocking frameworks
    - Integratietesten met Azure Test Containers
    - Prestatie- en loadtestoverwegingen

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Opkomende AI-discipline
- **README.md**: Uitgebreide verkenning van context engineering als opkomend vakgebied
  - **Kernprincipes**: Volledige contextdeling, bewustzijn over actiebeslissingen, en contextwindowbeheer
  - **MCP-protocol afstemming**: Hoe MCP-design uitdagingen in context engineering adresseert
    - Beperkingen van contextwindow en progressieve laadstrategieën
    - Relevantiebepaling en dynamische contextopvraging
    - Multimodale contextual handling en beveiligingsoverwegingen
  - **Implementatieaanpakken**: Single-threaded versus multi-agent architecturen
    - Context chunking en prioriteringstechnieken
    - Progressieve contextlading en compressiestrategieën
    - Gelaagde contextual benaderingen en retrieval optimalisatie
  - **Meetkader**: Opkomende metrics voor evaluatie van context effectiviteit
    - Inputefficiëntie, prestaties, kwaliteit en gebruikerservaringsoverwegingen
    - Experimentele benaderingen voor contextoptimalisatie
    - Analyse van mislukkingen en verbeteringsmethodieken

#### Curriculum navigatie-updates (README.md)
- **Verbeterde modulestructuur**: Curriculumtabel bijgewerkt met nieuwe geavanceerde onderwerpen
  - Toevoeging van Context Engineering (5.14) en Custom Transport (5.15)
  - Consistente opmaak en navigatielinks voor alle modules
  - Bijgewerkte beschrijvingen die huidige inhoudsomvang reflecteren

### Verbeteringen directorystructuur
- **Naamgeving gestandaardiseerd**: "mcp transport" hernoemd naar "mcp-transport" voor consistentie met andere mappen over geavanceerde onderwerpen
- **Inhoudsorganisatie**: Alle 05-AdvancedTopics mappen volgen nu consistente naamgevingsconventie (mcp-[onderwerp])

### Verbeteringen documentatiekwaliteit
- **MCP-specificatie afstemming**: Alle nieuwe inhoud verwijst naar MCP-specificatie 2025-06-18
- **Meertalige voorbeelden**: Volledige codevoorbeelden in C#, TypeScript en Python
- **Enterprise focus**: Productieklare patronen en integratie met Azure-cloud doorlopend
- **Visuele documentatie**: Mermaid diagrammen voor architectuur- en flowvisualisatie

## 18 augustus 2025

### Uitgebreide documentatie-update - MCP 2025-06-18 standaarden

#### MCP Security Best Practices (02-Security/) - Volledige modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Volledige herschrijving afgestemd op MCP-specificatie 2025-06-18
  - **Verplichte eisen**: Toegevoegd expliciete MOET/MAG NIET eisen uit officiële specificatie met duidelijke visuele indicatoren
  - **12 kernbeveiligingspraktijken**: Herschikt van 15-puntenlijst naar uitgebreide beveiligingsdomeinen
    - Tokenbeveiliging & authenticatie met integratie van externe identiteitsprovider
    - Sessiebeheer & transportbeveiliging met cryptografische vereisten
    - AI-specifieke dreigingsbescherming met Microsoft Prompt Shields integratie
    - Toegangscontrole & permissies met principe van minste rechten
    - Contentveiligheid & monitoring met Azure Content Safety integratie
    - Supply chain beveiliging met uitgebreide componentverificatie
    - OAuth beveiliging & confused deputy preventie met PKCE-implementatie
    - Incidentrespons & herstel met geautomatiseerde mogelijkheden
    - Compliance & governance met regelgevingafstemming
    - Geavanceerde beveiligingscontroles met zero trust architectuur
    - Microsoft veiligheidsecosysteem integratie met uitgebreide oplossingen
    - Continue veiligheidsevolutie met adaptieve praktijken
  - **Microsoft beveiligingsoplossingen**: Verbeterde integratierichtlijnen voor Prompt Shields, Azure Content Safety, Entra ID en GitHub Advanced Security
  - **Implementatieressources**: Gecategoriseerde uitgebreide linkverzamelingen onder officiële MCP-documentatie, Microsoft beveiligingsoplossingen, beveiligingsstandaarden en implementatiehandleidingen

#### Geavanceerde beveiligingscontroles (02-Security/) - Enterprise-implementatie
- **MCP-SECURITY-CONTROLS-2025.md**: Volledige herziening met enterprise-grade beveiligingskader
  - **9 uitgebreide beveiligingsdomeinen**: Uitgebreid van basiscontroles naar gedetailleerd enterprisekader
    - Geavanceerde authenticatie & autorisatie met Microsoft Entra ID integratie
    - Tokenbeveiliging & anti-passthrough-controles met uitgebreide validatie
    - Sessie beveiligingscontroles met bescherming tegen overname
    - AI-specifieke beveiligingscontroles met preventie van prompt injectie en toolvergiftiging
    - Preventie van confused deputy attacks met OAuth proxybeveiliging
    - Tooluitvoeringsbeveiliging met sandboxing en isolatie
    - Supply chain beveiligingscontroles met afhankelijkheidsverificatie
    - Monitoring & detectiecontroles met SIEM integratie
    - Incidentrespons & herstel met geautomatiseerde mogelijkheden
  - **Implementatievoorbeelden**: Toegevoegd gedetailleerde YAML-configuratieblokken en codevoorbeelden
  - **Microsoft oplossingen integratie**: Uitgebreide dekking van Azure beveiligingsdiensten, GitHub Advanced Security en enterprise identiteitsbeheer

#### Geavanceerde onderwerpen beveiliging (05-AdvancedTopics/mcp-security/) - Productieklare implementatie
- **README.md**: Volledige herschrijving voor enterprise beveiligingsimplementatie
  - **Afstemming op actuele specificatie**: Bijgewerkt naar MCP-specificatie 2025-06-18 met verplichte beveiligingseisen
  - **Verbeterde authenticatie**: Microsoft Entra ID integratie met uitgebreide .NET en Java Spring Security voorbeelden
  - **AI-beveiligingsintegratie**: Microsoft Prompt Shields en Azure Content Safety implementatie met gedetailleerde Python voorbeelden
  - **Geavanceerde dreigingsmitigatie**: Uitgebreide implementatievoorbeelden voor
    - Preventie confused deputy attacks met PKCE en gebruikersconsentvalidatie
    - Token passthrough preventie met audience validatie en veilige tokenbeheer
    - Sessie hijacking preventie met cryptografische binding en gedragsanalyse
  - **Enterprise beveiligingsintegratie**: Azure Application Insights monitoring, dreigingsdetectie pipelines en supply chain beveiliging
  - **Implementatiechecklist**: Duidelijke verplichte versus aanbevolen beveiligingscontroles met Microsoft beveiligingsecosysteem voordelen

### Documentatiekwaliteit & standaardenafstemming
- **Specificatie Verwijzingen**: Alle verwijzingen bijgewerkt naar de huidige MCP Specificatie 2025-06-18
- **Microsoft Security Ecosysteem**: Verbeterde integratierichtlijnen door de hele beveiligingsdocumentatie heen
- **Praktische Implementatie**: Gedetailleerde codevoorbeelden toegevoegd in .NET, Java en Python met enterprise patronen
- **Bronnenorganisatie**: Uitgebreide categorisatie van officiële documentatie, beveiligingsstandaarden en implementatiehandleidingen
- **Visuele Indicatoren**: Duidelijke markering van verplichte vereisten versus aanbevolen praktijken


#### Kernconcepten (01-CoreConcepts/) - Complete Modernisering
- **Protocolversie Update**: Bijgewerkt om te verwijzen naar huidige MCP Specificatie 2025-06-18 met datumgebaseerde versie (YYYY-MM-DD formaat)
- **Architectuur Aanpassing**: Verbeterde beschrijvingen van Hosts, Clients en Servers om huidige MCP architectuurpatronen weer te geven
  - Hosts nu duidelijk gedefinieerd als AI-toepassingen die meerdere MCP-clientverbindingen coördineren
  - Clients beschreven als protocol connectors die één-op-één serverrelaties onderhouden
  - Servers uitgebreid met lokale versus remote implementatiescenario's
- **Primitives Herstructurering**: Complete herziening van server- en clientprimitives
  - Server Primitives: Resources (gegevensbronnen), Prompts (sjablonen), Tools (uitvoerbare functies) met gedetailleerde uitleg en voorbeelden
  - Client Primitives: Sampling (LLM-completions), Elicitation (gebruikersinput), Logging (debuggen/monitoring)
  - Bijgewerkt met actuele discover (`*/list`), retrieval (`*/get`), en execution (`*/call`) methodepatronen
- **Protocolarchitectuur**: Invoering van tweelaags architectuurmodel
  - Data Layer: JSON-RPC 2.0 fundament met lifecycle management en primitives
  - Transport Layer: STDIO (lokaal) en Streamable HTTP met SSE (remote) transportmechanismen
- **Beveiligingskader**: Uitgebreide beveiligingsprincipes inclusief expliciete gebruikersconsent, bescherming van dataprivacy, veiligheid van tooluitvoering en vervoerslaagbeveiliging
- **Communicatiepatronen**: Bijgewerkte protocolberichten die initialisatie, ontdekking, uitvoering en notificatiestromen tonen
- **Codevoorbeelden**: Vernieuwde meertalige voorbeelden (.NET, Java, Python, JavaScript) om huidige MCP SDK-patronen te weerspiegelen

#### Beveiliging (02-Security/) - Uitgebreide Beveiligingsherziening  
- **Normenafstemming**: Volledige afstemming op MCP Specificatie 2025-06-18 beveiligingseisen
- **Authenticatie Evolutie**: Documentatie van evolutie van aangepaste OAuth-servers naar externe identity provider delegatie (Microsoft Entra ID)
- **AI-Specifieke Dreigingsanalyse**: Verbeterde dekking van moderne AI-aanvalsvektoren
  - Gedetailleerde prompt-injectie aanvalsscenario's met praktijkvoorbeelden
  - Toolvergiftigingsmechanismen en "rug pull" aanvalspatronen
  - Contextvenstervergiftiging en modelverwarringaanvallen
- **Microsoft AI Beveiligingsoplossingen**: Uitgebreide dekking van Microsoft beveiligingsecosysteem
  - AI Prompt Shields met geavanceerde detectie-, spotlight- en delimiter technieken
  - Azure Content Safety integratiepatronen
  - GitHub Advanced Security voor beveiliging van de supply chain
- **Geavanceerde Dreigingsmitigatie**: Gedetailleerde beveiligingscontroles voor
  - Session hijacking met MCP-specifieke aanvalsscenario's en cryptografische sessie-ID eisen
  - Confused deputy problemen in MCP proxy scenario's met expliciete consent vereisten
  - Token passthrough kwetsbaarheden met verplichte validatiecontroles
- **Supply Chain Beveiliging**: Uitgebreide AI supply chain dekking inclusief foundation models, embeddings diensten, contextproviders en third-party API's
- **Foundation Security**: Verbeterde integratie met enterprise beveiligingspatronen inclusief zero trust architectuur en Microsoft beveiligingsecosysteem
- **Bronnenorganisatie**: Gecategoriseerde uitgebreide bronlinks per type (Officiële Documentatie, Normen, Onderzoek, Microsoft Oplossingen, Implementatiehandleidingen)

### Verbeteringen Documentatiekwaliteit
- **Gestructureerde Leerdoelen**: Verbeterde leerdoelen met specifieke, actiegerichte uitkomsten 
- **Kruisverwijzingen**: Links toegevoegd tussen gerelateerde beveiligings- en kernconceptonderwerpen
- **Actuele Informatie**: Alle datumverwijzingen en specificatielinks bijgewerkt naar huidige normen
- **Implementatierichtlijnen**: Specifieke, actiegerichte implementatie-instructies toegevoegd door beide secties heen

## 16 juli 2025

### README en Navigatieverbeteringen
- Volledig herontworpen curriculum navigatie in README.md
- `<details>`-tags vervangen door beter toegankelijke tabelgebaseerde lay-out
- Alternatieve lay-out opties gemaakt in nieuwe map "alternative_layouts"
- Kaartgebaseerde, tabstijl- en accordionstijl navigatievoorbeelden toegevoegd
- Repositorystructuur sectie bijgewerkt met alle nieuwste bestanden
- Verbeterde sectie "How to Use This Curriculum" met duidelijke aanbevelingen
- MCP specificatielinks bijgewerkt naar correcte URL's
- Sectie Context Engineering (5.14) toegevoegd aan de curriculumstructuur

### Studiegids Updates
- Studiegids volledig herzien om overeen te komen met huidige repositorystructuur
- Nieuwe secties toegevoegd voor MCP Clients en Tools, en Populaire MCP Servers
- Visuele Curriculumkaart bijgewerkt om alle onderwerpen accuraat weer te geven
- Beschrijvingen Geavanceerde Onderwerpen verbeterd om alle gespecialiseerde gebieden te dekken
- Case Studies sectie bijgewerkt met actuele voorbeelden
- Deze uitgebreide changelog toegevoegd

### Communitybijdragen (06-CommunityContributions/)
- Gedetailleerde informatie toegevoegd over MCP servers voor beeldgeneratie
- Uitgebreide sectie toegevoegd over het gebruik van Claude in VSCode
- Cline terminal client installatie- en gebruiksinstructies toegevoegd
- MCP client sectie bijgewerkt met alle populaire clientopties
- Bijdragevoorbeelden verrijkt met meer accurate codevoorbeelden

### Geavanceerde Onderwerpen (05-AdvancedTopics/)
- Alle gespecialiseerde onderwerpmappen georganiseerd met consistente naamgeving
- Context engineering materiaal en voorbeelden toegevoegd
- Foundry agent integratiedocumentatie toegevoegd
- Verbeterde Entra ID beveiligingsintegratiedocumentatie

## 11 juni 2025

### Eerste Creatie
- Eerste versie van het MCP voor Beginners curriculum uitgebracht
- Basisstructuur voor alle 10 hoofdsecties aangemaakt
- Visuele Curriculumkaart voor navigatie geïmplementeerd
- Initiële voorbeeldprojecten toegevoegd in meerdere programmeertalen

### Aan de Slag (03-GettingStarted/)
- Eerste serverimplementatievoorbeelden gemaakt
- Clientontwikkelingsrichtlijnen toegevoegd
- LLM client integratie-instructies opgenomen
- VS Code integratiedocumentatie toegevoegd
- Server-Sent Events (SSE) servervoorbeelden geïmplementeerd

### Kernconcepten (01-CoreConcepts/)
- Gedetailleerde uitleg van client-server architectuur toegevoegd
- Documentatie over sleutelcomponenten van het protocol aangemaakt
- Messagingpatronen in MCP gedocumenteerd

## 23 mei 2025

### Repositorystructuur
- Repository geïnitialiseerd met basis mapstructuur
- README-bestanden aangemaakt voor elke hoofdsectie
- Vertaalinfrastructuur opgesteld
- Afbeeldingsbestanden en diagrammen toegevoegd

### Documentatie
- Eerste README.md met overzicht van het curriculum aangemaakt
- CODE_OF_CONDUCT.md en SECURITY.md toegevoegd
- SUPPORT.md opgezet met richtlijnen voor hulp
- Voorlopige studiegidsstructuur aangemaakt

## 15 april 2025

### Planning en Kader
- Initiële planning voor MCP voor Beginners curriculum
- Leerdoelen en doelgroep gedefinieerd
- Structuur met 10 secties van het curriculum uitgezet
- Conceptueel kader voor voorbeelden en casestudies ontwikkeld
- Initiële prototypevoorbeelden voor kernconcepten aangemaakt

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->