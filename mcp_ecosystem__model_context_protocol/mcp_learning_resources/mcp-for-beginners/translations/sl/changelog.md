# Dnevnik sprememb: MCP za začetnike kurikulum

Ta dokument služi kot zapis vseh pomembnih sprememb, narejenih v učnem načrtu Model Context Protocol (MCP) za začetnike. Spremembe so dokumentirane v obratnem kronološkem vrstnem redu (najnovejše spremembe prve).

## 24. junij 2026

### Nova lekcija: Uporaba MCP v aplikaciji Copilot

- Dodan [oddelek za orodja](./12-tooling/README.md).
- [MCP v aplikaciji Copilot](./12-tooling/01-copilot-app/README.md)

## 16. junij 2026

### Usklajevanje specifikacije MCP & validacija primerov

Preverili smo kurikulum glede na trenutno **MCP specifikacijo 2025-11-25** in najnovejše uradne SDK-je, nato pa popravili preostale zastarele sklice na specifikacijo in potrdili, da se jedrne primere še vedno lahko sestavi in zažene.

#### Popravki različice specifikacije (2025-06-18 / 2025-03-26 → 2025-11-25)

Posodobljena angleška vsebina, kjer je še naprej trdila, da je starejša revizija specifikacije *trenutni/najnovejši* standard, in preusmerjeni so bili povezave na kanonične poti specifikacije `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Posodobljen pasica "Trenutni standard", uvod, naslov jedrnih varnostnih načel, naslov obveznih zahtev, oddelek Microsoft Entra ID, povezave do virov in referenc ter zaključna varnostna opomba (8 referenc) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Posodobljena povezava do dodatnih virov in pasica "Trenutni standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Nadomeščena zastarela povezava `2025-03-26` za varnost in zaupanje s trenutno stranjo najboljših varnostnih praks 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Posodobljena povezava do uradne dokumentacije vzorčenja na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Posodobljen opis v sedanjiku "trenutna specifikacija MCP" in povezava do dodatnih virov na 2025-11-25 (zgodovinske opombe o upokojitvi SSE so ostale zaradi natančnosti)

#### Validacija primerov glede na trenutne SDK-je

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` je namestil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` je uspel brez tipnih napak — obstoječi `McpServer`/`StdioServerTransport` API-ji ostajajo veljavni
- **Python (03-GettingStarted/01-first-server/solution/python)**: Preverjeno v izoliranem `.venv` z `mcp[cli]` (1.27.2); `py_compile` je uspel in `FastMCP.list_tools()` je pravilno vrnil orodji `add` in `subtract`
- Potrjeno, da vsi vzorci različic `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) gladko razrešijo na trenutno `1.29.0` brez prekinitvenih sprememb API

#### Usklajevanje zatičev odvisnosti (zapiranje razlik v različicah)

Posodobljene zastarele SDK zatiče, da vsak vzorec sledi trenutni izdaji MCP, skladno z splošno prakso repozitorija:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Povišan `@modelcontextprotocol/sdk` s `^1.8.0` → `>=1.26.0` in posodobljen zastareli opis paketa `"updated for MCP 2025-06-18"` v `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** in **lab4/code/github_mcp_server/pyproject.toml**: Povišan natanko določeni zatič `mcp==1.23.0` → `mcp>=1.26.0`; regenerirani `uv.lock` datoteki (`uv lock`), da zaklenjene datoteke razrešijo na trenutno `mcp 1.27.2` in ostanejo usklajene z manifesti

#### Analiza vrzeli v kurikulumu — zadnja pokritost funkcij specifikacije

Preverjeno, da kurikulum že zajema vse primitive, uvedene/razširjene v MCP 2025-11-25, tako da ni vsebinskih vrzeli:
- **Sampling**: Lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Izvabljanje (vključno z URL načinom)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Korenine**: Dokumentirano v 00-Introduction, 01-CoreConcepts in 05-AdvancedTopics/mcp-root-contexts
- **Naloge (eksperimentalno, dolgo trajajoče operacije)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Oznake pri orodjih** (`readOnlyHint` / `destructiveHint`): Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features

### Krepitev varnosti & odprava ranljivosti odvisnosti

Izveden je bil celosten varnostni pregled vseh manifest za odvisnosti in vzorčne izvorne kode, nato pa odpravljene vse prijavljene npm varnostne opozorila in eno najdbo na nivoju kode. Po odpravi `npm audit` poroča o **0 ranljivostih** v vsakem pregledenem direktoriju.

#### npm ranljivosti odvisnosti (prehodne) — odpravljeno

Pregledanih vseh 15 zavezanih datotek `package-lock.json`. Ranljivosti so bile omejene na prehodne odvisnosti, ki jih uporablja razvojno orodje MCP Inspector, OpenAI klient in MCP SDK; vse zdaj odpravljene brez prekinitve delovanja vzorcev:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** in **lab3/code/weather_mcp/inspector**: Povišan `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kar je odstranilo odpise povezane z `ajv`, `brace-expansion`, `diff`, `path-to-regexp` in `ws`. Dodan npm `overrides` zapis, ki prisili popravljen `shell-quote@1.8.4` in odpravi zadnjo kritično opozorilo, povzročeno s strani `concurrently`; obe zaklenjeni datoteki sta bili regenerirani (zdaj 0 ranljivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` je posodobil prehodni `qs` (zmerno) na popravljeno izdajo
- **03-GettingStarted/samples/javascript**: `npm audit fix` je posodobil prehodni `hono` (zmerno) na popravljeno izdajo
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` je posodobil prehodni `form-data` (visoko) na popravljeno izdajo
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana manjkajoča `package-lock.json`, da je projekt reproducibilen in preverljiv (0 ranljivosti)

#### Popravki kode za varnost (OWASP A03: Injekcija)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstranjen `shell=True` iz orodja `open_in_vscode`. Prejšnja koda `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` je dopuščala metakarakterje lupine v poti mape, da jih `cmd.exe` interpretira (vektor ukazne injekcije). Zdaj neposredno zažene razrešeni `Code.exe` z mapo kot argumentom — brez lupine — kar je funkcionalno enakovredno in varno

#### Pregled odvisnosti v Pythonu

- Pregledani so vsi Python zahtevki z `pip-audit`. `05-AdvancedTopics` in `03-GettingStarted/samples/python` nista poročala o kakršnihkoli znanih ranljivostih (njihove različice `mcp` / `httpx` / `pydantic` / `python-dotenv` razrešijo na trenutno popravne izdaje)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je zaznal prehodno odvisnost **`werkzeug` 3.1.1** s tremi DoS opozorili za `safe_join` z imeni naprav Windows — `CVE-2025-66221`, `CVE-2026-21860` in `CVE-2026-27199` (vse odpravljeno v 3.1.6). Dodan je bil eksplicitni varnostni zatič `werkzeug>=3.1.6`, da se razreši popravljena izdaja; potrjeno, da omejitev gladko deluje s skladom `chainlit` / `mcp` / `semantic-kernel`

### Preimenovanje izdelka

Posodobljena je bila vsa vsebina kurikuluma, da odraža preimenovanje izdelka Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Posodobljena povezava do Discord skupnosti
- **AGENTS.md**: Posodobljen sklic na Discord strežnik
- **README.md**: Posodobljeni sklici na tehnološki ekosistem
- **study_guide.md**: Posodobljene reference na študije primerov
- **05-AdvancedTopics/README.md**: Posodobljeno ime in opis Modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Posodobljen naslov oddelka in opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Celotno posodobitev naslova modula in vsebine
- **05-AdvancedTopics/mcp-security-entra/README.md**: Posodobljena medsektorska povezava
- **07-LessonsfromEarlyAdoption/README.md**: Posodobljene reference na študije primerov
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Posodobljen naslov oddelka 9, značke in zmogljivosti
- **08-BestPractices/README.md**: Posodobljena povezava do Discord skupnosti
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Posodobljen sklic na Discord kanal
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Posodobljen sklic na uvajanje modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Posodobljena tabela storitev AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Posodobljene reference virov

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension za VS Code
- **README.md**: Posodobljeni glavni sklici kurikuluma
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Posodobljen naslov modula, pregled in vsi naslovi modulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Posodobljen naslov, cilji učenja, navodila za nastavitev in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Posodobljen naslov, cilji učenja, tabela gostiteljev MCP in medsektorske povezave
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Posodobljen naslov, značke, predpogoji in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Posodobljeni sklici na graditelja agentov in povezava za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Posodobljeni predpogoji in reference razširitve

---

## 11. april 2026

### Nova lekcija, popravki dokumentacije in posodobitve odvisnosti

#### Dodana nova vsebina kurikuluma

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Adversarial Multi-Agent Reasoning z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nov celovit vodič, ki pokriva vzorec nasprotnega razpravljanja za sisteme z več agenti
  - Diagram arhitekture Mermaid: dva agenta → skupni MCP strežnik → prepisi razprave → sodnik → razsodba
  - Skupni MCP strežnik orodij (`web_search` + `run_python`) implementiran v Pythonu in TypeScriptu
  - Nasprotujoči si sistemski pozivi (ZA / PROTI / Sodnik) z eksplicitnimi zahtevami za uporabo orodja
  - Usmerjevalec razprave v Pythonu, TypeScriptu in C#, ki upravlja kroge in usmerja argumente
  - MCP povezava `ClientSession` za usmerjevalca do resničnih klicev orodij
  - Tabela primerov uporabe (odkrivanje halucinacij, modeliranje groženj, pregled oblikovanja API, preverjanje dejstev, izbira tehnologije)
  - Varnostne premisleke: zavarovano izvajanje, preverjanje klicev orodij, omejevanje hitrosti, vodnik revizije
  - Strukturirana vaja s tremi praktičnimi scenariji (pregled kode, odločanje o arhitekturi, moderiranje vsebine)

#### Popravki dokumentacije

**Modul 03 - Začetek**
- **05-stdio-server/README.md**: Popravljena nepopolna TypeScript stdio strežniška primerjava — dodana manjkajoča instanciranje transporta (`new StdioServerTransport()`) in klic `server.connect(transport)` za skladnost s primeri Python in .NET v istem oddelku
- **14-sampling/README.md**: Popravljena tipkarska napaka — popravljeno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Posodobitve kurikuluma

**Glavni README.md**
- Dodan vnos 5.17 (Adversarial Multi-Agent Reasoning z MCP) v tabelo kurikuluma z neposredno povezavo na novo lekcijo

**05-AdvancedTopics/README.md**
- Dodana vrstica lekcije 5.17 v tabelo lekcij

**study_guide.md**
- Dodana tema Adversarial Multi-Agent Reasoning v miselni zemljevid in opis v proznem besedilu naprednih tem

#### Popravki kode in varnosti

**Modul 05 - Nasprotni agenti (`mcp-adversarial-agents`)**
- **Popravek varnosti — vdor ukazov**: Zamenjali `execSync` interpolacijo lupine z `execFile` + `promisify` v orodju TypeScript `run_python`, s čimer so odpravili površino za vdor ukazov (koda, ki jo nadzoruje LLM, je zdaj podana kot dobeseden element argv brez vpletenosti lupine)
- **Povezava zanke orodja MCP**: Posodobili Python usklajevalnik razprave za uporabo odjemalca `AsyncAnthropic` (namesto blokirajočega sinhronega `Anthropic`), neposredno posredovali živo `ClientSession` vsakemu agentu, vsakič pridobili definicije orodij prek `session.list_tools()`, in poslali bloke `tool_use` prek `session.call_tool()` v zanki, dokler model ne odda končnega besedilnega odziva

#### Posodobitve odvisnosti

- Povišali `hono` na 4.12.12 v več paketih (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Povišali `@hono/node-server` s 1.19.11 na 1.19.13 v paketih TypeScript
- Povišali `cryptography` s 46.0.5 na 46.0.7 v paketih Python (10-StreamliningAIWorkflows laboratoriji 3 in 4)
- Povišali `lodash` s 4.17.23 na 4.18.1 v inšpektorju 10-StreamliningAIWorkflows

#### Prevodi

- Sinhronizirali prevode za 48+ jezikov z zadnjimi spremembami izvorne kode (posodobitev i18n)

---

## 5. februar 2026

### Izboljšave validacije in navigacije v celotnem repozitoriju

#### Dodana nova vsebina učnega načrta

**Modul 03 - Začetek**
- **12-mcp-hosts/README.md**: Novi celovit vodnik za nastavitev gostiteljev MCP
  - Primeri konfiguracije Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Predloge konfiguracije JSON za vse glavne gostitelje
  - Tabela primerjave vrst transporta (stdio, SSE/HTTP, WebSocket)
  - Reševanje pogostih težav s povezavo
  - Najboljše varnostne prakse za konfiguracijo gostiteljev

- **13-mcp-inspector/README.md**: Novi vodnik za odpravljanje napak MCP Inspectorja
  - Metode namestitve (npx, globalni npm, iz izvorne kode)
  - Povezava na strežnike prek stdio in HTTP/SSE
  - Orkestracija orodij, virov in potekov pozivov
  - Integracija z VS Code in MCP Inspectorjem
  - Pogosti scenariji odpravljanja napak z rešitvami

**Modul 04 - Praktična implementacija**
- **pagination/README.md**: Novi vodnik za implementacijo straničenja
  - Vzorce straničenja na podlagi kazalca v Pythonu, TypeScriptu, Javi
  - Obdelava straničenja na odjemalski strani
  - Strategije oblikovanja kazalcev (neprosojni proti strukturiranim)
  - Priporočila za optimizacijo zmogljivosti

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Poglobljen opis novih funkcij protokola
  - Implementacija obvestil o napredku
  - Vzorci prekinitve zahtevkov
  - Predloge virov z vzorci URI
  - Upravljanje življenjskega cikla strežnika
  - Nadzor ravni beleženja
  - Vzorci ravnanja z napakami s kodami JSON-RPC

#### Popravki navigacije (posodobljenih 24+ datotek)

**Glavni modul README-ji**  
Zdaj povezave kažejo na prvo lekcijo IN na naslednji modul

**Poddatoteke 02-Security**  
Vse 5 dodatnih varnostnih dokumentov ima zdaj navigacijo "Kaj sledi":

**Datoteke 09-CaseStudy**  
Vse datoteke študij primerov imajo zdaj zaporedno navigacijo:

**Laboratoriji 10-StreamliningAI**  
Dodana sekcija Kaj sledi v pregled 10. modula in modul 11

#### Popravki kode in vsebine

**Posodobitve SDK in odvisnosti**  
Odpravljena prazna različica openai na `^4.95.0`  
Posodobljen SDK s `^1.8.0` na `>=1.26.0`  
Posodobljene verzije mcp na `>=1.26.0`

**Popravki kode**  
Popravljena neveljavna različica modela `gpt-4o-mini` na `gpt-4.1-mini`

**Popravki vsebine**  
Popravljena pokvarjena povezava `READMEmd` → `README.md`, popravljena glava učnega načrta `Module 1-3` → `Module 0-3`, popravljena pot, občutljiva na velike in male črke  
Odstranjena pokvarjena podvojena vsebina študije primera 5

**Izboljšave za začetnike**  
Dodani ustrezni uvodi, učni cilji in predpogoji za začetnike

#### Posodobitve učnega načrta

**Glavni README.md**  
Dodani zapisi 3.12 (Gostitelji MCP), 3.13 (Inšpektor MCP), 4.1 (Straničenje), 5.16 (Funkcije protokola) v tabelo učnega načrta

**Modul README-ji**  
Dodani lekciji 12 in 13 na seznam lekcij  
Dodana sekcija Praktični vodiči s povezavo na straničenje  
Dodani lekciji 5.15 (Prilagojen transport) in 5.16 (Funkcije protokola)

**study_guide.md**  
Posodobljen miselni zemljevid z vsemi novimi temami: Nastavitev gostiteljev MCP, Inšpektor MCP, Strategije straničenja, Poglobljen pogled funkcij protokola

## 28. januar 2026

### Pregled skladnosti specifikacije MCP 2025-11-25

#### Izboljšave osnovnih konceptov (01-CoreConcepts/)  
- **Nova primitiva odjemalca - Roots**: Dodana obsežna dokumentacija o primitivni funkciji Roots, ki strežnikom omogoča razumevanje meja datotečnih sistemov in dostopnih dovoljenj  
- **Oznake orodij**: Dodana dokumentacija o vedenjskih oznakah orodij (`readOnlyHint`, `destructiveHint`) za boljše odločitve pri izvajanju orodij  
- **Klic orodij v vzorčenju**: Posodobljena dokumentacija vzorčenja, ki vključuje parametra `tools` in `toolChoice` za klic orodij, vodene z modelom, med vzorčenjem zahtev  
- **URL način sprožanja**: Dodana dokumentacija o sprožitvi spletnih interakcij zunanjih strežnikov preko URL  
- **Naloge (eksperimentalno)**: Dodana nova sekcija z dokumentacijo eksperimentalne funkcije Naloge za vzdržne ovojnike izvajanja in odloženo pridobivanje rezultatov  
- **Podpora ikonam**: Zabeleženo, da orodja, viri, predloge virov in pozivi lahko vsebujejo ikone kot dodatne metapodatke

#### Posodobitve dokumentacije  
- **README.md**: Dodana referenca na izvedbo MCP Specifikacije 2025-11-25 in pojasnilo verziranja po datumu  
- **study_guide.md**: Posodobljen zemljevid učnega načrta z nalogami in oznakami orodij v sekciji osnovnih konceptov; posodobljen časovni žig dokumenta

#### Preverjanje skladnosti specifikacije  
- **Različica protokola**: Preverjene vse reference na trenutno MCP Specifikacijo 2025-11-25  
- **Poravnava arhitekture**: Potrjena točnost dokumentacije o dvoplastni arhitekturi (Plast podatkov + plast transporta)  
- **Dokumentacija primitiv**: Validirani strežniške primitive (Viri, Pozivi, Orodja) in odjemalske primitive (Vzorčenje, Sprožitev, Beleženje, Roots)  
- **Transportni mehanizmi**: Potrjena pravilnost dokumentacije transporta STDIO in HTTP streaminga  
- **Varnostna navodila**: Potrjena skladnost z aktualno dokumentacijo najboljših varnostnih praks MCP

#### Ključne dokumentirane funkcije MCP 2025-11-25  
- **Odkritje OpenID Connect**: Avtorizacijski strežnik odkrit prek OIDC  
- **Metapodatki OAuth klienta**: Priporočeni mehanizem registracije klienta  
- **JSON Shema 2020-12**: Privzeti dialekt za definicije MCP shem  
- **Sistemi slojevanja SDK**: Formalizirani zahtevi za podporo in vzdrževanje funkcij v SDK-jih  
- **Struktura upravljanja**: Formalizirane delovne skupine in interesne skupine v upravljanju MCP

### Velika posodobitev varnostne dokumentacije (02-Security/)

#### Integracija MCP Security Summit delavnice (Sherpa)  
- **Novi praktični vir usposabljanja**: Dodana vsebinska integracija z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) v celotni varnostni dokumentaciji  
- **Zajem poti ekspedicije**: Dokumentiran celoten napredek od osnovnega tabora do vrha  
- **Usklajenost z OWASP**: Vsa varnostna navodila zdaj usklajena z oceno tveganj OWASP MCP Azure Security Guide

#### Integracija OWASP MCP Top 10  
- **Nova sekcija**: Dodana tabela z OWASP MCP Top 10 varnostnimi tveganji in Azure mitigacijami v glavni Security README  
- **Dokumentacija na osnovi tveganj**: Posodobljen mcp-security-controls-2025.md z referencami tveganj OWASP MCP za vsako varnostno domeno  
- **Referenčna arhitektura**: Povezava na referenčno arhitekturo in vzorce implementacije OWASP MCP Azure Security Guide

#### Posodobljene varnostne datoteke  
- **README.md**: Dodan pregled Sherpa delavnice, tabela poti ekspedicije, povzetek OWASP MCP Top 10 tveganj in sekcija za praktično usposabljanje  
- **mcp-security-controls-2025.md**: Posodobljena glava na februar 2026, dodane reference OWASP tveganj (MCP01-MCP08), popravljena neskladnost verzije specifikacije  
- **mcp-security-best-practices-2025.md**: Dodana sekcija virov Sherpa in OWASP, posodobljen časovni žig  
- **mcp-best-practices.md**: Dodana sekcija praktičnega usposabljanja s povezavami Sherpa in OWASP  
- **azure-content-safety-implementation.md**: Dodana referenca OWASP MCP06, poravnava s Sherpa Taborom 3 in dodatna sekcija virov

#### Dodane nove povezave do virov  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Posamezne OWASP MCP strani tveganj (MCP01-MCP10)

### Skladnost učnega načrta s specifikacijo MCP 2025-11-25

#### Modul 03 - Začetek  
- **Dokumentacija SDK**: Dodan Go SDK v uradni seznam SDK; posodobljene vse reference SDK skladno s specifikacijo MCP 2025-11-25  
- **Poenostavitev transporta**: Posodobljeni opisi STDIO in HTTP Streaming transporta z eksplicitnimi referencami specifikacije

#### Modul 04 - Praktična implementacija  
- **Posodobitve SDK**: Dodan Go SDK; posodobljen seznam SDK z referenco na verzijo specifikacije  
- **Specifikacija avtorizacije**: Posodobljena povezava na MCP specifikacijo avtorizacije z verzijo 2025-11-25

#### Modul 05 - Napredne teme  
- **Nove funkcionalnosti**: Dodana opomba o novih funkcijah specifikacije MCP 2025-11-25 (Naloge, Oznake orodij, URL način sprožitve, Roots)  
- **Varnostni viri**: Dodani povezavi na OWASP MCP Top 10 in Sherpa delavnico v dodatne vire

#### Modul 06 - Skupnostni prispevki  
- **Seznam SDK**: Dodana Swift in Rust SDK; posodobljena povezava na specifikacijo MCP 2025-11-25  
- **Referenca specifikacije**: Posodobljena povezava na neposredno URL specifikacije

#### Modul 07 - Lekcije iz zgodnje uporabe  
- **Posodobitve virov**: Dodani povezavi na MCP Specifikacijo 2025-11-25 in OWASP MCP Top 10 v dodatne vire

#### Modul 08 - Najboljše prakse  
- **Verzija specifikacije**: Posodobljena referenca MCP specifikacije na 2025-11-25  
- **Varnostni viri**: Dodani OWASP MCP Top 10 in Sherpa delavnica v dodatne vire

#### Modul 10 - Optimizacija AI potekov dela  
- **Posodobitev značke**: Spremenjena značko verzije MCP iz različice SDK (1.9.3) na različico specifikacije (2025-11-25)  
- **Povezave do virov**: Posodobljena povezava MCP Specifikacije; dodan OWASP MCP Top 10

#### Modul 11 - MCP strežniški praktični laboratoriji  
- **Referenca specifikacije**: Posodobljena MCP Specifikacija na verzijo 2025-11-25  
- **Varnostni viri**: Dodan OWASP MCP Top 10 v uradne vire

## 18. december 2025

### Posodobitev varnostne dokumentacije - MCP Specifikacija 2025-11-25

#### Najboljše varnostne prakse MCP (02-Security/mcp-best-practices.md) - posodobitev verzije specifikacije  
- **Posodobitev različice protokola**: Posodobljena za sklicevanje na najnovejšo MCP Specifikacijo 2025-11-25 (izdano 25. novembra 2025)  
  - Posodobljene vse reference različic specifikacije s 2025-06-18 na 2025-11-25  
  - Posodobljene časovne oznake dokumentov z 18. avgusta 2025 na 18. decembra 2025  
  - Preverjene vse URL-je specifikacije, da kažejo na trenutno dokumentacijo  
- **Validacija vsebine**: Celovita validacija najboljših varnostnih praks v skladu z najnovejšimi standardi  
  - **Microsoftove varnostne rešitve**: Preverjena aktualna terminologija in povezave za Zaščito pozivov (prej "odkrivanje tveganja zlomitve okovja"), Azure Varnost vsebin, Microsoft Entra ID in Azure Key Vault  
  - **Varnost OAuth 2.1**: Potrjena skladnost z najnovejšimi najboljšimi praksami za varnost OAuth  
  - **OWASP standardi**: Validirane aktualne reference na OWASP Top 10 za velike jezikovne modele  
  - **Azure storitve**: Preverjene vse Microsoft Azure povezave in najboljše prakse  
- **Poravnava z določili**: Vse navajane varnostne specifikacije so potrjene kot aktualne  
  - Okvir za upravljanje tveganj AI NIST  
  - ISO 27001:2022  
  - Najboljše prakse varnosti OAuth 2.1  
  - Okviri varnosti in skladnosti Azure  
- **Viri implementacije**: Validirane vse povezave in viri za implementacijske smernice  
  - Avtentikacijski vzorci Azure API Managementa  
  - Vodiči za integracijo Microsoft Entra ID  
  - Upravljanje skrivnosti Azure Key Vault  
  - Rešitve in cevi za DevSecOps in nadzor

### Zagotavljanje kakovosti dokumentacije  
- **Skladnost s specifikacijo**: Zagotovljeno, da vse obvezne varnostne zahteve MCP (MORA/MORA NE) sledijo zadnji specifikaciji  
- **Aktualnost virov**: Preverjene vse zunanje povezave do Microsoftove dokumentacije, varnostnih standardov in implementacijskih vodičev  
- **Obseg najboljših praks**: Potrjeno celovito pokritje avtentikacije, avtorizacije, specifičnih tveganj za AI, varnosti dobavne verige in poslovnih vzorcev

## 6. oktober 2025

### Razširitev oddelka Začetek – Napredna raba strežnika in enostavna avtentikacija

#### Napredna raba strežnika (03-GettingStarted/10-advanced)  
- **Dodano novo poglavje**: Predstavljen celovit vodnik za napredno uporabo strežnika MCP, ki zajema standardne in nizkonivojske strežniške arhitekture.
  - **Redni proti nizkonivojskemu strežniku**: Podroben primerjalni pregled in primeri kode v Pythonu in TypeScriptu za oba pristopa.
  - **Oblikovanje na osnovi upravljavcev**: Razlaga upravljanja orodij/virov/promptov na osnovi upravljavcev za razširljive, prilagodljive implementacije strežnikov.
  - **Praktični vzorci**: Resnični scenariji, kjer so vzorci nizkonivojskih strežnikov koristni za napredne funkcije in arhitekturo.

#### Enostavna avtentikacija (03-GettingStarted/11-simple-auth)
- **Dodano novo poglavje**: Vodnik korak za korakom za izvedbo enostavne avtentikacije v MCP strežnikih.
  - **Koncepti avtentikacije**: Jasna razlaga razlik med avtentikacijo in avtorizacijo ter upravljanja poverilnic.
  - **Osnovna implementacija avtentikacije**: Vzorce avtentikacije na osnovi middleware v Pythonu (Starlette) in TypeScriptu (Express) s primeri kode.
  - **Napredovanje do napredne varnosti**: Navodila za začetek z enostavno avtentikacijo in napredovanje do OAuth 2.1 ter RBAC, z referencami do naprednih varnostnih modulov.

Ti dodatki nudijo praktična, praktična navodila za gradnjo bolj robustnih, varnih in prilagodljivih implementacij MCP strežnikov, ki povezujejo temeljne koncepte z naprednimi produkcijskimi vzorci.

## 29. september 2025

### Laboratoriji za integracijo MCP strežnika z bazo podatkov - Celovit praktični učni načrt

#### 11-MCPServerHandsOnLabs - Novi celovit kurikulum integracije baze podatkov
- **Celovit 13-laboratorijski učni načrt**: Dodan obsežen praktičen kurikulum za gradnjo produkcijsko pripravljenih MCP strežnikov z integracijo PostgreSQL baze podatkov
  - **Resnična implementacija**: Primer uporabe Zava Retail analytics, ki prikazuje vzorce podjetniške ravni
  - **Strukturirano napredovanje učenja**:
    - **Laboratoriji 00-03: Osnove** – Uvod, osrednja arhitektura, varnost in večstrankarskost, nastavitev okolja
    - **Laboratoriji 04-06: Izgradnja MCP strežnika** – Oblikovanje baze podatkov in shema, implementacija MCP strežnika, razvoj orodij  
    - **Laboratoriji 07-09: Napredne funkcije** – Integracija semantičnega iskanja, testiranje in odpravljanje napak, integracija z VS Code
    - **Laboratoriji 10-12: Proizvodnja in najboljše prakse** – Strategije namestitve, nadzor in opazovanje, najboljše prakse in optimizacija
  - **Podjetniške tehnologije**: Okvir FastMCP, PostgreSQL s pgvector, vdelave Azure OpenAI, Azure Container Apps, Application Insights
  - **Napredne funkcije**: Varnost na ravni vrstic (RLS), semantično iskanje, večstrankarski dostop do podatkov, vektorjske vdelave, nadzor v realnem času

#### Standardizacija terminologije – pretvorba modulov v laboratorije
- **Celovita posodobitev dokumentacije**: Sistematično posodobljene vse datoteke README v 11-MCPServerHandsOnLabs za uporabo terminologije "Laboratorij" namesto "Modul"
  - **Naslovi odsekov**: Spremenjeno "Kaj ta modul pokriva" v "Kaj ta laboratorij pokriva" v vseh 13 laboratorijih
  - **Opis vsebine**: Spremenjeno "Ta modul zagotavlja..." v "Ta laboratorij zagotavlja..." po celotni dokumentaciji
  - **Učne cilje**: Spremenjeno "Do konca tega modula..." v "Do konca tega laboratorija..."
  - **Navigacijske povezave**: Vse reference "Modul XX:" spremenjene v "Laboratorij XX:" v medsebojnih povezavah in navigaciji
  - **Sledenje dokončanju**: Spremenjeno "Po zaključku tega modula..." v "Po zaključku tega laboratorija..."
  - **Ohranjene tehnične reference**: Ohranili Python module reference v konfiguracijskih datotekah (npr. `"module": "mcp_server.main"`)

#### Izboljšave učnega vodiča (study_guide.md)
- **Vizualna karta kurikuluma**: Dodan nov odsek "11. Laboratoriji integracije baze podatkov" z obsežno strukturo laboratorijev
- **Struktura repozitorija**: Posodobljeno iz deset na enajst glavnih odsekov z podrobnim opisom 11-MCPServerHandsOnLabs
- **Navodila za učno pot**: Izboljšana navodila za navigacijo, ki zajemajo odseke 00-11
- **Pokritost tehnologij**: Dodani podatki o FastMCP, PostgreSQL, integracijah Azure storitev
- **Učni izidi**: Poudarek na razvoju produkcijsko pripravljenih strežnikov, vzorci integracije baze podatkov in varnosti podjetniške ravni

#### Izboljšave glavne strukture README
- **Terminologija na osnovi laboratorijev**: Posodobljen glavni README.md v 11-MCPServerHandsOnLabs za dosledno uporabo strukture "Laboratorij"
- **Organizacija učne poti**: Jasno napredovanje od temeljnih konceptov preko naprednih implementacij do produkcijske namestitve
- **Poudarek na resničnem svetu**: Poudarek na praktičnem, ročno vodenem učenju z vzorci in tehnologijami podjetniške ravni

### Izboljšave kakovosti in skladnosti dokumentacije
- **Poudarek na praktičnem učenju**: Okrepljen praktičen, laboratorijsko usmerjen pristop skozi celotno dokumentacijo
- **Poudarek na podjetniških vzorcih**: Izpostavljene produkcijsko pripravljene implementacije in varnost podjetniške ravni
- **Integracija tehnologij**: Celovita pokritost sodobnih Azure storitev in vzorcev integracije AI
- **Napredovanje učenja**: Jasna, strukturirana pot od osnovnih konceptov do produkcijske namestitve

## 26. september 2025

### Izboljšave primerov uporab - integracija GitHub MCP registra

#### Primeri uporab (09-CaseStudy/) – Poudarek na razvoju ekosistema
- **README.md**: Obsežna razširitev z obsežnim primerom GitHub MCP registra
  - **Primer GitHub MCP registra**: Novi obsežni primer, ki raziskuje lansiranje GitHub MCP registra septembra 2025
    - **Analiza težav**: Podrobna preučitev fragmentiranega odkrivanja in uvajanja MCP strežnikov
    - **Arhitektura rešitve**: Centraliziran pristop registra GitHub z enostavno namestitvijo v VS Code
    - **Poslovni vpliv**: Merljive izboljšave pri usposabljanju razvijalcev in produktivnosti
    - **Strategska vrednost**: Poudarek na modularni namestitvi agentov in interoperabilnosti orodij
    - **Razvoj ekosistema**: Pozicioniranje kot temeljna platforma za agentno integracijo
  - **Izboljšana struktura primerov**: Vseh sedem primerov uporabljajo enotno oblikovanje in obsežne opise
    - Agenti za potovanja Azure AI: Poudarek na večagentni orkestraciji
    - Integracija Azure DevOps: Poudarek na avtomatizaciji poteka dela
    - Prejemanje dokumentacije v realnem času: Implementacija Python konzolnega odjemalca
    - Interaktivni generator učnega načrta: Verižna spletna aplikacija Chainlit
    - Dokumentacija znotraj urejevalnika: Integracija VS Code in GitHub Copilot
    - Upravljanje API Azure: Vzorce integracije podjetniških API
    - GitHub MCP Registry: Razvoj ekosistema in skupnostna platforma
  - **Obsežen zaključek**: Prepisan zaključek, ki poudarja sedem primerov, ki pokrivajo več dimenzij implementacije MCP
    - Podjetniška integracija, večagentna orkestracija, produktivnost razvijalcev
    - Razvoj ekosistema, izobraževalne aplikacije kategorije
    - Izboljšani vpogledi v arhitekturne vzorce, strategije izvedbe in najboljše prakse
    - Poudarek na MCP kot zrelem, produkcijsko pripravljenem protokolu

#### Posodobitve učnega vodiča (study_guide.md)
- **Vizualna karta kurikuluma**: Posodobljen miselni zemljevid za vključitev GitHub MCP registra v odsek primerov uporab
- **Opis primerov**: Izboljšan iz splošnih opisov v podrobno razčlenitev sedmih obsežnih primerov
- **Struktura repozitorija**: Posodobljen odsek 10 za celovito pokritost primerov z natančnimi izvedbenimi podrobnostmi
- **Integracija dnevnika sprememb**: Dodan zapis 26. september 2025 s dokumentacijo o dodajanju GitHub MCP registra in izboljšavah primerov
- **Posodobitve datuma**: Posodobljen časovni žig v nogi, ki odraža najnovejšo revizijo (26. september 2025)

### Izboljšave kakovosti dokumentacije
- **Izboljšana skladnost**: Standardizirano oblikovanje in struktura primerov v vseh sedmih primerih
- **Celovita pokritost**: Primeri zdaj pokrivajo podjetniške, produktivnostne in razvojne scenarije ekosistema
- **Strateško pozicioniranje**: Poudarek na MCP kot temeljni platformi za namestitev agentnih sistemov
- **Integracija virov**: Posodobljeni dodatni viri za vključitev povezave do GitHub MCP registra

## 15. september 2025

### Razširitev naprednih tem – po meri transporti in inženiring konteksta

#### Po meri MCP transporti (05-AdvancedTopics/mcp-transport/) – Novi vodnik za napredno implementacijo
- **README.md**: Celovit vodnik za implementacijo po meri mehanizmov MCP transporta
  - **Transport Azure Event Grid**: Celovita implementacija strežnika brez strežnika na osnovi dogodkov
    - Primeri v C#, TypeScriptu in Pythonu z integracijo Azure Functions
    - Vzorci arhitekture temelječe na dogodkih za razširljive rešitve MCP
    - Prejemniki webhookov in obdelava sporočil na potisni način
  - **Transport Azure Event Hubs**: Implementacija pretočnega transporta z visoko prepustnostjo
    - Zmožnosti pretočnega prenosa v realnem času za scenarije nizke zakasnitve
    - Strategije particioniranja in upravljanje kontrolnih točk
    - Združevanje sporočil in optimizacija zmogljivosti
  - **Vzorči integracije podjetij**: Produkcijsko pripravljeni arhitekturni primeri
    - Razdeljena obdelava MCP prek več Azure Functions
    - Hibridne arhitekture transporta z združevanjem mnogih vrst transportov
    - Vzdržnost sporočil, zanesljivost in obvladovanje napak
  - **Varnost in nadzor**: Integracija Azure Key Vault in vzorci opazovanja
    - Avtentikacija z upravljanimi identitetami in dostop z najmanjšimi pravicami
    - Telemetrija Application Insights in spremljanje zmogljivosti
    - Stikalniki vezij in vzorci odpornosti na napake
  - **Okviri za testiranje**: Celovite strategije testiranja za po meri transporte
    - Enotsko testiranje z dvojčki in ogrodji za posnemanje
    - Integracijsko testiranje z Azure Test Containers
    - Premisleki pri testiranju zmogljivosti in obremenitve

#### Inženiring konteksta (05-AdvancedTopics/mcp-contextengineering/) – Naraščajoča disciplinska veja AI
- **README.md**: Celovita razprava o inženiringu konteksta kot rastočem področju
  - **Temeljna načela**: Popolno deljenje konteksta, zavedanje odločitev dejanj in upravljanje okna konteksta
  - **Uskladitev s protokolom MCP**: Kako zasnova MCP naslavlja izzive inženiringa konteksta
    - Omejitve oken konteksta in progresivne strategije nalaganja
    - Določanje relevantnosti in dinamično pridobivanje konteksta
    - Večmodalna obdelava konteksta in varnostni pomisleki
  - **Pristopi izvedbe**: Ena nit vs. večagentne arhitekture
    - Tehnike razdeljevanja konteksta na kose in prioritetizacije
    - Progresivno nalaganje konteksta in strategije stiskanja
    - Večslojne pristope konteksta in optimizacija pridobivanja
  - **Okvir merjenja**: Rastoče metrike za ocenjevanje učinkovitosti konteksta
    - Učinkovitost vhoda, zmogljivost, kakovost in uporabniška izkušnja
    - Eksperimentalni pristopi k optimizaciji konteksta
    - Analiza napak in metodologije izboljšav

#### Posodobitve navigacije kurikuluma (README.md)
- **Izboljšana struktura modulov**: Posodobljena tabela kurikuluma za vključitev novih naprednih tem
  - Dodani vnosi za Inženiring konteksta (5.14) in Po meri transport (5.15)
  - Dosledno oblikovanje in navigacijske povezave skozi vse module
  - Posodobljeni opisi za odražanje trenutnega obsega vsebine

### Izboljšave strukture imenikov
- **Standardizacija poimenovanja**: Preimenovan "mcp transport" v "mcp-transport" za skladnost z ostalimi mapami naprednih tem
- **Organizacija vsebine**: Vse mape 05-AdvancedTopics zdaj sledijo doslednemu vzorcu poimenovanja (mcp-[tema])

### Izboljšave kakovosti dokumentacije
- **Uskladitev s specifikacijo MCP**: Vsa nova vsebina sklicuje na trenutno MCP specifikacijo 2025-06-18
- **Primeri v več programskih jezikih**: Celoviti primeri kode v C#, TypeScriptu in Pythonu
- **Poudarek na podjetjih**: Produkcijsko pripravljeni vzorci in integracija Azure oblaka po celotnem gradivu
- **Vizualna dokumentacija**: Diagrami Mermaid za vizualizacijo arhitekture in poteka

## 18. avgust 2025

### Celovita posodobitev dokumentacije – standardi MCP 2025-06-18

#### Najboljše varnostne prakse MCP (02-Security/) – Celovita modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Popoln prepis usklajen z MCP specifikacijo 2025-06-18
  - **Obvezne zahteve**: Dodani eksplicitni MUST/MUST NOT zahtevki iz uradne specifikacije z jasnimi vizualnimi indikacijami
  - **12 osnovnih varnostnih praks**: Prestrukturirano iz 15-členskega seznama v celovita varnostna področja
    - Varnost žetonov in avtentikacija z integracijo zunanjih ponudnikov identitete
    - Upravljanje sej in varnost transporta s kriptografskimi zahtevami
    - Zaščita pred grožnjami AI z integracijo Microsoft Prompt Shields
    - Nadzor dostopa in dovoljenja s principom najmanjših pravic
    - Varnost vsebine in nadzor z integracijo Azure Content Safety
    - Varnost dobavne verige s celovito verifikacijo komponent
    - Varnost OAuth in preprečevanje zavajajočih posrednikov s PKCE implementacijo
    - Odzivanje na incidente in okrevanje z avtomatiziranimi zmogljivostmi
    - Skladnost in upravljanje z usklajenostjo z regulatornimi zahtevami
    - Napredni varnostni nadzori z arhitekturo ničelnega zaupanja
    - Integracija Microsoft varnostnega ekosistema s celovitimi rešitvami
    - Neprestano izboljševanje varnosti z adaptivnimi praksami
  - **Microsoft varnostne rešitve**: Izboljšana integracija za Prompt Shields, Azure Content Safety, Entra ID in GitHub Advanced Security
  - **Viri za izvedbo**: Kategorizirane celovite povezave do virov po uradni MCP dokumentaciji, Microsoft varnostnih rešitvah, varnostnih standardih in vodičih za implementacijo

#### Napredni varnostni nadzori (02-Security/) – Izvedba na ravni podjetij
- **MCP-SECURITY-CONTROLS-2025.md**: Popolna predelava z varnostnim okvirom podjetniške ravni
  - **9 celovitih varnostnih področij**: Razširjeno iz osnovnih nadzorov v podroben okvir podjetja
    - Napredna avtentikacija in avtorizacija z enkripcijo Microsoft Entra ID
    - Varnost žetonov in kontrole proti passtrough s celovito validacijo
    - Nadzori varnosti sej s preprečevanjem prevzemovanj
    - Varnostne kontrole specifične za AI s preprečevanjem injekcij promptov in zastrupitev orodij
    - Preprečevanje napadov zavajajočih posrednikov s proxy varnostjo OAuth
    - Varnost izvajanja orodij s peskovnikom in izolacijo
    - Varnost dobavne verige z verifikacijo odvisnosti
    - Nadzor in zaznavanje z integracijo SIEM
    - Odzivanje na incidente in okrevanje z avtomatiziranimi zmogljivostmi
  - **Primeri izvedbe**: Dodani podrobni blok yaml konfiguracij in primeri kode
  - **Integracija Microsoft rešitev**: Celovita pokritost varnostnih storitev Azure, GitHub Advanced Security in upravljanja identitet podjetja

#### Varnost naprednih tem (05-AdvancedTopics/mcp-security/) – Produkcijsko pripravljena izvedba
- **README.md**: Popoln prepis za implementacijo varnosti podjetniške ravni
  - **Uskladitev s trenutno specifikacijo**: Posodobljeno na MCP specifikacijo 2025-06-18 z obveznimi varnostnimi zahtevami
  - **Izboljšana avtentikacija**: Integracija Microsoft Entra ID z obsežnimi primeri .NET in Java Spring Security
  - **Integracija AI varnosti**: Implementacija Microsoft Prompt Shields in Azure Content Safety z obsežnimi Python primeri
  - **Napredno blaženje groženj**: Celostni primeri implementacije za
    - Preprečevanje napadov zavajajočih posrednikov s PKCE in validacijo uporabniškega soglasja
    - Preprečevanje passtrough žetonov z validacijo občinstva in varnim upravljanjem žetonov
    - Preprečevanje prevzema sej z uporabo kriptografske povezave in vedenjske analize
  - **Integracija varnosti v podjetju**: spremljanje z Azure Application Insights, cevovodi za zaznavanje groženj in varnost oskrbovalne verige
  - **Kontrolni seznam izvedbe**: jasna ločitev obveznih in priporočenih varnostnih ukrepov z ugodnostmi Microsoftovega varnostnega ekosistema

### Kakovost dokumentacije in uskladitev s standardi
- **Navajanja specifikacij**: posodobljena vsa navajanja na trenutno MCP specifikacijo 2025-06-18
- **Microsoftov varnostni ekosistem**: izboljšana navodila za integracijo v celotni varnostni dokumentaciji
- **Praktična izvedba**: dodani podrobni primeri kode v .NET, Javi in Pythonu z vzorci za podjetja
- **Organizacija virov**: obsežna kategorizacija uradne dokumentacije, varnostnih standardov in vodnikov za izvedbo
- **Vizualni indikatorji**: jasno označeni obvezni zahtevki proti priporočenim praksam


#### Osnovni koncepti (01-CoreConcepts/) - popolna modernizacija
- **Posodobitev različice protokola**: posodobljeno navajanje na trenutno MCP specifikacijo 2025-06-18 z verziranjem po datumu (format LLLL-MM-DD)
- **Izboljšava arhitekture**: izboljšani opisi gostiteljev, odjemalcev in strežnikov, da odražajo trenutne arhitekturne vzorce MCP
  - Gostitelji so zdaj jasno definirani kot AI aplikacije, ki usklajujejo več povezav MCP odjemalcev
  - Odjemalci so opisani kot protokolarni konektorji, ki vzdržujejo ena-na-ena odnose s strežniki
  - Strežniki so izboljšani z lokalnimi proti oddaljenim scenariji namestitve
- **Prestrukturiranje primitivov**: popolna prenova primitivov strežnika in odjemalca
  - Strežniški primitiv: Viri (viri podatkov), Pozivi (predloge), Orodja (izvedljive funkcije) z podrobnimi pojasnili in primeri
  - Odjemalski primitiv: Vzorec (LLM dokončanja), Spraševanje (uporabniški vnos), Beleženje (razhroščevanje/nadzor)
  - Posodobljeni s trenutnimi vzorci metod za odkrivanje (`*/list`), pridobivanje (`*/get`) in izvajanje (`*/call`)
- **Arhitektura protokola**: uveden dvoplastni arhitekturni model
  - Podatkovna plast: temelji na JSON-RPC 2.0 z upravljanjem življenjskega cikla in primitivov
  - Transportna plast: STDIO (lokalno) in Streamable HTTP s SSE (oddaljeno) transportnimi mehanizmi
- **Varnostni okvir**: obsežna varnostna načela, vključno z izrecnim soglasjem uporabnika, zaščito zasebnosti podatkov, varnostjo izvajanja orodij in varnostjo transportne plasti
- **Vzorce komunikacije**: posodobljena protokolarna sporočila za prikaz inicializacije, odkrivanja, izvajanja in obveščanja
- **Primeri kode**: osveženi večjezični primeri (.NET, Java, Python, JavaScript) za prikaz trenutnih vzorcev MCP SDK

#### Varnost (02-Security/) - celovita prenova varnosti  
- **Uskladitev s standardi**: popolna skladnost z zahtevami za varnost MCP specifikacije 2025-06-18
- **Evolucija overjanja**: dokumentiran razvoj od lastnih OAuth strežnikov do delegiranja zunanjega ponudnika identitete (Microsoft Entra ID)
- **Specifična analiza groženj AI**: izboljšano pokrivanje sodobnih AI napadalnih vektorjev
  - Podrobne situacije napadov z injiciranjem pozivov s konkretnimi primeri iz prakse
  - Mehanizmi zastrupitve orodij in vzorci napadov »rug pull«
  - Zastrupitev kontekstnega okna in napadi z zmedo modela
- **Microsoftove rešitve za varnost AI**: obsežno pokrivanje Microsoftovega varnostnega ekosistema
  - Ščiti AI pozivov z naprednim zaznavanjem, osvetljevanjem in tehnikami ločilnikov
  - Vzorce integracije varnosti Azure Content Safety
  - GitHub Advanced Security za zaščito oskrbovalne verige
- **Napredne varnostne kontrole**: podrobni varnostni ukrepi za
  - Prevzem sej z MCP-specifičnimi scenariji napadov in zahtevami za kriptografsko sejo ID
  - Problemi z zmedenimi ponosilci v MCP proxy scenarijih z izrecnimi zahtevami po soglasju
  - Ranljivosti v prenosu žetonov s potrebno obvezno validacijo
- **Varnost oskrbovalne verige**: razširjeno pokrivanje AI oskrbovalne verige, vključno s temeljnimi modeli, storitvami vdelav, ponudniki konteksta in API-ji tretjih oseb
- **Varnost temeljev**: izboljšana integracija z vzorci varnosti podjetij, vključno z arhitekturo ničelnega zaupanja in Microsoftovim varnostnim ekosistemom
- **Organizacija virov**: kategorizirani obsežni viri po tipu (uradna dokumentacija, standardi, raziskave, Microsoftove rešitve, vodniki za izvedbo)

### Izboljšave kakovosti dokumentacije
- **Strukturirani učni cilji**: izboljšani z specifičnimi, izvedljivimi rezultati učenja 
- **Križne reference**: dodane povezave med povezanimi temami o varnosti in osnovnih konceptih
- **Aktualne informacije**: posodobljena vsa datumska navajanja in povezave v skladu z trenutnimi standardi
- **Navodila za izvedbo**: dodana specifična, izvedljiva navodila skozi obe področji

## 16. julij 2025

### Izboljšave README in navigacije
- Popolnoma prenovljena navigacija učnega načrta v README.md
- Nadomestitev `<details>` oznak z dostopnejšo tabelarično strukturo
- Ustvarjene alternativne možnosti postavitve v novi mapi "alternative_layouts"
- Dodani primeri navigacije z uporabo kartic, zavihkov in akordionov
- Posodobljena sekcija strukture repozitorija z vsemi najnovejšimi datotekami
- Izboljšana sekcija "Kako uporabljati ta učni načrt" s jasnimi priporočili
- Posodobljene povezave do MCP specifikacij na pravilne URL-je
- Dodana sekcija o kontekstnem inženiringu (5.14) v strukturo učnega načrta

### Posodobitve učnega vodiča
- Popolnoma prenovljen učni vodič za uskladitev z aktualno strukturo repozitorija
- Dodane nove sekcije za MCP odjemalce in orodja ter priljubljene MCP strežnike
- Posodobljena Vizualna karta učnega načrta za natančen prikaz vseh tem
- Izboljšani opisi Naprednih tem za pokritje vseh specializiranih področij
- Posodobljena sekcija študij primerov z dejanskimi primeri
- Dodan ta celovit dnevnik sprememb

### Prispevki skupnosti (06-CommunityContributions/)
- Dodane podrobne informacije o MCP strežnikih za generiranje slik
- Dodana obsežna sekcija o uporabi Claude v VSCode
- Dodani navodila za nastavitve in uporabo odjemalca Cline terminala
- Posodobljena MCP sekcija odjemalcev z vsemi priljubljenimi možnostmi
- Izboljšani primeri prispevkov z natančnejšimi vzorci kode

### Napredne teme (05-AdvancedTopics/)
- Organizirane vse specializirane mape z doslednim poimenovanjem
- Dodane vsebine in primeri za kontekstni inženiring
- Dodana dokumentacija za integracijo agenta Foundry
- Izboljšana dokumentacija o varnostni integraciji Entra ID

## 11. junij 2025

### Začetna izdaja
- Izdana prva verzija učnega načrta MCP za začetnike
- Ustvarjena osnovna struktura vseh 10 glavnih sklopov
- Implementirana Vizualna karta učnega načrta za navigacijo
- Dodani začetni vzorčni projekti v več programskih jezikih

### Začetek uporabe (03-GettingStarted/)
- Ustvarjeni prvi primeri implementacije strežnika
- Dodana navodila za razvoj odjemalcev
- Vključena navodila za integracijo LLM odjemalcev
- Dodana dokumentacija za integracijo z VS Code
- Implementirani primeri strežnikov z dogodki, ki jih pošilja strežnik (SSE)

### Osnovni koncepti (01-CoreConcepts/)
- Dodano podrobno pojasnilo arhitekture odjemalec-strežnik
- Ustvarjena dokumentacija o ključnih komponentah protokola
- Dokumentirani vzorci sporočanja v MCP

## 23. maj 2025

### Struktura repozitorija
- Inicializiran repozitorij z osnovno mapno strukturo
- Ustvarjene README datoteke za vsako glavno sekcijo
- Nastavljena infrastruktura za prevode
- Dodane slikovne datoteke in diagrami

### Dokumentacija
- Ustvarjen začetni README.md z orisom učnega načrta
- Dodana datoteka CODE_OF_CONDUCT.md in SECURITY.md
- Nastavljen SUPPORT.md z navodili za pomoč
- Ustvarjena preliminarna struktura učnega vodiča

## 15. april 2025

### Načrtovanje in okvir
- Začetno načrtovanje učnega načrta MCP za začetnike
- Določeni učni cilji in ciljna publika
- Opisana struktura učnega načrta v 10 sklopih
- Razvit konceptualni okvir za primere in študije primerov
- Ustvarjeni začetni prototipni primeri za ključne koncepte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->