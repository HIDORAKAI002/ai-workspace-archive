# Endringslogg: MCP for nybegynnere læreplan

Dette dokumentet fungerer som en oversikt over alle betydelige endringer gjort i Model Context Protocol (MCP) for nybegynnere læreplan. Endringer dokumenteres i omvendt kronologisk rekkefølge (nyeste endringer først).

## 24. juni 2026

### Ny leksjon: Bruke MCP i Copilot-app

- [Verktøyseksjon](./12-tooling/README.md) Lagt til verktøyseksjon.
- [MCP i Copilot-app](./12-tooling/01-copilot-app/README.md)

## 16. juni 2026

### Justering av MCP-spesifikasjon & validering av eksempler

Validerte læreplanen mot gjeldende **MCP Specification 2025-11-25** og de siste offisielle SDK-ene, rettet deretter gjenværende utdaterte spesifikasjonsreferanser og bekreftet at kjerneeksemplene fortsatt bygges og kjører.

#### Korreksjoner av spesifikasjonsversjon (2025-06-18 / 2025-03-26 → 2025-11-25)

Oppdaterte engelsk innhold der det fortsatt hevdet at en eldre spesi(kasjons-)revisjon var *gjeldende/siste* standard, og endret lenker til de kanoniske `modelcontextprotocol.io` spesifikasjonsstiene:
- **05-AdvancedTopics/mcp-security/README.md**: Oppdaterte banner for "Gjeldende standard", introduksjon, overskrift for kjerneprinsipper for sikkerhet, overskrift for obligatoriske krav, Microsoft Entra ID-seksjon, Referanser & Ressurser-lenker, og avsluttende sikkerhetsmelding (8 referanser) til 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Oppdaterte tilleggskilder-spesifikasjonslenke og banner for "Gjeldende standard" til 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Erstattet den utdaterte `2025-03-26` security-and-trust-lenken med den gjeldende 2025-11-25 sikkerhetspraksis-siden
- **03-GettingStarted/14-sampling/README.md**: Oppdaterte offisielle sampling-dokumentasjonslenken til 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Oppdaterte nåtid "gjeldende MCP-spesifikasjon" referanse og tilleggskilders spesifikasjonslenke til 2025-11-25 (historiske SSE-deprekeringsnotater beholdt for nøyaktighet)

#### Validering av eksempler mot gjeldende SDK-er

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` løste `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` bestod uten typefeil — eksisterende `McpServer`/`StdioServerTransport` API-er er fortsatt gyldige
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validerte i isolert `.venv` med `mcp[cli]` (1.27.2); `py_compile` bestod og `FastMCP.list_tools()` returnerte riktig verktøyene `add` og `subtract`
- Bekreftet at alle eksempel `@modelcontextprotocol/sdk` versjonsområder (`>=1.26.0` / `^1.26.0` / `^1.27.0`) løses rent til nåværende `1.29.0` uten brytende API-endringer

#### Justering av avhengighetsversjoner (lukking av versjonsgap)

Oppdaterte utdaterte SDK-versjoner slik at hvert eksempel sporer den nåværende MCP-utgivelsen, i tråd med repo-bred konvensjon:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Oppdaterte `@modelcontextprotocol/sdk` fra `^1.8.0` → `>=1.26.0` og endret den utdaterte pakken beskrivelse `"updated for MCP 2025-06-18"` til `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** og **lab4/code/github_mcp_server/pyproject.toml**: Oppdaterte den eksakte versjonen `mcp==1.23.0` → `mcp>=1.26.0`; regenererte begge `uv.lock` filene (`uv lock`) slik at låsefilene løser til nåværende `mcp 1.27.2` og holder seg synkronisert med manifestene

#### Analyse av læreplangap – dekning av siste spesifikasjonsfunksjoner

Bekreftet at læreplanen allerede dekker alle primitivene introdusert/utvidet i MCP 2025-11-25, så ingen innholdsgap gjenstår:
- **Sampling**: Leksjon 03-GettingStarted/14-sampling pluss 05-AdvancedTopics/mcp-sampling
- **Elicitation (inkl. URL-modus)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentert i 00-Introduction, 01-CoreConcepts, og 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentelle, langvarige operasjoner)**: Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features
- **Verktøyannotasjoner** (`readOnlyHint` / `destructiveHint`): Dokumentert i 01-CoreConcepts og 05-AdvancedTopics/mcp-protocol-features

### Sikkerhetshardening & utbedring av avhengighets-sårbarheter

Kjørte en full sikkerhetssjekk på hvert avhengighetsmanifest og prøveeksempel-kildekode, og utbedret deretter alle rapporterte npm-advarsler og en kode-sikkerhetsfunn. Etter utbedring rapporterer `npm audit` **0 sårbarheter** i alle reviderte kataloger.

#### npm avhengighets-sårbarheter (transitive) — fikset

Reviderte alle 15 innleverte `package-lock.json` filer. Sårbarheter var begrenset til transitive avhengigheter fra MCP Inspector utviklerverktøy, OpenAI-klienten, og MCP SDK; alle er nå løst uten å bryte eksemplene:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** og **lab3/code/weather_mcp/inspector**: Oppdaterte `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), som fjernet de innebygde advarslene for `ajv`, `brace-expansion`, `diff`, `path-to-regexp` og `ws`. La til en npm `overrides` oppføring som tvinger den patchede `shell-quote@1.8.4` for å eliminere den gjenværende kritiske advarselen båret av `concurrently`; regenererte begge låsefilene (nå 0 sårbarheter)
- **03-GettingStarted/samples/typescript**: `npm audit fix` oppdaterte den transitive `qs` (moderat) til en patchet utgave
- **03-GettingStarted/samples/javascript**: `npm audit fix` oppdaterte den transitive `hono` (moderat) til en patchet utgave
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` oppdaterte den transitive `form-data` (høy) til en patchet utgave
- **03-GettingStarted/11-simple-auth/solution/typescript**: Opprettet manglende `package-lock.json` slik at prosjektet er reproducerbart og reviderbart (0 sårbarheter)

#### Kode-nivå sikkerhetsfikser (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Fjernet `shell=True` fra `open_in_vscode`-verktøyet. Tidligere `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lot skall-metategn i en mappenavnsti bli tolket av `cmd.exe` (kommando-injeksjonsvektor). Nå starter den den løste `Code.exe` direkte med mappen som argument — uten skall — som er funksjonelt likt og trygt

#### Python avhengighetsrevisjon

- Reviderte alle Python kravsett med `pip-audit`. `05-AdvancedTopics` og `03-GettingStarted/samples/python` rapporterte **ingen kjente sårbarheter** (deres `mcp` / `httpx` / `pydantic` / `python-dotenv` versjonsområder løses til nåværende patchede utgaver)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` slo alarm på transitive avhengighet **`werkzeug` 3.1.1** med tre `safe_join` Windows enhetsnavn DoS-advarsler — `CVE-2025-66221`, `CVE-2026-21860`, og `CVE-2026-27199` (alle fikset i 3.1.6). La til eksplisitt sikkerhetspinning `werkzeug>=3.1.6` slik at patchet utgave løses; bekreftet at begrensningen løses rent med `chainlit` / `mcp` / `semantic-kernel` stacken

### Produktnavn-rebranding

Oppdaterte alt læreplan-innhold for å gjenspeile Microsofts produkt rebranding:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Oppdaterte Discord-fellesskapslenke
- **AGENTS.md**: Oppdaterte Discord-serverreferanse
- **README.md**: Oppdaterte teknologiøkosystem-referanser
- **study_guide.md**: Oppdaterte case-studie-referanser
- **05-AdvancedTopics/README.md**: Oppdaterte Modul 5.13 tittel og beskrivelse
- **05-AdvancedTopics/mcp-integration/README.md**: Oppdaterte seksjonsoverskrift og beskrivelse
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Full modul tittel og innholdsoppdatering
- **05-AdvancedTopics/mcp-security-entra/README.md**: Oppdaterte kryssreferanselenke
- **07-LessonsfromEarlyAdoption/README.md**: Oppdaterte case-studie-referanser
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Oppdaterte seksjon 9 overskrift, merker, og kapabiliteter
- **08-BestPractices/README.md**: Oppdaterte Discord-fellesskapslenke
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Oppdaterte Discord-kanalreferanse
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Oppdaterte modellutrullingsreferanse
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Oppdaterte AI Services tabell
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Oppdaterte ressursreferanser

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Oppdaterte hoved-læreplanreferanser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Oppdaterte modultittel, oversikt, og alle module overskrifter
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Oppdaterte tittel, læringsmål, oppsettsinstruksjoner, og ressurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Oppdaterte tittel, læringsmål, MCP hosts tabell, og kryssreferanser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Oppdaterte tittel, merker, forhåndskrav, og ressurser
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Oppdaterte Agent Builder-referanser og tilbakemeldingslenke
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Oppdaterte forhåndskrav og utvidelsesreferanser

---

## 11. april 2026

### Ny leksjon, dokumentasjonsfikser og avhengighetsoppdateringer

#### Nytt læreplaninnhold lagt til

**Modul 05 - Avanserte emner**
- **Leksjon 5.17: Adversarial Multi-Agent Reasoning med MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Ny omfattende guide som dekker det adversariale debattmønsteret for multi-agent systemer
  - Mermaid-arkitekturdiagram: to agenter → delt MCP-server → debatttranskript → dommer → dom
  - Delt MCP verktøyserver (`web_search` + `run_python`) implementert i Python og TypeScript
  - Motsatte systemprompt (FOR / IMOT / Dommer) med eksplisitte krav for verktøybruk
  - Debattoperatør i Python, TypeScript, og C# som styrer runder og ruter argumenter
  - MCP `ClientSession` koblinger for operatøren til ekte verktøysamtaler
  - Brukstilfelles-tabell (hallusinasjonsdeteksjon, trusselmodellering, API designgjennomgang, faktasjekk, teknologivalg)
  - Sikkerhetshensyn: sandkassekjøring, validering av verktøysamtaler, ratebegrensning, revisjonslogging
  - Strukturert øvelse med tre praktiske scenarioer (kodegjennomgang, arkitekturbeslutning, innholdmoderering)

#### Dokumentasjonsfikser

**Modul 03 - Komme i gang**
- **05-stdio-server/README.md**: Rettet ufullstendig TypeScript stdio server-eksempel – la til manglende transport-instansiering (`new StdioServerTransport()`) og `server.connect(transport)` kall for å matche Python og .NET eksemplene i samme seksjon
- **14-sampling/README.md**: Rettet skrivefeil – rettet `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Oppdateringer i læreplanen

**Hoved README.md**
- La til oppføring 5.17 (Adversarial Multi-Agent Reasoning med MCP) i læreplantabellen med direkte lenke til ny leksjon

**05-AdvancedTopics/README.md**
- La til leksjon 5.17 rad i tabell over leksjoner

**study_guide.md**
- La til Adversarial Multi-Agent Reasoning-tema til tankekart og tekstbeskrivelse under Avanserte emner

#### Kode- og sikkerhetsfikser

**Modul 05 – Adversarial Agents (`mcp-adversarial-agents`)**
- **Sikkerhetsfikser — kommandoinjeksjon**: Erstattet `execSync` shell-interpolasjon med `execFile` + `promisify` i TypeScript-verktøyet `run_python`, og eliminerte dermed overflaten for kommandoinjeksjon (LLM-kontrollert kode sendes nå som et bokstavelig argv-element uten shell-involvering)
- **MCP-verktøysløyfekobling**: Oppdatert Python-diskusjonsorkestratoren til å bruke `AsyncAnthropic`-klienten (erstattet blokkerende synkron `Anthropic`), sende en aktiv `ClientSession` direkte til hver agenttur, hente verktøydefinisjoner via `session.list_tools()` hver tur, og sende `tool_use`-blokker via `session.call_tool()` i en sløyfe til modellen avgir en endelig tekstrespons

#### Avhengighetsoppdateringer

- Oppdatert `hono` til 4.12.12 på tvers av flere pakker (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Oppdatert `@hono/node-server` fra 1.19.11 til 1.19.13 i TypeScript-pakker
- Oppdatert `cryptography` fra 46.0.5 til 46.0.7 i Python-pakker (10-StreamliningAIWorkflows lab 3 og 4)
- Oppdatert `lodash` fra 4.17.23 til 4.18.1 i 10-StreamliningAIWorkflows inspector

#### Oversettelser

- Synkroniserte oversettelser for 48+ språk med siste kildeendringer (i18n-oppdatering)

---

## 5. februar 2026

### Forbedringer av validering og navigasjon i hele depotet

#### Nytt innhold i pensum

**Modul 03 - Komme i gang**
- **12-mcp-hosts/README.md**: Ny omfattende veiledning for oppsett av MCP-verter
  - Konfigurasjonseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurasjonsmaler for alle hovedverter
  - Sammenligningstabell for transporttyper (stdio, SSE/HTTP, WebSocket)
  - Feilsøking av vanlige tilkoblingsproblemer
  - Sikkerhetsanbefalinger for vertskonfigurasjon

- **13-mcp-inspector/README.md**: Ny veiledning for feilsøking med MCP Inspector
  - Installasjonsmetoder (npx, globalt npm, fra kilde)
  - Tilkobling til servere via stdio og HTTP/SSE
  - Testing av verktøy, ressurser og prompt-arbeidsflyter
  - VS Code-integrasjon med MCP Inspector
  - Vanlige feilsøkingsscenarier med løsninger

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny implementeringsveiledning for paginering
  - Cursor-basert pagineringsmønstre i Python, TypeScript, Java
  - Håndtering av paginering på klientsiden
  - Cursor-designstrategier (opaque vs. strukturert)
  - Anbefalinger for ytelsesoptimalisering

**Modul 05 - Avanserte emner**
- **mcp-protocol-features/README.md**: Dypdykk i nye protokollfunksjoner
  - Implementering av framdriftsvarsler
  - Mønstre for avbestilling av forespørsler
  - Ressursmaler med URI-mønstre
  - Lifecyclesstyring for servere
  - Kontroll av loggnivåer
  - Feilhåndtering med JSON-RPC-koder

#### Navigasjonsfikser (24+ filer oppdatert)

**Hovedmodul-READMEer**
 Lenker nå til både første leksjon OG neste modul

**02-Sikkerhetsundermapper**
- Alle 5 tilleggsdokumenter for sikkerhet har nå navigasjon for "Hva kommer nå":

**09-CaseStudy-filer**
- Alle casestudiefiler har nå sekvensiell navigasjon:

**10-StreamliningAI-lab**
La til "Hva kommer nå"-seksjon i Modul 10 oversikt og Modul 11

#### Kode- og innholdsrettelser

**SDK- og avhengighetsoppdateringer**
Fikset tom openai-versjon til `^4.95.0`
Oppdatert SDK fra `^1.8.0` til `>=1.26.0`
Oppdatert mcp-versjonspinner til `>=1.26.0`

**Kodefikser**
Fikset ugyldig modell `gpt-4o-mini` til `gpt-4.1-mini`

**Innholdsrettelser**
Fikset ødelagt lenke `READMEmd` → `README.md`, korrigert pensumoverskrift `Module 1-3` → `Module 0-3`, fikset skille mellom store og små bokstaver i sti
Fjernet skadet duplikatinnhold for Case Study 5

**Forbedringer for nybegynnere**
Lagt til korrekt introduksjon, læringsmål og forutsetninger for nybegynnere

#### Pensumoppdateringer

**Hoved README.md**
- La til oppføringer 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protokollfunksjoner) i pensumtabellen

**Modul-READMEer**
La til leksjoner 12 og 13 i leksjonslisten
La til seksjon for praktiske guider med lenke til paginering
La til leksjoner 5.15 (Custom Transport) og 5.16 (Protocol Features)

**study_guide.md**
- Oppdatert tankekart med alle nye emner: MCP Hosts Setup, MCP Inspector, Pagineringstrategier, Protokollfunksjoner dybdeanalyse

## 28. jan 2026

### MCP-spesifikasjon 2025-11-25 samsvarsrevisjon

#### Kjernebegrepsforbedringer (01-CoreConcepts/)
- **Ny klientprimitive - Roots**: La til omfattende dokumentasjon om Root-klientprimitivet, som gjør at servere kan forstå filsystemgrenser og tilgangstillatelser
- **Verktøyannotasjoner**: La til dokumentasjon om atferdsannotasjoner for verktøy (`readOnlyHint`, `destructiveHint`) for bedre beslutninger om verktøykjøring
- **Verktøysamtaler i Sampling**: Oppdatert Sampling-dokumentasjon til å inkludere `tools` og `toolChoice` parametere for modellstyrt verktøysamtale under sampling-forespørsler
- **URL-modus utløsning**: La til dokumentasjon for URL-basert utløsning for serverinitierte eksterne webinteraksjoner
- **Oppgaver (Eksperimentelt)**: La til ny seksjon som dokumenterer den eksperimentelle Oppgave-funksjonen for holdbare utførelseswrappere og utsatt resultatinnhenting
- **Ikonstøtte**: Notert at verktøy, ressurser, ressursmaler og prompts nå kan inkludere ikoner som tilleggsm metadata

#### Dokumentasjonsoppdateringer
- **README.md**: Lagt til MCP-spesifikasjon 2025-11-25 versjonsreferanse og dato-basert versjoneringforklaring
- **study_guide.md**: Oppdatert pensumkart for å inkludere Oppgaver og Verktøyannotasjoner i Kjernebegreper-seksjonen; oppdatert dokumenttidsstempel

#### Spesifikasjonssamsvar verifisering
- **Protokollversjon**: Verifisert at all dokumentasjon refererer til gjeldende MCP-spesifikasjon 2025-11-25
- **Arkitekturjustering**: Bekreftet nøyaktighet i dokumentasjon for tolagersarkitektur (Datalag + Transportlag)
- **Primitive dokumentasjon**: Validert serverprimitive (Ressurser, Prompter, Verktøy) og klientprimitive (Sampling, Utløsning, Logging, Roots)
- **Transportmekanismer**: Verifisert dokumentasjonens nøyaktighet for STDIO og Streambar HTTP-transport
- **Sikkerhetsveiledning**: Bekreftet samsvar med gjeldende MCP Security Best Practices dokumentasjon

#### Viktige MCP 2025-11-25 funksjoner dokumentert
- **OpenID Connect Discovery**: Autentiseringsserverbenyttelse via OIDC
- **OAuth klient-ID metadata dokumenter**: Anbefalt klientregistreringsmekanisme
- **JSON Schema 2020-12**: Standarddialekt for MCP-skjema-definisjoner
- **SDK lagdelt system**: Formaliserte krav til SDK-funksjonsstøtte og vedlikehold
- **Styringsstruktur**: Formaliserte arbeidsgrupper og interessegrupper i MCP-styring

### Stor oppdatering for sikkerhetsdokumentasjon (02-Security/)

#### Integrasjon av MCP Security Summit Workshop (Sherpa)
- **Nytt praktisk treningsressurs**: La til omfattende integrasjon med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i all sikkerhetsdokumentasjon
- **Dekning av ekspedisjonsruten**: Dokumenterte hele leir-til-leir progresjonen fra Base Camp til Summit
- **OWASP-tilpasning**: All sikkerhetsveiledning kartlegges nå til OWASP MCP Azure Security Guide-risikoer

#### Integrasjon av OWASP MCP Top 10
- **Ny seksjon**: La til OWASP MCP Top 10 sikkerhetsrisikotabell med Azure-mitigeringer i hovedsikkerhets-README
- **Risiko-basert dokumentasjon**: Oppdatert mcp-security-controls-2025.md med OWASP MCP risiko-referanser for hvert sikkerhetsdomene
- **Referansearkitektur**: Lenket til OWASP MCP Azure Security Guide referansearkitektur og implementeringsmønstre

#### Oppdaterte sikkerhetsfiler
- **README.md**: La til Sherpa Workshop oversikt, ekspedisjonsrute-tabell, OWASP MCP Top 10 risikosammendrag og praktisk treningsseksjon
- **mcp-security-controls-2025.md**: Oppdatert topptekst til februar 2026, la til OWASP risikoer (MCP01-MCP08), fikset spesifikasjonsversjonsinkonsistens
- **mcp-security-best-practices-2025.md**: La til Sherpa- og OWASP-ressurser, oppdatert tidsstempel
- **mcp-best-practices.md**: La til praktisk treningsseksjon med Sherpa og OWASP-lenker
- **azure-content-safety-implementation.md**: La til OWASP MCP06-referanse, Sherpa Camp 3-tilpasning og tilleggseksjon for ressurser

#### Nye lenker til ressurser lagt til
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP risikosider (MCP01-MCP10)

### Pensumomfattende MCP Specification 2025-11-25-justering

#### Modul 03 - Komme i gang
- **SDK-dokumentasjon**: La til Go SDK i offisiell SDK-liste; oppdatert alle SDK-referanser for å samsvare med MCP Specification 2025-11-25
- **Transportklargjøring**: Oppdatert STDIO og HTTP Streaming transportbeskrivelser med eksplisitte spesifikasjonsreferanser

#### Modul 04 - Praktisk implementering
- **SDK-oppdateringer**: La til Go SDK; oppdatert SDK-liste med spesifikasjonsversjonsreferanse
- **Autorisasjonsspesifikasjon**: Oppdatert MCP authorization-spesifikasjonslenke til gjeldende 2025-11-25 versjon

#### Modul 05 - Avanserte emner
- **Nye funksjoner**: La til notis om nye MCP Specification 2025-11-25 funksjoner (Tasks, Verktøyannotasjoner, URL-modus utløsning, Roots)
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 og Sherpa workshop-lenker i tillegg

#### Modul 06 - Fellesskapsbidrag
- **SDK-liste**: La til Swift og Rust SDKer; oppdatert spesifikasjonslenke til 2025-11-25
- **Spesifikasjonsreferanse**: Oppdatert MCP Specification-lenke til direkte spesifikasjons-URL

#### Modul 07 - Erfaringer fra tidlig adopsjon
- **Ressursoppdateringer**: La til MCP Specification 2025-11-25-lenke og OWASP MCP Top 10 i tilleggsressurser

#### Modul 08 - Beste praksis
- **Spesifikasjonsversjon**: Oppdatert MCP Specification-referanse til 2025-11-25
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 og Sherpa workshop i tillegg

#### Modul 10 - Forenkling av AI-arbeidsflyter
- **Merkeoppdatering**: Endret MCP-versjonsbadge fra SDK-versjon (1.9.3) til spesifikasjonsversjon (2025-11-25)
- **Ressurslenker**: Oppdatert MCP Specification-lenke; la til OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs
- **Spesifikasjonsreferanse**: Oppdatert MCP Specification-lenke til 2025-11-25 versjon
- **Sikkerhetsressurser**: La til OWASP MCP Top 10 i offisielle ressurser

## 18. desember 2025

### Oppdatering av sikkerhetsdokumentasjon - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - oppdatering av spesifikasjonsversjon
- **Protokollversjonsoppdatering**: Oppdatert for å referere siste MCP Specification 2025-11-25 (utgitt 25. november 2025)
  - Oppdatert alle spesifikasjonsversjonsreferanser fra 2025-06-18 til 2025-11-25
  - Oppdatert dokumentdatoer fra 18. august 2025 til 18. desember 2025
  - Verifisert at alle spesifikasjons-URLer peker til gjeldende dokumentasjon
- **Innholdsvalidering**: Omfattende validering av sikkerhetsbeste praksis mot siste standarder
  - **Microsoft sikkerhetsløsninger**: Verifisert terminologi og lenker for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1-sikkerhet**: Bekreftet samsvar med siste OAuth sikkerhetsanbefalinger
  - **OWASP-standarder**: Validert at OWASP Top 10 for LLMs-referanser fortsatt er aktuelle
  - **Azure-tjenester**: Verifisert alle Microsoft Azure-dokumentasjonslenker og beste praksis
- **Standardtilpasning**: Alle refererte sikkerhetsstandarder bekreftet som oppdaterte
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerhets- og samsvarsrammeverk
- **Implementeringsressurser**: Validerte alle lenker til implementasjonsveiledere og ressurser
  - Azure API Management autentiseringsmønstre
  - Microsoft Entra ID integrasjonsveiledninger
  - Azure Key Vault hemmelighetshåndtering
  - DevSecOps pipelines og overvåkningsløsninger

### Dokumentasjonskvalitetssikring
- **Spesifikasjonssamsvar**: Sikret at alle obligatoriske MCP-sikkerhetskrav (MÅ/MÅ IKKE) samsvarer med siste spesifikasjon
- **Ressursaktualitet**: Verifisert alle eksterne lenker til Microsoft-dokumentasjon, sikkerhetsstandarder og implementasjonsveiledere
- **Beste praksis-dekning**: Bekreftet omfattende dekning av autentisering, autorisasjon, AI-spesifikke trusler, leverandørkjede-sikkerhet og bedriftsmønstre

## 6. oktober 2025

### Utvidelse av Komme i gang-seksjon – Avansert serverbruk og enkel autentisering

#### Avansert serverbruk (03-GettingStarted/10-advanced)
- **Ny kapittel lagt til**: Innført omfattende veiledning for avansert bruk av MCP-servere, som dekker både vanlige og lavnivå serverarkitekturer.
  - **Regulær vs. Lavnivå-Server**: Detaljert sammenligning og kodeeksempler i Python og TypeScript for begge tilnærmingene.
  - **Handler-basert Design**: Forklaring av handler-basert verktøy/ressurs/prompt-administrasjon for skalerbare, fleksible serverimplementasjoner.
  - **Praktiske Mønstre**: Virkelige scenarier hvor lavnivå-servermønstre er fordelaktige for avanserte funksjoner og arkitektur.

#### Enkel Autentisering (03-GettingStarted/11-simple-auth)
- **Nytt Kapittel lagt til**: Trinnvis veiledning for implementering av enkel autentisering i MCP-servere.
  - **Auth-konsepter**: Klar forklaring av autentisering vs. autorisasjon, og håndtering av legitimasjon.
  - **Grunnleggende Auth-implementering**: Middleware-baserte autentiseringsmønstre i Python (Starlette) og TypeScript (Express), med kodeeksempler.
  - **Fremgang til Avansert Sikkerhet**: Veiledning for å starte med enkel auth og gå videre til OAuth 2.1 og RBAC, med referanser til avanserte sikkerhetsmoduler.

Disse tilleggene gir praktisk, hands-on veiledning for å bygge mer robuste, sikre og fleksible MCP-serverimplementasjoner, som bygger bro mellom grunnleggende konsepter og avanserte produksjonsmønstre.

## 29. september 2025

### MCP Server Databaseintegrasjon Labs – Kompakt Praktisk Læringssti

#### 11-MCPServerHandsOnLabs – Ny Komplett Databaseintegrasjonsplan
- **Komplett 13-lab læringssti**: Lagt til omfattende praktisk læreplan for å bygge produksjonsklare MCP-servere med PostgreSQL-databaseintegrasjon
  - **Virkelig Implementering**: Zava Retail analysebrukstilfelle som demonstrerer bedriftsnivåmønstre
  - **Strukturert Læringsprogresjon**:
    - **Labs 00-03: Grunnlag** - Introduksjon, kjernearkitektur, sikkerhet & flerbrukermiljø, miljøoppsett
    - **Labs 04-06: Bygge MCP-serveren** - Databasedesign & skjema, MCP-serverimplementering, verktøyutvikling  
    - **Labs 07-09: Avanserte Funksjoner** - Semantisk søkeintegrasjon, testing & feilsøking, VS Code-integrasjon
    - **Labs 10-12: Produksjon & Beste praksis** - Distribusjonsstrategier, overvåking & observabilitet, optimalisering og beste praksis
  - **Bedriftsteknologier**: FastMCP-rammeverk, PostgreSQL med pgvector, Azure OpenAI-embedding, Azure Container Apps, Application Insights
  - **Avanserte Funksjoner**: Radnivåsikkerhet (RLS), semantisk søk, flerleietaker datatilgang, vektor-embedding, sanntidsovervåking

#### Terminologistandardisering – Modul til Lab-konvertering
- **Omfattende dokumentasjonsoppdatering**: Systematisk oppdatert alle README-filer i 11-MCPServerHandsOnLabs for å bruke "Lab" i stedet for "Modul"
  - **Seksjonsoverskrifter**: Endret "Hva denne modulen dekker" til "Hva denne laben dekker" i alle 13 labs
  - **Innholdsbeskrivelser**: Endret "Denne modulen gir..." til "Denne laben gir..." i dokumentasjon
  - **Læringsmål**: Endret "Ved slutten av denne modulen..." til "Ved slutten av denne laben..."
  - **Navigasjonslenker**: Endret alle "Modul XX:"-henvisninger til "Lab XX:" i kryssreferanser og navigasjon
  - **Fullføringssporing**: Oppdatert "Etter å ha fullført denne modulen..." til "Etter å ha fullført denne laben..."
  - **Beholdt tekniske referanser**: Beholdt Python-modulreferanser i konfigurasjonsfiler (f.eks. `"module": "mcp_server.main"`)

#### Studieguideforbedring (study_guide.md)
- **Visuelt læreplanskart**: Lagt til ny seksjon "11. Database Integration Labs" med oversikt over labsstrukturen
- **Repository-struktur**: Oppdatert fra ti til elleve hovedseksjoner med detaljert beskrivelse av 11-MCPServerHandsOnLabs
- **Læringsstiveiledning**: Forbedret navigasjonsinstruksjoner for seksjoner 00-11
- **Teknologidekning**: Lagt til FastMCP, PostgreSQL, Azure-tjenester og integrasjonsdetaljer
- **Læringsutfall**: Vekt på produksjonsklare servere, databaseintegrasjonsmønstre og bedriftsikkerhet

#### Hoved README-strukturforbedring
- **Lab-basert terminologi**: Oppdatert hoved README.md i 11-MCPServerHandsOnLabs for konsistent bruk av "Lab"-struktur
- **Læringsstireorganisering**: Klar progresjon fra grunnleggende konsepter til avansert implementering og produksjonsdeployering
- **Virkelighetsfokus**: Vekt på praktisk, håndfast læring med bedriftsnivåmønstre og teknologier

### Dokumentasjonskvalitet & Konsistensforbedringer
- **Hands-On læring**: Forsterket praktisk, lab-basert tilnærming i hele dokumentasjonen
- **Bedriftsmønstre**: Fremhevet produksjonsklare implementasjoner og bedriftsikkerhet
- **Teknologiintegrasjon**: Omfattende dekning av moderne Azure-tjenester og AI-integrasjonsmønstre
- **Læringsprogresjon**: Klar, strukturert sti fra grunnleggende konsepter til produksjonsdeployering

## 26. september 2025

### Case-studier Forbedring – GitHub MCP Registry-integrasjon

#### Case-studier (09-CaseStudy/) – Fokus på Økosystemutvikling
- **README.md**: Stor utvidelse med omfattende GitHub MCP Registry case-studie
  - **GitHub MCP Registry Case-studie**: Ny detaljert case-studie som undersøker GitHub sin lansering av MCP Registry i september 2025
    - **Problemstilling**: Detaljert gjennomgang av fragmentert MCP-server oppdagelse og distribusjonsutfordringer
    - **Løsningsarkitektur**: GitHubs sentraliserte registry-tilnærming med ett-klikk VS Code-installasjon
    - **Forretningspåvirkning**: Målbare forbedringer i utvikler onboarding og produktivitet
    - **Strategisk Verdi**: Fokus på modulær agentdistribusjon og tverrverktøy interoperabilitet
    - **Økosystemutvikling**: Posisjonering som grunnleggende plattform for agentisk integrasjon
  - **Forbedret struktur på case-studier**: Oppdatert alle sju case-studier med konsistent formatering og detaljerte beskrivelser
    - Azure AI Reiseselskaper: Multient-agent orkestreringsfokus
    - Azure DevOps Integrasjon: Workflow-automatisering
    - Sanntids dokumenthenting: Python konsollklient-implementering
    - Interaktiv studieplan-generator: Chainlit samtale-webapp
    - In-Editor Dokumentasjon: VS Code og GitHub Copilot-integrasjon
    - Azure API Management: Entreprisepatterns for API-integrasjon
    - GitHub MCP Registry: Økosystemutvikling og fellesskapsplattform
  - **Omfattende konklusjon**: Omskrevet konklusjonsseksjon som fremhever sju case-studier som dekker flere MCP-implementeringsdimensjoner
    - Bedriftsintegrasjon, Multi-Agent Orkestrering, Utviklerproduktivitet
    - Økosystemutvikling, Utdanningsapplikasjoner kategorisering
    - Forbedret innsikt i arkitektur, implementering og beste praksis
    - Vekt på MCP som moden, produksjonsklar protokoll

#### Studieguide-oppdateringer (study_guide.md)
- **Visuelt læreplanskart**: Oppdatert mindmap for å inkludere GitHub MCP Registry i Case Studies-seksjonen
- **Case-studier beskrivelse**: Forbedret fra generiske beskrivelser til detaljert oppdeling av sju omfattende case-studier
- **Repository-struktur**: Oppdatert seksjon 10 for å reflektere komplett case-studiedekning med konkrete implementeringsdetaljer
- **Changelog-integrasjon**: Lagt til 26. september 2025 notat som dokumenterer GitHub MCP Registry-tillegg og case-studierforbedringer
- **Datooppdateringer**: Oppdatert bunntekst med siste revisjonsdato (26. september 2025)

### Dokumentasjonskvalitetsforbedringer
- **Konsistensforbedring**: Standardisert formatering og struktur i alle sju case-studier
- **Omfattende dekning**: Case-studier dekker nå bedrifts-, utviklerproduktivitet- og økosystemscenarier
- **Strategisk posisjonering**: Økt fokus på MCP som grunnleggende plattform for agentiske systemdistribusjoner
- **Ressursintegrasjon**: Oppdaterte tilleggsmaterialer med link til GitHub MCP Registry

## 15. september 2025

### Avanserte Emner Utvidelse – Egne Transports og Kontekstringeniering

#### MCP Egne Transports (05-AdvancedTopics/mcp-transport/) – Ny Avansert Implementeringsveiledning
- **README.md**: Komplett implementeringsveiledning for egendefinerte MCP-transportmekanismer
  - **Azure Event Grid Transport**: Omfattende serverløs, hendelsesdrevet transportimplementering
    - C#, TypeScript og Python eksempler med integrasjon i Azure Functions
    - Hendelsesdrevet arkitektur for skalerbare MCP-løsninger
    - Webhook-mottakere og push-basert meldingshåndtering
  - **Azure Event Hubs Transport**: Høy gjennomstrømnings streaming-transport-implementering
    - Sanntids streaming for lav-latens scenarier
    - Partisjonering og checkpoint-håndtering
    - Meldingsbatching og ytelsesoptimalisering
  - **Bedriftsintegrasjonsmønstre**: Produksjonsklare arkitektureksempler
    - Distribuert MCP-prosessering på tvers av flere Azure Functions
    - Hybrid transportarkitektur som kombinerer flere transporttyper
    - Meldingsholdbarhet, pålitelighet og feilbehandlingsstrategier
  - **Sikkerhet & Overvåking**: Azure Key Vault-integrasjon og observabilitetsmønstre
    - Administrert identitetsautentisering og minste privilegium-tilgang
    - Application Insights telemetri og ytelsesovervåking
    - Kretsbrytere og feiltilstandsstrategier
  - **Test-rammeverk**: Omfattende teststrategier for egendefinerte transports
    - Enhetstesting med testdobler og mock-rammeverk
    - Integrasjonstesting med Azure Test Containers
    - Ytelses- og belastningstesting vurderinger

#### Kontekstringeniering (05-AdvancedTopics/mcp-contextengineering/) – Fremvoksende AI-fagfelt
- **README.md**: Omfattende utforskning av kontekstringeniering som nytt fagfelt
  - **Kjerneprinsipper**: Fullstendig kontekstdeling, beslutningsbevissthet og kontekstvindu-administrasjon
  - **MCP Protokolltilpasning**: Hvordan MCP-design adresserer kontekstringenieringsutfordringer
    - Begrensninger i kontekst-vindu og progressive innlastingsstrategier
    - Relevantbestemmelse og dynamisk konteksthenting
    - Multimodal konteksthåndtering og sikkerhetsvurderinger
  - **Implementeringsmetoder**: Single-thread vs. multi-agent arkitekturer
    - Kontekstkapping og prioriteringsteknikker
    - Progressiv kontekstlading og komprimeringsstrategier
    - Lagvis kontekstilnærming og henteoptimalisering
  - **Målerammeverk**: Fremvoksende målemetoder for evaluering av konteksteffektivitet
    - Innsats-effektivitet, ytelse, kvalitet og brukeropplevelse
    - Eksperimentelle tilnærminger for kontekstoptimalisering
    - Feilanalyse og forbedringsmetoder

#### Læreplansnavigasjonsoppdateringer (README.md)
- **Forbedret modulstruktur**: Oppdatert læreplantabell for å inkludere nye avanserte emner
  - Lagt til Kontekstringeniering (5.14) og Egendefinert Transport (5.15) oppføringer
  - Konsistent formatering og navigasjonslenker for alle moduler
  - Oppdaterte beskrivelser for å reflektere aktuell innholdsomfang

### Mappestrukturforbedringer
- **Navnestandardisering**: Endret "mcp transport" til "mcp-transport" for konsistens med andre avanserte emne-mapper
- **Innholdsorganisering**: Alle 05-AdvancedTopics mapper følger nå konsistent navnemønster (mcp-[tema])

### Dokumentasjonskvalitetsforbedringer
- **MCP-spesifikasjonstilpasning**: All nytt innhold refererer til gjeldende MCP-spesifikasjon 2025-06-18
- **Flerspråklige eksempler**: Omfattende kodeeksempler i C#, TypeScript og Python
- **Bedriftsfokus**: Produksjonsklare mønstre og Azure sky-integrasjon gjennomgående
- **Visuell dokumentasjon**: Mermaid-diagrammer for arkitektur og flytvisualisering

## 18. august 2025

### Omfattende dokumentasjonsoppdatering – MCP 2025-06-18 Standarder

#### MCP Sikkerhets Beste Praksis (02-Security/) – Full Modernisering
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullstendig omskrevet i samsvar med MCP-spesifikasjon 2025-06-18
  - **Obligatoriske Krav**: Lagt til eksplisitte MUST/MUST NOT-krav fra offisiell spesifikasjon med klare visuelle indikatorer
  - **12 Kjerne Sikkerhetspraksiser**: Restrukturert fra 15-punkts liste til omfattende sikkerhetsdomener
    - Token-sikkerhet & autentisering med ekstern identitetsleverandørintegrasjon
    - Sesjonshåndtering & transport-sikkerhet med kryptografiske krav
    - AI-spesifikk trusselbeskyttelse med Microsoft Prompt Shields-integrasjon
    - Tilgangskontroll & tillatelser med minste privilegium
    - Innholdssikkerhet & overvåking med Azure Content Safety-integrasjon
    - Supply Chain-sikkerhet med omfattende komponentverifisering
    - OAuth sikkerhet & Confused Deputy-beskyttelse med PKCE-implementering
    - Hendelseshåndtering & gjennoppretting med automatiserte kapabiliteter
    - Overholdelse & styring med regulatorisk tilpasning
    - Avanserte sikkerhetskontroller med zero trust arkitektur
    - Microsoft sikkerhetsøkosystemintegrasjon med omfattende løsninger
    - Kontinuerlig sikkerhetsevolusjon med adaptive metoder
  - **Microsoft sikkerhetsløsninger**: Forbedret integrasjonsveiledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security
  - **Implementeringsressurser**: Kategoriserte omfattende ressurslenker etter Offisiell MCP-dokumentasjon, Microsoft-sikkerhetsløsninger, sikkerhetsstandarder og implementeringsguider

#### Avanserte Sikkerhetskontroller (02-Security/) – Bedriftsimplementering
- **MCP-SECURITY-CONTROLS-2025.md**: Fullstendig revisjon med bedriftsnivå sikkerhetsrammeverk
  - **9 Omfattende Sikkerhetsdomener**: Utvidet fra grunnleggende kontroller til detaljert bedriftsrammeverk
    - Avansert autentisering & autorisasjon med Microsoft Entra ID-integrasjon
    - Token-sikkerhet & Anti-Passthrough-kontroller med omfattende validering
    - Sesjonssikkerhetskontroller med forhindre kapring
    - AI-spesifikke sikkerhetskontroller med prompt injection og verktøytoksinforhindring
    - Confused Deputy-angrepsforebygging med OAuth proxy-sikkerhet
    - Verktøykjøringssikkerhet med sandboxing og isolasjon
    - Supply Chain sikkerhetskontroller med avhengighetsverifisering
    - Overvåkings- & deteksjonskontroller med SIEM-integrasjon
    - Hendelseshåndtering & gjennoppretting med automatiserte kapabiliteter
  - **Implementeringseksempler**: Lagt til detaljerte YAML-konfigurasjonsblokker og kodeeksempler
  - **Microsoft-løsningsintegrasjon**: Omfattende dekning av Azure-sikkerhetstjenester, GitHub Advanced Security og bedrifts identitetsstyring

#### Avanserte Emner Sikkerhet (05-AdvancedTopics/mcp-security/) – Produksjonsklar Implementering
- **README.md**: Full omskriving for bedriftsikkerhetsimplementering
  - **Gjeldende Spesifikasjonstilpasning**: Oppdatert til MCP Spesifikasjon 2025-06-18 med obligatoriske sikkerhetskrav
  - **Forbedret Autentisering**: Microsoft Entra ID-integrasjon med omfattende .NET og Java Spring Security-eksempler
  - **AI Sikkerhetsintegrasjon**: Microsoft Prompt Shields og Azure Content Safety-implementering med detaljerte Python-eksempler
  - **Avansert Trusselmitigering**: Omfattende implementeringseksempler for
    - Confused Deputy Angrepsbeskyttelse med PKCE og validering av bruker-samtykke
    - Token Passthrough-forebygging med publikumvalidering og sikker tokenhåndtering
- Forebygging av session hijacking med kryptografisk binding og atferdsanalyse
- **Integrering i bedriftsikkerhet**: Azure Application Insights-overvåking, trusseldeteksjonspipelines og leverandørkjede-sikkerhet
- **Implementeringssjekkliste**: Klare obligatoriske vs. anbefalte sikkerhetskontroller med fordeler fra Microsofts sikkerhetsøkosystem

### Dokumentasjonskvalitet og standardtilpasning
- **Spesifikasjonsreferanser**: Oppdaterte alle referanser til gjeldende MCP-spesifikasjon 2025-06-18
- **Microsoft sikkerhetsøkosystem**: Forbedret integrasjonsveiledning gjennom all sikkerhetsdokumentasjon
- **Praktisk implementering**: Lagt til detaljerte kodeeksempler i .NET, Java og Python med bedriftsmønstre
- **Ressursorganisering**: Omfattende kategorisering av offisiell dokumentasjon, sikkerhetsstandarder og implementeringsguider
- **Visuelle indikatorer**: Klar merking av obligatoriske krav vs. anbefalte praksiser


#### Kjernebegreper (01-CoreConcepts/) – Fullstendig modernisering
- **Protokollversjonsoppdatering**: Oppdatert til å referere til gjeldende MCP-spesifikasjon 2025-06-18 med datobasert versjonering (YYYY-MM-DD-format)
- **Arkitekturfinepuss**: Forbedrede beskrivelser av Hosts, Clients og Servers for å reflektere nåværende MCP-arkitekturmønstre
  - Hosts nå tydelig definert som AI-applikasjoner som koordinerer flere MCP-klienttilkoblinger
  - Klienter beskrevet som protokollkoblinger som opprettholder én-til-én serverforhold
  - Servere forbedret med lokale vs. eksterne distribusjonsscenarier
- **Primitive omstrukturering**: Fullstendig overhaling av server- og klientprimitive
  - Serverprimitive: Ressurser (datakilder), Prompter (maler), Verktøy (utførbare funksjoner) med detaljerte forklaringer og eksempler
  - Klientprimitive: Sampling (LLM fullføringer), Elicitation (brukerinndata), Logging (feilsøking/overvåking)
  - Oppdatert med nåværende oppdagelsesmetoder (`*/list`), henting (`*/get`) og utføringsmetoder (`*/call`)
- **Protokollarkitektur**: Innført to-lags arkitekturmodell
  - Datalag: JSON-RPC 2.0 fundament med livssyklushåndtering og primitive
  - Transportlag: STDIO (lokal) og Streamable HTTP med SSE (fjern-)transportmekanismer
- **Sikkerhetsrammeverk**: Omfattende sikkerhetsprinsipper inkludert eksplisitt brukersamtykke, dataprivacybeskyttelse, sikkerhet ved verktøyutførelse og transportsikkerhet
- **Kommunikasjonsmønstre**: Oppdaterte protokollmeldinger som viser initialisering, oppdagelse, utføring og varsling
- **Kodeeksempler**: Oppfriskede flerspråklige eksempler (.NET, Java, Python, JavaScript) for å reflektere nåværende MCP SDK-mønstre

#### Sikkerhet (02-Security/) – Omfattende sikkerhetsrevisjon  
- **Standardtilpasning**: Full tilpasning til MCP-spesifikasjon 2025-06-18 sikkerhetskrav
- **Autentiseringsutvikling**: Dokumentert utvikling fra tilpassede OAuth-servere til ekstern identitetsleverandør-delegering (Microsoft Entra ID)
- **AI-spesifikk trusselanalyse**: Forbedret dekning av moderne AI-angrepsvektorer
  - Detaljerte scenarioer for prompt injection-angrep med virkelige eksempler
  - Mekanismer for verktøyforgiftning og "rug pull"-angrepsmønstre
  - Forgiftning av kontekstvinduer og modellforvirringsangrep
- **Microsoft AI-sikkerhetsløsninger**: Omfattende dekning av Microsofts sikkerhetsøkosystem
  - AI Prompt Shields med avansert deteksjon, spotlighting og skilleteknikker
  - Azure Content Safety-integrasjonsmønstre
  - GitHub Advanced Security for leverandørkjede-beskyttelse
- **Avansert trusselmitigering**: Detaljerte sikkerhetskontroller for
  - Session hijacking med MCP-spesifikke angrepsscenarioer og kryptografiske session-ID-krav
  - Confused deputy-problemer i MCP-proxy-scenarier med eksplisitte samtykkekrav
  - Token passthrough-sårbarheter med obligatoriske valideringskontroller
- **Leverandørkjede-sikkerhet**: Utvidet dekning av AI-leverandørkjeder inkludert grunnmodeller, embeddings-tjenester, kontekstleverandører og tredjeparts-API-er
- **Foundation sikkerhet**: Forbedret integrasjon med bedriftsikkerhetsmønstre inkludert zero trust-arkitektur og Microsofts sikkerhetsøkosystem
- **Ressursorganisering**: Kategoriserte omfattende ressurslenker etter type (offisielle dokumenter, standarder, forskning, Microsoft-løsninger, implementeringsguider)

### Forbedringer i dokumentasjonskvalitet
- **Strukturerte læringsmål**: Forbedrede læringsmål med spesifikke, handlingsrettede utfall
- **Kryssreferanser**: Lagt til lenker mellom relaterte sikkerhets- og kjernebegrepsemner
- **Aktuell informasjon**: Oppdatert alle datoreferanser og spesifikasjonslenker til gjeldende standarder
- **Implementeringsveiledning**: Lagt til spesifikke, handlingsrettede implementeringsretningslinjer i begge seksjoner

## 16. juli 2025

### README og navigasjonsforbedringer
- Fullstendig redesignet lærekurrikulumnavigasjon i README.md
- Erstattet `<details>`-tagger med mer tilgjengelig tabellbasert format
- Opprettet alternative layoutvalg i ny "alternative_layouts"-mappe
- Lagt til kortbaserte, fanebaserte og trekkliste-navigasjonseksempler
- Oppdatert repository-strukturseksjon til å inkludere alle nyeste filer
- Forbedret "Hvordan bruke dette lærekurset"-seksjon med klare anbefalinger
- Oppdaterte MCP-spesifikasjonslenker til riktige URL-er
- Lagt til seksjon for Kontext Engineering (5.14) i lærekursets oppbygging

### Oppdateringer i studieguide
- Fullstendig revidert studieguide for å samsvare med nåværende repository-struktur
- Lagt til nye seksjoner for MCP-klienter og -verktøy, og populære MCP-servere
- Oppdatert det visuelle lærekartet for å nøyaktig reflektere alle emner
- Forbedret beskrivelser av avanserte temaer for å dekke alle spesialiserte områder
- Oppdatert casestudier for å reflektere faktiske eksempler
- Lagt til denne omfattende endringsloggen

### Bidrag fra fellesskapet (06-CommunityContributions/)
- Lagt til detaljert informasjon om MCP-servere for bildegenerering
- Lagt til omfattende seksjon om bruk av Claude i VSCode
- Lagt til oppsett og bruksanvisning for Cline terminalklient
- Oppdatert MCP-klientseksjon til å inkludere alle populære klientalternativer
- Forbedret bidrags-eksempler med mer nøyaktige kodeeksempler

### Avanserte temaer (05-AdvancedTopics/)
- Organisert alle spesialiserte temamapper med konsistent navngivning
- Lagt til kontekst-engineering-materialer og eksempler
- Lagt til Foundry agent-integrasjonsdokumentasjon
- Forbedret Entra ID sikkerhetsintegrasjonsdokumentasjon

## 11. juni 2025

### Første utgivelse
- Utgitt første versjon av MCP for Beginners-kurset
- Opprettet grunnleggende struktur for alle 10 hovedseksjoner
- Implementert visuelt lærekart for navigasjon
- Lagt til innledende prøveprosjekter i flere programmeringsspråk

### Komme i gang (03-GettingStarted/)
- Opprettet første eksempler på serverimplementeringer
- Lagt til veiledning for klientutvikling
- Inkludert instruksjoner for LLM-klientintegrasjon
- Lagt til dokumentasjon for VS Code-integrasjon
- Implementert Server-Sent Events (SSE) servereksempler

### Kjernebegreper (01-CoreConcepts/)
- Lagt til detaljert forklaring av klient-server arkitektur
- Opprettet dokumentasjon på nøkkelprotokollkomponenter
- Dokumentert meldingsmønstre i MCP

## 23. mai 2025

### Repository-struktur
- Initialisert repository med grunnleggende mappestruktur
- Opprettet README-filer for hver hovedseksjon
- Oppsatt oversettelsesinfrastruktur
- Lagt til bilde-ressurser og diagrammer

### Dokumentasjon
- Opprettet innledende README.md med oversikt over læreplanen
- Lagt til CODE_OF_CONDUCT.md og SECURITY.md
- Opprettet SUPPORT.md med veiledning for å få hjelp
- Opprettet foreløpig studieguide-struktur

## 15. april 2025

### Planlegging og rammeverk
- Innledende planlegging for MCP for Beginners-kurset
- Definerte læringsmål og målgruppe
- Skisset opp 10-seksjons oppbygging av læreplanen
- Utviklet konseptuelt rammeverk for eksempler og casestudier
- Opprettet innledende prototyp-eksempler for nøkkelkonsepter

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->