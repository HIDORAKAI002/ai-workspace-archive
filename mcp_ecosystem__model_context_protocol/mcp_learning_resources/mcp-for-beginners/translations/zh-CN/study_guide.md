# 面向初学者的模型上下文协议 (MCP) 学习指南

本学习指南提供了“面向初学者的模型上下文协议 (MCP)”课程的仓库结构和内容概览。使用此指南可高效浏览仓库并充分利用可用资源。

## 仓库概览

模型上下文协议（MCP）是 AI 模型与客户端应用程序之间交互的标准化框架。最初由 Anthropic 创建，MCP 现由官方 GitHub 组织内更广泛的 MCP 社区维护。该仓库提供了涵盖 C#、Java、JavaScript、Python 和 TypeScript 的完整课程和实操代码示例，面向 AI 开发人员、系统架构师和软件工程师设计。

## 可视化课程地图

```mermaid
mindmap
  root((初学者的MCP))
    00. Introduction
      ::icon(fa fa-book)
      (协议概述)
      (标准化的好处)
      (现实世界的用例)
      (AI 集成基础)
    01. Core Concepts
      ::icon(fa fa-puzzle-piece)
      (客户端-服务器架构)
      (协议组件)
      (消息模式)
      (传输机制)
      (任务 - 实验性)
      (工具注释)
    02. Security
      ::icon(fa fa-shield)
      (AI 特定威胁)
      (2025最佳实践)
      (Azure 内容安全)
      (身份验证与授权)
      (Microsoft 提示保护)
      (OWASP MCP 前十)
      (Sherpa 安全研讨会)
    03. Getting Started
      ::icon(fa fa-rocket)
      (第一个服务器实现)
      (客户端开发)
      (LLM 客户端集成)
      (VS Code 扩展)
      (SSE 服务器设置)
      (HTTP 流)
      (AI 工具包集成)
      (测试框架)
      (高级服务器使用)
      (简单认证)
      (部署策略)
      (MCP 主机设置)
      (MCP 检查器)
    04. Practical Implementation
      ::icon(fa fa-code)
      (多语言 SDK)
      (测试与调试)
      (提示模板)
      (示例项目)
      (生产模式)
      (分页策略)
    05. Advanced Topics
      ::icon(fa fa-graduation-cap)
      (上下文工程)
      (Foundry 代理集成)
      (多模态 AI 工作流)
      (OAuth2 认证)
      (实时搜索)
      (流协议)
      (根上下文)
      (路由策略)
      (采样技术)
      (扩展解决方案)
      (安全加固)
      (Entra ID 集成)
      (Web 搜索 MCP)
      (协议功能深入)
      (对抗多代理推理)
      
    06. Community
      ::icon(fa fa-users)
      (代码贡献)
      (文档)
      (MCP 客户端生态)
      (MCP 服务器注册)
      (图像生成工具)
      (GitHub 协作)
    07. Early Adoption
      ::icon(fa fa-lightbulb)
      (生产部署)
      (Microsoft MCP 服务器)
      (Azure MCP 服务)
      (企业案例研究)
      (未来路线图)
    08. Best Practices
      ::icon(fa fa-check)
      (性能优化)
      (容错)
      (系统弹性)
      (监控与可观测性)
    09. Case Studies
      ::icon(fa fa-file-text)
      (Azure API 管理)
      (AI 旅行代理)
      (Azure DevOps 集成)
      (文档 MCP)
      (GitHub MCP 注册)
      (VS Code 集成)
      (实际应用实施)
    10. Hands-on Workshop
      ::icon(fa fa-laptop)
      (MCP 服务器基础)
      (高级开发)
      (AI 工具包集成)
      (生产部署)
      (4 个实验室结构)
    11. Database Integration Labs
      ::icon(fa fa-database)
      (PostgreSQL 集成)
      (零售分析用例)
      (行级安全)
      (语义搜索)
      (生产部署)
      (13 个实验室结构)
      (动手学习)
```

## 仓库结构

仓库组织为十一大部分，每部分侧重于 MCP 的不同方面：

1. **介绍 (00-Introduction/)**
   - 模型上下文协议概述
   - AI 流水线中标准化的重要性
   - 实用案例及优点

2. **核心概念 (01-CoreConcepts/)**
   - 客户端-服务器架构
   - 协议关键组件
   - MCP 中的信息传递模式

3. **安全 (02-Security/)**
   - MCP 系统中的安全威胁
   - 安全实现最佳实践
   - 认证和授权策略
   - <strong>全面安全文档</strong>：
     - MCP 2025 年安全最佳实践
     - Azure 内容安全实施指南
     - MCP 安全控制与技术
     - MCP 最佳实践速查
   - <strong>主要安全主题</strong>：
     - 提示注入与工具中毒攻击
     - 会话劫持与混淆代理问题
     - 令牌透传漏洞
     - 过度权限及访问控制
     - AI 组件供应链安全
     - 微软提示防护集成

4. **快速入门 (03-GettingStarted/)**
   - 环境搭建与配置
   - 创建基础 MCP 服务器和客户端
   - 与现有应用集成
   - 包括章节：
     - 首个服务器实现
     - 客户端开发
     - LLM 客户端集成
     - VS Code 集成
     - 服务器推送事件 (SSE) 服务器
     - 高级服务器用法
     - HTTP 流式传输
     - AI 工具包集成
     - 测试策略
     - 部署指南

5. **实战实现 (04-PracticalImplementation/)**
   - 多语言 SDK 使用
   - 调试、测试与验证技巧
   - 设计可复用的提示模板与工作流
   - 示例项目及实现案例

6. **高级主题 (05-AdvancedTopics/)**
   - 上下文工程技术
   - Foundry 代理集成
   - 多模态 AI 工作流
   - OAuth2 认证演示
   - 实时搜索功能
   - 实时流式传输
   - 根上下文实现
   - 路由策略
   - 采样技术
   - 扩展方法
   - 安全考虑
   - Entra ID 安全集成
   - 网络搜索集成
   - 对抗性多代理推理（辩论模式）

7. **社区贡献 (06-CommunityContributions/)**
   - 如何贡献代码和文档
   - 通过 GitHub 协作
   - 社区驱动的增强功能与反馈
   - 使用各类 MCP 客户端（Claude 桌面版，Cline，VSCode）
   - 使用包括图像生成的流行 MCP 服务器

8. **早期采用经验 (07-LessonsfromEarlyAdoption/)**
   - 真实案例和成功故事
   - MCP 解决方案构建与部署
   - 趋势与未来路线图
   - **微软 MCP 服务器指南**：详尽介绍 10 个生产就绪的微软 MCP 服务器，包括：
     - Microsoft Learn Docs MCP 服务器
     - Azure MCP 服务器（15+ 专用连接器）
     - GitHub MCP 服务器
     - Azure DevOps MCP 服务器
     - MarkItDown MCP 服务器
     - SQL Server MCP 服务器
     - Playwright MCP 服务器
     - Dev Box MCP 服务器
     - Microsoft Foundry MCP 服务器
     - Microsoft 365 Agents Toolkit MCP 服务器

9. **最佳实践 (08-BestPractices/)**
   - 性能调优与优化
   - 设计容错 MCP 系统
   - 测试与弹性策略

10. **案例研究 (09-CaseStudy/)**
    - <strong>七个全面案例研究</strong>，展示 MCP 在多种场景的灵活性：
    - **Azure AI 旅行代理**：使用 Azure OpenAI 和 AI Search 多代理编排
    - **Azure DevOps 集成**：用 YouTube 数据更新自动化工作流
    - <strong>实时文档检索</strong>：带流式 HTTP 的 Python 控制台客户端
    - <strong>交互式学习计划生成器</strong>：基于 Chainlit 的 Web 应用和对话式 AI
    - <strong>编辑器内文档</strong>：VS Code 与 GitHub Copilot 工作流集成
    - **Azure API 管理**：企业 API 集成及 MCP 服务器创建
    - **GitHub MCP 注册表**：生态开发与代理集成平台
    - 实现范例涵盖企业集成、开发者生产力和生态开发

11. **实战工作坊 (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - 综合实战工作坊，结合 MCP 与 AI 工具包
    - 构建连接 AI 模型与现实工具的智能应用
    - 涵盖基础知识、自定义服务器开发及生产部署策略的实用模块
    - <strong>实验结构</strong>：
      - 实验 1：MCP 服务器基础
      - 实验 2：高级 MCP 服务器开发
      - 实验 3：AI 工具包集成
      - 实验 4：生产部署与扩展
    - 基于实验室的逐步指导方法

12. **MCP 服务器数据库集成实验 (11-MCPServerHandsOnLabs/)**
    - **全面的 13 实验学习路径**，构建生产级 MCP 服务器并集成 PostgreSQL
    - <strong>真实零售分析实现</strong>，基于 Zava Retail 用例
    - <strong>企业级模式</strong>，包括行级安全 (RLS)、语义搜索和多租户数据访问
    - <strong>完整实验结构</strong>：
      - **实验 00-03：基础** - 介绍、架构、安全、环境搭建
      - **实验 04-06：构建 MCP 服务器** - 数据库设计、MCP 服务器实现、工具开发
      - **实验 07-09：高级功能** - 语义搜索、测试与调试、VS Code 集成
      - **实验 10-12：生产与最佳实践** - 部署、监控、优化
    - <strong>涵盖技术</strong>：FastMCP 框架、PostgreSQL、Azure OpenAI、Azure 容器应用、应用洞察
    - <strong>学习成果</strong>：生产就绪 MCP 服务器、数据库集成模式、AI 驱动分析、企业安全

## 额外资源

仓库包含支持资源：

- <strong>图片文件夹</strong>：包含课程中使用的图表和插图
- <strong>翻译</strong>：文档的多语言支持和自动翻译
- **官方 MCP 资源**：
  - [MCP 文档](https://modelcontextprotocol.io/)
  - [MCP 规范](https://spec.modelcontextprotocol.io/)
  - [MCP GitHub 仓库](https://github.com/modelcontextprotocol)

## 如何使用本仓库

1. <strong>顺序学习</strong>：按章节顺序（00 到 11）学习，结构化体验。
2. <strong>语言专注</strong>：如果关注某种编程语言，浏览相应的 samples 目录查找实现。
3. <strong>动手实践</strong>：从“快速入门”开始，搭建环境并创建第一个 MCP 服务器和客户端。
4. <strong>深入探索</strong>：掌握基础后，深入高级主题拓展知识。
5. <strong>社区参与</strong>：通过 GitHub 讨论和 Discord 频道加入 MCP 社区，联系专家和开发者。

## MCP 客户端和工具

课程涵盖多种 MCP 客户端和工具：

1. <strong>官方客户端</strong>：
   - Visual Studio Code
   - Visual Studio Code 中的 MCP
   - Claude 桌面版
   - VSCode 中的 Claude
   - Claude API

2. <strong>社区客户端</strong>：
   - 终端版 Cline
   - 代码编辑器 Cursor
   - ChatMCP
   - Windsurf

3. **MCP 管理工具**：
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## 流行 MCP 服务器

仓库介绍多种 MCP 服务器，包括：

1. **微软官方 MCP 服务器**：
   - Microsoft Learn Docs MCP 服务器
   - Azure MCP 服务器（15+ 专用连接器）
   - GitHub MCP 服务器
   - Azure DevOps MCP 服务器
   - MarkItDown MCP 服务器
   - SQL Server MCP 服务器
   - Playwright MCP 服务器
   - Dev Box MCP 服务器
   - Microsoft Foundry MCP 服务器
   - Microsoft 365 Agents Toolkit MCP 服务器

2. <strong>官方参考服务器</strong>：
   - 文件系统
   - Fetch
   - 内存
   - 连续思考

3. <strong>图像生成</strong>：
   - Azure OpenAI DALL-E 3
   - Stable Diffusion WebUI
   - Replicate

4. <strong>开发工具</strong>：
   - Git MCP
   - 终端控制
   - 代码助手

5. <strong>专用服务器</strong>：
   - Salesforce
   - Microsoft Teams
   - Jira 与 Confluence

## 贡献

欢迎社区贡献本仓库。请参见“社区贡献”章节，了解如何有效参与 MCP 生态系统。

----

*本学习指南最后更新于 2026 年 2 月 5 日，反映最新的 MCP 规范 2025-11-25，并提供截至该日期的仓库概览。仓库内容可能在此日期后更新。*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->