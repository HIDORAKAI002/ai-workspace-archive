# Azure AI एजेंट सेवा विकास

इस अभ्यास में, आप [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) में Azure AI एजेंट सेवा उपकरणों का उपयोग करके एक उड़ान बुकिंग के लिए एजेंट बनाएंगे। एजेंट उपयोगकर्ताओं के साथ संवाद कर सकेगा और उड़ानों की जानकारी प्रदान करेगा।

## पूर्वापेक्षाएँ

इस अभ्यास को पूरा करने के लिए, आपके पास निम्नलिखित आवश्यकताएँ होनी चाहिए:
1. एक सक्रिय सदस्यता के साथ Azure खाता। [नि:शुल्क खाता बनाएं](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. आपके पास Microsoft Foundry हब बनाने की अनुमति होनी चाहिए या आपके लिए एक बनाया गया हो।
    - यदि आपकी भूमिका योगदानकर्ता (Contributor) या स्वामी (Owner) है, तो आप इस ट्यूटोरियल के चरणों का पालन कर सकते हैं।

## Microsoft Foundry हब बनाएं

> **Note:** Microsoft Foundry पहले Azure AI Studio के नाम से जाना जाता था।

1. Microsoft Foundry हब बनाने के लिए [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ब्लॉग पोस्ट से दिशानिर्देशों का पालन करें।
2. जब आपका प्रोजेक्ट बन जाए, तो प्रदर्शित किसी भी सुझाव को बंद करें और Microsoft Foundry पोर्टल में प्रोजेक्ट पेज की समीक्षा करें, जो निम्न छवि के समान दिखना चाहिए:

    ![Microsoft Foundry Project](../../../translated_images/hi/azure-ai-foundry.88d0c35298348c2f.webp)

## मॉडल तैनात करें

1. अपने प्रोजेक्ट के लिए बाएं पैन में, **My assets** सेक्शन में, **Models + endpoints** पेज चुनें।
2. **Models + endpoints** पेज में, **Model deployments** टैब में, **+ Deploy model** मेनू में **Deploy base model** चुनें।
3. सूची में `gpt-4o-mini` मॉडल खोजें, फिर उसे चुनें और पुष्टि करें।

    > **Note**: TPM को कम करने से आपके उपयोग वाली सदस्यता में उपलब्ध कोटा के अधिक उपयोग से बचा जा सकता है।

    ![Model Deployed](../../../translated_images/hi/model-deployment.3749c53fb81e18fd.webp)

## एजेंट बनाएं

अब जब आपने मॉडल तैनात कर लिया है, तो आप एक एजेंट बना सकते हैं। एजेंट एक संवादात्मक AI मॉडल है जिसका उपयोग उपयोगकर्ताओं के साथ बातचीत करने के लिए किया जा सकता है।

1. अपने प्रोजेक्ट के लिए बाएं पैन में, **Build & Customize** सेक्शन में, **Agents** पेज चुनें।
2. नया एजेंट बनाने के लिए **+ Create agent** पर क्लिक करें। **Agent Setup** संवाद बॉक्स में:
    - एजेंट का नाम दर्ज करें, जैसे `FlightAgent`।
    - सुनिश्चित करें कि पहले बनाया गया `gpt-4o-mini` मॉडल तैनाती चुनी गई हो।
    - एजेंट को पालन करने के लिए निर्देश (Instructions) सेट करें। यहाँ एक उदाहरण है:
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
> अधिक विस्तृत प्रॉम्प्ट के लिए, आप अधिक जानकारी के लिए [इस रिपॉजिटरी](https://github.com/ShivamGoyal03/RoamMind) को देख सकते हैं।
    
> इसके अलावा, आप एजेंट की क्षमताओं को बढ़ाने के लिए **Knowledge Base** और **Actions** भी जोड़ सकते हैं ताकि वह उपयोगकर्ता अनुरोधों के आधार पर अधिक जानकारी प्रदान कर सके और स्वचालित कार्य कर सके। इस अभ्यास के लिए, आप इन चरणों को छोड़ सकते हैं।
    
![Agent Setup](../../../translated_images/hi/agent-setup.9bbb8755bf5df672.webp)

3. नया मल्टी-AI एजेंट बनाने के लिए बस **New Agent** पर क्लिक करें। नया बनाया गया एजेंट फिर Agents पेज पर दिखाई देगा।


## एजेंट का परीक्षण करें

एजेंट बनाने के बाद, आप Microsoft Foundry पोर्टल के प्लेग्राउंड में उपयोगकर्ता प्रश्नों पर इसकी प्रतिक्रियाओं की जांच कर सकते हैं।

1. अपने एजेंट के **Setup** पैन के शीर्ष पर, **Try in playground** चुनें।
2. **Playground** पैन में, आप चैट विंडो में प्रश्न टाइप करके एजेंट के साथ संवाद कर सकते हैं। उदाहरण के लिए, आप एजेंट से 28 तारीख को सिएटल से न्यूयॉर्क के लिए उड़ानों को खोजने को कह सकते हैं।

    > **Note**: एजेंट सटीक प्रतिक्रियाएं न दे सके क्योंकि इस अभ्यास में कोई वास्तविक समय डेटा उपयोग नहीं किया जा रहा है। इसका उद्देश्य एजेंट की उपयोगकर्ता प्रश्नों को समझने और दिए गए निर्देशों के आधार पर प्रतिक्रिया देने की क्षमता का परीक्षण करना है।

    ![Agent Playground](../../../translated_images/hi/agent-playground.dc146586de715010.webp)

3. एजेंट का परीक्षण करने के बाद, आप इसे और अधिक इरादे (intents), प्रशिक्षण डेटा, और क्रियाएं जोड़कर इसकी क्षमताओं को बढ़ा सकते हैं।

## संसाधनों को साफ़ करें

जब आप एजेंट का परीक्षण समाप्त कर लें, तो अतिरिक्त लागत से बचने के लिए इसे हटा सकते हैं।
1. [Azure पोर्टल](https://portal.azure.com) खोलें और उस संसाधन समूह की सामग्री देखें जहां आपने इस अभ्यास में उपयोग किए गए हब संसाधन तैनात किए थे।
2. टूलबार में **Delete resource group** चुनें।
3. संसाधन समूह का नाम दर्ज करें और इसे हटाने की पुष्टि करें।

## संसाधन

- [Microsoft Foundry प्रलेखन](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio के साथ शुरुआत](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure पर AI एजेंटों के मूल सिद्धांत](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान रखें कि स्वचालित अनुवादों में त्रुटियां या असटीकताएं हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए पेशेवर मानव अनुवाद अनुशंसित है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत अर्थ निकलने के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->