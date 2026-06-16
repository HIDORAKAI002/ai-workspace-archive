# MCP-säkerhet: Omfattande skydd för AI-system

[![MCP Security Best Practices](../../../translated_images/sv/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klicka på bilden ovan för att se videon för denna lektion)_

Säkerhet är grundläggande för AI-systemdesign, vilket är anledningen till att vi prioriterar det som vår andra sektion. Detta överensstämmer med Microsofts princip **Secure by Design** från [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) ger kraftfulla nya möjligheter till AI-drivna applikationer samtidigt som det introducerar unika säkerhetsutmaningar som sträcker sig bortom traditionella mjukvarurisker. MCP-system står inför både etablerade säkerhetsproblem (säker kodning, minsta privilegium, leverantörskedjesäkerhet) och nya AI-specifika hot inklusive promptinjektion, verktygsförgiftning, sessionkapningar, confused deputy-attacker, sårbarheter vid token-passthrough och dynamisk kapacitetsmodifiering.

Denna lektion utforskar de mest kritiska säkerhetsriskerna i MCP-implementationer – med fokus på autentisering, auktorisering, överdrivna behörigheter, indirekt promptinjektion, sessionssäkerhet, confused deputy-problem, tokenhantering och sårbarheter i leverantörskedjan. Du kommer att lära dig handlingsbara kontroller och bästa praxis för att mildra dessa risker samtidigt som du utnyttjar Microsoft-lösningar som Prompt Shields, Azure Content Safety och GitHub Advanced Security för att stärka din MCP-distribution.

## Lärandemål

I slutet av denna lektion kommer du att kunna:

- **Identifiera MCP-specifika hot**: Känna igen unika säkerhetsrisker i MCP-system inklusive promptinjektion, verktygsförgiftning, överdrivna behörigheter, sessionkapning, confused deputy-problem, sårbarheter vid token-passthrough och risker i leverantörskedjan
- **Tillämpa säkerhetskontroller**: Implementera effektiva motåtgärder inklusive robust autentisering, tillgång enligt minsta privilegium, säker tokenhantering, sessionkontroller och verifiering av leverantörskedjan
- **Använda Microsofts säkerhetslösningar**: Förstå och distribuera Microsoft Prompt Shields, Azure Content Safety och GitHub Advanced Security för skydd av MCP-arbetslaster
- **Validera verktygssäkerhet**: Känna igen vikten av validering av verktygsmetadata, övervakning för dynamiska förändringar och försvar mot indirekta promptinjektionsattacker
- **Integrera bästa praxis**: Kombinera etablerade säkerhetsgrunder (säker kodning, serverhärdning, zero trust) med MCP-specifika kontroller för omfattande skydd

# MCP-säkerhetsarkitektur & kontroller

Moderna MCP-implementationer kräver flerskiktade säkerhetsmetoder som adresserar både traditionell mjukvarusäkerhet och AI-specifika hot. Den snabbt utvecklande MCP-specifikationen fortsätter att mogna sina säkerhetskontroller, vilket möjliggör bättre integration med företags säkerhetsarkitekturer och etablerad bästa praxis.

Forskning från [Microsoft Digital Defense Report](https://aka.ms/mddr) visar att **98 % av rapporterade intrång skulle förhindras genom robust säkerhetshygien**. Den mest effektiva skyddsstrategin kombinerar grundläggande säkerhetspraxis med MCP-specifika kontroller – beprövade baslinjemått för säkerhet är fortfarande mest effektiva för att minska den övergripande säkerhetsrisken.

## Nuvarande säkerhetslandskap

> **Observera:** Denna information speglar MCP-säkerhetsstandarder per **5 februari 2026**, i enlighet med **MCP Specification 2025-11-25**. MCP-protokollet utvecklas snabbt och framtida implementationer kan introducera nya autentiseringsmönster och förstärkta kontroller. Hänvisa alltid till nuvarande [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub repository](https://github.com/modelcontextprotocol) och [säkerhetsbästa praxis dokumentation](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) för senaste vägledning.

## 🏔️ MCP Security Summit Workshop (Sherpa)

För **praktisk säkerhetsträning** rekommenderar vi varmt **MCP Security Summit Workshop** (Sherpa) – en omfattande guidad expedition för att säkra MCP-servrar i Microsoft Azure.

### Workshopöversikt

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) erbjuder praktisk, handlingsbar säkerhetsträning genom en väl beprövad "sårbar → exploatera → fixa → validera"-metodik. Du kommer att:

- **Lära dig genom att bryta saker**: Upplev sårbarheter direkt genom att exploatera avsiktligt osäkra servrar
- **Använda Azure-native säkerhet**: Utnyttja Azure Entra ID, Key Vault, API Management och AI Content Safety
- **Följa Defense-in-Depth**: Progridera genom basläger och bygg omfattande säkerhetslager
- **Tillämpa OWASP-standarder**: Varje teknik kopplas till [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Få produktionsfärdig kod**: Gå därifrån med fungerande, testade implementationer

### Expeditionsrutt

| Läger | Fokus | OWASP-risker som täcks |
|-------|-------|-----------------------|
| **Basläger** | MCP-grunder & autentiseringssårbarheter | MCP01, MCP07 |
| **Läger 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Läger 2: Gateway** | API Management, privata endpoints, styrning | MCP02, MCP06, MCP07, MCP09 |
| **Läger 3: I/O-säkerhet** | Promptinjektion, skydd av PII, innehållssäkerhet | MCP03, MCP05, MCP06, MCP10 |
| **Läger 4: Övervakning** | Logganalys, dashboards, hotdetektering | MCP04, MCP08 |
| **Toppen** | Red Team / Blue Team integrationsprov | Alla |

**Kom igång**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Topp 10 säkerhetsrisker

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) beskriver de tio mest kritiska säkerhetsriskerna för MCP-implementationer:

| Risk | Beskrivning | Azure-mitigering |
|-------|-------------|------------------|
| **MCP01** | Felaktig tokenhantering & exponering av hemligheter | Azure Key Vault, Managed Identity |
| **MCP02** | Privilegiumeskalering via scope creep | RBAC, Conditional Access |
| **MCP03** | Verktygsförgiftning | Verktygsvalidering, integritetsverifiering |
| **MCP04** | Angrepp mot mjukvaruleverantörskedjan & manipulation av beroenden | GitHub Advanced Security, beroendeskanning |
| **MCP05** | Kommandoinjektion & exekvering | Inmatningsvalidering, sandboxing |
| **MCP06** | Underminering av avsiktsflöde | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Otillräcklig autentisering & auktorisering | Azure Entra ID, OAuth 2.1 med PKCE |
| **MCP08** | Avsaknad av revision och telemetri | Azure Monitor, Application Insights |
| **MCP09** | Skugg-MCP-servrar | API Center governance, nätverksisolering |
| **MCP10** | Kontextinjektion & överdelning | Dataklassificering, minimal exponering |

### Utveckling av MCP-autentisering

MCP-specifikationen har utvecklats betydligt i sitt förhållningssätt till autentisering och auktorisering:

- **Ursprungligt förfarande**: Tidiga specifikationer krävde att utvecklare implementerade egna autentiseringsservrar, där MCP-servrar fungerade som OAuth 2.0 Authorization Servers och hanterade användarautentisering direkt
- **Nuvarande standard (2025-11-25)**: Uppdaterad specifikation tillåter MCP-servrar att delegera autentisering till externa identitetsleverantörer (som Microsoft Entra ID), vilket förbättrar säkerhet och minskar komplexitet i implementationen
- **Transportskydd**: Förbättrat stöd för säkra transportmekanismer med korrekta autentiseringsmönster för både lokala (STDIO) och fjärranslutningar (Streamable HTTP)

## Autentisering & auktorisering säkerhet

### Nuvarande säkerhetsutmaningar

Moderna MCP-implementationer möter flera autentiserings- och auktoriseringsutmaningar:

### Risker & hotvektorer

- **Felkonfigurerad auktoriseringslogik**: Bristfällig auktoriseringsimplementering i MCP-servrar kan exponera känslig data och felaktigt tillämpa åtkomstkontroller
- **OAuth-tokenkompromiss**: Stöld av token från lokal MCP-server möjliggör för angripare att utge sig för servrar och få tillgång till downstream-tjänster
- **Sårbarheter vid token-passthrough**: Felaktig hantering av token skapar säkerhetskontrollgenomgångar och brister i ansvarsskyldighet
- **Överdrivna behörigheter**: MCP-servrar med för många rättigheter bryter mot principen om minsta privilegium och ökar attackytor

#### Token passthrough: Ett kritiskt anti-mönster

**Token passthrough är uttryckligen förbjudet** i den nuvarande MCP-autoriseringsspecifikationen på grund av allvarliga säkerhetskonsekvenser:

##### Säkerhetskontrollbypassing
- MCP-servrar och downstream-API:er implementerar kritiska säkerhetskontroller (t.ex. begränsning av anrop, validering och trafikövervakning) som bygger på korrekt tokenvalidering
- Direkt klient-till-API-tokenanvändning kringgår dessa väsentliga skydd och undergräver säkerhetsarkitekturen

##### Ansvars- och revisionsutmaningar  
- MCP-servrar kan inte skilja mellan klienter som använder upstream-emitterade token, vilket bryter revisionsspåren
- Loggar från downstream-resurser visar vilseledande förfrågningskällor istället för verkliga MCP-server-mellanhand
- Incidentutredning och efterlevnadsrevision blir avsevärt svårare

##### Risk för dataexfiltrering
- Ovaliderade tokenkrav möjliggör för illasinnade aktörer med stulna token att använda MCP-servrar som proxys för dataexfiltrering
- Brott mot förtroendegränser tillåter obehöriga åtkomstmönster som undgår avsedda säkerhetskontroller

##### Multi-service attackvektorer
- Komprometterade token som accepteras av flera tjänster möjliggör laterala rörelser över sammankopplade system
- Förtroendeantaganden mellan tjänster kan brytas när tokenursprung inte kan verifieras

### Säkerhetskontroller & motåtgärder

**Kritiska säkerhetskrav:**

> **OBLIGATORISKT**: MCP-servrar **FÅR INTE** acceptera några token som inte uttryckligen utfärdats för MCP-servern

#### Autentiserings- och auktoriseringskontroller

- **Noggrann auktoriseringsgranskning**: Genomför omfattande revisioner av MCP-serverns auktoriseringslogik för att säkerställa att endast avsedda användare och klienter kan få åtkomst till känsliga resurser
  - **Implementeringsguide**: [Azure API Management som autentiseringsgateway för MCP-servrar](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identitetsintegration**: [Använda Microsoft Entra ID för MCP-serverautentisering](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Säker tokenhantering**: Implementera [Microsofts bästa praxis för tokenvalidering och livscykel](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validera att token-åhörarkrav matchar MCP-serveridentiteten
  - Implementera korrekt tokenrotation och utgångspolicys
  - Förhindra token-uppspelningsattacker och obehörig användning

- **Skyddad tokenlagring**: Säker tokenlagring med kryptering vid vila och under överföring
  - **Bästa praxis**: [Riktlinjer för säker tokenlagring och kryptering](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementering av åtkomstkontroll

- **Principen om minsta privilegium**: Ge MCP-servrar endast minimala rättigheter som krävs för avsedd funktionalitet
  - Regelbundna granskningar och uppdateringar för att förhindra privilegieutvidgning
  - **Microsoft-dokumentation**: [Säkert minsta privilegierad åtkomst](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollbaserad åtkomstkontroll (RBAC)**: Implementera finmaskiga rolltilldelningar
  - Begränsa roller strikt till specifika resurser och åtgärder
  - Undvik breda eller onödiga behörigheter som ökar attackytan

- **Kontinuerlig övervakning av behörigheter**: Implementera löpande åtkomstrevisioner och övervakning
  - Bevaka användningsmönster för behörigheter för anomalier
  - Åtgärda snabbt överdrivna eller oanvända privilegier

## AI-specifika säkerhetshot

### Promptinjektion & verktygsmanipulationsattacker

Moderna MCP-implementationer möter sofistikerade AI-specifika attackvektorer som traditionella säkerhetsåtgärder inte fullt ut kan hantera:

#### **Indirekt promptinjektion (Cross-Domain Prompt Injection)**

**Indirekt promptinjektion** representerar en av de mest kritiska sårbarheterna i AI-system med MCP. Angripare bäddar in skadliga instruktioner i externt innehåll – dokument, webbsidor, e-post eller datakällor – som AI-system sedan behandlar som legitima kommandon.

**Attackscenarier:**
- **Dokumentbaserad injektion**: Skadliga instruktioner gömda i bearbetade dokument som triggar oavsiktade AI-åtgärder
- **Webbinnehållsexploatering**: Komprometterade webbsidor med inbäddade prompts som manipulerar AI-beteende vid skrapning
- **E-postbaserade attacker**: Skadliga prompts i e-post som får AI-assistenter att läcka information eller utföra obehöriga handlingar
- **Kontaminering av datakällor**: Komprometterade databaser eller API:er som levererar förorenat innehåll till AI-system

**Verklig påverkan**: Dessa attacker kan leda till dataexfiltrering, integritetsbrott, generering av skadligt innehåll och manipulation av användarinteraktioner. För detaljerad analys, se [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sv/prompt-injection.ed9fbfde297ca877.webp)

#### **Verktygsförgiftningsattacker**

**Verktygsförgiftning** riktar sig mot metadata som definierar MCP-verktyg, och utnyttjar hur stora språkmodeller (LLM) tolkar verktygsbeskrivningar och parametrar för att fatta exekveringsbeslut.

**Attackmekanismer:**
- **Manipulation av metadata**: Angripare injicerar skadliga instruktioner i verktygsbeskrivningar, parameterdefinitioner eller användningsexempel
- **Osynliga instruktioner**: Dolda prompts i verktygsmetadata som bearbetas av AI-modeller men är osynliga för användare
- **Dynamisk verktygsmodifiering ("Rug Pulls")**: Verktyg som godkänts av användare modifieras senare för att utföra skadliga handlingar utan användarens vetskap
- **Parameterinjektion**: Skadligt innehåll inbäddat i schemas för verktygsparametrar som påverkar modellbeteendet

**Risker med hostade servrar**: Fjärr-MCP-servrar medför ökade risker eftersom verktygsdefinitioner kan uppdateras efter initial användargodkännande, vilket skapar scenarier där tidigare säkra verktyg blir skadliga. För omfattande analys, se [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sv/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ytterligare AI-attackvektorer**

- **Cross-Domain Prompt Injection (XPIA)**: Sofistikerade attacker som utnyttjar innehåll från flera domäner för att kringgå säkerhetskontroller
- **Dynamisk kapacitetsmodifiering**: Ändringar i verktygsfunktioner i realtid som undkommer initiala säkerhetsbedömningar  
- **Förgiftning av kontextfönster**: Angrepp som manipulerar stora kontextfönster för att dölja illasinnade instruktioner  
- **Modellförvirringsangrepp**: Utnyttjande av modellbegränsningar för att skapa oförutsägbara eller osäkra beteenden  

### AI-säkerhetsriskens påverkan

**Konsekvenser med hög påverkan:**  
- **Dataexfiltrering**: Obehörig åtkomst och stöld av känsliga företags- eller personuppgifter  
- **Integritetsintrång**: Exponering av personligt identifierbar information (PII) och konfidentiella affärsdata  
- **Systemmanipulation**: Oavsiktliga ändringar i kritiska system och arbetsflöden  
- **Stöld av autentiseringsuppgifter**: Kompromettering av autentiseringstoken och tjänstekredentialer  
- **Laterala rörelser**: Användning av komprometterade AI-system som utgångspunkt för bredare nätverksattacker  

### Microsoft AI-säkerhetslösningar

#### **AI Prompt Shields: Avancerat skydd mot injektionsattacker**

Microsofts **AI Prompt Shields** erbjuder omfattande försvar mot både direkta och indirekta promptinjektionsattacker genom flera säkerhetslager:

##### **Kärnskyddsmekanismer:**

1. **Avancerad upptäckt och filtrering**  
   - Maskininlärningsalgoritmer och NLP-tekniker upptäcker illasinnade instruktioner i externt innehåll  
   - Realtidsanalys av dokument, webbsidor, e-post och datakällor för inbäddade hot  
   - Kontextuell förståelse av legitima kontra illasinnade promptmönster  

2. **Spotlighting-tekniker**  
   - Skiljer mellan betrodda systeminstruktioner och potentiellt komprometterade externa indata  
   - Texttransformationsmetoder som förbättrar modellens relevans samtidigt som illasinnat innehåll isoleras  
   - Hjälper AI-system att upprätthålla korrekt instruktionshierarki och ignorera injicerade kommandon  

3. **Avgränsare och datamarkeringssystem**  
   - Tydlig gränsdragning mellan betrodda systemmeddelanden och extern inmatningstext  
   - Särskilda markörer som framhäver gränser mellan betrodda och icke-betrodda datakällor  
   - Klar separation förhindrar instruktionförvirring och obehörig kommandoexekvering  

4. **Kontinuerlig hotintelligens**  
   - Microsoft övervakar ständigt nya angreppsmönster och uppdaterar försvar  
   - Proaktiv hotjakt efter nya injektionstekniker och angreppsvektorer  
   - Regelbundna säkerhetsuppdateringar av modeller för att upprätthålla effektivitet mot utvecklande hot  

5. **Integration med Azure Content Safety**  
   - Del av den omfattande Azure AI Content Safety-sviten  
   - Ytterligare upptäckt av jailbreakförsök, skadligt innehåll och säkerhetspolitiska överträdelser  
   - Enhetlig säkerhetskontroll över AI-applikationskomponenter  

**Implementeringsresurser**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/sv/prompt-shield.ff5b95be76e9c78c.webp)  


## Avancerade MCP-säkerhetshot

### Sårbarheter för sessionskapning

**Sessionskapning** utgör en kritisk angreppsvektor i tillståndsbevarande MCP-implementationer där obehöriga parter får och missbrukar legitima sessionsidentifierare för att utge sig för att vara klienter och utföra obehöriga handlingar.

#### **Angreppsscenarier och risker**

- **Sessionskapningspromptinjektion**: Angripare med stulna sessions-ID:n injicerar illasinnade händelser i servrar som delar sessionstillstånd, vilket kan utlösa skadliga åtgärder eller ge åtkomst till känslig data  
- **Direkt utgivning**: Stulna sessions-ID:n möjliggör direkt anrop till MCP-servrar som kringgår autentisering och behandlar angripare som legitima användare  
- **Komprometterade återupptagningsbara strömmar**: Angripare kan avbryta förfrågningar för tidigt, vilket tvingar legitima klienter att återuppta med potentiellt skadligt innehåll  

#### **Säkerhetskontroller för sessionshantering**

**Kritiska krav:**  
- **Autorisationsverifiering**: MCP-servrar som implementerar auktorisation **MÅSTE** verifiera ALLA inkommande förfrågningar och **FÅR INTE** förlita sig på sessioner för autentisering  
- **Säker sessionsgenerering**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID:n genererade med säkra slumptalsgeneratorer  
- **Användarspecifik bindning**: Koppla sessions-ID:n till användarspecifik information med format som `<user_id>:<session_id>` för att förhindra sessionsmissbruk mellan användare  
- **Sessionslivscykelhantering**: Implementera korrekt utgång, rotation och ogiltigförklaring för att begränsa sårbarhetsfönster  
- **Transportssäkerhet**: Obligatorisk HTTPS för all kommunikation för att förhindra avlyssning av sessions-ID:n  

### Förvirrad ombud-problematik

Problemet med **förvirrat ombud** uppstår när MCP-servrar fungerar som autentiseringsproxy mellan klienter och tredjepartstjänster, vilket skapar möjligheter för auktorisationsomgåelse genom utnyttjande av statiska klient-ID:n.

#### **Angreppsmetodik och risker**

- **Omskrivning av cookies för samtycke**: Tidigare användarauthentisering skapar samtyckes-cookies som angripare utnyttjar genom illasinnade auktorisationsförfrågningar med manipulerade redirect-URI:er  
- **Stöld av auktoriseringskod**: Befintliga samtyckes-cookies kan orsaka att auktoriseringsservrar hoppar över samtyckesskärm och omdirigerar koder till attackerarkontrollerade ändpunkter  
- **Obehörig API-åtkomst**: Stulna auktoriseringskoder möjliggör token-exchange och användarförfalskning utan uttryckligt godkännande  

#### **Åtgärdsstrategier**

**Obligatoriska kontroller:**  
- **Explicit samtyckeskrav**: MCP proxytjänster som använder statiska klient-ID:n **MÅSTE** inhämta användarsamtycke för varje dynamiskt registrerad klient  
- **OAuth 2.1-säkerhetsimplementering**: Följ aktuella OAuth-säkerhetsriktlinjer inklusive PKCE (Proof Key for Code Exchange) för alla auktorisationsförfrågningar  
- **Strikt klientvalidering**: Implementera rigorös validering av redirect-URI:er och klientidentifierare för att förebygga utnyttjande  

### Sårbarheter för token-vidarebefordran

**Token-vidarebefordran** är ett uttryckligt anti-mönster där MCP-servrar accepterar klienttoken utan korrekt validering och vidarebefordrar dem till nedströms-API:er, vilket bryter mot MCP:s auktorisationsspecifikationer.

#### **Säkerhetskonsekvenser**

- **Omgång av kontroller**: Direkt användning av klient-till-API-token kringgår viktiga begränsningar för hastighet, validering och övervakning  
- **Inkorrigibel revisionskedja**: Token utfärdade uppströms gör klientidentifiering omöjlig, vilket förhindrar incidentutredningar  
- **Proxybaserad dataexfiltrering**: Ovaliderade token gör det möjligt för illasinnade aktörer att använda servrar som proxy för obehörig dataåtkomst  
- **Brott mot förtroendegränser**: Nedströms tjänsters förtroendeantaganden kan brytas när tokenursprung inte kan verifieras  
- **Expansion av attacker till flera tjänster**: Komprometterade token som accepteras i flera tjänster möjliggör laterala rörelser  

#### **Nödvändiga säkerhetskontroller**

**Icke-förhandlingsbara krav:**  
- **Tokenvalidering**: MCP-servrar **FÅR INTE** acceptera token som inte uttryckligen utfärdats för MCP-servern  
- **Verifiering av mottagare**: Säkerställ att token-mottagarkrav alltid matchar MCP-serverns identitet  
- **Korrekt tokenlivscykel**: Implementera kortlivade access-token med säkra rotationsrutiner  

## Säkerhet i leveranskedjan för AI-system

Säkerhet i leveranskedjan har utvecklats från traditionella mjukvaruberoenden till att omfatta hela AI-ekosystemet. Moderna MCP-implementationer måste rigoröst verifiera och övervaka alla AI-relaterade komponenter, då varje introducerar potentiella sårbarheter som kan kompromettera systemets integritet.

### Utvidgade komponenter i AI-leveranskedjan

**Traditionella mjukvaruberoenden:**  
- Öppen källkodsbibliotek och ramverk  
- Containerbilder och basystem  
- Utvecklingsverktyg och byggpipelines  
- Infrastrukturkomponenter och tjänster  

**AI-specifika leveranskedjeelement:**  
- **Grundmodeller**: Förtränade modeller från olika leverantörer som kräver ursprungsverifiering  
- **Embeddingtjänster**: Externa vektoriseringar och semantiska söktjänster  
- **Kontextleverantörer**: Datakällor, kunskapsbaser och dokumentarkiv  
- **Tredjeparts-API:er**: Externa AI-tjänster, ML-pipelines och datapreparationsendpoints  
- **Modellartefakter**: Vikter, konfigurationer och finjusterade modellvarianter  
- **Träningsdatakällor**: Dataset som används för träning och finjustering av modeller  

### Omfattande strategi för säkerhet i leveranskedjan

#### **Komponentverifiering och förtroende**  
- **Verifiering av ursprung**: Säkerställ källa, licensiering och integritet för alla AI-komponenter före integration  
- **Säkerhetsbedömning**: Utför sårbarhetsskanning och säkerhetsgranskning av modeller, datakällor och AI-tjänster  
- **Rykteanalys**: Utvärdera säkerhetshistorik och praxis hos AI-tjänsteleverantörer  
- **Efterlevnadsverifiering**: Säkerställ att alla komponenter uppfyller organisationens säkerhets- och regelkrav  

#### **Säkra distributionspipelines**  
- **Automatiserad CI/CD-säkerhet**: Integrera säkerhetsskanning under hela automatiserade distributionspipelines  
- **Integritet för artefakter**: Använd kryptografisk verifiering av alla distribuerade artefakter (kod, modeller, konfigurationer)  
- **Stegvis distribution**: Använd progressiva distributionsstrategier med säkerhetsvalidering i varje steg  
- **Betrodda artefaktförråd**: Distribuera endast från verifierade och säkra artefaktregister och förråd  

#### **Kontinuerlig övervakning och respons**  
- **Beroendeskanning**: Löpande sårbarhetsövervakning för alla mjukvaru- och AI-komponentberoenden  
- **Modellövervakning**: Kontinuerlig bedömning av modellbeteende, prestandaförändringar och säkerhetsavvikelser  
- **Servicehälsospårning**: Övervaka externa AI-tjänster för tillgänglighet, säkerhetsincidenter och policyändringar  
- **Hotintelligensintegration**: Inkludera hotdata specifik för AI och ML-säkerhetsrisker  

#### **Åtkomstkontroll och minimerad behörighet**  
- **Behörigheter på komponentnivå**: Begränsa åtkomst till modeller, data och tjänster efter affärsbehov  
- **Hantera tjänstekonton**: Implementera dedikerade tjänstekonton med minimala nödvändiga rättigheter  
- **Nätverkssegmentering**: Isolera AI-komponenter och begränsa nätverksåtkomst mellan tjänster  
- **API-gateway-kontroller**: Använd centraliserade API-gateways för att kontrollera och övervaka åtkomst till externa AI-tjänster  

#### **Incidentrespons och återhämtning**  
- **Snabb responstid**: Etablerade processer för patchning eller ersättning av komprometterade AI-komponenter  
- **Rotation av autentiseringsuppgifter**: Automatiska system för rotation av hemligheter, API-nycklar och tjänstekredentialer  
- **Återställningsmöjligheter**: Förmåga att snabbt återgå till tidigare kända goda versioner av AI-komponenter  
- **Återhämtning från leveranskedjebrott**: Specifika procedurer för hantering av komprometterade uppströms AI-tjänster  

### Microsofts säkerhetsverktyg och integration

**GitHub Advanced Security** erbjuder heltäckande skydd i leveranskedjan inklusive:  
- **Sekretesskanning**: Automatisk upptäckt av autentiseringsuppgifter, API-nycklar och tokens i repo  
- **Beroendeskanning**: Sårbarhetsbedömning för öppen källkodsberoenden och bibliotek  
- **CodeQL-analys**: Statisk kodanalys för säkerhetsbrister och kodproblem  
- **Insikter om leveranskedjan**: Synlighet i beroendehälsa och säkerhetsstatus  

**Integration med Azure DevOps och Azure Repos:**  
- Sömlös säkerhetsskanning i Microsofts utvecklingsplattformar  
- Automatiska säkerhetskontroller i Azure Pipelines för AI-arbetsflöden  
- Policypåverkan för säker distribution av AI-komponenter  

**Microsofts interna praxis:**  
Microsoft tillämpar omfattande säkerhetspraxis för leveranskedjan i alla produkter. Läs om beprövade tillvägagångssätt i [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Grundläggande säkerhetspraxis

MCP-implementationer ärver och bygger vidare på organisationens befintliga säkerhetspostur. Att stärka grundläggande säkerhetspraxis förbättrar avsevärt den övergripande säkerheten i AI-system och MCP-distributioner.

### Kärnfunktioner i säkerhet

#### **Säkra utvecklingsmetoder**  
- **OWASP-efterlevnad**: Skydd mot [OWASP Top 10](https://owasp.org/www-project-top-ten/) webbapplikationssårbarheter  
- **AI-specifika skydd**: Implementera kontroller för [OWASP Top 10 för LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Säker hantering av hemligheter**: Använd dedikerade valv för tokens, API-nycklar och känsliga konfigurationsdata  
- **End-to-end-kryptering**: Säkerställ säkra kommunikationskanaler i hela applikationskomponenter och dataflöden  
- **Indatavärdering**: Grundlig validering av all användarinmatning, API-parametrar och datakällor  

#### **Härdning av infrastruktur**  
- **Multifaktorautentisering**: Obligatorisk MFA för alla administrativa och tjänstekonton  
- **Patchhantering**: Automatiserad, snabb patchning av operativsystem, ramverk och beroenden  
- **Integration med identitetsleverantör**: Centraliserad identitetshantering via företagsidentitetsleverantörer (Microsoft Entra ID, Active Directory)  
- **Nätverkssegmentering**: Logisk isolering av MCP-komponenter för att begränsa laterala rörelser  
- **Principen om minsta privilegium**: Minimala nödvändiga rättigheter för alla systemkomponenter och konton  

#### **Säkerhetsövervakning och upptäckt**  
- **Omfattande loggning**: Detaljerad loggning av AI-applikationsaktiviteter inklusive MCP klient-server-interaktioner  
- **SIEM-integration**: Centraliserad säkerhetsinformations- och händelsehantering för anomalidetektion  
- **Beteendeanalys**: AI-driven övervakning för att upptäcka ovanliga mönster i system- och användarbeteenden  
- **Hotintelligens**: Integration av externa hotdataflöden och kompromissindikatorer (IOC)  
- **Incidentrespons**: Väl definierade procedurer för upptäckt, respons och återhämtning vid säkerhetsincidenter  

#### **Zero Trust-arkitektur**  
- **Lita aldrig, verifiera alltid**: Kontinuerlig verifiering av användare, enheter och nätverksanslutningar  
- **Mikrosegmentering**: Finkorniga nätverkskontroller som isolerar enskilda arbetsbelastningar och tjänster  
- **Identitetscentrerad säkerhet**: Säkerhetspolicyer baserade på verifierade identiteter snarare än nätverksplats  
- **Kontinuerlig riskbedömning**: Dynamisk utvärdering av säkerhetspostur baserad på aktuell kontext och beteende  
- **Villkorad åtkomst**: Åtkomstkontroller som anpassar sig efter riskfaktorer, plats och enhetens förtroende  

### Företagsintegrationsmönster

#### **Integration i Microsofts säkerhetsekosystem**  
- **Microsoft Defender for Cloud**: Omfattande hantering av säkerhetspostur i molnet  
- **Azure Sentinel**: Molnbaserad SIEM och SOAR för skydd av AI-arbetsbelastningar  
- **Microsoft Entra ID**: Företagsidentitets- och åtkomsthantering med villkorade åtkomstpolicyer  
- **Azure Key Vault**: Centraliserad hantering av hemligheter med stöd av hårdvarusäkerhetsmodul (HSM)  
- **Microsoft Purview**: Datastyrning och efterlevnad för AI-datakällor och arbetsflöden  

#### **Efterlevnad och styrning**  
- **Regulatorisk anpassning**: Säkerställ att MCP-implementationer uppfyller branschspecifika efterlevnadskrav (GDPR, HIPAA, SOC 2)  
- **Dataklassificering**: Korrekt kategorisering och hantering av känsliga data som behandlas av AI-system  
- **Revisionsspår**: Omfattande loggning för regelöverensstämmelse och forensisk utredning  
- **Integritetskontroller**: Implementering av integritet-som-design-principer i AI-systemarkitekturen  
- **Ändringshantering**: Formella processer för säkerhetsgranskning av ändringar i AI-system  

Dessa grundläggande praxis utgör en robust säkerhetsbas som stärker effekten av MCP-specifika säkerhetskontroller och ger omfattande skydd för AI-drivna applikationer.  

## Viktiga säkerhetsinsikter
- **Flerlagersäkerhetsstrategi**: Kombinera grundläggande säkerhetspraxis (säker kodning, minsta privilegium, leveranskedjeverifiering, kontinuerlig övervakning) med AI-specifika kontroller för heltäckande skydd

- **AI-specifika hotlandskap**: MCP-system står inför unika risker inklusive promptinjektion, förgiftning av verktyg, sessionskapning, confused deputy-problem, sårbarheter med token-passthrough och överdrivna behörigheter som kräver specialanpassade motåtgärder

- **Autentisering & Auktorisering i toppklass**: Implementera robust autentisering med externa identitetsleverantörer (Microsoft Entra ID), verkställ korrekt tokenvalidering och acceptera aldrig tokens som inte uttryckligen är utfärdade för din MCP-server

- **Förebyggande av AI-attacker**: Använd Microsoft Prompt Shields och Azure Content Safety för att försvara mot indirekta promptinjektions- och verktygsförgiftningsattacker, samtidigt som du validerar verktygsmatadata och övervakar för dynamiska förändringar

- **Sessions- & transportssäkerhet**: Använd kryptografiskt säkra, icke-deterministiska sessions-ID:n kopplade till användaridentiteter, implementera korrekt hantering av sessions livscykel och använd aldrig sessioner för autentisering

- **OAuth-säkerhet bästa praxis**: Förhindra confused deputy-attacker genom uttryckligt användarsamtycke för dynamiskt registrerade klienter, korrekt implementation av OAuth 2.1 med PKCE och strikt validering av redirect URI

- **Token-säkerhetsprinciper**: Undvik anti-mönster för token-passthrough, validera token audience-claims, implementera kortlivade tokens med säker rotation och upprätthåll tydliga betrodda gränser

- **Omfattande leveranskedjesäkerhet**: Behandla alla AI-ekosystemets komponenter (modeller, inbäddningar, kontextleverantörer, externa API:er) med samma säkerhetstillämpning som traditionella mjukvaruberoenden

- **Kontinuerlig utveckling**: Håll dig uppdaterad med snabbt utvecklande MCP-specifikationer, bidra till säkerhetscommunityns standarder och bibehåll adaptiv säkerhetsprofil i takt med att protokollet mognar

- **Microsoft-säkerhetsintegration**: Utnyttja Microsofts omfattande säkerhetsekosystem (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) för förbättrat skydd vid MCP-implementeringar

## Omfattande resurser

### **Officiell MCP-säkerhetsdokumentation**
- [MCP-specifikation (Aktuell: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP säkerhets bästa praxis](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP auktoriseringsspecifikation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub-förråd](https://github.com/modelcontextprotocol)

### **OWASP MCP säkerhetsresurser**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) – Omfattande OWASP MCP topp 10 med implementeringsanvisningar för Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Officiella OWASP MCP säkerhetsrisker
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktisk säkerhetsträning för MCP på Azure

### **Säkerhetsstandarder & bästa praxis**
- [OAuth 2.0 säkerhetsbästa praxis (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 webbsäkerhet för applikationer](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 för stora språkmodeller](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **AI-säkerhetsforskning & analys**
- [Promptinjektion i MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Verktygsförgiftningsattacker (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP säkerhetsforskningssammanfattning (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft säkerhetslösningar**
- [Microsoft Prompt Shields dokumentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety-tjänst](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID säkerhet](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management bästa praxis](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Implementeringsguider & handledningar**
- [Azure API Management som MCP-auktoriseringsgateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentisering med MCP-servrar](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Säker tokenlagring och kryptering (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & leveranskedjesäkerhet**
- [Azure DevOps-säkerhet](https://azure.microsoft.com/products/devops)
- [Azure Repos-säkerhet](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft leveranskedjesäkerhetsresa](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ytterligare säkerhetsdokumentation**

För omfattande säkerhetsrådgivning, se dessa specialiserade dokument i detta avsnitt:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** – Kompletta säkerhetsbästa praxis för MCP-implementeringar
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** – Praktiska implementeringsexempel för Azure Content Safety-integration  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** – Senaste säkerhetskontroller och tekniker för MCP-distributioner
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** – Snabbreferensguide för väsentliga MCP-säkerhetspraxis
- **[BlueHat 2026: Säkerställa AI:s framtid: Säkerställa MCP med försvar i djupet-mönster](https://www.youtube.com/watch?v=cVWB58kEt-Y)** – Försvar-i-djupet-mönster från Microsoft Security Response Center (MSRC)

### **Praktisk säkerhetsträning**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** – Omfattande praktiskt workshop för att säkra MCP-servrar i Azure med progressiva nivåer från Base Camp till Summit
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** – Referensarkitektur och implementeringsvägledning för alla OWASP MCP Top 10-risker

---

## Vad händer härnäst

Nästa: [Kapitel 3: Komma igång](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->