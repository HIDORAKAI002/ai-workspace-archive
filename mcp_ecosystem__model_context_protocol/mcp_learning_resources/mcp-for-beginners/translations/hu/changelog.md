# Változásnapló: MCP kezdőknek tananyag

Ez a dokumentum összegzi a Model Context Protocol (MCP) kezdő tananyagában történt jelentős változtatásokat. A változások fordított időrendben (legújabbak elöl) vannak dokumentálva.

## 2026. július 2.

### Új lecke: A 2026-07-28-i MCP specifikáció Release Candidate

Hozzáadva a hamarosan megjelenő `2026-07-28` MCP specifikáció Release Candidate lefedése (bejelentve 2026. május 21-én; végleges megjelenés tervezett 2026. július 28-án), az [hivatalos bejelentő blogbejegyzés](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) alapján összefoglalva. A tananyag bázisa továbbra is a **MCP Specifikáció 2025-11-25** marad, amíg az új verzió meg nem jelenik, így ez inkább előremutató útmutatás, mint a meglévő leckék átírása.

- **Új**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — egy teljes lecke, amely feldolgozza az állapot nélküli protokoll magját (`initialize` kézfogás és `Mcp-Session-Id` eltávolítása), az új `Mcp-Method`/`Mcp-Name` útválasztó fejlécet, `ttlMs`/`cacheScope` gyorsítótárazási metadata, W3C Trace Context az `_meta`-ban, a hivatalos Bővítménykeretet (MCP Alkalmazások és az új Feladat bővítmény), hat jogosultság-erősítő SEP-et, a Gyökerek/Mintavétel/Naplózás elavulását, és az eszköz sémák teljes JSON Schema 2020-12-re való áttérését.
- **Frissítve** előremutató hivatkozásokkal az új leckére:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): protokoll verzió megjegyzés, Mintavétel/Gyökerek/Naplózás/Feladatok szekciók, és a "Mi következik"
  - [02-Security/README.md](./02-Security/README.md): jogosultság-erősítés hivatkozás
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): állapot nélküli adatátvitel hivatkozás
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Mintavétel elavulás hivatkozás
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Naplózás elavulás és Feladat bővítmény hivatkozás
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): állapot nélküli/munkamenet-útválasztás hivatkozás
  - [README.md](./README.md): "Előre tekintés" megjegyzés a specifikáció szekcióban és egy új `1.1` rekord a tananyagegység táblában
  - [study_guide.md](./study_guide.md): előremutató pont a Core Concepts áttekintés alatt és egy dátumos kiegészítő megjegyzés
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): hivatkozás a `mcp-session-id` adatátviteli leképezésről az állapot nélküli kérés modell előtt
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): modul áttekintő hivatkozás a Gyökér Kontextusok/Mintavétel elavulásra és a Feladat bővítményre
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): jogosultság-erősítés hivatkozás

## 2026. június 24.

### Új lecke: MCP használata Copilot alkalmazásban

- [Eszköz szekció](./12-tooling/README.md) Hozzáadva az eszköz szekció.
- [MCP a Copilot alkalmazásban](./12-tooling/01-copilot-app/README.md)

## 2026. június 16.

### MCP specifikáció összehangolás és minták érvényesítése

Ellenőriztük a tananyagot a jelenlegi **MCP Specifikáció 2025-11-25** és a legfrissebb hivatalos SDK-k alapján, majd kijavítottuk a fennmaradó elavult specifikációs hivatkozásokat, és megerősítettük, hogy a fő minták továbbra is fordulnak és futnak.

#### Specifikáció verzió korrekciók (2025-06-18 / 2025-03-26 → 2025-11-25)

Frissítettük az angol tartalmat, ahol még mindig régebbi specifikációs verziót jelölt meg, mint *aktuális/legfrissebb* szabványt, és átirányítottuk a linkeket a kanonikus `modelcontextprotocol.io` specifikációs útvonalaira:
- **05-AdvancedTopics/mcp-security/README.md**: Frissítettük a "Jelenlegi szabvány" bannert, bevezetőt, alapvető biztonsági elvekkel szakaszcímet, kötelező követelmények címet, Microsoft Entra ID részt, Hivatkozások & Források linkjeit, és a lezáró biztonsági értesítést (8 hivatkozás) a 2025-11-25 szerint
- **05-AdvancedTopics/mcp-transport/README.md**: Frissítettük a További erőforrások specifikációs linkjét és a "Jelenlegi szabvány" bannert 2025-11-25-re
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Kicseréltük a régi `2025-03-26` biztonsági és megbízhatósági linket a jelenlegi 2025-11-25 biztonsági gyakorlati oldalra
- **03-GettingStarted/14-sampling/README.md**: Frissítettük a hivatalos mintavételi dokumentumok linkjét 2025-11-25-re
- **03-GettingStarted/05-stdio-server/README.md**: Frissítettük a jelen idejű "aktuális MCP specifikáció" hivatkozást és a További erőforrások specifikációs linkjét 2025-11-25-re (a történelmi SSE-elavulás megjegyzések változatlanok maradtak a pontosság érdekében)

#### Minták SDK-khoz igazítása

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` megoldotta a `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` hibamentesen lefutott — a meglévő `McpServer`/`StdioServerTransport` API-k érvényesek maradtak
- **Python (03-GettingStarted/01-first-server/solution/python)**: Ellenőrizve izolált `.venv` alatt `mcp[cli]` (1.27.2) verzióval; `py_compile` sikeres volt, és `FastMCP.list_tools()` helyesen adta vissza az `add` és `subtract` eszközöket
- Megerősítettük, hogy minden mintában szereplő `@modelcontextprotocol/sdk` verziótartomány (`>=1.26.0` / `^1.26.0` / `^1.27.0`) tisztán megoldódik a jelenlegi `1.29.0`-ra törés nélküli API változásokkal

#### Függőség pontosítás (verziós réseket zárva)

Frissítettük az elavult SDK-csúcsokat, hogy minden minta az aktuális MCP kiadást kövesse, megfelelve a teljes repóban érvényes konvenciónak:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Emeltük a `@modelcontextprotocol/sdk` verzióját `^1.8.0`-ról `>=1.26.0`-ra, és frissítettük az elavult `"updated for MCP 2025-06-18"` csomagleírást `"aligned with MCP Specification 2025-11-25"`-re
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** és **lab4/code/github_mcp_server/pyproject.toml**: Emeltük a pontos verzió `mcp==1.23.0`-ról `mcp>=1.26.0`-ra; újrageneráltuk mindkét `uv.lock` fájlt (`uv lock`) hogy a zárolófájlok az aktuális `mcp 1.27.2`-re oldódjanak meg és szinkronban maradjanak a manifesztekkel

#### Tananyag hiányosságanalízis — Legújabb specifikációs funkciók lefedése

Ellenőriztük, hogy a tananyag már lefedi az MCP 2025-11-25-ben bevezetett/bővített összes primitívet, így tartalmi hiány nincs:
- **Mintavétel**: Lecke 03-GettingStarted/14-sampling és 05-AdvancedTopics/mcp-sampling
- **Előhívás (beleértve URL módot is)**: Dokumentálva az 01-CoreConcepts-ban és a 05-AdvancedTopics/mcp-protocol-features-ben
- **Gyökerek**: Dokumentálva a 00-Introduction-ben, 01-CoreConcepts-ban és a 05-AdvancedTopics/mcp-root-contexts-ben
- **Feladatok (kísérleti, hosszú futású műveletek)**: Dokumentálva az 01-CoreConcepts-ban és a 05-AdvancedTopics/mcp-protocol-features-ben
- **Eszköz megjegyzések** (`readOnlyHint` / `destructiveHint`): Dokumentálva az 01-CoreConcepts-ban és a 05-AdvancedTopics/mcp-protocol-features-ben

### Biztonság megerősítése és függőségi sérülékenységek javítása

Átfogó biztonsági ellenőrzést végeztünk minden függőségi manifesztfájlban és a minta forráskódban, majd kijavítottuk az összes jelentett npm figyelmeztetést és egy kód szintű hibát. A javítás után az `npm audit` **0 sérülékenységet** jelez minden vizsgált könyvtárban.

#### npm függőségi sérülékenységek (áthidaló) — Javítva

Ellenőriztük a 15 beadott `package-lock.json` fájlt. A sérülékenységek az MCP Inspector fejlesztő eszköz által behozott áthidaló függőségekben, az OpenAI kliensben és az MCP SDK-ban voltak; mind most megoldottak törés nélkül a mintákban:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** és **lab3/code/weather_mcp/inspector**: Emeltük a `@modelcontextprotocol/inspector` verzióját (`0.16.6` / `0.14.1` → `0.22.0`), ami törölte a beépített `ajv`, `brace-expansion`, `diff`, `path-to-regexp` és `ws` figyelmeztetéseket. Hozzáadtunk egy npm `overrides` bejegyzést, amely erőlteti a javított `shell-quote@1.8.4` verziót az utolsó kritikus figyelmeztetés megszüntetésére, melyet a `concurrently` hozott; újrageneráltuk a lockfile-okat (most 0 sérülékenység)
- **03-GettingStarted/samples/typescript**: `npm audit fix` frissítette a mérsékelt kockázatú `qs` áthidaló függőséget javított kiadásra
- **03-GettingStarted/samples/javascript**: `npm audit fix` frissítette a mérsékelt kockázatú `hono` áthidaló függőséget javított kiadásra
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` frissítette a magas kockázatú `form-data` áthidaló függőséget javított kiadásra
- **03-GettingStarted/11-simple-auth/solution/typescript**: Elkészült a hiányzó `package-lock.json`, így a projekt reprodukálható és ellenőrizhető (0 sérülékenység)

#### Kód szintű biztonsági javítás (OWASP A03: Befecskendezés)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eltávolítva a `shell=True` az `open_in_vscode` eszközből. A korábbi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lehetővé tette, hogy a `cmd.exe` parancsfájl-karaktereket értelmezzen a mappapályában (parancsinjekciós lehetőség). Most közvetlenül indítja a feloldott `Code.exe`-t a mappa argumentumként való átadásával — nincs shell — ami funkcionálisan egyenértékű és biztonságos.

#### Python függőségi ellenőrzés

- Ellenőriztük minden Python igénylési készletet `pip-audit`-tal. A `05-AdvancedTopics` és `03-GettingStarted/samples/python` **nem jelzett ismert sérülékenységet** (a `mcp` / `httpx` / `pydantic` / `python-dotenv` verziótartományok aktuális javított kiadásra oldódnak)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: A `pip-audit` három `safe_join` Windows eszköznév DoS figyelmeztetést jelzett a transzitív függőségként szereplő **`werkzeug` 3.1.1** esetén — `CVE-2025-66221`, `CVE-2026-21860`, és `CVE-2026-27199` (mind 3.1.6-ban javítva). Explicit biztonsági jelölést adtunk hozzá `werkzeug>=3.1.6` formában, hogy a javított verzió legyen megoldva; ellenőriztük, hogy a korlátozás zavartalanul megoldódik a `chainlit` / `mcp` / `semantic-kernel` halmazban

### Termék név újrapozícionálás

Frissítettük az összes tananyag tartalmat, hogy tükrözze a Microsoft termék újrapozícionálását:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Frissítettük a Discord közösségi linket
- **AGENTS.md**: Frissítettük a Discord szerver hivatkozást
- **README.md**: Frissítettük a technológiai ökoszisztéma hivatkozásokat
- **study_guide.md**: Frissítettük az esettanulmány hivatkozásokat
- **05-AdvancedTopics/README.md**: Frissítettük az 5.13 modul címét és leírását
- **05-AdvancedTopics/mcp-integration/README.md**: Frissítettük a szakaszcímet és leírást
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Teljes modul cím és tartalom frissítés
- **05-AdvancedTopics/mcp-security-entra/README.md**: Frissítettük a kereszthivatkozási linket
- **07-LessonsfromEarlyAdoption/README.md**: Frissítettük az esettanulmány hivatkozásokat
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Frissítettük a 9. szakasz fejlécét, jelvényeket és képességeket
- **08-BestPractices/README.md**: Frissítettük a Discord közösségi linket
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Frissítettük a Discord csatorna hivatkozást
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Frissítettük a modell telepítési hivatkozást
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Frissítettük az AI Szolgáltatások táblázatot
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Frissítettük az erőforrás hivatkozásokat

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: Frissített fő tananyag hivatkozások
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Frissített modul cím, áttekintés és az összes modul fejléc
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Frissített cím, tanulási célok, beállítási utasítások és források
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Frissített cím, tanulási célok, MCP hosztok táblázata és kereszthivatkozások
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Frissített cím, jelvények, előfeltételek és források
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Frissített Agent Builder hivatkozások és visszacsatolási link
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Frissített előfeltételek és kiterjesztési hivatkozások

---

## 2026. április 11.

### Új lecke, dokumentációs javítások és függőségfrissítések

#### Új tananyagtartalom hozzáadva

**05-ös modul - Haladó témák**
- **5.17-es lecke: Ellenséges többszereplős érvelés MCP-vel** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Új átfogó útmutató a többszereplős rendszerek ellenséges vitamintázatáról
  - Mermaid architektúra diagram: két ügynök → megosztott MCP szerver → vitatkozás átirat → bíró → ítélet
  - Megosztott MCP eszközszerver (`web_search` + `run_python`) Pythonban és TypeScript-ben megvalósítva
  - Ellentétes rendszer parancsok (FOR / AGAINST / Bíró) explicit eszközhasználati követelményekkel
  - Vita szervező Pythonban, TypeScriptben és C#-ban, köröket kezel és érveket irányít
  - MCP `ClientSession` összeköttetés az orchestrator és a valós eszközhívások között
  - Használati esetek táblázata (hallucináció detektálás, fenyegetés modellezés, API tervezés felülvizsgálat, tényellenőrzés, technológia kiválasztás)
  - Biztonsági megfontolások: sandbox végrehajtás, eszközhívás ellenőrzés, aránykorlátozás, audit naplózás
  - Strukturált gyakorlat három gyakorlati forgatókönyvvel (kódellenőrzés, architektúra döntés, tartalom moderáció)

#### Dokumentációs javítások

**03-as modul - Kezdőknek**
- **05-stdio-server/README.md**: Javított hiányos TypeScript stdio szerver példa — hozzáadva az elmaradt transzport példányosítás (`new StdioServerTransport()`) és a `server.connect(transport)` meghívás, hogy illeszkedjen a Python és .NET példákhoz ugyanabban a szakaszban
- **14-sampling/README.md**: Elírás javítva — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Tananyag frissítések

**Fő README.md**
- Hozzáadva 5.17-es bejegyzés (Ellenséges többszereplős érvelés MCP-vel) a tananyag táblázathoz közvetlen hivatkozással az új leckére

**05-AdvancedTopics/README.md**
- Hozzáadva az 5.17-es lecke sor a leckék táblázatához

**study_guide.md**
- Hozzáadva az Ellenséges többszereplős érvelés téma az elmetérképhez és a haladó témák prózai leírásához

#### Kód és biztonsági javítások

**05-ös modul - Ellenséges ügynökök (`mcp-adversarial-agents`)**
- **Biztonsági javítás — parancsinjekció**: Kicseréltük a `execSync` shell interpolációt `execFile` + `promisify`-ra a TypeScript `run_python` eszközben, megszüntetve a parancsinjekciós felületet (most az LLM által vezérelt kód literális argv elemként kerül át shell nélkül)
- **MCP eszköz hurok összekötés**: Frissítettük a Python vita szervezőt `AsyncAnthropic` kliens használatával (a blokkoló szinkron `Anthropic` helyett), élő `ClientSession` közvetlen átadásával ügynök körönként, eszköz definíciók lekérése `session.list_tools()` használatával, és `tool_use` blokkok továbbítása `session.call_tool()` hurokban, amíg modell végső szövegválaszt nem ad ki

#### Függőség frissítések

- `hono` frissítve 4.12.12-re több csomagon keresztül (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- `@hono/node-server` frissítve 1.19.11-ről 1.19.13-ra TypeScript csomagokban
- `cryptography` frissítve 46.0.5-ről 46.0.7-re Python csomagokban (10-StreamliningAIWorkflows labok 3 és 4)
- `lodash` frissítve 4.17.23-ról 4.18.1-re 10-StreamliningAIWorkflows inspectorban

#### Fordítások

- Szinkronizált fordítások 48+ nyelven a legfrissebb forrásváltozásokkal (i18n frissítés)

---

## 2026. február 5.

### Egész táros validáció és navigáció fejlesztések

#### Új tananyagtartalom hozzáadva

**03-as modul - Kezdőknek**
- **12-mcp-hosts/README.md**: Új átfogó útmutató az MCP hosztok beállításához
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigurációs példák
  - JSON konfigurációs sablonok minden főbb hoszthoz
  - Transzport típusok összehasonlító táblázata (stdio, SSE/HTTP, WebSocket)
  - Gyakori kapcsolódási problémák elhárítása
  - Biztonsági legjobb gyakorlatok a hoszt konfigurációhoz

- **13-mcp-inspector/README.md**: Új hibakeresési útmutató MCP Inspectorhoz
  - Telepítési módszerek (npx, globális npm, forrásból)
  - Kapcsolódás stdio és HTTP/SSE szerverekhez
  - Teszt eszközök, források, prompt munkafolyamatok
  - VS Code integráció MCP Inspectorral
  - Gyakori hibakeresési forgatókönyvek megoldásokkal

**04-es modul - Gyakorlati megvalósítás**
- **pagination/README.md**: Új lapozási megvalósítási útmutató
  - Python, TypeScript, Java alapú kurzor-alapú lapozási minták
  - Ügyféloldali lapozás kezelése
  - Kurzor tervezési stratégiák (átlátszatlan vs. strukturált)
  - Teljesítményoptimalizálási javaslatok

**05-ös modul - Haladó témák**
- **mcp-protocol-features/README.md**: Új protokoll funkciók alapos bemutatása
  - Haladás értesítések megvalósítása
  - Kérés törlése minták
  - Erőforrás sablonok URI mintákkal
  - Szerver életciklus menedzsment
  - Naplózási szint szabályozás
  - Hibakezelési minták JSON-RPC kódokkal

#### Navigáció javítások (24+ fájl frissítve)

**Fő modul README-k**
 Most hivatkozás mind az első leckére, mind a következő modulra

**02-Security mellékfájlok**
- Az 5 kiegészítő biztonsági dokumentumnak most van "Mi következik" navigációja:

**09-CaseStudy fájlok**
- Minden esettanulmány fájlnak van egymás utáni navigációja:

**10-StreamliningAI labok**
Hozzáadva Mi következik szakasz a 10-es modul áttekintéséhez és a 11-es modulhoz

#### Kód és tartalom javítások

**SDK és függőség frissítések**
Javított üres openai verzió `^4.95.0`-re
SDK frissítve `^1.8.0`-ról `>=1.26.0`-ra
MCP verzió lábkiosztás frissítve `>=1.26.0`-ra

**Kód javítások**
Érvénytelen modell javítva `gpt-4o-mini` → `gpt-4.1-mini`

**Tartalom javítások**
Javított töredezett hivatkozás `READMEmd` → `README.md`, javított tananyag fejléc `Module 1-3` → `Module 0-3`, javított kis/nagybetű érzékeny útvonal
Eltávolítva a sérült ismétlődő Case Study 5 tartalom

**Kezdő iránymutatás fejlesztések**
Hozzáadott megfelelő bevezetés, tanulási célok és előfeltételek kezdők számára

#### Tananyag frissítések

**Fő README.md**
- Hozzáadva 3.12 (MCP hosztok), 3.13 (MCP Inspector), 4.1 (Lapozás), 5.16 (Protokoll funkciók) bejegyzések a tananyag táblázathoz

**Modul README-k**
Hozzáadva 12-es és 13-as leckék a lecke listához
Hozzáadva Gyakorlati útmutatók szekció lapozás hivatkozással
Hozzáadva az 5.15 (Egyedi Transzport) és 5.16 (Protokoll funkciók) leckék

**study_guide.md**
- Frissítve az elmetérkép az összes új témával: MCP hoszt beállítás, MCP Inspector, lapozási stratégiák, protokoll funkciók mély bemutatása

## 2026. január 28.

### MCP specifikáció 2025-11-25 megfelelőségi áttekintés

#### Alapvető koncepciók fejlesztése (01-CoreConcepts/)
- **Új kliens primitív - Gyökerek**: Átfogó dokumentáció hozzáadva a Roots kliens primitív működéséről, ami lehetővé teszi a szervereknek a fájlrendszer határok és hozzáférési jogosultságok megértését
- **Eszköz annotációk**: Dokumentáció hozzáadva az eszköz viselkedési annotációkról (`readOnlyHint`, `destructiveHint`), jobb eszköz végrehajtási döntésekhez
- **Eszköz hívás mintavétel közben**: Frissítve a Sampling dokumentáció, hogy tartalmazza a `tools` és `toolChoice` paramétereket a modell által vezérelt eszközhívásokhoz mintavételi kérések alatt
- **URL mód aktiválás**: Dokumentáció hozzáadva a URL-alapú aktiválásról a szerver által indított külső webes interakciókhoz
- **Feladatok (kísérleti)**: Új szakasz az experimentális Tasks funkció dokumentálására, mely tartós végrehajtási csomagolókat és halasztott eredménylekérést tesz lehetővé
- **Ikon támogatás**: Megjegyezve, hogy az eszközök, források, forrás sablonok és promptok most már ikonokat is tartalmazhatnak kiegészítő metaadatként

#### Dokumentáció frissítések
- **README.md**: Hozzáadva MCP Specifikáció 2025-11-25 verzió hivatkozás és dátumalapú verzió magyarázat
- **study_guide.md**: Frissítve a tananyag térkép, hogy tartalmazza a Feladatokat és Eszköz annotációkat az Alapfogalmak szekcióban; frissített dokumentum időbélyeg

#### Specifikáció megfelelőségi ellenőrzés
- **Protokoll verzió**: Ellenőrizve, hogy minden dokumentáció a jelenlegi MCP Specifikáció 2025-11-25-re hivatkozik
- **Architektúra igazodás**: Megerősítve a két rétegű architektúra (Adat réteg + Transzport réteg) dokumentáció pontossága
- **Primitívek dokumentációja**: Validálva a szerver primitíveket (Erőforrások, Promptok, Eszközök) és kliens primitíveket (Mintavétel, Aktiválás, Naplózás, Roots)
- **Transzport mechanizmusok**: Ellenőrizve az STDIO és HTTP adatfolyam transzport dokumentáció pontossága
- **Biztonsági útmutató**: Megerősítve a jelenlegi MCP Biztonsági Legjobb Gyakorlatokkal való összhang

#### Jelentős MCP 2025-11-25 funkciók dokumentálva
- **OpenID Connect felfedezés**: Hitelesítési szerver felfedezés OIDC-n keresztül
- **OAuth kliens azonosító metaadatok**: Ajánlott kliens regisztrációs mechanizmus
- **JSON Schema 2020-12**: Alapértelmezett dialektus az MCP sémadefiníciókhoz
- **SDK tierelési rendszer**: Formalizált követelmények az SDK funkció támogatásra és karbantartásra
- **Kormányzati struktúra**: Formalizált Munkacsoportok és Érdeklődési csoportok az MCP kormányzásban

### Biztonsági dokumentáció jelentős frissítése (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integrációja
- **Új gyakorlati képzési forrás**: Átfogó integráció hozzáadva a [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) anyagaihoz az összes biztonsági dokumentációban
- **Expedíciós útvonal lefedettség**: Dokumentálva a teljes tábor-tábor haladás az Alaptábortól a Csúcsig
- **OWASP igazodás**: Minden biztonsági útmutató most az OWASP MCP Azure Biztonsági Útmutató kockázataira reflektál

#### OWASP MCP Top 10 integráció
- **Új szakasz**: Hozzáadva OWASP MCP Top 10 Biztonsági Kockázatok tábla az Azure mérséklésekkel a fő Biztonsági README-ben
- **Kockázatalapú dokumentáció**: Frissítve a mcp-security-controls-2025.md az OWASP MCP kockázati hivatkozásokkal minden biztonsági területre
- **Referenciarchitektúra**: Linkelve az OWASP MCP Azure Biztonsági Útmutató referenciarchitektúrájához és megvalósítási mintákhoz

#### Frissített biztonsági fájlok
- **README.md**: Hozzáadva Sherpa Workshop áttekintés, expedíciós útvonal tábla, OWASP MCP Top 10 kockázatok összefoglaló és gyakorlati képzés szakasz
- **mcp-security-controls-2025.md**: Frissített fejléc február 2026-ra, hozzáadva OWASP kockázati hivatkozások (MCP01-MCP08), javított specifikáció verzió eltérés
- **mcp-security-best-practices-2025.md**: Hozzáadva Sherpa és OWASP források szekció, frissített időbélyeg
- **mcp-best-practices.md**: Hozzáadva gyakorlati képzés szakasz Sherpa és OWASP hivatkozásokkal
- **azure-content-safety-implementation.md**: Hozzáadva OWASP MCP06 hivatkozás, Sherpa Camp 3 igazítás és további források szekció

#### Új forrás linkek hozzáadva
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Egyedi OWASP MCP kockázati oldalak (MCP01-MCP10)

### Tananyag-szintű MCP Specifikáció 2025-11-25 összehangolás

#### 03-as modul - Kezdőknek
- **SDK dokumentáció**: Hozzáadva Go SDK a hivatalos SDK listához; frissített minden SDK hivatkozást, hogy igazodjon az MCP Specifikáció 2025-11-25-höz
- **Transzport tisztázás**: Frissítve az STDIO és HTTP adatfolyam transzport leírás explicit specifikációs hivatkozásokkal

#### 04-es modul - Gyakorlati megvalósítás
- **SDK frissítések**: Hozzáadva Go SDK; frissített SDK lista a specifikáció verzió hivatkozással
- **Engedélyezési specifikáció**: Frissítve a MCP Engedélyezési szabályzat link a jelenlegi 2025-11-25 verzióra

#### 05-ös modul - Haladó témák
- **Új funkciók**: Megjegyzést fűzve az új MCP Specifikáció 2025-11-25 funkciókról (Feladatok, Eszköz annotációk, URL mód aktiválás, Gyökerek)
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 és Sherpa workshop linkek további hivatkozásként

#### 06-os modul - Közösségi hozzájárulások
- **SDK lista**: Hozzáadva Swift és Rust SDK-kat; frissített specifikációs link 2025-11-25-re
- **Specifikációs hivatkozás**: Frissített MCP Specifikáció link közvetlen specifikációs URL-re

#### 07-es modul - Korai bevezetés tanulságai

- **Erőforrás Frissítések**: Hozzáadva MCP Specifikáció 2025-11-25 link és OWASP MCP Top 10 további forrásokhoz

#### 08. Modul - Legjobb Gyakorlatok
- **Verzió Specifikáció**: Frissítve az MCP Specifikáció hivatkozása 2025-11-25-re
- **Biztonsági Források**: Hozzáadva OWASP MCP Top 10 és Sherpa műhely további hivatkozásokhoz

#### 10. Modul - AI Munkafolyamatok Egyszerűsítése
- **Jelvény Frissítés**: MCP verzió jelvény megváltoztatva SDK verzióról (1.9.3) a specifikáció verziójára (2025-11-25)
- **Erőforrás Linkek**: Frissítve MCP Specifikáció link; hozzáadva OWASP MCP Top 10

#### 11. Modul - MCP Szerver Gyakorlati Laborgyakorlatok
- **Specifikáció Hivatkozás**: Frissítve MCP Specifikáció link 2025-11-25 verzióra
- **Biztonsági Források**: Hozzáadva OWASP MCP Top 10 a hivatalos forrásokhoz

## 2025. december 18.

### Biztonsági Dokumentáció Frissítés - MCP Specifikáció 2025-11-25

#### MCP Biztonsági Legjobb Gyakorlatok (02-Security/mcp-best-practices.md) - Verzió Frissítés
- **Protokoll Verzió Frissítés**: Frissítve a legújabb MCP Specifikáció aki 2025-11-25-re (2025. november 25-én kiadva)
  - Minden specifikáció verzió hivatkozás frissítve 2025-06-18-ról 2025-11-25-re
  - Dokumentum dátum hivatkozások frissítve 2025. augusztus 18-ról 2025. december 18-ra
  - Ellenőrizve, hogy minden specifikáció URL a jelenlegi dokumentációra mutat
- **Tartalom Érvényesítés**: Átfogó érvényesítés a biztonsági legjobb gyakorlatokról a legújabb szabványok alapján
  - **Microsoft Biztonsági Megoldások**: Ellenőrizve a jelenlegi terminológia és linkek Prompt Shields (korábban "jailbreak kockázat észlelés"), Azure Content Safety, Microsoft Entra ID, és Azure Key Vault tekintetében
  - **OAuth 2.1 Biztonság**: Megerősítve az összhang a legújabb OAuth biztonsági legjobb gyakorlatokkal
  - **OWASP Szabványok**: Validálva az OWASP Top 10 LLM-ekre vonatkozó hivatkozásainak naprakészsége
  - **Azure Szolgáltatások**: Ellenőrizve minden Microsoft Azure dokumentációs link és legjobb gyakorlat
- **Szabványoknak Való Megfelelés**: Minden hivatkozott biztonsági szabvány megerősítve, hogy jelenlegi
  - NIST AI Kockázatkezelési Keretrendszer
  - ISO 27001:2022
  - OAuth 2.1 Biztonsági Legjobb Gyakorlatok
  - Azure biztonsági és megfelelőségi keretrendszerek
- **Implementációs Források**: Minden megvalósítási útmutató link és erőforrás ellenőrizve
  - Azure API Management hitelesítési minták
  - Microsoft Entra ID integrációs útmutatók
  - Azure Key Vault titkos kezelés
  - DevSecOps csövek és monitorozó megoldások

### Dokumentáció Minőségbiztosítás
- **Specifikációnak Megfelelés**: Biztosítva, hogy minden kötelező MCP biztonsági követelmény (MUST/MUST NOT) összhangban legyen a legújabb specifikációval
- **Forrás aktualitás**: Ellenőrizve minden külső link Microsoft dokumentációhoz, biztonsági szabványokhoz és implementációs útmutatókhoz
- **Legjobb Gyakorlatok Lefedettsége**: Megerősítve az átfogó lefedettség az autentikáció, autorizáció, AI-specifikus veszélyek, beszállítói lánc biztonság és vállalati minták tekintetében

## 2025. október 6.

### Kezdő Szekció Bővítése – Haladó Szerver Használat & Egyszerű Hitelesítés

#### Haladó Szerver Használat (03-GettingStarted/10-advanced)
- **Új Fejezet Hozzáadva**: Átfogó útmutató a haladó MCP szerver használathoz, lefedve mind a hagyományos, mind az alacsony szintű szerverarchitektúrákat.
  - **Rendszeres vs. Alacsony Szintű Szerver**: Részletes összehasonlítás és kódpéldák Pythonban és TypeScript-ben mindkét megközelítéshez.
  - **Handler-alapú Design**: Magyarázat a handler-alapú eszköz/erőforrás/utasítás kezelésről skálázható, rugalmas szerver megvalósításokhoz.
  - **Gyakorlati Minták**: Valós példák, ahol az alacsony szintű szerver minták előnyösek haladó funkciókhoz és architektúrához.

#### Egyszerű Hitelesítés (03-GettingStarted/11-simple-auth)
- **Új Fejezet Hozzáadva**: Lépésről lépésre útmutató az egyszerű hitelesítés megvalósításához MCP szerverekben.
  - **Hitelesítési Fogalmak**: Világos magyarázat a hitelesítés és autorizáció közötti különbségről, valamint a hitelesítő adatok kezeléséről.
  - **Alap Hitelesítés Megvalósítása**: Middleware alapú hitelesítési minták Pythonban (Starlette) és TypeScript-ben (Express), kódrészletekkel.
  - **Fejlődés Haladó Biztonságra**: Útmutatás az egyszerű hitelesítésről a OAuth 2.1-re és RBAC-ra való előrelépéshez, hivatkozásokkal haladó biztonsági modulokra.

Ezek a kiegészítések gyakorlati, kézzelfogható útmutatást nyújtanak a robosztusabb, biztonságosabb és rugalmasabb MCP szerver implementációkhoz, összekötve az alapfogalmakat a fejlett éles mintákkal.

## 2025. szeptember 29.

### MCP Szerver Adatbázis Integrációs Laborgyakorlatok - Átfogó Gyakorlati Tanulási Út

#### 11-MCPServerHandsOnLabs - Új Teljes Adatbázis Integrációs Tananyag
- **Teljes 13-Lab Tanulási Út**: Hozzáadott átfogó gyakorlati tananyag éles MCP szerverek PostgreSQL adatbázis integrációval
  - **Valós Üzleti Megvalósítás**: Zava Retail analitika esettanulmány vállalati szintű minták bemutatására
  - **Strukturált Tanulási Haladás**:
    - **Labok 00-03: Alapok** - Bevezetés, Magarchitektúra, Biztonság &Multi-Tenancy, Környezet Beállítás
    - **Labok 04-06: MCP Szerver Építése** - Adatbázis Tervezés & Séma, MCP Szerver Implementáció, Eszköz Fejlesztés  
    - **Labok 07-09: Haladó Funkciók** - Szemantikus Keresés Integráció, Tesztelés & Hibakeresés, VS Code Integráció
    - **Labok 10-12: Éles Üzem & Legjobb Gyakorlatok** - Telepítési Stratégiák, Monitorozás & Megfigyelhetőség, Legjobb Gyakorlatok & Optimalizáció
  - **Vállalati Technológiák**: FastMCP keretrendszer, PostgreSQL pgvectorral, Azure OpenAI beágyazások, Azure Container Apps, Application Insights
  - **Haladó Funkciók**: Sor szintű biztonság (RLS), szemantikus keresés, multi-bérlős adat-hozzáférés, vektor beágyazások, valós idejű monitorozás

#### Terminológia Egységesítés - Modulból Labra Átállás
- **Átfogó Dokumentáció Frissítés**: Rendszeresen frissítve minden README fájl az 11-MCPServerHandsOnLabs könyvtárban, hogy a "Lab" terminológiát használja a "Modul" helyett
  - **Szekció Fejlécek**: Frissítve "Mit fed le ez a modul" -> "Mit fed le ez a labor" mind a 13 labor esetében
  - **Tartalmi Leírás**: Módosítva "Ez a modul biztosít..." -> "Ez a labor biztosít..." a dokumentáció egészében
  - **Tanulási Célok**: Frissítve "A modul végére..." -> "A labor végére..."
  - **Navigációs Linkek**: Átalakítva minden "Modul XX:" hivatkozás "Labor XX:"-ra kereszt-hivatkozásokban és navigációban
  - **Teljesítési Nyomon követés**: Frissítve "A modul elvégzése után..." -> "A labor elvégzése után..."
  - **Megőrizve Technikai Hivatkozások**: Megtartva Python modul hivatkozások konfigurációs fájlokban (pl. `"module": "mcp_server.main"`)

#### Tanulmányi Útmutató Fejlesztése (study_guide.md)
- **Vizuális Tananyag Térkép**: Új "11. Adatbázis Integrációs Laborok" szekció hozzáadva átfogó laborstruktúra vizualizációval
- **Tároló Struktúra**: Frissítve tízről tizenegy fő szekcióra részletes 11-MCPServerHandsOnLabs leírással
- **Tanulási Út Irányítás**: Javított navigációs utasítások a 00-11 szekciók lefedésére
- **Technológiai Lefedettség**: Hozzáadva FastMCP, PostgreSQL, Azure szolgáltatások integrációs részletek
- **Tanulási Eredmények**: Kiemelve éles környezetre kész szerverfejlesztést, adatbázis integrációs mintákat és vállalati biztonságot

#### Fő README Szerkezet Fejlesztése
- **Labor-alapú Terminológia**: Frissítve az 11-MCPServerHandsOnLabs fő README.md hogy következetesen "Labor" szerkezetet használjon
- **Tanulási Út Szervezés**: Világos előrehaladás az alapfogalmaktól a haladó megvalósításon át az éles üzembe helyezésig
- **Valós Üzemi Fókusz**: Kiemelkedő hangsúly a gyakorlati, kézzelfogható tanuláson vállalati szintű mintákkal és technológiákkal

### Dokumentáció Minőség és Konzisztencia Javítások
- **Gyakorlati Tanulás Kiemelés**: Megerősítve a labor-alapú, gyakorlati megközelítést a dokumentáció egészében
- **Vállalati Minták Kiemelése**: Kiemelve az éles üzemre kész megvalósításokat és vállalati biztonsági szempontokat
- **Technológiai Integráció**: Átfogó lefedettség a modern Azure szolgáltatások és AI integrációs minták terén
- **Tanulási Haladás**: Világos, strukturált út az alapfogalmaktól az éles üzembe helyezésig

## 2025. szeptember 26.

### Esettanulmányok Bővítés - GitHub MCP Regiszter Integráció

#### Esettanulmányok (09-CaseStudy/) - Ökoszisztéma Fejlesztési Fókusz
- **README.md**: Jelentős bővítés átfogó GitHub MCP Regiszter esettanulmánnyal
  - **GitHub MCP Regiszter Esettanulmány**: Új átfogó elemzés a GitHub MCP Regiszter szeptember 2025-ös bevezetéséről
    - **Probléma Elemzés**: Részletes vizsgálat a fragmentált MCP szerver felfedezési és telepítési kihívásokról
    - **Megoldási Architektúra**: GitHub központosított regiszter megközelítése egylövetű VS Code telepítéssel
    - **Üzleti Hatás**: Mérhető javulás fejlesztői betanulásban és termelékenységben
    - **Stratégiai Érték**: Moduláris ügynök telepítés és eszközök közötti interoperabilitás fókusz
    - **Ökoszisztéma Fejlesztés**: Alapvető platformként pozícionálva az ügynöki integrációhoz
  - **Fejlesztett Esettanulmány Struktúra**: Frissítve mind a hét esettanulmány egységes formátumra és átfogó leírásokra
    - Azure AI Utazási Ügynökök: Több ügynök kezelése hangsúlyozva
    - Azure DevOps Integráció: Munkafolyamat automatizálás fókuszálva
    - Valós idejű Dokumentáció Lekérdezés: Python konzol kliens megvalósítás
    - Interaktív Tanulmányi Terv Generátor: Chainlit beszélgetős webalkalmazás
    - Szerkesztőn belüli Dokumentáció: VS Code és GitHub Copilot integráció
    - Azure API Management: Vállalati API integrációs minták
    - GitHub MCP Regiszter: Ökoszisztéma fejlesztés és közösségi platform
  - **Átfogó Következtetés**: Átdolgozott összefoglaló rész, amely hét esettanulmányt tartalmaz az MCP megvalósítás különböző dimenzióiból
    - Vállalati Integráció, Több-ügynök Koordináció, Fejlesztői Produktivitás
    - Ökoszisztéma Fejlesztés, Oktatási Alkalmazások kategorizálás
    - Fejlesztett betekintés architekturális mintákra, implementációs stratégiákra és legjobb gyakorlatokra
    - Hangsúly az MCP érett, éles környezetre kész protokollként

#### Tanulmányi Útmutató Frissítések (study_guide.md)
- **Vizuális Tananyag Térkép**: Frissített gondolattérkép beillesztve GitHub MCP Regisztert az Esettanulmányok szekcióba
- **Esettanulmány Leírások**: Fejlesztett részletes bontás hét átfogó esettanulmányról a korábbi általános leírások helyett
- **Tároló Struktúra**: Frissített 10. szekció a teljes esettanulmány lefedettség és specifikus megvalósítási részletek szerint
- **Változásnapló Integráció**: Hozzáadott 2025. szeptember 26-i bejegyzés dokumentálva a GitHub MCP Regiszter hozzáadását és esettanulmány fejlesztéseket
- **Dátum Frissítések**: Frissítve a lábléc időbélyeg a legutóbbi felülvizsgálatot tükrözve (2025. szeptember 26.)

### Dokumentáció Minőség Javítások
- **Konzisztencia Fejlesztés**: Egységesített esettanulmány formázás és szerkezet mind a hét példánál
- **Átfogó Lefedettség**: Esettanulmányok most lefedik a vállalati, fejlesztői produktivitási és ökoszisztéma fejlesztési forgatókönyveket
- **Stratégiai Pozicionálás**: Fokozott fókusz az MCP alap platformként az ügynöki rendszerek telepítéséhez
- **Forrás Integráció**: Frissített további források, hogy tartalmazzák a GitHub MCP Regiszter linket

## 2025. szeptember 15.

### Haladó Témák Bővítése - Egyedi Transzportok & Kontextus Mérnökség

#### MCP Egyedi Transzportok (05-AdvancedTopics/mcp-transport/) - Új Haladó Implementációs Útmutató
- **README.md**: Teljes implementációs útmutató egyedi MCP transzport mechanizmusokhoz
  - **Azure Event Grid Transzport**: Átfogó szerver nélküli esemény-alapú transzport megvalósítás
    - C#, TypeScript és Python példák Azure Functions integrációval
    - Esemény-alapú architektúra minták skálázható MCP megoldásokhoz
    - Webhook fogadók és push-alapú üzenetkezelés
  - **Azure Event Hubs Transzport**: Nagy áteresztőképességű streaming transzport megvalósítás
    - Valós idejű streaming képességek alacsony késleltetésű forgatókönyvekhez
    - Partícionálási stratégiák és ellenőrzőpont kezelése
    - Üzenet csomagolás és teljesítmény optimalizálás
  - **Vállalati Integrációs Minták**: Éles üzemre kész architekturális példák
    - Elosztott MCP feldolgozás több Azure Functions között
    - Többfajta transzport típusokat kombináló hibrid transzport architektúrák
    - Üzenet tartósság, megbízhatóság és hibakezelési stratégiák
  - **Biztonság & Monitorozás**: Azure Key Vault integráció és megfigyelhetőségi minták
    - Kezelt identitás alapú hitelesítés és legkisebb jogosultság elve
    - Application Insights telemetria és teljesítmény monitorozás
    - Kapcsoló megszakítók és hibabiztos minták
  - **Tesztelési Keretrendszerek**: Átfogó tesztelési stratégiák egyedi transzportokhoz
    - Egységtesztelés teszt duplikátumokkal és mock keretrendszerekkel
    - Integrációs tesztelés Azure Test Containers segítségével
    - Teljesítmény- és terheléses tesztelési megfontolások

#### Kontextus Mérnökség (05-AdvancedTopics/mcp-contextengineering/) - Felmerülő AI Diszciplína
- **README.md**: Átfogó feltárás a kontextus mérnökségről mint fejlődő területről
  - **Alapelvek**: Teljes kontextus megosztás, cselekvési döntés tudatosság, és kontextus ablak kezelése
  - **MCP Protokoll Összehangolás**: Hogyan kezeli az MCP design a kontextus mérnökség kihívásait
    - Kontextus ablak korlátok és progresszív betöltési stratégiák
    - Relevancia meghatározás és dinamikus kontextus lekérés
    - Többmodalitású kontextus kezelés és biztonsági megfontolások
  - **Megvalósítási Megközelítések**: Egyszálú vs. több ügynök architektúrák
    - Kontextus darabolás és prioritizálás technikák
    - Progresszív kontextus betöltés és tömörítési stratégiák
    - Rétegezett kontextus megközelítések és lekérdezési optimalizáció
  - **Mérés Keretrendszer**: Felmerülő metrikák a kontextus hatékonyságának értékelésére
    - Bemeneti hatékonyság, teljesítmény, minőség és felhasználói élmény megfontolások
    - Kísérleti megközelítések a kontextus optimalizálására
    - Hibaanalízis és fejlesztési módszertanok

#### Tananyag Navigáció Frissítések (README.md)
- **Fejlesztett Modul Struktúra**: Frissített tananyag táblázat új haladó témákkal
  - Hozzáadva Kontextus Mérnökség (5.14) és Egyedi Transzport (5.15) bejegyzések
  - Következetes formázás és navigációs linkek minden modulnál
  - Frissített leírások a jelenlegi tartalomkörhöz igazítva

### Könyvtár Struktúra Javítások
- **Névválasztási Egységesítés**: Átnevezve "mcp transport" -> "mcp-transport", hogy egységes legyen a többi haladó téma mappával
- **Tartalom Szervezés**: Minden 05-AdvancedTopics mappa most egységes névhasználatot követ (mcp-[téma])

### Dokumentáció Minőség Fejlesztések
- **MCP Specifikáció Összehangolás**: Minden új tartalom a aktuális MCP Specifikációra hivatkozik (2025-06-18)
- **Többnyelvű Példák**: Átfogó kódpéldák C#, TypeScript és Python nyelven

- **Vállalati fókusz**: Gyártásra kész minták és Azure felhőintegráció mindenütt
- **Vizualizált dokumentáció**: Mermaid diagramok az architektúra és folyamatelemzés számára

## 2025. augusztus 18.

### Dokumentáció átfogó frissítése - MCP 2025-06-18 szabványok

#### MCP biztonsági bevált gyakorlatok (02-Security/) - Teljes korszerűsítés
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Teljes átírás az MCP 2025-06-18 szabványhoz igazítva
  - **Kötelező követelmények**: Hivatalos specifikáció explicit KELL/NEM KELL követelményeinek hozzáadása világos vizuális jelzésekkel
  - **12 fő biztonsági gyakorlat**: Átalakítva 15 tétel helyett átfogó biztonsági területekre
    - Token biztonság és hitelesítés külső identitásszolgáltató integrációval
    - Munkamenet-kezelés és szállítási biztonság kriptográfiai követelményekkel
    - Mesterséges intelligencia-specifikus fenyegetésvédelem Microsoft Prompt Shields integrációval
    - Hozzáférés-vezérlés és jogosultságok a legkisebb jogosultság elve alapján
    - Tartalombiztonság és felügyelet Azure Content Safety integrációval
    - Ellátási lánc biztonság átfogó komponensellenőrzéssel
    - OAuth biztonság és Confused Deputy megelőzés PKCE megvalósítással
    - Incidens kezelés és helyreállítás automatizált képességekkel
    - Megfelelőség és irányítás szabályozási összehangolással
    - Fejlett biztonsági vezérlők nullatűz architektúrával
    - Microsoft biztonsági ökoszisztéma integráció átfogó megoldásokkal
    - Folyamatos biztonsági fejlődés adaptív gyakorlatokkal
  - **Microsoft biztonsági megoldások**: Fejlesztett integrációs útmutatók Prompt Shields, Azure Content Safety, Entra ID és GitHub Advanced Security esetén
  - **Megvalósítási erőforrások**: Átfogó erőforrás linkek kategorizálva Hivatalos MCP Dokumentáció, Microsoft Biztonsági Megoldások, Biztonsági Szabványok és Megvalósítási Útmutatók szerint

#### Fejlett biztonsági vezérlők (02-Security/) - Vállalati megvalósítás
- **MCP-SECURITY-CONTROLS-2025.md**: Teljes átstrukturálás vállalati szintű biztonsági keretrendszerrel
  - **9 átfogó biztonsági terület**: Bővítve az alap kontrolloktól részletes vállalati keretrendszerig
    - Fejlett hitelesítés és jogosultság Microsoft Entra ID integrációval
    - Token biztonság és Anti-Passthrough kontrollok átfogó érvényesítéssel
    - Munkamenet biztonsági kontrollok eltérítés elleni védelemmel
    - MI speciális biztonsági kontrollok prompt injekció és eszközméreggelés ellen
    - Confused Deputy támadás elleni védelem OAuth proxy biztonsággal
    - Eszköz végrehajtás biztonság szandboxoló és izolációs megoldásokkal
    - Ellátási lánc biztonsági kontrollok függőség ellenőrzéssel
    - Felügyelet és detektálás kontrollok SIEM integrációval
    - Incidens kezelés és helyreállítás automatizált képességekkel
  - **Megvalósítási példák**: Részletes YAML konfigurációs blokkok és kód példák hozzáadva
  - **Microsoft megoldások integrációja**: Átfogó Azure biztonsági szolgáltatások, GitHub Advanced Security és vállalati identitáskezelés lefedettsége

#### Fejlett témák biztonsága (05-AdvancedTopics/mcp-security/) - Gyártásra kész megvalósítás
- **README.md**: Teljes átírás vállalati biztonsági megvalósításhoz
  - **Jelenlegi szabványhoz igazítás**: Frissítve MCP Specifikáció 2025-06-18 kötelező biztonsági követelményekkel
  - **Fejlett hitelesítés**: Microsoft Entra ID integráció átfogó .NET és Java Spring Security példákkal
  - **MI biztonsági integráció**: Microsoft Prompt Shields és Azure Content Safety megvalósítás részletes Python példákkal
  - **Fejlett fenyegetéskezelés**: Átfogó megvalósítási példák a
    - Confused Deputy támadás megelőzésére PKCE és felhasználói hozzájárulás ellenőrzésével
    - Token áthaladás megelőzésével közönség-ellenőrzéssel és biztonságos token kezeléssel
    - Munkamenet eltérítés megelőzése kriptográfiai kötés és viselkedéselemzés által
  - **Vállalati biztonsági integráció**: Azure Application Insights monitorozás, fenyegetés észlelési csatornák, valamint ellátási lánc biztonság
  - **Megvalósítási ellenőrzőlista**: Világos kötelező és ajánlott biztonsági kontrollok Microsoft biztonsági ökoszisztéma előnyökkel

### Dokumentáció minőség és szabványok összehangolása
- **Specifikációs hivatkozások**: Frissítve az összes hivatkozás az aktuális MCP Specifikáció 2025-06-18 szerint
- **Microsoft biztonsági ökoszisztéma**: Fejlesztett integrációs útmutatók minden biztonsági dokumentációban
- **Gyakorlati megvalósítás**: Részletes kód példák hozzáadva .NET, Java és Python nyelvekben vállalati mintákkal
- **Erőforrás szervezés**: Átfogó kategorizálás hivatalos dokumentáció, biztonsági szabványok, megvalósítási útmutatók szerint
- **Vizuális jelzések**: Világos jelölés a kötelező követelmények és az ajánlott gyakorlatok között


#### Alapfogalmak (01-CoreConcepts/) - Teljes korszerűsítés
- **Protokoll verzió frissítés**: Frissítve az aktuális MCP Specifikáció 2025-06-18 dátumalapú verziószámozással (ÉÉÉÉ-HH-NN formátum)
- **Architektúra fejlesztés**: Gazdagított leírások gazdagított gazdagítással Hostokról, kliensekről és szerverekről, hogy tükrözzék az aktuális MCP architektúra mintákat
  - A hostokat mostantól világosan definiálták, mint AI alkalmazásokat, amelyek több MCP kliens kapcsolatot koordinálnak
  - A kliens leírások: protokoll csatlakozók, amelyek egy-egy szerver kapcsolatot tartanak fenn
  - Szerverek fejlesztve helyi és távoli telepítési forgatókönyvekkel
- **Primitivek átalakítása**: Teljes átstrukturálás szerver és kliens primitívekről
  - Szerver primitívek: Erőforrások (adatforrások), Promptek (sablonok), Eszközök (futtatható funkciók) részletes magyarázatokkal és példákkal
  - Kliens primitívek: Mintavétel (LLM kimenetek), Kiváltás (felhasználói bemenet), Naplózás (hibakeresés/megfigyelés)
  - Frissítve az aktuális felfedezési (`*/list`), lekérési (`*/get`), és végrehajtási (`*/call`) módszermintákra
- **Protokoll architektúra**: Bevezetve kétszintű architektúra modell
  - Adatréteg: JSON-RPC 2.0 alapok életciklus-kezeléssel és primitívekkel
  - Szállítási réteg: STDIO (helyi) és streamelhető HTTP SSE-vel (távoli) szállítási mechanizmusok
- **Biztonsági keretrendszer**: Átfogó biztonsági elvek, beleértve az egyértelmű felhasználói hozzájárulást, adatvédelmet, eszköz végrehajtási biztonságot és szállítási réteg biztonságot
- **Kommunikációs minták**: Frissített protokoll üzenetek az inicializáció, felfedezés, végrehajtás és értesítési folyamatokra vonatkozóan
- **Kód példák**: Megújított többnyelvű példák (.NET, Java, Python, JavaScript) az aktuális MCP SDK minták szerint

#### Biztonság (02-Security/) - Átfogó biztonsági átalakítás  
- **Szabvány összehangolás**: Teljesen összehangolva az MCP Specifikáció 2025-06-18 biztonsági követelményeivel
- **Hitelesítés fejlődése**: Dokumentált fejlődés egyedi OAuth szerverektől külső identitásszolgáltató delegációig (Microsoft Entra ID)
- **MI-specifikus fenyegetés elemzés**: Fejlesztett lefedettség a modern MI támadási irányokra
  - Részletes prompt injekciós támadás szcenáriók világos példákkal
  - Eszközméreg mechanizmusok és „rug pull” támadási minták
  - Kontextusablak méreg és modell összezavarási támadások
- **Microsoft MI biztonsági megoldások**: Átfogó lefedettség a Microsoft biztonsági ökoszisztémában
  - AI Prompt Shields fejlett észlelési, kiemelési és határolási technikákkal
  - Azure Content Safety integrációs minták
  - GitHub Advanced Security az ellátási lánc védelemhez
- **Fejlett fenyegetés mérséklés**: Részletes biztonsági vezérlők a
  - Munkamenet eltérítés ellen MCP specifikus támadás forgatókönyvekkel és kriptográfiai munkamenet azonosító követelményekkel
  - Confused deputy problémák MCP proxy forgatókönyvek esetén egyértelmű hozzájárulási követelményekkel
  - Token áthaladás sérülékenységek kötelező érvényesítési kontrollokkal
- **Ellátási lánc biztonság**: Bővített MI ellátási lánc lefedettség alappéldányokkal, beágyazási szolgáltatásokkal, kontextus szolgáltatókkal és harmadik fél API-kkal
- **Alapbiztonság**: Fejlesztett integráció vállalati biztonsági mintákkal beleértve a nullatűz architektúrát és a Microsoft biztonsági ökoszisztémát
- **Erőforrás szervezés**: Átfogó erőforrás hivatkozások kategorizálva típus szerint (Hivatalos Dokuk, Szabványok, Kutatás, Microsoft Megoldások, Megvalósítási Útmutatók)

### Dokumentáció minőség fejlesztések
- **Strukturált tanulási célok**: Fejlesztett tanulási célok specifikus, megvalósítható eredményekkel 
- **Kereszthivatkozások**: Hozzáadott linkek kapcsolódó biztonsági és alapfogalom témák között
- **Aktuális információk**: Frissített minden dátum hivatkozást és szabvány linket a jelenlegi szabványokra
- **Megvalósítási útmutatás**: Hozzáadott specifikus, megvalósítható megvalósítási irányelvek mindkét szakaszban

## 2025. július 16.

### README és navigációs fejlesztések
- Teljesen újraterveztük a tananyag navigációt a README.md-ben
- `<details>` tagek helyett hozzáférhetőbb táblázatos formátumot alkalmaztunk
- Új "alternative_layouts" mappában alternatív elrendezési lehetőségeket hoztunk létre
- Hozzáadtunk kártya alapú, füles stílusú és akordeon stílusú navigációs példákat
- Frissítettük a tárház struktúra szakaszt az összes legfrissebb fájl bevonásával
- Fejlesztettük a "Hogyan használd ezt a tananyagot" részt világos ajánlásokkal
- Frissítettük az MCP specifikáció hivatkozásokat a helyes URL-ekre mutatva
- Hozzáadtuk a Tanulmányi Kontextus Mérnökség szakaszt (5.14) a tananyag struktúrájához

### Tanulmányi útmutató frissítések
- Teljes mértékben átdolgoztuk a tanulmányi útmutatót az aktuális tárház struktúrához igazítva
- Új szakaszokat adtunk hozzá MCP kliensek és eszközök, valamint népszerű MCP szerverek témakörben
- Frissítettük a Vizualizált Tananyag Térképet, hogy pontosan tükrözze az összes témát
- Fejlesztettük a Fejlett témák leírását, hogy lefedje az összes szakosodott területet
- Frissítettük az Esettanulmányok szakaszt aktuális példák szerint
- Hozzáadtuk ezt a részletes változásnaplót

### Közösségi hozzájárulások (06-CommunityContributions/)
- Részletes információkat adtunk hozzá az MCP képgeneráló szervereiről
- Átfogó szakasz a Claude használatáról VSCode-ban
- Cline terminál kliens telepítési és használati útmutató hozzáadva
- Frissítettük az MCP kliens szakaszt minden népszerű kliens opcióval
- Fejlesztettük a hozzájárulási példákat pontosabb kódmintákkal

### Fejlett témák (05-AdvancedTopics/)
- Minden szakosodott témakönyvtárat szerveztünk egységes névhasználattal
- Hozzáadtunk kontextus mérnökségi anyagokat és példákat
- Foundry ügynök integrációs dokumentáció hozzáadva
- Fejlesztettük az Entra ID biztonsági integráció dokumentációját

## 2025. június 11.

### Első létrehozás
- Megjelent az MCP kezdőknek tananyag első verziója
- Létrehoztuk az összes 10 fő szakasz alapstruktúráját
- Megvalósítottuk a Vizualizált Tananyag Térképet a navigációhoz
- Hozzáadtunk kezdeti mintaprojekteket több programozási nyelven

### Kezdő lépések (03-GettingStarted/)
- Készítettük az első szerver megvalósítási példákat
- Hozzáadtunk kliens fejlesztési útmutatást
- Tartalmazza LLM kliens integrációs utasításokat
- Hozzáadtuk a VS Code integrációs dokumentációt
- Implementáltuk a Server-Sent Events (SSE) szerver példákat

### Alapfogalmak (01-CoreConcepts/)
- Részletes magyarázatot adtunk a kliens-szerver architektúráról
- Dokumentáltuk a kulcs protokoll komponenseket
- Dokumentáltuk az MCP üzenetküldési mintákat

## 2025. május 23.

### Tárház struktúra
- Inicializáltuk a tárházat alap könyvtár struktúrával
- Létrehoztuk a README fájlokat minden fő szakasz számára
- Felállítottuk a fordítási infrastruktúrát
- Hozzáadtunk képi elemeket és diagramokat

### Dokumentáció
- Elkészítettük az első README.md-t tananyag áttekintéssel
- Hozzáadtuk a CODE_OF_CONDUCT.md és a SECURITY.md-t
- Beállítottuk a SUPPORT.md-t segítségkérés útmutatással
- Létrehoztuk a kezdeti tanulmányi útmutató struktúrát

## 2025. április 15.

### Tervezés és keretrendszer
- Kezdeti tervezés az MCP kezdőknek tananyaghoz
- Meghatároztuk a tanulási célokat és célközönséget
- Vázoltuk a tananyag 10 szakaszból álló struktúráját
- Fejlesztettük a koncepcionális keretrendszert példákhoz és esettanulmányokhoz
- Elkészítettük a kezdeti prototípuspéldákat kulcsfogalmakhoz

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->