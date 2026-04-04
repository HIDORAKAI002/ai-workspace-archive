[![Agentic RAG](../../../translated_images/tl/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(I-click ang larawan sa itaas upang mapanood ang video ng araling ito)_

# Agentic RAG

Nagbibigay ang araling ito ng komprehensibong pangkalahatang ideya ng Agentic Retrieval-Augmented Generation (Agentic RAG), isang umuusbong na paradigma sa AI kung saan ang malalaking modelo ng wika (LLMs) ay awtonomong nagbabalangkas ng kanilang mga susunod na hakbang habang kumukuha ng impormasyon mula sa mga panlabas na pinagkukunan. Hindi tulad ng mga static na pattern na retrieval-then-read, ang Agentic RAG ay kinabibilangan ng paulit-ulit na pagtawag sa LLM, na sinasabayan ng pagtawag sa mga tool o function at mga istrukturadong output. Sinusuri ng sistema ang mga resulta, pinapino ang mga query, tumatawag ng karagdagang mga tool kung kinakailangan, at ipinagpapatuloy ang siklong ito hanggang sa makamit ang kasiya-siyang solusyon.

## Panimula

Saklaw ng araling ito ang

- **Unawain ang Agentic RAG:** Matutunan ang tungkol sa umuusbong na paradigma sa AI kung saan ang malalaking modelo ng wika (LLMs) ay awtonomong nagbabalangkas ng kanilang mga susunod na hakbang habang kumukuha ng impormasyon mula sa mga panlabas na pinagkukunan ng data.
- **Unawain ang Iterative Maker-Checker Style:** Maunawaan ang siklo ng paulit-ulit na pagtawag sa LLM, na sinasabayan ng pagtawag sa mga tool o function at istrukturadong mga output, na idinisenyo upang mapabuti ang katumpakan at hawakan ang mga mali ang pagkakaayos na mga query.
- **Siyasatin ang Mga Praktikal na Aplikasyon:** Tukuyin ang mga senaryo kung saan nangunguna ang Agentic RAG, gaya ng mga kapaligirang nakatuon sa pagiging tama, kumplikadong pakikipag-ugnayan sa database, at pinalawig na mga workflow.

## Mga Layunin sa Pagkatuto

Pagkatapos matapos ang araling ito, malalaman mo/kakaintindihan mo ang:

- **Pag-unawa sa Agentic RAG:** Matutunan ang tungkol sa umuusbong na paradigma sa AI kung saan ang malalaking modelo ng wika (LLMs) ay awtonomong nagbabalangkas ng kanilang mga susunod na hakbang habang kumukuha ng impormasyon mula sa mga panlabas na pinagkukunan ng data.
- **Iterative Maker-Checker Style:** Unawain ang konsepto ng siklo ng paulit-ulit na pagtawag sa LLM, na sinasabayan ng pagtawag sa mga tool o function at istrukturadong mga output, na idinisenyo upang mapabuti ang katumpakan at hawakan ang mga mali ang pagkakaayos na mga query.
- **Pagmamay-ari sa Proseso ng Pangangatwiran:** Maunawaan ang kakayahan ng sistema na pagmamay-ari ang proseso ng paghuhusga nito, na gumagawa ng mga desisyon kung paano lapitan ang mga problema nang hindi umaasa sa mga paunang itinakdang daan.
- **Workflow:** Unawain kung paano ang isang agentic na modelo ay magpapasya nang mag-isa na kumuha ng mga ulat tungkol sa mga trend sa merkado, tukuyin ang datos ng kakumpitensya, pag-ugnayin ang panloob na mga sukatan ng benta, buuin ang mga natuklasan, at suriin ang diskarte.
- **Iterative Loops, Pagsasama ng Tool, at Memorya:** Matutunan ang tungkol sa pag-asa ng sistema sa isang looped na pattern ng interaksyon, pagpapanatili ng estado at memorya sa bawat hakbang upang maiwasan ang paulit-ulit na siklo at makagawa ng mga may pinagbatayang desisyon.
- **Paghawak sa Mga Failure Mode at Self-Correction:** Siyasatin ang matatag na mga mekanismo ng sariling pagwawasto ng sistema, kabilang ang pag-uulit at muling pagtatanong, paggamit ng mga diagnostic na tool, at pagbalik sa pangangalaga ng tao.
- **Mga Hangganan ng Kagalingan:** Unawain ang mga limitasyon ng Agentic RAG, na nakatuon sa espesipikong awtonomiya sa domain, pag-asa sa imprastraktura, at paggalang sa mga guardrail.
- **Praktikal na Mga Gamit at Halaga:** Tukuyin ang mga senaryo kung saan nangunguna ang Agentic RAG, gaya ng mga kapaligirang nakatuon sa pagiging tama, kumplikadong pakikipag-ugnayan sa database, at pinalawig na mga workflow.
- **Pamamahala, Transparency, at Tiwala:** Matutunan ang kahalagahan ng pamamahala at transparency, kasama ang paliwanag sa pangangatwiran, kontrol sa pagkiling, at pangangalaga ng tao.

## Ano ang Agentic RAG?

Ang Agentic Retrieval-Augmented Generation (Agentic RAG) ay isang umuusbong na paradigma ng AI kung saan ang malalaking modelo ng wika (LLMs) ay awtonomong nagpaplano ng kanilang mga susunod na hakbang habang kumukuha ng impormasyon mula sa mga panlabas na pinagkukunan. Hindi tulad ng mga static na pattern na retrieval-then-read, ang Agentic RAG ay kinabibilangan ng paulit-ulit na pagtawag sa LLM, na sinasabayan ng pagtawag sa mga tool o function at istrukturadong mga output. Sinusuri ng sistema ang mga resulta, pinapino ang mga query, tumatawag ng karagdagang mga tool kung kinakailangan, at ipinagpapatuloy ang siklong ito hanggang makamit ang kasiya-siyang solusyon. Ang paulit-ulit na “maker-checker” na estilo ay nagpapabuti sa katumpakan, humahawak sa mga maling pagkakaayos ng mga query, at nagsisiguro ng mataas na kalidad na mga resulta.

Aktibong pinamamahalaan ng sistema ang proseso ng pangangatwiran nito, nire-rewrite ang mga nabigong query, pumipili ng ibang mga pamamaraan ng retrieval, at pinagsasama-sama ang maraming mga tool—katulad ng vector search sa Azure AI Search, mga database ng SQL, o custom na API—bago tapusin ang sagot nito. Ang natatanging katangian ng isang agentic na sistema ay ang kakayahan nitong pagmamay-ari ang proseso ng pangangatwiran nito. Ang mga tradisyunal na implementasyon ng RAG ay umaasa sa mga paunang itinakdang daan, ngunit ang isang agentic na sistema ay awtonomong tumutukoy sa pagkakasunod-sunod ng mga hakbang batay sa kalidad ng impormasyong nahanap nito.

## Pagpapakahulugan sa Agentic Retrieval-Augmented Generation (Agentic RAG)

Ang Agentic Retrieval-Augmented Generation (Agentic RAG) ay isang umuusbong na paradigma sa pagbuo ng AI kung saan ang mga LLM ay hindi lamang kumukuha ng impormasyon mula sa mga panlabas na pinagkukunan ng data kundi awtonomong nagpaplano rin ng kanilang mga susunod na hakbang. Hindi tulad ng mga static na pattern na retrieval-then-read o mga maingat na isincrip na pagkakasunod-sunod ng prompt, ang Agentic RAG ay kinabibilangan ng siklo ng paulit-ulit na pagtawag sa LLM, na sinasabayan ng pagtawag sa mga tool o function at mga istrukturadong output. Sa bawat hakbang, sinusuri ng sistema ang mga resulta na nakuha nito, nagpapasya kung kailangang pinuhin ang mga query, tumatawag ng karagdagang mga tool kung kinakailangan, at ipinagpapatuloy ang siklo hanggang sa makamit ang kasiya-siyang solusyon.

Ang paulit-ulit na “maker-checker” na estilo ng operasyon ay idinisenyo upang mapabuti ang katumpakan, humawak sa mga maling pagkakaayos ng query papunta sa mga istrukturadong database (hal. NL2SQL), at tiyakin ang balanseng, mataas na kalidad na mga resulta. Sa halip na umasa lamang sa maingat na dinisenyong mga chain ng prompt, aktibong pinamamahalaan ng sistema ang proseso ng pangangatwiran nito. Maaari nitong i-rewrite ang mga nabigong query, pumili ng ibang mga pamamaraan ng retrieval, at pagsamahin ang maraming mga tool—katulad ng vector search sa Azure AI Search, mga database ng SQL, o custom na API—bago tapusin ang sagot. Tinatanggal nito ang pangangailangan para sa masyadong kumplikadong mga orchestration framework. Sa halip, isang medyo simpleng siklo ng “LLM call → tool use → LLM call → …” ang maaaring makabunga ng sopistikado at matatag na mga output.

![Agentic RAG Core Loop](../../../translated_images/tl/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Pagmamay-ari sa Proseso ng Pangangatwiran

Ang natatanging katangian na nagpapahayag na ang isang sistema ay “agentic” ay ang kakayahan nitong pagmamay-ari ang proseso ng pangangatwiran nito. Kadalasang umaasa ang tradisyunal na mga implementasyon ng RAG sa mga tao na magtakda ng daan para sa modelo: isang chain-of-thought na naglalarawan kung ano ang kukunin at kailan.
Ngunit kapag tunay na agentic ang sistema, internal nitong pinipili kung paano lapitan ang problema. Hindi lang ito basta nagpapatupad ng script; awtonomong tinutukoy nito ang pagkakasunod-sunod ng mga hakbang batay sa kalidad ng impormasyong nahanap nito.
Halimbawa, kung ito ay inatasang gumawa ng estratehiya para sa paglulunsad ng produkto, hindi ito umaasa lamang sa isang prompt na nagsasalaysay ng buong workflow ng pananaliksik at paggawa ng desisyon. Sa halip, ang agentic na modelo ay nagpasya nang mag-isa na:

1. Kunin ang mga kasalukuyang ulat ng mga trend sa merkado gamit ang Bing Web Grounding
2. Tukuyin ang mga kaugnay na datos ng kakumpitensya gamit ang Azure AI Search.
3. Iugnay ang mga historikal na panloob na sukatan ng benta gamit ang Azure SQL Database.
4. Isynthesize ang mga natuklasan sa isang magkakaugnay na estratehiya na inorganisa sa pamamagitan ng Azure OpenAI Service.
5. Suriin ang estratehiya para sa mga kakulangan o hindi pagkakatugma, at mag-prompt ng isa pang pagkuha kung kinakailangan.
Lahat ng mga hakbang na ito—pagpino ng mga query, pagpili ng mga pinagkukunan, pag-uulit hanggang sa maging “kontento” sa sagot—ay pinipili ng modelo, hindi isincrip ng tao.

## Iterative Loops, Pagsasama ng Tool, at Memorya

![Tool Integration Architecture](../../../translated_images/tl/tool-integration.0f569710b5c17c10.webp)

Umaasa ang isang agentic na sistema sa isang looped na pattern ng interaksyon:

- **Pangunahing Tawag:** Ipinapasa ang layunin ng gumagamit (aka. user prompt) sa LLM.
- **Pagtawag sa Tool:** Kung natukoy ng modelo na may kulang na impormasyon o malabong mga tagubilin, pipili ito ng tool o paraan ng retrieval—gaya ng vector database query (hal. Azure AI Search Hybrid search sa pribadong data) o isang istrukturadong tawag sa SQL—upang makakuha ng mas maraming konteksto.
- **Pagsusuri at Pagpino:** Pagkatapos suriin ang ibinalik na data, nagpapasya ang modelo kung sapat ba ang impormasyon. Kung hindi, pinapino nito ang query, sinusubukang ibang tool, o inaayos ang lapit nito.
- **Ulitin Hanggang Maging Kontento:** Ipinagpapatuloy ang siklong ito hanggang matukoy ng modelo na sapat na ang kaliwanagan at ebidensya upang magbigay ng pangwakas at may pangatwirang sagot.
- **Memorya at Estado:** Dahil pinananatili ng sistema ang estado at memorya sa bawat hakbang, maalala nito ang mga naunang pagtatangka at kanilang mga resulta, iniiwasan ang paulit-ulit na siklo at nakakagawa ng mas pinagbatayang mga desisyon habang nagpapatuloy.

Sa paglipas ng panahon, lumilikha ito ng pakiramdam ng umuunlad na pag-unawa, na nagpapahintulot sa modelo na mag-navigate ng kumplikado, multi-step na mga gawain nang hindi kinakailangang palaging manghimasok o muling baguhin ang prompt ng tao.

## Paghawak sa Mga Failure Mode at Self-Correction

Kasama rin sa awtonomiya ng Agentic RAG ang matatag na mga mekanismo ng sariling pagwawasto. Kapag naabot ng sistema ang mga dead end—gaya ng pagkuha ng mga hindi kaugnay na dokumento o pagharap sa maling pagkakaayos ng mga query—maaari itong:

- **Ulitin at Muling Mag-Query:** Sa halip na magbigay ng mababang halaga na mga sagot, sinusubukan ng modelo ang mga bagong estratehiya sa paghahanap, nire-rewrite ang mga query sa database, o tinitingnan ang mga alternatibong set ng data.
- **Gumamit ng Diagnostic na Mga Tool:** Maaari itong tumawag ng karagdagang mga function na idinisenyo upang tulungan itong i-debug ang mga hakbang ng pangangatwiran nito o tiyakin ang katumpakan ng mga nakuha na data. Mahalaga ang mga tool tulad ng Azure AI Tracing upang mapagana ang malakas na obserbasyon at monitoring.
- **Pagbalik sa Pangangalaga ng Tao:** Para sa mga sensitibong sitwasyon o paulit-ulit na nabibigo, maaaring mag-flag ang modelo ng kawalang-katiyakan at humingi ng gabay mula sa tao. Kapag nagbigay ng korektibong feedback ang tao, maipapasok ito ng modelo bilang aral sa mga susunod na pagkakataon.

Pinapayagan ng paulit-ulit at dinamikong lapit na ito ang modelo na patuloy na umunlad, tiniyak na hindi lang ito isang one-shot na sistema kundi isang sistema na natututo mula sa mga pagkakamali nito sa isang sesyon.

![Self Correction Mechanism](../../../translated_images/tl/self-correction.da87f3783b7f174b.webp)

## Mga Hangganan ng Kagalingan

Sa kabila ng awtonomiya nito sa loob ng isang gawain, hindi katulad ng Agentic RAG ang Artificial General Intelligence. Ang mga “agentic” nitong kakayahan ay nakapaloob lamang sa mga tool, pinagkukunan ng data, at mga polisiya na ibinigay ng mga tao. Hindi nito maaaring imbentuhin ang sarili nitong mga tool o lumabas sa mga hangganan ng domain na itinakda. Sa halip, mahusay itong mag-organisa nang dinamiko ng mga yaman na nasa kamay.

Mga pangunahing pagkakaiba mula sa mas advanced na anyo ng AI ay kinabibilangan ng:

1. **Espesipikong Awtonomiya sa Domain:** Nakatuon ang mga Agentic RAG system sa pagtamo ng mga layuning itinakda ng gumagamit sa loob ng kilalang domain, gumagamit ng mga estratehiya tulad ng pag-rewrite ng query o pagpili ng tool upang mapabuti ang mga resulta.
2. **Nakasandig sa Imprastraktura:** Nakabatay ang kakayahan ng sistema sa mga tools at data na isinama ng mga developer. Hindi nito malalampasan ang mga hangganang ito nang walang pakikialam ng tao.
3. **Paggalang sa Mga Guardrail:** Mananatiling mahalaga ang mga etikal na alituntunin, mga panuntunan ng pagsunod, at mga polisiya sa negosyo. Ang kalayaan ng ahente ay palaging nililimitahan ng mga hakbang sa kaligtasan at mga mekanismo ng pangangalaga (sana).

## Mga Praktikal na Gamit at Halaga

Namumukod-tangi ang Agentic RAG sa mga senaryong nangangailangan ng paulit-ulit na pagpipino at katumpakan:

1. **Mga Kapaligirang Nakatuon sa Katumpakan:** Sa mga pagsuri sa pagsunod, pagsusuri sa regulasyon, o pananaliksik legal, maaaring paulit-ulit na beripikahin ng agentic na modelo ang mga katotohanan, kumonsulta sa maraming pinagkukunan, at i-rewrite ang mga query hanggang makabuo ng ganap na nasuring sagot.
2. **Kumplikadong Pakikipag-ugnayan sa Database:** Kapag humaharap sa istrukturadong data kung saan madalas na nabibigo o kailangang baguhin ang mga query, maaaring awtonomong i-refine ng sistema ang mga query nito gamit ang Azure SQL o Microsoft Fabric OneLake, tiniyak ang huling retrieval na naaayon sa layunin ng gumagamit.
3. **Pinalawig na Mga Workflow:** Maaaring umunlad ang mga mas mahabang session habang lumalabas ang bagong impormasyon. Patuloy na isinasama ng Agentic RAG ang mga bagong data, inaalis ang mga estratehiya habang natututo ng higit tungkol sa espasyo ng problema.

## Pamamahala, Transparency, at Tiwala

Habang ang mga sistemang ito ay nagiging mas awtonomo sa kanilang pangangatwiran, napakahalaga ang pamamahala at transparency:

- **Paliwanag sa Pangangatwiran:** Maaaring magbigay ang modelo ng audit trail ng mga query na ginawa nito, mga pinagkunan na kinonsulta, at mga hakbang ng pangangatwiran na ginawa upang maabot ang kongklusyon nito. Makakatulong ang mga tool tulad ng Azure AI Content Safety at Azure AI Tracing / GenAIOps upang mapanatili ang transparency at mabawasan ang mga panganib.
- **Kontrol sa Pagkiling at Balanseng Retrieval:** Maaaring i-tune ng mga developer ang mga estratehiya sa retrieval upang matiyak na balanseng, kinatawan, at wastong pinagkukunan ng data ang isinasaalang-alang, at regular na i-audit ang mga output upang matukoy ang pagkiling o nanlilihis na pattern gamit ang mga custom na modelo para sa mga advanced na organisasyong agham ng datos na gumagamit ng Azure Machine Learning.
- **Pangangalaga ng Tao at Pagsunod:** Para sa mga sensitibong gawain, nananatiling mahalaga ang pagsusuri ng tao. Hindi pinapalitan ng Agentic RAG ang paghatol ng tao sa mga desisyong may mataas na taya—pinapahusay nito iyon sa pamamagitan ng paghahatid ng mas masusing nasuring mga opsyon.

Mahalagang magkaroon ng mga tool na nagbibigay ng malinaw na rekord ng mga aksyon. Kung wala ang mga ito, magiging napakahirap i-debug ang multi-step na proseso. Tingnan ang sumusunod na halimbawa mula sa Literal AI (kompanyang nasa likod ng Chainlit) para sa isang Agent run:

![AgentRunExample](../../../translated_images/tl/AgentRunExample.471a94bc40cbdc0c.webp)

## Konklusyon

Kinakatawan ng Agentic RAG ang isang likas na ebolusyon sa paraan kung paano hinahawakan ng mga sistema ng AI ang mga kumplikado, data-intensive na gawain. Sa pamamagitan ng pagsasakatuparan ng isang looped na pattern ng interaksyon, awtonomong pagpili ng mga tool, at pagpipino ng mga query hanggang makamit ang mataas na kalidad na resulta, lumalagpas ang sistema sa mga static na pagsunod sa prompt patungo sa isang mas adaptive, may kamalayang konteksto na tagagawa ng desisyon. Bagaman nakapaloob pa rin sa mga imprastrakturang itinakda ng tao at mga etikal na alituntunin, ang mga kakayahang agentic na ito ay nagpapahintulot ng mas mayaman, mas dinamiko, at sa huli ay mas kapaki-pakinabang na mga interaksyon sa AI para sa parehong mga negosyo at mga end-user.

### May Karagdagang Mga Tanong tungkol sa Agentic RAG?

Sumali sa [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) upang makipagkilala sa iba pang mga nag-aaral, dumalo sa mga office hours, at masagot ang iyong mga tanong tungkol sa AI Agents.

## Karagdagang Mga Mapagkukunan
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Ipatupad ang Retrieval Augmented Generation (RAG) gamit ang Azure OpenAI Service: Matutunan kung paano gamitin ang sarili mong data sa Azure OpenAI Service. Ang Microsoft Learn module na ito ay nagbibigay ng komprehensibong gabay sa pagpapatupad ng RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Pagsusuri ng mga generative AI application sa Microsoft Foundry: Tinatalakay ng artikulong ito ang pagsusuri at paghahambing ng mga modelo sa mga pampublikong dataset, kabilang ang Agentic AI application at RAG architecture</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Ano ang Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Isang Kumpletong Gabay sa Agent-Based Retrieval Augmented Generation – Balita mula sa generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: palakasin ang iyong RAG gamit ang query reformulation at self-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Pagdaragdag ng Agentic Layers sa RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Ang Kinabukasan ng Knowledge Assistants: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Paano Bumuo ng Agentic RAG Systems</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Paggamit ng Microsoft Foundry Agent Service upang palakihin ang iyong mga AI agent</a>

### Mga Akademikong Papel

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterative Refinement with Self-Feedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Language Agents with Verbal Reinforcement Learning</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Isang Survey sa Agentic RAG</a>

## Nakaraang Aralin

[Tool Use Design Pattern](../04-tool-use/README.md)

## Susunod na Aralin

[Pagbuo ng Mapagkakatiwalaang AI Agents](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pahayag ng Pagsuway**:
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo sa pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat aming pinagsisikapang maging tumpak, mangyaring tandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o di-tumpak na impormasyon. Ang orihinal na dokumento sa kanyang wikang pinagmulan ang dapat ituring na pangunahin at opisyal na sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasaling-tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->