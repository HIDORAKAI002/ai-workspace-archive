# Weather MCP Server

Dette er en eksempel-MCP-server i Python, der implementerer vejr-værktøjer med simulerede svar. Den kan bruges som en skabelon til din egen MCP-server. Den inkluderer følgende funktioner:

- **Weather Tool**: Et værktøj, der leverer simulerede vejrdata baseret på den angivne placering.
- **Git Clone Tool**: Et værktøj, der kloner et git-repositorium til en specificeret mappe.
- **VS Code Open Tool**: Et værktøj, der åbner en mappe i VS Code eller VS Code Insiders.
- **Connect to Agent Builder**: En funktion, der gør det muligt at forbinde MCP-serveren til Agent Builder til test og fejlfinding.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: En funktion, der gør det muligt at debugge MCP-serveren ved hjælp af MCP Inspector.

## Kom i gang med Weather MCP Server-skabelonen

> **Forudsætninger**
>
> For at køre MCP-serveren på din lokale udviklingsmaskine skal du bruge:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (krævet til git_clone_repo-værktøjet)
> - [VS Code](https://code.visualstudio.com/) eller [VS Code Insiders](https://code.visualstudio.com/insiders/) (krævet til open_in_vscode-værktøjet)
> - (*Valgfrit - hvis du foretrækker uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Forbered miljøet

Der er to metoder til at sætte miljøet op for dette projekt. Du kan vælge den, der passer dig bedst.

> Bemærk: Genindlæs VSCode eller terminalen for at sikre, at den virtuelle miljø-python bruges efter oprettelse af det virtuelle miljø.

| Metode | Trin |
| -------- | ----- |
| Brug af `uv` | 1. Opret virtuelt miljø: `uv venv` <br>2. Kør VSCode-kommando "***Python: Select Interpreter***" og vælg python fra det oprettede virtuelle miljø <br>3. Installer afhængigheder (inkl. udviklingsafhængigheder): `uv pip install -r pyproject.toml --extra dev` |
| Brug af `pip` | 1. Opret virtuelt miljø: `python -m venv .venv` <br>2. Kør VSCode-kommando "***Python: Select Interpreter***" og vælg python fra det oprettede virtuelle miljø<br>3. Installer afhængigheder (inkl. udviklingsafhængigheder): `pip install -e .[dev]` |

Efter opsætning af miljøet kan du køre serveren på din lokale udviklingsmaskine via Agent Builder som MCP-klient for at komme i gang:
1. Åbn VS Code Debug-panelet. Vælg `Debug in Agent Builder` eller tryk på `F5` for at starte fejlfinding af MCP-serveren.
2. Brug AI Toolkit Agent Builder til at teste serveren med [denne prompt](../../../../../../../../../../../open_prompt_builder). Serveren forbindes automatisk til Agent Builder.
3. Klik `Run` for at teste serveren med prompten.

**Tillykke**! Du har med succes kørt Weather MCP Server på din lokale udviklingsmaskine via Agent Builder som MCP-klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Hvad er inkluderet i skabelonen

| Mappe / Fil | Indhold                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode filer til fejlfinding                 |
| `.aitk`      | Konfigurationer til AI Toolkit                |
| `src`        | Kildekoden til weather mcp-serveren           |

## Hvordan man fejlfinder Weather MCP Server

> Bemærkninger:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) er et visuelt udviklingsværktøj til test og fejlfinding af MCP-servere.
> - Alle fejlfindingstilstande understøtter breakpoint, så du kan tilføje breakpoints til værktøjets implementeringskode.

## Tilgængelige værktøjer

### Weather Tool
`get_weather`-værktøjet leverer simulerede vejrdata for en specificeret placering.

| Parameter | Type | Beskrivelse |
| --------- | ---- | ----------- |
| `location` | string | Placering, der skal hentes vejr for (f.eks. bynavn, stat eller koordinater) |

### Git Clone Tool
`git_clone_repo`-værktøjet kloner et git-repositorium til en bestemt mappe.

| Parameter | Type | Beskrivelse |
| --------- | ---- | ----------- |
| `repo_url` | string | URL til git-repositoriet, der skal klones |
| `target_folder` | string | Sti til mappen, hvor repositoriet skal klones |

Værktøjet returnerer et JSON-objekt med:
- `success`: Boolean, der angiver om operationen lykkedes
- `target_folder` eller `error`: Stien til det klonede repositorium eller en fejlmeddelelse

### VS Code Open Tool
`open_in_vscode`-værktøjet åbner en mappe i VS Code eller VS Code Insiders-applikationen.

| Parameter | Type | Beskrivelse |
| --------- | ---- | ----------- |
| `folder_path` | string | Sti til mappen, der skal åbnes |
| `use_insiders` | boolean (valgfri) | Om der skal bruges VS Code Insiders i stedet for almindelig VS Code |

Værktøjet returnerer et JSON-objekt med:
- `success`: Boolean, der angiver om operationen lykkedes
- `message` eller `error`: En bekræftelsesmeddelelse eller en fejlmeddelelse

| Fejlfindingstilstand | Beskrivelse | Trin til fejlfinding |
| ---------- | ----------- | --------------- |
| Agent Builder | Fejlfinding af MCP-serveren i Agent Builder via AI Toolkit. | 1. Åbn VS Code Debug-panelet. Vælg `Debug in Agent Builder` og tryk `F5` for at starte fejlfindingen af MCP-serveren.<br>2. Brug AI Toolkit Agent Builder til at teste serveren med [denne prompt](../../../../../../../../../../../open_prompt_builder). Serveren forbindes automatisk til Agent Builder.<br>3. Klik `Run` for at teste serveren med prompten. |
| MCP Inspector | Fejlfinding af MCP-serveren ved hjælp af MCP Inspector. | 1. Installer [Node.js](https://nodejs.org/)<br>2. Opsæt Inspector: `cd inspector` && `npm install` <br>3. Åbn VS Code Debug-panelet. Vælg `Debug SSE in Inspector (Edge)` eller `Debug SSE in Inspector (Chrome)`. Tryk F5 for at starte fejlfinding.<br>4. Når MCP Inspector åbnes i browseren, klik på `Connect`-knappen for at forbinde denne MCP-server.<br>5. Derefter kan du `List Tools`, vælge et værktøj, indtaste parametre og `Run Tool` for at fejlfinding af din serverkode.<br> |

## Standardporte og tilpasninger

| Fejlfindingstilstand | Porte | Definitioner | Tilpasninger | Bemærk |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Rediger [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) for at ændre ovenstående porte. | N/A |
| MCP Inspector | 3001 (Server); 5173 og 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Rediger [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) for at ændre ovenstående porte.| N/A |

## Feedback

Hvis du har feedback eller forslag til denne skabelon, bedes du oprette en issue på [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritiske oplysninger anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->