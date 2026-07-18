# মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক অন্বেষণ

![Agent Framework](../../../translated_images/bn/lesson-14-thumbnail.90df0065b9d234ee.webp)

### পরিচিতি

এই পাঠে যা অন্তর্ভুক্ত থাকবে:

- মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক বোঝা: মূল বৈশিষ্ট্য এবং মূল্য  
- মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের মূল ধারণাগুলো অন্বেষণ
- উন্নত MAF প্যাটার্ন: ওয়ার্কফ্লো, মিডলওয়্যার এবং মেমোরি

## শেখার লক্ষ্যসমূহ

এই পাঠ সম্পন্ন করার পর, আপনি জানতে পারবেন কিভাবে:

- মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক ব্যবহার করে প্রোডাকশন রেডি AI এজেন্ট তৈরি করবেন
- মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের মূল বৈশিষ্ট্যগুলো আপনার এজেন্টিক ব্যবহারের ক্ষেত্রে প্রয়োগ করবেন
- উন্নত প্যাটার্নগুলি ব্যবহার করবেন যেমন ওয়ার্কফ্লো, মিডলওয়্যার এবং পর্যবেক্ষণশীলতা

## কোড নমুনা

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) এর জন্য কোড নমুনাগুলো এই রিপোজিটরির `xx-python-agent-framework` এবং `xx-dotnet-agent-framework` ফাইলগুলোতে পাওয়া যাবে।

## মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক বোঝা

![Framework Intro](../../../translated_images/bn/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) হলো মাইক্রোসফটের একক ফ্রেমওয়ার্ক যা AI এজেন্ট তৈরি করার জন্য ব্যবহৃত হয়। এটি প্রোডাকশন এবং গবেষণা পরিবেশে পাওয়া বিভিন্ন এজেন্টিক ব্যবহারের ক্ষেত্রে নমনীয়তা প্রদান করে, যেমন:

- **ক্রমিক এজেন্ট অর্কেস্ট্রেশন** যেখানে ধাপে ধাপে ওয়ার্কফ্লো প্রয়োজন হয়।
- **একযোগে অর্কেস্ট্রেশন** যেখানে এজেন্টগুলো একই সময়ে কাজ সম্পন্ন করতে হবে।
- **গ্রুপ চ্যাট অর্কেস্ট্রেশন** যেখানে একাধিক এজেন্ট একসাথে একক কাজে সহযোগিতা করতে পারে।
- **হ্যান্ডঅফ অর্কেস্ট্রেশন** যেখানে এজেন্টরা সাবটাস্কগুলো শেষ হওয়ার সাথে সাথে কাজ অন্য এজেন্টের কাছে হস্তান্তর করে।
- **ম্যাগনেটিক অর্কেস্ট্রেশন** যেখানে একজন ম্যানেজার এজেন্ট টাস্ক লিস্ট তৈরি ও পরিবর্তন করে এবং সাবএজেন্টদের সমন্বয় করে কাজ সম্পন্ন করায়।

প্রোডাকশনে AI এজেন্ট সরবরাহ করার জন্য, MAF এ আরো বৈশিষ্ট্য অন্তর্ভুক্ত আছে:

- **পর্যবেক্ষণশীলতা** OpenTelemetry ব্যবহার করে যেখানে AI এজেন্টের প্রতিটি ক্রিয়া, টুল আহ্বান, অর্কেস্ট্রেশন ধাপ, যুক্তি প্রবাহ এবং Microsoft Foundry ড্যাশবোর্ডের মাধ্যমে পারফরম্যান্স মনিটর করা হয়।
- **নিরাপত্তা** Microsoft Foundry তে নেটিভভাবে এজেন্ট হোস্ট করে, যেখানে নিরাপত্তা নিয়ন্ত্রণ যেমন ভূমিকা-ভিত্তিক অ্যাক্সেস, ব্যক্তিগত ডেটা পরিচালনা এবং নির্মিত কন্টেন্ট সুরক্ষা থাকে।
- **স্থায়িত্ব** এজেন্ট থ্রেড এবং ওয়ার্কফ্লো থেকে বিরতি নিয়ে পুনরায় শুরু এবং ত্রুটি থেকে পুনরুদ্ধার করতে পারে, যা দীর্ঘমেয়াদী প্রক্রিয়া চালানো সম্ভব করে তোলে।
- **নিয়ন্ত্রণ** যেখানে মানব অনুমোদনের প্রয়োজনীয়তার জন্য হিউম্যান ইন দ্য লুপ ওয়ার্কফ্লো সমর্থিত।

মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক আন্তঃপরিচালনাযোগ্য হওয়ার প্রতি গুরুত্ব দেয়, যেমন:

- **ক্লাউড-অ্যাগনস্টিক** - এজেন্টগুলো কন্টেইনার, অন-প্রিম এবং নানা ক্লাউডে চালানো যায়।
- **প্রোভাইডার-অ্যাগনস্টিক** - পছন্দসই SDK ব্যবহার করে এজেন্ট তৈরি করা যায়, যেমন Azure OpenAI এবং OpenAI।
- **ওপেন স্ট্যান্ডার্ড ইনটেগ্রেশন** - Agent-to-Agent(A2A) এবং Model Context Protocol (MCP) এর মতো প্রোটোকল ব্যবহার করে অন্যান্য এজেন্ট এবং টুল খুঁজে পেতে এবং ব্যবহার করতে পারে।
- **প্লাগইন এবং কানেক্টর** - Microsoft Fabric, SharePoint, Pinecone এবং Qdrant এর মতো ডেটা ও মেমোরি সেবা সংযোগ করা যায়।

চলুন দেখি কিভাবে এই বৈশিষ্ট্যগুলো মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের মূল ধারণাগুলোর সাথে যুক্ত হয়।

## মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের মূল ধারণাসমূহ

### এজেন্টসমূহ

![Agent Framework](../../../translated_images/bn/agent-components.410a06daf87b4fef.webp)

**এজেন্ট তৈরি করা**

এজেন্ট তৈরি করার জন্য ইনফারেন্স সার্ভিস (LLM প্রদানকারী), AI এজেন্টের জন্য নির্দেশনার একটি সেট, এবং একটি নির্ধারিত `name` সংজ্ঞায়িত করতে হয়:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

উপরোক্ত কোডে `Azure OpenAI` ব্যবহার করা হয়েছে, তবে এজেন্ট তৈরি করা যায় বিভিন্ন সেবা ব্যবহার করে, যেমন `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API গুলো

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

অথবা [MiniMax](https://platform.minimaxi.com/), যা OpenAI-সামঞ্জস্যপূর্ণ API প্রদান করে বড় প্রসঙ্গ জানালা (সর্বোচ্চ 204K টোকেন পর্যন্ত):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

অথবা A2A প্রোটোকল ব্যবহার করে দূরবর্তী এজেন্ট:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**এজেন্ট চালানো**

এজেন্টগুলো `.run` অথবা `.run_stream` পদ্ধতি ব্যবহার করে চালানো হয়, যথাক্রমে নন-স্ট্রীমিং অথবা স্ট্রীমিং উত্তর জন্য।

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

প্রতি এজেন্ট রান এ অপশনস দিয়ে কাস্টমাইজেশন করা যায়, যেমন `max_tokens` যেটি এজেন্ট ব্যবহার করবে, `tools` যেগুলো এজেন্ট কল করতে পারবে, এবং এমনকি `model` যেটি এজেন্টের জন্য ব্যবহৃত হবে।

এটি বিশেষ একটি কাজে নির্দিষ্ট মডেল বা টুল দরকার হলে উপকারী।

**টুলস**

টুলগুলো ডিফাইন করা যায় এজেন্ট তৈরি করার সময়:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# যখন সরাসরি একটি ChatAgent তৈরি করা হয়

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

এবং এজেন্ট চালানোর সময়ও:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # এই রান-এর জন্য শুধুমাত্র সরঞ্জাম প্রদান করা হয়েছে )
```

**এজেন্ট থ্রেডস**

এজেন্ট থ্রেডস বহুপാഠ কথোপকথন পরিচালনা করতে ব্যবহৃত হয়। থ্রেড তৈরি করা যায়:

- `get_new_thread()` ব্যবহার করে যা থ্রেড সময়ের সাথে সংরক্ষণ সক্ষম করে
- এজেন্ট চালানোর সময় স্বয়ংক্রিয়ভাবে থ্রেড তৈরি করে যা চলমান সেশনের জন্যই থাকে।

থ্রেড তৈরি করার জন্য কোডের কাঠামো হল:

```python
# একটি নতুন থ্রেড তৈরি করুন।
thread = agent.get_new_thread() # থ্রেডের সাথে এজেন্ট চালান।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

পরবর্তীতে থ্রেডটিকে সিরিয়ালাইজ করে সংরক্ষণ করা যায়:

```python
# একটি নতুন থ্রেড তৈরি করুন।
thread = agent.get_new_thread() 

# থ্রেডের সাথে এজেন্ট চালান।

response = await agent.run("Hello, how are you?", thread=thread) 

# সংরক্ষণের জন্য থ্রেড সিরিয়ালাইজ করুন।

serialized_thread = await thread.serialize() 

# সংরক্ষণ থেকে লোড করার পরে থ্রেড অবস্থা ডেসিরিয়ালাইজ করুন।

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**এজেন্ট মিডলওয়্যার**

এজেন্টগুলো টুল এবং LLM এর সাথে কাজ করে ব্যবহারকারীর কাজ শেষ করতে। কিছু ক্ষেত্রে আমরা চাই এই ইন্টারঅ্যাকশনগুলোর মাঝখানে কিছু কার্যকর অথবা অনুবর্তী করা। এজেন্ট মিডলওয়্যার আমাদের এর মাধ্যমে সহায়তা করে:

*ফাংশন মিডলওয়্যার*

এই মিডলওয়্যার এজেন্ট এবং ফাংশন/টুলের মধ্যে একটি কর্ম সম্পাদন করতে দেয়। উদাহরণস্বরূপ ফাংশন কল লগিং কখনো দরকার হতে পারে।

নিচের কোডে `next` সংজ্ঞায়িত করে পরবর্তী মিডলওয়্যার অথবা আসল ফাংশন কল হবে কিনা।

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # প্রি-প্রসেসিং: ফাংশন কার্যকর করার আগে লগ করুন
    print(f"[Function] Calling {context.function.name}")

    # পরবর্তী মিডলওয়্যার বা ফাংশন কার্যকর করার জন্য চালিয়ে যান
    await next(context)

    # পোস্ট-প্রসেসিং: ফাংশন কার্যকর করার পরে লগ করুন
    print(f"[Function] {context.function.name} completed")
```

*চ্যাট মিডলওয়্যার*

এই মিডলওয়্যার এজেন্ট এবং LLM এর অনুরোধের মধ্যে কার্যকর বা লগিং করতে দেয়।

এতে গুরুত্বপূর্ণ তথ্য থাকে যেমন AI সার্ভিসে পাঠানো `messages`।

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # পূর্ব-প্রসেসিং: AI কলের আগে লগ করুন
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # পরবর্তী মধ্যবর্তী অথবা AI সেবায় এগিয়ে যান
    await next(context)

    # পোস্ট-প্রসেসিং: AI প্রতিক্রিয়ার পর লগ করুন
    print("[Chat] AI response received")

```

**এজেন্ট মেমোরি**

`Agentic Memory` পাঠে আলোচিত মত, মেমোরি AI এজেন্টকে বিভিন্ন প্রসঙ্গে কাজ করার জন্য গুরুত্বপূর্ণ। MAF বিভিন্ন ধরনের মেমোরি অফার করে:

*ইন-মেমোরি স্টোরেজ*

অ্যাপ্লিকেশন রানটাইমের সময় থ্রেডগুলিতে সংরক্ষিত মেমোরি।

```python
# একটি নতুন থ্রেড তৈরি করুন।
thread = agent.get_new_thread() # থ্রেড দিয়ে এজেন্ট চালান।
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*পার্সিস্টেন্ট মেসেজ*

বিভিন্ন সেশনের মধ্যে কথোপকথন ইতিহাস সংরক্ষণ করার জন্য ব্যবহার করা হয়। এটি `chat_message_store_factory` দ্বারা সংজ্ঞায়িত:

```python
from agent_framework import ChatMessageStore

# একটি কাস্টম মেসেজ স্টোর তৈরি করুন
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*ডাইনামিক মেমোরি*

এজেন্ট রান করার আগে প্রসঙ্গে যুক্ত করা মেমোরি। এগুলো বাহ্যিক সেবায় যেমন mem0 তে সংরক্ষণ করা যায়:

```python
from agent_framework.mem0 import Mem0Provider

# উন্নত মেমরি ক্ষমতার জন্য Mem0 ব্যবহার করা হচ্ছে
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

**এজেন্ট পর্যবেক্ষণশীলতা**

নির্ভরযোগ্য ও রক্ষণাবেক্ষণযোগ্য এজেন্টিক সিস্টেম গঠনে পর্যবেক্ষণ গুরুত্বপূর্ণ। MAF OpenTelemetry এর সাথে সংযুক্ত থাকে যার মাধ্যমে ট্রেসিং এবং মিটার সরবরাহ করে।

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # কিছু করো
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### ওয়ার্কফ্লো

MAF ওয়ার্কফ্লো সরবরাহ করে যা পূর্বনির্ধারিত ধাপ সমূহ নিয়ে একটি কাজ সম্পন্ন করে এবং সেই ধাপে AI এজেন্ট অন্তর্ভুক্ত থাকে।

ওয়ার্কফ্লো বিভিন্ন উপাদানে গঠিত যা ভালো নিয়ন্ত্রণ প্রবাহ সম্ভব করে। ওয়ার্কফ্লো **মাল্টি-এজেন্ট অর্কেস্ট্রেশন** এবং **চেকপয়েন্টিং** সমর্থন করে ওয়ার্কফ্লোর অবস্থা সংরক্ষণ করার জন্য।

ওয়ার্কফ্লোর মূল উপাদানগুলো:

**এক্সিকিউটরস**

এক্সিকিউটর ইনপুট বার্তা গ্রহণ করে, বরাদ্দকৃত কাজ সম্পন্ন করে, এবং আউটপুট বার্তা তৈরি করে। এটি বড় কাজের পূরণের দিকে ওয়ার্কফ্লোকে এগিয়ে নিয়ে যায়। এক্সিকিউটর হতে পারে AI এজেন্ট অথবা কাস্টম লজিক।

**এজেস**

ওয়ার্কফ্লোর বার্তাগুলোর প্রবাহ নির্ধারণ করতে এজেস ব্যবহার করা হয়। এগুলো হতে পারে:

*ডাইরেক্ট এজেস* - এক্সিকিউটরদের মধ্যে সরল এক-থেকে-এক সংযোগ:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*শর্তাধীন এজেস* - নির্দিষ্ট শর্ত পূরণ হলে সক্রিয় হয়। যেমন যখন হোটেল রুম না থাকে, তখন এক্সিকিউটর বিকল্প প্রস্তাব করতে পারে।

*সুইচ-কেস এজেস* - শর্ত অনুসারে বার্তাগুলো বিভিন্ন এক্সিকিউটরের দিকে পাঠানো হয়। উদাহরণস্বরূপ, ট্র্যাভেল কাস্টমার যদি প্রাধান্য অ্যাক্সেস থাকে তবে তাদের কাজ অন্য ওয়ার্কফ্লো দিয়ে পরিচালিত হবে।

*ফ্যান-আউট এজেস* - এক বার্তা একাধিক গন্তব্যে পাঠানো।

*ফ্যান-ইন এজেস* - একাধিক বার্তা একত্রিত করে এক গন্তব্যে পাঠানো।

**ইভেন্টস**

ওয়ার্কফ্লোর ভালো পর্যবেক্ষণশীলতার জন্য, MAF অন্তর্নির্মিত কার্যকর ইভেন্ট সরবরাহ করে, যেমন:

- `WorkflowStartedEvent`  - ওয়ার্কফ্লো চালু হয়
- `WorkflowOutputEvent` - ওয়ার্কফ্লো আউটপুট দেয়
- `WorkflowErrorEvent` - ওয়ার্কফ্লো ত্রুটি পায়
- `ExecutorInvokeEvent`  - এক্সিকিউটর কাজ শুরু করে
- `ExecutorCompleteEvent`  - এক্সিকিউটর কাজ শেষ করে
- `RequestInfoEvent` - একটি অনুরোধ করা হয়

## উন্নত MAF প্যাটার্নসমূহ

উপরের বিভাগগুলো মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের মূল ধারণা কভার করে। আরও জটিল এজেন্ট তৈরির জন্য কিছু উন্নত প্যাটার্ন বিবেচনা করুন:

- **মিডলওয়্যার কম্পোজিশন**: ফাংশন এবং চ্যাট মিডলওয়্যার ব্যবহার করে একাধিক মিডলওয়্যার হ্যান্ডলার (লগিং, অথ, রেট-লিমিটিং) চেইন করুন যাতে এজেন্ট আচরণে সূক্ষ্ম নিয়ন্ত্রণ হয়।
- **ওয়ার্কফ্লো চেকপয়েন্টিং**: ওয়ার্কফ্লো ইভেন্ট এবং সিরিয়ালাইজেশন ব্যবহার করে দীর্ঘমেয়াদী এজেন্ট প্রক্রিয়া সংরক্ষণ এবং পুনরায় শুরু করুন।
- **ডাইনামিক টুল সিলেকশন**: টুল বর্ণনার উপরে RAG ব্যবহার করে MAF এর টুল রেজিস্ট্রেশনকে একত্রিত করুন যাতে প্রতিটি প্রশ্নে প্রাসঙ্গিক টুলই প্রদর্শিত হয়।
- **মাল্টি-এজেন্ট হ্যান্ডঅফ**: বিশেষায়িত এজেন্টদের মধ্যে হ্যান্ডঅফ অর্কেস্ট্রেট করতে ওয়ার্কফ্লো এজেস এবং শর্তাধীন রাউটিং ব্যবহার করুন।

## Microsoft Foundry তে LangChain / LangGraph এজেন্ট হোস্টিং

মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক **ফ্রেমওয়ার্ক-ইন্টারঅপারেবল** — অর্থাৎ আপনি শুধুমাত্র MAF দিয়ে লিখিত এজেন্টের সাথে সীমাবদ্ধ নয়। যদি আপনার কাছে ইতিমধ্যে **LangChain** অথবা **LangGraph** দিয়ে তৈরি এজেন্ট থাকে, তাহলে আপনি এটিকে **Microsoft Foundry হোস্টেড এজেন্ট** হিসেবে চালাতে পারেন, যেখানে Foundry রানটাইম, সেশন, স্কেলিং, পরিচয় এবং প্রোটোকল এন্ডপয়েন্ট পরিচালনা করবে, এবং আপনার এজেন্ট লজিক LangGraph এ থাকবে।

এটি করা হয় `langchain_azure_ai.agents.hosting` প্যাকেজের মাধ্যমে, যা কম্পাইলড LangGraph গ্রাফকে Foundry হোস্টেড এজেন্টের ব্যবহার করা সেই প্রোটোকলগুলোর ওপর উদ্ঘাটন করে।

**১. হোস্টিং এক্সট্রা ইনস্টল করুন:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` এক্সট্রা Foundry প্রোটোকল লাইব্রেরিগুলো ইনস্টল করে: `azure-ai-agentserver-responses` (OpenAI-সামঞ্জস্যপূর্ণ `/responses` এন্ডপয়েন্ট) এবং `azure-ai-agentserver-invocations` (জেনেরিক `/invocations` এন্ডপয়েন্ট)।

**২. হোস্টিং প্রোটোকল নির্বাচন করুন:**

| প্রোটোকল | হোস্ট ক্লাস | এন্ডপয়েন্ট | কখন ব্যবহার করবেন |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | আপনি OpenAI-সামঞ্জস্যপূর্ণ চ্যাট, স্ট্রীমিং, উত্তর ইতিহাস এবং কথোপকথন থ্রেডিং চান — কথোপকথন এজেন্টদের জন্য সুপারিশকৃত ডিফল্ট। |
| **Invocations** | `InvocationsHostServer` | `/invocations` | আপনি কাস্টম JSON স্ট্রাকচার, ওয়েবহুক-ধরনের এন্ডপয়েন্ট, অথবা অ-কথোপকথন প্রক্রিয়াকরণ চান। |

কারণ **Responses API Foundry এ এজেন্ট-স্টাইল ডেভেলপমেন্টের প্রধান API**, অধিকাংশ এজেন্টের জন্য প্রথমে `ResponsesHostServer` ব্যবহার শুরু করুন।

**৩. পরিবেশ ভেরিয়েবল কনফিগার করুন** (`az login` করে যাতে `DefaultAzureCredential` প্রমাণীকরণ করতে পারে):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

যখন এজেন্ট পরবর্তীতে Foundry তে হোস্টেড এজেন্ট হিসেবে চালানো হবে, প্ল্যাটফর্ম অটোমেটিকালি `FOUNDRY_PROJECT_ENDPOINT` ইনজেক্ট করে।

**৪. LangGraph এজেন্টকে Responses প্রোটোকল এর ওপর প্রকাশ করুন:**

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

    # এখানে ChatOpenAI Foundry প্রকল্পের OpenAI-সঙ্গতিপূর্ণ (Responses) এন্ডপয়েন্টকে লক্ষ্য করে।
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

লোকালি `python main.py` দিয়ে এটি চালান, তারপর `http://localhost:8088/responses` এ Responses অনুরোধ পাঠান।

**মূল আচরণগুলো:**

- **কথোপকথন**: ক্লায়েন্টরা `previous_response_id` অথবা `conversation` ID প্রদান করে কথোপকথন চালিয়ে যায়। আপনার গ্রাফ যদি LangGraph চেকপয়েন্টার দিয়ে কম্পাইল থাকে, Foundry কথোপকথনের অবস্থা চেকপয়েন্টের সাথে মিলিয়ে সংরক্ষণ করে (প্রোডাকশনে টেকসই চেকপয়েন্টার ব্যবহার করুন; লোকাল পরীক্ষার জন্য `MemorySaver` যথেষ্ট)।
- **হিউম্যান-ইন-দ্য-লুপ**: আপনার গ্রাফ LangGraph `interrupt()` ব্যবহার করলে, `ResponsesHostServer` মুলতুবি আছে এমন ইন্টারাপ্টকে Responses `function_call` / `mcp_approval_request` আইটেম হিসেবে দেখায়, এবং ক্লায়েন্ট সামঞ্জস্যপূর্ণ `function_call_output` / `mcp_approval_response` দিয়ে পুনরায় শুরু করে।
- **Foundry তে ডিপ্লয়**: Azure Developer CLI ব্যবহার করুন — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (লোকাল, Docker প্রয়োজন), তারপর `azd provision` ও `azd deploy`। হোস্টেড এজেন্ট ডিপ্লয়মেন্টের জন্য **Foundry Project Manager** ভূমিকা প্রয়োজন।

এই উদাহরণের একটি runnable সংস্করণ [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) এ রয়েছে। সম্পূর্ণ ওয়াকথ্রু (Invocations প্রোটোকল, কাস্টম অনুরোধ স্কিমা, এবং সমস্যা সমাধান) দেখতে [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) দেখুন।

## কোড নমুনা

মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্কের কোড নমুনা এই রিপোজিটরির `xx-python-agent-framework` এবং `xx-dotnet-agent-framework` ফাইলগুলোতে পাওয়া যাবে।

## মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক সম্পর্কে আরও প্রশ্ন?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) এ যোগ দিন অন্য শিক্ষার্থীদের সাথে কথা বলতে, অফিস আওয়ার এ অংশ নিতে এবং AI এজেন্ট সম্পর্কিত প্রশ্নের উত্তর পেতে।
## পূর্ববর্তী পাঠ

[AI এজেন্টের জন্য মেমোরি](../13-agent-memory/README.md)

## পরবর্তী পাঠ

[কম্পিউটার ইউজ এজেন্ট তৈরি (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->