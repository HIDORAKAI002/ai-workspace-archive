# Weather MCP Server

Ez egy példa MCP szerver Pythonban, amely időjárási eszközöket valósít meg hamis válaszokkal. Használható vázként a saját MCP szerveredhez. A következő funkciókat tartalmazza:

- **Weather Tool**: Egy eszköz, amely megadott hely alapján hamisított időjárási információkat szolgáltat.
- **Csatlakozás az Agent Builderhez**: Egy funkció, amely lehetővé teszi az MCP szerver csatlakoztatását az Agent Builderhez tesztelés és hibakeresés céljából.
- **Hibakeresés az [MCP Inspector](https://github.com/modelcontextprotocol/inspector) segítségével**: Egy funkció, amellyel az MCP szervert az MCP Inspector használatával lehet hibakeresni.

## Kezdés a Weather MCP Server sablonnal

> **Előfeltételek**
>
> Az MCP szerver futtatásához helyi fejlesztői gépeden szükséged lesz:
>
> - [Python](https://www.python.org/)
> - (*Opcionális - ha az uv-t részesíted előnyben*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Környezet előkészítése

Két megközelítés van a környezet beállítására ehhez a projekthez. Választhatsz bármelyiket az előnyöd szerint.

> Megjegyzés: Töltsd újra a VSCode-ot vagy a terminált, hogy az új virtuális környezet pythonját használja miután létrehoztad a virtuális környezetet.

| Megközelítés | Lépések |
| -------- | ----- |
| `uv` használata | 1. Hozd létre a virtuális környezetet: `uv venv` <br>2. A VSCode parancsában válaszd a "***Python: Select Interpreter***" opciót, majd válaszd ki a létrehozott virtuális környezet pythonját <br>3. Telepítsd a függőségeket (beleértve a fejlesztési függőségeket is): `uv pip install -r pyproject.toml --extra dev` |
| `pip` használata | 1. Hozd létre a virtuális környezetet: `python -m venv .venv` <br>2. A VSCode parancsában válaszd a "***Python: Select Interpreter***" opciót, majd válaszd ki a létrehozott virtuális környezet pythonját<br>3. Telepítsd a függőségeket (beleértve a fejlesztési függőségeket is): `pip install -e .[dev]` |

A környezet beállítása után a szervert helyi fejlesztői gépeden az Agent Builder segítségével, mint MCP kliens indíthatod:
1. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug in Agent Builder` lehetőséget vagy nyomd meg az `F5`-öt az MCP szerver hibakeresésének indításához.
2. Használd az AI Toolkit Agent Buildert a szerver teszteléséhez ezzel a [prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan csatlakozik az Agent Builderhez.
3. Kattints a `Run` gombra a prompttal történő teszteléshez.

**Gratulálunk**! Sikeresen futtattad a Weather MCP Servert helyi fejlesztői gépeden az Agent Builderen keresztül MCP kliensként.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mi található a sablonban

| Mappa / Fájl| Tartalom                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode fájlok a hibakereséshez               |
| `.aitk`      | Konfigurációk az AI Toolkithez                |
| `src`        | Az időjárás mcp szerver forráskódja           |

## Hogyan hibakeressük a Weather MCP Servert

> Megjegyzések:
> - Az [MCP Inspector](https://github.com/modelcontextprotocol/inspector) egy vizuális fejlesztői eszköz az MCP szerverek teszteléséhez és hibakereséséhez.
> - Minden hibakeresési mód támogatja a töréspontokat, így hozzáadhatsz töréspontokat az eszköz megvalósítása kódjához.

| Hibakeresési mód | Leírás | Hibakeresési lépések |
| ---------- | ----------- | --------------- |
| Agent Builder | Az MCP szerver hibakeresése az AI Toolkit Agent Builden keresztül. | 1. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug in Agent Builder` opciót, majd nyomd meg az `F5`-öt az MCP szerver hibakeresésének indításához.<br>2. Használd az AI Toolkit Agent Buildert a szerver teszteléséhez ezzel a [prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan csatlakozik az Agent Builderhez.<br>3. Kattints a `Run` gombra a prompttal történő teszteléshez. |
| MCP Inspector | Az MCP szerver hibakeresése az MCP Inspector segítségével. | 1. Telepítsd a [Node.js](https://nodejs.org/)<br> 2. Állítsd be az Inspectort: `cd inspector` && `npm install` <br> 3. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug SSE in Inspector (Edge)` vagy a `Debug SSE in Inspector (Chrome)` opciót. Nyomd meg az F5-öt a hibakeresés elindításához.<br> 4. Amikor az MCP Inspector elindul a böngészőben, kattints a `Connect` gombra a szerver csatlakoztatásához.<br> 5. Ezután használhatod a `List Tools`, választhatsz eszközt, megadhatod a paramétereket, és a `Run Tool`-lal hibakeresheted a szerver kódját.<br> |

## Alapértelmezett portok és testreszabások

| Hibakeresési mód | Portok | Definíciók | Testreszabások | Megjegyzés |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) fájlokat a fent említett portok módosításához. | N/A |
| MCP Inspector | 3001 (Szerver); 5173 és 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) fájlokat a fent említett portok módosításához. | N/A |

## Visszajelzés

Ha bármilyen visszajelzésed vagy javaslatod van ehhez a sablonhoz, kérjük, nyiss egy issue-t az [AI Toolkit GitHub repo](https://github.com/microsoft/vscode-ai-toolkit/issues) oldalán.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:  
Ezt a dokumentumot a [Co-op Translator](https://github.com/Azure/co-op-translator) nevű mesterséges intelligencia fordító szolgáltatással fordítottuk. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítás hibákat vagy pontatlanságokat tartalmazhat. Az eredeti dokumentum az anyanyelvén tekintendő hivatalos forrásnak. Fontos információk esetén professzionális emberi fordítást javaslunk. A fordítás használatából eredő félreértésekért vagy félreértelmezésekért nem vállalunk felelősséget.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->