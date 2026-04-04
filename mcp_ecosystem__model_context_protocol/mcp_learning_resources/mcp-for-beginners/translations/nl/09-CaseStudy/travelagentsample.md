# Case Study: Azure AI Travel Agents – Referentie-implementatie

## Overzicht

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) is een uitgebreide referentieoplossing ontwikkeld door Microsoft die laat zien hoe je een multi-agent, AI-aangedreven reisplanningsapplicatie kunt bouwen met behulp van het Model Context Protocol (MCP), Azure OpenAI en Azure AI Search. Dit project toont best practices voor het coördineren van meerdere AI-agents, het integreren van bedrijfsdata en het bieden van een veilig, uitbreidbaar platform voor scenario’s uit de praktijk.

## Belangrijkste Kenmerken
- **Multi-Agent Orkestratie:** Maakt gebruik van MCP om gespecialiseerde agents (bijv. vlucht-, hotel- en reisschema-agents) te coördineren die samenwerken om complexe reisplanningsopdrachten uit te voeren.
- **Integratie van Bedrijfsdata:** Verbindt met Azure AI Search en andere bedrijfsdatabronnen om up-to-date, relevante informatie te leveren voor reisaanbevelingen.
- **Veilige, Schaalbare Architectuur:** Benut Azure-diensten voor authenticatie, autorisatie en schaalbare uitrol, volgens de beste beveiligingspraktijken voor ondernemingen.
- **Uitbreidbare Tools:** Implementeert herbruikbare MCP-tools en prompt-sjablonen, waarmee snelle aanpassing aan nieuwe domeinen of zakelijke vereisten mogelijk is.
- **Gebruikerservaring:** Biedt een conversatie-interface voor gebruikers om te communiceren met de reisagents, aangedreven door Azure OpenAI en MCP.

## Architectuur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Beschrijving van het Architectuurdiagram

De Azure AI Travel Agents-oplossing is ontworpen voor modulariteit, schaalbaarheid en veilige integratie van meerdere AI-agents en bedrijfsdatabronnen. De belangrijkste componenten en datastromen zijn als volgt:

- **Gebruikersinterface:** Gebruikers interageren met het systeem via een conversatie-UI (zoals een webchat of Teams-bot), die gebruikersvragen verstuurt en reisaanbevelingen ontvangt.
- **MCP Server:** Dient als centrale orkestrator, ontvangt gebruikersinvoer, beheert context en coördineert acties van gespecialiseerde agents (bijv. FlightAgent, HotelAgent, ItineraryAgent) via het Model Context Protocol.
- **AI Agents:** Elke agent is verantwoordelijk voor een specifiek domein (vluchten, hotels, reisplannen) en is geïmplementeerd als een MCP-tool. Agents gebruiken prompt-sjablonen en logica om verzoeken te verwerken en antwoorden te genereren.
- **Azure OpenAI Service:** Biedt geavanceerd begrip en generatie van natuurlijke taal, waardoor agents de intentie van gebruikers begrijpen en conversatie-antwoorden genereren.
- **Azure AI Search & Bedrijfsdata:** Agents raadplegen Azure AI Search en andere bedrijfsdatabronnen om actuele informatie te verkrijgen over vluchten, hotels en reismogelijkheden.
- **Authenticatie & Beveiliging:** Integreert met Microsoft Entra ID voor veilige authenticatie en past least-privilege toegangscontroles toe op alle bronnen.
- **Uitrol:** Ontworpen voor uitrol op Azure Container Apps, wat schaalbaarheid, monitoring en operationele efficiëntie waarborgt.

Deze architectuur maakt naadloze orkestratie van meerdere AI-agents mogelijk, veilige integratie met bedrijfsdata en een robuust, uitbreidbaar platform voor het bouwen van domeinspecifieke AI-oplossingen.

## Stap-voor-stap Uitleg van het Architectuurdiagram
Stel je voor dat je een grote reis plant en een team deskundige assistenten hebt die je helpen met elk detail. Het Azure AI Travel Agents-systeem werkt op een vergelijkbare manier, met verschillende onderdelen (zoals teamleden) die elk een speciale taak hebben. Zo werkt het:

### Gebruikersinterface (UI):
Zie dit als de receptie van je reisagent. Hier stel je vragen of doe je verzoeken, zoals “Vind een vlucht naar Parijs.” Dit kan een chatvenster op een website of een berichtenapp zijn.

### MCP Server (De Coördinator):
De MCP Server is als de manager die naar je verzoek aan de receptie luistert en bepaalt welke specialist welk deel moet afhandelen. Hij houdt de gesprekken bij en zorgt dat alles soepel verloopt.

### AI Agents (Specialistische Assistenten):
Elke agent is een expert in een bepaald gebied – de ene weet alles van vluchten, de andere van hotels en weer een andere van het plannen van je reisschema. Wanneer je een reis aanvraagt, stuurt de MCP Server je verzoek naar de juiste agent(s). Deze agents gebruiken hun kennis en tools om de beste opties te vinden.

### Azure OpenAI Service (Taalexpert):
Dit is als een taalexpert die precies begrijpt wat je bedoelt, hoe je het ook formuleert. Het helpt de agents je verzoeken goed te begrijpen en in natuurlijke, gesprekstaal te reageren.

### Azure AI Search & Bedrijfsdata (Informatiebibliotheek):
Stel je een enorme, actuele bibliotheek voor met de nieuwste reisgegevens – vluchtschema’s, hotelbeschikbaarheid en meer. De agents doorzoeken deze bibliotheek om de meest accurate antwoorden te vinden.

### Authenticatie & Beveiliging (Beveiligingsmedewerker):
Net zoals een beveiliger controleert wie bepaalde gebieden mag betreden, zorgt dit onderdeel dat alleen geautoriseerde personen en agents toegang krijgen tot gevoelige informatie. Zo blijft je data veilig en privé.

### Uitrol op Azure Container Apps (Het Gebouw):
Al deze assistenten en tools werken samen binnen een veilig, schaalbaar gebouw (de cloud). Dit betekent dat het systeem veel gebruikers tegelijk aankan en altijd beschikbaar is wanneer je het nodig hebt.

## Hoe het samenwerkt:

Je begint met het stellen van een vraag bij de receptie (UI).
De manager (MCP Server) bepaalt welke specialist (agent) je helpt.
De specialist gebruikt de taalexpert (OpenAI) om je verzoek te begrijpen en de bibliotheek (AI Search) om het beste antwoord te vinden.
De beveiligingsmedewerker (Authenticatie) zorgt dat alles veilig verloopt.
Dit alles gebeurt in een betrouwbaar, schaalbaar gebouw (Azure Container Apps), zodat je ervaring soepel en veilig is.
Deze samenwerking stelt het systeem in staat je snel en veilig te helpen je reis te plannen, net als een team van deskundige reisagenten die samenwerken in een modern kantoor!

## Technische Implementatie
- **MCP Server:** Bevat de kernlogica voor orkestratie, biedt agent-tools en beheert context voor multi-staps reisplanningsworkflows.
- **Agents:** Elke agent (bv. FlightAgent, HotelAgent) is geïmplementeerd als een MCP-tool met eigen prompt-sjablonen en logica.
- **Azure Integratie:** Maakt gebruik van Azure OpenAI voor begrip van natuurlijke taal en Azure AI Search voor data-opvraging.
- **Beveiliging:** Integreert met Microsoft Entra ID voor authenticatie en past least-privilege toegangscontroles toe op alle resources.
- **Uitrol:** Ondersteunt uitrol op Azure Container Apps voor schaalbaarheid en operationele efficiëntie.

## Resultaten en Impact
- Toont aan hoe MCP gebruikt kan worden om meerdere AI-agents te coördineren in een realistisch, productie-waardig scenario.
- Versnelt de ontwikkeling van oplossingen door herbruikbare patronen te bieden voor agent-coördinatie, data-integratie en veilige uitrol.
- Dient als blauwdruk voor het bouwen van domeinspecifieke, AI-aangedreven applicaties met MCP en Azure-diensten.

## Referenties
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Wat nu?

- Terug naar: [Case Studies Overview](./README.md)
- Volgende: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet als gezaghebbende bron worden beschouwd. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties voortvloeiend uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->