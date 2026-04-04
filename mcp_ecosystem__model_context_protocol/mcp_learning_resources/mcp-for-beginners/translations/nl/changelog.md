# Changelog: MCP voor Beginners Curriculum

Dit document dient als een registratie van alle belangrijke wijzigingen die zijn aangebracht aan het Model Context Protocol (MCP) voor Beginners curriculum. Wijzigingen worden gedocumenteerd in omgekeerde chronologische volgorde (nieuwste wijzigingen eerst).

## 5 februari 2026

### Verbeteringen in Repositorium-brede Validatie en Navigatie

#### Nieuwe Curriculum Inhoud Toegevoegd

**Module 03 - Aan de Slag**
- **12-mcp-hosts/README.md**: Nieuwe uitgebreide gids voor het opzetten van MCP hosts
  - Voorbeelden van configuratie voor Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON configuratiesjablonen voor alle grote hosts
  - Vergelijkingstabel transporttypes (stdio, SSE/HTTP, WebSocket)
  - Problemen met verbinding oplossen
  - Beveiligingsrichtlijnen voor hostconfiguratie

- **13-mcp-inspector/README.md**: Nieuwe debug gids voor MCP Inspector
  - Installatiemethoden (npx, npm global, vanaf bron)
  - Verbinding maken met servers via stdio en HTTP/SSE
  - Testtools, bronnen en prompt workflows
  - VS Code integratie met MCP Inspector
  - Veelvoorkomende debug scenario’s met oplossingen

**Module 04 - Praktische Implementatie**
- **pagination/README.md**: Nieuwe gids voor paginering implementatie
  - Cursor-gebaseerde paginering patronen in Python, TypeScript, Java
  - Client-side paginering afhandeling
  - Cursor ontwerp strategieën (opaque vs. gestructureerd)
  - Aanbevelingen voor prestatieoptimalisatie

**Module 05 - Geavanceerde Onderwerpen**
- **mcp-protocol-features/README.md**: Nieuwe diepgaande beschrijving van protocolfeatures
  - Implementatie van voortgangsnotificaties
  - Patronen voor annulering van verzoeken
  - Resourcesjablonen met URI-patronen
  - Server lifecyclebeheer
  - Controleniveau’s van logging
  - Foutafhandelingspatronen met JSON-RPC codes

#### Navigatiefixes (24+ bestanden bijgewerkt)

**Hoofdmodule README’s**
 Nu links naar zowel eerste les ALS volgende module

**02-Security Sub-bestanden**
- Alle 5 aanvullende beveiligingsdocumenten hebben nu "Wat Nu" navigatie:

**09-CaseStudy Bestanden**
- Alle case study bestanden hebben nu opeenvolgende navigatie:

**10-StreamliningAI Labs**
Toegevoegd "Wat Nu" sectie aan Module 10 overzicht en Module 11

#### Code- en Contentfixes

**SDK en Dependency Updates**
Lege openai versie gefixed naar `^4.95.0`
SDK geüpdatet van `^1.8.0` naar `>=1.26.0`
MCP versie pins geüpdatet naar `>=1.26.0`

**Code Fixes**
Ongeldig model `gpt-4o-mini` gefixed naar `gpt-4.1-mini`

**Content Fixes**
Gebroken link `READMEmd` → `README.md` gefixed, curriculum header `Module 1-3` → `Module 0-3` gefixed, hoofdlettergevoelige pad gefixed
Gecorrumpeerde dubbele content Case Study 5 verwijderd

**Beginnershandleiding Verbeteringen**
Juiste introductie, leerdoelen en vereisten toegevoegd voor beginners

#### Curriculum Updates

**Hoofd README.md**
- Toegevoegd entries 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protocol Features) aan curriculum tabel

**Module README’s**
Toegevoegd lessen 12 en 13 aan leslijst
Toegevoegd sectie Praktische Gidsen met paginering link
Toegevoegd lessen 5.15 (Custom Transport) en 5.16 (Protocol Features)

**study_guide.md**
- Mindmap bijgewerkt met alle nieuwe onderwerpen: MCP Hosts Setup, MCP Inspector, Paginering Strategieën, Protocol Features Diepgaande beschrijving

## 28 januari 2026

### MCP Specificatie 2025-11-25 Compliance Review

#### Verbetering kernconcepten (01-CoreConcepts/)
- **Nieuwe Client Primitief - Roots**: Uitgebreide documentatie toegevoegd over de Roots client primitief, waarmee servers bestandssysteemgrenzen en toegangstoestemmingen kunnen begrijpen
- **Tool Annotaties**: Documentatie toegevoegd over tool gedragsannotaties (`readOnlyHint`, `destructiveHint`) voor betere tool-uitvoeringsbeslissingen
- **Tool Aanroepen in Sampling**: Sampling documentatie bijgewerkt met parameters `tools` en `toolChoice` voor model-gedreven tool-aanroepen tijdens sampling-verzoeken
- **URL Mode Elicitation**: Documentatie toegevoegd over URL-gebaseerde elicitation voor server-geïnitieerde externe webinteracties
- **Tasks (Experimenteel)**: Nieuwe sectie toegevoegd die de experimentele Tasks feature documenteert voor duurzame uitvoering wrappers en uitgestelde resultaatsopvraging
- **Iconen Ondersteuning**: Opgemerkt dat tools, resources, resourcesjablonen en prompts nu iconen als aanvullende metadata kunnen bevatten

#### Documentatie Updates
- **README.md**: MCP Specificatie 2025-11-25 versie verwijzing en datum-gebaseerde versionering toegevoegd
- **study_guide.md**: Curriculumkaart bijgewerkt om Tasks en Tool Annotaties toe te voegen aan kernconcepten sectie; document tijdstempel geüpdatet

#### Specificatie Compliance Verificatie
- **Protocol Versie**: Bevestigd dat alle documentatie verwijst naar MCP Specificatie 2025-11-25
- **Architectuur Uitlijning**: Bevestigd dat de tweelaagse architectuur (Data Layer + Transport Layer) correct wordt gedocumenteerd
- **Primitieven Documentatie**: Validators serverprimitieven (Resources, Prompts, Tools) en clientprimitieven (Sampling, Elicitation, Logging, Roots)
- **Transport Mechanismen**: Bevestigde documentatie van STDIO en Streamable HTTP transport correctheid
- **Beveiligingsrichtlijnen**: Bevestigde alignering met huidige MCP Security Best Practices documentatie

#### Belangrijke MCP 2025-11-25 Features Gedocumenteerd
- **OpenID Connect Discovery**: Auth server discovery via OIDC
- **OAuth Client ID Metadata Documenten**: Aanbevolen cliëntregistratiemechanisme
- **JSON Schema 2020-12**: Standaard dialect voor MCP schema-definities
- **SDK Tiering Systeem**: Formele eisen voor SDK feature ondersteuning en onderhoud
- **Governance Structuur**: Formele werkgroepen en interestgroepen in MCP governance

### Grote Update Beveiligingsdocumentatie (02-Security/)

#### MCP Security Summit Workshop (Sherpa) Integratie
- **Nieuwe Praktijkgerichte Trainingsbron**: Uitgebreide integratie toegevoegd met de [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) door alle beveiligingsdocumentatie heen
- **Expeditieroute Dekking**: Documentatie van volledige route van Base Camp tot Summit
- **OWASP Alignering**: Alle beveiligingsrichtlijnen nu afgebeeld naar OWASP MCP Azure Security Guide risico's

#### OWASP MCP Top 10 Integratie
- **Nieuwe Sectie**: Toegevoegd OWASP MCP Top 10 Beveiligingsrisico tabel met Azure mitigaties aan hoofdbeveiligings-README
- **Risicogerichte Documentatie**: Bijgewerkt mcp-security-controls-2025.md met OWASP MCP risico verwijzingen per beveiligingsdomein
- **Referentie Architectuur**: Gelinkt aan OWASP MCP Azure Security Guide referentiearchitectuur en implementatiepatronen

#### Bijgewerkte Beveiligingsbestanden
- **README.md**: Overzicht Sherpa Workshop, expeditieroute tabel, OWASP MCP Top 10 risico’s samenvatting en hands-on trainingssectie toegevoegd
- **mcp-security-controls-2025.md**: Header bijgewerkt naar februari 2026, OWASP risico verwijzingen (MCP01-MCP08) toegevoegd, specificatieversie inconsistentie gefixed
- **mcp-security-best-practices-2025.md**: Sherpa en OWASP bronnen sectie toegevoegd, tijdstempel bijgewerkt
- **mcp-best-practices.md**: Hands-on trainingssectie met Sherpa en OWASP links toegevoegd
- **azure-content-safety-implementation.md**: OWASP MCP06 verwijzing, Sherpa Camp 3 alignering, en aanvullende bronnen sectie toegevoegd

#### Nieuwe Resource Links Toegevoegd
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuele OWASP MCP risicopagina’s (MCP01-MCP10)

### Curriculum-Brede MCP Specificatie 2025-11-25 Afstemming

#### Module 03 - Aan de Slag
- **SDK Documentatie**: Go SDK toegevoegd aan officiële SDK lijst; alle SDK verwijzingen bijgewerkt om te aligneren met MCP Specificatie 2025-11-25
- **Transport Verduidelijking**: Beschrijvingen van STDIO en HTTP Streaming transport geüpdatet met expliciete spec verwijzingen

#### Module 04 - Praktische Implementatie
- **SDK Updates**: Go SDK toegevoegd; SDK lijst bijgewerkt met specificatie versie verwijzing
- **Authorisatie Spec**: MCP Authorisatie specificatie link geüpdatet naar huidige 2025-11-25 versie

#### Module 05 - Geavanceerde Onderwerpen
- **Nieuwe Features**: Opmerking toegevoegd over nieuwe MCP Specificatie 2025-11-25 features (Tasks, Tool Annotaties, URL Mode Elicitation, Roots)
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop links toegevoegd aan aanvullende referenties

#### Module 06 - Community Bijdragen
- **SDK Lijst**: Swift en Rust SDK’s toegevoegd; specificatielink geüpdatet naar 2025-11-25
- **Spec Reference**: MCP Specificatie link geüpdatet naar directe specificatie URL

#### Module 07 - Lessen uit Vroege Adoptie
- **Resource Updates**: MCP Specificatie 2025-11-25 link en OWASP MCP Top 10 toegevoegd aan aanvullende resources

#### Module 08 - Best Practices
- **Spec Versie**: MCP Specificatie verwijzing geüpdatet naar 2025-11-25
- **Beveiligingsbronnen**: OWASP MCP Top 10 en Sherpa workshop toegevoegd aan aanvullende referenties

#### Module 10 - Stroomlijnen van AI Workflows
- **Badge Update**: MCP versie badge gewijzigd van SDK versie (1.9.3) naar specificatieversie (2025-11-25)
- **Resource Links**: MCP Specificatie link bijgewerkt; OWASP MCP Top 10 toegevoegd

#### Module 11 - MCP Server Hands-On Labs
- **Spec Referentie**: MCP Specificatie link geüpdatet naar 2025-11-25 versie
- **Beveiligingsbronnen**: OWASP MCP Top 10 toegevoegd aan officiële resources

## 18 december 2025

### Update Beveiligingsdocumentatie - MCP Specificatie 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Specificatie Versie Update
- **Protocol Versie Update**: Bijgewerkt naar verwijzing naar laatste MCP Specificatie 2025-11-25 (uitgegeven 25 november 2025)
  - Alle specificatieversieverwijzingen bijgewerkt van 2025-06-18 naar 2025-11-25
  - Document datumverwijzingen geüpdatet van 18 augustus 2025 naar 18 december 2025
  - Bevestigd dat alle specificatie-URL’s naar actuele documentatie wijzen
- **Contentvalidatie**: Uitgebreide validatie van beveiligingsbest practices tegen nieuwste standaarden
  - **Microsoft Security Oplossingen**: Controle op actuele terminologie en links voor Prompt Shields (voorheen "Jailbreak risico detectie"), Azure Content Safety, Microsoft Entra ID en Azure Key Vault
  - **OAuth 2.1 Beveiliging**: Bevestigde alignering met nieuwste OAuth beveiligingsbest practices
  - **OWASP Standaarden**: Controle dat OWASP Top 10 voor LLMs verwijzingen actueel blijven
  - **Azure Diensten**: Controle van alle Microsoft Azure documentatie links en best practices
- **Standaarden Alignering**: Alle genoemde beveiligingsstandaarden als actueel bevestigd
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - OAuth 2.1 Security Best Practices
  - Azure beveiligings- en compliancekaders
- **Implementatiebronnen**: Bevestigde geldigheid van alle implementatiegids links en bronnen
  - Azure API Management authenticatiepatronen
  - Microsoft Entra ID integratiegidsen
  - Azure Key Vault geheime beheer
  - DevSecOps pijplijnen en monitoringoplossingen

### Documentatiekwaliteitscontrole
- **Specificatie Compliance**: Bevestigd dat alle verplichte MCP beveiligingseisen (MUST/MUST NOT) overeenkomen met laatste specificatie
- **Bronnen Actualiteit**: Bevestigd dat alle externe links naar Microsoft documentatie, beveiligingsstandaarden en implementatiegidsen actueel zijn
- **Best Practices Dekking**: Bevestigde volledige dekking van authenticatie, autorisatie, AI-specifieke dreigingen, supply chain beveiliging en enterprise patronen

## 6 oktober 2025

### Uitbreiding Aan de Slag Sectie – Geavanceerd Servergebruik & Eenvoudige Authenticatie

#### Geavanceerd Servergebruik (03-GettingStarted/10-advanced)
- **Nieuw Hoofdstuk Toegevoegd**: Uitgebreide gids geïntroduceerd voor geavanceerd MCP servergebruik, inclusief reguliere en laag-niveau serverarchitecturen.
  - **Reguliere vs. Laag-Niveau Server**: Gedetailleerde vergelijking en codevoorbeelden in Python en TypeScript voor beide benaderingen.
  - **Handler-gebaseerd Ontwerp**: Uitleg over handler-gebaseerd beheer van tools/resources/prompts voor schaalbare, flexibele serverimplementaties.
  - **Praktische Patronen**: Praktijkscenario’s waarin laag-niveau serverpatronen voordelig zijn voor geavanceerde functies en architectuur.

#### Eenvoudige Authenticatie (03-GettingStarted/11-simple-auth)
- **Nieuw Hoofdstuk Toegevoegd**: Stapsgewijze gids voor het implementeren van eenvoudige authenticatie in MCP servers.
  - **Auth Concepten**: Duidelijke uitleg over authenticatie vs. autorisatie en het beheer van credentials.
  - **Basale Auth Implementatie**: Middleware-gebaseerde authenticatiepatronen in Python (Starlette) en TypeScript (Express), met codevoorbeelden.
  - **Overgang naar Geavanceerde Beveiliging**: Richtlijnen om te starten met eenvoudige auth en door te groeien naar OAuth 2.1 en RBAC, met verwijzingen naar geavanceerde beveiligingsmodules.

Deze toevoegingen bieden praktische, hands-on begeleiding voor het bouwen van robuustere, veiligere en flexibelere MCP serverimplementaties en vormen een brug tussen fundamentele concepten en geavanceerde productiepatronen.

## 29 september 2025

### MCP Server Database Integratie Labs - Uitgebreid Hands-On Leertraject

#### 11-MCPServerHandsOnLabs - Nieuwe Volledige Database Integratie Curriculum
- **Complete 13-Lab Leertraject**: Uitgebreid praktijkgericht curriculum toegevoegd voor het bouwen van productieklare MCP-servers met PostgreSQL database-integratie
  - **Praktijkvoorbeeld uit de echte wereld**: Zava Retail analytics use case die patronen op ondernemingsniveau demonstreert
  - **Gestructureerde Leerprogressie**:
    - **Labs 00-03: Fundamenten** - Introductie, Kernarchitectuur, Beveiliging & Multi-Tenancy, Omgevingsopzet
    - **Labs 04-06: Het bouwen van de MCP Server** - Databaseontwerp & Schema, MCP Server Implementatie, Toolontwikkeling  
    - **Labs 07-09: Geavanceerde Functies** - Semantische Zoekintegratie, Testen & Debuggen, VS Code Integratie
    - **Labs 10-12: Productie & Best Practices** - Deploymentscenario’s, Monitoring & Observeerbaarheid, Best Practices & Optimalisatie
  - **Enterprise Technologieën**: FastMCP-framework, PostgreSQL met pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Geavanceerde Functionaliteiten**: Row Level Security (RLS), semantisch zoeken, multi-tenant data toegang, vector embeddings, realtime monitoring

#### Terminologiestandaardisatie - Module naar Lab Conversie
- **Uitgebreide Documentatie-update**: Systematisch alle README-bestanden in 11-MCPServerHandsOnLabs bijgewerkt naar "Lab"-terminologie in plaats van "Module"
  - **Sectiekoppen**: "What This Module Covers" vervangen door "What This Lab Covers" in alle 13 labs
  - **Inhoudsbeschrijving**: "This module provides..." gewijzigd in "This lab provides..." door de hele documentatie
  - **Leerdoelen**: "By the end of this module..." bijgewerkt naar "By the end of this lab..." 
  - **Navigatielinks**: Alle verwijzingen naar "Module XX:" omgezet naar "Lab XX:" in kruisverwijzingen en navigatie
  - **Volgtracking**: "After completing this module..." bijgewerkt naar "After completing this lab..."
  - **Behouden technische verwijzingen**: Python module verwijzingen in configuratiebestanden (bijv. `"module": "mcp_server.main"`) onveranderd gelaten

#### Verbetering Studiegids (study_guide.md)
- **Visuele Curriculumkaart**: Nieuwe sectie "11. Database Integration Labs" toegevoegd met uitgebreide visualisatie van de labstructuur
- **Repositorystructuur**: Bijgewerkt van tien naar elf hoofdsecties met gedetailleerde beschrijving van 11-MCPServerHandsOnLabs
- **Leertrajectinstructies**: Navigatie-instructies verbeterd om secties 00-11 te omvatten
- **Technologiedekking**: Details over FastMCP, PostgreSQL, en Azure-services integratie toegevoegd
- **Leerresultaten**: Nadruk op productieklare serverontwikkeling, database-integratiepatronen en enterprise-beveiliging

#### Verbetering hoofd README-structuur
- **Lab-gebaseerde terminologie**: Hoofd README.md in 11-MCPServerHandsOnLabs consequent aangepast naar "Lab" structuur
- **Leertrajectorganisatie**: Heldere progressie van fundamentele concepten via geavanceerde implementatie naar productie-deployments
- **Focus op echte praktijk**: Nadruk op praktische, hands-on learning met patronen en technologieën op ondernemingsniveau

### Verbeteringen documentatiekwaliteit en consistentie
- **Hands-On Leerbenadering**: Praktische, lab-gebaseerde aanpak versterkt in alle documentatie
- **Enterprise Patronen**: Productieklare implementaties en security-overwegingen voor ondernemingen benadrukt
- **Technologie-integratie**: Uitgebreide dekking van moderne Azure-diensten en AI-integratiepatronen
- **Leerprogressie**: Duidelijk, gestructureerd pad van basisconcepten naar productie-deployment

## 26 september 2025

### Uitbreiding Case Studies - GitHub MCP Registry Integratie

#### Case Studies (09-CaseStudy/) - Focus op Ecosysteemontwikkeling
- **README.md**: Grote uitbreiding met uitgebreide GitHub MCP Registry case study
  - **GitHub MCP Registry Case Study**: Nieuwe uitgebreide case study over de lancering van GitHub's MCP Registry in september 2025
    - **Probleemanalyse**: Gedetailleerde analyse van gefragmenteerde MCP-server ontdekking en deployment uitdagingen
    - **Oplossingsarchitectuur**: GitHub’s gecentraliseerde registry-benadering met één-klik VS Code installatie
    - **Zakelijke impact**: Meetbare verbeteringen in onboarding en productiviteit van ontwikkelaars
    - **Strategische waarde**: Focus op modulaire agent deployment en cross-tool interoperabiliteit
    - **Ecosysteemontwikkeling**: Positionering als fundamenteel platform voor agentische integratie
  - **Verbeterde Case Study Structuur**: Alle zeven case studies bijgewerkt met consistente opmaak en uitgebreide beschrijvingen
    - Azure AI Travel Agents: Multi-agent orchestratie focus
    - Azure DevOps Integratie: Workflow automatisering nadruk
    - Realtime Documentatieopvraging: Python console client implementatie
    - Interactieve Studieplangenerator: Chainlit conversational webapp
    - In-Editor Documentatie: VS Code en GitHub Copilot integratie
    - Azure API Management: Enterprise API integratiepatronen
    - GitHub MCP Registry: Ecosysteemontwikkeling en communityplatform
  - **Uitgebreide Conclusie**: Herschreven conclusie die zeven case studies beslaat met meerdere MCP-implementatiedimensies
    - Enterprise Integratie, Multi-Agent Orchestratie, Ontwikkelaarproductiviteit
    - Ecosysteemontwikkeling, Educatieve Toepassingen categorisatie
    - Verdiept inzicht in architectuurpatronen, implementatiestrategieën en best practices
    - Nadruk op MCP als volwassen, productieklare protocol

#### Updates Studiegids (study_guide.md)
- **Visuele Curriculumkaart**: Mindmap geüpdatet met GitHub MCP Registry in Case Studies sectie
- **Case Studies Beschrijving**: Van generieke omschrijvingen naar gedetailleerde onderverdeling van zeven uitgebreide case studies
- **Repositorystructuur**: Sectie 10 bijgewerkt voor uitgebreide case study coverage met specifieke implementatiedetails
- **Changelog Integratie**: Invoeging van 26 september 2025 voor GitHub MCP Registry toevoeging en case study verbeteringen
- **Datumupdates**: Footer timestamp geactualiseerd naar nieuwste revisiedatum (26 september 2025)

### Verbeteringen documentatiekwaliteit
- **Consistentieverbetering**: Gestandaardiseerde case study opmaak en structuur over alle zeven voorbeelden
- **Uitgebreide dekking**: Case studies beslaan nu enterprise-, ontwikkelaarproductiviteits- en ecosysteemontwikkelingsscenario’s
- **Strategische positionering**: Versterkte focus op MCP als fundamenteel platform voor agentische systeemdeployments
- **Bronintegratie**: Uitbreiding aanvullende bronnen met GitHub MCP Registry-link

## 15 september 2025

### Uitbreiding Geavanceerde Onderwerpen - Custom Transports & Context Engineering

#### MCP Custom Transports (05-AdvancedTopics/mcp-transport/) - Nieuwe Geavanceerde Implementatiehandleiding
- **README.md**: Volledige implementatiehandleiding voor aangepaste MCP-transportsystemen
  - **Azure Event Grid Transport**: Uitgebreide serverless event-gedreven transportimplementatie
    - C#, TypeScript en Python voorbeelden met Azure Functions integratie
    - Event-gedreven architectuurpatronen voor schaalbare MCP-oplossingen
    - Webhook ontvangers en push-gebaseerde berichtafhandeling
  - **Azure Event Hubs Transport**: Hoogdoorvoerstroom-transportimplementatie
    - Real-time streamingmogelijkheden voor lage-latentie scenario’s
    - Partitioneringsstrategieën en checkpointbeheer
    - Berichtaggregatie en prestatieoptimalisatie
  - **Enterprise Integratiepatronen**: Productieklare architectuurvoorbeelden
    - Gedistribueerde MCP-verwerking verdeeld over meerdere Azure Functions
    - Hybride transportarchitecturen die meerdere transporttypen combineren
    - Berichtduurzaamheid, betrouwbaarheid en foutafhandelingsstrategieën
  - **Beveiliging & Monitoring**: Azure Key Vault integratie en observeerbaarheidspatronen
    - Managed identity authenticatie en least privilege toegang
    - Application Insights telemetrie en prestatiemonitoring
    - Circuit breakers en fouttolerantiepatronen
  - **Testframeworks**: Uitgebreide teststrategieën voor aangepaste transports
    - Unit testen met testdoubles en mocking frameworks
    - Integratietesten met Azure Test Containers
    - Overwegingen voor prestatie- en load testing

#### Context Engineering (05-AdvancedTopics/mcp-contextengineering/) - Opkomende AI Discipline
- **README.md**: Uitgebreide verkenning van context engineering als opkomend vakgebied
  - **Kernprincipes**: Volledige contextdeling, bewustzijn van actiebeslissingen en contextwindowbeheer
  - **MCP Protocolafstemming**: Hoe MCP-ontwerp context engineering-uitdagingen adresseert
    - Beperkingen van contextwindows en progressieve laadstrategieën
    - Relevantiebepaling en dynamische contextopvraging
    - Multimodale contextverwerking en beveiligingsoverwegingen
  - **Implementatiebenaderingen**: Single-threaded versus multi-agent architecturen
    - Context-opdeling en prioriteringstechnieken
    - Progressieve contextladen en compressiestrategieën
    - Gelaagde contextbenaderingen en retrieval-optimalisatie
  - **Meetkader**: Opkomende metriek voor evaluatie van contexteffectiviteit
    - Inputefficiëntie, prestatie, kwaliteit en gebruikerservaringsoverwegingen
    - Experimentele benaderingen voor contextoptimalisatie
    - Faalsanalyse en verbeteringsmethodologieën

#### Updates Curriculumnavigatie (README.md)
- **Uitgebreide Module-structuur**: Curriculumtabel geüpdatet met nieuwe geavanceerde onderwerpen
  - Toegevoegd Context Engineering (5.14) en Custom Transport (5.15)
  - Consistente formatting en navigatielinks voor alle modules
  - Updates van omschrijvingen voor huidige inhoudsomvang

### Verbeteringen mappenstructuur
- **Naamgevingsstandaardisatie**: "mcp transport" hernoemd naar "mcp-transport" voor consistentie met andere geavanceerde onderwerpen mappen
- **Inhoudsorganisatie**: Alle 05-AdvancedTopics mappen volgen nu consequent het patroon mcp-[topic]

### Verbeteringen documentatiekwaliteit
- **MCP-specificatie-afstemming**: Alle nieuwe inhoud verwijst naar huidige MCP Specificatie 2025-06-18
- **Meertalige Voorbeelden**: Uitgebreide codevoorbeelden in C#, TypeScript en Python
- **Enterprise Focus**: Productieklare patronen en integratie met Azure cloud door het hele document
- **Visuele Documentatie**: Mermaid diagrammen voor architectuur en flow visualisatie

## 18 augustus 2025

### Uitgebreide documentatie-update - MCP 2025-06-18 standaard

#### MCP Beveiliging Best Practices (02-Security/) - Complete Modernisatie
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Volledige herschrijving afgestemd op MCP Specificatie 2025-06-18
  - **Verplichte Eisen**: Toevoeging expliciete MOET/MOET NIET vereisten uit de officiële specificatie met duidelijke visuele aanduidingen
  - **12 Kernbeveiligingspraktijken**: Herstructurering van 15-puntslijst naar uitgebreide beveiligingsdomeinen
    - Tokenbeveiliging & Authenticatie met integratie van externe identiteitprovider
    - Sessiebeheer & Transportbeveiliging met cryptografische eisen
    - AI-specifieke dreigingsbescherming met Microsoft Prompt Shields integratie
    - Toegangscontrole & Rechten met least privilege principe
    - Inhoudsveiligheid & Monitoring met Azure Content Safety integratie
    - Supply Chain Security met grondige componentverificatie
    - OAuth-beveiliging & Confused Deputy Preventie met PKCE implementatie
    - Incidentrespons & Herstel met geautomatiseerde mogelijkheden
    - Compliance & Governance met naleving van regelgeving
    - Geavanceerde beveiligingscontroles met zero trust architectuur
    - Microsoft beveiligingsecosysteem integratie met uitgebreide oplossingen
    - Continue beveiligingsevolutie met adaptieve praktijken
  - **Microsoft Beveiligingsoplossingen**: Versterkte integratierichtlijnen voor Prompt Shields, Azure Content Safety, Entra ID en GitHub Advanced Security
  - **Implementatiebronnen**: Geordende collectie van links naar officiële MCP-documentatie, Microsoft beveiligingsoplossingen, beveiligingsstandaarden en implementatiehandleidingen

#### Geavanceerde Beveiligingscontroles (02-Security/) - Enterprise-implementatie
- **MCP-SECURITY-CONTROLS-2025.md**: Volledige revisie met enterprise-grade beveiligingsraamwerk
  - **9 Uitgebreide Beveiligingsdomeinen**: Uitbreiding van basiscontroles naar gedetailleerd enterprise-framework
    - Geavanceerde authenticatie & autorisatie met Microsoft Entra ID integratie
    - Tokenbeveiliging & Anti-Passthrough-controles met uitgebreide validatie
    - Sessiebeveiligingscontroles met hijackpreventie
    - AI-specifieke beveiligingscontroles tegen promptinjectie en tool poisoning
    - Confused Deputy Attack Preventie met OAuth proxy beveiliging
    - Tooluitvoeringsbeveiliging met sandboxing en isolatie
    - Supply Chain Security-controles met dependency-verificatie
    - Monitoring & detectiecontroles met SIEM integratie
    - Incidentrespons & herstel met automatisering
  - **Implementatievoorbeelden**: Gedetailleerde YAML-configuratieblokken en codevoorbeelden toegevoegd
  - **Integratie Microsoft-oplossingen**: Uitgebreide dekking van Azure-beveiligingsdiensten, GitHub Advanced Security en enterprise identity management

#### Geavanceerde Onderwerpen Beveiliging (05-AdvancedTopics/mcp-security/) - Productieklare implementatie
- **README.md**: Volledige herschrijving voor enterprise security-implementatie
  - **Afstemming huidige specificatie**: Bijgewerkt naar MCP Specificatie 2025-06-18 met verplichte beveiligingseisen
  - **Versterkte authenticatie**: Microsoft Entra ID integratie met uitgebreide .NET en Java Spring Security voorbeelden
  - **AI-beveiligingsintegratie**: Microsoft Prompt Shields en Azure Content Safety implementatie met gedetailleerde Python voorbeelden
  - **Geavanceerde dreigingsmitigatie**: Uitgebreide implementatievoorbeelden voor
    - Preventie Confused Deputy-aanvallen met PKCE en gebruikersconsent validatie
    - Token-passthrough preventie met audience validatie en veilige tokenbeheer
    - Sessiekaping preventie met cryptografische binding en gedragsanalyse
  - **Enterprise beveiligingsintegratie**: Azure Application Insights monitoring, dreigingsdetectiepijplijnen en supply chain security
  - **Implementatiechecklist**: Duidelijke scheiding verplichte en aanbevolen beveiligingscontroles met voordelen van Microsoft beveiligingsecosysteem

### Verbeteringen documentatiekwaliteit & standaardenafstemming
- **Referenties aan specificatie**: Alle verwijzingen geüpdatet naar actuele MCP Specificatie 2025-06-18
- **Microsoft beveiligingsecosysteem**: Versterkte integratierichtlijnen door alle beveiligingsdocumentatie
- **Praktische implementatie**: Gedetailleerde codevoorbeelden in .NET, Java en Python met enterprisepatronen
- **Bronnenorganisatie**: Uitgebreide categorisering van officiële documentatie, beveiligingsstandaarden en implementatiehandleidingen
- **Visuele indicatoren**: Duidelijke markering van verplichte eisen versus aanbevolen praktijken


#### Kernconcepten (01-CoreConcepts/) - Volledige modernisatie
- **Protocolversie-update**: Bijgewerkt naar huidige MCP Specificatie 2025-06-18 met datum-gebaseerde versie (YYYY-MM-DD formaat)
- **Architectuurverfijning**: Verbeterde beschrijvingen van Hosts, Clients en Servers die huidige MCP architectuurpatronen weerspiegelen
  - Hosts nu duidelijk gedefinieerd als AI-toepassingen die meerdere MCP-clientverbindingen coördineren
  - Clients beschreven als protocol connectors die één-op-één serverrelaties onderhouden
  - Servers uitgebreid met lokale versus externe implementatiescenario's
- **Primitieve Herstructurering**: Volledige revisie van server- en clientprimitieven
  - Serverprimitieven: Resources (databronnen), Prompts (sjablonen), Tools (uitvoerbare functies) met gedetailleerde uitleg en voorbeelden
  - Clientprimitieven: Sampling (LLM-completies), Elicitation (gebruikersinvoer), Logging (debugging/monitoring)
  - Bijgewerkt met actuele discovery (`*/list`), retrieval (`*/get`) en uitvoering (`*/call`) methodenpatronen
- **Protocolarchitectuur**: Geïntroduceerd tweelagig architectuurmodel
  - Data Layer: JSON-RPC 2.0 basis met levenscyclusbeheer en primitieven
  - Transport Layer: STDIO (lokaal) en streamable HTTP met SSE (extern) transportmechanismen
- **Beveiligingskader**: Omvattende beveiligingsprincipes inclusief expliciete gebruikersinstemming, bescherming van gegevensprivacy, veiligheid bij tooluitvoering en transportlaagbeveiliging
- **Communicatiepatronen**: Bijgewerkte protocolberichten die initialisatie-, discovery-, uitvoerings- en notificatieprocessen tonen
- **Codevoorbeelden**: Vernieuwde multi-taalvoorbeelden (.NET, Java, Python, JavaScript) die actuele MCP SDK-patronen weerspiegelen

#### Beveiliging (02-Security/) - Omvattende Beveiligingsrevisie  
- **Standaardenaansluiting**: Volledige aansluiting op MCP-specificatie 2025-06-18 beveiligingseisen
- **Authenticatie-evolutie**: Documentatie van evolutie van aangepaste OAuth-servers naar delegatie van externe identiteitsproviders (Microsoft Entra ID)
- **AI-specifieke Dreigingsanalyse**: Uitgebreide dekking van moderne AI-aanvalsvektoren
  - Gedetailleerde promptinjectie-aanvalscenario's met praktijkvoorbeelden
  - Toolvergiftigingsmechanismen en "rug pull"-aanvalpatronen
  - Contextwindow-vergiftiging en modelverwarring-aanvallen
- **Microsoft AI Beveiligingsoplossingen**: Uitgebreide dekking van het Microsoft beveiligingsecosysteem
  - AI Prompt Shields met geavanceerde detectie-, spotlight- en scheidingstekentechnieken
  - Integratiepatronen voor Azure Content Safety
  - GitHub Advanced Security voor bescherming van de supply chain
- **Geavanceerde Dreigingsmitigatie**: Gedetailleerde beveiligingscontroles voor
  - Sessiekaping met MCP-specifieke aanvalscenario's en cryptografische sessie-ID-verplichtingen
  - Verwarring deputy-problemen in MCP proxy-scenario's met expliciete toestemmingsvereisten
  - Token-passthrough-kwetsbaarheden met verplichte validatiecontroles
- **Supply Chain Beveiliging**: Uitgebreide AI-supply chain dekking inclusief foundation models, embeddings-diensten, contextproviders en derden-API's
- **Foundation Security**: Verbeterde integratie met enterprise beveiligingspatronen inclusief zero trust architectuur en Microsoft beveiligingsecosysteem
- **Bronnenorganisatie**: Categorisatie van uitgebreide bronnelinks per type (Officiële Documentatie, Standaarden, Onderzoek, Microsoft oplossingen, Implementatiehandleidingen)

### Verbeteringen van documentatiekwaliteit
- **Gestructureerde Leerdoelen**: Verbeterde leerdoelen met specifieke, concrete uitkomsten
- **Cross-References**: Toegevoegde links tussen gerelateerde beveiligings- en kernconceptonderwerpen
- **Actuele Informatie**: Alle datumnotaties en specificatielinks geactualiseerd naar huidige standaarden
- **Implementatie-instructies**: Toegevoegde specifieke, bruikbare implementatierichtlijnen door beide secties heen

## 16 juli 2025

### README en Navigatieverbeteringen
- Volledig herontworpen de curriculumnavigatie in README.md
- Vervangen `<details>` tags door toegankelijker tabelgebaseerd formaat
- Aangemaakte alternatieve lay-outopties in nieuwe map "alternative_layouts"
- Toegevoegd kaartgebaseerde, tabbladstijl- en accordeonstijl navigatievoorbeelden
- Bijgewerkte sectie over repositorystructuur met alle nieuwste bestanden
- Verbeterde sectie "How to Use This Curriculum" met duidelijke aanbevelingen
- MCP-specificatielinks bijgewerkt naar correcte URLs
- Toegevoegde Context Engineering sectie (5.14) aan curriculumstructuur

### Updates Studiegids
- Volledig herzien studiegids afgestemd op huidige repositorystructuur
- Toegevoegde nieuwe secties voor MCP Clients en Tools, en Populaire MCP Servers
- Bijgewerkte Visual Curriculum Map voor accurate weergave van alle onderwerpen
- Uitgebreide beschrijvingen van Geavanceerde Onderwerpen om alle gespecialiseerde gebieden te dekken
- Bijgewerkte Case Studies sectie met daadwerkelijke voorbeelden
- Toegevoegd deze uitgebreide changelog

### Community Bijdragen (06-CommunityContributions/)
- Toegevoegd gedetailleerde informatie over MCP-servers voor beeldgeneratie
- Uitgebreide sectie over gebruik van Claude in VSCode
- Toegevoegd Cline-terminal client setup en gebruiksinstructies
- MCP-clientsectie bijgewerkt met alle populaire clientopties
- Verbeterde bijdragevoorbeelden met nauwkeurigere codevoorbeelden

### Geavanceerde Onderwerpen (05-AdvancedTopics/)
- Alle gespecialiseerde onderwerpmappen georganiseerd met consistente naamgeving
- Toegevoegd context engineering materiaal en voorbeelden
- Toegevoegd Foundry agent integratiedocumentatie
- Verbeterde Entra ID beveiligingsintegratiedocumentatie

## 11 juni 2025

### Aanvangscreatie
- Eerste versie van MCP voor Beginners curriculum uitgebracht
- Basisstructuur gemaakt voor alle 10 hoofdsecties
- Visual Curriculum Map geïmplementeerd voor navigatie
- Eerste voorbeeldprojecten toegevoegd in meerdere programmeertalen

### Aan de slag (03-GettingStarted/)
- Eerste serverimplementatievoorbeelden gemaakt
- Richtlijnen voor clientontwikkeling toegevoegd
- LLM client integratie-instructies toegevoegd
- VS Code integratiedocumentatie toegevoegd
- Server-Sent Events (SSE) servervoorbeelden geïmplementeerd

### Kernconcepten (01-CoreConcepts/)
- Gedetailleerde uitleg client-serverarchitectuur toegevoegd
- Documentatie over kernprotocolcomponenten gemaakt
- Messagingpatronen binnen MCP gedocumenteerd

## 23 mei 2025

### Repositorystructuur
- Repository geïnitieerd met basis mappenstructuur
- README-bestanden gemaakt voor elke hoofdsectie
- Vertaalinfrastructuur opgezet
- Beeldmateriaal en diagrammen toegevoegd

### Documentatie
- Initiële README.md met curriculumoverzicht gemaakt
- CODE_OF_CONDUCT.md en SECURITY.md toegevoegd
- SUPPORT.md opgezet met hulpinstructies
- Voorlopige structuur studiegids gemaakt

## 15 april 2025

### Planning en Kader
- Initiële planning voor MCP voor Beginners curriculum
- Leerdoelen en doelgroep gedefinieerd
- 10-sectiestructuur van het curriculum uitgelijnd
- Conceptueel kader ontwikkeld voor voorbeelden en case studies
- Eerste prototypevoorbeelden gemaakt voor kernconcepten

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel wij streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->