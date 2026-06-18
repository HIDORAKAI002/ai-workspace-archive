# Weather MCP Server

Detta är en exempel-MCP-server i Python som implementerar väderverktyg med mockade svar. Den kan användas som en grund för din egen MCP-server. Den inkluderar följande funktioner:

- **Weather Tool**: Ett verktyg som tillhandahåller mockad väderinformation baserat på den angivna platsen.
- **Anslut till Agent Builder**: En funktion som låter dig ansluta MCP-servern till Agent Builder för testning och felsökning.
- **Felsök i [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: En funktion som låter dig felsöka MCP-servern med hjälp av MCP Inspector.

## Kom igång med Weather MCP Server-mallen

> **Förutsättningar**
>
> För att köra MCP-servern på din lokala utvecklingsmaskin behöver du:
>
> - [Python](https://www.python.org/)
> - (*Valfritt - om du föredrar uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Förbered miljön

Det finns två metoder för att ställa in miljön för detta projekt. Du kan välja någon av dem baserat på din preferens.

> Obs: Ladda om VSCode eller terminalen för att säkerställa att virtual environment-python används efter att du skapat den virtuella miljön.

| Metod | Steg |
| -------- | ----- |
| Använda `uv` | 1. Skapa virtuell miljö: `uv venv` <br>2. Kör VSCode-kommandot "***Python: Select Interpreter***" och välj python från den skapade virtuella miljön <br>3. Installera beroenden (inklusive utvecklingsberoenden): `uv pip install -r pyproject.toml --extra dev` |
| Använda `pip` | 1. Skapa virtuell miljö: `python -m venv .venv` <br>2. Kör VSCode-kommandot "***Python: Select Interpreter***" och välj python från den skapade virtuella miljön<br>3. Installera beroenden (inklusive utvecklingsberoenden): `pip install -e .[dev]` |

Efter att ha ställt in miljön kan du köra servern på din lokala utvecklingsmaskin via Agent Builder som MCP-klient för att komma igång:
1. Öppna VS Code Debug-panelen. Välj `Debug in Agent Builder` eller tryck `F5` för att starta felsökningen av MCP-servern.
2. Använd Microsoft Foundry Toolkit Agent Builder för att testa servern med [detta prompt](../../../../../../../../../../../open_prompt_builder). Servern ansluts automatiskt till Agent Builder.
3. Klicka på `Run` för att testa servern med prompten.

**Grattis**! Du har framgångsrikt kört Weather MCP Server på din lokala utvecklingsmaskin via Agent Builder som MCP-klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Vad som ingår i mallen

| Mapp / Fil | Innehåll                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-filer för felsökning                 |
| `.aitk`      | Konfigurationer för Microsoft Foundry Toolkit                |
| `src`        | Källkoden för weather mcp-servern            |

## Hur man felsöker Weather MCP Server

> Obs:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) är ett visuellt utvecklarverktyg för testning och felsökning av MCP-servrar.
> - Alla felsökningslägen stödjer brytpunkter, så att du kan lägga till brytpunkter i verktygsimplementeringskoden.

| Felsökningsläge | Beskrivning | Steg för felsökning |
| ---------- | ----------- | --------------- |
| Agent Builder | Felsöka MCP-servern i Agent Builder via Microsoft Foundry Toolkit. | 1. Öppna VS Code Debug-panel. Välj `Debug in Agent Builder` och tryck `F5` för att starta felsökning av MCP-servern.<br>2. Använd Microsoft Foundry Toolkit Agent Builder för att testa servern med [detta prompt](../../../../../../../../../../../open_prompt_builder). Servern ansluts automatiskt till Agent Builder.<br>3. Klicka på `Run` för att testa servern med prompten. |
| MCP Inspector | Felsök MCP-servern med hjälp av MCP Inspector. | 1. Installera [Node.js](https://nodejs.org/)<br> 2. Ställ in Inspector: `cd inspector` && `npm install` <br> 3. Öppna VS Code Debug-panel. Välj `Debug SSE in Inspector (Edge)` eller `Debug SSE in Inspector (Chrome)`. Tryck F5 för att börja felsöka.<br> 4. När MCP Inspector startar i webbläsaren, klicka på `Connect` för att ansluta denna MCP-server.<br> 5. Därefter kan du `List Tools`, välja ett verktyg, skriva in parametrar och `Run Tool` för att felsöka din serverkod.<br> |

## Standardportar och anpassningar

| Felsökningsläge | Portar | Definitioner | Anpassningar | Notering |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redigera [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) för att ändra ovanstående portar. | N/A |
| MCP Inspector | 3001 (Server); 5173 och 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Redigera [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) för att ändra ovanstående portar.| N/A |

## Feedback

Om du har feedback eller förslag för denna mall, vänligen öppna en issue på [Microsoft Foundry Toolkit GitHub-förvaret](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->