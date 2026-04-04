# Case Study: Azure AI Rejseagenter – Referenceimplementering

## Oversigt

[Azure AI Rejseagenter](https://github.com/Azure-Samples/azure-ai-travel-agents) er en omfattende referencesolution udviklet af Microsoft, der demonstrerer, hvordan man bygger en multi-agent, AI-drevet rejseplanlægningsapplikation ved brug af Model Context Protocol (MCP), Azure OpenAI og Azure AI Search. Dette projekt viser bedste praksis for orkestrering af flere AI-agenter, integration af virksomhedsdata og levering af en sikker, udvidelig platform til virkelighedsnære scenarier.

## Nøglefunktioner
- **Multi-Agent Orkestrering:** Anvender MCP til at koordinere specialiserede agenter (f.eks. fly-, hotel- og rejseplanlægningsagenter), der samarbejder om at udføre komplekse rejseplanlægningsopgaver.
- **Integration af Virksomhedsdata:** Tilsluttes Azure AI Search og andre virksomhedsdatakilder for at levere opdateret og relevant information til rejseanbefalinger.
- **Sikker, Skalerbar Arkitektur:** Udnytter Azure-tjenester til autentificering, autorisation og skalerbar implementering med fokus på bedste praksis inden for virksomhedssikkerhed.
- **Udvidelige Værktøjer:** Implementerer genanvendelige MCP-værktøjer og promptskabeloner, der muliggør hurtig tilpasning til nye domæner eller forretningsbehov.
- **Brugeroplevelse:** Tilbyder en samtalebaseret grænseflade, hvor brugere kan interagere med rejseagenternes agenter, drevet af Azure OpenAI og MCP.

## Arkitektur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Beskrivelse af Arkitekturdiagrammet

Azure AI Rejseagenters løsning er arkitekteret for modularitet, skalerbarhed og sikker integration af flere AI-agenter og virksomhedsdatakilder. Hovedkomponenterne og dataflowet er som følger:

- **Brugergrænseflade:** Brugere interagerer med systemet via en samtale-UI (såsom en webchat eller Teams-bot), som sender brugerforespørgsler og modtager rejseanbefalinger.
- **MCP Server:** Tjener som central orkestrator, modtager brugerinput, håndterer kontekst og koordinerer handlinger mellem specialiserede agenter (f.eks. FlightAgent, HotelAgent, ItineraryAgent) via Model Context Protocol.
- **AI-agenter:** Hver agent er ansvarlig for et specifikt domæne (fly, hoteller, rejseplaner) og implementeres som et MCP-værktøj. Agenter bruger promptskabeloner og logik til at behandle anmodninger og generere svar.
- **Azure OpenAI Service:** Tilbyder avanceret naturlig sprogforståelse og -generering, hvilket gør det muligt for agenterne at tolke brugerens intentioner og generere samtalebaserede svar.
- **Azure AI Search & Virksomhedsdata:** Agenter søger i Azure AI Search og andre virksomhedsdatakilder for at hente opdaterede oplysninger om fly, hoteller og rejsemuligheder.
- **Autentificering & Sikkerhed:** Integreres med Microsoft Entra ID for sikker autentificering og anvender principper om mindst priviligeret adgang til alle ressourcer.
- **Implementering:** Designet til implementering på Azure Container Apps for at sikre skalerbarhed, overvågning og driftseffektivitet.

Denne arkitektur muliggør problemfri orkestrering af flere AI-agenter, sikker integration med virksomhedsdata samt en robust og udvidelig platform til at bygge domænespecifikke AI-løsninger.

## Trin-for-trin Forklaring af Arkitekturdiagrammet
Forestil dig, at du planlægger en stor rejse og har et team af ekspertassistenter, der hjælper dig med alle detaljer. Azure AI Rejseagenters system fungerer på samme måde, hvor forskellige dele (som teammedlemmer) hver har en særlig opgave. Sådan hænger det hele sammen:

### Brugergrænseflade (UI):
Tænk på dette som din rejseagents reception. Her stiller du spørgsmål eller fremsætter forespørgsler, som "Find mig en flyrejse til Paris." Dette kunne være et chatvindue på en hjemmeside eller en beskedapp.

### MCP Server (Koordinatoren):
MCP Serveren er som lederen, der lytter til din forespørgsel ved receptionen og beslutter, hvilken specialist der skal håndtere hver del. Den holder styr på din samtale og sørger for, at alt kører gnidningsfrit.

### AI-agenter (Specialistassistenter):
Hver agent er ekspert inden for et specifikt område – én ved alt om fly, en anden om hoteller, og en tredje om planlægning af din rejseplan. Når du beder om en rejse, sender MCP Serveren din forespørgsel til den rette agent(er). Disse agenter bruger deres viden og værktøjer til at finde de bedste muligheder for dig.

### Azure OpenAI Service (Sprogeksperten):
Dette er som at have en sprogkyndig ekspert, der nøjagtigt forstår, hvad du spørger om, uanset hvordan du formulerer det. Den hjælper agenterne med at forstå dine forespørgsler og svare på naturligt, samtalebaseret sprog.

### Azure AI Search & Virksomhedsdata (Informationsbiblioteket):
Forestil dig et kæmpestort, opdateret bibliotek med al den nyeste rejseinformation – flytider, hoteltilgængelighed og mere. Agenterne søger i dette bibliotek for at finde de mest præcise svar til dig.

### Autentificering & Sikkerhed (Vagten):
Ligesom en sikkerhedsvagt, der kontrollerer, hvem der kan komme ind visse steder, sørger denne del for, at kun autoriserede personer og agenter kan få adgang til følsomme oplysninger. Den holder dine data sikre og private.

### Implementering på Azure Container Apps (Bygningen):
Alle disse assistenter og værktøjer arbejder sammen inde i en sikker, skalerbar bygning (skyen). Det betyder, at systemet kan håndtere mange brugere samtidigt og altid er tilgængeligt, når du har brug for det.

## Hvordan det hele fungerer sammen:

Du starter med at stille et spørgsmål ved receptionen (UI).
Lederen (MCP Server) finder ud af, hvilken specialist (agent) der skal hjælpe dig.
Specialisten bruger sprogeksperten (OpenAI) til at forstå din forespørgsel og biblioteket (AI Search) til at finde det bedste svar.
Sikkerhedsvagten (Autentificering) sikrer, at alt er trygt.
Alt dette foregår inde i en pålidelig, skalerbar bygning (Azure Container Apps), så din oplevelse er glidende og sikker.
Dette teamarbejde gør det muligt for systemet hurtigt og sikkert at hjælpe dig med at planlægge din rejse – lige som et team af ekspertrejseagenter, der arbejder sammen på et moderne kontor!

## Teknisk Implementering
- **MCP Server:** Hostes kernen i orkestreringslogikken, eksponerer agentværktøjer og håndterer kontekst til flertrins-rejseplanlægningsworkflows.
- **Agenter:** Hver agent (f.eks. FlightAgent, HotelAgent) implementeres som et MCP-værktøj med egne promptskabeloner og logik.
- **Azure Integration:** Bruger Azure OpenAI til naturlig sprogforståelse og Azure AI Search til dataopslag.
- **Sikkerhed:** Integreres med Microsoft Entra ID til autentificering og anvender princippet om mindst privilegeret adgang til alle ressourcer.
- **Implementering:** Understøtter implementering på Azure Container Apps for skalerbarhed og operationel effektivitet.

## Resultater og Indflydelse
- Demonstrerer, hvordan MCP kan bruges til at orkestrere flere AI-agenter i en virkelighedsnær, produktionsklar løsning.
- Fremskynder løsningsudvikling ved at tilbyde genanvendelige mønstre til agentkoordinering, dataintegration og sikker implementering.
- Tjener som en skabelon til at bygge domænespecifikke, AI-drevne applikationer ved brug af MCP og Azure-tjenester.

## Referencer
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Hvad der kommer næste

- Tilbage til: [Case Studies Overview](./README.md)
- Næste: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi er ikke ansvarlige for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->