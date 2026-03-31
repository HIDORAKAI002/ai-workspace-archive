# Fejlett MCP Biztonság Azure Content Safety-vel

> **OWASP MCP Kezelt kockázat**: [MCP06 - Prompt injekció kontextuális payloadokon keresztül](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Az Azure Content Safety több hatékony eszközt kínál, amelyek növelhetik MCP megvalósításaid biztonságát. Gyakorlati megvalósítási tapasztalatokért lásd a [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3. tábor: I/O Biztonságot.

## Prompt Pajzsok

A Microsoft AI Prompt Pajzsok erős védelmet nyújtanak közvetlen és közvetett prompt injekciós támadások ellen az alábbiak révén:

1. **Fejlett felismerés**: Gépi tanulást használ a tartalomba ágyazott rosszindulatú utasítások azonosítására.
2. **Kiemeletés**: Átalakítja a bemeneti szöveget, hogy az AI rendszerek meg tudják különböztetni az érvényes utasításokat és a külső bemeneteket.
3. **Elválasztók és adathatárok**: Megjelöli a megbízható és nem megbízható adatok közötti határokat.
4. **Content Safety integráció**: Az Azure AI Content Safety-vel együttműködve azonosítja a jailbreak kísérleteket és a káros tartalmakat.
5. **Folyamatos frissítések**: A Microsoft rendszeresen frissíti a védekező mechanizmusokat az új fenyegetések ellen.

## Azure Content Safety megvalósítása MCP-vel

Ez a megközelítés többrétegű védelmet nyújt:
- Bemenetek szkennelése feldolgozás előtt
- Kimenetek érvényesítése visszaadás előtt
- Blokkolólisták használata ismert káros minták esetén
- Az Azure folyamatosan frissülő tartalombiztonsági modelljeinek kihasználása

## Azure Content Safety források

Ha többet szeretnél megtudni az Azure Content Safety MCP szerverekkel történő megvalósításáról, konzultálj ezekkel a hivatalos forrásokkal:

1. [Azure AI Content Safety Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/) - Hivatalos dokumentáció az Azure Content Safety-hez.
2. [Prompt Pajzs Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Ismerd meg, hogyan akadályozhatók meg a prompt injekciós támadások.
3. [Content Safety API Referencia](https://learn.microsoft.com/rest/api/contentsafety/) - Részletes API referencia a Content Safety megvalósítására.
4. [Gyorsindítás: Azure Content Safety C#-szal](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Gyors megvalósítási útmutató C# nyelven.
5. [Content Safety klienskönyvtárak](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klienskönyvtárak különböző programozási nyelvekhez.
6. [Jailbreak kísérletek észlelése](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Konkrét útmutatás a jailbreak kísérletek azonosítására és megelőzésére.
7. [A tartalombiztonság legjobb gyakorlatai](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Legjobb gyakorlatok a hatékony tartalombiztonsági megvalósításhoz.

Részletesebb megvalósításhoz lásd [Azure Content Safety megvalósítási útmutatónkat](./azure-content-safety-implementation.md).

## Mi következik

- Olvasd el: [Azure Content Safety megvalósítása](./azure-content-safety-implementation.md)
- Térj vissza: [Biztonsági modul áttekintése](./README.md)
- Folytasd: [3. modul: Kezdés](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Nyilatkozat**:
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) használatával fordítottuk le. Bár igyekszünk a pontosságra, kérjük, vegye figyelembe, hogy az automatikus fordítások tartalmazhatnak hibákat vagy pontatlanságokat. Az eredeti dokumentum annak anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális, humán fordítást javaslunk. Nem vállalunk felelősséget az ebből a fordításból eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->