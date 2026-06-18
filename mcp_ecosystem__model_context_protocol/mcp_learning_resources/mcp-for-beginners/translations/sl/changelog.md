# Dnevnik sprememb: MCP za začetnike kurikulum

Ta dokument služi kot zapis vseh pomembnih sprememb, narejenih v učnem načrtu Model Context Protocol (MCP) za začetnike. Spremembe so dokumentirane v obratnem kronološkem vrstnem redu (najnovejše spremembe najprej).

## 16. junij 2026

### Uskladitev specifikacije MCP & preverjanje vzorcev

Učni načrt je bil preverjen proti trenutni **MCP specifikaciji 2025-11-25** in najnovejšim uradnim SDK-jem, nato pa so bile odpravljene preostale zastarele reference na specifikacijo in potrjeno, da se osnovni vzorci še vedno sestavijo in zaženejo.

#### Popravki različic specifikacij (2025-06-18 / 2025-03-26 → 2025-11-25)

Posodobljena angleška vsebina, kjer je še vedno trdila, da je starejša različica specifikacije *trenutni/najnovejši* standard, in preusmerjene povezave na kanonične poti specifikacije `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Posodobljen transparent "Trenutni standard", uvod, naslov glavnih varnostnih načel, naslov obveznih zahtev, odsek Microsoft Entra ID, povezave na reference in vire ter zaključna varnostna obvestila (8 referenc) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Posodobljena povezava do dodatnih virov in transparent "Trenutni standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamenjana zastarela povezava `2025-03-26` za varnost in zaupanje z aktualno stranjo o najboljših praksah varnosti 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Posodobljena uradna povezava do dokumentacije za vzorčenje na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Posodobljena referenca v sedanjem času "trenutna MCP specifikacija" in povezava do dodatnih virov na 2025-11-25 (zgodovinske opombe o opustitvi SSE so ohranjene zaradi točnosti)

#### Preverjanje vzorcev proti trenutnim SDK-jem

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` je namestil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` je uspešno prešel brez tipnih napak — obstoječi `McpServer`/`StdioServerTransport` API-ji ostajajo veljavni
- **Python (03-GettingStarted/01-first-server/solution/python)**: Preverjeno v izolirani `.venv` z `mcp[cli]` (1.27.2); `py_compile` je uspel in `FastMCP.list_tools()` je pravilno vrnil orodji `add` in `subtract`
- Potrjeno, da vse verzijske zahtevane vrednosti vzorcev `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) brezhibno razrešujejo trenutni `1.29.0` brez prelomnih sprememb API

#### Usmerjanje različic odvisnosti (zapiranje vrzeli verzij)

Posodobljene zastarele pripone SDK, da vsak vzorec spremlja trenutno MCP izdajo in da sledi repozitorijskim konvencijam:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Posodobljen `@modelcontextprotocol/sdk` iz `^1.8.0` v `>=1.26.0` in posodobljen zastareli opis paketa "posodobljeno za MCP 2025-06-18" na "usklađeno s MCP specifikacijo 2025-11-25"
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** in **lab4/code/github_mcp_server/pyproject.toml**: Posodobljena natančna pripona `mcp==1.23.0` v `mcp>=1.26.0`; ponovno generirani `uv.lock` datoteki (`uv lock`), da se zaklepniki uskladijo s trenutno `mcp 1.27.2` izdajo in ostanejo usklajeni z manifesti

#### Analiza manjkajočih vsebin kurikuluma — Pokritost najnovejših funkcij specifikacije

Preverjeno, da kurikulum že vključuje vse primitivne funkcije, uvedene/razširjene v MCP 2025-11-25, tako da ni vsebinskih vrzeli:
- **Sampling**: Lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (vključno z načinom URL)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Roots (korenine)**: Dokumentirano v 00-Introduction, 01-CoreConcepts in 05-AdvancedTopics/mcp-root-contexts
- **Naloge (eksperimentalne, dolgotrajne operacije)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Opombe za orodja** (`readOnlyHint` / `destructiveHint`): Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features

### Krepitev varnosti & odprava ranljivosti odvisnosti

Izveden temeljit varnostni pregled vseh manifestov odvisnosti in izvorne kode vzorcev, nato pa odpravljene vse prijavljene npm varnostne ranljivosti in ena varnostna ranljivost na nivoju kode. Po popravku `npm audit` poroča o **0 ranljivostih** v vsakem pregledanem imeniku.

#### Ranljivosti npm odvisnosti (prehodne) — Popravljeno

Preverjenih vseh 15 predanih `package-lock.json` datotek. Ranljivosti so bile omejene na prehodne odvisnosti, vključene z razvojarskim orodjem MCP Inspector, OpenAI odjemalcem in MCP SDK-jem; vse so zdaj odpravljene brez prelomov vzorcev:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** in **lab3/code/weather_mcp/inspector**: Posodobljen `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kar je odpravilo varnostna opozorila povezana s paketoma `ajv`, `brace-expansion`, `diff`, `path-to-regexp` in `ws`. Dodan npm `overrides` vnos, ki sili popravljeno verzijo `shell-quote@1.8.4`, da odpravi še preostala kritična varnostna opozorila, ki jih je nosil `concurrently`; ponovno generirani obe zaklepni datoteki (sedaj 0 ranljivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` je posodobil prehodno odvisnost `qs` (zmerna) na popravljeno izdajo
- **03-GettingStarted/samples/javascript**: `npm audit fix` je posodobil prehodno odvisnost `hono` (zmerna) na popravljeno izdajo
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` je posodobil prehodno odvisnost `form-data` (visoka) na popravljeno izdajo
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana manjkajoča datoteka `package-lock.json`, da je projekt reproducibilen in preverljiv (0 ranljivosti)

#### Varnostni popravek na nivoju kode (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstranjen `shell=True` iz orodja `open_in_vscode`. Prejšnji `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` je dovoljeval interpretacijo znakov lupine v poti do mape preko `cmd.exe` (vektor izvršitve ukaza). Sedaj neposredno zažene rešeni `Code.exe` z mapo kot argumentom — brez lupine — kar je funkcionalno ekvivalentno in varno

#### Pregled Python odvisnosti

- Pregledani vsi Python nabori zahtev z `pip-audit`. `05-AdvancedTopics` in `03-GettingStarted/samples/python` niso poročali o **znanih ranljivostih** (njihovi `mcp` / `httpx` / `pydantic` / `python-dotenv` zahtevani nizi se razrešujejo na trenutno popravljene izdaje)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je označil prehodno odvisnost **`werkzeug` 3.1.1** s tremi DoS opozorili na ime naprave Windows v `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, in `CVE-2026-27199` (vse popravljeno v 3.1.6). Dodan ekspliciten varnostni zahtevek `werkzeug>=3.1.6`, da se razreši popravljena izdaja; preverjeno, da se omejitev čisto razreši z `chainlit` / `mcp` / `semantic-kernel` skladom

### Preimenovanje izdelka

Posodobljena vsa vsebina kurikuluma, da odraža Microsoftovo preimenovanje izdelka:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Posodobljena povezava do Discord skupnosti
- **AGENTS.md**: Posodobljen sklic na Discord strežnik
- **README.md**: Posodobljene reference ekosistema tehnologij
- **study_guide.md**: Posodobljene reference študije primera
- **05-AdvancedTopics/README.md**: Posodobljen naslov in opis modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Posodobljeni naslov odseka in opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Celotna posodobitev naslova in vsebine modula
- **05-AdvancedTopics/mcp-security-entra/README.md**: Posodobljena povezava za navzkrižno referenco
- **07-LessonsfromEarlyAdoption/README.md**: Posodobljene reference študije primera
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Posodobljen naslov 9. oddelka, značke in zmožnosti
- **08-BestPractices/README.md**: Posodobljena povezava do Discord skupnosti
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Posodobljen sklic na kanal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Posodobljen sklic na nameščanje modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Posodobljena tabela AI storitev
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Posodobljene reference virov

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension za VS Code
- **README.md**: Posodobljene glavne reference kurikuluma
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Posodobljen naslov modula, pregled in vsi naslovi podmodulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Posodobljen naslov, cilji učenja, navodila za nastavitev in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Posodobljen naslov, cilji učenja, tabela gostiteljev MCP in navzkrižne reference
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Posodobljen naslov, značke, predpogoj in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Posodobljene reference Agent Builder in povezava za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Posodobljeni predpogoji in reference razširitve

---

## 11. april 2026

### Nova lekcija, popravki dokumentacije in posodobitve odvisnosti

#### Dodana nova vsebina kurikuluma

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Protivstavna multi-agentna razprava z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nova obsežna vodnik, ki pokriva vzorec protivstavne debate za sisteme z več agenti
  - Mermaid diagram arhitekture: dva agenta → deljeni MCP strežnik → transkript debate → sodnik → sodba
  - Deljeni MCP strežnik orodij (`web_search` + `run_python`) implementiran v Pythonu in TypeScriptu
  - Nasprotujoči si sistemski pozivi (ZA / PROTI / Sodnik) z eksplicitnimi zahtevami za uporabo orodij
  - Orkestrator debate v Pythonu, TypeScriptu in C#, ki upravlja runde in usmerja argumente
  - MCP `ClientSession` povezovanje za orkestrator za klice pravih orodij
  - Tabela primerov uporabe (odkrivanje halucinacij, modeliranje groženj, pregled zasnove API, preverjanje dejstev, izbira tehnologije)
  - Varnostni premisleki: izvajanje v peskovniku, preverjanje klicev orodij, omejevanje hitrosti, beleženje revizij
  - Strukturirana vaja s tremi praktičnimi scenariji (pregled kode, odločanje o arhitekturi, moderacija vsebin)

#### Popravki dokumentacije

**Modul 03 - Začetek**
- **05-stdio-server/README.md**: Popravljena nepopolna primer TypeScript stdio strežnika — dodana manjkajoča inicializacija transporta (`new StdioServerTransport()`) in klic `server.connect(transport)`, tako da ustreza primerom v Pythonu in .NET v istem razdelku
- **14-sampling/README.md**: Popravljena tipkarska napaka — popravljeno `"Sampling is an davanced features"` v `"Sampling is an advanced feature"`

#### Posodobitve kurikuluma

**Glavni README.md**
- Dodan zapis 5.17 (Protivstavna multi-agentna razprava z MCP) v tabelo kurikuluma z neposredno povezavo na novo lekcijo

**05-AdvancedTopics/README.md**
- Dodan vrstica za lekcijo 5.17 v tabelo lekcij

**study_guide.md**
- Dodana tema Protivstavna multi-agentna razprava v miselni zemljevid in opis v prozi naprednih tem

#### Popravki kode in varnosti

**Modul 05 - Protivstavni agenti (`mcp-adversarial-agents`)**
- **Varnostni popravek — injekcija ukazov**: Zamenjan `execSync` shell interpolacija z `execFile` + `promisify` v TypeScript orodju `run_python`, kar odpravlja površino za injekcijo ukazov (koda, nadzorovana LLM, je sedaj posredovana kot dobesedni argv element brez vmesnosti lupine)
- **Ožičenje zanke orodja MCP**: Posodobljen Python razporejevalec debat, da uporablja odjemalca `AsyncAnthropic` (namesto blokirajočega sinhronega `Anthropic`), posreduje neposredno v živo `ClientSession` vsakemu agentu, pridobiva definicije orodij preko `session.list_tools()` vsakokrat, in izvaja bloke `tool_use` preko `session.call_tool()` v zanki, dokler model ne odda končnega besedilnega odgovora

#### Posodobitve odvisnosti

- Nadgrajen `hono` na 4.12.12 v več paketih (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Nadgrajen `@hono/node-server` z 1.19.11 na 1.19.13 v paketih TypeScript
- Nadgrajen `cryptography` z 46.0.5 na 46.0.7 v Python paketih (10-StreamliningAIWorkflows laboratoriji 3 in 4)
- Nadgrajen `lodash` z 4.17.23 na 4.18.1 v pregledovalniku 10-StreamliningAIWorkflows

#### Prevedbe

- Sinhronizirane prevode za 48+ jezikov z najnovejšimi izvorni spremembami (i18n posodobitev)

---

## 5. februar 2026

### Izboljšave validacije in navigacije po celotnem repozitoriju

#### Dodana nova vsebina učnega načrta

**Modul 03 - Začetek**
- **12-mcp-hosts/README.md**: Nova obsežna navodila za nastavitev gostiteljev MCP
  - Primeri konfiguracije Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Predloge JSON konfiguracij za vse glavne gostitelje
  - Tabela primerjav vrst transporta (stdio, SSE/HTTP, WebSocket)
  - Reševanje pogostih težav s povezavo
  - Varne prakse za konfiguracijo gostitelja

- **13-mcp-inspector/README.md**: Novi vodič za odpravljanje napak MCP Inspectorja
  - Metode namestitve (npx, npm globalno, iz izvorne kode)
  - Povezovanje s strežniki preko stdio in HTTP/SSE
  - Orodja za testiranje, viri in poteki delo z pozivi
  - Integracija z VS Code z MCP Inspectorjem
  - Pogosti scenariji odpravljanja napak s rešitvami

**Modul 04 - Praktična implementacija**
- **pagination/README.md**: Novi vodič za izvajanje paginacije
  - Vzorce paginacije na osnovi kurzorja v Pythonu, TypeScriptu, Javi
  - Obvladovanje paginacije na strani odjemalca
  - Strategije oblikovanja kurzorja (neprozoren vs. strukturiran)
  - Priporočila za optimizacijo zmogljivosti

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Poglobljen opis novih lastnosti protokola
  - Izvedba obvestil o napredku
  - Vzorci preklica zahtevkov
  - Predloge virov z vzorci URI
  - Upravljanje življenjskega cikla strežnika
  - Nadzor ravni dnevnikov
  - Vzorci obravnave napak s kodami JSON-RPC

#### Popravki navigacije (posodobljenih 24+ datotek)

**Glavni modul READMEs**  
 Sedaj vsebuje povezave do prve lekcije IN naslednjega modula

**Poddatoteke 02-Security**  
 Vse 5 dodatnih varnostnih dokumentov sedaj vključuje navigacijo "Kaj sledi":

**Datoteke 09-CaseStudy**  
 Vse datoteke študij primerov sedaj imajo zaporedno navigacijo:

**Laboratoriji 10-StreamliningAI**  
 Dodan razdelek Kaj sledi k pregledu Modula 10 in Modulu 11

#### Popravki kode in vsebine

**Posodobitve SDK in odvisnosti**  
 Popravljena prazna različica openai na `^4.95.0`  
 Nadgrajen SDK z `^1.8.0` na `>=1.26.0`  
 Nadgrajene različice mcp na `>=1.26.0`

**Popravki kode**  
 Popravljen neveljaven model `gpt-4o-mini` na `gpt-4.1-mini`

**Popravki vsebine**  
 Popravljen prekinjen povezovalnik `READMEmd` → `README.md`, popravljena glava učnega načrta `Module 1-3` → `Module 0-3`, popravljena pot, ki ločuje velike in male črke  
 Odstranjena pokvarjena podvojena vsebina študije primera 5

**Izboljšave za začetnike**  
 Dodano ustrezno uvod, učne cilje in predpogoje za začetnike

#### Posodobitve učnega načrta

**Glavni README.md**  
- Dodani vnosi 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginacija), 5.16 (Lastnosti protokola) v tabelo učnega načrta

**Modul READMEs**  
 Dodane lekcije 12 in 13 na seznam lekcij  
 Dodan razdelek Praktični vodiči s povezavo do paginacije  
 Dodane lekcije 5.15 (Custom Transport) in 5.16 (Lastnosti protokola)

**study_guide.md**  
- Posodobljena miselna karta z vsemi novimi temami: Nastavitev gostiteljev MCP, MCP Inspector, Strategije paginacije, Poglobljen opis lastnosti protokola

## 28. januar 2026

### Pregled skladnosti specifikacije MCP 2025-11-25

#### Izboljšave osnovnih konceptov (01-CoreConcepts/)  
- **Nova odjemalska primitiva - Roots**: Dodana obsežna dokumentacija o primitivni funkciji Roots, ki strežnikom omogoča razumevanje mej datotečnega sistema in dovoljenj za dostop  
- **Orodne anotacije**: Dodana dokumentacija o vedenjskih anotacijah orodij (`readOnlyHint`, `destructiveHint`) za boljše odločitve pri izvajanju orodij  
- **Klic orodij v vzorčenju**: Posodobljena dokumentacija Vzorčenja z vključitvijo parametrov `tools` in `toolChoice` za modelno usmerjen klic orodij med vzorčenjem zahtevkov  
- **Način izzivanja URL**: Dodana dokumentacija o izzivanju na osnovi URL za zunanjo spletno interakcijo, ki jo sproži strežnik  
- **Naloge (eksperimentalno)**: Dodan nov razdelek z dokumentacijo funkcije Eksperimentalnih nalog za obstojne ovojnike izvajanja in odloženo pridobivanje rezultatov  
- **Podpora ikon**: Opozorjeno, da orodja, viri, predloge virov in pozivi lahko sedaj vključujejo ikone kot dodatne metapodatke

#### Posodobitve dokumentacije  
- **README.md**: Dodan sklic na verzijo MCP Specifikacije 2025-11-25 in pojasnilo verzioniranja po datumu  
- **study_guide.md**: Posodobljen učni načrt z Dodajanjem Naloge in Orodnih Anotacij v razdelek osnovnih konceptov; posodobljen časovni žig

#### Preverjanje skladnosti specifikacije  
- **Verzija protokola**: Potrjen sklic vseh dokumentacij na trenutno MCP Specifikacijo 2025-11-25  
- **Usklajenost arhitekture**: Potrjena pravilnost dvoslojne arhitekture (plast podatkov + plast transporta)  
- **Dokumentacija primitiv**: Validacija strežniških primitivov (Viri, Pozivi, Orodja) in odjemalskih primitivov (Vzorčenje, Izzivanje, Beleženje, Roots)  
- **Transportni mehanizmi**: Potrjena natančnost dokumentacije STDIO in Streamable HTTP transporta  
- **Varnostna navodila**: Potrjena skladnost z aktualno dokumentacijo najboljših varnostnih praks MCP

#### Ključne funkcije MCP 2025-11-25 dokumentirane  
- **OpenID Connect odkrivanje**: Odkritje avtentikacijskega strežnika preko OIDC  
- **Metapodatki OAuth Client ID dokumentov**: Priporočeni mehanizem registracije odjemalcev  
- **JSON Schema 2020-12**: Privzeti dialekt za definicije shem MCP  
- **Sistemi nivojev SDK**: Formalizirani zahteve za podporo in vzdrževanje SDK funkcionalnosti  
- **Upravna struktura**: Formalizirane delovne in interesne skupine v upravljanju MCP

### Glavna posodobitev varnostne dokumentacije (02-Security/)

#### Integracija MCP Security Summit Workshop (Sherpa)  
- **Nov interaktivni učni vir**: Dodana obsežna integracija z delavnico [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) v vsej varnostni dokumentaciji  
- **Pokrivanje poti od kampa do kampa**: Dokumentirana celotna potovanja od začetnega kampa do vrha  
- **Usklajenost z OWASP**: Vsa varnostna navodila sedaj povezana z OWASP MCP Azure Security Guide tveganji

#### Integracija OWASP MCP Top 10  
- **Nov razdelek**: Dodana tabela OWASP MCP Top 10 varnostnih tveganj z Azure omilitvami v glavni varnostni README  
- **Dokumentacija na osnovi tveganj**: Posodobljen dokument mcp-security-controls-2025.md s sklici OWASP MCP tveganj za vsako področje varnosti  
- **Referenčna arhitektura**: Povezava do arhitekture in implementacijskih vzorcev iz OWASP MCP Azure Security Guide

#### Posodobljene varnostne datoteke  
- **README.md**: Dodan pregled delavnice Sherpa, tabela poti podvigov, povzetek OWASP MCP Top 10 tveganj in razdelek praktičnega usposabljanja  
- **mcp-security-controls-2025.md**: Posodobljena glava na februar 2026, vnešeni OWASP tveganji (MCP01-MCP08), popravljen neskladje verzije specifikacije  
- **mcp-security-best-practices-2025.md**: Dodan razdelek virov Sherpa in OWASP, posodobljen časovni žig  
- **mcp-best-practices.md**: Dodan razdelek praktičnega usposabljanja s povezavami Sherpa in OWASP  
- **azure-content-safety-implementation.md**: Dodan OWASP MCP06 sklic, usklajen s Sherpa taborom 3, dodan razdelek dodatnih virov

#### Dodane nove povezave do virov  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Posamezne strani OWASP MCP tveganj (MCP01-MCP10)

### Uskladitev učnega načrta s MCP Specifikacijo 2025-11-25

#### Modul 03 - Začetek  
- **SDK dokumentacija**: Dodan Go SDK na uradni seznam SDK; posodobljeni vsi sklici SDK za skladnost z MCP Specifikacijo 2025-11-25  
- **Prečiščena pojasnila transporta**: Posodobljene opisi STDIO in HTTP Streaming transporta z eksplicitnimi sklici na specifikacijo

#### Modul 04 - Praktična implementacija  
- **Posodobitve SDK**: Dodan Go SDK; posodobljen seznam SDK z referenco na verzijo specifikacije  
- **Specifikacija avtentikacije**: Posodobljen povezovalnik MCP Authorization specifikacije na trenutno različico 2025-11-25

#### Modul 05 - Napredne teme  
- **Nove funkcije**: Dodano obvestilo o novih funkcijah MCP Specifikacije 2025-11-25 (Naloge, Orodne anotacije, URL način izzivanja, Roots)  
- **Varnostni viri**: Dodane povezave do OWASP MCP Top 10 in delavnice Sherpa v dodatne vire

#### Modul 06 - Prispevki skupnosti  
- **Seznam SDK**: Dodana Swift in Rust SDK; posodobljen sklic specifikacije na 2025-11-25  
- **Sklic na specifikacijo**: Posodobljen MCP Specification povezovalnik na direktni URL specifikacije

#### Modul 07 - Lekcije iz zgodnje uporabe  
- **Posodobitve virov**: Dodana povezava do MCP Specifikacije 2025-11-25 in OWASP MCP Top 10 v dodatne vire

#### Modul 08 - Najboljše prakse  
- **Različica specifikacije**: Posodobljen sklic MCP Specifikacije na 2025-11-25  
- **Varnostni viri**: Dodane povezave OWASP MCP Top 10 in Sherpa delavnica v dodatne vire

#### Modul 10 - Poenostavljanje AI potekov dela  
- **Posodobitev značke**: Zamenjana značka različice MCP iz verzije SDK (1.9.3) na verzijo specifikacije (2025-11-25)  
- **Povezave do virov**: Posodobljen MCP Specification povezovalnik; dodan OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On laboratoriji  
- **Sklic na specifikacijo**: Posodobljen MCP Specification povezava na verzijo 2025-11-25  
- **Varnostni viri**: Dodan OWASP MCP Top 10 med uradne vire

## 18. december 2025

### Posodobitev varnostne dokumentacije - MCP Specifikacija 2025-11-25

#### Najboljše varnostne prakse MCP (02-Security/mcp-best-practices.md) - Posodobitev verzije specifikacije  
- **Posodobitev verzije protokola**: Posodobljeno za sklic na najnovejšo MCP Specifikacijo 2025-11-25 (izdano 25. novembra 2025)  
  - Posodobljeni vsi sklici verzije specifikacije z 2025-06-18 na 2025-11-25  
  - Posodobljeni časovni žigi dokumentov z 18. avgusta 2025 na 18. decembra 2025  
  - Preverjeno, da vse URL-je specifikacij kažejo na aktualno dokumentacijo  
- **Validacija vsebine**: Celovita validacija najboljših varnostnih praks glede na najnovejše standarde  
  - **Microsoft varnostne rešitve**: Preverjena aktualna terminologija in povezave za Prompt Shields (prej "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID in Azure Key Vault  
  - **OAuth 2.1 varnost**: Potrjena uskladitev z najnovejšimi najboljšimi varnostnimi praksami OAuth  
  - **Standardi OWASP**: Potrjena veljavnost sklicev na OWASP Top 10 za velike jezikovne modele  
  - **Azure storitve**: Preverjene vse povezave do Microsoft Azure dokumentacije in najboljše prakse  
- **Uskladenost s standardi**: Potrjeni vsi uporabljeni varnostni standardi so aktualni  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - Najboljše varnostne prakse OAuth 2.1  
  - Okviri za varnost in skladnost Azure  
- **Viri za izvedbo**: Preverjene vse povezave do izvajalskih vodičev in virov  
  - Avtorizacijski vzorci Azure API Management  
  - Vodniki za integracijo Microsoft Entra ID  
  - Upravljanje skrivnosti Azure Key Vault  
  - DevSecOps cevovodi in rešitve za nadzor

### Zagotavljanje kakovosti dokumentacije  
- **Skladnost specifikacije**: Zagotovljena ustreznost vseh obveznih MCP varnostnih zahtev (MORA/MORA NE) z najnovejšo specifikacijo  
- **Aktualnost virov**: Preverjene vse zunanje povezave do Microsoft dokumentacije, varnostnih standardov in izvajalskih vodičev  
- **Pokritost najboljših praks**: Potrjena celovitost pokritosti avtentikacije, avtorizacije, AI-specifičnih groženj, varnosti dobavne verige in vzorcev podjetij

## 6. oktober 2025

### Razširitev razdelka Začetek – Napredno upravljanje strežnikov in preprosta avtentikacija

#### Napredna uporaba strežnika (03-GettingStarted/10-advanced)  
- **Dodano novo poglavje**: Uveden obsežen vodič o napredni uporabi MCP strežnikov, ki pokriva tako običajno kot nizkonivojsko strežniško arhitekturo.  
  - **Običajen proti nizkonivojskemu strežniku**: Podrobna primerjava in kode v Pythonu ter TypeScriptu za obe pristopi.  
  - **Načrtovanje na osnovi upravljavca**: Pojasnilo upravljanja orodij/virov/pozivov na osnovi handlerjev za skalabilne, prilagodljive strežniške implementacije.  
  - **Praktični vzorci**: Resnični primeri, kjer so nizkonivojski vzorci strežnika koristni za napredne funkcije in arhitekturo.
#### Preprosta avtentikacija (03-GettingStarted/11-simple-auth)
- **Dodano novo poglavje**: Vodenje korak za korakom pri implementaciji preproste avtentikacije v MCP strežnikih.
  - **Koncepti avtentikacije**: Jasna razlaga razlik med avtentikacijo in avtorizacijo ter ravnanja s poverilnicami.
  - **Osnovna implementacija avtentikacije**: Vzorce avtentikacije na osnovi middleware v Pythonu (Starlette) in TypeScriptu (Express), s primeri kode.
  - **Napredovanje do napredne varnosti**: Navodila za začetek s preprosto avtentikacijo in napredovanje do OAuth 2.1 ter RBAC, s sklici na napredne varnostne module.

Te dopolnitve nudijo praktična, neposredna navodila za gradnjo robustnejših, varnejših in prilagodljivejših implementacij MCP strežnikov, ki povezujejo osnovne koncepte z naprednimi produkcijskimi vzorci.

## 29. september 2025

### Laboratoriji integracije MCP strežnika z bazo podatkov – Celovita praksa učenja

#### 11-MCPServerHandsOnLabs - Nova celovita učna pot za integracijo baze podatkov
- **Celovit 13-laboratorijski učni program**: Dodan celovit praktični program za gradnjo MCP strežnikov, pripravljenih za produkcijo, s PostgreSQL integracijo baze podatkov
  - **Implementacija v realnem svetu**: Primer uporabe Zava Retail analytics, ki prikazuje poslovnokakovostne vzorce
  - **Strukturiran potek učenja**:
    - **Laboratoriji 00-03: Osnove** – Uvod, osnovna arhitektura, varnost in večvrstna uporaba, namestitev okolja
    - **Laboratoriji 04-06: Gradnja MCP strežnika** – Oblikovanje baze podatkov in shema, implementacija MCP strežnika, razvoj orodij  
    - **Laboratoriji 07-09: Napredne funkcije** – Integracija semantičnega iskanja, testiranje in odpravljanje napak, integracija v VS Code
    - **Laboratoriji 10-12: Produkcija in dobre prakse** – Strategije implementacije, spremljanje in opazovanje, dobre prakse in optimizacija
  - **Poslovne tehnologije**: FastMCP ogrodje, PostgreSQL s pgvector, Azure OpenAI embeddingi, Azure Container Apps, Application Insights
  - **Napredne funkcije**: Varnost na ravni vrstic (RLS), semantično iskanje, večstranski dostop do podatkov, vektorski embeddingi, spremljanje v realnem času

#### Standardizacija terminologije – Pretvorba modulov v laboratorije
- **Celovita posodobitev dokumentacije**: Sistematično posodobljene vse README datoteke v 11-MCPServerHandsOnLabs, kjer je terminologija "Modul" zamenjana z "Laboratorij"
  - **Naslovi razdelkov**: "Kaj pokriva ta modul" spremenjeno v "Kaj pokriva ta laboratorij" v vseh 13 laboratorijih
  - **Opis vsebine**: "Ta modul ponuja..." spremenjeno v "Ta laboratorij ponuja..." v celotni dokumentaciji
  - **Cilji učenja**: "Ob koncu tega modula..." spremenjeno v "Ob koncu tega laboratorija..."
  - **Navigacijske povezave**: Vse reference "Modul XX:" spremenjene v "Laboratorij XX:" v navzkrižnih referencah in navigaciji
  - **Sledenje zaključku**: "Po zaključku tega modula..." spremenjeno v "Po zaključku tega laboratorija..."
  - **Ohranjene tehnične reference**: Ohranjene Python modulne reference v konfiguracijskih datotekah (npr. `"module": "mcp_server.main"`)

#### Izboljšave učnega vodiča (study_guide.md)
- **Vizualna karta učnega načrta**: Dodan nov razdelek "11. Laboratoriji integracije baze podatkov" s celovito vizualizacijo strukture laboratorijev
- **Struktura repozitorija**: Posodobitev z deset na enajst glavnih razdelkov z opisom 11-MCPServerHandsOnLabs
- **Navodila za pot učenja**: Izboljšana navigacija za zajem razdelkov od 00 do 11
- **Pokritost tehnologij**: Dodane podrobnosti o FastMCP, PostgreSQL in integracijah storitev Azure
- **Izidi učenja**: Poudarek na razvoju strežnikov, pripravljenih za produkcijo, vzorcih integracije baze podatkov in varnosti na ravni podjetij

#### Izboljšave glavne strukture README
- **Terminologija na osnovi laboratorijev**: Posodobitev glavnega README.md v 11-MCPServerHandsOnLabs za dosledno uporabo strukture "Laboratorij"
- **Organizacija učne poti**: Jasno napredovanje od osnovnih konceptov preko naprednih implementacij do produkcijske uvedbe
- **Poudarek na resničnem svetu**: Poudarek na praktičnem, izvršilnem učenju z vzorci in tehnologijami na ravni podjetij

### Izboljšave kakovosti in doslednosti dokumentacije
- **Poudarek na praktičnem učenju**: Okrepljen praktični, laboratorijski pristop skozi celotno dokumentacijo
- **Poudarek na vzorcih podjetij**: Izpostavljene produkcijske implementacije in varnostne zahteve podjetij
- **Integracija tehnologije**: Celovita pokritost modernih Azure storitev in vzorcev integracije umetne inteligence
- **Napredovanje učenja**: Jasna, strukturirana pot od osnovnih konceptov do produkcijske uvedbe

## 26. september 2025

### Izboljšave primerov uporabe – Integracija GitHub MCP registra

#### Primeri uporabe (09-CaseStudy/) – Poudarek na razvoju ekosistema
- **README.md**: Obsežna razširitev z obsežnim primerom uporabe GitHub MCP registra
  - **Primer uporabe GitHub MCP registra**: Nov obsežen primer uporabe, ki preučuje lansiranje GitHub MCP registra septembra 2025
    - **Analiza problema**: Podroben pregled fragmentiranega odkrivanja in uvajanja MCP strežnikov
    - **Arhitektura rešitve**: Centraliziran pristop registra GitHub z namestitvijo VS Code z enim klikom
    - **Poslovni vpliv**: Merljive izboljšave pri uvajanju razvijalcev in produktivnosti
    - **Strateška vrednost**: Poudarek na modularni uvajanj agentov in interoperabilnosti med orodji
    - **Razvoj ekosistema**: Postavitev kot temeljne platforme za agentno integracijo
  - **Izboljšana struktura primerov uporabe**: Posodobljeni vsi sedem primerov z dosledno obliko in obsežnimi opisi
    - Azure AI Travel Agents: Poudarek na orkestraciji več agentov
    - Azure DevOps integracija: Poudarek na avtomatizaciji delovnih tokov
    - Pridobivanje dokumentacije v realnem času: Implementacija Python konzolnega odjemalca
    - Interaktivni generator učnih načrtov: Chainlit pogovorna spletna aplikacija
    - Dokumentacija v urejevalniku: Integracija VS Code in GitHub Copilot
    - Azure API Management: Vzorci integracije podjetniškega API-ja
    - GitHub MCP Registry: Razvoj ekosistema in platforme skupnosti
  - **Celovit zaključek**: Predelano zaključkovno poglavje, ki poudarja sedem primerov uporabe v različnih dimenzijah MCP implementacije
    - Integracija podjetij, orkestracija več agentov, produktivnost razvijalcev
    - Razvoj ekosistema, kategorizacija izobraževalnih aplikacij
    - Izboljšani vpogledi v arhitekturne vzorce, strategije implementacije in dobre prakse
    - Poudarek na MCP kot zrelem protokolu, pripravljenem za produkcijo

#### Posodobitve učnega vodiča (study_guide.md)
- **Vizualna karta učnega načrta**: Posodobljen miselni zemljevid z vključenim GitHub MCP registrom v razdelku primerov uporabe  
- **Opis primerov uporabe**: Izboljšan iz splošnih opisov v podrobno razčlenitev sedmih celovitih primerov uporabe  
- **Struktura repozitorija**: Posodobljen 10. razdelek za odsev celovite pokritosti primerov uporabe s specifičnimi podrobnostmi implementacije  
- **Integracija dnevnika sprememb**: Dodan vnos za 26. september 2025, ki dokumentira dodatke GitHub MCP registra in izboljšave primerov uporabe  
- **Posodobitve datumov**: Posodobljen časovni žig v nogi dokumenta na najnovejšo revizijo (26. september 2025)  

### Izboljšave kakovosti dokumentacije  
- **Izboljšana doslednost**: Standardizirana oblika in struktura primerov uporabe za vseh sedem primerov  
- **Celovita pokritost**: Primeri uporabe zajemajo scenarije podjetij, produktivnost razvijalcev in razvoj ekosistema  
- **Strateško umeščanje**: Okrepljen poudarek MCP kot temeljne platforme za uvajanje agentnih sistemov  
- **Integracija virov**: Posodobljeni dodatni viri z vključitvijo povezave do GitHub MCP registra  

## 15. september 2025

### Razširitev naprednih tem – Prilagojeni transporti in inženiring konteksta

#### Prilagojeni MCP transporti (05-AdvancedTopics/mcp-transport/) – Novi napredni vodnik implementacije  
- **README.md**: Celovit vodnik implementacije za mehhanizme prilagojenega MCP transporta  
  - **Azure Event Grid transport**: Celovita implementacija transporta brez strežnika, ki temelji na dogodkih  
    - Primeri v C#, TypeScript in Pythonu s povezavo na Azure Functions  
    - Vzorci arhitekture na osnovi dogodkov za skalabilne rešitve MCP  
    - Sprejemniki webhook in push obdelava sporočil  
  - **Azure Event Hubs transport**: Implementacija toka visoke prepustnosti  
    - Sposobnosti pretakanja v realnem času za scenarije z nizko latenco  
    - Strategije razdelitve in upravljanje kontrolnih točk  
    - Paketno pošiljanje sporočil in optimizacija delovanja  
  - **Vzorci integracije podjetij**: Produkcijsko pripravljeni arhitekturni primeri  
    - Porazdeljena MCP obdelava preko več Azure Functions  
    - Hibridne transportne arhitekture, ki združujejo več vrst transportov  
    - Strategije zanesljivosti, trajnosti sporočil in obvladovanja napak  
  - **Varnost in spremljanje**: Povezava z Azure Key Vault in vzorci opazovanja  
    - Avtentikacija z upravljanimi identitetami in dostop na osnovi najmanjših pravic  
    - Telemetrija Application Insights in spremljanje delovanja  
    - Prekinitveni mehanizmi in vzorci odpornosti na okvare  
  - **Okviri za testiranje**: Celovite strategije testiranja za prilagojene transporte  
    - Enotno testiranje s testnimi dvojčki in okviri za simulacijo  
    - Integracijsko testiranje z Azure Test Containers  
    - Premisleki o testiranju zmogljivosti in obremenitvi  

#### Inženiring konteksta (05-AdvancedTopics/mcp-contextengineering/) – Rastoča AI disciplina  
- **README.md**: Celovita raziskava inženiringa konteksta kot nastajajočega področja  
  - **Osnovna načela**: Popolno deljenje konteksta, zavedanje odločitev o dejanju in upravljanje kontekstnih oken  
  - **Usmerjenost na MCP protokol**: Kako MCP zasnova rešuje izzive inženiringa konteksta  
    - Omejitve kontekstnih oken in progresivne strategije nalaganja  
    - Določanje relevantnosti in dinamično pridobivanje konteksta  
    - Ravnanje z večmodalnimi konteksti in varnostne premisleke  
  - **Pristopi implementacije**: Ena-nitni v primerjavi z večagentnimi arhitekturami  
    - Tehnike razdeljevanja in prioritetizacije konteksta  
    - Progresivno nalaganje konteksta in stiskanje  
    -plastni pristopi konteksta in optimizacija pridobivanja  
  - **Okvir merjenja**: Nastajajoče metrike za ocenjevanje učinkovitosti konteksta  
    - Učinkovitost vnosa, delovanje, kakovost in uporabniška izkušnja  
    - Eksperimentalni pristopi k optimizaciji konteksta  
    - Analiza napak in metode izboljšav  

#### Posodobitve navigacije učnega programa (README.md)  
- **Izboljšana struktura modulov**: Posodobljena tabela učnih enot z novimi naprednimi temami  
  - Dodani vnosi za Inženiring konteksta (5.14) in Prilagojeni transport (5.15)  
  - Dosledna oblika in navigacijske povezave skozi vse module  
  - Posodobljeni opisi za odsev trenutnega obsega vsebine  

### Izboljšave strukture imenikov  
- **Standardizacija imen**: Preimenovan "mcp transport" v "mcp-transport" v skladu z ostalimi mapami naprednih tem  
- **Organizacija vsebine**: Vse 05-AdvancedTopics mape zdaj sledijo konsistentnemu imenskemu vzorcu (mcp-[tema])  

### Izboljšave kakovosti dokumentacije  
- **Usklajenost s specifikacijo MCP**: Vsa nova vsebina se sklicuje na trenutno MCP specifikacijo 2025-06-18  
- **Primeri v več jezikih**: Celoviti primeri kode v C#, TypeScript in Python  
- **Poudarek na podjetjih**: Produkcijsko pripravljeni vzorci in integracija v Azure oblak skozi celotno vsebino  
- **Vizualna dokumentacija**: Mermaid diagrami za prikaz arhitekture in potekov  

## 18. avgust 2025

### Celovita posodobitev dokumentacije – MCP standardi 2025-06-18

#### Najboljše prakse varnosti MCP (02-Security/) – Celovita modernizacija  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Popolna predelava usklajena z MCP specifikacijo 2025-06-18  
  - **Obvezne zahteve**: Dodane eksplicitne zahteve MUST/MUST NOT iz uradne specifikacije z jasnimi vizualnimi oznakami  
  - **12 osnovnih varnostnih praks**: Prestrukturirano iz 15 točk v celovite varnostne domene  
    - Varnost žetonov in avtentikacija z integracijo zunanjega ponudnika identitete  
    - Upravljanje sej in varnost transporta z zahtevami kriptografije  
    - Zaščita pred AI-specifičnimi grožnjami z Microsoft Prompt Shields integracijo  
    - Nadzor dostopa in dovoljenja z načelom najmanjših privilegijev  
    - Varovanje vsebine in spremljanje z Azure Content Safety integracijo  
    - Varnost dobavne verige z obsežnim preverjanjem komponent  
    - Varnost OAuth in preprečevanje zmede proxyja z implementacijo PKCE  
    - Odziv na incidente in obnovitev z avtomatiziranimi zmogljivostmi  
    - Skladnost in upravljanje z regulativno usklajenostjo  
    - Napredni varnostni nadzor z arhitekturo ničelnega zaupanja  
    - Integracija Microsoftovega varnostnega ekosistema z obsežnimi rešitvami  
    - Stalni varnostni razvoj z adaptivnimi praksami  
  - **Microsoftove varnostne rešitve**: Izboljšane smernice za integracijo Prompt Shields, Azure Content Safety, Entra ID in GitHub Advanced Security  
  - **Viri za implementacijo**: Kategorizirane obsežne povezave na vire po uradni MCP dokumentaciji, Microsoftovih varnostnih rešitvah, varnostnih standardih in vodičih za implementacijo  

#### Napredni varnostni nadzori (02-Security/) – Implementacija na ravni podjetja  
- **MCP-SECURITY-CONTROLS-2025.md**: Popolna predelava s podjetniškim varnostnim okvirom  
  - **9 celovitih varnostnih domen**: Razširjeno iz osnovnih nadzorov v podrobni podjetniški okvir  
    - Napredna avtentikacija & avtorizacija z integracijo Microsoft Entra ID  
    - Varnost žetonov & nadzori proti posredovanju z obsežnim preverjanjem  
    - Varovanje sej z zaščito pred odvzemanjem  
    - AI-specifični varnostni nadzori z zaščito pred injection in zastrupitvijo orodij  
    - Preprečevanje napadov sklonjenega uslužbenca z varnostjo OAuth proxya  
    - Varnost izvajanja orodij z uporabo peskovnika in izolacije  
    - Varnost dobavne verige z verifikacijo odvisnosti  
    - Nadzor in odkrivanje s SIEM integracijo  
    - Odziv na incidente in obnovitev z avtomatiziranimi zmogljivostmi  
  - **Primeri implementacije**: Dodani podrobni bloki konfiguracije YAML in primeri kode  
  - **Integracija Microsoftovih rešitev**: Celovita pokritost Azure varnostnih storitev, GitHub Advanced Security in upravljanje identitete podjetja  

#### Varnost naprednih tem (05-AdvancedTopics/mcp-security/) – Produkcijsko pripravljena implementacija  
- **README.md**: Popolna predelava za implementacijo varnosti na ravni podjetja  
  - **Usklajenost s trenutno specifikacijo**: Posodobljeno na MCP Specifikacijo 2025-06-18 z obveznimi varnostnimi zahtevami  
  - **Izboljšana avtentikacija**: Integracija Microsoft Entra ID z obsežnimi primeri .NET in Java Spring Security  
  - **Integracija varnosti AI**: Implementacija Microsoft Prompt Shields in Azure Content Safety s podrobnimi primeri v Pythonu  
  - **Napredna zaščita pred grožnjami**: Celoviti primeri implementacije za  
    - Preprečevanje napadov sklonjenega uslužbenca z PKCE in validacijo soglasja uporabnika  
    - Preprečevanje posredovanja žetona z validacijo občinstva in varnim upravljanjem žetonov  
    - Preprečevanje odvzema seje z kriptografskim povezovanjem in analizo vedenja  
  - **Integracija varnosti podjetij**: Spremljanje preko Azure Application Insights, pipelines za odkrivanje groženj in varnost dobavne verige  
  - **Kontrolni seznam implementacije**: Jasni obvezni in priporočeni varnostni nadzori z ugodnostmi Microsoftovega varnostnega ekosistema  

### Izboljšave kakovosti dokumentacije in usklajenost s standardi
- **Reference specifikacije**: Posodobljene vse reference na trenutno MCP specifikacijo 2025-06-18  
- **Microsoftov varnostni ekosistem**: Izboljšano vodilo za integracijo skozi celotno varnostno dokumentacijo  
- **Praktična implementacija**: Dodani podrobni primeri kode v .NET, Javi in Pythonu z vzorci za podjetja  
- **Organizacija virov**: Celovita kategorizacija uradne dokumentacije, varnostnih standardov in vodnikov za implementacijo  
- **Vizualni indikatorji**: Jasna označitev obveznih zahtev v primerjavi s priporočenimi praksami  


#### Temeljni koncepti (01-CoreConcepts/) - Popolna modernizacija  
- **Posodobitev različice protokola**: Posodobljena referenca na trenutno MCP specifikacijo 2025-06-18 z različico, osnovano na datumu (format LLLL-MM-DD)  
- **Izboljšava arhitekture**: Izboljšani opisi gostiteljev, odjemalcev in strežnikov, da odražajo trenutne vzorce arhitekture MCP  
  - Gostitelji so zdaj jasno definirani kot AI aplikacije, ki usklajujejo več povezav MCP odjemalcev  
  - Odjemalci opisani kot protokolarni povezovalci, ki vzdržujejo odnose ena na ena s strežnikom  
  - Strežniki izboljšani z lokalnimi in oddaljenimi scenariji nameščanja  
- **Prenova primitivov**: Popolna prenova primitivov strežnika in odjemalca  
  - Strežniški primativi: Viri (viri podatkov), Pozivi (predloge), Orodja (izvedljive funkcije) s podrobnimi razlagami in primeri  
  - Odjemalski primativi: Vzorcevanje (izpolnitve LLM), Pridobivanje podatkov (uporabniški vnosi), Beleženje (odpravljanje napak/nadzor)  
  - Posodobitev s trenutnimi vzorci metod odkrivanja (`*/list`), pridobivanja (`*/get`) in izvajanja (`*/call`)  
- **Arhitektura protokola**: Uveden dvoslojni arhitekturni model  
  - Podatkovna plast: Temelj JSON-RPC 2.0 z upravljanjem življenjskega cikla in primitivov  
  - Transportna plast: STDIO (lokalni) in pretočni HTTP s SSE (oddaljena) transportna mehanizma  
- **Varnostni okvir**: Celovita načela varnosti, vključno z izrecnim soglasjem uporabnika, zaščito zasebnosti podatkov, varnostjo izvajanja orodij in varnostjo transportne plasti  
- **Vzorce komunikacije**: Posodobljena protokolarna sporočila za prikaz inicializacije, odkrivanja, izvedbe in obveščanja  
- **Primeri kode**: Osveženi večjezični primeri (.NET, Java, Python, JavaScript) za prikaz trenutnih vzorcev MCP SDK  


#### Varnost (02-Security/) - Celovita prenova varnosti  
- **Uskladitev s standardi**: Popolna uskladitev z varnostnimi zahtevami MCP specifikacije 2025-06-18  
- **Evolucija overjanja**: Dokumentirana evolucija od lastnih OAuth strežnikov do zunanje delegacije ponudnika identitete (Microsoft Entra ID)  
- **Analiza groženj specifičnih za AI**: Izboljšano pokrivanje sodobnih AI napadalnih vektorjev  
  - Podrobni scenariji napadov vbrizgavanja pozivov s primeri iz prakse  
  - Mehanizmi zastrupitve orodij in vzorci napadov "rug pull"  
  - Zastrupitev kontekstnega okna in napadi z zmedo modela  
- **Microsoftove varnostne rešitve za AI**: Celovito pokrivanje Microsoftovega varnostnega ekosistema  
  - Ščiti AI pozive z naprednim zaznavanjem, osredotočanjem in tehnikami za ločevalnike  
  - Vzorce integracije Azure Content Safety  
  - Napredna varnost GitHub za zaščito oskrbovalne verige  
- **Napredna zaščita pred grožnjami**: Podrobni varnostni ukrepi za  
  - Prevzemanje sej s specifičnimi MCP napadi in zahtevami po kriptografski ID seje  
  - Problemi z zmedenim pomočnikom pri MCP proxy scenarijih z izrecnimi zahtevami po soglasju  
  - Ranljivosti pri podajanju žetonov z obveznimi kontrolami validacije  
- **Varnost oskrbovalne verige**: Razširjeno pokrivanje AI oskrbovalne verige, vključno z osnovnimi modeli, storitvami vdelave, ponudniki konteksta in API-ji tretjih oseb  
- **Varnost temeljev**: Izboljšana integracija z varnostnimi vzorci podjetij, vključno z arhitekturo zero trust in Microsoftovim varnostnim ekosistemom  
- **Organizacija virov**: Kategorizirane celovite povezave do virov po vrstah (Uradna dokumentacija, Standardi, Raziskave, Microsoftove rešitve, Vodniki za implementacijo)  


### Izboljšave kakovosti dokumentacije  
- **Strukturirani učni cilji**: Izboljšani učni cilji z natančnimi, izvedljivimi rezultati  
- **Medsebojne reference**: Dodane povezave med sorodnimi varnostnimi in temeljnimi koncepti  
- **Aktualne informacije**: Posodobljene vse datumske reference in povezave do specifikacij na veljavne standarde  
- **Smernice za implementacijo**: Dodani specifični in izvedljivi napotki za implementacijo skozi obe področji  


## 16. julij 2025  

### Izboljšave README in navigacije  
- Popolnoma prenovljena navigacija učnega načrta v README.md  
- Zamenjane oznake `<details>` z bolj dostopno tabelarično obliko  
- Ustvarjene alternativne možnosti postavitve v novi mapi "alternative_layouts"  
- Dodani primeri navigacije s karticami, zavihki in harmoniko  
- Posodobljen razdelek o strukturi repozitorija za vključitev vseh najnovejših datotek  
- Izboljšan razdelek "Kako uporabljati ta učni načrt" z jasnimi priporočili  
- Posodobljene povezave MCP specifikacije na pravilne URL-je  
- Dodan razdelek Kontekstno inženirstvo (5.14) v strukturo učnega načrta  


### Posodobitve učnega vodiča  
- Popolnoma prenovljen učni vodič za skladnost s trenutno strukturo repozitorija  
- Dodani novi razdelki za MCP odjemalce in orodja ter priljubljene MCP strežnike  
- Posodobljen vizualni zemljevid učnega načrta za natančen prikaz vseh tem  
- Izboljšani opisi naprednih tem za pokrivanje vseh specializiranih področij  
- Posodobljen razdelek primerov študij za prikaz dejanskih primerov  
- Dodan ta celovit dnevnik sprememb  


### Prispevki skupnosti (06-CommunityContributions/)  
- Dodane podrobne informacije o MCP strežnikih za generiranje slik  
- Dodan celovit razdelek o uporabi Claude v VSCode  
- Dodane navodila za namestitev in uporabo terminala Cline  
- Posodobljen razdelek MCP odjemalcev za vključitev vseh priljubljenih možnostnih odjemalcev  
- Izboljšani primeri prispevkov z natančnejšimi vzorci kode  


### Napredne teme (05-AdvancedTopics/)  
- Organizirane vse mape specializiranih tem z doslednim poimenovanjem  
- Dodani materiali in primeri za kontekstno inženirstvo  
- Dodana dokumentacija za integracijo agenta Foundry  
- Izboljšana dokumentacija varnostne integracije Entra ID  


## 11. junij 2025  

### Prvotna ustvaritev  
- Izdana prva različica učnega načrta MCP za začetnike  
- Ustvarjena osnovna struktura za vseh 10 glavnih razdelkov  
- Implementiran vizualni zemljevid učnega načrta za navigacijo  
- Dodani začetni vzorčni projekti v več programskih jezikih  


### Začetek (03-GettingStarted/)  
- Ustvarjeni prvi primeri implementacije strežnika  
- Dodano vodilo za razvoj odjemalcev  
- Vključena navodila za integracijo LLM odjemalcev  
- Dodana dokumentacija za integracijo v VS Code  
- Implementirani primeri strežnika z dogodki, ki jih pošilja strežnik (SSE)  


### Temeljni koncepti (01-CoreConcepts/)  
- Dodan podroben opis arhitekture odjemalec-strežnik  
- Ustvarjena dokumentacija o ključnih protokolarnih komponentah  
- Dokumentirani vzorci sporočanja v MCP  


## 23. maj 2025  

### Struktura repozitorija  
- Inicirana struktura repozitorija z osnovnimi mapami  
- Ustvarjene README datoteke za vsak glavni razdelek  
- Nastavljena infrastruktura za prevajanje  
- Dodani slikovni viri in diagrami  


### Dokumentacija  
- Ustvarjen začetni README.md z pregledom učnega načrta  
- Dodana CODE_OF_CONDUCT.md in SECURITY.md  
- Nastavljen SUPPORT.md z navodili za pridobivanje pomoči  
- Ustvarjena predhodna struktura učnega vodiča  


## 15. april 2025  

### Načrtovanje in okvir  
- Prvotno načrtovanje učnega načrta MCP za začetnike  
- Določeni učni cilji in ciljna publika  
- Opredeljena struktura učnega načrta z 10 razdelki  
- Razvit konceptualni okvir za primere in študije primerov  
- Ustvarjeni začetni prototipni primeri za ključne koncepte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->