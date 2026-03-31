# Maendeleo ya Huduma ya Wakala wa Azure AI

Katika zoezi hili, unatumia zana za huduma ya Wakala wa Azure AI katika [mduka wa Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) kuunda wakala kwa ajili ya Kufunga Ndege. Wakala atakuwa na uwezo wa kuwasiliana na watumiaji na kutoa habari kuhusu ndege.

## Mahitaji ya Awali

Kuimaliza zoezi hili, unahitaji yafuatayo:
1. Akaunti ya Azure yenye usajili hai. [Unda akaunti bure](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Unahitaji ruhusa za kuunda kitovu cha Microsoft Foundry au kuwa nacho kimeundwa kwa ajili yako.
    - Ikiwa kazi yako ni Mchangiaji au Miliki, unaweza kufuata hatua katika mafunzo haya.

## Unda kitovu cha Microsoft Foundry

> **Kumbuka:** Microsoft Foundry hapo awali ilijulikana kama Azure AI Studio.

1. Fuata miongozo hii kutoka kwa chapisho la blogu la [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) kwa ajili ya kuunda kitovu cha Microsoft Foundry.
2. Unapounda mradi wako, funga vidokezo vyovyote vinavyoonyeshwa na angalia ukurasa wa mradi katika mduka wa Microsoft Foundry, ambao unapaswa kuonekana kama picha ifuatayo:

    ![Microsoft Foundry Project](../../../translated_images/sw/azure-ai-foundry.88d0c35298348c2f.webp)

## Weka mfano

1. Katika sehemu ya kushoto ya mradi wako, kwenye sehemu ya **Mali Zangu**, chagua ukurasa wa **Modeli + vituo vya mwisho**.
2. Katika ukurasa wa **Modeli + vituo vya mwisho**, kwenye kichupo cha **Uwekaji wa modeli**, kwenye menyu ya **+ Weka mfano**, chagua **Weka mfano msingi**.
3. Tafuta mfano wa `gpt-4o-mini` kwenye orodha, kisha uchague na uthibitishe.

    > **Kumbuka**: Kupunguza TPM kunasaidia kuepuka kutumia kwa wingi kategoria inayopatikana katika usajili unaotumia.

    ![Model Deployed](../../../translated_images/sw/model-deployment.3749c53fb81e18fd.webp)

## Unda wakala

Sasa baada ya kuweka mfano, unaweza kuunda wakala. Wakala ni mfano wa AI wa mazungumzo unaoweza kutumika kuwasiliana na watumiaji.

1. Katika sehemu ya kushoto ya mradi wako, katika sehemu ya **Jenga & Badilisha**, chagua ukurasa wa **Wakala**.
2. Bofya **+ Unda wakala** kuunda wakala mpya. Chini ya kisanduku cha mazungumzo cha **Mipangilio ya Wakala**:
    - Ingiza jina la wakala, kama `FlightAgent`.
    - Hakikisha uwekaji wa mfano wa `gpt-4o-mini` uliouunda hapo awali umechaguliwa
    - Weka **Maelekezo** kama vile maelekezo unayotaka wakala afuate. Hapa ni mfano:
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
> Kwa maelekezo ya kina, unaweza kutembelea [hifadhidata hii](https://github.com/ShivamGoyal03/RoamMind) kwa habari zaidi.
    
> Zaidi ya hayo, unaweza kuongeza **Msingi wa Maarifa** na **Vitendo** kuboresha uwezo wa wakala kutoa taarifa zaidi na kutekeleza majukumu ya moja kwa moja kulingana na maombi ya mtumiaji. Kwa zoezi hili, unaweza kupiga hatua hizi.
    
![Agent Setup](../../../translated_images/sw/agent-setup.9bbb8755bf5df672.webp)

3. Kuunda wakala mpya wa multi-AI, bonyeza tu **Wakala Mpya**. Wakala aliyeundwa utaonyeshwa kwenye ukurasa wa Wakala.


## Jaribu wakala

Baada ya kuunda wakala, unaweza kuujaribu kuona jinsi unavyotumia maombi ya mtumiaji katika uwanja wa majaribio wa mduka wa Microsoft Foundry.

1. Juu ya sehemu ya **Mpangilio** ya wakala wako, chagua **Jaribu katika uwanja wa majaribio**.
2. Katika sehemu ya **Uwanja wa Majaribio**, unaweza kuwasiliana na wakala kwa kuandika maswali katika dirisha la mazungumzo. Kwa mfano, unaweza kumuuliza wakala atafute ndege kutoka Seattle kwenda New York tarehe 28.

    > **Kumbuka**: Wakala huenda asingetoa majibu sahihi, kwa kuwa hakuna data ya wakati halisi inayotumika katika zoezi hili. Lengo ni kujaribu uwezo wa wakala kuelewa na kujibu maswali ya watumiaji kulingana na maelekezo yaliyotolewa.

    ![Agent Playground](../../../translated_images/sw/agent-playground.dc146586de715010.webp)

3. Baada ya kujaribu wakala, unaweza kuuboresha zaidi kwa kuongeza madhumuni zaidi, data za mafunzo, na vitendo kuongeza uwezo wake.

## Safisha rasilimali

Mara baada ya kumaliza kujaribu wakala, unaweza kuifuta ili kuepuka gharama za ziada.
1. Fungua [mduka wa Azure](https://portal.azure.com) na angalia maudhui ya kundi la rasilimali ambapo uliweka vituo vya hub ulivyotumia katika zoezi hili.
2. Kwenye zana ya kazi, chagua **Futa kundi la rasilimali**.
3. Ingiza jina la kundi la rasilimali na uthibitishe kwamba unataka kulifuta.

## Rasilimali

- [Nyaraka za Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Mduka wa Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Kuanzia na Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Misingi ya wakala wa AI kwenye Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kengele ya Kuanzisha**:
Hati hii imetafsiriwa kwa kutumia huduma ya kutafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za otomatiki zinaweza kuwa na makosa au upotoshaji. Hati asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatuna dhamana kwa kutoelewana au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->