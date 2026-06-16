# 使用 MCP 实现 Azure 内容安全

> **OWASP MCP 风险应对**：[MCP06 - 意图流篡改](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

为加强 MCP 针对提示注入、工具投毒及其他 AI 特有漏洞的安全防护，强烈建议集成 Azure 内容安全。此实现指南与 [MCP 安全峰会研讨会（Sherpa）](https://azure-samples.github.io/sherpa/) 第3营：I/O 安全保持一致。

## 与 MCP 服务器的集成

要将 Azure 内容安全集成到 MCP 服务器中，请在请求处理流水线中将内容安全过滤器作为中间件添加：

1. 在服务器启动时初始化过滤器
2. 在处理前验证所有传入的工具请求
3. 在返回给客户端前检查所有传出响应
4. 对安全违规进行日志记录和警报
5. 对内容安全检查失败实行适当的错误处理

这可有效防御：
- 提示注入攻击
- 工具投毒尝试
- 通过恶意输入的数据泄漏
- 有害内容生成

## Azure 内容安全集成最佳实践

1. <strong>自定义阻止列表</strong>：为 MCP 注入模式专门创建自定义阻止列表
2. <strong>严重级别调整</strong>：根据具体用例和风险承受能力调整严重性阈值
3. <strong>全面覆盖</strong>：对所有输入和输出应用内容安全检查
4. <strong>性能优化</strong>：考虑对重复内容安全检查实现缓存
5. <strong>回退机制</strong>：定义内容安全服务不可用时的明确回退行为
6. <strong>用户反馈</strong>：对因安全问题被阻止的内容向用户提供清晰反馈
7. <strong>持续改进</strong>：基于新兴威胁定期更新阻止列表和模式

## 附加资源

### OWASP MCP 安全指导
- [OWASP MCP Azure 安全指南](https://microsoft.github.io/mcp-azure-security-guide/) - 结合 Azure 实现的全面 OWASP MCP Top 10
- [MCP06 - 提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 详尽的提示注入缓解模式
- [MCP 安全峰会研讨会](https://azure-samples.github.io/sherpa/) - 第3营 I/O 安全涵盖内容安全

### Azure 文档
- [Azure 内容安全概述](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields 文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 内容安全快速入门](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 下一步

- 返回至：[安全模块概览](./README.md)
- 继续至：[模块 3：入门指南](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->