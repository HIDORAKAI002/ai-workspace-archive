# MCP Security: Celovita zaščita za AI sisteme

[![MCP Security Best Practices](../../../translated_images/sl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na zgornjo sliko za ogled videa te lekcije)_

Varnost je temeljni element oblikovanja AI sistemov, zato ji namenjamo posebno pozornost kot naš drugi sklop. To sovpada z Microsoftovim načelom **Secure by Design** iz [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) prinaša močne nove zmogljivosti za aplikacije, ki jih poganja AI, hkrati pa uvaja edinstvene varnostne izzive, ki presegajo tradicionalna tveganja programske opreme. MCP sistemi se soočajo tako z uveljavljenimi varnostnimi vprašanji (varno kodiranje, najmanjše privilegije, varnost oskrbovalnih verig) kot z novimi grožnjami, specifičnimi za AI, vključno z injekcijo pozivov, zastrupitvijo orodij, prevzemanjem sej, napadi "confused deputy", ranljivostmi pri prenosu žetonov in dinamično spremembo zmogljivosti.

Ta lekcija raziskuje najpomembnejša varnostna tveganja v implementacijah MCP—vključno z avtentikacijo, avtoritacijo, prekomernimi dovoljenji, posredno injekcijo pozivov, varnostjo sej, težavami confused deputy, upravljanjem žetonov ter ranljivostmi v oskrbovalni verigi. Naučili se boste izvedljivih kontrol in najboljših praks za zmanjšanje teh tveganj ob uporabi Microsoftovih rešitev, kot so Prompt Shields, Azure Content Safety ter GitHub Advanced Security, ki krepijo vašo MCP namestitev.

## Cilji učenja

Na koncu te lekcije boste sposobni:

- **Prepoznati grožnje specifične za MCP**: Razumeti edinstvena varnostna tveganja v MCP sistemih, vključno z injekcijo pozivov, zastrupitvijo orodij, prekomernimi dovoljenji, prevzemanjem sej, težavami confused deputy, ranljivostmi pri prenosu žetonov in tveganji v oskrbovalni verigi
- **Uporabiti varnostne kontrole**: Uvesti učinkovite ukrepe, vključno z zanesljivo avtentikacijo, dostopom po načelu najmanjših privilegijev, varnim upravljanjem žetonov, kontrolami varnosti sej in preverjanjem oskrbovalne verige
- **Izkoristiti Microsoftove varnostne rešitve**: Razumeti in uporabljati Microsoft Prompt Shields, Azure Content Safety in GitHub Advanced Security za zaščito delovnih obremenitev MCP
- **Preveriti varnost orodij**: Prepoznati pomen validacije metapodatkov orodij, spremljanja dinamičnih sprememb in obrambe pred posredno injekcijo pozivov
- **Integrirati najboljše prakse**: Združiti uveljavljene varnostne temelje (varno kodiranje, utrjevanje strežnikov, zero trust) s specifičnimi kontrolami MCP za celovito zaščito

# MCP varnostna arhitektura in kontrole

Sodobne implementacije MCP zahtevajo večplastne varnostne pristope, ki naslavljajo tako tradicionalno varnost programske opreme kot grožnje, specifične za AI. Hitro razvijajoča se specifikacija MCP še naprej izboljšuje svoje varnostne kontrole, omogočajoč boljšo integracijo z arhitekturami varnosti v podjetjih in uveljavljenimi najboljšimi praksami.

Raziskave iz [Microsoft Digital Defense Report](https://aka.ms/mddr) kažejo, da **bi 98 % prijavljenih varnostnih vdorov preprečila dobra varnostna higiena**. Najbolj učinkovit varnostni pristop združuje temeljne varnostne prakse z MCP-specifičnimi kontrolami—preizkušeni osnovni varnostni ukrepi ostajajo najbolj vplivni za zmanjšanje skupnega varnostnega tveganja.

## Trenutno stanje varnosti

> **Opomba:** Ti podatki odražajo varnostne standarde MCP stanja na **5. februar 2026**, usklajene s **specifikacijo MCP 2025-11-25**. Protokol MCP se hitro razvija, prihodnje implementacije pa lahko uvedejo nove vzorce avtentikacije in izboljšane kontrole. Vedno preverjajte aktualno [specifikacijo MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitorij](https://github.com/modelcontextprotocol) in [dokumentacijo najboljših varnostnih praks](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovejša priporočila.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Za **praktično varnostno usposabljanje** toplo priporočamo **MCP Security Summit Workshop** (Sherpa) - celovito vodeno odpravo do varnosti MCP strežnikov v Microsoft Azure.

### Pregled delavnice

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) ponuja praktično, izvedljivo varnostno usposabljanje po preizkušeni metodologiji "ranljivost → izkoriščanje → popravilo → validacija". Naučili se boste:

- **Učiti se s povzročanjem napak**: Izkusiti ranljivosti z uporabo namerno nezavarovanih strežnikov
- **Uporabljati varnost Azure**: Izkoristiti Azure Entra ID, Key Vault, API Management in AI Content Safety
- **Uporabljati obrambno večplastno strategijo**: Napredovati skozi faze z gradnjo celovitih varnostnih slojev
- **Uporabljati OWASP standarde**: Vsaka tehnika je usklajena z [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Pridobiti produkcijsko kodo**: Oditi z delujočimi, testiranimi implementacijami

### Pot odpravljenja

| Tabor | Osredotočenost | Kritična OWASP tveganja |
|-------|----------------|-------------------------|
| **Osnovni tabor** | Temelji MCP in ranljivosti avtentikacije | MCP01, MCP07 |
| **Tabor 1: Identiteta** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tabor 2: Prehod** | API Management, zasebni endpoints, upravljanje | MCP02, MCP07, MCP09 |
| **Tabor 3: V/I varnost** | Injekcija pozivov, zaščita PII, vsebinska varnost | MCP03, MCP05, MCP06 |
| **Tabor 4: Nadzor** | Log Analytics, nadzorne plošče, zaznavanje groženj | MCP08 |
| **Vrhunec** | Integracijski test rdeče in modre skupine | Vse |

**Začnite**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 varnostnih tveganj

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) opredeljuje deset najpomembnejših varnostnih tveganj za implementacije MCP:

| Tveganje | Opis | Azure ustrezni ukrepi |
|----------|-------|-----------------------|
| **MCP01** | Nepravilno upravljanje žetonov in izpostavitev skrivnosti | Azure Key Vault, Managed Identity |
| **MCP02** | Povišanje privilegijev z razširitvijo obsega | RBAC, pogojni dostop |
| **MCP03** | Zastrupitev orodij | Validacija orodij, preverjanje integritete |
| **MCP04** | Napadi v oskrbovalni verigi | GitHub Advanced Security, skeniranje odvisnosti |
| **MCP05** | Injekcija in izvršitev ukazov | Validacija vhodnih podatkov, peskovnik okolje |
| **MCP06** | Injekcija pozivov prek kontekstualnih podatkov | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nezadostna avtentikacija in avtorizacija | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Pomanjkanje revidiranja in telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Senci MCP strežniki | Vodstvo z API Center, omrežna izolacija |
| **MCP10** | Injekcija konteksta in prekomerno deljenje | Klasifikacija podatkov, minimalna izpostavljenost |

### Razvoj avtentikacije MCP

Specifikacija MCP se je znatno razvila pri pristopih k avtentikaciji in avtorizaciji:

- **Izvirni pristop**: Zgodnje specifikacije so zahtevale, da razvijalci implementirajo strežnike za avtentikacijo po meri, MCP strežniki pa so delovali kot avtoritativni strežniki OAuth 2.0, ki so neposredno upravljali avtentikacijo uporabnikov
- **Trenutni standard (2025-11-25)**: Posodobljena specifikacija dovoljuje MCP strežnikom, da delegirajo avtentikacijo zunanjim ponudnikom identitete (npr. Microsoft Entra ID), kar izboljša varnost in zmanjša kompleksnost izvedbe
- **Varnost transportnega sloja**: Izboljšana podpora za varne transportne mehanizme z ustreznimi vzorci avtentikacije za lokalne (STDIO) in oddaljene (Streamable HTTP) povezave

## Varnost avtentikacije in avtorizacije

### Trenutni varnostni izzivi

Sodobne implementacije MCP se soočajo z več izzivi na področju avtentikacije in avtorizacije:

### Tveganja in način napadov

- **Napačno konfigurirana avtorizacijska logika**: Napačna implementacija avtorizacije v MCP strežnikih lahko razkrije občutljive podatke in nepravilno uveljavi dostopne kontrole
- **Kompromitacija OAuth žetona**: Kraja žetona na lokalnem MCP strežniku omogoča napadalcem lažno predstavljanje strežnikov in dostop do odjemalskih storitev
- **Ranljivosti prenosa žetonov**: Neprimerna obravnava žetonov pomeni zaobidenje varnostnih kontrol in težave pri sledljivosti
- **Prekomerna dovoljenja**: MCP strežniki z nepotrebno visokimi privilegiji kršijo načelo najmanjših privilegijev ter povečajo površino za napade

#### Prenos žetonov: Kritičen nepriporočen vzorec

**Prenos žetonov je v trenutni MCP specifikaciji avtorizacije izrecno prepovedan** zaradi hudih varnostnih posledic:

##### Zaobidenje varnostnih kontrol  
- MCP strežniki in odjemalski API-ji izvajajo bistvene varnostne kontrole (omejevanje hitrosti, validacija zahtev, spremljanje prometa), ki so odvisne od pravilne validacije žetonov  
- Neposredno uporabo žetonov med odjemalcem in API-jem zaobide te zaščite, s čimer oslabi varnostno arhitekturo  

##### Težave z odgovornostjo in revizijo  
- MCP strežniki ne morejo razlikovati uporabnikov, ki uporabljajo žetone, izdane od zunaj, kar prekine revizijske sledi  
- Dnevniki strežnikov nižjih slojev prikazujejo zavajajoče izvore zahtev namesto dejanskih posrednikov MCP strežnika  
- Preiskave incidentov in revizije skladnosti postanejo znatno težje  

##### Tveganja izlitja podatkov  
- Nevalidirani zahtevki žetonov omogočajo zlonamernim subjektom z ukradenimi žetoni uporabo MCP strežnikov kot posrednikov za iznos podatkov  
- Kršitve zaupnostnih mej dovoljujejo nepooblaščenim vzorcem dostopov, ki zaobidejo načrtovane varnostne kontrole  

##### Večstorinski napadalni vektorji  
- Sprejeti ogroženi žetoni, ki jih sprejemajo številne storitve, omogočajo lateralni premik med povezanimi sistemi  
- Predpostavke zaupanja med storitvami lahko kršijo, kadar izvora žetonov ni mogoče preveriti  

### Varnostne kontrole in ublažitve

**Ključne varnostne zahteve:**

> **OBVEZNO**: MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani za ta MCP strežnik

#### Kontrole avtentikacije in avtorizacije

- **Natančen pregled avtorizacije:** Izvedite temeljite revizije avtorizacijske logike MCP strežnikov, da zagotovite, da lahko občutljive vire dostopajo le predvideni uporabniki in odjemalci
  - **Vodnik za izvedbo**: [Azure API Management kot avtentikacijski prehod za MCP strežnike](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracija identitete**: [Uporaba Microsoft Entra ID za avtentikacijo MCP strežnikov](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Varnostno upravljanje žetonov:** Uporabite [Microsoftove prakse validacije žetonov in življenjskega cikla](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Preverite, da so zahtevki občinstva žetona usklajeni z identiteto MCP strežnika
  - Uvedite pravilne politike rotacije in poteka žetonov
  - Preprečite ponovne napade in nepooblaščeno uporabo žetonov

- **Zaščitena shramba žetonov:** Varnostno shranjujte žetone s šifriranjem tako na počivališču kot v prenosu
  - **Najboljše prakse:** [Smernice za varno shranjevanje in šifriranje žetonov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Izvedba kontrole dostopa

- **Načelo najmanjših privilegijev:** MCP strežnikom dodeljujte le minimalne potrebne privilegije za predvideno funkcionalnost
  - Redni pregledi in posodobitve dovoljenj za preprečevanje povišanja privilegijev
  - **Microsoftova dokumentacija:** [Varno upravljanje dostopa z najmanjšimi privilegiji](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Nadzor dostopa na podlagi vlog (RBAC):** Implementirajte natančna dodeljevanja vlog
  - Zaostrite razpone vlog na specifične vire in dejanja
  - Izogibajte se širokim ali nepotrebnim dovoljenjem, ki povečujejo površino napadov

- **Neprestano spremljanje dovoljenj:** Uvedite neprekinjeno revizijo in nadzor dostopa
  - Spremljajte vzorce uporabe dovoljenj za anomalije
  - Takoj odpravite prekomerne ali neuporabljene privilegije

## Grožnje specifične za AI

### Napadi injekcije pozivov in manipulacije orodij

Sodobne implementacije MCP se soočajo z naprednimi, AI-specifičnimi vektorji napadov, ki jih tradicionalne varnostne metode ne zaznajo v celoti:

#### **Posredna injekcija pozivov (Cross-Domain Prompt Injection)**

**Posredna injekcija pozivov** je ena najpomembnejših ranljivosti v AI sistemih z omogočenim MCP. Napadalci v zunanje vsebine—dokumente, spletne strani, e-poštna sporočila ali podatkovne vire—vključijo zlonamerna navodila, ki jih AI sistemi nato obravnavajo kot legitimne ukaze.

**Scenariji napadov:**
- **Injekcija na osnovi dokumentov:** Zlonamerna navodila, skrita v procesiranih dokumentih, ki sprožijo nezaželeno AI dejanje
- **Izraba spletnih vsebin:** Okvarjene spletne strani z vgrajenimi pozivi, ki manipulirajo vedenje AI ob strganju vsebine
- **Napadi prek e-pošte:** Zlonamerni pozivi v elektronskih sporočilih, ki povzročijo, da AI asistenti razkrivajo informacije ali izvajajo nepooblaščene ukrepe
- **Kontaminacija podatkovnih virov:** Okvarjene baze podatkov ali API-ji, ki AI sistemom služijo onesnaženo vsebino

**Praktični vpliv:** Ti napadi lahko povzročijo iznos podatkov, kršitve zasebnosti, generiranje škodljive vsebine ter manipulacijo uporabniških interakcij. Za podrobno analizo glejte [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/sl/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi zastrupitve orodij**

**Zastrupitev orodij** cilja na metapodatke, ki definirajo MCP orodja, in uporablja, kako LLM modeli interpretirajo opise in parametre orodij za odločanje o izvršitvah.

**Mehanizmi napada:**
- **Manipulacija metapodatkov:** Napadalci injicirajo zlonamerna navodila v opise orodij, definicije parametrov ali primere uporabe
- **Nevidna navodila:** Skriti pozivi v metapodatkih orodij, ki jih AI modeli obravnavajo, a jih človeški uporabniki ne vidijo
- **Dinamične spremembe orodij ("Rug Pulls")**: Orodja, ki jih uporabniki odobrijo, se kasneje spremenijo, da izvajajo zlonamerna dejanja, brez njihove vednosti
- **Injekcija parametrov:** Zlonamerna vsebina v shemah parametrov orodja, ki vplivajo na obnašanje modela

**Tveganja gostovanih strežnikov:** Oddaljeni MCP strežniki imajo povečana tveganja, saj se definicije orodij lahko posodobijo po prvotni uporabniški odobritvi, kar ustvarja scenarije, kjer prej varna orodja postanejo zlonamerna. Za celovito analizo glejte [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/sl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni AI napadalni vektorji**

- **Cross-Domain Prompt Injection (XPIA):** Napredni napadi, ki izkoriščajo vsebino iz več domen za zaobidenje varnostnih kontrol
- **Dinamična sprememba zmogljivosti**: Spremembe zmogljivosti orodij v realnem času, ki uidejo začetnim varnostnim ocenam
- **Zastrupljanje konteksta**: Napadi, ki manipulirajo velike kontekstne okvire za skrivanje škodljivih navodil
- **Napadi z zmedo modela**: Izkoriščanje omejitev modela za ustvarjanje nepredvidljivih ali nesigurnih vedenj


### Vpliv tveganja za varnost AI

**Posledice z velikim vplivom:**
- **Ekstrakcija podatkov**: Neavtoriziran dostop in kraja občutljivih podatkov podjetij ali osebnih podatkov
- **Kršitve zasebnosti**: Razkritje osebno prepoznavnih informacij (PII) in zaupnih poslovnih podatkov  
- **Manipulacija sistemov**: Nenamerne spremembe kritičnih sistemov in delovnih tokov
- **Kraja poverilnic**: Kompromitacija avtentikacijskih žetonov in prijavnih podatkov storitev
- **Bočno gibanje**: Uporaba kompromitiranih AI sistemov kot izhodišč za širše omrežne napade

### Microsoft AI varnostne rešitve

#### **Ščiti AI pozivov: Napredna zaščita pred injekcijskimi napadi**

Microsoft **AI Prompt Shields** zagotavljajo celovito obrambo pred neposrednimi in posrednimi injekcijskimi napadi preko več varnostnih plasti:

##### **Osnovni zaščitni mehanizmi:**

1. **Napredno zaznavanje in filtriranje**
   - Algoritmi strojnega učenja in tehnike obdelave naravnega jezika zaznavajo škodljiva navodila v zunanjih vsebinah
   - Analiza dokumentov, spletnih strani, e-pošt in podatkovnih virov v realnem času za skrite grožnje
   - Kontekstualno razumevanje legitimnih proti škodljivim vzorcem pozivov

2. **Tehnike osvetljevanja**  
   - Loči zaupanja vredna sistemska navodila od potencialno kompromitiranih zunanjih vhodov
   - Metode transformacije besedila, ki izboljšajo relevantnost modela, hkrati pa izolirajo škodljivo vsebino
   - Pomaga AI sistemom vzdrževati pravilno hierarhijo navodil in ignorirati vcepljene ukaze

3. **Sistemi za omejevalnike in označevanje podatkov**
   - Izrecna definicija meja med zaupanja vrednimi sistemskimi sporočili in zunanjim vhodnim besedilom
   - Posebni označevalci poudarjajo meja med zaupanja vrednimi in nezaupanja vrednimi podatkovnimi viri
   - Jasna ločitev preprečuje zmedo navodil in nepooblaščen izvršitev ukazov

4. **Neprekinjeno obveščanje o grožnjah**
   - Microsoft neprestano spremlja nove vzorce napadov in posodablja obrambe
   - Proaktivno lovljenje groženj za nove tehnike injekcij in napadalne vektorje
   - Redne posodobitve varnostnih modelov za ohranjanje učinkovitosti proti spreminjajočim se grožnjam

5. **Integracija varnosti vsebin Azure**
   - Del celovitega kompleta Azure AI Content Safety
   - Dodatno zaznavanje poizkusov "jailbreak", škodljive vsebine in kršitev varnostnih politik
   - Enotne varnostne kontrole skozi vse komponente AI aplikacij

**Viri za izvedbo**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/sl/prompt-shield.ff5b95be76e9c78c.webp)


## Napredne grožnje varnosti MCP

### Ranljivosti prevzema seje

**Prevzem seje** predstavlja kritičen napadni vektor v implementacijah MCP s stanjem, kjer nepooblaščene osebe pridobijo in zlorabljajo legitimne identifikatorje sej za prevzem strank in izvajanje nepooblaščenih dejanj.

#### **Scenariji napadov in tveganja**

- **Injekcija poziva pri prevzemu seje**: Napadalci s ukradenimi ID-ji sej vnašajo škodljive dogodke v strežnike, ki delijo stanje sej, kar lahko sproži škodljiva dejanja ali dostop do občutljivih podatkov
- **Neposredna imitacija**: Ukradeni ID-ji sej omogočajo neposredne klice MCP strežniku, ki obidejo avtentikacijo, obravnavajoč napadalce kot legitimne uporabnike
- **Kompromitirani nadaljevalni tokovi**: Napadalci lahko predčasno prekinejo zahteve, kar povzroči, da legitimni odjemalci nadaljujejo z morebitno škodljivo vsebino

#### **Varnostne kontrole za upravljanje sej**

**Kritične zahteve:**
- **Preverjanje avtorizacije**: MCP strežniki, ki izvajajo avtorizacijo, **MORAO** preveriti VSE dohodne zahteve in **NE SMEJO** zanašati na seje za avtentikacijo
- **Varnostno generiranje sej**: Uporabljajte kriptografsko varne, nedeterministične ID-je sej, ustvarjene z varnimi generatorji naključnih števil
- **Povezava z uporabnikom**: Povežite ID-je sej z informacijami o uporabniku z uporabo formatov, kot je `<user_id>:<session_id>`, da preprečite zlorabo sej med uporabniki
- **Upravljanje življenjskega cikla seje**: Izvedite pravilno potekanje, rotacijo in neveljavnost za omejitev ranljivosti
- **Varnost prenosa**: Obvezna uporaba HTTPS za vso komunikacijo, da se prepreči prestrezanje ID-jev sej

### Problem zmedene stranke (Confused Deputy)

**Problem zmedene stranke** nastopi, ko MCP strežniki delujejo kot avtentikacijski posredniki med strankami in storitvami tretjih oseb, kar omogoča možnosti za zaobidenje avtorizacije preko izrabe statičnih ID-jev strank.

#### **Mehanika napada in tveganja**

- **Obhod soglasja z uporabo piškotkov**: Prejšnja uporabniška avtentikacija ustvari piškotke soglasja, ki jih napadalci izrabljajo z zlonamernimi avtorizacijskimi zahtevami z izdelanimi URI-ji preusmeritev
- **Kraja avtorizacijskih kod**: Obstoječi piškotki soglasja lahko povzročijo, da avtorizacijski strežniki preskočijo zaslone soglasja in kode preusmerijo na napadalčeve končne točke  
- **Neavtoriziran dostop do API-jev**: Ukradene avtorizacijske kode omogočajo izmenjavo žetonov in prevzem uporabnikov brez izrecnega dovoljenja

#### **Strategije ublažitve**

**Obvezne kontrole:**
- **Izrecna zahteva po soglasju**: MCP proxy strežniki, ki uporabljajo statične ID-je strank, **MOROJO** pridobiti soglasje uporabnika za vsako dinamično registrirano stranko
- **Varnostna implementacija OAuth 2.1**: Upoštevajte trenutne varnostne prakse OAuth vključno s PKCE (Proof Key for Code Exchange) za vse avtorizacijske zahteve
- **Stroga validacija strank**: Izvedite strogo preverjanje URI-jev preusmeritev in identifikatorjev strank za preprečevanje zlorab

### Ranljivosti v prehodu žetonov  

**Prehod žetonov** predstavlja eksplicitni antiprimer, kjer MCP strežniki sprejemajo žetone strank brez ustrezne validacije in jih posredujejo navzdol proti API-jem, kar krši specifikacije avtorizacije MCP.

#### **Varnostne posledice**

- **Obhod nadzora**: Neposredna uporaba žetonov stranke do API-ja obide ključne omejitve hitrosti, validacijo in nadzorne kontrole
- **Pokvarjena revizijska sled**: Žetoni, izdani upstream, onemogočajo prepoznavanje stranke in onemogočajo preiskave incidentov
- **Iztekanje podatkov preko proxyja**: Nevalidirani žetoni omogočajo zlonamernim akterjem uporabo strežnikov kot proxyjev za nepooblaščeno pridobivanje podatkov
- **Kršitve meja zaupanja**: Zgodbe storitev downstream lahko kršijo predpostavke zaupanja, kadar izvora žetona ni mogoče potrditi
- **Širjenje napadov na več storitev**: Sprejeti kompromitirani žetoni na več storitvah omogočajo bočno gibanje

#### **Zahtevane varnostne kontrole**

**Nepogrešljive zahteve:**
- **Validacija žetonov**: MCP strežniki **NE SMEJO** sprejemati žetonov, ki niso izrecno izdani za MCP strežnik
- **Preverjanje občinstva žetona**: Vedno preverite, da zahtevki občinstva žetona ustrezajo identiteti MCP strežnika
- **Upravljanje življenjskega cikla žetonov**: Uvedite kratkoročne dostopne žetone z varnimi praksami rotacije


## Varnost dobavne verige za AI sisteme

Varnost dobavne verige se je razvila onkraj tradicionalnih programski odvisnosti in zajema celoten ekosistem AI. Sodobne implementacije MCP morajo strogo preverjati in nadzorovati vse AI-komponente, saj vsaka prinaša potencialne ranljivosti, ki bi lahko ogrozile integriteto sistema.

### Razširjeni AI sestavni deli dobavne verige

**Tradicionalne programske odvisnosti:**
- Knjižnice in ogrodja odprte kode
- Slike kontejnerjev in osnovni sistemi  
- Orodja za razvoj in pipelines za gradnjo
- Infrastrukturne komponente in storitve

**Elementi dobavne verige specifični za AI:**
- **Temeljni modeli**: Vnaprej naučeni modeli različnih ponudnikov, ki zahtevajo preverjanje izvora
- **Storitev vgradnje (embedding)**: Zunanje storitve vektorizacije in semantičnega iskanja
- **Ponujači konteksta**: Viri podatkov, baze znanja in skladišča dokumentov  
- **API-ji tretjih oseb**: Zunanje AI storitve, ML pipelines in točke za obdelavo podatkov
- **Modelni artefakti**: Teže, konfiguracije in fino nastavljene različice modelov
- **Viri učnih podatkov**: Nabore podatkov za učenje in fino nastavitev modelov

### Celovita strategija varnosti dobavne verige

#### **Preverjanje in zaupanje komponent**
- **Validacija izvora**: Preverite izvor, licenco in integriteto vseh AI komponent pred integracijo
- **Varnostna ocenitev**: Izvedite skeniranje ranljivosti in varnostne preglede modelov, podatkovnih virov in AI storitev
- **Analiza ugleda**: Ocenite varnostno zgodovino in prakse ponudnikov AI storitev
- **Preverjanje skladnosti**: Zagotovite, da vse komponente izpolnjujejo organizacijske varnostne in regulativne zahteve

#### **Varnost avtomatiziranih pipelines za uvajanje**  
- **Samodejno varnostno skeniranje CI/CD**: Vključite varnostne preglede v celotne avtomatizirane pipeline uvajanja
- **Integriteta artefaktov**: Implementirajte kriptografsko preverjanje vseh uvajanih artefaktov (koda, modeli, konfiguracije)
- **Postopno uvajanje**: Uporabite postopne strategije uvajanja z varnostno validacijo v vsaki fazi
- **Zaupanja vredni artefaktni repozitoriji**: Uvajajte samo iz preverjenih, varnih registrov in repozitorijev artefaktov

#### **Neprekinjeno spremljanje in odziv**
- **Skeniranje odvisnosti**: Neprestano spremljanje ranljivosti vseh programskih in AI komponent
- **Spremljanje modelov**: Neprekinjena ocena obnašanja modelov, drifta zmogljivosti in varnostnih anomalk
- **Sledenje stanju storitev**: Spremljanje zunanjih AI storitev glede razpoložljivosti, varnostnih incidentov in sprememb politik
- **Integracija obveščanja o grožnjah**: Vključevanje virov groženj specifičnih za AI in ML varnostna tveganja

#### **Nadzor dostopa in načelo najmanjših privilegijev**
- **Dovoljenja na nivoju komponent**: Omezite dostop do modelov, podatkov in storitev glede na poslovno potrebo
- **Upravljanje službenih računov**: Vpeljite namenske račune z minimalno zahtevanimi dovoljenji
- **Segmentacija omrežja**: Izolacija AI komponent in omejevanje omrežnega dostopa med storitvami
- **Nadzor API vrat**: Uporabljajte centralizirane API gateway za kontrolo in spremljanje dostopa do zunanjih AI storitev

#### **Odziv na incidente in okrevanje**
- **Hitri odzivni postopki**: Uveljavljeni procesi za popravke ali zamenjavo kompromitiranih AI komponent
- **Rotacija poverilnic**: Samodejni sistemi za rotacijo skrivnosti, API ključev in prijavnih podatkov storitev
- **Možnosti povrnitve**: Zmožnost hitrega vračanja na prej znane dobre verzije AI komponent
- **Okrevanje po vdoru dobavne verige**: Specifični postopki za odziv na kompromitacijo višjih AI storitev

### Microsoft varnostna orodja in integracija

**GitHub Advanced Security** nudi celovito zaščito dobavne verige, vključno z:
- **Skeniranje skrivnosti**: Samodejno zaznavanje poverilnic, API ključev in žetonov v repozitorijih
- **Pregled odvisnosti**: Ocena ranljivosti odprtokodnih odvisnosti in knjižnic
- **CodeQL analiza**: Statična analiza kode za varnostne ranljivosti in težave pri kodiranju
- **Vpogled v dobavno verigo**: Pregled stanja odvisnosti in varnosti

**Integracija Azure DevOps & Azure Repos:**
- Brezhibna integracija varnostnega skeniranja prek Microsoft razvojnih platform
- Samodejni varnostni pregledi v Azure Pipelines za AI delovne obremenitve
- Izvajanje politik za varno uvajanje AI komponent

**Notranje prakse Microsofta:**
Microsoft izvaja obširne varnostne prakse dobavne verige pri vseh izdelkih. Spoznajte dokazane pristope v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najboljše prakse temeljev varnosti

Implementacije MCP dedujejo in gradijo na obstoječem varnostnem položaju vaše organizacije. Krepitev temeljnih varnostnih praks znatno izboljša splošno varnost AI sistemov in uvajanja MCP.

### Temeljna varnostna izhodišča

#### **Varnostne prakse razvoja**
- **Skladnost z OWASP**: Zaščita pred ranljivostmi spletnih aplikacij [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Specifična zaščita za AI**: Uvedba kontrol za [OWASP Top 10 za LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Varno upravljanje skrivnosti**: Uporaba namenski trezorjev za žetone, API ključe in občutljive konfiguracijske podatke
- **Končna do konca šifriranje**: Zagotovite varno komunikacijo skozi vse komponente aplikacije in tokove podatkov
- **Validacija vhodov**: Stroga validacija vseh uporabniških vnosov, API parametrov in podatkovnih virov

#### **Okrepitev infrastrukture**
- **Večfaktorska avtentikacija**: Obvezna MFA za vse administrativne in servisne račune
- **Upravljanje popravil**: Samodejni, pravočasni popravki operacijskih sistemov, ogrodij in odvisnosti  
- **Integracija ponudnikov identitet**: Centralizirano upravljanje identitet prek podjetniških ponudnikov identitete (Microsoft Entra ID, Active Directory)
- **Segmentacija omrežja**: Logična izolacija MCP komponent za omejitev možnosti bočnega gibanja
- **Načelo najmanjših privilegijev**: Najmanjša potrebna dovoljenja za vse sistemske komponente in račune

#### **Spremljanje in zaznavanje varnosti**
- **Celovito beleženje**: Podrobno beleženje aktivnosti AI aplikacij, vključno s komunikacijo MCP odjemalec-strežnik
- **Integracija SIEM**: Centralizirano upravljanje varnostnih informacij in dogodkov za zaznavanje anomalij
- **Analitika vedenja**: AI-podprto spremljanje za odkrivanje nenavadnih vzorcev v vedenju sistema in uporabnikov
- **Obveščanje o grožnjah**: Vključevanje zunanjih virov groženj in indikatorjev kompromitacije (IOC-je)
- **Odziv na incidente**: Dobro definirani postopki za zaznavanje, odziv in obnovo po varnostnih incidentih

#### **Arhitektura ničelnega zaupanja**
- **Nikoli ne zaupaj, vedno preverjaj**: Neprestano preverjanje uporabnikov, naprav in omrežnih povezav
- **Mikrosegmentacija**: Natančni omrežni nadzori, ki izolirajo posamezne delovne obremenitve in storitve
- **Varnost osredotočena na identiteto**: Varnostne politike na podlagi preverjenih identitet namesto lokacije v omrežju
- **Neprestana ocena tveganja**: Dinamična ocena varnostnega položaja glede na trenutni kontekst in vedenje
- **Pogojni dostop**: Nadzor dostopa, ki se prilagaja glede na dejavnike tveganja, lokacijo in zaupanje naprave

### Vzori integracije v podjetjih

#### **Integracija Microsoft varnostnega ekosistema**
- **Microsoft Defender for Cloud**: Celovito upravljanje varnostnega položaja v oblaku
- **Azure Sentinel**: Nativne oblačne zmogljivosti SIEM in SOAR za zaščito AI delovnih obremenitev
- **Microsoft Entra ID**: Upravljanje identitet in dostopa znotraj podjetij s pravilniki pogojnega dostopa
- **Azure Key Vault**: Centralizirano upravljanje skrivnosti z varnostnimi moduli strojne opreme (HSM)
- **Microsoft Purview**: Upravljanje podatkov in skladnost za AI podatkovne vire in delovne tokove

#### **Skladnost in upravljanje**
- **Usklajenost z regulativami**: Zagotovite, da implementacije MCP izpolnjujejo specifične industrijske zahteve (GDPR, HIPAA, SOC 2)
- **Klasifikacija podatkov**: Ustrezno kategoriziranje in upravljanje občutljivih podatkov, ki jih obdelujejo AI sistemi
- **Revizijske sledi**: Celovito beleženje za skladnost in forenzične preiskave
- **Nadzor zasebnosti**: Uvedba načel zasebnosti že v zasnovi AI sistemov
- **Upravljanje sprememb**: Formalni postopki za varnostne preglede sprememb AI sistemov

Te temeljne prakse vzpostavljajo trdno varnostno osnovo, ki izboljšuje učinkovitost varnostnih kontrol specifičnih za MCP in zagotavlja celovito zaščito za AI-podprte aplikacije.
## Ključni varnostni poudarki

- **Večplastni varnostni pristop**: Združite osnovne varnostne prakse (varno kodiranje, najmanjša privilegija, preverjanje dobavne verige, stalno spremljanje) z AI-specifičnimi kontrolami za celovito zaščito

- **AI-specifična ogroženost**: Sistemi MCP se soočajo z edinstvenimi tveganji, kot so injiciranje pozivov, zastrupitev orodij, prevzem sej, problem "zmedenega namestnika", ranljivosti pri prenosu žetonov in prekomerna dovoljenja, ki zahtevajo posebna blaženja

- **Odličnost pri preverjanju pristnosti in avtorizaciji**: Uporabite robustno preverjanje pristnosti z zunanjimi ponudniki identitete (Microsoft Entra ID), izvajajte pravilno validacijo žetonov in nikoli ne sprejemajte žetonov, ki niso izrecno izdani za vaš MCP strežnik

- **Preprečevanje AI napadov**: Uporabite Microsoft Prompt Shields in Azure Content Safety za obrambo pred posrednim injiciranjem pozivov in zastrupitvijo orodij, hkrati preverjajte metapodatke orodij in spremljajte dinamične spremembe

- **Varnost sej in prenosa**: Uporabite kriptografsko varne, nedeterministične ID-je sej, vezane na uporabniške identitete, izvajajte pravilno upravljanje življenjskega cikla sej in nikoli ne uporabite sej za preverjanje pristnosti

- **Najboljše prakse OAuth varnosti**: Preprečite napade "zmedenega namestnika" z izrecnim soglasjem uporabnika za dinamično registrirane odjemalce, pravilno implementacijo OAuth 2.1 z uporabo PKCE ter strogim preverjanjem URI-jev za preusmeritev

- **Načela varnosti žetonov**: Izogibajte se anti-vzorčem prenosa žetonov, validirajte trditve o občinstvu žetonov, uporabljajte kratkotrajne žetone z varnim rotiranjem in vzdržujte jasne meje zaupanja

- **Celovita varnost dobavne verige**: Ravnajte z vsemi komponentami AI ekosistema (modeli, vdelave, ponudniki konteksta, zunanji API-ji) z enako varnostno strogo kot s tradicionalnimi odvisnostmi programske opreme

- **Stalna evolucija**: Bodite na tekočem z hitro razvijajočimi se specifikacijami MCP, prispevajte k varnostnim standardom skupnosti in vzdržujte prilagodljive varnostne drže, ko protokol zori

- **Integracija Microsoft varnosti**: Izkoristite širok varnostni ekosistem Microsofta (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za izboljšano zaščito nameščanja MCP

## Celoviti viri

### **Uradna MCP varnostna dokumentacija**
- [Specifikacija MCP (trenutno: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najboljše varnostne prakse MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Specifikacija avtorizacije MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitorij](https://github.com/modelcontextprotocol)

### **OWASP viri za varnost MCP**
- [OWASP MCP Azure varnostni vodič](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z navodili za implementacijo na Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Uradne OWASP varnostne grožnje za MCP
- [Delavnica MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktično varnostno usposabljanje za MCP na Azure

### **Varnostni standardi in najboljše prakse**
- [Najboljše varnostne prakse OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za spletne aplikacije](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 za velike jezikovne modele](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Raziskave in analize AI varnosti**
- [Injiciranje pozivov v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Napadi zastrupitve orodij (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Poročilo o raziskavah varnosti MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft varnostne rešitve**
- [Dokumentacija Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Storitev Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Varnost Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najboljše prakse upravljanja žetonov Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodiči in tutoriali za implementacijo**
- [Azure API Management kot MCP avtentični prehod](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID preverjanje pristnosti z MCP strežniki](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Varnostno shranjevanje in šifriranje žetonov (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps in varnost dobavne verige**
- [Varnost Azure DevOps](https://azure.microsoft.com/products/devops)
- [Varnost Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftova pot do varne dobavne verige programske opreme](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna varnostna dokumentacija**

Za celovita varnostna navodila si oglejte ta specializirana besedila v tem razdelku:

- **[Najboljše varnostne prakse MCP 2025](./mcp-security-best-practices-2025.md)** - Popolne varnostne prakse za implementacije MCP
- **[Implementacija Azure Content Safety](./azure-content-safety-implementation.md)** - Praktični primeri implementacije integracije Azure Content Safety  
- **[Varnostne kontrole MCP 2025](./mcp-security-controls-2025.md)** - Najnovejše varnostne kontrole in tehnike za nameščanje MCP
- **[Hitri referenčni vodič za najboljše prakse MCP](./mcp-best-practices.md)** - Hiter referenčni vodič za ključne varnostne prakse MCP

### **Praktično varnostno usposabljanje**

- **[Delavnica MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Celovita praktična delavnica za varovanje MCP strežnikov v Azure z naprednimi tabori od osnovnega do vrha
- **[OWASP MCP Azure varnostni vodič](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčna arhitektura in navodila za implementacijo vseh OWASP MCP Top 10 tveganj

---

## Kaj sledi

Naslednje: [Poglavje 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:  
Ta dokument je bil preveden z uporabo storitve umetne inteligence [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas opozarjamo, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvorni jeziku velja kot avtoritativni vir. Za kritične informacije priporočamo strokovni človeški prevod. Za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda, ne prevzemamo odgovornosti.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->