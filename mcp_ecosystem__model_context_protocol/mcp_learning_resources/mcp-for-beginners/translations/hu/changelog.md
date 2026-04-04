# Változásnapló: MCP kezdőknek tananyag

Ez a dokumentum az összes jelentős változás nyilvántartásaként szolgál a Model Context Protocol (MCP) kezdőknek szóló tananyagában. A változásokat fordított időrendi sorrendben dokumentáljuk (újabb változások elöl).

## 2026. február 5.

### Tárhely-szintű érvényesítés és navigációs fejlesztések

#### Új tananyagtartalom hozzáadva

**03. modul - Kezdés**
- **12-mcp-hosts/README.md**: Új átfogó útmutató MCP hostok beállításához
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigurációs példák
  - JSON konfigurációs sablonok az összes főbb host számára
  - Átviteli típusok összehasonlító táblázata (stdio, SSE/HTTP, WebSocket)
  - Gyakori csatlakozási problémák elhárítása
  - Biztonsági legjobb gyakorlatok a host konfigurációban

- **13-mcp-inspector/README.md**: Új hibakeresési útmutató az MCP Inspectorhoz
  - Telepítési módok (npx, npm globális, forrásból)
  - Csatlakozás szerverekhez stdio és HTTP/SSE protokollon keresztül
  - Tesztelő eszközök, erőforrások és prompt munkafolyamatok
  - VS Code integráció az MCP Inspectorral
  - Gyakori hibakeresési szituációk megoldásokkal

**04. modul - Gyakorlati megvalósítás**
- **pagination/README.md**: Új lapozás megvalósítási útmutató
  - Cursor-alapú oldalzás minták Pythonban, TypeScriptben, Javaban
  - Kliens oldali lapozás kezelése
  - Cursor tervezési stratégiák (átlátszatlan vs. strukturált)
  - Teljesítmény-optimalizálási ajánlások

**05. modul - Haladó témák**
- **mcp-protocol-features/README.md**: Új protokoll funkciók mélyebb ismertetése
  - Haladás értesítések megvalósítása
  - Kérések megszakítási mintái
  - Erőforrás sablonok URI mintákkal
  - Szerver életciklus kezelése
  - Naplózási szintek vezérlése
  - Hibakezelési minták JSON-RPC kódokkal

#### Navigációs javítások (24+ fájl frissítve)

**Fő modul README-k**
 Most hivatkoznak az első leckére ÉS a következő modulra is

**02-Security alfájlok**
- Az összes 5 kiegészítő biztonsági dokumentum most már tartalmaz "Mi következik" navigációt:

**09-CaseStudy fájlok**
- Az összes esettanulmány fájl most már tartalmaz szekvenciális navigációt:

**10-StreamliningAI laborok**
Hozzáadva "Mi következik" rész a 10. modul áttekintéséhez és a 11. modulhoz

#### Kód- és tartalomjavítások

**SDK és függőségfrissítések**
Javított üres openai verzió `^4.95.0`-ra
SDK frissítve `^1.8.0`-ról `>=1.26.0`-ra
MCP verzió pinyek frissítve `>=1.26.0`-ra

**Kódjavítások**
Helytelen modell `gpt-4o-mini` javítva `gpt-4.1-mini`-ra

**Tartalomjavítások**
Eltört link javítva `READMEmd` → `README.md`, tananyag fejléc javítva `Module 1-3` → `Module 0-3`, kis- és nagybetű érzékeny elérési utak javítva
Megszüntetve az 5. esettanulmány megduplázódott sérült tartalma

**Kezdők iránymutatásának fejlesztése**
Megfelelő bevezetés, tanulási célok és előfeltételek hozzáadása a kezdők számára

#### Tananyagelemek frissítései

**Fő README.md**
- Hozzáadva a 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Lapozás), 5.16 (Protokoll funkciók) bejegyzések a tananyag táblázathoz

**Modul README-k**
Hozzáadva a 12. és 13. leckék a lecke listához
Hozzáadva Gyakorlati útmutatók szakasz lapozás linkkel
Hozzáadva a 5.15 (Egyedi Átviteli mód) és 5.16 (Protokoll funkciók) leckék

**study_guide.md**
- Frissítve az összes új témával: MCP Hosts Beállítás, MCP Inspector, Lapozási stratégiák, Protokoll funkciók mélyvizsgálata

## 2026. január 28.

### MCP Specifikáció 2025-11-25 megfelelőség ellenőrzés

#### Alapkoncepciók fejlesztése (01-CoreConcepts/)
- **Új kliens primitív - Roots**: Átfogó dokumentáció hozzáadása a Roots kliens primitívhez, amely lehetővé teszi a szerverek számára a fájlrendszer határok és hozzáférési jogosultságok megértését
- **Eszköz annotációk**: Dokumentáció a eszközök viselkedési annotációiról (`readOnlyHint`, `destructiveHint`) a jobb eszközvégrehajtási döntésekhez
- **Eszköz hívás mintavételkor**: Frissítve a Mintavétel dokumentációja, hogy tartalmazza a `tools` és `toolChoice` paramétereket a modell által vezérelt eszköz-hívásokhoz mintavételi kérelmek során
- **URL mód kiváltás**: Dokumentáció az URL alapú kiváltásról a szerver kezdeményezte külső webes interakciókhoz
- **Feladatok (kísérleti)**: Új rész a kísérleti Feladatok funkció dokumentálására tartós végrehajtási wrapper-ekhez és elhalasztott eredmény lekéréshez
- **Ikon támogatás**: Megjegyezve, hogy az eszközök, erőforrások, erőforrás sablonok és promptok mostantól ikonokat is tartalmazhatnak kiegészítő metaadatként

#### Dokumentáció frissítések
- **README.md**: Hozzáadva MCP Specifikáció 2025-11-25 verzióhivatkozás és dátum alapú verziókezelési magyarázat
- **study_guide.md**: Frissítve a tananyagtérkép a Feladatokkal és Eszköz annotációkkal az Alapkoncepciók fejezetében; dokumentumtimetamp frissítése

#### Specifikáció megfelelőségi ellenőrzés
- **Protokoll verzió**: Ellenőrizve, hogy minden dokumentáció az aktuális MCP Specifikáció 2025-11-25-öt hivatkozza
- **Architektúra illeszkedés**: Megerősítve a két rétegű architektúra (Adatréteg + Átviteli réteg) dokumentációpontossága
- **Primitívek dokumentálása**: Ellenőrizve szerver primitívek (Erőforrások, Promptok, Eszközök) és kliens primitívek (Mintavétel, Kiváltás, Naplózás, Roots) helyessége
- **Átviteli mechanizmusok**: Ellenőrizve STDIO és Streaming HTTP átviteli dokumentáció pontossága
- **Biztonsági útmutatás**: Megerősítve a jelenlegi MCP Biztonsági legjobb gyakorlatok dokumentációval való összhang

#### MCP 2025-11-25 kulcsfontosságú funkciók dokumentálva
- **OpenID Connect felfedezés**: Auth szerver felfedezés OIDC-n keresztül
- **OAuth kliens azonosító metaadat dokumentumok**: Ajánlott kliens regisztrációs mechanizmus
- **JSON Schema 2020-12**: MCP séma definíciók alapértelmezett dialektusa
- **SDK szintezés rendszere**: Formális elvárások az SDK funkció támogatására és karbantartására
- **Irányítási struktúra**: Formális Munkacsoportok és Érdeklődési csoportok meghatározása az MCP irányításban

### Biztonsági dokumentáció fő frissítése (02-Security/)

#### MCP Biztonsági Csúcstalálkozó Workshop (Sherpa) integráció
- **Új gyakorlati képzési forrás**: Átfogó integráció hozzáadva a [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) dokumentációhoz
- **Expedíciós útvonal lefedés**: Dokumentálva a teljes táborról táborra haladás az Alaptábortól a Csúcsig
- **OWASP összhang**: Minden biztonsági útmutatás mostantól az OWASP MCP Azure Biztonsági Útmutató kockázataihoz van igazítva

#### OWASP MCP Top 10 integráció
- **Új szakasz**: Hozzáadva OWASP MCP Top 10 biztonsági kockázat táblázat Azure enyhítésekkel a fő Biztonság README-be
- **Kockázat-alapú dokumentáció**: Frissítve a mcp-security-controls-2025.md az OWASP MCP kockázati hivatkozásokkal minden biztonsági területhez
- **Referenciarendszer**: Hivatkozás az OWASP MCP Azure Biztonsági Útmutató referenciarendszerére és megvalósítási mintáira

#### Frissített biztonsági fájlok
- **README.md**: Hozzáadva Sherpa Workshop áttekintés, expedíciós útvonal táblázat, OWASP MCP Top 10 kockázatok összefoglalója, gyakorlati képzés szakasz
- **mcp-security-controls-2025.md**: Fejléc frissítve 2026 februárra, OWASP kockázati hivatkozások (MCP01-MCP08) hozzáadva, specifikáció verzió inkonzisztencia javítva
- **mcp-security-best-practices-2025.md**: Sherpa és OWASP forrásrész hozzáadva, időbélyeg frissítve
- **mcp-best-practices.md**: Gyakorlati képzés szakasz Sherpa és OWASP linkekkel hozzáadva
- **azure-content-safety-implementation.md**: OWASP MCP06 hivatkozás, Sherpa Camp 3 illeszkedés, és további erőforrások rész hozzáadva

#### Új erőforrás linkek hozzáadva
- [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Biztonsági Útmutató](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Egyedi OWASP MCP kockázati oldalak (MCP01-MCP10)

### Tananyag szintű MCP Specifikáció 2025-11-25 illeszkedés

#### 03. modul - Kezdés
- **SDK dokumentáció**: Hozzáadva Go SDK az hivatalos SDK listához; frissítve minden SDK hivatkozás, hogy illeszkedjen az MCP Specifikáció 2025-11-25-höz
- **Átviteli tisztázás**: Frissítve STDIO és HTTP Streaming átviteli leírások, explicitebb specifikáció hivatkozásokkal

#### 04. modul - Gyakorlati megvalósítás
- **SDK frissítések**: Hozzáadva Go SDK; SDK lista frissítve specifikáció verzió hivatkozással
- **Authorization Spec**: Frissítve az MCP Authorization specifikáció link a 2025-11-25 aktuális verzióra

#### 05. modul - Haladó témák
- **Új funkciók**: Hozzáadva megjegyzés az MCP Specifikáció 2025-11-25 új funkcióiról (Feladatok, Eszköz annotációk, URL mód kiváltás, Roots)
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 és Sherpa workshop linkek további hivatkozásokhoz

#### 06. modul - Közösségi hozzájárulások
- **SDK lista**: Hozzáadva Swift és Rust SDK-k; frissítve a specifikáció linkje 2025-11-25-re
- **Spec hivatkozás**: Frissítve MCP Specifikáció link közvetlen specifikáció URL-re

#### 07. modul - Korai adaptációk tanulságai
- **Erőforrások frissítése**: Hozzáadva MCP Specifikáció 2025-11-25 link és OWASP MCP Top 10 a kiegészítő forrásokhoz

#### 08. modul - Legjobb gyakorlatok
- **Spec verzió**: Frissítve MCP Specifikáció hivatkozás 2025-11-25-re
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 és Sherpa workshop a kiegészítő forrásokhoz

#### 10. modul - AI munkafolyamatok egyszerűsítése
- **Jelvény frissítés**: MCP verziójelvény változtatva SDK verzióról (1.9.3) specifikáció verzióra (2025-11-25)
- **Erőforrás-linkek**: Frissítve MCP Specifikáció link; hozzáadva OWASP MCP Top 10

#### 11. modul - MCP Szerver gyakorlati laborok
- **Specifikáció hivatkozás**: Frissítve MCP Specifikáció link 2025-11-25 verzióra
- **Biztonsági források**: Hozzáadva OWASP MCP Top 10 a hivatalos forrásokhoz

## 2025. december 18.

### Biztonsági dokumentáció frissítés - MCP Specifikáció 2025-11-25

#### MCP Biztonsági legjobb gyakorlatok (02-Security/mcp-best-practices.md) - specifikáció verzió frissítés
- **Protokoll verziófrissítés**: Frissítve az MCP Specifikáció 2025-11-25 legújabb verzió hivatkozására (2025. november 25-i kiadás)
  - Az összes specifikáció verzióhivatkozás frissítve 2025-06-18-ról 2025-11-25-re
  - Dokumentum dátum hivatkozások frissítve 2025. augusztus 18-ról 2025. december 18-ra
  - Ellenőrizve, hogy minden specifikáció URL az aktuális dokumentációra mutat
- **Tartalom érvényesítés**: Átfogó ellenőrzés a biztonsági legjobb gyakorlatokra a legfrissebb szabványok szerint
  - **Microsoft biztonsági megoldások**: Ellenőrizve a jelenlegi terminológiák és linkek a Prompt Shields (korábban "Jailbreak kockázatészlelés"), Azure Content Safety, Microsoft Entra ID és Azure Key Vault vonatkozásában
  - **OAuth 2.1 biztonság**: Megerősítve az összhang a legfrissebb OAuth biztonsági legjobb gyakorlatokkal
  - **OWASP szabványok**: Validálva az OWASP Top 10 LLM-ekhez vonatkozó hivatkozások aktualitása
  - **Azure szolgáltatások**: Ellenőrizve minden Microsoft Azure dokumentációs link és legjobb gyakorlat
- **Szabványok megfelése**: Minden hivatkozott biztonsági szabvány megerősítve aktuálisként
  - NIST AI Kockázatkezelési Keretrendszer
  - ISO 27001:2022
  - OAuth 2.1 Biztonsági Legjobb Gyakorlatok
  - Azure biztonsági és megfelelőségi keretrendszerek
- **Megvalósítási források**: Ellenőrizve minden implementációs útmutató linkje és erőforrása
  - Azure API Management hitelesítési minták
  - Microsoft Entra ID integrációs útmutatók
  - Azure Key Vault titkok kezelése
  - DevSecOps pipeline-ok és monitorozási megoldások

### Dokumentáció minőségbiztosítás
- **Specifikáció megfelelés**: Biztosítva, hogy minden kötelező MCP biztonsági követelmény (KELL/NEM KELL) összhangban van a legújabb specifikációval
- **Erőforrások aktualitása**: Ellenőrizve az összes külső link Microsoft dokumentációkhoz, biztonsági szabványokhoz és implementációs útmutatókhoz
- **Legjobb gyakorlatok lefedettsége**: Megerősítve a hitelesítés, jogosultságkezelés, AI specifikus fenyegetések, ellátási lánc biztonság és vállalati minták átfogó lefedettsége

## 2025. október 6.

### Kezdő rész bővítése – Haladó szerverhasználat és egyszerű hitelesítés

#### Haladó szerverhasználat (03-GettingStarted/10-advanced)
- **Új fejezet hozzáadva**: Átfogó útmutató a haladó MCP szerverhasználatban, mind az általános, mind az alacsony szintű szerverarchitektúrák bemutatásával.
  - **Általános vs. alacsony szintű szerver**: Részletes összehasonlítás és kódpéldák Pythonban és TypeScriptben mindkét megközelítésre
  - **Handler-alapú tervezés**: Ismertetés a handler alapú eszköz/erőforrás/prompt kezelésről a skálázható, rugalmas szervermegvalósításokhoz
  - **Gyakorlati minták**: Valós szituációk, ahol az alacsony szintű szerver minták hasznosak haladó funkciók és architektúra támogatására

#### Egyszerű hitelesítés (03-GettingStarted/11-simple-auth)
- **Új fejezet hozzáadva**: Lépésről lépésre útmutató egyszerű hitelesítés megvalósítására MCP szerverekben.
  - **Hitelesítési alapfogalmak**: Világos magyarázat a hitelesítés és engedélyezés közötti különbségekről, valamint a hitelesítő adatok kezeléséről
  - **Alap hitelesítés megvalósítás**: Middleware alapú hitelesítési minták Pythonban (Starlette) és TypeScriptben (Express), kódrészletekkel
  - **Fejlődés haladó biztonság felé**: Útmutatás az egyszerű hitelesítéssel való kezdéshez, majd továbbhaladáshoz OAuth 2.1-re és RBAC-ra, hivatkozásokkal a haladó biztonsági modulokra

Ezek a kiegészítések gyakorlati, kézzel fogható iránymutatásokat adnak erősebb, biztonságosabb és rugalmasabb MCP szerver implementációk építéséhez, összekapcsolva az alapfogalmakat a haladó üzemeltetési mintákkal.

## 2025. szeptember 29.

### MCP szerver adatbázis integrációs laborok – Átfogó gyakorlati tanulási út

#### 11-MCPServerHandsOnLabs – új teljes adatbázis integrációs tananyag
- **Komplett 13-Laboros Tanulási Út**: Átfogó, gyakorlati tanterv hozzáadva produkcióképes MCP szerverek építéséhez PostgreSQL adatbázis-integrációval
  - **Valós Világi Megvalósítás**: Zava Retail elemzési esettanulmány, amely vállalati szintű mintákat demonstrál
  - **Strukturált Tanulási Folyamat**:
    - **Laborok 00-03: Alapok** - Bevezetés, Alap Architektúra, Biztonság és Többlakóság, Környezetbeállítás
    - **Laborok 04-06: MCP Szerver Építése** - Adatbázis tervezés és séma, MCP szerver megvalósítása, Eszközfejlesztés   
    - **Laborok 07-09: Fejlett Funkciók** - Szemantikus keresés integráció, Tesztelés és hibakeresés, VS Code integráció
    - **Laborok 10-12: Termelés és Legjobb Gyakorlatok** - Telepítési stratégiák, Monitorozás és megfigyelhetőség, Legjobb gyakorlatok és optimalizáció
  - **Vállalati Technológiák**: FastMCP keretrendszer, PostgreSQL pgvector-rel, Azure OpenAI beágyazások, Azure Container Apps, Application Insights
  - **Fejlett Funkciók**: Sor szintű biztonság (RLS), szemantikus keresés, többbérlős adat-hozzáférés, vektorbeágyazások, valós idejű monitorozás

#### Terminológia Standardizálás - Modulról Laborra Átállás
- **Átfogó Dokumentáció Frissítés**: Minden 11-MCPServerHandsOnLabs README fájl tudatos frissítése „Labor” terminológia használatára „Modul” helyett
  - **Szekciófejlécek**: Az összes 13 laborban a „Mit fed le ez a modul” kifejezés „Mit fed le ez a labor” változatra alakítva
  - **Tartalom Leírása**: „Ez a modul biztosít...” kifejezések „Ez a labor biztosít...” alakra módosítva a dokumentációban
  - **Tanulási Célok**: „A modul végére...” frázisok „A labor végére...” változtatása
  - **Navigációs Hivatkozások**: Minden "Modul XX:" utalás átalakítása "Labor XX:" hivatkozásra kereszthivatkozásokban és navigációban
  - **Teljesítés Követés**: „Miután befejezted ezt a modult...” frázis „Miután befejezted ezt a labort...” változtatása
  - **Megőrzött Műszaki Utalások**: Konfigurációs fájlokban (pl. `"module": "mcp_server.main"`) Python modul hivatkozások megtartása

#### Tanulmányi Útmutató Fejlesztése (study_guide.md)
- **Vizualizált Tananyag Térkép**: Új „11. Adatbázis Integrációs Laborok” szekció hozzáadása átfogó laborstruktúra megjelenítéssel
- **Tárhelystruktúra**: A korábbi tíz fő szekcióról tizenegy fő szekcióra bővítés részletes 11-MCPServerHandsOnLabs leírással
- **Tanulási Útmutatás**: Bővített navigációs instrukciók a 00-11 szekciók lefedésére
- **Technológiai Lefedettség**: FastMCP, PostgreSQL, Azure szolgáltatások integráció részletei hozzáadva
- **Tanulási Eredmények**: Produkcióképes szerverfejlesztés, adatbázis-integrációs minták és vállalati biztonság hangsúlyozása

#### Fő README Strukturális Fejlesztés
- **Labor Alapú Terminológia**: Az 11-MCPServerHandsOnLabs fő README.md fájlban következetes „Labor” szerkezet használata
- **Tanulási Út Szervezés**: Világos előrehaladás az alapoktól a fejlett megvalósításig és produkciós telepítésig
- **Valós Világi Fókusz**: Gyakorlati, kézzel fogható tanulás vállalati szintű mintákkal és technológiákkal

### Dokumentáció Minőség és Következetesség Javítása
- **Gyakorlati Tanulás Hangsúlya**: Gyakorlati, labor alapú megközelítés kiemelése az egész dokumentációban
- **Vállalati Minták Kiemelése**: Produkcióképes megvalósítások és vállalati biztonsági megfontolások hangsúlyozása
- **Technológiai Integráció**: Korszerű Azure szolgáltatások és AI integrációs minták átfogó lefedése
- **Tanulási Haladás**: Világos, strukturált útvonal az alapfogalmaktól a produkciós telepítésig

## 2025. szeptember 26.

### Esettanulmányok Fejlesztése - GitHub MCP Registry Integráció

#### Esettanulmányok (09-CaseStudy/) - Ökoszisztéma Fejlesztési Fókusz
- **README.md**: Jelentős bővítés átfogó GitHub MCP Registry esettanulmánnyal
  - **GitHub MCP Registry Esettanulmány**: Új, részletes esettanulmány a GitHub MCP Registry 2025 szeptemberi elindításáról
    - **Problémaelemzés**: Részletes vizsgálat a töredezett MCP szerver felfedezési és telepítési kihívásokról
    - **Megoldási Architektúra**: GitHub központosított registry megközelítése egykattintásos VS Code telepítéssel
    - **Üzleti Hatás**: Mérhető fejlesztések a fejlesztői beilleszkedésben és produktivitásban
    - **Stratégiai Érték**: Moduláris ügynök telepítés és eszközök közti interoperabilitás kiemelése
    - **Ökoszisztéma Fejlesztés**: Alapvető platformként való pozicionálás az ügynöki integrációhoz
  - **Fejlesztett Esettanulmány Struktúra**: Az összes hét esettanulmány frissítve egységes formázással és átfogó leírással
    - Azure AI Utazási Ügynökök: Több ügynökös összehangolás hangsúlya
    - Azure DevOps Integráció: Munkafolyamat automatizálás fókusz
    - Valós idejű dokumentum lekérés: Python konzol kliens megvalósítás
    - Interaktív Tanulmányi Terv Generátor: Chainlit beszélgetős webalkalmazás
    - Szerkesztői dokumentáció: VS Code és GitHub Copilot integráció
    - Azure API Management: Vállalati API integrációs minták
    - GitHub MCP Registry: Ökoszisztéma fejlesztés és közösségi platform
  - **Átfogó Összefoglaló**: Átdolgozott záró rész a hét esettanulmány sokrétű MCP megvalósítási dimenzióval
    - Vállalati integráció, több-ügynökös összehangolás, fejlesztői hatékonyság
    - Ökoszisztéma fejlesztés, oktatási alkalmazások kategorizálása
    - Mélyebb betekintés az architektúra mintákba, megvalósítási stratégiákba és legjobb gyakorlatokba
    - MCP mint kifinomult, produkcióképes protokoll hangsúlyozása

#### Tanulmányi Útmutató Frissítések (study_guide.md)
- **Vizualizált Tananyag Térkép**: Frissített szemléltetés a GitHub MCP Registry hozzátételével az Esettanulmányok szekcióba
- **Esettanulmányok Leírása**: Általános leírások helyett részletes bontás a hét átfogó esettanulmányról
- **Tárhelystruktúra**: 10. szekció frissítve az esettanulmányok átfogó lefedésére részletes megvalósítási információkkal
- **Változásnapló Integráció**: Hozzáadva 2025. szeptember 26. bejegyzés a GitHub MCP Registry és esettanulmány fejlesztések dokumentálásával
- **Dátum Frissítés**: Lábléc időbélyeg az utolsó módosítás dátumára (2025. szeptember 26.) frissítve

### Dokumentáció Minőségfejlesztések
- **Következetesség Erősítése**: Esettanulmányok formázásának és szerkezetének egységesítése mind a hét példánál
- **Átfogó Lefedettség**: Az esettanulmányok most vállalati, fejlesztői hatékonysági és ökoszisztéma fejlesztési helyzeteket is lefednek
- **Stratégiai Pozícionálás**: MCP mint alapvető platform az ügynöki rendszerek bevezetésére fokozott hangsúllyal
- **Erőforrás Integráció**: Kiegészítő források frissítése GitHub MCP Registry linkkel

## 2025. szeptember 15.

### Fejlett Témák Bővítése - Egyedi Transzportok és Kontextus Menedzsment

#### MCP Egyedi Transzportok (05-AdvancedTopics/mcp-transport/) - Új Haladó Megvalósítási Útmutató
- **README.md**: Teljes útmutató egyedi MCP transzport mechanizmusok megvalósításához
  - **Azure Event Grid Transzport**: Átfogó szerver nélküli esemény-vezérelt transzport megvalósítás
    - C#, TypeScript és Python példák Azure Functions integrációval
    - Esemény-vezérelt architektúra minták skálázható MCP megoldásokhoz
    - Webhook fogadók és push-alapú üzenetkezelés
  - **Azure Event Hubs Transzport**: Nagy áteresztőképességű streaming transzport implementáció
    - Valós idejű streaming alacsony késleltetésű helyzetekhez
    - Particionálási stratégiák és checkpoint kezelés
    - Üzenet csomagolás és teljesítményoptimalizáció
  - **Vállalati Integrációs Minták**: Produkcióképes architektúra példák
    - Elosztott MCP feldolgozás több Azure Functions között
    - Hibrid transzport architektúrák több transzport típus kombinációjával
    - Üzenet-tartósság, megbízhatóság és hibakezelési stratégiák
  - **Biztonság és Monitorozás**: Azure Key Vault integráció és megfigyelhetőségi minták
    - Kezelt identitás alapú hitelesítés és legkisebb jogosultság elve
    - Application Insights telemetria és teljesítmény monitorozás
    - Áramköri megszakítók és hibátűrő minták
  - **Tesztelési Keretrendszerek**: Átfogó tesztelési stratégiák egyedi transzportokhoz
    - Egység tesztelés tesztduplákkal és mock keretrendszerekkel
    - Integrációs tesztek Azure Test Containers használatával
    - Teljesítmény- és terheléses tesztelés megfontolások

#### Kontextus Menedzsment (05-AdvancedTopics/mcp-contextengineering/) - Feltörekvő AI Diszciplína
- **README.md**: Átfogó feltárás a kontextus menedzsment, mint feltörekvő terület témakörében
  - **Alapelvek**: Teljes kontextus megosztás, cselekvési döntési tudatosság, kontextus ablak kezelés
  - **MCP Protokoll Igazodás**: Hogyan kezeli az MCP a kontextus menedzsment kihívásait
    - Kontextus ablak korlátok és progresszív betöltési stratégiák
    - Relevancia meghatározás és dinamikus kontextus lekérés
    - Több módú kontextuskezelés és biztonsági megfontolások
  - **Megvalósítási Megközelítések**: Egy szálas vs. több ügynökös architektúrák
    - Kontextus darabolás és prioritizálási technikák
    - Progresszív kontextus betöltés és tömörítési stratégiák
    - Rétegzett kontextus megközelítések és lekérdezési optimalizáció
  - **Mérés Keretrendszer**: Feltörekvő metrikák a kontextus hatékonyság mérésére
    - Bemeneti hatékonyság, teljesítmény, minőség és felhasználói élmény megfontolások
    - Kísérleti megközelítések kontextus optimalizációra
    - Hibaanalízis és javítási módszertanok

#### Tananyag Navigáció Frissítések (README.md)
- **Fejlesztett Modul Struktúra**: Tananyag táblázat frissítése az új haladó témák felvételével
  - Kontextus Menedzsment (5.14) és Egyedi Transzport (5.15) hozzáadva
  - Következetes formázás és navigációs hivatkozások minden modulnál
  - Leírások aktualizálva a jelenlegi tartalom lefedettségére

### Mappaszerkezet Fejlesztések
- **Elnevezési Standardizálás**: „mcp transport” átnevezése „mcp-transport”-ra az egységesség kedvéért más haladó témák mappáihoz igazítva
- **Tartalom Szervezés**: Minden 05-AdvancedTopics mappa egységes „mcp-[téma]” elnevezést követ

### Dokumentáció Minőségfejlesztések
- **MCP Specifikáció Igazodás**: Minden új tartalom hivatkozik a legfrissebb MCP Specifikáció 2025-06-18-ra
- **Többnyelvű Példák**: Átfogó kódpéldák C#, TypeScript és Python nyelveken
- **Vállalati Fókusz**: Produkcióképes minták és Azure cloud integráció kiemelve
- **Vizualizált Dokumentáció**: Mermaid diagramok az architektúra és folyamatelemzés szemléltetésére

## 2025. augusztus 18.

### Dokumentáció Átfogó Frissítés - MCP 2025-06-18 Szabványok

#### MCP Biztonsági Legjobb Gyakorlatok (02-Security/) - Teljes Modernizáció
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Teljes újraírás az MCP Specifikáció 2025-06-18-hoz igazítva
  - **Kötelező Előírások**: Explicit KELL/KELL NEM előírások az hivatalos specifikációból egyértelmű vizuális jelzésekkel
  - **12 Alapvető Biztonsági Gyakorlat**: Újratervezés 15 elemes listából átfogó biztonsági területekké
    - Token Biztonság és Hitelesítés külső azonosító szolgáltató integrációval
    - Munkamenet Menedzsment és Transzport Biztonság kriptográfiai követelményekkel
    - AI-specifikus fenyegetések elleni védelem Microsoft Prompt Shields integrációval
    - Hozzáférés Szabályozás és Jogosultságok a legkisebb jogosultság elve alapján
    - Tartalmi Biztonság és Monitorozás Azure Content Safety belefoglalásával
    - Ellátási Lánc Biztonság átfogó komponens ellenőrzéssel
    - OAuth Biztonság és Confused Deputy megelőzés PKCE implementációval
    - Incidens Válasz és Helyreállítás automatizált képességekkel
    - Megfelelőség és Kormányzás szabályozási megfeleléssel
    - Fejlett Biztonsági Ellenőrzések nulladik bizalom architektúrával
    - Microsoft Biztonsági Ökoszisztéma integráció átfogó megoldásokkal
    - Folyamatos Biztonsági Fejlesztés alkalmazkodó gyakorlatokkal
  - **Microsoft Biztonsági Megoldások**: Bővített integrációs útmutató Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security esetén
  - **Megvalósítási Erőforrások**: Átfogó linkgyűjtemény kategorizálva Hivatalos MCP Dokumentáció, Microsoft Biztonsági Megoldások, Biztonsági Szabványok és Megvalósítási Útmutatók szerint

#### Fejlett Biztonsági Ellenőrzések (02-Security/) - Vállalati Megvalósítás
- **MCP-SECURITY-CONTROLS-2025.md**: Teljes átdolgozás vállalati szintű biztonsági keretrendszerrel
  - **9 Átfogó Biztonsági Terület**: Kibővítve az alapvető kontrolloktól részletes vállalati keretrendszerig
    - Fejlett Hitelesítés és Engedélyezés Microsoft Entra ID integrációval
    - Token Biztonság és Anti-Passthrough ellenőrzések átfogó validációval
    - Munkamenet Biztonsági Ellenőrzések eltulajdonítás elleni védelemmel
    - AI-Specifikus Biztonsági Ellenőrzések prompt injection és eszköz mérgezés elleni védelemmel
    - Confused Deputy Támadás Megelőzés OAuth proxival
    - Eszköz Végrehajtási Biztonság sandboxing és izolációval
    - Ellátási Lánc Biztonsági Ellenőrzések függőségellenőrzéssel
    - Monitorozás és Detektálás SIEM integrációval
    - Incidens Válasz és Helyreállítás automatizált képességekkel
  - **Megvalósítási Példák**: Részletes YAML konfigurációk és kód példák hozzáadva
  - **Microsoft Megoldások Integrációja**: Átfogó lefedettség Azure biztonsági szolgáltatásokkal, GitHub Advanced Securityvel és vállalati identitáskezeléssel

#### Haladó Témák Biztonság (05-AdvancedTopics/mcp-security/) - Produkcióképes Megvalósítás
- **README.md**: Teljes újraírás vállalati biztonsági megvalósításhoz
  - **Jelenlegi Specifikáció Igazodás**: Frissítve az MCP Specifikáció 2025-06-18 kötelező biztonsági előírásaira
  - **Fejlesztett Hitelesítés**: Microsoft Entra ID integráció átfogó .NET és Java Spring Security példákkal
  - **AI Biztonsági Integráció**: Microsoft Prompt Shields és Azure Content Safety megvalósítás részletes Python példákkal
  - **Fejlett Fenyegetés Mérséklés**: Átfogó megvalósítási példák
    - Confused Deputy támadás megelőzés PKCE-vel és felhasználói hozzájárulás ellenőrzéssel
    - Token Passthrough megelőzés célközönség-validációval és biztonságos token-kezeléssel
    - Munkamenet Eltulajdonítás megelőzés kriptográfiai kötésekkel és viselkedéselemzéssel
  - **Vállalati Biztonsági Integráció**: Azure Application Insights monitorozás, fenyegetés detektáló folyamatok és ellátási lánc biztonság
  - **Megvalósítási Ellenőrző Lista**: Egyértelmű kötelező vs. ajánlott biztonsági kontrollok és Microsoft biztonsági ökoszisztéma előnyei

### Dokumentáció Minőség és Szabvány Igazodás
- **Specifikáció Hivatkozások**: Minden hivatkozás frissítve a legújabb MCP Specifikáció 2025-06-18-ra
- **Microsoft Biztonsági Ökoszisztéma**: Integrációs útmutató erősítése az összes biztonsági dokumentációban
- **Gyakorlati Megvalósítás**: Részletes kódpéldák hozzáadva .NET, Java és Python nyelveken vállalati mintákkal
- **Erőforrás Szervezés**: Átfogó kategorizálás hivatalos dokumentáció, biztonsági szabványok és megvalósítási útmutatók szerint
- **Vizuális Jelzők**: Egyértelmű jelölések kötelező követelmények és ajánlott gyakorlatok között

#### Alapfogalmak (01-CoreConcepts/) - Teljes Modernizáció
- **Protokoll Verzió Frissítés**: Frissítés a legújabb MCP Specifikáció 2025-06-18 hivatkozásával, dátum alapú verziózási formátum (ÉÉÉÉ-HH-NN)
- **Architektúra Finomítás**: Hostok, kliensek és szerverek leírásának fejlesztése a jelenlegi MCP architektúra minták szerint
  - A hosztokat most már egyértelműen AI alkalmazásokként definiálják, amelyek több MCP klienskapcsolatot koordinálnak
  - A klienseket protokollkapcsolóként írják le, amelyek egy az egyhez szerverkapcsolatokat tartanak fenn
  - A szerverek helyi és távoli telepítési szcenáriókkal bővültek
- **Alap primitívek átszervezése**: Teljes átalakítás a szerver és kliens primitíveknél
  - Szerver primitívek: Erőforrások (adatforrások), Promptok (sablonok), Eszközök (futtatható függvények) részletes magyarázatokkal és példákkal
  - Kliens primitívek: Mintavételezés (LLM kiegészítések), Feltárás (felhasználói bevitel), Naplózás (hibakeresés/monitorozás)
  - Aktualizálva a jelenlegi felfedezési (`*/list`), lekérési (`*/get`) és végrehajtási (`*/call`) metódusmintákkal
- **Protokoll architektúra**: Bevezetésre került egy kétszintű architektúra modell
  - Adatréteg: JSON-RPC 2.0 alapok élettartam-kezeléssel és primitívekkel
  - Szállítási réteg: STDIO (helyi) és Streamable HTTP SSE-vel (távoli) szállítási mechanizmusok
- **Biztonsági keretrendszer**: Átfogó biztonsági alapelvek tartalmazzák a kifejezett felhasználói hozzájárulást, adatvédelmet, eszközvégrehajtás biztonságát és a szállítási réteg biztonságát
- **Kommunikációs minták**: Frissített protokoll üzenetek bemutatják az inicializálást, felfedezést, végrehajtást és értesítési folyamatokat
- **Kódpéldák**: Frissített több nyelvű példák (.NET, Java, Python, JavaScript), hogy tükrözzék a jelenlegi MCP SDK mintákat

#### Biztonság (02-Security/) - Átfogó biztonsági átalakítás  
- **Szabványoknak való megfelelés**: Teljes összhang az MCP Specification 2025-06-18 biztonsági követelményeivel
- **Hitelesítés fejlődése**: Dokumentálva az egyedi OAuth szerverektől a külső identitásszolgáltató delegációig (Microsoft Entra ID)
- **AI-specifikus fenyegetés elemzés**: Kiterjesztett lefedettség a modern AI támadási vektorokkal
  - Részletes prompt injekciós támadási szcenáriók valós példákkal
  - Eszközmérgezési mechanizmusok és "rug pull" támadási minták
  - Kontextus ablak mérgezés és modellzavaró támadások
- **Microsoft AI biztonsági megoldások**: Átfogó lefedettség a Microsoft biztonsági ökoszisztémából
  - AI Prompt Shields haladó detektálási, kiemelési és elválasztó technikákkal
  - Azure Content Safety integrációs minták
  - GitHub Advanced Security az ellátási lánc védelemre
- **Haladó fenyegetés-mitigáció**: Részletes biztonsági kontrollok a
  - Munkamenet eltérítésére MCP-specifikus támadási szcenáriókkal és kriptográfiai munkamenet ID követelményekkel
  - Összezavart közvetítő problémákra MCP proxy szcenáriókban kifejezett hozzájárulási követelményekkel
  - Token átengedési sebezhetőségek kötelező érvényesítési kontrollokkal
- **Ellátási lánc biztonság**: Kiterjesztett AI ellátási lánc lefedettség alapmodellekkel, beágyazási szolgáltatásokkal, kontextus szolgáltatókkal és harmadik féltől származó API-kkal
- **Alapbiztonság**: Fejlett integráció vállalati biztonsági mintákkal, beleértve a zero trust architektúrát és a Microsoft biztonsági ökoszisztémát
- **Erőforrás szervezés**: Átfogó erőforrás linkek kategorizálva típus szerint (Hivatalos Dokumentációk, Szabványok, Kutatás, Microsoft megoldások, Implementációs útmutatók)

### Dokumentáció minőségjavítások
- **Strukturált tanulási célok**: Javított tanulási célok specifikus, végrehajtható eredményekkel
- **Kereszthivatkozások**: Linkek hozzáadva a kapcsolódó biztonsági és alapfogalmi témák között
- **Aktuális információk**: Minden dátumhivatkozás és specifikációs link frissítve a jelenlegi szabványokra
- **Implementációs iránymutatás**: Specifikus, végrehajtható útmutatók mindkét szakaszban hozzáadva

## 2025. július 16.

### README és navigáció fejlesztések
- Teljesen újratervezve a tananyag navigáció a README.md-ben
- `<details>` tagek helyett könnyebben hozzáférhető táblázatalapú formátumot alkalmazva
- Alternatív elrendezési lehetőségek létrehozása az új "alternative_layouts" mappában
- Kártyás, fülös és harmonika stílusú navigációs példák hozzáadva
- A tárház struktúra szakasz frissítve az összes legfrissebb fájlra
- Az "Hogyan használjuk ezt a tananyagot" szakasz egyértelmű ajánlásokkal kibővítve
- Az MCP specifikációs linkek frissítve a helyes URL-ekre
- Kontextus mérnökség szekció (5.14) hozzáadva a tananyag struktúrához

### Tanulmányi útmutató frissítések
- Teljesen átdolgozott tanulmányi útmutató, hogy megfeleljen a jelenlegi tárház struktúrának
- Új szakaszok hozzáadva MCP kliensekhez és eszközökhöz, valamint népszerű MCP szerverekhez
- A vizuális tananyag térkép pontosan tükrözi az összes témát
- Speciális témaköröket részletesebben leíró szakaszok kibővítve
- Esettanulmányok szakasz frissítve valós példákkal
- Hozzáadva ez az átfogó változásnapló

### Közösségi hozzájárulások (06-CommunityContributions/)
- Részletes információk hozzáadva az MCP képgeneráló szervereiről
- Átfogó szakasz Claude használatáról VSCode-ban
- Cline terminál kliens beállítási és használati útmutató hozzáadva
- MCP kliens szekció frissítve az összes népszerű kliens opcióval
- Hozzájárulási példák pontosabb kódmintákkal kibővítve

### Haladó témakörök (05-AdvancedTopics/)
- Minden speciális témamappa szervezett, következetes elnevezéssel
- Kontextus mérnökségi anyagok és példák hozzáadva
- Foundry ügynök integráció dokumentáció hozzáadva
- Entra ID biztonsági integráció dokumentáció kibővítve

## 2025. június 11.

### Kezdeti létrehozás
- Megjelent az MCP for Beginners tananyag első verziója
- Elkészítve a 10 fő szekció alapstruktúrája
- Megvalósítva a vizuális tananyag térkép a navigációhoz
- Hozzáadva első mintaprojektek több programozási nyelven

### Első lépések (03-GettingStarted/)
- Elkészítve az első szerver implementációs példák
- Hozzáadva kliens fejlesztési útmutató
- Tartalmazza LLM kliens integrációs utasításokat
- Hozzáadva VS Code integrációs dokumentáció
- Megvalósított Server-Sent Events (SSE) szerver példák

### Alapfogalmak (01-CoreConcepts/)
- Részletes magyarázat kliens-szerver architektúrára
- Dokumentáció a protokoll fő elemeiről
- Az MCP üzenetküldési mintáinak dokumentálása

## 2025. május 23.

### Tárház struktúra
- Beállítva az alap mappastruktúra
- README fájlok létrehozása minden fő szekcióhoz
- Fordítási infrastruktúra beállítása
- Képi anyagok és diagramok hozzáadása

### Dokumentáció
- Elsődleges README.md létrehozva a tananyag áttekintésével
- CODE_OF_CONDUCT.md és SECURITY.md hozzáadva
- SUPPORT.md létrehozása segítségkérés iránymutatásával
- Előzetes tanulmányi útmutató struktúra létrehozása

## 2025. április 15.

### Tervezés és keretrendszer
- MCP for Beginners tananyag első tervezése
- Tanulási célok és célközönség meghatározása
- A tananyag 10-szakaszos szerkezetének körvonalazása
- Koncepcionális keret kidolgozása példákhoz és esettanulmányokhoz
- Első prototípus példák létrehozása kulcsfontosságú fogalmakhoz

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ezt a dokumentumot az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk le. Bár igyekszünk a pontosságra, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hivatalos forrásnak. Fontos információk esetén professzionális emberi fordítást javaslunk. Nem vállalunk felelősséget az ebből eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->