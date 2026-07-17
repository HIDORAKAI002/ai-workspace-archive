# MCP 高级主题

[![高级 MCP：安全、可扩展和多模态 AI 代理](../../../translated_images/zh-CN/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(点击上方图片观看本课视频)_

本章涵盖模型上下文协议（MCP）实现中的一系列高级主题，包括多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建健壮且适用于生产的 MCP 应用程序至关重要，以满足现代 AI 系统的需求。

## 概述

本课探讨模型上下文协议实现中的高级概念，重点关注多模态集成、可扩展性、安全最佳实践和企业集成。这些主题对于构建能够处理企业环境中复杂需求的生产级 MCP 应用程序至关重要。

> **展望未来：** 下面的几个主题受 `2026-07-28` MCP 规范候选版本影响——根上下文（5.4）和采样（5.6）建立在被该候选版本标记为弃用的原语上，协议特性（5.16）中提及的实验性任务功能将迁移到专门的任务扩展中。详情见 [MCP 变更内容：2026-07-28 规范候选版本](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 学习目标

在本课结束时，您将能够：

- 在 MCP 框架内实现多模态功能
- 设计适用于高需求场景的可扩展 MCP 架构
- 应用符合 MCP 安全原则的安全最佳实践
- 将 MCP 集成到企业 AI 系统和框架中
- 优化生产环境中的性能和可靠性

## 课程与示例项目

| 链接 | 标题 | 描述 |
|------|-------|-------------|
| [5.1 集成 Azure](./mcp-integration/README.md) | 与 Azure 集成 | 学习如何在 Azure 上集成您的 MCP 服务器 |
| [5.2 多模态示例](./mcp-multi-modality/README.md) | MCP 多模态示例 | 音频、图像及多模态响应示例 |
| [5.3 MCP OAuth2 示例](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 演示 | 最简化的 Spring Boot 应用，展示 MCP 的 OAuth2 作为授权服务器与资源服务器。演示安全令牌签发、受保护端点、Azure 容器应用部署及 API 管理集成。 |
| [5.4 根上下文](./mcp-root-contexts/README.md) | 根上下文 | 了解根上下文及其实现方法（`2026-07-28` 规范候选版本弃用；`2025-11-25` 仍有效） |
| [5.5 路由](./mcp-routing/README.md) | 路由 | 了解不同类型的路由 |
| [5.6 采样](./mcp-sampling/README.md) | 采样 | 学习采样的工作方式（`2026-07-28` 规范候选版本弃用；`2025-11-25` 仍有效） |
| [5.7 扩展](./mcp-scaling/README.md) | 扩展 | 了解扩展相关内容 |
| [5.8 安全](./mcp-security/README.md) | 安全 | 保障您的 MCP 服务器安全 |
| [5.9 网络搜索示例](./web-search-mcp/README.md) | 网络搜索 MCP | Python MCP 服务器与客户端集成 SerpAPI，实现实时网页、新闻、产品搜索和问答。展示多工具协作、外部 API 集成及稳健的错误处理。 |
| [5.10 实时流](./mcp-realtimestreaming/README.md) | 流式传输 | 实时数据流在当今数据驱动的世界中变得至关重要，企业和应用需要即时访问信息以做出及时决策。 |
| [5.11 实时网络搜索](./mcp-realtimesearch/README.md) | 网络搜索 | 实时网络搜索，展示 MCP 如何通过提供跨 AI 模型、搜索引擎和应用统一的上下文管理方法，转变实时网络搜索体验。 |
| [5.12 模型上下文协议服务器的 Entra ID 身份验证](./mcp-security-entra/README.md) | Entra ID 身份验证 | Microsoft Entra ID 提供强大的基于云的身份和访问管理解决方案，帮助确保只有授权用户和应用能够与您的 MCP 服务器交互。 |
| [5.13 Microsoft Foundry 代理集成](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 集成 | 学习如何将模型上下文协议服务器与 Microsoft Foundry 代理集成，实现功能强大的工具编排及标准化外部数据源连接，增强企业 AI 能力。 |
| [5.14 上下文工程](./mcp-contextengineering/README.md) | 上下文工程 | MCP 服务器未来上下文工程技术的机会，包括上下文优化、动态上下文管理及 MCP 框架内有效提示工程策略。 |
| [5.15 MCP 自定义传输](./mcp-transport/README.md) | 自定义传输 | 学习如何实现专用于特定 MCP 通信场景的自定义传输机制。 |
| [5.16 协议特性深度解析](./mcp-protocol-features/README.md) | 协议特性 | 掌握进度通知、请求取消、资源模板和错误处理模式等高级协议特性。 |
| [5.17 对抗性多代理推理](./mcp-adversarial-agents/README.md) | 对抗代理 | 使用两个持不同立场的代理，共用单一 MCP 工具集，通过结构化辩论捕捉幻觉、揭示边缘案例并产生更佳校准的输出。 |

> **MCP 规范 2025-11-25 新增：** 现包含对 <strong>任务</strong>（带进度跟踪的长时操作）、<strong>工具注释</strong>（关于工具行为的安全元数据）、**URL 模式引导**（请求客户端特定 URL 内容）和增强 <strong>根</strong>（用于工作区上下文管理）的实验性支持。详见 [MCP 规范更新日志](https://spec.modelcontextprotocol.io/)。

## 额外参考

欲获取有关高级 MCP 主题的最新信息，请参考：
- [MCP 文档](https://modelcontextprotocol.io/)
- [MCP 规范（2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 仓库](https://github.com/modelcontextprotocol)
- [OWASP MCP 十大](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 安全风险及缓解措施
- [MCP 安全峰会工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - 实践安全培训

## 关键要点

- 多模态 MCP 实现扩展了 AI 的能力，超越文本处理
- 可扩展性对企业部署至关重要，可通过横向和纵向扩展实现
- 全面安全措施保护数据并确保适当的访问控制
- 与 Azure OpenAI 和 Microsoft AI Foundry 等平台的企业集成增强 MCP 功能
- 高级 MCP 实现受益于优化的架构和细致的资源管理

## 练习

设计一个面向特定用例的企业级 MCP 实现：

1. 确定您的用例的多模态需求
2. 概述保护敏感数据所需的安全控制
3. 设计能应对不同负载的可扩展架构
4. 规划与企业 AI 系统的集成点
5. 记录潜在性能瓶颈及缓解策略

## 额外资源

- [Azure OpenAI 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 文档](https://learn.microsoft.com/en-us/ai-services/)

---

## 后续内容

从本模块的以下课程开始学习：[5.1 MCP 集成](./mcp-integration/README.md)

完成本模块后，继续学习：[模块 6：社区贡献](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->