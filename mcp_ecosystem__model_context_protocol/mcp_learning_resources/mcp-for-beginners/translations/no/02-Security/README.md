# MCP-sikkerhet: Omfattende beskyttelse for AI-systemer

[![MCP Security Best Practices](../../../translated_images/no/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klikk på bildet ovenfor for å se video av denne leksjonen)_

Sikkerhet er grunnleggende i design av AI-systemer, derfor prioriterer vi det som vår andre seksjon. Dette samsvarer med Microsofts prinsipp **Secure by Design** fra [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) gir kraftige nye muligheter til AI-drevne applikasjoner samtidig som det introduserer unike sikkerhetsutfordringer som strekker seg utover tradisjonelle programvarerisikoer. MCP-systemer møter både etablerte sikkerhetsbekymringer (sikker koding, minste privilegium, leverandørkjede-sikkerhet) og nye AI-spesifikke trusler inkludert prompt-injeksjon, verktøyforgiftning, kapring av økter, confused deputy-angrep, sårbarheter knyttet til token-passthrough, og dynamisk endring av kapasiteter.

Denne leksjonen utforsker de mest kritiske sikkerhetsrisikoene i MCP-implementasjoner—omfatter autentisering, autorisering, overdrevne tillatelser, indirekte prompt-injeksjon, øktersikkerhet, confused deputy-problemer, tokenhåndtering og leverandørkjede-sårbarheter. Du vil lære om handlingsrettede kontroller og beste praksis for å redusere disse risikoene samtidig som du utnytter Microsoft-løsninger som Prompt Shields, Azure Content Safety og GitHub Advanced Security for å styrke din MCP-distribusjon.

## Læringsmål

Innen slutten av denne leksjonen vil du kunne:

- **Identifisere MCP-spesifikke trusler**: Gjenkjenne unike sikkerhetsrisikoer i MCP-systemer inkludert prompt-injeksjon, verktøyforgiftning, overdrevne tillatelser, kapring av økter, confused deputy-problemer, token-passthrough-sårbarheter og leverandørkjede-risikoer
- **Anvende sikkerhetskontroller**: Iverksette effektive tiltak inklusive robust autentisering, minste privilegium-tilgang, sikker tokenhåndtering, kontroller for øktersikkerhet og leverandørkjedeverifisering
- **Utnytte Microsoft sikkerhetsløsninger**: Forstå og implementere Microsoft Prompt Shields, Azure Content Safety og GitHub Advanced Security for beskyttelse av MCP-arbeidsmengder
- **Validere verktøysikkerhet**: Erfare viktigheten av validering av verktøymetadata, overvåking for dynamiske endringer og forsvar mot indirekte prompt-injeksjonsangrep
- **Integrere beste praksis**: Kombinere etablerte sikkerhetsfundament (sikker koding, serverherding, zero trust) med MCP-spesifikke kontroller for omfattende beskyttelse

# MCP-sikkerhetsarkitektur og kontroller

Moderne MCP-implementasjoner krever lagdelte sikkerhetstilnærminger som adresserer både tradisjonell programvaresikkerhet og AI-spesifikke trusler. Den raskt utviklende MCP-spesifikasjonen modnes kontinuerlig sine sikkerhetskontroller, noe som muliggjør bedre integrasjon med bedriftsikkerhetsarkitekturer og etablerte beste praksiser.

Forskning fra [Microsoft Digital Defense Report](https://aka.ms/mddr) viser at **98 % av rapporterte brudd ville vært forhindret med robust sikkerhetshygiene**. Den mest effektive beskyttelsesstrategien kombinerer grunnleggende sikkerhetspraksis med MCP-spesifikke kontroller—beviste grunnleggende sikkerhetstiltak forblir de mest virkningsfulle i å redusere total sikkerhetsrisiko.

## Dagens sikkerhetslandskap

> **Merk:** Denne informasjonen gjenspeiler MCP-sikkerhetsstandarder per **5. februar 2026**, i samsvar med **MCP Specification 2025-11-25**. MCP-protokollen utvikler seg raskt, og fremtidige implementasjoner kan introdusere nye autentiseringsmønstre og forbedrede kontroller. Se alltid gjeldende [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol), og [security best practices documentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) for siste veiledning.

## 🏔️ MCP Security Summit Workshop (Sherpa)

For **praktisk sikkerhetstrening** anbefaler vi sterkt **MCP Security Summit Workshop** (Sherpa)—en omfattende guidet ekspedisjon for å sikre MCP-servere i Microsoft Azure.

### Workshop Oversikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) tilbyr praktisk, handlingsrettet sikkerhetstrening gjennom en bevist «sårbar → utnytt → fiks → valider» metodikk. Du vil:

- **Lære ved å bryte ting**: Oppleve sårbarheter på nært hold ved å utnytte bevisst usikre servere
- **Bruke Azure-native sikkerhetstjenester**: Utnytte Azure Entra ID, Key Vault, API Management og AI Content Safety
- **Følge forsvar-i-dybden prinsippet**: Progresjon gjennom leirer som bygger omfattende sikkerhetslag
- **Anvende OWASP-standarden**: Hver teknikk knyttes til [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produksjonsklar kode**: Gå bort med fungerende, testede implementasjoner

### Ekspedisjonsruten

| Leir | Fokus | OWASP-risikoer dekket |
|------|-------|-----------------------|
| **Base Camp** | MCP-grunnprinsipper & autentiserings-sårbarheter | MCP01, MCP07 |
| **Leir 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Leir 2: Gateway** | API Management, Private Endpoints, styring | MCP02, MCP06, MCP07, MCP09 |
| **Leir 3: I/O-sikkerhet** | Prompt-injeksjon, PII-beskyttelse, innholdssikkerhet | MCP03, MCP05, MCP06, MCP10 |
| **Leir 4: Overvåking** | Logganalyse, dashboards, trusseldeteksjon | MCP04, MCP08 |
| **Toppmøtet** | Red Team / Blue Team integrasjonstest | Alle |

**Kom i gang**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 sikkerhetsrisikoer

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de ti mest kritiske sikkerhetsrisikoene for MCP-implementasjoner:

| Risiko | Beskrivelse | Azure-mitigasjon |
|--------|-------------|------------------|
| **MCP01** | Token-feilhåndtering & eksponering av hemmeligheter | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalering av privilegier via utvidet omfang | RBAC, Betinget tilgang |
| **MCP03** | Verktøyforgiftning | Verktøyvalidering, integritetsverifisering |
| **MCP04** | Programvareleverandørkjede-angrep & manipulasjon av avhengigheter | GitHub Advanced Security, avhengighetsskanning |
| **MCP05** | Kommandoinjeksjon & utførelse | Inndata-validering, sandboxing |
| **MCP06** | Omdirigering av intensjonsflyt | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Utilstrekkelig autentisering & autorisering | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Manglende revisjon og telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skygge-MCP-servere | API Center governance, nettverksisolasjon |
| **MCP10** | Kontekstinjeksjon & overdreven deling | Dataklassifisering, minimal eksponering |

### Utvikling av MCP-autentisering

MCP-spesifikasjonen har utviklet seg betydelig i sin tilnærming til autentisering og autorisering:

- **Opprinnelig tilnærming**: Tidlige spesifikasjoner krevde at utviklere implementerte egendefinerte autentiseringsservere, hvor MCP-servere fungerte som OAuth 2.0 autorisasjonsservere og håndterte brukerautentisering direkte
- **Nåværende standard (2025-11-25)**: Oppdatert spesifikasjon tillater MCP-servere å delegere autentisering til eksterne identitetsleverandører (som Microsoft Entra ID), noe som forbedrer sikkerhetsstilling og reduserer implementeringskompleksitet
- **Transport Layer Security**: Forbedret støtte for sikre overføringsmekanismer med korrekt autentiseringsmønster for både lokale (STDIO) og eksterne (Streamable HTTP) tilkoblinger

## Autentisering & Autorisasjonssikkerhet

### Dagens sikkerhetsutfordringer

Moderne MCP-implementasjoner møter flere utfordringer med autentisering og autorisasjon:

### Risikoer & trusselvektorer

- **Feilkonfigurert autorisasjonslogikk**: Feil i autorisasjonsimplementasjon i MCP-servere kan eksponere sensitive data og feilaktig anvende tilgangskontroller
- **OAuth-token kompromittering**: Tyveri av lokale MCP-server-tokens muliggjør angripere å utgi seg for servere og få tilgang til etterfølgende tjenester
- **Token-passthrough-sårbarheter**: Feilaktig token-håndtering skaper omgåelse av sikkerhetskontroller og manglende ansvarlighet
- **Overdrevne tillatelser**: Overprivilegerte MCP-servere bryter minste privilegium-prinsippet og øker angrepsflaten

#### Token-passthrough: Et kritisk anti-mønster

**Token-passthrough er eksplisitt forbudt** i gjeldende MCP-autorisasjonsspesifikasjon grunnet alvorlige sikkerhetsimplikasjoner:

##### Omgåelse av sikkerhetskontroller  
- MCP-servere og nedstrøms API-er implementerer kritiske sikkerhetskontroller (rate limiting, forespørselvalidering, trafikkovervåkning) basert på korrekt tokenvalidering  
- Direkte klient-til-API tokenbruk omgår disse essensielle beskyttelsene og undergraver sikkerhetsarkitekturen

##### Ansvarlighet & revisjonsutfordringer  
- MCP-servere kan ikke skille mellom klienter som bruker upstream-utstedte tokens, noe som bryter revisjonsspor  
- Nedstrøms ressurserverlogger viser misvisende forespørselsopprinnelse i stedet for faktiske MCP-server-mellomledd  
- Hendelsesundersøkelser og samsvarsrevisjoner blir betydelig vanskeligere

##### Risiko for dataeksfiltrasjon  
- Uvaliderte tokenpåstander gjør det mulig for ondsinnede aktører med stjålne tokens å bruke MCP-servere som proxy for dataeksfiltrasjon  
- Brudd på tillitsgrenser tillater uautorisert tilgangsmønstre som omgår tiltrodde sikkerhetskontroller

##### Angrep med flere tjenester  
- Kompromitterte tokens akseptert av flere tjenester muliggjør lateral bevegelse over tilkoblede systemer  
- Tillitsantakelser mellom tjenester kan bli brutt når tokenopprinnelse ikke kan verifiseres

### Sikkerhetskontroller & mitigeringer

**Kritiske sikkerhetskrav:**

> **OBLIGATORISK**: MCP-servere **SKAL IKKE** godta noen tokens som ikke eksplisitt er utstedt for MCP-serveren

#### Autentisering & autorisasjonskontroller

- **Grundig gjennomgang av autorisasjon**: Gjennomfør omfattende revisjoner av MCP-serveres autorisasjonslogikk for å sikre at kun tiltenkte brukere og klienter får tilgang til sensitive ressurser  
  - **Implementeringsguide**: [Azure API Management som autentiseringsgateway for MCP-servere](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Identitetsintegrasjon**: [Bruk av Microsoft Entra ID for MCP-serverautentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sikker tokenhåndtering**: Implementer [Microsofts beste praksis for tokenvalidering og livssyklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Valider at token sin audience matcher MCP-serverens identitet  
  - Implementer korrekt tokenrotasjon og utløpspolitikk  
  - Forhindre token replay-angrep og uautorisert bruk

- **Beskyttet tokenlagring**: Sikre tokenlagring med kryptering både i ro og under overføring  
  - **Beste praksis**: [Secure Token Storage and Encryption Guidelines](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementasjon av tilgangskontroll

- **Prinsippet om minste privilegium**: Gi MCP-servere kun minimalt nødvendige tillatelser for ønsket funksjonalitet  
  - Regelmessige tillatelsesgjennomganger og oppdateringer for å forhindre privilegiekrypning  
  - **Microsoft Dokumentasjon**: [Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollestyrt tilgangskontroll (RBAC)**: Implementer finmaskede rolleoppdrag  
  - Avgrens roller stramt til spesifikke ressurser og handlinger  
  - Unngå brede eller unødvendige tillatelser som utvider angrepsflate

- **L kontinuerlig overvåking av tillatelser**: Implementer løpende adgangsrevisjon og overvåkning  
  - Overvåk mønstre i tillatelsesbruk for avvik  
  - Rett opp overdrevne eller ubrukte privilegier raskt

## AI-spesifikke sikkerhetstrusler

### Prompt Injeksjon & Verktøymanipulasjonsangrep

Moderne MCP-implementasjoner møter sofistikerte AI-spesifikke angrepsvektorer som tradisjonelle sikkerhetstiltak ikke fullt ut kan motvirke:

#### **Indirekte Prompt Injeksjon (Tverrdomenepromptinjeksjon)**

**Indirekte Prompt Injeksjon** representerer en av de mest kritiske sårbarhetene i MCP-aktiverte AI-systemer. Angripere legger inn ondsinnede instrukser i eksternt innhold—dokumenter, nettsider, e-poster eller datakilder—som AI-systemer deretter behandler som legitime kommandoer.

**Angrepsscenarier:**  
- **Dokumentbasert injeksjon**: Ondsinnede instruksjoner skjult i bearbeidede dokumenter som utløser utilsiktede AI-handlinger  
- **Utnyttelse av webinnhold**: Kompromitterte nettsider med innebygde prompts som manipulerer AI-adferd ved innhenting  
- **E-postbaserte angrep**: Ondsinnede prompts i e-poster som får AI-assistenter til å lekke informasjon eller utføre uautoriserte handlinger  
- **Datakildeforurensning**: Kompromitterte databaser eller API-er som serverer forurenset innhold til AI-systemer

**Virkelige konsekvenser**: Disse angrepene kan føre til dataeksfiltrasjon, brudd på personvern, generering av skadelig innhold og manipulering av brukerinteraksjoner. For detaljert analyse, se [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/no/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktøyforgiftningangrep**

**Verktøyforgiftning** retter seg mot metadata som definerer MCP-verktøy, og utnytter hvordan store språkmodeller (LLMs) tolker verktøybeskrivelser og parametere for å fatte beslutninger om utførelse.

**Angrepsmekanismer:**  
- **Manipulasjon av metadata**: Angripere injiserer ondsinnede instruksjoner i verktøybeskrivelser, parameterdefinisjoner eller brukseksempler  
- **Usynlige instruksjoner**: Skjulte prompts i verktøymetadata som behandles av AI-modeller, men er usynlige for menneskelige brukere  
- **Dynamisk verktøymodifikasjon («Rug Pulls»)**: Verktøy godkjent av brukere modifiseres senere for å utføre ondsinnede handlinger uten brukerens viten  
- **Parameterinjeksjon**: Ondsinnet innhold innebygd i verktøyparametreskjemaer som påvirker modellens oppførsel

**Risiko for hostede servere**: Fjern-MCP-servere representerer økte risiki siden verktøydefinisjoner kan oppdateres etter initial brukeraksept, noe som skaper scenarier der tidligere trygge verktøy blir ondsinnede. For omfattende analyse, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/no/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligere AI-angrepsvektorer**

- **Tverrdomenepromptinjeksjon (XPIA)**: Sofistikerte angrep som utnytter innhold fra flere domener for å omgå sikkerhetskontroller
- **Dynamisk Endring av Funksjonalitet**: Endringer i verktøyfunksjoner i sanntid som unnslipper innledende sikkerhetsvurderinger  
- **Forgiftning av Kontekstvinduet**: Angrep som manipulerer store kontekstvinduer for å skjule skadelige instruksjoner  
- **Modellforvirringsangrep**: Utnyttelse av modellbegrensninger for å skape uforutsigbar eller usikker atferd  


### AI Sikkerhetsrisiko Effekter

**Høyt Impact Konsekvenser:**  
- **Dataeksfiltrasjon**: Uautorisert tilgang og tyveri av sensitive bedrifts- eller personopplysninger  
- **Personvernbrudd**: Eksponering av personlig identifiserbar informasjon (PII) og konfidensiell bedriftsdata  
- **Systemmanipulering**: Utilsiktede endringer i kritiske systemer og arbeidsflyter  
- **Kredentialtyveri**: Kompromittering av autentiseringstokener og tjenestekredentialer  
- **Lateral Bevegelse**: Bruk av kompromitterte AI-systemer som pivotpunkt for bredere nettverksangrep  

### Microsoft AI Sikkerhetsløsninger

#### **AI Prompt Shields: Avansert Beskyttelse mot Injeksjonsangrep**

Microsoft **AI Prompt Shields** gir omfattende forsvar mot både direkte og indirekte prompt-injeksjonsangrep gjennom flere sikkerhetslag:

##### **Kjernebeskyttelsesmekanismer:**

1. **Avansert Deteksjon & Filtrering**  
   - Maskinlæringsalgoritmer og NLP-teknikker oppdager skadelige instruksjoner i eksternt innhold  
   - Sanntidsanalyse av dokumenter, nettsider, e-poster og datakilder for innebygde trusler  
   - Kontekstuell forståelse av legitime vs. skadelige prompt-mønstre  

2. **Spotlighting-teknikker**  
   - Skiller mellom tillitsfulle systeminstruksjoner og potensielt kompromitterte eksterne inndata  
   - Teksttransformasjonsmetoder som forbedrer modellrelevans samtidig som de isolerer skadelig innhold  
   - Hjelper AI-systemer å opprettholde riktig instruksjonshierarki og ignorere injiserte kommandoer  

3. **Delimiter- & Datamerkingssystemer**  
   - Eksplisitt grense-definisjon mellom tillitsfulle systemmeldinger og ekstern inputtekst  
   - Spesielle markører som fremhever grenser mellom tillitsfulle og ikke-tillitsfulle datakilder  
   - Tydelig separasjon hindrer instruksjons-forvirring og uautorisert kommando-utførelse  

4. **Kontinuerlig Trusselintellegens**  
   - Microsoft overvåker kontinuerlig nye angrepsmønstre og oppdaterer forsvar  
   - Proaktiv trussejakt etter nye injeksjonsteknikker og angrepsvektorer  
   - Regelmessige sikkerhetsmodelloppdateringer for å opprettholde effektivitet mot utviklende trusler  

5. **Integrasjon med Azure Content Safety**  
   - En del av den omfattende Azure AI Content Safety-pakken  
   - Ekstra deteksjon for jailbreak-forsøk, skadelig innhold og brudd på sikkerhetspolicyer  
   - Enhetlige sikkerhetskontroller på tvers av AI-applikasjonskomponenter  

**Implementeringsressurser**: [Microsoft Prompt Shields Dokumentasjon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/no/prompt-shield.ff5b95be76e9c78c.webp)  


## Avanserte MCP Sikkerhetstrusler

### Sårbarheter ved Overtakelse av Økt (Session Hijacking)

**Session hijacking** representerer en kritisk angrepsvektor i stateful MCP-implementasjoner der uautoriserte parter får tak i og misbruker legitime økt-identifikatorer for å utgi seg for klienter og utføre uautoriserte handlinger.

#### **Angrepsscenarier & Risiko**

- **Øktovertakelses-promptinjeksjon**: Angripere med stjålne økt-IDer injiserer skadelige hendelser i servere som deler økttilstand, noe som potensielt kan utløse skadelige handlinger eller innhente sensitiv data  
- **Direkte Utgi Seg For Andre**: Stjålne økt-IDer muliggjør direkte MCP-serverkall som omgår autentisering, og behandler angripere som legitime brukere  
- **Kompromitterte Gjenvinnbare Strømmer**: Angripere kan uventet avslutte forespørsler, noe som får legitime klienter til å gjenoppta med potensielt skadelig innhold  

#### **Sikkerhetskontroller for Øktadministrasjon**

**Kritiske Krav:**  
- **Autoriseringverifisering**: MCP-servere som implementerer autorisering **MÅ** verifisere ALLE innkommende forespørsler og **MÅ IKKE** stole på økter for autentisering  
- **Sikker Øktgenerering**: Bruk kryptografisk sikre, ikke-deterministiske økt-IDer generert med sikre tilfeldige tallgeneratorer  
- **Brukerspesifikk Binding**: Bind økt-IDer til brukerspesifikk informasjon med formater som `<user_id>:<session_id>` for å forhindre misbruk av tversbruker-økter  
- **Øktlivssyklusadministrasjon**: Implementer riktig utløp, rotasjon og ugyldiggjøring for å begrense sårbarhetens tidsvinduer  
- **Transportssikkerhet**: Obligatorisk HTTPS for all kommunikasjon for å forhindre avlytting av økt-IDer  

### Forvirret Depot Problem (Confused Deputy Problem)

Problemet oppstår når MCP-servere fungerer som autentiseringsproxyer mellom klienter og tredjepartstjenester, og skaper muligheter for autorisasjonsomgåelse via utnyttelse av statiske klient-IDer.

#### **Angrepsmekanismer & Risiko**

- **Cookie-basert samtykkeomgåelse**: Tidligere brukerautentisering lager samtykkecookies som angripere utnytter gjennom ondsinnede autorisasjonsforespørsler med tilpassede redirect-URIer  
- **Tyveri av autorisasjonskode**: Eksisterende samtykkecookies kan få autorisasjonsservere til å hoppe over samtykkeskjermbilder, og sende koder til angriperstyrte endepunkter  
- **Uautorisert API-tilgang**: Stjålne autorisasjonskoder muliggjør tokenbytte og utgi seg for bruker uten eksplisitt godkjenning  

#### **Avbøtende Tiltak**

**Obligatoriske kontroller:**  
- **Eksplisitt samtykkekrav**: MCP-proxyservere som bruker statiske klient-IDer **MÅ** innhente brukerens samtykke for hver dynamisk registrerte klient  
- **OAuth 2.1 sikkerhetsimplementasjon**: Følg oppdaterte OAuth-sikkerhetspraksiser inklusive PKCE for alle autorisasjonsforespørsler  
- **Streng klientvalidering**: Implementer grundig validering av redirect-URIer og klientidentifikatorer for å forhindre utnyttelse  

### Sårbarheter ved Token Gjennompassing (Token Passthrough)  

**Token passthrough** er et uttrykkelig anti-mønster der MCP-servere aksepterer klienttoken uten korrekt validering og videresender dem til nedstrøms-APIer, noe som bryter med MCPs autorisasjonsspesifikasjoner.

#### **Sikkerhetsimplikasjoner**

- **Omgåelse av kontroller**: Direkte klient-til-API token bruk omgår viktige ratebegrensninger, validerings- og overvåkingskontroller  
- **Korrupsjon av revisjonsspor**: Tokens utstedt oppstrøms gjør klientidentifikasjon umulig og bryter hendelsesetterforskningsmuligheter  
- **Proxy-basert dataeksfiltrasjon**: Uvaliderte tokens gir ondsinnede aktører mulighet til å bruke servere som proxy for uautorisert data-tilgang  
- **Brudd på tillitsgrenser**: Nedstrøms tjenester kan få brutt sine oppfattede tillitsforutsetninger når token-opprinnelse ikke kan verifiseres  
- **Utvidelse av angrep på flere tjenester**: Kompromitterte tokens akseptert på tvers av flere tjenester muliggjør lateral bevegelse  

#### **Påkrevde sikkerhetskontroller**

**Ufravikelige krav:**  
- **Tokenvalidering**: MCP-servere **MÅ IKKE** akseptere tokens som ikke er eksplisitt utstedt for MCP-serveren  
- **Målgruppeverifisering**: Alltid valider at tokenets audience claim matcher MCP-serverens identitet  
- **Korrekt tokenlivssyklus**: Implementer kortlivede aksess-tokens med sikre rotasjonsrutiner  


## Leverandørkjede-sikkerhet for AI-systemer

Leverandørkjede-sikkerhet har utviklet seg fra tradisjonelle programvareavhengigheter til å omfatte hele AI-økosystemet. Moderne MCP-implementasjoner må grundig verifisere og overvåke alle AI-relaterte komponenter, da hver kan introdusere potensielle sårbarheter som kan kompromittere systemets integritet.

### Utvidede AI-leverandørkjede-komponenter

**Tradisjonelle programvareavhengigheter:**  
- Åpen kildekode-biblioteker og rammeverk  
- Containerbilder og basessystemer  
- Utviklingsverktøy og bygg-pipelines  
- Infrastrukturkomponenter og tjenester  

**AI-spesifikke leverandørkjedeelementer:**  
- **Foundation Models**: Ferdigtrente modeller fra forskjellige leverandører som krever opprinnelsesverifisering  
- **Embedding Services**: Eksterne vektoriserings- og semantiske søketjenester  
- **Kontekstleverandører**: Datakilder, kunnskapsbaser og dokumentarkiv  
- **Tredjeparts-APIer**: Eksterne AI-tjenester, ML-pipelines og dataprosesseringsendepunkter  
- **Modellartefakter**: Vekter, konfigurasjoner og finjusterte modellvarianter  
- **Treningsdatasett**: Datasett brukt til modells trening og finjustering  

### Omfattende Strategi for Leverandørkjedesikkerhet

#### **Komponentverifisering & Tillit**  
- **Bevis på opprinnelse**: Verifiser opprinnelse, lisensiering og integritet til alle AI-komponenter før integrasjon  
- **Sikkerhetsvurdering**: Gjennomfør sårbarhetsskanning og sikkerhetsgjennomgang for modeller, datakilder og AI-tjenester  
- **Rykteanalyse**: Evaluer sikkerhetshistorikk og praksis hos AI-tjenesteleverandører  
- **Samsvarsverifisering**: Sørg for at alle komponenter oppfyller organisasjonens sikkerhets- og regulatoriske krav  

#### **Sikre Distribusjons-pipelines**  
- **Automatisert CI/CD-sikkerhet**: Integrer sikkerhetsskanning i alle automatiserte distribusjonspipelines  
- **Artefaktintegritet**: Implementer kryptografisk verifisering for alle deployerte artefakter (kode, modeller, konfigurasjoner)  
- **Trinnvis Distribusjon**: Bruk progresjonsbaserte deploy-strategier med sikkerhetsvalidering i hvert steg  
- **Pålitelige Artefakt-depot**: Deploy kun fra verifiserte, sikre artefaktregistre og depot  

#### **Kontinuerlig Overvåking & Respons**  
- **Avhengighetsskanning**: Løpende overvåking av sårbarheter i alle programvare- og AI-komponentavhengigheter  
- **Modellovervåking**: Kontinuerlig vurdering av modellatferd, ytelsesavvik og sikkerhetsanomalier  
- **Tjenestehelseovervåking**: Overvåkning av eksterne AI-tjenesters tilgjengelighet, sikkerhetshendelser og policyendringer  
- **Integrasjon av Trusselintelligens**: Inkluder trusseldata spesifikk for AI- og ML-sikkerhetsrisiko  

#### **Tilgangskontroll & Minst Mulig Rettighet**  
- **Komponentnivå Tillatelser**: Begrens tilgang til modeller, data og tjenester basert på forretningsbehov  
- **Tjenestekonto-administrasjon**: Implementer dedikerte tjenestekontoer med minimale nødvendige rettigheter  
- **Nettverkssegmentering**: Isoler AI-komponenter og begrens nettverkstilgang mellom tjenester  
- **API Gateway-kontroller**: Bruk sentraliserte API-gatewayer for å kontrollere og overvåke tilgang til eksterne AI-tjenester  

#### **Hendelseshåndtering & Gjenoppretting**  
- **Raske responsprosedyrer**: Etablerte prosesser for patching eller utskifting av kompromitterte AI-komponenter  
- **Kredentialrotasjon**: Automatiserte systemer for å rotere hemmeligheter, API-nøkler og tjenestekredentialer  
- **Mulighet for rollback**: Evne til raskt å gå tilbake til tidligere kjente gode versjoner av AI-komponenter  
- **Gjenoppretting etter brudd i leverandørkjeden**: Spesifikke prosedyrer for håndtering av kompromittering av oppstrøms AI-tjenester  

### Microsoft Sikkerhetsverktøy & Integrasjon

**GitHub Advanced Security** tilbyr omfattende leverandørkjedebeskyttelse, inkludert:  
- **Hemmelighetsskanning**: Automatisk oppdagelse av credentialer, API-nøkler og tokens i repositories  
- **Avhengighetsskanning**: Vurdering av sårbarheter i open-source-avhengigheter og biblioteker  
- **CodeQL-analyse**: Statisk kodeanalyse for sikkerhetssårbarheter og kodeproblemer  
- **Leverandørkjededata**: Innsikt i avhengighetshelse og sikkerhetsstatus  

**Integrasjon med Azure DevOps & Azure Repos:**  
- Sømløs sikkerhetsskanning på tvers av Microsofts utviklingsplattformer  
- Automatiserte sikkerhetssjekker i Azure Pipelines for AI-arbeidsbelastninger  
- Policyhåndhevelse for sikker deploy av AI-komponenter  

**Microsofts Interne Praksis:**  
Microsoft implementerer omfattende leverandørkjedesikkerhetspraksiser på tvers av alle produkter. Les om velprøvde tilnærminger i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Beste Praksis for Grunnleggende Sikkerhet

MCP-implementasjoner arver og bygger på organisasjonens eksisterende sikkerhetspostur. Styrking av fundamentale sikkerhetsprinsipper øker betydelig den totale sikkerheten for AI-systemer og MCP-distribusjoner.

### Kjerne Sikkerhetsprinsipper

#### **Sikre Utviklingspraksiser**  
- **OWASP-kompatibilitet**: Beskyttelse mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) webapplikasjonssårbarheter  
- **AI-spesifikk beskyttelse**: Implementer kontroller for [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sikker hemmelighetshåndtering**: Bruk dedikerte vaults for tokens, API-nøkler og sensitiv konfigurasjonsdata  
- **Ende-til-ende-kryptering**: Sikre kommunikasjon på tvers av alle applikasjonskomponenter og dataflyter  
- **Inndatavurdering**: Grundig validering av all brukerinput, API-parametere og datakilder  

#### **Infrastrukturforsterkning**  
- **Multifaktorautentisering**: Obligatorisk MFA for alle administrative og tjenestekontoer  
- **Patchhåndtering**: Automatisert og tidsriktig patching av operativsystemer, rammeverk og avhengigheter  
- **Identitetsleverandørintegrasjon**: Sentralisert identitetshåndtering via Enterprise-identitetsleverandører (Microsoft Entra ID, Active Directory)  
- **Nettverkssegmentering**: Logisk isolering av MCP-komponenter for å begrense lateral bevegelsespotensial  
- **Prinsippet om minst mulig rettighet**: Minimum nødvendige tillatelser for alle systemkomponenter og kontoer  

#### **Sikkerhetsovervåking & Deteksjon**  
- **Omfattende logging**: Detaljert logging av AI-applikasjonsaktiviteter, inklusive MCP klient-server-interaksjoner  
- **SIEM-integrasjon**: Sentralisert sikkerhetsinformasjons- og hendelseshåndtering for anomali-deteksjon  
- **Atferdsanalyse**: AI-drevet overvåking for å oppdage uvanlige mønstre i system- og brukeratferd  
- **Trusselintelligens**: Integrasjon av eksterne trusseldata og kompromissindikatorer (IOCs)  
- **Hendelseshåndtering**: Veldefinerte rutiner for påvisning, respons og gjenoppretting ved sikkerhetshendelser  

#### **Zero Trust Arkitektur**  
- **Aldri stole, alltid verifisere**: Kontinuerlig verifisering av brukere, enheter og nettverkstilknytninger  
- **Mikro-segmentering**: Granulære nettverkskontroller som isolerer individuelle arbeidsbelastninger og tjenester  
- **Identitetsbasert sikkerhet**: Sikkerhetspolicyer basert på verifiserte identiteter fremfor nettverkslokasjon  
- **Kontinuerlig risikovurdering**: Dynamisk evaluering av sikkerhetsposisjon basert på aktuell kontekst og atferd  
- **Betinget tilgang**: Tilgangskontroller som tilpasses basert på risikofaktorer, lokasjon og enhetstillit  

### Mønstre for Enterprise Integrasjon

#### **Integrasjon i Microsoft sikkerhetsekosystem**  
- **Microsoft Defender for Cloud**: Omfattende sky-sikkerhetspostur-administrasjon  
- **Azure Sentinel**: Native skybasert SIEM og SOAR-funksjonalitet for beskyttelse av AI-arbeidsbelastninger  
- **Microsoft Entra ID**: Enterprise-identitets- og tilgangshåndtering med betingede tilgangspolicyer  
- **Azure Key Vault**: Sentralisert hemmelighetshåndtering med HSM-støtte  
- **Microsoft Purview**: Datastyring og samsvar for AI-datakilder og arbeidsflyter  

#### **Samsvar & Styring**  
- **Regulatorisk etterlevelse**: Sørg for at MCP-implementasjoner møter bransjespesifikke samsvarskrav (GDPR, HIPAA, SOC 2)  
- **Dataklassifisering**: Korrekt kategorisering og håndtering av sensitiv data behandlet av AI-systemer  
- **Revisjonsspor**: Omfattende logging for regulatoriske krav og rettsmedisinsk undersøkelse  
- **Personvernkontroller**: Implementering av personvern ved design-prinsipper i AI-systemarkitektur  
- **Endringshåndtering**: Formelle prosesser for sikkerhetsgjennomgang ved endringer i AI-systemer  

Disse grunnleggende praksisene skaper et robust sikkerhetsfundament som forbedrer effektiviteten av MCP-spesifikke sikkerhetskontroller og gir omfattende beskyttelse for AI-drevne applikasjoner.  

## Viktige Sikkerhetsoppsummeringer
- **Lagvis sikkerhetstilnærming**: Kombiner grunnleggende sikkerhetspraksis (trygg koding, minste privilegium, leverandørkjedeverifisering, kontinuerlig overvåking) med AI-spesifikke kontroller for omfattende beskyttelse

- **AI-spesifikt trussellandskap**: MCP-systemer står overfor unike risikoer inkludert prompt-injisering, verktøyforgiftning, kapring av sesjoner, confused deputy-problemer, token-gjennomgangssårbarheter og overdrevne tillatelser som krever spesialiserte mottiltak

- **Autentisering og autorisasjon i toppklasse**: Implementer robust autentisering ved bruk av eksterne identitetsleverandører (Microsoft Entra ID), håndhev korrekt token-validering, og godta aldri tokens som ikke eksplisitt er utstedt for din MCP-server

- **Forebygging av AI-angrep**: Distribuer Microsoft Prompt Shields og Azure Content Safety for å forsvare mot indirekte prompt-injisering og verktøyforgiftning, samtidig som du validerer verktøymetadata og overvåker dynamiske endringer

- **Sikkerhet for sesjon og transport**: Bruk kryptografisk sikre, ikke-deterministiske sesjons-IDer bundet til brukeridentiteter, implementer korrekt livssyklusstyring for sesjoner, og bruk aldri sesjoner for autentisering

- **OAuth sikkerhetsbeste praksis**: Forhindre confused deputy-angrep gjennom eksplisitt bruker samtykke for dynamisk registrerte klienter, korrekt implementering av OAuth 2.1 med PKCE, og streng validering av redirect URI

- **Token-sikkerhetsprinsipper**: Unngå anti-mønstre ved token-gjennomgang, valider tokenets publikums påstander, implementer kortvarige tokens med sikker rotasjon, og oppretthold tydelige tillitsgrenser

- **Omfattende leverandørkjede-sikkerhet**: Behandle alle AI-økosystemkomponenter (modeller, embeddings, kontekstleverandører, eksterne APIer) med samme sikkerhetshøyde som tradisjonelle programvareavhengigheter

- **Kontinuerlig utvikling**: Hold deg oppdatert med raskt utviklende MCP-spesifikasjoner, bidra til sikkerhetssamfunnsstandarder, og vedlikehold adaptive sikkerhetsposisjoner etter hvert som protokollen modnes

- **Microsoft sikkerhetsintegrasjon**: Utnytt Microsofts omfattende sikkerhetsøkosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) for forbedret beskyttelse av MCP-distribusjoner

## Omfattende ressurser

### **Offisiell MCP sikkerhetsdokumentasjon**
- [MCP Specification (Nåværende: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP sikkerhetsressurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattende OWASP MCP Top 10 med veiledning for Azure-implementering
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

### **DevOps og leverandørkjedesikkerhet**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Tilleggs sikkerhetsdokumentasjon**

For omfattende sikkerhetsveiledning, se disse spesialiserte dokumentene i denne seksjonen:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Fullstendig sikkerhetsbeste praksis for MCP-implementeringer
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiske implementeringseksempler for Azure Content Safety-integrasjon  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Nyeste sikkerhetskontroller og teknikker for MCP-distribusjoner
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Rask referanseguid for essensielle MCP-sikkerhetsrutiner
- **[BlueHat 2026: Sikring av AI-ens fremtid: Sikring av MCP med forsvar i dybden-mønstre](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Forsvar i dybden-mønstre fra Microsoft Security Response Center (MSRC)

### **Praktisk sikkerhetstrening**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattende praktisk workshop for sikring av MCP-servere i Azure med progresjon fra Base Camp til Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referansearkitektur og veiledning for implementering av alle OWASP MCP Top 10-risikoer

---

## Hva er neste

Neste: [Kapittel 3: Komme i gang](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->