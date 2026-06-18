# Avancerade ämnen inom MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/sv/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klicka på bilden ovan för att se videon av denna lektion)_

Detta kapitel täcker en serie avancerade ämnen i implementeringen av Model Context Protocol (MCP), inklusive multimodal integration, skalbarhet, säkerhetsbästa praxis och företagsintegration. Dessa ämnen är avgörande för att bygga robusta och produktionsklara MCP-applikationer som kan möta kraven från moderna AI-system.

## Översikt

Denna lektion utforskar avancerade koncept inom implementeringen av Model Context Protocol, med fokus på multimodal integration, skalbarhet, säkerhetsbästa praxis och företagsintegration. Dessa ämnen är viktiga för att bygga produktionsklara MCP-applikationer som kan hantera komplexa krav i företagsmiljöer.

## Läsmål

I slutet av denna lektion kommer du kunna:

- Implementera multimodala funktioner inom MCP-ramverk
- Designa skalbara MCP-arkitekturer för krävande scenarier
- Använda säkerhetsbästa praxis i linje med MCP:s säkerhetsprinciper
- Integrera MCP med företags AI-system och ramverk
- Optimera prestanda och tillförlitlighet i produktionsmiljöer

## Lektioner och exempelprojekt

| Länk | Titel | Beskrivning |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrera med Azure | Lär dig hur du integrerar din MCP-server på Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP multimodala exempel | Exempel för ljud, bild och multimodala svar |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2-demo | Minimal Spring Boot-app som visar OAuth2 med MCP, både som auktoriserings- och resurserver. Demonstrerar säker token-utfärdande, skyddade slutpunkter, Azure Container Apps-distribution och API Management-integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Lär dig mer om root context och hur man implementerar dem |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lär dig olika typer av routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lär dig hur du arbetar med sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalning | Lär dig om skalning |
| [5.8 Security](./mcp-security/README.md) | Säkerhet | Säkra din MCP-server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server och klient som integrerar med SerpAPI för realtidssökning på webben, nyheter, produkter och Q&A. Demonstrerar multiverktygsorkestrering, extern API-integration och robust felhantering. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Realtidsdataflöde har blivit avgörande i dagens datadrivna värld där företag och applikationer kräver omedelbar tillgång till information för att fatta snabba beslut. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Webbsökning | Realtidssökning på webben – hur MCP transformerar realtidssökning genom att tillhandahålla ett standardiserat tillvägagångssätt för kontexthantering över AI-modeller, sökmotorer och applikationer. | 
| [5.12 Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID-autentisering | Microsoft Entra ID erbjuder en robust molnbaserad identitets- och åtkomsthanteringslösning som hjälper till att säkerställa att endast auktoriserade användare och applikationer kan interagera med din MCP-server. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry-integration | Lär dig hur man integrerar Model Context Protocol-servrar med Microsoft Foundry-agenter, vilket möjliggör kraftfull verktygsorkestrering och företags-AI-funktioner med standardiserade anslutningar till externa datakällor. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Framtida möjligheter med context engineering tekniker för MCP-servrar, inklusive kontextoptimering, dynamisk kontexthantering och strategier för effektiv prompt engineering inom MCP-ramverk. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Egen transport | Lär dig hur du implementerar anpassade transportmekanismer för specialiserade MCP-kommunikationsscenarier. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protokollfunktioner | Bemästra avancerade protokollfunktioner inklusive progressnotifikationer, annulleringsförfrågningar, resursmallar och felhanteringsmönster. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Använd två agenter med motsatta positioner som delar en enda MCP-verktygssats för att upptäcka hallucinationer, belysa kantfall och producera bättre kalibrerade resultat genom strukturerad debatt. |

> **Nytt i MCP-specifikationen 2025-11-25**: Specifikationen innehåller nu experimentellt stöd för **Tasks** (långvariga operationer med förloppsspårning), **Tool Annotations** (metadata om verktygsbeteende för säkerhet), **URL Mode Elicitation** (förfrågningar om specifikt URL-innehåll från klienter) och förbättrade **Roots** (för hantering av arbetsytans kontext). Se [MCP Specification changelog](https://spec.modelcontextprotocol.io/) för fullständiga detaljer.

## Ytterligare referenser

För den mest aktuella informationen om avancerade MCP-ämnen, se:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Säkerhetsrisker och motåtgärder
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsträning

## Viktiga insikter

- Multimodala MCP-implementationer utökar AI-kapaciteter utöver textbearbetning
- Skalbarhet är avgörande för företagsdistributioner och kan hanteras med horisontell och vertikal skalning
- Omfattande säkerhetsåtgärder skyddar data och säkerställer korrekt åtkomstkontroll
- Företagsintegration med plattformar som Azure OpenAI och Microsoft AI Foundry förbättrar MCP-funktionalitet
- Avancerade MCP-implementationer drar nytta av optimerade arkitekturer och noggrann resursförvaltning

## Övning

Designa en MCP-implementation på företagsnivå för ett specifikt användningsfall:

1. Identifiera multimodala krav för ditt användningsfall
2. Skissera säkerhetskontroller som behövs för att skydda känslig data
3. Designa en skalbar arkitektur som kan hantera varierande belastning
4. Planera integrationspunkter med företags AI-system
5. Dokumentera potentiella prestandaflaskhalsar och åtkomststrategier

## Ytterligare resurser

- [Azure OpenAI Dokumentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Vad är nästa steg

Utforska lektionerna i denna modul med start i: [5.1 MCP Integration](./mcp-integration/README.md)

När du har slutfört denna modul, fortsätt till: [Modul 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->