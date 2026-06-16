# Implementace Azure Content Safety s MCP

> **OWASP MCP řešené riziko**: [MCP06 - Zneužití průtoku záměrů (Intent Flow Subversion)](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pro posílení bezpečnosti MCP proti injektáži výzev, otravování nástrojů a dalším specifickým zranitelnostem AI se důrazně doporučuje integrace Azure Content Safety. Tento průvodce implementací je v souladu s workshopem [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integrace s MCP serverem

Pro integraci Azure Content Safety s vaším MCP serverem přidejte filtr bezpečnosti obsahu jako middleware do pipeline zpracování požadavků:

1. Inicializujte filtr při spuštění serveru
2. Validujte všechny přicházející požadavky nástrojů před zpracováním
3. Kontrolujte všechny odchozí odpovědi před jejich vrácením klientům
4. Logujte a upozorňujte na porušení bezpečnosti
5. Implementujte vhodnou obsluhu chyb pro selhání kontrol obsahu

Tím zajistíte robustní obranu proti:
- útokům injektáží výzev
- pokusům o otrávení nástrojů
- úniku dat prostřednictvím škodlivých vstupů
- generování škodlivého obsahu

## Nejlepší postupy pro integraci Azure Content Safety

1. **Vlastní seznamy blokovaných vzorů**: Vytvořte vlastní blokovací seznamy specificky pro MCP injekční vzory
2. **Ladění závažnosti**: Nastavte prahové hodnoty závažnosti podle konkrétního použití a tolerance rizika
3. **Komplexní pokrytí**: Aplikujte kontroly bezpečnosti obsahu na všechny vstupy i výstupy
4. **Optimalizace výkonu**: Zvažte implementaci cachování opakovaných kontrol bezpečnosti obsahu
5. **Nouzové mechanismy**: Definujte jasné nouzové chování, když služby bezpečnosti obsahu nejsou dostupné
6. **Zpětná vazba uživatelům**: Poskytujte jasnou zpětnou vazbu uživatelům, pokud je obsah zablokován z bezpečnostních důvodů
7. **Průběžné zlepšování**: Pravidelně aktualizujte blokovací seznamy a vzory na základě nových hrozeb

## Další zdroje

### OWASP MCP bezpečnostní doporučení
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s implementací Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Podrobné vzory mitigace injektáže výzev
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktický Camp 3: I/O Security pokrývá bezpečnost obsahu

### Dokumentace Azure
- [Přehled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentace Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Rychlý start Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Co dál

- Návrat na: [Přehled modulu bezpečnosti](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->