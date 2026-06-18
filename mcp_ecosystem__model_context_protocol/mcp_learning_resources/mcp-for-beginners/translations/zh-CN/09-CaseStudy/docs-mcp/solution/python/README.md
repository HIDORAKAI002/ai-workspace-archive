# 使用 Chainlit 和 Microsoft Learn Docs MCP 的学习计划生成器

## 先决条件

- Python 3.8 或更高版本
- pip（Python 包管理器）
- 可连接 Microsoft Learn Docs MCP 服务器的网络访问权限

## 安装

1. 克隆此存储库或下载项目文件。
2. 安装所需依赖项：

   ```bash
   pip install -r requirements.txt
   ```

## 使用说明

### 场景 1：简单查询 Docs MCP
一个命令行客户端，连接到 Docs MCP 服务器，发送查询，并打印结果。

1. 运行脚本：
   ```bash
   python scenario1.py
   ```

2. 在提示符下输入您的文档问题。

### 场景 2：学习计划生成器（Chainlit Web 应用）
一个基于网页的界面（使用 Chainlit），允许用户为任何技术主题生成个性化的按周学习计划。

1. 启动 Chainlit 应用：
   ```bash
   chainlit run scenario2.py
   ```

2. 在浏览器中打开终端中提供的本地 URL（例如 http://localhost:8000）。
3. 在聊天窗口输入您的学习主题和学习周数（例如 “AI-900 认证，8 周”）。
4. 应用将返回按周排列的学习计划，包括指向相关 Microsoft Learn 文档的链接。

**必需的环境变量：**

要使用场景 2（带有 Azure OpenAI 的 Chainlit Web 应用），您必须在 `python` 目录中的 `.env` 文件里设置以下环境变量：

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

在运行应用前填写您的 Azure OpenAI 资源详细信息。

> [!TIP]
> 您可以使用 [Microsoft Foundry](https://ai.azure.com/) 轻松部署自己的模型。

### 场景 3：VS Code 中编辑器内的 Docs 与 MCP 服务器

无需切换浏览器标签页来搜索文档，您可以直接在 VS Code 中通过 MCP 服务器访问 Microsoft Learn Docs。这样您可以：
- 在 VS Code 内搜索和阅读文档，而无需离开编码环境。
- 直接在 README 或课程文件中引用文档并插入链接。
- 将 GitHub Copilot 和 MCP 结合使用，实现无缝的 AI 驱动文档工作流程。

**示例用例：**
- 编写课程或项目文档时快速向 README 添加参考链接。
- 使用 Copilot 生成代码，使用 MCP 立即查找并引用相关文档。
- 保持专注于编辑器，提高工作效率。

> [!IMPORTANT]
> 确保在您的工作区中存在有效的 [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 配置（位置为 `.vscode/mcp.json`）。

## 为什么为场景 2 选择 Chainlit？

Chainlit 是一个现代开源框架，用于构建对话式 Web 应用。它能轻松创建与后台服务（如 Microsoft Learn Docs MCP 服务器）连接的基于聊天的用户界面。本项目使用 Chainlit 提供一种简洁、交互的方式，实时生成个性化学习计划。借助 Chainlit，您可以快速构建和部署基于聊天的工具，提升生产力和学习效果。

## 功能介绍

该应用允许用户只需输入主题和时长，即可创建个性化学习计划。应用解析您的输入，向 Microsoft Learn Docs MCP 服务器查询相关内容，并将结果组织成结构化的按周计划。每周的推荐内容会在聊天中显示，方便跟进和追踪学习进度。该集成确保您始终获取最新、最相关的学习资源。

## 示例查询

在聊天窗口试试以下查询，看看应用如何响应：

- `AI-900 认证，8 周`
- `学习 Azure Functions，4 周`
- `Azure DevOps，6 周`
- `Azure 数据工程，10 周`
- `Microsoft 安全基础，5 周`
- `Power Platform，7 周`
- `Azure AI 服务，12 周`
- `云架构，9 周`

这些示例展示了该应用针对不同学习目标和时间范围的灵活性。

## 参考资料

- [Chainlit 文档](https://docs.chainlit.io/)
- [MCP 文档](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->