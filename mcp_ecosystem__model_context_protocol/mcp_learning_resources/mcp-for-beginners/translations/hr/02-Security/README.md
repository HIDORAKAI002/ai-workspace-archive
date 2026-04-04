# MCP Sigurnost: Sveobuhvatna Zaštita za AI Sustave

[![Najbolje Prakse MCP Sigurnosti](../../../translated_images/hr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite sliku iznad za prikaz video lekcije)_

Sigurnost je temeljni element dizajna AI sustava, zbog čega joj dajemo prioritet u drugom dijelu nastave. To je u skladu s Microsoftovim principom **Sigurnost po dizajnu** iz [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) donosi moćne nove mogućnosti AI aplikacijama dok u isto vrijeme uvodi jedinstvene sigurnosne izazove koji nadilaze tradicionalne rizike softvera. MCP sustavi suočavaju se s utvrđenim sigurnosnim problemima (sigurno kodiranje, najmanji privilegiji, sigurnost opskrbnog lanca), kao i novim specifičnim prijetnjama vezanim uz AI kao što su injekcija naredbi, trovanje alata, presretanje sesije, napadi zbunjenog zastupnika, ranjivosti u prosljeđivanju tokena i dinamičke izmjene ovlasti.

Ova lekcija istražuje najkritičnije sigurnosne rizike u MCP implementacijama—uključujući autentikaciju, autorizaciju, pretjerane ovlasti, indirektnu injekciju naredbi, sigurnost sesije, probleme zbunjenog zastupnika, upravljanje tokenima i ranjivosti opskrbnog lanca. Naučit ćete primjenjive kontrole i najbolje prakse za smanjenje ovih rizika uz korištenje Microsoftovih rješenja poput Prompt Shields, Azure Content Safety i GitHub Advanced Security za jačanje vaše MCP implementacije.

## Ciljevi Učenja

Do kraja lekcije moći ćete:

- **Prepoznati Specifične Prijetnje MCP-a**: Uočiti jedinstvene sigurnosne rizike u MCP sustavima, uključujući injekciju naredbi, trovanje alata, prevelike ovlasti, presretanje sesije, probleme zbunjenog zastupnika, ranjivosti u prosljeđivanju tokena i rizike opskrbnog lanca
- **Primijeniti Sigurnosne Kontrole**: Implementirati učinkovite mjere ublažavanja uključujući robusnu autentikaciju, pristup s najmanjim privilegijama, sigurno upravljanje tokenima, kontrole sigurnosti sesije i verifikaciju opskrbnog lanca
- **Iskoristiti Microsoftova Sigurnosna Rješenja**: Razumjeti i primijeniti Microsoft Prompt Shields, Azure Content Safety i GitHub Advanced Security za zaštitu MCP radnih opterećenja
- **Validirati Sigurnost Alata**: Prepoznati važnost validacije metapodataka alata, nadzirati dinamičke promjene i braniti se od indirektnih napada injekcije naredbi
- **Integrirati Najbolje Prakse**: Kombinirati utvrđene sigurnosne osnove (sigurno kodiranje, jačanje poslužitelja, zero trust) s MCP specifičnim kontrolama za sveobuhvatnu zaštitu

# MCP Sigurnosna Arhitektura i Kontrole

Moderne MCP implementacije zahtijevaju slojevite sigurnosne pristupe koji pokrivaju i tradicionalnu sigurnost softvera i AI specifične prijetnje. Brzo razvijajuća MCP specifikacija kontinuirano usavršava svoje sigurnosne kontrole, omogućujući bolju integraciju s arhitekturama korporativne sigurnosti i ustaljenim najboljim praksama.

Istraživanje iz [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazuje da bi **98% prijavljenih proboja bilo spriječeno robusnom sigurnosnom higijenom**. Najefikasnija strategija zaštite kombinira temeljne sigurnosne prakse s MCP specifičnim kontrolama—dokazane sigurnosne mjere na osnovnoj razini ostaju najvažniji faktor u smanjenju ukupnog sigurnosnog rizika.

## Trenutno Sigurnosno Okruženje

> **Napomena:** Ove informacije odražavaju MCP sigurnosne standarde na dan **5. veljače 2026.**, usklađene s **MCP Specifikacijom 2025-11-25**. MCP protokol se i dalje brzo razvija, a buduće implementacije mogu uvesti nove obrasce autentikacije i poboljšane kontrole. Uvijek se referirajte na aktualnu [MCP Specifikaciju](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitorij](https://github.com/modelcontextprotocol) i [dokumentaciju najboljih sigurnosnih praksi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovije smjernice.

## 🏔️ MCP Sigurnosni Summit Radionica (Sherpa)

Za **praktičnu obuku iz sigurnosti**, toplo preporučamo **MCP Sigurnosnu Summit Radionicu** (Sherpa)—sveobuhvatnu vođenu ekspediciju za osiguravanje MCP poslužitelja u Microsoft Azure okruženju.

### Pregled Radionice

[MCP Sigurnosna Summit Radionica](https://azure-samples.github.io/sherpa/) pruža praktičnu, primjenjivu obuku kroz dokazanu metodologiju "ranjivost → iskorištavanje → popravak → validacija". Naučit ćete:

- **Učiti Kroz Razbijanje Sustava**: Iskusite ranjivosti iz prve ruke iskorištavanjem namjerno nesigurnih poslužitelja
- **Korištenje Sigurnosti u Azure-u**: Iskoristite Azure Entra ID, Key Vault, API Management i AI Content Safety
- **Slijediti Obranu u Dubinu**: Prođite kroz kampove gradeći slojevite sigurnosne slojeve
- **Primijeniti OWASP Standarde**: Svaka tehnika mapirana je na [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Dobiti Proizvodni Kod**: Završite s radnim, testiranim implementacijama

### Ruta Ekspedicije

| Kamp | Fokus | OWASP Rizici Obuhvaćeni |
|------|-------|------------------------|
| **Baza Kampa** | MCP osnove i ranjivosti autentikacije | MCP01, MCP07 |
| **Kamp 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Gateway** | API Management, Privatni Endpoints, upravljanje | MCP02, MCP07, MCP09 |
| **Kamp 3: Sigurnost Ulaza/Izlaza** | Injekcija naredbi, zaštita PII, sigurnost sadržaja | MCP03, MCP05, MCP06 |
| **Kamp 4: Nadzor** | Log Analitika, nadzorne ploče, detekcija prijetnji | MCP08 |
| **Summit** | Red Team / Blue Team integracijski test | Sve |

**Započni**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 Sigurnosnih Rizika

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detaljno opisuje deset najkritičnijih sigurnosnih rizika za MCP implementacije:

| Rizik | Opis | Azure Ublažavanje |
|-------|------|-------------------|
| **MCP01** | Nepravilno upravljanje tokenima i izloženost tajni | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacija privilegija kroz proširenje opsega | RBAC, Conditional Access |
| **MCP03** | Trovanje alata | Validacija alata, provjera integriteta |
| **MCP04** | Napadi na opskrbni lanac | GitHub Advanced Security, skeniranje ovisnosti |
| **MCP05** | Injekcija i izvršavanje naredbi | Validacija unosa, sandboxing |
| **MCP06** | Injekcija naredbi putem kontekstualnih podataka | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatak autentikacije i autorizacije | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatak audita i telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Sjenoviti MCP poslužitelji | API Center upravljanje, mrežna izolacija |
| **MCP10** | Injekcija konteksta i pretjerano dijeljenje | Klasifikacija podataka, minimalna izloženost |

### Evolucija MCP Autentikacije

MCP specifikacija značajno je evoluirala u pristupu autentikaciji i autorizaciji:

- **Izvorni Pristup**: Rane specifikacije zahtijevale su od developera implementaciju vlastitih servera za autentikaciju, pri čemu su MCP serveri djelovali kao OAuth 2.0 Authorization Servers koji upravljaju korisničkom autentikacijom izravno
- **Trenutni Standard (2025-11-25)**: Ažurirana specifikacija dopušta MCP serverima delegiranje autentikacije eksternim identity providerima (kao što je Microsoft Entra ID), čime se poboljšava sigurnosni položaj i smanjuje složenost implementacije
- **Sigurnost Transportnog Sloja**: Povećana podrška za sigurne transportne mehanizme s pravilnim obrascima autentikacije za lokalne (STDIO) i udaljene (Streamable HTTP) konekcije

## Sigurnost Autentikacije i Autorizacije

### Trenutni Sigurnosni Izazovi

Moderne MCP implementacije suočavaju se s nekoliko izazova u autentikaciji i autorizaciji:

### Rizici i Napadni Vektori

- **Pogrešno Konfigurirana Autorizacijska Logika**: Pogreške u autorizacijskoj implementaciji MCP servera mogu izložiti osjetljive podatke i nepravilno primijeniti kontrole pristupa
- **Kompromitacija OAuth Tokena**: Krađa tokena s lokalnog MCP servera omogućuje napadačima da se lažno predstavljaju kao poslužitelji i pristupaju nizvodnim uslugama
- **Ranjivosti u Prosljeđivanju Tokena**: Neispravno rukovanje tokenima stvara zaobilaženja sigurnosnih kontrola i praznine u odgovornosti
- **Pretjerane Ovlasti**: MCP serveri s prevelikim ovlastima krše principe najmanjih privilegija i povećavaju površinu napada

#### Prosljeđivanje Tokena: Kritičan Antipattern

**Prosljeđivanje tokena je izričito zabranjeno** u trenutnoj MCP autorizacijskoj specifikaciji zbog teških sigurnosnih implikacija:

##### Zaobilaženje Sigurnosnih Kontrola
- MCP serveri i nizvodni API-i provode ključne sigurnosne kontrole (ograničenje brzine, validaciju zahtjeva, nadzor prometa) koje ovise o ispravnoj validaciji tokena
- Izravna uporaba tokena od klijenta prema API-u zaobilazi ove ključne zaštite, narušavajući sigurnosnu arhitekturu

##### Problemi s Odgovornošću i Auditom  
- MCP serveri ne mogu razlikovati klijente koji koriste token proveden iz upstream izvora, čime se prekidaju auditni tragovi
- Dnevnici nizvodnih poslužitelja prikazuju zavaravajuće izvore zahtjeva umjesto stvarnih MCP server posrednika
- Istrage incidenata i revizije usklađenosti postaju znatno teže

##### Rizik Eksfiltracije Podataka
- Nevalidirani zahtjevi u tokenima omogućuju zlonamjernim akterima sa ukradenim tokenima da koriste MCP servere kao proxy za krađu podataka
- Povrede granice povjerenja omogućuju neautorizirane obrasce pristupa koji zaobilaze namjerene sigurnosne kontrole

##### Vektori Napada na Više Usluga
- Kompromitirani tokeni prihvaćeni od strane više usluga omogućuju lateralno kretanje kroz povezane sustave
- Predpostavke povjerenja među uslugama mogu biti narušene kada se ne može potvrditi izvor tokena

### Sigurnosne Kontrole i Ublažavanja

**Kritični Sigurnosni Zahtjevi:**

> **OBAVEZNO**: MCP serveri **NE SMIJU** prihvaćati tokene koji nisu izričito izdani za taj MCP server

#### Kontrole Autentikacije i Autorizacije

- **Temeljita Revizija Autorizacije**: Provedite sveobuhvatne audite autorizacijske logike MCP servera kako biste osigurali da samo namjenski korisnici i klijenti mogu pristupiti osjetljivim resursima
  - **Vodič za Implementaciju**: [Azure API Management kao Gateway Autentikacije za MCP Poslužitelje](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracija Identiteta**: [Korištenje Microsoft Entra ID za MCP Server Autentikaciju](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sigurno Upravljanje Tokenima**: Primijenite [Microsoftove najbolje prakse za validaciju tokena i njihov životni ciklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validirajte da tvrdnje tokena za publiku odgovaraju identitetu MCP servera
  - Implementirajte pravilne politike rotacije i isteka tokena
  - Spriječite napade ponavljanja tokena i neovlaštenu upotrebu

- **Zaštićeno Pohranjivanje Tokena**: Osigurajte pohranu tokena enkripcijom u mirovanju i tijekom prijenosa
  - **Najbolje Prakse**: [Smjernice za Sigurno Pohranjivanje i Enkripciju Tokena](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementacija Kontrole Pristupa

- **Princip Najmanjih Privilegija**: Dodijelite MCP serverima samo minimalne potrebne ovlasti za namijenjenu funkcionalnost
  - Redoviti pregledi i ažuriranja prava kako bi se spriječila eskalacija ovlasti
  - **Microsoft Dokumentacija**: [Siguran Pristup s Najmanjim Privilegijama](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Upravljanje Pristupom Temeljeno na Ulogama (RBAC)**: Implementirajte detaljne dodjele uloga
  - Ograničite uloge na specifične resurse i radnje
  - Izbjegavajte široke ili nepotrebne ovlasti koje povećavaju napadnu površinu

- **Kontinuirani Nadzor Ovlasti**: Implementirajte trajnu reviziju i nadzor pristupa
  - Pratite obrasce korištenja ovlasti radi uočavanja anomalija
  - Pravovremeno uklonite pretjerane ili neiskorištene ovlasti

## AI Specifične Sigurnosne Prijetnje

### Napadi Indirektne Injekcije Naredbi i Manipulacije Alatima

Moderne MCP implementacije suočavaju se sa sofisticiranim AI-specifičnim vektorima napada koje tradicionalne sigurnosne mjere ne mogu u potpunosti adresirati:

#### **Indirektna Injekcija Naredbi (Cross-Domain Prompt Injection)**

**Indirektna Injekcija Naredbi** predstavlja jednu od najkritičnijih ranjivosti u AI sustavima s MCP-om. Napadači ugrađuju zlonamjerne upute unutar vanjskog sadržaja—dokumenata, web stranica, emailova ili izvora podataka—koje AI sustavi nakon toga procesuiraju kao legitimne naredbe.

**Scenariji Napada:**
- **Injekcija Temeljena na Dokumentima**: Zlonamjerne upute skrivene u obrađenim dokumentima koje pokreću neželjene AI radnje
- **Iskorištavanje Web Sadržaja**: Kompromitirane web stranice sa ugrađenim promptovima koji manipuliraju AI ponašanjem prilikom preuzimanja podataka
- **Napadi putem Emaila**: Zlonamjerni promptovi u emailovima koji uzrokuju da AI asistenti ispuštaju informacije ili izvode neovlaštene radnje
- **Kontaminacija Izvora Podataka**: Kompromitirane baze podataka ili API-ji koji poslužuju zagađeni sadržaj AI sustavima

**Pravi Utjecaj:** Ovi napadi mogu rezultirati eksfiltracijom podataka, kršenjem privatnosti, generiranjem štetnog sadržaja i manipulacijom korisničkim interakcijama. Za detaljnu analizu pogledajte [Prompt Injection u MCP-u (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Dijagram napada injekcije naredbi](../../../translated_images/hr/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi Trovanja Alata**

**Trovanje Alata** cilja na metapodatke koji definiraju MCP alate, iskorištavajući način na koji LLM-ovi interpretiraju opise alata i parametre za donošenje odluka o izvršenju.

**Mehanizmi Napada:**
- **Manipulacija Metapodacima**: Napadači ubrizgavaju zlonamjerne upute u opise alata, definicije parametara ili primjere uporabe
- **Nevidljive Upute**: Skriveni promptovi u metapodacima alata koje AI modeli procesuiraju, a ljudski korisnici ne vide
- **Dinamička Izmjena Alata ("Rug Pulls")**: Alati koje su korisnici odobrili kasnije se mijenjaju za izvođenje zlonamjernih radnji bez znanja korisnika
- **Injekcija Parametara**: Zlonamjerni sadržaj ugrađen u sheme parametara alata koji utječu na ponašanje modela

**Rizici Hostiranih Poslužitelja:** Udaljeni MCP serveri predstavljaju povišen rizik jer se definicije alata mogu ažurirati nakon početnog odobrenja korisnika, stvarajući scenarije u kojima prethodno sigurni alati postaju zlonamjerni. Za sveobuhvatnu analizu pogledajte [Napadi Trovanja Alata (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Dijagram napada injekcije alata](../../../translated_images/hr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni AI Vektori Napada**

- **Cross-Domain Prompt Injection (XPIA)**: Sofisticirani napadi koji koriste sadržaj iz više domena zaobilaženjem sigurnosnih kontrola
- **Dinamična modifikacija mogućnosti**: Promjene u mogućnostima alata u stvarnom vremenu koje izmiču početnim sigurnosnim procjenama  
- **Trovanje kontekstnog prozora**: Napadi koji manipuliraju velikim kontekstnim prozorima kako bi sakrili zlonamjerne upute  
- **Napadi zbunjivanja modela**: Iskorištavanje ograničenja modela za stvaranje nepredvidivog ili nesigurnog ponašanja  


### Utjecaj rizika AI sigurnosti

**Posljedice velikog utjecaja:**  
- **Eksfiltracija podataka**: Neovlašteni pristup i krađa osjetljivih podataka poduzeća ili osobnih podataka  
- **Povreda privatnosti**: Izlaganje osobnih identifikacijskih podataka (PII) i povjerljivih poslovnih podataka  
- **Manipulacija sustavom**: Nenamjerne izmjene kritičnih sustava i tijekova rada  
- **Krađa vjerodajnica**: Kompromitiranje tokena za autentifikaciju i vjerodajnica usluga  
- **Lateralno kretanje**: Korištenje kompromitiranih AI sustava kao polazišta za šire mrežne napade  

### Microsoft AI sigurnosna rješenja

#### **AI Prompt Shields: Napredna zaštita protiv napada ubrizgavanja**

Microsoft **AI Prompt Shields** pruža sveobuhvatnu obranu od direktnih i indirektnih napada ubrizgavanja promptova kroz više sigurnosnih slojeva:

##### **Temeljni zaštitni mehanizmi:**

1. **Napredno otkrivanje i filtriranje**  
   - Algoritmi strojnog učenja i NLP tehnike otkrivaju zlonamjerne upute u vanjskom sadržaju  
   - Analiza u stvarnom vremenu dokumenata, web stranica, e-pošte i izvora podataka na ugrađene prijetnje  
   - Kontekstualno razumijevanje legitimnih nasuprot zlonamjernim obrascima promptova  

2. **Tehnike isticanja**  
   - Razlikuje pouzdane sistemske upute od potencijalno kompromitiranih vanjskih unosa  
   - Metode transformacije teksta koje povećavaju relevantnost modela dok izoliraju zlonamjerni sadržaj  
   - Pomaže AI sustavima da održavaju ispravnu hijerarhiju uputa i ignoriraju ubrizgane naredbe  

3. **Sustavi graničnika i označavanja podataka**  
   - Jasno definira granice između pouzdanih sistemskih poruka i vanjskog unosa teksta  
   - Posebni markeri ističu granice između pouzdanih i nepouzdanih izvora podataka  
   - Jasna razdvojenost sprječava nesporazum u uputama i neovlaštenu izvedbu naredbi  

4. **Kontinuirana obavještajna sigurnost**  
   - Microsoft kontinuirano prati nove obrasce napada i ažurira obrane  
   - Proaktivno traženje prijetnji novih tehnika ubrizgavanja i vektora napada  
   - Redovita ažuriranja sigurnosnih modela za održavanje učinkovitosti protiv evoluirajućih prijetnji  

5. **Integracija Azure Content Safety**  
   - Dio sveobuhvatnog Azure AI Content Safety paketa  
   - Dodatno otkrivanje pokušaja jailbreaka, štetnog sadržaja i kršenja sigurnosnih pravila  
   - Ujednačena sigurnosna pravila u svim komponentama AI aplikacija  

**Resursi za implementaciju**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/hr/prompt-shield.ff5b95be76e9c78c.webp)


## Napredni MCP sigurnosni rizici

### Ranljivosti preuzimanja sesije

**Preuzimanje sesije** predstavlja kritični napadni vektor u implementacijama stateful MCP-a gdje neovlaštene strane pribavljaju i zloupotrebljavaju legitimne identifikatore sesija za lažno predstavljanje klijenata i izvođenje neovlaštenih radnji.

#### **Scenariji napada i rizici**

- **Ubrizgavanje naredbi preuzete sesije**: Napadači sa ukradenim ID-evima sesija ubrizgavaju zlonamjerne događaje u servere koji dijele stanje sesije, potencijalno pokrećući štetne radnje ili pristup osjetljivim podacima  
- **Izravno lažno predstavljanje**: Ukradeni ID-evi sesije omogućuju izravne pozive MCP serveru bez autentifikacije, tretirajući napadače kao legitimne korisnike  
- **Kompromitirani nastavljivi tokovi**: Napadači mogu prerano zaustaviti zahtjeve, što omogućuje legitimnim klijentima nastavak sa potencijalno zlonamjernim sadržajem  

#### **Sigurnosne kontrole za upravljanje sesijama**

**Kritični zahtjevi:**  
- **Verifikacija autorizacije**: MCP serveri koji implementiraju autorizaciju **MORAJU** provjeravati SVE dolazne zahtjeve i **NE SMIJU** se oslanjati na sesije za autentifikaciju  
- **Sigurna generacija sesija**: Koristiti kriptografski sigurne, nedeterminističke ID-eve sesija generirane sigurnim generatorima slučajnih brojeva  
- **Povezivanje s korisnikom**: Povezati ID-eve sesija s podacima specifičnim za korisnika koristeći formate poput `<user_id>:<session_id>` za sprječavanje zloupotrebe između korisnika  
- **Upravljanje životnim ciklusom sesije**: Implementirati odgovarajuće isteke, rotacije i poništenja da se ograniče ranjiva razdoblja  
- **Sigurnost prijenosa**: Obavezni HTTPS za svu komunikaciju radi sprečavanja presretanja ID-eva sesije  

### Problem zbunjenog zamjenika (Confused Deputy)

**Problem zbunjenog zamjenika** javlja se kada MCP serveri djeluju kao proxy za autentifikaciju između klijenata i usluga trećih strana, stvarajući mogućnosti za zaobilaženje autorizacije iskorištavanjem statičnih client ID-eva.

#### **Mehanika napada i rizici**

- **Zaobilaženje pristanka na temelju kolačića**: Prethodna korisnička autentifikacija stvara cookies za pristanak koje napadači iskorištavaju putem zlonamjernih zahtjeva za autorizaciju s izradenim URI-jevima za preusmjeravanje  
- **Krađa autorizacijskog koda**: Postojeći cookies pristanka mogu uzrokovati da autorizacijski server preskoči zaslone pristanka, preusmjeravajući kodove na endpointove pod kontrolom napadača  
- **Neovlašteni pristup API-ju**: Ukradeni kodovi autorizacije omogućuju razmjenu tokena i lažno predstavljanje korisnika bez izričitog odobrenja  

#### **Strategije ublažavanja**

**Obavezne kontrole:**  
- **Izričiti zahtjevi za pristanak**: MCP proxy serveri koji koriste statične client ID-eve **MORAJU** dobiti pristanak korisnika za svakog dinamički registriranog klijenta  
- **Sigurnosna implementacija OAuth 2.1**: Slijediti trenutne najbolje prakse za sigurnost OAuth, uključujući PKCE (Proof Key for Code Exchange) za sve zahtjeve autorizacije  
- **Stroga validacija klijenata**: Implementirati rigoroznu validaciju URI-jeva za preusmjeravanje i identifikatora klijenata radi sprječavanja zloupotrebe  

### Ranljivosti token prolaza (Token Passthrough)

**Token passthrough** predstavlja eksplicitan antipattern gdje MCP serveri prihvaćaju token klijenta bez odgovarajuće validacije i prosljeđuju ih nizvodnim API-jima, kršeći MCP specifikacije autorizacije.

#### **Sigurnosne implikacije**

- **Zaobilaženje kontrole**: Izravna upotreba tokena klijenta prema API-ju zaobilazi ključne kontrole ograničavanja brzine, validacije i nadzora  
- **Kvar revizijskog traga**: Tokeni izdani pri vrhu onemogućuju identifikaciju klijenta, što onemogućuje istrage incidenta  
- **Eksfiltracija podataka putem proxyja**: Neprovjereni tokeni dopuštaju zlonamjernim akterima korištenje servera kao proxyja za neovlašteni pristup podacima  
- **Kršenja sigurnosnih granica povjerenja**: Pretpostavke povjerenja nizvodnih usluga mogu biti prekršene ako se ne može potvrditi podrijetlo tokena  
- **Proširenje napada na više usluga**: Kompromitirani tokeni prihvaćeni preko više usluga omogućuju lateralno širenje napada  

#### **Potrebne sigurnosne kontrole**

**Nezaobilazni zahtjevi:**  
- **Validacija tokena**: MCP serveri **NE SMIJU** prihvaćati tokene koji nisu eksplicitno izdani za MCP server  
- **Verifikacija publike**: Uvijek provjeravati da audience tvrdnje tokena odgovaraju identitetu MCP servera  
- **Upravljanje životnim ciklusom tokena**: Implementirati kratkotrajne pristupne tokene s praksama sigurne rotacije  


## Sigurnost lanceva opskrbe za AI sustave

Sigurnost lanceva opskrbe evoluirala je izvan tradicionalnih softverskih ovisnosti i obuhvaća cijeli AI ekosustav. Moderne implementacije MCP-a moraju rigorozno verificirati i nadzirati sve AI povezane komponente jer svaka uvodi potencijalne ranjivosti koje mogu ugroziti integritet sustava.

### Proširene komponente AI lanceva opskrbe

**Tradicionalne softverske ovisnosti:**  
- Open-source biblioteke i okviri  
- Container slike i bazni sustavi  
- Razvojni alati i build pipeline-i  
- Infrastrukturne komponente i usluge  

**AI-specifični elementi lanceva opskrbe:**  
- **Temeljni modeli**: Prethodno trenirani modeli od različitih pružatelja, zahtijevaju verifikaciju izvora  
- **Usluge ugrađivanja (embedding)**: Vanjske usluge vektorizacije i semantičkog pretraživanja  
- **Pružatelji konteksta**: Izvori podataka, baze znanja i repozitoriji dokumenata  
- **API-ji trećih strana**: Vanjske AI usluge, ML pipeline-i i endpointi za obradu podataka  
- **Artefakti modela**: Težine, konfiguracije i varijante modela s fajn-tjuniranjem  
- **Izvori podataka za treniranje**: Skupovi podataka korišteni za treniranje i fajn-tjuniranje modela  

### Sveobuhvatna strategija sigurnosti lanceva opskrbe

#### **Verifikacija komponenti i povjerenje**  
- **Validacija podrijetla**: Provjeriti podrijetlo, licencu i integritet svih AI komponenti prije integracije  
- **Sigurnosna procjena**: Izvršiti skeniranje ranjivosti i sigurnosne preglede za modele, izvore podataka i AI usluge  
- **Analiza reputacije**: Procijeniti sigurnosni dosje i prakse pružatelja AI usluga  
- **Provjera usklađenosti**: Osigurati da sve komponente zadovoljavaju organizacijske sigurnosne i regulatorne zahtjeve  

#### **Sigurni deployment pipeline-i**  
- **Automatizirana sigurnost CI/CD**: Integrirati skeniranje sigurnosti kroz automatizirane pipeline-e za isporuku  
- **Integritet artefakata**: Implementirati kriptografske potvrde za sve distribuirane artefakte (kod, modeli, konfiguracije)  
- **Postupni deployment**: Koristiti progresivne strategije isporuke sa sigurnosnim provjerama na svakoj fazi  
- **Pouzdani repozitoriji artefakata**: Isporuka samo iz verificiranih, sigurnih repozitorija i registara  

#### **Kontinuirani nadzor i odgovor**  
- **Skeniranje ovisnosti**: Stalni nadzor ranjivosti svih softverskih i AI komponenti  
- **Nadzor modela**: Kontinuirana procjena ponašanja modela, promjena performansi i sigurnosnih anomalija  
- **Praćenje zdravlja usluga**: Nadzor vanjskih AI usluga na dostupnost, sigurnosne incidente i promjene politika  
- **Integracija prijetnji i prijetnje obavještaja**: Uključivanje tokova prijetnji specifičnih za AI i ML sigurnosne rizike  

#### **Kontrola pristupa i princip najmanjih privilegija**  
- **Dozvole na razini komponenti**: Ograničiti pristup modelima, podacima i uslugama samo na poslovnu nužnost  
- **Upravljanje servisnim računima**: Implementirati specifične servisne račune s minimalnim potrebnim dozvolama  
- **Segmentacija mreže**: Izolirati AI komponente i ograničiti mrežni pristup među uslugama  
- **Kontrole API gateway-a**: Koristiti centralizirane API gateway-je za kontrolu i nadzor pristupa vanjskim AI uslugama  

#### **Postupci za odgovor na incidente i oporavak**  
- **Brza reakcija**: Uspostavljeni postupci za zakrpe ili zamjenu kompromitiranih AI komponenti  
- **Rotacija vjerodajnica**: Automatizirani sustavi za rotaciju tajni, API ključeva i vjerodajnica usluga  
- **Mogućnost povratka**: Sposobnost brzog vraćanja na prethodne provjerene verzije AI komponenti  
- **Oporavak od lanca opskrbe**: Specifični postupci za odgovor na kompromitacije AI usluga u lancu opskrbe  

### Microsoft sigurnosni alati i integracija

**GitHub Advanced Security** pruža sveobuhvatnu zaštitu lanceva opskrbe uključujući:  
- **Skeniranje tajni**: Automatizirano otkrivanje vjerodajnica, API ključeva i tokena u repozitorijima  
- **Skeniranje ovisnosti**: Procjena ranjivosti otvorenih ovisnosti i biblioteka  
- **CodeQL analiza**: Statička analiza koda za sigurnosne ranjivosti i koderske probleme  
- **Uvidi u lanceve opskrbe**: Vidljivost zdravlja ovisnosti i sigurnosnog statusa  

**Integracija Azure DevOps-a i Azure Reposa:**  
- Besprijekorna integracija sigurnosnog skeniranja u Microsoft razvojne platforme  
- Automatizirane sigurnosne provjere u Azure Pipelines za AI radna opterećenja  
- Provedba politika za sigurno postavljanje AI komponenti  

**Microsoft interne prakse:**  
Microsoft implementira opsežne prakse sigurnosti lanceva opskrbe u svim proizvodima. Saznajte više o provjerenim pristupima u [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najbolje prakse temeljne sigurnosti

Implementacije MCP-a nasljeđuju i nadograđuju postojeći sigurnosni položaj vaše organizacije. Jačanjem temeljnih sigurnosnih praksi značajno se poboljšava ukupna sigurnost AI sustava i MCP implementacija.

### Temeljni sigurnosni principi

#### **Sigurne razvojne prakse**  
- **USKLADNOST S OWASP-om**: Zaštita od [OWASP Top 10](https://owasp.org/www-project-top-ten/) ranjivosti web aplikacija  
- **AI-specifične zaštite**: Implementacija kontrola za [OWASP Top 10 za LLM](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sigurno upravljanje tajnama**: Korištenje namjenskih vaultova za tokene, API ključeve i osjetljive konfiguracije  
- **End-to-end enkripcija**: Osigurajte sigurnu komunikaciju u svim komponentama aplikacije i tokovima podataka  
- **Validacija unosa**: Stroga provjera svih korisničkih unosa, API parametara i izvora podataka  

#### **Ojačanje infrastrukture**  
- **Višefaktorska autentifikacija**: Obavezna MFA za sve administrativne i servisne račune  
- **Upravljanje zakrpama**: Automatizirano i pravovremeno zakrpanje operacijskih sustava, okvira i ovisnosti  
- **Integracija s pružateljima identiteta**: Centralizirano upravljanje identitetom putem enterprise pružatelja (Microsoft Entra ID, Active Directory)  
- **Segmentacija mreže**: Logička izolacija MCP komponenti za ograničavanje potencijala lateralnog kretanja  
- **Načelo najmanjih privilegija**: Minimalno potrebne dozvole za sve komponente sustava i račune  

#### **Nadzor i otkrivanje sigurnosti**  
- **Sveobuhvatno logiranje**: Detaljno bilježenje aktivnosti AI aplikacija, uključujući interakcije MCP klijent-server  
- **Integracija SIEM-a**: Centralizirano upravljanje informacijama o sigurnosti i događajima za otkrivanje anomalija  
- **Analitika ponašanja**: AI-pokretan nadzor za otkrivanje neobičnih obrazaca u ponašanju sustava i korisnika  
- **Obavještajni podaci o prijetnjama**: Uključivanje vanjskih tokova podataka o prijetnjama i indikatora kompromitiranja (IOC)  
- **Odgovor na incidente**: Dobro definirani postupci za otkrivanje, odgovor i oporavak od sigurnosnih incidenata  

#### **Zero Trust arhitektura**  
- **Nikada ne vjeruj, uvijek provjeri**: Kontinuirana provjera korisnika, uređaja i mrežnih veza  
- **Mikrosegmentacija**: Granularna mrežna kontrola koja izolira pojedinačne workload-e i usluge  
- **Identitetno-orijentirana sigurnost**: Sigurnosne politike temeljene na verificiranim identitetima umjesto mrežnih lokacija  
- **Kontinuirana procjena rizika**: Dinamičko vrednovanje sigurnosnog stanja na temelju trenutnog konteksta i ponašanja  
- **Uvjetni pristup**: Kontrole pristupa koje se prilagođavaju na temelju čimbenika rizika, lokacije i povjerenja uređaja  

### Uzorci integracije u poduzeću

#### **Integracija Microsoft sigurnosnog ekosustava**  
- **Microsoft Defender for Cloud**: Sveobuhvatno upravljanje sigurnosnim položajem u oblaku  
- **Azure Sentinel**: Izvorni SIEM i SOAR u oblaku za zaštitu AI radnih opterećenja  
- **Microsoft Entra ID**: Enterprise upravljanje identitetom i pristupom s politikama uvjetnog pristupa  
- **Azure Key Vault**: Centralizirano upravljanje tajnama uz hardverski sigurnosni modul (HSM)  
- **Microsoft Purview**: Upravljanje podacima i usklađenost za AI izvore podataka i tijekove rada  

#### **Usklađenost i upravljanje**  
- **Regulatorna usklađenost**: Osigurati da MCP implementacije zadovoljavaju industrijske zahtjeve (GDPR, HIPAA, SOC 2)  
- **Klasifikacija podataka**: Ispravna kategorizacija i rukovanje osjetljivim podacima koje obrađuju AI sustavi  
- **Revizijski tragovi**: Sveobuhvatno bilježenje za regulatorne potrebe i forenzičke istrage  
- **Kontrole privatnosti**: Implementacija principa privatnosti po dizajnu u arhitekturi AI sustava  
- **Upravljanje promjenama**: Formalni procesi za sigurnosne preglede promjena u AI sustavima  

Ove temeljne prakse stvaraju čvrst sigurnosni temelj koji pojačava učinkovitost MCP-specifičnih sigurnosnih kontrola i pruža sveobuhvatnu zaštitu AI-pokretanim aplikacijama.
## Ključne sigurnosne lekcije

- **Slojeviti sigurnosni pristup**: Kombinirajte temeljne sigurnosne prakse (sigurno kodiranje, najmanje privilegije, provjeru lanca opskrbe, kontinuirano nadzor) s kontrolama specifičnim za AI za sveobuhvatnu zaštitu

- **Specifični AI prijetnje**: MCP sustavi suočavaju se s jedinstvenim rizicima kao što su ubrizgavanje promptova, trovanje alata, preuzimanje sesije, problemi zbunjenog zastupnika, ranjivosti prijenosa tokena i prekomjerne dozvole koje zahtijevaju specijalizirane mjere ublažavanja

- **Izvrsnost u autentifikaciji i autorizaciji**: Provedite robusnu autentifikaciju korištenjem vanjskih davatelja identiteta (Microsoft Entra ID), primijenite pravilnu provjeru tokena i nikada ne prihvaćajte tokene koji nisu izričito izdani za vaš MCP poslužitelj

- **Sprječavanje AI napada**: Implementirajte Microsoft Prompt Shields i Azure Content Safety za obranu od indirektnog ubrizgavanja promptova i trovanja alata, uz validaciju metapodataka alata i nadzor dinamičkih promjena

- **Sigurnost sesija i prijenosa**: Koristite kriptografski sigurne, nedeterminističke ID-e sesija povezane s identitetom korisnika, provedite pravilno upravljanje životnim ciklusom sesija i nikada ne koristite sesije za autentifikaciju

- **Najbolje prakse sigurnosti OAuth-a**: Spriječite napade zbunjenog zastupnika eksplicitnim pristankom korisnika za dinamički registrirane klijente, pravilnom implementacijom OAuth 2.1 s PKCE i strogo validiranim URI-jem preusmjeravanja

- **Načela sigurnosti tokena**: Izbjegavajte anti-uzorke prijenosa tokena, provjeravajte tvrdnje o publici tokena, implementirajte kratkotrajne tokene s sigurnom rotacijom i održavajte jasne granice povjerenja

- **Sveobuhvatna sigurnost lanca opskrbe**: Postupajte sa svim komponentama AI ekosustava (modeli, ugradnje, pružatelji konteksta, vanjski API-ji) s istom sigurnosnom strogosti kao i tradicionalnim softverskim ovisnostima

- **Neprestana evolucija**: Budite u tijeku s brzo razvijajućim MCP specifikacijama, doprinesite sigurnosnim standardima zajednice i održavajte prilagodljive sigurnosne posture kako se protokol razvija

- **Integracija sigurnosti Microsofta**: Iskoristite sveobuhvatan sigurnosni ekosustav Microsofta (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za pojačanu zaštitu implementacije MCP-a

## Sveobuhvatni resursi

### **Službena MCP sigurnosna dokumentacija**
- [MCP specifikacija (Trenutno: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP najbolje sigurnosne prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP specifikacija autorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitorij](https://github.com/modelcontextprotocol)

### **OWASP MCP sigurnosni resursi**
- [OWASP MCP Azure sigurnosni vodič](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s uputama za implementaciju na Azureu
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Službene OWASP MCP sigurnosne prijetnje
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka za MCP na Azureu

### **Sigurnosni standardi i najbolje prakse**
- [OAuth 2.0 najbolje sigurnosne prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 sigurnosti web aplikacija](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 za modele velikih jezika](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense izvještaj](https://aka.ms/mddr)

### **Istraživanje i analiza AI sigurnosti**
- [Ubrizgavanje promptova u MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Napadi trovanja alata (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP sigurnosno istraživanje (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft sigurnosna rješenja**
- [Microsoft Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety servis](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID sigurnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure najbolje prakse upravljanja tokenima](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodiči za implementaciju i tutorijali**
- [Azure API Management kao MCP autentifikacijski gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentifikacija s MCP poslužiteljima](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Sigurna pohrana i enkripcija tokena (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps i sigurnost lanca opskrbe**
- [Azure DevOps sigurnost](https://azure.microsoft.com/products/devops)
- [Azure Repos sigurnost](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft put prema sigurnosti lanca opskrbe](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna sigurnosna dokumentacija**

Za sveobuhvatne sigurnosne smjernice, pogledajte ove specijalizirane dokumente u ovom odjeljku:

- **[MCP najbolje sigurnosne prakse 2025](./mcp-security-best-practices-2025.md)** - Potpune najbolje sigurnosne prakse za MCP implementacije
- **[Implementacija Azure Content Safety](./azure-content-safety-implementation.md)** - Primjeri praktične implementacije integracije Azure Content Safety  
- **[MCP sigurnosne kontrole 2025](./mcp-security-controls-2025.md)** - Najnovije sigurnosne kontrole i tehnike za MCP implementacije
- **[MCP najbolje prakse referenca](./mcp-best-practices.md)** - Brzi vodič za ključne MCP sigurnosne prakse

### **Praktična sigurnosna obuka**

- **[MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/)** - Sveobuhvatna praktična radionica za osiguravanje MCP poslužitelja na Azureu s progresivnim kampovima od osnove do vrhunca
- **[OWASP MCP Azure sigurnosni vodič](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentna arhitektura i upute za implementaciju za sve OWASP MCP Top 10 rizike

---

## Što slijedi

Sljedeće: [Poglavlje 3: Početak](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati službenim izvorom. Za važne informacije preporučuje se profesionalan ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazuma ili pogrešna tumačenja nastala korištenjem ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->