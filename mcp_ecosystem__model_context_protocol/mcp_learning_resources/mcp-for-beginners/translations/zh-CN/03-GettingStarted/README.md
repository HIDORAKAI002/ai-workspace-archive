## 入门指南  

[![构建你的第一个 MCP 服务器](../../../translated_images/zh-CN/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(点击上方图片观看本课视频)_

本节包含多个课程：

- **1 你的第一个服务器**，在本课中，你将学习如何创建你的第一个服务器并使用检查器工具进行检查，这是一种测试和调试服务器的宝贵方式，[前往课程](01-first-server/README.md)

- **2 客户端**，本课中你将学习如何编写可以连接到服务器的客户端，[前往课程](02-client/README.md)

- **3 具有 LLM 的客户端**，更好的客户端写法是添加一个 LLM，使其能与服务器“协商”如何处理，[前往课程](03-llm-client/README.md)

- **4 在 Visual Studio Code 中使用 GitHub Copilot Agent 模式消费服务器**。这里我们讲解如何在 Visual Studio Code 中运行我们的 MCP 服务器，[前往课程](04-vscode/README.md)

- **5 stdio 传输服务器**，stdio 传输是本地 MCP 服务器到客户端通信的推荐标准，提供基于子进程的安全通信及内建的进程隔离，[前往课程](05-stdio-server/README.md)

- **6 MCP HTTP 流传输（可流式 HTTP）**，学习现代 HTTP 流传输技术（根据 [MCP 规范 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http) 推荐用于远程 MCP 服务器），进度通知，以及如何使用可流式 HTTP 实现可扩展的实时 MCP 服务器和客户端，[前往课程](06-http-streaming/README.md)

- **7 利用 VSCode 的 AI 工具包** 来消费和测试你的 MCP 客户端和服务器 [前往课程](07-aitk/README.md)

- **8 测试**。本课重点讲述如何以各种方式测试服务器和客户端，[前往课程](08-testing/README.md)

- **9 部署**。本章介绍部署 MCP 解决方案的多种方式，[前往课程](09-deployment/README.md)

- **10 高级服务器用法**。本章涵盖高级服务器用法，[前往课程](./10-advanced/README.md)

- **11 认证**。本章介绍如何添加简单认证，从基础认证到使用 JWT 和 RBAC。建议你从这里开始，然后查看第 5 章的高级主题和第 2 章的安全加固建议，[前往课程](./11-simple-auth/README.md)

- **12 MCP 主机**。配置并使用流行的 MCP 主机客户端，包括 Claude Desktop、Cursor、Cline 和 Windsurf。了解传输类型及故障排查，[前往课程](./12-mcp-hosts/README.md)

- **13 MCP 检查器**。使用 MCP 检查器工具交互式调试和测试 MCP 服务器。学习故障排查工具、资源和协议消息，[前往课程](./13-mcp-inspector/README.md)

- **14 采样**。创建协同进行 LLM 相关任务的 MCP 服务器（于 `2026-07-28` 发行候选版弃用；对于 `2025-11-25` 仍有效）。[前往课程](./14-sampling/README.md)

- **15 MCP 应用**。构建同时回复 UI 指令的 MCP 服务器，[前往课程](./15-mcp-apps/README.md)

模型上下文协议（MCP）是一种开放协议，规范了应用向 LLM 提供上下文的方式。可以把 MCP 想象成 AI 应用的 USB-C 端口——它提供了一种标准化方式将 AI 模型连接到不同数据源和工具。

## 学习目标

完成本课后，你将能够：

- 为 C#、Java、Python、TypeScript 和 JavaScript 设置 MCP 开发环境
- 构建和部署具备自定义功能（资源、提示和工具）的基础 MCP 服务器
- 创建连接到 MCP 服务器的主机应用
- 测试和调试 MCP 实现
- 理解常见配置挑战及其解决方案
- 将你的 MCP 实现连接到流行的 LLM 服务

## 设置你的 MCP 环境

在开始使用 MCP 之前，准备开发环境并了解基本工作流程非常重要。本节将引导你完成初始设置步骤，确保顺利开始 MCP 之旅。

### 前提条件

在开始 MCP 开发之前，请确认你已具备：

- <strong>开发环境</strong>：针对你选择的语言（C#、Java、Python、TypeScript 或 JavaScript）
- **IDE/编辑器**：Visual Studio、Visual Studio Code、IntelliJ、Eclipse、PyCharm 或任何现代代码编辑器
- <strong>包管理器</strong>：NuGet、Maven/Gradle、pip 或 npm/yarn
- **API 密钥**：用于主机应用中计划使用的任何 AI 服务


### 官方 SDK

在接下来的章节中，你将看到采用 Python、TypeScript、Java 和 .NET 构建的解决方案。以下是所有官方支持的 SDK。

MCP 提供了多个语言的官方 SDK（符合 [MCP 规范 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)）：
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - 与微软合作维护
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - 与 Spring AI 合作维护
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - 官方 TypeScript 实现
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - 官方 Python 实现（FastMCP）
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - 官方 Kotlin 实现
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - 与 Loopwork AI 合作维护
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - 官方 Rust 实现
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - 官方 Go 实现

## 关键要点

- 通过针对语言的 SDK 设置 MCP 开发环境十分简单
- 构建 MCP 服务器包括创建并注册具备明确 schema 的工具
- MCP 客户端连接服务器和模型以利用扩展功能
- 测试和调试对于可靠的 MCP 实现必不可少
- 部署选项涵盖从本地开发到云端解决方案

## 练习

我们提供了一套示例，作为本节所有章节练习的补充。此外，每个章节还有自己的练习和作业。

- [Java 计算器](./samples/java/calculator/README.md)
- [.Net 计算器](../../../03-GettingStarted/samples/csharp)
- [JavaScript 计算器](./samples/javascript/README.md)
- [TypeScript 计算器](./samples/typescript/README.md)
- [Python 计算器](../../../03-GettingStarted/samples/python)

## 其他资源

- [使用 Model Context Protocol 构建 Azure 代理](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [使用 Azure 容器应用的远程 MCP（Node.js/TypeScript/JavaScript）](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP 代理](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## 接下来

从第一课开始：[创建你的第一个 MCP 服务器](01-first-server/README.md)

完成本模块后，继续学习：[模块 4：实践实现](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->