# Weather MCP Server

Ez egy minta MCP szerver Pythonban, amely időjárás eszközöket valósít meg minta válaszokkal. Használható alapként a saját MCP szerveredhez. A következő funkciókat tartalmazza:

- **Weather Tool**: Egy eszköz, amely minta időjárási információkat szolgáltat a megadott hely alapján.
- **Git Clone Tool**: Egy eszköz, amely egy git tárolót klónoz egy megadott mappába.
- **VS Code Open Tool**: Egy eszköz, amely megnyit egy mappát a VS Code-ban vagy a VS Code Insiders-ben.
- **Kapcsolódás az Agent Builderhez**: Egy funkció, amellyel az MCP szervert az Agent Builderhez csatlakoztathatod tesztelés és hibakeresés céljából.
- **Hibakeresés a [MCP Inspector](https://github.com/modelcontextprotocol/inspector) segítségével**: Egy funkció, amely lehetővé teszi az MCP szerver hibakeresését az MCP Inspector használatával.

## Kezdj hozzá a Weather MCP Server sablonhoz

> **Előfeltételek**
>
> Az MCP szerver futtatásához a saját helyi fejlesztői gépeden szükséged lesz:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (szükséges a git_clone_repo eszközhöz)
> - [VS Code](https://code.visualstudio.com/) vagy [VS Code Insiders](https://code.visualstudio.com/insiders/) (szükséges az open_in_vscode eszközhöz)
> - (*Opcionális - ha az uv-t preferálod*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Környezet előkészítése

Ehhez a projekthez kétféle módon állítható be a környezet. Választhatsz kedved szerint.

> Megjegyzés: Töltsd újra a VSCode-ot vagy a terminált, hogy biztosan a virtuális környezet pythonját használja miután létrehoztad a virtuális környezetet.

| Módszer | Lépések |
| -------- | ----- |
| `uv` használata | 1. Hozz létre virtuális környezetet: `uv venv` <br>2. Futtasd a VSCode parancsot "***Python: Select Interpreter***" és válaszd ki a létrehozott virtuális környezet pythonját <br>3. Telepítsd a függőségeket (beleértve a fejlesztői függőségeket): `uv pip install -r pyproject.toml --extra dev` |
| `pip` használata | 1. Hozz létre virtuális környezetet: `python -m venv .venv` <br>2. Futtasd a VSCode parancsot "***Python: Select Interpreter***" és válaszd ki a létrehozott virtuális környezet pythonját<br>3. Telepítsd a függőségeket (beleértve a fejlesztői függőségeket): `pip install -e .[dev]` |

A környezet beállítása után futtathatod a szervert a helyi fejlesztői gépeden az Agent Builder segítségével MCP kliensként a kezdéshez:
1. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug in Agent Builder` opciót, vagy nyomd meg az `F5`-öt az MCP szerver hibakeresésének elindításához.
2. Használd az AI Toolkit Agent Buildert a szerver teszteléséhez [ezzel a prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan csatlakozik az Agent Builderhez.
3. Kattints a `Run` gombra, hogy a prompttal teszteld a szervert.

**Gratulálunk**! Sikeresen futtattad a Weather MCP Server-t a helyi fejlesztői gépeden az Agent Builderrel MCP kliensként.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mi található a sablonban

| Mappa / Fájl | Tartalom                               |
| ------------ | ------------------------------------ |
| `.vscode`    | VSCode fájlok a hibakereséshez       |
| `.aitk`      | Beállítások az AI Toolkithez          |
| `src`        | Az időjárás mcp szerver forráskódja  |

## Hogyan hibakeressük a Weather MCP Server-t

> Megjegyzések:
> - A [MCP Inspector](https://github.com/modelcontextprotocol/inspector) egy vizuális fejlesztői eszköz MCP szerverek tesztelésére és hibakeresésére.
> - Minden hibakeresési mód támogatja a töréspontokat, így töréspontokat adhatsz az eszköz implementációs kódjához.

## Elérhető eszközök

### Weather Tool
A `get_weather` eszköz minta időjárási információkat szolgáltat egy megadott helyhez.

| Paraméter | Típus | Leírás |
| --------- | ---- | ----------- |
| `location` | string | A hely, amelyhez az időjárást kérdezed (pl. város neve, állam, koordináták) |

### Git Clone Tool
A `git_clone_repo` eszköz egy git tárolót klónoz egy megadott mappába.

| Paraméter | Típus | Leírás |
| --------- | ---- | ----------- |
| `repo_url` | string | A klónozni kívánt git tároló URL-je |
| `target_folder` | string | A mappa elérési útja, ahová a tároló klónozva lesz |

Az eszköz egy JSON objektumot ad vissza a következőkkel:
- `success`: Logikai érték, amely jelzi, hogy a művelet sikeres volt-e
- `target_folder` vagy `error`: A klónozott tároló útvonala vagy hibajelzés

### VS Code Open Tool
Az `open_in_vscode` eszköz megnyit egy mappát a VS Code vagy a VS Code Insiders alkalmazásban.

| Paraméter | Típus | Leírás |
| --------- | ---- | ----------- |
| `folder_path` | string | A megnyitandó mappa elérési útja |
| `use_insiders` | boolean (opcionális) | Használja-e a VS Code Insiders-t a sima VS Code helyett |

Az eszköz egy JSON objektumot ad vissza:
- `success`: Logikai érték, amely jelzi, hogy a művelet sikeres volt-e
- `message` vagy `error`: Visszaigazoló üzenet vagy hibaüzenet

| Hibakeresési mód | Leírás | Hibakeresési lépések |
| ---------- | ----------- | --------------- |
| Agent Builder | Az MCP szerver hibakeresése az Agent Builderben az AI Toolkit segítségével. | 1. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug in Agent Builder` lehetőséget, és nyomd meg az `F5`-öt az MCP szerver hibakeresésének indításához.<br>2. Használd az AI Toolkit Agent Buildert a szerver teszteléséhez [ezzel a prompttal](../../../../../../../../../../../open_prompt_builder). A szerver automatikusan csatlakozik az Agent Builderhez.<br>3. Kattints a `Run` gombra a prompt teszteléséhez. |
| MCP Inspector | Az MCP szerver hibakeresése az MCP Inspector használatával. | 1. Telepítsd a [Node.js](https://nodejs.org/)-t<br> 2. Állítsd be az Inspectort: `cd inspector` és futtasd a `npm install` parancsot <br> 3. Nyisd meg a VS Code Hibakereső panelt. Válaszd a `Debug SSE in Inspector (Edge)` vagy a `Debug SSE in Inspector (Chrome)` lehetőséget. Nyomd meg az F5-öt a hibakeresés indításához.<br> 4. Amikor az MCP Inspector megnyílik a böngészőben, kattints a `Connect` gombra az MCP szerver csatlakoztatásához.<br> 5. Ezután használhatod a `List Tools` funkciót, választhatsz eszközt, beírhatod a paramétereket és a `Run Tool`-lal hibakeresheted a szerver kódját.<br> |

## Alapértelmezett portok és testreszabások

| Hibakeresési mód | Portok | Definíciók | Testreszabások | Megjegyzés |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) fájlokat a portok módosításához. | N/A |
| MCP Inspector | 3001 (Szerver); 5173 és 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Szerkeszd a [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) fájlokat a portok módosításához. | N/A |

## Visszajelzés

Ha bármilyen visszajelzésed vagy javaslatod van ehhez a sablonhoz, kérjük nyiss egy issue-t az [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) oldalán.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Felelősség kizárása**:  
Ezt a dokumentumot az AI fordító szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) használatával fordítottuk. Bár igyekszünk pontosak lenni, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Kritikus információk esetén professzionális, emberi fordítást javaslunk. Nem vállalunk felelősséget a fordítás használatából eredő félreértésekért vagy félreértelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->