# Case Study: Azure AI Reiseagenter – Referanseimplementering

## Oversikt

[Azure AI Reiseagenter](https://github.com/Azure-Samples/azure-ai-travel-agents) er en omfattende referanseløsning utviklet av Microsoft som demonstrerer hvordan man bygger en multi-agent, AI-drevet reiseplanleggingsapplikasjon ved bruk av Model Context Protocol (MCP), Azure OpenAI og Azure AI Search. Dette prosjektet viser beste praksis for orkestrering av flere AI-agenter, integrering av bedriftsdata og å tilby en sikker, utvidbar plattform for virkelige scenarioer.

## Hovedtrekk
- **Multi-Agent Orkestrering:** Bruker MCP for å koordinere spesialiserte agenter (f.eks. fly-, hotell- og reiseplanlegger-agenter) som samarbeider for å løse komplekse reiseplanleggingsoppgaver.
- **Integrering av bedriftsdata:** Knytter til Azure AI Search og andre bedriftsdatakilder for å tilby oppdatert, relevant informasjon til reiseanbefalinger.
- **Sikker og skalerbar arkitektur:** Utnytter Azure-tjenester for autentisering, autorisasjon og skalerbar distribusjon, i tråd med beste sikkerhetspraksis for bedrifter.
- **Utvidbare verktøy:** Implementerer gjenbrukbare MCP-verktøy og promptmaler, som muliggjør rask tilpasning til nye domener eller forretningsbehov.
- **Brukeropplevelse:** Tilbyr en samtalegrensesnitt for brukere å interagere med reiseagentene, drevet av Azure OpenAI og MCP.

## Arkitektur
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Beskrivelse av arkitekturdiagrammet

Løsningen Azure AI Reiseagenter er arkitektert for modularitet, skalerbarhet og sikker integrering av flere AI-agenter og bedriftsdatakilder. Hovedkomponentene og dataflyten er som følger:

- **Brukergrensesnitt:** Brukere interagerer med systemet gjennom et samtalegrensesnitt (for eksempel en webchat eller Teams-bot), som sender brukerforespørsler og mottar reiseanbefalinger.
- **MCP Server:** Tjener som den sentrale orkestratoren, mottar brukerinput, håndterer kontekst og koordinerer handlingene til spesialiserte agenter (f.eks. FlightAgent, HotelAgent, ItineraryAgent) via Model Context Protocol.
- **AI-agenter:** Hver agent er ansvarlig for et spesielt domene (fly, hotell, reiserute) og implementert som et MCP-verktøy. Agentene bruker promptmaler og logikk for å behandle forespørsler og generere svar.
- **Azure OpenAI-tjeneste:** Tilbyr avansert naturlig språkforståelse og generering, som gjør at agentene kan tolke brukerintensjoner og generere samtalesvar.
- **Azure AI Search & bedriftsdata:** Agenter spør Azure AI Search og andre bedriftsdatakilder for å hente oppdatert informasjon om fly, hotell og reisealternativer.
- **Autentisering og sikkerhet:** Integreres med Microsoft Entra ID for sikker autentisering og bruker minste privilegium-tilgangskontroller på alle ressurser.
- **Distribusjon:** Designet for distribusjon på Azure Container Apps, som sikrer skalerbarhet, overvåkning og driftseffektivitet.

Denne arkitekturen muliggjør sømløs orkestrering av flere AI-agenter, sikker integrering med bedriftsdata, og en robust, utvidbar plattform for å bygge domenespesifikke AI-løsninger.

## Trinnvis forklaring av arkitekturdiagrammet
Tenk deg at du planlegger en stor reise og har et team av eksperthjelpere som hjelper deg med hver detalj. Azure AI Reiseagenter-systemet fungerer på lignende måte, ved å bruke forskjellige deler (som teammedlemmer) som hver har en spesialoppgave. Slik henger det sammen:

### Brukergrensesnitt (UI):
Tenk på dette som resepsjonen til reiseagenten din. Her stiller du spørsmål eller kommer med forespørsler, som “Finn en flybillett til Paris.” Dette kan være et chat-vindu på en nettside eller en meldingsapp.

### MCP Server (Koordinatoren):
MCP Server er som sjefen som lytter til forespørselen din på resepsjonen og bestemmer hvilken spesialist som skal håndtere hver del. Den holder styr på samtalen din og sørger for at alt går smidig.

### AI-agenter (Spesialistlederne):
Hver agent er en ekspert på et bestemt område—en vet alt om fly, en annen om hoteller, og en tredje om reiseplanlegging. Når du spør om en reise, sender MCP Server forespørselen din til riktig(e) agent(er). Disse bruker sin kunnskap og verktøy for å finne de beste alternativene for deg.

### Azure OpenAI-tjenesten (Språkeksperten):
Dette er som å ha en språkekspert som forstår nøyaktig hva du spør om, uansett hvordan du formulerer det. Den hjelper agentene å forstå forespørslene dine og svare på et naturlig og samtalelignende språk.

### Azure AI Search & bedriftsdata (Informasjonsbiblioteket):
Tenk på et stort, oppdatert bibliotek med all siste reiseinformasjon—flytider, hotelltilgjengelighet med mer. Agentene søker i dette biblioteket for å finne de mest nøyaktige svarene til deg.

### Autentisering og sikkerhet (Vekteren):
Som en sikkerhetsvakt som sjekker hvem som kan gå inn på bestemte områder, sørger denne delen for at bare autoriserte personer og agenter kan få tilgang til sensitiv informasjon. Den holder dataene dine sikre og private.

### Distribusjon på Azure Container Apps (Bygningen):
Alle disse hjelperne og verktøyene jobber sammen inni en sikker, skalerbar bygning (skyen). Det betyr at systemet kan håndtere mange brukere samtidig og alltid er tilgjengelig når du trenger det.

## Hvordan alt fungerer sammen:

Du starter med å stille et spørsmål i resepsjonen (UI).  
Sjefen (MCP Server) finner ut hvilken spesialist (agent) som skal hjelpe deg.  
Spesialisten bruker språkeksperten (OpenAI) for å forstå forespørselen din og biblioteket (AI Search) for å finne det beste svaret.  
Vekteren (Autentisering) sørger for at alt er sikkert.  
Alt dette skjer inni en pålitelig, skalerbar bygning (Azure Container Apps), så opplevelsen din blir smidig og trygg.  
Dette samarbeidet gjør at systemet raskt og trygt kan hjelpe deg med å planlegge reisen, akkurat som et team av ekspertreiseagenter som jobber sammen på et moderne kontor!

## Teknisk implementering
- **MCP Server:** Holder kjernelogikken for orkestrering, eksponerer agentverktøy og administrerer kontekst for flerstegs reiseplanleggingsarbeidsflyter.
- **Agenter:** Hver agent (f.eks. FlightAgent, HotelAgent) er implementert som et MCP-verktøy med sine egne promptmaler og logikk.
- **Azure-integrasjon:** Bruker Azure OpenAI for naturlig språkforståelse og Azure AI Search for datauthenting.
- **Sikkerhet:** Integreres med Microsoft Entra ID for autentisering og bruker minste privilegium-tilgangskontroller på alle ressurser.
- **Distribusjon:** Støtter distribusjon til Azure Container Apps for skalerbarhet og driftseffektivitet.

## Resultater og innvirkning
- Demonstrerer hvordan MCP kan brukes til å orkestrere flere AI-agenter i et virkelig scenario med produksjonskvalitet.
- Akselererer løsningutvikling ved å tilby gjenbrukbare mønstre for agentkoordinering, dataintegrasjon og sikker distribusjon.
- Fungerer som en blåkopi for å bygge domenespesifikke, AI-drevne applikasjoner med MCP og Azure-tjenester.

## Referanser
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Hva nå

- Tilbake til: [Case Studies Overview](./README.md)
- Neste: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på dets opprinnelige språk skal anses som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->