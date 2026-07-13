# Dnevnik promjena: MCP za početnike - nastavni plan

Ovaj dokument služi kao zapis svih značajnih promjena napravljenih u Model Context Protocol (MCP) za početnike nastavni plan. Promjene su zabilježene u obrnutom kronološkom redoslijedu (najnovije promjene prve).

## 2. srpnja 2026.

### Nova lekcija: Kandidat za izdanje MCP specifikacije 2026-07-28

Dodano pokrivanje nadolazećeg kandidata za izdanje MCP specifikacije `2026-07-28` (najavljeno 21. svibnja 2026; konačno izdanje planirano za 28. srpnja 2026), sažeto iz [službene najave na blogu](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Osnovna verzija nastavnog plana ostaje **MCP Specifikacija 2025-11-25** do izlaska nove verzije, pa se ovo predstavlja kao smjernice za budućnost, a ne kao prerada postojećih lekcija.

- **Nova**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — puna lekcija koja pokriva stateless protokol jezgru (uklanjanje `initialize` handshake i `Mcp-Session-Id`), nove `Mcp-Method`/`Mcp-Name` zaglavlja za usmjeravanje, `ttlMs`/`cacheScope` metapodatke za keširanje, W3C Trace Context u `_meta`, formalni Extensions okvir (MCP aplikacije i novo Tasks proširenje), šest SEP-ova za pojačanje autorizacije, zastarijevanje Roots/Sampling/Logging te prelazak na pun JSON Schema 2020-12 za sheme alata.
- **Ažurirano** s pogledom u budućnost kroz poveznice na novu lekciju:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): bilješka o verziji protokola, dijelovi Sampling/Roots/Logging/Tasks i "Što slijedi"
  - [02-Security/README.md](./02-Security/README.md): upozorenje o pojačavanju autorizacije
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): upozorenje o stateless transportu
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): upozorenje o zastarijevanju Samplinga
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): upozorenje o zastarijevanju Logiranja i o Tasks proširenju
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): upozorenje o stateless/sessions routing-u
  - [README.md](./README.md): bilješka "Gledajući unaprijed" u odjeljku o specifikaciji i novi unos `1.1` u tablici modula nastavnog plana
  - [study_guide.md](./study_guide.md): pogled u budućnost pod točkom Pregled osnovnih koncepata i datirana dopunska bilješka
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): upozorenje o `mcp-session-id` transport map prije modela stateless zahtjeva
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): pregled modula s upozorenjima na zastarijevanje Root Contexts/Sampling i o Tasks proširenju
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): upozorenje o pojačavanju autorizacije

## 24. lipnja 2026.

### Nova lekcija: Korištenje MCP-a u Copilot aplikaciji

- [Odjeljak Alati](./12-tooling/README.md) Dodan odjeljak alata.
- [MCP u Copilot aplikaciji](./12-tooling/01-copilot-app/README.md)

## 16. lipnja 2026.

### Poravnanje MCP specifikacije i validacija primjera

Validiran nastavni plan prema trenutno važećoj **MCP specifikaciji 2025-11-25** i najnovijim službenim SDK-ovima, zatim ispravljeni preostali zastarjeli referencni dijelovi specifikacije i potvrđeno da primjeri i dalje uspješno grade i pokreću.

#### Ispravci verzije specifikacije (2025-06-18 / 2025-03-26 → 2025-11-25)

Ažuriran je engleski sadržaj gdje je još tvrdio da je starija revizija specifikacije *trenutni/najnoviji* standard, te su linkovi preusmjereni na kanonske `modelcontextprotocol.io` putanje specifikacije:
- **05-AdvancedTopics/mcp-security/README.md**: Ažurirana traka "Trenutni standard", uvod, naslov osnovnih sigurnosnih principa, naslov obaveznih zahtjeva, odjeljak Microsoft Entra ID, linkovi na Reference i Resurse i završno sigurnosno upozorenje (8 referenci) na verziju 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Ažurirani link za dodatne resurse i traka "Trenutni standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamijenjen zastarjeli link `2025-03-26` za sigurnosne i trust prakse s aktualnom stranicom najboljih sigurnosnih praksi 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Ažuriran link službenih dokumenata o samplingu na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Ažurirana sadašnja referenca "trenutne MCP specifikacije" i link za dodatne resurse specifikacije na 2025-11-25 (povijesne napomene o zastarijevanju SSE ostale su radi točnosti)

#### Validacija primjera prema trenutnim SDK-ovima

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` instalirao `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` prošao bez grešaka u tipovima — postojeći `McpServer`/`StdioServerTransport` API-ji su valjani
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validirano u izoliranom `.venv` s `mcp[cli]` (1.27.2); `py_compile` prošao i `FastMCP.list_tools()` ispravno vratio alate `add` i `subtract`
- Potvrđeno da se sve verzijske rasponi `@modelcontextprotocol/sdk` u primjerima (`>=1.26.0` / `^1.26.0` / `^1.27.0`) uredno rješavaju na trenutnu verziju `1.29.0` bez prekida API-ja

#### Poravnanje pinova ovisnosti (zatvaranje verzijskih praznina)

Podignuti su zastarjeli pinovi SDK-ova tako da svaki primjer prati aktualno MCP izdanje, u skladu s konvencijom cijelog repozitorija:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Povećan `@modelcontextprotocol/sdk` s `^1.8.0` na `>=1.26.0` i ažuriran zastarjeli opis paketa `"updated for MCP 2025-06-18"` u `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** i **lab4/code/github_mcp_server/pyproject.toml**: Povećan točni pin `mcp==1.23.0` na `mcp>=1.26.0`; obnavljane obje `uv.lock` datoteke (`uv lock`) tako da zaključne datoteke rješavaju na trenutni `mcp 1.27.2` i ostaju sinkronizirane s manifestima

#### Analiza praznina u nastavnom planu — pokrivenost najnovijih značajki specifikacije

Potvrđeno da nastavni plan već pokriva sve primitivne elemente uvedene/razrađene u MCP 2025-11-25, tako da ne postoje praznine u sadržaju:
- **Sampling**: lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (uključujući URL mod)**: dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Roots**: dokumentirano u 00-Introduction, 01-CoreConcepts i 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentalne, dugotrajne operacije)**: dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Tool Annotations** (`readOnlyHint` / `destructiveHint`): dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features

### Pojačanje sigurnosti i popravljanje ranjivosti ovisnosti

Izveden je kompletan sigurnosni pregled svih manifest datoteka ovisnosti i izvornog koda primjera, zatim su otklonjene sve prijavljene npm sigurnosne preporuke i jedna sigurnosna slabost na razini koda. Nakon popravka, `npm audit` izvještava o **0 ranjivosti** u svakom revidiranom direktoriju.

#### npm ranjivosti ovisnosti (transitivnih) — ispravljeno

Revidirano svih 15 predanih `package-lock.json` datoteka. Ranjivosti su bile ograničene na transitivne ovisnosti koje uvodi MCP Inspector razvojni alat, OpenAI klijent i MCP SDK; sve su sada riješene bez prekida primjera:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** i **lab3/code/weather_mcp/inspector**: Povećan `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), što je uklonilo priložene sigurnosne preporuke za `ajv`, `brace-expansion`, `diff`, `path-to-regexp` i `ws`. Dodan npm unos `overrides` koji forsira zakrpani `shell-quote@1.8.4` za uklanjanje preostale kritične sigurnosne preporuke koju nosi `concurrently`; obnavljane obje zaključne datoteke (sada 0 ranjivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` ažurirao tranzitivni `qs` (umjereno) u zakrpanu verziju
- **03-GettingStarted/samples/javascript**: `npm audit fix` ažurirao tranzitivni `hono` (umjereno) u zakrpanu verziju
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` ažurirao tranzitivni `form-data` (visoko) u zakrpanu verziju
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana nedostajuća `package-lock.json` datoteka tako da je projekt reproducibilan i podložan reviziji (0 ranjivosti)

#### Sigurnosni popravak na razini koda (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Uklonjen `shell=True` iz alata `open_in_vscode`. Prethodni `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` je dopuštao shell metaznakove u putanji do mape koji bi se interpretirali kroz `cmd.exe` (vektor za injekciju naredbi). Sada je izravno pokrenut razriješeni `Code.exe` s mapom kao argumentom — bez korištenja shell-a — što je funkcionalno jednako i sigurno

#### Revizija Python ovisnosti

- Revidirani svi Python zahtjevi s `pip-audit`. `05-AdvancedTopics` i `03-GettingStarted/samples/python` prijavili su **nema poznatih ranjivosti** (njihovi `mcp` / `httpx` / `pydantic` / `python-dotenv` rasponi se rješavaju na trenutno zakrpane verzije)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je označio tranzitivnu ovisnost **`werkzeug` 3.1.1** s tri `safe_join` Windows device-name DoS preporuke — `CVE-2025-66221`, `CVE-2026-21860`, i `CVE-2026-27199` (sve popravljeno u verziji 3.1.6). Dodan eksplicitan sigurnosni pin `werkzeug>=3.1.6` tako da se rješava zakrpanija verzija; potvrđeno da se ograničenje uredno rješava u `chainlit` / `mcp` / `semantic-kernel` stack-u

### Rebranding imena proizvoda

Ažuriran je sav sadržaj nastavnog plana kako bi odražavao Microsoftov rebranding proizvoda:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Ažurirana poveznica na Discord zajednicu
- **AGENTS.md**: Ažurirana referenca Discord servera
- **README.md**: Ažurirane reference tehnološkog ekosustava
- **study_guide.md**: Ažurirane reference studija slučaja
- **05-AdvancedTopics/README.md**: Ažuriran naslov i opis modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Ažuriran naslov sekcije i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Potpuno ažuriran naslov i sadržaj modula
- **05-AdvancedTopics/mcp-security-entra/README.md**: Ažurirana među-referenca link
- **07-LessonsfromEarlyAdoption/README.md**: Ažurirane reference studija slučaja
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Ažuriran naslov sekcije 9, značke i mogućnosti
- **08-BestPractices/README.md**: Ažurirana poveznica na Discord zajednicu
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Ažurirana referenca Discord kanala
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Ažurirana referenca za implementaciju modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Ažurirana tablica AI usluga
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Ažurirane reference resursa

#### AI toolkit / AITK → Microsoft Foundry Toolkit proširenje za VS Code

- **README.md**: Ažurirani glavni kurikulum reference
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Ažuriran naslov modula, pregled i svi naslovi modula
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Ažurirani naslov, ciljevi učenja, upute za postavljanje i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Ažurirani naslov, ciljevi učenja, tablica MCP hostova i međureferenciranje
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Ažurirani naslov, značke, preduvjeti i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Ažurirani Agent Builder reference i poveznica za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Ažurirani preduvjeti i reference na proširenja

---

## 11. travnja 2026.

### Nova lekcija, ispravci dokumentacije i ažuriranja ovisnosti

#### Dodan novi sadržaj kurikuluma

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Protivničko višeagentno rezoniranje s MCP-om** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novi opsežni vodič koji pokriva obrazac protivničke debate za višagentske sustave
  - Mermaid dijagram arhitekture: dva agenta → zajednički MCP poslužitelj → transkript debate → sudac → presuda
  - Zajednički MCP alat poslužitelj (`web_search` + `run_python`) implementiran u Pythonu i TypeScriptu
  - Suprotstavljeni sistemski upiti (ZA / PROTIV / Sudac) s eksplicitnim zahtjevima za korištenje alata
  - Orkestrator debate u Pythonu, TypeScriptu i C# za upravljanje rundama i usmjeravanje argumenata
  - Povezivanje MCP `ClientSession` za orkestrator do stvarnih poziva alata
  - Tablica primjera upotrebe (otkrivanje halucinacija, modeliranje prijetnji, pregled dizajna API-ja, provjera činjenica, odabir tehnologije)
  - Sigurnosne mjere: izvršenje u sandboxu, validacija poziva alata, ograničenje brzine, audiranje zapisnika
  - Strukturirana vježba s tri praktična scenarija (pregled koda, odluka o arhitekturi, moderacija sadržaja)

#### Ispravci dokumentacije

**Modul 03 - Uvod**
- **05-stdio-server/README.md**: Ispravljena nepotpuna TypeScript stdio poslužiteljska skripta — dodano nedostajuće instanciranje transporta (`new StdioServerTransport()`) i poziv `server.connect(transport)` za usklađivanje s primjerima u Pythonu i .NET-u u istom odjeljku
- **14-sampling/README.md**: Ispravljena tipfeler — ispravljeno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Ažuriranja kurikuluma

**Glavni README.md**
- Dodan unos 5.17 (Protivničko višeagentno rezoniranje s MCP-om) u tablicu kurikuluma s direktnom vezom na novu lekciju

**05-AdvancedTopics/README.md**
- Dodan red za Lekciju 5.17 u tablicu lekcija

**study_guide.md**
- Dodana tema Protivničko višeagentno rezoniranje u mentalnu mapu i opis u proznom obliku Naprednih tema

#### Ispravci koda i sigurnosti

**Modul 05 - Protivnički agenti (`mcp-adversarial-agents`)**
- **Sigurnosni popravak — ubrizgavanje naredbi**: Zamijenjen `execSync` shell interpolacija s `execFile` + `promisify` u TypeScript `run_python` alatu, eliminirajući površinu ubrizgavanja naredbi (LLM-kontrolirani kod sada se prosljeđuje kao doslovni argv element bez uključenja shell-a)
- **Povezivanje petlje MCP alata**: Ažuriran Python orkestrator debate da koristi `AsyncAnthropic` klijenta (umjesto blokirajućeg sinhronog `Anthropic`), prosljeđuje uživo `ClientSession` direktno za svaki okret agenta, dohvaća definicije alata putem `session.list_tools()` u svakom okretu i šalje `tool_use` blokove preko `session.call_tool()` u petlji dok model ne emitira konačni tekstualni odgovor

#### Ažuriranja ovisnosti

- Podignut `hono` na verziju 4.12.12 u više paketa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Podignut `@hono/node-server` s 1.19.11 na 1.19.13 u TypeScript paketima
- Podignut `cryptography` s 46.0.5 na 46.0.7 u Python paketima (10-StreamliningAIWorkflows laboratoriji 3 i 4)
- Podignut `lodash` s 4.17.23 na 4.18.1 u 10-StreamliningAIWorkflows inspectoru

#### Prijevodi

- Sinhronizirani prijevodi za preko 48 jezika s najnovijim promjenama izvora (i18n ažuriranje)

---

## 5. veljače 2026.

### Poboljšanja validacije i navigacije u cijelom repozitoriju

#### Dodan novi sadržaj kurikuluma

**Modul 03 - Uvod**
- **12-mcp-hosts/README.md**: Novi opsežni vodič za postavljanje MCP hostova
  - Primjeri konfiguracije Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON konfiguracijske predloške za sve glavne hostove
  - Tablica usporedbe tipova transporta (stdio, SSE/HTTP, WebSocket)
  - Rješavanje uobičajenih problema s povezivanjem
  - Sigurnosne najbolje prakse za konfiguraciju hosta

- **13-mcp-inspector/README.md**: Novi vodič za ispravljanje pogrešaka za MCP Inspector
  - Metode instalacije (npx, globalni npm, iz izvora)
  - Povezivanje na poslužitelje preko stdio i HTTP/SSE
  - Alati za testiranje, resursi i tijekovi rada s upitima
  - Integracija s VS Code za MCP Inspector
  - Uobičajene situacije ispravljanja pogrešaka s rješenjima

**Modul 04 - Praktična implementacija**
- **pagination/README.md**: Novi vodič za implementaciju paginacije
  - Obrasci paginacije temeljenih na pokazivaču (cursor) u Pythonu, TypeScriptu, Javi
  - Rukovanje paginacijom na strani klijenta
  - Strategije dizajna pokazivača (neprozirni vs. strukturirani)
  - Preporuke za optimizaciju performansi

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Novi detaljni opis značajki protokola
  - Implementacija obavijesti o napretku
  - Obrasci za otkazivanje zahtjeva
  - Predlošci resursa s obrascima URI-ja
  - Upravljanje životnim ciklusom poslužitelja
  - Kontrola razine zapisivanja
  - Obrasci obrade pogrešaka s JSON-RPC kodovima

#### Ispravci navigacije (ažurirano 24+ datoteka)

**Glavni moduli READMEs**
 Sada s vezama na prvu lekciju I sljedeći modul

**02-Security poddatoteke**
- Svi 5 dodatnih sigurnosnih dokumenata sada imaju navigaciju „Što je sljedeće“:

**09-CaseStudy datoteke**
- Sve datoteke studije slučaja sada imaju sekvencijalnu navigaciju:

**10-StreamliningAI laboratoriji**
Dodan odjeljak Što je sljedeće u pregledu Modula 10 i Modula 11

#### Ispravci kodova i sadržaja

**Ažuriranja SDK i ovisnosti**
Ispravljena prazna verzija openai na `^4.95.0`
Ažuriran SDK s `^1.8.0` na `>=1.26.0`
Ažurirane veze verzija mcp-a na `>=1.26.0`

**Ispravci koda**
Ispravljeni nevažeći model `gpt-4o-mini` u `gpt-4.1-mini`

**Ispravci sadržaja**
Ispravljena neispravna poveznica `READMEmd` → `README.md`, ispravljena zaglavlja kurikuluma `Module 1-3` → `Module 0-3`, ispravljena putanja osjetljiva na velika/mala slova
Uklonjen oštećeni duplicirani sadržaj studije slučaja 5

**Poboljšanja za početnike**
Dodani prikladan uvod, ciljevi učenja i preduvjeti za početnike

#### Ažuriranja kurikuluma

**Glavni README.md**
- Dodani unosi 3.12 (MCP hostovi), 3.13 (MCP inspector), 4.1 (Paginacija), 5.16 (Značajke protokola) u tablicu kurikuluma

**Modul READMEs**
Dodane lekcije 12 i 13 u listu lekcija
Dodan odjeljak Praktični vodiči s vezom na paginaciju
Dodane lekcije 5.15 (Prilagođeni transport) i 5.16 (Značajke protokola)

**study_guide.md**
- Ažurirana mentalna mapa sa svim novim temama: Postavljanje MCP hostova, MCP Inspector, strategije paginacije, dubinska analiza značajki protokola

## 28. siječnja 2026.

### Revizija usklađenosti s MCP specifikacijom 2025-11-25

#### Unapređenje osnovnih koncepata (01-CoreConcepts/)
- **Novi klijentski primitiv - Korijeni**: Dodana obuhvatna dokumentacija o korijenskom klijentskom primitivu koji omogućava poslužiteljima razumijevanje granica datotečnog sustava i pristupnih prava
- **Napomene o alatima**: Dodana dokumentacija o ponašajnim oznakama alata (`readOnlyHint`, `destructiveHint`) radi bolje odluke o izvršavanju alata
- **Pozivanje alata u uzorkovanju**: Ažurirana dokumentacija Sampling da uključi parametre `tools` i `toolChoice` za upravljano pozivanje alata tijekom zahtjeva uzorkovanja
- **URL Mode Elicitation**: Dodana dokumentacija o URL-baziranom poticanju za poslužiteljem inicirane vanjske web interakcije
- **Zadaci (Eksperimentalno)**: Dodan novi odjeljak dokumentirajući eksperimentalnu funkciju Zadaci za trajne omotače izvršenja i odgođeno dohvaćanje rezultata
- **Podrška za ikone**: Napomenuto da alati, resursi, predlošci resursa i upiti sada mogu uključivati ikone kao dodatne metapodatke

#### Ažuriranja dokumentacije
- **README.md**: Dodana referenca MCP specifikacije 2025-11-25 i objašnjenje verzioniranja po datumu
- **study_guide.md**: Ažurirana karta kurikuluma da uključi Zadatke i Napomene o alatima u odjeljak Osnovni koncepti; ažuriran vremenski žig dokumenta

#### Verifikacija sukladnosti sa specifikacijom
- **Verzija protokola**: Potvrđeno da sva dokumentacija referira trenutnu MCP specifikaciju 2025-11-25
- **Poravnanje arhitekture**: Potvrđena točnost dokumentacije dvoslojne arhitekture (Podatkovni sloj + Transportni sloj)
- **Dokumentacija primitiva**: Validirani poslužiteljski primitivci (Resursi, Upiti, Alati) i klijentski primitivci (Sampling, Elicitation, Zapisivanje, Korijeni)
- **Transportni mehanizmi**: Potvrđena točnost dokumentacije STDIO i Streamable HTTP transporta
- **Sigurnosne smjernice**: Potvrđeno slaganje sa sadašnjom dokumentacijom najboljih sigurnosnih praksi MCP-a

#### Ključne značajke MCP 2025-11-25 dokumentirane
- **OpenID Connect otkrivanje**: Otkrivanje poslužitelja za autentifikaciju putem OIDC
- **OAuth Client ID metapodaci dokumenata**: Preporučen mehanizam registracije klijenta
- **JSON Schema 2020-12**: Zadani dijalekt za MCP definicije shema
- **SDK slojevitost**: Formalizirani zahtjevi za podršku i održavanje značajki SDK-a
- **Struktura upravljanja**: Formalizirani radni i interesni odbori u MCP upravljanju

### Veliko ažuriranje sigurnosne dokumentacije (02-Security/)

#### Integracija MCP sigurnosnog summita Sherpa radionice
- **Novi praktični resurs za obuku**: Dodana sveobuhvatna integracija sa [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kroz cijelu sigurnosnu dokumentaciju
- **Pokrivenost rute ekspedicije**: Dokumentiran potpuni tijek od baznog logora do vrha
- **Usklađenost s OWASP-om**: Sve sigurnosne smjernice sada mapirane na OWASP MCP Azure sigurnosni vodič

#### Integracija OWASP MCP Top 10
- **Novi odjeljak**: Dodana tablica OWASP MCP Top 10 sigurnosnih rizika sa Azure mitigacijama u glavnom sigurnosnom README
- **Dokumentacija temeljem rizika**: Ažuriran mcp-security-controls-2025.md s referencama OWASP MCP rizika za svaki sigurnosni domen
- **Referentna arhitektura**: Poveznica na OWASP MCP Azure sigurnosni vodič referentne arhitekture i obrasce implementacije

#### Ažurirane sigurnosne datoteke
- **README.md**: Dodan pregled Sherpa radionice, tablica ruta ekspedicije, sažetak OWASP MCP Top 10 rizika i odjeljak za praktičnu obuku
- **mcp-security-controls-2025.md**: Ažurirano zaglavlje na veljaču 2026., dodane OWASP referale na rizike (MCP01-MCP08), ispravljena nesukladnost verzije specifikacije
- **mcp-security-best-practices-2025.md**: Dodan odjeljak resursa Sherpa i OWASP, ažuriran vremenski žig
- **mcp-best-practices.md**: Dodan odjeljak praktične obuke s poveznicama na Sherpa i OWASP
- **azure-content-safety-implementation.md**: Dodan OWASP MCP06 referal, poravnanje s Sherpa kampom 3 i dodatni odjeljak resursa

#### Dodane nove veze na resurse
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Pojedinačne OWASP MCP stranice rizika (MCP01-MCP10)

### Poravnanje MCP specifikacije 2025-11-25 kroz cijeli kurikulum

#### Modul 03 - Uvod
- **SDK dokumentacija**: Dodan Go SDK na službenu listu SDK-a; ažurirane sve SDK reference za usklađenost s MCP specifikacijom 2025-11-25
- **Pojašnjenje transporta**: Ažurirani opisi STDIO i HTTP streaming transporta s eksplicitnim referencama na specifikaciju

#### Modul 04 - Praktična implementacija
- **Ažuriranja SDK-a**: Dodan Go SDK; ažurirana lista SDK-a s referencom verzije specifikacije
- **Specifikacija autorizacije**: Ažurirana veza na MCP autorizacijsku specifikaciju na trenutačnu verziju 2025-11-25

#### Modul 05 - Napredne teme
- **Nove značajke**: Dodana napomena o novim MCP specifikacijskim značajkama 2025-11-25 (Zadaci, Napomene o alatima, URL Mode Elicitation, Korijeni)
- **Sigurnosni resursi**: Dodane veze OWASP MCP Top 10 i Sherpa radionice u dodatne reference

#### Modul 06 - Doprinosi zajednice
- **Lista SDK-a**: Dodani Swift i Rust SDK-ovi; ažurirana veza na specifikaciju 2025-11-25
- **Referenca specifikacije**: Ažurirana veza MCP specifikacije na direktni URL specifikacije

#### Modul 07 - Lekcije ranog usvajanja

- **Ažuriranja Resursa**: Dodan MCP Specification 2025-11-25 link i OWASP MCP Top 10 u dodatne resurse

#### Modul 08 - Najbolje Prakse
- **Verzija Specifikacije**: Ažuriran MCP Specification referenca na 2025-11-25
- **Sigurnosni Resursi**: Dodani OWASP MCP Top 10 i Sherpa radionica u dodatne reference

#### Modul 10 - Optimizacija AI Radnih Tokova
- **Ažuriranje Bedža**: Promijenjen MCP verzijski bedž sa SDK verzije (1.9.3) na verziju specifikacije (2025-11-25)
- **Linkovi Resursa**: Ažuriran MCP Specification link; dodan OWASP MCP Top 10

#### Modul 11 - MCP Server Praktične Radionice
- **Referenca Specifikacije**: Ažuriran MCP Specification link na verziju 2025-11-25
- **Sigurnosni Resursi**: Dodan OWASP MCP Top 10 u službene resurse

## 18. prosinca 2025.

### Ažuriranje Sigurnosne Dokumentacije - MCP Specification 2025-11-25

#### MCP Sigurnosne Najbolje Prakse (02-Security/mcp-best-practices.md) - Ažuriranje Verzije Specifikacije
- **Ažuriranje Verzije Protokola**: Ažurirano na referencu najnovije MCP Specification 2025-11-25 (izdano 25. studenog 2025.)
  - Ažurirane sve reference verzija specifikacije s 2025-06-18 na 2025-11-25
  - Ažurirani datumi u dokumentu s 18. kolovoza 2025. na 18. prosinca 2025.
  - Provjereno da svi URL-ovi specifikacije vode na trenutnu dokumentaciju
- **Validacija Sadržaja**: Sveobuhvatna validacija sigurnosnih najboljih praksi prema najnovijim standardima
  - **Microsoft Sigurnosna Rješenja**: Provjereni aktualni termini i poveznice za Prompt Shields (prije "detekcija rizika od jailbreaka"), Azure Content Safety, Microsoft Entra ID i Azure Key Vault
  - **OAuth 2.1 Sigurnost**: Potvrđena usklađenost s najnovijim OAuth sigurnosnim najboljim praksama
  - **OWASP Standardi**: Validirane OWASP Top 10 reference za LLM i dalje su aktualne
  - **Azure Usluge**: Provjerene sve Microsoft Azure dokumentacijske veze i najbolje prakse
- **Usklađenost sa Standardima**: Svi referencirani sigurnosni standardi potvrđeni kao trenutačni
  - NIST AI Okvir za upravljanje rizikom
  - ISO 27001:2022
  - OAuth 2.1 Sigurnosne Najbolje Prakse
  - Azure sigurnosni i usklađenost okviri
- **Resursi za Implementaciju**: Validirani svi vodiči za implementaciju i resursi
  - Azure API Management obrasci autentifikacije
  - Microsoft Entra ID integracijski vodiči
  - Azure Key Vault upravljanje tajnama
  - DevSecOps pipelines i monitoringska rješenja

### Osiguranje Kvalitete Dokumentacije
- **Usklađenost sa Specifikacijom**: Osigurano da svi obavezni MCP sigurnosni zahtjevi (MORA/MORA NE) budu usklađeni s najnovijom specifikacijom
- **Ažurnost Resursa**: Provjereni svi vanjski linkovi na Microsoft dokumentaciju, sigurnosne standarde i vodiče za implementaciju
- **Pokrivenost Najboljih Praksi**: Potvrđena sveobuhvatna pokrivenost autentifikacije, autorizacije, AI-specifičnih prijetnji, sigurnosti lanca opskrbe i enterprise obrazaca

## 6. listopada 2025.

### Proširenje Sekcije Za Početak – Napredna Upotreba Servera i Jednostavna Autentifikacija

#### Napredna Upotreba Servera (03-GettingStarted/10-advanced)
- **Dodano Novo Poglavlje**: Uveden sveobuhvatan vodič za naprednu upotrebu MCP servera, pokrivajući regularnu i low-level server arhitekturu.
  - **Regularni vs Low-Level Server**: Detaljna usporedba i primjeri koda u Pythonu i TypeScriptu za oba pristupa.
  - **Dizajn Temeljen na Handlerima**: Objašnjenje upravljanja alatima/resursima/promptima pomoću handler-based pristupa za skalabilne, fleksibilne server implementacije.
  - **Praktični Obrasci**: Stvarni scenariji gdje su low-level server paterni korisni za napredne značajke i arhitekturu.

#### Jednostavna Autentifikacija (03-GettingStarted/11-simple-auth)
- **Dodano Novo Poglavlje**: Korak-po-korak vodič za implementaciju jednostavne autentifikacije u MCP serverima.
  - **Koncepti Autentifikacije**: Jasno objašnjenje razlike između autentifikacije i autorizacije te upravljanja vjerodajnicama.
  - **Osnovna Implementacija Autentifikacije**: Obrasci autentifikacije temeljeni na middlewareu u Pythonu (Starlette) i TypeScriptu (Express), s primjerima koda.
  - **Progresija do Napredne Sigurnosti**: Smjernice za početak s jednostavnom autentifikacijom i napredak prema OAuth 2.1 i RBAC, uz reference na napredne sigurnosne module.

Ova dodavanja pružaju praktične, hands-on smjernice za izgradnju robusnijih, sigurnijih i fleksibilnijih MCP server implementacija, spajajući temeljne koncepte s naprednim obrascima proizvodnje.

## 29. rujna 2025.

### MCP Server Integracija Baze Podataka Radionice - Sveobuhvatni Praktični Put Učenja

#### 11-MCPServerHandsOnLabs - Novi Sveobuhvatni Kurikulum Integracije Baza Podataka
- **Potpuni Put Učenja s 13 Radionica**: Dodan sveobuhvatan praktični kurikulum za izgradnju produkcijski spremnih MCP servera s integracijom PostgreSQL baze podataka
  - **Stvarna Implementacija**: Zava Retail analitički slučaj pokazuje enterprise razne obrasce
  - **Strukturirana Progresija Učenja**:
    - **Radionice 00-03: Osnove** - Uvod, Temeljna Arhitektura, Sigurnost i Multi-Tenant, Postavljanje Okoline
    - **Radionice 04-06: Izgradnja MCP Servera** - Dizajn baze podataka i shema, Implementacija MCP Servera, Razvoj alata  
    - **Radionice 07-09: Napredne Značajke** - Integracija semantičkog pretraživanja, Testiranje i Debugging, VS Code integracija
    - **Radionice 10-12: Produkcija i Najbolje Prakse** - Strategije postavljanja, Monitoring i promatranje, Najbolje prakse i optimizacija
  - **Enterprise Tehnologije**: FastMCP framework, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Napredne Značajke**: Row Level Security (RLS), semantičko pretraživanje, multi-tenant pristup podacima, vektorske ugradnje, nadzor u stvarnom vremenu

#### Standardizacija Terminologije - Konverzija Modula u Radionice
- **Sveobuhvatno Ažuriranje Dokumentacije**: Sistematski ažurirani svi README fajlovi u 11-MCPServerHandsOnLabs da koriste termin "Lab" umjesto "Module"
  - **Naslovi Sekcija**: Promijenjeno "What This Module Covers" u "What This Lab Covers" kroz svih 13 radionica
  - **Opis Sadržaja**: Promijenjeno "This module provides..." u "This lab provides..." kroz dokumentaciju
  - **Ciljevi Učenja**: Promijenjeno "By the end of this module..." u "By the end of this lab..."
  - **Navigacijske Poveznice**: Pretvoreni svi "Module XX:" referenci u "Lab XX:" u međureferencama i navigaciji
  - **Praćenje Završetka**: Promijenjeno "After completing this module..." u "After completing this lab..."
  - **Očuvane Tehničke Reference**: Očuvani Python modul referenci u konfiguracijskim datotekama (npr. `"module": "mcp_server.main"`)

#### Poboljšanje Vodiča za Učenje (study_guide.md)
- **Vizualna Mapa Kurikuluma**: Dodana nova sekcija "11. Database Integration Labs" sa sveobuhvatnom vizualizacijom strukture radionice
- **Struktura Repozitorija**: Ažurirano s deset na jedanaest glavnih sekcija s detaljnim opisom 11-MCPServerHandsOnLabs
- **Smjernice Putanje Učenja**: Poboljšane upute za navigaciju kroz sekcije 00-11
- **Pokriće Tehnologije**: Dodani detalji o FastMCP, PostgreSQL, integracija Azure servisa
- **Ishodi Učenja**: Naglašen razvoj produkcijski spremnih servera, obrasci integracije baza podataka i enterprise sigurnost

#### Poboljšanje Glavne README Strukture
- **Terminologija Bazirana na Radionicama**: Ažuriran glavni README.md u 11-MCPServerHandsOnLabs da dosljedno koristi "Lab" strukturu
- **Organizacija Putanje Učenja**: Jasna progresija od temeljnih koncepata preko napredne implementacije do produkcijskog postavljanja
- **Fokus na Stvarni Svijet**: Naglasak na praktično, hands-on učenje s enterprise razinama obrazaca i tehnologija

### Poboljšanja Kvalitete i Dosljednosti Dokumentacije
- **Naglasak na Praktično Učenje**: Pojačan praktični, bazirani na radionicama pristup kroz cijelu dokumentaciju
- **Fokus na Enterprise Obrasce**: Istaknute produkcijski spremne implementacije i enterprise sigurnosni aspekti
- **Integracija Tehnologije**: Sveobuhvatno pokrivanje suvremenih Azure servisa i AI integracijskih obrazaca
- **Progresija Učenja**: Jasna, strukturirana putanja od osnovnih koncepata do produkcijskog postavljanja

## 26. rujna 2025.

### Poboljšanja Studija Slučaja - GitHub MCP Registry Integracija

#### Studije Slučaja (09-CaseStudy/) - Fokus na Razvoju Ekosustava
- **README.md**: Veliko proširenje s opsežnim GitHub MCP Registry studijom slučaja
  - **GitHub MCP Registry Studija Slučaja**: Nova sveobuhvatna studija ispitujući GitHub-ovo lansiranje MCP Registryja u rujnu 2025.
    - **Analiza Problema**: Detaljna analiza fragmentiranog otkrivanja MCP servera i izazova postavljanja
    - **Arhitektura Rješenja**: GitHubov centralizirani pristup registru s jednim klikom instalacije za VS Code
    - **Poslovni Utjecaj**: Mjerljiva poboljšanja u onboardingu developera i produktivnosti
    - **Strateška Vrijednost**: Fokus na modularnu implementaciju agenata i međualatnu interoperabilnost
    - **Razvoj Ekosustava**: Pozicioniranje kao osnovna platforma za agentnu integraciju
  - **Poboljšana Struktura Studije Slučaja**: Ažurirane sve sedam studija slučaja s dosljednim formatiranjem i sveobuhvatnim opisima
    - Azure AI Travel Agents: Naglasak na višestruku agentnu koordinaciju
    - Azure DevOps Integracija: Fokus na automatizaciju radnog toka
    - Dohvat Dokumentacije u Realnom Vremenu: Implementacija konzolnog Python klijenta
    - Interaktivni Generator Studijskog Plana: Chainlit konverzacijska web aplikacija
    - Dokumentacija unutar Editora: VS Code i GitHub Copilot integracija
    - Azure API Management: Enterprise API integracijski obrasci
    - GitHub MCP Registry: razvoj ekosustava i platforma zajednice
  - **Sveobuhvatan Zaključak**: Prepisani zaključak s naglaskom na sedam studija slučaja koje pokrivaju višestruke dimenzije MCP implementacije
    - Enterprise integracija, višeagentna orkestracija, produktivnost developera
    - Kategorizacija razvoja ekosustava i edukativnih primjena
    - Poboljšani uvidi u arhitektonske obrasce, implementacijske strategije i najbolje prakse
    - Naglasak na MCP kao zrelom, produkcijski spremnom protokolu

#### Ažuriranja Vodiča za Učenje (study_guide.md)
- **Vizualna Mapa Kurikuluma**: Ažurirana mapa koncepta da uključi GitHub MCP Registry u odjeljak Studija Slučaja
- **Opis Studija Slučaja**: Prošireni iz generičkih opisa na detaljnu analizu sedam sveobuhvatnih studija slučaja
- **Struktura Repozitorija**: Ažurirana sekcija 10 radi odražavanja sveobuhvatnog obuhvata studije slučaja s konkretnim detaljima implementacije
- **Integracija Dnevnika Promjena**: Dodan zapis od 26. rujna 2025. dokumentirajući dodatak GitHub MCP Registry i poboljšanja studija slučaja
- **Ažuriranja Datuma**: Ažuriran podnožni timestamp da odražava najnoviju reviziju (26. rujna 2025.)

### Poboljšanja Kvalitete Dokumentacije
- **Poboljšana Dosljednost**: Standardizirano formatiranje i struktura studija slučaja kroz svih sedam primjera
- **Sveobuhvatno Pokriće**: Studije slučaja sada pokrivaju enterprise, produktivnost developera i scenarije razvoja ekosustava
- **Strateško Pozicioniranje**: Pojačan fokus na MCP kao osnovnoj platformi za implementaciju agentnih sustava
- **Integracija Resursa**: Ažurirani dodatni resursi kako bi uključili GitHub MCP Registry link

## 15. rujna 2025.

### Proširenje Naprednih Tema - Prilagođeni Transporti i Inženjering Konteksta

#### MCP Prilagođeni Transporti (05-AdvancedTopics/mcp-transport/) - Novi Vodič za Naprednu Implementaciju
- **README.md**: Potpuni vodič za implementaciju prilagođenih MCP transportnih mehanizama
  - **Azure Event Grid Transport**: Sveobuhvatna serverless event-driven transport implementacija
    - Primjeri u C#, TypeScript i Python uz integraciju Azure Functions
    - Event-driven arhitekture za skalabilna MCP rješenja
    - Primatelji webhookova i push-based obrada poruka
  - **Azure Event Hubs Transport**: Implementacija streaming transporta velike propusnosti
    - Streaming u stvarnom vremenu za scenarije niske latencije
    - Strategije particioniranja i upravljanje checkpointima
    - Grupiranje poruka i optimizacija performansi
  - **Enterprise Integracijski Obrasci**: Produkcijski arhitektonski primjeri
    - Distribuirana MCP obrada preko više Azure Functions
    - Hibridne transportne arhitekture kombinirajući više transportnih vrsta
    - Strategije otpornosti, pouzdanosti i obrade pogrešaka poruka
  - **Sigurnost i Monitoring**: Integracija Azure Key Vault i obrasci promatranja
    - Autentifikacija upravljanim identitetom i pristup s najmanjim privilegijama
    - Telemetrija Application Insights i monitoring performansi
    - Prekidači struje i obrasci otpornosti na pogreške
  - **Okviri za Testiranje**: Sveobuhvatne strategije testiranja prilagođenih transporta
    - Jedinični testovi s test dablovima i mocking frameworkima
    - Integracijsko testiranje s Azure Test Containers
    - Razmatranja za testiranje performansi i opterećenja

#### Inženjering Konteksta (05-AdvancedTopics/mcp-contextengineering/) - Rastuća AI Disciplina
- **README.md**: Sveobuhvatan pregled inženjeringa konteksta kao rastućeg područja
  - **Temeljna Načela**: Potpuno dijeljenje konteksta, svijest o odlukama za akciju i upravljanje kontekstnim prozorima
  - **Usklađenost s MCP Protokolom**: Kako dizajn MCP-a adresira izazove inženjeringa konteksta
    - Ograničenja kontekstnih prozora i progresivne strategije učitavanja
    - Određivanje relevantnosti i dinamičko dohvaćanje konteksta
    - Multimodalno upravljanje kontekstom i sigurnosne razmatranja
  - **Pristupi Implementaciji**: Jednoprijeđna vs. višestruka agentna arhitektura
    - Segmentacija i prioritizacija konteksta
    - Progresivno učitavanje i strategije kompresije konteksta
    - Višeslojni pristupi kontekstu i optimizacija dohvaćanja
  - **Okvir za Mjerenje**: Rastuće metrike za procjenu učinkovitosti konteksta
    - Učinkovitost unosa, performanse, kvaliteta i korisničko iskustvo
    - Eksperimentalni pristupi optimizaciji konteksta
    - Analiza neuspjeha i metode poboljšanja

#### Ažuriranja Navigacije Kurikuluma (README.md)
- **Poboljšana Struktura Modula**: Ažurirana tablica kurikuluma da uključi nove napredne teme
  - Dodani unosi Inženjering Konteksta (5.14) i Prilagođeni Transport (5.15)
  - Dosljedno formatiranje i navigacijski linkovi kroz sve module
  - Ažurirani opisi da odražavaju trenutačni opseg sadržaja

### Poboljšanja Strukture Direktorija
- **Standardizacija Imenovanja**: Preimenovan "mcp transport" u "mcp-transport" radi usklađenosti s ostalim mapama naprednih tema
- **Organizacija Sadržaja**: Sve 05-AdvancedTopics mape sada slijede dosljedan obrazac imenovanja (mcp-[tema])

### Poboljšanja Kvalitete Dokumentacije
- **Usklađenost s MCP Specifikacijom**: Svi novi sadržaji referenciraju aktualnu MCP Specification 2025-06-18
- **Primjeri na Više Jezika**: Sveobuhvatni primjeri koda u C#, TypeScriptu i Pythonu

- **Fokus na poduzeće**: Uzorci spremni za proizvodnju i integracija Azure oblaka kroz cijeli sustav
- **Vizualna dokumentacija**: Mermaid dijagrami za vizualizaciju arhitekture i toka

## 18. kolovoza 2025.

### Sveobuhvatna nadogradnja dokumentacije - Standardi MCP 2025-06-18

#### Najbolje sigurnosne prakse MCP-a (02-Security/) - Potpuna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Potpuna prerada usklađena s MCP specifikacijom 2025-06-18
  - **Obavezni zahtjevi**: Dodani eksplicitni ZAHTJEVA/SAMO NE smiju zahtjevi iz službene specifikacije s jasnim vizualnim pokazateljima
  - **12 osnovnih sigurnosnih praksi**: Restrukturirane s popisa od 15 stavki u sveobuhvatne sigurnosne domene
    - Sigurnost tokena i autentifikacija s integracijom vanjskog pružatelja identiteta
    - Upravljanje sesijama i sigurnost prijenosa s kriptografskim zahtjevima
    - Zaštita specifična za AI s integracijom Microsoft Prompt Shields
    - Kontrola pristupa i dozvole s načelom najmanjih privilegija
    - Sigurnost i nadzor sadržaja s integracijom Azure Content Safety
    - Sigurnost lanca opskrbe s detaljnom verifikacijom komponenti
    - OAuth sigurnost i sprječavanje Confused Deputy napada s implementacijom PKCE
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
    - Usklađenost i upravljanje s regulatornim zahtjevima
    - Napredne sigurnosne kontrole s arhitekturom zero trust
    - Integracija Microsoft sigurnosnog ekosustava s opsežnim rješenjima
    - Kontinuirana evolucija sigurnosti s prilagodljivim praksama
  - **Microsoft sigurnosna rješenja**: Poboljšane smjernice za integraciju Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Resursi za implementaciju**: Kategorizirane sveobuhvatne poveznice po službenoj MCP dokumentaciji, Microsoft sigurnosnim rješenjima, sigurnosnim standardima i vodičima za implementaciju

#### Napredne sigurnosne kontrole (02-Security/) - Implementacija za poduzeća
- **MCP-SECURITY-CONTROLS-2025.md**: Potpuna preinaka s sigurnosnim okvirom razine poduzeća
  - **9 sveobuhvatnih sigurnosnih domena**: Prošireno s osnovnih kontrola na detaljan okvir za poduzeća
    - Napredna autentifikacija i autorizacija s integracijom Microsoft Entra ID
    - Sigurnost tokena i kontrole protiv neovlaštenog prosljeđivanja s opsežnom validacijom
    - Sigurnosne kontrole sesija s prevencijom preuzimanja kontrole
    - AI-specifične sigurnosne kontrole s prevencijom prompt injekcija i trovanja alata
    - Prevencija Confused Deputy napada s OAuth proxy sigurnošću
    - Sigurnost izvršavanja alata s sandboxingom i izolacijom
    - Sigurnosne kontrole lanca opskrbe s verifikacijom ovisnosti
    - Kontrole nadzora i detekcije s integracijom SIEM
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
  - **Primjeri implementacije**: Dodani detaljni YAML konfiguracijski blokovi i primjeri koda
  - **Integracija s Microsoft rješenjima**: Opsežno pokrivanje Azure sigurnosnih usluga, GitHub Advanced Security i identitetskog upravljanja na razini poduzeća

#### Napredne sigurnosne teme (05-AdvancedTopics/mcp-security/) - Implementacija spremna za proizvodnju
- **README.md**: Potpuna prerada za sigurnosnu implementaciju u poduzeću
  - **Usklađenost s trenutnom specifikacijom**: Ažurirano prema MCP specifikaciji 2025-06-18 s obaveznim sigurnosnim zahtjevima
  - **Napredna autentifikacija**: Integracija Microsoft Entra ID s opsežnim .NET i Java Spring Security primjerima
  - **Integracija AI sigurnosti**: Implementacija Microsoft Prompt Shields i Azure Content Safety s detaljnim Python primjerima
  - **Napredna mitigacija prijetnji**: Opsežni primjeri implementacije za
    - Prevenciju Confused Deputy napada s PKCE i validacijom korisničkog pristanka
    - Prevenciju prosljeđivanja tokena s validacijom publike i sigurnim upravljanjem tokenima
    - Prevenciju preuzimanja sesije s kriptografskim vezivanjem i analizom ponašanja
  - **Integracija sigurnosti poduzeća**: Nadgledanje Azure Application Insights, pipelineovi za detekciju prijetnji i sigurnost lanca opskrbe
  - **Popis za implementaciju**: Jasno označene obavezne i preporučene sigurnosne kontrole s prednostima ekosustava Microsoft sigurnosti

### Kvaliteta dokumentacije i usklađenost s normama
- **Referencije specifikacije**: Ažurirani svi linkovi na trenutnu MCP specifikaciju 2025-06-18
- **Microsoft sigurnosni ekosustav**: Poboljšane smjernice za integraciju kroz svu sigurnosnu dokumentaciju
- **Praktična implementacija**: Dodani detaljni primjeri koda u .NET-u, Javi i Pythonu s obrascima za poduzeća
- **Organizacija resursa**: Sveobuhvatna kategorizacija službene dokumentacije, sigurnosnih standarda i vodiča za implementaciju
- **Vizualni pokazatelji**: Jasno označavanje obaveznih zahtjeva naspram preporučenih praksi


#### Osnovni koncepti (01-CoreConcepts/) - Potpuna modernizacija
- **Ažuriranje verzije protokola**: Ažurirano za referencu trenutne MCP specifikacije 2025-06-18 s verzioniranjem temeljenim na datumu (format: GGGG-MM-DD)
- **Dorada arhitekture**: Poboljšani opisi domaćina, klijenata i poslužitelja za reflektiranje trenutnih MCP arhitektonskih obrazaca
  - Domaćini sada jasno definirani kao AI aplikacije koje koordiniraju više MCP klijent veza
  - Klijenti opisani kao protokolarni priključci koji održavaju odnos jedan-na-jedan s poslužiteljima
  - Poslužitelji prošireni s lokalnim i udaljenim scenarijima postavljanja
- **Potpuna preinaka primitiva**: Potpuna prerada primitives poslužitelja i klijenata
  - Primitivi poslužitelja: Resursi (izvori podataka), Prompts (predlošci), Alati (izvršne funkcije) s detaljnim objašnjenjima i primjerima
  - Primitivi klijenta: Uzorkovanje (dovršetci LLM-a), Elicitation (unos korisnika), Logiranje (debugging/nadzor)
  - Ažurirano s trenutnim obrascima metoda za otkrivanje (`*/list`), dohvat (`*/get`) i izvršavanje (`*/call`)
- **Arhitektura protokola**: Uvođenje dvoslojnog modela arhitekture
  - Sloj podataka: JSON-RPC 2.0 temelj s upravljanjem životnim ciklusom i primitivima
  - Sloj prijenosa: STDIO (lokalno) i Streamable HTTP s SSE (udaljeni) mehanizmi prijenosa
- **Sigurnosni okvir**: Sveobuhvatna sigurnosna načela uključujući eksplicitan korisnički pristanak, zaštitu privatnosti podataka, sigurnost izvršavanja alata i sigurnost sloja prijenosa
- **Obrasci komunikacije**: Ažurirane protokolarne poruke koje prikazuju tokove inicijalizacije, otkrivanja, izvršavanja i obavještavanja
- **Primjeri koda**: Osvježeni primjeri za više jezika (.NET, Java, Python, JavaScript) koji reflektiraju trenutne MCP SDK obrasce

#### Sigurnost (02-Security/) - Sveobuhvatna preinaka sigurnosti  
- **Usklađenost sa standardima**: Potpuna usklađenost sa zahtjevima sigurnosti MCP specifikacije 2025-06-18
- **Evolucija autentifikacije**: Dokumentirana evolucija od prilagođenih OAuth poslužitelja do delegacije vanjskom pružatelju identiteta (Microsoft Entra ID)
- **Analiza prijetnji specifičnih za AI**: Poboljšano pokrivanje modernih AI vektora napada
  - Detaljni scenariji napada prompt injekcijom s realnim primjerima
  - Mehanizmi trovanja alata i obrasci "rug pull" napada
  - Trovanje kontekstnog prozora i napadi na zbunjivanje modela
- **Microsoft AI sigurnosna rješenja**: Sveobuhvatno pokrivanje Microsoft sigurnosnog ekosustava
  - AI Prompt Shields s naprednom detekcijom, isticanjem i tehnikama razdjelnika
  - Obrasci integracije Azure Content Safety
  - GitHub Advanced Security za zaštitu lanca opskrbe
- **Napredna mitigacija prijetnji**: Detaljne sigurnosne kontrole za
  - Preuzimanje sesije s MCP-specifičnim scenarijima napada i kriptografskim zahtjevima za ID sesije
  - Problemi Confused Deputy u MCP proxy scenarijima s eksplicitnim zahtjevima za pristanak
  - Ranljivosti prosljeđivanja tokena s obaveznim kontrolama validacije
- **Sigurnost lanca opskrbe**: Prošireno pokrivanje AI lanca opskrbe uključujući osnovne modele, usluge embeddings, pružatelje konteksta i API-je trećih strana
- **Osnovna sigurnost**: Poboljšana integracija s obrascima sigurnosti za poduzeća uključujući arhitekturu zero trust i Microsoft sigurnosni ekosustav
- **Organizacija resursa**: Kategorizirane sveobuhvatne poveznice prema tipu (Službena dokumentacija, Standardi, Istraživanja, Microsoft rješenja, Vodiči za implementaciju)

### Unapređenja kvalitete dokumentacije
- **Strukturirani ciljevi učenja**: Poboljšani ciljevi učenja s konkretnim, ostvarivim rezultatima 
- **Međureferencije**: Dodane poveznice između povezanih tema sigurnosti i osnovnih koncepata
- **Ažurne informacije**: Ažurirani svi datumski podaci i poveznice na trenutačne standarde
- **Smjernice za implementaciju**: Dodane konkretne i ostvarive smjernice kroz oba dijela

## 16. srpnja 2025.

### Nadogradnje README-a i navigacije
- Potpuno redizajnirana navigacija kurikuluma u README.md
- Zamijenjeni `<details>` tagovi pristupačnijim tabličnim formatom
- Kreirane alternativne opcije izgleda u novoj mapi "alternative_layouts"
- Dodani primjeri navigacije card-based, tabbed-style i accordion-style
- Ažuriran odjeljak strukture repozitorija za uključivanje svih najnovijih datoteka
- Poboljšan odjeljak "Kako koristiti ovaj kurikulum" sa jasnim preporukama
- Ažurirane poveznice MCP specifikacije za ispravne URL-ove
- Dodan odjeljak Context Engineering (5.14) u strukturu kurikuluma

### Nadogradnje priručnika za učenje
- Potpuno revidiran priručnik za učenje radi usklađivanja sa trenutnom strukturom repozitorija
- Dodani novi odjeljci za MCP klijente i alate, te popularne MCP poslužitelje
- Ažurirana Vizualna karta kurikuluma za točno prikazivanje svih tema
- Poboljšani opisi naprednih tema za pokrivanje svih specijaliziranih područja
- Ažuriran odjeljak studija slučaja da odražava stvarne primjere
- Dodan ovaj sveobuhvatni zapis promjena

### Doprinosi zajednice (06-CommunityContributions/)
- Dodane detaljne informacije o MCP poslužiteljima za generiranje slika
- Dodan sveobuhvatni odjeljak o korištenju Claude u VSCodeu
- Dodane upute za postavljanje i korištenje Cline terminalnog klijenta
- Ažuriran odjeljak MCP klijenta za uključivanje svih popularnih opcija klijenata
- Poboljšani primjeri doprinosa s preciznijim uzorcima koda

### Napredne teme (05-AdvancedTopics/)
- Organizirane sve mape specijaliziranih tema s dosljednim nazivljem
- Dodani materijali i primjeri kontekstualnog inženjerstva
- Dodana dokumentacija integracije Foundry agenta
- Poboljšana dokumentacija sigurnosne integracije Entra ID-a

## 11. lipnja 2025.

### Početno kreiranje
- Objavljena prva verzija MCP za početnike kurikuluma
- Kreirana osnovna struktura svih 10 glavnih odjeljaka
- Implementirana Vizualna karta kurikuluma radi navigacije
- Dodani početni uzorci projekata u više programskih jezika

### Početak rada (03-GettingStarted/)
- Kreirani prvi primjeri implementacije poslužitelja
- Dodane smjernice za razvoj klijenta
- Upute za integraciju LLM klijenta uključene
- Dodana dokumentacija za integraciju VS Codea
- Implementirani primjeri poslužitelja za Server-Sent Events (SSE)

### Osnovni koncepti (01-CoreConcepts/)
- Dodano detaljno objašnjenje arhitekture klijent-poslužitelj
- Kreirana dokumentacija o ključnim komponentama protokola
- Dokumentirani obrasci poruka u MCP-u

## 23. svibnja 2025.

### Struktura repozitorija
- Inicijaliziran repozitorij s osnovnom strukturom mapa
- Kreirani README fajlovi za svaki glavni odjeljak
- Postavljena infrastruktura za prijevod
- Dodane slike i dijagrami

### Dokumentacija
- Kreiran početni README.md s pregledom kurikuluma
- Dodani CODE_OF_CONDUCT.md i SECURITY.md
- Postavljen SUPPORT.md s uputama za dobivanje pomoći
- Kreirana preliminarna struktura priručnika za učenje

## 15. travnja 2025.

### Planiranje i okvir
- Početno planiranje MCP za početnike kurikuluma
- Definiranje ciljeva učenja i ciljne publike
- Nacrtao 10-odjeljnu strukturu kurikuluma
- Razvijen konceptualni okvir za primjere i studije slučaja
- Kreirani početni prototipni primjeri ključnih koncepata

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->