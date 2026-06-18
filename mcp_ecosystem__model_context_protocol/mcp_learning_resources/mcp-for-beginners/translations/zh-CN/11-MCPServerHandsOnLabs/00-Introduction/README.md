# MCP数据库集成简介

## 🎯 本实验涵盖内容

本入门实验全面介绍了构建带有数据库集成的模型上下文协议（MCP）服务器。您将通过 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail 中的Zava零售分析用例了解业务案例、技术架构和实际应用。

## 概述

<strong>模型上下文协议（MCP）</strong>使AI助手能够实时安全地访问和交互外部数据源。结合数据库集成，MCP为数据驱动的AI应用释放强大潜力。

本学习路径教您构建生产就绪的MCP服务器，通过PostgreSQL将AI助手连接到零售销售数据，实现企业级模式，如行级安全、语义搜索和多租户数据访问。

## 学习目标

完成本实验后，您将能够：

- <strong>定义</strong>模型上下文协议及其数据库集成的核心优势
- <strong>识别</strong>带数据库的MCP服务器架构关键组件
- <strong>理解</strong>Zava零售用例及其业务需求
- <strong>认识</strong>安全、可扩展数据库访问的企业模式
- <strong>列出</strong>本学习路径所用的工具和技术

## 🧭 挑战：AI与真实世界数据的结合

### 传统AI的局限

现代AI助手虽然强大，但在处理真实业务数据时面临重大限制：

| <strong>挑战</strong> | <strong>描述</strong> | <strong>业务影响</strong> |
|---------------|-----------------|-------------------|
| <strong>静态知识</strong> | AI模型基于固定数据集训练，无法访问当前业务数据 | 洞察过时，错失机会 |
| <strong>数据孤岛</strong> | 信息锁定于数据库、API和系统，AI无法触及 | 分析不全，工作流程碎片化 |
| <strong>安全约束</strong> | 直接数据库访问带来安全和合规问题 | 部署受限，手工准备数据 |
| <strong>复杂查询</strong> | 业务用户需技术知识提取数据洞见 | 采用率低，流程低效 |

### MCP方案

模型上下文协议通过以下方式解决上述挑战：

- <strong>实时数据访问</strong>：AI助手查询实时数据库和API
- <strong>安全集成</strong>：通过认证和权限实现受控访问
- <strong>自然语言接口</strong>：业务用户以简明英语提问
- <strong>标准协议</strong>：跨不同AI平台和工具通用

## 🏪 认识Zava零售：我们的学习案例 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

在整个学习路径中，我们将为<strong>Zava零售</strong>构建MCP服务器，Zava零售是一个多门店的虚构DIY零售连锁。此现实场景展示了企业级MCP实现。

### 业务背景

<strong>Zava零售</strong>运营：
- <strong>8家实体店</strong>分布在华盛顿州（西雅图、贝尔维尤、塔科马、斯波坎、埃弗雷特、雷德蒙德、柯克兰）
- <strong>1家线上店铺</strong>进行电子商务销售
- <strong>多样化产品目录</strong>包括工具、五金、园艺用品和建材
- <strong>多级管理</strong>涵盖店长、区域经理和高管

### 业务需求

店长和高管需要AI驱动的分析，以：

1. <strong>分析各店及时间段销售表现</strong>
2. <strong>跟踪库存水平并识别补货需求</strong>
3. <strong>了解客户行为和购买模式</strong>
4. <strong>通过语义搜索发现产品洞见</strong>
5. <strong>用自然语言查询生成报告</strong>
6. <strong>通过基于角色的访问控制维护数据安全</strong>

### 技术需求

MCP服务器必须提供：

- <strong>多租户数据访问</strong>，让店长仅查看各自门店数据
- <strong>灵活查询</strong>，支持复杂SQL操作
- <strong>语义搜索</strong>，用于产品发现和推荐
- <strong>实时数据</strong>，反映当前业务状态
- <strong>安全认证</strong>，结合行级安全
- <strong>可扩展架构</strong>，支持多用户并发

## 🏗️ MCP服务器架构概览

我们的MCP服务器实现了针对数据库集成优化的分层架构：

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### 关键组件

#### **1. MCP服务器层**
- **FastMCP框架**：现代Python MCP服务器实现
- <strong>工具注册</strong>：声明式工具定义及类型安全
- <strong>请求上下文</strong>：用户身份和会话管理
- <strong>错误处理</strong>：健壮错误管理和日志记录

#### **2. 数据库集成层**
- <strong>连接池</strong>：高效的asyncpg连接管理
- **Schema提供者**：动态表结构发现
- <strong>查询执行器</strong>：带RLS上下文的安全SQL执行
- <strong>事务管理</strong>：ACID合规及回滚处理

#### **3. 安全层**
- <strong>行级安全</strong>：PostgreSQL RLS实现多租户数据隔离
- <strong>用户身份</strong>：店长认证和授权
- <strong>访问控制</strong>：细粒度权限和审计轨迹
- <strong>输入验证</strong>：SQL注入防护和查询校验

#### **4. AI增强层**
- <strong>语义搜索</strong>：基于向量嵌入的产品发现
- **Azure OpenAI集成**：文本嵌入生成
- <strong>相似度算法</strong>：pgvector余弦相似度搜索
- <strong>搜索优化</strong>：索引和性能调优

## 🔧 技术栈

### 核心技术

| <strong>组件</strong> | <strong>技术</strong> | <strong>用途</strong> |
|---------------|----------------|-------------|
| **MCP框架** | FastMCP（Python） | 现代MCP服务器实现 |
| <strong>数据库</strong> | PostgreSQL 17 + pgvector | 关系数据和向量搜索 |
| **AI服务** | Azure OpenAI | 文本嵌入和语言模型 |
| <strong>容器化</strong> | Docker + Docker Compose | 开发环境 |
| <strong>云平台</strong> | Microsoft Azure | 生产部署 |
| **IDE集成** | VS Code | AI聊天和开发工作流 |

### 开发工具

| <strong>工具</strong> | <strong>用途</strong> |
|----------|-------------|
| **asyncpg** | 高性能PostgreSQL驱动 |
| **Pydantic** | 数据验证和序列化 |
| **Azure SDK** | 云服务集成 |
| **pytest** | 测试框架 |
| **Docker** | 容器化和部署 |

### 生产栈

| <strong>服务</strong> | **Azure资源** | <strong>用途</strong> |
|-------------|-------------------|-------------|
| <strong>数据库</strong> | Azure Database for PostgreSQL | 托管数据库服务 |
| <strong>容器</strong> | Azure Container Apps | 无服务器容器托管 |
| **AI服务** | Microsoft Foundry | OpenAI模型和端点 |
| <strong>监控</strong> | Application Insights | 可观测性和诊断 |
| <strong>安全</strong> | Azure Key Vault | 密钥和配置管理 |

## 🎬 真实使用场景

让我们探索不同用户如何与MCP服务器交互：

### 场景1：店长绩效评估

<strong>用户</strong>：Sarah，西雅图店长  
<strong>目标</strong>：分析2024年第四季度销售表现

<strong>自然语言查询</strong>：
> “显示我店铺2024年第四季度按收入排名前10的产品”

<strong>流程</strong>：
1. VS Code AI聊天发送查询到MCP服务器  
2. MCP服务器识别Sarah的店铺（西雅图）  
3. RLS策略过滤至西雅图店数据  
4. 生成并执行SQL查询  
5. 格式化结果返回AI聊天  
6. AI提供分析和洞见  

### 场景2：语义搜索产品发现

<strong>用户</strong>：Mike，库存经理  
<strong>目标</strong>：找到与客户请求类似的产品

<strong>自然语言查询</strong>：
> “我们销售哪些产品类似于‘户外使用防水电气连接器’？”

<strong>流程</strong>：
1. 查询由语义搜索工具处理  
2. Azure OpenAI生成嵌入向量  
3. pgvector执行相似度搜索  
4. 按相关性排序相关产品  
5. 结果包含产品详情和库存情况  
6. AI推荐替代品和套餐组合  

### 场景3：跨店分析

<strong>用户</strong>：Jennifer，区域经理  
<strong>目标</strong>：比较所有门店的表现

<strong>自然语言查询</strong>：
> “比较过去6个月所有门店的分类销售情况”

<strong>流程</strong>：
1. RLS上下文设为区域经理权限  
2. 生成复杂多店查询  
3. 聚合多个门店数据  
4. 结果含趋势和对比  
5. AI识别洞见并提出建议  

## 🔒 安全与多租户深入解析

我们的实现优先考虑企业级安全：

### 行级安全（RLS）

PostgreSQL RLS确保数据隔离：

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### 用户身份管理

每个MCP连接包含：
- **店长ID**：RLS上下文唯一标识
- <strong>角色分配</strong>：权限和访问级别
- <strong>会话管理</strong>：安全认证令牌
- <strong>审计日志</strong>：完整访问历史

### 数据保护

多层安全保障：
- <strong>连接加密</strong>：数据库连接均使用TLS
- **SQL注入防护**：仅使用参数化查询
- <strong>输入验证</strong>：全面请求校验
- <strong>错误处理</strong>：无敏感数据泄露

## 🎯 关键收获

完成本入门后，您应了解：

✅ **MCP价值主张**：MCP如何连接AI助手与真实数据  
✅ <strong>业务背景</strong>：Zava零售的需求与挑战  
✅ <strong>架构概览</strong>：关键组件及其交互  
✅ <strong>技术栈</strong>：贯穿学习路径的工具和框架  
✅ <strong>安全模型</strong>：多租户数据访问与保护  
✅ <strong>使用模式</strong>：真实查询场景和工作流  

## 🚀 接下来

准备深入探索？继续阅读：

**[实验01：核心架构概念](../01-Architecture/README.md)**

了解MCP服务器架构模式、数据库设计原则，以及驱动零售分析解决方案的详细技术实现。

## 📚 其他资源

### MCP文档
- [MCP规范](https://modelcontextprotocol.io/docs/) - 官方协议文档  
- [MCP入门](https://aka.ms/mcp-for-beginners) - 全面学习指南  
- [FastMCP文档](https://github.com/modelcontextprotocol/python-sdk) - Python SDK文档  

### 数据库集成
- [PostgreSQL文档](https://www.postgresql.org/docs/) - 完整参考  
- [pgvector指南](https://github.com/pgvector/pgvector) - 向量扩展文档  
- [行级安全](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS指南  

### Azure服务
- [Azure OpenAI文档](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI服务集成  
- [Azure PostgreSQL数据库](https://docs.microsoft.com/azure/postgresql/) - 托管数据库服务  
- [Azure容器应用](https://docs.microsoft.com/azure/container-apps/) - 无服务器容器服务  

---

<strong>免责声明</strong>：本练习使用虚构零售数据。生产环境实施类似解决方案时，请始终遵守贵组织的数据治理和安全政策。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->