# Ändringslogg: MCP för nybörjare läroplan

Detta dokument tjänar som en förteckning över alla betydande ändringar som gjorts i Model Context Protocol (MCP) för nybörjare-läroplanen. Ändringar dokumenteras i omvänd kronologisk ordning (senaste ändringar först).

## 5 februari 2026

### Förbättringar av validering och navigation över hela repo

#### Nytt innehåll i läroplanen tillagt

**Modul 03 - Komma igång**
- **12-mcp-hosts/README.md**: Ny omfattande guide för att sätta upp MCP-hosts
  - Konfigurations-exempel för Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON-konfigurationsteman för alla stora hosts
  - Jämförelsetabell för transporttyper (stdio, SSE/HTTP, WebSocket)
  - Felsökning av vanliga anslutningsproblem
  - Säkerhetsbästa praxis för hostkonfiguration

- **13-mcp-inspector/README.md**: Ny felsökningsguide för MCP Inspector
  - Installationsmetoder (npx, npm globalt, från källkod)
  - Anslutning till servrar via stdio och HTTP/SSE
  - Testverktyg, resurser och arbetsflöden för prompts
  - VS Code-integrering med MCP Inspector
  - Vanliga felsökningsscenarier med lösningar

**Modul 04 - Praktisk implementering**
- **pagination/README.md**: Ny guide för implementation av paginering
  - Cursor-baserade pagineringsmönster i Python, TypeScript, Java
  - Hantering av paginering på klientsidan
  - Strategier för cursor-design (opak vs strukturerad)
  - Rekommendationer för prestandaoptimering

**Modul 05 - Avancerade ämnen**
- **mcp-protocol-features/README.md**: Ny djupdykning i protokollfunktioner
  - Implementation av framstegsnotifikationer
  - Mönster för avbokning av förfrågningar
  - Resursmallar med URI-mönster
  - Hantering av serverns livscykel
  - Kontroll av loggnivåer
  - Mönster för felhantering med JSON-RPC-koder

#### Navigationsfixar (mer än 24 filer uppdaterade)

**Huvudmodulers README-filer**  
 Länkar nu till både första lektionen OCH nästa modul

**02-Säkerhets underfiler**  
- Alla 5 kompletterande säkerhetsdokument har nu navigering "Vad händer härnäst":

**09-CaseStudy filer**  
- Alla case study-filer har nu sekventiell navigering:

**10-StreamliningAI Labs**  
La till avsnittet Vad händer härnäst i Modul 10-översikten och Modul 11

#### Kod- och innehållsfixar

**SDK- och beroendeuppdateringar**  
Fixade tom openai-version till `^4.95.0`  
Uppdaterade SDK från `^1.8.0` till `>=1.26.0`  
Uppdaterade MCP-versionstypningar till `>=1.26.0`

**Kodfixar**  
Rättade ogiltig modell `gpt-4o-mini` till `gpt-4.1-mini`

**Innehållsfixar**  
Fixade trasig länk `READMEmd` → `README.md`, ändrade läroplansrubrik `Module 1-3` → `Module 0-3`, rättade skiftlägeskänslig sökväg  
Removed corrupted duplicate Case Study 5 content

**Förbättringar för nybörjare**  
Lade till korrekt introduktion, lärandemål och förkunskapskrav för nybörjare

#### Uppdateringar i läroplanen

**Huvud README.md**  
- La till poster 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginering), 5.16 (Protokollfunktioner) till läroplanstabellen

**Modul READMEs**  
La till lektionerna 12 och 13 i lektionslistan  
La till avsnitt Praktiska guider med pagineringslänk  
La till lektioner 5.15 (Anpassad transport) och 5.16 (Protokollfunktioner)

**study_guide.md**  
- Uppdaterade mindmap med alla nya ämnen: MCP Hosts Setup, MCP Inspector, Pagineringstrategier, Djupdykning i protokollfunktioner

## 28 jan 2026

### Översyn av MCP-specifikation 2025-11-25 efterlevnad

#### Förbättringar av kärnbegrepp (01-CoreConcepts/)  
- **Ny klientprimitive - Roots**: Lagt till utförlig dokumentation om Roots-klientprimitive, som möjliggör för servrar att förstå filsystemsgränser och åtkomsträttigheter  
- **Verktygsanvisningar**: Lagt till dokumentation om beteendeanvisningar för verktyg (`readOnlyHint`, `destructiveHint`) för bättre beslut vid verktygskörning  
- **Verktygsanrop vid sampling**: Uppdaterad Sampling-dokumentation med `tools` och `toolChoice` parametrar för modellstyrd verktygsanropning under samplingförfrågningar  
- **URL Mode Elicitation**: Lagt till dokumentation av URL-baserad väckning för serverinitierad extern webinteraktion  
- **Uppgifter (Experimentellt)**: Nytt avsnitt om experimentella Uppgifter för beständiga körningsomslag och uppskjuten resultatåtervinning  
- **Ikonstöd**: Noterat att verktyg, resurser, resursmallar och prompts nu kan inkludera ikoner som extra metadata

#### Dokumentationsuppdateringar  
- **README.md**: La till MCP-specifikation 2025-11-25 versionsreferens och datum-baserad versionshantering  
- **study_guide.md**: Uppdaterade läroplanskarta med Uppgifter och Verktygsanvisningar i Kärnbegrepp-avsnittet; uppdaterade dokumenttidsstämpel

#### Verifiering av specifikationsöverensstämmelse  
- **Protokollversion**: Verifierade att all dokumentation refererar nuvarande MCP Specifikation 2025-11-25  
- **Arkitekturanpassning**: Bekräftade dokumentationsnoggrannhet för tvålagersarkitektur (Dataskikt + Transportskikt)  
- **Primitivers dokumentation**: Validerade serverprimitiver (Resurser, Prompts, Verktyg) och klientprimitiver (Sampling, Elicitation, Logging, Roots)  
- **Transportmekanismer**: Verifierade korrekt dokumentation av STDIO och strömningsbar HTTP-transport  
- **Säkerhetsvägledning**: Bekräftade överensstämmelse med aktuell MCP Security Best Practices-dokumentation

#### Viktiga funktioner i MCP 2025-11-25 dokumenterade  
- **OpenID Connect Discovery**: Autentiseringsservers identifiering via OIDC  
- **OAuth Client ID Metadata-dokument**: Rekommenderad klientregistreringsmekanism  
- **JSON Schema 2020-12**: Standarddialekt för MCP schemaspecifikationer  
- **SDK-Tiering**: Formaliserade krav för SDK-funktioners stöd och underhåll  
- **Styrstruktur**: Formaliserade arbetsgrupper och intressegrupper i MCP-styrning

### Större uppdatering av säkerhetsdokumentation (02-Security/)

#### Integrering av MCP Security Summit Workshop (Sherpa)  
- **Nytt praktiskt träningsmaterial**: Lagt till omfattande integration med [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) i hela säkerhetsdokumentationen  
- **Expeditionsrutt**: Dokumenterat komplett progression camp till camp från Base Camp till Summit  
- **OWASP-anpassning**: All säkerhetsvägledning kartlagd mot OWASP MCP Azure Security Guide-risker

#### OWASP MCP Top 10-integration  
- **Nytt avsnitt**: Lagt till OWASP MCP Top 10 säkerhetsrisktabell med Azure-mildrande åtgärder i huvud-README för Security  
- **Riskbaserad dokumentation**: Uppdaterat mcp-security-controls-2025.md med OWASP MCP-riskreferenser för varje säkerhetsdomän  
- **Referensarkitektur**: Länk till OWASP MCP Azure Security Guide referensarkitektur och implementationsmönster

#### Uppdaterade säkerhetsfiler  
- **README.md**: Lagt till Sherpa Workshop-översikt, expeditionsrutttabell, OWASP MCP Top 10-risköversikt och praktisk träningssektion  
- **mcp-security-controls-2025.md**: Uppdaterad rubrik till februari 2026, la till OWASP-riskreferenser (MCP01-MCP08), fixade versionsinkonsekvens  
- **mcp-security-best-practices-2025.md**: Lagt till Sherpa och OWASP resurser, uppdaterad tidsstämpel  
- **mcp-best-practices.md**: Lagt till praktisk träningssektion med Sherpa och OWASP-länkar  
- **azure-content-safety-implementation.md**: Lagt till OWASP MCP06-referens, Sherpa Camp 3-anpassning och extra resurser

#### Nya resurslänkar tillagda  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Individuella OWASP MCP-risk sidor (MCP01-MCP10)

### Läroplansomfattande anpassning till MCP-specifikation 2025-11-25

#### Modul 03 - Komma igång  
- **SDK-dokumentation**: Lagt till Go SDK till officiell SDK-lista; uppdaterade alla SDK-referenser för att följa MCP Specifikation 2025-11-25  
- **Transportförtydligande**: Uppdaterade STDIO och HTTP Streaming-beskrivningar med uttryckliga spec-referenser

#### Modul 04 - Praktisk implementering  
- **SDK-uppdateringar**: Lagt till Go SDK; uppdaterad SDK-lista med versionsreferens  
- **Autorisationsspecifikation**: Uppdaterade MCP Authorization-specifikationslänk till nuvarande 2025-11-25-version

#### Modul 05 - Avancerade ämnen  
- **Nya funktioner**: Lagt till notering om nya MCP Specification 2025-11-25-funktioner (Uppgifter, Verktygsanvisningar, URL Mode Elicitation, Roots)  
- **Säkerhetsresurser**: Lagt till OWASP MCP Top 10 och Sherpa workshop-länkar till ytterligare referenser

#### Modul 06 - Community-bidrag  
- **SDK-lista**: Lagt till Swift och Rust SDKs; uppdaterad spec-länk till 2025-11-25  
- **Spec-referens**: Uppdaterad MCP Specification-länk till direkt spec-URL

#### Modul 07 - Lärdomar från tidig adoption  
- **Resursuppdateringar**: Lagt till MCP Specification 2025-11-25-länk och OWASP MCP Top 10 till ytterligare resurser

#### Modul 08 - Bästa praxis  
- **Spec-version**: Uppdaterad MCP Specification-referens till 2025-11-25  
- **Säkerhetsresurser**: Lagt till OWASP MCP Top 10 och Sherpa workshop i ytterligare referenser

#### Modul 10 - Effektivisering av AI-arbetsflöden  
- **Badge-uppdatering**: Ändrade MCP version badge från SDK-version (1.9.3) till specifikationsversion (2025-11-25)  
- **Resurslänkar**: Uppdaterad MCP Specification-länk; lagt till OWASP MCP Top 10

#### Modul 11 - MCP Server Hands-On Labs  
- **Spec-referens**: Uppdaterad MCP Specification-länk till 2025-11-25 version  
- **Säkerhetsresurser**: Lagt till OWASP MCP Top 10 i officiella resurser

## 18 december 2025

### Uppdatering av säkerhetsdokumentation - MCP Specification 2025-11-25

#### MCP Security Best Practices (02-Security/mcp-best-practices.md) - Uppdatering av versionsreferens  
- **Protokollversionsuppdatering**: Uppdaterad för att referera senaste MCP Specifikation 2025-11-25 (släppt 25 november 2025)  
  - Uppdaterade alla versionsreferenser i specifikationen från 2025-06-18 till 2025-11-25  
  - Uppdaterade datumreferenser i dokumentet från 18 augusti 2025 till 18 december 2025  
  - Verifierade att alla specifikations-URL:er pekar på aktuell dokumentation  
- **Innehållsvalidering**: Omfattande validering av säkerhetsbästa praxis enligt senaste standarder  
  - **Microsofts säkerhetslösningar**: Verifierade aktuella termer och länkar för Prompt Shields (tidigare "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID och Azure Key Vault  
  - **OAuth 2.1 Säkerhet**: Bekräftade överensstämmelse med senaste OAuth säkerhetsbästa praxis  
  - **OWASP-standarder**: Validerade att OWASP Top 10 för LLMs-referenser är aktuella  
  - **Azure-tjänster**: Verifierade alla Microsoft Azure dokumentlänkar och bästa praxis  
- **Standardanpassning**: Alla refererade säkerhetsstandarder bekräftade aktuella  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 Säkerhetsbästa praxis  
  - Azure säkerhets- och efterlevnadsramverk  
- **Implementeringsresurser**: Validerade alla länkar till implementationsguider och resurser  
  - Azure API Management autentiseringsmönster  
  - Microsoft Entra ID integrationsguider  
  - Azure Key Vault hemlighetshantering  
  - DevSecOps pipelines och övervakningslösningar

### Kvalitetssäkring av dokumentation  
- **Specifikationsöverensstämmelse**: Säkerställde att alla obligatoriska MCP-säkerhetskrav (MUST/MUST NOT) stämmer överens med senaste specifikationen  
- **Resursaktualitet**: Verifierade att alla externa länkar till Microsoft-dokumentation, säkerhetsstandarder och implementationsguider är aktuella  
- **Omfattning av bästa praxis**: Bekräftade fullständig täckning av autentisering, auktorisation, AI-specifika hot, leveranskedjesäkerhet och företagsmönster

## 6 oktober 2025

### Utökning av Komma igång-avsnittet – Avancerad serveranvändning & Enkel autentisering

#### Avancerad serveranvändning (03-GettingStarted/10-advanced)  
- **Nytt kapitel tillagt**: Introducerade en omfattande guide till avancerad MCP-serveranvändning, som täcker både vanliga och låg nivå-serverarkitekturer.  
  - **Vanlig vs låg nivå-server**: Detaljerad jämförelse och kodexempel i Python och TypeScript för båda tillvägagångssätten.  
  - **Handler-baserad design**: Förklaring av handler-baserad hantering av verktyg/resurser/promptar för skalbara och flexibla serverimplementationer.  
  - **Praktiska mönster**: Verkliga scenarier där låg nivå-servermönster är fördelaktiga för avancerade funktioner och arkitektur.

#### Enkel autentisering (03-GettingStarted/11-simple-auth)  
- **Nytt kapitel tillagt**: Steg-för-steg-guide för att implementera enkel autentisering i MCP-servrar.  
  - **Auth-koncept**: Klar förklaring av autentisering vs auktorisation och hantering av autentiseringsuppgifter.  
  - **Grundläggande Auth-implementering**: Middlewarebaserade autentiseringsmönster i Python (Starlette) och TypeScript (Express), med kodexempel.  
  - **Utveckling mot avancerad säkerhet**: Vägledning för att börja med enkel auth och utvecklas mot OAuth 2.1 och RBAC, med hänvisningar till avancerade säkerhetsmoduler.

Dessa tillägg ger praktisk och konkret vägledning för att bygga mer robusta, säkra och flexibla MCP-serverimplementationer, och skapar bro mellan grundläggande begrepp och avancerade produktionsmönster.

## 29 september 2025

### MCP Server Databasintegrationslaborationer - Omfattande praktisk inlärningsväg

#### 11-MCPServerHandsOnLabs - Ny komplett databasintegrationsläroplan  

- **Komplett 13-Labbs Lärandeväg**: Tillagt omfattande praktiskt läroprogram för att bygga produktionsfärdiga MCP-servrar med PostgreSQL-databasintegration  
  - **Reell Implementering**: Zava Retail-analysfall som demonstrerar företagsklassade mönster  
  - **Strukturerad Lärandesteg**:  
    - **Labbar 00-03: Grunder** - Introduktion, Kärnarkitektur, Säkerhet & Multi-Tenancy, Miljöuppsättning  
    - **Labbar 04-06: Bygga MCP-servern** - Databasdesign & Scheman, MCP-serverimplementering, Verktygsutveckling  
    - **Labbar 07-09: Avancerade Funktioner** - Semantisk sökintegration, Testning & Felsökning, VS Code-integration  
    - **Labbar 10-12: Produktion & Bästa Praxis** - Distribueringsstrategier, Övervakning & Observabilitet, Bästa praxis & Optimering  
  - **Företagsteknologier**: FastMCP-ramverk, PostgreSQL med pgvector, Azure OpenAI-embeddingar, Azure Container Apps, Application Insights  
  - **Avancerade Funktioner**: Row Level Security (RLS), semantisk sökning, multi-tenant dataåtkomst, vektorembeddingar, realtidsövervakning  

#### Terminologistandardisering - Modul till Lab-omvandling  
- **Omfattande Dokumentationsuppdatering**: Systematiskt uppdaterade alla README-filer i 11-MCPServerHandsOnLabs för att använda "Lab"-terminologi istället för "Modul"  
  - **Avsnittsrubriker**: Uppdaterade "What This Module Covers" till "What This Lab Covers" i samtliga 13 labbar  
  - **Innehållsbeskrivning**: Ändrade "This module provides..." till "This lab provides..." genom all dokumentation  
  - **Lärandemål**: Uppdaterade "By the end of this module..." till "By the end of this lab..."  
  - **Navigeringslänkar**: Konverterade alla "Module XX:"-referenser till "Lab XX:" i korsreferenser och navigation  
  - **Slutförandespårning**: Uppdaterade "After completing this module..." till "After completing this lab..."  
  - **Bevarade Tekniska Referenser**: Bibehöll Python-modulreferenser i konfigurationsfiler (t.ex. `"module": "mcp_server.main"`)  

#### Studieguideförbättring (study_guide.md)  
- **Visuell Läroplansöversikt**: Tillagt nytt avsnitt "11. Database Integration Labs" med omfattande labbstrukturvisualisering  
- **Repositorie-struktur**: Uppdaterat från tio till elva huvudavsnitt med detaljerad beskrivning av 11-MCPServerHandsOnLabs  
- **Lärandevägsinstruktioner**: Förbättrad navigation för avsnitt 00-11  
- **Teknologiomnämnande**: Tillagt FastMCP, PostgreSQL, Azure-tjänsters integrationsdetaljer  
- **Läranderesultat**: Betonat utveckling av produktionsfärdiga servrar, databasintegrationsmönster och företagsklassad säkerhet  

#### Huvud-README Strukturförbättring  
- **Lab-baserad Terminologi**: Uppdaterade huvud-README.md i 11-MCPServerHandsOnLabs för konsekvent using av "Lab"-struktur  
- **Lärandevägsorganisation**: Tydlig progression från grundläggande koncept genom avancerad implementering till produktionssättning  
- **Real-World Fokus**: Betoning på praktiskt, handgripligt lärande med företagsklassade mönster och teknologier  

### Dokumentationskvalitet & Konsistensförbättringar  
- **Hands-On Lärandebetonande**: Förstärkt praktiskt, labbaserat arbetssätt i all dokumentation  
- **Företagsmönster Fokus**: Framlyft produktionsfärdiga implementationer och företagsdata säkerhetsaspekter  
- **Teknologiintegrering**: Omfattande täckning av moderna Azure-tjänster och AI-integrationsmönster  
- **Lärandesteg**: Tydlig, strukturerad väg från grundkoncept till produktionssättning  

## 26 september 2025

### Fallstudieförbättring - GitHub MCP Registry-integration

#### Fallstudier (09-CaseStudy/) - Ekosystemutvecklingsfokus  
- **README.md**: Större utökning med omfattande GitHub MCP Registry-fallstudie  
  - **GitHub MCP Registry Fallstudie**: Ny omfattande fallstudie som granskar GitHubs MCP Registry-lansering i september 2025  
    - **Problemanalys**: Detaljerad genomgång av fragmenterade MCP-serverupptäckts- och distributionsutmaningar  
    - **Lösningsarkitektur**: GitHubs centraliserade registermetod med ett-klick VS Code-installation  
    - **Affärspåverkan**: Mätbara förbättringar i utvecklarintroduktion och produktivitet  
    - **Strategiskt Värde**: Fokus på modulär agentdistribution och verktygsövergripande interoperabilitet  
    - **Ekosystemutveckling**: Positionering som grundläggande plattform för agentisk integration  
  - **Förbättrad Fallstudiestruktur**: Uppdaterade samtliga sju fallstudier med konsekvent formatering och omfattande beskrivningar  
    - Azure AI Travel Agents: Multi-agentorkestrering  
    - Azure DevOps Integration: Automatisering av arbetsflöden  
    - Realtidsdokumenthämtning: Python-konsolklient  
    - Interaktiv Studieplansgenerator: Chainlit-konversationswebbapp  
    - In-Editor Dokumentation: VS Code och GitHub Copilot-integration  
    - Azure API Management: Företags-API-integrationsmönster  
    - GitHub MCP Registry: Ekosystemutveckling och community-plattform  
  - **Omfattande Slutsats**: Omskriven slutsats som lyfter fram sju fallstudier spridda över flera MCP-implementeringsdimensioner  
    - Företagsintegration, Multi-Agent Orkestrering, Utvecklarproduktivitet  
    - Ekosystemutveckling, Utbildningsapplikationskategorisering  
    - Fördjupade insikter i arkitekturmönster, implementeringsstrategier och bästa praxis  
    - Betoning på MCP som mogen, produktionsfärdig protokoll  

#### Studieguideuppdateringar (study_guide.md)  
- **Visuell Läroplansöversikt**: Uppdaterad mindmap för att inkludera GitHub MCP Registry i Fallstudieavsnittet  
- **Fallstudiebeskrivning**: Förbättrad från generiska beskrivningar till detaljerad nedbrytning av sju omfattande fallstudier  
- **Repositoriestruktur**: Uppdaterat avsnitt 10 för att spegla omfattande fallstudietäckning med specifika implementationsdetaljer  
- **Ändringslogg Integration**: Tillagt 26 september 2025-post som dokumenterar GitHub MCP Registry-tillskott och fallstudieutökningar  
- **Datumuppdateringar**: Uppdaterat sidfotens tidsstämpel till senaste revisionsdatum (26 september 2025)  

### Dokumentationskvalitetsförbättringar  
- **Konsistensförbättring**: Standardiserad fallstudieformatering och struktur över samtliga sju exempel  
- **Omfattande TäcKning**: Fallstudier täcker nu företag, utvecklarproduktivitet och ekosystemutveckling  
- **Strategisk Positionering**: Förstärkt fokus på MCP som grundläggande plattform för agentiska systemdistributioner  
- **Resursintegration**: Uppdaterade ytterligare resurser för att inkludera länk till GitHub MCP Registry  

## 15 september 2025

### Avancerade Ämnen Expansion - Anpassade Transports & Kontextengineering

#### MCP Anpassade Transports (05-AdvancedTopics/mcp-transport/) - Ny avancerad implementationsguide  
- **README.md**: Komplett implementationsguide för anpassade MCP-transportmekanismer  
  - **Azure Event Grid Transport**: Omfattande serverlös händelsedriven transportimplementation  
    - C#, TypeScript och Python-exempel med Azure Functions-integration  
    - Händelsedrivna arkitekturmönster för skalbara MCP-lösningar  
    - Webhook-mottagare och push-baserad meddelandehantering  
  - **Azure Event Hubs Transport**: Höghastighets strömmande transportimplementation  
    - Realtidsströmningsmöjligheter för låg latenstid  
    - Partiioneringsstrategier och checkpoint-hantering  
    - Meddelandebatching och prestandaoptimering  
  - **Företagsintegrationsmönster**: Produktionsfärdiga arkitektexempel  
    - Distribuerad MCP-bearbetning över flera Azure Functions  
    - Hybridtransportarkitekturer som kombinerar flera transporttyper  
    - Meddelandetålighet, tillförlitlighet och felhanteringsstrategier  
  - **Säkerhet & Övervakning**: Azure Key Vault-integration och observabilitetsmönster  
    - Hanterad identitetsautentisering och principen om minsta privilegium  
    - Application Insights-telemetri och prestandaövervakning  
    - Kretsbrytare och feltålighetsmönster  
  - **Testningsramverk**: Omfattande strategier för testning av anpassade transports  
    - Enhetstester med testdubbler och mocking-ramverk  
    - Integrationstester med Azure Test Containers  
    - Prestanda- och belastningstestöverväganden  

#### Kontextengineering (05-AdvancedTopics/mcp-contextengineering/) - Framväxande AI-disciplin  
- **README.md**: Omfattande utforskning av kontextengineering som ett framväxande fält  
  - **Kärnprinciper**: Komplett kontextdelning, beslutstagningsmedvetenhet och hantering av kontextfönster  
  - **MCP-protokollanpassning**: Hur MCP-design hanterar kontextengineering-utmaningar  
    - Begränsningar i kontextfönster och progressiv laddningsstrategi  
    - Relevansbedömning och dynamisk kontextåterhämtning  
    - Multimodal kontexthantering och säkerhetsaspekter  
  - **Implementeringsmetoder**: Enkeltrådade kontra multi-agentarkitekturer  
    - Kontextchunking och prioriteringstekniker  
    - Progressiv kontextladdning och komprimeringsstrategier  
    - Skiktade kontextmetoder och återhämtningsoptimering  
  - **Mätningsramverk**: Framväxande metrik för kontexteffektivitet  
    - Indataintegritet, prestanda, kvalitet och användarupplevelse  
    - Experimentella metoder för kontextoptimering  
    - Felanalys och förbättringsmetodik  

#### Läroplansnavigationsuppdateringar (README.md)  
- **Förbättrad Modulstruktur**: Uppdaterat tabell för läroplan för att inkludera nya avancerade ämnen  
  - Tillagt Context Engineering (5.14) och Custom Transport (5.15) poster  
  - Konsekvent formatering och navigationslänkar i samtliga moduler  
  - Uppdaterade beskrivningar för att spegla aktuellt innehållsomfång  

### Katalogstrukturförbättringar  
- **Namnstandardisering**: Omdöpt "mcp transport" till "mcp-transport" för konsekvens med övriga avancerade ämnesmappar  
- **Innehållsorganisering**: Alla 05-AdvancedTopics-mappar följer nu gemensamt namngivningsmönster (mcp-[ämne])  

### Dokumentationskvalitetsförbättringar  
- **MCP-specifikationsanpassning**: Allt nytt innehåll refererar till nuvarande MCP Specification 2025-06-18  
- **Exempel i Flera Språk**: Omfattande kodexempel i C#, TypeScript och Python  
- **Företagsfokus**: Produktionsfärdiga mönster och Azure-molnintegration genomgående  
- **Visuell Dokumentation**: Mermaid-diagram för arkitektur och flödesvisualisering  

## 18 augusti 2025

### Omfattande Dokumentationsuppdatering - MCP 2025-06-18-standarder

#### MCP Säkerhetsbästa Praxis (02-Security/) - Fullständig Modernisering  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Fullständig omskrivning i linje med MCP Specification 2025-06-18  
  - **Obligatoriska Krav**: Tillagda uttryckliga MUST/MUST NOT-krav från officiell specifikation med tydliga visuella indikatorer  
  - **12 Kärnsäkerhetspraxis**: Omstrukturerade från 15-punkterslista till omfattande säkerhetsdomäner  
    - Tokensäkerhet & autentisering med extern identitetsleverantörsintegration  
    - Sessionshantering & transportsekretess med kryptografiska krav  
    - AI-specifik hotbekämpning med Microsoft Prompt Shields-integration  
    - Åtkomstkontroll & behörigheter med principen om minsta privilegium  
    - Innehållssäkerhet & övervakning med Azure Content Safety-integration  
    - Leverantörskedjesäkerhet med komplett komponentverifiering  
    - OAuth-säkerhet & förhindrande av confused deputy med PKCE-implementering  
    - Incidenthantering & återhämtning med automatiserade funktioner  
    - Regelefterlevnad & styrning med regulatorisk anpassning  
    - Avancerade säkerhetskontroller med zero trust-arkitektur  
    - Microsofts säkerhetsekosystemintegration med omfattande lösningar  
    - Kontinuerlig säkerhetsevolution med adaptiva metoder  
  - **Microsoft Säkerhetslösningar**: Förbättrad integrationsvägledning för Prompt Shields, Azure Content Safety, Entra ID och GitHub Advanced Security  
  - **Implementeringsresurser**: Kategoriserade omfattande resurslänkar efter Officiell MCP-dokumentation, Microsofts säkerhetslösningar, säkerhetsstandarder och implementationsguider  

#### Avancerade Säkerhetskontroller (02-Security/) - Företagsimplementering  
- **MCP-SECURITY-CONTROLS-2025.md**: Total översyn med företagsklassat säkerhetsramverk  
  - **9 Omfattande Säkerhetsdomäner**: Utökade från grundläggande kontroller till detaljerat företagsramverk  
    - Avancerad autentisering & auktorisering med Microsoft Entra ID-integration  
    - Tokensäkerhet & anti-passthrough-kontroller med nyanserad validering  
    - Sessionssäkerhetskontroller med kapningsförebyggande  
    - AI-specifika säkerhetskontroller med prompt-injektions- och verktygsförgiftning-förebyggande  
    - Förhindrande av confused deputy-attacker med OAuth-proxysäkerhet  
    - Verktygsexekveringssäkerthet med sandboxing och isolering  
    - Leverantörskedjesäkerhetskontroller med beroendeverifiering  
    - Övervaknings- & detektionskontroller med SIEM-integration  
    - Incidenthantering & återhämtning med automatiska funktioner  
  - **Implementeringsexempel**: Tillagda detaljerade YAML-konfigurationsblock och kodexempel  
  - **Microsoft-lösningsintegration**: Omfattande täckning av Azure-säkerhetstjänster, GitHub Advanced Security och företagsidentitetshantering  

#### Avancerade Ämnen Säkerhet (05-AdvancedTopics/mcp-security/) - Produktionsfärdig Implementering  
- **README.md**: Fullständig omskrivning för företags säkerhetsimplementering  
  - **Aktuell Specifikationsanpassning**: Uppdaterad till MCP Specification 2025-06-18 med obligatoriska säkerhetskrav  
  - **Förbättrad Autentisering**: Microsoft Entra ID-integration med omfattande .NET- och Java Spring Security-exempel  
  - **AI-säkerhetsintegration**: Microsoft Prompt Shields och Azure Content Safety-implementering med detaljerade Python-exempel  
  - **Avancerad Hotmotverkan**: Omfattande implementationsexempel för  
    - Förhindrande av confused deputy-attacker med PKCE och användarsamtyckesvalidering  
    - Preventiv token-passthrough med målgruppsvalidering och säker tokenhantering  
    - Sessionskapningsskydd med kryptografisk bindning och beteendeanalys  
  - **Företagssäkerhetsintegration**: Azure Application Insights-övervakning, hotdetektionspipelines och leverantörskedjesäkerhet  
  - **Implementeringschecklista**: Tydliga obligatoriska vs. rekommenderade säkerhetskontroller med Microsoft säkerhetsekosystemfördelar  

### Dokumentationskvalitet & Standardanpassning  
- **Specifikationsreferenser**: Uppdaterade alla referenser till aktuella MCP Specification 2025-06-18  
- **Microsofts Säkerhetsekosystem**: Förbättrad integreringsvägledning i hela säkerhetsdokumentationen  
- **Praktisk Implementering**: Tillagda detaljerade kodexempel i .NET, Java och Python med företagsmönster  
- **Resursorganisation**: Omfattande kategorisering av officiell dokumentation, säkerhetsstandarder och implementationsguider  
- **Visuella Indikatorer**: Tydlig markering av obligatoriska krav vs. rekommenderade praxis  

#### Kärnkoncept (01-CoreConcepts/) - Fullständig Modernisering  
- **Protokollversionsuppdatering**: Uppdaterad för att referera till nuvarande MCP Specification 2025-06-18 med datumformatering (ÅÅÅÅ-MM-DD)  
- **Arkitekturförfining**: Förbättrade beskrivningar av Hosts, Clients och Servers för att spegla aktuella MCP-arkitekturmönster
  - Hosts definierade tydligt som AI-applikationer som koordinerar flera MCP-klientanslutningar
  - Klienter beskrivna som protokollanslutningar som upprätthåller en-till-en serverrelationer
  - Servrar förbättrade med lokala vs. fjärrdrifts-scenarier
- **Primitiv omstrukturering**: Fullständig översyn av server- och klientprimitiver
  - Serverprimitiver: Resurser (datakällor), Prompter (mallar), Verktyg (exekverbara funktioner) med detaljerade förklaringar och exempel
  - Klientprimitiver: Sampling (LLM-kompletteringar), Elicitering (användarinmatning), Loggning (felsökning/övervakning)
  - Uppdaterade med nuvarande mönster för upptäckt (`*/list`), hämtning (`*/get`) och exekvering (`*/call`)
- **Protokollarkitektur**: Infört tvålagersarkitekturmodell
  - Datalager: JSON-RPC 2.0-bas med livscykelhantering och primitiv
  - Transportlager: STDIO (lokal) och Streamable HTTP med SSE (fjärroptärning) transportmekanismer
- **Säkerhetsramverk**: Omfattande säkerhetsprinciper inklusive uttryckligt användarsamtycke, dataskydd, säker verktygsexekvering och transportsäkerhet
- **Kommunikationsmönster**: Uppdaterade protokollmeddelanden för att visa initiering, upptäckt, exekvering och notifieringsflöden
- **Kodexempel**: Uppdaterade flerspråkiga exempel (.NET, Java, Python, JavaScript) för att återspegla aktuella MCP SDK-mönster

#### Säkerhet (02-Security/) - Omfattande säkerhetsöversyn  
- **Standardanpassning**: Fullständig anpassning till MCP Specification 2025-06-18 säkerhetskrav
- **Autentiseringens utveckling**: Dokumenterad utveckling från anpassade OAuth-servrar till delegation till externa identitetsleverantörer (Microsoft Entra ID)
- **AI-specifik hotanalys**: Förbättrad täckning av moderna AI-attackvektorer
  - Detaljerade scenarier för promptinjektion attacker med verkliga exempel
  - Verktygsförgiftning och "rug pull" attacker
  - Förgiftning av kontextfönster och modellförvirringsattacker
- **Microsoft AI-säkerhetslösningar**: Omfattande täckning av Microsofts säkerhetsekosystem
  - AI Prompt Shields med avancerad detektion, spotlighting och avgränsartekniker
  - Azure Content Safety integreringsmönster
  - GitHub Advanced Security för skydd av försörjningskedjan
- **Avancerad hotavvärjning**: Detaljerade säkerhetskontroller för
  - Sessionskapning med MCP-specifika attackscenarier och kryptografiska session-ID-krav
  - Confused deputy-problem i MCP-proxy-scener med explicita samtyckeskrav
  - Token passthrough-sårbarheter med obligatoriska valideringskontroller
- **Försörjningskedjesäkerhet**: Utökad AI-försörjningskedjetäckning inklusive grundmodeller, embeddings-tjänster, kontextleverantörer och tredjeparts-API:er
- **Grundsäkerhet**: Förbättrad integration med företags-säkerhetsmönster inklusive zero trust-arkitektur och Microsofts säkerhetsekosystem
- **Resursorganisation**: Kategoriserade omfattande resurslänkar efter typ (officiell dokumentation, standarder, forskning, Microsoft-lösningar, implementeringsguider)

### Dokumentationskvalitetsförbättringar
- **Strukturerade lärandemål**: Förbättrade lärandemål med specifika, handlingsbara resultat
- **Korsreferenser**: Lagt till länkar mellan relaterade säkerhets- och kärnbegreppssteman
- **Aktuell information**: Uppdaterade alla datumreferenser och specifikationslänkar till aktuella standarder
- **Implementeringsvägledning**: Lagt till specifika, handlingsbara implementeringsriktlinjer i båda sektionerna

## 16 juli 2025

### README och navigationsförbättringar
- Fullständigt omarbetad kursnavigering i README.md
- Ersatte `<details>`-taggar med mer tillgängligt tabellbaserat format
- Skapade alternativa layoutalternativ i nya mappen "alternative_layouts"
- Lagt till kortbaserade, flikbaserade och dragspelsstil-navigations-exempel
- Uppdaterade sektionen om repositorystruktur för att inkludera alla senaste filer
- Förbättrad sektionen "How to Use This Curriculum" med tydliga rekommendationer
- Uppdaterade MCP-specifikationslänkar för att peka på korrekta URL:er
- Lagt till sektionen Context Engineering (5.14) i kursstrukturen

### Studiehandledningsuppdateringar
- Fullständigt reviderad studiehandledning för att stämma överens med aktuell repositorystruktur
- Lagt till nya sektioner för MCP-klienter och verktyg samt populära MCP-servrar
- Uppdaterade Visual Curriculum Map för att noggrant spegla alla ämnen
- Förbättrade beskrivningar av avancerade ämnen för att täcka alla specialområden
- Uppdaterad Case Studies-sektion för att spegla faktiska exempel
- Lagt till denna omfattande ändringslogg

### Communitybidrag (06-CommunityContributions/)
- Lagt till detaljerad information om MCP-servrar för bildgenerering
- Lagt till omfattande sektion om att använda Claude i VSCode
- Lagt till Cline-terminalklient installation och användarinstruktioner
- Uppdaterad MCP-klientsektion för att inkludera alla populära klientalternativ
- Förbättrade bidragsexempel med mer exakta kodexempel

### Avancerade ämnen (05-AdvancedTopics/)
- Organiserade alla specialämnesmappar med konsekvent namngivning
- Lagt till material och exempel för context engineering
- Lagt till dokumentation för Foundry-agentintegration
- Förbättrad dokumentation för Entra ID säkerhetsintegration

## 11 juni 2025

### Initial skapelse
- Släppt första versionen av MCP for Beginners-kursen
- Skapade grundstruktur för alla 10 huvudsektioner
- Implementerade Visual Curriculum Map för navigering
- Lagt till initiala exempelprojekt i flera programmeringsspråk

### Komma igång (03-GettingStarted/)
- Skapade första serverimplementeringsexempel
- Lagt till vägledning för klientutveckling
- Inkluderade LLM-klientintegrationsinstruktioner
- Lagt till dokumentation för VS Code-integration
- Implementerade Server-Sent Events (SSE) serverexempel

### Kärnbegrepp (01-CoreConcepts/)
- Lagt till detaljerad förklaring av klient-server-arkitektur
- Skapade dokumentation om viktiga protokollkomponenter
- Dokumenterade meddelandemönster i MCP

## 23 maj 2025

### Repositorystruktur
- Initierade repository med grundläggande mappstruktur
- Skapade README-filer för varje huvudsektion
- Sattes upp översättningsinfrastruktur
- Lagt till bildresurser och diagram

### Dokumentation
- Skapade initial README.md med kursöversikt
- Lagt till CODE_OF_CONDUCT.md och SECURITY.md
- Sattes upp SUPPORT.md med vägledning om hur man får hjälp
- Skapade preliminär struktur för studiehandledning

## 15 april 2025

### Planering och ramverk
- Initial planering för MCP for Beginners-kursen
- Definierade lärandemål och målgrupp
- Skissade 10-sektionsstruktur för kursen
- Utvecklade konceptuellt ramverk för exempel och fallstudier
- Skapade initiala prototypexempel för nyckelbegrepp

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig observera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår från användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->