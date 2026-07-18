# مائیکروسافٹ ایجنٹ فریم ورک کی تلاش

![Agent Framework](../../../translated_images/ur/lesson-14-thumbnail.90df0065b9d234ee.webp)

### تعارف

اس سبق میں یہ موضوعات شامل ہوں گے:

- مائیکروسافٹ ایجنٹ فریم ورک کو سمجھنا: اہم خصوصیات اور قدر  
- مائیکروسافٹ ایجنٹ فریم ورک کے کلیدی تصورات کی کھوج
- جدید MAF پیٹرنز: ورک فلو، مڈل ویئر، اور میموری

## سیکھنے کے اہداف

اس سبق کو مکمل کرنے کے بعد، آپ جانیں گے کہ کیسے:

- مائیکروسافٹ ایجنٹ فریم ورک کا استعمال کرتے ہوئے پروڈکشن کے لئے تیار AI ایجنٹس تیار کریں
- مائیکروسافٹ ایجنٹ فریم ورک کی بنیادی خصوصیات کو اپنے ایجنٹک استعمال کے کیسز پر لاگو کریں
- ورک فلو، مڈل ویئر، اور مشاہدے سمیت جدید پیٹرنز کا استعمال کریں

## کوڈ کے نمونے

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) کے کوڈ نمونے اس ذخیرہ میں `xx-python-agent-framework` اور `xx-dotnet-agent-framework` فائلوں کے تحت مل سکتے ہیں۔

## مائیکروسافٹ ایجنٹ فریم ورک کو سمجھنا

![Framework Intro](../../../translated_images/ur/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) مائیکروسافٹ کا متحدہ فریم ورک ہے AI ایجنٹس بنانے کے لیے۔ یہ لچک فراہم کرتا ہے تاکہ پروڈکشن اور تحقیقاتی ماحول دونوں میں پائے جانے والے مختلف ایجنٹک استعمال کے کیسز کو حل کیا جا سکے، جن میں شامل ہیں:

- **تسلسل پر مبنی ایجنٹ کوآرڈینیشن** جہاں مرحلہ وار ورک فلو کی ضرورت ہوتی ہے۔
- **ہم وقت سازی کوآرڈینیشن** جہاں ایجنٹس کو بیک وقت کام مکمل کرنے ہوتے ہیں۔
- **گروپ چیٹ کوآرڈینیشن** جہاں ایجنٹس ایک ہی کام پر مل کر کام کر سکتے ہیں۔
- **ہینڈ آف کوآرڈینیشن** جہاں ایجنٹس ذیلی کام مکمل ہونے پر کام اگلے ایجنٹ کو منتقل کرتے ہیں۔
- **مقناطیسی کوآرڈینیشن** جہاں ایک مینیجر ایجنٹ کام کی فہرست بناتا اور تبدیل کرتا ہے اور ذیلی ایجنٹس کی ہم آہنگی کا ذمہ دار ہوتا ہے تاکہ کام مکمل ہو۔

پروڈکشن میں AI ایجنٹس فراہم کرنے کے لیے، MAF میں یہ خصوصیات بھی شامل ہیں:

- **مشاہدہ کاری** OpenTelemetry کے ذریعے جہاں AI ایجنٹ کی ہر کارروائی، بشمول ٹول کے کال، کوآرڈینیشن کے مراحل، استدلالی بہاؤ اور Microsoft Foundry ڈیش بورڈز کے ذریعے کارکردگی کی نگرانی کی جاتی ہے۔
- **سیکیورٹی** Microsoft Foundry پر ایجنٹس کو ویب میزبانی کر کے، جس میں سیکیورٹی کنٹرولز شامل ہیں جیسے رول پر مبنی رسائی، نجی ڈیٹا کی حفاظت اور بلٹ اِن مواد کی حفاظت۔
- **برداشت** کیونکہ ایجنٹ کے تھریڈز اور ورک فلو کو روکنا، دوبارہ شروع کرنا اور غلطیوں سے بحال ہونا ممکن ہے جو طویل عمل کی اجازت دیتا ہے۔
- **کنٹرول** کیونکہ انسانی مداخلت والے ورک فلو کی حمایت کی جاتی ہے جہاں کاموں کو انسانی منظوری کی ضرورت ہوتی ہے۔

مائیکروسافٹ ایجنٹ فریم ورک کا فوکس انٹرآپریبلٹی پر بھی ہے:

- **کلاؤڈ سے آزاد** - ایجنٹس کنٹینرز، آن-پریم، اور مختلف کلاؤڈز پر چل سکتے ہیں۔
- **پرووائیڈر سے آزاد** - آپ کی پسندیدہ SDK مثلاً Azure OpenAI اور OpenAI کے ذریعے ایجنٹس بنائے جا سکتے ہیں۔
- **اوپن اسٹینڈرڈز کا انضمام** - ایجنٹس Agent-to-Agent (A2A) اور Model Context Protocol (MCP) جیسے پروٹوکولز کا استعمال کر کے دوسرے ایجنٹس اور ٹولز کو دریافت اور استعمال کر سکتے ہیں۔
- **پلگ انز اور کنیکٹرز** - کنیکشنز بنائے جا سکتے ہیں جیسے Microsoft Fabric, SharePoint, Pinecone, اور Qdrant کے ڈیٹا اور میموری سروسز سے۔

آئیے دیکھتے ہیں کہ یہ خصوصیات مائیکروسافٹ ایجنٹ فریم ورک کے کچھ کلیدی تصورات پر کیسے لاگو ہوتی ہیں۔

## مائیکروسافٹ ایجنٹ فریم ورک کے کلیدی تصورات

### ایجنٹس

![Agent Framework](../../../translated_images/ur/agent-components.410a06daf87b4fef.webp)

**ایجنٹس کی تخلیق**

ایجنٹ کی تخلیق اس وقت کی جاتی ہے جب انفیرینس سروس (LLM پرووائیڈر)، AI ایجنٹ کو دی جانے والی ہدایات کا ایک مجموعہ، اور ایک تفویض کردہ `name` متعین کیا جائے:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

مذکورہ بالا `Azure OpenAI` استعمال کر رہا ہے لیکن ایجنٹس مختلف سروسز کے ذریعے بنائے جا سکتے ہیں بشمول `Microsoft Foundry Agent Service`:

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

یا [MiniMax](https://platform.minimaxi.com/)، جو ایک OpenAI مطابقت پذیر API فراہم کرتا ہے جس میں بڑے کانٹیکسٹ ونڈو (204K ٹوکن تک) ہوتے ہیں:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

یا A2A پروٹوکول استعمال کرنے والے ریموٹ ایجنٹس:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**ایجنٹس کو چلانا**

ایجنٹس کو غیر اسٹریمنگ یا اسٹریمنگ جوابات کے لیے `.run` یا `.run_stream` طریقوں سے چلایا جاتا ہے۔

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

ہر ایجنٹ رن میں `max_tokens`، `tools` جو ایجنٹ کال کر سکتا ہے، اور یہاں تک کہ ایجنٹ کے لیے استعمال کیا جانے والا `model` جیسی ترتیبات کو حسب ضرورت بنایا جا سکتا ہے۔

یہ اس وقت مفید ہوتا ہے جب صارف کے کام کو مکمل کرنے کے لیے مخصوص ماڈلز یا ٹولز کی ضرورت ہو۔

**ٹولز**

ٹولز کو ایجنٹ کی تعریف کرتے وقت بھی متعین کیا جا سکتا ہے:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# جب براہِ راست ایک چیٹ ایجنٹ تخلیق کیا جائے

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

اور ایجنٹ کو چلاتے وقت بھی:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # صرف اس رن کے لیے فراہم کردہ آلہ )
```

**ایجنٹ تھریڈز**

ایجنٹ تھریڈز کا استعمال کثیر مرحلہ بات چیت کو سنبھالنے کے لیے کیا جاتا ہے۔ تھریڈز کو یا تو یوں بنایا جا سکتا ہے:

- `get_new_thread()` کا استعمال کرتے ہوئے جو وقت کے ساتھ تھریڈ کو محفوظ کرنے کی اجازت دیتا ہے
- ایجنٹ چلانے کے دوران خود بخود تھریڈ بنانا جو صرف موجودہ رن کے دوران چلتا ہے۔

تھریڈ بنانے کے لیے کوڈ کچھ اس طرح ہوتا ہے:

```python
# ایک نیا دھاگہ بنائیں۔
thread = agent.get_new_thread() # ایجنٹ کو دھاگے کے ساتھ چلائیں۔
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

اس کے بعد آپ تھریڈ کو بعد میں استعمال کے لیے ذخیرہ کرنے کے لیے سیریلائز کر سکتے ہیں:

```python
# نیا تھریڈ بنائیں۔
thread = agent.get_new_thread() 

# ایجنٹ کو تھریڈ کے ساتھ چلائیں۔

response = await agent.run("Hello, how are you?", thread=thread) 

# ذخیرہ کرنے کے لیے تھریڈ کو ترتیب وار بنائیں۔

serialized_thread = await thread.serialize() 

# ذخیرہ سے لوڈ کرنے کے بعد تھریڈ کی حالت کو غیر ترتیب وار بنائیں۔

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**ایجنٹ مڈل ویئر**

ایجنٹس ٹولز اور LLMs کے ساتھ بات چیت کرتے ہیں تاکہ صارف کے کام مکمل ہوں۔ کچھ صورتوں میں، ہم ان تعاملات کے درمیان کچھ عمل یا نگرانی کرنا چاہتے ہیں۔ ایجنٹ مڈل ویئر ہمیں یہ کرنے دیتا ہے:

*فنکشن مڈل ویئر*

یہ مڈل ویئر ہمیں ایجنٹ اور کسی فنکشن/ٹول کے درمیان ایک عمل چلانے کی اجازت دیتا ہے جسے وہ کال کرے گا۔ مثال کے طور پر جب آپ فنکشن کال پر لاگنگ کرنا چاہتے ہیں۔

نیچے دیے گئے کوڈ میں `next` اس بات کی وضاحت کرتا ہے کہ اگلا مڈل ویئر یا اصل فنکشن کال ہو۔

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # پروسیسنگ سے پہلے: فنکشن کے اجرا سے پہلے لاگ کریں
    print(f"[Function] Calling {context.function.name}")

    # اگلے مڈل ویئر یا فنکشن کے اجرا پر جاری رکھیں
    await next(context)

    # پروسیسنگ کے بعد: فنکشن کے اجرا کے بعد لاگ کریں
    print(f"[Function] {context.function.name} completed")
```

*چیٹ مڈل ویئر*

یہ مڈل ویئر ایجنٹ اور LLM کے درمیان درخواستوں کے دوران لاگنگ یا عمل درآمد کی اجازت دیتا ہے۔

اس میں وہ اہم معلومات شامل ہوتی ہیں جیسے AI سروس کو بھیجے جانے والے `پیغامات`۔

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # پری پروسیسنگ: AI کال سے پہلے لاگ کریں
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # اگلے مڈل ویئر یا AI سروس پر جاری رکھیں
    await next(context)

    # پوسٹ پروسیسنگ: AI جواب کے بعد لاگ کریں
    print("[Chat] AI response received")

```

**ایجنٹ میموری**

جیسا کہ `Agentic Memory` سبق میں بتایا گیا، میموری ایجنٹ کو مختلف سیاق و سباق پر کام کرنے کے قابل بنانے کا ایک اہم عنصر ہے۔ MAF کئی مختلف قسم کی میموری فراہم کرتا ہے:

*ان-میموری اسٹوریج*

یہ وہ میموری ہے جو ایپلیکیشن رن ٹائم کے دوران تھریڈز میں محفوظ کی جاتی ہے۔

```python
# ایک نیا دھاگہ بنائیں۔
thread = agent.get_new_thread() # ایجنٹ کو دھاگے کے ساتھ چلائیں۔
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*پائیدار پیغامات*

یہ میموری مختلف سیشنز میں بات چیت کی تاریخ محفوظ کرنے کے لیے استعمال ہوتی ہے۔ اسے `chat_message_store_factory` کے ذریعے تعریف کیا جاتا ہے:

```python
from agent_framework import ChatMessageStore

# ایک مخصوص پیغام اسٹور بنائیں
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*متحرک میموری*

یہ میموری ایجنٹس کو چلانے سے پہلے کانٹیکسٹ میں شامل کی جاتی ہے۔ یہ میموریز خارجی سروسز جیسے mem0 میں محفوظ کی جا سکتی ہیں:

```python
from agent_framework.mem0 import Mem0Provider

# جدید میموری کی صلاحیتوں کے لیے Mem0 کا استعمال
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

**ایجنٹ مبصریت (Observability)**

مبصریت قابل اعتماد اور قابل دیکھ بھال ایجنٹک نظام بنانے کے لیے اہم ہے۔ MAF OpenTelemetry کے ساتھ ضم ہو کر بہتر مبصریت کے لیے ٹریسنگ اور میٹرز فراہم کرتا ہے۔

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # کچھ کریں
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### ورک فلو

MAF وہ ورک فلو فراہم کرتا ہے جو ایک کام کو مکمل کرنے کے لیے پہلے سے تعریف شدہ مراحل ہیں اور ان مراحل میں AI ایجنٹس کو شامل کرتے ہیں۔

ورک فلو مختلف اجزاء پر مشتمل ہوتے ہیں جو بہتر کنٹرول فلو کی اجازت دیتے ہیں۔ ورک فلو **کثیر ایجنٹ تنظیم** اور **چیک پوائنٹنگ** کو بھی فعال کرتے ہیں تاکہ ورک فلو کی حالتیں محفوظ کی جا سکیں۔

ورک فلو کے بنیادی اجزاء ہیں:

**ایگزیکیٹرز**

ایگزیکیٹرز ان پٹ پیغامات وصول کرتے ہیں، اپنے تفویض شدہ کام انجام دیتے ہیں، اور پھر آؤٹ پٹ پیغام تیار کرتے ہیں۔ یہ ورک فلو کو بڑے کام کی تکمیل کی طرف آگے بڑھاتے ہیں۔ ایگزیکیٹرز AI ایجنٹ یا کسٹم لاجک ہو سکتے ہیں۔

**ایجز**

ایجز ورک فلو میں پیغامات کے بہاؤ کی تعریف کے لیے استعمال ہوتے ہیں۔ یہ ہو سکتے ہیں:

*براہ راست ایجز* - ایگزیکیٹرز کے درمیان سادہ ایک سے ایک کنکشنز:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*شرطی ایجز* - مخصوص حالت پورے ہونے پر فعال ہوتے ہیں۔ مثلاً جب ہوٹل کے کمروں کی دستیابی نہ ہو تو ایک ایگزیکیٹر دیگر اختیارات تجویز کر سکتا ہے۔

*سوئچ کیسی ایجز* - پیغامات کو مختلف ایگزیکیٹرز کی طرف بھیجنا، معین شدہ شرائط کی بنیاد پر۔ مثلاً اگر سفر کے صارف کو ترجیحی رسائی حاصل ہو تو ان کے کام دوسرا ورک فلو سنبھالے گا۔

*فین آؤٹ ایجز* - ایک پیغام کو متعدد مقامات پر بھیجنا۔

*فین اِن ایجز* - مختلف ایگزیکیٹرز سے متعدد پیغامات جمع کر کے ایک جگہ بھیجنا۔

**واقعات**

بہتر مبصریت فراہم کرنے کے لیے، MAF ورک فلو کی تکمیل کیلئے بلٹ-ان واقعے فراہم کرتا ہے جن میں شامل ہیں:

- `WorkflowStartedEvent`  - ورک فلو کی تکمیل شروع ہوتی ہے
- `WorkflowOutputEvent` - ورک فلو نتیجہ تیار کرتا ہے
- `WorkflowErrorEvent` - ورک فلو میں خرابی پیش آتی ہے
- `ExecutorInvokeEvent`  - ایگزیکیٹر عمل شروع کرتا ہے
- `ExecutorCompleteEvent`  -  ایگزیکیٹر عمل مکمل کرتا ہے
- `RequestInfoEvent` - ایک درخواست جاری کی جاتی ہے

## جدید MAF پیٹرنز

اوپر والے حصے مائیکروسافٹ ایجنٹ فریم ورک کے بنیادی تصورات پر مشتمل ہیں۔ جیسے جیسے آپ پیچیدہ ایجنٹس بنائیں، یہاں کچھ جدید پیٹرنز زیر غور ہیں:

- **مڈل ویئر کمپوزیشن**: متعدد مڈل ویئر ہینڈلرز (لاگنگ، تصدیق، ریٹ-لیمٹنگ) کو فنکشن اور چیٹ مڈل ویئر کے ذریعے سلسلہ وار جوڑیں تاکہ ایجنٹ کے رویے پر باریک کنٹرول ملے۔
- **ورک فلو چیک پوائنٹنگ**: ورک فلو ایونٹس اور سیریلائزیشن کا استعمال کرتے ہوئے طویل عرصے چلنے والے ایجنٹ عمل کو محفوظ کریں اور دوبارہ شروع کریں۔
- **متحرک ٹول انتخاب**: RAG کو ٹول کی تفصیلات پر استعمال کریں اور MAF کے ٹول رجسٹریشن کے ساتھ مل کر صرف متعلقہ ٹولز کو ہر سوال کے لیے پیش کریں۔
- **کثیر ایجنٹ ہینڈ آف**: ورک فلو ایجز اور شرطی راستہ بندی کا استعمال کرتے ہوئے ماہر ایجنٹس کے درمیان ہینڈ آف کو منظم کریں۔

## Microsoft Foundry پر LangChain / LangGraph ایجنٹس کی میزبانی

مائیکروسافٹ ایجنٹ فریم ورک **فریم ورک-انٹرآپریبل** ہے — آپ MAF سے لکھے گئے ایجنٹس تک محدود نہیں ہیں۔ اگر آپ کے پاس پہلے سے **LangChain** یا **LangGraph** کے ساتھ بنایا ہوا ایجنٹ ہے، تو آپ اسے **Microsoft Foundry میزبانی شدہ ایجنٹ** کے طور پر چلا سکتے ہیں تاکہ Foundry رن ٹائم، سیشنز، اسکیلنگ، شناخت، اور پروٹوکول اینڈ پوائنٹس کو منظم کرے، جبکہ آپ کی ایجنٹ لاجک LangGraph میں رہے۔

یہ `langchain_azure_ai.agents.hosting` پیکج کے ذریعہ کیا جاتا ہے، جو ایک مرتب شدہ LangGraph گراف کو انہی پروٹوکولز پر ظاہر کرتا ہے جو Foundry کی میزبانی شدہ ایجنٹس استعمال کرتے ہیں۔

**1. ہوسٹنگ اضافی کمانڈ انسٹال کریں:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` اضافی Foundry پروٹوکول لائبریریاں انسٹال کرتا ہے: `azure-ai-agentserver-responses` (OpenAI مطابقت پذیر `/responses` اینڈ پوائنٹ) اور `azure-ai-agentserver-invocations` (عام `/invocations` اینڈ پوائنٹ)۔

**2. ہوسٹنگ پروٹوکول منتخب کریں:**

| پروٹوکول | ہوسٹ کلاس | اینڈ پوائنٹ | استعمال کی حالت |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | آپ اوپنAI مطابقت پذیر چیٹ، اسٹریمنگ، جوابی تاریخ، اور بات چیت کی تھریڈنگ چاہتے ہیں — بات چیت والے ایجنٹس کے لیے تجویز کردہ ڈیفالٹ۔ |
| **Invocations** | `InvocationsHostServer` | `/invocations` | آپ کو اپنی مرضی کے JSON فارم کی ضرورت ہے، ویب ہک طرز اینڈ پوائنٹ، یا غیر بات چیت پر مبنی عمل۔ |

کیونکہ **Responses API Foundry میں ایجنٹ طرز کی ترقی کے لیے مرکزی API ہے**، زیادہ تر ایجنٹس کے لیے `ResponsesHostServer` سے شروع کریں۔

**3. ماحول کی متغیرات کو ترتیب دیں** (`az login` پہلے کریں تاکہ `DefaultAzureCredential` تصدیق کر سکے):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

جب ایجنٹ بعد میں Foundry میں میزبانی شدہ ایجنٹ کے طور پر چلے گا، تو پلیٹ فارم خود بخود `FOUNDRY_PROJECT_ENDPOINT` شامل کرے گا۔

**4. Responses پروٹوکول پر LangGraph ایجنٹ کو ظاہر کریں:**

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

    # ChatOpenAI یہاں Foundry پروجیکٹ کے OpenAI-مطابق (Responses) اینڈ پوائنٹ کو ہدف بناتا ہے۔
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

اسے لوکل `python main.py` سے چلائیں، پھر `http://localhost:8088/responses` پر Responses درخواست بھیجیں۔

**اہم خصوصیات:**

- **بات چیت**: کلائنٹس بات چیت جاری رکھتے ہیں `previous_response_id` یا `conversation` ID بھیج کر۔ اگر آپ کا گراف LangGraph چیک پوائنٹر کے ساتھ مرتب ہے، Foundry بات چیت کی حالت کو چیک پوائنٹ کی چابی دیتا ہے (پروڈکشن میں پائیدار چیک پوائنٹر استعمال کریں؛ `MemorySaver` لوکل ٹیسٹنگ کے لیے ٹھیک ہے)۔
- **انسانی مداخلت**: اگر آپ کا گراف LangGraph `interrupt()` استعمال کرتا ہے، `ResponsesHostServer` زیر التواء انٹرپشن کو Responses `function_call` / `mcp_approval_request` آئٹم کے طور پر ظاہر کرتا ہے، اور کلائنٹس ملتے جلتے `function_call_output` / `mcp_approval_response` کے ساتھ دوبارہ شروع ہوتے ہیں۔
- **Foundry پر تعین کریں**: Azure Developer CLI استعمال کریں — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (لوکل، ڈوکر کی ضرورت ہے)، پھر `azd provision` اور `azd deploy`۔ ہوسٹنگ-ایجنٹ کی تعیناتی کے لیے **Foundry Project Manager** کا رول درکار ہے۔

اس مثال کا چلنے والا ورژن [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) میں دستیاب ہے۔ مکمل گائیڈ (Invocations پروٹوکول، کسٹم درخواست کے schemas، اور مسائل کا حل) کے لیے دیکھیں [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)۔

## کوڈ کے نمونے

مائیکروسافٹ ایجنٹ فریم ورک کے کوڈ نمونے اس ذخیرہ میں `xx-python-agent-framework` اور `xx-dotnet-agent-framework` فائلوں کے تحت مل سکتے ہیں۔

## مائیکروسافٹ ایجنٹ فریم ورک کے بارے میں مزید سوالات ہیں؟

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) میں شامل ہوں تاکہ دیگر سیکھنے والوں سے ملاقات کریں، آفیس آورز میں شرکت کریں اور اپنے AI ایجنٹس کے سوالات کے جوابات حاصل کریں۔
## پچھلا سبق

[AI ایجنٹس کے لیے میموری](../13-agent-memory/README.md)

## اگلا سبق

[کمپیوٹر کے استعمال کے ایجنٹس بنانا (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->