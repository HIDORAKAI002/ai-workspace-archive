# Gevorderde Onderwerpen in MCP

[![Gevorderd MCP: Veilige, schaalbare en multimodale AI-agenten](../../../translated_images/nl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Dit hoofdstuk behandelt een reeks gevorderde onderwerpen in de implementatie van Model Context Protocol (MCP), waaronder multimodale integratie, schaalbaarheid, beveiligingsbest practices en integratie in ondernemingen. Deze onderwerpen zijn cruciaal voor het bouwen van robuuste en productieklare MCP-toepassingen die voldoen aan de eisen van moderne AI-systemen.

## Overzicht

Deze les verkent gevorderde concepten in de implementatie van het Model Context Protocol, met de nadruk op multimodale integratie, schaalbaarheid, beveiligingsbest practices en integratie in ondernemingen. Deze onderwerpen zijn essentieel voor het bouwen van productieklare MCP-toepassingen die complexe vereisten in zakelijke omgevingen aankunnen.

> **Vooruitblik:** verschillende onderwerpen hieronder worden beïnvloed door de `2026-07-28` MCP specificatie release candidate — Root Contexts (5.4) en Sampling (5.6) zijn gebaseerd op primitieve elementen die de release candidate als verouderd markeert, en de experimentele Taken-functie die wordt genoemd bij Protocol Features (5.16) verhuist naar een speciale Taken-extensie. Zie [Wat verandert er in MCP: De 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) voor details.

## Leerdoelen

Aan het eind van deze les kun je:

- Multimodale mogelijkheden binnen MCP-frameworks implementeren
- Schaalbare MCP-architecturen ontwerpen voor scenario's met hoge vraag
- Beveiligingsbest practices toepassen die aansluiten bij de beveiligingsprincipes van MCP
- MCP integreren met zakelijke AI-systemen en frameworks
- Prestaties en betrouwbaarheid optimaliseren in productieomgevingen

## Lessen en voorbeeldprojecten

| Link | Titel | Beschrijving |
|------|-------|-------------|
| [5.1 Integratie met Azure](./mcp-integration/README.md) | Integreren met Azure | Leer hoe je jouw MCP-server integreert op Azure |
| [5.2 Multimodaal voorbeeld](./mcp-multi-modality/README.md) | MCP multimodale voorbeelden | Voorbeelden voor audio, beeld en multimodale respons |
| [5.3 MCP OAuth2 voorbeeld](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimale Spring Boot-app die OAuth2 met MCP toont, zowel als Autorisatie- als Resource Server. Demonstreert veilige tokenuitgifte, beveiligde endpoints, Azure Container Apps deployment, en API Management integratie. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexten | Leer meer over root contexten en hoe je deze implementeert |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Leer verschillende soorten routing kennen |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Leer hoe je met sampling werkt |
| [5.7 Scaling](./mcp-scaling/README.md) | Schalen | Leer over schalen |
| [5.8 Security](./mcp-security/README.md) | Beveiliging | Beveilig je MCP-server |
| [5.9 Web Search voorbeeld](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server en client die integreert met SerpAPI voor real-time web-, nieuws-, productzoekopdrachten en Q&A. Demonstreert multi-tool orchestratie, integratie van externe API's en robuuste foutafhandeling. |
| [5.10 Real-time Streaming](./mcp-realtimestreaming/README.md) | Streaming | Real-time datastreaming is essentieel geworden in de hedendaagse data-gedreven wereld, waar bedrijven en applicaties onmiddellijke toegang tot informatie nodig hebben om tijdige beslissingen te nemen. |
| [5.11 Real-time Web Search](./mcp-realtimesearch/README.md) | Web Search | Real-time webzoekopdrachten: hoe MCP real-time webzoekopdrachten transformeert door een gestandaardiseerde aanpak van contextbeheer tussen AI-modellen, zoekmachines en applicaties te bieden. |
| [5.12 Entra ID Authenticatie voor Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authenticatie | Microsoft Entra ID biedt een robuuste cloudgebaseerde identiteit- en toegangsbeheeroplossing, die helpt te waarborgen dat alleen bevoegde gebruikers en applicaties met jouw MCP-server kunnen communiceren. |
| [5.13 Microsoft Foundry Agent Integratie](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integratie | Leer hoe je Model Context Protocol-servers integreert met Microsoft Foundry-agenten, waardoor krachtige toolorchestratie en zakelijke AI-mogelijkheden met gestandaardiseerde externe databronverbindingen mogelijk worden. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | De toekomstige kansen van context engineering technieken voor MCP-servers, inclusief contextoptimalisatie, dynamisch contextbeheer, en strategieën voor effectieve promptengineering binnen MCP-frameworks. |
| [5.15 MCP Aangepast Transport](./mcp-transport/README.md) | Aangepast Transport | Leer hoe je aangepaste transportmechanismen implementeert voor gespecialiseerde MCP-communicatiescenario's. |
| [5.16 Protocol Features Diepgaande Analyse](./mcp-protocol-features/README.md) | Protocol Features | Beheers geavanceerde protocolfuncties waaronder voortgangsnotificaties, verzoekannulering, resourcetemplates en foutafhandelingspatronen. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Gebruik twee agenten met tegengestelde standpunten, die een enkele MCP toolset delen, om hallucinaties te detecteren, randgevallen bloot te leggen en beter gekalibreerde outputs te produceren via een gestructureerd debat. |

> **Nieuw in MCP Specificatie 2025-11-25**: De specificatie bevat nu experimentele ondersteuning voor **Taken** (langdurige operaties met voortgangsmonitoring), **Toolannotaties** (metadata over toolgedrag voor veiligheid), **URL Mode Elicitation** (het verzoeken van specifieke URL-inhoud van clients), en uitgebreide **Roots** (voor werkruimtecontextbeheer). Zie de [MCP Specificatie wijzigingslog](https://spec.modelcontextprotocol.io/) voor volledige details.

## Aanvullende Verwijzingen

Voor de meest actuele informatie over gevorderde MCP-onderwerpen, raadpleeg:
- [MCP Documentatie](https://modelcontextprotocol.io/)
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Beveiligingsrisico's en mitigaties
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining

## Belangrijke Leerpunten

- Multimodale MCP-implementaties breiden AI-mogelijkheden uit voorbij tekstverwerking
- Schaalbaarheid is essentieel voor bedrijfsimplementaties en kan worden bereikt door horizontale en verticale schaalvergroting
- Omvattende beveiligingsmaatregelen beschermen data en zorgen voor correcte toegangscontrole
- Integratie met platforms zoals Azure OpenAI en Microsoft AI Foundry versterkt MCP-capaciteiten
- Geavanceerde MCP-implementaties profiteren van geoptimaliseerde architecturen en zorgvuldig resourcebeheer

## Oefening

Ontwerp een MCP-implementatie op bedrijfsniveau voor een specifieke use case:

1. Identificeer multimodale vereisten voor jouw use case
2. Omschrijf de beveiligingsmaatregelen die nodig zijn om gevoelige data te beschermen
3. Ontwerp een schaalbare architectuur die om kan gaan met wisselende belasting
4. Plan integratiepunten met zakelijke AI-systemen
5. Documenteer mogelijke prestatieknelpunten en mitigatiestrategieën

## Aanvullende Bronnen

- [Azure OpenAI Documentatie](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentatie](https://learn.microsoft.com/en-us/ai-services/)

---

## Wat nu?

Verken de lessen in deze module te beginnen met: [5.1 MCP Integratie](./mcp-integration/README.md)

Als je deze module hebt afgerond, ga verder naar: [Module 6: Gemeenschapsbijdragen](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->