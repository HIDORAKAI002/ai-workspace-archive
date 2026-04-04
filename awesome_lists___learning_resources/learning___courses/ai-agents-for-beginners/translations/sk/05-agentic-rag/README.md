[![Agentic RAG](../../../translated_images/sk/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Kliknite na obrázok vyššie pre zobrazenie videa tejto lekcie)_

# Agentic RAG

Táto lekcia poskytuje komplexný prehľad o Agentic Retrieval-Augmented Generation (Agentic RAG), novom paradigme AI, kde veľké jazykové modely (LLMs) samostatne plánujú svoje ďalšie kroky, pričom získavajú informácie z externých zdrojov. Na rozdiel od statických vzorov „vyhľadaj a potom čítaj“ zahŕňa Agentic RAG iteratívne volania LLM, prerušované volaniami nástrojov alebo funkcií a štruktúrovanými výstupmi. Systém hodnotí výsledky, vylepšuje dopyty, v prípade potreby vyvoláva ďalšie nástroje a pokračuje v tomto cykle, kým sa nedosiahne uspokojivé riešenie.

## Úvod

Táto lekcia pokryje

- **Pochopenie Agentic RAG:** Naučte sa o vznikajúcom paradigme v AI, kde veľké jazykové modely (LLMs) samostatne plánujú svoje ďalšie kroky a získavajú informácie z externých dátových zdrojov.
- **Pochopenie iteratívneho štýlu maker-checker:** Pochopte slučku iteratívnych volaní LLM prerušovaných volaniami nástrojov alebo funkcií a štruktúrovaných výstupov, určených na zlepšenie správnosti a zvládnutie nesprávne formulovaných dopytov.
- **Preskúmanie praktických aplikácií:** Identifikujte scenáre, kde Agentic RAG vyniká, ako napríklad prostredia zamerané na správnosť, komplexné interakcie s databázami a rozšírené pracovné postupy.

## Ciele učenia

Po dokončení tejto lekcie budete vedieť/pochopíte:

- **Pochopenie Agentic RAG:** Naučíte sa o vznikajúcom paradigme v AI, kde veľké jazykové modely (LLMs) samostatne plánujú svoje ďalšie kroky a získavajú informácie z externých dátových zdrojov.
- **Iteratívny štýl maker-checker:** Pochopíte koncept slučky iteratívnych volaní LLM prerušovaných volaniami nástrojov alebo funkcií a štruktúrovaných výstupov určených na zlepšenie správnosti a zvládnutie nesprávne formulovaných dopytov.
- **Vlastnenie procesu uvažovania:** Pochopíte schopnosť systému vlastniť svoj proces uvažovania, prijímať rozhodnutia o prístupe k problémom bez spoliehania sa na vopred definované cesty.
- **Pracovný postup:** Pochopíte, ako agentický model nezávisle rozhoduje o získavaní správ o trendoch na trhu, identifikácii údajov konkurencie, korelácii interných predajných metrík, syntéze zistení a hodnotení stratégie.
- **Iteratívne slučky, integrácia nástrojov a pamäť:** Naučíte sa o spoliehaní systému na vzor interakcie so slučkou, udržiavaní stavu a pamäti cez jednotlivé kroky, aby sa zabránilo opakovaným slučkám a robili sa informovanejšie rozhodnutia.
- **Riešenie režimov zlyhania a sebaopravovanie:** Preskúmate robustné mechanizmy sebaopravovania systému vrátane iterácie a opätovného dopytovania, používania diagnostických nástrojov a spoléhání sa na ľudský dohľad.
- **Hranice agentnosti:** Pochopíte obmedzenia Agentic RAG, so zameraním na autonómiu špecifickú pre doménu, závislosť na infraštruktúre a rešpektovanie bezpečnostných opatrení.
- **Praktické použitia a hodnota:** Identifikujete scenáre, kde Agentic RAG vyniká, ako napríklad prostredia zamerané na správnosť, komplexné interakcie s databázami a rozšírené pracovné postupy.
- **Správa, transparentnosť a dôvera:** Naučíte sa o dôležitosti správy a transparentnosti, vrátane vysvetliteľného uvažovania, kontroly zaujatosti a ľudského dohľadu.

## Čo je Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) je vznikajúca paradigma AI, kde veľké jazykové modely (LLMs) samostatne plánujú svoje ďalšie kroky a zároveň získavajú informácie z externých zdrojov. Na rozdiel od statických vzorov „vyhľadaj a potom čítaj“ zahŕňa Agentic RAG iteratívne volania LLM, prerušované volaniami nástrojov alebo funkcií a štruktúrovanými výstupmi. Systém hodnotí výsledky, vylepšuje dopyty, v prípade potreby vyvoláva ďalšie nástroje a pokračuje v tomto cykle, kým sa nedosiahne uspokojivé riešenie. Tento iteratívny štýl „maker-checker“ zlepšuje správnosť, spracováva nesprávne formulované dopyty a zabezpečuje vysokú kvalitu výsledkov.

Systém aktívne vlastní svoj proces uvažovania, prepíše neúspešné dopyty, vyberie rôzne metódy vyhľadávania a integruje viacero nástrojov – napríklad vyhľadávanie vektorov v Azure AI Search, SQL databázy alebo vlastné API – pred finálnym zodpovedaním otázky. Rozlišovacou kvalitou agentického systému je jeho schopnosť vlastniť svoj proces uvažovania. Tradičné implementácie RAG sa spoliehajú na vopred definované cesty, ale agentický systém samostatne určuje poradie krokov na základe kvality nájdených informácií.

## Definovanie Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) je vznikajúca paradigma vo vývoji AI, kde LLM nielen získavajú informácie z externých dátových zdrojov, ale tiež samostatne plánujú svoje ďalšie kroky. Na rozdiel od statických vzorov „vyhľadaj a potom čítaj“ alebo starostlivo naplánovaných postupov promptov, Agentic RAG zahŕňa slučku iteratívnych volaní LLM prerušovaných volaniami nástrojov alebo funkcií a štruktúrovaných výstupov. Systém na každom kroku vyhodnocuje získané výsledky, rozhoduje, či má upraviť svoje dopyty, vyvoláva ďalšie nástroje podľa potreby a pokračuje v tomto cykle, kým nedosiahne uspokojivé riešenie.

Tento iteratívny štýl „maker-checker“ je navrhnutý na zlepšenie správnosti, spracovanie nesprávnych dopytov do štruktúrovaných databáz (napr. NL2SQL) a zaručenie vyvážených, kvalitných výsledkov. Namiesto spoliehania sa výlučne na starostlivo navrhnuté reťazce promptov systém aktívne vlastní svoj proces uvažovania. Môže prepísať neúspešné dopyty, vybrať inú metódu vyhľadávania a integrovať viacero nástrojov – ako napríklad vyhľadávanie vektorov v Azure AI Search, SQL databázy alebo vlastné API – pred finálnym zodpovedaním. Tým sa eliminuje potreba príliš zložitých rámcov orchestrace. Namiesto toho relatívne jednoduchá slučka „volanie LLM → použitie nástroja → volanie LLM → …“ môže priniesť sofistikované a dobre podložené výstupy.

![Agentic RAG Core Loop](../../../translated_images/sk/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Vlastnenie procesu uvažovania

Rozlišovacou kvalitou, ktorá robí systém „agentickým“, je jeho schopnosť vlastniť svoj proces uvažovania. Tradičné implementácie RAG často závisia od ľudí, ktorí vopred definujú cestu pre model: prístupový reťazec, ktorý určuje, čo a kedy sa má vyhľadať.  
Keď je však systém naozaj agentický, interne rozhoduje, ako pristúpiť k problému. Nedá sa to považovať len za vykonávanie skriptu; autonómne určuje poradie krokov na základe kvality nájdených informácií.  
Napríklad, ak je požiadaný o vytvorenie stratégie uvedenia produktu na trh, nespolieha sa výlučne na prompt, ktorý určuje celý výskumný a rozhodovací proces. Namiesto toho agentický model nezávisle rozhoduje o:

1. Získaní aktuálnych správ o trendoch na trhu pomocou Bing Web Grounding  
2. Identifikácií relevantných údajov konkurencie pomocou Azure AI Search.  
3. Korelácií historických interných predajných metrík pomocou Azure SQL Database.  
4. Syntéze zistení do súdržnej stratégie koordinovanej prostredníctvom Azure OpenAI Service.  
5. Vyhodnotení stratégie z hľadiska medzier alebo nesúladu, prípadne iniciovaní ďalšieho kola vyhľadávania.  
Všetky tieto kroky – vylepšovanie dopytov, výber zdrojov, iterácie až do dosiahnutia „uspokojivosti“ odpovede – sú rozhodnuté modelom, nie vopred napísané človekom.

## Iteratívne slučky, integrácia nástrojov a pamäť

![Tool Integration Architecture](../../../translated_images/sk/tool-integration.0f569710b5c17c10.webp)

Agentický systém sa spolieha na vzor interakcie so slučkou:

- **Počiatočné volanie:** Cieľ používateľa (t.j. prompt používateľa) sa predkladá LLM.  
- **Vyvolanie nástroja:** Ak model identifikuje chýbajúce informácie alebo nejasné pokyny, vyberie nástroj alebo metódu vyhľadávania – napríklad dopyt do vektorovej databázy (napr. Azure AI Search Hybrid search nad súkromnými dátami) alebo štruktúrované SQL volanie – aby získal viac kontextu.  
- **Hodnotenie a vylepšovanie:** Po preskúmaní vrátených dát model rozhodne, či sú informácie dostatočné. Ak nie, vylepší dopyt, vyskúša iný nástroj alebo upraví svoj prístup.  
- **Opakovanie, kým nie je spokojný:** Tento cyklus pokračuje, kým model nezistí, že má dostatočnú jasnosť a dôkazy na dodanie finálnej, dobre zdôvodnenej odpovede.  
- **Pamäť a stav:** Pretože systém udržiava stav a pamäť cez jednotlivé kroky, môže si pamätať predchádzajúce pokusy a ich výsledky, čím sa vyhýba opakovaným slučkám a robí informovanejšie rozhodnutia ďalej.  

V priebehu času to vytvára dojem vyvíjajúceho sa porozumenia, ktoré umožňuje modelu navigovať komplexné, viacstupňové úlohy bez potreby, aby človek neustále zasahoval alebo preformulovával prompt.

## Riešenie režimov zlyhania a sebaopravovanie

Autonómia Agentic RAG zahŕňa aj robustné mechanizmy sebaopravovania. Keď systém narazí na slepé uličky – napríklad pri vyhľadávaní irelevantných dokumentov alebo obdržaní nesprávne formulovaných dopytov – môže:

- **Iterovať a opätovne dopytovať:** Namiesto vrátenia málo hodnotných odpovedí model skúša nové vyhľadávacie stratégie, prepíše dopyty do databáz alebo skúma alternatívne datasety.  
- **Použiť diagnostické nástroje:** Systém môže vyvolať ďalšie funkcie určené na pomoc s ladením jeho krokov uvažovania alebo potvrdením správnosti získaných dát. Nástroje ako Azure AI Tracing budú dôležité na umožnenie robustnej observability a monitorovania.  
- **Spoliehať sa na ľudský dohľad:** Pri situáciách s vysokým rizikom alebo opakovane zlyhávajúcich scénároch môže model signalizovať neistotu a žiadať ľudské vedenie. Keď človek poskytne korekčnú spätnú väzbu, model ju môže zahrnúť do svojho učenia do budúcnosti.  

Tento iteratívny a dynamický prístup umožňuje modelu neustále sa zlepšovať a zabezpečuje, že nejde len o jednorazový systém, ale o taký, ktorý sa učí zo svojich chýb počas relácie.

![Self Correction Mechanism](../../../translated_images/sk/self-correction.da87f3783b7f174b.webp)

## Hranice agentnosti

Napriek svojej autonómii v rámci úlohy Agentic RAG nie je analogický k všeobecnej umelej inteligencii. Jeho „agentické“ schopnosti sú obmedzené na nástroje, dátové zdroje a pravidlá, ktoré mu poskytnú ľudskí vývojári. Nedokáže si vymyslieť vlastné nástroje ani vystúpiť mimo nastavené doménové hranice. Skôr vyniká v dynamickej koordinácii dostupných zdrojov.  
Kľúčové rozdiely oproti pokročilejším formám AI zahŕňajú:

1. **Doménovo špecifická autonómia:** Agentic RAG systémy sa zameriavajú na dosahovanie používateľom definovaných cieľov v rámci známej domény, používajúc stratégie ako prepisovanie dopytov alebo výber nástrojov na zlepšenie výsledkov.  
2. **Závislosť na infraštruktúre:** Schopnosti systému závisia od nástrojov a dát integrovaných vývojármi. Bez ľudského zásahu nemôže prekročiť tieto hranice.  
3. **Rešpektovanie bezpečnostných opatrení:** Etické smernice, pravidlá súladu a obchodné politiky zostávajú veľmi dôležité. Sloboda agenta je vždy obmedzená bezpečnostnými opatreniami a dohľadovými mechanizmami (dúfajme?).

## Praktické použitia a hodnota

Agentic RAG vyniká v scenároch vyžadujúcich iteratívne vylepšovanie a presnosť:

1. **Prostredia zamerané na správnosť:** Pri kontrolách súladu, regulačných analýzach alebo právnom výskume môže agentický model opakovane overovať fakty, konzultovať viaceré zdroje a prepísať dopyty, kým nevygeneruje dôkladne preverené odpovede.  
2. **Komplexné interakcie s databázami:** Pri práci so štruktúrovanými dátami, kde dopyty často zlyhávajú alebo potrebujú úpravu, systém môže autonómne vylepšovať svoje dopyty pomocou Azure SQL alebo Microsoft Fabric OneLake, čím zaručí, že konečné vyhľadávanie zodpovedá zámeru používateľa.  
3. **Rozšírené pracovné postupy:** Dlhšie relácie môžu evolvovať v čase, ako sa objavujú nové informácie. Agentic RAG môže neustále začleňovať nové dáta a meniť stratégie podľa toho, ako sa učí viac o probléme.

## Správa, transparentnosť a dôvera

Ako sa tieto systémy stávajú v uvažovaní autonómnejšími, správa a transparentnosť sú kľúčové:

- **Vysvetliteľné uvažovanie:** Model môže poskytnúť auditnú stopu dopytov, ktoré vykonal, zdrojov, ktoré konzultoval, a krokov uvažovania, ktoré vykonal, aby dosiahol záver. Nástroje ako Azure AI Content Safety a Azure AI Tracing / GenAIOps môžu pomôcť udržiavať transparentnosť a zmierňovať riziká.  
- **Kontrola zaujatosti a vyvážené vyhľadávanie:** Vývojári môžu ladiť vyhľadávacie stratégie tak, aby boli zvážené vyvážené a reprezentatívne dátové zdroje, a pravidelne kontrolovať výstupy na zistenie zaujatosti alebo skreslenia pomocou vlastných modelov pre pokročilé organizácie dátovej vedy s využitím Azure Machine Learning.  
- **Ľudský dohľad a súlad:** Pri citlivých úlohách zostáva ľudské hodnotenie nevyhnutné. Agentic RAG nenahrádza ľudský úsudok vo vysoko rizikových rozhodnutiach – dopĺňa ho poskytovaním dôkladnejšie preverovaných možností.

Mať nástroje, ktoré poskytujú jasný záznam o akciách, je nevyhnutné. Bez nich môže byť ladenie viacstupňového procesu veľmi náročné. Pozrite si nasledujúci príklad od Literal AI (spoločnosti za Chainlit) pre beh agenta:

![AgentRunExample](../../../translated_images/sk/AgentRunExample.471a94bc40cbdc0c.webp)

## Záver

Agentic RAG predstavuje prirodzenú evolúciu v tom, ako AI systémy zvládajú komplexné úlohy náročné na dáta. Prijatím vzoru interakcie so slučkou, autonómnym výberom nástrojov a vylepšovaním dopytov až do dosiahnutia kvalitného výsledku systém presahuje statické sledovanie promptov a mení sa na adaptívnejšieho, kontextovo uvedomelého rozhodovateľa. Hoci je stále viazaný na infraštruktúru a etické smernice definované ľuďmi, tieto agentické schopnosti umožňujú bohatšie, dynamickejšie a nakoniec užitočnejšie AI interakcie pre podniky aj koncových používateľov.

### Máte viac otázok o Agentic RAG?

Pridajte sa k [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), kde sa môžete stretnúť s ďalšími študentmi, zúčastniť sa konzultačných hodín a získať odpovede na svoje otázky o AI agentoch.

## Dodatočné zdroje
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementácia Retrieval Augmented Generation (RAG) so službou Azure OpenAI: Naučte sa, ako používať vlastné dáta so službou Azure OpenAI. Tento modul Microsoft Learn poskytuje komplexného sprievodcu implementáciou RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Hodnotenie generatívnych AI aplikácií pomocou Microsoft Foundry: Tento článok pokrýva hodnotenie a porovnanie modelov na verejne dostupných dátových súboroch, vrátane Agentic AI aplikácií a architektúr RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Čo je Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Kompletný sprievodca agentovo založenou retrieval augmented generáciou – Novinky z generácie RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: zrýchlite svoj RAG pomocou reformulácie dotazov a sebazisťovania! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Pridávanie agentových vrstiev do RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Budúcnosť znalostných asistentov: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Ako vybudovať systémy Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Používanie služby Microsoft Foundry Agent na škálovanie vašich AI agentov</a>

### Akademické články

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteratívne zlepšovanie so spätnou väzbou od seba samého</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Jazykové agenti s verbálnym posilňovaním učenia</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Veľké jazykové modely sa môžu samokorigovať pomocou nástrojovo interaktívnej kritiky</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Prehľad o Agentic RAG</a>

## Predchádzajúca lekcia

[Tool Use Design Pattern](../04-tool-use/README.md)

## Nasledujúca lekcia

[Budovanie dôveryhodných AI agentov](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Originálny dokument v jeho pôvodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->