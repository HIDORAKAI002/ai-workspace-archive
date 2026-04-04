# Weather MCP Server

ਇਹ ਪਾਈਥਨ ਵਿੱਚ ਇੱਕ ਸੈਂਪਲ MCP ਸਰਵਰ ਹੈ ਜੋ ਮੌਸਮ ਨਾਲ ਸੰਬੰਧਿਤ ਟੂਲਾਂ ਨੂੰ ਮੌਕ ਜਵਾਬਾਂ ਨਾਲ ਲਾਗੂ ਕਰਦਾ ਹੈ। ਇਹ ਤੁਹਾਡੇ ਆਪਣੇ MCP ਸਰਵਰ ਲਈ ਇੱਕ ਧਾਂਚਾ ਵਜੋਂ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਹੇਠ ਲਿਖੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸ਼ਾਮਲ ਹਨ:

- **Weather Tool**: ਇੱਕ ਟੂਲ ਜੋ ਦਿੱਤੇ ਗਏ ਸਥਾਨ ਦੇ ਆਧਾਰ 'ਤੇ ਮੌਸਮ ਦੀ ਮੌਕ ਕੀਤੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।
- **Connect to Agent Builder**: ਇੱਕ ਵਿਸ਼ੇਸ਼ਤਾ ਜੋ ਤੁਹਾਨੂੰ MCP ਸਰਵਰ ਨੂੰ ਟੈਸਟਿੰਗ ਅਤੇ ਡੀਬੱਗਿੰਗ ਲਈ ਏਜੰਟ ਬਿਲਡਰ ਨਾਲ ਜੋੜਨ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ।
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ਇੱਕ ਵਿਸ਼ੇਸ਼ਤਾ ਜੋ ਤੁਹਾਨੂੰ MCP Inspector ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਡੀਬੱਗ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ।

## Weather MCP Server ਟੈਮਪਲੇਟ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰੋ

> **ਪੂਰਵ-ਸ਼ਰਤਾਂ**
>
> ਆਪਣੇ ਸਥਾਨਕ ਵਿਕਾਸ ਮਸ਼ੀਨ ਵਿੱਚ MCP ਸਰਵਰ ਚਲਾਉਣ ਲਈ, ਤੁਹਾਨੂੰ ਲੋੜ ਹੋਏਗੀ:
>
> - [Python](https://www.python.org/)
> - (*ਇੱਛਾ ਨੁਸਖਾ - ਜੇ ਤੁਸੀਂ uv ਨੂੰ ਪਸੰਦ ਕਰਦੇ ਹੋ*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ਵਾਤਾਵਰਣ ਤੈਅਰ ਕਰੋ

ਇਸ ਪਰੋਜੈਕਟ ਲਈ ਵਾਤਾਵਰਣ ਸੈਟਅਪ ਕਰਨ ਲਈ ਦੋ ਤਰੀਕੇ ਹਨ। ਤੁਸੀਂ ਆਪਣੀ ਪਸੰਦ ਦੇ ਅਨੁਸਾਰ ਕੋਈ ਵੀ ਇੱਕ ਚੁਣ ਸਕਦੇ ਹੋ।

> ਨੋਟ: ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਉਣ ਤੋਂ ਬਾਅਦ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ VSCode ਜਾਂ ਟਰਮੀਨਲ ਨੂੰ ਰੀਲੋਡ ਕਰੋ ਕਿ ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਦਾ Python ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ।

| ਤਰੀਕਾ | ਕਦਮ |
| -------- | ----- |
| `uv` ਦੀ ਵਰਤੋਂ | 1. ਵਚਰੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ: `uv venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣਾਏ ਗਏ ਵਚਰੁਅਲ ਵਾਤਾਵਰਣ ਤੋਂ Python ਚੁਣੋ <br>3. ਡੀਪੈਂਡੇੰਸੀਜ਼ ਇੰਸਟਾਲ ਕਰੋ (ਵਿਕਾਸ ਦੀਆਂ ਡੀਵ ਡੀਪੈਂਡੇੰਸੀਜ਼ ਸਮੇਤ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ਦੀ ਵਰਤੋਂ | 1. ਵਚਰੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ: `python -m venv .venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣਾਏ ਗਏ ਵਚਰੁਅਲ ਵਾਤਾਵਰਣ ਤੋਂ Python ਚੁਣੋ<br>3. ਡੀਪੈਂਡੇੰਸੀਜ਼ ਇੰਸਟਾਲ ਕਰੋ (ਵਿਕਾਸ ਦੀਆਂ ਡੀਵ ਡੀਪੈਂਡੇੰਸੀਜ਼ ਸਮੇਤ): `pip install -e .[dev]` |

ਵਾਤਾਵਰਣ ਸੈੱਟਅਪ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ Agent Builder ਦੁਆਰਾ MCP ਕਲਾਇੰਟ ਵਜੋਂ ਆਪਣੇ ਸਥਾਨਕ ਵਿਕਾਸ ਮਸ਼ੀਨ ਵਿੱਚ ਸਰਵਰ ਚਲਾ ਸਕਦੇ ਹੋ ਅਤੇ ਸ਼ੁਰੂਆਤ ਕਰ ਸਕਦੇ ਹੋ:
1. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਜਾਂ MCP ਸਰਵਰ ਡੀਬੱਗ ਕਰਨ ਲਈ `F5` ਦੀ ਚਾਬੀ ਦਬਾਓ।
2. AI Toolkit Agent Builder ਦੀ ਵਰਤੋਂ ਕਰਕੇ [ਇਸ ਪ੍ਰਾਂਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।
3. ਪ੍ਰਾਂਪਟ ਨਾਲ ਸਰਵਰ ਨੂੰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ।

**ਵਧਾਈਆਂ**! ਤੁਸੀਂ ਸਫਲਤਾਪੂਰਵਕ Agent Builder ਰਾਹੀਂ ਆਪਣੇ ਸਥਾਨਕ ਵਿਕਾਸ ਮਸ਼ੀਨ ਵਿੱਚ Weather MCP Server ਚਲਾ ਲਿਆ ਹੈ।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ਟੈਮਪਲੇਟ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਹੈ

| ਫੋਲਡਰ / ਫਾਇਲ | ਸਮੱਗਰੀ                                  |
| ------------ | ---------------------------------------- |
| `.vscode`    | ਡੀਬੱਗਿੰਗ ਲਈ VSCode ਫਾਇਲਾਂ              |
| `.aitk`      | AI Toolkit ਦੀਆਂ ਸੰਰਚਨਾਵਾਂ               |
| `src`        | weather mcp ਸਰਵਰ ਲਈ ਸਰੋਤ ਕੋਡ          |

## Weather MCP Server ਨੂੰ ਕਿਵੇਂ ਡੀਬੱਗ ਕਰੀਏ

> ਨੋਟਸ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP ਸਰਵਰਾਂ ਦੀ ਟੈਸਟਿੰਗ ਅਤੇ ਡੀਬੱਗਿੰਗ ਲਈ ਇੱਕ ਵਿਜ਼ੂਅਲ ਵਿਕਾਸਕਰਤਾ ਟੂਲ ਹੈ।
> - ਸਾਰੇ ਡੀਬੱਗਿੰਗ ਮੋਡ ਬ੍ਰੇਕਪੌਇੰਟਸ ਨੂੰ ਸਹਿਯੋਗ ਦਿੰਦੇ ਹਨ, ਇਸ ਲਈ ਤੁਸੀਂ ਟੂਲ ਦੇ ਲਾਗੂ ਕਰਨ ਵਾਲੇ ਕੋਡ ਵਿੱਚ ਬ੍ਰੇਕਪੌਇੰਟਸ ਜੋੜ ਸਕਦੇ ਹੋ।

| ਡੀਬੱਗ ਮੋਡ | ਵੇਰਵਾ | ਡੀਬੱਗ ਕਰਨ ਦੇ ਕਦਮ |
| ---------- | ----------- | ---------------- |
| Agent Builder | AI Toolkit ਰਾਹੀਂ Agent Builder ਵਿੱਚ MCP ਸਰਵਰ ਡੀਬੱਗ ਕਰੋ। | 1. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਅਤੇ MCP ਸਰਵਰ ਡੀਬੱਗ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।<br>2. AI Toolkit Agent Builder ਦੀ ਵਰਤੋਂ ਕਰਕੇ [ਇਸ ਪ੍ਰਾਂਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।<br>3. ਪ੍ਰਾਂਪਟ ਨਾਲ ਸਰਵਰ ਨੂੰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ। |
| MCP Inspector | MCP Inspector ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਡੀਬੱਗ ਕਰੋ। | 1. [Node.js](https://nodejs.org/) ਇੰਸਟਾਲ ਕਰੋ<br> 2. Inspector ਸੈਟਅਪ ਕਰੋ: `cd inspector` && `npm install` <br> 3. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug SSE in Inspector (Edge)` ਜਾਂ `Debug SSE in Inspector (Chrome)` ਚੁਣੋ। ਡੀਬੱਗਿੰਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ F5 ਦਬਾਓ।<br> 4. ਜਦੋਂ MCP Inspector ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਲਾਂਚ ਹੁੰਦਾ ਹੈ, ਤਦ `Connect` ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਇਸ MCP ਸਰਵਰ ਨੂੰ ਜੋੜੋ।<br> 5. ਫਿਰ ਤੁਸੀਂ `List Tools` ਕਰ ਸਕਦੇ ਹੋ, ਕੋਈ ਟੂਲ ਚੁਣੋ, ਪੈਰਾਮੀਟਰ ਭਰੋ ਅਤੇ `Run Tool` ਕਰਕੇ ਸਰਵਰ ਕੋਡ ਨੂੰ ਡੀਬੱਗ ਕਰੋ।<br> |

## ਡੀਬੱਗਿੰਗ ਪੋਰਟ ਅਤੇ ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ

| ਡੀਬੱਗ ਮੋਡ | ਪੋਰਟ | ਖ਼ਾਸ ਯੋਗਤਾਵਾਂ | ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ | ਨੋਟ |
| ---------- | ----- | -------------- | ------------- | ----- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ਉਪਰ ਦਿੱਤੇ ਪੋਰਟਾਂ ਨੂੰ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ਨੂੰ ਸੋਧੋ। | ਨ/ਐ |
| MCP Inspector | 3001 (ਸਰਵਰ); 5173 ਅਤੇ 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ਉਪਰ ਦਿੱਤੇ ਪੋਰਟਾਂ ਨੂੰ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ਨੂੰ ਸੋਧੋ।| ਨ/ਐ |

## ਪ੍ਰਤੀਕਿਰਿਆ

ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਇਸ ਟੈਮਪਲੇਟ ਲਈ ਕੋਈ ਪ੍ਰਤੀਕਿਰਿਆ ਜਾਂ ਸੁਝਾਵ ਹੈ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ [AI Toolkit GitHub ਰਿਪੋਜ਼ਟਰੀ](https://github.com/microsoft/vscode-ai-toolkit/issues) ਵਿੱਚ ਇੱਕ ਇਸ਼ੂ ਖੋਲ੍ਹੋ।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋक्ति**:
ਇਹ ਦਸਤਾਵੇਜ਼ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਨਾਲ ਅਨੁਵਾਦਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਅਤਾ ਲਈ ਪੂਰਾ ਯਤਨ ਕਰਦੇ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਝਟਪਟ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਹੀਅਤਾਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ, ਇਸ ਗੱਲ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਜਿਸਦੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਹੈ, ਉਸਨੂੰ ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਨਾਲ ਹੋਏ ਕਿਸੇ ਵੀ ਗਲਤ ਫਹਿਮੀ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->