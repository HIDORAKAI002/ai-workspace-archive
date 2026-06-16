# MCP turvalisus: ulatuslik kaitse AI-süsteemidele

[![MCP Security Best Practices](../../../translated_images/et/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Klõpsake ülaloleval pildil, et vaadata selle õppetunni videot)_

Turvalisus on AI-süsteemide disaini aluseks, mistõttu seome sellele suurt tähtsust juba meie teises jaotises. See haakub Microsofti põhimõttega **Secure by Design** [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) raames.

Model Context Protocol (MCP) lisab AI-põhistele rakendustele võimsaid uusi võimalusi, tuues samas kaasa ainulaadsed turvalisuse väljakutsed, mis ületavad traditsioonilised tarkvarariskid. MCP süsteemid seisavad silmitsi nii tuntud turbeprobleemidega (turvaline kodeerimine, minimaalsete õiguste põhimõte, tarneahela turvalisus) kui ka uute AI-spetsiifiliste ohtudega nagu promptide süstimine, tööriistade mürgitamine, seansikaaperdamine, eksitud ametniku rünnakud, tokenite edasiandmise nõrkused ja dünaamiline võimekuse muutmine.

Selles õppetunnis uurime kõige kriitilisemaid turvariske MCP rakendustes — kaasates autentimist, autoriseerimist, liigselt ulatuvaid õigusi, kaudset promptide süstimist, seansi turvalisust, eksitud ametniku probleeme, tokenite haldust ja tarneahela nõrkusi. Õpite praktilisi kontrollimeetmeid ja parimaid praktikaid nende riskide leevendamiseks ning Microsofti lahenduste nagu Prompt Shields, Azure Content Safety ja GitHub Advanced Security kasutamiseks MCP juurutuse tugevdamiseks.

## Õpieesmärgid

Selle õppetunni lõpuks oskate:

- **Tuvastada MCP-spetsiifilisi ohte**: Tuvastada MCP süsteemide unikaalseid turvariske, sealhulgas promptide süstimist, tööriistade mürgitamist, liigseid õigusi, seansikaaperdamist, eksitud ametniku probleeme, tokenite edasiandmise nõrkusi ja tarneahela riske
- **Rakendada turvakontrolle**: Juurutada tõhusaid leevendusmeetmeid, kaasa arvatud tugevat autentimist, minimaalsete õiguste ligipääsu, turvalist tokenite haldust, seansi turvakontrolle ja tarneahela kontrolli
- **Kasutada Microsofti turvalahendusi**: Mõista ja juurutada Microsoft Prompt Shields, Azure Content Safety ja GitHub Advanced Security MCP töökoormuste kaitseks
- **Valideerida tööriistade turvalisust**: Tuvastada tööriistade metaandmete valideerimise tähtsus, dünaamiliste muutuste jälgimine ja kaitse kaudsete promptide süstimise rünnakute vastu
- **Integreerida parimaid praktikaid**: Ühendada väljakujunenud turvalisuse aluspõhimõtted (turvaline kodeerimine, serverite tugevdamine, nullusaldus) MCP-spetsiifiliste kontrollidega terviklikuks kaitseks

# MCP turvaarhitektuur ja -kontrollid

Moodne MCP rakendused vajavad kihilisi turbelahendusi, mis käsitlevad nii traditsioonilist tarkvara turvalisust kui AI-spetsiifilisi ohte. Kiiresti arenev MCP spetsifikatsioon täiustab oma turvakontrolle, võimaldades paremat integreerimist ettevõtte turvaarhitektuuride ja tuntud parimate praktikatega.

[Microsoft Digital Defense Report](https://aka.ms/mddr) uuring näitab, et **98% teatatud rüvetustest oleks ära hoitud tugeva turvahügieeniga**. Kõige tõhusam kaitsestrateegia ühendab alused turvapõhimõtted MCP-spetsiifiliste kontrollidega — tõestatud alusturvameetmed jäävad kõige mõjusamaks riski vähendamisel.

## Praegune turvalisuse olukord

> **Märkus:** See info kajastab MCP turbestandardeid seisuga **5. veebruar 2026**, vastavalt **MCP Specification 2025-11-25**. MCP protokoll areneb jätkuvalt kiiresti ning tulevikus võivad lisanduda uued autentimis- ja autoriseerimismustrid ning täiustatud kontrollid. Järgige alati kehtivat [MCP spetsifikatsiooni](https://spec.modelcontextprotocol.io/), [MCP GitHubi hoidlat](https://github.com/modelcontextprotocol) ja [turvalisuse parimate praktikate dokumentatsiooni](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) uusimaid juhiseid.

## 🏔️ MCP turvasumma töökoda (Sherpa)

Praktiliseks turvaõppeks soovitame tungivalt **MCP Security Summit Workshopi** (Sherpa) — terviklikku juhendatud ekspeditsiooni MCP serverite turvamiseks Microsoft Azure´is.

### Töökoda ülevaade

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) pakub praktilist ja tegevusele suunatud turvaõpet läbi tõestatud meetodi "haavatavus → ärakasutamine → parandamine → valideerimine". Sa:

- **Õpid asju lõhkudes**: Koged haavatavusi käed-külge, ärakasutades tahtlikult ebaturvalisi servereid
- **Kasutad Azure-põhiseid turvalahendusi**: Kasutad Azure Entra ID, Key Vault, API Management ja AI Content Safety’t
- **Järgides põhjendatud turvalisust**: Läbid laagreid, ehitades terviklikke turbekihte
- **Rakendad OWASP standardeid**: Iga tehnika vastab [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) juhistele
- **Saa produktiivset koodi**: Saa kätte töötavad, testitud lahendused

### Ekspeditsiooni marsruut

| Laager | Keskendumine | Kaetud OWASP riskid |
|--------|--------------|---------------------|
| **Baaskaamer** | MCP alused & autentimishaavatavused | MCP01, MCP07 |
| **Laager 1: Identiteet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Laager 2: Lüüsi turvalisus** | API Management, Private Endpoints, haldus | MCP02, MCP06, MCP07, MCP09 |
| **Laager 3: I/O turvalisus** | Promptide süstimine, PII kaitse, sisu turvalisus | MCP03, MCP05, MCP06, MCP10 |
| **Laager 4: Jälgimine** | Logianalüütika, juhtpaneelid, ohutuvastus | MCP04, MCP08 |
| **Tippkohtumine** | Red Team / Blue Team integratsioonitest | Kõik |

**Alusta siin**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP peamised 10 turvariski

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) kirjeldab kümmet kõige kriitilisemat turvariski MCP rakendustes:

| Risk | Kirjeldus | Azure leevendus |
|-------|-----------|-----------------|
| **MCP01** | Tokenite valehaldus & saladuste lekkimine | Azure Key Vault, Managed Identity |
| **MCP02** | Õiguste eskaleerumine ulatuse suurenemise kaudu | RBAC, Tingimuslik ligipääs |
| **MCP03** | Tööriistade mürgitamine | Tööriistade valideerimine, terviklikkuse kontroll |
| **MCP04** | Tarkvara tarneahela rünnakud & sõltuvuste sabotaaž | GitHub Advanced Security, sõltuvuste skaneerimine |
| **MCP05** | Käskude süstimine & täitmine | Sisendi valideerimine, liivakast |
| **MCP06** | Kavatsuste voo alistamine | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Ebapiisav autentimine & autoriseerimine | Azure Entra ID, OAuth 2.1 koos PKCE-ga |
| **MCP08** | Auditilogide ja telemeetri puudumine | Azure Monitor, Application Insights |
| **MCP09** | Varjatud MCP serverid | API Center haldus, võrgueraldus |
| **MCP10** | Konteksti süstimine & ülemäärane jagamine | Andmete klassifikatsioon, minimaalne eksponeerimine |

### MCP autentimise areng

MCP spetsifikatsioon on autentimise ja autoriseerimise lähenemist oluliselt arendanud:

- **Algne lähenemine**: Varasemad spetsifikatsioonid nõudsid arendajatelt kohandatud autentimisserverite loomist, kus MCP serverid toimisid OAuth 2.0 autoriseerimisserveritena, hallates kasutaja autentimist otse
- **Praegune standard (2025-11-25)**: Uuendatud spetsifikatsioon lubab MCP serveritel volitada autentimine välistelt identiteedipakkujatelt (nt Microsoft Entra ID), parandades turvastaatust ja vähendades juurutamise keerukust
- **Transportturbeside**: Täiustatud toetus turvalisele transpordimehhanismile, sobivate autentimismustritega nii lokaalsete (STDIO) kui kaugühenduste (streamable HTTP) jaoks

## Autentimise ja autoriseerimise turvalisus

### Praegused turvaküsimused

Moodsed MCP lahendused seisavad silmitsi mitme autentimis- ja autoriseerimise probleemiga:

### Riskid ja ohutegurid

- **Valesti seadistatud autoriseerimisloogika**: MCP serverites vigaseks tehtud autoriseerimine võib avaldada tundlikke andmeid ja rakendada ligipääsuriske valesti
- **OAuth tokenite kompromiteerimine**: Lokaalse MCP serveri tokeni vargus võimaldab ründajal end serverina esitleda ja pääseda edasi sidusrakendustesse
- **Tokenite edasiandmise nõrkused**: Ebaõige tokenite käsitsemine loob turvakontrolli möödaviigud ja aruandluse lüngad
- **Ülemäärased õigused**: Liialt volitatud MCP serverid rikuvad minimaalsete õiguste põhimõtet ja suurendavad ründepinda

#### Tokenite edasiandmine: kriitiline anti-muster

**Tokeni edasiandmine on MCP autoriseerimise spetsifikatsioonis selgelt keelatud tänu olulistele turvariskidele:**

##### Turvakontrollide möödaviimine  
- MCP serverid ja allrakendused rakendavad olulisi turvakontrolle (taotluse kiiruse piiramine, sisendi valideerimine, liikluse jälgimine), mis sõltuvad tokeni korrektse valideerimisest  
- Kliendis otse API tokenite kasutamine jätab need kaitsed vahele, kahjustades turvarajatisi

##### Vastutuse ja auditi probleemid  
- MCP serverid ei suuda eristada kliente, kes kasutavad ülevalt tulevaid tokeneid, purustades auditraamid  
- Allikaserverite logid näitavad vale tellija taotlusi, mitte MCP serveri vahendajaid  
- Intsidendi uurimine ja vastavusauditid muutuvad oluliselt keerulisemaks

##### Andmete lekkimise riskid  
- Valimata tokenitega saavad pahatahtlikud tegijad kasutada MCP serverit proksina andmete äraviimiseks  
- Usalduspiiride rikkumine võimaldab juurdepääsu, mis mööduvad kavandatud turvakontrollidest

##### Mitme teenuse ründeteekonnad  
- Kompromiteeritud tokenid aktsepteeritakse mitmes teenuses, võimaldades külgvoolu rünnakuid  
- Usaldusvahemik teenuste vahel võib halveneda, kui tokenite päritolu ei ole tõendatav

### Turvakontrollid ja leevendused

**Kriitilised turvanõuded:**

> **KOHUSTUSLIK**: MCP serverid **EI TOHI** vastu võtta ühtegi tokenit, mis ei ole spetsiaalselt MCP serverile välja antud

#### Autentimise ja autoriseerimise kontrollid

- **Põhjalik autoriseerimise audit**: Viige läbi MCP serveri autoriseerimisloogika põhjalik ülevaatus, et tagada ligipääs ainult kavandatud kasutajatele ja klientidele
  - **Juurutusjuhend**: [Azure API Management kui autentimisvärav MCP serverite jaoks](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteedi integratsioon**: [Microsoft Entra ID kasutamine MCP serveri autentimiseks](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvaline tokenite haldus**: Rakendage [Microsofti tokeni valideerimise ja elutsükli parimaid praktikaid](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Kontrollige, et tokenite sihtrühm vastab MCP serveri identiteedile  
  - Rakendage tokenite korrektne pöörlemine ja aegumine  
  - Takistage tokenite korduskasutust ja volitamata kasutamist

- **Kaitstud tokeni salvestus**: Secure tokenite salvestus krüpteeritult nii rahuolekus kui transpordi ajal  
  - **Parimad tavad**: [Turvalise tokeni salvestamise ja krüpteerimise juhised](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Ligipääsu kontrolli teostamine

- **Vähimate õiguste põhimõte**: Andke MCP serveritele ainult minimaalsed vajalikud õigused kavandatud funktsionaalsuse jaoks  
  - Regulaarne õiguste ülevaatus ja värskendus õiguspiiride ennetamiseks  
  - **Microsofti dokumentatsioon**: [Turvaline ligipääs minimaalsete õigustega](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollipõhine ligipääsu kontroll (RBAC)**: Juhtige peenevõrdelisi rollijaotusi  
  - Kitsendage rolle kindlatele ressurssidele ja tegevustele  
  - Vältige laiaulatuslikke ja mittevajalikke õigusi, mis suurendavad rünnetepinda

- **Jätkuv õiguste jälgimine**: Tehke ligipääsu pidev auditeerimine ja jälgimine  
  - Jälgige õiguste kasutuse mustreid anomaaliate suhtes  
  - Parandage kiiresti liigsed või kasutamata õigused

## AI-spetsiifilised turvaohtud

### Promptide süstimine ja tööriistade manipuleerimise rünnakud

Moodne MCP-rakendused seisavad silmitsi keerukate AI-spetsiifiliste ründeteekondadega, mida traditsioonilised turvameetmed täielikult ei kata:

#### **Kaudne promptide süstimine (Cross-Domain Prompt Injection)**

**Kaudne promptide süstimine** on üks kriitilisemaid haavatavusi MCP-põhistes AI-süsteemides. Ründajad peidavad pahatahtlikke juhiseid välises sisus — dokumentides, veebilehtedel, meilides või andmeallikates — mida AI süsteemid hiljem töötlevad kui legitiimseid käske.

**Rünnakustsenaariumid:**  
- **Dokumendipõhine süstimine**: Pahatahtlikud juhised peidetud töödeldavatesse dokumentidesse, mis käivitavad tahtmatuid AI toiminguid  
- **Veebisisu kuritarvitamine**: Korrumpeerunud veebilehed, mis sisaldavad AI käitumist manipuleerivaid manustatud prompt’e sisseehitatuina  
- **E-posti baasil ründed**: Pahatahtlikud prompt’id meilides, mis sunnivad AI assistente info lekkima või volitamata toiminguid tegema  
- **Andmeallika reostus**: Korrumpeerunud andmebaasid või API-d, mis kannavad AI-le saastunud sisu

**Reaalne mõju:** Need rünnakud võivad põhjustada andmete äraviimist, privaatsuslähtumist, kahjuliku sisu genereerimist ja kasutajate suhtluse manipuleerimist. Üksikasjalikuma analüüsi leiab [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/et/prompt-injection.ed9fbfde297ca877.webp)

#### **Tööriistade mürgitamise rünnakud**

**Tööriistade mürgitamine** sihib MCP tööriistade metaandmeid, ärakasutades, kuidas suured keelemudelid (LLM) tõlgendavad tööriista kirjeldusi ja parameetreid täitmiskäitumise juhtimiseks.

**Ründemehhanismid:**  
- **Metaandmete manipuleerimine**: Ründajad süstivad tööriista kirjeldustesse, parameetrites või kasutusnäidetes pahatahtlikke juhiseid  
- **Nähtamatud juhised**: Peidetud prompt’id tööriista metaandmetes, mida AI mudel töötleb, kuid inimkasutajale nähtamatud  
- **Dünaamiline tööriistade muutmine ("Rug Pulls")**: Kasutajate poolt heaks kiidetud tööriistad muudetakse hiljem pahatahtlikeks tegevusteks ilma kasutaja teadmata  
- **Parameetrite süstimine**: Pahatahtlik sisu tööriista parameetrite skeemides, mõjutades mudeli käitumist

**Hostatud serverite riskid:** Kaug-MCP serverid toovad kaasa kõrgendatud riski, kuna tööriistade definitsioone saab muuta ka pärast kasutaja nõusolekut, luues olukordi, kus varem turvalised tööriistad muutuvad pahatahtlikeks. Üksikasjalik analüüs on saadaval [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/et/tool-injection.3b0b4a6b24de6bef.webp)

#### **Lisaks AI ründeteekonnad**

- **Ristdomeeni promptide süstimine (XPIA)**: Keerukad rünnakud, mis kasutavad mitme domeeni sisu turvakontrollide möödahiilimiseks
- **Dünaamiline võimekuse muutmine**: Reaalajas tehtavad tööriista võimekuse muudatused, mis jäävad esialgsete turvaanalüüside alt välja
- **Kontekstivälja mürgitamine**: Rünnakud, mis manipuleerivad suurte kontekstiväljadega, et varjata pahatahtlikke juhiseid
- **Mudeli segaduse rünnakud**: Mudeli piiratud võimete ärakasutamine, et tekitada ettearvamatuid või ebaturvalisi käitumisi


### AI turvariskide mõju

**Suure mõjuga tagajärjed:**
- **Andmete väljavedu**: Volitamata juurdepääs ja tundlike ettevõtte- või isikuandmete vargus
- **Privaatsuse rikkumised**: Isikut tuvastavate andmete (PII) ja konfidentsiaalse ärialase teabe avalikuks tulek  
- **Süsteemi manipuleerimine**: Kriitiliste süsteemide ja töövoogude tahtmatud modifikatsioonid
- **Tunnuste vargus**: Autentimispiletite ja teenusetunnuste kompromiteerimine
- **Lateralne liikumine**: Kompromiteeritud AI süsteemide kasutamine laiemate võrgurünnakute käivitamiseks

### Microsofti AI turvalahendused

#### **AI promptide kilbid: täiustatud kaitse süstimisterünnakute vastu**

Microsofti **AI promptide kilbid** pakuvad põhjalikku kaitset nii otseste kui ka kaudsete promptide süstimisrünnakute vastu mitme turvakihi kaudu:

##### **Põhikaitse mehhanismid:**

1. **Täiustatud tuvastamine ja filtreerimine**
   - Masinõppe algoritmid ja NLP meetodid tuvastavad pahatahtlikud juhised välises sisus
   - Dokumentide, veebilehtede, meilide ja andmeallikate reaalajas analüüs manustatud ohtude jaoks
   - Kontekstiline arusaam õigustatud versus pahatahtlikest promptimustritest

2. **Esiletõstmise tehnikad**  
   - Eraldab usaldusväärsed süsteemijuhised ja potentsiaalselt kompromiteeritud välised sisendid
   - Teksti transformeerimise meetodid, mis suurendavad mudeli asjakohasust, samas isoleerides pahatahtlikku sisu
   - Aitab AI süsteemidel hoida õigustatud juhiste hierarhiat ja ignoreerida süstitud käske

3. **Eraldajate ja andmemärgistamise süsteemid**
   - Selge piiri määratlus usaldusväärsete süsteemisõnumite ja välise sisuteksti vahel
   - Erilised märgendid tõstavad esile piirid usaldusväärsete ja mitteusaldusväärsete andmeallikate vahel
   - Selge eraldus takistab juhiste segadust ja volitamata käskude täitmist

4. **Jätkuv ohuinfo**
   - Microsoft jälgib pidevalt uusi rünnakumustreid ja uuendab kaitsemeetmeid
   - Proaktiivne ohujaht uute süstmisvõtete ja rünnakuvektorite tuvastamiseks
   - Regulaarne turvemudelite ajakohastamine, et säilitada efektiivsus arenevate ohtude vastu

5. **Azure sisu turvalisuse integratsioon**
   - Osa kogu Azure AI sisu turvalisuse paketist
   - Täiendav tuvastus vanglast väljumise katsumiste, kahjuliku sisu ja turvapoliitikate rikkumiste jaoks
   - Ühtsed turvakontrollid AI rakenduse komponentide vahel

**Rakenduse ressursid**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/et/prompt-shield.ff5b95be76e9c78c.webp)


## Täiustatud MCP turvaohtud

### Sessiooni ärakasutamise nõrkused

**Sessiooni ärakasutamine** on kriitiline ründevektor olekupõhistes MCP rakendustes, kus volitamata osapooled saavad ja kuritarvitavad legitiimseid sessioonituvastajaid, et esineda klientidena ja teha volitamata tegevusi.

#### **Ründestsenaariumid ja riskid**

- **Sessiooni ärakasutamise promptide süstimine**: Ründajad varastatud sessioonituvastajatega süstivad pahatahtlikke sündmusi serveritesse, mis jagavad sessiooni olekut, võimaldades kahjulikke tegevusi või tundlikele andmetele ligipääsu
- **Otsene kujutamine**: Varastatud sessioonituvastajad võimaldavad otsepöördumist MCP serverite poole ilma autentimiseta, käsitledes ründajaid legitiimsete kasutajatena
- **Kompromiteeritud jätkstreamid**: Ründajad võivad päringud ennetähtaegselt lõpetada, põhjustades legitiimsete klientide jätkamist potentsiaalselt pahatahtliku sisuga

#### **Turvakontroll sessioonihalduseks**

**Kriitilised nõuded:**
- **Volituse kontroll**: MCP serverid, mis rakendavad volitust, PEAVAD kontrollima KÕIKI sissetulevaid päringuid ja EI TOHI tugineda sessioonidele autentimiseks
- **Turvaline sessioonide loomine**: Kasutada krüptograafiliselt turvalisi, mittesisenduslikke sessioonituvastajaid, mis on loodud turvaliste juhuslike numbrite generaatoritega
- **Kasutajaspetsiifiline sidumine**: Siduda sessioonituvastajad kasutajaspetsiifilise info külge vormingus nagu `<user_id>:<session_id>`, et vältida sessioonide kuritarvitamist erinevate kasutajate vahel
- **Sessiooni elutsükli haldus**: Rakendada nõuetekohast aegumist, rotatsiooni ja tühistamist, et piirata haavatavuse aken
- **Transpordi turvalisus**: Kohustuslik HTTPS kõigile sidekanalitele, et takistada sessioonituvastajate pealtkuulamist

### Segadusse aetud volitaja probleem

**Segadusse aetud volitaja probleem** tekib, kui MCP serverid toimivad autentimise vahendajana klientide ja kolmandate osapoolte teenuste vahel, võimaldades staatiliste kliendi-IDde ärakasutamist volituse möödahiilimiseks.

#### **Ründemehhanismid ja riskid**

- **Küpsiste-põhine nõusoleku möödalaskmine**: Varasem kasutaja autentimine loob nõusoleku küpsiseid, mida ründajad kuritarvitavad pahatahtlike volituse päringutega ja ettevalmistatud suunamisadressidega
- **Volituskoode vargus**: Olemasolevad nõusolekuküpsised võivad panna volitusserverid vahele jätma nõusoleku ekraane, suunates koodid ründaja poolt kontrollitavasse lõpp-punkti  
- **Volitamata API kasutus**: Varastatud volituskoodid võimaldavad märgise vahetust ja kasutaja kujutamist ilma selgesõnalise heakskiiduta

#### **Leevendusstrateegiad**

**Kohustuslikud kontrollid:**
- **Selge nõusoleku nõue**: MCP vahendserverid, kasutades staatilisi kliendi-IDsid, PEAVAD saama kasutajate nõusoleku iga dünaamiliselt registreeritud kliendi puhul
- **OAuth 2.1 turvalisuse rakendamine**: Järgida praeguseid OAuth turvaparimaid tavasid, sealhulgas PKCE (Proof Key for Code Exchange) kõigi volituspäringute puhul
- **Range kliendi valideerimine**: Rakendada rangeid suunamis-URIde ja kliendi identifikaatorite valideerimisi ärakasutamise vältimiseks

### Sildi edasiandmise nõrkused  

**Sildi edasiandmine** on selge anti-muster, kus MCP serverid aktsepteerivad kliendisilte ilma nõuetekohase valideerimiseta ja edastavad neid alluvatele APIdele, rikkudes MCP volitustandardit.

#### **Turvalisuse tagajärjed**

- **Kontrolli möödahiilimine**: Otsene klient-API sildi kasutus möödahiilib kriitilised pärserežiimid, valideerimise ja järelevalvekontrollid
- **Auditijälje korruptsioon**: Ülevalt väljastatud sildid muudavad kliendi tuvastamise võimatuks, takistades intsidentide uurimist
- **Proxy-põhine andmete väljavedu**: Valideerimata sildid võimaldavad pahatahtlikel osapooltel kasutada servereid volitamata andmetele ligipääsu vahendina
- **Usalduse piiri rikkumised**: Alluvad teenused eeldavad usaldust, mida ei saa tõestada, kui sildi päritolu ei ole kontrollitav
- **Mitmeteenuste rünnakute laienemine**: Kompromiteeritud sildid lubavad külgsuunalist liikuvust mitmes teenuses

#### **Nõutavad turvakontrollid**

**Läbirääkimisteta nõuded:**
- **Sildi valideerimine**: MCP serverid EI TOHI aktsepteerida silte, mida pole selgesõnaliselt selle MCP serveri jaoks väljastatud
- **Publiku kontroll**: Alati tuleb kontrollida, et sildi sihtgrupp vastaks MCP serveri identiteedile
- **Õige sildi elutsükkel**: Rakendada lühikest kehtivustsüklit ja turvalist sildide rotatsiooni

## AI süsteemide tarneahela turvalisus

Tarneahela turvalisus on arenenud kaugemale traditsioonilistest tarkvarariikidest, hõlmates kogu AI ökosüsteemi. Moodsa MCP rakendused peavad rangelt valideerima ja jälgima kõiki AI-ga seotud komponente, kuna igaüks neist võib tuua sisse turvanõrkusi, mis võivad süsteemi terviklikkust ohustada.

### Laiendatud AI tarneahela komponendid

**Traditsioonilised tarkvarariigid:**
- Avaliku lähtekoodiga teegid ja raamistikud
- Konteinerpildid ja baassüsteemid  
- Arendusvahendid ja ehitustorud
- Infrastruktuuri komponendid ja teenused

**AI-spetsiifilised tarneahela elemendid:**
- **Põhimudelite mudelid**: Eeltreenitud mudelid erinevatelt teenusepakkujatelt, mis vajavad päritolu kontrolli
- **Embeddinguteenused**: Välistest vektoreerimise ja semantilise otsingu teenustest
- **Konteksti pakkujad**: Andmeallikad, teadmiste baasid ja dokumendirajatised  
- **Kolmandate osapoolte APId**: Välised AI teenused, ML töövoolud ja andmetöötluse lõpp-punktid
- **Mudeli artefaktid**: Kaalud, konfiguratsioonid ja peenhäälestatud mudeliversioonid
- **Treenimisandmete allikad**: Andmekogumid treeninguks ja peenhäälestamiseks

### Ulatuslik tarneahela turvastrateegia

#### **Komponendi valideerimine ja usaldus**
- **Päritolu kontroll**: Kontrolli kõigi AI komponentide päritolu, litsentseeringut ja terviklikkust enne integreerimist
- **Turvaanalüüs**: Läbiviidud turva- ja nõrkuste skannimised mudelitele, andmeallikatele ja AI teenustele
- **Maine hindamine**: Hinda AI teenusepakkujate turvarekordit ja praktikaid
- **Vastavuse kontroll**: Veendu, et kõik komponendid vastavad organisatsiooni turva- ja regulatiivsetele nõuetele

#### **Turvalised juurutustorud**  
- **Automatiseeritud CI/CD turvalisus**: Turvaskaneerimine kogu automatiseeritud juurutustoru jooksul
- **Artefaktide terviklikkus**: Rakenda krüptograafilist valideerimist kõigi juurutatud artefaktide (kood, mudelid, konfiguratsioonid) puhul
- **Järkjärguline juurutus**: Kasuta progressiivseid juurutusstrateegiaid turvakontrolliga iga faasi juures
- **Usaldusväärsed artefaktide hoidlad**: Juuruta ainult verifitseeritud turvalistest hoidlatest ja registritest

#### **Jätkuv jälgimine ja reageerimine**
- **Sõltuvuste skaneerimine**: Pidev nõrkuste jälgimine kõigi tarkvara- ja AI komponentide sõltuvuste puhul
- **Mudeli jälgimine**: Mudeli käitumise, jõudluse nihke ja turvanormide pidev hindamine
- **Teenuse tervise jälgimine**: Väliste AI teenuste jälgimine saadavuse, turvaintsidentide ja poliitikamuudatuste jaoks
- **Ohuinfo integratsioon**: Kaasa AI ja ML turvariskidele spetsiifilised ohuandmed

#### **Juurdepääsukontroll ja minimaalne privileeg**
- **Komponendipõhised õigused**: Piira juurdepääsu mudelitele, andmetele ja teenustele ärivajaduse põhjal
- **Teenusekonto haldus**: Rakenda pühendatud teenusekontosid minimaalsete vajalike õigustega
- **Võrgu segmentatsioon**: Isoleeri AI komponendid ja piiritle võrgu ligipääs teenuste vahel
- **API värava kontrollid**: Kasuta tsentraliseeritud API väravaid väliste AI teenuste juurdepääsu kontrollimiseks ja jälgimiseks

#### **Intsidentide reageerimine ja taastumine**
- **Kiired reageerimisprotseduurid**: Väljatöötatud protsessid kompromiteeritud AI komponentide parandamiseks või asendamiseks
- **Tunnuste rotatsioon**: Automatiseeritud süsteemid saladuste, API võtmete ja teenusetunnuste rotatsiooniks
- **Tagasipööramise võimalus**: Võime kiiresti taastada AI komponentide varasem teada-turvaline versioon
- **Tarneahela rikkumise taastumine**: Spetsiifilised protseduurid ülemiste AI teenuste kompromiteerumise korral

### Microsofti turvavahendid ja integratsioon

**GitHub Advanced Security** pakub põhjalikku tarneahela kaitset, sh:
- **Saladuste skannimine**: Automaatne autentimistunnuste, API võtmete ja siltide tuvastus hoidlates
- **Sõltuvuste skaneerimine**: Nõrkuste hindamine avatud lähtekoodiga sõltuvuste ja teekide puhul
- **CodeQL analüüs**: Staatiline koodi analüüs turva- ja programmeerimisvigade tuvastamiseks
- **Tarneahela ülevaade**: Sõltuvuste tervise ja turvastaatuse nähtavus

**Azure DevOps & Azure Repos integratsioon:**
- Sujuv turvaskaneerimise integratsioon Microsofti arendusplatvormide kaudu
- Automaatne turvakontroll Azure Pipeline’ides AI tööde jaoks
- Poliitikate jõustamine turvaliseks AI komponentide juurutamiseks

**Microsofti sisemised praktikad:**
Microsoft rakendab laiaulatuslikke tarneahela turvapraktikaid kõigis toodetes. Loe tõestatud lähenemisi aadressil [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Põhiturvalisuse head tavad

MCP rakendused pärivad ja arendavad edasi teie organisatsiooni olemasolevat turvapositsiooni. Põhituru tugevdamine parandab oluliselt AI süsteemide ja MCP juurutuste üldist turvalisust.

### Põhiturvalisuse alused

#### **Turvalise arenduse tavad**
- **OWASP nõuetele vastavus**: Kaitse [OWASP Top 10](https://owasp.org/www-project-top-ten/) veebirakenduste nõrkuste vastu
- **AI-spetsiifiline kaitse**: Rakenda kontrolli [OWASP Top 10 LLMide jaoks](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Turvaline saladuste haldus**: Kasuta spetsiaalseid vahendeid tunnuste, API võtmete ja tundlike konfiguratsioonide hoidmiseks
- **Punkt-punkti krüpteerimine**: Rakenda turvalist suhtlust kõigi rakenduse komponentide ja andmevoogude vahel
- **Sisendi valideerimine**: Range valideerimine kõigi kasutajasisestuste, API parameetrite ja andmeallikate puhul

#### **Tarkvara infrastruktuuri tugevdamine**
- **Mitmefaktoriline autentimine**: Kohustuslik MFA kõikidele haldus- ja teenusekontodele
- **Tarkvaraparanduste haldus**: Automatiseeritud ja õigeaegne paranduste rakendamine operatsioonisüsteemidele, raamistikutele ja sõltuvustele  
- **Identiteedihalduse integratsioon**: Keskne identiteedi haldamine ettevõtte identiteedipakkujate (Microsoft Entra ID, Active Directory) kaudu
- **Võrgu segmentatsioon**: MCP komponentide loogiline isolatsioon külgliikumise takistamiseks
- **Vähima privileegi põhimõte**: Minimaalne vajalik õiguste komplekt kõigile süsteemi komponentidele ja kontodele

#### **Turvamineerimine ja avastamine**
- **Põhjalik logimine**: Üksikasjalik AI rakenduste tegevuste logimine, sealhulgas MCP kliendi-serveri suhtlus
- **SIEM integratsioon**: Keskne infoturbe ja sündmuste haldus anomaaliate tuvastamiseks
- **Käitumusanalüütika**: AI-põhine jälgimine süsteemi ja kasutajakäitumiste ebatavaliste mustrite avastamiseks
- **Ohuinfo**: Välistest ohusöötmetest ja kompromiteerimise indikaatoritest (IOC) lähtuvalt
- **Intsidentide reageerimine**: Täpselt määratletud protseduurid turvaintsidentide tuvastamiseks, reageerimiseks ja taastumiseks

#### **Zero Trust arhitektuur**
- **Ära kunagi usalda, alati kontrolli**: Jätkuv kasutajate, seadmete ja võrguühenduste kontroll
- **Mikrosegmentatsioon**: Detailne võrgukontroll, mis isoleerib üksikud töökoormused ja teenused
- **Identiteedikeskne turvalisus**: Turvapoliitikad põhinevad kinnitatud identiteetidel, mitte võrgulokatsioonil
- **Jätkuv riskihinnang**: Dünaamiline turupositsiooni hindamine vastavalt hetke kontekstile ja käitumisele
- **Tingimuslik juurdepääs**: Ligipääsukontrollid, mis kohanduvad riskitegurite, asukoha ja seadme usaldusväärsuse põhjal

### Ettevõtte integratsioonimustrid

#### **Microsofti turvaökosüsteemi integratsioon**
- **Microsoft Defender for Cloud**: Kogu pilve turvapositsiooni haldus
- **Azure Sentinel**: Pilvepõhine SIEM ja SOAR AI töökoormuste kaitseks
- **Microsoft Entra ID**: Ettevõtte identiteedi- ja juurdepääsuhaldus tingimusliku juurdepääsuga
- **Azure Key Vault**: Keskne saladuste haldus riistvarapõhise turvamooduliga (HSM)
- **Microsoft Purview**: Andmehaldus ja vastavus AI andmeallikate ja töövoogude jaoks

#### **Vastavus ja juhtimine**
- **Regulatiivne kooskõla**: Veendu, et MCP rakendused vastavad tööstusharu spetsiifilistele nõuetele (GDPR, HIPAA, SOC 2)
- **Andmete klassifikatsioon**: Tundlike andmete nõuetekohane kategoriseerimine ja käitlemine AI süsteemides
- **Auditijäljed**: Põhjalik logimine regulatiivseks vastavuseks ja kohtuarhiveerimiseks
- **Privaatsuskontrollid**: Privaatsust silmas pidava disaini põhimõtete rakendamine AI süsteemi arhitektuuris
- **Muudatuste haldus**: Formaliseeritud protsessid AI süsteemi muudatuste turvavaatluseks

Need põhiharjumused loovad tugeva turvapõhja, mis suurendab MCP-spetsiifiliste turvakontrollide efektiivsust ja pakub terviklikku kaitset AI-põhiste rakenduste jaoks.

## Peamised turvakokkuvõtted
- **Kihtidepõhine turvalahendus**: Kombineeri põhilisi turvapraktikaid (turvaline programmeerimine, minimaalsete õiguste põhimõte, tarneahela kontroll, pidev jälgimine) AI-spetsiifiliste kontrollidega tervikliku kaitse tagamiseks

- **AI-spetsiifiline ohtude maastik**: MCP süsteemid seisavad silmitsi ainulaadsete riskidega, nagu promptide süstimine, tööriistade mürgitamine, sessioonikaaperdamine, segaduses abistaja probleemid, tokenite edasiandmise haavatavused ja liigsed õigused, mis nõuavad spetsialiseeritud leevendusi

- **Autentimise ja autoriseerimise tipptase**: Rakenda tugevat autentimist, kasutades väliseid identiteediteenuse pakkujaid (Microsoft Entra ID), kehtesta korrektne tokeni valideerimine ja ära kunagi aktsepteeri märke, mis ei ole otseselt väljastatud sinu MCP serverile

- **AI rünnakute ennetamine**: Kasuta Microsoft Prompt Shield’e ja Azure Content Safety teenust, et kaitsta kaudsete promptide süstimise ja tööriistade mürgitamise eest, valideeri tööriistade metaandmeid ning jälgi dünaamilisi muutusi

- **Sessiooni ja transpordi turvalisus**: Kasuta krüptograafiliselt turvalisi, mittedeterministlikke sessioonitunnuseid, mis on seotud kasutaja identiteediga, rakenda õiget sessiooni elutsükli haldust ning ära kunagi kasuta sessioone autentimiseks

- **OAuth turvalisuse parimad tavad**: Ennetada segaduses abistaja rünnakuid kasutaja selge nõusoleku kaudu dünaamiliselt registreeritud klientide puhul, rakendades korrektselt OAuth 2.1 koos PKCE-ga ning ranget redirect URI valideerimist

- **Tokeni turvalisuse põhimõtted**: Väldi tokenite edasiandmise väärkasutust, valideeri tokeni sihtgrupi väiteid, kasuta lühiajalisi märke turvalise rotatsiooniga ning hoia selged usalduspiirid

- **Terviklik tarneahela turvalisus**: Kohtle kõiki AI ökosüsteemi komponente (mudelid, embedimised, kontekstiteenuse pakkujad, välised API-d) sama range turvakontrolliga nagu traditsioonilisi tarkvara sõltuvusi

- **Jooksev areng**: Hoidu kursis kiiresti arenevate MCP spetsifikatsioonidega, panusta turvakogukonna standarditesse ning säilita kohanemisvõimeline turvalisuse hoiak protokolli valmimise jooksul

- **Microsofti turvaintegratsioon**: Kasuta Microsofti terviklikku turvaökosüsteemi (Prompt Shield'id, Azure Content Safety, GitHub Advanced Security, Entra ID) MCP juurutuse tugevdamiseks

## Terviklikud ressursid

### **Ametlik MCP turvadokumentatsioon**
- [MCP spetsifikatsioon (kehtiv alates: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turvalisuse parimad tavad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub hoidla](https://github.com/modelcontextprotocol)

### **OWASP MCP turvaressursid**
- [OWASP MCP Azure turve juhend](https://microsoft.github.io/mcp-azure-security-guide/) – Terviklik OWASP MCP Top 10 koos Azure rakendamise juhistega
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Ametlikud OWASP MCP turvariskid
- [MCP turvasümposiooni töötuba (Sherpa)](https://azure-samples.github.io/sherpa/) – Praktikaline MCP turvakoolitus Azure platvormil

### **Turvastandardid ja parimad tavad**
- [OAuth 2.0 turvalisuse parimad tavad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 veebirakenduste turvalisus](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurte keelemudelite jaoks](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digitaalne Kaitse Aruanne](https://aka.ms/mddr)

### **AI turvauuringud ja analüüs**
- [Promptide süstimine MCP-s (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tööriistade mürgitamise rünnakud (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP turvauuringute kokkuvõte (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsofti turvalahendused**
- [Microsoft Prompt Shields dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety teenus](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID turvalisus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure tokenite halduse parimad tavad](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Juurutamisjuhendid ja juhendid**
- [Azure API Management kui MCP autentimise värav](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentimine MCP serveritega](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Turvaline tokenite salvestamine ja krüpteerimine (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOpsi ja tarneahela turvalisus**
- [Azure DevOps turvalisus](https://azure.microsoft.com/products/devops)
- [Azure Repos turvalisus](https://azure.microsoft.com/products/devops/repos/)
- [Microsofti tarneahela turbe teekond](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Täiendav turvadokumentatsioon**

Tervikliku turvajuhendi jaoks vaata neid spetsialiseeritud dokumente selles jaotises:

- **[MCP turvalisuse parimad tavad 2025](./mcp-security-best-practices-2025.md)** – Täielik MCP rakenduste turvalisuse parimate tavade kogumik
- **[Azure Content Safety juurutamine](./azure-content-safety-implementation.md)** – Praktilised juurutamise näited Azure Content Safety integreerimiseks
- **[MCP turvakontrollid 2025](./mcp-security-controls-2025.md)** – Viimased turvakontrollid ja tehnikad MCP juurutusteks
- **[MCP parimate tavade kiire viide](./mcp-best-practices.md)** – Kiire viide põhiturvatavadele MCP-s
- **[BlueHat 2026: AI tuleviku kindlustamine: MCP kaitse süvaomadustega](https://www.youtube.com/watch?v=cVWB58kEt-Y)** – Kaitse sügavusega mustrid Microsoft Security Response Centerilt (MSRC)

### **Praktiline turvakoolitus**

- **[MCP turvasümposiooni töötuba (Sherpa)](https://azure-samples.github.io/sherpa/)** – Terviklik praktiline töötuba MCP serverite turvamiseks Azure'is, pakkudes järkjärgulisi laagreid alates Base Campist kuni Summitini
- **[OWASP MCP Azure turve juhend](https://microsoft.github.io/mcp-azure-security-guide/)** – Viitearhitektuur ja rakendamise juhised kogu OWASP MCP Top 10 riskide jaoks

---

## Mis järgmiseks

Edasi: [3. peatükk: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->