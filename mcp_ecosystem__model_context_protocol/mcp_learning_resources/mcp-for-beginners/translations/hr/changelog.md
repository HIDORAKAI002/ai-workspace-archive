# Izmjene: MCP za početnike kurikulum

Ovaj dokument služi kao zapis svih značajnih promjena napravljenih u Model Context Protocol (MCP) za početnike kurikulumu. Promjene su dokumentirane u obrnutom kronološkom redu (najnovije promjene prve).

## 16. lipnja 2026.

### Usklađivanje specifikacije MCP-a i validacija primjera

Provjerili smo usklađenost kurikuluma s važećom **MCP specifikacijom 2025-11-25** i najnovijim službenim SDK-ovima, zatim ispravili preostale zastarjele reference na specifikacije te potvrdili da se osnovni primjeri i dalje ispravno izrađuju i pokreću.

#### Ispravke verzija specifikacije (2025-06-18 / 2025-03-26 → 2025-11-25)

Ažurirali smo sadržaj na engleskom gdje je još uvijek tvrdio da je starija verzija specifikacije *trenutni/najnoviji* standard te preusmjerili poveznice na kanonske `modelcontextprotocol.io` putove specifikacija:
- **05-AdvancedTopics/mcp-security/README.md**: Ažurirali banner "Trenutni Standard", uvod, naslov osnovnih sigurnosnih načela, naslov obaveznih zahtjeva, odjeljak Microsoft Entra ID, poveznice na Reference i Resurse te završnu sigurnosnu napomenu (8 referenci) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Ažurirali poveznicu Specifikacije dodatnih resursa i banner "Trenutni Standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamijenili zastarjelu poveznicu `2025-03-26` na sigurnosne i prakse povjerenja s trenutnom stranicom sigurnosnih najboljih praksi 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Ažurirali službenu poveznicu za uzorkovanje na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Ažurirali u sadašnjem vremenu "trenutnu MCP specifikaciju" i poveznicu Specifikacije dodatnih resursa na 2025-11-25 (povijesne bilješke o deprecaciji SSE ostale su nepromijenjene radi točnosti)

#### Validacija primjera prema najnovijim SDK-ovima

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` je riješio `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` je prošao bez pogrešaka tipa — postojeći `McpServer`/`StdioServerTransport` API-ji ostaju valjani
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validirano u izoliranom `.venv` s `mcp[cli]` (1.27.2); `py_compile` je prošao i `FastMCP.list_tools()` je ispravno vratio alate `add` i `subtract`
- Potvrđeno je da svi primjeri s verzijskim domenama `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) čisto rješavaju trenutnu verziju `1.29.0` bez prekidanja API-ja

#### Usklađivanje pinova ovisnosti (zatvaranje verzijskih praznina)

Ažurirali smo zastarjele pinove SDK-a tako da svaki primjer prati trenutačno MCP izdanje, usklađeno s konvencijom cijelog repozitorija:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Podignut `@modelcontextprotocol/sdk` s `^1.8.0` na `>=1.26.0` i ažuriran zastarjeli opis paketa `"updated for MCP 2025-06-18"` u `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** i **lab4/code/github_mcp_server/pyproject.toml**: Podignut precizni pin `mcp==1.23.0` na `mcp>=1.26.0`; regenerirane obje `uv.lock` datoteke (`uv lock`) tako da lockfileovi rješavaju na trenutačni `mcp 1.27.2` i ostaju usklađeni s manifestima

#### Analiza praznina u kurikulumu — pokrivenost najnovijih značajki specifikacije

Potvrđeno je da kurikulum već pokriva sve primitivne elemente uvedene/razrađene u MCP 2025-11-25, tako da nema praznina u sadržaju:
- **Uzorkovanje (Sampling)**: lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitacija (uključujući URL način)**: dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Korijeni (Roots)**: dokumentirano u 00-Introduction, 01-CoreConcepts i 05-AdvancedTopics/mcp-root-contexts
- **Zadaci (eksperimentalno, dugotrajne operacije)**: dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features
- **Bilješke alata** (`readOnlyHint` / `destructiveHint`): dokumentirano u 01-CoreConcepts i 05-AdvancedTopics/mcp-protocol-features

### Pojačanje sigurnosti i otklanjanje ranjivosti ovisnosti

Proveli smo potpunu sigurnosnu provjeru svakog manifesta ovisnosti i izvornog koda primjera, zatim otklonili sve prijavljene npm savjete i jednu ugroženost na razini koda. Nakon toga `npm audit` više ne prijavljuje **niti jednu ranjivost** u svim provjerenim direktorijima.

#### Ranjivosti npm ovisnosti (transitivne) — popravljene

Pregledali smo svih 15 predanih `package-lock.json` datoteka. Ranjivosti su bile ograničene na tranzitivne ovisnosti koje su povučeni od strane MCP Inspector razvojnog alata, OpenAI klijenta i MCP SDK-a; sve su sada riješene bez prekidanja primjera:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** i **lab3/code/weather_mcp/inspector**: Podignut paket `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), što je uklonilo prijave ranjivosti za ugrađene `ajv`, `brace-expansion`, `diff`, `path-to-regexp` i `ws`. Dodan je npm `overrides` unos koji prisiljava zakrpljeni `shell-quote@1.8.4` da ukloni preostalu kritičnu ranjivost koju je nosio `concurrently`; ukupno regenerirane obje lock datoteke (sada 0 ranjivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` je ažurirao tranzitivni `qs` (umjerena) na zakrpanu verziju
- **03-GettingStarted/samples/javascript**: `npm audit fix` je ažurirao tranzitivni `hono` (umjerena) na zakrpanu verziju
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` je ažurirao tranzitivni `form-data` (visoka) na zakrpanu verziju
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana je nedostajuća `package-lock.json` radi reproducibilnosti i sljedivosti projekta (0 ranjivosti)

#### Sigurnosna ispravka na razini koda (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Uklonjen `shell=True` iz alata `open_in_vscode`. Prethodni `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` dopuštao je tumačenje višeznačnih znakova školjke u putanji do mape kroz `cmd.exe` (vektor za komandne injekcije). Sada se pokreće izravno razrijeđeni `Code.exe` s mapom kao argumentom — bez školjke — što je funkcionalno ekvivalentno i sigurno

#### Python sigurnosna revizija ovisnosti

- Pregledali smo svaki skup Python ovisnosti pomoću `pip-audit`. `05-AdvancedTopics` i `03-GettingStarted/samples/python` nisu prijavili **niti jednu poznatu ranjivost** (njihova `mcp` / `httpx` / `pydantic` / `python-dotenv` područja verzija rješavaju se na trenutačne zakrpane verzije)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je detektirao tranzitivnu ovisnost **`werkzeug` 3.1.1** s tri savjeta vezana uz `safe_join` Windows imena uređaja za DoS — `CVE-2025-66221`, `CVE-2026-21860` i `CVE-2026-27199` (sve popravljeno u 3.1.6). Dodan je eksplicitan sigurnosni pin `werkzeug>=3.1.6` radi rješavanja zakrpljene verzije; potvrđeno da ograničenje uredno rješava s `chainlit` / `mcp` / `semantic-kernel` stackom

### Rebranding naziva proizvoda

Ažurirani su svi dijelovi kurikuluma da odražavaju promjenu naziva Microsoftovog proizvoda:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Ažurirana poveznica Discord zajednice
- **AGENTS.md**: Ažurirana referenca Discord servera
- **README.md**: Ažurirane reference tehnološkog ekosustava
- **study_guide.md**: Ažurirane reference studija slučaja
- **05-AdvancedTopics/README.md**: Ažurirani naslov i opis Modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Ažurirani naslov odjeljka i opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Potpuno ažuriranje naslova modula i sadržaja
- **05-AdvancedTopics/mcp-security-entra/README.md**: Ažurirana poveznica s križnim referencama
- **07-LessonsfromEarlyAdoption/README.md**: Ažurirane reference studija slučaja
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Ažuriran naslov Sekcije 9, značke i sposobnosti
- **08-BestPractices/README.md**: Ažurirana poveznica Discord zajednice
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Ažurirana referenca Discord kanala
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Ažurirana referenca na plasman modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Ažurirana tablica AI servisa
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Ažurirane reference resursa

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension za VS Code
- **README.md**: Ažurirane glavne reference kurikuluma
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Ažurirani naslov modula, pregled i svi naslovi podmodula
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Ažurirani naslov, ciljevi učenja, upute za postavljanje i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Ažurirani naslov, ciljevi učenja, tablica MCP hostova i križne reference
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Ažurirani naslov, značke, preduvjeti i resursi
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Ažurirane reference Agent Buildera i poveznica za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Ažurirani preduvjeti i reference na ekstenziju

---

## 11. travnja 2026.

### Nova lekcija, ispravci dokumentacije i ažuriranja ovisnosti

#### Novi sadržaj kurikuluma dodan

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Protuvrijedno višagentno rezoniranje s MCP-om** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Novi sveobuhvatni vodič koji pokriva obrazac proturječne debate za višagentne sustave
  - Diagram arhitekture u Mermaidu: dva agenta → zajednički MCP server → transkript debate → sudac → presuda
  - Zajednički MCP alatni server (`web_search` + `run_python`) implementiran u Pythonu i TypeScriptu
  - Suprotstavljeni sistemski promptovi (ZA / PROTIV / Sudac) s eksplicitnim zahtjevima za korištenje alata
  - Orkestrator debate u Pythonu, TypeScriptu i C# koji upravlja rundama i usmjeravanjem argumenata
  - MCP `ClientSession` povezivanje za orkestratora ka stvarnim pozivima alata
  - Tablica slučajeva uporabe (detekcija halucinacija, modeliranje prijetnji, pregled dizajna API-ja, provjera činjenica, odabir tehnologije)
  - Sigurnosna razmatranja: sandbox izvršenje, validacija poziva alata, ograničavanje brzine, audit logging
  - Strukturirana vježba s tri praktična scenarija (pregled koda, odluka o arhitekturi, moderacija sadržaja)

#### Ispravci dokumentacije

**Modul 03 - Početak rada**
- **05-stdio-server/README.md**: Ispravljen nepotpun primjer stdio servera u TypeScriptu — dodana je nedostajuća inicijalizacija transporta (`new StdioServerTransport()`) i poziv `server.connect(transport)` radi usklađivanja s primjerima u Pythonu i .NET-u u istom odjeljku
- **14-sampling/README.md**: Ispravljena tipfeler — ispravljeno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Ažuriranja kurikuluma

**Glavni README.md**
- Dodan unos 5.17 (Protuvrijedno višagentno rezoniranje s MCP-om) u tablicu kurikuluma s direktnom poveznicom na novu lekciju

**05-AdvancedTopics/README.md**
- Dodan redak za Lekciju 5.17 u tablicu lekcija

**study_guide.md**
- Dodana tema Protuvrijednog višagentnog rezoniranja u mentalnu mapu i opis naprednih tema u proznom obliku

#### Ispravci koda i sigurnosti

**Modul 05 - Protuvrijedni agenti (`mcp-adversarial-agents`)**
- **Sigurnosna ispravka — injekcija naredbi**: Zamijenjen `execSync` s interpolacijom školjke s `execFile` + `promisify` u TypeScript alatu `run_python`, čime je uklonjena površina za injekciju naredbi (LLM-kontrolirani kod sada se šalje kao doslovni argv element bez uključivanja školjke)
- **Ožičenje petlje MCP alata**: Ažuriran raspoređivač Python rasprave za korištenje `AsyncAnthropic` klijenta (zamjenjujući blokirajući sinkroni `Anthropic`), prolazila živi `ClientSession` izravno u svaki agentov potez, dohvaćala definicije alata putem `session.list_tools()` u svakom potezu, te slala blokove `tool_use` putem `session.call_tool()` u petlji dok model ne emitira konačni tekstualni odgovor

#### Ažuriranja ovisnosti

- Nadograđen `hono` na 4.12.12 u više paketa (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Nadograđen `@hono/node-server` s 1.19.11 na 1.19.13 u TypeScript paketima  
- Nadograđen `cryptography` s 46.0.5 na 46.0.7 u Python paketima (10-StreamliningAIWorkflows laboratoriji 3 i 4)  
- Nadograđen `lodash` s 4.17.23 na 4.18.1 u inspektoru 10-StreamliningAIWorkflows  

#### Prijevodi

- Sinkronizirani prijevodi za 48+ jezika s najnovijim izmjenama izvora (i18n ažuriranje)  

---

## 5. veljače 2026.

### Poboljšanja opće validacije i navigacije u spremištu

#### Dodan novi sadržaj kurikuluma

**Modul 03 - Početak rada**  
- **12-mcp-hosts/README.md**: Novi sveobuhvatni vodič za postavljanje MCP hostova  
  - Primjeri konfiguracije za Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - JSON predlošci konfiguracije za sve glavne hostove  
  - Tablica usporedbe tipova transporta (stdio, SSE/HTTP, WebSocket)  
  - Rješavanje uobičajenih problema veze  
  - Sigurnosne najbolje prakse za konfiguraciju hosta  

- **13-mcp-inspector/README.md**: Novi vodič za otklanjanje pogrešaka MCP Inspectora  
  - Metode instalacije (npx, globalni npm, iz izvora)  
  - Povezivanje s poslužiteljima putem stdio i HTTP/SSE  
  - Alati za testiranje, resursi i tijekovi poziva  
  - Integracija u VS Code s MCP Inspektorom  
  - Uobičajeni slučajevi otklanjanja pogrešaka s rješenjima  

**Modul 04 - Praktična implementacija**  
- **pagination/README.md**: Novi vodič za implementaciju paginacije  
  - Obrasci paginacije bazirane na kurzoru u Pythonu, TypeScriptu i Javi  
  - Rukovanje paginacijom s klijentske strane  
  - Strategije dizajna kurzora (neprozirni protiv strukturiranih)  
  - Preporuke za optimizaciju izvedbe  

**Modul 05 - Napredne teme**  
- **mcp-protocol-features/README.md**: Dubinski prikaz novih značajki protokola  
  - Implementacija obavijesti o napretku  
  - Obrasci otkazivanja zahtjeva  
  - Predlošci resursa s URI obrascima  
  - Upravljanje životnim ciklusom poslužitelja  
  - Kontrola razine zapisivanja  
  - Obrasci rukovanja pogreškama s JSON-RPC kodovima  

#### Popravci navigacije (ažurirano 24+ datoteka)

**Glavni modul READMEs**  
 Sada sadrže veze i na prvi lekciju I na sljedeći modul  

**Poddatoteke 02-Security**  
- Svi su pet dodatnih sigurnosnih dokumenata sada obogaćeni navigacijom "Što je sljedeće":  

**Datoteke 09-CaseStudy**  
- Sve studije slučaja sada imaju sekvencijalnu navigaciju:  

**Laboratoriji 10-StreamliningAI**  
Dodana je sekcija Što je sljedeće u pregled modula 10 i modula 11  

#### Popravci koda i sadržaja

**Ažuriranja SDK-a i ovisnosti**  
Ispravljena prazna verzija openai na `^4.95.0`  
SDK ažuriran s `^1.8.0` na `>=1.26.0`  
Zaključani pinovi verzije mcp-a ažurirani na `>=1.26.0`  

**Popravci koda**  
Ispravljen nevažeći model `gpt-4o-mini` u `gpt-4.1-mini`  

**Popravci sadržaja**  
Ispravljena neispravna veza `READMEmd` → `README.md`, ispravljen naslov kurikuluma `Module 1-3` → `Module 0-3`, ispravljena putanja osjetljiva na velika/mala slova  
Uklonjen oštećeni duplicirani sadržaj Case Study 5  

**Poboljšanja za početnike**  
Dodani ispravni uvod, ciljevi učenja i preduvjeti za početnike  

#### Ažuriranja kurikuluma

**Glavni README.md**  
- Dodani unosi 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) u tablicu kurikuluma  

**Modul READMEs**  
Dodane lekcije 12 i 13 na popis lekcija  
Dodana sekcija Praktični vodiči s vezom na paginaciju  
Dodane lekcije 5.15 (Prilagođeni prijenos) i 5.16 (Značajke protokola)  

**study_guide.md**  
- Ažurirana misaona mapa sa svim novim temama: Postavljanje MCP hostova, MCP Inspector, Strategije paginacije, Dubinski pregled značajki protokola  

## 28. siječnja 2026.

### Pregled usklađenosti s MCP specifikacijom 2025-11-25

#### Unapređenje osnovnih pojmova (01-CoreConcepts/)  
- **Novi klijentski primitiv - Roots**: Dodana sveobuhvatna dokumentacija o primitivnom klijentu Roots koji omogućuje serverima razumijevanje granica datotečnog sustava i pristupnih dozvola  
- **Bilješke o alatima**: Dodana dokumentacija o ponašajnim bilješkama alata (`readOnlyHint`, `destructiveHint`) za bolje odluke o izvršavanju alata  
- **Pozivanje alata u uzorkovanju**: Ažurirana dokumentacija uzorkovanja uključujući parametre `tools` i `toolChoice` za pokretanje alata predvođenih modelom tijekom zahtjeva za uzorkovanje  
- **URL način ispitivanja**: Dodana dokumentacija o URL-baziranom ispitivanju za vanjske web interakcije inicirane od strane servera  
- **Zadaci (eksperimentalno)**: Dodan novi odjeljak s dokumentacijom o eksperimentalnoj značajki Zadaci za trajne omotače izvođenja i odgođeno dohvaćanje rezultata  
- **Podrška za ikone**: Naglašeno da alati, resursi, predlošci resursa i prompti sada mogu imati ikone kao dodatne metapodatke  

#### Ažuriranja dokumentacije  
- **README.md**: Dodana referenca verzije MCP specifikacije 2025-11-25 i objašnjenje verzioniranja prema datumu  
- **study_guide.md**: Ažurirana karta kurikuluma uključujući Zadatke i Bilješke o alatima u odjeljku Osnovni pojmovi; ažuriran vremenski pečat dokumenta  

#### Verifikacija usklađenosti specifikacije  
- **Verzija protokola**: Potvrđeno da sva dokumentacija referencira trenutačnu MCP specifikaciju 2025-11-25  
- **Poravnanje arhitekture**: Potvrđena točnost dvoslojne arhitekture (sloj podataka + sloj transporta) u dokumentaciji  
- **Dokumentacija primitiva**: Validirani server primitivni elementi (Resursi, Prompti, Alati) i klijentski primitivni elementi (Uzorkovanje, Ispitivanje, Zapisivanje, Roots)  
- **Transportni mehanizmi**: Potvrđena točnost dokumentacije za STDIO i streamabilni HTTP transport  
- **Sigurnosne upute**: Potvrđeno poravnanje sa sadašnjim MCP sigurnosnim najboljim praksama  

#### Ključne značajke MCP 2025-11-25 zabilježene  
- **Otkrivanje OpenID Connecta**: Otkriće poslužitelja ovjere kroz OIDC  
- **Dokumenti metapodataka OAuth klijenta**: Preporučeni mehanizam registracije klijenta  
- **JSON shema 2020-12**: Zadani dijalekt za definicije MCP shema  
- **SDK sustav razina**: Formalizirani zahtjevi za podršku značajki i održavanje SDK-a  
- **Upravljačka struktura**: Formalizirane radne skupine i interesne skupine u MCP upravljanju  

### Veliko ažuriranje sigurnosne dokumentacije (02-Security/)

#### Integracija MCP Security Summit Workshopa (Sherpa)  
- **Novi resurs za praktičnu obuku**: Dodana sveobuhvatna integracija s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kroz svu sigurnosnu dokumentaciju  
- **Pokriće rute ekspedicije**: Dokumentirana potpuna ruta od baznog kampa do vrha  
- **Usklađenost s OWASP-om**: Sva sigurnosna uputstva sada se mapiraju na rizike OWASP MCP Azure sigurnosnog vodiča  

#### Integracija OWASP MCP Top 10  
- **Novi odjeljak**: Dodana tablica rizika OWASP MCP Top 10 s Azure mitigacijama u glavni sigurnosni README  
- **Dokumentacija bazirana na riziku**: Ažuriran dokument mcp-security-controls-2025.md s referencama rizika OWASP MCP za svako sigurnosno područje  
- **Referentna arhitektura**: Poveznica na OWASP MCP Azure sigurnosni vodič s referentnom arhitekturom i obrascima implementacije  

#### Ažurirane sigurnosne datoteke  
- **README.md**: Dodan pregled Sherpa radionice, tablica rute ekspedicije, sažetak rizika OWASP MCP Top 10 i sekcija za praktičnu obuku  
- **mcp-security-controls-2025.md**: Ažuriran zaglavlje na veljaču 2026., dodane OWASP referencije rizika (MCP01-MCP08), ispravljena nedosljednost verzije specifikacije  
- **mcp-security-best-practices-2025.md**: Dodan odjeljak sa Sherpa i OWASP resursima, ažuriran vremenski pečat  
- **mcp-best-practices.md**: Dodana sekcija praktične obuke sa Sherpa i OWASP poveznicama  
- **azure-content-safety-implementation.md**: Dodan OWASP MCP06 referenca, usklađenost s Sherpa kampom 3 i dodatni odjeljak resursa  

#### Dodane nove poveznice na resurse  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pojedinačne OWASP MCP stranice rizika (MCP01-MCP10)  

### Usklađivanje MCP specifikacije 2025-11-25 u cijelom kurikulumu

#### Modul 03 - Početak rada  
- **SDK dokumentacija**: Dodan Go SDK u službeni popis SDK-a; ažurirane sve reference SDK-a u skladu s MCP specifikacijom 2025-11-25  
- **Pojašnjenje transporta**: Ažurirani opisi STDIO i HTTP streaminga s eksplicitnim referencama na specifikaciju  

#### Modul 04 - Praktična implementacija  
- **Ažuriranja SDK-a**: Dodan Go SDK; ažuriran popis SDK-a s referencom specifikacije  
- **Specifikacija autorizacije**: Ažurirana poveznica na MCP specifikaciju autorizacije na trenutačnu 2025-11-25 verziju  

#### Modul 05 - Napredne teme  
- **Nove značajke**: Dodana bilješka o novim MCP značajkama specifikacije 2025-11-25 (Zadaci, Bilješke o alatima, URL način ispitivanja, Roots)  
- **Sigurnosni resursi**: Dodane poveznice na OWASP MCP Top 10 i Sherpa radionicu u dodatne reference  

#### Modul 06 - Zajednički doprinosi  
- **Popis SDK-a**: Dodani Swift i Rust SDK; ažurirana poveznica specifikacije na 2025-11-25  
- **Referenca specifikacije**: Ažurirana poveznica MCP specifikacije na izravni URL  

#### Modul 07 - Lekcije iz ranog usvajanja  
- **Ažuriranja resursa**: Dodana poveznica MCP specifikacije 2025-11-25 i OWASP MCP Top 10 u dodatne resurse  

#### Modul 08 - Najbolje prakse  
- **Verzija specifikacije**: Ažurirana referenca MCP specifikacije na 2025-11-25  
- **Sigurnosni resursi**: Dodani OWASP MCP Top 10 i Sherpa radionica u dodatne reference  

#### Modul 10 - Optimizacija AI tijekova rada  
- **Ažuriranje značke**: MCP verzijska značka promijenjena s verzije SDK-a (1.9.3) na verziju specifikacije (2025-11-25)  
- **Poveznice na resurse**: Ažurirana poveznica na MCP specifikaciju; dodan OWASP MCP Top 10  

#### Modul 11 - MCP Server Hands-On laboratoriji  
- **Referenca specifikacije**: Ažurirana poveznica MCP specifikacije na verziju 2025-11-25  
- **Sigurnosni resursi**: Dodan OWASP MCP Top 10 u službene resurse  

## 18. prosinca 2025.

### Ažuriranje sigurnosne dokumentacije - MCP specifikacija 2025-11-25

#### Najbolje sigurnosne prakse MCP-a (02-Security/mcp-best-practices.md) - Ažuriranje verzije specifikacije  
- **Ažuriranje verzije protokola**: Ažurirano na referencu najnovije MCP specifikacije 2025-11-25 (objavljeno 25. studenog 2025)  
  - Ažurirane sve reference verzije specifikacije s 2025-06-18 na 2025-11-25  
  - Ažurirani datumski pečati dokumenta s 18. kolovoza 2025 na 18. prosinca 2025  
  - Provjerene sve URL-ove specifikacije za istinitost  
- **Validacija sadržaja**: Sveobuhvatna validacija sigurnosnih najboljih praksi prema najnovijim standardima  
  - **Microsoftova sigurnosna rješenja**: Provjereno ispravnost terminologije i poveznica za Prompt Shields (ranije "detekcija rizika jailbreak-a"), Azure Content Safety, Microsoft Entra ID i Azure Key Vault  
  - **OAuth 2.1 sigurnost**: Potvrđeno usklađenje s najnovijim sigurnosnim praksama OAuth-a  
  - **OWASP standardi**: Validirana aktualnost referenci OWASP Top 10 za LLM-e  
  - **Azure usluge**: Provjerene sve Microsoft Azure dokumentacijske poveznice i najbolje prakse  
- **Poravnanje sa standardima**: Sve referencirane sigurnosne norme potvrđene kao važeće  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 sigurnosne najbolje prakse  
  - Azure sigurnosni i usklađenosti okviri  
- **Resursi za implementaciju**: Validirane sve poveznice i vodiči za implementaciju  
  - Obrasci autentikacije u Azure API Managementu  
  - Vodiči za integraciju Microsoft Entra ID-a  
  - Upravljanje tajnama u Azure Key Vault  
  - DevSecOps pipeline-ovi i rješenja za nadzor  

### Osiguranje kvalitete dokumentacije  
- **Usklađenost sa specifikacijom**: Osigurano da svi obavezni MCP sigurnosni zahtjevi (MORAJU/MORAJU NE) usklađeni s najnovijom specifikacijom  
- **Aktualnost resursa**: Provjereni svi vanjski linkovi prema Microsoft dokumentaciji, sigurnosnim standardima i vodičima za implementaciju  
- **Pokriće najboljih praksi**: Potvrđeno široko pokriće autentikacije, autorizacije, prijetnji specifičnih za AI, sigurnosti opskrbnog lanca i poduzećnih obrazaca  

## 6. listopada 2025.

### Proširenje sekcije Početak rada – Napredno korištenje servera i jednostavna autentikacija

#### Napredno korištenje servera (03-GettingStarted/10-advanced)  
- **Dodano novo poglavlje**: Uveden sveobuhvatan vodič za napredno korištenje MCP servera, obuhvaćajući i redovite i niskorazinske server arhitekture.  
  - **Redoviti naspram niskorazinskog servera**: Detaljna usporedba i primjeri koda u Pythonu i TypeScriptu za oba pristupa.  
  - **Dizajn temeljen na handlerima**: Objašnjenje upravljanja alatima/resursima/promptima temeljenog na handlerima za skalabilne i fleksibilne server implementacije.  
  - **Praktični obrasci**: Stvarni scenariji u kojima su obrasci niskorazinskog servera korisni za napredne značajke i arhitekturu.
#### Jednostavna autentifikacija (03-GettingStarted/11-simple-auth)
- **Novi dodani poglavlje**: Vodič korak-po-korak za implementaciju jednostavne autentifikacije na MCP serverima.
  - **Koncepti autentifikacije**: Jasno objašnjenje razlike između autentifikacije i autorizacije, te upravljanja vjerodajnicama.
  - **Osnovna implementacija autentifikacije**: Obrasci autentifikacije bazirani na middleware-u u Pythonu (Starlette) i TypeScriptu (Express), s primjercima koda.
  - **Napredak ka naprednoj sigurnosti**: Upute za početak s jednostavnom autentifikacijom i napredovanje do OAuth 2.1 i RBAC, s referencama na module za naprednu sigurnost.

Ova dopuna pruža praktične, konkretne smjernice za izgradnju robusnijih, sigurnijih i fleksibilnijih implementacija MCP servera, povezujući osnovne koncepte s naprednim produkcijskim obrascima.

## 29. rujna 2025.

### Laboratoriji za integraciju MCP Server baze podataka - Sveobuhvatan praktični put učenja

#### 11-MCPServerHandsOnLabs - Novi kompletan kurikulum integracije baza podataka
- **Kompletan put učenja od 13 laboratorijskih vježbi**: Dodan sveobuhvatan praktični kurikulum za izgradnju produkcijski spremnih MCP servera s integracijom PostgreSQL baze podataka
  - **Zadrživa implementacija u stvarnom svijetu**: Primjer upotrebe Zava Retail analitike koji pokazuje obrasce razine poduzeća
  - **Strukturirani tijek učenja**:
    - **Laboratoriji 00-03: Temelji** - Uvod, osnovna arhitektura, sigurnost i multi-tenancy, postavljanje okruženja
    - **Laboratoriji 04-06: Izgradnja MCP servera** - Dizajn baze podataka i shema, implementacija MCP servera, razvoj alata  
    - **Laboratoriji 07-09: Napredne značajke** - Integracija semantičkog pretraživanja, testiranje i otklanjanje pogrešaka, integracija u VS Code
    - **Laboratoriji 10-12: Produkcija i najbolje prakse** - Strategije implementacije, nadzor i opažanje, najbolje prakse i optimizacija
  - **Tehnologije na razini poduzeća**: FastMCP framework, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Napredne značajke**: Sigurnost na razini retka (RLS), semantičko pretraživanje, pristup podacima s više najmodavača, vektorski embeddings, nadzor u stvarnom vremenu

#### Standardizacija terminologije - Pretvorba modula u laboratorije
- **Sveobuhvatno ažuriranje dokumentacije**: Sustavno su ažurirane sve README datoteke u 11-MCPServerHandsOnLabs da koriste terminologiju "Laboratorij" umjesto "Modul"
  - **Naslovi sekcija**: Ažurirani "Što ovaj modul pokriva" u "Što ovaj laboratorij pokriva" u svih 13 laboratorija
  - **Opis sadržaja**: Promijenjeno "Ovaj modul pruža..." u "Ovaj laboratorij pruža..." kroz cijelu dokumentaciju
  - **Ciljevi učenja**: Ažurirano "Do kraja ovog modula..." u "Do kraja ovog laboratorija..."
  - **Navigacijski linkovi**: Pretvorene sve reference "Modul XX:" u "Laboratorij XX:" u međureferencama i navigaciji
  - **Praćenje završetka**: Ažurirano "Nakon što završite ovaj modul..." u "Nakon što završite ovaj laboratorij..."
  - **Očuvane tehničke reference**: Sačuvane reference Python modula u konfiguracijskim datotekama (npr. `"module": "mcp_server.main"`)

#### Poboljšanje vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Dodan novi odjeljak "11. Laboratoriji integracije baza podataka" s vizualizacijom sveobuhvatne strukture laboratorija
- **Struktura repozitorija**: Ažurirano s deset na jedanaest glavnih odjeljaka s detaljnim opisom 11-MCPServerHandsOnLabs
- **Smjernice za put učenja**: Poboljšane upute za navigaciju koje pokrivaju odjeljke 00-11
- **Pokriće tehnologija**: Dodani detalji o integraciji FastMCP, PostgreSQL i Azure usluga
- **Ishodi učenja**: Naglasak na razvoj produkcijski spremnih servera, obrasci integracije baza podataka i sigurnost na razini poduzeća

#### Poboljšanje strukture glavnog README
- **Terminologija bazirana na laboratorijima**: Ažuriran glavni README.md u 11-MCPServerHandsOnLabs da dosljedno koristi "Laboratorij" strukturu
- **Organizacija puta učenja**: Jasna progresija od osnovnih koncepata preko napredne implementacije do produkcijske implementacije
- **Usredotočenost na stvarni svijet**: Naglasak na praktično, laboratorijsko učenje s obrascima i tehnologijama razine poduzeća

### Poboljšanja kvalitete i dosljednosti dokumentacije
- **Naglasak na praktično učenje**: Ojačani praktični, laboratorijski pristup kroz cijelu dokumentaciju
- **Fokus na obrasce razine poduzeća**: Istaknute produkcijski spremne implementacije i sigurnosni zahtjevi poduzeća
- **Integracija tehnologije**: Sveobuhvatno pokrivanje modernih Azure usluga i AI integracijskih obrazaca
- **Tijek učenja**: Jasan, strukturirani put od osnovnih koncepata do produkcijske implementacije

## 26. rujna 2025.

### Unapređenje studija slučaja - Integracija GitHub MCP registra

#### Studije slučaja (09-CaseStudy/) - Fokus na razvoj ekosustava
- **README.md**: Značajno proširenje sa sveobuhvatnim GitHub MCP Registry studijom slučaja
  - **Studija slučaja GitHub MCP Registra**: Nova detaljna studija o lansiranju GitHub MCP Registra u rujnu 2025.
    - **Analiza problema**: Detaljna analiza fragmentiranog otkrivanja i implementacije MCP servera
    - **Arhitektura rješenja**: GitHubov pristup s centraliziranim registrom i installacijom jednim klikom u VS Code
    - **Poslovni utjecaj**: Mjerljive koristi u onboarding procesu i produktivnosti developera
    - **Strateška vrijednost**: Fokus na modularnoj implementaciji agenata i međusobnoj interoperabilnosti alata
    - **Razvoj ekosustava**: Pozicioniranje kao temeljne platforme za agentsku integraciju
  - **Unaprijeđena struktura studija slučaja**: Ažurirane svih sedam studija s dosljednim formatom i detaljnim opisima
    - Azure AI Travel Agents: Naglasak na višeslojnoj orkestraciji agenata
    - Integracija Azure DevOps-a: Fokus na automatizaciji tijeka rada
    - Dohvat dokumentacije u stvarnom vremenu: Implementacija Python konzoličkog klijenta
    - Interaktivni generator studijskih planova: Chainlit konverzacijska web aplikacija
    - Dokumentacija u editoru: Integracija VS Code i GitHub Copilota
    - Azure API Management: Obrasci integracije API-ja na razini poduzeća
    - GitHub MCP Registry: Razvoj ekosustava i platforma zajednice
  - **Sveobuhvatni zaključak**: Prepravljena završna sekcija koja naglašava sedam studija slučaja koje pokrivaju višedimenzionalne MCP implementacije
    - Integracije poduzeća, orkestracija višestrukih agenata, produktivnost developera
    - Razvoj ekosustava, kategorizacija u edukativne primjene
    - Unaprijeđeni uvidi u arhitektonske obrasce, strategije implementacije i najbolje prakse
    - Naglasak na MCP kao zrelom, produkcijski spremnom protokolu

#### Ažuriranja vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Ažurirana mentalna mapa za uključivanje GitHub MCP Registra u odjeljak Studije slučaja
- **Opis studija slučaja**: Nadograđen s općih opisa na detaljnu analizu sedam cjelovitih studija slučaja
- **Struktura repozitorija**: Ažuriran odjeljak 10 radi odražavanja sveobuhvatnog pokrića studija slučaja sa specifičnim detaljima implementacije
- **Integracija changeloga**: Dodan unos za 26. rujna 2025. s dokumentacijom o dodavanju GitHub MCP Registra i unapređenjima studija slučaja
- **Ažuriranje datuma**: Ažuriran vremenski pečat u podnožju radi odražavanja najnovije revizije (26. rujna 2025.)

### Poboljšanja kvalitete dokumentacije
- **Unifikacija formata**: Standardizirano formatiranje i struktura svih sedam studija slučaja
- **Sveobuhvatno pokriće**: Studije sada pokrivaju poduzeća, produktivnost developera i razvoj ekosustava
- **Strateško pozicioniranje**: Naglašeni MCP kao temeljna platforma za implementaciju agentskih sustava
- **Integracija resursa**: Ažurirani dodatni resursi uključuju link na GitHub MCP Registry

## 15. rujna 2025.

### Proširenje naprednih tema - Prilagođeni transporti i inženjerstvo konteksta

#### MCP prilagođeni transporti (05-AdvancedTopics/mcp-transport/) - Novi vodič za naprednu implementaciju
- **README.md**: Potpuni vodič implementacije prilagođenih MCP transportnih mehanizama
  - **Azure Event Grid transport**: Sveobuhvatna implementacija bezservernog transporta vođenog događajima
    - Primjeri u C#, TypeScriptu i Pythonu s integracijom za Azure Functions
    - Obrasci arhitekture vođene događajima za skalabilna MCP rješenja
    - Primatelji webhookova i obrada poruka na potisak
  - **Azure Event Hubs transport**: Implementacija visokopropusnog prijenosa tokova podataka
    - Mogućnosti streaminga u stvarnom vremenu za scenarije s niskom latencijom
    - Strategije particioniranja i upravljanje kontrolnim točkama
    - Grupiranje poruka i optimizacija performansi
  - **Obrasci integracije poduzeća**: Produkcijski arhitektonski primjeri
    - Distribuirana MCP obrada raspoređena preko više Azure Functions
    - Hibridne transportne arhitekture koje kombiniraju više tipova transporta
    - Strategije dugotrajnosti poruka, pouzdanosti i upravljanja greškama
  - **Sigurnost i nadzor**: Integracija Azure Key Vaulta i obrasci opažanja
    - Autentifikacija putem upravljanih identiteta i principa najmanjeg privilegija
    - Telemtrija Application Insights s praćenjem performansi
    - Prigušivači krugova (circuit breakers) i obrasci tolerancije na pogreške
  - **Okviri za testiranje**: Sveobuhvatne strategije testiranja prilagođenih transporta
    - Jedinično testiranje s test-dwblovima i mocking framework-ima
    - Integracijsko testiranje s Azure Test Containers
    - Razmatranja za testiranje performansi i opterećenja

#### Inženjerstvo konteksta (05-AdvancedTopics/mcp-contextengineering/) - Rastuća AI disciplina
- **README.md**: Sveobuhvatno istraživanje inženjerstva konteksta kao rastućeg područja
  - **Osnovni principi**: Potpuno dijeljenje konteksta, svjesnost o odlukama akcija i upravljanje kontekstnim prozorima
  - **Usuglašenost s MCP protokolom**: Kako MCP dizajn rješava izazove inženjerstva konteksta
    - Ograničenja kontekstnih prozora i progresivno učitavanje
    - Određivanje relevantnosti i dinamički dohvat konteksta
    - Rukovanje višemodalnim kontekstom i sigurnosne razmatranja
  - **Pristupi implementaciji**: Jednostruka nit naspram višestrukih agenata
    - Tehnike dijeljenja kontekstnih dijelova i prioritizacije
    - Progresivno učitavanje konteksta i strategije kompresije
    - Višeslojni pristupi kontekstu i optimizacija dohvaćanja
  - **Okvir mjerenja**: Rastuće metrike za evaluaciju učinkovitosti konteksta
    - Učinkovitost unosa, performanse, kvaliteta i korisničko iskustvo
    - Eksperimentalni pristupi optimizaciji konteksta
    - Analiza neuspjeha i metodologije poboljšanja

#### Ažuriranja navigacije kurikuluma (README.md)
- **Unaprijeđena struktura modula**: Ažurirana tablica kurikuluma za uključivanje novih naprednih tema
  - Dodani unos za Inženjerstvo konteksta (5.14) i Prilagođeni transport (5.15)
  - Dosljedno formatiranje i navigacijski linkovi za sve module
  - Ažurirani opisi koji odražavaju aktualan obuhvat sadržaja

### Unapređenja strukture direktorija
- **Standardizacija imena**: Mijenjanje naziva "mcp transport" u "mcp-transport" radi usklađenosti s ostalim mapama naprednih tema
- **Organizacija sadržaja**: Sve mape 05-AdvancedTopics sada slijede dosljedan obrazac imenovanja (mcp-[tema])

### Poboljšanja kvalitete dokumentacije
- **Usuglašenost s MCP specifikacijom**: Cijeli novi sadržaj referira trenutnu MCP Specifikaciju 2025-06-18
- **Primjeri u više jezika**: Sveobuhvatni primjeri koda u C#, TypeScriptu i Pythonu
- **Fokus na poduzeće**: Obrasci spremni za produkciju i integracija Azure clouda u cijelom sadržaju
- **Vizualna dokumentacija**: Diagrami Mermaid za vizualizaciju arhitekture i toka

## 18. kolovoza 2025.

### Sveobuhvatno ažuriranje dokumentacije - MCP standardi 2025-06-18

#### Najbolje prakse sigurnosti MCP-a (02-Security/) - Potpuna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Potpuni prepis usklađen sa MCP Specifikacijom 2025-06-18
  - **Obavezni zahtjevi**: Dodani eksplicitni zahtjevi MUST/MUST NOT iz službene specifikacije s jasnim vizualnim indikatorima
  - **12 osnovnih sigurnosnih praksi**: Prestrukturirano s liste od 15 na sveobuhvatan skup sigurnosnih domena
    - Sigurnost tokena i autentifikacija s integracijom vanjskog pružatelja identiteta
    - Upravljanje sesijama i transportna sigurnost s kriptografskim zahtjevima
    - Zaštita specifična za AI s Microsoft Prompt Shields integracijom
    - Kontrola pristupa i dozvole s principom najmanjeg privilegija
    - Sigurnost sadržaja i nadzor s Azure Content Safety integracijom
    - Sigurnost lanaca opskrbe s opsežnom verifikacijom komponenti
    - Sigurnost OAuth i prevencija Confused Deputy napada s PKCE implementacijom
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
    - Usklađenost i upravljanje s regulativama
    - Napredne sigurnosne kontrole s arhitekturom zero trust
    - Integracija Microsoft sigurnosnog ekosustava sa sveobuhvatnim rješenjima
    - Kontinuirani razvoj sigurnosti s adaptivnim praksama
  - **Microsoft sigurnosna rješenja**: Unaprijeđene smjernice za integraciju Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Resursi za implementaciju**: Kategorizirani opsežni linkovi na službenu MCP dokumentaciju, Microsoft sigurnosna rješenja, sigurnosne standarde i vodiče za implementaciju

#### Napredne sigurnosne kontrole (02-Security/) - Implementacija razine poduzeća
- **MCP-SECURITY-CONTROLS-2025.md**: Potpuna preinaka s okvirom sigurnosti razine poduzeća
  - **9 sveobuhvatnih sigurnosnih domena**: Prošireno s osnovnih kontrola na detaljni enterprise okvir
    - Napredna autentifikacija i autorizacija s Microsoft Entra ID integracijom
    - Sigurnost tokena i kontrole protiv prosljeđivanja s opsežnom validacijom
    - Kontrole sigurnosti sesije s prevencijom zaustavljanja preuzimanja sesije
    - AI-specifične sigurnosne kontrole s prevencijom injekcija i trovanja alata
    - Prevencija Confused Deputy napada sa sigurnošću OAuth proxyja
    - Sigurnost izvršavanja alata sa sandboxingom i izolacijom
    - Kontrole sigurnosti lanaca opskrbe s verifikacijom ovisnosti
    - Kontrole nadzora i otkrivanja s integracijom SIEM sustava
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
  - **Primjeri implementacije**: Dodani detaljni YAML blokovi konfiguracije i primjeri koda
  - **Integracija Microsoft rješenja**: Sveobuhvatno pokrivanje Azure sigurnosnih usluga, GitHub Advanced Security i upravljanja identitetima razine poduzeća

#### Sigurnost naprednih tema (05-AdvancedTopics/mcp-security/) - Produkcijski spremna implementacija
- **README.md**: Potpuni prepis za implementaciju sigurnosti razine poduzeća
  - **Usklađenost s trenutnom specifikacijom**: Ažurirano prema MCP Specifikaciji 2025-06-18 s obaveznim sigurnosnim zahtjevima
  - **Unaprijeđena autentifikacija**: Integracija Microsoft Entra ID-a s opsežnim primjerima za .NET i Java Spring Security
  - **Integracija AI sigurnosti**: Implementacija Microsoft Prompt Shields i Azure Content Safety s detaljnim primjerima u Pythonu
  - **Napredna mitigacija prijetnji**: Sveobuhvatni primjeri implementacije za
    - Prevenciju Confused Deputy napada s PKCE i validacijom pristanka korisnika
    - Prevenciju prosljeđivanja tokena s validacijom publike i sigurnim upravljanjem tokenima
    - Prevenciju otmice sesije s kriptografskim vezivanjem i analizom ponašanja
  - **Integracija sigurnosti razine poduzeća**: Monitoring Azure Application Insights, pipeline za otkrivanje prijetnji i sigurnost lanaca opskrbe
  - **Kontrolni popis implementacije**: Jasna diferencijacija između obaveznih i preporučenih sigurnosnih kontrola s pogodnostima Microsoft sigurnosnog ekosustava

### Kvaliteta dokumentacije i usklađenost s normama
- **Reference specifikacije**: Ažurirane sve reference na trenutnu MCP specifikaciju 2025-06-18  
- **Microsoft ekosustav sigurnosti**: Poboljšani smjernice za integraciju kroz svu dokumentaciju o sigurnosti  
- **Praktična implementacija**: Dodani detaljni primjeri koda u .NET, Javi i Pythonu s obrascima za poduzeća  
- **Organizacija resursa**: Sveobuhvatna kategorizacija službene dokumentacije, sigurnosnih standarda i vodiča za implementaciju  
- **Vizualni indikatori**: Jasno označavanje obaveznih zahtjeva nasuprot preporučenim praksama  


#### Osnovni pojmovi (01-CoreConcepts/) - Potpuna modernizacija  
- **Ažuriranje verzije protokola**: Ažurirano za referencu na trenutnu MCP specifikaciju 2025-06-18 s vremenski baziranim verziranjem (format YYYY-MM-DD)  
- **Dorada arhitekture**: Poboljšani opisi domaćina, klijenata i poslužitelja radi prikaza aktualnih MCP arhitektonskih obrazaca  
  - Domaćini sada jasno definirani kao AI aplikacije koje koordiniraju više MCP klijentskih veza  
  - Klijenti opisani kao protokolski konektori održavajući odnos jedan-na-jedan sa poslužiteljima  
  - Poslužitelji prošireni s lokalnim i udaljenim scenarijima implementacije  
- **Restrukturiranje primitiva**: Potpuna revizija server i client primitiva  
  - Server primitiva: Resursi (izvori podataka), promptovi (predlošci), alati (izvršne funkcije) s detaljnim objašnjenjima i primjerima  
  - Client primitiva: Uzorkovanje (LLM dovršetci), elicitation (korisnički unos), zapisivanje (debugging/monitoring)  
  - Ažurirano prema aktualnim obrascima metoda za otkrivanje (`*/list`), dohvat (`*/get`) i izvršenje (`*/call`)  
- **Arhitektura protokola**: Uveden model arhitekture s dva sloja  
  - Sloj podataka: JSON-RPC 2.0 osnova s upravljanjem životnim ciklusom i primitivima  
  - Transportni sloj: STDIO (lokalni) i Streamable HTTP sa SSE (udaljeni) mehanizmi prijenosa  
- **Sigurnosni okvir**: Sveobuhvatni sigurnosni principi uključujući eksplicitni korisnički pristanak, zaštitu privatnosti podataka, sigurnost izvršenja alata i sigurnost transportnog sloja  
- **Komunikacijski obrasci**: Ažurirane poruke protokola za prikaz inicijalizacije, otkrivanja, izvršenja i protoka notifikacija  
- **Primjeri koda**: Osvježeni primjeri u više jezika (.NET, Java, Python, JavaScript) koji odražavaju trenutne MCP SDK obrasce  

#### Sigurnost (02-Security/) - Sveobuhvatna sigurnosna revizija  
- **Usklađenost sa standardima**: Potpuna usklađenost s MCP specifikacijom 2025-06-18 sigurnosnih zahtjeva  
- **Evolucija autentikacije**: Dokumentirana evolucija od prilagođenih OAuth poslužitelja do delegacije vanjskih pružatelja identiteta (Microsoft Entra ID)  
- **AI-specifična analiza prijetnji**: Poboljšano pokrivanje modernih AI vektora napada  
  - Detaljni scenariji napada ubrizgavanjem promptova s primjerima iz stvarnog svijeta  
  - Mehanizmi trovanja alata i obrasci napada "rug pull"  
  - Trovanje kontekstnog prozora i napadi zbunjivanja modela  
- **Microsoft AI sigurnosna rješenja**: Sveobuhvatno pokrivanje Microsoft ekosustava sigurnosti  
  - AI Prompt Shields s naprednom detekcijom, isticanjem i tehnikama razdjelnika  
  - Obrasci integracije Azure Content Safety  
  - GitHub Advanced Security za zaštitu opskrbnog lanca  
- **Napredne kontrole prijetnji**: Detaljni sigurnosni kontrolni mehanizmi za  
  - Otmice sesije s MCP-specifičnim scenarijima napada i kriptografskim zahtjevima za ID sesije  
  - Problemi "confused deputy" u MCP proxy scenarijima s eksplicitnim zahtjevima za pristanak  
  - Ranljivosti pri prosljeđivanju tokena s obaveznim kontrolama validacije  
- **Sigurnost opskrbnog lanca**: Prošireno pokrivanje AI opskrbnog lanca uključujući temeljne modele, servise ugrađivanja, primatelje konteksta i API-je trećih strana  
- **Sigurnost temelja**: Poboljšana integracija s obrascima sigurnosti poduzeća uključujući arhitekturu s nultim povjerenjem i Microsoft ekosustav sigurnosti  
- **Organizacija resursa**: Kategorizirani opsežni linkovi prema tipu (Službena dokumentacija, Standardi, Istraživanja, Microsoft rješenja, Vodiči za implementaciju)  

### Poboljšanja kvalitete dokumentacije  
- **Strukturirani ciljevi učenja**: Poboljšani ciljevi učenja s konkretnim i izvedivim ishodima  
- **Međureferenciranje**: Dodane poveznice između povezanih tema o sigurnosti i osnovnim pojmovima  
- **Ažurirane informacije**: Ažurirani svi datumski zapisi i linkovi na specifikacije prema trenutnim standardima  
- **Smjernice za implementaciju**: Dodane specifične, izvedive smjernice za implementaciju kroz oba dijela  

## 16. srpnja 2025.

### Poboljšanja README i navigacije  
- Potpuno redizajniran navigacijski sustav u README.md  
- Zamijenjene `<details>` oznake dostupnijim formatom u obliku tablice  
- Kreirane alternativne rasporedne opcije u novoj mapi "alternative_layouts"  
- Dodani primjeri navigacije u obliku kartica, tabova i akordeona  
- Ažuriran odjeljak o strukturi repozitorija s najnovijim datotekama  
- Poboljšan odjeljak "Kako koristiti ovaj kurikulum" s jasnim preporukama  
- Ažurirani linkovi na MCP specifikaciju usmjereni na ispravne URL-ove  
- Dodan odjeljak Inženjering konteksta (5.14) u strukturu kurikuluma  

### Ažuriranja vodiča za učenje  
- Potpuno revidiran vodič za učenje usklađen s trenutnom strukturom repozitorija  
- Dodani novi odjeljci za MCP klijente i alate te popularne MCP poslužitelje  
- Ažurirana Vizualna karta kurikuluma za točan prikaz svih tema  
- Poboljšani opisi naprednih tema za pokrivanje svih specijaliziranih područja  
- Ažuriran odjeljak Studije slučaja radi prikaza stvarnih primjera  
- Dodan ovaj sveobuhvatni zapis promjena  

### Doprinosi zajednice (06-CommunityContributions/)  
- Dodane detaljne informacije o MCP poslužiteljima za generiranje slika  
- Dodan sveobuhvatan odjeljak o korištenju Claudea u VSCode-u  
- Dodane upute za postavljanje i korištenje Cline terminalnog klijenta  
- Ažuriran odjeljak MCP klijenata za uključivanje svih popularnih opcija klijenata  
- Poboljšani primjeri doprinosa s točnijim uzorcima koda  

### Napredne teme (05-AdvancedTopics/)  
- Organizirane sve specijalizirane mape s dosljednim imenovanjem  
- Dodani materijali i primjeri za inženjering konteksta  
- Dodana dokumentacija integracije Foundry agenta  
- Poboljšana dokumentacija integracije sigurnosti Entra ID-a  

## 11. lipnja 2025.

### Početno kreiranje  
- Objavljena prva verzija MCP za početnike kurikuluma  
- Kreirana osnovna struktura za svih 10 glavnih odjeljaka  
- Implementirana Vizualna karta kurikuluma za navigaciju  
- Dodani početni uzorki projekata u više programskih jezika  

### Početak rada (03-GettingStarted/)  
- Kreirani prvi primjeri implementacije poslužitelja  
- Dodane smjernice za razvoj klijenata  
- Uključene upute za integraciju LLM klijenta  
- Dodana dokumentacija za integraciju u VS Code  
- Implementirani primjeri Server-Sent Events (SSE) poslužitelja  

### Osnovni pojmovi (01-CoreConcepts/)  
- Dodan detaljni opis arhitekture klijent-poslužitelj  
- Kreirana dokumentacija o ključnim komponentama protokola  
- Dokumentirani obrasci komunikacije u MCP  

## 23. svibnja 2025.

### Struktura repozitorija  
- Inicijaliziran repozitorij s osnovnom strukturom mapa  
- Kreirani README dokumenti za svaki glavni odjeljak  
- Postavljena infrastruktura za prevođenje  
- Dodane slike i dijagrami  

### Dokumentacija  
- Kreiran početni README.md s pregledom kurikuluma  
- Dodani CODE_OF_CONDUCT.md i SECURITY.md  
- Postavljen SUPPORT.md s uputama za dobivanje pomoći  
- Kreirana preliminarna struktura vodiča za učenje  

## 15. travnja 2025.

### Planiranje i okvir  
- Početno planiranje MCP za početnike kurikuluma  
- Definirani ciljevi učenja i ciljna publika  
- Nacrtana struktura kurikuluma sa 10 odjeljaka  
- Razvijen konceptualni okvir za primjere i studije slučaja  
- Kreirani početni prototipni primjeri za ključne pojmove  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->