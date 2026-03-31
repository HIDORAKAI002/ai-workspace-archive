# MCP-säkerhet: Omfattande skydd för AI-system

[![MCP Security Best Practices](../../../translated_images/sv/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klicka på bilden ovan för att se videon till denna lektion)_

Säkerhet är grundläggande för AI-systems design, vilket är anledningen till att vi prioriterar det som vår andra avdelning. Detta stämmer överens med Microsofts princip **Secure by Design** från [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) tillför kraftfulla nya möjligheter till AI-drivna applikationer samtidigt som det introducerar unika säkerhetsutmaningar som går bortom traditionella mjukvarurisker. MCP-system står inför både etablerade säkerhetsrisker (säker kodning, minsta privilegium, leverantörskedjesäkerhet) och nya AI-specifika hot som promptinjektion, verktygsförgiftning, kapning av sessioner, förvirrade leverantör-attacker, sårbarheter vid token-passthrough och dynamisk kapacitetsändring.

Denna lektion utforskar de mest kritiska säkerhetsriskerna i MCP-implementationer—inklusive autentisering, auktorisering, överdrivna behörigheter, indirekt promptinjektion, sessionssäkerhet, problem med förvirrad leverantör, tokenhantering och sårbarheter i leverantörskedjan. Du kommer att lära dig praktiska kontroller och bästa praxis för att mildra dessa risker samtidigt som du använder Microsoft-lösningar som Prompt Shields, Azure Content Safety och GitHub Advanced Security för att stärka din MCP-distribution.

## Lärandemål

I slutet av denna lektion kommer du att kunna:

- **Identifiera MCP-specifika hot**: Känna igen unika säkerhetsrisker i MCP-system inklusive promptinjektion, verktygsförgiftning, överdrivna behörigheter, kapning av sessioner, problem med förvirrad leverantör, token-passthrough-sårbarheter och leverantörskedjerisker
- **Tillämpa säkerhetskontroller**: Implementera effektiva mildrande åtgärder inklusive robust autentisering, minsta privilegium-åtkomst, säker tokenhantering, sessionssäkerhetskontroller och verifiering av leverantörskedjan
- **Använda Microsofts säkerhetslösningar**: Förstå och implementera Microsoft Prompt Shields, Azure Content Safety och GitHub Advanced Security för skydd av MCP-arbetsbelastningar
- **Validera verktygssäkerhet**: Känna igen vikten av validering av verktygsmetadata, övervakning av dynamiska förändringar och försvar mot indirekta promptinjektionsattacker
- **Integrera bästa praxis**: Kombinera etablerade säkerhetsgrunder (säker kodning, serverhärdning, zero trust) med MCP-specifika kontroller för heltäckande skydd

# MCP-säkerhetsarkitektur och kontroller

Moderna MCP-implementationer kräver lager-på-lager-säkerhetsmetoder som adresserar både traditionell mjukvarusäkerhet och AI-specifika hot. Den snabbt utvecklande MCP-specifikationen fortsätter att mogna sina säkerhetskontroller, vilket möjliggör bättre integration med företags säkerhetsarkitekturer och etablerade bästa praxis.

Forskning från [Microsoft Digital Defense Report](https://aka.ms/mddr) visar att **98 % av rapporterade intrång skulle förhindras genom robust säkerhetshygien**. Den mest effektiva skyddsstrategin kombinerar grundläggande säkerhetspraxis med MCP-specifika kontroller—beprövade baslinjesäkerhetsåtgärder har fortsatt störst inverkan på att minska den totala säkerhetsrisken.

## Nuvarande säkerhetslandskap

> **Notera:** Denna information speglar MCP-säkerhetsstandarder från och med **5 februari 2026**, i linje med **MCP Specification 2025-11-25**. MCP-protokollet fortsätter att utvecklas snabbt och framtida implementationer kan införa nya autentiseringsmönster och förbättrade kontroller. Hänvisa alltid till den aktuella [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) och [dokumentationen för säkerhetsbästa praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) för senaste riktlinjer.

## 🏔️ MCP Security Summit Workshop (Sherpa)

För **praktisk säkerhetsträning** rekommenderar vi starkt **MCP Security Summit Workshop** (Sherpa)—en omfattande guidad expedition för att säkra MCP-servrar i Microsoft Azure.

### Workshop-översikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) erbjuder praktisk och handlingsbar säkerhetsträning genom en beprövad metodik "sårbar → exploatera → åtgärda → validera". Du kommer att:

- **Lära dig genom att bryta saker**: Uppleva sårbarheter direkt genom att exploatera avsiktligt osäkra servrar
- **Använda Azure-inbyggd säkerhet**: Utnyttja Azure Entra ID, Key Vault, API Management och AI Content Safety
- **Följa djupförsvarsstrategi**: Avancera genom läger och bygg omfattande säkerhetslager
- **Tillämpa OWASP-standarder**: Varje teknik kopplas till [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produktionskod**: Gå därifrån med fungerande, testade implementationer

### Expeditionsrutten

| Läger | Fokus | Täckta OWASP-risker |
|-------|-------|---------------------|
| **Basläger** | MCP-grunder & autentiseringssårbarheter | MCP01, MCP07 |
| **Läger 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Läger 2: Gateway** | API Management, privata slutpunkter, styrning | MCP02, MCP07, MCP09 |
| **Läger 3: I/O-säkerhet** | Promptinjektion, skydd av PII, inhaltsäkerhet | MCP03, MCP05, MCP06 |
| **Läger 4: Övervakning** | Logganalys, instrumentpaneler, hotdetektion | MCP08 |
| **Toppen** | Red Team / Blue Team integrationsprov | Alla |

**Kom igång**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 säkerhetsrisker

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detaljerar de tio mest kritiska säkerhetsriskerna för MCP-implementationer:

| Risk | Beskrivning | Azure-mitigation |
|-------|-------------|------------------|
| **MCP01** | Tokenhantering & sekretessläckage | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegiumeskalering via omfångskrypning | RBAC, villkorlig åtkomst |
| **MCP03** | Verktygsförgiftning | Verktygsvalidering, integritetsverifiering |
| **MCP04** | Leverantörskedjeattacker | GitHub Advanced Security, beroendeskanning |
| **MCP05** | Kommandoinjektion och exekvering | Inmatningsvalidering, sandlåda |
| **MCP06** | Promptinjektion via kontextuella nyttolaster | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Otillräcklig autentisering och auktorisering | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Brist på revision & telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skugg-MCP-servrar | API Center-styrning, nätverksisolering |
| **MCP10** | Kontextinjektion & överdelning | Dataklassificering, minimal exponering |

### Utveckling av MCP-autentisering

MCP-specifikationen har utvecklats väsentligt i sin hantering av autentisering och auktorisering:

- **Ursprungligt tillvägagångssätt**: Tidiga specifikationer krävde att utvecklare implementerade egna autentiseringsservrar, där MCP-servrar agerade som OAuth 2.0-autoriseringsservrar och hanterade användarautentisering direkt
- **Nuvarande standard (2025-11-25)**: Uppdaterad specifikation tillåter MCP-servrar att delegera autentisering till externa identitetsleverantörer (som Microsoft Entra ID), vilket förbättrar säkerhetsställningen och minskar implementeringskomplexitet
- **Transportlager-säkerhet**: Förbättrat stöd för säkra transportmekanismer med korrekta autentiseringsmönster för både lokala (STDIO) och fjärranslutningar (Streamable HTTP)

## Autentisering och auktoriseringssäkerhet

### Nuvarande säkerhetsutmaningar

Moderna MCP-implementationer står inför flera autentiserings- och auktoriseringsutmaningar:

### Risker och hotvektorer

- **Felkonfigurerad auktoriseringslogik**: Bristfällig auktoriseringsimplementering i MCP-servrar kan exponera känslig data och tillämpa åtkomstkontroller felaktigt
- **OAuth-tokenkompromettering**: Stöld av token från lokal MCP-server gör att angripare kan utge sig för att vara servrar och få tillgång till efterföljande tjänster
- **Token-passthrough-sårbarheter**: Felaktig hantering av tokens skapar säkerhetskontrollbypassar och ansvarsgap
- **Överdrivna behörigheter**: MCP-servrar med för stora privilegier bryter mot principen om minsta privilegium och ökar ytan för attacker

#### Token-passthrough: Ett kritiskt anti-mönster

**Token-passthrough är uttryckligen förbjudet** i den nuvarande MCP-autoriseringsspecifikationen på grund av allvarliga säkerhetsimplikationer:

##### Omgåelse av säkerhetskontroller  
- MCP-servrar och nedströms-API:er implementerar viktiga säkerhetskontroller (hastighetsbegränsning, requestsvalidering, trafikövervakning) som förutsätter korrekt tokenvalidering  
- Direkt klient-till-API-tokenanvändning kringgår dessa viktiga skydd och undergräver säkerhetsarkitekturen  

##### Ansvars- och revisionsproblem  
- MCP-servrar kan inte skilja mellan klienter som använder tokens utfärdade av upstream, vilket bryter granskningsloggar  
- Loggar i nedströmsresurser visar missvisande begärande ursprung istället för faktiska MCP-serverförmedlare  
- Incidentutredning och efterlevnadsrevisioner blir avsevärt svårare  

##### Risker för dataexfiltrering  
- Kontrollfria tokenanspråk gör att illvilliga aktörer med stulna tokens kan använda MCP-servrar som proxys för dataexfiltrering  
- Brott mot förtroendegränser möjliggör obehöriga åtkomstmönster som kringgår avsedda säkerhetskontroller  

##### Angreppsvektorer mot flera tjänster  
- Komprometterade tokens som accepteras av flera tjänster möjliggör lateral förflyttning över anslutna system  
- Förtroendemekanismer mellan tjänster kan brytas när tokenursprung inte kan verifieras  

### Säkerhetskontroller och mildrande åtgärder

**Kritiska säkerhetskrav:**

> **OBLIGATORISKT**: MCP-servrar **FÅR INTE** acceptera några tokens som inte uttryckligen utfärdats för MCP-servern

#### Autentiserings- & auktoriseringskontroller

- **Noggrann auktoriseringsgranskning**: Genomför omfattande revisioner av MCP-serverns auktoriseringslogik för att säkerställa att endast avsedda användare och klienter får tillgång till känsliga resurser  
  - **Implementeringsguide**: [Azure API Management som autentiseringsgateway för MCP-servrar](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Identitetsintegration**: [Använda Microsoft Entra ID för MCP-serverautentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Säker tokenhantering**: Implementera [Microsofts tokenvaliderings- och livscykelbest practices](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validera att tokenens målgruppspåståenden stämmer överens med MCP-serverns identitet  
  - Inför korrekt tokenrotation och utgångspolicyer  
  - Förhindra token-återuppspelning och obehörig användning  

- **Skyddad tokenlagring**: Säkerställ tokens lagring krypterat både i vila och under överföring  
  - **Bästa praxis**: [Säker tokenlagring och krypteringsriktlinjer](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Implementering av åtkomstkontroll

- **Principen om minsta privilegium**: Ge MCP-servrar endast minimala behörigheter som krävs för avsedd funktionalitet  
  - Regelbundna genomgångar och uppdateringar av behörigheter för att förhindra privilegiekrypning  
  - **Microsoft-dokumentation**: [Säkra minsta privilegiet-åtkomst](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Rollbaserad åtkomstkontroll (RBAC)**: Implementera finfördelade rolltilldelningar  
  - Strama roller till specifika resurser och åtgärder  
  - Undvik breda eller onödiga behörigheter som ökar ytor för attacker  

- **Kontinuerlig behörighetsövervakning**: Genomför löpande åtkomstrevisioner och övervakning  
  - Övervaka användningsmönster för behörigheter för att upptäcka avvikelser  
  - Avhjälp snabbt överdrivna eller oanvända privilegier  

## AI-specifika säkerhetshot

### Promptinjektion och manipulation av verktyg

Moderna MCP-implementationer utsätts för sofistikerade AI-specifika attackvektorer som traditionella säkerhetsåtgärder inte fullt ut kan hantera:

#### **Indirekt promptinjektion (Cross-Domain Prompt Injection)**

**Indirekt promptinjektion** är en av de mest kritiska sårbarheterna i AI-system med MCP. Angripare bäddar in skadliga instruktioner i externa innehåll—dokument, webbsidor, e-post eller datakällor—som AI-system senare tolkar som legitima kommandon.

**Attackscenarier:**  
- **Dokumentbaserad injektion**: Skadliga instruktioner gömda i bearbetade dokument som triggar oavsiktade AI-åtgärder  
- **Webbinnehållsexploatering**: Komprometterade webbsidor med inbäddade prompts som manipulerar AI-beteende vid skrapning  
- **E-postbaserade attacker**: Skadliga prompts i e-post som får AI-assistenter att läcka information eller utföra obehöriga åtgärder  
- **Kontaminerade datakällor**: Komprometterade databaser eller API:er som levererar förorenat innehåll till AI-system  

**Verklig påverkan**: Dessa attacker kan leda till dataexfiltrering, integritetsintrång, generering av skadligt innehåll och manipulering av användarinteraktioner. För detaljerad analys, se [Prompt Injection i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sv/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktygsförgiftningsattacker**

**Verktygsförgiftning** riktar sig mot metadata som definierar MCP-verktyg och utnyttjar hur stora språkmodeller (LLMs) tolkar verktygsbeskrivningar och parametrar för att fatta exekveringsbeslut.

**Attackmekanismer:**  
- **Metadata-manipulation**: Angripare injicerar skadliga instruktioner i verktygsbeskrivningar, parameterdefinitioner eller användningsexempel  
- **Osynliga instruktioner**: Dolda prompts i verktygsmetadata som bearbetas av AI-modeller men är osynliga för mänskliga användare  
- **Dynamisk verktygsmodifiering ("Rug Pulls")**: Verktyg som godkänts av användare modifieras senare för att utföra skadliga handlingar utan användarens vetskap  
- **Parameterinjektion**: Skadligt innehåll inbäddat i verktygsparameterscheman som påverkar modellbeteendet  

**Risker med värdservrar**: Fjärr-MCP-servrar har ökade risker då verktygsdefinitioner kan uppdateras efter initial användargodkännande, vilket skapar scenarier där tidigare säkra verktyg blir skadliga. För omfattande analys, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sv/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligare AI-angreppsvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerade attacker som utnyttjar innehåll från flera domäner för att kringgå säkerhetskontroller
- **Dynamisk kapacitetmodifiering**: Realtidsförändringar av verktygskapaciteter som undkommer initiala säkerhetsbedömningar  
- **Förgiftning av kontextfönster**: Angrepp som manipulerar stora kontextfönster för att dölja skadliga instruktioner  
- **Angrepp via modellförvirring**: Utnyttjande av modellens begränsningar för att skapa oförutsägbara eller osäkra beteenden  


### AI-säkerhetsriskers påverkan

**Högpåverkande konsekvenser:**  
- **Dataexfiltrering**: Otillåten åtkomst och stöld av känsliga företags- eller personuppgifter  
- **Integritetsbrott**: Exponering av personligt identifierbar information (PII) och konfidentiella affärsdata  
- **Systemmanipulation**: Oavsiktliga ändringar i kritiska system och arbetsflöden  
- **Stöld av autentiseringsuppgifter**: Kompromettering av autentiseringstoken och serviceuppgifter  
- **Lateral rörelse**: Användning av komprometterade AI-system som språngbrädor för bredare nätverksattacker  

### Microsoft AI-säkerhetslösningar

#### **AI Prompt Shields: Avancerat skydd mot injektionsattacker**

Microsoft **AI Prompt Shields** erbjuder omfattande försvar mot både direkta och indirekta promptinjektionsattacker genom flera säkerhetslager:

##### **Kärnskyddsmekanismer:**

1. **Avancerad detektion & filtrering**  
   - Maskininlärningsalgoritmer och NLP-tekniker upptäcker skadliga instruktioner i extern information  
   - Realtidsanalys av dokument, webbsidor, e-post och datakällor för inbäddade hot  
   - Kontextuell förståelse av legitima vs. skadliga promptmönster  

2. **Spotlighting-tekniker**  
   - Skiljer mellan betrodda systeminstruktioner och potentiellt komprometterade externa input  
   - Textomvandlingsmetoder som förbättrar modellens relevans samtidigt som skadligt innehåll isoleras  
   - Hjälper AI-system att behålla korrekt instruktionshierarki och ignorera injicerade kommandon  

3. **Avgränsnings- & datamarkeringssystem**  
   - Tydlig gränsdragning mellan betrodda systemmeddelanden och extern input-text  
   - Särskilda markörer som framhäver gränser mellan betrodda och icke-betrodda datakällor  
   - Klar åtskillnad förhindrar förvirring av instruktioner och otillåten kommandokörning  

4. **Kontinuerlig hotintelligens**  
   - Microsoft övervakar löpande nya attackmönster och uppdaterar försvaret  
   - Proaktiv jakt efter nya injektionstekniker och attackvektorer  
   - Regelbundna modelluppdateringar för att bibehålla effektivitet mot utvecklande hot  

5. **Azure Content Safety-integration**  
   - Del av den omfattande Azure AI Content Safety-sviten  
   - Ytterligare detektion för jailbreak-försök, skadligt innehåll och säkerhetspolicysbrott  
   - Enhetliga säkerhetskontroller över AI-applikationskomponenter  

**Implementeringsresurser**: [Microsoft Prompt Shields Dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sv/prompt-shield.ff5b95be76e9c78c.webp)


## Avancerade MCP-säkerhetshot

### Sårbarheter vid sessionskapning

**Sessionskapning** utgör en kritisk angriparvektor i tillståndsbaserade MCP-implementationer där obehöriga får tag på och missbrukar legitima sessionsidentifierare för att utge sig för klienter och utföra otillåtna åtgärder.

#### **Angreppsscenarier & risker**

- **Sessionskapnings-promptinjektion**: Angripare med stulna sessions-ID:n injicerar skadliga händelser i servrar som delar sessionstillstånd, vilket kan trigga skadliga åtgärder eller ge åtkomst till känslig data  
- **Direkt utgavssionshandling**: Stulna sessionsnummer möjliggör direkta MCP-serveranrop som går förbi autentisering och behandlar angriparna som legitima användare  
- **Komprometterade återupptagningsströmmar**: Angripare kan avbryta förfrågningar i förtid, vilket gör att legitima klienter fortsätter med potentiellt skadligt innehåll  

#### **Säkerhetskontroller för sessionshantering**

**Kritiska krav:**  
- **Auktoriseringsverifiering**: MCP-servrar som implementerar auktorisering **MÅSTE** verifiera ALLA inkommande förfrågningar och **FÅR INTE** förlita sig på sessioner för autentisering  
- **Säker sessionsgenerering**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID:n genererade med säkra slumpgeneratorer  
- **Användarspecifik bindning**: Knyt sessions-ID:n till användarspecifik information med format som `<user_id>:<session_id>` för att förhindra sessionsmissbruk över användare  
- **Sessionslivscykelhantering**: Implementera korrekt utgångsdatum, rotation och ogiltigförklaring för att begränsa sårbarhetsfönster  
- **Transport Säkerhet**: Obligatorisk HTTPS för all kommunikation för att förhindra avlyssning av sessions-ID  

### Problemet med förvirrad ombud

Det **förvirrade ombud-problemet** uppstår när MCP-servrar agerar som autentiseringsproxy mellan klienter och tredjepartstjänster, vilket skapar möjligheter till auktoriseringsomgåelse genom utnyttjande av statiska klient-ID:n.

#### **Angreppsmekanik & risker**

- **Cookie-baserad samtyckesomgång**: Tidigare användarautentisering skapar samtyckes-cookies som angripare utnyttjar via skadliga auktoriseringsförfrågningar med manipulerade omdirigerings-URI:er  
- **Stöld av auktoriseringskod**: Befintliga samtyckes-cookies kan få auktoriseringsservrar att hoppa över samtyckesskärmar och omdirigera koder till angriparkontrollerade ändpunkter  
- **Otillåten API-åtkomst**: Stulna auktoriseringskoder möjliggör tokenutbyte och användarförfalskning utan uttryckligt godkännande  

#### **Motåtgärdsstrategier**

**Obligatoriska kontroller:**  
- **Explicit samtyckeskrav**: MCP-proxyservrar som använder statiska klient-ID:n **MÅSTE** inhämta användarens samtycke för varje dynamiskt registrerad klient  
- **OAuth 2.1-säkerhetsimplementering**: Följ aktuella OAuth-säkerhetsrutiner inklusive PKCE (Proof Key for Code Exchange) för alla auktoriseringsförfrågningar  
- **Strikt klientvalidering**: Implementera rigorös kontroll av omdirigerings-URI:er och klientidentifierare för att förhindra utnyttjande  

### Sårbarheter vid token-genompassering  

**Token-genompassering** är ett explicit anti-mönster där MCP-servrar accepterar klienttoken utan korrekt validering och vidarebefordrar dem till nedströms-API:er, vilket bryter mot MCP-autoriseringsspecifikationer.

#### **Säkerhetsimplikationer**

- **Kontrollomgång**: Direkt klient-till-API-tokenanvändning kringgår kritiska gräns- och valideringskontroller  
- **Revisionsspårs-förvanskning**: Token utställda längre uppströms gör klientidentifiering omöjlig och hindrar incidentutredningar  
- **Proxy-baserad dataexfiltrering**: Ovaliderade token möjliggör för illasinnade aktörer att använda servrar som proxis för otillåten dataåtkomst  
- **Överträdelse av förtroendegränser**: Nedsänkta tjänsters förtroendeförutsättningar kan kränkas när tokenursprung inte kan verifieras  
- **Expansion av multiservice-attacker**: Komprometterade token accepterade över flera tjänster möjliggör lateral rörelse  

#### **Nödvändiga säkerhetskontroller**

**Icke-förhandlingsbara krav:**  
- **Tokenvalidering**: MCP-servrar **FÅR INTE** acceptera token som inte explicit är utfärdade för MCP-servern  
- **Publikumsverifiering**: Alltid validera att token-publikumen stämmer överens med MCP-serverns identitet  
- **Korrekt tokenlivscykel**: Implementera kortlivade åtkomsttoken med säkra rotationsrutiner  


## Leveranskedjesäkerhet för AI-system

Leveranskedjesäkerhet har utvecklats bortom traditionella mjukvaruberoenden för att omfatta hela AI-ekosystemet. Moderna MCP-implementationer måste rigoröst verifiera och övervaka alla AI-relaterade komponenter eftersom varje introducerar potentiella sårbarheter som kan kompromettera systemets integritet.

### Utökade AI-leveranskedjekomponenter

**Traditionella mjukvaruberoenden:**  
- Open source-bibliotek och ramverk  
- Containerbilder och basystem  
- Utvecklingsverktyg och byggpipelines  
- Infrastrukturkomponenter och tjänster  

**AI-specifika leveranskedjeelement:**  
- **Grundmodeller**: Förtränade modeller från olika leverantörer som kräver proveniensverifiering  
- **Inbäddningstjänster**: Externa vektoriserings- och semantiska söktjänster  
- **Kontextleverantörer**: Datakällor, kunskapsbaser och dokumentarkiv  
- **Tredjeparts-API:er**: Externa AI-tjänster, ML-pipelines och dataprestandaprocesserande slutpunkter  
- **Modellartefakter**: Vikter, konfigurationer och finjusterade modellvarianter  
- **Träningsdataströmmar**: Dataset som används för modellträning och finjustering  

### Omfattande strategi för leveranskedjesäkerhet

#### **Komponentverifiering & förtroende**  
- **Proveniensvalidering**: Verifiera ursprung, licensering och integritet för alla AI-komponenter före integration  
- **Säkerhetsbedömning**: Utför sårbarhetsscanningar och säkerhetsgranskningar för modeller, datakällor och AI-tjänster  
- **Rykteanalys**: Värdera säkerhetshistorik och rutiner hos AI-tjänsteleverantörer  
- **Efterlevnadsverifiering**: Säkerställ att alla komponenter uppfyller organisatoriska säkerhets- och regulatoriska krav  

#### **Säkra distributionspipelines**  
- **Automatiserad CI/CD-säkerhet**: Integrera säkerhetsskanning i automatiserade distributionskedjor  
- **Artefaktintegritet**: Implementera kryptografisk verifiering för alla distribuerade artefakter (kod, modeller, konfigurationer)  
- **Etapperad distribution**: Använd progressiva distributionsstrategier med säkerhetsvalidering i varje steg  
- **Betrodda artefaktregister**: Distribuera endast från verifierade och säkra artefaktregister och arkiv  

#### **Kontinuerlig övervakning & respons**  
- **Beroendeskanning**: Pågående sårbarhetsövervakning för all mjukvara och AI-komponentberoenden  
- **Modellövervakning**: Kontinuerlig bedömning av modellbeteende, prestandaförändring och säkerhetsavvikelser  
- **Tjänstehälsouppföljning**: Övervaka externa AI-tjänsters tillgänglighet, säkerhetsincidenter och policyändringar  
- **Hotintelligensintegration**: Inkorporera hotflöden specifika för AI- och ML-säkerhetsrisker  

#### **Åtkomstkontroll & minst privilegium**  
- **Komponentnivåbehörigheter**: Begränsa tillgång till modeller, data och tjänster baserat på affärsbehov  
- **Servicekontohantering**: Implementera dedikerade servicekonton med minsta nödvändiga behörigheter  
- **Nätverkssegmentering**: Isolera AI-komponenter och begränsa nätverksåtkomst mellan tjänster  
- **API-gatewaykontroller**: Använd centraliserade API-gateways för att styra och övervaka åtkomst till externa AI-tjänster  

#### **Incidenthantering & återhämtning**  
- **Snabba responsrutiner**: Etablerade processer för patchning eller ersättning av komprometterade AI-komponenter  
- **Referensbyte**: Automatiserade system för rotation av hemligheter, API-nycklar och serviceuppgifter  
- **Återgångsförmåga**: Möjlighet att snabbt återgå till tidigare kända fungerande versioner av AI-komponenter  
- **Återhämtningsrutiner vid leveranskedjebrott**: Specifika procedurer för att hantera kompromettering av upstream AI-tjänster  

### Microsoft säkerhetsverktyg & integration

**GitHub Advanced Security** tillhandahåller omfattande skydd av leveranskedjan inklusive:  
- **Hemlighetsskanning**: Automatisk detektion av autentiseringsuppgifter, API-nycklar och token i arkiv  
- **Beroendeskanning**: Sårbarhetsbedömning för open source-beroenden och bibliotek  
- **CodeQL-analys**: Statisk kodanalys för säkerhetsbrister och programmeringsproblem  
- **Insikter om leveranskedjan**: Synlighet i beroendehälsa och säkerhetsstatus  

**Azure DevOps & Azure Repos-integration:**  
- Sömlös säkerhetsskanning i Microsofts utvecklingsplattformar  
- Automatiska säkerhetskontroller i Azure Pipelines för AI-arbetsbelastningar  
- Policyramverk för säker distribution av AI-komponenter  

**Microsoft interna rutiner:**  
Microsoft tillämpar omfattande leveranskedjesäkerhetsrutiner i alla produkter. Läs om beprövade tillvägagångssätt i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Foundation Security Bästa praxis

MCP-implementationer ärver och bygger vidare på din organisations befintliga säkerhetsläge. Att stärka grundläggande säkerhetspraxis förbättrar avsevärt den övergripande säkerheten för AI-system och MCP-distributioner.

### Kärnprinciper för säkerhet

#### **Säkra utvecklingsrutiner**  
- **OWASP-efterlevnad**: Skydda mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) webbapplikationssårbarheter  
- **AI-specifika skydd**: Implementera kontroller för [OWASP Top 10 för LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Säker hemlighetshantering**: Använd dedikerade valv för token, API-nycklar och känslig konfigurationsdata  
- **End-to-end-kryptering**: Implementera säker kommunikation över alla applikationskomponenter och dataflöden  
- **Inputvalidering**: Strikt validering av alla användarinmatningar, API-parametrar och datakällor  

#### **Infrastrukturförstärkning**  
- **Multifaktorautentisering**: Obligatorisk MFA för alla administrativa och servicekonton  
- **Patchhantering**: Automatiserad, snabb patchning för operativsystem, ramverk och beroenden  
- **Identitetsleverantörsintegration**: Centraliserad identitetshantering via företagsleverantörer (Microsoft Entra ID, Active Directory)  
- **Nätverkssegmentering**: Logisk isolering av MCP-komponenter för att begränsa lateral rörelse  
- **Minsta privilegium-principen**: Minsta nödvändiga behörigheter för alla systemkomponenter och konton  

#### **Säkerhetsövervakning & detektion**  
- **Omfattande loggning**: Detaljerad loggning av AI-applikationsaktiviteter, inklusive MCP-klient-serverinteraktioner  
- **SIEM-integration**: Centraliserad säkerhetsinformations- och händelsehantering för avvikelsedetektion  
- **Beteendeanalys**: AI-drivna övervakningsverktyg för att upptäcka ovanliga mönster i system- och användarbeteende  
- **Hotintelligens**: Integration av externa hotflöden och kompromissindikatorer (IOC)  
- **Incidenthantering**: Väl definierade processer för säkerhetsincidentdetektion, respons och återhämtning  

#### **Zero Trust-arkitektur**  
- **Lita aldrig, verifiera alltid**: Kontinuerlig verifiering av användare, enheter och nätverksanslutningar  
- **Mikrosegmentering**: Granulära nätverkskontroller som isolerar enskilda arbetsbelastningar och tjänster  
- **Identitetscentrerad säkerhet**: Säkerhetspolicys baserade på verifierade identiteter snarare än nätverksplats  
- **Kontinuerlig riskbedömning**: Dynamisk utvärdering av säkerhetsläge baserat på aktuell kontext och beteende  
- **Villkorad åtkomst**: Åtkomstkontroller som anpassas efter riskfaktorer, plats och enhetens tillit  

### Företagsintegrationsmönster

#### **Microsoft säkerhetsekosystemintegration**  
- **Microsoft Defender for Cloud**: Omfattande molnsäkerhetshantering  
- **Azure Sentinel**: Molnbaserad SIEM och SOAR för skydd av AI-arbetsbelastningar  
- **Microsoft Entra ID**: Företagsidentitets- och åtkomsthantering med villkorade åtkomstpolicys  
- **Azure Key Vault**: Centraliserad hemlighetshantering med HSM-stöd  
- **Microsoft Purview**: Datastyrning och efterlevnad för AI-datakällor och arbetsflöden  

#### **Efterlevnad & styrning**  
- **Regelverksanpassning**: Säkerställ att MCP-implementationer uppfyller branschspecifika efterlevnadskrav (GDPR, HIPAA, SOC 2)  
- **Dataklassificering**: Korrekt kategorisering och hantering av känslig data som behandlas av AI-system  
- **Revisionsspår**: Omfattande loggning för regulatorisk efterlevnad och kriminalteknisk undersökning  
- **Integritetskontroller**: Implementering av integritet-från-början-principer i AI-systemarkitektur  
- **Ändringshantering**: Formella processer för säkerhetsgranskning av AI-systemändringar  

Dessa grundläggande rutiner skapar en robust säkerhetsbas som förstärker effektiviteten i MCP-specifika säkerhetskontroller och erbjuder heltäckande skydd för AI-drivna applikationer.
## Viktiga Säkerhetsinsikter

- **Flerlagerssäkerhetsmetod**: Kombinera grundläggande säkerhetspraxis (säker kodning, minsta behörighet, leverantörskedjeverifiering, kontinuerlig övervakning) med AI-specifika kontroller för heltäckande skydd

- **AI-specifika Hotbilden**: MCP-system står inför unika risker inklusive promptinjektion, verktygsförgiftning, sessionskapning, förvirrad ombud-problem, token-passthrough-sårbarheter och överdrivna behörigheter som kräver specialiserade åtgärder

- **Autentisering och Auktorisering i Framkant**: Implementera robust autentisering med externa identitetsleverantörer (Microsoft Entra ID), genomför korrekt tokenvalidering och acceptera aldrig tokens som inte uttryckligen utfärdats för din MCP-server

- **Förebyggande av AI-attacker**: Använd Microsoft Prompt Shields och Azure Content Safety för att försvara mot indirekt promptinjektion och verktygsförgiftningsattacker, samtidigt som verktygsmetadata valideras och dynamiska förändringar övervakas

- **Sessions- och Transport Säkerhet**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID kopplade till användaridentiteter, implementera korrekt hantering av sessionslivscykeln och använd aldrig sessioner för autentisering

- **OAuth Säkerhetsbästa Praxis**: Förhindra attacker med förvirrat ombud genom uttryckligt användarsamtycke för dynamiskt registrerade klienter, korrekt OAuth 2.1-implementering med PKCE, och strikt validering av redirect URI

- **Token Säkerhetsprinciper**: Undvik token passthrough-anti-mönster, validera tokenmottagarens claims, implementera kortlivade tokens med säker rotation och upprätthåll tydliga förtroendegränser

- **Omfattande Leverantörskedjesäkerhet**: Behandla alla AI-ekosystemets komponenter (modeller, embeddingar, kontextleverantörer, externa API:er) med samma säkerhetshänsyn som traditionella mjukvaruberoenden

- **Kontinuerlig Utveckling**: Håll dig uppdaterad med snabbt föränderliga MCP-specifikationer, bidra till säkerhetsgemenskapens standarder och bibehåll anpassningsbara säkerhetspositioner i takt med protokollets mognad

- **Microsofts Säkerhetsintegration**: Utnyttja Microsofts heltäckande säkerhetsekosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) för förbättrat MCP-distributionsskydd

## Omfattande Resurser

### **Officiell MCP Säkerhetsdokumentation**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP Säkerhetsresurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Omfattande OWASP MCP Topp 10 med Azure-implementeringsvägledning
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Officiella OWASP MCP säkerhetsrisker
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktisk säkerhetsträning för MCP på Azure

### **Säkerhetsstandarder & Bästa Praxis**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI Säkerhetsforskning & Analys**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Säkerhetslösningar**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementeringsguider & Handledning**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Leverantörskedjesäkerhet**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ytterligare Säkerhetsdokumentation**

För omfattande säkerhetsriktlinjer, se dessa specialiserade dokument i denna sektion:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Komplett säkerhetsbästa praxis för MCP-implementationer
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktiska implementationsexempel för integration av Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Senaste säkerhetskontroller och tekniker för MCP-distributioner
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Snabbreferensguide för viktiga MCP säkerhetspraxis

### **Praktisk Säkerhetsträning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Omfattande praktisk workshop för att säkra MCP-servrar i Azure med progressiva läger från Base Camp till Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referensarkitektur och implementationsvägledning för alla OWASP MCP Topp 10 risker

---

## Vad är Nästa

Nästa: [Kapitel 3: Komma igång](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, vänligen var medveten om att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->