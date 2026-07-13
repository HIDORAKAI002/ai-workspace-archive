# MCP Sigurnost: Sveobuhvatna Zaštita za AI Sustave

[![MCP Security Best Practices](../../../translated_images/hr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na sliku iznad za pregled videa ove lekcije)_

Sigurnost je temeljna za dizajn AI sustava, zbog čega ju ističemo kao naš drugi dio. Ovo se podudara s Microsoftovim principom **Secure by Design** iz [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) donosi moćne nove mogućnosti za AI-pokretane aplikacije, istovremeno uvodeći jedinstvene sigurnosne izazove koji prelaze tradicionalne softverske rizike. MCP sustavi se suočavaju i sa etabliranim sigurnosnim problemima (sigurno kodiranje, načelo najmanjih privilegija, sigurnost lanca opskrbe) i s novim specifičnim AI prijetnjama uključujući ubrizgavanje prompta, trovanje alata, otmicu sesija, napade zbunjenog posrednika, ranjivosti prijenosa tokena i dinamičke izmjene sposobnosti.

Ova lekcija istražuje najkritičnije sigurnosne rizike u MCP implementacijama—obuhvaćajući autentikaciju, autorizaciju, prekomjerne dozvole, indirektno ubrizgavanje prompta, sigurnost sesija, probleme zbunjenog posrednika, upravljanje tokenima i ranjivosti lanca opskrbe. Naučit ćete primjenjive kontrole i najbolje prakse za ublažavanje ovih rizika, uz korištenje Microsoftovih rješenja kao što su Prompt Shields, Azure Content Safety i GitHub Advanced Security za jačanje vaše MCP implementacije.

## Ciljevi učenja

Na kraju ove lekcije moći ćete:

- **Prepoznati specifične prijetnje MCP-u**: Uočiti jedinstvene sigurnosne rizike u MCP sustavima uključujući ubrizgavanje prompta, trovanje alata, prekomjerne dozvole, otmicu sesija, probleme zbunjenog posrednika, ranjivosti prijenosa tokena i rizike lanca opskrbe
- **Primijeniti sigurnosne kontrole**: Implementirati učinkovite mjere ublažavanja uključujući robusnu autentikaciju, pristup po načelu najmanjih privilegija, sigurno upravljanje tokenima, kontrole sigurnosti sesija i provjeru lanca opskrbe
- **Iskoristiti Microsoftova sigurnosna rješenja**: Razumjeti i primijeniti Microsoft Prompt Shields, Azure Content Safety i GitHub Advanced Security za zaštitu MCP radnog opterećenja
- **Provjeriti sigurnost alata**: Prepoznati važnost validacije metapodataka alata, nadgledanja dinamičkih promjena i obrane od indirektnih napada ubrizgavanjem prompta
- **Integrirati najbolje prakse**: Kombinirati uspostavljene sigurnosne temelje (sigurno kodiranje, ojačavanje servera, zero trust) s MCP-specifičnim kontrolama za sveobuhvatnu zaštitu

# MCP Sigurnosna arhitektura i kontrole

Moderne MCP implementacije zahtijevaju višeslojne pristupe sigurnosti koji adresiraju i tradicionalnu softversku sigurnost i AI-specifične prijetnje. Brzo razvijajuća MCP specifikacija nastavlja usavršavati svoje sigurnosne kontrole, omogućujući bolju integraciju s poslovnim sigurnosnim arhitekturama i etabliranim najboljim praksama.

Istraživanje iz [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazuje da bi **98% prijavljenih proboja bilo spriječeno robusnom sigurnosnom higijenom**. Najefikasnija strategija zaštite kombinira temeljne sigurnosne prakse s MCP-specifičnim kontrolama—dokazane osnovne sigurnosne mjere ostaju najutjecajnije u smanjenju ukupnog sigurnosnog rizika.

## Trenutno sigurnosno stanje

> **Napomena:** Ove informacije odražavaju MCP sigurnosne standarde od **5. veljače 2026.**, usklađene s **MCP specifikacijom 2025-11-25**. MCP protokol se brzo razvija, a buduće implementacije mogu uvesti nove obrasce autentikacije i poboljšane kontrole. Uvijek se referirajte na aktualnu [MCP specifikaciju](https://spec.modelcontextprotocol.io/), [MCP GitHub repozitorij](https://github.com/modelcontextprotocol) i [dokumentaciju o sigurnosnim najboljim praksama](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovije smjernice.

> **Budući razvoj:** kandidacijsko izdanje `2026-07-28` dodatno učvršćuje autorizaciju — klijenti moraju potvrditi parametar `iss` u autorizacijskim odgovorima (RFC 9207), deklarirati OpenID Connect `application_type` tijekom Dinamičke registracije klijenta te povezati registrirane vjerodajnice s izdavačkim autorizacijskim poslužiteljem. Pogledajte [Što se mijenja u MCP: kandidacijsko izdanje 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) za cjelovit popis SEPose autorizacije.

## 🏔️ MCP Sigurnosni summit radionica (Sherpa)

Za **praktičnu sigurnosnu obuku** toplo preporučujemo **MCP Security Summit Workshop** (Sherpa) - sveobuhvatnu vođenu ekspediciju za osiguranje MCP poslužitelja u Microsoft Azure.

### Pregled radionice

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) pruža praktičnu, primjenjivu sigurnosnu obuku kroz provjerenu metodologiju „ranjiv → iskoristi → popravi → potvrdi“. Vi ćete:

- **Naučiti razbijajući sustave**: Iskusiti ranjivosti iz prve ruke iskorištavanjem namjerno nesigurnih poslužitelja
- **Koristiti Azure-nativnu sigurnost**: Iskoristiti Azure Entra ID, Key Vault, API Management i AI Content Safety
- **Slijediti Obranu u dubinu**: Napredovati kroz kampove gradeći sveobuhvatne sigurnosne slojeve
- **Primijeniti OWASP standarde**: Svaka tehnika je povezana s [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- **Dobiti proizvodni kod**: Otići s funkcionalnim i testiranim implementacijama

### Ruta ekspedicije

| Kamp | Fokus | Obuhvaćeni OWASP rizici |
|------|-------|---------------------|
| **Osnovni kamp** | Temelji MCP-a & ranjivosti autentikacije | MCP01, MCP07 |
| **Kamp 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Gateway** | API Management, Private Endpoints, upravljanje | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: Sigurnost ulaza/izlaza** | Ubrizgavanje prompta, zaštita PII, sigurnost sadržaja | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: Nadgledanje** | Log Analytics, nadzorne ploče, otkrivanje prijetnji | MCP04, MCP08 |
| **Summit** | Red Team / Blue Team integracijski test | Sve |

**Započnite ovdje**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 sigurnosnih rizika

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detaljno opisuje deset najkritičnijih sigurnosnih rizika za MCP implementacije:

| Rizik | Opis | Mitigacija u Azureu |
|------|-------------|--------------------|
| **MCP01** | Loše upravljanje tokenima i izlaganje tajni | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacija privilegija putem proširenja opsega | RBAC, Conditional Access |
| **MCP03** | Trovanje alata | Validacija alata, provjera integriteta |
| **MCP04** | Napadi na lanac opskrbe softverom i manipulacija ovisnostima | GitHub Advanced Security, skeniranje ovisnosti |
| **MCP05** | Ubrizgavanje i izvršavanje naredbi | Validacija unosa, sandboxing |
| **MCP06** | Preumjeravanje tijeka namjere | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatna autentikacija i autorizacija | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatak audita i telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Sjenoviti MCP poslužitelji | Upravljanje API centrom, mrežna izolacija |
| **MCP10** | Ubrizgavanje konteksta i prekomjerno dijeljenje | Klasifikacija podataka, minimalna izloženost |

### Evolucija MCP autentikacije

MCP specifikacija je znatno evoluirala u pristupu autentikacije i autorizacije:

- **Izvorni pristup**: Rane specifikacije zahtijevale su od programera implementaciju prilagođenih autentikacijskih poslužitelja, pri čemu su MCP poslužitelji djelovali kao OAuth 2.0 autorizacijski poslužitelji koji izravno upravljaju autentikacijom korisnika
- **Trenutni standard (2025-11-25)**: Ažurirana specifikacija omogućuje MCP poslužiteljima delegiranje autentikacije vanjskim pružateljima identiteta (kao što je Microsoft Entra ID), poboljšavajući sigurnosni stav i smanjujući složenost implementacije
- **Sigurnost transportnog sloja**: Poboljšana podrška za sigurne transportne mehanizme s pravilnim obrascima autentikacije za lokalne (STDIO) i udaljene (Streamable HTTP) veze

## Sigurnost autentikacije i autorizacije

### Trenutni sigurnosni izazovi

Moderne MCP implementacije suočavaju se s nekoliko izazova u autentikaciji i autorizaciji:

### Rizici i vektori prijetnji

- **Neispravno konfigurirana autorizacijska logika**: Pogrešne autorizacijske implementacije u MCP poslužiteljima mogu izložiti osjetljive podatke i nepravilno primijeniti kontrole pristupa
- **Kompromitacija OAuth tokena**: Krađa tokena lokalnog MCP poslužitelja omogućuje napadačima da se lažno predstavljaju kao poslužitelji i pristupe nizvodnim uslugama
- **Ranjivosti prijenosa tokena**: Nepravilno rukovanje tokenima stvaraju zaobilaženja sigurnosnih kontrola i nedostatke u odgovornosti
- **Prekomjerne dozvole**: MCP poslužitelji s prevelikim privilegijama krše načelo najmanjih privilegija i šire površinu napada

#### Prijenos tokena: Kritičan anti-uzorak

**Prijenos tokena je izričito zabranjen** u trenutnoj MCP specifikaciji autorizacije zbog ozbiljnih sigurnosnih posljedica:

##### Zaobilaženje sigurnosnih kontrola
- MCP poslužitelji i nizvodni API-ji implementiraju ključne sigurnosne kontrole (ograničenje brzine, validacija zahtjeva, nadzor prometa) koje ovise o pravilnoj validaciji tokena
- Izravna upotreba tokena klijent-API zaobilazi ove suštinske zaštite, podrivajući sigurnosnu arhitekturu

##### Poteškoće u odgovornosti i auditu  
- MCP poslužitelji ne mogu razlikovati klijente koji koriste tokenove izdane upstream, čime se razbijaju auditni tragovi
- Zapisi nizvodnih resursnih poslužitelja prikazuju zavaravajuće podrijetlo zahtjeva umjesto stvarnih međuposredničkih MCP poslužitelja
- Istraga incidenata i revizija usklađenosti postaju znatno teži

##### Rizici izvlačenja podataka
- Nevalidirani zahtjevi tokena omogućuju zlonamjernim akterima sa ukradenim tokenima korištenje MCP poslužitelja kao proxy-ja za izvlačenje podataka
- Kršenja granica povjerenja dopuštaju neovlaštene obrasce pristupa koji zaobilaze namjeravane sigurnosne kontrole

##### Vektori višeslužbenih napada
- Kompromitirani tokeni prihvaćeni od više usluga omogućuju lateralno kretanje kroz povezane sustave
- Pretpostavke povjerenja između usluga mogu biti prekršene kada se podrijetlo tokena ne može verificirati

### Sigurnosne kontrole i mjere ublažavanja

**Ključni sigurnosni zahtjevi:**

> **OBVEZNO**: MCP poslužitelji **NE SMIJU** prihvatiti nikakve tokene koji nisu izričito izdani za MCP poslužitelj

#### Kontrole autentikacije i autorizacije

- **Temeljita provjera autorizacije**: Provesti sveobuhvatne audite MCP logike autorizacije kako bi se osiguralo da samo namjenski korisnici i klijenti pristupaju osjetljivim resursima
  - **Vodič za implementaciju**: [Azure API Management kao gateway za autentikaciju MCP poslužitelja](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracija identiteta**: [Korištenje Microsoft Entra ID za autentikaciju MCP poslužitelja](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sigurno upravljanje tokenima**: Implementirati [Microsoftove najbolje prakse za validaciju tokena i životni ciklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validirati zahtjeve publike tokena koji odgovaraju identitetu MCP poslužitelja
  - Primijeniti ispravnu rotaciju tokena i politike isteka
  - Spriječiti napade ponovne upotrebe tokena i neovlašteno korištenje

- **Zaštićeno pohranjivanje tokena**: Sigurno pohranjivanje tokena s enkripcijom u mirovanju i tijekom prijenosa
  - **Najbolje prakse**: [Smjernice za sigurno pohranjivanje i enkripciju tokena](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementacija kontrole pristupa

- **Načelo najmanjih privilegija**: Dodijeliti MCP poslužiteljima samo minimalne dozvole potrebne za namjeravanu funkcionalnost
  - Redovite revizije i nadogradnje dozvola za sprječavanje eskalacije privilegija
  - **Microsoftova dokumentacija**: [Osigurani pristup s najmanjim privilegijama](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola pristupa temeljena na ulogama (RBAC)**: Implementirati specifične dodelu uloga
  - Strogo ograničiti uloge na određene resurse i akcije
  - Izbjegavati široke ili nepotrebne dozvole koje proširuju površinu napada

- **Neprekidno nadgledanje dozvola**: Implementirati stalni audit i nadzor pristupa
  - Pratiti obrasce korištenja dozvola radi uočavanja anomalija
  - Pravovremeno otkloniti prekomjerne ili neiskorištene privilegije

## AI-specifične sigurnosne prijetnje

### Ubrizgavanje prompta i napadi manipulacije alatom

Moderne MCP implementacije suočavaju se sa sofisticiranim AI-specifičnim vektorima napada koje tradicionalne sigurnosne mjere ne mogu u potpunosti adresirati:

#### **Indirektno ubrizgavanje prompta (cross-domain prompt injection)**

**Indirektno ubrizgavanje prompta** predstavlja jednu od najkritičnijih ranjivosti u AI sustavima podržanim MCP-om. Napadači ugrađuju zlonamjerne upute u vanjski sadržaj—dokumente, web stranice, e-mailove ili izvore podataka—koje AI sustavi potom obrađuju kao legitimne naredbe.

**Scenariji napada:**
- **Ubrizgavanje u dokumentima**: Zlonamjerne upute skrivene u obrađenim dokumentima koje izazivaju neželjene AI radnje
- **Eksploatacija web sadržaja**: Kompromitirane web stranice koje sadrže ugrađene promptove za manipulaciju AI ponašanjem prilikom skrejpanja
- **Napadi putem e-maila**: Zlonamjerni promptovi u e-mailovima uzrokuju da AI asistenti otkrivaju informacije ili izvode neovlaštene radnje
- **Kontaminacija izvora podataka**: Kompromitirane baze podataka ili API-ji koji služe kontaminirani sadržaj AI sustavima

**Utjecaj u stvarnom svijetu**: Ovi napadi mogu rezultirati izvlačenjem podataka, kršenjem privatnosti, generiranjem štetnog sadržaja i manipulacijom korisničkim interakcijama. Za detaljnu analizu pogledajte [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/hr/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi trovanja alata**

**Trovanje alata** cilja na metapodatke koji definiraju MCP alate, iskorištavajući način na koji LLM modeli interpretiraju opise i parametre alata za donošenje odluka o izvršavanju.

**Mehanizmi napada:**
- **Manipulacija metapodacima**: Napadači ubrizgavaju zlonamjerne upute u opise alata, definicije parametara ili primjere uporabe
- **Nevidljive upute**: Skriveni promptovi u metapodacima alata koji se obrađuju od strane AI modela, ali su nevidljivi ljudskim korisnicima
- **Dinamička izmjena alata ("Rug Pulls")**: Alati koje su korisnici odobrili kasnije se modificiraju da izvode zlonamjerne radnje bez znanja korisnika
- **Ubrizgavanje parametara**: Zlonamjerni sadržaj ugrađen u sheme parametara alata koji utječe na ponašanje modela


**Rizici hostiranih poslužitelja**: Daljinski MCP poslužitelji predstavljaju povećane rizike jer se definicije alata mogu ažurirati nakon početnog korisničkog odobrenja, stvarajući scenarije u kojima alati koji su prethodno bili sigurni postaju zlonamjerni. Za sveobuhvatnu analizu pogledajte [Napadi trovanja alata (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Dijagram napada ubrizgavanja alata](../../../translated_images/hr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni vektori napada AI**

- **Ubrizgavanje upita preko domena (XPIA)**: Složeniji napadi koji koriste sadržaj iz više domena za zaobilaženje sigurnosnih kontrola
- **Dinamičke promjene mogućnosti**: Promjene sposobnosti alata u stvarnom vremenu koje izbjegavaju inicijalne sigurnosne procjene
- **Trovanje prozora konteksta**: Napadi koji manipuliraju velikim kontekstnim prozorima radi skrivanja zlonamjernih uputa
- **Napadi zbunjivanja modela**: Eksploatacija ograničenja modela za stvaranje nepredvidivog ili nesigurnog ponašanja


### Utjecaj sigurnosnih rizika AI

**Posljedice velikog utjecaja:**
- **Eksfiltracija podataka**: Neovlašteni pristup i krađa osjetljivih podataka poduzeća ili osobnih podataka
- **Povrede privatnosti**: Izlaganje osobnih podataka (PII) i povjerljivih poslovnih podataka  
- **Manipulacija sustavom**: Neplanirane izmjene kritičnih sustava i tijekova rada
- **Krađa vjerodajnica**: Kompromitacija autentifikacijskih tokena i vjerodajnica usluga
- **Bočno kretanje**: Korištenje kompromitiranih AI sustava kao polazišta za šire mrežne napade

### Microsoft AI sigurnosna rješenja

#### **Štitovi za AI upite: Napredna zaštita od napada ubrizgavanja**

Microsoftovi **Štitovi za AI upite** pružaju sveobuhvatnu obranu od direktnih i indirektnih napada ubrizgavanja putem višestrukih sigurnosnih slojeva:

##### **Temeljni mehanizmi zaštite:**

1. **Napredno otkrivanje i filtriranje**
   - Algoritmi strojnog učenja i tehnike obrade prirodnog jezika za otkrivanje zlonamjernih uputa u vanjskom sadržaju
   - Analiza u stvarnom vremenu dokumenata, web stranica, e-pošte i izvora podataka za ugrađene prijetnje
   - Kontekstualno razumijevanje legitimnih naspram zlonamjernih uzoraka upita

2. **Tehnike isticanja**  
   - Razlikuje pouzdane sistemske upute od potencijalno kompromitiranih vanjskih ulaznih podataka
   - Metode transformacije teksta koje povećavaju relevantnost modela dok izoliraju zlonamjerni sadržaj
   - Pomaže AI sustavima održati pravilnu hijerarhiju uputa i ignorirati ubrizgane naredbe

3. **Sustavi razdjelnika i označavanja podataka**
   - Izričito definiranje granica između pouzdanih sistemskih poruka i teksta vanjskog unosa
   - Posebni markeri ističu granice između pouzdanih i nepouzdanih izvora podataka
   - Jasna separacija sprječava zbunjivanje uputa i neovlašteno izvršavanje naredbi

4. **Neprekidne informacije o prijetnjama**
   - Microsoft neprekidno prati nove obrasce napada i ažurira obrane
   - Proaktivno traženje prijetnji za nove tehnike ubrizgavanja i vektore napada
   - Redovita ažuriranja sigurnosnih modela za održavanje učinkovitosti protiv evoluirajućih prijetnji

5. **Integracija Azure Content Safety**
   - Dio sveobuhvatnog paketa Azure AI Content Safety
   - Dodatno otkrivanje pokušaja jailbreak-a, štetnog sadržaja i kršenja sigurnosnih politika
   - Jedinstvene sigurnosne kontrole za sve komponente AI aplikacija

**Resursi za implementaciju**: [Dokumentacija Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Zaštita Microsoft Prompt Shields](../../../translated_images/hr/prompt-shield.ff5b95be76e9c78c.webp)


## Napredne sigurnosne prijetnje MCP-a

### Ranljivosti preuzimanja sesije

**Preuzimanje sesije** predstavlja kritičan vektor napada u držanjem stanja MCP implementacijama gdje neovlaštene strane dobivaju i zloupotrebljavaju legitimne identifikatore sesija kako bi se pretvarale da su klijenti i izvodile neovlaštene radnje.

#### **Scenariji napada i rizici**

- **Ubrizgavanje upita preuzimanjem sesije**: Napadači sa ukradenim ID-jevima sesije ubrizgavaju zlonamjerne događaje u poslužitelje koji dijele stanje sesije, potencijalno pokrećući štetne radnje ili pristup osjetljivim podacima
- **Izravno pretvaranje**: Ukradeni ID-jevi sesije omogućuju direktne pozive MCP poslužitelju koji zaobilaze autentifikaciju, tretirajući napadače kao legitimne korisnike
- **Kompromitirani strujni nastavci**: Napadači mogu prijevremeno prekinuti zahtjeve, uzrokujući da legitimni klijenti nastave sa potencijalno zlonamjernim sadržajem

#### **Sigurnosne kontrole za upravljanje sesijama**

**Kritični zahtjevi:**
- **Provjera autorizacije**: MCP poslužitelji koji implementiraju autorizaciju **MORAJU** provjeravati SVE dolazne zahtjeve i **NEMAJU** se oslanjati na sesije za autentifikaciju
- **Sigurna generacija sesija**: Koristite kriptografski sigurne, nedeterminističke ID-jeve sesije generirane sigurnim generatorima slučajnih brojeva
- **Povezivanje sa specifičnim korisnikom**: Vežite ID-jeve sesije na informacije specifične za korisnika koristeći formate poput `<user_id>:<session_id>` kako biste spriječili zloupotrebu sesije između korisnika
- **Upravljanje životnim ciklusom sesije**: Implementirajte pravilno istekanje, rotaciju i poništavanje za ograničenje ranjivosti
- **Sigurnost prijenosa**: Obavezni HTTPS za svu komunikaciju radi sprječavanja presretanja ID-jeva sesija

### Problem zbunjenog zastupnika

Problem **zbunjenog zastupnika** nastaje kada MCP poslužitelji djeluju kao proxy za autentifikaciju između klijenata i usluga trećih strana, stvarajući prilike za zaobilaženje autorizacije iskorištavanjem statičnog ID-ja klijenta.

#### **Mehanika napada i rizici**

- **Zaobilaženje pristanka temeljeno na kolačićima**: Prethodna autentifikacija korisnika stvara kolačiće pristanka koje napadači iskorištavaju putem zlonamjernih zahtjeva za autorizaciju s konstruiranim URI-jima preusmjeravanja
- **Krađa koda autorizacije**: Postojeći kolačići pristanka mogu uzrokovati da serveri autorizacije preskoče zaslone pristanka, preusmjeravajući kodove na krajnje točke kojima upravlja napadač  
- **Neovlašteni pristup API-ju**: Ukradeni kodovi autorizacije omogućuju zamjenu tokena i pretvaranje u korisnike bez izričitog odobrenja

#### **Strategije ublažavanja**

**Obavezne kontrole:**
- **Izričiti zahtjevi za pristankom**: MCP proxy poslužitelji koji koriste statične ID-jeve klijenata **MORAJU** dobiti korisnički pristanak za svakog dinamički registriranog klijenta
- **Implementacija sigurnosti OAuth 2.1**: Slijedite aktualne najbolje prakse sigurnosti OAuth-a uključujući PKCE (Proof Key for Code Exchange) za sve zahtjeve autorizacije
- **Stroga validacija klijenata**: Implementirajte rigoroznu validaciju URI-ja preusmjeravanja i ID-jeva klijenta radi sprječavanja iskorištavanja

### Ranljivosti prosljeđivanja tokena  

**Prosljeđivanje tokena** predstavlja eksplicitni anti-obrazac gdje MCP poslužitelji prihvaćaju klijentske tokene bez odgovarajuće provjere i prosljeđuju ih prema nižim API-jevima, kršeći MCP specifikacije autorizacije.

#### **Sigurnosne implikacije**

- **Zaobilaženje kontrole**: Izravna uporaba tokena klijent-API zaobilazi kritične kontrole ograničenja brzine, validacije i nadzora
- **Kvar auditorijskih tragova**: Tokeni izdani višlje čine identifikaciju klijenta nemogućom, narušavajući sposobnost istrage incidenata
- **Eksfiltracija podataka putem proxyja**: Neprovjereni tokeni omogućuju zlonamjernim akterima korištenje poslužitelja kao proxyja za neovlašteni pristup podacima
- **Kršenje rubnih povjerenja**: Pretpostavke povjerenja downstream usluga mogu biti prekršene kada se podrijetlo tokena ne može potvrditi
- **Širenje napada na više usluga**: Kompromitirani tokeni prihvaćeni na više usluga omogućuju lateralno kretanje

#### **Zahtjevane sigurnosne kontrole**

**Neprikosnoveni zahtjevi:**
- **Validacija tokena**: MCP poslužitelji **NEMAJU** prihvaćati tokene koji nisu eksplicitno izdani za MCP poslužitelj
- **Provjera publike**: Uvijek validirajte da tvrdnje o publici tokena odgovaraju identitetu MCP poslužitelja
- **Ispravan životni ciklus tokena**: Implementirajte kratkotrajne pristupne tokene s praksama sigurnog rotiranja


## Sigurnost lanca opskrbe za AI sustave

Sigurnost lanca opskrbe razvila se izvan tradicionalnih ovisnosti softvera i obuhvaća cijeli AI ekosustav. Moderni MCP-ovi moraju rigorozno provjeravati i nadzirati sve AI-komponente jer svaka uvodi potencijalne ranjivosti koje mogu ugroziti integritet sustava.

### Proširene komponente AI lanca opskrbe

**Tradicionalne softverske ovisnosti:**
- Otvorene biblioteke i okviri
- Slike kontejnera i temeljni sustavi  
- Razvojni alati i postupci izgradnje
- Infrastrukturne komponente i usluge

**AI-specifični elementi lanca opskrbe:**
- **Temeljni modeli**: Predtrenirani modeli različitih dobavljača koji zahtijevaju provjeru podrijetla
- **Usluge ugrađivanja**: Vanjske usluge vektorizacije i semantičkog pretraživanja
- **Pružatelji konteksta**: Izvori podataka, baze znanja i repozitoriji dokumenata  
- **API-ji trećih strana**: Vanjske AI usluge, ML pipelines i krajnje točke obrade podataka
- **Artefakti modela**: Težine, konfiguracije i fino podešene varijante modela
- **Izvori podataka za treniranje**: Skupovi podataka korišteni za treniranje i fino podešavanje modela

### Sveobuhvatna strategija sigurnosti lanca opskrbe

#### **Verifikacija i povjerenje komponenti**
- **Provjera podrijetla**: Potvrdite porijeklo, licencu i integritet svih AI komponenti prije integracije
- **Sigurnosna procjena**: Provedite skeniranje ranjivosti i sigurnosne preglede za modele, izvore podataka i AI usluge
- **Analiza reputacije**: Procijenite sigurnosni dosje i prakse pružatelja AI usluga
- **Provjera usklađenosti**: Osigurajte da sve komponente zadovoljavaju sigurnosne i regulatorne zahtjeve organizacije

#### **Sigurni pipelines za deployment**  
- **Automatizirano CI/CD skeniranje sigurnosti**: Integrirajte sigurnosno skeniranje kroz automatizirane pipelines za deployment
- **Integritet artefakata**: Implementirajte kriptografsku provjeru za sve implementirane artefakte (kod, modeli, konfiguracije)
- **Postepeni deployment**: Koristite progresivne strategije implementacije sa sigurnosnom validacijom na svakoj fazi
- **Pouzdani repozitoriji artefakata**: Deployajte isključivo iz verificiranih, sigurnih registara i repozitorija artefakata

#### **Neprekidni nadzor i odgovor**
- **Skeniranje ovisnosti**: Kontinuirano praćenje ranjivosti za sve softverske i AI komponente
- **Nadzor modela**: Kontinuirana procjena ponašanja modela, pomaka performansi i sigurnosnih anomalija
- **Praćenje zdravlja usluga**: Nadzirite dostupnost, sigurnosne incidente i promjene politika vanjskih AI usluga
- **Integracija informacija o prijetnjama**: Uključite izvore prijetnji specifične za sigurnosne rizike AI i ML-a

#### **Kontrola pristupa i princip najmanjih privilegija**
- **Dozvole na razini komponenti**: Ograničite pristup modelima, podacima i uslugama prema poslovnoj potrebi
- **Upravljanje servisnim računima**: Implementirajte namjenske servisne račune sa minimalnim potrebnim dozvolama
- **Segmentacija mreže**: Izolirajte AI komponente i ograničite mrežni pristup između usluga
- **Kontrole API Gateway**: Koristite centralizirane API gateway-e za kontrolu i nadzor pristupa vanjskim AI uslugama

#### **Postupci odgovora na incidente i oporavak**
- **Brze procedure odgovora**: Uspostavljeni procesi za zakrpu ili zamjenu kompromitiranih AI komponenti
- **Rotacija vjerodajnica**: Automatizirani sustavi za rotiranje tajni, API ključeva i vjerodajnica usluga
- **Mogućnosti povratka na prethodne verzije**: Sposobnost brzog vraćanja na prethodno poznate ispravne verzije AI komponenti
- **Oporavak od proboja lanca opskrbe**: Specifične procedure za reagiranje na kompromitacije višlji AI usluga

### Microsoft sigurnosni alati i integracija

**GitHub Advanced Security** pruža sveobuhvatnu zaštitu lanca opskrbe uključujući:
- **Skeniranje tajni**: Automatizirano otkrivanje vjerodajnica, API ključeva i tokena u repozitorijima
- **Skeniranje ovisnosti**: Procjena ranjivosti za otvorene ovisnosti i biblioteke
- **CodeQL analiza**: Statička analiza koda za sigurnosne ranjivosti i probleme u kodiranju
- **Uvidi u lanac opskrbe**: Pregled zdravlja ovisnosti i sigurnosnog statusa

**Integracija Azure DevOps i Azure Repos:**
- Besprijekorna integracija sigurnosnog skeniranja kroz Microsoftove razvojne platforme
- Automatizirane sigurnosne provjere u Azure Pipelines za AI radne opterećenja
- Provedba politika za sigurnu implementaciju AI komponenti

**Microsoft interne prakse:**
Microsoft provodi opsežne sigurnosne prakse lanca opskrbe kroz sve proizvode. Saznajte o provjerenim pristupima u [Putu do osiguranja lanca opskrbe softvera u Microsoftu](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najbolje prakse sigurnosti temelja

MCP implementacije nasljeđuju i nadograđuju postojeću sigurnosnu poziciju vaše organizacije. Jačanjem temeljnih sigurnosnih praksi znatno se poboljšava ukupna sigurnost AI sustava i MCP implementacija.

### Temeljni sigurnosni principi

#### **Sigurne prakse razvoja**
- **Usklađenost s OWASP-om**: Zaštita od [OWASP Top 10](https://owasp.org/www-project-top-ten/) ranjivosti web aplikacija
- **AI-specifične zaštite**: Implementacija kontrola za [OWASP Top 10 za LLM-ove](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Sigurno upravljanje tajnama**: Upotreba namjenskih spremišta za tokene, API ključeve i osjetljive konfiguracijske podatke
- **End-to-end enkripcija**: Implementacija sigurnih komunikacija kroz sve komponente aplikacije i podatkovne tokove
- **Validacija unosa**: Temeljita validacija svih korisničkih unosa, parametara API-ja i izvora podataka

#### **Ojačavanje infrastrukture**
- **Višefaktorska autentifikacija**: Obavezni MFA za sve administrativne i servisne račune
- **Upravljanje zakrpama**: Automatizirano, pravovremeno zakrpavanje operativnih sustava, okvira i ovisnosti  
- **Integracija pružatelja identiteta**: Centralizirano upravljanje identitetima putem enterprise pružatelja identiteta (Microsoft Entra ID, Active Directory)
- **Segmentacija mreže**: Logička izolacija MCP komponenti radi ograničavanja potencijala bočnog kretanja
- **Načelo najmanjih povlastica**: Minimalne potrebne dozvole za sve komponente sustava i račune

#### **Sigurnosni nadzor i otkrivanje**
- **Sveobuhvatno evidentiranje**: Detaljno evidentiranje aktivnosti AI aplikacija, uključujući interakcije MCP klijent-poslužitelj
- **Integracija SIEM-a**: Centralizirani sustav za upravljanje sigurnosnim informacijama i događajima za otkrivanje anomalija
- **Analitika ponašanja**: Praćenje vođeno AI-em za otkrivanje neuobičajenih obrazaca u ponašanju sustava i korisnika
- **Informacije o prijetnjama**: Integriranje vanjskih feedova prijetnji i pokazatelja kompromisa (IOC)
- **Odgovor na incidente**: Jasno definirani postupci za otkrivanje, odgovor i oporavak od sigurnosnih incidenata

#### **Arhitektura Zero Trust**
- **Nikad ne vjeruj, uvijek provjeri**: Neprekidna provjera korisnika, uređaja i mrežnih veza
- **Mikrosegmentacija**: Detaljna mrežna kontrola koja izolira pojedinačne radne zadatke i usluge
- **Sigurnost usmjerena na identitet**: Sigurnosne politike temeljene na verificiranim identitetima umjesto na lokaciji u mreži
- **Neprekidna procjena rizika**: Dinamična evaluacija sigurnosnog stanja bazirana na trenutnom kontekstu i ponašanju
- **Uvjetni pristup**: Kontrole pristupa koje se prilagođavaju na temelju čimbenika rizika, lokacije i povjerenja uređaja

### Obrasci integracije u poduzeću

#### **Integracija Microsoft sigurnosnog ekosustava**
- **Microsoft Defender for Cloud**: Sveobuhvatno upravljanje sigurnosnim stanjem oblaka
- **Azure Sentinel**: Izvorno cloud SIEM i SOAR mogućnosti za zaštitu AI radnih opterećenja
- **Microsoft Entra ID**: Upravljanje identitetima i pristupom u poduzeću s politikama uvjetnog pristupa
- **Azure Key Vault**: Centralizirano upravljanje tajnama uz podršku hardverskog sigurnosnog modula (HSM)
- **Microsoft Purview**: Upravljanje podacima i usklađenost za AI izvore podataka i tijekove rada

#### **Usklađenost i upravljanje**
- **Regulatorno usklađivanje**: Osigurajte da MCP implementacije zadovoljavaju industrijske zahtjeve usklađenosti (GDPR, HIPAA, SOC 2)

- **Klasifikacija podataka**: Ispravno kategoriziranje i rukovanje osjetljivim podacima koje obrađuju AI sustavi
- **Revizijski zapisi**: Sveobuhvatno evidentiranje za usklađenost s propisima i forenzičku istragu
- **Kontrole privatnosti**: Implementacija načela privatnosti po dizajnu u arhitekturi AI sustava
- **Upravljanje promjenama**: Formalni procesi za sigurnosne preglede izmjena AI sustava

Ove temeljne prakse stvaraju čvrstu sigurnosnu osnovu koja povećava učinkovitost sigurnosnih kontrola specifičnih za MCP te pruža sveobuhvatnu zaštitu za aplikacije pokretane AI-jem.

## Ključni sigurnosni zaključci

- **Slojeviti sigurnosni pristup**: Kombinirajte temeljne sigurnosne prakse (sigurno kodiranje, načelo najmanjih privilegija, provjera lanca opskrbe, kontinuirani nadzor) sa specifičnim kontrolama za AI za sveobuhvatnu zaštitu

- **Specifični pejzaž prijetnji za AI**: MCP sustavi se suočavaju s jedinstvenim rizicima uključujući ubrizgavanje prompta, trovanje alata, preuzimanje sesije, probleme zbunjenog zastupnika, ranjivosti kod preusmjeravanja tokena i pretjerane dozvole koje zahtijevaju specijalizirane mjere ublažavanja

- **Izvrsnost u autentikaciji i autorizaciji**: Implementirajte čvrstu autentikaciju koristeći vanjske pružatelje identiteta (Microsoft Entra ID), provodite pravilnu validaciju tokena i nikada nemojte prihvaćati tokene koji nisu izričito izdani za vaš MCP poslužitelj

- **Prevencija AI napada**: Primijenite Microsoft Prompt Shields i Azure Content Safety za obranu od neizravnih napada ubrizgavanja prompta i trovanja alata, uz validaciju metapodataka alata i praćenje dinamičkih promjena

- **Sigurnost sesija i prijenosa**: Koristite kriptografski sigurne, nedeterminističke ID-jeve sesije vezane uz identitete korisnika, implementirajte pravilno upravljanje životnim ciklusom sesije i nikada nemojte koristiti sesije za autentikaciju

- **Najbolje prakse sigurnosti OAuth-a**: Spriječite napade zbunjenog zastupnika kroz izričit pristanak korisnika za dinamički registrirane klijente, pravilnu implementaciju OAuth 2.1 s PKCE-om i strogu validaciju preusmjeravajućih URI-ja  

- **Načela sigurnosti tokena**: Izbjegavajte anti-obrasce za prosljeđivanje tokena, validirajte izjave publike tokena, implementirajte kratkotrajne tokene s sigurnom rotacijom te održavajte jasne granice povjerenja

- **Sveobuhvatna sigurnost lanca opskrbe**: Sve komponente AI ekosustava (modeli, embeddingi, pružatelji konteksta, vanjski API-ji) tretirajte s istom sigurnosnom strogošću kao tradicionalne softverske ovisnosti

- **Kontinuirana evolucija**: Budite u tijeku s brzo mijenjajućim MCP specifikacijama, doprinosite sigurnosnim standardima zajednice i održavajte adaptivne sigurnosne stavove kako se protokol razvija

- **Microsoft integracija sigurnosti**: Iskoristite Microsoftov sveobuhvatni sigurnosni ekosustav (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za poboljšanu zaštitu MCP implementacija

## Sveobuhvatni resursi

### **Službena MCP sigurnosna dokumentacija**
- [MCP specifikacija (trenutno: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Najbolje sigurnosne prakse MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP specifikacija autorizacije](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitorij](https://github.com/modelcontextprotocol)

### **OWASP MCP sigurnosni resursi**
- [OWASP MCP Azure vodič za sigurnost](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s uputama za implementaciju na Azureu
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Službeni OWASP MCP sigurnosni rizici
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktična sigurnosna obuka za MCP na Azureu

### **Sigurnosni standardi i najbolje prakse**
- [Najbolje prakse sigurnosti OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 sigurnost web aplikacija](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 za Large Language Models](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft izvještaj o digitalnoj obrani](https://aka.ms/mddr)

### **Istraživanje i analiza AI sigurnosti**
- [Ubrizgavanje prompta u MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Napadi trovanja alata (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP sigurnosno istraživanje (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft sigurnosna rješenja**
- [Microsoft dokumentacija za Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety servis](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID sigurnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najbolje prakse upravljanja tokenima na Azureu](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodiči za implementaciju i tutorijali**
- [Azure API Management kao MCP Authentication Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentikacija s MCP poslužiteljima](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Sigurno spremanje tokena i enkripcija (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps i sigurnost lanca opskrbe**
- [Azure DevOps sigurnost](https://azure.microsoft.com/products/devops)
- [Azure Repos sigurnost](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft put sigurnosti lanca opskrbe](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna sigurnosna dokumentacija**

Za sveobuhvatne sigurnosne smjernice pogledajte ove specijalizirane dokumente u ovom odjeljku:

- **[MCP sigurnosne najbolje prakse 2025](./mcp-security-best-practices-2025.md)** - Potpune najbolje sigurnosne prakse za MCP implementacije
- **[Implementacija Azure Content Safety](./azure-content-safety-implementation.md)** - Praktični primjeri implementacije za integraciju Azure Content Safety  
- **[MCP sigurnosne kontrole 2025](./mcp-security-controls-2025.md)** - Najnovije sigurnosne kontrole i tehnike za MCP implementacije
- **[MCP najbolje prakse kratki vodič](./mcp-best-practices.md)** - Brzi vodič za bitne MCP sigurnosne prakse
- **[BlueHat 2026: Osiguravanje budućnosti AI-ja: Osiguravanje MCP-a s obrambenim uzorcima dubine](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Obrambeni uzorci dubine iz Microsoft Security Response Centera (MSRC)

### **Praktične sigurnosne radionice**

- **[MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/)** - Sveobuhvatna praktična radionica za osiguravanje MCP poslužitelja u Azureu s progresivnim kampovima od Base Camp do Summita
- **[OWASP MCP Azure vodič za sigurnost](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentna arhitektura i upute za implementaciju za sve OWASP MCP Top 10 rizike

---

## Što dalje

Sljedeće: [Poglavlje 3: Početak rada](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->