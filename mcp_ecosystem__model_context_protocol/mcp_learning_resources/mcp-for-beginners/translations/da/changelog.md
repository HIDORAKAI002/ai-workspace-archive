# Ændringslog: MCP for Beginners Curriculum

Dette dokument tjener som en oversigt over alle væsentlige ændringer foretaget i Model Context Protocol (MCP) for Beginners curriculum. Ændringer er dokumenteret i omvendt kronologisk rækkefølge (nyeste ændringer først).

## 5. februar 2026

### Forbedringer i Validering og Navigation på tværs af Repository

#### Nyt Curriculum-indhold Tilføjet

**Modul 03 - Kom Godt I Gang**
- **12-mcp-hosts/README.md**: Ny omfattende vejledning til opsætning af MCP hosts
  - Konfigurationseksempler for Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfiguration skabeloner for alle større hosts
  - Sammenligningstabel over transporttyper (stdio, SSE/HTTP, WebSocket)
  - Fejlfinding af almindelige forbindelsesproblemer
  - Sikkerhedsbest practices for host konfiguration

- **13-mcp-inspector/README.md**: Ny fejlfindingsvejledning for MCP Inspector
  - Installationsmetoder (npx, npm global, fra kilde)
  - Forbindelse til servere via stdio og HTTP/SSE
  - Testværktøjer, ressourcer og prompt workflows
  - VS Code integration med MCP Inspector
  - Almindelige fejlfindingsscenarier med løsninger

**Modul 04 - Praktisk Implementering**
- **pagination/README.md**: Ny vejledning i implementering af pagination
  - Cursor-baserede pagination mønstre i Python, TypeScript, Java
  - Client-side pagination håndtering
  - Cursor design strategier (ugennemsigtig vs. struktureret)
  - Anbefalinger til performance-optimering

**Modul 05 - Avancerede Emner**
- **mcp-protocol-features/README.md**: Nyt dybdegående kig på protokolfunktioner
  - Implementering af statusnotifikationer
  - Mønstre til anmodningsannullering
  - Ressource-skabeloner med URI mønstre
  - Server livscyklusstyring
  - Logningsniveau kontrol
  - Fejlhåndteringsmønstre med JSON-RPC koder

#### Navigationsrettelser (24+ filer opdateret)

**Hovedmodul READMEs**
 Nu linker til både første lektion OG næste modul

**02-Sikkerhed Undermapper**
- Alle 5 supplerende sikkerhedsdokumenter har nu "Hvad Nu" navigation:

**09-CaseStudy Filer**
- Alle case study filer har nu sekventiel navigation:

**10-StreamliningAI Labs**
Tilføjet sektion for Hvad Nu til Modul 10 oversigt og Modul 11

#### Kode- og Indholdsrettelser

**SDK og Afhængighedsopdateringer**
Rettet tom openai version til `^4.95.0`
Opdateret SDK fra `^1.8.0` til `>=1.26.0`
Opdateret mcp versions-pins til `>=1.26.0`

**Kodefejlrettelser**
Rettet ugyldig model `gpt-4o-mini` til `gpt-4.1-mini`

**Indholdsrettelser**
Rettet ødelagt link `READMEmd` → `README.md`, rettet curriculum overskrift `Module 1-3` → `Module 0-3`, rettet case-sensitiv sti
Fjernet korrumperet duplikeret Case Study 5 indhold

**Forbedringer til Begyndervejledning**
Tilføjet ordentlig introduktion, læringsmål og forudsætninger for begyndere

#### Curriculum Opdateringer

**Hoved README.md**
- Tilføjet poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) til curriculum tabel

**Modul READMEs**
Tilføjet lektioner 12 og 13 til lektionslisten
Tilføjet Praktiske Guider sektion med pagination link
Tilføjet lektioner 5.15 (Custom Transport) og 5.16 (Protocol Features)

**study_guide.md**
- Opdateret mindmap med alle nye emner: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## 28. januar 2026

### MCP Specifikation 2025-11-25 Overholdelsesgennemgang

#### Kernebegrebsforbedring (01-CoreConcepts/)
- **Ny Client Primitiv - Roots**: Tilføjet omfattende dokumentation om Roots client-primitive, som gør det muligt for servere at forstå filsystemgrænser og adgangstilladelser
- **Værktøjsannoteringer**: Tilføjet dokumentation om annoteringer af værktøjsadfærd (`readOnlyHint`, `destructiveHint`) til bedre beslutninger omkring værktøjsudførelse
- **Værktøjskald i Sampling**: Opdateret Sampling dokumentation for at inkludere `tools` og `toolChoice` parametre til model-drevet værktøjskald under sampling-anmodninger
- **URL-tilstand Elicitering**: Tilføjet dokumentation om URL-baseret elicitering til server-initierede eksterne webinteraktioner
- **Opgaver (Eksperimentel)**: Tilføjet ny sektion for dokumentation af den eksperimentelle Opgavefunktion til holdbare eksekveringswrappere og udsat resultatindsamling
- **Ikonsupport**: Noteret at værktøjer, ressourcer, ressource-skabeloner og prompts nu kan inkludere ikoner som yderligere metadata

#### Dokumentationsopdateringer
- **README.md**: Tilføjet MCP Specifikation 2025-11-25 versionshenvisning og datobaseret versioneringsforklaring
- **study_guide.md**: Opdateret curriculum-kort til at inkludere Opgaver og Værktøjsannoteringer i Kernebegreber sektionen; opdateret dokumentets tidsstempel

#### Overholdelsesverificering af Specifikation
- **Protokolversion**: Verificeret at al dokumentation refererer til nuværende MCP Specifikation 2025-11-25
- **Arkitekturjustering**: Bekræftet nøjagtighed af to-lags arkitektur (Data Layer + Transport Layer) dokumentation
- **Primitivdokumentation**: Valideret server-primitiver (Resources, Prompts, Tools) og client-primitiver (Sampling, Elicitation, Logging, Roots)
- **Transportmekanismer**: Verificeret STDIO og Streamable HTTP transport dokumentation
- **Sikkerhedsanvisninger**: Bekræftet overensstemmelse med gældende MCP Security Best Practices dokumentation

#### Centrale MCP 2025-11-25 Funktioner Dokumenteret
- **OpenID Connect Discovery**: Auth server opdagelse gennem OIDC
- **OAuth Client ID Metadata Dokumenter**: Anbefalet klientregistreringsmekanisme
- **JSON Schema 2020-12**: Standard dialekt for MCP skemadefinitioner
- **SDK Tiering System**: Formaliserede krav til SDK funktionalitets-understøttelse og vedligeholdelse
- **Governance Struktur**: Formaliserede Arbejdsgrupper og Interessegrupper i MCP governance

### Stor Opdatering af Sikkerhedsdokumentation (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integration
- **Nyt Hands-On Træningsmateriale**: Tilføjet omfattende integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i al sikkerhedsdokumentation
- **Ekspeditionens Rute Beskrivelse**: Dokumenteret komplet camp-til-camp progression fra Base Camp til Summit
- **OWASP Tilføjelse**: Al sikkerhedsguidance stemmer nu overens med OWASP MCP Azure Security Guide risici

#### OWASP MCP Top 10 Integration
- **Ny Sektion**: Tilføjet OWASP MCP Top 10 sikkerhedsrisikotabel med Azure-mitigeringer til hoved Security README
- **Risiko-baseret Dokumentation**: Opdateret mcp-security-controls-2025.md med OWASP MCP risikoreferencer for hvert sikkerhedsområde
- **Referencearkitektur**: Linket til OWASP MCP Azure Security Guide referencearkitektur og implementeringsmønstre

#### Opdaterede Sikkerhedsfiler
- **README.md**: Tilføjet Sherpa Workshop oversigt, ekspeditionsrutetabel, OWASP MCP Top 10 risikosammendrag, og hands-on træningssektion
- **mcp-security-controls-2025.md**: Opdateret header til februar 2026, tilføjet OWASP risikoreferencer (MCP01-MCP08), rettet versionsinkonsistens
- **mcp-security-best-practices-2025.md**: Tilføjet Sherpa og OWASP ressourcer sektion, opdateret tidsstip
- **mcp-best-practices.md**: Tilføjet hands-on træningssektion med Sherpa og OWASP links
- **azure-content-safety-implementation.md**: Tilføjet OWASP MCP06 reference, Sherpa Camp 3 tilpasning, og yderligere ressourcer sektion

#### Nye Ressourcelinks Tilføjet
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuelle OWASP MCP risiko-sider (MCP01-MCP10)

### Curriculum-Bred MCP Specifikation 2025-11-25 Justering

#### Modul 03 - Kom Godt I Gang
- **SDK Dokumentation**: Tilføjet Go SDK til officiel SDK-liste; opdateret alle SDK referencer til MCP Specifikation 2025-11-25
- **Transportafklaring**: Opdateret STDIO og HTTP Streaming transportbeskrivelser med eksplicitte spec-henvisninger

#### Modul 04 - Praktisk Implementering
- **SDK Opdateringer**: Tilføjet Go SDK; opdateret SDK-liste med specifikationsversionshenvisning
- **Autorisation Spec**: Opdateret MCP Autorisation specifikationslink til nuværende 2025-11-25 version

#### Modul 05 - Avancerede Emner
- **Nye Funktioner**: Tilføjet note om nye MCP Specifikation 2025-11-25 funktioner (Opgaver, Værktøjsannoteringer, URL-tilstand Elicitering, Roots)
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop links til yderligere referencer

#### Modul 06 - Community Bidrag
- **SDK Liste**: Tilføjet Swift og Rust SDK’er; opdateret specifikationslink til 2025-11-25
- **Specifikationshenvisning**: Opdateret MCP Specifikationslink til direkte specifikations-URL

#### Modul 07 - Erfaringer fra Tidlig Adoption
- **Ressourceopdateringer**: Tilføjet MCP Specifikation 2025-11-25 link og OWASP MCP Top 10 til yderligere ressourcer

#### Modul 08 - Bedste Praksis
- **Versionsopdatering**: Opdateret MCP Specifikation henvisning til 2025-11-25
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 og Sherpa workshop til yderligere referencer

#### Modul 10 - Optimering af AI Workflows
- **Badge Opdatering**: Ændret MCP versionsbadge fra SDK-version (1.9.3) til specifikationsversion (2025-11-25)
- **Ressourcelinks**: Opdateret MCP Specifikationslink; tilføjet OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs  
- **Specifikationshenvisning**: Opdateret MCP Specifikationslink til 2025-11-25 version  
- **Sikkerhedsressourcer**: Tilføjet OWASP MCP Top 10 til officielle ressourcer

## 18. december 2025

### Opdatering af Sikkerhedsdokumentation - MCP Specifikation 2025-11-25

#### MCP Security Best Practices (02-Sikkerhed/mcp-best-practices.md) - Versionsopdatering
- **Protokolversionsopdatering**: Opdateret til at referere seneste MCP Specifikation 2025-11-25 (udgivet 25. november 2025)
  - Opdateret alle versionshenvisninger fra 2025-06-18 til 2025-11-25
  - Opdateret dokumentdato fra 18. august 2025 til 18. december 2025
  - Bekræftet at alle specifikations-URL’er peger på aktuel dokumentation
- **Indholdsvalidering**: Omfattende validering af sikkerhedsbest practices imod nyeste standarder
  - **Microsoft Sikkerhedsløsninger**: Bekræftet aktuelle termer og links for Prompt Shields (tidligere "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID og Azure Key Vault
  - **OAuth 2.1 Sikkerhed**: Bekræftet overensstemmelse med seneste OAuth sikkerhedsbest practices
  - **OWASP Standarder**: Valideret at OWASP Top 10 for LLMs referencer er aktuelle
  - **Azure Services**: Bekræftet alle Microsoft Azure dokumentationslinks og best practices
- **Standardoverensstemmelse**: Alle refererede sikkerhedsstandarder bekræftet aktuelle
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure sikkerheds- og compliance-rammer
- **Implementeringsressourcer**: Valideret alle implementeringsvejledningers links og ressourcer
  - Azure API Management autentificeringsmønstre
  - Microsoft Entra ID integrationsvejledninger
  - Azure Key Vault secrets management
  - DevSecOps pipelines og overvågningsløsninger

### Dokumentationskvalitetskontrol
- **Specifikationsoverholdelse**: Sikret at alle obligatoriske MCP sikkerhedskrav (MUST/MUST NOT) stemmer overens med seneste specifikation
- **Ressourceaktualitet**: Bekræftet at alle eksterne links til Microsoft dokumentation, sikkerhedsstandarder og implementeringsvejledninger er aktuelle
- **Best Practices Dækning**: Bekræftet omfattende dækning af autentificering, autorisation, AI-specifikke trusler, supply chain sikkerhed og enterprise mønstre

## 6. oktober 2025

### Udvidelse af Kom I Gang Sektion – Avanceret Serverbrug & Simpel Autentificering

#### Avanceret Serverbrug (03-GettingStarted/10-advanced)
- **Nyt Kapitel Tilføjet**: Introduceret en omfattende guide til avanceret MCP serverbrug, der dækker både almindelig og lavniveau serverarkitektur.
  - **Almindelig vs. Lavniveau Server**: Detaljeret sammenligning og kodeeksempler i Python og TypeScript for begge tilgange.
  - **Handler-baseret Design**: Forklaring af handler-baseret håndtering af værktøjer/ressourcer/prompts for skalerbare og fleksible serverimplementeringer.
  - **Praktiske Mønstre**: Virkelighedsnære scenarier hvor lavniveau servermønstre er fordelagtige for avancerede funktioner og arkitektur.

#### Simpel Autentificering (03-GettingStarted/11-simple-auth)
- **Nyt Kapitel Tilføjet**: Trin-for-trin vejledning til implementering af simpel autentificering i MCP servere.
  - **Auth Begreber**: Klar forklaring på autentificering vs. autorisation og håndtering af legitimationsoplysninger.
  - **Basic Auth Implementering**: Middleware-baserede autentificeringsmønstre i Python (Starlette) og TypeScript (Express) med kodeeksempler.
  - **Overgang til Avanceret Sikkerhed**: Vejledning i at starte med simpel auth og avancere til OAuth 2.1 og RBAC med referencer til avancerede sikkerhedsmoduler.

Disse tilføjelser giver praktisk, hands-on vejledning til at bygge mere robuste, sikre og fleksible MCP serverimplementeringer, der forbinder grundlæggende koncepter med avancerede produktionsmønstre.

## 29. september 2025

### MCP Server Database Integration Labs - Omfattende Hands-On Læringsvej

#### 11-MCPServerHandsOnLabs - Nyt komplet curriculum for databaseintegration  

- **Færdiggør 13-lab læringssti**: Tilføjet omfattende praktisk læseplan til opbygning af produktionsklare MCP-servere med PostgreSQL databaseintegration  
  - **Virkelighedsnær implementering**: Zava Retail analytics use case, der demonstrerer enterprise-grade mønstre  
  - **Struktureret læringsprogression**:  
    - **Labs 00-03: Grundlæggende** - Introduktion, Kernearkitektur, Sikkerhed & Multi-Tenancy, Miljøopsætning  
    - **Labs 04-06: Byg MCP-serveren** - Database design & skema, MCP-server implementering, værktøjsudvikling  
    - **Labs 07-09: Avancerede funktioner** - Semantisk søgeintegration, test & debugging, VS Code integration  
    - **Labs 10-12: Produktion & bedste praksis** - Udrulningsstrategier, overvågning & observabilitet, bedste praksis & optimering  
  - **Enterprise teknologier**: FastMCP framework, PostgreSQL med pgvector, Azure OpenAI embedding, Azure Container Apps, Application Insights  
  - **Avancerede funktioner**: Row Level Security (RLS), semantisk søgning, multi-tenant dataadgang, vektorembeddings, realtids overvågning  

#### Terminologistandardisering - Modul til Lab konvertering  
- **Omfattende dokumentationsopdatering**: Systematisk opdateret alle README-filer i 11-MCPServerHandsOnLabs til at bruge "Lab"-terminologi i stedet for "Modul"  
  - **Sektionstitler**: Opdateret "What This Module Covers" til "What This Lab Covers" på tværs af alle 13 labs  
  - **Indholdsbeskrivelser**: Ændret "This module provides..." til "This lab provides..." i hele dokumentationen  
  - **Læringsmål**: Opdateret "By the end of this module..." til "By the end of this lab..."  
  - **Navigation links**: Konverteret alle "Module XX:" henvisninger til "Lab XX:" i krydsreferencer og navigation  
  - **Færdiggørelsessporing**: Opdateret "After completing this module..." til "After completing this lab..."  
  - **Bevarede tekniske referencer**: Beholdt Python-modulreferencer i konfigurationsfiler (fx `"module": "mcp_server.main"`)  

#### Studieguideforbedring (study_guide.md)  
- **Visuelt læseplanskort**: Tilføjet ny sektion "11. Database Integration Labs" med omfattende visualisering af lab-struktur  
- **Repositorystruktur**: Opdateret fra ti til elleve hovedsektioner med detaljeret beskrivelse af 11-MCPServerHandsOnLabs  
- **Læringssti vejledning**: Forbedrede navigationsinstruktioner til dækning af sektioner 00-11  
- **Teknologidækning**: Tilføjet detaljer om FastMCP, PostgreSQL og Azure services integration  
- **Læringsudbytte**: Fremhævet udvikling af produktionsklare servere, databaseintegrationsmønstre og enterprise sikkerhed  

#### Forbedring af hoved-README struktur  
- **Lab-baseret terminologi**: Opdateret hoved-README.md i 11-MCPServerHandsOnLabs til konsekvent brug af "Lab" struktur  
- **Læringssti organisation**: Klar progression fra grundlæggende koncepter over avanceret implementering til produktion og udrulning  
- **Virkelighedsfokus**: Fokus på praktisk, hands-on læring med enterprise-mønstre og teknologier  

### Forbedringer af dokumentationskvalitet og konsistens  
- **Betoning af praktisk læring**: Understøttet praktisk, lab-baseret tilgang i hele dokumentationen  
- **Enterprise mønsterfokus**: Fremhævet produktionsklare implementeringer og enterprise sikkerhedsovervejelser  
- **Teknologiintegration**: Omfattende dækning af moderne Azure-tjenester og AI integrationsmønstre  
- **Læringsprogression**: Klar, struktureret sti fra grundlæggende koncepter til produktionsimplementering  

## 26. september 2025

### Forbedring af case studies - GitHub MCP Registry integration  

#### Case Studies (09-CaseStudy/) - Fokus på økosystemudvikling  
- **README.md**: Stor udvidelse med omfattende case study om GitHub MCP Registry  
  - **GitHub MCP Registry case study**: Ny omfattende case study, der undersøger GitHubs lancering af MCP Registry i september 2025  
    - **Problemanalyse**: Detaljeret undersøgelse af fragmenterede MCP-server opdagelses- og udrulningsudfordringer  
    - **Løsningsarkitektur**: GitHubs centraliserede registry-tilgang med ét-klik VS Code-installation  
    - **Forretningsmæssig effekt**: Målbare forbedringer i onboarding og udviklerproduktivitet  
    - **Strategisk værdi**: Fokus på modulær agentudrulning og tværværktøjs interoperabilitet  
    - **Økosystemudvikling**: Positionering som grundlæggende platform for agent-integration  
  - **Forbedret case study struktur**: Opdateret alle syv case studies med ens formatering og omfattende beskrivelser  
    - Azure AI Travel Agents: Emphasis på multi-agent orkestrering  
    - Azure DevOps Integration: Fokus på workflow-automatisering  
    - Real-Time Documentation Retrieval: Python-console klient implementering  
    - Interactive Study Plan Generator: Chainlit konversationsbaseret webapp  
    - In-Editor Documentation: VS Code og GitHub Copilot integration  
    - Azure API Management: Enterprise API integrationsmønstre  
    - GitHub MCP Registry: Økosystemudvikling og fællesskabsplatform  
  - **Omfattende konklusion**: Omskrevet konklusionssektion, der fremhæver syv case studies, der spænder over flere MCP-implementeringsdimensioner  
    - Enterprise Integration, Multi-Agent Orkestrering, Udviklerproduktivitet  
    - Økosystemudvikling, Uddannelsesanvendelser kategorisering  
    - Forbedret indsigt i arkitekturprincipper, implementeringsstrategier og bedste praksis  
    - Betoning af MCP som moden, produktionsklar protokol  

#### Opdateringer i studieguide (study_guide.md)  
- **Visuelt læseplanskort**: Opdateret mindmap til at inkludere GitHub MCP Registry i Case Studies sektionen  
- **Case study beskrivelse**: Forbedret fra generiske beskrivelser til detaljeret opdeling af syv omfattende case studies  
- **Repository struktur**: Opdateret sektion 10 til at afspejle omfattende case study dækning med specifikke implementeringsdetaljer  
- **Changelog integration**: Tilføjet 26. september 2025 entry, der dokumenterer GitHub MCP Registry tilføjelse og case study forbedringer  
- **Datoopdateringer**: Opdateret fodertidspunkt for at afspejle seneste revision (26. september 2025)  

### Forbedringer af dokumentationskvalitet  
- **Konsistensforbedring**: Standardiseret case study formatering og struktur på tværs af alle syv eksempler  
- **Omfattende dækning**: Case studies dækker nu enterprise, udviklerproduktivitet og økosystemudviklingsscenarier  
- **Strategisk positionering**: Forbedret fokus på MCP som grundlæggende platform for agentbaseret systemudrulning  
- **Ressourceintegration**: Opdaterede supplerende ressourcer med GitHub MCP Registry link  

## 15. september 2025

### Udvidelse af avancerede emner - Custom transports & Context engineering  

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Ny avanceret implementeringsvejledning  
- **README.md**: Fuldstændig implementeringsvejledning for brugerdefinerede MCP transportmekanismer  
  - **Azure Event Grid Transport**: Omfattende serverless eventdrevet transportimplementering  
    - Eksempler i C#, TypeScript og Python med Azure Functions integration  
    - Eventdreven arkitektur for skalerbare MCP-løsninger  
    - Webhook-modtagere og push-baseret beskedhåndtering  
  - **Azure Event Hubs Transport**: Højhastigheds streaming transportimplementering  
    - Realtids streaming kapaciteter til lav-latens scenarier  
    - Partitioneringsstrategier og checkpoint-styring  
    - Batching af beskeder og performanceoptimering  
  - **Enterprise integrationsmønstre**: Produktionsklare arkitektur-eksempler  
    - Distribueret MCP behandling på tværs af flere Azure Functions  
    - Hybrid transportarkitekturer, der kombinerer flere transporttyper  
    - Beskedholdbarhed, pålidelighed og fejlhåndteringsstrategier  
  - **Sikkerhed & overvågning**: Azure Key Vault integration og observabilitetsmønstre  
    - Managed identity autentificering og mindst privilegeret adgang  
    - Application Insights telemetri og performanceovervågning  
    - Circuit breakers og fejltolerancemønstre  
  - **Test frameworks**: Omfattende teststrategier for brugerdefinerede transports  
    - Unit testing med test doubles og mocking frameworks  
    - Integrationstests med Azure Test Containers  
    - Performance- og belastningstestovervejelser  

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Fremvoksende AI disciplin  
- **README.md**: Omfattende udforskning af context engineering som et fremvoksende felt  
  - **Kerneprincipper**: Fuldstændig kontekstdeling, beslutningsbevidsthed i handling, og kontekst-vindue håndtering  
  - **MCP protokol-tilpasning**: Hvordan MCP-designet adresserer udfordringer i context engineering  
    - Begrænsninger i kontekst-vinduer og progressive load strategier  
    - Relevansbestemmelse og dynamisk konteksthentning  
    - Multimodal kontekstbehandling og sikkerhedsovervejelser  
  - **Implementeringstilgange**: Enkelttrådet vs. multi-agent arkitekturer  
    - Kontekstopdeling (chunking) og prioriteringsteknikker  
    - Progressiv kontekstloading og komprimeringsstrategier  
    - Lagdelte konteksttilgange og hentningsoptimering  
  - **Måleframework**: Fremvoksende metrikker til evaluering af konteksteffektivitet  
    - Inputeffektivitet, performance, kvalitet og brugeroplevelse overvejelser  
    - Eksperimentelle tilgange til kontekstoptimering  
    - Fejlanalyse og forbedringsmetoder  

#### Opdateringer i curriculum navigation (README.md)  
- **Forbedret modulstruktur**: Opdateret læseplanstabel til at inkludere nye avancerede emner  
  - Tilføjet Context Engineering (5.14) og Custom Transport (5.15) poster  
  - Ensartet formatering og navigationslinks på tværs af alle moduler  
  - Opdaterede beskrivelser for at afspejle aktuelt indholdsomfang  

### Forbedringer i mappe-/biblioteksstruktur  
- **Navnestandardisering**: Omdøbt "mcp transport" til "mcp-transport" for konsistens med andre avancerede emne-mapper  
- **Indholdsorganisering**: Alle 05-AdvancedTopics mapper følger nu konsistent navngivningsmønster (mcp-[emne])  

### Forbedringer i dokumentationskvalitet  
- **MCP specifikationsensoverensstemmelse**: Alt nyt indhold refererer til gældende MCP Specification 2025-06-18  
- **Multisprogseksempler**: Omfattende kodeeksempler i C#, TypeScript og Python  
- **Enterprise fokus**: Produktionsklare mønstre og Azure cloud-integration gennemgående  
- **Visuel dokumentation**: Mermaid diagrammer til arkitektur- og flowvisualisering  

## 18. august 2025

### Omfattende dokumentationsopdatering - MCP 2025-06-18 standarder  

#### MCP sikkerhed bedste praksis (02-Security/) - Fuld modernisering  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fuld omskrivning i overensstemmelse med MCP Specification 2025-06-18  
  - **Obligatoriske krav**: Tilføjet eksplicitte SKAL/MÅ IKKE krav fra officiel specifikation med klare visuelle indikatorer  
  - **12 kerne sikkerhedspraksis**: Omstruktureret fra 15-punkts liste til omfattende sikkerhedsdomaener  
    - Token security & autentificering med integration til ekstern identitetsudbyder  
    - Session management & transport security med kryptografiske krav  
    - AI-specifik trusselsbeskyttelse med Microsoft Prompt Shields integration  
    - Adgangskontrol & tilladelser med princippet om mindst privilegium  
    - Indholdssikkerhed & overvågning med Azure Content Safety integration  
    - Supply chain sikkerhed med omfattende komponentverifikation  
    - OAuth sikkerhed & Confused Deputy forebyggelse med PKCE-implementering  
    - Incident response & recovery med automatiserede kapaciteter  
    - Compliance & governance med regulatorisk tilpasning  
    - Avancerede sikkerhedskontroller med zero trust arkitektur  
    - Microsoft sikkerhedsøkosystem integration med omfattende løsninger  
    - Kontinuerlig sikkerhedsudvikling med adaptive praksisser  
  - **Microsoft sikkerhedsløsninger**: Forbedret integrationsvejledning for Prompt Shields, Azure Content Safety, Entra ID og GitHub Advanced Security  
  - **Implementeringsressourcer**: Kategoriserede omfattende ressourcelinks efter officiel MCP-dokumentation, Microsoft sikkerhedsløsninger, sikkerhedsstandarder og implementeringsvejledninger  

#### Avancerede sikkerhedskontroller (02-Security/) - Enterprise implementering  
- **MCP-SECURITY-CONTROLS-2025.md**: Fuldstændig revision med enterprise-grade sikkerhedsramme  
  - **9 omfattende sikkerhedsdomaener**: Udvidet fra grundlæggende kontroller til detaljeret enterprise rammeværk  
    - Avanceret autentificering & autorisation med Microsoft Entra ID integration  
    - Token security & anti-passthrough kontroller med omfattende validering  
    - Session sikkerhedskontroller med forebyggelse af kapring  
    - AI-specifikke sikkerhedskontroller mod prompt injection og tool poisoning  
    - Confused Deputy angrebsforebyggelse med OAuth proxy-sikkerhed  
    - Tool execution sikkerhed med sandboxing og isolation  
    - Supply chain sikkerhedskontroller med afhængighedsverifikation  
    - Overvågning & detektionskontroller med SIEM integration  
    - Incident response & recovery med automatiserede kapaciteter  
  - **Implementeringseksempler**: Tilføjet detaljerede YAML-konfigurationsblokke og kodeeksempler  
  - **Microsoft løsninger integration**: Omfattende dækning af Azure sikkerhedstjenester, GitHub Advanced Security og enterprise identitetsstyring  

#### Avancerede emner sikkerhed (05-AdvancedTopics/mcp-security/) - Produktionsklar implementering  
- **README.md**: Fuld omskrivning for enterprise sikkerhedsimplementering  
  - **Aktuel specifikationsjustering**: Opdateret til MCP Specification 2025-06-18 med obligatoriske sikkerhedskrav  
  - **Forbedret autentificering**: Microsoft Entra ID integration med omfattende .NET og Java Spring Security eksempler  
  - **AI sikkerhedsintegration**: Microsoft Prompt Shields og Azure Content Safety implementering med detaljerede Python eksempler  
  - **Avanceret trusselsdæmpning**: Omfattende implementeringseksempler for  
    - Confused Deputy angrebsforebyggelse med PKCE og bruger samtykkevalidering  
    - Token Passthrough forebyggelse med audience-validering og sikker tokenhåndtering  
    - Sessionkapring forebyggelse med kryptografisk binding og adfærdsanalyse  
  - **Enterprise sikkerhedsintegration**: Azure Application Insights overvågning, trusselsdetektions pipelines og supply chain sikkerhed  
  - **Implementeringstjekliste**: Klar skelnen mellem obligatoriske og anbefalede sikkerhedskontroller med Microsoft sikkerhedsøkosystemfordele  

### Dokumentationskvalitet & standardtilpasning  
- **Specifikationsreferencer**: Opdateret alle referencer til aktuelle MCP Specification 2025-06-18  
- **Microsoft sikkerhedsøkosystem**: Forbedret integrationsvejledning i hele sikkerhedsdokumentationen  
- **Praktisk implementering**: Tilføjet detaljerede kodeeksempler i .NET, Java og Python med enterprise mønstre  
- **Ressourceorganisering**: Omfattende kategorisering af officiel dokumentation, sikkerhedsstandarder og implementeringsvejledninger  
- **Visuelle indikatorer**: Klar markering af obligatoriske krav vs. anbefalede praksisser  

#### Kernekoncepter (01-CoreConcepts/) - Fuld modernisering  
- **Protokolversionsopdatering**: Opdateret til at referere den aktuelle MCP Specification 2025-06-18 med datobaseret versionering (YYYY-MM-DD format)  
- **Arkitekturforfining**: Forbedrede beskrivelser af Hosts, Clients og Servers til at afspejle aktuelle MCP arkitektur mønstre  
  - Hosts nu klart defineret som AI-applikationer, der koordinerer flere MCP-klientforbindelser
  - Klienter beskrevet som protokolforbindere, der opretholder én-til-én serverrelationer
  - Servere forbedret med lokale vs. fjern-udrulningsscenarier
- **Primær Omstrukturering**: Total omlægning af server- og klientprimitive
  - Server Primitive: Ressourcer (datakilder), Prompter (skabeloner), Værktøjer (udførbare funktioner) med detaljerede forklaringer og eksempler
  - Klient Primitive: Sampling (LLM-udfyldelser), Elicitering (brugerinput), Logging (debugging/overvågning)
  - Opdateret med aktuelle opdagelses- (`*/list`), hentnings- (`*/get`), og udførelses- (`*/call`) metode-mønstre
- **Protokolarkitektur**: Introduceret to-lags arkitekturmodel
  - Data-lag: JSON-RPC 2.0 grundlag med livscyklusstyring og primitive
  - Transport-lag: STDIO (lokal) og Streamable HTTP med SSE (fjern) transportmekanismer
- **Sikkerhedsrammeværk**: Omfattende sikkerhedsprincipper inklusive eksplicit brugeraccept, databeskyttelse, sikkerhed ved udførelse af værktøjer og transportsikkerhed
- **Kommunikationsmønstre**: Opdaterede protokolbeskeder til at vise initialiserings-, opdagelses-, udførelses- og notifikationsflows
- **Kodeeksempler**: Opfriskede eksempler i flere sprog (.NET, Java, Python, JavaScript) til at afspejle aktuelle MCP SDK-mønstre

#### Sikkerhed (02-Security/) - Omfattende Sikkerhedsrevurdering  
- **Overholdelse af Standarder**: Fuld overensstemmelse med MCP Specification 2025-06-18 sikkerhedskrav
- **Autentifikationsudvikling**: Dokumenteret udvikling fra tilpassede OAuth-servere til ekstern identitetsudbyderdelegering (Microsoft Entra ID)
- **AI-specifik Trusselanalyse**: Forbedret dækning af moderne AI-angrebsmønstre
  - Detaljerede scenarier for prompt injection angreb med virkelighedsnære eksempler
  - Mekanismer for værktøjsforgiftning og "rug pull"-angrebsmønstre
  - Forgiftning af kontekstvinduer og modelforvirringsangreb
- **Microsoft AI Sikkerhedsløsninger**: Omfattende dækning af Microsofts sikkerhedsøkosystem
  - AI Prompt Shields med avanceret detektion, spotlighting og delimiterteknikker
  - Azure Content Safety integrationsmønstre
  - GitHub Advanced Security til beskyttelse af forsyningskæder
- **Avanceret Trusselsmitigation**: Detaljerede sikkerhedskontroller for
  - Session hijacking med MCP-specifikke angrebsscenarier og kryptografiske session-ID-krav
  - Problemer med forvirrede betroede parter i MCP proxy-scenarier med eksplicitte acceptkrav
  - Token-gennemgangssårbarheder med obligatoriske valideringskontroller
- **Forsyningskæde Sikkerhed**: Udvidet dækning af AI-forsyningskæder inklusiv foundation-modeller, embeddings-services, kontekstudbydere og tredjeparts-API’er
- **Foundation Sikkerhed**: Forbedret integration med virksomheders sikkerhedsmønstre inklusive zero trust-arkitektur og Microsofts sikkerhedsøkosystem
- **Ressourceorganisation**: Kategoriserede omfattende ressourcelinks efter type (Officielle dokumenter, standarder, forskning, Microsoft-løsninger, implementeringsvejledninger)

### Dokumentationskvalitetsforbedringer
- **Strukturerede Læringsmål**: Forbedrede læringsmål med specifikke, handlingsorienterede resultater
- **Krydsreferencer**: Tilføjet links mellem relaterede sikkerheds- og kernebegrebs-emner
- **Aktuelle Oplysninger**: Opdateret alle datoreferencer og specifikationslinks til gældende standarder
- **Implementeringsvejledning**: Tilføjet specifikke, handlingsorienterede implementeringsanvisninger gennem begge sektioner

## 16. juli 2025

### README og Navigationsforbedringer
- Fuldstændig redesign af pensumnavigationen i README.md
- Udskiftede `<details>` tags med mere tilgængeligt tabelbaseret format
- Oprettede alternative layoutmuligheder i ny folder "alternative_layouts"
- Tilføjede kortbaserede, fan-estil og akkordeon-stil navigationseksempler
- Opdaterede repositoriets strukturafsnit til at inkludere alle seneste filer
- Forbedrede afsnittet "Sådan bruger du dette pensum" med klare anbefalinger
- Opdaterede MCP-specifikationslinks til korrekte URL’er
- Tilføjede afsnit om Context Engineering (5.14) til pensumstruktur

### Studievejledning Opdateringer
- Fuldstændigt revideret studievejledningen for at tilpasse sig nuværende repositoriekonstruktion
- Tilføjede nye afsnit for MCP Klienter og Værktøjer, og Populære MCP Servere
- Opdaterede det visuelle pensumkort til nøjagtigt at afspejle alle emner
- Forbedrede beskrivelser af Avancerede Emner for at omfatte alle specialiserede områder
- Opdaterede Case Studies-sektionen til at afspejle faktiske eksempler
- Tilføjede denne omfattende ændringslog

### Community Bidrag (06-CommunityContributions/)
- Tilføjede detaljerede oplysninger om MCP-servere til billedgenerering
- Tilføjede omfattende afsnit om brug af Claude i VSCode
- Tilføjede Cline terminal klient opsætning og brugsanvisning
- Opdaterede MCP-klientafsnittet til at inkludere alle populære klientmuligheder
- Forbedrede bidragseksempler med mere præcise kodeeksempler

### Avancerede Emner (05-AdvancedTopics/)
- Organiseret alle specialiserede emnemapper med konsekvent navngivning
- Tilføjede materiale og eksempler om context engineering
- Tilføjede dokumentation om Foundry-agent integration
- Forbedrede dokumentation om Entra ID sikkerhedsintegration

## 11. juni 2025

### Oprindelig Oprettelse
- Udgav første version af MCP for Beginners pensum
- Oprettede grundstruktur for alle 10 hovedsektioner
- Implementerede visuelt pensumkort for navigation
- Tilføjede indledende eksempelprojekter i flere programmeringssprog

### Kom Godt I Gang (03-GettingStarted/)
- Skabte første serverimplementeringseksempler
- Tilføjede vejledning til klientudvikling
- Inkluderede LLM klientintegrationsinstruktioner
- Tilføjede VS Code integrationsdokumentation
- Implementerede Server-Sent Events (SSE) servereksempler

### Kernebegreber (01-CoreConcepts/)
- Tilføjede detaljeret forklaring af klient-server arkitektur
- Skabte dokumentation for nøgleprotokolkomponenter
- Dokumenterede beskedmønstre i MCP

## 23. maj 2025

### Repositoriets Struktur
- Initialiserede repositoriet med grundlæggende mappestruktur
- Oprettede README-filer for hver hovedsektion
- Opsatte oversættelsesinfrastruktur
- Tilføjede billedressourcer og diagrammer

### Dokumentation
- Oprettede indledende README.md med oversigt over pensum
- Tilføjede CODE_OF_CONDUCT.md og SECURITY.md
- Opsatte SUPPORT.md med vejledning til hjælp
- Oprettede foreløbig studievejledningsstruktur

## 15. april 2025

### Planlægning og Rammeværk
- Indledende planlægning for MCP for Beginners pensum
- Definerede læringsmål og målgruppe
- Skitserede 10-sektionsstrukturen for pensum
- Udviklede konceptuelt rammeværk for eksempler og case-studier
- Skabte indledende prototypeeksempler for nøglebegreber

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets modersmål bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der måtte opstå som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->