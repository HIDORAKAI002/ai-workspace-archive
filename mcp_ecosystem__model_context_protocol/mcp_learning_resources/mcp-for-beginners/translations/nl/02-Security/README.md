# MCP-beveiliging: uitgebreide bescherming voor AI-systemen

[![MCP Security Best Practices](../../../translated_images/nl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik op de afbeelding hierboven om de video van deze les te bekijken)_

Beveiliging is fundamenteel voor het ontwerp van AI-systemen, daarom geven we er prioriteit aan als onze tweede sectie. Dit sluit aan bij Microsofts **Secure by Design**-principe uit de [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Het Model Context Protocol (MCP) brengt krachtige nieuwe mogelijkheden naar AI-gedreven applicaties, terwijl het unieke beveiligingsuitdagingen introduceert die verder gaan dan traditionele softwarerisico's. MCP-systemen krijgen te maken met zowel gevestigde beveiligingskwesties (veilig coderen, minste privilege, beveiliging van de toeleveringsketen) als nieuwe AI-specifieke bedreigingen waaronder promptinjectie, toolvergiftiging, sessiekaping, confused deputy-aanvallen, kwetsbaarheden bij token doorvoer en dynamische wijziging van mogelijkheden.

Deze les verkent de belangrijkste beveiligingsrisico's bij MCP-implementaties—inclusief authenticatie, autorisatie, overtollige rechten, indirecte promptinjectie, sessiebeveiliging, confused deputy-problemen, tokenbeheer en kwetsbaarheden in de toeleveringsketen. Je leert toepasbare controles en best practices om deze risico's te beperken, terwijl je Microsoft-oplossingen zoals Prompt Shields, Azure Content Safety en GitHub Advanced Security inzet om je MCP-implementatie sterker te maken.

## Leerdoelen

Aan het einde van deze les kun je:

- **MCP-specifieke bedreigingen identificeren**: unieke beveiligingsrisico's in MCP-systemen herkennen, waaronder promptinjectie, toolvergiftiging, overtollige permissies, sessiekaping, confused deputy-problemen, kwetsbaarheden bij token doorvoer en risico's in de toeleveringsketen
- **Beveiligingscontroles toepassen**: effectieve mitigaties implementeren, waaronder robuuste authenticatie, minimale toegangsrechten, veilig tokenbeheer, sessiebeveiligingscontroles en verificatie van de toeleveringsketen
- **Microsoft-beveiligingsoplossingen inzetten**: Microsoft Prompt Shields, Azure Content Safety en GitHub Advanced Security begrijpen en implementeren voor bescherming van MCP-workloads
- **Toolbeveiliging valideren**: het belang van validatie van toolmetadata herkennen, monitoring van dynamische wijzigingen toepassen en verdedigen tegen indirecte promptinjectie-aanvallen
- **Best practices integreren**: gevestigde beveiligingsfundamenten (veilig coderen, serverbeveiliging, zero trust) combineren met MCP-specifieke controles voor uitgebreide bescherming

# MCP-beveiligingsarchitectuur & -controles

Moderne MCP-implementaties vereisen gelaagde beveiligingsbenaderingen die zowel traditionele softwarebeveiliging als AI-specifieke bedreigingen aanpakken. De snel evoluerende MCP-specificatie blijft zijn beveiligingscontroles rijpen, wat betere integratie met ondernemingsbeveiligingsarchitecturen en gevestigde best practices mogelijk maakt.

Onderzoek uit het [Microsoft Digital Defense Report](https://aka.ms/mddr) toont aan dat **98% van de gerapporteerde inbreuken voorkomen had kunnen worden door robuuste beveiligingshygiëne**. De meest effectieve beschermingsstrategie combineert fundamentele beveiligingspraktijken met MCP-specifieke controles—bewezen basis beveiligingsmaatregelen blijven het meest impactvol in het verminderen van het totale beveiligingsrisico.

## Huidige beveiligingslandschap

> **Opmerking:** Deze informatie weerspiegelt MCP-beveiligingsstandaarden per **5 februari 2026**, afgestemd op **MCP Specificatie 2025-11-25**. Het MCP-protocol blijft snel evolueren en toekomstige implementaties kunnen nieuwe authenticatiepatronen en uitgebreide controles introduceren. Raadpleeg altijd de actuele [MCP Specificatie](https://spec.modelcontextprotocol.io/), [MCP GitHub-repository](https://github.com/modelcontextprotocol) en [documentatie over best practices beveiliging](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) voor de laatste richtlijnen.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Voor **praktische beveiligingstraining** bevelen we sterk de **MCP Security Summit Workshop** (Sherpa) aan—een uitgebreide begeleide expeditie om MCP-servers te beveiligen in Microsoft Azure.

### Workshopoverzicht

De [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) biedt praktische, toepasbare beveiligingstraining via een bewezen "kwetsbaar → misbruik → oplossen → valideren" methodologie. Je zult:

- **Leren door dingen kapot te maken**: kwetsbaarheden zelf ervaren door het misbruiken van opzettelijk onveilige servers
- **Azure-native beveiliging gebruiken**: Azure Entra ID, Key Vault, API Management en AI Content Safety inzetten
- **Verdediging-in-diepte volgen**: door kampen gaan die uitgebreide beveiligingslagen opbouwen
- **OWASP-standaarden toepassen**: elke techniek correspondeert met de [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Productiecode krijgen**: met werkende, geteste implementaties aan de slag

### De expeditieroute

| Kamp | Focus | Behandelde OWASP-risico's |
|------|-------|---------------------------|
| **Basiskamp** | MCP-grondbeginselen & authenticatiekwetsbaarheden | MCP01, MCP07 |
| **Kamp 1: Identiteit** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: I/O Beveiliging** | Promptinjectie, PII-bescherming, content safety | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: Monitoring** | Log Analytics, dashboards, dreigingsdetectie | MCP04, MCP08 |
| **De Top** | Red Team / Blue Team integratietest | Alle |

**Begin nu**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 beveiligingsrisico’s

De [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beschrijft de tien meest kritische beveiligingsrisico's voor MCP-implementaties:

| Risico | Beschrijving | Azure-mitigatie |
|--------|--------------|-----------------|
| **MCP01** | Token misbeheer & geheimenblootstelling | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege escalatie via scope creep | RBAC, Conditional Access |
| **MCP03** | Toolvergiftiging | Toolvalidatie, integriteitsverificatie |
| **MCP04** | Software toeleveringsketen aanvallen & dependency manipulatie | GitHub Advanced Security, dependency scanning |
| **MCP05** | Commandoinjectie & uitvoering | Inputvalidatie, sandboxing |
| **MCP06** | Intentiestroom subversie | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Onvoldoende authenticatie & autorisatie | Azure Entra ID, OAuth 2.1 met PKCE |
| **MCP08** | Gebrek aan audit en telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Schaduw MCP-servers | API Center governance, netwerkisolatie |
| **MCP10** | Contextinjectie & overmatige blootstelling | Dataclassificatie, minimale blootstelling |

### Evolutie van MCP-authenticatie

De MCP-specificatie is aanzienlijk geëvolueerd in aanpak voor authenticatie en autorisatie:

- **Oorspronkelijke aanpak**: vroege specificaties vereisten dat ontwikkelaars zelf aangepaste authenticatieservers implementeerden, waarbij MCP-servers als OAuth 2.0 autorisatieservers fungeerden die gebruikersauthenticatie direct beheerden
- **Huidige standaard (2025-11-25)**: bijgewerkte specificatie staat toe dat MCP-servers authenticatie delegeren aan externe identiteitsproviders (zoals Microsoft Entra ID), waardoor de beveiligingshouding verbetert en de complexiteit wordt verminderd
- **Transportlaagbeveiliging**: verbeterde ondersteuning voor veilige transportmechanismen met juiste authenticatiepatronen voor zowel lokale (STDIO) als externe (Streamable HTTP) verbindingen

## Authenticatie & autorisatiebeveiliging

### Huidige beveiligingsuitdagingen

Moderne MCP-implementaties ondervinden verschillende uitdagingen op het gebied van authenticatie en autorisatie:

### Risico's & dreigingsvectoren

- **Foutief geconfigureerde autorisatielogica**: gebrekkige autorisatie-implementatie in MCP-servers kan gevoelige gegevens blootstellen en toegangscontroles verkeerd toepassen
- **Compromittering van OAuth-tokens**: diefstal van tokens op lokale MCP-servers maakt het aanvallers mogelijk servers te imiteren en toegang te krijgen tot downstream-services
- **Kwetsbaarheden bij token doorvoer**: onjuiste verwerking van tokens leidt tot omzeiling van beveiligingscontroles en verantwoordelijkheidsproblemen
- **Overmatige permissies**: MCP-servers met te veel rechten overtreden het principe van minste privilege en vergroten het aanvalsoppervlak

#### Token doorvoer: een kritieke anti-patroon

**Token doorvoer is uitdrukkelijk verboden** in de huidige MCP-autorisspecificatie vanwege ernstige beveiligingsimplicaties:

##### Omzeiling van beveiligingscontroles
- MCP-servers en downstream-API's implementeren cruciale beveiligingscontroles (rate limiting, aanvraagvalidatie, verkeersmonitoring) die afhankelijk zijn van juiste tokenvalidatie
- Direct gebruik van client-tot-API tokens omzeilt deze essentiële bescherming, wat de beveiligingsarchitectuur ondermijnt

##### Verantwoordelijkheids- & auditproblemen  
- MCP-servers kunnen niet onderscheiden welke clients upstream-uitgegeven tokens gebruiken, waardoor audittrails worden doorbroken
- Logs van downstream resources tonen misleidende oorsprong van verzoeken in plaats van de daadwerkelijke MCP-server als tussenpersoon
- Onderzoek naar incidenten en nalevingsaudits worden aanzienlijk bemoeilijkt

##### Data-exfiltratie risico's
- Ongeldig gemaakte tokenclaims maken het kwaadwillenden met gestolen tokens mogelijk MCP-servers te gebruiken als proxy's voor data-exfiltratie
- Vertrouwensgrensschendingen maken ongeautoriseerde toegangs- en gebruikspatronen mogelijk die beveiligingscontroles omzeilen

##### Multi-service aanvalsvectoren
- Gecompromitteerde tokens die door meerdere services worden geaccepteerd, maken laterale beweging tussen verbonden systemen mogelijk
- Vertrouwensassumpties tussen services kunnen worden geschonden wanneer tokenherkomst niet kan worden geverifieerd

### Beveiligingscontroles & mitigaties

**Kritieke beveiligingseisen:**

> **VERPLICHT**: MCP-servers **MOGEN GEEN** tokens accepteren die niet expliciet zijn uitgegeven voor de MCP-server

#### Authenticatie- & autorisatiecontroles

- **Strenge autorisatie-audit**: uitgebreide audits uitvoeren op autorisatielogica van MCP-servers om te waarborgen dat alleen bedoelde gebruikers en clients toegang hebben tot gevoelige resources
  - **Implementatiegids**: [Azure API Management als authenticatiegateway voor MCP-servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteitsintegratie**: [Gebruik van Microsoft Entra ID voor MCP-serverauthenticatie](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Veilig tokenbeheer**: implementeer [Microsoft's beste praktijken voor tokenvalidatie en levenscyclus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valideer dat token-audienceclaims overeenkomen met MCP-serveridentiteit
  - Implementeer juiste tokenrotatie- en vervalbeleid
  - Voorkom token replay-aanvallen en ongeautoriseerd gebruik

- **Beschermde tokenopslag**: beveilig tokenopslag met encryptie, zowel in rust als tijdens overdracht
  - **Best practices**: [Veilige tokenopslag en encryptierichtlijnen](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Toegangscontrole-implementatie

- **Principe van minste privilege**: verleen MCP-servers alleen de minimale rechten die nodig zijn voor hun beoogde functionaliteit
  - Regelmatige revisie en bijwerking van rechten om privilege creep te voorkomen
  - **Microsoft-documentatie**: [Veilige least-privileged toegang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: implementeer fijnmazige roltoewijzingen
  - Scope rollen nauwkeurig af op specifieke resources en acties
  - Vermijd brede of onnodige permissies die het aanvalsoppervlak vergroten

- **Continue monitoring van rechten**: voer doorlopende toegangsaudits en monitoring uit
  - Monitor gebruikspatronen van permissies op anomalieën
  - Los overtollige of ongebruikte rechten snel op

## AI-specifieke beveiligingsbedreigingen

### Promptinjectie & toolmanipulatie-aanvallen

Moderne MCP-implementaties worden geconfronteerd met geavanceerde AI-specifieke aanvalsvectoren waar traditionele beveiligingsmaatregelen niet volledig tegen opgewassen zijn:

#### **Indirecte promptinjectie (Cross-Domain Prompt Injection)**

**Indirecte promptinjectie** is een van de meest kritieke kwetsbaarheden in AI-systemen met MCP-ondersteuning. Aanvallers verbergen kwaadaardige instructies binnen externe content—documenten, webpagina’s, e-mails of databronnen—die AI-systemen vervolgens verwerken als legitieme opdrachten.

**Aanvalsscenario’s:**
- **Documentgebaseerde injectie**: kwaadaardige instructies verstopt in verwerkte documenten die ongewenste AI-acties triggeren
- **Exploitatie van webcontent**: gecompromitteerde webpagina’s met ingebedde prompts die AI-gedrag manipuleren bij scraping
- **E-mailgebaseerde aanvallen**: kwaadaardige prompts in e-mails die AI-assistenten laten stelen van informatie of ongeautoriseerde acties laten uitvoeren
- **Verontreiniging van databronnen**: besmette databases of API’s die besmette content leveren aan AI-systemen

**Reële impact**: deze aanvallen kunnen leiden tot datalekken, privacyschendingen, genereren van schadelijke content en manipulatie van gebruikersinteracties. Voor gedetailleerde analyse, zie [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/nl/prompt-injection.ed9fbfde297ca877.webp)

#### **Toolvergiftigingsaanvallen**

**Toolvergiftiging** richt zich op de metadata die MCP-tools definiëren, en maakt misbruik van hoe LLM’s tooling descriptors en parameters interpreteren bij het bepalen van uitvoering.

**Aanvalsmechanismen:**
- **Manipulatie van metadata**: aanvallers injecteren kwaadaardige instructies in toolbeschrijvingen, parameterdefinities of gebruiksvoorbeelden
- **Onzichtbare instructies**: verborgen prompts in toolmetadata die door AI-modellen worden verwerkt maar onzichtbaar zijn voor menselijke gebruikers
- **Dynamische toolwijziging ("Rug Pulls")**: tools die eerder zijn goedgekeurd door gebruikers worden later aangepast om kwaadaardige acties uit te voeren zonder dat de gebruiker het weet
- **Parameterinjectie**: kwaadaardige content ingebed in toolparameterschema’s die gedrag van modellen beïnvloeden

**Risico’s voor gehoste servers**: externe MCP-servers hebben een verhoogd risico omdat tooldefinities na initiële gebruikersgoedkeuring kunnen worden bijgewerkt, waardoor scenario’s ontstaan waarin eerder veilige tools kwaadaardig worden. Voor uitgebreide analyse, zie [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/nl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Aanvullende AI-aanvalsvectoren**

- **Cross-Domain Prompt Injection (XPIA)**: geavanceerde aanvallen die content van meerdere domeinen benutten om beveiligingscontroles te omzeilen
- **Dynamische Capaciteitsaanpassing**: Real-time wijzigingen in toolcapaciteiten die de initiële beveiligingsbeoordelingen ontgaan  
- **Contextvenstervergiftiging**: Aanvallen die grote contextvensters manipuleren om kwaadaardige instructies te verbergen  
- **Modelverwarring-aanvallen**: Misbruik van modelbeperkingen om onvoorspelbaar of onveilig gedrag te veroorzaken  


### Impact van AI-beveiligingsrisico's

**Gevolgen met hoge impact:**  
- **Data-exfiltratie**: Ongeautoriseerde toegang en diefstal van gevoelige bedrijfs- of persoonsgegevens  
- **Privacy-schendingen**: Blootstelling van persoonlijk identificeerbare informatie (PII) en vertrouwelijke bedrijfsgegevens  
- **Systeemmanipulatie**: Onbedoelde wijzigingen aan kritieke systemen en workflows  
- **Diefstal van inloggegevens**: Compromittering van authenticatietokens en servicegegevens  
- **Laterale beweging**: Gebruik van gecompromitteerde AI-systemen als scharnierpunten voor bredere netwerkattacks  

### Microsoft AI-beveiligingsoplossingen

#### **AI Prompt Shields: Geavanceerde bescherming tegen injectieaanvallen**

Microsoft **AI Prompt Shields** bieden uitgebreide verdediging tegen zowel directe als indirecte promptinjectieaanvallen via meerdere beveiligingslagen:

##### **Kernbeschermingsmechanismen:**

1. **Geavanceerde detectie en filtering**  
   - Machine learning-algoritmen en NLP-technieken detecteren kwaadaardige instructies in externe content  
   - Realtime analyse van documenten, webpagina's, e-mails en databronnen op ingesloten bedreigingen  
   - Contextueel begrip van legitieme versus kwaadaardige promptpatronen  

2. **Accentuatietechnieken**  
   - Onderscheidt tussen vertrouwde systeeminstructies en mogelijk gecompromitteerde externe invoer  
   - Teksttransformatie-methodes die modelrelevantie verbeteren en kwaadaardige content isoleren  
   - Helpt AI-systemen de juiste instructiehiërarchie te behouden en geïnjecteerde commando's te negeren  

3. **Scheidingstekens & datamerkingssystemen**  
   - Expliciete begrenzing tussen vertrouwde systeemberichten en externe invoertekst  
   - Speciale markeringen benadrukken grenzen tussen vertrouwde en onbetrouwbare gegevensbronnen  
   - Duidelijke scheiding voorkomt verwarring van instructies en ongeautoriseerde uitvoer  

4. **Continue dreigingsinformatie**  
   - Microsoft monitort voortdurend opkomende aanvalspatronen en werkt verdedigingsmaatregelen bij  
   - Proactief dreigingszoeken naar nieuwe injectietechnieken en aanvalsvectoren  
   - Regelmatige updates van beveiligingsmodellen om effectiviteit tegen evoluerende bedreigingen te waarborgen  

5. **Integratie met Azure Content Safety**  
   - Onderdeel van de uitgebreide Azure AI Content Safety-suite  
   - Extra detectie van jailbreak-pogingen, schadelijke inhoud en overtredingen van beveiligingsbeleid  
   - Geünificeerde beveiligingscontroles over AI-toepassingscomponenten  

**Implementatieresources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/nl/prompt-shield.ff5b95be76e9c78c.webp)  


## Geavanceerde MCP-beveiligingsrisico’s

### Kwetsbaarheden voor sessiekaping

**Sessiekaping** vertegenwoordigt een kritieke aanvalsvector in stateful MCP-implementaties waarbij onbevoegden legitieme sessie-identifiers verkrijgen en misbruiken om zich voor te doen als clients en ongeautoriseerde acties uit te voeren.

#### **Aanvalscenario’s & risico’s**

- **Promptinjectie via sessiekaping**: Aanvallers met gestolen sessie-ID's injecteren kwaadaardige gebeurtenissen in servers die sessiestatus delen, wat schadelijke acties kan triggeren of toegang tot gevoelige data kan geven  
- **Directe imitatie**: Gestolen sessie-ID's stellen direct serveraanroepen aan MCP mogelijk die authenticatie omzeilen, waarbij aanvallers als legitieme gebruikers worden behandeld  
- **Gecompromitteerde hervatbare streams**: Aanvallers kunnen verzoeken voortijdig beëindigen, waardoor legitieme clients opnieuw starten met mogelijk kwaadaardige inhoud  

#### **Beveiligingsmaatregelen voor sessiebeheer**

**Kritieke eisen:**  
- **Verificatie van autorisatie**: MCP-servers die autorisatie implementeren **MOETEN** ALLE binnenkomende verzoeken verifiëren en **MOGEN NIET** vertrouwen op sessies voor authenticatie  
- **Veilige sessiegeneratie**: Gebruik cryptografisch veilige, niet-deterministische sessie-ID's gegenereerd met cryptografische random number generators  
- **Gebruikersspecifieke binding**: Koppel sessie-ID's aan gebruikersspecifieke informatie met formaten zoals `<user_id>:<session_id>` om misbruik tussen gebruikers te voorkomen  
- **Beheer van sessielevenscyclus**: Implementeer juiste vervaltijden, rotatie en invalidatie om kwetsbaarheidsvensters te beperken  
- **Transportbeveiliging**: Verplichte HTTPS voor alle communicatie om onderschepping van sessie-ID's te voorkomen  

### Confused Deputy-probleem

Het **confused deputy-probleem** ontstaat wanneer MCP-servers fungeren als authenticatieproxies tussen clients en derde partijen, wat mogelijkheden creëert voor autorisatieomzeiling via het misbruiken van statische client-ID's.

#### **Mechanica van aanvallen & risico’s**

- **Cookie-gebaseerde toestemming omzeiling**: Eerdere gebruikersauthenticatie creëert toestemmingscookies die aanvallers misbruiken via kwaadaardige autorisatieverzoeken met geconstrueerde redirect-URI's  
- **Diefstal van autorisatiecodes**: Bestaande toestemmingscookies kunnen ertoe leiden dat autorisatieservers toestemmingsschermen overslaan en codes omleiden naar door aanvallers beheerde endpoints  
- **Ongeautoriseerde API-toegang**: Gestolen autorisatiecodes maken tokenuitwisseling en gebruikersimitatie mogelijk zonder expliciete toestemming  

#### **Mitigatiestrategieën**

**Verplichte maatregelen:**  
- **Expliciete toestemmingsvereisten**: MCP-proxyservers met statische client-ID's **MOETEN** gebruikersconsent verkrijgen voor elke dynamisch geregistreerde client  
- **OAuth 2.1 beveiligingsimplementatie**: Volg actuele OAuth-beveiligingsrichtlijnen inclusief PKCE (Proof Key for Code Exchange) voor alle autorisatieverzoeken  
- **Strikte clientvalidatie**: Implementeer rigoureuze validatie van redirect-URI's en clientidentificatoren om exploitatie te voorkomen  

### Token-passthrough kwetsbaarheden

**Token-passthrough** is een expliciete anti-patroon waarbij MCP-servers clienttokens accepteren zonder juiste validatie en deze doorsturen naar downstream API’s, wat de MCP-autorisatiespecificaties schendt.

#### **Beveiligingsimplicaties**

- **Omzeiling van controles**: Directe client-naar-API tokengebruik omzeilt belangrijke rate-limiting, validatie en monitoring controles  
- **Corruptie van audittrajecten**: Upstream uitgegeven tokens maken clientidentificatie onmogelijk, waardoor incidentonderzoek faalt  
- **Proxy-gebaseerde data-exfiltratie**: Ongevalideerde tokens maken kwaadaardige actoren mogelijk om servers als proxy te gebruiken voor ongeautoriseerde data toegang  
- **Schending van vertrouwensgrenzen**: Downstream services kunnen vertrouwen verliezen als tokenherkomst niet geverifieerd wordt  
- **Uitbreiding van multi-service aanvallen**: Gecompromitteerde tokens die in meerdere services worden geaccepteerd, maken laterale beweging mogelijk  

#### **Vereiste beveiligingsmaatregelen**

**Niet-onderhandelbare vereisten:**  
- **Tokenvalidatie**: MCP-servers **MOGEN NIET** tokens accepteren die niet specifiek voor de MCP-server zijn uitgegeven  
- **Audience-verificatie**: Controleer altijd of de token audience claims overeenkomen met de identiteit van de MCP-server  
- **Correcte tokenlevenscyclus**: Implementeer kortdurende toegangstokens met veilige rotatiepraktijken  


## Beveiliging van de supply chain voor AI-systemen

Supply chain-beveiliging is geëvolueerd voorbij traditionele softwareafhankelijkheden en omvat het volledige AI-ecosysteem. Moderne MCP-implementaties moeten alle AI-gerelateerde componenten rigoureus verifiëren en monitoren, aangezien elk potentiële kwetsbaarheden introduceert die systeemintegriteit kunnen schaden.

### Uitgebreide AI supply chain-componenten

**Traditionele softwareafhankelijkheden:**  
- Open source libraries en frameworks  
- Containerimages en basis systemen  
- Ontwikkeltools en build pipelines  
- Infrastructuurcomponenten en services  

**AI-specifieke supply chain-elementen:**  
- **Foundation Models**: Voorgetrainde modellen van diverse aanbieders die herkomstverificatie vereisen  
- **Embedding-services**: Externe vectorisatie- en semantische zoekdiensten  
- **Contextproviders**: Datasources, kennisbanken en documentrepositories  
- **Third-party API’s**: Externe AI-diensten, ML-pijplijnen en datapijlers  
- **Modelartifacts**: Weights, configuraties en fijn-getunede modelvarianten  
- **Trainingsdatabronnen**: Databases gebruikt voor modeltraining en fine-tuning  

### Uitgebreide supply chain-beveiligingsstrategie

#### **Componentverificatie & vertrouwen**  
- **Herkomstvalidatie**: Verifieer oorsprong, licenties en integriteit van alle AI-componenten vóór integratie  
- **Beveiligingsbeoordeling**: Voer kwetsbaarheidsscans en beveiligingsreviews uit voor modellen, databronnen en AI-diensten  
- **Reputatieanalyse**: Evalueer beveiligingsgeschiedenis en praktijken van AI-dienstverleners  
- **Compliance-verificatie**: Zorg dat alle componenten voldoen aan organisatorische beveiligings- en regelgevingseisen  

#### **Veilige implementatiepijplijnen**  
- **Geautomatiseerde CI/CD beveiliging**: Integreer beveiligingsscans door geautomatiseerde deployment pipelines  
- **Integriteitscontrole van artifacts**: Voer cryptografische verificatie uit op alle geïmplementeerde artifacts (code, modellen, configuraties)  
- **Gefaseerde deployment**: Pas progressieve uitrolstrategieën toe met beveiligingsvalidatie in elke fase  
- **Vertrouwde artifact repositories**: Implementeer alleen vanuit geverifieerde, beveiligde artifact registries en opslagplaatsen  

#### **Continue monitoring & respons**  
- **Afhankelijkheidsscanning**: Voortdurende kwetsbaarheidsmonitoring voor alle software- en AI-componentafhankelijkheden  
- **Modelmonitoring**: Continue evaluatie van modelgedrag, performance-variaties en beveiligingsafwijkingen  
- **Dienstgezondheidsmonitoring**: Bewaking van externe AI-diensten op beschikbaarheid, veiligheidsincidenten en beleidswijzigingen  
- **Integratie van dreigingsinformatie**: Gebruik van dreigingsfeeds specifiek voor AI- en ML-beveiligingsrisico’s  

#### **Toegangscontrole & least privilege**  
- **Componentniveau-permissies**: Beperk toegang tot modellen, data en services op basis van zakelijke noodzaak  
- **Service-accountbeheer**: Gebruik speciale service-accounts met minimale benodigde permissies  
- **Netwerksegmentatie**: Isoleer AI-componenten en beperk netwerktoegang tussen diensten  
- **API Gateway-controles**: Gebruik gecentraliseerde API-gateways om toegangscontrole en monitoring voor externe AI-services te beheren  

#### **Incidentrespons & herstel**  
- **Snelle responssystemen**: Ingestelde processen voor patching of vervanging van gecompromitteerde AI-componenten  
- **Rotatie van inloggegevens**: Geautomatiseerde systemen voor het roteren van secrets, API-sleutels en servicegegevens  
- **Rollback-mogelijkheden**: Snel terug kunnen keren naar eerder bekende goede versies van AI-componenten  
- **Herstelprocedure bij supply chain-schending**: Specifieke processen voor het reageren op gecompromitteerde upstream AI-diensten  

### Microsoft beveiligingstools & integratie

**GitHub Advanced Security** biedt uitgebreide supply chain-bescherming waaronder:  
- **Secret scanning**: Automatische detectie van inloggegevens, API-keys en tokens in repositories  
- **Dependency scanning**: Kwetsbaarheidsbeoordeling van open source dependencies en libraries  
- **CodeQL-analyse**: Statische code-analyse voor beveiligingsfouten en codeproblemen  
- **Supply chain inzichten**: Inzicht in afhankelijkheidsgezondheid en beveiligingsstatus  

**Azure DevOps & Azure Repos integratie:**  
- Naadloze integratie van beveiligingsscanning over Microsoft-ontwikkelplatforms  
- Geautomatiseerde beveiligingschecks in Azure Pipelines voor AI workloads  
- Beleidshandhaving voor veilige AI-componentdeployment  

**Microsoft interne praktijken:**  
Microsoft past uitgebreide supply chain-beveiligingspraktijken toe in alle producten. Lees meer over bewezen methodes in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Best practices voor fundamentele beveiliging

MCP-implementaties bouwen voort op en versterken de bestaande beveiligingshouding van uw organisatie. Het versterken van fundamentele beveiligingspraktijken verbetert de algehele beveiliging van AI-systemen en MCP-implementaties aanzienlijk.

### Kernprincipes van beveiliging

#### **Veilige ontwikkelpraktijken**  
- **OWASP-compliance**: Bescherming tegen [OWASP Top 10](https://owasp.org/www-project-top-ten/) kwetsbaarheden in webapplicaties  
- **AI-specifieke bescherming**: Implementeer maatregelen voor [OWASP Top 10 voor LLM's](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Veilig geheimbeheer**: Gebruik toegewijde kluizen voor tokens, API-keys en gevoelige configuratiegegevens  
- **End-to-end encryptie**: Veilige communicatie over alle applicatiecomponenten en datastromen heen  
- **Inputvalidatie**: Strenge validatie van alle gebruikersinvoer, API-parameters en gegevensbronnen  

#### **Versterking van infrastructuur**  
- **Multi-factor authenticatie**: Verplichte MFA voor alle administratieve en service-accounts  
- **Patchbeheer**: Geautomatiseerde en tijdige patching voor besturingssystemen, frameworks en dependencies  
- **Integratie van identiteitproviders**: Centrale identiteitsbeheer via enterprise-identityproviders (Microsoft Entra ID, Active Directory)  
- **Netwerksegmentatie**: Logische isolatie van MCP-componenten ter beperking van laterale beweging  
- **Principle of Least Privilege**: Minimale noodzakelijke permissies voor alle systeemcomponenten en accounts  

#### **Beveiligingsmonitoring & detectie**  
- **Uitgebreide logging**: Gedetailleerde logs van AI-applicatieactiviteiten, inclusief client-server interacties binnen MCP  
- **SIEM-integratie**: Centraal beveiligingsinformatie- en eventmanagement ter anomaliedetectie  
- **Gedragsanalyse**: AI-aangedreven monitoring voor het detecteren van ongebruikelijke patronen in systeem- en gebruikersgedrag  
- **Dreigingsinformatie**: Integratie van externe dreigingsfeeds en indicatoren van compromittering (IOCs)  
- **Incidentrespons**: Goed gedefinieerde procedures voor detectie, respons en herstel van beveiligingsincidenten  

#### **Zero Trust architectuur**  
- **Nooit vertrouwen, altijd verifiëren**: Continue verificatie van gebruikers, apparaten en netwerkverbindingen  
- **Micro-segmentatie**: Fijnmazige netwerkcontrole die individuele workloads en diensten isoleert  
- **Identiteitsgerichte beveiliging**: Beveiligingsbeleid gebaseerd op geverifieerde identiteiten in plaats van netwerkpositie  
- **Continue risicobeoordeling**: Dynamische evaluatie van beveiligingshouding op basis van actuele context en gedrag  
- **Conditionele toegang**: Toegangscontroles die zich aanpassen aan risicofactoren, locatie en apparaatvertrouwen  

### Patronen voor integratie binnen ondernemingen

#### **Integratie in Microsoft-beveiligingsecosysteem**  
- **Microsoft Defender for Cloud**: Uitgebreid cloud security posture management  
- **Azure Sentinel**: Cloud-native SIEM en SOAR mogelijkheden voor AI workloadbescherming  
- **Microsoft Entra ID**: Enterprise-identiteit- en toegangsbeheer met conditionele toegangspolicies  
- **Azure Key Vault**: Gecentraliseerd geheimbeheer met hardware security module (HSM) ondersteuning  
- **Microsoft Purview**: Data governance en compliance voor AI-databronnen en workflows  

#### **Compliance & governance**  
- **Afstemming op regelgeving**: Zorg dat MCP-implementaties voldoen aan branchespecifieke compliance-eisen (GDPR, HIPAA, SOC 2)  
- **Dataclassificatie**: Juiste categorisatie en behandeling van gevoelige gegevens die door AI-systemen worden verwerkt  
- **Audittrajecten**: Uitgebreide logging voor naleving van regelgeving en forensisch onderzoek  
- **Privacycontroles**: Implementatie van privacy-by-design principes in de AI-systeemarchitectuur  
- **Change management**: Formele processen voor beveiligingsreviews van AI-systeemwijzigingen  

Deze fundamentele praktijken creëren een robuuste beveiligingsbasis die de effectiviteit van MCP-specifieke beveiligingscontroles versterkt en alomvattende bescherming biedt voor AI-gedreven applicaties.  

## Belangrijke beveiligingslessen  

- **Gelaagde Beveiligingsaanpak**: Combineer fundamentele beveiligingspraktijken (veilig coderen, het principe van de minste rechten, verificatie van de supply chain, continue monitoring) met AI-specifieke controles voor volledige bescherming

- **AI-Specifiek Dreigingslandschap**: MCP-systemen worden geconfronteerd met unieke risico’s zoals promptinjection, tool poisoning, sessiekaping, confused deputy-problemen, token passthrough-kwetsbaarheden en overmatige machtigingen die gespecialiseerde mitigaties vereisen

- **Excellentie in Authenticatie & Autorisatie**: Implementeer robuuste authenticatie met externe identiteitsproviders (Microsoft Entra ID), handhaaf juiste tokenvalidatie en accepteer nooit tokens die niet expliciet zijn uitgegeven voor jouw MCP-server

- **AI-aanvalspreventie**: Zet Microsoft Prompt Shields en Azure Content Safety in om te beschermen tegen indirecte promptinjection- en tool poisoning-aanvallen, terwijl je toolmetadata valideert en dynamische wijzigingen monitort

- **Sessie- & Transportbeveiliging**: Gebruik cryptografisch veilige, niet-deterministische sessie-ID’s gekoppeld aan gebruikersidentiteiten, implementeer correct sessiebeheer gedurende de levenscyclus en gebruik nooit sessies voor authenticatie

- **Beste Praktijken voor OAuth-beveiliging**: Voorkom confused deputy-aanvallen via expliciete gebruikersconsent voor dynamisch geregistreerde clients, correcte OAuth 2.1-implementatie met PKCE, en strikte validatie van redirect-URI's  

- **Tokenbeveiligingsprincipes**: Vermijd anti-patronen bij token passthrough, valideer token audience-claims, implementeer kortdurende tokens met veilige rotatie en behoud duidelijke vertrouwen-grenzen

- **Omvattende Supply Chain Beveiliging**: Behandel alle AI-ecosysteemcomponenten (modellen, embeddings, contextproviders, externe API’s) met dezelfde beveiligingsrigor als traditionele software-afhankelijkheden

- **Continue Evolutie**: Blijf bij met snel evoluerende MCP-specificaties, draag bij aan standaarden in de beveiligingsgemeenschap en behoud aanpasbare beveiligingshoudingen naarmate het protocol zich ontwikkelt

- **Integratie van Microsoft Beveiliging**: Maak gebruik van Microsofts uitgebreide beveiligingsecologie (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) voor verbeterde bescherming bij MCP-implementaties

## Uitgebreide Bronnen

### **Officiële MCP Beveiligingsdocumentatie**
- [MCP Specificatie (Actueel: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Beveiligings Beste Praktijken](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Autorisatie Specificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Beveiligingsbronnen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Uitgebreide OWASP MCP Top 10 met Azure-implementatierichtlijnen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiële OWASP MCP-beveiligingsrisico’s
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktische beveiligingstraining voor MCP op Azure

### **Beveiligingsstandaarden & Beste Praktijken**
- [OAuth 2.0 Beveiligings Beste Praktijken (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Webapplicatiebeveiliging](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 voor Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI Beveiligingsonderzoek & Analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Aanvallen (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Beveiligingsoplossingen**
- [Microsoft Prompt Shields Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Beveiliging](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Beste Praktijken](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementatiehandleidingen & Tutorials**
- [Azure API Management als MCP Authenticatie Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authenticatie met MCP-servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Veilige Tokenopslag en Encryptie (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Supply Chain Beveiliging**
- [Azure DevOps Beveiliging](https://azure.microsoft.com/products/devops)
- [Azure Repos Beveiliging](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Aanvullende Beveiligingsdocumentatie**

Voor uitgebreide beveiligingsrichtlijnen, raadpleeg deze gespecialiseerde documenten in deze sectie:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Volledige beste beveiligingspraktijken voor MCP-implementaties
- **[Azure Content Safety Implementatie](./azure-content-safety-implementation.md)** - Praktische implementatievoorbeelden voor integratie van Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Laatste beveiligingscontroles en technieken voor MCP-implementaties
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Snelle referentiegids voor essentiële MCP-beveiligingspraktijken
- **[BlueHat 2026: De toekomst van AI beveiligen: MCP beveiligen met defense in depth-patronen](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Defense-in-depth-patronen van het Microsoft Security Response Center (MSRC)

### **Hands-on Beveiligingstraining**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Uitgebreide hands-on workshop voor het beveiligen van MCP-servers in Azure met progressieve camps van Base Camp tot Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentiearchitectuur en implementatierichtlijnen voor alle OWASP MCP Top 10 risico’s

---

## Wat Nu

Volgend: [Hoofdstuk 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->