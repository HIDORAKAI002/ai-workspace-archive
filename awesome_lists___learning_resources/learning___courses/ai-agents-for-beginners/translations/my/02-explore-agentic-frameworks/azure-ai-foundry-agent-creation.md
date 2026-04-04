# Azure AI Agent Service ဖွံ့ဖြိုးတိုးတက်မှု

ဒီလေ့ကျင့်ခန်းမှာတော့ [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) ရှိ Azure AI Agent ဝန်ဆောင်မှုကိရိယာတွေကို အသုံးပြုပြီး ရထားခရီးစာရင်းသွင်းမှုအတွက် agent တစ်ခု ဖန်တီးမှာဖြစ်ပါတယ်။ agent ဟာ အသုံးပြုသူတွေနဲ့ ဆက်သွယ်ပေးနိုင်ပြီး ရထားခရီးစဉ်အကြောင်း အချက်အလက်များ ပံ့ပိုးပေးနိုင်မှာ ဖြစ်ပါတယ်။

## မလိုအပ်ချက်များ

ဒီလေ့ကျင့်ခန်းကိုပြီးမြောက်ဖို့အတွက် အောက်ပါအရာတွေ လိုအပ်ပါသည်။
1. လှုပ်ရှားနေတဲ့ subscription ပါ အဇူးအကောင့်တစ်ခု။ [အခမဲ့အကောင့်ဖန်တီးရန်](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)
2. Microsoft Foundry hub ဖန်တီးခွင့်ရှိရမည် (သို့) သင့်အတွက် ဖန်တီးပေးထားရမည်။
    - သင့်အခန်းကဏ္ဍမှာ Contributor (ပါဝင်သူ) သို့မဟုတ် Owner (ပိုင်ရှင်) ဖြစ်လျှင် ဒီလမ်းညွှန်ချက်တွေကို လိုက်နာနိုင်သည်။

## Microsoft Foundry hub ဖန်တီးခြင်း

> **မှတ်ချက်**: Microsoft Foundry ကို ယခင်က Azure AI Studio လို့လည်း ခေါ်ကြသည်။

1. Microsoft Foundry hub ကို ဖန်တီးရန် [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ဘလော့ဂ်ပို့စ်မှ ညွှန်ကြားချက်များကို လိုက်နာပါ။
2. သင့်အစီအစဉ်ကို ဖန်တီးပြီးပါက ပြသနေသော အကြံပေးစာမျက်နှာများကိုပိတ်ပြီး Microsoft Foundry portal ရှိ အစီအစဉ် စာမျက်နှာကို ပြန်လည်သုံးသပ်ပါ၊ အောက်ပါပုံစံနှင့် ဆင်တူရှိပါလိမ့်မည် -

    ![Microsoft Foundry Project](../../../translated_images/my/azure-ai-foundry.88d0c35298348c2f.webp)

## မော်ဒယ်တစ်ခု တပ်ဆင်ပါ

1. သင့်အစီအစဉ်၏ ဘေးဘက်က မီနူးတွင် **My assets** အပိုင်းတွင် **Models + endpoints** စာမျက်နှာကို ရွေးချယ်ပါ။
2. **Models + endpoints** စာမျက်နှာတွင် **Model deployments** တက်ဘ်၌ **+ Deploy model** မီနူးတွင် **Deploy base model** ကိုရွေးချယ်ပါ။
3. လိုအပ်သော `gpt-4o-mini` မော်ဒယ်ကို အထဲကနေ ရှာ၍ ရွေးချယ်ပြီး အတည်ပြုပါ။

    > **မှတ်ချက်**: TPM နည်းပါးစေခြင်းက Subscription ဖောက်သည် စွမ်းဆောင်ရည်ကို မကျော်လွန်စေဖို့ ကူညီပေးသည်။

    ![Model Deployed](../../../translated_images/my/model-deployment.3749c53fb81e18fd.webp)

## Agent တစ်ခု ဖန်တီးပါ

မော်ဒယ်တပ်ဆင်ပြီးဖြစ်ရင် agent တစ်ခု ဖန်တီးနိုင်ပြီ။ agent ဆိုတာ သုံးစွဲသူတွေနဲ့ ဆက်သွယ်နိုင်တဲ့ စကားပြော AI မော်ဒယ်တစ်ခုဖြစ်သည်။

1. သင့်အစီအစဉ်၏ ဘေးဘက် မီနူးတွင် **Build & Customize** အပိုင်း နေရာမှ **Agents** စာမျက်နှာကို ရွေးချယ်ပါ။
2. **+ Create agent** ကို နှိပ်ပြီး agent အသစ် ဖန်တီးပါ။ **Agent Setup** စာမျက်နှာတွင် -
    - agent အတွက် နာမည်တစ်ခုထည့်ပါ၊ ဥပမာ `FlightAgent`
    - မကြာသေးမီက ဖန်တီးထားသော `gpt-4o-mini` မော်ဒယ်တပ်ဆင်မှု ရွေးချယ်ထားမရှိမဖြစ်
    - **Instructions** ကို သင့် agent အတွက်လိုအပ်သလို ပရုံ့ ပြုလုပ်ပါ။ ဥပမာအောက်ပါအတိုင်း:
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
> ပြည့်စုံစွာ ရေးသားထားသော prompt အတွက် [ဒီ repository](https://github.com/ShivamGoyal03/RoamMind) ကိုလေ့လာနိုင်သည်။
    
> ထို့အပြင် **Knowledge Base** နှင့် **Actions** ကို ဖြည့်စွက်နိုင်ပြီး အသုံးပြုသူရဲ့ တောင်းဆိုချက်အပေါ် အချက်အလက် ပိုမိုပေးနိုင်ခြင်း၊ အလိုအလျောက် လုပ်ဆောင်ချက်များ ပြုလုပ်နိုင်ခြင်းများ ဖော်ဆောင်နိုင်သည်။ ဒီလေ့ကျင့်ခန်းအတွက်တော့ ဒီအဆင့်တွေကို ကျော်လွန်နိုင်ပါသည်။
    
![Agent Setup](../../../translated_images/my/agent-setup.9bbb8755bf5df672.webp)

3. multi-AI agent အသစ် တစ်ခု ဖန်တီးရန် **New Agent** ကို ရိုက်နှိပ်ပါ။ ဖန်တီးပြီးသော agent သည် Agents စာမျက်နှာ၌ ပြသမည်။

## Agent ကို စမ်းသပ်ရမည်

Agent ဖန်တီးပြီးပါက Microsoft Foundry portal playground တွင် သုံးစွဲသူမေးခွန်းများကို ကျွမ်းကျင်စွာ ဖြေကြားနိုင်မှု စမ်းသပ်နိုင်သည်။

1. သင့် agent အတွက် **Setup** အပေါ်ဆုံးတွင် **Try in playground** ကို ရွေးချယ်ပါ။
2. **Playground** ပိတ်စတိုင်းတွင် စကားပြောပြန်လည် ဆက်သွယ်နိုင်ပြီး ချက်ပြော စာမျက်နှာတွင် မေးခွန်းများ ရိုက်ထည့်နိုင်သည်။ ဥပမာ - Seattle မှ New York သို့ ၂၈ ရက်တွင် ရထားခရီးစဉ် ရှာဖွေပါ။

    > **မှတ်ချက်**: ဒီလေ့ကျင့်ခန်းတွင် အချိန်နောက်ဆုံး အချက်အလက်များ အသုံးမပြုပါဘူး၊ ထို့ကြောင့် တိကျနောက်ဆုံးဖြေပေးနိုင်မှု မရှိနိုင်၊ ဒီagent မေးခွန်းကို နားလည်ပြီး ဖြေကြားနိုင်မှု စမ်းသပ်မှု ဖြစ်သည်။

    ![Agent Playground](../../../translated_images/my/agent-playground.dc146586de715010.webp)

3. Agent ကို စမ်းသပ်ပြီးနောက်၊ မိမိစိတ်နှစ်သက်သလို ထပ်မံစိတ်ကြိုက်ပြင်ဆင်နိုင်သည်။ intents အသစ်ထည့်ခြင်း၊ လေ့ကျင့်ရေး ဒေတာများ ထည့်သွင်းခြင်းနှင့် လုပ်ဆောင်ချက်များ ဖြည့်စွက်ခြင်းတို့ဖြင့် အင်အားပိုမိုမြှင့်တင်နိုင်သည်။

## အရင်းအမြစ်များ ဖျက်ပစ်မည်

Agent စမ်းသပ်ပြီးဆုံးပါက ထပ်ထည့်စရိတ်များ ကျသင့်မှု မရှိစေရန် ဖြုတ်ပစ်နိုင်ပါသည်။
1. [Azure portal](https://portal.azure.com) ကိုဖွင့်ပြီး hub အရင်းအမြစ်များ တပ်ဆင်ထားသော resource group ၏ အကြောင်းအရာများကို ကြည့်ပါ။
2. မီနူးဘားတွင် **Delete resource group** ကိုရွေးချယ်ပါ။
3. Resource group နာမည် ရိုက်ထည့်ပြီး ဖျက်လိုကြောင်း အတည်ပြုပါ။

## အရင်းအမြစ်များ

- [Microsoft Foundry စာတမ်းများ](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio ကို စတင်အသုံးပြုခြင်း](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure ပေါ်ရှိ AI agents အခြေခံများ](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**မှတ်ချက်အရေးကြီး**  
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အား အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ရုပ်ဘာသာပြန်မှုများတွင် အမှားများ သို့မဟုတ် မှားယွင်းမှုများ ဖြစ်ပေါ်နိုင်ကြောင်း သတိပြုပါ။ မူရင်းစာတမ်းကို မိမိဘာသာစကားဖြင့်ဖြစ်သည်ကို တရားဝင်အရင်းအမြစ်အဖြစ် ယူဆရမည်ဖြစ်သည်။ အရေးကြီးသောအချက်အလက်များအတွက် စျေးကွက်အတည်ပြု ပြန်လည်ဘာသာပြန်သူများ၏ ဘာသာပြန်မှုကို ဦးတည်အသုံးပြုရန် အကြံပြုပါသည်။ ဤဘာသာပြန်မှုအသုံးပြုမှုကြောင့် ဖြစ်ပေါ်လာသည့် နားလည်မှုအမှားများ သို့မဟုတ် မှားယွင်းချက်များအတွက် ကျွန်ုပ်တို့ ဝန်ခံမခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->