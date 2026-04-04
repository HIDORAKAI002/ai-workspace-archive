[![Agentic RAG](../../../translated_images/sw/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Bonyeza picha iliyo juu kutazama video ya somo hili)_

# Agentic RAG

Somo hili linatoa muhtasari kamili wa Agentic Retrieval-Augmented Generation (Agentic RAG), mtindo mpya wa AI ambapo mifano mikubwa ya lugha (LLMs) huandaa kwa kujitegemea hatua zao zinazofuata wakati wakichukua taarifa kutoka kwa vyanzo vya nje. Tofauti na mifumo ya kawaida ya kutafuta kisha kusoma, Agentic RAG inahusisha miito ya kurudiwa kwa LLM, ikijumlishwa na miito ya zana au kazi na matokeo yaliyo na muundo. Mfumo huu huchambua matokeo, huboresha maswali, hutumia zana za ziada ikiwa zinahitajika, na kuendelea mzunguko huu hadi suluhisho linaloridhisha lifanikishwe.

## Utangulizi

Somo hili litashughulikia

- **Kuelewa Agentic RAG:** Jifunze kuhusu mtindo mpya wa AI ambapo mifano mikubwa ya lugha (LLMs) huandaa hatua zao zinazofuata kwa kujitegemea wakati wakichukua taarifa kutoka kwa vyanzo vya data vya nje.
- **Kushikilia Mtindo wa Iterative Maker-Checker:** Elewa mzunguko wa miito ya kurudiwa kwa LLM, ikijumlishwa na miito ya zana au kazi na matokeo yaliyo na muundo, yaliyotengenezwa kuboresha usahihi na kushughulikia maswali yaliyo na matatizo.
- **Gundua Matumizi ya Kivitendo:** Tambua mazingira ambapo Agentic RAG inaonekana zaidi, kama vile mazingira yanayolenga usahihi, mwingiliano tata wa hifadhidata, na mikondo ya kazi ambayo ni mirefu.

## Malengo ya Kujifunza

Baada ya kumaliza somo hili, utajua jinsi ya/kuelewa:

- **Kuelewa Agentic RAG:** Jifunze kuhusu mtindo mpya wa AI ambapo mifano mikubwa ya lugha (LLMs) huandaa hatua zao zinazofuata kwa kujitegemea wakati wakichukua taarifa kutoka kwa vyanzo vya data vya nje.
- **Mtindo wa Iterative Maker-Checker:** Fahamu dhana ya mzunguko wa miito ya kurudiwa kwa LLM, ikijumlishwa na miito ya zana au kazi na matokeo yaliyo na muundo, yaliyotengenezwa kuboresha usahihi na kushughulikia maswali yaliyo na matatizo.
- **Kudhibiti Mchakato wa Kuelewa:** Elewa uwezo wa mfumo kudhibiti mchakato wake wa kufikiri, kufanya maamuzi kuhusu jinsi ya kushughulikia matatizo bila kutegemea njia zilizotangazwa awali.
- **Mtiririko wa Kazi:** Elewa jinsi mfano wa agentic unavyoweza kuamua pekee kuchukua ripoti za mwenendo wa soko, kubaini data za wapinzani, kulinganisha vipimo vya mauzo vya ndani, kuunganisha matokeo, na kutathmini mkakati.
- **Mizunguko ya Kurudiwa, Muunganiko wa Zana, na Kumbukumbu:** Jifunze kuhusu utegemezi wa mfumo kwa muundo wa mwingiliano wa mzunguko, kuendeleza hali na kumbukumbu kati ya hatua ili kuepuka mizunguko ya kurudiwa na kufanya maamuzi yenye ufahamu zaidi.
- **Kushughulikia Hali za Kushindwa na Kurekebisha Kwa Kujitegemea:** Gundua mifumo imara ya kurekebisha yenyewe ya mfumo, ikiwa ni pamoja na kurudia na kuuliza tena, kutumia zana za uchunguzi, na kurejea kwa usimamizi wa binadamu.
- **Mipaka ya Udhibiti:** Elewa mipaka ya Agentic RAG, ikilenga uhuru wa kikoa maalum, utegemezi wa miundombinu, na heshima kwa kanuni za usalama.
- **Matumizi ya Kivitendo na Thamani:** Tambua mazingira ambapo Agentic RAG inaonekana zaidi, kama vile mazingira yanayolenga usahihi, mwingiliano tata wa hifadhidata, na mikondo ya kazi ambayo ni mirefu.
- **Uongozi, Uwajibikaji, na Uaminifu:** Jifunze kuhusu umuhimu wa uongozi na uwazi, ikiwa ni pamoja na kueleza sababu, kudhibiti upendeleo, na usimamizi wa binadamu.

## Agentic RAG ni Nini?

Agentic Retrieval-Augmented Generation (Agentic RAG) ni mtindo mpya wa AI ambapo mifano mikubwa ya lugha (LLMs) huandaa kwa kujitegemea hatua zao zinazofuata wakati wakichukua taarifa kutoka kwa vyanzo vya nje. Tofauti na mifumo ya kawaida ya kutafuta kisha kusoma, Agentic RAG inahusisha miito ya kurudiwa kwa LLM, ikijumlishwa na miito ya zana au kazi na matokeo yaliyo na muundo. Mfumo huu huchambua matokeo, huboresha maswali, hutumia zana za ziada ikiwa zinahitajika, na kuendelea mzunguko huu hadi suluhisho linaloridhisha lifanikishwe. Mtindo huu wa "maker-checker" unaorudiwa huboresha usahihi, hushughulikia maswali yaliyo na matatizo, na kuhakikisha matokeo ya ubora wa juu.

Mfumo huu unamiliki kwa nguvu mchakato wake wa kufikiri, unaandika upya maswali yaliyoshindwa, huchagua njia tofauti za utafutaji, na kuunganisha zana nyingi—kama vile utafutaji wa vekta katika Azure AI Search, hifadhidata za SQL, au API za kawaida—kabla ya kumaliza jibu lake. Sifa ya kipekee ya mfumo wa agentic ni uwezo wake wa kumiliki mchakato wake wa kufikiri. Maendeleo ya RAG ya kawaida hutegemea njia zilizotangazwa awali, lakini mfumo wa agentic huamua kwa kujitegemea mfuatano wa hatua kulingana na ubora wa taarifa anazopata.

## Kufafanua Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) ni mtindo mpya wa maendeleo ya AI ambapo LLMs hazichukui taarifa tu kutoka kwa vyanzo vya data vya nje bali pia huandaa kwa kujitegemea hatua zao zinazofuata. Tofauti na mifumo ya kawaida ya kutafuta kisha kusoma au mfuatano wa maagizo yaliyopangwa kwa uangalifu, Agentic RAG inahusisha mzunguko wa miito ya kurudiwa kwa LLM, ikijumlishwa na miito ya zana au kazi na matokeo yaliyo na muundo. Kila zamu, mfumo huchambua matokeo aliyopata, hufanya uamuzi wa kuboresha maswali yake, hutumia zana za ziada ikiwa zinahitajika, na kuendelea mzunguko huu hadi apate suluhisho linaloridhisha.

Mtindo huu wa "maker-checker" unaorudiwa umeundwa kuboresha usahihi, kushughulikia maswali yaliyo na matatizo kwa hifadhidata zilizopangwa (mfano NL2SQL), na kuhakikisha matokeo yenye usawa na ya ubora wa juu. Badala ya kutegemea minyororo ya maagizo iliyoundwa kwa uangalifu, mfumo huu unamiliki kwa nguvu mchakato wake wa kufikiri. Inaweza kuandika upya maswali yaliyoshindwa, kuchagua njia tofauti za utafutaji, na kuunganisha zana nyingi—kama vile utafutaji wa vekta katika Azure AI Search, hifadhidata za SQL, au API za kawaida—kabla ya kumaliza jibu lake. Hii huondoa hitaji la mifumo tata ya upangaji kazi. Badala yake, mzunguko rahisi wa “miito ya LLM → matumizi ya zana → miito ya LLM → …” unaweza kutoa matokeo yenye akili na yenye msingi mzuri.

![Agentic RAG Core Loop](../../../translated_images/sw/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Kumiliki Mchakato wa Kuelewa

Sifa ya kipekee inayofanya mfumo kuwa “agentic” ni uwezo wake wa kumiliki mchakato wake wa kufikiri. Matumizi ya RAG ya jadi mara nyingi hutegemea wafanyakazi kuanzisha njia kwa mfano: mnyororo wa mawazo unaoelezea nini cha kutafuta na lini.
Lakini mtu anapo kuwa mfumo wa agentic kweli, huamua ndani kwa ndani jinsi ya kushughulikia tatizo. Sio tu kinachoendesha maagizo; hubaini kwa kujitegemea mfuatano wa hatua kulingana na ubora wa taarifa anazopata.
Kwa mfano, ikiwa huombwa kuunda mkakati wa uzinduzi wa bidhaa, hategemei tu maagizo yanayoelezea mchakato wote wa utafiti na utekelezaji wa maamuzi. Badala yake, mfano wa agentic huamua peke yake kufanya hatua zifuatazo:

1. Kuchukua ripoti za mwenendo wa soko wa sasa kwa kutumia Bing Web Grounding
2. Kubainisha data inayohusiana ya wapinzani kwa kutumia Azure AI Search.
3. Kulinganisha vipimo vya mauzo vya ndani vya kihistoria kwa kutumia Azure SQL Database.
4. Kuunganisha matokeo kuwa mkakati ulio na muundo kupitia Azure OpenAI Service.
5. Kutathmini mkakati kwa mapungufu au kutokuwepo kwa mlingano, na kuamsha mzunguko mwingine wa uchukuaji taarifa ikiwa ni lazima.
Hatua hizi zote—kuboresha maswali, kuchagua vyanzo, kurudia hadi kufikia "furaha" na jibu—hutamwa na mfano, sio mtu aliyeandaa maagizo.

## Mizunguko ya Kurudiwa, Muunganiko wa Zana, na Kumbukumbu

![Tool Integration Architecture](../../../translated_images/sw/tool-integration.0f569710b5c17c10.webp)

Mfumo wa agentic hutegemea muundo wa mwingiliano wa mzunguko:

- **Mwito wa Awali:** Lengo la mtumiaji (yaani. ombi la mtumiaji) linaonyeshwa kwa LLM.
- **Kutumia Zana:** Ikiwa mfano unatambua taarifa za kukosekana au maagizo yasiyoeleweka, huchagua zana au njia ya utafutaji—kama swali la hifadhidata ya vekta (mfano Azure AI Search Hybrid ambayo inatafutiza data za faragha) au mwito uliopangwa wa SQL—kukusanya muktadha zaidi.
- **Tathmini na Kuboresha:** Baada ya kupitia data iliyorejeshwa, mfano hufanya uamuzi kama taarifa hizo zinafaa. Ikiwa sivyo, huboresha swali, jaribu zana tofauti, au badilisha mbinu yake.
- **Rudia Mpaka Kuridhika:** Mzunguko huu unaendelea hadi mfano ubaini kuwa una ufafanuzi wa kutosha na ushahidi wa kutoa jibu la mwisho, lililo na mantiki.
- **Kumbukumbu na Hali:** Kwa sababu mfumo huhifadhi hali na kumbukumbu kati ya hatua, unaweza kukumbuka jaribio na matokeo ya awali, kuepuka mizunguko ya kurudiwa, na kufanya maamuzi yenye ufahamu zaidi anapoendelea.

Kwa wakati, hii huunda hisia ya uelewa unaoendelea, kuwezesha mfano kupita kazi tata, zenye hatua nyingi bila kuhitaji mtu kuingilia mara kwa mara au kubadilisha maombi.

## Kushughulikia Hali za Kushindwa na Kurekebisha Kwa Kujitegemea

Uhuru wa Agentic RAG pia unahusisha mifumo imara ya kujirekebisha. Wakati mfumo unapotatua matatizo kama kupata nyaraka zisizohusiana au kukutana na maswali yaliyo na matatizo, unaweza:

- **Kurudia na Kuuliza Tena:** Badala ya kutoa majibu yenye thamani ndogo, mfano hujaribu mbinu mpya za utafutaji, kuandika upya maswali ya hifadhidata, au kuangalia seti nyingine za data.
- **Tumia Zana za Uchunguzi:** Mfumo unaweza kuamsha kazi zingine zilizoundwa kusaidia kutatua hatua zake za kufikiri au kuthibitisha usahihi wa data iliyopatikana. Zana kama Azure AI Tracing zitakuwa muhimu kuwezesha uangalifu na usimamizi wa kina.
- **Rejea kwa Usimamizi wa Binadamu:** Kwa hali zenye hatari au zinazoshindwa mara kwa mara, mfano unaweza kuonyesha kutokuwa na uhakika na kuomba mwongozo wa binadamu. Mara binadamu anapotoa maoni ya kurekebisha, mfano unaweza kujifunza somo hilo kuendelea.
Mbinu hii ya mzunguko na nguvu huruhusu mfano kuboresha mara kwa mara, kuhakikisha si mfumo wa mara moja tu bali mmoja anejifunza kutoka kwa makosa yake ndani ya kikao fulani.

![Self Correction Mechanism](../../../translated_images/sw/self-correction.da87f3783b7f174b.webp)

## Mipaka ya Udhibiti

Licha ya uhuru wake ndani ya kazi, Agentic RAG sio sawa na Artificial General Intelligence. Uwezo wake wa "agentic" unafunikwa na zana, vyanzo vya data, na sera zinazotolewa na waendelezaji binadamu. Hawezi kuunda zana zake mwenyewe au kutoka nje ya mipaka ya kikoa iliyoainishwa. Badala yake, huonyesha umahiri wa kupanga rasilimali zilizopo kwa nguvu.
Tofauti kuu na aina zingine za AI za hali ya juu ni:

1. **Uhuru wa Kikoa Maalum:** Mifumo ya Agentic RAG inalenga kufanikisha malengo yaliyowekwa na mtumiaji ndani ya kikoa kinachojulikana, ikitumia mbinu kama kuandika upya maswali au kuchagua zana kuboresha matokeo.
2. **Utegemezi wa Miundombinu:** Uwezo wa mfumo unategemea zana na data zilizounganishwa na waendelezaji. Hawawezi kupita mipaka hii bila kuingilia kati kwa binadamu.
3. **Heshima kwa Kanuni za Usalama:** Miongozo ya maadili, sheria za utimilifu, na sera za biashara zinabaki kuwa muhimu sana. Uhuru wa wakala daima umefungwa na hatua za usalama na mifumo ya usimamizi (tamaa!).

## Matumizi ya Kivitendo na Thamani

Agentic RAG inaonekana katika mazingira yanayohitaji kuboresha mara kwa mara na usahihi:

1. **Mazingira Yanayozingatia Usahihi Kwanza:** Katika ukaguzi wa ufuatiliaji, uchambuzi wa kanuni, au utafiti wa kisheria, mfano wa agentic unaweza kuthibitisha ukweli mara kwa mara, kushauriana na vyanzo vingi, na kuandika upya maswali hadi apate jibu lililokaguliwa kwa kina.
2. **Mwingiliano Tata wa Hifadhidata:** Wakati wa kushughulikia data zilizopangwa ambapo maswali mara nyingi hukosa au yanahitaji marekebisho, mfumo unaweza kujiboresha maswali yake kwa kujitegemea kwa kutumia Azure SQL au Microsoft Fabric OneLake, kuhakikisha taarifa za mwisho zinaendana na kusudio la mtumiaji.
3. **Mtiririko Mrefu wa Kazi:** Vikao vinavyokaa muda mrefu vinaweza kubadilika kadri taarifa mpya zinavyojitokeza. Agentic RAG inaweza kuendelea kujumuisha data mpya, kubadilisha mikakati anapoendelea kujifunza zaidi kuhusu tatizo.

## Uongozi, Uwajibikaji, na Uaminifu

Wakati mifumo hii inakuwa huru zaidi katika kufikiri, uongozi na uwazi ni muhimu:

- **Kueleza Sababu za Kufikiri:** Mfano unaweza kutoa rekodi ya maswali aliyofanya, vyanzo alivyotumia, na hatua za kufikiri alizochukua kufikia hitimisho lake. Zana kama Azure AI Content Safety na Azure AI Tracing / GenAIOps zinaweza kusaidia kuweka uwazi na kupunguza hatari.
- **Dhibiti Upendeleo na Utafutaji wa Usawa:** Waendelezaji wanaweza kurekebisha mikakati ya utafutaji kuhakikisha vyanzo vya data vinapokelewa vikiwa vya usawa na uwakilishi, na kufanyia ukaguzi matokeo mara kwa mara kugundua upendeleo au mifumo isiyo sawa kwa kutumia mifano maalum kwa mashirika ya hali ya juu ya sayansi ya data yanayotumia Azure Machine Learning.
- **Usimamizi wa Binadamu na Utimilifu:** Kwa kazi nyeti, ukaguzi wa binadamu unabaki kuwa muhimu. Agentic RAG haiwezi kuchukua nafasi ya hukumu za binadamu katika maamuzi yenye mzigo mkubwa—badala yake huimarisha kwa kutoa chaguzi zilizopimwa kwa kina zaidi.

Kuwa na zana zinazotoa rekodi wazi ya hatua ni muhimu. Bila hizo, kutatua matatizo ya mchakato wa hatua nyingi kunaweza kuwa vigumu sana. Angalia mfano ufuatao kutoka Literal AI (kampuni nyuma ya Chainlit) kwa kukimbia kwa Agent:

![AgentRunExample](../../../translated_images/sw/AgentRunExample.471a94bc40cbdc0c.webp)

## Hitimisho

Agentic RAG inawakilisha mageuzi ya asili katika jinsi mifumo ya AI inavyoshughulikia kazi tata, zenye kiasi kikubwa cha data. Kwa kutumia muundo wa mwingiliano wa mzunguko, kuchagua zana kwa kujitegemea, na kuboresha maswali hadi kufanikisha matokeo ya ubora wa juu, mfumo huondoka katika kufuata maagizo ya kawaida na kuwa mtoa maamuzi anayebadilika, anayejua muktadha zaidi. Ingawa bado umepimwa na miundombinu na miongozo ya maadili inayowekwa na binadamu, uwezo wa agentic huu unasaidia mwingiliano tajiri, mabadiliko ya haraka, na hatimaye mwingiliano wa AI wenye manufaa zaidi kwa biashara na watumiaji wa mwisho.

### Una Maswali Zaidi Kuhusu Agentic RAG?

Jiunge na [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) kukutana na wanaojifunza wengine, kuhudhuria masaa ya ofisi na kupata majibu ya maswali yako kuhusu mawakala wa AI.

## Rasilimali Zaidi
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Tekeleza Uzalishaji wa Kuongeza Urejeshaji (RAG) na Azure OpenAI Service: Jifunze jinsi ya kutumia data yako mwenyewe na Azure OpenAI Service. Moduli hii ya Microsoft Learn hutoa mwongozo kamili juu ya utekelezaji wa RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Tathmini ya programu za AI za kizazi na Microsoft Foundry: Makala hii inashughulikia tathmini na kulinganisha mifano kwenye seti za data zinazopatikana kwa umma, ikiwa ni pamoja na programu za Agentic AI na usanifu wa RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Nini Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Mwongozo Kamili wa Uzalishaji wa Kuongeza Urejeshaji Unaotegemea Wakala – Habari kutoka kwa kizazi RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG:ongeza nguvu RAG yako kwa kurekebisha maswali na kujitafutia maswali! Kitabu cha Kupikia cha AI kilicho wazi cha Hugging Face</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Kuongeza Tabaka za Agentic kwa RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Mwelekeo wa Wasaidizi wa Maarifa: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Jinsi ya Kujenga Mifumo ya Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Kutumia Huduma ya Wakala ya Microsoft Foundry kupanua maajenti wako wa AI</a>

### Makala za Kitaaluma

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Kujisahihisha kwa Wenyewe: Uboreshaji wa Mfululizo kwa Mlango wa Kujiripoti</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Maajenti wa Lugha wenye Mafunzo ya Kuimarishwa kwa Maneno</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Mifano Mikubwa ya Lugha Inaweza Kujisahihisha kwa Uhakiki wa Zana Zinayoshirikiana</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Uzalishaji wa Kuongeza Urejeshaji Unaotegemea Wakala: Utafiti juu ya Agentic RAG</a>

## Somo lililotangulia

[Muundo wa Matumizi ya Zana](../04-tool-use/README.md)

## Somo lijalo

[Kuunda Maajenti wa AI wa Kuaminika](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Hati ya Kujitenga**:
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kuwa tafsiri zinazotengenezwa na mashine zinaweza kuwa na makosa au upungufu wa usahihi. Nyaraka ya asili katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya mtaalamu wa binadamu inapendekezwa. Hatuhusiki kwa kutoelewana au tafsiri zisizo sahihi zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->