# Dnevnik sprememb: MCP za začetnike - učni načrt

Ta dokument služi kot zapis vseh pomembnih sprememb, opravljenih na učnem načrtu Model Context Protocol (MCP) za začetnike. Spremembe so dokumentirane v obratnem kronološkem vrstnem redu (najnovejše spremembe najprej).

## 5. februar 2026

### Izboljšave po celotnem repozitoriju na področju validacije in navigacije

#### Dodana nova vsebina učnega načrta

**Modul 03 - Začetek**
- **12-mcp-hosts/README.md**: Nov obsežen vodič za nastavitev gostiteljev MCP
  - Primeri konfiguracij za Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Predloge JSON konfiguracij za vse glavne gostitelje
  - Tabela primerjave vrst prenosov (stdio, SSE/HTTP, WebSocket)
  - Reševanje pogostih težav s povezavo
  - Najboljše varnostne prakse za konfiguracijo gostiteljev

- **13-mcp-inspector/README.md**: Nov vodič za odpravljanje napak z MCP Inspector
  - Načini namestitve (npx, globalni npm, iz izvorne kode)
  - Povezovanje s strežniki preko stdio in HTTP/SSE
  - Orodja za testiranje, viri in poteki pozivov
  - Integracija z VS Code za MCP Inspector
  - Pogoste situacije za odpravljanje napak s rešitvami

**Modul 04 - Praktična izvedba**
- **pagination/README.md**: Novi vodič za implementacijo paginacije
  - Vzorce paginacije na osnovi kazalca v Pythonu, TypeScriptu, Javi
  - Ravnanje s paginacijo na strani klienta
  - Strategije oblikovanja kazalcev (neprosojni proti strukturiranim)
  - Priporočila za optimizacijo zmogljivosti

**Modul 05 - Napredne teme**
- **mcp-protocol-features/README.md**: Poglobljen pregled novih lastnosti protokola
  - Implementacija obvestil o poteku
  - Vzorec prekinitve zahtev
  - Predloge virov z vzorci URI
  - Upravljanje življenjskega cikla strežnika
  - Nadzor ravni dnevnikov
  - Vzorec obravnave napak z JSON-RPC kodi

#### Popravki navigacije (posodobljenih 24+ datotek)

**Glavni modul READMEs**
 Zdaj kaže povezave tako na prvo lekcijo KOT na naslednji modul

**02-Security Poddatoteke**
- Vseh 5 dodatnih varnostnih dokumentov sedaj vsebuje navigacijo "Kaj sledi":

**09-CaseStudy Datoteke**
- Vseh datotek študij primerov ima sedaj zaporedno navigacijo:

**10-StreamliningAI Labs**
Dodana sekcija Kaj sledi v pregled modula 10 in modul 11

#### Popravki kode in vsebine

**Posodobitve SDK in odvisnosti**
Popravljena prazna različica openai na `^4.95.0`
Posodobljen SDK z `^1.8.0` na `>=1.26.0`
Posodobljene zatiči različice mcp na `>=1.26.0`

**Popravki kode**
Popravljena neveljavna različica modela `gpt-4o-mini` v `gpt-4.1-mini`

**Popravki vsebine**
Popravljena zlomljena povezava `READMEmd` → `README.md`, popravljena glava učnega načrta `Module 1-3` → `Module 0-3`, popravljena pot občutljiva na velike in male črke
Odstranjena poškodovana podvojena vsebina študije primera 5

**Izboljšave za začetnike**
Dodani ustrezni uvodi, cilji učenja in predpogoji za začetnike

#### Posodobitve učnega načrta

**Glavni README.md**
- Dodani vnosi 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Paginacija), 5.16 (Lastnosti protokola) v tabelo učnega načrta

**Modul READMEs**
Dodane lekcije 12 in 13 na seznam lekcij
Dodana sekcija Praktični vodiči s povezavo na paginacijo
Dodane lekcije 5.15 (Custom Transport) in 5.16 (Lastnosti protokola)

**study_guide.md**
- Posodobljena miselna mapa z vsemi novimi temami: nastavitev MCP gostiteljev, MCP Inspector, strategije paginacije, poglobljen pregled lastnosti protokola

## 28. januar 2026

### Pregled skladnosti MCP specifikacije 2025-11-25

#### Izboljšave osnovnih konceptov (01-CoreConcepts/)
- **Nova klientna primitiva - Roots**: Dodana obsežna dokumentacija o Roots klientni primitiv, ki strežnikom omogoča razumevanje meja datotečnega sistema in dovoljenj za dostop
- **Oznake orodij**: Dodana dokumentacija o vedenjskih oznakah orodij (`readOnlyHint`, `destructiveHint`) za boljše odločitve izvajanja orodij
- **Klic orodij pri vzorčenju**: Posodobljena dokumentacija vzorčenja za vključitev parametrov `tools` in `toolChoice` za modelom vodeno klicanje orodij med vzorčenjem zahtev
- **Elicitation v načinu URL**: Dodana dokumentacija o sprožitvi zunanjih spletnih interakcij, iniciiranih s strežnika preko URL
- **Naloge (eksperimentalno)**: Dodan nov razdelek, ki dokumentira eksperimentalno funkcijo Naloge za trajne ovitke izvajanja in odloženo pridobivanje rezultatov
- **Podpora ikonam**: Omenjeno, da lahko orodja, viri, predloge virov in pozivi sedaj vključujejo ikone kot dodatno metapodatkovno polje

#### Posodobitve dokumentacije
- **README.md**: Dodan sklic na MCP specifikacijo 2025-11-25 in pojasnilo različic po datumu
- **study_guide.md**: Posodobljen zemljevid učnega načrta za vključitev Nalog in oznak orodij v odsek osnovnih konceptov; posodobljen časovni žig dokumenta

#### Preverjanje skladnosti s specifikacijo
- **Različica protokola**: Preverjena vsa dokumentacija, da sklicuje na trenutno MCP specifikacijo 2025-11-25
- **Poravnava arhitekture**: Potrjeno pravilno dokumentiranje dvoplastne arhitekture (plastenj podatkov + plastenj prenosa)
- **Dokumentacija primitivov**: Preverjeni strežniški primitiv (Viri, Pozivi, Orodja) in klientni primitiv (Vzorčenje, Elicitation, Beleženje, Roots)
- **Mehanizmi prenosa**: Preverjena točnost opisov STDIO in HTTP prenosov
- **Varnostna priporočila**: Potrjena skladnost z aktualnimi priporočili MCP glede varnosti

#### Ključne lastnosti MCP dokumentirane za 2025-11-25
- **Odkritje OpenID Connect**: Avtorizacijski strežnik odkrito preko OIDC
- **OAuth Client ID metapodatkovni dokumenti**: Priporočeni mehanizmi registracije klientov
- **JSON Schema 2020-12**: Privzeti dialekt za definicije MCP shem
- **Sistemi več stopenj SDK**: Formalizirane zahteve za podporo in vzdrževanje funkcij SDK
- **Struktura upravljanja**: Formalizirane delovne skupine in interesne skupine v MCP strukturi upravljanja

### Velika posodobitev varnostne dokumentacije (02-Security/)

#### Integracija delavnice MCP Security Summit (Sherpa)
- **Nov vir za praktično usposabljanje**: Dodana obširna integracija z [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) v celotno varnostno dokumentacijo
- **Zajetje poti ekspedicije**: Dokumentiran celoten potek poti od baznega tabora do vrha
- **Poravnava z OWASP**: Vsa varnostna priporočila sedaj sovpadajo z OWASP MCP Azure Security Guide tveganji

#### Integracija OWASP MCP Top 10
- **Nov razdelek**: Dodana tabela OWASP MCP Top 10 varnostnih tveganj z mitigacijami v Azure v glavni varnostni README
- **Dokumentacija na podlagi tveganj**: Posodobljen mcp-security-controls-2025.md z referencami OWASP MCP tveganj za vsako varnostno področje
- **Referenčna arhitektura**: Povezava do OWASP MCP Azure Security Guide referenčne arhitekture in vzorcev implementacije

#### Posodobljene varnostne datoteke
- **README.md**: Dodan pregled delavnice Sherpa, tabela poti ekspedicije, povzetek OWASP MCP Top 10 tveganj in sekcija praktičnega usposabljanja
- **mcp-security-controls-2025.md**: Posodobljen zaglavje na februar 2026, dodane reference na OWASP tveganja (MCP01-MCP08), popravljena neskladnost verzije specifikacije
- **mcp-security-best-practices-2025.md**: Dodana sekcija virov Sherpa in OWASP, posodobljen časovni žig
- **mcp-best-practices.md**: Dodana sekcija s povezavami na praktično usposabljanje Sherpa in OWASP
- **azure-content-safety-implementation.md**: Dodana referenca OWASP MCP06, poravnava Sherpa tabor 3 in dodatna sekcija virov

#### Dodane nove povezave do virov
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Posamezne strani OWASP MCP tveganj (MCP01-MCP10)

### Usmerjanje celotnega učnega načrta na MCP specifikacijo 2025-11-25

#### Modul 03 - Začetek
- **SDK dokumentacija**: Dodan Go SDK na uradni seznam SDK; posodobljene vse reference SDK v skladu z MCP specifikacijo 2025-11-25
- **Pojasnilo prenosa**: Posodobljeni opisi za STDIO in HTTP Streaming z eksplicitnimi referencami na specifikacijo

#### Modul 04 - Praktična izvedba
- **Posodobitve SDK**: Dodan Go SDK; posodobljen seznam SDK z referenco na različico specifikacije
- **Specifikacija avtorizacije**: Posodobljen MCP Authorization specifikacijski URL na trenutno različico 2025-11-25

#### Modul 05 - Napredne teme
- **Nove funkcije**: Dodano opozorilo o novih funkcijah MCP specifikacije 2025-11-25 (Naloge, Oznake orodij, Elicitation v načinu URL, Roots)
- **Varnostni viri**: Dodane povezave na OWASP MCP Top 10 in delavnico Sherpa v dodatnih referencah

#### Modul 06 - Skupnostni prispevki
- **Seznam SDK**: Dodana Swift in Rust SDK; posodobljen referenčni URL MCP specifikacije na 2025-11-25

#### Modul 07 - Lekcije iz zgodnje uporabe
- **Posodobitve virov**: Dodana povezava MCP specifikacije 2025-11-25 in OWASP MCP Top 10 v dodatnih virih

#### Modul 08 - Najboljše prakse
- **Različica specifikacije**: Posodobljena referenca MCP specifikacije na 2025-11-25
- **Varnostni viri**: Dodane povezave OWASP MCP Top 10 in Sherpa v dodatnih referencah

#### Modul 10 - Poenostavljanje AI potekov dela
- **Posodobitev značke**: Spremenjena značka različice MCP iz različice SDK (1.9.3) na različico specifikacije (2025-11-25)
- **Povezave virov**: Posodobljena povezava MCP specifikacije; dodan OWASP MCP Top 10

#### Modul 11 - MCP strežniške praktične vaje
- **Specifikacijska referenca**: Posodobljen MCP specifikacijski URL na različico 2025-11-25
- **Varnostni viri**: Dodan OWASP MCP Top 10 med uradne vire

## 18. december 2025

### Posodobitev varnostne dokumentacije - MCP specifikacija 2025-11-25

#### Najboljše varnostne prakse MCP (02-Security/mcp-best-practices.md) - posodobitev različice specifikacije
- **Posodobitev različice protokola**: Posodobljeno na zadnjo MCP specifikacijo 2025-11-25 (izdano 25. novembra 2025)
  - Posodobljene vse reference na različice specifikacij iz 2025-06-18 na 2025-11-25
  - Posodobljeni datum dokumenta iz 18. avgusta 2025 na 18. december 2025
  - Preverjeno, da vse URL-je specifikacij kažejo na aktualno dokumentacijo
- **Preverjanje vsebine**: Celovito preverjanje najboljših varnostnih praks v skladu z zadnjimi standardi
  - **Microsoft Security Solutions**: Preverjeni aktualni termini in povezave za Prompt Shields (prej "odkrivanje tveganja jailbreak"), Azure Content Safety, Microsoft Entra ID in Azure Key Vault
  - **OAuth 2.1 varnost**: Potrjena skladnost z zadnjimi najboljšimi praksami varnosti OAuth
  - **OWASP standardi**: Preverjeni okvirji OWASP Top 10 za LLM-je so še vedno aktualni
  - **Azure storitve**: Preverjene vse Microsoft Azure dokumentacije in priporočila varnosti
- **Skladnost s standardi**: Vsi navedeni varnostni standardi so aktualni
  - Okvir za upravljanje tveganj NIST AI
  - ISO 27001:2022
  - Najboljše varnostne prakse OAuth 2.1
  - Okviri za varnost in skladnost Azure
- **Viri za izvajanje**: Preverjene vse povezave do vodnikov in virov
  - Vzorci preverjanja pristnosti v Azure API Management
  - Vodniki za integracijo Microsoft Entra ID
  - Upravljanje skrivnosti v Azure Key Vault
  - Rešitve za DevSecOps cevovode in nadzor

### Zagotavljanje kakovosti dokumentacije
- **Skladnost s specifikacijo**: Zagotovljeno, da so vsi obvezni varnostni zahtevki MCP (MORAJ/MORDA NE) skladni z zadnjo specifikacijo
- **Aktualnost virov**: Preverjene vse zunanje povezave do Microsoft dokumentacije, varnostnih standardov in vodnikov za implementacijo
- **Pokritost najboljših praks**: Potrjena celovita zajetost avtentikacije, avtorizacije, AI specifičnih groženj, varnosti dobavne verige in vzorcev za podjetja

## 6. oktober 2025

### Razširitev modula Začetek – napredna uporaba strežnika in enostavna avtentikacija

#### Napredna uporaba strežnika (03-GettingStarted/10-advanced)
- **Dodano novo poglavje**: Predstavljen obširen vodič za napredno uporabo MCP strežnika, ki pokriva tako redne kot nizkonivojske strežniške arhitekture.
  - **Redni proti nizkonivojskemu strežniku**: Podrobna primerjava in primeri kode v Pythonu in TypeScriptu za obe pristopi.
  - **Načrtovanje na osnovi upravljavcev (handlerjev)**: Razlaga upravljanja orodij/virov/pozivov preko handlerjev za prilagodljive in razširljive strežniške izvedbe.
  - **Praktični vzorci**: Resnični primeri, kjer so vzorci nizkonivojskega strežnika koristni za napredne funkcije in arhitekturo.

#### Enostavna avtentikacija (03-GettingStarted/11-simple-auth)
- **Dodano novo poglavje**: Vodič korak za korakom za implementacijo enostavne avtentikacije v MCP strežnikih.
  - **Koncepti avtentikacije**: Jasna razlaga razlik med avtentikacijo in avtorizacijo ter obravnava poverilnic.
  - **Implementacija osnovne avtentikacije**: Vzorci avtentikacije na ravni middleware v Pythonu (Starlette) in TypeScriptu (Express) s primeri kode.
  - **Napredovanje do varnosti**: Usmeritve za začetek z enostavno avtentikacijo in prehod do OAuth 2.1 in RBAC, z referencami na napredne varnostne module.

Ti dodatki zagotavljajo praktične, rokodelske napotke za gradnjo bolj robustnih, varnih in prilagodljivih MCP strežniških izvedb, povezujeta temeljne koncepte z naprednimi produkcijskimi vzorci.

## 29. september 2025

### Laboratoriji za integracijo MCP strežniške baze podatkov – celovita praktična pot učenja

#### 11-MCPServerHandsOnLabs – nov celovit učni načrt za integracijo baze podatkov
- **Celovita 13-Laboratorijska učna pot**: Dodan obsežen praktičen učni načrt za izdelavo MCP strežnikov, pripravljenih za produkcijo, z integracijo baze podatkov PostgreSQL
  - **Implementacija v resničnem svetu**: Primer uporabe Zava Retail analitike, ki prikazuje vzorce za podjetja
  - **Strukturiran napredek učenja**:
    - **Laboratoriji 00-03: Osnove** - Uvod, jedrna arhitektura, varnost in večnajemnost, nastavitev okolja
    - **Laboratoriji 04-06: Izdelava MCP strežnika** - Oblikovanje baze podatkov in sheme, implementacija MCP strežnika, razvoj orodij  
    - **Laboratoriji 07-09: Napredne funkcije** - Integracija semantičnega iskanja, testiranje in odpravljanje napak, integracija z VS Code
    - **Laboratoriji 10-12: Produkcija in dobre prakse** - Strategije uvajanja, spremljanje in opazovanje, dobre prakse in optimizacija
  - **Podjetniške tehnologije**: Okvir FastMCP, PostgreSQL z pgvector, vdelave Azure OpenAI, Azure Container Apps, Application Insights
  - **Napredne funkcije**: Varnost na ravni vrstice (RLS), semantično iskanje, dostop do podatkov za več najemnikov, vektorske vdelave, spremljanje v realnem času

#### Standardizacija terminologije - Pretvorba modula v laboratorij
- **Celovita posodobitev dokumentacije**: Sistematično posodobljeni vsi README datoteki v 11-MCPServerHandsOnLabs, da uporabljajo terminologijo »Laboratorij« namesto »Modul«
  - **Naslovi razdelkov**: Spremenjeno "Kaj zajema ta modul" v "Kaj zajema ta laboratorij" v vseh 13 laboratorijih
  - **Opis vsebine**: Spremenjeno "Ta modul zagotavlja..." v "Ta laboratorij zagotavlja..." povsod v dokumentaciji
  - **Učni cilji**: Posodobljeno "Ob koncu tega modula..." v "Ob koncu tega laboratorija..."
  - **Navigacijske povezave**: Vse reference "Modul XX:" spremenjene v "Laboratorij XX:" v navzkrižnih referencah in navigaciji
  - **Sledenje zaključku**: Posodobljeno "Po zaključku tega modula..." v "Po zaključku tega laboratorija..."
  - **Ohranitev tehničnih referenc**: Ohranili Python module reference v konfiguracijskih datotekah (npr. `"module": "mcp_server.main"`)

#### Izboljšave študijskega vodnika (study_guide.md)
- **Vizualna karta učnega načrta**: Dodan nov razdelek "11. Laboratoriji integracije baze podatkov" z obsežno vizualizacijo strukture laboratorijev
- **Struktura repozitorija**: Posodobljeno od deset na enajst glavnih razdelkov z podrobnim opisom 11-MCPServerHandsOnLabs
- **Usmeritve učne poti**: Izboljšana navodila za navigacijo za razdelke 00-11
- **Pokritost tehnologij**: Dodan opis integracije FastMCP, PostgreSQL, Azure storitev
- **Učni rezultati**: Poudarjena izdelava produkcijsko pripravljenih strežnikov, vzorci integracije baze podatkov in varnost na ravni podjetij

#### Izboljšave strukture glavnega README
- **Terminologija na osnovi laboratorijev**: Posodobljen glavni README.md v 11-MCPServerHandsOnLabs za dosledno uporabo strukture »Laboratorij«
- **Organizacija učne poti**: Jasno napredovanje od osnovnih konceptov do napredne implementacije in uvajanja v produkcijo
- **Poudarek na resničnem svetu**: Poudarek na praktičnem, roka-na-roko učenju z vzorci za podjetja in tehnologijami

### Izboljšave kvalitete in konsistence dokumentacije
- **Poudarek na praktičnem učenju**: Okrepljen praktičen, laboratorijski pristop skozi celotno dokumentacijo
- **Osredotočenost na vzorce za podjetja**: Izpostavljene produkcijsko pripravljene rešitve in varnostna vprašanja za podjetja
- **Integracija tehnologij**: Celovita pokritost sodobnih Azure storitev in vzorcev integracije umetne inteligence
- **Napredek učenja**: Jasno, strukturirano pot od osnovnih konceptov do produkcijskega uvajanja

## 26. september 2025

### Izboljšave študij primerov - Integracija GitHub MCP registracije

#### Študije primerov (09-CaseStudy/) - Osredotočenost na razvoj ekosistema
- **README.md**: Obsežna razširitev z vseobsegajočo študijo primera GitHub MCP registracije
  - **Študija primera GitHub MCP registracije**: Nova, obsežna študija primera o lansiranju GitHub MCP registracije septembra 2025
    - **Analiza problema**: Podroben pregled razdrobljenega odkrivanja MCP strežnikov in izzivov uvajanja
    - **Arhitektura rešitve**: Centraliziran pristop GitHub registracije z namestitvijo VS Code z enim klikom
    - **Poslovni vpliv**: Merljivi izboljšavi pri vključevanju in produktivnosti razvijalcev
    - **Strateška vrednost**: Poudarek na modularnem uvajanju agentov in medorodnostjo orodij
    - **Razvoj ekosistema**: Pozicioniranje kot temeljna platforma za agentno integracijo
  - **Izboljšana struktura študij primerov**: Posodobljenih vseh sedem študij z doslednim formatom in celovitimi opisi
    - Azure AI Travel Agents: poudarek na večagentni orkestraciji
    - Azure DevOps integracija: osredotočenost na avtomatizacijo delovnih tokov
    - Pridobivanje dokumentacije v realnem času: implementacija Python konzolnega odjemalca
    - Interaktivni generator študijskega načrta: spletna aplikacija Chainlit za pogovor
    - Dokumentacija v urejevalniku: integracija VS Code in GitHub Copilot
    - Azure API upravljanje: vzorci integracije API-jev podjetij
    - GitHub MCP Registry: razvoj ekosistema in platforma skupnosti
  - **Celovit zaključek**: Predelan zaključni del, ki izpostavlja sedem študij primerov, ki pokrivajo več dimenzij MCP implementacije
    - Integracija podjetij, večagentna orkestracija, produktivnost razvijalcev
    - Razvoj ekosistema, razvrstitev izobraževalnih aplikacij
    - Izboljšani vpogledi v arhitekturne vzorce, implementacijske strategije in najboljše prakse
    - Poudarek na MCP kot zrelem protokolu, pripravljenem za produkcijo

#### Posodobitve študijskega vodnika (study_guide.md)
- **Vizualna karta učnega načrta**: Posodobljen miselni zemljevid za vključitev GitHub MCP registracije v razdelek Študije primerov
- **Opis študij primerov**: Izboljšano iz generičnih opisov v podrobno razčlenitev sedmih celovitih študij primerov
- **Struktura repozitorija**: Posodobljen razdelek 10, ki odraža celovito pokritost študij primerov s specifičnimi podrobnostmi implementacije
- **Integracija dnevnika sprememb**: Dodan zapis 26. septembra 2025, ki dokumentira dodajanje GitHub MCP registracije in izboljšave študij primerov
- **Posodobitve datuma**: Posodobljen časovni žig noge dokumenta za odsev najnovejše revizije (26. september 2025)

### Izboljšave kakovosti dokumentacije
- **Izboljšanje konsistence**: Standardiziran format in struktura študij primerov v vseh sedmih primerih
- **Celostna pokritost**: Študije primerov zdaj obsegajo podjetja, produktivnost razvijalcev in razvoj ekosistema
- **Strateško pozicioniranje**: Izboljšana osredotočenost na MCP kot temeljno platformo za uvajanje agentnih sistemov
- **Integracija virov**: Posodobljeni dodatni viri za vključitev povezave do GitHub MCP registracije

## 15. september 2025

### Razširitev naprednih tem - Prilagojeni prenosi in kontekstualno inženirstvo

#### Prilagojeni MCP prenosi (05-AdvancedTopics/mcp-transport/) - Nov vodnik za napredno implementacijo
- **README.md**: Celovit vodnik za implementacijo prilagojenih mehanizmov MCP prenosa
  - **Azure Event Grid Transport**: Celovita brezstrežniška, na dogodkih temelječa implementacija prenosa
    - Primeri v C#, TypeScript in Python z integracijo Azure Functions
    - Arhitekturni vzorci za dogodkovno usmerjene rešitve MCP
    - Sprejemniki webhook in upravljanje z gnanimi sporočili
  - **Azure Event Hubs Transport**: Implementacija visokozmogljivega pretočnega prenosa
    - Realnočasovne pretočne zmožnosti za scenarije z nizko zakasnitvijo
    - Strategije particioniranja in upravljanje kontrolnih točk
    - Paketiranje sporočil in optimizacija zmogljivosti
  - **Vzorce integracije podjetij**: Produkcijsko pripravljeni arhitekturni primeri
    - Distribuirano procesiranje MCP preko več Azure Functions
    - Hibridne arhitekture prenosa, ki združujejo več vrst prenosov
    - Trajnost, zanesljivost in strategije ravnanja z napakami sporočil
  - **Varnost in spremljanje**: Integracija Azure Key Vault in vzorci opazovanja
    - Overjanje upravljanih identitet in dostop z najmanjšimi privilegiji
    - Telemetrija Application Insights in spremljanje zmogljivosti
    - Stikalniki in vzorci odpornosti na napake
  - **Testni okviri**: Celovite strategije testiranja za prilagojene prenose
    - Enotno testiranje z dvojniki in okvirji za lažno testiranje
    - Integracijsko testiranje z Azure Test Containers
    - Razmisleki o performančnem in obremenitvenem testiranju

#### Kontekstualno inženirstvo (05-AdvancedTopics/mcp-contextengineering/) - Rastoča AI disciplina
- **README.md**: Celovit pregled kontekstualnega inženirstva kot rastočega področja
  - **Osnovna načela**: Celovito deljenje konteksta, zavedanje odločitev dejanj, upravljanje kontekstnega okna
  - **Poravnava z MCP protokolom**: Kako zasnova MCP rešuje izzive kontekstualnega inženirstva
    - Omejitve kontekstnih oken in strategije postopnega nalaganja
    - Določanje relevantnosti in dinamično pridobivanje konteksta
    - Upravljanje večmodalnega konteksta in varnostni vidiki
  - **Pristopi implementacije**: Enovito in večagentno arhitekturo
    - Razčlenjevanje in prioritetizacija konteksta
    - Postopno nalaganje in strategije stiskanja konteksta
    - Plasti pristopov za kontekst in optimizacija pridobivanja
  - **Okvir za merjenje**: Rastoči merilni metodi za oceno učinkovitosti konteksta
    - Učinkovitost vnosa, zmogljivost, kakovost in uporabniška izkušnja
    - Eksperimentalni pristopi k optimizaciji konteksta
    - Analiza napak in metode izboljšav

#### Posodobitve navigacije učnih vsebin (README.md)
- **Izboljšana struktura modulov**: Posodobljena tabela učnih vsebin za vključitev novih naprednih tem
  - Dodani vnosi Context Engineering (5.14) in Custom Transport (5.15)
  - Dosledno oblikovanje in povezave za navigacijo med vsemi moduli
  - Posodobljeni opisi za odsev trenutnega obsega vsebine

### Izboljšave strukture imenikov
- **Standardizacija imen**: Preimenovan "mcp transport" v "mcp-transport" za skladnost z drugimi mapami naprednih tem
- **Organizacija vsebin**: Vse mape 05-AdvancedTopics sedaj sledijo skladnemu vzorcu imen (mcp-[tema])

### Izboljšave kakovosti dokumentacije
- **Poravnava s specifikacijo MCP**: Vsa nova vsebina se sklicuje na trenutno MCP specifikacijo 2025-06-18
- **Primeri v več jezikih**: Celoviti primeri kode v C#, TypeScript in Python
- **Osredotočenost na podjetja**: Produkcijsko pripravljeni vzorci in integracija v Azure oblak
- **Vizualna dokumentacija**: Mermaid diagrami za arhitekturo in vizualizacijo procesov

## 18. avgust 2025

### Celovita posodobitev dokumentacije - standardi MCP 2025-06-18

#### Najboljše varnostne prakse MCP (02-Security/) - Popolna modernizacija
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Popolna predelava skladno s MCP specifikacijo 2025-06-18
  - **Obvezne zahteve**: Dodane eksplicitne zahteve MUST/MUST NOT iz uradne specifikacije z jasnimi vizualnimi indikatorji
  - **12 osnovnih varnostnih praks**: Prestrukturirano iz 15-članskega seznama v celovite varnostne domene
    - Varnost žetonov in overjanje z integracijo zunanjih ponudnikov identitete
    - Upravljanje sej in varnost prenosa z uporabo kriptografskih zahtev
    - Zaščita pred grožnjami AI s pomočjo Microsoft Prompt Shields integracije
    - Nadzor dostopa in dovoljenj na osnovi principa najmanjših privilegijev
    - Varnost vsebine in spremljanje z integracijo Azure Content Safety
    - Varnost verige preskrbe z obsežnim preverjanjem komponent
    - Varstvo OAuth in preprečevanje zmede (Confused Deputy) z implementacijo PKCE
    - Odziv na incidente in okrevanje z avtomatiziranimi možnostmi
    - Skladnost in upravljanje skladno z regulativnimi zahtevami
    - Napredni varnostni nadzor s krepitvijo arhitekture ničelnega zaupanja
    - Integracija z Microsoft varnostnim ekosistemom s celovitimi rešitvami
    - Neprestan razvoj varnosti z adaptivnimi praksami
  - **Microsoft varnostne rešitve**: Izboljšane smernice za integracijo Prompt Shields, Azure Content Safety, Entra ID in GitHub Advanced Security
  - **Viri za implementacijo**: Kategorizirani obsežni viri glede na uradno MCP dokumentacijo, Microsoft varnostne rešitve, varnostne standarde in implementacijske vodnike

#### Napredni varnostni nadzori (02-Security/) - Implementacija za podjetja
- **MCP-SECURITY-CONTROLS-2025.md**: Popolna prenova z varnostnim ogrodjem za podjetja
  - **9 celovitih varnostnih domen**: Razširitev iz osnovnih nadzorov v podrobno podjetniško ogrodje
    - Napredno overjanje in avtorizacija z Microsoft Entra ID integracijo
    - Varnost žetonov in nadzor nad nepooblaščenim posredovanjem (passthrough)
    - Nadzor varnosti sej z zaščito pred prevzemi
    - AI-specifični varnostni nadzori z zaščito pred vbrizganjem in zastrupitvijo orodij
    - Preprečevanje napada Confused Deputy z varnostjo OAuth posrednika
    - Varnost izvajanja orodij z izolacijo in varnim okoljem
    - Varnost verige preskrbe z verificiranjem odvisnosti
    - Nadzor in zaznavanje z integracijo SIEM sistemov
    - Odziv na incidente in okrevanje z avtomatiziranimi postopki
  - **Primeri implementacije**: Dodani podrobni YAML konfiguracijski bloki in primeri kode
  - **Integracija Microsoft rešitev**: Celovita pokritost Azure varnostnih storitev, GitHub Advanced Security in upravljanje identitet podjetij

#### Varnost naprednih tem (05-AdvancedTopics/mcp-security/) - Produkcijsko pripravljena implementacija
- **README.md**: Popolna predelava za implementacijo varnosti na nivoju podjetij
  - **Poravnava z aktualno specifikacijo**: Posodobljeno skladu z MCP specifikacijo 2025-06-18 in obveznimi varnostnimi zahtevami
  - **Izboljšano overjanje**: Microsoft Entra ID integracija s celovitimi primeri v .NET in Java Spring Security
  - **Integracija varnosti AI**: Microsoft Prompt Shields in Azure Content Safety z podrobnimi primeri v Pythonu
  - **Napredno preprečevanje groženj**: Podrobni primeri implementacije za
    - Preprečevanje napada Confused Deputy s PKCE in preverjanjem uporabniškega soglasja
    - Preprečevanje nepooblaščenega posredovanja žetonov z validacijo občinstva in varnim upravljanjem žetonov
    - Preprečevanje prevzema sej z kriptografskim vezanjem in analizo vedenja
  - **Integracija varnosti podjetij**: Spremljanje z Azure Application Insights, cevovodi za zaznavanje groženj in varnost verige preskrbe
  - **Kontrolni seznam implementacije**: Jasna ločitev med obveznimi in priporočenimi varnostnimi nadzori z ugodnostmi iz Microsoft varnostnega ekosistema

### Izboljšave kakovosti dokumentacije in poravnave standardov
- **Sklicevanje na specifikacije**: Posodobljeni vsi sklici na trenutno MCP specifikacijo 2025-06-18
- **Microsoft varnostni ekosistem**: Krepitev smernic integracije skozi vso varnostno dokumentacijo
- **Praktična implementacija**: Dodani podrobni primeri kode v .NET, Java in Python z vzorci za podjetja
- **Organizacija virov**: Celovita kategorizacija uradne dokumentacije, varnostnih standardov in implementacijskih vodnikov 
- **Vizualni indikatorji**: Jasna označitev obveznih zahtev nasproti priporočenih praks

#### Osnovni koncepti (01-CoreConcepts/) - Celovita modernizacija
- **Posodobitev različice protokola**: Posodobljena referencia na trenutno MCP specifikacijo 2025-06-18 z datumskim označevanjem (format LLLL-MM-DD)
- **Izpopolnitev arhitekture**: Izboljšani opisi gostiteljev, odjemalcev in strežnikov za odraz trenutnih arhitekturnih vzorcev MCP
  - Gostitelji so zdaj jasno opredeljeni kot AI aplikacije, ki usklajujejo več povezav MCP odjemalcev
  - Odjemalci so opisani kot protokolarni priključki, ki vzdržujejo enonajnosežne odnose s strežniki
  - Strežniki so izboljšani z lokalnimi in oddaljenimi scenariji nameščanja
- **Primitivna prenova**: Popolna prenova strežniških in odjemalskih primitivov
  - Strežniški primitivni elementi: Viri (viri podatkov), Pozivi (predloge), Orodja (izvedljive funkcije) z podrobnimi pojasnili in primeri
  - Odjemalski primitivni elementi: Vzorcevanje (LLM zaključki), Spodbujanje (vnos uporabnika), Beleženje (razhroščevanje/nadzor)
  - Posodobljeni s trenutnimi vzorci metod iskanja (`*/list`), pridobivanja (`*/get`) in izvajanja (`*/call`)
- **Protokolna arhitektura**: Uveden dvoplastni arhitekturni model
  - Podatkovna plast: Osnova JSON-RPC 2.0 z upravljanjem življenjskega cikla in primitivnimi elementi
  - Transportna plast: STDIO (lokalni) in pretočni HTTP z SSE (oddaljeni) transportni mehanizmi
- **Varnostni okvir**: Celovita varnostna načela, vključno z izrecnim soglasjem uporabnika, varovanjem zasebnosti podatkov, varnostjo izvajanja orodij in varnostjo transportne plasti
- **Vzorce komunikacije**: Posodobljena sporočila protokola za prikaz inicializacije, iskanja, izvajanja in obveščanja
- **Primeri kode**: Osveženi večjezični primeri (.NET, Java, Python, JavaScript), ki odražajo trenutne vzorce MCP SDK

#### Varnost (02-Security/) - Celovita varnostna prenova  
- **Skladnost s standardi**: Popolna uskladitev z varnostnimi zahtevami MCP specifikacije 2025-06-18
- **Evolucija overjanja**: Dokumentirana evolucija od lastnih OAuth strežnikov do posredovanja zunanjih ponudnikov identitet (Microsoft Entra ID)
- **Analiza groženj specifičnih za AI**: Izboljšana pokritost sodobnih AI vektorjev napadov
  - Podrobni scenariji napadov z injiciranjem pozivov z resničnimi primeri
  - Mehanizmi zastrupitve orodij in vzorci napadov "rug pull"
  - Zastrupitev okna s kontekstom in napadi zmedenih modelov
- **Microsoftove varnostne rešitve za AI**: Celovita pokritost Microsoftovega varnostnega ekosistema
  - Ščiti AI pozivov z naprednim zaznavanjem, osvetlitvijo in tehnikami omejevanja
  - Integracijski vzorci Azure Content Safety
  - GitHub Advanced Security za zaščito dobavne verige
- **Napredna omilitev groženj**: Podrobni varnostni ukrepi za
  - Prevzem sej z MCP-specifičnimi scenariji napadov in kriptografskimi zahtevami za ID sej
  - Težave z zmedenim pooblaščencem v MCP proxy scenarijih z izrecnimi zahtevami po soglasju
  - Ranljivosti prehoda žetonov z obveznimi nadzornimi kontrolami veljavnosti
- **Varnost dobavne verige**: Razširjena pokritost AI dobavne verige, vključno z osnovnimi modeli, storitvami vgrajevanja, ponudniki konteksta in API-ji tretjih oseb
- **Varnost temeljev**: Izboljšana integracija z vzorci korporativne varnostne arhitekture, vključno z arhitekturo ničelnega zaupanja in Microsoftovim varnostnim ekosistemom
- **Organizacija virov**: Razvrstitev obsežnih povezav do virov po tipih (Uradna dokumentacija, Standardi, Raziskave, Microsoftove rešitve, Vodniki za implementacijo)

### Izboljšave kakovosti dokumentacije
- **Strukturirani učni cilji**: Izboljšani učni cilji s specifičnimi, izvedljivimi rezultati 
- **Medsebojni sklici**: Dodane povezave med povezanimi temami varnosti in osnovnih pojmov
- **Trenutne informacije**: Posodobljene vse datumske navedbe in povezave specifikacij na aktualne standarde
- **Smernice za izvedbo**: Dodane specifične, izvedljive smernice za uresničitev v obeh odsekih

## 16. julij 2025

### README in izboljšave navigacije
- Popolnoma prenovljena navigacija učnega načrta v README.md
- Zamenjani `<details>` oznake z bolj dostopno tabelarično obliko
- Ustvarjene alternativne možnosti postavitve v novi mapi "alternative_layouts"
- Dodani primeri navigacije v obliki kartic, zavihkov in harmonike
- Posodobljen razdelek o strukturi repozitorija z vsemi najnovejšimi datotekami
- Izboljšan razdelek "Kako uporabljati ta učni načrt" s jasnimi priporočili
- Posodobljene povezave do MCP specifikacije za pravilne URL-je
- Dodan razdelek o kontekstnem inženirstvu (5.14) v strukturo učnega načrta

### Posodobitve študijskega vodiča
- Popolnoma prenovljen študijski vodič za uskladitev s trenutno strukturo repozitorija
- Dodani novi odseki za MCP odjemalce in orodja ter priljubljene MCP strežnike
- Posodobljena vizualna mapa učnega načrta za natančen odsev vseh tem
- Izboljšani opisi naprednih tem za pokritje vseh specializiranih področij
- Posodobljen razdelek študijskih primerov z dejanskimi primeri
- Dodan ta celovit dnevnik sprememb

### Prispevki skupnosti (06-CommunityContributions/)
- Dodane podrobne informacije o MCP strežnikih za generiranje slik
- Dodan obsežen razdelek o uporabi Claude v VSCode
- Dodane navodila za nastavitev in uporabo terminalskega odjemalca Cline
- Posodobljen razdelek MCP odjemalcev z vsemi priljubljenimi možnostmi odjemalcev
- Izboljšani primeri prispevkov z natančnejšimi vzorci kode

### Napredne teme (05-AdvancedTopics/)
- Organizirane vse specializirane mape s konsistentnimi imeni
- Dodan gradivo in primeri o kontekstnem inženirstvu
- Dodana dokumentacija o integraciji agenta Foundry
- Izboljšana dokumentacija o integraciji varnosti Entra ID

## 11. junij 2025

### Začetna izdaja
- Izdana prva verzija učnega načrta MCP za začetnike
- Ustvarjena osnovna struktura vseh 10 glavnih odsekov
- Implementirana vizualna mapa učnega načrta za navigacijo
- Dodani začetni vzorčni projekti v več programskih jezikih

### Začetek dela (03-GettingStarted/)
- Ustvarjeni prvi primeri implementacije strežnika
- Dodane smernice za razvoj odjemalcev
- Vključena navodila za integracijo LLM odjemalcev
- Dodana dokumentacija za integracijo VS Code
- Implementirani primeri strežnika s strežniškimi dogodki (SSE)

### Osnovni pojmi (01-CoreConcepts/)
- Dodano podrobno pojasnilo arhitekture odjemalec-strežnik
- Ustvarjena dokumentacija o ključnih komponentah protokola
- Dokumentirani vzorci sporočanja v MCP

## 23. maj 2025

### Struktura repozitorija
- Inicializiran repozitorij z osnovno strukturo map
- Ustvarjene README datoteke za vsak večji odsek
- Nastavljena infrastruktura za prevode
- Dodani slikovni materiali in diagrami

### Dokumentacija
- Ustvarjen začetni README.md z pregledom učnega načrta
- Dodani CODE_OF_CONDUCT.md in SECURITY.md
- Nastavljen SUPPORT.md z navodili za pomoč
- Ustvarjena preliminarna struktura študijskega vodiča

## 15. april 2025

### Načrtovanje in okvir
- Začetno načrtovanje učnega načrta MCP za začetnike
- Določeni učni cilji in ciljna publika
- Opredeljena struktura učnega načrta v 10 odsekih
- Razviti konceptualni okvir za primere in študije primerov
- Ustvarjeni začetni prototipni primeri za ključne pojme

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas opozarjamo, da lahko avtomatski prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku naj velja za avtoritativni vir. Za pomembne informacije priporočamo strokovni prevod s strani človeka. Nismo odgovorni za kakršna koli nesporazumevanja ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->