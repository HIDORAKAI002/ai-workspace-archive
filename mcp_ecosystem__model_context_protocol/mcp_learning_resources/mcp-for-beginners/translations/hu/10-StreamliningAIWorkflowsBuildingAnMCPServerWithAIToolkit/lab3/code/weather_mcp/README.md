# Weather MCP Server

Ez egy példa MCP szerver Pythonban, amely időjárás eszközöket valósít meg hamis válaszokkal. Használható kiindulási alapként a saját MCP szerveredhez. A következő funkciókat tartalmazza:

- **Weather Tool**: Egy eszköz, amely a megadott hely alapján hamisított időjárás-információkat szolgáltat.
- **Csatlakozás az Agent Builderhez**: Olyan funkció, amely lehetővé teszi, hogy az MCP szervert csatlakoztasd az Agent Builderhez tesztelés és hibakeresés céljából.
- **Hibakeresés az [MCP Inspector](https://github.com/modelcontextprotocol/inspector) segítségével**: Olyan funkció, amely lehetővé teszi az MCP szerver hibakeresését az MCP Inspector használatával.

## Kezdj neki a Weather MCP Server sablonnal

> **Előfeltételek**
>
> Ahhoz, hogy helyileg futtasd az MCP szervert a fejlesztői gépeden, szükséged lesz:
>
> - [Python](https://www.python.org/)
> - (*Opcionális - ha az uv-t preferálod*) [uv](https://github.com/astral-sh/uv)
> - [Python hibakereső bővítmény](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Környezet előkészítése

Két megközelítés létezik a környezet beállítására ennél a projektnél. Választhatsz bármelyiket a saját preferenciád alapján.

> Megjegyzés: Indítsd újra a VSCode-ot vagy a terminált annak érdekében, hogy a virtuális környezet Pythonját használja a rendszer a virtuális környezet létrehozása után.

| Megközelítés | Lépések |
| -------- | ----- |
| `uv` használata | 1. Virtuális környezet létrehozása: `uv venv` <br>2. Futtasd a VSCode parancsát "***Python: Select Interpreter***", és válaszd ki a létrehozott virtuális környezet Pythonját <br>3. Telepítsd a függőségeket (beleértve a fejlesztői függőségeket is): `uv pip install -r pyproject.toml --extra dev` |
| `pip` használata | 1. Virtuális környezet létrehozása: `python -m venv .venv` <br>2. Futtasd a VSCode parancsát "***Python: Select Interpreter***", és válaszd ki a létrehozott virtuális környezet Pythonját<br>3. Telepítsd a függőségeket (beleértve a fejlesztői függőségeket is): `pip install -e .[dev]` | 

A környezet beállítása után futtathatod a szervert helyileg a fejlesztői gépeden az Agent Builderrel MCP kliensként, hogy elindulhass:
1. Nyisd meg a VS Code Hibakeresés panelt. Válaszd a `Debug in Agent Builder` opciót vagy nyomd meg az `F5`-öt az MCP szerver hibakeresésének elindításához.
2. Használd a Microsoft Foundry Toolkit Agent Buildert a szerver teszteléséhez az [ezzel a prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan kapcsolódni fog az Agent Builderhez.
3. Kattints a `Run` gombra, hogy a prompt segítségével teszteld a szervert.

**Gratulálunk**! Sikeresen futtattad helyileg a Weather MCP Server szervert az Agent Builderen keresztül MCP kliensként.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mit tartalmaz a sablon

| Mappa / Fájl | Tartalom                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode fájlok a hibakereséshez               |
| `.aitk`      | Konfigurációk a Microsoft Foundry Toolkit számára               |
| `src`        | Az időjárás mcp szerver forráskódja          |

## Hogyan hibakeressük a Weather MCP Server szervert

> Megjegyzések:
> - Az [MCP Inspector](https://github.com/modelcontextprotocol/inspector) egy vizuális fejlesztői eszköz az MCP szerverek teszteléséhez és hibakereséséhez.
> - Minden hibakeresési mód támogat töréspontokat, így hozzáadhatsz töréspontokat az eszköz implementációs kódjához.

| Hibakeresési mód | Leírás | Hibakeresési lépések |
| ---------- | ----------- | --------------- |
| Agent Builder | Hibakeresés az MCP szerveren az Agent Builderben a Microsoft Foundry Toolkit segítségével. | 1. Nyisd meg a VS Code Hibakeresés panelt. Válaszd a `Debug in Agent Builder` opciót, majd nyomj `F5`-öt az MCP szerver hibakeresésének elindításához.<br>2. Használd a Microsoft Foundry Toolkit Agent Buildert a szerver tesztelésére az [ezzel a prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan kapcsolódik az Agent Builderhez.<br>3. Kattints a `Run` gombra, hogy a prompttal teszteld a szervert. |
| MCP Inspector | Hibakeresés az MCP szerveren az MCP Inspector segítségével. | 1. Telepítsd a [Node.js-t](https://nodejs.org/)<br> 2. Állítsd be az Inspectort: `cd inspector` és `npm install` <br> 3. Nyisd meg a VS Code Hibakeresés panelt. Válaszd a `Debug SSE in Inspector (Edge)` vagy `Debug SSE in Inspector (Chrome)` beállítást. Nyomd meg az F5-öt a hibakeresés indításához.<br> 4. Amikor az MCP Inspector megnyílik a böngészőben, kattints a `Connect` gombra ennek az MCP szervernek a csatlakoztatásához.<br> 5. Ezután használhatod az eszközök listázását, választhatsz eszközt, megadhatsz paramétereket, és az eszköz futtatásával hibakeresheted a szerver kódját.<br> |

## Alapértelmezett portok és testreszabások

| Hibakeresési mód | Portok | Meghatározások | Testreszabások | Megjegyzés |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) fájlokat a portok megváltoztatásához. | N/A |
| MCP Inspector | 3001 (Szerver); 5173 és 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) fájlokat a portok megváltoztatásához.| N/A |

## Visszajelzés

Ha bármilyen visszajelzésed vagy javaslatod van ezzel a sablonnal kapcsolatban, kérjük, nyiss egy issue-t a [Microsoft Foundry Toolkit GitHub tárolójában](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->