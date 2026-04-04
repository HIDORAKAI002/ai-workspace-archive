# Azure AI Agent Service Development

यस अभ्यासमा, तपाईंले [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)मा Azure AI Agent सेवा उपकरणहरू प्रयोग गरेर Flight Booking को लागि एजेन्ट सिर्जना गर्नुहुन्छ। एजेन्टले प्रयोगकर्ताहरूसँग अन्तरक्रिया गर्न र उडानहरूको बारेमा जानकारी प्रदान गर्न सक्षम हुनेछ।

## आवश्यकताहरू

यस अभ्यास पूरा गर्नका लागि, तपाईंलाई तलका वस्तुहरू आवश्यक छन्:
1. सक्रिय सदस्यता सहितको Azure खाता। [निःशुल्क खाता सिर्जना गर्नुहोस्](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. तपाईंलाई Microsoft Foundry हब सिर्जना गर्ने अनुमति चाहिन्छ वा तपाईंको लागि पहिले नै एउटा सिर्जना गरिएको हुनुपर्छ।
    - यदि तपाईंको भूमिका Contributor वा Owner हो भने, तपाईं यो ट्युटोरियलका चरणहरू अनुसरण गर्न सक्नुहुन्छ।

## Microsoft Foundry हब सिर्जना गर्नुहोस्

> **Note:** Microsoft Foundry पहिले Azure AI Studio भनेर चिनिन्थ्यो।

1. Microsoft Foundry हब सिर्जना गर्न [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ब्लग पोस्टबाट यी निर्देशनहरू पालना गर्नुहोस्।
2. जब तपाईंको परियोजना सिर्जना हुन्छ, देखाइएका कुनै पनि सुझावहरू बन्द गर्नुहोस् र Microsoft Foundry पोर्टलमा परियोजना पृष्ठ जाँच गर्नुहोस्, जुन निम्न चित्रसँग मेल खाने गर्छ:

    ![Microsoft Foundry Project](../../../translated_images/ne/azure-ai-foundry.88d0c35298348c2f.webp)

## मोडेल लागू गर्नुहोस्

1. तपाईंको परियोजनाको बाँया प्यानमा, **My assets** सेक्सनमा, **Models + endpoints** पृष्ठ छान्नुहोस्।
2. **Models + endpoints** पृष्ठमा, **Model deployments** ट्याबमा, **+ Deploy model** मेनुमा, **Deploy base model** छान्नुहोस्।
3. सूचीमा `gpt-4o-mini` मोडेल खोज्नुहोस्, र त्यसलाई छानी पुष्टि गर्नुहोस्।

    > **Note**: TPM कम गर्नुले तपाईं प्रयोग गरिरहेको सदस्यता मा उपलब्ध कोटा अधिक प्रयोग हुन नदिन मद्दत गर्दछ।

    ![Model Deployed](../../../translated_images/ne/model-deployment.3749c53fb81e18fd.webp)

## एजेन्ट सिर्जना गर्नुहोस्

अब तपाईंले मोडेल लागू गरिसकेपछि, एजेन्ट सिर्जना गर्नुहोस्। एजेन्ट एउटा संवादात्मक AI मोडेल हो जुन प्रयोगकर्ताहरूसँग अन्तरक्रिया गर्न प्रयोग गर्न सकिन्छ।

1. तपाईंको परियोजनाको बाँया प्यानमा, **Build & Customize** सेक्सनमा, **Agents** पृष्ठ चयन गर्नुहोस्।
2. नयाँ एजेन्ट सिर्जना गर्न **+ Create agent** क्लिक गर्नुहोस्। **Agent Setup** संवाद बाकसमा:
    - एजेन्टको लागि नाम प्रविष्ट गर्नुहोस्, जस्तै `FlightAgent`।
    - सुनिश्चित गर्नुहोस् कि तपाईंले पहिले सिर्जना गरेको `gpt-4o-mini` मोडेल डिप्लोयमेन्ट चयन गरिएको छ।
    - एजेन्टले पालना गर्नुपर्ने निर्देशनहरू (Instructions) सेट गर्नुहोस्। यहाँ एउटा उदाहरण छ:
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
> विस्तृत प्राम्प्टका लागि, तपाईं [यस रिपोजिटोरी](https://github.com/ShivamGoyal03/RoamMind) मा थप जानकारी जाँच्न सक्नुहुन्छ।
    
> थप रूपमा, तपाईं **Knowledge Base** र **Actions** थपेर एजेन्टका क्षमता सुधारेर प्रयोगकर्ताका अनुरोधमा आधारित थप जानकारी प्रदान गर्न र स्वतः कार्यहरू गर्न सक्नुहुन्छ। यस अभ्यासका लागि यी चरणहरू छोड्न सक्नुहुन्छ।
    
![Agent Setup](../../../translated_images/ne/agent-setup.9bbb8755bf5df672.webp)

3. नयाँ मल्टि-AI एजेन्ट सिर्जना गर्न, केवल **New Agent** क्लिक गर्नुहोस्। नयाँ सिर्जित एजेन्ट त्यसपछि Agents पृष्ठमा देखिनेछ।

## एजेन्ट परीक्षण गर्नुहोस्

एजेन्ट सिर्जना गरेपछि, तपाईं यसलाई Microsoft Foundry पोर्टलको प्लेग्राउन्डमा प्रयोगकर्ताका प्रश्नहरूमा कस्तो प्रतिक्रिया दिन्छ हेर्न सक्नुहुन्छ।

1. तपाईंको एजेन्टको **Setup** प्यानको माथि, **Try in playground** चयन गर्नुहोस्।
2. **Playground** प्यानमा, तपाईं च्याट विन्डोमा प्रश्न टाइप गरेर एजेन्टसँग अन्तरक्रिया गर्न सक्नुहुन्छ। उदाहरणका लागि, तपाईं एजेन्टलाई २८ तारिखमा Seattle बाट New York सम्म उडान खोज्न भन्न सक्नुहुन्छ।

    > **Note**: एजेन्टले सटीक प्रतिक्रिया नदिन सक्छ, किनकि यस अभ्यासमा कुनै वास्तविक-समय डेटा प्रयोग गरिएको छैन। उद्देश्य भनेको एजेन्टले निर्देशनहरूका आधारमा प्रयोगकर्ताका प्रश्न बुझ्न र प्रतिक्रिया दिन सक्षम छ भनी परीक्षण गर्नु हो।

    ![Agent Playground](../../../translated_images/ne/agent-playground.dc146586de715010.webp)

3. एजेन्ट परीक्षण पछि, तपाईं यसलाई थप उद्देश्यहरू, प्रशिक्षण डेटा, र कार्यहरू थप गरी यसका क्षमता अझ सुधार गर्न सक्नुहुन्छ।

## स्रोतहरूको सफाइ गर्नुहोस्

एजेन्ट परीक्षण सकेपछि, अतिरिक्त खर्च रोक्न यसलाई मेटाउन सकिन्छ।
1. [Azure portal](https://portal.azure.com) खोल्नुहोस् र यस अभ्यासमा प्रयोग गरिएको हब स्रोतहरू भएको रिसोर्स समूहको सामग्री हेर्नुहोस्।
2. टूलबारमा, **Delete resource group** चयन गर्नुहोस्।
3. रिसोर्स समूहको नाम दर्ज गरेर हटाउन चाहनुहुन्छ भनेर पुष्टि गर्नुहोस्।

## स्रोतहरू

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो कागजात AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) को प्रयोग गरेर अनुवाद गरिएको हो। हामी शुद्धताका लागि प्रयास गर्छौं, तर कृपया ध्यान दिनुहोस् कि स्वचालित अनुवादमा त्रुटि वा अशुद्धता हुन सक्छ। मौलिक कागजात यसको मूल भाषामा प्रामाणिक स्रोतका रूपमा मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिश गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न भएका कुनै पनि अनर्थ वा गलतफहमीका लागि हामी जिम्मेवार हुने छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->