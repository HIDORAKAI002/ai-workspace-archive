# Weather MCP Server

ਇਹ Python ਵਿੱਚ ਇੱਕ ਨਮੂਨਾ MCP ਸਰਵਰ ਹੈ ਜੋ ਮੌਸਮ ਦੇ ਸੰਦਾਂ ਨੂੰ ਮੌਕ ਜਵਾਬ ਦੇਣ ਨਾਲ ਲਾਗੂ ਕਰਦਾ ਹੈ। ਇਹ ਤੁਹਾਡੇ ਆਪਣੇ MCP ਸਰਵਰ ਲਈ ਇਕ ਫਰੇਮਵਰਕ ਵਜੋਂ ਵਰਤੀ ਜਾ ਸਕਦੀ ਹੈ। ਇਸ ਵਿੱਚ ਹੇਠਾਂ ਦਿੱਤੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸ਼ਾਮਲ ਹਨ:

- **ਮੌਸਮ ਟੂਲ**: ਇੱਕ ਟੂਲ ਜੋ ਦਿੱਤੇ ਗਏ ਸਥਾਨ ਅਧਾਰਿਤ ਮੌਸਮ ਦੀ ਮੌਕ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।
- **Git ਕਲੋਨ ਟੂਲ**: ਇੱਕ ਟੂਲ ਜੋ ਕਿਸੇ git ਰਿਪੋਜਿਟਰੀ ਨੂੰ ਨਿਰਧਾਰਿਤ ਫੋਲਡਰ ਵਿੱਚ ਕਲੋਨ ਕਰਦਾ ਹੈ।
- **VS ਕੋਡ ਖੋਲ੍ਹਣ ਵਾਲਾ ਟੂਲ**: ਇੱਕ ਟੂਲ ਜੋ ਕਿਸੇ ਫੋਲਡਰ ਨੂੰ VS ਕੋਡ ਜਾਂ VS ਕੋਡ ਇੰਸਾਈਡਰਜ਼ ਵਿੱਚ ਖੋਲਦਾ ਹੈ।
- **ਏਜੰਟ ਬਿਲਡਰ ਨਾਲ ਕਨੈਕਟ ਕਰੋ**: ਇੱਕ ਫੀਚਰ ਜੋ ਤੁਹਾਨੂੰ MCP ਸਰਵਰ ਨੂੰ ਟੈਸਟਿੰਗ ਅਤੇ ਡਿਬੱਗਿੰਗ ਲਈ ਏਜੰਟ ਬਿਲਡਰ ਨਾਲ ਜੋੜਨ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ।
- **[MCP ਇੰਸਪੈਕਟਰ](https://github.com/modelcontextprotocol/inspector) ਵਿੱਚ ਡਿਬੱਗ ਕਰੋ**: ਇੱਕ ਫੀਚਰ ਜੋ MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ।

## Weather MCP Server ਟੈਂਪਲੇਟ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ

> **ਜ਼ਰੂਰੀਆਂ चीज਼ਾਂ**
>
> ਆਪਣੇ ਲੋਕਲ ਡੈਵ ਮਸ਼ੀਨ ਤੇ MCP ਸਰਵਰ ਚਲਾਉਣ ਲਈ ਤੁਹਾਨੂੰ ਲੋੜ ਹੋਵੇਗੀ:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo ਟੂਲ ਲਈ ਜਰੂਰੀ)
> - [VS Code](https://code.visualstudio.com/) ਜਾਂ [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode ਟੂਲ ਲਈ ਜਰੂਰੀ)
> - (*ਵੈਕਲਪਿਕ - ਜੇ ਤੁਸੀਂ uv ਪਸੰਦ ਕਰਦੇ ਹੋ*) [uv](https://github.com/astral-sh/uv)
> - [Python ਡਿਬੱਗਰ ਐਕਸਟੈਂਸ਼ਨ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ਵਾਤਾਵਰਨ ਤਿਆਰ ਕਰੋ

ਇਸ ਪ੍ਰਾਜੈਕਟ ਲਈ ਵਾਤਾਵਰਨ ਸੈਟਅਪ ਕਰਨ ਲਈ ਦੋ ਤਰੀਕੇ ਹਨ। ਤੁਸੀਂ ਆਪਣੀ ਪਸੰਦ ਦੇ ਅਧਾਰ 'ਤੇ ਕੋਈ ਵੀ ਤਰੀਕਾ ਚੁਣ ਸਕਦੇ ਹੋ।

> ਨੋਟ: ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਬਣਾਉਣ ਤੋਂ ਬਾਦ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ VSCode ਜਾਂ ਟਰਮੀਨਲ ਨੂੰ ਰੀਲੋਡ ਕਰੋ ਕਿ ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਦਾ Python ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ।

| ਤਰੀਕਾ | ਕਦਮ |
| -------- | ----- |
| `uv` ਦੀ ਵਰਤੋਂ | 1. ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਬਣਾਓ: `uv venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣਾਏ ਗਏ ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਤੋਂ ਪਾਇਥਨ ਚੁਣੋ <br>3. ਡਿਪੈਂਡੇਨਸੀਆਂ ਇੰਸਟਾਲ ਕਰੋ (ਦੇਵ ਡਿਪੈਂਡੇਨਸੀਆਂ ਸਮੇਤ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ਦੀ ਵਰਤੋਂ | 1. ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਬਣਾਓ: `python -m venv .venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣਾਏ ਗਏ ਵਿਰਚੁਅਲ ਵਾਤਾਵਰਨ ਤੋਂ ਪਾਇਥਨ ਚੁਣੋ<br>3. ਡਿਪੈਂਡੇਨਸੀਆਂ ਇੰਸਟਾਲ ਕਰੋ (ਦੇਵ ਡਿਪੈਂਡੇਨਸੀਆਂ ਸਮੇਤ): `pip install -e .[dev]` | 

ਵਾਤਾਵਰਨ ਤਿਆਰ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ Agent Builder ਨੂੰ MCP ਕਲੀਐਂਟ ਵਜੋਂ ਵਰਤ ਕੇ ਆਪਣੇ ਲੋਕਲ ਡੈਵ ਮਸ਼ੀਨ ਵਿੱਚ ਸੇਰਵਰ ਚਲਾ ਸਕਦੇ ਹੋ:
1. VS Code ਡਿਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਜਾਂ MCP ਸਰਵਰ ਡਿਬੱਗ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।
2. AI Toolkit Agent Builder ਵਰਤ ਕੇ [ਇਸ ਪ੍ਰੌਂਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।
3. ਪ੍ਰੌਂਪਟ ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ।

**ਵਧਾਈਆਂ**! ਤੁਸੀਂ ਕਾਰਗਰਤਾ ਨਾਲ Weather MCP Server ਆਪਣੇ ਲੋਕਲ ਡੈਵ ਮਸ਼ੀਨ ਵਿੱਚ Agent Builder ਨੂੰ MCP ਕਲੀਐਂਟ ਵਜੋਂ ਵਰਤ ਕੇ ਚਲਾਇਆ ਹੈ।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ਟੈਂਪਲੇਟ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਹੈ

| ਫੋਲਡਰ / ਫਾਇਲ | ਸਮੱਗਰੀ                                    |
| -------------- | ----------------------------------------- |
| `.vscode`      | ਡਿਬੱਗਿੰਗ ਲਈ VSCode ਫਾਇਲਾਂ                |
| `.aitk`        | AI Toolkit ਲਈ ਕনਫ਼ਿਗਰੇਸ਼ਨ                   |
| `src`          | ਮੌਸਮ mcp ਸਰਵਰ ਲਈ ਸੋర్స్ ਕੋਡ                |

## Weather MCP Server ਨੂੰ ਕਿਵੇਂ ਡਿਬੱਗ ਕਰੀਏ

> ਨੋਟਸ:
> - [MCP ਇੰਸਪੈਕਟਰ](https://github.com/modelcontextprotocol/inspector) MCP ਸਰਵਰਾਂ ਦੀ ਟੈਸਟਿੰਗ ਅਤੇ ਡਿਬੱਗਿੰਗ ਲਈ ਇੱਕ ਵਿਜ਼ੂਅਲ ਡਿਵੈਲਪਰ ਟੂਲ ਹੈ।
> - ਸਾਰੇ ਡਿਬੱਗਿੰਗ ਮੋਡ ਬ੍ਰੇਕਪੌਇੰਟ ਸੰਭਾਵਿਤ ਕਰਦੇ ਹਨ, ਤਾਂ ਤੁਸੀਂ ਟੂਲ ਇੰਪਲੀਮੇਂਟੇਸ਼ਨ ਕੋਡ ਵਿੱਚ ਬ੍ਰੇਕਪੌਇੰਟ ਐਡ ਕਰ ਸਕਦੇ ਹੋ।

## ਉਪਲੱਬਧ ਟੂਲ

### ਮੌਸਮ ਟੂਲ
`get_weather` ਟੂਲ ਦਿੱਤੇ ਗਏ ਸਥਾਨ ਲਈ ਮੌਕ ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

| ਪੈਰਾਮੀਟਰ | ਕਿਸਮ | ਵਰਣਨ |
| --------- | ---- | ------ |
| `location` | ਸਤਰ | ਮੌਸਮ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਥਾਨ (ਜਿਵੇਂ ਸ਼ਹਿਰ ਦਾ ਨਾਮ, ਸੂਬਾ ਜਾਂ ਕੋਆਰਡੀਨੇਟ) |

### Git ਕਲੋਨ ਟੂਲ
`git_clone_repo` ਟੂਲ ਇੱਕ git ਰਿਪੋਜਿਟਰੀ ਨੂੰ ਨਿਰਧਾਰਿਤ ਫੋਲਡਰ ਵਿੱਚ ਕਲੋਨ ਕਰਦਾ ਹੈ।

| ਪੈਰਾਮੀਟਰ | ਕਿਸਮ | ਵਰਣਨ |
| --------- | ---- | ------ |
| `repo_url` | ਸਤਰ | ਕਲੋਨ ਕਰਨ ਲਈ git ਰਿਪੋਜਿਟਰੀ ਦਾ URL |
| `target_folder` | ਸਤਰ | ਫੋਲਡਰ ਦਾ ਰਸਤਾ ਜਿੱਥੇ ਰਿਪੋਜਿਟਰੀ ਕਲੋਨ ਕੀਤਾ ਜਾਣਾ ਹੈ |

ਇਹ ਟੂਲ ਇੱਕ JSON ਆਬਜੈਕਟ ਵਾਪਸ ਕਰਦਾ ਹੈ:
- `success`: ਬੂਲੀਅਨ ਜੋ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਕਾਰਵਾਈ ਸਫਲ ਰਹੀ
- `target_folder` ਜਾਂ `error`: ਕਲੋਨ ਕੀਤੇ ਗਏ ਰਿਪੋਜਿਟਰੀ ਦਾ ਰਸਤਾ ਜਾਂ ਗਲਤੀ ਦਾ ਸੁਨੇਹਾ

### VS ਕੋਡ ਖੋਲ੍ਹਣ ਵਾਲਾ ਟੂਲ
`open_in_vscode` ਟੂਲ ਇੱਕ ਫੋਲਡਰ ਨੂੰ VS ਕੋਡ ਜਾਂ VS ਕੋਡ ਇੰਸਾਈਡਰਜ਼ ਐਪਲੀਕੇਸ਼ਨ ਵਿੱਚ ਖੋਲ੍ਹਦਾ ਹੈ।

| ਪੈਰਾਮੀਟਰ | ਕਿਸਮ | ਵਰਣਨ |
| --------- | ---- | ------ |
| `folder_path` | ਸਤਰ | ਖੋਲ੍ਹਣ ਲਈ ਫੋਲਡਰ ਦਾ ਰਸਤਾ |
| `use_insiders` | ਬੂਲੀਅਨ (ਵੈਕਲਪਿਕ) | ਸਕੀਮਤ VS ਕੋਡ ਦੀ ਥਾਂ VS ਕੋਡ ਇੰਸਾਈਡਰਜ਼ ਵਰਤਣਾ ਹੈ ਜਾਂ ਨਹੀਂ |

ਇਹ ਟੂਲ ਇੱਕ JSON ਆਬਜੈਕਟ ਵਾਪਸ ਕਰਦਾ ਹੈ:
- `success`: ਬੂਲੀਅਨ ਜੋ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਕਾਰਵਾਈ ਸਫਲ ਰਹੀ
- `message` ਜਾਂ `error`: ਪੁਸ਼ਟੀ ਸੁਨੇਹਾ ਜਾਂ ਗਲਤੀ ਦਾ ਸੁਨੇਹਾ

| ਡਿਬੱਗ ਮੋਡ | ਵਰਣਨ | ਡਿਬੱਗ ਕਰਨ ਦੇ ਕਦਮ |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit ਰਾਹੀਂ Agent Builder ਵਿੱਚ MCP ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰੋ। | 1. VS Code ਡਿਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਅਤੇ MCP ਸਰਵਰ ਡਿਬੱਗ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।<br>2. AI Toolkit Agent Builder ਵਰਤ ਕੇ [ਇਸ ਪ੍ਰੌਂਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।<br>3. ਪ੍ਰੌਂਪਟ ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ। |
| MCP ਇੰਸਪੈਕਟਰ | MCP ਇੰਸਪੈਕਟਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਡਿਬੱਗ ਕਰੋ। | 1. [Node.js](https://nodejs.org/) ਇੰਸਟਾਲ ਕਰੋ<br>2. ਇੰਸਪੈਕਟਰ ਸੈਟਅਪ ਕਰੋ: `cd inspector` && `npm install` <br>3. VS Code ਡਿਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug SSE in Inspector (Edge)` ਜਾਂ `Debug SSE in Inspector (Chrome)` ਚੁਣੋ। ਡਿਬੱਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।<br>4. ਜਦ MCP ਇੰਸਪੈਕਟਰ ਬਰਾਊਜ਼ਰ ਵਿੱਚ ਖੁਲਦਾ ਹੈ, `Connect` ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਇਸ MCP ਸਰਵਰ ਨਾਲ ਕਨੈਕਟ ਕਰੋ।<br>5. ਫਿਰ ਤੁਸੀਂ `List Tools` ਕਰ ਸਕਦੇ ਹੋ, ਟੂਲ ਚੁਣ ਸਕਦੇ ਹੋ, ਪੈਰਾਮੀਟਰ ਦਾਖਲ ਕਰਕੇ `Run Tool` ਨਾਲ ਸਰਵਰ ਕੋਡ ਡਿਬੱਗ ਕਰ ਸਕਦੇ ਹੋ।<br> |

## ਡਿਫ਼ੌਲਟ ਪੋਰਟ ਅਤੇ ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ

| ਡਿਬੱਗ ਮੋਡ | ਪੋਰਟ | ਪਰਿਭਾਸ਼ਾ | ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ | ਨੋਟ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ਉਪਰੋਕਤ ਪੋਰਟ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) ਸੰਪਾਦਿਤ ਕਰੋ। | ਲਾਗੂ ਨਹੀਂ |
| MCP ਇੰਸਪੈਕਟਰ | 3001 (ਸਰਵਰ); 5173 ਅਤੇ 3000 (ਇੰਸਪੈਕਟਰ) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ਉਪਰੋਕਤ ਪੋਰਟ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) ਸੰਪਾਦਿਤ ਕਰੋ। | ਲਾਗੂ ਨਹੀਂ |

## ਫੀਡਬੈਕ

ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਇਸ ਟੈਂਪਲੇਟ ਲਈ ਕੋਈ ਫੀਡਬੈਕ ਜਾਂ ਸੁਝਾਵ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ [AI Toolkit GitHub ਰਿਪੋਜਿਟਰੀ](https://github.com/microsoft/vscode-ai-toolkit/issues) 'ਤੇ ਇੱਕ ਇਸ਼ੂ ਖੋਲ੍ਹੋ।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਇਲਾਨ**:  
ਇਹ ਦਸਤਾਵੇਜ਼ AI ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਨਾਲ ਅਨੁਵਾਦ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮਰੱਥਤਾਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੇ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਹੀ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਸਮਝਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਅਹੰਕਾਰਪੂਰਣ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਨਾਲ ਹੋਣ ਵਾਲੇ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਭ੍ਰਮਾਂ ਲਈ ਅਸੀਂ ਜ਼ਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->