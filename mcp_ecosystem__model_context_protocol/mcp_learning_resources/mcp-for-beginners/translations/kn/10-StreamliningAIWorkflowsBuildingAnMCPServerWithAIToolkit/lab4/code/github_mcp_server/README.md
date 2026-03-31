# ಹವಾಮಾನ MCP ಸರ್ವರ್

ಇದು Python ನಲ್ಲಿ ನುಡಿವ MCP ಸರ್ವರ್ ಉದಾಹರಣೆ ಆಗಿದ್ದು ಹವಾಮಾನ ಉಪಕರಣಗಳನ್ನು ನಕಲಿ ಪ್ರತಿಕ್ರಿಯೆಗಳೊಂದಿಗೆ ಅನುಷ್ಠಾನಗೊಳಿಸಿದೆ. ಇದು ನಿಮ್ಮ ಸ್ವಂತ MCP ಸರ್ವರ್ ಗೆ ಮೈರುಪೂರೈಸುವಿಗಾಗಿ ಬಳಸಬಹುದು. ಇದರಲ್ಲಿ ಕೆಳಗಿನ ವೈಶಿಷ್ಟ್ಯಗಳಿವೆ:

- **ಹವಾಮಾನ ಉಪಕರಣ**: ನೀಡಲಾದ ಸ್ಥಳದ ಆಧಾರದಲ್ಲಿ ನಕಲಿ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುವ ಉಪಕರಣ.
- **Git Clone ಉಪಕರಣ**: ಒಂದು git ರೆಪೊಸಿಟೋರಿಯನ್ನು ನಿರ್ದಿಷ್ಟ ಫೋಲ್ಡರ್ ಗೆ ಕ್ಲೋನ್ ಮಾಡುವ ಉಪಕರಣ.
- **VS ಕೋಡ್ ಓಪನ್ ಉಪಕರಣ**: VS ಕೋಡ್ ಅಥವಾ VS ಕೋಡ್ ಇನ್ಸೈಡರ್ಸ್ ನಲ್ಲಿ ಒಂದು ಫೋಲ್ಡರ್ ತೆರೆಯುವ ಉಪಕರಣ.
- **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕ ಹೊಂದು**: ಪರೀಕ್ಷೆ ಮತ್ತು ದೋಷಾರೋಪಣೆಗೆ MCP ಸರ್ವರ್ ಅನ್ನು ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕಿಸುವ ವೈಶಿಷ್ಟ್ಯ.
- **[MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್](https://github.com/modelcontextprotocol/inspector) ನಲ್ಲಿ ಡಿಬಗ್ ಮಾಡಿ**: MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಬಳಸಿ MCP ಸರ್ವರ್ ಅನ್ನು ಡಿಬಗ್ ಮಾಡಲು ಅವಕಾಶ.

## ಹವಾಮಾನ MCP ಸರ್ವರ್ ಟೆಂಪ್ಲೇಟ್ ಜೊತೆಗೆ ಪ್ರಾರಂಭಿಸಿ

> **ಪೂರ್ವಾಂಶಗಳು**
>
> ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೆವ್ ಮಷೀನ್ ನಲ್ಲಿ MCP ಸರ್ವರ್ ಓಡಿಸಲು, ನಿಮಗೆ ಅಗತ್ಯವಿದೆ:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo ಟೂಲ್ ಗೆ ಅಗತ್ಯವಿದೆ)
> - [VS ಕೋಡ್](https://code.visualstudio.com/) ಅಥವಾ [VS ಕೋಡ್ ಇನ್ಸೈಡರ್ಸ್](https://code.visualstudio.com/insiders/) (open_in_vscode ಟೂಲ್ ಗೆ ಅಗತ್ಯವಿದೆ)
> - (*ಐಚ್ಛಿಕ - ನೀವು uv ಅನ್ನು ಇಷ್ಟಪಡಿಸಿದರೆ*) [uv](https://github.com/astral-sh/uv)
> - [Python ಡಿಬಗರ್ ವಿಸ್ತರಣೆ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ಪರಿಸರವನ್ನು ಸಿದ್ಧಪಡಿಸಿ

ಈ proiect ಗೆ ಪರಿಸರವನ್ನು ಸೆಟ್ ಮಾಡಲು ಎರಡು ವಿಧಾನಗಳಿವೆ. ನಿಮ್ಮ ಇಚ್ಛೆಯ ಆಧಾರಕ್ಕೆ ಯಾವುದೇ ಒಂದು ಆಯ್ಕೆಮಾಡಬಹುದು.

> ಗಮನಿಸಿ: ವರ್ಚುವಲ್ ಪರಿಸರವನ್ನು ರಚಿಸುವ ನಂತರ VSCode ಅಥವಾ ಟರ್ಮಿನಲ್ ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸಿ ώστε ವರ್ಚುವಲ್ ಪರಿಸರದ Python ಬಳಸಲಾಗುವುದಾಗಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.

| ವಿಧಾನ | ಹಂತಗಳು |
| -------- | ----- |
| `uv` ಬಳಸಿ | 1. ವರ್ಚುವಲ್ ಪರಿಸರ ರಚಿಸಿ: `uv venv` <br>2. VSCode ಆಜ್ಞೆಯನ್ನು "*Python: Select Interpreter*" ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದ Python ಆಯ್ಕೆಮಾಡಿ <br>3. ಅವಶ್ಯಕತೆಗಳನ್ನು (ಡೆವ್ ಅವಶ್ಯಕತೆಗಳು ಸಹಿತ) ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ಬಳಸಿ | 1. ವರ್ಚುವಲ್ ಪರಿಸರ ರಚಿಸಿ: `python -m venv .venv` <br>2. VSCode ಆಜ್ಞೆಯನ್ನು "*Python: Select Interpreter*" ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ರಚಿಸಿದ ವರ್ಚುವಲ್ ಪರಿಸರದ Python ಆಯ್ಕೆಮಾಡಿ<br>3. ಅವಶ್ಯಕತೆಗಳನ್ನು (ಡೆವ್ ಅವಶ್ಯಕತೆಗಳು ಸಹಿತ) ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ: `pip install -e .[dev]` | 

ಪರಿಸರವನ್ನು ಸಿದ್ಧಪಡಿಸಿದ ನಂತರ, ನೀವು ಈ ಕೆಳಗಿನಂತೆ Agent Builder ಮೂಲಕ MCP ಕ್ಲೈಂಟ್ ನಂತೆ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೆವ್ ಮಷೀನ್ ನಲ್ಲಿ ಸರ್ವರ್ ಅನ್ನು ಚಾಲನೆ ಮಾಡಬಹುದು:
1. VS ಕೋಡ್ ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಲು `F5` ಒತ್ತಿ.
2. AI Toolkit Agent Builder ಬಳಸಿ [ಈ ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ನಲ್ಲಿ ಸರ್ವರ್ ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕ ಹೊಂದುತ್ತದೆ.
3. ಪ್ರಾಂಪ್ಟ್ ನೊಂದಿಗೆ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ.

**অಭಿನಂದನೆಗಳು**! ನೀವು ಯಶಸ್ವಿಯಾಗಿ Agent Builder ಮೂಲಕ MCP ಕ್ಲೈಂಟ್ ಆಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೆವ್ ಮಷೀನ್ ನಲ್ಲಿ ಹವಾಮಾನ MCP ಸರ್ವರ್ ಅನ್ನು ಚಾಲನೆಮಾಡಿದ್ದೀರಿ.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ಟೆಂಪ್ಲೇಟಿನಲ್ಲಿ ಏನು ಸೇರಿಸಲಾಗಿದೆ

| ಫೋಲ್ಡರ್ / ಫೈಲ್| ಅಂಶಗಳು                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ಡಿಬಗ್ಗಿಂಗ್ ಗಾಗಿ VSCode ಫೈಲ್‌ಗಳು                   |
| `.aitk`      | AI Toolkit ಗಾಗಿ ಸಂರಚನೆಗಳು                |
| `src`        | ಹವಾಮಾನ mcp ಸರ್ವರ್ ನ ಮೂಲ ಕೋಡ್   |

## ಹವಾಮಾನ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡುವ ವಿಧಾನ

> ಗಮನಗಳು:
> - [MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್](https://github.com/modelcontextprotocol/inspector) MCP ಸರ್ವರ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸುವ ಮತ್ತು ಡಿಬಗ್ ಮಾಡುವ ದೃಶ್ಯ ಕಾರ್ಖಾನಾಗಾರ ಉಪಕರಣ.
> - ಎಲ್ಲಾ ಡಿಬಗ್ ಮೋಡ್‌ಗಳು ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ, ಆದ್ದರಿಂದ ನೀವು ಉಪಕರಣ ಅನುಷ್ಠಾನ ಕೋಡ್‌ಗೆ ಬ್ರೇಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸೇರಿಸಬಹುದು.

## ಲಭ್ಯವಿರುವ ಉಪಕರಣಗಳು

### ಹವಾಮಾನ ಉಪಕರಣ
`get_weather` ಉಪಕರಣವು ನಿರ್ದಿಷ್ಟ ಸ್ಥಳಕ್ಕಾಗಿ ನಕಲಿ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ.

| ಪ್ಯಾರಾಮೀಟರ್ | ಪ್ರಕಾರ | ವಿವರಣೆ |
| --------- | ---- | ----------- |
| `location` | string | ಹವಾಮಾನ ಪಡೆಯಬೇಕಾದ ಸ್ಥಳ (ಉದಾ: ನಗರ ಹೆಸರು, ರಾಜ್ಯ, ಅಥವಾ ಸಂಯೋಜನೆಗಳು) |

### Git Clone ಉಪಕರಣ
`git_clone_repo` ಉಪಕರಣವು git ರೆಪೊಸಿಟೋರಿಯನ್ನು ನಿರ್ದಿಷ್ಟ ಫೋಲ್ಡರ್ ಗೆ ಕ್ಲೋನ್ ಮಾಡುತ್ತದೆ.

| ಪ್ಯಾರಾಮೀಟರ್ | ಪ್ರಕಾರ | ವಿವರಣೆ |
| --------- | ---- | ----------- |
| `repo_url` | string | ಕ್ಲೋನ್ ಮಾಡಬೇಕಾದ git ರೆಪೊಸಿಟೋರಿಯ URL |
| `target_folder` | string | ರೆಪೊಸಿಟೋರಿಯನ್ನು ಕ್ಲೋನ್ ಮಾಡಬೇಕಾದ ಫೋಲ್ಡರ್ ಮಾರ್ಗ |

ಉಪಕರಣವು ಹೇಗಿದೆ ಎಂಬುದರ JSON ವಸ್ತುವನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:
- `success`: ಕಾರ್ಯವೇ ಯಶಸ್ವಿಯಾಗಿದೆಯೇ ಎಂಬ ಬೂಲಿಯನ್ ಸೂಚನೆ
- `target_folder` ಅಥವಾ `error`: ಕ್ಲೋನ್ ಮಾಡಲಾದ ರೆಪೊಸಿಟೋರಿಯ ಮಾರ್ಗ ಅಥವಾ ದೋಷ ಸಂದೇಶ

### VS ಕೋಡ್ ಓಪನ್ ಉಪಕರಣ
`open_in_vscode` ಉಪಕರಣವು VS ಕೋಡ್ ಅಥವಾ VS ಕೋಡ್ ಇನ್ಸೈಡರ್ಸ್ ಅಪ್ಲಿಕೇಶನ್ ನಲ್ಲಿ ಫೋಲ್ಡರ್ ತೆರೆಯುತ್ತದೆ.

| ಪ್ಯಾರಾಮೀಟರ್ | ಪ್ರಕಾರ | ವಿವರಣೆ |
| --------- | ---- | ----------- |
| `folder_path` | string | ತೆರೆಯಬೇಕಾದ ಫೋಲ್ಡರ್ ಮಾರ್ಗ |
| `use_insiders` | boolean (ಐಚ್ಛಿಕ) | ಸಾಮಾನ್ಯ VS ಕೋಡ್ ಬದಲು VS ಕೋಡ್ ಇನ್ಸೈಡರ್ಸ್ ಬಳಸಬೇಕೆಂಬುದು |

ಉಪಕರಣವು JSON ವಸ್ತು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:
- `success`: ಕಾರ್ಯವು ಯಶಸ್ವಿಯಾಗಿದೆಯೇ ಎಂಬ ಬೂಲಿಯನ್ ಸೂಚನೆ
- `message` ಅಥವಾ `error`: ದೃಢೀಕರಣ ಸಂದೇಶ ಅಥವಾ ದೋಷ ಸಂದೇಶ

| ಡಿಬಗ್ ಮೋಡ್ | ವಿವರಣೆ | ಡಿಬಗ್ ಮಾಡಲು ಹಂತಗಳು |
| ---------- | ----------- | --------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | AI Toolkit ಮೂಲಕ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ನಲ್ಲಿ MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಿ. | 1. VS ಕೋಡ್ ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug in Agent Builder` ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಲು `F5` ಒತ್ತಿ.<br>2. AI Toolkit Agent Builder ಬಳಸಿ [ಈ ಪ್ರಾಂಪ್ಟ್](../../../../../../../../../../../open_prompt_builder) ನಲ್ಲಿ ಸರ್ವರ್ ಪರೀಕ್ಷಿಸಿ. ಸರ್ವರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಗೆ ಸಂಪರ್ಕ ಹೊಂದುತ್ತದೆ.<br>3. ಪ್ರಾಂಪ್ಟ್ ನೊಂದಿಗೆ ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಲು `Run` ಕ್ಲಿಕ್ ಮಾಡಿ. |
| MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್ | MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಬಳಸಿಕೊಂಡು MCP ಸರ್ವರ್ ಡಿಬಗ್ ಮಾಡಿ. | 1. [Node.js](https://nodejs.org/) ಅನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ<br> 2. ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಸೆಟ್ ಅಪ್ ಮಾಡಿ: `cd inspector` && `npm install` <br> 3. VS ಕೋಡ್ ಡಿಬಗ್ ಪ್ಯಾನೆಲ್ ತೆರೆಯಿರಿ. `Debug SSE in Inspector (Edge)` ಅಥವಾ `Debug SSE in Inspector (Chrome)` ಆಯ್ಕೆ ಮಾಡಿ. ಡಿಬಗ್ ಪ್ರಾರಂಭಕ್ಕೆ F5 ಒತ್ತಿ.<br> 4. MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಆರಂಭವಾದಾಗ, ಈ MCP ಸರ್ವರ್ ಸಂಪರ್ಕಿಸಲು `Connect` ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.<br> 5. ನಂತರ ನೀವು `List Tools` ಮಾಡಿ, ಒಂದು ಉಪಕರಣ ಆಯ್ಕೆ ಮಾಡಿ, ಪ್ಯಾರಾಮೀಟರ್ ಗಳನ್ನಸೆಸೆದು, `Run Tool` ಮೂಲಕ ನಿಮ್ಮ ಸರ್ವರ್ ಕೋಡ್ ಡಿಬಗ್ ಮಾಡಬಹುದು.<br> |

##默认的端口和自定义

| ಡಿಬಗ್ ಮೋಡ್ | ಪೋರ್ಟ್‌ಗಳು | ವ್ಯಾಖ್ಯಾನಗಳು | ಕಸ್ಟಮೈಜೇಶನ್ಸ್ | ಟಿಪ್ಪಣಿ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ಮೇಲ್ಪಟ್ಟ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) ಸಂಪಾದಿಸಿ. | ಲಭ್ಯವಿಲ್ಲ |
| MCP ಇನ್ಸ್‌ಪೆಕ್ಟರ್ | 3001 (ಸರ್ವರ್); 5173 ಮತ್ತು 3000 (ಇನ್ಸ್‌ಪೆಕ್ಟರ್) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ಮೇಲ್ಪಟ್ಟ ಪೋರ್ಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಲು [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) ಸಂಪಾದಿಸಿ.| ಲಭ್ಯವಿಲ್ಲ |

## ಪ್ರತಿಕ್ರಿಯೆ

ನಿಮಗೆ ಈ ಟೆಂಪ್ಲೇಟಿನ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆ ಅಥವಾ ಸೂಚನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು [AI Toolkit GitHub ರೆಪೊ](https://github.com/microsoft/vscode-ai-toolkit/issues) ನಲ್ಲಿ ಇಶ್ಯೂ ತೆರೆಯಿರಿ.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಕಾರಣಚಿಮ್ಮು**:
ಈ ದಾಖಲೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಎಂಬ AI ಅನುವಾದ ಸೇವೆ ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ಶುದ್ದತೆಗಾಗಿ ಪ್ರಯತ್ನಿಸಿದರೂ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪುಗಳು ಅಥವಾ ಅಸತ್ಯತೆಗಳು ಇರಬಹುದು ಎಂದು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ದಾಖಲೆ ಅದರ ಮೂಲ ಭಾಷೆಯಲ್ಲಿ ಅಧಿಕೃತ ಮೂಲವಾಗಿಯಷ್ಟೇ ಪರಿಗಣಿಸಲಾಗಬೇಕು. ಮಹತ್ವದ ಮಾಹಿತಿಗಾಗಿ ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದ ಸೇವೆಯನ್ನು ಬಳಸುವುದು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ. ಈ ಅನುವಾದದಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ಅರ್ಥಮಾಹಿತಿ ತಪ್ಪುಗಳು ಅಥವಾ ತಪ್ಪುಬೋಧನೆಗಳಿಗೆ ನಾವು ಜವಾಬ್ದಾರಿಯಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->