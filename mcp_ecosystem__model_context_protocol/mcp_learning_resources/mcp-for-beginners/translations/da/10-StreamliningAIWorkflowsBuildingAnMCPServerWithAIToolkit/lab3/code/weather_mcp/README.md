# Weather MCP Server

Dette er en eksempel MCP Server i Python, der implementerer vejrværktøjer med mock-svar. Den kan bruges som en skabelon til din egen MCP Server. Den inkluderer følgende funktioner:

- **Vejrværktøj**: Et værktøj, der giver simuleret vejrinfo baseret på den angivne placering.
- **Forbind til Agent Builder**: En funktion der giver dig mulighed for at forbinde MCP serveren til Agent Builder til test og fejlfinding.
- **Fejlfinding i [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: En funktion der gør det muligt at fejlsøge MCP Serveren ved hjælp af MCP Inspector.

## Kom i gang med Weather MCP Server skabelonen

> **Forudsætninger**
>
> For at køre MCP Serveren på din lokale udviklermaskine skal du bruge:
>
> - [Python](https://www.python.org/)
> - (*Valgfrit - hvis du foretrækker uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Forbered miljø

Der er to måder at opsætte miljøet til dette projekt. Du kan vælge enten én baseret på din præference.

> Bemærk: Genindlæs VSCode eller terminalen for at sikre, at det virtuelle miljøs python bliver brugt efter oprettelse af det virtuelle miljø.

| Metode | Trin |
| -------- | ----- |
| Brug af `uv` | 1. Opret virtuelt miljø: `uv venv` <br>2. Kør VSCode-kommando "***Python: Select Interpreter***" og vælg python fra det oprettede virtuelle miljø <br>3. Installer afhængigheder (inkl. udviklingsafhængigheder): `uv pip install -r pyproject.toml --extra dev` |
| Brug af `pip` | 1. Opret virtuelt miljø: `python -m venv .venv` <br>2. Kør VSCode-kommando "***Python: Select Interpreter***" og vælg python fra det oprettede virtuelle miljø<br>3. Installer afhængigheder (inkl. udviklingsafhængigheder): `pip install -e .[dev]` |

Efter opsætning af miljø kan du køre serveren på din lokale udviklermaskine via Agent Builder som MCP Client for at komme i gang:  
1. Åbn VS Code fejlsøgningspanel. Vælg `Debug in Agent Builder` eller tryk på `F5` for at starte fejlfinding af MCP serveren.  
2. Brug AI Toolkit Agent Builder til at teste serveren med [dette prompt](../../../../../../../../../../../open_prompt_builder). Serveren vil automatisk blive forbundet til Agent Builder.  
3. Klik `Run` for at teste serveren med prompten.

**Tillykke**! Du har med succes kørt Weather MCP Serveren på din lokale udviklermaskine via Agent Builder som MCP Client.  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Hvad er inkluderet i skabelonen

| Folder / File| Indhold                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode-filer til fejlfinding                 |
| `.aitk`      | Konfigurationer til AI Toolkit                |
| `src`        | Kildekoden til weather mcp serveren           |

## Sådan fejlfinder du Weather MCP Server

> Bemærkninger:  
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) er et visuelt udviklerværktøj til test og fejlfinding af MCP servere.  
> - Alle fejlfindingstilstande understøtter breakpoint, så du kan tilføje breakpoints i værktøjsimplementeringen.

| Fejlfindingstilstand | Beskrivelse | Trin til fejlfinding |
| ---------- | ----------- | --------------- |
| Agent Builder | Fejlfind MCP serveren i Agent Builder via AI Toolkit. | 1. Åbn VS Code fejlsøgningspanel. Vælg `Debug in Agent Builder` og tryk `F5` for at starte fejlfinding af MCP serveren.<br>2. Brug AI Toolkit Agent Builder til at teste serveren med [dette prompt](../../../../../../../../../../../open_prompt_builder). Serveren vil automatisk blive forbundet til Agent Builder.<br>3. Klik `Run` for at teste serveren med prompten. |
| MCP Inspector | Fejlfind MCP serveren ved hjælp af MCP Inspector. | 1. Installer [Node.js](https://nodejs.org/)<br> 2. Opsæt Inspector: `cd inspector` && `npm install` <br> 3. Åbn VS Code fejlsøgningspanel. Vælg `Debug SSE in Inspector (Edge)` eller `Debug SSE in Inspector (Chrome)`. Tryk F5 for at starte fejlfinding.<br> 4. Når MCP Inspector åbnes i browseren, klik på `Connect` knappen for at forbinde denne MCP server.<br> 5. Derefter kan du `List Tools`, vælge et værktøj, indtaste parametre og `Run Tool` for at fejlsøge din serverkode.<br> |

## Standardporte og tilpasninger

| Fejlfindingstilstand | Porte | Definitioner | Tilpasninger | Bemærkning |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Rediger [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) for at ændre ovenstående porte. | Ingen |
| MCP Inspector | 3001 (Server); 5173 og 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Rediger [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) for at ændre ovenstående porte.| Ingen |

## Feedback

Hvis du har feedback eller forslag til denne skabelon, så opret venligst et issue i [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiske oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets originalsprog bør betragtes som den autoritative kilde. For kritiske oplysninger anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for eventuelle misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->