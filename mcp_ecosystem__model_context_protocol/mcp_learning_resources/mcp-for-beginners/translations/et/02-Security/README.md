# MCP turvalisus: põhjalik kaitse AI-süsteemidele

[![MCP turvalisuse parimad tavad](../../../translated_images/et/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klõpsake ülalkirjel pildil, et vaadata selle õppetunni videot)_

Turvalisus on AI-süsteemide kujundamise alus, mistõttu oleme selle teise peatüki prioriteediks seadnud. See vastab Microsofti põhimõttele **Secure by Design**, mis on osa [Secure Future Initiative’st](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) pakub AI-põhistele rakendustele võimsaid uusi võimalusi, samal ajal tuues kaasa ainulaadseid turvalisuse väljakutseid, mis ületavad traditsiooniliste tarkvara riskide piire. MCP süsteemidel on nii tuntud turvaohtusid (turvaline kodeerimine, minimaalne privileeg, tarneahela turvalisus) kui ka uusi AI-spetsiifilisi ohte, sealhulgas promptide süstimist, tööriistade mürgistamist, sessiooni ülevõtmist, segadusse ajavate volituste rünnakuid, tokeni läbitekituse haavatavusi ja dünaamilise võimekuse muutmist.

See õppetund käsitleb olulisemaid turvariske MCP rakendustes—katmas autentimist, autoriseerimist, liigselt suuri õigusi, kaudset promptide süstimist, sessioonide turvalisust, segadusse ajavate volituste probleeme, tokeni haldamist ja tarneahela haavatavusi. Õpite praktilisi meetmeid ja parimaid tavasid nende riskide leevendamiseks, kasutades Microsofti lahendusi nagu Prompt Shields, Azure Content Safety ja GitHub Advanced Security, et tugevdada oma MCP juurutust.

## Õpieesmärgid

Selle õppetunni lõpuks oskate:

- **Tuvastada MCP-spetsiifilisi ohte**: Märgata MCP süsteemide ainulaadseid turvariske, sealhulgas promptide süstimist, tööriistade mürgistamist, liigseid õigusi, sessiooni ülevõtmist, segadusse ajavate volituste probleeme, tokeni läbitekituse haavatavusi ja tarneahela riske
- **Rakendada turvakontrolle**: Kasutada tõhusaid leevendusmeetmeid nagu tugevat autentimist, minimaalset privileegi, turvalist tokeni haldust, sessioonide turvakontrolle ja tarneahela kinnitust
- **Kasutada Microsofti turvalahendusi**: Mõista ja juurutada Microsoft Prompt Shields, Azure Content Safety ja GitHub Advanced Security, et kaitsta MCP töökoormusi
- **Valideerida tööriistade turvalisus**: Mõista tööriista metainfo valideerimise olulisust, dünaamiliste muutuste jälgimist ja kaitset kaudsete promptide süstimise rünnakute vastu
- **Integreerida parimaid tavasid**: Ühendada hästi tõestatud turvalisuse aluspõhimõtted (turvaline kodeerimine, serveri tugevdamine, zero trust) MCP-spetsiifiliste kontrollidega, et saavutada põhjalik kaitse

# MCP turvaarhitektuur ja -kontrollid

Moodsa MCP rakendused nõuavad kihilisi turvalahendusi, mis tegelevad nii traditsioonilise tarkvara turvalisuse kui ka AI-spetsiifiliste ohtudega. Kiiresti arenev MCP spetsifikatsioon täiustab pidevalt turvakontrolle, võimaldades paremat integreerumist ettevõtte turvaarhitektuuride ja hästi tõestatud tavadega.

[Microsoft Digital Defense Report’st](https://aka.ms/mddr) kaasnev uurimus näitab, et **98% teatatud rikkumistest oleks saanud ära hoida tugeva turvahügieeni abil**. Kõige tõhusam kaitseplaan ühendab alused turvategevused MCP-spetsiifiliste kontrollidega—tõestatud baasmeetmed jäävad kõige olulisemaks üldise turvariski vähendamisel.

## Praegune turvamaastik

> **Märkus:** See info kajastab MCP turvastandardeid seisuga **5. veebruar 2026**, mis vastavad **MCP spetsifikatsioonile 2025-11-25**. MCP protokoll areneb kiiresti ja tulevikus võidakse lisada uusi autentimisviise ning täiustatud kontrollimehhanisme. Alati tuleks tugineda praegusele [MCP spetsifikatsioonile](https://spec.modelcontextprotocol.io/), [MCP GitHubi hoidla](https://github.com/modelcontextprotocol) ja [turvalisuse parimate tavade dokumentatsioonile](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) uusima info saamiseks.

> **Vaatame tulevikku:** `2026-07-28` väljaandmiskandidaat tugevdab autoriseerimist veelgi — kliendid peavad valideerima `iss` parameetri autoriseerimiskorras (RFC 9207), deklareerima OpenID Connect `application_type` dünaamilise kliendiregistreerimise ajal ning siduma registreeritud mandaadid autoriseeriva serveriga. Vaata [Mis MCP-s muutub: 2026-07-28 väljaandmiskandidaat](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) täielikku autoriseerimise SEP-de nimekirja.

## 🏔️ MCP Security Summit töötoad (Sherpa)

Praktiliseks turvalisuse koolituseks soovitame **MCP Security Summit töötuba** (Sherpa)—põhjalik juhendatud matkapäev MCP serverite turvamiseks Microsoft Azure’is.

### Töötuba ülevaade

[MCP Security Summit töötuba](https://azure-samples.github.io/sherpa/) pakub praktilist, tegutsemispõhist turvakoolitust tõestatud „haavatav → ära kasuta → paranda → valideeri“ metoodikaga. Õpid:

- **Õppida purustades**: Kogeda haavatavusi, kasutades tahtlikult ebaturvalisi servereid
- **Kasutada Azure-i loomulikke turvavõimalusi**: Kasutades Azure Entra ID-d, Key Vaulti, API haldust ja AI Content Safetyt
- **Järgida mitmekesist kaitsebariere**: Edasi liikudes ehitada turvakihtide komplekti
- **Rakendada OWASP standardeid**: Iga tehnika vastab [OWASP MCP Azure turvajuhtmele](https://microsoft.github.io/mcp-azure-security-guide/)
- **Hankida tootmiskõlblik kood**: Saab kaasa töötavad ja testitud lahendused

### Matkarada

| Laager | Fookus | Kaetud OWASP riskid |
|--------|--------|---------------------|
| **Baaskamp** | MCP alused ja autentimisvead | MCP01, MCP07 |
| **Laager 1: Identiteet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Laager 2: Värav** | API haldus, privaat-sisendid, haldus | MCP02, MCP06, MCP07, MCP09 |
| **Laager 3: Sisse-/Väljundturvalisus** | Promptide süstimine, PII kaitse, sisu turvalisus | MCP03, MCP05, MCP06, MCP10 |
| **Laager 4: Jälgimine** | Logianalüüs, armatuurlauad, ohutuvastus | MCP04, MCP08 |
| **Tippsõit** | Punase ja sinise tiimi integratsioonitest | Kõik |

**Alustamiseks:** [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP TOP 10 turvariskid

[OWASP MCP Azure turvajuhtmes](https://microsoft.github.io/mcp-azure-security-guide/) on toodud kümme olulisemat turvariski MCP rakenduste jaoks:

| Risk | Kirjeldus | Azure leevendus |
|-------|------------|------------------|
| **MCP01** | Tokenite vale haldus ja saladuse lekked | Azure Key Vault, Managed Identity |
| **MCP02** | Privilääride eskaleerimine ulatuse paisumise tõttu | RBAC, tingimuslik juurdepääs |
| **MCP03** | Tööriistade mürgitamine | Tööriista valideerimine, terviklikkuse kontroll |
| **MCP04** | Tarkvara tarneahela rünnakud ja sõltuvuste manipuleerimine | GitHub Advanced Security, sõltuvuste skannimine |
| **MCP05** | Käskude süstimine ja täitmine | Sisendi valideerimine, liivakastimine |
| **MCP06** | Tahtluse voo alistamine | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Ebapiisav autentimine ja autoriseerimine | Azure Entra ID, OAuth 2.1 koos PKCE-ga |
| **MCP08** | Auditite ja telemeetria puudus | Azure Monitor, Application Insights |
| **MCP09** | Varjatud MCP serverid | API Center haldus, võrgu isoleerimine |
| **MCP10** | Konteksti süstimine ja ülekasutus | Andmete klassifitseerimine, minimaalne avalikustamine |

### MCP autentimise areng

MCP spetsifikatsioon on autentimise ja autoriseerimise lähenemist oluliselt arendanud:

- **Algne lähenemine**: Varased spetsifikatsioonid nõudsid arendajatelt kohandatud autentimisserverite loomist, kus MCP serverid toimisid OAuth 2.0 autoriseerimisserveritena, haldades kasutajate autentimist otse
- **Praegune standard (2025-11-25)**: Uuendatud spetsifikatsioon lubab MCP serveritel volitada autentimist välistel identiteedipakkujatel (nt Microsoft Entra ID), parandades turvastaatust ja vähendades rakendamisraskusi
- **Transporditasandi turvalisus**: Paranenud tugi turvalistele transpordimehhanismidele koos sobivate autentimismustritega nii lokaalses (STDIO) kui kaugsides (Streamable HTTP)

## Autentimise ja autoriseerimise turvalisus

### Praegused turvaküsimused

Moodsa MCP rakendused seisavad silmitsi mitmete autentimise ja autoriseerimise probleemidega:

### Riskid ja ohuvektorid

- **Valesti konfigureeritud autoriseerimisloogika**: MCP serverite vigased autoriseerimisrakendused võivad avaldada tundlikku infot ja rakendada juurdepääsu valesti
- **OAuth tokeni kompromiteerimine**: Kohaliku MCP serveri tokenivargus võimaldab ründajatel servereid esindada ja kasutada alluvate teenuste juurdepääsu
- **Tokeni läbitekituse haavatavused**: Sobimatu tokeni käsitsemine võtab turvakontrolle vahele ja tekitab vastutuse jälgimise lüngad
- **Liigselt suured õigused**: Liialt privileegitud MCP serverid rikuvad minimaalsete õiguste põhimõtteid ja suurendavad rünnakupinda

#### Tokeni läbitekitus: kriitiline anti-muster

**Tokeni läbitekitus on praeguse MCP autoriseerimisspetsifikatsiooni järgi rangelt keelatud** tõsiste turvariskide tõttu:

##### Turvakontrollide vältimine
- MCP serverid ja neile alluvad API-d rakendavad kriitilisi turvakontrolle (piirangute kehtestamine, päringute valideerimine, liikluse jälgimine), mis sõltuvad korrektsest tokeni valideerimisest
- Kliendi otsene tokeni kasutus API-sse ümberlülitab need kaitsed, nõrgestades turvaarhitektuuri

##### Vastutuse ja auditi raskused
- MCP serverid ei suuda eristada kliente, kes kasutavad ülesvoo tokenit, purustades audititejäljed
- Alluvate ressursside serverite logid näitavad eksitavaid päringu päritolu, mitte tegelikke MCP serveri vahendajaid
- Intsidendi uurimine ja nõuetele vastavuse audit muutuvad oluliselt keerukamaks

##### Andmete viletsusest tingitud riskid
- Valideerimata tokeni deklaratsioonid lubavad varastatud tokenitega pahalastel kasutada MCP servereid andmete väljavoolu vahendina
- Usalduspiiri rikkumised võimaldavad volitamata juurdepääsu mustreid, mis mööduvad turvakontrollidest

##### Mitme teenuse rünnakuvektorid
- Kompromiteeritud tokenid, mida aktsepteerivad mitmed teenused, võimaldavad külgsuunalist liikumist ühendatud süsteemides
- Teenuste vaheline usaldus võib saada löögi, kui tokenite päritolu ei ole kontrollitav

### Turvakontrollid ja riskide leevendus

**Kriitilised turvanõuded:**

> **KOHUSTUSLIK:** MCP serverid **EI TOHI** vastu võtta ühtegi tokenit, mis ei ole otseselt välja antud MCP serverile.

#### Autentimise ja autoriseerimise kontrollid

- **Range autoriseerimise läbivaatamine**: Teha põhjalikud auditi kontrollid MCP serverite autoriseerimisloogikas, et ainult ettenähtud kasutajad ja kliendid pääseksid tundlikele ressurssidele ligi
  - **Rakendamisjuhend**: [Azure API Management kui MCP serverite autentimisvärav](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteedi integratsioon**: [Microsoft Entra ID kasutamine MCP serverite autentimiseks](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvaline tokeni haldus**: Kasutada [Microsofti tokeni valideerimise ja elutsükli parimaid tavasid](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Kontrollida, et tokeni sihtrühm (audience) vastab MCP serveri identiteedile
  - Rakendada korrektne tokeni pöörlemise ja aegumise poliitika
  - Ennetada tokeni korduskasutusrünnakuid ja volitamata kasutamist

- **Kaitstud tokeni salvestamine**: Hoida tokenid turvaliselt, kasutades krüpteerimist nii puhke- kui ka andmeside ajal
  - **Parimad tavad**: [Turvaline tokeni salvestamine ja krüpteerimise juhised](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Juurdepääsu kontrollide rakendamine

- **Minimaalsete õiguste põhimõte**: Anda MCP serveritele vaid põhivajaduseks vajalikud õigused
  - Regulaarne õiguste ülevaatus ja uuendamine, et vältida privileegide paisumist
  - **Microsofti dokumentatsioon**: [Turvaline minimaalsete õigustega juurdepääs](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollipõhine juurdepääsukontroll (RBAC)**: Kehtestada peenhäälestatud rollimääramised
  - Kitsendada rolle spetsiifilistele ressurssidele ja tegevustele
  - Vältida laiaulatuslikke või tarbetuid õigusi, mis suurendavad rünnakupinda

- **Jätkuv õiguste monitooring**: Juhtida pidevat ligipääsu auditit ja jälgimist
  - Jälgida õiguste kasutusmustreid ebatavade avastamiseks
  - Parandada kiiresti liigseid või kasutamata privileege

## AI-spetsiifilised turvaohtud

### Promptide süstimine ja tööriistade manipuleerimise rünnakud

Moodsa MCP rakendused seisavad silmitsi keerukate AI-spetsiifiliste rünnakutega, mida traditsioonilised turvameetmed ei suuda täiel määral käsitleda:

#### **Kaudne promptide süstimine (rist-domeeni promptide süstimine)**

**Kaudne promptide süstimine** on üks kriitilisemaid haavatavusi MCP-tehnoloogiat kasutavates AI-süsteemides. Ründajad peidavad pahatahtlikke juhiseid välises sisus—dokumentides, veebilehtedel, e-kirjades või andmeallikates—mida AI süsteem sünteesib või töötleb nagu legitiimseid käske.

**Rünnakustsenaariumid:**
- **Dokumentidepõhine süstimine**: Pahatahtlikud juhised peidetud töödeldavates dokumentides, mis vallandavad AI tahtmatud toimingud
- **Veebisisu kasutamine**: Kompromiteeritud veebilehed, millesse on sisestatud promptid, mis manipuleerivad AI käitumist, kui neid prinditakse vms
- **E-posti rünnakud**: Pahatahtlikud promptid e-kirjades, mis põhjustavad AI abimeestel infot lekkida või täita volitamata toiminguid
- **Andmeallikate saastumine**: Kompromiteeritud andmebaasid või API-d, mis pakuvad saastunud sisu AI süsteemidele

**Reaalne mõju:** Need rünnakud võivad põhjustada andmete lekkimist, privaatsusprobleeme, kahjuliku sisu loomist ja kasutajate käitumise manipuleerimist. Üksikasjaliku analüüsi leiab [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Promptide süstmise rünnaku skeem](../../../translated_images/et/prompt-injection.ed9fbfde297ca877.webp)

#### **Tööriistade mürgitamise rünnakud**

**Tööriistade mürgitamine** sihib MCP tööriistade metaandmeid, ära kasutades seda, kuidas LLM-id tõlgendavad tööriista kirjeldusi ja parameetreid täitmisotsuste tegemiseks.

**Rünnaku mehhanismid:**
- **Metaandmete manipuleerimine**: Ründajad süstivad pahatahtlikke juhiseid tööriista kirjelduse, parameetrite definitsioonide või kasutusnäidete hulka
- **Nähtamatud juhised**: Metaandmetes peidetud promptid, mida AI mudelid töötlevad, kuid mis on inimestele nähtamatud
- **Dünaamiline tööriistade muutmine („Rug Pulls”)**: Kasutajate poolt heaks kiidetud tööriistad muudetakse hiljem pahatahtlikeks ilma kasutajate teadmiseta
- **Parameetrite süstimine**: Tööriista parameetriskeemidesse peidetud pahatahtlik sisu, mis mõjutab mudeli käitumist
**Hostitud serveri riskid**: kaugsuhted MCP serverid esitavad suurenenud riske, kuna tööriistade määratlusi saab pärast kasutaja esialgset kinnitust uuendada, mis loob olukordi, kus varem ohutud tööriistad muutuvad pahatahtlikuks. Üldiseks analüüsiks vaata [Tööriista mürgitamise rünnakuid (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/et/tool-injection.3b0b4a6b24de6bef.webp)

#### **Täiendavad tehisintellekti rünnaku vektorid**

- **Ristdomeeni käsu süstimine (XPIA)**: keerukad rünnakud, mis kasutavad mitme domeeni sisu turbekontrollide möödahiilimiseks
- **Dünaamiline võimekuse muutmine**: tööriista võimete reaalajas muutmine, mis jääb esialgse turbeanalüüsi alt välja
- **Kontekstuaalkasti mürgitamine**: rünnakud, mis manipuleerivad suurte kontekstiakenidega, et varjata pahatahtlikke juhiseid
- **Mudeli segadusseajamise rünnakud**: mudeli piirangute ärakasutamine ettearvamatuteks või ohtlikeks käitumisteks


### Tehisintellekti turberiskide mõju

**Kõrge mõju tagajärjed:**
- **Andmete väljapetmine**: volitamata juurdepääs ja tundlike ettevõtte- või isikuandmete vargus
- **Privaatsusleked**: isikut iseloomustava teabe (PII) ja konfidentsiaalse ärilise teabe avalikustamine  
- **Süsteemi manipuleerimine**: kriitiliste süsteemide ja töövoogude tahtmatud muutmised
- **Tuvastusandmete vargus**: autentimistokenite ja teenustunnuste kompromiteerimine
- **Lateraalse liikumise rünnakud**: kompromiteeritud tehisintellekti süsteemide kasutamine laiemate võrgurünnakute alustena

### Microsofti tehisintellekti turbelahendused

#### **AI käsu kilbid: täiustatud kaitse süstimisrünnakute vastu**

Microsofti **AI käsu kilbid** pakuvad kõikehõlmavat kaitset nii otseste kui ka kaudsete käsu süstimisrünnakute vastu mitme turbekihi kaudu:

##### **Põhikaitse mehhanismid:**

1. **Täiustatud avastamine ja filtreerimine**
   - Masinõppe algoritmid ja NLP meetodid tuvastavad pahatahtlikud juhised välises sisus
   - Reaalaegne dokumentide, veebilehtede, e-kirjade ja andmeallikate analüüs sisseehitatud ohtude tuvastamiseks
   - Kontekstipõhine arusaamine legaalsetest vs pahatahtlikest käsutitüüpidest

2. **Valgustustehnikad**  
   - Eraldab usaldusväärsed süsteemi juhised potentsiaalselt kompromiteeritud välissisestusest
   - Teksti transformeerimise meetodid, mis parandavad mudeli relevantsust ja isoleerivad pahatahtliku sisu
   - Aitab AI süsteemidel säilitada õiget käsu hierarhiat ja ignoreerida süstitud käsklusi

3. **Piiritleja ja andmemärgistussüsteemid**
   - Selge piiritlus usaldusväärsete süsteemisõnumite ja välise sisendi vahel
   - Erilised märgised rõhutavad piire usaldusväärsete ja ebausaldusväärsete andmeallikate vahel
   - Selge eraldus takistab juhiste segadust ja volitamata käskude täitmist

4. **Pidev ohuteave**
   - Microsoft jälgib pidevalt esile kerkivaid rünnakumustreid ja uuendab kaitseid
   - Proaktiivne ohuküttimine uute süstimistehnikate ja rünnakuvõimaluste leidmiseks
   - Regulaarne turbemudelite värskendus tõhususe säilitamiseks muutuva ohu vastu

5. **Azure sisu turvalisuse integratsioon**
   - Osana kogu Azure AI sisu turvalisuse paketist
   - Täiendav avastamine jailbreak-i katsed, kahjulik sisu ja turbepoliitika rikkumiste osas
   - Ühtsed turbekontrollid AI rakenduse komponentide vahel

**Rakendamise ressursid**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/et/prompt-shield.ff5b95be76e9c78c.webp)


## Täiustatud MCP turbeohud

### Seansi ülevõtmise haavatavused

**Seansi ülevõtmine** on kriitiline rünnakuvõimalus staatiliste MCP rakenduste puhul, kus volitamata osapooled saavad kätte ja kuritarvitavad legitiimseid seansi identifikaatoreid, et poseerida klientide eest ja sooritada volitamata toiminguid.

#### **Rünnakustsenaariumid ja riskid**

- **Seansiülekanne käsu süstimisega**: ründajad, kellel on varastatud seansi ID-d, süstivad pahatahtlikke sündmusi serveritesse, mis jagavad seansi olekut, võimaldades selle kaudu ohtlikke toiminguid või juurdepääsu tundlikele andmetele
- **Otsepettus**: varastatud seansi ID-de abil tehakse otseteed MCP serveri kõnedele, mis mööduvad autentimisest ja käituvad ründajatena seadusliku kasutajana
- **Kompromiteeritud jätkusuutlikud vood**: ründajad võivad taotlusi varakult lõpetada, sundides seaduslikke kliente jätkama potentsiaalselt pahatahtliku sisuga

#### **Seansihalduse turbekontrollid**

**Kriitilised nõuded:**
- **Volituse tõendamine**: MCP serverid, mis rakendavad autoriseerimist, PEAVAD kontrollima KÕIKI sisenevaid taotlusi ja EI TOHI usaldada seansse autentimiseks
- **Turvaline seansi genereerimine**: kasutage krüptograafiliselt turvalisi, mittedeterministlikke seansi ID-sid, mis on loodud turvaliste juhuarvugeneraatoritega
- **Kasutajapõhine sidumine**: siduge seansi ID-d kasutajapõhise info alusel, kasutades vormingut nagu `<user_id>:<session_id>`, et vältida seansside väärkasutust kasutajate vahel
- **Seansi elutsükli haldus**: rakendage nõuetekohane aegumine, rotatsioon ja tühistamine, et piirata haavatavusakna pikkust
- **Ülekandeturve**: kõik suhtlus peab toimuma HTTPS kaudu seansi ID-de varguse vältimiseks

### Segadusse aetud esindaja probleem

**Segadusse aetud esindaja probleem** tekib, kui MCP serverid toimivad autentimisproksidena klientide ja kolmandate osapoolte teenuste vahel, luues võimalusi volituse möödahiilimiseks staatilise kliendi ID kuritarvitamise läbi.

#### **Rünnaku mehhanismid ja riskid**

- **Küpsistepõhine nõusoleku möödahiilimine**: varasem kasutaja autentimine loob nõusolekuküpsiseid, mida ründajad kasutavad pahatahtlikel autoriseerimistaotlustel koos manipuleeritud ümbersuunamise URI-dega
- **Autoriseerimiskoodi vargus**: olemasolevad nõusolekuküpsised võivad panna autoriseerimisserverid nõusolekuaknalt mööda minema ja suunama koodid ründaja kontrollitud lõpp-punktidesse  
- **Volitamata API juurdepääs**: varastatud autoriseerimiskoodid võimaldavad tokeni vahetust ja kasutaja poseerimist ilma otsese heakskiiduta

#### **Leevendusstrateegiad**

**Kohustuslikud kontrollid:**
- **Selged nõusoleku nõuded**: MCP proksiserverid, mis kasutavad staatilisi kliendi ID-sid, PEAVAD igale dünaamiliselt registreeritud kliendile hankima kasutajanõusoleku
- **OAuth 2.1 turbe rakendus**: järgida praeguseid OAuth turbeparimaid praktikaid, sealhulgas PKCE-d (koodi vahetuse tõestus) kõigi autoriseerimistaotluste puhul
- **Range kliendi valideerimine**: rakendada ranget ümbersuunamise URI-de ja kliendi identifikaatorite valideerimist ärakasutamist vältimaks

### Tokeni edasiandmise haavatavused  

**Tokeni edasiandmine** on otsene halb praktika, kus MCP serverid võtavad vastu kliendi tokeneid ilma nõuetekohase valideerimiseta ja edastavad need alluvale API-le, rikkudes MCP autoriseerimise spetsifikatsioone.

#### **Turbemõjud**

- **Kontrolli möödahiilimine**: otsene kliendilt API-le tokeni kasutamine möödab kriitilisi kiirusepiiranguid, valideerimist ja järelevalvet
- **Auditijälje korruptsioon**: ülaltpoolt väljastatud tokenid muudavad kliendi tuvastamise võimatuks, murendades intsidentide uurimise võimekust
- **Proksipõhine andmete väljapetmine**: valideerimata tokenid võimaldavad pahatahtlikel osapooltel kasutada servereid volitamata andmetele ligipääsemiseks
- **Usalduspiiri rikkumised**: alluvate teenuste usaldusarvestused võivad rikkuda, kui tokeni päritolu ei saa kontrollida
- **Mitmepõhine rünnakute levik**: kompromiteeritud tokenid, mida aktsepteeritakse mitmetes teenustes, võimaldavad lateraalseid liikumisi

#### **Nõutavad turbekontrollid**

**Läbirääkimatu nõue:**
- **Tokeni valideerimine**: MCP serverid EI TOHI aktsepteerida tokenit, mida pole otseselt MCP serverile väljastatud
- **Audiitori kontroll**: alati valideerida, et tokeni auditooriumi väited vastavad MCP serveri identiteedile
- **Nõuetekohane tokeni elutsükkel**: kasutada lühiajalisi ligipääsu tokeneid koos turvaliste vahetamiste praktikatega


## AI süsteemide tarneahela turvalisus

Tarneahela turvalisus on arenenud kaugemale traditsioonilistest tarkvarasõltuvustest, hõlmates kogu AI ökosüsteemi. Kaasaegsed MCP rakendused peavad rangelt valideerima ja jälgima kõiki tehisintellektiga seotud komponente, sest igaüks neist võib tuua kaasa süsteemi terviklikkuse ohustamise riske.

### Laiendatud AI tarneahela komponendid

**Traditsioonilised tarkvarasõltuvused:**
- Avatud lähtekoodiga teegid ja raamistike
- Konteineri pildid ja baasüsteemid  
- Arendusvahendid ja koostetöövood
- Taristu komponendid ja teenused

**AI-spetsiifilised tarneahela elemendid:**
- **Alusmudelid**: eelõpetatud mudelid erinevatelt pakkujatelt, mis vajavad päritolu kontrolli
- **Sisseembedimise teenused**: välised vektorialiseerimise ja semantilise otsingu teenused
- **Konteksti pakkujad**: andmeallikad, teadmistebaasid ja dokumendikogud  
- **Kolmandate osapoolte API-d**: välised AI teenused, ML-piped ja andmetöötluse lõpp-punktid
- **Mudeli artefaktid**: kaalu-, konfiguratsiooni- ja täpsustatud mudelivariandid
- **Treeningandmete allikad**: andmekogud, mida kasutatakse mudelite treeninguks ja täpsustamiseks

### Kõikehõlmav tarneahela turbestrateegia

#### **Komponentide valideerimine ja usaldus**
- **Päritolu kontroll**: kontrollida kõigi AI komponentide päritolu, litsentseeringut ja terviklikkust enne integreerimist
- **Turbehindamine**: teostada haavatavuste skaneerimisi ja turbekontrolli mudelitele, andmeallikatele ja AI teenustele
- **Reputatsioonianalüüs**: hinnata AI teenuse pakkujate turbesuhtumist ja -praktikaid
- **Vastavuse kontroll**: veenduda, et kõik komponendid vastavad organisatsiooni turbe- ja regulatiivsetele nõuetele

#### **Turvalised juurutustöövood**  
- **Automatiseeritud CI/CD turbeintegreerimine**: integreerida turbeskaneerimine kogu automatiseeritud juurutusvoo jooksul
- **Artefakti terviklikkus**: kasutada krüptograafilist valideerimist kõigi juurutatud artefaktide (kood, mudelid, konfiguratsioonid) jaoks
- **Stageeritud juurutus**: kasutada progressiivseid juurutusstrateegiaid koos turbekontrolli sammudega igas etapis
- **Usaldusväärsed artefaktide hoidlad**: juurutada ainult valideeritud ja turvalistest hoidlatest

#### **Pidev jälgimine ja reageerimine**
- **Sõltuvuste skaneerimine**: pidev haavatavuste jälgimine kõigi tarkvara- ja AI-komponentide sõltuvuste jaoks
- **Mudeli jälgimine**: mudeli käitumise, jõudluse muutumise ja turbeanomaaliate pidev hindamine
- **Teenuse tervise jälgimine**: väliste AI teenuste kättesaadavuse, turbeintsidentide ja poliitikamuudatuste jälgimine
- **Ohuteabe integratsioon**: AI ja ML turberiskidele spetsialiseerunud ohuallikate integreerimine

#### **Juurdepääsukontroll ja minimaalne privileeg**
- **Komponenditasandi õigused**: piirata juurdepääsu mudelitele, andmetele ja teenustele äritegevuse vajaduse alusel
- **Teenuse konto haldus**: kasutada spetsiaalseid teenuse kontosid miinimumõigustega
- **Võrgusegmentatsioon**: isoleerida AI komponendid ja piirata teenuste vahelist võrguliiklust
- **API värava kontrollid**: kasutada tsentraliseeritud API väravaid, et kontrollida ja jälgida juurdepääsu välistele AI teenustele

#### **Intsidentide reageerimine ja taastumine**
- **Kiire reageerimisprotseduurid**: kehtestatud protsessid kompromiteeritud AI komponentide parandamiseks või asendamiseks
- **Tunnuste rotatsioon**: automaatsed süsteemid saladuste, API võtmete ja teenustunnuste rotatsiooniks
- **Tagasikerimise võimalused**: võime kiiresti taastada varasem teadaolevalt head AI komponendid
- **Tarneahela rikkumiste taastumine**: spetsiifilised protseduurid, et reageerida ülajooksu AI teenuste kompromiteerimisele

### Microsofti turbetööriistad ja integratsioon

**GitHub Advanced Security** pakub kõikehõlmavat tarneahela kaitset, sealhulgas:
- **Saladuste skaneerimine**: automaatne autentimisandmete, API võtmete ja tokenite tuvastamine hoidlates
- **Sõltuvuste skaneerimine**: haavatavuste hindamine avatud lähtekoodi sõltuvustele ja teekidele
- **CodeQL analüüs**: staatiline koodi analüüs turbeprobleemide ja koodivigade leidmiseks
- **Tarneahela aruandlus**: ülevaade sõltuvuste tervisest ja turvastaatest

**Azure DevOps ja Azure Repos integratsioon:**
- Sujuv turbeskaneerimise integreerimine Microsofti arendusplatvormidel
- Automatiseeritud turbekontrollid Azure Pipelines'is AI töökoormustele
- Poliitikate kehtestus turvaliste AI komponentide juurutamiseks

**Microsofti sisepraktikad:**
Microsoft rakendab ulatuslikke tarneahela turbepraktikaid kõigis toodetes. Loe tõestatud lähenemisviisidest [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Aluspõhja turbe parimad praktikad

MCP rakendused pärivad ja arendavad teie organisatsiooni olemasolevat turbepüüdlust. Põhiturbepraktikate tugevdamine suurendab märkimisväärselt AI süsteemide ja MCP kasutuse üldist turvalisust.

### Põhiturbe alused

#### **Turvalise arenduse praktikad**
- **OWASP nõuetele vastavus**: kaitse [OWASP Top 10](https://owasp.org/www-project-top-ten/) veebirakenduste haavatavuste vastu
- **AI-spetsiifilised kaitsed**: rakendada [OWASP Top 10 suurte keelemudelitele (LLM)](https://genai.owasp.org/download/43299/?tmstv=1731900559) kontrollid
- **Turvaline saladuste haldus**: kasutada pühendatud raamatukambreid tokenitele, API võtmetele ja tundlikele konfiguratsiooniandmetele
- **Lõpust lõpuni krüptimine**: turvalise suhtluse rakendamine kõigis rakenduse komponentides ja andmevoogudes
- **Sisendi valideerimine**: rangelt kontrollida kõiki kasutajasisendeid, API parameetreid ja andmeallikaid

#### **Taristu tugevdus**
- **Mitmefaktoriline autentimine**: kohustuslik MFA kõigil administraatori ja teenuse kontodel
- **Paranduste haldus**: automatiseeritud ja õigeaegsed parandused operatsioonisüsteemidele, raamistikutele ja sõltuvustele  
- **Identiteedipakkuja integratsioon**: tsentraliseeritud identiteedihaldus ettevõtte identiteedipakkujate (Microsoft Entra ID, Active Directory) kaudu
- **Võrgusegmentatsioon**: MCP komponentide loogiline isoleerimine lateraalse liikumise potentsiaali piiramiseks
- **Vähima privileegi põhimõte**: kõigi süsteemikomponentide ja kontode minimaalsete vajalike õiguste tagamine

#### **Turbejälgimine ja tuvastamine**
- **Kontekstidetailne logimine**: põhjalik AI rakenduste tegevuste logimine, sealhulgas MCP kliendi-serveri suhtlus
- **SIEM integratsioon**: tsentraliseeritud turbeinfo- ja sündmuste juhtimissüsteem anomaaliate tuvastamiseks
- **Käitumisanalüütika**: AI-põhine jälgimine, et avastada süsteemi ja kasutajate ebatavalist käitumist
- **Ohuteave**: välistest allikatest ohusignaalide ja kompromiteerimise indikaatorite (IOC) integreerimine
- **Intsidentidele reageerimine**: selgelt määratletud protseduurid turbeintsidentide tuvastamiseks, reageerimiseks ja taastumiseks

#### **Null-usalduse arhitektuur**
- **Ära usu kunagi, alati kontrolli**: pidev kasutajate, seadmete ja võrguliideste valideerimine
- **Mikro-segmentatsioon**: peenhäälestatud võrgu kontrollid, mis isoleerivad üksikuid töölõike ja teenuseid
- **Identiteedikeskne turvalisus**: turvapoliitikad põhinevad valideeritud identiteetidel, mitte võrgulokatsioonil
- **Pidev riskihindamine**: dünaamiline turbeoleku hindamine praeguse konteksti ja käitumise põhjal
- **Tingimuslik juurdepääs**: juurdepääsu kontroll, mis kohandub riskitegurite, asukoha ja seadme usaldusväärsuse alusel

### Ettevõtte integratsiooni mustrid

#### **Microsofti turbeökosüsteemi integratsioon**
- **Microsoft Defender for Cloud**: kõikehõlmav pilve turbeolukorra haldus
- **Azure Sentinel**: pilvepõhine SIEM ja SOAR võimalused AI töökoormuste kaitseks
- **Microsoft Entra ID**: ettevõtte identiteedi- ja juurdepääsuhaldus tingimusliku juurdepääsuga poliitikatega
- **Azure Key Vault**: tsentraliseeritud saladuste haldus riistvaraga turvatud mooduli (HSM) toega
- **Microsoft Purview**: andmetöötluse ja vastavuse haldus AI andmeallikate ja töövoogude jaoks

#### **Vastavus ja valitsemine**
- **Regulatiivne vastavus**: veenduda, et MCP rakendused vastavad tööstusharu spetsiifilistele regulatiivsetele nõuetele (GDPR, HIPAA, SOC 2)
- **Andmete klassifitseerimine**: Tundlike andmete õige kategooria määramine ja töötlemine AI süsteemide poolt
- **Auditi jäljed**: Põhjalik logimine regulatiivseks vastavuseks ja kohtuekspertiisi uurimiseks
- **Privaatsuse kontrollid**: Privaatsuse sisseehitamise põhimõtete rakendamine AI süsteemi arhitektuuris
- **Muudatuste haldus**: Turvalisuse ülevaatuste ametlikud protsessid AI süsteemi muudatuste korral

Need alustavad praktikad loovad tugeva turvabasisildi, mis suurendab MCP-spetsiifiliste turvakontrollide tõhusust ja tagab põhjaliku kaitse AI-põhistele rakendustele.

## Peamised turvalisuse võtmekohad

- **Kihiline turvalähenemine**: Ühenda alustavad turvapraktikad (turvaline kodeerimine, minimaalne õiguste tase, tarneahela kontroll, pidev järelevalve) AI spetsiifiliste kontrollidega põhjaliku kaitse tagamiseks

- **AI-spetsiifiline ohumaastik**: MCP süsteemid seisavad silmitsi unikaalsete riskidega, sealhulgas prompt-injektsioon, tööriistamürgitus, sessiooni kaaperdamine, segaduses abi lahendused, tokeni läbipääsu haavatavused ja liigne õiguste ulatus, mis vajavad spetsiaalseid leevendusmeetmeid

- **Autentimine ja autoriseerimine tipptasemel**: Rakenda tugevat autentimist väliste identiteedipakkujate kaudu (Microsoft Entra ID), kehtesta nõuetekohane tokeni valideerimine ja ära kunagi aktsepteeri tokeneid, mis ei ole otseselt välja antud sinu MCP serverile

- **AI rünnakute ennetamine**: Kasuta Microsoft Prompt Shields ja Azure Content Safety lahendusi kaudse prompt-injektsiooni ja tööriistamürgituse rünnakute vastu kaitseks, valideeri tööriista metaandmeid ja jälgi dünaamilisi muudatusi

- **Sessiooni ja transpordi turvalisus**: Kasuta krüptograafiliselt turvalisi, mitte-deterministlikke sessiooni IDsid, mis on seotud kasutaja identiteediga, teosta nõuetekohast sessiooni elutsükli haldust ja ära kunagi kasuta sessioone autentimiseks

- **OAuth turvalisuse parimad praktikad**: Väldi segadusse ajamise rünnakuid läbi kasutaja selge nõusoleku dünaamiliselt registreeritud klientide jaoks, rakenda nõuetekohane OAuth 2.1 koos PKCEga ja ranget redirect URI valideerimist  

- **Tokenite turvapõhimõtted**: Väldi tokeni läbipääsu vastupidiseid mustreid, valideeri tokeni vaatajaskonna nõudeid, rakenda lühiajalisi tokeneid turvalise rotatsiooniga ja hoia selgeid usalduspiire

- **Põhjalik tarneahela turvalisus**: Kohtle kõiki AI ökosüsteemi komponente (mudelid, embeddings, kontekstipakkujad, välised APId) sama rangelt turvalisuse seisukohast nagu tavapäraseid tarkvarasõltuvusi

- **Jätkuv areng**: Hoia end kursis kiiresti arenevate MCP spetsifikatsioonidega, panusta turvakogukonna standarditesse ja säilita kohanduv turvahoiak, kui protokoll küpseb

- **Microsofti turvakomponentide integreerimine**: Kasuta Microsofti terviklikku turvaökosüsteemi (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) parema MCP rakenduste kaitse tagamiseks

## Põhjalikud ressursid

### **Ametlik MCP turbedokumentatsioon**
- [MCP spetsifikatsioon (Kehtiv: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turva parimad praktikad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub hoidla](https://github.com/modelcontextprotocol)

### **OWASP MCP turbaressursid**
- [OWASP MCP Azure turva juhend](https://microsoft.github.io/mcp-azure-security-guide/) - Põhjalik OWASP MCP Top 10 koos Azure rakendamisjuhistega
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Ametlikud OWASP MCP turvariskid
- [MCP turvasummiti töötuba (Sherpa)](https://azure-samples.github.io/sherpa/) - Käed-külge turbakoolitus MCP jaoks Azure'is

### **Turvastandardid ja parimad praktikad**
- [OAuth 2.0 turva parimad praktikad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 veebirakenduste turvalisus](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurtele keelemudelitele](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft digitaalkaitse aruanne](https://aka.ms/mddr)

### **AI turvauuringud ja analüüs**
- [Prompt-injektsioon MCPs (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tööriistamürgituse rünnakud (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP turvauuringute kokkuvõte (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsofti turvalahendused**
- [Microsoft Prompt Shields dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety teenus](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID turvalisus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure tokenite halduse parimad praktikad](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Rakendusjuhendid ja õppetunnid**
- [Azure API haldus kui MCP autentimise värav](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentimine MCP serveritega](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Turvaline tokenite salvestamine ja krüpteerimine (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & tarneahela turvalisus**
- [Azure DevOps turvalisus](https://azure.microsoft.com/products/devops)
- [Azure Repos turvalisus](https://azure.microsoft.com/products/devops/repos/)
- [Microsofti tarneahela turvalisuse teekond](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Täiendav turbedokumentatsioon**

Põhjaliku turvalisuse juhiste saamiseks vaata neid spetsialiseerunud dokumente selles jaotises:

- **[MCP turva parimad praktikad 2025](./mcp-security-best-practices-2025.md)** - MCP rakenduste täielik turva parimate tavade kogumik
- **[Azure Content Safety rakendamine](./azure-content-safety-implementation.md)** - Praktilised näited Azure Content Safety integreerimiseks  
- **[MCP turvakontrollid 2025](./mcp-security-controls-2025.md)** - Uusimad turvakontrollid ja tehnikad MCP juurutamiseks
- **[MCP parimate tavade kiire ülevaade](./mcp-best-practices.md)** - Kiire juhend MFA oluliste turvapraktikate jaoks
- **[BlueHat 2026: AI tuleviku kindlustamine: MCP kaitsmine süvamustritega](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Kaitse sügavuses mustrid Microsofti turvareaktsioonikeskuselt (MSRC)

### **Käed-külge turbakoolitus**

- **[MCP turvasummiti töötuba (Sherpa)](https://azure-samples.github.io/sherpa/)** - Põhjalik praktiline töötuba MCP serverite turvamiseks Azure'is, alates algtasemest kuni kõrgema taseme laagriteni
- **[OWASP MCP Azure turva juhend](https://microsoft.github.io/mcp-azure-security-guide/)** - Viitearhitektuur ja rakendusjuhised kõigi OWASP MCP Top 10 riskide jaoks

---

## Mis järgmiseks

Järgmine: [3. peatükk: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->