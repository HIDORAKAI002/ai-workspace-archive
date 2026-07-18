# माइक्रोसफ्ट एजेन्ट फ्रेमवर्क अन्वेषण गर्दै

![Agent Framework](../../../translated_images/ne/lesson-14-thumbnail.90df0065b9d234ee.webp)

### परिचय

यो पाठले समेट्नेछ:

- माइक्रोसफ्ट एजेन्ट फ्रेमवर्क बुझ्न: मुख्य विशेषताहरू र मूल्य  
- माइक्रोसफ्ट एजेन्ट फ्रेमवर्कका मुख्य अवधारणाहरू अन्वेषण गर्न
- उन्नत MAF ढाँचाहरू: कार्यप्रवाहहरू, मध्यवर्ती सफ्टवेयर, र स्मृति

## सिकाइ लक्ष्यहरू

यो पाठ पूरा गरेपछि, तपाईंले जान्नु हुनेछ:

- माइक्रोसफ्ट एजेन्ट फ्रेमवर्क प्रयोग गरेर उत्पादन-तयार AI एजेन्टहरू निर्माण गर्न
- माइक्रोसफ्ट एजेन्ट फ्रेमवर्कका मुख्य सुविधाहरूलाई तपाईंका एजेन्टिक प्रयोग मामलेहरूमा लागू गर्न
- उन्नत ढाँचाहरू जस्तै कार्यप्रवाहहरू, मध्यवर्ती सफ्टवेयर, र अनुगमन प्रयोग गर्न

## कोड नमूनाहरू 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) का लागि कोड नमूनाहरू यस रिपोजिटरीमा `xx-python-agent-framework` र `xx-dotnet-agent-framework` फाइलहरूमा फेला पार्न सकिन्छ।

## माइक्रोसफ्ट एजेन्ट फ्रेमवर्क बुझ्न

![Framework Intro](../../../translated_images/ne/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) माइक्रोसफ्टको एकीकृत फ्रेमवर्क हो जुन AI एजेन्टहरू निर्माण गर्न प्रयोग गरिन्छ। यसले उत्पादन र अनुसन्धान वातावरणहरूमा देखिएका विभिन्न एजेन्टिक प्रयोग मामला समाधान गर्न लचिलोपन प्रदान गर्दछ, जस्तै:

- **क्रमिक एजेन्ट संयोजन** जहाँ चरण-दर-चरण कार्यप्रवाहहरू आवश्यक हुन्छन्।
- **समानान्तर संयोजन** जहाँ एजेन्टहरूले एउटै समयमा कामहरू पूरा गर्नुपर्छ।
- **समूह च्याट संयोजन** जहाँ एजेन्टहरूले एउटै कार्यमा सहकार्य गर्न सक्छन्।
- **ह्यान्डअफ संयोजन** जहाँ एजेन्टहरूले उपकार्यहरू पूरा भएपछि काम एकअर्कालाई सुम्पन्छन्।
- **म्याग्नेटिक संयोजन** जहाँ व्यवस्थापक एजेन्टले कार्य सूची बनाउँछ र परिमार्जन गर्छ र उपएजेन्टहरूको समन्वय गर्दछ।

उत्पादनमा AI एजेन्टहरू वितरण गर्नका लागि, MAF मा यी सुविधाहरू पनि छन्:

- **अनुगमनशीलता** OpenTelemetry को प्रयोगद्वारा जहाँ AI एजेन्टको प्रत्येक कार्य जस्तै उपकरण आह्वान, संयोजन चरणहरू, तर्क प्रवाह र माइक्रोसफ्ट फाउन्ड्री ड्यासबोर्डमार्फत प्रदर्शन निगरानी गरिन्छ।
- **सुरक्षा** एजेन्टहरूलाई माइक्रोसफ्ट फाउन्ड्रीमा स्वदेशी रूपमा होस्ट गरेर सुरक्षा नियन्त्रणहरू, जस्तै भूमिका-आधारित पहुँच, निजी डाटा व्यवस्थापन र समावेशी सामग्री सुरक्षा प्रदान गर्दछ।
- **टिकाउपन** एजेन्ट थ्रेड र कार्यप्रवाहहरू रोक्न, पुन: सुरु गर्न र त्रुटिबाट पुनः प्राप्त गर्न सकिन्छ जसले लामो समयसम्म चल्ने प्रक्रियाहरू सक्षम बनाउँछ।
- **नियन्त्रण** मानव सहभागी कार्यप्रवाहहरूलाई समर्थन गर्दछ जहाँ कामहरूलाई मानव अनुमोदन आवश्यक मानिन्छ।

माइक्रोसफ्ट एजेन्ट फ्रेमवर्क अन्तरसम्पर्कयोग्य हुनेमा पनि केन्द्रित छ:

- **क्लाउड-निर्दिष्टता रहित** - एजेन्टहरू कन्टेनरहरू, अन-प्रिम र विभिन्न क्लाउडहरूमा चलाउन सकिन्छ।
- **प्रदायक-निर्दिष्टता रहित** - एजेन्टहरूलाई तपाइँको रोजाइको SDK मार्फत सिर्जना गर्न सकिन्छ, जस्तै Azure OpenAI र OpenAI
- **खुला मानकहरू समाहित गर्ने** - एजेन्टले एजेन्ट-देखि-एजेन्ट (A2A) र मोडेल सन्दर्भ प्रोटोकल (MCP) जस्ता प्रोटोकलहरू प्रयोग गरी अन्य एजेन्ट र उपकरणहरू पत्ता लगाउन र उपयोग गर्न सक्छ।
- **प्लगइनहरू र कनेक्टरहरू** - माइक्रोसफ्ट फेब्रिक, शेयरपोइन्ट, पाइनकोन र क्वड्रान्ट जस्ता डाटा र स्मृति सेवाहरूमा जडान गर्न सकिन्छ।

आउनुहोस्, यी सुविधाहरू कसरी माइक्रोसफ्ट एजेन्ट फ्रेमवर्कका केही मुख्य अवधारणाहरूमा लागू गरिन्छ हेर्नुहोस्।

## माइक्रोसफ्ट एजेन्ट फ्रेमवर्कका मुख्य अवधारणाहरू

### एजेन्टहरू

![Agent Framework](../../../translated_images/ne/agent-components.410a06daf87b4fef.webp)

**एजेन्टहरू सिर्जना गर्ने**

एजेन्ट सिर्जना गर्ने कार्यमा अनुमान सेवा (LLM प्रदायक), AI एजेन्टले पालना गर्ने निर्देशनहरूको सेट, र `name` निर्दिष्ट गरिन्छ:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

माथिको उदाहरणमा `Azure OpenAI` प्रयोग गरिएको छ तर एजेन्टहरू विभिन्न सेवाहरू प्रयोग गरेर सिर्जना गर्न सकिन्छ, जस्तै `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API हरू

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

वा [MiniMax](https://platform.minimaxi.com/), जसले ठूलो सन्दर्भ विन्डोहरू (२०४K टोकनसम्म) सहित OpenAI-अनुरूप API प्रदान गर्दछ:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

वा A2A प्रोटोकल प्रयोग गरेर दूरस्थ एजेन्टहरू:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**एजेन्टहरू चलाउने**

एजेन्टहरू `.run` वा `.run_stream` विधिहरू प्रयोग गरेर रिलायन्स वा स्ट्रिमिङ प्रतिक्रियाका लागि चलाइन्छन्।

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

प्रत्येक एजेन्ट रनले `max_tokens`, एजेन्टले कल गर्न सक्ने `tools`, र प्रयोग हुने `model` जस्ता विकल्पहरूलाई अनुकूलन गर्न सक्छ।

यो विशिष्ट मोडेल वा उपकरणहरू प्रयोग गर्न आवश्यक छ जसले प्रयोगकर्ताको कार्य पूरा गर्न सहयोग पुर्‍याउँछ।

**उपकरणहरू**

उपकरणहरू एजेन्ट परिभाषा गर्दा नै निर्दिष्ट गर्न सकिन्छ:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# सिधा ChatAgent निर्माण गर्दा

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

र एजेन्ट चलाउँदा पनि:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # यो रनको लागि मात्र प्रदान गरिएको उपकरण )
```

**एजेन्ट थ्रेडहरू**

बहु-वार्तालापहरू ह्याण्डल गर्न एजेन्ट थ्रेडहरू प्रयोग गरिन्छ। थ्रेडहरू यसरी सिर्जना गर्न सकिन्छ:

- `get_new_thread()` प्रयोग गरेर जुन थ्रेडलाई समयक्रममा बचत गर्न सक्षम बनाउँछ
- एजेन्ट चलाउँदा स्वचालित रूपमा थ्रेड सिर्जना गरिन्छ र त्यो थ्रेड केवल हालको रनसम्म कायम रहन्छ।

थ्रेड सिर्जना गर्नको लागि कोड यस प्रकार छ:

```python
# नयाँ थ्रेड सिर्जना गर्नुहोस्।
thread = agent.get_new_thread() # थ्रेडसँग एजेन्ट चलाउनुहोस्।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

त्यसपछि थ्रेडलाई पछि प्रयोगका लागि सिरीयलाइज गर्न सकिन्छ:

```python
# नयाँ थ्रेड सिर्जना गर्नुहोस्।
thread = agent.get_new_thread() 

# थ्रेडसँग एजेन्ट चलाउनुहोस्।

response = await agent.run("Hello, how are you?", thread=thread) 

# भण्डारणको लागि थ्रेडलाई सिरियलाइज गर्नुहोस्।

serialized_thread = await thread.serialize() 

# भण्डारणबाट लोड गरेपछि थ्रेड स्थिति डीसिरियलाइज गर्नुहोस्।

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**एजेन्ट मध्यवर्ती सफ्टवेयर (Middleware)**

एजेन्टहरूले उपकरणहरू र LLMs सँग अन्तरक्रिया गरेर प्रयोगकर्ताका कार्य पूरा गर्छन्। केही परिस्थितिमा, हामी यी अन्तरक्रियाहरूको बीचमा कारबाही वा ट्रयाक गर्न चाहन्छौं। एजेन्ट Middleware यसलाई सक्षम बनाउँछ:

*फंक्शन Middleware*

यो Middleware तब प्रयोग गरिन्छ जब एजेन्ट र फंक्शन/उपकरण बीचमा कारबाही गर्न चाहिन्छ। उदाहरणको रूपमा फंक्शन कलमा लगिङ गर्न सकिन्छ।

तलको कोडमा `next` ले निर्धारण गर्छ कि अर्को middleware वा वास्तविक फंक्शन कल हुन्छ कि हुँदैन।

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # पूर्व-प्रसंस्करण: कार्यसम्पादन अघि लग
    print(f"[Function] Calling {context.function.name}")

    # अर्को मिडलवेयर वा कार्यसम्पादन जारी राख्नुहोस्
    await next(context)

    # पश्च-प्रसंस्करण: कार्यसम्पादन पछि लग
    print(f"[Function] {context.function.name} completed")
```

*च्याट Middleware*

यो Middleware ले एजेन्ट र LLM बिचका अनुरोधहरूमा कारबाही वा लगिङ गर्न अनुमति दिन्छ।

यसमा AI सेवा पठाइएका `messages` जस्ता महत्वपूर्ण जानकारी हुन्छ।

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # पूर्व-प्रक्रिया: एआई कल अघिको लग
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # अर्को मिडलवेयर वा एआई सेवातर्फ जारी राख्नुहोस्
    await next(context)

    # पश्च-प्रक्रिया: एआई प्रतिक्रिया पछिको लग
    print("[Chat] AI response received")

```

**एजेन्ट मेमोरी**

`Agentic Memory` पाठमा कवर गरेको अनुसार, मेमोरी एजेन्टलाई फरक फरक सन्दर्भहरूमा काम गर्न सक्षम बनाउने महत्त्वपूर्ण तत्व हो। MAF विभिन्न प्रकारका मेमोरीहरू प्रदान गर्दछ:

*इन-मेमोरी स्टोरेज*

यो मेमोरी एप्लिकेसन रनटाइमको समयमा थ्रेडहरूमा सूचीकृत हुन्छ।

```python
# नयाँ थ्रेड बनाउनुहोस्।
thread = agent.get_new_thread() # थ्रेडसँग एजेन्ट चलाउनुहोस्।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*पर्सिस्टेन्ट सन्देशहरू*

यो मेमोरी विभिन्न सत्रहरूमा कुरा इतिहास भण्डारण गर्न प्रयोग गरिन्छ। यो `chat_message_store_factory` प्रयोग गरी परिभाषित गरिन्छ:

```python
from agent_framework import ChatMessageStore

# एक अनुकूलित सन्देश स्टोर सिर्जना गर्नुहोस्
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*डायनामिक मेमोरी*

यो मेमोरी एजेन्टहरू चलाउनु भन्दा पहिले सन्दर्भमा थपिन्छ। यी मेमोरीहरू बाहिरी सेवाहरूमा जस्तै mem0 मा भण्डारण गर्न सकिन्छ:

```python
from agent_framework.mem0 import Mem0Provider

# उन्नत मेमोरी क्षमताहरूको लागि Mem0 प्रयोग गर्दै
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**एजेन्ट अनुगमनशीलता**


अवलोकनीयता भरपर्दो र मर्मतयोग्य एजेन्टिक प्रणालीहरू बनाउन महत्वपूर्ण छ। MAF ले OpenTelemetry सँग एकीकरण गरेर ट्रेसिङ र मिटरहरू प्रदान गर्दछ जसले सुधारिएको अवलोकनीयता सुनिश्चित गर्दछ।

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # केही गर्नुहोस्
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### कार्यप्रवाहहरू

MAF ले पूर्वनिर्धारित चरणहरू भएको कार्यप्रवाहहरू उपलब्ध गराउँछ जुन कार्य पूरा गर्न प्रयोग गरिन्छ र ती चरणहरूमा AI एजेन्टहरू कम्पोनेन्टको रूपमा समावेश छन्।

कार्यप्रवाहहरू विभिन्न कम्पोनेन्टहरूबाट बनेका हुन्छन् जसले राम्रो नियन्त्रण प्रवाह सुनिश्चित गर्छ। कार्यप्रवाहहरूले **बहु-एजेन्ट समन्वय** र **चेकपोइन्टिङ** लाई पनि सक्षम बनाउँछन् जसले कार्यप्रवाह अवस्थाहरू सुरक्षित राख्छ।

कार्यप्रवाहका मुख्य कम्पोनेन्टहरू हुन्:

**कार्यन्वयनकर्ता (Executors)**

कार्यन्वयनकर्ताहरूले इनपुट सन्देशहरू प्राप्त गर्छन्, आफ्ना जिम्मेवारीका कार्यहरू पूरा गर्छन्, र त्यसपछि आउटपुट सन्देश उत्पादन गर्छन्। यसले कार्यप्रवाहलाई ठूलो कार्य पूरा गर्ने दिशामा अघि बढाउँछ। कार्यन्वयनकर्ता AI एजेन्ट वा कस्टम लजिक हुन सक्छ।

**एजहरू (Edges)**

एजहरू कार्यप्रवाह भित्र सन्देशहरूको प्रवाहलाई परिभाषित गर्न प्रयोग गरिन्छ। यी हुन सक्छन्:

*प्रत्यक्ष एजहरू* - कार्यन्वयनकर्ताबीच सरल एक-देखि-एक जडानहरू:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*सशर्त एजहरू* - कुनै निश्चित शर्त पूरा भएपछि सक्रिय हुन्छन्। उदाहरणको लागि, जब होटलको कोठाहरू उपलब्ध छैनन्, कार्यन्वयनकर्ताले अन्य विकल्पहरू सिफारिस गर्न सक्छ।

*स्विच-केस एजहरू* - परिभाषित शर्तहरूका आधारमा सन्देशहरू विभिन्न कार्यन्वयनकर्तातिर मार्गनिर्देशन गर्छन्। उदाहरणको लागि, यदि यात्रु ग्राहकलाई प्राथमिकता पहुँच छ भने तिनीहरूको कार्यहरू अर्को कार्यप्रवाह मार्फत सम्हालिन्छ।

*फ्यान-आउट एजहरू* - एउटै सन्देश धेरै गन्तव्यहरूमा पठाउँछन्।

*फ्यान-इन एजहरू* - विभिन्न कार्यन्वयनकर्ताबाट धेरै सन्देशहरू सङ्कलन गरी एउटै गन्तव्यमा पठाउँछन्।

**घटनाहरू (Events)**

कार्यप्रवाहहरूमा सुधारिएको अवलोकनीयता प्रदान गर्न MAF ले कार्यान्वयनका लागि निम्न बिल्ट-इन घटनाहरू प्रदान गर्दछ:

- `WorkflowStartedEvent`  - कार्यप्रवाह कार्यान्वयन सुरु हुन्छ
- `WorkflowOutputEvent` - कार्यप्रवाहले आउटपुट उत्पादन गर्छ
- `WorkflowErrorEvent` - कार्यप्रवाहमा त्रुटि देखा पर्छ
- `ExecutorInvokeEvent`  - कार्यन्वयनकर्ता प्रक्रिया सुरु गर्छ
- `ExecutorCompleteEvent`  -  कार्यन्वयनकर्ता प्रक्रिया समाप्त गर्छ
- `RequestInfoEvent` - अनुरोध जारी गरिन्छ

## उन्नत MAF ढाँचाहरू

माथिका खण्डहरूले Microsoft Agent Framework का मुख्य अवधारणाहरू समेटेका छन्। जति तपाईं जटिल एजेन्टहरू निर्माण गर्नुहुन्छ, यहाँ केही उन्नत ढाँचाहरू विचारका लागि छन्:

- **मिडलवेयर संयोजन**: बहुआयामी मिडलवेयर ह्यान्डलरहरू (लगिङ, प्रमाणीकरण, दर-सीमा निर्धारण) लाई चेन गरेर एजेन्ट व्यवहारमा सूक्ष्म नियन्त्रण सुनिश्चित गर्नुहोस्।
- **कार्यप्रवाह चेकपोइन्टिङ**: कार्यप्रवाह घटनाहरू र सिरियलाइजेसन प्रयोग गरी लामो समयसम्म चल्ने एजेन्ट प्रक्रियाहरू सुरक्षित गर्नुहोस् र फेरि सुरु गर्नुहोस्।
- **डायनामिक उपकरण चयन**: RAG र MAF को उपकरण दर्ता संयोजन गरेर केवल सोधपुछ अनुसारसम्बन्धित उपकरणहरू मात्र प्रस्तुत गर्नुहोस्।
- **बहु-एजेन्ट हस्तान्तरण**: कार्यप्रवाह एजहरू र शर्तीय मार्गनिर्देशन प्रयोग गरेर विशेषज्ञ एजेन्टहरू बीचको हस्तान्तरणलाई समन्वय गर्नुहोस्।

## Microsoft Foundry मा LangChain / LangGraph एजेन्टहरूको होस्टिङ

Microsoft Agent Framework **फ्रेमवर्क-अन्तरक्रियाशील** छ — तपाईं केवल MAF सँग लेखिएका एजेन्टहरूमा सीमित हुनुहुन्न। यदि तपाईं संग पहिले नै **LangChain** वा **LangGraph** मा बनाइएको एजेन्ट छ भने, तपाईं यसलाई **Microsoft Foundry होस्टेड एजेन्ट** को रूपमा चलाउन सक्नुहुन्छ जसले रनटाइम, सत्रहरू, स्केलिङ, पहिचान, र प्रोटोकल अन्तबिन्दुहरू Foundry मार्फत व्यवस्थापन गर्दछ जबकि तपाईंको एजेन्ट लजिक LangGraph मा रहन्छ।

यो `langchain_azure_ai.agents.hosting` प्याकेजद्वारा गरिन्छ, जुन Foundry होस्टेड एजेन्टहरूले प्रयोग गर्ने समान प्रोटोकलहरूमा कम्पाइल गरिएको LangGraph ग्राफ प्रदर्शित गर्दछ।

**1. होस्टिङ एक्सट्रा इन्स्टल गर्नुहोस्:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` एक्सट्रा Foundry प्रोटोकल पुस्तकालयहरू इन्स्टल गर्दछ: `azure-ai-agentserver-responses` (OpenAI-संगत `/responses` अन्तबिन्दु) र `azure-ai-agentserver-invocations` (सामान्य `/invocations` अन्तबिन्दु)।

**2. होस्टिङ प्रोटोकल छान्नुहोस्:**

| प्रोटोकल | होस्ट क्लास | अन्तबिन्दु | प्रयोग गर्ने बेला |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | तपाईँलाई OpenAI-संगत च्याट, स्ट्रिमिङ, प्रतिक्रिया इतिहास, र वार्तालाप थ्रेडिङ चाहिएको छ भने — वार्तालाप एजेन्टहरूसम्मका लागि सिफारिस गरिएको पूर्वनिर्धारित। |
| **Invocations** | `InvocationsHostServer` | `/invocations` | तपाईँलाई कस्टम JSON ढाँचा, वेबहुक शैलीको अन्तबिन्दु, वा गैर-वार्तालाप प्रक्रिया आवश्यक पर्दछ भने। |

किनभने **Responses API Foundry मा एजेन्ट-शैली विकासका लागि मुख्य API हो**, प्रायः एजेन्टहरूका लागि `ResponsesHostServer` बाट सुरु गर्नुहोस्।

**3. वातावरण चरहरू कन्फिगर गर्नुहोस्** (`az login` पहिले गर्नुहोस् ताकि `DefaultAzureCredential` प्रमाणीकरण गर्न सकोस):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

जब एजेन्ट पछि Foundry मा होस्टेड एजेन्टको रूपमा चल्छ, प्लेटफर्मले `FOUNDRY_PROJECT_ENDPOINT` स्वचालित रूपमा इन्जेक्ट गर्छ।

**4. Responses प्रोटोकल भित्र LangGraph एजेन्टलाई एक्स्पोज गर्नुहोस्:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # ChatOpenAI यहाँ Foundry परियोजनाको OpenAI-अनुकूल (प्रतिक्रियाहरू) अन्त्यबिन्दु लक्षित गर्दछ।
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

स्थानीय रूपमा `python main.py` चलाउनुहोस्, त्यसपछि `http://localhost:8088/responses` मा Responses अनुरोध पठाउनुहोस्।

**मुख्य व्यवहारहरू:**

- **वार्तालापहरू**: क्लाइन्टहरूले `previous_response_id` वा `conversation` ID पास गरेर वार्तालाप जारी राख्छन्। यदि तपाईंको ग्राफ LangGraph चेकपोइन्टरसहित कम्पाइल गरिएको छ भने Foundry ले वार्तालाप अवस्थालाई चेकपोइन्ट मा कुञ्जी गर्छ (उत्पादनमा टिकाउ चेकपोइन्टर प्रयोग गर्नुहोस्; स्थानीय परीक्षणका लागि `MemorySaver` पर्याप्त छ)।
- **मानव-से-लूप**: यदि तपाईंको ग्राफले LangGraph को `interrupt()` प्रयोग गर्छ भने, `ResponsesHostServer` ले प्यान्डिंग इन्टरप्टलाई Responses `function_call` / `mcp_approval_request` आइटमको रूपमा देखाउँछ, र क्लाइन्टहरू मिल्दोजुल्दो `function_call_output` / `mcp_approval_response` मार्फत पुनः सुरु हुन्छन्।
- **Foundry मा डिप्लोय गर्नुहोस्**: Azure Developer CLI प्रयोग गर्नुहोस् — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (स्थानीय, Docker आवश्यक), त्यसपछि `azd provision` र `azd deploy`। होस्टेड-एजेन्ट डिप्लोयमेन्टका लागि **Foundry Project Manager** भूमिका आवश्यक छ।

यो उदाहरणको चल्ने संस्करण [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) मा छ। पूर्ण मार्गदर्शनका लागि (Invocations प्रोटोकल, कस्टम अनुरोध स्किमाहरू, र समस्या समाधान) हेर्नुहोस् [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)।

## कोड नमूनाहरू 

Microsoft Agent Framework का कोड नमूनाहरू यस रिपोजिटोरीमा `xx-python-agent-framework` र `xx-dotnet-agent-framework` फाइलहरूमा उपलब्ध छन्।

## Microsoft Agent Framework सम्बन्धी थप प्रश्नहरू छन्?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) मा सहभागी हुनुहोस् जहाँ अन्य सिक्नेहरू भेट्न, कार्यालय घण्टा भाग लिन र तपाईंका AI एजेन्ट सम्बंधी प्रश्नहरूको जवाफ पाउन सक्नुहुन्छ।
## अघिल्लो पाठ

[एआई एजेन्टहरूको लागि मेमोरी](../13-agent-memory/README.md)

## अर्को पाठ

[कम्प्युटर प्रयोग एजेन्टहरू (CUA) बनाउँदै](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->