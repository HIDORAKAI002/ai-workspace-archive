# Implementing Azure Content Safety wit MCP

> **OWASP MCP Risk We Dey Address**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

To make MCP secure well well against prompt injection, tool poisoning, and oda AI kain wahala, e good make you add Azure Content Safety. Dis implementation guide dey follow the [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## How to Join am wit MCP Server

To join Azure Content Safety wit your MCP server, add the content safety filter as middleware for your request processing pipeline:

1. Start the filter wen server dey start
2. Check all tool requests wey dey come before you process dem
3. Check all responses wey you go send back to people before you return dem
4. Log and alert wen safety rules break
5. Do proper error handling wen content safety check fail

Dis go protect you well against:
- Prompt injection attack dem
- Tool poison wahala dem
- Bad people wey wan carry data comot with bad input dem
- Making bad content

## Beta Way to Do Azure Content Safety Join

1. **Custom Blocklists**: Make your own blocklists wey fit MCP injection pattern dem
2. **Severity Tuning**: Arrange how serious the wahala suppose be base on your own use case and risk you fit take
3. **Comprehensive Coverage**: Make content safety check all di input and output
4. **Performance Optimization**: Think to use caching if you go dey check same content safety many times
5. **Fallback Mechanisms**: Clear tell how system go take behave wen content safety service no dey
6. **User Feedback**: Make users sabi clear if content block because of safety
7. **Continuous Improvement**: Always update your blocklists and pattern as new gbege show

## Extra Resources

### OWASP MCP Security Guidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Beta OWASP MCP Top 10 wit Azure implementation
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Proper prompt injection stopping patterns
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Camp 3: I/O Security don cover content safety

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
Dis document na wetin AI translator [Co-op Translator](https://github.com/Azure/co-op-translator) translate. Even though we try make e correct, abeg sabi say machine translation fit get error or no too correct. Di original document for di original language na di true correct one. If na serious matter, make person wey sabi human translation help you translate am. We no go take any blaim if any misunderstanding or wrong meaning come from dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->