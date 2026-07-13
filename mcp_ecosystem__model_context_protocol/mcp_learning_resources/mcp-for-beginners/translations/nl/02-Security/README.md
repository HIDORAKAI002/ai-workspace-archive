# MCP Security: Uitgebreide Bescherming voor AI-systemen

[![MCP Security Best Practices](../../../translated_images/nl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Beveiliging is fundamenteel voor het ontwerp van AI-systemen, daarom geven we er prioriteit aan als onze tweede sectie. Dit sluit aan bij Microsoft's **Secure by Design** principe van de [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Het Model Context Protocol (MCP) brengt krachtige nieuwe mogelijkheden naar AI-gestuurde toepassingen, terwijl het unieke beveiligingsuitdagingen introduceert die verder gaan dan traditionele softwarerisico's. MCP-systemen worden geconfronteerd met zowel gevestigde beveiligingskwesties (secure coding, least privilege, supply chain security) als nieuwe AI-specifieke bedreigingen zoals prompt injection, tool poisoning, session hijacking, confused deputy attacks, token passthrough kwetsbaarheden en dynamische aanpassing van mogelijkheden.

Deze les onderzoekt de meest cruciale beveiligingsrisico's in MCP-implementaties—met onderwerpen zoals authenticatie, autorisatie, excessieve permissies, indirecte prompt injection, sessiebeveiliging, confused deputy-problemen, tokenbeheer en kwetsbaarheden in de supply chain. Je leert concrete controles en best practices om deze risico's te beperken, terwijl je gebruikmaakt van Microsoft-oplossingen zoals Prompt Shields, Azure Content Safety en GitHub Advanced Security om je MCP-implementatie te versterken.

## Leerdoelen

Aan het einde van deze les kun je:

- **MCP-specifieke bedreigingen identificeren**: Unieke beveiligingsrisico's in MCP-systemen herkennen, inclusief prompt injection, tool poisoning, excessieve permissies, session hijacking, confused deputy-problemen, token passthrough kwetsbaarheden en supply chain risico's
- **Beveiligingscontroles toepassen**: Effectieve mitigaties implementeren zoals robuuste authenticatie, least privilege toegang, veilig tokenbeheer, sessiebeveiligingscontroles en verificatie van de supply chain
- **Microsoft-beveiligingsoplossingen inzetten**: Microsoft Prompt Shields, Azure Content Safety en GitHub Advanced Security begrijpen en inzetten voor bescherming van MCP workloads
- **Beveiliging van tools valideren**: Het belang van validatie van tool metadata, monitoring voor dynamische wijzigingen en verdediging tegen indirecte prompt injection aanvallen herkennen
- **Best practices integreren**: Gevestigde beveiligingsfundamenten (secure coding, server hardening, zero trust) combineren met MCP-specifieke controles voor uitgebreide bescherming

# MCP Security Architectuur & Controles

Moderne MCP-implementaties vereisen gelaagde beveiligingsbenaderingen die zowel traditionele softwarebeveiliging als AI-specifieke bedreigingen aanpakken. De snel evoluerende MCP-specificatie ontwikkelt haar beveiligingscontroles verder, waardoor betere integratie met enterprise beveiligingsarchitecturen en gevestigde best practices mogelijk wordt.

Onderzoek uit het [Microsoft Digital Defense Report](https://aka.ms/mddr) toont aan dat **98% van de gemelde inbraken voorkomen zou kunnen worden door robuuste beveiligingshygiëne**. De meest effectieve beschermingsstrategie combineert fundamentele beveiligingspraktijken met MCP-specifieke controles—bewezen basisbeveiligingsmaatregelen blijven het meest impactvol in het verminderen van het algehele beveiligingsrisico.

## Huidig Beveiligingslandschap

> **Opmerking:** Deze informatie weerspiegelt MCP-beveiligingsnormen per **5 februari 2026**, afgestemd op **MCP Specification 2025-11-25**. Het MCP-protocol blijft zich snel ontwikkelen, en toekomstige implementaties kunnen nieuwe authenticatiepatronen en verbeterde controles introduceren. Raadpleeg altijd de actuele [MCP Specification](https://spec.modelcontextprotocol.io/), de [MCP GitHub repository](https://github.com/modelcontextprotocol), en de [documentatie voor beveiligingsbest practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) voor de laatste richtlijnen.

> **Vooruitblik:** De `2026-07-28` release candidate verstevigt de autorisatie verder — clients moeten de `iss` parameter op autorisatieresponsen valideren (RFC 9207), een OpenID Connect `application_type` declareren tijdens Dynamic Client Registration en geregistreerde credentials binden aan de uitgevende autorisatieserver. Zie [Wat verandert er in MCP: De 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) voor de volledige lijst van autorisatie SEPs.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Voor **praktijkgerichte beveiligingstraining** bevelen we de **MCP Security Summit Workshop** (Sherpa) sterk aan—a comprehensive guided expedition to securing MCP servers in Microsoft Azure.

### Workshop Overzicht

De [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) biedt praktische, direct toepasbare beveiligingstraining via een bewezen “vulnerable → exploit → fix → validate” methodologie. Je zult:

- **Leren door dingen te breken**: Kwetsbaarheden uit eerste hand ervaren door het exploiteren van opzettelijk onveilige servers
- **Gebruik maken van Azure-native beveiliging**: Azure Entra ID, Key Vault, API Management en AI Content Safety benutten
- **Volgen van Defense-in-Depth**: Vooruitgang boeken door kampen die uitgebreide beveiligingslagen opbouwen
- **OWASP-standaarden toepassen**: Elke techniek gekoppeld aan de [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Productiecode ontvangen**: Vertrekken met werkende, geteste implementaties

### De Expeditieroute

| Kamp          | Focus                                    | OWASP-risico's gedekt                    |
|---------------|------------------------------------------|-----------------------------------------|
| **Base Camp** | MCP-grondbeginselen & authenticatiekwetsbaarheden | MCP01, MCP07                            |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07                    |
| **Camp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09             |
| **Camp 3: I/O Security** | Prompt injection, PII-bescherming, content safety | MCP03, MCP05, MCP06, MCP10           |
| **Camp 4: Monitoring** | Log Analytics, dashboards, dreigingsdetectie | MCP04, MCP08                         |
| **The Summit** | Red Team / Blue Team integratietest      | Alle                                    |

**Begin hier**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Beveiligingsrisico’s

De [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beschrijft de tien meest kritieke beveiligingsrisico’s voor MCP-implementaties:

| Risico     | Beschrijving                              | Azure Mitigatie                         |
|------------|------------------------------------------|----------------------------------------|
| **MCP01** | Token Mismanagement & Geheimenblootstelling | Azure Key Vault, Managed Identity     |
| **MCP02** | Privilege Escalation via Scope Creep     | RBAC, Conditional Access               |
| **MCP03** | Tool Poisoning                           | Toolvalidatie, integriteitsverificatie |
| **MCP04** | Software Supply Chain Aanvallen & Dependency Manipulatie | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection & Uitvoering           | Inputvalidatie, sandboxing             |
| **MCP06** | Intent Flow Subversion                   | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Onvoldoende Authenticatie & Autorisatie  | Azure Entra ID, OAuth 2.1 met PKCE    |
| **MCP08** | Gebrek aan Audit en Telemetrie           | Azure Monitor, Application Insights   |
| **MCP09** | Shadow MCP Servers                       | API Center governance, netwerkisolatie |
| **MCP10** | Context Injection & Over-Sharing         | Dataclassificatie, minimale blootstelling |

### Evolutie van MCP Authenticatie

De MCP-specificatie is aanzienlijk geëvolueerd in de aanpak van authenticatie en autorisatie:

- **Oorspronkelijke aanpak**: Vroege specificaties vereisten dat ontwikkelaars aangepaste authenticatieservers implementeerden, waarbij MCP-servers fungeerden als OAuth 2.0 Authorization Servers die gebruikersauthenticatie rechtstreeks beheerden
- **Huidige standaard (2025-11-25)**: De bijgewerkte specificatie maakt het mogelijk dat MCP-servers authenticatie delegeren aan externe identiteitsproviders (zoals Microsoft Entra ID), wat de beveiligingshouding verbetert en de implementatiecomplexiteit vermindert
- **Transportlaagbeveiliging**: Versterkte ondersteuning voor veilige transportmechanismen met juiste authenticatiepatronen voor zowel lokale (STDIO) als externe (Streamable HTTP) verbindingen

## Authenticatie & Autorisatie Beveiliging

### Huidige Beveiligingsuitdagingen

Moderne MCP-implementaties worden geconfronteerd met diverse authenticatie- en autorisatieproblemen:

### Risico's & Bedreigingsvectoren

- **Onjuist geconfigureerde autorisatielogica**: Foutieve autorisatie-implementatie in MCP-servers kan gevoelige data blootstellen en toegang verkeerd beheren
- **OAuth Token Compromittering**: Lokale MCP-servertokens die worden gestolen maken het mogelijk dat aanvallers servers imiteren en toegang krijgen tot downstream diensten
- **Token Passthrough Kwetsbaarheden**: Onjuist tokenbeheer creëert beveiligingscontrole-bypasses en verantwoordelijkheidslacunes
- **Excessieve Permissies**: Overbevoorrechte MCP-servers schenden het least privilege principe en vergroten het aanvalsoppervlak

#### Token Passthrough: Een Kritisch Anti-Patroon

**Token passthrough is expliciet verboden** in de huidige MCP-autorisatiespecificatie vanwege ernstige beveiligingsimplicaties:

##### Omzeiling van Beveiligingscontroles
- MCP-servers en downstream API’s implementeren kritieke beveiligingscontroles (rate limiting, request validatie, verkeersmonitoring) die afhankelijk zijn van juiste tokenvalidatie
- Direct gebruik van client-naar-API tokens omzeilt deze essentiële bescherming en ondermijnt de beveiligingsarchitectuur

##### Verantwoordings- & Auditproblemen  
- MCP-servers kunnen niet onderscheiden welke clients tokens gebruiken die upstream zijn uitgegeven, waardoor audit trails breken
- Logs van downstream resource servers tonen misleidende verzoekherkomsten in plaats van de werkelijke MCP-server tussenpersonen
- Onderzoek naar incidenten en compliance-audits worden aanzienlijk moeilijker

##### Risico's voor Data-exfiltratie
- Ongevalideerde tokenclaims stellen kwaadwillenden met gestolen tokens in staat MCP-servers als proxy’s te gebruiken voor data-exfiltratie
- Overtredingen van trust boundaries maken ongeautoriseerde toegangspatronen mogelijk die bedoelde beveiligingscontroles omzeilen

##### Multi-Service Aanvalsvectoren
- Gecompromitteerde tokens, geaccepteerd door meerdere services, faciliteren laterale beweging binnen verbonden systemen
- Vertrouwensaanames tussen services kunnen worden geschonden wanneer tokenherkomst niet verifieerbaar is

### Beveiligingscontroles & Mitigaties

**Kritieke Beveiligingseisen:**

> **VERPLICHT**: MCP-servers **MOGEN NIET** tokens accepteren die niet expliciet voor de MCP-server zijn uitgegeven

#### Authenticatie- & Autorisatiecontroles

- **Strenge Autorisatiebeoordeling**: Voer uitgebreide audits uit van de autorisatielogica van MCP-servers om ervoor te zorgen dat alleen beoogde gebruikers en clients toegang hebben tot gevoelige bronnen
  - **Implementatiehandleiding**: [Azure API Management als Authenticatiegateway voor MCP-servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteitsintegratie**: [Microsoft Entra ID gebruiken voor MCP Server Authenticatie](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Veilig Tokenbeheer**: Implementeer [Microsofts beste praktijken voor tokenvalidatie en levenscyclusbeheer](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valideer dat token audience claims overeenkomen met MCP-serveridentiteit
  - Implementeer correcte tokenrotatie en vervalbeleid
  - Voorkom afspelen van tokens en ongeautoriseerd gebruik

- **Beschermde Tokenopslag**: Beveilig tokenopslag met encryptie zowel in rust als tijdens transport
  - **Best Practices**: [Beveiligde Tokenopslag en Encryptierichtlijnen](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementatie van Toegangscontrole

- **Principe van Minst Mogelijke Machtiging**: Verleen MCP-servers alleen de minimale permissies die nodig zijn voor de beoogde functionaliteit
  - Regelmatige beoordeling en bijwerking van permissies om privilege creep te voorkomen
  - **Microsoft Documentatie**: [Beveilig veilig met minst mogelijke machtigingen](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Implementeer fijnmazige roltoewijzingen
  - Scope rollen nauwkeurig af op specifieke resources en acties
  - Vermijd brede of onnodige permissies die het aanvalsoppervlak vergroten

- **Continue Permissiemonitoring**: Voer doorlopende toegangsaudits en monitoring uit
  - Houd gebruikspatronen van permissies in de gaten voor afwijkingen
  - Dring excessieve of ongebruikte rechten onmiddellijk terug

## AI-Specifieke Beveiligingsbedreigingen

### Prompt Injection & Toolmanipulatie-aanvallen

Moderne MCP-implementaties worden geconfronteerd met geavanceerde AI-specifieke aanvalsvectoren die met traditionele beveiligingsmaatregelen niet volledig kunnen worden afgedekt:

#### **Indirecte Prompt Injection (Cross-Domain Prompt Injection)**

**Indirecte Prompt Injection** is een van de meest kritieke kwetsbaarheden in MCP-compatibele AI-systemen. Aanvallers verbergen kwaadaardige instructies in externe content—documenten, webpagina’s, e-mails of databronnen—die AI-systemen vervolgens verwerken als legitieme opdrachten.

**Aanvalsscenario’s:**
- **Documentgebaseerde Injectie**: Kwaadaardige instructies verborgen in verwerkte documenten die onbedoelde AI-acties veroorzaken
- **Uitbuiting van Webcontent**: Gecompromitteerde webpagina’s met ingesloten prompts die het AI-gedrag manipuleren bij het scrapen
- **E-mailgebaseerde Aanvallen**: Kwaadaardige prompts in e-mails die AI-assistenten informatie laten lekken of ongeautoriseerde acties laten uitvoeren
- **Contaminatie van Databronnen**: Gecompromitteerde databases of API’s die besmette inhoud serveren aan AI-systemen

**Impact in de praktijk**: Deze aanvallen kunnen leiden tot data-exfiltratie, privacyschendingen, het genereren van schadelijke inhoud en manipulatie van gebruikersinteracties. Voor een gedetailleerde analyse, zie [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/nl/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning-aanvallen**

**Tool Poisoning** richt zich op de metadata die MCP-tools definieert, door te misbruiken hoe LLM’s toolbeschrijvingen en parameters interpreteren om uitvoeringsbeslissingen te nemen.

**Aanvalsmechanismen:**
- **Manipulatie van Metadata**: Aanvallers injecteren kwaadaardige instructies in toolbeschrijvingen, parameterdefinities of gebruiksvoorbeelden
- **Onzichtbare Instructies**: Verborgen prompts in toolmetadata die door AI-modellen worden verwerkt maar onzichtbaar zijn voor menselijke gebruikers
- **Dynamische Toolwijziging ("Rug Pulls")**: Tools die door gebruikers zijn goedgekeurd worden later aangepast om kwaadaardige acties uit te voeren zonder dat gebruikers dit merken
- **Parameter Injectie**: Kwaadaardige inhoud ingebed in toolparameterschema’s die het modellengedrag beïnvloeden
**Gehoste Serverrisico's**: Externe MCP-servers brengen verhoogde risico’s met zich mee doordat tooldefinities kunnen worden bijgewerkt na de initiële goedkeuring door de gebruiker, wat scenario’s creëert waarin eerder veilige tools kwaadaardig worden. Voor een uitgebreide analyse, zie [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/nl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Aanvullende AI-aanvalsvectoren**

- **Cross-Domain Prompt Injection (XPIA)**: Geavanceerde aanvallen die inhoud van meerdere domeinen gebruiken om beveiligingsmaatregelen te omzeilen
- **Dynamische Aanpassing van Functionaliteit**: Wijzigingen in realtime aan de mogelijkheden van tools die de initiële beveiligingsbeoordelingen ontlopen
- **Context Window Vergiftiging**: Aanvallen die grote contextvensters manipuleren om kwaadaardige instructies te verbergen
- **Modelverwarringsaanvallen**: Exploitatie van modelbeperkingen om onvoorspelbaar of onveilig gedrag te creëren


### Impact van AI-Beveiligingsrisico's

**Gevolgen met Hoge Impact:**
- **Data-exfiltratie**: Ongeoorloofde toegang tot en diefstal van gevoelige bedrijfs- of persoonlijke gegevens
- **Privacyinbreuken**: Blootstelling van persoonlijk identificeerbare informatie (PII) en vertrouwelijke bedrijfsdata  
- **Systeemmanipulatie**: Onbedoelde wijzigingen aan kritieke systemen en workflows
- **Diefstal van Referenties**: Compromittering van authenticatietokens en service-referenties
- **Laterale Beweging**: Gebruik van gecompromitteerde AI-systemen als toegangspunten voor bredere netwerkaanvallen

### Microsoft AI Beveiligingsoplossingen

#### **AI Prompt Shields: Geavanceerde Bescherming tegen Injectie-aanvallen**

Microsoft **AI Prompt Shields** bieden een uitgebreide verdediging tegen zowel directe als indirecte prompt injectie-aanvallen via meerdere beveiligingslagen:

##### **Kernbeschermingsmechanismen:**

1. **Geavanceerde Detectie & Filtering**
   - Machine learning-algoritmen en NLP-technieken detecteren kwaadaardige instructies in externe inhoud
   - Real-time analyse van documenten, webpagina’s, e-mails en databronnen op ingesloten bedreigingen
   - Contextueel begrip van legitieme versus kwaadaardige promptpatronen

2. **Spotlighting-technieken**  
   - Onderscheidt tussen vertrouwde systeeminstructies en mogelijk gecompromitteerde externe input
   - Teksttransformatietechnieken die modelrelevantie verbeteren terwijl kwaadaardige inhoud wordt geïsoleerd
   - Helpt AI-systemen de juiste instructiehiërarchie te handhaven en geïnjecteerde opdrachten te negeren

3. **Scheidingstekens & Datamarkering**
   - Expliciete begrenzing tussen vertrouwde systeemberichten en externe invoertekst
   - Speciale markeringen die grenzen tussen vertrouwde en onbetrouwbare databronnen benadrukken
   - Duidelijke scheiding voorkomt verwarring van instructies en ongeautoriseerde uitvoering van commando’s

4. **Continue Dreigingsinformatie**
   - Microsoft monitort continu nieuwe aanvalspatronen en werkt verdedigingen bij
   - Proactief dreigingsonderzoek naar nieuwe injectietechnieken en aanvalsvectoren
   - Regelmatige updates van beveiligingsmodellen om effectiviteit tegen veranderende dreigingen te waarborgen

5. **Integratie van Azure Content Safety**
   - Deel van de uitgebreide Azure AI Content Safety suite
   - Extra detectie voor jailbreakpogingen, schadelijke content en schendingen van beveiligingsbeleid
   - Geünificeerde beveiligingscontroles over AI-toepassingscomponenten heen

**Implementatiemiddelen**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/nl/prompt-shield.ff5b95be76e9c78c.webp)


## Geavanceerde MCP Beveiligingsbedreigingen

### Sessiekaping Kwetsbaarheden

**Sessiekaping** vormt een kritieke aanvalsvector in stateful MCP-implementaties waarbij onbevoegden legitieme sessie-identificaties verkrijgen en misbruiken om zich voor te doen als cliënten en ongeautoriseerde acties uit te voeren.

#### **Aanvalsscenario’s & Risico’s**

- **Sessiekaping Prompt Injectie**: Aanvallers met gestolen sessie-IDs injecteren kwaadaardige gebeurtenissen in servers die sessiestatus delen, waardoor schadelijke acties kunnen worden geactiveerd of gevoelige data wordt geopend
- **Directe Identiteitsfraude**: Gestolen sessie-IDs maken directe MCP-serveraanroepen mogelijk zonder authenticatie, waarbij aanvallers worden behandeld als legitieme gebruikers
- **Gecompromitteerde Hervatbare Streams**: Aanvallers kunnen verzoeken voortijdig beëindigen, waardoor legitieme cliënten hervatten met mogelijk kwaadaardige inhoud

#### **Beveiligingsmaatregelen voor Sessiebeheer**

**Kritieke Vereisten:**
- **Autorisatieverificatie**: MCP-servers die autorisatie implementeren **MOETEN** ALLE binnenkomende verzoeken verifiëren en **MOGEN NIET** vertrouwen op sessies voor authenticatie
- **Veilige Sessiecreatie**: Gebruik cryptografisch veilige, niet-deterministische sessie-IDs die zijn gegenereerd met veilige willekeurige getalgeneratoren
- **Gebruikersgebonden Binding**: Bind sessie-IDs aan gebruikersspecifieke gegevens met formaten zoals `<user_id>:<session_id>` om misbruik door andere gebruikers te voorkomen
- **Levenscyclusbeheer van Sessies**: Implementeer correcte vervaldata, rotatie en invalidatie voor het beperken van kwetsbaarheden
- **Transportbeveiliging**: Verplichte HTTPS voor alle communicatie ter voorkoming van onderschepping van sessie-IDs

### Confused Deputy-probleem

Het **confused deputy probleem** doet zich voor wanneer MCP-servers als authenticatie-proxy’s fungeren tussen cliënten en derden, wat mogelijkheden schept voor het omzeilen van autorisatie via exploitatie van statische client-ID’s.

#### **Aanvalsmechanismen & Risico’s**

- **Omzeiling op basis van cookie-toestemming**: Eerdere gebruikersauthenticatie creëert toestemmingscookies die aanvallers misbruiken via kwaadaardige autorisatieverzoeken met geconstrueerde redirect-URI’s
- **Diefstal van Autorisatiecodes**: Bestaande toestemmingscookies kunnen autorisatieservers ertoe brengen toestemmingsschermen over te slaan en codes naar door aanvallers beheerde eindpunten te sturen  
- **Ongeautoriseerde API-toegang**: Gestolen autorisatiecodes maken tokenuitwisseling en gebruikersimpersonatie mogelijk zonder expliciete toestemming

#### **Mitigatiestrategieën**

**Verplichte Maatregelen:**
- **Expliciete Toestemmingsvereisten**: MCP-proxyservers die statische client-ID’s gebruiken **MOETEN** voor elke dynamisch geregistreerde cliënt gebruikersconsent verkrijgen
- **OAuth 2.1 Beveiligingsimplementatie**: Volg actuele OAuth-beveiligingsbest practices inclusief PKCE (Proof Key for Code Exchange) voor alle autorisatieverzoeken
- **Strikte Clientvalidatie**: Implementeer rigoureuze validatie van redirect-URI’s en clientidentificatoren om exploitatie te voorkomen

### Token Passthrough Kwetsbaarheden  

**Token passthrough** is een expliciete anti-patroon waarbij MCP-servers clienttokens accepteren zonder juiste validatie en deze doorsturen naar downstream-API’s, hetgeen de MCP-autorisatiespecificaties schendt.

#### **Beveiligingsimplicaties**

- **Omzeiling van controlemechanismen**: Direct client-naar-API tokengebruik ondermijnt essentiële limieten, validaties en monitoring
- **Verstoring van Audit Sporen**: Tokens uitgegeven door upstream maken clientidentificatie onmogelijk en verhinderen onderzoek van incidenten
- **Proxy-gebaseerde Data-exfiltratie**: Ongevalideerde tokens stellen kwaadwillenden in staat servers als proxy te gebruiken voor ongeautoriseerde data-acces
- **Vertrouwensgrenschendingen**: Vertrouwensstellingen van downstream-services kunnen worden geschonden als tokenherkomst niet geverifieerd kan worden
- **Uitbreiding van Multi-service-aanvallen**: Gecompromitteerde tokens die door meerdere services worden geaccepteerd, vergemakkelijken laterale beweging

#### **Vereiste Beveiligingsmaatregelen**

**Ononderhandelbare Eisen:**
- **Tokenvalidatie**: MCP-servers **MOGEN GEEN** tokens accepteren die niet expliciet voor de MCP-server zijn uitgegeven
- **Audientieverificatie**: Valideer altijd dat tokenaudience overeenkomt met de identiteit van de MCP-server
- **Correct Token Levenscyclusbeheer**: Implementeer kortdurende toegangstokens met veilige rotatiepraktijken


## Supply Chain Security voor AI-systemen

Supply chain security is verder geëvolueerd dan traditionele software-afhankelijkheden en omvat het gehele AI-ecosysteem. Moderne MCP-implementaties moeten alle AI-gerelateerde componenten rigoureus verifiëren en monitoren, aangezien elk potentiële kwetsbaarheden introduceert die de systeemintegriteit kunnen compromitteren.

### Uitgebreide AI Supply Chain-componenten

**Traditionele software-afhankelijkheden:**
- Open-source bibliotheken en frameworks
- Containerimages en basissystemen  
- Ontwikkeltools en build pipelines
- Infrastructuurcomponenten en diensten

**Specifieke AI Supply Chain-elementen:**
- **Foundation Models**: Voorgetrainde modellen van diverse aanbieders waarvoor herkomstverificatie nodig is
- **Embedding Services**: Externe vectorisatieservices en semantische zoekdiensten
- **Context Providers**: Databronnen, kennisbanken en documentrepositories  
- **Derden-API’s**: Externe AI-services, ML-pijplijnen en dataprijsverwerkingsendpoints
- **Modelartefacten**: Gewichten, configuraties en fijn-afgestelde modelvarianten
- **Trainingsgegevensbronnen**: Datasetten gebruikt voor modeltraining en fine-tuning

### Omvattende Supply Chain Beveiligingsstrategie

#### **Componentverificatie & Vertrouwen**
- **Herkomstvalidatie**: Verifieer oorsprong, licenties en integriteit van alle AI-componenten voor integratie
- **Beveiligingsbeoordeling**: Voer kwetsbaarheidsscans en beveiligingsreviews uit voor modellen, databronnen en AI-services
- **Reputatieanalyse**: Evalueer het beveiligingsverleden en praktijken van AI-dienstverleners
- **Compliance-verificatie**: Zorg dat alle componenten voldoen aan organisatorische beveiligings- en regelgevingsvereisten

#### **Veilige Deployment Pipelines**  
- **Geautomatiseerde CI/CD Beveiliging**: Integreer beveiligingsscans in geautomatiseerde deployment pipelines
- **Integriteitsverificatie van Artefacten**: Implementeer cryptografische verificatie voor alle uitgerolde artefacten (code, modellen, configuraties)
- **Fasering van Deployment**: Gebruik progressieve deploymentstrategieën met beveiligingsvalidatie in elke fase
- **Vertrouwde Artefact Repositories**: Roll alleen uit vanaf geverifieerde, veilige artefactregistries en repositories

#### **Continue Monitoring & Respons**
- **Afhankelijkheidsscans**: Voortdurende kwetsbaarheidsmonitoring voor alle software- en AI-componentafhankelijkheden
- **Modelmonitoring**: Doorlopende beoordeling van modelgedrag, prestatieverschuivingen en beveiligingsanomaliën
- **Servicegezondheidstracking**: Bewaking van externe AI-diensten op beschikbaarheid, beveiligingsincidenten en beleidswijzigingen
- **Integratie van Dreigingsinformatie**: Invoer van speciaal op AI en ML beveiligingsrisico’s gerichte dreigingsfeeds

#### **Toegangscontrole & Least Privilege**
- **Componentniveau-machtigingen**: Beperk toegang tot modellen, data en diensten op basis van zakelijke noodzaak
- **Beheer van Serviceaccounts**: Implementeer toegewijde serviceaccounts met minimale vereiste rechten
- **Netwerksegmentatie**: Isoleer AI-componenten en beperk netwerktoegang tussen diensten
- **API Gateway Controles**: Gebruik gecentraliseerde API-gateways om toegang tot externe AI-diensten te reguleren en monitoren

#### **Incidentrespons & Herstel**
- **Snelle Responsprocedures**: Vastgestelde processen voor patching of vervanging van gecompromitteerde AI-componenten
- **Rotatie van Referenties**: Geautomatiseerde systemen voor het roteren van geheimen, API-sleutels en servicetokens
- **Rollback-mogelijkheden**: Mogelijkheid om snel terug te keren naar eerder bekende goede versies van AI-componenten
- **Herstel van Supply Chain Breuken**: Specifieke procedures voor het reageren op upstream AI-servicecompromissen

### Microsoft Beveiligingstools & Integratie

**GitHub Advanced Security** biedt uitgebreide bescherming van de supply chain inclusief:
- **Secret Scanning**: Geautomatiseerde detectie van referenties, API-sleutels en tokens in repositories
- **Dependency Scanning**: Kwetsbaarheidsbeoordeling voor open-source afhankelijkheden en bibliotheken
- **CodeQL Analyse**: Statische codeanalyse op beveiligingsproblemen en programmeerfouten
- **Supply Chain Insights**: Inzicht in de gezondheid en beveiligingsstatus van afhankelijkheden

**Integratie met Azure DevOps & Azure Repos:**
- Naadloze beveiligingsscans over Microsoft-ontwikkelplatforms
- Geautomatiseerde beveiligingscontroles in Azure Pipelines voor AI-workloads
- Beleidsafdwinging voor veilige AI-componentdeployments

**Interne Microsoft-praktijken:**
Microsoft voert uitgebreide supply chain beveiligingspraktijken door in alle producten. Lees over bewezen methodes in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

MCP-implementaties erven en bouwen voort op de bestaande beveiligingspositie van uw organisatie. Het versterken van fundamentele beveiligingspraktijken verbetert significant de totale beveiliging van AI-systemen en MCP-uitrol.

### Kernprincipes van Beveiliging

#### **Veilige Ontwikkelpraktijken**
- **OWASP-naleving**: Bescherming tegen [OWASP Top 10](https://owasp.org/www-project-top-ten/) kwetsbaarheden in webapplicaties
- **AI-specifieke Beschermingen**: Implementeer controles voor de [OWASP Top 10 voor LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Veilig Geheimbeheer**: Gebruik toegewijde kluizen voor tokens, API-sleutels en gevoelige configuratiegegevens
- **End-to-End Encryptie**: Implementeer veilige communicatie over alle applicatiecomponenten en datastromen
- **Inputvalidatie**: Rigoureuze validatie van alle gebruikersinvoer, API-parameters en databronnen

#### **Infrastructure Hardening**
- **Multi-factor Authenticatie**: Verplichte MFA voor alle beheer- en serviceaccounts
- **Patchbeheer**: Geautomatiseerde, tijdige patching van besturingssystemen, frameworks en afhankelijkheden  
- **Integratie van Identiteitsproviders**: Gecentraliseerd identiteitsbeheer via bedrijfsidentiteitsproviders (Microsoft Entra ID, Active Directory)
- **Netwerksegmentatie**: Logische isolatie van MCP-componenten om laterale beweging te beperken
- **Principe van Minimaal Rechten**: Minimale vereiste machtigingen voor alle systeemcomponenten en accounts

#### **Beveiligingsmonitoring & Detectie**
- **Omvattende Logging**: Gedetailleerde logging van AI-applicatieactiviteiten inclusief MCP cliënt-server interacties
- **SIEM-integratie**: Gecentraliseerd security information and event management voor anomaliedetectie
- **Gedragsanalyse**: AI-gestuurde monitoring om afwijkende patronen in systeem- en gebruikersgedrag te detecteren
- **Dreigingsinformatie**: Integratie van externe bedreigingsfeeds en indicators of compromise (IOCs)
- **Incidentrespons**: Goed gedefinieerde procedures voor detectie, respons en herstel van beveiligingsincidenten

#### **Zero Trust Architectuur**
- **Nooit Vertrouwen, Altijd Verifiëren**: Continue verificatie van gebruikers, apparaten en netwerkverbindingen
- **Micro-segmentatie**: Gedetailleerde netwerkcontroles die individuele workloads en diensten isoleren
- **Identiteitsgerichte Beveiliging**: Beveiligingsbeleid gebaseerd op geverifieerde identiteiten in plaats van netwerklocatie
- **Continue Risicobeoordeling**: Dynamische evaluatie van beveiligingshouding gebaseerd op actuele context en gedrag
- **Conditionele Toegang**: Toegangscontroles die zich aanpassen aan risicofactoren, locatie en apparatuursvertrouwen

### Enterprise Integratiepatronen

#### **Microsoft Security Ecosystem Integratie**
- **Microsoft Defender for Cloud**: Omvattend beheer van cloudbeveiligingspositie
- **Azure Sentinel**: Cloud-native SIEM en SOAR mogelijkheden ter bescherming van AI-workloads
- **Microsoft Entra ID**: Bedrijfsidentiteits- en toegangsbeheer met conditionele toegangsbeleidsregels
- **Azure Key Vault**: Gecentraliseerd geheimbeheer met hardwarebeveiligingsmodule (HSM) ondersteuning
- **Microsoft Purview**: Gegevensbeheer en naleving voor AI-databronnen en workflows

#### **Compliance & Governance**
- **Regelgevingsafstemming**: Zorg dat MCP-implementaties voldoen aan branchespecifieke compliancevereisten (GDPR, HIPAA, SOC 2)
- **Gegevensclassificatie**: Juiste categorisatie en behandeling van gevoelige gegevens die door AI-systemen worden verwerkt  
- **Audit Trails**: Uitgebreide logging voor naleving van regelgeving en forensisch onderzoek  
- **Privacycontroles**: Implementatie van privacy-by-design principes in de architectuur van AI-systemen  
- **Wijzigingsbeheer**: Formele processen voor beveiligingsbeoordelingen van wijzigingen aan AI-systemen  

Deze fundamentele praktijken creëren een robuuste beveiligingsbasis die de effectiviteit van MCP-specifieke beveiligingscontroles versterkt en uitgebreide bescherming biedt voor AI-gedreven toepassingen.

## Belangrijkste Beveiligingspunten

- **Gelaagde Beveiligingsaanpak**: Combineer fundamentele beveiligingspraktijken (veilig coderen, het minst privilege, verificatie van de toeleveringsketen, continue bewaking) met AI-specifieke controles voor alomvattende bescherming  

- **AI-Specifieke Dreigingslandschap**: MCP-systemen worden geconfronteerd met unieke risico’s zoals promptinjectie, toolvergiftiging, sessie-overname, confused deputy-problemen, token-passthrough kwetsbaarheden en overmatige machtigingen die gespecialiseerde mitigaties vereisen  

- **Authenticatie & Autorisatie Uitmuntendheid**: Implementeer robuuste authenticatie met externe identiteitsproviders (Microsoft Entra ID), voer juiste tokenvalidatie uit en accepteer nooit tokens die niet expliciet zijn uitgegeven voor uw MCP-server  

- **AI-aanvalspreventie**: Zet Microsoft Prompt Shields en Azure Content Safety in ter verdediging tegen indirecte promptinjectie- en toolvergiftigingsaanvallen, valideer tool-metadata en monitor op dynamische wijzigingen  

- **Sessie- & Transportbeveiliging**: Gebruik cryptografisch veilige, niet-deterministische sessie-ID’s die aan gebruikersidentiteiten zijn gekoppeld, implementeer een juiste levenscyclusbeheer van sessies en gebruik sessies nooit voor authenticatie  

- **OAuth Beveiligingsbest Practices**: Voorkom confused deputy-aanvallen door expliciete gebruikersconsent voor dynamisch geregistreerde clients, correcte OAuth 2.1-implementatie met PKCE, en strikte validatie van redirect-URI’s  

- **Token Beveiligingsprincipes**: Vermijd anti-patronen voor token-passthrough, valideer token audience claims, implementeer kortstondige tokens met veilige rotatie en behoud duidelijke vertrouwensgrenzen  

- **Uitgebreide Beveiliging van de Toeleveringsketen**: Behandel alle componenten van het AI-ecosysteem (modellen, embeddings, contextproviders, externe API’s) met dezelfde beveiligingsrigor als traditionele softwareafhankelijkheden  

- **Continue Evolutie**: Blijf up-to-date met snel evoluerende MCP-specificaties, lever bijdragen aan beveiligingscommunity-standaarden en onderhoud adaptieve beveiligingshoudingen naarmate het protocol volwassen wordt  

- **Integratie van Microsoft Beveiliging**: Maak gebruik van het uitgebreide beveiligingsecosysteem van Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) voor verbeterde bescherming van MCP-implementaties  

## Uitgebreide Bronnen

### **Officiële MCP Beveiligingsdocumentatie**  
- [MCP Specificatie (Huidig: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Beveiligingsbest Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Autorisatiespecificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)  

### **OWASP MCP Beveiligingsbronnen**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Uitgebreide OWASP MCP Top 10 met Azure-implementatierichtlijnen  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiële OWASP MCP beveiligingsrisico’s  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on beveiligingstraining voor MCP op Azure  

### **Beveiligingsstandaarden en Best Practices**  
- [OAuth 2.0 Beveiligingsbest Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 Webapplicatiebeveiliging](https://owasp.org/www-project-top-ten/)  
- [OWASP Top 10 voor Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [Microsoft Digital Defense Report](https://aka.ms/mddr)  

### **AI Beveiligingsonderzoek & Analyse**  
- [Promptinjectie in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)  
- [Toolvergiftigingsaanvallen (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)  
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)  

### **Microsoft Beveiligingsoplossingen**  
- [Microsoft Prompt Shields Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra ID Beveiliging](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **Implementatiehandleidingen & Tutorials**  
- [Azure API Management als MCP Authenticatie Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID Authenticatie met MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)  
- [Veilige Tokenopslag en Encryptie (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

### **DevOps & Toeleveringsketenbeveiliging**  
- [Azure DevOps Beveiliging](https://azure.microsoft.com/products/devops)  
- [Azure Repos Beveiliging](https://azure.microsoft.com/products/devops/repos/)  
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## **Aanvullende Beveiligingsdocumentatie**

Voor uitgebreide beveiligingsrichtlijnen, raadpleeg deze gespecialiseerde documenten in deze sectie:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Complete beveiligingsbest practices voor MCP-implementaties  
- **[Azure Content Safety Implementatie](./azure-content-safety-implementation.md)** - Praktische implementatievoorbeelden voor Azure Content Safety-integratie  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Laatste beveiligingscontroles en technieken voor MCP-implementaties  
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Snelreferentiegids voor essentiële MCP-beveiligingspraktijken  
- **[BlueHat 2026: Beveiligen van de toekomst van AI: MCP beveiligen met verdediging-in-diepte patronen](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Verdediging-in-diepte patronen van het Microsoft Security Response Center (MSRC)  

### **Hands-On Beveiligingstraining**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Uitgebreide hands-on workshop voor het beveiligen van MCP-servers in Azure met progressieve kampen van Base Camp tot Summit  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentiearchitectuur en implementatierichtlijnen voor alle OWASP MCP Top 10 risico’s  

---

## Wat Nu

Volgende: [Hoofdstuk 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->