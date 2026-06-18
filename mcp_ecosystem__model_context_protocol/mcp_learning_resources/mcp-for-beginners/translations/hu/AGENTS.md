# AGENTS.md

## Projekt áttekintése

**MCP kezdőknek** egy nyílt forráskódú oktatási tananyag a Model Context Protocol (MCP) - az AI modellek és kliensalkalmazások közötti interakciók szabványosított keretrendszere - elsajátításához. Ez a tárhely átfogó tananyagot kínál gyakorlati kódpéldákkal több programozási nyelven.

### Fő technológiák

- **Programozási nyelvek**: C#, Java, JavaScript, TypeScript, Python, Rust
- **Keretrendszerek és SDK-k**: 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Adatbázisok**: PostgreSQL pgvector kiterjesztéssel
- **Felhőplatformok**: Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Építőeszközök**: npm, Maven, pip, Cargo
- **Dokumentáció**: Markdown automatikus, többnyelvű fordítással (48+ nyelv)

### Architektúra

- **11 alapmodul (00-11)**: Szekvenciális tanulási út az alapoktól a haladó témákig
- **Gyakorlati laborok**: Gyakorlati feladatok teljes megoldáskóddal több nyelven
- **Példaprojektek**: Működő MCP szerver és kliens megvalósítások
- **Fordítási rendszer**: Automatikus GitHub Actions munkafolyamat többnyelvű támogatáshoz
- **Képforrások**: Központi képkönyvtár fordított változatokkal

## Beállítási parancsok

Ez egy dokumentációközpontú tárhely. A legtöbb beállítás az egyéni példaprojektekben és laborokban történik.

### Tárhely beállítása

```bash
# Klónozd a tárolót
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Munkavégzés példaprojektekkel

A példaprojektek helye:
- `03-GettingStarted/samples/` - Nyelvspecifikus példák
- `03-GettingStarted/01-first-server/solution/` - Első szerver megvalósítások
- `03-GettingStarted/02-client/solution/` - Kliens megvalósítások
- `11-MCPServerHandsOnLabs/` - Átfogó adatbázis integrációs laborok

Minden példaprojekt tartalmazza a saját beállítási utasításait:

#### TypeScript/JavaScript projektek
```bash
cd <project-directory>
npm install
npm start
```

#### Python projektek
```bash
cd <project-directory>
pip install -r requirements.txt
# vagy
pip install -e .
python main.py
```

#### Java projektek
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Fejlesztési munkafolyamat

### Dokumentációs struktúra

- **Modulok 00-11**: Alaptartalom szekvenciális sorrendben
- **translations/**: Nyelvspecifikus változatok (automatikusan generált, ne módosítsd közvetlenül)
- **translated_images/**: Lokalizált képek (automatikusan generált)
- **images/**: Forrásképek és diagramok

### Dokumentáció módosítása

1. Csak az angol nyelvű markdown fájlokat szerkeszd a gyökér modul könyvtárakban (00-11)
2. Szükség esetén frissítsd a képeket az `images/` könyvtárban
3. A co-op-translator GitHub Action automatikusan generálja a fordításokat
4. A fordítások újragenerálódnak a main ágba történő push esetén

### Fordítással való munka

- **Automatikus fordítás**: A GitHub Actions munkafolyamat minden fordítást kezel
- **Ne módosítsd kézzel** a `translations/` könyvtár fájljait
- A fordítási metaadatok minden lefordított fájlban beágyazottak
- Támogatott nyelvek: Több mint 48 nyelv, többek közt arab, kínai, francia, német, hindi, japán, koreai, portugál, orosz, spanyol és még sok más

## Tesztelési utasítások

### Dokumentáció ellenőrzése

Mivel ez elsősorban dokumentációs tárhely, a tesztelés a következőkre fókuszál:

1. **Link ellenőrzés**: Minden belső hivatkozás működjön
```bash
# Ellenőrizze a megszakadt markdown hivatkozásokat
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Kódminták ellenőrzése**: A kódpéldák fordíthatók/futtathatók legyenek
```bash
# Navigáljon egy adott mintához, és futtassa annak tesztjeit
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown linting**: Formázás ellenőrzése
```bash
# Használja a markdownlint-et, ha szükséges
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Példaprojekt tesztelése

Minden nyelvspecifikus példa saját tesztelési megközelítéssel rendelkezik:

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Kódstílus irányelvek

### Dokumentációs stílus

- Használj világos, kezdők számára is érthető nyelvezetet
- Több nyelven is legyen kódminta, ahol szükséges
- Kövesd a markdown legjobb gyakorlatait:
  - ATX stílusú fejléc (`#` szintaxis)
  - Nyelvi azonosítós keretes kódblokkok
  - Képekhez leíró alternatív szöveg
  - Ésszerű sorhossz (nincs kemény korlát, de legyen értelmes)

### Kódminta stílus

#### TypeScript/JavaScript
- ES modulok használata (`import`/`export`)
- TypeScript szigorú mód konvencióinak követése
- Törekedj típus annotációkra
- Cél ES2022

#### Python
- PEP 8 stílus irányelvek követése
- Típus jelzések alkalmazása, ahol helyénvaló
- Dokumentációs stringek függvényekhez és osztályokhoz
- Modern Python funkciók használata (3.8+)

#### Java
- Spring Boot konvencióinak követése
- Java 21 funkciók használata
- Szokványos Maven projekt struktúra
- Javadoc kommentek alkalmazása

### Fájlok szervezése

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Felépítés és telepítés

### Dokumentáció telepítése

A tárhely GitHub Pages vagy hasonló szolgáltatást használ dokumentáció hosztolására (ha van ilyen). A main ágra történő változások kiváltják:

1. A fordítási munkafolyamatot (`.github/workflows/co-op-translator.yml`)
2. Az angol markdown fájlok automatikus fordítását
3. Kép lokalizációt szükség szerint

### Építési folyamat nem szükséges

Ez a tárhely elsősorban markdown dokumentációt tartalmaz. Az alap tananyagelemekhez nem szükséges fordítás vagy build lépés.

### Példaprojekt telepítése

Az egyéni példaprojektek tartalmazhatnak telepítési utasításokat:
- Lásd `03-GettingStarted/09-deployment/` az MCP szerver telepítéshez
- Azure Container Apps telepítési példák a `11-MCPServerHandsOnLabs/` könyvtárban

## Közreműködési irányelvek

### Pull Request folyamata

1. **Fork és klónozás**: Forkold a tárhelyet és klónozd helyileg
2. **Ág létrehozása**: Használj leíró ág neveket (pl. `fix/typo-module-3`, `add/python-example`)
3. **Változtatások végrehajtása**: Csak az angol markdown fájlokat szerkeszd (ne fordításokat)
4. **Helyi teszt**: Ellenőrizd, hogy a markdown helyesen jelenik meg
5. **PR benyújtás**: Használj világos PR címet és leírást
6. **CLA**: Írd alá a Microsoft Contributor License Agreement-et, amikor kéri

### PR cím formátuma

Használj világos, leíró címeket:
- `[Module XX] Rövid leírás` modul-specifikus változásokhoz
- `[Samples] Leírás` kódminta változásokhoz
- `[Docs] Leírás` általános dokumentáció frissítésekhez

### Mit érdemes hozzájárulni

- Hibajavítások dokumentációban vagy kódmintákban
- Új kódpéldák további nyelveken
- Tisztázások és fejlesztések a meglévő tartalmakban
- Új esettanulmányok vagy gyakorlati példák
- Hibajelentések homályos vagy hibás tartalomról

### Mit NE csinálj

- Ne szerkeszd közvetlenül a `translations/` könyvtár fájljait
- Ne szerkeszd a `translated_images/` könyvtárat
- Ne adj hozzá nagy bináris fájlokat megbeszélés nélkül
- Ne változtass a fordítási munkafolyamat fájljain koordináció nélkül

## Kiegészítő megjegyzések

### Tárhely karbantartás

- **Változásnapló**: Minden jelentős változás dokumentálva a `changelog.md`-ben
- **Tanulmányi útmutató**: Használd a `study_guide.md`-t a tananyag áttekintéséhez
- **Issue sablonok**: Használd a GitHub issue sablonokat hibajelentéshez és funkciókérésekhez
- **Magatartási kódex**: A közreműködőknek be kell tartaniuk a Microsoft nyílt forráskódú magatartási kódexét

### Tanulási út

Kövesd a modulokat szekvenciálisan (00-11) a hatékony tanulás érdekében:
1. **00-02**: Alapok (Bevezetés, alapfogalmak, biztonság)
2. **03**: Első lépések gyakorlati megvalósítással
3. **04-05**: Gyakorlati megvalósítás és haladó témák
4. **06-10**: Közösség, bevált gyakorlatok, valós alkalmazások
5. **11**: Átfogó adatbázis integrációs laborok (13 egymásra épülő labor)

### Támogatási erőforrások

- **Dokumentáció**: https://modelcontextprotocol.io/
- **Specifikáció**: https://spec.modelcontextprotocol.io/
- **Közösség**: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discord szerver
- **Kapcsolódó tanfolyamok**: Lásd README.md más Microsoft tanulási útvonalakért

### Gyakori hibakeresési tippek

**K: A PR-em nem megy át a fordításellenőrzésen**  
V: Győződj meg róla, hogy csak az angol markdown fájlokat szerkesztetted a gyökér modul könyvtárakban, nem a lefordított változatokat.

**K: Hogyan adhatok hozzá új nyelvet?**  
V: A nyelvtámogatást a co-op-translator munkafolyamat kezeli. Nyiss issue-t a hozzáadás megbeszéléséhez.

**K: A kódminták nem működnek**  
V: Győződj meg róla, hogy követted az adott példa README-ben lévő beállítási utasításokat. Ellenőrizd a függőségek verzióit.

**K: Nem jelennek meg a képek**  
V: Ellenőrizd, hogy a képútvonalak relatívak és előre perjelesek. A képeknek az `images/` vagy a lokalizált `translated_images/` könyvtárban kell lenniük.

### Teljesítmény szempontok

- A fordítási folyamat több percig is eltarthat
- Nagyméretű képeket optimalizálj commit előtt
- A markdown fájlok legyenek fókuszáltak és ésszerű méretűek
- Használj relatív linkeket a jobb hordozhatóságért

### Projekt irányítás

Ez a projekt a Microsoft nyílt forráskódú gyakorlatát követi:  
- MIT licenc kódra és dokumentációra  
- Microsoft nyílt forráskódú magatartási kódex  
- CLA aláírása hozzájárulásokhoz  
- Biztonsági kérdések: kövesd a SECURITY.md irányelveit  
- Támogatás: lásd a SUPPORT.md-et segítségért

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->