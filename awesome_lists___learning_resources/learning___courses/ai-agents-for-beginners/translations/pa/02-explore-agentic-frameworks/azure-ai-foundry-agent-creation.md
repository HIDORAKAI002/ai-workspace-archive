# ਮਾਈਕ੍ਰੋਸਾਫਟ ਫਾਉਂਡਰੀ ਏਜੰਟ ਸੇਵਾ ਵਿਕਾਸ

ਇਸ ਅਭਿਆਸ ਵਿੱਚ, ਤੁਸੀਂ [Microsoft Foundry ਪੋਰਟਲ](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) ਵਿੱਚ Microsoft Foundry Agent Service ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋ ਇੱਕ ਫਲਾਈਟ ਬੁਕਿੰਗ ਲਈ ਏਜੰਟ ਬਣਾਉਣ ਲਈ। ਏਜੰਟ ਯੂਜ਼ਰਾਂ ਨਾਲ ਸੰਵਾਦ ਕਰ ਸਕੇਗਾ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਫਲਾਈਟਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਮੁਹੱਈਆ ਕਰਵਾਉਣ ਵਿੱਚ ਸਮਰੱਥ ਹੋਵੇਗਾ।

## ਜਰੂਰੀ ਸ਼ਰਤਾਂ

ਇਸ ਅਭਿਆਸ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ, ਤੁਹਾਨੂੰ ਹੇਠ ਲਿਖੀਆਂ ਚੀਜ਼ਾਂ ਦੀ ਲੋੜ ਹੈ:
1. ਇੱਕ Azure ਖਾਤਾ ਜਿਸ ਵਿੱਚ ਸਰਗਰਮ ਸਰਚਾਰਜ ਹੋਵੇ। [ਮੁਫ਼ਤ ਖਾਤਾ ਬਣਾਓ](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. ਤੁਹਾਨੂੰ Microsoft Foundry ਹੱਬ ਬਣਾਉਣ ਦੀ ਅਨੁਮਤੀ ਜਾਂ ਤੁਹਾਡੇ ਲਈ ਇਹ ਬਣਾਇਆ ਹੋਇਆ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।
    - ਜੇ ਤੁਹਾਡਾ ਭੂਮਿਕਾ Contributor ਜਾਂ Owner ਹੈ, ਤਾਂ ਤੁਸੀਂ ਇਸ ਟਿਊਟੋਰਿਅਲ ਦੀਆਂ ਕਦਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰ ਸਕਦੇ ਹੋ।

## Microsoft Foundry ਹੱਬ ਬਣਾਓ

> **ਨੋਟ:** Microsoft Foundry ਨੂੰ ਪੂਰਵ ਵਿੱਚ Azure AI Studio ਦੇ ਨਾਮ ਨਾਲ ਜਾਣਿਆ ਜਾਂਦਾ ਸੀ।

1. Microsoft Foundry [ਬਲੌਗ ਪੋਸਟ](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ਤੋਂ Microsoft Foundry ਹੱਬ ਬਣਾਉਣ ਲਈ ਇਹ ਹਦਾਇਤਾਂ ਮਾਨੋ।
2. ਜਦੋਂ ਤੁਹਾਡਾ ਪ੍ਰੋਜੈਕਟ ਬਣ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਦਿਖਾਈ ਦੇਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਟਿਪਾਂ ਨੂੰ ਬੰਦ ਕਰੋ ਅਤੇ Microsoft Foundry ਪੋਰਟਲ ਵਿੱਚ ਪ੍ਰੋਜੈਕਟ ਪੰਨਾ ਰਿਵਿਊ ਕਰੋ, ਜੋ ਹੇਠਾਂ ਦਿੱਤੀ ਤਸਵੀਰ ਵਾਂਗ ਲੱਗਣਾ ਚਾਹੀਦਾ ਹੈ:

    ![Microsoft Foundry Project](../../../translated_images/pa/azure-ai-foundry.88d0c35298348c2f.webp)

## ਮਾਡਲ ਨੂੰ ਤੈਨਾਤ ਕਰੋ

1. ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਈ ਖੱਬੇ ਪਾਸੇ ਪੈਨ ਵਿੱਚ, **My assets** ਭਾਗ ਵਿੱਚ, **Models + endpoints** ਪੰਨਾ ਚੁਣੋ।
2. **Models + endpoints** ਪੰਨੇ ਵਿੱਚ, **Model deployments** ਟੈਬ ਵਿੱਚ, **+ Deploy model** ਮੈਨੂ ਵਿੱਚੋਂ **Deploy base model** ਚੁਣੋ।
3. ਸੂਚੀ ਵਿੱਚ `gpt-4.1-mini` ਮਾਡਲ ਲਈ ਖੋਜੋ, ਫਿਰ ਇਸਨੂੰ ਚੁਣੋ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ।

    > **ਨੋਟ**: TPM ਘਟਾਉਣ ਨਾਲ ਤੁਹਾਡੇ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਵਿੱਚ ਉਪਲਬਧ ਕੋਟਾ ਦੇ ਜ਼ਿਆਦਾ ਉਪਯੋਗ ਤੋਂ ਬਚਿਆ ਜਾ ਸਕਦਾ ਹੈ।

    ![Model Deployed](../../../translated_images/pa/model-deployment.3749c53fb81e18fd.webp)

## ਏਜੰਟ ਬਣਾਓ

ਹੁਣ ਜਦੋਂ ਤੁਸੀਂ ਇੱਕ ਮਾਡਲ ਤੈਨਾਤ ਕਰ ਚੁੱਕੇ ਹੋ, ਤੁਸੀਂ ਇੱਕ ਏਜੰਟ ਬਣਾਉਣ ਦੇ ਯੋਗ ਹੋ। ਏਜੰਟ ਇੱਕ ਗੱਲਬਾਤੀ AI ਮਾਡਲ ਹੈ ਜੋ ਯੂਜ਼ਰਾਂ ਨਾਲ ਸੰਵਾਦ ਕਰਨ ਲਈ ਵਰਤਿਆ ਜਾ ਸਕਦਾ ਹੈ।

1. ਆਪਣੇ ਪ੍ਰੋਜੈਕਟ ਲਈ ਖੱਬੇ ਪਾਸੇ ਪੈਨ ਵਿੱਚ, **Build & Customize** ਭਾਗ ਵਿੱਚ, **Agents** ਪੰਨਾ ਚੁਣੋ।
2. ਇੱਕ ਨਵਾਂ ਏਜੰਟ ਬਣਾਉਣ ਲਈ **+ Create agent** 'ਤੇ ਕਲਿੱਕ ਕਰੋ। **Agent Setup** ਡਾਇਲਾਗ ਬਾਕਸ ਵਿੱਚ:
    - ਏਜੰਟ ਲਈ ਇੱਕ ਨਾਮ ਭਰੋ, ਜਿਵੇਂ ਕਿ `FlightAgent`।
    - ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਸੀਂ ਪਹਿਲਾਂ ਬਣਾਏ `gpt-4.1-mini` ਮਾਡਲ ਤੈਨਾਤ ਚੁਣਿਆ ਹੈ।
    - **Instructions** ਨੂੰ ਉਸ ਪ੍ਰੰਪਟ ਅਨੁਸਾਰ ਸੈੱਟ ਕਰੋ ਜੋ ਤੁਸੀਂ ਏਜੰਟ ਨੂੰ ਫਾਲੋ ਕਰਵਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ। ਇੱਥੇ ਇੱਕ ਉਦਾਹਰਣ ਹੈ:
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
> ਵਿਸਥਾਰਪੂਰਕ ਪ੍ਰੰਪਟ ਲਈ, ਤੁਸੀਂ ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ [ਇਹ ਰਿਪੋਜ਼ੀਟਰੀ](https://github.com/ShivamGoyal03/RoamMind) ਚੈਕ ਕਰ ਸਕਦੇ ਹੋ।
    
> ਇਸ ਤੋਂ ਅਲਾਵਾ, ਤੁਸੀਂ ਏਜੰਟ ਦੀ ਸਮਰੱਥਾ ਵਧਾਉਣ ਲਈ **Knowledge Base** ਅਤੇ **Actions** ਭੀ ਸ਼ਾਮਲ ਕਰ ਸਕਦੇ ਹੋ, ਜੋ ਯੂਜ਼ਰ ਦੀਆਂ ਮੰਗਾਂ ਦੇ ਅਧਾਰ 'ਤੇ ਹੋਰ ਜਾਣਕਾਰੀ ਮہیਆ ਕਰਵਾਉਣ ਅਤੇ ਸਵੈਚਾਲਿਤ ਕਾਰਜ ਕਰਨ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੇ ਹਨ। ਇਸ ਅਭਿਆਸ ਲਈ, ਤੁਸੀਂ ਇਹ ਕਦਮ ਛੱਡ ਸਕਦੇ ਹੋ।
    
![Agent Setup](../../../translated_images/pa/agent-setup.9bbb8755bf5df672.webp)

3. ਇੱਕ ਨਵਾਂ ਮਲਟੀ-AI ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਿਰਫ **New Agent** 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਨਵਾਂ ਬਣਾਇਆ ਗਿਆ ਏਜੰਟ ਫਿਰ Agents ਪੰਨੇ 'ਤੇ ਦਿਖਾਇਆ ਜਾਵੇਗਾ।


## ਏਜੰਟ ਦੀ ਟੈਸਟਿੰਗ ਕਰੋ

ਏਜੰਟ ਬਣਾਉਣ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਇਸ ਨੂੰ Microsoft Foundry ਪੋਰਟਲ ਦੇ ਖੇਡ ਮੈਦਾਨ (playground) ਵਿੱਚ ਯੂਜ਼ਰ ਦੀਆਂ ਪੁੱਛ-ਗਿੱਛਾਂ 'ਤੇ ਇਸਦਾ ਜਵਾਬ ਦੇਖਣ ਲਈ ਟੈਸਟ ਕਰ ਸਕਦੇ ਹੋ।

1. ਆਪਣੇ ਏਜੰਟ ਦਾ **Setup** ਪੈਨ ਦੇ ਉੱਪਰ ਹਿੱਸੇ ਵਿੱਚ, **Try in playground** ਚੁਣੋ।
2. **Playground** ਪੈਨ ਵਿੱਚ, ਤੁਸੀਂ ਚੈਟ ਵਿੰਡੋ ਵਿੱਚ ਪ੍ਰਸ਼ਨ ਲਿਖ ਕੇ ਏਜੰਟ ਨਾਲ ਸੰਵਾਦ ਕਰ ਸਕਦੇ ਹੋ। ਉਦਾਹਰਣ ਵਜੋਂ, ਤੁਸੀਂ ਏਜੰਟ ਨੂੰ 28ਵੀਂ ਤਾਰੀਖ ਨੂੰ ਸੀਐਟਲ ਤੋਂ ਨਿਊਯਾਰਕ ਲਈ ਫਲਾਈਟਾਂ ਖੋਜਣ ਲਈ ਕਹਿ ਸਕਦੇ ਹੋ।

    > **ਨੋਟ**: ਇਸ ਅਭਿਆਸ ਵਿੱਚ ਕਿਸੇ ਵੀ ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ ਦੀ ਵਰਤੋਂ ਨਾ ਹੋਣ ਕਰਕੇ ਏਜੰਟ ਸਹੀ ਜਵਾਬ ਨਾ ਦੇਵੇ। ਇਸ ਦਾ ਮਕਸਦ ਏਜੰਟ ਦੀ ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰਣਾ ਹੈ ਕਿ ਉਹ ਦਿੱਤੇ ਹੁਕਮਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਯੂਜ਼ਰ ਦੇ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਸਮਝ ਅਤੇ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹੈ ਜਾਂ ਨਹੀਂ।

    ![Agent Playground](../../../translated_images/pa/agent-playground.dc146586de715010.webp)

3. ਏਜੰਟ ਦੀ ਟੈਸਟਿੰਗ ਤੋਂ ਬਾਅਦ, ਤੁਸੀਂ ਇਸ ਵਿਚ ਹੋਰ ਇਰਾਦੇ (intents), ਟ੍ਰੇਨਿੰਗ ਡੇਟਾ ਅਤੇ ਐਕਸ਼ਨ ਸ਼ਾਮਲ ਕਰਕੇ ਇਸ ਦੀ ਸਮਰੱਥਾ ਵਧਾ ਸਕਦੇ ਹੋ।

## ਸਰੋਤ ਸਾਫ਼ ਕਰੋ

ਜਦੋਂ ਤੁਸੀਂ ਏਜੰਟ ਦੀ ਟੈਸਟਿੰਗ ਖਤਮ ਕਰ ਲੈਣ, ਤਾਂ ਵਾਧੂ ਖਰਚਿਆਂ ਤੋਂ ਬਚਣ ਲਈ ਇਸਨੂੰ ਮਿਟਾ ਸਕਦੇ ਹੋ।
1. [Azure ਪੋਰਟਲ](https://portal.azure.com) ਖੋਲ੍ਹੋ ਅਤੇ ਉਸ ਰਿਸੋਰਸ ਗਰੁੱਪ ਦੀ ਸਮੱਗਰੀ ਵੇਖੋ ਜਿੱਥੇ ਤੁਸੀਂ ਇਸ ਅਭਿਆਸ ਵਿੱਚ ਵਰਤੀਆਂ ਗਈਆਂ ਹੱਬ ਸਰੋਤਾਂ ਨੂੰ ਤੈਨਾਤ ਕੀਤਾ ਹੈ।
2. ਟੂਲਬਾਰ 'ਤੇ, **Delete resource group** ਚੁਣੋ।
3. ਰਿਸੋਰਸ ਗਰੁੱਪ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ ਇਸਨੂੰ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ।

## ਸਰੋਤ

- [Microsoft Foundry ਦਸਤਾਵੇਜ਼ੀਕਰਨ](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ਪੋਰਟਲ](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ਨਾਲ ਸ਼ੁਰੂਆਤ](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 'ਤੇ AI ਏਜੰਟਾਂ ਦੇ ਮੂਲ ਤੱਤ](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI ਡਿਸਕਾਰਡ](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->