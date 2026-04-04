# Dnevnik promjena: MCP za početnike - kurikulum

Ovaj dokument služi kao zapis svih značajnih promjena napravljenih u Model Context Protocol (MCP) za početnike kurikulumu. Promjene su dokumentirane u obrnutom kronološkom redoslijedu (najnovije promjene prve).

## 5. veljače 2026.

### Unapređenja validacije i navigacije na razini spremišta

#### Dodan novi sadržaj kurikuluma

**Modul 03 - Uvod**
- **12-mcp-hosts/README.md**: Novi opsežan vodič za postavljanje MCP hostova
  - Primjeri konfiguracija za Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - JSON predlošci konfiguracija za sve glavne hostove
  - Tablica usporedbe tipova transporta (stdio, SSE/HTTP, WebSocket)
  - Rješavanje uobičajenih problema s vezom
  - Najbolje sigurnosne prakse za konfiguraciju hosta

- **13-mcp-inspector/README.md**: Novi vodič za ispravljanje pogrešaka MCP Inspectora
  - Metode instalacije (npx, globalno preko npm, iz izvornog koda)
  - Povezivanje s poslužiteljima preko stdio i HTTP/SSE
  - Alati za testiranje, resursi i tijekovi rada s promptima
  - Integracija s VS Code-om i MCP Inspector
  - Uobičajeni scenariji ispravljanja pogrešaka sa rješenjima

**Modul 04 - Praktična primjena**
- **pagination/README.md**: Novi vodič za implementaciju paginacije
  - Obrasci paginacije temeljene na kursoru u Pythonu, TypeScriptu, Javi
  - Rukovanje paginacijom na strani klijenta
  - Strategije dizajna kursora (neprozirni vs. strukturirani)
  - Preporuke za optimizaciju performansi

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Novi dubinski pregled značajki protokola
  - Implementacija obavijesti o napretku
  - Obrasci za otkazivanje zahtjeva
  - Predlošci resursa s uzorcima URI-ja
  - Upravljanje životnim ciklusom poslužitelja
  - Kontrola razine zapisivanja
  - Obrasci rukovanja pogreškama s JSON-RPC kodovima

#### Popravci navigacije (ažurirano 24+ datoteka)

**Glavni modul README datoteke**  
 Sad poveznice vode i na prvu lekciju i na sljedeći modul

**Poddatoteke 02-Security**  
- Svi dodatni sigurnosni dokumenti (5 ukupno) sada imaju „Što slijedi“ navigaciju:

**Datoteke 09-CaseStudy**  
- Sve datoteke studija slučaja sada imaju sekvencijalnu navigaciju:

**Laboratoriji 10-StreamliningAI**  
Dodana sekcija „Što slijedi“ u pregled modula 10 i modula 11

#### Popravci koda i sadržaja

**Ažuriranja SDK-a i ovisnosti**  
Popravljena prazna verzija openai na `^4.95.0`  
Ažuriran SDK s `^1.8.0` na `>=1.26.0`  
Ažurirane oznake verzije mcp-a na `>=1.26.0`

**Popravci koda**  
Ispravljen nevaljani model `gpt-4o-mini` u `gpt-4.1-mini`

**Popravci sadržaja**  
Ispravljen pokvareni link `READMEmd` → `README.md`, ispravljen naslov kurikuluma `Module 1-3` → `Module 0-3`, ispravljena osjetljivost na velika/mala slova u putanji  
Uklonjen oštećeni duplicirani sadržaj Case Study 5

**Unapređenja za početnike**  
Dodani ispravni uvod, ciljevi učenja i preduvjeti za početnike

#### Ažuriranja kurikuluma

**Glavni README.md**  
- Dodani unosi 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginação), 5.16 (Značajke protokola) u tablicu kurikuluma

**Modulski README-ovi**  
Dodane lekcije 12 i 13 u popis lekcija  
Dodana sekcija „Praktični vodiči“ s poveznicom na paginaciju  
Dodane lekcije 5.15 (Prilagođeni transport) i 5.16 (Značajke protokola)

**study_guide.md**  
- Ažurirani mentalna mapa sa svim novim temama: Postavljanje MCP hostova, MCP Inspector, Strategije paginacije, Dubinski pregled značajki protokola

## 28. siječnja 2026.

### Pregled usklađenosti MCP specifikacije 2025-11-25

#### Unapređenje osnovnih koncepata (01-CoreConcepts/)  
- **Novi klijentski primitiv – Korijeni (Roots)**: Dodana opširna dokumentacija o Roots klijentskom primitivu, omogućujući poslužiteljima razumijevanje granica datotečnog sustava i prava pristupa  
- **Bilješke za alate**: Dodana dokumentacija o ponašajnim bilješkama alata (`readOnlyHint`, `destructiveHint`) za bolje odluke o izvršenju alata  
- **Pozivanje alata pri uzorkovanju**: Ažurirana dokumentacija uzorkovanja s parametrima `tools` i `toolChoice` za pozivanje alata vođenog modelom tijekom zahtjeva uzorkovanja  
- **URL način poticanja**: Dodana dokumentacija o poticanju na osnovi URL-a za vanjske mrežne interakcije koje pokreće poslužitelj  
- **Zadaci (eksperimentalno)**: Dodan novi odjeljak koji dokumentira eksperimentalnu značajku Zadaci za trajne omotače izvršenja i odgođeno dohvaćanje rezultata  
- **Podrška ikona**: Napominje se da alati, resursi, predlošci resursa i promptovi sada mogu uključivati ikone kao dodatne metapodatke

#### Ažuriranja dokumentacije  
- **README.md**: Dodan referentni tekst MCP specifikacije 2025-11-25 i objašnjenje verzioniranja po datumu  
- **study_guide.md**: Ažurirana karta kurikuluma uključujući Zadatke i bilješke alata u odjeljak Osnovni koncepti; ažuriran vremenski žig dokumenta

#### Verifikacija usklađenosti sa specifikacijom  
- **Verzija protokola**: Potvrđeno da sva dokumentacija referira trenutnu MCP specifikaciju 2025-11-25  
- **Poravnanje arhitekture**: Potvrđena točnost dokumentacije dvostruke arhitekture (Data Layer + Transport Layer)  
- **Dokumentacija primitiva**: Validirani poslužiteljski primitivni elementi (Resursi, Promptovi, Alati) i klijentski primitivni elementi (Uzorkovanje, Poticanje, Zapisivanje, Korijeni)  
- **Transportni mehanizmi**: Potvrđena točnost dokumentacije za STDIO i Streamable HTTP transport  
- **Sigurnosne smjernice**: Potvrđeno slaganje s aktualnim MCP sigurnosnim najboljim praksama

#### Dokumentirane ključne značajke MCP 2025-11-25  
- **Otkriće OpenID Connect**: Otkriće poslužitelja za autentifikaciju putem OIDC-a  
- **OAuth Client ID metapodaci**: Preporučeni mehanizam registracije klijenta  
- **JSON Schema 2020-12**: Zadani dijalekt za definicije MCP shema  
- **Sustav razine SDK**: Formalizirani zahtjevi za podršku i održavanje značajki SDK-a  
- **Struktura upravljanja**: Formalizirane Radne skupine i Interesne skupine u MCP upravljanju

### Veliko ažuriranje sigurnosne dokumentacije (02-Security/)

#### Integracija MCP Security Summit Workshop (Sherpa)  
- **Novi praktični resurs**: Dodana opsežna integracija s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) u cijeloj sigurnosnoj dokumentaciji  
- **Pokriće puta ekspedicije**: Dokumentiran cjelokupni tijek napredovanja od Logora do Vrha  
- **Poravnanje s OWASP**: Sve sigurnosne smjernice sada mapiraju rizike iz OWASP MCP Azure Security Guidea

#### Integracija OWASP MCP Top 10  
- **Novi odjeljak**: Dodana tablica OWASP MCP Top 10 sigurnosnih rizika s Azure mitigacijama u glavni sigurnosni README  
- **Dokumentacija temeljena na rizicima**: Ažuriran mcp-security-controls-2025.md s referencama na OWASP MCP rizike za svako sigurnosno područje  
- **Referentna arhitektura**: Poveznica na OWASP MCP Azure Security Guide referentnu arhitekturu i obrasce implementacije

#### Ažurirane sigurnosne datoteke  
- **README.md**: Dodan pregled Sherpa radionice, tablica puta ekspedicije, sažetak OWASP MCP Top 10 rizika i odjeljak za praktičnu obuku  
- **mcp-security-controls-2025.md**: Ažuriran zaglavlje na veljaču 2026., dodane OWASP reference (MCP01-MCP08), ispravljena verzijska neskladnost  
- **mcp-security-best-practices-2025.md**: Dodan odjeljak s resursima Sherpa i OWASP, ažuriran vremenski žig  
- **mcp-best-practices.md**: Dodan odjeljak za praktičnu obuku sa Sherpa i OWASP poveznicama  
- **azure-content-safety-implementation.md**: Dodan OWASP MCP06 prikaz, usklađenost s Sherpa Camp 3 i dodatni odjeljak resursa 

#### Dodani novi resursi  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Stranice pojedinačnih OWASP MCP rizika (MCP01-MCP10)

### Usklađivanje kurikuluma s MCP specifikacijom 2025-11-25

#### Modul 03 - Uvod  
- **Dokumentacija SDK-a**: Dodan Go SDK na službeni popis SDK-a; ažurirani svi SDK linkovi radi usklađenosti s MCP specifikacijom 2025-11-25  
- **Pojašnjenje transporta**: Ažurirani opisi STDIO i HTTP streaming transporta s eksplicitnim referencama na specifikaciju

#### Modul 04 - Praktična primjena  
- **Ažuriranja SDK-a**: Dodan Go SDK; ažuriran popis SDK-a s referencom na verziju specifikacije  
- **Specifikacija autorizacije**: Ažuriran link MCP specifikacije autorizacije na aktualnu verziju 2025-11-25

#### Modul 05 - Napredne teme  
- **Nove značajke**: Dodana bilješka o novim značajkama MCP specifikacije 2025-11-25 (Zadaci, Bilješke alata, URL način poticanja, Korijeni)  
- **Sigurnosni resursi**: Dodani OWASP MCP Top 10 i Sherpa poveznice u dodatne reference

#### Modul 06 - Doprinose zajednice  
- **Popis SDK-a**: Dodani Swift i Rust SDK; ažuriran link na specifikaciju na verziju 2025-11-25  
- **Referenca specifikacije**: Ažurirani link MCP specifikacije na izravni URL specifikacije

#### Modul 07 - Lekcije iz ranog usvajanja  
- **Ažuriranja resursa**: Dodan link MCP specifikacije 2025-11-25 i OWASP MCP Top 10 u dodatne resurse

#### Modul 08 - Najbolje prakse  
- **Verzija specifikacije**: Ažurirana referenca MCP specifikacije na 2025-11-25  
- **Sigurnosni resursi**: Dodani OWASP MCP Top 10 i Sherpa radionica u dodatne reference

#### Modul 10 - Optimizacija AI tijekova rada  
- **Ažuriranje bedža**: Promijenjen bedž verzije MCP s verzije SDK-a (1.9.3) na verziju specifikacije (2025-11-25)  
- **Resursne poveznice**: Ažuriran MCP specifikacijski link; dodan OWASP MCP Top 10

#### Modul 11 - MCP Server praktične laboratorije  
- **Referenca specifikacije**: Ažuriran MCP specifikacijski link na verziju 2025-11-25  
- **Sigurnosni resursi**: Dodan OWASP MCP Top 10 u službene resurse

## 18. prosinca 2025.

### Ažuriranje sigurnosne dokumentacije - MCP specifikacija 2025-11-25

#### Najbolje sigurnosne prakse MCP-a (02-Security/mcp-best-practices.md) - Ažuriranje verzije specifikacije  
- **Ažuriranje verzije protokola**: Ažurirano na najnoviju MCP specifikaciju 2025-11-25 (izdana 25. studenog 2025.)  
  - Ažurirane sve reference verzije specifikacije s 2025-06-18 na 2025-11-25  
  - Ažurirani datumi u dokumentu s 18. kolovoza 2025. na 18. prosinca 2025.  
  - Provjereno da svi URL-ovi specifikacije upućuju na trenutnu dokumentaciju  
- **Validacija sadržaja**: Kompletna validacija najboljih sigurnosnih praksi prema najnovijim standardima  
  - **Microsoft sigurnosna rješenja**: Provjerena aktualna terminologija i veze za Prompt Shields (ranije „detekcija rizika jailbreaka“), Azure Content Safety, Microsoft Entra ID i Azure Key Vault  
  - **OAuth 2.1 sigurnost**: Potvrđeno slaganje s najnovijim sigurnosnim praksama OAuth-a  
  - **OWASP standardi**: Validirani aktualni OWASP Top 10 za LLM-ove  
  - **Azure servisi**: Provjereni svi Microsoft Azure dokumentacijski linkovi i najbolje prakse  
- **Usuglašenost sa standardima**: Sve referenced sigurnosne norme su aktuelne  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - OAuth 2.1 sigurnosne najbolje prakse  
  - Azure sigurnosne i usklađenosti okviri  
- **Resursi implementacije**: Validirane sve poveznice vodiča i resursa za implementaciju  
  - Obrasci autentifikacije u Azure API Managementu  
  - Vodiči za integraciju Microsoft Entra ID-a  
  - Upravljanje tajnama u Azure Key Vaultu  
  - DevSecOps pipeline-i i rješenja za nadzor

### Kontrola kvalitete dokumentacije  
- **Usklađenost sa specifikacijom**: Osigurano da svi obavezni sigurnosni zahtjevi MCP-a (MUST/MUST NOT) odgovaraju najnovijoj specifikaciji  
- **Aktualnost resursa**: Provjereni svi vanjski linkovi prema Microsoft dokumentaciji, sigurnosnim standardima i vodičima implementacije  
- **Obuhvat najboljih praksa**: Potvrđena opsežna pokrivenost autentifikacije, autorizacije, AI specifičnih prijetnji, sigurnosti lanca opskrbe i enterprise obrazaca

## 6. listopada 2025.

### Proširenje sekcije Uvod – Napredno korištenje poslužitelja & Jednostavna autentikacija

#### Napredno korištenje poslužitelja (03-GettingStarted/10-advanced)  
- **Dodan novi poglavlje**: Predstavljen opsežan vodič za napredno korištenje MCP poslužitelja, pokrivajući regularnu i niskorazinsku arhitekturu poslužitelja.  
  - **Regularni vs. niskorazinski poslužitelj**: Detaljna usporedba i primjeri koda u Pythonu i TypeScriptu za oba pristupa.  
  - **Dizajn temeljen na handlerima**: Objašnjenje upravljanja alatima/resursima/promptovima temeljeno na handlerima za skalabilne i fleksibilne implementacije poslužitelja.  
  - **Praktični obrasci**: Scenariji iz stvarnog života gdje su obrasci niskorazinskog poslužitelja korisni za napredne značajke i arhitekturu.

#### Jednostavna autentikacija (03-GettingStarted/11-simple-auth)  
- **Dodan novi poglavlje**: Korak-po-korak vodič za implementaciju jednostavne autentikacije u MCP poslužiteljima.  
  - **Koncepti autentikacije**: Jasno objašnjenje autentikacije naspram autorizacije i rukovanja vjerodajnicama.  
  - **Implementacija osnovne autentikacije**: Obrasci autentikacije temeljeni na middlewareu u Pythonu (Starlette) i TypeScriptu (Express) s uzorcima koda.  
  - **Napredovanje ka naprednoj sigurnosti**: Smjernice za početak s jednostavnom autentikacijom i nadogradnju na OAuth 2.1 i RBAC, uz reference na napredne sigurnosne module.

Ove dodatke pružaju praktične i praktične smjernice za izgradnju robusnijih, sigurnijih i fleksibilnijih implementacija MCP poslužitelja, povezujući temeljne koncepte s naprednim proizvodnim obrascima.

## 29. rujna 2025.

### MCP Server integracijski laboratoriji baze podataka – Sveobuhvatan praktični put učenja

#### 11-MCPServerHandsOnLabs – Novi kompletan kurikulum integracije baza podataka
- **Kompletan 13-laboratorijski put učenja**: Dodan sveobuhvatan praktični kurikulum za izgradnju MCP servera spremnih za produkciju s integracijom PostgreSQL baze podataka
  - **Implementacija u stvarnom svijetu**: Zava Retail analiza slučaja koja pokazuje enterprise-grade obrasce
  - **Strukturirani napredak u učenju**:
    - **Laboratoriji 00-03: Osnove** - Uvod, osnovna arhitektura, sigurnost i multitenancy, postavljanje okruženja
    - **Laboratoriji 04-06: Izrada MCP servera** - Dizajn baze podataka i shema, implementacija MCP servera, razvoj alata  
    - **Laboratoriji 07-09: Napredne značajke** - Integracija semantičke pretrage, testiranje i ispravljanje pogrešaka, integracija s VS Code
    - **Laboratoriji 10-12: Produkcija i najbolje prakse** - Strategije implementacije, nadzor i promatranje, najbolje prakse i optimizacija
  - **Enterprise tehnologije**: FastMCP framework, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Napredne značajke**: Sigurnost na razini redaka (RLS), semantička pretraga, pristup podacima za više korisnika, vektorske ugrađenosti, nadzor u stvarnom vremenu

#### Standardizacija terminologije - Pretvorba modula u laboratorij
- **Sveobuhvatna nadogradnja dokumentacije**: Sustavno ažurirani svi README fajlovi u 11-MCPServerHandsOnLabs za korištenje termina "Laboratorij" umjesto "Modul"
  - **Naslovi odjeljaka**: Ažurirano "Što ovaj modul pokriva" u "Što ovaj laboratorij pokriva" kroz svih 13 laboratorija
  - **Opis sadržaja**: Promijenjeno "Ovaj modul pruža..." u "Ovaj laboratorij pruža..." u cijeloj dokumentaciji
  - **Ciljevi učenja**: Ažurirano "Do kraja ovog modula..." u "Do kraja ovog laboratorija..."
  - **Navigacijske poveznice**: Pretvorene sve reference "Modul XX:" u "Laboratorij XX:" u međureferencama i navigaciji
  - **Praćenje završetka**: Ažurirano "Nakon završetka ovog modula..." u "Nakon završetka ovog laboratorija..."
  - **Sačuvane tehničke reference**: Zadržane Python module reference u konfiguracijskim datotekama (npr. `"module": "mcp_server.main"`)

#### Unapređenje vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Dodan novi odjeljak "11. Laboratoriji integracije baze podataka" s vizualizacijom strukture laboratorija
- **Struktura repozitorija**: Ažurirano sa deset na jedanaest glavnih sekcija s detaljnim opisom 11-MCPServerHandsOnLabs
- **Upute za put učenja**: Poboljšane navigacijske upute koje obuhvaćaju sekcije 00-11
- **Pokriće tehnologija**: Dodani detalji o integraciji FastMCP, PostgreSQL i Azure servisa
- **Ishodi učenja**: Naglasak na razvoj produkcijski spremnih servera, obrasce integracije baza podataka i enterprise sigurnost

#### Unapređenje glavne strukture README
- **Terminologija zasnovana na laboratorijima**: Ažuriran glavni README.md u 11-MCPServerHandsOnLabs za dosljednu upotrebu strukture "Laboratorij"
- **Organizacija puta učenja**: Jasna progresija od osnovnih pojmova preko napredne implementacije do produkcijskog postavljanja
- **Fokus na stvarni svijet**: Naglasak na praktično, hands-on učenje s enterprise obrascima i tehnologijama

### Poboljšanja kvalitete i dosljednosti dokumentacije
- **Naglasak na praktično učenje**: Potvrđeni praktični, laboratorijski pristup kroz dokumentaciju
- **Fokus na enterprise obrasce**: Istaknute produkcijski spremne implementacije i razmatranja enterprise sigurnosti
- **Integracija tehnologija**: Sveobuhvatno pokrivanje modernih Azure servisa i AI integracijskih uzoraka
- **Napredak u učenju**: Jasni, strukturirani put od osnovnih pojmova do produkcijskog postavljanja

## 26. rujna 2025.

### Poboljšanje studija slučaja - Integracija GitHub MCP Registra

#### Studije slučaja (09-CaseStudy/) - Fokus na razvoj ekosustava
- **README.md**: Veliko proširenje s detaljnom studijom slučaja GitHub MCP Registra
  - **Studija slučaja GitHub MCP Registra**: Nova sveobuhvatna studija slučaja koja analizira lansiranje GitHub MCP Registra u rujnu 2025.
    - **Analiza problema**: Detaljna analiza fragmentiranog otkrivanja i implementacije MCP servera
    - **Arhitektura rješenja**: Centralizirani pristup registra GitHuba s instalacijom jednim klikom u VS Code
    - **Poslovni učinak**: Mjerljiva poboljšanja u uključivanju i produktivnosti developera
    - **Strateška vrijednost**: Fokus na modularnu implementaciju agenata i interoperabilnost alata
    - **Razvoj ekosustava**: Pozicioniranje kao temeljne platforme za integraciju agentnih sustava
  - **Unaprijeđena struktura studija slučaja**: Ažurirano svih sedam studija slučaja s dosljednim formatiranjem i opširnim opisima
    - Azure AI Travel Agents: Naglasak na višestruku orkestraciju agenata
    - Integracija Azure DevOps: Fokus na automatizaciju tijeka rada
    - Dohvat dokumentacije u stvarnom vremenu: Implementacija klijenta za Python konzolu
    - Interaktivni generator plana učenja: Chainlit konverzacijska web-aplikacija
    - Dokumentacija u uređivaču: Integracija VS Code i GitHub Copilot
    - Upravljanje Azure API-jem: Enterprise obrasci integracije API-ja
    - GitHub MCP Registar: Razvoj ekosustava i platforma zajednice
  - **Sveobuhvatni zaključak**: Prepisan zaključni dio koji ističe sedam studija slučaja koje pokrivaju više dimenzija MCP implementacije
    - Enterprise integracija, višestruka orkestracija agenata, produktivnost developera
    - Razvoj ekosustava, obrazovne aplikacije kao kategorije
    - Poboljšani uvidi u arhitektonske obrasce, strategije implementacije i najbolje prakse
    - Naglasak na MCP kao zreli, produkcijski spreman protokol

#### Ažuriranja vodiča za učenje (study_guide.md)
- **Vizualna karta kurikuluma**: Ažurirana mapa uma da uključi GitHub MCP Registar u odjeljak Studije slučaja
- **Opis studija slučaja**: Proširen s generičkih opisa na detaljan prikaz sedam sveobuhvatnih studija slučaja
- **Struktura repozitorija**: Ažurirana sekcija 10 radi odražavanja sveobuhvatnog pokrivanja studija slučaja sa specifičnim detaljima implementacije
- **Integracija promjena**: Dodan unos za 26. rujna 2025. koji dokumentira dodavanje GitHub MCP Registra i poboljšanja studija slučaja
- **Ažuriranja datuma**: Ažuriran vremenski žig podnožja za najnoviju reviziju (26. rujna 2025.)

### Poboljšanja kvalitete dokumentacije
- **Poboljšana dosljednost**: Standardizirano formatiranje i struktura studija slučaja kroz svih sedam primjera
- **Sveobuhvatno pokrivanje**: Studije slučaja sada obuhvaćaju enterprise, produktivnost developera i scenarije razvoja ekosustava
- **Strateško pozicioniranje**: Naglašeni MCP kao temeljnu platformu za implementaciju agentnih sustava
- **Integracija resursa**: Ažurirani dodatni resursi za uključivanje poveznice na GitHub MCP Registar

## 15. rujna 2025.

### Proširenje naprednih tema - Prilagođeni transporti i inženjering konteksta

#### MCP prilagođeni transporti (05-AdvancedTopics/mcp-transport/) - Novi vodič za naprednu implementaciju
- **README.md**: Potpuni vodič za implementaciju prilagođenih MCP transportnih mehanizama
  - **Azure Event Grid transport**: Sveobuhvatna implementacija serverless transporta upravljanog događajima
    - Primjeri u C#, TypeScriptu i Pythonu s integracijom Azure Functions
    - Obrasci event-driven arhitekture za skalabilna MCP rješenja
    - Primatelji webhookova i push obrada poruka
  - **Azure Event Hubs transport**: Implementacija transporta za streaming velike propusnosti
    - Mogućnosti streaminga u stvarnom vremenu za scenarije niske latencije
    - Strategije particioniranja i upravljanje checkpointima
    - Grupiranje poruka i optimizacija performansi
  - **Obrasci enterprise integracije**: Produkcijski spremni primjeri arhitekture
    - Raspodijeljena MCP obrada preko više Azure Functions
    - Hibridne transportne arhitekture koje kombiniraju različite tipove transporta
    - Trajnost poruka, pouzdanost i strategije obrade pogrešaka
  - **Sigurnost i nadzor**: Integracija Azure Key Vault i obrasci promatranja
    - Autentikacija upravljanim identitetima i pristup s najmanjim povlasticama
    - Telemetrija i nadzor performansi s Application Insights
    - Primjeri presjeka (circuit breakers) i obrasci otpornosti na pogreške
  - **Okviri za testiranje**: Sveobuhvatne strategije testiranja za prilagođene transporte
    - Jedinično testiranje s test-dvojnicima i okvirom za mockiranje
    - Integracijsko testiranje s Azure Test Containers
    - Razmatranja performansi i opterećenja

#### Inženjering konteksta (05-AdvancedTopics/mcp-contextengineering/) - Nova AI disciplina
- **README.md**: Sveobuhvatna analiza inženjeringa konteksta kao novog područja
  - **Temeljni principi**: Potpuno dijeljenje konteksta, svjesnost donošenja odluka u akciji i upravljanje kontekstnim prozorom
  - **Usuglašenost s MCP protokolom**: Kako MCP dizajn odgovara izazovima inženjeringa konteksta
    - Ograničenja kontekstnog prozora i strategije progresivnog učitavanja
    - Određivanje relevantnosti i dinamičko dohvaćanje konteksta
    - Rukovanje višemodalnim kontekstom i sigurnosna pitanja
  - **Pristupi implementaciji**: Jednolančane vs. višestruke agentne arhitekture
    - Tehnike segmentacije i prioritizacije konteksta
    - Progresivno učitavanje i strategije kompresije konteksta
    - Slojeviti pristupi kontekstu i optimizacija dohvaćanja
  - **Okvir za mjerenje**: Pojavljujuće metrike za evaluaciju učinkovitosti konteksta
    - Učinkovitost ulaza, performanse, kvaliteta i razmatranja korisničkog iskustva
    - Eksperimentalni pristupi optimizaciji konteksta
    - Analiza neuspjeha i metodologije poboljšanja

#### Ažuriranja navigacije kurikuluma (README.md)
- **Proširena struktura modula**: Ažurirana tablica kurikuluma s uključenim novim naprednim temama
  - Dodane stavke Inženjering konteksta (5.14) i Prilagođeni transport (5.15)
  - Dosljedno formatiranje i poveznice kroz sve module
  - Ažurirani opisi radi odražavanja trenutnog sadržaja

### Poboljšanja strukture direktorija
- **Standardizacija naziva**: Preimenovan "mcp transport" u "mcp-transport" radi dosljednosti s ostalim folderima naprednih tema
- **Organizacija sadržaja**: Svi folderi 05-AdvancedTopics sada prate dosljedan uzorak naziva (mcp-[tema])

### Poboljšanja kvalitete dokumentacije
- **Usuglašenost sa MCP specifikacijom**: Sav novi sadržaj referira trenutačnu MCP specifikaciju 2025-06-18
- **Primjeri za više jezika**: Sveobuhvatni primjeri koda u C#, TypeScriptu i Pythonu
- **Enterprise fokus**: Produkcijski spremni obrasci i integracija Azure clouda kroz cijelu dokumentaciju
- **Vizualna dokumentacija**: Mermaid dijagrami za arhitekturu i vizualizaciju toka

## 18. kolovoza 2025.

### Sveobuhvatna nadogradnja dokumentacije - MCP 2025-06-18 standardi

#### Najbolje sigurnosne prakse MCP-a (02-Security/) - Potpuna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Potpuna preprava usklađena s MCP Specifikacijom 2025-06-18
  - **Obavezni zahtjevi**: Dodani eksplicitni zahtjevi MUST/MUST NOT iz službene specifikacije uz jasne vizualne oznake
  - **12 temeljnih sigurnosnih praksi**: Restrukturirano s liste od 15 na sveobuhvatne sigurnosne domene
    - Sigurnost tokena i autentikacija s integracijom vanjskog pružatelja identiteta
    - Upravljanje sesijama i sigurnost transporta s kriptografskim zahtjevima
    - Zaštita specifična za AI s integracijom Microsoft Prompt Shields
    - Kontrola pristupa i dozvole s načelom najmanje povlastice
    - Sigurnost sadržaja i nadzor s integracijom Azure Content Safety
    - Sigurnost lanaca opskrbe s opsežnom verifikacijom komponenti
    - Sigurnost OAuth-a i prevencija Confused Deputy napada s PKCE implementacijom
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
    - Usklađenost i upravljanje usklađenošću s regulativama
    - Napredne sigurnosne kontrole s zero trust arhitekturom
    - Integracija Microsoft sigurnosnog ekosustava s cjelovitim rješenjima
    - Kontinuirani razvoj sigurnosti s adaptivnim praksama
  - **Microsoft sigurnosna rješenja**: Unaprijeđene smjernice za integraciju Prompt Shields, Azure Content Safety, Entra ID i GitHub Advanced Security
  - **Resursi za implementaciju**: Kategorizirane sveobuhvatne poveznice na resurse po Službenoj MCP dokumentaciji, Microsoft sigurnosnim rješenjima, sigurnosnim standardima i vodičima za implementaciju

#### Napredne sigurnosne kontrole (02-Security/) - Enterprise implementacija
- **MCP-SECURITY-CONTROLS-2025.md**: Potpuna preinaka u enterprise-razinu sigurnosnog okvira
  - **9 sveobuhvatnih sigurnosnih domena**: Prošireno s osnovnih kontrola na detaljni enterprise okvir
    - Napredna autentikacija i autorizacija s integracijom Microsoft Entra ID-a
    - Sigurnost tokena i kontrole protiv propuštanja s detaljnom validacijom
    - Sigurnosne kontrole sesije s prevencijom preotimanja sesije
    - AI-specifične sigurnosne kontrole s prevencijom injekcije prompta i trovanja alata
    - Prevencija Confused Deputy napada s OAuth proxy sigurnošću
    - Sigurnost izvršavanja alata s sandboxingom i izolacijom
    - Sigurnosne kontrole lanaca opskrbe s verifikacijom ovisnosti
    - Kontrole nadzora i detekcije s integracijom SIEM-a
    - Odgovor na incidente i oporavak s automatiziranim mogućnostima
  - **Primjeri implementacije**: Dodani detaljni YAML konfiguracijski blokovi i primjeri koda
  - **Integracija Microsoft rješenja**: Sveobuhvatan pregled Azure sigurnosnih servisa, GitHub Advanced Security i upravljanja enterprise identitetom

#### Sigurnost naprednih tema (05-AdvancedTopics/mcp-security/) - Produkcijski spremna implementacija
- **README.md**: Potpuna preprava za enterprise sigurnosnu implementaciju
  - **Usklađenost s trenutačnom specifikacijom**: Ažurirano prema MCP specifikaciji 2025-06-18 s obaveznim sigurnosnim zahtjevima
  - **Pojačana autentikacija**: Integracija Microsoft Entra ID s opsežnim primjerima u .NET i Java Spring Security
  - **Integracija AI sigurnosti**: Implementacija Microsoft Prompt Shields i Azure Content Safety s detaljnim primjerima u Pythonu
  - **Napredna mitigacija prijetnji**: Sveobuhvatni primjeri implementacije za
    - Prevenciju Confused Deputy napada s PKCE i validacijom korisničkog pristanka
    - Prevenciju propuštanja tokena s validacijom publike i sigurnim upravljanjem tokenima
    - Prevenciju preotimanja sesije s kriptografskim povezivanjem i analizom ponašanja
  - **Integracija enterprise sigurnosti**: Nadzor Azure Application Insights, pipeline za detekciju prijetnji i sigurnost lanca opskrbe
  - **Popis za provjeru implementacije**: Jasni obavezni i preporučeni sigurnosni kontrolni elementi s prednostima Microsoft sigurnosnog ekosustava

### Kvaliteta dokumentacije i usklađenost sa standardima
- **Reference na specifikaciju**: Ažurirane sve reference na trenutačnu MCP specifikaciju 2025-06-18
- **Microsoft sigurnosni ekosustav**: Poboljšane smjernice integracije kroz cijelu sigurnosnu dokumentaciju
- **Praktična implementacija**: Dodani detaljni primjeri koda u .NET, Java i Pythonu s enterprise obrascima
- **Organizacija resursa**: Sveobuhvatna kategorizacija službene dokumentacije, sigurnosnih standarda i vodiča za implementaciju
- **Vizualne oznake**: Jasno označavanje obaveznih zahtjeva u odnosu na preporučene prakse


#### Temeljni koncepti (01-CoreConcepts/) - Potpuna modernizacija
- **Ažuriranje verzije protokola**: Ažurirano na referencu trenutačne MCP specifikacije 2025-06-18 s formatom verzije u obliku YYYY-MM-DD
- **Dorade arhitekture**: Poboljšani opisi domaćina, klijenata i servera radi odražavanja trenutnih MCP arhitektonskih obrazaca
  - Domaćini sada jasno definirani kao AI aplikacije koje koordiniraju višestruke MCP klijentske veze
  - Klijenti opisani kao protokolski konektori koji održavaju jedan-na-jedan odnose sa serverima
  - Serveri unaprijeđeni s lokalnim i udaljenim scenarijima implementacije
- **Primarno restrukturiranje**: Potpuna preinaka server i klijent primitiva
  - Server primitiva: Resursi (izvori podataka), Upiti (predlošci), Alati (izvršne funkcije) s detaljnim objašnjenjima i primjerima
  - Klijent primitiva: Uzorkovanje (dovršavanje LLM-a), Izazivanje (korisnički unos), Evidencija (debug/monitoring)
  - Ažurirano s trenutačnim obrascima metoda otkrivanja (`*/list`), dohvaćanja (`*/get`) i izvršavanja (`*/call`)
- **Arhitektura protokola**: Uveden dvoslojni model arhitekture
  - Sloj podataka: JSON-RPC 2.0 temelj s upravljanjem životnim ciklusom i primitivama
  - Prijenosni sloj: STDIO (lokalno) i Streamable HTTP sa SSE (udaljeni) prijenosni mehanizmi
- **Okvir sigurnosti**: Sveobuhvatni sigurnosni principi uključujući eksplicitan korisnički pristanak, zaštitu privatnosti podataka, sigurnost izvršavanja alata i sigurnost sloja prijenosa
- **Obrasci komunikacije**: Ažurirane protokolarne poruke za prikaz inicijalizacije, otkrivanja, izvršenja i obavještavanja
- **Primjeri koda**: Osvježeni primjeri na više jezika (.NET, Java, Python, JavaScript) za prikaz trenutnih MCP SDK obrazaca

#### Sigurnost (02-Security/) - Sveobuhvatna rekonstrukcija sigurnosti  
- **Usklađenost sa standardima**: Potpuna usklađenost sa sigurnosnim zahtjevima MCP specifikacije 2025-06-18
- **Evolucija autentifikacije**: Dokumentirana evolucija od prilagođenih OAuth servera do delegacije vanjskog pružatelja identiteta (Microsoft Entra ID)
- **Specifična analiza prijetnji za AI**: Unaprijeđeno pokrivanje modernih AI vektora napada
  - Detaljni scenariji napada injektiranjem upita s primjerima iz stvarnog svijeta
  - Mehanizmi trovanja alata i obrasci napada "rug pull"
  - Trovanje kontekstnog prozora i napadi zbunjivanja modela
- **Microsoftova AI sigurnosna rješenja**: Sveobuhvatno pokrivanje Microsoftovog sigurnosnog ekosustava
  - AI Prompt Shields s naprednim tehnikama detekcije, isticanja i odvajanja
  - Integracijski obrasci Azure Content Safety
  - GitHub Advanced Security za zaštitu lanca opskrbe
- **Napredne mjere ublažavanja prijetnji**: Detaljna sigurnosna kontrola za
  - Preuzimanje sesije s MCP-specifičnim scenarijima napada i kriptografskim zahtjevima za ID sesije
  - Problemi zbunjenog zamjenika u MCP proxy scenarijima s eksplicitnim zahtjevima za pristanak
  - Ranljivosti prolaza tokena s obaveznim kontrolama valjanosti
- **Sigurnost lanca opskrbe**: Prošireno pokrivanje AI lanca opskrbe uključujući temeljne modele, usluge ugrađivanja, pružatelje konteksta i API-je trećih strana
- **Sigurnost temelja**: Unaprijeđena integracija s obrascima tvrtke za sigurnost uključujući zero trust arhitekturu i Microsoftov sigurnosni ekosustav
- **Organizacija resursa**: Kategorizirani obuhvatni links prema tipu (Službena dokumentacija, Standardi, Istraživanje, Microsoftova rješenja, Vodiči za implementaciju)

### Poboljšanja kvalitete dokumentacije
- **Strukturirani ciljevi učenja**: Poboljšani ciljevi učenja s preciznim, izvedivim rezultatima 
- **Međureferenciranje**: Dodane poveznice između povezanih tema o sigurnosti i osnovnim konceptima
- **Trenutne informacije**: Ažurirani svi datumi i poveznice na specifikacije za trenutno važeće standarde
- **Vodič za implementaciju**: Dodani specifični, izvedivi smjernice implementacije kroz oba dijela

## 16. srpnja 2025.

### README i poboljšanja navigacije
- Potpuno redizajnirana navigacija kurikuluma u README.md
- Zamijenjeni `<details>` tagovi pristupačnijim tabličnim formatom
- Kreirane alternativne opcije izgleda u novoj mapi "alternative_layouts"
- Dodani primjeri navigacije u obliku kartica, tabova i akordeona
- Ažurirani odjeljak o strukturi repozitorija da uključi sve najnovije datoteke
- Poboljšan odjeljak "Kako koristiti ovaj kurikulum" s jasnim preporukama
- Ažurirane MCP specifikacije poveznice da upućuju na ispravne URL-ove
- Dodan odjeljak Context Engineering (5.14) u strukturu kurikuluma

### Ažuriranja vodiča za učenje
- Potpuno revidiran vodič za učenje da se uskladi sa trenutnom strukturom repozitorija
- Dodani novi odjeljci za MCP klijente i alate te popularne MCP servere
- Ažurirana Vizualna karta kurikuluma za točan prikaz svih tema
- Poboljšani opisi naprednih tema za pokrivanje svih specijaliziranih područja
- Ažuriran odjeljak Studije slučaja za prikaz stvarnih primjera
- Dodan ovaj sveobuhvatni dnevnik promjena

### Zajednički doprinosi (06-CommunityContributions/)
- Dodane detaljne informacije o MCP serverima za generiranje slika
- Dodan sveobuhvatan odjeljak o korištenju Claudea u VSCode-u
- Dodane upute za postavljanje i korištenje terminal klijenta Cline
- Ažuriran odjeljak MCP klijenata da uključi sve popularne klijentske opcije
- Poboljšani primjeri doprinosa s točnijim kodnim uzorcima

### Napredne teme (05-AdvancedTopics/)
- Organizirane sve specijalizirane teme s dosljednim imenovanjem
- Dodani materijali i primjeri o kontekstnom inženjerstvu
- Dodana dokumentacija za integraciju Foundry agenta
- Poboljšana dokumentacija o Entra ID sigurnosnoj integraciji

## 11. lipnja 2025.

### Prvotno stvaranje
- Izdana prva verzija MCP za početnike kurikuluma
- Kreirana osnovna struktura za svih 10 glavnih sekcija
- Implementirana Vizualna karta kurikuluma za navigaciju
- Dodani početni uzorci projekata na više programskih jezika

### Početak rada (03-GettingStarted/)
- Kreirani prvi primjeri implementacije servera
- Dodani smjernice za razvoj klijenta
- Uključene upute za integraciju LLM klijenta
- Dodana dokumentacija za integraciju u VS Code
- Implementirani primjeri servera sa Server-Sent Events (SSE)

### Osnovni koncepti (01-CoreConcepts/)
- Dodano detaljno objašnjenje arhitekture klijent-server
- Kreirana dokumentacija o ključnim komponentama protokola
- Dokumentirani obrasci slanja poruka u MCP-u

## 23. svibnja 2025.

### Struktura repozitorija
- Inicijaliziran repozitorij s osnovnom strukturom mapa
- Kreirani README fajlovi za svaku glavnu sekciju
- Postavljena infrastruktura za prijevode
- Dodani slikovni materijali i dijagrami

### Dokumentacija
- Kreiran početni README.md s pregledom kurikuluma
- Dodani CODE_OF_CONDUCT.md i SECURITY.md
- Postavljen SUPPORT.md s uputama za pomoć
- Kreirana preliminarna struktura vodiča za učenje

## 15. travnja 2025.

### Planiranje i okvir
- Početno planiranje MCP za početnike kurikuluma
- Definirani ciljevi učenja i ciljana publika
- Izložena struktura kurikuluma u 10 sekcija
- Razvijen konceptualni okvir za primjere i studije slučaja
- Kreirani početni prototipni primjeri za ključne koncepte

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakva nesporazumevanja ili krive interpretacije proizašle iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->