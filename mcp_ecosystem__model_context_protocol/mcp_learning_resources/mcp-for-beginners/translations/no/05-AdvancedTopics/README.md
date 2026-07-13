# Avanserte emner i MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/no/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikk på bildet over for å se videoen av denne leksjonen)_

Dette kapitlet dekker en serie avanserte temaer i implementering av Model Context Protocol (MCP), inkludert multimodal integrasjon, skalerbarhet, sikkerhetsbeste praksis og bedriftsintegrasjon. Disse temaene er avgjørende for å bygge robuste og produksjonsklare MCP-applikasjoner som kan møte kravene til moderne AI-systemer.

## Oversikt

Denne leksjonen utforsker avanserte konsepter i implementeringen av Model Context Protocol, med fokus på multimodal integrasjon, skalerbarhet, sikkerhetsbeste praksis og bedriftsintegrasjon. Disse temaene er viktige for å bygge MCP-applikasjoner på produksjonsnivå som kan håndtere komplekse krav i bedriftsmiljøer.

> **Ser fremover:** flere av temaene nedenfor påvirkes av MCP-spesifikasjonskandidatversjonen `2026-07-28` — Root Contexts (5.4) og Sampling (5.6) bygger på primitiva som kandidatversjonen markerer som utdaterte, og den eksperimentelle Tasks-funksjonen som refereres til i Protocol Features (5.16) flyttes til en dedikert Tasks-utvidelse. Se [Hva endres i MCP: Kandidatversjon 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for detaljer.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- Implementere multimodale kapasiteter i MCP-rammeverk
- Designe skalerbare MCP-arkitekturer for krevende scenarier
- Anvende sikkerhetsbeste praksis i tråd med MCPs sikkerhetsprinsipper
- Integrere MCP med bedrifts-AI-systemer og rammeverk
- Optimalisere ytelse og pålitelighet i produksjonsmiljøer

## Leksjoner og eksempler

| Lenke | Tittel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integrasjon med Azure | Lær hvordan du integrerer din MCP-server på Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP multimodale eksempler  | Eksempler for lyd, bilde og multimodalt respons |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2-demo | Minimal Spring Boot-app som viser OAuth2 med MCP, både som autorisasjons- og ressurssserver. Demonstrerer sikker tokenutstedelse, beskyttede endepunkter, Azure Container Apps-deployering og API Management-integrasjon. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Rotkontekster  | Lær mer om rotkontekst og hvordan du implementerer dem |
| [5.5 Routing](./mcp-routing/README.md) | Ruting | Lær forskjellige typer ruting |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan du arbeider med sampling |
| [5.7 Scaling](./mcp-scaling/README.md) | Skalerbarhet  | Lær om skalering |
| [5.8 Security](./mcp-security/README.md) | Sikkerhet  | Sikre din MCP-server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Websøking MCP | Python MCP-server og klient integrert med SerpAPI for sanntidsweb, nyheter, produktsøk og Q&A. Demonstrerer flerverktøyorchestrering, ekstern API-integrasjon og robust feilbehandling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Sanntids datastrømming har blitt essensielt i dagens datadrevne verden, der bedrifter og applikasjoner krever umiddelbar tilgang til informasjon for å ta raske beslutninger. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Websøking | Sanntids websøk: hvordan MCP forvandler sanntids websøk ved å tilby en standardisert tilnærming til kontekststyring på tvers av AI-modeller, søkemotorer og applikasjoner.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID-autentisering | Microsoft Entra ID tilbyr en robust skybasert identitets- og tilgangsstyringsløsning, som bidrar til å sikre at kun autoriserte brukere og applikasjoner kan kommunisere med din MCP-server.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry-integrasjon | Lær hvordan du integrerer Model Context Protocol-servere med Microsoft Foundry-agenter, for å muliggjøre kraftig verktøyorchestrering og bedrifts-AI-funksjonalitet med standardiserte eksterne datakildekoblinger.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Konsteknikk | Fremtidige muligheter innen konsteknikk for MCP-servere, inkludert kontekstoptimalisering, dynamisk kontekststyring og strategier for effektiv prompt-engineering innen MCP-rammeverk.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Egendefinert transport | Lær hvordan du implementerer egendefinerte transportmekanismer for spesialiserte MCP-kommunikasjonsscenarier.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protokollfunksjoner | Mestre avanserte protokollfunksjoner inkludert fremdriftsvarsler, avbrytelse av forespørsler, ressurstemplater og feilbehandlingsmønstre.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Motstridende agenter | Bruk to agenter med motstridende posisjoner, som deler et enkelt MCP verktøysett, for å avdekke hallusinasjoner, avdekke grensetilfeller og produsere bedre kalibrerte output gjennom strukturert debatt.|

> **Ny i MCP-spesifikasjonen 2025-11-25**: Spesifikasjonen inkluderer nå eksperimentell støtte for **Tasks** (langvarige operasjoner med fremdriftssporing), **Tool Annotations** (metadata om verktøyatferd for sikkerhet), **URL Mode Elicitation** (forespørsel om spesifikt URL-innhold fra klienter), og forbedrede **Roots** (for arbeidsområde-kontekststyring). Se [MCP-spesifikasjonsendringer](https://spec.modelcontextprotocol.io/) for fullstendige detaljer.

## Ytterligere referanser

For mest oppdatert informasjon om avanserte MCP-temaer, se:
- [MCP-dokumentasjon](https://modelcontextprotocol.io/)
- [MCP-spesifikasjon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub-lager](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhetsrisikoer og tiltak
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening

## Viktige punkter

- Multimodale MCP-implementeringer utvider AI-kapasiteter utover tekstbehandling
- Skalerbarhet er avgjørende for bedriftsutrulling og kan adresseres gjennom horisontal og vertikal skalering
- Omfattende sikkerhetstiltak beskytter data og sikrer korrekt tilgangskontroll
- Bedriftsintegrasjon med plattformer som Azure OpenAI og Microsoft AI Foundry forbedrer MCP-kapasiteter
- Avanserte MCP-implementeringer drar nytte av optimaliserte arkitekturer og nøye ressursstyring

## Øvelse

Design en MCP-implementering på bedriftsskala for et spesifikt bruksområde:

1. Identifiser multimodale krav for ditt bruksområde
2. Skisser sikkerhetskontroller som trengs for å beskytte sensitiv data
3. Design en skalerbar arkitektur som kan håndtere varierende belastning
4. Planlegg integrasjonspunkter med bedrifts-AI-systemer
5. Dokumenter potensielle ytelsesflaskehalser og strategier for avbøtning

## Ytterligere ressurser

- [Azure OpenAI-dokumentasjon](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry-dokumentasjon](https://learn.microsoft.com/en-us/ai-services/)

---

## Hva er neste

Utforsk leksjonene i denne modulen med start: [5.1 MCP-integrasjon](./mcp-integration/README.md)

Når du har fullført denne modulen, fortsett til: [Modul 6: Fellesskapsbidrag](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->