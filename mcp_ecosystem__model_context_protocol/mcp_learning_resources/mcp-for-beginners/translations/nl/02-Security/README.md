# MCP-beveiliging: uitgebreide bescherming voor AI-systemen

[![MCP Security Best Practices](../../../translated_images/nl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik op de bovenstaande afbeelding om de video van deze les te bekijken)_

Beveiliging is fundamenteel voor het ontwerp van AI-systemen, daarom geven we er prioriteit aan als tweede onderdeel. Dit sluit aan bij het Microsoft-principe **Secure by Design** uit het [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Het Model Context Protocol (MCP) brengt krachtige nieuwe mogelijkheden naar AI-gedreven toepassingen en introduceert unieke beveiligingsuitdagingen die verder gaan dan traditionele softwarerisico's. MCP-systemen worden geconfronteerd met zowel gevestigde beveiligingsproblemen (veilig coderen, minste rechten, beveiliging van de toeleveringsketen) als nieuwe AI-specifieke bedreigingen, waaronder promptinjectie, toolvergiftiging, sessiekaping, confused deputy-aanvallen, token passthrough kwetsbaarheden en dynamische capaciteitswijzigingen.

Deze les behandelt de belangrijkste beveiligingsrisico's in MCP-implementaties—waaronder authenticatie, autorisatie, overmatige permissies, indirecte promptinjectie, sessiebeveiliging, confused deputy-problemen, tokenbeheer en kwetsbaarheden in de toeleveringsketen. Je leert toepasbare controles en beste praktijken om deze risico's te verminderen, terwijl je Microsoft-oplossingen zoals Prompt Shields, Azure Content Safety en GitHub Advanced Security gebruikt om je MCP-implementatie te versterken.

## Leerdoelen

Aan het einde van deze les kun je:

- **Specifieke MCP-bedreigingen identificeren**: Unieke beveiligingsrisico's in MCP-systemen herkennen, inclusief promptinjectie, toolvergiftiging, overmatige permissies, sessiekaping, confused deputy-problemen, token passthrough kwetsbaarheden en risico's in de toeleveringsketen
- **Beveiligingscontroles toepassen**: Effectieve mitigaties implementeren, waaronder robuuste authenticatie, least privilege-toegang, veilig tokenbeheer, sessiebeveiligingscontroles en verificatie van de toeleveringsketen
- **Microsoft-beveiligingsoplossingen inzetten**: Microsoft Prompt Shields, Azure Content Safety en GitHub Advanced Security begrijpen en implementeren voor de bescherming van MCP-werklasten
- **Toolbeveiliging valideren**: Het belang van validatie van toolmetadata herkennen, monitoring van dynamische wijzigingen toepassen en verdedigen tegen indirecte promptinjectie-aanvallen
- **Beste praktijken integreren**: Gevestigde beveiligingsfundamenten (veilig coderen, serverhardening, zero trust) combineren met MCP-specifieke controles voor uitgebreide bescherming

# MCP-beveiligingsarchitectuur & controles

Moderne MCP-implementaties vereisen gelaagde beveiligingsaanpakken die zowel traditionele softwarebeveiliging als AI-specifieke bedreigingen aanpakken. De snel evoluerende MCP-specificatie verfijnt zijn beveiligingscontroles, wat betere integratie met enterprise beveiligingsarchitecturen en gevestigde beste praktijken mogelijk maakt.

Onderzoek van het [Microsoft Digital Defense Report](https://aka.ms/mddr) toont aan dat **98% van de gerapporteerde inbreuken voorkomen had kunnen worden door robuuste beveiligingshygiëne**. De meest effectieve beschermingsstrategie combineert fundamentele beveiligingspraktijken met MCP-specifieke controles—de bewezen basismaten voor beveiliging blijven het meest impactvol in het verminderen van het totale beveiligingsrisico.

## Huidig beveiligingslandschap

> **Opmerking:** Deze informatie weerspiegelt MCP-beveiligingsstandaarden per **5 februari 2026**, in lijn met **MCP Specificatie 2025-11-25**. Het MCP-protocol blijft snel evolueren en toekomstige implementaties kunnen nieuwe authenticatiepatronen en verbeterde controles introduceren. Raadpleeg altijd de actuele [MCP Specificatie](https://spec.modelcontextprotocol.io/), [MCP GitHub-repository](https://github.com/modelcontextprotocol) en [documentatie over beveiligingsbest practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) voor de laatste richtlijnen.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Voor **praktijkgerichte beveiligingstraining** raden we sterk de **MCP Security Summit Workshop** (Sherpa) aan - een uitgebreide begeleide expeditie voor het beveiligen van MCP-servers in Microsoft Azure.

### Workshopoverzicht

De [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) biedt praktische en toepasbare beveiligingstraining via een beproefde "kwetsbaar → exploit → fix → valideren" methodologie. Je zult:

- **Leren door fouten te maken**: Kwetsbaarheden zelf ervaren door het exploiteren van opzettelijk onveilige servers
- **Azure-native beveiliging gebruiken**: Azure Entra ID, Key Vault, API Management en AI Content Safety inzetten
- **Verdediging-in-diepte volgen**: Via verschillende kampen progressie maken en uitgebreide beveiligingslagen opbouwen
- **OWASP-standaarden toepassen**: Elke techniek is gekoppeld aan de [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Productiecode ontvangen**: Naar huis gaan met werkende, geteste implementaties

### Expeditieroute

| Kampeerplaats | Focus | Behandelde OWASP-risico’s |
|--------------|-------|---------------------------|
| **Base Camp** | MCP-grondbeginselen & authenticatiekwetsbaarheden | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | Promptinjectie, PII-bescherming, content safety | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | Log Analytics, dashboards, dreigingsdetectie | MCP08 |
| **De Top** | Red Team / Blue Team integratietest | Alle |

**Begin hier**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 beveiligingsrisico’s

De [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beschrijft de tien belangrijkste beveiligingsrisico’s voor MCP-implementaties:

| Risico | Beschrijving | Azure Mitigatie |
|--------|--------------|-----------------|
| **MCP01** | Token misbeheer & geheim onthulling | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege escalatie door scope creep | RBAC, Conditional Access |
| **MCP03** | Toolvergiftiging | Validatie tool, integriteitsverificatie |
| **MCP04** | Toeleveringsketen-aanvallen | GitHub Advanced Security, dependency scanning |
| **MCP05** | Commandoinjectie & uitvoering | Validatie invoer, sandboxing |
| **MCP06** | Promptinjectie via contextuele payloads | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Onvoldoende authenticatie & autorisatie | Azure Entra ID, OAuth 2.1 met PKCE |
| **MCP08** | Gebrek aan audit & telemetrie | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP-servers | API Center governance, netwerka-isolatie |
| **MCP10** | Context-injectie & over-sharing | Dataclassificatie, minimale blootstelling |

### Evolutie van MCP-authenticatie

De MCP-specificatie is aanzienlijk geëvolueerd in zijn aanpak van authenticatie en autorisatie:

- **Oorspronkelijke aanpak**: Vroege specificaties vereisten dat ontwikkelaars aangepaste authenticatieservers implementeerden, waarbij MCP-servers optreden als OAuth 2.0 Authorisatie-servers die gebruikersauthenticatie direct beheren
- **Huidige standaard (2025-11-25)**: Bijgewerkte specificatie laat MCP-servers authenticatie delegeren aan externe identiteitsproviders (zoals Microsoft Entra ID), wat de beveiligingshouding verbetert en implementatiecomplexiteit vermindert
- **Transportlaagbeveiliging**: Verbeterde ondersteuning van veilige transportmechanismen met correcte authenticatiepatronen voor zowel lokale (STDIO) als externe (Streamable HTTP) connecties

## Authenticatie- & autorisatiebeveiliging

### Huidige beveiligingsuitdagingen

Moderne MCP-implementaties staan voor diverse uitdagingen omtrent authenticatie en autorisatie:

### Risico’s & bedreigingsvectoren

- **Onjuist geconfigureerde autorisatielogica**: Fouten in autorisatie-implementatie in MCP-servers kunnen gevoelige gegevens blootstellen en verkeerde toegangscontrole toepassen
- **OAuth-tokencompromittering**: Diefstal van tokens van lokale MCP-servers stelt aanvallers in staat zich voor te doen als servers en downstream services te bereiken
- **Token passthrough kwetsbaarheden**: Onjuist tokenbeheer creëert omzeilingen van beveiligingscontroles en tekortkomingen in verantwoording
- **Overmatige permissies**: Te veel privileges voor MCP-servers schenden het principe van minste rechten en vergroten het aanvalsvlak

#### Token Passthrough: een Kritieke Anti-Patroon

**Token passthrough is expliciet verboden** in de huidige MCP-autorisatiespecificatie vanwege ernstige beveiligingsimplicaties:

##### Omzeiling van beveiligingscontroles
- MCP-servers en downstream API’s implementeren cruciale beveiligingscontroles (rate limiting, requestvalidatie, verkeerbewaking) die afhankelijk zijn van correcte tokenvalidatie
- Rechtstreekse client-naar-API tokengebruik omzeilt deze essentiële beschermingen en ondermijnt de beveiligingsarchitectuur

##### Verantwoordings- en audituitdagingen  
- MCP-servers kunnen niet onderscheiden welke clients tokens gebruiken die upstream zijn uitgegeven, waardoor auditsporen verbroken worden
- Logs van downstream resource servers tonen misleidende herkomst van verzoeken in plaats van de daadwerkelijke MCP-server als tussenpersoon
- Incidentonderzoek en compliance audits worden daardoor aanzienlijk moeilijker

##### Gegevensdiefstalrisico’s
- Ongevalideerde tokenclaims stellen kwaadwilligen met gestolen tokens in staat MCP-servers als proxy te gebruiken voor data-exfiltratie
- Overtredingen van vertrouwensgrenzen maken ongeautoriseerde toegangspatronen mogelijk die beveiligingscontroles omzeilen

##### Meerdere service-aanvalsvectoren
- Gecompromitteerde tokens die door meerdere services worden geaccepteerd, maken zijwaartse verplaatsing binnen verbonden systemen mogelijk
- Vertrouwensaspecten tussen services kunnen worden verbroken wanneer tokenherkomst niet te verifiëren is

### Beveiligingscontroles & mitigaties

**Kritieke beveiligingseisen:**

> **VERPLICHT**: MCP-servers **MOGEN GEEN** tokens accepteren die niet expliciet voor de MCP-server zijn uitgegeven

#### Authenticatie- & autorisatiecontroles

- **Grondige autorisatie-audit**: Voer uitgebreide controles uit op de autorisatielogica van MCP-servers om te verzekeren dat alleen bedoelde gebruikers en clients toegang hebben tot gevoelige bronnen
  - **Implementatiehandleiding**: [Azure API Management als authenticatiegateway voor MCP-servers](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteitsintegratie**: [Microsoft Entra ID gebruiken voor MCP-serverauthenticatie](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Veilig tokenbeheer**: Implementeer [Microsofts beste praktijken voor tokenvalidatie en levenscyclus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valideer dat token-audience claims overeenkomen met de MCP-serveridentiteit
  - Implementeer correcte tokenrotatie en vervalbeleid
  - Voorkom token-replayaanvallen en ongeautoriseerd gebruik

- **Beschermde tokenopslag**: Beveilig tokenopslag met encryptie in rust en tijdens transport
  - **Beste praktijken**: [Handleiding voor veilige tokenopslag en encryptie](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Toegangscontrole-implementatie

- **Principe van minste rechten**: Geef MCP-servers alleen de minimaal vereiste permissies voor de beoogde functionaliteit
  - Regelmatige beoordeling en bijwerking van rechten om privilege creep te voorkomen
  - **Microsoft-documentatie**: [Beveiligde least-privileged toegang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Role-Based Access Control (RBAC)**: Implementeer fijnmazige roltoewijzingen
  - Scope rollen strikt tot specifieke bronnen en acties
  - Vermijd brede of onnodige permissies die het aanvalsvlak vergroten

- **Continue permissiemonitoring**: Voer doorlopende toegangscontrole en monitoring uit
  - Houd permissiegebruik in de gaten op afwijkingen
  - Los overmatige of ongebruikte rechten snel op

## AI-specifieke beveiligingsbedreigingen

### Promptinjectie- & toolmanipulatie-aanvallen

Moderne MCP-implementaties worden geconfronteerd met geavanceerde AI-specifieke aanvalsvectoren die traditionele beveiligingsmaatregelen niet volledig kunnen afdekken:

#### **Indirecte promptinjectie (Cross-Domain Prompt Injection)**

**Indirecte promptinjectie** is een van de meest kritieke kwetsbaarheden in AI-systemen met MCP. Aanvallers verbergen kwaadaardige instructies in externe content—documenten, webpagina’s, e-mails of databronnen—die AI-systemen later verwerken als legitieme opdrachten.

**Aanvalsscenario’s:**
- **Documentgebaseerde injectie**: Kwaadaardige instructies verborgen in verwerkte documenten die onbedoelde AI-acties triggeren
- **Webinhoud-exploitatie**: Gecompromitteerde webpagina’s met ingebedde prompts die AI-gedrag manipuleren bij scraping
- **E-mailgebaseerde aanvallen**: Kwaadaardige prompts in e-mails die AI-assistenten ertoe aanzetten informatie te lekken of ongeautoriseerde acties uit te voeren
- **Data source contaminatie**: Gecompromitteerde databases of API’s die besmette inhoud aan AI-systemen leveren

**Reële impact**: Deze aanvallen kunnen leiden tot datalekken, privacyschendingen, genereren van schadelijke content en manipulatie van gebruikersinteracties. Voor gedetailleerde analyse, zie [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/nl/prompt-injection.ed9fbfde297ca877.webp)

#### **Toolvergiftiging-aanvallen**

**Toolvergiftiging** richt zich op de metadata die MCP-tools definiëren, waarbij misbruik wordt gemaakt van hoe LLM’s toolbeschrijvingen en parameters interpreteren om beslissingen over uitvoering te nemen.

**Aanvalsmechanismen:**
- **Metadata-manipulatie**: Aanvallers injecteren kwaadaardige instructies in toolbeschrijvingen, parameterdefinities of gebruiksvoorbeelden
- **Onzichtbare instructies**: Verborgen prompts in toolmetadata die door AI-modellen worden verwerkt maar onzichtbaar zijn voor menselijke gebruikers
- **Dynamische toolwijziging (“Rug Pulls”)**: Tools die door gebruikers zijn goedgekeurd worden later aangepast om kwaadwillige acties uit te voeren zonder dat gebruikers dit weten
- **Parameterinjectie**: Kwaadaardige inhoud verwerkt in toolschema’s voor parameters die het modelgedrag beïnvloeden

**Risico’s bij gehoste servers**: Externe MCP-servers brengen verhoogde risico’s doordat tooldefinities na gebruikersgoedkeuring kunnen worden aangepast, waardoor eerder veilige tools kwaadaardig worden. Voor uitgebreide analyse, zie [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/nl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Aanvullende AI-aanvalsvectoren**

- **Cross-Domain Prompt Injection (XPIA)**: Geavanceerde aanvallen die inhoud uit meerdere domeinen benutten om beveiligingscontroles te omzeilen
- **Dynamische Capaciteitswijziging**: Wijzigingen in toolcapaciteiten in realtime die aan initiële beveiligingsbeoordelingen ontsnappen  
- **Contextvenstervergiftiging**: Aanvallen die grote contextvensters manipuleren om kwaadaardige instructies te verbergen  
- **Modelverwarringsaanvallen**: Misbruik van modellimieten om onvoorspelbaar of onveilig gedrag te veroorzaken  


### Impact van AI-beveiligingsrisico's

**Gevolgen met grote impact:**  
- **Data-exfiltratie**: Ongeautoriseerde toegang en diefstal van gevoelige bedrijfs- of persoonlijke gegevens  
- **Privacy-inbreuken**: Blootstelling van persoonsgegevens (PII) en vertrouwelijke bedrijfsinformatie  
- **Systeemmanipulatie**: Onbedoelde wijzigingen in kritieke systemen en workflows  
- **Diefstal van referenties**: Compromittering van authenticatietokens en service-referenties  
- **Laterale beweging**: Gebruik van gecompromitteerde AI-systemen als schakels voor bredere netwerk-aanvallen  

### Microsoft AI-beveiligingsoplossingen

#### **AI Prompt Shields: Geavanceerde bescherming tegen injectieaanvallen**

Microsoft **AI Prompt Shields** bieden uitgebreide verdediging tegen directe en indirecte promptinjectieaanvallen via meerdere beveiligingslagen:

##### **Kernbeschermingsmechanismen:**

1. **Geavanceerde detectie & filtering**  
   - Machine-learningalgoritmes en NLP-technieken detecteren kwaadaardige instructies in externe inhoud  
   - Realtime analyse van documenten, webpagina’s, e-mails en databronnen op ingesloten bedreigingen  
   - Contextueel begrip van legitieme versus kwaadaardige promptpatronen  

2. **Spotlighting-technieken**  
   - Onderscheidt tussen vertrouwde systeeminstructies en mogelijk gecompromitteerde externe invoer  
   - Teksttransformatie-methoden die modellerelevantie verbeteren en kwaadaardige inhoud isoleren  
   - Helpt AI-systemen een correcte instructiehiërarchie te behouden en geïnjecteerde opdrachten te negeren  

3. **Scheidingstekens & datamerking systemen**  
   - Expliciete begrenzing tussen vertrouwde systeemberichten en externe tekstinvoer  
   - Speciale markers benadrukken grenzen tussen vertrouwde en onbetrouwbare gegevensbronnen  
   - Duidelijke scheiding voorkomt instructieverwarring en ongeautoriseerde commando-executie  

4. **Continue dreigingsinformatie**  
   - Microsoft bewaakt continu opkomende aanvalspatronen en werkt verdedigingen bij  
   - Proactieve dreigingsjacht naar nieuwe injectietechnieken en aanvalsvectoren  
   - Regelmatige beveiligingsmodelupdates voor effectiviteit tegen evoluerende dreigingen  

5. **Integratie met Azure Content Safety**  
   - Onderdeel van de uitgebreide Azure AI Content Safety suite  
   - Extra detectie voor jailbreakpogingen, schadelijke inhoud en overtredingen van beveiligingsbeleid  
   - Geünificeerde beveiligingscontroles over AI-applicatiecomponenten  

**Implementatieresources**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/nl/prompt-shield.ff5b95be76e9c78c.webp)


## Geavanceerde MCP-beveiligingsbedreigingen

### Kwetsbaarheden voor sessie-overname

**Sessie-overname** is een kritisch aanvalspunt in stateful MCP-implementaties waarbij onbevoegden legitieme sessie-ID's verkrijgen en misbruiken om zich als cliënten voor te doen en ongeautoriseerde acties uit te voeren.

#### **Aanvalsscenario’s & risico’s**

- **Promptinjectie bij sessie-overname**: Aanvallers met gestolen sessie-ID's injecteren kwaadaardige events in servers die sessiestatus delen, met mogelijk schadelijke acties of toegang tot gevoelige data tot gevolg  
- **Directe imitatie**: Gestolen sessie-ID's maken directe MCP-serveraanroepen mogelijk zonder authenticatie, waarbij aanvallers worden behandeld als legitieme gebruikers  
- **Gecompromitteerde hervatbare streams**: Aanvallers kunnen aanvragen voortijdig beëindigen, waardoor legitieme clients met mogelijk kwaadaardige content hervatten  

#### **Beveiligingscontroles voor sessiebeheer**

**Kritieke vereisten:**  
- **Autorisatieverificatie**: MCP-servers moeten ALLE binnenkomende aanvragen verifiëren en MOGEN niet op sessies vertrouwen voor authenticatie  
- **Veilige sessiegeneratie**: Gebruik cryptografisch veilige, niet-deterministische sessie-ID's die worden gegenereerd met veilige random number generators  
- **Gebruikersspecifieke binding**: Koppel sessie-ID's aan gebruikersinformatie via formaten zoals `<user_id>:<session_id>` om sessiemisbruik tussen gebruikers te voorkomen  
- **Levenscyclusbeheer sessies**: Implementeer juiste expiratie, rotatie en invalidatie om kwetsbaarheidsvensters te beperken  
- **Transportbeveiliging**: Verplichte HTTPS voor alle communicatie om onderschepping van sessie-ID's te voorkomen  

### Confused Deputy-probleem

Het **confused deputy-probleem** doet zich voor wanneer MCP-servers fungeren als authenticatieproxy’s tussen cliënten en derden, wat mogelijkheden creëert voor autorisatieomzeiling via misbruik van statische client-ID’s.

#### **Aanvalmechanismen & risico’s**

- **Consent omzeiling via cookies**: Eerdere gebruikersauthenticatie creëert toestemmingcookies die aanvallers misbruiken via kwaadaardige autorisatieaanvragen met speciaal geconstrueerde redirect URI's  
- **Diefstal autorisatiecodes**: Bestaande consentcookies kunnen ervoor zorgen dat autorisatieservers toestemmingsschermen overslaan en codes naar door aanvallers beheerde eindpunten omleiden  
- **Ongeautoriseerde API-toegang**: Gestolen autorisatiecodes maken tokenuitwisseling en gebruikersimitatie mogelijk zonder expliciete goedkeuring  

#### **Mitigatiestrategieën**

**Verplichte controles:**  
- **Expliciete toestemmingsvereisten**: MCP-proxyservers die statische client-ID’s gebruiken, MOGEN alleen dynamisch geregistreerde cliënten bedienen na gebruikersconsent  
- **Implementatie van OAuth 2.1 beveiliging**: Volg actuele best practices ivm OAuth, inclusief PKCE (Proof Key for Code Exchange) bij alle autorisatieverzoeken  
- **Strikte clientvalidatie**: Implementeer rigoureuze validatie van redirect URI's en client-ID's om misbruik te voorkomen  

### Kwetsbaarheden bij token passthrough  

**Token passthrough** is een expliciete anti-patroon waarin MCP-servers clienttokens accepteren zonder correcte validatie en deze doorsturen naar downstream-API's, wat indruist tegen MCP-autorisatiespecificaties.

#### **Beveiligingsimplicaties**

- **Omzeiling van controles**: Direct client-naar-API tokengebruik ontwijkt cruciale limieten, validatie en monitoring  
- **Corruptie auditspoor**: Tokens van upstream maken cliëntidentificatie onmogelijk, waardoor incidentonderzoek wordt belemmerd  
- **Proxy-gebaseerde data-exfiltratie**: Ongevalideerde tokens stellen kwaadwillenden in staat servers als proxy voor ongeautoriseerde data-toegang te gebruiken  
- **Schendingen vertrouwen tussen domeinen**: Downstream-services vertrouwen op tokenherkomst, die nu niet geverifieerd kan worden  
- **Multi-service aanvalsexpansie**: Gecompromitteerde tokens geaccepteerd door meerdere services faciliteren laterale beweging  

#### **Vereiste beveiligingscontroles**

**Ononderhandelbare eisen:**  
- **Tokenvalidatie**: MCP-servers MOGEN geen tokens accepteren die niet expliciet aan de MCP-server zijn uitgegeven  
- **Audience-verificatie**: Controleer altijd of de token-audience claim overeenkomt met de identiteit van de MCP-server  
- **Juiste tokenlevenscyclus**: Implementeer kortdurende toegangstokens met veilige rotatiepraktijken  

## Supply Chain-beveiliging voor AI-systemen

Supply chain-beveiliging is geëvolueerd van traditionele software-afhankelijkheden naar het gehele AI-ecosysteem. Moderne MCP-implementaties moeten alle AI-gerelateerde componenten streng verifiëren en monitoren, aangezien elk daarvan potentiële kwetsbaarheden introduceert die de systeemintegriteit kunnen ondermijnen.

### Uitgebreide AI-supplychaincomponenten

**Traditionele software-afhankelijkheden:**  
- Open-source bibliotheken en frameworks  
- Container images en basissystemen  
- Ontwikkeltools en buildpipes  
- Infrastructuurcomponenten en -services  

**AI-specifieke supplychainelementen:**  
- **Foundation Models**: Voorgetrainde modellen van diverse leveranciers, die herkomstverificatie vereisen  
- **Embeddingdiensten**: Externe vectorisatie en semantische zoekservices  
- **Contextproviders**: Databronnen, kennisbanken en documentrepositories  
- **Derdediensten-API's**: Externe AI-services, ML-pijplijnen en dataverwerkingsendpoints  
- **Modelartefacten**: Gewichten, configuraties en fijn-afgestelde modelvarianten  
- **Trainingsdatabronnen**: Datasetten gebruikt voor modeltraining en fine-tuning  

### Uitgebreide supplychain-beveiligingsstrategie

#### **Componentverificatie & vertrouwen**  
- **Herkomstvalidatie**: Verifieer herkomst, licenties en integriteit van AI-componenten vóór integratie  
- **Beveiligingsbeoordeling**: Voer kwetsbaarheidsscans en beveiligingsreviews uit voor modellen, databronnen en AI-services  
- **Reputatieanalyse**: Evalueer beveiligingsgeschiedenis en praktijken van AI-serviceproviders  
- **Compliance-check**: Zorg dat alle componenten voldoen aan organisatorische beveiligings- en regelgevingsvereisten  

#### **Veilige implementatiepipelines**  
- **Geautomatiseerde CI/CD-beveiliging**: Integreer beveiligingsscans door geautomatiseerde deployment pipelines  
- **Artefactintegriteit**: Implementeer cryptografische verificatie van alle geïmplementeerde artefacten (code, modellen, configuraties)  
- **Gefaseerde deployment**: Gebruik progressieve deploymentstrategieën met beveiligingsvalidatie per fase  
- **Betrouwbare artefactreposities**: Implementeer alleen vanuit geverifieerde, veilige registries en repositories  

#### **Continue monitoring & respons**  
- **Afhankelijkheidsscans**: Voortdurende kwetsbaarheidsmonitoring van software- en AI-componentafhankelijkheden  
- **Modelmonitoring**: Doorlopende beoordeling van modelgedrag, prestatieafwijkingen en beveiligingsanomalieën  
- **Servicestatusbewaking**: Monitor externe AI-services op beschikbaarheid, beveiligingsincidenten en beleidswijzigingen  
- **Integratie van dreigingsinformatie**: Verwerk dreigingsfeeds specifiek voor AI- en ML-beveiligingsrisico’s  

#### **Toegangscontrole & minimaal noodzakelijke rechten**  
- **Componentniveau-permissies**: Beperk toegang tot modellen, data en services op basis van zakelijke noodzaak  
- **Beheer serviceaccounts**: Implementeer toegewijde serviceaccounts met minimale rechten  
- **Netwerksegmentatie**: Isoleer AI-componenten en beperk netwerktoegang tussen services  
- **API-gatewaycontroles**: Gebruik gecentraliseerde API-gateways om toegang tot externe AI-services te controleren en monitoren  

#### **Incidentrespons & herstel**  
- **Snelle reactieprocedures**: Vastgestelde processen voor patchen of vervangen van gecompromitteerde AI-componenten  
- **Rotatie van referenties**: Geautomatiseerde systemen voor het roteren van geheimen, API-sleutels en servicecredentials  
- **Rollback-mogelijkheden**: Mogelijkheid om snel terug te keren naar eerder bekende goede versies van AI-componenten  
- **Herstel na supplychaininbreuken**: Specifieke procedures voor reageren op compromittering van upstream AI-services  

### Microsoft beveiligingstools & integratie

**GitHub Advanced Security** biedt uitgebreide bescherming van de supply chain, inclusief:  
- **Secret Scanning**: Automatische detectie van referenties, API-sleutels en tokens in repositories  
- **Dependency Scanning**: Kwetsbaarheidsbeoordeling voor open-source afhankelijkheden en bibliotheken  
- **CodeQL-analyse**: Statistische code-analyse op beveiligingslekken en coderingsproblemen  
- **Supply Chain Insights**: Inzicht in gezondheidsstatus en beveiliging van afhankelijkheden  

**Integratie met Azure DevOps & Azure Repos:**  
- Naadloze beveiligingsscans geïntegreerd in Microsoft ontwikkelplatforms  
- Geautomatiseerde beveiligingschecks in Azure Pipelines voor AI-workloads  
- Beleidsafdwinging voor veilige deployment van AI-componenten  

**Microsoft interne praktijken:**  
Microsoft implementeert uitgebreide supply chain-beveiligingspraktijken over alle producten heen. Lees over bewezen benaderingen in [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Best practices voor fundamentele beveiliging

MCP-implementaties erven en bouwen voort op de bestaande beveiligingshouding van uw organisatie. Versterking van fundamentele beveiligingspraktijken verhoogt de algehele beveiliging van AI-systemen en MCP-deployments aanzienlijk.

### Kernfundamenten van beveiliging

#### **Veilige ontwikkelpraktijken**  
- **OWASP-compliance**: Bescherming tegen [OWASP Top 10](https://owasp.org/www-project-top-ten/) kwetsbaarheden in webapplicaties  
- **AI-specifieke bescherming**: Implementeer controles voor [OWASP Top 10 voor LLM’s](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Veilig geheimbeheer**: Gebruik dedicated kluizen voor tokens, API-sleutels en gevoelige configuratiegegevens  
- **End-to-end encryptie**: Implementeer veilige communicatie over alle applicatiecomponenten en datastromen  
- **Inputvalidatie**: Strenge validatie van alle gebruikersinvoer, API-parameters en databronnen  

#### **Infrastructuurverharding**  
- **Multi-factor authenticatie**: Verplichte MFA voor alle beheerders- en service-accounts  
- **Patchbeheer**: Geautomatiseerde, tijdige patching voor besturingssystemen, frameworks en afhankelijkheden  
- **Integratie met identiteitsproviders**: Gecentraliseerd identiteitsbeheer via enterprise-identiteitsproviders (Microsoft Entra ID, Active Directory)  
- **Netwerksegmentatie**: Logische isolatie van MCP-componenten om laterale beweging te beperken  
- **Principe van minste privileges**: Minimale noodzakelijke rechten voor alle systeemcomponenten en accounts  

#### **Beveiligingsmonitoring & detectie**  
- **Uitgebreide logging**: Gedetailleerde logging van AI-applicatieactiviteiten, inclusief MCP client-serverinteracties  
- **SIEM-integratie**: Gecentraliseerd security-information en event management voor detectie van anomalieën  
- **Gedragsanalyse**: AI-gestuurde monitoring voor het detecteren van ongebruikelijke patronen in systeem- en gebruikersgedrag  
- **Dreigingsinformatie**: Integratie van externe dreigingsfeeds en indicatoren van compromise (IoC’s)  
- **Incidentrespons**: Goed gedefinieerde procedures voor detectie, respons en herstel van beveiligingsincidenten  

#### **Zero Trust-architectuur**  
- **Nooit vertrouwen, altijd verifiëren**: Continue verificatie van gebruikers, apparaten en netwerkverbindingen  
- **Micro-segmentatie**: Fijne netwerkcontroles die individuele workloads en services isoleren  
- **Identiteitsgerichte beveiliging**: Beleid gebaseerd op geverifieerde identiteiten in plaats van netwerkplek  
- **Continue risicobeoordeling**: Dynamische evaluatie van beveiligingshouding op basis van huidige context en gedrag  
- **Voorwaardelijke toegang**: Toegangscontrole die aanpast op basis van risicofactoren, locatie en apparaatvertrouwen  

### Integratiepatronen voor ondernemingen

#### **Integratie in Microsoft beveiligingsecosysteem**  
- **Microsoft Defender for Cloud**: Uitgebreid cloud security posture management  
- **Azure Sentinel**: Cloud-native SIEM en SOAR-mogelijkheden voor bescherming van AI-workloads  
- **Microsoft Entra ID**: Enterprise-identiteits- en toegangsbeheer met voorwaardelijke toegangsbeleid  
- **Azure Key Vault**: Gecentraliseerd geheimbeheer met hardware security module (HSM) ondersteuning  
- **Microsoft Purview**: Data governance en compliance voor AI-databronnen en workflows  

#### **Compliance & governance**  
- **Regelgevingsnaleving**: Zorg dat MCP-implementaties voldoen aan branchespecifieke compliance (GDPR, HIPAA, SOC 2)  
- **Dataclassificatie**: Juiste categorisatie en verwerking van gevoelige data verwerkt door AI-systemen  
- **Auditsporen**: Uitgebreide logging voor regelgeving en forensisch onderzoek  
- **Privacycontroles**: Implementatie van privacy-by-design principes in AI-architectuur  
- **Wijzigingsbeheer**: Formele procedures voor beveiligingsreviews van AI-systeemaanpassingen  

Deze fundamentele praktijken vormen een robuuste beveiligingsbasis die de effectiviteit van MCP-specifieke beveiligingscontroles verhoogt en uitgebreide bescherming biedt voor AI-gedreven applicaties.
## Belangrijkste beveiligingspunten

- **Gelaagde beveiligingsaanpak**: Combineer fundamentele beveiligingspraktijken (veilig coderen, minimaal privileges, verificatie van de toeleveringsketen, continue monitoring) met AI-specifieke controles voor alomvattende bescherming

- **AI-specifiek dreigingslandschap**: MCP-systemen staan voor unieke risico’s zoals promptinvoer, toolvergiftiging, sessiekaping, confused deputy-problemen, token-passthrough-kwetsbaarheden en te veel rechten, die gespecialiseerde mitigaties vereisen

- **Uitmuntendheid in authenticatie & autorisatie**: Implementeer robuuste authenticatie met externe identiteitsproviders (Microsoft Entra ID), handhaaf juiste tokenvalidatie en accepteer nooit tokens die niet expliciet voor uw MCP-server zijn uitgegeven

- **Voorkomen van AI-aanvallen**: Zet Microsoft Prompt Shields en Azure Content Safety in om te verdedigen tegen indirecte promptinvoer- en toolvergiftigingsaanvallen, valideer toolmetadata en monitor op dynamische wijzigingen

- **Sessie- & transportbeveiliging**: Gebruik cryptografisch veilige, niet-deterministische sessie-ID’s die gebonden zijn aan gebruikersidentiteiten, implementeer correcte sessielevenscyclusbeheer en gebruik sessies nooit voor authenticatie

- **OAuth beveiligingsbest practices**: Voorkom confused deputy-aanvallen door expliciete gebruikersinstemming voor dynamisch geregistreerde clients, correcte OAuth 2.1-implementatie met PKCE en strikte validatie van redirect-URI’s

- **Tokenbeveiligingsprincipes**: Vermijd token-passthrough-anti-patronen, valideer token audience claims, implementeer kortdurende tokens met veilige rotatie en handhaaf duidelijke vertrouwensgrenzen

- **Alomvattende beveiliging van de toeleveringsketen**: Behandel alle componenten van het AI-ecosysteem (modellen, embeddings, contextaanbieders, externe API’s) met dezelfde beveiligingsstrengheid als traditionele softwareafhankelijkheden

- **Continue evolutie**: Blijf up-to-date met de snel evoluerende MCP-specificaties, draag bij aan beveiligingscommunitystandaarden en handhaaf adaptieve beveiligingshoudingen naarmate het protocol rijpt

- **Microsoft beveiligingsintegratie**: Maak gebruik van Microsoft’s uitgebreide beveiligingsecosysteem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) voor verbeterde bescherming van MCP-implementaties

## Uitgebreide middelen

### **Officiële MCP-beveiligingsdocumentatie**
- [MCP Specificatie (Huidig: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Beveiligings-best practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Autorisatiespecificatie](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP-beveiligingsbronnen**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Uitgebreide OWASP MCP Top 10 met Azure-implementatiehandleidingen
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiële OWASP MCP beveiligingsrisico’s
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Hands-on beveiligingstraining voor MCP op Azure

### **Beveiligingsstandaarden & best practices**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 voor Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI-beveiligingsonderzoek & analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Toolvergiftigingsaanvallen (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft beveiligingsoplossingen**
- [Microsoft Prompt Shields Documentatie](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Beveiliging](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementatiehandleidingen & tutorials**
- [Azure API Management als MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID authenticatie met MCP-servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Veilige tokenopslag en encryptie (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & beveiliging van de toeleveringsketen**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Aanvullende beveiligingsdocumentatie**

Voor uitgebreide beveiligingsrichtlijnen, raadpleeg deze gespecialiseerde documenten in deze sectie:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Complete beveiligingsbest practices voor MCP-implementaties
- **[Azure Content Safety Implementatie](./azure-content-safety-implementation.md)** - Praktische implementatievoorbeelden voor Azure Content Safety-integratie  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Laatste beveiligingscontroles en technieken voor MCP-implementaties
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Snelle referentiegids voor essentiële MCP-beveiligingspraktijken

### **Hands-on beveiligingstraining**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Uitgebreide hands-on workshop voor het beveiligen van MCP-servers in Azure met progressieve kampen van Base Camp tot aan de Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentiearchitectuur en implementatiehandleiding voor alle OWASP MCP Top 10 risico’s

---

## Wat nu?

Volgende: [Hoofdstuk 3: Aan de slag](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dit document is vertaald met behulp van de AI-vertalingsdienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u ervan bewust te zijn dat geautomatiseerde vertalingen fouten of onjuistheden kunnen bevatten. Het originele document in de oorspronkelijke taal geldt als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor enige misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->