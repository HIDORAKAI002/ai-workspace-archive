# Fejlett témák az MCP-ben

[![Fejlett MCP: Biztonságos, skálázható és multimodális AI agentek](../../../translated_images/hu/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kattintson a fenti képre a lecke videójának megtekintéséhez)_

Ez a fejezet a Model Context Protocol (MCP) megvalósításának fejlett témáit tárgyalja, beleértve a multimodális integrációt, a skálázhatóságot, a biztonsági legjobb gyakorlatokat és a vállalati integrációt. Ezek a témák kulcsfontosságúak a robosztus és éles környezetben használható MCP alkalmazások építéséhez, amelyek megfelelnek a modern AI rendszerek igényeinek.

## Áttekintés

Ez a lecke a Model Context Protocol megvalósításának fejlett fogalmait tárgyalja, különös tekintettel a multimodális integrációra, skálázhatóságra, biztonsági legjobb gyakorlatokra és vállalati integrációra. Ezek a témák elengedhetetlenek a gyártásra kész MCP alkalmazások építéséhez, amelyek képesek kezelni az összetett vállalati környezetek igényeit.

## Tanulási célok

A lecke végére képes lesz:

- Multimodális képességek megvalósítására MCP keretrendszerekben
- Skálázható MCP architektúrák tervezésére magas igényű helyzetekhez
- Biztonsági legjobb gyakorlatok alkalmazására az MCP biztonsági elveivel összhangban
- MCP integrálására vállalati AI rendszerekkel és keretrendszerekkel
- Teljesítmény és megbízhatóság optimalizálására éles környezetekben

## Leckék és mintaprojektek

| Link | Cím | Leírás |
|------|-------|-------------|
| [5.1 Integráció Azure-rel](./mcp-integration/README.md) | Integráció Azure-rel | Tanulja meg, hogyan integrálhatja MCP szerverét az Azure platformon |
| [5.2 Multimodális minta](./mcp-multi-modality/README.md) | MCP multimodális minták | Minták hang-, kép- és multimodális válaszokra |
| [5.3 MCP OAuth2 minta](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 bemutató | Minimális Spring Boot alkalmazás, amely az MCP OAuth2 használatát mutatja be, mind jogosultságkezelő, mind erőforrás szerverként. Megmutatja a biztonságos tokenkiadást, védett végpontokat, Azure Container Apps telepítést és API Management integrációt. |
| [5.4 Gyökérkontektszek](./mcp-root-contexts/README.md) | Gyökérkontektszek | Tudjon meg többet a gyökérkontektszekről és azok megvalósításáról |
| [5.5 Útválasztás](./mcp-routing/README.md) | Útválasztás | Tanulja meg az útválasztás különböző típusait |
| [5.6 Mintavételezés](./mcp-sampling/README.md) | Mintavételezés | Tanulja meg a mintavételezés kezelését |
| [5.7 Skálázás](./mcp-scaling/README.md) | Skálázás | Ismerje meg a skálázást |
| [5.8 Biztonság](./mcp-security/README.md) | Biztonság | Biztosítsa MCP szerverét |
| [5.9 Webkeresés MCP](./web-search-mcp/README.md) | Webkeresés MCP | Python MCP szerver és kliens, amely integrálódik a SerpAPI-vel valós idejű web-, hír-, termékkereséshez és kérdés-válasz feladatokhoz. Bemutatja több eszköz együttes használatát, külső API-k integrációját, és robosztus hibakezelést. |
| [5.10 Valós idejű streaming](./mcp-realtimestreaming/README.md) | Streaming | A valós idejű adatstreaming mára elengedhetetlenné vált a mai adatvezérelt világban, ahol a vállalatoknak és alkalmazásoknak azonnali hozzáférésre van szükségük az információkhoz a gyors döntéshozatal érdekében. |
| [5.11 Valós idejű webkeresés](./mcp-realtimesearch/README.md) | Webkeresés | A valós idejű webkeresés, hogyan alakítja át az MCP a valós idejű webkeresést azáltal, hogy szabványosított megközelítést kínál a kontextuskezeléshez AI modelleken, keresőmotorokon és alkalmazásokon át. |
| [5.12 Entra ID hitelesítés a Model Context Protocol szerverekhez](./mcp-security-entra/README.md) | Entra ID hitelesítés | A Microsoft Entra ID egy robosztus, felhőalapú azonosítás- és hozzáférés-kezelési megoldást nyújt, amely segít biztosítani, hogy csak jogosult felhasználók és alkalmazások férhessenek hozzá MCP szerveréhez. |
| [5.13 Microsoft Foundry ügynök integráció](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integráció | Tanulja meg, hogyan integrálhatja a Model Context Protocol szervereket Microsoft Foundry ügynökökkel, lehetővé téve a hatékony eszközmenedzsmentet és vállalati AI képességeket szabványosított külső adatforrás-kapcsolatokkal. |
| [5.14 Kontextus mérnökség](./mcp-contextengineering/README.md) | Kontextus mérnökség | A kontextus mérnökség technikáinak jövőbeni lehetőségei MCP szerverek számára, beleértve a kontextus optimalizálást, dinamikus kontextuskezelést és hatékony prompt mérnökség stratégiákat MCP keretrendszerekben. |
| [5.15 MCP egyedi adatátvitel](./mcp-transport/README.md) | Egyedi adatátvitel | Tanulja meg, hogyan valósíthat meg egyedi adatátviteli mechanizmusokat speciális MCP kommunikációs helyzetekhez. |
| [5.16 Protokoll funkciók mélyrehatóan](./mcp-protocol-features/README.md) | Protokoll funkciók | Sajátítsa el a fejlett protokoll funkciókat, beleértve a haladási értesítéseket, kérés törlést, erőforrás sablonokat és hibakezelési mintákat. |
| [5.17 Ellenfélként működő többügynökös érvelés](./mcp-adversarial-agents/README.md) | Ellenfélként működő ügynökök | Két, ellentétes álláspontot képviselő ügynök használata, akik megosztanak egyetlen MCP eszközkészletet a hallucinációk elkapására, szélsőséges esetek felszínre hozatalára, és jobb kalibrált kimenetek létrehozására strukturált vitán keresztül. |

> **Újdonság az MCP specifikációban 2025-11-25-től**: A specifikáció immár kísérleti támogatást tartalmaz a **Feladatokhoz** (hosszú ideig futó műveletek haladáskövetéssel), **Eszköz annotációkhoz** (eszköz viselkedési metaadatok a biztonság érdekében), **URL mód előhíváshoz** (kliensektől konkrét URL tartalom lekérése), és továbbfejlesztett **Gyökerekhez** (munkahelyi kontextuskezeléshez). Részletekért lásd a [MCP specifikáció változásnaplót](https://spec.modelcontextprotocol.io/).

## További hivatkozások

A legfrissebb információkért a fejlett MCP témákban, tekintse meg:
- [MCP dokumentáció](https://modelcontextprotocol.io/)
- [MCP specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tárhely](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági kockázatok és enyhítések
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági oktatás

## Fontos tanulságok

- A multimodális MCP megoldások kiterjesztik az AI képességeit a szövegfeldolgozáson túl
- A skálázhatóság elengedhetetlen a vállalati bevezetéseknél, melyet vízszintes és függőleges skálázással lehet megoldani
- Átfogó biztonsági intézkedések védik az adatokat és biztosítják a megfelelő hozzáférés-ellenőrzést
- A vállalati integráció olyan platformokkal, mint az Azure OpenAI és a Microsoft AI Foundry, tovább növeli az MCP képességeit
- A fejlett MCP megvalósítások előnyére válik az optimalizált architektúra és az alapos erőforrás-kezelés

## Gyakorlat

Tervezzen vállalati szintű MCP megvalósítást egy konkrét feladathoz:

1. Határozza meg a multimodális követelményeket az adott feladathoz
2. Vázolja fel a szükséges biztonsági kontrollokat az érzékeny adatok védelmére
3. Tervezzen skálázható architektúrát, amely képes kezelni a változó terhelést
4. Tervezze meg az integrációs pontokat vállalati AI rendszerekkel
5. Dokumentálja a lehetséges teljesítménybeli szűk keresztmetszeteket és a megoldási stratégiákat

## További források

- [Azure OpenAI dokumentáció](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentáció](https://learn.microsoft.com/en-us/ai-services/)

---

## Mi következik

Fedezze fel a modul leckéit ezzel a kezdettel: [5.1 MCP integráció](./mcp-integration/README.md)

Miután befejezte ezt a modult, folytassa a következővel: [6. modul: Közösségi hozzájárulások](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->