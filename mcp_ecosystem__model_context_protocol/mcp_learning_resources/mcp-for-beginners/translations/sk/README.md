![MCP-pre-začiatočníkov](../../translated_images/sk/mcp-beginners.2ce2b317996369ff.webp) 

[![Prispievatelia GitHub](https://img.shields.io/github/contributors/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/graphs/contributors)
[![Problémy GitHub](https://img.shields.io/github/issues/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/issues)
[![Pull requesty GitHub](https://img.shields.io/github/issues-pr/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/pulls)
[![PRs vítané](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Sledujúci GitHub](https://img.shields.io/github/watchers/microsoft/mcp-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/mcp-for-beginners/watchers)
[![Rozdvojenia GitHub](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)
[![Hviezdičky GitHub](https://img.shields.io/github/stars/microsoft/mcp-for-beginners?style=social&label=Star)](https://GitHub.com/microsoft/mcp-for-beginners/stargazers)


[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

Postupujte podľa týchto krokov, aby ste začali používať tieto zdroje:
1. **Rozdvojte repozitár**: Kliknite na [![Rozdvojenia GitHub](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)
2. **Naklonujte repozitár**:   `git clone https://github.com/microsoft/mcp-for-beginners.git`
3. **Pripojte sa k** [![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


### 🌐 Podpora viacerých jazykov

#### Podporované cez GitHub Action (automatizované a vždy aktuálne)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabčina](../ar/README.md) | [Bengálčina](../bn/README.md) | [Bulharčina](../bg/README.md) | [Barmčina (Myanmar)](../my/README.md) | [Čínština (zjednodušená)](../zh-CN/README.md) | [Čínština (tradičná, Hongkong)](../zh-HK/README.md) | [Čínština (tradičná, Macau)](../zh-MO/README.md) | [Čínština (tradičná, Taiwan)](../zh-TW/README.md) | [Chorvátčina](../hr/README.md) | [Čeština](../cs/README.md) | [Dánčina](../da/README.md) | [Holandčina](../nl/README.md) | [Estónčina](../et/README.md) | [Fínčina](../fi/README.md) | [Francúzština](../fr/README.md) | [Nemčina](../de/README.md) | [Gréčtina](../el/README.md) | [Hebrejčina](../he/README.md) | [Hindčina](../hi/README.md) | [Maďarčina](../hu/README.md) | [Indonézština](../id/README.md) | [Taliančina](../it/README.md) | [Japončina](../ja/README.md) | [Kannadčina](../kn/README.md) | [Khmerčina](../km/README.md) | [Kórejčina](../ko/README.md) | [Litovčina](../lt/README.md) | [Malajčina](../ms/README.md) | [Malajálamčina](../ml/README.md) | [Maráthčina](../mr/README.md) | [Nepálčina](../ne/README.md) | [Nigerijský pidžin](../pcm/README.md) | [Norština](../no/README.md) | [Perzština (Farsi)](../fa/README.md) | [Poľština](../pl/README.md) | [Portugalčina (Brazília)](../pt-BR/README.md) | [Portugalčina (Portugalsko)](../pt-PT/README.md) | [Pandžábčina (Gurmukhi)](../pa/README.md) | [Rumunčina](../ro/README.md) | [Ruština](../ru/README.md) | [Srbčina (cyrilika)](../sr/README.md) | [Slovenčina](./README.md) | [Slovinčina](../sl/README.md) | [Španielčina](../es/README.md) | [Swahilčina](../sw/README.md) | [Švédčina](../sv/README.md) | [Tagalog (Filipínčina)](../tl/README.md) | [Tamilčina](../ta/README.md) | [Telugčina](../te/README.md) | [Thajčina](../th/README.md) | [Turečtina](../tr/README.md) | [Ukrajinčina](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamčina](../vi/README.md)

> **Radšej naklonovať lokálne?**
>
> Tento repozitár obsahuje vyše 50 jazykových prekladov, čo výrazne zväčšuje veľkosť sťahovania. Ak chcete klonovať bez prekladov, použite sparse checkout:
>
> **Bash / macOS / Linux:**
> ```bash
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
> ```
>
> **CMD (Windows):**
> ```cmd
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone "/*" "!translations" "!translated_images"
> ```
>
> Toto vám poskytne všetko potrebné na dokončenie kurzu oveľa rýchlejšie.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

# 🚀 Učebný plán Model Context Protocol (MCP) pre začiatočníkov

## **Naučte sa MCP na praktických príkladoch kódu v C#, Java, JavaScript, Rust, Python a TypeScript**

## 🧠 Prehľad učebného plánu Model Context Protocol
Vitajte na vašej ceste do sveta Model Context Protocol! Ak ste sa niekedy zaujímali, ako AI aplikácie komunikujú s rôznymi nástrojmi a službami, čoskoro objavíte elegantné riešenie, ktoré mení spôsob, akým vývojári vytvárajú inteligentné systémy.

Predstavte si MCP ako univerzálneho prekladateľa pre AI aplikácie – rovnako ako USB porty umožňujú pripojiť akékoľvek zariadenie k počítaču, MCP umožňuje AI modelom pripojiť sa ku ktorémukoľvek nástroju alebo službe štandardizovaným spôsobom. Či už budujete svoj prvý chatbot alebo pracujete na zložitých AI pracovných procesoch, pochopenie MCP vám poskytne silu vytvárať schopnejšie a flexibilnejšie aplikácie.

Tento učebný plán je navrhnutý s trpezlivosťou a starostlivosťou pre vašu vzdelávaciu cestu. Začneme jednoduchými konceptmi, ktoré už poznáte, a postupne budeme rozvíjať vaše znalosti prostredníctvom praktického precvičovania v obľúbenom programovacom jazyku. Každý krok obsahuje jasné vysvetlenia, praktické príklady a množstvo povzbudenia.

Keď túto cestu dokončíte, budete mať sebavedomie vytvoriť vlastné MCP servery, integrovať ich s populárnymi AI platformami a porozumieť, ako táto technológia formuje budúcnosť vývoja AI. Poďme spoločne začať toto vzrušujúce dobrodružstvo!

### Oficiálna dokumentácia a špecifikácie

Tento učebný plán je zosúladený s **MCP Špecifikáciou 2025-11-25** (najnovšie stabilné vydanie). Špecifikácia MCP používa dátumové verzovanie (formát RRRR-MM-DD), aby zabezpečila jasné sledovanie verzií protokolu.

Tieto zdroje sa stávajú užitočnejšími, ako vaše pochopenie rastie, ale necíťte sa pod tlakom, aby ste čítali všetko naraz. Začnite v oblastiach, ktoré vás najviac zaujímajú!
- 📘 [MCP Dokumentácia](https://modelcontextprotocol.io/) – Toto je váš hlavný zdroj na podrobné návody a používateľské príručky. Dokumentácia je napísaná s ohľadom na začiatočníkov a poskytuje jasné príklady, ktorým môžete ľahko porozumieť vlastným tempom.
- 📜 [MCP Špecifikácia](https://modelcontextprotocol.io/specification/2025-11-25) – Predstavuje komplexný referenčný manuál. Počas štúdia sa sem budete vracať pre hľadanie konkrétnych podrobností a skúmanie pokročilých funkcií.
- 📜 [Verzovanie MCP Špecifikácie](https://modelcontextprotocol.io/specification/versioning) – Obsahuje informácie o histórii verzií protokolu a o tom, ako MCP používa verzovanie podľa dátumu (formát RRRR-MM-DD).
- 🧑‍💻 [MCP GitHub Repozitár](https://github.com/modelcontextprotocol) – Tu nájdete SDK, nástroje a ukážky kódu v rôznych programovacích jazykoch. Je to ako pokladnica praktických príkladov a pripravených komponentov.
- 🌐 [MCP Komunita](https://github.com/orgs/modelcontextprotocol/discussions) – Pripojte sa k ostatným študentom a skúseným vývojárom v diskusiách o MCP. Je to podporná komunita, kde sú otázky vítané a vedomosti sa slobodne zdieľajú.
  
## Ciele učenia

Na konci tohto kurzu sa budete cítiť sebaisto a nadšene z nových schopností. Tu sú hlavné výstupy:

• **Pochopiť základy MCP**: Zistíte, čo je Model Context Protocol a prečo mení spôsob spolupráce AI aplikácií, pomocou analógií a príkladov, ktoré dávajú zmysel.

• **Postaviť svoj prvý MCP server**: Vytvoríte funkčný MCP server vo vašom obľúbenom programovacom jazyku, začínajúc jednoduchými príkladmi a postupne rozširujúc svoje zručnosti.

• **Prepojiť AI modely s reálnymi nástrojmi**: Naučíte sa spojiť AI modely s reálnymi službami, čím získajú vaše aplikácie nové a silné schopnosti.

• **Implementovať bezpečnostné osvedčené postupy**: Porozumiete, ako udržiavať implementácie MCP bezpečné, chrániac aplikácie aj používateľov.

• **Nasadzovať s istotou**: Naučíte sa, ako pripraviť projekty MCP na nasadenie do produkcie pomocou praktických stratégií, ktoré fungujú v reálnom svete.

• **Pripojiť sa ku komunite MCP**: Stane sa súčasťou rastúcej komunity vývojárov, ktorí formujú budúcnosť vývoja AI aplikácií. 

## Nevyhnutné pozadie

Predtým, ako sa pustíme do detailov MCP, uistime sa, že sa cítite pohodlne s niektorými základnými pojmami. Nebojte sa, nemusíte byť expert – všetko potrebné postupne vysvetlíme!

### Pochopenie protokolov (základ)

Predstavte si protokol ako pravidlá konverzácie. Keď voláte kamarátovi, obaja viete povedať "ahoj" pri zdvihnutí, striedať sa v rozprávaní a na konci povedať "dovidenia". Počítačové programy potrebujú podobné pravidlá na účinnú komunikáciu.

MCP je protokol – súbor dohodnutých pravidiel, ktoré pomáhajú AI modelom a aplikáciám viesť produktívne "rozhovory" s nástrojmi a službami. Rovnako ako pravidlá uľahčujú ľudskú komunikáciu, MCP robí komunikáciu AI aplikácií oveľa spoľahlivejšou a efektívnejšou.

### Vzťahy klient-server (ako programy spolupracujú)

Tieto vzťahy používate denne! Keď používate prehliadač (klienta) na návštevu webu, spájate sa so serverom, ktorý vám odošle obsah stránky. Prehliadač vie, ako žiadať dáta a server vie, ako odpovedať.

V MCP máme podobný vzťah: AI modely fungujú ako klienti, ktorí žiadajú informácie alebo vykonanie akcií, a MCP servery poskytujú tieto služby. Je to ako mať pomocníka (server), ktorého AI môže požiadať o vykonanie konkrétnych úloh.

### Prečo je štandardizácia dôležitá (spoločná spolupráca)

Predstavte si, že by každý výrobca áut používal iný tvar benzínovej pištole – potrebovali by ste iný adaptér pre každé auto! Štandardizácia znamená dohodnúť sa na spoločnom prístupe, aby všetko fungovalo hladko spolu.

MCP zabezpečuje štandardizáciu pre AI aplikácie. Namiesto toho, aby každý AI model potreboval vlastný kód pre každý nástroj, MCP vytvára univerzálny spôsob komunikácie. Vývojári tak môžu nástroje vytvoriť raz a použiť ich s množstvom rôznych AI systémov.

## 🧭 Prehľad vašej učebnej cesty

Vaša MCP cesta je starostlivo rozvrhnutá, aby postupne budovala vaše sebavedomie a zručnosti. Každá fáza predstavuje nové koncepty a zároveň upevňuje už naučené.

### 🌱 Základná fáza: Pochopenie základov (moduly 0-2)

Tu začína vaše dobrodružstvo! Predstavíme vám koncepty MCP jednoduchými analógiami a príkladmi z bežného života. Pochopíte, čo MCP je, prečo existuje a ako zapadá do sveta vývoja AI.

• **Modul 0 – Úvod do MCP**: Začneme preskúmaním, čo MCP je a prečo je také dôležité pre moderné AI aplikácie. Uvidíte reálne príklady MCP v akcii a pochopíte, ako rieši bežné problémy vývojárov.

• **Modul 1 – Vysvetlenie základných konceptov**: Naučíte sa kľúčové stavebné kamene MCP. Použijeme veľa analógií a vizuálnych príkladov, aby ste tieto koncepty pochopili prirodzene a ľahko.

• **Modul 2 – Bezpečnosť v MCP**: Bezpečnosť môže znieť zastrašujúco, ale ukážeme vám, ako MCP obsahuje vstavané bezpečnostné prvky a naučíme vás najlepšie postupy na ochranu vašich aplikácií od začiatku.

### 🔨 Fáza tvorby: Vytváranie prvých implementácií (Modul 3)
Teraz začína pravá zábava! Získate praktické skúsenosti s tvorbou skutočných MCP serverov a klientov. Nebojte sa – začneme jednoducho a prevedieme vás každým krokom.

Tento modul obsahuje viacero praktických návodov, ktoré vám umožnia cvičiť vo vašom preferovanom programovacom jazyku. Vytvoríte si svoj prvý server, zostavíte klienta, ktorý sa k nemu pripojí, a dokonca sa naučíte integrovať s populárnymi vývojárskymi nástrojmi ako VS Code.

Každý návod obsahuje kompletné príklady kódu, tipy na riešenie problémov a vysvetlenia, prečo robíme konkrétne dizajnové rozhodnutia. Na konci tejto fázy budete mať funkčné implementácie MCP, na ktoré môžete byť hrdí!

### 🚀 Fáza rastu: Pokročilé koncepty a aplikácie v reálnom svete (Moduly 4-5)

Akonáhle zvládnete základy, ste pripravení preskúmať sofistikovanejšie funkcie MCP. Pokryjeme praktické implementačné stratégie, techniky ladenia a pokročilé témy ako integrácia multimodálnej AI.

Naučíte sa tiež, ako škálovať svoje MCP implementácie pre produkčné použitie a integrovať ich s cloudovými platformami ako Azure. Tieto moduly vás pripravia na tvorbu MCP riešení schopných zvládať požiadavky v reálnom svete.

### 🌟 Fáza majstrovstva: Komunita a špecializácia (Moduly 6-11)

Záverečná fáza sa zameriava na vstup do MCP komunity a špecializáciu v oblastiach, ktoré vás najviac zaujímajú. Naučíte sa, ako prispievať do open-source MCP projektov, implementovať pokročilé autentifikačné vzory a vytvárať komplexné riešenia integrované s databázami.

Modul 11 si zaslúži osobitné spomenutie – ide o kompletnú 13-laboratórnu praktickú cestu, ktorá vás naučí vytvoriť produkčne pripravené MCP servery s integráciou PostgreSQL. Je to ako záverečný projekt, ktorý zjednocuje všetko, čo ste sa naučili!

### 📚 Kompletná štruktúra kurikula

| Modul | Téma | Popis | Odkaz |
|--------|-------|-------------|------|
| **Modul 0-3: Základy** | | | |
| 00 | Úvod do MCP | Prehľad Model Context Protocol a jeho význam v AI pipeline | [Čítať viac](./00-Introduction/README.md) |
| 01 | Vysvetlenie jadrových konceptov | Hlboký prieskum základných MCP konceptov | [Čítať viac](./01-CoreConcepts/README.md) |
| 02 | Bezpečnosť v MCP | Hrozby bezpečnosti a osvedčené postupy | [Čítať viac](./02-Security/README.md) |
| 03 | Začína sa s MCP | Nastavenie prostredia, základné servery/klienti, integrácia | [Čítať viac](./03-GettingStarted/README.md) |
| **Modul 3: Vytvorenie prvého servera a klienta** | | | |
| 3.1 | Prvý server | Vytvorte svoj prvý MCP server | [Návod](./03-GettingStarted/01-first-server/README.md) |
| 3.2 | Prvý klient | Vyvinúť základného MCP klienta | [Návod](./03-GettingStarted/02-client/README.md) |
| 3.3 | Klient s LLM | Integrácia veľkých jazykových modelov | [Návod](./03-GettingStarted/03-llm-client/README.md) |
| 3.4 | Integrácia VS Code | Používanie MCP serverov vo VS Code | [Návod](./03-GettingStarted/04-vscode/README.md) |
| 3.5 | stdio server | Vytvorenie serverov používajúcich stdio transport | [Návod](./03-GettingStarted/05-stdio-server/README.md) |
| 3.6 | HTTP streamovanie | Implementácia HTTP streamovania v MCP | [Návod](./03-GettingStarted/06-http-streaming/README.md) |
| 3.7 | Microsoft Foundry Toolkit | Použitie Microsoft Foundry Toolkit s MCP | [Návod](./03-GettingStarted/07-aitk/README.md) |
| 3.8 | Testovanie | Testovanie implementácie MCP servera | [Návod](./03-GettingStarted/08-testing/README.md) |
| 3.9 | Nasadenie | Nasadenie MCP serverov do produkcie | [Návod](./03-GettingStarted/09-deployment/README.md) |
| 3.10 | Pokročilé využitie servera | Použitie pokročilých serverov pre pokročilé funkcie a zlepšenú architektúru | [Návod](./03-GettingStarted/10-advanced/README.md) |
| 3.11 | Jednoduchá autentifikácia | Kapitola ukazujúca autentifikáciu od základov a RBAC | [Návod](./03-GettingStarted/11-simple-auth/README.md) |
| 3.12 | MCP Hosty | Konfigurácia Claude Desktop, Cursor, Cline a ďalších MCP hostov | [Návod](./03-GettingStarted/12-mcp-hosts/README.md) |
| 3.13 | MCP Inspector | Ladenie a testovanie MCP serverov pomocou nástroja Inspector | [Návod](./03-GettingStarted/13-mcp-inspector/README.md) |
| 3.14 | Sampling | Použitie sampling na spoluprácu s klientom | [Návod](./03-GettingStarted/14-sampling/README.md) |
| 3.15 | MCP aplikácie | Vytváranie MCP aplikácií | [Návod](./03-GettingStarted/15-mcp-apps/README.md) |
| **Modul 4-5: Praktické a pokročilé témy** | | | |
| 04 | Praktická implementácia | SDK, ladenie, testovanie, znovu použiteľné prompt šablóny | [Čítať viac](./04-PracticalImplementation/README.md) |
| 4.1 | Pagína | Práca s veľkými množinami výsledkov pomocou stránkovania na základe kurzora | [Návod](./04-PracticalImplementation/pagination/README.md) |
| 05 | Pokročilé témy v MCP | Multimodálna AI, škálovanie, použitie v podniku | [Čítať viac](./05-AdvancedTopics/README.md) |
| 5.1 | Integrácia Azure | MCP integrácia s Azure | [Návod](./05-AdvancedTopics/mcp-integration/README.md) |
| 5.2 | Multimodalita | Práca s viacerými modalitami | [Návod](./05-AdvancedTopics/mcp-multi-modality/README.md) |
| 5.3 | OAuth2 Demo | Implementácia OAuth2 autentifikácie | [Návod](./05-AdvancedTopics/mcp-oauth2-demo/README.md) |
| 5.4 | Root kontexty | Pochopenie a implementácia root kontextov | [Návod](./05-AdvancedTopics/mcp-root-contexts/README.md) |
| 5.5 | Routing | Stratégie routovania v MCP | [Návod](./05-AdvancedTopics/mcp-routing/README.md) |
| 5.6 | Sampling | Sampling techniky v MCP | [Návod](./05-AdvancedTopics/mcp-sampling/README.md) |
| 5.7 | Škálovanie | Škálovanie MCP implementácií | [Návod](./05-AdvancedTopics/mcp-scaling/README.md) |
| 5.8 | Bezpečnosť | Pokročilé bezpečnostné úvahy | [Návod](./05-AdvancedTopics/mcp-security/README.md) |
| 5.9 | Webové vyhľadávanie | Implementácia webových vyhľadávacích schopností | [Návod](./05-AdvancedTopics/web-search-mcp/README.md) |
| 5.10 | Reálne časové streamovanie | Vytváranie funkcií pre streamovanie v reálnom čase | [Návod](./05-AdvancedTopics/mcp-realtimestreaming/README.md) |
| 5.11 | Reálne časové vyhľadávanie | Implementácia vyhľadávania v reálnom čase | [Návod](./05-AdvancedTopics/mcp-realtimesearch/README.md) |
| 5.12 | Entra ID autentifikácia | Autentifikácia s Microsoft Entra ID | [Návod](./05-AdvancedTopics/mcp-security-entra/README.md) |
| 5.13 | Integrácia Foundry | Integrácia s Microsoft Foundry | [Návod](./05-AdvancedTopics/mcp-foundry-agent-integration/README.md) |
| 5.14 | Context engineering | Techniky efektívneho inžinierstva kontextu | [Návod](./05-AdvancedTopics/mcp-contextengineering/README.md) |
| 5.15 | Vlastný MCP transport | Implementácie vlastných transportov | [Návod](./05-AdvancedTopics/mcp-transport/README.md) |
| 5.16 | Funkcie protokolu | Upozornenia o pokroku, zrušenie, šablóny zdrojov | [Návod](./05-AdvancedTopics/mcp-protocol-features/README.md) |
| 5.17 | Adversariálne multi-agentné uvažovanie | Dvaja agenti argumentujú protichodné stránky pomocou zdieľaných MCP nástrojov, hodnotené agentom sudcom | [Návod](./05-AdvancedTopics/mcp-adversarial-agents/README.md) |
| **Modul 6-10: Komunita a najlepšie postupy** | | | |
| 06 | Komunitné príspevky | Ako prispievať do MCP ekosystému | [Návod](./06-CommunityContributions/README.md) |
| 07 | Postrehy z raného adopcie | Príbehy zo života o implementácii | [Návod](./07-LessonsfromEarlyAdoption/README.md) |
| 08 | Najlepšie postupy pre MCP | Výkon, odolnosť voči chybám, robustnosť | [Návod](./08-BestPractices/README.md) |
| 09 | MCP štúdie prípadov | Praktické príklady implementácie | [Návod](./09-CaseStudy/README.md) |
| 10 | Praktický workshop | Budovanie MCP servera s Microsoft Foundry Toolkit | [Lab](./10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) |
| **Modul 11: MCP Server Hands On Lab** | | | |
| 11 | MCP server databázová integrácia | Komplexná 13-laboratórna praktická cesta pre integráciu PostgreSQL | [Lab](./11-MCPServerHandsOnLabs/README.md) |
| 11.1 | Úvod | Prehľad MCP s databázovou integráciou a prípad použitia detailnej analýzy z maloobchodu | [Lab 00](./11-MCPServerHandsOnLabs/00-Introduction/README.md) |
| 11.2 | Jadro architektúry | Pochopenie architektúry MCP servera, databázových vrstiev a bezpečnostných vzorov | [Lab 01](./11-MCPServerHandsOnLabs/01-Architecture/README.md) |
| 11.3 | Bezpečnosť a multi-tenancy | RLS, autentifikácia a prístup k údajom viacerých nájomcov | [Lab 02](./11-MCPServerHandsOnLabs/02-Security/README.md) |
| 11.4 | Nastavenie prostredia | Nastavenie vývojového prostredia, Docker, Azure zdroje | [Lab 03](./11-MCPServerHandsOnLabs/03-Setup/README.md) |
| 11.5 | Návrh databázy | Nastavenie PostgreSQL, návrh maloobchodného schémy a ukážkové dáta | [Lab 04](./11-MCPServerHandsOnLabs/04-Database/README.md) |
| 11.6 | MCP server implementácia | Vytváranie FastMCP servera s databázovou integráciou | [Lab 05](./11-MCPServerHandsOnLabs/05-MCP-Server/README.md) |
| 11.7 | Vývoj nástrojov | Tvorba nástrojov pre dopyty do databázy a introspekciu schémy | [Lab 06](./11-MCPServerHandsOnLabs/06-Tools/README.md) |
| 11.8 | Sémantické vyhľadávanie | Implementácia vektorových embeddingov s Azure OpenAI a pgvector | [Lab 07](./11-MCPServerHandsOnLabs/07-Semantic-Search/README.md) |
| 11.9 | Testovanie a ladenie | Testovacie stratégie, nástroje na ladenie a prístupy k validácii | [Lab 08](./11-MCPServerHandsOnLabs/08-Testing/README.md) |
| 11.10 | Integrácia VS Code | Konfigurácia integrácie MCP vo VS Code a použitie AI chatu | [Lab 09](./11-MCPServerHandsOnLabs/09-VS-Code/README.md) |
| 11.11 | Nasadzovacie stratégie | Nasadenie cez Docker, Azure Container Apps a úvahy o škálovaní | [Lab 10](./11-MCPServerHandsOnLabs/10-Deployment/README.md) |
| 11.12 | Monitorovanie | Application Insights, logovanie, monitorovanie výkonu | [Lab 11](./11-MCPServerHandsOnLabs/11-Monitoring/README.md) |
| 11.13 | Najlepšie postupy | Optimalizácia výkonu, spevňovanie bezpečnosti a tipy pre produkciu | [Lab 12](./11-MCPServerHandsOnLabs/12-Best-Practices/README.md) |
| **Modul 12: MCP nástroje** | | | |
| 12.1 | Nástroje | Použitie MCP v aplikácii Copilot | [Návod](./12-tooling/README.md) |

### 💻 Ukážkové projekty kódu

Jednou z najzaujímavejších častí učenia MCP je vidieť, ako sa vaše kódovacie schopnosti postupne zlepšujú. Navrhli sme naše príklady kódu tak, aby začínali jednoducho a postupne rástli do sofistikovanejších úrovní podľa rastúceho porozumenia. Takto predstavujeme koncepty – s kódom, ktorý je ľahko pochopiteľný, ale ukazuje skutočné princípy MCP, pochopíte nielen čo kód robí, ale aj prečo je štruktúrovaný týmto spôsobom a ako zapadá do väčších MCP aplikácií.

#### Základné príklady MCP kalkulačky

| Jazyk | Popis | Odkaz |
|----------|-------------|------|
| C# | Príklad MCP servera | [Zobraziť kód](./03-GettingStarted/samples/csharp/README.md) |
| Java | MCP kalkulačka | [Zobraziť kód](./03-GettingStarted/samples/java/calculator/README.md) |
| JavaScript | MCP demo | [Zobraziť kód](./03-GettingStarted/samples/javascript/README.md) |
| Python | MCP server | [Zobraziť kód](../../03-GettingStarted/samples/python/mcp_calculator_server.py) |
| TypeScript | MCP príklad | [Zobraziť kód](./03-GettingStarted/samples/typescript/README.md) |
| Rust | MCP príklad | [Zobraziť kód](./03-GettingStarted/samples/rust/README.md) |

#### Pokročilé MCP implementácie

| Jazyk | Popis | Odkaz |
|----------|-------------|------|
| C# | Pokročilý príklad | [Zobraziť kód](./04-PracticalImplementation/samples/csharp/README.md) |
| Java so Spring | Príklad Container App | [Zobraziť kód](./04-PracticalImplementation/samples/java/containerapp/README.md) |
| JavaScript | Pokročilý príklad | [Zobraziť kód](./04-PracticalImplementation/samples/javascript/README.md) |
| Python | Komplexná implementácia | [Zobraziť kód](./04-PracticalImplementation/samples/python/README.md) |
| TypeScript | Príklad Container | [Zobraziť kód](./04-PracticalImplementation/samples/typescript/README.md) |


## 🎯 Predpoklady pre učenie MCP

Aby ste z tohto učebného plánu získali maximum, mali by ste mať:

- Základné znalosti programovania aspoň v jednom z nasledujúcich jazykov: C#, Java, JavaScript, Python alebo TypeScript
- Pochopenie klient-server modelu a API
- Znalosť konceptov REST a HTTP
- (Voliteľné) Povedomie o pojmoch AI/ML

- Pripojenie sa k diskusiám našej komunity pre podporu

## 📚 Študijný sprievodca a zdroje

Tento repozitár obsahuje niekoľko zdrojov, ktoré vám pomôžu efektívne sa orientovať a učiť:

### Študijný sprievodca

Komplexný [Študijný sprievodca](./study_guide.md) je k dispozícii, aby vám pomohol efektívne sa orientovať v tomto repozitári. Tento vizuálny mapovací plán učebného obsahu ukazuje, ako sú všetky témy prepojené, a poskytuje pokyny na efektívne používanie vzorových projektov. Je obzvlášť užitočný, ak ste vizuálny typ, ktorý rád vidí celkový obraz.

Sprievodca obsahuje:
- Vizuálnu mapu učebného plánu zobrazujúcu všetky pokryté témy
- Detailný rozpis každej časti repozitára
- Pokyny na používanie vzorových projektov
- Odporúčané učebné cesty pre rôzne úrovne zručností
- Dodatočné zdroje na doplnenie vašej študijnej cesty

### Zmeny (Changelog)

Vedieme podrobný [Zmenový zoznam](./changelog.md), ktorý sleduje všetky významné aktualizácie učebných materiálov, aby ste mohli zostať v obraze s najnovšími vylepšeniami a doplnkami.
- Pridanie nového obsahu
- Štrukturálne zmeny
- Vylepšenia funkcií
- Aktualizácie dokumentácie

## 🛠️ Ako efektívne používať tento učebný plán

Každá lekcia v tomto sprievodcovi obsahuje:

1. Jasné vysvetlenie konceptov MCP  
2. Ukážky kódu v reálnom čase v rôznych jazykoch  
3. Cvičenia na vytváranie reálnych MCP aplikácií  
4. Extra zdroje pre pokročilých študentov

### Naučme sa MCP s C# - séria tutoriálov
Naučíme sa o Model Context Protocole (MCP), modernom rámci navrhnutom na štandardizáciu interakcií medzi AI modelmi a klientskymi aplikáciami. V tomto úvodnom kurze pre začiatočníkov vás zoznámime s MCP a prevedieme vytvorením vášho prvého MCP servera.
#### C#: [https://aka.ms/letslearnmcp-csharp](https://aka.ms/letslearnmcp-csharp)
#### Java: [https://aka.ms/letslearnmcp-java](https://aka.ms/letslearnmcp-java)
#### JavaScript: [https://aka.ms/letslearnmcp-javascript](https://aka.ms/letslearnmcp-javascript)
#### Python: [https://aka.ms/letslearnmcp-python](https://aka.ms/letslearnmcp-python)

## 🎓 Vaša MCP cesta začína

Gratulujeme! Práve ste urobili prvý krok na vzrušujúcej ceste, ktorá rozšíri vaše programátorské schopnosti a spojí vás s popredím vývoja AI.

### Čo ste už dosiahli

Prečítaním tohto úvodu ste už začali budovať svoj základ vedomostí o MCP. Rozumiete, čo je MCP, prečo je dôležitý a ako vám tento učebný plán pomôže na vašej učebnej ceste. To je významný úspech a začiatok vašej odbornosti v tejto dôležitej technológii.

### Dobrodružstvo, ktoré vás čaká

Ako budete prechádzať modulmi, pamätajte, že každý expert bol raz začiatočník. Koncepty, ktoré sa vám teraz môžu zdať zložité, sa stanú druhou prirodzenosťou, keď ich budete cvičiť a aplikovať. Každý malý krok vedie k silným schopnostiam, ktoré vám budú slúžiť počas celej vašej vývojárskej kariéry.

### Vaša podporná sieť

Pridávate sa ku komunite študentov a odborníkov, ktorí sú nadšení pre MCP a ochotní pomôcť ostatným uspieť. Či už máte problém s programátorskou výzvou alebo sa tešíte na zdieľanie prelomového objavu, komunita je tu, aby podporila vašu cestu.

Ak narazíte na problém alebo máte otázky ohľadom tvorby AI aplikácií, pridajte sa k ostatným študentom a skúseným vývojárom v diskusiách o MCP. Je to podporná komunita, kde sú otázky vítané a vedomosti voľne zdieľané.

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

Ak máte spätnú väzbu k produktu alebo problémy počas vývoja, navštívte:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Microsoft_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

### Ste pripravení začať?

Vaše MCP dobrodružstvo začína teraz! Začnite s Modulom 0, aby ste sa ponorili do prvých praktických skúseností s MCP, alebo preskúmajte vzorové projekty, aby ste videli, čo budete vytvárať. Pamätajte - každý expert začínal presne tam, kde ste teraz vy a s trpezlivosťou a praxou budete prekvapení, čo všetko dokážete.

Vitajte vo svete vývoja Model Context Protocol. Postavme niečo úžasné spolu!

## 🤝 Príspevky do vzdelávacej komunity

Tento učebný plán rastie a silnie vďaka príspevkom študentov ako ste vy! Či už opravujete chybu, navrhujete jasnejšie vysvetlenie alebo pridávate nový príklad, vaše príspevky pomáhajú ostatným začiatočníkom uspieť.

Vďaka Microsoft Valued Professional [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) za príspevky vo forme ukážok kódu.

Proces prispievania je navrhnutý tak, aby bol prívetivý a podporujúci. Väčšina príspevkov vyžaduje Contributor License Agreement (CLA), no automatizované nástroje vás hladko prevedú procesom.

## 📜 Otvorené vzdelávanie (Open Source Learning)

Celý tento učebný plán je dostupný pod licenciou MIT [LICENSE](../../LICENSE), čo znamená, že ho môžete voľne používať, upravovať a zdieľať. Podporuje to našu misiu sprístupniť poznatky o MCP vývojárom po celom svete.
## 🤝 Pravidlá prispievania

Tento projekt vítá prispievateľov a návrhy. Väčšina príspevkov vyžaduje, aby ste súhlasili s
Contributor License Agreement (CLA), kde potvrdzujete, že máte právo a naozaj udeľujete nám
práva na použitie vášho príspevku. Podrobnosti nájdete na <https://cla.opensource.microsoft.com>.

Keď odošlete pull request, CLA bot automaticky zistí, či musíte poskytnúť
CLA a označí PR príslušne (napr. stavová kontrola, komentár). Stačí sledovať pokyny
poskytnuté botom. Tento proces absolvujete iba raz pre všetky repozitáre používajúce našu CLA.

Tento projekt prijal [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
Pre viac informácií si prečítajte [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) alebo
kontaktujte [opencode@microsoft.com](mailto:opencode@microsoft.com) s ďalšími otázkami alebo pripomienkami.

---

*Ste pripravení začať svoju MCP cestu? Začnite s [Modul 00 - Úvod do MCP](./00-Introduction/README.md) a urobte prvé kroky vo svete vývoja Model Context Protocol!*



## 🎒 Ďalšie kurzy
Náš tím produkuje aj ďalšie kurzy! Pozrite si:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j pre začiatočníkov](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js pre začiatočníkov](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain pre začiatočníkov](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / Agentov
[![AZD pre začiatočníkov](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI pre začiatočníkov](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP pre začiatočníkov](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agentov pre začiatočníkov](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### Séria Generatívnej AI
[![Generatívna AI pre začiatočníkov](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generatívna AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generatívna AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generatívna AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### Základné učenie
[![ML pre začiatočníkov](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Dátová veda pre začiatočníkov](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI pre začiatočníkov](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Kyberbezpečnosť pre začiatočníkov](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![Webový vývoj pre začiatočníkov](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT pre začiatočníkov](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![Vývoj XR pre začiatočníkov](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### Séria Copilot
[![Copilot pre AI párované programovanie](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot pre C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Dobrodružstvo](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->