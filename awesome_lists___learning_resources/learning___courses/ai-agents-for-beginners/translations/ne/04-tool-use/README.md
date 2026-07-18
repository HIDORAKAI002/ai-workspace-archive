[![राम्रो AI एजेन्टहरू कसरी डिजाइन गर्ने](../../../translated_images/ne/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(यस पाठको भिडियो हेर्न माथिको छविमा क्लिक गर्नुहोस्)_

# उपकरण प्रयोग डिजाइन ढाँचा

उपकरणहरू रोचक छन् किनभने तिनीहरूले AI एजेन्टहरूलाई फराकिलो क्षमता क्षेत्र दिन्छन्। एजेन्टसँग सीमित कार्यहरूको सेट हुनेको सट्टा, उपकरण थप्दा एजेन्टले विस्तृत कार्यहरू गर्न सक्दछ। यस अध्यायमा, हामी उपकरण प्रयोग डिजाइन ढाँचाको समीक्षा गर्नेछौं, जसले AI एजेन्टहरूले लक्ष प्राप्तिका लागि विशेष उपकरणहरू कसरी प्रयोग गर्न सक्छन् भनेर वर्णन गर्दछ।

## परिचय

यस पाठमा, हामी निम्न प्रश्नहरूको उत्तर खोज्दैछौं:

- उपकरण प्रयोग डिजाइन ढाँचा के हो?
- कुन प्रयोग केसहरूमा यो लागू गर्न सकिन्छ?
- डिजाइन ढाँचा लागू गर्न आवश्यक तत्व/निर्माण खण्डहरू के हुन्?
- भरोसायोग्य AI एजेन्टहरू निर्माण गर्न उपकरण प्रयोग डिजाइन ढाँचा प्रयोग गर्दा विशेष विचारहरू के हुन्?

## सिकाइ लक्ष्यहरू

यस पाठ पुरा गरेपछि, तपाईं सक्षम हुनुहुनेछ:

- उपकरण प्रयोग डिजाइन ढाँचाको परिभाषा र यसको उद्देश्य बताउन।
- उपकरण प्रयोग डिजाइन ढाँचा लागू गर्न सकिने प्रयोग केसहरू पहिचान गर्न।
- डिजाइन ढाँचा लागू गर्न आवश्यक मुख्य तत्वहरू बुझ्न।
- यस डिजाइन ढाँचा प्रयोग गरेर AI एजेन्टहरूको भरोसापूर्णताको लागि विचारहरू पहिचान गर्न।

## उपकरण प्रयोग डिजाइन ढाँचा के हो?

**उपकरण प्रयोग डिजाइन ढाँचा** ले LLMs लाई विशिष्ट लक्ष्यहरू प्राप्त गर्न बाह्य उपकरणहरूसँग अन्तरक्रिया गर्ने क्षमता दिनमा केन्द्रीत हुन्छ। उपकरणहरू एजेन्टले कार्य गर्नका लागि चलाउन सक्ने कोड हुन्। एक उपकरण सामान्य रूपमा गणक जस्तो सरल फङ्क्शन हुन सक्छ, वा स्टक मूल्य खोजी वा मौसम पूर्वानुमानजस्ता तेस्रो-पक्ष सेवामा API कल हुन सक्छ। AI एजेन्टको सन्दर्भमा, उपकरणहरू **मोडल-जनरेटेड फङ्क्शन कलहरू**को प्रतिक्रिया स्वरूप एजेन्टहरूले चलाउने गरी डिजाइन गरिन्छन्।

## कुन प्रयोग केसहरूमा यो लागू गर्न सकिन्छ?

AI एजेन्टहरूले जटिल कार्यहरू पूरा गर्न, जानकारी प्राप्त गर्न, वा निर्णय लिन उपकरणहरूको प्रयोग गर्न सक्छन्। उपकरण प्रयोग डिजाइन ढाँचा प्रायः ती परिदृश्यहरूमा प्रयोग गरिन्छ जहाँ बाह्य प्रणालीहरू जस्तै डेटाबेस, वेब सेवा, वा कोड इन्टरप्रेटरसँग गतिशील अन्तरक्रिया आवश्यक हुन्छ। यो क्षमता विभिन्न प्रयोग केसहरूमा उपयोगी हुन्छ, जस्तै:

- **गतिशील जानकारी प्राप्ति:** एजेन्टहरूले बाह्य API वा डेटाबेसहरूमा अपडेटेड डाटा सोध्न सक्छन् (जस्तै, डाटा विश्लेषणका लागि SQLite डेटाबेस सोध्ने, स्टक मूल्य वा मौसम जानकारी प्राप्त गर्ने)।
- **कोड सञ्चालन र व्याख्या:** एजेन्टहरूले गणितीय समस्याहरू समाधान गर्न, रिपोर्ट बनाउन, वा सिमुलेशन गर्न कोड वा स्क्रिप्टहरू चलाउन सक्छन्।
- **कार्यप्रवाह स्वचालन:** टास्क सिड्युलर, इमेल सेवा, वा डाटा पाईपलाइनजस्ता उपकरणहरू समायोजन गरेर पुनरावृत्त वा बहु-चरण कार्यप्रवाहहरू स्वचालित गर्नु।
- **ग्राहक समर्थन:** एजेन्टहरूले CRM प्रणालीहरू, टिकटिङ प्लेटफर्महरू वा ज्ञान आधारहरूसँग अन्तरक्रिया गरेर प्रयोगकर्ताका प्रश्नहरू समाधान गर्न सक्छन्।
- **सामग्री सिर्जना र सम्पादन:** एजेन्टहरूले व्याकरण जाँच्ने, पाठ सारांश गर्ने वा सामग्री सुरक्षाको मूल्याङ्कन गर्ने उपकरणहरू प्रयोग गरेर सामग्री सृजनामा सहयोग गर्न सक्छन्।

## उपकरण प्रयोग डिजाइन ढाँचा लागू गर्न आवश्यक तत्व/निर्माण खण्डहरू के-के हुन्?

यी निर्माण खण्डहरूले AI एजेन्टलाई विभिन्न कार्यहरू सम्पन्न गर्न सक्षम बनाउँछन्। उपकरण प्रयोग डिजाइन ढाँचालाई लागू गर्न आवश्यक मुख्य तत्वहरू हेरौं:

- **फङ्क्शन/उपकरण स्कीमाहरू:** उपलब्ध उपकरणहरूको विस्तृत परिभाषा, जसमा फङ्क्शन नाम, उद्देश्य, आवश्यक प्यारामिटरहरू, र अपेक्षित आउटपुटहरू समावेश हुन्छन्। यी स्कीमाले LLM लाई कुन उपकरणहरू उपलब्ध छन् र कसरी मान्य अनुरोधहरू निर्माण गर्ने बुझ्न सक्षम बनाउँछन्।

- **फङ्क्शन सञ्चालन तर्क:** प्रयोगकर्ताको इरादा र संवाद सन्दर्भका आधारमा उपकरणहरू कहिले र कसरी चलाइन्छ भनेर नियन्त्रण गर्दछ। यसमा योजनाकार मोड्युलहरू, राउटिङ यन्त्रहरू वा सर्तगत प्रवाहहरू समावेश हुन सक्छन् जसले उपकरण प्रयोगलाई गतिशील रूपमा निर्धारण गर्छ।

- **सन्देश व्यवस्थापन प्रणाली:** प्रयोगकर्ता इनपुट, LLM प्रतिक्रिया, उपकरण कलहरू, र उपकरण आउटपुटहरूको संवाद प्रवाह व्यवस्थापन गर्ने कम्पोनेन्टहरू।

- **उपकरण एकीकरण संरचना:** एजेन्टलाई विभिन्न उपकरणहरू जडान गर्ने पूर्वाधार, चाहे ती सरल फङ्क्शनहरू हुन् वा जटिल बाह्य सेवाहरू।

- **त्रुटि ह्यान्डलिङ र मान्यकरण:** उपकरण सञ्चालनमा असफलता, प्यारामिटरहरूको मान्यकरण, र अप्रत्याशित प्रतिक्रियाहरू व्यवस्थापन गर्ने संयन्त्रहरू।

- **राज्य व्यवस्थापन:** संवाद सन्दर्भ, अघिल्लो उपकरण अन्तरक्रिया, र दीगो डाटालाई ट्र्याक गरेर बहु-चरण अन्तरक्रियाहरूमा सुसंगतता सुनिश्चित गर्ने।

अब, फङ्क्शन/उपकरण कललाई थप विस्तारमा हेरौं।
 
### फङ्क्शन/उपकरण कल

फङ्क्शन कल ठूलो भाषा मोडेलहरू (LLMs) लाई उपकरणहरूसँग अन्तरक्रिया गर्न सक्षम पार्ने प्रमुख माध्यम हो। तपाईँले प्रायः 'फङ्क्शन' र 'उपकरण' लाई समान रूपमा प्रयोग गरिरहेको देख्नुहुनेछ किनकि 'फङ्क्शनहरू' (पुन: प्रयोग गर्न मिल्ने कोड ब्लकहरू) नै एजेन्टहरूले कार्यहरू गर्ने 'उपकरण' हुन्। फङ्क्शन चलाउनको लागि, LLM ले प्रयोगकर्ताको अनुरोधलाई फङ्क्शनको विवरणसँग तुलना गर्नुपर्छ। यसका लागि सबै उपलब्ध फङ्क्शनहरूको विवरण समावेश गरिएको स्कीमा LLM लाई पठाइन्छ। LLM ले त्यसपछि कार्यका लागि सबैभन्दा उपयुक्त फङ्क्शन चयन गर्छ र यसको नाम र आर्गुमेन्टहरू फर्काउँछ। चयन गरिएका फङ्क्शनलाई कार्यान्वयन गरिन्छ, यसको प्रतिक्रिया LLM लाई पठाइन्छ, जसले त्यो जानकारी प्रयोगकर्ताको अनुरोधको जवाफ दिन प्रयोग गर्छ।

एजेन्टहरूको लागि फङ्क्शन कल लागू गर्न, तपाईंलाई आवश्यक पर्छ:

1. फङ्क्शन कल समर्थन गर्ने LLM मोडेल
2. फङ्क्शन विवरण रहेको स्कीमा
3. प्रत्येक फङ्क्शनको कोड जुन वर्णित छ

शहरमा हालको समय प्राप्त गर्ने उदाहरणबाट व्याख्या गरौं:

1. **फङ्क्शन कल समर्थन गर्ने LLM सुरु गर्नुहोस्:**

    सबै मोडेलहरूले फङ्क्शन कल समर्थन गर्दैनन्, त्यसैले तपाईंले प्रयोग गर्ने LLM ले समर्थन गर्छ कि गर्दैन जाँच्न महत्त्वपूर्ण छ। <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> ले फङ्क्शन कल समर्थन गर्दछ। हामी Azure OpenAI **Responses API** (स्थिर `/openai/v1/` अन्त्यबिन्दु — `api_version` आवश्यक छैन) विरुद्ध OpenAI क्लाइन्ट सुरु गरेर सुरु गर्न सक्छौं।

    ```python
    # Azure OpenAI (Responses API, v1 endpoint) का लागि OpenAI क्लाइन्ट सुरु गर्नुहोस्
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **फङ्क्शन स्कीमा सिर्जना गर्नुहोस्**:

    त्यसपछि हामी JSON स्कीमा परिभाषित गर्नेछौं जसमा फङ्क्शन नाम, फङ्क्शनले के गर्छ भन्ने विवरण, र फङ्क्शन प्यारामिटरहरूको नाम र विवरण समावेश छ।
    हामी यो स्कीमा र प्रयोगकर्ताको अनुरोधलाई पहिले सिर्जना गरिएको क्लाइन्टमा पास गर्नेछौं, जसले सान फ्रान्सिस्कोमा समय पत्ता लगाउनेछ। ध्यान दिनु पर्ने कुरा भनेको कि यहाँ **उपकरण कल** फिर्ता हुन्छ, **अन्तिम उत्तर होइन**। जस्तै पहिले भनियो, LLM ले कार्यका लागि छनौट गरेको फङ्क्शनको नाम र आर्गुमेन्टहरू फर्काउँछ।

    ```python
    # मोडेलले पढ्नको लागि कार्य वर्णन (Responses API फ्ल्याट उपकरण ढाँचा)
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
  
    # प्रारम्भिक प्रयोगकर्ता सन्देश
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # पहिलो API कल: मोडेललाई फक्सन प्रयोग गर्न आग्रह गर्नुहोस्
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # प्रतिक्रिया API ले tool کالहरू function_call वस्तुहरूका रूपमा response.output मा फर्काउँछ।
    # तिनीहरूलाई संवादमा थप्नुहोस् ताकि मोडेलले अर्को पालोमा पूरा सन्दर्भ पाओस्।
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **कार्य पूरा गर्न आवश्यक फङ्क्शनको कोड:**

    LLM ले कुन फङ्क्शन चलाउनु पर्ने छ भन्ने छनौट गरेपछि, कार्य पूरा गर्ने कोड लागू गर्न र चलाउनुपर्छ।
    हामी पायथनमा वर्तमान समय प्राप्त गर्न कोड लेख्नेछौं। अन्तिम नतिजा प्राप्त गर्न प्रतिक्रिया सन्देशबाट नाम र आर्गुमेन्टहरू निकाल्ने कोड पनि लेख्नु पर्नेछ।

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
    # कार्य कलाहरू व्यवस्थापन गर्नुहोस्
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # उपकरणको परिणाम function_call_output आइटमको रूपमा फर्काउनुहोस्
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # दोस्रो API कल: मोडेलबाट अन्तिम प्रतिक्रिया प्राप्त गर्नुहोस्
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

फङ्क्शन कल अधिकांश, यदि सबै होइन भने, एजेन्ट उपकरण प्रयोग डिजाइनका हृदयमा छ, तर यसलाई खाल्डोबाट लागू गर्नु कहिलेकाहीँ चुनौतीपूर्ण हुन सक्छ।
हामीले [पाठ 2](../../../02-explore-agentic-frameworks) मा सिक्यौं कि एजेन्टिक फ्रेमवर्कहरूले उपकरण प्रयोग लागू गर्न पूर्व-निर्मित निर्माण खण्ड प्रदान गर्दछन्।
 
## एजेन्टिक फ्रेमवर्कहरूसँग उपकरण प्रयोगका उदाहरणहरू

यहाँ विभिन्न एजेन्टिक फ्रेमवर्कहरूसँग उपकरण प्रयोग डिजाइन ढाँचा लागू गर्ने केही उदाहरणहरू छन्:

### Microsoft एजेन्ट फ्रेमवर्क

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft एजेन्ट फ्रेमवर्क</a> AI एजेन्टहरू निर्माण गर्ने खुला स्रोत AI फ्रेमवर्क हो। यसले फङ्क्शन कल प्रयोगलाई सरल बनाउँछ जसले तपाईंलाई `@tool` डेकोरेटर सहित पायथन फङ्क्शनको रूपमा उपकरणहरू परिभाषित गर्न अनुमति दिन्छ। यो फ्रेमवर्कले मोडेल र तपाईंको कोड बीचको दोहोरो संवाद प्रबन्ध गर्दछ। यसले `FoundryChatClient` मार्फत फाइल खोज र कोड इन्टरप्रेटर जस्ता पूर्व-निर्मित उपकरणहरूसम्म पहुँच पनि प्रदान गर्दछ।

तलको चित्र Microsoft एजेन्ट फ्रेमवर्कसँग फङ्क्शन कल प्रक्रियालाई देखाउँछ:

![function calling](../../../translated_images/ne/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft एजेन्ट फ्रेमवर्कमा, उपकरणहरू डेकोरेट गरिएको फङ्क्शनको रूपमा परिभाषित गरिन्छन्। हामीले पहिले देखेको `get_current_time` फङ्क्शनलाई `@tool` डेकोरेटर प्रयोग गरेर उपकरणमा रूपान्तरण गर्न सक्छौं। फ्रेमवर्कले स्वचालित रूपमा फङ्क्शन र यसको प्यारामिटरहरूलाई सिरियलाइज गरेर LLM लाई पठाउने स्कीमा सिर्जना गर्दछ।

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# क्लाइन्ट बनाउनुस्
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# एउटा एजेन्ट बनाउनुस् र उपकरणसँग चलाउनुस्
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry एजेन्ट सेवा

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry एजेन्ट सेवा</a> नयाँ एजेन्टिक फ्रेमवर्क हो जुन विकासकर्ताहरूलाई आधारभूत कम्प्युट र भण्डारण स्रोतहरू व्यवस्थापन नगरी उच्च गुणस्तरका विस्तारयोग्य AI एजेन्टहरू सुरक्षित रूपमा निर्माण, परिनियोजन र स्केल गर्न सक्षम बनाउँछ। यो विशेष गरी उद्यम अनुप्रयोगहरूको लागि उपयोगी छ किनभने यो पूर्ण रूपमा व्यवस्थापित सेवा हो र उद्यम स्तरको सुरक्षा प्रदान गर्दछ।

LLM API सँग सिधै विकास तुलनामा, Microsoft Foundry एजेन्ट सेवाले केही फाइदाहरू प्रदान गर्दछ, जस्तै:

- स्वचालित उपकरण कल – उपकरण कल पार्स, उपकरण चलाउने, र प्रतिक्रिया ह्यान्डल गर्न आवश्यक छैन; यी सबै अब सर्भर-पक्षमा हुन्छन्
- सुरक्षित रूपमा व्यवस्थापन गरिएको डेटा – आफ्नै संवाद अवस्थालाई व्यवस्थापन गर्नुभन्दा `threads` मा सबै आवश्यक जानकारी भण्डारण गर्न भरोसा गर्न सकिन्छ
- तत्क्षण प्रयोग गर्न मिल्ने उपकरणहरू – Bing, Azure AI Search, र Azure Functions जस्ता तपाईंको डाटा स्रोतहरूसँग अन्तरक्रिया गर्न उपकरणहरू

Microsoft Foundry एजेन्ट सेवामा उपलब्ध उपकरणहरू दुई वर्गमा विभाजित गर्न सकिन्छ:

1. ज्ञान उपकरणहरू:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing खोजसँग आधारभूत जडान</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">फाइल खोज</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI खोज</a>

2. कार्य उपकरणहरू:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">फङ्क्शन कल</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">कोड इन्टरप्रेटर</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI परिभाषित उपकरणहरू</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

एजेन्ट सेवाले यी उपकरणहरूलाई `toolset` को रूपमा सँगै प्रयोग गर्न अनुमति दिन्छ। यसले `threads` पनि प्रयोग गर्दछ जसले एक विशेष संवादको सन्देश इतिहास ट्र्याक गर्दछ।

कल्पना गर्नुहोस् तपाईं Contoso नामक कम्पनीमा बिक्री एजेन्ट हुनुहुन्छ। तपाईं यस्तो संवादात्मक एजेन्ट विकास गर्न चाहनुहुन्छ जसले तपाईंको बिक्री डाटाबारे प्रश्नहरूको उत्तर दिन सक्छ।

तलको छविले तपाईंले Microsoft Foundry एजेन्ट सेवा प्रयोग गरेर आफ्नो बिक्री डाटा कसरी विश्लेषण गर्न सक्नुहुन्छ भनेर देखाउँछ:

![Agentic Service In Action](../../../translated_images/ne/agent-service-in-action.34fb465c9a84659e.webp)

यी उपकरणहरू सेवासँग प्रयोग गर्न हामी क्लाइन्ट सिर्जना गर्न र उपकरण वा उपकरण सेट परिभाषित गर्न सक्छौं। यसलाई व्यवहारमा लागू गर्न तलको पायथन कोड प्रयोग गर्न सकिन्छ। LLM उपकरण सेटलाई हेरेर प्रयोगकर्ताले बनाएको फङ्क्शन `fetch_sales_data_using_sqlite_query` प्रयोग गर्ने वा पूर्व-निर्मित कोड इन्टरप्रेटर प्रयोग गर्ने निर्णय गर्न सक्षम हुनेछ।

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query फंक्सन जुन fetch_sales_data_functions.py फाइलमा पाइन्छ।
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# उपकरण सेट आरम्भ गर्नुहोस्
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query फंक्सनसँग function calling एजेन्ट आरम्भ गर्नुहोस् र यसलाई उपकरण सेटमा थप्नुहोस्
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Code Interpreter उपकरण आरम्भ गर्नुहोस् र यसलाई उपकरण सेटमा थप्नुहोस्।
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## भरोसायोग्य AI एजेन्टहरू बनाउन उपकरण प्रयोग डिजाइन ढाँचा प्रयोग गर्दा विशेष विचारहरू के हुन्?

LLMs द्वारा गतिशील रूपमा सिर्जित SQL को सामान्य चिन्ता सुरक्षा हो, विशेष गरी SQL इन्जेक्शन वा दुर्भावनापूर्ण क्रियाकलापहरू (जस्तै डेटाबेस ड्रप वा छेड़छाड) को जोखिम। यी चिन्ताहरू मान्य भए तापनि, डेटाबेस पहुँच अनुमति उचित रूपमा कन्फिगर गरेर प्रभावकारी रूपमा व्यवस्थापन गर्न सकिन्छ। धेरै डेटाबेसहरूको लागि यसले डेटाबेसलाई रिड-ओनली रूपमा कन्फिगर गर्ने समावेश गर्दछ। PostgreSQL वा Azure SQL जस्ता डेटाबेस सेवाहरूको लागि, एप्लिकेशनलाई रिड-ओनली (SELECT) भूमिका दिइनु पर्छ।

एप्लिकेशनलाई सुरक्षित वातावरणमा चलाउनु थप सुरक्षा बढाउँछ। उद्यम परिदृश्यहरूमा, डाटा सामान्यतया सञ्चालन प्रणालीहरूबाट निकाली रिड-ओनली डेटाबेस वा डाटा गोदाममा रूपान्तरण गरिन्छ जुन प्रयोग मैत्री स्कीमाबाट हुन्छ। यसले डाटालाई सुरक्षित, प्रदर्शन र पहुँचको लागि अनुकूल, र एप्लिकेशनलाई प्रतिबन्धित रिड-ओनली पहुँच दिन सुनिश्चित गर्दछ।

## नमूना कोडहरू

- पायथन: [एजेन्ट फ्रेमवर्क](./code_samples/04-python-agent-framework.ipynb)
- .NET: [एजेन्ट फ्रेमवर्क](./code_samples/04-dotnet-agent-framework.md)

## उपकरण प्रयोग डिजाइन ढाँचाबारे थप प्रश्नहरू छन्?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) मा सामेल हुनुहोस् अन्य सिक्नेहरूसँग भेट्न, कार्यालय समयमा सामेल हुन र तपाईंका AI एजेन्ट प्रश्नहरूको उत्तर पाउन।

## थप स्रोतहरू

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service कार्यशाला</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer बहु-एजेन्ट कार्यशाला</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft एजेन्ट फ्रेमवर्क अवलोकन</a>


## यस एजेन्टको स्मोक-टेस्टिङ (वैकल्पिक)

तपाईंले [Lesson 16](../16-deploying-scalable-agents/README.md) मा एजेन्टहरू तैनाथ गर्न सिकेपछि, तपाईंले यस पाठको `TravelToolAgent` लाई स्मोक-टेस्ट गर्न सक्नुहुन्छ (के यसले अझै पनि यसको उपकरणहरू कल गर्छ र जवाफ दिन्छ?) यो गर्नको लागि [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) प्रयोग गर्नुहोस्। यसलाई कसरी चलाउने बारे जान्नका लागि [`tests/README.md`](../tests/README.md) हेर्नुहोस्।

## अघिल्लो पाठ

[एजेन्टिक डिजाइन ढाँचाहरू बुझ्न](../03-agentic-design-patterns/README.md)

## अर्को पाठ

[एजेन्टिक RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->