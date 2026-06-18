# Introduktion til MCP Databaseintegration

## 🎯 Hvad dette laboratorium dækker

Dette introduktionslaboratorium giver en omfattende oversigt over opbygning af Model Context Protocol (MCP) servere med databaseintegration. Du vil forstå forretningscasen, teknisk arkitektur og virkelige anvendelser gennem Zava Retail analyse-casen på https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Oversigt

**Model Context Protocol (MCP)** giver AI-assistenter mulighed for sikkert at få adgang til og interagere med eksterne datakilder i realtid. Når det kombineres med databaseintegration, åbner MCP kraftfulde muligheder for datadrevne AI-applikationer.

Denne læringsvejledning lærer dig at bygge produktionsklare MCP-servere, der forbinder AI-assistenter til detailhandelssalgsdata via PostgreSQL, og implementerer virksomhedsmønstre som Row Level Security, semantisk søgning og multi-tenant dataadgang.

## Læringsmål

Ved afslutningen af dette laboratorium vil du kunne:

- **Definere** Model Context Protocol og dets kernefordele for databaseintegration
- **Identificere** nøglekomponenter i en MCP-serverarkitektur med databaser
- **Forstå** Zava Retail casen og dens forretningskrav
- **Genkende** virksomhedsmønstre for sikker, skalerbar databaseadgang
- **Liste** de værktøjer og teknologier, der bruges gennem denne læringsvejledning

## 🧭 Udfordringen: AI møder virkelige data

### Traditionelle AI-begrænsninger

Moderne AI-assistenter er utroligt kraftfulde, men møder væsentlige begrænsninger, når de arbejder med virkelige forretningsdata:

| **Udfordring** | **Beskrivelse** | **Forretningspåvirkning** |
|---------------|-----------------|---------------------------|
| **Statisk viden** | AI-modeller trænet på faste datasæt kan ikke få adgang til aktuelle forretningsdata | Forældede indsigter, mistede muligheder |
| **Datasilos** | Information låst i databaser, API'er og systemer, AI ikke kan nå | Ufuldstændige analyser, fragmenterede arbejdsgange |
| **Sikkerhedskrav** | Direkte databaseadgang rejser sikkerheds- og overholdelsesbekymringer | Begrænset implementering, manuel datapreparation |
| **Komplekse forespørgsler** | Forretningsbrugere kræver teknisk viden for at udtrække dataindsigter | Mindsket adoption, ineffektive processer |

### MCP-løsningen

Model Context Protocol håndterer disse udfordringer ved at tilbyde:

- **Realtidsdataadgang**: AI-assistenter forespørger live databaser og API’er
- **Sikker integration**: Kontrolleret adgang med autentifikation og tilladelser
- **Naturligt sproginterface**: Forretningsbrugere stiller spørgsmål på almindeligt dansk
- **Standardiseret protokol**: Fungerer på tværs af forskellige AI-platforme og værktøjer

## 🏪 Mød Zava Retail: Vores læringseksempel https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Gennem denne læringsvejledning bygger vi en MCP-server for **Zava Retail**, en fiktiv gør-det-selv detailkæde med flere butikker. Dette realistiske scenarie demonstrerer enterprise-grade MCP-implementering.

### Forretningskontekst

**Zava Retail** driver:
- **8 fysiske butikker** i Washington State (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 online butik** til e-handelssalg
- **Bredt produktkatalog** med værktøj, hardware, haveartikler og byggematerialer
- **Multi-niveau ledelse** med butikschefer, regionschefer og ledere

### Forretningskrav

Butikschefer og ledere har brug for AI-drevne analyser til at:

1. **Analysere salgspræstationer** på tværs af butikker og tidsperioder
2. **Sporing af lagerstatus** og identificere genopfyldningsbehov
3. **Forstå kundeadfærd** og købemønstre
4. **Opdage produktindsigter** via semantisk søgning
5. **Generere rapporter** med naturlige sprogforespørgsler
6. **Sikre databeskyttelse** via rollebaseret adgangskontrol

### Tekniske krav

MCP-serveren skal levere:

- **Multi-tenant dataadgang** hvor butikschefer kun ser deres butiks data
- **Fleksible forespørgsler** der understøtter komplekse SQL-operationer
- **Semantisk søgning** til produktopdagelse og anbefalinger
- **Realtidsdata** der afspejler forretningsaktuel tilstand
- **Sikker autentifikation** med row-level security
- **Skalerbar arkitektur** der understøtter flere samtidige brugere

## 🏗️ MCP Server Arkitektur Oversigt

Vores MCP-server implementerer en lagdelt arkitektur optimeret til databaseintegration:

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

### Nøglekomponenter

#### **1. MCP Server Lag**
- **FastMCP Framework**: Moderne Python MCP-serverimplementering
- **Tool Registration**: Deklarative værktøjsdefinitioner med typesikkerhed
- **Request Context**: Brugeridentitet og sessionhåndtering
- **Error Handling**: Robust fejlstyring og logning

#### **2. Databaseintegrationslag**
- **Connection Pooling**: Effektiv asyncpg forbindelsesstyring
- **Schema Provider**: Dynamisk opdagelse af tabelskemaer
- **Query Executor**: Sikker udførelse af SQL med RLS-kontekst
- **Transaction Management**: ACID-overholdelse og rollback-håndtering

#### **3. Sikkerhedslag**
- **Row Level Security**: PostgreSQL RLS til multi-tenant dataisolering
- **User Identity**: Butikschef-autentifikation og -autorisation
- **Access Control**: Finkornede tilladelser og revisionsspor
- **Input Validation**: Forebyggelse af SQL-injektion og forespørgselsvalidering

#### **4. AI Forbedringslag**
- **Semantic Search**: Vector embeddings til produktopdagelse
- **Azure OpenAI Integration**: Tekst-embedding generering
- **Similarity Algorithms**: pgvector cosine similarity-søgning
- **Search Optimization**: Indeksering og ydeevnetuning

## 🔧 Teknologistak

### Kerne teknologier

| **Komponent** | **Teknologi** | **Formål** |
|---------------|---------------|------------|
| **MCP Framework** | FastMCP (Python) | Moderne MCP-serverimplementering |
| **Database** | PostgreSQL 17 + pgvector | Relationelle data med vektorsøgning |
| **AI Services** | Azure OpenAI | Tekst-embedding og sprogmodeller |
| **Containerisering** | Docker + Docker Compose | Udviklingsmiljø |
| **Cloud Platform** | Microsoft Azure | Produktionsimplementering |
| **IDE Integration** | VS Code | AI Chat og udviklingsworkflow |

### Udviklingsværktøjer

| **Værktøj** | **Formål** |
|-------------|------------|
| **asyncpg** | Højtydende PostgreSQL-driver |
| **Pydantic** | Datavalidering og serialisering |
| **Azure SDK** | Cloud-serviceintegration |
| **pytest** | Test-framework |
| **Docker** | Containerisering og deployment |

### Produktionsstak

| **Service** | **Azure Ressource** | **Formål** |
|-------------|---------------------|------------|
| **Database** | Azure Database for PostgreSQL | Administreret databaseservice |
| **Container** | Azure Container Apps | Serverless container hosting |
| **AI Services** | Microsoft Foundry | OpenAI modeller og endpoints |
| **Overvågning** | Application Insights | Observabilitet og diagnosticering |
| **Sikkerhed** | Azure Key Vault | Hemmeligheder og konfigurationshåndtering |

## 🎬 Virkelige Anvendelsesscenarier

Lad os udforske, hvordan forskellige brugere interagerer med vores MCP-server:

### Scenario 1: Butikschefens performanceevaluering

**Bruger**: Sarah, butikschef i Seattle  
**Mål**: Analysere sidste kvartals salgspræstation

**Naturlig sprogforespørgsel**:  
> "Vis mig de top 10 produkter efter omsætning i min butik i Q4 2024"

**Hvad sker der**:  
1. VS Code AI Chat sender forespørgsel til MCP-server  
2. MCP-server identificerer Sarahs butikskontekst (Seattle)  
3. RLS-politikker filtrerer data til kun Seattle-butikken  
4. SQL-forespørgsel genereres og udføres  
5. Resultater formateres og returneres til AI Chat  
6. AI leverer analyse og indsigt

### Scenario 2: Produktopdagelse med semantisk søgning

**Bruger**: Mike, lagerchef  
**Mål**: Find produkter, der ligner en kundebegæring

**Naturlig sprogforespørgsel**:  
> "Hvilke produkter sælger vi, der ligner 'vandafvisende elektriske stik til udendørs brug'?"

**Hvad sker der**:  
1. Forespørgsel behandles af semantisk søgeværktøj  
2. Azure OpenAI genererer embeddings-vektor  
3. pgvector udfører lighedssøgning  
4. Relaterede produkter rangeres efter relevans  
5. Resultater inkluderer produktdetaljer og tilgængelighed  
6. AI foreslår alternativer og pakkeløsninger

### Scenario 3: Tværgående Butiksanalyse

**Bruger**: Jennifer, regionschef  
**Mål**: Sammenligne præstation på tværs af alle butikker

**Naturlig sprogforespørgsel**:  
> "Sammenlign salg efter kategori for alle butikker i de sidste 6 måneder"

**Hvad sker der**:  
1. RLS-kontekst sættes for regionschefens adgang  
2. Komplekse multi-butik forespørgsler genereres  
3. Data aggregeres på tværs af butikslokationer  
4. Resultater indeholder trends og sammenligninger  
5. AI identificerer indsigt og anbefalinger

## 🔒 Sikkerhed og Multi-Tenancy Dybdegående

Vores implementering prioriterer virksomhedssikkerhed:

### Row Level Security (RLS)

PostgreSQL RLS sikrer dataisolering:

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

### Brugeridentitetsstyring

Hver MCP-forbindelse inkluderer:  
- **Butikschef-ID**: Unik identifikator for RLS-kontekst  
- **Rollefordeling**: Tilladelser og adgangsniveauer  
- **Sessionstyring**: Sikre autentifikationstokens  
- **Revisionslog**: Komplethistorik over adgang

### Databeskyttelse

Flere lag af sikkerhed:  
- **Forbindelseskryptering**: TLS for alle databaseforbindelser  
- **Forebyggelse af SQL-injektion**: Kun parameteriserede forespørgsler  
- **Inputvalidering**: Omfattende forespørgselsvalidering  
- **Fejlhåndtering**: Ingen følsomme data i fejlmeddelelser

## 🎯 Vigtige pointer

Efter at have gennemført denne introduktion, bør du forstå:

✅ **MCP værditilbud**: Hvordan MCP forbinder AI-assistenter og virkelige data  
✅ **Forretningskontekst**: Zava Retails krav og udfordringer  
✅ **Arkitekturoversigt**: Nøglekomponenter og deres samspil  
✅ **Teknologistak**: Brugte værktøjer og frameworks  
✅ **Sikkerhedsmodel**: Multi-tenant dataadgang og beskyttelse  
✅ **Brugsmønstre**: Virkelige forespørgsels- og arbejdsflows

## 🚀 Hvad er næste skridt

Klar til at dykke dybere? Fortsæt med:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Lær om MCP-serverarkitektur, databasedesignprincipper og den detaljerede tekniske implementering, der driver vores detailhandelsanalyse-løsning.

## 📚 Yderligere ressourcer

### MCP Dokumentation
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Officiel protokol dokumentation  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Omfattende MCP læringsguide  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentation  

### Databaseintegration  
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Komplett PostgreSQL reference  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Vector-udvidelsesdokumentation  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS guide  

### Azure Services  
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI service integration  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Administreret databaseservice  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverless containere  

---

**Ansvarsfraskrivelse**: Dette er en læringsøvelse med fiktive detaildata. Følg altid din organisations datastyrings- og sikkerhedspolitikker ved implementering af lignende løsninger i produktionsmiljøer.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->