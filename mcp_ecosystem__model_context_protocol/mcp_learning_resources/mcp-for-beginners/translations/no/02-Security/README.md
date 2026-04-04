# MCP-sikkerhet: Omfattende beskyttelse for AI-systemer

[![MCP Security Best Practices](../../../translated_images/no/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikk på bildet over for å se video av denne leksjonen)_

Sikkerhet er grunnleggende i utformingen av AI-systemer, og derfor prioriterer vi det som vår andre seksjon. Dette samsvarer med Microsofts **Secure by Design**-prinsipp fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) bringer kraftige nye muligheter til AI-drevne applikasjoner samtidig som det introduserer unike sikkerhetsutfordringer som strekker seg utover tradisjonelle programvarerisikoer. MCP-systemer møter både etablerte sikkerhetsbekymringer (sikker koding, minste privilegium, sikkerhet i leverandørkjeden) og nye AI-spesifikke trusler inkludert prompt-injeksjon, verktøytoksinering, sesjonskapring, confused deputy-angrep, token passthrough-sårbarheter og dynamisk endring av kapasiteter.

Denne leksjonen utforsker de mest kritiske sikkerhetsrisikoene i MCP-implementasjoner—dekket autentisering, autorisasjon, overdrevne tillatelser, indirekte prompt-injeksjon, sesjonssikkerhet, confused deputy-problemer, tokenhåndtering og leverandørkjede-sårbarheter. Du vil lære håndgripelige kontroller og beste praksis for å redusere disse risikoene, samtidig som du utnytter Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security for å styrke din MCP-distribusjon.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- **Identifisere MCP-spesifikke trusler**: Gjenkjenne unike sikkerhetsrisikoer i MCP-systemer inkludert prompt-injeksjon, verktøytoksinering, overdrevne tillatelser, sesjonskapring, confused deputy-problemer, token passthrough-sårbarheter og leverandørkjede-risikoer
- **Anvende sikkerhetskontroller**: Implementere effektive tiltak inkludert robust autentisering, minst mulig privilegium-tilgang, sikker tokenhåndtering, sesjonssikkerhetskontroller og leverandørkjede-verifisering
- **Utnytte Microsofts sikkerhetsløsninger**: Forstå og distribuere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security for beskyttelse av MCP-last
- **Validere verktøysikkerhet**: Gjenkjenne viktigheten av validering av verktøymetadata, overvåking av dynamiske endringer og forsvar mot indirekte prompt-injeksjonsangrep
- **Integrere beste praksis**: Kombinere etablerte sikkerhetsgrunnprinsipper (sikker koding, serverherding, zero trust) med MCP-spesifikke kontroller for helhetlig beskyttelse

# MCP sikkerhetsarkitektur og kontroller

Moderne MCP-implementasjoner krever lagdelte sikkerhetstilnærminger som adresserer både tradisjonell programvaresikkerhet og AI-spesifikke trusler. Den raskt utviklende MCP-spesifikasjonen modnes stadig innen sine sikkerhetskontroller, noe som muliggjør bedre integrasjon med bedrifts sikkerhetsarkitekturer og etablerte beste praksiser.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser at **98 % av rapporterte brudd ville vært forhindret med god sikkerhetshygiene**. Den mest effektive beskyttelsesstrategien kombinerer grunnleggende sikkerhetspraksiser med MCP-spesifikke kontroller—beviste grunnleggende sikkerhetstiltak forblir de mest virkningsfulle for å redusere total sikkerhetsrisiko.

## Dagens sikkerhetslandskap

> **Merk:** Denne informasjonen gjenspeiler MCP-sikkerhetsstandarder per **5. februar 2026**, i tråd med **MCP Specification 2025-11-25**. MCP-protokollen utvikler seg raskt, og fremtidige implementasjoner kan introdusere nye autentiseringsmønstre og forbedrede kontroller. Henvis alltid til gjeldende [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) og [sikkerhetsbeste praksis-dokumentasjon](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for nyeste veiledning.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **praktisk sikkerhetstrening** anbefaler vi på det sterkeste **MCP Security Summit Workshop** (Sherpa) – en omfattende guidet ekspedisjon for å sikre MCP-servere i Microsoft Azure.

### Workshop-oversikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tilbyr praktisk og håndgripelig sikkerhetstrening gjennom en etablert "sårbar → utnytt → fikse → verifisere"-metodikk. Du vil:

- **Lære ved å bryte ting**: Oppleve sårbarheter direkte ved å utnytte bevisst usikre servere
- **Bruke Azure-native sikkerhetsløsninger**: Utnytte Azure Entra ID, Key Vault, API Management og AI Content Safety
- **Følge Defense-in-Depth**: Avansere gjennom leirer som bygger omfattende sikkerhetslag
- **Anvende OWASP-standarder**: Hver teknikk kartlegges til [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produksjonskode**: Forlat med fungerende, testede implementasjoner

### Ekspedisjonsruten

| Leir | Fokus | Dekker OWASP-risikoer |
|------|-------|-----------------------|
| **Base Camp** | MCP grunnprinsipper & autentiserings-sårbarheter | MCP01, MCP07 |
| **Leir 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Leir 2: Gateway** | API Management, private endepunkter, styring | MCP02, MCP07, MCP09 |
| **Leir 3: I/O-sikkerhet** | Prompt-injeksjon, PII-beskyttelse, innholdssikkerhet | MCP03, MCP05, MCP06 |
| **Leir 4: Overvåking** | Logganalyse, dashbord, trusseldeteksjon | MCP08 |
| **Toppmøtet** | Red Team / Blue Team integrasjonstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 sikkerhetsrisikoer

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhetsrisikoene for MCP-implementasjoner:

| Risiko | Beskrivelse | Azure Tiltak |
|--------|-------------|--------------|
| **MCP01** | Tokenfeilhåndtering & hemmelighetseksponering | Azure Key Vault, Managed Identity |
| **MCP02** | Privilege Escalation via Scope Creep | RBAC, Conditional Access |
| **MCP03** | Verktøytoksinering | Verktøyvalidering, integritetsbekreftelse |
| **MCP04** | Leverandørkjede-angrep | GitHub Advanced Security, avhengighetsskanning |
| **MCP05** | Kommandoinjeksjon & kjøring | Inndata-validering, sandkasse |
| **MCP06** | Prompt-injeksjon via kontekstuelle payloads | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Utilstrekkelig autentisering & autorisasjon | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Manglende revisjon & telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skygge-MCP-servere | API Center-styring, nettverksisolasjon |
| **MCP10** | Kontekst-injeksjon & overdeling | Dataklassifisering, minimal eksponering |

### Utvikling av MCP-autentisering

MCP-spesifikasjonen har utviklet seg betydelig i sin tilnærming til autentisering og autorisasjon:

- **Opprinnelig tilnærming**: Tidlige spesifikasjoner krevde at utviklere implementerte egendefinerte autentiseringsservere, hvor MCP-servere fungerte som OAuth 2.0 autorisasjonsservere som håndterte brukerautentisering direkte
- **Nåværende standard (2025-11-25)**: Oppdatert spesifikasjon gjør det mulig for MCP-servere å delegere autentisering til eksterne identitetsleverandører (som Microsoft Entra ID), noe som forbedrer sikkerhetsstilling og reduserer implementasjonskompleksitet
- **Transportlagsikkerhet**: Forbedret støtte for sikre transportmekanismer med riktige autentiseringsmønstre for både lokale (STDIO) og eksterne (streamable HTTP) tilkoblinger

## Autentisering og autorisasjonssikkerhet

### Nåværende sikkerhetsutfordringer

Moderne MCP-implementasjoner møter flere utfordringer innen autentisering og autorisasjon:

### Risikoer og angrepsvektorer

- **Feilkonfigurert autorisasjonslogikk**: Defekt autorisasjonsimplementasjon i MCP-servere kan eksponere sensitiv data og feilaktig anvende tilgangskontroller
- **OAuth-tokenkompromittering**: Lokalt MCP-server token-tyveri tillater angripere å utgi seg for servere og få tilgang til tilkoblede tjenester
- **Token passthrough-sårbarheter**: Feil tokenhåndtering skaper omgåelse av sikkerhetskontroller og aksjonsansvarsgap
- **Overdrevne tillatelser**: Over-privilegerte MCP-servere bryter minste privilegium-prinsippet og øker angrepsflaten

#### Token passthrough: Et kritisk anti-mønster

**Token passthrough er eksplisitt forbudt** i gjeldende MCP-autorisasjonspesifikasjon på grunn av alvorlige sikkerhetskonsekvenser:

##### Omgåelse av sikkerhetskontroller
- MCP-servere og tilkoblede API-er implementerer kritiske sikkerhetskontroller (rate limiting, forespørselvalidering, trafikkovervåking) som avhenger av riktig tokenvalidering
- Direkte klient-til-API tokenbruk omgår disse essensielle beskyttelsene og undergraver sikkerhetsarkitekturen

##### Ansvars- og revisjonsutfordringer  
- MCP-servere kan ikke skille mellom klienter som bruker tokens utstedt oppstrøms, noe som bryter revisjonslogger
- Tilknyttede ressursserverlogger viser feilaktige opprinnelser for forespørsler i stedet for faktiske MCP-server-mellomledd
- Hendelsesundersøkelser og etterlevelsesrevisjoner blir vesentlig vanskeligere

##### Risiko for dataeksfiltrasjon
- Uvaliderte tokenpåstander gjør det mulig for ondsinnede aktører med stjålne tokens å bruke MCP-servere som proxy for dataeksfiltrasjon
- Tillitsgrensebrudd tillater uautorisert tilgang som omgår tiltenkte sikkerhetskontroller

##### Angrepsvektorer mot flere tjenester
- Kompromitterte tokens akseptert av flere tjenester muliggjør lateral bevegelse mellom tilkoblede systemer
- Tillitsantagelser mellom tjenester kan brytes når token-opprinnelse ikke kan bekreftes

### Sikkerhetskontroller og mottiltak

**Kritiske sikkerhetskrav:**

> **OBLIGATORISK**: MCP-servere **MÅ IKKE** akseptere tokens som ikke eksplisitt er utstedt for MCP-serveren

#### Autentiserings- og autorisasjonskontroller

- **Grundig autorisasjonsgjennomgang**: Utfør omfattende revisjoner av MCP-servere sin autorisasjonslogikk for å sikre at kun tiltenkte brukere og klienter får tilgang til sensitive ressurser
  - **Implementeringsveiledning**: [Azure API Management som autentiseringsgateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegrasjon**: [Bruke Microsoft Entra ID for MCP-server-autentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sikker tokenhåndtering**: Implementer [Microsofts beste praksis for tokenvalidering og livssyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider at token-audiences samsvarer med MCP-serveridentitet
  - Implementer korrekt rotering og utløpspolicy for tokens
  - Forhindre gjentatte angrep og uautorisert bruk

- **Beskyttet tokenlagring**: Sikre tokenlagring med kryptering både i ro og under transport
  - **Beste praksis**: [Sikker tokenlagring og krypteringsretningslinjer](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Tilgangskontrollimplementering

- **Prinsippet om minst privilegium**: Gi MCP-servere kun minimumstillatelser som er nødvendige for tiltenkt funksjonalitet
  - Regelmessige gjennomganger og oppdateringer for å forhindre tillatelsesvekst
  - **Microsoft-dokumentasjon**: [Sikker minst-privilegert tilgang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollebasert tilgangskontroll (RBAC)**: Implementer finmaskede rolleoppgaver
  - Avgrens roller til bestemte ressurser og handlinger
  - Unngå brede eller unødvendige tillatelser som øker angrepsflaten

- **Kontinuerlig overvåking av tillatelser**: Implementer løpende revisjon og overvåking av tilgang
  - Overvåk mønstre i tillatelsesbruk for avvik
  - Utbedre raskt overdrevne eller ubrukte privilegier

## AI-spesifikke sikkerhetstrusler

### Prompt-injeksjon & verktøymanipuleringsangrep

Moderne MCP-implementasjoner møter sofistikerte AI-spesifikke angrepsvektorer som tradisjonelle sikkerhetstiltak ikke fullt ut kan adressere:

#### **Indirekte prompt-injeksjon (Cross-Domain Prompt Injection)**

**Indirekte prompt-injeksjon** representerer en av de mest kritiske sårbarhetene i MCP-aktiverte AI-systemer. Angripere legger inn ondsinnede instruksjoner i eksternt innhold—dokumenter, nettsider, e-poster eller datakilder—som AI-systemer deretter behandler som legitime kommandoer.

**Angrepsscenarioer:**
- **Dokumentbasert injeksjon**: Ondsinnede instruksjoner skjult i behandlede dokumenter som utløser utilsiktede AI-handlinger
- **Utnyttelse av web-innhold**: Kompromitterte nettsider med innebygde prompts som manipulerer AI-adferd ved innhenting
- **E-postbaserte angrep**: Ondsinnede prompts i e-poster som får AI-assistenter til å lekke informasjon eller utføre uautoriserte handlinger
- **Kontaminasjon av datakilder**: Kompromitterte databaser eller API-er som leverer forurenset innhold til AI-systemer

**Virkelige konsekvenser**: Disse angrepene kan føre til dataeksfiltrasjon, personvernbrudd, generering av skadelig innhold og manipulasjon av brukerinteraksjoner. For detaljert analyse, se [Prompt Injection i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/no/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktøytoksinering-angrep**

**Verktøytoksinering** retter seg mot metadata som definerer MCP-verktøy, og utnytter hvordan store språkmodeller (LLM) tolker verktøybeskrivelser og parametere for å avgjøre kjøring.

**Angrepsmekanismer:**
- **Metadata-manipulasjon**: Angripere injiserer ondsinnede instruksjoner i verktøybeskrivelser, parameterdefinisjoner eller bruks-eksempler
- **Usynlige instruksjoner**: Skjulte prompts i verktøymetadata som blir behandlet av AI-modeller men er usynlige for mennesker
- **Dynamisk verktøymodifisering ("rug pulls")**: Verktøy godkjent av brukere blir senere endret for å utføre ondsinnede handlinger uten brukerens viten
- **Parameterinjeksjon**: Ondsinnet innhold innebygd i verktøyparameterskjemaer som påvirker modellens atferd

**Risiko ved hostede servere**: Fjern-MCP-servere representerer forhøyet risiko ettersom verktøydefinisjoner kan oppdateres etter innledende bruker-godkjenning, og skaper scenarioer hvor tidligere trygge verktøy blir ondsinnede. For omfattende analyse, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/no/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligere AI-angrepsvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerte angrep som utnytter innhold fra flere domener for å omgå sikkerhetskontroller
- **Dynamisk kapasitetsendring**: Endringer i verktøyfunksjoner i sanntid som unndrar seg de opprinnelige sikkerhetsvurderingene  
- **Forurensning av kontekstvindu**: Angrep som manipulerer store kontekstvindu for å skjule ondsinnede instruksjoner  
- **Modellforvirringsangrep**: Utnyttelse av modellbegrensninger for å skape uforutsigbar eller usikker atferd  


### Innvirkning av AI-sikkerhetsrisiko

**Konsekvenser med høy innvirkning:**  
- **Datautslipp**: Uautorisert tilgang og tyveri av sensitiv bedrifts- eller personlig data  
- **Personvernsbrudd**: Eksponering av personlig identifiserbar informasjon (PII) og konfidensiell bedriftsinformasjon  
- **Systemmanipulering**: Utilsiktede endringer i kritiske systemer og arbeidsflyter  
- **Tyveri av legitimasjon**: Kompromittering av autentiseringstokener og tjenesteberegninger  
- **Lateral bevegelse**: Bruk av kompromitterte AI-systemer som base for bredere nettverksangrep  

### Microsoft AI sikkerhetsløsninger

#### **AI Prompt Shields: Avansert beskyttelse mot injeksjonsangrep**

Microsoft **AI Prompt Shields** gir omfattende forsvar mot både direkte og indirekte prompt-injeksjonsangrep gjennom flere sikkerhetslag:

##### **Kjernebeskyttelsesmekanismer:**

1. **Avansert deteksjon og filtrering**  
   - Maskinlæringsalgoritmer og NLP-teknikker oppdager ondsinnede instruksjoner i eksternt innhold  
   - Sanntidsanalyse av dokumenter, nettsider, e-poster og datakilder for innebygde trusler  
   - Kontekstuell forståelse av legitime vs. ondsinnede prompt-mønstre  

2. **Spotlight-teknikker**  
   - Skiller mellom pålitelige systeminstruksjoner og potensielt kompromitterte eksterne innspill  
   - Teksttransformasjonsmetoder som øker modellrelevansen samtidig som ondsinnet innhold isoleres  
   - Hjelper AI-systemer å opprettholde korrekt instruksjonshierarki og ignorere injiserte kommandoer  

3. **Avgrenser- og datamerkesystemer**  
   - Eksplisitt grensedefinisjon mellom pålitelige systemmeldinger og ekstern inndata  
   - Spesielle markører som fremhever grensene mellom pålitelige og upålitelige datakilder  
   - Tydelig separasjon forhindrer instruksjonsforvirring og uautorisert kommandoeksekvering  

4. **Kontinuerlig trusselintelligens**  
   - Microsoft overvåker kontinuerlig nye angrepsmønstre og oppdaterer forsvar  
   - Proaktiv trusseljakt etter nye injeksjonsteknikker og angrepsvektorer  
   - Regelmessige sikkerhetsmodelloppdateringer for å opprettholde effektivitet mot utviklende trusler  

5. **Integrasjon med Azure Content Safety**  
   - Del av omfattende Azure AI Content Safety-pakke  
   - Ytterligere deteksjon av jailbreak-forsøk, skadelig innhold og brudd på sikkerhetspolicyer  
   - Enhetlig sikkerhetskontroll på tvers av AI-applikasjonskomponenter  

**Implementeringsressurser**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/no/prompt-shield.ff5b95be76e9c78c.webp)  


## Avanserte MCP sikkerhetstrusler

### Sårbarheter for sesjonstyveri

**Sesjonstyveri** representerer en kritisk angrepsvektor i tilstandsfulle MCP-implementeringer hvor uautoriserte parter oppnår og misbruker legitime sesjonsidentifikatorer for å utgi seg for klienter og utføre uautoriserte handlinger.

#### **Angrepsscenarier og risikoer**

- **Sesjonstyveri med prompt-injeksjon**: Angripere med stjålne sesjons-IDer injiserer ondsinnede hendelser i servere som deler sesjonsstatus, noe som potensielt kan utløse skadelige handlinger eller gi tilgang til sensitiv data  
- **Direkte utgave**: Stjålne sesjons-IDer muliggjør direkte MCP-serverkall som omgår autentisering, og behandler angripere som legitime brukere  
- **Kompromitterte gjenoppta-strømmer**: Angripere kan avslutte forespørsler tidlig, og forårsake at legitime klienter gjenopptar med potensielt ondsinnet innhold  

#### **Sikkerhetskontroller for sesjonshåndtering**

**Kritiske krav:**  
- **Autorisasjonsverifisering**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler og **MÅ IKKE** stole på sesjoner for autentisering  
- **Sikker sesjonsgenerering**: Bruk kryptografisk sikre, ikke-deterministiske sesjons-IDer generert med sikre tilfeldige tallgeneratorer  
- **Brukerspesifikk binding**: Bind sesjons-IDer til brukerspesifikk informasjon med formater som `<user_id>:<session_id>` for å forhindre misbruk på tvers av brukere  
- **Livssyklushåndtering for sesjoner**: Implementer riktig utløp, rotering og ugyldiggjøring for å begrense sårbarhetsvinduer  
- **Transport-sikkerhet**: Obligatorisk HTTPS for all kommunikasjon for å forhindre avlytting av sesjons-IDer  

### Problemet med forvirret stedfortreder

**Problemet med forvirret stedfortreder** oppstår når MCP-servere fungerer som autentiseringsproksier mellom klienter og tredjepartstjenester, og skaper muligheter for autorisasjonsomgåelse gjennom utnyttelse av statiske klient-IDer.

#### **Angrepsmekanismer og risikoer**

- **Cookie-basert samtykkeomgåelse**: Tidligere brukerautentisering lager samtykkecookies som angripere utnytter gjennom ondsinnede autorisasjonsforespørsler med spesialtilpassede omdirigerings-URIer  
- **Tyveri av autorisasjonskode**: Eksisterende samtykkecookies kan føre til at autorisasjonsservere hopper over samtykkeskjermer og omdirigerer koder til angriperkontrollerte endepunkter  
- **Uautorisert API-tilgang**: Stjålne autorisasjonskoder muliggjør tokenutveksling og brukerutgivelse uten eksplisitt godkjenning  

#### **Avbøtende strategier**

**Obligatoriske kontroller:**  
- **Eksplisitte samtykkekrav**: MCP-proksyservere som bruker statiske klient-IDer **MÅ** innhente brukersamtykke for hver dynamisk registrert klient  
- **OAuth 2.1 sikkerhetsimplementering**: Følg gjeldende OAuth-sikkerhetspraksis, inkludert PKCE (Proof Key for Code Exchange), for alle autorisasjonsforespørsler  
- **Streng klientvalidering**: Implementer streng validering av omdirigerings-URIer og klientidentifikatorer for å forhindre utnyttelse  

### Sårbarheter ved token-passthrough  

**Token-passthrough** er et eksplisitt antipattern der MCP-servere aksepterer klienttoken uten riktig validering og videresender dem til nedstrøms API-er, noe som bryter med MCP-autorisasjonsspesifikasjoner.

#### **Sikkerhetsimplikasjoner**

- **Omgåelse av kontroll**: Direkte klient-til-API-bruk av token omgår viktige hastighetsbegrensninger, validerings- og overvåkingsmekanismer  
- **Forringelse av auditspor**: Token utstedt upstream gjør klientidentifikasjon umulig, og undergraver hendelsesundersøkelser  
- **Proxy-basert datautslipp**: Uvaliderte token gjør det mulig for ondsinnede aktører å bruke servere som proxy for uautorisert dataadgang  
- **Brudd på tillitsgrenser**: Nedstrøms tjenesters tillitsantakelser kan brytes når token-opprinnelse ikke kan verifiseres  
- **Utvidelse av angrep på flere tjenester**: Kompromitterte token akseptert på tvers av flere tjenester muliggjør lateral bevegelse  

#### **Påkrevde sikkerhetskontroller**

**Ufravikelige krav:**  
- **Token-validering**: MCP-servere **MÅ IKKE** akseptere token som ikke er eksplisitt utstedt for MCP-serveren  
- **Audience-verifisering**: Alltid validere at token audience-krav samsvarer med MCP-serverens identitet  
- **Korrekt token-livssyklus**: Implementer kortlivede tilgangstoken med sikre rotasjonspraksiser  


## Forsyningskjedesikkerhet for AI-systemer

Forsyningskjedesikkerhet har utviklet seg fra tradisjonelle programvareavhengigheter til å omfatte hele AI-økosystemet. Moderne MCP-implementeringer må grundig verifisere og overvåke alle AI-relaterte komponenter, da hver introduserer potensielle sårbarheter som kan kompromittere systemintegritet.

### Utvidede AI-forsyningskjede-komponenter

**Tradisjonelle programvareavhengigheter:**  
- Open source-biblioteker og rammeverk  
- Containerbilder og basisoperativsystemer  
- Utviklingsverktøy og bygge-pipelines  
- Infrastrukturkomponenter og tjenester  

**Spesifikke AI-forsyningskjede-elementer:**  
- **Grunnlagsmodeller**: Forhåndstrente modeller fra ulike leverandører som krever opprinnelsesverifisering  
- **Embedding-tjenester**: Eksterne vektorisering- og semantisk søketjenester  
- **Kontekstleverandører**: Datakilder, kunnskapsbaser og dokumentarkiver  
- **Tredjeparts-APIer**: Eksterne AI-tjenester, ML-pipelines og dataprosesseringsendepunkter  
- **Modellartefakter**: Vekter, konfigurasjoner og finjusterte modellvarianter  
- **Treningsdatasett**: Datasett brukt for modelltrening og finjustering  

### Omfattende forsyningskjedesikkerhetsstrategi

#### **Komponentverifikasjon og tillit**  
- **Opprinnelsesvalidering**: Verifiser opprinnelse, lisensiering og integritet til alle AI-komponenter før integrasjon  
- **Sikkerhetsvurdering**: Utfør sårbarhetsskanninger og sikkerhetsgjennomganger av modeller, datakilder og AI-tjenester  
- **Omdømmeanalyse**: Vurder sikkerhetsprestasjon og praksis hos AI-tjenesteleverandører  
- **Samsvarskontroll**: Sikre at alle komponenter oppfyller organisatoriske sikkerhets- og regulatoriske krav  

#### **Sikre distribusjonspipelines**  
- **Automatisert CI/CD-sikkerhet**: Integrer sikkerhetsskanning i automatiserte distribusjonspipelines  
- **Artefaktintegritet**: Implementer kryptografisk verifisering for alle distribuerte artefakter (kode, modeller, konfigurasjoner)  
- **Trinnvis distribusjon**: Bruk progressive distribusjonsstrategier med sikkerhetsvalidering i hvert steg  
- **Pålitelige artefakt-repositorier**: Distribuer kun fra verifiserte, sikre artefaktregister og repositorier  

#### **Kontinuerlig overvåking og respons**  
- **Avhengighetsskanning**: Løpende sårbarhetsovervåking for all programvare og AI-komponentavhengigheter  
- **Modellovervåking**: Kontinuerlig vurdering av modellatferd, ytelsesavvik og sikkerhetsanomalier  
- **Tjenestehelseovervåking**: Overvåk eksterne AI-tjenester for tilgjengelighet, sikkerhetshendelser og policyendringer  
- **Trusselintelligens-integrasjon**: Inkluder trusselstrømmer spesifikke for AI og ML sikkerhetsrisikoer  

#### **Tilgangskontroll og minste privilegium**  
- **Komponentnivåtillatelser**: Begrens tilgang til modeller, data og tjenester basert på forretningsnødvendighet  
- **Tjenestekonto-administrasjon**: Implementer dedikerte tjenestekontoer med minimale nødvendige tillatelser  
- **Nettverkssegmentering**: Isoler AI-komponenter og begrens nettverkstilgang mellom tjenester  
- **API-gateway-kontroller**: Bruk sentraliserte API-gatewayer for å kontrollere og overvåke tilgang til eksterne AI-tjenester  

#### **Hendelsesrespons og gjenoppretting**  
- **Raske responsprosedyrer**: Etablerte prosesser for patching eller utskiftning av kompromitterte AI-komponenter  
- **Roteringsrutiner for legitimasjon**: Automatiserte systemer for rotasjon av hemmeligheter, API-nøkler og tjenesteberegninger  
- **Rollback-muligheter**: Evne til å raskt gå tilbake til tidligere kjente gode versjoner av AI-komponenter  
- **Gjenoppretting ved brudd i forsyningskjeden**: Spesifikke prosedyrer for respons på kompromittering av upstream AI-tjenester  

### Microsoft sikkerhetsverktøy og integrasjon

**GitHub Advanced Security** gir omfattende forsyningskjedeforsvar inkludert:  
- **Hemmelighetsskanning**: Automatisk deteksjon av legitimasjon, API-nøkler og token i repositorier  
- **Avhengighetsskanning**: Sårbarhetsvurdering for åpne kildeavhengigheter og biblioteker  
- **CodeQL-analyse**: Statisk kodeanalyse for sikkerhetssårbarheter og kodeproblemer  
- **Forsyningskjedeinnsikt**: Innsikt i avhengighetshelse og sikkerhetsstatus  

**Azure DevOps og Azure Repos integrasjon:**  
- Sømløs sikkerhetsskanning på tvers av Microsofts utviklingsplattformer  
- Automatiserte sikkerhetssjekker i Azure Pipelines for AI-arbeidsbelastninger  
- Policyimplementering for sikker distribusjon av AI-komponenter  

**Microsofts interne praksis:**  
Microsoft implementerer omfattende sikkerhetspraksiser for forsyningskjeden på tvers av alle produkter. Les om velprøvde tilnærminger i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Beste praksis for grunnleggende sikkerhet

MCP-implementeringer arver og bygger videre på din organisasjons eksisterende sikkerhetsnivå. Å styrke grunnleggende sikkerhetspraksis forbedrer betydelig den overordnede sikkerheten til AI-systemer og MCP-distribusjoner.

### Viktige sikkerhetsgrunnprinsipper

#### **Sikre utviklingspraksiser**  
- **OWASP-overholdelse**: Beskyttelse mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) webapplikasjonssårbarheter  
- **AI-spesifikke beskyttelser**: Implementer kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sikker hemmelighetshåndtering**: Bruk dedikerte vaults for token, API-nøkler og sensitiv konfigurasjonsdata  
- **Ende-til-ende-kryptering**: Implementer sikker kommunikasjon på tvers av alle applikasjonskomponenter og dataflyt  
- **Validering av inndata**: Grundig validering av all brukerinput, API-parametere og datakilder  

#### **Infrastrukturherding**  
- **Multifaktorautentisering**: Obligatorisk MFA for alle administrative og tjenestekontoer  
- **Patchhåndtering**: Automatisert, tidsriktig patching av operativsystemer, rammeverk og avhengigheter  
- **Identitetsleverandør-integrasjon**: Sentralisert identitetshåndtering gjennom bedriftens identitetsleverandører (Microsoft Entra ID, Active Directory)  
- **Nettverkssegmentering**: Logisk isolasjon av MCP-komponenter for å begrense lateral bevegelse  
- **Prinsippet om minste privilegium**: Minimale nødvendige tillatelser for alle systemkomponenter og kontoer  

#### **Sikkerhetsovervåking og deteksjon**  
- **Omfattende logging**: Detaljert loggføring av AI-applikasjonsaktiviteter, inkludert MCP klient-server-interaksjoner  
- **SIEM-integrasjon**: Sentralisert sikkerhetsinformasjons- og hendelseshåndtering for anomali-deteksjon  
- **Atferdsanalyse**: AI-drevet overvåking for å oppdage uvanlige mønstre i system- og brukeradferd  
- **Trusselintelligens**: Integrasjon av eksterne trusselstrømmer og kompromitteringsindikatorer (IOC)  
- **Hendelsesrespons**: Veldefinerte prosedyrer for påvisning, respons og gjenoppretting ved sikkerhetshendelser  

#### **Zero Trust-arkitektur**  
- **Aldri stol, alltid verifiser**: Kontinuerlig verifisering av brukere, enheter og nettverkstilkoblinger  
- **Mikrosegmentering**: Granulære nettverkskontroller som isolerer individuelle arbeidsbelastninger og tjenester  
- **Identitetsfokusert sikkerhet**: Sikkerhetspolicyer basert på verifiserte identiteter fremfor nettverksplassering  
- **Kontinuerlig risikovurdering**: Dynamisk sikkerhetsposisjonsvurdering basert på gjeldende kontekst og adferd  
- **Betinget tilgang**: Tilgangskontroller som tilpasses basert på risikofaktorer, lokasjon og enhetstillit  

### Integrasjonsmønstre for bedrifter

#### **Integrasjon i Microsoft-sikkerhetsekosystemet**  
- **Microsoft Defender for Cloud**: Omfattende sky-sikkerhetsposisjonsstyring  
- **Azure Sentinel**: Sky-native SIEM- og SOAR-funksjoner for beskyttelse av AI-arbeidsbelastninger  
- **Microsoft Entra ID**: Bedriftsidentitets- og tilgangsstyring med betingede tilgangspolicyer  
- **Azure Key Vault**: Sentralisert hemmelighetshåndtering med maskinvaresikkerhetsmodul (HSM) støtte  
- **Microsoft Purview**: Datastyring og samsvar for AI-datakilder og arbeidsflyter  

#### **Samsvar og styring**  
- **Regulatorisk samsvar**: Sikre at MCP-implementeringer oppfyller bransjespesifikke samsvarskrav (GDPR, HIPAA, SOC 2)  
- **Dataklassifisering**: Korrekt kategorisering og håndtering av sensitiv data behandlet av AI-systemer  
- **Auditspor**: Omfattende logging for regulatorisk samsvar og rettsmedisinsk etterforskning  
- **Personvernkontroller**: Implementering av personvern i design-prinsipper i AI-systemarkitektur  
- **Endringsstyring**: Formelle prosesser for sikkerhetsgjennomganger ved endringer i AI-systemer  

Disse grunnleggende praksisene skaper en robust sikkerhetsbase som øker effektiviteten til MCP-spesifikke sikkerhetskontroller og gir omfattende beskyttelse for AI-drevne applikasjoner.
## Viktige sikkerhetskonklusjoner

- **Lagvis sikkerhetstilnærming**: Kombiner grunnleggende sikkerhetspraksiser (sikker koding, minst privilegium, forsyningskjedeverifisering, kontinuerlig overvåking) med AI-spesifikke kontroller for omfattende beskyttelse

- **AI-spesifikk trussellandskap**: MCP-systemer står overfor unike risikoer inkludert prompt-injeksjon, verktøyforgiftning, sesjonskapring, forvirret stedfortreder-problemer, sårbarheter for token-gjennomstrømning og overdrevne tillatelser som krever spesialiserte mottiltak

- **Autentisering og autorisasjonsekspertise**: Implementer robust autentisering ved bruk av eksterne identitetsleverandører (Microsoft Entra ID), håndhev korrekt tokenvalidering, og aksepter aldri tokens som ikke eksplisitt er utstedt for din MCP-server

- **Forebygging av AI-angrep**: Distribuer Microsoft Prompt Shields og Azure Content Safety for å forsvare mot indirekte prompt-injeksjons- og verktøyforgiftingsangrep, samtidig som verktøymetadata valideres og dynamiske endringer overvåkes

- **Sesjons- og transportsikkerhet**: Bruk kryptografisk sikre, ikke-deterministiske sesjons-IDer knyttet til brukeridentiteter, implementer riktig sesjonslivssyklusforvaltning, og bruk aldri sesjoner for autentisering

- **Beste praksis for OAuth-sikkerhet**: Forhindre forvirret stedfortreder-angrep gjennom eksplisitt bruker samtykke for dynamisk registrerte klienter, korrekt OAuth 2.1-implementering med PKCE, og streng validering av redirect URI

- **Retningslinjer for tokensikkerhet**: Unngå anti-mønstre for token-gjennomstrømning, valider token­mottakerkrav, implementer kortvarige tokens med sikker rotasjon, og oppretthold klare tillitsgrenser

- **Omfattende forsyningskjedesikkerhet**: Behandle alle AI-økosystemkomponenter (modeller, embeddings, kontekstleverandører, eksterne APIer) med samme sikkerhetsnivå som tradisjonelle programvareavhengigheter

- **Kontinuerlig utvikling**: Hold deg oppdatert med raskt utviklende MCP-spesifikasjoner, bidra til sikkerhetsfelleskapets standarder, og oppretthold tilpasningsdyktige sikkerhetsposisjoner etter hvert som protokollen modnes

- **Microsoft sikkerhetsintegrasjon**: Utnytt Microsofts omfattende sikkerhetsøkosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for forbedret beskyttelse av MCP-distribusjoner

## Omfattende ressurser

### **Offisiell MCP sikkerhetsdokumentasjon**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP sikkerhetsressurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Topp 10 med Azure-implementeringsveiledning
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offisielle OWASP MCP sikkerhetsrisikoer
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening for MCP på Azure

### **Sikkerhetsstandarder og beste praksis**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI sikkerhetsforskning og analyse**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft sikkerhetsløsninger**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementeringsguider og veiledninger**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps og forsyningskjedesikkerhet**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Tilleggs sikkerhetsdokumentasjon**

For omfattende sikkerhetsveiledning, henvis til disse spesialiserte dokumentene i denne seksjonen:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Fullstendig sikkerhetsbest praksis for MCP-implementeringer
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementeringseksempler for Azure Content Safety-integrasjon  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Nyeste sikkerhetskontroller og teknikker for MCP-distribusjoner
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Rask referanseguide for essensielle MCP sikkerhetspraksiser

### **Praktisk sikkerhetstrening**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop for å sikre MCP-servere i Azure med progressive leirer fra Base Camp til Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referansearkitektur og implementeringsveiledning for alle OWASP MCP Topp 10 risikoer

---

## Hva blir det neste

Neste: [Kapittel 3: Komme i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi jobber for nøyaktighet, vennligst vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det originale dokumentet på originalspråket bør betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår fra bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->