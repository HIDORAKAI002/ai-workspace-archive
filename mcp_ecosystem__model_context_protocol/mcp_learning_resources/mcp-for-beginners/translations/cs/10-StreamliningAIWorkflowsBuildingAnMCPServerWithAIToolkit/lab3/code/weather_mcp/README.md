# Weather MCP Server

Toto je ukázkový MCP Server v Pythonu implementující nástroje pro počasí s falešnými odpověďmi. Může být použit jako základ pro váš vlastní MCP Server. Zahrnuje následující funkce:

- **Nástroj pro počasí**: Nástroj, který poskytuje simulované informace o počasí na základě zadané lokality.
- **Připojení k Agent Builderu**: Funkce, která vám umožní připojit MCP server k Agent Builderu pro testování a ladění.
- **Ladění v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkce, která vám umožní ladit MCP Server pomocí MCP Inspector.

## Začněte s šablonou Weather MCP Serveru

> **Požadavky**
>
> Pro spuštění MCP Serveru na vašem lokálním vývojovém počítači budete potřebovat:
>
> - [Python](https://www.python.org/)
> - (*Volitelné - pokud preferujete uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozšíření Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Příprava prostředí

Existují dva způsoby, jak nastavit prostředí pro tento projekt. Můžete si vybrat kterýkoli podle své preference.

> Poznámka: Po vytvoření virtuálního prostředí znovu načtěte VSCode nebo terminál, aby byl použit python z virtuálního prostředí.

| Přístup | Kroky |
| -------- | ----- |
| Použití `uv` | 1. Vytvořte virtuální prostředí: `uv venv` <br>2. Spusťte příkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvořeného virtuálního prostředí<br>3. Nainstalujte závislosti (včetně vývojových závislostí): `uv pip install -r pyproject.toml --extra dev` |
| Použití `pip` | 1. Vytvořte virtuální prostředí: `python -m venv .venv` <br>2. Spusťte příkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvořeného virtuálního prostředí<br>3. Nainstalujte závislosti (včetně vývojových závislostí): `pip install -e .[dev]` |

Po nastavení prostředí můžete server spustit na vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klient a začít:
1. Otevřete ladicí panel ve VS Code. Vyberte `Debug in Agent Builder` nebo stiskněte `F5` pro spuštění ladění MCP serveru.
2. Použijte AI Toolkit Agent Builder pro testování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builderu.
3. Klikněte na `Run` pro otestování serveru s promptem.

**Gratulujeme!** Úspěšně jste spustili Weather MCP Server na vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co je v šabloně obsaženo

| Složka / Soubor | Obsah                                      |
| --------------- | ------------------------------------------ |
| `.vscode`       | Soubory pro ladění ve VSCode                |
| `.aitk`         | Konfigurace pro AI Toolkit                  |
| `src`           | Zdrojový kód pro Weather MCP Server         |

## Jak ladit Weather MCP Server

> Poznámky:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizuální nástroj pro vývojáře k testování a ladění MCP serverů.
> - Všechny režimy ladění podporují breakpointy, takže můžete přidat breakpointy do kódu implementace nástroje.

| Režim ladění | Popis | Kroky pro ladění |
| ------------ | ----- | ----------------- |
| Agent Builder | Ladění MCP serveru v Agent Builderu přes AI Toolkit. | 1. Otevřete ladicí panel ve VS Code. Vyberte `Debug in Agent Builder` a stiskněte `F5` pro spuštění ladění MCP serveru.<br>2. Použijte AI Toolkit Agent Builder k testování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builderu.<br>3. Klikněte na `Run` pro otestování serveru s promptem. |
| MCP Inspector | Ladění MCP serveru pomocí MCP Inspector. | 1. Nainstalujte [Node.js](https://nodejs.org/)<br>2. Nastavte Inspector: `cd inspector` && `npm install` <br>3. Otevřete ladicí panel ve VS Code. Vyberte `Debug SSE in Inspector (Edge)` nebo `Debug SSE in Inspector (Chrome)`. Stiskněte F5 pro spuštění ladění.<br>4. Když se MCP Inspector spustí v prohlížeči, klikněte na tlačítko `Connect` pro připojení tohoto MCP serveru.<br>5. Poté můžete použít `List Tools`, vybrat nástroj, zadat parametry a `Run Tool` pro ladění vašeho serverového kódu.<br> |

## Výchozí porty a přizpůsobení

| Režim ladění | Porty | Definice | Přizpůsobení | Poznámka |
| ------------ | ----- | -------- | ------------ | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) pro změnu výše uvedených portů. | Není |
| MCP Inspector | 3001 (Server); 5173 a 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) pro změnu výše uvedených portů. | Není |

## Zpětná vazba

Pokud máte nějakou zpětnou vazbu nebo návrhy k této šabloně, otevřete prosím issue v [AI Toolkit GitHub repozitáři](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho rodném jazyce by měl být považován za závazný zdroj. Pro důležité informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->