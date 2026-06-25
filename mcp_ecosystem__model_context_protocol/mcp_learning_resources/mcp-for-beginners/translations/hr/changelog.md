# Changelog: MCP za početnike - Kurikulum

Ovaj dokument služi kao zapis svih značajnih promjena napravljenih u Model Context Protocol (MCP) za početnike kurikulumu. Promjene su zabilježene obrnutim kronološkim redoslijedom (najnovije promjene prve).

## 24. lipnja 2026.

### Nova lekcija: Korištenje MCP-a u Copilot aplikaciji

- [Sekcija alata](./12-tooling/README.md) Dodana sekcija alata.
- [MCP u Copilot aplikaciji](./12-tooling/01-copilot-app/README.md)

## 16. lipnja 2026.

### Usuglašavanje MCP specifikacije i validacija primjera

Validiran je kurikulum u odnosu na trenutačnu **MCP specifikaciju 2025-11-25** i najnovije službene SDK-ove, zatim su ispravljene preostale zastarjele specifikacijske reference i potvrđeno da osnovni primjeri i dalje rade i kompajliraju se.

#### Ispravci verzije specifikacije (2025-06-18 / 2025-03-26 → 2025-11-25)

Ažuriran je engleski sadržaj gdje se još uvijek tvrdilo da je starija revizija specifikacije *trenutni/najnoviji* standard, a linkovi su preusmjereni na kanonske `modelcontextprotocol.io` putanje specifikacije:
- **05-AdvancedTopics/mcp-security/README.md**: Ažurirani banner "Current Standard", uvod, naslov jezgrenih sigurnosnih načela, naslov obaveznih zahtjeva, sekcija Microsoft Entra ID, veze na Reference i Resurse, te završna sigurnosna napomena (8 referenci) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Ažurirana veza na dodatne resurse specifikacije i banner "Current Standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamijenjen zastarjeli link `2025-03-26` za sigurnost i povjerenje s trenutačnom stranom najboljih sigurnosnih praksi 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Ažuriran link na službene dokumente o uzorkovanju na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Ažurirana referenca u sadašnjem vremenu "trenutna MCP specifikacija" i veza na dodatne resurse na 2025-11-25 (povijesne bilješke o zabrani SSE su ostale netaknute radi točnosti)

#### Validacija primjera u odnosu na trenutačne SDK-ove

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` je riješio `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` nije prijavio greške tipova — postojeći `McpServer`/`StdioServerTransport` API-ji ostaju valjani
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validirano u izoliranom `.venv` s `mcp[cli]` (1.27.2); `py_compile` je prošao i `FastMCP.list_tools()` je ispravno vratio alate `add` i `subtract`
- Potvrđeno da svi primjeri s verzijskim ograničenjima `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) uredno rješavaju na trenutačni `1.29.0` bez prekidajućih API promjena

#### Usklađivanje verzija ovisnosti (zatvaranje verzijskih praznina)

Ažurirane zastarjele verzije SDK pinova kako bi svaki primjer pratio trenutni MCP release, usklađeno s konvencijom u cijelom repozitoriju:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Povećan `@modelcontextprotocol/sdk` s `^1.8.0` → `>=1.26.0` i ažuriran zastarjeli opis paketa `"updated for MCP 2025-06-18"` u `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** i **lab4/code/github_mcp_server/pyproject.toml**: Povećan pin `mcp==1.23.0` → `mcp>=1.26.0`; regenerirani oba `uv.lock` datoteke (`uv lock`) tako da lockfile-ovi rješavaju na trenutačni `mcp 1.27.2` i ostaju sinkronizirani s manifestima

#### Analiza praznina u kurikulumu — pokrivenost najnovijih značajki specifikacije

Potvrđeno je da kurikulum već pokriva sve primitivne značajke uvedene/razrađene u MCP 2025-11-25, tako da nema praznina u sadržaju:
- **Uzorkovanje**: Lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Eliciranje (uključujući URL način rada)**: Dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Korijeni**: Dokumentirano u 00-Introduction, 01-CoreConcepts i 05-AdvancedTopics/mcp-root-contexts
- **Zadaci (eksperimentalni, dugotrajni operacije)**: Dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Bilješke alata** (`readOnlyHint` / `destructiveHint`): Dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features

### Ojačavanje sigurnosti i uklanjanje ranjivosti ovisnosti

Proveden je potpuni sigurnosni pregled svih ovisničkih manifestacija i izvornog koda primjera, nakon čega su riješene sve prijavljene npm sigurnosne preporuke i jedna sigurnosna greška na razini koda. Nakon popravka, `npm audit` prijavljuje **0 ranjivosti** u svim pregledanim direktorijima.

#### npm ranjivosti ovisnosti (transitivne) — ispravljene

Pregledano svih 15 predanih `package-lock.json` datoteka. Ranjivosti su bile ograničene na tranzitivne ovisnosti koje koriste MCP Inspector alat za razvoj, OpenAI klijent i MCP SDK; sve su sada riješene bez prekida primjera:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** i **lab3/code/weather_mcp/inspector**: Povećan `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), što je uklonilo prijave vezane za ugrađene `ajv`, `brace-expansion`, `diff`, `path-to-regexp` i `ws`. Dodan npm `overrides` unos koji forsira ispravljeni `shell-quote@1.8.4` za uklanjanje posljednje kritične preporuke koju je nosio `concurrently`; regenerirani lockfile-ovi (sada 0 ranjivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` je ažurirao tranzitivni `qs` (umjereno) na ispravljenu verziju
- **03-GettingStarted/samples/javascript**: `npm audit fix` je ažurirao tranzitivni `hono` (umjereno) na ispravljenu verziju
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` je ažurirao tranzitivni `form-data` (visoko) na ispravljenu verziju
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana je nedostajuća `package-lock.json` da projekt bude reproducibilan i moguće ga je auditirati (0 ranjivosti)

#### Sigurnosni popravak na razini koda (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Uklonjen `shell=True` iz `open_in_vscode` alata. Prijašnji `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` je dopuštao da znakovi ljuske u putanji mape budu interpretirani od strane `cmd.exe` (vektor za napad ubrizgavanjem naredbi). Sada pokreće direktno razriješeni `Code.exe` s mapom kao argumentom — bez ljuske — što je funkcionalno ekvivalentno i sigurno

#### Revizija ovisnosti za Python

- Pregledani su svi Python zahtjevi koristeći `pip-audit`. `05-AdvancedTopics` i `03-GettingStarted/samples/python` nisu prijavili **nikakve ranjivosti** (njihova `mcp` / `httpx` / `pydantic` / `python-dotenv` ograničenja rješavaju se na ispravljene verzije)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je označio tranzitivnu ovisnost **`werkzeug` 3.1.1** s tri DoS preporuke vezane uz `safe_join` Windows nazive uređaja — `CVE-2025-66221`, `CVE-2026-21860` i `CVE-2026-27199` (sve ispravljeno u verziji 3.1.6). Dodan je eksplicitan sigurnosni pin `werkzeug>=3.1.6` tako da se rješava ispravljena verzija; potvrđeno da se ograničenje uredno rješava u `chainlit` / `mcp` / `semantic-kernel` stogu

### Rebrendiranje imena proizvoda

Ažuriran je sav sadržaj kurikuluma kako bi se odrazila Microsoftova promjena imena proizvoda:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Ažuriran Discord link zajednice
- **AGENTS.md**: Ažurirana referenca na Discord server
- **README.md**: Ažurirane reference tehnološkog ekosustava
- **study_guide.md**: Ažurirane reference studija slučaja
- **05-AdvancedTopics/README.md**: Ažuriran naslov i opis Modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Ažuriran naslov sekcije i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Potpuno ažuriranje naslova i sadržaja modula
- **05-AdvancedTopics/mcp-security-entra/README.md**: Ažuriran interni link
- **07-LessonsfromEarlyAdoption/README.md**: Ažurirane reference studija slučaja
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Ažuriran naslov Sekcije 9, bedževi i mogućnosti
- **08-BestPractices/README.md**: Ažuriran Discord link zajednice
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Ažurirana referenca na Discord kanal
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Ažurirana referenca postavljanja modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Ažurirana tablica AI usluga
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Ažurirane reference resursa

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension za VS Code
- **README.md**: Ažurirane glavne reference kurikuluma
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Ažurirani naslov modula, pregled i svi naslovi modula
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Ažurirani naslov, ciljevi učenja, upute za postavljanje i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Ažurirani naslov, ciljevi učenja, tablica MCP hostova i križne reference
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Ažurirani naslov, bedževi, preduvjeti i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Ažurirane reference Agent Buildera i link za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Ažurirani preduvjeti i reference ekstenzije

---

## 11. travnja 2026.

### Nova lekcija, popravci dokumentacije i ažuriranja ovisnosti

#### Novi sadržaj kurikuluma dodan

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Protumačenje višestrukih agenata s MCP-om u protivničkom pristupu** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novi sveobuhvatni vodič koji pokriva obrazac protivničke debate za višestruke agente
  - Mermaid dijagram arhitekture: dva agenta → zajednički MCP server → transkript debate → sudac → presuda
  - Zajednički MCP poslužitelj alata (`web_search` + `run_python`) implementiran u Pythonu i TypeScriptu
  - Suprotstavljene sistemske upute (ZA / PROTIV / Sudac) s eksplicitnim zahtjevima za korištenje alata
  - Orkestrator debate u Pythonu, TypeScriptu i C# koji upravlja rundama i usmjerava argumente
  - MCP `ClientSession` povezivanje za orkestrator do stvarnih poziva alata
  - Tablica primjera uporabe (otkrivanje halucinacija, modeliranje prijetnji, pregled dizajna API-ja, faktografska provjera, tehnička selekcija)
  - Sigurnosni aspekti: izvođenje u izolaciji, validacija poziva alata, ograničenje stope poziva, zapisivanje revizije
  - Strukturirana vježba s tri praktična scenarija (pregled koda, odluka o arhitekturi, moderacija sadržaja)

#### Popravci dokumentacije

**Modul 03 - Početak rada**
- **05-stdio-server/README.md**: Popravljen nepotpun TypeScript stdio server primjer — dodana instancija transporta (`new StdioServerTransport()`) i poziv `server.connect(transport)` kako bi se uskladilo s primjerima u Pythonu i .NET-u u istoj sekciji
- **14-sampling/README.md**: Ispravak tipfelera — ispravljeno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Ažuriranja kurikuluma

**Glavni README.md**
- Dodan redak 5.17 (Protumačenje višestrukih agenata s MCP-om u protivničkom pristupu) u tablicu kurikuluma s direktnim linkom na novu lekciju

**05-AdvancedTopics/README.md**
- Dodan redak lekcije 5.17 u tablicu lekcija

**study_guide.md**
- Dodana tema Protumačenja višestrukih agenata u protivničkom pristupu u konceptualnu mapu i prozni opis Naprednih tema

#### Popravci koda i sigurnosti

**Modul 05 - Protivnički agenti (`mcp-adversarial-agents`)**
- **Sigurnosna ispravka — injekcija naredbi**: Zamijenjena shell interpolacija `execSync` s `execFile` + `promisify` u TypeScript alatu `run_python`, eliminirajući površinu za injekciju naredbi (LLM-kontrolirani kod sada se prosljeđuje kao doslovni argv element bez ikakve uključenosti shell-a)
- **Povezivanje petlje MCP alata**: Ažuriran Python orkestrator debata da koristi `AsyncAnthropic` klijent (zamijenivši blokirajući sinkroni `Anthropic`), prosljeđuje živi `ClientSession` direktno svakom potezu agenta, dohvaća definicije alata preko `session.list_tools()` u svakom potezu, i šalje blokove `tool_use` preko `session.call_tool()` u petlji dok model ne emitira konačni tekstualni odgovor

#### Ažuriranja ovisnosti

- Ažuriran `hono` na verziju 4.12.12 u više paketa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Ažuriran `@hono/node-server` s 1.19.11 na 1.19.13 u TypeScript paketima
- Ažuriran `cryptography` s 46.0.5 na 46.0.7 u Python paketima (10-StreamliningAIWorkflows laboratoriji 3 i 4)
- Ažuriran `lodash` s 4.17.23 na 4.18.1 u 10-StreamliningAIWorkflows inspektoru

#### Prijevodi

- Sinkronizirani prijevodi za 48+ jezika s najnovijim promjenama izvornog koda (i18n ažuriranje)

---

## 5. veljače 2026.

### Poboljšanja validacije i navigacije kroz cijeli repozitorij

#### Novi kurikulum sadržaj dodan

**Modul 03 - Početak rada**
- **12-mcp-hosts/README.md**: Novi sveobuhvatni vodič za postavljanje MCP hostova
  - Primjeri konfiguracije Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON predlošci konfiguracije za sve glavne hostove
  - Tablica usporedbe tipova prijenosa (stdio, SSE/HTTP, WebSocket)
  - Rješavanje čestih problema s vezom
  - Najbolje sigurnosne prakse za konfiguraciju hosta

- **13-mcp-inspector/README.md**: Novi vodič za otklanjanje pogrešaka za MCP Inspektor
  - Metode instalacije (npx, globalni npm, iz izvornog koda)
  - Povezivanje na servere preko stdio i HTTP/SSE
  - Alati za testiranje, resursi i tijekovi rada prompta
  - Integracija VS Code s MCP Inspektorom
  - Uobičajeni scenariji otklanjanja pogrešaka i rješenja

**Modul 04 - Praktična implementacija**
- **pagination/README.md**: Novi vodič za implementaciju paginacije
  - Obrasci paginacije temeljene na kursoru u Pythonu, TypeScriptu, Javi
  - Rukovanje paginacijom na strani klijenta
  - Strategije dizajna kursora (neprozirni vs. strukturirani)
  - Preporuke za optimizaciju performansi

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Novi dubinski pregled protokolskih značajki
  - Implementacija obavijesti o napretku
  - Obrasci otkazivanja zahtjeva
  - Predlošci resursa s URI obrascima
  - Upravljanje životnim ciklusom servera
  - Kontrola razine zapisivanja
  - Obrasci obrade pogrešaka s JSON-RPC kodovima

#### Popravci navigacije (ažurirano 24+ datoteka)

**Glavne modul READMEs**
 Sada poveznice vode i na prvi lekciju I na sljedeći modul

**Poddatoteke 02-Sigurnost**
- Svi 5 pratećih sigurnosnih dokumenata sada imaju navigaciju "Što slijedi":

**Datoteke 09-CaseStudy**
- Svi case study dokumenti sada imaju sekvencijalnu navigaciju:

**Laboratoriji 10-StreamliningAI**
Dodana sekcija Što slijedi u pregledu Modula 10 i Modula 11

#### Popravci koda i sadržaja

**Ažuriranja SDK-a i ovisnosti**
Ispravljena prazna verzija openai na `^4.95.0`
Ažuriran SDK s `^1.8.0` na `>=1.26.0`
Ažurirane oznake verzije mcp na `>=1.26.0`

**Popravci koda**
Ispravljena nevažeća verzija modela `gpt-4o-mini` u `gpt-4.1-mini`

**Popravci sadržaja**
Ispravljena neispravna poveznica `READMEmd` → `README.md`, ispravljen zaglavlje kurikuluma `Module 1-3` → `Module 0-3`, ispravljena putanja osjetljiva na velika i mala slova
Uklonjen oštećeni duplicirani sadržaj Case Study 5

**Poboljšanja za početnike**
Dodan ispravan uvod, ciljevi učenja i preduvjeti za početnike

#### Ažuriranja kurikuluma

**Glavni README.md**
- Dodani unos 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginacija), 5.16 (Značajke protokola) u tablicu kurikuluma

**Modul READMEs**
Dodane lekcije 12 i 13 u listu lekcija
Dodana sekcija Praktični vodiči s poveznicom na paginaciju
Dodane lekcije 5.15 (Prilagođeni prijenos) i 5.16 (Značajke protokola)

**study_guide.md**
- Ažurirana mentalna karta s temama: MCP Hosts Setup, MCP Inspector, Strategije paginacije, Dubinski pregled značajki protokola

## 28. siječnja 2026.

### Pregled usklađenosti s MCP specifikacijom 2025-11-25

#### Unapređenje temeljnih koncepata (01-CoreConcepts/)
- **Novi klijentski primitiv - Roots**: Dodana sveobuhvatna dokumentacija o Roots primitivu klijenta, omogućujući serverima razumijevanje granica datotečnog sustava i pristupnih dozvola
- **Anotacije alata**: Dodana dokumentacija o ponašajnim anotacijama alata (`readOnlyHint`, `destructiveHint`) za bolje odluke u izvršavanju alata
- **Pozivanje alata u uzorkovanju**: Ažurirana dokumentacija o uzorkovanju s uključenim parametrima `tools` i `toolChoice` za modelom vođeno pozivanje alata tijekom zahtjeva za uzorkovanje
- **URL način poticanja**: Dodana dokumentacija o poticanju putem URL-a za vanjske mrežne interakcije inicirane serverom
- **Zadaci (eksperimentalno)**: Dodana nova sekcija koja dokumentira eksperimentalnu značajku Zadataka za trajne omotnice izvršavanja i odgođeno dohvaćanje rezultata
- **Podrška za ikone**: Napomena da alati, resursi, predlošci resursa i prompte sada mogu uključivati ikone kao dodatne metapodatke

#### Ažuriranja dokumentacije
- **README.md**: Dodana referenca MCP Specifikacije 2025-11-25 i objašnjenje verzioniranja prema datumu
- **study_guide.md**: Ažurirana karta kurikuluma kako uključuje Zadatke i anotacije alata u sekciji Temeljni koncepti; ažurirana vremenska oznaka dokumenta

#### Verifikacija usklađenosti specifikacije
- **Verzija protokola**: Potvrđene sve reference dokumentacije na aktualnu MCP Specifikaciju 2025-11-25
- **Poravnanje arhitekture**: Potvrđena točnost dokumentacije dvoslojne arhitekture (Data Layer + Transport Layer)
- **Dokumentacija primitiva**: Provjereni server primitives (Resursi, Prompte, Alati) i klijentski primitiv (Uzorkovanje, Poticanje, Zapisivanje, Roots)
- **Transportni mehanizmi**: Provjerena točnost dokumentacije za STDIO i Streamable HTTP transport
- **Sigurnosne smjernice**: Potvrđen usklađen sadržaj s aktualnim MCP sigurnosnim najboljim praksama

#### Ključne MCP 2025-11-25 značajke dokumentirane
- **Otkrivanje OpenID Connect**: Otkrivanje servera za identitet putem OIDC
- **OAuth Client ID metapodaci dokumenata**: Preporučeni mehanizam registracije klijenta
- **JSON Schema 2020-12**: Zadani dijalekt za MCP definicije shema
- **SDK hijerarhijski sustav**: Formalizirani zahtjevi za podršku i održavanje SDK značajki
- **Struktura upravljanja**: Formalizirane radne skupine i interesne skupine u MCP upravljanju

### Glavno ažuriranje sigurnosne dokumentacije (02-Security/)

#### Integracija MCP Security Summit Workshop (Sherpa)
- **Novi praktični resurs za obuku**: Dodana sveobuhvatna integracija s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kroz cijelu sigurnosnu dokumentaciju
- **Pokriće rute ekspedicije**: Dokumentiran kompletan tijek od Base Camp do Summit kampa
- **Poravnanje s OWASP**: Sve sigurnosne smjernice sada su u skladu s OWASP MCP Azure sigurnosnim vodičem i rizicima

#### Integracija OWASP MCP Top 10
- **Nova sekcija**: Dodan tablica OWASP MCP Top 10 sigurnosnih rizika sa Azure mitigacijama u glavnom sigurnosnom README-u
- **Dokumentacija temeljena na riziku**: Ažuriran mcp-security-controls-2025.md s OWASP MCP referencama rizika za svaki sigurnosni domen
- **Referentna arhitektura**: Poveznica na OWASP MCP Azure Security Guide referentnu arhitekturu i obrasce implementacije

#### Ažurirane sigurnosne datoteke
- **README.md**: Dodan pregled Sherpa radionice, tablica rute ekspedicije, sažetak OWASP MCP Top 10 rizika i sekcija praktične obuke
- **mcp-security-controls-2025.md**: Ažurirano zaglavlje na veljaču 2026., dodane OWASP referencije rizika (MCP01-MCP08), ispravljena nedosljednost verzije specifikacije
- **mcp-security-best-practices-2025.md**: Dodana sekcija Sherpa i OWASP resursa, ažurirana vremenska oznaka
- **mcp-best-practices.md**: Dodana sekcija praktične obuke s poveznicama na Sherpa i OWASP
- **azure-content-safety-implementation.md**: Dodana OWASP MCP06 referenca, usklađenost sa Sherpa Camp 3 i dodatna sekcija resursa

#### Dodani novi poveznici na resurse
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pojedinačne OWASP MCP stranice rizika (MCP01-MCP10)

### Poravnanje MCP specifikacije 2025-11-25 kroz cijeli kurikulum

#### Modul 03 - Početak rada
- **SDK dokumentacija**: Dodan Go SDK na službenu listu SDK-a; ažurirane sve SDK reference u skladu s MCP Specifikacijom 2025-11-25
- **Pojašnjenje prijevoza**: Ažurirani opisi STDIO i HTTP Streaming prijenosa s eksplicitnim referencama na specifikaciju

#### Modul 04 - Praktična implementacija
- **SDK ažuriranja**: Dodan Go SDK; ažurirana SDK lista sa verzijom specifikacije
- **Specifikacija autorizacije**: Ažuriran MCP Authorization link na trenutnu verziju 2025-11-25

#### Modul 05 - Napredne teme
- **Nove značajke**: Dodana napomena o novim MCP Specifikacija 2025-11-25 značajkama (Zadaci, Anotacije alata, URL način poticanja, Roots)
- **Sigurnosni resursi**: Dodane poveznice OWASP MCP Top 10 i Sherpa radionice u dodatnu literaturu

#### Modul 06 - Zajednički doprinosi
- **Lista SDK-a**: Dodani Swift i Rust SDK; ažuriran link specifikacije na 2025-11-25
- **Referenca specifikacije**: Ažurirana MCP Specifikacija na izravni URL specifikacije

#### Modul 07 - Lekcije iz ranih usvajanja
- **Ažuriranja resursa**: Dodan MCP Specifikacija 2025-11-25 link i OWASP MCP Top 10 u dodatne resurse

#### Modul 08 - Najbolje prakse
- **Verzija specifikacije**: Ažurirana MCP Specifikacija na 2025-11-25
- **Sigurnosni resursi**: Dodane OWASP MCP Top 10 i Sherpa radionica u dodatnu literaturu

#### Modul 10 - Optimiziranje AI tijekova rada
- **Ažuriranje značke**: MCP verzija promijenjena s verzije SDK (1.9.3) na verziju specifikacije (2025-11-25)
- **Poveznice na resurse**: Ažuriran MCP Specifikacija link; dodan OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On laboratoriji
- **Referenca specificikacije**: Ažuriran MCP Specifikacija link na verziju 2025-11-25
- **Sigurnosni resursi**: Dodan OWASP MCP Top 10 u službene resurse

## 18. prosinca 2025.

### Ažuriranje sigurnosne dokumentacije - MCP Specifikacija 2025-11-25

#### Najbolje sigurnosne prakse MCP-a (02-Security/mcp-best-practices.md) - Ažuriranje verzije specifikacije
- **Ažuriranje verzije protokola**: Ažurirano na referencu najnovije MCP Specifikacije 2025-11-25 (objavljeno 25. studenog 2025)
  - Ažurirane sve reference verzije specifikacije s 2025-06-18 na 2025-11-25
  - Ažurirani datumi dokumenta s 18. kolovoza 2025 na 18. prosinca 2025
  - Provjereno da sve URL-ove specifikacije vode na važeću dokumentaciju
- **Validacija sadržaja**: Sveobuhvatna provjera sigurnosnih najboljih praksi u skladu s najnovijim standardima
  - **Microsoft sigurnosna rješenja**: Provjereni aktualni termini i poveznice za Prompt Shields (ranije "detekcija rizika jailbreaka"), Azure Content Safety, Microsoft Entra ID i Azure Key Vault
  - **OAuth 2.1 sigurnost**: Potvrđena usklađenost s najnovijim sigurnosnim praksama OAuth-a
  - **OWASP standardi**: Provjerene aktualnosti referenci OWASP Top 10 za LLM modele
  - **Azure usluge**: Provjereni svi Microsoft Azure dokumentacijski linkovi i najbolje prakse
- **Poravnanje sa standardima**: Sve referencirane sigurnosne norme potvrđene kao aktualne
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Najbolje sigurnosne prakse
  - Azure sigurnosni i usklađenost okviri
- **Resursi implementacije**: Provjereni svi vodiči za implementaciju i resursi
  - Obrasci autentifikacije u Azure API Management
  - Vodiči za integraciju Microsoft Entra ID-a
  - Upravljanje tajnama u Azure Key Vaultu
  - DevSecOps pipeline-i i rješenja za nadzor

### Osiguranje kvalitete dokumentacije
- **Usklađenost s specifikacijom**: Provjereno da sve obavezne MCP sigurnosne zahtjeve (MUST/MUST NOT) usklađuju s najnovijom specifikacijom
- **Aktualnost resursa**: Potvrđeno da su svi vanjski linkovi na Microsoft dokumentaciju, sigurnosne standarde i vodiče za implementaciju aktualni
- **Pokriće najboljih praksi**: Potvrđeno sveobuhvatno pokrivanje autentifikacije, autorizacije, AI-specifičnih prijetnji, sigurnosti opskrbnog lanca i enterprise obrazaca

## 6. listopada 2025.

### Proširenje sekcije za početak rada – Napredno korištenje servera i jednostavna autentifikacija

#### Napredno korištenje servera (03-GettingStarted/10-advanced)
- **Dodano novo poglavlje**: Predstavljen sveobuhvatan vodič za napredno korištenje MCP servera, obuhvaćajući redovitu i niskorazinsku arhitekturu servera.
  - **Redovni vs. Niskorazinski poslužitelj**: Detaljna usporedba i primjeri koda u Pythonu i TypeScriptu za oba pristupa.
  - **Dizajn baziran na obrađivačima**: Objašnjenje upravljanja alatima/izvorima/poticanjem baziranim na obrađivačima za skalabilne, fleksibilne implementacije poslužitelja.
  - **Praktični obrasci**: Stvarni scenariji gdje su obrasci niskorazinskog poslužitelja korisni za napredne značajke i arhitekturu.

#### Jednostavna autentifikacija (03-GettingStarted/11-simple-auth)
- **Dodano novo poglavlje**: Korak-po-korak vodič za implementaciju jednostavne autentifikacije u MCP poslužiteljima.
  - **Koncepti autentifikacije**: Jasno objašnjenje autentifikacije naspram autorizacije te rukovanja vjerodajnicama.
  - **Osnovna implementacija autentifikacije**: Obrasci autentifikacije bazirani na middlewareu u Pythonu (Starlette) i TypeScriptu (Express) s primjerima koda.
  - **Napredak prema naprednoj sigurnosti**: Smjernice za početak sa jednostavnom autentifikacijom i napredovanje prema OAuth 2.1 i RBAC s referencama na napredne sigurnosne module.

Ove nadopune pružaju praktične, interaktivne smjernice za izgradnju robusnijih, sigurnijih i fleksibilnijih implementacija MCP poslužitelja, povezujući osnovne koncepte s naprednim proizvodnim obrascima.

## 29. rujna 2025.

### MCP poslužiteljski laboratoriji integracije baza podataka – sveobuhvatan praktični put učenja

#### 11-MCPServerHandsOnLabs – Novi kompletni kurikulum integracije baza podataka
- **Potpuni put učenja sa 13 laboratorija**: Dodan sveobuhvatan praktični kurikulum za izgradnju produkcijski spremnih MCP poslužitelja s integracijom PostgreSQL baze podataka
  - **Prava primjena u stvarnom svijetu**: Primjer upotrebe Zava Retail analitike koji demonstrira obrasce razine poduzeća
  - **Strukturirani napredak u učenju**:
    - **Laboratoriji 00-03: Osnove** – Uvod, osnovna arhitektura, sigurnost i multitenancy, postavljanje okoline
    - **Laboratoriji 04-06: Izgradnja MCP poslužitelja** – Dizajn baze podataka i sheme, implementacija MCP poslužitelja, razvoj alata  
    - **Laboratoriji 07-09: Napredne značajke** – Integracija semantičkog pretraživanja, testiranje i ispravljanje grešaka, integracija s VS Code
    - **Laboratoriji 10-12: Proizvodnja i najbolje prakse** – Strategije implementacije, nadzor i promatranje, najbolje prakse i optimizacija
  - **Tehnologije razine poduzeća**: FastMCP okvir, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Napredne značajke**: Sigurnost na razini retka (RLS), semantičko pretraživanje, pristup podacima za više korisnika, vektorska ugrušavanja, nadzor u stvarnom vremenu

#### Standardizacija terminologije – Pretvorba modula u laboratorije
- **Sveobuhvatna nadogradnja dokumentacije**: Sustavno ažurirani svi README fajlovi u 11-MCPServerHandsOnLabs koristeći terminologiju „laboratorij“ umjesto „modul“
  - **Naslovi sekcija**: Ažurirano „What This Module Covers“ u „What This Lab Covers“ u svih 13 laboratorija
  - **Opis sadržaja**: Promijenjeno „This module provides...“ u „This lab provides...“ kroz dokumentaciju
  - **Ciljevi učenja**: Ažurirano „By the end of this module...“ u „By the end of this lab...“
  - **Linkovi za navigaciju**: Pretvoreni svi „Module XX:“ navodi u „Lab XX:“ u međureferencama i navigaciji
  - **Praćenje završetka**: Ažurirano „After completing this module...“ u „After completing this lab...“
  - **Očuvane tehničke reference**: Održane Python reference modula u konfiguracijskim datotekama (npr. `"module": "mcp_server.main"`)

#### Unapređenja vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Dodan novi odjeljak „11. Database Integration Labs“ s vizualizacijom strukture laboratorija
- **Struktura repozitorija**: Ažurirano s deset na jedanaest glavnih sekcija s detaljnim opisom 11-MCPServerHandsOnLabs
- **Smjernice za put učenja**: Poboljšane upute za navigaciju koje pokrivaju sekcije 00-11
- **Obuhvat tehnologija**: Dodani detalji o FastMCP, PostgreSQL-u i Azure uslugama integracije
- **Ishodi učenja**: Naglasak na razvoju produkcijski spremnih poslužitelja, obrascima integracije baze podataka i sigurnosti razine poduzeća

#### Unapređenje strukture glavnog README-a
- **Terminologija bazirana na laboratorijima**: Ažuriran glavni README.md u 11-MCPServerHandsOnLabs za dosljednu upotrebu strukture "Laboratorij"
- **Organizacija puta učenja**: Jasan napredak od osnovnih koncepata preko napredne implementacije do produkcijske primjene
- **Fokus na stvarni svijet**: Naglasak na praktičnoj, hands-on nastavi s obrascima i tehnologijama razine poduzeća

### Poboljšanja kvalitete i konzistencije dokumentacije
- **Naglasak na praktično učenje**: Ojačani praktični, laboratorijski pristup kroz cijelu dokumentaciju
- **Fokus na obrasce razine poduzeća**: Istaknute produkcijski spremne implementacije i sigurnosne razmatranja za poduzeća
- **Integracija tehnologije**: Sveobuhvatan pregled modernih Azure usluga i AI integracijskih obrazaca
- **Napredak u učenju**: Jasan, strukturiran put od osnovnih pojmova do produkcijske implementacije

## 26. rujna 2025.

### Unapređenje studija slučaja – Integracija GitHub MCP Registryja

#### Studije slučaja (09-CaseStudy/) – Fokus na razvoj ekosustava
- **README.md**: Značajno proširen s detaljnom studijom slučaja GitHub MCP Registryja
  - **Studija slučaja GitHub MCP Registryja**: Nova opsežna studija slučaja ispitivanja lansiranja GitHub MCP Registryja u rujnu 2025.
    - **Analiza problema**: Detaljno ispitivanje izazova fragmentiranog pronalaženja i implementacije MCP poslužitelja
    - **Arhitektura rješenja**: GitHubov centralizirani pristup registru s instalacijom VS Code jednim klikom
    - **Poslovni utjecaj**: Mjerljiva poboljšanja u onboarding procesu i produktivnosti programera
    - **Strateška vrijednost**: Naglasak na modularnu implementaciju agenata i interoperabilnost alata
    - **Razvoj ekosustava**: Pozicioniranje kao temeljna platforma za agentnu integraciju
  - **Unaprijeđena struktura studije slučaja**: Ažurirane sve sedam studija slučaja s dosljednim formatiranjem i sveobuhvatnim opisima
    - Azure AI Travel Agents: Naglasak na višestruku orkestraciju agenata
    - Azure DevOps Integration: Fokus na automatizaciju radnog toka
    - Dohvaćanje dokumentacije u stvarnom vremenu: Implementacija klijenta u Python konzoli
    - Interaktivni generator studijskog plana: Lancilit web aplikacija za konverzaciju
    - Dokumentacija u uređivaču: Integracija s VS Code i GitHub Copilot
    - Azure API Management: Obrasci integracije API-ja za poduzeća
    - GitHub MCP Registry: Razvoj ekosustava i platforma za zajednicu
  - **Sveobuhvatan zaključak**: Prepisan odjeljak zaključka koji ističe sedam studija slučaja koje pokrivaju višedimenzionalne MCP implementacije
    - Integracija poduzeća, orkestracija višestrukih agenata, produktivnost programera
    - Razvoj ekosustava, obrazovne aplikacije kao kategorije
    - Poboljšani uvidi u arhitektonske obrasce, strategije implementacije i najbolje prakse
    - Naglasak na MCP kao zreli, produkcijski spremni protokol

#### Ažuriranja vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Ažuriran mentalni prikaz za uključivanje GitHub MCP Registryja u odjeljak Studije slučaja
- **Opis studija slučaja**: Proširen s generičkih opisa na detaljnu analizu sedam opširnih studija slučaja
- **Struktura repozitorija**: Ažurirana sekcija 10 kako bi odražavala opsežno pokrivanje studija slučaja sa specifičnim detaljima implementacije
- **Integracija dnevnika promjena**: Dodan unos za 26. rujna 2025. koji dokumentira dodatak GitHub MCP Registryja i unapređenja studija slučaja
- **Ažuriranja datuma**: Ažuriran vremenski pečat podnožja za najnoviju reviziju (26. rujna 2025.)

### Poboljšanja kvalitete dokumentacije
- **Unapređenje konzistentnosti**: Standardizirano formatiranje i struktura studija slučaja za svih sedam primjera
- **Sveobuhvatno pokrivanje**: Studije slučaja sada obuhvaćaju poduzeća, produktivnost programera i razvoj ekosustava
- **Strateško pozicioniranje**: Povećan fokus na MCP kao temeljnu platformu za implementaciju agentskih sustava
- **Integracija resursa**: Ažurirani dodatni resursi za uključivanje poveznice na GitHub MCP Registry

## 15. rujna 2025.

### Proširenje naprednih tema – Prilagođeni transporti i inženjerstvo konteksta

#### Prilagođeni MCP transporti (05-AdvancedTopics/mcp-transport/) – Novi vodič za naprednu implementaciju
- **README.md**: Potpuni vodič za implementaciju prilagođenih MCP transportnih mehanizama
  - **Azure Event Grid transport**: Sveobuhvatna implementacija serverless event-driven transporta
    - Primjeri u C#, TypeScriptu i Pythonu s integracijom Azure Functions
    - Obrasci event-driven arhitekture za skalabilna MCP rješenja
    - Primatelji webhookova i push-based rukovanje porukama
  - **Azure Event Hubs transport**: Implementacija transporta za visokoprotočni streaming
    - Mogućnosti streaming u stvarnom vremenu za scenarije s niskom latencijom
    - Strategije particioniranja i upravljanje točkama provjere
    - Grupiranje poruka i optimizacija performansi
  - **Obrasci integracije poduzeća**: Produkcijski spremni arhitektonski primjeri
    - Distribuirana MCP obrada preko više Azure Functions
    - Hibridne transportne arhitekture koje kombiniraju više tipova transporta
    - Strategije trajnosti poruka, pouzdanosti i upravljanje pogreškama
  - **Sigurnost i nadzor**: Integracija Azure Key Vault i obrasci promatranja
    - Autentifikacija upravljanih identiteta i pristup najmanjeg privilegija
    - Telemetrija Application Insights i nadzor performansi
    - Prekidači krugova i obrasci otpornosti na pogreške
  - **Okviri za testiranje**: Sveobuhvatne strategije testiranja prilagođenih transporta
    - Jedinično testiranje s test-dvostrukim objektima i mock frameworkima
    - Integracijsko testiranje s Azure Test Containers
    - Razmatranje performansi i testiranja opterećenja

#### Inženjerstvo konteksta (05-AdvancedTopics/mcp-contextengineering/) – Nova disciplina u razvoju AI-a
- **README.md**: Sveobuhvatno istraživanje inženjerstva konteksta kao novog područja
  - **Osnovni principi**: Potpuno dijeljenje konteksta, svijest o odlukama akcija i upravljanje kontekstnim prozorima
  - **Poravnanje s MCP protokolom**: Kako dizajn MCP-a rješava izazove inženjerstva konteksta
    - Ograničenja kontekstnih prozora i progresivne strategije učitavanja
    - Određivanje relevantnosti i dinamičko dohvaćanje konteksta
    - Upravljanje multimodalnim kontekstom i sigurnosni aspekti
  - **Pristupi implementaciji**: Jednoprocesorska naspram višestrukih agenata arhitektura
    - Tehnike rezanja i prioritizacije konteksta
    - Progresivno učitavanje i kompresijske strategije
    - Pristupi slojevitog konteksta i optimizacija dohvata
  - **Okvir mjerenja**: Emerging metrics za procjenu učinkovitosti konteksta
    - Učinkovitost unosa, performanse, kvaliteta i korisničko iskustvo
    - Eksperimentalni pristupi optimizaciji konteksta
    - Analiza neuspjeha i metodologije poboljšanja

#### Ažuriranja navigacije kroz kurikulum (README.md)
- **Unaprijeđena struktura modula**: Ažurirana tablica kurikuluma za uključivanje novih naprednih tema
  - Dodani unosi za Inženjerstvo konteksta (5.14) i Prilagođeni transport (5.15)
  - Dosljedno formatiranje i navigacijski linkovi za sve module
  - Ažurirani opisi za odražavanje trenutnog obuhvata sadržaja

### Poboljšanja strukture direktorija
- **Standardizacija imenovanja**: Preimenovan „mcp transport“ u „mcp-transport“ radi dosljednosti s ostalim mapama naprednih tema
- **Organizacija sadržaja**: Sve mape 05-AdvancedTopics sada prate dosljedan obrasac imenovanja (mcp-[tema])

### Poboljšanja kvalitete dokumentacije
- **Poravnanje s MCP specifikacijom**: Sav novi sadržaj referira trenutnu MCP Specifikaciju 2025-06-18
- **Primjeri u više jezika**: Sveobuhvatni primjeri koda u C#, TypeScriptu i Pythonu
- **Fokus na poduzeće**: Produkcijski spremni obrasci i integracija Azure clouda kroz cijeli sadržaj
- **Vizualna dokumentacija**: Mermaid dijagrami za vizualizaciju arhitekture i toka

## 18. kolovoza 2025.

### Sveobuhvatna nadogradnja dokumentacije – standardi MCP 2025-06-18

#### Najbolje sigurnosne prakse MCP (02-Security/) – Potpuna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Potpuna prerada usklađena s MCP Specifikacijom 2025-06-18
  - **Obavezni zahtjevi**: Dodani eksplicitni ZAHTJEVI/NIJE DOZVOLJENO iz službene specifikacije s jasnim vizualnim oznakama
  - **12 temeljnih sigurnosnih praksi**: Restrukturirano sa 15 stavki na cjelovita sigurnosna područja
    - Sigurnost tokena i autentifikacija s integracijom vanjskog pružatelja identiteta
    - Upravljanje sesijama i sigurnost transporta s kriptografskim zahtjevima
    - Zaštita specifična za AI uz Microsoft Prompt Shields integraciju
    - Kontrola pristupa i dopuštenja prema principu najmanjih privilegija
    - Sigurnost sadržaja i nadzor s Azure Content Safety integracijom
    - Sigurnost lanca opskrbe s cjelovitom verifikacijom komponenti
    - Sigurnost OAuth-a i sprječavanje "confused deputy" napada s PKCE implementacijom
    - Odgovor na incidente i oporavak sa automatiziranim sposobnostima
    - Usklađenost i upravljanje u skladu s propisima
    - Napredne sigurnosne kontrole s arhitekturom nultog povjerenja
    - Microsoftov sigurnosni ekosustav i cjelovita rješenja
    - Kontinuirani razvoj sigurnosti s adaptivnim praksama
  - **Microsoftova sigurnosna rješenja**: Poboljšane smjernice za integraciju Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Resursi za implementaciju**: Kategorizirani sveobuhvatni poveznici po službenoj MCP dokumentaciji, Microsoft sigurnosnim rješenjima, sigurnosnim standardima i vodičima za implementaciju

#### Napredne sigurnosne kontrole (02-Security/) – Enterprise implementacija
- **MCP-SECURITY-CONTROLS-2025.md**: Potpuna prerada s okvirom sigurnosti razine poduzeća
  - **9 sveobuhvatnih sigurnosnih područja**: Prošireno iz osnovnih kontrola u detaljan okvir za poduzeća
    - Napredna autentifikacija i autorizacija s Microsoft Entra ID integracijom
    - Sigurnost tokena i kontrole protiv prosljeđivanja s cjelovitom validacijom
    - Sigurnosne kontrole sesija s prevencijom preuzimanja
    - Sigurnosne kontrole specifične za AI s prevencijom injekcija poticaja i otrovanja alata
    - Prevencija "confused deputy" napada s OAuth proxy sigurnošću
    - Sigurnost izvršavanja alata s sandboxingom i izolacijom
    - Sigurnosne kontrole lanca opskrbe s verifikacijom ovisnosti
    - Kontrole nadzora i detekcije s SIEM integracijom
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
  - **Primjeri implementacije**: Dodani detaljni YAML blokovi konfiguracije i primjeri koda
  - **Integracija Microsoft rješenja**: Sveobuhvatno pokrivanje Azure sigurnosnih servisa, GitHub Advanced Security i upravljanja identitetima razine poduzeća

#### Sigurnost naprednih tema (05-AdvancedTopics/mcp-security/) – Produkcijski spremna implementacija
- **README.md**: Potpuna prerada za sigurnosnu implementaciju razine poduzeća
  - **Poravnanje s trenutnom specifikacijom**: Ažurirano prema MCP Specifikaciji 2025-06-18 s obaveznim sigurnosnim zahtjevima
  - **Unaprijeđena autentifikacija**: Integracija Microsoft Entra ID s detaljnim .NET i Java Spring Security primjerima
  - **Integracija sigurnosti AI-a**: Implementacija Microsoft Prompt Shields i Azure Content Safety s detaljnim Python primjerima
  - **Napredna mitigacija prijetnji**: Sveobuhvatni primjeri implementacije za
    - Prevenciju "confused deputy" napada s PKCE i validacijom pristanka korisnika
    - Sprječavanje prosljeđivanja tokena s validacijom publike i sigurnim upravljanjem tokenima
    - Sprječavanje preuzimanja sesije uz kriptografsko povezivanje i analizu ponašanja
  - **Integracija sigurnosti u poduzećima**: Praćenje Azure Application Insights, pipelinei za otkrivanje prijetnji i sigurnost opskrbnog lanca
  - **Kontrolna lista implementacije**: Jasna razlika između obaveznih i preporučenih sigurnosnih kontrola s prednostima Microsoft sigurnosnog ekosustava

### Kvaliteta dokumentacije i usklađenost sa standardima
- **Specifikacijske reference**: Ažurirane sve reference prema trenutnoj MCP specifikaciji 2025-06-18
- **Microsoft sigurnosni ekosustav**: Poboljšani smjernice za integraciju kroz svu sigurnosnu dokumentaciju
- **Praktična implementacija**: Dodani detaljni primjeri koda u .NET, Javi i Pythonu s obrascima za poduzeća
- **Organizacija resursa**: Sveobuhvatna kategorizacija službene dokumentacije, sigurnosnih standarda i vodiča za implementaciju
- **Vizualni indikatori**: Jasno označavanje obaveznih zahtjeva naspram preporučenih praksi


#### Osnovni koncepti (01-CoreConcepts/) - Potpuna modernizacija
- **Ažuriranje verzije protokola**: Ažurirano za referencu na trenutnu MCP specifikaciju 2025-06-18 s verzioniranjem na temelju datuma (format GGGG-MM-DD)
- **Dorada arhitekture**: Poboljšani opisi Hosts, Klijenata i Servera za prikaz trenutnih MCP arhitektonskih obrazaca
  - Hosts sada jasno definirani kao AI aplikacije koje koordiniraju više MCP klijentskih veza
  - Klijenti opisani kao povezivači protokola koji održavaju odnos jedan-na-jedan sa serverima
  - Serveri prošireni s lokalnim i udaljenim scenarijima implementacije
- **Restrukturiranje primitiva**: Potpuna prenamjena server i klijentskih primitiva
  - Server primitivci: Resursi (izvori podataka), Upiti (predlošci), Alati (izvršne funkcije) s detaljnim objašnjenjima i primjerima
  - Klijentski primitivci: Uzorkovanje (LLM dovršetci), Pokretanje (unosi korisnika), Evidencija (debugiranje/praćenje)
  - Ažurirano s trenutačnim obrascima metoda otkrivanja (`*/list`), dohvaćanja (`*/get`) i izvršavanja (`*/call`)
- **Arhitektura protokola**: Uveden model dvoslojne arhitekture
  - Sloj podataka: Temelj JSON-RPC 2.0 s upravljanjem životnim ciklusom i primitivcima
  - Transportni sloj: STDIO (lokalno) i Streamable HTTP s SSE (udaljeni) mehanizmi prijenosa
- **Sigurnosni okvir**: Sveobuhvatni sigurnosni principi uključujući eksplicitni pristanak korisnika, zaštitu privatnosti podataka, sigurnost izvršenja alata i sigurnost transportnog sloja
- **Komunikacijski obrasci**: Ažurirane poruke protokola za prikaz inicijalizacije, otkrivanja, izvršenja i tokova obavijesti
- **Primjeri koda**: Osvježeni višejезični primjeri (.NET, Java, Python, JavaScript) za prikaz trenutačnih MCP SDK obrazaca

#### Sigurnost (02-Security/) - Sveobuhvatna sigurnosna prenamjena  
- **Usklađenost sa standardima**: Potpuna usklađenost s MCP specifikacijom 2025-06-18 za sigurnosne zahtjeve
- **Evolucija autentikacije**: Dokumentiran razvoj od prilagođenih OAuth servera do delegacije vanjskih davatelja identiteta (Microsoft Entra ID)
- **AI-specifična analiza prijetnji**: Poboljšano pokrivanje modernih AI napadačkih vektora
  - Detaljni scenariji napada injekcijom upita s primjerima iz stvarnog svijeta
  - Mehanizmi trovanja alata i obrasci napada "rug pull"
  - Trovanje kontekstnog prozora i napadi zbunjivanja modela
- **Microsoft AI sigurnosna rješenja**: Sveobuhvatno pokrivanje Microsoft sigurnosnog ekosustava
  - AI Prompt Shields s naprednim tehnikama otkrivanja, isticanja i odvajača
  - Integracijski obrasci za Azure Content Safety
  - GitHub Advanced Security za zaštitu opskrbnog lanca
- **Napredna ublažavanja prijetnji**: Detaljne sigurnosne kontrole za
  - Preuzimanje sesije s MCP-specifičnim scenarijima napada i zahtjevima za kriptografski ID sesije
  - Problemi zbunjenog poslužitelja (confused deputy) u MCP proxy scenarijima s eksplicitnim zahtjevima za pristanak
  - Ranljivosti propuštanja tokena s obaveznom validacijom
- **Sigurnost opskrbnog lanca**: Prošireno pokrivanje AI opskrbnog lanca uključujući temeljne modele, usluge ugradnje, pružatelje konteksta i API-je trećih strana
- **Temeljna sigurnost**: Poboljšana integracija s obrascima sigurnosti poduzeća uključujući arhitekturu zero trust i Microsoft sigurnosni ekosustav
- **Organizacija resursa**: Kategorizirani sveobuhvatni linkovi prema vrsti (Službena dokumentacija, Standardi, Istraživanja, Microsoft rješenja, Vodiči za implementaciju)

### Poboljšanja kvalitete dokumentacije
- **Strukturirani ciljevi učenja**: Poboljšani ciljevi s jasnim, izvedivim ishodima
- **Kros-reference**: Dodane poveznice između povezanih tema iz sigurnosti i osnovnih koncepata
- **Ažurirane informacije**: Ažurirani svi datumski zapisi i linkovi na specifikacije u skladu s trenutnim standardima
- **Smjernice za implementaciju**: Dodane specifične i izvedive smjernice kroz obje sekcije

## 16. srpnja 2025.

### README i poboljšanja navigacije
- Potpuno redizajniran sustav navigacije u README.md
- Zamijenjeni `<details>` tagovi s pristupačnijim tabličnim formatom
- Kreirane alternativne opcije izgleda u novom folderu "alternative_layouts"
- Dodani primjeri kartičnog, tababilnog i akordion stila navigacije
- Ažuriran odjeljak o strukturi repozitorija kako bi uključivao sve najnovije datoteke
- Poboljšan odjeljak "Kako koristiti ovaj kurikulum" s jasnim preporukama
- Ažurirani poveznici na MCP specifikacije prema ispravnim URL-ovima
- Dodan odjeljak o kontekst inženjerstvu (5.14) u strukturu kurikuluma

### Ažuriranja vodiča za učenje
- Potpuno revidiran vodič za usklađivanje s trenutnom strukturom repozitorija
- Dodani novi odjeljci za MCP klijente i alate te popularne MCP servere
- Ažurirana vizualna karta kurikuluma za precizno prikazivanje svih tema
- Poboljšani opisi naprednih tema za pokrivanje svih specijaliziranih područja
- Ažuriran odjeljak studija slučaja za stvarne primjere
- Dodan ovaj sveobuhvatni changelog

### Zajednički doprinosi (06-CommunityContributions/)
- Dodane detaljne informacije o MCP serverima za generiranje slika
- Dodan sveobuhvatni odjeljak o korištenju Claudea u VSCode
- Dodane upute za postavljanje i korištenje terminal klijenta Cline
- Ažuriran odjeljak MCP klijenta za uključivanje svih popularnih opcija klijenata
- Poboljšani primjeri doprinosa s točnijim uzorcima koda

### Napredne teme (05-AdvancedTopics/)
- Organizirane sve mape specijaliziranih tema s dosljednim imenovanjem
- Dodani materijali i primjeri iz područja kontekst inženjerstva
- Dodana dokumentacija za integraciju Foundry agenta
- Poboljšana dokumentacija integracije sigurnosti Entra ID

## 11. lipnja 2025.

### Početna izrada
- Objavljena prva verzija kurikuluma MCP za početnike
- Kreirana osnovna struktura za svih 10 glavnih sekcija
- Implementirana Vizualna karta kurikuluma za navigaciju
- Dodani početni primjeri projekata u više programskih jezika

### Početak rada (03-GettingStarted/)
- Kreirani prvi primjeri implementacije servera
- Dodane smjernice za razvoj klijenta
- Uključene upute za integraciju LLM klijenta
- Dodana dokumentacija za integraciju u VS Code
- Implementirani primjeri servera sa Server-Sent Events (SSE)

### Osnovni koncepti (01-CoreConcepts/)
- Dodano detaljno objašnjenje arhitekture klijent-server
- Kreirana dokumentacija o ključnim komponentama protokola
- Dokumentirani obrasci poruka u MCP

## 23. svibnja 2025.

### Struktura repozitorija
- Inicijaliziran repozitorij s osnovnom strukturom mapa
- Kreirani README datoteke za svaku glavnu sekciju
- Postavljena infrastruktura za prijevod
- Dodani slikovni sadržaji i dijagrami

### Dokumentacija
- Kreiran početni README.md s pregledom kurikuluma
- Dodani CODE_OF_CONDUCT.md i SECURITY.md
- Postavljen SUPPORT.md s uputama za traženje pomoći
- Kreirana preliminarna struktura vodiča za učenje

## 15. travnja 2025.

### Planiranje i okvir
- Početno planiranje MCP kurikuluma za početnike
- Definirani ciljevi učenja i ciljana publika
- Opisana struktura kurikuluma s 10 sekcija
- Razvijen konceptualni okvir za primjere i studije slučaja
- Kreirani početni prototipni primjeri za ključne koncepte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->