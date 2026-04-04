# Weather MCP Server

Toto je ukážkový MCP Server v Pythone implementujúci nástroje pre počasie s fiktívnymi odpoveďami. Môže byť použitý ako základ pre váš vlastný MCP Server. Zahŕňa nasledujúce funkcie:

- **Nástroj pre počasie**: Nástroj, ktorý poskytuje fiktívne informácie o počasí na základe zadanej lokality.
- **Pripojenie k Agent Builder**: Funkcia, ktorá umožňuje pripojiť MCP server k Agent Builder na testovanie a ladenie.
- **Ladenie v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkcia umožňujúca ladenie MCP Servera pomocou MCP Inspector.

## Začíname so šablónou Weather MCP Server

> **Predpoklady**
>
> Na spustenie MCP Servera na vašom lokálnom vývojovom stroji budete potrebovať:
>
> - [Python](https://www.python.org/)
> - (*Voliteľné - ak preferujete uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozšírenie Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Príprava prostredia

Existujú dva prístupy na nastavenie prostredia pre tento projekt. Môžete si vybrať ktorýkoľvek podľa svojich preferencií.

> Poznámka: Pre zaručenie použitia Pythonu z virtuálneho prostredia po jeho vytvorení reštartujte VSCode alebo terminál.

| Prístup | Kroky |
| -------- | ----- |
| Použitie `uv` | 1. Vytvorte virtuálne prostredie: `uv venv` <br>2. Spustite príkaz vo VSCode "***Python: Select Interpreter***" a vyberte Python z vytvoreného virtuálneho prostredia <br>3. Nainštalujte závislosti (vrátane vývojových): `uv pip install -r pyproject.toml --extra dev` |
| Použitie `pip` | 1. Vytvorte virtuálne prostredie: `python -m venv .venv` <br>2. Spustite príkaz vo VSCode "***Python: Select Interpreter***" a vyberte Python z vytvoreného virtuálneho prostredia<br>3. Nainštalujte závislosti (vrátane vývojových): `pip install -e .[dev]` | 

Po nastavení prostredia môžete spustiť server na vašom lokálnom vývojovom stroji cez Agent Builder ako MCP Klient, aby ste mohli začať:
1. Otvorte panel ladenia vo VS Code. Vyberte `Debug in Agent Builder` alebo stlačte `F5` pre spustenie ladenia MCP servera.
2. Použite AI Toolkit Agent Builder na testovanie servera s [týmto promptom](../../../../../../../../../../../open_prompt_builder). Server sa automaticky pripojí k Agent Builderu.
3. Kliknite na `Run` pre otestovanie servera s promptom.

**Gratulujeme**! Úspešne ste spustili Weather MCP Server na vašom lokálnom vývojovom stroji cez Agent Builder ako MCP Klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Čo obsahuje šablóna

| Zložka / Súbor| Obsah                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Súbory VSCode na ladenie                     |
| `.aitk`      | Konfigurácie pre AI Toolkit                   |
| `src`        | Zdrojový kód pre weather mcp server          |

## Ako ladiť Weather MCP Server

> Poznámky:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizuálny nástroj pre vývojárov na testovanie a ladenie MCP serverov.
> - Všetky režimy ladenia podporujú breakpointy, takže môžete pridávať breakpointy do implementačného kódu nástroja.

| Režim ladenia | Popis | Kroky na ladenie |
| ---------- | ----------- | --------------- |
| Agent Builder | Ladenie MCP servera v Agent Builder cez AI Toolkit. | 1. Otvorte panel ladenia VS Code. Vyberte `Debug in Agent Builder` a stlačte `F5` pre spustenie ladenia MCP servera.<br>2. Použite AI Toolkit Agent Builder na testovanie servera s [týmto promptom](../../../../../../../../../../../open_prompt_builder). Server sa automaticky pripojí k Agent Builderu.<br>3. Kliknite na `Run` pre testovanie servera s promptom. |
| MCP Inspector | Ladenie MCP servera pomocou MCP Inspector. | 1. Nainštalujte [Node.js](https://nodejs.org/)<br> 2. Nastavte Inspector: `cd inspector` && `npm install` <br> 3. Otvorte panel ladenia VS Code. Vyberte `Debug SSE in Inspector (Edge)` alebo `Debug SSE in Inspector (Chrome)`. Stlačte F5 pre začatie ladenia.<br> 4. Keď sa MCP Inspector spustí v prehliadači, kliknite na tlačidlo `Connect` pre pripojenie tohto MCP servera.<br> 5. Následne môžete `List Tools`, vybrať nástroj, zadať parametre a `Run Tool` na ladenie vášho serverového kódu.<br> |

## Predvolené porty a prispôsobenia

| Režim ladenia | Porty | Definície | Prispôsobenia | Poznámka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upraviť [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) na zmenu vyššie uvedených portov. | N/A |
| MCP Inspector | 3001 (Server); 5173 a 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Upraviť [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) na zmenu vyššie uvedených portov.| N/A |

## Spätná väzba

Ak máte spätnú väzbu alebo návrhy na túto šablónu, otvorte prosím issue v [AI Toolkit GitHub repozitári](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, prosím, majte na pamäti, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho rodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nezodpovedáme za akékoľvek nepochopenia alebo nesprávne výklady vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->