# 使用 MCP 实现 Azure 内容安全

> **OWASP MCP 解决的风险**: [MCP06 - 通过上下文负载的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

为了增强 MCP 针对提示注入、工具中毒及其他 AI 特定漏洞的安全性，强烈建议集成 Azure 内容安全。该实施指南与 [MCP 安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3：I/O 安全保持一致。

## 与 MCP 服务器的集成

将 Azure 内容安全集成到 MCP 服务器中，需在请求处理管道中添加内容安全过滤器作为中间件：

1. 在服务器启动时初始化过滤器
2. 在处理前验证所有传入的工具请求
3. 在返回客户端之前检查所有传出响应
4. 记录并对安全违规情况发出警告
5. 对内容安全检查失败实施适当的错误处理

这为以下攻击提供了强有力的防护：
- 提示注入攻击
- 工具中毒尝试
- 通过恶意输入进行的数据外泄
- 有害内容的生成

## Azure 内容安全集成的最佳实践

1. **自定义阻止列表**：专门为 MCP 注入模式创建自定义阻止列表
2. **严重性调优**：根据具体用例和风险容忍度调整严重性阈值
3. **全面覆盖**：对所有输入和输出应用内容安全检查
4. **性能优化**：考虑对重复的内容安全检查实现缓存
5. **降级机制**：在内容安全服务不可用时定义明确的备用行为
6. **用户反馈**：当内容因安全原因被阻止时向用户提供清晰的反馈
7. **持续改进**：基于新出现的威胁定期更新阻止列表和模式

## 额外资源

### OWASP MCP 安全指导
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 包含 Azure 实施的全面 OWASP MCP Top 10
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 详细的提示注入缓解模式
- [MCP 安全峰会研讨会](https://azure-samples.github.io/sherpa/) - 覆盖内容安全的 Camp 3：I/O 安全实操

### Azure 文档
- [Azure 内容安全概述](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 内容安全快速入门](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 后续内容

- 返回至：[安全模块概述](./README.md)
- 继续至：[模块 3：入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译。虽然我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言的原始文件应被视为权威版本。对于重要信息，建议使用专业人工翻译。我们不对因使用本翻译而产生的任何误解或曲解负责。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->