# Avancerade ämnen i MCP

[![Avancerad MCP: Säker, Skalbar och Multimodal AI-agenter](../../../translated_images/sv/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klicka på bilden ovan för att se videon till denna lektion)_

Detta kapitel täcker en serie avancerade ämnen inom implementering av Model Context Protocol (MCP), inklusive multimodal integration, skalbarhet, säkerhetsbästa praxis och företagsintegration. Dessa ämnen är avgörande för att bygga robusta och produktionsklara MCP-applikationer som kan möta kraven från moderna AI-system.

## Översikt

Denna lektion utforskar avancerade begrepp i implementering av Model Context Protocol, med fokus på multimodal integration, skalbarhet, säkerhetsbästa praxis och företagsintegration. Dessa ämnen är viktiga för att bygga produktionsfärdiga MCP-applikationer som kan hantera komplexa krav i företagsmiljöer.

> **Framåtblick:** flera av nedanstående ämnen påverkas av `2026-07-28` MCP-specifikations release candidate — Root Contexts (5.4) och Sampling (5.6) bygger på primitiva funktioner som release-kandidaten markerar som föråldrade, och den experimentella funktion Tasks som nämns i Protocol Features (5.16) flyttas till en dedikerad Tasks-förlängning. Se [Vad som ändras i MCP: Release Candidate 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) för detaljer.

## Inlärningsmål

I slutet av denna lektion kommer du att kunna:

- Implementera multimodala funktioner inom MCP-ramverk
- Designa skalbara MCP-arkitekturer för högbelastade scenarier
- Tillämpa säkerhetsbästa praxis i linje med MCP:s säkerhetsprinciper
- Integrera MCP med företags-AI-system och ramverk
- Optimera prestanda och tillförlitlighet i produktionsmiljöer

## Lektioner och exempelprojekt

| Länk | Titel | Beskrivning |
|------|-------|-------------|
| [5.1 Integration med Azure](./mcp-integration/README.md) | Integrera med Azure | Lär dig hur du integrerar din MCP-server på Azure |
| [5.2 Multimodalt exempel](./mcp-multi-modality/README.md) | MCP Multimodala exempel | Exempel på ljud, bild och multimodala svar |
| [5.3 MCP OAuth2-exempel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot-app som visar OAuth2 med MCP, både som auktorisations- och resurserver. Demonstrerar säker tokenutfärdelse, skyddade slutpunkter, Azure Container Apps-distribution och API Management-integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Rot-kontroller | Lär dig mer om root context och hur man implementerar dem (föråldrat i `2026-07-28` release candidate; fortfarande giltigt för `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lär dig olika typer av routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lär dig arbeta med sampling (föråldrat i `2026-07-28` release candidate; fortfarande giltigt för `2025-11-25`) |
| [5.7 Skalning](./mcp-scaling/README.md) | Skalning | Lär dig om skalning |
| [5.8 Säkerhet](./mcp-security/README.md) | Säkerhet | Säkra din MCP-server |
| [5.9 Webbsökning-exempel](./web-search-mcp/README.md) | Webbsökning MCP | Python MCP-server och klient som integrerar med SerpAPI för realtids-webb, nyheter, produktsök och Q&A. Visar verktygsorkestrering, extern API-integration och robust felhantering. |
| [5.10 Realtidsströmning](./mcp-realtimestreaming/README.md) | Streaming | Realtidsdatastreaming har blivit avgörande i dagens datadrivna värld, där företag och applikationer kräver omedelbar tillgång till information för att fatta snabba beslut.|
| [5.11 Realtids webbsök](./mcp-realtimesearch/README.md) | Webbsök | Så här förvandlar MCP realtids webbsökning genom att tillhandahålla en standardiserad metod för kontexthantering mellan AI-modeller, sökmotorer och applikationer. | 
| [5.12 Entra ID-autentisering för Model Context Protocol-servrar](./mcp-security-entra/README.md) | Entra ID-autentisering | Microsoft Entra ID erbjuder en robust molnbaserad identitets- och åtkomsthanteringslösning, som hjälper till att säkerställa att endast auktoriserade användare och applikationer kan interagera med din MCP-server.|
| [5.13 Microsoft Foundry Agent-integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry-integration | Lär dig hur du integrerar Model Context Protocol-servrar med Microsoft Foundry-agenter, vilket möjliggör kraftfull verktygsorkestrering och företags-AI-funktioner med standardiserade anslutningar till externa datakällor.|
| [5.14 Kontextteknik](./mcp-contextengineering/README.md) | Kontextteknik | Framtidsmöjligheter för kontextteknik för MCP-servrar, inklusive kontextoptimering, dynamisk kontexthantering och strategier för effektiv promptteknik inom MCP-ramverk.|
| [5.15 MCP Anpassad Transport](./mcp-transport/README.md) | Anpassad transport | Lär dig implementera anpassade transportmekanismer för specialiserade MCP-kommunikationsscenarier.|
| [5.16 Protokollfunktioner på djupet](./mcp-protocol-features/README.md) | Protokollfunktioner | Bemästra avancerade protokollfunktioner inklusive progressnotifieringar, avbokning av förfrågningar, resursmallar och mönster för felhantering.|
| [5.17 Antagonistisk multi-agent-resonemang](./mcp-adversarial-agents/README.md) | Antagonistiska agenter | Använd två agenter med motsatta ståndpunkter, som delar en MCP-verktygssats, för att fånga hallucinationer, belysa kantfall och producera bättre kalibrerade utsagor genom strukturerad debatt.|

> **Ny i MCP-specifikationen 2025-11-25**: Specifikationen inkluderar nu experimentellt stöd för **Tasks** (långvariga operationer med progressuppföljning), **Verksanteckningar** (metadata om verktygsbeteende för säkerhet), **URL Mode Elicitation** (begär specifikt URL-innehåll från klienter) och förbättrade **Roots** (för arbetsytans kontexthantering). Se [MCP Specifikations ändringslogg](https://spec.modelcontextprotocol.io/) för fullständiga detaljer.

## Ytterligare referenser

För den senaste informationen om avancerade MCP-ämnen, se:
- [MCP-dokumentation](https://modelcontextprotocol.io/)
- [MCP-specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Säkerhetsrisker och motåtgärder
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsträning

## Viktiga slutsatser

- Multimodala MCP-implementationer utökar AI-möjligheter bortom textbearbetning
- Skalbarhet är avgörande för företagsdistribuering och kan hanteras via horisontell och vertikal skalning
- Omfattande säkerhetsåtgärder skyddar data och säkerställer korrekt åtkomstkontroll
- Företagsintegration med plattformar som Azure OpenAI och Microsoft AI Foundry förbättrar MCP-möjligheter
- Avancerade MCP-implementationer gynnas av optimerade arkitekturer och noggrann resursförvaltning

## Övning

Designa en MCP-implementation av företagsklass för ett specifikt användningsfall:

1. Identifiera multimodala krav för ditt användningsfall
2. Beskriv de säkerhetskontroller som krävs för att skydda känslig data
3. Designa en skalbar arkitektur som kan hantera varierande belastning
4. Planera integrationspunkter med företags-AI-system
5. Dokumentera potentiella flaskhalsar i prestanda och åtgärdsstrategier

## Ytterligare resurser

- [Azure OpenAI-dokumentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry-dokumentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Vad som kommer härnäst

Utforska lektionerna i denna modul med början på: [5.1 MCP-integration](./mcp-integration/README.md)

När du har slutfört denna modul, fortsätt till: [Modul 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->