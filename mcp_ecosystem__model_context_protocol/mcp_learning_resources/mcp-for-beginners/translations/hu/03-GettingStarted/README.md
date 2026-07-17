## Kezdés  

[![Build Your First MCP Server](../../../translated_images/hu/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Kattints a fenti képre a lecke videójának megtekintéséhez)_

Ez a szakasz több leckéből áll:

- **1 Az első szervered**, ebben az első leckében megtanulod, hogyan készítsd el az első szerveredet és hogyan vizsgáld meg azt az inspector eszközzel, ami egy értékes módja a szerver tesztelésének és hibakeresésének, [a leckéhez](01-first-server/README.md)

- **2 Ügyfél**, ebben a leckében megtanulod, hogyan írj egy ügyfelet, ami képes kapcsolódni a szerveredhez, [a leckéhez](02-client/README.md)

- **3 Ügyfél LLM-mel**, egy még jobb módja az ügyfél írásának, ha LLM-et adsz hozzá, amely képes "tárgyalni" a szervereddel arról, mit tegyen, [a leckéhez](03-llm-client/README.md)

- **4 Egy szerver GitHub Copilot Agent módjának fogyasztása Visual Studio Code-ban**. Itt azt nézzük meg, hogyan futtassuk az MCP szerverünket a Visual Studio Code-ból, [a leckéhez](04-vscode/README.md)

- **5 stdio Transport Szerver** stdio szállítás az ajánlott szabvány a helyi MCP szerver-ügyfél kommunikációhoz, ami biztonságos alfolyamat-alapú kommunikációt kínál beépített folyamat izolációval, [a leckéhez](05-stdio-server/README.md)

- **6 HTTP Streaming MCP-vel (Streamable HTTP)**. Ismerd meg a modern HTTP streaming szállítást (az ajánlott megközelítés távoli MCP szerverekhez a [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) szerint), haladási értesítéseket, és hogyan valósíts meg skálázható, valós idejű MCP szervereket és klienseket Streamable HTTP használatával. [a leckéhez](06-http-streaming/README.md)

- **7 AI Toolkit használata VSCode-hoz** MCP kliens és szerver fogyasztására és tesztelésére [a leckéhez](07-aitk/README.md)

- **8 Tesztelés**. Itt különösen arra koncentrálunk, hogyan tesztelhetjük különböző módokon a szerverünket és kliensünket, [a leckéhez](08-testing/README.md)

- **9 Telepítés**. Ez a fejezet áttekinti az MCP megoldások különböző telepítési módjait, [a leckéhez](09-deployment/README.md)

- **10 Fejlett szerverhasználat**. Ez a fejezet a fejlett szerverhasználatról szól, [a leckéhez](./10-advanced/README.md)

- **11 Hitelesítés**. Ez a fejezet bemutatja, hogyan adj hozzá egyszerű hitelesítést, az alapvető Basic Authtól a JWT és RBAC használatig. Ajánlott itt kezdeni, majd a Fejlett témák fejezetében (5. fejezet) tovább mélyedni, és további biztonsági erősítéseket végrehajtani a 2. fejezet javaslatai alapján, [a leckéhez](./11-simple-auth/README.md)

- **12 MCP hosztok**. Népszerű MCP host kliensek konfigurálása és használata, beleértve a Claude Desktopot, Cursor-t, Cline-t és Windsurföt. Ismerd meg a szállítási típusokat és a hibakeresést, [a leckéhez](./12-mcp-hosts/README.md)

- **13 MCP Inspector**. Hibakeresd és teszteld interaktívan az MCP szervereidet az MCP Inspector eszközzel. Ismerd meg a hibakereső eszközöket, erőforrásokat és protokollüzeneteket, [a leckéhez](./13-mcp-inspector/README.md)

- **14 Mintavételezés**. Készíts MCP szervereket, amelyek együttműködnek MCP klienssel LLM-hez kapcsolódó feladatokban (elavult a `2026-07-28` kiadás-jelöltben; még mindig érvényes a `2025-11-25` verzióig). [a leckéhez](./14-sampling/README.md)

- **15 MCP Alkalmazások**. Építs MCP szervereket, amelyek UI utasításokkal is válaszolnak, [a leckéhez](./15-mcp-apps/README.md)

A Model Context Protocol (MCP) egy nyílt protokoll, amely szabványosítja, hogy az alkalmazások hogyan szolgáltatnak kontextust LLM-ek számára. Gondolj az MCP-re úgy, mint egy USB-C portra az AI alkalmazások számára – egy egységesített módot kínál az AI modellek különféle adatforrásokhoz és eszközökhöz való kapcsolására.

## Tanulási célok

A lecke végére képes leszel:

- MCP fejlesztői környezetek beállítása C#, Java, Python, TypeScript és JavaScript nyelveken
- Egyszerű MCP szerverek építése és telepítése egyedi funkciókkal (erőforrások, promptok és eszközök)
- Hoszt alkalmazások létrehozása, amelyek kapcsolódnak az MCP szerverekhez
- Az MCP implementációk tesztelése és hibakeresése
- A gyakori beállítási kihívások és megoldások megértése
- MCP implementációk kapcsolása népszerű LLM szolgáltatásokhoz

## MCP környezet beállítása

Mielőtt elkezdenél dolgozni az MCP-vel, fontos előkészíteni a fejlesztői környezetet és megérteni az alapvető munkafolyamatot. Ez a szakasz végigvezet az első beállítási lépéseken, hogy zökkenőmentesen kezdhesd az MCP használatát.

### Előfeltételek

Mielőtt belevágnál az MCP fejlesztésbe, győződj meg róla, hogy rendelkezel:

- **Fejlesztői környezet**: a választott nyelvhez (C#, Java, Python, TypeScript vagy JavaScript)
- **IDE/Szerkesztő**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm vagy bármely modern kódszerkesztő
- **Csomagkezelők**: NuGet, Maven/Gradle, pip vagy npm/yarn
- **API kulcsok**: bármely AI szolgáltatáshoz, amit a hoszt alkalmazásaidban használni tervezel


### Hivatalos SDK-k

A következő fejezetekben Python, TypeScript, Java és .NET alapú megoldásokat fogsz látni. Itt találod az összes hivatalosan támogatott SDK-t.

Az MCP több nyelvhez biztosít hivatalos SDK-kat (összhangban a [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) szabvánnyal):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Microsoft együttműködéssel karbantartva
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Spring AI együttműködéssel karbantartva
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - A hivatalos TypeScript implementáció
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - A hivatalos Python implementáció (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - A hivatalos Kotlin implementáció
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Loopwork AI-val együttműködésben karbantartva
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - A hivatalos Rust implementáció
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - A hivatalos Go implementáció

## Főbb tanulságok

- MCP fejlesztői környezet beállítása egyszerű a nyelvspecifikus SDK-k segítségével
- MCP szerverek építése eszközök létrehozását és regisztrálását jelenti világos sémákkal
- MCP kliensek kapcsolódnak szerverekhez és modellekhez a kiterjesztett képességek hasznosítására
- A tesztelés és hibakeresés elengedhetetlen a megbízható MCP megvalósításokhoz
- Telepítési lehetőségek a helyi fejlesztéstől a felhőalapú megoldásokig terjednek

## Gyakorlás

Van egy készlet mintákból, amelyek kiegészítik a fejezetekben látott gyakorlatokat. Ezen felül minden fejezethez tartoznak saját gyakorlatok és feladatok

- [Java Számológép](./samples/java/calculator/README.md)
- [.Net Számológép](../../../03-GettingStarted/samples/csharp)
- [JavaScript Számológép](./samples/javascript/README.md)
- [TypeScript Számológép](./samples/typescript/README.md)
- [Python Számológép](../../../03-GettingStarted/samples/python)

## További források

- [Agentek építése Model Context Protocol segítségével az Azure-ban](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Távoli MCP Azure Container Apps használatával (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Mi következik

Kezdd az első leckével: [Első MCP szerver létrehozása](01-first-server/README.md)

Amint befejezted ezt a modult, folytasd a következővel: [4. modul: Gyakorlati megvalósítás](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->