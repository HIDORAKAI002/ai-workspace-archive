# Gevorderde Onderwerpen in MCP

[![Gevorderde MCP: Veilige, Schaalbare en Multi-modale AI Agents](../../../translated_images/nl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Dit hoofdstuk behandelt een reeks geavanceerde onderwerpen in de implementatie van het Model Context Protocol (MCP), waaronder multi-modale integratie, schaalbaarheid, beveiligingsbest practices en integratie in ondernemingen. Deze onderwerpen zijn cruciaal voor het bouwen van robuuste en productieklare MCP-toepassingen die kunnen voldoen aan de eisen van moderne AI-systemen.

## Overzicht

Deze les verkent geavanceerde concepten in de implementatie van het Model Context Protocol, met focus op multi-modale integratie, schaalbaarheid, beveiligingsbest practices en integratie in ondernemingen. Deze onderwerpen zijn essentieel voor het bouwen van productieklare MCP-toepassingen die complexe vereisten in bedrijfsomgevingen aankunnen.

> **Vooruitkijkend:** verschillende onderwerpen hieronder worden beïnvloed door de `2026-07-28` MCP-specificatie release candidate — Root Contexts (5.4) en Sampling (5.6) zijn gebaseerd op primitieve elementen die de release candidate als verouderd markeert, en de experimentele Tasks-functie genoemd in Protocol Features (5.16) verhuist naar een speciale Tasks extensie. Zie [Wat verandert er in MCP: De 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) voor details.

## Leerdoelen

Aan het einde van deze les zul je in staat zijn om:

- Multi-modale mogelijkheden binnen MCP-frameworks te implementeren
- Schaalbare MCP-architecturen te ontwerpen voor scenario's met hoge vraag
- Beveiligingsbest practices toe te passen die aansluiten bij de beveiligingsprincipes van MCP
- MCP te integreren met enterprise AI-systemen en frameworks
- Prestaties en betrouwbaarheid in productieomgevingen te optimaliseren

## Lessen en voorbeeldprojecten

| Link | Titel | Beschrijving |
|------|-------|-------------|
| [5.1 Integratie met Azure](./mcp-integration/README.md) | Integratie met Azure | Leer hoe je je MCP-server op Azure integreert |
| [5.2 Multi modale voorbeelden](./mcp-multi-modality/README.md) | MCP Multi modale voorbeelden | Voorbeelden voor audio, beeld en multi modale respons |
| [5.3 MCP OAuth2 voorbeeld](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimale Spring Boot-app die OAuth2 met MCP toont, zowel als Authorization als Resource Server. Demonstreert veilige tokenuitgifte, beveiligde eindpunten, Azure Container Apps deployment en API Management integratie. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root contexts | Leer meer over root context en hoe deze te implementeren (verouderd in `2026-07-28` release candidate; nog geldig voor `2025-11-25`) |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Leer verschillende soorten routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Leer hoe je met sampling werkt (verouderd in `2026-07-28` release candidate; nog geldig voor `2025-11-25`) |
| [5.7 Schaling](./mcp-scaling/README.md) | Schaling | Leer over schaling |
| [5.8 Beveiliging](./mcp-security/README.md) | Beveiliging | Beveilig je MCP-server |
| [5.9 Webzoekvoorbeeld MCP](./web-search-mcp/README.md) | Webzoek MCP | Python MCP-server en cliënt die integreert met SerpAPI voor realtime web-, nieuws-, productzoekopdrachten en Q&A. Demonstreert multi-tool orkestratie, externe API-integratie en robuuste foutafhandeling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | Realtime datastreaming is essentieel geworden in de data-gedreven wereld van vandaag, waar bedrijven en applicaties directe toegang tot informatie nodig hebben om tijdige beslissingen te nemen. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Websearch | Realtime webzoekopdrachten: hoe MCP realtime webzoekopdrachten transformeert door een gestandaardiseerde aanpak te bieden voor contextbeheer over AI-modellen, zoekmachines en applicaties. | 
| [5.12 Entra ID Authenticatie voor Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authenticatie | Microsoft Entra ID biedt een robuuste cloudgebaseerde identiteits- en toegangsbeheeroplossing, die ervoor zorgt dat alleen geautoriseerde gebruikers en applicaties met je MCP-server kunnen communiceren. |
| [5.13 Microsoft Foundry Agent Integratie](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integratie | Leer hoe je MCP-servers integreert met Microsoft Foundry-agenten, wat krachtige toolorkestratie en enterprise AI-mogelijkheden mogelijk maakt met gestandaardiseerde verbindingen naar externe databronnen. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | De toekomstige mogelijkheden van context engineering technieken voor MCP servers, inclusief contextoptimalisatie, dynamisch contextbeheer en strategieën voor effectieve prompt engineering binnen MCP-frameworks. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Leer hoe je aangepaste transportmechanismen implementeert voor gespecialiseerde MCP-communicatiescenario's. |
| [5.16 Protocol Features Diepgaande Verkenning](./mcp-protocol-features/README.md) | Protocol Features | Beheers geavanceerde protocolfuncties, inclusief voortgangsnotificaties, annulering van verzoeken, resourcetemplates en foutafhandelingspatronen. |
| [5.17 Adversarial Multi-Agent Redenering](./mcp-adversarial-agents/README.md) | Adversariele Agents | Gebruik twee agents met tegengestelde standpunten, die een enkele MCP-toolset delen, om hallucinaties op te sporen, randgevallen te identificeren en beter gekalibreerde uitkomsten te produceren via gestructureerd debat. |

> **Nieuw in MCP-specificatie 2025-11-25**: De specificatie bevat nu experimentele ondersteuning voor **Tasks** (langdurige operaties met voortgangsbewaking), **Tool Annotaties** (metadata over toolgedrag voor veiligheid), **URL Mode Elicitation** (het opvragen van specifieke URL-inhoud van cliënten) en verbeterde **Roots** (voor workspace contextbeheer). Zie de [MCP Specificatie changelog](https://spec.modelcontextprotocol.io/) voor volledige details.

## Aanvullende Referenties

Voor de meest actuele informatie over gevorderde MCP-onderwerpen, verwijzen we naar:
- [MCP Documentatie](https://modelcontextprotocol.io/)
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Beveiligingsrisico's en mitigaties
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining

## Belangrijkste Leerpunten

- Multi-modale MCP-implementaties breiden AI-mogelijkheden uit voorbij tekstverwerking
- Schaalbaarheid is essentieel voor bedrijfsuitrol en kan worden aangepakt door horizontale en verticale schaalvergroting
- Uitgebreide beveiligingsmaatregelen beschermen data en waarborgen correcte toegangscontrole
- Integratie met platforms zoals Azure OpenAI en Microsoft AI Foundry versterkt MCP-capaciteiten
- Geavanceerde MCP-implementaties profiteren van geoptimaliseerde architecturen en zorgvuldig resourcebeheer

## Oefening

Ontwerp een MCP-implementatie van bedrijfsniveau voor een specifieke use case:

1. Identificeer multi-modale vereisten voor je use case
2. Schets de beveiligingscontroles die nodig zijn om gevoelige data te beschermen
3. Ontwerp een schaalbare architectuur die verschillende belastingen aankan
4. Plan integratiepunten met enterprise AI-systemen
5. Documenteer potentiële prestatieknelpunten en mitigatiestrategieën

## Aanvullende Bronnen

- [Azure OpenAI Documentatie](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentatie](https://learn.microsoft.com/en-us/ai-services/)

---

## Wat nu

Verken de lessen in deze module te beginnen met: [5.1 MCP Integratie](./mcp-integration/README.md)

Zodra je deze module hebt afgerond, ga door naar: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->