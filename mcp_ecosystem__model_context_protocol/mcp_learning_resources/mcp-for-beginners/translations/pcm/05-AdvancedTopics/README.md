# Advanced Topics in MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/pcm/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Click di image wey dey above to watch dis lesson video)_

Dis chapter dey cover series of advanced topics for Model Context Protocol (MCP) implementation, including multi-modal integration, scalability, security best practices, and enterprise integration. Dem topics dey important for building strong and production-ready MCP applications wey fit meet the demands of modern AI systems.

## Overview

Dis lesson dey explore advanced concepts for Model Context Protocol implementation, e focus for multi-modal integration, scalability, security best practices, and enterprise integration. Dis topics na important for building production-grade MCP applications wey fit handle complex requirements for enterprise environments.

> **Looking ahead:** some topics for below dey affected by di `2026-07-28` MCP specification release candidate — Root Contexts (5.4) and Sampling (5.6) na still dey build on top di primitives wey di release candidate don mark as deprecated, and di experimental Tasks feature wey them talk for Protocol Features (5.16) don shift go dedicated Tasks extension. Check [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for more details.

## Learning Objectives

By di end of dis lesson, you go fit:

- Implement multi-modal capabilities inside MCP frameworks
- Design scalable MCP architectures for high-demand scenarios
- Apply security best practices wey go align with MCP security principles
- Integrate MCP with enterprise AI systems and frameworks
- Optimize performance and reliability for production environments

## Lessons and sample Projects

| Link | Title | Description |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrate with Azure | Learn how to integrate your MCP Server on Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP Multi modal samples  | Samples for audio, image and multi modal response |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot app wey show OAuth2 with MCP, both as Authorization and Resource Server. E dey show secure token issuance, protected endpoints, Azure Container Apps deployment, and API Management integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Learn more about root context and how you fit implement am |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Learn different kinds of routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Learn how to work with sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling  | Learn about scaling |
| [5.8 Security](./mcp-security/README.md) | Security  | Secure your MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP server and client wey integrate with SerpAPI for real-time web, news, product search, and Q&A. E demonstrate multi-tool orchestration, external API integration, and strong error handling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Real-time data streaming don become important for today's data-driven world, where businesses and apps need fast access to info to make correct decisions.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Real-time web search, how MCP dey transform real-time web search by providing standard approach to context management across AI models, search engines, and applications.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Microsoft Entra ID na strong cloud-based identity and access management solution, e dey help make sure say only authorized users and apps fit interact with your MCP server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Learn how to integrate Model Context Protocol servers with Microsoft Foundry agents, so e go enable powerful tool orchestration and enterprise AI capabilities with standard external data source connections.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Di future opportunity for context engineering techniques for MCP servers, wey include context optimization, dynamic context management, and strategies for effective prompt engineering inside MCP frameworks.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Learn how to implement custom transport methods for specialized MCP communication scenarios.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protocol Features | Master advanced protocol features like progress notifications, request cancellation, resource templates, and error handling patterns.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Use two agents wey dey opposite sides, wey share one MCP tool set, to catch hallucinations, show edge cases, and produce better-calibrated outputs through structured debate.|

> **New in MCP Specification 2025-11-25**: Di specification now include experimental support for **Tasks** (long-running operations with progress tracking), **Tool Annotations** (metadata about tool behavior for safety), **URL Mode Elicitation** (request specific URL content from clients), and improved **Roots** (for workspace context management). Check di [MCP Specification changelog](https://spec.modelcontextprotocol.io/) for full details.

## Additional References

For di latest info for advanced MCP topics, check:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Security risks and mitigation
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on security training

## Key Takeaways

- Multi-modal MCP implementations dey extend AI capabilities beyond just text processing
- Scalability dey important for enterprise deployments and fit get through horizontal and vertical scaling
- Strong security measures dey protect data and ensure correct access control
- Enterprise integration with platforms like Azure OpenAI and Microsoft AI Foundry dey boost MCP capabilities
- Advanced MCP implementations benefit from optimized architectures and careful resource management

## Exercise

Design enterprise-grade MCP implementation for one specific use case:

1. Identify multi-modal requirements for your use case
2. Outline di security controls wey go protect sensitive data
3. Design scalable architecture wey fit handle different load levels
4. Plan integration points with enterprise AI systems
5. Document possible performance bottlenecks and mitigation strategies

## Additional Resources

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## What's next

Explore di lessons for this module starting with: [5.1 MCP Integration](./mcp-integration/README.md)

After you don finish this module, continue to: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg make you know say automated translation fit get errors or mistakes. Di original document for dia own language na im be di correct source. For important info, make person wey sabi human translation do am. We no go responsible for any misunderstanding or wrong understanding wey fit happen because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->