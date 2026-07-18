# ការសង្កេតមើល Microsoft Agent Framework

![Agent Framework](../../../translated_images/km/lesson-14-thumbnail.90df0065b9d234ee.webp)

### ការណែនាំ

មេរៀននេះនឹងសម្ពោធ៖

- ការយល់ដឹងពី Microsoft Agent Framework៖ លក្ខណៈសំខាន់ និងតម្លៃ  
- ការស្រាវជ្រាវយ៉ាងកំរិតល្អនៃគំនិតសំខាន់របស់ Microsoft Agent Framework
- គំរូ MAF ប៉ាន់ស្មានខ្ពស់៖ ការងារ, មធ្យោបាយ, និងចងចាំ

## គោលដៅការសិក្សា

បន្ទាប់ពីបញ្ចប់មេរៀននេះ អ្នកនឹងដឹងរបៀប៖

- បង្កើតភ្នាក់ងារប្រើប្រាស់ AI ដែលមានភាពរួសរាយនៅក្នុងផលិតផល ដោយប្រើ Microsoft Agent Framework
- អនុវត្តលក្ខណៈសំខាន់នៃ Microsoft Agent Framework ទៅករណីប្រើប្រាស់ Agentic របស់អ្នក
- ប្រើគំរូកំរិតខ្ពស់រួមមាន ការងារ, មធ្យោបាយ, និងមើលថែរក្សា

## ឧទាហរណ៍កូដ 

ឧទាហរណ៍កូដសម្រាប់ [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) អាចរកឃើញនៅក្នុងឃ្លាំងកូដនេះក្រោមឯកសារ `xx-python-agent-framework` និង `xx-dotnet-agent-framework` ។

## ការយល់ដឹង Microsoft Agent Framework

![Framework Intro](../../../translated_images/km/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) គឺជាសំណង់រួមរបស់ Microsoft សម្រាប់បង្កើតភ្នាក់ងារ AI ។ វាប្រើអោយមានភាពបត់បែនដើម្បីដោះស្រាយករណីប្រើប្រាស់ agentic ផ្សេងៗគ្នាពីការផលិត និងការស្រាវជ្រាវ សូម្បីមាន៖

- **ក្របខណ្ឌភ្នាក់ងារតាមលំដាប់ជួរ** នៅក្នុងស្ថានការណ៍ដែលត្រូវការការងារជាលំដាប់ជំហាន។
- **ការតម្រង់ចរចារួមគ្នា** នៅក្នុងស្ថានការណ៍ដែលភ្នាក់ងារត្រូវបញ្ចប់ការងារដោយផ្ទាល់ខ្លួនក្នុងពេលតែមួយ។
- **ការតម្រង់វេទិកាក្រុម** នៅក្នុងស្ថានការណ៍ដែលភ្នាក់ងារអាចសហការគ្នាលើការងារមួយ។
- **ការផ្ទេរនៅពេលការងារ** នៅក្នុងស្ថានការណ៍ដែលភ្នាក់ងារផ្ទេរការងារជូនគ្នាដោយសម្រេចការងារតូចៗ។ 
- **ការតម្រង់ម៉ាញេទិច** នៅក្នុងស្ថានការណ៍ដែលភ្នាក់ងារគ្រប់គ្រងបង្កើត និងកែប្រែបញ្ជីកិច្ចការនិងសម្របសម្រួលរវាងភ្នាក់ងារទាំងក្នុងដើម្បីបញ្ចប់ការងារ។ 

ដើម្បីផ្តល់នូវភ្នាក់ងារ AI ក្នុងផលិតផល MAF ក៏មានលក្ខណៈសំខាន់សម្រាប់៖

- **ការមើលថែរក្សា** វិញ្ញាណតាមរយៈ OpenTelemetry ដែលរៀបរាប់រាល់សកម្មភាពរបស់ភ្នាក់ងារ AI រួមមានការហៅឧបករណ៍, ជំហានការតម្រង់, ហូរទឹកចិត្ដនិងការត្រួតពិនិត្យកម្រិតការសម្របសម្រួលតាមផ្ទាំង Microsoft Foundry ។
- **សន្តិសុខ** ដោយផ្ទុកភ្នាក់ងារលើ Microsoft Foundry ដោយផ្ទាល់ដែលរួមមានការត្រួតពិនិត្យសន្តិសុខដូចជា ការចូលប្រើផ្អែកលើតួនាទី, ការដោះស្រាយទិន្នន័យឯកជន និងសុវត្ថិភាពមាតិកាដែលបង្កើតក្នុង។
- **ភាពរឹងមាំ** ដោយខ្សែភ្នាក់ងារ និងវេទិកាការងារអាចឈប់បន្ត បន្តបើក និងស្ដារឡើងវិញពីកំហុសដែលធ្វើអោយដំណើរការរយះពេលវែង។
- **ការគ្រប់គ្រង** ដូចជាវេទិកាដែលមានមនុស្សរួមចូលរួមមានការគាំទ្រដោយដាក់សញ្ញាទុកថាការងារមានការអនុម័តពីមនុស្ស។

Microsoft Agent Framework ក៏ ផ្ដោតសំខាន់លើភាពអាចធ្វើការសហប្រតិបត្តិបាន ដោយ៖

- **ការមិនជាប់គ្នានៅលើពពក** - ភ្នាក់ងារអាចដំណើរការនៅក្នុងកុងតឺន័រ, នៅក្នុងស្ថានីយនិងលើពពកផ្សេងៗជាច្រើន។
- **មិនជាប់គ្នានៅលើអ្នកផ្តល់សេវា** - ភ្នាក់ងារអាចត្រូវបានបង្កើតតាម SDK ដែលអ្នកចូលចិត្ត រួមមាន Azure OpenAI និង OpenAI
- **ការរួមបញ្ចូលស្តង់ដារបើក** - ភ្នាក់ងារអាចប្រើប្រាស់បណ្ដាញមធ្យោបាយដូចជា Agent-to-Agent(A2A) និង Model Context Protocol (MCP) ដើម្បីរកឃើញនិងប្រើប្រាស់ភ្នាក់ងារនិងឧបករណ៍ផ្សេងៗ។
- **គ្រឿងបន្ថែម និង កំព្យូទ័រ** - ការតភ្ជាប់អាចត្រូវបានធ្វើទៅកាន់សេវាកម្មទិន្នន័យ និងចងចាំដូចជា Microsoft Fabric, SharePoint, Pinecone និង Qdrant។

យើងមកមើលរបៀបដែលលក្ខណៈសំខាន់ៗទាំងនេះត្រូវបានអនុវត្តទៅកាន់គំនិតសំខាន់ៗរបស់ Microsoft Agent Framework។

## គំនិតសំខាន់របស់ Microsoft Agent Framework

### ភ្នាក់ងារ

![Agent Framework](../../../translated_images/km/agent-components.410a06daf87b4fef.webp)

**ការបង្កើតភ្នាក់ងារ**

ការបង្កើតភ្នាក់ងារត្រូវបានធ្វើដោយកំណត់សេវាសន្មត (LLM Provider), ការណែនាំសម្រាប់ភ្នាក់ងារ AI ឲ្យអនុវត្តន៍ និង `name` ដែលបានផ្ដល់៖


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

ខាងលើកំពុងប្រើ `Azure OpenAI` ប៉ុន្តែភ្នាក់ងារអាចត្រូវបានបង្កើតដោយប្រើសេវាជាច្រើន រួមមាន `Microsoft Foundry Agent Service`៖

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ឬ [MiniMax](https://platform.minimaxi.com/), ដែលផ្ដល់ API សមស្របនឹង OpenAI ដោយមានបង្អួចពហុបរិបទធំ (ដល់ 204K តូច)៖

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ឬភ្នាក់ងារចម្រុះដោយប្រើប្រព័ន្ធផ្សព្វផ្សាយ A2A៖

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**រត់ភ្នាក់ងារ**

ភ្នាក់ងារត្រូវបានរត់ដោយប្រើវិធី `.run` ឬ `.run_stream` សម្រាប់ការឆ្លើយតបទាំងមិនស្ទ្រីម និងស្ទ្រីម។

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

ការរត់ភ្នាក់ងារនីមួយៗអាចមានជម្រើសដើម្បីប្ដូរប៉ារាម៉ែត្រ ដូចជា `max_tokens` ដែលភ្នាក់ងារប្រើ, `tools` ដែលភ្នាក់ងារអាចហៅបាន និងទំលាក់ `model` ដែលបានប្រើសម្រាប់ភ្នាក់ងារ។

នេះមានប្រយោជន៍ក្នុងករណីដែលត្រូវការគំរូឬឧបករណ៍ជាក់លាក់ដើម្បីបញ្ចប់ការងាររបស់អ្នកប្រើ។

**ឧបករណ៍**

ឧបករណ៍អាចកំណត់បានទាំងពេលកំណត់ភ្នាក់ងារ៖

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# ពេលបង្កើត ChatAgent ដោយផ្ទាល់

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

និងពេលដំណើរការ​ភ្នាក់ងារ៖

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # ឧបករណ៍ផ្តល់ជូនសម្រាប់ការរត់នេះតែប៉ុណ្ណោះ )
```

**ខ្សែភ្នាក់ងារ**

ខ្សែភ្នាក់ងារត្រូវបានប្រើដើម្បីគ្រប់គ្រងការសន្ទនាច្រើនជំនាន់។ ខ្សែអាចត្រូវបានបង្កើតដោយ:

- ប្រើ `get_new_thread()` ដែលអនុញ្ញាតឱ្យខ្សែត្រូវបានរក្សាទុកជាយូរពេល
- បង្កើតខ្សែដោយស្វ័យប្រវត្តិពេលរត់ភ្នាក់ងារនិងខ្សែមួយមានរយៈពេលកាលបរិច្ឆេទសម្រាប់រត់បច្ចុប្បន្នតែប៉ុណ្ណោះ។

ដើម្បីបង្កើតខ្សែ កូដមានរូបរាងដូចខាងក្រោម៖

```python
# បង្កើតខ្សែថ្មីមួយ។
thread = agent.get_new_thread() # បើកប្រតិបត្តិការយ៉ាតជាមួយខ្សែ។
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

អ្នកអាចស៊េរីអេឡិចឡើងខ្សែដើម្បីរក្សាទុកសម្រាប់ប្រើប្រាស់ក្រោយ៖

```python
# បង្កើតថ្រែកថ្មី។
thread = agent.get_new_thread() 

# ប្រតិបត្តិភ័ណ្ឌជាមួយថ្រែក។

response = await agent.run("Hello, how are you?", thread=thread) 

# ស៊េរីអាចថ្មីថ្រែកសម្រាប់ការផ្ទុក។

serialized_thread = await thread.serialize() 

# ពិនិត្យស្ថានភាពថ្រែកបន្ទាប់ពីផ្ទុកពីការផ្ទុក។

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**មធ្យោបាយភ្នាក់ងារ**

ភ្នាក់ងារចូលប្រតិបត្តិការជាមួយឧបករណ៍ និង LLMs ដើម្បីបញ្ចប់កិច្ចការ។ នៅក្នុងស្ថានការណ៍ជាក់លាក់ យើងចង់អនុវត្ត ឬតាមដានក្នុងចន្លោះការប្រតិបត្តិការទាំងនេះ។ មធ្យោបាយភ្នាក់ងារអនុញ្ញាតឱ្យធ្វើដូចនេះតាមរយៈ៖

*មធ្យោបាយមុខងារ*

មធ្យោបាយនេះអនុញ្ញាតឱ្យយើងអនុវត្តសកម្មភាពនៅចន្លោះភ្នាក់ងារ និងមុខងារ / ឧបករណ៍ ដែលវាហៅ។ ឧទាហរណ៍មួយនៃការប្រើប្រាស់នេះ គឺពេលអ្នកចង់កត់ត្រាការហៅមុខងារ។

ក្នុងកូដខាងក្រោម `next` កំណត់ថា តើមធ្យោបាយបន្ទាប់ ឬមុខងារពិតប្រាកដត្រូវត្រូវបានហៅ។

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # ការប្រមូលមុន: កត់ត្រាកំណត់ហេតុមុនការប្រតិបត្ដិការមុខងារ
    print(f"[Function] Calling {context.function.name}")

    # បន្តទៅមួយកម្រិតមេឌីយ៉រឬការប្រតិបត្ដិការមុខងារបន្ទាប់
    await next(context)

    # ការប្រមូលបន្ទាប់: កត់ត្រាកំណត់ហេតុបន្ទាប់ពីការប្រតិបត្ដិការមុខងារ
    print(f"[Function] {context.function.name} completed")
```

*មធ្យោបាយការសន្ទនា*

មធ្យោបាយនេះអនុញ្ញាតឱ្យអនុវត្ត ឬកត់ត្រាសកម្មភាព ឆ្លើយតបទៅវិញរវាងភ្នាក់ងារ និងការស្នើសុំរវាង LLM ។

វាមានព័ត៌មានសំខាន់ដូចជា `messages` បានផ្ញើទៅសេវាកម្ម AI ។

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # ដំណើរការមុន: កត់ត្រាមុនការហៅ AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # បន្តទៅមេឌីយ៉ারខាងក្រោម ឬសេវា AI
    await next(context)

    # ដំណើរការបន្ទាប់: កត់ត្រា បន្ទាប់ពីទទួលបានចម្លើយពី AI
    print("[Chat] AI response received")

```

**ចងចាំភ្នាក់ងារ**

ដូចដែលបានរៀបរាប់នៅក្នុងមេរៀន `Agentic Memory` ចងចាំជាធាតុសំខាន់ក្នុងការអនុញ្ញាតឱ្យភ្នាក់ងារជួបប្រទៈនឹងបរិបទផ្សេងៗគ្នា។ MAF មានចងចាំមួយចំនួនផ្សេងៗគ្នា៖

*ការផ្ទុកក្នុងចងចាំ*

នេះគឺជាចងចាំដែលបានរក្សាទុកក្នុងខ្សែភ្នាក់ងារពេលបំពេញកម្មវិធី។

```python
# បង្កើតខ្សែបន្ទាត់ថ្មី។
thread = agent.get_new_thread() # ប្រតិបត្តិភ្នាក់ងារជាមួយខ្សែបន្ទាត់។
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*សាររឹងមាំ*

ចងចាំនេះត្រូវបានប្រើនៅពេលរក្សាប្រវត្តិសន្ទនាទៅលើវគ្គដាច់ខាតផ្សេងៗគ្នា។ វាត្រូវបានកំណត់ដោយប្រើ `chat_message_store_factory`៖

```python
from agent_framework import ChatMessageStore

# បង្កើតស្តុកសារបិទបញ្ជាក់ផ្ទាល់ខ្លួន
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*ចងចាំដំណើរការផ្លាស់ប្ដូរ*

ចងចាំនេះត្រូវបានបញ្ចូលទុកជាបរិបទមុនពេលភ្នាក់ងារដំណើរការ។ ចងចាំទាំងនេះអាចរក្សាទុកក្នុងសេវាបណ្ដាញក្រៅដូចជា mem0៖

```python
from agent_framework.mem0 import Mem0Provider

# ការប្រើប្រាស់ Mem0 សម្រាប់សមត្ថភាពសម្ថភាពសេវាតាមជាន់ខ្ពស់
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

**ការមើលថែរក្សាភ្នាក់ងារ**

ការមើលថែរក្សាជារឿងសំខាន់ក្នុងការបង្កើតប្រព័ន្ធ agentic ដែលអាចទុកចិត្ត និងថែរក្សា។ MAF រួមបញ្ចូលជាមួយ OpenTelemetry ដើម្បីផ្តល់ការតាមដាន និងម៉ែត្រសម្រាប់ការមើលថែរក្សាដែលល្អជាង។ 

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # ធ្វើអ្វីមួយ
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### ការងារ

MAF ផ្តល់ការងារ ដែលជាជំហានដែលបានកំណត់រួចសម្រាប់បញ្ចប់កិច្ចការ និងរួមបញ្ចូលភ្នាក់ងារ AI ជា គ្រឿងផ្សំក្នុងជំហានទាំងនោះ។

ការងារត្រូវបានបង្កើតពីគ្រឿងផ្សំនានា ដែលអនុញ្ញាតឱ្យមានការគ្រប់គ្រងល្អប្រសើរឡើងលើចរន្តការងារ។ ការងារផងដែរ អនុញ្ញាតឱ្យមាន **ការតម្រង់ភ្នាក់ងារច្រើន** និង **ការបញ្ចូលចំណុចត្រួតពិនិត្យ** ដើម្បីរក្សាសភាពការណ៍នៃការងារ។

គ្រឿងផ្សំសំខាន់នៃការងារគឺ៖

**អ្នកអនុវត្ត**

អ្នកអនុវត្តទទួលសារ នាំមុខការងារ ហើយបង្កើតសារចេញ។ នេះជាដំណើរការជំនួយក្នុងការបញ្ចប់ការងារធំ។ អ្នកអនុវត្តអាចជាភ្នាក់ងារ AI ឬតុល្យភាពតុល្យនិរោធ។

**សម្ងាត់**

សម្ងាត់ត្រូវបានប្រើដើម្បីកំណត់ចរន្តសារនៅក្នុងការងារ។ វាអាច:

*សម្ងាត់ផ្ទាល់* - ការតភ្ជាប់មួយទៅមួយរវាងអ្នកអនុវត្ត៖

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*សម្ងាត់មានលក្ខខណ្ឌ* - ត្រូវបានបើកចំហក្រោយពីលទ្ធផលលក្ខខណ្ឌ។ ឧទាហរណ៍ ពេលបន្ទប់សណ្ឋាគារជាសាកល្បងអត់មាន អ្នកអនុវត្តអាចផ្តល់ជំរើសផ្សេងៗ។

*សម្ងាត់ប្ដូរតាមករណី* - បញ្ជូនសារទៅអ្នកអនុវត្តផ្សេងៗផ្អែកលើលក្ខខណ្ឌកំណត់។ ឧទាហរណ៍ ប្រសិនបើអតិថិជនធ្វើដំណើរមានអាទិភាព និងកិច្ចការរបស់ពួកគេទទួលបានការដំណើរការរយៈការងារផ្សេងទៀត។

*សម្ងាត់ចេញច្រើន* - ផ្ញើសារមួយទៅគោលដៅជាច្រើន។

*សម្ងាត់ចូលបណ្តោយ* - ប្រមូលសារជាច្រើនពីអ្នកអនុវត្តផ្សេងៗ ហើយផ្ញើទៅគោលដៅមួយ។

**ព្រឹត្តិការណ៍**

ដើម្បីផ្តល់ការមើលថែរក្សាល្អនៅក្នុងការងារ MAF ផ្ដល់ព្រឹត្តិការណ៍បញ្ចូលសម្រាប់ការប្រតិបត្តិរួមមាន៖

- `WorkflowStartedEvent`  - ការប្រតិបត្តិការការងារចាប់ផ្តើម
- `WorkflowOutputEvent` - ការងារផលិតលទ្ធផល
- `WorkflowErrorEvent` - ការងារបានប្រទះកំហុស
- `ExecutorInvokeEvent`  - អ្នកអនុវត្តចាប់ផ្តើមដំណើរការ
- `ExecutorCompleteEvent`  - អ្នកអនុវត្តបញ្ចប់ដំណើរការ
- `RequestInfoEvent` - ការស្នើសុំត្រូវបញ្ចូន

## គំរូ MAF ខ្ពស់

ផ្នែកខាងលើគ្របដណ្តប់គំនិតសំខាន់របស់ Microsoft Agent Framework។ ខណៈដែលអ្នកបង្កើតភ្នាក់ងារលំខាន់ជាងនេះនេះ នេះជាគំរូខ្ពស់ដែលគួរពិចារណា៖

- **ការតភ្ជាប់មធ្យោបាយ**៖ តភ្ជាប់អ្នកចាប់ផ្តើមមធ្យោបាយច្រើន (កំណត់ឡើង, អត្តសញ្ញាណ, កំណត់កម្រិត) ដោយប្រើ មធ្យោបាយមុខងារ និងការសន្ទនា សម្រាប់ការគ្រប់គ្រងល្អលើអាកប្បកិរិយាភ្នាក់ងារ។
- **ការបញ្ចូលចំណុចត្រួតពិនិត្យនៅក្នុងការងារ**៖ ប្រើព្រឹត្តិការណ៍ការងារ និងក្រឡុកស៊េរី ដើម្បីរក្សា និងបន្តដំណើរការភ្នាក់ងារលើរយៈពេលវែង។
- **ជ្រើសរើសឧបករណ៍ផ្លាស់ប្ដូរ**៖ ផ្សំ RAG លើការពិពណ៌នាឧបករណ៍ ជាមួយការចុះឈ្មោះឧបករណ៍របស់ MAF ដើម្បីបង្ហាញឧបករណ៍ពាក់ព័ន្ធតែប៉ុណ្ណោះក្នុងចំងល់។
- **ការផ្ទេរភ្នាក់ងារច្រើន**៖ ប្រើសម្ងាត់ការងារ និងការបង្រ្កាបលក្ខខណ្ឌ ដើម្បីតម្រង់ការផ្ទេរវិញរវាងភ្នាក់ងារបច្ចេកទេស។

## បម្រុងភ្នាក់ងារ LangChain / LangGraph នៅលើ Microsoft Foundry

Microsoft Agent Framework គឺ **អាចធ្វើសហប្រតិបត្តិបានជាមួយសំណង់ផ្សេងៗ** — អ្នកមិនចាំបាច់ត្រូវភ្ជាប់តែជាមួយភ្នាក់ងារ សរសេរដោយ MAFទេ។ ប្រសិនបើអ្នកមានភ្នាក់ងារបង្កើតជាមុនជាមួយ **LangChain** ឬ **LangGraph** អ្នកអាចរត់វាជា **ភ្នាក់ងារផ្តល់សេវាផ្ទុកក្នុង Microsoft Foundry** ដើម្បីណែនាំឲ្យ Foundry គ្រប់គ្រង runtime, សម័យ, កម្រិត, អត្តសញ្ញាណ និងចំណុចចេញចូលប្រព័ន្ធសម្រាប់អ្នក ខណៈដែលយុទ្ធសាស្ត្រភ្នាក់ងាររបស់អ្នកនៅនៅក្នុង LangGraph។

នេះធ្វើបានដោយប្រើកញ្ចប់ `langchain_azure_ai.agents.hosting` ដែលបង្ហាញខ្សែក្រវាត់ LangGraph តាមប្រព័ន្ធផ្សព្វផ្សាយដូចគ្នាដែលភ្នាក់ងារផ្ទុកដោយ Foundry ប្រើ។

**1. ដំឡើងមុខងារ hosting extra៖**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

មុខងារ `hosting` នេះដំឡើងបណ្ណាល័យ Foundry protocol៖ `azure-ai-agentserver-responses` (ចំណុចចេញឆ្លើយតប /responses ដែលសមស្រប OpenAI) និង `azure-ai-agentserver-invocations` (ចំណុចចេញបញ្ចូល /invocations ទូទៅ)។

**2. ជ្រើសរើសប្រព័ន្ធផ្សព្វផ្សាយសម្រាប់ hosting៖**

| ប្រព័ន្ធផ្សព្វផ្សាយ | ខ្លឹមសារសម្រាប់ម៉ាស៊ីនម៉ាស៊ីន | ចំណុចចេញចូល | ប្រើពេលណា |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | ចង់បានការសន្ទនាផ្ទាល់មុខ OpenAI, ស្ទ្រីម, ប្រវត្តិចម្លើយ និងខ្សែសន្ទនា — ជាជម្រើសផ្ដល់អនុសាសន៍សម្រាប់ភ្នាក់ងារសន្ទនា។ |
| **Invocations** | `InvocationsHostServer` | `/invocations` | ត្រូវការរូបរាង JSON បុគ្គលិក, ចំណុចចេញស្ទាយ webhook ឬដំណើរការមិនមែនសន្ទនា។ |

ពីព្រោះ **Responses API គឺជាអ្នកចម្បងសម្រាប់ការបង្កើតភ្នាក់ងារបែប agent នៅ Foundry** សូមចាប់ផ្តើមជាមួយ `ResponsesHostServer` សម្រាប់ភ្នាក់ងារច្រើនភាគី។

**3. កំណត់អថេរ​បរិស្ថាន** (`az login` ជាមុនដូច្នេះ `DefaultAzureCredential` អាចផ្ទៀងផ្ទាត់បាន)៖

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

ពេលភ្នាក់ងាររត់ជាភ្នាក់ងារផ្ទុកក្នុង Foundry, វេទិកានឹងបញ្ចូលអត្តសញ្ញាណ `FOUNDRY_PROJECT_ENDPOINT` ដោយស្វ័យប្រវត្តិ។

**4. បង្ហាញភ្នាក់ងារ LangGraph តាមប្រព័ន្ធ Responses៖**

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

    # ChatOpenAI នៅទីនេះមានគោលបំណងទៅកាន់ចំណុចបញ្ចប់ Resposes ដែលគាំទ្រ OpenAI របស់គម្រោង Foundry។
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

រត់វាតាមក្រោយជាមួយ `python main.py` បន្ទាប់បញ្ជូនការស្នើសុំ Responses ទៅកាន់ `http://localhost:8088/responses` ។

**អាកប្បកិរិយាសំខាន់ៗ៖**

- **សន្ទនា**៖ អតិថិជនបន្តសន្ទនា ដោយផ្ញើ `previous_response_id` ឬ ID សន្ទនា។ ប្រសិនបើក្រาฟរបស់អ្នកបានបញ្ចូល checkpointer LangGraph, Foundry នឹងរក្សាស្ថានភាពសន្ទនាទៅចំណុចត្រួតពិនិត្យ (ប្រើ durable checkpointer នៅក្នុងផលិតផល; `MemorySaver` គឺល្អសម្រាប់តេស្តក្នុងមូលដ្ឋាន)។
- **មនុស្សបញ្ចូលក្នុងដំណើរ**៖ ប្រសិនបើក្រាហ្វរបស់អ្នកប្រើ LangGraph `interrupt()`, `ResponsesHostServer` នឹងបង្ហាញការជម្រះដែលនៅសល់ជាជម្រើស `function_call` / `mcp_approval_request`, ហើយអតិថិជននឹងបន្តជាមួយ `function_call_output` / `mcp_approval_response` ត្រូវគ្នា។
- **ផ្សព្វផ្សាយទៅ Foundry**៖ ប្រើ Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (ក្នុងតំបន់, តម្រូវឲ្យមាន Docker), បន្ទាប់ `azd provision` និង `azd deploy`។ ការផ្សព្វផ្សាយភ្នាក់ងារផ្ទុកចាំបាច់ត្រូវការតួនាទី **Foundry Project Manager**។

កំណត់រចនាសម្ព័ន្ធដែលអាចរត់បាននៃឧទាហរណ៍នេះរស់នៅ [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)។ សម្រាប់ការដំណើរការពេញលេញ (ប្រព័ន្ធ Invocations, ទម្រង់សំណើបុគ្គល និងការដោះស្រាយបញ្ហា) សូមមើល [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)។

## ឧទាហរណ៍កូដ 

ឧទាហរណ៍កូដសម្រាប់ Microsoft Agent Framework អាចរកបានក្នុងឃ្លាំងនេះក្រោមឯកសារ `xx-python-agent-framework` និង `xx-dotnet-agent-framework` ។

## មានសំនួរបន្ថែមអំពី Microsoft Agent Framework?

ចូលរួមក្នុង [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) ដើម្បីជួបជាមួយអ្នករៀនផ្សេងទៀត ចូលរួមវេទិកាអុីស៊ីនិងទទួលបានចម្លើយសម្រាប់សំនួរអំពីភ្នាក់ងារ AI របស់អ្នក។
## មេរៀនមុន

[ចងចាំសម្រាប់ភ្នាក់ងារ AI](../13-agent-memory/README.md)

## មេរៀនបន្ទាប់

[ការបង្កើតភ្នាក់ងារប្រើកុំព្យូទ័រ (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->