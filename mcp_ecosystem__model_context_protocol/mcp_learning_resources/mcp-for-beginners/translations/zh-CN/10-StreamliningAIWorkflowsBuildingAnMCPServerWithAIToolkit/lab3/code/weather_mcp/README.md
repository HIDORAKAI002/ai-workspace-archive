# Weather MCP 服务器

这是一个用 Python 实现的示例 MCP 服务器，提供带有模拟响应的天气工具。它可以用作您自己的 MCP 服务器的骨架。包括以下功能：

- **天气工具**：一个基于给定位置提供模拟天气信息的工具。
- **连接到 Agent Builder**：允许您将 MCP 服务器连接到 Agent Builder 以进行测试和调试的功能。
- **在 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 中调试**：允许您使用 MCP Inspector 调试 MCP 服务器的功能。

## 开始使用 Weather MCP 服务器模板

> **先决条件**
>
> 要在本地开发机器上运行 MCP 服务器，您需要：
>
> - [Python](https://www.python.org/)
> - （*可选 - 如果您喜欢 uv*）[uv](https://github.com/astral-sh/uv)
> - [Python 调试扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## 准备环境

有两种方法可用于设置项目环境，您可以根据偏好选择其中一种。

> 注意：创建虚拟环境后，请重启 VSCode 或终端，以确保使用虚拟环境中的 python。

| 方法          | 步骤                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------ |
| 使用 `uv`     | 1. 创建虚拟环境：`uv venv` <br>2. 运行 VSCode 命令 "***Python: Select Interpreter***"，选择刚创建虚拟环境中的 python <br>3. 安装依赖（包括开发依赖）：`uv pip install -r pyproject.toml --extra dev` |
| 使用 `pip`    | 1. 创建虚拟环境：`python -m venv .venv` <br>2. 运行 VSCode 命令 "***Python: Select Interpreter***"，选择刚创建虚拟环境中的 python <br>3. 安装依赖（包括开发依赖）：`pip install -e .[dev]` |

设置好环境后，您可以通过 Agent Builder 以 MCP 客户端身份在本地开发机器上运行服务器开始体验：
1. 打开 VS Code 调试面板。选择 `Debug in Agent Builder` 或按 `F5` 开始调试 MCP 服务器。
2. 使用 AI Toolkit Agent Builder 通过[此提示](../../../../../../../../../../../open_prompt_builder)测试服务器。服务器将自动连接到 Agent Builder。
3. 点击 `Run` 使用该提示测试服务器。

**恭喜！** 您已成功通过 Agent Builder 作为 MCP 客户端在本地开发机器上运行 Weather MCP 服务器。  
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## 模板包含内容

| 文件夹 / 文件 | 内容                           |
| ------------- | ------------------------------ |
| `.vscode`     | 用于调试的 VSCode 文件          |
| `.aitk`       | AI Toolkit 配置文件             |
| `src`         | Weather MCP 服务器的源代码       |

## 如何调试 Weather MCP 服务器

> 注意：
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是一个可视化开发工具，用于测试和调试 MCP 服务器。
> - 所有调试模式均支持断点，您可以在工具实现代码中添加断点。

| 调试模式      | 描述                         | 调试步骤                                                                                                                       |
| ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Agent Builder | 通过 AI Toolkit 在 Agent Builder 中调试 MCP 服务器。 | 1. 打开 VS Code 调试面板，选择 `Debug in Agent Builder` 并按 `F5` 启动调试 MCP 服务器。<br>2. 使用 AI Toolkit Agent Builder 通过[此提示](../../../../../../../../../../../open_prompt_builder)测试服务器。服务器将自动连接到 Agent Builder。<br>3. 点击 `Run` 使用提示测试服务器。 |
| MCP Inspector | 使用 MCP Inspector 调试 MCP 服务器。 | 1. 安装 [Node.js](https://nodejs.org/)<br>2. 设置 Inspector：`cd inspector` && `npm install` <br>3. 打开 VS Code 调试面板，选择 `Debug SSE in Inspector (Edge)` 或 `Debug SSE in Inspector (Chrome)`，并按 F5 开始调试。<br>4. 当 MCP Inspector 在浏览器中启动后，点击 `Connect` 按钮连接此 MCP 服务器。<br>5. 之后您可以 `List Tools`，选择工具，输入参数，点击 `Run Tool` 来调试服务器代码。<br> |

## 默认端口及自定义

| 调试模式    | 端口                  | 位置                                  | 自定义说明                                                     | 备注 |
| ----------- | --------------------- | ------------------------------------- | -------------------------------------------------------------- | ---- |
| Agent Builder | 3001                  | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 编辑 [.vscode/launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[src/__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[.aitk/mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 来更改以上端口。 | 无   |
| MCP Inspector | 3001（服务器）；5173 和 3000（Inspector） | [.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | 编辑 [.vscode/launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)、[.vscode/tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)、[src/__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)、[.aitk/mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) 来更改以上端口。 | 无   |

## 反馈

如果您对该模板有任何反馈或建议，请在 [AI Toolkit GitHub 仓库](https://github.com/microsoft/vscode-ai-toolkit/issues) 上打开 issue。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由人工智能翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译。虽然我们力求准确，但请注意自动翻译可能存在错误或不准确之处。请以原始语言的原文文件为权威来源。对于关键信息，建议使用专业人工翻译。我们对于因使用本翻译而引起的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->