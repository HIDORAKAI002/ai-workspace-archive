# Weather MCP Server

ਇਹ ਇੱਕ ਨਮੂਨਾ MCP ਸਰਵਰ ਹੈ ਜੋ Python ਵਿੱਚ ਮੌਸਮ ਲਈ ਔਜ਼ਾਰਾਂ ਨਾਲ ਮੌਕ ਜਵਾਬਾਂ ਨਾਲ ਲਾਗੂ ਕੀਤਾ ਗਿਆ ਹੈ। ਇਸਨੂੰ ਤੁਹਾਡੇ ਆਪਣੇ MCP ਸਰਵਰ ਲਈ ਢਾਂਚਾ ਵਜੋਂ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਹੇਠ ਲਿਖੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਸ਼ਾਮਲ ਹਨ:

- **Weather Tool**: ਇੱਕ ਔਜ਼ਾਰ ਜੋ ਦਿੱਤੇ ਗਏ ਸਥਾਨ ਦੇ ਅਧਾਰ 'ਤੇ ਮੌਕ ਕੀਤੀ ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।
- **Agent Builder ਨਾਲ ਜੁੜੋ**: ਇੱਕ ਵਿਸ਼ੇਸ਼ਤਾ ਜੋ ਤੁਹਾਨੂੰ MCP ਸਰਵਰ ਨੂੰ Agent Builder ਨਾਲ ਟੈਸਟਿੰਗ ਅਤੇ ਡੀਬੱਗਿੰਗ ਲਈ ਜੋੜਨ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ।
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) ਵਿਚ ਡੀਬੱਗ ਕਰੋ**: ਇੱਕ ਵਿਸ਼ੇਸ਼ਤਾ ਜੋ ਤੁਹਾਨੂੰ MCP ਸਰਵਰ ਨੂੰ MCP Inspector ਦੀ ਵਰਤੋਂ ਨਾਲ ਡੀਬੱਗ ਕਰਨ ਦੀ ਆਗਿਆ ਦਿੰਦੀ ਹੈ।

## Weather MCP Server ਟੈਮਪਲੇਟ ਨਾਲ ਸ਼ੁਰੂਆਤ ਕਰੋ

> **ਆਵਸ਼ਕ ਚੀਜ਼ਾਂ**
>
> MCP ਸਰਵਰ ਨੂੰ ਤੁਹਾਡੇ ਸਥਾਨਕ ਵਿਕਾਸ ਮਸ਼ੀਨ 'ਤੇ ਚਲਾਉਣ ਲਈ, ਤੁਹਾਨੂੰ ਲੋੜ ਹੋਵੇਗੀ:
>
> - [Python](https://www.python.org/)
> - (*ਵਿਕਲਪਿਕ - ਜੇ ਤੁਸੀਂ uv ਨੂੰ ਪਸੰਦ ਕਰਦੇ ਹੋ*) [uv](https://github.com/astral-sh/uv)
> - [Python ਡੀਬੱਗਰ ਐਕਸਟੈਂਸ਼ਨ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ਵਾਤਾਵਰਣ ਤਿਆਰ ਕਰੋ

ਇਸ ਪਰਿਯੋਜਨਾ ਲਈ ਵਾਤਾਵਰਣ ਸੈੱਟ ਅੱਪ ਕਰਨ ਦੇ ਦੋ ਤਰੀਕੇ ਹਨ। ਤੁਸੀਂ ਆਪਣੀ ਪਸੰਦ ਅਨੁਸਾਰ ਕੋਈ ਵੀ ਇੱਕ ਚੁਣ ਸਕਦੇ ਹੋ।

> ਨੋਟ: ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਉਣ ਦੇ ਬਾਅਦ VSCode ਜਾਂ ਟਰਮੀਨਲ ਨੂੰ ਰੀਲੋਡ ਕਰੋ ਤਾਂ ਜੋ ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਦਾ python ਵਰਤਿਆ ਜਾਵੇ।

| ਤਰੀਕਾ | ਕਦਮ |
| -------- | ----- |
| `uv` ਵਰਤ ਕੇ | 1. ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ: `uv venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣੇ ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਤੋਂ python ਚੁਣੋ <br>3. ਨਿਰਭਰਤਾਵਾਂ (ਡੈਵ ਨਿਰਭਰਤਾਵਾਂ ਸਹਿਤ) ਇੰਸਟਾਲ ਕਰੋ: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ਵਰਤ ਕੇ | 1. ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ: `python -m venv .venv` <br>2. VSCode ਕਮਾਂਡ "***Python: Select Interpreter***" ਚਲਾਓ ਅਤੇ ਬਣੇ ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਤੋਂ python ਚੁਣੋ<br>3. ਨਿਰਭਰਤਾਵਾਂ (ਡੈਵ ਨਿਰਭਰਤਾਵਾਂ ਸਹਿਤ) ਇੰਸਟਾਲ ਕਰੋ: `pip install -e .[dev]` |

ਵਾਤਾਵਰਣ ਸੈੱਟਅੱਪ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਲੋ컬 ਵਿਕਾਸ ਮਸ਼ੀਨ 'ਤੇ Agent Builder ਦੇ ਰੂਪ ਵਿੱਚ MCP Client ਰਾਹੀਂ ਸਰਵਰ ਚਲਾ ਸਕਦੇ ਹੋ:
1. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਜਾਂ MCP ਸਰਵਰ ਦੀ ਡੀਬੱਗਿੰਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।
2. Microsoft Foundry Toolkit Agent Builder ਦੀ ਵਰਤੋਂ ਕਰਕੇ [ਇਸ ਪ੍ਰੰਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।
3. ਪ੍ਰੰਪਟ ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ।

**ਵਧਾਈਆਂ**! ਤੁਸੀਂ کامیابی ਨਾਲ Agent Builder ਰਾਹੀਂ MCP Client ਵਜੋਂ ਆਪਣੇ ਸਥਾਨਕ ਵਿਕਾਸ ਮਸ਼ੀਨ 'ਤੇ Weather MCP Server ਚਲਾ ਲਿਆ ਹੈ।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ਟੈਮਪਲੇਟ ਵਿੱਚ ਕੀ ਸ਼ਾਮਲ ਹੈ

| ਫੋਲਡਰ / ਫਾਇਲ| ਸਮੱਗਰੀ                                   |
| ------------ | ------------------------------------------ |
| `.vscode`    | ਡੀਬੱਗਿੰਗ ਲਈ VSCode ਫਾਇਲਾਂ                 |
| `.aitk`      | Microsoft Foundry Toolkit ਲਈ ਸੰਰਚਨਾਵਾਂ        |
| `src`        | weather mcp ਸਰਵਰ ਲਈ ਸੋਰਸ ਕੋਡ               |

## Weather MCP Server ਨੂੰ ਕਿਵੇਂ ਡੀਬੱਗ ਕਰਨਾ ਹੈ

> ਨੋਟਸ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ਟੈਸਟਿੰਗ ਅਤੇ ਡੀਬੱਗਿੰਗ ਲਈ ਇੱਕ ਵਿਜ਼ੂਅਲ ਡਿਵੈਲਪਰ ਟੂਲ ਹੈ।
> - ਸਾਰੇ ਡੀਬੱਗਿੰਗ ਮੋਡ ਬ੍ਰੇਕਪੌਇੰਟਾਂ ਨੂੰ ਸਮਰਥਨ ਕਰਦੇ ਹਨ, ਇਸ ਲਈ ਤੁਸੀਂ ਟੂਲ ਇੰਪਲੀਮੇਂਟੇਸ਼ਨ ਕੋਡ ਵਿੱਚ ਬ੍ਰੇਕਪੌਇੰਟ ਜੋੜ ਸਕਦੇ ਹੋ।

| ਡੀਬੱਗ ਮੋਡ | ਵਰਣਨ | ਡੀਬੱਗ ਕਰਨ ਲਈ ਕਦਮ |
| ---------- | ----------- | --------------- |
| Agent Builder | Microsoft Foundry Toolkit ਰਾਹੀਂ Agent Builder ਵਿੱਚ MCP ਸਰਵਰ ਨੂੰ ਡੀਬੱਗ ਕਰੋ। | 1. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug in Agent Builder` ਚੁਣੋ ਅਤੇ MCP ਸਰਵਰ ਦੀ ਡੀਬੱਗਿੰਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ `F5` ਦਬਾਓ।<br>2. Microsoft Foundry Toolkit Agent Builder ਦੀ ਵਰਤੋਂ ਕਰਕੇ [ਇਸ ਪ੍ਰੰਪਟ](../../../../../../../../../../../open_prompt_builder) ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰੋ। ਸਰਵਰ ਆਪਣੇ ਆਪ Agent Builder ਨਾਲ ਜੁੜ ਜਾਵੇਗਾ।<br>3. ਪ੍ਰੰਪਟ ਨਾਲ ਸਰਵਰ ਟੈਸਟ ਕਰਨ ਲਈ `Run` 'ਤੇ ਕਲਿੱਕ ਕਰੋ। |
| MCP Inspector | MCP Inspector ਦੀ ਵਰਤੋਂ ਕਰਕੇ MCP ਸਰਵਰ ਨੂੰ ਡੀਬੱਗ ਕਰੋ। | 1. [Node.js](https://nodejs.org/) ਇੰਸਟਾਲ ਕਰੋ<br> 2. Inspector ਸੈੱਟਅੱਪ ਕਰੋ: `cd inspector` && `npm install` <br> 3. VS Code ਡੀਬੱਗ ਪੈਨਲ ਖੋਲ੍ਹੋ। `Debug SSE in Inspector (Edge)` ਜਾਂ `Debug SSE in Inspector (Chrome)` ਚੁਣੋ। ਡੀਬੱਗਿੰਗ ਸ਼ੁਰੂ ਕਰਨ ਲਈ F5 ਦਬਾਓ।<br> 4. ਜਦੋਂ MCP Inspector ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਲਾਂਚ ਹੁੰਦਾ ਹੈ, `Connect` ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਤਾਂ ਜੋ ਇਹ MCP ਸਰਵਰ ਜੁੜ ਜਾਵੇ।<br> 5. ਫਿਰ ਤੁਸੀਂ `List Tools` ਕਰ ਸਕਦੇ ਹੋ, ਇੱਕ ਟੂਲ ਚੁਣੋ, ਪੈਰਾਮੀਟਰ ਭਰੋ ਅਤੇ ਆਪਣਾ ਸਰਵਰ ਕੋਡ ਡੀਬੱਗ ਕਰਨ ਲਈ `Run Tool` ਦਬਾਓ।<br> |

## ਡੀਫੌਲਟ ਪੋਰਟ ਅਤੇ ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ

| ਡੀਬੱਗ ਮੋਡ | ਪੋਰਟ | ਪਰਿਭਾਸ਼ਾਵਾਂ | ਕਸਟਮਾਈਜ਼ੇਸ਼ਨ | ਨੋਟ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ਉਪਰ ਦਿੱਤੇ ਪੋਰਟ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ਸੋਧੋ। | N/A |
| MCP Inspector | 3001 (ਸਰਵਰ); 5173 ਅਤੇ 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ਉਪਰ ਦਿੱਤੇ ਪੋਰਟ ਬਦਲਣ ਲਈ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ਸੋਧੋ।| N/A |

## ਫੀਡਬੈਕ

ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਇਸ ਟੈਮਪਲੇਟ ਲਈ ਕੋਈ ਫੀਡਬੈਕ ਜਾਂ ਸੁਝਾਅ ਹਨ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ [Microsoft Foundry Toolkit GitHub ਰਿਪੋਜ਼ਟਰੀ](https://github.com/microsoft/vscode-ai-toolkit/issues) 'ਤੇ ਇੱਕ ਇਸ਼ੂ ਖੋਲ੍ਹੋ।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->