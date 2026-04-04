# 使用 Azure 内容安全实现高级 MCP 安全

> **OWASP MCP 解决的风险**: [MCP06 - 通过上下文负载进行的提示注入](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure 内容安全提供了多种强大的工具，可增强您的 MCP 实现的安全性。有关实践实现经验，请参阅 [MCP 安全峰会研讨会 (Sherpa)](https://azure-samples.github.io/sherpa/) 第 3 期：I/O 安全。

## 提示保护盾

微软的 AI 提示保护盾通过以下方式对抗直接和间接的提示注入攻击：

1. **高级检测**：使用机器学习识别内容中嵌入的恶意指令。
2. **聚光灯技术**：转换输入文本，帮助 AI 系统区分有效指令和外部输入。
3. **分隔符和数据标记**：标记可信数据与不可信数据之间的边界。
4. **内容安全集成**：与 Azure AI 内容安全协同工作，检测越狱尝试和有害内容。
5. **持续更新**：微软定期更新保护机制以应对新兴威胁。

## 使用 MCP 实施 Azure 内容安全

该方法提供多层保护：
- 处理前扫描输入
- 返回前验证输出
- 使用黑名单拦截已知有害模式
- 利用 Azure 不断更新的内容安全模型

## Azure 内容安全资源

要了解更多关于在 MCP 服务器中实施 Azure 内容安全的内容，请参考以下官方资源：

1. [Azure AI 内容安全文档](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure 内容安全的官方文档。
2. [提示保护盾文档](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 学习如何防止提示注入攻击。
3. [内容安全 API 参考](https://learn.microsoft.com/rest/api/contentsafety/) - 内容安全实现的详细 API 参考。
4. [快速入门：使用 C# 的 Azure 内容安全](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - 使用 C# 的快速实现指南。
5. [内容安全客户端库](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 各种编程语言的客户端库。
6. [检测越狱尝试](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 关于检测和防止越狱尝试的专门指南。
7. [内容安全最佳实践](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 有效实施内容安全的最佳实践。

有关更深入的实施，请参阅我们的 [Azure 内容安全实施指南](./azure-content-safety-implementation.md)。

## 后续步骤

- 阅读: [Azure 内容安全实施](./azure-content-safety-implementation.md)
- 返回: [安全模块概述](./README.md)
- 继续: [模块 3：入门](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文档通过AI翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译完成。尽管我们力求准确，但请注意自动翻译可能存在错误或不准确之处。原始文档的母语版本应被视为权威来源。对于关键信息，建议采用专业人工翻译。我们不对因使用此翻译而产生的任何误解或误释承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->