# MCP Sikkerhed: Omfattende Beskyttelse af AI-Systemer

[![MCP Security Best Practices](../../../translated_images/da/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klik på billedet ovenfor for at se video af denne lektion)_

Sikkerhed er fundamental for design af AI-systemer, og derfor prioriterer vi det som vores anden sektion. Dette stemmer overens med Microsofts **Secure by Design** princip fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) bringer kraftfulde nye muligheder til AI-drevne applikationer, samtidig med at det introducerer unikke sikkerhedsudfordringer, der rækker ud over traditionelle software-risici. MCP-systemer står over for både etablerede sikkerhedsbekymringer (sikker kodning, mindst privilegium, forsyningskædesikkerhed) og nye AI-specifikke trusler, herunder prompt injection, tool poisoning, session hijacking, confused deputy-angreb, token passthrough-sårbarheder og dynamisk kapabilitetsmodifikation.

Denne lektion udforsker de mest kritiske sikkerhedsrisici i MCP-implementeringer — der dækker autentificering, autorisation, overdrevne tilladelser, indirekte prompt injection, sessionssikkerhed, confused deputy-problemer, tokenhåndtering og forsyningskædesårbarheder. Du lærer handlekraftige kontroller og bedste praksis for at begrænse disse risici, samtidig med at du udnytter Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security til at styrke din MCP-udrulning.

## Læringsmål

Ved slutningen af denne lektion vil du kunne:

- **Identificere MCP-specifikke trusler**: Genkende unikke sikkerhedsrisici i MCP-systemer inklusiv prompt injection, tool poisoning, overdrevne tilladelser, session hijacking, confused deputy-problemer, token passthrough-sårbarheder og forsyningskæderisici  
- **Anvende sikkerhedskontroller**: Implementere effektive afbødninger inklusive robust autentificering, mindst privilegier, sikker tokenhåndtering, sessionssikkerhedskontroller og forsyningskædeverifikation  
- **Udnytte Microsoft sikkerhedsløsninger**: Forstå og implementere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security til beskyttelse af MCP-arbejdsbyrder  
- **Validere toolsikkerhed**: Genkende vigtigheden af validering af tool-metadata, overvågning af dynamiske ændringer og forsvar mod indirekte prompt injection-angreb  
- **Integrere bedste praksis**: Kombinere etablerede sikkerhedsprincipper (sikker kodning, serverhærde, zero trust) med MCP-specifikke kontroller for omfattende beskyttelse  

# MCP Sikkerhedsarkitektur & Kontroller

Moderne MCP-implementeringer kræver lagdelte sikkerhedstilgang, der adresserer både traditionel softwaresikkerhed og AI-specifikke trusler. Den hurtigt udviklende MCP-specifikation modnes fortsat med sine sikkerhedskontroller og muliggør bedre integration med virksomheds sikkerhedsarkitekturer og etablerede bedste praksis.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser, at **98% af rapporterede brud kunne forebygges med robust sikkerhedshygiejne**. Den mest effektive beskyttelsesstrategi kombinerer grundlæggende sikkerhedspraksis med MCP-specifikke kontroller — gennemprøvede baseline sikkerhedsforanstaltninger forbliver mest effektive til at reducere det samlede sikkerhedsrisiko.

## Nuværende Sikkerhedslandskab

> **Note:** Denne information afspejler MCP sikkerhedsstandarder pr. **5. februar 2026**, i overensstemmelse med **MCP Specification 2025-11-25**. MCP-protokollen udvikler sig hurtigt, og fremtidige implementeringer kan introducere nye autentificeringsmønstre og forbedrede kontroller. Henvis altid til den aktuelle [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) og [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for den seneste vejledning.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **hands-on sikkerhedstræning** anbefaler vi varmt **MCP Security Summit Workshop** (Sherpa) — en omfattende guidet ekspedition til sikring af MCP-servere i Microsoft Azure.

### Workshop Overblik

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tilbyder praktisk, handlekraftig sikkerhedstræning gennem en gennemprøvet "sårbar → udnyt → fix → valider" metode. Du vil:

- **Lære ved at bryde ting**: Oplev sårbarheder ved at udnytte bevidst usikre servere  
- **Brug Azure-indbygget sikkerhed**: Udnyt Azure Entra ID, Key Vault, API Management og AI Content Safety  
- **Følg Defense-in-Depth**: Gå gennem lejre, der bygger omfattende sikkerhedslag  
- **Anvend OWASP-standarder**: Hver teknik knyttes til [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- **Få produktionsklar kode**: Få fungerende, testede implementeringer  

### Ekspeditionsruten

| Lejr | Fokus | OWASP Risici Dækket |
|------|-------|---------------------|
| **Base Camp** | MCP fundamentals & autentificeringssårbarheder | MCP01, MCP07 |
| **Lejr 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Lejr 2: Gateway** | API Management, Private Endpoints, governance | MCP02, MCP06, MCP07, MCP09 |
| **Lejr 3: I/O Sikkerhed** | Prompt injection, PII-beskyttelse, indholdssikkerhed | MCP03, MCP05, MCP06, MCP10 |
| **Lejr 4: Overvågning** | Log Analytics, dashboards, trusselsdetektion | MCP04, MCP08 |
| **Summit** | Red Team / Blue Team integrationstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Sikkerhedsrisici

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhedsrisici for MCP-implementeringer:

| Risiko | Beskrivelse | Azure Afbødning |
|--------|-------------|-----------------|
| **MCP01** | Token Mismanagement & Secret Exposure | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege Escalation via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Tool Poisoning | Tool validering, integritetsverifikation |
| **MCP04** | Software Supply Chain Attacks & Dependency Tampering | GitHub Advanced Security, dependency scanning |
| **MCP05** | Command Injection & Execution | Input validering, sandboxing |
| **MCP06** | Intent Flow Subversion | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Insufficient Authentication & Authorization | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Lack of Audit and Telemetry | Azure Monitor, Application Insights |
| **MCP09** | Shadow MCP Servers | API Center governance, netværksisolation |
| **MCP10** | Context Injection & Over-Sharing | Dataklassifikation, minimal eksponering |

### Evolution af MCP Autentificering

MCP-specifikationen har udviklet sig betydeligt i sin tilgang til autentificering og autorisation:

- **Original tilgang**: Tidlige specifikationer krævede, at udviklere implementerede brugerdefinerede autentificeringsservere, hvor MCP-servere fungerede som OAuth 2.0 Autorisationsservere, der administrerede brugerautentificering direkte  
- **Nuværende standard (2025-11-25)**: Opdateret specifikation tillader MCP-servere at delegere autentificering til eksterne identitetsudbydere (som Microsoft Entra ID), forbedrer sikkerhedsholdning og reducerer implementeringskompleksitet  
- **Transport Layer Security**: Forbedret understøttelse af sikre transportmekanismer med passende autentificeringsmønstre for både lokale (STDIO) og fjernforbindelser (Streamable HTTP)  

## Autentificerings- og Autorisationssikkerhed

### Nuværende sikkerhedsudfordringer

Moderne MCP-implementeringer står overfor flere autentificerings- og autorisationsudfordringer:

### Risici & Trussel-vektorer

- **Forkert konfigureret autorisationslogik**: Fejlbehæftet autorisation i MCP-servere kan eksponere følsomme data og anvende adgangskontroller forkert  
- **OAuth-token kompromittering**: Tyveri af lokale MCP server-tokens gør det muligt for angribere at udgive sig for servere og få adgang til downstream services  
- **Token passthrough-sårbarheder**: Forkert håndtering af tokens skaber omgåelse af sikkerhedskontroller og ansvarlighedsgab  
- **Overdrevne tilladelser**: Overprivilegerede MCP-servere bryder princippet om mindst privilegium og udvider angrebsoverflader  

#### Token Passthrough: Et kritisk anti-mønster

**Token passthrough er udtrykkeligt forbudt** i den nuværende MCP-autorisation specifikation på grund af alvorlige sikkerhedskonsekvenser:

##### Omgåelse af sikkerhedskontroller  
- MCP-servere og downstream API’er implementerer kritiske sikkerhedskontroller (rate limiting, anmodningsvalidering, trafikovervågning), som afhænger af korrekt token-validering  
- Direkte klient-til-API tokenbrug omgår disse væsentlige beskyttelser og underminerer sikkerhedsarkitekturen  

##### Ansvarlighed & revisionsudfordringer  
- MCP-servere kan ikke skelne mellem klienter, der bruger upstream-udstedte tokens, hvilket bryder auditspor  
- Logs for downstream ressource-servere viser misvisende anmodningskilder i stedet for de faktiske MCP-server mellemmænd  
- Hændelsesundersøgelser og compliance-audits bliver væsentligt vanskeligere  

##### Dataekstraktionsrisici  
- Uvaliderede tokenpåstande tillader ondsindede aktører med stjålne tokens at bruge MCP-servere som proxyer til dataekstraktion  
- Tillidsgrænseovertrædelser muliggør uautoriserede adgangsmønstre, der omgår tilsigtede sikkerhedskontroller  

##### Multi-service angrebsvektorer  
- Kompromitterede tokens accepteret af flere services muliggør lateral bevægelse på tværs af tilknyttede systemer  
- Tillidsantagelser mellem services kan brydes, når token-oprindelser ikke kan verificeres  

### Sikkerhedskontroller og Afbødninger

**Kritiske sikkerhedskrav:**

> **OBLIGATORISK**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke eksplicit er udstedt til MCP-serveren  

#### Autentificerings- og autorisationskontroller

- **Omfattende autorisationsrevision**: Udfør grundige audits af MCP-server autorisationslogik for at sikre, at kun tilsigtede brugere og klienter får adgang til følsomme ressourcer  
  - **Implementeringsguide**: [Azure API Management som autentificeringsgateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Identitetsintegration**: [Brug af Microsoft Entra ID til MCP-server autentificering](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Sikker tokenhåndtering**: Implementer [Microsofts bedste praksis for tokenvalidering og livscyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Valider token-audience påstande, så de matcher MCP-server identitet  
  - Implementer korrekt tokenrotation og udløbspolitikker  
  - Forhindre token replay-angreb og uautoriseret brug  

- **Beskyttet tokenlagring**: Sikr tokenlagring med kryptering både i hvile og under transport  
  - **Bedste praksis**: [Guidelines for sikker tokenlagring og kryptering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Implementering af adgangskontrol

- **Princippet om mindst privilegium**: Giv MCP-servere kun de minimumstilladelser, der kræves for den tilsigtede funktionalitet  
  - Regelmæssig gennemgang og opdatering af tilladelser for at forhindre privilege creep  
  - **Microsoft dokumentation**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Role-Based Access Control (RBAC)**: Implementer finmaskede rollebaserede rettigheder  
  - Begræns roller stramt til specifikke ressourcer og handlinger  
  - Undgå brede eller unødvendige tilladelser, der udvider angrebsoverfladen  

- **Løbende overvågning af tilladelser**: Implementer kontinuerlig adgangsaudit og overvågning  
  - Overvåg brugsmønstre for tilladelser efter afvigelser  
  - Afhjælp hurtigt overdrevne eller ubrugte rettigheder  

## AI-Specifikke Sikkerhedstrusler

### Prompt Injection & Tool Manipulation Angreb

Moderne MCP-implementeringer står over for sofistikerede AI-specifikke angrebsvektorer, som traditionelle sikkerhedsforanstaltninger ikke fuldt ud kan imødekomme:

#### **Indirekte Prompt Injection (Cross-Domain Prompt Injection)**

**Indirekte Prompt Injection** udgør en af de mest kritiske sårbarheder i MCP-aktiverede AI-systemer. Angribere indlejrer ondsindede instruktioner i eksternt indhold — dokumenter, websider, e-mails eller datakilder — som AI-systemer efterfølgende behandler som legitime kommandoer.

**Angrebsscenarier:**  
- **Dokument-baseret injection**: Ondsindede instruktioner skjult i behandlede dokumenter, der udløser utilsigtede AI-handlinger  
- **Udnyttelse af webindhold**: Kompromitterede websider indeholder indlejrede prompts, der manipulerer AI-adfærd ved scraping  
- **E-mail-baserede angreb**: Ondsindede prompts i e-mails, der får AI-assistenter til at lække oplysninger eller udføre uautoriserede handlinger  
- **Data-kilde kontaminering**: Kompromitterede databaser eller API’er, der leverer forurenet indhold til AI-systemer  

**Virkelige konsekvenser**: Disse angreb kan resultere i dataekstraktion, privatlivsbrud, produktion af skadeligt indhold og manipulation af brugerinteraktioner. For detaljeret analyse, se [Prompt Injection i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/da/prompt-injection.ed9fbfde297ca877.webp)

#### **Tool Poisoning Angreb**

**Tool Poisoning** angriber metadata, der definerer MCP tools, ved at udnytte, hvordan LLM’er fortolker tool-beskrivelser og parametre til at træffe eksekveringsbeslutninger.

**Angrebsmekanismer:**  
- **Manipulation af metadata**: Angribere indlejrer ondsindede instruktioner i tool-beskrivelser, parameterdefinitioner eller brugs-eksempler  
- **Usynlige instruktioner**: Skjulte prompts i tool-metadata, som AI-modeller behandler, men som er usynlige for mennesker  
- **Dynamisk tool-modifikation ("Rug Pulls")**: Tools, godkendt af brugere, ændres senere til at udføre ondsindede handlinger uden brugerens viden  
- **Parameterinjektion**: Ondsindet indhold indlejret i tool-parameterskemaer, der påvirker modeladfærd  

**Risici ved hostede servere**: Fjern-MCP-servere medfører forhøjede risici, da tool-definitioner kan opdateres efter brugergodkendelse, hvilket skaber scenarier, hvor tidligere sikre tools bliver ondsindede. For omfattende analyse, se [Tool Poisoning Angreb (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/da/tool-injection.3b0b4a6b24de6bef.webp)

#### **Yderligere AI-Angrebsvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerede angreb, der udnytter indhold fra flere domæner for at omgå sikkerhedskontroller  
- **Dynamisk Kapabilitetsændring**: Ændringer i tools kapabiliteter i realtid, som undslipper indledende sikkerhedsvurderinger  
- **Forgiftning af Context Window**: Angreb, der manipulerer store kontekstvinduer for at skjule ondsindede instruktioner  
- **Modelforvirringsangreb**: Udnyttelse af modellens begrænsninger til at skabe uforudsigelige eller usikre adfærdsmønstre  


### AI Sikkerhedsrisikos Indvirkning

**Konsekvenser med Høj Indvirkning:**
- **Dataudtrækning**: Uautoriseret adgang til og tyveri af følsomme virksomheders eller personlige data  
- **Privatlivsbrud**: Eksponering af personligt identificerbare oplysninger (PII) og fortrolige forretningsdata  
- **Systemmanipulation**: Utilsigtede ændringer i kritiske systemer og arbejdsgange  
- **Tyveri af Legitimationsoplysninger**: Kompromittering af autentifikationstokener og service-legitimationsoplysninger  
- **Lateral Bevægelse**: Brug af kompromitterede AI-systemer som springbræt til bredere netværksangreb  

### Microsoft AI Sikkerhedsløsninger

#### **AI Prompt Shields: Avanceret Beskyttelse Mod Injektionsangreb**

Microsoft **AI Prompt Shields** giver omfattende forsvar mod både direkte og indirekte prompt-injektionsangreb via flere sikkerhedslag:

##### **Kernebeskyttelsesmekanismer:**

1. **Avanceret Detektion & Filtrering**  
   - Maskinlæringsalgoritmer og NLP-teknikker opdager ondsindede instruktioner i ekstern indhold  
   - Realtidsanalyse af dokumenter, websider, e-mails og datakilder for indlejrede trusler  
   - Kontekstuel forståelse af legitime vs. ondsindede prompt-mønstre  

2. **Spotlight-teknikker**  
   - Skelner mellem betroede systeminstruktioner og potentielt kompromitterede eksterne input  
   - Teksttransformationer, der forbedrer modellens relevans samtidig med at ondsindet indhold isoleres  
   - Hjælper AI-systemer med at opretholde ordentlig instruktionshierarki og ignorere injicerede kommandoer  

3. **Afgrænsnings- & Datamarkeringssystemer**  
   - Eksplícit afgrænsning mellem betroede systembeskeder og ekstern inputtekst  
   - Specielle markører, der fremhæver grænser mellem betroede og utroværdige datakilder  
   - Klar adskillelse forhindrer forvirring i instruktioner og uautoriseret kommandoeksekvering  

4. **Kontinuerlig Trusselintelligens**  
   - Microsoft overvåger kontinuerligt nye angrebsmønstre og opdaterer forsvar  
   - Proaktiv trusseljagt efter nye injektionsteknikker og angrebsvektorer  
   - Regelmæssige sikkerhedsmodelopdateringer for at bevare effektivitet mod udviklende trusler  

5. **Integration med Azure Content Safety**  
   - Del af det omfattende Azure AI Content Safety suite  
   - Ekstra detektion for jailbreak-forsøg, skadeligt indhold og overtrædelser af sikkerhedspolitikker  
   - Ensartede sikkerhedskontroller på tværs af AI-applikationskomponenter  

**Implementeringsressourcer**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/da/prompt-shield.ff5b95be76e9c78c.webp)


## Avancerede MCP Sikkerhedstrusler

### Sårbarheder ved Session Hijacking

**Session hijacking** repræsenterer en kritisk angrebsvektor i stateful MCP-implementeringer, hvor uautoriserede parter opnår og misbruger legitime sessions-ID'er for at udgive sig for at være klienter og udføre uautoriserede handlinger.

#### **Angrebsscenarier & Risici**

- **Session Hijack Prompt Injection**: Angribere med stjålne sessions-ID'er injicerer ondsindede hændelser i servere, der deler sessions-tilstand, hvilket potentielt udløser skadelige handlinger eller adgang til følsomme data  
- **Direkte Udpegning**: Stjålne sessions-ID'er muliggør direkte MCP-serveropkald, som omgår autentifikation og behandler angribere som legitime brugere  
- **Kompromitterede Genoptagningsstrømme**: Angribere kan afslutte forespørgsler for tidligt, hvilket får legitime klienter til at genoptage med potentielt ondsindet indhold  

#### **Sikkerhedskontroller for Session Management**

**Kritiske Krav:**
- **Autorisation Verifikation**: MCP-servere, der implementerer autorisation, **SKAL** verificere ALLE indkommende forespørgsler og **MÅ IKKE** stole på sessioner til autentifikation  
- **Sikker Sessiongenerering**: Brug kryptografisk sikre, ikke-deterministiske sessions-ID'er genereret med sikre tilfældige talgeneratorer  
- **Bruger-specifik Binding**: Bind sessions-ID'er til bruger-specifik information med formater som `<user_id>:<session_id>` for at undgå session misbrug på tværs af brugere  
- **Sessions Livscyklusstyring**: Implementer korrekt udløb, rotation og ugyldiggørelse for at begrænse sårbarhedsvinduer  
- **Transport Sikkerhed**: Obligatorisk HTTPS for al kommunikation for at forhindre opsnapning af sessions-ID'er  

### Confused Deputy Problemet

**Confused deputy problemet** opstår, når MCP-servere fungerer som autentifikationsproxyer mellem klienter og tredjepartsservices, hvilket skaber muligheder for autorisationsomgåelse ved udnyttelse af statiske klient-ID'er.

#### **Angrebsmekanik & Risici**

- **Cookie-baseret Samtykkeomgåelse**: Tidligere brugerautentifikation skaber samtykkecookies, som angribere udnytter gennem ondsindede autorisationsanmodninger med konstruerede redirect-URI'er  
- **Tyveri af Autorisationskode**: Eksisterende samtykkecookies kan få autorisationsservere til at springe samtykkeskærme over og sende koder til angriber-kontrollerede endepunkter  
- **Uautoriseret API-adgang**: Stjålne autorisationskoder muliggør token-udveksling og brugerudpegning uden eksplicit godkendelse  

#### **Afhjælpende Strategier**

**Obligatoriske Kontroller:**
- **Udtrykkelige Samtykkekrav**: MCP-proxyservere, der bruger statiske klient-ID'er, **SKAL** indhente brugerens samtykke for hver dynamisk registreret klient  
- **OAuth 2.1 Sikkerhedsimplementering**: Følg nuværende bedste praksis for OAuth-sikkerhed, inklusive PKCE (Proof Key for Code Exchange) for alle autorisationsanmodninger  
- **Streng Klientvalidering**: Implementer streng validering af redirect-URI'er og klientidentifikatorer for at forhindre udnyttelse  

### Token Passthrough Sårbarheder

**Token passthrough** udgør et eksplicit antipattern, hvor MCP-servere accepterer klienttokens uden korrekt validering og videresender dem til downstrømme API'er, hvilket overtræder MCP-autorisation-specifikationerne.

#### **Sikkerhedsmæssige Konsekvenser**

- **Kontrolomgåelse**: Direkte klient-til-API tokenbrug omgår kritisk rate limiting, validering og overvågningskontroller  
- **Revisionssporforringelse**: Opstrøms udstedte tokens gør klientidentifikation umulig og forhindrer hændelsesundersøgelser  
- **Proxy-baseret Dataudtrækning**: Uvaliderede tokens gør det muligt for ondsindede aktører at bruge servere som proxyer til uautoriseret dataadgang  
- **Tillidsgrænseovertrædelser**: Downstream-tjenesters tillidsantagelser kan blive brudt, når token-oprindelse ikke kan verificeres  
- **Multi-service Angrebsudvidelse**: Kompromitterede tokens, der accepteres på tværs af flere services, muliggør lateral bevægelse  

#### **Påkrævede Sikkerhedskontroller**

**Ikke-forhandlelige Krav:**
- **Tokenvalidering**: MCP-servere **MÅ IKKE** acceptere tokens, der ikke eksplicit er udstedt til MCP-serveren  
- **Publikumsverifikation**: Altid verificer, at tokenets publikumsclaim matcher MCP-serverens identitet  
- **Korrekt Token Livscyklus**: Implementer kortlivede adgangstokens med sikre rotationsprincipper  


## Supply Chain Sikkerhed for AI-systemer

Supply chain sikkerhed har udviklet sig fra traditionelle softwareafhængigheder til at omfatte hele AI-økosystemet. Moderne MCP-implementeringer skal nøje verificere og overvåge alle AI-relaterede komponenter, da hver enkelt kan introducere potentielle sårbarheder, der kan kompromittere systemets integritet.

### Udvidede AI Supply Chain Komponenter

**Traditionelle Softwareafhængigheder:**
- Open source biblioteker og frameworks  
- Container-billeder og base-systemer  
- Udviklingsværktøjer og build pipelines  
- Infrastrukturkomponenter og -services  

**AI-specifikke Supply Chain Elementer:**
- **Foundation Models**: Fortrænede modeller fra forskellige leverandører, hvor proveniens skal verificeres  
- **Embedding Services**: Eksterne vektoriseringer og semantiske søgetjenester  
- **Kontekstudbydere**: Datakilder, vidensbaser og dokumentarkiver  
- **Tredjeparts API'er**: Eksterne AI-tjenester, ML-pipelines og dataproc endepunkter  
- **Model Artifacts**: Vægte, konfigurationer og finjusterede modelvarianter  
- **Træningsdatasources**: Datasæt anvendt til modeltræning og finjustering  

### Omfattende Supply Chain Sikkerhedsstrategi

#### **Komponentverifikation & Tillid**
- **Proveniensvalidering**: Verificer oprindelse, licensering og integritet af alle AI-komponenter inden integration  
- **Sikkerhedsvurdering**: Udfør sårbarhedsscanninger og sikkerhedsgennemgange for modeller, datakilder og AI-servicer  
- **Rygteanalyse**: Evaluer leverandørers sikkerhedshistorik og praksis  
- **Overholdelsesverifikation**: Sikr at alle komponenter opfylder organisationens sikkerheds- og lovgivningskrav  

#### **Sikre Udrulningspipelines**  
- **Automatiseret CI/CD-sikkerhed**: Integrer sikkerhedsscanning i hele automatiserede udrulningspipelines  
- **Artefaktintegritet**: Implementer kryptografisk verifikation for alle deployerede artefakter (kode, modeller, konfigurationer)  
- **Trinvise Udrulninger**: Brug progressive udrulningsstrategier med sikkerhedsvalidering på hvert trin  
- **Betroede Artefaktdepoter**: Deploy kun fra verificerede, sikre artefaktregistre og depoter  

#### **Kontinuerlig Overvågning & Respons**
- **Afhængighedsscanning**: Løbende sårbarhedsovervågning af alle software- og AI-komponentafhængigheder  
- **Modelovervågning**: Kontinuerlig vurdering af modeladfærd, ydelsesdrift og sikkerhedsanomalier  
- **Service Sundhedsovervågning**: Overvåg eksterne AI-tjenesters tilgængelighed, sikkerhedshændelser og politikændringer  
- **Integration af Trusselintelligens**: Indarbejd trusselsfeeds specifikt for AI- og ML-sikkerhedsrisici  

#### **Adgangskontrol & Mindste Privilegium**
- **Komponentniveau Rettigheder**: Begræns adgang til modeller, data og services efter forretningsbehov  
- **Servicekonto-Styring**: Implementer dedikerede servicekonti med minimale nødvendige rettigheder  
- **Netværkssegmentering**: Isolér AI-komponenter og begræns netværksadgang mellem services  
- **API Gateway-kontroller**: Brug centraliserede API-gateways til at kontrollere og overvåge adgang til eksterne AI-tjenester  

#### **Hændelseshåndtering & Genopretning**
- **Hurtige Responsprocedurer**: Etablerede processer for patching eller udskiftning af kompromitterede AI-komponenter  
- **Rotation af Legitimationsoplysninger**: Automatiserede systemer til udskiftning af secrets, API-nøgler og servicelegitimationsoplysninger  
- **Rollback-Muligheder**: Evne til hurtigt at vende tilbage til tidligere kendt gode versioner af AI-komponenter  
- **Supply Chain Brud Genopretning**: Specifikke procedurer til respons ved kompromittering af opstrøms AI-services  

### Microsoft Sikkerhedsværktøjer & Integration

**GitHub Advanced Security** leverer omfattende supply chain beskyttelse inklusive:  
- **Secret Scanning**: Automatisk detektion af legitimationsoplysninger, API-nøgler og tokens i repositories  
- **Afhængighedsscanning**: Sårbarhedsvurdering af open-source afhængigheder og biblioteker  
- **CodeQL Analyse**: Statisk kodeanalyse for sikkerhedssårbarheder og kodeproblemer  
- **Supply Chain Indsigter**: Synlighed i afhængigheders helbred og sikkerhedsstatus  

**Azure DevOps & Azure Repos Integration:**  
- Sømløs integration af sikkerhedsscanning på tværs af Microsofts udviklingsplatforme  
- Automatiserede sikkerhedstjek i Azure Pipelines for AI-arbejdsbelastninger  
- Politikhåndhævelse for sikker AI-komponentudrulning  

**Microsofts Interne Praksisser:**  
Microsoft anvender omfattende supply chain sikkerhedspraksisser på tværs af alle produkter. Læs om dokumenterede metoder i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Foundation Security Best Practices

MCP-implementeringer arver og bygger videre på din organisations eksisterende sikkerhedsholdning. Styrkelse af grundlæggende sikkerhedspraksisser forbedrer betydeligt den samlede sikkerhed for AI-systemer og MCP-udrulninger.

### Kerne Sikkerhedsprincipper

#### **Sikre Udviklingspraksisser**
- **OWASP-overholdelse**: Beskyt mod [OWASP Top 10](https://owasp.org/www-project-top-ten/) webapplikationssårbarheder  
- **AI-specifikke Beskyttelser**: Implementer kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sikker Secrets Management**: Brug dedikerede vaults til tokens, API-nøgler og følsomme konfigurationsdata  
- **End-to-End Kryptering**: Implementer sikker kommunikation på tværs af alle applikationskomponenter og datakanaler  
- **Inputvalidering**: Grundig validering af alle brugerinput, API-parametre og datakilder  

#### **Infrastructure Hardening**
- **Multi-Faktor Autentifikation**: Obligatorisk MFA for alle administrative og servicekonti  
- **Patch Management**: Automatiseret og rettidig patching af operativsystemer, frameworks og afhængigheder  
- **Identity Provider Integration**: Centraliseret identitetsstyring via enterprise identity providers (Microsoft Entra ID, Active Directory)  
- **Netværkssegmentering**: Logisk isolering af MCP-komponenter for at begrænse lateral bevægelsespotentiale  
- **Mindste Privilegium-princippet**: Minimer nødvendige rettigheder for alle systemkomponenter og konti  

#### **Sikkerhedsovervågning & Detektion**
- **Omfattende Logging**: Detaljeret logning af AI-applikationsaktiviteter, inklusive MCP klient-server-interaktioner  
- **SIEM Integration**: Centraliseret sikkerhedsinformations- og hændelsesstyring til detektion af anomalier  
- **Adfærdsanalyse**: AI-drevet overvågning for at opdage usædvanlige mønstre i system- og brugeradfærd  
- **Trusselintelligens**: Integration af eksterne trusselsfeeds og kompromitteringsindikatorer (IOCs)  
- **Hændelsesberedskab**: Veldefinerede processer for detektion, respons og genopretning ved sikkerhedshændelser  

#### **Zero Trust Arkitektur**
- **Aldrig Stol På, Altid Verificér**: Kontinuerlig verifikation af brugere, enheder og netværksforbindelser  
- **Micro-Segmentering**: Granulær netværkskontrol, der isolerer individuelle arbejdsbelastninger og services  
- **Identitetscentreret Sikkerhed**: Sikkerhedspolitikker baseret på verificerede identiteter i stedet for netværkslokation  
- **Kontinuerlig Risikoanalyse**: Dynamisk vurdering af sikkerhedsholdning baseret på aktuel kontekst og adfærd  
- **Betinget Adgang**: Adgangskontrol, der tilpasses risikofaktorer, lokation og enhedstillid  

### Enterprise Integrationsmønstre

#### **Integration i Microsofts Sikkerhedsekosystem**
- **Microsoft Defender for Cloud**: Omfattende styring af sikkerhedsholdning i skyen  
- **Azure Sentinel**: Sky-native SIEM og SOAR kapaciteter til beskyttelse af AI-arbejdsbelastninger  
- **Microsoft Entra ID**: Enterprise identitets- og adgangsstyring med betingede adgangspolitikker  
- **Azure Key Vault**: Centraliseret secrets management med hardware security module (HSM)-understøttelse  
- **Microsoft Purview**: Datastyring og overholdelse for AI-datakilder og arbejdsgange  

#### **Compliance & Governance**
- **Regulatorisk Overensstemmelse**: Sikr at MCP-implementeringer opfylder branchespecifikke krav (GDPR, HIPAA, SOC 2)  
- **Dataklassificering**: Korrekt kategorisering og håndtering af følsomme data behandlet af AI-systemer  
- **Audit Trails**: Omfattende logning til regulatorisk overholdelse og retsmedicinsk undersøgelse  
- **Databeskyttelseskontroller**: Implementering af privacy-by-design principper i AI-systemarkitekturen  
- **Change Management**: Formelle processer til sikkerhedsgennemgang af AI-systemsmodifikationer  

Disse grundlæggende praksisser skaber en robust sikkerhedsbund, der forbedrer effektiviteten af MCP-specifikke sikkerhedskontroller og giver omfattende beskyttelse for AI-drevne applikationer.  

## Centrale Sikkerhedsopsummeringer
- **Lagvis sikkerhedstilgang**: Kombiner grundlæggende sikkerhedspraksis (sikker kodning, mindst privilegium, forsyningskædeverifikation, kontinuerlig overvågning) med AI-specifikke kontroller for omfattende beskyttelse

- **AI-specifik trusselslandsbydning**: MCP-systemer står overfor unikke risici, herunder prompt-injektion, værktøjsforgiftning, session kapring, forvirrede stedfortræder-problemer, token-gennemgangssårbarheder og overdrevne tilladelser, som kræver specialiserede afbødninger

- **Fremragende autentificering og autorisation**: Implementer robust autentificering ved hjælp af eksterne identitetsudbydere (Microsoft Entra ID), håndhæv korrekt tokenvalidering, og accepter aldrig tokens, der ikke eksplicit er udstedt til din MCP-server

- **Forebyggelse af AI-angreb**: Implementer Microsoft Prompt Shields og Azure Content Safety for at forsvare mod indirekte prompt-injektion og værktøjsforgiftning, mens du validerer værktøjsmetadata og overvåger dynamiske ændringer

- **Sessions- og transport-sikkerhed**: Brug kryptografisk sikre, ikke-deterministiske session-ID’er bundet til brugeridentiteter, implementer korrekt sessionslivscyklusstyring, og brug aldrig sessions til autentificering

- **OAuth bedste sikkerhedspraksis**: Forhindr forvirrede stedfortræder-angreb gennem eksplicit brugeraccept for dynamisk registrerede klienter, korrekt OAuth 2.1-implementering med PKCE og streng validering af redirect URI  

- **Principper for tokensikkerhed**: Undgå anti-mønstre med token-gennemgang, valider token-audience påstande, implementer kortlivede tokens med sikker rotation, og oprethold klare tillidsgrænser

- **Omfattende forsyningskædesikkerhed**: Behandl alle AI-økosystemkomponenter (modeller, embeddings, kontekstudbydere, eksterne API’er) med samme sikkerhedsrigor som traditionelle softwareafhængigheder

- **Kontinuerlig udvikling**: Hold dig opdateret med hurtigt udviklende MCP-specifikationer, bidrag til sikkerhedssamfundets standarder, og oprethold adaptive sikkerhedsindstillinger efterhånden som protokollen modnes

- **Microsoft sikkerhedsintegration**: Udnyt Microsofts omfattende sikkerhedsøkosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) til forbedret beskyttelse af MCP-implementeringer

## Omfattende ressourcer

### **Officiel MCP sikkerhedsdokumentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP sikkerhedsressourcer**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure implementeringsvejledning
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officielle OWASP MCP sikkerhedsrisici
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhedstræning for MCP på Azure

### **Sikkerhedsstandarder og bedste praksis**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI sikkerhedsforskning og analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft sikkerhedsløsninger**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementeringsvejledninger og tutorials**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & forsyningskædesikkerhed**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Yderligere sikkerhedsdokumentation**

For omfattende sikkerhedsrådgivning henvises til disse specialiserede dokumenter i denne sektion:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Fuldstændige bedste sikkerhedspraksis for MCP-implementeringer
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementations-eksempler for Azure Content Safety-integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Nyeste sikkerhedskontroller og teknikker til MCP-distributioner
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Hurtig referenceguide til væsentlige MCP sikkerhedspraksisser
- **[BlueHat 2026: Sikring af AI’s fremtid: Sikring af MCP med forsvar-i-dybden mønstre](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Forsvar-i-dybden mønstre fra Microsoft Security Response Center (MSRC)

### **Hands-On sikkerhedstræning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende hands-on workshop til sikring af MCP-servere i Azure med progressive lejre fra Base Camp til Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referencearkitektur og implementeringsvejledning for alle OWASP MCP Top 10 risici

---

## Hvad er det næste

Næste: [Kapitel 3: Kom godt i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->