# Gevorderde Onderwerpen in MCP

[![Geavanceerde MCP: Veilige, schaalbare en multimodale AI-agenten](../../../translated_images/nl/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Klik op de bovenstaande afbeelding om de video van deze les te bekijken)_

Dit hoofdstuk behandelt een reeks gevorderde onderwerpen in de implementatie van het Model Context Protocol (MCP), waaronder multimodale integratie, schaalbaarheid, best practices voor beveiliging en integratie in ondernemingen. Deze onderwerpen zijn cruciaal voor het bouwen van robuuste en productieklare MCP-toepassingen die kunnen voldoen aan de eisen van moderne AI-systemen.

## Overzicht

Deze les verkent geavanceerde concepten in de implementatie van het Model Context Protocol, met de focus op multimodale integratie, schaalbaarheid, best practices voor beveiliging en integratie in ondernemingen. Deze onderwerpen zijn essentieel voor het bouwen van MCP-toepassingen van productieniveau die complexe eisen in bedrijfsomgevingen aankunnen.

## Leerdoelen

Aan het einde van deze les kun je:

- Multimodale mogelijkheden binnen MCP-frameworks implementeren
- Schaalbare MCP-architecturen ontwerpen voor scenario's met hoge vraag
- Beveiligingsbest practices toepassen in overeenstemming met de beveiligingsprincipes van MCP
- MCP integreren met AI-systemen en frameworks binnen ondernemingen
- Prestaties en betrouwbaarheid optimaliseren in productieomgevingen

## Lessen en voorbeeldprojecten

| Link | Titel | Beschrijving |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integreren met Azure | Leer hoe je jouw MCP-server op Azure integreert |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP multimodale voorbeelden  | Voorbeelden voor audio, beeld en multimodale respons |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | Minimale Spring Boot-app die OAuth2 met MCP toont, zowel als Authorization als Resource Server. Demonstreert veilige tokenuitgifte, beveiligde eindpunten, Azure Container Apps-deployment en API Management-integratie. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Root-contexts  | Leer meer over root-context en hoe je deze implementeert |
| [5.5 Routing](./mcp-routing/README.md) | Routing | Leer over verschillende soorten routing |
| [5.6 Sampling](./mcp-sampling/README.md) | Sampling | Leer hoe je met sampling werkt |
| [5.7 Scaling](./mcp-scaling/README.md) | Schalen  | Leer over schalen |
| [5.8 Security](./mcp-security/README.md) | Beveiliging  | Beveilig je MCP-server |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web Search MCP | Python MCP-server en cliënt die integreert met SerpAPI voor realtime web-, nieuws-, productzoekopdrachten en Q&A. Demonstreert multi-tool orchestratie, externe API-integratie en robuuste foutafhandeling. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming  | Realtime datastreaming is essentieel geworden in de hedendaagse datagedreven wereld, waar bedrijven en applicaties onmiddellijke toegang tot informatie nodig hebben voor tijdige beslissingen.|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web Search | Realtime webzoekopdrachten hoe MCP realtime webzoekopdrachten transformeert door een gestandaardiseerde aanpak te bieden voor contextbeheer over AI-modellen, zoekmachines en applicaties heen.| 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID Authenticatie | Microsoft Entra ID biedt een robuuste cloudgebaseerde identiteit- en toegangsbeheeroplossing, die helpt te waarborgen dat alleen geautoriseerde gebruikers en applicaties met jouw MCP-server kunnen communiceren.|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Integratie | Leer hoe je Model Context Protocol-servers integreert met Microsoft Foundry-agenten, wat krachtige toolorchestration en enterprise AI-mogelijkheden mogelijk maakt met gestandaardiseerde verbindingen naar externe databronnen.|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Context Engineering | De toekomstige mogelijkheden van context engineering-technieken voor MCP-servers, waaronder contextoptimalisatie, dynamisch contextbeheer en strategieën voor effectieve prompt engineering binnen MCP-frameworks.|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Custom Transport | Leer hoe je aangepaste transportmechanismen implementeert voor gespecialiseerde MCP-communicatiescenario's.|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Protocol Features | Beheers geavanceerde protocolfuncties zoals voortgangsnotificaties, annulering van verzoeken, resourcetemplates en foutafhandelingspatronen.|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Adversarial Agents | Gebruik twee agenten met tegenovergestelde standpunten die een enkele MCP-toolset delen, om hallucinaties te onderscheppen, grensgevallen aan te tonen en beter gekalibreerde output te produceren via een gestructureerd debat.|

> **Nieuw in MCP Specificatie 2025-11-25**: De specificatie bevat nu experimentele ondersteuning voor **Taken** (langdurige operaties met voortgangsmonitoring), **Tool Annotaties** (metadata over toolgedrag voor veiligheid), **URL Mode Elicitation** (opvragen van specifieke URL-inhoud bij cliënten) en verbeterde **Roots** (voor contextbeheer van werkruimtes). Zie de [MCP Specificatie changelog](https://spec.modelcontextprotocol.io/) voor volledige details.

## Aanvullende Referenties

Voor de meest actuele informatie over gevorderde MCP-onderwerpen, zie:
- [MCP Documentatie](https://modelcontextprotocol.io/)
- [MCP Specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Beveiligingsrisico's en mitigaties
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining

## Belangrijkste Punten

- Multimodale MCP-implementaties breiden AI-mogelijkheden uit voorbij tekstverwerking
- Schaalbaarheid is essentieel voor bedrijfsimplementaties en kan worden aangepakt via horizontaal en verticaal schalen
- Omvattende beveiligingsmaatregelen beschermen data en zorgen voor juiste toegangscontrole
- Integratie binnen ondernemingen met platforms zoals Azure OpenAI en Microsoft AI Foundry versterkt MCP-mogelijkheden
- Geavanceerde MCP-implementaties profiteren van geoptimaliseerde architecturen en zorgvuldig middelenbeheer

## Oefening

Ontwerp een MCP-implementatie van bedrijfsniveau voor een specifieke use case:

1. Identificeer multimodale vereisten voor je use case
2. Schets de beveiligingsmaatregelen die nodig zijn om gevoelige gegevens te beschermen
3. Ontwerp een schaalbare architectuur die varieërende belasting aankan
4. Plan integratiepunten met AI-systemen binnen ondernemingen
5. Documenteer potentiële prestatieknelpunten en mitigatiestrategieën

## Aanvullende Bronnen

- [Azure OpenAI Documentatie](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentatie](https://learn.microsoft.com/en-us/ai-services/)

---

## Wat nu

Verken de lessen in deze module beginnend met: [5.1 MCP Integration](./mcp-integration/README.md)

Als je deze module hebt afgerond, ga door naar: [Module 6: Community Contributions](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->