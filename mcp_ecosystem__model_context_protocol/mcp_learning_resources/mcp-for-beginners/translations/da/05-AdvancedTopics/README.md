# Avancerede Emner i MCP

[![Avanceret MCP: Sikker, Skalerbar og Multi-modal AI-agenter](../../../translated_images/da/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

Dette kapitel dækker en række avancerede emner i Model Context Protocol (MCP) implementering, herunder multi-modal integration, skalerbarhed, bedste praksis for sikkerhed og virksomheds-integration. Disse emner er afgørende for at bygge robuste og produktionsklare MCP-applikationer, der kan imødekomme kravene fra moderne AI-systemer.

## Oversigt

Denne lektion udforsker avancerede koncepter i Model Context Protocol implementering med fokus på multi-modal integration, skalerbarhed, bedste praksis for sikkerhed og virksomheds-integration. Disse emner er vigtige for at bygge produktionsmodne MCP-applikationer, der kan håndtere komplekse krav i virksomhedsmiljøer.

> **Forudsigelse:** flere emner nedenfor er påvirket af `2026-07-28` MCP specifikations-release kandidat — Root Contexts (5.4) og Sampling (5.6) bygger på primitiv, som release kandidaten markerer som forældede, og den eksperimentelle Tasks-funktion, der refereres til i Protocol Features (5.16), flyttes til en dedikeret Tasks-udvidelse. Se [Hvad ændrer sig i MCP: 2026-07-28 Release Kandidat](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Læringsmål

Når denne lektion er færdig, vil du være i stand til at:

- Implementere multi-modale kapaciteter inden for MCP-rammer
- Designe skalerbare MCP-arkitekturer til scenarier med høj efterspørgsel
- Anvende bedste sikkerhedspraksis, der er i overensstemmelse med MCP's sikkerhedsprincipper
- Integrere MCP med virksomheds-AI-systemer og -rammer
- Optimere ydeevne og pålidelighed i produktionsmiljøer

## Lektioner og eksempelprojekter

| Link | Titel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integration med Azure](./mcp-integration/README.md) | Integration med Azure | Lær hvordan du integrerer din MCP Server på Azure |
| [5.2 Multi-modal eksempel](./mcp-multi-modality/README.md) | MCP Multi-modal eksempler | Eksempler til lyd, billede og multi-modal respons |
| [5.3 MCP OAuth2 eksempel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot-app der viser OAuth2 med MCP, både som Authorization og Resource Server. Demonstrerer sikker token-udstedelse, beskyttede endpoints, Azure Container Apps deployment og API Management integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Lær mere om root context og hvordan man implementerer dem (forældet i `2026-07-28` release kandidat; stadig gyldig for `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lær forskellige typer routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan man arbejder med sampling (forældet i `2026-07-28` release kandidat; stadig gyldig for `2025-11-25`) |
| [5.7 Skalering](./mcp-scaling/README.md) | Skalering | Lær om skalering |
| [5.8 Sikkerhed](./mcp-security/README.md) | Sikkerhed | Sikr din MCP Server |
| [5.9 Web Søgning eksempel](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server og klient der integrerer med SerpAPI for realtids web-, nyheds-, produkt-søgning og Q&A. Demonstrerer multi-værktøjs orkestrering, ekstern API-integration og robust fejlhåndtering. |
| [5.10 Realtids Streaming](./mcp-realtimestreaming/README.md) | Streaming | Realtids datastreaming er blevet essentielt i dagens datadrevne verden, hvor virksomheder og applikationer kræver øjeblikkelig adgang til information for at træffe rettidige beslutninger.|
| [5.11 Realtids Web Søgning](./mcp-realtimesearch/README.md) | Web Search | Realtids web søgning - hvordan MCP forvandler realtids web søgning ved at give en standardiseret tilgang til kontekststyring på tværs af AI-modeller, søgemaskiner og applikationer.| 
| [5.12 Entra ID-autentificering for Model Context Protocol-servere](./mcp-security-entra/README.md) | Entra ID-autentificering | Microsoft Entra ID giver en robust cloud-baseret identitets- og adgangsstyringsløsning, der hjælper med at sikre, at kun autoriserede brugere og applikationer kan interagere med din MCP-server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Lær hvordan man integrerer Model Context Protocol-servere med Microsoft Foundry-agenter, hvilket muliggør kraftfuld værktøjsorkestrering og virksomheds AI-muligheder med standardiserede forbindelser til eksterne datakilder.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Fremtidige muligheder for kontekstteknikker til MCP-servere, inklusive kontekstoptimering, dynamisk kontekststyring og strategier for effektiv prompt-udvikling inden for MCP-rammer.|
| [5.15 MCP Tilpasset Transport](./mcp-transport/README.md) | Tilpasset Transport | Lær hvordan man implementerer tilpassede transportmekanismer til specialiserede MCP-kommunikationsscenarier.|
| [5.16 Protokolfunktioner Dybtgående](./mcp-protocol-features/README.md) | Protokolfunktioner | Mestring af avancerede protokolfunktioner inklusive progressionsnotifikationer, anmodningsannullering, ressource-skabeloner og fejlbehandlingsmønstre.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agenter | Brug to agenter med modsatrettede positioner, der deler et enkelt MCP-værktøjssæt, for at fange hallucinationer, fremhæve kanttilfælde og producere bedre kalibrerede output gennem struktureret debat.|

> **Nyt i MCP Specificering 2025-11-25**: Specifikationen inkluderer nu eksperimentel support for **Tasks** (langvarige operationer med progressopfølgning), **Tool Annotations** (metadata om værktøjets adfærd for sikkerhed), **URL Mode Elicitation** (anmodning om specifikt URL-indhold fra klienter) og forbedrede **Roots** (til workspace kontekststyring). Se [MCP Specifikations Changelog](https://spec.modelcontextprotocol.io/) for fulde detaljer.

## Yderligere Referencer

For den mest opdaterede information om avancerede MCP-emner, se:
- [MCP Dokumentation](https://modelcontextprotocol.io/)
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhedsrisici og afbødninger
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning

## Vigtige Pointer

- Multi-modal MCP implementering udvider AI kapaciteter ud over tekstbehandling
- Skalerbarhed er essentielt for virksomhedsudrulninger og kan adresseres via horisontal og vertikal skalering
- Omfattende sikkerhedsforanstaltninger beskytter data og sikrer korrekt adgangskontrol
- Virksomhedsintegration med platforme som Azure OpenAI og Microsoft AI Foundry forbedrer MCP kapaciteter
- Avanceret MCP implementering drager fordel af optimerede arkitekturer og omhyggelig ressourcehåndtering

## Øvelse

Design en virksomheds-grad MCP implementering til en specifik anvendelsessag:

1. Identificer multi-modale krav til din anvendelsessag
2. Skitser de nødvendige sikkerhedskontroller til beskyttelse af følsomme data
3. Design en skalerbar arkitektur, der kan håndtere varierende belastning
4. Planlæg integrationspunkter med virksomheds-AI-systemer
5. Dokumenter potentielle performanceflaskehalse og strategier til afhjælpning

## Yderligere Ressourcer

- [Azure OpenAI Dokumentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Hvad er det næste

Udforsk lektionerne i denne modul startende med: [5.1 MCP Integration](./mcp-integration/README.md)

Når du har afsluttet dette modul, fortsæt til: [Modul 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->