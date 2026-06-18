# Introduktion till MCP-databasintegration

## 🎯 Vad denna labb täcker

Denna introduktionslabb ger en omfattande översikt över att bygga Model Context Protocol (MCP)-servrar med databas-integration. Du kommer att förstå affärsfallet, den tekniska arkitekturen och verkliga tillämpningar genom Zava Retail analytics-användningsfallet på https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Översikt

**Model Context Protocol (MCP)** möjliggör för AI-assistenter att säkert få tillgång till och interagera med externa datakällor i realtid. När det kombineras med databasintegration öppnar MCP upp kraftfulla möjligheter för datadrivna AI-applikationer.

Denna lärandeväg lär dig att bygga produktionsfärdiga MCP-servrar som kopplar AI-assistenter till detaljhandelns försäljningsdata via PostgreSQL, och implementerar företagsmönster såsom Row Level Security, semantisk sökning och multi-tenant dataåtkomst.

## Lärandemål

I slutet av denna labb ska du kunna:

- **Definiera** Model Context Protocol och dess kärnfördelar för databasintegration  
- **Identifiera** nyckelkomponenter i en MCP-serverarkitektur med databaser  
- **Förstå** Zava Retails användningsfall och dess affärskrav  
- **Känna igen** företagsmönster för säker, skalbar databasåtkomst  
- **Lista** verktygen och teknologierna som används genom hela denna lärandeväg  

## 🧭 Utmaningen: AI möter verkliga data

### Traditionella AI-begränsningar

Moderna AI-assistenter är otroligt kraftfulla men står inför betydande begränsningar när de arbetar med verkliga affärsdata:

| **Utmaning** | **Beskrivning** | **Affärspåverkan** |
|--------------|-----------------|--------------------|
| **Statisk kunskap** | AI-modeller tränade på fasta dataset kan inte nå aktuell affärsdata | Föråldrade insikter, missade möjligheter |
| **Datasilos** | Information låst i databaser, API:er och system som AI inte når | Ofullständig analys, fragmenterade arbetsflöden |
| **Säkerhetsbegränsningar** | Direkt databasåtkomst väcker säkerhets- och efterlevnadsproblem | Begränsad distribution, manuell datapreparering |
| **Komplexa frågor** | Affärsanvändare behöver teknisk kunskap för att extrahera datainsikter | Minskad användning, ineffektiva processer |

### MCP-lösningen

Model Context Protocol hanterar dessa utmaningar genom att erbjuda:

- **Realtidsdataåtkomst**: AI-assistenter frågar levande databaser och API:er  
- **Säker integration**: Kontrollerad åtkomst med autentisering och behörigheter  
- **Naturligt språkgränssnitt**: Affärsanvändare ställer frågor på enkel engelska  
- **Standardiserat protokoll**: Fungerar över olika AI-plattformar och verktyg  

## 🏪 Möt Zava Retail: Vårt lärandestudie https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Genom hela denna lärandeväg bygger vi en MCP-server för **Zava Retail**, en fiktiv gör-det-själv-detaljhandelskedja med flera butiksplatser. Detta realistiska scenario visar en företagsklassad MCP-implementering.

### Affärskontext

**Zava Retail** driver:  
- **8 fysiska butiker** i Washington State (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 online-butik** för e-handelsförsäljning  
- **Mångsidigt produktkatalog** inklusive verktyg, hårdvara, trädgårdsartiklar och byggmaterial  
- **Flerlagersledning** med butikschefer, regionchefer och ledningsgrupp  

### Affärskrav

Butikschefer och ledning behöver AI-driven analys för att:

1. **Analysera försäljningsprestanda** över butiker och tidsperioder  
2. **Spåra lagernivåer** och identifiera behov av påfyllning  
3. **Förstå kundbeteende** och köpmönster  
4. **Upptäcka produktinsikter** genom semantisk sökning  
5. **Generera rapporter** med frågor på naturligt språk  
6. **Behålla datasäkerhet** med rollbaserad åtkomstkontroll  

### Tekniska krav

MCP-servern måste erbjuda:

- **Multi-tenant dataåtkomst** där butikschefer bara ser sin butiks data  
- **Flexibel frågeställning** som stöder komplexa SQL-operationer  
- **Semantisk sökning** för produktupptäckt och rekommendationer  
- **Realtidsdata** som speglar aktuell affärssituation  
- **Säker autentisering** med row-level security  
- **Skalbar arkitektur** som stöder flera samtidiga användare  

## 🏗️ Översikt av MCP-serverarkitektur

Vår MCP-server implementerar en lagerindelad arkitektur optimerad för databasintegration:

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

### Nyckelkomponenter

#### **1. MCP-serverlager**  
- **FastMCP Framework**: Modern Python-implementering av MCP-server  
- **Verktygsregistrering**: Deklarativa verktygsdefinitioner med typkontroll  
- **Förfrågningskontext**: Användaridentitet och sessionshantering  
- **Felhante​ring**: Robust felhantering och loggning  

#### **2. Databasintegrationslager**  
- **Anslutningspoolning**: Effektiv asynkron pg-anslutningshantering  
- **Schema Provider**: Dynamisk tabellschemaupptäckt  
- **Frågeexekverare**: Säker SQL-exekvering med RLS-kontext  
- **Transaktionshantering**: ACID-kompatibilitet och rollback-hantering  

#### **3. Säkerhetslager**  
- **Row Level Security**: PostgreSQL RLS för isolering av multi-tenant-data  
- **Användaridentitet**: Autentisering och auktorisering av butikschef  
- **Åtkomstkontroll**: Finmaskiga behörigheter och revisionsspår  
- **Inputvalidering**: Skydd mot SQL-injektion och frågevalidering  

#### **4. AI-förstärkningslager**  
- **Semantisk sökning**: Vektorembedding för produktupptäckt  
- **Azure OpenAI-integration**: Generering av textembedding  
- **Likhetsalgoritmer**: pgvector cosine similarity-sökning  
- **Sökningsoptimering**: Indexering och prestandajustering  

## 🔧 Teknologistack

### Kärnteknologier

| **Komponent** | **Teknologi** | **Syfte** |
|---------------|---------------|-----------|
| **MCP Framework** | FastMCP (Python) | Modern MCP-serverimplementation |
| **Databas** | PostgreSQL 17 + pgvector | Relationsdata med vektorsökning |
| **AI-tjänster** | Azure OpenAI | Textembedding och språkmodeller |
| **Containerisering** | Docker + Docker Compose | Utvecklingsmiljö |
| **Molnplattform** | Microsoft Azure | Produktionsdistribution |
| **IDE-integration** | VS Code | AI-chatt och utvecklingsarbetsflöde |

### Utvecklingsverktyg

| **Verktyg** | **Syfte** |
|-------------|-----------|
| **asyncpg** | Högpresterande PostgreSQL-drivrutin |
| **Pydantic** | Datavalidering och serialisering |
| **Azure SDK** | Integration med molntjänster |
| **pytest** | Testningsramverk |
| **Docker** | Containerisering och distribution |

### Produktionsstack

| **Tjänst** | **Azure-resurs** | **Syfte** |
|------------|------------------|-----------|
| **Databas** | Azure Database for PostgreSQL | Hanterad databastjänst |
| **Container** | Azure Container Apps | Serverlös containerhostning |
| **AI-tjänster** | Microsoft Foundry | OpenAI-modeller och endpoints |
| **Övervakning** | Application Insights | Observabilitet och diagnostik |
| **Säkerhet** | Azure Key Vault | Hantering av hemligheter och konfiguration |

## 🎬 Verkliga användningsscenarier

Låt oss utforska hur olika användare interagerar med vår MCP-server:

### Scenario 1: Butikschef Prestandaanalys

**Användare**: Sarah, butikschef i Seattle  
**Mål**: Analysera försäljningsresultat för förra kvartalet

**Fråga på naturligt språk**:  
> "Visa mig de 10 bästa produkterna efter intäkter för min butik under Q4 2024"

**Vad händer**:  
1. VS Code AI Chat skickar fråga till MCP-servern  
2. MCP-servern identifierar Sarahs butikskontext (Seattle)  
3. RLS-policyer filtrerar data till endast Seattlebutiken  
4. SQL-fråga genereras och körs  
5. Resultat formateras och skickas tillbaka till AI Chat  
6. AI ger analys och insikter  

### Scenario 2: Produktupptäckt med semantisk sökning

**Användare**: Mike, lageransvarig  
**Mål**: Hitta produkter liknande en kundförfrågan

**Fråga på naturligt språk**:  
> "Vilka produkter säljer vi som är liknande 'vattentäta elektriska kopplingar för utomhusbruk'?"

**Vad händer**:  
1. Frågan bearbetas av semantiskt sökningsverktyg  
2. Azure OpenAI genererar embeddingsvektor  
3. pgvector genomför likhetssökning  
4. Relaterade produkter rankas efter relevans  
5. Resultat inkluderar produktdetaljer och tillgänglighet  
6. AI föreslår alternativ och paketeringsmöjligheter  

### Scenario 3: Analys över flera butiker

**Användare**: Jennifer, regionchef  
**Mål**: Jämföra prestanda över alla butiker

**Fråga på naturligt språk**:  
> "Jämför försäljning per kategori för alla butiker under de senaste 6 månaderna"

**Vad händer**:  
1. RLS-kontext sätts för regionchefens åtkomst  
2. Komplex frågeställning för flera butiker genereras  
3. Data aggregeras över butiksplats  
4. Resultat inkluderar trender och jämförelser  
5. AI identifierar insikter och rekommendationer  

## 🔒 Säkerhet och multi-tenancy i detalj

Vår implementation prioriterar företagsklassad säkerhet:

### Row Level Security (RLS)

PostgreSQL RLS säkerställer dataisolering:

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
  
### Hantering av användaridentitet

Varje MCP-anslutning inkluderar:  
- **Butikschefs-ID**: Unikt identifierare för RLS-kontext  
- **Rolltilldelning**: Behörigheter och åtkomstnivåer  
- **Sessionshantering**: Säkra autentiseringstoken  
- **Revisionsloggning**: Fullständig åtkomsthistorik  

### Dataskydd

Flera säkerhetslager:  
- **Anslutningskryptering**: TLS för alla databasanslutningar  
- **Förebyggande av SQL-injektion**: Endast parametriserade frågor  
- **Inputvalidering**: Omfattande validering av förfrågningar  
- **Felhante​ring**: Inga känsliga data i felmeddelanden  

## 🎯 Viktiga insikter

Efter denna introduktion ska du förstå:

✅ **MCP:s värdeerbjudande**: Hur MCP länkar AI-assistenter till verkliga data  
✅ **Affärskontext**: Zava Retails krav och utmaningar  
✅ **Arkitekturoversikt**: Nyckelkomponenter och deras samspel  
✅ **Teknologistack**: Verktyg och ramverk som används  
✅ **Säkerhetsmodell**: Multi-tenant dataåtkomst och skydd  
✅ **Användarmönster**: Verkliga frågescenarier och arbetsflöden  

## 🚀 Vad händer härnäst

Redo att fördjupa dig? Fortsätt med:

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

Lär dig om MCP-serverarkitekturens mönster, databasutformningsprinciper och den detaljerade tekniska implementationen som driver vår detaljhandelsanalyslösning.

## 📚 Ytterligare resurser

### MCP-dokumentation
- [MCP Specification](https://modelcontextprotocol.io/docs/) - Officiell protokolldokumentation  
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - Omfattande MCP-lärandeguide  
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Python SDK-dokumentation  

### Databasintegration
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Komplett PostgreSQL-referens  
- [pgvector Guide](https://github.com/pgvector/pgvector) - Dokumentation för vektorextension  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guide för PostgreSQL RLS  

### Azure-tjänster
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI-tjänsteintegration  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Hanterad databastjänst  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverlösa containrar  

---

**Ansvarsfriskrivning**: Detta är en lärandeövning med fiktiva detaljhandelsdata. Följ alltid din organisations datasäkerhets- och styrningspolicyer när du implementerar liknande lösningar i produktionsmiljöer.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->