# Introduksjon til MCP Databaseintegrasjon

## 🎯 Hva denne labben dekker

Denne introduksjonslabben gir en omfattende oversikt over bygging av Model Context Protocol (MCP) servere med databaseintegrasjon. Du vil forstå forretningscaset, teknisk arkitektur og virkelige applikasjoner gjennom Zava Retail analysetilfellet på https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Oversikt

**Model Context Protocol (MCP)** gjør det mulig for AI-assistenter å sikkert få tilgang til og samhandle med eksterne datakilder i sanntid. Når det kombineres med databaseintegrasjon, åpner MCP for kraftige muligheter for datadrevne AI-applikasjoner.

Denne læringsreisen lærer deg å bygge produksjonsklare MCP-servere som kobler AI-assistenter til detaljhandelens salgsdata gjennom PostgreSQL, og implementerer bedriftsmønstre som Row Level Security, semantisk søk og multikunde-tilgang til data.

## Læringsmål

Etter denne labben skal du kunne:

- **Definere** Model Context Protocol og dens kjernefordeler for databaseintegrasjon
- **Identifisere** hovedkomponenter i en MCP-serverarkitektur med databaser
- **Forstå** Zava Retail brukstilfelle og dets forretningskrav
- **Gjenkjenne** bedriftsmønstre for sikker, skalerbar database-tilgang
- **Liste opp** verktøy og teknologier brukt gjennom læringsreisen

## 🧭 Utfordringen: AI møter virkelige data

### Tradisjonelle AI-begrensninger

Moderne AI-assistenter er utrolig kraftige, men møter betydelige begrensninger når de jobber med virkelige forretningsdata:

| **Utfordring** | **Beskrivelse** | **Forretningspåvirkning** |
|---------------|-----------------|---------------------------|
| **Statisk kunnskap** | AI-modeller trent på faste datasett kan ikke få tilgang til nåværende forretningsdata | Utdaterte innsikter, tapte muligheter |
| **Datasiloer** | Informasjon låst i databaser, APIer og systemer AI ikke når | Ufullstendig analyse, fragmenterte arbeidsflyter |
| **Sikkerhetsbegrensninger** | Direkte database-tilgang medfører sikkerhets- og samsvarsutfordringer | Begrenset distribusjon, manuell dataklargjøring |
| **Komplekse spørringer** | Forretningsbrukere trenger teknisk kunnskap for å hente data | Lav adopsjon, ineffektive prosesser |

### MCP-løsningen

Model Context Protocol løser disse utfordringene ved å tilby:

- **Sanntids datatilgang**: AI-assistenter forespør live databaser og APIer
- **Sikker integrasjon**: Kontrollert tilgang med autentisering og tillatelser
- **Naturlig språkgrensesnitt**: Forretningsbrukere stiller spørsmål på vanlig engelsk
- **Standardisert protokoll**: Fungerer på tvers av ulike AI-plattformer og verktøy

## 🏪 Møt Zava Retail: Vårt læringseksempel https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Gjennom denne læringsreisen bygger vi en MCP-server for **Zava Retail**, en fiktiv gjør-det-selv detaljhandelskjede med flere butikksteder. Dette realistiske scenariet demonstrerer bedriftsklassifisert MCP-implementasjon.

### Forretningskontekst

**Zava Retail** driver:
- **8 fysiske butikker** over hele delstaten Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- **1 nettbutikk** for netthandel
- **Variert produktkatalog** inkludert verktøy, jernvare, hageutstyr og byggematerialer
- **Flere ledelsesnivåer** med butikksjefer, regionsjefer og ledere

### Forretningskrav

Butikksjefer og ledere trenger AI-drevet analyse for å:

1. **Analysere salgsytelse** på tvers av butikker og tidsperioder
2. **Sporing av lagerstatus** og identifisering av etterfyllingsbehov
3. **Forstå kundeadferd** og kjøpsmønstre
4. **Oppdage produktinnsikt** gjennom semantisk søk
5. **Generere rapporter** med naturlige språkspørringer
6. **Opprettholde datasikkerhet** med rollestyrt tilgangskontroll

### Tekniske krav

MCP-serveren må tilby:

- **Multi-tenant datatilgang** hvor butikksjefer kun ser sin egen butikkutdata
- **Fleksibel spørring** med støtte for komplekse SQL-operasjoner
- **Semantisk søk** for produktoppdagelse og anbefalinger
- **Sanntidsdata** som reflekterer gjeldende forretningsstatus
- **Sikker autentisering** med row-level security (RLS)
- **Skalerbar arkitektur** som støtter flere samtidige brukere

## 🏗️ MCP Serverarkitektur Oversikt

Vår MCP-server implementerer en lagdelt arkitektur optimalisert for databaseintegrasjon:

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

### Viktige komponenter

#### **1. MCP Serverlag**
- **FastMCP Framework**: Moderne Python MCP serverimplementasjon
- **Verktøyregistrering**: Deklarative verktøy-definisjoner med typesikkerhet
- **Forespørselkontekst**: Brukeridentitet og sesjonshåndtering
- **Feilhåndtering**: Robust feilhåndtering og logging

#### **2. Databaseintegrasjonslag**
- **Tilgangspooling**: Effektiv asyncpg tilkoblingshåndtering
- **Skjemaleverandør**: Dynamisk oppdagelse av tabellskjema
- **Spørringseksekutør**: Sikker SQL-eksekvering med RLS-kontekst
- **Transaksjonshåndtering**: ACID-kompatibilitet og rollback-håndtering

#### **3. Sikkerhetslag**
- **Row Level Security**: PostgreSQL RLS for multikunde dataseparasjon
- **Brukeridentitet**: Butikksjef autentisering og autorisasjon
- **Tilgangskontroll**: Finmasket tilgangstillatelser og revisjonsspor
- **Inputvalidering**: SQL-injeksjonsbeskyttelse og validering av spørringer

#### **4. AI Forbedringslag**
- **Semantisk søk**: Vektorinnbeddinger for produktoppdagelse
- **Azure OpenAI Integrasjon**: Tekstinnbeddinggenerering
- **Likhetsalgoritmer**: pgvector cosinus-likhetsøk
- **Søkeoptimalisering**: Indeksering og ytelsestuning

## 🔧 Teknologistabel

### Kjerne-teknologier

| **Komponent** | **Teknologi** | **Formål** |
|---------------|---------------|------------|
| **MCP Framework** | FastMCP (Python) | Moderne MCP serverimplementasjon |
| **Database** | PostgreSQL 17 + pgvector | Relasjonsdata med vektorsøk |
| **AI-tjenester** | Azure OpenAI | Tekstinnbeddinger og språkmodeller |
| **Containerisering** | Docker + Docker Compose | Utviklingsmiljø |
| **Skyplattform** | Microsoft Azure | Produksjonsdistribusjon |
| **IDE-integrasjon** | VS Code | AI Chat og utviklingsarbeidsflyt |

### Utviklingsverktøy

| **Verktøy** | **Formål** |
|-------------|------------|
| **asyncpg** | Høypresterende PostgreSQL-driver |
| **Pydantic** | Datavalidering og serialisering |
| **Azure SDK** | Skyløsning integrasjon |
| **pytest** | Testrammeverk |
| **Docker** | Containerisering og distribusjon |

### Produksjonsstabel

| **Tjeneste** | **Azure Ressurs** | **Formål** |
|--------------|-------------------|------------|
| **Database** | Azure Database for PostgreSQL | Administrert databasen |
| **Container** | Azure Container Apps | Serverløs container-hosting |
| **AI-tjenester** | Microsoft Foundry | OpenAI-modeller og endepunkt |
| **Overvåkning** | Application Insights | Observabilitet og diagnostikk |
| **Sikkerhet** | Azure Key Vault | Hemmeligheter og konfigurasjonsstyring |

## 🎬 Bruksscenarier i praksis

La oss utforske hvordan forskjellige brukere interagerer med vår MCP-server:

### Scenario 1: Butikksjefens ytelsesgjennomgang

**Bruker**: Sarah, butikksjef i Seattle  
**Mål**: Analysere salgsytelsen for forrige kvartal

**Naturlig språksøk**:
> "Vis meg topp 10 produkter etter omsetning for min butikk i Q4 2024"

**Hva skjer**:
1. VS Code AI Chat sender spørring til MCP-server
2. MCP-server identifiserer Sarahs butikkskontekst (Seattle)
3. RLS-regler filtrerer data til kun Seattle-butikken
4. SQL-spørring genereres og utføres
5. Resultater formateres og sendes tilbake til AI Chat
6. AI gir analyse og innsikt

### Scenario 2: Produktoppdagelse med semantisk søk

**Bruker**: Mike, lageransvarlig  
**Mål**: Finne produkter som ligner på en kundes forespørsel

**Naturlig språksøk**:
> "Hvilke produkter selger vi som er lignende 'vanntette elektriske kontakter for utendørs bruk'?"

**Hva skjer**:
1. Spørring behandles av semantisk søkeverktøy
2. Azure OpenAI genererer innbeddingsvektor
3. pgvector utfører likhetssøk
4. Relaterte produkter rangeres etter relevans
5. Resultater inkluderer produktdetaljer og tilgjengelighet
6. AI foreslår alternativer og pakkemuligheter

### Scenario 3: Analyse på tvers av butikker

**Bruker**: Jennifer, regionsjef  
**Mål**: Sammenligne ytelse på tvers av alle butikker

**Naturlig språksøk**:
> "Sammenlign salg per kategori for alle butikker de siste 6 månedene"

**Hva skjer**:
1. RLS-kontekst settes for regionsansvarlig tilgang
2. Kompleks spørring for flere butikker genereres
3. Data aggregeres over butikklokasjoner
4. Resultater inkluderer trender og sammenligninger
5. AI identifiserer innsikter og anbefalinger

## 🔒 Sikkerhet og multikunde-tilgang dypdykk

Vår implementasjon prioriterer bedriftsklassifisert sikkerhet:

### Row Level Security (RLS)

PostgreSQL RLS sikrer dataseparasjon:

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

### Brukeridentitetshåndtering

Hver MCP-tilkobling inkluderer:
- **Butikksjef-ID**: Unik identifikator for RLS-kontekst
- **Rolletildeling**: Tillatelser og tilgangsnivåer
- **Sesjonshåndtering**: Sikker autentiseringstoken
- **Revisjonslogging**: Fullstendig tilgangshistorikk

### Databeskyttelse

Flere lag med sikkerhet:
- **Tilkoblingskryptering**: TLS for alle databaseforbindelser
- **Forebygging av SQL-injeksjon**: Kun parameteriserte spørringer
- **Inputvalidering**: Omfattende validering av forespørsler
- **Feilhåndtering**: Ingen sensitiv informasjon i feilmeldinger

## 🎯 Viktige poenger

Etter å ha fullført denne introduksjonen bør du forstå:

✅ **MCP verdi-tilbud**: Hvordan MCP kobler AI-assistenter til virkelige data  
✅ **Forretningskontekst**: Zava Retails krav og utfordringer  
✅ **Arkitekturoversikt**: Hovedkomponenter og deres samspill  
✅ **Teknologisk stabel**: Verktøy og rammeverk brukt underveis  
✅ **Sikkerhetsmodell**: Multikunde datatilgang og beskyttelse  
✅ **Bruksmønstre**: Virkelige spørringsscenarier og arbeidsflyter  

## 🚀 Hva nå?

Klar for å gå dypere? Fortsett med:

**[Lab 01: Kjernearkitektur-konsepter](../01-Architecture/README.md)**

Lær om MCP-server arkitektur-mønstre, database design-prinsipper og detaljert teknisk implementasjon som driver vår detaljhandelsanalyse-løsning.

## 📚 Ekstra ressurser

### MCP Dokumentasjon
- [MCP-spesifikasjon](https://modelcontextprotocol.io/docs/) - Offisiell protokoll-dokumentasjon
- [MCP for nybegynnere](https://aka.ms/mcp-for-beginners) - Omfattende MCP læringsguide
- [FastMCP Dokumentasjon](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokumentasjon

### Databaseintegrasjon
- [PostgreSQL Dokumentasjon](https://www.postgresql.org/docs/) - Komplett PostgreSQL referanse
- [pgvector Guide](https://github.com/pgvector/pgvector) - Vektorutvidelsesdokumentasjon
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS-guide

### Azure Tjenester
- [Azure OpenAI Dokumentasjon](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI-tjenesteintegrasjon
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Administrert databasen
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Serverløse containere

---

**Ansvarsfraskrivelse**: Dette er en læringsøvelse med fiktive detaljhandelsdata. Følg alltid din organisasjons retningslinjer for datastyring og sikkerhet ved implementering av lignende løsninger i produksjonsmiljøer.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->