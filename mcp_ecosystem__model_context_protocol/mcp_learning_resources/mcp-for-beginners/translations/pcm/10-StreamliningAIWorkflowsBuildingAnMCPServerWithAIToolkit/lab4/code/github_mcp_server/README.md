# Weather MCP Server

Dis na sample MCP Server wey dey Python wey dey implement weather tools wit mock responses. E fit dey used as scaffold for your own MCP Server. E get dis features dem:

- **Weather Tool**: Na tool wey dey provide mocked weather information based on di location wey you give.
- **Git Clone Tool**: Na tool wey dey clone git repository go one specified folder.
- **VS Code Open Tool**: Na tool wey dey open folder for VS Code or VS Code Insiders.
- **Connect to Agent Builder**: Na feature wey allow you connect MCP server to Agent Builder for testing and debugging.
- **Debug for [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Na feature wey allow you debug di MCP Server wit MCP Inspector.

## Get started wit the Weather MCP Server template

> **Prerequisites**
>
> To run di MCP Server for your local dev machine, you go need:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Na wetin di git_clone_repo tool need)
> - [VS Code](https://code.visualstudio.com/) or [VS Code Insiders](https://code.visualstudio.com/insiders/) (Na wetin di open_in_vscode tool need)
> - (*Optional - if you like uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Prepare environment

Two ways dey to set up environment for dis project. You fit choose any wey you like based on your preference.

> Note: Reload VSCode or terminal make sure say di virtual environment python dey used after you create the virtual environment.

| Approach | Steps |
| -------- | ----- |
| Using `uv` | 1. Create virtual environment: `uv venv` <br>2. Run VSCode Command "***Python: Select Interpreter***" and choose di python from di created virtual environment <br>3. Install dependencies (include dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Using `pip` | 1. Create virtual environment: `python -m venv .venv` <br>2. Run VSCode Command "***Python: Select Interpreter***" and choose di python from di created virtual environment<br>3. Install dependencies (include dev dependencies): `pip install -e .[dev]` |

After you don set up di environment, you fit run di server for your local dev machine via Agent Builder as MCP Client to start:
1. Open VS Code Debug panel. Choose `Debug in Agent Builder` or press `F5` to start debugging di MCP server.
2. Use AI Toolkit Agent Builder to test di server wit [dis prompt](../../../../../../../../../../../open_prompt_builder). Di server go auto connect to Agent Builder.
3. Click `Run` to test di server wit di prompt.

**Congrats**! You don successfully run the Weather MCP Server for your local dev machine via Agent Builder as MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Wetin dey inside di template

| Folder / File| Contents                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode files for debugging                   |
| `.aitk`      | Configurations for AI Toolkit                |
| `src`        | The source code for the weather mcp server   |

## How to debug the Weather MCP Server

> Notes:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) na visual developer tool wey dem fit use for testing and debugging MCP servers.
> - All debugging modes dey support breakpoints, so you fit add breakpoints for the tool implementation code.

## Available Tools

### Weather Tool
The `get_weather` tool dey provide mocked weather information for one specified location.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `location` | string | Location wey you wan get weather for (like city name, state, or coordinates) |

### Git Clone Tool
The `git_clone_repo` tool dey clone one git repository go one specified folder.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `repo_url` | string | URL of di git repository wey you wan clone |
| `target_folder` | string | Path to di folder wey di repository go dey cloned |

Di tool go return one JSON object wey get:
- `success`: Boolean wey show if di operation succeed
- `target_folder` or `error`: Di path of di cloned repository or error message

### VS Code Open Tool
The `open_in_vscode` tool dey open folder for VS Code or VS Code Insiders app.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `folder_path` | string | Path to di folder wey you wan open |
| `use_insiders` | boolean (optional) | Whether to use VS Code Insiders instead of normal VS Code |

Di tool go return one JSON object wey get:
- `success`: Boolean wey show if di operation succeed
- `message` or `error`: Confirmation message or error message

| Debug Mode | Description | Steps to debug |
| ---------- | ----------- | --------------- |
| Agent Builder | Debug di MCP server inside Agent Builder via AI Toolkit. | 1. Open VS Code Debug panel. Choose `Debug in Agent Builder` and press `F5` to start debugging di MCP server.<br>2. Use AI Toolkit Agent Builder to test di server wit [dis prompt](../../../../../../../../../../../open_prompt_builder). Di server go auto connect to Agent Builder.<br>3. Click `Run` to test di server wit di prompt. |
| MCP Inspector | Debug di MCP server wit MCP Inspector. | 1. Install [Node.js](https://nodejs.org/)<br> 2. Set up Inspector: `cd inspector` && `npm install` <br> 3. Open VS Code Debug panel. Choose `Debug SSE in Inspector (Edge)` or `Debug SSE in Inspector (Chrome)`. Press F5 to start debugging.<br> 4. When MCP Inspector open for browser, click di `Connect` button to connect dis MCP server.<br> 5. Then you fit `List Tools`, choose tool, put parameters, and `Run Tool` to debug your server code.<br> |

## Default Ports and customizations

| Debug Mode | Ports | Definitions | Customizations | Note |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) to change di ports wey dey up. | N/A |
| MCP Inspector | 3001 (Server); 5173 and 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) to change di ports wey dey up.| N/A |

## Feedback

If you get any feedback or suggestions for dis template, abeg open issue for di [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document dem don translate am wit AI translation service wey dem dey call [Co-op Translator](https://github.com/Azure/co-op-translator). Even as we dey try make am correct well well, make you sabi say automated translations fit get errors or no too clear well. Na di original document for im own language suppose be di main correct one. If na serious matter, make you find professional human translator. We no go responsible if person kon misunderstand or miss the meaning because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->