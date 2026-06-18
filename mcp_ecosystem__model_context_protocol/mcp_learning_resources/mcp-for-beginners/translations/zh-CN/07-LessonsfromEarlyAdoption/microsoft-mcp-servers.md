# 🚀 10 个正在改变开发者生产力的微软 MCP 服务器

## 🎯 本指南中你将学到什么

本实用指南展示了十个微软 MCP 服务器，这些服务器正在积极改变开发者与 AI 助手的工作方式。我们不仅会介绍 MCP 服务器<em>能够</em>做什么，更会展示那些已经在微软及其他地区实际开发工作流中带来显著改变的服务器。

本指南中的每个服务器均基于真实使用和开发者反馈精选。你将发现每个服务器不仅做什么，还会了解为什么重要以及如何在自己的项目中充分利用它。不论你是完全刚接触 MCP，还是想扩展已有的设置，这些服务器都代表了微软生态系统中一些最实用、最具影响力的工具。

> **💡 快速入门提示**
> 
> 新手使用 MCP？别担心！本指南面向初学者设计。我们会边讲解边介绍概念，你也可以随时回顾我们的[ MCP 入门](../00-Introduction/README.md)和[核心概念](../01-CoreConcepts/README.md)模块，获取更深入的背景知识。

## 概览

本综合指南探讨了十个微软 MCP 服务器，它们正在革新开发者与 AI 助手及外部工具的交互方式。从 Azure 资源管理到文档处理，这些服务器展示了模型上下文协议（Model Context Protocol）在打造无缝、高效开发流程中的强大功能。

## 学习目标

通过本指南，你将能够：
- 了解 MCP 服务器如何提升开发者生产力
- 熟悉微软最具影响力的 MCP 服务器实现
- 探索每个服务器的实用案例
- 掌握如何在 VS Code 和 Visual Studio 中设置和配置这些服务器
- 探索更广泛的 MCP 生态系统及未来发展方向

## 🔧 了解 MCP 服务器：初学者指南

### 什么是 MCP 服务器？

作为模型上下文协议（MCP）的初学者，你或许会问：“MCP 服务器到底是什么？为什么我需要关心？”让我们用一个简单的比喻开始。

把 MCP 服务器想象成专门的助手，帮助你的 AI 编码伙伴（例如 GitHub Copilot）连接到外部工具和服务。就像你手机上可能用不同的应用完成不同任务——一个查天气，一个导航，一个银行业务——MCP 服务器让你的 AI 助手能够与各种开发工具和服务交互。

### MCP 服务器解决了什么问题

在有 MCP 服务器之前，如果你想要：
- 检查你的 Azure 资源
- 创建一个 GitHub Issue
- 查询数据库
- 搜索文档

你必须暂停编码，打开浏览器，进入相关网站，然后手动执行这些操作。频繁切换上下文会打断你的思路，降低生产效率。

### MCP 服务器如何改变你的开发体验

有了 MCP 服务器，你可以在开发环境（VS Code、Visual Studio 等）中直接让 AI 助手处理这些任务。例如：

**传统流程是这样：**
1. 停止编码
2. 打开浏览器
3. 进入 Azure 门户
4. 查找存储账户细节
5. 返回 VS Code
6. 继续编码

**现在你可以这样做：**
1. 问 AI：“我的 Azure 存储账户状态如何？”
2. 继续编码，同时获取所需信息

### 初学者的主要好处

#### 1. 🔄 <strong>保持专注状态</strong>
- 不再在多个应用间切换
- 专注于正在编写的代码
- 降低管理不同工具的心理负担

#### 2. 🤖 <strong>用自然语言替代复杂命令</strong>
- 不需记忆 SQL 语法，只需描述你需要什么数据
- 不必记 Azure CLI 命令，只需说明你的目标
- 让 AI 处理技术细节，你专注于业务逻辑

#### 3. 🔗 <strong>连接多种工具</strong>
- 通过组合不同服务打造强大工作流
- 例如：“获取所有最新 GitHub Issue 并创建对应的 Azure DevOps 工作项”
- 建立自动化，无需写复杂脚本

#### 4. 🌐 <strong>连接不断成长的生态系统</strong>
- 利用微软、GitHub 及其他厂商构建的服务器
- 跨不同厂商工具无缝组合使用
- 加入跨 AI 助手通用的标准化生态

#### 5. 🛠️ <strong>实践中学习</strong>
- 从预构建服务器入手理解概念
- 随着熟练逐渐构建自己的服务器
- 利用已有的 SDK 和文档引导学习

### 初学者的真实案例

假设你是新手，正在做第一个网页开发项目。MCP 服务器能帮你这样：

**传统方式：**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**有了 MCP 服务器：**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### 企业标准优势

MCP 正成为业界标准，这意味着：
- <strong>一致性</strong>：跨不同工具和公司体验相似
- <strong>互操作性</strong>：不同厂商的服务器协同工作
- <strong>未来兼容</strong>：技能和设置可在多种 AI 助手间迁移
- <strong>社区支持</strong>：拥有庞大的共享知识和资源生态

### 入门：你将学到什么

本指南探讨 10 个微软 MCP 服务器，特别适合各层次开发者使用。每个服务器旨在：
- 解决常见开发难题
- 减少重复任务
- 提升代码质量
- 增强学习机会

> **💡 学习提示**
> 
> 如果你完全不熟悉 MCP，建议先学习我们的[ MCP 入门](../00-Introduction/README.md)和[核心概念](../01-CoreConcepts/README.md)模块。然后再回来，看看微软的真实工具是如何应用这些概念的。
>
> 若想了解 MCP 重要性的更多背景，请参阅 Maria Naggaga 的文章：[Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps)。

## 在 VS Code 和 Visual Studio 中开始使用 MCP 🚀

如果你使用 Visual Studio Code 或 Visual Studio 2022 搭配 GitHub Copilot，设置这些 MCP 服务器非常简单。

### VS Code 设置

VS Code 的基本流程如下：

1. **启用 Agent 模式**：在 VS Code 的 Copilot Chat 窗口切换到 Agent 模式
2. **配置 MCP 服务器**：将服务器配置添加到 VS Code 的 settings.json 文件中
3. <strong>启动服务器</strong>：点击想要使用的每个服务器的“启动”按钮
4. <strong>选择工具</strong>：选择本次会话启用哪些 MCP 服务器

详细的设置说明见[VS Code MCP 文档](https://code.visualstudio.com/docs/copilot/copilot-mcp)。

> **💡 专业提示：像专家一样管理 MCP 服务器！**
> 
> VS Code 扩展视图新增了[方便管理已安装的 MCP 服务器的 UI](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)！你可以快速启动、停止和管理任何已安装的 MCP 服务器，界面清晰简单，快来试试吧！

### Visual Studio 2022 设置

针对 Visual Studio 2022（版本 17.14 或更高）：

1. **启用 Agent 模式**：点击 GitHub Copilot Chat 窗口的“Ask”下拉菜单，选择“Agent”
2. <strong>创建配置文件</strong>：在解决方案目录下创建 `.mcp.json` 文件（推荐路径：`<SOLUTIONDIR>\.mcp.json`）
3. <strong>配置服务器</strong>：使用标准 MCP 格式添加服务器配置
4. <strong>工具批准</strong>：出现提示时，批准你想使用的工具并授予相应权限

详细 Visual Studio 设置文档参见[Visual Studio MCP 文档](https://learn.microsoft.com/visualstudio/ide/mcp-servers)。

每个 MCP 服务器有自己的配置需求（连接字符串、认证等），但两个 IDE 的设置模式一致。

## 来自微软 MCP 服务器的经验教训 🛠️

### 1. 📚 Microsoft Learn Docs MCP 服务器

[![在 VS Code 安装](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![在 VS Code Insiders 安装](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>功能简介</strong>：Microsoft Learn Docs MCP 服务器是一个云托管服务，通过模型上下文协议为 AI 助手提供实时访问微软官方文档的能力。它连接到 `https://learn.microsoft.com/api/mcp`，支持微软 Learn、Azure 文档、Microsoft 365 文档及其他微软官方资源的语义搜索。

<strong>为何有用</strong>：虽说这只是“文档”，但对于使用微软技术的开发者来说至关重要。许多 .NET 开发者抱怨 AI 编码助手没有更新到最新的 .NET 和 C# 版本。Microsoft Learn Docs MCP 服务器解决了这个问题，提供了最新的文档、API 参考和最佳实践的实时访问。不论你是在使用最新的 Azure SDK，探索 C# 13 新特性，还是实现先进的 .NET Aspire 模式，这个服务器确保你的 AI 助手能获得权威且最新的信息，从而生成准确且现代的代码。

<strong>实际应用</strong>：诸如“根据官方 Microsoft Learn 文档，如何使用 az cli 创建 Azure 容器应用？”或者“如何在 ASP.NET Core 中配置带依赖注入的 Entity Framework？”又或者“检查这段代码是否符合 Microsoft Learn 文档中的性能建议？”服务器利用先进的语义搜索，全面覆盖 Microsoft Learn、Azure 和 Microsoft 365 文档，返回最多 10 条高质量内容块，包括文章标题和链接，始终访问最新发布文档。

<strong>特色示例</strong>：此服务器暴露了 `microsoft_docs_search` 工具，能针对微软官方技术文档执行语义搜索。配置完成后，你可以提问如“如何在 ASP.NET Core 中实现 JWT 认证？”并获得详细的官方答案及来源链接。搜索精准性高，因为能理解上下文——比如问“容器”在 Azure 语境下会返回 Azure Container Instances 文档，而在 .NET 语境下返回相关 C# 集合信息。

这对快速变化或新发布的库及用例尤为有用。举例来说，我最近在一些编码项目中想利用 .NET Aspire 和 Microsoft.Extensions.AI 的最新功能，通过加入 Microsoft Learn Docs MCP 服务器，不仅能访问 API 文档，还能获取新发布的示例和指导。

> **💡 专业提示**
> 
> 即使是擅长工具的模型也需要引导使用 MCP 工具！可以考虑添加系统提示或[ copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)内容，比如：“你可以访问 `microsoft.docs.mcp` — 在处理涉及 C#、Azure、ASP.NET Core 或 Entity Framework 的微软技术问题时，使用此工具搜索微软最新官方文档。”
>
> 想看具体示例？请查阅 Awesome GitHub Copilot 仓库中的[C# .NET 清洁工聊天模式](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md)，该模式专门利用 Microsoft Learn Docs MCP 服务器，帮助清理和现代化 C# 代码，应用最新设计模式和实践。
### 2. ☁️ Azure MCP 服务器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：Azure MCP 服务器是一套包含 15+ 个专门 Azure 服务连接器的综合工具，将整个 Azure 生态系统引入您的 AI 工作流。这不仅仅是一个单一服务器——它是一个强大的集合，涵盖资源管理、数据库连接（PostgreSQL、SQL Server）、使用 KQL 的 Azure Monitor 日志分析、Cosmos DB 集成，以及更多功能。

<strong>它的用途</strong>：除了管理 Azure 资源外，当您使用 Azure MCP 的代理模式时，它极大地提升了使用 Azure SDK 编码的质量。它不仅帮助您写代码——还帮助您写<em>更好</em>的 Azure 代码，遵循当前的身份验证模式、错误处理最佳实践，并利用最新的 SDK 功能。您获得的代码不是通用的可能可用代码，而是遵循 Azure 推荐的生产工作负载模式的代码。

<strong>关键模块包括</strong>：
- **🗄️ 数据库连接器**：支持用自然语言直接访问 Azure Database for PostgreSQL 和 SQL Server
- **📊 Azure Monitor**：基于 KQL 的日志分析和运营洞察
- **🌐 资源管理**：完整的 Azure 资源生命周期管理
- **🔐 身份验证**：DefaultAzureCredential 和托管身份模式
- **📦 存储服务**：Blob 存储、队列存储和表存储操作
- **🚀 容器服务**：Azure Container Apps、容器实例和 AKS 管理
- <strong>以及更多专门连接器</strong>

<strong>真实使用案例</strong>：“列出我的 Azure 存储账户”、“查询我 Log Analytics 工作区最近一小时的错误”或“帮助我用 Node.js 构建一个带有正确身份验证的 Azure 应用”

<strong>完整演示场景</strong>：以下演示展示了将 Azure MCP 和 GitHub Copilot for Azure 扩展结合使用的强大功能。当您同时安装并输入：

> “创建一个 Python 脚本，使用 DefaultAzureCredential 认证上传文件到 Azure Blob Storage。脚本应连接到名为 ‘mycompanystorage’ 的 Azure 存储账户，上传到名为 ‘documents’ 的容器，创建一个带当前时间戳的测试文件进行上传，优雅处理错误并提供详尽输出，遵循 Azure 身份验证和错误处理最佳实践，包含注释解释 DefaultAzureCredential 认证的工作原理，且脚本结构合理，包含适当的函数和文档。”

Azure MCP 服务器将生成一个完整的、可用于生产环境的 Python 脚本，具备：
- 使用最新 Azure Blob Storage SDK 的正确异步模式
- 实现 DefaultAzureCredential，详尽解释回退链
- 包含健壮错误处理和特定 Azure 异常类型
- 遵循 Azure SDK 资源管理和连接处理最佳实践
- 提供详细日志和信息丰富的控制台输出
- 结构合理，带有函数、文档和类型提示

令人惊叹的是，没有 Azure MCP 时，您可能只会得到可用但不符合当前 Azure 模式的通用 Blob 存储代码。而使用 Azure MCP，您获得的代码利用最新认证方法，处理特定 Azure 错误场景，并遵循微软推荐的生产应用最佳实践。

<strong>特色示例</strong>：我常常记不住 `az` 和 `azd` CLI 的具体命令，通常是先查语法再运行命令。因为记不住 CLI 语法，我有时干脆登录门户点点界面完成工作。能够用自然语言描述需求简直太棒了，更棒的是可以不离开 IDE 就完成这件事！

可以在 [Azure MCP 仓库](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server) 中找到丰富的使用案例。关于详细设置指南和高级配置选项，请查看[官方 Azure MCP 文档](https://learn.microsoft.com/azure/developer/azure-mcp-server/)。

### 3. 🐙 GitHub MCP 服务器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

<strong>它的功能</strong>：官方 GitHub MCP 服务器提供与 GitHub 整个平台的无缝集成，支持托管远程访问和本地 Docker 部署选项。这不仅仅是基本的仓库操作——它是一整套工具，包括 GitHub Actions 管理、拉取请求工作流、问题跟踪、安全扫描、通知以及高级自动化功能。

<strong>它的用途</strong>：此服务器改变了您与 GitHub 的交互方式，将完整平台体验直接带入开发环境。您无需频繁切换 VS Code 和 GitHub.com 之间进行项目管理、代码审查和 CI/CD 监控，而能通过自然语言命令一站式处理所有事务，更专注写代码。

> **ℹ️ 注意：不同类型的“代理”**
>
> 不要将此 GitHub MCP 服务器与 GitHub 的 Coding Agent 混淆（即您可分配问题进行自动编码任务的 AI 代理）。GitHub MCP 服务器在 VS Code 的代理模式下提供 GitHub API 集成，而 GitHub 的 Coding Agent 是另一项功能，会在被分配 GitHub Issues 时创建拉取请求。

<strong>关键能力包括</strong>：
- **⚙️ GitHub Actions**：完整 CI/CD 管道管理、工作流监控和产物处理
- **🔀 拉取请求**：创建、审查、合并及状态管理
- **🐛 问题**：全生命周期管理、评论、标签和指派
- **🔒 安全**：代码扫描警报、秘密检测和 Dependabot 集成
- **🔔 通知**：智能通知管理和仓库订阅控制
- **📁 仓库管理**：文件操作、分支管理和仓库管理
- **👥 协作**：用户和组织搜索、团队管理和访问控制

<strong>真实使用案例</strong>：“从我的功能分支创建一个拉取请求”、“显示本周所有失败的 CI 运行”、“列出我仓库的未关闭安全警报”或“查找所有分配给我的组织内问题”

<strong>完整演示场景</strong>：以下是展示 GitHub MCP 服务器强大功能的工作流程：

> “我需要准备冲刺评审。显示本周我创建的所有拉取请求，检查我们的 CI/CD 管道状态，生成需要解决的安全警报总结，帮我根据标签为 ‘feature’ 的合并拉取请求起草发布说明。”

GitHub MCP 服务器将：
- 查询您最近的拉取请求及详细状态信息
- 分析工作流运行，标出失败或性能问题
- 汇总安全扫描结果，优先处理关键警报
- 通过提取合并 PR 信息生成综合发布说明
- 提供冲刺计划和发布准备的可执行后续步骤

<strong>特色示例</strong>：我喜欢用它处理代码审查工作流程。无需跳转 VS Code、GitHub 通知和拉取请求页面，只需说“显示所有待我审核的 PR”，然后“给 PR #123 添加评论，询问身份验证方法中的错误处理”。服务器会调用 GitHub API，保持上下文，甚至帮我写更具建设性的评审评论。

<strong>身份验证选项</strong>：服务器支持 OAuth（在 VS Code 内无缝体验）和个人访问令牌，配置灵活，只启用所需 GitHub 功能。可作为远程托管服务快速部署，或通过 Docker 本地运行以实现完全控制。

> **💡 专业提示**
>
> 通过在 MCP 服务器设置中配置 `--toolsets` 参数，仅启用必要的工具集，以减少上下文大小并优化 AI 工具选择。例如，对核心开发流程，添加 `"--toolsets", "repos,issues,pull_requests,actions"`；如果只需 GitHub 监控功能，则用 `"--toolsets", "notifications, security"`。

### 4. 🔄 Azure DevOps MCP 服务器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

<strong>它的功能</strong>：连接 Azure DevOps 服务，支持全面的项目管理、工作项跟踪、构建管道管理和仓库操作。

<strong>它的用途</strong>：对于使用 Azure DevOps 作为主要 DevOps 平台的团队，这款 MCP 服务器消除了在开发环境与 Azure DevOps 网页界面之间频繁切换的痛苦。您可以直接通过 AI 助手管理工作项、查看构建状态、查询仓库以及处理项目管理任务。

<strong>真实使用案例</strong>：“显示当前迭代 WebApp 项目所有活动工作项”、“为我刚发现的登录问题创建缺陷报告”或“检查构建管道状态并显示最近失败的构建”

<strong>特色示例</strong>：无须离开开发环境，即可轻松查询团队当前迭代的状态，如“显示当前迭代 WebApp 项目所有活动工作项”或“为我刚发现的登录问题创建缺陷报告”。

### 5. 📝 MarkItDown MCP 服务器
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

<strong>它的功能</strong>：MarkItDown 是一个综合性的文档转换服务器，可以将多种文件格式转换为高质量的 Markdown，优化用于大语言模型（LLM）消费和文本分析工作流。

<strong>它的用途</strong>：现代文档工作流的必备工具！MarkItDown 支持多种文件格式，同时保留重要的文档结构，如标题、列表、表格和链接。不同于简单的文本提取工具，它专注于保持语义意义和格式，对于 AI 处理和人工可读性都非常有价值。

<strong>支持的文件格式</strong>：
- **Office 文档**：PDF、PowerPoint（PPTX）、Word（DOCX）、Excel（XLSX/XLS）
- <strong>媒体文件</strong>：图像（带 EXIF 元数据和 OCR）、音频（带 EXIF 元数据和语音转录）
- <strong>网页内容</strong>：HTML、RSS 源、YouTube URL、维基百科页面
- <strong>数据格式</strong>：CSV、JSON、XML、ZIP 文件（递归处理内容）
- <strong>出版格式</strong>：EPub、Jupyter 笔记本（.ipynb）
- <strong>电子邮件</strong>：Outlook 邮件（.msg）
- <strong>高级</strong>：集成 Azure 文档智能增强 PDF 处理能力

<strong>高级功能</strong>：MarkItDown 支持基于 LLM 的图像描述（需提供 OpenAI 客户端）、Azure 文档智能以增强 PDF 处理、音频转写语音内容以及通过插件系统扩展支持更多文件格式。

<strong>实际应用</strong>：“将这个 PowerPoint 演示文稿转换为我们文档站点用的 Markdown”、“从这个 PDF 中提取带有正确标题结构的文本”，或者“将这个 Excel 表格转换为可读的表格格式”。

<strong>特色示例</strong>：引用 [MarkItDown 文档](https://github.com/microsoft/markitdown#why-markdown)：

> Markdown 非常接近纯文本，标记或格式最小，但仍提供表示重要文档结构的方式。主流大语言模型，如 OpenAI 的 GPT-4o，原生“理解”Markdown，且常在回复中自发包含 Markdown。这表明它们已在大量 Markdown 格式文本上训练，对其理解良好。作为额外好处，Markdown 规范的标记效率也非常高。

MarkItDown 非常擅长保留文档结构，这对 AI 工作流极其重要。例如，在转换 PowerPoint 演示文稿时，它保留幻灯片组织结构并使用恰当的标题，提取表格为 Markdown 表格，包含图像的替代文本，甚至处理演讲者备注。图表被转换为可读的数据表格，生成的 Markdown 维护了原始演示的逻辑流程。这使得它非常适合将演示内容输入 AI 系统或从现有幻灯片创建文档。

### 6. 🗃️ SQL Server MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

<strong>它的功能</strong>：提供对 SQL Server 数据库（本地、Azure SQL 或 Fabric）的对话式访问

<strong>它的用途</strong>：类似于 PostgreSQL 服务器，但专为 Microsoft SQL 生态系统设计。通过简单的连接字符串连接后，即可使用自然语言开始查询 —— 不再需要切换上下文！

<strong>实际应用</strong>：“查找过去 30 天内未完成的所有订单”被转换为合适的 SQL 查询并返回格式化结果。

<strong>特色示例</strong>：一旦设置了数据库连接，您就可以立即开始与数据对话。博客文章中通过一个简单的问题展示了这一点：“你连接的是哪个数据库？”MCP 服务器通过调用相应的数据库工具，连接到 SQL Server 实例，并返回关于当前数据库连接的详细信息 —— 全程无需编写一行 SQL。服务器支持从模式管理到数据操作的全面数据库操作，全部通过自然语言提示完成。有关完整设置说明和与 VS Code 及 Claude Desktop 的配置示例，请参见：[Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/)。

### 7. 🎭 Playwright MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

<strong>它的功能</strong>：使 AI 代理能够与网页交互，用于测试和自动化

> **ℹ️ 支持 GitHub Copilot**
> 
> Playwright MCP Server 为 GitHub Copilot 的编码代理提供网页浏览功能！[了解此功能](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/)。

<strong>它的用途</strong>：非常适合通过自然语言描述驱动的自动化测试。AI 可导航网站、填写表单，并通过结构化的可访问性快照提取数据 —— 这真是极具威力的功能！

<strong>实际应用</strong>：“测试登录流程并验证仪表盘是否正确加载”或“生成一个测试，搜索产品并验证结果页面” —— 全部无需应用程序源代码。

<strong>特色示例</strong>：我的队友 Debbie O'Brien 最近在 Playwright MCP Server 方面做了很棒的工作！例如，她最近展示了如何在没有访问应用程序源代码的情况下生成完整的 Playwright 测试。在她的场景中，她让 Copilot 为一个电影搜索应用创建测试：打开网站，搜索“Garfield”，并验证电影是否出现在结果中。MCP 启动了浏览器会话，通过 DOM 快照浏览页面结构，找出正确的选择器，生成了一个完整且首次运行就通过的 TypeScript 测试。

这项技术的强大之处在于它桥接了自然语言指令与可执行测试代码之间的鸿沟。传统方法需要手动编写测试或访问代码库获取上下文。但通过 Playwright MCP，您可以测试外部网站、客户端应用，或进行无代码访问的黑盒测试。

### 8. 💻 Dev Box MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

<strong>它的功能</strong>：通过自然语言管理 Microsoft Dev Box 环境

<strong>它的用途</strong>：极大简化了开发环境管理！无需记忆特定命令即可创建、配置和管理开发环境。

<strong>实际应用</strong>：“为我们的项目设置带最新 .NET SDK 的新 Dev Box 并进行配置”、“查看我所有开发环境的状态”，或“创建一个团队演示用的标准演示环境”。

<strong>特色示例</strong>：我非常喜欢在个人开发中使用 Dev Box。我的灵感来源是当 James Montemagno 解释 Dev Box 适合会议演示时，因为无论我在会议、酒店还是飞机 Wi-Fi 环境下，它都有超高速以太网连接。事实上，我最近在从布鲁日到安特卫普的公交车上，通过手机热点连接笔记本电脑练习会议演示！接下来我计划深入研究团队多开发环境管理和标准化演示环境。另一个我从客户和同事那里听到的重要用例当然是用于预配置开发环境。无论哪种情况，使用 MCP 配置和管理 Dev Box 允许您使用自然语言交互，同时保持在开发环境内。

### 9. 🤖 Microsoft Foundry MCP Server
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

<strong>作用</strong>：Microsoft Foundry MCP 服务器为开发人员提供对 Azure AI 生态系统的全面访问，包括模型目录、部署管理、使用 Azure AI Search 的知识索引和评估工具。这个实验性服务器弥合了 AI 开发与 Azure 强大 AI 基础设施之间的鸿沟，使构建、部署和评估 AI 应用变得更加容易。

<strong>为什么有用</strong>：该服务器通过将企业级 AI 功能直接引入开发工作流，改变了您使用 Azure AI 服务的方式。您无需在 Azure 门户、文档和集成开发环境之间切换，即可通过自然语言命令发现模型、部署服务、管理知识库和评估 AI 性能。对于构建检索增强生成（RAG）应用、管理多模型部署或实施全面 AI 评估流程的开发者尤为强大。

<strong>关键开发功能</strong>：
- **🔍 模型发现与部署**：浏览 Microsoft Foundry 的模型目录，获取详细模型信息及代码示例，并将模型部署到 Azure AI 服务
- **📚 知识管理**：创建和管理 Azure AI Search 索引，添加文档，配置索引器，构建复杂的 RAG 系统
- **⚡ AI 代理集成**：连接 Azure AI 代理，查询现有代理，并评估代理在生产环境中的表现
- **📊 评估框架**：执行全面的文本和代理评估，生成 Markdown 报告，实施 AI 应用的质量保证
- **🚀 原型工具**：获取基于 GitHub 的原型搭建说明，并访问 Microsoft Foundry Labs 以使用前沿研究模型

<strong>实际开发使用案例</strong>：“将 Phi-4 模型部署到我的应用的 Azure AI 服务中”， “为我的文档 RAG 系统创建新的搜索索引”， “根据质量指标评估我的代理响应”，或“寻找适合我复杂分析任务的最佳推理模型”

<strong>完整演示场景</strong>：以下是一个强大的 AI 开发工作流示例：

> “我正在构建一个客户支持代理。帮我从目录中找到一个合适的推理模型，将其部署到 Azure AI 服务，基于我们的文档创建知识库，设置评估框架以测试响应质量，然后帮助我使用 GitHub 令牌进行原型集成测试。”

Microsoft Foundry MCP 服务器将：
- 查询模型目录，根据您的需求推荐最优推理模型
- 提供部署命令和您选择的 Azure 区域的配额信息
- 为您的文档设置带有正确架构的 Azure AI Search 索引
- 配置带有质量指标和安全检查的评估流程
- 生成带有 GitHub 验证的原型代码，便于即时测试
- 提供针对您具体技术栈的全面设置指南

<strong>精选示例</strong>：作为一名开发者，我一直难以跟上不同的大型语言模型。虽知道几个主要模型，但总觉得错过了一些生产力和效率提升。代币和配额管理让人压力大，常常不知道是否为合适任务选择了正确模型，或是否浪费了预算。最近我从 James Montemagno 那里听说了这个 MCP 服务器，准备尝试使用！其模型发现能力对我这样想超越常用模型、寻找针对特定任务优化模型的人尤其有吸引力。评估框架也能帮我验证是否真获得了更好效果，而不是盲目尝试新东西。

> **ℹ️ 实验状态**
> 
> 此 MCP 服务器处于实验阶段，且持续更新中。功能和 API 可能会变动。非常适合探索 Azure AI 功能和构建原型，但用于生产请验证稳定性需求。
### 10. 🏢 Microsoft 365 Agents Toolkit MCP 服务器

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

<strong>作用</strong>：为开发者提供构建与 Microsoft 365 和 Microsoft 365 Copilot 集成的 AI 代理和应用的必备工具，包括架构验证、示例代码检索和故障排除支持。

<strong>为什么有用</strong>：为 Microsoft 365 和 Copilot 构建涉及复杂的清单架构和特定开发模式。此 MCP 服务器将关键开发资源直接带入您的编码环境，帮助您验证架构、查找示例代码和排查常见问题，无需频繁查阅文档。

<strong>实际使用</strong>：“验证我的声明式代理清单并修复任何架构错误”，“给我看实现 Microsoft Graph API 插件的示例代码”，或“帮我排查 Teams 应用认证问题”

<strong>精选示例</strong>：我在 Build 大会跟 John Miller 聊过 M365 Agents 后联系了他，他推荐了这个 MCP。对刚接触 M365 Agents 的开发者非常合适，提供模板、示例代码和脚手架，让你不用淹没在文档中就能快速上手。架构验证功能看起来特别有用，能避免导致数小时调试的清单结构错误。

> **💡 专家提示**
> 
> 结合 Microsoft Learn Docs MCP 服务器一起使用，获得全面的 M365 开发支持——一个提供官方文档，另一个提供实用工具和故障排除 assistance。


## 下一步？ 🔮

## 📋 结论

模型上下文协议（MCP）正在改变开发者与 AI 助手和外部工具的互动方式。以上 10 个微软 MCP 服务器展示了标准化 AI 集成的强大能力，使工作流无缝衔接，帮助开发者保持高效状态同时访问强大的外部功能。

从全面集成的 Azure 生态系统，到专门工具如用于浏览器自动化的 Playwright 和文档处理的 MarkItDown，这些服务器展示了 MCP 如何在各种开发场景中提升生产力。标准化协议确保这些工具协同工作，打造统一的开发体验。

随着 MCP 生态系统不断发展，积极参与社区、探索新服务器和构建定制解决方案，将是最大化开发效率的关键。MCP 的开放标准特性意味着您可以混合使用不同厂商的工具，打造专属完美工作流。

## 🔗 额外资源

- [微软官方 MCP 仓库](https://github.com/microsoft/mcp)
- [MCP 社区与文档](https://modelcontextprotocol.io/introduction)
- [VS Code MCP 文档](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP 文档](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP 文档](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP 事件](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Awesome GitHub Copilot 自定义](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP 开发日直播 7 月 29/30 日，或点播观看](https://aka.ms/mcpdevdays)

## 🎯 练习

1. <strong>安装与配置</strong>：在 VS Code 环境中安装一个 MCP 服务器并测试基本功能。
2. <strong>工作流整合</strong>：设计一个融合至少三个 MCP 服务器的开发工作流。
3. <strong>自定义服务器规划</strong>：找出日常开发中可受益于自定义 MCP 服务器的任务，并制定规格。
4. <strong>性能分析</strong>：比较使用 MCP 服务器与传统方法在常见开发任务中的效率差异。
5. <strong>安全评估</strong>：评估 MCP 服务器在您的开发环境中的安全影响并提出最佳实践。


Next:[Best Practices](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->