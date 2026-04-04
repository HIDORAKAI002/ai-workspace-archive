# 🚀 MCP-server med PostgreSQL - Komplett lärandeguide

## 🧠 Översikt över MCP:s lärandeväg för databasintegration

Den här omfattande lärandeguiden lär dig hur du bygger produktionsredo **Model Context Protocol (MCP)-servrar** som integreras med databaser genom en praktisk implementering av detaljhandelsanalys. Du lär dig företagsklassens mönster inklusive **Row Level Security (RLS)**, **semantisk sökning**, **Azure AI-integration** och **multi-tenant dataåtkomst**.

Oavsett om du är backendutvecklare, AI-ingenjör eller dataarkitekt ger denna guide strukturerad inlärning med verkliga exempel och praktiska övningar som leder dig genom följande MCP-server https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## 🔗 Officiella MCP-resurser

- 📘 [MCP-dokumentation](https://modelcontextprotocol.io/) – Utförliga handledningar och användarguider
- 📜 [MCP-specifikation (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokollarkitektur och tekniska referenser
- 🧑‍💻 [MCP GitHub-repo](https://github.com/modelcontextprotocol) – Öppen källkod SDK:er, verktyg och kodexempel
- 🌐 [MCP-community](https://github.com/orgs/modelcontextprotocol/discussions) – Gå med i diskussioner och bidra till communityn
- 🔒 [OWASP MCP Topp 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Säkerhetsbästa praxis och riskreducering


## 🧭 MCP:s lärandeväg för databasintegration

### 📚 Komplett lärandestruktur för https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

| Lab | Ämne | Beskrivning | Länk |
|--------|-------|-------------|------|
| **Lab 1-3: Grunderna** | | | |
| 00 | [Introduktion till MCP-databasintegration](./00-Introduction/README.md) | Översikt av MCP med databasintegration och detaljhandelsanalysfall | [Börja här](./00-Introduction/README.md) |
| 01 | [Kärnarkitekturkoncept](./01-Architecture/README.md) | Förstå MCP-serverarkitektur, databaslager och säkerhetsmönster | [Lär dig](./01-Architecture/README.md) |
| 02 | [Säkerhet och multi-tenancy](./02-Security/README.md) | Row Level Security, autentisering och multi-tenant dataåtkomst | [Lär dig](./02-Security/README.md) |
| 03 | [Miljöuppsättning](./03-Setup/README.md) | Sätta upp utvecklingsmiljö, Docker, Azure-resurser | [Sätt upp](./03-Setup/README.md) |
| **Lab 4-6: Bygga MCP-servern** | | | |
| 04 | [Databasdesign och schema](./04-Database/README.md) | PostgreSQL-setup, detaljhandelsschemasdesign och exempeldata | [Bygg](./04-Database/README.md) |
| 05 | [Implementering av MCP-server](./05-MCP-Server/README.md) | Bygga FastMCP-server med databasintegration | [Bygg](./05-MCP-Server/README.md) |
| 06 | [Verktygsutveckling](./06-Tools/README.md) | Skapa databasfrågevertyg och schema-introspektion | [Bygg](./06-Tools/README.md) |
| **Lab 7-9: Avancerade funktioner** | | | |
| 07 | [Semantisk sökintegration](./07-Semantic-Search/README.md) | Implementera vektorembeddingar med Azure OpenAI och pgvector | [Avancerat](./07-Semantic-Search/README.md) |
| 08 | [Testning och felsökning](./08-Testing/README.md) | Teststrategier, felsökningsverktyg och valideringsmetoder | [Testa](./08-Testing/README.md) |
| 09 | [VS Code-integration](./09-VS-Code/README.md) | Konfigurera VS Code MCP-integration och AI-chatbott | [Integrera](./09-VS-Code/README.md) |
| **Lab 10-12: Produktion och bästa praxis** | | | |
| 10 | [Distribueringsstrategier](./10-Deployment/README.md) | Docker-distribution, Azure Container Apps och skalningsaspekter | [Distribuera](./10-Deployment/README.md) |
| 11 | [Övervakning och observabilitet](./11-Monitoring/README.md) | Application Insights, loggning, prestandaövervakning | [Övervaka](./11-Monitoring/README.md) |
| 12 | [Bästa praxis och optimering](./12-Best-Practices/README.md) | Prestandaoptimering, säkerhetshärdning och produktionstips | [Optimera](./12-Best-Practices/README.md) |

### 💻 Vad du kommer att bygga

I slutet av denna lärandeväg kommer du ha byggt en komplett **Zava Retail Analytics MCP-server** med:

- **Detaljhandelsdatabas med flera tabeller** med kundorder, produkter och lager
- **Row Level Security** för butiksspecifik dataisolering
- **Semantisk produktsökning** med Azure OpenAI-embeddingar
- **VS Code AI Chat-integration** för naturliga språkfrågor
- **Produktionsredo distribution** med Docker och Azure
- **Omfattande övervakning** med Application Insights

## 🎯 Förkunskaper för inlärning

För att få ut mest av denna lärandeväg bör du ha:

- **Programmeringserfarenhet**: Bekantskap med Python (föredras) eller liknande språk
- **Databaskunskap**: Grundläggande förståelse för SQL och relationsdatabaser
- **API-koncept**: Förståelse för REST-API:er och HTTP-koncept
- **Utvecklingsverktyg**: Erfarenhet av kommandorad, Git och kodredigerare
- **Molngrunder**: (Valfritt) Grundläggande kunskap om Azure eller liknande molnplattformar
- **Docker-kunskap**: (Valfritt) Förståelse för containerisering

### Krävda verktyg

- **Docker Desktop** – För att köra PostgreSQL och MCP-servern
- **Azure CLI** – För deployment av molnresurser
- **VS Code** – För utveckling och MCP-integration
- **Git** – För versionshantering
- **Python 3.8+** – För MCP-serverutveckling

## 📚 Studievägledning & resurser

Denna lärandeväg inkluderar omfattande resurser för att hjälpa dig navigera effektivt:

### Studievägledning

Varje lab innehåller:
- **Tydliga lärandemål** – Vad du kommer uppnå
- **Steg-för-steg-instruktioner** – Detaljerade implementationsguider
- **Kodexempel** – Fungerande exempel med förklaringar
- **Övningar** – Praktiska övningar
- **Felsökningsguider** – Vanliga problem och lösningar
- **Ytterligare resurser** – Vidare läsning och exploration

### Förkunskapskontroll

Innan varje lab hittar du:
- **Krävd kunskap** – Vad du bör kunna innan
- **Validering av setup** – Hur du verifierar din miljö
- **Tidsuppskattningar** – Förväntad sluttid
- **Inlärningsresultat** – Vad du vet efter avslutad labb

### Rekommenderade lärandevägar

Välj din väg baserat på erfarenhet:

#### 🟢 **Nykomling** (Ny till MCP)
1. Säkerställ att du har slutfört 0-10 i [MCP för nybörjare](https://aka.ms/mcp-for-beginners) först
2. Slutför labb 00-03 för att befästa grunderna
3. Följ labb 04-06 för praktiskt byggande
4. Testa labb 07-09 för praktisk användning

#### 🟡 **Mellanliggande** (Viss MCP-erfarenhet)
1. Gå igenom labb 00-01 för databasrelaterade koncept
2. Fokusera på labb 02-06 för implementation
3. Fördjupa dig i labb 07-12 för avancerade funktioner

#### 🔴 **Avancerad** (Erfaren med MCP)
1. Skumma igenom labb 00-03 för kontext
2. Fokusera på labb 04-09 för databasintegration
3. Koncentrera dig på labb 10-12 för produktionsdistribution

## 🛠️ Hur du använder denna lärandeväg effektivt

### Sekventiellt lärande (Rekommenderat)

Arbeta dig igenom labb i ordning för en omfattande förståelse:

1. **Läs översikten** – Förstå vad du lär dig
2. **Kontrollera förkunskaper** – Säkerställ att du har nödvändig kunskap
3. **Följ steg-för-steg-guider** – Implementera samtidigt som du lär
4. **Genomför övningar** – Befäst din förståelse
5. **Gå igenom nyckelpunkter** – Förankra inlärningsresultat

### Målstyrt lärande

Om du behöver särskilda färdigheter:

- **Databasintegration**: Fokusera på labb 04-06
- **Säkerhetsimplementering**: Koncentrera dig på labb 02, 08, 12
- **AI/Semantisk sökning**: Fördjupa dig i labb 07
- **Produktionsdistribution**: Studera labb 10-12

### Praktisk träning

Varje labb innehåller:
- **Fungerande kodexempel** – Kopiera, modifiera och testa
- **Verkliga scenarier** – Praktiska detaljhandelsanalysfall
- **Progressiv komplexitet** – Bygg från enkelt till avancerat
- **Valideringssteg** – Verifiera att din implementation fungerar

## 🌟 Community och support

### Få hjälp

- **Azure AI Discord**: [Gå med för expertstöd](https://discord.com/invite/ByRwuEEgH4)
- **GitHub-repo och implementeringsprov**: [Distributionsprov och resurser](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)
- **MCP-community**: [Gå med i bredare MCP-diskussioner](https://github.com/orgs/modelcontextprotocol/discussions)

## 🚀 Redo att börja?

Börja din resa med **[Lab 00: Introduktion till MCP-databasintegration](./00-Introduction/README.md)**

---

*Bemästra att bygga produktionsklara MCP-servrar med databasintegration genom denna omfattande, praktiska lärandeupplevelse.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, bör du vara medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör anses vara den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för eventuella missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->