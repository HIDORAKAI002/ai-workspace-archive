# Varnost MCP: Celovita zaščita za AI sisteme

[![Najboljše prakse varnosti MCP](../../../translated_images/sl/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite sliko zgoraj za ogled videa te lekcije)_

Varnost je temeljni del oblikovanja AI sistemov, zato ji dajemo prednost kot naši drugi razdelek. To se ujema s Microsoftovim načelom **Secure by Design** iz [Iniciative za varno prihodnost](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Protokol konteksta modela (MCP) prinaša zmogljive nove zmogljivosti v aplikacije, ki temeljijo na AI, hkrati pa uvaja edinstvene izzive varnosti, ki presegajo tradicionalna programska tveganja. Sistemi MCP se soočajo tako z uveljavljenimi varnostnimi vprašanji (varno kodiranje, načelo najmanjše privilegiranosti, varnost dobavne verige) kot tudi z novimi specifičnimi grožnjami AI, vključno z vbrizgavanjem navodil (prompt injection), zastrupljanjem orodij, prevzemom sej, napadi z zmedenim pooblaščencem, ranljivostmi pri prenašanju žetonov in dinamičnimi spremembami zmožnosti.

Ta lekcija raziskuje najkritičnejša varnostna tveganja v implementacijah MCP — pokriva preverjanje pristnosti, avtorizacijo, prekomerne pravice, posredno vbrizgavanje navodil, varnost sej, težave z zmedenim pooblaščencem, upravljanje žetonov in ranljivosti dobavne verige. Naučili se boste izvedljivih kontrol in najboljših praks za ublažitev teh tveganj ter uporabe Microsoftovih rešitev, kot so Prompt Shields, Azure Content Safety in GitHub Advanced Security, za krepitev vaše MCP namestitve.

## Cilji učenja

Ob zaključku te lekcije boste lahko:

- **Prepoznati specifične grožnje MCP**: Razumeti edinstvena varnostna tveganja v sistemih MCP, vključno z vbrizgavanjem navodil, zastrupljanjem orodij, prekomernimi pravicami, prevzemom sej, težavami z zmedenim pooblaščencem, ranljivostmi pri prenašanju žetonov in tveganji dobavne verige
- **Uporabiti varnostne kontrole**: Izvesti učinkovite ukrepe, vključno z robustnim preverjanjem pristnosti, dostopom na osnovi najmanjšega privilegija, varnim upravljanjem žetonov, kontrolami varnosti sej in preverjanjem dobavne verige
- **Uporabiti Microsoftove varnostne rešitve**: Razumeti in uvajati Microsoft Prompt Shields, Azure Content Safety in GitHub Advanced Security za zaščito MCP obremenitev
- **Preveriti varnost orodij**: Prepoznati pomembnost preverjanja metapodatkov orodij, spremljati dinamične spremembe in se braniti pred posrednimi napadi z vbrizgavanjem navodil
- **Integrirati najboljše prakse**: Združiti uveljavljene varnostne osnove (varno kodiranje, krepitev strežnika, ničelno zaupanje) z MCP-specifičnimi kontrolami za celovito zaščito

# Arhitektura in kontrole varnosti MCP

Sodobne implementacije MCP zahtevajo večplastne varnostne pristope, ki naslovijo tako tradicionalno varnost programske opreme kot AI-specifične grožnje. Hitro razvijajoča se specifikacija MCP še naprej dozoreva svoje varnostne kontrole, kar omogoča boljšo integracijo z arhitekturami varnosti v podjetjih in uveljavljenimi najboljšimi praksami.

Raziskave iz [Microsoft Digital Defense Report](https://aka.ms/mddr) kažejo, da bi **98 % prijavljenih vdora preprečila ustrezna varnostna higiena**. Najbolj učinkovita zaščitna strategija združuje temeljne varnostne prakse s specifičnimi kontrolami MCP — preverjene osnovne varnostne ukrepe ostajajo najbolj vplivni pri zmanjševanju skupnega varnostnega tveganja.

## Trenutno stanje varnosti

> **Opomba:** Te informacije odražajo varnostne standarde MCP z dne **5. februar 2026**, usklajene s **specifikacijo MCP 2025-11-25**. Protokol MCP se hitro razvija, prihodnje implementacije pa lahko uvedejo nove vzorce preverjanja pristnosti in nadgrajene kontrole. Vedno se posvetujte z aktualno [specifikacijo MCP](https://spec.modelcontextprotocol.io/), [MCP repozitorijem GitHub](https://github.com/modelcontextprotocol) in [dokumentacijo najboljših praks varnosti](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovejša navodila.

## 🏔️ Delavnica MCP Security Summit (Sherpa)

Za **praktično usposabljanje za varnost** močno priporočamo **delavnico MCP Security Summit** (Sherpa) — celovito vodeno odpravo varnosti MCP strežnikov v Microsoft Azure.

### Pregled delavnice

[Delavnica MCP Security Summit](https://azure-samples.github.io/sherpa/) ponuja praktično, izvedljivo varnostno usposabljanje skozi preverjeno metodologijo »ranljiv → izkoristi → popravi → potrdi«. Naučili se boste:

- **Učenje z razbijanjem**: Preizkusite ranljivosti v praksi z izkoriščanjem namensko nezaščitenih strežnikov
- **Uporaba varnosti Azure nativno**: Izkoristite Azure Entra ID, Key Vault, API Management in AI Content Safety
- **Sledenje obrambi v globino**: Napredujte skozi baze in taborišča, ki gradijo celovite varnostne plasti
- **Uporaba standardov OWASP**: Vsaka tehnika je povezana z [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Pridobitev produkcijske kode**: Odnesite domov delujoče, preizkušene implementacije

### Potek odprave

| Tabor | Osredotočenost | Kritična OWASP tveganja |
|-------|----------------|-------------------------|
| **Osnovni tabor** | Osnove MCP & ranljivosti preverjanja pristnosti | MCP01, MCP07 |
| **Tabor 1: Identiteta** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Tabor 2: Prehod** | API Management, zasebni končni točki, upravljanje | MCP02, MCP06, MCP07, MCP09 |
| **Tabor 3: I/O varnost** | Vbrizgavanje navodil, zaščita osebnih podatkov, varnost vsebine | MCP03, MCP05, MCP06, MCP10 |
| **Tabor 4: Spremljanje** | Analitika dnevnikov, nadzorne plošče, odkrivanje groženj | MCP04, MCP08 |
| **Samit** | Integracijski test Red Team / Blue Team | Vsi |

**Začnite**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 varnostnih tveganj

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) podrobno opisuje deset najpomembnejših varnostnih tveganj za implementacije MCP:

| Tveganje | Opis | Ublažitev v Azure |
|----------|-------|------------------|
| **MCP01** | Slabo upravljanje žetonov & razkritje skrivnosti | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacija privilegijev zaradi razširitve obsegov | RBAC, pogojni dostop |
| **MCP03** | Zastrupljanje orodij | Preverjanje orodij, preverjanje integritete |
| **MCP04** | Napadi na dobavno verigo programske opreme & manipulacije odvisnosti | GitHub Advanced Security, skeniranje odvisnosti |
| **MCP05** | Vbrizgavanje ukazov & izvajanje | Preverjanje vnosa, peskovnik (sandboxing) |
| **MCP06** | Subverzija poteka namena | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nezadostno preverjanje pristnosti & avtorizacija | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Pomanjkanje revizije in telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Senci MCP strežniki | Upravljanje API Center, izolacija omrežja |
| **MCP10** | Vbrizgavanje konteksta & prekomerna delitev | Klasifikacija podatkov, minimalna izpostavitev |

### Razvoj preverjanja pristnosti MCP

Specifikacija MCP se je pomembno razvila v svojem pristopu do preverjanja pristnosti in avtorizacije:

- **Izvirni pristop**: Zgodnje specifikacije so zahtevale, da razvijalci implementirajo lastne strežnike za preverjanje pristnosti, MCP strežniki pa so delovali kot OAuth 2.0 pooblaščeni strežniki, ki neposredno upravljajo preverjanje pristnosti uporabnikov
- **Trenutni standard (2025-11-25)**: Posodobljena specifikacija dovoljuje MCP strežnikom, da zastopajo preverjanje pristnosti zunanjim ponudnikom identitete (kot je Microsoft Entra ID), kar izboljšuje varnostni položaj in zmanjšuje kompleksnost implementacije
- **Varnost sloja prenosa**: Izboljšana podpora za varne mehanizme prenosa z ustreznimi vzorci preverjanja pristnosti za lokalne (STDIO) in oddaljene (Streamable HTTP) povezave

## Varnost preverjanja pristnosti in avtorizacije

### Trenutni varnostni izzivi

Sodobne implementacije MCP se soočajo z več izzivi preverjanja pristnosti in avtorizacije:

### Tveganja & vektorji napadov

- **Nepravilno konfigurirana avtorizacijska logika**: Napačna implementacija avtorizacije v MCP strežnikih lahko razkrije občutljive podatke in nepravilno uporabi kontrole dostopa
- **Odkritje OAuth žetona**: Kraja lokalnih žetonov MCP strežnika omogoča napadalcem, da se izdajajo za strežnike in dostopajo do nadaljnjih storitev
- **Ranljivosti pri prenašanju žetonov**: Nepravilno ravnanje z žetoni omogoča obvoz varnostnih kontrol in vrzeli v odgovornosti
- **Prekomerne pravice**: Prevelika privilegiranost MCP strežnikov krši načelo najmanjšega privilegija in povečuje napadalne površine

#### Prenos žetona: kritičen anti-vzorec

**Prenos žetonov je v trenutni specifikaciji avtorizacije MCP izrecno prepovedan** zaradi hudih varnostnih posledic:

##### Zaobidenje varnostnih kontrol  
- MCP strežniki in API-ji koristijo ključne varnostne kontrole (omejitev hitrosti, preverjanje zahtev, nadzor prometa), ki so odvisne od pravilne validacije žetonov  
- Neposredna uporaba žetona klienta do API-ja zaobide temeljne zaščite in spodkopava varnostno arhitekturo

##### Izzivi odgovornosti in revizije  
- MCP strežniki ne morejo razlikovati med klienti, ki uporabljajo žetone, izdane zgoraj, kar podira sledljivost revizije  
- Dnevniki virov v nadaljnjih strežnikih prikazujejo zavajajoče izvore zahtevkov namesto dejanske vloge MCP posrednika  
- Preiskave incidentov in revizije skladnosti postanejo bistveno težje

##### Tveganja iztujitve podatkov  
- Nevalidirani zahtevki žetona omogočajo zlonamernim akterjem s ukradenimi žetoni, da uporabljajo MCP strežnike kot proksije za iztujitev podatkov  
- Kršitve mej zaupanja omogočajo nepooblaščen dostop, ki zaobide predvidene varnostne kontrole

##### Večstoritevni napadi  
- Kompromitirani žetoni, ki jih sprejemajo številne storitve, omogočajo stranski napredovanje po povezanih sistemih  
- Predpostavke zaupanja med storitvami so lahko kršene, če izvora žetona ni mogoče preveriti

### Varnostne kontrole in ublažitve

**Ključne varnostne zahteve:**

> **OBVEZNO:** MCP strežniki **NE SMEJO** sprejemati nobenih žetonov, ki niso izrecno izdani zanje

#### Kontrole preverjanja pristnosti in avtorizacije

- **Temeljit pregled avtorizacije**: Izvedite celovite revizije avtorizacijske logike MCP strežnikov za zagotovitev, da dostop imajo le predvideni uporabniki in klienti do občutljivih virov  
  - **Vodnik za implementacijo**: [Azure API Management kot prehod preverjanja pristnosti za MCP strežnike](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integracija identitete**: [Uporaba Microsoft Entra ID za preverjanje pristnosti MCP strežnikov](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Vredno upravljanje žetonov**: Uporabite [Microsoftove najboljše prakse preverjanja in življenjskega cikla žetonov](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validirajte zahtevke publike žetona, ki naj se ujemajo z identiteto MCP strežnika  
  - Uvedite pravilno rotacijo in politike poteka veljavnosti žetonov  
  - Preprečite napade ponovne uporabe in nepooblaščene uporabe žetonov

- **Varno shranjevanje žetonov**: Zagotovite zaščito žetonov z uporabo šifriranja tako v mirovanju kot pri prenosu  
  - **Najboljše prakse**: [Pravila za varno shranjevanje in šifriranje žetonov](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementacija kontrole dostopa

- **Načelo najmanjše privilegiranosti**: Dodelite MCP strežnikom samo minimalna dovoljenja, potrebna za predvideno funkcionalnost  
  - Redni pregledi in posodobitve pravic za preprečevanje širjenja privilegijev  
  - **Microsoftova dokumentacija**: [Zavarovan dostop z najmanjšimi privilegiji](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Dostop na osnovi vlog (RBAC)**: Uporabite natančne dodelitve vlog  
  - Omejite vloge na specifične vire in ukrepe  
  - Izogibajte se širokim ali nepotrebnim dovoljenjem, ki povečujejo napadalne površine

- **Nenehno spremljanje pravic**: Izvedite stalno revizijo in nadzor dostopa  
  - Spremljajte vzorce uporabe pravic za anomalije  
  - Hitro odpravite prekomerne ali neuporabljene pravice

## Specifične varnostne grožnje AI

### Napadi z vbrizgavanjem navodil in manipulacijo orodij

Sodobne implementacije MCP se soočajo z naprednimi AI-specifičnimi napadalnimi vektorji, ki jih tradicionalni varnostni ukrepi ne morejo v celoti rešiti:

#### **Posredno vbrizgavanje navodil (Cross-Domain Prompt Injection)**

**Posredno vbrizgavanje navodil** predstavlja eno najkritičnejših ranljivosti v AI sistemih z omogočenim MCP. Napadalci vgrajujejo zlonamerna navodila v zunanje vsebine — dokumente, spletne strani, elektronska sporočila ali podatkovne vire — ki jih AI sistemi nato obravnavajo kot legitimna navodila.

**Scenariji napadov:**
- **Vbrizgavanje v dokumente**: Zlonamerna navodila skrita v obdelanih dokumentih povzročijo neželena AI dejanja  
- **Izraba spletnih vsebin**: Kompromitirane spletne strani z vgrajenimi spodbujanji, ki manipulirajo AI vedenje ob zajemu podatkov  
- **Napadi prek elektronske pošte**: Zlonamerna navodila v sporočilih, ki povzročajo uhajanje informacij ali nepooblaščena dejanja AI pomočnikov  
- **Kontaminacija podatkovnih virov**: Kompromitirane baze podatkov ali API-ji, ki dostavljajo okuženo vsebino AI sistemom

**Dejanski vpliv**: Ti napadi lahko povzročijo iztujitev podatkov, kršitve zasebnosti, ustvarjanje škodljive vsebine in manipulacijo uporabniških interakcij. Za podrobno analizo glejte [Prompt Injection v MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagram napada vbrizgavanja navodil](../../../translated_images/sl/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi z zastrupljanjem orodij**

**Zastrupljanje orodij** ciljano izkorišča metapodatke, ki definirajo orodja MCP, z izkoriščanjem načina, kako LLM modeli interpretirajo opise in parametre orodij za odločanje o izvedbi.

**Mehanizmi napada:**
- **Manipulacija metapodatkov**: Napadalci vgrajujejo zlonamerna navodila v opise orodij, definicije parametrov ali primere uporabe  
- **Nevidna navodila**: Skrita spodbujanja v metapodatkih orodij, ki jih obdelujejo AI modeli, a jih ljudje ne vidijo  
- **Dinamična sprememba orodij ("rug pulls")**: Orodja, ki so jih uporabniki odobrili, se pozneje spremenijo za izvajanje zlonamernih dejanj brez njihove vednosti  
- **Vbrizgavanje parametrov**: Zlonamerna vsebina v shemah parametrov orodij, ki vpliva na vedenje modela

**Tveganja gostujočih strežnikov:** Oddaljeni MCP strežniki predstavljajo povečana tveganja, saj se lahko definicije orodij posodobijo po začetnem odobritvi uporabnika, kar ustvari scenarije, kjer prej varna orodja postanejo zlonamerna. Za temeljito analizo glejte [Napadi z zastrupljanjem orodij (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagram napada z vbrizgavanjem orodij](../../../translated_images/sl/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni AI napadalni vektorji**

- **Prečni domeni napad z vbrizgavanjem navodil (XPIA)**: Napredni napadi, ki izkoriščajo vsebine z več domen za obvod varnostnih kontrol
- **Dinamična sprememba zmožnosti**: Spremembe zmogljivosti orodij v realnem času, ki uidejo začetnim varnostnim ocenam  
- **Zastrupljanje kontekstnega okna**: Napadi, ki manipulirajo z velikimi kontekstnimi okni za skrivanje zlonamernih navodil  
- **Napadi z zmedo modela**: Izkoriščanje omejitev modela za ustvarjanje nepredvidljivih ali nevarnih vedenj  


### Vpliv varnostnih tveganj za AI

**Posledice z visokim vplivom:**  
- **Iztekanje podatkov**: Nepooblaščen dostop in kraja občutljivih podatkov podjetja ali osebnih podatkov  
- **Zloraba zasebnosti**: Razkritje osebno identificirljivih informacij (PII) in zaupnih poslovnih podatkov  
- **Manipulacija sistemov**: Neželeni posegi v kritične sisteme in delovne tokove  
- **Kraja poverilnic**: Kompromitiranje avtentikacijskih žetonov in poverilnic za storitve  
- **Lateralno gibanje**: Uporaba kompromitiranih AI sistemov kot izhodišč za širše omrežne napade  


### Microsoftove varnostne rešitve za AI

#### **AI Prompt Shields: Napredna zaščita pred napadi z vbrizgavanjem**

Microsoftove **AI Prompt Shields** nudijo obsežno obrambo pred neposrednimi in posrednimi napadi z vbrizgavanjem navodil z več varnostnimi plastmi:

##### **Glavni zaščitni mehanizmi:**

1. **Napredno zaznavanje in filtriranje**  
   - Algoritmi strojnega učenja in tehnike NLP zaznavajo zlonamerna navodila v zunanjih vsebinah  
   - Analiza v realnem času dokumentov, spletnih strani, e-pošte in podatkovnih virov za vdelane grožnje  
   - Kontekstualno razumevanje legitimnih proti zlonamernim vzorcem navodil  

2. **Tehnike osvetlitve**  
   - Ločuje zaupanja vredna sistemska navodila od morebitno kompromitiranih zunanjih vhodov  
   - Metode transformacije besedila, ki povečujejo relevantnost modela ter izolirajo zlonamerno vsebino  
   - Pomaga AI sistemom ohranjati pravilno hierarhijo navodil in prezreti vbrizgane ukaze  

3. **Sistemi ločil in označevanja podatkov**  
   - Izrecna definicija meja med zaupanja vrednimi sistemskimi sporočili in zunanjim vhodnim besedilom  
   - Posebni označevalci, ki izpostavijo meje med zaupanja vrednimi in nezaželenimi viri podatkov  
   - Jasna ločitev preprečuje zmedo navodil in nepooblaščeno izvrševanje ukazov  

4. **Neprekinjeno obveščanje o grožnjah**  
   - Microsoft neprestano spremlja nove vzorce napadov in posodablja zaščite  
   - Proaktivno iskanje groženj za nove tehnike vbrizgavanja in napadalne poti  
   - Redne posodobitve varnostnih modelov za ohranjanje učinkovitosti proti razvijajočim se grožnjam  

5. **Integracija Azure Content Safety**  
   - Del celovitega kompleta Azure AI Content Safety  
   - Dodatna zaznava poskusov jailbreak, škodljive vsebine in kršitev varnostnih politik  
   - Združeni varnostni nadzor nad komponentami AI aplikacij  

**Viri za implementacijo**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  

![Microsoft Prompt Shields Protection](../../../translated_images/sl/prompt-shield.ff5b95be76e9c78c.webp)  


## Napredne varnostne grožnje MCP

### Ranljivosti prek prevzema seje

**Prevzem seje** predstavlja kritično vektorsko točko napada v zveznih implementacijah MCP, kjer nepooblaščene strani pridobijo in zlorabijo legitimne identifikatorje sej za prevare odjemalcev in izvajanje nepooblaščenih dejanj.

#### **Scenariji napadov in tveganja**

- **Vbrizgavanje zlorabljenih sej v navodila**: Napadalci s krajo ID sej vbrizgajo zlonamerne dogodke v strežnike, ki delijo stanje sej, kar lahko sproži škodljiva dejanja ali dostop do občutljivih podatkov  
- **Neposredna ponareditvena identifikacija**: Ukradeni ID sej omogočajo neposredne klice MCP strežniku, ki obidejo avtentikacijo in obravnavajo napadalce kot legitimne uporabnike  
- **Kompromitirani obnovljivi tokovi**: Napadalci lahko prerano prekinejo zahteve, kar povzroči, da legitimni odjemalci nadaljujejo z morebitno zlonamerno vsebino  

#### **Varnostni nadzori pri upravljanju sej**

**Ključne zahteve:**  
- **Preverjanje pooblastil**: MCP strežniki, ki izvajajo avtentikacijo, **MORAJO** preveriti VSE vhodne zahteve in **NE SMEJO** se zanašati na seje za identifikacijo  
- **Varnostna generacija sej**: Uporaba kriptografsko varnih, nedeterminističnih ID sej, ustvarjenih z varnimi generatorji naključnih števil  
- **Povezava z uporabnikom**: ID sej se vežejo na uporabniške podatke z uporabo formatov, kot je `<user_id>:<session_id>`, da preprečijo zlorabo sej med uporabniki  
- **Upravljanje življenjskega cikla sej**: Uvedba pravilnih potekov, rotacij in razveljavitev za omejitev časovnih ranljivosti  
- **Varnost prenosa**: Obvezna uporaba HTTPS za vso komunikacijo za preprečitev prestrezanja ID sej  

### Težava z zmedenim pooblaščencem

**Težava z zmedenim pooblaščencem** nastopi, kadar MCP strežniki delujejo kot avtentikacijski posredniki med odjemalci in tretjimi storitvami, kar omogoča mimoidoče zaobide avtorizacije zaradi izrabe statičnih ID-jev odjemalcev.

#### **Mehanizmi napada in tveganja**

- **Zaobid soglasja preko piškotkov**: Prejšnja uporabniška avtentikacija ustvari piškotke soglasja, ki jih napadalci izkoristijo z zlonamernimi avtorizacijskimi zahtevami s skrbno oblikovanimi URI-ji za preusmeritev  
- **Kraja avtorizacijskih kod**: Obstoječi piškotki soglasja lahko povzročijo, da avtorizacijski strežniki preskočijo zaslone soglasja in kodo preusmerijo na napadalcem nadzorovane končne točke  
- **Neavtoriziran dostop do API-jev**: Ukradene avtorizacijske kode omogočajo izmenjavo žetonov in ponarejanje uporabnikov brez izrecnega dovoljenja  

#### **Strategije ublažitve**

**Obvezni nadzori:**  
- **Izrecna zahteva po soglasju**: MCP posredniški strežniki, ki uporabljajo statične ID-je odjemalcev, **MORAJO** pridobiti soglasje uporabnika za vsakega dinamično registriranega odjemalca  
- **Varnostna implementacija OAuth 2.1**: Upoštevajte trenutne najboljše varnostne prakse OAuth vključno s PKCE (Proof Key for Code Exchange) za vse zahteve po avtorizaciji  
- **Stroga validacija odjemalcev**: Uvedite stroge kontrole validacije URI-jev za preusmeritve in identifikatorjev odjemalcev za preprečevanje izrabe  

### Ranljivosti pri posredovanju žetonov  

**Posredovanje žetonov** predstavlja eksplicitno napačen vzorec, kjer MCP strežniki sprejemajo žetone odjemalcev brez ustrezne validacije in jih posredujejo navzdol do API-jev, kar krši MCP specifikacije avtorizacije.

#### **Varnostne posledice**

- **Zaobid nadzora**: Neposredna uporaba žetonov odjemalcev do API-jev premosti ključne meje nadzora hitrosti, validacij in spremljanja  
- **Poškodba revizijske sledljivosti**: Žetoni, izdani zgoraj, onemogočajo identifikacijo odjemalcev, kar onemogoča preiskave incidentov  
- **Iztikanje podatkov prek posrednika**: Nevalidirani žetoni omogočajo zlonamernim akterjem uporabo strežnikov kot posrednikov za nepooblaščen dostop do podatkov  
- **Kršitev mej zaupanja**: Zaupanje navzdol ležečih storitev lahko ogrozi nepreverjen izvor žetonov  
- **Širjenje napadov prek več storitev**: Sprejeti kompromitirani žetoni po več storitvah omogočajo lateralno gibanje  

#### **Zahtevani varnostni nadzor**

**Neprizanesljive zahteve:**  
- **Validacija žetonov**: MCP strežniki **NE SMEJO** sprejemati žetonov, ki niso izrecno izdani za MCP strežnik  
- **Preverjanje občinstva**: Vedno validirajte trditve občinstva v žetonih, da ujema identiteto MCP strežnika  
- **Ustrezni življenjski cikel žetonov**: Uvedite kratkotrajne dostopne žetone z varnimi praksami rotacije  


## Varnost dobavne verige za AI sisteme

Varnost dobavne verige se je razvila od klasičnih odvisnosti programske opreme do celotnega AI ekosistema. Sodobne implementacije MCP morajo rigorozno preverjati in spremljati vse AI komponente, saj vsak element predstavlja potencialno ranljivost, ki lahko ogrozi integriteto sistema.

### Razširjeni AI dobavnovverižni elementi

**Tradicionalne programske odvisnosti:**  
- Knjižnice in ogrodja odprte kode  
- Posnetki kontejnerjev in osnovni sistemi  
- Orodja za razvoj in pipeline za gradnjo  
- Infrastrukturne komponente in storitve  

**Posebne AI dobavne sestavine:**  
- **Temeljni modeli**: Prednaloženi modeli od različnih ponudnikov, ki zahtevajo preverjanje izvora  
- **Storitve vgrajevanja**: Zunanje storitve za vektorizacijo in semantično iskanje  
- **Dobavitelji konteksta**: Viri podatkov, bazo znanja in repozitoriji dokumentov  
- **API-ji tretjih oseb**: Zunanje AI storitve, ML pipeline-i in končne točke za obdelavo podatkov  
- **Modelni artefakti**: Teže, konfiguracije in fino nastavljene različice modelov  
- **Viri podatkov za učenje**: Skupine podatkov, uporabljene za učenje in fino nastavljanje  

### Celovita strategija varnosti dobavne verige

#### **Preverjanje komponent in zaupanje**  
- **Validacija izvora**: Preverite izvor, licenciranje in celovitost vseh AI komponent pred vključitvijo  
- **Varnostna ocena**: Izvedite varnostne preglede in teste ranljivosti za modele, podatkovne vire in AI storitve  
- **Analiza ugleda**: Ocenite varnostno zgodovino in prakse ponudnikov AI storitev  
- **Preverjanje skladnosti**: Zagotovite, da vse komponente izpolnjujejo varnostne in regulatorne zahteve organizacije  

#### **Varnost avtomatiziranih pipeline-ov**  
- **Avtomatizirano skeniranje CI/CD**: Vključite varnostno skeniranje skozi vse avtomatizirane prodajne kanale  
- **Integriteta artefaktov**: Uvedite kriptografsko preverjanje vseh nameščenih artefaktov (koda, modeli, konfiguracije)  
- **Postopen uvod**: Uporabljajte postopne strategije uvajanja z varnostnimi preverjanji v vsaki fazi  
- **Zanesljivi repozitoriji artefaktov**: Uvajajte le iz preverjenih, varnih registracij in repozitorijev  

#### **Neprekinjeno spremljanje in odziv**  
- **Skeniranje odvisnosti**: Neprestano spremljanje ranljivosti vseh programsko in AI komponent  
- **Spremljanje modelov**: Neprestana ocena obnašanja modelov, odklonov zmogljivosti in varnostnih anomalij  
- **Spremljanje zdravja storitev**: Nadzor zunanjih AI storitev glede razpoložljivosti, varnostnih incidentov in sprememb politik  
- **Integracija informacij o grožnjah**: Vključevanje virov groženj specifičnih za AI in ML varnostna tveganja  

#### **Nadzor dostopa in načelo najmanjše privilegiranosti**  
- **Dovoljenja na ravni komponent**: Omejite dostop do modelov, podatkov in storitev glede na poslovno potrebo  
- **Upravljanje računov storitev**: Uvedite namenski računi storitev z minimalnimi zahtevanimi dovoljenji  
- **Segmentacija omrežja**: Izolirajte AI komponente in omejite omrežni dostop med storitvami  
- **Nadzor preko API vrat**: Uporabljajte centralizirane API prehode za nadzor in spremljanje dostopa do zunanjih AI storitev  

#### **Odziv na incidente in obnovitev**  
- **Postopki hitrega odziva**: Ustanovljeni postopki za zakrpe ali zamenjavo kompromitiranih AI komponent  
- **Rotacija poverilnic**: Avtomatizirani sistemi za rotiranje skrivnosti, API ključev in poverilnic za storitve  
- **Možnosti povrnitve**: Zmožnost hitrega vračanja na prejšnje znano dobre različice AI komponent  
- **Obnova po kršitvi dobavne verige**: Specifični postopki za odziv na kompromitacije AI storitev zgoraj  

### Microsoftova varnostna orodja in integracija

**GitHub Advanced Security** omogoča obsežno varovanje dobavne verige, vključno z:  
- **Skeniranje skrivnosti**: Avtomatizirano odkrivanje poverilnic, API ključev in žetonov v repozitorijih  
- **Skeniranje odvisnosti**: Ocena ranljivosti odprtokodnih odvisnosti in knjižnic  
- **Analiza CodeQL**: Statična analiza kode za varnostne ranljivosti in težave pri programiranju  
- **Vpogledi v dobavno verigo**: Pregled zdravja odvisnosti in varnostnega stanja  

**Integracija Azure DevOps in Azure Repos:**  
- Brezhibna integracija varnostnega skeniranja na Microsoftovih razvojnih platformah  
- Avtomatizirane varnostne kontrole v Azure Pipelines za AI obremenitve  
- Uveljavljanje politik za varno nameščanje AI komponent  

**Microsoftove notranje prakse:**  
Microsoft izvaja obsežne varnostne prakse dobavne verige v vseh svojih produktih. Več o preverjenih pristopih preberite v [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).  


## Najboljše prakse osnovne varnosti

Implementacije MCP dedujejo in nadgrajujejo obstoječe varnostno stanje vaše organizacije. Krepitev temeljnih varnostnih praks bistveno izboljša splošno varnost AI sistemov in MCP nameščanj.

### Temeljni varnostni elementi

#### **Varnostne prakse razvoja**  
- **Skladnost z OWASP**: Zaščita pred ranljivostmi spletnih aplikacij iz [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **AI-specifične zaščite**: Uvedba kontrol za [OWASP Top 10 za LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Varnostno upravljanje skrivnosti**: Uporaba namensko varovanih trezorjev za žetone, API ključe in občutljive konfiguracijske podatke  
- **Šifriranje od začetka do konca**: Zagotavljanje varne komunikacije med vsemi komponentami aplikacije in pretokom podatkov  
- **Validacija vhodov**: Stroga validacija vseh uporabniških vhodov, API parametrov in podatkovnih virov  

#### **Zaostritev infrastrukture**  
- **Večfaktorska avtentikacija**: Obvezna MFA za vse administrativne in servisne račune  
- **Upravljanje popravkov**: Avtomatizirano, pravočasno nameščanje popravkov za operacijske sisteme, ogrodja in odvisnosti  
- **Integracija ponudnika identitet**: Centralizirano upravljanje identitet preko podjetniških ponudnikov (Microsoft Entra ID, Active Directory)  
- **Segmentacija omrežja**: Logična izolacija MCP komponent za omejevanje lateralnega gibanja  
- **Načelo najmanjše privilegiranosti**: Minimalno zahtevane pravice za vse sistemske komponente in račune  

#### **Spremljanje in zaznavanje varnosti**  
- **Celovito beleženje**: Podrobno beleženje aktivnosti AI aplikacij, vključno z interakcijami MCP odjemalcev in strežnikov  
- **Integracija SIEM**: Centralizirano upravljanje varnostnih informacij in dogodkov za zaznavanje anomalij  
- **Analitika vedenja**: AI podprto spremljanje za odkrivanje nenavadnih vzorcev v sistemskem in uporabniškem vedenju  
- **Obveščanje o grožnjah**: Vključevanje zunanjih virov groženj in indikatorjev kompromisa (IOC)  
- **Odziv na incidente**: Jasno opredeljeni postopki za zaznavanje, odziv in obnovo po varnostnih incidentih  

#### **Arhitektura z ničelnim zaupanjem**  
- **Nikoli ne zaupaj, vedno preveri**: Neprestano preverjanje uporabnikov, naprav in omrežnih povezav  
- **Mikrosegmentacija**: Podrobni omrežni nadzori, ki izolirajo posamezne obremenitve in storitve  
- **Varnost osredotočena na identiteto**: Varnostne politike, ki temeljijo na preverjenih identitetah, ne na omrežni lokaciji  
- **Neprestana ocena tveganj**: Dinamična ocena varnostnega stanja glede na trenutni kontekst in vedenje  
- **Pogojni dostop**: Kontrole dostopa, ki se prilagajajo na podlagi faktorjev tveganja, lokacije in zaupanja napravi  

### Vzorci podjetniške integracije

#### **Integracija Microsoftovega varnostnega ekosistema**  
- **Microsoft Defender for Cloud**: Celovito upravljanje varnostnega stanja v oblaku  
- **Azure Sentinel**: Nativna rešitev SIEM in SOAR za zaščito AI obremenitev  
- **Microsoft Entra ID**: Podjetniško upravljanje identitet in dostopa s politikami pogojenega dostopa  
- **Azure Key Vault**: Centralizirano upravljanje skrivnosti z uporabo strojne varnostne enote (HSM)  
- **Microsoft Purview**: Upravljanje podatkov in skladnosti za vire podatkov AI in delovne tokove  

#### **Usklajenost in upravljanje**  
- **Skladnost s predpisi**: Zagotavljanje, da implementacije MCP izpolnjujejo industrijske zahteve (GDPR, HIPAA, SOC 2)  
- **Razvrščanje podatkov**: Ustrezna kategorizacija in obravnava občutljivih podatkov, ki jih obdelujejo AI sistemi  
- **Revizijske sledi**: Celovito beleženje za skladnost s predpisi in forenzične preiskave  
- **Nadzor zasebnosti**: Uvedba načel zasebnosti skozi dizajn v arhitekturo AI sistemov  
- **Upravljanje sprememb**: Formalni postopki pregleda varnosti sprememb AI sistemov  

Te temeljne prakse ustvarjajo robustno varnostno osnovo, ki izboljšuje učinkovitost varnostnih ukrepov specifičnih za MCP in zagotavlja celovito zaščito AI-pogojenih aplikacij.  

## Ključna varnostna sporočila
- **Večplastni varnostni pristop**: Združite osnovne varnostne prakse (varen razvoj kode, najmanjše privilegije, preverjanje dobavne verige, stalno spremljanje) z nadzorom, specifičnim za AI, za celovito zaščito

- **Specifičen varnostni landscape za AI**: Sistemi MCP se soočajo z edinstvenimi tveganji, vključno z vbrizgavanjem pozivov, zastrupljanjem orodij, prevzemom sej, težavami "zmedeni namestnik", ranljivostmi pri posredovanju žetonov in pretiranimi dovoljenji, ki zahtevajo posebne mitigacije

- **Odličnost pri preverjanju pristnosti in avtorizaciji**: Uvedite močno preverjanje pristnosti z uporabo zunanjih ponudnikov identitete (Microsoft Entra ID), dosledno izvajajte preverjanje veljavnosti žetonov in nikoli ne sprejemajte žetonov, ki niso izrecno izdani za vaš MCP strežnik

- **Preprečevanje AI napadov**: Uporabite Microsoft Prompt Shields in Azure Content Safety za obrambo pred posrednimi napadi z vbrizgavanjem pozivov in zastrupljanjem orodij, hkrati pa preverjajte metapodatke orodij in spremljajte dinamične spremembe

- **Varnost sej in prenosa**: Uporabljajte kriptografsko varne, nedeterministične ID-je sej, vezane na identitete uporabnikov, implementirajte pravilno upravljanje življenjskega cikla sej in sej nikoli ne uporabljajte za preverjanje pristnosti

- **Najboljše prakse varnosti OAuth**: Preprečite napade "zmedenih namestnikov" preko izrecnega soglasja uporabnikov za dinamično registrirane odjemalce, pravilne implementacije OAuth 2.1 z PKCE in strogega preverjanja URI-jev za preusmeritev

- **Principi varnosti žetonov**: Izogibajte se anti-vzorcema posredovanja žetonov, preverjajte trditve občinstva žetonov, uporabljajte kratkotrajne žetone z varnim rotiranjem in vzdržujte jasne meje zaupanja

- **Celovita varnost dobavne verige**: Vse sestavine AI ekosistema (modeli, vdelave, ponudniki konteksta, zunanji API-ji) obravnavajte z enako varnostno rigoroznostjo kot tradicionalne programske odvisnosti

- **Neprestano razvijanje**: Bodite na tekočem z hitro razvijajočimi se specifikacijami MCP, prispevajte k varnostnim standardom skupnosti in vzdržujte prilagodljive varnostne drže, saj protokol zori

- **Integracija Microsoft varnosti**: Izkoristite celovit varnostni ekosistem Microsofta (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za izboljšano zaščito implementacij MCP

## Celoviti viri

### **Uradna MCP varnostna dokumentacija**
- [MCP Specification (Current: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)

### **OWASP MCP varnostni viri**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Celovit OWASP MCP Top 10 z navodili za implementacijo na Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Uradna OWASP MCP varnostna tveganja
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična varnostna usposabljanja za MCP na Azure

### **Varnostni standardi in najboljše prakse**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Application Security](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 for Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Raziskave in analiza AI varnosti**
- [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Security Research Briefing (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft varnostne rešitve**
- [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Service](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Security](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Management Best Practices](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodniki za implementacijo in vadnice**
- [Azure API Management as MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID Authentication with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Secure Token Storage and Encryption (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps in varnost dobavne verige**
- [Azure DevOps Security](https://azure.microsoft.com/products/devops)
- [Azure Repos Security](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Supply Chain Security Journey](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna varnostna dokumentacija**

Za celovita varnostna navodila si oglejte te specializirane dokumente v tem razdelku:

- **[MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)** - Celovite najboljše prakse varnosti za implementacije MCP
- **[Azure Content Safety Implementation](./azure-content-safety-implementation.md)** - Praktični primeri implementacije za integracijo Azure Content Safety  
- **[MCP Security Controls 2025](./mcp-security-controls-2025.md)** - Najnovejši varnostni nadzori in tehnike za implementacije MCP
- **[MCP Best Practices Quick Reference](./mcp-best-practices.md)** - Hitri referenčni vodič za osnovne varnostne prakse MCP
- **[BlueHat 2026: Securing the future of AI: Securing MCP with defense in depth patterns](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Vzorce obrambe v globino iz Microsoft Security Response Center (MSRC)

### **Praktična varnostna usposabljanja**

- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Celovita praktična delavnica za varovanje MCP strežnikov v Azure z naprednimi kampi od osnovnega do vrhnega
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referenčna arhitektura in navodila za implementacijo vseh OWASP MCP Top 10 tveganj

---

## Kaj sledi

Naslednje: [Poglavje 3: Začetek](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->