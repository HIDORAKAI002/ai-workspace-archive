# Advanced MCP Security with Azure Content Safety

> **OWASP MCP Risk Addressed**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety provides several powerful tools that can enhance the security of your MCP implementations. For hands-on implementation experience, see [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Prompt Shields

Microsoft's AI Prompt Shields provide robust protection against both direct and indirect prompt injection attacks through:

1. **Advanced Detection**: Uses machine learning to identify malicious instructions embedded in content.
2. **Spotlighting**: Transforms input text to help AI systems distinguish between valid instructions and external inputs.
3. **Delimiters and Datamarking**: Marks boundaries between trusted and untrusted data.
4. **Content Safety Integration**: Works with Azure AI Content Safety to detect jailbreak attempts and harmful content.
5. **Continuous Updates**: Microsoft regularly updates protection mechanisms against emerging threats.

## Implementing Azure Content Safety with MCP

This approach provides multi-layered protection:
- Scanning inputs before processing
- Validating outputs before returning
- Using blocklists for known harmful patterns
- Leveraging Azure's continuously updated content safety models

## Azure Content Safety Resources

To learn more about implementing Azure Content Safety with your MCP servers, consult these official resources:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Official documentation for Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Learn how to prevent prompt injection attacks.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Detailed API reference for implementing Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Quick implementation guide using C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Client libraries for various programming languages.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Specific guidance on detecting and preventing jailbreak attempts.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Best practices for implementing content safety effectively.

For a more in-depth implementation, see our [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## What's Next

- Read: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Return to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)
