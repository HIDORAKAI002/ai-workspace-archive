# MCP Varnost: Celovita Zaščita za AI Sisteme

[![Najboljše prakse MCP varnosti](../../../translated_images/sl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite zgornjo sliko za ogled videa te lekcije)_

Varnost je temelj oblikovanja AI sistemov, zato ji posvečamo posebno pozornost kot naši drugi sekciji. To se ujema z Microsoftovim načelom **Secure by Design** z iniciative [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol Model Context (MCP) prinaša močne nove zmogljivosti AI-podprtim aplikacijam, hkrati pa uvaja edinstvene varnostne izzive, ki presegajo tradicionalna tveganja programske opreme. MCP sistemi se soočajo tako z uveljavljenimi varnostnimi vprašanji (varno kodiranje, minimalne pravice, varnost dobavne verige) kot z novimi grožnjami, specifičnimi za AI, vključno z injekcijo pozivov, zastrupljanjem orodij, prevzemom sej, napadi z zmedenim zastopnikom, ranljivostmi prehoda žetonov in dinamičnimi spremembami zmogljivosti.

Ta lekcija raziskuje najpomembnejša varnostna tveganja v implementacijah MCP—obravnava avtentikacijo, avtorizacijo, prekomerne pravice, indirektno injekcijo pozivov, varnost sej, težave z zmedenim zastopnikom, upravljanje žetonov in ranljivosti dobavne verige. Naučili se boste izvajati praktične kontrole in najboljše prakse za zmanjšanje teh tveganj z uporabo Microsoftovih rešitev, kot so Prompt Shields, Azure Content Safety in GitHub Advanced Security, za krepitev vaše MCP uvedbe.

## Cilji učenja

Do konca te lekcije boste znali:

- **Prepoznati grožnje, specifične za MCP**: Prepoznati edinstvena varnostna tveganja v MCP sistemih, vključno z injekcijo pozivov, zastrupljanjem orodij, prekomernimi dovoljenji, prevzemom sej, težavami z zmedenim zastopnikom, ranljivostmi prehoda žetonov in tveganji dobavne verige
- **Uporabiti varnostne kontrole**: Izvesti učinkovite blažitve, vključno z robustno avtentikacijo, dostopom z minimalnimi pravicami, varnim upravljanjem žetonov, kontrolami varnosti sej in preverjanjem dobavne verige
- **Izkoristiti Microsoftove varnostne rešitve**: Razumeti in uporabiti Microsoft Prompt Shields, Azure Content Safety in GitHub Advanced Security za zaščito delovnih obremenitev MCP
- **Preveriti varnost orodij**: Prepoznati pomembnost preverjanja metapodatkov orodij, spremljanja dinamičnih sprememb in obrambe pred indirektnimi napadi z injekcijo pozivov
- **Integrirati najboljše prakse**: Kombinirati uveljavljene varnostne temelje (varno kodiranje, utrjevanje strežnikov, zero trust) z MCP-specifičnimi kontrolami za celovito zaščito

# Arhitektura & kontrole varnosti MCP

Sodobne implementacije MCP zahtevajo plastične varnostne pristope, ki obravnavajo tako tradicionalno varnost programske opreme kot tudi grožnje, specifične za AI. Hitro razvijajoča se specifikacija MCP nadalje izpopolnjuje svoje varnostne kontrole, omogočajoč boljšo integracijo z arhitekturami varnosti podjetij in uveljavljenimi najboljšimi praksami.

Raziskave iz [Microsoft Digital Defense Report](https://aka.ms/mddr) kažejo, da bi **98 % prijavljenih vdorov preprečila robustna varnostna higiena**. Najbolj učinkovita zaščitna strategija združuje osnovne varnostne prakse s MCP-specifičnimi kontrolami—dokazane osnovne varnostne ukrepe ostajajo najvplivnejši pri zmanjševanju skupnega varnostnega tveganja.

## Trenutno varnostno stanje

> **Opomba:** Te informacije odražajo MCP varnostne standarde stanja na **5. februar 2026**, usklajene s **specifikacijo MCP 2025-11-25**. Protokol MCP se še vedno hitro razvija, prihodnje implementacije pa lahko uvedejo nove vzorce avtentikacije in izboljšane kontrole. Vedno se sklicujte na aktualno [specifikacijo MCP](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitorij](https://github.com/modelcontextprotocol), in [dokumentacijo najboljših varnostnih praks](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovejša navodila.

> **Pogled v prihodnost:** kandidat izdaje `2026-07-28` dodatno krepi avtorizacijo — od odjemalcev se zahteva, da preverijo parameter `iss` v odgovorih avtorizacije (RFC 9207), med Dinamično registracijo odjemalcev izrecno navedejo `application_type` OpenID Connect, in vežejo registrirane poverilnice na strežnik izdaje avtorizacije. Celoten seznam SEPs avtorizacije si oglejte v [Kaj se spreminja v MCP: kandidat izdaje 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ Delavnica MCP Security Summit (Sherpa)

Za **praktično varnostno usposabljanje** toplo priporočamo **delavnico MCP Security Summit** (Sherpa) - celovito vodeno odpravo za zagotavljanje varnosti MCP strežnikov v Microsoft Azure.

### Pregled delavnice

[Delavnica MCP Security Summit](https://azure-samples.github.io/sherpa/) ponuja praktično, izvedljivo varnostno usposabljanje skozi preizkušeno metodologijo "ranljiv → izkoristi → popravi → potrdi". Naučili se boste:

- **Učiti se z razbijanjem**: Izkusite ranljivosti v praksi z izkoriščanjem namensko negotovih strežnikov
- **Uporabljati Azure-vgrajeno varnost**: Izkoristite Azure Entra ID, Key Vault, API Management in AI Content Safety
- **Slediti obrambi v globino**: Napredujte skozi taborišča, ki gradijo celovite varnostne plasti
- **Uporabljati OWASP standarde**: Vsaka tehnika ustreza [ki se nahaja v OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Pridobiti produkcijsko kodo**: Pridite do delujočih, testiranih implementacij

### Pot odprave

| Tabor | Osredotočanje | Kritične OWASP ranljivosti |
|------|-------------|------------------------------|
| **Osnovni tabor** | Temelji MCP & ranljivosti avtentikacije | MCP01, MCP07 |
| **Tabor 1: Identiteta** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tabor 2: Prehod** | API Management, zasebni končni točki, upravljanje | MCP02, MCP06, MCP07, MCP09 |
| **Tabor 3: Varnost I/O** | Injekcija pozivov, zaščita PII, varnost vsebine | MCP03, MCP05, MCP06, MCP10 |
| **Tabor 4: Nadzor** | Log Analytics, nadzorne plošče, zaznavanje groženj | MCP04, MCP08 |
| **Vzpon na vrh** | Integracijski test Rdeče ekipe / Modre ekipe | Vse |

**Začni tukaj**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Najpomembnejših 10 varnostnih tveganj MCP po OWASP

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) podrobno opisuje deset najpomembnejših varnostnih tveganj za MCP implementacije:

| Tveganje | Opis | Blažitev v Azure |
|---------|-------|------------------|
| **MCP01** | Nepravilno upravljanje žetonov in razkritje skrivnosti | Azure Key Vault, upravljana identiteta |
| **MCP02** | Povišanje privilegijev zaradi razširitve obsega | RBAC, pogojni dostop |
| **MCP03** | Zastrupljanje orodij | Preverjanje orodij, potrjevanje integritete |
| **MCP04** | Napadi na dobavno verigo programske opreme in manipulacije odvisnosti | GitHub Advanced Security, pregled odvisnosti |
| **MCP05** | Injekcija ukazov in izvrševanje | Preverjanje vhodov, peskovnik |
| **MCP06** | Podtikanje namena | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nezadostna avtentikacija in avtorizacija | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Pomanjkanje revizije in telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Senci MCP strežniki | API Center upravljanje, omrežna izolacija |
| **MCP10** | Injekcija konteksta in prekomerno deljenje | Klasifikacija podatkov, minimalna izpostavljenost |

### Razvoj avtentikacije MCP

Specifikacija MCP se je bistveno razvila v pristopu k avtentikaciji in avtorizaciji:

- **Izvirni pristop**: zgodnje specifikacije so zahtevale, da razvijalci implementirajo lastne strežnike za avtentikacijo, pri čemer so MCP strežniki delovali kot OAuth 2.0 strežniki avtorizacije, ki neposredno upravljajo avtentikacijo uporabnikov
- **Trenutni standard (2025-11-25)**: posodobljena specifikacija omogoča MCP strežnikom delegiranje avtentikacije zunanjim ponudnikom identitete (kot je Microsoft Entra ID), s čimer izboljšuje varnostni položaj in zmanjšuje kompleksnost implementacije
- **Varnost prenosa podatkov**: izboljšana podpora za varne transportne mehanizme z ustreznimi vzorci avtentikacije tako za lokalne (STDIO) kot oddaljene (Streamable HTTP) povezave

## Varnost avtentikacije in avtorizacije

### Trenutni varnostni izzivi

Sodobne implementacije MCP se soočajo s številnimi izzivi pri avtentikaciji in avtorizaciji:

### Tveganja in vektorji groženj

- **Nepravilna logika avtorizacije**: napačna izvedba avtorizacije v MCP strežnikih lahko razkrije občutljive podatke in nepravilno uporabi kontrole dostopa
- **Odklepanje OAuth žetonov**: kraja tokenov lokalnega MCP strežnika omogoča napadalcem, da se predstavljajo kot strežniki in dostopajo do nihajočih storitev
- **Ranljivosti prehoda žetonov**: nepravilno ravnanje z žetoni ustvarja obhode varnostnih kontrol in vrzeli v odgovornosti
- **Prekomerne pravice**: MCP strežniki z prevelikimi privilegiji kršijo načela minimalnih pravic in povečujejo površino napada

#### Prehod žetonov: kritičen anti-vzorec

**Prehod žetonov je izrecno prepovedan** v trenutni MCP specifikaciji avtorizacije zaradi resnih varnostnih posledic:

##### Obhod varnostnih kontrol
- MCP strežniki in nalog API implementirajo ključne varnostne kontrole (omejevanje hitrosti, validacija zahtev, nadzor prometa), ki temeljijo na pravilni potrditvi žetonov
- Neposredna uporaba žetonov odjemalca do API obide te bistvene zaščite in podre varnostno arhitekturo

##### Izzivi pri odgovornosti in reviziji  
- MCP strežniki ne morejo razlikovati med odjemalci, ki uporabljajo žetone, izdane zgoraj, prek svojega strežnika, kar prelomi revizijske poti
- Dnevniki strežnikov virov navzdol kažejo zavajajoče izvore zahtev namesto dejanskih MCP strežnikov kot posrednikov
- Preiskovanje incidentov in revizija skladnosti postaneta znatno težja

##### Tveganja iztoka podatkov
- Nepreverjeni zahtevki žetonov omogočajo zlonamernim akterjem z ukradenimi žetoni uporabo MCP strežnikov kot proxyjev za iztok podatkov
- Kršitve mej zaupanja dopuščajo nepooblaščene vzorce dostopa, ki obidejo namenjene varnostne kontrole

##### Večstoritveni napadi
- Sprejeti ogroženi žetoni v več storitvah omogočajo lateralno gibanje med povezanimi sistemi
- Zaupanja med storitvami lahko kršijo, če izvori žetonov niso preverljivi

### Varnostne kontrole in blažitve

**Ključne varnostne zahteve:**

> **OBVEZNO**: MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani za MCP strežnik

#### Kontrole avtentikacije in avtorizacije

- **Temeljit pregled avtorizacije**: Izvedite obsežne revizije logike avtorizacije MCP strežnikov, da zagotovite dostop do občutljivih virov le za namenjene uporabnike in odjemalce
  - **Vodnik za implementacijo**: [Azure API Management kot avtentikacijski prehod za MCP strežnike](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracija identitete**: [Uporaba Microsoft Entra ID za avtentikacijo MCP strežnikov](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Varno upravljanje žetonov**: Implementirajte [Microsoftove prakse preverjanja in življenjskega cikla žetonov](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Preverite, da trditve občinstva žetona ustrezajo identiteti MCP strežnika
  - Uvedite pravilne politike rotacije in poteka žetonov
  - Preprečite ponovne napade z žetoni in nepooblaščeno uporabo

- **Zaščiteno shranjevanje žetonov**: Zagotovite varno shranjevanje žetonov z enkripcijo v mirovanju in med prenosom
  - **Najboljše prakse**: [Vodnik za varno shranjevanje in šifriranje žetonov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Izvedba kontrole dostopa

- **Načelo minimalnih privilegijev**: MCP strežnikom dajte le minimalne dovoljenosti, potrebne za predvideno funkcionalnost
  - Redni pregledi in posodobitve dovoljenj za preprečevanje razširitve privilegijev
  - **Microsoftova dokumentacija**: [Varno upravljanje minimalnih privilegijev](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Nadzor dostopa na osnovi vlog (RBAC)**: Implementirajte natančne dodelitve vlog
  - Vloge natančno omejite na specifične vire in dejanja
  - Izogibajte se širokim ali nepotrebnim dovoljenjem, ki povečujejo površino napada

- **Nenehno spremljanje dovoljenj**: Izvajajte trajno revizijo in nadzor dostopa
  - Spremljajte vzorce uporabe dovoljenj za odstopanja
  - Hitro odpravite prekomerne ali neuporabljene privilegije

## Grožnje, specifične za AI

### Napadi z injekcijo pozivov in manipulacijo orodij

Sodobne implementacije MCP so izpostavljene dovršenim AI-specifičnim napadalnim vektorjem, ki jih tradicionalni varnostni ukrepi ne morejo povsem nasloviti:

#### **Indirektna injekcija pozivov (injekcija pozivov čez domene)**

**Indirektna injekcija pozivov** predstavlja eno najpomembnejših ranljivosti v sistemih AI, omogočenih z MCP. Napadalci v zunanje vsebine — dokumente, spletne strani, e-pošto ali podatkovne vire — vstavijo zlonamerna navodila, ki jih AI sistemi nato obdelujejo kot legitimne ukaze.

**Primeri napadov:**
- **Injekcija v dokumentih**: Zlonamerna navodila skrita v obdelanih dokumentih, ki sprožijo neželena AI dejanja
- **Izraba spletnih vsebin**: Okvarjene spletne strani z vgrajenimi pozivi, ki manipulirajo vedenje AI ob strganju
- **Napadi prek e-pošte**: Zlonamerni pozivi v e-poštnih sporočilih, ki povzročijo, da AI asistenti razkrijejo informacije ali izvedejo nepooblaščena dejanja
- **Kontaminacija podatkovnih virov**: Okvarjene baze podatkov ali API-ji, ki AI sistemom zagotavljajo okuženo vsebino

**Učinek v resničnem svetu**: Ti napadi lahko povzročijo iztok podatkov, kršitve zasebnosti, ustvarjanje škodljive vsebine in manipulacijo uporabniških interakcij. Za podrobno analizo glejte [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram napada injekcije pozivov](../../../translated_images/sl/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi z zastrupljanjem orodij**

**Zastrupljanje orodij** cilja na metapodatke, ki opredeljujejo MCP orodja, zlorablja način, kako LLM-ji interpretirajo opise in parametre orodij za sprejemanje odločitev o izvajanju.

**Mehanizmi napadov:**
- **Manipulacija z metapodatki**: Napadalci vnašajo zlonamerna navodila v opise orodij, definicije parametrov ali primere uporabe
- **Nevidna navodila**: Skriti pozivi v metapodatkih orodij, ki jih obdelujejo AI modeli, a so nevidni človeškim uporabnikom
- **Dinamične spremembe orodij ("Rug Pulls")**: Orodja, potrjena s strani uporabnikov, so kasneje spremenjena za izvajanje zlonamernih dejanj brez vednosti uporabnika
- **Injekcija parametrov**: Zlonamerna vsebina v shemah parametrov orodij, ki vplivajo na vedenje modela


**Tveganja gostujočih strežnikov**: Oddaljeni MCP strežniki predstavljajo povečana tveganja, saj se lahko definicije orodij posodobijo po začetnem uporabniškem odobritvi, kar ustvarja scenarije, kjer se prej varna orodja spremenijo v zlonamerna. Za celovito analizo glejte [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram napada z vbrizgavanjem orodij](../../../translated_images/sl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni vektorji AI napadov**

- **Vbrizgavanje pozivov čez domene (XPIA)**: Zapleteni napadi, ki izkoriščajo vsebino iz več domen za obhod varnostnih kontrol
- **Dinamične spremembe zmogljivosti**: Spremembe zmogljivosti orodij v realnem času, ki uidejo začetnim varnostnim ocenam
- **Zastrupljanje kontekstnih oken**: Napadi, ki manipulirajo z velikimi kontekstnimi okni za skrivanje zlonamernih navodil
- **Napadi z zmedo modela**: Izkoriščanje omejitev modela za ustvarjanje nepredvidljivih ali nevarnih vedenj


### Vpliv tveganj za AI varnost

**Posledice velikega vpliva:**
- **Izvleček podatkov**: Nepooblaščen dostop in kraja občutljivih podatkov podjetja ali osebnih podatkov
- **Kršitve zasebnosti**: Razkritje osebno prepoznavnih informacij (PII) in zaupnih poslovnih podatkov  
- **Manipulacija sistema**: Nenamerne spremembe kritičnih sistemov in delovnih tokov
- **Kraja poverilnic**: Kompromitacija avtentikacijskih žetonov in poverilnic storitev
- **Bočno premikanje**: Uporaba kompromitiranih AI sistemov kot odskočnih desk za širše omrežne napade

### Microsoftove rešitve za AI varnost

#### **Ščiti za AI pozive: Napredna zaščita pred napadi z vbrizgavanjem**

Microsoftovi **Ščiti za AI pozive** nudijo celovito obrambo pred neposrednimi in posrednimi napadi z vbrizgavanjem pozivov skozi več varnostnih plasti:

##### **Osnovni zaščitni mehanizmi:**

1. **Napredna zaznava in filtriranje**
   - Algoritmi strojnega učenja in tehnike NLP zaznavajo zlonamerna navodila v zunanji vsebini
   - Analiza dokumentov, spletnih strani, e-pošte in virov podatkov v realnem času za ugotovitev skritih groženj
   - Kontekstualno razumevanje legitimnih proti zlonamernim vzorcem pozivov

2. **Metode osvetlitve**  
   - Ločuje med zaupanja vrednimi sistemskimi navodili in potencialno kompromitiranimi zunanjimi vnosi
   - Metode transformacije besedila, ki izboljšajo relevantnost modela, hkrati pa izolirajo zlonamerno vsebino
   - Pomaga AI sistemom ohranjati pravilen vrstni red navodil in ignorirati vbrizgane ukaze

3. **Sistemi za ločilo in označevanje podatkov**
   - Izrecna opredelitev meja med zaupanja vrednimi sistemskimi sporočili in zunanjim vhodnim besedilom
   - Posebni označevalci poudarjajo meje med zaupanja vrednimi in nezaupanja vrednimi viri podatkov
   - Jasna ločitev preprečuje zmedo navodil in nepooblaščeno izvajanje ukazov

4. **Neprekinjeno zbiranje informacij o grožnjah**
   - Microsoft neprestano spremlja pojavne vzorce napadov in posodablja obrambe
   - Proaktivno iskanje groženj za nove tehnike vbrizgavanja in vektorje napadov
   - Redne posodobitve varnostnih modelov za ohranjanje učinkovitosti proti razvijajočim se grožnjam

5. **Integracija Azure Content Safety**
   - Del celovite zbirke varnostnih rešitev Azure AI Content Safety
   - Dodatna zaznava poskusov jailbreakanja, škodljive vsebine in kršitev varnostnih politik
   - Združene varnostne kontrole prek komponent AI aplikacij

**Viri za implementacijo**: [Dokumentacija Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Zaščita Microsoft Prompt Shields](../../../translated_images/sl/prompt-shield.ff5b95be76e9c78c.webp)


## Napredne varnostne grožnje MCP

### Ranljivosti prevzema seje

**Prevzem seje** predstavlja kritični vektor napada v implementacijah stateful MCP, kjer nepooblaščene strani pridobijo in zlorabijo zakonite identifikatorje sej za poosebljanje odjemalcev in izvajanje nepooblaščenih dejanj.

#### **Scenariji napadov in tveganja**

- **Vbrizgavanje pozivov zaradi prevzema seje**: Napadalci s ukradenimi identifikatorji sej vbrizgavajo zlonamerne dogodke v strežnike, ki delijo stanje seje, kar lahko sproži škodljiva dejanja ali dostop do občutljivih podatkov
- **Neposredna poosebitev**: Ukradeni identifikatorji sej omogočajo neposredne klice MCP strežniku, ki obidejo avtentikacijo in napadalca obravnavajo kot zakonitega uporabnika
- **Kompromitirani prekinljivi tokovi**: Napadalci lahko prezgodaj prekinejo zahteve, kar povzroči, da zakoniti odjemalci nadaljujejo s potencialno zlonamerno vsebino

#### **Varnostne kontrole za upravljanje sej**

**Kritične zahteve:**
- **Preverjanje pristnosti**: MCP strežniki, ki izvajajo avtentikacijo, **MORAJO** preveriti VSE dohodne zahteve in **NE SMEJO** zanašati na seje za avtentikacijo
- **Varnostna generacija sej**: Uporaba kriptografsko varnih, nedeterminističnih ID-jev sej, generiranih z varnimi generatorji naključnih števil
- **Povezava s podatki uporabnika**: Vežite ID-je sej na specifične uporabniške informacije z uporabo formatov, kot je `<user_id>:<session_id>`, da preprečite zlorabe sej med uporabniki
- **Upravljanje življenjskega cikla seje**: Uvedite pravilno poteklo veljavnost, rotacijo in razveljavitev za omejitev ranljivostnih okvirov
- **Transportna varnost**: Obvezno HTTPS za vso komunikacijo za preprečevanje prestrezanja ID-jev sej

### Težava z zmedenim pooblaščencem

Problematika **zmedenega pooblaščenca** nastane, ko MCP strežniki delujejo kot avtentikacijski posredniki med odjemalci in tretjimi storitvami, kar ustvarja priložnosti za zaobidenje avtentikacije preko izkoriščanja statičnih ID-jev odjemalcev.

#### **Mehanika napadov in tveganja**

- **Obhod soglasja na osnovi piškotkov**: Prejšnja avtentikacija uporabnika ustvari soglasne piškotke, ki jih napadalci izkoriščajo s zlonamernimi zahtevki za avtentikacijo z oblikovanimi URI-ji za preusmeritev
- **Kraja avtentikacijske kode**: Obstoječi soglasni piškotki lahko povzročijo, da avtentikacijski strežniki preskočijo zaslone za soglasje in preusmerijo kode na nadzorne naslove napadalcev  
- **Neavtoriziran dostop do API-ja**: Ukradene avtentikacijske kode omogočajo izmenjavo žetonov in poosebljanje uporabnikov brez izrecnega dovoljenja

#### **Strategije ublažitve**

**Obvezne kontrole:**
- **Izrecna zahteva po soglasju**: Proxy strežniki MCP z uporabo statičnih ID-jev odjemalcev **MORAJO** pridobiti soglasje uporabnika za vsakega dinamično registriranega odjemalca
- **Implementacija varnosti OAuth 2.1**: Sledite trenutnim najboljšim praksam varnosti OAuth, vključno z PKCE (Proof Key for Code Exchange) za vse zahteve po avtorizaciji
- **Stroga validacija odjemalcev**: Uvedite stroge preglede URI-jev za preusmeritev in identifikatorjev odjemalcev za preprečevanje izkoriščanja

### Ranljivosti prehoda žetonov  

**Prehod žetonov** predstavlja izrazit anti-vzorec, kjer MCP strežniki sprejemajo žetone odjemalcev brez ustrezne validacije in jih posredujejo navzdol proti API-jem, kar krši specifikacije avtorizacije MCP.

#### **Varnostne posledice**

- **Obhod kontrol**: Neposredna uporaba žetonov odjemalcev do API-jev obide ključne omejitve hitrosti, validacije in nadzorne kontrole
- **Kvarjenje revizijske sledi**: Žetoni, izdani zgoraj, onemogočajo identifikacijo odjemalcev in s tem motijo možnosti preiskave incidentov
- **Izvleček podatkov preko proxyja**: Nevalidirani žetoni omogočajo zlonamernim akterjem uporabo strežnikov kot proxyjev za nepooblaščen dostop do podatkov
- **Kršitve zaupanja**: Prepričanja storitev navzdol lahko kršijo, če izvori žetonov niso preverljivi
- **Širitev napadov prek več storitev**: Sprejeti kompromitirani žetoni čez več storitev omogočajo bočno premikanje

#### **Zahtevane varnostne kontrole**

**Neprizanesljive zahteve:**
- **Validacija žetonov**: MCP strežniki **NE SMEJO** sprejemati žetonov, ki niso izrecno izdani za MCP strežnik
- **Preverjanje občinstva**: Vedno validirajte, da trditve občinstva žetona ustrezajo identiteti MCP strežnika
- **Pravilno življenjsko obdobje žetonov**: Implementirajte kratkotrajne žetone z varnimi praksami rotacije


## Varnost dobavne verige za AI sisteme

Varnost dobavne verige je presegla tradicionalne programske odvisnosti in zajema celoten AI ekosistem. Sodobne implementacije MCP morajo skrbno preverjati in spremljati vse AI-komponente, saj vsaka predstavlja potencialno ranljivost, ki lahko ogrozi integriteto sistema.

### Razširjene komponente AI dobavne verige

**Tradicionalne programske odvisnosti:**
- Knjižnice in ogrodja odprtokodne kode
- Posnetki vsebnikov in osnovni sistemi  
- Razvojna orodja in gradbeni cevovodi
- Komponente infrastrukture in storitve

**Specifični elementi AI dobavne verige:**
- **Temeljni modeli**: Vnaprej naučeni modeli od različnih ponudnikov, ki zahtevajo potrditev izvora
- **Storitve vektorizacije**: Zunanje storitve za vektorizacijo in semantično iskanje
- **Ponudniki konteksta**: Viri podatkov, baze znanja in repozitoriji dokumentov  
- **API-ji tretjih oseb**: Zunanje AI storitve, ML cevovodi in obdelovalni vmesniki podatkov
- **Modelski artefakti**: Teže, konfiguracije in fino nastavljene variante modelov
- **Viri podatkov za učenje**: Podatkovni nizi, uporabljeni za učenje in fino nastavljanje modelov

### Celovita strategija varnosti dobavne verige

#### **Preverjanje komponent in zaupanje**
- **Potrditev izvora**: Preverite izvor, licenco in integriteto vseh AI komponent pred integracijo
- **Varnostna ocena**: Izvedite skeniranje ranljivosti in varnostne preglede modelov, virov podatkov in AI storitev
- **Analiza ugleda**: Ocenite varnostno zgodovino in prakse ponudnikov AI storitev
- **Preverjanje skladnosti**: Zagotovite, da vse komponente ustrezajo varnostnim in regulativnim zahtevam organizacije

#### **Varnostni avtomatizirani cevovodi**  
- **Avtomatizirano skeniranje CI/CD**: Integrirajte varnostno skeniranje skozi vse avtomatizirane cevovode za uvajanje
- **Integriteta artefaktov**: Uvedite kriptografsko preverjanje za vse uvajane artefakte (koda, modeli, konfiguracije)
- **Postopno uvajanje**: Uporabite progresivne strategije uvajanja z validacijo varnosti na vsakem koraku
- **Zaupanja vredni repozitoriji artefaktov**: Uvajajte le iz preverjenih, varnih registrirnih mest in repozitorijev

#### **Neprekinjeno spremljanje in odzivanje**
- **Skeniranje odvisnosti**: Neprestano spremljanje ranljivosti za vse programske in AI komponentne odvisnosti
- **Spremljanje modelov**: Neprestana ocena vedenja modela, premikov učinkovitosti in varnostnih anomalij
- **Spremljanje zdravja storitev**: Spremljajte zunanje AI storitve za razpoložljivost, varnostne incidente in spremembe politik
- **Integracija informacij o grožnjah**: Vključite vire groženj, specifične za AI in ML varnostna tveganja

#### **Nadzor dostopa in najmanjše privilegije**
- **Dovoljenja na nivoju komponent**: Omejite dostop do modelov, podatkov in storitev na podlagi poslovnih potreb
- **Upravljanje servisnih računov**: Uvedite namenski servisni računi z minimalnimi zahtevanimi dovoljenji
- **Segmentacija omrežja**: Izolirajte AI komponente in omejite omrežni dostop med storitvami
- **Nadzor API vrat**: Uporabite centralizirane API prehode za nadzor in spremljanje dostopa do zunanjih AI storitev

#### **Odziv na incidente in okrevanje**
- **Postopki hitrega odziva**: Uveljavljeni postopki za popravljanje ali zamenjavo kompromitiranih AI komponent
- **Rotacija poverilnic**: Avtomatizirani sistemi za rotacijo skrivnosti, API ključev in servisnih poverilnic
- **Možnosti povrnitve**: Zmožnost hitrega povratka na prejšnje znane dobre različice AI komponent
- **Odziv na kršitev dobavne verige**: Posebni postopki za odzivanje na kompromitacije zgornjih AI storitev

### Microsoftova varnostna orodja in integracija

**GitHub Advanced Security** nudi celovito zaščito dobavne verige, vključno z:
- **Skeniranjem skrivnosti**: Avtomatizirana zaznava poverilnic, API ključev in žetonov v repozitorijih
- **Skeniranjem odvisnosti**: Varnostna ocena odprtokodnih odvisnosti in knjižnic
- **Analizo CodeQL**: Statična analiza kode za varnostne ranljivosti in težave pisanju kode
- **Vpogledi v dobavno verigo**: Pregled nad zdravjem in varnostnim stanjem odvisnosti

**Integracija Azure DevOps & Azure Repos:**
- Neprekinjena integracija varnostnega skeniranja prek Microsoft razvijalskih platform
- Avtomatizirane varnostne kontrole v Azure Pipelines za AI delovne obremenitve
- Uveljavljanje politik za varno uvajanje AI komponent

**Microsoftove notranje prakse:**
Microsoft izvaja obsežne prakse varnosti dobavne verige v vseh svojih produktih. Spoznajte preverjene pristope v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najboljše prakse temeljne varnosti

Implementacije MCP dedujejo in gradijo na obstoječem varnostnem stanju vaše organizacije. Krepitev temeljnih varnostnih praks znatno izboljša celotno varnost AI sistemov in MCP uvedb.

### Osnovna varnostna načela

#### **Varnostne prakse razvoja**
- **Skladnost z OWASP**: Zaščitite pred ranljivostmi [OWASP Top 10](https://owasp.org/www-project-top-ten/) za spletne aplikacije
- **Specifične AI zaščite**: Uvedite kontrole za [OWASP Top 10 za LLM-je](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Varnostno upravljanje skrivnosti**: Uporabljajte namenski sefe za žetone, API ključe in občutljive konfiguracijske podatke
- **Končna do končne šifriranje**: Uvedite varno komunikacijo skozi vse aplikacijske komponente in podatkovne tokove
- **Validacija vhodov**: Stroga validacija vseh uporabniških vhodov, parametrov API in virov podatkov

#### **Utrjevanje infrastrukture**
- **Večfaktorska avtentikacija**: Obvezna MFA za vse administrativne in servisne račune
- **Upravljanje popravkov**: Avtomatizirano in pravočasno nameščanje popravkov za operacijske sisteme, ogrodja in odvisnosti  
- **Integracija dobavitelja identitete**: Centralizirano upravljanje identitet prek poslovnih dobaviteljev identitet (Microsoft Entra ID, Active Directory)
- **Segmentacija omrežja**: Logična izolacija MCP komponent za omejitev možnosti bočnega premikanja
- **Pravilo najmanjše privilegije**: Minimalna potrebna dovoljenja za vse sistemske komponente in račune

#### **Spremljanje in zaznavanje varnosti**
- **Celovito beleženje**: Podrobno beleženje aktivnosti AI aplikacij, vključno z interakcijami MCP klient-strežnik
- **Integracija SIEM-a**: Centralizirano upravljanje informacij o varnosti in dogodkih za zaznavanje anomalij
- **Analitika vedenja**: AI-podprto spremljanje za zaznavanje nenavadnih vzorcev v sistemskem in uporabniškem vedenju
- **Obveščanje o grožnjah**: Integracija zunanjih podatkovnih tokov in indikatorjev kompromisa (IOC)
- **Odziv na incidente**: Dobro definirani postopki za zaznavo, odziv in okrevanje pri varnostnih incidentih

#### **Arhitektura Zero Trust**
- **Nikoli ne zaupaj, vedno preveri**: Neprestano preverjanje uporabnikov, naprav in omrežnih povezav
- **Mikrosegmentacija**: Granularni omrežni nadzor, ki izolira posamezne delovne obremenitve in storitve
- **Varnost z osredotočenostjo na identiteto**: Varstvene politike, ki temeljijo na preverjenih identitetah, ne na omrežni lokaciji
- **Neprekinjena ocena tveganj**: Dinamična evalvacija varnostnega stanja glede na trenutni kontekst in vedenje
- **Pogojni dostop**: Kontrole dostopa, ki se prilagajajo na podlagi dejavnikov tveganja, lokacije in zaupanja do naprave

### Vzorec integracije v podjetju

#### **Integracija Microsoftovega varnostnega ekosistema**
- **Microsoft Defender za oblak**: Celovito upravljanje varnostnega stanja oblaka
- **Azure Sentinel**: Nativne SIEM in SOAR zmogljivosti za zaščito AI delovnih obremenitev
- **Microsoft Entra ID**: Upravljanje identitet in dostopa v podjetju z uporabo pogojnih politik dostopa
- **Azure Key Vault**: Centralizirano upravljanje skrivnosti z varnostnim modulom HSM
- **Microsoft Purview**: Upravljanje podatkov in skladnosti za AI vire podatkov in delovne tokove

#### **Skladnost in upravljanje**
- **Usklajenost z regulativami**: Zagotovite, da implementacije MCP izpolnjujejo specifične industrijske zahteve za skladnost (GDPR, HIPAA, SOC 2)

- **Razvrščanje podatkov**: Pravilna kategorizacija in ravnanje z občutljivimi podatki, ki jih obdelujejo AI sistemi
- **Revizijske sledi**: Celovito beleženje za skladnost z zakonodajo in forenzične preiskave
- **Nadzor zasebnosti**: Izvedba načel zasebnosti že v zasnovi arhitekture AI sistema
- **Upravljanje sprememb**: Formalni postopki za varnostne preglede sprememb AI sistema

Te temeljne prakse ustvarjajo robustno osnovo varnosti, ki povečuje učinkovitost varnostnih kontrol specifičnih za MCP in zagotavlja celovito zaščito za AI-podprte aplikacije.

## Ključne varnostne ugotovitve

- **Večplastni varnostni pristop**: Združevanje temeljnih varnostnih praks (varno programiranje, minimalna privilegiranost, preverjanje dobavne verige, neprekinjen nadzor) z nadzorom specifičnim za AI za celovito zaščito

- **Specifični varnostni izzivi AI**: Sistemi MCP se soočajo z edinstvenimi tveganji, kot so prompt injection, zastrupitev orodij, prevzem sej, težave s pooblaščenim zastopnikom, ranljivosti pri prenašanju žetonov in prekomerne pravice, ki zahtevajo specializirane ukrepe za ublažitev

- **Odličnost pri preverjanju pristnosti in avtorizaciji**: Uvedba močnega preverjanja pristnosti z zunanjimi ponudniki identitet (Microsoft Entra ID), dosledno preverjanje žetonov in nikoli ne sprejemajte žetonov, ki niso izrecno izdani za vaš MCP strežnik

- **Preprečevanje AI napadov**: Uporaba Microsoft Prompt Shields in Azure Content Safety za zaščito pred posrednimi napadi prompt injection in zastrupitvijo orodij, hkrati pa preverjanje metapodatkov orodij in spremljanje dinamičnih sprememb

- **Varnost sej in prenosa**: Uporaba kriptografsko varnih, nedeterminističnih ID-jev sej povezanih z identiteto uporabnika, izvajanje ustreznega upravljanja življenjskega cikla sej in nikoli uporaba sej za preverjanje pristnosti

- **Najboljše prakse za OAuth varnost**: Preprečevanje napadov z zmedenim zastopnikom z izrecnim uporabniškim soglasjem za dinamično registrirane odjemalce, pravilna izvedba OAuth 2.1 s PKCE in strogo preverjanje URI za preusmeritev  

- **Načela varnosti žetonov**: Izogibanje anti-patternom prenašanja žetonov, preverjanje tržnikov žetonov, uvedba kratkoročnih žetonov z varnim rotiranjem in vzdrževanje jasnih mej zaupanja

- **Celovita varnost dobavne verige**: Vse komponente AI ekosistema (modeli, vdelave, kontekstni ponudniki, zunanji API-ji) obravnavajte z enako varnostno strogo kot tradicionalne programske odvisnosti

- **Neprestana evolucija**: Sledite hitro spreminjajočim se specifikacijam MCP, prispevajte k varnostnim standardom skupnosti in ohranjajte prilagodljive varnostne pristope, saj protokol dozoreva

- **Integracija varnosti Microsoft**: Izkoristite celovit varnostni ekosistem Microsofta (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za izboljšano zaščito implementacije MCP

## Celoviti viri

### **Uradna MCP varnostna dokumentacija**
- [MCP Specifikacija (trenutno: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najboljše varnostne prakse MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Specifikacija avtentikacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitorij](https://github.com/modelcontextprotocol)

### **Viri za varnost MCP OWASP**
- [Vodnik za varnost Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z navodili za implementacijo na Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Uradna tveganja varnosti MCP OWASP
- [Delavnica MCP varnostnega vrha (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična varnostna usposabljanja za MCP na Azure

### **Varnostni standardi in najboljše prakse**
- [Najboljše varnostne prakse OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 za varnost spletnih aplikacij](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 za velike jezikovne modele](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Raziskave in analiza AI varnosti**
- [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Napadi z zastrupitvijo orodij (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP varnostni raziskovalni povzetek (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft varnostne rešitve**
- [Dokumentacija Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID varnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najboljše prakse upravljanja žetonov Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodniki za implementacijo in vodiči**
- [Azure API Management kot MCP avtentikacijska prehodna točka](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID avtentikacija z MCP strežniki](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Varno shranjevanje in šifriranje žetonov (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps in varnost dobavne verige**
- [Azure DevOps varnost](https://azure.microsoft.com/products/devops)
- [Azure Repos varnost](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft pot varnosti dobavne verige](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna varnostna dokumentacija**

Za celovita varnostna navodila si oglejte ta specializirana gradiva v tem razdelku:

- **[MCP najboljše varnostne prakse 2025](./mcp-security-best-practices-2025.md)** - Popolne varnostne najboljše prakse za MCP implementacije
- **[Azure Content Safety implementacija](./azure-content-safety-implementation.md)** - Praktični primeri implementacije za integracijo Azure Content Safety  
- **[MCP varnostni nadzor 2025](./mcp-security-controls-2025.md)** - Najnovejši varnostni nadzori in tehnike za izvedbe MCP
- **[Hiter referenčni vodič za najboljše prakse MCP](./mcp-best-practices.md)** - Hiter vodič za bistvene varnostne prakse MCP
- **[BlueHat 2026: Zagotavljanje prihodnosti AI: Zavarovanje MCP z obrambnimi vzorci v globino](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Vzorce obrambne globine iz Microsoft Security Response Center (MSRC)

### **Praktične varnostne delavnice**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Celovita praktična delavnica za varovanje MCP strežnikov na Azure z naprednimi tabori od Base Camp do Summit
- **[Vodnik za varnost Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčna arhitektura in smernice za implementacijo vseh OWASP MCP Top 10 tveganj

---

## Kaj je naslednje

Naslednji: [Poglavje 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->