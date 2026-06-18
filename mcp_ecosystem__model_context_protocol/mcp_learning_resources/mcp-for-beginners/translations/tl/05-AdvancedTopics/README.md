# Mga Advanced na Paksa sa MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/tl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(I-click ang larawan sa itaas upang panoorin ang video ng araling ito)_

Sinasaklaw ng kabanatang ito ang isang serye ng mga advanced na paksa sa pagpapatupad ng Model Context Protocol (MCP), kabilang ang multi-modal na integrasyon, scalability, mga pinakamahusay na kasanayan sa seguridad, at enterprise integration. Mahalaga ang mga paksang ito para sa pagbuo ng matatag at handang produksyon na mga aplikasyon ng MCP na kayang tugunan ang mga pangangailangan ng makabagong mga AI system.

## Pangkalahatang-ideya

Tinutuklas ng araling ito ang mga advanced na konsepto sa pagpapatupad ng Model Context Protocol, na nakatuon sa multi-modal na integrasyon, scalability, mga pinakamahusay na kasanayan sa seguridad, at enterprise integration. Mahalaga ang mga paksang ito para sa pagbuo ng mga production-grade na aplikasyon ng MCP na kayang hawakan ang mga kumplikadong pangangailangan sa mga kapaligiran ng enterprise.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng araling ito, magagawa mong:

- Ipatupad ang mga multi-modal na kakayahan sa loob ng mga MCP framework
- Magdisenyo ng scalable na MCP architectures para sa mga high-demand na senaryo
- Ipatupad ang mga pinakamahusay na kasanayan sa seguridad na nakaayon sa mga prinsipyo ng seguridad ng MCP
- I-integrate ang MCP sa mga enterprise AI system at framework
- I-optimize ang performance at reliability sa mga production environment

## Mga Aralin at Halimbawang Proyekto

| Link | Pamagat | Paglalarawan |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrate with Azure | Matutunan kung paano i-integrate ang iyong MCP Server sa Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP Multi modal samples  | Mga sample para sa audio, larawan, at multi-modal na tugon |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal na Spring Boot app na nagpapakita ng OAuth2 sa MCP, bilang Authorization at Resource Server. Nagpapakita ng secure token issuance, protected endpoints, deployment sa Azure Container Apps, at API Management integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Matuto nang higit pa tungkol sa root context at paano ito ipinatupad |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Matuto tungkol sa iba't ibang uri ng routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Matuto kung paano magtrabaho gamit ang sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling  | Matuto tungkol sa scaling |
| [5.8 Security](./mcp-security/README.md) | Security  | Siguraduhin ang iyong MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP server at client na nag-iintegrate sa SerpAPI para sa real-time na web, balita, paghahanap ng produkto, at Q&A. Nagpapakita ng multi-tool orchestration, integrasyon ng external API, at matibay na error handling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Ang real-time data streaming ay naging mahalaga sa mundo na pinapalakad ng datos ngayon, kung saan kailangan ng mga negosyo at aplikasyon ng agarang access sa impormasyon upang makagawa ng napapanahong mga desisyon.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Real-time web search kung paano binabago ng MCP ang real-time web search sa pamamagitan ng pagbibigay ng standardized na paraan sa pamamahala ng konteksto sa iba't ibang AI model, search engines, at aplikasyon.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Nagbibigay ang Microsoft Entra ID ng matibay na cloud-based identity at access management solution, tumutulong upang matiyak na tanging mga awtorisadong user at aplikasyon lamang ang maaaring makipag-ugnayan sa iyong MCP server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Matutunan kung paano i-integrate ang Model Context Protocol servers sa Microsoft Foundry agents, na nagpapagana ng makapangyarihang tool orchestration at mga kakayahan ng enterprise AI gamit ang standardized na koneksyon sa mga external data source.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Ang hinaharap na oportunidad ng mga teknik sa context engineering para sa mga MCP server, kabilang ang context optimization, dynamic context management, at mga estratehiya para sa epektibong prompt engineering sa loob ng mga MCP framework.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Matutunan kung paano ipatupad ang mga custom transport mechanism para sa mga espesyalisadong senaryo ng komunikasyon ng MCP.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protocol Features | Saklawin ang mga advanced na tampok ng protocol kabilang ang progress notifications, pagkansela ng request, resource templates, at mga pattern sa paghawak ng error.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Gumamit ng dalawang agent na may magkasalungat na posisyon, na gumagamit ng iisang set ng MCP tool, upang mahuli ang mga hallucination, ipakita ang mga edge case, at makagawa ng mas mahusay na calibrated na output sa pamamagitan ng istrukturadong debate.|

> **Bago sa MCP Specification 2025-11-25**: Kasama na ngayon sa specification ang experimental na suporta para sa **Tasks** (mga long-running operation na may progress tracking), **Tool Annotations** (metadata tungkol sa pag-uugali ng tool para sa kaligtasan), **URL Mode Elicitation** (paghingi ng partikular na URL content mula sa mga kliyente), at pinalawak na **Roots** (para sa pamamahala ng workspace context). Tingnan ang [MCP Specification changelog](https://spec.modelcontextprotocol.io/) para sa buong detalye.

## Karagdagang Sanggunian

Para sa pinakabagong impormasyon sa mga advanced na paksa ng MCP, sumangguni sa:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga panganib sa seguridad at mga paraan ng mitigasyon
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktikal na pagsasanay sa seguridad

## Mga Pangunahing Aral

- Pinalalawak ng mga multi-modal na implementasyon ng MCP ang mga kakayahan ng AI lampas sa pagpoproseso ng teksto
- Mahalaga ang scalability para sa mga deployment sa enterprise at maaaring tugunan sa pamamagitan ng horizontal at vertical scaling
- Pinoprotektahan ng komprehensibong mga hakbang sa seguridad ang datos at tinitiyak ang tamang kontrol sa access
- Pinapalakas ng enterprise integration sa mga platform tulad ng Azure OpenAI at Microsoft AI Foundry ang mga kakayahan ng MCP
- Nakikinabang ang mga advanced na implementasyon ng MCP mula sa optimized architectures at maingat na pamamahala sa resources

## Ehersisyo

Magdisenyo ng enterprise-grade na implementasyon ng MCP para sa isang partikular na use case:

1. Tukuyin ang mga multi-modal na kinakailangan para sa iyong use case
2. Ilahad ang mga kontrol sa seguridad na kailangan upang protektahan ang sensitibong datos
3. Magdisenyo ng scalable na arkitektura na kayang hawakan ang nagbabagong load
4. Planuhin ang mga punto ng integrasyon sa mga enterprise AI system
5. Idokumento ang mga potensyal na bottleneck sa performance at mga estratehiya sa mitigasyon

## Karagdagang Mga Mapagkukunan

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Ano ang susunod

Suriin ang mga aralin sa modulong ito simula sa: [5.1 MCP Integration](./mcp-integration/README.md)

Kapag natapos mo na ang modulong ito, magpatuloy sa: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->