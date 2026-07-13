# Haladó Témák az MCP-ben

[![Haladó MCP: Biztonságos, skálázható és multimodális AI ügynökök](../../../translated_images/hu/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Kattints a fenti képre a leckevideó megtekintéséhez)_

Ez a fejezet számos haladó témát tárgyal a Model Context Protocol (MCP) megvalósításában, beleértve a multimodális integrációt, a skálázhatóságot, a biztonsági bevált gyakorlatokat és a vállalati integrációt. Ezek a témák kulcsfontosságúak ahhoz, hogy megbízható és éles környezetben használható MCP alkalmazásokat építsünk, amelyek képesek megfelelni a modern AI rendszerek igényeinek.

## Áttekintés

Ez a lecke a Model Context Protocol megvalósításának haladó koncepcióit vizsgálja, különösen a multimodális integrációra, a skálázhatóságra, a biztonsági bevált gyakorlatokra és a vállalati integrációra összpontosítva. Ezek a témák elengedhetetlenek a gyártási szintű MCP alkalmazások építéséhez, amelyek képesek kezelni az összetett vállalati igényeket.

> **Előre tekintve:** az alábbi témák többségét érinti a `2026-07-28` MCP specifikáció kiadási jelöltje — a Root Contexts (5.4) és a Sampling (5.6) olyan primitívekre épülnek, amelyeket a kiadási jelölt „elavultként” jelöl meg, az experimentális Tasks funkció, amely a Protocol Features (5.16) fejezetben szerepel, különálló Tasks bővítménybe kerül. Részletekért lásd a [Mi változik az MCP-ben: A 2026-07-28 kiadási jelölt](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) dokumentumot.

## Tanulási célok

A lecke végére képes leszel:

- Multimodális képességek megvalósítása az MCP keretrendszerekben
- Skálázható MCP architektúrák tervezése magas igényű forgatókönyvekhez
- Biztonsági bevált gyakorlatok alkalmazása az MCP biztonsági elveivel összhangban
- MCP integrálása vállalati AI rendszerekkel és keretrendszerekkel
- Teljesítmény és megbízhatóság optimalizálása éles környezetben

## Leckék és mintaprojektek

| Link | Cím | Leírás |
|------|-------|-------------|
| [5.1 Integráció az Azure-ral](./mcp-integration/README.md) | Integráció az Azure-ral | Tanuld meg, hogyan integráld az MCP szerveredet az Azure-on |
| [5.2 Multimodális minta](./mcp-multi-modality/README.md) | MCP multimodális minták  | Minták hang, kép és multimodális válaszokhoz |
| [5.3 MCP OAuth2 minta](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demó | Minimális Spring Boot alkalmazás OAuth2-vel az MCP-ben, mint Authorization és Resource Server. Biztonságos token kibocsátást, védett végpontokat, Azure Container Apps telepítést és API kezelés integrációját mutatja be. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root kontextusok | Tudj meg többet a root kontextusról és annak megvalósításáról |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Ismerd meg a különböző típusú útválasztást |
| [5.6 Sampling](./mcp-sampling/README.md) | Mintavételezés | Tanuld meg, hogyan dolgozz mintavételezéssel |
| [5.7 Skálázás](./mcp-scaling/README.md) | Skálázás  | Ismerd meg a skálázást |
| [5.8 Biztonság](./mcp-security/README.md) | Biztonság  | Biztonságossá tedd az MCP szerveredet |
| [5.9 Webkereső minta](./web-search-mcp/README.md) | Webkereső MCP | Python MCP szerver és kliens, amely integrálja a SerpAPI-t valós idejű web, hír, termékkereséshez és Q&A-hoz. Bemutatja a többeszközös koordinációt, külső API integrációt és robosztus hibakezelést. |
| [5.10 Valós idejű streaming](./mcp-realtimestreaming/README.md) | Streaming  | A valós idejű adatstreaming a mai adatközpontú világban elengedhetetlen, ahol a vállalkozások és alkalmazások azonnali hozzáférést igényelnek az információkhoz, hogy időszerű döntéseket hozzanak.|
| [5.11 Valós idejű webkeresés](./mcp-realtimesearch/README.md) | Webkeresés | Valós idejű webkeresés - hogyan alakítja az MCP a valós idejű webkeresést a kontextuskezelés szabványosításával az AI modellek, keresőmotorok és alkalmazások között.| 
| [5.12 Entra ID hitelesítés Model Context Protocol szerverekhez](./mcp-security-entra/README.md) | Entra ID hitelesítés | A Microsoft Entra ID egy robusztus felhőalapú identitás- és hozzáféréskezelési megoldást nyújt, amely biztosítja, hogy csak jogosult felhasználók és alkalmazások kommunikálhassanak az MCP szervereddel.|
| [5.13 Microsoft Foundry ügynök integráció](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integráció | Tanuld meg, hogyan integráld az MCP szervereket a Microsoft Foundry ügynökökkel, lehetővé téve az erőteljes eszközkoordinációt és a vállalati AI képességeket egységesített külső adatforrás kapcsolatokkal.|
| [5.14 Kontextusmérnökség](./mcp-contextengineering/README.md) | Kontextusmérnökség | A MCP szerverekhez kapcsolódó kontextusmérnökségi technikák jövőbeli lehetőségei, beleértve a kontextus optimalizálást, dinamikus kontextuskezelést és hatékony prompt mérnökségi stratégiákat az MCP keretrendszerekben.|
| [5.15 MCP egyedi szállítás](./mcp-transport/README.md) | Egyedi szállítás | Tanuld meg, hogyan valósíts meg egyedi szállítási mechanizmusokat speciális MCP kommunikációs forgatókönyvekhez.|
| [5.16 Protokoll tulajdonságok mélyrehatóan](./mcp-protocol-features/README.md) | Protokoll tulajdonságok | Sajátítsd el a fejlett protokoll tulajdonságokat, mint a folyamatjelzések, kérés visszavonása, erőforrás sablonok és hibakezelési minták.|
| [5.17 Adverzárius többügynökös érvelés](./mcp-adversarial-agents/README.md) | Adverzárius ügynökök | Használj két ellentétes álláspontú ügynököt, akik egyetlen MCP eszközkészletet osztanak meg, hogy kiszűrjék a hallucinációkat, felszínre hozzák a szélsőséges eseteket és jobban kalibrált kimeneteket produkáljanak strukturált vitán keresztül.|

> **Újdonság az MCP Specifikációban 2025-11-25-től**: A specifikáció immár tartalmazza az eksperimentális támogatást a **Feladatokhoz** (hosszú ideig tartó műveletek folyamatkövetéssel), **Eszköz megjegyzésekhez** (metaadatok az eszköz viselkedéséről a biztonság érdekében), **URL mód elicitaláshoz** (kliens oldali specifikus URL tartalom lekérése), valamint továbbfejlesztett **Root-ok** (munkaterület kontextuskezeléshez). Részletekért lásd az [MCP specifikáció változásnaplóját](https://spec.modelcontextprotocol.io/).

## További hivatkozások

A legfrissebb információkért haladó MCP témákban, tekintsd meg:
- [MCP dokumentáció](https://modelcontextprotocol.io/)
- [MCP specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tárhely](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági kockázatok és enyhítések
- [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági képzés

## Főbb tanulságok

- A multimodális MCP megvalósítások kibővítik az AI képességeket a szöveges feldolgozáson túl
- A skálázhatóság elengedhetetlen a vállalati telepítésekhez, és vízszintes és függőleges skálázással érhető el
- Átfogó biztonsági intézkedések védik az adatokat és biztosítják a megfelelő hozzáférés-ellenőrzést
- Vállalati integráció olyan platformokkal, mint az Azure OpenAI és a Microsoft AI Foundry, fokozza az MCP képességeket
- A haladó MCP megvalósítások optimalizált architektúrákból és gondos erőforrás-kezelésből profitálnak

## Gyakorlat

Tervezzen egy vállalati szintű MCP megvalósítást egy konkrét felhasználási esethez:

1. Határozza meg a multimodális követelményeket az adott felhasználási esetben
2. Vázolja fel a védelmi intézkedéseket a érzékeny adatok védelmére
3. Tervezzen skálázható architektúrát, amely képes kezelni a változó terhelést
4. Tervezze meg az integrációs pontokat vállalati AI rendszerekkel
5. Dokumentálja a lehetséges teljesítménybeli akadályokat és azok enyhítési stratégiáit

## További források

- [Azure OpenAI dokumentáció](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentáció](https://learn.microsoft.com/en-us/ai-services/)

---

## Mi következik

Fedezd fel a modul leckéit az alábbi kezdőponttal: [5.1 MCP integráció](./mcp-integration/README.md)

Miután befejezted ezt a modult, folytasd a [6. modul: Közösségi hozzájárulások](../06-CommunityContributions/README.md) anyagával

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->