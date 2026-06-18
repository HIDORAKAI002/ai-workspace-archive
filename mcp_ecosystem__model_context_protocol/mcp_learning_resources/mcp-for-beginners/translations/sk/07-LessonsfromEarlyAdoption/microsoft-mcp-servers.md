# 🚀 10 Microsoft MCP serverov, ktoré menia produktivitu vývojárov

## 🎯 Čo sa v tomto návode naučíte

Tento praktický návod predstavuje desať Microsoft MCP serverov, ktoré aktívne menia spôsob práce vývojárov s AI asistentmi. Namiesto vysvetľovania toho, čo MCP servery *môžu* robiť, vám ukážeme servery, ktoré už majú reálny dopad na denné pracovné postupy vývoja v Microsofte a inde.

Každý server v tomto návode bol vybraný na základe reálneho použitia a spätnej väzby od vývojárov. Objavíte nielen to, čo každý server robí, ale prečo je to dôležité a ako z neho vyťažiť maximum vo vlastných projektoch. Či už ste úplný začiatočník v MCP, alebo chcete rozšíriť existujúce nastavenie, tieto servery predstavujú niektoré z najpraktickejších a najefektívnejších nástrojov dostupných v ekosystéme Microsoftu.

> **💡 Rýchla pomoc na začiatok**
> 
> Ste nováčik v MCP? Nebojte sa! Tento návod je navrhnutý tak, aby bol prístupný pre začiatočníkov. Vysvetlíme si pojmy počas čítania a vždy sa môžete vrátiť k našim modulom [Úvod do MCP](../00-Introduction/README.md) a [Základné koncepty](../01-CoreConcepts/README.md) pre hlbší kontext.

## Prehľad

Tento komplexný návod skúma desať Microsoft MCP serverov, ktoré revolučne menia interakciu vývojárov s AI asistentmi a externými nástrojmi. Od správy Azure zdrojov až po spracovanie dokumentov, tieto servery demonštrujú silu Model Context Protocol pri vytváraní plynulých a produktívnych vývojárskych postupov.

## Ciele učenia

Na konci tohto návodu budú vaše schopnosti:
- Pochopiť, ako MCP servery zvyšujú produktivitu vývojára
- Spoznať najvýznamnejšie implementácie MCP serverov od Microsoftu
- Objaviť praktické použitia každého servera
- Vedieť, ako nastaviť a konfigurovať tieto servery vo VS Code a Visual Studio
- Preskúmať širší ekosystém MCP a jeho budúce smery

## 🔧 Pochopenie MCP serverov: Návod pre začiatočníkov

### Čo sú MCP servery?

Ako začiatočník v Model Context Protocol (MCP) sa možno pýtate: „Čo je to presne MCP server a prečo by mi mal záležať?“ Začnime jednoduchou analógiou.

MCP servery si predstavte ako špecializovaných asistentov, ktorí pomáhajú vášmu AI kódujúcemu spoločníkovi (napríklad GitHub Copilot) pripojiť sa k externým nástrojom a službám. Rovnako ako používate rôzne aplikácie v telefóne na rôzne úlohy – jednu na počasie, jednu na navigáciu, jednu na bankovníctvo – MCP servery dávajú vášmu AI asistentovi schopnosť interagovať s rôznymi vývojárskymi nástrojmi a službami.

### Problém, ktorý MCP servery riešia

Pred MCP servermi, ak ste chceli:
- Skontrolovať svoje Azure zdroje
- Vytvoriť issue na GitHube
- Dotazovať sa do databázy
- Vyhľadávať v dokumentácii

Museli by ste prestať programovať, otvoriť prehliadač, prejsť na vhodnú webovú stránku a ručne tieto úlohy vykonávať. Neustále prepínanie kontextov narúša váš pracovný tok a znižuje produktivitu.

### Ako MCP servery menia váš vývojársky zážitok

S MCP servermi môžete zostať vo svojom vývojárskom prostredí (VS Code, Visual Studio a pod.) a jednoducho požiadať vášho AI asistenta, aby tieto úlohy vykonal. Napríklad:

**Namiesto tradičného postupu:**
1. Prestaň programovať
2. Otvor prehliadač
3. Prejdi na Azure portál
4. Vyhľadaj detaily o úložnom konte
5. Vráť sa do VS Code
6. Pokračuj v programovaní

**Teraz môžete urobiť toto:**
1. Spýtaj sa AI: „Aký je stav mojich Azure úložných kont?“
2. Pokračuj v programovaní s použitím poskytnutých informácií

### Kľúčové výhody pre začiatočníkov

#### 1. 🔄 **Zostaňte vo svojom pracovnom stave**
- Žiadne prepínanie medzi viacerými aplikáciami
- Zamerajte sa na kód, ktorý píšete
- Znížte mentálnu záťaž zo správy rôznych nástrojov

#### 2. 🤖 **Používajte prirodzený jazyk namiesto zložitých príkazov**
- Namiesto zapamätávania SQL syntaxe popíšte, aké údaje potrebujete
- Namiesto pamätania Azure CLI príkazov vysvetlite, čo chcete dosiahnuť
- Nechajte AI, aby zvládlo technické detaily, vy sa venujte logike

#### 3. 🔗 **Prepojte viacero nástrojov dohromady**
- Vytvárajte silné pracovné postupy kombinovaním rôznych služieb
- Príklad: „Získaj všetky nedávne GitHub issue a vytvor súvisiace work itemy v Azure DevOps“
- Budujte automatizáciu bez písania zložitých skriptov

#### 4. 🌐 **Prístup k rozrastajúcemu sa ekosystému**
- Využívajte servery vytvorené Microsoftom, GitHubom a ďalšími spoločnosťami
- Bezproblémovo miešajte a zlučujte nástroje od rôznych dodávateľov
- Pripojte sa k štandardizovanému ekosystému, ktorý funguje s rôznymi AI asistentmi

#### 5. 🛠️ **Učte sa prakticky**
- Začnite s predpripravenými servermi, aby ste pochopili koncepty
- Postupne si budujte vlastné servery, keď sa budete cítiť istejšie
- Používajte dostupné SDK a dokumentáciu na vedenie svojho učenia

### Príklad z praxe pre začiatočníkov

Povedzme, že ste nováčikom vo webovom vývoji a pracujete na svojom prvom projekte. Takto vám MCP servery môžu pomôcť:

**Tradičný prístup:**
```
1. Code a feature
2. Open browser → Navigate to GitHub
3. Create an issue for testing
4. Open another tab → Check Azure docs for deployment
5. Open third tab → Look up database connection examples
6. Return to VS Code
7. Try to remember what you were doing
```

**S MCP servermi:**
```
1. Code a feature
2. Ask AI: "Create a GitHub issue for testing this login feature"
3. Ask AI: "How do I deploy this to Azure according to the docs?"
4. Ask AI: "Show me the best way to connect to my database"
5. Continue coding with all the information you need
```

### Výhoda štandardu pre podniky

MCP sa stáva priemyselným štandardom, čo znamená:
- **Konzistentnosť**: Podobný zážitok naprieč rôznymi nástrojmi a spoločnosťami
- **Interoperabilita**: Servery od rôznych dodávateľov spolupracujú
- **Budúca pripravenosť**: Zručnosti a nastavenia sa prenášajú medzi rôznymi AI asistentmi
- **Komunita**: Veľký ekosystém zdieľaných znalostí a zdrojov

### Začíname: Čo sa naučíte

V tomto návode preskúmame 10 Microsoft MCP serverov, ktoré sú obzvlášť užitočné pre vývojárov na všetkých úrovniach. Každý server je navrhnutý tak, aby:
- Riešil bežné výzvy vo vývoji
- Znižoval opakujúce sa úlohy
- Zlepšoval kvalitu kódu
- Rozvíjal príležitosti na učenie

> **💡 Tip na učenie**
> 
> Ak ste úplný začiatočník v MCP, začnite najskôr s modulmi [Úvod do MCP](../00-Introduction/README.md) a [Základné koncepty](../01-CoreConcepts/README.md). Potom sa tu vráťte a uvidíte, ako tieto koncepty fungujú v praxi s reálnymi Microsoft nástrojmi.
>
> Pre ďalší kontext o význame MCP si pozrite príspevok Marie Naggaga: [Connect Once, Integrate Anywhere with MCP](https://devblogs.microsoft.com/blog/connect-once-integrate-anywhere-with-mcps).

## Začíname s MCP vo VS Code a Visual Studio 🚀

Nastavenie týchto MCP serverov je jednoduché, ak používate Visual Studio Code alebo Visual Studio 2022 s GitHub Copilotom.

### Nastavenie vo VS Code

Základný postup pre VS Code:

1. **Povoľte režim agenta**: Vo VS Code prepnite do režimu agenta v okne Copilot Chat
2. **Konfigurujte MCP servery**: Pridajte konfigurácie serverov do vášho súboru settings.json vo VS Code
3. **Spustite servery**: Kliknite na tlačidlo „Spustiť“ pre každý server, ktorý chcete používať
4. **Vyberte nástroje**: Zvoľte, ktoré MCP servery povolíte v aktuálnej relácii

Podrobné inštrukcie nájdete v [dokumentácii VS Code k MCP](https://code.visualstudio.com/docs/copilot/copilot-mcp).

> **💡 Profesionálny tip: Spravujte MCP servery ako profík!**
> 
> Zobrazenie rozšírení vo VS Code teraz obsahuje [praktické nové používateľské rozhranie na správu nainštalovaných MCP serverov](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-agent-mode)! Máte rýchly prístup na spustenie, zastavenie a správu ktoréhokoľvek nainštalovaného MCP servera cez jasné, jednoduché rozhranie. Vyskúšajte to!

### Nastavenie vo Visual Studio 2022

Pre Visual Studio 2022 (verzia 17.14 alebo novšia):

1. **Povoľte režim agenta**: Kliknite na rozbaľovací zoznam „Spýtať sa“ v okne GitHub Copilot Chat a vyberte „Agent“
2. **Vytvorte konfiguračný súbor**: Vytvorte súbor `.mcp.json` vo vašom adresári riešenia (odporúčaná cesta: `<SOLUTIONDIR>\.mcp.json`)
3. **Konfigurujte servery**: Pridajte konfigurácie MCP serverov podľa štandardného formátu MCP
4. **Schválenie nástrojov**: Ak budete vyzvaní, schváľte nástroje, ktoré chcete používať, spolu s potrebnými povoleniami rozsahu

Podrobné inštrukcie na nastavenie vo Visual Studiu nájdete v [dokumentácii Visual Studio MCP](https://learn.microsoft.com/visualstudio/ide/mcp-servers).

Každý MCP server má svoje špecifické požiadavky na konfiguráciu (reťazce pripojenia, overovanie atď.), no vzor nastavenia je konzistentný v oboch IDE.

## Poučenie z Microsoft MCP serverov 🛠️

### 1. 📚 Microsoft Learn Docs MCP server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Docs_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Docs_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=microsoft.docs.mcp&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Čo robí**: Microsoft Learn Docs MCP server je cloudová služba, ktorá poskytuje AI asistentom prístup v reálnom čase k oficiálnej Microsoft dokumentácii cez Model Context Protocol. Pripája sa na `https://learn.microsoft.com/api/mcp` a umožňuje sémantické vyhľadávanie naprieč Microsoft Learn, dokumentáciou Azure, dokumentáciou Microsoft 365 a ďalšími oficiálnymi zdrojmi od Microsoftu.

**Prečo je užitočný**: Aj keď sa môže zdať, že ide iba o dokumentáciu, tento server je kľúčový pre každého vývojára pracujúceho s technológiami Microsoftu. Jedna z najčastejších sťažností .NET vývojárov na AI kódovacie asistenty je, že nie sú aktuálne s najnovšími vydaniami .NET a C#. Microsoft Learn Docs MCP server toto rieši tým, že poskytuje prístup v reálnom čase k najnovšej dokumentácii, referenciám API a najlepším praktikám. Či už pracujete s najnovšími Azure SDK, skúmate nové funkcie C# 13, alebo implementujete moderné .NET Aspire vzory, tento server zabezpečuje, že váš AI asistent má prístup k autoritatívnym, aktuálnym informáciám potrebným na generovanie presného a moderného kódu.

**Použitie v praxi**: „Aké sú az cli príkazy na vytvorenie Azure container app podľa oficiálnej Microsoft Learn dokumentácie?“ alebo „Ako nakonfigurovať Entity Framework s dependency injection v ASP.NET Core?“ Alebo „Skontroluj tento kód, či zodpovedá odporúčaniam na výkon v Microsoft Learn dokumentácii.“ Server poskytuje komplexné pokrytie Microsoft Learn, Azure docs a Microsoft 365 dokumentácie využitím pokročilého sémantického vyhľadávania na nájdenie najrelevantnejších informácií podľa kontextu. Vráti až 10 vysokokvalitných obsahových blokov s titulmi článkov a URL adresami, vždy pristupujúc k najnovšej dokumentácii Microsoftu ako je publikovaná.

**Ukážkový príklad**: Server poskytuje nástroj `microsoft_docs_search`, ktorý vykonáva sémantické vyhľadávanie v oficiálnej technickej dokumentácii Microsoftu. Po konfigurácii môžete klásť otázky ako „Ako implementovať JWT autentifikáciu v ASP.NET Core?“ a dostať podrobné oficiálne odpovede s odkazmi na zdroje. Kvalita vyhľadávania je výnimočná, pretože rozumie kontextu – dotaz na „kontajnery“ v súvislosti s Azure vráti dokumentáciu Azure Container Instances, zatiaľ čo v .NET kontexte poskytne relevantné informácie o C# kolekciách.

To je obzvlášť užitočné pre rýchlo sa meniace alebo nedávno aktualizované knižnice a použitia. Napríklad v niektorých nedávnych projektoch som chcel využiť funkcie najnovších vydaní .NET Aspire a Microsoft.Extensions.AI. Vďaka zahrnutiu Microsoft Learn Docs MCP servera som mohol využiť nielen API dokumenty, ale aj prechody a návody, ktoré práve boli zverejnené.

> **💡 Profesionálny tip**
> 
> Aj modely s podporou nástrojov potrebujú povzbudenie k používaniu MCP nástrojov! Zvážte pridanie systémovej výzvy alebo [copilot-instructions.md](https://docs.github.com/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot) ako: „Máte prístup k `microsoft.docs.mcp` – použite tento nástroj na vyhľadávanie najnovšej oficiálnej dokumentácie Microsoftu pri riešení otázok o Microsoft technológiách ako C#, Azure, ASP.NET Core alebo Entity Framework.“
>
> Pre skvelý príklad v akcii si pozrite [C# .NET Janitor chat mode](https://github.com/awesome-copilot/chatmodes/blob/main/csharp-dotnet-janitor.chatmode.md) z repozitára Awesome GitHub Copilot. Tento režim špecificky využíva Microsoft Learn Docs MCP server na pomoc s čistením a modernizáciou C# kódu s použitím najnovších vzorov a najlepších praktík.

### 2. ☁️ Azure MCP Server
[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fazure-mcp%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Čo to robí**: Azure MCP Server je komplexná sada viac ako 15 špecializovaných konektorov pre služby Azure, ktoré prinášajú celý ekosystém Azure do vášho AI pracovného toku. Nie je to len jeden server – je to výkonná zbierka, ktorá obsahuje správu zdrojov, pripojenie k databázam (PostgreSQL, SQL Server), analýzu logov Azure Monitor pomocou KQL, integráciu Cosmos DB a mnoho ďalšieho.

**Prečo je to užitočné**: Okrem samotnej správy zdrojov Azure výrazne zlepšuje kvalitu kódu pri práci s Azure SDK. Keď používate Azure MCP v režime Agenta, nepomáha vám len písať kód – pomáha vám písať *lepšie* Azure kódy, ktoré nasledujú aktuálne vzory autentifikácie, najlepšie praktiky spracovania chýb a využívajú najnovšie funkcie SDK. Namiesto generického kódu, ktorý môže fungovať, získate kód, ktorý dodržiava odporúčané vzory Azure pre produkčné nasadenia.

**Kľúčové moduly zahŕňajú**:
- **🗄️ Konektory databáz**: Priamy prístup v prirodzenom jazyku k Azure Database pre PostgreSQL a SQL Server 
- **📊 Azure Monitor**: Analýza logov riadená KQL a operačné prehľady
- **🌐 Správa zdrojov**: Plná správa životného cyklu Azure zdrojov
- **🔐 Autentifikácia**: Vzory DefaultAzureCredential a spravované identity
- **📦 Služby ukladania**: Operácie s Blob Storage, Queue Storage a Table Storage
- **🚀 Služby kontajnerov**: Správa Azure Container Apps, Container Instances a AKS
- **A mnoho ďalších špecializovaných konektorov**

**Reálne použitie**: "Zoznam mojich Azure storage účtov", "Dotaz na moje Log Analytics workspace o chybách za poslednú hodinu" alebo "Pomôž mi zostaviť Azure aplikáciu v Node.js s riadnou autentifikáciou"

**Úplné demo scenárové prevedenie**: Tu je kompletný prehľad, ktorý ukazuje silu spojenia Azure MCP s rozšírením GitHub Copilot pre Azure vo VS Code. Keď máte nainštalované obidve a zadáte:

> "Vytvor Python skript, ktorý nahraje súbor do Azure Blob Storage pomocou autentifikácie DefaultAzureCredential. Skript by sa mal pripojiť k môjmu Azure storage účtu s názvom 'mycompanystorage', nahrať do kontajnera s názvom 'documents', vytvoriť testovací súbor s aktuálnym časovým údajom na nahranie, správne spracovať chyby a poskytnúť informatívny výstup, nasledovať najlepšie praktiky Azure pre autentifikáciu a spracovanie chýb, obsahovať komentáre vysvetľujúce, ako funguje autentifikácia DefaultAzureCredential, a urobiť skript dobre štruktúrovaný s riadnymi funkciami a dokumentáciou."

Azure MCP Server vygeneruje kompletný produkčne pripravený Python skript, ktorý:
- Používa najnovší Azure Blob Storage SDK s korektnými asynchrónnymi vzormi
- Implementuje DefaultAzureCredential so komplexným vysvetlením záložného reťazca
- Obsahuje robustné spracovanie chýb so špecifickými typmi výnimiek Azure
- Nasleduje najlepšie praktiky Azure SDK pre správu zdrojov a spracovanie pripojení
- Poskytuje podrobné logovanie a informatívny výstup na konzolu
- Vytvára správne štruktúrovaný skript s funkciami, dokumentáciou a typovými anotáciami

Čo je pozoruhodné, je fakt, že bez Azure MCP by ste dostali generický blob storage kód, ktorý síce funguje, ale nesleduje súčasné Azure vzory. S Azure MCP získate kód, ktorý využíva najnovšie metódy autentifikácie, spracúva špecifické scenáre chýb Azure a dodržiava odporúčania Microsoftu pre produkčné aplikácie.

**Ukážkový príklad**: Mal som problém zapamätať si konkrétne príkazy pre CLI `az` a `azd` na ad hoc použitie. Vždy to bola pre mňa dvojkroková operácia: najskôr nájsť syntax, potom spustiť príkaz. Často som rovno vstúpil do portálu a klikal, aby som prácu dokončil, pretože som nechcel priznať, že si syntax CLI nepamätám. Možnosť jednoducho popísať, čo chcem, je úžasná, a ešte lepšie je, že to môžem robiť bez opustenia svojho IDE!

Skvelý zoznam prípadov použitia nájdete v [Azure MCP repozitári](https://github.com/Azure/azure-mcp?tab=readme-ov-file#-what-can-you-do-with-the-azure-mcp-server), ktorý vám pomôže začať. Pre komplexné návody na nastavenie a pokročilé možnosti konfigurácie si pozrite [oficiálnu dokumentáciu Azure MCP](https://learn.microsoft.com/azure/developer/azure-mcp-server/).

### 3. 🐙 GitHub MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=github&config=%7B%22type%22%3A%20%22http%22%2C%22url%22%3A%20%22https%3A%2F%2Fapi.githubcopilot.com%2Fmcp%2F%22%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/github/github-mcp-server)

**Čo to robí**: Oficiálny GitHub MCP Server poskytuje bezproblémovú integráciu s celým ekosystémom GitHub, ponúkajúc hosťovaný vzdialený prístup aj možnosť miestneho nasadenia cez Docker. Nie je to len o základných operáciách s repozitármi – ide o komplexný nástroj zahŕňajúci správu GitHub Actions, pracovné postupy pull requestov, správu issues, bezpečnostné skenovanie, notifikácie a pokročilú automatizáciu.

**Prečo je to užitočné**: Tento server transformuje spôsob, akým interagujete s GitHubom tým, že plný zážitok z platformy priamo prináša do vášho vývojového prostredia. Namiesto neustáleho prepínania medzi VS Code a GitHub.com pre správu projektov, revízie kódu a sledovanie CI/CD, môžete všetko riešiť pomocou príkazov v prirodzenom jazyku a pritom zostať sústredení na kód.

> **ℹ️ Poznámka: Rôzne typy 'Agentov'**
> 
> Nezamieňajte si tento GitHub MCP Server s GitHub Coding Agentom (AI agentom, ktorému môžete priradiť issues na automatizované kódovanie). GitHub MCP Server pracuje v režime Agenta vo VS Code na poskytovanie integrácie GitHub API, zatiaľ čo GitHub Coding Agent je samostatná funkcia, ktorá vytvára pull requesty pri priradení k GitHub issues.

**Kľúčové možnosti zahŕňajú**:
- **⚙️ GitHub Actions**: Kompletná správa CI/CD pipeline, monitorovanie pracovných postupov a správa artefaktov
- **🔀 Pull Requests**: Vytváranie, revízia, zlúčenie a správa PRs s úplným sledovaním stavu
- **🐛 Issues**: Plná správa životného cyklu issues, komentovanie, označovanie a priraďovanie
- **🔒 Bezpečnosť**: Výstrahy kódu, detekcia tajomstiev a integrácia Dependabot
- **🔔 Notifikácie**: Inteligentné riadenie notifikácií a kontrola prihlásení do repozitárov
- **📁 Správa repozitárov**: Operácie so súbormi, správa branchov a administrácia repozitárov
- **👥 Spolupráca**: Vyhľadávanie používateľov a organizácií, správa tímov a kontrola prístupu

**Reálne použitie**: "Vytvor pull request z mojej features branch", "Ukáž mi všetky neúspešné CI behy tento týždeň", "Zoznam otvorených bezpečnostných upozornení pre moje repozitáre" alebo "Nájdi všetky issues, ktoré mám priradené v rámci mojich organizácií"

**Úplné demo scenárové prevedenie**: Tu je výkonný pracovný postup, ktorý ukazuje schopnosti GitHub MCP Servera:

> "Musím sa pripraviť na náš sprint review. Ukáž mi všetky pull requesty, ktoré som vytvoril tento týždeň, skontroluj stav našich CI/CD pipeline, vytvor súhrn bezpečnostných upozornení, ktoré treba riešiť, a pomôž mi zostaviť release notes na základe zlúčených PR s označením 'feature'."

GitHub MCP Server:
- Vyhľadá vaše nedávne pull requesty s podrobnými informáciami o stave
- Analyzuje behy pracovných postupov a zdôrazní prípadné zlyhania alebo problémy s výkonom
- Zostaví výsledky bezpečnostného skenovania a priorituje kritické upozornenia
- Vygeneruje komplexné release notes extrahovaním informácií zo zlúčených PR
- Poskytne konkrétne ďalšie kroky pre plánovanie sprintu a prípravu vydania

**Ukážkový príklad**: Rád to používam na pracovné postupy pre revíziu kódu. Namiesto prepínania medzi VS Code, GitHub notifikáciami a stránkami pull requestov môžem povedať "Ukáž mi všetky PR, ktoré čakajú na moju revíziu" a potom "Pridaj komentár k PR #123 ohľadom spracovania chýb v autentifikačnej metóde." Server spracuje volania na GitHub API, udržiava kontext diskusie a ešte mi pomáha zostaviť konštruktívnejšie komentáre na revíziu.

**Možnosti autentifikácie**: Server podporuje OAuth (bezproblémovo vo VS Code) aj Personal Access Tokens, s konfigurovateľnými nástrojmi na povolenie len potrebnej GitHub funkcionality. Môžete ho spustiť ako vzdialenú hosťovanú službu pre rýchle nastavenie alebo lokálne cez Docker pre úplnú kontrolu.

> **💡 Profesionálny tip**
> 
> Povoľte len tie nástrojové sady, ktoré potrebujete, pomocou parametra `--toolsets` v nastaveniach MCP servera na zníženie veľkosti kontextu a zlepšenie výberu AI nástrojov. Napríklad pridajte `"--toolsets", "repos,issues,pull_requests,actions"` do argumentov konfigurácie MCP pre základné vývojové pracovné postupy, alebo použite `"--toolsets", "notifications, security"`, ak chcete primárne monitorovať GitHub.

### 4. 🔄 Azure DevOps MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Azure_DevOps_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Azure_DevOps_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20DevOps%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-azure-devops%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/azure-devops-mcp)

**Čo to robí**: Pripája sa ku službám Azure DevOps pre komplexnú správu projektov, sledovanie pracovných položiek, správu build pipeline a operácie s repozitármi.

**Prečo je to užitočné**: Pre tímy používajúce Azure DevOps ako primárnu DevOps platformu tento MCP server eliminuje neustále prepínanie medzi vývojovým prostredím a webovým rozhraním Azure DevOps. Môžete spravovať pracovné položky, kontrolovať stavy buildov, dotazovať repozitáre a riešiť úlohy projektového manažmentu priamo z vášho AI asistenta.

**Reálne použitie**: "Ukáž mi všetky aktívne pracovné položky v aktuálnom sprinte pre projekt WebApp", "Vytvor hlásenie o chybe pre problém s loginom, ktorý som práve našiel" alebo "Skontroluj stav našich build pipeline a ukáž mi posledné zlyhania"

**Ukážkový príklad**: Jednoducho môžete skontrolovať status aktuálneho sprintu vášho tímu jednoduchou otázkou ako "Ukáž mi všetky aktívne pracovné položky v aktuálnom sprinte pre projekt WebApp" alebo "Vytvor hlásenie o chybe pre problém s loginom, ktorý som práve našiel" bez opustenia vývojového prostredia.

### 5. 📝 MarkItDown MCP Server
[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_MarkItDown_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_MarkItDown_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=MarkItDown%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-markitdown%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/markitdown)

**Čo to robí**: MarkItDown je komplexný server na konverziu dokumentov, ktorý premení rôzne formáty súborov na kvalitný Markdown optimalizovaný pre spracovanie LLM a pracovné postupy analýzy textu.

**Prečo je to užitočné**: Nevyhnutnosť pre moderné pracovné postupy dokumentácie! MarkItDown zvláda širokú škálu formátov súborov a pritom zachováva kritickú štruktúru dokumentu, ako sú nadpisy, zoznamy, tabuľky a odkazy. Na rozdiel od jednoduchých nástrojov na extrakciu textu sa zameriava na zachovanie sémantického významu a formátovania, ktoré je cenné pre spracovanie AI aj pre ľudskú čitateľnosť.

**Podporované formáty súborov**:
- **Kancelárske dokumenty**: PDF, PowerPoint (PPTX), Word (DOCX), Excel (XLSX/XLS)
- **Mediálne súbory**: Obrázky (s EXIF metadátami a OCR), Audio (s EXIF metadátami a prepisom reči)
- **Webový obsah**: HTML, RSS kanály, URL YouTube, stránky Wikipédie
- **Dátové formáty**: CSV, JSON, XML, ZIP súbory (rekurzívne spracováva obsah)
- **Publikačné formáty**: EPub, Jupyter notebooky (.ipynb)
- **Email**: Outlook správy (.msg)
- **Pokročilé**: Integrácia Azure Document Intelligence pre vylepšené spracovanie PDF

**Pokročilé možnosti**: MarkItDown podporuje popisy obrázkov poháňané LLM (keď je dostupný OpenAI klient), Azure Document Intelligence pre vylepšené spracovanie PDF, prepis audia pre hlasový obsah a systém doplnkov na rozšírenie o ďalšie formáty súborov.

**Reálne použitie**: „Preveďte túto prezentáciu PowerPoint do Markdown pre náš dokumentačný web“, „Extrahujte text z tohto PDF so správnou štruktúrou nadpisov“ alebo „Transformujte tento Excelový zošit do čitateľného formátu tabuľky“

**Ukážka zo zdrojov**: Citát z [MarkItDown dokumentácie](https://github.com/microsoft/markitdown#why-markdown):

> Markdown je mimoriadne blízky obyčajnému textu, s minimálnym značením alebo formátovaním, no pritom poskytuje spôsob, ako reprezentovať dôležitú štruktúru dokumentu. Hlavné LLM, ako napríklad OpenAI GPT-4o, nativne „rozprávajú“ Markdown a často ho do svojich odpovedí bez výzvy zahrnú. To naznačuje, že boli trénované na obrovskom množstve textu formátovaného v Markdowne a dobre ho rozumejú. Ako vedľajší efekt sú Markdown konvencie veľmi úsporné na tokeny.

MarkItDown je naozaj dobrý v zachovaní štruktúry dokumentu, čo je dôležité pre AI pracovné postupy. Napríklad pri konverzii prezentácie PowerPoint zachováva organizáciu snímok s vhodnými nadpismi, vyťahuje tabuľky ako Markdown tabuľky, pridáva alternatívny text pre obrázky a dokonca spracúva poznámky rečníka. Grafy sa premieňajú na čitateľné dátové tabuľky a výsledný Markdown si udržiava logický tok pôvodnej prezentácie. Vďaka tomu je ideálny na napájanie prezentačného obsahu do AI systémov alebo na tvorbu dokumentácie z existujúcich snímok.
### 6. 🗃️ SQL Server MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_SQL_Database-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_SQL_Database-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20SQL%20Database&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40azure%2Fmcp%40latest%22%2C%22server%22%2C%22start%22%2C%22--namespace%22%2C%22sql%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Azure/azure-mcp)

**Čo to robí**: Poskytuje konverzačný prístup k SQL Server databázam (on-premises, Azure SQL alebo Fabric)

**Prečo je to užitočné**: Podobné ako PostgreSQL server, ale pre Microsoft SQL ekosystém. Pripojte sa jednoduchým pripojovacím reťazcom a začnite dopytovať v prirodzenom jazyku – bez zbytočného prepínania kontextu!

**Reálne použitie**: „Nájdite všetky objednávky, ktoré neboli splnené za posledných 30 dní“ sa preloží do správnych SQL dotazov a vráti formátované výsledky

**Ukážka zo zdrojov**: Keď si nastavíte pripojenie k databáze, môžete hneď začať viesť rozhovory s vašimi dátami. Blogový príspevok to demonštruje jednoduchou otázkou: „Na ktorú databázu ste pripojení?“ MCP server odpovie vyvolaním príslušného databázového nástroja, pripojí sa k vašej inštancii SQL Servera a vráti informácie o aktuálnom pripojení — to všetko bez jediného riadku SQL. Server podporuje komplexné databázové operácie od správy schém až po manipuláciu s dátami, všetko cez prirodzené jazykové príkazy. Pre kompletné inštalačné a konfiguračné príklady so VS Code a Claude Desktop si pozrite: [Introducing MSSQL MCP Server (Preview)](https://devblogs.microsoft.com/azure-sql/introducing-mssql-mcp-server/).


### 7. 🎭 Playwright MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Playwright_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Playwright_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Playwright%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-playwright%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/playwright-mcp)

**Čo to robí**: Umožňuje AI agentom interagovať s webovými stránkami na testovanie a automatizáciu

> **ℹ️ Poháňa GitHub Copilot**
> 
> Playwright MCP Server poháňa Coding Agenta GitHub Copilota, ktorý tak získava schopnosti prehliadania webu! [Viac o tejto funkcii](https://github.blog/changelog/2025-07-02-copilot-coding-agent-now-has-its-own-web-browser/).

**Prečo je to užitočné**: Perfektné pre automatizované testy riadené popisom v prirodzenom jazyku. AI môže prehliadať webové stránky, vypĺňať formuláre a extrahovať dáta cez štruktúrované prístupové snímky – to je neuveriteľne silná funkcia!

**Reálne použitie**: „Otestuj prihlasovací proces a over, že sa dashboard načíta správne“ alebo „Vygeneruj test, ktorý vyhľadá produkty a overí stránku s výsledkami“ – všetko bez potreby zdrojového kódu aplikácie

**Ukážka zo zdrojov**: Moja kolegyňa Debbie O'Brien v poslednej dobe odviedla úžasnú prácu s Playwright MCP Serverom! Napríklad nedávno ukázala, ako môžete generovať kompletné Playwright testy bez prístupu k zdrojovému kódu aplikácie. V jej scenári požiadala Copilota o vytvorenie testu pre aplikáciu na vyhľadávanie filmov: prejsť na stránku, vyhľadať „Garfield“ a overiť, že sa film zobrazil vo výsledkoch. MCP otvoril reláciu prehliadača, preskúmal štruktúru stránky pomocou DOM snímok, našiel správne selektory a vygeneroval plne funkčný test v TypeScripte, ktorý prešiel na prvý pokus.

Čo robí toto naozaj silným, je to, že premostuje priepasť medzi inštrukciami v prirodzenom jazyku a spustiteľným testovacím kódom. Tradičné prístupy vyžadujú buď manuálne písanie testov, alebo prístup k zdrojovému kódu. S Playwright MCP však môžete testovať externé stránky, klientské aplikácie alebo pracovať v black-box testovacích scenároch, kde prístup ku kódu nie je k dispozícii.


### 8. 💻 Dev Box MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Dev_Box_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Dev_Box_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Dev%20Box%20MCP&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40microsoft%2Fmcp-devbox%40latest%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/microsoft/mcp)

**Čo to robí**: Spravuje prostredia Microsoft Dev Box cez prirodzený jazyk

**Prečo je to užitočné**: Veľmi zjednodušuje správu vývojových prostredí! Vytvárajte, konfigurujte a spravujte vývojové prostredia bez nutnosti si pamätať špecifické príkazy.

**Reálne použitie**: „Nastav nový Dev Box s najnovším .NET SDK a nakonfiguruj ho pre náš projekt“, „Skontroluj stav všetkých mojich vývojových prostredí“ alebo „Vytvor štandardizované demo prostredie pre naše tímové prezentácie“

**Ukážka zo zdrojov**: Som veľký fanúšik používania Dev Boxu na osobný vývoj. Môj moment prekvapenia nastal, keď James Montemagno vysvetlil, že Dev Box je skvelý pre konferenčné demo, pretože má superrýchle ethernetové pripojenie bez ohľadu na konferenciu / hotel / wifi v lietadle, ktorú práve používam. Dokonca som nedávno robil konferenčné demo cvičenia, zatiaľ čo môj laptop bol cez tethering pripojený k hotspotu mobilu a ja som cestoval autobusom z Brugge do Antwerp! Môj ďalší krok je hlbšie sa venovať správe viacerých vývojových prostredí a štandardizovaných demo prostredí pre tím. Ďalšie významné prípady použitia, ktoré počujem od zákazníkov a kolegov, sú predkonfigurované vývojové prostredia. V oboch prípadoch použitie MCP na konfiguráciu a správu Dev Boxov umožňuje interakciu v prirodzenom jazyku a pritom zostať vo vývojovom prostredí.

### 9. 🤖 Microsoft Foundry MCP Server
[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_Microsoft_Foundry_MCP-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Microsoft_Foundry_MCP-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=Azure%20Foundry%20MCP%20Server&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--prerelease%3Dallow%22%2C%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fazure-ai-foundry%2Fmcp-foundry.git%22%2C%22run-azure-ai-foundry-mcp%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/azure-ai-foundry/mcp-foundry)

**Čo to robí**: Microsoft Foundry MCP Server poskytuje vývojárom komplexný prístup k ekosystému Azure AI, vrátane katalógov modelov, správy nasadení, indexovania znalostí s Azure AI Search a nástrojov na hodnotenie. Tento experimentálny server prepadáva priepasť medzi vývojom AI a výkonnou AI infraštruktúrou Azure, čím uľahčuje budovanie, nasadzovanie a hodnotenie AI aplikácií.

**Prečo je užitočný**: Tento server mení spôsob, akým pracujete so službami Azure AI, tým, že prináša špičkové možnosti AI priamo do vášho vývojového pracovného toku. Namiesto prepínania medzi portálom Azure, dokumentáciou a IDE môžete objavovať modely, nasadzovať služby, spravovať databázy znalostí a hodnotiť výkonnosť AI pomocou príkazov v prirodzenom jazyku. Je obzvlášť silný pre vývojárov, ktorí vytvárajú aplikácie RAG (Retrieval-Augmented Generation), spravujú viacero modelov či implementujú komplexné AI hodnotiace procesy.

**Kľúčové schopnosti pre vývojárov**:
- **🔍 Objavovanie a nasadzovanie modelov**: Preskúmajte katalóg modelov Microsoft Foundry, získajte podrobné informácie o modeloch s ukážkami kódu a nasadzujte modely do Azure AI služieb
- **📚 Správa znalostí**: Vytvárajte a spravujte indexy v Azure AI Search, pridávajte dokumenty, konfigurujte indexery a budujte sofistikované RAG systémy
- **⚡ Integrácia AI agentov**: Pripojte sa k Azure AI agentom, dopytujte existujúcich agentov a vyhodnocujte ich výkonnosť v produkčných scénach
- **📊 Hodnotiaci rámec**: Spúšťajte komplexné hodnotenia textov a agentov, generujte markdownové správy a implementujte kontrolu kvality AI aplikácií
- **🚀 Nástroje pre prototypovanie**: Získajte inštrukcie pre nastavenie prototypovania cez GitHub a prístup k Microsoft Foundry Labs pre najmodernejšie výskumné modely

**Použitie v praxi pre vývojárov**: „Nasadiť model Phi-4 do Azure AI služieb pre moju aplikáciu“, „Vytvoriť nový vyhľadávací index pre môj dokumentačný RAG systém“, „Vyhodnotiť odpovede môjho agenta podľa kvalitatívnych metrík“ alebo „Nájsť najlepší model na uvažovanie pre moje komplexné analytické úlohy“

**Plná demo situácia**: Tu je silný pracovný tok pre vývoj AI:

> „Vytváram agenta zákazníckej podpory. Pomôž mi nájsť dobrý model na uvažovanie z katalógu, nasadiť ho do Azure AI služieb, vytvoriť databázu znalostí z našej dokumentácie, nastaviť hodnotiaci rámec na testovanie kvality odpovedí a potom mi pomôž s prototypovaním integrácie pomocou GitHub tokenu na testovanie.“

Microsoft Foundry MCP Server:
- Dotáže katalóg modelov, aby odporučil optimálne modely na uvažovanie podľa vašich požiadaviek
- Poskytne príkazy na nasadenie a informácie o kvótach pre vašu preferovanú oblasť Azure
- Nastaví Azure AI Search indexy so správnym schémou pre vašu dokumentáciu
- Nastaví hodnotiace pipeline s kvalitatívnymi metrikami a bezpečnostnými kontrolami
- Vygeneruje prototypovací kód s autentifikáciou GitHub na okamžité testovanie
- Poskytne komplexné návody na nastavenie prispôsobené vašej technológii

**Ukážkový príklad**: Ako vývojár som mal problém držať krok s rôznymi dostupnými modelmi LLM. Poznám niekoľko hlavných, ale mal som pocit, že mi unikajú niektoré zisky v produktivite a efektívnosti. Tokeny a kvóty sú stresujúce a ťažké na správu – nikdy neviem, či vyberám správny model pre danú úlohu alebo či pálim rozpočet neefektívne. Práve som počul o tomto MCP Serveri od Jamesa Montemagna, keď som zisťoval odporúčania pre MCP Servery kvôli tomuto článku, a teším sa, že ho začnem používať! Schopnosti objavovania modelov vyzerajú obzvlášť impozantne pre niekoho ako ja, kto chce preskúmať viac než obvyklé modely a nájsť tie, ktoré sú optimalizované na konkrétne úlohy. Hodnotiaci rámec by mi mal pomôcť overiť, že skutočne dosahujem lepšie výsledky, nie len že skúšam niečo nové len pre skúšanie.

> **ℹ️ Experimentálny stav**
> 
> Tento MCP server je experimentálny a je aktívne vyvíjaný. Funkcie a API sa môžu meniť. Ideálny na skúmanie možností Azure AI a tvorbu prototypov, ale pred použitím v produkcii zvážte stabilitu.
### 10. 🏢 Microsoft 365 Agents Toolkit MCP Server

[![Inštalovať vo VS Code](https://img.shields.io/badge/VS_Code-Install_M365_Agents_Toolkit-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D) [![Inštalovať vo VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_M365_Agents_Toolkit-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=M365AgentsToolkit%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@microsoft%2Fm365agentstoolkit-mcp%40latest%22%2C%22server%22%2C%22start%22%5D%7D&quality=insiders) [![GitHub](https://img.shields.io/badge/GitHub-View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/OfficeDev/microsoft-365-agents-toolkit)

**Čo to robí**: Poskytuje vývojárom základné nástroje na tvorbu AI agentov a aplikácií, ktoré sa integrujú s Microsoft 365 a Microsoft 365 Copilot, vrátane validácie schém, získavania ukážkového kódu a pomoci pri riešení problémov.

**Prečo je užitočný**: Vývoj pre Microsoft 365 a Copilot zahŕňa zložité schémy manifestov a špecifické vývojové vzory. Tento MCP server prináša základné vývojové zdroje priamo do vášho kódovacieho prostredia, čo vám pomáha validovať schémy, nájsť ukážkový kód a riešiť bežné problémy bez neustáleho prezerania dokumentácie.

**Praktické použitie**: „Validuj môj deklaratívny manifest agenta a oprav chyby v schéme“, „Ukáž mi príklad kódu na implementáciu pluginu Microsoft Graph API“ alebo „Pomôž mi riešiť problémy s autentifikáciou mojej Teams aplikácie“

**Ukážkový príklad**: Oslovil som svojho priateľa Johna Millera po rozhovore na Build o M365 Agents a odporučil mi tento MCP. Môže byť skvelý pre vývojárov, ktorí sú s M365 Agents noví, pretože poskytuje šablóny, ukážkový kód a kostru na rýchly štart bez topenia sa v dokumentácii. Funkcie validácie schémy vyzerajú obzvlášť užitočne, aby sa zabránilo chybám vo štruktúre manifestu, ktoré môžu spôsobiť hodiny ladenia.

> **💡 Tip**
> 
> Používajte tento server spolu s Microsoft Learn Docs MCP Serverom pre komplexnú podporu vývoja M365 – jeden poskytuje oficiálnu dokumentáciu, zatiaľ čo tento praktické vývojové nástroje a pomoc pri riešení problémov.


## Čo ďalej? 🔮

## 📋 Záver

Model Context Protocol (MCP) mení spôsob, akým vývojári komunikujú s AI asistentmi a externými nástrojmi. Týchto 10 Microsoft MCP serverov demonštruje silu štandardizovanej AI integrácie, ktorá umožňuje plynulé pracovné postupy, ktoré udržujú vývojárov sústredených a zároveň im sprístupňujú výkonné externé možnosti.

Od komplexnej integrácie ekosystému Azure po špecializované nástroje ako Playwright pre automatizáciu prehliadača a MarkItDown pre spracovanie dokumentov, tieto servery ukazujú, ako MCP dokáže zvýšiť produktivitu naprieč rôznymi vývojovými scenármi. Štandardizovaný protokol zaisťuje, že tieto nástroje spolupracujú bez problémov a vytvárajú jednotný vývojový zážitok.

Ako sa ekosystém MCP vyvíja, bude kľúčové zostať aktívny v komunite, skúmať nové servery a vytvárať vlastné riešenia na maximálne zvýšenie vývojovej produktivity. Otvorená štandardná povaha MCP znamená, že môžete kombinovať nástroje od rôznych dodávateľov a vytvoriť si ideálny pracovný tok pre vaše konkrétne potreby.

## 🔗 Ďalšie zdroje

- [Oficiálne Microsoft MCP úložisko](https://github.com/microsoft/mcp)
- [MCP komunita a dokumentácia](https://modelcontextprotocol.io/introduction)
- [VS Code MCP dokumentácia](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [Visual Studio MCP dokumentácia](https://learn.microsoft.com/visualstudio/ide/mcp-servers)
- [Azure MCP dokumentácia](https://learn.microsoft.com/azure/developer/azure-mcp-server/)
- [Let's Learn – MCP eventy](https://techcommunity.microsoft.com/blog/azuredevcommunityblog/lets-learn---mcp-events-a-beginners-guide-to-the-model-context-protocol/4429023)
- [Skvelé prispôsobenia GitHub Copilot](https://github.com/awesome-copilot)
- [C# MCP SDK](https://developer.microsoft.com/blog/microsoft-partners-with-anthropic-to-create-official-c-sdk-for-model-context-protocol)
- [MCP Dev Days Live 29./30. júla alebo pozrieť na požiadanie](https://aka.ms/mcpdevdays)

## 🎯 Cvičenia

1. **Inštalácia a konfigurácia**: Nainštalujte jeden z MCP serverov vo vašom VS Code prostredí a otestujte základné funkcie.
2. **Integrácia pracovného toku**: Navrhnite vývojový pracovný tok, ktorý kombinuje aspoň tri rôzne MCP servery.
3. **Plánovanie vlastného servera**: Identifikujte úlohu vo vašom každodennom vývojovom režime, ktorá by mohla profitovať z vlastného MCP servera, a vytvorte jej špecifikáciu.
4. **Analýza výkonu**: Porovnajte efektivitu použitia MCP serverov oproti tradičným prístupom pri bežných vývojových úlohách.
5. **Bezpečnostné hodnotenie**: Zhodnoťte bezpečnostné dopady používania MCP serverov vo vašom vývojovom prostredí a navrhnite najlepšie praktiky.


Ďalej:[Najlepšie postupy](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->