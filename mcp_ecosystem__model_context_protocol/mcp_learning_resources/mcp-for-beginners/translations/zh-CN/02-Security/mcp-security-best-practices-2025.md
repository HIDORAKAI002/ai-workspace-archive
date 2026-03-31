# MCP 安全最佳实践 - 2026年2月更新

> **重要**：本文件反映了最新的 [MCP 规范 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 安全要求和官方 [MCP 安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。请始终参考当前规范以获取最新指导。

## 🏔️ 实操安全培训

为了获得实际实施经验，推荐参加 **[MCP 安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/)** —— 这是一场全面的 Azure 上 MCP 服务器安全指导探险。研讨会通过“易受攻击 → 利用 → 修复 → 验证”的方法覆盖所有 OWASP MCP 十大风险。

本文档中的所有实践都符合针对 Azure 具体实现指导的 **[OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/)**。

## MCP 实现的基本安全实践

模型上下文协议带来了超出传统软件安全的独特安全挑战。这些实践涵盖了基础安全要求及 MCP 特有威胁，包括提示注入、工具中毒、会话劫持、混淆代理问题和令牌透传漏洞。

### **强制性安全要求**

**MCP 规范中的关键要求：**

### **强制性安全要求**

**MCP 规范中的关键要求：**

> **禁止**：MCP 服务器 **不得** 接受非明确为 MCP 服务器颁发的任何令牌  
>  
> **必须**：实现授权的 MCP 服务器 **必须** 验证所有入站请求  
>  
> **禁止**：MCP 服务器 **不得** 使用会话进行身份验证  
>  
> **必须**：使用静态客户端 ID 的 MCP 代理服务器 **必须** 获得每个动态注册客户端的用户同意

---

## 1. **令牌安全与身份验证**

**身份验证与授权控制：**
   - **严格的授权审查**：全面审计 MCP 服务器的授权逻辑，确保只有预期用户和客户端可以访问资源
   - **外部身份提供商集成**：使用成熟的身份提供商如 Microsoft Entra ID，而非自行实现身份验证
   - **令牌受众验证**：始终验证令牌是否明确颁发给您的 MCP 服务器，绝不接受上游令牌
   - **正确的令牌生命周期管理**：实施安全的令牌轮换、过期策略，防止令牌重放攻击

**受保护的令牌存储：**
   - 对所有秘密使用 Azure Key Vault 或类似安全凭据存储
   - 令牌在静态和传输过程中均实施加密
   - 定期轮换凭据并监控未授权访问

## 2. **会话管理与传输安全**

**安全会话实践：**
   - **加密安全的会话 ID**：使用安全随机数生成器生成非确定性会话 ID
   - **用户绑定**：使用如 `<user_id>:<session_id>` 格式将会话 ID 绑定到用户身份，防止跨用户会话滥用
   - **会话生命周期管理**：实施适当的过期、轮换和无效化，限制攻击窗口
   - **强制 HTTPS/TLS**：所有通信必须使用 HTTPS 以防止会话 ID 被截获

**传输层安全：**
   - 尽可能配置 TLS 1.3，并进行适当的证书管理
   - 对关键连接实施证书固定
   - 定期轮换证书并验证其有效性

## 3. **AI 特定威胁防护** 🤖

**提示注入防御：**
   - **微软提示盾**：部署 AI 提示盾以高级检测和过滤恶意指令
   - **输入清理**：验证并清理所有输入，防止注入攻击和混淆代理问题
   - **内容边界**：使用分隔符和数据标记系统区分可信指令与外部内容

**工具中毒防范：**
   - **工具元数据验证**：实施工具定义完整性检查，监控异常变更
   - **动态工具监控**：监控运行时行为，设置异常执行模式告警
   - **审批流程**：要求工具修改和能力变更需用户明确批准

## 4. **访问控制与权限**

**最小权限原则：**
   - 仅授予 MCP 服务器完成预期功能所需的最低权限
   - 实施基于角色的访问控制（RBAC），权限细粒度划分
   - 定期审查权限，持续监控权限提升

**运行时权限控制：**
   - 施加资源限制，防止资源耗尽攻击
   - 使用容器隔离工具执行环境  
   - 实现按需访问管理行政功能

## 5. **内容安全与监控**

**内容安全实施：**
   - **Azure 内容安全集成**：利用 Azure 内容安全检测有害内容、越狱尝试及政策违规
   - **行为分析**：实施运行时行为监控，检测 MCP 服务器及工具执行异常
   - **全面日志记录**：记录所有身份验证尝试、工具调用及安全事件，确保存储安全且防篡改

**持续监控：**
   - 实时告警可疑模式和未授权访问尝试  
   - 与 SIEM 系统集成，集中管理安全事件
   - 定期进行安全审计和渗透测试

## 6. **供应链安全**

**组件验证：**
   - **依赖扫描**：使用自动化漏洞扫描检测所有软件依赖和 AI 组件
   - **来源验证**：确认模型、数据源及外部服务的出处、许可证及完整性
   - **签名包**：使用加密签名包，部署前验证签名

**安全开发流水线：**
   - **GitHub 高级安全**：实施秘密扫描、依赖分析和 CodeQL 静态分析
   - **CI/CD 安全**：在自动化部署流水线中整合安全验证
   - **工件完整性**：对部署的工件和配置实施加密验证

## 7. **OAuth 安全与混淆代理防范**

**OAuth 2.1 实施：**
   - **PKCE 实现**：为所有授权请求使用代码交换校验（PKCE）
   - **明确同意**：为每个动态注册客户端获取用户同意，以防混淆代理攻击
   - **重定向 URI 验证**：严格验证重定向 URI 和客户端标识符

**代理安全：**
   - 防止通过静态客户端 ID 绕过授权
   - 实施第三方 API 访问的适当同意流程
   - 监控授权码盗用和未授权 API 访问

## 8. **事件响应与恢复**

**快速响应能力：**
   - **自动响应**：实施自动化凭据轮换和威胁遏制系统
   - **回滚流程**：具备快速恢复至已知良好配置和组件的能力
   - **取证能力**：详细的审计轨迹和日志支持事件调查

**通信与协调：**
   - 明确安全事件升级流程
   - 与组织事件响应团队集成
   - 定期开展安全事件模拟和桌面演练

## 9. **合规与治理**

**法规遵从：**
   - 确保 MCP 实现满足行业特定要求（GDPR、HIPAA、SOC 2）
   - 对 AI 数据处理实施数据分类和隐私控制
   - 保持全面文档以支持合规审计

**变更管理：**
   - 所有 MCP 系统变更均进行正式安全评审
   - 配置变更纳入版本控制及审批流程
   - 定期合规评估和差距分析

## 10. **高级安全控制**

**零信任架构：**
   - **永不信任，始终验证**：持续验证用户、设备和连接
   - **微分段**：细粒度网络控制，隔离各个 MCP 组件
   - **条件访问**：基于风险的访问控制，动态适应当前上下文和行为

**运行时应用保护：**
   - **运行时应用自我保护 (RASP)**：部署 RASP 技术实现实时威胁检测
   - **应用性能监控**：监控性能异常，预警潜在攻击
   - **动态安全策略**：基于当前威胁态势动态调整安全策略

## 11. **微软安全生态集成**

**全面微软安全：**
   - **Microsoft Defender for Cloud**：针对 MCP 工作负载的云安全态势管理
   - **Azure Sentinel**：云原生 SIEM 与 SOAR 功能，实现高级威胁检测
   - **Microsoft Purview**：AI 工作流和数据源的数据治理与合规性管理

**身份与访问管理：**
   - **Microsoft Entra ID**：企业级身份管理与条件访问策略
   - **特权身份管理 (PIM)**：按需访问与审批流程的管理行政权限
   - **身份保护**：基于风险的条件访问及自动威胁响应

## 12. **持续安全演进**

**保持更新：**
   - **规范监控**：定期审查 MCP 规范更新及安全指导变化
   - **威胁情报**：整合 AI 特定威胁信息源和妥协指标
   - **安全社区参与**：积极参与 MCP 安全社区和漏洞披露项目

**自适应安全：**
   - **机器学习安全**：利用 ML 驱动的异常检测识别新型攻击模式
   - **预测性安全分析**：实施预测模型，实现主动威胁识别
   - **安全自动化**：基于威胁情报及规范变化自动更新安全策略

---

## **关键安全资源**

### **官方 MCP 文档**
- [MCP 规范 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 安全最佳实践](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 授权规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 安全资源**
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 完整的 OWASP MCP 十大风险及 Azure 实现
- [OWASP MCP 十大](https://owasp.org/www-project-mcp-top-10/) - 官方 OWASP MCP 安全风险
- [MCP 安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure 上 MCP 实操安全培训

### **微软安全解决方案**
- [Microsoft 提示盾](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure 内容安全](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 安全](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub 高级安全](https://github.com/security/advanced-security)

### **安全标准**
- [OAuth 2.0 安全最佳实践 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 大型语言模型十大风险](https://genai.owasp.org/)
- [NIST AI 风险管理框架](https://www.nist.gov/itl/ai-risk-management-framework)

### **实施指南**
- [Azure API 管理 MCP 身份验证网关](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID 与 MCP 服务器](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **安全通知**：MCP 安全实践发展迅速。实施前请务必核实当前的 [MCP 规范](https://spec.modelcontextprotocol.io/) 和 [官方安全文档](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)。

## 后续步骤

- 阅读: [MCP 安全控制 2025](./mcp-security-controls-2025.md)
- 返回: [安全模块概述](./README.md)
- 继续: [模块 3：入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件使用 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 进行翻译。尽管我们尽力确保准确性，但请注意，自动翻译可能包含错误或不准确之处。原始语言的文件应被视为权威来源。对于关键信息，建议使用专业人工翻译。我们不对因使用本翻译而产生的任何误解或误释承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->