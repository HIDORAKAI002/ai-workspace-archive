# MCP 安全：AI 系统的全面保护

[![MCP 安全最佳实践](../../../translated_images/zh-CN/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(点击上方图片观看本课视频)_

安全是 AI 系统设计的基础，这也是我们将其作为第二部分的原因。这与微软的[安全未来计划](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)中的<strong>安全设计</strong>原则一致。

模型上下文协议（MCP）为 AI 驱动的应用带来了强大的新功能，同时引入了超越传统软件风险的独特安全挑战。MCP 系统面临已知的安全问题（安全编码、最小权限、供应链安全），以及包括提示注入、工具中毒、会话劫持、混淆代理攻击、令牌直通漏洞和动态能力修改等新的 AI 特殊威胁。

本课程探讨 MCP 实现中最关键的安全风险，涵盖身份验证、授权、权限过度、间接提示注入、会话安全、混淆代理问题、令牌管理及供应链漏洞。您将学习可操作的控制措施和最佳实践，利用微软解决方案如提示盾、Azure 内容安全和 GitHub 高级安全来加强 MCP 部署。

## 学习目标

完成本课后，您将能够：

- **识别 MCP 特定威胁**：认清 MCP 系统中独特的安全风险，包括提示注入、工具中毒、权限过度、会话劫持、混淆代理问题、令牌直通漏洞和供应链风险
- <strong>应用安全控制</strong>：实施有效的缓解措施，包括强身份验证、最小权限访问、安全令牌管理、会话安全控制及供应链验证
- <strong>利用微软安全解决方案</strong>：了解并部署微软提示盾、Azure 内容安全和 GitHub 高级安全以保护 MCP 工作负载
- <strong>验证工具安全</strong>：认识工具元数据验证的重要性，监控动态变化，防御间接提示注入攻击
- <strong>整合最佳实践</strong>：结合已建立的安全基础（安全编码、服务器加固、零信任）与 MCP 特定控制实现全面保护

# MCP 安全架构与控制

现代 MCP 实现需要采用分层安全方法，既应对传统软件安全，又要防范 AI 特有威胁。快速发展的 MCP 规范持续完善其安全控制，实现与企业安全架构及既有最佳实践的更好集成。

来自[微软数字防御报告](https://aka.ms/mddr)的研究表明，**98% 的报告泄露事件可通过严格的安全卫生措施预防**。最有效的保护策略是将基础安全措施与 MCP 特定控制结合——经过验证的基线安全措施仍是降低整体安全风险的最重要手段。

## 当前安全形势

> **注意：** 本信息反映截至<strong>2026年2月5日</strong>的 MCP 安全标准，符合<strong>2025-11-25 MCP 规范</strong>。MCP 协议持续快速演进，未来实现可能引入新的认证模式和增强控制。务必参考最新的[MCP 规范](https://spec.modelcontextprotocol.io/)、[MCP GitHub 仓库](https://github.com/modelcontextprotocol)及[安全最佳实践文档](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)获取最新指导。

> **前瞻：** `2026-07-28` 发布候选版本进一步强化授权——客户端必须验证授权响应中的 `iss` 参数（RFC 9207），动态客户端注册时声明 OpenID Connect 的 `application_type`，并将注册凭据绑定到发放授权服务器。完整授权 SEP 列表见[《MCP 更新内容：2026-07-28 发布候选》](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)。

## 🏔️ MCP 安全峰会研讨会（Sherpa）

若需<strong>动手安全培训</strong>，强烈推荐 **MCP 安全峰会研讨会**（Sherpa）——一次针对在 Microsoft Azure 中保护 MCP 服务器的全面指导远征。

### 研讨会概况

[MCP 安全峰会研讨会](https://azure-samples.github.io/sherpa/)通过验证的“脆弱→利用→修复→验证”方法，提供实用且可操作的安全培训。您将：

- <strong>通过破坏学习</strong>：亲自体验利用故意设置的脆弱服务器的漏洞
- **使用 Azure 原生安全**：利用 Azure Entra ID、密钥保管、API 管理及 AI 内容安全
- <strong>遵循纵深防御</strong>：逐步建立综合安全层级
- **应用 OWASP 标准**：每个技术均对应[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)
- <strong>获取生产代码</strong>：获得可运行、已测试的实现示例

### 远征路线

| 营地 | 重点 | 涉及的 OWASP 风险 |
|------|-------|---------------------|
| <strong>基地营</strong> | MCP 基础 & 身份验证漏洞 | MCP01, MCP07 |
| **第一营：身份** | OAuth 2.1，Azure 托管身份，密钥保管 | MCP01, MCP02, MCP07 |
| **第二营：网关** | API 管理，私有端点，治理 | MCP02, MCP06, MCP07, MCP09 |
| **第三营：I/O 安全** | 提示注入，个人信息保护，内容安全 | MCP03, MCP05, MCP06, MCP10 |
| **第四营：监控** | 日志分析，仪表板，威胁检测 | MCP04, MCP08 |
| <strong>峰会</strong> | 红队/蓝队集成测试 | 全部 |

<strong>开始体验</strong>: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP 十大安全风险

[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)详细介绍了 MCP 实现中最关键的十个安全风险：

| 风险 | 描述 | Azure 缓解措施 |
|------|-------------|------------------|
| **MCP01** | 令牌管理不善及密钥泄露 | Azure 密钥保管，托管身份 |
| **MCP02** | 通过权限范围蔓延导致的权限提升 | 角色基于访问控制 (RBAC)，条件访问 |
| **MCP03** | 工具中毒 | 工具验证，完整性校验 |
| **MCP04** | 软件供应链攻击及依赖篡改 | GitHub 高级安全，依赖扫描 |
| **MCP05** | 命令注入与执行 | 输入验证，沙箱隔离 |
| **MCP06** | 意图流篡改 | Azure AI 内容安全，提示盾 |
| **MCP07** | 身份验证与授权不足 | Azure Entra ID，带 PKCE 的 OAuth 2.1 |
| **MCP08** | 审计与遥测缺失 | Azure 监控，应用洞察 |
| **MCP09** | 影子 MCP 服务器 | API 中心治理，网络隔离 |
| **MCP10** | 上下文注入与过度共享 | 数据分类，最小暴露原则 |

### MCP 身份验证的演进

MCP 规范在身份验证和授权方式上经历了显著演变：

- <strong>原始方法</strong>：早期规范要求开发者实现自定义认证服务器，MCP 服务器作为 OAuth 2.0 授权服务器，直接管理用户身份验证
- **当前标准（2025-11-25）**：更新规范允许 MCP 服务器将认证委托给外部身份提供者（如 Microsoft Entra ID），提升安全态势并简化实现复杂性
- <strong>传输层安全</strong>：增强对本地 (STDIO) 与远程 (Streamable HTTP) 连接的安全传输机制支持及适当认证模式

## 身份验证与授权安全

### 当前安全挑战

现代 MCP 实现面临多个身份验证和授权挑战：

### 风险与威胁向量

- <strong>授权逻辑配置错误</strong>：MCP 服务器中授权实现缺陷可能导致敏感数据泄露及错误的访问控制应用
- **OAuth 令牌泄露**：本地 MCP 服务器令牌被盗，攻击者可冒充服务器访问下游服务
- <strong>令牌直通漏洞</strong>：不当的令牌处理引发安全控制绕过及责任追踪断层
- <strong>权限过度</strong>：权限过高的 MCP 服务器违背最小权限原则，扩大攻击面

#### 令牌直通：关键的反模式

由于严重的安全隐患，当前 MCP 授权规范<strong>明确禁止令牌直通</strong>：

##### 安全控制规避
- MCP 服务器与下游 API 实施关键安全控制（速率限制、请求验证、流量监控），依赖正确的令牌验证
- 直接客户端到 API 的令牌使用绕过这些核心保护，削弱安全架构

##### 责任追踪与审计挑战
- MCP 服务器无法区分使用上游发放令牌的客户端，审计轨迹被破坏
- 下游资源服务器日志显示误导的请求来源，而非真正的 MCP 服务器中介
- 事故调查和合规审计大大变得困难

##### 数据外泄风险
- 未验证的令牌声明使恶意使用被窃令牌的攻击者可借助 MCP 服务器作为数据外泄代理
- 信任边界破坏导致绕过预期安全控制的未授权访问模式

##### 多服务攻击路径
- 被多个服务接受的被盗令牌使攻击者可在连接系统间横向移动
- 令牌来源不可验证时会破坏服务间信任假设

### 安全控制与缓解措施

**关键安全要求：**

> <strong>强制性</strong>：MCP 服务器<strong>不可接受</strong>任何非为该 MCP 服务器明确定义发行的令牌

#### 身份验证与授权控制

- <strong>严格的授权审查</strong>：全面审计 MCP 服务器授权逻辑，确保仅预期用户和客户端能访问敏感资源
  - <strong>实施指南</strong>：[Azure API 管理作为 MCP 服务器的身份验证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>身份集成</strong>：[使用 Microsoft Entra ID 进行 MCP 服务器身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全的令牌管理</strong>：实施[微软的令牌验证及生命周期管理最佳实践](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - 验证令牌受众声明与 MCP 服务器身份匹配
  - 实施适当的令牌轮换和过期策略
  - 防止令牌重放攻击及未授权使用

- <strong>保护的令牌存储</strong>：采用静态和传输加密保障令牌安全存储
  - <strong>最佳实践</strong>：[安全令牌存储与加密指导](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 访问控制实现

- <strong>最小权限原则</strong>：授予 MCP 服务器仅完成预期功能所需的最低权限
  - 定期权限审查与更新防止权限蔓延
  - <strong>微软文档</strong>：[安全的最小权限访问](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **基于角色访问控制（RBAC）**：实施细粒度角色分配
  - 严格限定角色与特定资源及操作的权限
  - 避免宽泛或不必要权限，减少攻击面

- <strong>持续权限监控</strong>：实施持续访问审计与监控
  - 监控权限使用模式以检测异常
  - 及时修正过量或未用权限

## AI 特有的安全威胁

### 提示注入与工具篡改攻击

现代 MCP 实现面临复杂的 AI 特有攻击向量，传统安全措施难以全面覆盖：

#### **间接提示注入（跨域提示注入）**

<strong>间接提示注入</strong> 是 MCP 支持的 AI 系统中最关键的漏洞之一。攻击者将恶意指令嵌入外部内容中——文档、网页、邮件或数据源，AI 系统随后将其作为合法命令处理。

**攻击场景：**
- <strong>基于文档的注入</strong>：恶意指令藏匿于处理文档中，触发 AI 产生意外行为
- <strong>网页内容利用</strong>：被篡改网页包含嵌入提示，爬取后操控 AI 行为
- <strong>邮件攻击</strong>：邮件内恶意提示导致 AI 助手泄露信息或执行未授权操作
- <strong>数据源污染</strong>：被感染的数据库或 API 向 AI 系统提供受污染内容

<strong>现实影响</strong>：这些攻击可能导致数据外泄、隐私侵犯、有害内容生成及用户交互操控。详见[《MCP 中的提示注入》（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)。

![提示注入攻击示意图](../../../translated_images/zh-CN/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>工具中毒攻击</strong>

<strong>工具中毒</strong> 针对定义 MCP 工具的元数据发起攻击，利用大语言模型对工具描述和参数的解释决策过程。

**攻击机制：**
- <strong>元数据操控</strong>：攻击者向工具描述、参数定义或使用示例注入恶意指令
- <strong>隐形指令</strong>：工具元数据中隐藏的提示被 AI 模型处理，但对人类用户不可见
- **动态工具变更（“放鸽子”）**：用户批准的工具后来被修改执行恶意操作，用户无察觉
- <strong>参数注入</strong>：恶意内容嵌入工具参数模式，影响模型行为


<strong>托管服务器风险</strong>：远程MCP服务器存在较高风险，因为工具定义可以在用户初次批准后更新，这可能导致之前安全的工具变为恶意。有关全面分析，请参见[工具中毒攻击（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)。

![工具注入攻击示意图](../../../translated_images/zh-CN/tool-injection.3b0b4a6b24de6bef.webp)

#### **其他AI攻击向量**

- **跨域提示注入（XPIA）**：利用多个域内容绕过安全控制的复杂攻击
- <strong>动态能力修改</strong>：实时更改工具能力，逃避初始安全评估
- <strong>上下文窗口中毒</strong>：操纵大上下文窗口以隐藏恶意指令的攻击
- <strong>模型混淆攻击</strong>：利用模型局限性制造不可预测或不安全行为


### AI安全风险影响

**高影响后果：**
- <strong>数据外泄</strong>：未经授权访问和盗取企业或个人敏感数据
- <strong>隐私泄露</strong>：个人身份信息（PII）和机密业务数据曝光
- <strong>系统操纵</strong>：对关键系统和工作流程的意外修改
- <strong>凭证盗窃</strong>：认证令牌和服务凭证被泄露
- <strong>横向移动</strong>：利用被攻陷的AI系统作为更广泛网络攻击的跳板

### 微软AI安全解决方案

#### **AI提示盾牌：对抗注入攻击的高级保护**

微软<strong>AI提示盾牌</strong>通过多层安全机制，为直接和间接的提示注入攻击提供全面防御：

##### **核心保护机制：**

1. <strong>高级检测与过滤</strong>
   - 机器学习算法和自然语言处理技术检测外部内容中的恶意指令
   - 对文档、网页、电子邮件和数据源进行实时分析以检测嵌入威胁
   - 能够理解合法与恶意提示模式的上下文差异

2. <strong>聚光灯技术</strong>  
   - 区分受信任的系统指令与可能受损的外部输入
   - 文本转换方法提升模型相关性，同时隔离恶意内容
   - 帮助AI系统保持正确的指令层级，忽略注入命令

3. <strong>分隔符与数据标记系统</strong>
   - 明确界定受信任系统消息与外部输入文本之间的边界
   - 采用特殊标记突出显示受信任与不受信任数据源的界限
   - 明确分离防止指令混淆和未经授权的命令执行

4. <strong>持续威胁情报</strong>
   - 微软持续监控新兴攻击模式并更新防御措施
   - 主动威胁狩猎以发现新的注入技术和攻击向量
   - 定期更新安全模型以保持对不断演化威胁的防护效果

5. **Azure内容安全集成**
   - 作为综合Azure AI内容安全套件的一部分
   - 额外检测越狱尝试、有害内容和安全策略违规行为
   - 在AI应用组件中统一执行安全控制

<strong>实施资源</strong>：[微软提示盾牌文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![微软提示盾牌保护示意](../../../translated_images/zh-CN/prompt-shield.ff5b95be76e9c78c.webp)


## 高级MCP安全威胁

### 会话劫持漏洞

<strong>会话劫持</strong>是在有状态MCP实现中关键的攻击向量，未经授权的方获取并滥用合法会话标识，冒充客户端执行未授权操作。

#### <strong>攻击场景与风险</strong>

- <strong>会话劫持提示注入</strong>：攻击者使用被盗会话ID向共享会话状态的服务器注入恶意事件，可能触发有害操作或访问敏感数据
- <strong>直接冒充</strong>：被盗会话ID允许绕过认证直接调用MCP服务器，将攻击者视为合法用户
- <strong>受损可恢复流</strong>：攻击者可以提前终止请求，导致合法客户端恢复时包含潜在恶意内容

#### <strong>会话管理安全控制</strong>

**关键要求：**
- <strong>授权验证</strong>：实施授权的MCP服务器<strong>必须</strong>验证所有传入请求，<strong>不得</strong>依赖会话进行认证
- <strong>安全会话生成</strong>：使用加密安全的非确定性会话ID，借助安全随机数生成器生成
- <strong>用户特异绑定</strong>：使用如`<user_id>:<session_id>`格式将会话ID绑定到用户信息，防止跨用户会话滥用
- <strong>会话生命周期管理</strong>：实施适当的过期、轮换和失效机制，限制脆弱窗口
- <strong>传输安全</strong>：强制所有通信使用HTTPS，以防会话ID被截取

### 混淆代理问题

<strong>混淆代理问题</strong>发生在MCP服务器作为客户端与第三方服务间的认证代理时，可能通过静态客户端ID利用实现授权绕过的机会。

#### <strong>攻击机制与风险</strong>

- **基于Cookie的同意绕过**：之前用户认证产生的同意Cookie被攻击者通过恶意授权请求和精心设计的重定向URI利用
- <strong>授权码盗窃</strong>：现有同意Cookie可能导致授权服务器跳过同意页面，将码重定向到攻击者控制的端点  
- **未经授权的API访问**：被盗授权码可用于令牌交换和用户冒充，无需明确批准

#### <strong>缓解策略</strong>

**强制控制：**
- <strong>明确同意要求</strong>：使用静态客户端ID的MCP代理服务器<strong>必须</strong>为每个动态注册的客户端获取用户同意
- **OAuth 2.1安全实施**：遵循当前OAuth安全最佳实践，包括所有授权请求使用PKCE（代码交换验证密钥）
- <strong>严格客户端验证</strong>：严格验证重定向URI和客户端标识，防止利用

### 令牌透传漏洞  

<strong>令牌透传</strong>是一种明确的反模式，MCP服务器接受客户端令牌却不做适当验证，直接转发至下游API，违反了MCP授权规范。

#### <strong>安全影响</strong>

- <strong>控制规避</strong>：客户端到API的直接令牌使用绕过了关键速率限制、验证和监控控制
- <strong>审核链破坏</strong>：上游颁发的令牌使客户端身份识别不可能，破坏事件调查
- <strong>基于代理的数据外泄</strong>：未经验证的令牌使恶意者能利用服务器代理进行未经授权数据访问
- <strong>信任边界违规</strong>：当无法验证令牌来源时，可能违反下游服务的信任假设
- <strong>多服务攻击扩展</strong>：被接受的被攻陷令牌跨多个服务使横向移动成为可能

#### <strong>必需的安全控制</strong>

**不可妥协的要求：**
- <strong>令牌验证</strong>：MCP服务器<strong>不得</strong>接受非专门为其颁发的令牌
- <strong>受众验证</strong>：始终验证令牌受众声明与MCP服务器身份匹配
- <strong>适当的令牌生命周期管理</strong>：实施短期访问令牌及安全的轮换策略


## AI系统供应链安全

供应链安全已超越传统软件依赖，涵盖整个AI生态系统。现代MCP实现必须严格验证和监控所有AI相关组件，因为每个组件都可能引入威胁，危害系统完整性。

### 扩展的AI供应链组件

**传统软件依赖：**
- 开源库和框架
- 容器镜像和基础系统
- 开发工具和构建流水线
- 基础设施组件和服务

**AI特有供应链元素：**
- <strong>基础模型</strong>：来自不同供应商的预训练模型，需进行来源验证
- <strong>嵌入服务</strong>：外部向量化和语义搜索服务
- <strong>上下文提供者</strong>：数据源、知识库和文档库
- **第三方API**：外部AI服务、机器学习流水线和数据处理端点
- <strong>模型产物</strong>：权重、配置和微调模型版本
- <strong>训练数据源</strong>：用于模型训练和微调的数据集

### 全面供应链安全策略

#### <strong>组件验证与信任</strong>
- <strong>来源验证</strong>：在集成前验证所有AI组件的来源、授权和完整性
- <strong>安全评估</strong>：对模型、数据源和AI服务进行漏洞扫描和安全审查
- <strong>信誉分析</strong>：评估AI服务提供商的安全记录和实践
- <strong>合规验证</strong>：确保所有组件符合组织安全和监管要求

#### <strong>安全部署流水线</strong>  
- **自动化CI/CD安全**：在自动化部署流水线中集成安全扫描
- <strong>产物完整性</strong>：对所有部署产物（代码、模型、配置）实施加密验证
- <strong>分阶段部署</strong>：采用渐进部署策略，在每个阶段进行安全验证
- <strong>可信产物仓库</strong>：仅从验证过的、安全的产物注册中心和仓库部署

#### <strong>持续监控与响应</strong>
- <strong>依赖扫描</strong>：持续监控所有软件和AI组件的漏洞
- <strong>模型监控</strong>：持续评估模型行为、性能漂移和安全异常
- <strong>服务健康追踪</strong>：监控外部AI服务的可用性、安全事件和策略变更
- <strong>威胁情报集成</strong>：整合特定于AI和机器学习安全风险的威胁情报

#### <strong>访问控制与最小权限</strong>
- <strong>组件级权限</strong>：基于业务需要限制对模型、数据和服务的访问
- <strong>服务账户管理</strong>：实施权限最小化的专用服务账户
- <strong>网络分段</strong>：隔离AI组件，限制服务间网络访问
- **API网关控制**：使用集中API网关控制和监控外部AI服务访问

#### <strong>事件响应与恢复</strong>
- <strong>快速响应程序</strong>：建立补丁或替换被攻陷AI组件的流程
- <strong>凭证轮换</strong>：自动化系统轮换秘密、API密钥和服务凭证
- <strong>回滚能力</strong>：快速恢复到先前已知良好版本的AI组件
- <strong>供应链入侵恢复</strong>：针对上游AI服务受损的具体响应程序

### 微软安全工具与集成

<strong>GitHub高级安全</strong>提供全面的供应链保护，包括：
- <strong>秘密扫描</strong>：自动检测存储库中的凭证、API密钥和令牌
- <strong>依赖扫描</strong>：开源依赖库的漏洞评估
- **CodeQL分析**：静态代码分析以查找安全漏洞和编码问题
- <strong>供应链洞察</strong>：依赖健康和安全状态的可见性

**Azure DevOps 与 Azure Repos 集成：**
- 在微软开发平台上的无缝安全扫描集成
- Azure流水线中AI工作负载的自动安全检查
- 安全AI组件部署的策略执行

**微软内部实践：**
微软在所有产品中实施广泛的供应链安全实践。了解[微软保障软件供应链之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)中的验证方法。


## 基础安全最佳实践

MCP实现继承并构建在组织现有安全态势之上。加强基础安全实践大幅提升AI系统和MCP部署的整体安全性。

### 核心安全基础

#### <strong>安全开发实践</strong>
- **OWASP合规**：防范[OWASP十大](https://owasp.org/www-project-top-ten/)网络应用漏洞
- **针对AI的保护**：实现[LLM的OWASP十大](https://genai.owasp.org/download/43299/?tmstv=1731900559)控制措施
- <strong>安全秘密管理</strong>：使用专门的保管库存储令牌、API密钥和敏感配置数据
- <strong>端到端加密</strong>：所有应用组件和数据流实施安全通信
- <strong>输入验证</strong>：对所有用户输入、API参数和数据源进行严格验证

#### <strong>基础设施加固</strong>
- <strong>多因素认证</strong>：所有管理和服务账户强制执行MFA
- <strong>补丁管理</strong>：操作系统、框架和依赖的自动及时补丁
- <strong>身份提供者集成</strong>：通过企业身份提供者（Microsoft Entra ID、Active Directory）实现集中身份管理
- <strong>网络分段</strong>：逻辑隔离MCP组件，限制横向移动
- <strong>最小权限原则</strong>：所有系统组件和账户仅赋予最小必要权限

#### <strong>安全监控与检测</strong>
- <strong>全面日志记录</strong>：详细记录AI应用活动，包括MCP客户端与服务器交互
- **SIEM集成**：集中安全信息和事件管理以识别异常
- <strong>行为分析</strong>：用AI监控系统与用户行为中的异常模式
- <strong>威胁情报</strong>：整合外部威胁情报和入侵指标（IOC）
- <strong>事件响应</strong>：完善的安全事件检测、响应和恢复流程

#### <strong>零信任架构</strong>
- **永不信任，始终验证**：持续验证用户、设备和网络连接
- <strong>微分割</strong>：细粒度网络控制，隔离各个工作负载和服务
- <strong>身份中心安全</strong>：基于验证身份而非网络位置制定安全策略
- <strong>持续风险评估</strong>：根据当前上下文和行为动态评估安全态势
- <strong>条件访问</strong>：根据风险因素、位置和设备信任调整访问控制

### 企业集成模式

#### <strong>微软安全生态系统集成</strong>
- **Microsoft Defender for Cloud**：全面的云安全态势管理
- **Azure Sentinel**：云原生SIEM和SOAR能力，保护AI工作负载
- **Microsoft Entra ID**：企业身份和访问管理及条件访问策略
- **Azure Key Vault**：带硬件安全模块（HSM）支持的集中秘密管理
- **Microsoft Purview**：AI数据源和工作流的数据治理与合规

#### <strong>合规与治理</strong>
- <strong>法规遵从</strong>：确保MCP实现满足行业特定合规要求（GDPR、HIPAA、SOC 2）

- <strong>数据分类</strong>：对AI系统处理的敏感数据进行正确分类和处理
- <strong>审计追踪</strong>：全面的日志记录以满足监管合规性和取证调查
- <strong>隐私控制</strong>：在AI系统架构中实施隐私设计原则
- <strong>变更管理</strong>：针对AI系统修改的安全评审正式流程

这些基础实践建立了稳固的安全基线，提高了MCP特定安全控制的有效性，并为AI驱动应用提供全面保护。

## 关键安全要点

- <strong>分层安全方法</strong>：结合基础安全实践（安全编码、最小权限、供应链验证、持续监控）与AI特定控制，实现全面保护

- **AI特定威胁环境**：MCP系统面临独特风险，包括提示注入、工具中毒、会话劫持、混淆代理问题、令牌透传漏洞和过度权限，需采用专业缓解措施

- <strong>卓越身份验证与授权</strong>：使用外部身份提供者（Microsoft Entra ID）实施强身份验证，执行正确的令牌验证，绝不接受未经明确为MCP服务器签发的令牌

- **AI攻击防护**：部署Microsoft提示防护和Azure内容安全，防御间接提示注入和工具中毒攻击，同时验证工具元数据并监测动态变化

- <strong>会话与传输安全</strong>：使用加密安全的非确定性会话ID并绑定用户身份，实施适当的会话生命周期管理，绝不使用会话进行身份验证

- **OAuth安全最佳实践**：通过对动态注册客户端进行明确用户同意避免混淆代理攻击，采用带PKCE的OAuth 2.1规范，并严格验证重定向URI  

- <strong>令牌安全原则</strong>：避免令牌透传反模式，验证令牌受众声明，实施短时效令牌并安全轮换，保持明确的信任边界

- <strong>全面供应链安全</strong>：将所有AI生态系统组件（模型、嵌入、上下文提供者、外部API）视为传统软件依赖一样赋予同等安全严谨性

- <strong>持续演进</strong>：紧跟快速变化的MCP规范，参与安全社区标准制定，随着协议成熟保持适应性安全态势

- <strong>微软安全集成</strong>：利用微软的全面安全生态系统（提示防护、Azure内容安全、GitHub高级安全、Entra ID）提升MCP部署保护

## 综合资源

### **官方MCP安全文档**
- [MCP规范（当前：2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP授权规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub仓库](https://github.com/modelcontextprotocol)

### **OWASP MCP安全资源**
- [OWASP MCP Azure安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 全面介绍OWASP MCP十大风险及Azure实现指导
- [OWASP MCP十大风险](https://owasp.org/www-project-mcp-top-10/) - 官方OWASP MCP安全风险
- [MCP安全峰会研讨会（Sherpa）](https://azure-samples.github.io/sherpa/) - Azure上MCP安全动手培训

### <strong>安全标准与最佳实践</strong>
- [OAuth 2.0安全最佳实践 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP十大网络应用安全](https://owasp.org/www-project-top-ten/)
- [大型语言模型的OWASP十大风险](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [微软数字防御报告](https://aka.ms/mddr)

### **AI安全研究与分析**
- [MCP中的提示注入 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [工具中毒攻击 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP安全研究简报 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### <strong>微软安全解决方案</strong>
- [Microsoft提示防护文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure内容安全服务](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure令牌管理最佳实践](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub高级安全](https://github.com/security/advanced-security)

### <strong>实施指南与教程</strong>
- [Azure API管理作为MCP身份验证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID与MCP服务器的身份验证](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全令牌存储与加密（视频）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps与供应链安全**
- [Azure DevOps安全](https://azure.microsoft.com/products/devops)
- [Azure Repos安全](https://azure.microsoft.com/products/devops/repos/)
- [微软供应链安全之旅](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>额外安全文档</strong>

有关全面安全指导，请参考本节中的这些专门文档：

- **[MCP安全最佳实践 2025](./mcp-security-best-practices-2025.md)** - 完整的MCP实施安全最佳实践
- **[Azure内容安全实施](./azure-content-safety-implementation.md)** - Azure内容安全集成的实用实施示例  
- **[MCP安全控制 2025](./mcp-security-controls-2025.md)** - MCP部署的最新安全控制与技术
- **[MCP最佳实践快速参考](./mcp-best-practices.md)** - 关键MCP安全实践快速参考指南
- **[BlueHat 2026：保障AI未来：采用深度防御模式保护MCP](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - 来自微软安全响应中心(MSRC)的深度防御模式

### <strong>动手安全培训</strong>

- **[MCP安全峰会研讨会（Sherpa）](https://azure-samples.github.io/sherpa/)** - 通过基础营地到峰会的渐进训练，全面手把手培训Azure上MCP服务器安全
- **[OWASP MCP Azure安全指南](https://microsoft.github.io/mcp-azure-security-guide/)** - OWASP MCP所有十大风险的参考架构和实现指导

---

## 接下来

下一节：[第3章：入门指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->