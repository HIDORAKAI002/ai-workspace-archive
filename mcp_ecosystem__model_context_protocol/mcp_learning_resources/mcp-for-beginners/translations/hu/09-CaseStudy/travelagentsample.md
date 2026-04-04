# Esettanulmány: Azure AI Utazási Ügynökök – Referencia Implementáció

## Áttekintés

az [Azure AI Utazási Ügynökök](https://github.com/Azure-Samples/azure-ai-travel-agents) egy átfogó referencia megoldás, amelyet a Microsoft fejlesztett ki, és bemutatja, hogyan lehet egy többügynökös, mesterséges intelligenciával támogatott utazástervező alkalmazást építeni a Model Context Protocol (MCP), az Azure OpenAI és az Azure AI Search használatával. Ez a projekt bemutatja a több AI ügynök összehangolásának, az vállalati adatok integrálásának és egy biztonságos, bővíthető platform biztosításának legjobb gyakorlatait valós életbeli forgatókönyvekhez.

## Főbb funkciók
- **Többügynökös összhangzás:** Az MCP-t használja specializált ügynökök (pl. repülőjárat-, szálloda- és útiterv ügynökök) koordinálására, amelyek együttműködnek összetett utazástervezési feladatok ellátásához.
- **Vállalati adatintegráció:** Csatlakozik az Azure AI Search-hez és más vállalati adatforrásokhoz, hogy naprakész, releváns információkat nyújtson utazási ajánlásokhoz.
- **Biztonságos, skálázható architektúra:** Az Azure szolgáltatásait használja hitelesítéshez, jogosultságkezeléshez és skálázható telepítéshez, követve a vállalati biztonsági legjobb gyakorlatokat.
- **Bővíthető eszköztár:** Újrahasznosítható MCP eszközöket és prompt sablonokat valósít meg, lehetővé téve a gyors alkalmazkodást új területekhez vagy üzleti követelményekhez.
- **Felhasználói élmény:** Párbeszédes felületet biztosít a felhasználóknak az utazási ügynökökkel való interakcióra, amelyet az Azure OpenAI és az MCP támogat.

## Architektúra
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Architektúra diagram leírása

Az Azure AI Utazási Ügynökök megoldás moduláris, skálázható és biztonságos integrációra lett tervezve több mesterséges intelligencia ügynök és vállalati adatforrás számára. A fő komponensek és az adatfolyam a következők:

- **Felhasználói felület:** A felhasználók egy párbeszédes UI-n (például webes csevegőfelületen vagy Teams boton keresztül) lépnek kapcsolatba a rendszerrel, ahol felteszik kérdéseiket és megkapják az utazási ajánlásokat.
- **MCP szerver:** Központi koordinátorként működik, fogadja a felhasználói bemeneteket, kezeli a kontextust és összehangolja a specializált ügynökök (pl. FlightAgent, HotelAgent, ItineraryAgent) tevékenységét a Model Context Protocol segítségével.
- **AI ügynökök:** Minden ügynök egy adott területért felelős (repülőjáratok, szállodák, útiterv) és MCP eszközként van megvalósítva. Az ügynökök prompt sablonokat és logikát használnak a kérések feldolgozására és válaszok generálására.
- **Azure OpenAI szolgáltatás:** Fejlett természetes nyelv megértést és generálást biztosít, lehetővé téve az ügynökök számára a felhasználói szándék pontos értelmezését és párbeszédes válaszok létrehozását.
- **Azure AI Search & vállalati adatok:** Az ügynökök lekérdezik az Azure AI Search-t és más vállalati adatforrásokat, hogy naprakész információkat szerezzenek a repülőjáratokról, szállodákról és utazási lehetőségekről.
- **Hitelesítés és biztonság:** A Microsoft Entra ID-val integrált biztonságos hitelesítést biztosít, és a legkisebb jogosultság elvét alkalmazza az összes erőforrás hozzáférésére.
- **Telepítés:** Az Azure Container Apps-en történik a telepítés, biztosítva a skálázhatóságot, figyelést és működési hatékonyságot.

Ez az architektúra lehetővé teszi a több AI ügynök zökkenőmentes összehangolását, a biztonságos vállalati adat integrációt, és egy robusztus, bővíthető platformot domain-specifikus AI megoldások építéséhez.

## Lépésről lépésre az architektúra diagram magyarázata
Képzelj el egy nagy utazás megtervezését, ahol egy szakértő asszisztens csapat segít minden részletben. Az Azure AI Utazási Ügynökök rendszer hasonlóan működik, különböző részekből áll (mint egy csapat tagjai), amik mind egy különleges feladatért felelősek. Így illeszkedik össze mindez:

### Felhasználói felület (UI):
Gondolj erre úgy, mint az utazási ügynököd recepciójára. Ott teszed fel a kérdéseidet vagy kéred az utazást, például „Találj nekem egy járatot Párizsba.” Ez lehet egy weboldali csevegőablak vagy egy üzenetküldő alkalmazás.

### MCP szerver (A koordinátor):
Az MCP szerver olyan, mint a menedzser, aki meghallgatja a kérésedet a recepción, és eldönti, hogy melyik szakértő foglalkozzon az adott résszel. Nyomon követi a beszélgetést, és gondoskodik róla, hogy minden gördülékenyen működjön.

### AI ügynökök (szakértő asszisztensek):
Minden ügynök egy adott terület specialistája – az egyik mindent tud a repülőjáratokról, a másik a szállodákról, a harmadik az útiterv tervezéséről. Amikor utazást kérsz, az MCP szerver elküldi a kérést a megfelelő ügynök(ök)nek. Ezek az ügynökök a tudásukat és eszközeiket használják, hogy megtalálják a legjobb lehetőségeket számodra.

### Azure OpenAI szolgáltatás (nyelvi szakértő):
Olyan, mintha egy nyelvi szakértő segítene, aki pontosan érti, mit kérsz, bárhogy is fogalmazol. Segíti az ügynököket a kéréseid megértésében és természetes, párbeszédes válaszok létrehozásában.

### Azure AI Search & vállalati adatok (információs könyvtár):
Képzelj el egy hatalmas, naprakész könyvtárat az összes legfrissebb utazási információval – repülőjárat menetrendekkel, szállodai elérhetőséggel és egyebekkel. Az ügynökök ebben a könyvtárban keresik meg a legpontosabb válaszokat neked.

### Hitelesítés és biztonság (biztonsági őr):
Ahogy egy biztonsági őr ellenőrzi, ki léphet be bizonyos területekre, ez a rész gondoskodik róla, hogy csak engedélyezett személyek és ügynökök férjenek hozzá bizalmas adatokhoz. Biztosítja az adataid védelmét és magánéletét.

### Telepítés az Azure Container Apps-en (az épület):
Minden asszisztens és eszköz egy biztonságos, skálázható épületben (a felhőben) dolgozik együtt. Ez azt jelenti, hogy a rendszer sok felhasználót tud egyszerre kezelni, és mindig elérhető, amikor szükséged van rá.

## Hogyan működik együtt mindez:

Először egy kérdést teszel fel a recepción (UI).
A menedzser (MCP szerver) kitalálja, melyik szakértő (ügynök) segíthet neked.
A szakértő a nyelvi szakértővel (OpenAI) érti meg a kérésed, és a könyvtárban (AI Search) keresi meg a legjobb választ.
A biztonsági őr (Hitelesítés) gondoskodik róla, hogy minden biztonságos legyen.
Mindez egy megbízható, skálázható épületben (Azure Container Apps) történik, így az élmény zökkenőmentes és biztonságos.
Ez a csapatmunka lehetővé teszi, hogy a rendszer gyorsan és biztonságosan segítsen neked megtervezni az utadat, pont úgy, mint egy szakértő utazási ügynökökből álló csapat egy modern irodában!

## Műszaki megvalósítás
- **MCP szerver:** A központi összehangoló logikát hosztolja, kiteszi az ügynök eszközöket, és kezeli a kontextust a többlépcsős utazástervezési munkafolyamatokhoz.
- **Ügynökök:** Minden ügynök (pl. FlightAgent, HotelAgent) MCP eszközként van megvalósítva a saját prompt sablonjaival és logikájával.
- **Azure integráció:** Az Azure OpenAI-t használja természetes nyelvi megértésre, és az Azure AI Search-t az adatok lekérésére.
- **Biztonság:** A Microsoft Entra ID-val integrálódik hitelesítéshez, és a legkisebb jogosultság elvét alkalmazza az erőforrásokra.
- **Telepítés:** Támogatja az Azure Container Apps-re történő telepítést a skálázhatóság és üzemeltetési hatékonyság érdekében.

## Eredmények és hatás
- Bemutatja, hogyan lehet az MCP-t használni több AI ügynök összehangolására valós, éles környezetben.
- Felgyorsítja a megoldásfejlesztést újrahasznosítható mintákkal az ügynök koordináció, adat integráció és biztonságos telepítés terén.
- Útmutatóként szolgál domain-specifikus, AI-vezérelt alkalmazások építéséhez MCP és Azure szolgáltatások használatával.

## Hivatkozások
- [Azure AI Travel Agents GitHub Tároló](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Szolgáltatás](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Mi következik

- Vissza ide: [Esettanulmányok áttekintése](./README.md)
- Következő: [ADO elemek frissítése YouTube-ról](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ezt a dokumentumot a [Co-op Translator](https://github.com/Azure/co-op-translator) AI fordító szolgáltatással fordítottuk le. Bár igyekszünk a pontosságra, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvű változata tekintendő hiteles forrásnak. Fontos információk esetén javasolt a szakmai, emberi fordítás igénybevétele. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->