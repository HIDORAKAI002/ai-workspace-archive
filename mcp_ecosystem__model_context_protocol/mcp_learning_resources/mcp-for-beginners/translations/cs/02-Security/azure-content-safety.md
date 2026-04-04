# Pokročilá bezpečnost MCP s Azure Content Safety

> **Řešené riziko OWASP MCP**: [MCP06 - Injekce promptu prostřednictvím kontextových dat](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety poskytuje několik výkonných nástrojů, které mohou zvýšit bezpečnost vašich implementací MCP. Pro praktickou zkušenost s implementací viz [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Ochranné štíty promptů

AI Prompt Shields od Microsoftu poskytují robustní ochranu proti přímým i nepřímým útokům injekce promptu díky:

1. **Pokročilé detekci**: Používá strojové učení k identifikaci škodlivých instrukcí vložených do obsahu.
2. **Zdůraznění**: Přeměňuje vstupní text, aby AI systémy mohly rozlišit platné instrukce od vnějších vstupů.
3. **Oddělovačům a datovým značkám**: Označuje hranice mezi důvěryhodnými a nedůvěryhodnými daty.
4. **Integraci s Content Safety**: Pracuje s Azure AI Content Safety pro detekci pokusů o jailbreak a škodlivého obsahu.
5. **Průběžným aktualizacím**: Microsoft pravidelně aktualizuje ochranné mechanismy proti nově vznikajícím hrozbám.

## Implementace Azure Content Safety s MCP

Tento přístup poskytuje vícenásobnou ochranu:
- Skénování vstupů před zpracováním
- Validace výstupů před odesláním zpět
- Používání blokovacích seznamů pro známé škodlivé vzory
- Využití neustále aktualizovaných modelů obsahu Azure

## Zdroje Azure Content Safety

Pro více informací o implementaci Azure Content Safety se svými MCP servery konzultujte tyto oficiální zdroje:

1. [Dokumentace Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficiální dokumentace Azure Content Safety.
2. [Dokumentace Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučte se, jak zabránit útokům injekce promptu.
3. [Referenční API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Detailní API reference pro implementaci Content Safety.
4. [Rychlý start: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Rychlý průvodce implementací v C#.
5. [Klientské knihovny Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Klientské knihovny pro různé programovací jazyky.
6. [Detekce pokusů o jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifické pokyny pro detekci a prevenci pokusů o jailbreak.
7. [Nejlepší postupy pro Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Nejlepší postupy pro efektivní implementaci bezpečnosti obsahu.

Pro podrobnější implementaci viz náš [Průvodce implementací Azure Content Safety](./azure-content-safety-implementation.md).

## Co dál

- Číst: [Implementace Azure Content Safety](./azure-content-safety-implementation.md)
- Návrat na: [Přehled bezpečnostního modulu](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoliv nedorozumění nebo nesprávné výklady vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->