# Haladó MCP Biztonság Azure Content Safety-val

> **Kezelt OWASP MCP Kockázat**: [MCP06 - Szándékáram-megkerülés](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Az Azure Content Safety számos hatékony eszközt biztosít, amelyek növelhetik MCP megvalósításainak biztonságát. A gyakorlati megvalósítási tapasztalatért lásd a [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3. tábort: I/O Biztonság.

## Prompt Pajzsok

A Microsoft AI Prompt Pajzsai erős védelmet nyújtanak mind közvetlen, mind közvetett prompt befecskendezési támadások ellen az alábbiak révén:

1. **Fejlett Észlelés**: Gépi tanulást használ a tartalomba ágyazott rosszindulatú utasítások azonosítására.
2. **Feltüntetés**: Átalakítja a bemeneti szöveget, hogy az AI rendszerek meg tudják különböztetni az érvényes utasításokat a külső bemenetektől.
3. **Elválasztók és Adatjelölés**: Megjelöli a megbízható és nem megbízható adatok közötti határokat.
4. **Content Safety Integráció**: Az Azure AI Content Safety-val együttműködve észleli a jailbreak kísérleteket és káros tartalmakat.
5. **Folyamatos Frissítések**: A Microsoft rendszeresen frissíti a védekezési mechanizmusokat az új fenyegetésekkel szemben.

## Azure Content Safety megvalósítása MCP-vel

Ez a megközelítés többrétegű védelmet nyújt:
- Bemenetek átvizsgálása feldolgozás előtt
- Kimenetek érvényesítése visszaadás előtt
- Fekete listák használata ismert káros minták ellen
- Az Azure folyamatosan frissülő tartalombiztonsági modelljeinek kihasználása

## Azure Content Safety Források

Az Azure Content Safety MCP szervereiddel való megvalósításának megismeréséhez tekintse meg ezeket a hivatalos forrásokat:

1. [Azure AI Content Safety Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/) - Az Azure Content Safety hivatalos dokumentációja.
2. [Prompt Pajzs Dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Tudja meg, hogyan előzze meg a prompt befecskendezési támadásokat.
3. [Content Safety API Referencia](https://learn.microsoft.com/rest/api/contentsafety/) - Részletes API referencia a Content Safety megvalósításához.
4. [Gyorsindítás: Azure Content Safety C# használatával](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Gyors megvalósítási útmutató C#-szal.
5. [Content Safety Ügyfél Könyvtárak](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Ügyfélkönyvtárak különféle programozási nyelvekhez.
6. [Jailbreak kísérletek észlelése](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Speciális útmutató jailbreak kísérletek és megelőzésük tekintetében.
7. [Best Practices a Content Safety-hez](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Legjobb gyakorlatok a tartalombiztonság hatékony megvalósításához.

A mélyebb megvalósításhoz lásd a [Azure Content Safety megvalósítási útmutatót](./azure-content-safety-implementation.md).

## Mi következik

- Olvassa el: [Azure Content Safety megvalósítás](./azure-content-safety-implementation.md)
- Térjen vissza: [Biztonsági Modul Áttekintés](./README.md)
- Folytassa: [3. modul: Első lépések](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->