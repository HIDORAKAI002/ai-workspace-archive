# MCP 高级主题

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/zh-CN/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(点击上方图片观看本课程视频)_

本章涵盖了模型上下文协议（MCP）实现中的一系列高级主题，包括多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建稳健且适合生产环境的 MCP 应用至关重要，能够满足现代 AI 系统的需求。

## 概述

本课探讨模型上下文协议实现中的高级概念，重点是多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建能够处理企业环境中复杂需求的生产级 MCP 应用至关重要。

> <strong>展望未来：</strong>以下几个主题受 `2026-07-28` MCP 规范发布候选版本影响——根上下文（5.4）和采样（5.6）建立在该候选版本标记为弃用的原语之上，协议特性（5.16）中提到的实验性任务功能移至专用的任务扩展。详情请参见 [MCP 有何变化：2026-07-28 发布候选版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 学习目标

完成本课后，您将能够：

- 在 MCP 框架内实现多模态能力
- 设计适用于高需求场景的可扩展 MCP 架构
- 应用符合 MCP 安全原则的安全最佳实践
- 将 MCP 与企业 AI 系统和框架集成
- 优化生产环境中的性能和可靠性

## 课程与示例项目

| 链接 | 标题 | 说明 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | 与 Azure 集成 | 学习如何在 Azure 上集成 MCP 服务器 |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP 多模态示例 | 音频、图像和多模态响应示例 |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 示例 | 简易的 Spring Boot 应用，展示了 MCP 中 OAuth2 作为授权服务器和资源服务器的使用。演示了安全令牌发行、受保护端点、Azure 容器应用部署和 API 管理集成。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | 根上下文 | 了解根上下文及其实现方法 |
| [5.5 Routing](./mcp-routing/README.md) | 路由 | 学习不同类型的路由 |
| [5.6 Sampling](./mcp-sampling/README.md) | 采样 | 了解如何处理采样 |
| [5.7 Scaling](./mcp-scaling/README.md) | 扩展 | 学习扩展相关知识 |
| [5.8 Security](./mcp-security/README.md) | 安全 | 保护您的 MCP 服务器 |
| [5.9 Web Search sample](./web-search-mcp/README.md) | 网络搜索 MCP | Python MCP 服务器与客户端集成 SerpAPI，实现实时网页、新闻、产品搜索和问答。展示多工具编排、外部 API 集成和强健的错误处理。 |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | 流式传输 | 实时数据流已成为当今数据驱动世界的关键，企业和应用需要即时访问信息以做出及时决策。|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | 实时网页搜索 | MCP 通过提供跨 AI 模型、搜索引擎和应用的上下文管理标准化方法，改变了实时网页搜索。| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID 认证 | Microsoft Entra ID 提供了强大的基于云的身份和访问管理解决方案，确保只有授权用户和应用能够与您的 MCP 服务器交互。|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 集成 | 学习如何将模型上下文协议服务器与 Microsoft Foundry 代理集成，实现强大的工具编排和企业 AI 功能，支持标准化的外部数据源连接。|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | 上下文工程 | MCP 服务器上下文工程技术的未来机遇，包括上下文优化、动态上下文管理以及 MCP 框架中有效提示工程的策略。|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | 自定义传输 | 学习如何为特定的 MCP 通信场景实现自定义传输机制。|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | 协议特性 | 掌握进度通知、请求取消、资源模板和错误处理模式等高级协议特性。|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | 对抗性多智能体 | 使用持不同立场的两个智能体共享单一 MCP 工具集，通过结构化辩论捕捉幻觉、揭示边缘案例，产生更校准的输出。|

> **MCP 规范 2025-11-25 新增内容：** 规范现包含对 <strong>任务</strong>（带进度跟踪的长时间运行操作）、<strong>工具注释</strong>（关于工具行为的安全元数据）、**URL 模式引导**（请求客户端特定 URL 内容）及增强 <strong>根上下文</strong>（用于工作区上下文管理）的实验性支持。详见 [MCP 规范更新日志](https://spec.modelcontextprotocol.io/)。

## 额外参考资料

获得最新高级 MCP 主题信息，请参考：
- [MCP 文档](https://modelcontextprotocol.io/)
- [MCP 规范（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 仓库](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大安全风险](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全风险和缓解措施
- [MCP 安全峰会工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - 实操安全培训

## 关键要点

- 多模态 MCP 实现扩展了 AI 超越文本处理的能力
- 可扩展性对企业部署至关重要，可通过横向和纵向扩展解决
- 全面安全措施保护数据并确保适当访问控制
- 与 Azure OpenAI 和 Microsoft AI Foundry 平台的企业集成增强了 MCP 能力
- 先进的 MCP 实现受益于优化架构和谨慎的资源管理

## 练习

为特定用例设计企业级 MCP 实现：

1. 确定用例的多模态需求
2. 概述保护敏感数据所需的安全控制措施
3. 设计能够处理不同负载的可扩展架构
4. 规划与企业 AI 系统的集成点
5. 记录潜在性能瓶颈和缓解策略

## 补充资源

- [Azure OpenAI 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文档](https://learn.microsoft.com/en-us/ai-services/)

---

## 接下来

从本模块的课程开始探索：[5.1 MCP 集成](./mcp-integration/README.md)

完成本模块后，继续学习：[模块 6：社区贡献](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->