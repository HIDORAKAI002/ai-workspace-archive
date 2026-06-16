# MCP Sigurnost: Sveobuhvatna zaštita za AI sustave

[![MCP Security Best Practices](../../../translated_images/hr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Kliknite na sliku gore za pregled videa ovog poglavlja)_

Sigurnost je temeljni dio dizajna AI sustava, zbog čega joj posvećujemo prioritet kao drugom dijelu. Ovo je u skladu s Microsoftovim načelom **Sigurno po dizajnu** iz [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Model Context Protocol (MCP) donosi moćne nove mogućnosti AI-pokretanih aplikacija dok uvodi jedinstvene sigurnosne izazove koji nadilaze tradicionalne rizike softvera. MCP sustavi suočavaju se s etabliranim sigurnosnim problemima (sigurno kodiranje, princip najmanjih privilegija, sigurnost opskrbnog lanca) i novim prijetnjama specifičnim za AI, uključujući ubacivanje upita, trovanje alata, otmicu sesije, napade zbunjenog zamjenika, ranjivosti pri prosljeđivanju tokena i dinamičke izmjene mogućnosti.

Ova lekcija istražuje najkritičnije sigurnosne rizike u implementacijama MCP-a—pokrivajući autentifikaciju, autorizaciju, prekomjerne privilegije, neizravno ubacivanje upita, sigurnost sesije, probleme zbunjenog zamjenika, upravljanje tokenima i ranjivosti opskrbnog lanca. Naučit ćete provedive kontrole i najbolje prakse za ublažavanje ovih rizika koristeći Microsoftova rješenja poput Prompt Shields, Azure Content Safety i GitHub Advanced Security za jačanje vaše MCP implementacije.

## Ciljevi učenja

Do kraja ove lekcije moći ćete:

- **Prepoznati prijetnje specifične za MCP**: Prepoznati jedinstvene sigurnosne rizike u MCP sustavima uključujući ubacivanje upita, trovanje alata, prekomjerne privilegije, otmicu sesije, probleme zbunjenog zamjenika, ranjivosti pri prosljeđivanju tokena i rizike opskrbnog lanca
- **Primijeniti sigurnosne kontrole**: Provesti učinkovite mjere ublažavanja uključujući robusnu autentifikaciju, pristup najmanjih privilegija, sigurno upravljanje tokenima, kontrole sigurnosti sesije i provjeru opskrbnog lanca
- **Iskoristiti Microsoftova sigurnosna rješenja**: Razumjeti i implementirati Microsoft Prompt Shields, Azure Content Safety i GitHub Advanced Security za zaštitu MCP radnih opterećenja
- **Validirati sigurnost alata**: Prepoznati važnost validacije metapodataka alata, praćenja dinamičkih promjena i obrane od napada neizravnog ubacivanja upita
- **Integrirati najbolje prakse**: Kombinirati uspostavljene sigurnosne temelje (sigurno kodiranje, učvršćivanje poslužitelja, zero trust) s kontrolama specifičnim za MCP za sveobuhvatnu zaštitu

# MCP Sigurnosna arhitektura i kontrole

Moderne MCP implementacije zahtijevaju slojevite sigurnosne pristupe koji adresiraju i tradicionalne sigurnosne aspekte softvera i prijetnje specifične za AI. Brzo razvijajuća MCP specifikacija nastavlja zrelost svojih sigurnosnih kontrola, omogućujući bolju integraciju s arhitekturama poduzeća i etabliranim najboljim praksama.

Istraživanje iz [Microsoft Digital Defense Report](https://aka.ms/mddr) pokazuje da bi **98% prijavljenih proboja bilo spriječeno robusnim sigurnosnim higijenskim praksama**. Najbolja strategija zaštite kombinira temeljne sigurnosne prakse s MCP-specifičnim kontrolama—dokazane temeljne sigurnosne mjere ostaju najutjecajnije u smanjenju ukupnog sigurnosnog rizika.

## Trenutno sigurnosno okruženje

> **Napomena:** Ove informacije odražavaju MCP sigurnosne standarde zaključno s **5. veljače 2026**, usklađene s **MCP specifikacijom 2025-11-25**. MCP protokol se i dalje brzo razvija, a buduće implementacije mogu uvesti nove obrasce autentifikacije i poboljšane kontrole. Uvijek se savjetujte s aktualnom [MCP specifikacijom](https://spec.modelcontextprotocol.io/), [MCP GitHub spremištem](https://github.com/modelcontextprotocol) i [dokumentacijom sigurnosnih najboljih praksi](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) za najnovije smjernice.

## 🏔️ MCP Security Summit Workshop (Sherpa)

Za **praktičnu sigurnosnu obuku**, toplo preporučujemo **MCP Security Summit Workshop** (Sherpa) - sveobuhvatno vođenu ekspediciju za osiguranje MCP poslužitelja u Microsoft Azure.

### Pregled radionice

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) pruža praktičnu, provedivu sigurnosnu obuku putem dokazane metodologije "ranjivost → iskorištavanje → popravak → validacija". Naučit ćete:

- **Učiti kroz rušenje stvari**: Iskusiti ranjivosti iz prve ruke iskorištavanjem namjerno nesigurnih poslužitelja
- **Koristiti Azure-native sigurnost**: Iskoristiti Azure Entra ID, Key Vault, API Management i AI Content Safety
- **Slijediti obranu u dubinu**: Napredovati kroz kampove gradeći sveobuhvatne sigurnosne slojeve
- **Primijeniti OWASP standarde**: Svaka tehnika mapirana je na [OWASP MCP Azure sigurnosni vodič](https://microsoft.github.io/mcp-azure-security-guide/)
- **Dobiti proizvodni kod**: Otići s radnim, testiranim implementacijama

### Ruta ekspedicije

| Kamp | Fokus | Pokriveni OWASP rizici |
|------|-------|------------------------|
| **Početni kamp** | Osnove MCP-a i ranjivosti autentifikacije | MCP01, MCP07 |
| **Kamp 1: Identitet** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Gateway** | API Management, privatni krajnji točke, upravljanje | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: I/O Sigurnost** | Ubacivanje upita, zaštita PII, sigurnost sadržaja | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: Praćenje** | Log Analytics, nadzorne ploče, otkrivanje prijetnji | MCP04, MCP08 |
| **Vrh** | Integracijski test Red Team / Blue Team | Svi |

**Započnite**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 sigurnosnih rizika

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) detaljno opisuje deset najkritičnijih sigurnosnih rizika za MCP implementacije:

| Rizik | Opis | Azure ublažavanje |
|-------|-------|-------------------|
| **MCP01** | Loše upravljanje tokenima i izlaganje tajni | Azure Key Vault, Managed Identity |
| **MCP02** | Eskalacija privilegija putem širenja opsega | RBAC, Conditional Access |
| **MCP03** | Trovanje alata | Validacija alata, provjera integriteta |
| **MCP04** | Napadi na opskrbni lanac softvera i ometanje ovisnosti | GitHub Advanced Security, skeniranje ovisnosti |
| **MCP05** | Ubacivanje i izvršenje naredbi | Validacija unosa, izolacija (sandboxing) |
| **MCP06** | Subverzija toka namjere | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Nedostatna autentifikacija i autorizacija | Azure Entra ID, OAuth 2.1 s PKCE |
| **MCP08** | Nedostatak nadzora i telemetrije | Azure Monitor, Application Insights |
| **MCP09** | Sjena MCP poslužitelji | Upravljanje API-jem, mrežna izolacija |
| **MCP10** | Ubacivanje konteksta i prekomjerno dijeljenje | Klasifikacija podataka, minimalno izlaganje |

### Evolucija MCP autentifikacije

MCP specifikacija se značajno razvila u pristupu autentifikaciji i autorizaciji:

- **Izvorni pristup**: Rane specifikacije zahtijevale su od programera da implementiraju prilagođene poslužitelje autentifikacije, pri čemu su MCP poslužitelji djelovali kao OAuth 2.0 Authorization Servers koji izravno upravljaju autentifikacijom korisnika
- **Trenutni standard (2025-11-25)**: Ažurirana specifikacija dozvoljava MCP poslužiteljima da delegiraju autentifikaciju eksternim davateljima identiteta (kao što je Microsoft Entra ID), čime se poboljšava sigurnosni položaj i smanjuje složenost implementacije
- **Sigurnost transportnog sloja**: Povećana podrška za sigurne mehanizme prijenosa sa odgovarajućim obrascima autentifikacije za lokalne (STDIO) i udaljene (Streamable HTTP) veze

## Sigurnost autentifikacije i autorizacije

### Trenutni sigurnosni izazovi

Moderne MCP implementacije suočavaju se s nekoliko izazova u autentifikaciji i autorizaciji:

### Rizici i vektori prijetnji

- **Pogrešno konfigurirana autorizacijska logika**: Neispravna implementacija autorizacije u MCP poslužiteljima može izložiti osjetljive podatke i nepravilno primijeniti kontrole pristupa
- **Kompromitacija OAuth tokena**: Krađa tokena na lokalnim MCP poslužiteljima omogućuje napadačima da se lažno predstave kao poslužitelji i pristupe sljedećim uslugama
- **Ranjivosti pri prosljeđivanju tokena**: Neispravno rukovanje tokenima stvara zaobilaženje sigurnosnih kontrola i praznine u odgovornosti
- **Prekomjerne privilegije**: MCP poslužitelji s prevelikim privilegijama krše načelo najmanje privilegije i šire površinu napada

#### Prosljeđivanje tokena: Kritični antipattern

**Prosljeđivanje tokena je eksplicitno zabranjeno** u trenutnoj MCP autorizacijskoj specifikaciji zbog ozbiljnih sigurnosnih posljedica:

##### Zaobilaženje sigurnosnih kontrola
- MCP poslužitelji i API-jevi nizvodno provode ključne sigurnosne kontrole (ograničavanje brzine, validacija zahtjeva, nadzor prometa) koje ovise o ispravnoj validaciji tokena
- Izravna upotreba tokena klijenta prema API-ju zaobilazi ove ključne zaštite, narušavajući sigurnosnu arhitekturu

##### Problemi odgovornosti i audita  
- MCP poslužitelji ne mogu razlikovati klijente koji koriste tokeni izdane od izvornog izdavatelja, prekidajući auditne tragove
- Zapisi poslužitelja resursa nizvodno prikazuju pogrešan izvor zahtjeva umjesto stvarnih MCP poslužiteljskih posrednika
- Istrage incidenata i provedba usklađenosti znatno postaju teže

##### Rizici izvlačenja podataka
- Neprovjerene tvrdnje u tokenima omogućuju zlonamjernim akterima s ukradenim tokenima da koriste MCP poslužitelje kao posrednike za izvlačenje podataka
- Kršenja granica povjerenja dopuštaju neautorizirane obrasce pristupa koji zaobilaze predviđene sigurnosne kontrole

##### Višestruki vektori napada
- Kompromitirani tokeni prihvaćeni od strane više usluga omogućuju lateralno kretanje kroz povezane sustave
- Pretpostavke povjerenja između usluga mogu se prekršiti kada se porijeklo tokena ne može verificirati

### Sigurnosne kontrole i mjere ublažavanja

**Kritični sigurnosni zahtjevi:**

> **OBAVEZNO**: MCP poslužitelji **NE SMEJU** prihvaćati bilo kakve tokene koji nisu eksplicitno izdani za MCP poslužitelj

#### Kontrole autentifikacije i autorizacije

- **Detaljna revizija autorizacije**: Provesti sveobuhvatne revizije autorizacijske logike MCP poslužitelja kako bi se osiguralo da samo namijenjeni korisnici i klijenti imaju pristup osjetljivim resursima
  - **Vodič za implementaciju**: [Azure API Management kao autentifikacijski gateway za MCP poslužitelje](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integracija identiteta**: [Korištenje Microsoft Entra ID za autentifikaciju MCP poslužitelja](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Sigurno upravljanje tokenima**: Implementirati [Microsoftove najbolje prakse za validaciju tokena i životni ciklus](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validirati da tvrdnje publike tokena odgovaraju identitetu MCP poslužitelja
  - Provoditi pravilnu rotaciju i politiku isteka tokena
  - Spriječiti replay napade i neovlaštenu upotrebu tokena

- **Zaštićeno pohranjivanje tokena**: Sigurnu pohranu tokena s enkripcijom u mirovanju i tijekom prijenosa
  - **Najbolje prakse**: [Sigurna pohrana tokena i smjernice za enkripciju](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementacija kontrole pristupa

- **Načelo najmanjih privilegija**: Dodijeliti MCP poslužiteljima samo minimalne dozvole potrebne za njihovu predviđenu funkcionalnost
  - Redovite revizije i ažuriranja dozvola za sprječavanje širenja privilegija
  - **Microsoftova dokumentacija**: [Siguran pristup najmanjih privilegija](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Kontrola pristupa temeljena na ulogama (RBAC)**: Implementirati precizno dodjeljivanje uloga
  - Ograničiti uloge na specifične resurse i radnje
  - Izbjegavati široke i nepotrebne dozvole koje povećavaju površinu napada

- **Kontinuirano praćenje dozvola**: Provesti stalno praćenje i reviziju pristupa
  - Nadzirati obrasce korištenja dozvola radi otkrivanja anomalija
  - Pravovremeno ukloniti prekomjerne ili neiskorištene privilegije

## AI-specifične prijetnje sigurnosti

### Napadi ubacivanja upita i manipulacije alatom

Moderne MCP implementacije suočavaju se s sofisticiranim, AI-specifičnim vektorima napada koje tradicionalne sigurnosne mjere ne mogu u potpunosti adresirati:

#### **Neizravno ubacivanje upita (Cross-Domain Prompt Injection)**

**Neizravno ubacivanje upita** predstavlja jednu od najkritičnijih ranjivosti u AI sustavima s MCP-om. Napadači ugrađuju zlonamjerne upute u vanjski sadržaj—dokumente, web stranice, e-poštu ili izvore podataka—koje AI sustavi potom obrađuju kao legitimne naredbe.

**Scenariji napada:**
- **Ubacivanje u dokumente**: Zlonamjerne upute skriveni u obrađenim dokumentima koje pokreću neželjene AI akcije
- **Eksploatacija web sadržaja**: Kompromitirane web stranice koje sadrže ugrađene promptove koji manipuliraju AI ponašanjem prilikom skupljanja podataka
- **Napadi putem e-pošte**: Zlonamjerni promptovi u e-porukama koji uzrokuju da AI asistenti otkrivaju informacije ili izvode neovlaštene radnje
- **Kontaminacija izvora podataka**: Kompromitirane baze podataka ili API-ji koji daju kontaminirani sadržaj AI sustavima

**Stvarni utjecaj**: Ovi napadi mogu rezultirati izvlačenjem podataka, kršenjem privatnosti, generiranjem štetnog sadržaja i manipulacijom korisničkim interakcijama. Za detaljnu analizu pogledajte [Prompt Injection u MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/hr/prompt-injection.ed9fbfde297ca877.webp)

#### **Napadi trovanja alata**

**Trovanje alata** cilja na metapodatke koji definiraju MCP alate, iskorištavajući način na koji LLM-ovi interpretiraju opise alata i parametre za donošenje odluka o izvršenju.

**Mehanizmi napada:**
- **Manipulacija metapodacima**: Napadači ubacuju zlonamjerne upute u opise alata, definicije parametara ili primjere uporabe
- **Nevidljive upute**: Skriveni promptovi u metapodacima alata koje obrađuju AI modeli ali su nevidljivi ljudskim korisnicima
- **Dinamičke izmjene alata ("Rug Pulls")**: Alati odobreni od strane korisnika kasnije se mijenjaju za zlonamjerne radnje bez znanja korisnika
- **Ubacivanje parametara**: Zlonamjerni sadržaj ugrađen u sheme parametara alata koji utječu na ponašanje modela

**Rizici hostanih poslužitelja**: Udaljeni MCP poslužitelji predstavljaju povišene rizike jer se definicije alata mogu ažurirati nakon početnog odobrenja korisnika, stvarajući scenarije u kojima alati koji su ranije bili sigurni postaju zlonamjerni. Za detaljnu analizu pogledajte [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/hr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Dodatni AI vektori napada**

- **Cross-Domain Prompt Injection (XPIA)**: Sofisticirani napadi koji koriste sadržaj s više domena kako bi zaobišli sigurnosne kontrole
- **Dinamična izmjena sposobnosti**: Promjene sposobnosti alata u stvarnom vremenu koje zaobilaze početne sigurnosne procjene  
- **Trovanje kontekstnog prozora**: Napadi koji manipuliraju velikim kontekstnim prozorima kako bi sakrili zlonamjerne upute  
- **Napadi zabune modela**: Iskorištavanje ograničenja modela za stvaranje nepredvidivih ili nesigurnih ponašanja  


### Utjecaj rizika za sigurnost umjetne inteligencije

**Posljedice visokog utjecaja:**  
- **Eksfiltracija podataka**: Neovlašteni pristup i krađa osjetljivih podataka poduzeća ili osobnih podataka  
- **Povrede privatnosti**: Izlaganje osobno identificirajućih podataka (PII) i povjerljivih poslovnih podataka  
- **Manipulacija sustavom**: Nenamjerne izmjene kritičnih sustava i radnih tijekova  
- **Krađa vjerodajnica**: Kompromitiranje tokena za autentikaciju i vjerodajnica usluga  
- **Bočno kretanje**: Korištenje kompromitiranih AI sustava kao polaznih točaka za šire mrežne napade  

### Microsoft sigurnosna rješenja za umjetnu inteligenciju

#### **AI Prompt Shields: Napredna zaštita od napada ubrizgavanjem upita**

Microsoft **AI Prompt Shields** pružaju sveobuhvatnu obranu protiv izravnih i neizravnih napada ubrizgavanjem upita kroz višestruke sigurnosne slojeve:

##### **Osnovni mehanizmi zaštite:**

1. **Napredna detekcija i filtriranje**  
   - Algoritmi strojnog učenja i NLP tehnike otkrivaju zlonamjerne upute u vanjskom sadržaju  
   - Analiza u stvarnom vremenu dokumenata, web stranica, e-pošte i izvora podataka na ugrađene prijetnje  
   - Kontekstualno razumijevanje legitimnih nasuprot zlonamjernim obrascima upita  

2. **Tehnike isticanja**  
   - Razlikuje povjerljive sistemske upute od potencijalno kompromitiranih vanjskih ulaza  
   - Metode transformacije teksta koje poboljšavaju relevantnost modela istovremeno izolirajući zlonamjerni sadržaj  
   - Pomaže AI sustavima održavati ispravnu hijerarhiju uputa i ignorirati ubrizgane naredbe  

3. **Sustavi razdjelnika i označavanja podataka**  
   - Izričito definiranje granica između povjerljivih sistemskih poruka i vanjskog tekstualnog unosa  
   - Posebni markeri označavaju granice između povjerljivih i nepovjerljivih izvora podataka  
   - Jasna razdvojenost sprječava zabunu u uputama i neovlašteno izvršavanje naredbi  

4. **Kontinuirano obavještavanje o prijetnjama**  
   - Microsoft kontinuirano prati nove obrasce napada i ažurira obranu  
   - Proaktivno pronalaženje prijetnji za nove tehnike ubrizgavanja i napadne vektore  
   - Redovita ažuriranja sigurnosnih modela za održavanje učinkovitosti protiv evoluirajućih prijetnji  

5. **Integracija Azure Content Safety**  
   - Dio sveobuhvatnog paketa Azure AI Content Safety  
   - Dodatna detekcija pokušaja jailbreaka, štetnog sadržaja i kršenja sigurnosnih politika  
   - Jedinstvene sigurnosne kontrole kroz komponente AI aplikacija  

**Resursi za implementaciju**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/hr/prompt-shield.ff5b95be76e9c78c.webp)


## Napredne sigurnosne prijetnje MCP-a

### Ranljivosti preuzimanja sesije

**Preuzimanje sesije** predstavlja kritičan napadni vektor u implementacijama MCP-a koje koriste stanje, gdje neovlaštene strane dobivaju i zloupotrebljavaju legitimne identifikatore sesije kako bi se lažno predstavile kao klijenti i izvršile neovlaštene radnje.

#### **Scenariji napada i rizici**

- **Ubrizgavanje upita preuzimanjem sesije**: Napadači sa ukradenim ID-evima sesije ubrizgavaju zlonamjerne događaje u poslužitelje koji dijele stanje sesije, potencijalno pokrećući štetne radnje ili pristup osjetljivim podacima  
- **Izravno lažno predstavljanje**: Ukradeni ID-evi sesije omogućuju izravne pozive MCP poslužitelju koje zaobilaze autentikaciju, tretirajući napadače kao legitimne korisnike  
- **Kompromitirani nastavak streamova**: Napadači mogu prijevremeno prekinuti zahtjeve, uzrokujući da legitimni klijenti nastave s potencijalno zlonamjernim sadržajem  

#### **Sigurnosne kontrole za upravljanje sesijama**

**Kritični zahtjevi:**  
- **Provjera autorizacije**: MCP poslužitelji koji implementiraju autorizaciju **MORAJU** provjeravati SVE dolazne zahtjeve i **NE SMIJU** se oslanjati na sesije za autentikaciju  
- **Sigurna generacija sesija**: Koristiti kriptografski sigurne, nedeterminističke ID-eve sesija generirane sigurnim generatorima slučajnih brojeva  
- **Povezivanje sa specifičnim korisnikom**: Povezati ID-eve sesije s informacijama specifičnim za korisnika koristeći formate poput `<user_id>:<session_id>` kako bi se spriječila zloupotreba između korisnika  
- **Upravljanje životnim ciklusom sesije**: Implementirati ispravno istekanje, rotaciju i poništavanje da bi se ograničili vremenski prozori ranjivosti  
- **Sigurnost prijenosa**: Obavezni HTTPS za svu komunikaciju radi sprječavanja presretanja ID-eva sesije  

### Problem zbunjenog zastupnika

**Problem zbunjenog zastupnika** pojavljuje se kada MCP poslužitelji djeluju kao proxy autentikacije između klijenata i usluga trećih strana, stvarajući prilike za zaobilaženje autorizacije iskorištavanjem statičnih ID-eva klijenata.

#### **Mehanika napada i rizici**

- **Zaobilaženje pristanka na temelju kolačića**: Prethodna autentikacija korisnika stvara kolačiće pristanka koje napadači iskorištavaju tijekom zlonamjernih autorizacijskih zahtjeva s pažljivo izrađenim URI-ima za preusmjeravanje  
- **Krađa autorizacijskog koda**: Postojeći kolačići pristanka mogu uzrokovati da autorizacijski poslužitelji preskaču zaslone pristanka, preusmjeravajući kodove na krajnje točke pod napadačevom kontrolom  
- **Neovlašteni pristup API-ju**: Ukradeni autorizacijski kodovi omogućuju razmjenu tokena i lažno predstavljanje korisnika bez izričitog odobrenja  

#### **Strategije ublažavanja**

**Obavezne kontrole:**  
- **Izričiti zahtjevi za pristanak**: MCP proxy poslužitelji koji koriste statične ID-eve klijenata **MORAJU** dobiti korisnički pristanak za svakog dinamički registriranog klijenta  
- **Implementacija sigurnosti OAuth 2.1**: Slijediti aktualne sigurnosne najbolje prakse OAuth-a uključujući PKCE (Proof Key for Code Exchange) za sve autorizacijske zahtjeve  
- **Stroga validacija klijenata**: Implementirati rigoroznu provjeru URI-ova za preusmjeravanje i identifikatora klijenata kako bi se spriječila zloupotreba  

### Ranljivosti prosljeđivanja tokena  

**Prosljeđivanje tokena** predstavlja eksplicitan antipraktik gdje MCP poslužitelji prihvaćaju tokene klijenata bez odgovarajuće validacije i prosljeđuju ih prema API-jima niže razine, kršeći specifikacije autorizacije MCP-a.

#### **Sigurnosne implikacije**

- **Zaobilaženje kontrole**: Izravna upotreba tokena klijent-API zaobilazi kritične kontrole ograničenja brzine, validacije i nadzora  
- **Oštećenje tragova revizije**: Tokeni izdani uzvodno onemogućavaju identifikaciju klijenata, što narušava sposobnosti istrage incidenata  
- **Eksfiltracija podataka putem proxyja**: Nevalidirani tokeni dopuštaju zlonamjernim akterima korištenje poslužitelja kao proxyja za neovlašteni pristup podacima  
- **Povrede granica povjerenja**: Pretpostavke povjerenja usluga niže razine mogu biti prekršene kada se ne može potvrditi podrijetlo tokena  
- **Širenje napada preko više usluga**: Kompromitirani tokeni prihvaćeni na više usluga omogućuju bočno kretanje  

#### **Zahtijevane sigurnosne kontrole**

**Nepromjenjivi zahtjevi:**  
- **Validacija tokena**: MCP poslužitelji **NE SMIJU** prihvaćati tokene koji nisu izričito izdani za MCP poslužitelj  
- **Provjera publike**: Uvijek provjeravati da tvrdnje o publici tokena odgovaraju identitetu MCP poslužitelja  
- **Ispravan životni ciklus tokena**: Implementirati kratkotrajne pristupne tokene s praksama sigurne rotacije  


## Sigurnost lanca opskrbe za AI sustave

Sigurnost lanca opskrbe evoluirala je izvan tradicionalnih softverskih ovisnosti te obuhvaća čitav AI ekosustav. Moderne implementacije MCP-a moraju rigorozno provjeravati i nadzirati sve AI komponente, jer svaka uvodi potencijalne ranjivosti koje mogu ugroziti integritet sustava.

### Proširene komponente AI lanca opskrbe

**Tradicionalne softverske ovisnosti:**  
- Open-source knjižnice i okviri  
- Slike kontejnera i osnovni sustavi  
- Razvojni alati i gradnja cjevovoda  
- Infrastrukturne komponente i usluge  

**AI-specifični elementi lanca opskrbe:**  
- **Osnovni modeli**: Predtrenirani modeli različitih pružatelja koji zahtijevaju provjeru podrijetla  
- **Usluge ugradnje (embedding)**: Vanjske usluge vektorizacije i semantičkog pretraživanja  
- **Pružatelji konteksta**: Izvori podataka, baze znanja i spremišta dokumenata  
- **API-ji trećih strana**: Vanjske AI usluge, ML cjevovodi i krajnje točke obrade podataka  
- **Modelski artefakti**: Težine, konfiguracije i varijante modela s finim podešavanjem  
- **Izvori podataka za trening**: Skupi podataka korišteni za obučavanje i fino podešavanje modela  

### Sveobuhvatna strategija sigurnosti lanca opskrbe

#### **Verifikacija komponenti i povjerenje**  
- **Validacija podrijetla**: Provjeriti podrijetlo, licencu i integritet svih AI komponenti prije integracije  
- **Sigurnosna procjena**: Izvršiti skeniranje ranjivosti i sigurnosne preglede za modele, izvore podataka i AI usluge  
- **Analiza reputacije**: Procijeniti sigurnosnu povijest i prakse pružatelja AI usluga  
- **Provjera sukladnosti**: Osigurati da sve komponente zadovoljavaju organizacijske sigurnosne i regulatorne zahtjeve  

#### **Sigurni cjevovodi za implementaciju**  
- **Automatizirano CI/CD skeniranje**: Ugraditi sigurnosno skeniranje u sve automatizirane deployment cjevovode  
- **Integritet artefakata**: Implementirati kriptografske provjere za sve distribuirane artefakte (kod, modeli, konfiguracije)  
- **Postupno uvođenje**: Koristiti progresivne strategije implementacije sa sigurnosnom validacijom u svakoj fazi  
- **Pouzdana spremišta artefakata**: Implementirati isključivo iz verificiranih i sigurnih registar i spremišta artefakata  

#### **Kontinuirani nadzor i odgovor**  
- **Skeniranje ovisnosti**: Neprestano praćenje ranjivosti svih softverskih i AI komponentnih ovisnosti  
- **Nadzor modela**: Kontinuirana procjena ponašanja modela, pomaka performansi i sigurnosnih anomalija  
- **Praćenje zdravlja usluga**: Nadzor vanjskih AI usluga za dostupnost, sigurnosne incidente i promjene politika  
- **Integracija obavještavanja o prijetnjama**: Uključivanje izvora prijetnji specifičnih za sigurnost AI i ML sustava  

#### **Kontrola pristupa i princip najmanjih privilegija**  
- **Dozvole na razini komponenti**: Ograničiti pristup modelima, podacima i uslugama prema poslovnoj potrebi  
- **Upravljanje servisnim računima**: Implementirati posebno administrirane račune s minimalnim potrebnim pravima  
- **Segmentacija mreže**: Izolirati AI komponente i ograničiti mrežni pristup između usluga  
- **Kontrole API Gateway-ja**: Koristiti centralizirane API gateway-je za kontrolu i nadzor pristupa vanjskim AI uslugama  

#### **Odgovor na incidente i oporavak**  
- **Postupci brzog odgovora**: Uspostavljeni procesi za zakrpu ili zamjenu kompromitiranih AI komponenti  
- **Rotacija vjerodajnica**: Automatizirani sustavi za rotaciju tajni, API ključeva i vjerodajnica usluga  
- **Mogućnosti povratka**: Sposobnost brzog vraćanja prethodnih poznatih ispravnih verzija AI komponenti  
- **Oporavak od proboja lanca opskrbe**: Posebni postupci za odgovor na kompromitacije uzvodnih AI usluga  

### Microsoft sigurnosni alati i integracija

**GitHub Advanced Security** pruža sveobuhvatnu zaštitu lanca opskrbe uključujući:  
- **Skeniranje tajni**: Automatsko otkrivanje vjerodajnica, API ključeva i tokena u spremištima  
- **Skeniranje ovisnosti**: Procjena ranjivosti za open-source ovisnosti i knjižnice  
- **CodeQL analiza**: Statička analiza koda za sigurnosne ranjivosti i probleme u kodiranju  
- **Pregled lanca opskrbe**: Pregled zdravlja i sigurnosnog statusa ovisnosti  

**Integracija u Azure DevOps & Azure Repos:**  
- Bešavna integracija sigurnosnog skeniranja u Microsoft razvojne platforme  
- Automatizirane sigurnosne provjere u Azure Pipelines za AI radna opterećenja  
- Provedba politika za sigurnu implementaciju AI komponenti  

**Microsoft interne prakse:**  
Microsoft implementira opsežne prakse sigurnosti lanca opskrbe kroz sve proizvode. Saznajte o dokazanim pristupima u [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Najbolje prakse sigurnosti temelja

Implementacije MCP-a nasljeđuju i nadograđuju postojeći sigurnosni stav vaše organizacije. Jačanjem temeljnih sigurnosnih praksi značajno se povećava ukupna sigurnost AI sustava i MCP deploymenta.

### Temeljni sigurnosni principi

#### **Sigurne razvojne prakse**  
- **Usuglašenost s OWASP-om**: Zaštita od [OWASP Top 10](https://owasp.org/www-project-top-ten/) ranjivosti web aplikacija  
- **AI-specifične zaštite**: Implementacija kontrola za [OWASP Top 10 za LLM-ove](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Sigurno upravljanje tajnama**: Korištenje posvećenih spremišta za tokene, API ključeve i osjetljive konfiguracijske podatke  
- **End-to-End enkripcija**: Implementacija sigurnih komunikacija kroz sve komponente aplikacije i tokove podataka  
- **Validacija unosa**: Stroga validacija svih korisničkih unosa, API parametara i izvora podataka  

#### **Ojačavanje infrastrukture**  
- **Višefaktorska autentikacija**: Obvezni MFA za sve administrativne i servisne račune  
- **Upravljanje zakrpama**: Automatizirano i pravovremeno zakrpanje operacijskih sustava, okvira i ovisnosti  
- **Integracija pružatelja identiteta**: Centralizirano upravljanje identitetima preko enterprise ID pružatelja (Microsoft Entra ID, Active Directory)  
- **Segmentacija mreže**: Logička izolacija MCP komponenti radi ograničenja mogućnosti bočnog kretanja  
- **Princip najmanjih privilegija**: Minimalne potrebne dozvole za sve sustavne komponente i račune  

#### **Nadzor i detekcija sigurnosti**  
- **Sveobuhvatno logiranje**: Detaljno evidentiranje aktivnosti AI aplikacija, uključujući MCP interakcije klijent-poslužitelj  
- **Integracija SIEM-a**: Centralizirano upravljanje sigurnosnim informacijama i događajima za detekciju anomalija  
- **Analiza ponašanja**: AI-pokretan nadzor za otkrivanje neuobičajenih obrazaca u ponašanju sustava i korisnika  
- **Obavještavanje o prijetnjama**: Integracija vanjskih izvora prijetnji i indikatora kompromitiranja (IOC)  
- **Odgovor na incidente**: Dobro definirani postupci za detekciju, odgovor i oporavak od sigurnosnih incidenata  

#### **Zero Trust arhitektura**  
- **Nikad ne vjeruj, uvijek provjeri**: Kontinuirana provjera korisnika, uređaja i mrežnih veza  
- **Mikrosegmentacija**: Granularne mrežne kontrole koje izoliraju pojedinačna radna opterećenja i usluge  
- **Sigurnost bazirana na identitetu**: Sigurnosne politike temeljene na verificiranim identitetima, a ne lokaciji u mreži  
- **Kontinuirana procjena rizika**: Dinamička evaluacija sigurnosnog stanja temeljena na trenutnom kontekstu i ponašanju  
- **Uvjetni pristup**: Kontrole pristupa koje se prilagođavaju prema faktorima rizika, lokaciji i povjerenju uređaja  

### Obrasci integracije u poduzeću

#### **Integracija Microsoft sigurnosnog ekosustava**  
- **Microsoft Defender for Cloud**: Sveobuhvatno upravljanje sigurnosnim stavom oblaka  
- **Azure Sentinel**: Cloud-native SIEM i SOAR funkcionalnosti za zaštitu AI radnih opterećenja  
- **Microsoft Entra ID**: Upravljanje identitetima i pristupom u poduzeću s politikama uvjetnog pristupa  
- **Azure Key Vault**: Centralizirano upravljanje tajnama s podrškom za hardverski sigurnosni modul (HSM)  
- **Microsoft Purview**: Upravljanje podacima i sukladnost za AI izvore podataka i radne tokove  

#### **Sukladnost i upravljanje**  
- **Usuglašenost s regulativama**: Osigurati da MCP implementacije zadovoljavaju industrijske zahtjeve za usklađenost (GDPR, HIPAA, SOC 2)  
- **Klasifikacija podataka**: Ispravna kategorizacija i rukovanje osjetljivim podacima koje obrađuju AI sustavi  
- **Tragovi revizije**: Sveobuhvatno evidentiranje za regulatornu usklađenost i forenzičke istrage  
- **Kontrole privatnosti**: Implementacija principa privatnosti po dizajnu u arhitekturu AI sustava  
- **Upravljanje promjenama**: Formalni procesi za sigurnosne preglede izmjena AI sustava  

Ove temeljne prakse stvaraju robusnu sigurnosnu osnovu koja povećava učinkovitost specifičnih MCP sigurnosnih kontrola i osigurava sveobuhvatnu zaštitu AI vođenih aplikacija.

## Ključne sigurnosne poruke
- **Pristup sigurnosti u slojevima**: Kombiniranje temeljnih sigurnosnih praksi (sigurno kodiranje, najmanja privilegija, provjera opskrbnog lanca, kontinuirano nadgledanje) s kontrolama specifičnim za AI za sveobuhvatnu zaštitu

- **Specifični krajobraz prijetnji za AI**: MCP sustavi suočavaju se s jedinstvenim rizicima uključujući ubrizgavanje upita, trovanje alata, otmicu sesija, probleme zbunjenog povjerenika, ranjivosti prosljeđivanja tokena i prekomjerne ovlasti koje zahtijevaju specijalizirane mjere ublažavanja

- **Izvrsnost u autentikaciji i autorizaciji**: Implementirajte robusnu autentikaciju koristeći vanjske pružatelje identiteta (Microsoft Entra ID), primjenjujte pravilnu validaciju tokena i nikada ne prihvaćajte tokene koji nisu eksplicitno izdani za vaš MCP poslužitelj

- **Prevencija AI napada**: Primijenite Microsoft Prompt Shields i Azure Content Safety za obranu od neizravnog ubrizgavanja upita i napada trovanja alata, dok istovremeno vršite validaciju meta-podataka alata i nadgledate dinamičke promjene

- **Sigurnost sesije i prijenosa**: Koristite kriptografski sigurne, nedeterminističke ID-jeve sesija povezane s identitetom korisnika, implementirajte pravilno upravljanje životnim ciklusom sesija i nikada ne koristite sesije za autentikaciju

- **Najbolje prakse za OAuth sigurnost**: Spriječite napade zbunjenog povjerenika kroz eksplicitan korisnički pristanak za dinamički registrirane klijente, pravilnu implementaciju OAuth 2.1 s PKCE i strogu validaciju URI preusmjeravanja  

- **Principi sigurnosti tokena**: Izbjegavajte anti-obrasce prosljeđivanja tokena, validirajte tvrdnje publike tokena, implementirajte kratkotrajne tokene sa sigurnom rotacijom i održavajte jasne granice povjerenja

- **Sveobuhvatna sigurnost opskrbnog lanca**: Svi dijelovi AI ekosustava (modeli, ugradnje, pružatelji konteksta, vanjski API-ji) tretiraju se s istim stupnjem sigurnosti kao tradicionalne softverske ovisnosti

- **Kontinuirana evolucija**: Budite u toku s brzo razvijajućim MCP specifikacijama, doprinesite sigurnosnim komunitetnim standardima i održavajte prilagodljive sigurnosne stavove kako protokol sazrijeva

- **Integracija Microsoft sigurnosti**: Iskoristite Microsoftov sveobuhvatni sigurnosni ekosustav (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) za dodatnu zaštitu implementacije MCP-a

## Sveobuhvatni resursi

### **Službena MCP sigurnosna dokumentacija**
- [MCP specifikacija (Trenutno: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP najbolje sigurnosne prakse](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP autorizacijska specifikacija](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub repozitorij](https://github.com/modelcontextprotocol)

### **OWASP MCP sigurnosni resursi**
- [OWASP MCP Azure sigurnosni vodič](https://microsoft.github.io/mcp-azure-security-guide/) - Sveobuhvatni OWASP MCP Top 10 s uputama za implementaciju na Azureu
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - službeni OWASP MCP sigurnosni rizici
- [MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/) - Praktični sigurnosni trening za MCP na Azureu

### **Sigurnosni standardi i najbolje prakse**
- [OAuth 2.0 najbolje sigurnosne prakse (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 sigurnosti web aplikacija](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 za velike jezične modele](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Digital Defense Report](https://aka.ms/mddr)

### **Istraživanje i analiza AI sigurnosti**
- [Ubrizgavanje upita u MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Napadi trovanja alata (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP sigurnosno istraživanje (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft sigurnosna rješenja**
- [Microsoft Prompt Shields dokumentacija](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety servis](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID sigurnost](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Najbolje prakse upravljanja tokenima na Azureu](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Vodiči za implementaciju i tutorijali**
- [Azure API Management kao MCP autentikacijski gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID autentikacija s MCP poslužiteljima](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Sigurno pohranjivanje tokena i enkripcija (video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps i sigurnost opskrbnog lanca**
- [Azure DevOps sigurnost](https://azure.microsoft.com/products/devops)
- [Azure Repos sigurnost](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftovo putovanje prema sigurnom opskrbnom lancu softvera](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Dodatna sigurnosna dokumentacija**

Za cjeloviti sigurnosni vodič, pogledajte ove specijalizirane dokumente u ovom odjeljku:

- **[MCP najbolje sigurnosne prakse 2025](./mcp-security-best-practices-2025.md)** - Potpune najbolje sigurnosne prakse za MCP implementacije
- **[Implementacija Azure Content Safety](./azure-content-safety-implementation.md)** - Praktični primjeri implementacije integracije Azure Content Safety  
- **[MCP sigurnosne kontrole 2025](./mcp-security-controls-2025.md)** - Najnovije sigurnosne kontrole i tehnike za MCP implementacije
- **[MCP najbolje prakse kratki vodič](./mcp-best-practices.md)** - Kratki vodič za osnovne MCP sigurnosne prakse
- **[BlueHat 2026: Sigurnost budućnosti AI: Sigurnost MCP uz obrasce obrane u dubini](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Obrasci obrane u dubini iz Microsoft Security Response Center (MSRC)

### **Praktični sigurnosni trening**

- **[MCP Security Summit radionica (Sherpa)](https://azure-samples.github.io/sherpa/)** - Sveobuhvatna praktična radionica za osiguranje MCP poslužitelja u Azureu s progresivnim kampovima od Base Camp do Summit
- **[OWASP MCP Azure sigurnosni vodič](https://microsoft.github.io/mcp-azure-security-guide/)** - Referentna arhitektura i smjernice za implementaciju za sve OWASP MCP Top 10 rizike

---

## Što slijedi

Sljedeće: [Poglavlje 3: Početak](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->