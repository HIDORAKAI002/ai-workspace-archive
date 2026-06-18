# Bevezetés az MCP Adatbázis Integrációba

## 🎯 Mit tartalmaz ez a labor?

Ez a bevezető labor átfogó áttekintést nyújt a Model Context Protocol (MCP) szerverek adatbázis integrációval történő építéséről. Megérted az üzleti esetet, a technikai architektúrát és a valós alkalmazásokat a Zava Retail elemzőfeladatán keresztül a https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail oldalon.

## Áttekintés

**Model Context Protocol (MCP)** lehetővé teszi, hogy az AI asszisztensek biztonságosan hozzáférjenek és valós időben kommunikáljanak külső adatokkal. Az adatbázis integrációval kombinálva az MCP erőteljes képességeket nyit meg az adatvezérelt AI alkalmazások számára.

Ez a tanulási út megtanít arra, hogyan építsünk éles környezetbe kész MCP szervereket, amelyek csatlakoztatják az AI asszisztenseket kiskereskedelmi értékesítési adatokhoz PostgreSQL-en keresztül, miközben vállalati mintákat valósítanak meg, mint például a sor szintű biztonság, szemantikus keresés és több bérlős adathozzáférés.

## Tanulási célok

A labor végére képes leszel:

- **Meghatározni** a Model Context Protocol-t és annak fő előnyeit az adatbázis integrációban  
- **Azonosítani** az MCP szerver architektúra kulcsfontosságú összetevőit az adatbázisokkal  
- **Megérteni** a Zava Retail esettanulmányt és üzleti követelményeit  
- **Felidézni** vállalati mintákat a biztonságos, skálázható adatbázis-hozzáféréshez  
- **Felsorolni** az ebben a tanulási útban használt eszközöket és technológiákat

## 🧭 A kihívás: AI találkozik a valós üzleti adatokkal

### Hagyományos AI korlátok

A modern AI asszisztensek hihetetlenül erősek, de jelentős korlátokkal szembesülnek, amikor valós üzleti adatokkal dolgoznak:

| **Kihívás** | **Leírás** | **Üzleti Hatás** |
|-------------|------------|-----------------|
| **Statikus tudás** | AI modellek rögzített adatkészleteken tanulnak, így nem férnek hozzá aktuális üzleti adatokhoz | Elavult elemzések, kihagyott lehetőségek |
| **Adatszigetek** | Információk adatbázisokban, API-kban, rendszerekben zárva, ahová az AI nem fér hozzá | Hiányos elemzés, töredezett munkafolyamatok |
| **Biztonsági korlátok** | Közvetlen adatbázis hozzáférés biztonsági és megfelelőségi aggályokat vet fel | Korlátozott bevezetés, kézi adat-előkészítés |
| **Komplex lekérdezések** | Üzleti felhasználóknak technikai tudás kell az adatok kinyeréséhez | Csökkent elfogadás, nem hatékony folyamatok |

### Az MCP megoldás

A Model Context Protocol ezeket a kihívásokat így kezeli:

- **Valós idejű adathozzáférés**: AI asszisztensek élő adatbázisokat és API-kat kérdeznek le  
- **Biztonságos integráció**: Ellenőrzött hozzáférés hitelesítéssel és jogosultságokkal  
- **Természetes nyelvi felület**: Üzleti felhasználók egyszerű angol nyelven tesznek fel kérdéseket  
- **Sztenderd protokoll**: Különböző AI platformok és eszközök között működik  

## 🏪 Ismerkedj meg a Zava Retail-lel: tanulmányi esetünk https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

A tanulási út során felépítünk egy MCP szervert a **Zava Retail**-nek, egy fiktív barkácsáruház láncnak, amely több üzlettel rendelkezik. Ez a valósághű példa vállalati szintű MCP megvalósítást mutat be.

### Üzleti kontextus

**Zava Retail** működtet:  
- **8 fizikai üzletet** Washington államban (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 online áruházat** e-kereskedelmi értékesítésre  
- **Sokszínű termékkatalógust**, beleértve szerszámokat, barkácsárukat, kertészeti eszközöket és építőanyagokat  
- **Többszintű vezetést** üzletvezetők, régiós managerek és vezetők részvételével  

### Üzleti követelmények

Az üzletvezetőknek és vezetőknek AI-alapú elemzésekre van szükségük, hogy:  

1. **Értékeljék az értékesítési teljesítményt** üzletenként és időszakokra lebontva  
2. **Kövesse a készletszinteket** és azonosítsa az újratöltési igényeket  
3. **Értsék meg a vásárlói viselkedést** és a vásárlási mintákat  
4. **Fedezzék fel a termékinformációkat** szemantikus keresés által  
5. **Készítsenek jelentéseket** természetes nyelvű lekérdezésekkel  
6. **Őrizzék az adatbiztonságot** szerepalapú hozzáférés-vezérléssel  

### Technikai követelmények

Az MCP szervernek biztosítania kell:  

- **Több bérlős adathozzáférést**, ahol az üzletvezetők csak saját üzletük adatait látják  
- **Rugalmas lekérdezést**, amely támogatja a komplex SQL műveleteket  
- **Szemantikus keresést** termékfelfedezéshez és ajánlásokhoz  
- **Valós idejű adatokat**, amelyek tükrözik a jelenlegi üzleti állapotot  
- **Biztonságos hitelesítést** sor szintű biztonsággal (RLS)  
- **Skálázható architektúrát** több egyidejű felhasználó támogatásához  

## 🏗️ Az MCP szerver architektúrájának áttekintése

Az MCP szerverünk egy rétegezett architektúrát valósít meg, amely az adatbázis integrációra optimalizált:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Kulcsösszetevők

#### **1. MCP szerver réteg**  
- **FastMCP Keret**: Modern Python alapú MCP szerver implementáció  
- **Eszköz regisztráció**: Deklaratív eszközdefiníciók típusbiztonsággal  
- **Kérés kontextus**: Felhasználói azonosítás és munkamenet kezelés  
- **Hibakezelés**: Robusztus hibakezelés és naplózás  

#### **2. Adatbázis integrációs réteg**  
- **Kapcsolat poolozás**: Hatékony asyncpg kapcsolatkezelés  
- **Séma szolgáltató**: Dinamikus tábla séma felismerés  
- **Lekérdezés végrehajtó**: Biztonságos SQL végrehajtás RLS kontextusban  
- **Tranzakció kezelő**: ACID megfelelőség és visszagörgetés kezelése  

#### **3. Biztonsági réteg**  
- **Sor szintű biztonság (RLS)**: PostgreSQL RLS több bérlő izolációra  
- **Felhasználói azonosítás**: Üzletvezető hitelesítés és jogosultságkezelés  
- **Hozzáférésvezérlés**: Részletes jogosultságok és audit naplók  
- **Bemeneti érvényesítés**: SQL injection megelőzés és lekérdezés validáció  

#### **4. AI fejlesztő réteg**  
- **Szemantikus keresés**: Vektoros beágyazások termék felfedezéshez  
- **Azure OpenAI integráció**: Szöveg beágyazások generálása  
- **Hasonlósági algoritmusok**: pgvector koszinusz hasonlóság keresés  
- **Keresés optimalizálás**: Indexelés és teljesítmény hangolás  

## 🔧 Technológiai környezet

### Alapvető technológiák

| **Összetevő** | **Technológia** | **Cél** |
|---------------|-----------------|---------|
| **MCP keret** | FastMCP (Python) | Modern MCP szerver implementáció |
| **Adatbázis** | PostgreSQL 17 + pgvector | Relációs adat vektoros kereséssel |
| **AI szolgáltatások** | Azure OpenAI | Szöveg beágyazások és nyelvi modellek |
| **Konténerizáció** | Docker + Docker Compose | Fejlesztői környezet |
| **Felhő platform** | Microsoft Azure | Éles üzembe helyezés |
| **IDE integráció** | VS Code | AI Chat és fejlesztési munkafolyamat |

### Fejlesztési eszközök

| **Eszköz** | **Cél** |
|------------|----------|
| **asyncpg** | Nagy teljesítményű PostgreSQL driver |
| **Pydantic** | Adatvalidáció és szerializáció |
| **Azure SDK** | Felhő szolgáltatások integrálása |
| **pytest** | Tesztelési keretrendszer |
| **Docker** | Konténerizáció és telepítés |

### Éles környezeti stack

| **Szolgáltatás** | **Azure erőforrás** | **Cél** |
|------------------|---------------------|---------|
| **Adatbázis** | Azure Database for PostgreSQL | Kezelt adatbázis szolgáltatás |
| **Konténer** | Azure Container Apps | Serverless konténer hoszting |
| **AI szolgáltatások** | Microsoft Foundry | OpenAI modellek és végpontok |
| **Monitorozás** | Application Insights | Megfigyelhetőség és diagnosztika |
| **Biztonság** | Azure Key Vault | Titkok és konfigurációkezelés |

## 🎬 Valós használati esetek

Nézzük, hogyan lépnek interakcióba különböző felhasználók az MCP szerverünkkel:

### Forgatókönyv 1: Üzletvezetői Teljesítményértékelés

**Felhasználó**: Sarah, Seattle üzletvezető  
**Cél**: Az előző negyedév értékesítési teljesítményének elemzése

**Természetes nyelvű lekérdezés**:  
> "Mutasd meg az első 10 terméket árbevétel szerint a saját üzletemben 2024 negyedik negyedévében"

**Mi történik**:  
1. A VS Code AI Chat elküldi a lekérdezést az MCP szervernek  
2. Az MCP szerver azonosítja Sarah üzletének kontextusát (Seattle)  
3. Az RLS szabályok kiszűrik az adatokat csak a Seattle üzletre  
4. Az SQL lekérdezés létrejön és végrehajtódik  
5. Az eredmény formázva visszaküldésre kerül az AI Chat-nek  
6. Az AI elemzést és tanulságokat ad vissza  

### Forgatókönyv 2: Termékfelfedezés szemantikus kereséssel

**Felhasználó**: Mike, Készletkezelő  
**Cél**: Olyan termékek megtalálása, amelyek hasonlóak egy vásárlói kéréshez

**Természetes nyelvű lekérdezés**:  
> "Milyen termékeket árusítunk, amelyek hasonlóak a 'vízhatlan kültéri elektromos csatlakozók' kifejezéshez?"

**Mi történik**:  
1. A lekérdezést a szemantikus keresési eszköz dolgozza fel  
2. Az Azure OpenAI egy beágyazás-vektort generál  
3. A pgvector elvégzi a hasonlóság keresést  
4. A kapcsolódó termékek relevancia szerint rangsorolódnak  
5. Az eredmények tartalmazzák a termék részleteit és elérhetőségét  
6. Az AI alternatívákat és ajánlott csomagokat javasol  

### Forgatókönyv 3: Több üzletes elemzés

**Felhasználó**: Jennifer, Régiós menedzser  
**Cél**: Teljesítmények összevetése az összes üzletre vonatkozóan

**Természetes nyelvű lekérdezés**:  
> "Használati kategória szerint hasonlítsd össze az értékesítést az elmúlt 6 hónapban minden üzlet között"

**Mi történik**:  
1. RLS kontextus beállítása a régiós menedzser hozzáféréséhez  
2. Komplex több üzletes lekérdezés előállítása  
3. Adatok aggregálása az üzlethelyiségek között  
4. Eredmények tartalmazzák a trendeket és összehasonlításokat  
5. Az AI azonosítja az összefüggéseket és ajánlásokat  

## 🔒 Biztonság és Több bérlős mélyebb betekintés

Implementációnk kiemelten kezeli a vállalati szintű biztonságot:

### Sor szintű biztonság (RLS)

A PostgreSQL RLS biztosítja az adatok szigetelését:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Felhasználói identitás kezelése

Minden MCP kapcsolat tartalmazza:  
- **Üzletvezető azonosító**: Egyedi azonosító az RLS kontextushoz  
- **Szerepkör hozzárendelés**: Jogosultságok és hozzáférési szintek  
- **Munkamenet kezelés**: Biztonságos hitelesítési tokenek  
- **Audit naplózás**: Teljes hozzáférési előzmények  

### Adatvédelem

Többrétegű biztonsági megoldások:  
- **Kapcsolat titkosítása**: TLS minden adatbázis kapcsolatnál  
- **SQL injekció elleni védelem**: Csak paraméterezett lekérdezések  
- **Bemenetvalidáció**: Teljes körű kérés-ellenőrzés  
- **Hibakezelés**: Nem jelenik meg érzékeny adat hibaüzenetekben  

## 🎯 Főbb tanulságok

A bevezetés elvégzése után érteni fogod:

✅ **MCP értékajánlat**: Hogyan hidalja át az AI asszisztenseket és a valós adatokat  
✅ **Üzleti kontextus**: A Zava Retail követelményeit és kihívásait  
✅ **Architektúra áttekintése**: Kulcselemek és kölcsönhatásaik  
✅ **Technológiai környezet**: Eszközök és keretrendszerek használata  
✅ **Biztonsági modell**: Több bérlős adathozzáférés és védelem  
✅ **Használati minták**: Valós lekérdezési szcenáriók és munkafolyamatok  

## 🚀 Mi következik?

Készen állsz a mélyebb ismeretekre? Folytasd:

**[Lab 01: Alapvető architektúra fogalmak](../01-Architecture/README.md)**

Ismerd meg az MCP szerver architektúra mintáit, az adatbázis tervezési elveit és a részletes technikai megvalósítást, amely hajtja kiskereskedelmi elemző megoldásunkat.

## 📚 További források

### MCP dokumentáció  
- [MCP specifikáció](https://modelcontextprotocol.io/docs/) - Hivatalos protokoll dokumentáció  
- [MCP kezdőknek](https://aka.ms/mcp-for-beginners) - Átfogó MCP tanulási útmutató  
- [FastMCP dokumentáció](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentáció  

### Adatbázis integráció  
- [PostgreSQL dokumentáció](https://www.postgresql.org/docs/) - Teljes PostgreSQL referencia  
- [pgvector útmutató](https://github.com/pgvector/pgvector) - Vektor kiterjesztés dokumentáció  
- [Sor szintű biztonság](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS útmutató  

### Azure szolgáltatások  
- [Azure OpenAI dokumentáció](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI szolgáltatás integráció  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Kezelt adatbázis szolgáltatás  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless konténerek  

---

**Nyilatkozat**: Ez egy tanulási gyakorlat fiktív kiskereskedelmi adatokkal. Mindig kövesd a szervezeted adatkezelési és biztonsági irányelveit hasonló megoldások éles környezetbe történő bevezetésekor.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->