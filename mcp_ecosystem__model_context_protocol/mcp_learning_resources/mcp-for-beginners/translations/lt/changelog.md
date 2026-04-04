# Pakeitimų žurnalas: MCP pradedantiesiems mokymo programa

Šis dokumentas fiksuoja visus svarbius Model Context Protocol (MCP) pradedantiesiems mokymo programos pakeitimus. Pakeitimai įrašomi atvirkštine chronologine tvarka (naujausi pakeitimai pirmiausia).

## 2026 m. vasario 5 d.

### Viso saugyklos validavimo ir navigacijos patobulinimai

#### Pridėtas naujas mokymo turinys

**Modulis 03 - Pradžia**
- **12-mcp-hosts/README.md**: Naujas išsamus vadovas, kaip nustatyti MCP šeimininkus
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfigūravimo pavyzdžiai
  - JSON konfigūracijos šablonai visiems pagrindiniams šeimininkams
  - Transporto tipų palyginimo lentelė (stdio, SSE/HTTP, WebSocket)
  - Dažniausiai pasitaikančių ryšio problemų sprendimas
  - Šeimininkų konfigūravimo saugumo geriausios praktikos

- **13-mcp-inspector/README.md**: Naujas MCP Inspector derinimo vadovas
  - Įdiegimo būdai (npx, npm global, iš šaltinio)
  - Prisijungimas prie serverių per stdio ir HTTP/SSE
  - Testavimo įrankiai, ištekliai ir užklausų srautai
  - VS Code sąsaja su MCP Inspector
  - Dažniausios derinimo situacijos su sprendimais

**Modulis 04 - Praktinė įgyvendinimas**
- **pagination/README.md**: Naujas puslapiavimo įgyvendinimo vadovas
  - Pelektoriaus pagrindu grindžiami puslapiavimo šablonai Python, TypeScript, Java
  - Paslaugų pusės puslapiavimo tvarkymas
  - Pelektoriaus dizaino strategijos (nepermatomas vs. struktūruotas)
  - Veikimo optimizavimo rekomendacijos

**Modulis 05 - Pažangios temos**
- **mcp-protocol-features/README.md**: Nauja protokolo funkcijų išsami apžvalga
  - Progreso pranešimų įgyvendinimas
  - Užklausų atšaukimo šablonai
  - Ištekliai šablonai su URI šablonais
  - Serverio gyvavimo ciclo valdymas
  - Žurnalų lygio kontrolė
  - Klaidos tvarkymo šablonai su JSON-RPC kodais

#### Navigacijos pataisymai (atnaujinta daugiau nei 24 failai)

**Pagrindinių modulių README**
Dabar nuorodos rodo tiek į pirmąją pamoką, TIEK į kitą modulį

**02-Security aplanko failai**
Visi 5 papildomi saugumo dokumentai dabar turi „Kas toliau“ navigaciją:

**09-CaseStudy failai**
Visuose atvejų tyrimo failuose dabar yra nuosekli navigacija:

**10-StreamliningAI laboratorijos**
Pridėta „Kas toliau“ skiltis Modulių 10 apžvalgoje ir Modulyje 11

#### Kodo ir turinio pataisymai

**SDK ir priklausomybių atnaujinimai**
Ištaisytas tuščias openai versijos „^4.95.0“
SDK atnaujintas nuo `^1.8.0` iki `>=1.26.0`
mcp versijos priklijuotės atnaujintos į `>=1.26.0`

**Kodo pataisymai**
Ištaisytas negaliojantis modelis `gpt-4o-mini` į `gpt-4.1-mini`

**Turinio pataisymai**
Ištaisytas sulūžęs nuorodos pavadinimas „READMEmd“ į „README.md“, ištaisytas mokymo programos antraštės pavadinimas nuo „Module 1-3“ į „Module 0-3“, ištaisytas didžiųjų ir mažųjų raidžių netikslumas keliuose keliuose
Pašalintas sugadintas dubliuotas Atvejo Tyrimo 5 turinys

**Pradedančiųjų gairių patobulinimai**
Pridėta tinkama įžanga, mokymosi tikslai ir išankstinės sąlygos pradedantiesiems

#### Mokymo programos atnaujinimai

**Pagrindinis README.md**
- Pridėtos 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) įrašai į mokymo programos lentelę

**Mokymo modulio README**
Pridėtos 12 ir 13 pamokos į pamokų sąrašą
Pridėta praktinių vadovų dalis su puslapiavimo nuoroda
Pridėtos pamokos 5.15 (Custom Transport) ir 5.16 (Protocol Features)

**study_guide.md**
- Atnaujinta minčių žemėlapis su visomis naujomis temomis: MCP Hosts Setup, MCP Inspector, Pagination Strategies, Protocol Features Deep Dive

## 2026 m. sausio 28 d.

### MCP specifikacijos 2025-11-25 atitikties peržiūra

#### Pagrindinių koncepcijų patobulinimas (01-CoreConcepts/)
- **Naujas klientų primityvas - Roots**: pridėta išsami dokumentacija apie „Roots“ klientų primityvą, leidžiantį serveriams suprasti failų sistemos ribas ir prieigos leidimus
- **Įrankių anotacijos**: pridėta dokumentacija apie įrankių elgsenos anotacijas (`readOnlyHint`, `destructiveHint`), kad būtų geriau sprendžiama dėl įrankių vykdymo
- **Įrankių kvietimas samplinimo metu**: atnaujinta samplinimo dokumentacija įtraukiant `tools` ir `toolChoice` parametrus, modelio valdomam įrankių kvietimui samplinimo užklausose
- **URL režimo iškvietimas**: pridėta dokumentacija apie URL pagrįstą iškvietimą, skirtą serverio inicijuotoms išorinėms interneto sąveikoms
- **Užduotys (eksperimentinės)**: pridėta nauja skiltis, dokumentuojanti eksperimentinę Užduočių funkciją, skirtą patvariai vykdomiems apvalkalams ir vėlesniam rezultatų gavimui
- **Piktogramų palaikymas**: nurodyta, kad įrankiai, ištekliai, išteklių šablonai ir užklausos dabar gali turėti piktogramas kaip papildomą metaduomenį

#### Dokumentacijos atnaujinimai
- **README.md**: pridėta MCP specifikacijos 2025-11-25 versijos nuoroda ir pagal datą taikomo versijavimo paaiškinimas
- **study_guide.md**: atnaujinta mokymo programos žemėlapis su Užduotimis ir Įrankių anotacijomis pagrindinių koncepcijų skiltyje; atnaujintas dokumento laiko žymėjimas

#### Specifikacijos atitikties patikra
- **Protokolo versija**: patikrinta, kad visa dokumentacija nurodo dabartinę MCP specifikaciją 2025-11-25
- **Architektūros suderinamumas**: patvirtinta dviejų sluoksnių architektūros (Duomenų sluoksnis + Transporto sluoksnis) dokumentacijos tikslumas
- **Primityvų dokumentacija**: patikrinti serverio primityvai (Ištekliai, Užklausos, Įrankiai) ir kliento primityvai (Samplinimas, Iškvietimas, Žurnalas, Roots)
- **Transporto mechanizmai**: patikrinta STDIO ir Streamable HTTP transporto dokumentacija
- **Saugumo gairės**: patvirtinta atitiktis su dabartinėmis MCP saugumo geriausiomis praktikomis

#### Svarbiausios MCP 2025-11-25 funkcijos, dokumentuotos
- **OpenID Connect atradimas**: Autentifikavimo serverio atradimas per OIDC
- **OAuth kliento ID metaduomenų dokumentai**: rekomenduojamas kliento registracijos mechanizmas
- **JSON Schema 2020-12**: numatytasis MCP schemų apibrėžimų dialektas
- **SDK lygiavimo sistema**: formalizuotos SDK funkcijų palaikymo ir priežiūros reikalavimai
- **Valdymo struktūra**: formalizuoti Darbo grupės ir Susidomėjimo grupės MCP valdyme

### Saugumo dokumentacijos didelis atnaujinimas (02-Security/)

#### MCP Saugumo viršūnių dirbtuvės (Sherpa) integracija
- **Naujas praktinis mokymų šaltinis**: pridėta išsami integracija su [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) visuose saugumo dokumentuose
- **Ekspedicijos maršruto aprašymas**: dokumentuotas visas kelias nuo Bazinio stovyklos iki Viršūnės stovyklos
- **OWASP suderinamumas**: visa saugumo gaires dabar pritaikytos pagal OWASP MCP Azure Security Guide rizikas

#### OWASP MCP Top 10 integracija
- **Nauja skiltis**: pridėta OWASP MCP Top 10 saugumo rizikų lentelė su Azure rizikos mažinimo priemonėmis pagrindiniame Security README
- **Rizikai pritaikyta dokumentacija**: atnaujintas mcp-security-controls-2025.md su OWASP MCP rizikos nuorodomis kiekvienai saugumo sričiai
- **Nuoroda į architektūrą**: pridėta nuoroda į OWASP MCP Azure Security Guide architektūrą ir įgyvendinimo šablonus

#### Atnaujinti saugumo failai
- **README.md**: pridėta Sherpa dirbtuvių apžvalga, ekspedicijos maršruto lenta, OWASP MCP Top 10 rizikų santrauka ir praktinių mokymų skiltis
- **mcp-security-controls-2025.md**: atnaujinta antraštė į 2026 m. vasarį, pridėtos OWASP rizikos (MCP01-MCP08), pataisyta specifikacijos versijų neatitikimas
- **mcp-security-best-practices-2025.md**: pridėta Sherpa ir OWASP išteklių skiltis, atnaujintas laiko žymėjimas
- **mcp-best-practices.md**: pridėta praktinių mokymų dalis su Sherpa ir OWASP nuorodomis
- **azure-content-safety-implementation.md**: pridėta OWASP MCP06 nuoroda, Sherpa stovyklos 3 suderinamumas ir papildoma išteklių skiltis

#### Pridėtos naujos išteklių nuorodos
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Atskirų OWASP MCP rizikos puslapiai (MCP01-MCP10)

### Visos mokymo programos atitiktis MCP specifikacijai 2025-11-25

#### Modulis 03 - Pradžia
- **SDK dokumentacija**: pridėtas Go SDK prie oficialaus SDK sąrašo; atnaujinti visi SDK nuorodos, kad atitiktų MCP specifikaciją 2025-11-25
- **Transporto paaiškinimai**: atnaujinti STDIO ir HTTP srautinio perdavimo aprašymai su aiškiomis specifikacijos nuorodomis

#### Modulis 04 - Praktinė įgyvendinimas
- **SDK atnaujinimai**: pridėtas Go SDK; atnaujintas SDK sąrašas su specifikacijos versijos nuoroda
- **Autorizacijos specifikacija**: atnaujinta MCP autorizacijos specifikacijos nuoroda į dabartinę 2025-11-25 versiją

#### Modulis 05 - Pažangios temos
- **Naujos funkcijos**: pridėta pastaba apie naujas MCP specifikacijos 2025-11-25 funkcijas (Užduotys, Įrankių anotacijos, URL režimo iškvietimas, Roots)
- **Saugumo ištekliai**: pridėtos nuorodos į OWASP MCP Top 10 ir Sherpa dirbtuves papildomuose ištekliuose

#### Modulis 06 - Bendruomenės indėliai
- **SDK sąrašas**: pridėti Swift ir Rust SDK; atnaujinta specifikacijos nuoroda į 2025-11-25
- **Specifikacijos nuoroda**: atnaujinta MCP specifikacijos nuoroda į tiesioginį specifikacijos URL

#### Modulis 07 - Ankstyvosios diegimo pamokos
- **Ištekliai atnaujinimai**: pridėta MCP specifikacijos 2025-11-25 nuoroda ir OWASP MCP Top 10 prie papildomų išteklių

#### Modulis 08 - Geriausios praktikos
- **Specifikacijos versija**: atnaujinta MCP specifikacijos nuoroda į 2025-11-25
- **Saugumo ištekliai**: pridėtos nuorodos į OWASP MCP Top 10 ir Sherpa dirbtuves papildomuose ištekliuose

#### Modulis 10 - AI darbo srautų optimizavimas
- **Ženklelio atnaujinimas**: pakeistas MCP versijos ženklelis nuo SDK versijos (1.9.3) į specifikacijos versiją (2025-11-25)
- **Ištekliai**: atnaujinta MCP specifikacijos nuoroda; pridėta OWASP MCP Top 10

#### Modulis 11 - MCP serverio praktinės laboratorijos
- **Specifikacijos nuoroda**: atnaujinta MCP specifikacijos nuoroda į 2025-11-25 versiją
- **Saugumo ištekliai**: pridėta OWASP MCP Top 10 prie oficialių išteklių

## 2025 m. gruodžio 18 d.

### Saugumo dokumentacijos atnaujinimas - MCP specifikacija 2025-11-25

#### MCP saugumo geriausios praktikos (02-Security/mcp-best-practices.md) – specifikacijos versijos atnaujinimas
- **Protokolo versijos atnaujinimas**: atnaujinta nurodyti naujausią MCP specifikaciją 2025-11-25 (išleista 2025 m. lapkričio 25 d.)
  - atnaujintos visos specifikacijos versijų nuorodos nuo 2025-06-18 iki 2025-11-25
  - atnaujintos dokumento datų nuorodos nuo 2025 m. rugpjūčio 18 d. iki 2025 m. gruodžio 18 d.
  - patikrinta, kad visos specifikacijos URL yra nukreipiamos į dabartinę dokumentaciją
- **Turinio patikra**: visiškai patikrinta saugumo geriausių praktikų atitiktis naujausiems standartams
  - **Microsoft saugumo sprendimai**: patikrintas dabartinis terminologijos ir nuorodų tikslumas apie Prompt Shields (ankstesnis pavadinimas „Jailbreak risk detection“), Azure Content Safety, Microsoft Entra ID ir Azure Key Vault
  - **OAuth 2.1 saugumas**: patvirtinta atitiktis naujausioms OAuth saugumo geriausioms praktikoms
  - **OWASP standartai**: patikrinta, kad OWASP Top 10 LLM nuorodos išlieka aktualios
  - **Azure paslaugos**: patikrintos visos Microsoft Azure dokumentacijos nuorodos ir geriausios praktikos
- **Standardų atitiktis**: visi nurodyti saugumo standartai patvirtinti kaip dabartiniai
  - NIST AI rizikos valdymo sistema
  - ISO 27001:2022
  - OAuth 2.1 saugumo geriausios praktikos
  - Azure saugumo ir atitikties sistemos
- **Įgyvendinimo ištekliai**: patikrintos visos įgyvendinimo gaires ir ištekliai
  - Azure API valdymo autentifikacijos šablonai
  - Microsoft Entra ID integracijos vadovai
  - Azure Key Vault slaptažodžių valdymas
  - DevSecOps vamzdynai ir stebėjimo sprendimai

### Dokumentacijos kokybės užtikrinimas
- **Specifikacijos atitiktis**: užtikrinta, kad visi privalomi MCP saugumo reikalavimai (BŪTINA / NEGALIMA) atitinka naujausią specifikaciją
- **Išteklių atnaujinimas**: patikrinta, kad visos išorinės nuorodos į Microsoft dokumentaciją, saugumo standartus ir įgyvendinimo gaires yra galiojančios
- **Geriausių praktikų aprėptis**: patvirtinta išsamus autentifikacijos, autorizacijos, su AI susijusių grėsmių, tiekimo grandinės saugumo ir įmonių šablonų aprašymas

## 2025 m. spalio 6 d.

### Pradžios skyriaus išplėtimas – pažangus serverio naudojimas ir paprasta autentifikacija

#### Pažangus serverio naudojimas (03-GettingStarted/10-advanced)
- **Pridėta nauja skiltis**: pristatytas išsamus MCP pažangaus serverio naudojimo vadovas, apimantis tiek įprastą, tiek žemo lygio serverio architektūras.
  - **Įprastas vs. žemo lygio serveris**: išsamus palyginimas ir kodo pavyzdžiai Python ir TypeScript abiem atvejais.
  - **Handlerių pagrindu grįstas dizainas**: paaiškinimas apie handlerių pagrindu valdomą įrankių/išteklių/užklausų tvarkymą, siekiant skalabilaus ir lankstaus serverio įgyvendinimo.
  - **Praktiniai šablonai**: realūs scenarijai, kur žemo lygio serverio šablonai yra naudingi pažangioms funkcijoms ir architektūrai.

#### Paprasta autentifikacija (03-GettingStarted/11-simple-auth)
- **Pridėta nauja skiltis**: žingsnis po žingsnio vadovas, kaip įgyvendinti paprastą autentifikaciją MCP serveriuose.
  - **Autentifikacijos sąvokos**: aiškus autentifikacijos ir autorizacijos, taip pat kredencialų tvarkymo paaiškinimas.
  - **Paprastos autentifikacijos įgyvendinimas**: vidurinės programinės įrangos pagrindu veikiantys autentifikacijos šablonai Python (Starlette) ir TypeScript (Express), su kodo pavyzdžiais.
  - **Perėjimas prie pažangesnio saugumo**: gairės pradėti nuo paprastos autentifikacijos ir pereiti prie OAuth 2.1 bei RBAC, su nuorodomis į pažangius saugumo modulius.

Šie papildymai suteikia praktinės, rankomis vedamos pagalbos, kaip kurti stabilesnius, saugesnius ir lankstesnius MCP serverio įgyvendinimus, sujungiant pagrindines koncepcijas su pažangiais gamybos šablonais.

## 2025 m. rugsėjo 29 d.

### MCP serverio duomenų bazės integracijos laboratorijos – išsamus praktinis mokymų kelias

#### 11-MCPServerHandsOnLabs – nauja išsami duomenų bazės integracijos mokymo programa
- **Išsamus 13 laboratorijų mokymosi kelias**: Pridėtas visapusiškas praktinis mokymas, skirtas kurti gamybai paruoštus MCP serverius su PostgreSQL duomenų bazės integracija  
  - **Realus įgyvendinimas**: Zava Retail analizės atvejis, demonstruojantis įmonių lygio modelius  
  - **Struktūruotas mokymosi progresas**:  
    - **Laboratorijos 00-03: Pagrindai** – Įvadas, pagrindinė architektūra, saugumas ir daugiaveiksmiškumas, aplinkos nustatymas  
    - **Laboratorijos 04-06: MCP serverio kūrimas** – Duomenų bazės dizainas ir schema, MCP serverio įgyvendinimas, įrankių kūrimas  
    - **Laboratorijos 07-09: Pažangios funkcijos** – Semantinės paieškos integracija, testavimas ir derinimas, VS Code integracija  
    - **Laboratorijos 10-12: Gamyba ir geriausia praktika** – Diegimo strategijos, stebėjimas ir stebimumas, geriausios praktikos ir optimizavimas  
  - **Įmonių technologijos**: FastMCP karkasas, PostgreSQL su pgvector, Azure OpenAI įterpiniai, Azure Container Apps, Application Insights  
  - **Pažangios funkcijos**: Eilučių lygio saugumas (RLS), semantinė paieška, daugiatarifinis duomenų pasiekiamumas, vektoriniai įterpiniai, realaus laiko stebėjimas  

#### Terminologijos standartizavimas – Modulių konvertavimas į laboratorijas  
- **Išsami dokumentacijos atnaujinimas**: Sistemingai atnaujinti visi README failai 11-MCPServerHandsOnLabs, kad būtų vartojama „Laboratorija“ vietoj „Modulis“  
  - **Skyriaus antraštės**: Pakeista „What This Module Covers“ į „What This Lab Covers“ visuose 13 laboratorijų failuose  
  - **Turinio aprašymas**: „This module provides…“ pakeista į „This lab provides…“ visoje dokumentacijoje  
  - **Mokymosi tikslai**: „By the end of this module…“ pakeista į „By the end of this lab…“  
  - **Navigacijos nuorodos**: Visos nuorodos iš „Module XX:“ pakeistos į „Lab XX:“ kryžminėse nuorodose ir navigacijoje  
  - **Užbaigimo sekimas**: „After completing this module…“ pakeista į „After completing this lab…“  
  - **Išsaugoti techniniai nuorodai**: Python modulio nuorodos konfigūracijų failuose (pvz., `"module": "mcp_server.main"`) liko nepakitusios  

#### Mokymosi vadovo patobulinimas (study_guide.md)  
- **Vizualinė mokymo programa**: Pridėtas naujas skyrius „11. Database Integration Labs“ su išsamia laboratorijų struktūros vizualizacija  
- **Saugyklos struktūra**: Atnaujinta nuo dešimties iki vienuolikos pagrindinių skyrių su detaliu 11-MCPServerHandsOnLabs aprašu  
- **Mokymosi kelio gairės**: Patobulintos navigacijos instrukcijos, apimančios skyrius 00-11  
- **Technologijų aprėptis**: Pridėta informacija apie FastMCP, PostgreSQL, Azure paslaugų integraciją  
- **Mokymosi rezultatai**: Pabrėžtas gamybai paruoštų serverių kūrimas, duomenų bazės integracijos modeliai ir įmonių saugumas  

#### Pagrindinio README struktūros patobulinimas  
- **Laboratorijomis grįsta terminologija**: Pagrindiniame README.md faile 11-MCPServerHandsOnLabs nuosekliai naudota „Laboratorijos“ struktūra  
- **Mokymosi kelio organizavimas**: Aiškus progresas nuo pagrindinių koncepcijų iki pažangios įgyvendinimo ir gamybos diegimo  
- **Realus dėmesys**: Pabrėžtas praktinis, ranka į ranką mokymas su įmonių lygio modeliais ir technologijomis  

### Dokumentacijos kokybės ir nuoseklumo gerinimas  
- **Praktinio mokymosi akcentas**: Sustiprintas praktinis, laboratorijomis grįstas požiūris visoje dokumentacijoje  
- **Įmonių modelių dėmesys**: Išryškinti gamybai paruošti įgyvendinimai ir įmonių saugumo aspektai  
- **Technologijų integracija**: Visapusiška šiuolaikinių Azure paslaugų ir DI integracijos modelių apžvalga  
- **Mokymosi progresas**: Aiškus, struktūruotas kelias nuo pagrindų iki gamybos diegimo  

## 2025 m. rugsėjo 26 d.

### Atvejų studijos patobulinimas – GitHub MCP registracijos integracija  

#### Atvejų studijos (09-CaseStudy/) – Ekosistemos vystymo akcentas  
- **README.md**: Išsamus GitHub MCP registracijos atvejo studijos išplėtimas  
  - **GitHub MCP registracijos atvejo studija**: Nauja išsami atvejo studija apie GitHub MCP registracijos pristatymą 2025 m. rugsėjį  
    - **Problemos analizė**: Išsamus išskaidytų MCP serverių paieškos ir diegimo iššūkių tyrimas  
    - **Sprendimo architektūra**: GitHub centralizuota registracija su vieno paspaudimo VS Code diegimu  
    - **Verslo poveikis**: Matuojamas programuotojų įsitraukimo ir produktyvumo pagerėjimas  
    - **Strateginė vertė**: Akcentas į modulinį agentų diegimą ir tarpįrankių suderinamumą  
    - **Ekosistemos vystymas**: Pozicionavimas kaip pagrindinė agentų integracijos platforma  
  - **Papildomas atvejų studijų struktūros tobulinimas**: Visos septynios atvejos studijos atnaujintos su nuoseklumu ir išsamiais aprašymais  
    - Azure AI kelionių agentai: Daugiaagentė orchestracija  
    - Azure DevOps integracija: Darbo eigų automatizavimas  
    - Realaus laiko dokumentacijos gavimas: Python konsolės klientas  
    - Interaktyvus mokymosi plano generatorius: Chainlit pokalbių žiniatinklio programa  
    - Dokumentacija redaktoriuje: VS Code ir GitHub Copilot integracija  
    - Azure API valdymas: Įmonių API integracijos modeliai  
    - GitHub MCP registracija: Ekosistemos vystymas ir bendruomenės platforma  
  - **Išsami išvada**: Perrašyta išvados dalis su septynių atvejų studijų apžvalga, apimančia daugybę MCP įgyvendinimo aspektų  
    - Įmonių integracija, daugiaagentė orchestracija, programuotojų produktyvumas  
    - Ekosistemos vystymas, švietimo programų kategorijos  
    - Išsamūs įžvalgų apie architektūros modelius, įgyvendinimo strategijas ir geriausias praktikas  
    - Pabrėžtas MCP kaip brandus, gamybai paruoštas protokolas  

#### Mokymosi vadovo atnaujinimai (study_guide.md)  
- **Vizualinė mokymo programa**: Atnaujinta prototipo schema įtraukiant GitHub MCP registraciją Atvejų studijų skyriuje  
- **Atvejų studijų aprašymas**: Išplėstas nuo bendrinių aprašymų iki detalių septynių išsamių atvejų studijų  
- **Saugyklos struktūra**: Atnaujintas 10 skyrius, apimantis išsamią atvejų studijų analizę su konkrečia įgyvendinimo informacija  
- **Pakeitimų žurnalas**: Pridėtas 2025 m. rugsėjo 26 d. įrašas, dokumentuojantis GitHub MCP registracijos pridėjimą ir atvejų studijų patobulinimus  
- **Datos atnaujinimai**: Atnaujintas apačios laiko žyma, atspindinti naujausią versiją (2025 m. rugsėjo 26 d.)  

### Dokumentacijos kokybės gerinimas  
- **Nuoseklumo stiprinimas**: Standartizuota atvejų studijų formatavimas ir struktūra visuose septyniuose pavyzdžiuose  
- **Išsamus aprėptis**: Atvejų studijos apima įmonių, programuotojų produktyvumo ir ekosistemos vystymo scenarijus  
- **Strateginis pozicionavimas**: Sustiprintas dėmesys MCP kaip pagrindinei agentinių sistemų diegimo platformai  
- **Ištekliai**: Atnaujinti papildomi ištekliai, įtraukiantys GitHub MCP registracijos nuorodą  

## 2025 m. rugsėjo 15 d.

### Pažangių temų plėtra – pasirinktinių transportų ir konteksto inžinerija  

#### MCP pasirinktini transportai (05-AdvancedTopics/mcp-transport/) – Naujas pažangios įgyvendinimo vadovas  
- **README.md**: Pilnas pasirinktinių MCP transportavimo mechanizmų įgyvendinimo vadovas  
  - **Azure Event Grid transportas**: Išsami serverless įvykių valdomo transporto įgyvendinimas  
    - C#, TypeScript ir Python pavyzdžiai su Azure Functions integracija  
    - Įvykių valdymo architektūros modeliai mastelio MCP sprendimams  
    - Webhook gavėjai ir pranešimų push apdorojimas  
  - **Azure Event Hubs transportas**: Didelio pralaidumo srautinio transporto įgyvendinimas  
    - Realaus laiko srautinio duomenų apdorojimo galimybės mažo delsimo scenarijuose  
    - Particionavimo strategijos ir kontrolinių taškų valdymas  
    - Pranešimų partijos ir našumo optimizavimas  
  - **Įmonių integracijos modeliai**: Gamybai paruošti architektūros pavyzdžiai  
    - Išskirta MCP apdorojimas per kelias Azure Functions funkcijas  
    - Hibridiniai transporto modeliai, derinantys kelis tipų variantus  
    - Pranešimų patvarumas, patikimumas ir klaidų valdymo strategijos  
  - **Sauga ir stebėjimas**: Azure Key Vault integracija ir stebimumo modeliai  
    - Valdomos tapatybės autentifikacija ir minimalios privilegijos prieiga  
    - Application Insights telemetrija ir našumo stebėjimas  
    - (Circuit breaker) grandinės pertraukikliai ir gedimų tolerancijos modeliai  
  - **Testavimo sistemų integracija**: Išsamios testavimo strategijos pasirinktiniams transportams  
    - Vienetinis testavimas su testų dublikatais ir imitacijomis  
    - Integraciniai testai su Azure Test Containers  
    - Našumo ir apkrovos testavimas  

#### Konteksto inžinerija (05-AdvancedTopics/mcp-contextengineering/) – Išsiskleidžianti DI disciplina  
- **README.md**: Išsami konteksto inžinerijos kaip naujos srities analizė  
  - **Pagrindinės principai**: Pilnas konteksto dalijimasis, veiksmų sprendimų suvokimas ir konteksto lango valdymas  
  - **MCP protokolo derinimas**: Kaip MCP dizainas sprendžia konteksto inžinerijos iššūkius  
    - Konteksto lango ribojimai ir progresyvaus užkrovimo strategijos  
    - Reikšmingumo nustatymas ir dinaminis konteksto gavimas  
    - Daugiabūdis konteksto tvarkymas ir saugumo aspektai  
  - **Įgyvendinimo būdai**: Viengubos gijos vs. daugiaagentės architektūros  
    - Konteksto dalijimas į dalis ir prioritizavimo technikos  
    - Progresyvus konteksto užkrovimas ir suspaudimo strategijos  
    - Sluoksniuotos konteksto prieigos ir gavimo optimizavimas  
  - **Matuoklių sistema**: Naujos konteksto efektyvumo vertinimo metrikos  
    - Įvesties efektyvumas, našumas, kokybė ir vartotojo patirties aspektai  
    - Eksperimentiniai konteksto optimizavimo metodai  
    - Klaidos analizė ir tobulinimo metodikos  

#### Mokymo programos navigacijos atnaujinimai (README.md)  
- **Patobulinta modulio struktūra**: Atnaujinta mokymo plano lentelė, įtraukiant naujas pažangias temas  
  - Pridėti temos „Konteksto inžinerija (5.14)“ ir „Pasirinktinis transportas (5.15)“  
  - Nuoseklus formatavimas ir navigacijos nuorodos visuose moduliuose  
  - Atnaujinti aprašymai, atspindintys esamą turinio aprėptį  

### Katalogų struktūros patobulinimai  
- **Pavadinimų standartizavimas**: „mcp transport“ pervadintas į „mcp-transport“, kad atitiktų kitų pažangių temų katalogų pavadinimus  
- **Turinio organizavimas**: Visi 05-AdvancedTopics katalogai dabar laikosi nuoseklaus pavadinimų formato (mcp-[tema])  

### Dokumentacijos kokybės patobulinimai  
- **MCP specifikacijos atitikimas**: Visa nauja medžiaga nurodo MCP specifikaciją 2025-06-18  
- **Daugiakalbiai pavyzdžiai**: Išsamūs kodų pavyzdžiai C#, TypeScript ir Python kalbomis  
- **Įmonių dėmesys**: Gamybai paruošti modeliai ir Azure debesijos integracija visame turinyje  
- **Vizualinė dokumentacija**: Mermaid diagramos architektūrai ir srautų vizualizacijai  

## 2025 m. rugpjūčio 18 d.

### Išsamus dokumentacijos atnaujinimas – MCP 2025-06-18 standartai  

#### MCP saugumo gerosios praktikos (02-Security/) – Visiškas modernizavimas  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Visiškas tekstas suderintas su MCP specifikacija 2025-06-18  
  - **Privalomi reikalavimai**: Pridėti aiškūs „TURI“ / „NETURI“ reikalavimai pagal oficialią specifikaciją su aiškiais grafiniais indikatoriumi  
  - **12 pagrindinių saugumo praktikų**: Pertvarkyta iš 15 punktų į nuoseklias saugumo sritis  
    - Žetono saugumas ir autentifikacija su išorinių tapatybės teikėjų integracija  
    - Sesijos valdymas ir transporto saugumas su kriptografiniais reikalavimais  
    - DI specifinė grėsmių apsauga su Microsoft Prompt Shields integracija  
    - Prieigos valdymas ir leidimai pagal minimalios privilegijos principą  
    - Turinys saugumas ir stebėsena su Azure Content Safety integracija  
    - Tiekimo grandinės saugumas su išsamia komponentų patikra  
    - OAuth saugumas ir Confused Deputy prevencija su PKCE įgyvendinimu  
    - Incidentų valdymas ir atkūrimas su automatizuotais sprendimais  
    - Atitiktis ir valdymas pagal reglamentus  
    - Pažangūs saugumo valdymo mechanizmai su nulinės pasitikėjimo architektūra  
    - Microsoft saugumo ekosistemos integracija  
    - Nuolatinė saugumo evoliucija su adaptuojamomis praktikomis  
  - **Microsoft saugumo sprendimai**: Išplėsta Prompt Shields, Azure Content Safety, Entra ID ir GitHub Advanced Security integracijos rekomendacijos  
  - **Įgyvendinimo ištekliai**: Išrikiuoti ištekliai oficialiai MCP dokumentacijai, Microsoft sprendimams, saugumo standartams ir įgyvendinimo vadovams  

#### Pažangūs saugumo valdymo mechanizmai (02-Security/) – Įmonių įgyvendinimas  
- **MCP-SECURITY-CONTROLS-2025.md**: Visiškas perrašymas su įmonių lygio saugumo architektūra  
  - **9 išsamios saugumo sritys**: Išplėsta nuo pagrindinių kontrolės priemonių iki detalaus įmonių lygio modelio  
    - Pažangus autentifikavimas ir autorizacija su Microsoft Entra ID integracija  
    - Žetonų saugumas ir anti-passthrough kontrolės su išsamiu patikrinimu  
    - Sesijos saugumo kontrolės su apsauga nuo užgrobimo  
    - DI specifinės saugumo kontrolės su apsauga nuo klaidingo įvedimo ir įrankių užnuodijimo  
    - Confused Deputy atakos prevencija su OAuth proxy saugumu  
    - Įrankių vykdymo saugumas su aplinkos atskyrimu ir ribojimu  
    - Tiekimo grandinės saugumo kontrolės su priklausomybių patikra  
    - Stebėsena ir aptikimo mechanizmai su SIEM integracija  
    - Incidentų valdymas ir atkūrimas su automatizacija  
  - **Įgyvendinimo pavyzdžiai**: Pridėti išsamūs YAML konfigūracijos blokai ir kodo pavyzdžiai  
  - **Microsoft sprendimų integracija**: Žymiai plati Azure saugumo paslaugų, GitHub Advanced Security ir įmonių tapatybės valdymo aprėptis  

#### Pažangių temų saugumas (05-AdvancedTopics/mcp-security/) – Gamybai paruoštas įgyvendinimas  
- **README.md**: Visiškas perrašymas įmonių lygio saugumo įgyvendinimui  
  - **Atitikimas dabartinei specifikacijai**: Atnaujinta pagal MCP specifikaciją 2025-06-18 su privalomais saugumo reikalavimais  
  - **Patobulinta autentifikacija**: Microsoft Entra ID integracija su išsamiais .NET ir Java Spring Security pavyzdžiais  
  - **DI saugumo integracija**: Microsoft Prompt Shields ir Azure Content Safety įgyvendinimas su detaliais Python pavyzdžiais  
  - **Pažangūs grėsmių šalinimo metodai**: Išsamūs įgyvendinimo pavyzdžiai  
    - Confused Deputy atakos prevencija su PKCE ir vartotojo sutikimo patikra  
    - Žetono praleidimo prevencija su auditorijos tikrinimu ir saugiu žetonų valdymu  
    - Sesijos užgrobimo prevencija su kriptografiniais ryšiais ir elgesio analize  
  - **Verslo saugumo integracija**: Azure Application Insights stebėsena, grėsmių aptikimo srautai ir tiekimo grandinės saugumas  
  - **Įgyvendinimo kontrolinis sąrašas**: Aiškus skirtumas tarp privalomų ir rekomenduojamų saugumo priemonių bei Microsoft saugumo ekosistemos privalumų  

### Dokumentacijos kokybės ir standartų atitikimas  
- **Specifikacijų nuorodos**: Atnaujintos visos nuorodos į dabartinę MCP specifikaciją 2025-06-18  
- **Microsoft saugumo ekosistema**: Išplėstos integracijos gairės visoje saugumo dokumentacijoje  
- **Praktinis įgyvendinimas**: Pridėti išsamūs kodo pavyzdžiai .NET, Java ir Python kalbomis su įmonių modeliais  
- **Ištekliai**: Išsamus oficialios dokumentacijos, saugumo standartų ir įgyvendinimo vadovų kategorizavimas  
- **Vizualūs indikatoriai**: Aiškus privalomų reikalavimų ir rekomenduojamų praktikų žymėjimas  

#### Pagrindinės koncepcijos (01-CoreConcepts/) – Visiškas modernizavimas  
- **Protokolo versijos atnaujinimas**: Atnaujinta, nurodant dabartinę MCP specifikaciją 2025-06-18 su datos formatu (YYYY-MM-DD)  
- **Architektūros patobulinimai**: Išplėsti aprašymai apie Hostus, Klientus ir Serverius, atspindint MCP dabartinius architektūros modelius  
  - Šiuo metu kompiuteriai aiškiai apibrėžti kaip AI taikomosios programos, koordinuojančios kelis MCP klientų prisijungimus
  - Klientai aprašyti kaip protokolo jungtys, palaikančios vienas prie vieno ryšius su serveriais
  - Serveriai patobulinti su vietinio ir nuotolinio diegimo scenarijomis
- **Pirminis pertvarkymas**: Visiškas serverių ir klientų pirminių elementų pertvarkymas
  - Serverių pirminiai elementai: Ištekliai (duomenų šaltiniai), Užklausos (šablonai), Įrankiai (vykdomos funkcijos) su išsamiais paaiškinimais ir pavyzdžiais
  - Klientų pirminiai elementai: Imimas (LLM užbaigimai), Išvedimas (naudotojo įvestis), Logavimas (derinimas/monitoringas)
  - Atnaujinta su dabartiniais atradimo (`*/list`), gavimo (`*/get`) ir vykdymo (`*/call`) metodo šablonais
- **Protokolo architektūra**: Įvesta dviejų sluoksnių architektūros modelis
  - Duomenų sluoksnis: JSON-RPC 2.0 pagrindas su gyvenimo ciklo valdymu ir pirminiais elementais
  - Transporto sluoksnis: STDIO (vietinis) ir Streamable HTTP su SSE (nuotolinis) transporto mechanizmai
- **Saugumo sistema**: Išsami saugumo principų sistema, įskaitant aiškų naudotojo sutikimą, duomenų privatumo apsaugą, įrankių vykdymo saugumą ir transporto sluoksnio saugumą
- **Komunikacijos šablonai**: Atnaujinti protokolo pranešimai, rodomi inicijavimo, atradimo, vykdymo ir pranešimų srautai
- **Kodo pavyzdžiai**: Atnaujinti daugkalbiai pavyzdžiai (.NET, Java, Python, JavaScript), atspindintys dabartinius MCP SDK šablonus

#### Saugumas (02-Security/) - Išsamus saugumo pertvarkymas  
- **Standartų atitikimas**: Pilnas atitikimas MCP specifikacijos 2025-06-18 saugumo reikalavimams
- **Autentifikacijos evoliucija**: Dokumentuota evoliucija nuo specifinių OAuth serverių iki išorinio identiteto tiekėjo delegacijos (Microsoft Entra ID)
- **AI specifinė grėsmių analizė**: Išplėsta šiuolaikinių AI atakų vektorių apimtis
  - Išsamios užklausų injekcijos atakų scenarijai su realiais pavyzdžiais
  - Įrankių užnuodijimo mechanizmai ir „rug pull“ atakų šablonai
  - Konteksto lango užnuodijimas ir modelio sumišimo atakos
- **Microsoft AI saugumo sprendimai**: Išsami Microsoft saugumo ekosistemos apžvalga
  - AI užklausų skydai su pažangia aptikimo, išskyrimo ir skyriklių technikomis
  - Azure turinio saugos integracijos šablonai
  - GitHub pažangus saugumas tiekimo grandinės apsaugai
- **Pažangių grėsmių mažinimas**: Išsamios saugumo kontrolės:
  - Sesijos pagrobimui MCP specifinių atakų scenarijai ir kriptografinių sesijos ID reikalavimai
  - Sumišusio įgaliotojo problemos MCP proxy scenarijuose su aiškiais sutikimo reikalavimais
  - Žetonų perdavimo spragos su privalomomis patikros kontrolėmis
- **Tiekimo grandinės saugumas**: Išplėsta AI tiekimo grandinės apimtis, įskaitant pagrindinius modelius, įterpimų paslaugas, konteksto tiekėjus ir trečiųjų šalių API
- **Pagrindinis saugumas**: Patobulinta integracija su įmonių saugumo šablonais, įskaitant nulinės pasitikėjimo architektūrą ir Microsoft saugumo ekosistemą
- **Ištekliai organizavimas**: Kategorizuotos išsamios išteklių nuorodos pagal tipą (Oficiali dokumentacija, Standartai, Tyrimai, Microsoft sprendimai, Įgyvendinimo gaires)

### Dokumentacijos kokybės gerinimai
- **Struktūruoti mokymosi tikslai**: Atnaujinti mokymosi tikslai su konkrečiais, veiksmais pagrįstais rezultatais
- **Kryžminės nuorodos**: Pridėtos nuorodos tarp susijusių saugumo ir pagrindinių koncepcijų temų
- **Esama informacija**: Atnaujintos visos datos nuorodos ir specifikacijų saitai pagal dabartinius standartus
- **Įgyvendinimo gairės**: Pridėtos specifinės, praktiškos įgyvendinimo rekomendacijos abiejose dalyse

## 2025 m. liepos 16 d.

### README ir navigacijos patobulinimai
- Visiškai perprojektuota mokymo plano navigacija README.md faile
- Pakeista `<details>` žymės į prieinamą lentelės formatą
- Sukurtos alternatyvios išdėstymo parinktys naujame aplanke "alternative_layouts"
- Pridėti kortelėmis pagrįsti, skirtukiniai ir akordeono stiliaus navigacijos pavyzdžiai
- Atnaujinta saugyklos struktūros dalis, įtraukianti visus naujausius failus
- Patobulinta skyrius "Kaip naudoti šį mokymo planą" su aiškiomis rekomendacijomis
- Atnaujinti MCP specifikacijos saitai į teisingus URL
- Pridėtas Konteksto inžinerijos skyrius (5.14) į mokymo plano struktūrą

### Studijų gidų atnaujinimai
- Visiškai peržiūrėtas studijų gidas, pritaikytas prie dabartinės saugyklos struktūros
- Pridėti nauji skyriai MCP klientams ir įrankiams bei populiariems MCP serveriams
- Atnaujinta vizualinė mokymo plano žemėlapio schemą, tiksliai atspindinti visas temas
- Patobulintos išplėstinės temos aprašymai, apimantys visas specializuotas sritis
- Atnaujintas atvejų studijų skyrius, atspindintis faktinius pavyzdžius
- Pridėtas šis išsamus pakeitimų žurnalas

### Bendruomenės indėliai (06-CommunityContributions/)
- Pridėta išsami informacija apie MCP serverius paveikslėlių generavimui
- Pridėtas išsamus skyrius apie Claude naudojimą VSCode aplinkoje
- Pridėta Cline terminalo kliento diegimo ir naudojimo instrukcijos
- Atnaujintas MCP klientų skyrius, įtraukiant visus populiariausius klientų variantus
- Patobulinti bendruomenės indėlių pavyzdžiai su tikslesniais kodo pavyzdžiais

### Išplėstinės temos (05-AdvancedTopics/)
- Sutvarkyti visi specializuoti temų aplankai su nuosekliais pavadinimais
- Pridėti konteksto inžinerijos medžiagos ir pavyzdžiai
- Pridėta Foundry agento integracijos dokumentacija
- Pagerinta Entra ID saugumo integracijos dokumentacija

## 2025 m. birželio 11 d.

### Pradinis kūrimas
- Išleista pirmoji MCP pradedantiesiems mokymo plano versija
- Sukurta pagrindinė struktūra visoms 10 pagrindinėms dalims
- Įgyvendintas vizualinis mokymo plano žemėlapis navigacijai
- Pridėti pradiniai pavyzdiniai projektai keliomis programavimo kalbomis

### Pradžia (03-GettingStarted/)
- Sukurti pirmieji serverių įgyvendinimo pavyzdžiai
- Pridėta klientų kūrimo gairių
- Įtraukta LLM klientų integracijos instrukcijos
- Pridėta VS Code integracijos dokumentacija
- Įgyvendinti Server-Sent Events (SSE) serverių pavyzdžiai

### Pagrindinės sąvokos (01-CoreConcepts/)
- Pridėtas išsamus klientų-serverių architektūros paaiškinimas
- Sukurta dokumentacija apie pagrindines protokolo dalis
- Užfiksuoti pranešimų šablonai MCP

## 2025 m. gegužės 23 d.

### Saugyklos struktūra
- Inicijuota saugykla su pagrindine aplankų struktūra
- Sukurti README failai kiekvienai pagrindinei daliai
- Paruošta vertimo infrastruktūra
- Pridėti paveikslėliai ir diagramos

### Dokumentacija
- Sukurtas pradinės README.md failas su mokymo plano apžvalga
- Pridėti CODE_OF_CONDUCT.md ir SECURITY.md
- Paruoštas SUPPORT.md su pagalbos gavimo gairėmis
- Sukurta preliminari studijų gido struktūra

## 2025 m. balandžio 15 d.

### Planavimas ir sistema
- Pradinis MCP pradedantiesiems mokymo plano planavimas
- Apibrėžti mokymosi tikslai ir tikslinė auditorija
- išdėstytos 10 dalių mokymo plano struktūra
- Sukurta konceptuali sistema pavyzdžiams ir atvejų tyrimams
- Sukurti pradiniai prototipo pavyzdžiai pagrindinėms sąvokoms

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogaus atliktą vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingus interpretavimus, kilusius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->