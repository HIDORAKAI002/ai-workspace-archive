# Fallstudie: Azure AI Travel Agents – Referensimplementation

## Översikt

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) är en omfattande referenslösning utvecklad av Microsoft som visar hur man bygger en multi-agent, AI-driven reseplaneringsapplikation med hjälp av Model Context Protocol (MCP), Azure OpenAI och Azure AI Search. Detta projekt visar bästa praxis för att orkestrera flera AI-agenter, integrera företagsdata och erbjuda en säker, utbyggbar plattform för verkliga scenarier.

## Viktiga funktioner
- **Multi-Agent Orkestrering:** Använder MCP för att samordna specialiserade agenter (t.ex. flyg-, hotell- och resplaneringsagenter) som samarbetar för att utföra komplexa reseplaneringsuppgifter.
- **Integration av företagsdata:** Ansluter till Azure AI Search och andra företagsdatakällor för att tillhandahålla aktuell och relevant information för rese-rekommendationer.
- **Säker, skalbar arkitektur:** Utnyttjar Azure-tjänster för autentisering, auktorisering och skalbar distribution, enligt företagets säkerhetsbästa praxis.
- **Utbyggbara verktyg:** Implementerar återanvändbara MCP-verktyg och promptmallar, vilket möjliggör snabb anpassning till nya domäner eller affärskrav.
- **Användarupplevelse:** Tillhandahåller ett konversationsgränssnitt för användare att interagera med reseagenterna, drivna av Azure OpenAI och MCP.

## Arkitektur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Beskrivning av arkitekturdiagrammet

Azure AI Travel Agents-lösningen är arkitekterad för modularitet, skalbarhet och säker integration av flera AI-agenter och företagsdatakällor. Huvudkomponenterna och dataflödet är följande:

- **Användargränssnitt:** Användare interagerar med systemet via ett konversationsgränssnitt (som en webbchatt eller Teams-bot) som skickar användarfrågor och tar emot rese-rekommendationer.
- **MCP-server:** Tjänar som central orkestrator, tar emot användarinmatning, hanterar kontext och koordinerar åtgärderna för specialiserade agenter (t.ex. FlightAgent, HotelAgent, ItineraryAgent) via Model Context Protocol.
- **AI-agenter:** Varje agent ansvarar för ett specifikt område (flyg, hotell, resplaner) och implementeras som ett MCP-verktyg. Agenter använder promptmallar och logik för att bearbeta förfrågningar och generera svar.
- **Azure OpenAI Service:** Tillhandahåller avancerad naturlig språkförståelse och -generering, vilket möjliggör för agenter att tolka användarintentioner och generera konversationssvar.
- **Azure AI Search & företagsdata:** Agenter frågar Azure AI Search och andra företagsdatakällor för att hämta uppdaterad information om flyg, hotell och resealternativ.
- **Autentisering & säkerhet:** Integreras med Microsoft Entra ID för säker autentisering och tillämpar minst-rättighetsprincip på alla resurser.
- **Distribution:** Designad för distribution på Azure Container Apps för att garantera skalbarhet, övervakning och operativ effektivitet.

Denna arkitektur möjliggör sömlös orkestrering av flera AI-agenter, säker integration med företagsdata och en robust, utbyggbar plattform för att bygga domänspecifika AI-lösningar.

## Steg-för-steg-förklaring av arkitekturdiagrammet
Föreställ dig att du planerar en stor resa och har ett team av expertassistenter som hjälper dig med varje detalj. Azure AI Travel Agents-systemet fungerar på liknande sätt, genom att använda olika delar (som teammedlemmar) där var och en har en specialuppgift. Så här passar allt ihop:

### Användargränssnitt (UI):
Tänk på detta som receptionen hos din resebyrå. Det är där du (användaren) ställer frågor eller gör förfrågningar, som ”Hitta ett flyg till Paris.” Detta kan vara ett chattfönster på en webbplats eller en meddelandeapp.

### MCP-servern (Samordnaren):
MCP-servern är som chefen som lyssnar på din förfrågan vid receptionen och bestämmer vilken specialist som ska hantera varje del. Den håller reda på din konversation och säkerställer att allt går smidigt.

### AI-agenterna (Specialistassistenter):
Varje agent är expert inom ett specifikt område – en kan allt om flyg, en annan om hotell och en tredje om att planera din resrutt. När du frågar efter en resa skickar MCP-servern din förfrågan till rätt agent(er). Dessa agenter använder sin kunskap och sina verktyg för att hitta de bästa alternativen för dig.

### Azure OpenAI Service (Språkexpert):
Detta är som att ha en språkexpert som förstår exakt vad du frågar, oavsett hur du formulerar dig. Den hjälper agenterna att förstå dina förfrågningar och svara på ett naturligt, konversationellt sätt.

### Azure AI Search & företagsdata (Informationsbibliotek):
Föreställ dig ett enormt, uppdaterat bibliotek med all senaste reseinformation – flygtidtabeller, hotell tillgänglighet och mer. Agenterna söker i detta bibliotek för att hitta de mest korrekta svaren åt dig.

### Autentisering & säkerhet (Säkerhetsvakt):
Precis som en säkerhetsvakt kontrollerar vem som får gå in i vissa områden, ser denna del till att endast auktoriserade personer och agenter kan få tillgång till känslig information. Den håller dina data säkra och privata.

### Distribution på Azure Container Apps (Byggnaden):
Alla dessa assistenter och verktyg arbetar tillsammans inne i en säker, skalbar byggnad (molnet). Det betyder att systemet kan hantera många användare samtidigt och alltid är tillgängligt när du behöver det.

## Hur allt fungerar tillsammans:

Du börjar med att ställa en fråga vid receptionen (UI).
Chefen (MCP-servern) avgör vilken specialist (agent) som ska hjälpa dig.
Specialisten använder språkexperten (OpenAI) för att förstå din förfrågan och biblioteket (AI Search) för att hitta det bästa svaret.
Säkerhetsvakten (autentisering) ser till att allt är säkert.
Allt detta sker inne i en pålitlig, skalbar byggnad (Azure Container Apps), så din upplevelse blir smidig och säker.
Detta lagarbete gör att systemet snabbt och säkert kan hjälpa dig att planera din resa, precis som ett team av expertresesäljare som samarbetar i ett modernt kontor!

## Teknisk implementation
- **MCP-server:** Värd för kärnlogiken för orkestrering, exponerar agentverktyg och hanterar kontext för flerstegs reseplaneringsarbetsflöden.
- **Agenter:** Varje agent (t.ex. FlightAgent, HotelAgent) implementeras som ett MCP-verktyg med sina egna promptmallar och logik.
- **Azure-integration:** Använder Azure OpenAI för naturlig språkförståelse och Azure AI Search för datahämtning.
- **Säkerhet:** Integreras med Microsoft Entra ID för autentisering och tillämpar minst-rättighetsprincip på alla resurser.
- **Distribution:** Stöder distribution till Azure Container Apps för skalbarhet och operativ effektivitet.

## Resultat och påverkan
- Demonstrerar hur MCP kan användas för att orkestrera flera AI-agenter i ett verkligt, produktionsklart scenario.
- Påskyndar utvecklingen av lösningar genom att tillhandahålla återanvändbara mönster för agentkoordinering, dataintegration och säker distribution.
- Fungerar som en mall för att bygga domänspecifika, AI-drivna applikationer med MCP och Azure-tjänster.

## Referenser
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Vad händer härnäst

- Tillbaka till: [Case Studies Overview](./README.md)
- Nästa: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:  
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Trots att vi strävar efter noggrannhet bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess ursprungliga språk ska betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår genom användning av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->