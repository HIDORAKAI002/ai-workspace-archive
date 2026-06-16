# Implementing Azure Content Safety wit MCP

> **OWASP MCP Risk Wey Dem Address**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

To make MCP security strong against prompt injection, tool poisoning, and oda AI-specific bad tins, e good make you join Azure Content Safety. Dis implementation guide dey follow how [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security take do am.

## Integration wit MCP Server

To join Azure Content Safety wit your MCP server, add content safety filter as middleware for your request processing pipeline:

1. Start the filter wen server balance
2. Check all incoming tool requests before you process dem
3. Check all outgoing responses before you send back to clients
4. Log and alert wen safety wahala happen
5. Do proper error handling wen content safety checks no pass

Dis one give strong protection against:
- Prompt injection attacks
- Tool poisoning wahala dem
- Data exfiltration through bad inputs
- Generating bad content

## Best Practices for Azure Content Safety Integration

1. **Custom Blocklists**: Make custom blocklists specially for MCP injection patterns
2. **Severity Tuning**: Change severity levels based on your own use case and how much risk you fit bear
3. **Comprehensive Coverage**: Make sure content safety checks dey for all inputs and outputs
4. **Performance Optimization**: Think about caching the content safety checks wey you dey do many times
5. **Fallback Mechanisms**: Make clear fallback ways wen content safety service no dey available
6. **User Feedback**: Give clear feedback to users wen dem block content because of safety problem
7. **Continuous Improvement**: Update blocklists and patterns steady steady based on new threats wey show

## Additional Resources

### OWASP MCP Security Guidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Complete OWASP MCP Top 10 with Azure implementation
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detailed prompt injection stop patterns
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security wey cover content safety

### Azure Documentation
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Wetin Next

- Go back to: [Security Module Overview](./README.md)
- Continue to: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->