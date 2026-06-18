# Weather MCP ಸರ್ವರ್

Python ನಲ್ಲಿ ನಿರ್ಮಿಸಿರುವ ಇದು ಮೋಕ್ ಪ್ರತಿಕ್ರಿಯೆಗಳೊಂದಿಗೆ ಹವಾಮಾನ ಉಪಕರಣಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿರುವ ಒಂದು ಮಾದರಿ MCP ಸರ್ವರ್ ಆಗಿದೆ. ನಿಮ್ಮದೇ MCP ಸರ್ವರ್ ಗೆ ಇದು ಶಿಲ್ಪಿಯಾಗಿ ಬಳಸಬಹುದು. ಇದರಲ್ಲಿ ಕೆಳಗಿನ ವೈಶಿಷ್ಟ್ಯಗಳಿವೆ: 

- **ಹವಾಮಾನ ಉಪಕರಣ**: ನೀಡಲಾದ ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ ಮೋಕ್ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುವ ಉಪಕರಣ.
- **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ**: ಪರೀಕ್ಷೆ ಹಾಗೂ ಡಿಬಗ್ ಮಾಡಲು MCP ಸರ್ವರ್ ಅನ್ನು ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕಿಸುವ ವೈಶಿಷ್ಟ್ಯ.
- **[MCP ಇನ್ಸ್pector](https://github.com/modelcontextprotocol/inspector) ನಲ್ಲಿ ಡಿಬಗ್ ಮಾಡುವುದು**: MCP ಸರ್ವರ್ ಅನ್ನು MCP ಇನ್ಸ್pector ಬಳಸಿ ಡಿಬಗ್ ಮಾಡಲು ಈ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಬಳಸಿಕೊಳ್ಳಬಹುದು.

## Weather MCP ಸರ್ವರ್ ಟೆಂಪ್ಲೇಟ್ ಪಡೆದಿರಿ

> **ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು**
>
> ನಿಮ್ಮ ಸ್ಥಳೀಯ ಅಭಿವೃದ್ಧಿ ಯಂತ್ರದಲ್ಲಿ MCP ಸರ್ವರ್ ಓಡಿಸಲು ನಿಮಗೆ ಬೇಕಾಗಿರುವವುಗಳು:
>
> - [Python](https://www.python.org/)
> - (*ಆಯ್ಕೆಗಳು - ನೀವು uv ಅನ್ನು ಇಚ್ಛಿಸಿದರೆ*) [uv](https://github.com/astral-sh/uv)
> - [Python ಡಿಬಗರ್ ವಿಸ್ತರಣೆ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ಪರಿಸರವನ್ನು ಸಿದ್ಧಪಡಿಸಿ

ಈ ಯೋಜನೆಗೆ ಪರಿಸರವನ್ನು ಸಿದ್ಧಗೊಳಿಸಲು ಎರಡು ವಿಧಾನಗಳಿವೆ. ನಿಮ್ಮ ಆಯ್ಕೆಯ ಪ್ರಕಾರ ಯಾವುದೇ ಒಂದು ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಬಹುದು.

> ಟಿಪ್: ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸಿದ ನಂತರ, ನಿಮ್ಮ VSCode ಅಥವಾ ಟರ್ಮಿನಲ್ ರೀಲುಡ್ ಮಾಡಿ, ವರ್ಚುವಲ್ ಪರಿಸರದ ಪೈಥಾನ್ ಬಳಸಲ್ಪಡುತ್ತಿದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.

| ವಿಧಾನ | ಹಂತಗಳು |
| -------- | ----- |
| `uv` ಬಳಸಿ | 1. ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸಿ: `uv venv` <br>2. VSCode ಆಜ್ಞೆ ಪ್ರಮಾಣೀಕೃತಪಡಿಸಿ "***Python: Select Interpreter***" ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದಿಂದ ಪೈಥಾನ್ ಆಯ್ಕೆಮಾಡಿ <br>3. ಡಿಪೆಂಡೆನ್ಸಿಗಳನ್ನು (डेವ್ ಡಿಪೆಂಡೆನ್ಸಿ ಸೇರಿ) ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ಬಳಸಿ | 1. ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸಿ: `python -m venv .venv` <br>2. VSCode ಆಜ್ಞೆ ಪ್ರಮಾಣೀಕೃತಪಡಿಸಿ "***Python: Select Interpreter***" ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದಿಂದ ಪೈಥಾನ್ ಆಯ್ಕೆಮಾಡಿ<br>3. ಡಿಪೆಂಡೆನ್ಸಿಗಳನ್ನು (डेव್ ಡಿಪೆಂಡೆನ್ಸಿ ಸೇರಿ) ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ: `pip install -e .[dev]` | 

ಪರಿಸರ ಸಿದ್ಧಗೊಂಡ ನಂತರ, ನಿಮ್ಮ ಸ್ಥಳೀಯ ಅಭಿವೃದ್ಧಿ ಯಂತ್ರದಲ್ಲಿ Agent Builder ಮೂಲಕ MCP ಕ್ಲೈಂಟ್ ಆಗಿ ಸರ್ವರ್ ಅನ್ನು ಹೀಗೆ ಚಾಲನೆ ಮಾಡಬಹುದು:
1. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ `F5` ಒತ್ತಿ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಪ್ರಾರಂಭಿಸಲು.
2. Microsoft Foundry Toolkit Agent Builder ಬಳಸಿ [ಈ ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ಮೂಲಕ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕವಾಗುತ್ತದೆ.
3. ಪ್ರಾಂಪ್ಟ್ ಬಳಸಿ ಸರ್ವರ್ ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ.

**ಅಭಿನಂದನೆಗಳು**! ನೀವು ಯಶಸ್ವಿಯಾಗಿ Agent Builder ಮೂಲಕ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಯಂತ್ರದಲ್ಲಿ Weather MCP ಸರ್ವರ್ ಅನ್ನು MCP ಕ್ಲೈಂಟ್ ಆಗಿ ಚಾಲನೆ ಮಾಡಿದ್ದೀರಿ.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ಟೆಂಪ್ಲೇಟ್ ನಲ್ಲಿ ಏನಿದೆ

| ಫೋಲ್ಡರ್ / ಫೈಲ್| ಒಳಗೊಂಡದ್ದು                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | ಡಿಬಗ್ ಮಾಡಲು VSCode ಫೈಲ್‌ಗಳು                  |
| `.aitk`      | Microsoft Foundry Toolkit ಕಾಗದಕಟ್ಟುಗಳು                |
| `src`        | ಹವಾಮಾನ MCP ಸರ್ವರ್ ಮೂಲ ಕೋಡ್                    |

## Weather MCP ಸರ್ವರ್ ಅನ್ನು ಹೇಗೆ ಡಿಬಗ್ ಮಾಡುವುದು

> ಗಮನಿಸಿ:
> - [MCP ಇನ್ಸ್pector](https://github.com/modelcontextprotocol/inspector) MCP ಸರ್ವರ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸುವ ಮತ್ತು ಡಿಬಗ್ ಮಾಡುವ ದೃಶ್ಯ ಡೆವಲಪರ್ ಉಪಕರಣ.
> - ಎಲ್ಲಾ ಡಿಬಗ್ ಮೋಡ್‌ಗಳು ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ, ಆದ್ದರಿಂದ ನೀವು ಉಪಕರಣ ಇಂಪ್ಲಿಮೆಂಟೇಶನ್ ಕೋಡ್‌ಗೆ ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್ ಸೇರಿಸಬಹುದು.

| ಡಿಬಗ್ ಮೋಡ್ | ವಿವರಣೆ | ಡಿಬಗ್ ಮಾಡುವ ಹಂತಗಳು |
| ---------- | ----------- | --------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | Microsoft Foundry Toolkit ಮೂಲಕ Agent Builder ನಲ್ಲಿ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಿ. | 1. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು MCP ಸರ್ವರ್ ಡಿಬಗ್ ಪ್ರಾರಂಭಿಸಲು `F5` ಒತ್ತಿರಿ.<br>2. Microsoft Foundry Toolkit Agent Builder ಬಳಸಿ [ಈ ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ಮೂಲಕ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕವಾಗುತ್ತದೆ.<br>3. ಪ್ರಾಂಪ್ಟ್ ಮೂಲಕ ಸರ್ವರ್ ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ. |
| MCP ಇನ್ಸ್pector | MCP ಇನ್ಸ್pector ಬಳಸಿ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡುವುದು. | 1. [Node.js](https://nodejs.org/) ಅನ್ನು ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ<br> 2. ಇನ್ಸ್pector ಸಜ್ಜುಗೊಳಿಸಿ: `cd inspector` && `npm install` <br> 3. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug SSE in Inspector (Edge)` ಅಥವಾ `Debug SSE in Inspector (Chrome)` ಆಯ್ಕೆ ಮಾಡಿ. ಡಿಬಗ್ ಪ್ರಾರಂಭಿಸಲು `F5` ಒತ್ತಿರಿ.<br> 4. MCP ಇನ್ಸ್pector ಬ್ರೌಸರಿನಲ್ಲಿ ತೆರೆದಾಗ, `Connect` ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಈ MCP ಸರ್ವರ್ ಗೆ ಸಂಪರ್ಕಿಸಿರಿ.<br> 5. ನೀವು ಈಗ `List Tools` ಮಾಡಬಹುದು, ಉಪಕರಣ ಆಯ್ಕೆ ಮಾಡಿ, ಪ್ಯಾರಾಮೀಟರ್ ಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸರ್ವರ್ ಕೋಡ್ ಡಿಬಗ್ ಮಾಡಲು `Run Tool` ಕ್ಲಿಕ್ ಮಾಡಿ.<br> |

## ಡಿಫಾಲ್ಟ್ ಪೋರ್ಟ್‌ಗಳು ಮತ್ತು ಕಸ್ಟಮೈಜೇಷನ್‌ಗಳು

| ಡಿಬಗ್ ಮೋಡ್ | ಪೋರ್ಟ್‌ಗಳು | ವ್ಯಾಖ್ಯಾನಗಳು | ಕಸ್ಟಮೈಜೇಷನ್ಗಳು | ಟಿಪ್ಪಣಿ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ಮೇಲಿನ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ಸಂಪಾದಿಸಿ | ಇಲ್ಲಿದೆ |
| MCP ಇನ್ಸ್pector | 3001 (ಸರ್ವರ್); 5173 ಮತ್ತು 3000 (ಇನ್ಸ್pector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ಮೇಲಿನ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ಸಂಪಾದಿಸಿ | ಇಲ್ಲಿದೆ |

## ಪ್ರತಿಕ್ರಿಯೆ

ನೀವು ಈ ಟೆಂಪ್ಲೇಟ್ಗೆ ಪ್ರತಿಕ್ರಿಯೆ ಅಥವಾ ಶಿಫಾರಸುಗಳನ್ನು ಹೊಂದಿದ್ದರೆ, ದಯವಿಟ್ಟು [Microsoft Foundry Toolkit GitHub ರೆಪೋ](https://github.com/microsoft/vscode-ai-toolkit/issues) ನಲ್ಲಿ ಸಮಸ್ಯೆಯನ್ನು ತೆರೆಯಿರಿ.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->