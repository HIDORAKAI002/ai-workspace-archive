# 🚀 MCP-server met PostgreSQL - Complete leerhandleiding

## 🧠 Overzicht van het MCP-database-integratie leerpad

Deze uitgebreide leerhandleiding leert je hoe je productieklare **Model Context Protocol (MCP)-servers** bouwt die integreren met databases via een praktische implementatie van retailanalyse. Je leert bedrijfswaardige patronen, waaronder **Row Level Security (RLS)**, **semantisch zoeken**, **Azure AI-integratie** en **multi-tenant data toegang**.

Of je nu een backendontwikkelaar, AI-engineer of data-architect bent, deze gids biedt gestructureerd leren met praktijkvoorbeelden en hands-on oefeningen die je door de volgende MCP-server https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail leiden.

## 🔗 Officiële MCP-bronnen

- 📘 [MCP-documentatie](https://modelcontextprotocol.io/) – Gedetailleerde tutorials en gebruiksgidsen
- 📜 [MCP-specificatie (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protocolarchitectuur en technische referenties
- 🧑‍💻 [MCP GitHub-repository](https://github.com/modelcontextprotocol) – Open-source SDK's, tools en codevoorbeelden
- 🌐 [MCP-community](https://github.com/orgs/modelcontextprotocol/discussions) – Doe mee aan discussies en draag bij aan de community
- 🔒 [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Best practices voor beveiliging en risicobeperking


## 🧭 MCP Database Integration Leerpad

### 📚 Complete leersamenstelling voor https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Onderwerp | Beschrijving | Link |
|--------|-------|-------------|------|
| **Lab 1-3: Basisprincipes** | | | |
| 00 | [Introductie tot MCP Database-integratie](./00-Introduction/README.md) | Overzicht van MCP met database-integratie en retailanalyse use case | [Start hier](./00-Introduction/README.md) |
| 01 | [Kernarchitectuurconcepten](./01-Architecture/README.md) | Begrip van MCP-serverarchitectuur, databaselagen en beveiligingspatronen | [Leer](./01-Architecture/README.md) |
| 02 | [Beveiliging en Multi-Tenancy](./02-Security/README.md) | Row Level Security, authenticatie en multi-tenant data toegang | [Leer](./02-Security/README.md) |
| 03 | [Omgevingsopzet](./03-Setup/README.md) | Opzetten van ontwikkelomgeving, Docker, Azure resources | [Setup](./03-Setup/README.md) |
| **Lab 4-6: Het bouwen van de MCP-server** | | | |
| 04 | [Databaseontwerp en Schema](./04-Database/README.md) | PostgreSQL-opzet, retail-schema ontwerp en voorbeelddata | [Bouwen](./04-Database/README.md) |
| 05 | [MCP-serverimplementatie](./05-MCP-Server/README.md) | Het bouwen van de FastMCP-server met database-integratie | [Bouwen](./05-MCP-Server/README.md) |
| 06 | [Toolontwikkeling](./06-Tools/README.md) | Creëren van database query tools en schema introspectie | [Bouwen](./06-Tools/README.md) |
| **Lab 7-9: Geavanceerde functies** | | | |
| 07 | [Semantische zoekintegratie](./07-Semantic-Search/README.md) | Implementatie van vector embeddings met Azure OpenAI en pgvector | [Geavanceerd](./07-Semantic-Search/README.md) |
| 08 | [Testen en debuggen](./08-Testing/README.md) | Teststrategieën, debugging tools en validatieaanpakken | [Testen](./08-Testing/README.md) |
| 09 | [VS Code-integratie](./09-VS-Code/README.md) | Configureren van VS Code MCP-integratie en AI Chat gebruik | [Integreren](./09-VS-Code/README.md) |
| **Lab 10-12: Productie en best practices** | | | |
| 10 | [Deploystrategieën](./10-Deployment/README.md) | Docker-deploy, Azure Container Apps en schaalbaarheidsconsideraties | [Deployen](./10-Deployment/README.md) |
| 11 | [Monitoring en observeerbaarheid](./11-Monitoring/README.md) | Application Insights, logging, performance monitoring | [Monitoren](./11-Monitoring/README.md) |
| 12 | [Best Practices en optimalisatie](./12-Best-Practices/README.md) | Prestatieoptimalisatie, beveiligingsversterking en productietips | [Optimaliseren](./12-Best-Practices/README.md) |

### 💻 Wat je gaat bouwen

Aan het einde van dit leerpad heb je een complete **Zava Retail Analytics MCP-server** gebouwd met:

- **Multi-table retail database** met klantbestellingen, producten en voorraad
- **Row Level Security** voor dataisolatie per winkel
- **Semantische productzoekfunctie** met Azure OpenAI embeddings
- **VS Code AI Chat-integratie** voor natuurlijke taalvragen
- **Productieklaar deployment** met Docker en Azure
- **Uitgebreide monitoring** met Application Insights

## 🎯 Vereisten voor het leren

Om het meeste uit dit leerpad te halen, moet je beschikken over:

- **Programmeervaardigheden**: Bekendheid met Python (bij voorkeur) of vergelijkbare talen
- **Databasekennis**: Basisbegrip van SQL en relationele databases
- **API-concepten**: Begrip van REST API’s en HTTP-concepten
- **Ontwikkeltools**: Ervaring met command line, Git en code-editors
- **Cloudbasiskennis**: (Optioneel) Basiskennis van Azure of vergelijkbare cloudplatformen
- **Docker-bekendheid**: (Optioneel) Begrip van containerisatieconcepten

### Vereiste tools

- **Docker Desktop** - Voor het draaien van PostgreSQL en de MCP-server
- **Azure CLI** - Voor het deployen van cloudresources
- **VS Code** - Voor ontwikkeling en MCP-integratie
- **Git** - Voor versiebeheer
- **Python 3.8+** - Voor ontwikkeling van MCP-server

## 📚 Studiehandleiding & bronnen

Dit leerpad bevat uitgebreide bronnen om je effectief te begeleiden:

### Studiehandleiding

Elke lab bevat:
- **Duidelijke leerdoelen** - Wat je gaat bereiken
- **Stapsgewijze instructies** - Gedetailleerde implementatiehandleidingen
- **Codevoorbeelden** - Werkende voorbeelden met uitleg
- **Oefeningen** - Praktijkmogelijkheden
- **Probleemoplossingsgidsen** - Veelvoorkomende problemen en oplossingen
- **Aanvullende bronnen** - Verdere literatuur en verkenning

### Check van vereisten

Voorafgaand aan elk lab vind je:
- **Vereiste kennis** - Wat je vooraf moet weten
- **Setup-validatie** - Hoe je je omgeving controleert
- **Tijdsindicaties** - Verwachte tijdsduur voor afronding
- **Leerresultaten** - Wat je weet na afronding

### Aanbevolen leerpaden

Kies een pad gebaseerd op je ervaringsniveau:

#### 🟢 **Beginnerpad** (Nieuw met MCP)
1. Zorg dat je eerst 0-10 van [MCP voor beginners](https://aka.ms/mcp-for-beginners) hebt afgerond
2. Voltooi labs 00-03 om je basis te versterken
3. Volg labs 04-06 voor hands-on bouwen
4. Probeer labs 07-09 voor praktische toepassing

#### 🟡 **Intermediate Pad** (Enige MCP-ervaring)
1. Bekijk labs 00-01 voor database-specifieke concepten
2. Richt je op labs 02-06 voor implementatie
3. Duik diep in labs 07-12 voor gevorderde functies

#### 🔴 **Geavanceerd pad** (Ervaren met MCP)
1. Snel door labs 00-03 voor context
2. Focus op labs 04-09 voor database-integratie
3. Concentreer je op labs 10-12 voor productie-deploy

## 🛠️ Hoe dit leerpad effectief te gebruiken

### Sequentieel leren (aanbevolen)

Werk labs in volgorde door voor een compleet begrip:

1. **Lees het overzicht** - Begrijp wat je gaat leren
2. **Controleer vereisten** - Zorg dat je kennis klopt
3. **Volg stapsgewijze gidsen** - Implementeer terwijl je leert
4. **Maak oefeningen** - Versterk je begrip
5. **Bekijk belangrijke punten** - Veranker leerresultaten

### Gericht leren

Als je specifieke vaardigheden nodig hebt:

- **Database-integratie**: Focus op labs 04-06
- **Beveiligingsimplementatie**: Concentreer op labs 02, 08, 12
- **AI/Semantisch zoeken**: Duik in lab 07
- **Productie-deploy**: Bestudeer labs 10-12

### Hands-on praktijk

Elke lab bevat:
- **Werkende codevoorbeelden** - Kopieer, pas aan en experimenteer
- **Realistische scenario’s** - Praktische retailanalyse cases
- **Oplopende complexiteit** - Opbouw van simpel naar geavanceerd
- **Validatiestappen** - Controleren of je implementatie werkt

## 🌟 Community en ondersteuning

### Hulp krijgen

- **Azure AI Discord**: [Word lid voor deskundige ondersteuning](https://discord.com/invite/ByRwuEEgH4)
- **GitHub repo en implementatiemonster**: [Deploymentsample en bronnen](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP-community**: [Doe mee aan bredere MCP-discussies](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Klaar om te beginnen?

Begin je reis met **[Lab 00: Introductie tot MCP Database-integratie](./00-Introduction/README.md)**

---

*Word meester in het bouwen van productieklare MCP-servers met database-integratie via deze uitgebreide, praktijkgerichte leerervaring.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat automatische vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal dient als de gezaghebbende bron te worden beschouwd. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor enige misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->