[![Agentikus RAG](../../../translated_images/hu/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Kattintson a fenti képre a lecke videójának megtekintéséhez)_

# Agentikus RAG

Ez a lecke átfogó áttekintést nyújt az Agentikus Retrieval-Augmented Generationről (Agentikus RAG), egy feltörekvő MI-paradigmáról, ahol a nagy nyelvi modellek (LLM-ek) önállóan megtervezik a következő lépéseiket, miközben külső forrásokból hívnak le információkat. A statikus „lekérés-és-olvasás” mintáktól eltérően az Agentikus RAG iteratív LLM-hívásokat tartalmaz, eszköz- vagy függvényhívásokkal és strukturált kimenetekkel megszakítva. A rendszer kiértékeli az eredményeket, finomítja a lekérdezéseket, szükség esetén további eszközöket hív meg, és folytatja ezt a ciklust, amíg kielégítő megoldást nem ér el.

## Bevezetés

Ez a lecke a következőket fedi le

- **Agentikus RAG megértése:** Ismerje meg azt a feltörekvő AI-paradigmát, ahol a nagy nyelvi modellek (LLM-ek) önállóan megtervezik a következő lépéseiket, miközben külső adatforrásokból húznak információkat.
- **Ismétlődő készítő-ellenőrző stílus elsajátítása:** Értse meg az iteratív LLM-hívások körforgását, amelyet eszköz- vagy függvényhívások és strukturált kimenetek szakítanak meg, célja a helyesség javítása és a hibás lekérdezések kezelése.
- **Gyakorlati alkalmazások feltárása:** Azonosítsa azokat a helyzeteket, ahol az Agentikus RAG kiemelkedik, például helyesség-központú környezetekben, összetett adatbázis-interakciókban és kiterjesztett munkafolyamatokban.

## Tanulási célok

A lecke elvégzése után tudni fogja/meg fogja érteni:

- **Agentikus RAG megértése:** Ismerje meg azt a feltörekvő AI-paradigmát, ahol a nagy nyelvi modellek (LLM-ek) önállóan megtervezik a következő lépéseiket, miközben külső adatforrásokból húznak információkat.
- **Ismétlődő készítő-ellenőrző stílus:** Értse meg azt a fogalmat, hogy iteratív LLM-hívásokból álló ciklus történik, amelyet eszköz- vagy függvényhívások és strukturált kimenetek szakítanak meg, célja a helyesség javítása és a hibás lekérdezések kezelése.
- **A gondolkodási folyamat birtoklása:** Értse meg a rendszer képességét arra, hogy saját maga irányítsa az érvelési folyamatot, döntéseket hozva a problémák megközelítéséről anélkül, hogy előre meghatározott útvonalakra támaszkodna.
- **Munkafolyamat:** Értse meg, hogyan dönt egy agentikus modell önállóan arról, hogy lekérje a piaci trendjelentéseket, azonosítsa a versenytársi adatokat, korrelálja a belső értékesítési metrikákat, szintetizálja a megállapításokat és értékelje a stratégiát.
- **Ismétlődő hurkok, eszközintegráció és memória:** Ismerje meg a rendszer azon reliance-ét egy hurkolt interakciós mintára, amely lépésről lépésre állapotot és memóriát tart fenn, hogy elkerülje az ismétlődő hurkokat és tájékozott döntéseket hozzon.
- **Hibamódok kezelése és önkorrekció:** Fedezze fel a rendszer robusztus önkorrekciós mechanizmusait, beleértve az iterálást és újralekérdezést, diagnosztikai eszközök használatát és az emberi felügyelethez való visszatérést.
- **Az ügynökség határai:** Értse meg az Agentikus RAG korlátait, hangsúlyozva a doménspecifikus autonómiát, az infrastruktúrától való függést és a szabályozások tiszteletben tartását.
- **Gyakorlati esetek és érték:** Azonosítsa azokat a forgatókönyveket, ahol az Agentikus RAG kiemelkedik, például helyesség-központú környezetekben, összetett adatbázis-interakciókban és kiterjesztett munkafolyamatokban.
- **Kormányzás, átláthatóság és bizalom:** Ismerje meg a kormányzás és az átláthatóság fontosságát, beleértve az érthető érvelést, a torzításellenőrzést és az emberi felügyeletet.

## Mi az Agentikus RAG?

Az Agentikus Retrieval-Augmented Generation (Agentikus RAG) egy olyan feltörekvő AI-paradigma, ahol a nagy nyelvi modellek (LLM-ek) nemcsak információt húznak külső adatforrásokból, hanem önállóan megtervezik a következő lépéseiket. A statikus „lekérés-then-olvasás” mintákkal vagy gondosan megírt prompt-szekvenciákkal ellentétben az Agentikus RAG egy iteratív LLM-hívás hurkot foglal magában, amelyet eszköz- vagy függvényhívások és strukturált kimenetek szakítanak meg. Minden lépésnél a rendszer kiértékeli az eredményeket, eldönti, hogy szükséges-e a lekérdezések finomítása, meghív további eszközöket, ha kell, és folytatja a ciklust, amíg kielégítő megoldást nem ér el. Ez az iteratív „készítő-ellenőrző” stílus javítja a helyességet, kezeli a strukturált adatbázisokhoz tartozó hibás lekérdezéseket (például NL2SQL), és biztosítja a kiegyensúlyozott, magas minőségű eredményeket.

A rendszer aktívan birtokolja az érvelési folyamatát: újraírásra kerülnek a sikertelen lekérdezések, más lekérési módszerek kerülhetnek kiválasztásra, és több eszköz integrálható — például vektorkeresés az Azure AI Search-ben, SQL adatbázisok vagy egyedi API-k — mielőtt véglegesítené a válaszát. Az agentikus rendszer megkülönböztető tulajdonsága az, hogy képes saját maga felvállalni az érvelési folyamatot. A hagyományos RAG-megoldások előre meghatározott utakra támaszkodnak, de egy agentikus rendszer önállóan határozza meg a lépések sorrendjét az általa talált információk minősége alapján.

## Az Agentikus Retrieval-Augmented Generation (Agentikus RAG) definiálása

Az Agentikus Retrieval-Augmented Generation (Agentikus RAG) egy olyan felemelkedő paradigma az AI fejlesztésben, ahol az LLM-ek nemcsak külső adatforrásokból húznak információt, hanem önállóan meg is tervezik a következő lépéseiket. A statikus lekérés-then-olvasás mintákkal vagy gondosan megírt promptláncokkal ellentétben az Agentikus RAG egy iteratív LLM-hívásokból álló hurkot foglal magában, amelyet eszköz- vagy függvényhívások és strukturált kimenetek szakítanak meg. Minden lépésnél a rendszer kiértékeli a kapott eredményeket, eldönti, hogy érdemes-e finomítani a lekérdezéseket, szükség esetén további eszközöket hív meg, és folytatja a ciklust, amíg kielégítő megoldást nem ér el.

Ez az iteratív „készítő-ellenőrző” működési stílus a helyesség javítására szolgál, kezeli a strukturált adatbázisokhoz tartozó hibás lekérdezéseket (például NL2SQL), és biztosít kiegyensúlyozott, magas minőségű eredményeket. Ahelyett, hogy kizárólag gondosan megtervezett prompt láncokra támaszkodna, a rendszer aktívan birtokolja az érvelési folyamatát. Újraírhatja a sikertelen lekérdezéseket, más lekérési módszereket választhat, és több eszközt integrálhat — például vektorkeresést az Azure AI Search-ben, SQL adatbázisokat vagy egyedi API-kat — mielőtt véglegesíti a válaszát. Ez csökkenti a túlbonyolított orchestration-keretrendszerek szükségességét. Helyette egy viszonylag egyszerű „LLM-hívás → eszköz használata → LLM-hívás → …” ciklus is kifinomult és jól megalapozott kimeneteket eredményezhet.

![Agentikus RAG fő hurok](../../../translated_images/hu/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## A gondolkodási folyamat birtoklása

Az a megkülönböztető tulajdonság, amely egy rendszert „agentikus”-szá tesz, az, hogy képes saját maga birtokolni az érvelési folyamatát. A hagyományos RAG-implementációk gyakran emberi előre definiált útvonalra támaszkodnak: egy gondolatmenetre, amely meghatározza, mit kell lekérni és mikor.
De ha egy rendszer valóban agentikus, akkor belsőleg dönt arról, hogyan közelítse meg a problémát. Nem pusztán egy szkriptet hajt végre; önállóan határozza meg a lépések sorrendjét az általa talált információ minősége alapján.
Például, ha arra kérik, hogy hozzon létre egy termékbevezetési stratégiát, nem csupán egy olyan prompttól függ, amely részletezi az egész kutatási és döntéshozatali munkafolyamatot. Ehelyett az agentikus modell önállóan úgy dönt, hogy:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5. Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
Mindezeket a lépéseket — a lekérdezések finomítását, a források kiválasztását és az iterálást, amíg „elégedett” a válasszal — a modell döntései vezérlik, nem pedig egy ember által előre megírt szkript.

## Ismétlődő hurkok, eszközintegráció és memória

![Eszközintegrációs architektúra](../../../translated_images/hu/tool-integration.0f569710b5c17c10.webp)

Egy agentikus rendszer egy hurkolt interakciós mintára támaszkodik:

- **Kezdeti hívás:** A felhasználó célja (azaz a felhasználói prompt) bemutatásra kerül az LLM-nek.
- **Eszköz meghívása:** Ha a modell hiányzó információt vagy homályos utasítást azonosít, kiválaszt egy eszközt vagy lekérési módszert — például egy vektoradatbázis-lekérdezést (pl. Azure AI Search Hybrid search privát adatok felett) vagy egy strukturált SQL hívást — hogy több kontextust gyűjtsön.
- **Értékelés és finomítás:** A visszaadott adatok áttekintése után a modell eldönti, hogy az információ elegendő-e. Ha nem, finomítja a lekérdezést, más eszközt próbál, vagy módosítja a megközelítést.
- **Ismétlés, amíg elégedett:** Ez a ciklus folytatódik, amíg a modell meg nem állapítja, hogy elég világosságot és bizonyítékot szerzett egy végső, jól megalapozott válasz nyújtásához.
- **Memória és állapot:** Mivel a rendszer lépések között állapotot és memóriát tart fenn, képes felidézni korábbi próbálkozásokat és azok eredményeit, elkerülve az ismétlődő hurkokat és tájékozottabb döntéseket hozva a folyamat során.

Idővel ez egy fejlődő megértés érzetét teremti, lehetővé téve, hogy a modell összetett, több lépésből álló feladatokat navigáljon anélkül, hogy egy embernek folyamatosan be kellene avatkoznia vagy újraformálnia a promptot.

## Hibamódok kezelése és önkorrekció

Az Agentikus RAG autonómiája kiterjed a robusztus önkorrekciós mechanizmusokra is. Amikor a rendszer zsákutcákba ütközik — például irreleváns dokumentumok lekérése vagy hibás lekérdezésekkel való találkozás —, képes:

- **Iterálni és újralekérdezni:** Ahelyett, hogy alacsony értékű válaszokat adna vissza, a modell új keresési stratégiákat próbál, újraíratja az adatbázis-lekérdezéseket, vagy alternatív adatkészleteket vizsgál meg.
- **Diagnosztikai eszközök használata:** A rendszer további funkciókat hívhat meg, amelyek segítenek a gondolkodási lépések hibakeresésében vagy a lekért adatok helyességének megerősítésében. Olyan eszközök, mint az Azure AI Tracing, fontosak lesznek a robusztus megfigyelhetőség és monitorozás biztosításához.
- **Visszanyúlás emberi felügyelethez:** Nagy kockázatú vagy ismétlődően hibás helyzetekben a modell bizonytalanságot jelezhet és emberi útmutatást kérhet. Amint az ember helyesbítő visszajelzést ad, a modell beépítheti ezt a leckét a további működésébe.

Ez az iteratív és dinamikus megközelítés lehetővé teszi, hogy a modell folyamatosan javuljon, biztosítva, hogy ne csak egy egyszeri rendszer legyen, hanem olyan, amely a munkamenet során tanul a hibáiból.

![Önkorrekciós mechanizmus](../../../translated_images/hu/self-correction.da87f3783b7f174b.webp)

## Az ügynökség határai

Autonómiája ellenére egy Agentikus RAG nem analóg az Általános Mesterséges Intelligenciával. „Agentikus” képességei korlátozódnak az emberi fejlesztők által biztosított eszközökre, adatforrásokra és szabályokra. Nem tudja feltalálni saját eszközeit vagy kilépni a megadott doménhatárokon. Ehelyett kiválóan képes dinamikusan megszervezni a rendelkezésre álló erőforrásokat.
A fejlettebb MI-formáktól való kulcsfontosságú különbségek például:

1. **Doménspecifikus autonómia:** Az Agentikus RAG rendszerek a felhasználó által meghatározott célok elérésére összpontosítanak egy ismert doménon belül, olyan stratégiákat alkalmazva, mint a lekérdezés-újraírás vagy az eszközválasztás a jobb eredmények érdekében.
2. **Infrastruktúrától való függés:** A rendszer képességei az integrált eszközöktől és adatoktól függenek, amelyeket a fejlesztők adnak hozzá. Emberi beavatkozás nélkül nem képes túllépni ezeken a határokon.
3. **A védőkorlátok tisztelete:** Etikai irányelvek, megfelelőségi szabályok és üzleti politikák továbbra is rendkívül fontosak. Az ügynök szabadságát mindig biztonsági intézkedések és felügyeleti mechanizmusok korlátozzák (remélhetőleg).

## Gyakorlati felhasználási esetek és érték

Az Agentikus RAG olyan helyzetekben tűnik ki, ahol iteratív finomításra és pontosságra van szükség:

1. **Helyesség-központú környezetek:** Megfelelőségi ellenőrzések, szabályozási elemzések vagy jogi kutatás esetén az agentikus modell többször ellenőrizheti a tényeket, több forrást konzultálhat és újraíratja a lekérdezéseket, amíg alaposan le nem ellenőrizett választ nem ad.
2. **Összetett adatbázis-interakciók:** Strukturált adatok kezelésekor, ahol a lekérdezések gyakran hibázhatnak vagy finomításra szorulhatnak, a rendszer önállóan finomíthatja a lekérdezéseit Azure SQL vagy Microsoft Fabric OneLake használatával, biztosítva, hogy a végső lekérés megfeleljen a felhasználó szándékának.
3. **Kiterjesztett munkafolyamatok:** Hosszabb munkamenetek esetén a folyamat fejlődhet, ahogy új információk bukkannak fel. Az Agentikus RAG folyamatosan beépítheti az új adatokat, és stratégiát vált, ahogy többet megtud a probléma területéről.

## Kormányzás, átláthatóság és bizalom

Ahogy ezek a rendszerek egyre autonómabbá válnak az érvelésükben, a kormányzás és az átláthatóság létfontosságú:

- **Érthető érvelés:** A modell auditálható nyomvonalat adhat a végrehajtott lekérdezésekről, a konzultált forrásokról és azokról az érvelési lépésekről, amelyek a következtetéséhez vezettek. Olyan eszközök, mint az Azure AI Content Safety és az Azure AI Tracing / GenAIOps segíthetnek az átláthatóság fenntartásában és a kockázatok mérséklésében.
- **Torzítás-ellenőrzés és kiegyensúlyozott lekérés:** A fejlesztők hangolhatják a lekérési stratégiákat annak érdekében, hogy kiegyensúlyozott, reprezentatív adatforrások kerüljenek bevonásra, és rendszeres auditot végezhetnek a kimeneteken a torzítás vagy eltolódott mintázatok kimutatására, például az Azure Machine Learning-et használó fejlett adat tudományi csapatok egyedi modelljeivel.
- **Emberi felügyelet és megfelelőség:** Érzékeny feladatoknál az emberi felülvizsgálat továbbra is alapvető. Az Agentikus RAG nem helyettesíti az emberi ítélőképességet nagy kockázatú döntésekben — kiegészíti azt azzal, hogy alaposabban ellenőrzött lehetőségeket ad.

Fontos, hogy rendelkezésre álljanak olyan eszközök, amelyek világos cselekvési nyilvántartást biztosítanak. Nélkülük egy többlépéses folyamat hibakeresése nagyon nehéz lehet. Lásd a Literal AI (a Chainlit mögött álló cég) alábbi példáját egy Agent futtatásról:

![Agent futtatási példa](../../../translated_images/hu/AgentRunExample.471a94bc40cbdc0c.webp)

## Következtetés

Az Agentikus RAG a természetes fejlődést képviseli abban, hogy az MI rendszerek hogyan kezelik az összetett, adatigényes feladatokat. A hurkolt interakciós minta alkalmazásával, az eszközök önálló kiválasztásával és a lekérdezések finomításával a rendszer az egyszerű promptkövetéstől egy adaptívabb, kontextusérzékeny döntéshozó felé lép. Bár továbbra is az ember által meghatározott infrastruktúrák és etikai irányelvek korlátozzák, ezek az agentikus képességek gazdagabb, dinamikusabb és végső soron hasznosabb MI-interakciókat tesznek lehetővé mind az vállalatok, mind a végfelhasználók számára.

### Több kérdésed van az Agentikus RAG-ról?

Csatlakozz a [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)-hoz, hogy találkozz más tanulókkal, részt vegyél az office hours eseményeken és megválaszoltathasd az AI Agents-szel kapcsolatos kérdéseidet.

## További források
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Valósítsa meg a Retrieval Augmented Generation (RAG) megoldást az Azure OpenAI Service segítségével: Ismerje meg, hogyan használhatja saját adatait az Azure OpenAI Service-szel. Ez a Microsoft Learn modul átfogó útmutatást nyújt a RAG megvalósításához</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Generatív MI alkalmazások értékelése a Microsoft Foundry-val: A cikk a modellek értékelését és összehasonlítását tárgyalja nyilvánosan elérhető adatkészleteken, beleértve az ügynök alapú MI alkalmazásokat és a RAG architektúrákat</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Mi az Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Teljes útmutató az ügynök-alapú Retrieval Augmented Generation-hez – Hírek a generation RAG-ből</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: turbózza fel a RAG-ját lekérdezés-átalakítással és önlekérdezéssel! Hugging Face nyílt forráskódú MI szakácskönyv</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Agentikus rétegek hozzáadása a RAG-hez</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">A tudásasszisztensek jövője: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Hogyan építsünk agentikus RAG rendszereket</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">A Microsoft Foundry Agent Service használata az MI-ügynökök skálázásához</a>

### Tudományos publikációk

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteratív finomítás önvisszajelzéssel</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Nyelvi ügynökök verbális megerősítéses tanulással</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: A nagy nyelvi modellek önjavíthatnak eszköz-interaktív kritizálással</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Áttekintés az agentikus RAG-ről</a>

## Előző lecke

[Eszközhasználat tervezési mintázata](../04-tool-use/README.md)

## Következő lecke

[Megbízható MI-ügynökök építése](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Felelősségkizárás:
Ezt a dokumentumot a mesterséges intelligencián alapuló fordítószolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével fordítottuk. Bár a pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti, anyanyelvi dokumentum tekintendő a hiteles forrásnak. Fontos információk esetén emberi, szakmai fordítást javaslunk. Nem vállalunk felelősséget az e fordítás használatából eredő félreértésekért vagy téves értelmezésekért.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->