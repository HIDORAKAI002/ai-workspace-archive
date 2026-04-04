# Weather MCP Server

Ito ay isang halimbawa ng MCP Server sa Python na nagpapatupad ng mga tool sa panahon gamit ang mga pekeng tugon. Maaari itong gamitin bilang isang balangkas para sa iyong sariling MCP Server. Kasama nito ang mga sumusunod na tampok:

- **Weather Tool**: Isang tool na nagbibigay ng peke o mock na impormasyon tungkol sa panahon batay sa ibinigay na lokasyon.
- **Git Clone Tool**: Isang tool na kumokopya ng isang git repository papunta sa tinukoy na folder.
- **VS Code Open Tool**: Isang tool na nagbubukas ng folder sa VS Code o VS Code Insiders.
- **Connect to Agent Builder**: Isang tampok na nagpapahintulot sa iyo na ikonekta ang MCP server sa Agent Builder para sa pagsubok at pag-debug.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Isang tampok na nagpapahintulot sa iyo na i-debug ang MCP Server gamit ang MCP Inspector.

## Magsimula sa Weather MCP Server template

> **Mga Kinakailangan**
>
> Upang patakbuhin ang MCP Server sa iyong lokal na makina ng pagbuo, kakailanganin mo ang:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Kailangan para sa git_clone_repo tool)
> - [VS Code](https://code.visualstudio.com/) o [VS Code Insiders](https://code.visualstudio.com/insiders/) (Kailangan para sa open_in_vscode tool)
> - (*Opsyonal - kung mas gusto ang uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ihanda ang kapaligiran

May dalawang paraan para i-setup ang kapaligiran para sa proyektong ito. Maaari kang pumili alinman batay sa iyong kagustuhan.

> Paalala: I-reload ang VSCode o terminal upang matiyak na ang virtual environment python ang ginagamit matapos lumikha ng virtual environment.

| Paraan | Mga Hakbang |
| -------- | ----- |
| Paggamit ng `uv` | 1. Gumawa ng virtual environment: `uv venv` <br>2. Patakbuhin ang VSCode Command "***Python: Select Interpreter***" at piliin ang python mula sa nilikhang virtual environment <br>3. I-install ang mga dependencies (kasama ang dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Paggamit ng `pip` | 1. Gumawa ng virtual environment: `python -m venv .venv` <br>2. Patakbuhin ang VSCode Command "***Python: Select Interpreter***" at piliin ang python mula sa nilikhang virtual environment<br>3. I-install ang mga dependencies (kasama ang dev dependencies): `pip install -e .[dev]` | 

Pagkatapos ma-set up ang kapaligiran, maaari mong patakbuhin ang server sa iyong lokal na makina ng pagbuo sa pamamagitan ng Agent Builder bilang MCP Client upang makapagsimula:
1. Buksan ang VS Code Debug panel. Piliin ang `Debug in Agent Builder` o pindutin ang `F5` upang simulan ang pag-debug ng MCP server.
2. Gamitin ang AI Toolkit Agent Builder upang subukan ang server gamit ang [prompt na ito](../../../../../../../../../../../open_prompt_builder). Ang server ay awtomatikong makakakonekta sa Agent Builder.
3. I-click ang `Run` upang subukan ang server gamit ang prompt.

**Binabati kita**! Matagumpay mong naipatakbo ang Weather MCP Server sa iyong lokal na makina ng pagbuo gamit ang Agent Builder bilang MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Ano ang kasama sa template

| Folder / File| Nilalaman                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Mga file ng VSCode para sa pag-debug         |
| `.aitk`      | Mga konfigurasyon para sa AI Toolkit          |
| `src`        | Ang source code para sa weather mcp server    |

## Paano i-debug ang Weather MCP Server

> Mga Tala:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ay isang biswal na developer tool para sa pagsubok at pag-debug ng MCP servers.
> - Lahat ng debugging mode ay sumusuporta sa breakpoints, kaya maaari kang magdagdag ng breakpoints sa code ng tool implementation.

## Mga Available na Tool

### Weather Tool
Ang `get_weather` tool ay nagbibigay ng pekeng impormasyon tungkol sa panahon para sa isang tinukoy na lokasyon.

| Parameter | Uri | Paglalarawan |
| --------- | ---- | ----------- |
| `location` | string | Lokasyon kung saan kukunin ang panahon (halimbawa, pangalan ng lungsod, estado, o coordinates) |

### Git Clone Tool
Ang `git_clone_repo` tool ay kumokopya ng git repository papunta sa isang tinukoy na folder.

| Parameter | Uri | Paglalarawan |
| --------- | ---- | ----------- |
| `repo_url` | string | URL ng git repository na kokopyahin |
| `target_folder` | string | Landas papunta sa folder kung saan dapat ma-kopya ang repository |

Ang tool ay nagbabalik ng isang JSON object na may:
- `success`: Boolean na nagsasaad kung naging matagumpay ang operasyon
- `target_folder` o `error`: Ang landas ng kinopyang repository o isang mensahe ng error

### VS Code Open Tool
Ang `open_in_vscode` tool ay nagbubukas ng isang folder sa VS Code o VS Code Insiders application.

| Parameter | Uri | Paglalarawan |
| --------- | ---- | ----------- |
| `folder_path` | string | Landas papunta sa folder na bubuksan |
| `use_insiders` | boolean (opsyonal) | Kung gagamitin ang VS Code Insiders imbes na regular na VS Code |

Ang tool ay nagbabalik ng isang JSON object na may:
- `success`: Boolean na nagsasaad kung naging matagumpay ang operasyon
- `message` o `error`: Isang kumpirmasyon o mensahe ng error

| Mode ng Debug | Paglalarawan | Mga Hakbang para mag-debug |
| ---------- | ----------- | --------------- |
| Agent Builder | I-debug ang MCP server sa Agent Builder gamit ang AI Toolkit. | 1. Buksan ang VS Code Debug panel. Piliin ang `Debug in Agent Builder` at pindutin ang `F5` upang simulan ang pag-debug ng MCP server.<br>2. Gamitin ang AI Toolkit Agent Builder upang subukan ang server gamit ang [prompt na ito](../../../../../../../../../../../open_prompt_builder). Ang server ay awtomatikong makakakonekta sa Agent Builder.<br>3. I-click ang `Run` upang subukan ang server gamit ang prompt. |
| MCP Inspector | I-debug ang MCP server gamit ang MCP Inspector. | 1. I-install ang [Node.js](https://nodejs.org/)<br> 2. I-setup ang Inspector: `cd inspector` && `npm install` <br> 3. Buksan ang VS Code Debug panel. Piliin ang `Debug SSE in Inspector (Edge)` o `Debug SSE in Inspector (Chrome)`. Pindutin ang F5 upang simulan ang pag-debug.<br> 4. Kapag lumunsad ang MCP Inspector sa browser, i-click ang `Connect` button upang ikonekta ang MCP server na ito.<br> 5. Pagkatapos maaari mong `List Tools`, pumili ng tool, ilagay ang mga parametro, at `Run Tool` upang i-debug ang iyong server code.<br> |

## Mga Default na Port at mga Customization

| Mode ng Debug | Mga Port | Mga Depinisyon | Mga Customization | Tala |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | I-edit ang [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) upang baguhin ang mga port na nabanggit. | Wala |
| MCP Inspector | 3001 (Server); 5173 at 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | I-edit ang [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) upang baguhin ang mga port na nabanggit.| Wala |

## Feedback

Kung mayroon kang anumang puna o mungkahi para sa template na ito, mangyaring magbukas ng isyu sa [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo sa pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami sa katumpakan, pakatandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa kanyang sariling wika ang itinuturing na opisyal na pinagkukunan. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->