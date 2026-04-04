[![Agentinė RAG](../../../translated_images/lt/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Spustelėkite aukščiau esantį vaizdą, kad peržiūrėtumėte šios pamokos vaizdo įrašą)_

# Agentinė RAG

Ši pamoka pateikia išsamų Agentinės paieškos papildytos generacijos (Agentinė RAG) apžvalgą – naują dirbtinio intelekto paradigmą, kurioje dideli kalbos modeliai (LLM) savarankiškai planuoja savo kitus žingsnius, tuo pačiu traukdami informaciją iš išorinių šaltinių. Skirtingai nuo statinių paieškos-tada-skaitymo modelių, Agentinė RAG apima iteracinius LLM kvietimus, pertraukiamus įrankių ar funkcijų kvietimais ir struktūruotais atsakymais. Sistema įvertina rezultatus, tobulina užklausas, prireikus iškviečia papildomus įrankius ir tęsia šį ciklą tol, kol pasiekiamas patenkinamas sprendimas.

## Įvadas

Šioje pamokoje aptarsime

- **Suprasti Agentinę RAG:** Sužinokite apie naują AI paradigmą, kurioje dideli kalbos modeliai (LLM) savarankiškai planuoja savo kitus veiksmus, traukdami informaciją iš išorinių duomenų šaltinių.
- **Susipažinti su iteraciniu Maker-Checker stiliumi:** Suprasti iteracinio kvietimų LLM kilpą, pertraukiamą įrankių ar funkcijų kvietimais ir struktūruotais atsakymais, skirtą taisyklingumui pagerinti ir netaisyklingoms užklausoms valdyti.
- **Išnagrinėti praktines taikymo sritis:** Nustatyti situacijas, kuriose Agentinė RAG ypač praverčia, pavyzdžiui, taisyklingumo prioritetą turinčiose aplinkose, sudėtinguose duomenų bazės sąveikos atvejuose ir išplėstose darbo eigos srautuose.

## Mokymosi tikslai

Baigę šią pamoką, sugebėsite/įsisavinsite:

- **Agentinės RAG supratimą:** Sužinokite apie naują AI paradigmą, kurioje dideli kalbos modeliai (LLM) savarankiškai planuoja savo kitus žingsnius, traukdami informaciją iš išorinių duomenų šaltinių.
- **Iteracinis Maker-Checker stilius:** Suprasti iteracinių kvietimų LLM kilpą, pertraukiamą įrankių ar funkcijų kvietimais ir struktūruotais atsakymais, siekiant pagerinti taisyklingumą ir valdyti netaisyklingas užklausas.
- **Valdyti samprotavimo procesą:** Suprasti sistemos gebėjimą kontroliuoti savo samprotavimo procesą, priimant sprendimus, kaip spręsti uždavinius, nepasikliaujant iš anksto nustatytomis kryptimis.
- **Darbo eiga:** Suprasti, kaip agentinis modelis nepriklausomai nusprendžia surinkti rinkos tendencijų ataskaitas, nustatyti konkurentų duomenis, koreliuoti vidinius pardavimų rodiklius, sintetinti išvadas ir įvertinti strategiją.
- **Iteracinės kilpos, įrankių integracija ir atmintis:** Sužinoti apie sistemos priklausymą nuo kilpinio sąveikos modelio, palaikančio būseną ir atmintį per žingsnius, kad būtų išvengta pasikartojančių kilpų ir priimti pagrįsti sprendimai.
- **Gedimų valdymas ir savitikra:** Išnagrinėti sistemos tvirtas savitikros priemones, įskaitant iteravimą ir pakartotinį užklausų teikimą, diagnostinių įrankių naudojimą ir atsarginių žmogaus stebėsenos sprendimų taikymą.
- **Agentūros ribos:** Suprasti Agentinės RAG ribas, orientuojantis į srities specifinę savarankiškumą, infrastruktūros priklausomybę ir taisyklių laikymąsi.
- **Praktinės panaudojimo sritys ir vertė:** Nustatyti situacijas, kuriose Agentinė RAG yra efektyvi, pavyzdžiui, taisyklingumo prioritetą turinčiose aplinkose, sudėtinguose duomenų bazės sąveikos scenarijuose ir ilgose darbo eigos srautuose.
- **Valdymas, skaidrumas ir pasitikėjimas:** Sužinoti apie valdymo ir skaidrumo svarbą, įskaitant paaiškinamą samprotavimą, šališkumo kontrolę ir žmogaus priežiūrą.

## Kas yra Agentinė RAG?

Agentinė paieškos papildyta generacija (Agentinė RAG) yra nauja AI paradigma, kurioje dideli kalbos modeliai (LLM) savarankiškai planuoja savo kitus veiksmus, tuo pat metu traukdami informaciją iš išorinių šaltinių. Skirtingai nuo statinių paieškos-tada-skaitymo modelių, Agentinė RAG apima iteracinius LLM kvietimus, pertraukiamus įrankių ar funkcijų kvietimais ir struktūruotais atsakymais. Sistema vertina gautus rezultatus, tobulina užklausas, prireikus iškviečia papildomus įrankius ir tęsia šį ciklą, kol pasiekiamas patenkinamas sprendimas. Šis iteracinis „maker-checker“ stilius gerina taisyklingumą, tvarko netaisyklingas užklausas ir užtikrina aukštos kokybės rezultatus.

Sistema aktyviai kontroliuoja savo samprotavimo procesą, perrašydama nepavykusias užklausas, pasirinkdama skirtingus paieškos metodus ir integruodama kelis įrankius – tokius kaip vektorinė paieška Azure AI Search, SQL duomenų bazės ar pritaikytos API – prieš pateikdama galutinį atsakymą. Išskirtinė agentinės sistemos savybė yra gebėjimas kontroliuoti savo samprotavimo procesą. Tradicinės RAG diegimo versijos remiasi iš anksto nustatytais keliais, tačiau agentinė sistema autonomiškai nusprendžia žingsnių seką pagal rastos informacijos kokybę.

## Agentinės paieškos papildytos generacijos (Agentinė RAG) apibrėžimas

Agentinė paieškos papildyta generacija (Agentinė RAG) yra nauja AI kūrimo paradigma, kurioje LLM ne tik traukia informaciją iš išorinių duomenų šaltinių, bet ir savarankiškai planuoja savo kitus veiksmus. Skirtingai nuo statinių paieškos-tada-skaitymo modelių ar kruopščiai įrašytų užklausų sekų, Agentinė RAG apima iteracinį kvietimų LLM ciklą, pertraukiamą įrankių ar funkcijų kvietimais ir struktūruotais atsakymais. Kiekviename žingsnyje sistema įvertina gautus rezultatus, nusprendžia, ar reikia tobulinti užklausas, prireikus iškviečia papildomus įrankius ir tęsia šį ciklą, kol pasiekia patenkinamą sprendimą.

Šis iteracinis „maker-checker“ veikimo stilius skirtas pagerinti taisyklingumą, tvarkyti netaisyklingas užklausas į struktūruotas duomenų bazes (pvz., NL2SQL) ir užtikrinti subalansuotus, aukštos kokybės rezultatus. Vietoj vien tik kruopščiai sukurtų užklausų grandinių, sistema aktyviai kontroliuoja savo samprotavimo procesą. Ji gali perrašyti nepavykusias užklausas, pasirinkti kitus ištraukimo metodus ir integruoti kelis įrankius – kaip vektorinę paiešką Azure AI Search, SQL duomenų bazes ar pritaikytas API – prieš pateikdama galutinį atsakymą. Tai pašalina poreikį pernelyg sudėtingoms organizavimo sistemoms. Vietoj to, gana paprasta kilpa „LLM kvietimas → įrankio naudojimas → LLM kvietimas → …“ gali išvesti sudėtingus ir gerai pagrįstus atsakymus.

![Agentinės RAG pagrindinė kilpa](../../../translated_images/lt/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Samprotavimo proceso valdymas

Išskirtinė savybė, kuri daro sistemą „agentine“, yra jos gebėjimas kontroliuoti savo samprotavimo procesą. Tradiciniai RAG įgyvendinimai dažnai priklauso nuo žmonių, iš anksto nustatančių modelio kelią: grandinę minties, kuri nurodo, ką ir kada gauti.
Tačiau kai sistema iš tiesų agentinė, ji viduje nusprendžia, kaip spręsti problemą. Ji ne tik vykdo scenarijų; ji autonomiškai nustato žingsnių seką pagal rastos informacijos kokybę.
Pavyzdžiui, jei sistemai pateikiama užduotis sukurti produkto paleidimo strategiją, ji nesiremia vien tik užklausa, kuri aprašo visą tyrimo ir sprendimų priėmimo eigą. Vietoje to, agentinis modelis nepriklausomai nusprendžia:

1. Gauti dabartines rinkos tendencijų ataskaitas, naudojant Bing Web Grounding
2. Nustatyti svarbius konkurentų duomenis, naudojant Azure AI Search.
3. Koreliuoti istorinius vidinius pardavimų rodiklius, naudojant Azure SQL Database.
4. Apjungti išvadas į vientisą strategiją, koordinuojamą per Azure OpenAI Service.
5. Įvertinti strategiją spragoms ar neatitikimams, jei reikia, inicijuojant dar vieną paieškos etapą.
Visus šiuos žingsnius – užklausų tobulinimą, šaltinių pasirinkimą, iteravimą tol, kol būna „patenkintas“ atsakymu – nusprendžia modelis, ne žmogus pagal scenarijų.

## Iteracinės kilpos, įrankių integracija ir atmintis

![Įrankių integracijos architektūra](../../../translated_images/lt/tool-integration.0f569710b5c17c10.webp)

Agentinė sistema remiasi kilpinio sąveikos modeliu:

- **Pradinis kvietimas:** Vartotojo tikslas (taip pat žinomas kaip vartotojo užklausa) pateikiamas LLM.
- **Įrankio iškvietimas:** Jei modelis nustato trūkstamą informaciją arba neaiškias instrukcijas, jis pasirenka įrankį arba paieškos metodą – pavyzdžiui, vektorinių duomenų bazės užklausą (pvz., Azure AI Search Hybrid paieška privačiuose duomenyse) arba struktūrizuotą SQL kvietimą – kad surinktų daugiau konteksto.
- **Vertinimas ir tobulinimas:** Peržiūrėjęs grąžintus duomenis, modelis nusprendžia, ar informacija pakankama. Jei ne, jis tobulina užklausą, bando kitą įrankį arba keičia savo požiūrį.
- **Kartojimas, kol patenkintas:** Šis ciklas tęsiamas, kol modelis nusprendžia, kad turi pakankamai aiškumo ir įrodymų, kad pateiktų galutinį, gerai pagrįstą atsakymą.
- **Atmintis ir būsena:** Kadangi sistema palaiko būseną ir atmintį per žingsnius, ji gali prisiminti ankstesnius bandymus ir jų rezultatus, vengdama pasikartojančių kilpų ir priimdama labiau pagrįstus sprendimus tęsiant darbą.

Laikui bėgant, tai kuria supratimo pažangą, leidžiančią modeliui naviguoti sudėtingose, daugiapakopėse užduotyse be nuolatinės žmogaus intervencijos ar užklausos keitimo.

## Gedimų valdymas ir savitikra

Agentinės RAG autonomija taip pat apima tvirtas savitikros priemones. Kai sistema pasiekia aklavietę – pvz., surenka nereikšmingus dokumentus arba susiduria su netaisyklingomis užklausomis – ji gali:

- **Kartoti ir pakartotinai užduoti klausimus:** Vietoje žemos vertės atsakymų modelis bando naujas paieškos strategijas, perrašo duomenų bazės užklausas arba žiūri į alternatyvius duomenų rinkinius.
- **Naudoti diagnostinius įrankius:** Sistema gali iškviesti papildomas funkcijas, skirtas padėti jai taisyti samprotavimo žingsnius arba patvirtinti gautų duomenų taisyklingumą. Įrankiai, tokie kaip Azure AI Tracing, bus svarbūs užtikrinant patikimą stebėjimą ir monitoringą.
- **Remtis žmogaus priežiūra:** Svarbiuose ar pakartotinai nepavykstančiuose scenarijuose modelis gali pažymėti neaiškumus ir prašyti žmogaus pagalbos. Kai žmogus pateikia pataisomą atsiliepimą, modelis gali įtraukti šią pamoką į ateities veiksmus.

Šis iteracinis ir dinamiškas metodas leidžia modeliui nuolat tobulėti, užtikrinant, kad jis nėra vienkartinė sistema, bet mokosi iš savo klaidų per sesiją.

![Savitikros mechanizmas](../../../translated_images/lt/self-correction.da87f3783b7f174b.webp)

## Agentūros ribos

Nepaisant savarankiškumo užduotyje, Agentinė RAG nėra lygiavertė dirbtiniam bendrojo intelekto lygmeniui. Jos „agentinės“ galimybės apsiriboja įrankiais, duomenų šaltiniais ir taisyklėmis, kurias nustato žmonių kūrėjai. Ji negali sukurti savo įrankių ar išeiti už nustatytų srities ribų. Vietoje to, ji puikiai tvarko turimus išteklius dinamiškai.
Pagrindiniai skirtumai nuo pažangesnių DI formų apima:

1. **Srities specifinis savarankiškumas:** Agentinės RAG sistemos sutelktos į vartotojo nustatytų tikslų pasiekimą žinomoje srityje, naudodamos tokias strategijas kaip užklausų perrašymas ar įrankių pasirinkimas rezultatams gerinti.
2. **Priklausomybė nuo infrastruktūros:** Sistemos galimybės priklauso nuo įrankių ir duomenų, integruotų kūrėjų. Ji negali viršyti šių ribų be žmogaus įsikišimo.
3. **Taisyklių laikymasis:** Etinės gairės, atitikties taisyklės ir verslo politika išlieka labai svarbios. Agento laisvė visada yra ribojama saugumo priemonių ir priežiūros mechanizmų (tikėtina?).

## Praktiniai panaudojimo atvejai ir vertė

Agentinė RAG ypač naudinga situacijose, kur reikalingas iteracinis tobulinimas ir tikslumas:

1. **Taisyklingumo prioritetą turinčios aplinkos:** Atitikties patikrinimuose, reguliavimo analizėje ar teisinėse tyrimuose agentinis modelis gali pakartotinai tikrinti faktus, konsultuotis su keliomis šaltinių grandinėmis ir perrašyti užklausas, kol pateikiamas kruopščiai patikrintas atsakymas.
2. **Sudėtinga duomenų bazės sąveika:** Dirbdama su struktūruotais duomenimis, kuriuose užklausos dažnai gali nepavykti arba jas reikia reguliuoti, sistema savarankiškai tobulina užklausas, naudodama Azure SQL arba Microsoft Fabric OneLake, užtikrindama galutinio paieškos rezultato atitikimą vartotojo ketinimui.
3. **Išplėsti darbo srautai:** Ilgesni seansai gali vystytis, kaip atsiranda naujos informacijos. Agentinė RAG gali nuolat integruoti naujus duomenis, keisdama strategijas, kai geriau supranta problemos sritį.

## Valdymas, skaidrumas ir pasitikėjimas

Kadangi šios sistemos tampa autonomiškesnės savo samprotavimuose, valdymas ir skaidrumas yra labai svarbūs:

- **Paaiškinamas samprotavimas:** Modelis gali pateikti audito seką apie užklausas, kurias jis pateikė, šaltinius, kuriuos konsultavo, ir samprotavimo žingsnius, kuriuos atliko, siekdamas išvados. Įrankiai, tokie kaip Azure AI Content Safety ir Azure AI Tracing / GenAIOps, padeda palaikyti skaidrumą ir sumažinti riziką.
- **Šališkumo kontrolė ir subalansuota paieška:** Kūrėjai gali sureguliuoti paieškos strategijas, užtikrindami, kad būtų vertinami subalansuoti, reprezentatyvūs duomenų šaltiniai, ir reguliariai tikrinti išvedimus dėl šališkumo ar iškreiptų modelių, naudojant pritaikytus modelius pažangiems duomenų mokslo organizacijoms, naudojančioms Azure Machine Learning.
- **Žmogaus priežiūra ir atitiktis:** Svarbiose užduotyse žmogaus peržiūra lieka būtina. Agentinė RAG nepakeičia žmogaus sprendimo svarbiuose klausimuose – ji jį papildo pristatydama kruopščiai patikrintas alternatyvas.

Turėti įrankius, kurie suteikia aiškią veiksmų seką, yra būtina. Be jų, daugiapakopių procesų derinimas gali būti labai sudėtingas. Žr. toliau pateiktą literal AI (įmonės už Chainlit) agentų vykdymo pavyzdį:

![Agentų vykdymo pavyzdys](../../../translated_images/lt/AgentRunExample.471a94bc40cbdc0c.webp)

## Išvada

Agentinė RAG atspindi natūralų dirbtinio intelekto sistemų vystymąsi, kaip jos tvarko sudėtingas, duomenų intensyvias užduotis. Priimdama kilpinio sąveikos modelį, autonomiškai pasirinkdama įrankius ir tobulindama užklausas iki aukštos kokybės rezultato, sistema žengia toliau nei statinis užklausų vykdymas ir tampa lankstesniu, kontekstą suprantančiu sprendimų priėmėju. Nors vis dar ribojama žmogaus nustatytos infrastruktūros ir etikos gairių, šios agentinės galimybės leidžia kurti turtingesnes, dinamiškesnes ir galutiniams vartotojams bei įmonėms naudingesnes AI sąveikas.

### Turite daugiau klausimų apie Agentinę RAG?

Prisijunkite prie [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), susitikite su kitais besimokančiais, lankykite konsultacinius užsiėmimus ir gaukite atsakymus į klausimus apie AI Agentus.

## Papildomi šaltiniai
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Įgyvendinkite Retrieval Augmented Generation (RAG) su Azure OpenAI paslauga: sužinokite, kaip naudoti savo duomenis su Azure OpenAI paslauga. Šis Microsoft Learn modulis suteikia išsamų vadovą, kaip įgyvendinti RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Generatyviųjų AI programų vertinimas naudojant Microsoft Foundry: šiame straipsnyje aptariamas modelių vertinimas ir palyginimas pagal viešai prieinamus duomenų rinkinius, įskaitant Agentic AI programas ir RAG architektūras</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Kas yra Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Pilnas agentų pagrindu veikiančio retrieval augmented generation vadovas – Naujausia informacija iš generacijos RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: pagreitinkite savo RAG naudodami užklausų pertvarkymą ir savarankišką užklausų kūrimą! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Agentinių sluoksnių pridėjimas prie RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Žinių asistentų ateitis: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Kaip sukurti Agentic RAG sistemas</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Naudojant Microsoft Foundry agentų paslaugą savo AI agentų masteliui didinti</a>

### Akademiniai straipsniai

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iteratyvus tobulinimas su savianalize</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Kalbos agentai su žodiniu sustiprinamuoju mokymusi</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Dideli kalbos modeliai gali savarankiškai taisytis su įrankiais interaktyviai kritikuodami</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Apžvalga apie Agentic RAG</a>

## Ankstesnė pamoka

[Įrankių naudojimo dizaino šablonas](../04-tool-use/README.md)

## Kitas pamoka

[Patikimų AI agentų kūrimas](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Kritinei informacijai rekomenduojamas profesionalus žmogaus atliktas vertimas. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kilusius naudojant šį vertimą.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->