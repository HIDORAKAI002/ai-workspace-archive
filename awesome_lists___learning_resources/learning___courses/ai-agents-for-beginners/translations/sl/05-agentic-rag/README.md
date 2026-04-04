[![Agentic RAG](../../../translated_images/sl/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Kliknite na zgornjo sliko za ogled videa te lekcije)_

# Agentic RAG

Ta lekcija ponuja celovit pregled Agentic Retrieval-Augmented Generation (Agentic RAG), nastajajočega AI paradigme, kjer veliki jezikovni modeli (LLM) samostojno načrtujejo svoje naslednje korake, hkrati pa pridobivajo informacije iz zunanjih virov. V nasprotju z nestatičnimi vzorci iskanja in branja, Agentic RAG vključuje iterativne klice LLM, prepletajoče se s klici orodij ali funkcij ter strukturiranimi izhodi. Sistem ocenjuje rezultate, izpopolnjuje poizvedbe, po potrebi kliče dodatna orodja in nadaljuje ta cikel, dokler ne doseže zadovoljive rešitve.

## Uvod

V tej lekciji boste obravnavali

- **Razumevanje Agentic RAG:** Spoznajte nastajajočo paradigmo v AI, kjer veliki jezikovni modeli (LLM) samostojno načrtujejo svoje naslednje korake, hkrati pa pridobivajo informacije iz zunanjih podatkovnih virov.
- **Razumevanje Iterativnega sloga maker-checker:** Razumite zanko iterativnih klicev LLM, prepletenih s klici orodij ali funkcij ter strukturiranimi izhodi, zasnovanimi za izboljšanje pravilnosti in obravnavanje nepravilnih poizvedb.
- **Raziskovanje praktičnih uporab:** Prepoznajte scenarije, kjer Agentic RAG izstopa, kot so okolja, ki dajejo prednost pravilnosti, kompleksne interakcije z bazami podatkov in daljši delovni procesi.

## Cilji učenja

Po zaključku te lekcije boste znali/razumeli:

- **Razumevanje Agentic RAG:** Spoznajte nastajajočo paradigmo v AI, kjer veliki jezikovni modeli (LLM) samostojno načrtujejo svoje naslednje korake, hkrati pa pridobivajo informacije iz zunanjih podatkovnih virov.
- **Iterativni slog maker-checker:** Razumite koncept zanke iterativnih klicev LLM, prepletenih s klici orodij ali funkcij ter strukturiranimi izhodi, zasnovanimi za izboljšanje pravilnosti in obravnavanje nepravilnih poizvedb.
- **Prevzem nadzora nad procesom sklepanja:** Razumite sposobnost sistema, da prevzame nadzor nad svojim procesom sklepanja, pri čemer odloča, kako se lotiti problemov brez odvisnosti od predhodno določenih poti.
- **Delovni proces:** Razumite, kako agentni model samostojno odloča, da pridobi poročila o trgovanih trendih, identificira podatke o konkurentih, poveže notranje prodajne metrike, sintetizira ugotovitve in oceni strategijo.
- **Iterativne zanke, integracija orodij in pomnjenje:** Spoznajte zanašanje sistema na vzorec interakcij, ki je zanki prilegajoč, kar omogoča ohranjanje stanja in pomnjenja skozi korake, da se preprečijo ponavljajoče se zanke in sprejemajo informirane odločitve.
- **Obravnava načinov napak in samopopravki:** Raziskujte robustne mehanizme samopopravljanja sistema, vključno z iteracijami, ponovnimi poizvedbami, uporabo diagnostičnih orodij in zanašanjem na človeški nadzor.
- **Meje agentnosti:** Razumite omejitve Agentic RAG, ki se osredotočajo na domeninsko specifično avtonomijo, odvisnost od infrastrukture in spoštovanje varnostnih omejitev.
- **Praktični primeri uporabe in vrednost:** Prepoznajte scenarije, kjer Agentic RAG izstopa, kot so okolja, ki dajejo prednost pravilnosti, kompleksne interakcije z bazami podatkov in daljši delovni procesi.
- **Upravljanje, preglednost in zaupanje:** Spoznajte pomen upravljanja in preglednosti, vključno z razložljivim sklepnim procesom, nadzorom pristranskosti in človeškim nadzorom.

## Kaj je Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) je nastajajoča paradigma AI, kjer veliki jezikovni modeli (LLM) samostojno načrtujejo svoje naslednje korake medtem ko pridobivajo informacije iz zunanjih virov. V nasprotju z nestatičnimi vzorci iskanja in branja, Agentic RAG vključuje iterativne klice LLM, prepletajoče se z orodji ali klici funkcij ter strukturiranimi izhodi. Sistem ocenjuje rezultate, izpopolnjuje poizvedbe, po potrebi kliče dodatna orodja in nadaljuje ta cikel, dokler ne doseže zadovoljive rešitve. Ta iterativni "maker-checker" slog izboljšuje pravilnost, obravnava nepravilne poizvedbe in zagotavlja visokokakovostne rezultate.

Sistem aktivno prevzema nadzor nad svojim procesom sklepanja, prepisuje neuspešne poizvedbe, izbira različne metode iskanja in integrira več orodij — kot so vektorsko iskanje v Azure AI Search, SQL baze podatkov ali lastne API-je — preden zaključi svoj odgovor. Kar razlikuje agentni sistem, je njegova sposobnost, da prevzame nadzor nad procesom sklepanja. Tradicionalne implementacije RAG se zanašajo na predhodno določene poti, medtem ko agentni sistem samostojno določa zaporedje korakov glede na kakovost najdenih informacij.

## Določitev Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) je nastajajoča paradigma razvoja AI, kjer LLM ne le izvleče informacije iz zunanjih podatkovnih virov, temveč tudi samostojno načrtuje svoje naslednje korake. V nasprotju z nestatičnimi vzorci iskanja in branja ali skrbno načrtovanimi zaporedji pozivov, Agentic RAG vključuje zanko iterativnih klicev LLM, prepletenih s klici orodij ali funkcij in strukturiranimi izhodi. Pri vsakem koraku sistem ocenjuje rezultate, odloča, ali bo izpopolnil poizvedbe, kliče dodatna orodja po potrebi in nadaljuje ta cikel, dokler ne doseže zadovoljive rešitve.

Ta iterativni "maker-checker" način delovanja je zasnovan za izboljšanje pravilnosti, obravnavanje nepravilnih poizvedb do strukturiranih baz podatkov (npr. NL2SQL) in zagotavljanje uravnoteženih, visokokakovostnih rezultatov. Namesto da bi se zanašal zgolj na skrbno zasnovane verige pozivov, sistem aktivno prevzema nadzor nad svojim procesom sklepanja. Lahko prepiše poizvedbe, ki niso uspešne, izbere različne metode iskanja in integrira več orodij — kot so vektorsko iskanje v Azure AI Search, SQL baze podatkov ali lastne API-je — preden zaključi svoj odgovor. To odpravlja potrebo po zapletenih orodjih za orkestracijo. Namesto tega lahko relativno preprosta zanka "klic LLM → uporaba orodja → klic LLM → ..." prinese sofisticirane in dobro utemeljene izhode.

![Agentic RAG Core Loop](../../../translated_images/sl/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Prevzem nadzora nad procesom sklepanja

Razpoznavna lastnost, ki sistem naredi "agentnega", je njegova sposobnost, da prevzame nadzor nad svojim procesom sklepanja. Tradicionalne implementacije RAG pogosto temeljijo na tem, da ljudje vnaprej določijo pot modela: verigo razmišljanja, ki določa, kaj iskati in kdaj.
Ko pa je sistem resnično agenten, se notranje odloči, kako se lotiti problema. Ne izvaja samo skripte; samostojno določa zaporedje korakov glede na kakovost najdenih informacij.
Na primer, če ga prosijo, naj ustvari strategijo lansiranja izdelka, se ne zanaša zgolj na poziv, ki opisuje celoten raziskovalni in odločilni proces. Namesto tega agentni model samostojno odloči, da:

1. Pridobi trenutno poročilo o tržnih trendih s pomočjo Bing Web Grounding
2. Identificira relevantne podatke o konkurentih z uporabo Azure AI Search.
3. Poveže zgodovinske notranje prodajne metrike z uporabo Azure SQL Database.
4. Sintetizira ugotovitve v skladno strategijo, orkestrirano preko Azure OpenAI Service.
5. Ocenjuje strategijo glede vrzeli ali neskladnosti in po potrebi sproži nov krog iskanja.
Vsi ti koraki — izpopolnjevanje poizvedb, izbiranje virov, iteriranje dokler ni "zadovoljen" z odgovorom — so odločitve modela, ne vnaprej narejene s strani človeka.

## Iterativne zanke, integracija orodij in pomnjenje

![Tool Integration Architecture](../../../translated_images/sl/tool-integration.0f569710b5c17c10.webp)

Agentni sistem se zanaša na vzorec interakcije z zanko:

- **Začetni klic:** Cilj uporabnika (tudi poziv uporabnika) se predstavi LLM.
- **Klic orodja:** Če model ugotovi, da manjkajo informacije ali so navodila nejasna, izbere orodje ali metodo iskanja — kot je poizvedba v vektorski bazi podatkov (npr. hibridno iskanje Azure AI Search preko zasebnih podatkov) ali strukturiran SQL klic — za pridobitev več konteksta.
- **Ocenjevanje in izpopolnjevanje:** Po pregledu vrnjenih podatkov model odloči, ali so informacije zadostne. Če ne, izpopolni poizvedbo, preizkusi drugo orodje ali prilagodi svoj pristop.
- **Ponavljanje dokler ni zadovoljno:** Cikel se nadaljuje, dokler model ne ugotovi, da ima dovolj jasnosti in dokazov, da lahko poda končni, dobro premisljen odgovor.
- **Pomnjenje in stanje:** Ker sistem ohranja stanje in pomnjenje preko korakov, si lahko zapomni prejšnje poskuse in njihove rezultate, s čimer se izogne ponavljajočim zankam in sprejema bolj informirane odločitve naprej.

Sčasoma to ustvarja občutek razvijajočega razumevanja, kar modelu omogoča navigacijo skozi kompleksne, večstopenjske naloge brez potrebe po stalni človeški intervenciji ali spreminjanju pozivov.

## Obravnava načinov napak in samopopravki

Avtonomija Agentic RAG vključuje tudi robustne mehanizme samopopravljanja. Ko sistem naleti na slepe ulice — kot so pridobivanje nepomembnih dokumentov ali srečevanje nepravilnih poizvedb — lahko:

- **Iterira in ponovi poizvedbo:** Namesto da vrača nizko vrednostne odgovore, model preizkuša nove strategije iskanja, prepisuje poizvedbe v bazah podatkov ali pregleduje alternativne nize podatkov.
- **Uporablja diagnostična orodja:** Sistem lahko kliče dodatne funkcije, zasnovane za pomoč pri razhroščevanju svojih sklepnih korakov ali potrjevanju pravilnosti pridobljenih podatkov. Orodja, kot je Azure AI Tracing, bodo pomembna za omogočanje robustne opaznosti in spremljanja.
- **Zanaša se na človeški nadzor:** Pri nalogah z visokim tveganjem ali ponavljajočih se neuspehih lahko model označi negotovost in zahteva človeško pomoč. Ko ljudje zagotovijo korektivne povratne informacije, jih model lahko pri nadaljnjem delu upošteva.

Ta iterativni in dinamični pristop omogoča modelu stalno izboljševanje, s čimer zagotavlja, da ni le sistem za enkratno rabo, ampak se uči iz svojih napak med posamezno sejo.

![Self Correction Mechanism](../../../translated_images/sl/self-correction.da87f3783b7f174b.webp)

## Meje agentnosti

Kljub svoji avtonomiji znotraj naloge Agentic RAG ni enakovreden umetni splošni inteligenci. Njegove "agentne" zmožnosti so omejene na orodja, podatkovne vire in politike, ki so jih določili ljudje razvijalci. Ne more izumiti lastnih orodij ali preseči domennih mej, ki so bile določene. Namesto tega odlično orkestrira razpoložljive vire.
Ključne razlike od bolj naprednih oblik AI so:

1. **Domeninsko specifična avtonomija:** Agentic RAG sistemi se osredotočajo na doseganje ciljev, določenih s strani uporabnika, znotraj znane domene, z uporabo strategij, kot je prepisovanje poizvedb ali izbira orodij za izboljšanje rezultatov.
2. **Odvisnost od infrastrukture:** Zmožnosti sistema so odvisne od orodij in podatkov, ki jih integrirajo razvijalci. Teh meja ne more preseči brez človeške intervencije.
3. **Spoštovanje varnostnih omejitev:** Etična priporočila, pravila skladnosti in poslovne politike ostajajo zelo pomembni. Svoboda agenta je vedno omejena s varnostnimi ukrepi in mehanizmi nadzora (upajmo da?).

## Praktični primeri uporabe in vrednost

Agentic RAG izstopa v scenarijih, ki zahtevajo iterativno izpopolnjevanje in natančnost:

1. **Okolja, ki dajejo prednost pravilnosti:** Pri skladnostnih pregledih, regulativnih analizah ali pravnem raziskovanju lahko agentni model večkrat preveri dejstva, povpraša različne vire in prepiše poizvedbe, dokler ne zagotovi temeljito preverjenega odgovora.
2. **Kompleksne interakcije z bazami podatkov:** Ko gre za strukturirane podatke, kjer poizvedbe pogosto ne uspejo ali jih je treba prilagoditi, lahko sistem samostojno izpopolni svoje poizvedbe z uporabo Azure SQL ali Microsoft Fabric OneLake, pri čemer zagotovi, da je končni rezultat usklajen z namenom uporabnika.
3. **Daljši delovni procesi:** Daljša trajanja sej se lahko razvijajo, ko se pojavijo nove informacije. Agentic RAG lahko stalno vključuje nove podatke in spreminja strategije, ko se nauči več o problematičnem prostoru.

## Upravljanje, preglednost in zaupanje

Ko ti sistemi postajajo bolj avtonomni v svojem sklepanju, so upravljanje in preglednost ključni:

- **Razložljivo sklepanje:** Model lahko zagotovi revizijsko sled poizvedb, ki jih je naredil, virov, ki jih je povprašal, in sklepnih korakov, ki jih je izvedel, da doseže svoj zaključek. Orodja, kot sta Azure AI Content Safety in Azure AI Tracing / GenAIOps, lahko pomagajo ohranjati preglednost in zmanjševati tveganja.
- **Nadzor pristranskosti in uravnoteženo iskanje:** Razvijalci lahko prilagodijo strategije iskanja, da zagotovijo upoštevanje uravnoteženih in reprezentativnih virov podatkov ter redno preverjajo izhode, da odkrijejo pristranskosti ali izkrivljene vzorce z uporabo prilagojenih modelov za napredne organizacije za podatkovno znanost, ki uporabljajo Azure Machine Learning.
- **Človeški nadzor in skladnost:** Za občutljive naloge je potreben človeški pregled. Agentic RAG ne nadomešča človeške presoje pri odločitvah z visokimi vložki — temveč jo dopolnjuje z zagotavljanjem bolj temeljito preverjenih možnosti.

Imeti orodja, ki zagotavljajo jasen zapis dejanj, je bistveno. Brez njih je odpravljanje napak v večstopenjskem postopku zelo težko. Oglejte si naslednji primer iz Literal AI (podjetja za Chainlit) za zagon agenta:

![AgentRunExample](../../../translated_images/sl/AgentRunExample.471a94bc40cbdc0c.webp)

## Zaključek

Agentic RAG predstavlja naravno evolucijo v načinu, kako AI sistemi obravnavajo kompleksne, podatkovno intenzivne naloge. Z uvedbo vzorca interakcije v zanki, samostojno izbiro orodij ter izpopolnjevanjem poizvedb do doseganja visokokakovostnega rezultata se sistem premakne onkraj statičnega sledenja pozivom v bolj prilagodljivega, kontekstno ozaveščenega odločevalca. Čeprav je še vedno omejen s človeško določenimi infrastrukturnimi in etičnimi smernicami, te agentne zmožnosti omogočajo bogatejše, bolj dinamične in končno bolj uporabne AI interakcije tako za podjetja kot končne uporabnike.

### Imate več vprašanj o Agentic RAG?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord), da se povežete z drugimi učenci, udeležite uradnih ur in dobite odgovore na vprašanja o AI agentih.

## Dodatni viri
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementacija Retrieval Augmented Generation (RAG) z Azure OpenAI Service: Naučite se, kako uporabljati svoje podatke z Azure OpenAI Service. Ta Microsoft Learn modul ponuja celovit vodič za izvajanje RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Ocena generativnih AI aplikacij z Microsoft Foundry: Ta članek obravnava ocenjevanje in primerjavo modelov na javno dostopnih podatkovnih nizih, vključno z Agentic AI aplikacijami in RAG arhitekturami</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Kaj je Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Celovit vodič po agentno temelječem Retrieval Augmented Generation – Novice iz generacije RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: pospešite svoj RAG z reformulacijo poizvedb in samopreiskovanjem! Hugging Face odprtokodni AI kuharski priročnik</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Dodajanje agentnih plasti k RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Prihodnost asistenta za znanje: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Kako zgraditi agentne RAG sisteme</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Uporaba Microsoft Foundry Agent Service za razširitev vaših AI agentov</a>

### Akademske Objave

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterativno izboljševanje z lastno povratno informacijo</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Jezikovni agenti z verbalnim okrepitvenim učenjem</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Veliki jezikovni modeli se lahko sami popravljajo z interaktivnim kritiziranjem orodij</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Pregled agentno temelječega RAG</a>

## Prejšnja Lekcija

[Oblika uporabe orodja](../04-tool-use/README.md)

## Naslednja Lekcija

[Gradnja zanesljivih AI agentov](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo storitve za avtomatski prevod [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za točnost, upoštevajte, da lahko avtomatski prevodi vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvor­nem jeziku velja za avtoritativni vir. Za pomembne informacije priporočamo strokovni človeški prevod. Za morebitna nesporazume ali napačne razlage, ki izhajajo iz uporabe tega prevoda, ne odgovarjamo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->