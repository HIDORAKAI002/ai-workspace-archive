# MCP 安全性：为 AI 系统提供全面保护

[![MCP Security Best Practices](../../../translated_images/zh-CN/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(点击上图观看本课视频)_

安全是 AI 系统设计的基础，这也是我们将其作为第二章节的原因。这符合微软来自 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) 的**以安全为设计原则**。

模型上下文协议（MCP）为 AI 驱动的应用带来了强大的新能力，同时引入了超越传统软件风险的独特安全挑战。MCP 系统面临传统安全问题（安全编码、最小权限、供应链安全）以及特有的 AI 威胁，包括提示注入、工具投毒、会话劫持、混淆代理攻击、令牌传递漏洞和动态能力修改。

本课探讨 MCP 实现中最关键的安全风险——涵盖身份验证、授权、过度权限、间接提示注入、会话安全、混淆代理问题、令牌管理和供应链漏洞。你将学习切实可行的控制措施和最佳实践，利用微软解决方案如 Prompt Shields、Azure 内容安全和 GitHub 高级安全来增强 MCP 部署。

## 学习目标

完成本课后，你将能够：

- **识别 MCP 特有威胁**：认识 MCP 系统中的独特安全风险，包括提示注入、工具投毒、过度权限、会话劫持、混淆代理问题、令牌传递漏洞和供应链风险
- **应用安全控制措施**：实施有效缓解措施，包括强身份验证、最小权限访问、安全令牌管理、会话安全控制和供应链验证
- **利用微软安全解决方案**：理解并部署微软 Prompt Shields、Azure 内容安全和 GitHub 高级安全保护 MCP 负载
- **验证工具安全**：认识工具元数据验证的重要性，监控动态更改，防御间接提示注入攻击
- **融合最佳实践**：结合既有安全基础（安全编码、服务器加固、零信任）与 MCP 特定控制，实现全面保护

# MCP 安全架构与控制

现代 MCP 实现需要分层安全方法，既应对传统软件安全，也要防范 AI 特有威胁。快速演进的 MCP 规范持续完善安全控制，助力更好地融合企业安全架构和既有最佳实践。

来自 [Microsoft Digital Defense Report](https://aka.ms/mddr) 的研究表明，**98% 已报告的安全漏洞可通过健全的安全卫生得到阻止**。最有效的保护策略是结合基础安全措施和 MCP 特定控制——验证过的基础安全仍是降低整体安全风险的关键。

## 当前安全形势

> **注意：** 本信息反映截至**2026年2月5日**的 MCP 安全标准，符合 **MCP Specification 2025-11-25**。MCP 协议持续快速发展，未来的实现可能引入新的身份验证模式和强化控制。请始终参照当前的 [MCP 规范](https://spec.modelcontextprotocol.io/)、[MCP GitHub 仓库](https://github.com/modelcontextprotocol) 和 [安全最佳实践文档](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 获取最新指南。

## 🏔️ MCP 安全峰会实操工作坊（Sherpa）

对于**动手安全培训**，我们强烈推荐 **MCP 安全峰会实操工作坊**（Sherpa）——一次全面的 Microsoft Azure MCP 服务器安全保护指导探险。

### 工作坊概览

[MCP 安全峰会实操工作坊](https://azure-samples.github.io/sherpa/) 采用“漏洞 → 利用 → 修复 → 验证”成熟方法，提供实用、可操作的安全培训。你将：

- **通过攻破学习**：亲身体验利用故意漏洞的服务器
- **使用 Azure 原生安全**：应用 Azure Entra ID、Key Vault、API 管理和 AI 内容安全
- **遵循纵深防御**：逐步建立全面安全层
- **应用 OWASP 标准**：每项技术均对应 [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- **获得生产代码**：结业时带走可运行、经过测试的实现

### 探险路线

| 营地 | 重点 | 涉及 OWASP 风险 |
|------|-------|-----------------|
| **基地营** | MCP 基础及身份验证漏洞 | MCP01, MCP07 |
| **营地 1：身份** | OAuth 2.1、Azure 托管身份、Key Vault | MCP01, MCP02, MCP07 |
| **营地 2：网关** | API 管理、私有终端、治理 | MCP02, MCP07, MCP09 |
| **营地 3：I/O 安全** | 提示注入、PII 保护、内容安全 | MCP03, MCP05, MCP06 |
| **营地 4：监控** | 日志分析、仪表盘、威胁检测 | MCP08 |
| **峰顶** | 红队／蓝队集成测试 | 全部 |

**开始体验**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全风险

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 详细介绍了 MCP 实现中最关键的十类安全风险：

| 风险 | 描述 | Azure 缓解方案 |
|------|-------|----------------|
| **MCP01** | 令牌管理不当及秘密泄露 | Azure Key Vault、托管身份 |
| **MCP02** | 范围扩展导致权限提升 | RBAC、条件访问 |
| **MCP03** | 工具投毒 | 工具验证、完整性校验 |
| **MCP04** | 供应链攻击 | GitHub 高级安全、依赖扫描 |
| **MCP05** | 命令注入与执行 | 输入验证、沙箱隔离 |
| **MCP06** | 基于上下文负载的提示注入 | Azure AI 内容安全、Prompt Shields |
| **MCP07** | 认证与授权不足 | Azure Entra ID、OAuth 2.1 PKCE |
| **MCP08** | 审计与遥测缺失 | Azure Monitor、应用洞察 |
| **MCP09** | 影子 MCP 服务器 | API 中心治理、网络隔离 |
| **MCP10** | 上下文注入与过度共享 | 数据分类、最小暴露 |

### MCP 身份验证的演进

MCP 规范在身份验证和授权方面经历了显著发展：

- **最初方法**：早期规范要求开发者实现自定义身份验证服务器，MCP 服务器作为 OAuth 2.0 授权服务器直接管理用户认证
- **当前标准（2025-11-25）**：更新规范允许 MCP 服务器将身份验证委托给外部身份提供者（如微软 Entra ID），提升安全态势，降低实现复杂度
- **传输层安全**：加强本地（STDIO）及远程（可流式 HTTP）连接的安全传输支持和适当的认证模式

## 身份验证与授权安全

### 当前安全挑战

现代 MCP 实现面临若干身份验证和授权难题：

### 风险与威胁向量

- **授权逻辑配置错误**：MCP 服务器中存在缺陷的授权实现可能暴露敏感数据或错误应用访问控制
- **OAuth 令牌泄露**：本地 MCP 服务器令牌被盗，攻击者可冒充服务器访问下游服务
- **令牌传递漏洞**：不当处理令牌导致绕过安全控制和责任追踪缺失
- **权限过度**：MCP 服务器权限过大，违反最小权限原则，增大攻击面

#### 令牌传递：关键反模式

当前 MCP 授权规范**明确禁止**令牌传递，因其带来严重安全隐患：

##### 绕过安全控制
- MCP 服务器及下游 API 实施重要安全控制（速率限制、请求验证、流量监控）依赖于正确令牌验证
- 客户端直接使用 API 令牌绕过上述必需保护，破坏安全架构

##### 责任与审计难题  
- MCP 服务器无法区分使用上游发行令牌的客户端，审计链中断
- 下游资源服务器日志显示误导性请求来源，掩盖实际 MCP 中介身份
- 事件调查与合规审计复杂度大幅增加

##### 数据泄露风险
- 未验证的令牌声明允许恶意行为者利用被盗令牌，将 MCP 服务器作为数据泄露代理
- 违反信任边界，允许未授权访问模式绕过预期安全控制

##### 多服务攻击路径
- 被接受的被破坏令牌可跨多服务进行横向移动
- 服务间信任假设因令牌来源不可验证而失效

### 安全控制与缓解措施

**关键安全要求：**

> **强制要求**：MCP 服务器**不得接受任何未明确签发给该 MCP 服务器的令牌**

#### 身份验证与授权控制

- **严格授权审查**：全面审计 MCP 服务器授权逻辑，确保仅允许预期用户和客户端访问敏感资源
  - **实现指南**：[使用 Azure API 管理作为 MCP 服务器的认证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **身份集成**：[使用微软 Entra ID 进行 MCP 服务器身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **安全令牌管理**：采用 [微软令牌验证和生命周期最佳实践](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 验证令牌的接收方声明匹配 MCP 服务器身份
  - 实施合理的令牌轮换和过期策略
  - 防止令牌重放及未经授权使用

- **受保护的令牌存储**：对令牌存储进行静态与传输加密保护
  - **最佳实践**：[安全令牌存储和加密指南](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 访问控制实施

- **最小权限原则**：仅授予 MCP 服务器实现功能所需的最少权限
  - 定期权限审查和更新，防止权限膨胀
  - **微软文档**：[安全的最小权限访问](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基于角色的访问控制（RBAC）**：实施细粒度角色分配
  - 紧密限定角色对应的资源与操作范围
  - 避免广泛或不必要的权限，减少攻击面

- **持续权限监控**：实现访问审计和监控
  - 监测异常权限使用模式
  - 及时修正过度或未使用权限

## AI 特有安全威胁

### 提示注入与工具操纵攻击

现代 MCP 实现面对复杂的 AI 特定攻击向量，传统安全措施难以完全防范：

#### **间接提示注入（跨域提示注入）**

**间接提示注入**是 MCP 支持的 AI 系统中最关键的脆弱性之一。攻击者在外部内容（文档、网页、电子邮件或数据源）中嵌入恶意指令，AI 系统随后将其误处理为合法命令。

**攻击场景：**
- **基于文档的注入**：恶意指令隐藏于处理文档中，触发 AI 非预期操作
- **网页内容利用**：受控网页含嵌入式提示，刮取时操控 AI 行为
- **电子邮件攻击**：邮件中存在恶意提示，使 AI 助手泄露信息或执行未授权操作
- **数据源污染**：受损数据库或 API 向 AI 系统提供被污染内容

**现实影响**：此类攻击可导致数据外泄、隐私泄露、生成有害内容和操纵用户交互。详见 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-CN/prompt-injection.ed9fbfde297ca877.webp)

#### **工具投毒攻击**

**工具投毒**针对定义 MCP 工具的元数据，利用 LLM 如何解释工具描述和参数来做出执行决策。

**攻击机制：**
- **元数据篡改**：攻击者在工具描述、参数定义或使用示例中注入恶意指令
- **隐形指令**：工具元数据中藏匿的提示被 AI 模型识别但用户无法察觉
- **动态工具修改（“拉地毯”）**：用户批准的工具随后被修改为执行恶意操作，用户不知情
- **参数注入**：恶意内容植入工具参数架构，影响模型行为

**托管服务器风险**：远程 MCP 服务器存在更高风险，因工具定义可在用户首次批准后更新，导致原本安全的工具变为恶意。详见 [工具投毒攻击（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-CN/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻击向量**

- **跨域提示注入（XPIA）**：利用跨域内容进行的复杂攻击，绕过安全控制
- **动态能力修改**：工具能力的实时更改，绕过初始安全评估
- **上下文窗口投毒**：通过操纵大型上下文窗口隐藏恶意指令的攻击
- **模型混淆攻击**：利用模型限制制造不可预测或不安全行为

### AI安全风险影响

**高影响后果：**
- **数据外泄**：未经授权访问和窃取敏感企业或个人数据
- **隐私泄露**：个人身份信息（PII）和机密业务数据暴露  
- **系统篡改**：关键系统和工作流的非预期修改
- **凭据盗窃**：认证令牌和服务凭据被攻破
- **横向移动**：利用被攻破的AI系统作为更广泛网络攻击的跳板

### Microsoft AI安全解决方案

#### **AI提示盾：针对注入攻击的高级防护**

Microsoft **AI提示盾**通过多层安全机制为直接和间接提示注入攻击提供全面防御：

##### **核心保护机制：**

1. **高级检测与过滤**
   - 机器学习算法和自然语言处理技术检测外部内容中的恶意指令
   - 实时分析文档、网页、电子邮件和数据源中的嵌入威胁
   - 语境理解区分合法与恶意提示模式

2. **聚焦技术**  
   - 区分受信任的系统指令与可能受损的外部输入
   - 文本转换方法增强模型相关性，同时隔离恶意内容
   - 帮助AI系统维护正确指令层级，忽略注入命令

3. **分隔符和数据标记系统**
   - 明确定义受信任系统消息与外部输入文本之间的边界
   - 特殊标记突出受信任与不受信数据源的边界
   - 明确分离防止指令混淆和未经授权命令执行

4. **持续威胁情报**
   - Microsoft持续监控新兴攻击模式并更新防御措施
   - 主动威胁狩猎发现新的注入技术和攻击向量
   - 定期更新安全模型以应对不断演变的威胁

5. **Azure内容安全集成**
   - 作为全面Azure AI内容安全套件的一部分
   - 额外检测越狱尝试、有害内容和安全策略违规
   - AI应用组件统一安全控制

**实施资源**: [Microsoft提示盾文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft提示盾防护](../../../translated_images/zh-CN/prompt-shield.ff5b95be76e9c78c.webp)


## 高级MCP安全威胁

### 会话劫持漏洞

**会话劫持**是在有状态MCP实现中的关键攻击向量，攻击者通过获取并滥用合法会话标识来冒充客户端，执行未授权操作。

#### **攻击场景与风险**

- **会话劫持提示注入**：攻击者利用被盗会话ID向共享会话状态的服务器注入恶意事件，可能触发有害行为或访问敏感数据
- **直接冒充**：被盗会话ID使攻击者能够绕过身份验证直接调用MCP服务器，视为合法用户
- **受损可恢复流**：攻击者可提前终止请求，导致合法客户端在带有潜在恶意内容的状态下恢复

#### **会话管理安全控制**

**关键要求：**
- **授权验证**：实现授权的MCP服务器**必须**验证所有入站请求，**不得**依赖会话进行身份验证
- **安全会话生成**：使用密码学安全的、不确定性的随机数生成会话ID
- **用户绑定**：将会话ID绑定到特定用户信息，格式如`<user_id>:<session_id>`，防止跨用户会话滥用
- **会话生命周期管理**：实现适当的过期、轮换和失效机制以限制漏洞窗口
- **传输安全**：所有通信必须使用HTTPS，防止会话ID被截获

### 混淆代理问题

**混淆代理问题**发生在MCP服务器作为客户端与第三方服务之间的身份验证代理时，利用静态客户端ID造成的授权绕过风险。

#### **攻击机制与风险**

- **基于Cookie的同意绕过**：先前用户认证生成的同意Cookie被攻击者利用，通过恶意授权请求和特制重定向URI发动攻击
- **授权码盗窃**：现有的同意Cookie可能导致授权服务器跳过同意屏幕，将授权码重定向到攻击者控制的终端  
- **未授权API访问**：偷取的授权码能用于令牌交换和用户冒充，且无需明确批准

#### **缓解策略**

**强制控制：**
- **明确同意要求**：使用静态客户端ID的MCP代理服务器**必须**获取每个动态注册客户端的用户同意
- **OAuth 2.1安全实施**：所有授权请求遵循 OAuth当前最佳安全实践，包括PKCE（Proof Key for Code Exchange）
- **严格客户端校验**：实施严格的重定向URI和客户端标识验证，防止被利用

### 令牌透传漏洞  

**令牌透传**是一种明显的反模式，指MCP服务器接受客户端令牌但不进行适当验证，直接转发给下游API，违反MCP授权规范。

#### **安全影响**

- **控制规避**：直接客户端到API的令牌使用绕过关键的速率限制、验证和监控控制
- **审计链破坏**：上游颁发令牌导致无法识别客户端身份，破坏事件调查能力
- **代理数据外泄**：未验证令牌使恶意行为者利用服务器作为未经授权的数据访问代理
- **信任边界冲突**：下游服务的信任假设被破坏，因无法验证令牌来源
- **多服务攻击扩展**：被接受的被盗令牌能在多个服务间横向移动

#### **必要安全控制**

**不可协商要求：**
- **令牌验证**：MCP服务器**不得**接受未明确为MCP服务器颁发的令牌
- **受众验证**：始终验证令牌受众声明匹配MCP服务器身份
- **合理令牌周期**：实施短生命周期访问令牌及安全轮换机制


## AI系统供应链安全

供应链安全已超越传统软件依赖，涵盖整个AI生态系统。现代MCP实现必须严格验证和监控所有AI相关组件，因为每个组件都可能引入潜在漏洞，危及系统完整性。

### 扩展的AI供应链组件

**传统软件依赖：**
- 开源库和框架
- 容器镜像和基础系统  
- 开发工具和构建流水线
- 基础设施组件和服务

**AI特定供应链元素：**
- **基础模型**：来自不同提供商的预训练模型，需要验证来源
- **嵌入服务**：外部向量化和语义搜索服务
- **上下文提供者**：数据源、知识库和文档库  
- **第三方API**：外部AI服务、机器学习流水线和数据处理端点
- **模型工件**：权重、配置和微调模型变体
- **训练数据源**：用于训练和微调模型的数据集

### 全面供应链安全策略

#### **组件验证与信任**
- **来源验证**：整合前核实所有AI组件的来源、许可和完整性
- **安全评估**：对模型、数据源和AI服务进行漏洞扫描和安全审查
- **信誉分析**：评估AI服务提供者的安全记录和实践
- **合规核查**：确保全部组件符合组织安全和法规要求

#### **安全部署流水线**  
- **自动化CI/CD安全**：在自动化部署流水线中集成安全扫描
- **工件完整性**：实现已部署工件（代码、模型、配置）的加密验证
- **分阶段部署**：采用渐进部署策略，逐阶段进行安全验证
- **可信工件仓库**：仅从验证的安全工件仓库和仓储部署

#### **持续监控与响应**
- **依赖扫描**：持续监测所有软件和AI组件依赖的漏洞
- **模型监控**：持续评估模型行为、性能漂移和安全异常
- **服务健康跟踪**：监控外部AI服务的可用性、安全事件和策略变更
- **威胁情报整合**：融入针对AI和机器学习安全风险的威胁情报源

#### **访问控制与最小权限**
- **组件级权限**：基于业务需求限制对模型、数据和服务的访问
- **服务账户管理**：实施权限最少的专用服务账户
- **网络分段**：隔离AI组件，限制服务间网络访问
- **API网关控制**：使用集中API网关控制和监控外部AI服务访问

#### **事件响应与恢复**
- **快速响应流程**：建立补丁或替换受损AI组件的流程
- **凭据轮换**：自动化密钥、API密钥和服务凭据轮换
- **回滚能力**：快速回退到先前已知良好版本的AI组件
- **供应链入侵恢复**：专门针对上游AI服务被攻破的响应程序

### Microsoft安全工具与集成

**GitHub高级安全**提供全面供应链保护，包括：
- **秘密扫描**：自动检测仓库中的凭据、API密钥和令牌
- **依赖扫描**：开源依赖和库的漏洞评估
- **CodeQL分析**：静态代码分析，发现安全漏洞和编码问题
- **供应链洞察**：依赖健康和安全状态的可视化

**Azure DevOps与Azure Repos集成：**
- 在Microsoft开发平台无缝集成安全扫描
- Azure Pipelines中对AI工作负载的自动安全检查
- 强制执行安全AI组件部署策略

**Microsoft内部实践：**
Microsoft在所有产品中实施广泛供应链安全措施。了解已验证方法请参考[微软保障软件供应链之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基础安全最佳实践

MCP实现继承并构建于组织现有安全态势。强化基础安全实践显著提升AI系统和MCP部署的整体安全性。

### 核心安全基础

#### **安全开发实践**
- **OWASP合规**：防御[OWASP Top 10](https://owasp.org/www-project-top-ten/)网络应用漏洞
- **AI特定防护**：实施[LLM领域的OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)相关控制
- **安全密钥管理**：使用专门的密钥库管理令牌、API密钥和敏感配置
- **端到端加密**：确保所有应用组件和数据流的安全通信
- **输入验证**：严格验证所有用户输入、API参数和数据源

#### **基础设施加固**
- **多因素认证**：所有管理和服务账户强制MFA
- **补丁管理**：自动及时为操作系统、框架和依赖打补丁  
- **身份提供商集成**：通过企业身份提供商（Microsoft Entra ID、Active Directory）实现集中身份管理
- **网络分段**：逻辑隔离MCP组件，限制横向移动
- **最小权限原则**：所有系统组件和账户仅授予必需权限

#### **安全监控与检测**
- **全面日志记录**：详细记录AI应用活动，包括MCP客户端与服务器交互
- **SIEM集成**：集中安全信息与事件管理，实现异常检测
- **行为分析**：利用AI监控检测系统与用户行为中的异常模式
- **威胁情报**：整合外部威胁情报和攻击指标（IOC）
- **事件响应**：明确定义安全事件的检测、响应和恢复流程

#### **零信任架构**
- **永不信任，持续验证**：持续验证用户、设备和网络连接
- **微分段**：细粒度网络控制，隔离单个工作负载和服务
- **身份中心安全**：基于已验证身份而非网络位置实施安全策略
- **持续风险评估**：基于当前上下文和行为动态调整安全态势
- **条件访问**：基于风险因素、位置和设备信任的访问控制

### 企业集成模式

#### **Microsoft安全生态集成**
- **Microsoft Defender for Cloud**：全面云安全态势管理
- **Azure Sentinel**：云原生SIEM和SOAR能力，保护AI工作负载
- **Microsoft Entra ID**：企业身份和访问管理，支持条件访问策略
- **Azure Key Vault**：集中秘密管理，支持硬件安全模块（HSM）
- **Microsoft Purview**：AI数据源和工作流的数据治理与合规性

#### **合规与治理**
- **法规遵从**：确保MCP实现满足行业合规要求（GDPR、HIPAA、SOC 2）
- **数据分类**：对AI系统处理的敏感数据进行正确分类和处理
- **审计追踪**：全面日志记录以满足监管合规和取证调查
- **隐私控制**：在AI系统架构中实施隐私设计原则（Privacy-by-Design）
- **变更管理**：对AI系统修改进行正式安全审查流程

这些基础实践构建了稳健的安全基线，提升了MCP特定安全控制的有效性并为AI驱动应用提供全面保护。
## 关键安全要点

- **分层安全策略**：将基础安全实践（安全编码、最小特权、供应链验证、持续监控）与 AI 特定控制相结合，实现全面保护

- **AI 特定威胁环境**：MCP 系统面临独特风险，包括提示注入、工具中毒、会话劫持、困惑代理问题、令牌透传漏洞以及过度权限，需采用专门的缓解措施

- **身份验证与授权卓越**：使用外部身份提供者（Microsoft Entra ID）实施强身份验证，强制令牌验证，且绝不接受非明确颁发给 MCP 服务器的令牌

- **AI 攻击防御**：部署 Microsoft Prompt Shields 和 Azure Content Safety 防御间接提示注入和工具中毒攻击，同时验证工具元数据并监控动态变化

- **会话与传输安全**：使用加密安全的、非确定性的与用户身份绑定的会话 ID，实施适当的会话生命周期管理，且绝不使用会话进行身份验证

- **OAuth 安全最佳实践**：通过对动态注册客户端明确用户同意、正确实施带 PKCE 的 OAuth 2.1 以及严格的重定向 URI 验证，防止困惑代理攻击

- **令牌安全原则**：避免令牌透传反模式，验证令牌受众声明，实施短生命周期令牌和安全轮换，明确维护信任边界

- **全面供应链安全**：对所有 AI 生态系统组件（模型、嵌入、上下文提供者、外部 API）采取与传统软件依赖相同的安全严格要求

- **持续演进**：紧跟快速发展的 MCP 规范，参与安全社区标准建设，并随着协议成熟保持适应性安全姿态

- **微软安全整合**：利用微软全面的安全生态系统（Prompt Shields、Azure Content Safety、GitHub 高级安全、Entra ID）提升 MCP 部署保护

## 综合资源

### **官方 MCP 安全文档**
- [MCP 规范（当前：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授权规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 仓库](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全资源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 包含 Azure 实施指导的全面 OWASP MCP 十大风险
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全风险
- [MCP 安全峰会研讨会（Sherpa）](https://azure-samples.github.io/sherpa/) - 针对 Azure 上 MCP 的实操安全培训

### **安全标准与最佳实践**
- [OAuth 2.0 安全最佳实践（RFC 9700）](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Web 应用安全十大](https://owasp.org/www-project-top-ten/)
- [大型语言模型的 OWASP 十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微软数字防御报告](https://aka.ms/mddr)

### **AI 安全研究与分析**
- [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻击（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究简报（Wiz Security）](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **微软安全解决方案**
- [Microsoft Prompt Shields 文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服务](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳实践](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 高级安全](https://github.com/security/advanced-security)

### **实施指南与教程**
- [Azure API 管理作为 MCP 身份验证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 与 MCP 服务器身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌存储与加密（视频）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 与供应链安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微软供应链安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **附加安全文档**

有关全面的安全指导，请参阅本节的这些专业文档：

- **[MCP 安全最佳实践 2025](./mcp-security-best-practices-2025.md)** - MCP 实施完整的安全最佳实践
- **[Azure Content Safety 实施](./azure-content-safety-implementation.md)** - Azure Content Safety 集成的实用实施示例  
- **[MCP 安全控制 2025](./mcp-security-controls-2025.md)** - MCP 部署的最新安全控制和技术
- **[MCP 最佳实践快速参考](./mcp-best-practices.md)** - MCP 关键安全实践的快速参考指南

### **实战安全培训**

- **[MCP 安全峰会研讨会（Sherpa）](https://azure-samples.github.io/sherpa/)** - 逐步难度从入门营到峰会的 Azure MCP 服务器安全综合实操研讨会
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 针对所有 OWASP MCP 十大风险的参考架构与实施指南

---

## 接下来

下一章：[第3章：入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文档由AI翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译而成。尽管我们力求准确，但请注意自动翻译可能存在错误或不准确之处。以原始语言版本的文档为权威依据。对于关键信息，建议采用专业人工翻译。因使用本翻译导致的任何误解或误释，我们不承担任何责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->