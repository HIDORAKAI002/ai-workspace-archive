# Fejlett témák az MCP-ben

[![Fejlett MCP: Biztonságos, skálázható és multimodális AI ügynökök](../../../translated_images/hu/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(A fenti képre kattintva megtekinthető a lecke videója)_

Ez a fejezet a Model Context Protocol (MCP) megvalósításának egy sor fejlett témáját fedi le, beleértve a multimodális integrációt, a skálázhatóságot, a biztonsági legjobb gyakorlatokat és a vállalati integrációt. Ezek a témák létfontosságúak robusztus és éles használatra kész MCP alkalmazások építéséhez, melyek képesek megfelelni a modern AI rendszerek igényeinek.

## Áttekintés

Ez a lecke a Model Context Protocol megvalósításának fejlett fogalmait tárgyalja, különös tekintettel a multimodális integrációra, skálázhatóságra, biztonsági legjobb gyakorlatokra és vállalati integrációra. Ezek a témák elengedhetetlenek ahhoz, hogy éles használatú MCP alkalmazásokat építhessünk, amelyek képesek kezelni az összetett követelményeket vállalati környezetben.

## Tanulási célok

A lecke végére képes leszel:

- Megvalósítani multimodális képességeket MCP keretrendszerekben
- Tervezni skálázható MCP architektúrákat magas igényű forgatókönyvekhez
- Alkalmazni a MCP biztonsági alapelveivel összhangban álló biztonsági legjobb gyakorlatokat
- Integrálni az MCP-t vállalati AI rendszerekkel és keretrendszerekkel
- Optimalizálni a teljesítményt és megbízhatóságot éles környezetekben

## Leckék és mintaprojektek

| Link | Cím | Leírás |
|------|-------|-------------|
| [5.1 Integráció az Azure-rel](./mcp-integration/README.md) | Integráció az Azure-rel | Tanuld meg, hogyan integráld az MCP szervered az Azure-rel |
| [5.2 Multimodális minta](./mcp-multi-modality/README.md) | MCP multimodális példák | Minták hangalapú, képalapú és multimodális válaszokhoz |
| [5.3 MCP OAuth2 minta](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 demó | Minimális Spring Boot alkalmazás, amely bemutatja az OAuth2 használatát MCP-vel, mind jogosultság- mind erőforrás-szerverként. Biztonságos token kibocsátást, védett végpontokat, Azure Container Apps telepítést és API menedzsment integrációt demonstrál. |
| [5.4 Gyökér kontextusok](./mcp-root-contexts/README.md) | Gyökér kontextusok | Tudj meg többet a gyökér kontextusról és annak megvalósításáról |
| [5.5 Útválasztás](./mcp-routing/README.md) | Útválasztás | Ismerd meg az útválasztás különböző típusait |
| [5.6 Mintavételezés](./mcp-sampling/README.md) | Mintavételezés | Tanuld meg, hogyan dolgozz mintavételezéssel |
| [5.7 Skálázás](./mcp-scaling/README.md) | Skálázás | Ismerd meg a skálázásról szóló tudnivalókat |
| [5.8 Biztonság](./mcp-security/README.md) | Biztonság | Biztosítsd MCP szervered |
| [5.9 Webes keresés mintapélda](./web-search-mcp/README.md) | Webes keresés MCP | Python MCP szerver és kliens, amely integrálódik a SerpAPI-val valós idejű webes, hírek, termékkeresés és K+F célokra. Többeszközös koordinációt, külső API integrációt és robusztus hibakezelést mutat be. |
| [5.10 Valós idejű adatfolyam](./mcp-realtimestreaming/README.md) | Adatfolyam | A valós idejű adatfolyam kulcsfontosságú a mai adatvezérelt világban, ahol a vállalkozások és alkalmazások azonnali hozzáférést igényelnek az információkhoz a gyors döntéshozatalhoz. |
| [5.11 Valós idejű webes keresés](./mcp-realtimesearch/README.md) | Webes keresés | A valós idejű webes keresés: hogyan alakítja át az MCP a kontextuskezelés szabványosított megközelítésével az AI modellek, keresőmotorok és alkalmazások valós idejű keresését. | 
| [5.12 Entra ID hitelesítés Model Context Protocol szerverekhez](./mcp-security-entra/README.md) | Entra ID hitelesítés | A Microsoft Entra ID egy robosztus, felhőalapú identitás- és hozzáférés-kezelési megoldás, amely segít biztosítani, hogy csak jogosult felhasználók és alkalmazások férhessenek hozzá az MCP szerveredhez. |
| [5.13 Azure AI Foundry ügynök integráció](./mcp-foundry-agent-integration/README.md) | Azure AI Foundry integráció | Tanuld meg, hogyan integráld a Model Context Protocol szervereket az Azure AI Foundry ügynökeivel, lehetővé téve erőteljes eszközkoordinációt és vállalati AI képességeket szabványosított külső adatforrás kapcsolatokkal. |
| [5.14 Kontextus tervezés](./mcp-contextengineering/README.md) | Kontextus tervezés | A jövőbeni lehetőségek a kontextus tervezés technikáiban MCP szerverek számára, beleértve a kontextus optimalizálást, dinamikus kontextuskezelést és hatékony prompt tervezési stratégiákat MCP keretrendszerekben. |
| [5.15 Egyedi adatátvitel](./mcp-transport/README.md) | Egyedi adatátvitel | Tanuld meg, hogyan valósíthatsz meg egyedi adatátviteli mechanizmusokat speciális MCP kommunikációs szcenáriókhoz. |
| [5.16 Protokoll funkciók mélyrehatóan](./mcp-protocol-features/README.md) | Protokoll funkciók | Sajátítsd el az előrehaladott protokoll funkciókat, beleértve a folyamatjelentéseket, kérés visszavonást, erőforrás sablonokat és hibakezelési mintákat. |

> **Újdonság az MCP Specifikációban 2025-11-25**: A specifikáció mostantól tartalmaz kísérleti támogatást **Feladatokhoz** (hosszú futású műveletek folyamatos állapotkövetéssel), **Eszköz megjegyzésekhez** (az eszköz viselkedésére vonatkozó metaadatok a biztonság érdekében), **URL mód kéréseket** (kliensektől konkrét URL tartalom kérését), és továbbfejlesztett **Gyökerekhez** (munkahelyi kontextuskezeléshez). Teljes részletekért lásd az [MCP Specifikáció változásnaplóját](https://spec.modelcontextprotocol.io/).

## További hivatkozások

A legfrissebb információkért az fejlett MCP témák kapcsán nézd meg:
- [MCP Dokumentáció](https://modelcontextprotocol.io/)
- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub tárhely](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági kockázatok és védekezések
- [MCP Biztonsági Csúcstalálkozó Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Gyakorlati biztonsági tréning

## Főbb tanulságok

- A multimodális MCP megvalósítások kiterjesztik az AI képességeket a szövegfeldolgozáson túl
- A skálázhatóság elengedhetetlen vállalati telepítésekhez, kezelhető vízszintes és függőleges skálázással
- Átfogó biztonsági intézkedések védik az adatokat és garantálják a megfelelő hozzáférés-ellenőrzést
- A vállalati integráció Azure OpenAI és Microsoft AI Foundry platformokkal növeli az MCP képességeit
- A fejlett MCP megvalósításokat optimalizált architektúrák és gondos erőforrás-kezelés támogatja

## Gyakorlat

Tervezzen vállalati szintű MCP megvalósítást egy konkrét felhasználási esetre:

1. Azonosítsd a multimodális követelményeket az esetedhez
2. Vázold fel a biztonsági intézkedéseket a érzékeny adatok védelmére
3. Tervezd meg a skálázható architektúrát, amely képes kezelni a változó terhelést
4. Készíts integrációs pontokat vállalati AI rendszerekkel
5. Dokumentáld a potenciális teljesítménybeli szűk keresztmetszeteket és azok enyhítési stratégiáit

## További források

- [Azure OpenAI dokumentáció](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry dokumentáció](https://learn.microsoft.com/en-us/ai-services/)

---

## Mi következik

Fedezd fel a modul leckéit az alábbi kezdéssel: [5.1 MCP integráció](./mcp-integration/README.md)

A modul elvégzése után folytasd a következővel: [6. modul: Közösségi hozzájárulások](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordító szolgáltatás [Co-op Translator](https://github.com/Azure/co-op-translator) használatával készült. Bár az igyekszünk pontos fordítást biztosítani, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti, anyanyelvű dokumentum tekinthető hiteles forrásnak. Fontos információk esetén profi, emberi fordítás igénybevétele javasolt. Nem vállalunk felelősséget az ebből a fordításból eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->