# Mga Advanced na Paksa sa MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/tl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(I-click ang larawan sa itaas upang panoorin ang video ng leksyong ito)_

Sinasaklaw ng kabanatang ito ang isang serye ng mga advanced na paksa sa implementasyon ng Model Context Protocol (MCP), kabilang ang multi-modal integration, scalability, mga pinakamahusay na kasanayan sa seguridad, at enterprise integration. Mahalaga ang mga paksang ito para sa paggawa ng matibay at handang gamitin sa produksyon na mga aplikasyon ng MCP na makakatugon sa mga pangangailangan ng makabagong mga sistema ng AI.

## Pangkalahatang-ideya

Tinutuklas ng leksyong ito ang mga advanced na konsepto sa implementasyon ng Model Context Protocol, na nakatuon sa multi-modal integration, scalability, mga pinakamahusay na kasanayan sa seguridad, at enterprise integration. Mahalagang mga paksa ang mga ito sa pagbuo ng mga production-grade na aplikasyon ng MCP na kayang hawakan ang mga kumplikadong pangangailangan sa mga kapaligirang pang-enterprise.

> **Pagtingin sa hinaharap:** ilang mga paksa sa ibaba ay apektado ng `2026-07-28` MCP specification release candidate — Root Contexts (5.4) at Sampling (5.6) ay bumabatay sa mga primitives na tinuturing ng release candidate na deprecated, at ang eksperimento sa Tasks na tampok na binanggit sa Protocol Features (5.16) ay lilipat sa isang dedikadong Tasks extension. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para sa mga detalye.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng leksyong ito, magagawa mong:

- Magpatupad ng multi-modal na mga kakayahan sa loob ng mga MCP framework
- Magdisenyo ng scalable na arkitektura ng MCP para sa mga senaryong may mataas na demand
- Mag-apply ng mga pinakamahusay na kasanayan sa seguridad alinsunod sa mga prinsipyo ng seguridad ng MCP
- Mag-integrate ng MCP sa mga enterprise AI system at framework
- I-optimize ang performance at pagiging maaasahan sa mga production environment

## Mga Leksiyon at Halimbawang Proyekto

| Link | Pamagat | Deskripsyon |
|------|---------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Pagsasama sa Azure | Matutunan kung paano i-integrate ang iyong MCP Server sa Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Mga MCP Multi modal na halimbawa | Mga halimbawa para sa audio, imahe, at multi modal na tugon |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal na Spring Boot app na nagpapakita ng OAuth2 kasama ang MCP, bilang Authorization at Resource Server. Nagpapakita ng secure na token issuance, mga protektadong endpoint, deployment sa Azure Container Apps, at integration sa API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Mga Root context | Matuto pa tungkol sa root context at kung paano ito ipinatutupad |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Matutunan ang iba't ibang uri ng routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Matutunan kung paano gumamit ng sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling | Matutunan tungkol sa scaling |
| [5.8 Security](./mcp-security/README.md) | Seguridad | Panatilihing secure ang iyong MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP server at client na nakikipag-integrate sa SerpAPI para sa real-time web, balita, paghahanap ng produkto, at Q&A. Nagpapakita ng multi-tool orchestration, external API integration, at matibay na error handling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Ang real-time data streaming ay naging mahalaga sa mundo ngayon na puno ng data, kung saan nangangailangan ang mga negosyo at aplikasyon ng agarang access sa impormasyon para makagawa ng tamang desisyon sa tamang oras.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Paano binabago ng MCP ang real-time web search sa pamamagitan ng pagbibigay ng standardized na paraan para sa context management sa pagitan ng AI models, search engines, at mga aplikasyon.|
| [5.12 Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Nagbibigay ang Microsoft Entra ID ng matatag na cloud-based na identity at access management solution, na tumutulong tiyakin na tanging mga awtorisadong user at aplikasyon lamang ang maaaring makipag-ugnayan sa iyong MCP server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Alamin kung paano i-integrate ang mga Model Context Protocol server sa Microsoft Foundry agents, na nagpapagana ng makapangyarihang tool orchestration at enterprise AI capabilities gamit ang standardized na mga koneksyon sa panlabas na pinagkukunan ng data.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Ang mga darating na oportunidad sa context engineering techniques para sa MCP servers, kabilang ang context optimization, dynamic context management, at mga estratehiya para sa epektibong prompt engineering sa loob ng MCP frameworks.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Matutunan kung paano magpatupad ng custom transport mechanisms para sa mga espesyal na senaryo ng komunikasyon ng MCP.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Mga Tampok ng Protocol | Masterin ang mga advanced na tampok ng protocol kabilang ang progress notifications, request cancellation, resource templates, at mga pattern sa paghawak ng error.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Mga Adversarial Agents | Gumamit ng dalawang ahente na may magkabilang posisyon, na gumagamit ng iisang set ng MCP tool, upang mahuli ang mga halusinasyon, lumitaw ang mga edge case, at makabuo ng mas mahusay na naka-calibrate na output sa pamamagitan ng estrukturadong debate.|

> **Bago sa MCP Specification 2025-11-25**: Kasama na ngayon sa specification ang eksperimento para sa **Tasks** (mga long-running operations na may progress tracking), **Tool Annotations** (metadata tungkol sa pag-uugali ng tool para sa kaligtasan), **URL Mode Elicitation** (paghingi ng partikular na URL content mula sa mga client), at pinahusay na **Roots** (para sa pamamahala ng context sa workspace). Tingnan ang [MCP Specification changelog](https://spec.modelcontextprotocol.io/) para sa buong detalye.

## Karagdagang Sanggunian

Para sa pinakabagong impormasyon tungkol sa mga advanced na paksa ng MCP, tumukoy sa:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga panganib sa seguridad at mga mitigasyon
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad

## Pangunahing Mga Punto na Dapat Tandaan

- Ang mga multi-modal na implementasyon ng MCP ay nagpapalawak ng kakayahan ng AI lampas sa text processing
- Mahalaga ang scalability para sa mga deployment sa enterprise at maaaring tugunan sa pamamagitan ng horizontal at vertical scaling
- Pinoprotektahan ng komprehensibong mga hakbang sa seguridad ang data at tinitiyak ang wastong access control
- Ang enterprise integration sa mga plataporma tulad ng Azure OpenAI at Microsoft AI Foundry ay nagpapahusay sa kakayahan ng MCP
- Nakikinabang ang mga advanced na implementasyon ng MCP mula sa na-optimize na arkitektura at maingat na pamamahala ng mga resources

## Ehersisyo

Magdisenyo ng enterprise-grade na implementasyon ng MCP para sa isang tiyak na kaso ng paggamit:

1. Tukuyin ang mga multi-modal na pangangailangan para sa iyong kaso ng paggamit
2. Ilahad ang mga kontrol sa seguridad na kinakailangan upang maprotektahan ang sensitibong data
3. Disenyo ng scalable na arkitektura na kayang tumanggap ng iba't ibang antas ng load
4. Planuhin ang mga integration point sa mga enterprise AI system
5. Idokumento ang mga posibleng bottleneck sa performance at mga estratehiya para sa mitigasyon

## Karagdagang Mga Sanggunian

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Ano ang susunod

Tuklasin ang mga leksyon sa module na ito simula sa: [5.1 MCP Integration](./mcp-integration/README.md)

Kapag natapos mo na ang module na ito, magpatuloy sa: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->