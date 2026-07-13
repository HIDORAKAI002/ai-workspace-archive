# Avancerede emner i MCP

[![Avanceret MCP: Sikker, skalerbar og multimodal AI-agenter](../../../translated_images/da/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

Dette kapitel dækker en række avancerede emner i implementeringen af Model Context Protocol (MCP), herunder multimodal integration, skalerbarhed, sikkerhedspraksis og virksomhedsintegration. Disse emner er afgørende for at opbygge robuste og produktionsklare MCP-applikationer, der kan imødekomme kravene i moderne AI-systemer.

## Oversigt

Denne lektion udforsker avancerede koncepter i implementeringen af Model Context Protocol med fokus på multimodal integration, skalerbarhed, sikkerhedspraksis og virksomhedsintegration. Disse emner er nødvendige for at opbygge produktionsklare MCP-applikationer, der kan håndtere komplekse krav i virksomheds­miljøer.

> **Ser fremad:** flere af de nedenstående emner berøres af MCP specifikationsudgivelseskandidaten `2026-07-28` — Root Contexts (5.4) og Sampling (5.6) bygger på primitive elementer, som udgivelseskandidaten markerer som forældede, og den eksperimentelle Tasks-funktion, der omtales i Protocol Features (5.16), flyttes til en dedikeret Tasks-udvidelse. Se [Hvad ændres i MCP: Udgivelseskandidaten 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Læringsmål

Når du har gennemført denne lektion, vil du kunne:

- Implementere multimodale muligheder inden for MCP-rammer
- Designe skalerbare MCP-arkitekturer til scenarier med høje krav
- Anvende sikkerhedspraksis i overensstemmelse med MCP's sikkerhedsprincipper
- Integrere MCP med virksomheders AI-systemer og -rammer
- Optimere ydeevne og pålidelighed i produktionsmiljøer

## Lektioner og eksempler på projekter

| Link | Titel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integration med Azure](./mcp-integration/README.md) | Integrer med Azure | Lær hvordan du integrerer din MCP Server på Azure |
| [5.2 Multimodal eksempel](./mcp-multi-modality/README.md) | MCP multimodale eksempler  | Eksempler på lyd, billede og multimodale svar |
| [5.3 MCP OAuth2 eksempel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot-app, der viser OAuth2 med MCP, både som autorisations- og ressourcestyring. Demonstrerer sikker token-udstedelse, beskyttede endpoints, Azure Container Apps-udrulning og API Management-integration. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Lær mere om root context og hvordan man implementerer dem |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Lær om forskellige typer routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan man arbejder med sampling |
| [5.7 Skalering](./mcp-scaling/README.md) | Skalering  | Lær om skalering |
| [5.8 Sikkerhed](./mcp-security/README.md) | Sikkerhed  | Sikr din MCP Server |
| [5.9 Web Search eksempel](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server og klient, der integrerer med SerpAPI for realtidssøgning på web, nyheder, produkt og Q&A. Demonstrerer orkestrering af flere værktøjer, ekstern API-integration og robust fejlhåndtering. |
| [5.10 Realtids-streaming](./mcp-realtimestreaming/README.md) | Streaming  | Realtids datastreaming er blevet essentiel i nutidens datadrevne verden, hvor virksomheder og applikationer har brug for øjeblikkelig adgang til information for at kunne træffe rettidige beslutninger.|
| [5.11 Realtids-websøgning](./mcp-realtimesearch/README.md) | Web Search | Realtids-websøgning: hvordan MCP transformerer realtids-websøgning ved at tilbyde en standardiseret tilgang til kontekststyring på tværs af AI-modeller, søgemaskiner og applikationer.| 
| [5.12 Entra ID autentifikation til Model Context Protocol-servere](./mcp-security-entra/README.md) | Entra ID autentifikation | Microsoft Entra ID leverer en robust cloud-baseret identitets- og adgangsstyringsløsning, som hjælper med at sikre, at kun autoriserede brugere og applikationer kan interagere med din MCP-server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integration | Lær hvordan man integrerer Model Context Protocol-servere med Microsoft Foundry-agenter, hvilket muliggør kraftfuld værktøjs-orkestrering og virksomheds-AI-funktionaliteter med standardiserede eksterne datakildeforbindelser.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Fremtidige muligheder for kontekstteknikker til MCP-servere, herunder kontekstoptimering, dynamisk kontekststyring og strategier for effektiv prompt engineering inden for MCP-rammer.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Lær hvordan man implementerer brugerdefinerede transportmekanismer til specialiserede MCP-kommunikationsscenarier.|
| [5.16 Dyk ned i protokolfunktioner](./mcp-protocol-features/README.md) | Protocol Features | Mestring af avancerede protokolfunktioner inklusiv progress-notifikationer, anmodningsannullering, ressourcetemplates og fejlhåndteringsmønstre.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Brug to agenter med modstridende positioner, der deler et enkelt MCP-værktøjssæt, for at opdage hallucinationer, afdække kanttilfælde og producere bedre kalibrerede outputs gennem struktureret debat.|

> **Nyt i MCP Specifikation 2025-11-25**: Specifikationen inkluderer nu eksperimentel støtte for **Tasks** (langvarende operationer med statusopfølgning), **Tool Annotations** (metadata om værktøjers adfærd for sikkerhed), **URL Mode Elicitation** (anmodning om specifikt URL-indhold fra klienter) og forbedrede **Roots** (til workspace-kontekststyring). Se [MCP Specifikations ændringslog](https://spec.modelcontextprotocol.io/) for fulde detaljer.

## Yderligere referencer

For den mest opdaterede information om avancerede MCP-emner, se:
- [MCP Dokumentation](https://modelcontextprotocol.io/)
- [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhedsrisici og -afværgning
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning

## Vigtige pointer

- Multimodale MCP-implementeringer udvider AI-kapaciteter udover tekstbehandling
- Skalerbarhed er afgørende for virksomhedsuplementering og kan løses gennem horisontal og vertikal skalering
- Omfattende sikkerhedsforanstaltninger beskytter data og sikrer korrekt adgangskontrol
- Virksomhedsintegration med platforme som Azure OpenAI og Microsoft AI Foundry forbedrer MCP-funktionaliteter
- Avancerede MCP-implementeringer drager fordel af optimerede arkitekturer og omhyggelig ressourcehåndtering

## Øvelse

Design en MCP-implementering i virksomhedsklasse til et specifikt brugstilfælde:

1. Identificer multimodale krav til dit brugstilfælde
2. Skitser de nødvendige sikkerhedskontroller for at beskytte følsomme data
3. Design en skalerbar arkitektur, der kan håndtere varierende belastning
4. Planlæg integrationspunkter med virksomheders AI-systemer
5. Dokumenter potentielle performance-flaskehalse og afhjælpningsstrategier

## Yderligere ressourcer

- [Azure OpenAI Dokumentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentation](https://learn.microsoft.com/en-us/ai-services/)

---

## Hvad så nu

Udforsk lektionerne i dette modul med start fra: [5.1 MCP Integration](./mcp-integration/README.md)

Når du har gennemført dette modul, fortsæt til: [Modul 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->