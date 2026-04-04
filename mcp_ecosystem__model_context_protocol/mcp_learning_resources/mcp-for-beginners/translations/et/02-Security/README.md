# MCP turvalisus: terviklik kaitse tehisintellekti süsteemidele

[![MCP Security Best Practices](../../../translated_images/et/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Järgmise õppetunni video vaatamiseks klõpsake ülaloleval pildil)_

Turvalisus on tehisintellekti süsteemide kujundamise alus, mistõttu anname sellele prioriteedi teises osas. See vastab Microsofti **Secure by Design** põhimõttele [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) raames.

Model Context Protocol (MCP) pakub tehisintellektil põhinevatele rakendustele võimsaid uusi võimalusi, tuues samas kaasa ainulaadsed turvariskid, mis ulatuvad kaugemale traditsiooniliste tarkvarariskide piiridest. MCP süsteemid seisavad silmitsi nii tavapäraste turvaohutustega (turvaline kodeerimine, minimaalsete õiguste põhimõte, tarneahela turvalisus) kui ka uute tehisintellektile spetsiifiliste ohtudega, nagu näiteks promptide süstimine, tööriistade mürgitamine, seansi kaaperdamine, segaduses esindaja rünnakud, tokenite läbipääsu haavatavused ja dünaamiline võimete muutmine.

See õppetund käsitleb olulisemaid turvariske MCP rakendustes – hõlmates autentimist, volitusi, liigseid õigusi, kaudset promptide süstimist, seansi turvalisust, segaduses esindaja probleeme, tokenite haldust ja tarneahela haavatavusi. Õpite praktilisi juhtnööre ja parimaid tavasid nende riskide maandamiseks, kasutades Microsofti lahendusi nagu Prompt Shields, Azure Content Safety ja GitHub Advanced Security, et tugevdada oma MCP rakendust.

## Õpiväljundid

Selle õppetunni lõpuks oskad:

- **Tuvastada MCP-spetsiifilisi ohte**: Märgata MCP süsteemidele omaseid turvariske, sealhulgas promptide süstimist, tööriistade mürgitamist, liigseid õigusi, seansi kaaperdamist, segaduses esindaja probleeme, tokenite läbipääsu haavatavusi ja tarneahela riske
- **Rakendada turvakontrolle**: Viia ellu tõhusaid leevendusvõtteid, sealhulgas tugevat autentimist, minimaalsete õiguste juurdepääsu, turvalist tokenite haldust, seansi turvameetmeid ja tarneahela kontrolli
- **Kasutada Microsofti turvalahendusi**: Mõista ja juurutada Microsoft Prompt Shields, Azure Content Safety ja GitHub Advanced Security MCP töökoormuste kaitseks
- **Kinnitada tööriistade turvalisust**: Mõista tööriista metadata valideerimise tähtsust, dünaamiliste muudatuste jälgimist ja kaitsemeetmeid kaudse promptide süstimise vastu
- **Integreerida parimaid praktikaid**: Kombineerida kindlaid turvalahendusi (turvaline kodeerimine, serveri tugevdamine, nullusaldus) MCP-spetsiifiliste kontrollidega terviklikuks kaitseks

# MCP turvalisuse arhitektuur ja kontrollid

Moodsa MCP rakendused vajavad kihilisi turvalahendusi, mis käsitlevad nii traditsioonilist tarkvaraturvalisust kui ka tehisintellektile omaseid ohte. Kiiresti arenev MCP spetsifikatsioon täiustab pidevalt oma turvakontrolle, võimaldades paremat integreerimist ettevõtte turbe- ja parimate tavadega.

[Microsoft Digital Defense Report](https://aka.ms/mddr) uuringud näitavad, et **98% teatatud rikkumistest oleks võinud takistada põhjalik turvahügieen**. Kõige tõhusam kaitsemeetod ühendab aluspõhimõtetel põhinevad turvameetmed MCP-spetsiifiliste kontrollidega – tõestatud baastaseme turvalahendused vähendavad oluliselt riske.

## Praegune turvamaastik

> **Märkus:** See info kajastab MCP turvastandardeid seisuga **5. veebruar 2026**, vastates **MCP spetsifikatsioonile 2025-11-25**. MCP protokoll areneb kiiresti ning tulevikus võivad ilmneda uued autentimis- ja kontrollimustrid. Järgige alati kehtivat [MCP spetsifikatsiooni](https://spec.modelcontextprotocol.io/), [MCP GitHub repos](https://github.com/modelcontextprotocol) ja [turvalisuse parimate tavade dokumentatsiooni](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) värskeimat infot.

## 🏔️ MCP turvasuurtipi töötoad (Sherpa)

Praktilise turvakoolituse jaoks soovitame soojalt **MCP Security Summit Workshop** (Sherpa) – põhjalik juhendatud matk MCP serverite turvamiseks Microsoft Azure'is.

### Töötuba ülevaade

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) pakub praktilist ja tegutsemisuuendavat turvakoolitust, kasutades tõestatud "haavatav → ekspluateeri → paranda → valideeri" metoodikat. Sa:

- **Õpid katsetades**: koged haavatavusi, ründades sihilikult ebaturvalisi servereid
- **Kasutad Azure'i natiivseid turvalahendusi**: Azure Entra ID, Key Vault, API Management, tehisintellekti sisukaitset
- **Järgides mitmekihilist kaitset**: läbid erinevaid laagreid, luues tervikliku turvakihtide süsteemi
- **Rakendad OWASP standardeid**: iga tehnikat seostatakse [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) juhendiga
- **Saad tootmiskoodi**: kaasa lõplikult testitud ja töötavad lahendused

### Matka marsruut

| Laager | Keskendumine | Kaetud OWASP riskid |
|------|--------------|---------------------|
| **Baaskamp** | MCP algtõed ja autentimisrikkumised | MCP01, MCP07 |
| **Laager 1: Identiteet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Laager 2: Lüüsi turve** | API Management, Private Endpoints, haldus | MCP02, MCP07, MCP09 |
| **Laager 3: Sisendi/väljundi turve** | Prompt süstimine, isikuandmete kaitse, sisukaitse | MCP03, MCP05, MCP06 |
| **Laager 4: Jälgimine** | Logi analüütika, juhtpaneelid, ohu tuvastus | MCP08 |
| **Suur Tipu Test** | Punane/Sinine meeskonna ühendav test | Kõik |

**Alustamiseks**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP TOP 10 turvariski

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) kirjeldab kümmet olulisemat turvariski MCP rakendustele:

| Risk | Kirjeldus | Azure lahendus |
|------|-----------|----------------|
| **MCP01** | Tokenite vale haldamine ja saladuste lekkimine | Azure Key Vault, Managed Identity |
| **MCP02** | Õiguste eskalatsioon laieneva ulatusega | RBAC, tingimuslik juurdepääs |
| **MCP03** | Tööriistade mürgitamine | Tööriistade valideerimine ja terviklikkuse kontroll |
| **MCP04** | Tarneahela rünnakud | GitHub Advanced Security, sõltuvuste skaneerimine |
| **MCP05** | Käskude süstimine ja täitmine | Sisendi valideerimine, sandboxes |
| **MCP06** | Promptide süstimine kontekstipõhiste andmete kaudu | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Ebapiisav autentimine ja autorisatsioon | Azure Entra ID, OAuth 2.1 koos PKCE-ga |
| **MCP08** | Auditite ja telemeetria puudumine | Azure Monitor, Application Insights |
| **MCP09** | Varjatud MCP serverid | API Center haldus, võrgu isoleerimine |
| **MCP10** | Konteksti süstimine ja liigne jagamine | Andmete klassifitseerimine, minimaalne avalikustamine |

### MCP autentimise areng

MCP spetsifikatsioon on autentimise ja autoriseerimise osas oluliselt arenenud:

- **Originaalne lähenemine**: Varasemad spetsifikatsioonid nõudsid arendajatelt kohandatud autentimisserverite loomist, MCP serverid tegutsesid otseOAuth 2.0 autoriseerimisteenusena
- **Praegune standard (2025-11-25)**: Värske spetsifikatsioon võimaldab MCP serveritel volitada välist identiteedipakkujat (nt Microsoft Entra ID), parandades turvataset ja lihtsustades juurutust
- **Transpordikihi turvalisus**: Tugevdatud tugi turvalistele kommunikatsioonikanalitele mõlemas suunas (kohalik STDIO ja kaug-Streamable HTTP)

## Autentimise ja autoriseerimise turvalisus

### Praegused turvakatsumused

Moodsa MCP rakendused seisavad silmitsi mitmete autentimise ja autoriseerimise väljakutsetega:

### Riskid ja ründevektorid

- **Valesti konfigureeritud autoriseerimislõogika**: Vead autoriseerimises võivad avaldada delikaatset infot ja lubada valesid juurdepääse
- **OAuth tokeni kompromiteerimine**: Kohalik MCP serveri tokeni vargus võimaldab ründajatel serverite eest poseerida ja ligipääsu saada teenustele
- **Tokenite läbipääsu haavatavused**: Vale tokenite käsitlus tekitab turvakontrollide möödalaske ja vastutustuse tühimikud
- **Liigsed õigused**: Üleõigustatud MCP serverid rikuvad minimaalsete õiguste põhimõtet ja suurendavad ründepinda

#### Tokenite läbipääs: kriitiline valepraktika

Praeguse MCP autoriseerimise spetsifikatsiooni kohaselt **on tokenite läbipääs rangelt keelatud** tõsiste turvaprobleemide tõttu:

##### Turvaprotokolli möödalaske riskid
- MCP serverid ja allpool asuvad API-d rakendavad olulisi turvakontrolle (nt piiramised, päringute valideerimine, liikluse jälgimine), mis sõltuvad õigest tokeni tõestamisest
- Kliendilt otse API-ile tokeni kasutamine juhib ümber need kaitsed, nõrgestades turvasüsteemi tervikuna

##### Vastutus- ja auditeerimisraskused
- MCP serverid ei suuda eristada ühiselt väljaantud tokeneid, mistõttu kaob auditraamistik
- Allapi serverite logid näitavad valeid päringu algatuskohti, mitte tegelikku vahendajat
- Juhtumite uurimine ja vastavuskontroll muutub palju keerulisemaks

##### Andmelekkete riskid
- Valimata tokeni nõuded võimaldavad ründajatel varastatud tokenitega kasutada MCP servereid andmekanalitena
- Usalduspiiride rikkumised, mis võimaldavad volitamata juurdepääsu

##### Mitmepoolsete teenuste ründevõimalused
- Kompromiteeritud tokenid lubavad külgründegi mitme ühendatud teenuse vahel
- Usaldusvahemikud rikutakse, kui tokenite päritolu ei ole kontrollitav

### Turvakontrollid ja leevendused

**Olulised turvanõuded:**

> **KOHUSTUSLIK**: MCP serverid **EI TOHI** vastu võtta ühtegi tokenit, mis ei ole otseselt MCP serverile väljastatud

#### Autentimise ja autoriseerimise kontrollid

- **Täpne autoriseerimise audit**: Tehke põhjalikke audititlusi MCP serveri autoriseerimislõogikale, et kindlustada, et ainult nimetatud kasutajad ja kliendid pääsevad tundlikele ressurssidele ligi
  - **Juhtnööride juhend**: [Azure API Management autentimislüüsi rollis MCP serveritele](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Identiteedi integratsioon**: [Microsoft Entra ID kasutamine MCP serveri autentimiseks](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Turvaline tokenihaldus**: Rakenda [Microsofti tokenite valideerimise ja elutsükli parimaid tavasid](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Kontrolli, et tokeni sihtrühm vastab MCP serveri identiteedile
  - Rakenda nõuetekohane tokeni pöörlemine ja aegumispoliitikad
  - Takista tokenite korduskasutust ja volitamata kasutust

- **Tokenite kaitstud salvestus**: Hoia tokeneid krüpteerituna nii puhkeolekus kui ka ülekannetel
  - **Parimad tavad**: [Tokenite turvalise salvestuse ja krüpteerimise juhend](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Juurdepääsukontrolli rakendamine

- **Minimaalsete õiguste põhimõte**: Anna MCP serveritele vaid minimaalne vajalik õiguste maht
  - Regulaarne õiguste ülevaatus ja uuendamine, et vältida õiguste laienemist
  - **Microsofti dokumentatsioon**: [Turvaline minimaalsete õigustega juurdepääs](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rollipõhine juurdepääsukontroll (RBAC)**: Rakenda peenhäälestatud rollimooduleid
  - Piira rolle konkreetsete ressursside ja tegevustega
  - Väldi liigseid või mittevajalikke õigusi, mis suurendavad ründepinda

- **Pidev õiguste jälgimine**: Rakenda juurdepääsu pidev auditeerimine ja monitooring
  - Jälgi õiguste kasutusmustreid kõrvalekallete leidmiseks
  - Lahenda üleliigsed või kasutamata õigused kiiresti

## Tehisintellektile spetsiifilised turvaohtud

### Promptide süstimine ja tööriistade manipuleerimise rünnakud

Moodsa MCP rakendustes esineb keerukaid AI-spetsiifilisi ründevektoreid, mida traditsioonilised turvameetmed täielikult ei hõlma:

#### **Kaudne promptide süstimine (Cross-Domain Prompt Injection)**

**Kaudne promptide süstimine** on üks kriitilisemaid MCP-l põhinevate AI süsteemide haavatavusi. Ründajad manustavad pahatahtlikke juhiseid välisesse sisusse – dokumentidesse, veebilehtedesse, e-kirjadesse või andmeallikatesse –, mida AI hiljem töötleb õiguspäraste käskudena.

**Ründestsenaarioid:**
- **Dokumendipõhine süstimine**: Pahatahtlikud juhised peidetud töödeldavates dokumentides, mis tekitavad soovimatuid AI tegevusi
- **Veebi sisu ärakasutamine**: Rikutud veebilehed, milles on manustatud promptid, mis mõjutavad AI käitumist, kui sisu kraabiti
- **E-kirja baasil rünnakud**: Emailides sisalduvad pahatahtlikud promptid, mis panevad AI assistendid lekkima infot või tegutsema volitusteta
- **Andmeallikate saastamine**: Rikutud andmebaasid või API-d, mis tarnivad reklaamitud sisu AI süsteemidele

**Reaalmaailma mõju**: Need rünnakud võivad põhjustada andmelekkimist, privaatsuskatastroofe, ohtliku sisu loomist ja kasutajate manipuleerimist. Üksikasjaliku analüüsi leiab aadressilt [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/et/prompt-injection.ed9fbfde297ca877.webp)

#### **Tööriistade mürgitamise rünnakud**

**Tööriistade mürgitamine** sihib MCP tööriistade metaandmeid, kasutades ära seda, kuidas suured keelemudelid tõlgendavad tööriistade kirjeldusi ja parameetreid oluliste täitmislahenduste jaoks.

**Ründemehhanismid:**
- **Metaandmete manipuleerimine**: Ründajad manustavad tööriista kirjeldustesse, parameetrite definitsioonidesse või kasutusnäidetesse pahatahtlikke juhiseid
- **Nähtamatud juhised**: Peidetud promptid tööriistade metaandmetes, mida AI mudelid töötlevad, ent inimkasutajatele ei kuvata
- **Dünaamiline tööriistade muutmine ("Rug Pulls")**: Kasutajate poolt heaks kiidetud tööriistad muudetakse hiljem pahatahtlikuks ilma kasutajate teadmiseta
- **Parameetri süstimine**: Pahatahtlik sisu manustatud tööriista parameetrite skeemidesse, mis mõjutab mudeli käitumist

**Hostitud serverite riskid**: Kaugsed MCP serverid on suurema riskiga, sest tööriistade määratlusi saab muuta pärast kasutaja algset kinnitust, luues olukordi, kus varem ohutuks peetud tööriistad muutuvad ohtlikuks. Detailselt vaata [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/et/tool-injection.3b0b4a6b24de6bef.webp)

#### **Täiendavad AI ründetee skeemid**

- **Ristdomeeni promptide süstimine (XPIA)**: Keerukad rünnakud, mis kasutavad sisu mitmest domeenist, et turvakontrolle eirata
- **Dünaamiline võimekuste muutmine**: Reaalajas tööriistade võimekuse muudatused, mis jäävad algsete turvaanalüüside alt välja
- **Kontekstakna mürgitamine**: Rünnakud, mis manipuleerivad suure kontekstaknaga, et varjata pahatahtlikke juhiseid
- **Mudeli segaduse rünnakud**: Mudeli piirangute ärakasutamine ettearvamatute või ebaturvaliste käitumiste tekitamiseks


### Tehisintellekti turvariskide mõju

**Kõrge mõju tagajärjed:**
- **Andmete väljapetmine**: Volitamata juurdepääs ja tundlike ettevõtte- või isikuandmete vargus
- **Privaatsuse rikkumised**: Isikut tuvastava teabe (PII) ja konfidentsiaalsete ärandmete avalikustamine  
- **Süsteemi manipuleerimine**: Kriitiliste süsteemide ja töövoogude soovimatud muutmised
- **Autentimistunnuste vargus**: Autentimismärgiste ja teenustega seotud volituste kompromiteerimine
- **Lateraali liikumine**: Kompromiteeritud tehisintellekti süsteemide kasutamine laiemate võrgurünnakute läbiviimiseks

### Microsofti tehisintellekti turvalahendused

#### **AI prompti kilbid: täiustatud kaitse süstimisrünnakute vastu**

Microsofti **AI prompti kilbid** tagavad põhjaliku kaitse nii otseste kui ka kaudsete prompti süstimisrünnakute vastu mitme turbekihi kaudu:

##### **Põhilised kaitsemehhanismid:**

1. **Täiustatud tuvastamine ja filtreerimine**
   - Masinõppe algoritmid ja NLP meetodid tuvastavad pahatahtlikud juhised välises sisus
   - Reaalaegne analüüs dokumentide, veebilehtede, e-kirjade ja andmeallikate puhul sisseehitatud ohtude suhtes
   - Kontekstipõhine arusaamine legitiimsetest vs pahatahtlikest promptimustritest

2. **Esiletõstmise tehnikad**  
   - Eraldab usaldusväärsed süsteemi juhised ja potentsiaalselt kompromiteeritud välised sisendid
   - Tekstimuutmise meetodid, mis parandavad mudeli asjakohasust, eraldades samal ajal pahatahtliku sisu
   - Aitab AI süsteemidel säilitada korrektset juhiste hierarhiat ja ignoreerida süstitud käske

3. **Piirdemärgistuse ja andmemärgistuse süsteemid**
   - Selge piiritletus usaldusväärsete süsteemisõnumite ja välise sisuteksti vahel
   - Spetsiaalsed märgised toovad esile piirded usaldusväärsete ja mitte-usaldusväärsete andmeallikate vahel
   - Selge eraldatus takistab juhiste segadust ja volitamata käskude täitmist

4. **Pidev ohuteave**
   - Microsoft jälgib pidevalt uusi rünnakumustreid ja uuendab kaitseid
   - Proaktiivne ohuotsing uute süstimisvõtete ja rünnakuvektorite leidmiseks
   - Regulaarne turvemudelite uuendamine efektiivsuse tagamiseks muutuva ohuolukorra vastu

5. **Azure Content Safety integratsioon**
   - Osa põhjalikust Azure AI Content Safety lahendusest
   - Täiendav tuvastus jailbreak-katsetele, kahjulikule sisule ja turvapoliitikate rikkumistele
   - Ühtsed turbekontrollid üle AI rakenduse komponentide

**Rakendamise ressursid**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/et/prompt-shield.ff5b95be76e9c78c.webp)


## Täiustatud MCP turvaohtud

### Sessiooni kaaperdamise haavatavused

**Sessiooni kaaperdamine** on kriitiline ründevõte olekuhoidlikes MCP rakendustes, kus volitamata isikud saavad kätte ja kuritarvitavad legitiimseid sessiooni identifikaatoreid, et esineda klientidena ja teha volitamata toiminguid.

#### **Rünnaku stsenaariumid ja riskid**

- **Sessiooni kaaperdamise prompti süstimine**: Ründajad varastatud sessiooni ID-dega süstivad pahatahtlikke sündmusi serveritesse, mis jagavad sessiooniseisundit, põhjustades võimalikku kahjulikku tegevust või ligipääsu tundlikele andmetele
- **Otsene esindamine**: Varastatud sessiooni ID-d võimaldavad otsest MCP serveri päringut, mis mööda autentimist, tunnistades ründajaid legitiimseteks kasutajateks
- **Kompromiteeritud jätkusuutlikud vood**: Ründajad võivad päringuid enneaegselt lõpetada, sundides legitiimseid kliente jätkama potentsiaalselt pahatahtliku sisuga

#### **Sessioonihalduse turvakontrollid**

**Kriitilised nõuded:**
- **Volituse kontroll**: MCP serverid, mis teostavad autoriseerimist, PEAVAD kontrollima KÕIKI sissetulevaid päringuid ja EI TOHI tugineda autentimiseks sessioonidele
- **Turvaline sessiooni genereerimine**: Kasutada krüptograafiliselt turvalisi, mittedeterministlikke sessiooni ID-sid turvaliste juhuslike arvugeneraatorite abil
- **Kasutajapõhine sidumine**: Siduda sessiooni ID-d kasutajapõhise infoga vormingus `<user_id>:<session_id>`, et takistada sessiooni kuritarvitamist kasutajate vahel
- **Sessiooni elutsükli haldus**: Rakendada õige aegumine, rotatsioon ja kehtetuks tunnistamine haavatavusakende piiramiseks
- **Andmeside turvalisus**: Kõik suhtlus peab toimuma HTTPS protokolli kaudu, et vältida sessiooni ID-de peatamist

### Segaduses asehalduri probleem

**Segaduses asehalduri probleem** tekib, kui MCP serverid toimivad autentimisproksidena klientide ja kolmandate osapoolte teenuste vahel, luues võimalusi autoriseerimise möödaviimiseks staatiliste kliendi-ID-de ärakasutamise kaudu.

#### **Rünnaku mehhanismid ja riskid**

- **Cookiede-põhine nõusoleku möödaviimine**: Varasem kasutaja autentimine loob nõusolekuküpsised, mida ründajad kuritarvitavad pahatahtlike autoriseerimispäringute ja meisterdatud ümbersuunamise URI-dega
- **Autoriseerimiskoodi vargus**: Olemasolevad nõusolekuküpsised võivad sundida autoriseerimisserverid vahele jätma nõusoleku ekraanid, suunates koodid ründaja kontrollitavatesse lõpp-punktidesse  
- **Volitamata API juurdepääs**: Varastatud autoriseerimiskoodid võimaldavad märgiste vahetust ja kasutaja esindamist ilma otsese heakskiiduta

#### **Leevendusstrateegiad**

**Nõutavad kontrollid:**
- **Selge nõusoleku nõue**: MCP proksiserverid, kes kasutavad staatilisi kliendi-ID-sid, PEAVAD saama kasutajalt nõusoleku iga dünaamiliselt registreeritud kliendi puhul
- **OAuth 2.1 turva-implementatsioon**: Järgida kehtivaid OAuth turvapraktikaid, sealhulgas PKCE (Proof Key for Code Exchange) kõigis autoriseerimispäringutes
- **Range kliendikinnitamise poliitika**: Rakendada jäika ümbersuunamise URI-de ja kliendi identifikaatorite valideerimist ärakasutamise vältimiseks

### Märgise edastamise haavatavused  

**Märgise edastamine** on otsene anti-muster, kus MCP serverid aktsepteerivad kliendimärgiseid ilma nõuetekohase valideerimiseta ja edastavad need edasi alamastme API-dele, rikkudes MCP autoriseerimisnõudeid.

#### **Turvakaalutlused**

- **Järelevalve möödaviimine**: Otsene kliendi ja API vaheline märgise kasutus möödub olulistest piirangutest, valideerimisest ja jälgimisest
- **Auditijälje rikkumine**: Ülemisest tasemest väljastatud märgised muudavad kliendi tuvastamise võimatuks, rikkudes intsidentide uurimisvõimalusi
- **Proksipõhine andmete väljapetmine**: Valideerimata märgised võimaldavad pahatahtlikel isikutel kasutada servereid proksidena volitamata andmetele juurdepääsuks
- **Usalduspiiri rikkumine**: Alamteenuste usaldusselgitusi võidakse rikkuda, kui märgise päritolu ei ole kinnitatud
- **Mitmepartnerluse rünnakute levik**: Kompromiteeritud märgised, mida aktsepteeritakse mitmes teenuses, võimaldavad lateraali rünnakuid

#### **Nõutavad turvakontrollid**

**Läbirääkimisteta nõuded:**
- **Märgise valideerimine**: MCP serverid EI TOHI aktsepteerida märgiseid, mis ei ole otseselt nende jaoks väljastatud
- **Publiku kontroll**: Alati kontrollida, et märgise publikaväite väärtus vastab MCP serveri identiteedile
- **Märgise elutsükli korraldus**: Rakendada lühiajalisi ligipääsumärgiseid koos turvaliste rotatsioonipraktikatega


## Tehisintellekti süsteemide tarneahela turvalisus

Tarneahela turvalisus on arenenud traditsioonilistest tarkvarasõltuvustest kaugemale, hõlmates tervet AI ökosüsteemi. Tänapäeva MCP rakendused peavad rangelt kontrollima ja jälgima kõiki AI-ga seotud komponente, sest igaüks neist võib tuua sisse haavatavusi, mis ohustavad süsteemi terviklikkust.

### Laiendatud AI tarneahela komponendid

**Traditsioonilised tarkvarasõltuvused:**
- Avatud lähtekoodiga raamatukogud ja raamistikud
- Kasti kujutised ja baassüsteemid  
- Arendusvahendid ja ehitusliinid
- Infrastruktuuri komponendid ja teenused

**AI-spetsiifilised tarneahela elemendid:**
- **Vundamendimudelid**: Eeltreenitud mudelid erinevatelt pakkujatelt, mille puhul on vaja päritoludokumentide kontrolli
- **Pisteteenused**: Välised vektori teisendamise ja semantilise otsingu teenused
- **Konteksti pakkujad**: Andmeallikad, teadmistebaasid ja dokumendikogud  
- **Kolmandate osapoolte API-d**: Välised AI teenused, ML töövood ja andmetöötluse lõpp-punktid
- **Mudeli artefaktid**: Kaalud, konfiguratsioonid ja peenhäälestatud mudelivariandid
- **Treeningandmete allikad**: Andmekogud, mida kasutatakse mudelite treenimiseks ja peenhäälestamiseks

### Põhjalik tarneahela turvastrateegia

#### **Komponendi valideerimine ja usaldus**
- **Päritolu kontroll**: Kontrollida kõigi AI komponentide päritolu, litsentsi ja terviklikkust enne integreerimist
- **Turvalisuse hindamine**: Teostada haavatavuse skaneeringuid ja turvakontrolle mudelitele, andmeallikatele ja AI teenustele
- **Maineanalüüs**: Hinnata AI teenusepakkujate turvalisuse ajalugu ja praktikaid
- **Nõuetele vastavuse kontroll**: Tagada, et kõik komponendid vastavad organisatsiooni turva- ja regulatiivnõuetele

#### **Turvalised juurutusliinid**  
- **Automatiseeritud CI/CD turvalisus**: Integreerida turvaskaneerimine automaatsesse juurutusliini
- **Artefaktide terviklikkus**: Rakendada kõigi juurutatud artefaktide (kood, mudelid, konfiguratsioonid) krüptograafilist valideerimist
- **Järgnev juurutus**: Kasutada progressiivseid juurutusstrateegiaid iga etapi turvakontrolliga
- **Usaldusväärsed artefaktide hoidlad**: Juurutada ainult verifitseeritud ja turvalistest hoidlatest

#### **Pidev jälgimine ja reageerimine**
- **Sõltuvuste skaneerimine**: Jätkuv haavatavuste jälgimine tarkvara ja AI komponentide sõltuvuste puhul
- **Mudelite jälgimine**: Pidev mudeli käitumise, jõudluse kõikumise ja turvanormide hindamine
- **Teenuste seisundi jälgimine**: Väliste AI teenuste kättesaadavuse, turvaintsidentide ja poliitikamuudatuste jälgimine
- **Ohuteabe integreerimine**: AI ja masinõppe turvariskidele keskendunud ohuinfo lisamine

#### **Juurdepääsukontroll ja minimaalne eraldis**
- **Komponendi tasandi õigused**: Piirata ligipääsu mudelitele, andmetele ja teenustele ärivajaduse alusel
- **Teenusekonto haldus**: Kasutada spetsiaalseid teenusekontosid minimaalsete vajalike õigustega
- **Võrgusegmentatsioon**: Isolatsiooni rakendamine AI komponentide vahel ja piirata teenuste võrguliiklust
- **API väravate kontrollid**: Keskset kontrolli ja monitooringut kasutada väliste AI teenuste ligipääsu üle

#### **Intsidentidele reageerimine ja taastumine**
- **Kiired reageerimisprotseduurid**: Kehtestatud protsessid kompromiteeritud AI komponentide parandamiseks või asendamiseks
- **Volituste rotatsioon**: Automatiseeritud süsteemid saladuste, API võtmete ja teenusekredentsiaalide uuendamiseks
- **Tagasikerimise võimalused**: Võime kiiresti taastada AI komponentide varasemad teada-töökorras versioonid
- **Tarneahela rikkumise taastamine**: Spetsiifilised protseduurid ülesvoolu AI teenuste kompromiteerimisele reageerimiseks

### Microsofti turvatööriistad ja integratsioon

**GitHub Advanced Security** pakub põhjalikku tarneahela kaitset, sealhulgas:
- **Saladuste skaneerimine**: Automatiseeritud volituste, API võtmete ja märgiste tuvastamine hoidlates
- **Sõltuvuste skaneerimine**: Haavatavuste hindamine avatud lähtekoodiga sõltuvustele ja raamatukogudele
- **CodeQL analüüs**: Staatiline koodi analüüs turvaaukude ja vigade tuvastamiseks
- **Tarneahela ülevaade**: Sõltuvuste tervise ja turvaseisundi nähtavus

**Azure DevOps ja Azure Repos integratsioon:**
- Sujuv turvaskaneeringute integreerimine Microsofti arendusplatvormide vahel
- Automatiseeritud turvakontrollid Azure Pipelines’is AI töövoogude puhul
- Poliitikate rakendamine turvalise AI komponendijuhtimise tagamiseks

**Microsofti sisemised praktikad:**
Microsoft rakendab ulatuslikke tarneahela turvapraktikaid kõigis toodetes. Loe tõestatud lähenemisviisidest [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Vundamendi turvapraktikad

MCP rakendused pärivad ja arendavad teie organisatsiooni olemasolevat turvaseisundit. Vundamendi turvapraktikate tugevdamine suurendab oluliselt AI süsteemide ja MCP juurutuste üldist turvalisust.

### Põhiturvalisuse alustalad

#### **Turvalise arenduse praktikad**
- **OWASP nõuetele vastavus**: Kaitse [OWASP Top 10](https://owasp.org/www-project-top-ten/) veebirakenduste haavatavuste vastu
- **AI-spetsiifilised kaitsed**: Rakendada kontrollimeid [OWASP Top 10 LLM-ide jaoks](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Turvaline saladuste haldus**: Kasutada spetsiaalseid hoidlatesse pandud tokeneid, API võtmeid ja tundlikke konfiguratsiooniandmeid
- **Lõpp-punkti krüptimine**: Rakendada turvalist andmeedastust kõigis rakenduse komponentides ja andmevoogudes
- **Sisendi valideerimine**: Range kõigi kasutajasisendite, API parameetrite ja andmeallikate valideerimine

#### **Infrastruktuuri tugevdamine**
- **Kahefaktoriline autentimine**: Kohustuslik MFA kõigile administraatori- ja teenusekontodele
- **Parandustarkvara haldus**: Automatiseeritud ja õigeaegne operatsioonisüsteemide, raamistikute ja sõltuvuste uuendamine  
- **Identiteedipakkuja integratsioon**: Keskne identiteedihaldus ettevõtte identiteedipakkujate kaudu (Microsoft Entra ID, Active Directory)
- **Võrgu segmenteerimine**: MCP komponentide loogiline isolatsioon lateraalse liikumise piiramiseks
- **Vähemõiguste põhimõte**: Kõigi süsteemikomponentide ja kontode minimaalne vajaminev juurdepääs

#### **Turvamonitooring ja tuvastamine**
- **Põhjalik logimine**: Täielik logimine AI rakenduste tegevustest, sealhulgas MCP kliendi-serveri interaktsioonidest
- **SIEM integratsioon**: Keskne turvateabe ja sündmuste haldus anomaaliate avastamiseks
- **Käitumisanalüütika**: AI-põhine jälgimine süsteemi ja kasutaja käitumise ebatavaliste mustrite tuvastamiseks
- **Ohuteave**: Väliste ohutuvastuste ja kompromiteerimise indikaatorite (IOC) kaasamine
- **Intsidentidele reageerimine**: Hästi määratletud protseduurid turvaintsidentide tuvastamiseks, reageerimiseks ja taastumiseks

#### **Null-usalduse arhitektuur**
- **Ära kunagi usalda, alati kontrolli**: Kasutajate, seadmete ja võrguliideste pidev kontrollimine
- **Mikrosegmenteerimine**: Üksikute töökoormuste ja teenuste täpne võrgukontroll
- **Identiteedikeskne turvalisus**: Turvapoliitikad põhinevad kinnitatud identiteetidel, mitte võrgukoordinaatidel
- **Pidev riskihindamine**: Dünaamiline turvaseisundi hindamine praeguse konteksti ja käitumise alusel
- **Tingimuslik ligipääs**: Ligipääsu kontrollid, mis kohanduvad riskitegurite, asukoha ja seadme usalduse põhjal

### Ettevõtte integratsioonimustrid

#### **Microsofti turvaökosüsteemi integratsioon**
- **Microsoft Defender for Cloud**: Põhjalik pilveturvalisuse seisundi haldus
- **Azure Sentinel**: Pilvepõhine SIEM ja SOAR võimalused AI töökoormuste kaitseks
- **Microsoft Entra ID**: Ettevõtte identiteedi ja ligipääsu haldus tingimusliku ligipääsu poliitikatega
- **Azure Key Vault**: Keskne saladuste haldus riistvaralise turvamehhanismiga (HSM)
- **Microsoft Purview**: Andmejuhtimine ja vastavuse tagamine AI andmeallikatele ja töövoogudele

#### **Vastavus ja haldus**
- **Regulatiivne kooskõla**: Tagada, et MCP rakendused vastavad tööstusharu spetsiifilistele nõuetele (GDPR, HIPAA, SOC 2)
- **Andmete klassifikatsioon**: TÜdiline tundlike andmete kategoriseerimine ja käitlemine AI süsteemides
- **Auditijäljed**: Põhjalik logimine regulatiivseks vastavuseks ja kohtuekspertiisi uuringuteks
- **Privaatsuskontrollid**: Privaatsus-õigustatud disaini põhimõtete rakendamine AI süsteemi arhitektuuris
- **Muudatuste haldus**: Formaalsed protsessid AI süsteemi muudatuste turvauuringuteks

Need vundamendipraktikad loovad tugeva turvapõhja, mis suurendab MCP-spetsiifiliste turvakontrollide tõhusust ja pakub põhjalikku kaitset AI-põhiste rakenduste jaoks.
## Peamised turvalisuse võtmekohad

- **Mitmekihiline turvalisuse lähenemine**: kombineeri põhiturbe tavad (turvaline kodeerimine, minimaalne ligipääs, tarneahela kontroll, pidev järelevalve) AI-spetsiifiliste kontrollidega, et tagada kõikehõlmav kaitse

- **AI-spetsiifiline ohumaastik**: MCP süsteemid seisavad silmitsi ainulaadsete riskidega nagu promptide süstimine, tööriistade mürgitamine, sessiooni ülevõtmine, segaduses volitatud isiku probleemid, tokenite edastamise haavatavused ja liigne õiguste määramine, mis nõuavad spetsialiseeritud leevendusi

- **Autentimise ja autoriseerimise tipptase**: rakenda tugevat autentimist väliste identiteedipakkujate (Microsoft Entra ID) abil, kehtesta õige tokeni valideerimine ning ära kunagi aktsepteeri tokeneid, mis ei ole otseselt välja antud sinu MCP serveri jaoks

- **AI rünnakute ennetamine**: kasuta Microsoft Prompt Shieldsi ja Azure Content Safetyd kaudsete promptide süstimise ja tööriistade mürgitamise rünnakute vastu kaitsmiseks, valideeri tööriistade metaandmeid ja jälgi dünaamilisi muutusi

- **Sessiooni ja transporditurve**: kasuta krüptograafiliselt turvalisi, mitte-määratletud sessiooni ID-sid, mis on seotud kasutaja identiteediga, rakenda õiget sessioonitsükli haldust ning ära kasuta sessioone autentimiseks

- **OAuth turvalisuse parimad tavad**: ennetada segaduses volitatud isiku rünnakuid, nõudes kasutaja selgesõnalist nõusolekut dünaamiliselt registreeritud klientide puhul, rakendades korralikult OAuth 2.1 koos PKCE-ga ning ranget ümbersuunamise URI valideerimist

- **Tokeni turvapõhimõtted**: väldi tokeni edastamise anti-pattern’e, valideeri tokeni audientsi väiteid, rakenda lühiajalisi tokeneid turvalise rotatsiooniga ning hoia selget usalduspiiri

- **Kõikehõlmav tarneahela turvalisus**: käsitle kõiki AI ökosüsteemi komponente (mudelid, embedding’id, konteksti pakkujad, välised API-d) sama ranguse turbenõudena nagu traditsioonilisi tarkvara sõltuvusi

- **Jätkuv areng**: hoia end kursis kiiresti arenevate MCP spetsifikatsioonidega, panusta turvakogukonna standarditesse ning säilita kohanemisvõimeline turvapoliitika protokolli küpsemisel

- **Microsofti turvalisuse integreerimine**: kasuta Microsofti kõikehõlmavat turbeökosüsteemi (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) MCP juurutamise kaitseks

## Kõikehõlmavad ressursid

### **Ametlik MCP turbedokumentatsioon**
- [MCP spetsifikatsioon (Praegu: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP turvalisuse parimad tavad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autoriseerimise spetsifikatsioon](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub hoidla](https://github.com/modelcontextprotocol)

### **OWASP MCP turberessursid**
- [OWASP MCP Azure turbe juhend](https://microsoft.github.io/mcp-azure-security-guide/) - põhjalik OWASP MCP Top 10 koos Azure rakendusjuhistega
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - ametlikud OWASP MCP turberiskid
- [MCP turbesummiti töötuba (Sherpa)](https://azure-samples.github.io/sherpa/) - praktiline MCP turbetreening Azure platvormil

### **Turbestandardid ja parimad tavad**
- [OAuth 2.0 turvalisuse parimad tavad (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 veebirakenduste turvalisus](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 suurte keelemudelite jaoks](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft digitaalõhu kaitse aruanne](https://aka.ms/mddr)

### **AI turbeuuringud ja analüüs**
- [Promptide süstimine MCP-s (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tööriistade mürgitamise rünnakud (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP turbeuuringu ülevaade (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsofti turbelahendused**
- [Microsoft Prompt Shieldsi dokumentatsioon](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety teenus](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID turvalisus](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure tokenite haldamise parimad tavad](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Juurutamise juhendid ja õppetunnid**
- [Azure API Management kui MCP autentimislüüsi](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentimine MCP serveritega](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Turvaline tokeni salvestus ja krüptimine (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ja tarneahela turvalisus**
- [Azure DevOps turvalisus](https://azure.microsoft.com/products/devops)
- [Azure Repos turvalisus](https://azure.microsoft.com/products/devops/repos/)
- [Microsofti tarkvara tarneahela turvalisuse teekond](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Täiendav turbedokumentatsioon**

Põhjalikuks turbejuhiseks vaata neid spetsiaalseid dokumente selles jaotises:

- **[MCP turvalisuse parimad tavad 2025](./mcp-security-best-practices-2025.md)** - täielik MCP turvalisuse parimate tavade kogumik
- **[Azure Content Safety juurutamine](./azure-content-safety-implementation.md)** - praktilised näited Azure Content Safety integreerimiseks
- **[MCP turbekontrollid 2025](./mcp-security-controls-2025.md)** - uusimad turbekontrollid ja meetodid MCP juurutamiseks
- **[MCP parimate tavade kiire viide](./mcp-best-practices.md)** - kiire ülevaate juhend olulistele MCP turvalisuse tavadele

### **Praktilised turbetreeningud**

- **[MCP turbesummiti töötuba (Sherpa)](https://azure-samples.github.io/sherpa/)** - põhjalik praktiline töötuba MCP serverite turvamiseks Azure keskkonnas, alustades baaskursusest kuni tippkohtumiseni
- **[OWASP MCP Azure turbe juhend](https://microsoft.github.io/mcp-azure-security-guide/)** - viitearhitektuur ja rakendusjuhised kõigi OWASP MCP Top 10 riskide jaoks

---

## Mis tuleb edasi

Järgmine: [3. peatükk: Alustamine](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud AI tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi me püüame täpsust, palun arvestage, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise info puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tingitud arusaamatuste ega valesti tõlgendamise eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->