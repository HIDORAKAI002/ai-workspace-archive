# Azure AI முகவர் சேவை அபிவிருத்தி

இந்த பயிற்சியில், [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)ல் Azure AI முகவர் சேவை கருவிகளைப் பயன்படுத்தி, விமான முன்பதிவு செய்ய ஒரு முகவரை உருவாக்குகிறீர்கள். இந்த முகவர் பயனர்களுடன் தொடர்பு கொண்டு விமானங்களின் பற்றிய தகவல்களை வழங்க முடியும்.

## முன்னோக்கிச் செய்யவேண்டியது

இந்த பயிற்சியை முடிக்க, நீங்கள் பின்வருபவை தேவை:
1. செயலில் உள்ள சந்தா கொண்ட Azure கணக்கு ஒன்று. [கணக்கை இலவசமாக உருவாக்கவும்](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Microsoft Foundry ஹப் ஒன்றை உருவாக்க அனுமதிகள் அல்லது அது உங்கள் காலை உருவாக்கப்பட்டிருக்க வேண்டும்.
    - உங்கள் பாத்திரம் Contributor அல்லது Owner என்றால், இந்த வழிகாட்டியிலுள்ள படிகளை பின்பற்றலாம்.

## Microsoft Foundry ஹப் உருவாக்கவும்

> **கவனிக்கவும்:** Microsoft Foundry முந்தையதாக Azure AI Studio என்று அழைக்கப்பட்டது.

1. Microsoft Foundry ஹப் உருவாக்குவதற்கான இந்த [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) வலைப்பதிவின் வழிகாட்டியைக் கிளந்து பின்பற்றவும்.
2. உங்கள் திட்டம் உருவாக்கப்பட்டதும், காணப்படும் எந்தவொரு குறிப்புகளையும் மூடவும் மற்றும் Microsoft Foundry போர்டலில் திட்ட பக்கத்தை பரிசீலனை செய்யவும். அது பின்வரும் படத்தைப் போலவே இருக்க வேண்டும்:

    ![Microsoft Foundry Project](../../../translated_images/ta/azure-ai-foundry.88d0c35298348c2f.webp)

## ஒரு மாதிரியை நிறுவவும்

1. உங்கள் திட்டத்திற்கான இடது பக்கத்தில் உள்ள பக்கியில், **My assets** பகுதியில் **Models + endpoints** பக்கத்தை தேர்ந்தெடுக்கவும்.
2. **Models + endpoints** பக்கத்தில், **Model deployments** தாவலில், **+ Deploy model** மெனுவில் இருந்து **Deploy base model** என்பதைத் தேர்ந்தெடுக்கவும்.
3. பட்டியலில் `gpt-4o-mini` மாதிரியைத் தேடி, அதைப் தேர்ந்தெடுத்து உறுதிப்படுத்தவும்.

    > **கவனிக்கவும்**: TPM ஐ குறைப்பது, நீங்கள் பயன்படுத்தும் சந்தாவிலுள்ள குவாட்டாவை (quota) அதிகமாக பயன்படுத்துவதை தவிர்க்க உதவும்.

    ![Model Deployed](../../../translated_images/ta/model-deployment.3749c53fb81e18fd.webp)

## ஒரு முகவரை உருவாக்கவும்

மாதிரி நிறுவப்பட்டவுடன், ஒரு முகவரை உருவாக்கலாம். முகவர் என்பது பயனர்களுடன் தொடர்பு கொள்ளக்கூடிய உரையாடல் AI மாதிரியே ஆகும்.

1. உங்கள் திட்டத்திற்கான இடது பக்கத்தில், **Build & Customize** பகுதியிலுள்ள **Agents** பக்கத்தை தேர்ந்தெடுக்கவும்.
2. புதிய முகவரை உருவாக்க **+ Create agent** என்பதை கிளிக் செய்யவும். **Agent Setup** கலந்துரையாடல் பெட்டியில்:
    - `FlightAgent` போன்ற ஒரு முகவர் பெயரை உள்ளிடவும்.
    - நீங்கள் முன்பு உருவாக்கிய `gpt-4o-mini` மாதிரி நிறுவலைத் தேர்ந்தெடுக்க உறுதிசெய்யவும்.
    - உங்கள் முகவர் பின்பற்ற வேண்டிய கட்டளைகளை **Instructions** பகுதியில் உள்ளிடவும். இது ஒரு உதாரணம்:
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
> விரிவான கட்டளைக்காக, [இந்த சேகரிப்பை](https://github.com/ShivamGoyal03/RoamMind) பார்க்கலாம் மேலதிக தகவலுக்கு.
    
> மேலும, பயனர் கோரிக்கைகளை அடிப்படையாக கொண்டு மேலதிக தகவல்களை வழங்க மற்றும் தானாக செயல்களை நிறைவேற்ற **Knowledge Base** மற்றும் **Actions** சேர்க்கலாம். இந்த பயிற்சிக்காக, இந்த படிகள் தவிர்க்கலாம்.
    
![Agent Setup](../../../translated_images/ta/agent-setup.9bbb8755bf5df672.webp)

3. புதிய மட்கு-AI முகவரை உருவாக்க **New Agent** என்ற பொத்தானை கிளிக் செய்யவும். அதன் பிறகு புதிய உருவாக்கப்பட்ட முகவர் Agents பக்கத்தில் காட்சி பளுவாகிறது.

## முகவரை சோதிக்கவும்

முகவரை உருவாக்கிய பிறகு, பயனர்களின் கேள்விகளுக்கு அது எப்படி பதிலளிக்கின்றது என்பதை Microsoft Foundry போர்டல் பிளேகிரௌண்டில் சோதிக்கலாம்.

1. முகவருக்கான **Setup** பகுதியில் மேல் உள்ள **Try in playground** ஐ தேர்ந்தெடுக்கவும்.
2. **Playground** பகுதியில், உரையாடல் சாளரத்தில் கேள்விகளை என்னையாக<Type> அடையாளம் செய்து முகவருடன் தொடர்பு கொள்ளலாம். உதாரணமாக, 28ம் தேதி சில்கியிலிருந்து நியூயார்க்குக்கு விமானங்களை தேடுமாறு கேட்கலாம்.

    > **கவனிக்கவும்**: இந்த பயிற்சியில் நேரடி தரவு பயன்படுத்தப்படுவதில்லை, எனவே முகவர் சரியான பதில்களை வழங்க முடியாது. இதன் நோக்கம், முகவரின் பயனரின் கேள்விகளை புரிந்து பதிலளிக்கும் திறனை சோதிப்பதே ஆகும்.

    ![Agent Playground](../../../translated_images/ta/agent-playground.dc146586de715010.webp)

3. முகவரை சோதித்த பிறகு, இது மேலும் பன்முகத் திறன் பெற முடியும்: மேலும் நோக்கங்களையும் பயிற்சி தரவுகளையும் செயல்பாடுகளையும்ச் சேர்க்கவும்.

## வளங்களை நீக்கவும்

முகவரை சோதனை முடிந்ததும், கூடுதல் செலவுகளை தவிர்க்க அதனை நீக்கலாம்.
1. [Azure portal](https://portal.azure.com)ஐ திறந்து, இந்த பயிற்சிக்கு பயன்படும் ஹப் வளங்கள் உள்ள வள குழுவின் உள்ளடக்கத்தை பார்க்கவும்.
2. கருவிக்கட்டியில் **Delete resource group** தேர்ந்தெடுக்கவும்.
3. வளக் குழுவின் பெயரை உள்ளிடவும் மற்றும் நீக்க விரும்புவதாக உறுதிப்படுத்தவும்.

## வளங்கள்

- [Microsoft Foundry ஆவணங்கள்](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry போர்டல்](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio தொடக்க வழிகாட்டி](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure AI முகவர்களின் அடிப்படைகள்](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**குறிப்புரை**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவையான [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழிபெயர்க்கப்பட்டது. நாங்கள் துல்லியத்திற்கு முயலும் போதிலும், இயந்திரத்தின் மூலம் செய்யப்பட்ட மொழிபெயர்ப்புகளில் தவறுகள் அல்லது தவறான தகவல்கள் இருக்கக்கூடும் என்பதைக் கவனத்தில் கொள்ளவும். மூல ஆவணம் அதன் இயல்புநிலையான மொழியில் அதிகாரபூர்வ மூலமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்பாட்டால் ஏற்படக்கூடிய எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கங்களுக்காக நாங்கள் பொறுப்பு ஏற்க மாட்டோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->