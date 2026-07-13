# MCP-säkerhet: Omfattande skydd för AI-system

[![MCP Security Best Practices](../../../translated_images/sv/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klicka på bilden ovan för att se videon till denna lektion)_

Säkerhet är grundläggande för designen av AI-system, vilket är anledningen till att vi prioriterar det som vår andra sektion. Detta stämmer överens med Microsofts princip om **Secure by Design** från [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) tillför kraftfulla nya möjligheter till AI-drivna applikationer samtidigt som det introducerar unika säkerhetsutmaningar som går utöver traditionella mjukvarurisker. MCP-system står inför både etablerade säkerhetsproblem (säker kodning, minsta privilegium, leveranskedjesäkerhet) och nya AI-specifika hot inklusive promptinjektion, verktygsförgiftning, sessionkapning, confused deputy-attacker, sårbarheter i token-passthrough och dynamisk kapacitetsmodifiering.

Denna lektion utforskar de mest kritiska säkerhetsriskerna i MCP-implementeringar—där autentisering, auktorisation, överdrivna behörigheter, indirekt promptinjektion, sessionssäkerhet, confused deputy-problem, tokenhantering och leveranskedjesårbarheter behandlas. Du kommer att lära dig handlingsbara kontroller och bästa praxis för att mildra dessa risker samtidigt som du utnyttjar Microsofts lösningar som Prompt Shields, Azure Content Safety och GitHub Advanced Security för att stärka din MCP-distribution.

## Inlärningsmål

I slutet av denna lektion kommer du att kunna:

- **Identifiera MCP-specifika hot**: Känna igen unika säkerhetsrisker i MCP-system inklusive promptinjektion, verktygsförgiftning, överdrivna behörigheter, sessionkapning, confused deputy-problem, sårbarheter för token-passthrough och leveranskedjerisker
- **Tillämpa säkerhetskontroller**: Implementera effektiva åtgärder inklusive robust autentisering, minsta privilegietillgång, säker tokenhantering, sessionssäkerhetskontroller och verifiering av leveranskedja
- **Utnyttja Microsofts säkerhetslösningar**: Förstå och distribuera Microsoft Prompt Shields, Azure Content Safety och GitHub Advanced Security för MCP-arbetsbelastningsskydd
- **Validera verktygssäkerhet**: Känna vikten av validering av verktygsmetadata, övervakning av dynamiska förändringar och skydd mot indirekta promptinjektionsattacker
- **Integrera bästa praxis**: Kombinera etablerade säkerhetsgrunder (säker kodning, serverhärdning, zero trust) med MCP-specifika kontroller för omfattande skydd

# MCP-säkerhetsarkitektur & kontroller

Moderna MCP-implementeringar kräver lagerbaserade säkerhetsmetoder som tar itu med både traditionell mjukvarusäkerhet och AI-specifika hot. Den snabbt evolverande MCP-specifikationen utvecklar sina säkerhetskontroller och möjliggör bättre integration med företagsäkerhetsarkitekturer och etablerad bästa praxis.

Forskning från [Microsoft Digital Defense Report](https://aka.ms/mddr) visar att **98 % av rapporterade intrång skulle förhindras med robust säkerhetshygien**. Den mest effektiva skyddsstrategin kombinerar grundläggande säkerhetspraxis med MCP-specifika kontroller—beprövade baslinjesäkerhetsåtgärder förblir mest effektiva för att minska den totala säkerhetsrisken.

## Nuvarande säkerhetslandskap

> **Notera:** Denna information speglar MCP-säkerhetsstandarder från och med **5 februari 2026**, i linje med **MCP Specification 2025-11-25**. MCP-protokollet fortsätter att utvecklas snabbt och framtida implementeringar kan introducera nya autentiseringsmönster och förbättrade kontroller. Hänvisa alltid till aktuell [MCP-specifikation](https://spec.modelcontextprotocol.io/), [MCP GitHub-repository](https://github.com/modelcontextprotocol) och [dokumentation om säkerhetsbästa praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) för senaste vägledning.

> **Framåtblick:** release-kandidaten `2026-07-28` skärper auktorisation ytterligare — klienter måste validera `iss`-parametern på auktorisationssvar (RFC 9207), deklarera en OpenID Connect `application_type` under Dynamic Client Registration och binda registrerade referenser till den utfärdande auktorisationsservern. Se [Vad som ändras i MCP: Release-kandidaten 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) för fullständig lista över auktorisations-SEP:er.

## 🏔️ MCP Security Summit Workshop (Sherpa)

För **praktisk säkerhetsträning** rekommenderar vi starkt **MCP Security Summit Workshop** (Sherpa) - en omfattande guidad expedition för att säkra MCP-servrar i Microsoft Azure.

### Workshop-översikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) erbjuder praktisk, handlingsbar säkerhetsträning via en beprövad metodik: "sårbar → exploatera → fixa → validera". Du kommer att:

- **Lära dig genom att bryta saker**: Upplev sårbarheter genom att exploatera avsiktligt osäkra servrar
- **Använda Azure-inbyggd säkerhet**: Utnyttja Azure Entra ID, Key Vault, API Management och AI Content Safety
- **Följa defense-in-depth**: Avancera genom läger som bygger omfattande säkerhetslager
- **Tillämpa OWASP-standarder**: Varje teknik kopplas till [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produktionskod**: Få med dig fungerande, testade implementationer

### Expeditionens rutt

| Läger | Fokus | OWASP-risker täckta |
|------|-------|---------------------|
| **Basläger** | MCP-grunder & autentiseringssårbarheter | MCP01, MCP07 |
| **Läger 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Läger 2: Gateway** | API Management, Private Endpoints, styrning | MCP02, MCP06, MCP07, MCP09 |
| **Läger 3: I/O-säkerhet** | Promptinjicering, PII-skydd, innehållssäkerhet | MCP03, MCP05, MCP06, MCP10 |
| **Läger 4: Övervakning** | Log Analytics, instrumentpaneler, hotdetektering | MCP04, MCP08 |
| **Toppmötet** | Red Team / Blue Team-integratioonstest | Alla |

**Kom igång**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 säkerhetsrisker

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de tio mest kritiska säkerhetsriskerna för MCP-implementeringar:

| Risk | Beskrivning | Azure-mitigering |
|------|-------------|------------------|
| **MCP01** | Felhantering av token & sekretessläckage | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegierövergång via skoputökning | RBAC, Conditional Access |
| **MCP03** | Verktygsförgiftning | Verktygsvalidering, integritetsverifiering |
| **MCP04** | Leveranskedjeattacker & beroendetampering | GitHub Advanced Security, beroendesökning |
| **MCP05** | Kommandoinjektion & exekvering | Inmatningsvalidering, sandboxning |
| **MCP06** | Avvikelse i avsiktsflöde | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Otillräcklig autentisering & auktorisation | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Brist på revision och telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skugg-MCP-servrar | API Center styrning, nätverksisolering |
| **MCP10** | Kontextinjektion & överdela | Dataklassificering, minimal exponering |

### Utveckling av MCP-autentisering

MCP-specifikationen har utvecklats avsevärt i sin hantering av autentisering och auktorisation:

- **Ursprungligt tillvägagångssätt**: Tidiga specifikationer krävde att utvecklare implementerade egna autentiseringsservrar, där MCP-servrar agerade som OAuth 2.0-auktorisationsservrar som hanterade användarautentisering direkt
- **Nuvarande standard (2025-11-25)**: Uppdaterad specifikation tillåter att MCP-servrar delegerar autentisering till externa identitetsleverantörer (t.ex. Microsoft Entra ID), vilket förbättrar säkerhetsposition och minskar implementeringskomplexitet
- **Transport Layer Security**: Förbättrat stöd för säkra transportmekanismer med korrekt autentiseringsmönster för både lokala (STDIO) och fjärranslutna (Streamable HTTP) kopplingar

## Säkerhet för autentisering & auktorisation

### Nuvarande säkerhetsutmaningar

Moderna MCP-implementeringar möter flera utmaningar inom autentisering och auktorisation:

### Risker & hotvektorer

- **Felkonfigurerad auktorisationslogik**: Bristfällig auktorisationsimplementering i MCP-servrar kan exponera känslig data och felaktigt tillämpa åtkomstkontroller
- **OAuth-tokenkompromiss**: Stöld av token från lokal MCP-server gör att angripare kan utge sig för servrar och få åtkomst till nedströms tjänster
- **Sårbarheter i token-passthrough**: Felhantering av token skapar möjligheter att kringgå säkerhetskontroller och ansvarsspärrar
- **Överdrivna behörigheter**: Överprivilegierade MCP-servrar bryter mot principen om minsta privilegium och ökar attackytor

#### Token-passthrough: Ett kritiskt antipmönster

**Token-passthrough är uttryckligen förbjudet** i nuvarande MCP-auktorisationsspecifikation på grund av allvarliga säkerhetskonsekvenser:

##### Omgång av säkerhetskontroller
- MCP-servrar och nedströms-API:er implementerar viktiga säkerhetskontroller (begränsning av anrop, begäransevaluering, trafikövervakning) som förutsätter korrekt tokenvalidering
- Direkt klient-till-API-tokenanvändning kringgår dessa viktiga skydd och undergräver säkerhetsarkitekturen

##### Ansvar & revisionsutmaningar  
- MCP-servrar kan inte särskilja klienter som använder token utfärdade upstream, vilket bryter revisionskedjor
- Nedströmsresursserverns loggar visar vilseledande ursprung av förfrågningar i stället för faktiska MCP-serveromvägar
- Incidentutredning och efterlevnadsrevisioner blir betydligt svårare

##### Risker för dataexfiltrering
- Ovaliderade tokenpåståenden tillåter illvilliga aktörer med stulna token att använda MCP-servrar som mellanhänder för dataexfiltrering
- Brott mot förtroendegränser möjliggör obehöriga åtkomstmönster som kringgår avsedda säkerhetskontroller

##### Angreppsvektorer mot flera tjänster
- Komprometterade token som accepteras av flera tjänster möjliggör sidledes rörelse över sammankopplade system
- Förtroendeantaganden mellan tjänster kan brytas när token-ursprung inte kan verifieras

### Säkerhetskontroller & åtgärder

**Kritiska säkerhetskrav:**

> **OBLIGATORISKT**: MCP-servrar **FÅR INTE** acceptera några token som inte uttryckligen har utfärdats för MCP-servern

#### Autentiserings- & auktorisationskontroller

- **Noggrann auktorisationsgranskning**: Genomför omfattande revisioner av MCP-serverns auktorisationslogik för att säkerställa att endast avsedda användare och klienter kan få åtkomst till känsliga resurser
  - **Implementeringsguide**: [Azure API Management som autentiseringsgateway för MCP-servrar](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegration**: [Använda Microsoft Entra ID för MCP-serverautentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Säker tokenhantering**: Implementera [Microsofts bästa praxis för tokenvalidering och livscykel](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validera att token-målgrupp (audience) matchar MCP-serveridentiteten
  - Genomför korrekt tokenrotation och utgångspolicys
  - Förhindra token-återspelattacker och obehörig användning

- **Skyddad tokenlagring**: Säker tokenlagring med kryptering både i vila och under överföring
  - **Bästa praxis**: [Riktlinjer för säker tokenlagring och kryptering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementering av åtkomstkontroll

- **Principen om minsta privilegium**: Ge MCP-servrar endast minimala rättigheter som krävs för avsedd funktionalitet
  - Regelbunden granskning och uppdatering av behörigheter för att förhindra privilegiekrypning
  - **Microsoft-dokumentation**: [Säker minst-privilegierad åtkomst](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollbaserad åtkomstkontroll (RBAC)**: Implementera finmaskiga rolltilldelningar
  - Begränsa roller strikt till specifika resurser och åtgärder
  - Undvik breda eller onödiga behörigheter som ökar attackytor

- **Kontinuerlig behörighetsövervakning**: Implementera löpande åtkomstrevision och monitorering
  - Övervaka behörighetsanvändningsmönster för anomalier
  - Åtgärda snabbt överdrivna eller oanvända privilegier

## AI-specifika säkerhetshot

### Promptinjektion och verktygsmanipuleringsattacker

Moderna MCP-implementeringar möter sofistikerade AI-specifika angreppsvektorer som traditionella säkerhetsåtgärder inte helt kan hantera:

#### **Indirekt promptinjektion (cross-domain prompt injection)**

**Indirekt promptinjektion** är en av de mest kritiska sårbarheterna i MCP-aktiverade AI-system. Angripare bäddar in skadliga instruktioner i externt innehåll — dokument, webbsidor, e-post eller datakällor — som AI-system sedan behandlar som legitima kommando.

**Angreppsscenarier:**
- **Dokumentbaserad injektion**: Skadliga instruktioner gömda i bearbetade dokument som triggar oavsiktliga AI-reaktioner
- **Webbinnehållsexploatering**: Komprometterade webbsidor med inbäddade promptar som manipulerar AI:s beteende vid skrapning
- **E-postbaserade attacker**: Skadliga promptar i e-post som får AI-assistenter att läcka information eller utföra obehöriga handlingar
- **Kontaminering av datakällor**: Komprometterade databaser eller API:er som serverar förorenat innehåll till AI-system

**Verklig påverkan**: Dessa attacker kan leda till dataexfiltrering, integritetsintrång, generering av skadligt innehåll och manipulation av användarinteraktioner. För detaljerad analys, se [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sv/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktygsförgiftningsattacker**

**Verktygsförgiftning** riktar sig mot metadata som definierar MCP-verktyg, och utnyttjar hur LLM:er tolkar verktygsbeskrivningar och parametrar för att fatta exekveringsbeslut.

**Angreppsmetoder:**
- **Manipulation av metadata**: Angripare injicerar skadliga instruktioner i verktygsbeskrivningar, parameterdefinitioner eller användningsexempel
- **Osynliga instruktioner**: Dolda promptar i verktygsmetadata som behandlas av AI-modeller men är osynliga för mänskliga användare
- **Dynamisk verktygsmodifiering ("Rug Pulls")**: Verktyg godkända av användare ändras senare för att utföra skadliga handlingar utan användarens vetskap
- **Parameterinjektion**: Skadligt innehåll inbäddat i verktygsparameterscheman som påverkar modellens beteende


**Risker med Hostade Servrar**: Fjärr-MCP-servrar innebär förhöjda risker eftersom verktygsdefinitioner kan uppdateras efter användarens initiala godkännande, vilket skapar scenarier där verktyg som tidigare var säkra blir skadliga. För en omfattande analys, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sv/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligare AI-angreppsvägar**

- **Tvärdomän Promptinjektion (XPIA)**: Sofistikerade attacker som utnyttjar innehåll från flera domäner för att kringgå säkerhetskontroller
- **Dynamisk Förmågsändring**: Realtidsändringar av verktygsfunktioner som undgår initiala säkerhetsbedömningar
- **Förgiftning av Kontextfönster**: Attacker som manipulerar stora kontextfönster för att dölja skadliga instruktioner
- **Modellförvirringsattacker**: Utnyttjande av modellbegränsningar för att skapa oförutsägbara eller osäkra beteenden


### AI-säkerhetsriskernas påverkan

**Konsekvenser med hög påverkan:**
- **Dataexfiltrering**: Obehörig åtkomst och stöld av känslig företags- eller personlig data
- **Integritetsöverträdelser**: Exponering av personligt identifierbar information (PII) och konfidentiella affärsdata  
- **Systemmanipulation**: Oavsiktliga ändringar i kritiska system och arbetsflöden
- **Stöld av autentiseringsuppgifter**: Kompromettering av autentiseringstoken och tjänstekredentialer
- **Lateral rörelse**: Användning av komprometterade AI-system som språngbrädor för bredare nätverksattacker

### Microsoft AI-säkerhetslösningar

#### **AI Prompt Shields: Avancerat skydd mot injektionsattacker**

Microsoft **AI Prompt Shields** ger omfattande försvar mot både direkta och indirekta promptinjektionsattacker genom flera säkerhetslager:

##### **Kärnskyddsmekanismer:**

1. **Avancerad detektion och filtrering**
   - Maskininlärningsalgoritmer och NLP-tekniker upptäcker skadliga instruktioner i externt innehåll
   - Realtidsanalys av dokument, webbsidor, e-post och datakällor för inbäddade hot
   - Kontextuell förståelse av legitima vs. skadliga promptmönster

2. **Spotlight-tekniker**  
   - Skiljer mellan betrodda systeminstruktioner och potentiellt komprometterad extern input
   - Texttransformationsmetoder som förbättrar modellrelevans samtidigt som skadligt innehåll isoleras
   - Hjälper AI-system att behålla korrekt instruktionshierarki och ignorera injicerade kommandon

3. **Avgränsare och datamärkningssystem**
   - Tydlig gränsdragning mellan betrodda systemmeddelanden och extern input-text
   - Särskilda markörer som framhäver gränser mellan betrodda och icke-betrodda datakällor
   - Klar separation förhindrar instruktionförvirring och obehörig kommandokörning

4. **Kontinuerlig hotintelligens**
   - Microsoft övervakar kontinuerligt framväxande attackmönster och uppdaterar försvaren
   - Proaktiv hotjakt för nya injektionstekniker och angreppsvägar
   - Regelbundna säkerhetsmodelluppdateringar för att bibehålla effektivitet mot utvecklande hot

5. **Integration med Azure Content Safety**
   - Del av den omfattande Azure AI Content Safety-sviten
   - Ytterligare detektion för jailbreak-försök, skadligt innehåll och brott mot säkerhetspolicy
   - Enhetliga säkerhetskontroller över AI-applikationskomponenter

**Implementeringsresurser**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sv/prompt-shield.ff5b95be76e9c78c.webp)


## Avancerade MCP-säkerhetshot

### Sårbarheter för sessionskapning

**Sessionskapning** utgör en kritisk angreppsväg i stateful MCP-implementationer där obehöriga parter erhåller och missbrukar giltiga sessionsidentifierare för att utge sig för klienter och utföra obehöriga handlingar.

#### **Attackscenarier och risker**

- **Sessionskapningspromptinjektion**: Angripare med stulna sessions-ID:n injicerar skadliga händelser i servrar som delar sessionsstatus, vilket potentiellt kan utlösa skadliga åtgärder eller ge åtkomst till känslig data
- **Direkt utklädnad**: Stulna sessions-ID:n möjliggör direkta MCP-serveranrop som kringgår autentisering och behandlar angripare som legitima användare
- **Komprometterade återupptagningsbara strömmar**: Angripare kan avsluta förfrågningar i förtid, vilket gör att legitima klienter återupptar med potentiellt skadligt innehåll

#### **Säkerhetskontroller för sessionshantering**

**Kritiska krav:**
- **Autorisationsverifiering**: MCP-servrar som implementerar auktorisation **MÅSTE** verifiera ALLA inkommande förfrågningar och **FÅR INTE** förlita sig på sessioner för autentisering
- **Säker sessionsgenerering**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID:n som genereras med säkra slumptalsgeneratorer
- **Användarspecifik bindning**: Binda sessions-ID:n till användarspecifik information med format som `<user_id>:<session_id>` för att förhindra missbruk av sessioner mellan användare
- **Sessionslivscykelhantering**: Implementera korrekt utgång, rotation och ogiltigförklaring för att begränsa sårbarhetsfönster
- **Transportssäkerhet**: Obligatorisk HTTPS för all kommunikation för att förhindra avlyssning av sessions-ID:n

### Problemet med förvirrad ombud

Problemet med det **förvirrade ombudet** uppstår när MCP-servrar agerar autentiseringsproxy mellan klienter och tredjepartstjänster, vilket skapar möjligheter till auktoriseringsomgåelse genom utnyttjande av statiska klient-ID:n.

#### **Angreppsmekanik och risker**

- **Cookie-baserad samtyckesomgåelse**: Tidigare användarautentisering skapar samtyckes-cookies som angripare utnyttjar genom skadliga auktoriseringsförfrågningar med manipulerade redirect-uri:er
- **Stöld av auktoriseringskod**: Befintliga samtyckes-cookies kan få auktoriseringsservrar att hoppa över samtyckesskärmar och omdirigera koder till angriparkontrollerade ändpunkter  
- **Obehörig API-åtkomst**: Stulna auktoriseringskoder möjliggör tokenutbyte och användarförklädnad utan uttryckligt godkännande

#### **Motåtgärdsstrategier**

**Obligatoriska kontroller:**
- **Explicit samtyckeskrav**: MCP-proxyservrar som använder statiska klient-ID:n **MÅSTE** erhålla användarsamtycke för varje dynamiskt registrerad klient
- **OAuth 2.1-säkerhetsimplementering**: Följ aktuella säkerhetsriktlinjer för OAuth inklusive PKCE (Proof Key for Code Exchange) för alla auktoriseringsförfrågningar
- **Strikt klientvalidering**: Implementera rigorös validering av redirect-uri:er och klientidentifierare för att förhindra exploatering

### Token-genomströmning sårbarheter  

**Token-genomströmning** representerar ett uttryckligt antipattern där MCP-servrar accepterar klienttoken utan korrekt validering och vidarebefordrar dem till underliggande API:er, vilket bryter mot MCP-auktorisationsspecifikationer.

#### **Säkerhetskonsekvenser**

- **Kontrollomgåelse**: Direkt klient-till-API tokenanvändning kringgår viktiga begränsningar för hastighet, validering och övervakning
- **Korrumpering av revisionsspår**: Token som utfärdats uppåtströms gör klientidentifiering omöjlig, vilket förhindrar incidentutredningar
- **Proxybaserad dataexfiltrering**: Ovaliderade token möjliggör för illvilliga aktörer att använda servrar som proxy för obehörig dataåtkomst
- **Brott mot tillitsgränser**: Underliggande tjänsters tillitsantaganden kan brytas när tokenursprung inte kan verifieras
- **Angreppsutvidgning över flera tjänster**: Komprometterade token som accepteras över flera tjänster möjliggör lateral rörelse

#### **Nödvändiga säkerhetskontroller**

**Icke-förhandlingsbara krav:**
- **Tokenvalidering**: MCP-servrar **FÅR INTE** acceptera token som inte uttryckligen utfärdats för MCP-servern
- **Målgruppsverifiering**: Validera alltid att token-målreklam stämmer överens med MCP-serverns identitet
- **Korrekt tokenlivscykel**: Implementera kortlivade åtkomsttoken med säkra rotationsrutiner


## Säkerhet i leveranskedjan för AI-system

Säkerhet i leveranskedjan har utvecklats bortom traditionella programvaruberoenden till att omfatta hela AI-ekosystemet. Moderna MCP-implementationer måste noggrant verifiera och övervaka alla AI-relaterade komponenter eftersom varje komponent medför potentiella sårbarheter som kan kompromettera systemets integritet.

### Utökade AI-leveranskedjeelement

**Traditionella programvaruberoenden:**
- Öppenkällkods-bibliotek och ramverk
- Container-bilder och basala system  
- Utvecklingsverktyg och byggpipelines
- Infrastrukturkomponenter och tjänster

**AI-specifika leveranskedjeelement:**
- **Grundmodeller**: Förtränade modeller från olika leverantörer som kräver ursprungsverifiering
- **Embeddingtjänster**: Externa vektoriserings- och semantiksökningstjänster
- **Kontekstleverantörer**: Datakällor, kunskapsbaser och dokumentarkiv  
- **Tredjeparts-API:er**: Externa AI-tjänster, ML-pipelines och dataprepareringsändpunkter
- **Modellartefakter**: Vikter, konfigurationer och finjusterade modellvarianter
- **Träningsdatakällor**: Dataset som används för modellträning och finjustering

### Omfattande strategi för säkerhet i leveranskedjan

#### **Komponentverifiering och förtroende**
- **Ursprungsvalidering**: Verifiera ursprung, licensiering och integritet för alla AI-komponenter innan integration
- **Säkerhetsbedömning**: Genomför sårbarhetsskanningar och säkerhetsgranskningar av modeller, datakällor och AI-tjänster
- **Rykteanalys**: Utvärdera säkerhetshistorik och praxis hos AI-tjänsteleverantörer
- **Efterlevnadsverifiering**: Säkerställ att alla komponenter uppfyller organisationens säkerhets- och regelverkskrav

#### **Säkra distributionspipeliner**  
- **Automatiserad CI/CD-säkerhet**: Integrera säkerhetsskanning genom hela automatiserade distributionspipelines
- **Artefaktintegritet**: Implementera kryptografisk verifiering för alla distribuerade artefakter (kod, modeller, konfigurationer)
- **Stegvis distribution**: Använd progressiva distributionsstrategier med säkerhetsvalidering i varje steg
- **Betrodda artefaktregister**: Distribuera endast från verifierade, säkra artefaktregister och förvar

#### **Kontinuerlig övervakning och respons**
- **Beroendesökning**: Löpande sårbarhetsövervakning för all mjukvara och AI-komponentberoenden
- **Modellövervakning**: Kontinuerlig bedömning av modellbeteende, prestandaförändring och säkerhetsanomali
- **Tjänstehälsospårning**: Övervaka externa AI-tjänster för tillgänglighet, säkerhetsincidenter och policyförändringar
- **Integration av hotintelligens**: Inkorporera hotflöden specifika för AI- och ML-säkerhetsrisker

#### **Åtkomstkontroll och minsta privilegium**
- **Komponentbaserade behörigheter**: Begränsa åtkomst till modeller, data och tjänster baserat på affärsbehov
- **Hantera tjänstekonton**: Implementera dedikerade tjänstekonton med minsta nödvändiga behörighet
- **Nätverkssegmentering**: Isolera AI-komponenter och begränsa nätverksåtkomst mellan tjänster
- **API-gateway-kontroller**: Använd centraliserade API-gateways för att kontrollera och övervaka åtkomst till externa AI-tjänster

#### **Incidenthantering och återställning**
- **Snabba responssprocedurer**: Etablerade processer för patchning eller utbyte av komprometterade AI-komponenter
- **Rotation av autentiseringsuppgifter**: Automatiserade system för rotation av hemligheter, API-nycklar och tjänstekredentialer
- **Återställningsfunktioner**: Förmåga att snabbt återgå till tidigare kända fungerande versioner av AI-komponenter
- **Återhämtning från leveranskedjebrott**: Specifika procedurer för hantering av komprometteringar i uppströms AI-tjänster

### Microsofts säkerhetsverktyg och integration

**GitHub Advanced Security** erbjuder omfattande skydd i leveranskedjan inklusive:
- **Hemlighetsskanning**: Automatiserad upptäckt av autentiseringsuppgifter, API-nycklar och token i förvar
- **Beroendesökning**: Sårbarhetsbedömning för öppen källkodsberoenden och bibliotek
- **CodeQL-analys**: Statisk kodanalys för säkerhetssårbarheter och kodningsproblem
- **Insikter om leveranskedjan**: Synlighet i beroendehälsa och säkerhetsstatus

**Integration med Azure DevOps och Azure Repos:**
- Sömlös integration av säkerhetsskanning över Microsofts utvecklingsplattformar
- Automatiserade säkerhetskontroller i Azure Pipelines för AI-arbetsbelastningar
- Policysamordning för säker AI-komponentdistribution

**Microsofts interna praxis:**
Microsoft implementerar omfattande säkerhetspraxis för leveranskedjan i alla produkter. Läs om beprövade tillvägagångssätt i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Grundläggande säkerhetspraxis

MCP-implementationer ärver och bygger vidare på organisationens befintliga säkerhetspostur. Att stärka grundläggande säkerhetspraxis förbättrar avsevärt den övergripande säkerheten för AI-system och MCP-distributioner.

### Kärnfundament för säkerhet

#### **Säkra utvecklingspraxis**
- **OWASP-efterlevnad**: Skydda mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) webbapplikationssårbarheter
- **AI-specifika skydd**: Implementera kontroller för [OWASP Top 10 för LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Säker hantering av hemligheter**: Använd dedikerade valv för token, API-nycklar och känsliga konfigurationsdata
- **End-to-end-kryptering**: Implementera säkra kommunikationer över alla applikationskomponenter och dataflöden
- **Validering av indata**: Noggrann validering av all användarinmatning, API-parametrar och datakällor

#### **Förstärkning av infrastruktur**
- **Multifaktorsautentisering**: Obligatorisk MFA för alla administrativa och tjänstekonton
- **Patchhantering**: Automatiserad, snabb patchning för operativsystem, ramverk och beroenden  
- **Integration med identitetsleverantörer**: Centraliserad identitetshantering via företagsidentitetsleverantörer (Microsoft Entra ID, Active Directory)
- **Nätverkssegmentering**: Logisk isolering av MCP-komponenter för att begränsa lateral rörelse
- **Minimala privilegier**: Minsta nödvändiga behörigheter för alla systemkomponenter och konton

#### **Säkerhetsövervakning och detektion**
- **Omfattande loggning**: Detaljerad loggning av AI-applikationsaktiviteter, inklusive MCP-klient-serverinteraktioner
- **SIEM-integration**: Centraliserad säkerhetsinformations- och händelsehantering för anomalidetektion
- **Beteendeanalys**: AI-driven övervakning för att upptäcka ovanliga mönster i system- och användarbeteenden
- **Hotintelligens**: Integration av externa hotflöden och kompromissindikatorer (IOC)
- **Incidenthantering**: Väl definierade procedurer för upptäckt, respons och återhämtning vid säkerhetsincidenter

#### **Zero Trust-arkitektur**
- **Lita aldrig, verifiera alltid**: Kontinuerlig verifiering av användare, enheter och nätverksanslutningar
- **Mikrosegmentering**: Granulära nätverkskontroller som isolerar individuella arbetsbelastningar och tjänster
- **Identitetscentrerad säkerhet**: Säkerhetspolicys baserade på verifierade identiteter snarare än nätverksplats
- **Kontinuerlig riskbedömning**: Dynamisk utvärdering av säkerhetspostur baserat på aktuell kontext och beteende
- **Villkorad åtkomst**: Åtkomstkontroller som anpassar sig efter riskfaktorer, plats och enhetstillit

### Mönster för företagsintegration

#### **Microsofts säkerhetsekosystemintegration**
- **Microsoft Defender for Cloud**: Omfattande hantering av molnsäkerhetspostur
- **Azure Sentinel**: Molnbaserad SIEM och SOAR-funktionalitet för skydd av AI-arbetsbelastningar
- **Microsoft Entra ID**: Företagsidentitet- och åtkomsthantering med villkorade åtkomstpolicyer
- **Azure Key Vault**: Centraliserad hemlighetshantering med stöd för hårdvarusäkerhetsmodul (HSM)
- **Microsoft Purview**: Datastyrning och efterlevnad för AI-datakällor och arbetsflöden

#### **Efterlevnad och styrning**
- **Regelverksanpassning**: Säkerställ att MCP-implementationer uppfyller branschspecifika efterlevnadskrav (GDPR, HIPAA, SOC 2)

- **Dataklassificering**: Korrekt kategorisering och hantering av känsliga data som behandlas av AI-system
- **Revisionsspår**: Omfattande loggning för regulatorisk efterlevnad och forensisk undersökning
- **Integritetskontroller**: Implementering av integritet-genom-design-principer i AI-systemarkitektur
- **Ändringshantering**: Formella processer för säkerhetsgranskningar av AI-systemsändringar

Dessa grundläggande metoder skapar en robust säkerhetsbas som förbättrar effektiviteten hos MCP-specifika säkerhetskontroller och ger omfattande skydd för AI-drivna tillämpningar.

## Viktiga säkerhetsinsikter

- **Skiktad säkerhetsstrategi**: Kombinera grundläggande säkerhetspraxis (säker kodning, minsta privilegium, leverantörskedjeverifiering, kontinuerlig övervakning) med AI-specifika kontroller för ett heltäckande skydd

- **AI-specifika hotbild**: MCP-system utsätts för unika risker inklusive promptinjektion, verktygsförgiftning, sessionkapning, förväxlade ombud-problem, tokenpassage-sårbarheter och överdrivna behörigheter som kräver särskilda motåtgärder

- **Autentisering och auktorisation i världsklass**: Implementera robust autentisering med externa identitetsleverantörer (Microsoft Entra ID), upprätthåll korrekt tokenvalidering, och acceptera aldrig token som inte uttryckligen utfärdats för din MCP-server

- **Förebyggande av AI-attacker**: Använd Microsoft Prompt Shields och Azure Content Safety för att försvara mot indirekta promptinjektions- och verktygsförgiftning-attacker, samtidigt som verktygsmetadata valideras och dynamiska förändringar övervakas

- **Session- och transport-säkerhet**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID:n knutna till användaridentiteter, implementera korrekt sessionlivscykelhantering och använd aldrig sessioner för autentisering

- **OAuth säkerhetsbästa praxis**: Förebygg attacker med förväxlade ombud genom uttryckligt användarsamtycke för dynamiskt registrerade klienter, korrekt OAuth 2.1-implementering med PKCE och strikt validering av omdirigerings-URI:er  

- **Token-säkerhetsprinciper**: Undvik anti-mönster med tokenpassage, validera tokenens målgruppskrav, implementera kortlivade token med säker rotation, och upprätthåll tydliga förtroendegränser

- **Omfattande leverantörskedjesäkerhet**: Behandla alla AI-ekosystemkomponenter (modeller, inbäddningar, kontextleverantörer, externa API:er) med samma säkerhetsdisciplin som traditionella mjukvaruberoenden

- **Kontinuerlig utveckling**: Håll dig uppdaterad med snabbt utvecklande MCP-specifikationer, bidra till säkerhetsgemenskapens standarder och upprätthåll anpassningsbar säkerhetspostur när protokollet mognar

- **Microsoft-säkerhetsintegration**: Utnyttja Microsofts omfattande säkerhetsekosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) för förbättrat skydd vid MCP-distribution

## Omfattande resurser

### **Officiell MCP-säkerhetsdokumentation**
- [MCP-specifikation (Aktuell: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP säkerhetsbästa praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP auktorisationsspecifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub-förråd](https://github.com/modelcontextprotocol)

### **OWASP MCP säkerhetsresurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattande OWASP MCP Top 10 med Azure-implementeringsvägledning
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiella OWASP MCP säkerhetsrisker
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsutbildning för MCP på Azure

### **Säkerhetsstandarder och bästa praxis**
- [OAuth 2.0 säkerhetsbästa praxis (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 webbapplikationssäkerhet](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 för stora språkmodeller](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI-säkerhetsforskning och analys**
- [Promptinjektion i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Verktygsförgiftning-attacker (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP säkerhetsforskningssammanfattning (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft säkerhetslösningar**
- [Microsoft Prompt Shields dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety-tjänst](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID säkerhet](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Tokenhantering bästa praxis](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub avancerad säkerhet](https://github.com/security/advanced-security)

### **Implementeringsguider och handledningar**
- [Azure API Management som MCP autentiseringsgrind](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentisering med MCP-servrar](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Säker tokenlagring och kryptering (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & leverantörskedjesäkerhet**
- [Azure DevOps säkerhet](https://azure.microsoft.com/products/devops)
- [Azure Repos säkerhet](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft leverantörskedjesäkerhetsresa](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ytterligare säkerhetsdokumentation**

För fullständig säkerhetsvägledning, hänvisa till dessa specialiserade dokument i detta avsnitt:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Komplett säkerhetsbästa praxis för MCP-implementeringar
- **[Azure Content Safety-implementering](./azure-content-safety-implementation.md)** - Praktiska implementationsexempel för Azure Content Safety-integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Senaste säkerhetskontroller och tekniker för MCP-distributioner
- **[MCP Best Practices snabbreferens](./mcp-best-practices.md)** - Snabbreferensguide för viktiga MCP-säkerhetspraxis
- **[BlueHat 2026: Säkerställa AI:s framtid: Säkerställa MCP med försvar-i-djupet-mönster](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Försvar-i-djupet-mönster från Microsoft Security Response Center (MSRC)

### **Praktisk säkerhetsutbildning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattande praktisk workshop för att säkra MCP-servrar i Azure med progressiva läger från Base Camp till Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referensarkitektur och implementationsvägledning för alla OWASP MCP Top 10-risker

---

## Vad händer härnäst

Nästa: [Kapitel 3: Kom igång](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->