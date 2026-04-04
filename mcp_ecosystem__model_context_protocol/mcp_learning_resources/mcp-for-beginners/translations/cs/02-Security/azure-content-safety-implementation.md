# Implementace Azure Content Safety s MCP

> **Řešené riziko OWASP MCP**: [MCP06 - Prompt Injection přes kontextové payloady](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Pro posílení bezpečnosti MCP proti prompt injection, otrávení nástrojů a dalším specifickým zranitelnostem AI se doporučuje integrace Azure Content Safety. Tento implementační průvodce je v souladu s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integrace s MCP Serverem

Pro integraci Azure Content Safety s vaším MCP serverem přidejte content safety filtr jako middleware do vašeho pipeline zpracování požadavků:

1. Inicializujte filtr při spuštění serveru
2. Ověřte všechny příchozí požadavky nástrojů před jejich zpracováním
3. Zkontrolujte všechny odcházející odpovědi před jejich návratem klientům
4. Protokolujte a upozorňujte na bezpečnostní porušení
5. Implementujte vhodné zacházení s chybami pro neúspěšné kontroly content safety

Toto poskytuje robustní ochranu proti:
- útokům prompt injection
- pokusům o otrávení nástrojů
- úniku dat pomocí škodlivých vstupů
- generování škodlivého obsahu

## Nejlepší postupy pro integraci Azure Content Safety

1. **Vlastní blokovací seznamy**: Vytvořte vlastní blokovací seznamy speciálně pro MCP injekční vzory
2. **Ladění závažnosti**: Přizpůsobte prahové hodnoty závažnosti podle vašeho konkrétního použití a tolerance rizik
3. **Komplexní pokrytí**: Aplikujte kontroly content safety na všechny vstupy i výstupy
4. **Optimalizace výkonu**: Zvažte implementaci mezipaměti pro opakované kontroly content safety
5. **Náhradní mechanismy**: Definujte jasné náhradní chování, když služby content safety nejsou dostupné
6. **Zpětná vazba uživatelům**: Poskytněte uživatelům jasnou zpětnou vazbu, když je obsah blokován kvůli bezpečnostním důvodům
7. **Nepřetržitý rozvoj**: Pravidelně aktualizujte blokovací seznamy a vzory na základě nově vznikajících hrozeb

## Další zdroje

### OWASP MCP Bezpečnostní pokyny
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Komplexní OWASP MCP Top 10 s implementací Azure
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detailní vzory pro zmírnění prompt injection
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Praktický Camp 3: I/O Security pokrývá content safety

### Dokumentace Azure
- [Přehled Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Dokumentace Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Rychlý start Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Co dál

- Návrat na: [Přehled modulu zabezpečení](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zřeknutí se odpovědnosti**:  
Tento dokument byl přeložen pomocí automatické překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za závazný zdroj. Pro důležité informace se doporučuje využít profesionální lidský překlad. Nejsme odpovědni za jakékoliv nedorozumění či mylné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->