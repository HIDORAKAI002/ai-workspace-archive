[![अच्छे एआई एजेंट कैसे डिजाइन करें](../../../translated_images/hi/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(इस पाठ का वीडियो देखने के लिए ऊपर दिए चित्र पर क्लिक करें)_

# टूल उपयोग डिज़ाइन पैटर्न

टूल रोचक हैं क्योंकि वे एआई एजेंटों को अधिक व्यापक क्षमताओं की अनुमति देते हैं। एजेंट के पास सीमित क्रियाओं का समूह होने के बजाय, एक टूल जोड़ने से एजेंट अब व्यापक कार्य कर सकता है। इस अध्याय में, हम टूल उपयोग डिज़ाइन पैटर्न को देखेंगे, जो वर्णन करता है कि AI एजेंट कैसे विशिष्ट टूल का उपयोग करके अपने लक्ष्य प्राप्त कर सकते हैं।

## परिचय

इस पाठ में, हम निम्नलिखित प्रश्नों के उत्तर खोजने जा रहे हैं:

- टूल उपयोग डिज़ाइन पैटर्न क्या है?
- किन उपयोग मामलों में इसका प्रयोग किया जा सकता है?
- डिज़ाइन पैटर्न लागू करने के लिए किन तत्वों/निर्माण खंडों की आवश्यकता होती है?
- भरोसेमंद AI एजेंट बनाने के लिए टूल उपयोग डिज़ाइन पैटर्न के उपयोग के विशेष विचार क्या हैं?

## सीखने के लक्ष्य

इस पाठ को पूरा करने के बाद, आप सक्षम होंगे:

- टूल उपयोग डिज़ाइन पैटर्न और उसका उद्देश्य परिभाषित करें।
- उन उपयोग मामलों की पहचान करें जहां टूल उपयोग डिज़ाइन पैटर्न लागू होता है।
- डिज़ाइन पैटर्न लागू करने के लिए आवश्यक मुख्य तत्वों को समझें।
- इस डिज़ाइन पैटर्न का उपयोग करने वाले AI एजेंटों में विश्वसनीयता सुनिश्चित करने के लिए विचारों को पहचानें।

## टूल उपयोग डिज़ाइन पैटर्न क्या है?

**टूल उपयोग डिज़ाइन पैटर्न** LLMs को बाहरी टूल से संपर्क करने की क्षमता देने पर केंद्रित है ताकि विशेष लक्ष्य प्राप्त किए जा सकें। टूल कोड होते हैं जिन्हें एजेंट द्वारा क्रियान्वित किया जा सकता है। एक टूल एक सरल फ़ंक्शन हो सकता है, जैसे कैलकुलेटर, या तृतीय-पक्ष सेवा के लिए API कॉल जैसे स्टॉक मूल्य खोज या मौसम पूर्वानुमान। AI एजेंट संदर्भ में, टूल को एजेंट द्वारा **मॉडल-उत्पन्न फ़ंक्शन कॉल** के जवाब में कार्यान्वित करने के लिए डिज़ाइन किया जाता है।

## किन उपयोग मामलों में इसे लागू किया जा सकता है?

AI एजेंट जटिल कार्यों को पूरा करने, जानकारी पुनःप्राप्त करने या निर्णय लेने के लिए टूल का उपयोग कर सकते हैं। टूल उपयोग डिज़ाइन पैटर्न अक्सर ऐसे परिदृश्यों में इस्तेमाल होता है जहां बाहरी सिस्टम जैसे डेटाबेस, वेब सेवाएं या कोड इंटरप्रेटर के साथ गतिशील बातचीत आवश्यक होती है। यह कई उपयोग मामलों के लिए उपयोगी है, जिनमें शामिल हैं:

- **गतिशील सूचना पुनःप्राप्ति:** एजेंट बाहरी API या डेटाबेस से नवीनतम डेटा प्राप्त कर सकते हैं (जैसे, डेटा विश्लेषण के लिए SQLite डेटाबेस से क्वेरी करना, स्टॉक कीमतें या मौसम जानकारी प्राप्त करना)।
- **कोड निष्पादन और व्याख्या:** एजेंट गणितीय समस्याओं को हल करने, रिपोर्ट उत्पन्न करने, या सिमुलेशन करने के लिए कोड या स्क्रिप्ट चला सकते हैं।
- **वर्कफ़्लो स्वचालन:** टास्क शेड्यूलर, ईमेल सेवाओं, या डेटा पाइपलाइनों जैसे टूल्स का एकीकरण करके पुनरावृत्त या बहु-चरणीय वर्कफ़्लो का स्वचालन।
- **ग्राहक समर्थन:** एजेंट CRM सिस्टम, टिकटिंग प्लेटफॉर्म या ज्ञान आधार के साथ इंटरैक्ट करके उपयोगकर्ता प्रश्नों का समाधान कर सकते हैं।
- **सामग्री निर्माण और संपादन:** एजेंट व्याकरण जांच, पाठ सारांश, या सामग्री सुरक्षा मूल्यांकन जैसे टूल्स का उपयोग करके सामग्री निर्माण कार्यों में सहायता कर सकते हैं।

## टूल उपयोग डिज़ाइन पैटर्न को लागू करने के लिए किन तत्वों/निर्माण खंडों की आवश्यकता होती है?

ये निर्माण खंड AI एजेंट को व्यापक कार्य करने की अनुमति देते हैं। आइए टूल उपयोग डिज़ाइन पैटर्न लागू करने के लिए आवश्यक महत्वपूर्ण तत्वों को देखें:

- **फ़ंक्शन/टूल स्कीमाएँ**: उपलब्ध टूल की विस्तृत परिभाषाएँ, जिनमें फ़ंक्शन का नाम, उद्देश्य, आवश्यक पैरामीटर और अपेक्षित आउटपुट शामिल हैं। ये स्कीमाएँ LLM को यह समझने में सक्षम बनाती हैं कि कौन से टूल उपलब्ध हैं और वैध अनुरोध कैसे बनाएँ।

- **फ़ंक्शन निष्पादन लॉजिक**: उपयोगकर्ता की मंशा और वार्तालाप संदर्भ के आधार पर टूल को कब और कैसे कॉल किया जाए, इसे नियंत्रित करता है। इसमें योजनाकार मॉड्यूल, रूटिंग तंत्र, या ऐसा शर्तीय प्रवाह शामिल हो सकता है जो टूल उपयोग को गतिशील रूप से निर्धारित करता है।

- **संदेश हैंडलिंग सिस्टम**: घटक जो उपयोगकर्ता इनपुट, LLM प्रतिक्रिया, टूल कॉल और टूल आउटपुट के बीच संवाद प्रवाह को प्रबंधित करते हैं।

- **टूल एकीकरण फ्रेमवर्क**: वह अवसंरचना जो एजेंट को विभिन्न टूल से जोड़ती है, चाहे वे सरल फ़ंक्शन हों या जटिल बाहरी सेवाएं।

- **त्रुटि हैंडलिंग और सत्यापन**: टूल निष्पादन में विफलताओं को संभालने, पैरामीटरों को सत्यापित करने, और अप्रत्याशित प्रतिक्रियाओं का प्रबंधन करने के लिए तंत्र।

- **स्थिति प्रबंधन**: बातचीत के संदर्भ, पिछले टूल इंटरैक्शन, और स्थायी डेटा को ट्रैक करता है ताकि बहु-चरण इंटरैक्शन के दौरान सुसंगति बनी रहे।

अब, आइए फ़ंक्शन/टूल कॉलिंग को अधिक विस्तार से देखें।
 
### फ़ंक्शन/टूल कॉलिंग

फ़ंक्शन कॉलिंग वह मुख्य तरीका है जिससे हम बड़े भाषा मॉडल (LLMs) को टूल के साथ इंटरैक्ट करने सक्षम करते हैं। आप अक्सर 'फ़ंक्शन' और 'टूल' को पर्यायवाची के रूप में सुनेंगे क्योंकि 'फ़ंक्शन' (पुन: प्रयोज्य कोड के ब्लॉक) वे 'टूल' हैं जिनका एजेंट उपयोग करते हैं कार्य करने के लिए। किसी फ़ंक्शन का कोड कॉल करने के लिए, LLM को उपयोगकर्ता की रिक्वेस्ट को फ़ंक्शन के विवरण से मिलाना होगा। इसके लिए सभी उपलब्ध फ़ंक्शनों के विवरण वाले एक स्कीमा को LLM को भेजा जाता है। LLM फिर कार्य के लिए सबसे उपयुक्त फ़ंक्शन चुनता है और उसका नाम एवं तर्क लौटाता है। चुने गए फ़ंक्शन को कॉल किया जाता है, इसका जवाब वापस LLM को भेजा जाता है, जो इसका उपयोग उपयोगकर्ता की रिक्वेस्ट का उत्तर देने हेतु करता है।

डेवलपर्स के लिए एजेंट के लिए फ़ंक्शन कॉलिंग लागू करने के लिए, आपको चाहिए होगी:

1. एक LLM मॉडल जो फ़ंक्शन कॉलिंग का समर्थन करता हो
2. फ़ंक्शन विवरणों वाली स्कीमा
3. प्रत्येक वर्णित फ़ंक्शन का कोड

उदाहरण के लिए किसी शहर का वर्तमान समय प्राप्त करने के उदाहरण का उपयोग करते हैं:

1. **ऐसा LLM प्रारंभ करें जो फ़ंक्शन कॉलिंग का समर्थन करता हो:**

    सभी मॉडल फ़ंक्शन कॉलिंग का समर्थन नहीं करते, इसलिए यह सुनिश्चित करना आवश्यक है कि आप जिस LLM का उपयोग कर रहे हैं वह ऐसा करता है। <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> फ़ंक्शन कॉलिंग का समर्थन करता है। हम OpenAI क्लाइंट को Azure OpenAI **Responses API** के खिलाफ प्रारंभ करके शुरू कर सकते हैं (स्थिर `/openai/v1/` एंडपॉइंट — किसी `api_version` की आवश्यकता नहीं)।

    ```python
    # Azure OpenAI (Responses API, v1 endpoint) के लिए OpenAI क्लाइंट प्रारंभ करें
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **फ़ंक्शन स्कीमा बनाएँ**:

    अगला कदम एक JSON स्कीमा परिभाषित करना है जिसमें फ़ंक्शन का नाम, फ़ंक्शन क्या करता है इसका विवरण, और फ़ंक्शन पैरामीटर के नाम और विवरण शामिल हों। 
    फिर हम इस स्कीमा को पहले बनाए गए क्लाइंट को उपयोगकर्ता की रिक्वेस्ट के साथ पास करेंगे, जिसमें सान फ्रांसिस्को का समय खोजने के लिए है। ध्यान देने योग्य बात यह है कि परिणाम स्वरूप एक **टूल कॉल** लौटाया जाता है, प्रश्न का अंतिम उत्तर नहीं। जैसा कि पहले बताया गया है, LLM कार्य के लिए चुने गए फ़ंक्शन का नाम और उसे दिए जाने वाले तर्क लौटाता है।

    ```python
    # मॉडल के पढ़ने के लिए फ़ंक्शन विवरण (Responses API फ्लैट टूल प्रारूप)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # प्रारंभिक उपयोगकर्ता संदेश
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # पहली API कॉल: मॉडल से फ़ंक्शन का उपयोग करने के लिए कहें
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API टूल कॉल को function_call आइटम के रूप में response.output में लौटाता है।
    # इन्हें वार्तालाप में जोड़ें ताकि मॉडल के पास अगले चरण पर पूर्ण संदर्भ हो।
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **कार्यान्वयन कोड:**

    अब जब LLM ने निर्धारित कर लिया है कि कौन सा फ़ंक्शन चलाना है, तो उस कार्य को पूरा करने वाला कोड लागू और निष्पादित किया जाना चाहिए। 
    हम पायथन में वर्तमान समय प्राप्त करने का कोड लिख सकते हैं। हमें response_message से नाम और तर्क निकालने का कोड भी लिखना होगा ताकि अंतिम परिणाम प्राप्त हो सके।

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # फ़ंक्शन कॉल को संभालें
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # टूल परिणाम को function_call_output आइटम के रूप में लौटाएं
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # दूसरा API कॉल: मॉडल से अंतिम प्रतिक्रिया प्राप्त करें
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

फ़ंक्शन कॉलिंग अधिकांश, यदि सभी नहीं, एजेंट टूल उपयोग डिज़ाइन का मूल है, हालांकि इसे शुरू से लागू करना कभी-कभी चुनौतीपूर्ण हो सकता है।
जैसा कि हमने [Lesson 2](../../../02-explore-agentic-frameworks) में सीखा कि एजेंटिक फ्रेमवर्क हमें टूल उपयोग लागू करने के लिए पहले से निर्मित निर्माण खंड प्रदान करते हैं।
 
## एजेंटिक फ्रेमवर्क के साथ टूल उपयोग उदाहरण

यहाँ कुछ उदाहरण दिए गए हैं कि कैसे आप विभिन्न एजेंटिक फ्रेमवर्क का उपयोग करके टूल उपयोग डिज़ाइन पैटर्न लागू कर सकते हैं:

### Microsoft एजेंट फ्रेमवर्क

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft एजेंट फ्रेमवर्क</a> एआई एजेंट बनाने के लिए एक ओपन सोर्स AI फ्रेमवर्क है। यह फ़ंक्शन कॉलिंग की प्रक्रिया को सरल बनाता है, आपको टूल को Python फ़ंक्शन के रूप में `@tool` डेकोरेटर का उपयोग करके परिभाषित करने की अनुमति देता है। फ़्रेमवर्क मॉडल और आपके कोड के बीच संवाद को हैंडल करता है। यह File Search और Code Interpreter जैसे पूर्व-निर्मित टूल्स तक पहुँच भी प्रदान करता है जिन्हें `FoundryChatClient` के माध्यम से उपयोग किया जा सकता है।

निम्न आरेख Microsoft एजेंट फ्रेमवर्क के साथ फ़ंक्शन कॉलिंग की प्रक्रिया को दर्शाता है:

![function calling](../../../translated_images/hi/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft एजेंट फ्रेमवर्क में, टूल्स को डेकोरेटेड फ़ंक्शन के रूप में परिभाषित किया जाता है। हम पिछले उदाहरण में देखे गए `get_current_time` फ़ंक्शन को `@tool` डेकोरेटर का उपयोग करके टूल में परिवर्तित कर सकते हैं। फ्रेमवर्क स्वचालित रूप से फ़ंक्शन और उसके पैरामीटरों को सीरियलाइज़ करेगा, LLM को भेजने के लिए स्कीमा तैयार करेगा।

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# क्लाइंट बनाएं
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# एक एजेंट बनाएं और टूल के साथ चलाएं
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry एजेंट सेवा

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry एजेंट सेवा</a> एक नया एजेंटिक फ्रेमवर्क है जो डेवलपर्स को उच्च गुणवत्ता, विस्तार योग्य AI एजेंटों को सुरक्षित रूप से बनाने, तैनात करने और स्केल करने में सक्षम बनाता है बिना नीचे की कम्प्यूटिंग और स्टोरेज संसाधनों का प्रबंधन किए। यह विशेष रूप से एंटरप्राइज अनुप्रयोगों के लिए उपयुक्त है क्योंकि यह एक पूर्ण रूप से प्रबंधित सेवा है जो एंटरप्राइज ग्रेड सुरक्षा प्रदान करती है।

LLM API के सीधे उपयोग की तुलना में Microsoft Foundry एजेंट सेवा कुछ फायदे प्रदान करती है, जिनमें शामिल हैं:

- स्वचालित टूल कॉलिंग – टूल कॉल पार्स करने, टूल को invoke करने, और प्रतिक्रिया हैंडल करने की आवश्यकता नहीं; यह सब अब सर्वर-साइड पर हो जाता है
- सुरक्षित रूप से प्रबंधित डेटा – अपनी बातचीत की स्थिति प्रबंधित करने के बजाय, आप आवश्यकता की सभी जानकारी को स्टोर करने के लिए थ्रेड्स पर भरोसा कर सकते हैं
- तैयार-टूल – ऐसे टूल जो आपकी डेटा स्रोतों के साथ इंटरैक्ट करने के लिए उपयोग किए जा सकते हैं, जैसे Bing, Azure AI Search, और Azure Functions।

Microsoft Foundry एजेंट सेवा में उपलब्ध टूल्स को दो श्रेणियों में विभाजित किया जा सकता है:

1. ज्ञान टूल्स:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing Search के साथ आधार प्रदान करना</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">फ़ाइल खोज</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. क्रिया टूल्स:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">फ़ंक्शन कॉलिंग</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">कोड इंटरप्रेटर</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI परिभाषित टूल्स</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

एजेंट सेवा हमें इन टूल्स को एक `toolset` के रूप में एक साथ उपयोग करने की अनुमति देता है। यह `threads` का भी उपयोग करता है जो किसी विशेष बातचीत के संदेशों के इतिहास को ट्रैक करते हैं।

कल्पना करें कि आप Contoso नाम की कंपनी में एक बिक्री एजेंट हैं। आप एक संवादात्मक एजेंट विकसित करना चाहते हैं जो आपकी बिक्री डेटा के बारे में सवालों के जवाब दे सके।

निम्न चित्र दिखाता है कि आप अपनी बिक्री डेटा का विश्लेषण करने के लिए Microsoft Foundry एजेंट सेवा का कैसे उपयोग कर सकते हैं:

![Agentic Service In Action](../../../translated_images/hi/agent-service-in-action.34fb465c9a84659e.webp)

सेवा के साथ इन टूल्स में से किसी का उपयोग करने के लिए हम एक क्लाइंट बना सकते हैं और एक टूल या टूलसेट परिभाषित कर सकते हैं। व्यावहारिक रूप से इसे लागू करने के लिए हम निम्न Python कोड का उपयोग कर सकते हैं। LLM टूलसेट को देख सकेगा और उपयोगकर्ता की रिक्वेस्ट के अनुसार उपयोगकर्ता निर्मित फ़ंक्शन `fetch_sales_data_using_sqlite_query` या पूर्व-निर्मित कोड इंटरप्रेटर में से किसी का उपयोग करने का निर्णय लेगा।

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query फंक्शन जो fetch_sales_data_functions.py फाइल में पाया जा सकता है।
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# टूलसेट प्रारंभ करें
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query फ़ंक्शन के साथ फंक्शन कॉलिंग एजेंट को प्रारंभ करें और इसे टूलसेट में जोड़ें
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# कोड इंटरप्रेटर टूल को प्रारंभ करें और इसे टूलसेट में जोड़ें।
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## भरोसेमंद AI एजेंट बनाने के लिए टूल उपयोग डिज़ाइन पैटर्न के उपयोग के विशेष विचार क्या हैं?

एलएलएम द्वारा गतिशील रूप से जनरेट किए गए SQL के साथ सामान्य चिंता सुरक्षा है, विशेष रूप से SQL इंजेक्शन या दुर्भावनापूर्ण क्रियाओं का जोखिम, जैसे डेटाबेस ड्रॉप करना या छेड़छाड़ करना। जबकि ये चिंताएँ वैध हैं, इन्हें सही ढंग से डेटाबेस एक्सेस अनुमतियों को कॉन्फ़िगर करके प्रभावी ढंग से कम किया जा सकता है। अधिकांश डेटाबेस के लिए इसका अर्थ है डेटाबेस को केवल-रीड पर सेट करना। PostgreSQL या Azure SQL जैसी डेटाबेस सेवाओं के लिए, ऐप को केवल-रीड (SELECT) भूमिका सौंपनी चाहिए।

सुरक्षित वातावरण में ऐप चलाने से सुरक्षा और बढ़ती है। एंटरप्राइज परिदृश्यों में, डेटा आमतौर पर संचालन प्रणालियों से निकाल कर एक केवल-रीड डेटाबेस या डेटा वेयरहाउस में उपयोगकर्ता-मित्र स्कीमा के साथ रूपांतरित किया जाता है। यह दृष्टिकोण डेटा को सुरक्षित, प्रदर्शन और पहुँच के लिए अनुकूलित करता है, और ऐप को सीमित केवल-रीड पहुँच देता है।

## नमूना कोड

- पायथन: [एजेंट फ्रेमवर्क](./code_samples/04-python-agent-framework.ipynb)
- .NET: [एजेंट फ्रेमवर्क](./code_samples/04-dotnet-agent-framework.md)

## टूल उपयोग डिज़ाइन पैटर्न के बारे में और प्रश्न हैं?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) में शामिल हों अन्य शिक्षार्थियों से मिलने, ऑफिस ऑवर में भाग लेने और अपने AI एजेंट प्रश्नों के उत्तर प्राप्त करने के लिए।

## अतिरिक्त संसाधन

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI एजेंट सेवा कार्यशाला</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer मल्टी-एजेंट कार्यशाला</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft एजेंट फ्रेमवर्क अवलोकन</a>


## इस एजेंट का स्मोक-टेस्ट करना (वैकल्पिक)

[Lesson 16](../16-deploying-scalable-agents/README.md) में एजेंट्स को तैनात करना सीखने के बाद, आप इस पाठ के `TravelToolAgent` (क्या यह अभी भी अपने टूल्स को कॉल करता है और उत्तर देता है?) को [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) के साथ स्मोक-टेस्ट कर सकते हैं। इसे चलाने के बारे में जानने के लिए [`tests/README.md`](../tests/README.md) देखें।

## पिछला पाठ

[एजेंटिक डिज़ाइन पैटर्न को समझना](../03-agentic-design-patterns/README.md)

## अगला पाठ

[एजेंटिक RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->