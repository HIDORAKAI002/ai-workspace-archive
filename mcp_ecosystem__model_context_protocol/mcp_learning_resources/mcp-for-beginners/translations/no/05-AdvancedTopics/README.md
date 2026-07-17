# Avanserte Emner i MCP

[![Avansert MCP: Sikker, Skalerbar og Multimodal AI-agenter](../../../translated_images/no/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikk på bildet over for å se video av denne leksjonen)_

Dette kapitlet dekker en rekke avanserte emner i implementering av Model Context Protocol (MCP), inkludert multimodal integrasjon, skalerbarhet, sikkerhets beste praksis og bedriftsintegrasjon. Disse temaene er avgjørende for å bygge robuste og produksjonsklare MCP-applikasjoner som kan møte kravene til moderne AI-systemer.

## Oversikt

Denne leksjonen utforsker avanserte konsepter i implementering av Model Context Protocol, med fokus på multimodal integrasjon, skalerbarhet, sikkerhets beste praksis og bedriftsintegrasjon. Disse temaene er essensielle for å bygge produksjonsklare MCP-applikasjoner som kan håndtere komplekse krav i bedriftsmiljøer.

> **Ser fremover:** flere emner nedenfor påvirkes av `2026-07-28` MCP-spesifikasjonsutgivelses kandidat — Root Contexts (5.4) og Sampling (5.6) bygger på primitiver som utgivelseskandidaten merker som avviklet, og den eksperimentelle Tasks-funksjonen omtalt i Protocol Features (5.16) flyttes til en dedikert Tasks-utvidelse. Se [Hva endres i MCP: 2026-07-28 utgivelseskandidat](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Implementere multimodale funksjoner innen MCP-rammeverk
- Designe skalerbare MCP-arkitekturer for høy-etterspørsels scenarioer
- Anvende sikkerhets beste praksis i tråd med MCP sine sikkerhetsprinsipper
- Integrere MCP med bedrifts AI-systemer og rammeverk
- Optimalisere ytelse og pålitelighet i produksjonsmiljøer

## Leksjoner og Eksempelsprosjekter

| Lenke | Tittel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integrasjon med Azure](./mcp-integration/README.md) | Integrasjon med Azure | Lær hvordan du integrerer din MCP-server på Azure |
| [5.2 Multimodal eksempel](./mcp-multi-modality/README.md) | MCP Multimodale eksempler  | Eksempler for lyd, bilde og multimodale responser |
| [5.3 MCP OAuth2 eksempel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot-app som viser OAuth2 med MCP, både som autorisasjons- og ressursserver. Demonstrerer sikker tokenutstedelse, beskyttede endepunkter, Azure Container Apps-distribusjon og API Management-integrasjon. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts  | Lær mer om root context og hvordan implementere dem (utløpt i `2026-07-28` utgivelseskandidat; fortsatt gyldig for `2025-11-25`) |
| [5.5 Rutings](./mcp-routing/README.md) | Ruting | Lær om forskjellige typer ruting |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan du jobber med sampling (utløpt i `2026-07-28` utgivelseskandidat; fortsatt gyldig for `2025-11-25`) |
| [5.7 Skalering](./mcp-scaling/README.md) | Skalering  | Lær om skalering |
| [5.8 Sikkerhet](./mcp-security/README.md) | Sikkerhet  | Sikre din MCP-server |
| [5.9 Web Search eksempel](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server og klient som integrerer med SerpAPI for sanntids web-, nyhets-, produkt-søk og spørsmål & svar. Demonstrerer flerverktøy-orchestrasjon, ekstern API-integrasjon og robust feilhåndtering. |
| [5.10 Sanntidsstrømming](./mcp-realtimestreaming/README.md) | Strømming  | Sanntids datastreaming har blitt avgjørende i dagens datadrevne verden, hvor bedrifter og applikasjoner krever umiddelbar tilgang til informasjon for å ta raske beslutninger.|
| [5.11 Sanntids Web Search](./mcp-realtimesearch/README.md) | Web Search | Sanntids web-søk hvordan MCP transformerer sanntids websøk ved å tilby en standardisert tilnærming til kontekststyring på tvers av AI-modeller, søkemotorer og applikasjoner.| 
| [5.12 Entra ID-autentisering for Model Context Protocol-servere](./mcp-security-entra/README.md) | Entra ID-autentisering | Microsoft Entra ID tilbyr en robust skybasert identitets- og tilgangsstyringsløsning som hjelper med å sikre at kun autoriserte brukere og applikasjoner kan samhandle med din MCP-server.|
| [5.13 Microsoft Foundry Agent-integrasjon](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integrasjon | Lær hvordan du integrerer Model Context Protocol-servere med Microsoft Foundry-agenter, noe som muliggjør kraftig verktøyorchestrasjon og bedrifts AI-funksjonalitet med standardiserte tilkoblinger til eksterne datakilder.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | Fremtidige muligheter innen kontekstteknikker for MCP-servere, inkludert kontekstoptimalisering, dynamisk kontekststyring og strategier for effektiv promptutforming innen MCP-rammeverk.|
| [5.15 MCP Tilpasset Transport](./mcp-transport/README.md) | Tilpasset Transport | Lær hvordan du implementerer tilpassede transportmekanismer for spesialiserte MCP-kommunikasjonsscenarioer.|
| [5.16 Protokollfunksjoner Dypdykk](./mcp-protocol-features/README.md) | Protokollfunksjoner | Mestre avanserte protokollfunksjoner inkludert fremdriftsvarslinger, forespørselsavbestilling, ressursmaler og mønstre for feilhåndtering.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Bruk to agenter med motsatte posisjoner, som deler et enkelt MCP verktøysett, for å fange hallusinasjoner, avdekke kanttilfeller og produsere bedre kalibrerte resultater gjennom strukturert debatt.|

> **Nytt i MCP Spesifikasjon 2025-11-25**: Spesifikasjonen inkluderer nå eksperimentell støtte for **Tasks** (langsiktige operasjoner med fremdriftssporing), **Tool Annotations** (metadata om verktøyadferd for sikkerhet), **URL Mode Elicitation** (forespørsel om spesifikt URL-innhold fra klienter), og forbedrede **Roots** (for arbeidsområde-kontekststyring). Se [MCP Spesifikasjon endringslogg](https://spec.modelcontextprotocol.io/) for fullstendige detaljer.

## Ytterligere Referanser

For den mest oppdaterte informasjonen om avanserte MCP-emner, se:
- [MCP Dokumentasjon](https://modelcontextprotocol.io/)
- [MCP Spesifikasjon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Topp 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhetsrisikoer og mottiltak
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening

## Nøkkelpunkter

- Multimodale MCP-implementasjoner utvider AI-kapasiteter utover tekstbehandling
- Skalerbarhet er essensielt for bedriftsdistribusjoner og kan håndteres gjennom horisontal og vertikal skalering
- Omfattende sikkerhetstiltak beskytter data og sikrer korrekt tilgangskontroll
- Bedriftsintegrasjon med plattformer som Azure OpenAI og Microsoft AI Foundry forbedrer MCP-kapasiteter
- Avanserte MCP-implementasjoner drar nytte av optimaliserte arkitekturer og nøye ressursstyring

## Øvelse

Design en MCP-implementasjon på bedriftsnivå for en spesifikk brukstilfelle:

1. Identifiser multimodale krav for ditt brukstilfelle
2. Skisser de sikkerhetskontroller som trengs for å beskytte sensitiv data
3. Design en skalerbar arkitektur som kan håndtere varierende belastning
4. Planlegg integrasjonspunkter med bedrifts AI-systemer
5. Dokumenter potensielle ytelsesflaskehalser og strategier for å håndtere dem

## Ytterligere Ressurser

- [Azure OpenAI Dokumentasjon](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokumentasjon](https://learn.microsoft.com/en-us/ai-services/)

---

## Hva nå

Utforsk leksjonene i denne modulen med start: [5.1 MCP Integrasjon](./mcp-integration/README.md)

Når du er ferdig med denne modulen, fortsett til: [Modul 6: Fellesskapsbidrag](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->