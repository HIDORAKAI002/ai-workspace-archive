# Advanced Topics for MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/pcm/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Click di picture up dey to watch video of dis lesson)_

Dis chapter dey cover plenti advanced topics for Model Context Protocol (MCP) implementation, including multi-modal integration, scalability, security best practices, and enterprise integration. Dem topics important well-well to build strong and production-ready MCP applications wey fit handle wetin modern AI systems need.

## Overview

Dis lesson dey explore advanced ideas for Model Context Protocol implementation, e dey focus on multi-modal integration, scalability, security best practices, and enterprise integration. Dem topics na key for build production-grade MCP applications wey fit carry heavy workload for enterprise environment dem.

> **Looking ahead:** some topics wey dey down here dey relate to di `2026-07-28` MCP specification release candidate — Root Contexts (5.4) and Sampling (5.6) dem dey build on things wey di release candidate talk say dem don old, and di experimental Tasks feature wey di Protocol Features (5.16) mention go shift go one special Tasks extension. See [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for more info.

## Learning Objectives

After you finish dis lesson, you go sabi:

- How to put multi-modal abilities for MCP frameworks
- Design scalable MCP systems wey fit handle heavy load
- Apply security best practices wey align with MCP security principles
- Connect MCP with enterprise AI systems and frameworks
- Make performance and reliability beta well for production setting

## Lessons and sample Projects

| Link | Title | Description |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrate with Azure | Learn how to connect your MCP Server with Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP Multi modal samples  | Samples for audio, picture and multi modal response |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Small Spring Boot app wey show OAuth2 with MCP, both as Authorization and Resource Server. E show secure token issuance, protected endpoints, deployment for Azure Container Apps, and API Management connetion. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Learn more about root context and how to implement dem (deprecated for `2026-07-28` release candidate; still valid for `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Learn different types of routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Learn how to work with sampling (deprecated for `2026-07-28` release candidate; still valid for `2025-11-25`) |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling  | Learn about scaling |
| [5.8 Security](./mcp-security/README.md) | Security  | Secure your MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP server and client wey dey integrate with SerpAPI for real-time web, news, product search, and Q&A. E show multi-tool working together, external API connection, and strong error handling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Real-time data streaming don turn important for today world wey dey use data, where business and applications need quick access to information to take quick decisions.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Real-time web search how MCP dey change real-time web search by giving one standard way to manage context among AI models, search engines, and applications.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Microsoft Entra ID dey give strong cloud-based identity and access management solution, wey dey help make sure say only authorized users and applications fit connect with your MCP server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Learn how to connect Model Context Protocol servers with Microsoft Foundry agents, e dey allow powerful tool coordination and enterprise AI abilities with standard external data source connections.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | The future chances of context engineering methods for MCP servers, including context optimization, dynamic context management, and ways to do prompt engineering well inside MCP frameworks.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Learn how to create custom transport ways for special MCP communication situations.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protocol Features | Master advanced protocol features including progress notifications, request cancellation, resource templates, and error handling ways.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Use two agents wey get opposite views, wey share one MCP tool set, to catch hallucinations, find edge cases, and make better outputs through structured argument.|

> **New for MCP Specification 2025-11-25**: Di specification don add experimental support for **Tasks** (long-run operations with progress tracking), **Tool Annotations** (metadata about tool behavior for safety), **URL Mode Elicitation** (requesting specific URL content from clients), and better **Roots** (for workspace context management). Check the [MCP Specification changelog](https://spec.modelcontextprotocol.io/) for full details.

## Additional References

For the most recent info on advanced MCP topics, look:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Security risks and ways to handle am
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on security training

## Key Takeaways

- Multi-modal MCP implementations dey expand AI abilities pass just text processing
- Scalability na must for enterprise deployments, and e fit be done through horizontal and vertical scaling
- Full security measures dey protect data and make sure proper access control dey
- Enterprise integration wit platforms like Azure OpenAI and Microsoft AI Foundry dey improve MCP abilities
- Advanced MCP implementations benefit from beta optimized architectures and good resource management

## Exercise

Design an enterprise-grade MCP implementation for one specific use case:

1. Identify multi-modal needs for your use case
2. Outline the security controls wey dey needed to protect sensitive data
3. Design one scalable architecture wey fit handle different load levels
4. Plan integration points wit enterprise AI systems
5. Document possible performance wahala and how to fix am

## Additional Resources

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Wetin dey next

Explore di lessons for dis module start wit: [5.1 MCP Integration](./mcp-integration/README.md)

After you don finish this module, continue to: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->