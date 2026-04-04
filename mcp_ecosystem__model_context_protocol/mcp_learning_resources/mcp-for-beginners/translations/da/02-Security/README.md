# MCP Security: Omfattende Beskyttelse af AI-Systemer

[![MCP Security Best Practices](../../../translated_images/da/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik på billedet ovenfor for at se video af denne lektion)_

Sikkerhed er grundlæggende for AI-systemdesign, og derfor prioriterer vi det som vores anden sektion. Dette er i overensstemmelse med Microsofts **Secure by Design**-princip fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) bringer kraftfulde nye funktioner til AI-drevne applikationer, samtidig med at det introducerer unikke sikkerhedsudfordringer, som går ud over traditionelle softwarerisici. MCP-systemer står over for både etablerede sikkerhedsmæssige bekymringer (sikker kodning, mindst privilegium, forsyningskædesikkerhed) og nye AI-specifikke trusler, herunder promptinjektion, værktøjsforgiftning, session kapring, confused deputy-angreb, token passthrough-sårbarheder og dynamisk kapabilitetsmodifikation.

Denne lektion undersøger de mest kritiske sikkerhedsrisici i MCP-implementeringer — dækkende autentificering, autorisation, overdrevne tilladelser, indirekte promptinjektion, sessionssikkerhed, confused deputy-problemer, tokenhåndtering og forsyningskædesårbarheder. Du vil lære handlingsorienterede kontroller og bedste praksis til at afbøde disse risici samtidig med at du udnytter Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security til at styrke din MCP-implementering.

## Læringsmål

Når du er færdig med denne lektion, vil du kunne:

- **Identificere MCP-specifikke trusler**: Genkende unikke sikkerhedsrisici i MCP-systemer, herunder promptinjektion, værktøjsforgiftning, overdrevne tilladelser, session kapring, confused deputy-problemer, token passthrough-sårbarheder og forsyningskæderisici
- **Anvende sikkerhedskontroller**: Implementere effektive afbødninger, herunder robust autentificering, mindst privilegium-adgang, sikker tokenhåndtering, sessionssikkerhedskontroller og forsyningskædeverifikation
- **Udnytte Microsoft sikkerhedsløsninger**: Forstå og implementere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security til beskyttelse af MCP-arbejdsbelastninger
- **Validere værktøjssikkerhed**: Genkende vigtigheden af validering af værktøjsmetadata, overvågning af dynamiske ændringer og forsvar mod indirekte promptinjektionsangreb
- **Integrere bedste praksis**: Kombinere etablerede sikkerhedsprincipper (sikker kodning, serverhævning, zero trust) med MCP-specifikke kontroller til omfattende beskyttelse

# MCP Security Arkitektur & Kontroller

Moderne MCP-implementeringer kræver lagdelte sikkerhedstilgange, der adresserer både traditionel softwaresikkerhed og AI-specifikke trusler. Den hurtigt udviklende MCP-specifikation fortsætter med at modne sine sikkerhedskontroller, hvilket muliggør bedre integration med virksomheders sikkerhedsarkitekturer og etablerede bedste praksisser.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser, at **98% af rapporterede brud ville blive forhindret ved robust sikkerhedshygiejne**. Den mest effektive beskyttelsesstrategi kombinerer grundlæggende sikkerhedspraksis med MCP-specifikke kontroller — velafprøvede baseline-sikkerhedsforanstaltninger forbliver mest effektive til at reducere den samlede sikkerhedsrisiko.

## Nuværende Sikkerhedsmiljø

> **Note:** Denne information afspejler MCP-sikkerhedsstandarder pr. **5. februar 2026**, i overensstemmelse med **MCP-specifikation 2025-11-25**. MCP-protokollen udvikler sig stadig hurtigt, og fremtidige implementeringer kan introducere nye autentificeringsmønstre og forbedrede kontroller. Henvis altid til den aktuelle [MCP-specifikation](https://spec.modelcontextprotocol.io/), [MCP GitHub-repositorium](https://github.com/modelcontextprotocol) og [dokumentation om bedste sikkerhedspraksis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for de nyeste retningslinjer.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **praktisk sikkerhedstræning** anbefaler vi stærkt **MCP Security Summit Workshop** (Sherpa) — en omfattende guidet ekspedition til at sikre MCP-servere i Microsoft Azure.

### Workshop Oversigt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tilbyder praktisk, handlingsrettet sikkerhedstræning gennem en velafprøvet "sårbar → udnyttelse → fix → valider" metode. Du vil:

- **Lære ved at bryde ting**: Opleve sårbarheder på tæt hold ved at udnytte bevidst usikre servere
- **Brug Azure-native sikkerhedsløsninger**: Udnyt Azure Entra ID, Key Vault, API Management og AI Content Safety
- **Følg Defense-in-Depth**: Progression gennem lejre, der bygger omfattende sikkerhedslag
- **Anvend OWASP standarder**: Hver teknik svarer til [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produktionskode**: Gå derfra med fungerende, testede implementeringer

### Ekspeditionens Rute

| Lejr | Fokus | OWASP-risici dækket |
|------|-------|---------------------|
| **Base Camp** | MCP grundlæggende & autentificerings-sårbarheder | MCP01, MCP07 |
| **Lejr 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Lejr 2: Gateway** | API Management, Private Endpoints, styring | MCP02, MCP07, MCP09 |
| **Lejr 3: I/O Sikkerhed** | Promptinjektion, PII-beskyttelse, indholdssikkerhed | MCP03, MCP05, MCP06 |
| **Lejr 4: Overvågning** | Log Analytics, dashboards, trusselsdetektion | MCP08 |
| **Toppen** | Red Team / Blue Team integrationstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Sikkerhedsrisici

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhedsrisici for MCP-implementeringer:

| Risiko | Beskrivelse | Azure Afbødning |
|------|-------------|------------------|
| **MCP01** | Token Misadministration & Hemmelighedsafsløring | Azure Key Vault, Managed Identity |
| **MCP02** | Tilbøjelighed til privilegieoptrapning via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Værktøjsforgiftning | Validering af værktøj, integritetsverifikation |
| **MCP04** | Forsyningskædeangreb | GitHub Advanced Security, afhængighedsscanning |
| **MCP05** | Kommandoinduktion & eksekvering | Inputvalidering, sandkassemetoder |
| **MCP06** | Promptinjektion via kontekstuelle payloads | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Utilstrækkelig autentificering & autorisation | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Manglende audit & telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skjulte MCP servere | API Center styring, netværksisolation |
| **MCP10** | Kontextinjektion & overdeling | Dataklassifikation, minimal eksponering |

### Udvikling af MCP Autentificering

MCP-specifikationen har udviklet sig betydeligt i sin tilgang til autentificering og autorisation:

- **Oprindelig tilgang**: Tidlige specifikationer krævede, at udviklere implementerede egne autentificeringsservere, hvor MCP-servere fungerede som OAuth 2.0 Authorization Servers, der håndterede brugerautentificering direkte
- **Nuværende standard (2025-11-25)**: Opdateret specifikation tillader MCP-servere at delegere autentificering til eksterne identitetsudbydere (som Microsoft Entra ID), hvilket forbedrer sikkerhedsholdningen og reducerer implementeringskompleksitet
- **Transport Layer Security**: Forbedret support for sikre transportmekanismer med korrekte autentificeringsmønstre for både lokale (STDIO) og fjernforbindelser (Streamable HTTP)

## Autentificerings- & Autorisationssikkerhed

### Nuværende Sikkerhedsudfordringer

Moderne MCP-implementeringer står over for flere autentificerings- og autorisationsudfordringer:

### Risici & Trusselsvektorer

- **Fejlkodet Autorisationslogik**: Fejl i autorisationsimplementering i MCP-servere kan eksponere følsomme data og anvende adgangskontroller forkert
- **OAuth Token Kompromittering**: Lokal MCP-server token-tyveri muliggør forfalskning af servere og adgang til nedstrøms tjenester
- **Token Passthrough-sårbarheder**: Forkert håndtering af tokens skaber sikkerhedskontrolomgåelser og ansvarsgab
- **Overdrevne Tilladelser**: MCP-servere med for mange rettigheder overtræder princippet om mindst privilegium og øger angrebsoverfladen

#### Token Passthrough: Et Kritisk Anti-mønster

**Token passthrough er udtrykkeligt forbudt** i den nuværende MCP-autorisation specifikation på grund af alvorlige sikkerhedsmæssige konsekvenser:

##### Omgåelse af Sikkerhedskontroller
- MCP-servere og nedstrøms API’er implementerer kritiske sikkerhedskontroller (rate limiting, anmodningsvalidering, trafikovervågning), som afhænger af korrekt tokenvalidering
- Direkt klient-til-API tokenbrug omgår disse essentielle beskyttelser og underminerer sikkerhedsarkitekturen

##### Ansvarlighed & Revisionsudfordringer  
- MCP-servere kan ikke skelne mellem klienter, der bruger upstream-udstedte tokens, hvilket bryder audit trails
- Nedstrøms ressource servers logfiler viser fejlagtigt oprindelsen af anmodninger i stedet for faktiske MCP server-mellemled
- Incidentundersøgelser og overholdelsesaudit bliver betydeligt vanskeligere

##### Risiko for Dataudslip
- Uvaliderede tokenpåstande tillader ondsindede aktører med stjålne tokens at bruge MCP-servere som mellemled ved dataudslip
- Brud på tillidsgrænser tillader uautoriserede adgangsmønstre, der omgår tilsigtede sikkerhedskontroller

##### Angreb på tværs af tjenester
- Kompromitterede tokens accepteret af flere tjenester muliggør lateral bevægelse på tværs af forbundne systemer
- Tillidsantagelser mellem tjenester kan blive brudt, når tokenoprindelser ikke kan verificeres

### Sikkerhedskontroller & Afbødninger

**Kritiske Sikkerhedskrav:**

> **OBLIGATORISK**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke udtrykkeligt er udstedt til MCP-serveren

#### Autentificerings- & Autorisationskontroller

- **Grundig Autorisationsgennemgang**: Udfør omfattende audit af MCP-serveres autorisationslogik for at sikre, at kun tilsigtede brugere og klienter får adgang til følsomme ressourcer
  - **Implementeringsvejledning**: [Azure API Management som autentificeringsgateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegration**: [Brug af Microsoft Entra ID til MCP-serverautentificering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sikker Tokenhåndtering**: Implementer [Microsofts bedste praksis for tokenvalidering og livscyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider token’s audience claims, så de matcher MCP-serveridentitet
  - Implementer korrekt tokenrotation og udløbspolitikker
  - Forhindr token-replay-angreb og uautoriseret brug

- **Beskyttet Tokenlagring**: Sikr tokenlagring med kryptering både i hvile og under transmission
  - **Bedste praksis**: [Sikker tokenlagring og krypteringsvejledninger](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Adgangskontrolimplementering

- **Princippet om Mindst Privilegium**: Giv MCP-servere kun de minimale tilladelser, der kræves for tiltænkt funktionalitet
  - Regelmæssige tilladelsesgennemgange og opdateringer for at forhindre privilegieudvidelse
  - **Microsoft Dokumentation**: [Sikker mindst-privilegeret adgang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollebaseret Adgangskontrol (RBAC)**: Implementer detaljerede rolletildelinger
  - Afgræns roller stramt til specifikke ressourcer og handlinger
  - Undgå brede eller unødvendige tilladelser, der øger angrebsoverfladen

- **Kontinuerlig Overvågning af Tilladelser**: Implementer løbende adgangsaudit og overvågning
  - Overvåg tilladelsesbrugsmønstre for anomalier
  - Afhjælp straks overdrevne eller ubrugte privilegier

## AI-Specifikke Sikkerhedstrusler

### Promptinjektion & Værktøjsmanipulationsangreb

Moderne MCP-implementeringer står over for sofistikerede AI-specifikke angrebsvektorer, som traditionelle sikkerhedsforanstaltninger ikke fuldt ud kan imødegå:

#### **Indirekte Promptinjektion (Cross-Domain Prompt Injection)**

**Indirekte Promptinjektion** repræsenterer en af de mest kritiske sårbarheder i MCP-aktiverede AI-systemer. Angribere indlejrer ondsindede instruktioner i eksternt indhold — dokumenter, websider, e-mails eller datakilder — som AI-systemer efterfølgende behandler som legitime kommandoer.

**Angrebsscenarier:**
- **Dokumentbaseret Injektion**: Ondsindede instruktioner skjult i behandlede dokumenter, der udløser utilsigtede AI-handlinger
- **Webindholdseksploitation**: Kompromitterede websider med indlejrede prompts, der manipulerer AI-adfærd ved scraping
- **Email-baserede Angreb**: Ondsindede prompts i e-mails, som får AI-assistenter til at lække information eller udføre uautoriserede handlinger
- **Datakildekontaminering**: Kompromitterede databaser eller API’er, som leverer forurenet indhold til AI-systemer

**Reel Verden Impact**: Disse angreb kan resultere i dataudslip, privatlivskrænkelse, generering af skadeligt indhold og manipulation af brugerinteraktioner. For detaljeret analyse, se [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/da/prompt-injection.ed9fbfde297ca877.webp)

#### **Værktøjsforgiftning Angreb**

**Værktøjsforgiftning** angriber metadata, der definerer MCP-værktøjer og udnytter, hvordan LLM’er fortolker værktøjsbeskrivelser og parametre til at træffe eksekveringsbeslutninger.

**Angrebsmekanismer:**
- **Metadata Manipulation**: Angribere injicerer ondsindede instruktioner i værktøjsbeskrivelser, parameterdefinitioner eller brugs-eksempler
- **Usynlige Instruktioner**: Skjulte prompts i værktøjsmetadata, som behandles af AI-modeller, men er usynlige for menneskelige brugere
- **Dynamisk Værktøjsmodifikation ("Rug Pulls")**: Værktøjer, godkendt af brugere, bliver senere ændret til at udføre skadelige handlinger uden brugerens viden
- **Parameterinjektion**: Ondsindet indhold indlejret i værktøjsparameterskemaer, der påvirker modeladfærd

**Risici ved Hosted Servere**: Fjerntliggende MCP-servere udgør øget risiko, da værktøjsdefinitioner kan opdateres efter den indledende bruger-godkendelse, hvilket skaber scenarier, hvor tidligere sikre værktøjer kan blive ondsindede. For omfattende analyse, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/da/tool-injection.3b0b4a6b24de6bef.webp)

#### **Yderligere AI Angrebsvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerede angreb, der udnytter indhold fra flere domæner for at omgå sikkerhedskontroller
- **Dynamisk funktionsændring**: Ændringer i værktøjsfunktioner i realtid, som undgår initiële sikkerhedsvurderinger
- **Forgiftning af kontekstvindue**: Angreb, der manipulerer store kontekstvinduer for at skjule ondsindede instruktioner
- **Modelforvirringsangreb**: Udnyttelse af modellens begrænsninger til at skabe uforudsigelig eller usikker adfærd


### AI Sikkerhedsrisikoens Indvirkning

**Konsekvenser med høj indvirkning:**
- **Dataudtrækning**: Uautoriseret adgang til og tyveri af følsomme virksomheds- eller personlige data
- **Brud på privatlivets fred**: Eksponering af personligt identificerbare oplysninger (PII) og fortrolige forretningsdata  
- **Systemmanipulation**: Utilsigtede ændringer i kritiske systemer og arbejdsgange
- **Legitimationsoplysninger tyveri**: Kompromittering af autentificeringstokener og tjenestegodkendelser
- **Lateral bevægelse**: Brug af kompromitterede AI-systemer som springbræt for bredere netværksangreb

### Microsoft AI Sikkerhedsløsninger

#### **AI Prompt Shields: Avanceret beskyttelse mod injektionsangreb**

Microsoft **AI Prompt Shields** leverer omfattende forsvar mod både direkte og indirekte promptinjektionsangreb gennem flere sikkerhedslag:

##### **Kernebeskyttelsesmekanismer:**

1. **Avanceret detektion og filtrering**
   - Maskinlæringsalgoritmer og NLP-teknikker opdager ondsindede instruktioner i eksternt indhold
   - Realtidsanalyse af dokumenter, websider, e-mails og datakilder for indlejrede trusler
   - Kontekstuel forståelse af legitime versus ondsindede promptmønstre

2. **Spotlight-teknikker**  
   - Skelner mellem betroede systeminstruktioner og potentielt kompromitterede eksterne input
   - Teksttransformationsmetoder, der forbedrer modellens relevans samtidig med at ondsindet indhold isoleres
   - Hjælper AI-systemer med at opretholde korrekt instruktionshierarki og ignorere injicerede kommandoer

3. **Afgrænsere og datamarkeringssystemer**
   - Eksplicit grænsefastsættelse mellem betroede systembeskeder og eksternt inputtekst
   - Specielle markører fremhæver grænser mellem betroede og utro data kilder
   - Klar adskillelse forhindrer instruktionsforvirring og uautoriseret kommandoeksekvering

4. **Kontinuerlig trusselsintelligens**
   - Microsoft overvåger løbende nye angrebsmønstre og opdaterer forsvar
   - Proaktiv trusseljagt efter nye injektionsteknikker og angrebsvektorer
   - Regelmæssige opdateringer af sikkerhedsmodellen for at opretholde effektivitet mod udviklende trusler

5. **Azure Content Safety Integration**
   - En del af den omfattende Azure AI Content Safety-suite
   - Yderligere detektion af jailbreak-forsøg, skadeligt indhold og brud på sikkerhedspolitikker
   - Ensartede sikkerhedskontroller på tværs af AI-applikationskomponenter

**Implementeringsressourcer**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/da/prompt-shield.ff5b95be76e9c78c.webp)


## Avancerede MCP Sikkerhedstrusler

### Sårbarheder ved sessionkapring

**Sessionkapring** repræsenterer en kritisk angrebsvektor i stateful MCP-implementeringer, hvor uautoriserede parter erhverver og misbruger legitime sessions-id'er for at udgive sig for at være klienter og udføre uautoriserede handlinger.

#### **Angrebsscenarier & risici**

- **Sessionkapring med promptinjektion**: Angribere med stjålne sessions-id'er injicerer ondsindede hændelser i servere, der deler sessionsstatus, hvilket potentielt kan udløse skadelige handlinger eller adgang til følsomme data
- **Direkte udgivelse**: Stjålne sessions-id'er muliggør direkte MCP-serveropkald uden autentificering og behandler angribere som legitime brugere
- **Kompromitterede genoptagelsessessioner**: Angribere kan afbryde anmodninger for tidligt, hvilket får legitime klienter til at genoptage med potentielt ondsindet indhold

#### **Sikkerhedskontroller til sessionsstyring**

**Kritiske krav:**
- **Autoriseringsverifikation**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indgående anmodninger og **MÅ IKKE** stole på sessioner til autentificering
- **Sikker sessionsgenerering**: Brug kryptografisk sikre, ikke-deterministiske sessions-id'er genereret med sikre tilfældige talgeneratorer
- **Bruger-specifik binding**: Bind sessions-id'er til bruger-specifik information med formater som `<user_id>:<session_id>` for at forhindre sessionsmisbrug mellem brugere
- **Sessionslivscyklusstyring**: Implementer korrekt udløb, rotation og ugyldiggørelse for at begrænse sårbarhedsvinduer
- **Transport-sikkerhed**: Obligatorisk HTTPS til al kommunikation for at forhindre aflytning af sessions-id'er

### Confused Deputy-problemet

**Confused deputy-problemet** opstår, når MCP-servere fungerer som autentificeringsproxier mellem klienter og tredjepartstjenester, hvilket skaber muligheder for autorisationsomgåelse via udnyttelse af statiske klient-id'er.

#### **Angrebsmechanismer & risici**

- **Cookie-baseret samtykkeomgåelse**: Tidligere brugerautentificering skaber samtykkecookies, som angribere udnytter gennem ondsindede autorisationsanmodninger med manipulerede redirect-URI'er
- **Tyveri af autorisationskoder**: Eksisterende samtykkecookies kan få autorisationsservere til at undlade samtykkeskærme og omdirigere koder til angriber-kontrollerede endpoints  
- **Uautoriseret API-adgang**: Stjålne autorisationskoder muliggør token-udveksling og brugerudgivelse uden eksplicit godkendelse

#### **Afhjælpningsstrategier**

**Obligatoriske kontroller:**
- **Ekspligtige samtykkekrav**: MCP-proxyservere, der bruger statiske klient-id'er, **SKAL** opnå brugerens samtykke for hver dynamisk registrerede klient
- **OAuth 2.1 sikkerhedsimplementering**: Følg gældende OAuth sikkerheds bedste praksis, inklusive PKCE (Proof Key for Code Exchange) for alle autorisationsanmodninger
- **Streng klientvalidering**: Implementer grundig validering af redirect-URI'er og klient-id'er for at forhindre udnyttelse

### Token Passthrough-sårbarheder  

**Token passthrough** udgør et udtrykkeligt anti-mønster, hvor MCP-servere accepterer klienttokens uden ordentlig validering og videresender dem til downstream API'er, hvilket overtræder MCP-autorisationens specifikationer.

#### **Sikkerhedsmæssige konsekvenser**

- **Kontrolomgåelse**: Direkte klient-til-API tokenbrug omgår kritiske begrænsninger, valideringer og overvågningskontroller
- **Korruption af revisionsspor**: Tokens udstedt upstream forhindrer klientidentifikation og slår hændelsesundersøgelse i stykker
- **Proxy-baseret dataudtrækning**: Uvaliderede tokens giver ondsindede aktører mulighed for at bruge servere som proxyer til uautoriseret dataadgang
- **Brud på tillidsgrænser**: Downstream-tjenesters tillidsantagelser kan brydes, når token-oprindelse ikke kan verificeres
- **Udvidelse af angreb på tværs af tjenester**: Kompromitterede tokens accepteret på flere tjenester muliggør lateral bevægelse

#### **Krav til sikkerhedskontroller**

**Ikke-forhandlingsbare krav:**
- **Tokenvalidering**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke eksplicit er udstedt til MCP-serveren
- **Audience-verifikation**: Altid valider tokenaudience, så den matcher MCP-serverens identitet
- **Korrekt tokenlivscyklus**: Implementer kortlivede adgangstokens med sikre rotationsmetoder


## Supply Chain-sikkerhed for AI-systemer

Supply chain-sikkerhed har udviklet sig ud over traditionelle softwareafhængigheder til at omfatte hele AI-økosystemet. Moderne MCP-implementeringer skal omhyggeligt verificere og overvåge alle AI-relaterede komponenter, da hver enkelt kan introducere sårbarheder, der kompromitterer systemets integritet.

### Udvidede AI Supply Chain-komponenter

**Traditionelle softwareafhængigheder:**
- Open source biblioteker og frameworks
- Containerbilleder og basissystemer  
- Udviklingsværktøjer og build-pipelines
- Infrastrukturkomponenter og tjenester

**AI-specifikke supply chain-elementer:**
- **Foundation Models**: Fortrænede modeller fra forskellige leverandører, der kræver proveniensverifikation
- **Embedding Services**: Eksterne vektorisering og semantiske søgetjenester
- **Kontekstudbydere**: Datakilder, vidensbaser og dokumentrepositories  
- **Tredjeparts-API'er**: Eksterne AI-tjenester, ML-pipelines og dataprofileringsendepunkter
- **Modelartefakter**: Vægte, konfigurationer og finjusterede modelvarianter
- **Træningsdatasæt**: Datasæt brugt til modeltræning og finjustering

### Omfattende supply chain-sikkerhedsstrategi

#### **Komponentverifikation og tillid**
- **Proveniensvalidering**: Verificer oprindelse, licensering og integritet af alle AI-komponenter før integration
- **Sikkerhedsvurdering**: Udfør sårbarhedsscanninger og sikkerhedsrevisioner for modeller, datakilder og AI-tjenester
- **Omdømmeanalyse**: Evaluer sikkerhedspraksis og track record for AI-tjenesteudbydere
- **Overholdelsesverifikation**: Sørg for at alle komponenter opfylder organisationens sikkerheds- og lovgivningsmæssige krav

#### **Sikre deployments-pipelines**  
- **Automatiseret CI/CD-sikkerhed**: Integrér sikkerhedsscanning i hele automatiserede deployments-pipelines
- **Artefaktintegritet**: Implementer kryptografisk verifikation for alle deployerede artefakter (kode, modeller, konfigurationer)
- **Faset udrulning**: Benyt progressive udrulningsstrategier med sikkerhedsvalidering på hvert trin
- **Betroede artefakt-repositorier**: Deploy kun fra verificerede, sikre artefaktregistre og -repositories

#### **Kontinuerlig overvågning og respons**
- **Afhængighedsscanning**: Løbende overvågning af sårbarheder for alle software- og AI-komponentafhængigheder
- **Modelovervågning**: Kontinuerlig vurdering af modeladfærd, ydelsesdrift og sikkerhedsanomalier
- **Servicehelbredsovervågning**: Overvågning af eksterne AI-tjenester for tilgængelighed, sikkerhedshændelser og politiske ændringer
- **Trusselsintelligensintegration**: Inkorporering af trusselsfeeds specifikt for AI- og ML-sikkerhedsrisici

#### **Adgangskontrol og mindst privilegium**
- **Komponentniveau-tilladelser**: Begræns adgang til modeller, data og tjenester baseret på forretningsbehov
- **Servicekontoadministration**: Implementer dedikerede servicekonti med minimale nødvendige tilladelser
- **Netværkssegmentering**: Isoler AI-komponenter og begræns netværksadgang mellem tjenester
- **API-gateway-kontroller**: Brug centraliserede API-gateways til at styre og overvåge adgang til eksterne AI-tjenester

#### **Incident Response & Recovery**
- **Hurtige responsprocedurer**: Etablerede processer til patching eller udskiftning af kompromitterede AI-komponenter
- **Legitimationsrotation**: Automatiserede systemer til rotéring af hemmeligheder, API-nøgler og tjenestelegitimationsoplysninger
- **Rollback-muligheder**: Evne til hurtigt at vende tilbage til tidligere kendt gode versioner af AI-komponenter
- **Supply Chain-brudgendannelse**: Specifikke procedurer for reaktion på kompromitterede upstream AI-tjenester

### Microsoft Sikkerhedsværktøjer & integration

**GitHub Advanced Security** tilbyder omfattende supply chain-beskyttelse, herunder:
- **Hemmelighedsscanning**: Automatisk detektion af legitimationsoplysninger, API-nøgler og tokens i repositories
- **Afhængighedsscanning**: Sårbarhedsvurdering for open source-afhængigheder og biblioteker
- **CodeQL-analyse**: Statisk kodeanalyse for sikkerhedssårbarheder og kodningsfejl
- **Supply Chain Insights**: Indblik i afhængigheders sundhed og sikkerhedsstatus

**Azure DevOps & Azure Repos Integration:**
- Sømløs sikkerhedsscanningsintegration på tværs af Microsofts udviklingsplatforme
- Automatiske sikkerhedskontroller i Azure Pipelines for AI-arbejdsmængder
- Politikhåndhævelse for sikker udrulning af AI-komponenter

**Microsofts interne praksis:**
Microsoft implementerer omfattende supply chain-sikkerhedspraksis på tværs af alle produkter. Lær om velafprøvede tilgange i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Best Practices

MCP-implementeringer arver og bygger videre på organisationens eksisterende sikkerhedspostur. Styrkelse af grundlæggende sikkerhedspraksis forbedrer væsentligt den samlede sikkerhed for AI-systemer og MCP-implementeringer.

### Kernesikkerhedsprincipper

#### **Sikre udviklingspraksisser**
- **OWASP-overholdelse**: Beskyt mod [OWASP Top 10](https://owasp.org/www-project-top-ten/) sårbarheder i webapplikationer
- **AI-specifikke beskyttelser**: Implementér kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Sikker hemmelighedshåndtering**: Brug dedikerede vaults til tokens, API-nøgler og følsomme konfigurationsdata
- **End-to-end-kryptering**: Implementér sikre kommunikationskanaler på tværs af alle applikationskomponenter og dataflow
- **Inputvalidering**: Grundig validering af alle brugerinput, API-parametre og datakilder

#### **Infrastrukturhærde**
- **Multi-faktor-autentificering**: Obligatorisk MFA for alle administrative og servicekonti
- **Patchstyring**: Automatiseret og rettidig patchning af operativsystemer, frameworks og afhængigheder  
- **Identitetsudbyderintegration**: Centraliseret identitetsstyring gennem virksomhedsidentitetsudbydere (Microsoft Entra ID, Active Directory)
- **Netværkssegmentering**: Logisk isolation af MCP-komponenter for at begrænse lateral bevægelse
- **Minimumsprincippet**: Minimale nødvendige tilladelser for alle systemkomponenter og konti

#### **Sikkerhedsovervågning & detektion**
- **Omfattende logning**: Detaljeret logning af AI-applikationsaktiviteter, herunder MCP klient-server-interaktioner
- **SIEM-integration**: Centraliseret sikkerhedsinformation og hændelsesstyring til anomalidetektion
- **Adfærdsanalyse**: AI-drevet overvågning til at opdage usædvanlige mønstre i system- og brugeradfærd
- **Trusselsintelligens**: Integration af eksterne trusselsfeeds og kompromitteringsindikatorer (IOCs)
- **Incident Response**: Veldefinerede procedurer for detektion, respons og genopretning ved sikkerhedshændelser

#### **Zero Trust-arkitektur**
- **Stol aldrig, verificér altid**: Kontinuerlig verifikation af brugere, enheder og netværksforbindelser
- **Mikrosegmentering**: Granulær netværkskontrol, der isolerer individuelle arbejdsbelastninger og tjenester
- **Identitetscentreret sikkerhed**: Sikkerhedspolitikker baseret på verificerede identiteter fremfor netværksplacering
- **Kontinuerlig risikovurdering**: Dynamisk evaluering af sikkerhedsholdning baseret på aktuel kontekst og adfærd
- **Betinget adgang**: Adgangskontroller, der tilpasser sig ud fra risikofaktorer, placering og enhedstillid

### Enterprise Integrationsmønstre

#### **Microsoft sikkerhedsøkosystemintegration**
- **Microsoft Defender for Cloud**: Omfattende styring af cloud-sikkerhedsholdning
- **Azure Sentinel**: Cloud-native SIEM og SOAR funktioner til beskyttelse af AI-arbejdsmængder
- **Microsoft Entra ID**: Virksomhedsidentitet og adgangsstyring med betingede adgangspolitikker
- **Azure Key Vault**: Centraliseret hemmelighedshåndtering med hardware-sikkerhedsmodul (HSM) backing
- **Microsoft Purview**: Datastyring og overholdelse for AI-datakilder og arbejdsgange

#### **Overholdelse & governance**
- **Lovgivningsmæssig tilpasning**: Sikr at MCP-implementeringer opfylder branchespecifikke overholdelseskrav (GDPR, HIPAA, SOC 2)
- **Dataklassificering**: Korrekt kategorisering og håndtering af følsomme data behandlet af AI-systemer
- **Revisionsspor**: Omfattende logning til regulatorisk overholdelse og retsmedicinsk undersøgelse
- **Privatlivskontroller**: Implementering af privacy-by-design principper i AI-systemarkitektur
- **Ændringsstyring**: Formelle processer til sikkerhedsrevision af AI-systemændringer

Disse grundlæggende praksisser skaber et robust sikkerhedsbaseline, der øger effektiviteten af MCP-specifikke sikkerhedskontroller og giver omfattende beskyttelse for AI-drevne applikationer.
## Vigtige Sikkerhedspunkter

- **Lagdelt Sikkerhedstilgang**: Kombiner grundlæggende sikkerhedspraksis (sikker kodning, mindst privilegium, leverandørkædeverifikation, kontinuerlig overvågning) med AI-specifikke kontroller for omfattende beskyttelse

- **AI-Specifik Trusselslandskab**: MCP-systemer står over for unikke risici inklusive prompt injection, værktøjsforgiftning, session kapring, confused deputy-problemer, token passthrough-sårbarheder og overdrevne tilladelser, der kræver specialiserede modforanstaltninger

- **Fremragende Autentifikation og Autorisation**: Implementer robust autentifikation ved hjælp af eksterne identitetsudbydere (Microsoft Entra ID), håndhæv korrekt token-validering, og accepter aldrig tokens, der ikke eksplicit er udstedt til din MCP-server

- **Forebyggelse af AI-angreb**: Anvend Microsoft Prompt Shields og Azure Content Safety til at forsvare mod indirekte prompt injection og værktøjsforgiftning, samtidig med at værktøjsmetadata valideres og der overvåges for dynamiske ændringer

- **Session- og Transport Sikkerhed**: Brug kryptografisk sikre, ikke-deterministiske session-ID’er knyttet til brugeridentiteter, implementer korrekt session livscyklusstyring, og brug aldrig sessioner til autentifikation

- **OAuth Sikkerhedsbedste Praksis**: Forebyg confused deputy-angreb gennem eksplicit brugersamtykke for dynamisk registrerede klienter, korrekt OAuth 2.1-implementering med PKCE, og streng validering af redirect URI  

- **Token Sikkerhedsprincipper**: Undgå anti-mønstre ved token passthrough, valider token audience-påstande, implementer kortlivede tokens med sikker rotation, og vedligehold klare tillidsgrænser

- **Omfattende Leverandørkæde Sikkerhed**: Behandl alle AI-økosystemets komponenter (modeller, embeddings, kontekstudbydere, eksterne API'er) med samme sikkerhedsstrenghed som traditionelle softwareafhængigheder

- **Kontinuerlig Udvikling**: Hold dig opdateret med hurtigt udviklende MCP-specifikationer, bidrag til sikkerhedsfællesskabets standarder, og oprethold adaptive sikkerhedsstrategier efterhånden som protokollen modnes

- **Microsoft Sikkerhedsintegration**: Udnyt Microsofts omfattende sikkerhedsøkosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for forbedret beskyttelse af MCP-udrulninger

## Omfattende Ressourcer

### **Officiel MCP Sikkerhedsdokumentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Sikkerhedsressourcer**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure implementeringsvejledning
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officielle OWASP MCP sikkerhedsrisici
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning for MCP på Azure

### **Sikkerhedsstandarder & Bedste Praksis**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI Sikkerhedsforskning & Analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Sikkerhedsløsninger**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementeringsvejledninger & Tutorials**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Leverandørkæde Sikkerhed**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Yderligere Sikkerhedsdokumentation**

For omfattende sikkerhedsrådgivning, se disse specialiserede dokumenter i denne sektion:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Komplette bedste sikkerhedspraksis for MCP-implementeringer
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementations-eksempler for Azure Content Safety integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Seneste sikkerhedskontroller og teknikker til MCP-udrulninger
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Hurtig referenceguide til essentielle MCP sikkerhedspraksis

### **Hands-On Sikkerhedstræning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop til sikring af MCP-servere i Azure med progressive camps fra Base Camp til Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencearkitektur og implementeringsvejledning for alle OWASP MCP Top 10 risici

---

## Hvad Nu?

Næste: [Chapter 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, bedes du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det oprindelige dokument på originalsproget bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der måtte opstå ved brug af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->