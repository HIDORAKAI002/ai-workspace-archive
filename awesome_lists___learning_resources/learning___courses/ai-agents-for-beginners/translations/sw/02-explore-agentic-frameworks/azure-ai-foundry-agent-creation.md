# Maendeleo ya Huduma ya Wakala wa Microsoft Foundry

Katika zoezi hili, unatumia zana za Huduma ya Wakala wa Microsoft Foundry katika [mlango wa Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) kuunda wakala wa Uhifadhi wa Ndege. Wakala atakuwa na uwezo wa kuwasiliana na watumiaji na kutoa habari kuhusu ndege.

## Masharti ya awali

Ili kumaliza zoezi hili, unahitaji yafuatayo:
1. Akaunti ya Azure yenye usajili hai. [Tengeneza akaunti bure](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Unahitaji ruhusa za kuunda kituo cha Microsoft Foundry au kuwa nacho kimeundwa kwako.
    - Ikiwa jukumu lako ni Mchangiaji au Mwenyeji, unaweza kufuata hatua katika mafunzo haya.

## Unda kituo cha Microsoft Foundry

> **Note:** Microsoft Foundry hapo awali ilijulikana kama Azure AI Studio.

1. Fuata mwongozo huu kutoka kwenye chapisho la blogi la [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) kuunda kituo cha Microsoft Foundry.
2. Unapounda mradi wako, funga vidokezo vyote vinavyoonyeshwa na kisha kupitia ukurasa wa mradi kwenye mlango wa Microsoft Foundry, ambao unapaswa kuonekana kama picha ifuatayo:

    ![Microsoft Foundry Project](../../../translated_images/sw/azure-ai-foundry.88d0c35298348c2f.webp)

## Sambaza mfano

1. Kwenye sehemu ya kushoto ya mradi wako, kwenye sehemu ya **Mali Zangu**, chagua ukurasa wa **Mifano + vituo**.
2. Kwenye ukurasa wa **Mifano + vituo**, kwenye kichupo cha **Usambazaji wa mfano**, kwenye menyu ya **+ Sambaza mfano**, chagua **Sambaza mfano wa msingi**.
3. Tafuta mfano wa `gpt-4.1-mini` kwenye orodha, kisha uchague na uthibitishe.

    > **Note**: Kupunguza TPM husaidia kuepuka matumizi makubwa ya idhini inayopatikana katika usajili unaotumia.

    ![Model Deployed](../../../translated_images/sw/model-deployment.3749c53fb81e18fd.webp)

## Unda wakala

Sasa kwamba umeeneza mfano, unaweza kuunda wakala. Wakala ni mfano wa AI wa mazungumzo unaoweza kutumika kuwasiliana na watumiaji.

1. Kwenye sehemu ya kushoto ya mradi wako, kwenye sehemu ya **Jenga & Binafsisha**, chagua ukurasa wa **Wakala**.
2. Bonyeza **+ Unda wakala** kuunda wakala mpya. Chini ya kisanduku cha mazungumzo cha **Mipangilio ya Wakala**:
    - Ingiza jina la wakala, kama `FlightAgent`.
    - Hakikisha kwamba usambazaji wa mfano `gpt-4.1-mini` uliouunda awali umechaguliwa
    - Weka **Maelekezo** kulingana na ombi unalotaka wakala afuate. Hapa kuna mfano:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Kwa maelekezo ya kina, unaweza kuangalia [hazina hii](https://github.com/ShivamGoyal03/RoamMind) kwa habari zaidi.
    
> Zaidi ya hayo, unaweza kuongeza **Msingi wa Maarifa** na **Vitendo** ili kuongeza uwezo wa wakala kutoa habari zaidi na kutekeleza kazi za kiotomatiki kulingana na maombi ya mtumiaji. Kwa zoezi hili, unaweza kuruka hatua hizi.
    
![Agent Setup](../../../translated_images/sw/agent-setup.9bbb8755bf5df672.webp)

3. Kuunda wakala mpya anayeendeshwa na AI nyingi, bonyeza tu **Wakala Mpya**. Wakala aliyeundwa sasa utaonyeshwa kwenye ukurasa wa Wakala.


## Jaribu wakala

Baada ya kuunda wakala, unaweza kuutest kwa kuona jinsi unavyojibu maswali ya watumiaji katika uwanja wa majaribio wa mlango wa Microsoft Foundry.

1. Juu ya sehemu ya **Mipangilio** kwa wakala wako, chagua **Jaribu kwenye uwanja wa majaribio**.
2. Kwenye sehemu ya **Uwanja wa majaribio**, unaweza kuwasiliana na wakala kwa kuandika maswali kwenye dirisha la gumzo. Kwa mfano, unaweza kumuuliza wakala aitafutie ndege kutoka Seattle kwenda New York tarehe 28.

    > **Note**: Wakala huenda asitoe majibu sahihi, kwani hakuna data za wakati halisi zinazotumika katika zoezi hili. Kusudi ni kujaribu uwezo wa wakala kuelewa na kujibu maswali ya watumiaji kulingana na maelekezo yaliyotolewa.

    ![Agent Playground](../../../translated_images/sw/agent-playground.dc146586de715010.webp)

3. Baada ya kujaribu wakala, unaweza kuubinafsisha zaidi kwa kuongeza nia zaidi, data za mafunzo, na vitendo ili kuongeza uwezo wake.

## Safisha rasilimali

Unapomaliza kujaribu wakala, unaweza kuufuta ili kuepuka gharama za ziada.
1. Fungua [mlango wa Azure](https://portal.azure.com) na tazama maudhui ya kundi la rasilimali ambako umeeneza rasilimali za kituo kilichotumika katika zoezi hili.
2. Kwenye kikasha cha zana, chagua **Futa kundi la rasilimali**.
3. Andika jina la kundi la rasilimali na thibitisha kwamba unataka kulifuta.

## Rasilimali

- [Nyaraka za Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Mlango wa Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Anza na Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Misingi ya waki wa AI kwenye Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->