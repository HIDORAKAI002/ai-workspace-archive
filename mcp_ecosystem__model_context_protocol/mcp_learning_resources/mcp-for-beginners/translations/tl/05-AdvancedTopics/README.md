# Mga Advanced na Paksa sa MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/tl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(I-click ang larawan sa itaas upang panoorin ang video ng leksyong ito)_

Tinalakay ng kabanatang ito ang isang serye ng mga advanced na paksa sa implementasyon ng Model Context Protocol (MCP), kabilang ang multi-modal na integrasyon, scalability, pinakamahusay na mga kasanayan sa seguridad, at integrasyon sa enterprise. Mahalaga ang mga paksang ito para sa paggawa ng matibay at handang produksyon na mga aplikasyon ng MCP na maaaring tugunan ang mga pangangailangan ng mga modernong sistema ng AI.

## Pangkalahatang-ideya

Ang leksyong ito ay sumusuri sa mga advanced na konsepto sa implementasyon ng Model Context Protocol, na nakatuon sa multi-modal na integrasyon, scalability, pinakamahusay na mga kasanayan sa seguridad, at integrasyon sa enterprise. Mahalaga ang mga paksang ito para sa paggawa ng mga aplikasyon ng MCP na pang-produksyon na kayang hawakan ang mga kumplikadong pangangailangan sa mga kapaligiran ng enterprise.

> **Tumingin sa hinaharap:** ilang mga paksa sa ibaba ay naapektuhan ng `2026-07-28` na MCP specification release candidate — Root Contexts (5.4) at Sampling (5.6) ay nakabatay sa mga primitiva na tinuturing na deprecated ng release candidate, at ang experimental na tampok na Tasks na binanggit sa Protocol Features (5.16) ay lumilipat sa isang dedikadong Tasks extension. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para sa mga detalye.

## Mga Layunin sa Pagkatuto

Sa pagtatapos ng leksyong ito, magagawa mo na:

- Magpatupad ng mga kakayahan sa multi-modal sa loob ng mga framework ng MCP
- Magdisenyo ng mga scalable na arkitektura ng MCP para sa mga senaryong may mataas na pangangailangan
- Mag-apply ng pinakamahusay na mga kasanayan sa seguridad na naaayon sa mga prinsipyo ng seguridad ng MCP
- Mag-integrate ng MCP sa mga enterprise AI system at framework
- I-optimize ang pagganap at pagiging maaasahan sa mga kapaligiran ng produksyon

## Mga Leksiyon at Halimbawang Proyekto

| Link | Pamagat | Deskripsyon |
|------|---------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrasyon sa Azure | Matutunan kung paano i-integrate ang iyong MCP Server sa Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Mga Halimbawa ng MCP Multi modal  | Mga halimbawa para sa audio, imahe, at multi modal na tugon |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal na Spring Boot na app na nagpapakita ng OAuth2 gamit ang MCP, bilang Authorization at Resource Server. Ipinapakita ang secure na token issuance, protektadong mga endpoint, deployment sa Azure Container Apps, at integrasyon sa API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Mga root context  | Matuto nang higit pa tungkol sa root context at kung paano ito ipatupad (deprecated sa `2026-07-28` release candidate; valid pa rin para sa `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Matuto tungkol sa iba't ibang uri ng routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Matuto kung paano magtrabaho gamit ang sampling (deprecated sa `2026-07-28` release candidate; valid pa rin para sa `2025-11-25`) |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling  | Matuto tungkol sa scaling |
| [5.8 Security](./mcp-security/README.md) | Seguridad  | Siguraduhin ang iyong MCP Server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP server at client na nakikipag-integrate sa SerpAPI para sa real-time na web, balita, paghahanap ng produkto, at Q&A. Ipinapakita ang multi-tool orchestration, external API integration, at matibay na pamamahala ng error. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Ang real-time na data streaming ay naging mahalaga sa mundong pinalalakad ng datos ngayon, kung saan kailangan ng mga negosyo at aplikasyon ng agarang access sa impormasyon upang makagawa ng napapanahong mga desisyon.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Paano binabago ng MCP ang real-time na web search sa pamamagitan ng pagbibigay ng standardized na paraan sa pamamahala ng konteksto sa mga AI model, search engine, at aplikasyon.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Nagbibigay ang Microsoft Entra ID ng matibay na cloud-based na solusyon sa identity at access management, na tumutulong tiyakin na tanging mga awtorisadong user at aplikasyon lamang ang makaka-interact sa iyong MCP server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integrasyon ng Microsoft Foundry | Matutunan kung paano i-integrate ang Model Context Protocol servers sa mga Microsoft Foundry agents, na nagpapagana ng malakas na tool orchestration at kakayahan ng enterprise AI gamit ang standardized na koneksyon sa mga external na pinagmumulan ng datos.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Ang hinaharap na oportunidad ng mga teknik sa context engineering para sa MCP servers, kabilang ang context optimization, dynamic context management, at mga estratehiya para sa epektibong prompt engineering sa loob ng framework ng MCP.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Matutunan kung paano ipatupad ang mga custom na mekanismo ng transport para sa mga espesyal na senaryo ng komunikasyon ng MCP.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Mga Tampok ng Protocol | Masterin ang mga advanced na tampok ng protocol kabilang ang mga notification ng progreso, pagkansela ng kahilingan, mga template ng resource, at mga pattern ng pamamahala ng error.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Mga Adversarial Agent | Gamitin ang dalawang ahente na may magkasalungat na posisyon, na naghahati sa isang MCP tool set, upang mahuli ang mga hallucinations, mailabas ang mga kakaibang kaso, at makalikha ng mas mahusay na napapa-calibrate na output sa pamamagitan ng istrukturadong debate.|

> **Bago sa MCP Specification 2025-11-25**: Kasama na ngayon sa specification ang experimental na suporta para sa **Tasks** (mga operasyon na tumatagal na may progress tracking), **Tool Annotations** (metadata tungkol sa pag-uugali ng tool para sa kaligtasan), **URL Mode Elicitation** (humihiling ng partikular na nilalaman ng URL mula sa mga kliyente), at pinahusay na **Roots** (para sa pamamahala ng workspace context). Tingnan ang [MCP Specification changelog](https://spec.modelcontextprotocol.io/) para sa buong detalye.

## Karagdagang mga Sanggunian

Para sa pinakabagong impormasyon tungkol sa mga advanced na paksa ng MCP, sumangguni sa:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Mga panganib sa seguridad at mga mitigasyon
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on na pagsasanay sa seguridad

## Pangunahing Pangunahing Puntos

- Pinalalawak ng mga multi-modal na implementasyon ng MCP ang mga kakayahan ng AI lampas sa text processing
- Mahalaga ang scalability para sa mga deployment ng enterprise at maaaring matugunan sa pamamagitan ng horizontal at vertical scaling
- Pinoprotektahan ng komprehensibong mga hakbang sa seguridad ang datos at tiniyak ang tamang access control
- Pinapalakas ng integrasyon sa enterprise sa mga platform tulad ng Azure OpenAI at Microsoft AI Foundry ang mga kakayahan ng MCP
- Nakikinabang ang mga advanced na implementasyon ng MCP mula sa mga na-optimize na arkitektura at maingat na pamamahala ng mga resources

## Pagsasanay

Disenyuhin ang isang enterprise-grade na implementasyon ng MCP para sa isang partikular na kaso ng paggamit:

1. Tukuyin ang mga pangangailangan sa multi-modal para sa iyong kaso ng paggamit
2. Ilahad ang mga kontrol sa seguridad na kinakailangan upang protektahan ang sensitibong datos
3. Disenyuhin ang isang scalable na arkitektura na kayang humawak ng iba't ibang load
4. Planuhin ang mga punto ng integrasyon sa mga enterprise AI system
5. Idokumento ang mga posibleng bottleneck sa pagganap at mga estratehiya sa mitigasyon

## Karagdagang mga Mapagkukunan

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Ano ang susunod

Tuklasin ang mga leksiyon sa modyul na ito simula sa: [5.1 MCP Integration](./mcp-integration/README.md)

Pagkatapos mong matapos ang modyul na ito, magpatuloy sa: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->