# Prípadová štúdia: Azure AI Travel Agents – Referenčná implementácia

## Prehľad

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) je komplexné referenčné riešenie vyvinuté spoločnosťou Microsoft, ktoré demonštruje, ako vybudovať viacagentnú aplikáciu na plánovanie ciest pomocou umelej inteligencie využívajúcu Model Context Protocol (MCP), Azure OpenAI a Azure AI Search. Tento projekt ukazuje najlepšie postupy pri orchestrácií viacerých AI agentov, integrácii podnikových dát a poskytuje bezpečnú, rozšíriteľnú platformu pre reálne scenáre.

## Kľúčové vlastnosti
- **Viacagentná orchestrácia:** Využíva MCP na koordináciu špecializovaných agentov (napr. agent pre lety, hotely a itineráre), ktorí spolupracujú pri napĺňaní komplexných úloh plánovania ciest.
- **Integrácia podnikových dát:** Pripája sa k Azure AI Search a ďalším podnikovým dátovým zdrojom, aby poskytol aktuálne a relevantné informácie pre odporúčania pri cestovaní.
- **Bezpečná, škálovateľná architektúra:** Využíva Azure služby pre autentifikáciu, autorizáciu a škálovateľné nasadzovanie podľa najlepších bezpečnostných postupov podnikov.
- **Rozšíriteľné nástroje:** Implementuje znovupoužiteľné MCP nástroje a šablóny promptov, čo umožňuje rýchle prispôsobenie novým doménam alebo obchodným požiadavkám.
- **Používateľský zážitok:** Poskytuje konverzačné rozhranie, cez ktoré môžu používatelia komunikovať s cestovnými agentmi, podporené Azure OpenAI a MCP.

## Architektúra
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Popis architektonického diagramu

Riešenie Azure AI Travel Agents je navrhnuté na modularitu, škálovateľnosť a bezpečnú integráciu viacerých AI agentov a podnikových dátových zdrojov. Hlavné komponenty a tok dát sú nasledovné:

- **Používateľské rozhranie:** Používatelia komunikujú so systémom cez konverzačné UI (napríklad webový chat alebo bot v Teams), ktorý odosiela používateľské dotazy a prijíma odporúčania pre cestovanie.
- **MCP Server:** Slúži ako centrálny orchestrátor, prijíma vstupy od používateľa, spravuje kontext a koordinuje akcie špecializovaných agentov (napr. FlightAgent, HotelAgent, ItineraryAgent) prostredníctvom Model Context Protocol.
- **AI agenti:** Každý agent zodpovedá za špecifickú doménu (lety, hotely, itineráre) a je implementovaný ako MCP nástroj. Agent využíva šablóny promptov a logiku na spracovanie požiadaviek a generovanie odpovedí.
- **Azure OpenAI služba:** Poskytuje pokročilé porozumenie prirodzenému jazyku a jeho generovanie, čo umožňuje agentom interpretovať úmysel používateľa a vytvárať konverzačné odpovede.
- **Azure AI Search a podnikové dáta:** Agenti získavajú aktuálne informácie o letoch, hoteloch a možnostiach cestovania z Azure AI Search a ďalších podnikovým zdrojov.
- **Autentifikácia a bezpečnosť:** Integruje sa s Microsoft Entra ID pre bezpečnú autentifikáciu a uplatňuje princíp minimálnych práv pre prístup ku všetkým zdrojom.
- **Nasadenie:** Navrhnuté pre nasadenie na Azure Container Apps so zabezpečením škálovateľnosti, monitorovania a prevádzkovej efektivity.

Táto architektúra umožňuje plynulú orchestráciu viacerých AI agentov, bezpečnú integráciu s podnikovýdmi dátami a robustnú, rozšíriteľnú platformu na tvorbu doménovo špecifických AI riešení.

## Podrobný popis architektonického diagramu krok za krokom
Predstavte si, že plánujete veľkú cestu a máte tím odborných asistentov, ktorí vám pomáhajú so všetkými detailmi. Systém Azure AI Travel Agents funguje podobne, využíva rôzne časti (ako členov tímu), z ktorých každý má špeciálnu úlohu. Takto to všetko zapadá:

### Používateľské rozhranie (UI):
Predstavte si to ako recepciu vášho cestovného agenta. Tu vy (používateľ) kladiete otázky alebo podávate požiadavky, napríklad „Nájdi mi let do Paríža.“ Môže to byť chatové okno na webovej stránke alebo v správcovskej aplikácii.

### MCP Server (Koordinátor):
MCP Server je ako manažér, ktorý počúva vašu požiadavku na recepcii a rozhodne, ktorý špecialista by mal riešiť danú časť. Sleduje priebeh vašej konverzácie a zabezpečuje, aby všetko prebiehalo hladko.

### AI agenti (Špecializovaní asistenti):
Každý agent je odborník v určitej oblasti – jeden vie všetko o letoch, iný o hoteloch a ďalší o plánovaní itinerára. Keď požiadate o cestu, MCP Server posiela vašu požiadavku správnym agentom. Tí používajú svoje vedomosti a nástroje, aby našli najlepšie možnosti pre vás.

### Azure OpenAI služba (Jazykový expert):
Je to ako mať jazykového experta, ktorý presne rozumie tomu, čo sa pýtate, bez ohľadu na to, ako to formulujete. Pomáha agentom pochopiť vaše požiadavky a odpovedať prirodzeným konverzačným jazykom.

### Azure AI Search a podnikové dáta (Informačná knižnica):
Predstavte si obrovskú, aktuálnu knižnicu so všetkými najnovšími cestovnými informáciami – letové poriadky, dostupnosť hotelov a ďalšie. Agenti prehľadávajú túto knižnicu, aby vám poskytli najpresnejšie odpovede.

### Autentifikácia a bezpečnosť (Bezpečnostná služba):
Rovnako ako bezpečnostná služba kontroluje, kto môže vstúpiť do určitých oblastí, táto časť zabezpečuje, že len autorizované osoby a agenti majú prístup k citlivým informáciám. Chráni vaše údaje a súkromie.

### Nasadenie na Azure Container Apps (Budova):
Všetci títo asistenti a nástroje spolupracujú v bezpečnej, škálovateľnej budove (cloude). To znamená, že systém zvládne veľa používateľov naraz a je vždy k dispozícii, keď ho potrebujete.

## Ako to všetko spolu funguje:

Začnete tým, že na recepcii (UI) položíte otázku.  
Manažér (MCP Server) zistí, ktorý špecialista (agent) vám má pomôcť.  
Špecialista využije jazykového experta (OpenAI), aby pochopil vašu požiadavku, a knižnicu (AI Search), aby našiel najlepšiu odpoveď.  
Bezpečnostná služba (Autentifikácia) zabezpečí, že je všetko v poriadku.  
To všetko sa deje v spoľahlivej, škálovateľnej budove (Azure Container Apps), takže váš zážitok je plynulý a bezpečný.  
Táto tímová práca umožňuje systému rýchlo a bezpečne vám pomôcť naplánovať vašu cestu, presne ako tím odborných cestovných agentov pracujúcich spoločne v modernom kancelárskom prostredí!

## Technická implementácia
- **MCP Server:** Hostuje základnú orchestráciu, poskytuje nástroje agentov a spravuje kontext pre viackrokové pracovné postupy plánovania cesty.
- **Agenti:** Každý agent (napr. FlightAgent, HotelAgent) je implementovaný ako MCP nástroj so svojimi vlastnými šablónami promptov a logikou.
- **Integrácia s Azure:** Využíva Azure OpenAI na porozumenie prirodzenému jazyku a Azure AI Search na získavanie dát.
- **Bezpečnosť:** Integruje sa s Microsoft Entra ID pre autentifikáciu a uplatňuje princíp minimálnych práv pre prístup ku všetkým zdrojom.
- **Nasadenie:** Podporuje nasadenie na Azure Container Apps pre škálovateľnosť a prevádzkovú efektivitu.

## Výsledky a dopad
- Ukazuje, ako možno MCP využiť na orchestráciu viacerých AI agentov v reálnom, produkčnom prostredí.
- Urýchľuje vývoj riešení poskytovaním znovupoužiteľných vzorov na koordináciu agentov, integráciu dát a bezpečné nasadenie.
- Slúži ako vzor na budovanie doménovo špecifických, AI riadených aplikácií využívajúcich MCP a Azure služby.

## Odkazy
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Čo bude ďalej

- Naspäť na: [Prehľad prípadových štúdií](./README.md)  
- Ďalej: [Aktualizácia položiek ADO z YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte prosím na pamäti, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->