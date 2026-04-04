# Weather MCP Server

Ito ay isang sample na MCP Server sa Python na nag-iimplementa ng mga tool sa panahon na may mga mock na tugon. Maaari itong gamitin bilang pundasyon para sa sarili mong MCP Server. Kasama nito ang mga sumusunod na tampok:

- **Weather Tool**: Isang tool na nagbibigay ng mock na impormasyon tungkol sa panahon base sa ibinigay na lokasyon.
- **Connect to Agent Builder**: Isang tampok na nagpapahintulot sa iyo na ikonekta ang MCP server sa Agent Builder para sa pagsubok at pag-debug.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Isang tampok na nagpapahintulot sa iyo na mag-debug ng MCP Server gamit ang MCP Inspector.

## Magsimula gamit ang Weather MCP Server template

> **Mga Kinakailangan**
>
> Upang magpatakbo ng MCP Server sa iyong lokal na dev machine, kakailanganin mo:
>
> - [Python](https://www.python.org/)
> - (*Opsyonal - kung mas gusto mo ang uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ihanda ang kapaligiran

May dalawang paraan para maayos ang kapaligiran para sa proyektong ito. Maaari kang pumili ng alinman batay sa iyong nais.

> Tandaan: I-reload ang VSCode o terminal upang matiyak na ang python ng virtual environment ang gagamitin matapos likhain ang virtual environment.

| Paraan | Mga Hakbang |
| -------- | ----- |
| Paggamit ng `uv` | 1. Gumawa ng virtual environment: `uv venv` <br>2. Patakbuhin ang VSCode Command "***Python: Select Interpreter***" at piliin ang python mula sa nilikhang virtual environment <br>3. I-install ang mga dependencies (kasama ang dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Paggamit ng `pip` | 1. Gumawa ng virtual environment: `python -m venv .venv` <br>2. Patakbuhin ang VSCode Command "***Python: Select Interpreter***" at piliin ang python mula sa nilikhang virtual environment<br>3. I-install ang mga dependencies (kasama ang dev dependencies): `pip install -e .[dev]` |

Pagkatapos maayos ang kapaligiran, maaari mong patakbuhin ang server sa iyong lokal na dev machine gamit ang Agent Builder bilang MCP Client para magsimula:
1. Buksan ang VS Code Debug panel. Piliin ang `Debug in Agent Builder` o pindutin ang `F5` para simulan ang pag-debug ng MCP server.
2. Gamitin ang AI Toolkit Agent Builder upang subukan ang server gamit ang [prompt na ito](../../../../../../../../../../../open_prompt_builder). Awtomatikong ikokonekta ang server sa Agent Builder.
3. I-click ang `Run` upang subukan ang server gamit ang prompt.

**Binabati kita**! Matagumpay mong naipatakbo ang Weather MCP Server sa iyong lokal na dev machine gamit ang Agent Builder bilang MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Ano ang kasama sa template

| Folder / File| Nilalaman                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Mga file ng VSCode para sa pag-debug         |
| `.aitk`      | Mga konfigurasyon para sa AI Toolkit          |
| `src`        | Ang source code para sa weather mcp server    |

## Paano mag-debug ng Weather MCP Server

> Mga Tala:
> - Ang [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ay isang visual na developer tool para sa pagsubok at pag-debug ng mga MCP server.
> - Lahat ng mga debugging mode ay sumusuporta sa mga breakpoint, kaya maaari kang magdagdag ng mga breakpoint sa implementasyon ng code ng tool.

| Mode ng Debug | Paglalarawan | Mga Hakbang para mag-debug |
| ---------- | ----------- | --------------- |
| Agent Builder | I-debug ang MCP server sa Agent Builder gamit ang AI Toolkit. | 1. Buksan ang VS Code Debug panel. Piliin ang `Debug in Agent Builder` at pindutin ang `F5` para simulan ang pag-debug ng MCP server.<br>2. Gamitin ang AI Toolkit Agent Builder upang subukan ang server gamit ang [prompt na ito](../../../../../../../../../../../open_prompt_builder). Awtomatikong ikokonekta ang server sa Agent Builder.<br>3. I-click ang `Run` upang subukan ang server gamit ang prompt. |
| MCP Inspector | I-debug ang MCP server gamit ang MCP Inspector. | 1. I-install ang [Node.js](https://nodejs.org/)<br> 2. I-setup ang Inspector: `cd inspector` && `npm install` <br> 3. Buksan ang VS Code Debug panel. Piliin ang `Debug SSE in Inspector (Edge)` o `Debug SSE in Inspector (Chrome)`. Pindutin ang F5 para simulan ang pag-debug.<br> 4. Kapag nag-launch ang MCP Inspector sa browser, i-click ang button na `Connect` upang ikonekta ang MCP server na ito.<br> 5. Pagkatapos, maaari mong `List Tools`, pumili ng tool, ilagay ang mga parameter, at `Run Tool` upang i-debug ang iyong server code.<br> |

## Mga Default na Port at customizations

| Mode ng Debug | Mga Port | Mga Kahulugan | Mga Customizations | Tala |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | I-edit ang [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) upang baguhin ang mga nabanggit na port. | Wala |
| MCP Inspector | 3001 (Server); 5173 at 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | I-edit ang [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) upang baguhin ang mga nabanggit na port.| Wala |

## Feedback

Kung mayroon kang anumang feedback o mga mungkahi para sa template na ito, mangyaring magbukas ng isyu sa [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:  
Ang dokumentong ito ay isinalin gamit ang AI translation service na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat nagsusumikap kami para sa katumpakan, pakatandaan na ang mga awtomatikong salin ay maaaring maglaman ng mga pagkakamali o di-tumpak na impormasyon. Ang orihinal na dokumento sa sariling wika nito ang dapat ituring na pinagmumulan ng tama. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaintindihan o maling interpretasyon na maaaring lumitaw mula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->