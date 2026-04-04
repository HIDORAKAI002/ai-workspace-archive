# Weather MCP Server

Detta är en exempel-MCP-server i Python som implementerar väderverktyg med mockade svar. Den kan användas som en stomme för din egen MCP-server. Den inkluderar följande funktioner:

- **Weather Tool**: Ett verktyg som tillhandahåller mockad väderinformation baserat på angiven plats.
- **Git Clone Tool**: Ett verktyg som klonar ett git-repository till en angiven mapp.
- **VS Code Open Tool**: Ett verktyg som öppnar en mapp i VS Code eller VS Code Insiders.
- **Anslut till Agent Builder**: En funktion som låter dig ansluta MCP-servern till Agent Builder för testning och felsökning.
- **Felsök i [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: En funktion som låter dig felsöka MCP-servern med MCP Inspector.

## Kom igång med Weather MCP Server-mallen

> **Förutsättningar**
>
> För att köra MCP-servern på din lokala utvecklingsmaskin behöver du:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Nödvändigt för verktyget git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) eller [VS Code Insiders](https://code.visualstudio.com/insiders/) (Nödvändigt för verktyget open_in_vscode)
> - (*Valfritt - om du föredrar uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Förbered miljön

Det finns två sätt att sätta upp miljön för detta projekt. Du kan välja det som passar dig bäst.

> Notera: Ladda om VSCode eller terminalen för att säkerställa att python i den virtuella miljön används efter att den virtuella miljön skapats.

| Tillvägagångssätt | Steg |
| -------- | ----- |
| Använda `uv` | 1. Skapa virtuell miljö: `uv venv` <br>2. Kör VSCode-kommandot "***Python: Select Interpreter***" och välj python från den skapade virtuella miljön <br>3. Installera beroenden (inklusive utvecklingsberoenden): `uv pip install -r pyproject.toml --extra dev` |
| Använda `pip` | 1. Skapa virtuell miljö: `python -m venv .venv` <br>2. Kör VSCode-kommandot "***Python: Select Interpreter***" och välj python från den skapade virtuella miljön<br>3. Installera beroenden (inklusive utvecklingsberoenden): `pip install -e .[dev]` | 

Efter att ha satt upp miljön kan du köra servern på din lokala utvecklingsmaskin via Agent Builder som MCP-klient för att komma igång:
1. Öppna VS Code:s felsökningspanel. Välj `Debug in Agent Builder` eller tryck `F5` för att börja felsöka MCP-servern.
2. Använd AI Toolkit Agent Builder för att testa servern med [denna prompt](../../../../../../../../../../../open_prompt_builder). Servern kommer automatiskt att anslutas till Agent Builder.
3. Klicka på `Run` för att testa servern med prompten.

**Grattis**! Du har framgångsrikt kört Weather MCP Server på din lokala utvecklingsmaskin via Agent Builder som MCP-klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Vad som ingår i mallen

| Mapp / Fil | Innehåll |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-filer för felsökning                   |
| `.aitk`      | Konfigurationer för AI Toolkit                |
| `src`        | Källkoden för weather mcp-servern              |

## Hur man felsöker Weather MCP Server

> Noteringar:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) är ett visuellt utvecklarverktyg för testning och felsökning av MCP-servrar.
> - Alla felsökningslägen stödjer brytpunkter, så du kan lägga till brytpunkter i verktygets implementationskod.

## Tillgängliga verktyg

### Weather Tool
Verktyget `get_weather` tillhandahåller mockad väderinformation för en angiven plats.

| Parameter | Typ | Beskrivning |
| --------- | ---- | ----------- |
| `location` | string | Plats för att hämta väderinformation (t.ex. stadens namn, delstat eller koordinater) |

### Git Clone Tool
Verktyget `git_clone_repo` klonar ett git-repository till en angiven mapp.

| Parameter | Typ | Beskrivning |
| --------- | ---- | ----------- |
| `repo_url` | string | URL till git-repositoryt som ska klonas |
| `target_folder` | string | Sökväg till mappen där repositoryn ska klonas |

Verktyget returnerar ett JSON-objekt med:
- `success`: Boolean som anger om operationen lyckades
- `target_folder` eller `error`: Sökvägen till den klonade repositoryn eller ett felmeddelande

### VS Code Open Tool
Verktyget `open_in_vscode` öppnar en mapp i VS Code eller VS Code Insiders-applikationen.

| Parameter | Typ | Beskrivning |
| --------- | ---- | ----------- |
| `folder_path` | string | Sökväg till mappen som ska öppnas |
| `use_insiders` | boolean (valfritt) | Om man ska använda VS Code Insiders istället för vanlig VS Code |

Verktyget returnerar ett JSON-objekt med:
- `success`: Boolean som anger om operationen lyckades
- `message` eller `error`: Ett bekräftelsemeddelande eller ett felmeddelande

| Felsökningsläge | Beskrivning | Steg för felsökning |
| ---------- | ----------- | --------------- |
| Agent Builder | Felsök MCP-servern i Agent Builder via AI Toolkit. | 1. Öppna VS Code:s felsökningspanel. Välj `Debug in Agent Builder` och tryck `F5` för att börja felsöka MCP-servern.<br>2. Använd AI Toolkit Agent Builder för att testa servern med [denna prompt](../../../../../../../../../../../open_prompt_builder). Servern kommer automatiskt att anslutas till Agent Builder.<br>3. Klicka på `Run` för att testa servern med prompten. |
| MCP Inspector | Felsök MCP-servern med MCP Inspector. | 1. Installera [Node.js](https://nodejs.org/)<br> 2. Ställ in Inspector: `cd inspector` && `npm install` <br> 3. Öppna VS Code:s felsökningspanel. Välj `Debug SSE in Inspector (Edge)` eller `Debug SSE in Inspector (Chrome)`. Tryck F5 för att börja felsöka.<br> 4. När MCP Inspector startar i webbläsaren, klicka på `Connect`-knappen för att ansluta denna MCP-server.<br> 5. Då kan du `List Tools`, välja ett verktyg, mata in parametrar och `Run Tool` för att felsöka din serverkod.<br> |

## Standardportar och anpassningar

| Felsökningsläge | Portar | Definitioner | Anpassningar | Notering |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Redigera [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) för att ändra ovanstående portar. | N/A |
| MCP Inspector | 3001 (Server); 5173 och 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Redigera [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) för att ändra ovanstående portar.| N/A |

## Feedback

Om du har någon feedback eller förslag på denna mall, vänligen öppna en issue i [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår genom användning av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->