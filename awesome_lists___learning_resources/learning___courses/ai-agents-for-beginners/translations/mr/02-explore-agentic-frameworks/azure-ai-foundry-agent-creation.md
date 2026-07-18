# मायक्रोसॉफ्ट फाउंड्री एजंट सेवा विकास

या सरावात, तुम्ही [मायक्रोसॉफ्ट फाउंड्री पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) मध्ये मायक्रोसॉफ्ट फाउंड्री एजंट सेवा साधने वापरून फ्लाइट बुकिंगसाठी एजंट तयार करता. एजंट वापरकर्त्यांशी संवाद साधू शकतो आणि फ्लाइट्सविषयी माहिती देऊ शकतो.

## पूर्वतयारी

हा सराव पूर्ण करण्यासाठी तुम्हाला खालील गोष्टी आवश्यक आहेत:
1. सक्रिय सदस्यत्व असलेले Azure खाते. [मुफ्त खाते तयार करा](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. तुम्हाला मायक्रोसॉफ्ट फाउंड्री हब तयार करण्याचा परवानगी हवी आहे किंवा एखादा हब तुमच्यासाठी तयार केलेला असावा.
    - जर तुमची भूमिका Contributor किंवा Owner असेल, तर तुम्ही या ट्यूटोरियलमधील पद्धती अनुसरू शकता.

## मायक्रोसॉफ्ट फाउंड्री हब तयार करा

> **टीप:** मायक्रोसॉफ्ट फाउंड्री याला पूर्वी Azure AI Studio असे म्हणत असत.

1. मायक्रोसॉफ्ट फाउंड्री ब्लॉग पोस्टमधील [या मार्गदर्शक सूचनांचे](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) पालन करा आणि मायक्रोसॉफ्ट फाउंड्री हब तयार करा.
2. जेव्हा तुमचा प्रोजेक्ट तयार होईल, तेव्हा कुठल्या टिपा दिसत असल्यास त्या बंद करा आणि मायक्रोसॉफ्ट फाउंड्री पोर्टलमधील प्रोजेक्ट पृष्ठ पुनरावलोकन करा, जे खालील प्रतिमेसारखे दिसायला हवे:

    ![Microsoft Foundry Project](../../../translated_images/mr/azure-ai-foundry.88d0c35298348c2f.webp)

## मॉडेल तैनात करा

1. तुमच्या प्रोजेक्ट साठीच्या डाव्या बाजूच्या पॅनमध्ये, **My assets** विभागात, **Models + endpoints** पृष्ठ निवडा.
2. **Models + endpoints** पृष्ठावर, **Model deployments** टॅबमध्ये, **+ Deploy model** मेनूमध्ये, **Deploy base model** निवडा.
3. यादीत `gpt-4.1-mini` मॉडेल शोधा, नंतर ते निवडा आणि पुष्टी करा.

    > **टीप**: TPM कमी केल्याने तुम्ही वापरत असलेल्या सदस्यत्वात उपलब्ध असणाऱ्या कोटाचे जास्त वापर टाळता येतो.

    ![Model Deployed](../../../translated_images/mr/model-deployment.3749c53fb81e18fd.webp)

## एजंट तयार करा

जेव्हा तुम्ही मॉडेल तैनात केले तेव्हा तुम्ही एजंट तयार करू शकता. एजंट हा एक संवादात्मक AI मॉडेल आहे जो वापरकर्त्यांशी संवाद साधण्यासाठी वापरला जातो.

1. प्रोजेक्टच्या डाव्या पॅनमध्ये, **Build & Customize** विभागात, **Agents** पृष्ठ निवडा.
2. नवीन एजंट तयार करण्यासाठी **+ Create agent** क्लिक करा. **Agent Setup** संवादात:
    - एजंटसाठी एक नाव प्रविष्ट करा, जसे की `FlightAgent`.
    - तुम्ही पूर्वी तयार केलेले `gpt-4.1-mini` मॉडेल तैनात केलेले आहे याची खात्री करा.
    - एजंटने अनुसरण करावयाच्या सूचनांनुसार **Instructions** सेट करा. येथे एक उदाहरण दिले आहे:
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
> अधिक तपशीलवार प्रॉम्प्टसाठी तुम्ही [हा रेपॉजिटरी](https://github.com/ShivamGoyal03/RoamMind) पाहू शकता.
    
> शिवाय, तुम्ही एजंटच्या क्षमतांमध्ये सुधारणा करण्यासाठी **Knowledge Base** आणि **Actions** जोडू शकता ज्यामुळे अधिक माहिती दिली जाईल आणि वापरकर्त्यांच्या विनंत्यांवर आधारित स्वयंचलित कामे करता येतील. या सरावासाठी तुम्ही हे पाऊल वगळू शकता.
    
![Agent Setup](../../../translated_images/mr/agent-setup.9bbb8755bf5df672.webp)

3. नवीन बहुआयामी AI एजंट तयार करण्यासाठी, फक्त **New Agent** क्लिक करा. नवीन तयार झालेला एजंट Agents पृष्ठावर दिसेल.


## एजंटची चाचणी करा

एजंट तयार केल्यानंतर, तुम्ही त्याचे परीक्षण करू शकता की तो वापरकर्त्यांच्या प्रश्नांना कसा प्रतिसाद देतो मायक्रोसॉफ्ट फाउंड्री पोर्टलच्या प्लेग्राउंडमध्ये.

1. तुमच्या एजंटसाठी **Setup** पॅनच्या शीर्षस्थानी **Try in playground** निवडा.
2. **Playground** पॅनमध्ये, तुम्ही चॅट विंडोमध्ये प्रश्न टाकून एजंटशी संवाद साधू शकता. उदाहरणार्थ, तुम्ही एजंटला 28 तारखेला सिएटलहून न्यू यॉर्क पर्यंतची फ्लाइट शोधायला सांगू शकता.

    > **टीप**: या सरावात कोणतीही वास्तविक-वेळेतील माहिती वापरली जात नाही त्यामुळे एजंट नेमके उत्तर देणार नाही. उद्दीष्ट आहे एजंटची वापरकर्त्यांच्या प्रश्नांना दिलेल्या सूचनांवरून समजून घेण्याची आणि प्रतिसाद देण्याची क्षमता तपासणे.

    ![Agent Playground](../../../translated_images/mr/agent-playground.dc146586de715010.webp)

3. एजंटची चाचणी केल्यानंतर, तुम्ही त्यात अधिक हेतू, प्रशिक्षण डेटा आणि क्रिया जोडून त्याची क्षमता वाढवू शकता.

## संसाधने साफ करा

एजंटची चाचणी केल्यानंतर, अतिरिक्त खर्च टाळण्यासाठी तुम्ही तो हटवू शकता.
1. [Azure portal](https://portal.azure.com) उघडा आणि या सरावात वापरलेल्या हब संसाधनांची संचिका असलेल्या रिसोर्स ग्रुपची सामग्री पहा.
2. टूलबारवर, **Delete resource group** निवडा.
3. रिसोर्स ग्रुपचे नाव टाका आणि त्याला हटवायचे असल्याची पुष्टी करा.

## संसाधने

- [मायक्रोसॉफ्ट फाउंड्री दस्तऐवज](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [मायक्रोसॉफ्ट फाउंड्री पोर्टल](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [मायक्रोसॉफ्ट फाउंड्री वापर करून सुरुवात करा](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure वरील AI एजंट मूलभूत](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI डिस्कॉर्ड](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->