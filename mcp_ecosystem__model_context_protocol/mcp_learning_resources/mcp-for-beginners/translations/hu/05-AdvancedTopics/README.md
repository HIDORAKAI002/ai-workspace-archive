# Haladó témák az MCP-ben

[![Haladó MCP: Biztonságos, skálázható és multimodális AI ügynökök](../../../translated_images/hu/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(A fenti képre kattintva megtekintheti az óra videóját)_

Ez a fejezet a Model Context Protocol (MCP) megvalósításának számos haladó témáját öleli fel, beleértve a multimodális integrációt, a skálázhatóságot, a biztonsági legjobb gyakorlatokat és a vállalati integrációt. Ezek a témák alapvetőek olyan robusztus és éles környezetre kész MCP alkalmazások építéséhez, amelyek megfelelnek a modern AI rendszerek követelményeinek.

## Áttekintés

Ez az óra az MCP megvalósításának haladó koncepcióit vizsgálja, különös tekintettel a multimodális integrációra, a skálázhatóságra, a biztonsági legjobb gyakorlatokra és a vállalati integrációra. Ezek a témák elengedhetetlenek olyan termelési szintű MCP alkalmazások építéséhez, amelyek képesek kezelni a vállalati környezetek komplex követelményeit.

> **Előretekintés:** az alábbi néhány témát érinti az MCP `2026-07-28` specifikációs jelölt verziója — a Root Contexts (5.4) és a Sampling (5.6) olyan primitíveken alapulnak, amelyeket a jelölt verzió elavultnak jelöl, az Protocol Features (5.16) hivatkozott kísérleti Tasks funkció pedig egy dedikált Tasks kiterjesztésbe költözik. Részletekért lásd a [Mi változik az MCP-ben: 2026-07-28 jelölt verzió](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) című dokumentumot.

## Tanulási célok

A lecke végére képes leszel:

- Multi-modális képességek megvalósítása MCP keretrendszereken belül
- Skálázható MCP architektúrák tervezése nagy terhelésű helyzetekhez
- Biztonsági legjobb gyakorlatok alkalmazása az MCP biztonsági elveinek megfelelően
- MCP integrálása vállalati AI rendszerekkel és keretrendszerekkel
- Teljesítmény és megbízhatóság optimalizálása éles környezetben

## Leckék és mintaprojektek

| Link | Cím | Leírás |
|------|-------|-------------|
| [5.1 Integráció az Azure-rel](./mcp-integration/README.md) | Integráció az Azure-rel | Ismerd meg, hogyan integrálhatod az MCP szerveredet az Azure-on |
| [5.2 Multimodális minta](./mcp-multi-modality/README.md) | MCP multimodális minták | Minták hang, kép és multimodális válaszokra |
| [5.3 MCP OAuth2 minta](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demó | Minimális Spring Boot alkalmazás, amely bemutatja az OAuth2 használatát MCP-vel, mind mint Engedélyező, mind mint Erőforrás szerver. Bemutatja a biztonságos token kibocsátást, védett végpontokat, Azure Container Apps telepítést és API-kezelési integrációt. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root kontextusok | Ismerd meg jobban a root kontextust és annak megvalósítását (`2026-07-28` jelölt verzióban elavult; `2025-11-25` verzióig érvényes) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Ismerd meg a routing különböző típusait |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Ismerd meg a sampling használatát (`2026-07-28` jelölt verzióban elavult; `2025-11-25` verzióig érvényes) |
| [5.7 Skálázás](./mcp-scaling/README.md) | Skálázás | Ismerd meg a skálázást |
| [5.8 Biztonság](./mcp-security/README.md) | Biztonság | Biztosítsd az MCP szervered |
| [5.9 Web keresés minta](./web-search-mcp/README.md) | Web kereső MCP | Python MCP szerver és kliens, amely integrálja a SerpAPI-t valós idejű web, hírek, termék keresés és kérdések-válaszok számára. Bemutatja a multimodális eszközök koordinációját, külső API integrációt és robusztus hibakezelést. |
| [5.10 Valós idejű streaming](./mcp-realtimestreaming/README.md) | Streaming | A valós idejű adatstreaming fontossá vált a mai adatvezérelt világban, ahol a vállalkozásoknak és alkalmazásoknak azonnali hozzáférésre van szükségük az információkhoz a gyors döntéshozatalhoz.|
| [5.11 Valós idejű web keresés](./mcp-realtimesearch/README.md) | Web keresés | Valós idejű web keresés: hogyan alakítja át az MCP a valós idejű web keresést egy egységes megközelítéssel a kontextuskezelésben AI modellek, keresőmotorok és alkalmazások között.| 
| [5.12 Entra ID hitelesítés Model Context Protocol szerverekhez](./mcp-security-entra/README.md) | Entra ID hitelesítés | A Microsoft Entra ID egy robusztus felhőalapú identitás- és hozzáféréskezelési megoldást kínál, amely segít biztosítani, hogy csak jogosult felhasználók és alkalmazások férhessenek hozzá az MCP szerveredhez.|
| [5.13 Microsoft Foundry ügynök integráció](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry integráció | Ismerd meg, hogyan integrálhatók az MCP szerverek a Microsoft Foundry ügynökeivel, lehetővé téve hatékony eszközkoordinációt és vállalati AI képességeket szabványosított külső adatforrás-kapcsolatokkal.|
| [5.14 Kontextusmérnökség](./mcp-contextengineering/README.md) | Kontextusmérnökség | A kontextusmérnökségi technikák jövőbeni lehetőségei MCP szerverek számára, beleértve a kontextus optimalizálást, dinamikus kontextuskezelést és hatékony prompttervezési stratégiákat MCP keretrendszereken belül.|
| [5.15 Egyedi szállítás MCP-hez](./mcp-transport/README.md) | Egyedi szállítás | Tanuld meg, hogyan valósíthatsz meg egyedi szállítási mechanizmusokat speciális MCP kommunikációs helyzetekhez.|
| [5.16 Protokoll funkciók mélyrehatóan](./mcp-protocol-features/README.md) | Protokoll funkciók | Sajátítsd el a haladó protokoll funkciókat, beleértve az előrehaladási értesítéseket, lekérdezés törlést, erőforrás sablonokat és hibakezelési mintákat.|
| [5.17 Versengő többügynökös érvelés](./mcp-adversarial-agents/README.md) | Versengő ügynökök | Két ellentétes álláspontú ügynök használata ugyanazzal az MCP eszközkészlettel, hogy kiszűrjék a téves információkat, feltárják a szélsőséges eseteket és jobb kalibrált eredményeket érjenek el strukturált vitán keresztül.|

> **Újdonság az MCP 2025-11-25 specifikációban**: A specifikáció most kísérleti támogatást tartalmaz a **Tasks** (hosszú futamidejű műveletek előrehaladás-követéssel), **Tool Annotations** (eszköz viselkedésének metainformációi a biztonság érdekében), **URL Mode Elicitation** (kliensből konkrét URL tartalom kérése) és továbbfejlesztett **Roots** (munkaterület kontextuskezeléshez) tekintetében. Részletekért lásd az [MCP specifikáció változásnaplóját](https://spec.modelcontextprotocol.io/).

## További hivatkozások

A legfrissebb információkért haladó MCP témákban lásd:
- [MCP dokumentáció](https://modelcontextprotocol.io/)
- [MCP specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tároló](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági kockázatok és enyhítések
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági képzés

## Főbb tanulságok

- A multimodális MCP megvalósítások kiterjesztik az AI képességeit a szövegfeldolgozáson túl
- A skálázhatóság alapvető a vállalati telepítéseknél, és vízszintes és függőleges skálázással kezelhető
- Átfogó biztonsági intézkedések védik az adatokat és biztosítják a megfelelő hozzáférési kontrollt
- A vállalati integráció Azure OpenAI-val és Microsoft AI Foundry-val fokozza az MCP lehetőségeit
- Haladó MCP megvalósítások előnyösek optimalizált architektúrákból és gondos erőforrás-kezelésből

## Gyakorlat

Tervezzen egy vállalati szintű MCP megvalósítást egy konkrét használati esethez:

1. Azonosítsa a multimodális követelményeket az adott használati esethez
2. Vázolja fel a biztonsági ellenőrzéseket a kényes adatok védelmére
3. Tervezzen skálázható architektúrát, amely kezeli a változó terhelést
4. Tervezze meg az integrációs pontokat a vállalati AI rendszerekkel
5. Dokumentálja a potenciális teljesítménybeli szűk keresztmetszeteket és az enyhítési stratégiákat

## További források

- [Azure OpenAI dokumentáció](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentáció](https://learn.microsoft.com/en-us/ai-services/)

---

## Mi jön ezután

Fedezd fel a modul leckéit az alábbi kezdőponttal: [5.1 MCP integráció](./mcp-integration/README.md)

Miután befejezted ezt a modult, folytasd a következővel: [6. modul: Közösségi hozzájárulások](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->