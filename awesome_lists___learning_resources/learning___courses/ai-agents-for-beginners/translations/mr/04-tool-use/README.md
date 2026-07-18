[![चांगल्या AI एजंट कसे डिझाइन कराल](../../../translated_images/mr/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(या धड्याचा व्हिडिओ पाहण्यासाठी वरच्या चित्रावर क्लिक करा)_

# टूल वापर डिजाइन पॅटर्न

टूल्स मनोरंजक आहेत कारण त्यातून AI एजंटना अधिक विस्तृत क्षमता मिळतात. एजंटकडे जेव्हा मर्यादित कृतींचा संच असतो, त्याऐवजी टूल जोडल्याने एजंट आता विविध प्रकारच्या क्रिया करू शकतो. या प्रकरणात, आपण टूल वापर डिजाइन पॅटर्न पाहणार आहोत, ज्यामध्ये AI एजंट त्यांच्या उद्दिष्टांसाठी विशिष्ट टूल्स कसे वापरू शकतात हे सांगितले आहे.

## परिचय

या धड्यात, आम्ही खालील प्रश्नांची उत्तरे शोधणार आहोत:

- टूल वापर डिजाइन पॅटर्न म्हणजे काय?
- कोणत्या उपयोगांसाठी ते लागू होऊ शकते?
- डिजाइन पॅटर्न अंमलात आणण्यासाठी कोणकोणते घटक/बिल्डिंग ब्लॉक्स आवश्यक आहेत?
- विश्वसनीय AI एजंट तयार करण्यासाठी टूल वापर डिजाइन पॅटर्न वापरताना कोणत्या विशेष विचारांची गरज आहे?

## शिकण्याचे उद्दिष्ट

हा धडा पूर्ण केल्यानंतर, तुम्ही खालील क्षमता प्राप्त कराल:

- टूल वापर डिजाइन पॅटर्न आणि त्याचा उद्देश परिभाषित करा.
- ज्या उपयोगांमध्ये टूल वापर डिजाइन पॅटर्न लागू होतो ते ओळखा.
- डिजाइन पॅटर्न अंमलात आणण्यासाठी आवश्यक मुख्य घटक समजून घ्या.
- या डिजाइन पॅटर्नचा वापर करून AI एजंट्समध्ये विश्वासार्हता सुनिश्चित करण्यासाठी आवश्यक विचार लक्षात घ्या.

## टूल वापर डिजाइन पॅटर्न म्हणजे काय?

**टूल वापर дизайн पॅटर्न** LLMs ना विशिष्ट उद्दिष्टे साध्य करण्यासाठी बाह्य टूल्सशी संवाद साधण्याची क्षमता देण्यावर लक्ष केंद्रित करतो. टूल म्हणजे कोड असतो जो एजंटकडून क्रिया करण्यासाठी चालवला जातो. टूल एक सोपा फंक्शन असू शकतो जसे कॅल्क्युलेटर, किंवा तृतीय-पक्ष सेवेशी API कॉल जसे स्टॉक किंमत तपासणे किंवा हवामानाचा अंदाज. AI एजंटच्या संदर्भात, टूल्स या एजंटद्वारे **मॉडेल-जनरेटेड फंक्शन कॉल्स** मध्ये प्रतिसाद म्हणून चालवले जातात.

## कोणत्या उपयोगांमध्ये ते लागू होऊ शकते?

AI एजंट्स टूल्सचा वापर करून जटिल कार्ये पूर्ण करू शकतात, माहिती प्राप्त करू शकतात, किंवा निर्णय घेऊ शकतात. टूल वापर डिजाइन पॅटर्न सामान्यतः अशा परिस्थितीत वापरला जातो जिथे बाह्य प्रणालींसह गतिशील संवाद आवश्यक असतो, जसे डेटाबेस, वेब सेवा, किंवा कोड व्याख्याते. ही क्षमता अनेक उपयोगांसाठी उपयुक्त आहे, जसे:

- **गतिशील माहिती प्राप्ती:** एजंट्स बाह्य API किंवा डेटाबेसकडून अद्ययावत डेटा प्राप्त करू शकतात (उदा., डेटाबेसमध्ये क्वेरी करणे, स्टॉक किमती किंवा हवामान माहिती प्राप्त करणे).
- **कोड अंमलबजावणी आणि व्याख्या:** एजंट्स गणिती समस्या सोडवण्यासाठी, अहवाल तयार करण्यासाठी, किंवा अनुकरण करण्यासाठी कोड किंवा स्क्रिप्ट्स चालवू शकतात.
- **कार्यप्रवाह स्वयंचलन:** टास्क शेड्युलर्स, ईमेल सेवा किंवा डेटा पाईपलाइनसारख्या टूल्स एकत्र करून पुनरावृत्तीच्या किंवा बहुउपायांच्या कार्यप्रवाहांचे स्वयंचलन.
- **ग्राहक समर्थन:** एजंट्स CRM सिस्टीम्स, तिकीटिंग प्लॅटफॉर्म्स, किंवा ज्ञान आधारांशी संवाद साधून वापरकर्त्यांच्या प्रश्नांची उत्तरे देऊ शकतात.
- **सामग्री निर्मिती आणि संपादन:** एजंट्स व्याकरण चेकर्स, मजकूर सारांश करणारे, किंवा सामग्री सुरक्षिततेचे मुल्यांकन करणारे टूल्स वापरून सामग्री निर्मितीत मदत करू शकतात.

## टूल वापर डिजाइन पॅटर्न अंमलबजावणी करण्यासाठी आवश्यक घटक/बिल्डिंग ब्लॉक्स कोणते आहेत?

हे बिल्डिंग ब्लॉक्स AI एजंटला विस्तृत कार्ये करण्यास सक्षम करतात. टूल वापर डिजाइन पॅटर्न अंमलात आणण्यासाठी आवश्यक मुख्य घटक पाहूया:

- **फंक्शन/टूल स्कीमा:** उपलब्ध टूल्सचे तपशीलवार परिभाषा, ज्यामध्ये फंक्शनचे नाव, उद्देश, आवश्यक पॅरामीटर्स, आणि अपेक्षित आउटपुट्स यांचा समावेश असतो. हे स्कीमा LLM ला समजण्यास आणि वैध विनंत्या तयार करण्यास मदत करतात.

- **फंक्शन अंमलबजावणी लॉजिक:** वापरकर्त्याच्या इराद्यांवर आणि संभाषणाच्या संदर्भावर आधारित टूल कधी व कसे उपयोगी करायचे ते ठरवते. यात नियोजन करणारे मॉड्यूल्स, राउटिंग मेकॅनिझम्स, किंवा शर्तीआधारित प्रवाह असू शकतात जे टूल वापर गतिशीलपणे ठरवतात.

- **संदेश हाताळणी प्रणाली:** वापरकर्त्याच्या इनपुट्स, LLM प्रतिसाद, टूल कॉल्स, आणि टूल आउटपुट यांच्यात संभाषणाचा प्रवाह व्यवस्थापित करणारे घटक.

- **टूल इंटीग्रेशन फ्रेमवर्क:** एजंट आणि विविध टूल्सला जोडणारे इन्फ्रास्ट्रक्चर, मग ती साधी फंक्शन्स असोत किंवा क्लिष्ट बाह्य सेवा.

- **चुका हाताळणी आणि वैधता तपासणी:** टूल अंमलबजावणीतील अयशस्वीपणा, पॅरामीटर्सचे सत्यापन, आणि अनपेक्षित प्रतिसाद व्यवस्थापित करण्यासाठी यंत्रणा.

- **स्थिती व्यवस्थापन:** संभाषणाचा संदर्भ, पूर्वीचे टूल संवाद, आणि सातत्य राखण्यासाठी कायमस्वरूपी डेटा ट्रॅक करणे.

पुढे, फंक्शन/टूल कॉलिंग अधिक तपशीलात पाहूया.
 
### फंक्शन/टूल कॉलिंग

फंक्शन कॉलिंग ही मुख्य पद्धत आहे ज्याने आम्ही मोठ्या भाषा मॉडेल्स (LLMs) ना टूल्सशी संवाद साधण्यास सक्षम करतो. तुम्ही “फंक्शन” आणि “टूल” या संज्ञा एकत्रितपणे वापरल्या पाहाल कारण “फंक्शन्स” (पुनर्वापरयोग्य कोड ब्लॉक्स) हेच एजंट्स जे कार्य पार पाडण्यासाठी वापरतात अशा “टूल्स” आहेत. एखाद्या फंक्शनचा कोड कॉल करण्यासाठी, LLM ला वापरकर्त्याच्या विनंतीचे फंक्शनच्या वर्णनाशी तुलना करावी लागते. यासाठी, उपलब्ध सर्व फंक्शन्सच्या वर्णनांसह एक स्कीमा LLM ला पाठवला जातो. नंतर LLM कामासाठी सर्वात योग्य फंक्शन निवडतो व त्याचे नाव आणि आर्ग्युमेंट्स परत पाठवतो. निवडलेले फंक्शन चालवले जाते, त्याचा प्रतिसाद LLM ला परत दिला जातो, जो वापरकर्त्याच्या विनंतीला उत्तर देण्यासाठी तो माहिती वापरतो.

डेवलपर्सना एजंटसाठी फंक्शन कॉलिंग अंमलात आणण्यासाठी खालील गोष्टी लागतील:

1. फंक्शन कॉलिंग सपोर्ट करणारे LLM मॉडेल
2. फंक्शन वर्णनांचा स्कीमा
3. प्रत्येक फंक्शनसाठी कोड

शहरात वर्तमान वेळ मिळवण्याचा उदाहरण वापरूया:

1. **फंक्शन कॉलिंग समर्थित LLM आरंभ करा:**

    सर्व मॉडेल्स फंक्शन कॉलिंगला सपोर्ट करत नाहीत, त्यामुळे तुम्ही वापरत असलेल्या LLM कडे ते असल्याची खात्री करा. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> फंक्शन कॉलिंगला सपोर्ट करतो. आम्ही OpenAI क्लायंट Azure OpenAI **Responses API** विरुद्ध (स्थिर `/openai/v1/` एंडपॉइंट — `api_version` आवश्यक नाही) सुरू करू शकतो.

    ```python
    # Azure OpenAI (Responses API, v1 endpoint) साठी OpenAI क्लायंट सुरू करा
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **फंक्शन स्कीमा तयार करा**:

    नंतर आपण JSON स्कीमा परिभाषित करू जे फंक्शनचे नाव, त्याचा काय करतो याचा वर्णन, आणि फंक्शनच्या पॅरामीटर्सची नावे आणि वर्णने समाविष्ट करते.
    नंतर हे स्कीमा आणि वापरकर्त्याची विनंती (सॅन फ्रान्सिस्कोमधील वेळ शोधणे) क्लायंटकडे पाठवतो. महत्त्वाचे म्हणजे **टूल कॉल** परत येतो, **शेवटचा उत्तर नाही**. वर सांगितल्याप्रमाणे, LLM कामासाठी निवडलेले फंक्शनचे नाव आणि त्याला दिले जाणारे आर्ग्युमेंट्स परत करतो.

    ```python
    # मॉडेल वाचनासाठी फंक्शनचे वर्णन (रेस्पॉन्सेस API फ्लॅट टूल स्वरूप)
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
  
    # प्रारंभिक वापरकर्ता संदेश
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # पहिले API कॉल: मॉडेलला फंक्शन वापरण्यास सांगा
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API प्रत्युत्तर.output मध्ये function_call आयटम म्हणून टूल कॉल परत करते.
    # त्यांना संभाषणात जोडा जेणेकरून मॉडेलला पुढील टप्प्यावर पूर्ण संदर्भ मिळेल.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **कार्य पार पडण्यासाठी आवश्यक फंक्शन कोड:**

    LLM ने निवडलेले फंक्शन चालवण्याचा कोड तयार करणे व अंमलात आणणे आवश्यक आहे.
    आम्ही Python मध्ये वर्तमान वेळ मिळवण्यासाठी कोड तयार करू. तसेच अंतिम निकालासाठी response_message मधून नाव आणि आर्ग्युमेंट्स काढण्याचा कोड लिहावा लागेल.

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
    # फंक्शन कॉल्स हाताळा
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # टूलचा निकाल function_call_output आयटम म्हणून परत करा
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # दुसरा API कॉल: मॉडेलकडून अंतिम प्रतिसाद मिळवा
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

फंक्शन कॉलिंग हे बहुसंख्य, जर नाही तर सर्व एजंट टूल वापर डिजाइनचा मुख्य भाग आहे, पण ते सुरुवातीपासून अंमलात आणणे कधी कधी आव्हानात्मक असू शकते.
जसे आपण [Lesson 2](../../../02-explore-agentic-frameworks) मध्ये शिकलो, एजंटिक्स फ्रेमवर्क आम्हाला पूर्व-निर्मित बिल्डिंग ब्लॉक्स देतात ज्यामुळे टूल वापर सहज होतो.
 
## एजंटिक्स फ्रेमवर्कसह टूल वापर उदाहरणे

वेगवेगळ्या एजंटिक्स फ्रेमवर्कचा वापर करून टूल वापर डिजाइन पॅटर्न कसा अंमलात आणता येईल, याची काही उदाहरणे खाली दिली आहेत:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> हे AI एजंट तयार करण्यासाठी एक ओपन-सोर्स AI फ्रेमवर्क आहे. हे फंक्शन कॉलिंग वापरणी सोपी करते, कारण तुम्ही `@tool` डेकॉरेटरसह Python फंक्शन्सना टूल म्हणून परिभाषित करू शकता. फ्रेमवर्क मॉडेल आणि तुमच्या कोडमधील पुलटूर संवाद हाताळतो. हा `FoundryChatClient` द्वारे पूर्वनिर्मित टूल्स जसे की फाइल सर्च व कोड इंटरप्रेटर वापरण्याचा प्रवेश देखील देतो.

खालील आकृती Microsoft Agent Framework मध्ये फंक्शन कॉलिंगची प्रक्रिया दर्शवते:

![function calling](../../../translated_images/mr/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Framework मध्ये टूल्स डेकॉरेट केलेल्या फंक्शन्स म्हणून परिभाषित केल्या जातात. आपण आधी पाहिलेले `get_current_time` फंक्शन `@tool` डेकॉरेटर वापरून टूल मध्ये रूपांतरित करू शकतो. फ्रेमवर्क आपोआप फंक्शन आणि त्याचे पॅरामीटर्स सिरीअलाइज करून LLM कडे पाठवण्यासाठी स्कीमा तयार करते.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# क्लायंट तयार करा
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# एक एजंट तयार करा आणि टूलसह चालवा
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> ही एक नवीन एजंटिक्स फ्रेमवर्क आहे जी डेव्हलपर्सना सुरक्षितपणे उच्च-गुणवत्तेचे, कमी देखभाल असलेले आणि विस्तारक्षम AI एजंट तयार, तैनात आणि स्केल करण्यास सक्षमता देते. ही सेवा विशेषतः एंटरप्राइझ अनुप्रयोगांसाठी सुरक्षिततेसह एक संपूर्ण व्यवस्थापित सेवा आहे.

LLM API सोबत थेट विकसित करण्याच्या तुलनेत Microsoft Foundry Agent Service काही फायदे देते, ज्यामध्ये आहेत:

- स्वयंचलित टूल कॉलिंग – टूल कॉल पार्स करण्याची गरज नाही, टूल चालवणे आणि प्रतिसाद हाताळणे; हे सर्व आता सर्व्हर बाजूने होते
- सुरक्षित डेटा व्यवस्थापन – स्वतःच्या संभाषण स्थितीचे व्यवस्थापन करण्याऐवजी, तुम्ही तारांवर विश्वास ठेवू शकता जे आवश्यक माहिती साठवतात
- बॉक्समधून बाहेर येणारे टूल्स – जसे की Bing, Azure AI Search, आणि Azure Functions यांसह तुमच्या डेटा स्रोतांशी संवाद साधण्यासाठी टूल्स

Microsoft Foundry Agent Service मधील टूल्स दोन श्रेणींमध्ये विभागले जाऊ शकतात:

1. ज्ञान टूल्स:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing Search सह Grounding</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">फाइल शोध</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. क्रिया टूल्स:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">फंक्शन कॉलिंग</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">कोड इंटरप्रेटर</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI_DEFINED टूल्स</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

एजंट सर्व्हिस आम्हाला या टूल्सना `toolset` म्हणून एकत्र वापरण्याची परवानगी देते. तसेच `threads` चा वापर करते जे विशिष्ट संभाषणातील संदेशांचा इतिहास ठेवतात.

समजा तुम्ही Contoso नावाच्या कंपनीत विक्री एजंट आहात. तुम्हाला असा संभाषणात्मक एजंट तयार करायचा आहे जो तुमच्या विक्री डेटाबद्दल प्रश्नांची उत्तरे देऊ शकेल.

खालील प्रतिमा Microsoft Foundry Agent Service वापरून तुमच्या विक्री डेटाचे विश्लेषण कसे करता येईल हे दर्शवते:

![Agentic Service In Action](../../../translated_images/mr/agent-service-in-action.34fb465c9a84659e.webp)

या टूल्सपैकी कोणताही सेवा वापरण्यासाठी आपण क्लायंट तयार करू शकतो आणि टूल किंवा टूलसेट परिभाषित करू शकतो. प्रॅक्टिकल अंमलबजावणीसाठी खालील Python कोड वापरू शकतो. LLM टूलसेट पाहून वापरकर्त्याचा विनंतीनुसार वापरकर्त्याद्वारे तयार केलेल्या फंक्शन, `fetch_sales_data_using_sqlite_query`, किंवा पूर्वनिर्मित कोड इंटरप्रेटर वापरण्यास निर्णय घेईल.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query फंक्शन जे fetch_sales_data_functions.py फाइलमध्ये आढळू शकते.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# टूलसेट प्रारंभ करा
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query फंक्शनसह फंक्शन कॉलिंग एजंट प्रारंभ करा आणि ते टूलसेटमध्ये जोडा
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# कोड इंटरप्रिटर टूल प्रारंभ करा आणि ते टूलसेटमध्ये जोडा.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## विश्वसनीय AI एजंट तयार करताना टूल वापर डिजाइन पॅटर्न वापरल्यास कोणते विशेष विचार?

LLMs ने डायनॅमिकली तयार केलेल्या SQL विषयी सामान्य चिंता म्हणजे सुरक्षा, विशेषतः SQL इंजेक्शन किंवा दूषित क्रिया, जसे डेटाबेस ड्रॉप किंवा छेडछाड. या चिंतांवर उपाय म्हणून योग्य प्रकारे डेटाबेस प्रवेश परवानग्या सेट केल्यास प्रभावी संरक्षण होते. बहुतेक डेटाबेससाठी ते रीड-ओन्ली कॉन्फिगरेशनचा समावेश आहे. PostgreSQL किंवा Azure SQL सारख्या डेटाबेस सेवांसाठी, अॅपला रीड-ओन्ली (SELECT) भूमिका दिली पाहिजे.

अॅप सुरक्षित वातावरणात चालविणे संरक्षण अधिक वाढवते. एंटरप्राइझ परिस्थिति मध्ये डाटा सामान्यतः ऑपरेशनल सिस्टम्समधून काढून रीड-ओन्ली डेटाबेस किंवा डेटा वेअरहाऊस मध्ये रुपांतरित केला जातो ज्याचा स्कीमा वापरकर्ता अनुरूप असतो. या पद्धतीने डेटा सुरक्षित, कार्यक्षमता आणि प्रवेशक्षमतेसाठी ऑप्टिमाइझ्ड असतो आणि अॅपला मर्यादित रीड-ओन्ली प्रवेश असतो.

## नमुना कोड्स

- Python: [एजंट फ्रेमवर्क](./code_samples/04-python-agent-framework.ipynb)
- .NET: [एजंट फ्रेमवर्क](./code_samples/04-dotnet-agent-framework.md)

## टूल वापर डिजाइन पॅटर्नबद्दल अजून प्रश्न आहेत?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) मध्ये सामील व्हा, इतर शिकणाऱ्यांशी भेटा, ऑफिस तास भाग घ्या आणि तुमचे AI एजंट प्रश्न विचारून उत्तर मिळवा.

## अतिरिक्त संसाधने

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI एजंट सेवा कार्यशाळा</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso क्रिएटिव्ह राइटर मल्टी-एजंट कार्यशाळा</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft एजंट फ्रेमवर्क परिचय</a>


## या एजंटचे स्मोक-टेस्टिंग (पर्यायी)

आपण [Lesson 16](../16-deploying-scalable-agents/README.md) मध्ये एजंट्स कसे डिप्लॉय करायचे शिकल्यानंतर, आपण या धड्याच्या `TravelToolAgent` चे स्मोक-टेस्ट करू शकता (तो अजूनही त्याचे टूल्स कॉल करतो का आणि उत्तर देतो का?) [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) या फाईलसह. ते कसे चालवायचे ते पाहण्यासाठी [`tests/README.md`](../tests/README.md) पहा.

## मागील धडा

[Agentic Design Patterns समजून घेणे](../03-agentic-design-patterns/README.md)

## पुढील धडा

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->