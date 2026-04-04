# 🚀 MCP-server med PostgreSQL - Komplett læringsguide

## 🧠 Oversikt over læringsløpet for MCP-databaseintegrasjon

Denne omfattende læringsguiden lærer deg hvordan du bygger produksjonsklare **Model Context Protocol (MCP)-servere** som integreres med databaser gjennom en praktisk implementering av detaljhandelsanalyse. Du vil lære bedrifts-grade mønstre inkludert **Row Level Security (RLS)**, **semantisk søk**, **Azure AI-integrasjon**, og **multi-tenant data-tilgang**.

Enten du er backend-utvikler, AI-ingeniør eller dataarkitekt, gir denne guiden strukturert læring med virkelige eksempler og praktiske øvelser som tar deg gjennom følgende MCP-server https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Offisielle MCP-ressurser

- 📘 [MCP-dokumentasjon](https://modelcontextprotocol.io/) – Detaljerte veiledninger og brukerguider  
- 📜 [MCP-spesifikasjon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokollarkitektur og tekniske referanser  
- 🧑‍💻 [MCP GitHub-repositorium](https://github.com/modelcontextprotocol) – Open-source SDK-er, verktøy og kodeeksempler  
- 🌐 [MCP-fellesskap](https://github.com/orgs/modelcontextprotocol/discussions) – Delta i diskusjoner og bidra til fellesskapet  
- 🔒 [OWASP MCP Topp 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Sikkerhets beste praksis og risikoredusering  

## 🧭 Læringsløpet for MCP-databaseintegrasjon

### 📚 Komplett læringsstruktur for https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Emne | Beskrivelse | Lenke |
|--------|-------|-------------|------|
| **Lab 1-3: Grunnlag** | | | |
| 00 | [Introduksjon til MCP databaseintegrasjon](./00-Introduction/README.md) | Oversikt over MCP med databaseintegrasjon og detaljhandelsanalyse brukstilfelle | [Start her](./00-Introduction/README.md) |
| 01 | [Kjernearkitekturkonsepter](./01-Architecture/README.md) | Forstå MCP-serverarkitektur, databasenivåer og sikkerhetsmønstre | [Lær](./01-Architecture/README.md) |
| 02 | [Sikkerhet og Multi-Tenancy](./02-Security/README.md) | Row Level Security, autentisering og data-tilgang for flere leietakere | [Lær](./02-Security/README.md) |
| 03 | [Miljøoppsett](./03-Setup/README.md) | Konfigurering av utviklingsmiljø, Docker, Azure-ressurser | [Sett opp](./03-Setup/README.md) |
| **Lab 4-6: Bygge MCP-serveren** | | | |
| 04 | [Database-design og skjema](./04-Database/README.md) | PostgreSQL-oppsett, detaljhandelsskjema og eksempeldata | [Bygg](./04-Database/README.md) |
| 05 | [MCP-serverimplementering](./05-MCP-Server/README.md) | Bygge FastMCP-server med databaseintegrasjon | [Bygg](./05-MCP-Server/README.md) |
| 06 | [Verktøyutvikling](./06-Tools/README.md) | Lage databaseforespørselsverktøy og skjema-introspeksjon | [Bygg](./06-Tools/README.md) |
| **Lab 7-9: Avanserte funksjoner** | | | |
| 07 | [Semantisk søkintegrasjon](./07-Semantic-Search/README.md) | Implementering av vektorembedninger med Azure OpenAI og pgvector | [Avansert](./07-Semantic-Search/README.md) |
| 08 | [Testing og feilsøking](./08-Testing/README.md) | Teststrategier, feilsøkingsverktøy og valideringstilnærminger | [Test](./08-Testing/README.md) |
| 09 | [VS Code-integrasjon](./09-VS-Code/README.md) | Konfigurere VS Code MCP-integrasjon og AI Chat-bruk | [Integrer](./09-VS-Code/README.md) |
| **Lab 10-12: Produksjon og beste praksis** | | | |
| 10 | [Distribusjonsstrategier](./10-Deployment/README.md) | Docker-distribusjon, Azure Container Apps og skaleringshensyn | [Distribuer](./10-Deployment/README.md) |
| 11 | [Overvåking og observabilitet](./11-Monitoring/README.md) | Application Insights, logging, ytelsesovervåking | [Overvåk](./11-Monitoring/README.md) |
| 12 | [Beste praksis og optimalisering](./12-Best-Practices/README.md) | Ytelsesoptimalisering, sikkerhetsharding og produksjonstips | [Optimaliser](./12-Best-Practices/README.md) |

### 💻 Hva du vil bygge

Ved slutten av dette læringsløpet har du bygget en komplett **Zava Retail Analytics MCP-server** med:

- **Multi-tabells detaljhandelsdatabase** med kundeordrer, produkter og lager  
- **Row Level Security** for butikkbasert dataisolasjon  
- **Semantisk produktsøk** med Azure OpenAI-embeddings  
- **VS Code AI Chat-integrasjon** for naturlige språkspørringer  
- **Produksjonsklar distribusjon** med Docker og Azure  
- **Omfattende overvåking** med Application Insights  

## 🎯 Forutsetninger for læring

For å få mest mulig ut av dette læringsløpet bør du ha:

- **Programmeringserfaring**: Kjennskap til Python (foretrukket) eller lignende språk  
- **Databasekunnskap**: Grunnleggende forståelse av SQL og relasjonsdatabaser  
- **API-konsepter**: Forståelse for REST API-er og HTTP-konsepter  
- **Utviklingsverktøy**: Erfaring med kommandolinje, Git og kodeeditorer  
- **Skybasics**: (Valgfritt) Grunnleggende kunnskap om Azure eller lignende skytjenester  
- **Docker-kunnskap**: (Valgfritt) Forståelse av containerisering  

### Nødvendige verktøy

- **Docker Desktop** – For å kjøre PostgreSQL og MCP-server  
- **Azure CLI** – For distribusjon av skyressurser  
- **VS Code** – For utvikling og MCP-integrasjon  
- **Git** – For versjonskontroll  
- **Python 3.8+** – For MCP-serverutvikling  

## 📚 Studieveiledning og ressurser

Dette læringsløpet inkluderer omfattende ressurser for effektiv navigering:

### Studieveiledning

Hver lab inneholder:  
- **Klare læringsmål** – Hva du skal oppnå  
- **Trinnvise instruksjoner** – Detaljerte implementasjonsveiledninger  
- **Kodeeksempler** – Arbeidende eksempler med forklaringer  
- **Øvelser** – Praktiske oppgaver  
- **Feilsøkingsveiledere** – Vanlige problemer og løsninger  
- **Tilleggsressurser** – Videre lesing og utforsking  

### Forutsetningssjekk

Før du starter hver lab finner du:  
- **Påkrevd kunnskap** – Hva du bør kunne på forhånd  
- **Oppsettsvalidering** – Hvordan verifisere miljøet ditt  
- **Tidsestimater** – Forventet ferdigstillelsestid  
- **Læringsutbytte** – Hva du kan etter fullføring  

### Anbefalte læringsveier

Velg din vei basert på erfaring:

#### 🟢 **Nybegynnervei** (Ny på MCP)  
1. Pass på at du har fullført 0-10 i [MCP for nybegynnere](https://aka.ms/mcp-for-beginners) først  
2. Fullfør lab 00-03 for å styrke grunnlaget ditt  
3. Følg lab 04-06 for praktisk bygging  
4. Prøv lab 07-09 for praktisk bruk  

#### 🟡 **Mellomnivåveien** (Noe MCP-erfaring)  
1. Gå gjennom lab 00-01 for database-spesifikke konsepter  
2. Fokuser på lab 02-06 for implementering  
3. Dykk dypt i lab 07-12 for avanserte funksjoner  

#### 🔴 **Avansert vei** (Erfaren med MCP)  
1. Skum igjennom lab 00-03 for kontekst  
2. Fokuser på lab 04-09 for databaseintegrasjon  
3. Konsentrer deg om lab 10-12 for produksjonsdistribusjon  

## 🛠️ Hvordan bruke dette læringsløpet effektivt

### Sekvensiell læring (Anbefalt)

Arbeid deg gjennom labene i rekkefølge for en helhetlig forståelse:

1. **Les oversikten** – Forstå hva du skal lære  
2. **Sjekk forutsetninger** – Sørg for at du har nødvendig kunnskap  
3. **Følg trinnvise guider** – Implementer mens du lærer  
4. **Fullfør øvelser** – Forsterk forståelsen  
5. **Gå gjennom viktige punkter** – Konsolider læringsutbyttet  

### Målrettet læring

Hvis du trenger spesifikke ferdigheter:

- **Databaseintegrasjon**: Fokuser på lab 04-06  
- **Sikkerhetsimplementering**: Konsentrer deg om lab 02, 08, 12  
- **AI/Semantisk søk**: Dykk ned i lab 07  
- **Produksjonsdistribusjon**: Studer lab 10-12  

### Praktisk øvelse

Hver lab inneholder:  
- **Arbeidende kodeeksempler** – Kopier, modifiser og eksperimenter  
- **Virkelige scenarier** – Praktiske detaljhandelsanalytiske brukstilfeller  
- **Progressiv kompleksitet** – Bygge fra enkelt til avansert  
- **Valideringstrinn** – Verifiser at implementeringen din fungerer  

## 🌟 Fellesskap og støtte

### Få hjelp

- **Azure AI Discord**: [Bli med for ekspertstøtte](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub Repo og implementeringsprøve**: [Distribusjonseksempel og ressurser](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP-fellesskap**: [Bli med i utvidede MCP-diskusjoner](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 Klar til å starte?

Begynn reisen med **[Lab 00: Introduksjon til MCP databaseintegrasjon](./00-Introduction/README.md)**

---

*Mestring av å bygge produksjonsklare MCP-servere med databaseintegrasjon gjennom denne omfattende, praktiske læringsopplevelsen.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vennligst vær oppmerksom på at automatiserte oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->