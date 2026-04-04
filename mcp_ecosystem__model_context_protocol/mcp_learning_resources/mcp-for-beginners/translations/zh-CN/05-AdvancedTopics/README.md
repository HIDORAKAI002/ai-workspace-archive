# MCP高级主题

[![高级MCP：安全、可扩展和多模态AI代理](../../../translated_images/zh-CN/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(点击上图观看本课视频)_

本章涵盖Model Context Protocol (MCP)实现中的一系列高级主题，包括多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建强大且适合生产环境的MCP应用程序至关重要，以满足现代AI系统的需求。

## 概述

本课程探讨了Model Context Protocol实现中的高级概念，重点是多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建能处理企业环境复杂需求的生产级MCP应用程序至关重要。

## 学习目标

完成本课后，您将能够：

- 在MCP框架内实现多模态功能
- 设计适用于高需求场景的可扩展MCP架构
- 应用符合MCP安全原则的安全最佳实践
- 将MCP与企业AI系统和框架集成
- 优化生产环境中的性能和可靠性

## 课程与示例项目

| 链接 | 标题 | 描述 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | 与Azure集成 | 学习如何在Azure上集成您的MCP服务器 |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP多模态示例 | 音频、图像和多模态响应示例 |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2演示 | 使用最小Spring Boot应用展示MCP的OAuth2，作为授权服务器和资源服务器。演示安全令牌发行、受保护端点、Azure容器应用部署和API管理集成。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | 根上下文 | 了解根上下文及其实现方法 |
| [5.5 Routing](./mcp-routing/README.md) | 路由 | 学习不同类型的路由 |
| [5.6 Sampling](./mcp-sampling/README.md) | 采样 | 学习如何使用采样 |
| [5.7 Scaling](./mcp-scaling/README.md) | 扩展 | 了解扩展相关知识 |
| [5.8 Security](./mcp-security/README.md) | 安全 | 保护您的MCP服务器 |
| [5.9 Web Search sample](./web-search-mcp/README.md) | 网络搜索MCP | Python MCP服务器和客户端集成SerpAPI，实现实时网络、新闻、产品搜索及问答。演示多工具编排、外部API集成和完善的错误处理。 |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | 流式传输 | 实时数据流在当今数据驱动的世界中变得至关重要，企业和应用需即时访问信息以做出及时决策。 |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | 实时网络搜索 | MCP如何通过为AI模型、搜索引擎和应用提供标准化的上下文管理，变革实时网络搜索。 | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID身份验证 | Microsoft Entra ID提供强大云端身份及访问管理解决方案，确保只有授权用户和应用能访问您的MCP服务器。 |
| [5.13 Azure AI Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Azure AI Foundry集成 | 学习如何将Model Context Protocol服务器与Azure AI Foundry代理集成，实现强大的工具编排和企业AI能力，支持标准化的外部数据源连接。 |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | 上下文工程 | MCP服务器上下文工程技术的未来机遇，包括上下文优化、动态上下文管理及有效提示工程策略。 |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | 自定义传输 | 学习如何为特殊MCP通信场景实现自定义传输机制。 |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | 协议特性 | 掌握高级协议特性，包括进度通知、请求取消、资源模板和错误处理模式。 |

> **MCP规范2025-11-25新增**: 规范现包含对**任务**（带进度跟踪的长时间操作）、**工具注释**（工具行为的安全元数据）、**URL模式唤起**（请求客户端特定URL内容）和增强的**根**（工作区上下文管理）的实验支持。详见[MCP规范变更日志](https://spec.modelcontextprotocol.io/)。

## 额外参考资料

有关MCP高级主题的最新信息，请参阅：
- [MCP文档](https://modelcontextprotocol.io/)
- [MCP规范 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub仓库](https://github.com/modelcontextprotocol)
- [OWASP MCP十大安全风险](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全风险与缓解措施
- [MCP安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/) - 实操安全培训

## 主要收获

- 多模态MCP实现扩展了AI能力，超越文本处理
- 可扩展性对企业部署至关重要，可通过横向和纵向扩展实现
- 全面的安全措施保护数据并保证正确的访问控制
- 与Azure OpenAI及微软AI Foundry等平台的企业集成增强MCP能力
- 高级MCP实现受益于优化架构和谨慎的资源管理

## 练习

为特定用例设计一个企业级MCP实现：

1. 确定该用例的多模态需求
2. 概述保护敏感数据所需的安全控制措施
3. 设计能够应对不同负载的可扩展架构
4. 规划与企业AI系统的集成点
5. 记录潜在性能瓶颈及缓解策略

## 附加资源

- [Azure OpenAI文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [微软AI Foundry文档](https://learn.microsoft.com/en-us/ai-services/)

---

## 后续内容

从本模块的课程开始探索：[5.1 MCP集成](./mcp-integration/README.md)

完成本模块后，继续学习：[模块6：社区贡献](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件由人工智能翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始文件的原文应被视为权威版本。对于重要信息，建议使用专业人工翻译。我们不对因使用本翻译而产生的任何误解或误译承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->