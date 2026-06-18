# Weather MCP Server

Toto je ukázkový MCP Server v Pythonu implementující nástroje pro počasí s modelovými odpověďmi. Může být použit jako kostra pro váš vlastní MCP Server. Obsahuje následující funkce:

- **Nástroj pro počasí**: Nástroj, který poskytuje modelované informace o počasí na základě dané lokality.
- **Připojení k Agent Builderu**: Funkce, která umožňuje připojit MCP server k Agent Builderu pro testování a ladění.
- **Ladění v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkce, která umožňuje ladit MCP Server pomocí MCP Inspectoru.

## Začněte s šablonou Weather MCP Serveru

> **Předpoklady**
>
> Pro spuštění MCP Serveru na vašem lokálním vývojovém počítači budete potřebovat:
>
> - [Python](https://www.python.org/)
> - (*Volitelné - pokud preferujete uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Připravte prostředí

Existují dva přístupy k nastavení prostředí pro tento projekt. Můžete si zvolit kterýkoliv podle své preference.

> Poznámka: Po vytvoření virtuálního prostředí si znovu načtěte VSCode nebo terminál, aby se použil Python z virtuálního prostředí.

| Přístup | Kroky |
| -------- | ----- |
| Použití `uv` | 1. Vytvořte virtuální prostředí: `uv venv` <br>2. Spusťte příkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvořeného virtuálního prostředí <br>3. Nainstalujte závislosti (včetně vývojových): `uv pip install -r pyproject.toml --extra dev` |
| Použití `pip` | 1. Vytvořte virtuální prostředí: `python -m venv .venv` <br>2. Spusťte příkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvořeného virtuálního prostředí<br>3. Nainstalujte závislosti (včetně vývojových): `pip install -e .[dev]` | 

Po nastavení prostředí můžete spustit server na vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klient, abyste mohli začít:
1. Otevřete panel ladění ve VS Code. Vyberte `Debug in Agent Builder` nebo stiskněte `F5` pro spuštění ladění MCP serveru.
2. Použijte Microsoft Foundry Toolkit Agent Builder k testování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builderu.
3. Klikněte na `Run` pro otestování serveru s promptem.

**Gratulujeme**! Úspěšně jste spustili Weather MCP Server na vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co šablona obsahuje

| Složka / Soubor | Obsah                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Soubory VSCode pro ladění                   |
| `.aitk`      | Konfigurace pro Microsoft Foundry Toolkit                |
| `src`        | Zdrojový kód pro weather mcp server   |

## Jak ladit Weather MCP Server

> Poznámky:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizuální vývojářský nástroj pro testování a ladění MCP serverů.
> - Všechny režimy ladění podporují zarážky, takže můžete přidávat zarážky do kódu implementace nástroje.

| Režim ladění | Popis | Kroky pro ladění |
| ---------- | ----------- | --------------- |
| Agent Builder | Ladění MCP serveru v Agent Builderu přes Microsoft Foundry Toolkit. | 1. Otevřete panel ladění ve VS Code. Vyberte `Debug in Agent Builder` a stiskněte `F5` pro spuštění ladění MCP serveru.<br>2. Použijte Microsoft Foundry Toolkit Agent Builder k testování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builderu.<br>3. Klikněte na `Run` pro otestování serveru s promptem. |
| MCP Inspector | Ladění MCP serveru pomocí MCP Inspectoru. | 1. Nainstalujte [Node.js](https://nodejs.org/)<br> 2. Nastavte Inspector: `cd inspector` && `npm install` <br> 3. Otevřete panel ladění ve VS Code. Vyberte `Debug SSE in Inspector (Edge)` nebo `Debug SSE in Inspector (Chrome)`. Stiskněte F5 pro spuštění ladění.<br> 4. Když se MCP Inspector spustí v prohlížeči, klikněte na tlačítko `Connect` pro připojení tohoto MCP serveru.<br> 5. Poté můžete `List Tools`, vybrat nástroj, zadat parametry a `Run Tool` pro ladění kódu serveru.<br> |

## Výchozí porty a přizpůsobení

| Režim ladění | Porty | Definice | Přizpůsobení | Poznámka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) pro změnu uvedených portů. | Není |
| MCP Inspector | 3001 (Server); 5173 a 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) pro změnu uvedených portů.| Není |

## Zpětná vazba

Pokud máte nějakou zpětnou vazbu nebo návrhy k této šabloně, otevřete prosím issue na [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->