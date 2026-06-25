# Változásnapló: MCP kezdőknek tananyag

Ez a dokumentum a Model Context Protocol (MCP) kezdőknek tananyagában történt minden jelentős változás nyilvántartására szolgál. A változásokat fordított időrendi sorrendben dokumentáljuk (legújabb változások először).

## 2026. június 24.

### Új lecke: Az MCP használata a Copilot alkalmazásban

- [Eszközök szekció](./12-tooling/README.md) Hozzáadva eszközök rész.
- [MCP a Copilot alkalmazásban](./12-tooling/01-copilot-app/README.md)

## 2026. június 16.

### MCP specifikáció összehangolása és minták érvényesítése

A tananyagot érvényesítettük a jelenlegi **MCP Specification 2025-11-25** és a legújabb hivatalos SDK-k alapján, majd kijavítottuk a maradék elavult specifikáció hivatkozásokat, és megerősítettük, hogy a fő minták továbbra is buildelnek és futnak.

#### Specifikáció verzió javítások (2025-06-18 / 2025-03-26 → 2025-11-25)

Frissítettük az angol tartalmakat, ahol még az idősebb specifikáció revision-t említették *aktuális/legfrissebb* szabványként, és a linkeket átirányítottuk a kanonikus `modelcontextprotocol.io` specifikációs utakra:
- **05-AdvancedTopics/mcp-security/README.md**: Frissítettük a "Jelenlegi szabvány" bannert, bevezetőt, a fő biztonsági elvek címet, a kötelező követelmények szakaszt, a Microsoft Entra ID szekciót, a Hivatkozások & Erőforrások linkeket, és a záró biztonsági értesítést (8 hivatkozás) a 2025-11-25 verzióra
- **05-AdvancedTopics/mcp-transport/README.md**: Frissítettük a Kiegészítő erőforrások specifikációs linkjét és a "Jelenlegi szabvány" bannert a 2025-11-25-re
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Kicseréltük az elavult `2025-03-26` security-and-trust linket a jelenlegi 2025-11-25 biztonsági legjobb gyakorlatokra
- **03-GettingStarted/14-sampling/README.md**: Frissítettük a hivatalos mintavételezési dokumentáció linkjét a 2025-11-25-re
- **03-GettingStarted/05-stdio-server/README.md**: Frissítettük a jelenidejű "aktuális MCP specifikáció" hivatkozást és a Kiegészítő erőforrások specifikációs linkjét a 2025-11-25-re (a történeti SSE-kivezetés megjegyzések változatlanok a pontosság érdekében)

#### Minták érvényesítése a jelenlegi SDK-kkal

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` telepítette a `@modelcontextprotocol/sdk@1.29.0` csomagot; `tsc --noEmit` lefutott hiba nélkül — a meglévő `McpServer`/`StdioServerTransport` API-k érvényesek maradtak
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validáltuk izolált `.venv`-ben a `mcp[cli]` (1.27.2) használatával; a `py_compile` hibamentes volt, és a `FastMCP.list_tools()` helyesen visszaadta az `add` és `subtract` eszközöket
- Megerősítettük, hogy minden minta `@modelcontextprotocol/sdk` verzió-intervallum (`>=1.26.0` / `^1.26.0` / `^1.27.0`) zökkenőmentesen a jelenlegi `1.29.0` verzióra oldódik fel, törő API változás nélkül

#### Függőség verziós összehangolás (lezáró verzió rés)

Frissítettük az elavult SDK verzió beállításokat, hogy minden minta a jelenlegi MCP kiadást kövesse, megfelelve a teljes repóra vonatkozó szabványnak:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Frissítettük a `@modelcontextprotocol/sdk` verziót `^1.8.0` → `>=1.26.0` és a régi `"updated for MCP 2025-06-18"` csomag leírást `"aligned with MCP Specification 2025-11-25"`-re
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** és **lab4/code/github_mcp_server/pyproject.toml**: Frissítettük a pontos verziót `mcp==1.23.0` → `mcp>=1.26.0`; mindkét `uv.lock` fájlt újrageneráltuk (`uv lock`) így a lockfile-ok most a jelenlegi `mcp 1.27.2` verzióra oldódnak és összhangban maradnak a manifesztekkel

#### Tananyag hiányvizsgálat — Legfrissebb specifikációs funkciók lefedése

Ellenőriztük, hogy a tananyag már lefedi az MCP 2025-11-25-ben bevezetett/bővített összes primitív elemet, tehát nincsenek hiányzó tartalmak:
- **Mintavételezés**: Lecke 03-GettingStarted/14-sampling plusz 05-AdvancedTopics/mcp-sampling
- **Előhívás (beleértve az URL módot)**: Dokumentálva 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt
- **Gyökerek**: Dokumentálva 00-Introduction, 01-CoreConcepts, és 05-AdvancedTopics/mcp-root-contexts állományokban
- **Feladatok (kísérleti, hosszú futamú műveletek)**: Dokumentálva 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt
- **Eszköz annotációk** (`readOnlyHint` / `destructiveHint`): Dokumentálva 01-CoreConcepts és 05-AdvancedTopics/mcp-protocol-features alatt

### Biztonsági megerősítés és függőségi sérülékenységek kezelése

Teljes biztonsági ellenőrzést futtattunk az összes függőségi manifeszten és a minták forráskódján, majd javítottunk minden jelentett npm figyelmeztetést és egy kód szintű hibát. A javítások után az `npm audit` **0 sérülékenységet** jelent minden vizsgált könyvtárban.

#### npm függőségi sérülékenységek (átmenő) — Javítva

Átvizsgáltuk az összes 15 elküldött `package-lock.json` fájlt. A sérülékenységek korlátozódtak az MCP Inspector fejlesztőeszközhöz, az OpenAI klienshez és az MCP SDK-hoz behozott átmenő függőségekre; mind jelenleg megoldott anélkül, hogy a minták sérülnének:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** és **lab3/code/weather_mcp/inspector**: Frissítettük a `@modelcontextprotocol/inspector` verziót (`0.16.6` / `0.14.1` → `0.22.0`), ami tisztázta a beépített `ajv`, `brace-expansion`, `diff`, `path-to-regexp` és `ws` figyelmeztetéseket. Hozzáadtunk egy npm `overrides` bejegyzést, ami rákényszeríti a javított `shell-quote@1.8.4` verziót a `concurrently` által hordozott kritikus figyelmeztetés megszüntetéséhez; mindkét lockfile újragenerálva (most 0 sérülékenység)
- **03-GettingStarted/samples/typescript**: `npm audit fix` frissítette az átmenő `qs` (moderate) csomagot javított verzióra
- **03-GettingStarted/samples/javascript**: `npm audit fix` frissítette az átmenő `hono` (moderate) csomagot javított verzióra
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` frissítette az átmenő `form-data` (magas) csomagot javított verzióra
- **03-GettingStarted/11-simple-auth/solution/typescript**: Elkészítettük a hiányzó `package-lock.json`-t, így a projekt reprodukálható és auditálható (0 sérülékenység)

#### Kód szintű biztonsági javítás (OWASP A03: Befecskendezés)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eltávolítottuk a `shell=True` opciót az `open_in_vscode` eszközből. A korábbi `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` lehetővé tette shell metakarakterek értelmezését a mappa útvonalában a `cmd.exe` által (parancs befecskendezési vektor). Most közvetlenül a feloldott `Code.exe` programot indítja a mappával argumentumként — nincs shell — ami funkcionálisan egyenértékű és biztonságos

#### Python függőségi audit

- Átvizsgáltunk minden Python igény halmazt `pip-audit` használatával. A `05-AdvancedTopics` és `03-GettingStarted/samples/python` **nem jelzett ismert sérülékenységet** (a `mcp` / `httpx` / `pydantic` / `python-dotenv` verziók a jelenlegi javított kiadásokat oldják fel)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: A `pip-audit` jelezte a transzitív függőséget, a **`werkzeug` 3.1.1**-et három `safe_join` Windows eszköz név DoS figyelmeztetéssel — `CVE-2025-66221`, `CVE-2026-21860`, és `CVE-2026-27199` (mind 3.1.6-ban javítva). Hozzáadtunk egy explicit biztonsági kitűzést `werkzeug>=3.1.6`-ra, így a javított kiadás kerül feloldásra; megerősítettük, hogy a megszorítás zökkenőmentesen oldódik fel a `chainlit` / `mcp` / `semantic-kernel` stackkel

### Terméknév újra márkázása

Frissítettük az egész tananyagot, hogy tükrözze a Microsoft termék név változásait:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Frissítettük a Discord közösség linkjét
- **AGENTS.md**: Frissítettük a Discord szerver hivatkozást
- **README.md**: Frissítettük a technológiai ökoszisztéma hivatkozásokat
- **study_guide.md**: Frissítettük az esettanulmány hivatkozásokat
- **05-AdvancedTopics/README.md**: Frissítettük az 5.13-as modul címet és leírást
- **05-AdvancedTopics/mcp-integration/README.md**: Frissítettük a szakasz fejlécét és leírását
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Teljes modul cím és tartalom frissítés
- **05-AdvancedTopics/mcp-security-entra/README.md**: Frissítettük a kereszthivatkozást
- **07-LessonsfromEarlyAdoption/README.md**: Frissítettük az esettanulmány hivatkozásokat
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Frissítettük a 9. szakasz fejlécét, jelvényeket és képességeket
- **08-BestPractices/README.md**: Frissítettük a Discord közösség linkjét
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Frissítettük a Discord csatorna hivatkozást
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Frissítettük a modell telepítés hivatkozást
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Frissítettük az AI Szolgáltatások táblázatot
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Frissítettük az erőforrás hivatkozásokat

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: Frissítettük a fő tananyag hivatkozásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Frissítettük a modul címet, áttekintést, és minden modul fejlécet
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Frissítettük a címet, tanulási célokat, beállítási útmutatót és erőforrásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Frissítettük a címet, tanulási célokat, MCP hostok táblázatát és kereszthivatkozásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Frissítettük a címet, jelvényeket, előfeltételeket, és erőforrásokat
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Frissítettük az Agent Builder hivatkozásokat és a visszajelzési linket
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Frissítettük az előfeltételeket és az extension hivatkozásokat

---

## 2026. április 11.

### Új lecke, dokumentáció javítások és függőség frissítések

#### Új tananyagtartalom hozzáadva

**05-ös modul - Haladó témakörök**
- **5.17. lecke: Adversariális Multi-Agent Érvelés MCP-vel** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Új átfogó útmutató az adversariális vita mintázathoz multi-agent rendszerek esetén
  - Mermaid architektúra diagram: két ügynök → megosztott MCP szerver → vita átírás → bíró → ítélet
  - Megosztott MCP eszközszerver (`web_search` + `run_python`) Python és TypeScript nyelven megvalósítva
  - Ellentétes rendszer promptok (FOR / AGAINST / Bíró) explicit eszközhasználati követelményekkel
  - Vita szervező Python, TypeScript és C# nyelven, körök kezelésével és érvanyagok irányításával
  - MCP `ClientSession` csatlakoztatás a valódi eszközhívásokhoz az orchestrator számára
  - Használati eset táblázat (hallucináció detektálás, fenyegetésmodell, API tervezés felülvizsgálat, tényellenőrzés, technológiai választás)
  - Biztonsági szempontok: sandbox végrehajtás, eszköz hívás validáció, sebesség korlátozás, naplózás
  - Strukturált gyakorlat három konkrét forgatókönyvvel (kódellenőrzés, architektúra döntés, tartalom moderáció)

#### Dokumentáció javítások

**03-as modul - Kezdés**
- **05-stdio-server/README.md**: Javítottunk egy hiányos TypeScript stdio szerver példát — hozzáadtuk a hiányzó transzport inicializálást (`new StdioServerTransport()`) és a `server.connect(transport)` hívást, hogy illeszkedjen a Python és .NET példákhoz ugyanebben a szakaszban
- **14-sampling/README.md**: Javítottuk az elírást — kijavítva `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Tananyagelem frissítések

**Fő README.md**
- Hozzáadtuk az 5.17-es (Adversariális Multi-Agent Érvelés MCP-vel) sort a tananyag táblázathoz, közvetlen linkkel az új leckéhez

**05-AdvancedTopics/README.md**
- Hozzáadtuk az 5.17-es leckét a leckék táblázatához

**study_guide.md**
- Hozzáadtuk az Adversariális Multi-Agent Érvelés témát a Haladó témák elágazási térképéhez és leírásához

#### Kód és biztonsági javítások

**05-ös modul - Adversariális ügynökök (`mcp-adversarial-agents`)**
- **Biztonsági javítás — parancsbefecskendezés**: A TypeScript `run_python` eszközben az `execSync` shell interpolációját kicseréltük `execFile` + `promisify` használatára, megszüntetve a parancsbefecskendezés felületét (a LLM által vezérelt kód mostantól shell bevonása nélkül, literális argv elemként kerül átadásra)
- **MCP eszköz ciklus kapcsolás**: A Python vitaszervezőt frissítettük, hogy `AsyncAnthropic` klienssel dolgozzon (felváltva a blokkoló szinkron `Anthropic`-ot), élő `ClientSession`-t közvetlenül továbbítson minden ügynök lépéshez, minden lépésben lekérdezze az eszköz definiíciókat a `session.list_tools()` metóduson keresztül, és a `tool_use` blokkokat `session.call_tool()` ciklusban kezelje, amíg a modell végső szöveges választ nem ad

#### Függőségfrissítések

- Több csomagban frissült a `hono` 4.12.12 verzióra (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- A TypeScript csomagokban a `@hono/node-server` 1.19.11-ről 1.19.13-ra emelve
- A Python csomagokban a `cryptography` 46.0.5-ről 46.0.7-re emelve (10-StreamliningAIWorkflows labor 3 és 4)
- Az 10-StreamliningAIWorkflows inspectorban a `lodash` 4.17.23-ról 4.18.1-re emelve

#### Fordítások

- A 48+ nyelv fordításai szinkronizálva a legfrissebb forrásváltozásokkal (i18n frissítés)

---

## 2026. február 5.

### Tárolóra kiterjedő validáció és navigáció fejlesztések

#### Új tananyag tartalom hozzáadva

**03. modul - Kezdő lépések**
- **12-mcp-hosts/README.md**: Új átfogó útmutató az MCP hosztok beállításához
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigurációs példák
  - JSON konfigurációs sablonok minden fő hoszthoz
  - Áttekintő táblázat a szállítási típusokról (stdio, SSE/HTTP, WebSocket)
  - Gyakori kapcsolódási problémák hibakeresése
  - A hoszt konfiguráció biztonsági legjobb gyakorlatai

- **13-mcp-inspector/README.md**: Új hibakeresési útmutató az MCP Inspectorhoz
  - Telepítési módok (npx, globális npm, forrásból)
  - Szerverekhez való csatlakozás stdio és HTTP/SSE protokollon keresztül
  - Tesztelő eszközök, források és prompt munkafolyamatok
  - VS Code integráció az MCP Inspectorral
  - Gyakori hibakeresési szcenáriók megoldásokkal

**04. modul - Gyakorlati megvalósítás**
- **pagination/README.md**: Új oldaltördelés megvalósítási útmutató
  - Python, TypeScript, Java nyelvű kurzoralapú oldaltördelési minták
  - Kliensoldali oldaltördelési kezelés
  - Cursor tervezési stratégiák (áteresztetlen vs. strukturált)
  - Teljesítmény optimalizálási ajánlások

**05. modul - Haladó témák**
- **mcp-protocol-features/README.md**: Új protokoll funkciók mélyelemzés
  - Folyamatértesítések megvalósítása
  - Kérések törlésének mintái
  - Erőforrás sablonok URI mintákkal
  - Szerver életciklus kezelés
  - Naplózási szint kontrollja
  - Hiba kezelési minták JSON-RPC kódokkal

#### Navigációs hibajavítások (24+ fájl frissítve)

**Fő modul README-k**
 Most már kapcsolódik mind az első leckéhez, mind a következő modulhoz

**02-Security alkönyvtárak**
- Mind az 5 kiegészítő biztonsági dokumentumban elérhető a „Mi következik?” navigáció:

**09-CaseStudy fájlok**
- Minden esettanulmány fájl most már sorozatos navigációval rendelkezik:

**10-StreamliningAI laborok**
 Hozzáadott „Mi következik?” szakasz az 10-es modul áttekintéséhez és a 11-es modulhoz

#### Kód és tartalom javítások

**SDK és függőségfrissítések**
Javítottuk az üres openai verziót `^4.95.0`-ra
Frissítettük az SDK-t `^1.8.0`-ról `>=1.26.0`-ra
Frissítettük az MCP verzió sapkákat `>=1.26.0`-ra

**Kód javítások**
Javítva az érvénytelen `gpt-4o-mini` modell `gpt-4.1-mini`-re

**Tartalom javítások**
Javítottuk a törött hivatkozást `READMEmd` → `README.md`, javítottuk a tananyag fejlécét `Module 1-3` → `Module 0-3`, javítottuk a kis- és nagybetű érzékeny elérési utat
Eltávolítottuk az sérült, duplikált Case Study 5 tartalmat

**Kezdő útmutatás fejlesztések**
Megfelelő bevezetőt, tanulási célokat és előfeltételeket adtunk hozzá kezdőknek

#### Tananyag frissítések

**Fő README.md**
- Hozzáadott elemek 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Oldaltördelés), 5.16 (Protokoll funkciók) a tananyagtáblázathoz

**Modul README-k**
Hozzáadott 12. és 13. lecke a leckelistához
Hozzáadott Gyakorlati útmutatók rész az oldaltördelés hivatkozással
Hozzáadott 5.15 (Egyedi szállítás) és 5.16 (Protokoll funkciók) leckék

**study_guide.md**
- Frissítve a gondolattérkép minden új témával: MCP Hosts beállítás, MCP Inspector, oldaltördelési stratégiák, Protokoll funkciók mélyelemzése

## 2026. január 28.

### MCP Specifikáció 2025-11-25 megfelelőség ellenőrzés

#### Alapfogalmak fejlesztése (01-CoreConcepts/)
- **Új kliens primitív - Roots**: Átfogó dokumentáció hozzáadva a Roots kliens primitívről, amely lehetővé teszi, hogy a szerverek megértsék a fájlrendszer határait és engedélyeit
- **Eszköz annotációk**: Dokumentációt adtunk az eszköz viselkedés annotációkról (`readOnlyHint`, `destructiveHint`) jobb eszközvégrehajtási döntésekhez
- **Eszköz hívás mintavételezésnél**: Frissítettük a mintavételezés dokumentációt, hogy tartalmazza a `tools` és `toolChoice` paramétereket a modell által vezérelt eszköz hívások során
- **URL mód kiváltás**: Dokumentáció az URL alapú kiváltásról a szerver által kezdeményezett külső webes interakciókhoz
- **Feladatok (kísérleti)**: Új szakasz a kísérleti Feladatok funkcióról, amely tartós végrehajtási burkokat és késleltetett eredmény lekérést dokumentál
- **Ikon támogatás**: Megjegyezve, hogy az eszközök, erőforrások, erőforrás sablonok és promptok immár ikont is tartalmazhatnak kiegészítő metaadatként

#### Dokumentáció frissítések
- **README.md**: Hozzáadva MCP Specifikáció 2025-11-25 verzióhivatkozás és időalapú verziózás magyarázata
- **study_guide.md**: Frissítve a tananyagtérkép, beleértve Feladatok és Eszköz annotációk az Alapfogalmak szekcióban; frissített dokumentum időbélyeg

#### Megfelelőség ellenőrzése
- **Protokoll verzió**: Ellenőrizve, hogy minden dokumentáció a jelenlegi MCP Specifikáció 2025-11-25-öt hivatkozza
- **Architektúra összhang**: Megerősítve a két szintű architektúra (Adatszint + Szállítási szint) dokumentáció pontossága
- **Primitívek dokumentációja**: Érvényesítve a szerver primitívek (Erőforrások, Promptok, Eszközök) és kliens primitívek (Mintavételezés, Kiváltás, Naplózás, Roots) dokumentációja
- **Szállítási mechanizmusok**: Ellenőrizve a STDIO és HTTP stream szállítás dokumentáció pontossága
- **Biztonsági útmutatás**: Megerősítve a jelenlegi MCP Biztonsági Legjobb Gyakorlatok dokumentációjával való összhang

#### MCP 2025-11-25 kulcsfunkciók dokumentálva
- **OpenID Connect felfedezés**: Hitelesítési szerver felfedezés OIDC-n keresztül
- **OAuth kliens azonosító metaadatok**: Ajánlott kliens regisztrációs mechanizmus
- **JSON Sémák 2020-12**: Alapértelmezett dialektus a MCP sémadefiníciókhoz
- **SDK szintek rendszere**: Formalizált követelmények az SDK funkció támogatására és karbantartására
- **Irányítási struktúra**: Formalizált munkacsoportok és érdeklődési csoportok a MCP irányításban

### Biztonsági dokumentáció nagy frissítés (02-Security/)

#### MCP Biztonsági Csúcstalálkozó Műhely (Sherpa) integráció
- **Új kézikönyv alapú tréningforrás**: Átfogó integráció a [MCP Biztonsági Csúcstalálkozó Műhely (Sherpa)](https://azure-samples.github.io/sherpa/) anyagaival minden biztonsági dokumentációban
- **Expedíciós útvonal lefedettség**: A teljes tábor-tábor haladás dokumentálása az Alaptábortól a Csúcstámadásig
- **OWASP összhang**: Minden biztonsági útmutatás most OWASP MCP Azure Security Guide kockázatokra van leképezve

#### OWASP MCP Top 10 integráció
- **Új szakasz**: Hozzáadott OWASP MCP Top 10 Biztonsági kockázatok táblázata Azure mérséklésekkel a fő Biztonsági README-hez
- **Kockázat-alapú dokumentáció**: Frissült a mcp-security-controls-2025.md az OWASP MCP kockázati hivatkozásokkal minden biztonsági területhez
- **Referencia architektúra**: Linkelve az OWASP MCP Azure Security Guide referencia architektúrához és megvalósítási mintákhoz

#### Frissített biztonsági fájlok
- **README.md**: Hozzáadva Sherpa műhely áttekintés, expedíciós útvonal táblázat, OWASP MCP Top 10 kockázatok összefoglaló, és kézikönyv alapú tréning rész
- **mcp-security-controls-2025.md**: Frissített fejléc február 2026-ra, hozzáadott OWASP kockázati hivatkozások (MCP01-MCP08), javított specifikáció verzió inkonzisztencia
- **mcp-security-best-practices-2025.md**: Hozzáadott Sherpa és OWASP erőforrás szakasz, frissített időbélyeg
- **mcp-best-practices.md**: Hozzáadott kézikönyv alapú tréning rész Sherpa és OWASP linkekkel
- **azure-content-safety-implementation.md**: Hozzáadott OWASP MCP06 hivatkozás, Sherpa 3. tábor-egyeztetés, és további erőforrások szakasz

#### Új erőforrás linkek hozzáadva
- [MCP Biztonsági Csúcstalálkozó Műhely (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Egyéni OWASP MCP kockázati oldalak (MCP01-MCP10)

### Tananyagra kiterjedő MCP Specifikáció 2025-11-25 összehangolás

#### 03-as modul - Kezdő lépések
- **SDK dokumentáció**: Hozzáadva Go SDK az hivatalos SDK listához; frissítve minden SDK hivatkozás MCP Specifikáció 2025-11-25 szerint
- **Szállítási tisztázás**: Frissített STDIO és HTTP Streaming szállítási leírás explicit specifikáció hivatkozásokkal

#### 04-es modul - Gyakorlati megvalósítás
- **SDK frissítések**: Hozzáadva Go SDK; frissített SDK lista specifikációs verzió hivatkozással
- **Engedélyezési specifikáció**: Frissített MCP engedélyezési specifikáció link a jelenlegi 2025-11-25 verzióra

#### 05-ös modul - Haladó témák
- **Új funkciók**: Megjegyzés hozzáadva az MCP Specifikáció 2025-11-25 új funkcióiról (Feladatok, Eszköz annotációk, URL mód kiváltás, Roots)
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 és Sherpa műhely linkek további hivatkozásokhoz

#### 06-os modul - Közösségi hozzájárulások
- **SDK lista**: Hozzáadva Swift és Rust SDK-k; frissített specifikációs link 2025-11-25-re
- **Specifikációs hivatkozás**: Frissítve a MCP Specifikáció direkt URL-je

#### 07-es modul - Korai adaptáció tanulságai
- **Erőforrás frissítések**: Hozzáadva MCP Specifikáció 2025-11-25 link és OWASP MCP Top 10 a további forrásokhoz

#### 08-as modul - Legjobb gyakorlatok
- **Specifikáció verziója**: Frissítve MCP Specifikáció 2025-11-25-re
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 és Sherpa műhely a további hivatkozásokhoz

#### 10-es modul - Mesterséges intelligencia munkafolyamatok egyszerűsítése
- **Jelvény frissítés**: MCP verzió jelvény SDK verzióról (1.9.3) átállítva specifikációs verzióra (2025-11-25)
- **Erőforrás linkek**: Frissített MCP Specifikáció link; hozzáadva OWASP MCP Top 10

#### 11-es modul - MCP szerver kézikönyves laborok
- **Specifikációs hivatkozás**: Frissített MCP Specifikáció link 2025-11-25 verzióra
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 az hivatalos erőforrásokhoz

## 2025. december 18.

### Biztonsági dokumentáció frissítés – MCP Specifikáció 2025-11-25

#### MCP Biztonsági Legjobb Gyakorlatok (02-Security/mcp-best-practices.md) – Specifikáció verzió frissítés
- **Protokoll verzió frissítés**: Frissítve a legújabb MCP Specifikáció 2025-11-25-re hivatkozás (megjelenés: 2025. november 25.)
  - Minden verzió hivatkozás frissítve 2025-06-18-ról 2025-11-25-re
  - Dokumentum dátum hivatkozások frissítve 2025. augusztus 18-ról 2025. december 18-ra
  - Ellenőrizve, hogy minden specifikáció URL a jelenlegi dokumentációra mutasson
- **Tartalom validálás**: Átfogó biztonsági legjobb gyakorlatok validálása a legfrissebb szabványok szerint
  - **Microsoft Biztonsági megoldások**: Ellenőrizve a jelenlegi terminológia és linkek a Prompt Shields (korábban „Jailbreak veszély felismerés”), Azure Content Safety, Microsoft Entra ID, és Azure Key Vault esetén
  - **OAuth 2.1 biztonság**: Megerősítve az összhang a legfrissebb OAuth biztonsági legjobb gyakorlatokkal
  - **OWASP szabványok**: Validálva, hogy az OWASP Top 10 LLM-ekhez vonatkozó hivatkozások naprakészek
  - **Azure szolgáltatások**: Ellenőrizve minden Microsoft Azure dokumentációs link és legjobb gyakorlat
- **Szabványokhoz igazítás**: Minden hivatkozott biztonsági szabvány naprakésznek bizonyult
  - NIST AI Kockázatkezelési Keretrendszer
  - ISO 27001:2022
  - OAuth 2.1 Biztonsági Legjobb Gyakorlatok
  - Azure biztonsági és megfelelőségi keretrendszerek
- **Megvalósítási erőforrások**: Ellenőrizve minden megvalósítási útmutató link és erőforrás
  - Azure API Management hitelesítési minták
  - Microsoft Entra ID integráció útmutatók
  - Azure Key Vault titkos kezelési megoldások
  - DevSecOps csövek és monitorozó megoldások

### Dokumentáció minőségbiztosítás
- **Specifikációs megfelelőség**: Biztosítva, hogy minden kötelező MCP biztonsági követelmény (KELL/NEM KELL) összhangban van a legújabb specifikációval
- **Erőforrások naprakészsége**: Ellenőrizve minden külső link Microsoft dokumentációkra, biztonsági szabványokra és megvalósítási útmutatókra
- **Legjobb gyakorlatok lefedettsége**: Megerősítve az átfogó lefedettség az autentikáció, engedélyezés, MI-specifikus fenyegetések, ellátási lánc biztonság és vállalati minták terén

## 2025. október 6.

### Kezdő lépések szakasz bővítése – Haladó szerverhasználat & Egyszerű hitelesítés

#### Haladó szerverhasználat (03-GettingStarted/10-advanced)
- **Új fejezet hozzáadva**: Átfogó útmutató a haladó MCP szerverhasználathoz, lefedve mind a hagyományos, mind az alacsony szintű szerver architektúrákat.
  - **Rendes vs. alacsony szintű szerver**: Részletes összehasonlítás és kódpéldák Pythonban és TypeScriptben mindkét megközelítéshez.
  - **Handler-alapú felépítés**: A handler-alapú eszköz/erőforrás/prompt kezelési magyarázat a skálázható, rugalmas szerverimplementációkhoz.
  - **Gyakorlati minták**: Valós helyzetek, ahol az alacsony szintű szerverminták előnyösek fejlettebb funkciók és architektúra esetén.

#### Egyszerű hitelesítés (03-GettingStarted/11-simple-auth)
- **Új fejezet hozzáadva**: Lépésről lépésre útmutató az egyszerű hitelesítés megvalósításához MCP szerverekben.
  - **Hitelesítési alapok**: Világos magyarázat a hitelesítés és jogosultságkezelés közötti különbségről, valamint a hitelesítő adatok kezeléséről.
  - **Alapvető hitelesítés megvalósítása**: Middleware-alapú hitelesítési minták Pythonban (Starlette) és TypeScriptben (Express), kódmintákkal.
  - **Haladás fejlettebb biztonság felé**: Útmutató az egyszerű hitelesítés kezdéséhez, majd továbblépés az OAuth 2.1-re és RBAC-ra, hivatkozásokkal fejlettebb biztonsági modulokra.

Ezek a bővítések gyakorlati, kézzelfogható iránymutatást nyújtanak a robosztusabb, biztonságosabb és rugalmasabb MCP szervermegvalósításokhoz, hidat képezve az alapvető fogalmak és a fejlett gyártási minták között.

## 2025. szeptember 29.

### MCP szerver adatbázis-integrációs laborok – Átfogó gyakorlati tanulási út

#### 11-MCPServerHandsOnLabs - Új teljes adatbázis-integrációs tananyag
- **Teljes 13 laborból álló tanfolyam**: Átfogó, gyakorlati tananyag hozzáadva gyártásra kész MCP szerverek PostgreSQL adatbázisintegrációval történő építéséhez
  - **Valós megvalósítás**: Zava Retail elemző esettanulmány, amely vállalati szintű mintákat mutat be
  - **Strukturált tanulási előrehaladás**:
    - **Laborok 00-03: Alapok** – Bevezetés, alaparchitektúra, biztonság és multi-tenancy, környezetbeállítás
    - **Laborok 04-06: MCP szerver építése** – Adatbázis-tervezés és séma, MCP szerver megvalósítás, eszközfejlesztés
    - **Laborok 07-09: Haladó funkciók** – Szemantikus keresés integrációja, tesztelés és hibakeresés, VS Code integráció
    - **Laborok 10-12: Gyártás és legjobb gyakorlatok** – Telepítési stratégiák, monitorozás és megfigyelhetőség, legjobb gyakorlatok és optimalizáció
  - **Vállalati technológiák**: FastMCP keretrendszer, PostgreSQL pgvectorral, Azure OpenAI beágyazások, Azure Container Apps, Application Insights
  - **Haladó funkciók**: Sor szintű biztonság (RLS), szemantikus keresés, több-bérlős adat-hozzáférés, vektor beágyazások, valós idejű monitorozás

#### Terminológia szabványosítás – Modulról laborra váltás
- **Átfogó dokumentáció frissítés**: Az összes README fájl rendszeres frissítése a 11-MCPServerHandsOnLabs könyvtárban, hogy a „Lab” terminológiát használják a „Module” helyett
  - **Szakaszfejlécek**: Az összes 13 laborban a „Mit fed le ez a modul” helyett „Mit fed le ez a labor” kifejezést használtuk
  - **Tartalmi leírások**: A „Ez a modul biztosítja...” helyett „Ez a labor biztosítja...” szöveg módosítása a dokumentációban
  - **Tanulási célok**: A „A modul végére...” helyett „A labor végére...”
  - **Navigációs hivatkozások**: Minden „Module XX:” hivatkozás átalakítása „Lab XX:” formátumra kereszthivatkozásokban és navigációban
  - **Teljesítési nyomonkövetés**: „A modul befejezése után...” módosítás „A labor befejezése után...” formára
  - **Műszaki hivatkozások megőrzése**: A konfigurációs fájlokban (pl. `"module": "mcp_server.main"`) a Python modulnevek változatlanok maradtak

#### Tanulmányi útmutató fejlesztése (study_guide.md)
- **Vizuális tantervtérkép**: Új „11. Adatbázis-integrációs laborok” szakasz hozzáadása az átfogó laborstruktúra vizualizációval
- **Tárolószerkezet**: A fő szakaszok számának növelése tízről tizenegyre az 11-MCPServerHandsOnLabs részletes leírásával
- **Tanulási útmutatás**: Navigációs utasítások kiterjesztése a 00–11 szakaszokra
- **Technológiai lefedettség**: FastMCP, PostgreSQL, Azure szolgáltatások integrációjának hozzáadása
- **Tanulási eredmények**: Gyártásra kész szerverfejlesztés, adatbázis-integrációs minták és vállalati biztonság hangsúlyozása

#### Fő README szerkezet fejlesztése
- **Labor-alapú terminológia**: Az 11-MCPServerHandsOnLabs fő README.md fájljának frissítése a „Lab” struktúra következetes használatára
- **Tanulási út szervezése**: Egyértelmű előrehaladás az alapfogalmaktól a fejlett megvalósításon át a gyártásra történő telepítésig
- **Valós fókusz**: Gyakorlati, kézzelfogható tanulás hangsúlya vállalati szintű mintákkal és technológiákkal

### Dokumentáció minőség- és következetességi fejlesztések
- **Gyakorlati tanulás hangsúlya**: A gyakorlati, labor-alapú megközelítés erősítése az egész dokumentációban
- **Vállalati minták fókusza**: Gyártásra kész megvalósítások és vállalati biztonsági megfontolások kiemelése
- **Technológiai integráció**: Azure modern szolgáltatásainak és AI integrációs mintáinak átfogó lefedése
- **Tanulási előrehaladás**: Világos, strukturált út az alapfogalmaktól a gyártásra telepítésig

## 2025. szeptember 26.

### Esettanulmány bővítés – GitHub MCP Registry integráció

#### Esettanulmányok (09-CaseStudy/) – Ökoszisztéma fejlődés fókusz
- **README.md**: Jelentős bővítés átfogó GitHub MCP Registry esettanulmánnyal
  - **GitHub MCP Registry esettanulmány**: Új átfogó esettanulmány a GitHub 2025 szeptemberi MCP Registry indulásáról
    - **Probléma analízis**: Részletes elemzés a fragmentált MCP szerver felfedezésről és telepítési kihívásokról
    - **Megoldás architektúra**: GitHub központosított registry megközelítése egykattintásos VS Code telepítéssel
    - **Üzleti hatás**: Mérhető fejlesztések a fejlesztői betanulásban és termelékenységben
    - **Stratégiai érték**: Moduláris ügynök telepítés és eszközök közti interoperabilitás fókusz
    - **Ökoszisztéma fejlesztés**: Alapplatformként való pozícionálás az ügynöki integrációhoz
  - **Fejlesztett esettanulmány struktúra**: Az összes hét esettanulmány egységes formázása és részletes leírása
    - Azure AI Travel Agents: Többügynökös összehangolás hangsúlyozása
    - Azure DevOps integráció: Munkafolyamat-automatizáció fókusz
    - Valós idejű dokumentumlekérdezés: Python konzolos kliens megvalósítása
    - Interaktív tanulási terv generátor: Chainlit alapú beszélgetős webalkalmazás
    - Szerkesztői dokumentáció: VS Code és GitHub Copilot integráció
    - Azure API Management: Vállalati API integrációs minták
    - GitHub MCP Registry: Ökoszisztéma fejlesztés és közösségi platform
  - **Átfogó összefoglaló**: Újratervezett konklúzió hét esettanulmányra kiterjedve, amelyek több MCP megvalósítási dimenziót fednek le
    - Vállalati integráció, több-ügynök összehangolás, fejlesztői termelékenység
    - Ökoszisztéma fejlesztés, oktatási alkalmazások kategorizálása
    - Mélyebb bepillantás az architekturális mintákba, megvalósítási stratégiákba és legjobb gyakorlatokba
    - MCP hangsúlyozása érett, gyártásra kész protokollként

#### Tanulmányi útmutató frissítések (study_guide.md)
- **Vizuális tantervtérkép**: Frissített gondolattérkép a GitHub MCP Registry esettel az Esettanulmányok szekcióban
- **Esettanulmányok leírása**: Átfogó hét esettanulmány részletes bontásával bővítve az általános leírásokat
- **Tárolószerkezet**: A 10. szekció frissítése az átfogó esettanulmány lefedettség és konkrét megvalósítások tükrében
- **Változásnapló integráció**: 2025. szeptember 26-i bejegyzés GitHub MCP Registry hozzáadásáról és esettanulmány fejlesztésekről
- **Dátumbeállítások frissítése**: Lábléc időbélyegzésének frissítése a legutóbbi módosításra (2025. szeptember 26.)

### Dokumentáció minőségfejlesztések
- **Következetesség javítása**: Esettanulmányok formázásának és szerkezetének egységesítése a hét példában
- **Átfogó lefedettség**: Esettanulmányok lefedik a vállalati, fejlesztői termelékenységi és ökoszisztéma fejlesztési forgatókönyveket
- **Stratégiai pozicionálás**: MCP hangsúlyozása alapvető platformként az ügynöki rendszer telepítéshez
- **Erőforrás integráció**: Kiegészítő erőforrások frissítése a GitHub MCP Registry hivatkozással

## 2025. szeptember 15.

### Haladó témakör bővítés – Egyedi szállítók és kontextusmérnökség

#### MCP egyedi szállítók (05-AdvancedTopics/mcp-transport/) – Új haladó megvalósítási útmutató
- **README.md**: Teljes megvalósítási útmutató az egyedi MCP szállító mechanizmusokhoz
  - **Azure Event Grid szállító**: Átfogó szerver nélküli, eseményvezérelt szállító megvalósítás
    - C#, TypeScript és Python példák Azure Functions integrációval
    - Eseményvezérelt architektúra minták skálázható MCP megoldásokhoz
    - Webhook fogadók és push alapú üzenetkezelés
  - **Azure Event Hubs szállító**: Nagy áteresztőképességű streaming szállító megvalósítás
    - Valós idejű streamelési képességek alacsony késleltetésű forgatókönyvekhez
    - Partíció-kezelési stratégiák és ellenőrzőpont kezelés
    - Üzenetcsomagolás és teljesítmény optimalizáció
  - **Vállalati integrációs minták**: Gyártásra kész architekturális példák
    - Elosztott MCP feldolgozás több Azure Functionön keresztül
    - Hibrid szállító architektúrák több szállítótípus kombinálásával
    - Üzenettartósság, megbízhatóság és hiba kezelési stratégiák
  - **Biztonság és monitorozás**: Azure Key Vault integráció és megfigyelhetőségi minták
    - Felügyelt identitás alapú hitelesítés és legkisebb jogosultság elve
    - Application Insights telemetria és teljesítmény monitorozás
    - Áramkör törők és hibamentességi minták
  - **Tesztelési keretrendszerek**: Átfogó tesztelési stratégiák az egyedi szállítókhoz
    - Egység tesztelés teszt dupla objektumokkal és mock keretrendszerekkel
    - Integrációs tesztelés Azure Test Containers segítségével
    - Teljesítmény- és terheléses tesztelés szempontjai

#### Kontextusmérnökség (05-AdvancedTopics/mcp-contextengineering/) – Feltörekvő AI terület
- **README.md**: Átfogó áttekintés a kontextusmérnökségről mint feltörekvő szakterületről
  - **Alapelvek**: Teljes kontextus megosztás, döntés tudatosság és kontextusablak kezelés
  - **MCP protokoll összhang**: Hogyan kezeli az MCP a kontextusmérnökségi kihívásokat
    - Kontextusablak korlátok és fokozatos betöltési stratégiák
    - Relevancia meghatározás és dinamikus kontextus lekérés
    - Többmodalitású kontextuskezelés és biztonsági szempontok
  - **Megvalósítási megközelítések**: Egyszálú kontra több-ügynök architektúra
    - Kontextus darabolás és priorizálás technikák
    - Fokozatos kontextus betöltés és tömörítés stratégiák
    - Rétegezett kontextus-megközelítések és lekérdezés optimalizáció
  - **Mérési keretrendszer**: Feltörekvő metrikák a kontextus hatékonyságának értékelésére
    - Bemeneti hatékonyság, teljesítmény, minőség és felhasználói élmény szempontok
    - Kísérleti megközelítések a kontextus optimalizálására
    - Hibaanalízis és fejlesztési módszertanok

#### Tananyag navigációs frissítések (README.md)
- **Fejlesztett modulstruktúra**: Tananyag táblázat frissítése új haladó témák hozzáadásával
  - Kontextusmérnökség (5.14) és Egyedi szállító (5.15) felvétele
  - Egységes formázás és navigációs linkek az összes modul esetén
  - Leírások frissítve az aktuális témakör lefedettség szerint

### Könyvtárszerkezet fejlesztések
- **Elnevezési szabványosítás**: A „mcp transport” átnevezése „mcp-transport”-ra, egységesítésként az egyéb haladó témakör mappákkal
- **Tartalom rendezés**: Minden 05-AdvancedTopics könyvtár most az egységes „mcp-[téma]” elnevezést követi

### Dokumentáció minőségjavítások
- **MCP specifikáció összhang**: Minden új tartalom a jelenlegi MCP Specification 2025-06-18 alapján készült
- **Többnyelvű példák**: Átfogó kódpéldák C#, TypeScript és Python nyelveken
- **Vállalati fókusz**: Gyártásra kész minták és Azure felhőintegráció végig
- **Vizuális dokumentáció**: Mermaid diagramok az architektúra és folyamatábrák vizualizálásához

## 2025. augusztus 18.

### Dokumentáció átfogó frissítése – MCP 2025-06-18 szabványok

#### MCP Biztonsági legjobb gyakorlatok (02-Security/) – Teljes modernizáció
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Teljes újraírás az MCP Specification 2025-06-18 összehangolásában
  - **Kötelező követelmények**: Hivatalos specifikációból származó egyértelmű KELL/NEM KELL követelmények vizuális jelzésekkel
  - **12 alapvető biztonsági gyakorlat**: 15 elemből álló lista átszervezése átfogó biztonsági területekre
    - Token biztonság és hitelesítés külső identitásszolgáltató integrációval
    - Munkamenet-kezelés és transzport biztonság kriptográfiai követelményekkel
    - AI-specifikus fenyegetésvédelem Microsoft Prompt Shields integrációval
    - Hozzáférés-vezérlés és jogosultságkezelés a legkisebb jogosultság elve szerint
    - Tartalombiztonság és monitorozás Azure Content Safety integrációval
    - Ellátási lánc biztonság átfogó komponensellenőrzéssel
    - OAuth biztonság és Confused Deputy támadások megelőzése PKCE implementációval
    - Eseménykezelés és helyreállítás automatizált képességekkel
    - Megfelelőség és irányítás szabályozási összhanggal
    - Haladó biztonsági vezérlések zéró-Trust architektúrával
    - Microsoft biztonsági ökoszisztéma integráció több megoldással
    - Folyamatos biztonsági fejlődés adaptív gyakorlatokkal
  - **Microsoft biztonsági megoldások**: Bővített integrációs útmutatók Prompt Shields, Azure Content Safety, Entra ID és GitHub Advanced Security szempontból
  - **Megvalósítási erőforrások**: Átfogó erőforráshivatkozások kategorizálása Hivatalos MCP dokumentáció, Microsoft biztonsági megoldások, biztonsági szabványok és megvalósítási útmutatók szerint

#### Haladó biztonsági vezérlések (02-Security/) – Vállalati megvalósítás
- **MCP-SECURITY-CONTROLS-2025.md**: Teljes átdolgozás vállalati szintű biztonsági keretrendszerrel
  - **9 átfogó biztonsági terület**: Az alapvezérlések bővítése részletes vállalati keretrendszerre
    - Haladó hitelesítés és jogosultságkezelés Microsoft Entra ID integrációval
    - Token biztonság és anti-passthrough vezérlések átfogó érvényesítéssel
    - Munkamenet-biztonsági vezérlések eltérítés elleni védelemmel
    - AI-specifikus biztonsági vezérlések prompt befecskendezés és eszközmérgezés elleni védelemmel
    - Confused Deputy támadás elleni védelem OAuth proxy biztonsággal
    - Eszközvégrehajtási biztonság homokozózással és izolációval
    - Ellátási lánc biztonsági vezérlések függőségellenőrzéssel
    - Monitorozási és érzékelési vezérlések SIEM integrációval
    - Eseménykezelés és helyreállítás automatizált képességekkel
  - **Megvalósítási példák**: Részletes YAML konfigurációs blokkok és kódpéldák hozzáadása
  - **Microsoft megoldások integrációja**: Átfogó lefedettség Azure biztonsági szolgáltatásokról, GitHub Advanced Security-ről és vállalati identitáskezelésről

#### Haladó témakörök biztonsága (05-AdvancedTopics/mcp-security/) – Gyártásra kész implementáció
- **README.md**: Teljes újraírás vállalati biztonsági megvalósításhoz
  - **Jelenlegi specifikáció összhangja**: Frissítés az MCP Specification 2025-06-18 és kötelező biztonsági követelmények szerint
  - **Fejlesztett hitelesítés**: Microsoft Entra ID integráció átfogó .NET és Java Spring Security példákkal
  - **AI biztonság integrációja**: Microsoft Prompt Shields és Azure Content Safety megvalósítás részletes Python példákkal
  - **Haladó fenyegetéscsökkentés**: Átfogó megvalósítási példák
    - Confused Deputy támadás megelőzése PKCE-vel és felhasználói beleegyezés ellenőrzéssel
    - Token passthrough megelőzése közönség érvényesítéssel és biztonságos token kezeléssel
    - Munkamenet eltulajdonításának megelőzése kriptográfiai kötés és viselkedéselemzés segítségével
  - **Vállalati biztonsági integráció**: Azure Application Insights megfigyelés, fenyegetésészlelési folyamatok és ellátási lánc biztonság
  - **Megvalósítási ellenőrzőlista**: Egyértelmű kötelező és ajánlott biztonsági intézkedések a Microsoft biztonsági ökoszisztéma előnyeivel

### Dokumentáció minősége és szabványokhoz igazítás
- **Specifikáció hivatkozások**: Minden hivatkozás frissítve az aktuális MCP Specifikáció 2025-06-18-ra
- **Microsoft Biztonsági Ökoszisztéma**: Átfogó integrációs útmutatás az összes biztonsági dokumentációban
- **Gyakorlati megvalósítás**: Részletes kód példák hozzáadva .NET, Java és Python nyelveken vállalati mintákkal
- **Erőforrás szervezés**: Hivatalos dokumentációk, biztonsági szabványok és megvalósítási útmutatók átfogó kategorizálása
- **Látványos jelzések**: Egyértelmű megkülönböztetése a kötelező követelményeknek és ajánlott gyakorlatoknak


#### Alapkoncepciók (01-CoreConcepts/) - Teljes modernizáció
- **Protokoll verzió frissítés**: Frissítve a hivatkozás az aktuális MCP Specifikáció 2025-06-18 alapján dátumalapú verziózással (ÉÉÉÉ-HH-NN formátum)
- **Architektúra finomhangolás**: Továbbfejlesztett leírás Hosztok, Kliensek és Szerverek esetén az aktuális MCP architektúra minták szerint
  - A Hosztok most egyértelműen AI alkalmazásokként definiálva, amelyek több MCP kliens kapcsolatot koordinálnak
  - A Kliensek protokoll kapcsolóként vannak leírva, amelyek egy-egy szerver kapcsolatot tartanak fenn
  - A Szerverek helyi és távoli telepítési forgatókönyvekkel bővítve
- **Primitívek átalakítása**: Teljes felülvizsgálat a szerver és kliens primitíveknél
  - Szerver primitívek: Erőforrások (adatforrások), Promtok (sablonok), Eszközök (futtatható funkciók) részletes magyarázatokkal és példákkal
  - Kliens primitívek: Mintavételezés (LLM kimenetek), Kiváltás (felhasználói input), Naplózás (hibakeresés/megfigyelés)
  - Frissítve az aktuális felfedező (`*/list`), lekérdező (`*/get`) és végrehajtó (`*/call`) metódus mintákra
- **Protokoll architektúra**: Két rétegű architektúra modell bevezetése
  - Adat réteg: JSON-RPC 2.0 alap, életciklus kezelés és primitívek
  - Szállítási réteg: STDIO (helyi) és Streamable HTTP SSE-vel (távoli) szállítási mechanizmusok
- **Biztonsági keretrendszer**: Átfogó biztonsági elvek, beleértve a felhasználói kifejezett hozzájárulást, adatvédelmet, eszköz végrehajtás biztonságát és szállítási réteg biztonságot
- **Kommunikációs minták**: Protokoll üzenetek frissítve az inicializálás, felfedezés, végrehajtás és értesítés folyamatok megjelenítésére
- **Kód példák**: Többnyelvű példák (.NET, Java, Python, JavaScript) frissítve az aktuális MCP SDK minták szerint

#### Biztonság (02-Security/) - Átfogó biztonsági átalakítás  
- **Szabványokhoz igazítás**: Teljes összhang az MCP Specifikáció 2025-06-18 biztonsági követelményeivel
- **Hitelesítés fejlődése**: Dokumentált evolúció az egyedi OAuth szerverektől a külső identitás szolgáltató delegációig (Microsoft Entra ID)
- **AI-specifikus fenyegetés elemzés**: Kiterjedtebb lefedettség a modern AI támadási vektorokra
  - Részletes prompt injekciós támadási forgatókönyvek valós példákkal
  - Eszköz mérgezési mechanizmusok és "rug pull" támadási minták
  - Kontextus ablak mérgezés és modell összezavarás támadások
- **Microsoft AI biztonsági megoldások**: Átfogó lefedettség a Microsoft biztonsági ökoszisztémában
  - AI Prompt Shields fejlett észlelési, kiemelési és határoló technikákkal
  - Azure Content Safety integrációs minták
  - GitHub Advanced Security az ellátási lánc védelméért
- **Fejlett fenyegetés mérséklés**: Részletes biztonsági szabályozások
  - Munkamenet eltulajdonítás MCP-specifikus támadási forgatókönyvekkel és kriptográfiai munkamenet azonosító követelményekkel
  - Confused deputy problémák MCP proxy forgatókönyvekben egyértelmű hozzájárulási követelményekkel
  - Token átvitel sérülékenységek kötelező érvényesítési szabályokkal
- **Ellátási lánc biztonság**: Bővített AI ellátási lánc lefedettség alapmodellekkel, beágyazási szolgáltatásokkal, kontextus szolgáltatókkal és harmadik fél API-kkal
- **Alap biztonság**: Fejlesztett integráció vállalati biztonsági mintákkal, beleértve a zero trust architektúrát és Microsoft biztonsági ökoszisztémát
- **Erőforrás szervezés**: Kategorizált átfogó erőforrás linkek típus szerint (Hivatalos dokumentációk, szabványok, kutatás, Microsoft megoldások, megvalósítási útmutatók)

### Dokumentáció minőség javítások
- **Strukturált tanulási célok**: Fejlesztett tanulási célok konkrét, végrehajtható eredményekkel 
- **Kereszt hivatkozások**: Biztonsági és alapkoncepció témák közötti linkek hozzáadva
- **Aktuális információk**: Minden dátum hivatkozás és specifikáció link frissítve az aktuális szabványokra
- **Megvalósítási útmutatás**: Konkrét, végrehajtható megvalósítási irányelvek hozzáadva mindkét szakaszban

## 2025. július 16.

### README és navigációs fejlesztések
- Teljesen áttervezett tananyag navigáció a README.md állományban
- `<details>` tagek helyett könnyebben hozzáférhető táblázatos formátum
- Alternatív elrendezési lehetőségek készítése az új "alternative_layouts" mappában
- Kártyás, lapozós és harmonika stílusú navigációs példák hozzáadva
- A tárhely struktúra szakasz frissítve az összes legfrissebb fájllal
- A "Hogyan használd ezt a tananyagot" szakasz egyértelmű ajánlásokkal bővítve
- MCP specifikáció linkek frissítve a helyes URL-ekre
- Kontextus mérnökség szakasz (5.14) hozzáadva a tananyag struktúrához

### Tanulmányi útmutató frissítések
- Teljesen átdolgozott tanulmányi útmutató az aktuális tárhely struktúrához igazítva
- Új szakaszok hozzáadva MCP kliensek és eszközök, valamint népszerű MCP szerverek témakörben
- A vizuális tananyag térkép pontosítva az összes témakör megjelenítésére
- Az előrehaladott témak leírása bővítve minden szakosodott területtel
- Esettanulmányok szakasz frissítve valós példákra
- Ez a részletes változásnapló hozzáadva

### Közösségi hozzájárulások (06-CommunityContributions/)
- Részletes információk MCP szerverekről kép generáláshoz hozzáadva
- Átfogó szakasz Claude használatáról VSCode-ban
- Cline terminál kliens beállítási és használati útmutatók hozzáadva
- MCP kliens szakasz frissítve az összes népszerű kliens opcióval
- Hozzájárulási példák pontosabb kódmintákkal bővítve

### Előrehaladott témák (05-AdvancedTopics/)
- Minden szakosodott témakönyvtár konzisztens elnevezéssel rendszerezve
- Kontextus mérnökségi anyagok és példák hozzáadva
- Foundry ügynök integrációs dokumentáció hozzáadva
- Entra ID biztonsági integráció dokumentáció fejlesztve

## 2025. június 11.

### Első verzió készítése
- Az MCP kezdőknek tananyag első verziójának kiadása
- Alap struktúra létrehozása mind a 10 fő szakasznak
- Vizuális tananyag térkép implementálása a navigációhoz
- Kezdeti mintaprojektek hozzáadva több programozási nyelven

### Első lépések (03-GettingStarted/)
- Első szerver megvalósítási példák készítése
- Kliens fejlesztési útmutatás hozzáadva
- LLM kliens integrációs utasítások szerepeltetése
- VS Code integrációs dokumentáció inkludálása
- Szerver által küldött események (SSE) szerver példák megvalósítása

### Alapkoncepciók (01-CoreConcepts/)
- Részletes kliens-szerver architektúra magyarázat hozzáadva
- Dokumentáció a kulcs protokoll komponensekről
- MCP üzenetküldési minták dokumentálása

## 2025. május 23.

### Tárhely struktúra
- Tárhely inicializálása alapmappastruktúrával
- README fájlok létrehozása mindegyik fő szakaszhoz
- Fordítási infrastruktúra beállítása
- Kép erőforrások és diagramok hozzáadása

### Dokumentáció
- Kezdeti README.md létrehozva a tananyag áttekintésével
- CODE_OF_CONDUCT.md és SECURITY.md hozzáadva
- SUPPORT.md létrehozva segítségkéréssel kapcsolatos útmutatással
- Előzetes tanulmányi útmutató struktúra kialakítása

## 2025. április 15.

### Tervezés és keretrendszer
- MCP kezdőknek tananyag kezdeti tervezése
- Tanulási célok és célközönség meghatározása
- A tananyag 10 szakaszos struktúrájának áttekintése
- Fogalmi keretrendszer kidolgozása példákhoz és esettanulmányokhoz
- Kezdeti prototípus példák létrehozása kulcskoncepciókhoz

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->