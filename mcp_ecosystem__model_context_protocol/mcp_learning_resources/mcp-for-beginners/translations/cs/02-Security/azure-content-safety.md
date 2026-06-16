# Pokročilá bezpečnost MCP s Azure Content Safety

> **Řešené riziko OWASP MCP**: [MCP06 - Zneužití toku záměrů](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety nabízí několik výkonných nástrojů, které mohou posílit zabezpečení vašich implementací MCP. Pro praktické zkušenosti s implementací si prohlédněte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

AI Prompt Shields od Microsoftu poskytují robustní ochranu proti přímým i nepřímým útokům typu prompt injection díky:

1. **Pokročilé detekci**: Využívá strojové učení k identifikaci škodlivých instrukcí vložených do obsahu.
2. **Zvýraznění (Spotlighting)**: Transformuje vstupní text, aby AI systémy rozlišily platné instrukce od externích vstupů.
3. **Ohraničení a označení dat (Delimiters and Datamarking)**: Označuje hranice mezi důvěryhodnými a nedůvěryhodnými daty.
4. **Integraci s Content Safety**: Spolupracuje s Azure AI Content Safety pro detekci pokusů o jailbreak a škodlivého obsahu.
5. **Průběžné aktualizace**: Microsoft pravidelně aktualizuje ochranné mechanismy proti nově vznikajícím hrozbám.

## Implementace Azure Content Safety s MCP

Tento přístup poskytuje vícestupňovou ochranu:
- Skenování vstupů před zpracováním
- Validaci výstupů před vrácením
- Používání blokovacích seznamů pro známé škodlivé vzory
- Využití neustále aktualizovaných modelů Content Safety Azure

## Zdroje pro Azure Content Safety

Chcete-li se dozvědět více o implementaci Azure Content Safety na vašich MCP serverech, využijte tyto oficiální zdroje:

1. [Dokumentace Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Oficiální dokumentace Azure Content Safety.
2. [Dokumentace Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Naučte se, jak zabránit útokům typu prompt injection.
3. [Reference API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Podrobná reference API pro implementaci Content Safety.
4. [Rychlý start: Azure Content Safety s C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Rychlý průvodce implementací pomocí C#.
5. [Knihovny klienta Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Knihovny klienta pro různé programovací jazyky.
6. [Detekce pokusů o jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specifické pokyny k detekci a prevenci pokusů o jailbreak.
7. [Nejlepší postupy pro Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Nejlepší postupy pro efektivní implementaci content safety.

Pro podrobnější implementaci si přečtěte náš [Průvodce implementací Azure Content Safety](./azure-content-safety-implementation.md).

## Co dál

- Číst: [Implementace Azure Content Safety](./azure-content-safety-implementation.md)
- Návrat na: [Přehled bezpečnostního modulu](./README.md)
- Pokračovat na: [Modul 3: Začínáme](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->