# Avanserte emner i MCP

[![Avansert MCP: Sikker, skalerbar og multimodal AI-agenter](../../../translated_images/no/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klikk på bildet over for å se video av denne leksjonen)_

Dette kapittelet omhandler en rekke avanserte emner i implementering av Model Context Protocol (MCP), inkludert multimodal integrasjon, skalerbarhet, sikkerhets beste praksis og bedriftsintegrasjon. Disse emnene er avgjørende for å bygge robuste og produksjonsklare MCP-applikasjoner som kan møte kravene i moderne AI-systemer.

## Oversikt

Denne leksjonen utforsker avanserte konsepter i implementering av Model Context Protocol, med fokus på multimodal integrasjon, skalerbarhet, sikkerhets beste praksis og bedriftsintegrasjon. Disse emnene er essensielle for å bygge produksjonsklasse MCP-applikasjoner som kan håndtere komplekse krav i bedriftsmiljøer.

## Læringsmål

Etter denne leksjonen vil du kunne:

- Implementere multimodale egenskaper innen MCP-rammeverk
- Designe skalerbare MCP-arkitekturer for scenarioer med høyt krav
- Anvende sikkerhets beste praksis i tråd med MCPs sikkerhetsprinsipper
- Integrere MCP med bedrifts-AI-systemer og -rammeverk
- Optimalisere ytelse og pålitelighet i produksjonsmiljøer

## Leksjoner og eksempelprosjekter

| Lenke | Tittel | Beskrivelse |
|------|-------|-------------|
| [5.1 Integrasjon med Azure](./mcp-integration/README.md) | Integrer med Azure | Lær hvordan du integrerer din MCP Server på Azure |
| [5.2 Multimodal eksempel](./mcp-multi-modality/README.md) | MCP Multimodale eksempler  | Eksempler for lyd, bilde og multimodal respons |
| [5.3 MCP OAuth2 eksempel](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimal Spring Boot-app som viser OAuth2 med MCP, både som Autorisasjons- og Ressursserver. Demonstrerer sikker tokenutstedelse, beskyttede endepunkter, Azure Container Apps-distribusjon og API Management-integrasjon. |
| [5.4 Rotkontekster](./mcp-root-contexts/README.md) | Rotkontekster  | Lær mer om rotkontekst og hvordan du implementerer dem |
| [5.5 Rutings](./mcp-routing/README.md) | Rutings | Lær om forskjellige typer ruting |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Lær hvordan du arbeider med sampling |
| [5.7 Skalering](./mcp-scaling/README.md) | Skalering  | Lær om skalering |
| [5.8 Sikkerhet](./mcp-security/README.md) | Sikkerhet  | Sikre din MCP-server |
| [5.9 Websøkesample](./web-search-mcp/README.md) | Websøking MCP | Python MCP-server og klient som integrerer med SerpAPI for sanntids websøk, nyheter, produktsøk og spørsmål & svar. Demonstrerer flerverktøy orkestrasjon, ekstern API-integrasjon og robust feilhåndtering. |
| [5.10 Sanntidsstrømming](./mcp-realtimestreaming/README.md) | Strømming  | Sanntids datastreaming har blitt essensielt i dagens datadrevne verden, der virksomheter og apper krever umiddelbar tilgang til informasjon for å ta tidsriktige beslutninger. |
| [5.11 Sanntids websøk](./mcp-realtimesearch/README.md) | Websøking | Sanntids websøk: hvordan MCP forvandler sanntids websøk ved å tilby en standardisert tilnærming til kontekststyring på tvers av AI-modeller, søkemotorer og apper. | 
| [5.12 Entra ID-autentisering for Model Context Protocol-servere](./mcp-security-entra/README.md) | Entra ID-autentisering | Microsoft Entra ID tilbyr en robust skybasert identitets- og tilgangsstyringsløsning som bidrar til å sikre at kun autoriserte brukere og apper kan samhandle med din MCP-server. |
| [5.13 Microsoft Foundry Agent-integrasjon](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry-integrasjon | Lær hvordan du integrerer Model Context Protocol-servere med Microsoft Foundry-agenter, noe som muliggjør kraftig verktøyorkestrasjon og bedrifts-AI-muligheter med standardiserte forbindelser til eksterne datakilder. |
| [5.14 Kontekstingeniørkunst](./mcp-contextengineering/README.md) | Kontekstingeniørkunst | Fremtidige muligheter innen kontekstingeniørkunst for MCP-servere, inkludert kontekstoptimalisering, dynamisk kontekststyring og strategier for effektiv prompt-ingeniørkunst innen MCP-rammeverk. |
| [5.15 MCP egendefinert transport](./mcp-transport/README.md) | Egendefinert transport | Lær hvordan du implementerer egendefinerte transportmekanismer for spesialiserte MCP-kommunikasjonsscenarier. |
| [5.16 Dypdykk i protokollfunksjoner](./mcp-protocol-features/README.md) | Protokollfunksjoner | Mestre avanserte protokollfunksjoner inkludert progresjonsvarsler, forespørselsavbrytelser, ressursmaler og feilbehandlingsmønstre. |
| [5.17 Adversarial multi-agent resonnering](./mcp-adversarial-agents/README.md) | Adversarielle agenter | Bruk to agenter med motstridende posisjoner, som deler et enkelt MCP verktøysett, for å fange halusinasjoner, avdekke ytterpunkter og produsere bedre kalibrerte resultater gjennom strukturert debatt. |

> **Ny i MCP-spesifikasjonen 2025-11-25**: Spesifikasjonen inkluderer nå eksperimentell støtte for **Oppgaver** (langvarige operasjoner med fremdriftssporing), **Verktøyannotasjoner** (metainformasjon om verktøyadferd for sikkerhet), **URL-modus Elicitering** (forespørsel om spesifikt URL-innhold fra klienter), og utvidede **Røtter** (for arbeidsromskontekststyring). Se [MCP Specification changelog](https://spec.modelcontextprotocol.io/) for fullstendige detaljer.

## Ytterligere referanser

For oppdatert informasjon om avanserte MCP-emner, se:
- [MCP-dokumentasjon](https://modelcontextprotocol.io/)
- [MCP-spesifikasjon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Topp 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Sikkerhetsrisikoer og mottiltak
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening

## Viktige punkter

- Multimodale MCP-implementasjoner utvider AI-kapasiteter utover tekstbehandling
- Skalerbarhet er avgjørende for bedriftsdistribusjoner og kan adresseres gjennom horisontal og vertikal skalering
- Omfattende sikkerhetstiltak beskytter data og sikrer riktig tilgangskontroll
- Bedriftsintegrasjon med plattformer som Azure OpenAI og Microsoft AI Foundry styrker MCP-kapasiteter
- Avanserte MCP-implementasjoner drar nytte av optimaliserte arkitekturer og nøye ressursstyring

## Øvelse

Design en MCP-implementering av bedriftsklasse for et spesifikt brukstilfelle:

1. Identifiser multimodale krav for ditt brukstilfelle
2. Skisser sikkerhetskontroller nødvendige for å beskytte sensitive data
3. Design en skalerbar arkitektur som kan håndtere varierende belastning
4. Planlegg integrasjonspunkter med bedrifts-AI-systemer
5. Dokumenter potensielle ytelsesflaskehalser og mottiltak

## Ekstra ressurser

- [Azure OpenAI-dokumentasjon](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry-dokumentasjon](https://learn.microsoft.com/en-us/ai-services/)

---

## Hva kommer nå

Utforsk leksjonene i denne modulen, start med: [5.1 MCP-integrasjon](./mcp-integration/README.md)

Når du har fullført denne modulen, fortsett til: [Modul 6: Fellesskapsbidrag](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->