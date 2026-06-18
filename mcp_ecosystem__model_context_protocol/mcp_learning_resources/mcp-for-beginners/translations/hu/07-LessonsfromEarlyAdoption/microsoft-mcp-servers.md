# 🚀 10 Microsoft MCP szerver, amelyek forradalmasítják a fejlesztők termelékenységét

## 🎯 Amit ebben az útmutatóban megtanulsz

Ez a gyakorlati útmutató tíz Microsoft MCP szervert mutat be, amelyek aktívan átalakítják a fejlesztők mesterséges intelligencia asszisztenseivel való munkáját. Nem csak azt magyarázzuk el, mit tudnak az MCP szerverek, hanem megmutatjuk azokat a szervereket, amelyek már valódi különbséget tesznek a Microsoftnál és azon túl a napi fejlesztési munkafolyamatokban.

Minden szervert a valós használat és fejlesztői visszajelzések alapján választottunk ki. Megtudhatod, mit csinál az adott szerver, miért fontos, és hogyan hozhatsz ki belőle a legtöbbet saját projektjeidben. Akár teljesen új vagy az MCP területén, akár meglévő beállításaidat szeretnéd bővíteni, ezek a szerverek a Microsoft ökoszisztéma leggyakorlatiabb és legsokoldalúbb eszközeit képviselik.

> **💡 Gyors kezdési tipp**
> 
> Új vagy az MCP-ben? Ne aggódj! Ez az útmutató kezdőknek készült. A fogalmakat menet közben magyarázzuk, és mindig visszautalhatsz az [MCP bevezetésére](../00-Introduction/README.md) és az [Alapfogalmak](../01-CoreConcepts/README.md) modulokra, ha mélyebb háttérre van szükséged.

## Áttekintés

Ez az átfogó útmutató tíz Microsoft MCP szervert vizsgál meg, amelyek forradalmasítják a fejlesztők és az AI asszisztensek, valamint külső eszközök közötti interakciót. Az Azure-erőforráskezeléstől a dokumentumfeldolgozásig ezek a szerverek bemutatják, hogyan teszi lehetővé a Model Context Protocol a zökkenőmentes, termelékeny fejlesztési munkafolyamatokat.

## Tanulási célok

Az útmutató végére képes leszel:
- Megérteni, hogyan növelik az MCP szerverek a fejlesztők termelékenységét
- Megismerni a Microsoft legfontosabb MCP szerver implementációit
- Felfedezni minden szerver gyakorlati felhasználási eseteit
- Tudni, hogyan állítsd be és konfiguráld ezeket a szervereket VS Code-ban és Visual Studio-ban
- Feltérképezni az MCP ökoszisztémát és jövőbeni irányait

## 🔧 MCP szerverek megértése: Kezdő útmutató

### Mik azok az MCP szerverek?

Ha kezdő vagy a Model Context Protocol (MCP) világában, talán azon töprengsz, hogy „Mi is pontosan egy MCP szerver, és miért érdekelne engem ez?” Kezdjük egy egyszerű hasonlattal.

Gondolj az MCP szerverekre, mint speciális asszisztensekre, amelyek segítik AI kódoló társaidat (például a GitHub Copilotot), hogy csatlakozzanak külső eszközökhöz és szolgáltatásokhoz. Ahogy telefonodon különböző appokat használsz különböző feladatokra — például időjárás, navigáció, bank — az MCP szerverek lehetővé teszik AI asszisztensed számára, hogy különböző fejlesztői eszközökkel és szolgáltatásokkal működjön együtt.

### Az MCP szerverek által megoldott probléma

Az MCP szerverek előtt, ha meg akartad tenni például:
- Megnézni Azure erőforrásaid állapotát
- Létrehozni egy GitHub issue-t
- Lekérdezni az adatbázisodat
- Keresni a dokumentációban

Meg kellett szakítanod a kódolást, megnyitni egy böngészőt, az adott weboldalra navigálni és manuálisan elvégezni ezeket a műveleteket. Ez a folyamatos kontextusváltás megtöri a munkafolyamatod és csökkenti a termelékenységet.

### Hogyan változtatják meg az MCP szerverek a fejlesztési élményt

Az MCP szerverek segítségével a fejlesztői környezetedben (VS Code, Visual Studio, stb.) maradhatsz, és egyszerűen megkérheted az AI asszisztenst, hogy végezze el ezeket a feladatokat. Például:

**A hagyományos munkamenet helyett:**
1. Megáll a kódolás
2. Megnyílik a böngésző
3. Navigálás az Azure portálra
4. Az adattároló fiók adatainak lekérés
5. Visszatérés a VS Code-ba
6. Kódolás folytatása

**Most már ezt teheted:**
1. Megkérdezed az AI-t: „Mi a státusza az Azure tárolófiókjaimnak?”
2. A kapott információkkal folytatod a kódolást

### Főbb előnyök kezdőknek

#### 1. 🔄 **Maradj a flow állapotban**
- Több alkalmazás közti váltás nélkül
- Maradj fókuszban a kódolásnál
- Csökkentsd a mentális terhelést az eszközök kezelésével

#### 2. 🤖 **Használj természetes nyelvet a bonyolult parancsok helyett**
- A SQL szintaxis helyett írd le, milyen adatok kellenek
- Az Azure CLI parancsok helyett fogalmazd meg célodat
- Hagyd, hogy az AI kezelje a technikai részleteket, te koncentrálj a logikára

#### 3. 🔗 **Kapcsold össze a különböző eszközöket**
- Készíts erőteljes munkafolyamatokat több szolgáltatás kombinálásával
- Példa: „Szerezz be minden új GitHub issue-t és hozz létre hozzájuk Azure DevOps munkafolyamat elemeket”
- Automatizálj bonyolult szkriptek nélkül

#### 4. 🌐 **Hozzáférj egy folyamatosan bővülő ökoszisztémához**
- Használj Microsoft, GitHub és más cégek által fejlesztett szervereket
- Kombinálj különböző gyártók eszközeit zökkenőmentesen
- Csatlakozz egy szabványosított, több AI asszisztensen átívelő ökoszisztémához

#### 5. 🛠️ **Tanulj a gyakorlatban**
- Kezdj előre elkészített szerverekkel a koncepciók megértéséhez
- Később építsd fel saját szervereidet a komfortérzet növelésével
- Használd a rendelkezésre álló SDK-kat és dokumentációkat

### Valós példa kezdőknek

Tegyük fel, hogy új vagy a webfejlesztésben, és az első projekteden dolgozol. Így segíthetnek az MCP szerverek:

**Hagyományos megközelítés:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**MCP szerverekkel:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Vállalati szabvány előnye

Az MCP iparági szabvánnyá válik, ami azt jelenti:
- **Konzisztencia**: Hasonló élmény különböző eszközökön és cégeknél
- **Interoperabilitás**: Más-más gyártó szerverei együttműködnek
- **Jövőbiztos tudás**: Készségek és beállítások átvihetők különböző AI asszisztensek között
- **Közösség**: Széles körű közös tudás- és erőforrásbázis

### Kezdés: Amit megtanulsz

Ebben az útmutatóban 10 Microsoft MCP szervert vizsgálunk meg, amelyek különösen hasznosak fejlesztők számára minden szinten. Minden szerver célja, hogy:
- Megoldja a gyakori fejlesztési kihívásokat
- Csökkentse az ismétlődő feladatokat
- Javítsa a kód minőségét
- Növelje a tanulási lehetőségeket

> **💡 Tanulási tipp**
> 
> Ha teljesen új vagy az MCP-ben, kezdd az [MCP bevezető](../00-Introduction/README.md) és az [Alapfogalmak](../01-CoreConcepts/README.md) modulokkal. Aztán térj vissza ide, hogy a Microsoft eszközökkel láthasd ezeket a fogalmakat a gyakorlatban.
>
> További háttérért az MCP fontosságáról olvasd el Maria Naggaga posztját: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Az MCP használatának megkezdése VS Code-ban és Visual Studio-ban 🚀

Az MCP szerverek beállítása egyszerű, ha Visual Studio Code-ot vagy Visual Studio 2022-t használsz GitHub Copilot támogatással.

### VS Code beállítása

Alapvető lépések VS Code-hoz:

1. **Kapcsold be az Ügynök módot**: VS Code-ban válts át az Ügynök módra a Copilot Chat ablakban
2. **Konfiguráld az MCP szervereket**: Add hozzá a szerver beállításokat a VS Code settings.json fájlhoz
3. **Indítsd el a szervereket**: Kattints az „Indítás” gombra minden használni kívánt szervernél
4. **Válaszd ki az eszközöket**: Döntsd el, mely MCP szervereket engedélyezed az aktuális munkamenetben

Részletes beállítási útmutatóért lásd a [VS Code MCP dokumentációját](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Profi tipp: Kezeld az MCP szervereket profi módon!**
> 
> A VS Code Bővítmények nézet mostantól tartalmaz egy [kényelmes új kezelőfelületet az MCP szerverek menedzseléséhez](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Gyors hozzáférést kapsz a telepített MCP szerverek indításához, leállításához és kezeléséhez, egyértelmű, egyszerű felületen. Próbáld ki!

### Visual Studio 2022 beállítása

Visual Studio 2022 (17.14-es verziótól):

1. **Kapcsold be az Ügynök módot**: Kattints a „Kérdez” legördülő menüre a GitHub Copilot Chat ablakban, és válaszd az „Ügynök” opciót
2. **Hozz létre konfigurációs fájlt**: Hozz létre egy `.mcp.json` fájlt a megoldás könyvtárában (ajánlott hely: `<MEGOLDÁSKÖNYVTÁR>\.mcp.json`)
3. **Konfiguráld a szervereket**: Add hozzá az MCP szerver konfigurációkat a szabványos MCP formátumban
4. **Eszköz jóváhagyás**: Amikor felkér, engedélyezd a használni kívánt eszközöket a megfelelő jogosultságokkal

A részletes Visual Studio beállítási útmutatóért lásd a [Visual Studio MCP dokumentációt](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Minden MCP szervernek megvannak a saját konfigurációs igényei (kapcsolati karakterláncok, hitelesítés stb.), de az alapbeállítási mintázat mindkét IDE-ben következetes.

## Tapasztalatok a Microsoft MCP szerverekkel 🛠️

### 1. 📚 Microsoft Learn Docs MCP szerver

[![Telepítés VS Code-ban](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Telepítés VS Code Insiders-ben](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mit csinál?** A Microsoft Learn Docs MCP szerver egy felhőben futó szolgáltatás, amely valós idejű hozzáférést biztosít az AI asszisztensek számára a hivatalos Microsoft dokumentációhoz a Model Context Protocolon keresztül. Csatlakozik a `https://learn.microsoft.com/api/mcp` végponthoz, és szemantikus keresést tesz lehetővé a Microsoft Learn, az Azure dokumentáció, a Microsoft 365 dokumentáció és más hivatalos Microsoft források között.

**Miért hasznos?** Bár elsőre csak "dokumentációnak" tűnhet, ez a szerver elengedhetetlen minden Microsoft technológiát használó fejlesztőnek. Az AI kódoló asszisztensekkel kapcsolatos legnagyobb panasz a .NET fejlesztőktől, hogy nem naprakészek a legújabb .NET és C# kiadásokkal. A Microsoft Learn Docs MCP szerver ezt oldja meg, valós idejű hozzáférést biztosítva a legfrissebb dokumentációkhoz, API hivatkozásokhoz és bevált gyakorlatokhoz. Akár az legújabb Azure SDK-kkal dolgozol, akár az új C# 13 funkciókat fedezed fel vagy a legmodernebb .NET Aspire mintákat alkalmazod, ez a szerver biztosítja, hogy az AI asszisztensed rendelkezzen az irányadó, naprakész információkkal.

**Valós használat**: „Mik az az CLI parancsok egy Azure container app létrehozásához a hivatalos Microsoft Learn dokumentáció szerint?” vagy „Hogyan konfiguráljam az Entity Framework-öt függőséginjektálással ASP.NET Core-ban?” Vagy akár „Nézd át ezt a kódot, hogy megfelel-e a Microsoft Learn dokumentáció teljesítményre vonatkozó ajánlásainak.” A szerver átfogó lefedettséget nyújt a Microsoft Learn, Azure dokumentáció és Microsoft 365 dokumentáció között, fejlett szemantikus kereséssel, hogy megtalálja a leginkább releváns információkat. Legfeljebb 10 magas minőségű tartalmi egységet ad vissza cikkcímekkel és linkekkel, mindig a legfrissebb Microsoft dokumentációhoz fér hozzá.

**Kiemelt példa**: A szerver elérhetővé teszi a `microsoft_docs_search` eszközt, amely szemantikus keresést végez a Microsoft hivatalos technikai dokumentációjában. Egyszerű beállítás után kérdezhetsz például: „Hogyan valósítsam meg a JWT hitelesítést ASP.NET Core-ban?” és részletes, hivatalos válaszokat kapsz forráslinkekkel. A keresés kiváló minőségű, mert érti a kontextust – ha „konténerek” szó egy Azure környezetben szerepel, Azure Container Instances dokumentációt ad vissza, míg ugyanaz a kifejezés .NET kontextusban releváns C# kollekciós információkat.

Ez különösen hasznos a gyorsan változó vagy frissen frissített könyvtárak és felhasználási esetek esetén. Például néhány friss kódolási projektben a legújabb .NET Aspire és Microsoft.Extensions.AI verziók funkcióit akartam használni. A Microsoft Learn Docs MCP szerver beillesztésével nemcsak API dokumentációhoz, hanem épp frissen megjelent útmutatókhoz és leírásokhoz is hozzáfértem.

> **💡 Profi tipp**
> 
> Még a tool-barát modelleket is ösztönözni kell az MCP eszközök használatára! Fontold meg egy rendszerüzenet vagy [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) hozzáadását, például: „Hozzáférésed van a `microsoft.docs.mcp`-hez – használd ezt az eszközt a Microsoft technológiákkal (C#, Azure, ASP.NET Core, Entity Framework) kapcsolatos kérdések kezeléséhez a legfrissebb hivatalos dokumentáció keresésére.”
>
> Egy nagyszerű példa a gyakorlatban a [C# .NET Janitor chat mód](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) az Awesome GitHub Copilot gyűjteményből. Ez a mód kifejezetten a Microsoft Learn Docs MCP szervert használja C# kód tisztítására és modernizálására a legújabb mintákkal és bevált gyakorlatokkal.

### 2. ☁️ Azure MCP szerver
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mit csinál**: Az Azure MCP Server egy átfogó csomag több mint 15 speciális Azure szolgáltatás-kapcsolattal, amely az egész Azure ökoszisztémát behozza az AI munkafolyamatodba. Ez nem csupán egy egyszerű szerver – egy erőteljes gyűjtemény, amely tartalmazza az erőforrás-kezelést, adatbázis-kapcsolatot (PostgreSQL, SQL Server), Azure Monitor naplóelemzést KQL-lel, Cosmos DB integrációt és sok egyebet.

**Miért hasznos**: Az Azure erőforrások kezelésén túl ez a szerver jelentősen javítja a kód minőségét Azure SDK-k használata közben. Az Azure MCP használatakor Agent módban nemcsak segít a kódírásban – segít *jobb* Azure kódot írni, amely követi a jelenlegi hitelesítési mintákat, hiba kezelési legjobb gyakorlatokat, és kihasználja a legújabb SDK funkciókat. Ahelyett, hogy csak általános, működő kódot kapnál, olyan kódot kapsz, amely követi az Azure ajánlott mintáit a gyártásbeli terhelésekhez.

**Fő modulok közé tartoznak**:
- **🗄️ Adatbázis-kapcsolók**: Természetes nyelvű közvetlen hozzáférés az Azure Database for PostgreSQL-hez és SQL Serverhez
- **📊 Azure Monitor**: KQL-alapú naplóelemzés és működési betekintések
- **🌐 Erőforrás-kezelés**: Teljes Azure erőforrás életciklus-kezelés
- **🔐 Hitelesítés**: DefaultAzureCredential és kezelhető identitás minták
- **📦 Tárolási szolgáltatások**: Blob Storage, Queue Storage és Table Storage műveletek
- **🚀 Konténer-szolgáltatások**: Azure Container Apps, Container Instances és AKS kezelése
- **És még sok más specializált kapcsoló**

**Valós használat**: "Listázd az Azure tárolófiókjaimat", "Lekérdezés a Log Analytics munkaterületemről az elmúlt órában történt hibákra", vagy "Segíts egy Azure alkalmazás építésében Node.js használatával, megfelelő hitelesítéssel"

**Teljes demó forgatókönyv**: Itt egy teljes körű végigvezetés, amely bemutatja, hogyan használható az Azure MCP a GitHub Copilot for Azure kiterjesztéssel a VS Code-ban. Ha mindkettő telepítve van, és azt írod:

> "Készíts egy Python szkriptet, ami feltölt egy fájlt Azure Blob Storage-ba a DefaultAzureCredential hitelesítést használva. A szkript kapcsolódjon az 'mycompanystorage' nevű Azure tárolófiókomhoz, töltsön fel egy 'documents' nevű konténerbe, készítsen egy tesztfájlt az aktuális időbélyeggel feltöltéshez, kezelje szakszerűen a hibákat és adjon informatív visszajelzést, kövesse az Azure legjobb hitelesítési és hibakezelési gyakorlatait, tartalmazzon kommentárokat a DefaultAzureCredential működéséről, valamint legyen jól szervezett, megfelelő függvényekkel és dokumentációval."

Az Azure MCP Server egy teljes, gyártásra kész Python szkriptet generál, amely:
- A legfrissebb Azure Blob Storage SDK-t használja megfelelő aszinkron mintákkal
- Megvalósítja a DefaultAzureCredential-t részletes visszaesési lánc magyarázattal
- Erős hibakezeléssel rendelkezik Azure-specifikus kivételtípusokkal
- Követi az Azure SDK legjobb gyakorlatokat az erőforrás-kezelés és kapcsolódás terén
- Részletes naplózást és informatív konzol kimenetet biztosít
- Jól strukturált, függvényekkel, dokumentációval és típus annotációkkal ellátott szkript

A lenyűgöző benne az, hogy Azure MCP nélkül csak általános blob storage kódot kapnál, amely működik, de nem követi a jelenlegi Azure mintákat. Az Azure MCP-vel olyan kódot kapsz, amely a legújabb hitelesítési módszereket használja, kezeli az Azure specifikus hibaszcenáriókat, és követi a Microsoft ajánlásait gyártásbeli alkalmazásokhoz.

**Kiemelt példa**: Nekem nehézséget okozott az `az` és `azd` CLI parancsok pontos megjegyzése rövid használathoz. Nálam mindig két lépéses folyamat: először megnézem a szintaxist, aztán futtatom a parancsot. Gyakran a portálon kattintgatok, mert nem akarom bevallani, hogy nem emlékszem a CLI szintaxisra. Csodálatos, hogy csak le tudom írni, mit akarok, és még jobb, hogy ezt az IDE-m elhagyása nélkül tehetem meg!

Nagyszerű használati esetek listája található az [Azure MCP tárházában](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server). Átfogó telepítési útmutatókért és fejlett konfigurációs lehetőségekért nézd meg a [hivatalos Azure MCP dokumentációt](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Mit csinál**: A hivatalos GitHub MCP Server zökkenőmentes integrációt biztosít a GitHub teljes ökoszisztémájával, mind hosztolt távoli hozzáférési, mind helyi Docker telepítési lehetőségeket kínálva. Ez nem csupán alapvető tárház műveletekről szól – egy átfogó eszközkészlet, amely tartalmazza a GitHub Actions kezelést, pull request munkafolyamatokat, hibakezelést, biztonsági szkennelést, értesítéseket és fejlett automatizálási funkciókat.

**Miért hasznos**: Ez a szerver átalakítja a GitHubbal való interakciódat azáltal, hogy a teljes platformélményt közvetlenül a fejlesztési környezetedbe hozza. Ahelyett, hogy folyamatosan váltogatnál a VS Code és a GitHub.com között projektmenedzsmenthez, kód-áttekintéshez és CI/CD monitorozáshoz, mindent természetes nyelvű parancsokkal kezelhetsz anélkül, hogy a kódodra való fókuszt elveszítenéd.

> **ℹ️ Megjegyzés: Különböző 'Agent' típusok**
> 
> Ne tévessze össze ezt a GitHub MCP Servert a GitHub Coding Agenttel (az AI ügynök, amit hibákhoz lehet rendelni automatizált kódolási feladatokhoz). A GitHub MCP Server a VS Code Agent módban működik, hogy GitHub API integrációt biztosítson, míg a GitHub Coding Agent egy külön funkció, amely pull requesteket hoz létre, amikor GitHub hibákhoz rendelik.

**Fő képességek**:
- **⚙️ GitHub Actions**: Teljes CI/CD pipeline kezelés, munkafolyamat figyelés és artefaktumkezelés
- **🔀 Pull Requestek**: PR létrehozás, átnézés, egyesítés és átfogó státuszkövetés
- **🐛 Hibák**: Teljes hiba életciklus-kezelés, kommentelés, címkézés és hozzárendelés
- **🔒 Biztonság**: Kód szkennelési riasztások, titokfelismerés és Dependabot integráció
- **🔔 Értesítések**: Okos értesítéskezelés és tárház előfizetés vezérlés
- **📁 Tárházkezelés**: Fájlműveletek, ágkezelés és tárházadminisztráció
- **👥 Együttműködés**: Felhasználó- és szervezeti keresés, csapatkezelés és hozzáférés-szabályozás

**Valós használat**: "Készíts pull requestet a feature ágamból", "Mutasd meg a héten minden sikertelen CI futást", "Listázd az összes nyitott biztonsági riasztást a tárházaimban" vagy "Keresd meg az összes hozzám rendelt hibát a szervezeteimben"

**Teljes demó forgatókönyv**: Itt egy erőteljes munkafolyamat, amely bemutatja a GitHub MCP Server képességeit:

> "Fel kell készülnöm a sprintek értékelésére. Mutasd meg az összes pull requestet, amit ezen a héten készítettem, ellenőrizd a CI/CD pipelinejaink státuszát, készíts összefoglalót a megoldandó biztonsági riasztásokról, és segíts összerakni a kiadási megjegyzéseket a 'feature' címkével ellátott egyesített PR-k alapján."

A GitHub MCP Server:
- Lekérdezi a legutóbbi pull requesteket részletes státuszinformációkkal
- Elemzi a munkafolyamatok futásait és kiemeli az esetleges hibákat vagy teljesítményproblémákat
- Összegyűjti a biztonsági szkennelési eredményeket és priorizálja a kritikus riasztásokat
- Átfogó kiadási megjegyzéseket generál az egyesített PR-ek adatainak kinyerésével
- Megadja a gyakorlati következő lépéseket a sprinttervezéshez és kiadás-előkészítéshez

**Kiemelt példa**: Nagyon szeretem ezt kód-ellenőrzési folyamatoknál használni. Ahelyett, hogy ugrálnék a VS Code, GitHub értesítések és PR oldalak között, csak annyit mondok: "Mutasd meg azokat a PR-ket, amik az értékelésemre várnak", majd "Adj egy hozzászólást a #123-as PR-hez arról, hogyan kezeljük a hibákat a hitelesítési módszerben." A szerver kezeli a GitHub API hívásokat, megőrzi a beszélgetés kontextusát, és még segít építő kritikákat megfogalmazni.

**Hitelesítési lehetőségek**: A szerver támogatja az OAuth-ot (zökkenőmentesen a VS Code-ban) és a személyes hozzáférési tokeneket, konfigurálható eszközkészletekkel, amelyekkel csak a szükséges GitHub funkcionalitás engedélyezhető. Futtatható távoli hosztolt szolgáltatásként az azonnali beállításhoz vagy helyileg Dockeren teljes kontrollal.

> **💡 Profi tipp**
> 
> Engedélyezd csak azokat az eszközkészleteket, amikre szükséged van az MCP szerver beállításaiban a `--toolsets` paraméterrel, hogy csökkentsd a kontextus méretét és javítsd az AI eszközök kiválasztását. Például add hozzá: `"--toolsets", "repos,issues,pull_requests,actions"` a fő fejlesztési munkafolyamatokhoz, vagy használd: `"--toolsets", "notifications, security"`, ha főként GitHub monitorozási lehetőségekre van szükséged.

### 4. 🔄 Azure DevOps MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Mit csinál**: Csatlakozik az Azure DevOps szolgáltatásokhoz átfogó projektmenedzsmenthez, munkatétel nyomon követéshez, build pipeline kezeléshez és tárház műveletekhez.

**Miért hasznos**: Az Azure DevOps csapatok számára, akik ezt használják elsődleges DevOps platformként, ez az MCP szerver megszünteti a folyamatos lapváltogatást a fejlesztési környezeted és az Azure DevOps webfelület között. Munkafolyamatokat kezelhetsz, build státuszokat ellenőrizhetsz, tárházakat lekérdezhetsz, és projektmenedzsment feladatokat végezhetsz közvetlenül AI asszisztenseden keresztül.

**Valós használat**: "Mutasd meg az összes aktív munkatételt a jelenlegi sprintben a WebApp projekthez", "Hozz létre hibajegyet a most talált bejelentkezési hibára", vagy "Ellenőrizd a build pipeline-ok státuszát, és mutass minden legutóbbi sikertelenséget"

**Kiemelt példa**: Könnyen ellenőrizheted a csapat jelenlegi sprintjének státuszát egyszerű lekérdezésekkel, például: "Mutasd az összes aktív munkát a jelenlegi sprintben a WebApp projekthez" vagy "Hozz létre hibajegyet a most talált bejelentkezési hibára" anélkül, hogy elhagynád a fejlesztési környezeted.

### 5. 📝 MarkItDown MCP Server
[![Telepítés a VS Code-ban](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Telepítés a VS Code Insiders-ben](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Mit csinál**: A MarkItDown egy átfogó dokumentumkonverziós szerver, amely különféle fájlformátumokat alakít át magas minőségű Markdown formátummá, optimalizálva LLM (nagy nyelvi modellek) feldolgozáshoz és szövegelemzési munkafolyamatokhoz.

**Miért hasznos**: Lényeges a modern dokumentációs munkafolyamatokhoz! A MarkItDown lenyűgöző fájlformátumokat támogat, miközben megőrzi a kritikus dokumentumszerkezeteket, mint a címsorok, listák, táblázatok és linkek. Az egyszerű szövegkinyerő eszközökkel ellentétben a szemantikai jelentés és a formázás megőrzésére koncentrál, mely értékes mind az AI feldolgozás, mind az emberi olvashatóság szempontjából.

**Támogatott fájlformátumok**:
- **Office dokumentumok**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Média fájlok**: Képek (EXIF metaadatokkal és OCR-rel), Hang (EXIF metaadatokkal és beszédfelismeréssel)
- **Web tartalmak**: HTML, RSS hírcsatornák, YouTube URL-ek, Wikipédia oldalak
- **Adat formátumok**: CSV, JSON, XML, ZIP fájlok (rekurzív tartalom feldolgozás)
- **Kiadói formátumok**: EPub, Jupyter jegyzetfüzetek (.ipynb)
- **E-mail**: Outlook üzenetek (.msg)
- **Haladó**: Azure Document Intelligence integráció a fejlettebb PDF feldolgozáshoz

**Haladó képességek**: A MarkItDown támogatja az LLM által vezérelt kép-leírásokat (OpenAI kliens megléte esetén), az Azure Document Intelligence-t a fejlettebb PDF feldolgozáshoz, hangátiratot beszéd tartalmakhoz, valamint plugin rendszert további fájlformátumok kiterjesztéséhez.

**Valós használat**: "Alakítsd át ezt a PowerPoint prezentációt Markdown formátumba a dokumentációs weboldalunkhoz", "Nyerd ki a szöveget ebből a PDF-ből a megfelelő címsor struktúrával", vagy "Alakítsd át ezt az Excel táblázatot olvasható táblázatos formátumba"

**Kiemelt példa**: Ahogy a [MarkItDown dokumentációja](https://github.com/microsoft/markitdown#why-markdown) idézi:

> A Markdown rendkívül közel áll a sima szöveghez, minimális jelölésekkel vagy formázással, de mégis lehetőséget ad a fontos dokumentumszerkezet ábrázolására. A főbb LLM-ek, mint például az OpenAI GPT-4o, natívan „beszélnek” Markdown nyelven, és gyakran váratlanul használják a Markdown-t válaszaikban. Ez arra utal, hogy hatalmas mennyiségű Markdown formázott szövegen lettek betanítva, és jól értik azt. Másodlagos előnyként a Markdown konvenciók nagyon token-hatékonyak is.

A MarkItDown nagyon jól megőrzi a dokumentumszerkezetet, mely fontos az AI munkafolyamatokban. Például PowerPoint prezentáció átalakításakor megőrzi a dia szerkezetét a helyes címsorokkal, táblázatokat Markdown táblázatokként emel ki, képhez alternatív szöveget csatol, és még a hanganyag megjegyzéseket is feldolgozza. A diagramokat olvasható adat táblázatokká alakítja, és a végeredményként kapott Markdown megtartja az eredeti prezentáció logikai folyamatát. Ez ideálissá teszi, hogy a bemutató tartalmát AI rendszerekbe tápláljuk be, vagy dokumentációt készítsünk a meglévő diákról.

### 6. 🗃️ SQL Server MCP Server

[![Telepítés a VS Code-ban](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Telepítés a VS Code Insiders-ben](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Mit csinál**: Beszélgetés alapú hozzáférést biztosít SQL Server adatbázisokhoz (helyi, Azure SQL vagy Fabric környezetben)

**Miért hasznos**: Hasonló a PostgreSQL szerverhez, de a Microsoft SQL ökoszisztémára szabva. Egy egyszerű kapcsolati karakterlánccal csatlakozol, és természetes nyelven kezdheted a lekérdezést – nincs több kontextusváltás!

**Valós használat**: "Találd meg az összes rendelést, amit az elmúlt 30 napban nem teljesítettek" - ezt lefordítja a megfelelő SQL lekérdezésekre, majd formázott eredményeket ad vissza.

**Kiemelt példa**: Miután beállítottad az adatbázis kapcsolatot, azonnal elkezdhetsz adatbázisoddal beszélgetni. A blogposzt egy egyszerű kérdést mutat be: "Melyik adatbázishoz vagy csatlakozva?" Az MCP szerver a megfelelő adatbázis eszközt hívja meg, kapcsolódik az SQL Server példányodhoz, és visszaadja az aktuális adatbázis kapcsolattal kapcsolatos részleteket – mindezt egyetlen SQL sor írása nélkül. A szerver támogatja az átfogó adatbázis műveleteket, a séma kezelésétől kezdve az adatmanipulációig, mindezt természetes nyelvű utasításokon keresztül. A teljes beállítási útmutatókért és konfigurációs példákért VS Code és Claude Desktop használatával lásd: [Az MSSQL MCP szerver bemutatása (próba)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).

### 7. 🎭 Playwright MCP Server

[![Telepítés a VS Code-ban](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Telepítés a VS Code Insiders-ben](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Mit csinál**: Lehetővé teszi, hogy AI ügynökök weboldalakkal lépjenek interakcióba tesztelés és automatizálás céljából.

> **ℹ️ A GitHub Copilot hajtóereje**
> 
> A Playwright MCP Server adja a GitHub Copilot Coding Agentjének web böngészési képességeit! [Többet erről a funkcióról](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Miért hasznos**: Tökéletes az automatizált tesztekhez, amelyeket természetes nyelvű leírások vezérelnek. Az AI képes oldalon navigálni, űrlapokat kitölteni és adatokat kinyerni strukturált akadálymentességi pillanatképek segítségével – ez hihetetlenül erős!

**Valós használat**: "Teszteld a bejelentkezési folyamatot, és ellenőrizd, hogy a vezérlőpult helyesen töltődik-e be", vagy "Generálj tesztet, ami termékeket keres, és érvényesíti az eredményoldalt" – mindez az alkalmazás forráskódjának ismerete nélkül.

**Kiemelt példa**: A csapattársam, Debbie O'Brien fantasztikus munkát végzett mostanában a Playwright MCP Serverrel! Például nemrég bemutatta, hogyan lehet teljes Playwright teszteket generálni anélkül, hogy hozzáférne az alkalmazás forráskódjához. A forgatókönyvében megkérte a Copilotot, hogy készítsen tesztet egy filmkereső alkalmazáshoz: látogasson el az oldalra, keressen rá "Garfield"-ra, és ellenőrizze, hogy a film megjelenik-e az eredmények között. Az MCP elindított egy böngésző munkamenetet, feltérképezte az oldal szerkezetét DOM pillanatképek segítségével, megtalálta a megfelelő szelekciókat, és létrehozott egy teljesen működő TypeScript tesztet, ami első futtatásra sikeres volt.

A valódi erősség abban rejlik, hogy áthidalja a szakadékot a természetes nyelvű utasítások és a futtatható tesztkód között. A hagyományos megközelítések manuális tesztírást vagy a kódalap kontextusát igénylik. A Playwright MCP-vel viszont külső oldalakat, kliens alkalmazásokat vagy fekete doboz tesztelési forgatókönyveket is tesztelhetsz, ahol a kódfájl(ok)hoz nincs hozzáférés.

### 8. 💻 Dev Box MCP Server

[![Telepítés a VS Code-ban](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Telepítés a VS Code Insiders-ben](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Mit csinál**: Microsoft Dev Box környezeteket kezel természetes nyelven keresztül

**Miért hasznos**: Jelentősen egyszerűsíti a fejlesztői környezetek kezelését! Fejlesztői környezeteket hozhatsz létre, konfigurálhatsz és kezelhetsz anélkül, hogy specifikus parancsokat kellene megjegyezned.

**Valós használat**: "Állíts be egy új Dev Boxot a legújabb .NET SDK-val, és konfiguráld a projektünkhöz", "Ellenőrizd az összes fejlesztői környezetem állapotát", vagy "Hozz létre egy szabványosított bemutató környezetet a csapatunk prezentációihoz"

**Kiemelt példa**: Nagy rajongója vagyok a Dev Box személyes fejlesztésre való használatának. Egy izgalmas pillanatot éltem át, amikor James Montemagno elmagyarázta, milyen nagyszerű a Dev Box konferencia bemutatókhoz, mivel nagyon gyors ethernet kapcsolatot biztosít, függetlenül attól, hogy az adott pillanatban milyen wifi hálózaton vagyok – konferencián, szállodában vagy repülőgépen. Valójában nemrég konferencia demo gyakorlást tartottam úgy, hogy a laptopom a telefon hotspotjához volt csatlakoztatva utazás közben Bruges-ből Antwerpenbe! A következő lépésem az lesz, hogy jobban beleássam magam a több fejlesztői környezet csapat számára történő kezelésébe és a szabványosított bemutató környezetekbe. Egy másik fontos felhasználási terület, amit ügyfelektől és munkatársaktól hallottam, a Dev Box előre konfigurált fejlesztői környezetként való használata. Mindkét esetben az MCP használata a Dev Boxok konfigurálásához és kezeléséhez lehetővé teszi a természetes nyelvű interakciót, miközben a fejlesztői környezetben maradsz.

### 9. 🤖 Microsoft Foundry MCP Server
[![Telepítés VS Code-ban](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Telepítés VS Code Insiders-ban](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Mire képes**: A Microsoft Foundry MCP Server átfogó hozzáférést biztosít a fejlesztők számára az Azure AI ökoszisztémájához, beleértve a modellszótárakat, a telepítéskezelést, tudásindexálást az Azure AI Search segítségével, valamint értékelő eszközöket. Ez az experimentális szerver hidat képez az AI fejlesztés és az Azure hatékony AI infrastruktúrája között, megkönnyítve az AI alkalmazások építését, telepítését és értékelését.

**Miért hasznos**: Ez a szerver megváltoztatja az Azure AI szolgáltatásokkal való munkavégzést azzal, hogy az vállalati szintű AI képességeket közvetlenül a fejlesztési munkafolyamatba hozza. Az Azure portál, a dokumentáció és az IDE közti váltogatás helyett felfedezhetünk modelleket, telepíthetünk szolgáltatásokat, kezelhetjük a tudásbázisokat, és értékelhetjük az AI teljesítményét természetes nyelvi parancsok segítségével. Különösen hasznos azoknak a fejlesztőknek, akik RAG (Retrieval-Augmented Generation) alkalmazásokat építenek, többmodell-telepítést kezelnek, vagy átfogó AI értékelési folyamatokat valósítanak meg.

**Fő fejlesztői képességek**:
- **🔍 Modell felfedezés és telepítés**: Böngéssze a Microsoft Foundry modellszótárát, kapjon részletes modelltípusi információkat kódmintákkal, és telepítsen modelleket az Azure AI szolgáltatásokba
- **📚 Tudáskezelés**: Hozzon létre és kezeljen Azure AI Search indexeket, adjon hozzá dokumentumokat, konfiguráljon indexelőket, és építsen kifinomult RAG rendszereket
- **⚡ AI Agent integráció**: Kapcsolódjon Azure AI ügynökökhöz, kérdezze le a meglévő ügynököket, és értékelje az ügynökök teljesítményét éles környezetben
- **📊 Értékelési keretrendszer**: Hajtson végre átfogó szöveg- és ügynökértékeléseket, generáljon markdown jelentéseket, és valósítson meg minőségbiztosítást AI alkalmazások számára
- **🚀 Prototípus készítő eszközök**: Szerezzen be beállítási útmutatókat GitHub-alapú prototípusokhoz és férjen hozzá a Microsoft Foundry Labs legújabb kutatási modelljeihez

**Gyakorlati fejlesztői használat**: "Telepíts egy Phi-4 modellt az Azure AI Services szolgáltatásba az alkalmazásomhoz", "Hozz létre egy új keresési indexet a dokumentáció RAG rendszeremhez", "Értékeld az ügynököm válaszait minőségi mutatók alapján", vagy "Találd meg a legjobb érvelési modellt a komplex elemzési feladataimhoz"

**Teljes demó forgatókönyv**: Íme egy erőteljes AI fejlesztési munkafolyamat:

> "Ügyfélszolgálati ügynököt fejlesztek. Segíts találni egy jó érvelési modellt a katalógusból, telepítsd az Azure AI Services-be, hozz létre egy tudásbázist a dokumentációból, állíts be egy értékelési keretrendszert a válaszok minőségének tesztelésére, majd segíts a GitHub tokennel való integráció prototípusának elkészítésében a teszteléshez."

A Microsoft Foundry MCP Server:
- Lekérdezi a modell katalógust, hogy a követelményeid alapján ajánljon optimális érvelési modelleket
- Biztosítja a telepítési parancsokat és kvóta-információkat a kívánt Azure régióhoz
- Beállítja az Azure AI Search indexeket a megfelelő sémával a dokumentációhoz
- Konfigurálja az értékelési folyamatokat minőségi mutatókkal és biztonsági ellenőrzésekkel
- Generál prototípus kódot GitHub hitelesítéssel az azonnali teszteléshez
- Átfogó beállítási útmutatókat nyújt az adott technológiai környezetedhez igazítva

**Kiemelt példa**: Fejlesztőként nehezen tudtam lépést tartani a különböző LLM modellekkel. Néhány főbb modellt ismerek, de úgy éreztem, hogy lemaradok hatékonysági és termelékenységi előnyökről. A tokenek és kvóták kezelése is stresszes és nehézkes – sosem tudtam biztosan, hogy a megfelelő modellt választom az adott feladathoz, vagy pazarlom a költségvetést. Most hallottam erről az MCP Serverről James Montemagnótól, miközben ajánlásokat gyűjtöttem ebben a posztban, és nagyon izgatott vagyok, hogy kipróbálhatom! A modell felfedezési képességek különösen lenyűgözőek olyan fejlesztőknek, mint én, akik a megszokott modelleken túl szeretnének felfedezni optimalizált alternatívákat. Az értékelési keretrendszer segíteni fog abban, hogy valóban jobb eredményeket érjek el, ne csak véletlenszerűen próbálgassak.

> **ℹ️ Kísérleti állapot**
> 
> Ez az MCP szerver kísérleti stádiumban van és aktív fejlesztés alatt áll. A funkciók és API-k változhatnak. Kiváló kezdéshez és prototípusok építéséhez, de a termelési stabilitás igényeit külön ellenőrizni kell.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Telepítés VS Code-ban](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Telepítés VS Code Insiders-ban](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Mire képes**: Alapvető eszközöket biztosít fejlesztőknek AI ügynökök és alkalmazások építéséhez, amelyek integrálódnak a Microsoft 365-tel és a Microsoft 365 Copilot-tal, beleértve sémaellenőrzést, kódminta lekérést és hibakeresési segítséget.

**Miért hasznos**: A Microsoft 365 és Copilot fejlesztése bonyolult manifest sémákat és specifikus fejlesztési mintákat igényel. Ez az MCP szerver alapvető fejlesztési erőforrásokat hoz közvetlenül a kódkörnyezetedbe, segítve, hogy ellenőrizd a sémákat, találj kódmintákat, és hibaelháríts gyakori problémákat dokumentáció folyamatos böngészése nélkül.

**Gyakorlati használat**: "Validáld a deklaratív ügynök manifestemet és javítsd a sémákban lévő hibákat", "Mutass példakódot Microsoft Graph API plugin implementálásához", vagy "Segíts nekem hibakeresni a Teams alkalmazás hitelesítési problémáimat"

**Kiemelt példa**: Felvettem a kapcsolatot John Miller barátommal, miután a Build-en beszélgettünk a M365 ügynökökről, és ő ajánlotta ezt az MCP-t. Ez nagyszerű lehet új fejlesztőknek, akik kezdők az M365 ügynökök terén, mivel sablonokat, kódmintákat és adminisztrációs keretet biztosít a gyors induláshoz dokumentációtól el nem fulladva. A sémaellenőrző funkciók különösen hasznosak a manifestelemek szerkezeti hibáinak elkerüléséhez, amelyek órákig tartó hibakeresést spórolhatnak meg.

> **💡 Hasznos tipp**
> 
> Használd ezt a szervert együtt a Microsoft Learn Docs MCP Serverrel a teljes körű M365 fejlesztési támogatásért – az egyik az hivatalos dokumentációt adja, míg ez a gyakorlati fejlesztői eszközöket és hibakeresési támogatást kínál.


## Mi következik? 🔮

## 📋 Összegzés

A Model Context Protocol (MCP) átalakítja, hogyan dolgoznak a fejlesztők AI asszisztensekkel és külső eszközökkel. Ez a 10 Microsoft MCP szerver bemutatja a szabványos AI integráció erejét, lehetővé téve zökkenőmentes munkafolyamatokat, amelyek során a fejlesztők a koncentrált munkában maradva férhetnek hozzá hatékony külső lehetőségekhez.

Az átfogó Azure ökoszisztéma integrációjától a specializált eszközökig, mint például a Playwright böngésző-automatizációhoz vagy a MarkItDown dokumentumfeldolgozáshoz, ezek a szerverek azt mutatják, hogyan növelheti a MCP a termelékenységet sokféle fejlesztési forgatókönyvben. A szabványosított protokoll biztosítja, hogy ezek az eszközök zökkenőmentesen működjenek együtt, egy koherens fejlesztői élményt nyújtva.

Ahogy az MCP ökoszisztéma fejlődik, a közösségben való aktív részvétel, új szerverek felfedezése és egyedi megoldások építése kulcsfontosságú lesz a fejlesztési hatékonyság maximalizálásához. Az MCP nyílt szabvány jellege lehetővé teszi, hogy különböző gyártók eszközeit kombináld, így kialakítva a saját, tökéletes munkafolyamatodat.

## 🔗 További források

- [Hivatalos Microsoft MCP tárhely](https://github.com/microsoft/mcp)
- [MCP közösség és dokumentáció](https://modelcontextprotocol.io/introduction)
- [VS Code MCP dokumentáció](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP dokumentáció](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP dokumentáció](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP események](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Király GitHub Copilot testreszabások](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days élőben július 29-30, vagy nézhető igény szerint](https://aka.ms/mcpdevdays)

## 🎯 Gyakorlatok

1. **Telepítés és konfiguráció**: Állítsd be valamelyik MCP szervert a VS Code környezetedben és teszteld az alapfunkciókat.
2. **Munkafolyamat integráció**: Tervezd meg egy fejlesztési munkafolyamatot, amely legalább három különböző MCP szervert kombinál.
3. **Egyedi szerver tervezése**: Azonosíts egy napi fejlesztési feladatot, amely profitálna egy egyedi MCP szerverből, és készíts specifikációt hozzá.
4. **Teljesítmény elemzés**: Hasonlítsd össze az MCP szerverek használatának hatékonyságát a hagyományos megoldásokkal gyakori fejlesztési feladatok során.
5. **Biztonsági értékelés**: Értékeld az MCP szerverek használatának biztonsági következményeit a fejlesztői környezetedben, és javasolj bevált gyakorlatokat.


Következő:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->