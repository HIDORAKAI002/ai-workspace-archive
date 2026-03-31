# Azure Content Safety megvalósítása MCP-vel

> **OWASP MCP kezelendő kockázat**: [MCP06 - Prompt injekció kontextuális betöltőkkel](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Az MCP biztonságának erősítése érdekében a prompt injekció, eszközmérgezés és egyéb mesterséges intelligenciára jellemző sebezhetőségek ellen az Azure Content Safety integrálása erősen ajánlott. Ez a megvalósítási útmutató összhangban áll az [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3. táborával: I/O biztonság.

## Integráció az MCP szerverrel

Az Azure Content Safety MCP szerverrel való integrálásához add hozzá a tartalombiztonsági szűrőt middleware-ként a kérelmek feldolgozási folyamatába:

1. Inicializáld a szűrőt a szerver indításakor
2. Érvényesítsd az összes bejövő eszköz-kérelmet feldolgozás előtt
3. Ellenőrizd az összes kimenő választ mielőtt visszaküldenéd az ügyfeleknek
4. Naplózd és jelentsd a biztonsági megsértéseket
5. Valósíts meg megfelelő hibakezelést az eredménytelen tartalombiztonsági ellenőrzések esetén

Ez erős védelmet nyújt a következők ellen:
- Prompt injekciós támadások
- Eszközmérgezési kísérletek
- Rosszindulatú bemeneteken keresztüli adatkiszivárgás
- Ártalmas tartalom generálása

## Azure Content Safety integráció legjobb gyakorlatai

1. **Egyedi tiltólisták**: Készíts egyedi tiltólistákat kifejezetten MCP injekciós mintákra
2. **Súlyosság hangolása**: Állítsd be a súlyossági küszöbértékeket az adott használati eset és kockázattűrés alapján
3. **Átfogó lefedettség**: Alkalmazd a tartalombiztonsági ellenőrzéseket minden bemenetre és kimenetre
4. **Teljesítmény-optimalizálás**: Gondolkodj el ismétlődő tartalombiztonsági ellenőrzések gyorsítótárazásán
5. **Tartalék mechanizmusok**: Határozz meg egyértelmű tartalék viselkedéseket, ha a tartalombiztonsági szolgáltatás nem elérhető
6. **Felhasználói visszajelzés**: Adj egyértelmű visszajelzést a felhasználóknak, ha a tartalom biztonsági okokból blokkolva lett
7. **Folyamatos fejlesztés**: Rendszeresen frissítsd a tiltólistákat és mintákat a felmerülő fenyegetések alapján

## További források

### OWASP MCP Biztonsági Útmutató
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure megvalósítással
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Részletes prompt injekció elleni minták
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Gyakorlati 3. tábor: I/O biztonság lefedi a tartalombiztonságot

### Azure Dokumentáció
- [Azure Content Safety áttekintés](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety gyorsindító](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Mi következik

- Vissza: [Security Module Overview](./README.md)
- Folytatás: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum anyanyelvű változatát tekintse illetékes forrásnak. Kritikus információk esetén javasoljuk professzionális emberi fordítás igénybevételét. Nem vállalunk felelősséget a fordítás használatából eredő félreértések vagy helytelen értelmezések miatt.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->