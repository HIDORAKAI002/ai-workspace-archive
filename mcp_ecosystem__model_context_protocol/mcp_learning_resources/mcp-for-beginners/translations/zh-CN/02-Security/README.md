# MCP 安全性：为 AI 系统提供全面保护

[![MCP Security Best Practices](../../../translated_images/zh-CN/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(点击上方图片观看本课程视频)_

安全性是 AI 系统设计的基础，因此我们将其作为第二部分重点讲解。这与微软的[安全未来计划](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)中的<strong>设计即安全</strong>原则相一致。

模型上下文协议（MCP）为 AI 驱动的应用带来了强大的新功能，同时也引入了超越传统软件风险的独特安全挑战。MCP 系统面临既有的安全问题（安全编码、最小权限、供应链安全）以及新的 AI 特定威胁，包括提示注入、工具中毒、会话劫持、混淆代理攻击、令牌透传漏洞和动态能力修改。

本课程探讨 MCP 实现中最关键的安全风险——涵盖身份验证、授权、权限过度、间接提示注入、会话安全、混淆代理问题、令牌管理及供应链漏洞。您将学习可执行的控制措施和最佳实践，以减轻这些风险，同时利用微软解决方案，如 Prompt Shields、Azure 内容安全和 GitHub 高级安全，强化 MCP 部署。

## 学习目标

完成本课程后，您将能够：

- **识别 MCP 特定威胁**：识别 MCP 系统中独特的安全风险，包括提示注入、工具中毒、权限过度、会话劫持、混淆代理问题、令牌透传漏洞和供应链风险
- <strong>应用安全控制</strong>：实施有效的减缓措施，包括强健的身份验证、最小权限访问、安全的令牌管理、会话安全控制和供应链验证
- <strong>利用微软安全解决方案</strong>：理解并部署微软 Prompt Shields、Azure 内容安全和 GitHub 高级安全以保护 MCP 工作负载
- <strong>验证工具安全性</strong>：认识工具元数据验证的重要性，监控动态变更，防御间接提示注入攻击
- <strong>整合最佳实践</strong>：将既有安全基础（安全编码、服务器加固、零信任）与 MCP 特定控制相结合，实现全面保护

# MCP 安全架构与控制措施

现代 MCP 实现需要分层安全方法，同时应对传统软件安全和 AI 特定威胁。不断发展的 MCP 规范持续完善其安全控制，促进与企业安全架构及既有最佳实践的更好集成。

来自[微软数字防御报告](https://aka.ms/mddr)的研究显示，**98% 的报告安全漏洞可通过强健的安全卫生措施阻止**。最有效的保护策略结合了基础安全实践和 MCP 特定控制——经过验证的基础安全措施依然是降低整体安全风险的关键。

## 当前安全态势

> **注意：** 本信息反映截至 **2026 年 2 月 5 日** 的 MCP 安全标准，符合 **MCP 规范 2025-11-25**。MCP 协议持续快速演进，未来实现可能引入新身份验证模式和增强控制。请始终参考最新的 [MCP 规范](https://spec.modelcontextprotocol.io/)、[MCP GitHub 仓库](https://github.com/modelcontextprotocol) 和 [安全最佳实践文档](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) 获取最新指导。

## 🏔️ MCP 安全峰会工作坊（Sherpa）

为获得<strong>动手安全培训</strong>，我们强烈推荐 **MCP 安全峰会工作坊**（Sherpa）——一场在微软 Azure 上引导安全 MCP 服务器的全面实操之旅。

### 工作坊概要

[MCP 安全峰会工作坊](https://azure-samples.github.io/sherpa/) 通过经过验证的“漏洞 → 利用 → 修复 → 验证”方法，提供实用且可操作的安全培训。您将：

- <strong>通过破坏学习</strong>：亲身体验漏洞，利用故意不安全的服务器进行攻击
- **使用 Azure 原生安全**：利用 Azure Entra ID、密钥保管库、API 管理和 AI 内容安全
- <strong>遵循纵深防御</strong>：逐步经过多个营地，构建全面安全层
- **应用 OWASP 标准**：每个技术均对应[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>获取生产代码</strong>：带走可运行且经过测试的实现方案

### 探险路线

| 营地 | 重点 | 涵盖 OWASP 风险 |
|------|-------|-----------------|
| **Base Camp** | MCP 基础与身份验证漏洞 | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1、Azure 托管身份、密钥保管库 | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API 管理、私有终端、治理 | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O Security** | 提示注入、PII 保护、内容安全 | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: Monitoring** | 日志分析、仪表板、威胁检测 | MCP04, MCP08 |
| **The Summit** | 红队/蓝队集成测试 | 全部 |

<strong>开始体验</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 安全风险

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) 详细列出了 MCP 实现中最关键的十个安全风险：

| 风险 | 描述 | Azure 缓解措施 |
|------|-------------|-----------------|
| **MCP01** | 令牌管理不善及密钥泄露 | Azure 密钥保管、托管身份 |
| **MCP02** | 权限范围膨胀导致权限提升 | RBAC、条件访问 |
| **MCP03** | 工具中毒 | 工具验证、完整性校验 |
| **MCP04** | 软件供应链攻击及依赖篡改 | GitHub 高级安全、依赖扫描 |
| **MCP05** | 命令注入及执行 | 输入验证、沙箱隔离 |
| **MCP06** | 意图流程篡改 | Azure AI 内容安全、Prompt Shields |
| **MCP07** | 身份验证及授权不足 | Azure Entra ID、带 PKCE 的 OAuth 2.1 |
| **MCP08** | 缺乏审计及遥测 | Azure Monitor、应用洞察 |
| **MCP09** | 影子 MCP 服务器 | API 中心治理、网络隔离 |
| **MCP10** | 上下文注入及过度共享 | 数据分类、最小化暴露 |

### MCP 身份验证的演进

MCP 规范在身份验证和授权方法上经历了显著演变：

- <strong>早期方案</strong>：早期规范要求开发者实现自定义身份验证服务器，MCP 服务器充当 OAuth 2.0 授权服务器，直接管理用户身份验证
- **当前标准（2025-11-25）**：更新规范允许 MCP 服务器将身份验证委托给外部身份提供者（如 Microsoft Entra ID），提升安全态势并简化实现复杂度
- <strong>传输层安全</strong>：强化本地（STDIO）和远程（可流式 HTTP）连接的安全传输机制和适当的身份验证模式支持

## 身份验证与授权安全

### 当前安全挑战

现代 MCP 实现面临多个身份验证和授权相关挑战：

### 风险与威胁向量

- <strong>授权逻辑配置错误</strong>：MCP 服务器授权实现缺陷可能导致敏感数据暴露及访问控制错误应用
- **OAuth 令牌泄露**：本地 MCP 服务器令牌被盗使攻击者伪装服务器访问下游服务
- <strong>令牌透传漏洞</strong>：不当令牌处理造成安全控制绕过和问责漏洞
- <strong>权限过度</strong>：MCP 服务器权限过大，违背最小权限原则，扩大攻击面

#### 令牌透传：严重反模式

当前 MCP 授权规范<strong>明确禁止</strong>令牌透传，原因是安全影响极为严重：

##### 安全控制绕过
- MCP 服务器及下游 API 实施关键安全控制（速率限制、请求验证、流量监控），均依赖合理的令牌验证
- 客户端直接使用对 API 的令牌绕开这些保护，破坏安全架构

##### 问责与审计挑战
- MCP 服务器无法区分使用上游颁发令牌的客户端，审计轨迹中断
- 下游资源服务器日志显示误导性请求来源而非真实 MCP 服务器
- 事件调查和合规审计大幅复杂化

##### 数据外泄风险
- 未经验证的令牌声明允许窃取令牌的攻击者利用 MCP 服务器作为数据外泄代理
- 信任边界被破坏，未授权访问模式绕过安全控制

##### 多服务攻击向量
- 被多个服务接受的受损令牌使攻击者在连接系统间横向移动
- 令牌来源不可验证时，服务间信任假设被破坏

### 安全控制与缓解措施

**关键安全要求：**

> <strong>强制</strong>：MCP 服务器<strong>不得</strong>接受未明确为该服务器签发的任何令牌

#### 身份验证与授权控制

- <strong>严格授权审查</strong>：全面审核 MCP 服务器授权逻辑，确保只有预期用户与客户端访问敏感资源
  - <strong>实施指南</strong>：[作为 MCP 服务器身份验证网关的 Azure API 管理](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份集成</strong>：[使用 Microsoft Entra ID 进行 MCP 服务器身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全的令牌管理</strong>：执行[微软令牌验证及生命周期最佳实践](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 验证令牌受众声明匹配 MCP 服务器身份
  - 实施适当的令牌轮换和过期策略
  - 防止令牌重放攻击和未经授权的使用

- <strong>受保护的令牌存储</strong>：令牌在静态和传输中均加密存储
  - <strong>最佳实践</strong>：[安全令牌存储及加密指南](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 访问控制实施

- <strong>最小权限原则</strong>：仅授予 MCP 服务器实现功能所需的最低权限
  - 定期审查权限防止权限膨胀
  - <strong>微软文档</strong>：[安全的最小权限访问](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基于角色的访问控制（RBAC）**：实施细粒度角色分配
  - 将角色范围严格限定于特定资源和操作
  - 避免宽泛或非必要权限扩大攻击面

- <strong>持续权限监控</strong>：实施持续访问审计和监控
  - 监测权限使用异常
  - 及时修正过度或未使用权限

## AI 特定安全威胁

### 提示注入与工具操控攻击

现代 MCP 实现面临传统安全措施难以完全覆盖的复杂 AI 特定攻击向量：

#### **间接提示注入（跨域提示注入）**

<strong>间接提示注入</strong> 是 MCP 支持的 AI 系统中极其关键的漏洞。攻击者在外部内容（文档、网页、电子邮件或数据源）中嵌入恶意指令，AI 系统随后将其处理为合法命令。

**攻击场景：**
- <strong>基于文档的注入</strong>：恶意指令藏于处理的文档中，触发意外 AI 行为
- <strong>网页内容利用</strong>：被侵入的网页含有嵌入提示，爬取时操控 AI 行为
- <strong>基于邮件的攻击</strong>：邮件中隐藏恶意提示，导致 AI 助理泄露信息或执行未授权操作
- <strong>数据源污染</strong>：被破坏的数据库或 API 向 AI 系统提供污染内容

<strong>实际影响</strong>：这些攻击可能导致数据外泄、隐私泄露、有害内容生成及用户交互操控。详细分析见 [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![Prompt Injection Attack Diagram](../../../translated_images/zh-CN/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻击</strong>

<strong>工具中毒</strong> 攻击工具的元数据，利用大语言模型如何解释工具描述和参数来决定执行操作。

**攻击机制：**
- <strong>元数据操纵</strong>：攻击者在工具描述、参数定义或使用示例中注入恶意指令
- <strong>隐形指令</strong>：工具元数据中的隐藏提示被 AI 模型处理，但对人类用户不可见
- **动态工具篡改（“拔地毯”）**：用户批准的工具随后被修改以执行恶意操作，用户不知情
- <strong>参数注入</strong>：恶意内容嵌入工具参数方案，影响模型行为

<strong>托管服务器风险</strong>：远程 MCP 服务器风险更高，因工具定义可在初次用户批准后更新，导致原本安全的工具变为恶意。详尽分析见 [工具中毒攻击（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![Tool Injection Attack Diagram](../../../translated_images/zh-CN/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他 AI 攻击向量**

- **跨域提示注入 (XPIA)**：利用多个域内容绕过安全控制的复杂攻击。
- <strong>动态能力修改</strong>：实时更改工具能力，绕过初始安全评估
- <strong>上下文窗口投毒</strong>：操纵大型上下文窗口以隐藏恶意指令的攻击
- <strong>模型混淆攻击</strong>：利用模型局限性制造不可预测或不安全的行为


### AI安全风险影响

**高影响后果：**
- <strong>数据外泄</strong>：未经授权访问并窃取敏感企业或个人数据
- <strong>隐私泄露</strong>：个人身份信息(PII)及机密业务数据暴露  
- <strong>系统操控</strong>：关键系统和工作流的非预期修改
- <strong>凭证盗窃</strong>：认证令牌和服务凭证被攻破
- <strong>横向移动</strong>：利用被攻破的AI系统作为进行更大范围网络攻击的跳板

### Microsoft AI安全解决方案

#### **AI提示屏障：防注入攻击的高级保护**

微软的 **AI提示屏障** 通过多层安全机制，为直接和间接的提示注入攻击提供全面防御：

##### **核心保护机制：**

1. <strong>高级检测与过滤</strong>
   - 采用机器学习算法和NLP技术检测外部内容中的恶意指令
   - 实时分析文档、网页、邮件及数据来源中的嵌入威胁
   - 具备辨别合法与恶意提示模式的上下文理解能力

2. <strong>聚光灯技术</strong>  
   - 区分可信系统指令与可能被破坏的外部输入
   - 通过文本转换方法增强模型相关性，同时隔离恶意内容
   - 帮助AI系统保持正确的指令层级，忽略注入命令

3. <strong>分隔符与数据标记系统</strong>
   - 明确定义可信系统消息与外部输入文本之间的边界
   - 使用特殊标记突出可信与不可信数据源之间的分界
   - 清晰分隔防止指令混淆及未经授权的命令执行

4. <strong>持续威胁情报</strong>
   - 微软持续监控新兴攻击模式并更新防护
   - 主动威胁搜索新型注入技术和攻击向量
   - 定期安全模型更新以保持对不断演变威胁的有效性

5. **Azure内容安全集成**
   - 作为全面Azure AI内容安全套件的一部分
   - 额外检测越狱尝试、有害内容及安全策略违规
   - AI应用组件间实现统一安全控制

<strong>实施资源</strong>：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/zh-CN/prompt-shield.ff5b95be76e9c78c.webp)


## 高级MCP安全威胁

### 会话劫持漏洞

<strong>会话劫持</strong>是状态化MCP实现中的关键攻击向量，未经授权的攻击者获取并滥用合法会话标识以冒充客户端进行未授权操作。

#### <strong>攻击场景与风险</strong>

- <strong>会话劫持提示注入</strong>：攻击者使用被盗会话ID向共享会话状态的服务器注入恶意事件，可能触发有害操作或访问敏感数据
- <strong>直接冒充</strong>：被盗的会话ID使攻击者能够直接调用MCP服务器，绕过认证，将其视为合法用户
- <strong>被破坏的可续流</strong>：攻击者可提前终止请求，导致合法客户端续传时接收潜在恶意内容

#### <strong>会话管理安全控制</strong>

**关键要求：**
- <strong>授权验证</strong>：实现授权的MCP服务器<strong>必须</strong>验证所有入站请求，且<strong>不得</strong>依赖会话进行认证
- <strong>安全会话生成</strong>：使用密码学安全、非确定性且由安全随机数生成器产生的会话ID
- <strong>用户特定绑定</strong>：通过`<user_id>:<session_id>`格式将会话ID绑定到特定用户，防止跨用户会话滥用
- <strong>会话生命周期管理</strong>：实现适当的过期、轮换及失效策略以缩短风险窗口
- <strong>传输安全</strong>：所有通信强制使用HTTPS以防止会话ID被拦截

### 混淆代理问题

<strong>混淆代理问题</strong>发生在MCP服务器作为客户端与第三方服务之间的认证代理时，通过滥用静态客户端ID实现授权绕过。

#### <strong>攻击机制与风险</strong>

- **基于Cookie的同意绕过**：先前用户认证产生的同意Cookie被攻击者利用，通过构造重定向URI的恶意授权请求进行滥用
- <strong>授权码盗窃</strong>：现有同意Cookie可能导致授权服务器跳过同意屏幕，将授权码重定向至攻击者控制的端点  
- **未授权API访问**：被盗授权码允许攻击者交换令牌并冒充用户，无需显式批准

#### <strong>缓解策略</strong>

**强制控制：**
- <strong>明确同意要求</strong>：使用静态客户端ID的MCP代理服务器<strong>必须</strong>为每个动态注册客户端获取用户同意
- **OAuth 2.1安全实施**：所有授权请求均遵循OAuth安全最佳实践，包括使用PKCE（代码交换校验码）
- <strong>严格客户端验证</strong>：严格验证重定向URI和客户端标识以防滥用

### 令牌透传漏洞  

<strong>令牌透传</strong>是一种明显的反模式，指MCP服务器接受未经验证的客户端令牌并转发至下游API，违反MCP授权规范。

#### <strong>安全影响</strong>

- <strong>控制规避</strong>：客户端直用API令牌绕过关键的速率限制、验证和监控控制
- <strong>审计链破坏</strong>：令牌由上游签发导致无法识别客户端，妨碍事件调查
- <strong>基于代理的数据外泄</strong>：未经验证的令牌使恶意行为者利用服务器作为未授权数据访问代理
- <strong>信任边界破坏</strong>：当令牌来源不可验证时，下游服务的信任假设被破坏
- <strong>多服务攻击扩散</strong>：多个服务接受被破坏令牌使攻击能够横向扩展

#### <strong>必要安全控制</strong>

**不可妥协要求：**
- <strong>令牌验证</strong>：MCP服务器<strong>不得</strong>接受非专门为其签发的令牌
- <strong>受众验证</strong>：始终验证令牌的受众声明与MCP服务器身份匹配
- <strong>正确令牌生命周期管理</strong>：实施短生命周期访问令牌及安全轮换机制


## AI系统供应链安全

供应链安全已超越传统软件依赖，涵盖整个AI生态系统。现代MCP实现必须严格验证和监控所有AI相关组件，每个组件都可能引入潜在漏洞威胁系统完整性。

### 扩展的AI供应链组件

**传统软件依赖项：**
- 开源库和框架
- 容器镜像及基础系统  
- 开发工具和构建流水线
- 基础设施组件和服务

**AI特定供应链元素：**
- <strong>基础模型</strong>：来自各提供商的预训练模型，需要验证来源
- <strong>嵌入服务</strong>：外部向量化和语义搜索服务
- <strong>上下文提供者</strong>：数据源、知识库和文档仓库  
- **第三方API**：外部AI服务、机器学习流水线和数据处理端点
- <strong>模型工件</strong>：权重、配置和微调模型变体
- <strong>训练数据源</strong>：用于模型训练与微调的数据集

### 全面供应链安全策略

#### <strong>组件验证与信任</strong>
- <strong>来源验证</strong>：整合前验证所有AI组件的来源、许可及完整性
- <strong>安全评估</strong>：为模型、数据源及AI服务进行漏洞扫描和安全评审
- <strong>信誉分析</strong>：评估AI服务提供商的安全记录和实践
- <strong>合规校验</strong>：确保所有组件符合组织安全及法规要求

#### <strong>安全部署流水线</strong>  
- **自动CI/CD安全**：在自动部署流水线中整合安全扫描
- <strong>工件完整性</strong>：对所有部署工件（代码、模型、配置）执行加密验证
- <strong>阶段性部署</strong>：采用渐进部署策略，在每阶段进行安全验证
- <strong>可信工件仓库</strong>：仅从经验证的安全工件注册中心和仓库部署

#### <strong>持续监控与响应</strong>
- <strong>依赖扫描</strong>：持续监控所有软件和AI组件依赖的漏洞
- <strong>模型监控</strong>：持续评估模型行为、性能漂移和安全异常
- <strong>服务健康追踪</strong>：监控外部AI服务的可用性、安全事件和策略变更
- <strong>威胁情报集成</strong>：纳入针对AI和机器学习安全风险的威胁情报源

#### <strong>访问控制与最小权限</strong>
- <strong>组件级权限</strong>：基于业务需求限制对模型、数据及服务的访问
- <strong>服务账户管理</strong>：实现仅拥有必要权限的专用服务账户
- <strong>网络分段</strong>：隔离AI组件，限制服务间网络访问
- **API网关控制**：使用集中API网关控制并监控对外部AI服务的访问

#### <strong>事件响应与恢复</strong>
- <strong>快速响应流程</strong>：建立补丁或替换被攻破AI组件的流程
- <strong>凭证轮换</strong>：自动化轮换密钥、API密钥及服务凭据
- <strong>回滚能力</strong>：能快速恢复至先前已知良好版本的AI组件
- <strong>供应链违规恢复</strong>：针对上游AI服务被攻破的专门响应流程

### Microsoft安全工具及集成

**GitHub Advanced Security** 提供全面供应链防护，包括：
- <strong>秘密扫描</strong>：自动检测仓库中的凭据、API密钥和令牌
- <strong>依赖扫描</strong>：对开源依赖及库进行漏洞评估
- **CodeQL分析**：静态代码分析检测安全漏洞和编码问题
- <strong>供应链洞察</strong>：依赖健康和安全状态可视化

**Azure DevOps与Azure Repos集成：**
- Microsoft开发平台无缝集成安全扫描
- Azure Pipelines中针对AI工作负载自动执行安全检查
- AI组件安全部署策略执行

**微软内部实践：**
微软在所有产品范围内实施广泛的供应链安全实践。了解更多请参阅[微软保障软件供应链之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)。


## 基础安全最佳实践

MCP实现继承并构建在组织现有安全态势之上。强化基础安全实践显著提升AI系统和MCP部署的整体安全性。

### 核心安全基础

#### <strong>安全开发实践</strong>
- **OWASP合规**：防护[OWASP十大](https://owasp.org/www-project-top-ten/) Web应用漏洞
- **AI特定保护**：实施[LLM OWASP十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)相关控制
- <strong>安全秘密管理</strong>：为令牌、API密钥和敏感配置使用专用安全库
- <strong>端到端加密</strong>：确保所有应用组件及数据流安全通信
- <strong>输入验证</strong>：严格验证所有用户输入、API参数和数据源

#### <strong>基础设施强化</strong>
- <strong>多因素认证</strong>：所有管理员和服务账户强制MFA
- <strong>补丁管理</strong>：操作系统、框架及依赖的自动及时补丁
- <strong>身份提供者集成</strong>：通过企业身份提供者（Microsoft Entra ID、Active Directory）集中管理身份
- <strong>网络分段</strong>：逻辑隔离MCP组件，限制横向移动潜力
- <strong>最小权限原则</strong>：所有系统组件和账户仅赋予最低必要权限

#### <strong>安全监控与检测</strong>
- <strong>全面日志记录</strong>：详细记录AI应用活动，包括MCP客户端-服务器交互
- **SIEM集成**：集中安全信息及事件管理以监测异常
- <strong>行为分析</strong>：AI驱动监控识别系统及用户异常模式
- <strong>威胁情报</strong>：集成外部威胁情报和妥协指标(IOCs)
- <strong>事件响应</strong>：完善的安全事件检测、响应和恢复流程

#### <strong>零信任架构</strong>
- **永不信任，始终验证**：持续验证用户、设备及网络连接
- <strong>微分段</strong>：细粒度网络控制隔离各个工作负载和服务
- <strong>身份中心安全</strong>：基于验证身份而非网络位置制定安全策略
- <strong>持续风险评估</strong>：基于当前上下文和行为动态评估安全态势
- <strong>条件访问</strong>：基于风险因素、位置和设备可信度调整访问控制

### 企业集成模式

#### <strong>微软安全生态集成</strong>
- **Microsoft Defender for Cloud**：全方位云安全态势管理
- **Azure Sentinel**：云原生SIEM与SOAR能力，保护AI工作负载
- **Microsoft Entra ID**：企业身份及访问管理，支持条件访问策略
- **Azure Key Vault**：中央秘密管理，配备硬件安全模块(HSM)
- **Microsoft Purview**：AI数据源和工作流的数据治理与合规

#### <strong>合规与治理</strong>
- <strong>法规对齐</strong>：确保MCP实现满足行业合规要求（GDPR、HIPAA、SOC 2）
- <strong>数据分类</strong>：对AI系统处理的敏感数据进行妥善分类和管理
- <strong>审计日志</strong>：全面日志支持法规合规和取证调查
- <strong>隐私控件</strong>：AI系统架构中实施隐私设计原则
- <strong>变更管理</strong>：对AI系统修改执行正式安全审查流程

这些基础实践构建了坚实的安全基线，提升MCP特定安全控制效力，为AI驱动应用提供全面保护。

## 关键安全要点
- <strong>分层安全策略</strong>：将基础安全实践（安全编码、最小权限、供应链验证、持续监控）与特定于 AI 的控制措施相结合，实现全面保护

- **AI 特定威胁环境**：MCP 系统面临独特风险，包括提示注入、工具中毒、会话劫持、混淆代理问题、令牌传递漏洞以及过度权限，需采取专门缓解措施

- <strong>卓越的身份验证与授权</strong>：使用外部身份提供者（Microsoft Entra ID）实施强健的身份验证，强制执行适当的令牌验证，且绝不接受未明确为您的 MCP 服务器签发的令牌

- **AI 攻击防范**：部署 Microsoft Prompt Shields 和 Azure Content Safety 防御间接提示注入及工具中毒攻击，同时验证工具元数据并监控动态变化

- <strong>会话与传输安全</strong>：使用加密安全的非确定性会话 ID，绑定用户身份，实施适当的会话生命周期管理，且绝不将会话用于身份验证

- **OAuth 安全最佳实践**：通过对动态注册客户端进行显式用户同意、防止混淆代理攻击，采用符合 PKCE 的 OAuth 2.1 实现及严格的重定向 URI 验证

- <strong>令牌安全原则</strong>：避免令牌传递反模式，验证令牌受众声明，实施短期令牌和安全轮换，保持清晰的信任边界

- <strong>全面的供应链安全</strong>：对所有 AI 生态系统组件（模型、嵌入、上下文提供者、外部 API）采用与传统软件依赖相同的安全严谨性

- <strong>持续演进</strong>：紧跟快速发展的 MCP 规范，贡献安全社区标准，并随着协议成熟保持适应性的安全态势

- <strong>微软安全整合</strong>：利用微软全面的安全生态系统（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID）提升 MCP 部署保护能力

## 综合资源

### **官方 MCP 安全部署文档**
- [MCP 规范（当前：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授权规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 代码仓库](https://github.com/modelcontextprotocol)

### **OWASP MCP 安全资源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面涵盖 OWASP MCP 十大风险及 Azure 实施指导
- [OWASP MCP 十大风险](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全风险列表
- [MCP 安全峰会工作坊（Sherpa）](https://azure-samples.github.io/sherpa/) - 面向 Azure 上 MCP 的动手安全培训

### <strong>安全标准与最佳实践</strong>
- [OAuth 2.0 安全最佳实践（RFC 9700）](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 网络应用十大安全风险](https://owasp.org/www-project-top-ten/)
- [大型语言模型 OWASP 十大风险](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微软数字防御报告](https://aka.ms/mddr)

### **AI 安全研究与分析**
- [MCP 中的提示注入（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻击（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 安全研究简报（Wiz Security）](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### <strong>微软安全解决方案</strong>
- [Microsoft Prompt Shields 文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 服务](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 令牌管理最佳实践](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 高级安全](https://github.com/security/advanced-security)

### <strong>实施指南与教程</strong>
- [Azure API 管理作为 MCP 身份验证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 与 MCP 服务器身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌存储与加密（视频）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 与供应链安全**
- [Azure DevOps 安全](https://azure.microsoft.com/products/devops)
- [Azure Repos 安全](https://azure.microsoft.com/products/devops/repos/)
- [微软供应链安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>补充安全文档</strong>

有关全面的安全指导，请参考本节中的专业文档：

- **[MCP 安全最佳实践 2025](./mcp-security-best-practices-2025.md)** - MCP 实施的完整安全最佳实践
- **[Azure Content Safety 实施](./azure-content-safety-implementation.md)** - Azure Content Safety 集成的实用示例  
- **[MCP 安全控制 2025](./mcp-security-controls-2025.md)** - MCP 部署的最新安全控制与技术
- **[MCP 最佳实践快速参考](./mcp-best-practices.md)** - MCP 关键安全实践的快速参考指南
- **[BlueHat 2026：保障 AI 未来：使用纵深防御模式保护 MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 来自微软安全响应中心 (MSRC) 的纵深防御模式

### <strong>动手安全培训</strong>

- **[MCP 安全峰会工作坊（Sherpa）](https://azure-samples.github.io/sherpa/)** - 以进阶营地方式分层，全面训练 Azure 上 MCP 服务器的安全
- **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - 所有 OWASP MCP 十大风险的参考架构与实施指南

---

## 后续内容

下一章：[第3章：快速入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->