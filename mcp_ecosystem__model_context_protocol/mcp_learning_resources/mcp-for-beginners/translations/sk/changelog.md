# Zmeny: Kurikulum MCP pre Začiatočníkov

Tento dokument slúži ako záznam všetkých významných zmien vykonaných v kurikule Model Context Protocol (MCP) pre začiatočníkov. Zmeny sú dokumentované v obrátenom chronologickom poradí (najnovšie zmeny prvé).

## 5. februára 2026

### Vylepšenia validácie a navigácie v celom repozitári

#### Pridaný nový obsah kurikula

**Modul 03 - Začíname**
- **12-mcp-hosts/README.md**: Nový komplexný sprievodca nastavením MCP hostov
  - Príklady konfigurácie pre Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Šablóny konfigurácie JSON pre všetky hlavné hosty
  - Porovnávacia tabuľka typov transportov (stdio, SSE/HTTP, WebSocket)
  - Riešenie bežných problémov s pripojením
  - Najlepšie bezpečnostné postupy pre konfiguráciu hostov

- **13-mcp-inspector/README.md**: Nový sprievodca ladením pre MCP Inspector
  - Spôsoby inštalácie (npx, npm globálne, zo zdroja)
  - Pripojenie k serverom cez stdio a HTTP/SSE
  - Testovacie nástroje, zdroje a pracovné postupy promptov
  - Integrácia VS Code s MCP Inspector
  - Bežné situácie ladenia s riešeniami

**Modul 04 - Praktická implementácia**
- **pagination/README.md**: Nový sprievodca implementáciou stránkovania
  - Vzory stránkovania založeného na kurzore v Python, TypeScript, Java
  - Spracovanie stránkovania na strane klienta
  - Stratégie návrhu kurzora (nepriehľadný vs. štruktúrovaný)
  - Odporúčania na optimalizáciu výkonu

**Modul 05 - Pokročilé témy**
- **mcp-protocol-features/README.md**: Nový detailný pohľad na funkcie protokolu
  - Implementácia notifikácií o postupe
  - Vzory zrušenia požiadaviek
  - Šablóny zdrojov s URI vzormi
  - Správa životného cyklu servera
  - Ovládanie úrovne logovania
  - Vzory spracovania chýb s JSON-RPC kódmi

#### Opravy navigácie (aktualizovaných viac než 24 súborov)

**Hlavné moduly README**
 Teraz odkazuje na prvú lekciu AJ ďalší modul

**Podadresáre 02-Security**
- Všetkých 5 doplnkových bezpečnostných dokumentov má teraz navigáciu „Čo ďalej“:

**Súbory 09-CaseStudy**
- Všetky súbory s prípadovými štúdiami teraz majú postupnú navigáciu:

**Laboratória 10-StreamliningAI**
Pridaná sekcia Čo ďalej do prehľadu Modulu 10 a Modulu 11

#### Opravy kódu a obsahu

**Aktualizácie SDK a závislostí**
Opravená prázdna verzia openai na `^4.95.0`
Aktualizovaný SDK z `^1.8.0` na `>=1.26.0`
Aktualizované verzie mcp na `>=1.26.0`

**Opravy kódu**
Opravený neplatný model `gpt-4o-mini` na `gpt-4.1-mini`

**Opravy obsahu**
Opravený zlomený odkaz `READMEmd` → `README.md`, opravený nadpis kurikula `Module 1-3` → `Module 0-3`, opravená rozlišovacia cesta
Odstránený poškodený duplicitný obsah prípadovej štúdie 5

**Vylepšenia vedenia pre začiatočníkov**
Pridaný správny úvod, učebné ciele a predpoklady pre začiatočníkov

#### Aktualizácie kurikula

**Hlavný README.md**
- Pridané položky 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) do tabuľky kurikula

**Modulové README**
Pridané lekcie 12 a 13 do zoznamu lekcií
Pridaná časť Praktické príručky s odkazom na stránkovanie
Pridané lekcie 5.15 (Vlastný transport) a 5.16 (Funkcie protokolu)

**study_guide.md**
- Aktualizovaná myšlienková mapa so všetkými novými témami: Nastavenie MCP hosts, MCP Inspector, Stratégie stránkovania, Detailný pohľad na funkcie protokolu

## 28. januára 2026

### Preskúmanie zhody so špecifikáciou MCP 2025-11-25

#### Vylepšenie základných konceptov (01-CoreConcepts/)
- **Nový klientsky primitív - Roots**: Pridaná komplexná dokumentácia k primitívu Roots na strane klienta, ktorý umožňuje serverom rozumieť hraniciam súborového systému a povoleniam prístupu
- **Anotácie nástrojov**: Pridaná dokumentácia správania nástrojov (readOnlyHint, destructiveHint) pre lepšie rozhodovanie o vykonaní nástroja
- **Volanie nástrojov pri sampling**: Aktualizovaná dokumentácia sampling o parametre tools a toolChoice pre modelom riadené volanie nástrojov počas požiadaviek na sampling
- **Elicitation režim pre URL**: Pridaná dokumentácia na elicitation založený na URL pre externé webové interakcie iniciované serverom
- **Úlohy (experimentálne)**: Pridaná nová sekcia dokumentujúca experimentálnu funkciu Úloh pre trvalé obaly vykonávania a oneskorené získavanie výsledkov
- **Podpora ikon**: Poznamenané, že nástroje, zdroje, šablóny zdrojov a prompty môžu teraz obsahovať ikony ako dodatočné metaúdaje

#### Aktualizácie dokumentácie
- **README.md**: Pridaná referencia verzie MCP Specification 2025-11-25 a vysvetlenie verzovania podľa dátumu
- **study_guide.md**: Aktualizovaná mapa kurikula pre zahrnutie Úloh a Anotácií nástrojov v sekcii Základné koncepty; aktualizovaný časový údaj dokumentu

#### Overenie zhody so špecifikáciou
- **Verzia protokolu**: Overené všetky dokumenty odkazujú na aktuálnu MCP Specification 2025-11-25
- **Zhoda architektúry**: Potvrdená presnosť dokumentácie dvojvrstvovej architektúry (údajová vrstva + transportná vrstva)
- **Dokumentácia primitívov**: Validované serverové primívy (Zdroje, Prompty, Nástroje) a klientske primívy (Sampling, Elicitation, Logging, Roots)
- **Transportné mechanizmy**: Overená presnosť dokumentácie STDIO a Streamable HTTP transportu
- **Bezpečnostné usmernenia**: Potvrdená zhoda s aktuálnymi bezpečnostnými najlepšími praktikami MCP

#### Kľúčové funkcie MCP 2025-11-25 zdokumentované
- **OpenID Connect Discovery**: Objavovanie autentifikačného servera cez OIDC
- **OAuth Client ID metaúdaje**: Odporúčaný mechanizmus registrácie klienta
- **JSON Schema 2020-12**: Predvolený dialekt pre definície schém MCP
- **Systém vrstvenia SDK**: Formalizované požiadavky na podporu a údržbu funkcií SDK
- **Správa a riadenie**: Formalizované pracovné skupiny a záujmové skupiny v správe MCP

### Hlavná aktualizácia bezpečnostnej dokumentácie (02-Security/)

#### Integrácia MCP Security Summit Workshop (Sherpa)
- **Nový praktický školský zdroj**: Pridaná komplexná integrácia s [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) do celého bezpečnostného materiálu
- **Pokrytie expedičnej trasy**: Zdokumentovaný celý postup z tábora do tábora od základného tábora po vrchol
- **Zladenie s OWASP**: Všetky bezpečnostné odporúčania mapované na riziká OWASP MCP Azure Security Guide

#### Integrácia OWASP MCP Top 10
- **Nová sekcia**: Pridaná tabuľka OWASP MCP Top 10 bezpečnostných rizík s mitigáciami pre Azure do hlavného Security README
- **Rizikovo orientovaná dokumentácia**: Aktualizovaný mcp-security-controls-2025.md s odkazmi na riziká OWASP MCP pre jednotlivé bezpečnostné domény
- **Referenčná architektúra**: Odkaz na OWASP MCP Azure Security Guide s referenčnou architektúrou a vzormi implementácie

#### Aktualizované bezpečnostné súbory
- **README.md**: Pridaný prehľad Sherpa Workshopu, tabuľka trasy expedície, súhrn rizík OWASP MCP Top 10 a sekcia praktického školenia
- **mcp-security-controls-2025.md**: Aktualizovaný nadpis na február 2026, pridané referencie na riziká OWASP (MCP01-MCP08), opravená nezhoda verzie špecifikácie
- **mcp-security-best-practices-2025.md**: Pridaná sekcia zdrojov Sherpa a OWASP, aktualizovaný časový údaj
- **mcp-best-practices.md**: Pridaná sekcia praktického školenia s odkazmi na Sherpa a OWASP
- **azure-content-safety-implementation.md**: Pridaný odkaz OWASP MCP06, zladenie so Sherpa Camp 3 a doplnková sekcia zdrojov

#### Pridané nové odkazy na zdroje
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Jednotlivé stránky OWASP MCP rizík (MCP01-MCP10)

### Zarovnanie celého kurikula na MCP Specification 2025-11-25

#### Modul 03 - Začíname
- **Dokumentácia SDK**: Pridaný Go SDK do oficiálneho zoznamu SDK; aktualizované všetky odkazy na SDK podľa MCP Specification 2025-11-25
- **Vyjasnenie transportu**: Aktualizované popisy STDIO a HTTP Streaming transportu s explicitnými odkazmi na špecifikáciu

#### Modul 04 - Praktická implementácia
- **Aktualizácie SDK**: Pridaný Go SDK; aktualizovaný zoznam SDK s referenciou na verziu špecifikácie
- **Špecifikácia autorizácie**: Aktualizovaný odkaz na MCP Authorization špecifikáciu na aktuálnu verziu 2025-11-25

#### Modul 05 - Pokročilé témy
- **Nové funkcie**: Pridaná poznámka o nových funkciách MCP Specification 2025-11-25 (Tasks, Anotácie nástrojov, URL režim elicitation, Roots)
- **Bezpečnostné zdroje**: Pridané odkazy na OWASP MCP Top 10 a Sherpa workshop do doplnkových odkazov

#### Modul 06 - Komunitné príspevky
- **Zoznam SDK**: Pridané Swift a Rust SDK; aktualizovaný odkaz na špecifikáciu na verziu 2025-11-25
- **Referencie na špecifikáciu**: Aktualizovaný odkaz MCP Specification na priamu URL špecifikácie

#### Modul 07 - Lekcie z raného nasadenia
- **Aktualizácie zdrojov**: Pridaný odkaz na MCP Specification 2025-11-25 a OWASP MCP Top 10 do doplnkových zdrojov

#### Modul 08 - Najlepšie praktiky
- **Verzia špecifikácie**: Aktualizovaný odkaz MCP Specification na 2025-11-25
- **Bezpečnostné zdroje**: Pridané OWASP MCP Top 10 a Sherpa workshop do doplnkových odkazov

#### Modul 10 - Zefektívňovanie AI pracovných postupov  
- **Aktualizácia odznaku**: Zmena odznaku MCP verzie z verzie SDK (1.9.3) na verziu špecifikácie (2025-11-25)
- **Odkazy na zdroje**: Aktualizovaný odkaz MCP Specification; pridaný OWASP MCP Top 10

#### Modul 11 - Praktické laboratória MCP Servera  
- **Odkaz na špecifikáciu**: Aktualizovaný odkaz MCP Specification na verziu 2025-11-25
- **Bezpečnostné zdroje**: Pridaný OWASP MCP Top 10 do oficiálnych zdrojov

## 18. decembra 2025

### Aktualizácia bezpečnostnej dokumentácie - MCP Specification 2025-11-25

#### Najlepšie bezpečnostné praktiky MCP (02-Security/mcp-best-practices.md) - Aktualizácia verzie špecifikácie
- **Aktualizácia verzie protokolu**: Aktualizované odkazy na najnovšiu MCP Specification 2025-11-25 (vydané 25. novembra 2025)
  - Aktualizované všetky odkazy na verzie špecifikácie z 2025-06-18 na 2025-11-25
  - Aktualizované dátumy v dokumentoch z 18. augusta 2025 na 18. decembra 2025
  - Overené, že všetky URL špecifikácií vedú na aktuálnu dokumentáciu
- **Validácia obsahu**: Komplexná kontrola bezpečnostných najlepších praktík podľa najnovších štandardov
  - **Riešenia Microsoft Security**: Overená aktuálnosť terminológie a odkazov pre Prompt Shields (predtým „detekcia jailbreak rizika“), Azure Content Safety, Microsoft Entra ID a Azure Key Vault
  - **Bezpečnosť OAuth 2.1**: Potvrdená zhoda s najnovšími bezpečnostnými praktikami OAuth
  - **Štandardy OWASP**: Overené, že odkazy na OWASP Top 10 pre LLM zostávajú aktuálne
  - **Azure služby**: Overené všetky odkazy a najlepšie praktiky pre Microsoft Azure dokumentáciu
- **Zladenie s normami**: Všetky referencované bezpečnostné štandardy potvrdené ako aktuálne
  - NIST AI Risk Management Framework
  - ISO 27001:2022
  - Najlepšie bezpečnostné praktiky OAuth 2.1
  - Rámce bezpečnosti a súladu Azure
- **Implementačné zdroje**: Validované všetky odkazy a zdroje k implementačným príručkám
  - Vzory autentifikácie v Azure API Management
  - Príručky integrácie Microsoft Entra ID
  - Správa tajomstiev v Azure Key Vault
  - Riešenia DevSecOps pre pipelines a monitorovanie

### Kontrola kvality dokumentácie
- **Zhoda so špecifikáciou**: Zabezpečené, že všetky povinné MCP bezpečnostné požiadavky (MUST/MUST NOT) sú v súlade s najnovšou špecifikáciou
- **Aktualizácia zdrojov**: Overené všetky externé odkazy na dokumentáciu Microsoft, bezpečnostné štandardy a implementačné príručky
- **Pokrytie najlepších praktík**: Potvrdená komplexnosť pokrytia autentifikácie, autorizácie, hrozieb špecifických pre AI, bezpečnosti dodávateľského reťazca a podnikových vzorov

## 6. októbra 2025

### Rozšírenie sekcie Začíname – Pokročilé používanie servera a jednoduchá autentifikácia

#### Pokročilé používanie servera (03-GettingStarted/10-advanced)
- **Pridaná nová kapitola**: Predstavený komplexný sprievodca pokročilým používaním MCP servera, pokrývajúci bežné aj nízkoúrovňové architektúry serverov.
  - **Bežný vs nízkoúrovňový server**: Detailné porovnanie a príklady kódu v Pythone a TypeScripte pre oba prístupy.
  - **Návrh založený na handleroch**: Vysvetlenie správy nástrojov/zdrojov/promptov založenej na handleroch pre škálovateľné a flexibilné implementácie serverov.
  - **Praktické vzory**: Reálne scenáre, kde sú nízkoúrovňové vzory serverov výhodné pre pokročilé funkcie a architektúru.

#### Jednoduchá autentifikácia (03-GettingStarted/11-simple-auth)
- **Pridaná nová kapitola**: Krok za krokom návod na implementáciu jednoduchej autentifikácie v MCP serveroch.
  - **Pojmy autentifikácie**: Jasné vysvetlenie autentifikácie verzus autorizácie a správy poverení.
  - **Implementácia Basic Auth**: Vzory middleware autentifikácie v Pythone (Starlette) a TypeScripte (Express) s príkladmi kódu.
  - **Postup k pokročilej bezpečnosti**: Návod na začiatok s jednoduchou autentifikáciou a prechod k OAuth 2.1 a RBAC, s odkazmi na pokročilé bezpečnostné moduly.

Tieto doplnky poskytujú praktické, prakticky zamerané usmernenia na budovanie robustnejších, bezpečnejších a flexibilnejších implementácií MCP serverov, prepájajúce základné koncepty s pokročilými výrobnými vzormi.

## 29. septembra 2025

### MCP Server Database Integration Labs - Komplexný praktický vzdelávací plán

#### 11-MCPServerHandsOnLabs – Nové kompletné kurikulum integrácie databázy
- **Kompletná učebná cesta 13 laboratórií**: Pridané komplexné praktické učebné osnovy na vytváranie produkčne pripravených MCP serverov s integráciou databázy PostgreSQL
  - **Implementácia v reálnom svete**: Prípad použitia Zava Retail Analytics preukazujúci podnikové vzory
  - **Štruktúrovaný postup učenia**:
    - **Laboratóriá 00-03: Základy** - Úvod, jadrová architektúra, bezpečnosť a multi-tenantnosť, nastavenie prostredia
    - **Laboratóriá 04-06: Vývoj MCP servera** - Návrh databázy a schéma, implementácia MCP servera, vývoj nástrojov  
    - **Laboratóriá 07-09: Pokročilé funkcie** - Integrácia sémantického vyhľadávania, testovanie a ladenie, integrácia s VS Code
    - **Laboratóriá 10-12: Produkcia a najlepšie postupy** - Stratégie nasadenia, monitorovanie a pozorovateľnosť, najlepšie postupy a optimalizácia
  - **Podnikové technológie**: Rámec FastMCP, PostgreSQL s pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Pokročilé funkcie**: Bezpečnosť na úrovni riadkov (RLS), sémantické vyhľadávanie, prístup k dátam pre viacerých nájomcov, vektorové vkladanie, monitorovanie v reálnom čase

#### Štandardizácia terminológie - Konverzia modulu na laboratórium
- **Komplexná aktualizácia dokumentácie**: Systematicky aktualizované všetky README súbory v 11-MCPServerHandsOnLabs na používanie terminológie "Laboratórium" namiesto "Modul"
  - **Nadpisy sekcií**: Aktualizované "Čo tento modul pokrýva" na "Čo toto laboratórium pokrýva" vo všetkých 13 laboratóriách
  - **Popis obsahu**: Zmenené "Tento modul poskytuje..." na "Toto laboratórium poskytuje..." v celej dokumentácii
  - **Vzdelávacie ciele**: Aktualizované "Na konci tohto modulu..." na "Na konci tohto laboratória..."
  - **Navigačné odkazy**: Prekonvertované všetky odkazy "Modul XX:" na "Laboratórium XX:" v krížových odkazoch a navigácii
  - **Sledovanie dokončenia**: Aktualizované "Po dokončení tohto modulu..." na "Po dokončení tohto laboratória..."
  - **Zachovaná technická referencia**: Udržané referencie na Python modul v konfiguračných súboroch (napr. `"module": "mcp_server.main"`)

#### Vylepšenie študijného sprievodcu (study_guide.md)
- **Vizualizácia učebnej osnovy**: Pridaná nová sekcia "11. Laboratóriá integrácie databázy" s kompletnou vizualizáciou štruktúry laboratórií
- **Štruktúra repozitára**: Aktualizovaná zo desať na jedenásť hlavných sekcií s podrobným popisom 11-MCPServerHandsOnLabs
- **Navigačné pokyny**: Vylepšené inštrukcie pokrývajúce sekcie 00-11
- **Pokrytie technológií**: Pridané podrobnosti o FastMCP, PostgreSQL a integráciách služieb Azure
- **Výsledky učenia**: Zdôraznenie vývoja produkčne pripravených serverov, vzory integrácie databázy a podniková bezpečnosť

#### Vylepšenie štruktúry hlavného README
- **Terminológia založená na laboratóriách**: Aktualizované hlavné README.md v 11-MCPServerHandsOnLabs na konzistentné používanie štruktúry "Laboratórium"
- **Organizácia učebnej cesty**: Jasný postup od základov až cez pokročilú implementáciu k produkčnému nasadeniu
- **Zameranie na reálny svet**: Dôraz na praktické, praktické učenie s podnikovo hodnotnými vzormi a technológiami

### Kvalita a konzistencia dokumentácie
- **Dôraz na praktické učenie**: Posilnený praktický, laboratórny prístup v celej dokumentácii
- **Zameranie na podnikové vzory**: Zvýraznené produkčne pripravené implementácie a podniková bezpečnosť
- **Integrácia technológií**: Komplexné pokrytie moderných služieb Azure a vzorov AI integrácie
- **Progres učenia**: Jasná, štruktúrovaná cesta od základov k produkčnému nasadeniu

## 26. september 2025

### Vylepšenie prípadových štúdií - integrácia GitHub MCP Registry

#### Prípadové štúdie (09-CaseStudy/) - Zameranie na vývoj ekosystému
- **README.md**: Rozšírenie o komplexnú prípadovú štúdiu GitHub MCP Registry
  - **Prípadová štúdia GitHub MCP Registry**: Nová podrobná prípadová štúdia skúmajúca spustenie registru GitHub MCP v septembri 2025
    - **Analýza problému**: Detailná analýza fragmentovaného vyhľadávania a nasadenia MCP serverov
    - **Architektúra riešenia**: Centralizovaný prístup registru GitHub s inštaláciou VS Code na jeden klik
    - **Obchodný dopad**: Merateľné zlepšenia onboardingu vývojárov a produktivity
    - **Strategická hodnota**: Zameranie na modulárne nasadenie agentov a interoperabilitu medzi nástrojmi
    - **Vývoj ekosystému**: Položenie základov platformy pre agentnú integráciu
  - **Vylepšená štruktúra prípadových štúdií**: Aktualizovaných všetkých sedem štúdií s jednotným formátovaním a komplexnými popismi
    - Azure AI cestovné agenti: dôraz na koordináciu viacerých agentov
    - Integrácia Azure DevOps: zameranie na automatizáciu workflow
    - Získavanie dokumentácie v reálnom čase: implementácia Python konzolového klienta
    - Interaktívny generátor študijných plánov: reťazcová webová aplikácia Chainlit
    - Dokumentácia v editore: integrácia VS Code a GitHub Copilot
    - Správa API Azure: podnikové vzory integrácie API
    - GitHub MCP Registry: vývoj ekosystému a platforma pre komunitu
  - **Komplexné záverové zhrnutie**: Prepracovaná záverečná sekcia zdôrazňujúca sedem prípadových štúdií presahujúcich viaceré dimenzie MCP implementácie
    - Podniková integrácia, koordinácia viacerých agentov, produktivita vývojárov
    - Vývoj ekosystému, vzdelávacie aplikácie
    - Vylepšené poznatky o architektonických vzoroch, stratégiách implementácie a najlepších postupoch
    - Dôraz na MCP ako zrelý, produkčne pripravený protokol

#### Aktualizácie študijného sprievodcu (study_guide.md)
- **Vizualizácia učebnej osnovy**: Aktualizovaná myšlienková mapa s pridaním GitHub MCP Registry do sekcie prípadových štúdií
- **Popisy prípadových štúdií**: Vylepšené z všeobecných popisov na podrobný rozbor siedmich komplexných prípadových štúdií
- **Štruktúra repozitára**: Aktualizovaná sekcia 10 s kompletným pokrytím prípadových štúdií so špecifickými implementačnými detailmi
- **Integrácia changelogu**: Pridaný záznam zo 26. septembra 2025 dokumentujúci prírastok GitHub MCP Registry a vylepšenia prípadových štúdií
- **Aktualizácia dátumu**: Aktualizovaný časový údaj v päte na poslednú revíziu (26. september 2025)

### Kvalita dokumentácie
- **Zlepšenie konzistencie**: Štandardizované formátovanie a štruktúra prípadových štúdií vo všetkých siedmych príkladoch
- **Komplexné pokrytie**: Prípadové štúdie teraz zahŕňajú scenáre podnikovej integrácie, produktivity vývojárov a vývoja ekosystému
- **Strategické umiestnenie**: Zvýraznený dôraz na MCP ako základnú platformu pre nasadenie agentných systémov
- **Integrácia zdrojov**: Aktualizované ďalšie zdroje s pridaním odkazu na GitHub MCP Registry

## 15. september 2025

### Rozšírenie pokročilých tém - vlastné transporty a kontextové inžinierstvo

#### Vlastné MCP transporty (05-AdvancedTopics/mcp-transport/) - Nový sprievodca pokročilou implementáciou
- **README.md**: Kompletný sprievodca implementáciou vlastných MCP transportných mechanizmov
  - **Transport Azure Event Grid**: Komplexná implementácia udalostne riadeného bezserverového transportu
    - Príklady v C#, TypeScript a Pythone s integráciou Azure Functions
    - Vzory architektúry riadenej udalosťami pre škálovateľné MCP riešenia
    - Spracovanie webhookov a push-based správ
  - **Transport Azure Event Hubs**: Implementácia transportu s vysokou priepustnosťou streamingu
    - Možnosti streamingu v reálnom čase pre nízku latenciu
    - Stratégiá rozdeľovania na partitúry a správa checkpointov
    - Zhlukovanie správ a optimalizácia výkonu
  - **Podnikové vzory integrácie**: Produkčne pripravené príklady architektúry
    - Distribuované spracovanie MCP cez viaceré Azure Functions
    - Hybridné transportné architektúry kombinujúce viaceré typy transportu
    - Stratégiá odolnosti správ, spoľahlivosti a správy chýb
  - **Bezpečnosť a monitorovanie**: Integrácia Azure Key Vault a vzory pozorovateľnosti
    - Overovanie pomocou spravovanej identity a prístup s najmenšími právami
    - Telemetria Application Insights a monitorovanie výkonu
    - Obvody (circuit breakers) a vzory odolnosti voči chybám
  - **Testovacie rámce**: Komplexné testovacie stratégie pre vlastné transporty
    - Jednotkové testovanie s testovacími dablérmi a mocking rámcami
    - Integračné testy s Azure Test Containers
    - Úvahy o testovaní výkonu a záťaže

#### Kontextové inžinierstvo (05-AdvancedTopics/mcp-contextengineering/) - Vyvíjajúca sa disciplína AI
- **README.md**: Komplexné skúmanie kontextového inžinierstva ako vznikajúceho odboru
  - **Základné princípy**: Kompletné zdieľanie kontextu, uvedomenie rozhodovania akcií a správa kontextového okna
  - **Zladenie s protokolom MCP**: Ako dizajn MCP rieši výzvy kontextového inžinierstva
    - Obmedzenia kontextového okna a stratégie postupného načítavania
    - Určenie relevantnosti a dynamické získavanie kontextu
    - Multimodálne spracovanie kontextu a bezpečnostné otázky
  - **Prístupy k implementácii**: Jednovláknové vs. viacagentové architektúry
    - Techniky členeného a prioritizovaného kontextu
    - Postupné načítavanie a kompresné stratégie kontextu
    - Viacvrstvové prístupy ku kontextu a optimalizácia získavania
  - **Meračský rámec**: Vznikajúce metriky na hodnotenie efektívnosti kontextu
    - Efektivita vstupu, výkon, kvalita a používateľské skúsenosti
    - Experimentálne metódy optimalizácie kontextu
    - Analýza zlyhaní a metodiky zlepšovania

#### Aktualizácie navigácie učebnej osnovy (README.md)
- **Vylepšená štruktúra modulu**: Aktualizovaná tabuľka osnovy o nové pokročilé témy
  - Pridané položky Kontextové inžinierstvo (5.14) a Vlastný transport (5.15)
  - Konzistentné formátovanie a navigačné odkazy vo všetkých moduloch
  - Aktualizované popisy pre odraz aktuálneho rozsahu obsahu

### Vylepšenia štruktúry adresárov
- **Štandardizácia pomenovania**: Premenovaný "mcp transport" na "mcp-transport" pre konzistentnosť s ostatnými zložkami pokročilých tém
- **Organizácia obsahu**: Všetky priečinky 05-AdvancedTopics teraz podľa jednotného vzoru (mcp-[téma])

### Kvalita dokumentácie
- **Zladenie so špecifikáciou MCP**: Všetky nové obsahy odkazujú na aktuálnu špecifikáciu MCP 2025-06-18
- **Príklady v viacerých jazykoch**: Komplexné kódy v C#, TypeScript a Pythone
- **Podnikový prístup**: Produkčne pripravené vzory a integrácia Azure cloudu v celom obsahu
- **Vizualizácia dokumentácie**: Mermaid diagramy pre architektúru a vizualizáciu tokov

## 18. august 2025

### Komplexná aktualizácia dokumentácie - Štandardy MCP 2025-06-18

#### Najlepšie bezpečnostné postupy MCP (02-Security/) - Kompletná modernizácia
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Úplné prepracovanie v súlade s MCP špecifikáciou 2025-06-18
  - **Povinné požiadavky**: Pridané jasné požiadavky MUSÍ/MUSÍ NIE zo špecifikácie s prehľadnými vizuálnymi indikátormi
  - **12 základných bezpečnostných praktík**: Prepracované z 15-položkového zoznamu na komplexné bezpečnostné domény
    - Bezpečnosť tokenov a autentifikácia s integráciou externého identity providera
    - Správa relácií a bezpečnosť transportu s kryptografickými požiadavkami
    - Ochrana proti hrozbám špecifickým pre AI s integráciou Microsoft Prompt Shields
    - Kontrola prístupu a oprávnení s princípom najmenších práv
    - Bezpečnosť obsahu a monitorovanie s integráciou Azure Content Safety
    - Bezpečnosť dodávateľského reťazca s komplexnou verifikáciou komponentov
    - OAuth bezpečnosť a prevencia zámienky s implementáciou PKCE
    - Reakcia na incidenty a obnovu s automatizovanými kapacitami
    - Súlad a správa v súlade s reguláciami
    - Pokročilé bezpečnostné kontroly s architektúrou zero trust
    - Integrácia Microsoft bezpečnostného ekosystému s komplexnými riešeniami
    - Neustály vývoj bezpečnosti s adaptívnymi metódami
  - **Microsoft bezpečnostné riešenia**: Vylepšené pokyny pre integráciu Prompt Shields, Azure Content Safety, Entra ID a GitHub Advanced Security
  - **Implementačné zdroje**: Kategorizované odkazy na komplexné zdroje podľa oficiálnej dokumentácie MCP, riešení Microsoft bezpečnosti, bezpečnostných štandardov a sprievodcov implementáciou

#### Pokročilé bezpečnostné kontroly (02-Security/) - Podniková implementácia
- **MCP-SECURITY-CONTROLS-2025.md**: Kompletná prerábka s podnikovo orientovaným bezpečnostným rámcom
  - **9 komplexných bezpečnostných domén**: Rozšírené z základných kontrol na podrobný podnikový rámec
    - Pokročilá autentifikácia a autorizácia s integráciou Microsoft Entra ID
    - Bezpečnosť tokenov a kontroly proti passthrough s komplexnou validáciou
    - Bezpečnosť relácií s prevenciou únosu
    - Špecifické bezpečnostné kontroly AI s prevenciou injektáže promptov a otravovania nástrojov
    - Prevencia útoku zámienky s OAuth proxy bezpečnosťou
    - Bezpečnosť vykonávania nástrojov s pieskoviskom a izoláciou
    - Kontroly bezpečnosti dodávateľského reťazca s verifikáciou závislostí
    - Monitorovanie a detekcia so SIEM integráciou
    - Reakcia na incidenty a obnova s automatizovanými kapacitami
  - **Príklady implementácie**: Detailné YAML konfiguračné bloky a kódové príklady
  - **Integrácia Microsoft riešení**: Komplexné pokrytie Azure bezpečnostných služieb, GitHub Advanced Security a podnikovej správy identity

#### Bezpečnosť na pokročilých témach (05-AdvancedTopics/mcp-security/) - Produkčne pripravená implementácia
- **README.md**: Kompletné prepracovanie pre podnikovú implementáciu bezpečnosti
  - **Zladenie so súčasnou špecifikáciou**: Aktualizované podľa MCP špecifikácie 2025-06-18 so zatriedením povinných bezpečnostných požiadaviek
  - **Vylepšená autentifikácia**: Integrácia Microsoft Entra ID s komplexnými príkladmi pre .NET a Java Spring Security
  - **Integrácia bezpečnosti AI**: Implementácia Microsoft Prompt Shields a Azure Content Safety s podrobnými Python príkladmi
  - **Pokročilá mitigácia hrozieb**: Komplexné implementačné príklady pre
    - Prevenciu útokov zámienky s PKCE a validáciou používateľského súhlasu
    - Prevenciu passthrough tokenov s validáciou publika a bezpečnou správou tokenov
    - Prevenciu únosu relácie s kryptografickým viazaním a behaviorálnou analýzou
  - **Podniková bezpečnostná integrácia**: Monitorovanie Azure Application Insights, pipeline na detekciu hrozieb a bezpečnosť dodávateľského reťazca
  - **Kontrolný zoznam implementácie**: Jasné označenie povinných a odporúčaných bezpečnostných kontrol s výhodami Microsoft bezpečnostného ekosystému

### Kvalita a štandardy dokumentácie
- **Referencie na špecifikácie**: Aktualizované všetky odkazy na aktuálnu MCP špecifikáciu 2025-06-18
- **Microsoft bezpečnostný ekosystém**: Vylepšené vedenie pre integráciu v celej bezpečnostnej dokumentácii
- **Praktická implementácia**: Pridané detailné kódové príklady v .NET, Java a Pythone s podnikateľskými vzormi
- **Organizácia zdrojov**: Komplexná kategorizácia oficiálnej dokumentácie, bezpečnostných štandardov a sprievodcov implementáciou
- **Vizuálne indikátory**: Jasné rozlíšenie povinných požiadaviek a odporúčaných praktík


#### Základné koncepty (01-CoreConcepts/) - Kompletná modernizácia
- **Aktualizácia verzie protokolu**: Aktualizované s odkazom na aktuálnu MCP špecifikáciu 2025-06-18 s formátom dátumu (RRRR-MM-DD)
- **Vylepšenie architektúry**: Rozšírené popisy Hosts, Clients a Servers tak, aby odrážali aktuálne architektonické vzory MCP
  - Hostitelia sú teraz jasne definovaní ako AI aplikácie koordinujúce viaceré MCP klientské pripojenia
  - Klienti popísaní ako protokolové konektory udržiavajúce vzťahy server-klient 1 ku 1
  - Servery vylepšené o scenáre lokálneho vs. vzdialeného nasadenia
- **Primitívna reštrukturalizácia**: Kompletná prestavba serverových a klientske primitív
  - Serverové primitíva: Zdroje (dátové zdroje), Výzvy (šablóny), Nástroje (spustiteľné funkcie) s podrobnými vysvetleniami a príkladmi
  - Klientské primitíva: Vzorkovanie (LLM dokončenia), Elicitácia (užívateľský vstup), Logovanie (ladenie/monitoring)
  - Aktualizované s aktuálnymi vzormi metód pre objavovanie (`*/list`), získavanie (`*/get`) a vykonávanie (`*/call`)
- **Architektúra protokolu**: Zavedený dvojvrstvový architektonický model
  - Dátová vrstva: Základňa JSON-RPC 2.0 s riadením životného cyklu a primitívami
  - Prenosová vrstva: STDIO (lokálna) a Streamovateľný HTTP s SSE (vzdialený) prenosové mechanizmy
- **Bezpečnostný rámec**: Komplexné bezpečnostné princípy vrátane explicitného súhlasu užívateľa, ochrany súkromia dát, bezpečnosti vykonávania nástrojov a bezpečnosti prenosovej vrstvy
- **Komunikačné vzory**: Aktualizované protokolové správy na zobrazenie inicializácie, objavovania, vykonávania a notifikačných tokov
- **Príklady kódu**: Obnovené viacjazyčné príklady (.NET, Java, Python, JavaScript) odrážajúce aktuálne MCP SDK vzory

#### Bezpečnosť (02-Security/) - Komplexná bezpečnostná prestavba  
- **Zladenie s normami**: Plné zosúladenie s bezpečnostnými požiadavkami špecifikácie MCP 2025-06-18
- **Vývoj autentifikácie**: Zdokumentovaný vývoj od vlastných OAuth serverov po delegáciu externého poskytovateľa identity (Microsoft Entra ID)
- **Analýza hrozieb špecifických pre AI**: Rozšírené pokrytie moderných AI útokových vektorov
  - Podrobné scenáre útokov prompt injection s reálnymi príkladmi
  - Mechanizmy otrávenia nástrojov a vzory útokov "rug pull"
  - Otrávenie kontextového okna a útoky na zmätok modelu
- **Microsoft riešenia bezpečnosti AI**: Komplexné pokrytie bezpečnostného ekosystému Microsoftu
  - AI Prompt Shields s pokročilými detekčnými, vyzdvihovacími a oddeľovacími technikami
  - Integračné vzory Azure Content Safety
  - GitHub Advanced Security pre ochranu dodávateľského reťazca
- **Pokročilé zmierňovanie hrozieb**: Podrobné bezpečnostné opatrenia pre
  - Útoky na prevzatie relácie s MCP-špecifickými scénarmi útokov a požiadavkami na kryptografické ID relácie
  - Problémy typu "confused deputy" v MCP proxy scenároch s explicitnými požiadavkami na súhlas
  - Zraniteľnosti pri prepúšťaní tokenov s povinnými validačnými kontrolami
- **Bezpečnosť dodávateľského reťazca**: Rozšírené pokrytie AI dodávateľského reťazca vrátane základných modelov, služieb embeddingov, kontextových poskytovateľov a API tretích strán
- **Základná bezpečnosť**: Vylepšená integrácia s podnikateľskými bezpečnostnými vzormi vrátane architektúry zero trust a ekosystému Microsoft bezpečnosti
- **Organizácia zdrojov**: Kategorizované komplexné odkazy na zdroje podľa typu (Oficiálna dokumentácia, Štandardy, Výskum, Microsoft riešenia, Implementačné príručky)

### Vylepšenia kvality dokumentácie
- **Štruktúrované vzdelávacie ciele**: Vylepšené vzdelávacie ciele so špecifickými, akčnými výsledkami 
- **Medziodkazovanie**: Pridané odkazy medzi súvisiacimi bezpečnostnými a jadrovými konceptmi
- **Aktuálne informácie**: Aktualizované všetky dátumy a odkazy na špecifikácie podľa aktuálnych štandardov
- **Implementačné usmernenia**: Pridané konkrétne, akčné usmernenia k implementácii v celom obsahu oboch sekcií

## 16. júla 2025

### Vylepšenia README a navigácie
- Kompletné prepracovanie navigácie kurikula v README.md
- Nahradenie `<details>` tagov prístupnejším formátom založeným na tabuľkách
- Vytvorenie alternatívnych rozložení v novom priečinku "alternative_layouts"
- Pridané príklady navigácie v štýle kariet, záložiek a akordiónu
- Aktualizovaná sekcia štruktúry repozitára s najnovšími súbormi
- Vylepšená sekcia "Ako používať toto kurikulum" s jasnými odporúčaniami
- Aktualizované odkazy na MCP špecifikáciu smerujúce na správne URL
- Pridaná sekcia Kontextové inžinierstvo (5.14) do štruktúry kurikula

### Aktualizácie študijného sprievodcu
- Kompletne revidovaný študijný sprievodca zosúladený s aktuálnou štruktúrou repozitára
- Pridané nové sekcie pre MCP klientov a nástroje, a populárne MCP servery
- Aktualizovaná vizuálna mapa kurikula presne zobrazujúca všetky témy
- Vylepšené popisy Pokročilých tém na pokrytie všetkých špecializovaných oblastí
- Aktualizovaná sekcia prípadových štúdií s aktuálnymi príkladmi
- Pridaný tento komplexný zoznam zmien

### Príspevky komunity (06-CommunityContributions/)
- Pridané podrobné informácie o MCP serveroch pre generovanie obrázkov
- Pridaná komplexná sekcia o používaní Claude vo VSCode
- Pridané inštrukcie na nastavenie a používanie terminálového klienta Cline
- Aktualizovaná sekcia MCP klientov zahŕňajúca všetky populárne klientské možnosti
- Vylepšené príklady príspevkov s presnejšími ukážkami kódu

### Pokročilé témy (05-AdvancedTopics/)
- Zorganizované všetky špecializované tematické priečinky s konzistentným názvoslovím
- Pridané materiály a príklady kontextového inžinierstva
- Pridaná dokumentácia integrácie Foundry agenta
- Vylepšená dokumentácia integrácie bezpečnosti Entra ID

## 11. júna 2025

### Počiatočné vytvorenie
- Uvoľnená prvá verzia kurikula MCP pre začiatočníkov
- Vytvorená základná štruktúra pre všetkých 10 hlavných sekcií
- Implementovaná vizuálna mapa kurikula pre navigáciu
- Pridané úvodné vzorové projekty vo viacerých programovacích jazykoch

### Začíname (03-GettingStarted/)
- Vytvorené prvé príklady implementácie servera
- Pridané usmernenia na vývoj klientov
- Zahrnuté inštrukcie na integráciu LLM klienta
- Pridaná dokumentácia pre integráciu vo VS Code
- Implementované príklady servera Server-Sent Events (SSE)

### Jadro koncepcií (01-CoreConcepts/)
- Pridané podrobné vysvetlenie architektúry klient-server
- Vytvorená dokumentácia k hlavným komponentom protokolu
- Zdokumentované komunikačné vzory v MCP

## 23. mája 2025

### Štruktúra repozitára
- Inicializovaný repozitár so základnou štruktúrou priečinkov
- Vytvorené README súbory pre každú hlavnú sekciu
- Nastavená infraštruktúra pre preklady
- Pridané obrázky a diagramy

### Dokumentácia
- Vytvorený počiatočný README.md so zhrnutím kurikula
- Pridané súbory CODE_OF_CONDUCT.md a SECURITY.md
- Nastavený SUPPORT.md s návodmi na získanie pomoci
- Vytvorená predbežná štruktúra študijného sprievodcu

## 15. apríla 2025

### Plánovanie a rámec
- Počiatočné plánovanie kurikula MCP pre začiatočníkov
- Definované vzdelávacie ciele a cieľová skupina
- Nástin 10-člennej štruktúry kurikula
- Vyvinutý konceptuálny rámec pre príklady a prípadové štúdie
- Vytvorené počiatočné prototypové príklady kľúčových konceptov

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornenie**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, prosím vezmite na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nepochopenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->