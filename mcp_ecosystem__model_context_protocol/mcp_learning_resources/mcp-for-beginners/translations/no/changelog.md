# Endringslogg: MCP for Beginners-læreplan

Dette dokumentet fungerer som en oversikt over alle betydelige endringer gjort i Model Context Protocol (MCP) for Beginners-læreplanen. Endringene dokumenteres i omvendt kronologisk rekkefølge (nyeste endringer først).

## 2. juli 2026

### Ny leksjon: The 2026-07-28 MCP Specification Release Candidate

La til dekning av den kommende `2026-07-28` MCP-spesifikasjonsutgivelseskandidaten (annonsert 21. mai 2026; endelig utgivelse planlagt 28. juli 2026), oppsummert fra [den offisielle kunngjøringsbloggposten](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Læreplanens baseline forblir **MCP Specification 2025-11-25** inntil den nye versjonen sendes, så dette presenteres som fremtidsrettet veiledning snarere enn en omskriving av eksisterende leksjoner.

- **Ny**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — en fullstendig leksjon som dekker den statsløse protokollkjernen (fjerning av `initialize` håndtrykk og `Mcp-Session-Id`), de nye `Mcp-Method`/`Mcp-Name` rutingsoverskriftene, `ttlMs`/`cacheScope` cachemetadata, W3C Trace Context i `_meta`, det formelle Extensions-rammeverket (MCP Apps og den nye Tasks-utvidelsen), seks autorisasjonsforsterkende SEPer, avviklingen av Roots/Sampling/Logging, og overgangen til full JSON Schema 2020-12 for verktøy-skjemaer.
- **Oppdatert** med fremtidsrettede henvisninger til den nye leksjonen:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokollversjonsnotat, Sampling/Roots/Logging/Tasks seksjoner, og "Hva kommer videre"
  - [02-Security/README.md](./02-Security/README.md): autorisasjonsforsterkningshenvisning
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): statsløs transporthenvisning
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling-avviklingshenvisning
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging-avvikling og Tasks-utvidelseshenvisning
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): statsløs/session-ruting henvisning
  - [README.md](./README.md): "Ser fremover"-notat i spesifikasjonsseksjonen og en ny `1.1` oppføring i læreplansmodultabellen
  - [study_guide.md](./study_guide.md): fremtidsrettet kulepunkt under Core Concepts-oversikten og et datert tillegg
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): henvisning til `mcp-session-id` transportkart foran den statsløse forespørselsmodellen
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): moduloversikt med henvisning til Root Contexts/Sampling-avviklinger og Tasks-utvidelsen
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): autorisasjonsforsterkningshenvisning

## 24. juni 2026

### Ny leksjon: Bruke MCP i Copilot-app

- [Verktøyseksjon](./12-tooling/README.md) La til verktøyseksjon.
- [MCP i Copilot-app](./12-tooling/01-copilot-app/README.md)

## 16. juni 2026

### MCP-spesifikasjonsjustering og prøvevalidering

Validerte læreplanen mot gjeldende **MCP Specification 2025-11-25** og de nyeste offisielle SDK-ene, korrigerte deretter gjenværende utdaterte spesifikasjonsreferanser og bekreftet at kjernesample fortsatt kan bygges og kjøres.

#### Korrigeringer av spesifikasjonsversjon (2025-06-18 / 2025-03-26 → 2025-11-25)

Oppdaterte engelsk innhold der det fortsatt hevdet at en eldre spesifikasjonsrevisjon var *gjeldende/siste* standard, og rettet linker til kanoniske `modelcontextprotocol.io` spesifikasjonsstier:
- **05-AdvancedTopics/mcp-security/README.md**: Oppdaterte "Current Standard"-banner, introduksjon, overskrift for kjerneretningslinjer for sikkerhet, kravoverskrift, Microsoft Entra ID-seksjon, Referanser & Ressurser-lenker, og avsluttende sikkerhetsmerknad (8 referanser) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Oppdaterte spesifikasjonslinken i Tilleggsressurser og "Current Standard"-banner til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Erstattet utdaterte `2025-03-26` security-and-trust-lenke med gjeldende 2025-11-25 security best practices-side
- **03-GettingStarted/14-sampling/README.md**: Oppdaterte linken til offisielle samplingdokumenter til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Oppdaterte presens "current MCP specification"-referanse og spesifikasjonslinken i Tilleggsressurser til 2025-11-25 (historiske SSE-avviklingsnotater beholdt for nøyaktighet)

#### Prøvevalidering mot gjeldende SDK-er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` passerte uten typefeil — eksisterende `McpServer`/`StdioServerTransport` API-er forblir gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validert i isolert `.venv` med `mcp[cli]` (1.27.2); `py_compile` passerte og `FastMCP.list_tools()` returnerte korrekt `add` og `subtract` verktøyene
- Bekreftet at alle sample `@modelcontextprotocol/sdk` versjonsintervaller (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løses rent til nåværende `1.29.0` uten API-brudd

#### Justering av avhengighetsversjoner (lukking av versjonsgap)

Oppdaterte utdaterte SDK-pinner slik at hvert sample følger gjeldende MCP-utgivelse, i samsvar med repo-konvensjonen:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Oppgradert `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og oppdatert den utdaterte `"updated for MCP 2025-06-18"` pakke-beskrivelsen til `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Oppgradert eksakt pinning `mcp==1.23.0` → `mcp>=1.26.0`; regenererte begge `uv.lock` filer (`uv lock`) slik at låsefilene løser til gjeldende `mcp 1.27.2` og holder seg synkron med manifestene

#### Gap-analyse i læreplan — Nyeste spesifikasjonsfunksjonsdekning

Bekreftet at læreplanen allerede dekker alle primitive introdusert/utvidet i MCP 2025-11-25, så ingen innholdsgap gjenstår:
- **Sampling**: Leksjon 03-GettingStarted/14-sampling pluss 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-modus)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentert i 00-Introduction, 01-CoreConcepts og 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentelle, langvarige operasjoner)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhetsforsterkning & utbedring av sårbarheter i avhengigheter

Kjørte en full sikkerhetssjekk på alle avhengighetsmanifest og kildekode til sample, og utbedret deretter alle rapporterte npm-advarsler og ett kodenivåfunn. Etter utbedring rapporterer `npm audit` **0 sårbarheter** i alle undersøkte kataloger.

#### npm-avhengighets-sårbarheter (transitive) — Fikset

Reviderte alle 15 innsendte `package-lock.json` filer. Sårbarheter var begrenset til transitive avhengigheter trukket inn av MCP Inspector utviklerverktøy, OpenAI-klienten og MCP SDK; alle er nå løst uten å bryte sample:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Oppgradering av `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), som fjernet bundlet `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws` advarsler. La til en npm `overrides`-oppføring som tvang bruk av patched `shell-quote@1.8.4` for å eliminere resterende kritisk advarsel fra `concurrently`; regenererte begge låsefilene (nå 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` oppdaterte transitive `qs` (moderat) til patched versjon
- **03-GettingStarted/samples/javascript**: `npm audit fix` oppdaterte transitive `hono` (moderat) til patched versjon
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` oppdaterte transitive `form-data` (høy) til patched versjon
- **03-GettingStarted/11-simple-auth/solution/typescript**: Genererte manglende `package-lock.json` slik at prosjektet er reproduserbart og kunne auditeres (0 sårbarheter)

#### Kodenivå sikkerhetsutbedring (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernet `shell=True` fra `open_in_vscode`-verktøyet. Tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` tillot skallmetategn i mappesti å bli tolket av `cmd.exe` (kommando-injeksjonsvektor). Nå starter det den løste `Code.exe` direkte med mappen som argument — uten skall — som er funksjonelt ekvivalent og sikkert.

#### Python-avhengighetsrevisjon

- Reviderte alle Python-kravsett med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterte **ingen kjente sårbarheter** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` intervaller løste til nåværende patched utgivelser)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` registrerte den transitive avhengigheten **`werkzeug` 3.1.1** med tre `safe_join` Windows device-navn DoS-advarsler — `CVE-2025-66221`, `CVE-2026-21860`, og `CVE-2026-27199` (alle fikset i 3.1.6). La til en eksplisitt sikkerhetspinning `werkzeug>=3.1.6` slik at patched versjon løses; verifiserte at kravet løses rent med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnavne-rebranding

Oppdaterte alt innhold i læreplanen for å reflektere Microsofts produktrebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Oppdatert Discord-fellesskapslenke
- **AGENTS.md**: Oppdatert Discord-serverreferanse
- **README.md**: Oppdaterte referanser til teknologiekosystemet
- **study_guide.md**: Oppdaterte case-studie-referanser
- **05-AdvancedTopics/README.md**: Oppdatert Modul 5.13 tittel og beskrivelse
- **05-AdvancedTopics/mcp-integration/README.md**: Oppdatert seksjonsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Full modul tittel- og innholdsoppdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Oppdatert kryssreferanselenke
- **07-LessonsfromEarlyAdoption/README.md**: Oppdaterte case-studie-referanser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Oppdatert Seksjon 9 overskrift, merker og kapabiliteter
- **08-BestPractices/README.md**: Oppdatert Discord-fellesskapslenke
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Oppdatert Discord-kanalreferanse
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Oppdatert modellimplementeringsreferanse
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Oppdatert AI Services-tabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Oppdaterte ressursreferanser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Oppdaterte hovedpensumreferanser  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Oppdaterte modultittel, oversikt og alle moduloverskrifter  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Oppdaterte tittel, læringsmål, oppsettinstruksjoner og ressurser  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Oppdaterte tittel, læringsmål, MCP-verts-tabell og kryssreferanser  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Oppdaterte tittel, merker, forutsetninger og ressurser  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Oppdaterte Agent Builder-referanser og tilbakemeldingslenke  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Oppdaterte forutsetninger og utvidelsesreferanser  

---

## 11. april 2026

### Ny leksjon, dokumentasjonsrettelser og avhengighetsoppdateringer

#### Nytt pensuminnhold lagt til

**Modul 05 - Avanserte emner**  
- **Leksjon 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattende guide som dekker det antagonistiske debattmønsteret for multi-agent-systemer  
  - Mermaid arkitekturskjema: to agenter → delt MCP-server → debattutskrift → dommer → dom  
  - Delt MCP verktøyserver (`web_search` + `run_python`) implementert i Python og TypeScript  
  - Motstridende systemtillegg (FOR / IMOT / Dommer) med eksplisitte krav til verktøybruk  
  - Debattorkestrator i Python, TypeScript og C# som styrer runder og ruting av argumenter  
  - MCP `ClientSession`-kobling for orkestratoren til faktiske verktøy-kall  
  - Brukstilfstabel (hallusinasjonsdeteksjon, trusselmodellering, API-designgjennomgang, faktasjekk, teknologivalg)  
  - Sikkerhetshensyn: sandboxet kjøring, verktøykall-validering, ratebegrensing, revisjonslogging  
  - Strukturert øvelse med tre praktiske scenarier (kodegjennomgang, arkitekturavgjørelse, innholdsmoderering)  

#### Dokumentasjonsrettelser

**Modul 03 - Komme i gang**  
- **05-stdio-server/README.md**: Rettet ufullstendig TypeScript stdio server-eksempel — la til manglende transport-instansiering (`new StdioServerTransport()`) og `server.connect(transport)`-kall for å matche Python- og .NET-eksemplene i samme seksjon  
- **14-sampling/README.md**: Rettet skrivefeil — endret `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`  

#### Pensumoppdateringer

**Hoved README.md**  
- La til oppføring 5.17 (Adversarial Multi-Agent Reasoning med MCP) i pensumtavlen med direkte lenke til ny leksjon  

**05-AdvancedTopics/README.md**  
- La til rad for Leksjon 5.17 i leksjonstabellen  

**study_guide.md**  
- La til Adversarial Multi-Agent Reasoning tema i tankekart og prosabeskrivelse av Avanserte emner  

#### Kode- og sikkerhetsrettelser

**Modul 05 - Adversarial Agents (`mcp-adversarial-agents`)**  
- **Sikkerhetsfikser — kommandoinjeksjon**: Erstattet `execSync` skalainjisering med `execFile` + `promisify` i TypeScript-verktøyet `run_python`, fjernet dermed kommandoinjeksjonsflaten (LLM-kontrollert kode blir nå sendt som et bokstavelig argv-element uten skals involvering)  
- **MCP verktøysløyfe-kobling**: Oppdaterte Python-debatt-orkestratoren til å bruke `AsyncAnthropic` klient (erstattet blokkerende synkron `Anthropic`), sende en aktiv `ClientSession` direkte til hver agent-turn, hente verktøydefinisjoner via `session.list_tools()` hver runde, og dispatchere `tool_use`-blokker via `session.call_tool()` i en løkke til modellen gir et endelig tekstsvar  

#### Avhengighetsoppdateringer

- Oppgradert `hono` til 4.12.12 i flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Oppgradert `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker  
- Oppgradert `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows lab 3 og 4)  
- Oppgradert `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspector  

#### Oversettelser

- Synkroniserte oversettelser for 48+ språk med siste kildeendringer (i18n oppdatering)  

---

## 5. februar 2026

### Repository-omfattende validering og navigasjonsforbedringer

#### Nytt pensuminnhold lagt til

**Modul 03 - Komme i gang**  
- **12-mcp-hosts/README.md**: Ny omfattende veiledning for å sette opp MCP-verter  
  - Konfigurasjonseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - JSON konfigurasjonsmaler for alle større verter  
  - Sammenligningstabell for transporttyper (stdio, SSE/HTTP, WebSocket)  
  - Feilsøking av vanlige tilkoblingsproblemer  
  - Sikkerhetsbeste praksis for vertsoppsett  

- **13-mcp-inspector/README.md**: Ny feilsøkingsveiledning for MCP Inspector  
  - Installasjonsmåter (npx, npm global, fra kilde)  
  - Tilkobling til servere via stdio og HTTP/SSE  
  - Testing av verktøy, ressurser og promptarbeidsflyter  
  - VS Code-integrasjon med MCP Inspector  
  - Vanlige feilsøkingsscenarier med løsninger  

**Modul 04 - Praktisk implementering**  
- **pagination/README.md**: Ny implementeringsveiledning for paginering  
  - Paginering basert på cursor i Python, TypeScript, Java  
  - Håndtering av paginering på klientside  
  - Cursor-designstrategier (ugjennomsiktig vs strukturert)  
  - Anbefalinger for ytelsesoptimalisering  

**Modul 05 - Avanserte emner**  
- **mcp-protocol-features/README.md**: Ny dybdeanalyse av protokollfunksjoner  
  - Implementering av fremdriftsvarsler  
  - Mønstre for kansellering av forespørsler  
  - Ressursmaler med URI-mønstre  
  - Server-livssyklusadministrasjon  
  - Kontroll av loggnivåer  
  - Feilhåndteringsmønstre med JSON-RPC koder  

#### Navigasjonsfikser (24+ filer oppdatert)  

**Hovedmodul-README’er**  
 Nå lenker de til både første leksjon OG neste modul  

**02-Sikkerhetsunderfiler**  
- Alle 5 supplerende sikkerhetsdokumenter har nå "Hva er neste" navigasjon:  

**09-Casusfiler**  
- Alle casestudier har nå sekvensiell navigasjon:  

**10-StreamliningAI Lab’er**  
 La til Hva er neste-seksjon i Modul 10 oversikt og Modul 11  

#### Kode- og innholdsrettelser  

**SDK og avhengighetsoppdateringer**  
Rettet tom openai-versjon til `^4.95.0`  
Oppgradert SDK fra `^1.8.0` til `>=1.26.0`  
Oppgradert MCP-versjonspinner til `>=1.26.0`  

**Kodefikser**  
Rettet ugyldig modell `gpt-4o-mini` til `gpt-4.1-mini`  

**Innholdsrettelser**  
Rettet ødelagt lenke `READMEmd` → `README.md`, rettet pensumheader `Module 1-3` → `Module 0-3`, rettet store/små bokstaver i sti  
Fjernet korrupte dupliserte Case Study 5-innhold  

**Nybegynnerveiledning**  
La til korrekt introduksjon, læringsmål og forutsetninger for nybegynnere  

#### Pensumoppdateringer  

**Hoved README.md**  
- La til oppføringer 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paging), 5.16 (Protokollfunksjoner) i pensumtavlen  

**Modul README’er**  
La til leksjoner 12 og 13 i leksjonslisten  
La til Praktiske guider-seksjon med paging-lenke  
La til leksjoner 5.15 (Custom Transport) og 5.16 (Protocol Features)  

**study_guide.md**  
- Oppdatert tankekart med alle nye temaer: MCP Hosts Oppsett, MCP Inspector, Paging Strategier, Protokollfunksjoner Dybdeanalyse  

## 28. jan 2026

### MCP Spesifikasjon 2025-11-25 Samsvarsrevisjon

#### Kjernebegrepsforbedring (01-CoreConcepts/)  
- **Ny klient-primitiv - Roots**: La til omfattende dokumentasjon om Roots klient-primitivet som gjør servere i stand til å forstå filsystemgrenser og tilgangstillatelser  
- **Verktøyanmerkninger**: La til dokumentasjon på verktøyets atferdsanmerkninger (`readOnlyHint`, `destructiveHint`) for bedre beslutninger ved verktøykjøring  
- **Verktøylanrop i Sampling**: Oppdatert Sampling-dokumentasjonen til å inkludere `tools` og `toolChoice` parametre for modellstyrt verktøy-invokasjon under sampling-forespørsler  
- **URL-modus elicitering**: La til dokumentasjon på URL-basert elicitering for serverinitierte eksterne nettinteraksjoner  
- **Oppgaver (Eksperimentelt)**: La til ny seksjon som dokumenterer den eksperimentelle Oppgaver-funksjonen for holdbare kjøringsinnpakninger og utsatt resultatinnhenting  
- **Ikonsupport**: Notert at verktøy, ressurser, ressursmaler, og prompts nå kan inkludere ikoner som tilleggmetadata  

#### Dokumentasjonsoppdateringer  
- **README.md**: La til MCP Spesifikasjon 2025-11-25 versjonsreferanse og dato-basert versjonshåndteringforklaring  
- **study_guide.md**: Oppdatert pensumkart for å inkludere Oppgaver og Verktøyanmerkninger i Kjernebegreper-seksjonen; oppdatert dokumenttidsstempel  

#### Spesifikasjonssamsvar verifisering  
- **Protokollversjon**: Verifisert at all dokumentasjon refererer gjeldende MCP Spesifikasjon 2025-11-25  
- **Arkitekturtilpasning**: Bekreftet to-lags arkitektur (Data Layer + Transport Layer) dokumentasjonsnøyaktighet  
- **Primitivdokumentasjon**: Validert serverprimitiver (Ressurser, Prompts, Verktøy) og klientprimitiver (Sampling, Elicitation, Logging, Roots)  
- **Transportmekanismer**: Verifisert STDIO og streambar HTTP-transportdokumentasjon  
- **Sikkerhetsveiledning**: Bekreftet samsvar med gjeldende MCP Sikkerhetsbeste praksis  

#### Viktige MCP 2025-11-25 funksjoner dokumentert  
- **OpenID Connect Discovery**: Auth-server oppdagelse via OIDC  
- **OAuth Client ID Metadata Dokumenter**: Anbefalt klientregistreringsmekanisme  
- **JSON Schema 2020-12**: Standard dialekt for MCP skjema-definisjoner  
- **SDK-nivåsystem**: Formaliserte krav til SDK-funksjonssupport og vedlikehold  
- **Governance-struktur**: Formaliserte arbeidsgrupper og interessegrupper i MCP styring  

### Sikkerhetsdokumentasjon storoppdatering (02-Sikkerhet/)

#### MCP Security Summit Workshop (Sherpa) integrasjon  
- **Nytt praktisk opplæringsressurs**: La til omfattende integrasjon med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all sikkerhetsdokumentasjon  
- **Ekspedisjonsrute dekning**: Dokumentert komplett leir-til-leir progresjon fra Base Camp til Summit  
- **OWASP-tilpasning**: All sikkerhetsveiledning kartlagt til OWASP MCP Azure Security Guide risikoer  

#### OWASP MCP Top 10 integrasjon  
- **Ny seksjon**: La til OWASP MCP Top 10 sikkerhetsrisikotabell med Azure-mitigasjoner i hoved Sikkerhets-README  
- **Risiko-basert dokumentasjon**: Oppdatert mcp-security-controls-2025.md med OWASP MCP risikoreferanser for hvert sikkerhetsdomene  
- **Referansearkitektur**: Lenket til OWASP MCP Azure Security Guide referansearkitektur og implementeringsmønstre  

#### Oppdaterte sikkerhetsfiler  
- **README.md**: La til Sherpa Workshop oversikt, ekspedisjonsrutetabell, OWASP MCP Top 10 risikooppsummering og praktisk opplæringsseksjon  
- **mcp-security-controls-2025.md**: Oppdatert header til februar 2026, la til OWASP risikoreferanser (MCP01-MCP08), rettet versjonsinkonsistens  
- **mcp-security-best-practices-2025.md**: La til Sherpa og OWASP ressursseksjon, oppdatert tidsstempel  
- **mcp-best-practices.md**: La til praktisk opplæringsseksjon med Sherpa og OWASP lenker  
- **azure-content-safety-implementation.md**: La til OWASP MCP06 referanse, Sherpa Camp 3 tilpasning, og tillegg av ressursseksjon  

#### Nye ressurslenker lagt til  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuelle OWASP MCP risikosider (MCP01-MCP10)  

### Pensumomfattende MCP Spesifikasjon 2025-11-25 innretting  

#### Modul 03 - Komme i gang  
- **SDK Dokumentasjon**: La til Go SDK til offisiell SDK-liste; oppdatert alle SDK-referanser for å samsvare med MCP Spesifikasjon 2025-11-25  
- **Transportforklaringer**: Oppdatert STDIO og HTTP streaming transportbeskrivelser med eksplisitte spesifikasjonsreferanser  

#### Modul 04 - Praktisk implementering  
- **SDK Oppdateringer**: La til Go SDK; oppdatert SDK-liste med spesifikasjonsversjonsreferanse  
- **Autorisasjonsspesifikasjon**: Oppdatert MCP Autorisasjon-spesifikasjonslenke til gjeldende 2025-11-25 versjon  

#### Modul 05 - Avanserte emner  
- **Nye funksjoner**: La til notat om nye MCP Spesifikasjon 2025-11-25 funksjoner (Oppgaver, Verktøyanmerkninger, URL-modus elicitering, Roots)  
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 og Sherpa workshop lenker som tilleggstips  

#### Modul 06 - Fellesskapsbidrag  
- **SDK-liste**: La til Swift og Rust SDKer; oppdatert spesifikasjonslenke til 2025-11-25  
- **Spesifikasjonsreferanse**: Oppdatert MCP Spesifikasjon lenke til direkte spesifikasjons-URL  

#### Modul 07 - Lærdom fra tidlig adopsjon
- **Ressursoppdateringer**: Lagt til MCP Specification 2025-11-25-lenke og OWASP MCP Top 10 til tilleggsmateriale

#### Modul 08 - Beste praksis
- **Spesifikasjonsversjon**: Oppdatert MCP Specification-referanse til 2025-11-25
- **Sikkerhetsressurser**: Lagt til OWASP MCP Top 10 og Sherpa workshop til tilleggshenvendelser

#### Modul 10 - Effektivisering av AI-arbeidsflyter
- **Merkeoppdatering**: Endret MCP-versjonsmerke fra SDK-versjon (1.9.3) til spesifikasjonsversjon (2025-11-25)
- **Ressurslenker**: Oppdatert MCP Specification-lenke; lagt til OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spesifikasjonsreferanse**: Oppdatert MCP Specification-lenke til versjon 2025-11-25
- **Sikkerhetsressurser**: Lagt til OWASP MCP Top 10 i offisielle ressurser

## 18. desember 2025

### Oppdatering av sikkerhetsdokumentasjon - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Oppdatering av spesifikasjonsversjon
- **Protokollversjonsoppdatering**: Oppdatert til å referere siste MCP Specification 2025-11-25 (utgitt 25. november 2025)
  - Oppdatert alle referanser til spesifikasjonsversjon fra 2025-06-18 til 2025-11-25
  - Oppdatert dokumentdatoer fra 18. august 2025 til 18. desember 2025
  - Verifisert at alle spesifikasjons-URLer peker til gjeldende dokumentasjon
- **Innholdsvalidering**: Omfattende validering av sikkerhetsbeste praksis mot siste standarder
  - **Microsoft Security Solutions**: Verifisert gjeldende terminologi og lenker for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1 Security**: Bekreftet samsvar med nyeste OAuth sikkerhetsbeste praksis
  - **OWASP Standards**: Validert at OWASP Top 10 for LLMs-referanser fortsatt er oppdaterte
  - **Azure Services**: Verifisert alle Microsoft Azure-dokumentasjonslenker og beste praksis
- **Standardtilpasning**: Alle refererte sikkerhetsstandarder bekreftet oppdaterte
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerhets- og samsvarsrammer
- **Implementeringsressurser**: Verifisert alle lenker til implementasjonsveiledninger og ressurser
  - Azure API Management autentiseringsmønstre
  - Microsoft Entra ID integrasjonsguider
  - Azure Key Vault hemmelighetshåndtering
  - DevSecOps pipelines og overvåkingsløsninger

### Dokumentasjonskvalitetssikring
- **Spesifikasjonssamsvar**: Sikret at alle obligatoriske MCP-sikkerhetskrav (MÅ/MÅ IKKE) samsvarer med siste spesifikasjon
- **Ressursaktualitet**: Verifisert at alle eksterne lenker til Microsoft-dokumentasjon, sikkerhetsstandarder og implementasjonsguider er oppdaterte
- **Dekning av beste praksis**: Bekreftet omfattende dekning av autentisering, autorisasjon, AI-spesifikke trusler, leverandørkjedesikkerhet og bedriftsmønstre

## 6. oktober 2025

### Utvidelse av seksjon for å komme i gang – Avansert serverbruk og enkel autentisering

#### Avansert serverbruk (03-GettingStarted/10-advanced)
- **Nytt kapittel lagt til**: Introduserer en omfattende guide til avansert MCP-serverbruk, som dekker både vanlige og lavnivå serverarkitekturer.
  - **Vanlig kontra lavnivå server**: Detaljert sammenligning og kodeeksempler i Python og TypeScript for begge tilnærminger.
  - **Handler-basert design**: Forklaring av handler-baserte verktøy-/ressurs-/prompt-administrasjon for skalerbare, fleksible serverimplementasjoner.
  - **Praktiske mønstre**: Virkelige scenarier hvor lavnivå servermønstre er fordelaktige for avanserte funksjoner og arkitektur.

#### Enkel autentisering (03-GettingStarted/11-simple-auth)
- **Nytt kapittel lagt til**: Trinnvis veiledning for implementering av enkel autentisering i MCP-servere.
  - **Autentiseringskonsepter**: Klar forklaring av autentisering vs. autorisasjon, og håndtering av legitimasjon.
  - **Grunnleggende auth-implementering**: Middleware-basert autentiseringsmønstre i Python (Starlette) og TypeScript (Express) med kodeeksempler.
  - **Utvikling til avansert sikkerhet**: Veiledning om å starte med enkel autentisering og gå videre til OAuth 2.1 og RBAC, med henvisninger til avanserte sikkerhetsmoduler.

Disse tilleggene gir praktiske, hands-on veiledninger for å bygge mer robuste, sikre og fleksible MCP-serverimplementasjoner, som bygger bro mellom grunnleggende konsepter og avanserte produksjonsmønstre.

## 29. september 2025

### MCP Server Database-integrasjonslaboratorier – Omfattende praktisk læringssti

#### 11-MCPServerHandsOnLabs – Ny komplett database-integrasjonskurs
- **Komplett 13-lab læringsløp**: Lagt til omfattende praktisk kurs for bygging av produksjonsklare MCP-servere med PostgreSQL database-integrasjon
  - **Virkelighetsnær implementering**: Zava Retail analytics brukstilfelle som demonstrerer bedriftsmønstre av høy kvalitet
  - **Strukturert læringsprogresjon**:
    - **Labs 00-03: Grunnleggende** - Introduksjon, kjernekarkitektur, sikkerhet & flerleietilgang, oppsett av miljø
    - **Labs 04-06: Bygging av MCP-server** - Database-design & skjema, MCP-server-implementasjon, verktøyutvikling  
    - **Labs 07-09: Avanserte funksjoner** - Semantisk søkeintegrasjon, testing & feilsøking, VS Code-integrasjon
    - **Labs 10-12: Produksjon & beste praksis** - Distribusjonsstrategier, overvåking & observabilitet, beste praksis & optimalisering
  - **Bedriftsteknologier**: FastMCP-rammeverk, PostgreSQL med pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Avanserte funksjoner**: Row Level Security (RLS), semantisk søk, flerleietilgang for data, vektor-embedding, sanntidsovervåking

#### Terminologistandardisering – Modul til lab-konvertering
- **Omfattende dokumentasjonsoppdatering**: Systematisk oppdatering av alle README-filer i 11-MCPServerHandsOnLabs til å bruke "Lab" som terminologi istedenfor "Modul"
  - **Seksjonsoverskrifter**: Oppdatert "What This Module Covers" til "What This Lab Covers" i alle 13 laboratoriene
  - **Innholdsbeskrivelser**: Endret "This module provides..." til "This lab provides..." i hele dokumentasjonen
  - **Læringsmål**: Oppdatert "By the end of this module..." til "By the end of this lab..."
  - **Navigasjonslenker**: Konvertert alle "Module XX:"-referanser til "Lab XX:" i kryssreferanser og navigasjon
  - **Fullføringssporing**: Oppdatert "After completing this module..." til "After completing this lab..."
  - **Bevarte tekniske referanser**: Opprettholdt Python-modulreferanser i konfigurasjonsfiler (f.eks. `"module": "mcp_server.main"`)

#### Forbedring av studieguide (study_guide.md)
- **Visuelt kurskart**: Lagt til ny seksjon "11. Database Integration Labs" med omfattende visualisering av labstruktur
- **Repositorystruktur**: Oppdatert fra ti til elleve hovedseksjoner med detaljert beskrivelse av 11-MCPServerHandsOnLabs
- **Veiledning i læringssti**: Forbedret navigasjonsinstruksjoner for å dekke seksjonene 00-11
- **Teknologidekning**: Lagt til FastMCP, PostgreSQL, Azure-tjenester og integrasjonsdetaljer
- **Læringsutbytte**: Vektlagt produksjonsklar serverutvikling, databaseintegrasjonsmønstre og bedriftsikkerhet

#### Forbedring av hoved-README-struktur
- **Lab-basert terminologi**: Oppdatert hovedREADME.md i 11-MCPServerHandsOnLabs for konsistent bruk av "Lab"-struktur
- **Organisering av læringssti**: Klar progresjon fra grunnleggende konsepter via avansert implementering til produksjonsdistribusjon
- **Virkelighetsfokus**: Vekt på praktisk, hands-on læring med bedriftsmønstre og teknologier av høy kvalitet

### Forbedringer i dokumentasjonskvalitet og konsistens
- **Praktisk læringsfokus**: Understreket praktisk, lab-basert tilnærming gjennom hele dokumentasjonen
- **Fokus på bedriftsmønstre**: Fremhevet produksjonsklare implementasjoner og bedriftsikkerhetshensyn
- **Teknologiintegrasjon**: Omfattende dekning av moderne Azure-tjenester og AI-integrasjonsmønstre
- **Læringsprogresjon**: Klar, strukturert sti fra grunnleggende konsepter til produksjonsdistribusjon

## 26. september 2025

### Forbedring av casestudier – GitHub MCP Registry-integrasjon

#### Casestudier (09-CaseStudy/) – Fokus på økosystemutvikling
- **README.md**: Stor utvidelse med omfattende GitHub MCP Registry-casestudie
  - **GitHub MCP Registry-casestudie**: Ny omfattende casestudie som undersøker lanseringen av GitHub MCP Registry i september 2025
    - **ProblemAnalyse**: Detaljert gjennomgang av fragmentert MCP-serveroppdagelse og deployeringsutfordringer
    - **Løsningsarkitektur**: GitHubs sentraliserte registertilnærming med ett-klikks VS Code-installasjon
    - **Forretningspåvirkning**: Målbare forbedringer i utvikleronboarding og produktivitet
    - **Strategisk verdi**: Fokus på modulær agentdeployering og tverrverktøy-interoperabilitet
    - **Økosystemutvikling**: Posisjonering som fundamentalt plattform for agentisk integrasjon
  - **Utvidet casestudie-struktur**: Oppdaterte alle syv casestudier med konsistent formatering og omfattende beskrivelser
    - Azure AI Travel Agents: Vekt på fleragent-orchestration
    - Azure DevOps-integrasjon: Fokus på arbeidsflytautomatisering
    - Sanntidsdokumentgjenfinning: Python konsollklientimplementasjon
    - Interaktiv studieplansgenerator: Chainlit konversasjonsbasert webapp
    - In-Editor dokumentasjon: VS Code og GitHub Copilot-integrasjon
    - Azure API Management: Bedrifts-API-integrasjonsmønstre
    - GitHub MCP Registry: Økosystemutvikling og fellesskapsplattform
  - **Omfattende konklusjon**: Omskrevet konklusjonsseksjon som fremhever syv casestudier som dekker flere MCP-implementeringsdimensjoner
    - Bedriftsintegrasjon, fleragent-orchestration, utviklerproduktivitet
    - Økosystemutvikling, utdanningsapplikasjonskategorisering
    - Forbedrede innsikter i arkitekturmønstre, implementeringsstrategier og beste praksis
    - Vekt på MCP som moden, produksjonsklar protokoll

#### Oppdateringer i studieguide (study_guide.md)
- **Visuelt kurskart**: Oppdatert tankekart for å inkludere GitHub MCP Registry i casestudie-seksjonen
- **Beskrivelse av casestudier**: Forbedret fra generiske beskrivelser til detaljert nedbrytning av syv omfattende casestudier
- **Repositorystruktur**: Oppdatert seksjon 10 for å gjenspeile omfattende casestudiedekning med spesifikke implementasjonsdetaljer
- **Endringsloggintegrasjon**: Lagt til oppføring for 26. september 2025 som dokumenterer GitHub MCP Registry tillegg og casestudieforbedringer
- **Datooppdateringer**: Oppdatert bunntekst-tidsstempel for å gjenspeile siste revisjon (26. september 2025)

### Forbedring av dokumentasjonskvalitet
- **Konsistensforbedring**: Standardisert format og struktur for casestudier på tvers av alle syv eksempler
- **Omfattende dekning**: Casestudier dekker nå bedrifts-, utviklerproduktivitet- og økosystemutviklingsscenarier
- **Strategisk posisjonering**: Økt fokus på MCP som grunnleggende plattform for agentiske systemutrullinger
- **Ressursintegrasjon**: Oppdatert tilleggsmaterialer for å inkludere GitHub MCP Registry-lenke

## 15. september 2025

### Utvidelse av avanserte emner – Egne transportmekanismer og kontekst-ingeniørkunst

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) – Ny avansert implementasjonsveiledning
- **README.md**: Komplett implementasjonsveiledning for tilpassede MCP-transportsmekanismer
  - **Azure Event Grid Transport**: Omfattende serverløs hendelsesdrevet transportimplementasjon
    - Eksempler i C#, TypeScript, og Python med Azure Functions-integrasjon
    - Hendelsesdrevne arkitekturmønstre for skalerbare MCP-løsninger
    - Webhook-mottakere og push-basert meldingshåndtering
  - **Azure Event Hubs Transport**: Høyytelses streamingtransportimplementasjon
    - Sanntids streamingmuligheter for lavlatensscenarioer
    - Partisjoneringsstrategier og checkpoint-håndtering
    - Meldingsbatching og ytelsesoptimalisering
  - **Bedriftsintegrasjonsmønstre**: Produksjonsklare arkitektur-eksempler
    - Distribuert MCP-behandling på tvers av flere Azure Functions
    - Hybrid transportarkitekturer som kombinerer flere transporttyper
    - Meldingsholdbarhet, pålitelighet og feilhåndteringsstrategier
  - **Sikkerhet og overvåking**: Azure Key Vault-integrasjon og observabilitetsmønstre
    - Managed identity-autentisering og tilgang basert på minst mulig privilegium
    - Application Insights-telemetri og ytelsesovervåking
    - Kretsbryter- og feiltoleransemønstre
  - **Testrammeverk**: Omfattende teststrategier for tilpassede transporter
    - Enhetstesting med testdobler og mocking-rammeverk
    - Integrasjonstesting med Azure Test Containers
    - Ytelses- og belastningstesting

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) – Fremvoksende AI-disiplin
- **README.md**: Omfattende utforskning av kontekstingeniørkunst som nytt felt
  - **Kjerneprinsipper**: Full kontekstdeling, beslutningsbevissthet i handlinger og vindushåndtering for kontekst
  - **MCP-protokollsamsvar**: Hvordan MCP-design adresserer utfordringer innen kontekstingeniørkunst
    - Begrensninger i kontekstvindu og progressive innlastingsstrategier
    - Relevansvurdering og dynamisk kontekstgjenfinning
    - Multimodal kontekstbehandling og sikkerhetshensyn
  - **Implementeringstilnærminger**: Enkeltrådet kontra fleragentarkitekturer
    - Kontekst-deling og prioriteringsteknikker
    - Progressiv kontekstinnlasting og komprimeringsstrategier
    - Lagvis konteksttilnærming og optimalisering av gjenfinning
  - **Målerammeverk**: Fremvoksende målinger for evaluering av konteksteffektivitet
    - Inndatatreff, ytelse, kvalitet og brukeropplevelsesvurderinger
    - Eksperimentelle tilnærminger til kontekstoptimalisering
    - Feilanalyse og forbedringsmetoder

#### Oppdateringer i kursnavigasjon (README.md)
- **Utvidet modulstruktur**: Oppdatert kursoversikt for å inkludere nye avanserte emner
  - Lagt til Context Engineering (5.14) og Custom Transport (5.15)
  - Konsistent formatering og navigasjonslenker på tvers av alle moduler
  - Oppdaterte beskrivelser for å reflektere gjeldende innholdsomfang

### Forbedringer i katalogstruktur
- **Navnestandardisering**: Omdøpt "mcp transport" til "mcp-transport" for konsistens med andre avanserte emnefiler
- **Organisering av innhold**: Alle 05-AdvancedTopics-mapper følger nå konsistent navngivningsmønster (mcp-[emne])

### Forbedringer i dokumentasjonskvalitet
- **MCP Specification-samsvar**: Alt nytt innhold refererer til gjeldende MCP Specification 2025-06-18
- **Eksempler på flere språk**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Enterprise-fokus**: Produksjonsklare mønstre og integrasjon med Azure-skyen gjennomgående
- **Visuell dokumentasjon**: Mermaid-diagrammer for arkitektur- og flytvisualisering

## 18. august 2025

### Dokumentasjon omfattende oppdatering - MCP 2025-06-18 standarder

#### MCP Security Best Practices (02-Security/) - Full modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Full omskriving i tråd med MCP-spesifikasjon 2025-06-18
  - **Obligatoriske krav**: Lagt til eksplisitte MÅ/MÅ IKKE-krav fra offisiell spesifikasjon med tydelige visuelle indikatorer
  - **12 kjerne sikkerhetspraksiser**: Omstrukturert fra 15-punkts liste til omfattende sikkerhetsdomener
    - Token-sikkerhet og autentisering med ekstern identitetsleverandør-integrasjon
    - Sesjonshåndtering og transport-sikkerhet med kryptografiske krav
    - AI-spesifikk trusselbeskyttelse med Microsoft Prompt Shields-integrasjon
    - Tilgangskontroll og tillatelser med prinsippet om minste privilegium
    - Innholdssikkerhet og overvåking med Azure Content Safety-integrasjon
    - Leverandørkjede-sikkerhet med omfattende komponentverifisering
    - OAuth-sikkerhet og Confused Deputy-forebygging med PKCE-implementering
    - Hendelseshåndtering og gjenoppretting med automatiserte funksjoner
    - Samsvar og styring med regulatorisk tilpasning
    - Avanserte sikkerhetskontroller med zero trust-arkitektur
    - Microsoft sikkerhetsøkosystem-integrasjon med omfattende løsninger
    - Kontinuerlig sikkerhetsevolusjon med adaptive praksiser
  - **Microsoft sikkerhetsløsninger**: Forbedret integrasjonsveiledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security
  - **Implementeringsressurser**: Kategoriserte omfattende ressurslenker etter Offisiell MCP-dokumentasjon, Microsoft sikkerhetsløsninger, sikkerhetsstandarder og implementeringsguider

#### Avanserte sikkerhetskontroller (02-Security/) - Enterprise-implementering
- **MCP-SECURITY-CONTROLS-2025.md**: Fullstendig overhaling med sikkerhetsrammeverk på bedriftsnivå
  - **9 omfattende sikkerhetsdomener**: Utvidet fra grunnleggende kontroller til detaljert bedriftsrammeverk
    - Avansert autentisering og autorisasjon med Microsoft Entra ID-integrasjon
    - Token-sikkerhet og anti-passthrough-kontroller med omfattende validering
    - Sesjonssikkerhetskontroller med overgrep-forebygging
    - AI-spesifikke sikkerhetskontroller med forebygging av prompt-injeksjon og verktøyforgiftning
    - Confused Deputy-angrepsforebygging med OAuth-proxy-sikkerhet
    - Verktøykjøringssikkerhet med sandboxing og isolasjon
    - Leverandørkjede-sikkerhetskontroller med avhengighetsverifisering
    - Overvåking og deteksjonskontroller med SIEM-integrasjon
    - Hendelseshåndtering og gjenoppretting med automatiserte funksjoner
  - **Implementeringseksempler**: Lagt til detaljerte YAML-konfigurasjonsblokker og kodeeksempler
  - **Microsoft-løsningsintegrasjon**: Omfattende dekning av Azure sikkerhetstjenester, GitHub Advanced Security og bedriftsidentitetsadministrasjon

#### Avanserte emner sikkerhet (05-AdvancedTopics/mcp-security/) - Produksjonsklar implementering
- **README.md**: Full omskriving for bedriftsikkerhetsimplementering
  - **Nåværende spesifikasjonsjustering**: Oppdatert til MCP-spesifikasjon 2025-06-18 med obligatoriske sikkerhetskrav
  - **Forbedret autentisering**: Microsoft Entra ID-integrasjon med omfattende .NET og Java Spring Security-eksempler
  - **AI-sikkerhetsintegrasjon**: Implementering av Microsoft Prompt Shields og Azure Content Safety med detaljerte Python-eksempler
  - **Avansert trusselmitigering**: Omfattende implementeringseksempler for
    - Confused Deputy-angrepsforebygging med PKCE og brukersamtykke-validering
    - Token Passthrough-forebygging med målgruppesvalidering og sikker token-håndtering
    - Sesjonskapringsforebygging med kryptografisk binding og atferdsanalyse
  - **Bedriftsikkerhetsintegrasjon**: Azure Application Insights-overvåking, trusseldeteksjonspipelines og leverandørkjede-sikkerhet
  - **Implementeringssjekkliste**: Klare obligatoriske vs. anbefalte sikkerhetskontroller med fordeler fra Microsoft sikkerhetsøkosystem

### Dokumentasjonskvalitet og standardtilpasning
- **Spesifikasjonsreferanser**: Oppdatert alle referanser til gjeldende MCP-spesifikasjon 2025-06-18
- **Microsoft sikkerhetsøkosystem**: Forbedret integrasjonsveiledning gjennom hele sikkerhetsdokumentasjonen
- **Praktisk implementering**: Lagt til detaljerte kodeeksempler i .NET, Java og Python med bedriftsmønstre
- **Ressursorganisering**: Omfattende kategorisering av offisiell dokumentasjon, sikkerhetsstandarder og implementeringsguider
- **Visuelle indikatorer**: Tydelig merking av obligatoriske krav vs. anbefalte praksiser


#### Kjernebegreper (01-CoreConcepts/) - Full modernisering
- **Protokollversjonsoppdatering**: Oppdatert for å referere til gjeldende MCP-spesifikasjon 2025-06-18 med datobasert versjonering (YYYY-MM-DD-format)
- **Arkitekturforfining**: Forbedrede beskrivelser av Hosts, Clients og Servers for å reflektere nåværende MCP-arkitektur-mønstre
  - Hosts nå tydelig definert som AI-applikasjoner som koordinerer flere MCP-klientforbindelser
  - Klienter beskrevet som protokollkoblere som opprettholder én-til-én-server-relasjoner
  - Servere forbedret med lokale vs. eksterne distribusjonsscenarier
- **Primitive omstrukturering**: Fullstendig overhaling av server- og klientprimitive
  - Serverprimitive: Ressurser (datakilder), Prompts (maler), Verktøy (utførbare funksjoner) med detaljerte forklaringer og eksempler
  - Klientprimitive: Sampling (LLM-utfall), Elicitation (brukerinput), Logging (feilsøking/overvåking)
  - Oppdatert med nåværende oppdagelses- (`*/list`), hentings- (`*/get`), og utførings- (`*/call`) metode-mønstre
- **Protokollarkitektur**: Introduksjon av tolags arkitekturmodell
  - Datalag: JSON-RPC 2.0 grunnlag med livssyklusadministrasjon og primitive
  - Transportlag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer
- **Sikkerhetsrammeverk**: Omfattende sikkerhetsprinsipper inkludert eksplisitt brukersamtykke, datavern, verktøykjøringssikkerhet og transportlagsikkerhet
- **Kommunikasjonsmønstre**: Oppdaterte protokollmeldinger som viser initialisering, oppdagelse, utførelse og varslingsflyter
- **Kodeeksempler**: Oppdaterte flerspråklige eksempler (.NET, Java, Python, JavaScript) for å reflektere nåværende MCP SDK-mønstre

#### Sikkerhet (02-Security/) - Omfattende sikkerhetsoverhaling  
- **Standardtilpasning**: Full samsvar med MCP-spesifikasjon 2025-06-18 sikkerhetskrav
- **Autentiseringsevolusjon**: Dokumentert utvikling fra egendefinerte OAuth-servere til ekstern identitetsleverandør-delegering (Microsoft Entra ID)
- **AI-spesifikk trusselanalyse**: Forbedret dekning av moderne AI-angrepsvektorer
  - Detaljerte prompt-injeksjonsangrepsscenarier med ekte eksempler
  - Verktøyforgiftingsmekanismer og "rug pull"-angrepsmønstre
  - Kontekstvindu-forgiftning og modellforvirringsangrep
- **Microsoft AI-sikkerhetsløsninger**: Omfattende dekning av Microsoft sikkerhetsøkosystem
  - AI Prompt Shields med avansert deteksjon, spotlighting og delimiter-teknikker
  - Azure Content Safety integrasjonsmønstre
  - GitHub Advanced Security for leverandørkjede-beskyttelse
- **Avansert trusselmitigering**: Detaljerte sikkerhetskontroller for
  - Sesjonskapring med MCP-spesifikke angrepsscenarier og kryptografiske sesjons-ID-krav
  - Confused deputy-problemer i MCP-proxy-scenarier med eksplisitte samtykkekrav
  - Token passthrough-sårbarheter med obligatoriske valideringskontroller
- **Leverandørkjede-sikkerhet**: Utvidet dekning av AI-leverandørkjeden inkludert foundation models, embedding-tjenester, kontekstleverandører og tredjeparts-APIer
- **Foundation-sikkerhet**: Forbedret integrasjon med bedriftsikkerhetsmønstre inkludert zero trust-arkitektur og Microsoft sikkerhetsøkosystem
- **Ressursorganisering**: Kategoriserte omfattende ressurslenker etter type (offisielle dokumenter, standarder, forskning, Microsoft-løsninger, implementeringsguider)

### Forbedringer i dokumentasjonskvalitet
- **Strukturerte læringsmål**: Forbedrede læringsmål med spesifikke, handlingsrettede utfall 
- **Kryssreferanser**: Lagt til lenker mellom relaterte sikkerhets- og kjernebegrepstemaer
- **Oppdatert informasjon**: Oppdatert alle datoreferanser og spesifikasjonslenker til gjeldende standarder
- **Implementeringsveiledning**: Lagt til spesifikke, handlingsrettede implementeringsretningslinjer gjennom begge seksjoner

## 16. juli 2025

### README og navigasjonsforbedringer
- Fullstendig redesign av læreplan-navigasjon i README.md
- Erstattet `<details>`-tagger med mer tilgjengelig tabellbasert format
- Opprettet alternative layoutvalg i ny "alternative_layouts"-mappe
- Lagt til kortbaserte, fanebaserte og akkordeon-stil navigasjonseksempler
- Oppdatert seksjonen om repositorieoppbygging for å inkludere alle siste filer
- Forbedret seksjonen "Hvordan bruke denne læreplanen" med klare anbefalinger
- Oppdaterte MCP-spesifikasjonslenker for å peke til korrekte URLer
- Lagt til avsnitt om Context Engineering (5.14) i læreplanstrukturen

### Studieveiledningsoppdateringer
- Fullstendig revidert studieveiledningen for å samsvare med gjeldende repo-struktur
- Lagt til nye seksjoner for MCP-klienter og verktøy, samt populære MCP-servere
- Oppdatert det visuelle kartet for læreplanen for å nøyaktig vise alle temaer
- Forbedret beskrivelser av avanserte temaer for å dekke alle spesialiserte områder
- Oppdatert casestudier-seksjon for å reflektere faktiske eksempler
- Lagt til denne omfattende endringsloggen

### Community Contributions (06-CommunityContributions/)
- Lagt til detaljert informasjon om MCP-servere for bildegenerering
- Lagt til omfattende seksjon om bruk av Claude i VSCode
- Lagt til oppsett og bruksanvisning for Cline terminalklient
- Oppdatert MCP-klientseksjon for å inkludere alle populære klientvalg
- Forbedret bidragseksempler med mer nøyaktige kodeeksempler

### Avanserte temaer (05-AdvancedTopics/)
- Organisert alle spesialiserte temamapper med konsistent navngivning
- Lagt til materialer og eksempler for context engineering
- Lagt til dokumentasjon for Foundry-agent-integrasjon
- Forbedret dokumentasjon for Entra ID-sikkerhetsintegrasjon

## 11. juni 2025

### Første opprettelse
- Lansert første versjon av MCP for Beginners-læreplanen
- Opprettet grunnstruktur for alle 10 hovedseksjoner
- Implementert visuelt læreplankart for navigasjon
- Lagt til opprinnelige prøveprosjekter i flere programmeringsspråk

### Komme i gang (03-GettingStarted/)
- Opprettet første serverimplementeringseksempler
- Lagt til veiledning for klientutvikling
- Inkludert instruksjoner for LLM-klientintegrasjon
- Lagt til VS Code-integrasjonsdokumentasjon
- Implementert Server-Sent Events (SSE)-servereksempler

### Kjernebegreper (01-CoreConcepts/)
- Lagt til detaljert forklaring av klient-server-arkitektur
- Opprettet dokumentasjon om nøkkelprotokollkomponenter
- Dokumentert meldingsmønstre i MCP

## 23. mai 2025

### Repositorie-struktur
- Initialisert repositoriet med grunnleggende mappestruktur
- Opprettet README-filer for hver hovedseksjon
- Satt opp oversettelsesinfrastruktur
- Lagt til bildeassets og diagrammer

### Dokumentasjon
- Opprettet initial README.md med læreplanoversikt
- Lagt til CODE_OF_CONDUCT.md og SECURITY.md
- Satt opp SUPPORT.md med veiledning for å få hjelp
- Opprettet foreløpig struktur for studieveiledning

## 15. april 2025

### Planlegging og rammeverk
- Innledende planlegging for MCP for Beginners-læreplanen
- Definerte læringsmål og målgruppe
- Skisserte 10-delt struktur for læreplanen
- Utviklet konseptuelt rammeverk for eksempler og casestudier
- Opprettet innledende prototype-eksempler for nøkkelbegreper

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->