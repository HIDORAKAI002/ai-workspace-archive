# Advanced MCP Security wit Azure Content Safety

> **OWASP MCP Risk Wey Dem Address**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety get plenti strong tools we fit help make your MCP dem secure well well. If you wan try am yourself, check [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft AI Prompt Shields dey give strong protection against both direct and indirect prompt injection attacks through:

1. **Advanced Detection**: E dey use machine learning take sabi bad instruction wey dey inside content.
2. **Spotlighting**: E go change input text make AI fit sabi the difference between correct instructions and outside inputs.
3. **Delimiters and Datamarking**: E dey mark boundary between data wey you trust and data wey you no trust.
4. **Content Safety Integration**: E dey work with Azure AI Content Safety make e detect jail break try and bad content.
5. **Continuous Updates**: Microsoft dey always update how dem take protect against new threats.

## How To Use Azure Content Safety Wit MCP

Dis way go give you protection wey get many layers:
- Check inputs before you process am
- Make sure outputs correct before you return am
- Use blocklists for known bad patterns
- Use Azure content safety models wey dem dey update steady

## Azure Content Safety Resources

If you wan sabi more about how to use Azure Content Safety with your MCP servers, check these official resources:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Official documentation for Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Learn how to prevent prompt injection attacks.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detailed API reference for implementing Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Quick implementation guide using C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Client libraries for various programming languages.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specific guidance on detecting and preventing jailbreak attempts.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best practices for implementing content safety effectively.

If you wan do am proper well well, see our [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Wetin Go Happen Next

- Read: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Return to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis dokument don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg sabi say automated translation fit get mistake or no correct well. Di original dokument for im own language na di main correct source. For important mata, make person wey sabi translate am well do am. We no go take any blame if person no understand well or misinterpret because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->