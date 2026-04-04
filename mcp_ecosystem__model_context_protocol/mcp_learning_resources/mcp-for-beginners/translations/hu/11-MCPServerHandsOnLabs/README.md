# 🚀 MCP szerver PostgreSQL-lel – Teljes tanulási útmutató

## 🧠 Áttekintés az MCP adatbázis integráció tanulási útvonaláról

Ez az átfogó tanulási útmutató megtanítja, hogyan építsünk éles környezetben használható **Model Context Protocol (MCP) szervereket**, amelyek adatbázisokkal integrálódnak egy gyakorlati kiskereskedelmi elemzési megvalósításon keresztül. Megtanulod a vállalati szintű mintákat, beleértve a **sor szintű biztonságot (RLS)**, a **szemantikus keresést**, az **Azure AI integrációt**, és a **több bérlős adat-hozzáférést**.

Akár backend fejlesztő, AI mérnök vagy adatépítész vagy, ez az útmutató strukturált tanulást nyújt valós példákkal és gyakorlati feladatokkal, amelyek végigvezetnek a következő MCP szerver https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail használatán.

## 🔗 Hivatalos MCP Források

- 📘 [MCP Dokumentáció](https://modelcontextprotocol.io/) – Részletes oktatóanyagok és felhasználói útmutatók
- 📜 [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokoll architektúra és technikai hivatkozások
- 🧑‍💻 [MCP GitHub Tároló](https://github.com/modelcontextprotocol) – Nyílt forráskódú SDK-k, eszközök és kódminták
- 🌐 [MCP Közösség](https://github.com/orgs/modelcontextprotocol/discussions) – Csatlakozz a beszélgetésekhez és járulj hozzá a közösséghez
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Biztonsági legjobb gyakorlatok és kockázatkezelés


## 🧭 MCP Adatbázis Integráció Tanulási Útvonal

### 📚 Teljes Tanulási Struktúra a https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail számára

| Labor | Téma | Leírás | Link |
|--------|-------|-------------|------|
| **1-3. labor: Alapok** | | | |
| 00 | [Bevezetés az MCP adatbázis integrációba](./00-Introduction/README.md) | MCP áttekintés adatbázis integrációval és kiskereskedelmi elemzési esetpéldával | [Kezdés itt](./00-Introduction/README.md) |
| 01 | [Alapvető architektúra fogalmak](./01-Architecture/README.md) | MCP szerver architektúra, adatbázis rétegek és biztonsági minták megértése | [Tanulás](./01-Architecture/README.md) |
| 02 | [Biztonság és többbérlős működés](./02-Security/README.md) | Sor szintű biztonság, hitelesítés és több bérlős adat-hozzáférés | [Tanulás](./02-Security/README.md) |
| 03 | [Környezet beállítása](./03-Setup/README.md) | Fejlesztőkörnyezet, Docker, Azure erőforrások beállítása | [Beállítás](./03-Setup/README.md) |
| **4-6. labor: MCP szerver építése** | | | |
| 04 | [Adatbázis tervezés és séma](./04-Database/README.md) | PostgreSQL beállítás, kiskereskedelmi séma tervezés, mintaadat | [Építés](./04-Database/README.md) |
| 05 | [MCP szerver megvalósítása](./05-MCP-Server/README.md) | FastMCP szerver építése adatbázis integrációval | [Építés](./05-MCP-Server/README.md) |
| 06 | [Eszköz fejlesztés](./06-Tools/README.md) | Adatbázis lekérdező eszközök és séma introspekció készítése | [Építés](./06-Tools/README.md) |
| **7-9. labor: Fejlett funkciók** | | | |
| 07 | [Szemantikus keresés integráció](./07-Semantic-Search/README.md) | Vektor beágyazások megvalósítása Azure OpenAI-val és pgvectorral | [Fejlesztés](./07-Semantic-Search/README.md) |
| 08 | [Tesztelés és hibakeresés](./08-Testing/README.md) | Tesztelési stratégiák, hibakereső eszközök és validációs megközelítések | [Tesztelés](./08-Testing/README.md) |
| 09 | [VS Code integráció](./09-VS-Code/README.md) | VS Code MCP integráció beállítása és AI Chat használata | [Integráció](./09-VS-Code/README.md) |
| **10-12. labor: Éles környezet és legjobb gyakorlatok** | | | |
| 10 | [Telepítési stratégiák](./10-Deployment/README.md) | Docker telepítés, Azure Container Apps, skálázás | [Telepítés](./10-Deployment/README.md) |
| 11 | [Monitorozás és megfigyelhetőség](./11-Monitoring/README.md) | Application Insights, naplózás, teljesítmény monitorozás | [Figyelés](./11-Monitoring/README.md) |
| 12 | [Legjobb gyakorlatok és optimalizáció](./12-Best-Practices/README.md) | Teljesítmény optimalizálás, biztonsági erősítés és éles tippek | [Optimalizálás](./12-Best-Practices/README.md) |

### 💻 Amit építeni fogsz

A tanulási útvonal végére elkészítesz egy teljes **Zava Retail Analytics MCP Szervert**, amely tartalmazza:

- **Többtáblás kiskereskedelmi adatbázist** ügyfélmegrendelésekkel, termékekkel és készlettel
- **Sor szintű biztonságot** üzletalapú adat izolációhoz
- **Szemantikus termékkutatást** Azure OpenAI beágyazásokkal
- **VS Code AI Chat integrációt** természetesnyelvű lekérdezésekhez
- **Éles környezetre kész telepítést** Dockerrel és Azure-rel
- **Átfogó monitorozást** Application Insights segítségével

## 🎯 Előfeltételek a tanuláshoz

Ahhoz, hogy a legtöbbet hozd ki ebből a tanulási útból, rendelkezned kell:

- **Programozási tapasztalat**: Python (preferált) vagy hasonló nyelvek ismerete
- **Adatbázis ismeretek**: Alap SQL és relációs adatbázis alapok
- **API fogalmak**: REST API-k és HTTP megértése
- **Fejlesztői eszközök**: Parancssor használat, Git és kódszerkesztők ismerete
- **Felhő alapok**: (Opcionális) Azure vagy hasonló felhőplatformok alapjai
- **Docker ismeretek**: (Opcionális) Konténerizációs koncepciók megértése

### Szükséges eszközök

- **Docker Desktop** – PostgreSQL és MCP szerver futtatásához
- **Azure CLI** – Felhő erőforrások telepítéséhez
- **VS Code** – Fejlesztéshez és MCP integrációhoz
- **Git** – Verziókezeléshez
- **Python 3.8+** – MCP szerver fejlesztéshez

## 📚 Tanulási útmutató és források

Ez az útvonal átfogó forrásokat tartalmaz, amelyek segítenek hatékonyan haladni:

### Tanulási útmutató

Minden labor tartalmaz:
- **Világos tanulási célokat** – Mit érsz el
- **Lépésről lépésre útmutatókat** – Részletes megvalósítási útmutatók
- **Kód példákat** – Működő minták magyarázatokkal
- **Gyakorlatokat** – Kézzel fogható gyakorlási lehetőségek
- **Hibakeresési útmutatókat** – Gyakori problémák és megoldások
- **További forrásokat** – Mélyebb olvasmányok és felfedezés

### Előfeltételek ellenőrzése

Minden labor megkezdése előtt:
- **Szükséges tudás** – Amit előzetesen tudni kell
- **Beállítás ellenőrzése** – Miként ellenőrizheted a környezetet
- **Időbecslés** – Várható befejezési idő
- **Tanulási eredmények** – Amit a végére tudni fogsz

### Ajánlott tanulási utak

Válaszd útvonalad tapasztalatod alapján:

#### 🟢 **Kezdő útvonal** (Újonc az MCP-ben)
1. Győződj meg róla, hogy elvégezted az 0-10 lépéseket az [MCP for Beginners](https://aka.ms/mcp-for-beginners) tananyagból
2. Teljesítsd 00-03 laborokat, hogy megerősítsd az alapokat
3. Kövesd a 04-06 laborokat a gyakorlati építéshez
4. Próbáld ki a 07-09 laborokat a gyakorlati használathoz

#### 🟡 **Középhaladó útvonal** (Néhány MCP tapasztalat)
1. Nézd át a 00-01 laborokat adatbázis specifikus fogalmakért
2. Koncentrálj a 02-06 laborokra megvalósításhoz
3. Mélyedj el a 07-12 laborokban a fejlett funkciókért

#### 🔴 **Haladó útvonal** (MCP-ben jártas)
1. Gyorsan átfutod a 00-03 laborokat a kontextusért
2. Koncentrálj 04-09 laborokra adatbázis integrációért
3. Fókuszálj 10-12 laborokra az éles telepítéshez

## 🛠️ Hogyan használd hatékonyan ezt a tanulási utat

### Sorrendben haladás (ajánlott)

Haladj a laborokon sorrendben a teljes megértésért:

1. **Olvasd át az áttekintést** – Értsd meg, mit tanulsz
2. **Ellenőrizd az előfeltételeket** – Biztosítsd a szükséges tudást
3. **Kövesd a lépésenkénti útmutatókat** – Valósítsd meg ahogy tanulsz
4. **Teljesítsd a gyakorlatokat** – Erősítsd meg a megértést
5. **Nézd át a fő tanulságokat** – Szilárdítsd meg a tudást

### Célzott tanulás

Ha konkrét képességekre van szükséged:

- **Adatbázis integráció**: koncentrálj 04-06 laborokra
- **Biztonság megvalósítás**: fókuszálj 02, 08, 12 laborokra
- **AI/szemantikus keresés**: mélyedj el a 07 laborban
- **Éles telepítés**: tanulmányozd a 10-12 laborokat

### Gyakorlati tapasztalat

Minden labor tartalmaz:
- **Működő kód példákat** – Másold, módosítsd és kísérletezz
- **Valós szcenáriókat** – Gyakorlati kiskereskedelmi elemzési eseteket
- **Fokozatos nehézségi szintet** – Egyszerűtől a haladóig építve
- **Ellenőrzési lépéseket** – Bizonyosodj meg, hogy helyesen működik

## 🌟 Közösség és támogatás

### Kérj segítséget

- **Azure AI Discord**: [Csatlakozz szakértői támogatásért](https://discord.com/invite/ByRwuEEgH4)
- **GitHub forráskód és megvalósítási minta**: [Telepítési minta és források](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP Közösség**: [Csatlakozz a szélesebb MCP beszélgetésekhez](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Készen állsz a kezdésre?

Indítsd el az utadat a **[00. labor: Bevezetés az MCP adatbázis integrációba](./00-Introduction/README.md)**

---

*Tanuld meg professzionális MCP szerverek építését adatbázisintegrációval ezen az átfogó és gyakorlatorientált tanulási úton.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) használatával fordítottuk le. Bár az ügy pontosságára törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti, anyanyelvi dokumentumot kell tekinteni a hivatalos forrásnak. Kritikus információk esetén professzionális, emberi fordítást javaslunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->