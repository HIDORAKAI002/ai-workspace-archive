# MCP-sikkerhet: Omfattende beskyttelse for AI-systemer

[![MCP Security Best Practices](../../../translated_images/no/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikk på bildet over for å se video av denne leksjonen)_

Sikkerhet er fundamentalt for design av AI-systemer, og derfor prioriterer vi det som vår andre seksjon. Dette samsvarer med Microsofts prinsipp om **Secure by Design** fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) bringer kraftige nye funksjoner til AI-drevne applikasjoner, samtidig som det introduserer unike sikkerhetsutfordringer som går utover tradisjonelle programvaresikkerhetsrisikoer. MCP-systemer møtes både etablerte sikkerhetsbekymringer (sikker koding, minste privilegium, forsyningskjede-sikkerhet) og nye AI-spesifikke trusler, inkludert prompt-injeksjon, verktøyforgiftning, sesjonskapring, «confused deputy»-angrep, token-passthrough-sårbarheter og dynamisk evnemodifikasjon.

Denne leksjonen utforsker de mest kritiske sikkerhetsrisikoene i MCP-implementasjoner—omfatter autentisering, autorisering, overdrevne tillatelser, indirekte prompt-injeksjon, sesjonssikkerhet, «confused deputy»-problemer, token-håndtering og forsyningskjede-sårbarheter. Du vil lære om handlingsrettede kontroller og beste praksiser for å redusere disse risikoene, samtidig som du utnytter Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security for å styrke din MCP-distribusjon.

## Læringsmål

Ved slutten av denne leksjonen vil du kunne:

- **Identifisere MCP-spesifikke trusler**: Gjenkjenne unike sikkerhetsrisikoer i MCP-systemer inkludert prompt-injeksjon, verktøyforgiftning, overdrevne tillatelser, sesjonskapring, «confused deputy»-problemer, token-passthrough-sårbarheter og forsyningskjede-risikoer
- **Anvende sikkerhetskontroller**: Implementere effektive mottiltak inkludert robust autentisering, minste privilegium-tilgang, sikker token-håndtering, sesjonssikkerhetskontroller og verifisering av forsyningskjeden
- **Utnytte Microsoft-sikkerhetsløsninger**: Forstå og distribuere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security for beskyttelse av MCP-arbeidsbelastninger
- **Validere verktøysikkerhet**: Gjenkjenne viktigheten av validering av verktøymetadata, overvåkning av dynamiske endringer, og forsvar mot indirekte prompt-injeksjonsangrep
- **Integrere beste praksiser**: Kombinere etablerte sikkerhetsfundamenter (sikker koding, serverherding, zero trust) med MCP-spesifikke kontroller for omfattende beskyttelse

# MCP-sikkerhetsarkitektur & kontroller

Moderne MCP-implementasjoner krever lagdelte sikkerhetstilnærminger som adresserer både tradisjonell programvaresikkerhet og AI-spesifikke trusler. Den raskt utviklende MCP-spesifikasjonen modnes kontinuerlig med sine sikkerhetskontroller, noe som muliggjør bedre integrasjon med virksomhets sikkerhetsarkitektur og etablerte beste praksiser.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser at **98 % av rapporterte brudd ville vært forhindret med robust sikkerhetshygiene**. Den mest effektive beskyttelsesstrategien kombinerer grunnleggende sikkerhetsrutiner med MCP-spesifikke kontroller – velprøvde baselinesikkerhetstiltak forblir mest virkningsfulle for å redusere samlet sikkerhetsrisiko.

## Nåværende sikkerhetslandskap

> **Merk:** Denne informasjonen gjenspeiler MCP-sikkerhetsstandarder per **5. februar 2026**, i tråd med **MCP Specification 2025-11-25**. MCP-protokollen utvikler seg raskt, og fremtidige implementasjoner kan introdusere nye autentiseringsmønstre og forbedrede kontroller. Henvis alltid til gjeldende [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) og [dokumentasjon for sikkerhetsbeste praksis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for nyeste veiledning.

> **Fremover:** `2026-07-28` release-kandidaten styrker autorisasjonen ytterligere — klienter må validere `iss`-parameteren på autorisasjonsresponser (RFC 9207), angi en OpenID Connect `application_type` ved dynamisk klientregistrering, og knytte registrerte legitimasjoner til den utstedende autorisasjonsserveren. Se [Hva som endrer seg i MCP: 2026-07-28 release-kandidaten](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) for full liste over autorisasjons SEPer.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **praktisk sikkerhetstrening** anbefaler vi sterkt **MCP Security Summit Workshop** (Sherpa) — en omfattende guidet ekspedisjon for å sikre MCP-servere i Microsoft Azure.

### Workshop-oversikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tilbyr praktisk, handlingsrettet sikkerhetstrening gjennom en bevist "sårbar → utnytt → fiks → valider" metodikk. Du vil:

- **Lære gjennom å bryte ting**: Oppleve sårbarheter direkte ved å utnytte med vilje usikre servere
- **Bruke Azure-native sikkerhet**: Utnytte Azure Entra ID, Key Vault, API Management og AI Content Safety
- **Følge Defense-in-Depth**: Avansere gjennom leirer som bygger omfattende sikkerhetslag
- **Anvende OWASP-standarder**: Hver teknikk korresponderer med [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produksjonsklar kode**: Forlate med fungerende, testede implementasjoner

### Ekspedisjonsruten

| Leir | Fokus | OWASP-risikoer dekke |
|-------|-------|----------------------|
| **Base Camp** | MCP-grunnprinsipper & autentiseringsvulnerabiliteter | MCP01, MCP07 |
| **Leir 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Leir 2: Gateway** | API Management, private endepunkter, styring | MCP02, MCP06, MCP07, MCP09 |
| **Leir 3: I/O-sikkerhet** | Prompt-injeksjon, PII-beskyttelse, innholdssikkerhet | MCP03, MCP05, MCP06, MCP10 |
| **Leir 4: Overvåking** | Logganalyse, dashboards, trusseldeteksjon | MCP04, MCP08 |
| **Toppmøtet** | Red Team / Blue Team integrasjonstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 sikkerhetsrisikoer

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhetsrisikoene for MCP-implementasjoner:

| Risiko | Beskrivelse | Azure-mottiltak |
|--------|-------------|-----------------|
| **MCP01** | Feil Token-håndtering & hemmelighetseksponering | Azure Key Vault, Managed Identity |
| **MCP02** | Rettighetseskalering via Scope Creep | RBAC, betinget tilgang |
| **MCP03** | Verktøyforgiftning | Verktøyvalidering, integritetsverifisering |
| **MCP04** | Forsyningskjede-angrep & uautorisert endring av avhengigheter | GitHub Advanced Security, avhengighetsskanning |
| **MCP05** | Kommando-injeksjon & eksekvering | Inndata-validering, sandboxing |
| **MCP06** | Manipulering av intensjonsflyt | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Utilstrekkelig autentisering & autorisasjon | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Manglende revisjon og telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skygge-MCP-servere | API Center-styring, nettverksisolasjon |
| **MCP10** | Kontekstinnsprøyting & overdreven deling | Dataklassifisering, minimal eksponering |

### Utvikling av MCP-autentisering

MCP-spesifikasjonen har utviklet seg betydelig i sin tilnærming til autentisering og autorisasjon:

- **Opprinnelig tilnærming**: Tidlige spesifikasjoner krevde at utviklere implementerte egne autentiseringsservere, hvor MCP-servere fungerte som OAuth 2.0-autoriseringservere som håndterte brukerautentisering direkte
- **Nåværende standard (2025-11-25)**: Oppdatert spesifikasjon tillater MCP-servere å delegere autentisering til eksterne identitetsleverandører (som Microsoft Entra ID), som forbedrer sikkerhetsposisjon og reduserer implementeringskompleksitet
- **Transport Layer Security**: Forbedret støtte for sikre transportmekanismer med riktige autentiseringsmønstre for både lokale (STDIO) og eksterne (Streamable HTTP) tilkoblinger

## Autentisering & autorisasjonssikkerhet

### Nåværende sikkerhetsutfordringer

Moderne MCP-implementasjoner møter flere autentiserings- og autorisasjonsutfordringer:

### Risikoer & trusselvektorer

- **Feilkonfigurert autorisasjonslogikk**: Feilaktig autorisasjonsimplementering i MCP-servere kan eksponere sensitive data og feilaktig anvende tilgangskontroller
- **OAuth-token-kompromittering**: Lokal token-tyveri fra MCP-server gjør at angripere kan utgi seg for servere og få tilgang til nedstrøms tjenester
- **Token-passthrough-sårbarheter**: Feil tokenhåndtering skaper omgåelser av sikkerhetskontroller og ansvarlighetsbrudd
- **Overdrevne tillatelser**: Overprivilegierte MCP-servere bryter minste privilegium-prinsippet og utvider angrepsflaten

#### Token Passthrough: Et kritisk anti-mønster

**Token passthrough er eksplisitt forbudt** i nåværende MCP-autorisasjonsspesifikasjon på grunn av alvorlige sikkerhetskonsekvenser:

##### Omgåelse av sikkerhetskontroller
- MCP-servere og nedstrøms API-er implementerer kritiske sikkerhetskontroller (ratebegrensning, forespørselvalidering, trafikkovervåking) som avhenger av korrekt tokenvalidering
- Direkte klient-til-API token-bruk omgår disse nødvendige beskyttelsene, og undergraver sikkerhetsarkitekturen

##### Problemstillinger med ansvarlighet og revisjon  
- MCP-servere kan ikke skille mellom klienter som bruker token utstedt av upstream, noe som bryter revisjonssporene
- Nedstrøms ressursserverlogger viser misvisende forespørselsopphav i stedet for faktiske MCP-server-mellommenn
- Hendelsesetterforskning og samsvarsauditering blir betydelig vanskeligere

##### Risiko for datautvinning
- Uvaliderte token-påstander tillater ondsinnede aktører med stjålne token å bruke MCP-servere som proxy for datautvinning
- Brudd på tillitsgrenser åpner for uautorisert tilgang som omgår tiltenkte sikkerhetskontroller

##### Angrepsvektorer mot flere tjenester
- Kompromitterte token som godtas av flere tjenester muliggjør lateral bevegelse over tilkoblede systemer
- Tillitsforutsetninger mellom tjenester kan brytes når token-opprinnelse ikke kan verifiseres

### Sikkerhetskontroller & mottiltak

**Kritiske sikkerhetskrav:**

> **PÅLAGT**: MCP-servere **MÅ IKKE** akseptere noen token som ikke eksplisitt er utstedt for MCP-serveren

#### Autentiserings- og autorisasjonskontroller

- **Grundig autorisasjonsgjennomgang**: Gjennomfør omfattende revisjoner av MCP-serverens autorisasjonslogikk for å sikre at bare tiltenkte brukere og klienter får tilgang til sensitive ressurser
  - **Implementeringsveiledning**: [Azure API Management som autentiserings-gateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegrasjon**: [Bruke Microsoft Entra ID for MCP-serverautentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sikker tokenhåndtering**: Implementer [Microsofts beste praksis for tokenvalidering og livssyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider at token-målgruppekrav samsvarer med MCP-serveridentitet
  - Implementer riktig tokenrotasjon og utløpspolitikk
  - Forhindre token-gjenspillangrep og uautorisert bruk

- **Beskyttet tokenlagring**: Sikre tokenlagring med kryptering både i hvile og under overføring
  - **Beste praksis**: [Retningslinjer for sikker tokenlagring og kryptering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementering av tilgangskontroll

- **Prinsippet om minste privilegium**: Gi MCP-servere kun minimumstillatelser som kreves for tiltenkt funksjonalitet
  - Regelmessige gjennomganger og oppdateringer av tillatelser for å forhindre privilegiekryp
  - **Microsoft-dokumentasjon**: [Sikker minsteprivilegiert tilgang](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollebasert tilgangskontroll (RBAC)**: Implementer finmasket rollefordeling
  - Avgrens roller strengt til spesifikke ressurser og handlinger
  - Unngå brede eller unødvendige tillatelser som utvider angrepsflaten

- **Kontinuerlig tillatelsestilsyn**: Implementer løpende revisjon og overvåking av tilgang
  - Overvåk mønstre av tillatelsesbruk for avvik
  - Raskt rette opp overdrevne eller ubrukte privilegier

## AI-spesifikke sikkerhetstrusler

### Prompt-injeksjon & verktøymanipulasjonsangrep

Moderne MCP-implementasjoner møter sofistikerte AI-spesifikke angrepsvektorer som tradisjonelle sikkerhetstiltak ikke fullt ut kan adressere:

#### **Indirekte prompt-injeksjon (Tverrdomenes prompt-injeksjon)**

**Indirekte prompt-injeksjon** representerer en av de mest kritiske sårbarhetene i MCP-aktiverte AI-systemer. Angripere skjuler ondsinnede instrukser i eksternt innhold—dokumenter, nettsider, e-poster eller datakilder—som AI-systemer deretter behandler som legitime kommandoer.

**Angrepsscenarioer:**
- **Dokumentbasert injeksjon**: Ondsinnede instrukser skjult i behandlede dokumenter som utløser utilsiktede AI-handlinger
- **Utnyttelse av webinnhold**: Kompromitterte nettsider med innebygde prompts som manipulerer AI-oppførsel ved innhøsting
- **E-postbaserte angrep**: Ondsinnede prompts i e-post som får AI-assistenter til å lekke informasjon eller utføre uautoriserte handlinger
- **Kontaminering av datakilder**: Kompromitterte databaser eller API-er som leverer forurenset innhold til AI-systemer

**Reell påvirkning**: Disse angrepene kan føre til datautvinning, brudd på personvern, generering av skadelig innhold og manipulering av brukerinteraksjoner. For detaljert analyse, se [Prompt Injection i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/no/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktøyforgiftning-angrep**

**Verktøyforgiftning** retter seg mot metadata som definerer MCP-verktøy, ved å utnytte hvordan store språkmodeller tolker verktøybeskrivelser og parametere for å ta utførelsesbeslutninger.

**Angrepsmekanismer:**
- **Manipulering av metadata**: Angripere injiserer ondsinnede instrukser i verktøybeskrivelser, parameterdefinisjoner eller bruks-eksempler
- **Usynlige instruksjoner**: Skjulte prompts i verktøymetadata som prosesseres av AI-modeller, men er usynlige for mennesker
- **Dynamisk verktøymodifikasjon ("Rug Pulls")**: Verktøy godkjent av brukere modifiseres senere for å utføre ondsinnede handlinger uten brukerens kjennskap
- **Parameterinjeksjon**: Ondsinnet innhold innebygd i verktøyparameterskjemaer som påvirker modellens atferd
**Vert serverrisiko**: Fjern-MCP-servere utgjør forhøyede risikoer ettersom verktøydefinisjoner kan oppdateres etter første brukeraksept, noe som skaper scenarioer der tidligere trygge verktøy blir ondsinnede. For en omfattende analyse, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/no/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligere AI-angrepsvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerte angrep som utnytter innhold fra flere domener for å omgå sikkerhetskontroller
- **Dynamisk kapasitetsmodifikasjon**: Endringer i verktøykapasiteter i sanntid som unnslipper initielle sikkerhetsvurderinger
- **Context Window-forgiftning**: Angrep som manipulerer store kontekstvinduer for å skjule ondsinnede instruksjoner
- **Model Confusion Angrep**: Utnyttelse av modellbegrensninger for å skape uforutsigbare eller usikre oppførsler


### AI Sikkerhetsrisiko Påvirkning

**Konsekvenser med høy påvirkning:**
- **Datautvinning**: Uautorisert tilgang og tyveri av sensitiv bedrifts- eller persondata
- **Personvernbrudd**: Eksponering av personlig identifiserbar informasjon (PII) og konfidensielle forretningsdata  
- **Systemmanipulasjon**: Utilsiktede endringer i kritiske systemer og arbeidsflyter
- **Tyveri av legitimasjon**: Kompromittering av autentiseringstokener og tjenestekredentialer
- **Laterale bevegelser**: Bruk av kompromitterte AI-systemer som pivoter for bredere nettverksangrep

### Microsoft AI Sikkerhetsløsninger

#### **AI Prompt Shields: Avansert beskyttelse mot injeksjonsangrep**

Microsoft **AI Prompt Shields** gir omfattende forsvar mot både direkte og indirekte prompt-injeksjonsangrep gjennom flere sikkerhetslag:

##### **Kjernemekanismar for beskyttelse:**

1. **Avansert deteksjon og filtrering**
   - Maskinlæringsalgoritmer og NLP-teknikker oppdager ondsinnede instruksjoner i eksternt innhold
   - Sanntidsanalyse av dokumenter, nettsider, e-poster og datakilder for innebygde trusler
   - Kontekstuell forståelse av legitime versus ondsinnede prompt-mønstre

2. **Spotlighting-teknikker**  
   - Skiller mellom betrodde systeminstruksjoner og potensielt kompromitterte eksterne input
   - Teksttransformasjonsmetoder som forbedrer modellrelevans samtidig som ondsinnet innhold isoleres
   - Hjelper AI-systemer å opprettholde korrekt instruksjonshierarki og ignorere injiserte kommandoer

3. **Avgrensnings- og datamerkingssystemer**
   - Eksplisitt grense-definisjon mellom betrodde systemmeldinger og ekstern inputtekst
   - Spesielle markører som fremhever grenser mellom betrodde og ikke-betrodd datakilder
   - Tydelig separasjon som forhindrer instruksjonsforvirring og uautorisert kommandoeksekvering

4. **Kontinuerlig trusselinformasjon**
   - Microsoft overvåker kontinuerlig fremvoksende angrepsmønstre og oppdaterer forsvar
   - Proaktiv trusseljakt etter nye injeksjonsteknikker og angrepsvektorer
   - Jevnlige oppdateringer av sikkerhetsmodeller for å opprettholde effektivitet mot utviklende trusler

5. **Azure Content Safety-integrasjon**
   - Del av den omfattende Azure AI Content Safety-pakken
   - Ytterligere deteksjon for jailbreak-forsøk, skadelig innhold og sikkerhetspolicybrudd
   - Enhetlige sikkerhetskontroller på tvers av AI-applikasjonskomponenter

**Implementeringsressurser**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/no/prompt-shield.ff5b95be76e9c78c.webp)


## Avanserte MCP Sikkerhetstrusler

### Sårbarheter ved overtakelse av økt

**Session hijacking** representerer en kritisk angrepsvektor i stateful MCP-implementasjoner hvor uautoriserte parter får tak i og misbruker legitime øktidentifikatorer for å utgi seg for klienter og utføre uautoriserte handlinger.

#### **Angrepsscenarioer og risikoer**

- **Session Hijack Prompt Injection**: Angripere med stjålne økt-IDer injiserer ondsinnede hendelser i servere som deler øktstatus, hvilket kan utløse skadelige handlinger eller tilgang til sensitiv data
- **Direkte umyndiggjøring**: Stjålne økt-IDer muliggjør direkte MCP-serverkall som omgår autentisering, og behandler angripere som legitime brukere
- **Kompromitterte gjenopptakbare strømmer**: Angripere kan avslutte forespørsler tidlig, slik at legitime klienter gjenopptar med potensielt ondsinnelig innhold

#### **Sikkerhetskontroller for økthåndtering**

**Kritiske krav:**
- **Autorisasjonsverifisering**: MCP-servere som implementerer autorisasjon **MÅ** verifisere ALLE innkommende forespørsler og **SKAL IKKE** stole på økter for autentisering
- **Sikker øktgenerering**: Bruk kryptografisk sikre, ikke-deterministiske økt-IDer generert med sikre tilfeldig tallgeneratorer
- **Brukerspesifikk binding**: Bind økt-IDer til brukerspesifikk informasjon med formater som `<user_id>:<session_id>` for å forhindre øktmisbruk på tvers av brukere
- **Livssyklus for økter**: Implementer korrekt utløp, rotasjon og ugyldiggjøring for å begrense sårbarhetsvinduer
- **Transport-sikkerhet**: Obligatorisk HTTPS for all kommunikasjon for å forhindre avlytting av økt-IDer

### Confused Deputy-problemet

**Confused deputy-problemet** oppstår når MCP-servere fungerer som autentiseringsproxyer mellom klienter og tredjepartstjenester, noe som gir muligheter for autorisasjonsomgåelse via utnyttelse av statiske klient-IDer.

#### **Angrepsmekanismer og risikoer**

- **Cookie-basert samtykkeomgåelse**: Tidligere brukerautentisering lager samtykkecookies som angripere utnytter gjennom ondsinnede autorisasjonsforespørsler med manipulerte omdirigerings-URI-er
- **Tyveri av autorisasjonskode**: Eksisterende samtykkecookies kan føre til at autorisasjonsservere hopper over samtykkeskjermene, og koder videresendes til angriperkontrollerte endepunkter  
- **Uautorisert API-tilgang**: Stjålne autorisasjonskoder muliggjør tokenutveksling og brukeretterligning uten eksplisitt godkjenning

#### **Avbøtende tiltak**

**Obligatoriske kontroller:**
- **Eksplisitte samtykkekrav**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente brukersamtykke for hver dynamisk registrerte klient
- **OAuth 2.1-sikkerhetsimplementasjon**: Følg gjeldende OAuth beste praksis inkludert PKCE (Proof Key for Code Exchange) for alle autorisasjonsforespørsler
- **Streng klientvalidering**: Implementer rigorøs validering av omdirigerings-URIer og klientidentifikatorer for å forhindre utnyttelse

### Sårbarheter ved token-videreformidling  

**Token passthrough** er et eksplisitt anti-mønster hvor MCP-servere aksepterer klienttoken uten tilstrekkelig validering og videresender dem til nedstrøms APIer, i strid med MCP-autorisasjonsspesifikasjoner.

#### **Sikkerhetsimplikasjoner**

- **Omgåelse av kontroll**: Direkte klient-til-API tokenbruk omgår viktige grenseverdier for ratebegrensning, validering og overvåking
- **Korrupsjon av revisjonsspor**: Token utstedt oppstrøms gjør klientidentifikasjon umulig, og bryter hendelsesundersøkelsesevner
- **Proxy-basert datautvinning**: Uvaliderte token tillater ondsinnede aktører å bruke servere som proxyer for uautorisert dataadgang
- **Brudd på tillitsgrenser**: Nedstrøms tjenester bryter sine tillitsantakelser når token-opphav ikke kan verifiseres
- **Utvidelse av angrep til flere tjenester**: Kompromitterte token akseptert i flere tjenester muliggjør laterale bevegelser

#### **Påkrevde sikkerhetskontroller**

**Ikke-forhandlingsbare krav:**
- **Tokenvalidering**: MCP-servere **MÅ IKKE** akseptere token som ikke eksplisitt er utstedt for MCP-serveren
- **Verifisering av publikum**: Alltid valider token-publikumskrav mot MCP-serverens identitet
- **Riktig tokenlivssyklus**: Implementer kortlivede tilgangstoken med sikre rotasjonsrutiner


## Forsyningskjedesikkerhet for AI-systemer

Forsyningskjedesikkerhet har utviklet seg utover tradisjonelle programvareavhengigheter til å omfatte hele AI-økosystemet. Moderne MCP-implementasjoner må grundig verifisere og overvåke alle AI-relaterte komponenter, da hver av disse introduserer potensielle sårbarheter som kan kompromittere systemintegriteten.

### Utvidede AI-komponenter i forsyningskjeden

**Tradisjonelle programvareavhengigheter:**
- Open source-biblioteker og rammeverk
- Containerbilder og basesystemer  
- Utviklingsverktøy og byggekjedepipelines
- Infrastrukturkomponenter og -tjenester

**AI-spesifikke forsyningskjedeelementer:**
- **Foundation Models**: Fortrente modeller fra ulike leverandører som krever proveniensverifisering
- **Embedding-tjenester**: Eksterne vektoriserings- og semantiske søketjenester
- **Kontekstleverandører**: Datakilder, kunnskapsbaser og dokumentarkiver  
- **Tredjeparts-APIer**: Eksterne AI-tjenester, ML-pipelines og dataprosesseringsendepunkt
- **Modellartefakter**: Vekter, konfigurasjoner og finjusterte modellvarianter
- **Treningsdatasett**: Datasett brukt for modelltrening og finjustering

### Omfattende sikkerhetsstrategi for forsyningskjeden

#### **Komponentverifisering og tillit**
- **Proveniensvalidering**: Verifiser opprinnelse, lisenser og integritet for alle AI-komponenter før integrasjon
- **Sikkerhetsvurdering**: Utfør sårbarhetsskanninger og sikkerhetsgjennomganger for modeller, datakilder og AI-tjenester
- **Omdømmeanalyse**: Evaluer sikkerhetsspor og praksis hos AI-tjenesteleverandører
- **Samsvarsverifisering**: Sørg for at alle komponenter møter organisatoriske sikkerhets- og regulatoriske krav

#### **Sikre distribusjonspipelines**  
- **Automatisert CI/CD-sikkerhet**: Integrer sikkerhetsskanning i automatiserte distribusjonspipelines
- **Integritet for artefakter**: Implementer kryptografisk verifisering for alle deployerte artefakter (kode, modeller, konfigurasjoner)
- **Stegvis utrulling**: Bruk progressive distribusjonsstrategier med sikkerhetsvalidering i hvert steg
- **Betrodde artefakt-repositorier**: Distribuer kun fra verifiserte, sikre arkiv og repositorier

#### **Kontinuerlig overvåkning og respons**
- **Avhengighetsskanning**: Kontinuerlig overvåking av sårbarheter for alle programvare- og AI-komponentavhengigheter
- **Modellovervåkning**: Kontinuerlig vurdering av modelladferd, ytelsesavvik og sikkerhetsanomalier
- **Tjenestehelse-overvåkning**: Overvåk eksterne AI-tjenester for tilgjengelighet, sikkerhetshendelser og policyendringer
- **Trusselinformasjonsintegrasjon**: Inkorporer trusselstrømmer spesifikke for AI og ML-sikkerhetsrisikoer

#### **Tilgangskontroll og minste privilegium**
- **Komponentnivå-tillatelser**: Begrens tilgang til modeller, data og tjenester basert på forretningsbehov
- **Tjenestekonto-administrasjon**: Implementer dedikerte tjenestekontoer med minimale nødvendige rettigheter
- **Nettverkssegmentering**: Isoler AI-komponenter og begrens nettverkstilgang mellom tjenester
- **API-gateway-kontroller**: Bruk sentraliserte API-gatewayer for å kontrollere og overvåke tilgang til eksterne AI-tjenester

#### **Hendelsesrespons og gjenoppretting**
- **Rask responsprosedyrer**: Etablerte prosesser for patching eller utskiftning av kompromitterte AI-komponenter
- **Roteringsrutiner for legitimasjon**: Automatiserte systemer for rotasjon av hemmeligheter, API-nøkler og tjenestekredentialer
- **Rollback-muligheter**: Evne til raskt å returnere til tidligere kjente gode versjoner av AI-komponenter
- **Gjenoppretting etter forsyningskjedeangrep**: Spesifikke prosedyrer for håndtering av kompromittering av oppstrøms AI-tjenester

### Microsoft Sikkerhetsverktøy og integrasjon

**GitHub Advanced Security** gir omfattende forsyningskjedebeskyttelse inkludert:
- **Secret Scanning**: Automatisk deteksjon av legitimasjon, API-nøkler og token i repositorier
- **Dependency Scanning**: Sårbarhetsvurdering for open source-avhengigheter og biblioteker
- **CodeQL-analyse**: Statisk kodeanalyse for sikkerhetssårbarheter og kodeproblemer
- **Supply Chain Insights**: Innsikt i helsen og sikkerhetsstatus for avhengigheter

**Azure DevOps & Azure Repos-integrasjon:**
- Sømløs sikkerhetsskanning på tvers av Microsofts utviklingsplattformer
- Automatiserte sikkerhetssjekker i Azure Pipelines for AI-arbeidsmengder
- Politikkhåndhevelse for sikker distribusjon av AI-komponenter

**Microsofts interne praksis:**
Microsoft implementerer omfattende forsyningskjedesikkerhetsrutiner i alle produkter. Les om dokumenterte tilnærminger i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Grunnleggende sikkerhetspraksiser

MCP-implementasjoner arver og bygger på organisasjonens eksisterende sikkerhetsinnsats. Styrking av grunnleggende sikkerhetspraksis øker betydelig den totale sikkerheten for AI-systemer og MCP-distribusjoner.

### Kjernesikkerhetsfundamenter

#### **Sikre utviklingspraksiser**
- **OWASP-samsvar**: Beskytt mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) sårbarheter i webapplikasjoner
- **AI-spesifikke beskyttelser**: Implementer kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Sikker hemmelighetshåndtering**: Bruk dedikerte hvelv for token, API-nøkler og sensitiv konfigurasjonsdata
- **Ende-til-ende-kryptering**: Implementer sikre kommunikasjoner på tvers av alle applikasjonskomponenter og dataflyter
- **Inputvalidering**: Grundig validering av alle brukerinput, API-parametere og datakilder

#### **Infrastrukturherding**
- **Multifaktorautentisering**: Obligatorisk MFA for alle administrative og tjenestekontoer
- **Patchstyring**: Automatisert, tidsriktig oppdatering for operativsystemer, rammeverk og avhengigheter  
- **Identitetsleverandør-integrasjon**: Sentralisert identitetsstyring via bedriftsidentitetsleverandører (Microsoft Entra ID, Active Directory)
- **Nettverkssegmentering**: Logisk isolasjon av MCP-komponenter for å begrense lateral bevegelse
- **Minste privilegium-prinsippet**: Minste nødvendige tillatelser for alle systemkomponenter og kontoer

#### **Sikkerhetsovervåkning og deteksjon**
- **Omfattende logging**: Detaljert logging av AI-applikasjonsaktiviteter, inkludert MCP klient-server-interaksjoner
- **SIEM-integrasjon**: Sentralisert sikkerhetsinformasjon og hendelseshåndtering for anomalidetektering
- **Adferdsanalyse**: AI-drevet overvåking for å oppdage uvanlige mønstre i system- og brukeradferd
- **Trusselinformasjon**: Integrasjon av eksterne trusselstrømmer og kompromissindikatorer (IOCs)
- **Hendelsesrespons**: Veldefinerte prosedyrer for deteksjon, respons og gjenoppretting ved sikkerhetshendelser

#### **Zero Trust-arkitektur**
- **Aldri stol på, alltid verifiser**: Kontinuerlig verifisering av brukere, enheter og nettverkstilkoblinger
- **Mikrosegmentering**: Granulære nettverkskontroller som isolerer individuelle arbeidsbelastninger og tjenester
- **Identitetssentrisk sikkerhet**: Sikkerhetspolicyer basert på verifiserte identiteter i stedet for nettverksplassering
- **Kontinuerlig risikovurdering**: Dynamisk evaluering av sikkerhetsposisjon basert på nåværende kontekst og adferd
- **Betinget tilgang**: Tilgangskontroller som tilpasses basert på risikofaktorer, plassering og enhetstillit

### Mønstre for bedriftsintegrasjon

#### **Microsoft sikkerhetsekosystemintegrasjon**
- **Microsoft Defender for Cloud**: Omfattende styring av sikkerhetsstilling i skyen
- **Azure Sentinel**: Sky-native SIEM og SOAR-funksjoner for beskyttelse av AI-arbeidsmengder
- **Microsoft Entra ID**: Bedriftsidentitets- og tilgangsstyring med betingede tilgangspolicyer
- **Azure Key Vault**: Sentralisert hemmelighetshåndtering med støtte for hardware security module (HSM)
- **Microsoft Purview**: Datastyring og samsvar for AI-datakilder og arbeidsflyter

#### **Samsvar og styring**
- **Regulatorisk samsvar**: Sørg for at MCP-implementasjoner møter bransjespesifikke krav til samsvar (GDPR, HIPAA, SOC 2)
- **Dataklassifisering**: Riktig kategorisering og håndtering av sensitiv data som behandles av AI-systemer  
- **Revisjonsspor**: Omfattende logging for regulatorisk etterlevelse og rettsmedisinsk etterforskning  
- **Personvernkontroller**: Implementering av personvern-som-standard-prinsipper i AI-systemarkitektur  
- **Endringshåndtering**: Formelle prosesser for sikkerhetsgjennomganger av modifikasjoner i AI-systemer  

Disse grunnleggende praksisene skaper en robust sikkerhetsbase som forbedrer effektiviteten til MCP-spesifikke sikkerhetskontroller og gir omfattende beskyttelse for AI-drevne applikasjoner.

## Viktige sikkerhetslærdommer

- **Lagvis sikkerhetstilnærming**: Kombiner grunnleggende sikkerhetspraksiser (sikker koding, minste privilegium, leverandørkjedeverifisering, kontinuerlig overvåking) med AI-spesifikke kontroller for omfattende beskyttelse  

- **AI-spesifikt trussellandskap**: MCP-systemer står overfor unike risikoer inkludert promptinjeksjon, verktøyforgiftning, øktaksskapring, forvirret representant-problemer, token-gjennomgangssårbarheter og overdrevne tillatelser som krever spesialiserte mottiltak  

- **Fremragende autentisering og autorisasjon**: Implementer robust autentisering ved bruk av eksterne identitetsleverandører (Microsoft Entra ID), håndhev korrekt token-validering, og godta aldri tokens som ikke eksplisitt er utstedt for din MCP-server  

- **Forebygging av AI-angrep**: Bruk Microsoft Prompt Shields og Azure Content Safety for å forsvare mot indirekte promptinjeksjon og verktøyforgiftning, samtidig som du validerer verktøymetadata og overvåker dynamiske endringer  

- **Sesjons- og transport-sikkerhet**: Bruk kryptografisk sikre, ikke-deterministiske sesjons-IDer bundet til brukeridentiteter, implementer korrekt sesjonslivssyklusadministrasjon, og bruk aldri sesjoner til autentisering  

- **Beste praksis for OAuth-sikkerhet**: Forebygg confused deputy-angrep gjennom eksplisitt brukersamtykke for dynamisk registrerte klienter, korrekt OAuth 2.1-implementering med PKCE, og streng validering av redirect-URI  

- **Token-sikkerhetsprinsipper**: Unngå token-gjennomstrømnings-anti-mønstre, valider tokenets audience-krav, implementer kortlivede tokens med sikker rotering, og oppretthold tydelige tillitsgrenser  

- **Omfattende leverandørkjede-sikkerhet**: Behandle alle AI-økosystemkomponenter (modeller, embeddings, kontekstleverandører, eksterne API-er) med samme sikkerhetshøyde som tradisjonelle programvareavhengigheter  

- **Kontinuerlig utvikling**: Hold deg oppdatert på raskt utviklende MCP-spesifikasjoner, bidra til sikkerhetssamfunnets standarder, og oppretthold adaptive sikkerhetsposisjoner etter hvert som protokollen modnes  

- **Microsoft sikkerhetsintegrasjon**: Dra nytte av Microsofts omfattende sikkerhetsekosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for forbedret beskyttelse ved MCP-distribusjoner  

## Omfattende ressurser

### **Offisiell MCP-sikkerhetsdokumentasjon**  
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)  

### **OWASP MCP sikkerhetsressurser**  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med Azure-implementeringsveiledning  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Offisielle OWASP MCP sikkerhetsrisikoer  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk sikkerhetstrening for MCP på Azure  

### **Sikkerhetsstandarder og beste praksis**  
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)  
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [Microsoft Digital Defense Report](https://aka.ms/mddr)  

### **Forskning og analyse innen AI-sikkerhet**  
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

### **DevOps og leverandørkjedesikkerhet**  
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)  
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)  
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## **Ytterligere sikkerhetsdokumentasjon**

For omfattende sikkerhetsveiledning, se disse spesialiserte dokumentene i denne seksjonen:  

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Fullstendige sikkerhetsbeste praksiser for MCP-implementasjoner  
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementeringseksempler for integrering av Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Nyeste sikkerhetskontroller og teknikker for MCP-distribusjoner  
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Rask referanseguide for essensielle MCP sikkerhetspraksiser  
- **[BlueHat 2026: Sikre AI-ens fremtid: Sikring av MCP med forsvar-i-dybden-mønstre](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Forsvar-i-dybden-mønstre fra Microsoft Security Response Center (MSRC)  

### **Praktisk sikkerhetstrening**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop for sikring av MCP-servere i Azure med progresjon fra Base Camp til Summit  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referansearkitektur og implementeringsveiledning for alle OWASP MCP Top 10 risikoer  

---

## Hva skjer videre

Neste: [Kapittel 3: Komme i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->