# Generátor studijního plánu s Chainlit & Microsoft Learn Docs MCP

## Požadavky

- Python 3.8 nebo vyšší
- pip (správce balíčků Pythonu)
- Připojení k internetu pro spojení se serverem Microsoft Learn Docs MCP

## Instalace

1. Naklonujte tento repozitář nebo stáhněte soubory projektu.
2. Nainstalujte požadované závislosti:

   ```bash
   pip install -r requirements.txt
   ```

## Použití

### Scénář 1: Jednoduchý dotaz na Docs MCP
Příkazový klient, který se připojí ke serveru Docs MCP, odešle dotaz a vytiskne výsledek.

1. Spusťte skript:
   ```bash
   python scenario1.py
   ```
2. Zadejte svůj dotaz týkající se dokumentace na výzvu.

### Scénář 2: Generátor studijního plánu (Chainlit webová aplikace)
Webové rozhraní (používající Chainlit), které umožňuje uživatelům vygenerovat personalizovaný týdenní studijní plán pro jakékoliv technické téma.

1. Spusťte aplikaci Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Otevřete lokální URL zobrazenou v terminálu (např. http://localhost:8000) ve svém prohlížeči.
3. V chatu zadejte své studijní téma a počet týdnů, po které chcete studovat (např. „AI-900 certifikace, 8 týdnů“).
4. Aplikace odpoví týdenním studijním plánem včetně odkazů na relevantní dokumentaci Microsoft Learn.

**Požadované proměnné prostředí:**

Pro použití scénáře 2 (Chainlit webová aplikace s Azure OpenAI) musíte nastavit následující proměnné prostředí v souboru `.env` ve složce `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Vyplňte tyto hodnoty s detaily vašeho Azure OpenAI zdroje před spuštěním aplikace.

> [!TIP]
> Můžete snadno nasadit vlastní modely pomocí [Microsoft Foundry](https://ai.azure.com/).

### Scénář 3: Dokumentace v editoru s MCP serverem ve VS Code

Místo přepínání záložek pro hledání dokumentace můžete přinést Microsoft Learn Docs přímo do VS Code pomocí MCP serveru. To vám umožní:
- Vyhledávat a číst dokumentaci uvnitř VS Code bez opuštění vývojového prostředí.
- Odkazovat na dokumentaci a vkládat odkazy přímo do svých README nebo souborů kurzu.
- Používat GitHub Copilot a MCP společně pro plynulý, AI podporovaný pracovní tok dokumentace.

**Příklady využití:**
- Rychle přidat odkazy na reference do README při psaní dokumentace kurzu nebo projektu.
- Použít Copilot pro generování kódu a MCP pro okamžité vyhledání a citování relevantní dokumentace.
- Soustředit se přímo v editoru a zvýšit produktivitu.

> [!IMPORTANT]
> Ujistěte se, že máte ve svém pracovním prostoru platný [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) konfigurační soubor (umístění je `.vscode/mcp.json`).

## Proč Chainlit pro scénář 2?

Chainlit je moderní open-source framework pro tvorbu konverzačních webových aplikací. Umožňuje snadno vytvářet uživatelská rozhraní na bázi chatu, která se připojují k backendovým službám, jako je Microsoft Learn Docs MCP server. Tento projekt používá Chainlit k jednoduchému, interaktivnímu způsobu generování personalizovaných studijních plánů v reálném čase. Díky Chainlit můžete rychle vytvářet a nasazovat chatové nástroje, které zlepšují produktivitu a učení.

## Co toto dělá

Tato aplikace umožňuje uživatelům vytvořit personalizovaný studijní plán jednoduše zadáním tématu a délky studia. Aplikace analyzuje váš vstup, dotazuje se serveru Microsoft Learn Docs MCP na relevantní obsah a organizuje výsledky do strukturovaného týdenního plánu. Doporučení pro každý týden jsou zobrazena v chatu, což usnadňuje sledovat pokrok. Integrace zaručuje, že vždy získáte nejnovější a nejrelevantnější vzdělávací zdroje.

## Ukázkové dotazy

Vyzkoušejte tyto dotazy v chatovém okně a podívejte se, jak aplikace reaguje:

- `AI-900 certifikace, 8 týdnů`
- `Naučit se Azure Functions, 4 týdny`
- `Azure DevOps, 6 týdnů`
- `Datové inženýrství na Azure, 10 týdnů`
- `Základy Microsoft bezpečnosti, 5 týdnů`
- `Power Platform, 7 týdnů`
- `Azure AI služby, 12 týdnů`
- `Cloudová architektura, 9 týdnů`

Tyto příklady ukazují flexibilitu aplikace pro různé cíle a délky studia.

## Reference

- [Chainlit dokumentace](https://docs.chainlit.io/)
- [MCP dokumentace](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->