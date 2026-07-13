# MCP Security: Omfattende beskyttelse af AI-systemer

[![MCP Security Bedste Praksis](../../../translated_images/da/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik på billedet ovenfor for at se videoen til denne lektion)_

Sikkerhed er grundlæggende for design af AI-systemer, og derfor prioriterer vi det som vores andet afsnit. Dette stemmer overens med Microsofts **Secure by Design** princip fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) bringer kraftfulde nye muligheder til AI-drevne applikationer samtidig med, at det introducerer unikke sikkerhedsudfordringer, der går ud over traditionelle software-risici. MCP-systemer står over for både etablerede sikkerhedsproblemer (sikker kodning, mindst privilegium, forsyningskædesikkerhed) og nye AI-specifikke trusler, herunder prompt-injektion, tool-fordræbning, sessionkapring, confused deputy-angreb, token-passthrough-sårbarheder og dynamisk kapabilitetsmodifikation.

Denne lektion udforsker de mest kritiske sikkerhedsrisici i MCP-implementeringer—omfattende autentifikation, autorisation, overdrevne tilladelser, indirekte prompt-injektion, sessionssikkerhed, confused deputy-problemer, token-håndtering og forsyningskædesårbarheder. Du vil lære handlingsorienterede kontroller og bedste praksis for at mindske disse risici samtidig med at du drager fordel af Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security til at styrke din MCP-implementering.

## Læringsmål

Når du har gennemført denne lektion, vil du kunne:

- **Identificere MCP-specifikke trusler**: Genkende unikke sikkerhedsrisici i MCP-systemer, herunder prompt-injektion, tool-fordræbning, overdrevne tilladelser, sessionkapring, confused deputy-problemer, token-passthrough-sårbarheder og forsyningskæderisici
- **Anvende sikkerhedskontroller**: Implementere effektive afbødninger, herunder robust autentifikation, mindst privilegium-adgang, sikker token-håndtering, sessionssikkerhedskontroller og verifikation af forsyningskæden
- **Udnytte Microsofts sikkerhedsløsninger**: Forstå og implementere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security til beskyttelse af MCP-arbejdsbelastninger
- **Validere toolsikkerhed**: Anerkende vigtigheden af validering af tool-metadata, overvågning for dynamiske ændringer og forsvar mod indirekte prompt-injektion-angreb
- **Integrere bedste praksis**: Kombinere etablerede sikkerhedsfundamenter (sikker kodning, serverhærde, zero trust) med MCP-specifikke kontroller for omfattende beskyttelse

# MCP Security Arkitektur & Kontroller

Moderne MCP-implementeringer kræver lagdelte sikkerhedsmetoder, som adresserer både traditionel softwaresikkerhed og AI-specifikke trusler. Den hastigt udviklende MCP-specifikation fortsætter med at modne sine sikkerhedskontroller, hvilket muliggør bedre integration med virksomheds sikkerhedsarkitekturer og etablerede bedste praksisser.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser, at **98 % af rapporterede brud kunne forhindres ved robust sikkerhedshygiejne**. Den mest effektive beskyttelsesstrategi kombinerer grundlæggende sikkerhedspraksis med MCP-specifikke kontroller—dokumenterede baseline sikkerhedsforanstaltninger forbliver mest betydningsfulde i at reducere den samlede sikkerhedsrisiko.

## Nuværende sikkerhedslandskab

> **Note:** Disse oplysninger afspejler MCP-sikkerhedsstandarder pr. **5. februar 2026**, justeret til **MCP Specification 2025-11-25**. MCP-protokollen udvikler sig fortsat hastigt, og fremtidige implementeringer kan introducere nye autentifikationsmønstre og forbedrede kontroller. Henvis altid til den aktuelle [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) og [sikkerhed bedste praksis dokumentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for de seneste vejledninger.

> **Fremadskuende:** `2026-07-28` releasekandidaten styrker autorisation yderligere — klienter skal validere `iss`-parameteren i autorisationssvar (RFC 9207), angive en OpenID Connect `application_type` ved Dynamic Client Registration, og binde registrerede legitimationsoplysninger til den udstedende autorisationsserver. Se [Hvad ændres i MCP: 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for fuld liste over autorisations-SEP'er.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **praktisk sikkerhedstræning** anbefaler vi stærkt **MCP Security Summit Workshop** (Sherpa) – en omfattende guidet ekspedition til sikring af MCP-servere i Microsoft Azure.

### Workshop Oversigt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) giver praktisk, handlingsorienteret sikkerhedstræning gennem en velafprøvet "sårbar → exploit → fix → validate" metode. Du vil:

- **Lære ved at bryde ting**: Opleve sårbarheder førstehånds ved at udnytte bevidst usikre servere
- **Bruge Azure-indbygget sikkerhed**: Udnytte Azure Entra ID, Key Vault, API Management og AI Content Safety
- **Følge Forsvar-i-Dybden**: Gennemgå lejre med opbygning af omfattende sikkerhedslag
- **Anvende OWASP-standarder**: Hver teknik kortlægges til [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produktionsklar kode**: Få fungerende, testede implementeringer med dig

### Ekspeditionsruten

| Lejr | Fokus | OWASP risici dækket |
|------|-------|---------------------|
| **Base Camp** | MCP fundamenter & autentifikationssårbarheder | MCP01, MCP07 |
| **Lejr 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Lejr 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Lejr 3: I/O Sikkerhed** | Prompt injection, PII-beskyttelse, indholdssikkerhed | MCP03, MCP05, MCP06, MCP10 |
| **Lejr 4: Overvågning** | Log Analytics, dashboards, trusseldetektion | MCP04, MCP08 |
| **Summitten** | Red Team / Blue Team integrationstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Sikkerhedsrisici

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhedsrisici for MCP-implementeringer:

| Risiko | Beskrivelse | Azure Afhjælpning |
|------|-------------|------------------|
| **MCP01** | Token håndtering & hemmeligheds eksponering | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegiefordøjelse via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool-fordræbning | Tool validering, integritetsverifikation |
| **MCP04** | Software forsyningskædeangreb & afhængighedsmanipulation | GitHub Advanced Security, afhængighedsscanning |
| **MCP05** | Kommandoinjektion & eksekvering | Inputvalidering, sandkassemiljø |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Utilstrækkelig autentifikation & autorisation | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Manglende revision og telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skygge MCP-servere | API Center governance, netværksisolation |
| **MCP10** | Kontekst-injektion & overdeling | Dataklassifikation, minimal eksponering |

### Udvikling af MCP Autentifikation

MCP-specifikationen har udviklet sig betydeligt i sin tilgang til autentifikation og autorisation:

- **Oprindelig tilgang**: Tidlige specifikationer krævede, at udviklere implementerede egne autentifikationsservere, hvor MCP-servere fungerede som OAuth 2.0 autorisationsservere, der håndterede brugerautentifikation direkte
- **Nuværende standard (2025-11-25)**: Opdateret specifikation tillader, at MCP-servere videredelegerer autentifikation til eksterne identitetsudbydere (såsom Microsoft Entra ID), hvilket forbedrer sikkerhedsniveau og reducerer implementeringskompleksitet
- **Transport Layer Security**: Forbedret understøttelse af sikre transportmekanismer med korrekte autentifikationsmønstre for både lokale (STDIO) og fjernforbindelser (Streamable HTTP)

## Autentifikation & Autorisationssikkerhed

### Nuværende sikkerhedsudfordringer

Moderne MCP-implementeringer står over for flere autentifikations- og autorisationsudfordringer:

### Risici & trusselsvektorer

- **Fejlkonfigureret autorisationslogik**: Mangelfuld autorisationsimplementering i MCP-servere kan eksponere følsomme data og anvende adgangskontroller forkert
- **OAuth-token kompromittering**: Lokalt MCP-server-token-tyveri gør angribere i stand til at udgive sig for at være servere og få adgang til nedstrøms tjenester
- **Token-passthrough sårbarheder**: Forkert token-håndtering skaber sikkerhedskontrolomgåelser og ansvarsgab
- **Overdrevne tilladelser**: Overprivilegerede MCP-servere bryder mindst privilegium-principper og udvider angrebsoverfladen

#### Token Passthrough: Et kritisk anti-mønster

**Token passthrough er udtrykkeligt forbudt** i den nuværende MCP-autorisation-specifikation på grund af alvorlige sikkerhedsmæssige konsekvenser:

##### Omgåelse af sikkerhedskontroller
- MCP-servere og nedstrøms API’er implementerer kritiske sikkerhedskontroller (rate limiting, request validation, trafikmonitorering) som afhænger af korrekt token-validering
- Direkte klient-til-API token-brug omgår disse essentielle beskyttelser, og underminerer sikkerhedsarkitekturen

##### Ansvars- & revisionsudfordringer  
- MCP-servere kan ikke skelne mellem klienter, der bruger til token udstedt upstream, hvilket bryder revisionsspor
- Nedstrøms ressourcelogs viser vildledende oprindelse frem for faktiske MCP-server-mellemled
- Incident-undersøgelse og compliance revision bliver betydeligt sværere

##### Risiko for dataeksfiltrering
- Uvaliderede tokenpåstande gør det muligt for ondsindede aktører med stjålne tokens at bruge MCP-servere som proxy til dataeksfiltrering
- Tillidsbrud tillader uautoriserede adgangsmønstre, som omgår tilsigtede sikkerhedskontroller

##### Multiservice angrebsvektorer
- Kompromitterede tokens accepteres af flere tjenester og muliggør lateral bevægelse på tværs af tilknyttede systemer
- Tillidsantagelser mellem tjenester kan brydes, når token-oprindelser ikke kan verificeres

### Sikkerhedskontroller & afbødninger

**Kritiske sikkerhedskrav:**

> **OBLIGATORISK**: MCP-servere **MÅ IKKE** acceptere tokens, som ikke eksplicit er udstedt til MCP-serveren selv

#### Autentifikations- & Autorisationskontroller

- **Grundig autorisationsgennemgang**: Udfør omfattende revisioner af MCP-serverens autorisationslogik for at sikre, at kun tilsigtede brugere og klienter kan få adgang til følsomme ressourcer
  - **Implementeringsvejledning**: [Azure API Management som autentifikationsgateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegration**: [Brug af Microsoft Entra ID til MCP-server-autentifikation](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sikker tokenhåndtering**: Implementér [Microsofts token-validering og livscyklus bedste praksis](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider token audience claims mod MCP-serverens identitet
  - Implementér korrekt token-rotation og udløbspolitikker
  - Forhindre token replay-angreb og uautoriseret brug

- **Beskyttet tokenopbevaring**: Sikr tokenopbevaring med kryptering både i hvile og under transport
  - **Bedste praksis**: [Guidelines for sikker tokenopbevaring og kryptering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementering af adgangskontrol

- **Princippet om mindst privilegium**: Giv MCP-servere kun minimale tilladelser, som er nødvendige for tilsigtet funktionalitet
  - Regelmæssige tilladelsesgennemgange og opdateringer for at forhindre privilege creep
  - **Microsoft dokumentation**: [Sikker mindst-privilegeret adgang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Roller baseret adgangskontrol (RBAC)**: Implementér finmaskede rolle-tildelinger
  - Begræns roller til specifikke ressourcer og handlinger
  - Undgå brede eller unødvendige tilladelser, som udvider angrebsoverfladen

- **Løbende tilladelsesovervågning**: Implementer kontinuerlig adgangsrevision og overvågning
  - Overvåg tilladelsesbrugsmønstre for anomalier
  - Afgørende håndtering af overdrevne eller ubrugte privilegier

## AI-specifikke sikkerhedstrusler

### Prompt Injection & Tool-manipulationsangreb

Moderne MCP-implementeringer står over for sofistikerede AI-specifikke angrebsvektorer, som traditionelle sikkerhedsforanstaltninger ikke fuldt ud kan håndtere:

#### **Indirekte Prompt Injection (Cross-Domain Prompt Injection)**

**Indirekte Prompt Injection** er en af de mest kritiske sårbarheder i MCP-aktiverede AI-systemer. Angribere indlejrer ondsindede instruktioner i eksternt indhold—dokumenter, websider, e-mails eller datakilder—som AI-systemer efterfølgende behandler som legitime kommandoer.

**Angrebsscenarier:**
- **Dokument-baseret injektion**: Ondsindede instruktioner skjult i behandlede dokumenter, som udløser utilsigtede AI-handlinger
- **Webindhold-udnyttelse**: Kompromitterede websider med indlejrede prompts, der manipulerer AI-adfærd ved scraping
- **E-mail-baserede angreb**: Ondsindede prompts i e-mails, som får AI-assistenter til at lække information eller udføre uautoriserede handlinger
- **Datakilde-kontaminering**: Kompromitterede databaser eller API’er, som leverer forurenet indhold til AI-systemer

**Reel verden påvirkning**: Disse angreb kan resultere i dataeksfiltrering, privatlivsbrud, generering af skadeligt indhold og manipulation af brugerinteraktioner. For detaljeret analyse, se [Prompt Injection i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/da/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning-angreb**

**Tool Poisoning** angriber metadataene, som definerer MCP-tools, og udnytter, hvordan LLM’ere fortolker tool-beskrivelser og parametre for at træffe udførelsesbeslutninger.

**Angrebsmekanismer:**
- **Metadata-manipulation**: Angribere injicerer ondsindede instruktioner i tool-beskrivelser, parameterdefinitioner eller brugseksempler
- **Usynlige instruktioner**: Skjulte prompts i tool-metadata, som AI-modeller behandler, men som er usynlige for menneskelige brugere
- **Dynamiske tool-ændringer ("Rug Pulls")**: Tools, som brugere har godkendt, ændres senere til at udføre ondsindede handlinger uden brugerens viden
- **Parameter-injektion**: Ondsindet indhold indlejret i tool-parametreskemaer, som påvirker modeladfærd
**Risici ved Hosted Servere**: Fjern-MCP-servere udgør forhøjede risici, da tool-definitioner kan opdateres efter brugerens oprindelige godkendelse, hvilket skaber scenarier, hvor tidligere sikre værktøjer bliver skadelige. For en omfattende analyse, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/da/tool-injection.3b0b4a6b24de6bef.webp)

#### **Yderligere AI-angrebsmål**

- **Cross-Domain Prompt Injection (XPIA)**: Avancerede angreb, der udnytter indhold fra flere domæner til at omgå sikkerhedskontroller  
- **Dynamisk kapacitetsmodifikation**: Ændringer i realtid af værktøjsfunktioner, som undslipper den indledende sikkerhedsvurdering  
- **Context Window Forgiftning**: Angreb, der manipulerer store kontekstvinduer for at skjule ondsindede instruktioner  
- **Model-forvirringsangreb**: Udnyttelse af modellens begrænsninger til at skabe uforudsigelige eller usikre adfærdsmønstre  


### AI-sikkerhedsrisikos indvirkning

**Konsekvenser med høj påvirkning:**  
- **Dataeksfiltrering**: Uautoriseret adgang og tyveri af følsomme virksomheds- eller personoplysninger  
- **Brud på privatlivets fred**: Eksponering af personligt identificerbare oplysninger (PII) og fortrolige forretningsdata  
- **Systemmanipulation**: Utilsigtede ændringer i kritiske systemer og arbejdsgange  
- **Credential-tyveri**: Kompromittering af autentificeringstokens og tjenestebehørigheder  
- **Lateral bevægelse**: Brug af kompromitterede AI-systemer som springbræt til bredere netværksangreb  

### Microsoft AI-sikkerhedsløsninger

#### **AI Prompt Shields: Avanceret beskyttelse mod injectionsangreb**

Microsoft **AI Prompt Shields** tilbyder omfattende forsvar mod både direkte og indirekte prompt injectionsangreb gennem flere sikkerhedslag:

##### **Kernebeskyttelsesmekanismer:**

1. **Avanceret detektion og filtrering**  
   - Maskinlæringsalgoritmer og NLP-teknikker opdager ondsindede instruktioner i eksternt indhold  
   - Realtidsanalyse af dokumenter, websider, e-mails og datakilder for skjulte trusler  
   - Kontekstuel forståelse af legitime kontra ondsindede prompt-mønstre  

2. **Spotlight-teknikker**  
   - Skelner mellem betroede systeminstruktioner og potentielt kompromitteret eksternt input  
   - Teksttransformationsteknikker, der forbedrer modelrelevans samtidig med at ondsindet indhold isoleres  
   - Hjælper AI-systemer med at opretholde korrekt instruktionshierarki og ignorere injicerede kommandoer  

3. **Afgrænsnings- og datamarkeringssystemer**  
   - Eksplicit definition af grænseflader mellem betroede systembeskeder og eksternt input-tekst  
   - Særlige markører fremhæver grænser mellem betroede og utroværdige datakilder  
   - Klar adskillelse forhindrer instruktionsforvirring og uautoriseret kommandoeksekvering  

4. **Kontinuerlig trusselsintelligens**  
   - Microsoft overvåger løbende nye angrebsmodeller og opdaterer forsvarsløsninger  
   - Proaktiv trusselsjagt efter nye injectionsteknikker og angrebsvektorer  
   - Regelmæssige sikkerhedsmodelopdateringer for at bevare effektivitet mod udviklende trusler  

5. **Azure Content Safety-integration**  
   - En del af den omfattende Azure AI Content Safety-suite  
   - Yderligere detektion af jailbreak-forsøg, skadeligt indhold og overtrædelse af sikkerhedspolitikker  
   - Ensrettede sikkerhedskontroller på tværs af AI-applikationskomponenter  

**Implementeringsressourcer**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/da/prompt-shield.ff5b95be76e9c78c.webp)


## Avancerede MCP-sikkerhedstrusler

### Sårbarheder ved session hijacking

**Session hijacking** udgør en kritisk angrebsvektor i stateful MCP-implementeringer, hvor uvedkommende får fat i og misbruger legitime sessions-id’er for at udgi sig for klienter og udføre uautoriserede handlinger.

#### **Angrebsscenarier og risici**

- **Session hijack prompt injection**: Angribere med stjålne sessions-id’er injicerer ondsindede events i servere, der deler sessionstilstand, hvilket potentielt udløser skadelige handlinger eller giver adgang til følsomme data  
- **Direkte udgivelse**: Stjålne sessions-id’er muliggør direkte MCP-serverkald, som omgår autentificering og behandler angribere som legitime brugere  
- **Kompromitterede genoptagelige streams**: Angribere kan afslutte forespørgsler for tidligt, hvilket får legitime klienter til at genoptage med potentielt ondsindet indhold  

#### **Sikkerhedskontroller for sessionsstyring**

**Kritiske krav:**  
- **Autorisationstjek**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indkommende anmodninger og **MÅ IKKE** stole på sessioner til autentificering  
- **Sikker sessionsgenerering**: Brug kryptografisk sikre, ikke-deterministiske sessions-id’er genereret med sikre tilfældighedsgeneratorer  
- **Brugerspecifik binding**: Bind sessions-id’er til brugerspecifik information med formater som `<user_id>:<session_id>` for at forhindre sessionmisbrug på tværs af brugere  
- **Sessionslivscyklusstyring**: Implementer korrekt udløb, rotation og ugyldiggørelse for at begrænse sårbarhedsvinduer  
- **Transport-sikkerhed**: Obligatorisk HTTPS for al kommunikation for at forhindre aflytning af sessions-id’er  

### Problemet med den forvirrede stedfortræder

**Problemet med den forvirrede stedfortræder** opstår, når MCP-servere fungerer som autentificeringsproxyer mellem klienter og tredjepartstjenester, hvilket giver mulighed for autorisationsomgåelse via udnyttelse af statiske klient-id’er.

#### **Angrebsmetode og risici**

- **Cookie-baseret samtykkeomgåelse**: Tidligere brugergodkendelse skaber samtykkecookies, som angribere udnytter via ondsindede autorisationsanmodninger med manipulerede redirect-URI’er  
- **Tyveri af autorisationskode**: Eksisterende samtykkecookies kan få autorisationsservere til at springe samtykkeskærme over og omdirigere koder til angriber-kontrollerede endpoints  
- **Uautoriseret API-adgang**: Stjålne autorisationskoder muliggør token-udveksling og brugerudgivelse uden eksplicit godkendelse  

#### **Afhjælpningsstrategier**

**Nødvendige kontroller:**  
- **Udtrykkelige samtykkekrav**: MCP-proxyservere, der bruger statiske klient-id’er, **SKAL** indhente brugersamtykke for hver dynamisk registreret klient  
- **OAuth 2.1-sikkerhedsimplementering**: Følg gældende OAuth-sikkerhedspraksis inklusive PKCE (Proof Key for Code Exchange) for alle autorisationsanmodninger  
- **Streng klientvalidering**: Implementer streng validering af redirect-URI’er og klientidentifikatorer for at forhindre udnyttelse  

### Token Passthrough-sårbarheder  

**Token passthrough** repræsenterer et udtalt anti-mønster, hvor MCP-servere accepterer klienttokens uden korrekt validering og videresender disse til downstream-API’er, hvilket overtræder MCP’s autorisationsspecifikationer.

#### **Sikkerhedsmæssige konsekvenser**

- **Omgåelse af kontrol**: Direkte klient-til-API-tokenbrug omgår kritiske ratebegrænsninger, validering og overvågningskontroller  
- **Revisionstracekorruption**: Tokens udstedt upstream gør det umuligt at identificere klienten, hvilket bryder undersøgelsesmuligheder ved hændelser  
- **Proxybaseret dataeksfiltrering**: Uvaliderede tokens gør det muligt for ondsindede aktører at bruge servere som proxy for uautoriseret dataadgang  
- **Overtrædelse af tillidsgrænser**: Downstream-tjenesters tillid brydes, hvis tokenoprindelse ikke kan verificeres  
- **Udvidet angreb på tværs af tjenester**: Kompromitterede tokens accepteret på flere tjenester muliggør lateral bevægelse  

#### **Påkrævede sikkerhedskontroller**

**Ikke-forhandlingsbare krav:**  
- **Tokenvalidering**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke er eksplicit udstedt til MCP-serveren  
- **Audience-verifikation**: Altid validér, at tokenets audience-påstande matcher MCP-serverens identitet  
- **Korrekt tokenlivscyklus**: Implementer kortlivede adgangstokens med sikre rotationspraksisser  


## Supply Chain-sikkerhed for AI-systemer

Supply chain-sikkerhed er udviklet fra traditionelle softwareafhængigheder til at omfatte hele AI-økosystemet. Moderne MCP-implementeringer skal nøje verificere og overvåge alle AI-relaterede komponenter, da hver enkelt kan introducere potentielle sårbarheder, der kan kompromittere systemintegritet.

### Udvidede AI Supply Chain-komponenter

**Traditionelle softwareafhængigheder:**  
- Open source-biblioteker og frameworks  
- Containerbilleder og basissystemer  
- Udviklingsværktøjer og byggepipelines  
- Infrastrukturkomponenter og tjenester  

**AI-specifikke supply chain-elementer:**  
- **Foundation Models**: Fortrænede modeller fra forskellige udbydere, som kræver proveniensverifikation  
- **Embedding Services**: Eksterne vektoriseringer og semantiske søgetjenester  
- **Context Providers**: Datakilder, vidensbaser og dokumentarkiver  
- **Tredjeparts-API’er**: Eksterne AI-tjenester, ML-pipelines og dataprocesseringsendpoints  
- **Modelartefakter**: Vægte, konfigurationer og fintunede modelvarianter  
- **Træningsdatasæt**: Datasæt anvendt til modelltræning og finjustering  

### Omfattende supply chain-sikkerhedsstrategi

#### **Komponentverifikation og tillid**  
- **Proveniensvalidering**: Verificer oprindelse, licens og integritet af alle AI-komponenter før integration  
- **Sikkerhedsvurdering**: Gennemfør sårbarhedsscanninger og sikkerhedsgennemgange for modeller, datakilder og AI-tjenester  
- **Ry-analyse**: Evaluer sikkerhedshistorik og praksis hos AI-tjenesteudbydere  
- **Overholdelsesverifikation**: Sikr at alle komponenter opfylder organisatoriske sikkerheds- og regulatoriske krav  

#### **Sikre deployeringspipelines**  
- **Automatiseret CI/CD-sikkerhed**: Integrer sikkerhedsscanning gennem automatiserede deployeringspipelines  
- **Artefaktintegritet**: Implementer kryptografisk verifikation af alle deployerede artefakter (kode, modeller, konfigurationer)  
- **Trinvise deployeringer**: Anvend en progressiv deployeringsstrategi med sikkerhedsvalidering på hvert trin  
- **Betroede artefaktarkiver**: Deployér kun fra verificerede, sikre artefaktregistre og -arkiver  

#### **Kontinuerlig overvågning og respons**  
- **Afhængighedsscanning**: Løbende overvågning af sårbarheder i alle software- og AI-komponentafhængigheder  
- **Modelovervågning**: Kontinuerlig vurdering af modeladfærd, performance-drift og sikkerhedsanomalier  
- **Servicehealth-overvågning**: Overvåg eksterne AI-tjenester for tilgængelighed, sikkerhedshændelser og politikændringer  
- **Trusselsintelligensintegration**: Indbyg trusselldata specifikt for AI og ML-sikkerhedsrisici  

#### **Adgangskontrol og mindst privilegium**  
- **Komponentbaserede tilladelser**: Begræns adgang til modeller, data og tjenester baseret på forretningsbehov  
- **Servicekontoadministration**: Implementer dedikerede servicekonti med minimale nødvendige tilladelser  
- **Netværkssegmentering**: Isolér AI-komponenter og begræns netværksadgang mellem tjenester  
- **API Gateway-kontroller**: Brug centraliserede API-gateways til at kontrollere og overvåge adgang til eksterne AI-tjenester  

#### **Hændelsesrespons og genopretning**  
- **Hurtige responsprocedurer**: Etablerede processer til patching eller udskiftning af kompromitterede AI-komponenter  
- **Credential-rotation**: Automatiserede systemer til rotation af hemmeligheder, API-nøgler og tjenestebehørigheder  
- **Rollback-muligheder**: Mulighed for hurtig tilbagevenden til tidligere kendte gode versioner af AI-komponenter  
- **Supply chain-brudsgendannelse**: Specifikke procedurer for responser på kompromitterede upstream AI-tjenester  

### Microsoft sikkerhedsværktøjer og integration

**GitHub Advanced Security** tilbyder omfattende supply chain-beskyttelse inklusiv:  
- **Secret Scanning**: Automatiseret detektion af legitimationsoplysninger, API-nøgler og tokens i repositories  
- **Dependency Scanning**: Sårbarhedsvurdering af open source-afhængigheder og biblioteker  
- **CodeQL-analyse**: Statisk kodeanalyse for sikkerhedssårbarheder og kodningsfejl  
- **Supply Chain Insights**: Synlighed i afhængigheders helbred og sikkerhedsstatus  

**Azure DevOps & Azure Repos-integration:**  
- Problemfri sikkerhedsscanning på tværs af Microsofts udviklingsplatforme  
- Automatiserede sikkerhedstjek i Azure Pipelines til AI-arbejdsmængder  
- Politikhåndhævelse for sikker deployering af AI-komponenter  

**Microsofts interne praksis:**  
Microsoft implementerer omfattende supply chain-sikkerhedsprocedurer på tværs af alle produkter. Lær om gennemprøvede metoder i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Bedste praksis for foundationssikkerhed

MCP-implementeringer arver og bygger videre på din organisations eksisterende sikkerhedsholdning. Styrkelse af grundlæggende sikkerhedspraksis øger væsentligt den samlede sikkerhed i AI-systemer og MCP-deployeringer.

### Grundlæggende sikkerhedsprincipper

#### **Sikre udviklingspraksisser**  
- **OWASP-overholdelse**: Beskyt mod [OWASP Top 10](https://owasp.org/www-project-top-ten/) webapplikationssårbarheder  
- **AI-specifikke beskyttelser**: Implementer kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sikker styring af hemmeligheder**: Brug dedikerede vaults til tokens, API-nøgler og følsomme konfigurationsdata  
- **End-to-End-kryptering**: Implementer sikker kommunikation på tværs af alle applikationskomponenter og dataflows  
- **Inputvalidering**: Grundig validering af alle brugerinput, API-parametre og datakilder  

#### **Infrastrukturhærddannelse**  
- **Multi-faktor-autentificering**: Obligatorisk MFA for alle administrative og servicekonti  
- **Patchhåndtering**: Automatiseret, rettidig patchning af operativsystemer, frameworks og afhængigheder  
- **Integrering af identitetsudbydere**: Centraliseret identitetsstyring via virksomhedens identitetsudbydere (Microsoft Entra ID, Active Directory)  
- **Netværkssegmentering**: Logisk isolation af MCP-komponenter for at begrænse lateral bevægelsesmulighed  
- **Princippet om mindst privilegium**: Minimalt nødvendige tilladelser for alle systemkomponenter og konti  

#### **Sikkerhedsovervågning og detektion**  
- **Omfattende logning**: Detaljeret logning af AI-applikationsaktiviteter, inklusiv MCP klient-server-interaktioner  
- **SIEM-integration**: Centraliseret sikkerhedsinformations- og hændelsesstyring for anomalidetektion  
- **Adfærdsanalyse**: AI-drevet overvågning for at opdage usædvanlige mønstre i system- og brugeradfærd  
- **Trusselsintelligens**: Integration af eksterne trusselstrømme og kompromitteringsindikatorer (IOC’er)  
- **Hændelsesrespons**: Veldefinerede procedurer for detektion, respons og genopretning ved sikkerhedshændelser  

#### **Zero Trust-arkitektur**  
- **Aldrig tillid, altid verifikation**: Løbende verifikation af brugere, enheder og netværksforbindelser  
- **Mikrosegmentering**: Granulære netværkskontroller, der isolerer individuelle arbejdsbelastninger og tjenester  
- **Identitetscentreret sikkerhed**: Sikkerhedspolitikker baseret på verificerede identiteter frem for netværksplacering  
- **Kontinuerlig risikovurdering**: Dynamisk evaluering af sikkerhedsholdning baseret på aktuel kontekst og adfærd  
- **Betinget adgang**: Adgangskontroller, der tilpasses baseret på risikofaktorer, placering og enhedstillid  

### Enterprise-integrationsmønstre

#### **Integration i Microsoft sikkerhedsøkosystem**  
- **Microsoft Defender for Cloud**: Omfattende cloud-sikkerhedsstyringspostur  
- **Azure Sentinel**: Cloud-native SIEM og SOAR-funktionaliteter til beskyttelse af AI-arbejdsbelastninger  
- **Microsoft Entra ID**: Enterprise identitets- og adgangsstyring med betingede adgangspolitikker  
- **Azure Key Vault**: Centraliseret styring af hemmeligheder med hardware security module (HSM) backing  
- **Microsoft Purview**: Data governance og overholdelse for AI-datakilder og arbejdsgange  

#### **Overholdelse og governance**  
- **Regulatorisk tilpasning**: Sikr at MCP-implementeringer opfylder branchespecifikke compliancekrav (GDPR, HIPAA, SOC 2)
- **Dataklassificering**: Korrekt kategorisering og håndtering af følsomme data, der behandles af AI-systemer  
- **Revisionsspor**: Omfattende logning til overholdelse af regler og retsmedicinsk efterforskning  
- **Fortrolighedskontrol**: Implementering af privacy-by-design principper i AI-systemarkitektur  
- **Ændringsstyring**: Formelle processer for sikkerhedsgennemgang af ændringer i AI-systemer  

Disse grundlæggende praksisser skaber en robust sikkerhedsbaseline, der øger effektiviteten af MCP-specifikke sikkerhedskontroller og giver omfattende beskyttelse for AI-drevne applikationer.

## Vigtige Sikkerhedsindsigter

- **Lagdel tilgang til sikkerhed**: Kombiner grundlæggende sikkerhedspraksis (sikker kodning, mindst privilegium, verifikation af forsyningskæde, løbende overvågning) med AI-specifikke kontroller for omfattende beskyttelse

- **AI-specifik trusselslandskab**: MCP-systemer står over for unikke risici, herunder prompt-indsprøjtning, værktøjsforgiftning, sessionkapring, forvirret stedfortræder-problemer, sårbarheder ved token-passthrough og overdrevne tilladelser, som kræver specialiserede afbødninger

- **Fremragende autentificering & autorisation**: Implementer robust autentificering ved hjælp af eksterne identitetsudbydere (Microsoft Entra ID), håndhæv korrekt tokenvalidering, og accepter aldrig tokens, der ikke eksplicit er udstedt til din MCP-server

- **Forebyggelse af AI-angreb**: Udrul Microsoft Prompt Shields og Azure Content Safety for at forsvare mod indirekte prompt-indsprøjtning og værktøjsforgiftning, samtidig med at værktøjsmetadata valideres og overvåges for dynamiske ændringer

- **Session- og transportbeskyttelse**: Brug kryptografisk sikre, ikke-deterministiske session-ID'er bundet til brugeridentiteter, implementer korrekt styring af sessionslivscyklus, og anvend aldrig sessioner til autentificering

- **OAuth sikkerhedspraksis**: Forebyg forvirret stedfortræder-angreb gennem eksplicit brugeraccept for dynamisk registrerede klienter, korrekt OAuth 2.1-implementering med PKCE og streng validering af redirect URI'er

- **Token-sikkerhedsprincipper**: Undgå token-passthrough anti-mønstre, valider token-audience claims, implementer kortlivede tokens med sikker rotation, og oprethold klare tillidsgrænser

- **Omfattende forsyningskædesikkerhed**: Behandl alle AI-økosystemets komponenter (modeller, embeddings, kontekstudbydere, eksterne API'er) med samme sikkerhedsomhu som traditionelle softwareafhængigheder

- **Løbende udvikling**: Hold dig opdateret med hurtigt udviklende MCP-specifikationer, bidrag til sikkerhedsfællesskabets standarder, og oprethold adaptive sikkerhedspositioner, efterhånden som protokollen modnes

- **Microsoft sikkerhedsintegration**: Udnyt Microsofts omfattende sikkerhedsøkosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for forbedret beskyttelse ved MCP-udrulning

## Omfattende Ressourcer

### **Officiel MCP Sikkerhedsdokumentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Sikkerhedsressourcer**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementeringsvejledning  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officielle OWASP MCP sikkerhedsrisici  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning for MCP på Azure

### **Sikkerhedsstandarder & bedste praksis**
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

### **DevOps & Supply Chain Security**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Yderligere Sikkerhedsdokumentation**

For omfattende sikkerhedsguidance henvises til disse specialiserede dokumenter i denne sektion:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Fuldstændige sikkerhedspraksisser for MCP-implementeringer  
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementeringseksempler for Azure Content Safety-integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Seneste sikkerhedskontroller og teknikker for MCP-udrulninger  
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Hurtig reference for væsentlige MCP-sikkerhedspraksisser  
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Forsvar-i-dybden-mønstre fra Microsoft Security Response Center (MSRC)

### **Praktisk Sikkerhedstræning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop til sikring af MCP-servere i Azure med progressive camps fra Base Camp til Summit  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencearkitektur og implementeringsvejledning til alle OWASP MCP Top 10 risici

---

## Hvad er Næste

Næste: [Kapitel 3: Kom godt i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->