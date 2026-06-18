# Avancerede emner i MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/da/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik på billedet ovenfor for at se video af denne lektion)_

Dette kapitel dækker en række avancerede emner i Model Context Protocol (MCP) implementering, herunder multimodal integration, skalerbarhed, sikkerhedspraksis og enterprise-integration. Disse emner er afgørende for at bygge robuste og produktionsparate MCP-applikationer, der kan imødekomme kravene fra moderne AI-systemer.

## Oversigt

Denne lektion udforsker avancerede koncepter i Model Context Protocol-implementering med fokus på multimodal integration, skalerbarhed, sikkerhedspraksis og enterprise-integration. Disse emner er væsentlige for at bygge produktionsklare MCP-applikationer, der kan håndtere komplekse krav i enterprise-miljøer.

## Læringsmål

Ved slutningen af denne lektion vil du kunne:

- Implementere multimodale kapaciteter inden for MCP-rammer
- Designe skalerbare MCP-arkitekturer til scenarier med højt belastningsbehov
- Anvende sikkerhedspraksis i overensstemmelse med MCP's sikkerhedsprincipper
- Integrere MCP med enterprise AI-systemer og rammer
- Optimere ydeevne og pålidelighed i produktionsmiljøer

## Lektioner og eksempler på projekter

| Link | Titel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrer med Azure | Lær hvordan du integrerer din MCP-server på Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP Multi modal eksempler | Eksempler på lyd, billede og multimodale svar |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot app, der viser OAuth2 med MCP, både som autorisations- og ressource-server. Demonstrerer sikker token-udstedelse, beskyttede endpoints, Azure Container Apps implementering, og integration med API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root context | Lær mere om root context og hvordan du implementerer dem |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lær forskellige typer routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan man arbejder med sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Scaling | Lær om skalering |
| [5.8 Security](./mcp-security/README.md) | Security | Sikr din MCP-server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server og klient, der integrerer med SerpAPI for realtidsweb-, nyheds-, produkt-søgning og Q&A. Demonstrerer multi-tool orkestrering, ekstern API-integration og robust fejlhåndtering. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Realtidsdatastreaming er blevet essentielt i dagens datadrevne verden, hvor virksomheder og applikationer kræver øjeblikkelig adgang til information for at træffe rettidige beslutninger. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Realtids web-søgning, hvordan MCP transformerer realtids web-søgning ved at tilbyde en standardiseret tilgang til kontekststyring på tværs af AI-modeller, søgemaskiner og applikationer. |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authentication | Microsoft Entra ID giver en robust cloud-baseret identitets- og adgangsstyringsløsning, der sikrer, at kun autoriserede brugere og applikationer kan interagere med din MCP-server. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Lær hvordan man integrerer Model Context Protocol-servere med Microsoft Foundry agenter, hvilket muliggør kraftfuld tool-orkestrering og enterprise AI-kapaciteter med standardiserede eksterne datakildeforbindelser. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Fremtidens muligheder for kontekst-engineering teknikker til MCP-servere, herunder kontekstoptimering, dynamisk kontekststyring og strategier til effektiv prompt engineering inden for MCP-rammer. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Lær hvordan du implementerer custom transport-mekanismer for specialiserede MCP-kommunikationsscenarier. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protocol Features | Mestre avancerede protokolfunktioner inklusive fremdriftsmeddelelser, annullering af forespørgsler, ressource-skabeloner og fejlhåndteringsmønstre. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Brug to agenter med modstridende positioner, der deler et enkelt MCP tool sæt, for at fange hallucinationer, afdække edge cases og skabe bedre kalibrerede output gennem struktureret debat. |

> **Ny i MCP Specification 2025-11-25**: Specifikationen inkluderer nu eksperimentel understøttelse af **Tasks** (langvarige operationer med fremdriftssporing), **Tool Annotations** (metadata om tool-adfærd for sikkerhed), **URL Mode Elicitation** (anmodning om specifikt URL-indhold fra klienter) og forbedrede **Roots** (til workspace kontekststyring). Se [MCP Specification changelog](https://spec.modelcontextprotocol.io/) for fulde detaljer.

## Yderligere referencer

For den mest opdaterede information om avancerede MCP-emner, se:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhedsrisici og afbødninger
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning

## Vigtige pointer

- Multimodale MCP-implementeringer udvider AI-kapaciteter ud over tekstbehandling
- Skalerbarhed er afgørende for enterprise-udrulninger og kan løses gennem horisontal og vertikal skalering
- Omfattende sikkerhedsforanstaltninger beskytter data og sikrer korrekt adgangskontrol
- Enterprise-integration med platforme som Azure OpenAI og Microsoft AI Foundry forbedrer MCP-kapaciteter
- Avancerede MCP-implementeringer drager fordel af optimerede arkitekturer og omhyggelig ressourcehåndtering

## Øvelse

Design en enterprise-klasse MCP-implementering til et specifikt brugsscenarie:

1. Identificer multimodale krav til dit brugsscenarie
2. Skitser de sikkerhedskontroller, der er nødvendige for at beskytte følsomme data
3. Design en skalerbar arkitektur, der kan håndtere varierende belastning
4. Planlæg integrationspunkter med enterprise AI-systemer
5. Dokumenter potentielle ydeevneflaskehalse og afbødningsstrategier

## Yderligere ressourcer

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Hvad er det næste

Udforsk lektionerne i denne modul med start fra: [5.1 MCP Integration](./mcp-integration/README.md)

Når du har gennemført denne modul, fortsæt til: [Modul 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->