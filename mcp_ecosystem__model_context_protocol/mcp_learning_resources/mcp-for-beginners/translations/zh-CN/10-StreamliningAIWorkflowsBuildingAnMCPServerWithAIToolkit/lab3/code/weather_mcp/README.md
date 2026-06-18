# Weather MCP Server

这是一个用Python实现的天气工具示例MCP服务器，提供模拟响应。它可以用作你自己MCP服务器的骨架。包括以下功能：

- <strong>天气工具</strong>：基于给定位置提供模拟天气信息的工具。
- **连接到Agent Builder**：允许你将MCP服务器连接到Agent Builder进行测试和调试的功能。
- **在[MCP Inspector](https://github.com/modelcontextprotocol/inspector)中调试**：允许你使用MCP Inspector调试MCP服务器的功能。

## 使用Weather MCP Server模板开始

> <strong>先决条件</strong>
>
> 要在本地开发机器上运行MCP服务器，你需要：
>
> - [Python](https://www.python.org/)
> - （可选 - 如果你偏好使用uv）[uv](https://github.com/astral-sh/uv)
> - [Python调试扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 准备环境

有两种方法可以为该项目配置环境。你可以根据自己的偏好选择任一方式。

> 注意：创建虚拟环境后，重新加载VSCode或终端，确保使用虚拟环境中的python。

| 方式 | 步骤 |
| -------- | ----- |
| 使用`uv` | 1. 创建虚拟环境：`uv venv` <br>2. 在VSCode中运行命令 "***Python: Select Interpreter***"，并选择刚创建的虚拟环境中的python <br>3. 安装依赖（包括开发依赖）：`uv pip install -r pyproject.toml --extra dev` |
| 使用`pip` | 1. 创建虚拟环境：`python -m venv .venv` <br>2. 在VSCode中运行命令 "***Python: Select Interpreter***"，并选择刚创建的虚拟环境中的python<br>3. 安装依赖（包括开发依赖）：`pip install -e .[dev]` |

完成环境配置后，你可以通过Agent Builder作为MCP客户端，在本地开发机器上运行该服务器开始使用：
1. 打开VS Code调试面板。选择`Debug in Agent Builder`或按`F5`启动MCP服务器调试。
2. 使用Microsoft Foundry Toolkit Agent Builder，通过[此提示](../../../../../../../../../../../open_prompt_builder)测试服务器。服务器将自动连接到Agent Builder。
3. 点击`Run`使用该提示测试服务器。

**恭喜！** 你已经成功通过Agent Builder作为MCP客户端，在本地开发机器上运行了Weather MCP服务器。  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 模板包含内容

| 文件夹 / 文件| 内容                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | 用于调试的VSCode文件                       |
| `.aitk`      | Microsoft Foundry Toolkit的配置            |
| `src`        | weather mcp服务器的源码                     |

## 如何调试Weather MCP服务器

> 说明：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector)是用于测试和调试MCP服务器的可视化开发工具。
> - 所有调试模式均支持断点，因此你可以在工具实现代码中添加断点。

| 调试模式 | 说明 | 调试步骤 |
| ---------- | ----------- | --------------- |
| Agent Builder | 通过Microsoft Foundry Toolkit中的Agent Builder调试MCP服务器。 | 1. 打开VS Code调试面板。选择`Debug in Agent Builder`，按`F5`启动MCP服务器调试。<br>2. 使用Microsoft Foundry Toolkit Agent Builder，通过[此提示](../../../../../../../../../../../open_prompt_builder)测试服务器。服务器将自动连接到Agent Builder。<br>3. 点击`Run`使用该提示测试服务器。 |
| MCP Inspector | 使用MCP Inspector调试MCP服务器。 | 1. 安装[Node.js](https://nodejs.org/)<br>2. 设置Inspector：`cd inspector` && `npm install` <br>3. 打开VS Code调试面板。选择`Debug SSE in Inspector (Edge)`或`Debug SSE in Inspector (Chrome)`，按F5启动调试。<br>4. 当MCP Inspector在浏览器中启动时，点击`Connect`按钮连接此MCP服务器。<br>5. 然后可以`List Tools`，选择工具，输入参数，点击`Run Tool`调试服务器代码。<br> |

## 默认端口及自定义

| 调试模式 | 端口 | 定义位置 | 自定义位置 | 备注 |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 编辑 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 以更改上述端口。 | 无 |
| MCP Inspector | 3001（服务器）；5173 和 3000（Inspector） | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 编辑 [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 以更改上述端口。| 无 |

## 反馈

如果你对本模板有任何反馈或建议，请在[Microsoft Foundry Toolkit GitHub仓库](https://github.com/microsoft/vscode-ai-toolkit/issues)中提交issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->