# Microsoft Foundry एजेन्ट सेवा विकास

यस अभ्यासमा, तपाईंले Flight Booking को लागि एजेन्ट सिर्जना गर्न [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) मा Microsoft Foundry एजेन्ट सेवा उपकरणहरू प्रयोग गर्नुहुन्छ। एजेन्ट प्रयोगकर्ताहरूसँग अन्तरक्रिया गर्न र उडान सम्बन्धी जानकारी प्रदान गर्न सक्षम हुनेछ।

## पूर्वशर्तहरू

यस अभ्यास पूरा गर्न, तपाईंलाई निम्न वस्तुहरू आवश्यक पर्दछ:
1. सक्रिय सदस्यता सहित Azure खाता। [ निःशुल्क खाता सिर्जना गर्नुहोस्](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. तपाईंलाई Microsoft Foundry हब सिर्जना गर्ने अनुमति आवश्यक छ वा तपाईंका लागि एक सिर्जना गरिएको हुनुपर्नेछ।
    - यदि तपाईंको भूमिका Contributor वा Owner हो भने, तपाईं यो ट्युटोरियलका चरणहरू पालना गर्न सक्नुहुन्छ।

## Microsoft Foundry हब सिर्जना गर्नुहोस्

> **सूचना:** Microsoft Foundry पहिले Azure AI Studio भनेर चिनिन्थ्यो।

1. Microsoft Foundry हब सिर्जना गर्न [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ब्लग पोस्टका निर्देशनहरू पालना गर्नुहोस्।
2. तपाईंको परियोजना सिर्जना भएपछि, देखाइएका सुझावहरू बन्द गर्नुहोस् र Microsoft Foundry पोर्टलमा परियोजना पृष्ठ समीक्षा गर्नुहोस्, जुन तलको छविको जस्तो देखिनु पर्छ:

    ![Microsoft Foundry Project](../../../translated_images/ne/azure-ai-foundry.88d0c35298348c2f.webp)

## मोडेल तैनाथ गर्नुहोस्

1. तपाईंको परियोजनाको बाँया प्यानमा, **My assets** सेक्सनमा, **Models + endpoints** पृष्ठ चयन गर्नुहोस्।
2. **Models + endpoints** पृष्ठमा, **Model deployments** ट्याबमा, **+ Deploy model** मेनुमा, **Deploy base model** चयन गर्नुहोस्।
3. सूचीमा `gpt-4.1-mini` मोडेल खोज्नुहोस्, त्यसपछि चयन गरेर पुष्टि गर्नुहोस्।

    > **सूचना**: TPM घटाउँदा तपाईंले प्रयोग गरिरहेको सदस्यतामा उपलब्ध कोटा अत्यधिक प्रयोग हुनबाट बच्न मद्दत गर्छ।

    ![Model Deployed](../../../translated_images/ne/model-deployment.3749c53fb81e18fd.webp)

## एजेन्ट सिर्जना गर्नुहोस्

अब तपाईंले मोडेल तैनाथ गर्नुभएपछि, तपाईं एजेन्ट सिर्जना गर्न सक्नुहुन्छ। एजेन्ट एक संवादात्मक एआई मोडेल हो जुन प्रयोगकर्ताहरूसँग अन्तरक्रिया गर्न प्रयोग गर्न सकिन्छ।

1. तपाईंको परियोजनाको बाँया प्यानमा, **Build & Customize** सेक्सन अन्तर्गत, **Agents** पृष्ठ चयन गर्नुहोस्।
2. नयाँ एजेन्ट सिर्जना गर्न **+ Create agent** क्लिक गर्नुहोस्। **Agent Setup** संवाद बाकसमा:
    - एजेन्टको नाम प्रविष्ट गर्नुहोस्, जस्तै `FlightAgent`।
    - पहिले सिर्जना गरिएको `gpt-4.1-mini` मोडेल तैनाथ चयन गरिएको छ सुनिश्चित गर्नुहोस्।
    - एजेन्टले पछ्याउनुपर्ने निर्देशनहरू **Instructions** मा सेट गर्नुहोस्। यहाँ एउटा उदाहरण छ:
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
> विस्तृत प्रॉम्प्टका लागि [यो रिपोजिटरी](https://github.com/ShivamGoyal03/RoamMind) मा थप जानकारी हेर्न सक्नुहुन्छ।
    
> त्यसैगरी, तपाईं एजेन्टका क्षमता बढाउन **Knowledge Base** र **Actions** थप्न सक्नुहुन्छ ताकि प्रयोगकर्ताका अनुरोधहरूको आधारमा थप जानकारी प्रदान गर्न र स्वचालित कार्यहरू सञ्चालन गर्न सकियोस्। यस अभ्यासका लागि यी चरणहरू ओछ्याउन सकिन्छ।
    
![Agent Setup](../../../translated_images/ne/agent-setup.9bbb8755bf5df672.webp)

3. नयाँ बहु-एआई एजेन्ट सिर्जना गर्न, मात्र **New Agent** क्लिक गर्नुहोस्। नयाँ सिर्जना गरिएको एजेन्ट तब Agents पृष्ठमा देखिनेछ।


## एजेन्ट परीक्षण गर्नुहोस्

एजेन्ट सिर्जना गरेपछि, तपाईं यसलाई Microsoft Foundry पोर्टलको प्लेग्राउन्डमा प्रयोगकर्ताका प्रश्नहरू कसरी प्रतिक्रिया दिन्छ जाँच गर्न सक्नुहुन्छ।

1. तपाईंको एजेन्टको **Setup** प्यान माथि, **Try in playground** चयन गर्नुहोस्।
2. **Playground** प्यानमा, तपाईं कुराकानी विन्डोमा प्रश्न टाइप गरेर एजेन्टसँग अन्तरक्रिया गर्न सक्नुहुन्छ। उदाहरणका लागि, तपाईं एजेन्टलाई 28 तारिखमा सिएटलबाट न्यूयोर्कसम्म उडान खोज्न भन्न सक्नुहुन्छ।

    > **सूचना**: यस अभ्यासमा कुनै वास्तविक-समय डेटा प्रयोग भइरहेको छैन, त्यसैले एजेन्टले सटीक उत्तर नदिन सक्छ। उद्देश्य एजेन्टको बुझाइ र निर्देशनहरू अनुसार प्रयोगकर्ताका प्रश्नहरूको उत्तर दिन सक्ने क्षमता परीक्षण गर्नु हो।

    ![Agent Playground](../../../translated_images/ne/agent-playground.dc146586de715010.webp)

3. एजेन्ट परीक्षण गरेपछि, यसको क्षमताहरू वृद्धि गर्न थप इरादा, प्रशिक्षण डेटा र क्रियाकलापहरू थपेर अझ अनुकूलन गर्न सकिन्छ।

## स्रोतहरू सफा गर्नुहोस्

एजेन्ट परीक्षण समाप्त भएपछि, थप लागत नलागोस भन्नका लागि यसलाई मेटाउन सक्नुहुन्छ।
1. [Azure portal](https://portal.azure.com) खोल्नुहोस् र तपाईंले यस अभ्यासमा प्रयोग गरिएको हब स्रोतहरू तैनाथ गरिएको स्रोत समूहको सामग्री हेर्नुहोस्।
2. टूलबारमा, **Delete resource group** चयन गर्नुहोस्।
3. स्रोत समूहको नाम प्रविष्ट गरेर यसलाई मेटाउन चाहनुहुन्छ पुष्टि गर्नुहोस्।

## स्रोतहरू

- [Microsoft Foundry दस्तावेज़ीकरण](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry सँग सुरूवात](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure मा AI एजेन्टहरूको आधारभूत ज्ञान](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->