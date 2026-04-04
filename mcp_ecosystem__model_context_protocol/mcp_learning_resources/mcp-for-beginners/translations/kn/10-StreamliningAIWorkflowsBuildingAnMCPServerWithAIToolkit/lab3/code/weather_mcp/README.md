# ಹವಾಮಾನ MCP ಸರ್ವರ್

ಇದು ಪೈಥನ್‌ನಲ್ಲಿ ಹವಾಮಾನ ಉಪಕರಣಗಳನ್ನು ನಕಲಿ ಪ್ರತಿಕ್ರಿಯೆಗಳೊಂದಿಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸುವ ಮಾದರಿ MCP ಸರ್ವರ್. ನಿಮ್ಮದೇ MCP ಸರ್ವರ್‌ಗೆ ಇದು ಒಂದು scaffolding ಆಗಿ ಬಳಸಬಹುದು. ಇದರಲ್ಲಿ ಕೆಳಗಿನ ವೈಶಿಷ್ಟ್ಯಗಳು ಒಳಗೊಂಡಿವೆ:

- **ಹವಾಮಾನ ಉಪಕರಣ**: ನಿರ್ದಿಷ್ಟ ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ ನಕಲಿ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುವ ಉಪಕರಣ.
- **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ಗೆ ಸಂಪರ್ಕ**: ಪರೀಕ್ಷೆ ಮತ್ತು ಡಿಬಗ್ ಮಾಡಲು MCP ಸರ್ವರ್ ಅನ್ನು ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ಗೆ ಸಂಪರ್ಕಿಸುವ ವೈಶಿಷ್ಟ್ಯ.
- **[MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್](https://github.com/modelcontextprotocol/inspector) ನಲ್ಲಿ ಡಿಬಗ್ ಮಾಡುವುದು**: MCP ಸರ್ವರ್ ಅನ್ನು MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ ಡಿಬಗ್ ಮಾಡಲು ಅವಕಾಶ ನೀಡುವ ವೈಶಿಷ್ಟ್ಯ.

## ಹವಾಮಾನ MCP ಸರ್ವರ್ ಟೆಂಪ್ಲೇಟ್ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ

> **ಹೆಚ್ಚಿನ ಅವಶ್ಯತೆಗಳು**
>
> ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೆವ್ ಯಂತ್ರದಲ್ಲಿ MCP ಸರ್ವರ್ ಅನ್ನು ನಡೆಸಲು ನೀವು ಸಹಾಯವಾಗಬೇಕಾಗಿರುವವುಗಳು:
>
> - [Python](https://www.python.org/)
> - (*ಐಚ್ಛಿಕ - ನೀವು uv ಅನ್ನು ಇಷ್ಟಪಡುವಲ್ಲಿ*) [uv](https://github.com/astral-sh/uv)
> - [Python ಡಿಬಗರ್ ವಿಸ್ತರಣೆ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ಪರಿಸರ ಸಜ್ಜುಗೊಳಿಸುವುದು

ಈ ಯೋಜನೆಗಾಗಿ ಪರಿಸರವನ್ನು ಸಂಯೋಜಿಸಲು ಎರಡು ವಿಧಾನಗಳಿವೆ. ನಿಮ್ಮ ಇಷ್ಟದ ಆಧಾರದ ಮೇಲೆ ಯಾವುದಾದರೂ ಒಂಭತ್ತನ್ನು ಆಯ್ಕೆಮಾಡಬಹುದು.

> ಟಿಪ್ಪಣಿ: ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸಿದ ನಂತರ VSCode ಅಥವಾ ಟರ್ಮಿನಲ್ ಅನ್ನು ಮರುಲೋಡ್ ಮಾಡಿ, ವರ್ಚುವಲ್ ಪರಿಸರದ ಪೈಥಾನ್ ಬಳಸಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.

| ವಿಧಾನ | ಹಂತಗಳು |
| -------- | ----- |
| `uv` ಬಳಕೆ | 1. ವರ್ಚುವಲ್ ಪರಿಸರ ರಚಿಸಿ: `uv venv` <br>2. VSCode ಆಜ್ಞೆ "***Python: Select Interpreter***" ಅನ್ನು ರನ್ ಮಾಡಿ ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದ ಪೈಥಾನ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ <br>3. ಅವಲಂಬನೆಗಳನ್ನು (ಡೆವ್ ಅವಲಂಬನೆಗಳು ಸೇರಿ) ಸ್ಥಾಪಿಸಿ: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ಬಳಕೆ | 1. ವರ್ಚುವಲ್ ಪರಿಸರ ರಚಿಸಿ: `python -m venv .venv` <br>2. VSCode ಆಜ್ಞೆ "***Python: Select Interpreter***" ಅನ್ನು ರನ್ ಮಾಡಿ ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದ ಪೈಥಾನ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ<br>3. ಅವಲಂಬನೆಗಳನ್ನು (ಡೆವ್ ಅವಲಂಬನೆಗಳು ಸೇರಿ) ಸ್ಥಾಪಿಸಿ: `pip install -e .[dev]` |

ಪರಿಸರವನ್ನು ಸಿದ್ಧಪಡಿಸಿದ ನಂತರ, ನೀವು ಸ್ಥಳೀಯ ಡೆವ್ ಯಂತ್ರದಲ್ಲಿ Agent Builder ಮೂಲಕ MCP ಕ್ಲೈಂಟ್ ಆಗಿ ಸರ್ವರ್ ಅನ್ನು ಚಾಲನೆ ಮಾಡಬಹುದು:
1. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಿಸಲು `F5` ಒತ್ತಿ.
2. AI Toolkit Agent Builder ಬಳಸಿ ಈ [ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ಜೊತೆ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ಗೆ ಸಂಪರ್ಕವಾಗುತ್ತದೆ.
3. ಪ್ರಾಂಪ್ಟ್ ಬಳಸಿ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ.

**ಅಭಿನಂದನೆಗಳು**! ನೀವು Agent Builder ಮೂಲಕ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೆವ್ ಯಂತ್ರದಲ್ಲಿ MCP ಕ್ಲೈಂಟ್ ಆಗಿ ಯಶಸ್ವಿಯಾಗಿ ಹವಾಮಾನ MCP ಸರ್ವರ್ ಅನ್ನು ನಡೆಸಿದ್ದೀರಿ.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ಟೆಂಪ್ಲೇಟಿನಲ್ಲಿ ಏನು ಸೇರಿಸಲಾಗಿದೆ

| ಫೋಲ್ಡರ್ / ಫೈಲ್ | ವಿಷಯಗಳು                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | ಡಿಬಗಿಂಗ್‌ಗಾಗಿ VSCode ಫೈಲ್ಗಳು                    |
| `.aitk`      | AI Toolkit ನಡವಳಿಕೆಗಳು                            |
| `src`        | ಹವಾಮಾನ MCP ಸರ್ವರ್ ಸ്രೋತ ಕೋಡ್               |

## ಹವಾಮಾನ MCP ಸರ್ವರ್ ಅನ್ನು ಡಿಬಗ್ ಮಾಡುವ ವಿಧಾನ

> ಟಿಪ್ಪಣಿಗಳು:
> - [MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್](https://github.com/modelcontextprotocol/inspector) MCP ಸರ್ವರ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ, ಡಿಬಗ್ ಮಾಡಲು ದೃಶ್ಯತಾತ್ಮಿಕ ಡೆವಲಪರ್ ಟೂಲಾಗಿದೆ.
> - ಎಲ್ಲಾ ಡಿಬಗ್ ಮೋಡ್ಗಳು ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ, ಆದ್ದರಿಂದ ನೀವು ಉಪಕರಣಗಳ ಅನುಷ್ಠಾನ ಕೋಡ್‌ಗೆ ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸೇರಿಸಬಹುದು.

| ಡಿಬಗ್ ಮೋಡ್ | ವಿವರಣೆ | ಡಿಬಗ್ ಮಾಡಲು ಹಂತಗಳು |
| ---------- | ----------- | --------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | AI Toolkit ಮೂಲಕ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ನಲ್ಲಿ MCP ಸರ್ವರ್ ಅನ್ನು ಡಿಬಗ್ ಮಾಡಿ. | 1. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಲು `F5` ಒತ್ತಿ.<br>2. AI Toolkit Agent Builder ಬಳಸಿ ಈ [ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ಜೊತೆಗೆ ಸರ್ವರ್ ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ಗೆ ಸಂಪರ್ಕವಾಗುತ್ತದೆ.<br>3. ಪ್ರಾಂಪ್ಟ್ ಜೊತೆ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ. |
| MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್ | MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಬಳಸಿ MCP ಸರ್ವರ್ ಅನ್ನು ಡಿಬಗ್ ಮಾಡಿ. | 1. [Node.js](https://nodejs.org/) ಅನ್ನು ಸ್ಥಾಪಿಸಿ<br> 2. ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಸಜ್ಜುಗೊಳಿಸಿ: `cd inspector` && `npm install` <br> 3. VS Code ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug SSE in Inspector (Edge)` ಅಥವಾ `Debug SSE in Inspector (Chrome)` ಆಯ್ಕೆ ಮಾಡಿ. ಡಿಬಗ್ ಪ್ರಾರಂಭಿಸಲು `F5` ಒತ್ತಿ.<br> 4. ಬ್ರೌಸರ್‌ನಲ್ಲಿ MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಆರಂಭವಾದಾಗ, ಈ MCP ಸರ್ವರ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಲು `Connect` ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.<br> 5. ನಂತರ ನೀವು `List Tools` ಮಾಡಿ, ಟೂಲ್ ಆಯ್ಕೆ ಮಾಡಿ, ಪರಾಮರ್ಶೆಗಳನ್ನು ನಮೂದಿಸಿ, ಮತ್ತು `Run Tool` ಆಯ್ಕೆ ಮಾಡಿ ನಿಮ್ಮ ಸರ್ವರ್ ಕೋಡ್ ಡಿಬಗ್ ಮಾಡಬಹುದು.<br> |

## ಡೀಫಾಲ್ಟ್ ಪೋರ್ಟ್‌ಗಳು ಮತ್ತು ಕಸ್ಟಮೈಜೆಶನ್

| ಡಿಬಗ್ ಮೋಡ್ | ಪೋರ್ಟ್‌ಗಳು | ವ್ಯಾಖ್ಯಾನಗಳು | ಕಸ್ಟಮೈಜ್ | ಟಿಪ್ಪಣಿ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ಮೇಲಿನ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ಸಂಪಾದಿಸಿ. | ಲಭ್ಯವಿಲ್ಲ |
| MCP ಇನ್‌ಸ್ಪೆಕ್ಟರ್ | 3001 (ಸರ್ವರ್); 5173 ಮತ್ತು 3000 (ಇನ್‌ಸ್ಪೆಕ್ಟರ್) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ಮೇಲಿನ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ಸಂಪಾದಿಸಿ.| ಲಭ್ಯವಿಲ್ಲ |

## ಪ್ರತಿಕ್ರಿಯೆ

ಈ ಟೆಂಪ್ಲೇಟ್ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆ ಅಥವಾ ಸಲಹೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು [AI Toolkit GitHub ಸಂಗ್ರಹಣೆಯಲ್ಲಿ](https://github.com/microsoft/vscode-ai-toolkit/issues) ವಿಷಯವನ್ನು ತೆರೆಯಿರಿ.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ನಿರಾಖರಣೆ**:  
ಈ ದಸ್ತಾವೇಜು [Co-op Translator](https://github.com/Azure/co-op-translator) ಎಂಬ AI ಅನುವಾದ ಸೇವೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ಶುದ್ಧತೆಯನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡರೂ ಸಹ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪುಗಳು ಅಥವಾ ಅಸಂಬದ್ಧತೆಗಳು ಇರುವ ಸಾಧ್ಯತೆ ಇದೆ ಎಂದು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ಭಾಷೆಯ ದಸ್ತಾವೇಜು ಅಧಿಕೃತ ಮೂಲವಾಗಿದ್ದು ಅದನ್ನೇ ಆಧಾರವಾಗಿ ಪರಿಗಣಿಸಿ. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ ವೃತ್ತಿಪರ ಮಾನವರ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದ ಬಳಕೆಯಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅಭಿವ್ಯಕ್ತಿಗಳು ಅಥವಾ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವಿಕೆಗೆ ನಾವು ಜವಾಬ್ದಾರಿಯಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->