# Weather MCP Server

Dis na sample MCP Server wey dem write for Python wey dey implement weather tools wit mock responses. You fit use am as scaffolding for your own MCP Server. E get dis features:

- **Weather Tool**: Na tool wey dey provide mock weather information based on location wey person give.
- **Connect to Agent Builder**: Feature wey go allow you connect di MCP server to di Agent Builder for testing and debugging.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Feature wey go allow you debug di MCP Server use MCP Inspector.

## Get started with the Weather MCP Server template

> **Prerequisites**
>
> To run di MCP Server for your local dev machine, you go need:
>
> - [Python](https://www.python.org/)
> - (*Optional - if you prefer uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Prepare environment

Dem get two ways wey person fit take set up environment for dis project. You fit choose any one based on how you like am.

> Note: Reload VSCode or terminal make sure say di virtual environment python dey used after you create di virtual environment.

| Approach | Steps |
| -------- | ----- |
| Using `uv` | 1. Create virtual environment: `uv venv` <br>2. Run VSCode Command "***Python: Select Interpreter***" and select di python from di virtual environment wey you create <br>3. Install dependencies (include dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Using `pip` | 1. Create virtual environment: `python -m venv .venv` <br>2. Run VSCode Command "***Python: Select Interpreter***" and select di python from di virtual environment wey you create<br>3. Install dependencies (include dev dependencies): `pip install -e .[dev]` |

After you don set up di environment, you fit run di server for your local dev machine via Agent Builder as di MCP Client start wɛk-wɛk:
1. Open VS Code Debug panel. Select `Debug in Agent Builder` or press `F5` to start debugging di MCP server.
2. Use AI Toolkit Agent Builder take test di server wit [dis prompt](../../../../../../../../../../../open_prompt_builder). Di server go auto-connect to di Agent Builder.
3. Click `Run` to test di server with di prompt.

**Congrats**! You don successfully run di Weather MCP Server for your local dev machine via Agent Builder as di MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Wetin dey inside di template

| Folder / File| Contents                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode files for debugging                   |
| `.aitk`      | Configurations for AI Toolkit                |
| `src`        | Di source code for di weather mcp server    |

## How to debug di Weather MCP Server

> Notes:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) na visual developer tool for testing and debugging MCP servers.
> - All debugging modes dey support breakpoints, so you fit add breakpoints for di tool implementation code.

| Debug Mode | Description | Steps to debug |
| ---------- | ----------- | --------------- |
| Agent Builder | Debug di MCP server for di Agent Builder via AI Toolkit. | 1. Open VS Code Debug panel. Select `Debug in Agent Builder` and press `F5` to start debugging di MCP server.<br>2. Use AI Toolkit Agent Builder to test di server wit [dis prompt](../../../../../../../../../../../open_prompt_builder). Di server go auto-connect to di Agent Builder.<br>3. Click `Run` to test di server wit di prompt. |
| MCP Inspector | Debug di MCP server using MCP Inspector. | 1. Install [Node.js](https://nodejs.org/)<br> 2. Set up Inspector: `cd inspector` && `npm install` <br> 3. Open VS Code Debug panel. Select `Debug SSE in Inspector (Edge)` or `Debug SSE in Inspector (Chrome)`. Press F5 to start debugging.<br> 4. When MCP Inspector open for di browser, click `Connect` button to connect dis MCP server.<br> 5. Then you fit `List Tools`, select tool, enter parameters, and `Run Tool` to debug your server code.<br> |

## Default Ports and customizations

| Debug Mode | Ports | Definitions | Customizations | Note |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) to change dis ports. | N/A |
| MCP Inspector | 3001 (Server); 5173 and 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) to change dis ports.| N/A |

## Feedback

If you get any feedback or suggestions for dis template, abeg open issue for the [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Warning**:  
Dis document na wetin AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator) translate am. Even tho we dey try make am correct, abeg sabi sey machine translation fit get some mistake or no too clear. Di original document for im own language na di main correct one. If na serious matter, e better make human professional translate am. We no go take responsibility if person no understand well or if e misinterpret dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->