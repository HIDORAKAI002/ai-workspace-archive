# Zapisnik sprememb: MCP za začetnike - učni načrt

Ta dokument služi kot zapis vseh pomembnih sprememb, narejenih v učnem načrtu Model Context Protocol (MCP) za začetnike. Spremembe so dokumentirane v obratnem kronološkem vrstnem redu (najnovejše spremembe prve).

## 2. julij 2026

### Nova lekcija: Kandidat za izdajo specifikacije MCP 2026-07-28

Dodano pokritje prihajajočega kandidata za izdajo specifikacije MCP `2026-07-28` (napovedano 21. maja 2026; končna izdaja načrtovana za 28. julij 2026), povzeto iz [uradnega obvestila na blogu](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). Osnova učnega načrta ostaja **MCP Specifikacija 2025-11-25**, dokler nova različica ne izide, zato je to predstavljeno kot napoved prihodnjega razvoja, ne kot prepis obstoječih lekcij.

- **Novo**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — celotna lekcija, ki pokriva jedro protokola brez stanja (odstranitev rokovanja `initialize` in `Mcp-Session-Id`), nove usmerjevalne glave `Mcp-Method`/`Mcp-Name`, predpomnilniške metapodatke `ttlMs`/`cacheScope`, W3C Trace Context v `_meta`, formalni okvir Extensions (MCP aplikacije in nova razširitev Tasks), šest SEP-jev za utrjevanje avtorizacije, odpis korenin/Vzorčenja/Beležk ter prehod na polni JSON Schema 2020-12 za orodja.
- **Posodobljeno** s klici naprej, ki se povezujejo z novo lekcijo:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): opomba o različici protokola, razdelki Sampling/Roots/Logging/Tasks in "Kaj sledi"
  - [02-Security/README.md](./02-Security/README.md): klic na utrjevanje avtorizacije
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): klic na transport brez stanja
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): klic na opustitev vzorčenja
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): klic na opustitev beleženja in razširitev Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): klic na usmerjanje brez stanja/sesij
  - [README.md](./README.md): opomba "Pogled v prihodnost" v razdelku specifikacije in nova vnos `1.1` v tabeli učnih modulov
  - [study_guide.md](./study_guide.md): bullet naprej v pregledu osnovnih konceptov in datumska pripomba
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): opozorilo o transportni karti `mcp-session-id` pred modelom zahtevka brez stanja
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): opozorilo o modulu glede opustitev Root Contexts/Sampling in razširitve Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): klic na utrjevanje avtorizacije

## 24. junij 2026

### Nova lekcija: Uporaba MCP v aplikaciji Copilot

- Dodan [razdelek Orodja](./12-tooling/README.md).
- [MCP v aplikaciji Copilot](./12-tooling/01-copilot-app/README.md)

## 16. junij 2026

### Uskladitev specifikacije MCP & preverjanje vzorcev

Preverili učni načrt proti trenutni **MCP Specifikaciji 2025-11-25** in najnovejšim uradnim SDK-jem, nato odpravili preostale zastarele sklice na specifikacije in potrdili, da jedrni vzorci še vedno uspešno gradijo in tečejo.

#### Popravki verzije specifikacije (2025-06-18 / 2025-03-26 → 2025-11-25)

Posodobljena angleška vsebina, kjer je še trdila, da je starejša revizija specifikacije *trenutni/najnovejši* standard, in preusmerjeni so bili povezavi na kanonične poti specifikacije `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Posodobljen pasica "Trenutni standard", uvod, naslov temeljnih varnostnih načel, naslov obveznih zahtev, odsek Microsoft Entra ID, povezave do Virov & Virov, in zaključna varnostna opomba (8 povezav) na 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Posodobljena povezava do dodatnih virov in pasica "Trenutni standard" na 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Zamenjana zastarela povezava `2025-03-26` za varnost in zaupanje s trenutno stranjo najboljših varnostnih praks 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Posodobljena uradna povezava dokumentacije vzorčenja na 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Posodobljen sklic v sedanjiku "trenutne specifikacije MCP" in povezava do dodatnih virov na 2025-11-25 (zgodovinske opombe o opustitvi SSE so ohranjene zaradi natančnosti)

#### Preverjanje vzorcev glede na trenutne SDK-je

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` je pridobil `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` je uspel brez tipnih napak — obstoječi API-ji `McpServer`/`StdioServerTransport` ostajajo veljavni
- **Python (03-GettingStarted/01-first-server/solution/python)**: Preverjeno v izoliranem `.venv` z `mcp[cli]` (1.27.2); `py_compile` je uspel in `FastMCP.list_tools()` je pravilno vrnil orodji `add` in `subtract`
- Potrjeno, da vsi vzorci `@modelcontextprotocol/sdk` različična območja (`>=1.26.0` / `^1.26.0` / `^1.27.0`) brezhibno rešujejo trenutni `1.29.0` brez prekinitvenih sprememb API-jev

#### Uskladitev zatičev odvisnosti (zapiranje vrzeli verzij)

Nadgrajeni zastareli SDK zatiči tako, da vsak vzorec sledi trenutni izdaji MCP, v skladu s konvencijo na celotnem repozitoriju:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Nadgrajen `@modelcontextprotocol/sdk` iz `^1.8.0` na `>=1.26.0` in posodobljen zastareli opis paketa `"updated for MCP 2025-06-18"` v `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** in **lab4/code/github_mcp_server/pyproject.toml**: Nadgrajen točen zatič `mcp==1.23.0` na `mcp>=1.26.0`; znova ustvarjeni obe datoteki `uv.lock` (`uv lock`), da zaklepači rešujejo na trenutni `mcp 1.27.2` in ostajajo usklajeni z manifesti

#### Analiza vrzeli učnega načrta — Pokritost najnovejših značilnosti specifikacije

Preverjeno, da učni načrt že pokriva vse primitive, predstavljene/razširjene v MCP 2025-11-25, zato ni vrzeli v vsebini:
- **Sampling**: Lekcija 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Pridobivanje informacij (vključno z načinom URL)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Dokumentirano v 00-Introduction, 01-CoreConcepts in 05-AdvancedTopics/mcp-root-contexts
- **Tasks (eksperimentalne, dolgotrajne operacije)**: Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features
- **Oznake orodij** (`readOnlyHint` / `destructiveHint`): Dokumentirano v 01-CoreConcepts in 05-AdvancedTopics/mcp-protocol-features

### Utrjevanje varnosti & Odprava ranljivosti odvisnosti

Izveden popoln varnostni pregled vsakega manifesta odvisnosti in izvorne kode vzorcev, nato odpravljene vse javljene npm opozorilne ranljivosti in ena napaka na ravni kode. Po odpravi `npm audit` poroča o **0 ranljivostih** v vseh pregledanih imenikih.

#### Ranljivosti npm odvisnosti (prehodne) — Popravljeno

Pregledanih vseh 15 zaveznih `package-lock.json` datotek. Ranljivosti so bile omejene na prehodne odvisnosti, ki jih pridobivajo razvojna orodja MCP Inspector, OpenAI odjemalec in MCP SDK; vse so zdaj odpravljene brez prekinitve vzorcev:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** in **lab3/code/weather_mcp/inspector**: Nadgrajen `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), kar je razrešilo poročila za pripete `ajv`, `brace-expansion`, `diff`, `path-to-regexp` in `ws`. Dodan npm `overrides` vnos, ki prisili popravljeno različico `shell-quote@1.8.4` za odpravo preostale kritične ranljivosti, prinesene s `concurrently`; obe datoteki zaklepača znova ustvarjeni (zdaj brez ranljivosti)
- **03-GettingStarted/samples/typescript**: `npm audit fix` je posodobil prehodni `qs` (zmeren) na popravljeno izdajo
- **03-GettingStarted/samples/javascript**: `npm audit fix` je posodobil prehodni `hono` (zmeren) na popravljeno izdajo
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` je posodobil prehodni `form-data` (visok) na popravljeno izdajo
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generirana manjkajoča `package-lock.json`, da je projekt reproducibilen in pregledljiv (0 ranljivosti)

#### Popravilo varnosti na ravni kode (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Odstranjen `shell=True` iz orodja `open_in_vscode`. Prejšnji `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` je dovoljeval, da so metazaravnalci lupine v poti do mape interpretirani s strani `cmd.exe` (vektor za injekcijo ukazov). Zdaj neposredno zažene razrešeni `Code.exe` z mapo kot argumentom — brez lupine — kar je funkcionalno enakovredno in varno

#### Pregled Python odvisnosti

- Pregledani vsi Python nabori zahtev z `pip-audit`. `05-AdvancedTopics` in `03-GettingStarted/samples/python` niso pokazali **nič znanih ranljivosti** (njihova območja `mcp` / `httpx` / `pydantic` / `python-dotenv` se rešijo do trenutnih popravkov)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` je zaznal prehodno odvisnost **`werkzeug` 3.1.1** s tremi opozorili o DoS ranljivostih `safe_join` za Windows naprave — `CVE-2025-66221`, `CVE-2026-21860` in `CVE-2026-27199` (vse odpravljeno v 3.1.6). Dodan je bil ekspliciten varnostni zatič `werkzeug>=3.1.6`, da se popravek vključi; preverjeno, da se omejitev brezhibno uskladi z `chainlit` / `mcp` / `semantic-kernel` skladom

### Preimenovanje izdelka

Posodobljena je bila vsa vsebina učnega načrta, da odraža Microsoftovo preimenovanje izdelka:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Posodobljena povezava skupnosti Discord
- **AGENTS.md**: Posodobljena omemba Discord strežnika
- **README.md**: Posodobljene reference tehnološkega ekosistema
- **study_guide.md**: Posodobljene reference študij primerov
- **05-AdvancedTopics/README.md**: Posodobljen naslov in opis Modula 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Posodobljen naslov razdelka in opis
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Celoten naslov in vsebina modula posodobljena
- **05-AdvancedTopics/mcp-security-entra/README.md**: Posodobljen križni sklic
- **07-LessonsfromEarlyAdoption/README.md**: Posodobljene reference študij primerov
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Posodobljen naslov razdelka 9, značke in zmogljivosti
- **08-BestPractices/README.md**: Posodobljena povezava skupnosti Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Posodobljen omemba Discord kanala
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Posodobljen sklic na nameščanje modela
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Posodobljena tabela AI storitev
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Posodobljene reference virov

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension za VS Code

- **README.md**: Posodobljene glavne reference učnega načrta
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Posodobljen naslov modula, pregled in vsi naslovi modulov
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Posodobljen naslov, učni cilji, navodila za nastavitev in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Posodobljen naslov, učni cilji, tabela MCP gostiteljev in križne reference
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Posodobljen naslov, značke, predpogoji in viri
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Posodobljene reference Agent Builder in povezava za povratne informacije
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Posodobljeni predpogoji in reference razširitev

---

## 11. april 2026

### Nova lekcija, popravki dokumentacije in posodobitve odvisnosti

#### Dodana nova vsebina učnega načrta

**Modul 05 - Napredne teme**
- **Lekcija 5.17: Adversarial Multi-Agent Reasoning z MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nov obsežen vodič, ki pokriva vzorec zavračajočih razprav za sisteme z več agenti
  - Mermaid diagram arhitekture: dva agenta → deljeni MCP strežnik → zapis razprave → sodnik → presoja
  - Deljeni MCP strežnik orodij (`web_search` + `run_python`) implementiran v Pythonu in TypeScriptu
  - Nasprotni sistemski pozivi (ZA / PROTI / Sodnik) z izrecnimi zahtevami za uporabo orodij
  - Orkestrator razprave v Pythonu, TypeScriptu in C#, ki upravlja kroge in usmerja argumente
  - MCP `ClientSession` povezava za orkestrator neposredno do klicev orodij
  - Tabela uporabe primerov (odkrivanje halucinacij, modeliranje groženj, pregled oblikovanja API, preverjanje dejstev, izbira tehnologije)
  - Varnostni vidiki: izvajanje v varnem okolju, preverjanje klicev orodij, omejevanje hitrosti, revizijsko beleženje
  - Strukturirana vaja s tremi praktičnimi scenariji (pregled kode, odločanje o arhitekturi, moderiranje vsebine)

#### Popravki dokumentacije

**Modul 03 - Začetek**
- **05-stdio-server/README.md**: Popravljen nepopoln primer TypeScript stdio strežnika — dodana manjkajoča inicializacija prenosa (`new StdioServerTransport()`) in klic `server.connect(transport)`, da se ujema s primeri v Pythonu in .NET v isti sekciji
- **14-sampling/README.md**: Popravek tipkarske napake — popravljeno `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Posodobitve učnega načrta

**Glavni README.md**
- Dodana vnos 5.17 (Adversarial Multi-Agent Reasoning z MCP) v tabelo učnega načrta s povezavo do nove lekcije

**05-AdvancedTopics/README.md**
- Dodana vrstica Lekcije 5.17 v tabelo lekcij

**study_guide.md**
- Dodana tema Adversarial Multi-Agent Reasoning v miselno karto in opis v naprednih temah

#### Popravki kode in varnosti

**Modul 05 - Nasprotujoči agenti (`mcp-adversarial-agents`)**
- **Popravek varnosti — injekcija ukazov**: Zamenjana `execSync` shell interpolacija z `execFile` + `promisify` v orodju `run_python` v TypeScriptu, s čimer je odstranjen vektor injekcij ukazov (koda, ki jo nadzoruje LLM, se zdaj posreduje kot dobesedni element argv brez vključenosti shel-la)
- **Povezava orodja MCP**: Posodobljen Python orkestrator razprave za uporabo `AsyncAnthropic` klienta (nadomestil pa je blokirajoči sinhroni `Anthropic`), predaja živo `ClientSession` neposredno vsaki potezi agenta, pridobivanje definicij orodij preko `session.list_tools()` vsako potezo in razpošiljanje blokov `tool_use` preko `session.call_tool()` v zanki dokler model ne izda končnega besedilnega odziva

#### Posodobitve odvisnosti

- Povišan `hono` na 4.12.12 v več paketih (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Povišan `@hono/node-server` iz 1.19.11 na 1.19.13 v TypeScript paketih
- Povišan `cryptography` s 46.0.5 na 46.0.7 v Python paketih (10-StreamliningAIWorkflows laboratoriji 3 in 4)
- Povišan `lodash` s 4.17.23 na 4.18.1 v inšpektorju 10-StreamliningAIWorkflows

#### Prevodi

- Usklajeni prevodi za več kot 48 jezikov z zadnjimi spremembami iz vira (i18n posodobitev)

---

## 5. februar 2026

### Izboljšave preverjanja in navigacije v celotnem repozitoriju

#### Dodana nova vsebina učnega načrta

**Modul 03 - Začetek**
- **12-mcp-hosts/README.md**: Nov obsežen vodič za nastavitev MCP gostiteljev
  - Primeri konfiguracij za Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Predloge konfiguracij v JSON za vse glavne gostitelje
  - Tabela primerjave tipov transporta (stdio, SSE/HTTP, WebSocket)
  - Reševanje pogostih težav s povezavo
  - Najboljše varnostne prakse za konfiguracijo gostiteljev

- **13-mcp-inspector/README.md**: Nov vodič za odpravljanje napak MCP Inspektorja
  - Metode namestitve (npx, globalni npm, iz vira)
  - Povezovanje na strežnike prek stdio in HTTP/SSE
  - Testiranje orodij, virov in predlogov delovnih tokov
  - Integracija z VS Code prek MCP Inspektorja
  - Pogosti scenariji odpravljanja napak z rešitvami

**Modul 04 - Praktična implementacija**
- **pagination/README.md**: Novi vodič za implementacijo paginacije
  - Vzorci paginacije na osnovi kazalcev v Pythonu, TypeScriptu, Javi
  - Obravnava paginacije na strani odjemalca
  - Strategije zasnove kazalcev (neprozoren proti strukturiranemu)
  - Priporočila za optimizacijo zmogljivosti

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Globok vpogled v nove funkcije protokola
  - Implementacija obvestil o napredku
  - Vzorci prekinjanja zahtevkov
  - Predloge virov z vzorci URI
  - Upravljanje življenjskega cikla strežnika
  - Nadzor nivoja beleženja
  - Vzorci ravnanja z napakami s kodami JSON-RPC

#### Popravki navigacije (posodobljenih več kot 24 datotek)

**Glavni moduli README**
 Zdaj povezave do prve lekcije IN naslednjega modula

**Poddatoteke 02-Security**
- Vseh 5 dodatnih varnostnih dokumentov ima zdaj navigacijo »Kaj sledi«:

**Datoteke 09-CaseStudy**
- Vse datoteke študij primerov imajo zdaj zaporedno navigacijo:

**Laboratoriji 10-StreamliningAI**
Dodana sekcija »Kaj sledi« v pregled modula 10 in modul 11

#### Popravki kode in vsebine

**Posodobitve SDK in odvisnosti**
Popravljena prazna različica openai na `^4.95.0`
Posodobljen SDK z `^1.8.0` na `>=1.26.0`
Posodobljene MCP verzije na `>=1.26.0`

**Popravki kode**
Popravljena neveljavna različica modela `gpt-4o-mini` v `gpt-4.1-mini`

**Popravki vsebine**
Popravljena prekinjena povezava `READMEmd` → `README.md`, popravljena glava učnega načrta `Module 1-3` → `Module 0-3`, popravljena pot, ki razlikuje velike in male črke
Odstranjena poškodovana dvojna vsebina študije primera 5

**Izboljšave smernic za začetnike**
Dodani ustrezen uvod, učni cilji in predpogoji za začetnike

#### Posodobitve učnega načrta

**Glavni README.md**
- Dodani vnosi 3.12 (MCP gostitelji), 3.13 (MCP inspektor), 4.1 (Paginacija), 5.16 (Funkcije protokola) v tabelo učnega načrta

**README modulov**
Dodani lekciji 12 in 13 na seznam lekcij
Dodan odsek Praktični vodiči s povezavo do paginacije
Dodani lekciji 5.15 (Lastni transport) in 5.16 (Funkcije protokola)

**study_guide.md**
- Posodobljena miselna mapa z vsemi novimi temami: nastavitve gostiteljev MCP, MCP inspektor, strategije paginacije, globok vpogled v funkcije protokola

## 28. januar 2026

### Pregled skladnosti s specifikacijo MCP 2025-11-25

#### Izboljšave osnovnih pojmov (01-CoreConcepts/)
- **Nov klient primitiven tip - Roots**: Dodana obsežna dokumentacija o klientu primitiv Roots, ki strežnikom omogoča razumevanje meja datotečnih sistemov in dostopnih dovoljenj
- **Oznake orodij**: Dodana dokumentacija o vedenjskih oznakah orodij (`readOnlyHint`, `destructiveHint`) za boljše odločitve o izvajanju orodij
- **Klic orodij pri Sampling-u**: Posodobljena dokumentacija Sampling, ki vključuje parametra `tools` in `toolChoice` za izvedbo klicev orodij, ki jih določa model med Sampling zahtevki
- **URL način pridobivanja**: Dodana dokumentacija o URL osnovanem pridobivanju za zunanje spletne interakcije, ki jih začne strežnik
- **Oprave (eksperimentalno)**: Dodan nov odsek o eksperimentalni funkciji Oprave za trajne ovojnice izvajanja in odloženo pridobivanje rezultatov
- **Podpora ikonam**: Omenjeno, da orodja, viri, predloge virov in predlogi zdaj lahko vsebujejo ikone kot dodatne metapodatke

#### Posodobitve dokumentacije
- **README.md**: Dodana referenca verzije MCP Specifikacije 2025-11-25 in razlaga verzioniranja po datumu
- **study_guide.md**: Posodobljena karta učnega načrta, ki vključuje Oprave in oznake orodij v sekciji osnovnih pojmov; posodobljena časovna oznaka dokumenta

#### Preverjanje skladnosti specifikacije
- **Različica protokola**: Preverjene vse reference dokumentacije, ki ustrezajo trenutni MCP Specifikaciji 2025-11-25
- **Usklajenost arhitekture**: Potrjena pravilnost dokumentacije dvoplastne arhitekture (plast podatkov + plast transporta)
- **Dokumentacija primitivov**: Validirani strežniški primitivni tipi (Viri, Predlogi, Orodja) in klientski primitivni tipi (Sampling, Pridobivanje, Beleženje, Roots)
- **Transportni mehanizmi**: Preverjena pravilnost dokumentacije STDIO in Streamable HTTP transporta
- **Varnostne smernice**: Potrjena skladnost z aktualnimi najboljšimi varnostnimi praksami MCP

#### Glavne funkcije MCP 2025-11-25 dokumentirane
- **Odkrivanje OpenID Connect**: Odkritje avtentikacijskega strežnika prek OIDC
- **Metapodatki OAuth Client ID**: Priporočeni mehanizem registracije klienta
- **JSON Shema 2020-12**: Privzeti dialekt za definicije MCP shem
- **Sistemi plastenja SDK**: Formalizirane zahteve za podporo in vzdrževanje funkcij SDK
- **Struktura upravljanja**: Formalizirane delovne skupine in interesne skupine v MCP upravljanju

### Velika posodobitev varnostne dokumentacije (02-Security/)

#### Integracija MCP varnostnega vrha delavnice Sherpa
- **Nov praktični vir usposabljanja**: Dodana obsežna integracija z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) v celotnem varnostnem dokumentu
- **Pokrivanje poti ekspedicije**: Dokumentiran celoten napredek od osnovnega tabora do vrha
- **Usklajenost z OWASP**: Vse varnostne smernice so zdaj ujemajoče se z OWASP MCP Azure Security Guide tveganji

#### Integracija OWASP MCP Top 10
- **Nov odsek**: Dodana tabela OWASP MCP Top 10 varnostnih tveganj z Azure krpnimi ukrepi v glavni varnostni README
- **Tveganjem prilagojena dokumentacija**: Posodobljen mcp-security-controls-2025.md z OWASP MCP tveganjskimi referencami za vsako varnostno področje
- **Referenčna arhitektura**: Povezana z referenčno arhitekturo in vzorci implementacije iz OWASP MCP Azure Security Guide

#### Posodobljene varnostne datoteke
- **README.md**: Dodan pregled delavnica Sherpa, tabela poti ekspedicije, povzetek OWASP MCP Top 10 tveganj in sekcija praktičnega usposabljanja
- **mcp-security-controls-2025.md**: Posodobljen naslov na februar 2026, dodane OWASP tveganjske reference (MCP01-MCP08), popravljena neskladnost verzije specifikacije
- **mcp-security-best-practices-2025.md**: Dodana sekcija virov Sherpa in OWASP, posodobljena časovna oznaka
- **mcp-best-practices.md**: Dodana sekcija praktičnega usposabljanja s povezavami na Sherpa in OWASP
- **azure-content-safety-implementation.md**: Dodana OWASP MCP06 referenca, uskladitev s Sherpa Camp 3 in dodatna sekcija virov

#### Dodane nove povezave do virov
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Posamezne OWASP MCP strani tveganj (MCP01-MCP10)

### Skladnost specifikacije MCP 2025-11-25 v celotnem učnem načrtu

#### Modul 03 - Začetek
- **Dokumentacija SDK**: Dodan Go SDK na uradni seznam SDK; posodobljene vse reference SDK za skladnost s specifikacijo MCP 2025-11-25
- **Razjasnjen transport**: Posodobljeni opisi transporta STDIO in HTTP Streaming z izrecnimi referencami specifikacije

#### Modul 04 - Praktična implementacija
- **Posodobitve SDK**: Dodan Go SDK; posodobljen seznam SDK z referenco specifikacije
- **Specifikacija avtorizacije**: Posodobljena povezava do MCP avtorizacijske specifikacije na trenutno različico 2025-11-25

#### Modul 05 - Napredne teme
- **Nove funkcije**: Dodana opomba o novih funkcijah MCP specifikacije 2025-11-25 (Oprave, Oznake orodij, URL način pridobivanja, Roots)
- **Varnostni viri**: Dodane povezave do OWASP MCP Top 10 in Sherpa delavnice kot dodatne reference

#### Modul 06 - Prispevki skupnosti
- **Seznam SDK**: Dodana Swift in Rust SDK; posodobljena povezava do specifikacije na 2025-11-25
- **Referenca specifikacije**: Posodobljena MCP specifikacijska povezava na neposredno URL specifikacije

#### Modul 07 - Učinki zgodnje uporabe

- **Posodobitve virov**: Dodana povezava do MCP specifikacije 2025-11-25 in OWASP MCP Top 10 kot dodatni viri

#### Modul 08 - Najboljše prakse
- **Verzija specifikacije**: Posodobljen MCP referenčni dokument na 2025-11-25
- **Viri za varnost**: Dodan OWASP MCP Top 10 in Sherpa delavnica med dodatne reference

#### Modul 10 - Poenostavitev AI potekov dela
- **Posodobitev značke**: Spremenjena MCP značka verzije iz verzije SDK (1.9.3) na verzijo specifikacije (2025-11-25)
- **Povezave virov**: Posodobljena MCP specifikacija; dodan OWASP MCP Top 10

#### Modul 11 - MCP strežniški praktični laboratoriji
- **Referenca specifikacije**: Posodobljena povezava MCP specifikacije na verzijo 2025-11-25
- **Viri za varnost**: Dodan OWASP MCP Top 10 med uradne vire

## 18. december 2025

### Posodobitev varnostne dokumentacije - MCP specifikacija 2025-11-25

#### Najboljše varnostne prakse MCP (02-Security/mcp-best-practices.md) - Posodobitev verzije specifikacije
- **Posodobitev verzije protokola**: Posodobljena referenca na najnovejšo MCP specifikacijo 2025-11-25 (izdaja 25. novembra 2025)
  - Posodobljene vse reference verzije specifikacije s 2025-06-18 na 2025-11-25
  - Posodobljeni datumski podatki dokumentov z 18. avgusta 2025 na 18. decembra 2025
  - Preverjene vse URL povezave specifikacije kažejo na aktualno dokumentacijo
- **Preverjanje vsebine**: Obsežno preverjanje varnostnih najboljših praks glede na najnovejše standarde
  - **Microsoftove varnostne rešitve**: Preverjena aktualna terminologija in povezave za Prompt Shields (prej "odkrivanje tveganja jailbreak"), Azure Content Safety, Microsoft Entra ID in Azure Key Vault
  - **OAuth 2.1 varnost**: Potrjeno usklajevanje z najnovejšimi varnostnimi praksami OAuth
  - **OWASP standardi**: Preverjene reference OWASP Top 10 za LLM ostajajo aktualne
  - **Azure storitve**: Preverjene vse Microsoft Azure dokumentacijske povezave in najboljše prakse
- **Uskladitev s standardi**: Vsi navedeni varnostni standardi so potrjeni kot aktualni
  - NIST AI okvir za upravljanje tveganj
  - ISO 27001:2022
  - Najboljše varnostne prakse OAuth 2.1
  - Okviri za varnost in skladnost Azure
- **Viri za implementacijo**: Preverjene vse povezave in viri vodnikov za implementacijo
  - Avtentikacijski vzorci Azure API Management
  - Vodniki za integracijo Microsoft Entra ID
  - Upravljanje skrivnosti Azure Key Vault
  - DevSecOps cevovodi in rešitve za spremljanje

### Zagotavljanje kakovosti dokumentacije
- **Usklajenost s specifikacijo**: Zagotovljeno usklajevanje vseh obveznih MCP varnostnih zahtev (MORA/MORA NE) z najnovejšo specifikacijo
- **Aktualnost virov**: Preverjene vse zunanje povezave do Microsoft dokumentacije, varnostnih standardov in implementacijskih vodičev
- **Pokritost najboljših praks**: Potrjena široka pokritost avtentikacije, avtorizacije, groženj specifičnih za AI, varnosti dobavne verige in podjetniških vzorcev

## 6. oktober 2025

### Razširitev poglavja Začetek – Napredna uporaba strežnika in preprosta avtentikacija

#### Napredna uporaba strežnika (03-GettingStarted/10-advanced)
- **Dodano novo poglavje**: Predstavljen celovit vodič za napredno uporabo MCP strežnika, ki zajema tako običajne kot nizkonivojske strežniške arhitekture.
  - **Običajni vs. nizkonivojski strežnik**: Podroben primerjava in primeri kode v Python in TypeScript za oba pristopa.
  - **Oblikovanje na osnovi upravljavcev**: Razlaga upravljanja orodij/virov/pozivov na osnovi upravljavcev za razširljive, prilagodljive strežniške implementacije.
  - **Praktični vzorci**: Resnični primeri, kjer so nizkonivojski strežniški vzorci koristni za napredne funkcije in arhitekturo.

#### Preprosta avtentikacija (03-GettingStarted/11-simple-auth)
- **Dodano novo poglavje**: Korak za korakom vodič za implementacijo preproste avtentikacije v MCP strežnikih.
  - **Pojmi avtentikacije**: Jasna razlaga avtentikacije v primerjavi z avtorizacijo ter ravnanja z overitvenimi podatki.
  - **Osnovna implementacija avtentikacije**: Vzorci avtentikacije na osnovi vmesnega sloja (middleware) v Pythonu (Starlette) in TypeScriptu (Express), z vzorci kode.
  - **Prehod k napredni varnosti**: Navodila za začetek s preprosto avtentikacijo in napredovanje do OAuth 2.1 in RBAC, z referencami na napredne varnostne module.

Te dodatke nudijo praktična, praktična navodila za gradnjo robustnejših, varnejših in prilagodljivejših implementacij MCP strežnikov, ki povezujejo temeljne pojme z naprednimi proizvodnimi vzorci.

## 29. september 2025

### MCP strežniški laboratoriji z integracijo baz podatkov - Celovit praktični učni potek

#### 11-MCPServerHandsOnLabs - Nova popolna učna pot integracije baz podatkov
- **Popolnih 13 laboratorijev**: Dodan obsežen praktični učni načrt za gradnjo proizvodno pripravljenih MCP strežnikov z integracijo PostgreSQL baze podatkov
  - **Realistična implementacija**: Primer uporabe za Zava Retail analitiko, ki prikazuje podjetniške vzorce
  - **Strukturirana učna pot**:
    - **Laboratoriji 00-03: Osnove** - Uvod, jedrna arhitektura, varnost & multi-uporabniki, nastavitev okolja
    - **Laboratoriji 04-06: Gradnja MCP strežnika** - Oblikovanje baze podatkov & shema, implementacija MCP strežnika, razvoj orodij  
    - **Laboratoriji 07-09: Napredne funkcije** - Integracija semantičnega iskanja, testiranje & odpravljanje napak, integracija VS Code
    - **Laboratoriji 10-12: Proizvodnja & najboljše prakse** - Strategije uvajanja, spremljanje & opazovanje, najboljše prakse & optimizacija
  - **Podjetniške tehnologije**: FastMCP okvir, PostgreSQL z pgvector, Azure OpenAI vključki, Azure Container Apps, Application Insights
  - **Napredne funkcije**: Varnost na ravni vrstic (RLS), semantično iskanje, multi-tenant dostop do podatkov, vektorske vključke, spremljanje v realnem času

#### Standardizacija terminologije - pretvorba modula v laboratorij
- **Obsežna posodobitev dokumentacije**: Sistematično posodobljeni vsi README dokumenti v 11-MCPServerHandsOnLabs z uporabo terminologije "Laboratorij" namesto "Modul"
  - **Naslovi odsekov**: Posodobljeno "Kaj ta modul pokriva" v "Kaj ta laboratorij pokriva" v vseh 13 laboratorijih
  - **Opis vsebine**: Spremenjeno "Ta modul ponuja..." v "Ta laboratorij ponuja..." v celotni dokumentaciji
  - **Učne cilje**: Posodobljeno "Do konca tega modula..." v "Do konca tega laboratorija..."
  - **Navigacijske povezave**: Pretvorjene vse reference "Modul XX:" v "Laboratorij XX:" v medsebojnih referencah in navigaciji
  - **Sledenje dokončanju**: Posodobljeno "Po dokončanju tega modula..." v "Po dokončanju tega laboratorija..."
  - **Ohranjene tehnične reference**: Ohranjene Python module reference v konfiguracijskih datotekah (npr. `"module": "mcp_server.main"`)

#### Izboljšave učnega priročnika (study_guide.md)
- **Vizualna karta učnega načrta**: Dodan nov odsek "11. Laboratoriji integracije baz podatkov" s celovito vizualizacijo strukture laboratorijev
- **Struktura repozitorija**: Posodobljeno z desetih na enajst glavnih poglavij z podrobnim opisom 11-MCPServerHandsOnLabs
- **Navodila za učno pot**: Izboljšane navigacijske smernice za pokritje odsekov 00-11
- **Pokritost tehnologij**: Dodani podrobnosti o FastMCP, PostgreSQL in integraciji Azure storitev
- **Učni rezultati**: Poudarek na razvoju proizvodno pripravljenih strežnikov, vzorcih integracije baz podatkov in podjetniški varnosti

#### Izboljšave strukture glavnega README
- **Terminologija na osnovi laboratorijev**: Posodobljen glavni README.md v 11-MCPServerHandsOnLabs za dosledno uporabo strukture "Laboratorij"
- **Organizacija učne poti**: Jasna progresija od osnovnih konceptov do napredne implementacije do proizvodnega uvajanja
- **Osredotočenost na realne primere**: Poudarek na praktičnem, ročnem učenju z vzorci in tehnologijami podjetniške ravni 

### Izboljšave kakovosti in skladnosti dokumentacije
- **Poudarek na praktičnem učenju**: Krepljeno praktično, laboratorijsko usmerjeno pristop skozi celotno dokumentacijo
- **Poudarek na podjetniških vzorcih**: Izpostavljene proizvodno pripravljene implementacije in razmisleki o varnosti v podjetjih
- **Integracija tehnologije**: Obsežna pokritost sodobnih Azure storitev in vzorcev integracije AI
- **Progresija učenja**: Jasna, strukturirana pot od osnovnih konceptov do proizvodnega uvajanja

## 26. september 2025

### Izboljšave študij primerov - GitHub MCP Registry integracija

#### Študije primerov (09-CaseStudy/) - Osredotočenost na razvoj ekosistema
- **README.md**: Obsežna razširitev z obsežno študijo primera GitHub MCP Registry
  - **Študija primera GitHub MCP Registry**: Nova obsežna študija primera, ki preučuje lansiranje GitHub MCP Registry septembra 2025
    - **Analiza problema**: Podroben pregled fragmentacije odkrivanja in uvajanja MCP strežnikov
    - **Arhitektura rešitve**: Centraliziran pristop GitHub registra z enostavno namestitvijo z enim klikom v VS Code
    - **Poslovni vpliv**: Merljive izboljšave uvajanja razvijalcev in produktivnosti
    - **Strateška vrednost**: Osredotočenost na modularno uvajanje agentov in interoperabilnost orodij
    - **Razvoj ekosistema**: Pozicioniranje kot temeljna platforma za integracijo agentnih sistemov
  - **Izboljšana struktura študije primera**: Posodobljene vse sedem študij primerov z dosledno obliko in obsežnimi opisi
    - Azure AI Travel Agents: Poudarek na večagentni orkestraciji
    - Azure DevOps integracija: Osredotočenost na avtomatizacijo potekov dela
    - Pridobivanje dokumentacije v realnem času: Implementacija Python konzolnega odjemalca
    - Interaktivni generator študijskega načrta: Verižna spletna aplikacija Chainlit
    - Dokumentacija v urejevalniku: Integracija VS Code in GitHub Copilot
    - Azure API Management: Podjetniški vzorci integracije API-jev
    - GitHub MCP Registry: Razvoj ekosistema in skupnostne platforme
  - **Obsežen zaključek**: Prenovljen zaključni odsek, ki poudarja sedem študij primerov prek več dimenzij implementacije MCP
    - Podjetniška integracija, večagentna orkestracija, produktivnost razvijalcev
    - Razvoj ekosistema, kategorizacija za izobraževalne aplikacije
    - Izboljšani vpogledi v arhitekturne vzorce, strategije implementacije in najboljše prakse
    - Poudarek na MCP kot zrelem, proizvodno pripravljenem protokolu

#### Posodobitve učnega priročnika (study_guide.md)
- **Vizualna karta učnega načrta**: Posodobljen miselni zemljevid, ki vključuje GitHub MCP Registry v razdelku Študije primerov
- **Opis študij primerov**: Izboljšan iz generičnih opisov v podroben razčlenjen pregled sedmih obsežnih študij primerov
- **Struktura repozitorija**: Posodobljen odsek 10, ki odraža obsežno pokritost študij primerov s specifičnimi implementacijskimi podrobnostmi
- **Integracija sprememb**: Dodan vnos 26. septembra 2025, ki dokumentira dodajanje GitHub MCP Registry in izboljšave študij primerov
- **Posodobitve datumov**: Posodobljen časovni žig v nogi dokumenta, ki odraža najnovejšo revizijo (26. september 2025)

### Izboljšave kakovosti dokumentacije
- **Izboljšana skladnost**: Standardizirana oblika in struktura študij primerov v vseh sedmih primerih
- **Obsežna pokritost**: Študije primerov zdaj zajemajo podjetniške, produktivnostne in razvojne ekosisteme
- **Strateško pozicioniranje**: Okrepljen poudarek na MCP kot temeljni platformi za uvajanje agentnih sistemov
- **Integracija virov**: Posodobljeni dodatni viri, ki vključujejo povezavo GitHub MCP Registry

## 15. september 2025

### Razširitev naprednih tem - Prilagojeni transporti in inženiring konteksta

#### Prilagojeni MCP transporti (05-AdvancedTopics/mcp-transport/) - Nov vodič za napredno implementacijo
- **README.md**: Popoln vodič za implementacijo prilagojenih MCP transportnih mehanizmov
  - **Azure Event Grid transport**: Celovita implementacija strežnika brez strežnika, ki temelji na dogodkih
    - Primeri v C#, TypeScript in Python z integracijo Azure Functions
    - Vzorci arhitekture na osnovi dogodkov za razširljive MCP rešitve
    - Sprejemniki webhook in upravljanje sporočil na potisni osnovi
  - **Azure Event Hubs transport**: Implementacija transporta z visokim pretokom toka
    - Zmožnosti pretakanja v realnem času za scenarije z nizko zakasnitvijo
    - Strategije particioniranja in upravljanje kontrolnih točk
    - Seriiranje sporočil in optimizacija zmogljivosti
  - **Podjetniški vzorci integracije**: Proizvodno pripravljeni arhitekturni primeri
    - Razpršena MCP obdelava čez več Azure Functions
    - Hibridne transportne arhitekture, ki združujejo več tipov transporta
    - Strategije trajnosti sporočil, zanesljivosti in upravljanja napak
  - **Varnost in spremljanje**: Integracija Azure Key Vaulta in vzorci opazovanja
    - Overjanje s upravljano identiteto in dostop z najmanj priviliegiji
    - Telemetrija Application Insights in spremljanje zmogljivosti
    - Prekinitveni mehanizmi in vzorci odpornosti na napake
  - **Okviri za testiranje**: Celovite strategije testiranja prilagojenih transportov
    - Enotno testiranje s testnimi dvojniki in okvirji za lažno izvajanje
    - Integracijsko testiranje z Azure Test Containers
    - Premisleki za testiranje zmogljivosti in obremenitve

#### Inženiring konteksta (05-AdvancedTopics/mcp-contextengineering/) - Nastajajoča disciplina AI
- **README.md**: Celovita raziskava inženiringa konteksta kot rastočega področja
  - **Temeljna načela**: Popolna delitev konteksta, zavedanje odločitev o dejanjih in upravljanje oken konteksta
  - **Uskladitev s protokolom MCP**: Kako oblikovanje MCP obravnava izzive inženiringa konteksta
    - Omejitve oken konteksta in progresivne strategije nalaganja
    - Določanje relevantnosti in dinamično pridobivanje konteksta
    - Večmodalno rokovanje s kontekstom in varnostni premisleki
  - **Pristopi implementacije**: Enoviti proti večagentnim arhitekturam
    - Razbijanje konteksta na dele in tehnike prioritetizacije
    - Progresivno nalaganje konteksta in strategije stiskanja
    - Plasti pristopov konteksta in optimizacija pridobivanja
  - **Okvir merjenja**: Nove metrike za ocenjevanje učinkovitosti konteksta
    - Učinkovitost vnosa, zmogljivost, kvaliteta in uporabniška izkušnja
    - Eksperimentalni pristopi k optimizaciji konteksta
    - Analiza napak in metodologije izboljšav

#### Posodobitve navigacije učnega načrta (README.md)
- **Izboljšana struktura modula**: Posodobljena preglednica učnega načrta za vključitev novih naprednih tem
  - Dodana Context Engineering (5.14) in Custom Transport (5.15)
  - Dosledna oblika in navigacijske povezave v vseh modulih
  - Posodobljeni opisi, da odražajo vsebinski obseg

### Izboljšave strukture imenikov
- **Standardizacija poimenovanja**: Preimenovan "mcp transport" v "mcp-transport" za skladnost z ostalimi mapami naprednih tem
- **Organizacija vsebine**: Vse mape 05-AdvancedTopics zdaj sledijo skladnemu vzorcu imenovanja (mcp-[tema])

### Izboljšave kakovosti dokumentacije
- **Uskladitev MCP specifikacije**: Vsa nova vsebina se sklicuje na trenutno MCP specifikacijo 2025-06-18
- **Primeri v več jezikih**: Celoviti primeri kode v C#, TypeScript in Python

- **Poudarek na podjetjih**: Vzorec proizvodnje in integracija v oblak Azure skozi celotno strukturo
- **Vizualna dokumentacija**: Mermaid diagrami za arhitekturo in vizualizacijo toka

## 18. avgust 2025

### Celovita posodobitev dokumentacije - Standardi MCP 2025-06-18

#### Najboljše varnostne prakse MCP (02-Security/) - Popolna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Popolna predelava usklajena s specifikacijo MCP 2025-06-18
  - **Obvezne zahteve**: Dodane eksplicitne zahteve MORA/MORA NE iz uradne specifikacije z jasnimi vizualnimi označevalci
  - **12 osnovnih varnostnih praks**: Prestrukturirano iz 15-članskega seznama v celovite varnostne domene
    - Varnost žetonov in preverjanje pristnosti z integracijo zunanjega ponudnika identitete
    - Upravljanje sej in varnost prenosa s kriptografskimi zahtevami
    - Varstvo pred grožnjami, specifičnimi za AI, z integracijo Microsoft Prompt Shields
    - Nadzor dostopa in dovoljenj z načelom najmanjših privilegijev
    - Varnost vsebin in nadzor z integracijo Azure Content Safety
    - Varnost dobavne verige s celovitim preverjanjem komponent
    - Varnost OAuth in preprečevanje zmede odposlaneca z izvedbo PKCE
    - Odziv na incidente in okrevanje z avtomatiziranimi zmogljivostmi
    - Skladnost in upravljanje s prilagoditvijo predpisom
    - Napredni varnostni nadzori z arhitekturo ničelnega zaupanja
    - Integracija Microsoftovega varnostnega ekosistema s celovitimi rešitvami
    - Neprestana varnostna evolucija z adaptivnimi praksami
  - **Microsoftove varnostne rešitve**: Izboljšana navodila za integracijo Prompt Shields, Azure Content Safety, Entra ID in GitHub Advanced Security
  - **Viri za izvedbo**: Kategorizirane celovite povezave do virov po uradni dokumentaciji MCP, Microsoftovih varnostnih rešitvah, varnostnih standardih in vodičih za izvedbo

#### Napredni varnostni nadzori (02-Security/) - Izvedba za podjetja
- **MCP-SECURITY-CONTROLS-2025.md**: Popolna prenova z varnostnim okvirjem stopnje podjetja
  - **9 celovitih varnostnih domen**: Razširjeno iz osnovnih nadzorov v podroben okvir za podjetja
    - Napredno preverjanje pristnosti in avtorizacija z integracijo Microsoft Entra ID
    - Varnost žetonov in kontrole proti prehodu z obsežno validacijo
    - Nadzori varnosti sej s preprečevanjem prevzemov
    - Varnostni nadzori, specifični za AI, z zaščito pred injekcijo pozivov in zastrupitvijo orodij
    - Preprečevanje napadov z zmedo odposlaneca z varnostjo OAuth proxyja
    - Varnost izvajanja orodij s peskovnikom in izolacijo
    - Nadzori varnosti dobavne verige s preverjanjem odvisnosti
    - Nadzorni in detekcijski nadzori z integracijo SIEM
    - Odziv na incidente in okrevanje z avtomatiziranimi zmogljivostmi
  - **Primeri izvedbe**: Dodani podrobni YAML konfiguracijski bloki in primeri kode
  - **Integracija Microsoftovih rešitev**: Celovito pokritje varnostnih storitev Azure, GitHub Advanced Security in upravljanja identitete na ravni podjetja

#### Napredne varnostne teme (05-AdvancedTopics/mcp-security/) - Izvedba pripravljena za produkcijo
- **README.md**: Popolna predelava za varnostno izvedbo podjetja
  - **Uskladitev s trenutno specifikacijo**: Posodobljeno na MCP Specifikacijo 2025-06-18 z obveznimi varnostnimi zahtevami
  - **Izboljšano preverjanje pristnosti**: Integracija Microsoft Entra ID s celovitimi primeri .NET in Java Spring Security
  - **Integracija varnosti AI**: Izvedba Microsoft Prompt Shields in Azure Content Safety z podrobnimi primeri v Pythonu
  - **Napredna omilitev groženj**: Celoviti primeri izvajanja za
    - Preprečevanje napada z zmedo odposlaneca z PKCE in validacijo soglasja uporabnika
    - Preprečevanje prehoda žetonov z validacijo občinstva in varenim upravljanjem žetonov
    - Preprečevanje prevzema seje s kriptografskim vezanjem in vedenjsko analizo
  - **Integracija varnosti podjetja**: Nadzor Azure Application Insights, tokovi odkrivanja groženj in varnost dobavne verige
  - **Kontrolni seznam izvedbe**: Jasno ločeni obvezni in priporočeni varnostni nadzori s koristmi Microsoftovega varnostnega ekosistema

### Kakovost dokumentacije in uskladitev standardov
- **Specifikacijske reference**: Posodobljene vse reference na trenutno MCP Specifikacijo 2025-06-18
- **Microsoftov varnostni ekosistem**: Izboljšano vodenje integracije skozi celotno varnostno dokumentacijo
- **Praktična izvedba**: Dodani podrobni primeri kode v .NET, Javi in Pythonu z vzorci za podjetja
- **Organizacija virov**: Celovita kategorizacija uradne dokumentacije, varnostnih standardov in vodičev za izvedbo
- **Vizualni označevalci**: Jasna označitev obveznih zahtev v primerjavi s priporočili


#### Osnovni koncepti (01-CoreConcepts/) - Popolna modernizacija
- **Posodobitev različice protokola**: Posodobljeno navajanje na trenutno MCP Specifikacijo 2025-06-18 s formatom datuma (LLLL-MM-DD)
- **Izboljšave arhitekture**: Izboljšani opisi gostiteljev, odjemalcev in strežnikov za odražanje trenutnih arhitekturnih vzorcev MCP
  - Gostitelji so zdaj jasno opredeljeni kot AI aplikacije, ki usklajujejo več MCP odjemalskih povezav
  - Odjemalci opisani kot povezovalci protokolov, ki vzdržujejo en-na-en odnose s strežniki
  - Strežniki izboljšani s scenariji lokalne in oddaljene namestitve
- **Prenova primitivov**: Popolna prenova strežniških in odjemalskih primitivov
  - Strežniški primitiv: Viri (viri podatkov), Pozivi (predloge), Orodja (izvedljive funkcije) s podrobnimi pojasnili in primeri
  - Odjemalski primitiv: Vzorec (izvedba LLM), Pridobivanje (vnos uporabnika), Beleženje (odpravljanje napak/nadzor)
  - Posodobljeno z aktualnimi metodami odkrivanja (`*/list`), pridobivanja (`*/get`) in izvajanja (`*/call`)
- **Arhitektura protokola**: Uveden dvoslojni arhitekturni model
  - Podatkovni sloj: Osnova JSON-RPC 2.0 z upravljanjem življenjskega cikla in primitivov
  - Transportni sloj: STDIO (lokalno) in Streamable HTTP s SSE (oddaljeno) transportnimi mehanizmi
- **Varnostni okvir**: Celovita varnostna načela vključno z eksplicitnim soglasjem uporabnika, zaščito zasebnosti podatkov, varnostjo izvajanja orodij in varnostjo transportnega sloja
- **Vzorce komunikacije**: Posodobljena sporočila protokola za prikaz inicializacije, odkrivanja, izvajanja in obvestil
- **Primeri kode**: Osveženi večjezični primeri (.NET, Java, Python, JavaScript) za odražanje trenutnih vzorcev MCP SDK

#### Varnost (02-Security/) - Celovita varnostna prenova  
- **Uskladitev s standardi**: Polna uskladitev z varnostnimi zahtevami MCP Specifikacije 2025-06-18
- **Evolucija preverjanja pristnosti**: Dokumentirana evolucija od lastnih OAuth strežnikov do delegacije zunanjim ponudnikom identitete (Microsoft Entra ID)
- **Analiza groženj, specifičnih za AI**: Izboljšano pokritje sodobnih AI napadnih vektorjev
  - Podrobni scenariji napada injekcije pozivov z realnimi primeri
  - Mehanizmi zastrupitve orodij in vzorci napadov "vleka preproge"
  - Zastrupitev okna konteksta in napadi z zmedenimi modeli
- **Microsoftove AI varnostne rešitve**: Celovita pokritost varnostnega ekosistema Microsofta
  - AI Prompt Shields z napredno detekcijo, osredotočanjem in tehnikami ločil
  - Integracijski vzorci Azure Content Safety
  - GitHub Advanced Security za zaščito dobavne verige
- **Napredna zaščita pred grožnjami**: Podrobni varnostni nadzori za
  - Prevzeme sej z MCP-specifičnimi scenariji napadov in zahtevanimi kriptografskimi ID-ji sej
  - Težave z zmedenim odposlancem v MCP proxy scenarijih z eksplicitnimi zahtevami soglasja
  - Ranljivosti prehoda žetonov z obveznimi kontrolami validacije
- **Varnost dobavne verige**: Razširjeno pokritje AI dobavne verige vključno z osnovnimi modeli, storitvami vložkov, ponujalci konteksta in API-ji tretjih oseb
- **Varnost osnove**: Izboljšana integracija z varnostnimi vzorci podjetij, vključno z arhitekturo ničelnega zaupanja in Microsoftovim varnostnim ekosistemom
- **Organizacija virov**: Kategorizirane celovite povezave do virov po tipu (Uradni dokumenti, standardi, raziskave, Microsoftove rešitve, vodiči za izvedbo)

### Izboljšave kakovosti dokumentacije
- **Strukturirani cilji učenja**: Izboljšani cilji učenja z določenimi, izvedljivimi izidi 
- **Medsebojne reference**: Dodane povezave med povezanimi varnostnimi in osnovnimi temami
- **Aktualne informacije**: Posodobljene vse datumske reference in povezave na specifikacije v skladu s trenutnimi standardi
- **Navodila za izvedbo**: Dodana specifična, izvedljiva navodila za izvedbo čez oba razdelka

## 16. julij 2025

### Izboljšave README in navigacije
- Popolnoma prenovljena navigacija po kurikulumu v README.md
- Zamenjane oznake `<details>` z bolj dostopno tabelarično obliko
- Ustvarjene alternativne možnosti postavitve v novi mapi "alternative_layouts"
- Dodani primeri navigacije s karticami, zavihki in akordeonskim stilom
- Posodobljen odsek strukture repozitorija z vsemi najnovejšimi datotekami
- Izboljšan odsek "Kako uporabljati ta kurikulum" z jasnimi priporočili
- Posodobljene povezave na MCP specifikacije, ki kažejo na pravilne URL-je
- Dodan odsek o inženiringu konteksta (5.14) v strukturo kurikuluma

### Posodobitve študijskega vodiča
- Popolnoma prenovljen študijski vodič za uskladitev s trenutno strukturo repozitorija
- Dodani novi odseki za MCP odjemalce in orodja ter priljubljene MCP strežnike
- Posodobljena Vizualna karta kurikuluma za natančen odsev vseh tem
- Izboljšani opisi naprednih tem za zajem vseh specializiranih področij
- Posodobljen odsek študij primerov, ki odraža dejanske primere
- Dodan ta celovit dnevnik sprememb

### Prispevki skupnosti (06-CommunityContributions/)
- Dodane podrobne informacije o MCP strežnikih za generiranje slik
- Dodan obsežen odsek o uporabi Claude v VSCode
- Dodani navodila za nastavitev in uporabo terminalskega odjemalca Cline
- Posodobljen odsek MCP odjemalec za vključitev vseh priljubljenih odjemalskih možnosti
- Izboljšani primeri prispevkov z bolj natančnimi vzorci kode

### Napredne teme (05-AdvancedTopics/)
- Organizirane vse specializirane mape s konsistentnim poimenovanjem
- Dodani materiali in primeri za inženiring konteksta
- Dodana dokumentacija za integracijo agenta Foundry
- Izboljšana dokumentacija integracije varnosti Entra ID

## 11. junij 2025

### Začetna kreacija
- Izdala prva različica kurikuluma MCP za začetnike
- Ustvarjena osnovna struktura za vseh 10 glavnih odsekov
- Implementirana Vizualna karta kurikuluma za navigacijo
- Dodani začetni vzorčni projekti v več programskih jezikih

### Začetek (03-GettingStarted/)
- Ustvarjeni prvi primeri izvajanja strežnika
- Dodani napotki za razvoj odjemalcev
- Vključena navodila za integracijo LLM odjemalca
- Dodana dokumentacija za integracijo v VS Code
- Implementirani primeri strežnika s strežniškimi dogodki (SSE)

### Osnovni koncepti (01-CoreConcepts/)
- Dodan podroben opis arhitekture odjemalec-strežnik
- Izdelana dokumentacija ključnih komponent protokola
- Dokumentirani vzorci sporočanja v MCP

## 23. maj 2025

### Struktura repozitorija
- Iniciran repozitorij z osnovno strukturo map
- Ustvarjene datoteke README za vsak glavni odsek
- Postavljena infrastruktura za prevajanje
- Dodane slikovne datoteke in diagrami

### Dokumentacija
- Ustvarjen začetni README.md s pregledom kurikuluma
- Dodana datoteka CODE_OF_CONDUCT.md in SECURITY.md
- Postavljen SUPPORT.md z navodili za pridobitev pomoči
- Ustvarjena preliminarna struktura študijskega vodiča

## 15. april 2025

### Načrtovanje in okvir
- Začetno načrtovanje kurikuluma MCP za začetnike
- Določeni cilji učenja in ciljna publika
- Opisana struktura kurikuluma v 10 odsekih
- Razvit konceptualni okvir za primere in študije primerov
- Ustvarjeni začetni prototipni primeri ključnih konceptov

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->