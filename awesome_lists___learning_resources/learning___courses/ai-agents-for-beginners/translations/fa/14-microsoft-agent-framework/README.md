# بررسی چارچوب Microsoft Agent

![Agent Framework](../../../translated_images/fa/lesson-14-thumbnail.90df0065b9d234ee.webp)

### مقدمه

این درس شامل موارد زیر است:

- درک چارچوب Microsoft Agent: ویژگی‌ها و ارزش‌های کلیدی  
- بررسی مفاهیم کلیدی چارچوب Microsoft Agent
- الگوهای پیشرفته MAF: گردش کارها، میدلور، و حافظه

## اهداف یادگیری

پس از اتمام این درس، شما خواهید دانست چگونه:

- ساخت عوامل هوش مصنوعی آماده تولید با استفاده از چارچوب Microsoft Agent
- اعمال ویژگی‌های اصلی چارچوب Microsoft Agent بر موارد استفاده عامل‌محور خود
- استفاده از الگوهای پیشرفته شامل گردش کارها، میدلور، و قابلیت مشاهده

## نمونه کدها

نمونه کدها برای [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) در این مخزن در فایل‌های `xx-python-agent-framework` و `xx-dotnet-agent-framework` موجود است.

## درک چارچوب Microsoft Agent

![Framework Intro](../../../translated_images/fa/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) چارچوب یکپارچه مایکروسافت برای ساخت عوامل هوش مصنوعی است. این چارچوب انعطاف‌پذیری لازم را برای پاسخگویی به انواع مختلف موارد استفاده عامل‌محور که در محیط‌های تولید و تحقیق مشاهده می‌شود فراهم می‌کند که شامل:

- **هماهنگی متوالی عامل‌ها** در سناریوهایی که به گردش کار گام به گام نیاز است.
- **هماهنگی همزمان** در سناریوهایی که عوامل باید همزمان وظایف را انجام دهند.
- **هماهنگی گروه چت** در سناریوهایی که عوامل می‌توانند با هم در یک وظیفه همکاری کنند.
- **هماهنگی انتقال وظایف** در سناریوهایی که عوامل وظایف زیرمجموعه را پس از تکمیل به یکدیگر واگذار می‌کنند.
- **هماهنگی مغناطیسی** در سناریوهایی که یک عامل مدیر فهرست وظایف را ایجاد و اصلاح کرده و هماهنگی زیرعوامل برای انجام وظیفه را مدیریت می‌کند.

برای ارائه عوامل هوش مصنوعی در تولید، MAF همچنین ویژگی‌هایی برای:

- **قابلیت مشاهده** از طریق استفاده از OpenTelemetry که هر عمل عامل هوش مصنوعی از جمله فراخوانی ابزار، مراحل هماهنگی، جریان‌های استدلال و نظارت عملکرد را از طریق داشبوردهای Microsoft Foundry رصد می‌کند.
- **امنیت** با میزبانی بومی عوامل روی Microsoft Foundry که شامل کنترل‌های امنیتی مانند دسترسی مبتنی بر نقش، مدیریت داده‌های خصوصی و ایمنی محتوای داخلی است.
- **دوام** زیرا رشته‌ها و گردش کارهای عامل می‌توانند متوقف، ادامه و از خطاها بازیابی شوند که امکان فرایندهای طولانی‌مدت را فراهم می‌آورد.
- **کنترل** زیرا گردش کارهای انسان در حلقه پشتیبانی می‌شوند که در آن وظایف به عنوان نیازمند تأیید انسانی علامت‌گذاری می‌شوند.

چارچوب Microsoft Agent همچنین تمرکز بر قابلیت همکاری دارد از طریق:

- **غیر وابسته به ابر بودن** - عوامل می‌توانند در کانتینرها، مکان محلی و در چندین ابر مختلف اجرا شوند.
- **غیر وابسته به ارائه‌دهنده بودن** - عوامل می‌توانند از طریق SDK مورد علاقه شما از جمله Azure OpenAI و OpenAI ساخته شوند.
- **یکپارچه‌سازی استانداردهای باز** - عوامل می‌توانند از پروتکل‌هایی مانند Agent-to-Agent (A2A) و Model Context Protocol (MCP) برای کشف و استفاده از سایر عوامل و ابزارها بهره ببرند.
- **پلاگین‌ها و کانکتورها** - ارتباطات می‌توانند به خدمات داده و حافظه مانند Microsoft Fabric، SharePoint، Pinecone و Qdrant برقرار شوند.

بیایید ببینیم چگونه این ویژگی‌ها در برخی از مفاهیم اصلی چارچوب Microsoft Agent اعمال می‌شوند.

## مفاهیم کلیدی چارچوب Microsoft Agent

### عوامل (Agents)

![Agent Framework](../../../translated_images/fa/agent-components.410a06daf87b4fef.webp)

**ساخت عوامل**

ساخت عامل با تعریف سرویس استنتاج (ارائه‌دهنده LLM)،  
مجموعه‌ای از دستورالعمل‌ها برای عامل هوش مصنوعی برای دنبال کردن، و نام اختصاص داده شده `name` انجام می‌شود:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

نمونه بالا از `Azure OpenAI` استفاده می‌کند اما عوامل را می‌توان با انواع خدمات مختلف از جمله `Microsoft Foundry Agent Service` ساخت:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

API های OpenAI شامل `Responses` و `ChatCompletion`

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

یا [MiniMax](https://platform.minimaxi.com/) که API سازگار با OpenAI با پنجره‌های متنی بزرگ (تا 204K توکن) ارائه می‌کند:

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

یا عوامل از راه دور با استفاده از پروتکل A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**اجرای عامل‌ها**

عامل‌ها با استفاده از متدهای `.run` یا `.run_stream` برای پاسخ‌های غیرجریان و جریانی اجرا می‌شوند.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

هر اجرای عامل همچنین می‌تواند گزینه‌هایی برای سفارشی‌سازی پارامترهایی مانند `max_tokens` استفاده شده توسط عامل، `tools` که عامل می‌تواند فراخوانی کند، و حتی خود `model` که برای عامل استفاده می‌شود داشته باشد.

این در مواردی مفید است که مدل‌ها یا ابزارهای خاصی برای تکمیل وظیفه کاربر لازم است.

**ابزارها**

ابزارها هم هنگام تعریف عامل می‌توانند تعریف شوند:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# هنگام ایجاد یک ChatAgent به طور مستقیم

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

و همچنین هنگام اجرای عامل:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # ابزار ارائه شده فقط برای این اجرا )
```

**رشته‌های عامل (Agent Threads)**

رشته‌های عامل برای مدیریت گفتگوهای چند مرحله‌ای استفاده می‌شوند. رشته‌ها می‌توانند به دو صورت ایجاد شوند:

- استفاده از `get_new_thread()` که امکان ذخیره رشته در طول زمان را فراهم می‌کند
- ایجاد خودکار رشته هنگام اجرای عامل که تنها در طول اجرای فعلی وجود دارد.

کد ایجاد رشته به این صورت است:

```python
# ایجاد یک رشته جدید.
thread = agent.get_new_thread() # اجرای عامل با رشته.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

سپس می‌توانید رشته را به صورت سریال شده ذخیره کنید تا بعداً استفاده شود:

```python
# ایجاد یک رشته جدید.
thread = agent.get_new_thread() 

# اجرای عامل با رشته.

response = await agent.run("Hello, how are you?", thread=thread) 

# سریال‌سازی رشته برای ذخیره‌سازی.

serialized_thread = await thread.serialize() 

# غیراسریال‌سازی حالت رشته پس از بارگذاری از ذخیره‌سازی.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**میان‌افزار عامل (Agent Middleware)**

عوامل برای تکمیل وظایف کاربران با ابزارها و LLM ها تعامل دارند. در برخی سناریوها، می‌خواهیم بین این تعاملات اجرا یا پیگیری انجام دهیم. میان‌افزار عامل به ما این امکان را می‌دهد با:

*میان‌افزار تابعی (Function Middleware)*

این میان‌افزار به ما اجازه می‌دهد بین عامل و تابع/ابزاری که فراخوانی می‌کند، عملی را اجرا کنیم. یک مثال از کاربرد آن زمانی است که بخواهید ثبت وقایع روی فراخوانی تابع انجام دهید.

در کد پایین، `next` تعیین می‌کند که میان‌افزار بعدی یا تابع واقعی باید فراخوانی شود.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # پیش‌پردازش: ثبت لاگ قبل از اجرای تابع
    print(f"[Function] Calling {context.function.name}")

    # ادامه به واسطه‌گر یا اجرای تابع بعدی
    await next(context)

    # پس‌پردازش: ثبت لاگ بعد از اجرای تابع
    print(f"[Function] {context.function.name} completed")
```

*میان‌افزار چت (Chat Middleware)*

این میان‌افزار به ما اجازه می‌دهد بین عامل و درخواست‌ها بین LLM عملی را اجرا یا ثبت کنیم.

این شامل اطلاعات مهمی مانند `messages` ارسالی به سرویس هوش مصنوعی است.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # پیش‌پردازش: ثبت لاگ قبل از فراخوانی هوش مصنوعی
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # ادامه به میان‌افزار یا سرویس هوش مصنوعی بعدی
    await next(context)

    # پس‌پردازش: ثبت لاگ پس از دریافت پاسخ هوش مصنوعی
    print("[Chat] AI response received")

```

**حافظه عامل (Agent Memory)**

همانطور که در درس `Agentic Memory` گفته شد، حافظه عنصر مهمی برای امکان‌پذیر کردن عملکرد عامل در زمینه‌های مختلف است. MAF انواع مختلفی از حافظه‌ها ارائه می‌دهد:

*حافظه درون‌برنامه‌ای (In-Memory Storage)*

این حافظه در رشته‌ها در زمان اجرای برنامه ذخیره می‌شود.

```python
# ایجاد یک رشته جدید.
thread = agent.get_new_thread() # عامل را با رشته اجرا کنید.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*پیام‌های پایدار (Persistent Messages)*

این حافظه برای ذخیره تاریخچه گفتگو در جلسات مختلف استفاده می‌شود. با استفاده از `chat_message_store_factory` تعریف می‌شود:

```python
from agent_framework import ChatMessageStore

# ایجاد یک فروشگاه پیام سفارشی
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*حافظه پویا (Dynamic Memory)*

این حافظه قبل از اجرای عامل‌ها به متن اضافه می‌شود. این حافظه‌ها می‌توانند در خدمات خارجی مانند mem0 ذخیره شوند:

```python
from agent_framework.mem0 import Mem0Provider

# استفاده از Mem0 برای قابلیت‌های پیشرفته حافظه
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

**قابلیت مشاهده عامل (Agent Observability)**

قابلیت مشاهده برای ساخت سیستم‌های عامل قابل اعتماد و قابل نگهداری مهم است. MAF با OpenTelemetry یکپارچه شده تا ردیابی و مترها را برای بهبود قابلیت مشاهده فراهم کند.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # انجام دادن کاری
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### گردش کارها (Workflows)

MAF گردش کارهایی ارائه می‌دهد که مراحل پیش‌تعریف شده برای انجام یک وظیفه هستند و عوامل هوش مصنوعی به عنوان اجزایی در آن مراحل حضور دارند.

گردش کارها از اجزای مختلفی تشکیل شده‌اند که امکان کنترل بهتر جریان را می‌دهند. همچنین گردش کارها امکان **هماهنگی چند عاملی** و **ذخیره‌سازی نقطه‌ای** برای ذخیره وضعیت گردش کار را فراهم می‌کنند.

اجزای اصلی یک گردش کار عبارتند از:

**مجریان (Executors)**

مجریان پیام‌های ورودی را دریافت، وظایف محوله را انجام داده و سپس پیام خروجی تولید می‌کنند. این کار گردش کار را به سمت انجام وظیفه بزرگ‌تر پیش می‌برد. مجریان می‌توانند هوش مصنوعی یا منطق سفارشی باشند.

**لبه‌ها (Edges)**

لبه‌ها برای تعریف جریان پیام‌ها در یک گردش کار استفاده می‌شوند. این‌ها می‌توانند شامل موارد زیر باشند:

*لبه‌های مستقیم* - اتصال‌های ساده یک به یک بین مجریان:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*لبه‌های شرطی* - پس از برآورده شدن شرایط خاص فعال می‌شوند. مثلاً وقتی اتاق‌های هتل موجود نیست، یک مجری می‌تواند گزینه‌های دیگر را پیشنهاد دهد.

*لبه‌های سویچ-کیس* - پیام‌ها را بر اساس شرایط تعریف شده به مجریان مختلف هدایت می‌کنند. مثلاً اگر مشتری سفر دسترسی اولویت‌دار داشته باشد، وظایف آن‌ها از طریق گردش کار دیگری انجام می‌شود.

*لبه‌های پخش به چند مقصد (Fan-out)* - ارسال یک پیام به چند مقصد.

*لبه‌های جمع‌آوری از چند منبع (Fan-in)* - جمع‌آوری چندین پیام از مجریان مختلف و ارسال به یک مقصد.

**رویدادها (Events)**

برای فراهم کردن قابلیت مشاهده بهتر در گردش کارها، MAF رویدادهای از پیش ساخته شده برای اجرا ارائه می‌دهد که شامل:

- `WorkflowStartedEvent`  - شروع اجرای گردش کار
- `WorkflowOutputEvent` - گردش کار خروجی تولید می‌کند
- `WorkflowErrorEvent` - گردش کار با خطا مواجه می‌شود
- `ExecutorInvokeEvent`  - شروع پردازش توسط مجری
- `ExecutorCompleteEvent`  - پایان پردازش توسط مجری
- `RequestInfoEvent` - صدور یک درخواست

## الگوهای پیشرفته MAF

بخش‌های فوق مفاهیم کلیدی چارچوب Microsoft Agent را پوشش می‌دهند. زمانی که عوامل پیچیده‌تری می‌سازید، این الگوهای پیشرفته را در نظر بگیرید:

- **ترکیب میان‌افزار**: زنجیره‌ای از چندین مدیر میان‌افزار (ثبت وقایع، تأیید، محدودیت نرخ) با استفاده از میان‌افزار تابعی و چت برای کنترل دقیق رفتار عامل.
- **نقطه‌بندی گردش کار**: استفاده از رویدادهای گردش کار و سریال‌سازی برای ذخیره و ادامه فرایندهای طولانی‌مدت عامل.
- **انتخاب ابزار پویا**: ترکیب RAG بر توضیحات ابزار با ثبت ابزارهای MAF برای ارائه تنها ابزارهای مرتبط در هر پرسش.
- **انتقال چند عاملی**: استفاده از لبه‌های گردش کار و مسیریابی شرطی برای هماهنگی انتقال بین عوامل تخصصی.

## میزبانی عوامل LangChain / LangGraph در Microsoft Foundry

چارچوب Microsoft Agent **قابلیت همکاری چارچوبی** دارد — شما محدود به عوامل نوشته شده با MAF نیستید. اگر قبلاً عاملی با **LangChain** یا **LangGraph** ساخته‌اید، می‌توانید آن را به عنوان **عامل میزبانی شده توسط Microsoft Foundry** اجرا کنید تا Foundry مدیریت زمان اجرا، جلسات، مقیاس‌پذیری، هویت و نقاط پایانی پروتکل را بر عهده گیرد، در حالی که منطق عامل شما در LangGraph باقی می‌ماند.

این کار با بسته `langchain_azure_ai.agents.hosting` انجام می‌شود که یک گراف کامپایل شده LangGraph را از طریق همان پروتکل‌هایی که عوامل میزبانی شده Foundry استفاده می‌کنند، در دسترس قرار می‌دهد.

**1. نصب افزونه میزبانی:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

افزونه `hosting` کتابخانه‌های پروتکل Foundry را نصب می‌کند: `azure-ai-agentserver-responses` (نقطه پایانی سازگار با OpenAI `/responses`) و `azure-ai-agentserver-invocations` (نقطه پایانی عمومی `/invocations`).

**2. انتخاب پروتکل میزبانی:**

| پروتکل | کلاس میزبان | نقطه پایانی | استفاده در چه زمانی |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | اگر مکالمه چت سازگار با OpenAI، استریم، تاریخچه پاسخ، و مدیریت موضوعات مکالمه می‌خواهید — پیش‌فرض توصیه شده برای عوامل مکالمه‌ای. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | اگر نیاز به شکل JSON سفارشی، نقطه پایانی مشابه وب‌هوک، یا پردازش غیر مکالمه‌ای دارید. |

چون **پروتکل Responses API، API اصلی برای توسعه عامل در Foundry است**، برای اکثر عوامل با `ResponsesHostServer` شروع کنید.

**3. پیکربندی متغیرهای محیطی** (ابتدا `az login` انجام دهید تا `DefaultAzureCredential` تأیید هویت کند):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

وقتی عامل بعداً به عنوان عامل میزبانی شده در Foundry اجرا شود، پلتفرم به طور خودکار `FOUNDRY_PROJECT_ENDPOINT` را تزریق می‌کند.

**4. در دسترس قرار دادن یک عامل LangGraph از طریق پروتکل Responses:**

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

    # اینجا ChatOpenAI به نقطه پایانی سازگار با OpenAI پروژه Foundry (پاسخ‌ها) هدف می‌گیرد.
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

به صورت محلی با `python main.py` اجرا کنید، سپس درخواست Responses را به `http://localhost:8088/responses` ارسال کنید.

**رفتارهای کلیدی:**

- **مکالمات**: مشتریان با ارسال `previous_response_id` یا شناسه `conversation` مکالمه را ادامه می‌دهند. اگر گراف شما با LangGraph checkpointer کامپایل شده باشد، Foundry وضعیت مکالمه را به نقطه بررسی کلید می‌کند (برای تولید از نقطه‌گذار پایدار استفاده کنید؛ `MemorySaver` برای تست محلی کافی است).
- **انسان در حلقه**: اگر گراف شما از LangGraph `interrupt()` استفاده کند، `ResponsesHostServer` وقفه در حال انتظار را به عنوان `function_call` / `mcp_approval_request` در Responses نمایش می‌دهد، و مشتریان با `function_call_output` / `mcp_approval_response` مطابقت یافته ادامه می‌دهند.
- **انتشار به Foundry**: از Azure Developer CLI استفاده کنید — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (محلی، نیاز به داکر دارد)، سپس `azd provision` و `azd deploy`. انتشار عامل میزبانی شده نیازمند نقش **Foundry Project Manager** است.

نسخه اجرایی این مثال در [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) موجود است. برای راهنمای کامل (پروتکل Invocations، طرح‌های درخواست سفارشی و رفع اشکال)، ببینید [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## نمونه کدها

نمونه کدها برای چارچوب Microsoft Agent در این مخزن در فایل‌های `xx-python-agent-framework` و `xx-dotnet-agent-framework` موجود است.

## سوالات بیشتری درباره چارچوب Microsoft Agent دارید؟

به [Discord مایکروسافت Foundry](https://discord.com/invite/ATgtXmAS5D) بپیوندید تا با دیگر یادگیرندگان دیدار کنید، در ساعت‌های اداری شرکت کنید و سوالات خود درباره عوامل هوش مصنوعی را پاسخ دهید.
## درس قبلی

[حافظه برای عوامل هوش مصنوعی](../13-agent-memory/README.md)

## درس بعدی

[ساخت عوامل استفاده‌کننده رایانه (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->