# Weather MCP Server

Toto je ukázkový MCP Server v Pythonu, který implementuje nástroje pro počasí s falešnými odpověďmi. Může být použit jako základ pro vlastní MCP Server. Obsahuje následující funkce:

- **Weather Tool**: Nástroj, který poskytuje falešné informace o počasí na základě zadané lokace.
- **Git Clone Tool**: Nástroj, který klonuje git repozitář do specifikované složky.
- **VS Code Open Tool**: Nástroj, který otevírá složku ve VS Code nebo VS Code Insiders.
- **Připojení k Agent Builder**: Funkce, která umožňuje připojit MCP server k Agent Builder pro testování a ladění.
- **Ladění v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkce, která umožňuje ladit MCP Server pomocí MCP Inspector.

## Začínáme s šablonou Weather MCP Server

> **Požadavky**
>
> Pro spuštění MCP Serveru na vašem lokálním vývojovém počítači budete potřebovat:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (požadováno pro nástroj git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) nebo [VS Code Insiders](https://code.visualstudio.com/insiders/) (požadováno pro nástroj open_in_vscode)
> - (*Volitelné - pokud preferujete uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozšíření Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Příprava prostředí

Existují dva způsoby, jak nastavit prostředí pro tento projekt. Můžete si vybrat podle vlastní preference.

> Poznámka: Po vytvoření virtuálního prostředí restartujte VSCode nebo terminál, aby se začalo používat Python z virtuálního prostředí.

| Přístup | Kroky |
| -------- | ----- |
| Použití `uv` | 1. Vytvořte virtuální prostředí: `uv venv` <br>2. Spusťte VSCode příkaz "***Python: Select Interpreter***" a vyberte Python z vytvořeného virtuálního prostředí <br>3. Nainstalujte závislosti (včetně vývojových): `uv pip install -r pyproject.toml --extra dev` |
| Použití `pip` | 1. Vytvořte virtuální prostředí: `python -m venv .venv` <br>2. Spusťte VSCode příkaz "***Python: Select Interpreter***" a vyberte Python z vytvořeného virtuálního prostředí<br>3. Nainstalujte závislosti (včetně vývojových): `pip install -e .[dev]` |

Po nastavení prostředí můžete spustit server ve vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klienta a začít:
1. Otevřete ladicí panel ve VS Code. Vyberte `Debug in Agent Builder` nebo stiskněte `F5` pro spuštění ladění MCP serveru.
2. Použijte AI Toolkit Agent Builder k otestování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builder.
3. Klikněte na `Run` pro otestování serveru s promptem.

**Gratulujeme!** Úspěšně jste spustili Weather MCP Server ve vašem lokálním vývojovém počítači přes Agent Builder jako MCP Klienta.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Co šablona obsahuje

| Složka / Soubor | Obsah                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Soubory VSCode pro ladění                   |
| `.aitk`      | Konfigurace pro AI Toolkit                |
| `src`        | Zdrojový kód weather mcp serveru           |

## Jak ladit Weather MCP Server

> Poznámky:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizuální vývojářský nástroj pro testování a ladění MCP serverů.
> - Všechny režimy ladění podporují breakpoints, takže můžete přidávat breakpoints do kódu implementace nástrojů.

## Dostupné nástroje

### Weather Tool
Nástroj `get_weather` poskytuje falešné informace o počasí pro zadanou lokalitu.

| Parametr | Typ | Popis |
| --------- | ---- | ----------- |
| `location` | string | Lokace, pro kterou chcete získat počasí (např. název města, stát nebo souřadnice) |

### Git Clone Tool
Nástroj `git_clone_repo` klonuje git repozitář do specifikované složky.

| Parametr | Typ | Popis |
| --------- | ---- | ----------- |
| `repo_url` | string | URL git repozitáře, který chcete klonovat |
| `target_folder` | string | Cesta ke složce, kam má být repozitář klonován |

Nástroj vrací JSON objekt s:
- `success`: Boolean, který ukazuje, zda operace byla úspěšná
- `target_folder` nebo `error`: Cesta ke klonovanému repozitáři nebo chybová zpráva

### VS Code Open Tool
Nástroj `open_in_vscode` otevírá složku ve VS Code nebo VS Code Insiders aplikaci.

| Parametr | Typ | Popis |
| --------- | ---- | ----------- |
| `folder_path` | string | Cesta ke složce k otevření |
| `use_insiders` | boolean (volitelné) | Jestli použít VS Code Insiders místo běžného VS Code |

Nástroj vrací JSON objekt s:
- `success`: Boolean, který ukazuje, zda operace byla úspěšná
- `message` nebo `error`: Potvrzovací zpráva nebo chybová zpráva

| Režim ladění | Popis | Kroky k ladění |
| ---------- | ----------- | --------------- |
| Agent Builder | Ladění MCP serveru v Agent Builderu přes AI Toolkit. | 1. Otevřete ladicí panel ve VS Code. Vyberte `Debug in Agent Builder` a stiskněte `F5` pro spuštění ladění MCP serveru.<br>2. Použijte AI Toolkit Agent Builder pro otestování serveru s [tímto promptem](../../../../../../../../../../../open_prompt_builder). Server bude automaticky připojen k Agent Builder.<br>3. Klikněte na `Run` pro otestování serveru s promptem. |
| MCP Inspector | Ladění MCP serveru pomocí MCP Inspector. | 1. Nainstalujte [Node.js](https://nodejs.org/)<br> 2. Nastavte Inspector: `cd inspector` && `npm install` <br> 3. Otevřete ladicí panel ve VS Code. Vyberte `Debug SSE in Inspector (Edge)` nebo `Debug SSE in Inspector (Chrome)`. Stiskněte F5 pro spuštění ladění.<br> 4. Když MCP Inspector spustí prohlížeč, klikněte na tlačítko `Connect` pro připojení tohoto MCP serveru.<br> 5. Poté můžete `List Tools`, vybrat nástroj, zadat parametry a `Run Tool` pro ladění vašeho kódu.<br> |

## Výchozí porty a přizpůsobení

| Režim ladění | Porty | Definice | Přizpůsobení | Poznámka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pro změnu výše uvedených portů. | N/A |
| MCP Inspector | 3001 (Server); 5173 a 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pro změnu výše uvedených portů. | N/A |

## Zpětná vazba

Pokud máte nějakou zpětnou vazbu nebo návrhy k této šabloně, otevřete prosím issue v [AI Toolkit GitHub repozitáři](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí služby automatického překladu AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ačkoli usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za závazný zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědni za žádné nedorozumění nebo chybné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->