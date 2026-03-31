# Azure AI एजंट सेवा विकास

या सरावात, तुम्ही [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) मधील Azure AI Agent सेवा साधने वापरून फ्लाइट बुकिंगसाठी एक एजंट तयार कराल. हा एजंट वापरकर्त्यांशी संवाद साधू शकेल आणि फ्लाइट्सबद्दल माहिती प्रदान करेल.

## पूर्वअटी

हा सराव पूर्ण करण्यासाठी, तुम्हाला खालील गोष्टींची आवश्यकता आहे:
1. सक्रिय सबस्क्रिप्शन असलेले Azure खाते. [मोफत खाते तयार करा](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. तुम्हाला Microsoft Foundry हब तयार करण्याची परवानगी हवी किंवा तुमच्यासाठी एक तयार केलेले असावे.
    - जर तुमची भूमिका Contributor किंवा Owner असेल, तर तुम्ही या ट्यूटोरियलमधील पावले पाळू शकता.

## Microsoft Foundry हब तयार करा

> **सूचना:** Microsoft Foundry याला पूर्वी Azure AI Studio म्हणून ओळखले जायचे.

1. Microsoft Foundry हब तयार करण्यासाठी [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ब्लॉग पोस्टमधील या मार्गदर्शकांचे पालन करा.
2. तुमचा प्रोजेक्ट तयार झाल्यावर, दाखवण्यात आलेल्या कोणत्याही टिप्स बंद करा आणि Microsoft Foundry पोर्टलमधील प्रोजेक्ट पृष्ठ पुनरावलोकन करा, जे खालील प्रतिमेशी साम्य असावे:

    ![Microsoft Foundry प्रकल्प](../../../translated_images/mr/azure-ai-foundry.88d0c35298348c2f.webp)

## मॉडेल तैनात करा

1. तुमच्या प्रोजेक्टच्या डाव्या पॅनमध्ये, **My assets** विभागात, **Models + endpoints** पृष्ठ निवडा.
2. **Models + endpoints** पृष्ठावर, **Model deployments** टॅबमध्ये, **+ Deploy model** मेनूमध्ये **Deploy base model** निवडा.
3. यादीत `gpt-4o-mini` मॉडेल शोधा, नंतर ते निवडा आणि पुष्टी करा.

    > **सूचना:** TPM कमी केल्याने तुम्ही वापरत असलेल्या सबस्क्रिप्शनमधील उपलब्ध कोटा अतिरीक्त वापरण्यापासून बचाव होतो.

    ![मॉडेल तैनात केले](../../../translated_images/mr/model-deployment.3749c53fb81e18fd.webp)

## एजंट तयार करा

आता तुम्ही मॉडेल तैनात केल्यावर, तुम्ही एक एजंट तयार करू शकता. एजंट हा एक संवादात्मक AI मॉडेल आहे ज्याचा वापर वापरकर्त्यांशी संवाद साधण्यासाठी केला जाऊ शकतो.

1. तुमच्या प्रोजेक्टच्या डाव्या पॅनमध्ये, **Build & Customize** विभागात, **Agents** पृष्ठ निवडा.
2. नवीन एजंट तयार करण्यासाठी **+ Create agent** वर क्लिक करा. **Agent Setup** संवादबॉक्समध्ये:
    - एजंटसाठी नाव प्रविष्ट करा, उदा. `FlightAgent`.
    - पूर्वी तयार केलेली `gpt-4o-mini` मॉडेल तैनाती निवडलेली आहे याची खात्री करा
    - एजंटने अनुसरावयाच्या प्रॉम्प्टनुसार **Instructions** सेट करा. येथे एक उदाहरण आहे:
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
> तपशीलवार प्रॉम्प्टसाठी, तुम्ही अधिक माहितीसाठी [या रेपॉझिटरी](https://github.com/ShivamGoyal03/RoamMind) तपासू शकता.
    
> शिवाय, तुम्ही एजंटच्या क्षमतेस अधिक माहिती प्रदान करण्यासाठी आणि वापरकर्त्यांच्या विनंत्यांवर आधारित स्वयंचलित कार्ये करण्यासाठी **Knowledge Base** आणि **Actions** जोडू शकता. या सरावासाठी, तुम्ही ही पावले वगळू शकता.
    
![एजंट सेटअप](../../../translated_images/mr/agent-setup.9bbb8755bf5df672.webp)

3. नवीन मल्टी-AI एजंट तयार करण्यासाठी, फक्त **New Agent** वर क्लिक करा. नवा तयार केलेला एजंट नंतर Agents पृष्ठावर प्रदर्शित होईल.


## एजंटची चाचणी करा

एजंट तयार केल्यानंतर, तुम्ही Microsoft Foundry पोर्टलच्या प्लेग्राउंडमध्ये ते वापरकर्त्यांच्या प्रश्नांना कसे प्रतिसाद देते हे तपासू शकता.

1. तुमच्या एजंटसाठीच्या **Setup** पॅनच्या वरच्या भागात, **Try in playground** निवडा.
2. **Playground** पॅनमध्ये, तुम्ही चॅट विंडोमध्ये प्रश्न टाइप करून एजंटशी संवाद साधू शकता. उदाहरणार्थ, तुम्ही एजंटला 28 तारखेला Seattle ते New York साठी फ्लाइट शोधण्यासाठी विचारू शकता.

    > **सूचना:** या सरावात कोणतीही वास्तविक-वेळेची डेटा वापरली जात नसल्यामुळे एजंट अचूक उत्तरं देणार नाही. उद्देश म्हणजे दिलेल्या सूचनांवर आधारित वापरकर्त्यांच्या प्रश्नांना समजून घेण्याची आणि प्रतिसाद देण्याची एजंटची क्षमता तपासणे.

    ![एजंट प्लेग्राउंड](../../../translated_images/mr/agent-playground.dc146586de715010.webp)

3. एजंटची चाचणी केल्यानंतर, त्याच्या क्षमतेत वाढ करण्यासाठी तुम्ही अधिक intents, प्रशिक्षण डेटा, आणि actions जोडून ते आणखी सानुकूल करू शकता.

## संसाधने हटवा

जेव्हा तुम्ही एजंटची चाचणी पूर्ण केली की, अतिरिक्त खर्च टाळण्यासाठी तुम्ही ते हटवू शकता.
1. [Azure पोर्टल](https://portal.azure.com) उघडा आणि त्या रिसोर्स ग्रुपचे घटक पहा ज्यात तुम्ही या सरावात वापरलेल्या हब संसाधने तैनात केली होती.
2. टूलबारवर, **Delete resource group** निवडा.
3. रिसोर्स ग्रुपचे नाव प्रविष्ट करा आणि ते हटवायचे असल्याची पुष्टी करा.

## संसाधने

- [Microsoft Foundry दस्तऐवजीकरण](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio शी सुरूवात](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure वरील AI एजंट्सचे मूलतत्त्वे](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI डिस्कॉर्ड](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
अस्वीकरण:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, परंतु कृपया लक्षात घ्या की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेचा अभाव असू शकतो. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानणे आवश्यक आहे. महत्त्वाची माहिती असल्यास व्यावसायिक मानवी अनुवाद शिफारसीय आहे. या अनुवादाच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमजांसाठी किंवा चुकांमुळे आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->