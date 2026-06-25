# Model Context Protocol (MCP) for Begyndere - Studieguide

Denne studieguide giver et overblik over depotets struktur og indhold for "Model Context Protocol (MCP) for Beginners" pensum. Brug denne guide til effektivt at navigere i depotet og få mest muligt ud af de tilgængelige ressourcer.

## Depotoversigt

Model Context Protocol (MCP) er en standardiseret ramme for interaktioner mellem AI-modeller og klientapplikationer. Oprindeligt skabt af Anthropic, vedligeholdes MCP nu af det bredere MCP-fællesskab gennem den officielle GitHub-organisation. Dette depot giver et omfattende pensum med praktiske kodeeksempler i C#, Java, JavaScript, Python og TypeScript, designet til AI-udviklere, systemarkitekter og softwareingeniører.

## Visuelt Pensumkort

```mermaid
mindmap
  root((MCP for Beginners))
    00. Introduktion
      ::icon(fa fa-book)
      (Protokoloversigt)
      (Fordele ved standardisering)
      (Virkelige anvendelsestilfælde)
      (Grundlæggende AI-integration)
    01. Kernebegreber
      ::icon(fa fa-puzzle-piece)
      (Klient-server arkitektur)
      (Protokolkomponenter)
      (Beskedmønstre)
      (Transportmekanismer)
      (Opgaver - Eksperimentelle)
      (Værktøjsannoteringer)
    02. Sikkerhed
      ::icon(fa fa-shield)
      (AI-specifikke trusler)
      (Bedste praksis 2025)
      (Azure indholdssikkerhed)
      (Godkendelse & Autorisation)
      (Microsoft promptbeskyttelser)
      (OWASP MCP Top 10)
      (Sherpa sikkerhedsværksted)
    03. Kom godt i gang
      ::icon(fa fa-rocket)
      (Første serverimplementering)
      (Klientudvikling)
      (LLM klientintegration)
      (VS Code udvidelser)
      (SSE serveropsætning)
      (HTTP streaming)
      (AI værktøjskit integration)
      (Testningsrammer)
      (Avanceret serverbrug)
      (Simpel godkendelse)
      (Deploymentsstrategier)
      (MCP værtopsætning)
      (MCP inspektør)
    04. Praktisk implementering
      ::icon(fa fa-code)
      (Multisprogede SDK'er)
      (Testning & fejlfinding)
      (Prompt skabeloner)
      (Eksempelsprojekter)
      (Produktionsmønstre)
      (Paginering strategier)
    05. Avancerede emner
      ::icon(fa fa-graduation-cap)
      (Konteksteknik)
      (Foundry agentintegration)
      (Multimodale AI arbejdsgange)
      (OAuth2 autentificering)
      (Realtime søgning)
      (Streaming protokoller)
      (Root kontekster)
      (Routing strategier)
      (Sampling teknikker)
      (Skaleringsløsninger)
      (Sikkerhedshærdning)
      (Entra ID integration)
      (Websøgning MCP)
      (Protokolfunktioner dybdegående)
      (Adversarial multi-agent ræsonnering)
      
    06. Fællesskab
      ::icon(fa fa-users)
      (Kodebidrag)
      (Dokumentation)
      (MCP klientøkosystem)
      (MCP serverregister)
      (Billedgenereringsværktøjer)
      (GitHub samarbejde)
    07. Tidlig adoption
      ::icon(fa fa-lightbulb)
      (Produktionsudrulninger)
      (Microsoft MCP servere)
      (Azure MCP tjeneste)
      (Enterprise casestudier)
      (Fremtidig køreplan)
    08. Bedste praksis
      ::icon(fa fa-check)
      (Performanceoptimering)
      (Fejltolerance)
      (Systemresiliens)
      (Overvågning & observabilitet)
    09. Casestudier
      ::icon(fa fa-file-text)
      (Azure API styring)
      (AI rejseagent)
      (Azure DevOps integration)
      (Dokumentation MCP)
      (GitHub MCP register)
      (VS Code integration)
      (Virkelige implementeringer)
    10. Praktisk workshop
      ::icon(fa fa-laptop)
      (MCP server grundlag)
      (Avanceret udvikling)
      (AI værktøjskit integration)
      (Produktionsudrulning)
      (4-lab struktur)
    11. Databaseintegrations-labs
      ::icon(fa fa-database)
      (PostgreSQL integration)
      (Detailanalyse anvendelsestilfælde)
      (Række-niveau sikkerhed)
      (Semantisk søgning)
      (Produktionsudrulning)
      (13-lab struktur)
      (Praktisk læring)
    12. Værktøjer
      ::icon(fa fa-wrench)
      (MCP i Copilot app)
```

## Depotstruktur

Depotet er organiseret i tolv hovedsektioner, der hver fokuserer på forskellige aspekter af MCP:

1. **Introduktion (00-Introduction/)**
   - Oversigt over Model Context Protocol
   - Hvorfor standardisering er vigtigt i AI-pipelines
   - Praktiske anvendelsestilfælde og fordele

2. **Kernebegreber (01-CoreConcepts/)**
   - Client-server arkitektur
   - Centrale protokolkomponenter
   - Messaging-mønstre i MCP

3. **Sikkerhed (02-Security/)**
   - Sikkerhedstrusler i MCP-baserede systemer
   - Bedste praksis for sikring af implementeringer
   - Autentificerings- og autorisationsstrategier
   - **Omfattende sikkerhedsdokumentation**:
     - MCP Security Best Practices 2025
     - Azure Content Safety Implementeringsguide
     - MCP Security Controls og teknikker
     - MCP Best Practices Quick Reference
   - **Nøgle-emner inden for sikkerhed**:
     - Prompt injection og tool poisoning-angreb
     - Session hijacking og confused deputy-problemer
     - Token passthrough-sårbarheder
     - Overdrevne tilladelser og adgangskontrol
     - Supply chain-sikkerhed for AI-komponenter
     - Microsoft Prompt Shields-integration

4. **Kom godt i gang (03-GettingStarted/)**
   - Opsætning og konfiguration af miljøet
   - Oprettelse af grundlæggende MCP-servere og klienter
   - Integration med eksisterende applikationer
   - Indeholder sektioner for:
     - Første serverimplementering
     - Klientudvikling
     - LLM-klientintegration
     - VS Code-integration
     - Server-Sent Events (SSE) server
     - Avanceret serverbrug
     - HTTP streaming
     - AI Toolkit-integration
     - Teststrategier
     - Udrulningsretningslinjer

5. **Praktisk implementering (04-PracticalImplementation/)**
   - Brug af SDK'er på tværs af forskellige programmeringssprog
   - Debugging, test og valideringsteknikker
   - Udformning af genanvendelige prompt-skabeloner og workflows
   - Eksempelsprojekter med implementationseksempler

6. **Avancerede emner (05-AdvancedTopics/)**
   - Context engineering-teknikker
   - Foundry agent-integration
   - Multimodale AI-workflows
   - OAuth2 autentificeringsdemos
   - Realtids søgemuligheder
   - Realtids streaming
   - Root contexts implementering
   - Routing-strategier
   - Sampling-teknikker
   - Skaleringsmetoder
   - Sikkerhedsovervejelser
   - Entra ID sikkerhedsintegration
   - Websøgning-integration
   - Adversarial multi-agent resonnering (debate-mønstre)

7. **Fællesskabsbidrag (06-CommunityContributions/)**
   - Hvordan man bidrager med kode og dokumentation
   - Samarbejde via GitHub
   - Fællesskabsdrevne forbedringer og feedback
   - Brug af forskellige MCP-klienter (Claude Desktop, Cline, VSCode)
   - Arbejde med populære MCP-servere inklusive billedgenerering

8. **Lektioner fra tidlig adoption (07-LessonsfromEarlyAdoption/)**
   - Implementeringer i den virkelige verden og succeshistorier
   - Opbygning og udrulning af MCP-baserede løsninger
   - Tendenser og fremtidige roadmap
   - **Microsoft MCP Server Guide**: Omfattende guide til 10 produktionsklare Microsoft MCP-servere herunder:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (15+ specialiserede connectorer)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Microsoft Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Bedste praksis (08-BestPractices/)**
   - Performance-tuning og optimering
   - Design af fejltolerante MCP-systemer
   - Test- og robusthedsstrategier

10. **Case-studier (09-CaseStudy/)**
    - **Syv omfattende case-studier** der demonstrerer MCP’s alsidighed på tværs af forskellige scenarier:
    - **Azure AI Travel Agents**: Multi-agent orkestrering med Azure OpenAI og AI-søgning
    - **Azure DevOps Integration**: Automatisering af workflow-processer med YouTube-dataopdateringer
    - **Realtids dokumenthentning**: Python-konsolklient med streaming HTTP
    - **Interaktiv studieplan-generator**: Chainlit web-app med konversationsbaseret AI
    - **I-editor dokumentation**: VS Code-integration med GitHub Copilot workflows
    - **Azure API Management**: Enterprise API-integration med MCP serveropbygning
    - **GitHub MCP Registry**: Økosystemudvikling og agentisk integrationsplatform
    - Implementeringseksempler der spænder over enterprise-integration, udviklerproduktivitet og økosystemudvikling

11. **Handson workshop (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Omfattende hands-on workshop der kombinerer MCP med AI Toolkit
    - Opbygning af intelligente applikationer der forbinder AI-modeller med virkelige værktøjer
    - Praktiske moduler der dækker fundamentale emner, custom serverudvikling og produktionsudrulningsstrategier
    - **Lab-struktur**:
      - Lab 1: MCP Server Fundamentaler
      - Lab 2: Avanceret MCP Serverudvikling
      - Lab 3: AI Toolkit-integration
      - Lab 4: Produktionsudrulning og Skalering
    - Labbaseret læring med trin-for-trin instruktioner

12. **MCP Server Database Integrations Labs (11-MCPServerHandsOnLabs/)**
    - **Omfattende 13-labs læringssti** for opbygning af produktionsparate MCP-servere med PostgreSQL-integration
    - **Virkelighedsnær detailhandelsanalyse** baseret på Zava Retail use case
    - **Enterprise-niveau mønstre** inklusive Row Level Security (RLS), semantisk søgning og multi-tenant dataadgang
    - **Komplet labstruktur**:
      - **Labs 00-03: Fundamenter** - Introduktion, Arkitektur, Sikkerhed, Miljøopsætning
      - **Labs 04-06: Opbygning af MCP Serveren** - Database design, MCP Server-implementering, Tool-udvikling
      - **Labs 07-09: Avancerede funktioner** - Semantisk søgning, Test & debugging, VS Code-integration
      - **Labs 10-12: Produktion & Bedste praksis** - Udrulning, Overvågning, Optimering
    - **Teknologier dækket**: FastMCP framework, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Læringsmål**: Produktionsklare MCP-servere, databaseintegrationsmønstre, AI-drevet analyse, enterprise-sikkerhed

13. **Værktøjer (12-tooling/)**
    - Lær at bruge MCP i Copilot-app og andre værktøjer

## Yderligere Ressourcer

Depotet indeholder understøttende ressourcer:

- **Billedmappe**: Indeholder diagrammer og illustrationer brugt gennem hele pensum
- **Oversættelser**: Flersproget support med automatiserede oversættelser af dokumentation
- **Officielle MCP-ressourcer**:
  - [MCP Dokumentation](https://modelcontextprotocol.io/)
  - [MCP Specifikation](https://spec.modelcontextprotocol.io/)
  - [MCP GitHub Repository](https://github.com/modelcontextprotocol)

## Sådan bruger du dette depot

1. **Sekventiel læring**: Følg kapitlerne i rækkefølge (00 til 11) for en struktureret læringsoplevelse.
2. **Sprog-specifik fokus**: Hvis du er interesseret i et bestemt programmeringssprog, udforsk mappen med eksempler for implementationer i dit foretrukne sprog.
3. **Praktisk implementering**: Start med sektionen "Kom godt i gang" for at opsætte dit miljø og oprette din første MCP-server og klient.
4. **Avanceret udforskning**: Når du er fortrolig med grundlæggende, kan du dykke ned i de avancerede emner for at udvide din viden.
5. **Fællesskabsengagement**: Deltag i MCP-fællesskabet via GitHub-diskussioner og Discord-kanaler for at forbinde med eksperter og andre udviklere.

## MCP-klienter og værktøjer

Pensum dækker forskellige MCP-klienter og værktøjer:

1. **Officielle klienter**:
   - Visual Studio Code
   - MCP i Visual Studio Code
   - Claude Desktop
   - Claude i VSCode
   - Claude API

2. **Fællesskabsklienter**:
   - Cline (terminal-baseret)
   - Cursor (kodeeditor)
   - ChatMCP
   - Windsurf

3. **MCP administrationsværktøjer**:
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## Populære MCP-servere

Depotet introducerer forskellige MCP-servere, herunder:

1. **Officielle Microsoft MCP-servere**:
   - Microsoft Learn Docs MCP Server
   - Azure MCP Server (15+ specialiserede connectorer)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Microsoft Foundry MCP Server
   - Microsoft 365 Agents Toolkit MCP Server

2. **Officielle referenceservere**:
   - Filesystem
   - Fetch
   - Memory
   - Sequential Thinking

3. **Billedgenerering**:
   - Azure OpenAI DALL-E 3
   - Stable Diffusion WebUI
   - Replicate

4. **Udviklingsværktøjer**:
   - Git MCP
   - Terminal Control
   - Code Assistant

5. **Specialiserede servere**:
   - Salesforce
   - Microsoft Teams
   - Jira & Confluence

## Bidrag

Dette depot byder velkommen til bidrag fra fællesskabet. Se sektionen Fællesskabsbidrag for vejledning om, hvordan man effektivt bidrager til MCP-økosystemet.

----

*Denne studieguide blev sidst opdateret den 5. februar 2026 og afspejler den seneste MCP Specifikation 2025-11-25 og giver et overblik over depotet på denne dato. Depotindhold kan blive opdateret efter denne dato.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->