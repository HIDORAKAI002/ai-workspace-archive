# Endringslogg: MCP for nybegynnere-læreplan

Dette dokumentet fungerer som en oversikt over alle betydelige endringer som er gjort i Model Context Protocol (MCP) for nybegynnere-læreplanen. Endringer dokumenteres i omvendt kronologisk rekkefølge (nyeste endringer først).

## 16. juni 2026

### MCP-spesifikasjonsjustering og prøvedatakontroll

Validerte læreplanen mot gjeldende **MCP Specification 2025-11-25** og de nyeste offisielle SDK-ene, deretter korrigerte de gjenværende utdaterte spesifikasjonsreferansene og bekreftet at kjerneprøvene fortsatt bygger og kjører.

#### Korreksjoner av spesifikasjonsversjoner (2025-06-18 / 2025-03-26 → 2025-11-25)

Oppdaterte engelsk innhold der det fortsatt stod at en eldre spesifikasjonsrevisjon var *gjeldende/siste* standard, og endret lenker til de kanoniske `modelcontextprotocol.io` spesifikasjonsbanene:
- **05-AdvancedTopics/mcp-security/README.md**: Oppdaterte banner for "Gjeldende standard", introduksjon, overskriften for kjerneprinsipper for sikkerhet, overskriften for obligatoriske krav, Microsoft Entra ID-seksjonen, lenker for Referanser og Ressurser, og avsluttende sikkerhetsvarsel (8 referanser) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Oppdaterte lenke til Ytterligere ressurser for spesifikasjon og banner for "Gjeldende standard" til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Erstattet utdaterte `2025-03-26` sikkerhet-og-tillit-lenke med gjeldende 2025-11-25 side for beste sikkerhetspraksis
- **03-GettingStarted/14-sampling/README.md**: Oppdaterte offisiell lenke for sampling-dokumentasjon til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Oppdaterte referanse til nåtidig "gjeldende MCP-spesifikasjon" og lenke til Ytterligere ressurser for spesifikasjon til 2025-11-25 (historiske SSE-avviklingsnotater beholdt for nøyaktighet)

#### Prøvedatakontroll mot nåværende SDK-er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passerte uten typefeil — eksisterende `McpServer`/`StdioServerTransport` API-er forblir gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validert i isolert `.venv` med `mcp[cli]` (1.27.2); `py_compile` passerte og `FastMCP.list_tools()` returnerte korrekt `add` og `subtract` verktøyene
- Bekreftet at alle prøveversjonsområder for `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løser seg rent til gjeldende `1.29.0` uten brytende API-endringer

#### Justering av avhengighetsversjoner (lukking av versjonsgap)

Oppdaterte utdaterte SDK-versjoner slik at hver prøve følger gjeldende MCP-utgivelse, i samsvar med konvensjonen for hele repoet:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Oppgradert `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og oppdatert den utdaterte pakken beskrivelsen "updated for MCP 2025-06-18" til "aligned with MCP Specification 2025-11-25"
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Oppgradert eksakt pin `mcp==1.23.0` → `mcp>=1.26.0`; regenererte begge `uv.lock` filer (`uv lock`) slik at låsefilene løser til gjeldende `mcp 1.27.2` og holder seg synkronisert med manifestene

#### Analyse av læreplangap — Dekning av nyeste spesifikasjonsfunksjoner

Bekreftet at læreplanen allerede dekker alle primitiver introdusert/utvidet i MCP 2025-11-25, så ingen innholdsgap gjenstår:
- **Sampling**: Lekse 03-GettingStarted/14-sampling pluss 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-modus)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Røtter**: Dokumentert i 00-Introduction, 01-CoreConcepts og 05-AdvancedTopics/mcp-root-contexts
- **Oppgaver (eksperimentelle, langvarige operasjoner)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Verktøyannotasjoner** (`readOnlyHint` / `destructiveHint`): Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhetsforsterkning og utbedring av avhengighets-sårbarheter

Kjørte en full sikkerhetsgjennomgang av alle avhengighetsmanifest og prøve-kildekode, deretter utbedret alle rapporterte npm-advarsler og ett funn på kodenivå. Etter utbedring rapporterer `npm audit` **0 sårbarheter** i alle undersøkte kataloger.

#### npm Avhengighetssårbarheter (transitive) — Fikset

Reviderte alle 15 innsendte `package-lock.json` filer. Sårbarheter begrenset til transitive avhengigheter trukket inn av MCP Inspector utviklerverktøy, OpenAI-klienten, og MCP SDK; alle er nå utbedret uten å bryte prøvene:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Oppgradert `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), som ryddet opp i bundlet `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws` advarsler. La til en npm `overrides` oppføring som tvinger patched `shell-quote@1.8.4` for å eliminere gjenværende kritisk advarsel båret av `concurrently`; regenererte begge låsefilene (nå 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` oppdaterte den transitive `qs` (moderat) til en patched utgivelse
- **03-GettingStarted/samples/javascript**: `npm audit fix` oppdaterte den transitive `hono` (moderat) til en patched utgivelse
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` oppdaterte den transitive `form-data` (høy) til en patched utgivelse
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererte manglende `package-lock.json` slik at prosjektet er reproduserbart og revisjonssikkert (0 sårbarheter)

#### Sikkerhetsfikser på kodenivå (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernet `shell=True` fra `open_in_vscode` verktøyet. Tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillot shell-metategn i mappesti å bli tolket av `cmd.exe` (kommandoinjeksjonsvektor). Nå starter den den løste `Code.exe` direkte med mappen som argument — uten shell — som er funksjonelt ekvivalent og trygt

#### Python-avhengighetsrevisjon

- Reviderte alle Python kravsett med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterte **ingen kjente sårbarheter** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` områder løser til gjeldende patched utgivelser)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` flagget den transitive avhengigheten **`werkzeug` 3.1.1** med tre `safe_join` Windows device-navn DoS advarsler — `CVE-2025-66221`, `CVE-2026-21860` og `CVE-2026-27199` (alle fikset i 3.1.6). La til en eksplisitt sikkerhets-pin `werkzeug>=3.1.6` så patched utgivelse løses; bekreftet at restriksjonen løser rent med `chainlit` / `mcp` / `semantic-kernel` stakken

### Produktnavn-omprofilering

Oppdaterte alt innhold i læreplanen for å reflektere Microsofts produktomprofilering:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Oppdaterte Discord-fellesskapslenke
- **AGENTS.md**: Oppdaterte Discord-server referanse
- **README.md**: Oppdaterte teknologiekosystemreferanser
- **study_guide.md**: Oppdaterte case-studie referanser
- **05-AdvancedTopics/README.md**: Oppdaterte tittel og beskrivelse for modul 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Oppdaterte seksjonsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Full oppdatering av modultittel og innhold
- **05-AdvancedTopics/mcp-security-entra/README.md**: Oppdaterte kryssreferanselenke
- **07-LessonsfromEarlyAdoption/README.md**: Oppdaterte case-studie referanser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Oppdaterte Seksjon 9 overskrift, merker og funksjoner
- **08-BestPractices/README.md**: Oppdaterte Discord-fellesskapslenke
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Oppdaterte Discord-kanal referanse
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Oppdaterte modellutrullingsreferanse
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Oppdaterte AI Services tabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Oppdaterte ressursreferanser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Oppdaterte hovedreferanser i læreplanen
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Oppdaterte modultittel, oversikt og alle moduloverskrifter
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Oppdaterte tittel, læringsmål, oppsettsinstruksjoner og ressurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Oppdaterte tittel, læringsmål, MCP verter tabell og kryssreferanser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Oppdaterte tittel, merker, forutsetninger og ressurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Oppdaterte Agent Builder referanser og tilbakemeldingslenke
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Oppdaterte forutsetninger og utvidelsesreferanser

---

## 11. april 2026

### Ny leksjon, dokumentasjonsfikser og oppdateringer av avhengigheter

#### Nytt læreplaninnhold lagt til

**Modul 05 - Avanserte emner**
- **Leksjon 5.17: Adversarial Multi-Agent Reasoning with MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattende veiledning som dekker mønsteret for adversarial debatt for multi-agent systemer
  - Mermaid-arkitekturdiagram: to agenter → delt MCP-server → debattformidling → dommer → dom
  - Delt MCP-verktøyserver (`web_search` + `run_python`) implementert i Python og TypeScript
  - Motstridende systemprompt (FOR / IMOT / Dommer) med eksplisitte krav om verktøybruk
  - Debatt-orkestrator i Python, TypeScript og C# som styrer runder og ruter argumenter
  - MCP `ClientSession` kobling for orkestratoren til ekte verktøy-kall
  - Brukstilfeller (hallusinasjonsdeteksjon, trusselmodellering, API-designgjennomgang, faktasjekk, teknologivalg)
  - Sikkerhetshensyn: Sandboxet kjøring, validering av verktøykall, hastighetsbegrensning, revisjonslogging
  - Strukturert øvelse med tre praktiske scenarier (kodegjennomgang, arkitekturavgjørelse, innholdsmoderering)

#### Dokumentasjonsfikser

**Modul 03 - Komme i gang**
- **05-stdio-server/README.md**: Rettet ufullstendig TypeScript stdio-server eksempel — la til manglende transport-instansiering (`new StdioServerTransport()`) og `server.connect(transport)` kall for å samsvare med Python- og .NET-eksemplene i samme seksjon
- **14-sampling/README.md**: Rettet skrivefeil — korrigerte `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Oppdateringer i læreplanen

**Hoved README.md**
- La til oppføring 5.17 (Adversarial Multi-Agent Reasoning med MCP) i læreplantabellen med direkte lenke til den nye leksjonen

**05-AdvancedTopics/README.md**
- La til rad for leksjon 5.17 i leksjonstabellen

**study_guide.md**
- La til tema for Adversarial Multi-Agent Reasoning i tankekart og løpende tekstbeskrivelse for Avanserte emner

#### Kode- og sikkerhetsfikser

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**
- **Sikkerhetsfikser — kommandoinjeksjon**: Erstattet TypeScript `run_python` verktøyets `execSync` shell-interpolasjon med `execFile` + `promisify`, og fjernet dermed kommandoinjeksjonsflaten (LLM-styrt kode sendes nå som et bokstavelig argv-element uten shell involvering)
- **MCP verktøysløyfe-ledninger**: Oppdatert Python-debattoveren for å bruke `AsyncAnthropic` klient (erstattet blokkert synkron `Anthropic`), sende en live `ClientSession` direkte til hver agentrunde, hente verktøydefinisjoner via `session.list_tools()` hver runde, og sende `tool_use` blokker via `session.call_tool()` i en løkke til modellen gir en endelig tekstrespons

#### Avhengighetsoppdateringer

- Oppgradert `hono` til 4.12.12 på tvers av flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Oppgradert `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker
- Oppgradert `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows lab 3 og 4)
- Oppgradert `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Oversettelser

- Synkronisert oversettelser for 48+ språk med de siste kildeendringene (i18n oppdatering)

---

## 5. februar 2026

### Forbedringer i validering og navigasjon på tvers av hele depotet

#### Nytt lærestoff lagt til

**Modul 03 - Komme i gang**
- **12-mcp-hosts/README.md**: Ny omfattende veiledning for oppsett av MCP-verter
  - Konfigurasjonseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON konfigurasjonsmaler for alle hovedverter
  - Sammenligningstabell for transporttyper (stdio, SSE/HTTP, WebSocket)
  - Feilsøking av vanlige tilkoblingsproblemer
  - Sikkerhetsanbefalinger for vertskonfigurasjon

- **13-mcp-inspector/README.md**: Ny feilsøkingsveiledning for MCP Inspector
  - Installasjonsmetoder (npx, npm global, fra kildekode)
  - Tilkobling til servere via stdio og HTTP/SSE
  - Testverktøy, ressurser og prompt-arbeidsflyter
  - VS Code-integrasjon med MCP Inspector
  - Vanlige feilsøkingsscenarier med løsninger

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny veiledning for paginering
  - Kursordbaserte pagineringsmønstre i Python, TypeScript, Java
  - Klientside håndtering av paginering
  - Cursor-designstrategier (ugjennomsiktig kontra strukturert)
  - Anbefalinger for ytelsesoptimalisering

**Modul 05 - Avanserte emner**
- **mcp-protocol-features/README.md**: Dypdykk i nye protokollfunksjoner
  - Implementering av fremdriftsvarsler
  - Mønstre for kansellering av forespørsler
  - Ressursmaler med URI-mønstre
  - Håndtering av serverens livssyklus
  - Kontroll på loggnivåer
  - Feilhåndteringsmønstre med JSON-RPC-koder

#### Navigasjonsfikser (24+ filer oppdatert)

**Hovedmodul READMEs**
 Navigerer nå til både første leksjon OG neste modul

**02-Sikkerhets underfiler**
- Alle 5 tilleggssikkerhetsdokumenter har nå navigasjon for "Hva nå"

**09-CaseStudy filer**
- Alle case study-filer har nå sekvensiell navigasjon

**10-StreamliningAI Labs**
La til «Hva nå»-seksjon til Modul 10 oversikt og Modul 11

#### Kode- og innholdsrettelser

**SDK- og avhengighetsoppdateringer**
Fikset tom openai-versjon til `^4.95.0`
Oppdatert SDK fra `^1.8.0` til `>=1.26.0`
Oppdatert mcp versjonspinner til `>=1.26.0`

**Kodefikser**
Fikset ugyldig modell `gpt-4o-mini` til `gpt-4.1-mini`

**Innholdsrettelser**
Fikset ødelagt lenke `READMEmd` → `README.md`, fikset læreplanoverskrift `Module 1-3` → `Module 0-3`, fikset store/små bokstaver i sti
Fjernet korrupte dupliserte Case Study 5-innhold

**Begynnerveiledning forbedringer**
La til korrekt introduksjon, læringsmål og forkunnskaper for nybegynnere

#### Læreplanoppdateringer

**Hoved README.md**
- La til oppføringer 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protokollfunksjoner) i læreplantabellen

**Modul READMEs**
La til leksjoner 12 og 13 i leksjonslisten
La til Praktiske guider-seksjon med link til paginering
La til leksjoner 5.15 (Egendefinert Transport) og 5.16 (Protokollfunksjoner)

**study_guide.md**
- Oppdatert tankekart med alle nye emner: MCP Hosts-oppet, MCP Inspector, Pagineringstrategier, Protokollfunksjoner dypdykk

## 28. januar 2026

### Gjennomgang av overholdelse av MCP Spesifikasjon 2025-11-25

#### Forbedringer i kjernebegreper (01-CoreConcepts/)
- **Ny klient-primitive – Roots**: Lagt til omfattende dokumentasjon om Roots-klientens primitive, som gjør servere i stand til å forstå filsystemgrenser og tilgangstillatelser
- **Verktøyannotasjoner**: Lagt til dokumentasjon om verktøys atferdsannotasjoner (`readOnlyHint`, `destructiveHint`) for bedre beslutninger om verktøykjøring
- **Kalling av verktøy ved prøvetaking**: Oppdatert prøvetakingsdokumentasjon til å inkludere `tools` og `toolChoice` parametere for modellstyrt verktøyskalling under prøvetakingsforespørsler
- **URL-modus elicitering**: Lagt til dokumentasjon om URL-basert elicitering for serverinitierte eksterne webinteraksjoner
- **Oppgaver (eksperimentelt)**: Lagt til ny seksjon med dokumentasjon på den eksperimentelle Oppgavefunksjonen for holdbare utførelsesinnpakninger og utsatt resultatinnhenting
- **Ikonsupport**: Angitt at verktøy, ressurser, ressursmaler og prompts nå kan inkludere ikoner som tilleggsmatedata

#### Dokumentasjonsoppdateringer
- **README.md**: La til MCP Spesifikasjon 2025-11-25 versjonsreferanse og dato-basert versjonering forklart
- **study_guide.md**: Oppdatert læreplankart til å inkludere Oppgaver og Verktøyannotasjoner i Kjernebegreper-seksjonen; oppdatert dokumentstempel

#### Spesifikasjonsoverholdelsesverifisering
- **Protokollversjon**: Verifisert at all dokumentasjon refererer nåværende MCP Spesifikasjon 2025-11-25
- **Arkitekturtilpasning**: Bekreftet korrekt dokumentasjon av to-lags arkitektur (Data Layer + Transport Layer)
- **Primitive dokumentasjon**: Validert serverprimitive (Ressurser, Prompter, Verktøy) og klientprimitive (Prøvetaking, Elicitering, Logging, Roots)
- **Transportmekanismer**: Verifisert korrekt dokumentasjon av STDIO og strømbar HTTP-transport
- **Sikkerhetsveiledning**: Bekreftet samsvar med gjeldende MCP sikkerhets-retningslinjer

#### Viktige MCP 2025-11-25 funksjoner dokumentert
- **OpenID Connect Discovery**: Autentiseringsserveroppdagelse via OIDC
- **OAuth Client ID metadata-dokumenter**: Anbefalt klientregistreringsmekanisme
- **JSON Schema 2020-12**: Standard-dialekt for MCP skjema-definisjoner
- **SDK nivå-inndeling**: Formaliserte krav til SDK-funksjonssupport og vedlikehold
- **Styringsstruktur**: Formaliserte arbeidsgrupper og interessegrupper i MCP styring

### Stor oppdatering av sikkerhetsdokumentasjon (02-Security/)

#### Integrasjon av MCP Security Summit Workshop (Sherpa)
- **Nytt praktisk treningsressurs**: Lagt til omfattende integrasjon med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all sikkerhetsdokumentasjon
- **Ekspedisjonsrutekontroll**: Dokumentert komplett leir-til-leir progresjon fra Base Camp til Summit
- **OWASP-tilpasning**: All sikkerhetsveiledning kartlagt mot OWASP MCP Azure Security Guide risikoer

#### OWASP MCP Top 10 integrasjon
- **Ny seksjon**: La til OWASP MCP Top 10 sikkerhetsrisiko-tabell med Azure-milder i hoved Security README
- **Risiko-basert dokumentasjon**: Oppdatert mcp-security-controls-2025.md med OWASP MCP risikoreferanser for hver sikkerhetsdomene
- **Referansearkitektur**: Lenket til OWASP MCP Azure Security Guide referansearkitektur og implementasjonsmønstre

#### Oppdaterte sikkerhetsfiler
- **README.md**: La til Sherpa Workshop oversikt, ekspedisjonsrutetabell, OWASP MCP Top 10 risikooppsummering og praktisk trening seksjon
- **mcp-security-controls-2025.md**: Oppdatert overskrift til februar 2026, lagt til OWASP risiko-referanser (MCP01-MCP08), fikset inkonsistens i spesifikasjonsversjon
- **mcp-security-best-practices-2025.md**: La til Sherpa- og OWASP-ressursseksjoner, oppdatert tidsstempel
- **mcp-best-practices.md**: La til praktisk treningsseksjon med Sherpa og OWASP lenker
- **azure-content-safety-implementation.md**: La til OWASP MCP06 referanse, Sherpa Camp 3 tilpasning og flere ressursseksjoner

#### Nye ressurslenker lagt til
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP risikosider (MCP01-MCP10)

### Læreplanomfattende MCP Spesifikasjon 2025-11-25 samsvar

#### Modul 03 - Komme i gang
- **SDK dokumentasjon**: La til Go SDK i offisiell SDK-liste; oppdatert alle SDK-referanser for å samsvare med MCP Spesifikasjon 2025-11-25
- **Transportavklaring**: Oppdatert STDIO- og HTTP Streaming-transportbeskrivelser med eksplisitte spesifikasjonsreferanser

#### Modul 04 - Praktisk implementering
- **SDK oppdateringer**: La til Go SDK; oppdatert SDK-liste med spesifikasjonsversjonsreferanse
- **Autorisasjonsspesifikasjon**: Oppdatert MCP autorisasjonsspesifikasjonslenke til gjeldende 2025-11-25 versjon

#### Modul 05 - Avanserte emner
- **Nye funksjoner**: La til notat om nye MCP Spesifikasjon 2025-11-25 funksjoner (Oppgaver, Verktøyannotasjoner, URL modus elicitering, Roots)
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 og Sherpa workshop lenker til tilleggslitteratur

#### Modul 06 - Fellesskapsbidrag
- **SDK-liste**: La til Swift og Rust SDKs; oppdatert spesifikasjonslenke til 2025-11-25
- **Spesifikasjonsreferanse**: Oppdatert MCP Spesifikasjonslenke til direkte spesifikasjons-URL

#### Modul 07 - Erfaringer fra tidlig adopsjon
- **Ressursoppdateringer**: La til MCP Spesifikasjon 2025-11-25 lenke og OWASP MCP Top 10 til tilleggslitteratur

#### Modul 08 - Beste praksis
- **Spesifikasjonsversjon**: Oppdatert MCP Spesifikasjonsreferanse til 2025-11-25
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 og Sherpa workshop til tilleggslitteratur

#### Modul 10 - Effektivisering av AI-arbeidsflyter
- **Badge oppdatering**: Endret MCP versjonsmerke fra SDK-versjon (1.9.3) til spesifikasjonsversjon (2025-11-25)
- **Ressurslenker**: Oppdatert MCP Spesifikasjonslenke; la til OWASP MCP Top 10

#### Modul 11 - MCP Server praktiske labber
- **Spesifikasjonsreferanse**: Oppdatert MCP Spesifikasjonslenke til 2025-11-25 versjon
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 i offisielle ressurser

## 18. desember 2025

### Oppdatering av sikkerhetsdokumentasjon – MCP Spesifikasjon 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) – Oppdatering av spesifikasjonsversjon
- **Oppdatering av protokollversjon**: Oppdatert til å referere nyeste MCP Spesifikasjon 2025-11-25 (utgitt 25. november 2025)
  - Oppdatert alle spesifikasjonsversjonsreferanser fra 2025-06-18 til 2025-11-25
  - Oppdatert dokumentdatoer fra 18. august 2025 til 18. desember 2025
  - Verifisert at alle spesifikasjons-URLer peker til gjeldende dokumentasjon
- **Innholdsvalidering**: Omfattende validering av sikkerhets beste praksis mot nyeste standarder
  - **Microsoft sikkerhetsløsninger**: Verifisert nåværende terminologi og lenker for Prompt Shields (tidl. "Jailbreak risikodeteksjon"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1 sikkerhet**: Bekreftet samsvar med nyeste OAuth sikkerhets beste praksis
  - **OWASP standarder**: Validert at OWASP Top 10 for LLM-referanser fortsatt er aktuelle
  - **Azure tjenester**: Verifisert alle Microsoft Azure dokumentasjonslenker og beste praksis
- **Standardtilpasning**: Alle refererte sikkerhetsstandarder bekreftet som gyldige
  - NIST AI risikostyringsrammeverk
  - ISO 27001:2022
  - OAuth 2.1 sikkerhets beste praksis
  - Azure sikkerhets- og samsvarsrammeverk
- **Implementeringsressurser**: Validerte alle lenker til implementeringsguider og ressurser
  - Azure API Management autentiseringsmønstre
  - Microsoft Entra ID integrasjonsguider
  - Azure Key Vault hemmelighetshåndtering
  - DevSecOps pipelines og overvåkningsløsninger

### Dokumentasjons kvalitetssikring
- **Spesifikasjonsoverholdelse**: Sikret at alle obligatoriske MCP sikkerhetskrav (MÅ/MÅ IKKE) samsvarer med nyeste spesifikasjon
- **Ressursaktualitet**: Verifisert at alle eksterne lenker til Microsoft dokumentasjon, sikkerhetsstandarder og implementeringsguider er oppdaterte
- **Beste praksis dekning**: Bekreftet omfattende dekning av autentisering, autorisasjon, AI-spesifikke trusler, supply chain-sikkerhet og virksomhetsmønstre

## 6. oktober 2025

### Utvidelse av Komme i gang-seksjon – Avansert serverbruk og enkel autentisering

#### Avansert serverbruk (03-GettingStarted/10-advanced)
- **Ny kapittel lagt til**: Introduserte en omfattende guide til avansert MCP serverbruk, som dekker både vanlige og lavnivå serverarkitekturer.
  - **Vanlig kontra lavnivå server**: Detaljert sammenligning og kodeeksempler i Python og TypeScript for begge tilnærminger.
  - **Handler-basert design**: Forklaring på handler-basert administrasjon av verktøy/ressurs/prompt for skalerbare og fleksible serverimplementasjoner.
  - **Praktiske mønstre**: Virkelige scenarier der lavnivå servermønstre er fordelaktige for avanserte funksjoner og arkitektur.
#### Enkel autentisering (03-GettingStarted/11-simple-auth)
- **Nytt kapittel lagt til**: Trinnvis guide for å implementere enkel autentisering i MCP-servere.
  - **Autentiseringskonsepter**: Klar forklaring på autentisering vs. autorisering, og håndtering av legitimasjon.
  - **Grunnleggende autentiseringsimplementering**: Middleware-baserte autentiseringsmønstre i Python (Starlette) og TypeScript (Express), med kodeeksempler.
  - **Fremgang til avansert sikkerhet**: Veiledning for å starte med enkel autentisering og gå videre til OAuth 2.1 og RBAC, med henvisninger til avanserte sikkerhetsmoduler.

Disse tilleggene gir praktisk, hands-on veiledning for å bygge mer robuste, sikre og fleksible MCP-serverimplementeringer, som bygger bro mellom grunnleggende konsepter og avanserte produksjonsmønstre.

## 29. september 2025

### MCP Server Database-integrasjonslaboratorier - Omfattende praktisk læringsløp

#### 11-MCPServerHandsOnLabs - Ny komplett databaseintegrasjons-læreplan
- **Fullstendig 13-labs læringsløp**: Lagt til omfattende praktisk læremateriell for bygging av produksjonsklare MCP-servere med PostgreSQL databaseintegrasjon
  - **Virkelig implementering**: Zava Retail Analytics-brukstilfelle som demonstrerer enterprise-grade mønstre
  - **Strukturert læringsforløp**:
    - **Lab 00-03: Grunnlag** – Introduksjon, Kjernearkitektur, Sikkerhet & Multi-tenancy, Miljøoppsett
    - **Lab 04-06: Bygge MCP-serveren** – Database-design & skjema, MCP-serverimplementering, Verktøyutvikling  
    - **Lab 07-09: Avanserte funksjoner** – Semantisk søkintegrasjon, Testing & feilsøking, VS Code-integrasjon
    - **Lab 10-12: Produksjon & beste praksis** – Distribusjonsstrategier, Overvåking & observabilitet, Beste praksis & optimalisering
  - **Enterprise-teknologier**: FastMCP-rammeverk, PostgreSQL med pgvector, Azure OpenAI-embedding, Azure Container Apps, Application Insights
  - **Avanserte funksjoner**: Radnivåsikkerhet (RLS), semantisk søk, multi-tenant data-tilgang, vektor-embedding, sanntidsovervåking

#### Terminologistandardisering – Modul til lab-omforming
- **Omfattende dokumentasjonsoppdatering**: Systematisk oppdatert alle README-filer i 11-MCPServerHandsOnLabs for å bruke "Lab"-terminologi i stedet for "Modul"
  - **Seksjonsoverskrifter**: Oppdatert "Hva denne modulen dekker" til "Hva denne laben dekker" i alle 13 labber
  - **Innholdsbeskrivelse**: Endret "Denne modulen gir..." til "Denne laben gir..." i hele dokumentasjonen
  - **Læringsmål**: Oppdatert "Ved slutten av denne modulen..." til "Ved slutten av denne laben..."
  - **Navigasjonslenker**: Konvertert alle "Modul XX:" referanser til "Lab XX:" i kryssreferanser og navigasjon
  - **Fullføringssporing**: Oppdatert "Etter å ha fullført denne modulen..." til "Etter å ha fullført denne laben..."
  - **Bevarte tekniske referanser**: Opprettholdt Python modulreferanser i konfigurasjonsfiler (f.eks. `"module": "mcp_server.main"`)

#### Studieguideforbedring (study_guide.md)
- **Visuelt lærekart**: Lagt til ny seksjon "11. Database Integration Labs" med omfattende lab-strukturvisualisering
- **Repository-struktur**: Oppdatert fra ti til elleve hovedseksjoner med detaljert beskrivelse av 11-MCPServerHandsOnLabs
- **Læringsløpsveiledning**: Forbedret navigasjonsinstruksjoner for seksjoner 00-11
- **Teknologidekning**: Lagt til detaljer om FastMCP, PostgreSQL, Azure-tjenesteintegrasjon
- **Læringsutbytte**: Vektlagt produksjonsklar serverutvikling, databaseintegrasjonsmønstre og enterprise-sikkerhet

#### Forbedring av hoved README-struktur
- **Lab-basert terminologi**: Oppdatert hoved README.md i 11-MCPServerHandsOnLabs for konsekvent bruk av "Lab"-struktur
- **Organisering av læringsløp**: Klar progresjon fra grunnleggende konsepter til avansert implementering og produksjonsdistribusjon
- **Virkelighetsfokus**: Vekt på praktisk, hands-on læring med enterprise-grade mønstre og teknologier

### Dokumentasjonskvalitet og konsistensforbedringer
- **Hands-on læringsfokus**: Forsterket praktisk, lab-basert tilnærming gjennom hele dokumentasjonen
- **Enterprise-mønsterfokus**: Fremhevet produksjonsklare implementeringer og enterprise-sikkerhetsbetraktninger
- **Teknologiintegrasjon**: Omfattende dekning av moderne Azure-tjenester og AI-integrasjonsmønstre
- **Læringsprogresjon**: Klar, strukturert vei fra grunnleggende konsepter til produksjonsdistribusjon

## 26. september 2025

### Case-studier forbedring – GitHub MCP Registry-integrasjon

#### Case-studier (09-CaseStudy/) – Fokus på økosystemutvikling
- **README.md**: Stor utvidelse med omfattende GitHub MCP Registry case-studie
  - **GitHub MCP Registry Case Study**: Ny omfattende studie av GitHub sin MCP Registry-lansering i september 2025
    - **Problemidentifisering**: Detaljert gjennomgang av fragmentert MCP-serveroppdagelse og distribusjonsutfordringer
    - **Løsningsarkitektur**: GitHub sin sentraliserte registry-tilnærming med ett-klikk VS Code installasjon
    - **Forretningspåvirkning**: Målbare forbedringer innen utviklerinnkobling og produktivitet
    - **Strategisk verdi**: Fokus på modulær agentdistribusjon og tverrverktøy interoperabilitet
    - **Økosystemutvikling**: Posisjonering som grunnleggende plattform for agentisk integrasjon
  - **Forbedret case-studie struktur**: Oppdatert alle sju case-studier med konsistent formatering og omfattende beskrivelser
    - Azure AI Travel Agents: Fokus på multi-agent orkestrering
    - Azure DevOps-integrasjon: Fokus på arbeidsflytautomatisering
    - Sanntids dokumenthenting: Implementasjon av Python-konsollklient
    - Interaktiv studieplan-generator: Chainlit-samtalewebapp
    - In-editor dokumentasjon: VS Code og GitHub Copilot-integrasjon
    - Azure API Management: Enterprise API-integrasjonsmønstre
    - GitHub MCP Registry: Økosystemutvikling og fellesskapsplattform
  - **Omfattende konklusjon**: Omskrevet konklusjonsseksjon som fremhever sju case-studier som spenner over flere MCP-implementeringsdimensjoner
    - Enterprise-integrasjon, multi-agent orkestrering, utviklerproduktivitet
    - Økosystemutvikling, kategorisering av pedagogiske anvendelser
    - Forbedret innsikt i arkitektur, implementeringsstrategier og beste praksis
    - Vekt på MCP som moden, produksjonsklar protokoll

#### Studieguideoppdateringer (study_guide.md)
- **Visuelt lærekart**: Oppdatert mindmap for å inkludere GitHub MCP Registry i Case Studies-seksjonen
- **Case-studier beskrivelse**: Forbedret fra generiske beskrivelser til detaljert oversikt av sju omfattende case-studier
- **Repository-struktur**: Oppdatert seksjon 10 for å reflektere omfattende case-studier med spesifikke implementeringsdetaljer
- **Changelog-integrasjon**: Lagt til 26. september 2025-oppføring som dokumenterer GitHub MCP Registry-tillegg og case-studieforbedringer
- **Datooppdateringer**: Oppdatert bunntekst til siste revisjonsdato (26. september 2025)

### Dokumentasjonskvalitet forbedringer
- **Konsistensforbedring**: Standardisert case-studieformatering og struktur på tvers av alle sju eksempler
- **Omfattende dekning**: Case-studier dekker nå enterprise, utviklerproduktivitet og økosystemutviklingsscenarier
- **Strategisk posisjonering**: Forbedret fokus på MCP som grunnleggende plattform for agentbasert systemdistribusjon
- **Ressursintegrasjon**: Oppdatert tilleggsmateriale for å inkludere GitHub MCP Registry-lenke

## 15. september 2025

### Avanserte emner utvidelse – Egendefinerte transport og kontekstengineering

#### MCP-egendefinerte transport (05-AdvancedTopics/mcp-transport/) – Ny avansert implementeringsveiledning
- **README.md**: Fullstendig implementeringsguide for egendefinerte MCP-transportmekanismer
  - **Azure Event Grid Transport**: Omfattende serverløs hendelsesdrevet transportimplementering
    - C#, TypeScript og Python-eksempler med Azure Functions-integrasjon
    - Hendelsesdrevet arkitekturmønstre for skalerbare MCP-løsninger
    - Webhook-mottakere og push-basert meldinghåndtering
  - **Azure Event Hubs Transport**: Høy gjennomstrømmings streaming-transportimplementering
    - Sanntids streamingmuligheter for lav-latens scenarier
    - Partisjoneringstrategier og checkpoint-håndtering
    - Meldingsbatching og ytelsesoptimalisering
  - **Enterprise-integrasjonsmønstre**: Produksjonsklare arkitektureksempler
    - Distribuert MCP-behandling over flere Azure Functions
    - Hybrid transportarkitekturer som kombinerer flere transporttyper
    - Meldingsholdbarhet, pålitelighet og feilhåndteringsstrategier
  - **Sikkerhet & overvåking**: Azure Key Vault-integrasjon og observabilitetsmønstre
    - Administrert identitetsautentisering og minst mulig privilegium-tilgang
    - Applikasjonsinsights telemetri og ytelsesovervåking
    - Kretsbrytere og feiltoleransemønstre
  - **Test-rammeverk**: Omfattende teststrategier for egendefinerte transporter
    - Enhetstesting med test-doubles og mocking-rammeverk
    - Integrasjonstesting med Azure Test Containers
    - Ytelses- og belastningstestingsbetraktninger

#### Kontekstengineering (05-AdvancedTopics/mcp-contextengineering/) – Fremvoksende AI-disiplin
- **README.md**: Omfattende utforskning av kontekstengineering som et fremvoksende felt
  - **Kjerneprinsipper**: Fullstendig kontekstdeling, beslutningsbevissthet og kontekstvindushåndtering
  - **MCP-protokolltilpasning**: Hvordan MCP-design adresserer utfordringer innen kontekstengineering
    - Begrensninger i kontekstvindu og progressive innlastingsstrategier
    - Relevansbestemmelse og dynamisk kontekstgjenfinning
    - Multimodal konteksthåndtering og sikkerhetsbetraktninger
  - **Implementeringstilnærminger**: Enkelttrådet vs. multi-agent arkitekturer
    - Kontekstdeling i biter og prioriteringsteknikker
    - Progressiv kontekstinnlasting og komprimeringsstrategier
    - Lagdelt konteksttilnærming og gjenfinningsoptimalisering
  - **Målerammeverk**: Fremvoksende måleparametere for evaluering av konteksteffektivitet
    - Inngangseffektivitet, ytelse, kvalitet og brukeropplevelse
    - Eksperimentelle tilnærminger til kontekstoptimalisering
    - Feilanalyse og forbedringsmetodikk

#### Læreplansnavigasjonsoppdateringer (README.md)
- **Forbedret modulstruktur**: Oppdatert læreplantabell for å inkludere nye avanserte emner
  - Lagt til Context Engineering (5.14) og Custom Transport (5.15)
  - Konsistent formatering og navigasjonslenker i alle moduler
  - Oppdaterte beskrivelser for å gjenspeile nåværende innholdsomfang

### Katalogstrukturforbedringer
- **Navnestandardisering**: Omdøpt "mcp transport" til "mcp-transport" for samsvar med andre avanserte emnefiler
- **Innholdsorganisering**: Alle 05-AdvancedTopics-mapper følger nå konsistent navnemønster (mcp-[tema])

### Dokumentasjonskvalitetforbedringer
- **MCP-spesifikasjonstilpasning**: Alt nytt innhold refererer nå til gjeldende MCP Specification 2025-06-18
- **Flerspråklige eksempler**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Enterprise-fokus**: Produksjonsklare mønstre og Azure skyintegrasjon gjennomgående
- **Visuell dokumentasjon**: Mermaid-diagrammer for arkitektur- og flytvisualisering

## 18. august 2025

### Omfattende dokumentasjonsoppdatering – MCP 2025-06-18 standarder

#### MCP sikkerhets beste praksiser (02-Security/) – Full modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullstendig omskriving i samsvar med MCP Specification 2025-06-18
  - **Obligatoriske krav**: Lagt til eksplisitte MUST/MUST NOT-krav fra offisiell spesifikasjon med tydelige visuelle indikatorer
  - **12 kjerne sikkerhetspraksiser**: Omstrukturert fra 15-punktsliste til omfattende sikkerhetsdomener
    - Token-sikkerhet og autentisering med ekstern identitetsleverandør-integrasjon
    - Økt sessionshåndtering og transport-sikkerhet med kryptografiske krav
    - AI-spesifikk trusselbeskyttelse med Microsoft Prompt Shields-integrasjon
    - Tilgangskontroll og rettigheter med minste privilegium-prinsipp
    - Innholdssikkerhet og overvåking med Azure Content Safety-integrasjon
    - Leverandørkjede-sikkerhet med omfattende komponentverifisering
    - OAuth-sikkerhet og Beskyttelse mot forveksling av betjeningsansvar med PKCE-implementering
    - Hendelseshåndtering og gjenoppretting med automatiserte kapabiliteter
    - Overholdelse og styring med regulatorisk samsvar
    - Avanserte sikkerhetskontroller med zero trust arkitektur
    - Microsoft sikkerhetsøkosystem-integrasjon med omfattende løsninger
    - Kontinuerlig sikkerhetsutvikling med adaptive praksiser
  - **Microsoft sikkerhetsløsninger**: Forbedret integrasjonsveiledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security
  - **Implementeringsressurser**: Kategoriserte omfattende ressurslenker etter Offisiell MCP-dokumentasjon, Microsoft sikkerhetsløsninger, sikkerhetsstandarder og implementeringsguider

#### Avanserte sikkerhetskontroller (02-Security/) – Enterprise-implementering
- **MCP-SECURITY-CONTROLS-2025.md**: Fullstendig revisjon med enterprise-grade sikkerhetsrammeverk
  - **9 omfattende sikkerhetsdomener**: Utvidet fra basis-kontroller til detaljert rammeverk for enterprise
    - Avansert autentisering og autorisasjon med Microsoft Entra ID-integrasjon
    - Token-sikkerhet og anti-passthrough-kontroller med omfattende validering
    - Sessionssikkerhetskontroller med overtakelsesforebygging
    - AI-spesifikke sikkerhetskontroller med prompt injection og verktøyforgiftning-prevensjon
    - Beskyttelse mot forvekslingsangrep med OAuth-proxy-sikkerhet
    - Verktøyutførelsessikkerhet med sandkasse og isolasjon
    - Leverandørkjede-sikkerhetskontroller med avhengighetsverifisering
    - Overvåking og oppdagelse med SIEM-integrasjon
    - Hendelseshåndtering og gjenoppretting med automatiserte kapabiliteter
  - **Implementeringseksempler**: Inkluderte detaljerte YAML-konfigurasjonsblokker og kodeeksempler
  - **Microsoft-løsningsintegrasjon**: Omfattende dekning av Azure sikkerhetstjenester, GitHub Advanced Security og enterprise-identity management

#### Avanserte emner sikkerhet (05-AdvancedTopics/mcp-security/) – Produksjonsklar implementering
- **README.md**: Fullstendig omskriving for enterprise sikkerhetsimplementering
  - **Gjeldende spesifikasjonstilpasning**: Oppdatert til MCP Specification 2025-06-18 med obligatoriske sikkerhetskrav
  - **Forbedret autentisering**: Microsoft Entra ID-integrasjon med omfattende .NET og Java Spring Security-eksempler
  - **AI sikkerhetsintegrasjon**: Microsoft Prompt Shields og Azure Content Safety-implementering med detaljerte Python-eksempler
  - **Avansert trusselredusering**: Omfattende implementeringseksempler for
    - Beskyttelse mot forvekslingsangrep med PKCE og bruker samtykkevalidering
    - Token passthrough-forhindring med audience-validering og sikker tokenhåndtering
    - Session overtaksbeskyttelse med kryptografisk binding og atferdsanalyse
  - **Enterprise sikkerhetsintegrasjon**: Azure Application Insights-overvåking, trusseldeteksjonspipelines og leverandørkjede-sikkerhet
  - **Implementeringssjekkliste**: Klar differensiering av obligatoriske vs. anbefalte sikkerhetskontroller med Microsoft sikkerhetsøkosystemfordeler

### Dokumentasjonskvalitet og standardtilpasning
- **Spesifikasjonsreferanser**: Oppdaterte alle referanser til gjeldende MCP-spesifikasjon 2025-06-18  
- **Microsoft sikkerhetsekosystem**: Forbedret integrasjonsveiledning gjennom all sikkerhetsdokumentasjon  
- **Praktisk implementering**: La til detaljerte kodeeksempler i .NET, Java og Python med bedriftsmønstre  
- **Ressursorganisering**: Omfattende kategorisering av offisiell dokumentasjon, sikkerhetsstandarder og implementeringsguider  
- **Visuelle indikatorer**: Klar merking av obligatoriske krav vs. anbefalte praksiser  


#### Kjernebegreper (01-CoreConcepts/) - Komplett modernisering  
- **Protokollversjonsoppdatering**: Oppdatert for å referere til gjeldende MCP-spesifikasjon 2025-06-18 med datobasert versjonering (YYYY-MM-DD-format)  
- **Arkitekturfinsliping**: Forbedrede beskrivelser av verter, klienter og servere for å gjenspeile gjeldende MCP-arkitektur mønstre  
  - Verter klart definert som AI-applikasjoner som koordinerer flere MCP-klienttilkoblinger  
  - Klienter beskrevet som protokollkoblinger som opprettholder en-til-en serverforhold  
  - Servere forbedret med lokale vs. eksterne distribusjonsscenarier  
- **Primitiv restrukturering**: Fullstendig omlegging av server- og klientprimitive  
  - Serverprimitiver: Ressurser (datakilder), Prompter (maler), Verktøy (kjørbare funksjoner) med detaljerte forklaringer og eksempler  
  - Klientprimitiver: Sampling (LLM fullføringer), Elicitation (brukerinput), Logging (debugging/overvåking)  
  - Oppdatert med nåværende oppdagelses- (`*/list`), hentings- (`*/get`) og utførelses-(`*/call`) metode-mønstre  
- **Protokollarkitektur**: Innført tosjikts arkitekturmodell  
  - Data-lag: JSON-RPC 2.0 grunnlag med livssyklusstyring og primitiv  
  - Transportlag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer  
- **Sikkerhetsrammeverk**: Omfattende sikkerhetsprinsipper inkludert eksplisitt brukersamtykke, beskyttelse av datavern, sikkerhet ved verktøyutførelse og transportlagsikkerhet  
- **Kommunikasjonsmønstre**: Oppdaterte protokollmeldinger for å vise initialisering, oppdagelse, utførelse og varslingsflyt  
- **Kodeeksempler**: Oppfriskede fler-språklige eksempler (.NET, Java, Python, JavaScript) for å gjenspeile gjeldende MCP SDK-mønstre  

#### Sikkerhet (02-Security/) - Omfattende sikkerhetsgjennomgang  
- **Standardtilpasning**: Full tilpasning til MCP-spesifikasjonens 2025-06-18 sikkerhetskrav  
- **Autentiseringsevolusjon**: Dokumentert utvikling fra tilpassede OAuth-servere til ekstern identitetsleverandørdelegasjon (Microsoft Entra ID)  
- **AI-spesifikk trusselanalyse**: Forbedret dekning av moderne AI-angrepsvektorer  
  - Detaljerte scenarioer for prompt-injeksjonsangrep med ekte eksempler  
  - Mekanismer for verktøyforgiftning og "rug pull" angrepsmønstre  
  - Kontekstvindu-forgiftning og modellforvirringsangrep  
- **Microsoft AI sikkerhetsløsninger**: Omfattende dekning av Microsoft sikkerhetsekosystem  
  - AI Prompt Shields med avansert deteksjon, spotlighting og avgrenserteknikker  
  - Integrasjonsmønstre for Azure Content Safety  
  - GitHub Advanced Security for forsyningskjedebeskyttelse  
- **Avansert trusselmitigering**: Detaljerte sikkerhetskontroller for  
  - Sesjonskapring med MCP-spesifikke angrepsscenarier og kryptografiske sesjons-ID krav  
  - Forvirret stedfortreder-problemer i MCP-proxy scenarier med eksplisitte samtykkekrav  
  - Token-passthrough sårbarheter med påkrevde valideringskontroller  
- **Forsyningskjede-sikkerhet**: Utvidet AI forsyningskjede dekning inkludert grunnmodeller, embeddingtjenester, kontekstleverandører og tredjeparts-APIer  
- **Grunnleggende sikkerhet**: Forbedret integrasjon med bedrifts sikkerhetsmønstre inkludert zero trust-arkitektur og Microsoft sikkerhetsekosystem  
- **Ressursorganisering**: Kategoriserte omfattende ressurslenker etter type (Offisiell dokumentasjon, standarder, forskning, Microsoft-løsninger, implementeringsguider)  

### Forbedringer av dokumentasjonskvalitet  
- **Strukturerte læringsmål**: Forbedrede læringsmål med spesifikke, handlingsrettede resultater  
- **Kryssreferanser**: Lagt til lenker mellom relaterte sikkerhets- og kjernebegrepstemaer  
- **Oppdatert informasjon**: Oppdaterte alle datoreferanser og spesifikasjonslenker til gjeldende standarder  
- **Implementasjonsveiledning**: Lagt til spesifikke, handlingsrettede implementeringsretningslinjer gjennom begge seksjoner  

## 16. juli 2025

### README og navigasjonsforbedringer  
- Fullstendig redesignet læreplan-navigasjonen i README.md  
- Erstattet `<details>`-tagger med mer tilgjengelig tabellbasert format  
- Opprettet alternative layout-alternativer i ny "alternative_layouts"-mappe  
- Lagt til kortbaserte, fane-stil og akkordeon-stil navigasjonseksempler  
- Oppdatert repositoriumstrukturseksjon for å inkludere alle siste filer  
- Forbedret "Hvordan bruke denne læreplanen"-seksjonen med klare anbefalinger  
- Oppdaterte MCP-spesifikasjonslenker til korrekte URLer  
- Lagt til Context Engineering-seksjon (5.14) i læreplansstrukturen  

### Oppdateringer av studieguide  
- Fullstendig revidert studieguide for å samsvare med gjeldende repositoriumstruktur  
- Lagt til nye seksjoner for MCP-klienter og verktøy, og populære MCP-servere  
- Oppdatert det visuelle læreplankartet for å nøyaktig reflektere alle temaer  
- Forbedret beskrivelser av avanserte emner for å dekke alle spesialiserte områder  
- Oppdatert case-studier-seksjon for å reflektere faktiske eksempler  
- Lagt til denne omfattende endringsloggen  

### Fellesskapsbidrag (06-CommunityContributions/)  
- Lagt til detaljert informasjon om MCP-servere for bildegenerering  
- Lagt til omfattende seksjon om bruk av Claude i VSCode  
- Lagt til Cline terminalklientoppsett og bruksanvisning  
- Oppdatert MCP-klientseksjon for å inkludere alle populære klientvalg  
- Forbedret bidragseksempler med mer nøyaktige kodeeksempler  

### Avanserte emner (05-AdvancedTopics/)  
- Organiserte alle spesialiserte temamapper med konsekvent navngivning  
- Lagt til materialer og eksempler for kontekstengineering  
- Lagt til dokumentasjon for Foundry agent-integrasjon  
- Forbedret Entra ID sikkerhetsintegrasjonsdokumentasjon  

## 11. juni 2025

### Første opprettelse  
- Utgitt første versjon av MCP for Beginners-læreplanen  
- Opprettet grunnleggende struktur for alle 10 hovedseksjoner  
- Implementert visuelt læreplankart for navigasjon  
- Lagt til innledende eksempelprosjekter i flere programmeringsspråk  

### Komme i gang (03-GettingStarted/)  
- Opprettet første serverimplementeringseksempler  
- Lagt til veiledning for klientutvikling  
- Inkludert LLM-klientintegrasjonsinstruksjoner  
- Lagt til VS Code-integrasjonsdokumentasjon  
- Implementert Server-Sent Events (SSE) servereksempler  

### Kjernebegreper (01-CoreConcepts/)  
- Lagt til detaljert forklaring av klient-server arkitektur  
- Opprettet dokumentasjon om sentrale protokollkomponenter  
- Dokumenterte meldingsmønstre i MCP  

## 23. mai 2025

### Repositoriumstruktur  
- Initialiserte repositoriet med grunnleggende mappestruktur  
- Opprettet README-filer for hver hovedseksjon  
- Sett opp oversettelsesinfrastruktur  
- Lagt til bildeeiendeler og diagrammer  

### Dokumentasjon  
- Opprettet innledende README.md med oversikt over læreplan  
- Lagt til CODE_OF_CONDUCT.md og SECURITY.md  
- Opprettet SUPPORT.md med veiledning for hjelp  
- Opprettet foreløpig studieguide-struktur  

## 15. april 2025

### Planlegging og rammeverk  
- Første planlegging for MCP for Beginners-læreplan  
- Definerte læringsmål og målgruppe  
- Skisserte 10-sesjons struktur for læreplanen  
- Utviklet konseptuelt rammeverk for eksempler og case-studier  
- Opprettet første prototypeeksempler for nøkkelkonsepter

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->