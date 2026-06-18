# Változásnapló: MCP kezdőknek tananyag

Ez a dokumentum a Model Context Protocol (MCP) kezdőknek tananyagában történt összes jelentős változást rögzíti. A változtatások fordított időrendi sorrendben vannak dokumentálva (a legújabb változások először).

## 2026. június 16.

### MCP specifikáció összehangolása és mintaellenőrzés

Ellenőriztük a tananyagot a jelenlegi **MCP Specification 2025-11-25** és a legújabb hivatalos SDK-k alapján, majd kijavítottuk a maradék elavult specifikációra való hivatkozásokat, és megerősítettük, hogy a fő minták még mindig buildelnek és futnak.

#### Specifikáció verzió javítások (2025-06-18 / 2025-03-26 → 2025-11-25)

Frissítettük az angol tartalmakat, ahol még mindig azt állították, hogy egy régebbi specifikációrevízió a *jelenlegi/legfrissebb* szabvány, és átirányítottuk a linkeket a kanonikus `modelcontextprotocol.io` specifikációs útvonalakra:
- **05-AdvancedTopics/mcp-security/README.md**: Frissítettük a "Current Standard" bannert, bevezetőt, az alapvető biztonsági elveket tartalmazó fejezetcímet, a kötelező követelményeket, a Microsoft Entra ID szekciót, a Hivatkozások & Erőforrások linkjeit és a záró biztonsági közleményt (8 hivatkozás) a 2025-11-25 szerinti állapotra
- **05-AdvancedTopics/mcp-transport/README.md**: Frissítettük a További források specifikációs linkjét és a "Current Standard" bannert a 2025-11-25 verzióra
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Kicseréltük a régi `2025-03-26` biztonság-és-bizalom linket a jelenlegi 2025-11-25 biztonsági gyakorlatok oldalára
- **03-GettingStarted/14-sampling/README.md**: Frissítettük a hivatalos mintavételezési dokumentáció linkjét a 2025-11-25 verzióra
- **03-GettingStarted/05-stdio-server/README.md**: Frissítettük a jelen idejű „jelenlegi MCP specifikáció” hivatkozást és a További források specifikációs linkjét a 2025-11-25 verzióra (a történelmi SSE-levonulási megjegyzések érintetlenek maradtak a pontosság érdekében)

#### Minták érvényesítése a jelenlegi SDK-k ellen

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` telepítette a `@modelcontextprotocol/sdk@1.29.0` verziót; `tsc --noEmit` hibamentesen lefutott — a meglévő `McpServer`/`StdioServerTransport` API-k érvényesek maradtak
- **Python (03-GettingStarted/01-first-server/solution/python)**: Egy különálló `.venv` alatt validálva `mcp[cli]` (1.27.2) verzióval; `py_compile` átment, a `FastMCP.list_tools()` helyesen visszaadta az `add` és `subtract` eszközöket
- Megerősítettük, hogy minden mintában használt `@modelcontextprotocol/sdk` verziótartomány (`>=1.26.0` / `^1.26.0` / `^1.27.0`) tisztán a jelenlegi `1.29.0` verzióra oldódik fel API törés nélkül

#### Függőség pin összehangolás (verziórések lezárása)

Frissítettük az elavult SDK pin beállításokat, hogy minden minta a jelenlegi MCP kiadást kövesse, megfelelve a repóban általános szabványnak:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Frissítettük a `@modelcontextprotocol/sdk` verziót `^1.8.0`-ról `>=1.26.0`-ra és frissítettük az elavult `"updated for MCP 2025-06-18"` csomagleírást `"aligned with MCP Specification 2025-11-25"` értékre
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** és **lab4/code/github_mcp_server/pyproject.toml**: Frissítettük a pontos pin `mcp==1.23.0` → `mcp>=1.26.0`; újrageneráltuk mindkét `uv.lock` fájlt (`uv lock`), hogy a lockfile-ok a jelenlegi `mcp 1.27.2` felé oldódjanak fel és összehangban maradjanak a leírásokkal

#### Tananyagi hézag elemzés — Legutóbbi specifikáció funkciólefedettség

Ellenőriztük, hogy a tananyag már lefedi az MCP 2025-11-25-ben bevezetett/bővített összes primitívet, így nincs tartalmi hiány:
- **Mintavételezés**: 03-GettingStarted/14-sampling és 05-AdvancedTopics/mcp-sampling
- **Előhívás (beleértve URL módot)**: Dokumentált 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt
- **Gyökerek**: Dokumentált 00-Introduction, 01-CoreConcepts, és 05-AdvancedTopics/mcp-root-contexts alatt
- **Feladatok (kísérleti, hosszú futású műveletek)**: Dokumentált 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt
- **Eszköz annotációk** (`readOnlyHint` / `destructiveHint`): Dokumentált 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt

### Biztonsági szilárdítás és függőség sebezhetőség javítása

Végeztem egy teljes biztonsági ellenőrzést minden függőség leírásban és a minta forráskódon, majd orvosoltam minden jelentett npm figyelmeztetést és egy kód szintű problémát. Javítás után az `npm audit` **0 sebezhetőséget** jelent minden auditált könyvtárban.

#### npm függőségi sebezhetőségek (átmenetiek) — Javítva

Ellenőriztük a 15 beküldött `package-lock.json` fájlt. A sebezhetőségek az MCP Inspector fejlesztői eszköz, az OpenAI kliens és az MCP SDK által behúzott átmeneti függőségekben voltak; mind most megoldottak a minták megtörése nélkül:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** és **lab3/code/weather_mcp/inspector**: Frissítettük az `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ami törölte a beépített `ajv`, `brace-expansion`, `diff`, `path-to-regexp` és `ws` figyelmeztetéseket. Hozzáadtunk egy npm `overrides` bejegyzést, amely kényszeríti a javított `shell-quote@1.8.4` használatát a `concurrently` által hordozott maradék kritikus figyelmeztetés megszüntetésére; újrageneráltuk mindkét lockfájlt (most 0 sebezhetőség)
- **03-GettingStarted/samples/typescript**: `npm audit fix` frissítette az átmeneti `qs` (közepes) verziót egy javított kiadásra
- **03-GettingStarted/samples/javascript**: `npm audit fix` frissítette az átmeneti `hono` (közepes) verziót egy javított kiadásra
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` frissítette az átmeneti `form-data` (magas) verziót egy javított kiadásra
- **03-GettingStarted/11-simple-auth/solution/typescript**: Elkészítettük a hiányzó `package-lock.json`-t, így a projekt reprodukálható és auditálható (0 sebezhetőség)

#### Kód szintű biztonsági javítás (OWASP A03: Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eltávolítottuk a `shell=True` opciót az `open_in_vscode` eszközből. A korábbi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lehetővé tette, hogy mappautakban lévő shell metakaraktereket a `cmd.exe` értelmezze (parancsinjekciós veszély). Most közvetlenül a feloldott `Code.exe`-t indítja el a mappa argumentumként való megadásával — nincs shell — ami funkcionálisan egyenértékű és biztonságos

#### Python függőség ellenőrzés

- Minden Python követelmény lista át lett vizsgálva `pip-audit`-tal. A `05-AdvancedTopics` és a `03-GettingStarted/samples/python` **nem jeleztek ismert sebezhetőséget** (az ő `mcp` / `httpx` / `pydantic` / `python-dotenv` tartományaik a jelenlegi javított verziókra oldódnak fel)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` egy átmeneti függőségként lévő **`werkzeug` 3.1.1** verziót jelzett három `safe_join` Windows eszköznév DoS figyelmeztetéssel — `CVE-2025-66221`, `CVE-2026-21860` és `CVE-2026-27199` (mind javítva 3.1.6-ban). Hozzáadtunk egy explicit biztonsági pin-t `werkzeug>=3.1.6`-ra, hogy a javított verzió oldódjon fel; ellenőriztük, hogy a feltétel tisztán oldódik a `chainlit` / `mcp` / `semantic-kernel` környezetben

### Terméknév átalakítás

Frissítettük az összes tananyagtartalmat a Microsoft terméknév átalakításának megfelelően:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Frissítettük a Discord közösségi linket
- **AGENTS.md**: Frissítettük a Discord szerver hivatkozást
- **README.md**: Frissítettük a technológiai ökoszisztéma hivatkozásokat
- **study_guide.md**: Frissítettük az esettanulmányra utaló hivatkozásokat
- **05-AdvancedTopics/README.md**: Frissítettük az 5.13-as modul címét és leírását
- **05-AdvancedTopics/mcp-integration/README.md**: Frissítettük a szakaszcímet és leírást
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Teljes modulcím és tartalom frissítés
- **05-AdvancedTopics/mcp-security-entra/README.md**: Frissítettük a kereszthivatkozás linket
- **07-LessonsfromEarlyAdoption/README.md**: Frissítettük az esettanulmány hivatkozásokat
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Frissítettük a 9. szakasz fejléceit, jelvényeit és képességeit
- **08-BestPractices/README.md**: Frissítettük a Discord közösségi linket
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Frissítettük a Discord csatorna hivatkozását
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Frissítettük a modell telepítési hivatkozást
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Frissítettük az AI Szolgáltatások táblázatot
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Frissítettük az erőforrás hivatkozásokat

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Frissítettük a fő tananyag hivatkozásait
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Frissítettük a modul címét, áttekintését és minden modulfejléct
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Frissítettük a címet, tanulási célokat, telepítési utasításokat és erőforrásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Frissítettük a címet, tanulási célokat, MCP hostok táblázatát és kereszthivatkozásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Frissítettük a címet, jelvényeket, előfeltételeket és erőforrásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Frissítettük az Agent Builder hivatkozásokat és visszajelző linket
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Frissítettük az előfeltételeket és bővítmény hivatkozásokat

---

## 2026. április 11.

### Új lecke, dokumentáció javítások és függőségfrissítések

#### Új tananyagtartalom hozzáadva

**05-ös modul - Haladó témák**
- **Lecke 5.17: Ellenséges többszereplős érvelés MCP-vel** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Új átfogó útmutató, amely lefedi az ellenséges vita mintázatot többszereplős rendszerek számára
  - Mermaid architektúra diagram: két ügynök → közös MCP szerver → vita átirata → bíró → ítélet
  - Közös MCP eszközszerver (`web_search` + `run_python`) Pythonban és TypeScriptben megvalósítva
  - Ellentétes rendszerparancsok (MELLETT / ELLEN / Bíró) explicit eszközhasználati követelményekkel
  - Vita irányító Pythonban, TypeScriptben és C#-ban a körök kezelésére és érvelések irányítására
  - MCP `ClientSession` bekötése az irányító eszközhívásokhoz
  - Használati eset táblázat (hallucináció felismerés, fenyegetés modellezés, API tervezés felülvizsgálat, tényellenőrzés, technológia kiválasztás)
  - Biztonsági megfontolások: sandbox végrehajtás, eszközhívás érvényesítés, sebességkorlátozás, audit naplózás
  - Strukturált gyakorlat három gyakorlati forgatókönyvvel (kódfelülvizsgálat, architektúra döntés, tartalom moderálás)

#### Dokumentáció javítások

**03-as modul - Kezdés**
- **05-stdio-server/README.md**: Javítottuk az hiányos TypeScript stdio szerver példát — hozzáadtuk a hiányzó transport példányosítást (`new StdioServerTransport()`) és a `server.connect(transport)` hívást, hogy összhangban legyen a Python és .NET példákkal ugyanebben a szakaszban
- **14-sampling/README.md**: Javítottuk az elírást — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Tananyag frissítések

**Fő README.md**
- Hozzáadtuk a 5.17-es bejegyzést (Ellenséges többszereplős érvelés MCP-vel) a tananyag táblázathoz közvetlen linkkel az új leckéhez

**05-AdvancedTopics/README.md**
- Hozzáadtuk a 5.17-es leckesort a leckék táblázatához

**study_guide.md**
- Hozzáadtuk az Ellenséges többszereplős érvelés témát a haladó témák gondolattérképéhez és szöveges leírásához

#### Kód és biztonság javítások

**05-ös modul - Ellenséges ügynökök (`mcp-adversarial-agents`)**
- **Biztonsági javítás — parancsinjekció**: Kicseréltük a TypeScript `run_python` eszközben az `execSync` shell interpolációt `execFile` + `promisify` megvalósításra, megszüntetve a parancsinjekciós felületet (a LLM által vezérelt kód most parancssori argumentumként, shell nélkül kerül átadásra)
- **MCP eszköz hurok bekötés**: Frissítettük a Python vita lebonyolítót, hogy az `AsyncAnthropic` klienset használja (a blokkoló szinkron `Anthropic` helyett), élő `ClientSession`-t adjon át közvetlenül minden ügynök körnek, eszköz definíciókat kérjen le minden körben `session.list_tools()` segítségével, és a `tool_use` blokkokat `session.call_tool()` hívással küldje el egy hurokban, amíg a modell végleges szövegválaszt nem ad

#### Függőség frissítések

- Több csomagban (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows) a `hono` verziót 4.12.12-re emeltük
- A TypeScript csomagokban a `@hono/node-server` verziót 1.19.11-ről 1.19.13-ra frissítettük
- A Python csomagokban (10-StreamliningAIWorkflows laborok 3 és 4) a `cryptography` verziót 46.0.5-ről 46.0.7-re emeltük
- A 10-StreamliningAIWorkflows inspectorban a `lodash` verziót 4.17.23-ról 4.18.1-re frissítettük

#### Fordítások

- 48+ nyelv fordításait szinkronizáltuk a legfrissebb forrásváltozásokkal (i18n frissítés)

---

## 2026. február 5.

### Egy repository szintű validálás és navigációs fejlesztések

#### Új tananyag tartalom hozzáadva

**03-as modul - Kezdő lépések**
- **12-mcp-hosts/README.md**: Új átfogó útmutató MCP hostok beállításához
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigurációs példák
  - JSON konfigurációs sablonok minden fő hosthoz
  - Átviteli típusokat összehasonlító táblázat (stdio, SSE/HTTP, WebSocket)
  - Gyakori kapcsolódási problémák elhárítása
  - Biztonsági bevált gyakorlatok a host konfigurációhoz

- **13-mcp-inspector/README.md**: Új hibakeresési útmutató az MCP Inspectorhoz
  - Telepítési módok (npx, globális npm, forrásból)
  - Szerverhez kapcsolódás stdio és HTTP/SSE protokollokon keresztül
  - Tesztelési eszközök, források és prompt munkafolyamatok
  - VS Code integráció az MCP Inspectorral
  - Gyakori hibák és megoldásaik

**04-es modul - Gyakorlati megvalósítás**
- **pagination/README.md**: Új lapozási megvalósítási útmutató
  - Python, TypeScript, Java alapú kurzor-alapú lapozási minták
  - Ügyféloldali lapozási kezelés
  - Kurzor tervezési stratégiák (átlátszatlan vs. strukturált)
  - Teljesítmény optimalizálási ajánlások

**05-ös modul - Haladó témák**
- **mcp-protocol-features/README.md**: Új protokoll funkciók mély elemzése
  - Előrehaladási értesítések megvalósítása
  - Kérés megszakítási minták
  - Erőforrás sablonok URI mintákkal
  - Szerver életciklus kezelése
  - Naplózási szint vezérlés
  - Hibakezelési minták JSON-RPC kódokkal

#### Navigációs javítások (24+ fájl frissítve)

**Fő modul README fájlok**
Most már mind az első lecke, mind a következő modul hivatkozásait tartalmazzák

**02-Security al-fájlok**
Mind az 5 kiegészítő biztonsági dokumentum tartalmaz "Mi következik" navigációt:

**09-Esettanulmány fájlok**
Az összes esettanulmány fájl most szekvenciális navigációval rendelkezik:

**10-StreamliningAI laborok**
Hozzáadva "Mi következik" rész a 10-es modul áttekintéséhez és a 11-eshez

#### Kód és tartalom javítások

**SDK és függőség frissítések**
Üres openai verzió javítva `^4.95.0`-ra
SDK frissítve `^1.8.0`-ról `>=1.26.0`-ra
MCP verzió megkötések frissítve `>=1.26.0`-ra

**Kód javítások**
Érvénytelen modell `gpt-4o-mini` javítva `gpt-4.1-mini`-re

**Tartalom javítások**
Törött link javítva `READMEmd` → `README.md`, tananyag fejléc javítva `Module 1-3` → `Module 0-3`, kis- és nagybetű érzékeny útvonal javítva
Sérült, duplikált Esettanulmány 5 tartalom eltávolítva

**Kezdői útmutatás javítások**
Megfelelő bevezető, tanulási célok, és előfeltételek hozzáadva kezdők számára

#### Tananyag frissítések

**Fő README.md**
Hozzáadva a 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Lapozás), 5.16 (Protokoll funkciók) bejegyzések a tananyag táblázathoz

**Modul README-k**
Hozzáadva a 12. és 13. leckék a leckelista végéhez
Hozzáadva a Gyakorlati útmutatók rész lapozás hivatkozással
Hozzáadva 5.15 (Egyedi Átvitel) és 5.16 (Protokoll funkciók) leckék

**study_guide.md**
Frissítve az elmetérkép az összes új témával: MCP Hostok beállítása, MCP Inspector, Lapozási stratégiák, Protokoll funkciók mélyelemzése

## 2026. január 28.

### MCP Specifikáció 2025-11-25 megfelelőségi áttekintés

#### Alapfogalmak továbbfejlesztése (01-CoreConcepts/)
- **Új kliens primitív - Roots**: Kiterjedt dokumentáció hozzáadva a Roots kliens primitívhez, amely lehetővé teszi a szerverek számára a fájlrendszer határok és hozzáférési jogosultságok megértését
- **Eszköz annotációk**: Dokumentáció az eszköz viselkedési annotációkról (`readOnlyHint`, `destructiveHint`) a jobb eszköz végrehajtási döntésekhez
- **Eszköz hívás mintavételezés során**: Mintavételezés dokumentáció frissítve `tools` és `toolChoice` paraméterekkel a modell-vezérelt eszközhívásokhoz mintavételezés kéréskor
- **URL mód Elicitation**: Dokumentáció URL alapú elindításról szerver által kezdeményezett külső webes interakciókhoz
- **Feladatok (kísérleti)**: Új rész kísérleti Feladatok funkcióról, amely tartós végrehajtási csomagokat és elhalasztott eredmény lekérést támogat
- **Ikon támogatás**: Megjegyezve, hogy eszközök, erőforrások, erőforrás sablonok és promptok ikont is tartalmazhatnak mint további metaadat

#### Dokumentáció frissítések
- **README.md**: Hozzáadva MCP Specifikáció 2025-11-25 verzió és dátum-alapú verziók magyarázata
- **study_guide.md**: Tananyag térkép frissítve Feladatok és Eszköz annotációk témakörökkel az Alapfogalmakban; dokumentum időbélyeg frissítve

#### Specifikáció megfelelőség ellenőrzése
- **Protokoll verzió**: Minden dokumentáció hivatkozás megfelel a MCP Specifikáció 2025-11-25-nek
- **Architektúra igazolás**: Két rétegű architektúra (Adat réteg + Átvitel réteg) dokumentáció helyessége megerősítve
- **Primitívek dokumentációja**: Validálva szerver primitívek (Erőforrások, Promptok, Eszközök) és kliens primitívek (Mintavételezés, Elicitation, Naplózás, Roots)
- **Átviteli mechanizmusok**: STDIO és streamelhető HTTP átviteli protokoll dokumentációjának helyessége ellenőrizve
- **Biztonsági iránymutatás**: Megfelelés a jelenlegi MCP Biztonsági Legjobb Gyakorlat dokumentációnak igazolva

#### Fő MCP 2025-11-25 funkciók dokumentálva
- **OpenID Connect Discovery**: Hitelesítő szerver felfedezése OIDC használatával
- **OAuth kliens azonosító metaadat dokumentumok**: Ajánlott kliens regisztrációs mechanizmus
- **JSON Schema 2020-12**: MCP séma definíciók alapértelmezett nyelvezete
- **SDK szintezés**: Formalizált követelmények az SDK funkció támogatásra és karbantartásra
- **Kormányzati struktúra**: Formalizált Működési csoportok és Érdeklődési csoportok az MCP kormányzásban

### Biztonsági dokumentáció fő frissítése (02-Security/)

#### MCP Biztonsági Csúcstalálkozó Műhely (Sherpa) integráció
- **Új gyakorlati képzési forrás**: Átfogó integráció hozzáadva a [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)-val az összes biztonsági dokumentációban
- **Expedíciós útvonal lefedés**: Dokumentált teljes tábortábortól a csúcsig tartó előrehaladás
- **OWASP megfelelés**: Minden biztonsági iránymutatás most az OWASP MCP Azure Security Guide kockázatokat térképezi

#### OWASP MCP Top 10 integráció
- **Új szakasz**: OWASP MCP Top 10 biztonsági kockázatok táblázata hozzáadva az alap Security README-hez az Azure ellenszerek feltüntetésével
- **Kockázatorientált dokumentáció**: mcp-security-controls-2025.md frissítve OWASP MCP kockázat hivatkozásokkal minden biztonsági területhez
- **Referencia architektúra**: Hivatkozva az OWASP MCP Azure Security Guide referencia architektúrájára és megvalósítási mintákra

#### Frissített biztonsági fájlok
- **README.md**: Hozzáadva Sherpa műhely áttekintés, expedíciós útvonal tábla, OWASP MCP Top 10 kockázati összefoglaló, és gyakorlati képzés szakasz
- **mcp-security-controls-2025.md**: Fejléc frissítve 2026 februárra, OWASP kockázatok (MCP01-MCP08) hozzáadva, specifikáció verziókonzisztencia javítva
- **mcp-security-best-practices-2025.md**: Sherpa és OWASP források szakasz hozzáadva, időbélyeg frissítve
- **mcp-best-practices.md**: Gyakorlati képzés rész Sherpa és OWASP hivatkozásokkal bővítve
- **azure-content-safety-implementation.md**: OWASP MCP06 hivatkozás, Sherpa tábor 3 összehangolás, és további források szakasz hozzáadva

#### Új erőforrás linkek hozzáadva
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Egyéni OWASP MCP kockázati oldalak (MCP01-MCP10)

### Tananyag szintű MCP Specifikáció 2025-11-25 összehangolás

#### 03-as modul - Kezdő lépések
- **SDK dokumentáció**: Go SDK hozzáadva a hivatalos SDK listához; minden SDK hivatkozás frissítve a MCP Specifikáció 2025-11-25 szerint
- **Átviteli tisztázás**: STDIO és HTTP Streaming átviteli leírások frissítve explicitebb specifikációs hivatkozásokkal

#### 04-es modul - Gyakorlati megvalósítás
- **SDK frissítések**: Go SDK hozzáadva; SDK lista frissítve verzió megjelöléssel
- **Engedélyezési specifikáció**: MCP Engedélyezési specifikáció linkje frissítve a 2025-11-25 verzióra

#### 05-ös modul - Haladó témák
- **Új funkciók**: Megjegyzés hozzáadva az MCP Specifikáció 2025-11-25 új funkcióiról (Feladatok, Eszköz annotációk, URL mód Elicitation, Roots)
- **Biztonsági források**: OWASP MCP Top 10 és Sherpa műhely linkek hozzáadva kiegészítő referencia anyagként

#### 06-os modul - Közösségi hozzájárulások
- **SDK lista**: Swift és Rust SDK-k hozzáadva; specifikáció link frissítve 2025-11-25-re
- **Specifikáció hivatkozás**: MCP Specifikáció link direkt URL-re frissítve

#### 07-es modul - Korai alkalmazási tapasztalatok
- **Erőforrás frissítések**: MCP Specifikáció 2025-11-25 és OWASP MCP Top 10 hozzáadva a kiegészítő forrásokhoz

#### 08-as modul - Legjobb gyakorlatok
- **Spec verzió**: MCP Specifikáció hivatkozás frissítve 2025-11-25-re
- **Biztonsági források**: OWASP MCP Top 10 és Sherpa műhely hozzáadva a kiegészítő anyagokhoz

#### 10-es modul - AI munkafolyamatok egyszerűsítése
- **Jelvény frissítés**: MCP verzió jelvény SDK verzióról (1.9.3) specifikáció verzióra (2025-11-25) módosítva
- **Erőforrás linkek**: MCP Specifikáció link frissítve; OWASP MCP Top 10 hozzáadva

#### 11-es modul - MCP szerver gyakorlati laborok
- **Specifikáció hivatkozás**: MCP Specifikáció link 2025-11-25 verzióra frissítve
- **Biztonsági források**: OWASP MCP Top 10 felvéve hivatalos erőforrások közé

## 2025. december 18.

### Biztonsági dokumentáció frissítés - MCP Specifikáció 2025-11-25

#### MCP Biztonsági Legjobb Gyakorlatok (02-Security/mcp-best-practices.md) - Specifikáció verzió frissítés
- **Protokoll verzió frissítés**: Frissítve a legújabb MCP Specifikáció 2025-11-25-re (2025. november 25-i kiadás)
  - Minden verzióhivatkozás frissítve 2025-06-18-ról 2025-11-25-re
  - Dokumentum dátuma frissítve 2025. augusztus 18-ról 2025. december 18-ra
  - Ellenőrizve, hogy minden specifikáció URL a jelenlegi dokumentációra mutat
- **Tartalom validálása**: Átfogó érvényesítés a legújabb biztonsági szabványoknak megfelelően
  - **Microsoft Biztonsági Megoldások**: Ellenőrizve a Prompt Shield terminológia (korábbi "Jailbreak kockázat észlelés"), Azure Content Safety, Microsoft Entra ID és Azure Key Vault aktuálissága
  - **OAuth 2.1 biztonság**: Megerősítve, hogy a legújabb OAuth biztonsági legjobb gyakorlatoknak megfelelő
  - **OWASP szabványok**: Megerősítve, hogy az OWASP Top 10 LLM-ekre vonatkozó hivatkozások naprakészek
  - **Azure szolgáltatások**: Ellenőrizve minden Microsoft Azure dokumentációs link és best practice érvényessége
- **Szabványosítás összhang**: Az összes hivatkozott biztonsági szabvány aktuális
  - NIST AI Kockázatkezelési keretrendszer
  - ISO 27001:2022
  - OAuth 2.1 biztonsági legjobb gyakorlatok
  - Azure biztonsági és megfelelőségi keretrendszerek
- **Megvalósítási források**: Ellenőrizve az összes útmutató link és forrás
  - Azure API Management hitelesítési minták
  - Microsoft Entra ID integrációs útmutatók
  - Azure Key Vault titkok kezelése
  - DevSecOps csövek és monitorozási megoldások

### Dokumentáció minőségbiztosítás
- **Specifikációs megfelelőség**: Biztosítva, hogy minden kötelező MCP biztonsági követelmény (KÖTELEZŐ/NEM KÖTELEZŐ) megfelel a legújabb specifikációnak
- **Források aktualitása**: Ellenőrizve minden külső link Microsoft dokumentációkra, biztonsági szabványokra, és útmutatókra
- **Legjobb gyakorlatok lefedettsége**: Megerősítve, hogy teljes körű lefedettséget biztosít az autentikáció, engedélyezés, AI-specifikus fenyegetések, ellátási lánc biztonság és vállalati minták területén

## 2025. október 6.

### Kezdő lépések rész bővítése – Haladó szerverhasználat és egyszerű hitelesítés

#### Haladó szerverhasználat (03-GettingStarted/10-advanced)
- **Új fejezet hozzáadva**: Átfogó útmutató haladó MCP szerverhasználathoz, beleértve a szabályos és alacsony szintű szerver architektúrákat.
  - **Szabályos vs. alacsony szintű szerver**: Részletes összehasonlítás és kód példák Pythonban és TypeScriptben mindkét megközelítésre.
  - **Handler alapú tervezés**: Magyarázat a handler alapú eszköz/erőforrás/prompt kezelésről a skálázható, rugalmas szerver megvalósításokhoz.
  - **Gyakorlati minták**: Valós példák, ahol az alacsony szintű szerver minták előnyösek haladó funkciók és architektúrák esetén.
#### Egyszerű hitelesítés (03-GettingStarted/11-simple-auth)
- **Új fejezet hozzáadva**: Lépésről lépésre útmutató egyszerű hitelesítés megvalósításához MCP szervereken.
  - **Hitelesítési fogalmak**: Egyértelmű magyarázat a hitelesítés és az engedélyezés, valamint a hitelesítő adatok kezelésének különbségeiről.
  - **Alapvető hitelesítés megvalósítása**: Köztes réteg alapú hitelesítési minták Pythonban (Starlette) és TypeScriptben (Express), kód példákkal.
  - **Haladó biztonság felé haladás**: Útmutatás az egyszerű hitelesítés elkezdéséhez és továbblépéshez OAuth 2.1-re és RBAC-ra, hivatkozásokkal a fejlett biztonsági modulokra.

Ezek a kiegészítések gyakorlati, kézzel fogható útmutatást nyújtanak a robosztusabb, biztonságosabb és rugalmasabb MCP szerver implementációk felépítéséhez, hidat képezve az alapfogalmak és a fejlett gyártási minták között.

## 2025. szeptember 29.

### MCP szerver adatbázis integrációs laborok - Átfogó gyakorlati tanulási út

#### 11-MCPServerHandsOnLabs - Új teljes adatbázis integrációs tananyag
- **Teljes 13 laboros tanulási út**: Átfogó gyakorlati tananyag hozzáadva termelésre kész MCP szerverek PostgreSQL adatbázisintegrációval történő építéséhez  
  - **Valós világ implementáció**: Zava Retail elemzési esettanulmány, amely vállalati szintű mintákat mutat be  
  - **Strukturált tanulási előrehaladás**:
    - **Laborok 00-03: Alapok** – Bevezető, alap architektúra, biztonság és multibérlő támogatás, környezet beállítása
    - **Laborok 04-06: MCP szerver építése** – Adatbázis-tervezés és séma, MCP szerver implementáció, eszközfejlesztés  
    - **Laborok 07-09: Haladó funkciók** – szemantikus keresés integráció, tesztelés és hibakeresés, VS Code integráció
    - **Laborok 10-12: Termelés és legjobb gyakorlatok** – Telepítési stratégiák, monitoring és megfigyelhetőség, legjobb gyakorlatok és optimalizálás  
  - **Vállalati technológiák**: FastMCP keretrendszer, PostgreSQL pgvector-rel, Azure OpenAI beágyazások, Azure Container Apps, Application Insights
  - **Haladó funkciók**: Sor szintű biztonság (RLS), szemantikus keresés, több bérlős adathozzáférés, vektor beágyazások, valós idejű monitoring

#### Terminológia egységesítés – modulból laborra váltás  
- **Átfogó dokumentáció frissítés**: Az összes 11-MCPServerHandsOnLabs README fájl szisztematikus frissítése a „Labor” kifejezés használatára a „Modul” helyett
  - **Szekciófejlécek**: Mindenütt a „Mit tartalmaz ez a modul” átírása „Mit tartalmaz ez a labor” formára
  - **Tartalmi leírás**: „Ez a modul biztosít...” szöveg módosítása „Ez a labor biztosít...” formára a dokumentációban
  - **Tanulási célok**: „A modul végére...” felirat módosítása „A labor végére...”  
  - **Navigációs hivatkozások**: Minden „Modul XX:” utalás „Labor XX:” formára váltása a kereszthivatkozásokban és navigációban  
  - **Teljesítés nyomon követése**: „A modul befejezése után...” frissítése „A labor befejezése után...” formára  
  - **Technikai hivatkozások megőrzése**: A Python modul hivatkozások megtartása konfigurációs fájlokban (pl. `"module": "mcp_server.main"`)

#### Tanulmányi útmutató fejlesztés (study_guide.md)
- **Vizuális tananyag térkép**: Új „11. Adatbázis integrációs laborok” szekció hozzáadása részletes laborstruktúra megjelenítéssel
- **Társtruktúra**: A tízről tizenegy fő szekcióra bővítés, részletes 11-MCPServerHandsOnLabs leírással
- **Tanulási útmutatás**: Navigációs útmutatók bővítése a 00-11. szekciók lefedésére  
- **Technológiai lefedettség**: FastMCP, PostgreSQL, Azure szolgáltatások integrációjának részletei  
- **Tanulási eredmények**: Kiemelésre került a termelésre kész szerverfejlesztés, adatbázisintegrációs minták és vállalati biztonság

#### Fő README struktúra fejlesztése  
- **Labor alapú terminológia**: A 11-MCPServerHandsOnLabs fő README.md fájl egyenletesen a „Labor” struktúrát használja  
- **Tanulási út szervezése**: Világos előrehaladás az alapfogalmakból a haladó megvalósításon át a gyártási telepítésig  
- **Valós világ fókusz**: Gyakorlati, kézzel fogható tanulás vállalati szintű mintákkal és technológiákkal

### Dokumentáció minőség és konzisztencia fejlesztések  
- **Gyakorlati tanulás hangsúly**: Gyakorlati, laboralapú megközelítés hangsúlyozása az egész dokumentációban  
- **Vállalati minták fókusza**: Termelésre kész megvalósítások és vállalati biztonsági szempontok kiemelése  
- **Technológiai integráció**: Modern Azure szolgáltatások és AI integrációs minták átfogó lefedése  
- **Tanulási előrehaladás**: Világos, strukturált út az alapfogalmakból a termelési telepítésig

## 2025. szeptember 26.

### Esettanulmányok fejlesztése – GitHub MCP Registry integráció

#### Esettanulmányok (09-CaseStudy/) – Ökoszisztéma fejlesztési fókusz  
- **README.md**: Jelentős bővítés átfogó GitHub MCP Registry esettanulmánnyal  
  - **GitHub MCP Registry esettanulmány**: Új, részletes esettanulmány a GitHub MCP Registry 2025 szeptemberi indulásáról  
    - **Probléma elemzés**: Részletes vizsgálat a fragmentált MCP szerver felderítés és telepítés kihívásairól  
    - **Megoldás architektúra**: GitHub központosított regisztrációs megközelítése egylépéses VS Code telepítéssel  
    - **Üzleti hatás**: Mérhető fejlődés a fejlesztői onboardingban és termelékenységben  
    - **Stratégiai érték**: Moduláris ügynök telepítési és eszközök közötti interoperabilitás fókuszálása  
    - **Ökoszisztéma fejlesztés**: Alapplatform pozícionálás az ügynökszerű integrációhoz  
  - **Esettanulmány struktúra bővítés**: Az összes hét esettanulmány egységes formázással és átfogó leírásokkal frissítve  
    - Azure AI Utazási ügynökök: Több ügynök koordinációja  
    - Azure DevOps integráció: Munkafolyamat automatizálás  
    - Valós idejű dokumentum lekérdezés: Python konzolos kliens megvalósítás  
    - Interaktív tanulmányi terv generátor: Chainlit beszélgető webalkalmazás  
    - Szerkesztőbe épített dokumentáció: VS Code és GitHub Copilot integráció  
    - Azure API menedzsment: Vállalati API integrációs minták  
    - GitHub MCP Registry: Ökoszisztéma fejlesztés és közösségi platform  
  - **Átfogó konklúzió**: Átdolgozott záró rész, amely hét esettanulmányt mutat be MCP megvalósítási dimenziókon át  
    - Vállalati integráció, több ügynök koordináció, fejlesztői termelékenység  
    - Ökoszisztéma fejlesztés, pedagógiai alkalmazások kategorizálása  
    - Bővített betekintés architektúra mintákba, megvalósítási stratégiákba és legjobb gyakorlatokba  
    - MCP, mint kiforrott, termelésre kész protokoll hangsúlyozása

#### Tanulmányi útmutató frissítések (study_guide.md)  
- **Vizuális tananyag térkép**: Frissített gondolattérkép GitHub MCP Registry hozzáadásával az esettanulmányok szekcióban  
- **Esettanulmányok leírása**: Általános leírásról részletes bontásra hét átfogó esettanulmányra  
- **Társtruktúra**: A 10. szekció aktualizálása az esettanulmányok részletes lefedésére konkrét megvalósítási részletekkel  
- **Változásnapló integráció**: 2025. szeptember 26-i bejegyzés hozzáadása a GitHub MCP Registry és esettanulmány fejlesztések dokumentálására  
- **Dátum frissítések**: Lábléc időbélyeg frissítése az utolsó módosításra (2025. szeptember 26.)

### Dokumentáció minőség fejlesztések  
- **Konzisztencia javítása**: Egységes esettanulmány formázás és felépítés mind a hét példánál  
- **Átfogó lefedettség**: Esettanulmányok lefedik a vállalati, fejlesztői termelékenységi és ökoszisztéma fejlesztési forgatókönyveket  
- **Stratégiai pozicionálás**: MCP mint alapplatform az ügynöki rendszer telepítéséhez kiemelve  
- **Erőforrás integráció**: Kiegészítő linkek frissítése, beleértve a GitHub MCP Registry-t

## 2025. szeptember 15.

### Haladó témakörök bővítése – Egyedi szállítók és kontextus menedzsment

#### MCP egyedi szállítók (05-AdvancedTopics/mcp-transport/) – Új haladó megvalósítási útmutató  
- **README.md**: Teljes megvalósítási útmutató egyedi MCP szállító mechanizmusokhoz  
  - **Azure Event Grid szállítás**: Átfogó szerver nélküli, eseményvezérelt szállító megvalósítás  
    - C#, TypeScript és Python példák Azure Functions integrációval  
    - Eseményvezérelt architektúra minták skálázható MCP megoldásokhoz  
    - Webhook fogadók és push alapú üzenetkezelés  
  - **Azure Event Hubs szállítás**: Nagy áteresztőképességű streaming szállító megvalósítás  
    - Valós idejű streaming alacsony késleltetéshez  
    - Particionálási stratégiák és checkpoint kezelése  
    - Üzenetcsomagolás és teljesítményoptimalizálás  
  - **Vállalati integrációs minták**: Termelésre kész architekturális példák  
    - MCP feldolgozás elosztása több Azure Functions között  
    - Hibrid szállító architektúrák több szállító típus kombinálásával  
    - Üzenet tartósság, megbízhatóság és hibakezelési stratégiák  
  - **Biztonság és monitoring**: Azure Key Vault integráció és megfigyelhetőségi minták  
    - Kezelt identitásos hitelesítés és legkisebb jogosultság elve  
    - Application Insights telemetria és teljesítmény monitorozás  
    - Áramkör megakadályozók és hibatűrés minták  
  - **Tesztelési keretrendszerek**: Átfogó tesztelési stratégiák egyedi szállítókhoz  
    - Egységtesztelés teszt duplákkal és mock keretrendszerekkel  
    - Integrációs tesztelés Azure Test Containers használatával  
    - Teljesítmény- és terheléses tesztelési megfontolások  

#### Kontextus mérnökség (05-AdvancedTopics/mcp-contextengineering/) – Felmerülő AI szakterület  
- **README.md**: Átfogó feltárás a kontextus mérnökség mint új terület  
  - **Alapelvek**: Teljes kontextus megosztás, akció döntési tudatosság és kontextus ablak menedzsment  
  - **MCP protokoll összhang**: Hogyan kezeli az MCP a kontextus mérnökségi kihívásokat  
    - Kontextus ablak korlátok és progresszív betöltési stratégiák  
    - Relevancia meghatározás és dinamikus kontextus lekérdezés  
    - Többmodális kontextus kezelés és biztonsági megfontolások  
  - **Megvalósítási megközelítések**: Egyszálú kontra több ügynök architektúrák  
    - Kontextus szeletezés és prioritizálási technikák  
    - Progresszív kontextus betöltés és tömörítési stratégiák  
    - Rétegezett kontextus megközelítések és lekérdezés optimalizálás  
  - **Mérési keretrendszer**: Felmerülő metrikák a kontextus hatékonyságának értékelésére  
    - Bemeneti hatékonyság, teljesítmény, minőség és felhasználói élmény megfontolások  
    - Kísérleti megközelítések a kontextus optimalizálására  
    - Hibaanalízis és fejlesztési módszerek  

#### Tananyag navigáció frissítések (README.md)  
- **Modul struktúra fejlesztése**: Tananyag táblázat frissítése új haladó témákkal  
  - Kontextus mérnökség (5.14) és Egyedi szállító (5.15) bevitele  
  - Egyenletes formázás és navigációs linkek minden modulban  
  - Leírások aktualizálása a jelenlegi tartalomnak megfelelően  

### Könyvtárszerkezet fejlesztések  
- **Névváltoztatás egységesítése**: „mcp transport” átnevezése „mcp-transport”-ra az előző haladó témák mappáinak megfelelően  
- **Tartalom szervezés**: Az összes 05-AdvancedTopics mappa egységes névhasználata (mcp-[téma])

### Dokumentáció minőség fejlesztések  
- **MCP specifikáció összhang**: Az összes új tartalom a jelenlegi MCP Specification 2025-06-18 szerint  
- **Többnyelvű példák**: Átfogó kódpéldák C#, TypeScript és Python nyelven  
- **Vállalati fókusz**: Termelésre kész minták és Azure felhő integráció mindenhol  
- **Vizuális dokumentáció**: Mermaid diagramok az architektúra és folyamatábrák megjelenítésére

## 2025. augusztus 18.

### Dokumentáció átfogó frissítés – MCP 2025-06-18 szabványok

#### MCP biztonsági legjobb gyakorlatok (02-Security/) – Teljes modernizáció  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Teljes átírás az MCP Specification 2025-06-18 szerint  
  - **Kötelező követelmények**: Explicit KELL/NEM KELL követelmények hozzáadása hivatalos specifikációból, vizuális jelzésekkel  
  - **12 alapvető biztonsági gyakorlat**: Felépítés 15 tételes listáról átfogó biztonsági területekre  
    - Token biztonság és hitelesítés külső identitás szolgáltató integrációval  
    - Munkamenet menedzsment és szállítási biztonság kriptográfiai követelményekkel  
    - AI-specifikus fenyegetésvédelem Microsoft Prompt Shields integrációval  
    - Hozzáférés ellenőrzése és jogosultságok a legkisebb jogosultság elvével  
    - Tartalombiztonság és monitoring Azure Content Safety integrációval  
    - Ellátási lánc biztonság átfogó komponensverifikációval  
    - OAuth biztonság és Confused Deputy támadás megelőzése PKCE implementációval  
    - Incidens válasz és helyreállítás automatizált képességekkel  
    - Megfelelőség és irányítás szabályozói összhanggal  
    - Haladó biztonsági kontrollok zéró trust architektúrával  
    - Microsoft biztonsági ökoszisztéma integráció  
    - Folyamatos biztonság fejlődés adaptív gyakorlatokkal  
  - **Microsoft biztonsági megoldások**: Bővített integrációs útmutatás Prompt Shields-hez, Azure Content Safety-hoz, Entra ID-hez és GitHub Advanced Security-hez  
  - **Megvalósítási erőforrások**: Kategorizált átfogó linkgyűjtemény hivatalos MCP dokumentáció, Microsoft biztonsági megoldások, biztonsági szabványok és megvalósítási útmutatók szerint

#### Haladó biztonsági kontrollok (02-Security/) – Vállalati megvalósítás  
- **MCP-SECURITY-CONTROLS-2025.md**: Teljes átdolgozás vállalati szintű biztonsági keretrendszerrel  
  - **9 átfogó biztonsági terület**: Alap kontrollokról részletes vállalati keretrendszerre bővítve  
    - Haladó hitelesítés és engedélyezés Microsoft Entra ID integrációval  
    - Token biztonság és átengedés elleni kontrollok átfogó validációval  
    - Munkamenet biztonsági kontrollok eltérítés megelőzéssel  
    - AI-specifikus biztonsági kontrollok prompt injekció és eszköz mérgezés megelőzéssel  
    - Confused Deputy támadás megelőzés OAuth proxy biztonsággal  
    - Eszköz végrehajtás biztonság homokozózással és izolációval  
    - Ellátási lánc biztonsági kontrollok függőségellenőrzéssel  
    - Monitorozási és detektálási kontrollok SIEM integrációval  
    - Incidens válasz és helyreállítás automatizált képességekkel  
  - **Megvalósítási példák**: Részletes YAML konfigurációs blokkok és kód példák hozzáadva  
  - **Microsoft megoldások integrációja**: Átfogó Azure biztonsági szolgáltatások, GitHub Advanced Security és vállalati identitás menedzsment lefedése

#### Haladó témák biztonság (05-AdvancedTopics/mcp-security/) – Termelésre kész megvalósítás  
- **README.md**: Teljes átírás vállalati biztonsági megvalósításhoz  
  - **Jelenlegi specifikáció összhangja**: Frissítve az MCP Specification 2025-06-18 kötelező biztonsági követelményeivel  
  - **Fejlett hitelesítés**: Microsoft Entra ID integráció átfogó .NET és Java Spring Security példákkal  
  - **AI biztonsági integráció**: Microsoft Prompt Shields és Azure Content Safety megvalósítás részletes Python példákkal  
  - **Haladó fenyegetés csillapítás**: Átfogó megvalósítási példák
    - Confused Deputy támadás megelőzés PKCE-vel és felhasználói hozzájárulás érvényesítéssel  
    - Token átengedés megelőzés célzott audience validációval és biztonságos token kezeléssel  
    - Munkamenet eltérítés megelőzés kriptográfiai kötésekkel és viselkedés elemzéssel  
  - **Vállalati biztonsági integráció**: Azure Application Insights monitoring, fenyegetés detektáló pipeline-ok és ellátási lánc biztonság  
  - **Megvalósítási ellenőrző lista**: Világos kötelező és ajánlott biztonsági kontrollok Microsoft biztonsági ökoszisztéma előnyeivel

### Dokumentáció minőség és szabványoknak való megfelelés
- **Specifikációs hivatkozások**: Minden hivatkozás frissítve a jelenlegi MCP Specifikáció 2025-06-18 szerint
- **Microsoft Biztonsági Ökoszisztéma**: Az integrációs útmutatás továbbfejlesztve az összes biztonsági dokumentációban
- **Gyakorlati megvalósítás**: Részletes kódpéldák hozzáadva .NET, Java és Python nyelveken, vállalati mintákkal
- **Erőforrás szervezés**: Átfogó kategorizálás hivatalos dokumentációk, biztonsági szabványok és megvalósítási útmutatók szerint
- **Vizuális jelzések**: Egyértelmű megjelölés a kötelező követelmények és az ajánlott gyakorlatok között


#### Alapfogalmak (01-CoreConcepts/) - Teljes korszerűsítés
- **Protokoll verzió frissítés**: Frissítve a jelenlegi MCP Specifikáció 2025-06-18 hivatkozásával, dátumalapú verziózással (ÉÉÉÉ-HH-NN formátum)
- **Architektúra finomítás**: A Hostok, Ügyfelek és Szerverek leírásainak fejlesztése a jelenlegi MCP architektúra minták alapján
  - A Hostok most egyértelműen definiáltak, mint több MCP kliens kapcsolódást koordináló AI alkalmazások
  - Az Ügyfelek protokollkapcsolókként vannak leírva, melyek egy-az-egyhez szerverkapcsolatokat tartanak fenn
  - A Szerverek továbbfejlesztve a helyi és távoli telepítési forgatókönyvekkel
- **Primitívek átalakítása**: Teljes átdolgozás a szerver és kliens primitíveknél
  - Szerver primitívek: Erőforrások (adatforrások), Kimenetek (sablonok), Eszközök (végrehajtható funkciók) részletes magyarázatokkal és példákkal
  - Kliens primitívek: Mintavételezés (LLM befejezések), Kiváltás (felhasználói bevitel), Naplózás (hibakeresés/monitorozás)
  - Frissítve a jelenlegi felfedezési (`*/list`), lekérési (`*/get`) és végrehajtási (`*/call`) metódusmintákkal
- **Protokoll architektúra**: Bevezetve a kétszintű architektúra modell
  - Adat réteg: JSON-RPC 2.0 alapok életciklus-kezeléssel és primitívekkel
  - Szállítási réteg: STDIO (helyi) és Streamable HTTP SSE-vel (távoli) szállítási mechanizmusok
- **Biztonsági keretrendszer**: Átfogó biztonsági elvek, beleértve a felhasználói beleegyezés egyértelmű kezelését, adatvédelmet, eszközvégrehajtás biztonságát és szállítási réteg biztonságát
- **Kommunikációs minták**: A protokollüzenetek frissítése az inicializáció, felfedezés, végrehajtás és értesítési folyamatok bemutatására
- **Kódpéldák**: Megújított többnyelvű példák (.NET, Java, Python, JavaScript), hogy tükrözzék a jelenlegi MCP SDK mintákat

#### Biztonság (02-Security/) - Átfogó biztonsági átdolgozás  
- **Szabványokkal való összehangolás**: Teljes megfelelés a MCP Specifikáció 2025-06-18 biztonsági követelményeivel
- **Hitelesítés fejlődése**: Dokumentált fejlődés az egyedi OAuth szerverektől a külső identitásszolgáltató delegálásig (Microsoft Entra ID)
- **AI-specifikus fenyegetés elemzés**: Fejlesztett lefedettség a modern AI támadási vektorokban
  - Részletes prompt injektálási támadás forgatókönyvek valós példákkal
  - Eszközmérgezési mechanizmusok és "rug pull" támadási minták
  - Kontextusablak mérgezés és modell összezavarási támadások
- **Microsoft AI biztonsági megoldások**: Átfogó lefedettség a Microsoft biztonsági ökoszisztéma területén
  - AI Prompt Shields fejlett észlelési, kiemelési és határoló technikákkal
  - Azure Content Safety integrációs minták
  - GitHub Advanced Security az ellátási lánc védelméhez
- **Fejlett fenyegetés-kezelés**: Részletes biztonsági kontrollok
  - Munkamenet eltérítés MCP-specifikus támadási forgatókönyvekkel és kriptográfiai munkamenet azonosítókövetelményekkel
  - Zavart helyettesítő problémák MCP proxy helyzetekben egyértelmű beleegyezés követelményekkel
  - Token átengedési sérülékenységek kötelező érvényesítési kontrollokkal
- **Ellátási lánc biztonság**: Kiterjesztett AI ellátási lánc lefedettség, beleértve alapmodelleket, beágyazási szolgáltatásokat, kontextus szolgáltatókat és harmadik féltől származó API-kat
- **Alapbiztonság**: Fejlesztett integráció vállalati biztonsági mintákkal, beleértve a zero trust architektúrát és a Microsoft biztonsági ökoszisztémát
- **Erőforrás szervezés**: Átfogó erőforrás linkek kategorizálva típus szerint (Hivatalos dokumentációk, Szabványok, Kutatás, Microsoft megoldások, Megvalósítási útmutatók)

### Dokumentáció minőségi fejlesztések
- **Strukturált tanulási célok**: Fejlesztett tanulási célok konkrét, megvalósítható eredményekkel 
- **Kereszthivatkozások**: Hivatkozások hozzáadva a kapcsolódó biztonsági és alapfogalom témák között
- **Aktuális információk**: Minden dátum- és specifikációhivatkozás frissítve naprakész szabványokra
- **Megvalósítási útmutatás**: Konkrét, megvalósítható implementációs útmutatók hozzáadva mindkét részben

## 2025. július 16.

### README és navigáció fejlesztések
- Teljesen átdolgozott tananyag navigáció a README.md-ben
- `<details>` tagek helyett könnyebben hozzáférhető táblázatos formátum
- Új "alternative_layouts" mappában alternatív elrendezési opciók létrehozva
- Kártyás, fülös és harmonika stílusú navigációs példák hozzáadva
- Tárolószerkezet szekció frissítve az összes legfrissebb fájlra
- A "Hogyan használd ezt a tananyagot" szakasz egyértelmű ajánlásokkal bővítve
- MCP specifikáció hivatkozások frissítve a helyes URL-ekre mutatva
- Kontextus mérnökség szekció (5.14) hozzáadva a tananyag struktúrához

### Tanulmányi útmutató frissítések
- Teljesen átdolgozott tanulmányi útmutató a jelenlegi tárolószerkezethez igazítva
- Új részek hozzáadva MCP Ügyfelekről és Eszközökről, valamint Népszerű MCP Szerverekről
- Vizuális tananyag térkép frissítve a témák valós leképezéséhez
- Fejlesztett leírások a Fejlett témákról, lefedve az összes specializált területet
- Esettanulmányok rész frissítve valós példákra
- Ez az átfogó változásnapló hozzáadva

### Közösségi hozzájárulások (06-CommunityContributions/)
- Részletes információ hozzáadva MCP szerverekről képgeneráláshoz
- Átfogó szakasz hozzáadva Claude VSCode-ban történő használatához
- Cline terminál kliens beállítási és használati útmutatók hozzáadva
- MCP kliens szekció frissítve minden népszerű kliens opcióval
- Hozzájárulási példák fejlesztve pontosabb kódmintákkal

### Fejlett témák (05-AdvancedTopics/)
- Minden specializált témaköri mappa egységes névvel szervezve
- Kontextus mérnökségi anyagok és példák hozzáadva
- Foundry ügynök integrációs dokumentáció hozzáadva
- Entra ID biztonsági integrációs dokumentáció fejlesztve

## 2025. június 11.

### Első kiadás
- Megjelent az MCP kezdőknek tananyag első verziója
- Létrehozva az összes 10 fő szekció alapstruktúrája
- Vizuális tananyag térkép megvalósítva a navigációhoz
- Kezdeti mintaprojektek több programozási nyelven hozzáadva

### Első lépések (03-GettingStarted/)
- Első szerver implementációs példák létrehozva
- Kliens fejlesztési útmutatás hozzáadva
- LLM kliens integrációs instrukciók belefoglalva
- VS Code integrációs dokumentáció hozzáadva
- Server-Sent Events (SSE) szerver példák megvalósítása

### Alapfogalmak (01-CoreConcepts/)
- Részletes kliens-szerver architektúra magyarázat hozzáadva
- Dokumentáció kulcs protokoll komponensekről létrehozva
- MCP üzenetküldési minták dokumentálva

## 2025. május 23.

### Tárolószerkezet
- A tároló beállítása alap mappastruktúrával
- README fájlok létrehozva minden főbb szekcióhoz
- Fordítási infrastruktúra beállítva
- Képi anyagok és diagramok hozzáadva

### Dokumentáció
- Kezdeti README.md a tananyag áttekintéssel létrehozva
- CODE_OF_CONDUCT.md és SECURITY.md hozzáadva
- SUPPORT.md beállítva segítségkérés útmutatással
- Előzetes tanulmányi útmutató szerkezet létrehozva

## 2025. április 15.

### Tervezés és keretrendszer
- MCP kezdőknek tananyag kezdeti tervezése
- Tanulási célok és célközönség meghatározva
- A tananyag 10 szakaszának vázlata elkészült
- Koncepcionális keretrendszer kidolgozva példákhoz és esettanulmányokhoz
- Kulcsfogalmakhoz kezdeti prototípus példák létrehozva

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->