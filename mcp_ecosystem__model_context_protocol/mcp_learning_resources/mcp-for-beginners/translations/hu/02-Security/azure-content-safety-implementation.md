# Azure Content Safety megvalósítása MCP-vel

> **OWASP MCP kockázat kezelve**: [MCP06 - Szándék folyamat megkerülése](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Az MCP biztonságának erősítése érdekében a prompt injekció, az eszközmérgezés és más mesterséges intelligenciára jellemző sérülékenységek ellen az Azure Content Safety integrálása erősen ajánlott. Ez a megvalósítási útmutató összhangban van a [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 3. táborával: I/O biztonság.

## MCP szerverrel való integráció

Az Azure Content Safety MCP szerverbe történő integrálásához adja hozzá a tartalombiztonsági szűrőt middleware-ként a kérések feldolgozási csővezetéke során:

1. Inicializálja a szűrőt a szerver indításakor
2. Érvényesítsen minden bejövő eszközkérést feldolgozás előtt
3. Ellenőrizze az összes kimenő választ mielőtt visszaküldené az ügyfeleknek
4. Naplózza és jelezze a biztonsági megsértéseket
5. Valósítson meg megfelelő hibakezelést a sikertelen tartalombiztonsági ellenőrzések esetén

Ez erős védelmet nyújt a következők ellen:
- Prompt injekciós támadások
- Eszközmérgezési kísérletek
- Adatkiszivárgás rosszindulatú bemenetek révén
- Ártalmas tartalom generálása

## Legjobb gyakorlatok az Azure Content Safety integrációjához

1. **Egyedi tiltólisták**: Készítsen egyedi blokkolólistákat kifejezetten az MCP injekciós mintákhoz
2. **Súlyosság hangolása**: Állítsa be a súlyossági küszöbértékeket az adott használati eset és a kockázattűrés alapján
3. **Átfogó lefedettség**: Alkalmazzon tartalombiztonsági ellenőrzéseket minden bemenetre és kimenetre
4. **Teljesítmény optimalizálás**: Fontolja meg a gyorsítótárazás megvalósítását a gyakran ismétlődő tartalombiztonsági ellenőrzésekhez
5. **Visszaesés kezelése**: Határozzon meg világos visszaesési viselkedéseket, ha a tartalombiztonsági szolgáltatások nem érhetők el
6. **Felhasználói visszajelzés**: Nyújtson egyértelmű visszajelzést a felhasználóknak, amikor a tartalom biztonsági okokból blokkolva van
7. **Folyamatos fejlesztés**: Rendszeresen frissítse a tiltólistákat és mintákat a felmerülő fenyegetések alapján

## További források

### OWASP MCP biztonsági útmutató
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Átfogó OWASP MCP Top 10 Azure megvalósítással
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Részletes prompt injekció elleni minták
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Gyakorlati 3. tábor: I/O biztonság lefedi a tartalombiztonságot

### Azure dokumentáció
- [Azure Content Safety áttekintés](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields dokumentáció](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Mi következik

- Visszatérés: [Security Module Overview](./README.md)
- Folytatás: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->