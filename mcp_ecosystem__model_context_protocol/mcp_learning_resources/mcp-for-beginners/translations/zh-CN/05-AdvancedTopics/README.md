# MCP 高级主题

[![高级 MCP：安全、可扩展且多模态的 AI 代理](../../../translated_images/zh-CN/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(点击上方图片查看本课视频)_

本章涵盖了模型上下文协议（MCP）实现的一系列高级主题，包括多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建稳健且适合生产环境的 MCP 应用至关重要，能够满足现代 AI 系统的需求。

## 概述

本课探讨了模型上下文协议实现中的高级概念，重点关注多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建能够应对企业环境中复杂需求的生产级 MCP 应用至关重要。

## 学习目标

完成本课后，您将能够：

- 在 MCP 框架中实现多模态功能
- 为高需求场景设计可扩展的 MCP 架构
- 应用符合 MCP 安全原则的安全最佳实践
- 将 MCP 集成到企业 AI 系统和框架中
- 优化生产环境中的性能和可靠性

## 课程和示例项目

| 链接 | 标题 | 描述 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | 与 Azure 集成 | 学习如何在 Azure 上集成您的 MCP 服务器 |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP 多模态示例 | 提供音频、图像和多模态响应的示例 |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 演示 | 简约的 Spring Boot 应用，展示 MCP 中的 OAuth2，既作为授权服务器又作为资源服务器。演示安全令牌颁发、受保护端点、Azure 容器应用部署和 API 管理集成。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | 根上下文 | 了解更多关于根上下文及其实现方法 |
| [5.5 Routing](./mcp-routing/README.md) | 路由 | 学习不同类型的路由 |
| [5.6 Sampling](./mcp-sampling/README.md) | 采样 | 学习如何使用采样 |
| [5.7 Scaling](./mcp-scaling/README.md) | 扩展 | 了解扩展机制 |
| [5.8 Security](./mcp-security/README.md) | 安全 | 保障您的 MCP 服务器安全 |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web 搜索 MCP | Python MCP 服务器和客户端集成 SerpAPI，支持实时网页、新闻、商品搜索和问答。展示多工具编排、外部 API 集成及稳健的错误处理。 |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | 流处理 | 实时数据流在当今数据驱动世界中变得不可或缺，企业和应用需要及时访问信息以做出迅速决策。 |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | 实时网页搜索 | MCP 如何通过为 AI 模型、搜索引擎和应用提供标准化的上下文管理，革新实时网页搜索。 |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID 认证 | Microsoft Entra ID 提供强大的基于云的身份和访问管理解决方案，确保只有授权用户和应用能与您的 MCP 服务器交互。 |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 集成 | 学习如何将 MCP 服务器与 Microsoft Foundry 代理集成，实现强大的工具编排和企业 AI 能力，支持标准化的外部数据源连接。 |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | 上下文工程 | MCP 服务器上下文工程技术的未来机遇，包括上下文优化、动态上下文管理以及 MCP 框架内高效提示工程策略。 |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | 自定义传输 | 学习如何为特殊 MCP 通信场景实现自定义传输机制。 |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | 协议功能深度解析 | 掌握高级协议功能，包括进度通知、请求取消、资源模板和错误处理模式。 |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | 对抗性代理 | 通过使用两个持对立观点、共享同一 MCP 工具集的代理，捕捉幻觉、暴露边缘案例，并通过结构化辩论产生更精确的输出。 |

> **2025-11-25 MCP 规范新增**：规范现包括对<strong>任务</strong>（带进度跟踪的长运行操作）、<strong>工具注释</strong>（关于工具行为的安全元数据）、**URL 模式引导**（向客户端请求特定 URL 内容）和增强的<strong>根上下文</strong>（用于工作区上下文管理）的实验性支持。详情请参见 [MCP 规范更新日志](https://spec.modelcontextprotocol.io/)。

## 补充参考资料

有关高级 MCP 主题的最新信息，请参考：
- [MCP 文档](https://modelcontextprotocol.io/)
- [MCP 规范（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 代码库](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全风险与缓解措施
- [MCP 安全峰会工作坊 (Sherpa)](https://azure-samples.github.io/sherpa/) - 实战安全培训

## 关键要点

- 多模态 MCP 实现拓展了 AI 的能力，超越文本处理
- 可扩展性是企业部署的关键，既可通过横向扩展也可纵向扩展实现
- 全面的安全措施保护数据，确保正确访问控制
- 与 Azure OpenAI 和 Microsoft AI Foundry 等平台的企业集成增强 MCP 功能
- 优化架构和精细资源管理利于高级 MCP 实现

## 练习

为一个特定用例设计企业级 MCP 实现：

1. 确定用例的多模态需求
2. 概述保护敏感数据所需的安全控制
3. 设计可处理不同负载的可扩展架构
4. 规划与企业 AI 系统的集成点
5. 记录潜在性能瓶颈及缓解策略

## 额外资源

- [Azure OpenAI 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文档](https://learn.microsoft.com/en-us/ai-services/)

---

## 接下来

从本模块的课程开始探索：[5.1 MCP 集成](./mcp-integration/README.md)

完成本模块后，继续学习：[第6模块：社区贡献](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->