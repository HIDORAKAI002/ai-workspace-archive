# Introductie tot MCP Database Integratie

## 🎯 Wat Deze Lab Behandelt

Deze introductielab biedt een uitgebreid overzicht van het bouwen van Model Context Protocol (MCP) servers met database-integratie. Je krijgt inzicht in de business case, technische architectuur en toepassingen uit de praktijk via de Zava Retail analytics use case op https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Overzicht

**Model Context Protocol (MCP)** stelt AI-assistenten in staat om op een veilige manier realtime toegang te krijgen tot en te communiceren met externe databronnen. In combinatie met database-integratie ontsluit MCP krachtige mogelijkheden voor datagedreven AI-toepassingen.

Dit leerpad leert je productieklare MCP-servers te bouwen die AI-assistenten verbinden met retail verkoopdata via PostgreSQL, waarbij enterprise-patronen zoals Row Level Security, semantisch zoeken en multi-tenant data toegang worden toegepast.

## Leerdoelen

Aan het einde van deze lab kun je:

- **Definiëren** wat Model Context Protocol is en de kernvoordelen voor database-integratie
- **Identificeren** van sleutelcomponenten van een MCP serverarchitectuur met databases
- **Begrijpen** van de Zava Retail use case en de zakelijke vereisten
- **Herkennen** van enterprise-patronen voor veilige, schaalbare database toegang
- **Opsommen** welke tools en technologieën in dit leerpad worden gebruikt

## 🧭 De Uitdaging: AI Ontmoet Data uit de Praktijk

### Traditionele AI Beperkingen

Moderne AI-assistenten zijn zeer krachtig maar stuiten op aanzienlijke beperkingen bij het werken met zakelijke data uit de praktijk:

| **Uitdaging** | **Beschrijving** | **Zakelijke Impact** |
|---------------|-----------------|---------------------|
| **Statische Kennis** | AI-modellen getraind op vaste datasets hebben geen toegang tot actuele zakelijke data | Verouderde inzichten, gemiste kansen |
| **Data Silos** | Informatie opgesloten in databases, API’s en systemen die AI niet kan bereiken | Onvolledige analyses, gefragmenteerde workflows |
| **Beveiligingsbeperkingen** | Directe database toegang roept beveiligings- en compliancevragen op | Beperkte implementatie, handmatige datapreparatie |
| **Complexe Queries** | Zakelijke gebruikers hebben technische kennis nodig om data-inzichten te extraheren | Verminderde adoptie, inefficiënte processen |

### De MCP Oplossing

Model Context Protocol pakt deze uitdagingen aan door:

- **Realtime Data Toegang**: AI-assistenten stellen live queries aan databases en API's
- **Veilige Integratie**: Gecontroleerde toegang met authenticatie en permissies
- **Natuurlijke Taal Interface**: Zakelijke gebruikers stellen vragen in gewone taal
- **Gestandaardiseerd Protocol**: Werkt over verschillende AI-platformen en tools heen

## 🏪 Maak Kennis met Zava Retail: Onze Leercase https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Gedurende dit leerpad bouwen we een MCP-server voor **Zava Retail**, een fictieve doe-het-zelf retailketen met meerdere winkelvestigingen. Dit realistische scenario toont een enterprise-grade MCP-implementatie.

### Zakelijke Context

**Zava Retail** exploiteert:
- **8 fysieke winkels** verspreid over de staat Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 online winkel** voor e-commerce verkoop
- **Divers productassortiment** inclusief gereedschap, hardware, tuinbenodigdheden en bouwmaterialen
- **Meerlagig management** met winkelmanagers, regiomanagers en executives

### Zakelijke Vereisten

Winkelmanagers en executives hebben AI-gedreven analyses nodig om:

1. **Verkoopprestaties te analyseren** over winkels en tijdsperioden
2. **Voorraadniveaus bij te houden** en aanvulbehoeften te herkennen
3. **Klanten gedrag te begrijpen** en aankooppatronen te ontdekken
4. **Productinzichten te genereren** via semantisch zoeken
5. **Rapporten te maken** met natuurlijke taal queries
6. **Databeveiliging te waarborgen** met rolgebaseerde toegangscontrole

### Technische Vereisten

De MCP-server moet bieden:

- **Multi-tenant data toegang** waarbij winkelmanagers alleen hun eigen winkeldata zien
- **Flexibele query-mogelijkheden** die complexe SQL-operaties ondersteunen
- **Semantisch zoeken** voor productontdekking en aanbevelingen
- **Realtime data** die de actuele bedrijfsstatus reflecteert
- **Veilige authenticatie** met row-level security
- **Schaalbare architectuur** die meerdere gelijktijdige gebruikers ondersteunt

## 🏗️ Overzicht MCP Server Architectuur

Onze MCP-server implementeert een gelaagde architectuur geoptimaliseerd voor database-integratie:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Belangrijke Componenten

#### **1. MCP Server Laag**
- **FastMCP Framework**: Moderne Python MCP-serverimplementatie
- **Tool Registratie**: Declaratieve tooldefinities met typeveiligheid
- **Request Context**: Gebruikersidentiteit en sessiebeheer
- **Foutafhandeling**: Robuust foutbeheer en logging

#### **2. Database Integratie Laag**
- **Connection Pooling**: Efficiënt asyncpg verbindingenbeheer
- **Schema Provider**: Dynamische ontdekking van tabelschema’s
- **Query Executor**: Veilige SQL-uitvoering met RLS-context
- **Transactiebeheer**: ACID-compliance en rollback afhandeling

#### **3. Beveiligingslaag**
- **Row Level Security**: PostgreSQL RLS voor multi-tenant data isolatie
- **Gebruikersidentiteit**: Authenticatie en autorisatie van winkelmanagers
- **Toegangscontrole**: Fijnmazige permissies en audit trails
- **Inputvalidatie**: SQL injectie preventie en query validatie

#### **4. AI Versterkingslaag**
- **Semantisch Zoeken**: Vector embeddings voor productontdekking
- **Azure OpenAI Integratie**: Tekst embedding generatie
- **Gelijkenisalgoritmes**: pgvector cosine similarity search
- **Zoekoptimalisatie**: Indexering en performance tuning

## 🔧 Technologie Stack

### Kern Technologieën

| **Component** | **Technologie** | **Doel** |
|---------------|-----------------|----------|
| **MCP Framework** | FastMCP (Python) | Moderne MCP serverimplementatie |
| **Database** | PostgreSQL 17 + pgvector | Relationele data met vector search |
| **AI Diensten** | Azure OpenAI | Tekst embeddings en taalmodellen |
| **Containerisatie** | Docker + Docker Compose | Ontwikkelomgeving |
| **Cloud Platform** | Microsoft Azure | Productiedepoyment |
| **IDE Integratie** | VS Code | AI Chat en ontwikkelworkflow |

### Ontwikkeltools

| **Tool** | **Doel** |
|----------|----------|
| **asyncpg** | High-performance PostgreSQL driver |
| **Pydantic** | Data validatie en serialisatie |
| **Azure SDK** | Cloud service integratie |
| **pytest** | Testframework |
| **Docker** | Containerisatie en deployment |

### Productiestack

| **Service** | **Azure Resource** | **Doel** |
|-------------|--------------------|----------|
| **Database** | Azure Database for PostgreSQL | Beheerde databaseservice |
| **Container** | Azure Container Apps | Serverless containerhosting |
| **AI Diensten** | Microsoft Foundry | OpenAI modellen en endpoints |
| **Monitoring** | Application Insights | Observability en diagnostiek |
| **Beveiliging** | Azure Key Vault | Secrets en configuratiemanagement |

## 🎬 Toepassingsscenario's uit de Praktijk

Laten we verkennen hoe verschillende gebruikers met onze MCP-server interacteren:

### Scenario 1: Prestatiebeoordeling Winkelmanager

**Gebruiker**: Sarah, winkelmanager Seattle  
**Doel**: Analyse van verkoopprestaties vorig kwartaal

**Natuurlijke Taal Query**:
> "Toon de top 10 producten op basis van omzet voor mijn winkel in Q4 2024"

**Wat Gebeurt Er**:
1. VS Code AI Chat stuurt query naar MCP server
2. MCP server identificeert Sarah's winkelcontext (Seattle)
3. RLS-beleid filtert data naar alleen Seattle winkel
4. SQL-query wordt gegenereerd en uitgevoerd
5. Resultaten worden geformatteerd en teruggegeven aan AI Chat
6. AI levert analyse en inzichten

### Scenario 2: Productontdekking met Semantisch Zoeken

**Gebruiker**: Mike, Inventory Manager  
**Doel**: Producten vinden die lijken op een klantvraag

**Natuurlijke Taal Query**:
> "Welke producten verkopen we die lijken op ‘waterdichte elektrische connectoren voor buitengebruik’?"

**Wat Gebeurt Er**:
1. Query verwerkt door semantische zoektool
2. Azure OpenAI genereert embedding vector
3. pgvector voert gelijkeniszoek uit
4. Gerelateerde producten gerangschikt op relevantie
5. Resultaten bevatten productdetails en beschikbaarheid
6. AI stelt alternatieven en bundelkansen voor

### Scenario 3: Cross-Store Analytics

**Gebruiker**: Jennifer, regiomanager  
**Doel**: Prestaties vergelijken over alle winkels

**Natuurlijke Taal Query**:
> "Vergelijk verkoop per categorie voor alle winkels in de afgelopen 6 maanden"

**Wat Gebeurt Er**:
1. RLS-context ingesteld voor toegang via regiomanager
2. Complexe multi-store query gegenereerd
3. Data geaggregeerd over winkel locaties
4. Resultaten tonen trends en vergelijkingen
5. AI identificeert inzichten en aanbevelingen

## 🔒 Beveiliging en Multi-Tenancy Verdieping

Onze implementatie stelt enterprise-grade beveiliging voorop:

### Row Level Security (RLS)

PostgreSQL RLS zorgt voor data-isolatie:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Gebruikersidentiteitsbeheer

Elke MCP-verbinding bevat:
- **Winkelmanager ID**: Unieke identifier voor RLS-context
- **Roltoewijzing**: Permissies en toegangslevels
- **Sessiebeheer**: Veilige authenticatietokens
- **Audit Logging**: Volledige toegangsgeschiedenis

### Databescherming

Meerdere beveiligingslagen:
- **Verbindingsversleuteling**: TLS voor alle databaseverbindingen
- **SQL Injectie Preventie**: Alleen geparametriseerde queries
- **Inputvalidatie**: Uitgebreide verzoekvalidatie
- **Foutafhandeling**: Geen gevoelige data in foutmeldingen

## 🎯 Belangrijkste Leerpunten

Na deze introductie begrijp je:

✅ **MCP Waardepropositie**: Hoe MCP AI-assistenten en praktijkdata verbindt  
✅ **Zakelijke Context**: Vereisten en uitdagingen van Zava Retail  
✅ **Architectuuroverzicht**: Sleutelcomponenten en hun interacties  
✅ **Technologiestack**: Gebruikte tools en frameworks  
✅ **Beveiligingsmodel**: Multi-tenant data toegang en bescherming  
✅ **Gebruikspatronen**: Reële queryscenario’s en workflows  

## 🚀 Wat Nu?

Klaar om dieper te duiken? Ga verder met:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Leer over MCP serverarchitectuurpatronen, database-ontwerpprincipes en de gedetailleerde technische implementatie die onze retail analytics oplossing aandrijft.

## 📚 Aanvullende Bronnen

### MCP Documentatie
- [MCP Specificatie](https://modelcontextprotocol.io/docs/) - Officiële protocoldocumentatie
- [MCP voor Beginners](https://aka.ms/mcp-for-beginners) - Uitgebreide MCP leerhandleiding
- [FastMCP Documentatie](https://github.com/modelcontextprotocol/python-sdk) - Python SDK documentatie

### Database Integratie
- [PostgreSQL Documentatie](https://www.postgresql.org/docs/) - Complete PostgreSQL referentie
- [pgvector Gids](https://github.com/pgvector/pgvector) - Vector extensiedocumentatie
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS gids

### Azure Diensten
- [Azure OpenAI Documentatie](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI service integratie
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Beheerde databaseservice
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless containers

---

**Disclaimer**: Dit is een leeractie met fictieve retaildata. Volg altijd het databeheer en beveiligingsbeleid van jouw organisatie bij het implementeren van soortgelijke oplossingen in productieomgevingen.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->