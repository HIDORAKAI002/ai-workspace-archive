# Azure AI Agent ਸੇਵਾ ਵਿਕਾਸ

ਇਸ ਵਿਆਯਾਮ ਵਿੱਚ, ਤੁਸੀਂ [Microsoft Foundry ਪੋਰਟਲ](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) ਵਿੱਚ Azure AI Agent ਸੇਵਾ ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਕੇ Flight Booking ਲਈ ਇੱਕ ਏਜੰਟ ਬਣਾਉਂਦੇ ਹੋ। ਇਹ ਏਜੰਟ ਵਰਤੋਂਕਾਰਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਕੇ ਉਡਾਣਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਉਪਲਬਧ ਕਰਵਾ سکےਗਾ।

## ਤਿਆਰੀ ਲੋੜਾਂ

ਇਸ ਕਸਰਤ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ, ਤੁਹਾਡੇ ਕੋਲ ਇਹ ਚੀਜ਼ਾਂ ਲੋੜੀਂਦੀਆਂ ਹਨ:
1. ਇੱਕ Azure ਖਾਤਾ ਜਿਸ ਵਿੱਚ ਸਰਗਰਮ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਹੋਵੇ। [ਮੁਫ਼ਤ ਖਾਤਾ ਬਣਾਓ](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. ਤੁਹਾਡੇ ਕੋਲ Microsoft Foundry ਹੱਬ ਬਣਾਉਣ ਦੀ ਇਜਾਜ਼ਤ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ ਜਾਂ ਕੋਈ ਤੁਹਾਡੇ ਲਈ ਹੁੰਬ ਬਣਾਇਆ ਹੋਵੇ।
    - ਜੇ ਤੁਹਾਡੇ ਭੂਮਿਕਾ Contributor ਜਾਂ Owner ਹੈ, ਤਾਂ ਤੁਸੀਂ ਇਸ ਟਿਊਟੋਰੀਅਲ ਵਿੱਚ ਦਿੱਤੇ ਕਦਮ ਅਨੁਸਰਣ ਕਰ ਸਕਦੇ ਹੋ।

## ਇੱਕ Microsoft Foundry ਹੱਬ ਬਣਾਓ

> **ਨੋਟ:** Microsoft Foundry ਪਹਿਲਾਂ Azure AI Studio ਦੇ ਨਾਮ ਨਾਲ ਜਾਣਿਆ ਜਾਂਦਾ ਸੀ।

1. Microsoft Foundry ਦੇ [ਬਲੌਗ ਪੋਸਟ](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ਵਿੱਚ ਦਿੱਤੀ ਗਈ ਹਿਦਾਇਤਾਂ ਦਾ ਪਾਲਣ ਕਰਕੇ ਇੱਕ Microsoft Foundry ਹੱਬ ਬਣਾਓ।
2. ਜਦੋਂ ਤੁਹਾਡੇ ਪ੍ਰੋਜੈਕਟ ਬਣ ਜਾਵੇ, ਦਿਖਾਈ ਦੇ ਰਹੀਆਂ ਕਿਸੇ ਵੀ ਟਿਪਸ ਨੂੰ ਬੰਦ ਕਰੋ ਅਤੇ Microsoft Foundry ਪੋਰਟਲ ਵਿਚ ਪ੍ਰੋਜੈਕਟ ਸਫ਼ਾ ਦੀ ਸਮੀਖਿਆ ਕਰੋ, ਜੋ ਕਿ ਹੇਠਾਂ ਦੀ ਤਸਵੀਰ ਵਰਗਾ ਲੱਗੇਗਾ:

    ![Microsoft Foundry Project](../../../translated_images/pa/azure-ai-foundry.88d0c35298348c2f.webp)

## ਮਾਡਲ ਤਾਇਨਾਤ ਕਰੋ

1. ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਦੀ ਖਬਰੇਂ ਸੈਕਸ਼ਨ ਵਿੱਚ, ਖੱਬੇ ਪਾਸੇ ਵਾਲੇ ਪੈਨ ਵਿੱਚ, **My assets** ਹਿੱਸੇ ਵਿੱਚ, **Models + endpoints** ਪੇਜ ਚੁਣੋ।
2. **Models + endpoints** ਸਫ਼ੇ 'ਤੇ, **Model deployments** ਟੈਬ ਵਿੱਚ, **+ Deploy model** ਮੇਨੂ ਵਿੱਚੋਂ, **Deploy base model** ਚੁਣੋ।
3. ਸੂਚੀ ਵਿੱਚੋਂ `gpt-4o-mini` ਮਾਡਲ ਨੂੰ ਖੋਜੋ ਅਤੇ ਇਸ ਨੂੰ ਚੁਣੋ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।

    > **ਨੋਟ**: TPM ਘਟਾਉਣਾ ਸਹਾਇਤਾ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਤੁਸੀਂ ਆਪਣੀ ਵਰਤ ਰਹੀ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਵਿੱਚ ਉਪਲਬਧ ਕੋਟਾ ਬਹੁਤ ਜ਼ਿਆਦਾ ਨਾ ਵਰਤੋਂ।

    ![Model Deployed](../../../translated_images/pa/model-deployment.3749c53fb81e18fd.webp)

## ਏਜੰਟ ਬਣਾਓ

ਹੁਣ ਜਦੋਂ ਤੁਸੀਂ ਇੱਕ ਮਾਡਲ ਤਾਇਨਾਤ ਕਰ ਚੁੱਕੇ ਹੋ, ਤੁਸੀਂ ਇੱਕ ਏਜੰਟ ਬਣਾਉਂਦੇ ਹੋ ਸਕਦੇ ਹੋ। ਏਜੰਟ ਇੱਕ ਗੱਲਬਾਤੀ AI ਮਾਡਲ ਹੁੰਦਾ ਹੈ ਜੋ ਵਰਤੋਂਕਾਰਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

1. ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਦੀ ਖਬਰੇਂ ਸੈਕਸ਼ਨ ਵਿੱਚ, ਖੱਬੇ ਪਾਸੇ ਵਾਲੇ ਪੈਨ ਵਿੱਚ, **Build & Customize** ਹਿੱਸੇ ਵਿੱਚ, **Agents** ਪੇਜ ਚੁਣੋ।
2. ਇੱਕ ਨਵਾਂ ਏਜੰਟ ਬਣਾਉਣ ਲਈ **+ Create agent** 'ਤੇ ਕਲਿੱਕ ਕਰੋ। **Agent Setup** ਡਾਇਲਾਗ ਬਾਕਸ ਵਿੱਚ:
    - ਏਜੰਟ ਲਈ ਇੱਕ ਨਾਮ ਦਿਓ, ਜਿਵੇਂ ਕਿ `FlightAgent`।
    - ਪਿਛਲੇ ਬਣਾਏ ਹੋਏ `gpt-4o-mini` ਮਾਡਲ ਤਾਇਨਾਤ ਨੂੰ ਚੁਣਿਆ ਹੋਇਆ ਹੋਵੇ।
    - ਏਜੰਟ ਨੂੰ ਅਨੁਸਾਰ ਅਗੇ ਦਿੱਤੇ ਪ੍ਰਾਂਪਟ ਮੁਤਾਬਕ **Instructions** ਸੈੱਟ ਕਰੋ। ਇਹਾਂ ਇੱਕ ਉਦਾਹਰਨ ਹੈ:
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
> ਵਿਸਥਾਰਪੂਰਕ ਪ੍ਰਾਂਪਟ ਲਈ, ਤੁਸੀਂ ਇਸ [ਰਿਪੋਜ਼ਿਟਰੀ](https://github.com/ShivamGoyal03/RoamMind) ਨੂੰ ਵੇਖ ਸਕਦੇ ਹੋ।
    
> ਇਸ ਤੋਂ علاوہ, ਤੁਸੀਂ ਏਜੰਟ ਦੀ ਸਮਰੱਥਾ ਵਧਾਉਣ ਲਈ **Knowledge Base** ਅਤੇ **Actions** ਵੀ ਜੋੜ ਸਕਦੇ ਹੋ, ਜਿਨ੍ਹਾਂ ਨਾਲ ਵਰਤੋਂਕਾਰ ਦੀਆਂ ਬੇਨਤੀਆਂ ਦੇ ਅਧਾਰ 'ਤੇ ਹੋਰ ਜਾਣਕਾਰੀ ਦਿੱਤੀ ਜਾ ਸਕਦੀ ਹੈ ਅਤੇ ਆਟੋਮੇਟਿਕ ਕੰਮ ਕਰਵਾਏ ਜਾ ਸਕਦੇ ਹਨ। ਇਸ ਕਸਰਤ ਲਈ, ਤੁਸੀਂ ਇਹ ਕਦਮ ਛੱਡ ਸਕਦੇ ਹੋ।
    
![Agent Setup](../../../translated_images/pa/agent-setup.9bbb8755bf5df672.webp)

3. ਇੱਕ ਨਵਾਂ multi-AI ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਿਰਫ **New Agent** 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਨਵਾਂ ਬਣਾਇਆ ਗਿਆ ਏਜੰਟ ਆਗਲੇ Agents ਪੇਜ 'ਤੇ ਦਰਸਾਇਆ ਜਾਵੇਗਾ।

## ਏਜੰਟ ਟੈਸਟ ਕਰੋ

ਏਜੰਟ ਬਣਾਉਣ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਇਸ ਨੂੰ ਟੈਸਟ ਕਰ ਸਕਦੇ ਹੋ ਕਿ ਇਹ Microsoft Foundry ਪੋਰਟਲ ਪਲੇਗ੍ਰਾਊਂਡ ਵਿੱਚ ਵਰਤੋਂਕਾਰ ਦੇ ਸਵਾਲਾਂ ਦਾ ਕਿੱਦਾਂ ਜਵਾਬ ਦਿੰਦਾ ਹੈ।

1. ਆਪਣੇ ਏਜੰਟ ਲਈ **Setup** ਪੈਨ ਦੇ ਸਿਰਲੇਖ ਵਿਖੇ, **Try in playground** ਚੁਣੋ।
2. **Playground** ਪੈਨ ਵਿੱਚ, ਤੁਸੀਂ ਚੈਟ ਵਿੰਡੋ ਵਿੱਚ ਸਵਾਲ ਲਿਖ ਕੇ ਏਜੰਟ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹੋ। ਉਦਾਹਰਨ ਵਜੋਂ, ਤੁਸੀਂ ਏਜੰਟ ਨੂੰ 28 ਤਾਰੀਖ ਨੂੰ ਸਿਅਟਲ ਤੋਂ ਨਿਊਯਾਰਕ ਲਈ ਉਡਾਣਾਂ ਖੋਜਣ ਲਈ ਕਹਿ ਸਕਦੇ ਹੋ।

    > **ਨੋਟ**: ਇਸ ਕਸਰਤ ਵਿੱਚ ਕੋਈ ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ ਵਰਤੀ ਨਹੀਂ ਜਾ ਰਹੀ, ਇਸ ਲਈ ਏਜੰਟ ਦਾ ਜਵਾਬ ਸਹੀ ਨਾ ਹੋਵੇ। ਇਸ ਦਾ ਮਕਸਦ ਏਜੰਟ ਦੀ ਸਮਝ ਅਤੇ ਦਿੱਤੀਆਂ ਨਿਰਦੇਸ਼ਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਵਰਤੋਂਕਾਰ ਦੇ ਸਵਾਲਾਂ ਨੂੰ ਜਵਾਬ ਦੇਣ ਦੀ ਸਮਰੱਥਾ ਨੂੰ ਟੈਸਟ ਕਰਨਾ ਹੈ।

    ![Agent Playground](../../../translated_images/pa/agent-playground.dc146586de715010.webp)

3. ਏਜੰਟ ਟੈਸਟ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਹੋਰ ਇਰਾਦੇ, ਟਰੇਨਿੰਗ ਡੇਟਾ ਅਤੇ ਕਾਰਵਾਈਆਂ ਜੋੜ ਕੇ ਉਸਦੀ ਸਮਰੱਥਾ ਨੂੰ ਵਧਾ ਸਕਦੇ ਹੋ।

## ਸਰੋਤ ਸਾਫ਼ ਕਰੋ

ਜਦੋਂ ਤੁਸੀਂ ਏਜੰਟ ਦੀ ਜਾਂਚ ਕਰ ਲੈਂਦੇ ਹੋ, ਤਾਂ ਵਾਧੂ ਖਰਚੇ ਟਲਾਉਣ ਲਈ ਉਸ ਨੂੰ ਮਿਟਾ ਸਕਦੇ ਹੋ।
1. [Azure ਪੋਰਟਲ](https://portal.azure.com) ਖੋਲ੍ਹੋ ਅਤੇ ਉਸ ਰਿਸੋর্স ਗਰੁੱਪ ਦੇ ਕਾਰਜ ਦੇਖੋ ਜਿੱਥੇ ਤੁਸੀਂ ਇਸ ਕਸਰਤ ਲਈ ਹੱਬ ਦੇ ਸਰੋਤ ਤਾਇਨਾਤ ਕੀਤੇ ਸਨ।
2. ਟੂਲਬਾਰ ਵਿੱਚੋਂ **Delete resource group** ਚੁਣੋ।
3. ਰਿਸੋর্স ਗਰੁੱਪ ਦਾ ਨਾਮ ਦਿਓ ਅਤੇ ਇਸਨੂੰ ਮਿਟਾਉਣ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।

## ਸਰੋਤ

- [Microsoft Foundry ਦਸਤਾਵੇਜ਼](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ਪੋਰਟਲ](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio ਨਾਲ ਸ਼ੁਰੂਆਤ](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 'ਤੇ AI ਏਜੰਟ ਦੀਆਂ ਬੁਨਿਆਦਾਂ](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪੱਤਰ**:
ਇਹ ਦਸਤਾਵੇਜ਼ AI ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਨੁਵਾਦ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਅਤ ਲਈ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਵਿੱਚ ਰੱਖੋ ਕਿ ਸਵੈਚਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮਰਥਿਤਾਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਮੂਲ ਦਸਤਾਵੇਜ਼ ਨੂੰ ਅਧਿਕਾਰਤ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਗੰਭੀਰ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫਾਰਿਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੀ ਵਰਤੋਂ ਤੋਂ ਉੱਪਜਣ ਵਾਲੀ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀ ਜਾਂ ਭ੍ਰਮ ਲਈ ਜਿੰਮੇਵਾਰ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->