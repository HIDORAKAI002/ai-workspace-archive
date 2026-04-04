# 🚀 MCP 服务器与 PostgreSQL - 完整学习指南

## 🧠 MCP 数据库集成学习路径概述

本全面学习指南通过零售分析的实际实现，教授您如何构建可投入生产的 **模型上下文协议（MCP）服务器**，并实现与数据库的集成。您将学习企业级模式，包括 **行级安全（RLS）**、**语义搜索**、**Azure AI 集成** 以及 **多租户数据访问**。

无论您是后端开发人员、AI 工程师还是数据架构师，本指南均提供结构化学习，辅以真实案例和动手练习，带您逐步掌握以下 MCP 服务器 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail。

## 🔗 官方 MCP 资源

- 📘 [MCP 文档](https://modelcontextprotocol.io/) – 详细教程和用户指南
- 📜 [MCP 规范 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – 协议架构与技术参考
- 🧑‍💻 [MCP GitHub 仓库](https://github.com/modelcontextprotocol) – 开源 SDK、工具和代码示例
- 🌐 [MCP 社区](https://github.com/orgs/modelcontextprotocol/discussions) – 参与讨论并贡献社区
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – 安全最佳实践与风险缓解

## 🧭 MCP 数据库集成学习路径

### 📚 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 完整学习结构

| 实验 | 主题 | 描述 | 链接 |
|--------|-------|-------------|------|
| **实验 1-3：基础篇** | | | |
| 00 | [MCP 数据库集成简介](./00-Introduction/README.md) | MCP 及其数据库集成和零售分析用例概览 | [开始](./00-Introduction/README.md) |
| 01 | [核心架构概念](./01-Architecture/README.md) | 理解 MCP 服务器架构、数据库层和安全模式 | [学习](./01-Architecture/README.md) |
| 02 | [安全与多租户](./02-Security/README.md) | 行级安全、认证及多租户数据访问 | [学习](./02-Security/README.md) |
| 03 | [环境搭建](./03-Setup/README.md) | 开发环境、Docker 及 Azure 资源配置 | [搭建](./03-Setup/README.md) |
| **实验 4-6：构建 MCP 服务器** | | | |
| 04 | [数据库设计与模式](./04-Database/README.md) | PostgreSQL 设置、零售模式设计和示例数据 | [构建](./04-Database/README.md) |
| 05 | [MCP 服务器实现](./05-MCP-Server/README.md) | 构建具数据库集成的 FastMCP 服务器 | [构建](./05-MCP-Server/README.md) |
| 06 | [工具开发](./06-Tools/README.md) | 创建数据库查询工具和模式自省 | [构建](./06-Tools/README.md) |
| **实验 7-9：高级功能** | | | |
| 07 | [语义搜索集成](./07-Semantic-Search/README.md) | 使用 Azure OpenAI 和 pgvector 实现向量嵌入 | [进阶](./07-Semantic-Search/README.md) |
| 08 | [测试与调试](./08-Testing/README.md) | 测试策略、调试工具与验证方法 | [测试](./08-Testing/README.md) |
| 09 | [VS Code 集成](./09-VS-Code/README.md) | 配置 VS Code MCP 集成及 AI 聊天使用 | [集成](./09-VS-Code/README.md) |
| **实验 10-12：生产与最佳实践** | | | |
| 10 | [部署策略](./10-Deployment/README.md) | Docker 部署、Azure 容器应用及扩展考虑 | [部署](./10-Deployment/README.md) |
| 11 | [监控与可观测性](./11-Monitoring/README.md) | Application Insights、日志记录和性能监控 | [监控](./11-Monitoring/README.md) |
| 12 | [最佳实践与优化](./12-Best-Practices/README.md) | 性能优化、安全加固及生产环境建议 | [优化](./12-Best-Practices/README.md) |

### 💻 你将构建的内容

完成本学习路径后，您将构建一个完整的 **Zava 零售分析 MCP 服务器**，包含：

- **多表零售数据库**，涵盖客户订单、产品和库存
- 以店铺为单位隔离数据的 **行级安全（RLS）**
- 使用 Azure OpenAI 嵌入的 **语义产品搜索**
- 集成 VS Code 的 **AI 聊天** 用于自然语言查询
- 基于 Docker 和 Azure 的 **生产级部署**
- 使用 Application Insights 的 **全面监控**

## 🎯 学习前置条件

为获得最佳学习效果，建议您具备：

- **编程经验**：熟悉 Python（推荐）或类似语言
- **数据库知识**：了解基本 SQL 和关系型数据库
- **API 概念**：理解 REST API 和 HTTP 基础
- **开发工具**：使用过命令行、Git 和代码编辑器
- **云基础**：（可选）了解 Azure 或类似云平台基础
- **Docker 了解**：（可选）理解容器化概念

### 必备工具

- **Docker Desktop** — 用于运行 PostgreSQL 和 MCP 服务器
- **Azure CLI** — 云资源部署工具
- **VS Code** — 开发和 MCP 集成
- **Git** — 版本控制工具
- **Python 3.8+** — MCP 服务器开发环境

## 📚 学习指南与资源

本学习路径包含丰富资源，助您高效掌握：

### 学习指南

每个实验附带：
- **明确学习目标** — 您将收获什么
- **逐步实施指南** — 详细的操作手册
- **代码示例** — 可运行示例和解说
- **练习题** — 亲自动手实践
- **故障排除指南** — 常见问题解决方案
- **额外资源** — 深入阅读和扩展

### 前置知识核查

每个实验开始前提供：
- **所需知识** — 事先应了解内容
- **环境验证** — 如何确认配置正确
- **时间估算** — 预计完成时长
- **学习成果** — 完成后掌握内容

### 推荐学习路径

根据经验选择适合您的学习路线：

#### 🟢 **初学路径**（MCP 新手）
1. 先完成 [MCP 入门](https://aka.ms/mcp-for-beginners) 中 0-10 单元
2. 完成 00-03 实验巩固基础
3. 跟随 04-06 实验动手搭建
4. 进行 07-09 实验实际应用

#### 🟡 **中级路径**（有一定 MCP 经验）
1. 回顾 00-01 实验数据库相关概念
2. 重点完成 02-06 实验实现功能
3. 深入 07-12 实验学习高级特性

#### 🔴 **高级路径**（MCP 资深用户）
1. 浏览 00-03 实验获取背景
2. 专注 04-09 实验数据库集成
3. 重点攻克 10-12 实验生产部署

## 🛠️ 如何高效使用本学习路径

### 顺序学习（推荐）

按顺序完成实验获取系统理解：

1. **阅读概述** — 明确学习内容
2. **检查前置条件** — 确认所需知识
3. **跟随步骤指南** — 边学边做
4. **完成练习题** — 巩固技能
5. **回顾关键点** — 夯实成果

### 针对性学习

若需特定技能点学习：

- **数据库集成**：侧重完成 04-06 实验
- **安全实现**：重点关注 02、08、12 实验
- **AI/语义搜索**：深度学习 07 实验
- **生产部署**：研读 10-12 实验

### 动手实践

每个实验均提供：
- **可运行代码示例** — 复制、修改并实验
- **真实场景案例** — 零售分析实用性场景
- **逐步递进难度** — 由浅入深构建
- **验证步骤** — 确认实现正确

## 🌟 社区与支持

### 寻求帮助

- **Azure AI Discord**：[加入专家支持](https://discord.com/invite/ByRwuEEgH4)
- **GitHub 仓库与实现示例**：[部署示例及资源](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP 社区**：[参与更广泛讨论](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 准备开始了吗？

从 **[实验 00：MCP 数据库集成简介](./00-Introduction/README.md)** 开始您的旅程

---

*通过此综合动手学习体验，掌握构建带数据库集成的生产级 MCP 服务器的技能。*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件是使用AI翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译的。虽然我们努力确保准确性，但请注意自动翻译可能包含错误或不准确之处。原始文件的母语版本应被视为权威来源。对于重要信息，建议采用专业人工翻译。我们不对因使用此翻译而产生的任何误解或误释承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->