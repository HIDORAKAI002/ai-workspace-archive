# मायक्रोसॉफ्ट एजंट फ्रेमवर्कचा अन्वेषण

![Agent Framework](../../../translated_images/mr/lesson-14-thumbnail.90df0065b9d234ee.webp)

### परिचय

हा धडा यावर प्रकाश टाकेल:

- मायक्रोसॉफ्ट एजंट फ्रेमवर्क समजून घेणे: मुख्य वैशिष्ट्ये आणि मूल्य  
- मायक्रोसॉफ्ट एजंट फ्रेमवर्कचे मुख्य संकल्पना अन्वेषण करणे
- प्रगत MAF नक्षत्रे: कार्यप्रवाह, मिडलवेअर, आणि स्मृती

## शिक्षणाचे उद्दिष्टे

हा धडा पूर्ण केल्यावर, तुम्हाला कसे समजेल:

- मायक्रोसॉफ्ट एजंट फ्रेमवर्कचा वापर करून उत्पादनास तयार AI एजंट तयार करणे
- मायक्रोसॉफ्ट एजंट फ्रेमवर्कची मुख्य वैशिष्ट्ये तुमच्या एजंट उपयोग केसेस मध्ये लागू करणे
- कार्यप्रवाह, मिडलवेअर, आणि निरीक्षणाचा समावेश असलेले प्रगत नक्षत्रे वापरणे

## कोड नमुने 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) साठी कोड नमुने या रिपॉझिटरीमध्ये `xx-python-agent-framework` आणि `xx-dotnet-agent-framework` फाइल्सखाली आढळू शकतात.

## मायक्रोसॉफ्ट एजंट फ्रेमवर्क समजून घेणे

![Framework Intro](../../../translated_images/mr/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) हे मायक्रोसॉफ्टचे AI एजंट तयार करण्यासाठी एकात्मिक फ्रेमवर्क आहे. हे उत्पादन व संशोधन दोन्ही वातावरणातील विविध प्रकारच्या एजंट वापर प्रकरणांना हाताळण्याची लवचीकता देते, ज्यामध्ये समाविष्ट आहे:

- **क्रमवार एजंट संयोजन** जिथे टप्पा-दर-टप्पा कार्यप्रवाह आवश्यक आहेत अशा परिस्थितीत.
- **समानकालिक संयोजन** जिथे एजंट्सना एकाच वेळी कार्य पूर्ण करणे आवश्यक आहे अशा परिस्थितीत.
- **गट चॅट संयोजन** जिथे एजंट्स एकत्र एकाच कार्यावर सहकार्य करू शकतात अशा परिस्थितीत.
- **हँडऑफ संयोजन** जिथे एजंट परस्परांना उपकार्य पूर्ण होताच कार्य हस्तांतरीत करतात अशा परिस्थितीत.
- **चुंबकीय संयोजन** जिथे मॅनेजर एजंट कार्यसूची तयार करतो आणि उपएजंट्सच्या समन्वयाचे हाताळणी करतो अशा परिस्थितीत.

उत्पादनात AI एजंट वितरणासाठी, MAF मध्ये खालील वैशिष्ट्ये देखील आहेत:

- **निरीक्षण** OpenTelemetry च्या वापराने, जिथे AI एजंटच्या प्रत्येक क्रियेचा ट्रॅकमधून टूल कॉल, संयोजन टप्पे, विचारप्रवाह व Microsoft Foundry डॅशबोर्डद्वारे कामगिरीचे निरीक्षण केले जाते.
- **सुरक्षा** एजंट्सना Microsoft Foundry वर स्थानिकरित्या होस्ट करणे, ज्यात भूमिका-आधारित प्रवेश, खासगी डेटा हाताळणी व अंगभूत सामग्री सुरक्षितता नियंत्रणे समाविष्ट आहेत.
- **टिकाऊपणा** एजंट थ्रेड्स व कार्यप्रवाह थांबवू, पुन्हा सुरू करू आणि त्रुटीपासून पुनर्प्राप्त करू शकतात, ज्यामुळे लांब काळ चालणाऱ्या प्रक्रियांसाठी सक्षम होतात.
- **नियंत्रण** मानव समाविष्ट कार्यप्रवाहांना समर्थन देणे जिथे कार्यांना मानवी मंजुरीची गरज दर्शविली जाते.

मायक्रोसॉफ्ट एजंट फ्रेमवर्कचा उद्देश इंटरऑपरेबिलिटीवर आहे त्यासाठी:

- **क्लाउड-स्वतंत्र असणे** - एजंट कंटेनरमध्ये, ऑन-प्रिमायसेस आणि विविध वेगळ्या क्लाउड्सवर चालू शकतात.
- **प्रदाता-स्वतंत्र असणे** - एजंट्स तुमच्या पसंतीच्या SDK द्वारे तयार केले जाऊ शकतात जसे की Azure OpenAI आणि OpenAI
- **ओपन स्टँडर्ड्स समाकलित करणे** - एजंट्स Agent-to-Agent (A2A) आणि Model Context Protocol (MCP) सारख्या प्रोटोकॉलचा वापर करून इतर एजंट्स व उपकरणे शोधू आणि वापरू शकतात.
- **प्लगइन्स आणि कनेक्टर्स** - Microsoft Fabric, SharePoint, Pinecone आणि Qdrant सारख्या डेटा व स्मृती सेवा कनेक्ट केल्या जाऊ शकतात.

चला पाहूया की मायक्रोसॉफ्ट एजंट फ्रेमवर्कच्या काही मुख्य संकल्पनांवर या वैशिष्ट्यांचा कसा वापर होतो.

## मायक्रोसॉफ्ट एजंट फ्रेमवर्कच्या मुख्य संकल्पना

### एजंट्स

![Agent Framework](../../../translated_images/mr/agent-components.410a06daf87b4fef.webp)

**एजंट तयार करणे**

एजंट तयार करण्यासाठी इन्फरन्स सेवा (LLM प्रदाता), AI एजंटसाठी सूचनांचा संच आणि दिलेले `name` निश्चित केले जाते:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

वर नमूद केल्याप्रमाणे `Azure OpenAI` चा वापर केला आहे, पण एजंट्स विविध सेवा वापरून तयार केले जाऊ शकतात जसे की `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

किंवा [MiniMax](https://platform.minimaxi.com/), ज्याने मोठ्या संदर्भ विंडोंसह OpenAI-सुसंगत API प्रदान करतो (204K टोकन्सपर्यंत):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

किंवा A2A प्रोटोकॉल वापरून रिमोट एजंट्स:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**एजंट चालवणे**

एजंट `.run` किंवा `.run_stream` पद्धती वापरून रीझल्ट्स नॉन-स्ट्रीमिंग किंवा स्ट्रीमिंग स्वरूपात चालवले जातात.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

प्रत्येक एजंट रनमध्ये `max_tokens`, `tools` जे एजंट कॉल करू शकते, आणि अगदी `model`साठी सेटिंग्ज कस्टमाइझ करण्याचे पर्याय असू शकतात.

हे उपयोगी आहे जिथे विशिष्ट मॉडेल्स किंवा टूल्स वापरणे गरजेचे आहे वापरकर्त्याच्या कामासाठी.

**टूल्स**

एजंट तयार करताना टूल्स निर्दिष्ट केली जाऊ शकतात:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# जेव्हा थेट ChatAgent तयार करत आहात

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

आणि एजंट चालवताना देखील:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # फक्त या रनसाठी प्रदान केलेले साधन )
```

**एजंट थ्रेड्स**

एजंट थ्रेड्स बहु-चरण संभाषण सांभाळण्यासाठी वापरले जातात. थ्रेड्स तयार करण्यासाठी दोन पद्धती आहेत:

- `get_new_thread()` वापरून, जेणेकरून थ्रेड वेळोवेळी जतन होऊ शकेल
- एजंट चालवताना आपोआप थ्रेड तयार करणे, आणि तो फक्त चालू रनपर्यंत टिकतो.

थ्रेड तयार करण्यासाठी कोड असा दिसतो:

```python
# एक नवीन थ्रेड तयार करा.
thread = agent.get_new_thread() # त्या थ्रेडसह एजंट चालवा.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

नंतर तुम्ही सिरीयलायझेशन करून थ्रेड नंतर वापरासाठी जतन करू शकता:

```python
# नवीन धागा तयार करा.
thread = agent.get_new_thread() 

# धाग्यासह एजंट चालवा.

response = await agent.run("Hello, how are you?", thread=thread) 

# स्टोरेजसाठी धागा सिरीयलाइझ करा.

serialized_thread = await thread.serialize() 

# स्टोरेजमधून लोड केल्यावर धागा स्थिती डी-सीरियलाइझ करा.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**एजंट मिडलवेअर**

एजंट्स उपकरणे आणि LLMs सोबत काम करून वापरकर्त्याचे कार्य पूर्ण करतात. काही परिस्थितींमध्ये, आम्हाला या संवादांदरम्यान काही क्रिया करायच्या असतात किंवा ट्रॅक करायचे असतात. एजंट मिडलवेअर द्वारे हे शक्य होते:

*फंक्शन मिडलवेअर*

या मिडलवेअरद्वारे एजंट आणि फंक्शन/टूल कॉल दरम्यान कार्य करण्याची सोय होते. उदाहरणार्थ, फंक्शन कॉलवर काही लॉगिंग करणे.

खालील कोडमध्ये `next` हे पुढील मिडलवेअर किंवा प्रत्यक्ष फंक्शन कॉल करायचे आहे का ते ठरवते.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # पूर्व-प्रक्रिया: फंक्शन अंमलबजावणीपूर्वी लॉग करा
    print(f"[Function] Calling {context.function.name}")

    # पुढील मिडलवेयर किंवा फंक्शन अंमलबजावणीसाठी पुढे चला
    await next(context)

    # पोस्ट-प्रक्रिया: फंक्शन अंमलबजावनीनंतर लॉग करा
    print(f"[Function] {context.function.name} completed")
```

*चॅट मिडलवेअर*

या मिडलवेअरद्वारे एजंट आणि LLM दरम्यानच्या विनंत्या दरम्यान कोणतीही क्रिया करणे किंवा लॉगिंग करणे शक्य होते.

यात `messages` सारखी महत्त्वाची माहिती समाविष्ट असते जी AI सेवेला पाठवली जातात.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # प्री-प्रोसेसिंग: AI कॉलपूर्वी लॉग करा
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # पुढील मिडलवेअर किंवा AI सेवेकडे पुढे जा
    await next(context)

    # पोस्ट-प्रोसेसिंग: AI प्रतिसादानंतर लॉग करा
    print("[Chat] AI response received")

```

**एजंट मेमरी**

`Agentic Memory` धड्यात सांगितल्याप्रमाणे, मेमरी हे एजंटला वेगवेगळ्या संदर्भांवर काम करण्यास सक्षम करणारे महत्त्वाचे घटक आहे. MAF मध्ये विविध प्रकारच्या स्मृती उपलब्ध आहेत:

*इन-मेमरी स्टोरेज*

ही मेमरी थ्रेड्समध्ये अॅप्लिकेशन चालू असताना साठवलेली असते.

```python
# नवीन थ्रेड तयार करा.
thread = agent.get_new_thread() # थ्रेडसह एजंट चालवा.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*पर्सिस्टंट मेसेजेस*

ही मेमरी वेगवेगळ्या सत्रांदरम्यान संभाषण इतिहास साठवण्यासाठी वापरली जाते. `chat_message_store_factory` वापरून याची व्याख्या केली जाते:

```python
from agent_framework import ChatMessageStore

# सानुकूल संदेश संच तयार करा
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*डायनॅमिक मेमरी*

ही मेमरी एजंट्स चालवण्यापूर्वी संदर्भात जोडली जाते. या मेमरी बाह्य सेवा जसे mem0 मध्ये साठवली जाऊ शकते:

```python
from agent_framework.mem0 import Mem0Provider

# प्रगत मेमरी क्षमतांसाठी Mem0 चा वापर करीत आहे
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

**एजंटचे निरीक्षण**


विश्वसनीय आणि देखभालयोग्य एजेंटिक प्रणाली तयार करण्यासाठी निरीक्षण महत्त्वाचे आहे. MAF चा OpenTelemetry शी एकत्रित होऊन ट्रेसिंग आणि मीटर प्रदान करते ज्यामुळे निरीक्षण अधिक चांगले होते.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # काहीतरी करा
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### वर्कफ्लोज्  

MAF पूर्व-परिभाषित पावले असलेले वर्कफ्लोज् ऑफर करते जे एखादे कार्य पूर्ण करण्यासाठी असतात आणि ज्यामध्ये AI एजंट्स या पावलांमध्ये घटक म्हणून असतात.

वर्कफ्लोज् वेगवेगळ्या घटकांनी बनलेले असतात जे अधिक चांगल्या कंट्रोल फ्लोसाठी मदत करतात. वर्कफ्लोज् **मल्टि-एजंट ऑर्केस्ट्रेशन** आणि **चेकपॉइंटिंग** सक्षम करतात ज्याने वर्कफ्लो स्थिती जतन केली जाऊ शकते.

वर्कफ्लोचे मुख्य घटक आहेत:

**एक्झिक्युटर्स**  

एक्झिक्युटर्स इनपुट मेसेजेस प्राप्त करतात, त्यांच्या नेमलेल्या कार्यांचे प्रदर्शन करतात आणि नंतर आउटपुट मेसेज तयार करतात. हे वर्कफ्लो पुढे नेऊन मोठे कार्य पूर्ण करतात. एक्झिक्युटर्स हे AI एजंट अथवा कस्टम लॉजिक असू शकतात.

**एजेस**  

एजेस वर्कफ्लोमध्ये मेसेजेसचा प्रवाह निश्चित करण्यासाठी वापरले जातात. हे असू शकतात:

*डायरेक्ट एजेस* - एक्झिक्युटर्समधील सोप्या एका-ते-एका कनेक्शन्स:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*कंडिशनल एजेस* - काही विशिष्ट अट पूर्ण झाल्यानंतर सक्रिय होतात. उदाहरणार्थ, जेव्हा हॉटेलचे खोल्या उपलब्ध नसतात, तेव्हा एक्झिक्युटर दुसरे पर्याय सुचवू शकतो.

*स्विच-केस एजेस* - परिभाषित अटींवर आधारित मेसेजेस वेगवेगळ्या एक्झिक्युटरकडे पाठवतात. उदाहरणार्थ, जर प्रवास करणारा ग्राहक प्राधान्य प्रवेशाचा असेल तर त्याचे कार्य दुसऱ्या वर्कफ्लोमधून हाताळले जाईल.

*फॅन-आउट एजेस* - एक मेसेज अनेक लक्ष्यांना पाठवतात.

*फॅन-इन एजेस* - वेगवेगळ्या एक्झिक्युटर्सकडून अनेक मेसेजेस गोळा करतात आणि एकाच लक्ष्याला पाठवतात.

**इव्हेंट्स**  

वर्कफ्लोचे अधिक चांगले निरीक्षण करण्यासाठी, MAF कार्यान्वयनासाठी बांधलेले इव्हेंट्स ऑफर करते ज्यामध्ये आहेत:

- `WorkflowStartedEvent`  - वर्कफ्लो कार्यान्वयन सुरू होते  
- `WorkflowOutputEvent` - वर्कफ्लो आउटपुट तयार करते  
- `WorkflowErrorEvent` - वर्कफ्लोमध्ये त्रुटी येते  
- `ExecutorInvokeEvent`  - एक्झिक्युटर प्रक्रिया सुरू करतो  
- `ExecutorCompleteEvent`  -  एक्झिक्युटर प्रक्रिया पूर्ण करतो  
- `RequestInfoEvent` - विनंती लॉन्च केली जाते  

## प्रगत MAF पॅटर्न्स

वरील विभाग Microsoft Agent Framework चे मुख्य संकल्पना मांडतात. आपण अधिक जटिल एजंट तयार करत असल्यास, येथे काही प्रगत पॅटर्न विचारात घेण्यासारखे आहेत:  

- **मिडलवेअर कॉम्पोजिशन**: फंक्शन आणि चॅट मिडलवेअर वापरून अनेक मिडलवेअर हँडलर्स (लॉगिंग, ऑथ, रेट-लिमिटिंग) साखळीत गुंथा ज्यामुळे एजंट वर्तनावर व्यवस्थित नियंत्रण मिळते.  
- **वर्कफ्लो चेकपॉइंटिंग**: वर्कफ्लो इव्हेंट्स आणि सिरियलायझेशन वापरून दीर्घकाळ चालणाऱ्या एजंट प्रक्रियांची बचत आणि पुन्हा सुरूवात करा.  
- **डायनॅमिक टूल निवड**: टूल वर्णनांवरील RAG आणि MAF च्या टूल नोंदणी एकत्र करून प्रश्नाच्या अनुसार केवळ संबंधित टूल्स दाखविणे.  
- **मल्टी-एजंट हँडऑफ**: वर्कफ्लो एजेस आणि कंडिशनल राउटिंग वापरून विशेष एजंट्समधील हस्तांतरणांचे समन्वयन करा.  

## Microsoft Foundry वर LangChain / LangGraph एजंट होस्टिंग

Microsoft Agent Framework हे **फ्रेमवर्क-अनुकूल** आहे — आपण केवळ MAF ने बनवलेले एजंट वापरू शकत नाही. जर आपल्याकडे आधीच **LangChain** किंवा **LangGraph** ने बनवलेला एजंट असेल, तर आपण त्याला **Microsoft Foundry होस्टेड एजंट** म्हणून चालवू शकता ज्यात Foundry रनटाइम, सत्रे, स्केलिंग, ओळख आणि प्रोटोकॉल एण्डपॉइंट्स व्यवस्थापित करतो, तर आपला एजंट लॉजिक LangGraph मध्ये राहतो.

हे `langchain_azure_ai.agents.hosting` पॅकेज वापरून करता येते, जे एक संकलित LangGraph ग्राफ प्रदर्शित करते ज्यामुळे Foundry होस्टेड एजंट्स वापरलेल्या समान प्रोटोकॉलवर कार्य होते.

**1. होस्टिंग एक्स्ट्रा इन्स्टॉल करा:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` एक्स्ट्रा Foundry प्रोटोकॉल लायब्ररीज इन्स्टॉल करतो: `azure-ai-agentserver-responses` (OpenAI-सुसंगत `/responses` एण्डपॉइंट) आणि `azure-ai-agentserver-invocations` (सामान्य `/invocations` एण्डपॉइंट).

**2. होस्टिंग प्रोटोकॉल निवडा:**

| प्रोटोकॉल | होस्ट क्लास | एण्डपॉइंट | उपयोग केव्हा |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | आपण OpenAI-सुसंगत चॅट, स्ट्रीमिंग, प्रतिसाद इतिहास आणि संभाषण थ्रेडिंग इच्छित असल्यास — संभाषण एजंटसाठी शिफारस केलेला डीफॉल्ट. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | आपल्याला कस्टम JSON आकृती, वेबहुक-स्टाइल एण्डपॉइंट, किंवा नॉन-कॉनवर्सेशनल प्रक्रिया हवी असल्यास. |

कारण **Responses API Foundry मध्ये एजंट-शैली विकासासाठी प्रमुख API आहे**, बहुतेक एजंटसाठी `ResponsesHostServer` वापरून सुरू करा.

**3. पर्यावरण चल (environment variables) कॉन्फिगर करा** (`az login` आधी करा जेणेकरून `DefaultAzureCredential` प्रमाणीकरण करू शकेल):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

जेव्हा एजंट नंतर Foundry मध्ये होस्टेड एजंट म्हणून चालेल, तेव्हा प्लॅटफॉर्म `FOUNDRY_PROJECT_ENDPOINT` स्वयंचलितपणे इंजेक्ट करतो.

**4. Responses प्रोटोकॉलवर LangGraph एजंट उघडा:**

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

    # ChatOpenAI येथे Foundry प्रोजेक्टच्या OpenAI-सुसंगत (Responses) एंडपॉइंटसाठी लक्ष्य करतो.
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

स्थानिकपणे `python main.py` ने चालवा, नंतर `http://localhost:8088/responses` येथे Responses विनंती पाठवा.

**मुख्य वर्तन:**

- **संभाषणे**: क्लायंट `previous_response_id` किंवा `conversation` आयडी देऊन संभाषण चालू ठेवतात. जर आपला ग्राफ LangGraph चेकपॉइंटरसह संकलित असेल, तर Foundry संभाषण स्थिती चेकपॉइंटशी जोडते (उत्पादनासाठी टिकाऊ चेकपॉइंटर वापरा; स्थानिक चाचणीसाठी `MemorySaver` चालेल).  
- **ह्युमन-इन-द-लूप**: जर आपला ग्राफ LangGraph `interrupt()` वापरत असेल, तर `ResponsesHostServer` प्रलंबित इंटरप्शनला Responses `function_call` / `mcp_approval_request` वस्तू म्हणून समोर आणतो, आणि क्लायंट जुळणाऱ्या `function_call_output` / `mcp_approval_response` सोबत पुन्हा सुरू करतात.  
- **Foundry मध्ये तैनात करा**: Azure Developer CLI वापरा — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (स्थानिक, Docker आवश्यक), नंतर `azd provision` आणि `azd deploy`. होस्टेड एजंट डिप्लॉयमेंटसाठी **Foundry Project Manager** भूमिका आवश्यक आहे.  

या उदाहरणाचा चालणारा आवृत्ती [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) येथे आहे. पूर्ण वॉकथ्रू (Invocations प्रोटोकॉल, कस्टम विनंती स्कीम, आणि ट्रबलशूटिंग) साठी पाहा [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## कोड नमुने  

Microsoft Agent Framework साठी कोड नमुने या रेपॉजिटरीमध्ये `xx-python-agent-framework` आणि `xx-dotnet-agent-framework` फाइल्स अंतर्गत सापडतील.

## Microsoft Agent Framework विषयी अजून प्रश्न आहेत का?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) मध्ये सामील व्हा जेथे आपण इतर शिकणाऱ्यांना भेटू शकता, ऑफिस अवर्सस उपस्थित राहू शकता आणि आपले AI एजंट प्रश्न विचारू शकता.
## मागील धडा

[AI एजंटसाठी मेमरी](../13-agent-memory/README.md)

## पुढील धडा

[कंप्युटर वापर एजंट तयार करणे (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->