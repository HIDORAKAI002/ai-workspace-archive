# MCP i aktion: Casestudier fra den virkelige verden

[![MCP i aktion: Casestudier fra den virkelige verden](../../../translated_images/da/10.3262cc80b4de5071.webp)](https://youtu.be/IxshWb2Az5w)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

Model Context Protocol (MCP) forvandler, hvordan AI-applikationer interagerer med data, værktøjer og tjenester. Dette afsnit præsenterer virkelige casestudier, der demonstrerer praktiske anvendelser af MCP i forskellige erhvervsscenarier.

## Oversigt

Dette afsnit fremviser konkrete eksempler på MCP-implementeringer og fremhæver, hvordan organisationer udnytter denne protokol til at løse komplekse forretningsudfordringer. Ved at gennemgå disse casestudier vil du få indsigt i MCP’s alsidighed, skalerbarhed og praktiske fordele i virkelige scenarier.

## Centrale læringsmål

Ved at gennemgå disse casestudier vil du:

- Forstå, hvordan MCP kan anvendes til at løse specifikke forretningsproblemer
- Lære om forskellige integrationsmønstre og arkitektoniske tilgange
- Genkende bedste praksis for implementering af MCP i erhvervsmiljøer
- Få indsigt i udfordringer og løsninger mødt i virkelige implementeringer
- Identificere muligheder for at anvende lignende mønstre i dine egne projekter

## Fremhævede casestudier

### 1. [Azure AI Travel Agents – Referenceimplementering](./travelagentsample.md)

Dette casestudie undersøger Microsofts omfattende referenceløsning, der viser, hvordan man bygger en multi-agent, AI-drevet rejseplanlægningsapplikation ved hjælp af MCP, Azure OpenAI og Azure AI Search. Projektet demonstrerer:

- Multi-agent orkestrering gennem MCP
- Enterprise data integration med Azure AI Search
- Sikker, skalerbar arkitektur ved brug af Azure-tjenester
- Udvideligt værktøjssæt med genanvendelige MCP-komponenter
- Konverserende brugeroplevelse drevet af Azure OpenAI

Arkitekturen og implementeringsdetaljerne giver værdifuld indsigt i at bygge komplekse multi-agent systemer med MCP som koordineringslag.

### 2. [Opdatering af Azure DevOps-elementer fra YouTube-data](./UpdateADOItemsFromYT.md)

Dette casestudie viser en praktisk anvendelse af MCP til automatisering af arbejdsflowprocesser. Det demonstrerer, hvordan MCP-værktøjer kan anvendes til at:

- Udtrække data fra onlineplatforme (YouTube)
- Opdatere arbejdsopgaver i Azure DevOps-systemer
- Oprette gentagelige automatiseringsarbejdsflow
- Integrere data på tværs af forskellige systemer

Dette eksempel illustrerer, hvordan selv relativt simple MCP-implementeringer kan give betydelige effektivitetsgevinster ved at automatisere rutineopgaver og forbedre datakonsistens på tværs af systemer.

### 3. [Dokumentationshentning i realtid med MCP](./docs-mcp/README.md)

Dette casestudie guider dig gennem at forbinde en Python-konsolklient til en Model Context Protocol (MCP) server for at hente og logge realtids-, kontekstbevidst Microsoft-dokumentation. Du lærer at:

- Forbinde til en MCP-server med en Python-klient og den officielle MCP SDK
- Bruge streaming HTTP-klienter til effektiv, realtids datahentning
- Kalde dokumentationsværktøjer på serveren og logge svar direkte til konsollen
- Integrere opdateret Microsoft-dokumentation i dit workflow uden at forlade terminalen

Kapitel inkluderer en praktisk opgave, et minimalt fungerende kodeeksempel og links til yderligere ressourcer for dybere læring. Se hele gennemgangen og koden i det linkede kapitel for at forstå, hvordan MCP kan forvandle dokumentationsadgang og udviklerproduktivitet i konsolbaserede miljøer.

### 4. [Interaktiv studieplan-generator webapp med MCP](./docs-mcp/README.md)

Dette casestudie viser, hvordan man bygger en interaktiv webapplikation ved brug af Chainlit og Model Context Protocol (MCP) til at generere personlige studieplaner for ethvert emne. Brugere kan angive et emne (såsom "AI-900 certificering") og en studieduration (f.eks. 8 uger), og appen vil give en uge-for-uge oversigt over anbefalet indhold. Chainlit muliggør en konverserende chatgrænseflade, der gør oplevelsen engagerende og tilpasningsdygtig.

- Konverserende webapp drevet af Chainlit
- Brugerstyrede forespørgsler til emne og varighed
- Uge-for-uge indholdsanbefalinger ved hjælp af MCP
- Realtids, adaptive svar i en chatgrænseflade

Projektet illustrerer, hvordan konverserende AI og MCP kan kombineres til at skabe dynamiske, brugerstyrede uddannelsesværktøjer i et moderne webmiljø.

### 5. [In-editor dokumentation med MCP-server i VS Code](./docs-mcp/README.md)

Dette casestudie demonstrerer, hvordan du kan bringe Microsoft Learn Docs direkte ind i dit VS Code-miljø ved hjælp af MCP-serveren—ingen flere browserfaner! Du vil se, hvordan du kan:

- Søge og læse dokumentation øjeblikkeligt inde i VS Code via MCP-panelet eller kommandopaletten
- Referere dokumentation og indsætte links direkte i din README eller kursusmarkdownfiler
- Bruge GitHub Copilot og MCP sammen for sømløse, AI-drevne dokumentations- og kodeworkflows
- Validere og forbedre din dokumentation med realtids feedback og Microsoft-kildepræcision
- Integrere MCP med GitHub workflows til kontinuerlig dokumentationsvalidering

Implementeringen inkluderer:

- Eksempel på `.vscode/mcp.json` konfiguration til nem opsætning
- Skærmbilledbaserede gennemgange af in-editor oplevelsen
- Tips til at kombinere Copilot og MCP for maksimal produktivitet

Dette scenarie er ideelt for kursusforfattere, dokumentationsskribenter og udviklere, der ønsker at holde fokus i deres editor, mens de arbejder med docs, Copilot og valideringsværktøjer—alt sammen drevet af MCP.

### 6. [APIM MCP Server-oprettelse](./apimsample.md)

Dette casestudie giver en trin-for-trin guide til, hvordan man opretter en MCP-server ved brug af Azure API Management (APIM). Det dækker:

- Opsætning af en MCP-server i Azure API Management
- Eksponering af API-operationer som MCP-værktøjer
- Konfiguration af politikker for ratebegrænsning og sikkerhed
- Test af MCP-serveren ved hjælp af Visual Studio Code og GitHub Copilot

Dette eksempel illustrerer, hvordan man udnytter Azures kapaciteter til at skabe en robust MCP-server, som kan bruges i forskellige applikationer og forbedre integrationen af AI-systemer med enterprise-API’er.

### 7. [GitHub MCP Registry — Accelererende agentisk integration](https://github.com/mcp)

Dette casestudie undersøger, hvordan GitHub's MCP Registry, lanceret i september 2025, løser en kritisk udfordring i AI-økosystemet: den fragmenterede opdagelse og udrulning af Model Context Protocol (MCP) servere.

#### Oversigt
**MCP Registry** løser voksesmerterne ved spredte MCP-servere på tværs af repositories og registre, hvilket tidligere gjorde integration langsom og fejlbehæftet. Disse servere muliggør, at AI-agenter kan interagere med eksterne systemer som API’er, databaser og dokumentationskilder.

#### Problemstilling
Udviklere, der bygger agentiske workflows, stod over for flere udfordringer:
- **Dårlig opdagelighed** af MCP-servere på tværs af platforme
- **Redundant opsætningsspørgsmål** spredt på fora og dokumentation
- **Sikkerhedsrisici** fra uverificerede og utroværdige kilder
- **Manglende standardisering** i serverkvalitet og kompatibilitet

#### Løsningsarkitektur
GitHub’s MCP Registry centraliserer betroede MCP-servere med nøglefunktioner:
- **Én-klik-installation** via VS Code for strømlinet opsætning
- **Signal-til-støj-sortering** efter stjerner, aktivitet og fællesskabsvalidering
- **Direkte integration** med GitHub Copilot og andre MCP-kompatible værktøjer
- **Åben bidragsmodel** der muliggør både fællesskabs- og erhvervspartnerbidrag

#### Forretningsmæssig effekt
Registret har leveret målbare forbedringer:
- **Hurtigere onboarding** for udviklere ved brug af værktøjer som Microsoft Learn MCP Server, der streamer officiel dokumentation direkte ind i agenter
- **Forbedret produktivitet** via specialiserede servere som `github-mcp-server`, der muliggør naturlig sprogautomation i GitHub (f.eks. oprettelse af PR, genkørsler af CI, kodeskanning)
- **Styrket økosystemtillid** gennem kuraterede lister og transparente konfigurationsstandarder

#### Strategisk værdi
For praktikere med speciale i agentlivscyklusstyring og reproducerbare workflows tilbyder MCP Registry:
- **Modulær agentudrulning** med standardiserede komponenter
- **Registre-baserede evalueringspipelines** for konsistent test og validering
- **Tværværktøjsinteroperabilitet** der muliggør sømløs integration på tværs af AI-platforme

Dette casestudie viser, at MCP Registry er mere end bare et register—det er en grundlæggende platform for skalerbar, reel modelintegration og agentisk systemudrulning.

## Konklusion

Disse syv omfattende casestudier demonstrerer den bemærkelsesværdige alsidighed og praktiske anvendelser af Model Context Protocol på tværs af forskellige virkelige scenarier. Fra komplekse multi-agent rejseplanlægningssystemer og enterprise API-styring til strømlinede dokumentationsworkflows og den revolutionerende GitHub MCP Registry viser disse eksempler, hvordan MCP leverer en standardiseret, skalerbar måde at forbinde AI-systemer med de værktøjer, data og tjenester, de har brug for til at skabe fremragende værdi.

Casestudierne dækker flere dimensioner af MCP-implementering:
- **Enterprise integration**: Azure API Management og Azure DevOps-automatisering
- **Multi-agent orkestrering**: Rejseplanlægning med koordinerede AI-agenter
- **Udviklerproduktivitet**: VS Code-integration og realtids dokumentationsadgang
- **Økosystemudvikling**: GitHub MCP Registry som grundlæggende platform
- **Uddannelsesanvendelser**: Interaktive studieplan-generatorer og konverserende grænseflader

Ved at studere disse implementeringer opnår du kritisk indsigt i:
- **Arkitektoniske mønstre** til forskellige skalaer og brugstilfælde
- **Implementeringsstrategier** der balancerer funktionalitet og vedligeholdelse
- **Sikkerheds- og skalerbarhedsovervejelser** for produktionsudrulninger
- **Bedste praksis** for MCP-serverudvikling og klientintegration
- **Økosystemtænkning** for at opbygge sammenkædede AI-drevne løsninger

Disse eksempler demonstrerer samlet, at MCP ikke blot er en teoretisk ramme, men en moden, produktionsklar protokol, der muliggør praktiske løsninger på komplekse forretningsudfordringer. Uanset om du bygger simple automatiseringsværktøjer eller sofistikerede multi-agent systemer, giver de indlærte mønstre og tilgange her et solidt fundament for dine egne MCP-projekter.

## Yderligere ressourcer

- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure DevOps MCP Tool](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP Tool](https://github.com/microsoft/playwright-mcp)
- [Microsoft Docs MCP Server](https://github.com/MicrosoftDocs/mcp)
- [GitHub MCP Registry — Accelererende agentisk integration](https://github.com/mcp)
- [MCP Community Examples](https://github.com/microsoft/mcp)

## Hvad er næste skridt

- Forrige: [Modul 8: Bedste praksis](../08-BestPractices/README.md)
- Næste: [Modul 10: Strømlining af AI-workflows: Byg en MCP-server med AI Toolkit](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:  
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør betragtes som den autoritative kilde. For vigtig information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for eventuelle misforståelser eller fejltolkninger, der opstår ved brug af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->