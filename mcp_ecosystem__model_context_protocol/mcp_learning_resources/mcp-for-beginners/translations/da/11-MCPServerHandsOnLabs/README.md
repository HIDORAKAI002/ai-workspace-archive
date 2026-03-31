# 🚀 MCP-server med PostgreSQL - Komplet læringsguide

## 🧠 Oversigt over MCP-databaseintegrations læringssti

Denne omfattende læringsguide lærer dig at bygge produktionsklare **Model Context Protocol (MCP) servere**, der integrerer med databaser gennem en praktisk implementering inden for detailhandel og analyse. Du lærer virksomhedsklasse mønstre inklusive **Row Level Security (RLS)**, **semantisk søgning**, **Azure AI-integration** og **multi-tenant dataadgang**.

Uanset om du er backend-udvikler, AI-ingeniør eller dataarkitekt, giver denne guide struktureret læring med virkelige eksempler og praktiske øvelser, der går igennem følgende MCP-server https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Officielle MCP-ressourcer

- 📘 [MCP Dokumentation](https://modelcontextprotocol.io/) – Detaljerede tutorials og brugervejledninger
- 📜 [MCP Specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokolarkitektur og tekniske referencer
- 🧑‍💻 [MCP GitHub Repository](https://github.com/modelcontextprotocol) – Open source SDK’er, værktøjer og kodeeksempler
- 🌐 [MCP Community](https://github.com/orgs/modelcontextprotocol/discussions) – Deltag i diskussioner og bidrag til fællesskabet
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Bedste sikkerhedspraksis og risikoreduktion


## 🧭 MCP-databaseintegrations læringssti

### 📚 Komplet læringsstruktur for https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Emne | Beskrivelse | Link |
|--------|-------|-------------|------|
| **Lab 1-3: Grundlag** | | | |
| 00 | [Introduktion til MCP-databaseintegration](./00-Introduction/README.md) | Oversigt over MCP med databaseintegration og detailhandelsanalyse use case | [Start her](./00-Introduction/README.md) |
| 01 | [Kernearkitektur-koncepter](./01-Architecture/README.md) | Forståelse af MCP-serverarkitektur, database-lag og sikkerhedsmønstre | [Lær](./01-Architecture/README.md) |
| 02 | [Sikkerhed og multi-tenancy](./02-Security/README.md) | Row Level Security, autentificering og dataadgang for multi-tenant | [Lær](./02-Security/README.md) |
| 03 | [Opsætning af miljø](./03-Setup/README.md) | Opsætning af udviklingsmiljø, Docker, Azure-ressourcer | [Opsæt](./03-Setup/README.md) |
| **Lab 4-6: Opbygning af MCP-serveren** | | | |
| 04 | [Database design og skema](./04-Database/README.md) | PostgreSQL opsætning, detailhandels skemadesign og eksempeldata | [Byg](./04-Database/README.md) |
| 05 | [MCP-server implementation](./05-MCP-Server/README.md) | Opbygning af FastMCP-serveren med databaseintegration | [Byg](./05-MCP-Server/README.md) |
| 06 | [Værktøjsudvikling](./06-Tools/README.md) | Oprettelse af databaseforespørgselsværktøjer og skemainspektion | [Byg](./06-Tools/README.md) |
| **Lab 7-9: Avancerede funktioner** | | | |
| 07 | [Semantisk søgeintegration](./07-Semantic-Search/README.md) | Implementering af vektor-embedding med Azure OpenAI og pgvector | [Avanceret](./07-Semantic-Search/README.md) |
| 08 | [Test og fejlfinding](./08-Testing/README.md) | Teststrategier, fejlfindingværktøjer og valideringsmetoder | [Test](./08-Testing/README.md) |
| 09 | [VS Code integration](./09-VS-Code/README.md) | Konfiguration af VS Code MCP-integration og AI Chat brug | [Integrer](./09-VS-Code/README.md) |
| **Lab 10-12: Produktion og bedste praksis** | | | |
| 10 | [Deploymentsstrategier](./10-Deployment/README.md) | Docker-udrulning, Azure Container Apps og skaleringsovervejelser | [Deploy](./10-Deployment/README.md) |
| 11 | [Overvågning og observabilitet](./11-Monitoring/README.md) | Application Insights, logning, performance monitoring | [Overvåg](./11-Monitoring/README.md) |
| 12 | [Bedste praksis og optimering](./12-Best-Practices/README.md) | Performanceoptimering, sikkerhedsstyrkelse og production tips | [Optimer](./12-Best-Practices/README.md) |

### 💻 Hvad du vil bygge

Ved afslutningen af denne læringssti vil du have bygget en komplet **Zava Retail Analytics MCP-server**, der indeholder:

- **Multi-tabel detailhandelsdatabase** med kundeordrer, produkter og lager
- **Row Level Security** for butikbaseret data-isolation
- **Semantisk produktsøgning** ved brug af Azure OpenAI embeddings
- **VS Code AI Chat integration** til forespørgsler i naturligt sprog
- **Produktionsklar deployment** med Docker og Azure
- **Omfattende overvågning** med Application Insights

## 🎯 Forudsætninger for læring

For at få mest muligt ud af denne læringssti bør du have:

- **Programmeringserfaring**: Fortrolighed med Python (foretrukket) eller lignende sprog
- **Databasekendskab**: Grundlæggende forståelse af SQL og relationelle databaser
- **API-koncepter**: Forståelse af REST API’er og HTTP-koncepter
- **Udviklingsværktøjer**: Erfaring med kommandolinje, Git og kodeeditorer
- **Grundlæggende Cloud-viden**: (Valgfrit) Grundlæggende kendskab til Azure eller lignende cloud-platforme
- **Docker-fortrolighed**: (Valgfrit) Forståelse af containeriseringskoncepter

### Nødvendige værktøjer

- **Docker Desktop** - Til at køre PostgreSQL og MCP-serveren
- **Azure CLI** - Til udrulning af cloud-ressourcer
- **VS Code** - Til udvikling og MCP-integration
- **Git** - Til versionskontrol
- **Python 3.8+** - Til udvikling af MCP-server

## 📚 Studievejledning & ressourcer

Denne læringssti inkluderer omfattende ressourcer, der hjælper dig navigere effektivt:

### Studievejledning

Hvert lab indeholder:
- **Klare læringsmål** - Hvad du opnår
- **Trin-for-trin instruktioner** - Detaljerede implementeringsvejledninger
- **Kodeeksempler** - Arbejdende eksempler med forklaringer
- **Øvelser** - Praktiske øvelser
- **Fejlfinding** - Almindelige problemer og løsninger
- **Yderligere ressourcer** - Videre læsning og udforskning

### Forudsætningskontrol

Før hvert lab finder du:
- **Nødvendig viden** - Hvad du bør kunne på forhånd
- **Opsætningsvalidering** - Sådan verificeres dit miljø
- **Tidsestimeringer** - Forventet gennemførelsestid
- **Læringsresultater** - Hvad du kan efter gennemførelse

### Anbefalede læringsstier

Vælg din sti baseret på dit erfaringsniveau:

#### 🟢 **Begyndersti** (Ny til MCP)
1. Sørg for at have gennemført 0-10 af [MCP for Beginners](https://aka.ms/mcp-for-beginners) først
2. Gennemfør labs 00-03 for at styrke dine grundlæggende kundskaber
3. Følg labs 04-06 for praktisk opbygning
4. Prøv labs 07-09 for praktisk anvendelse

#### 🟡 **Mellemliggende sti** (Noget MCP-erfaring)
1. Gennemgå labs 00-01 for database-specifikke koncepter
2. Fokuser på labs 02-06 for implementering
3. Dyk ned i labs 07-12 for avancerede funktioner

#### 🔴 **Avanceret sti** (Erfaren med MCP)
1. Læs hurtigt labs 00-03 for kontekst
2. Fokuser på labs 04-09 for databaseintegration
3. Koncentrer dig om labs 10-12 for produktionsudrulning

## 🛠️ Sådan bruger du denne læringssti effektivt

### Sekventiel læring (anbefales)

Arbejd dig igennem labs i rækkefølge for en grundig forståelse:

1. **Læs oversigten** – Forstå hvad du vil lære
2. **Tjek forudsætninger** – Sørg for at have den nødvendige viden
3. **Følg trin-for-trin-guides** – Implementér efterhånden som du lærer
4. **Gennemfør øvelser** – Forstærk forståelsen
5. **Gennemgå nøglepunkter** – Konsolider læringsresultater

### Målrettet læring

Hvis du har brug for specifikke færdigheder:

- **Databaseintegration**: Fokuser på labs 04-06
- **Sikkerhedsimplementering**: Koncentrer dig om labs 02, 08, 12
- **AI/Semantisk søgning**: Dyk dybt ned i lab 07
- **Produktionsudrulning**: Studér labs 10-12

### Praktisk øvelse

Hvert lab indeholder:
- **Fungerende kodeeksempler** – Kopiér, modificér og eksperimentér
- **Virkelige scenarier** – Praktiske cases med detailhandelsanalyse
- **Progressiv kompleksitet** – Fra simpel til avanceret
- **Valideringstrin** – Bekræft at din implementering virker

## 🌟 Fællesskab og support

### Få hjælp

- **Azure AI Discord**: [Deltag for ekspertstøtte](https://discord.com/invite/ByRwuEEgH4)
- **GitHub Repo og implementations-eksempel**: [Deploymentsample og ressourcer](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP Community**: [Deltag i bredere MCP-diskussioner](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Klar til at starte?

Begynd din rejse med **[Lab 00: Introduktion til MCP-databaseintegration](./00-Introduction/README.md)**

---

*Bliv ekspert i at bygge produktionsklare MCP-servere med databaseintegration gennem denne omfattende, praktiske læringsoplevelse.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiske oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på dets oprindelige sprog skal betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->