# Advanced MCP Security wit Azure Content Safety

> **OWASP MCP Risk Addressed**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety get plenty strong tools we fit help make your MCP implementations secure well well. If you wan try am by hand, check [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft AI Prompt Shields dey give strong protection against both direct and indirect prompt injection attacks by:

1. **Advanced Detection**: Na machine learning dey find bad instructions wey dey inside content.
2. **Spotlighting**: E go change the input text so AI systems fit sabi the difference between real instructions and outside inputs.
3. **Delimiters and Datamarking**: E dey mark the line wey separate trusted and untrusted data.
4. **Content Safety Integration**: E dey work with Azure AI Content Safety to find jailbreak attempts and bad content.
5. **Continuous Updates**: Microsoft dey always update protection methods to face new threats.

## How to Use Azure Content Safety with MCP

This way dey give layer by layer protection:
- Scan inputs before you process am
- Check outputs before you return am
- Use blocklists for patterns wey dem know fit cause harm
- Use Azure content safety wey dey dey updated always

## Azure Content Safety Resources

If you want sabi more about how to use Azure Content Safety with your MCP servers, check these official resources:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Official documents for Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Learn how to stop prompt injection attacks.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detailed API reference to use Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Quick guide to implement using C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Client libraries for different programming languages.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specific guide on how to find and stop jailbreak attempts.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best ways to implement content safety well.

If you want deep level implementation, see our [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Wetin Next

- Read: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Return to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->