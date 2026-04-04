# Muudatuste logi: MCP algajatele mõeldud õppekava

See dokument toimib Model Context Protocol (MCP) algajatele mõeldud õppekava kõikide oluliste muudatuste registrina. Muudatused on dokumenteeritud pööratud kronoloogilises järjekorras (uusimad muudatused ees).

## 5. veebruar 2026

### Üleriigiline valideerimine ja navigeerimisparandused

#### Uus õppekavasisu lisatud

**Moodul 03 - Alustamine**
- **12-mcp-hosts/README.md**: uus põhjalik juhend MCP hostide seadistamiseks
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf konfiguratsiooni näited
  - JSON konfiguratsioonimallid kõigile peamistele hostidele
  - Transporditüüpide võrdlustabel (stdio, SSE/HTTP, WebSocket)
  - Üldiste ühendusprobleemide tõrkeotsing
  - Turvalisuse parimad tavad hosti konfiguratsioonis

- **13-mcp-inspector/README.md**: uus veaotsingu juhend MCP Inspektori jaoks
  - Paigaldusmeetodid (npx, npm globaalne, lähtekoodist)
  - Ühendamine serveritega stdio ja HTTP/SSE kaudu
  - Testimisvahendid, ressursid ja päringutöövood
  - VS Code integratsioon MCP Inspektoriga
  - Levinumad veaotsingu stsenaariumid koos lahendustega

**Moodul 04 - Praktiline rakendamine**
- **pagination/README.md**: uus leheküpitusjuht
  - Kursoripõhised leheküpituse mustrid Pythonis, TypeScriptis, Javas
  - Kliendipoolse leheküpituse käsitlemine
  - Kursori disainistrateegiad (opaque vs struktureeritud)
  - Jõudlusoptimeerimise soovitused

**Moodul 05 - Täpsemad teemad**
- **mcp-protocol-features/README.md**: uus detailne protokollifunktsioonide ülevaade
  - Edusammute teavituste rakendamine
  - Päringu tühistamise mustrid
  - Ressursside mallid URI mustritega
  - Serveri elutsükli haldus
  - Logimise taseme juhtimine
  - Vea käsitlemise mustrid koos JSON-RPC koodidega

#### Navigeerimisparandused (uuendatud üle 24 faili)

**Peamise mooduli READMEd**
 Nüüd viitavad nii esimesse õppetundi KUI JÄRGMISSE moodulisse

**02-Security alamfailid**
- Kõigil 5 lisaturbe dokumentil nüüd "Mis järgmiseks" navigeerimine:

**09-CaseStudy failid**
- Kõik juhtumianalüüsi failid nüüd järjestikuse navigeerimisega:

**10-StreamliningAI laboris**
Lisati "Mis järgmiseks" jaotis mooduli 10 ülevaatele ja moodulile 11

#### Koodi ja sisu parandused

**SDK ja sõltuvuste uuendused**
Parandati tühi openai versioon `^4.95.0`-ks
Uuendati SDK versioonilt `^1.8.0` versioonile `>=1.26.0`
Uuendati mcp versiooni pingid `>=1.26.0`

**Koodi parandused**
Parandati vigane mudel `gpt-4o-mini` versioonile `gpt-4.1-mini`

**Sisu parandused**
Parandati katkine link `READMEmd` → `README.md`, parandati õppekava päis `Module 1-3` → `Module 0-3`, parandati suuri ja väikeseid tähti teelt
Eemaldati rikutud dubleeritud Case Study 5 sisu

**Algajate juhendid**
Lisati korrektne sissejuhatus, õpieesmärgid ja eeltingimused algajatele

#### Õppekava uuendused

**Peamine README.md**
- Lisati tabelisse kirjed 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Leheküpituse juhend), 5.16 (Protokolli funktsioonid)

**Mooduli READMEd**
Lisati õppetunnid 12 ja 13 õpikut loendisse
Lisati praktiliste juhendite jaotis koos leheküpituse lingiga
Lisati õppetunnid 5.15 (Kohandatud transport) ja 5.16 (Protokolli funktsioonid)

**study_guide.md**
- Uuendatud mõttekaart kõigi uute teemadega: MCP Hosts seadistus, MCP Inspector, leheküpituse strateegiad, protokolli funktsioonide detailne ülevaade

## 28. jaanuar 2026

### MCP spetsifikatsiooni 2025-11-25 vastavuse läbivaatus

#### Põhikontseptsioonide täiustamine (01-CoreConcepts/)
- **Uus klientide primitiiv - Roots**: lisati põhjalik dokumentatsioon Roots klientide primitiivi kohta, mis võimaldab serveritel mõista failisüsteemi piire ja ligipääsuõigusi
- **Tööriistade annotatsioonid**: lisati dokumentatsioon tööriistade käitumisannotatsioonide (`readOnlyHint`, `destructiveHint`) kohta paremate täitmisotsuste jaoks
- **Tööriistade väljakutse proovides**: uuendatud Sampling dokumentatsiooni, lisades `tools` ja `toolChoice` parameetrid mudeli juhitud tööriistade kutsumiseks proovipäringutes
- **URL-režiimi esiletoomine**: lisati dokumentatsioon URL-põhisest välismise veebitegevuse algatamisest serveri poolt
- **Ülesanded (eksperimentaalne)**: lisati uus jaotis, mis kirjeldab eksperimentaalset Ülesannete funktsiooni vastupidavate täitmiskihte ja hilinenud tulemuste päringut
- **Ikoonide toetus**: märgitud, et tööriistad, ressursid, ressursside mallid ja promptid saavad nüüd sisaldada ikoone täiendava metaandmetena

#### Dokumentatsiooni uuendused
- **README.md**: lisati MCP Spetsifikatsiooni 2025-11-25 versiooni viide ja kuupõhine versioonihaldus
- **study_guide.md**: uuendati õppekava kaarti lisades Ülesanded ja Tööriistade annotatsioonid põhikontseptsioonide sektsiooni; uuendatud dokumentatsiooni ajatempel

#### Spetsifikatsiooni vastavuse kontrollimine
- **Protokolli versioon**: kinnitati, et kogu dokumentatsioon viitab praegusele MCP spetsifikatsioonile 2025-11-25
- **Arhitektuuri vastavus**: kinnitati kahekordse kihi arhitektuuri (andmekiht + transpordikiht) dokumentatsiooni täpsus
- **Primitiivide dokumentatsioon**: valideeriti serveri primitiivid (ressursid, promptid, tööriistad) ja kliendi primitiivid (Sampling, Elicitation, Logging, Roots)
- **Transpordimehhanismid**: kinnitati STDIO ja voogedastatava HTTP transpordi dokumentatsiooni õigsus
- **Turbejuhised**: kinnitati vastavus MCP Turbe parimate praktikate dokumentatsioonile

#### MCP 2025-11-25 peamised funktsioonid dokumenteeritud
- **OpenID Connect avastamine**: autentiserveri avastamine OIDC kaudu
- **OAuth kliendi ID metaandmete dokumendid**: soovitatav kliendi registreerimise mehhanism
- **JSON Schema 2020-12**: MCP skeemide vaike dialekt
- **SDK kihistamise süsteem**: ametlikud nõuded SDK omaduste toetuseks ja hoolduseks
- **Valitsemisstruktuur**: ametlikud töörühmad ja huvigrupid MCP valitsemises

### Turbedokumentatsiooni suurem uuendus (02-Security/)

#### MCP Security Summit Workshop (Sherpa) integratsioon
- **Uus praktiline koolitusressurss**: lisatud põhjalik integratsioon [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) kõigis turbedokumentides
- **Ekspeditsiooni marsruudi kajastus**: dokumenteeritud kogu laagrist laagrisse edenemine baaslaagrist tippkohtumiseni
- **OWASP vastavus**: kogu turbejuhend täpselt seotud OWASP MCP Azure Security Guide riskidega

#### OWASP MCP Top 10 integratsioon
- **Uus jaotis**: lisati OWASP MCP Top 10 turberiskide tabel Azure leevendustega peamise turbe README-sse
- **Riskipõhine dokumentatsioon**: uuendatud mcp-security-controls-2025.md koos OWASP MCP riskiviidetega iga turbevaldkonna kohta
- **Võrdlusarhitektuur**: viidatud OWASP MCP Azure Security Guide'i arhitektuuri ja rakendamispatroonidele

#### Uuendatud turbefailid
- **README.md**: lisati Sherpa töötuba ülevaade, ekspeditsiooniteekonna tabel, OWASP MCP Top 10 riskide kokkuvõte ja praktilise koolituse jaotis
- **mcp-security-controls-2025.md**: uuendatud päis veebruar 2026, lisatud OWASP riskiviited (MCP01-MCP08), parandatud spetsifikatsiooni versioonide lahknevus
- **mcp-security-best-practices-2025.md**: lisatud Sherpa ja OWASP ressursside jaotis, uuendatud ajatempel
- **mcp-best-practices.md**: lisatud praktilise koolituse jaotis Sherpa ja OWASP linkidega
- **azure-content-safety-implementation.md**: lisatud OWASP MCP06 viide, Sherpa Camp 3 vastavus ja lisatud ressursside jaotis

#### Uued ressursside lingid lisatud
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Individuaalsed OWASP MCP riski leheküljed (MCP01-MCP10)

### Õppekava laiahaardeline MCP Spetsifikatsiooni 2025-11-25 vastavus

#### Moodul 03 - Alustamine
- **SDK dokumentatsioon**: lisatud Go SDK ametlike SDK-de nimekirja; uuendatud kõiki SDK viiteid MCP Spetsifikatsiooniga 2025-11-25 kooskõlas
- **Transpordi täpsustus**: uuendatud STDIO ja HTTP streaming transpordi kirjeldusi selgete spetsifikatsiooniviidetega

#### Moodul 04 - Praktiline rakendamine
- **SDK uuendused**: lisatud Go SDK; uuendatud SDK nimekiri koos spetsifikatsiooni versiooni viitega
- **Autoriseerimise spetsifikatsioon**: uuendatud MCP Autoriseerimise spetsifikatsiooni link viimasele 2025-11-25 versioonile

#### Moodul 05 - Täpsemad teemad
- **Uued funktsioonid**: lisatud märkus MCP Spetsifikatsiooni 2025-11-25 uutest funktsioonidest (Ülesanded, Tööriistade annotatsioonid, URL režiimi esiletoomine, Roots)
- **Turberessursid**: lisatud OWASP MCP Top 10 ja Sherpa töötuba täiendavatesse viidetesse

#### Moodul 06 - Kogukonna panused
- **SDK nimekiri**: lisatud Swift ja Rust SDK-d; uuendatud spetsifikatsiooni link 2025-11-25 versioonile
- **Spetsifikatsiooni viide**: uuendatud MCP Spetsifikatsiooni link otse spetsifikatsiooni URL-ile

#### Moodul 07 - Varajaste kasutuselevõtjate õppetunnid
- **Ressursside uuendused**: lisatud MCP Spetsifikatsiooni 2025-11-25 link ja OWASP MCP Top 10 täiendavatesse ressurssidesse

#### Moodul 08 - Parimad tavad
- **Spetsifikatsiooni versioon**: uuendatud MCP Spetsifikatsiooni viide 2025-11-25 versioonile
- **Turberessursid**: lisatud OWASP MCP Top 10 ja Sherpa töötuba täiendavatesse ressurssidesse

#### Moodul 10 - AI töövoogude tõhusamaks muutmine
- **Sildi uuendus**: muudetud MCP versiooni märk veebist SDK versioonilt (1.9.3) spetsifikatsiooni versioonile (2025-11-25)
- **Ressursside lingid**: uuendatud MCP Spetsifikatsiooni link; lisatud OWASP MCP Top 10

#### Moodul 11 - MCP serveri praktilised laborisessioonid
- **Spetsifikatsiooni viide**: uuendatud MCP Spetsifikatsiooni link 2025-11-25 versioonile
- **Turberessursid**: lisatud OWASP MCP Top 10 ametlikesse ressurssidesse

## 18. detsember 2025

### Turbedokumentatsiooni uuendus - MCP Spetsifikatsioon 2025-11-25

#### MCP turbe parimad tavad (02-Security/mcp-best-practices.md) - spetsifikatsiooni versiooni uuendus
- **Protokolli versiooni uuendus**: uuendatud viide uusimale MCP Spetsifikatsioonile 2025-11-25 (vabastatud 25. november 2025)
  - uuendatud kõik spetsifikatsiooni versiooni viited ajavahemikust 2025-06-18 kuni 2025-11-25
  - uuendatud dokumendi kuupäevad august 18, 2025 kuni detsember 18, 2025
  - kontrollitud, et kõik spetsifikatsiooni URL-id suunavad praegusele dokumentatsioonile
- **Sisuline valideerimine**: põhjalik parimate turbetavade valideerimine uusimate standardite vastu
  - **Microsofti turbelahendused**: kontrollitud praegust terminoloogiat ja linke Prompt Shields (varem "Jailbreak risk detection"), Azure Content Safety, Microsoft Entra ID ja Azure Key Vault osas
  - **OAuth 2.1 turvalisus**: kinnitatud vastavus uusimatele OAuth turbetavadele
  - **OWASP standardid**: valideeritud, et OWASP LLM-i Top 10 viited on endiselt ajakohased
  - **Azure teenused**: kontrollitud kõiki Microsoft Azure dokumentatsiooni linke ja parimaid tavasid
- **Standardite vastavus**: kõik viidatud turbestandardid on ajakohased
  - NIST AI riskijuhtimise raamistik
  - ISO 27001:2022
  - OAuth 2.1 turbe parimad tavad
  - Azure turbe- ja vastavusraamistikud
- **Rakendusjuhiste ressursid**: kontrollitud kõiki rakendusjuhiste linke ja vahendeid
  - Azure API halduse autentimismustrid
  - Microsoft Entra ID integratsioonijuhendid
  - Azure Key Vault salajaste haldus
  - DevSecOps torustikud ja jälgimislahendused

### Dokumentatsiooni kvaliteedi tagamine
- **Spetsifikatsiooni vastavus**: tagatud, et kõik kohustuslikud MCP turbenõuded (PEAB/PEAB MITTE) vastavad uusimale spetsifikatsioonile
- **Ressursside ajakohasus**: kontrollitud kõiki väliseid linke Microsofti dokumentatsiooni, turbestandardite ja rakendusjuhistega
- **Parimate tavade ulatus**: kinnitatud autentimise, autoriseerimise, AI-spetsiifiliste ohtude, tarneahela turvalisuse ja ettevõtte mustrite põhjalik käsitlus

## 6. oktoober 2025

### Alustamise sektsiooni laiendus – edasijõudnud serverikasutus ja lihtne autentimine

#### Edasijõudnud serverikasutus (03-GettingStarted/10-advanced)
- **Uus peatükk lisatud**: põhjalik juhend MCP serveri edasijõudnud kasutuse kohta, hõlmates nii tavapärast kui madalama taseme serveri arhitektuuri.
  - **Tavaline vs madalama taseme server**: üksikasjalik võrdlus ja koodinäited Pythonis ja TypeScriptis mõlemale lähenemisele.
  - **Handler-põhine disain**: käsitlus tööriistade/ressursside/promptide haldamiseks, mis võimaldab skaleeritavat ja paindlikku serveri rakendust.
  - **Praktilised mustrid**: reaalmaailma stsenaariumid, kus madalama taseme serverimustrid on kasulikud täpsemate funktsioonide ja arhitektuuri jaoks.

#### Lihtne autentimine (03-GettingStarted/11-simple-auth)
- **Uus peatükk lisatud**: samm-sammuline juhend lihtsa autentimise rakendamiseks MCP serverites.
  - **Autentimise kontseptsioonid**: selge selgitus autentimise ja autoriseerimise vaheline erinevus ning volituste haldamine.
  - **Põhita autentimise rakendus**: vahenduspõhised autentimismustrid Pythonis (Starlette) ja TypeScriptis (Express) koos koodinäidetega.
  - **Üleminek edasijõudnud turbele**: juhised lihtsast autentsusest alustamiseks ja üleminekuks OAuth 2.1 ning RBAC juurde, viidetega edasijõudnud turbemoodulitele.

Need täiendused annavad praktilist, käed-külge juhendamist tugevamate, turvalisemate ja paindlikumate MCP serverite ehitamiseks, ühendades põhitõed täiustatud tootmismustritega.

## 29. september 2025

### MCP serveri andmebaasi integreerimise laborisessioonid – põhjalik praktiline õpitee

#### 11-MCPServerHandsOnLabs – uus täielik andmebaasi integreerimise õppekava

- **Täielik 13-Labori Õppeteekond**: Lisatud põhjalik praktiline õppekava tootmisvalmis MCP serverite ehitamiseks koos PostgreSQL andmebaasi integratsiooniga  
  - **Reaalelu Rakendus**: Zava Retail analüütika kasutusjuhtum, mis demonstreerib ettevõtte tasemel mustreid  
  - **Struktureeritud Õppe Progresseerumine**:  
    - **Laborid 00-03: Alused** - Sissejuhatus, Põhiarhitektuur, Turvalisus ja Mitme Rentniku Toetus, Keskkonna Seadistus  
    - **Laborid 04-06: MCP Serveri Ehitamine** - Andmebaasi Disain ja Skeem, MCP Serveri Rakendamine, Tööriistade Arendus  
    - **Laborid 07-09: Täiustatud Funktsioonid** - Semantilise Otsingu Integratsioon, Testimine ja Silumine, VS Code Integratsioon  
    - **Laborid 10-12: Tootmine ja Parimad Tavad** - Juhtimisstrateegiad, Jälgimine ja Observabiliteet, Parimad Tavad ja Optimeerimine  
  - **Ettevõtte Tehnoloogiad**: FastMCP raamistik, PostgreSQL koos pgvectoriga, Azure OpenAI embeddingud, Azure Container Apps, Application Insights  
  - **Täiustatud Funktsioonid**: Rea tasandi turvalisus (RLS), semantiline otsing, mitme rentniku andmeside, vektor embeddingud, reaalajas jälgimine  

#### Terminoloogia Standardiseerimine – Moodulist Laboriks Ümbernimetamine  
- **Põhjalik Dokumentatsiooni Uuendus**: Süsteemne kõigi 11-MCPServerHandsOnLabs kataloogis olevate README failide uuendamine, kasutades "Labor" terminoloogiat "Mooduli" asemel  
  - **Sektsioonide Pealkirjad**: Uuendatud "What This Module Covers" pealkiri kõigis 13 laboris vormile "What This Lab Covers"  
  - **Sisu Kirjeldus**: Muudetud "This module provides..." kujule "This lab provides..." kogu dokumentatsioonis  
  - **Õpieesmärgid**: Muudetud "By the end of this module..." kujule "By the end of this lab..."  
  - **Navigatsioonilingid**: Muudetud kõik "Module XX:" viited "Lab XX:" viideteks ristviidetes ja navigeerimisel  
  - **Valmiduse Jälgimine**: Uuendatud "After completing this module..." kujule "After completing this lab..."  
  - **Tehniliste Viidete Säilitamine**: Säilitatud Python mooduliviited konfiguratsioonifailides (nt `"module": "mcp_server.main"`)  

#### Õppejuhendi Täiustamine (study_guide.md)  
- **Visuaalne Õppekava Kaart**: Lisatud uus "11. Andmebaasi Integratsiooni Laborid" sektsioon koos põhjaliku laborite struktuuri visualiseerimisega  
- **Repositooriumi Struktuur**: Uuendatud kümnest üheteistkümneks põhiosaks koos detailse 11-MCPServerHandsOnLabs kirjeldusega  
- **Õppeteekonna Juhtimine**: Täiustatud navigeerimisjuhised, hõlmates sektsioone 00 kuni 11  
- **Tehnoloogia Kaasatus**: Lisatud FastMCP, PostgreSQL, Azure teenuste integratsiooni üksikasjad  
- **Õppe Tulemused**: Rõhutatud tootmisvalmis serveri arendamist, andmebaasi integratsiooni mustreid ja ettevõtte turvalisust  

#### Peamise README Struktuuri Täiustamine  
- **Laboripõhine Terminoloogia**: Uuendatud peamine README.md fail 11-MCPServerHandsOnLabs kataloogis järjepidevalt kasutama "Labor" struktuuri  
- **Õppeteekonna Korraldus**: Selge edenemine alusteadmistest kuni täiustatud rakenduste ja tootmise juurutamiseni  
- **Reaalse Maailma Fookus**: Rõhk praktilisel, hands-on õppimisel koos ettevõtte tasemel mustrite ja tehnoloogiatega  

### Dokumentatsiooni Kvaliteedi ja Järjepidevuse Parandused  
- **Praktilise Õppe Rõhutamine**: Dokumentatsioonis laialdaselt tugevdatud praktiline, laboripõhine lähenemine  
- **Ettevõtte Musterfookus**: Rõhutatud tootmisvalmis rakendusi ja ettevõtte turvalisuse kaalutlusi  
- **Tehnoloogia Integratsioon**: Kaetud kaasaegsed Azure teenused ja tehisintellekti integratsioonimustrid  
- **Õppe Progresseerumine**: Selge, struktureeritud tee algetappidest tootmise juurutamiseni  

## 26. september 2025  

### Juhtumiuuringute Täiustamine – GitHub MCP Registri Integratsioon  

#### Juhtumiuuringud (09-CaseStudy/) – Ökosüsteemi Arenduse Fookus  
- **README.md**: Suur laiendus põhjaliku GitHub MCP Registri juhtumiuuringuga  
  - **GitHub MCP Registri Juhtumiuuring**: Uus põhjalik juhtumiuuring, mis uurib GitHub MCP Registri käivitamist 2025. aasta septembris  
    - **Probleemi Analüüs**: Üksikasjalik analüüs killustunud MCP serverite leidmise ja juurutamise väljakutsetest  
    - **Lahenduse Arhitektuur**: GitHubi tsentraliseeritud registri lähenemine üheklõpsuga VS Code installatsiooniga  
    - **Äriline Mõju**: Mõõdetavad parandused arendajate pardalemineku ja tootlikkuse vallas  
    - **Strategiline Väärtus**: Fookus modulaarsele agendi juurutamisele ja tööriistadevahelisele koostalitlusvõimele  
    - **Ökosüsteemi Arendus**: Positsioneerimine agentuursete integreerimisplatvormina  
  - **Täiendatud Juhtumiuuringute Struktuur**: Uuendatud kõik seitse juhtumiuuringut järjepideva vormingu ja põhjalike kirjeldustega  
    - Azure AI Reisiagentide orkestreerimisfookus  
    - Azure DevOps Integratsioon töövoo automatiseerimise rõhutusega  
    - Reaalaegne dokumentatsiooni päring Python konsoolikliendiga  
    - Interaktiivne õppimise planeerija Chainlit vestlusveebi rakendusena  
    - Redaktorisisesed dokumentatsioonilahendused VS Code ja GitHub Copilot integratsiooniga  
    - Azure API Halduse ettevõtte API integratsioonimustrid  
    - GitHub MCP Register: Ökosüsteemi arendus ja kogukonna platvorm  
  - **Põhjalik Kokkuvõte**: Ümber kirjutatud kokkuvõtte sektsioon, mis rõhutab seitset juhtumiuuringut, katmaks mitmeid MCP rakendamise aspekte  
    - Ettevõtte integratsioon, mitme agendi orkestreerimine, arendaja tootlikkus  
    - Ökosüsteemi arendus, hariduslik rakenduste kategooria  
    - Täiustatud ülevaated arhitektuuri mustritest, rakendamisstrateegiatest ja parimatest tavadest  
    - Rõhk MCP-le kui küpsele tootmisvalmis protokollile  

#### Õppejuhendi Uuendused (study_guide.md)  
- **Visuaalne Õppekava Kaart**: Uuendatud mõttekaart, lisades GitHub MCP Registri juhtumiuuringute sektsiooni  
- **Juhtumiuuringute Kirjeldus**: Täiustatud üldistest kirjeldustest põhjalikeks seitse juhtumiuuringut käsitlevateks jaotusteks  
- **Repositooriumi Struktuur**: Uuendatud sektsioon 10 peegeldamaks põhjalikku juhtumiuuringute katvust koos konkreetsete rakendusdetailidega  
- **Muudatuste Logi Integreerimine**: Lisatud 26. septembri 2025 kirje GitHub MCP Registri lisamise ja juhtumiuuringute täiustuste dokumenteerimiseks  
- **Kuupäeva Uuendused**: Uuendatud jaluse timestamp viimase versiooniga (26. september 2025)  

### Dokumentatsiooni Kvaliteedi Parandused  
- **Järjepidevuse Täiustamine**: Standardiseeritud juhtumiuuringute vormindus ja struktuur kõigis seitsmes näites  
- **Põhjalik Kaasatus**: Juhtumiuuringud hõlmavad nüüd ettevõtte, arendaja tootlikkuse ning ökosüsteemi arenduse stsenaariume  
- **Strateegiline Positsioneerimine**: Täiustatud fookus MCP-le kui agentuursete süsteemide juurutamise aluseks olev platvorm  
- **Resursside Integreerimine**: Uuendatud lisavarad hõlmates GitHub MCP Registri linki  

## 15. september 2025  

### Täiustatud Teemade Laiendamine – Kohandatud Transport ja Konteksti Inseneriteadus  

#### MCP Kohandatud Transpordid (05-AdvancedTopics/mcp-transport/) – Uus Täiustatud Rakenduste Juhend  
- **README.md**: Täielik rakendamise juhend kohandatud MCP transpordimehhanismide jaoks  
  - **Azure Event Grid Transport**: Põhjalik serverita sündmuspõhine transpordi rakendus  
    - C#, TypeScript ja Python näited koos Azure Functions integratsiooniga  
    - Sündmuspõhise arhitektuuri mustrid skaleeritavate MCP lahenduste jaoks  
    - Webhook vastuvõtjad ja push-põhise sõnumi käsitlemine  
  - **Azure Event Hubs Transport**: Kõrge läbilaskevõimega voogedastuse transpordi rakendus  
    - Reaalaegsed voogedastuse võimalused madala latentsusega stsenaariumides  
    - Sektsioneerimise strateegiad ja kontrollpunktide haldus  
    - Sõnumite pakendamine ja jõudluse optimeerimine  
  - **Ettevõtte Integratsiooni Mustrid**: Tootmisvalmis arhitektuurinäited  
    - Hajutatud MCP töötlemine mitmes Azure Functions instantsis  
    - Hübridtranspordi arhitektuurid mitme transporditüübi kombineerimisel  
    - Sõnumite vastupidavus, töökindlus ja vigade haldamise strateegiad  
  - **Turvalisus ja Jälgimine**: Azure Key Vault integratsioon ja observabiliteedi mustrid  
    - Halduse identiteedi autentimine ja minimaalsete privileegide ligipääs  
    - Application Insights telemeetria ja jõudluse jälgimine  
    - Circuit breakerid ja tõrketaluvuse mustrid  
  - **Testimisraamistikud**: Põhjalikud testimise strateegiad kohandatud transpordite jaoks  
    - Ühiktestid koos test-double ja mock raamistikudega  
    - Integreerimistestid Azure Test Containers kasutades  
    - Jõudluse ja koormustestimise kaalutlused  

#### Konteksti Inseneriteadus (05-AdvancedTopics/mcp-contextengineering/) – Tekkinud AI Distsipliin  
- **README.md**: Põhjalik uurimus konteksti inseneriteadusest kui tekkivast valdkonnast  
  - **Põhiprintsiibid**: Täielik konteksti jagamine, tegevuseotsuse teadlikkus ja konteksti akna haldus  
  - **MCP Protokolli Kooskõla**: Kuidas MCP disain lahendab konteksti inseneriteaduse väljakutseid  
    - Konteksti akna piirangud ja progressiivse laadimise strateegiad  
    - Asjakohasuse määramine ja dünaamiline konteksti päring  
    - Mitmemodaalne konteksti käsitlemine ja turvakaalutlused  
  - **Rakenduslähenemised**: Ühelõimelised vs mitmeagendi arhitektuurid  
    - Konteksti killustamine ja prioriseerimise tehnikad  
    - Progressiivne konteksti laadimine ja kokkusurumise strateegiad  
    - Kihilise konteksti lähenemised ja päringu optimeerimine  
  - **Mõõtmisraamistik**: Tekkinud mõõdikud konteksti efektiivsuse hindamiseks  
    - Sisendi efektiivsus, jõudlus, kvaliteet ja kasutajakogemus  
    - Eksperimentaalsed lähenemised konteksti optimeerimiseks  
    - Rikeanalüüs ja täiustamise metoodikad  

#### Õppekava Navigeerimise Uuendused (README.md)  
- **Täiustatud Mooduli Struktuur**: Uuendatud õppekava tabel lisades uued täiustatud teemad  
  - Lisatud kirjed Context Engineering (5.14) ja Custom Transport (5.15)  
  - Järjepidev vormindus ja navigatsioonilingid kõigis moodulites  
  - Kirjelduste uuendus vastavalt praegusele sisule  

### Kausta Struktuuri Parandused  
- **Nimede Standardiseerimine**: Muudetud "mcp transport" kaust "mcp-transport" nimeks kooskõlas teiste täiustatud teemade kaustadega  
- **Sisu Korraldus**: Kõik 05-AdvancedTopics kaustad nüüd järjepideva nimetuse mustriga (mcp-[teema])  

### Dokumentatsiooni Kvaliteedi Täiustused  
- **MCP Spetsifikatsiooni Vastavus**: Kõik uus sisu viitab praegusele MCP Spetsifikatsioonile 2025-06-18  
- **Mitmekeelised Näited**: Põhjalikud koodinäited C#, TypeScript ja Python keeles  
- **Ettevõtte Fookus**: Tootmisvalmis mustrid ja Azure pilve integreerimine kogu materjalis  
- **Visuaalne Dokumentatsioon**: Mermaid diagrammid arhitektuuri ja voogude visualiseerimiseks  

## 18. august 2025  

### Dokumentatsiooni Täielik Uuendus – MCP 2025-06-18 Standardid  

#### MCP Turvalisuse Parimad Tavad (02-Security/) – Täielik Moderniseerimine  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Täielik ümberkirjutus kooskõlas MCP Spetsifikatsiooniga 2025-06-18  
  - **Nõutavad Tingimused**: Lisatud selged MUST/MUST NOT nõuded ametlikust spetsifikatsioonist koos visuaalsete indikaatoritega  
  - **12 Põhiturbe Praktikat**: Muudetud 15-elemendilisest nimekirjast põhjalikeks turbevaldkondadeks  
    - Tokeni turvalisus ja autentimine välise identiteedipakkuja integratsiooniga  
    - Sessioonihaldus ja transporditurvalisus koos krüptograafiliste nõuetega  
    - Tehisintellekti spetsiifiline ähvarduste kaitse Microsoft Prompt Shields integratsiooniga  
    - Ligipääsukontroll ja õigused minimaalse privileegi põhimõttel  
    - Sisuturve ja jälgimine Azure Content Safety integratsiooniga  
    - Tarneahela turvalisus koos põhjaliku komponentide verifitseerimisega  
    - OAuth turvalisus ja Confused Deputy rünnete ennetus PKCE rakendusega  
    - Intsidendi reageerimine ja taastumine automatiseeritud võimekustega  
    - Vastavus ja juhtimine regulatiivse kooskõla tagamiseks  
    - Täiustatud turbekontrollid null usalduse arhitektuuriga  
    - Microsofti turbeökosüsteemi integratsioon laiaulatuslike lahendustega  
    - Jätkuv turvalisuse areng ja kohanemismeetodid  
  - **Microsofti Turbelahendused**: Täiustatud juhised Prompt Shields, Azure Content Safety, Entra ID ja GitHub Advanced Security kasutamiseks  
  - **Rakendamise Ressursid**: Kategooriate kaupa esitatud põhjalik ressursside loetelu ametliku MCP dokumentatsiooni, Microsofti turbelahenduste, turbestandardite ja juhendite seas  

#### Täiustatud Turbekontrollid (02-Security/) – Ettevõtte Taseme Rakendus  
- **MCP-SECURITY-CONTROLS-2025.md**: Täielik ümberehitus ettevõtte tasemel turbefraamistikuks  
  - **9 Põhjalikku Turbevaldkonda**: Laiendatud põhitõrgetest detailseks ettevõtteturbe raamistikuks  
    - Täiustatud autentimine ja autoriseerimine Microsoft Entra ID integreerimisega  
    - Tokenite turvalisus ja anti-passthrough kontrollid põhjaliku valideerimisega  
    - Sessiooniturbe kontrollid ülevõtmise ennetamiseks  
    - Tehisintellekti spetsiifilised turbekontrollid prompt-injektsiooni ja tööriistamürgituse vältimiseks  
    - Confused Deputy rünnete ennetamine OAuth proxy turvamehhanismidega  
    - Tööriistade käivitamise turvalisus liivakasti ja isolatsiooniga  
    - Tarneahela turbekontrollid sõltuvuste valideerimisel  
    - Jälgimise ja avastamise kontrollid SIEM integratsiooniga  
    - Intsidendi reageerimine ja taastumine automatiseeritud võimekustega  
  - **Rakendamise Näited**: Lisatud detailsed YAML konfiguratsiooniplokid ja koodinäited  
  - **Microsofti Lahenduste Integratsioon**: Täielik kattuvus Azure turvateenustega, GitHub Advanced Security ja ettevõtte identiteedihaldusega  

#### Täiustatud Teemade Turvalisus (05-AdvancedTopics/mcp-security/) – Tootmisvalmis Rakendus  
- **README.md**: Täielik ümberkirjutus ettevõtte turbe rakendamise osas  
  - **Praeguse Spetsifikatsiooni Järgi**: Uuendatud kooskõlas MCP Spetsifikatsiooniga 2025-06-18 ning nõutavate turbenõuetega  
  - **Täiustatud Autentimine**: Microsoft Entra ID integratsioon koos põhjalike .NET ja Java Spring Security näidetega  
  - **AI Turbe Integratsioon**: Microsoft Prompt Shields ja Azure Content Safety rakendus koos üksikasjalike Python näidetega  
  - **Täiustatud Ohtude Leevendus**: Põhjalikud rakendamisnäited  
    - Confused Deputy rünnete ennetamine PKCE ja kasutaja nõusoleku valideerimisega  
    - Tokeni passthrough ennetamine sihtrühma valideerimise ja turvalise tokenihaldusega  
    - Sessiooni ülevõtmise ennetamine krüptograafilise sidumise ja käitumusliku analüüsiga  
  - **Ettevõtte Turbeintegreerimine**: Azure Application Insights jälgimine, ohu tuvastamise torud ja tarneahela turvalisus  
  - **Rakendamise Kontrollnimekiri**: Selge ülesehitus, mis märgib kohustuslikud vs soovituslikud turbekontrollid ning Microsofti turbeökosüsteemi eelised  

### Dokumentatsiooni Kvaliteet ja Standardite Järgimine  
- **Spetsifikatsiooni Viited**: Uuendatud kõik viited praegusele MCP Spetsifikatsioonile 2025-06-18  
- **Microsofti Turbeökosüsteem**: Täiustatud integratsiooni juhised kogu turbedokumentatsioonis  
- **Praktiline Rakendus**: Lisatud detailsed koodinäited .NET, Java ja Python keeles koos ettevõtte taseme mustritega  
- **Ressursside Korraldus**: Põhjalik ametlike dokumentide, turbestandardite ja rakendusjuhiste kategoriseerimine  
- **Visuaalsed Indikaatorid**: Selge tähistus kohustuslike nõuete ja soovituslike tavade vahel  

#### Põhikontseptsioonid (01-CoreConcepts/) – Täielik Moderniseerimine  
- **Protokolli Versiooni Uuendus**: Uuendatud viitamiseks praegusele MCP Spetsifikatsioonile 2025-06-18 kuupõhise versioonimisena (YYYY-MM-DD formaat)  
- **Arhitektuuri Täpsustus**: Täiendatud Hostide, Klientide ja Serverite kirjeldusi, et kajastada praeguseid MCP arhitektuurimustreid
  - Hostid on nüüd selgelt määratletud kui tehisintellekti rakendused, mis koordineerivad mitut MCP kliendiühendust
  - Kliendid on kirjeldatud kui protokolli ühendajad, kes säilitavad ühe serveriga sidemeid
  - Serverid täiustatud kohalike vs kaug-juurutuse stsenaariumitega
- **Primitiivne ümberstruktureerimine**: Serveri ja kliendi primitiivide täielik ülevaatus
  - Serveri primitiivid: Ressursid (andmeallikad), Käsud (mallid), Tööriistad (käivitatavad funktsioonid) koos üksikasjalike selgituste ja näidetega
  - Kliendi primitiivid: Valimine (LLM täitmised), Küsitlemine (kasutaja sisend), Logimine (sõlmeotsing/jälgimine)
  - Uuendatud praeguste leidmise (`*/list`), päringu (`*/get`) ja täitmise (`*/call`) meetodimustritega
- **Protokolli arhitektuur**: Sisse juhitud kahekihiline arhitektuurimudel
  - Andmekiht: JSON-RPC 2.0 alus koos elutsükli juhtimise ja primitiividega
  - Transpordikiht: STDIO (kohalik) ja voogedastatav HTTP SSE-ga (kaugtranspordimehhanismid)
- **Turvafraamistik**: Kõikehõlmavad turvapõhimõtted, sealhulgas selge kasutaja nõusolek, andmete privaatsuse kaitse, tööriistade täitmise turvalisus ja transpordikihi turvalisus
- **Kommunikatsioonimustrid**: Uuendatud protokollisõnumeid, mis näitavad initsialiseerimise, leidmise, täitmise ja teavitamise voo mustreid
- **Koodi näited**: Värskendatud mitmekeelsed näited (.NET, Java, Python, JavaScript), et kajastada praeguseid MCP SDK mustreid

#### Turvalisus (02-Security/) - Kõikehõlmav turbeülevaatus  
- **Standarditele vastavus**: Täielik kokkulepe MCP spetsifikatsiooni 2025-06-18 turvanõuetega
- **Autentimise areng**: Dokumenteeritud areng kohandatud OAuth-serveritest välise identiteedipakkuja volitamiseni (Microsoft Entra ID)
- **Tehisintellekti-spetsiifiline ohuanalüüs**: Täiustatud katvus kaasaegsete tehisintellekti ründemustrite osas
  - Üksikasjalikud käsu süstimise ründe stsenaariumid reaalse maailma näidetega
  - Tööriistade mürgitamise mehhanismid ja "rug pull" ründe mustrid
  - Kontekstiakna mürgitamine ja mudeli segaduse rünnakud
- **Microsofti tehisintellekti turvalahendused**: Microsofti turbeökosüsteemi laialdane kajastus
  - AI käsu kaitsemehhanismid täiustatud tuvastuse, esiletõstmise ja eraldajate tehnikatega
  - Azure sisu turvalisuse integreerimismustrid
  - GitHubi täiustatud turvalisus tarneahela kaitseks
- **Täpsem ohu leevendus**: Üksikasjalikud turvameetmed
  - Sessiooni kaaperdamise vältimiseks MCP-spetsiifiliste ründestseenaridega ja krüptograafiliste sessiooni ID nõuetega
  - Segaduses abistaja probleemid MCP proksi stsenaariumides koos selgete nõusoleku nõuetega
  - Tokeni edastamise haavatavused koos kohustusliku valideerimise kontrolliga
- **Tarneahela turvalisus**: Laiendatud AI tarneahela kajastus, sealhulgas põhimudelid, manustusteenused, konteksti pakkujad ja kolmanda osapoole API-d
- **Põhikaitse**: Täiustatud integratsioon ettevõtte turbemustritega, sealhulgas null usaldust arhitektuur ja Microsofti turbeökosüsteem
- **Ressursside korraldus**: Kategooriateks jagatud kõikvõimalikud ressursside lingid tüübi järgi (ametlikud dokumendid, standardid, teadusuuringud, Microsofti lahendused, rakendamisjuhendid)

### Dokumentatsiooni kvaliteedi parandused
- **Struktureeritud õpieesmärgid**: Täiustatud õpieesmärgid konkreetsete ja teostatavate tulemustega
- **Ristviited**: Lisatud lingid seotud turbe- ja põhimõistete teemade vahel
- **Ajakohane info**: Uuendatud kõik kuupäeva viited ja spetsifikatsiooni lingid vastavalt praegustele standarditele
- **Rakendusjuhised**: Lisatud konkreetsed ja teostatavad rakendamisjuhised mõlemas jaotises

## 16. juuli 2025

### README ja navigeerimisparandused
- Täielikult ümber kujundatud õppekava navigeerimine README.md failis
- Asendatud `<details>` sildid parema ligipääsetavusega tabelipõhise vorminguga
- Loodud alternatiivsed paigutusvõimalused uues "alternative_layouts" kaustas
- Lisatud kaardipõhised, vahelehtedega ja akordioni stiilis navigeerimisnäited
- Uuendatud hoidla struktuuri peatükk, mis sisaldab kõiki uusimaid faile
- Täiustatud jaotist "Kuidas kasutada seda õppekava" selgete soovitustega
- Uuendatud MCP spetsifikatsiooni lingid viitavad korrektsetele URL-idele
- Lisatud Konteksti inseneri jaotis (5.14) õppekava struktuuri

### Õppejuhendi uuendused
- Täielikult muudetud õppejuhend vastavaks praegusele hoidla struktuurile
- Lisatud uued jaotised MCP klientide ja tööriistade ning populaarsete MCP serverite kohta
- Uuendatud visuaalne õppekava kaart kõigi teemade täpseks kuvamiseks
- Täiustatud edasijõudnute teemade kirjeldusi, mis hõlmavad kõiki spetsialiseerunud valdkondi
- Uuendatud juhtumiuuringute jaotis tegelike näidete kajastamiseks
- Lisatud see põhjalik muudatuste logi

### Kogukonna panused (06-CommunityContributions/)
- Lisatud põhjalik info MCP serverite kohta pildigeneratsiooni jaoks
- Lisatud põhjalik jaotis Claude kasutamisest VSCode’is
- Lisatud Cline terminalikliendi seadistus- ja kasutusjuhised
- Uuendatud MCP kliendi jaotis, mis sisaldab kõiki populaarseid kliendivõimalusi
- Parandatud panuse näited täpsemate koodinäidetega

### Edasijõudnud teemad (05-AdvancedTopics/)
- Organiseeritud kõik spetsialiseerunud teemaplokkide kaustad järjepideva nimetusega
- Lisatud kontekstiinseneri materjalid ja näited
- Lisatud Foundry agendi integratsiooni dokumentatsioon
- Täiustatud Entra ID turvaintegraatsiooni dokumentatsioon

## 11. juuni 2025

### Esialgne loomine
- Avaldatud MCP algajatele õppekava esimene versioon
- Loodud põhistruktuur kõigi 10 põhijaotise jaoks
- Rakendatud visuaalne õppekava kaart navigeerimiseks
- Lisatud esialgsed prooviprojektid mitmes programmeerimiskeeles

### Alustamine (03-GettingStarted/)
- Loodud esimesed serveri rakenduse näited
- Lisatud kliendi arendusjuhised
- Kaasatud LLM kliendi integreerimise juhised
- Lisatud VS Code integratsiooni dokumentatsioon
- Rakendatud serveri-saatva sündmuse (SSE) serverinäited

### Põhimõisted (01-CoreConcepts/)
- Lisatud üksikasjalik selgitus kliendi-serveri arhitektuurist
- Loodud dokumentatsioon protokolli põhikomponentide kohta
- Kirjeldatud sõnumimustreid MCP-s

## 23. mai 2025

### Hoidla struktuur
- Algatatud hoidla põhikaustastruktuuriga
- Loodud README failid iga suure jaotise jaoks
- Paigaldatud tõlketegevuse infrastruktuur
- Lisatud pildi varad ja diagrammid

### Dokumentatsioon
- Loodud esialgne README.md õppekavaga tutvustuseks
- Lisatud CODE_OF_CONDUCT.md ja SECURITY.md failid
- Paigaldatud SUPPORT.md juhistega abi saamiseks
- Loodud esialgne õppejuhendi struktuur

## 15. aprill 2025

### Planeerimine ja raamistik
- Algne planeerimine MCP algajatele õppekava jaoks
- Määratletud õpieesmärgid ja sihtrühm
- Kirjeldatud 10-jaotise struktuur õppekavale
- Arendatud kontseptuaalne raamistik näidete ja juhtumiuuringute jaoks
- Loodud esialgsed prototüüpnäited põhikontseptsioonidest

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud AI tõlketeenuse [Co-op Translator](https://github.com/Azure/co-op-translator) abil. Kuigi me püüdleme täpsuse poole, tuleb arvestada, et automaatsed tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlke kasutamisest tekkida võivate arusaamatuste või valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->