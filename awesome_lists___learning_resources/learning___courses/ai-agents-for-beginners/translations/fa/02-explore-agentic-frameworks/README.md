[![بررسی چارچوب‌های عامل هوش مصنوعی](../../../translated_images/fa/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(برای مشاهده ویدیوی این درس روی تصویر بالا کلیک کنید)_

# بررسی چارچوب‌های عامل هوش مصنوعی

چارچوب‌های عامل هوش مصنوعی پلتفرم‌های نرم‌افزاری هستند که برای ساده‌سازی ایجاد، استقرار و مدیریت عامل‌های هوش مصنوعی طراحی شده‌اند. این چارچوب‌ها به توسعه‌دهندگان اجزای از پیش ساخته شده، انتزاع‌ها و ابزارهایی ارائه می‌دهند که فرایند توسعه سیستم‌های پیچیده هوش مصنوعی را تسریع می‌کنند.

این چارچوب‌ها به توسعه‌دهندگان کمک می‌کنند تا بر جنبه‌های منحصربه‌فرد برنامه‌های خود تمرکز کنند، با ارائه رویکردهای استاندارد برای چالش‌های رایج در توسعه عامل‌های هوش مصنوعی. این چارچوب‌ها مقیاس‌پذیری، دسترسی‌پذیری و کارایی ساخت سیستم‌های هوش مصنوعی را افزایش می‌دهند.

## معرفی

این درس شامل موارد زیر است:

- چارچوب‌های عامل هوش مصنوعی چیستند و چه چیزهایی را برای توسعه‌دهندگان امکان‌پذیر می‌کنند؟
- چگونه تیم‌ها می‌توانند از این چارچوب‌ها برای نمونه‌سازی سریع، تکرار و بهبود قابلیت‌های عوامل استفاده کنند؟
- تفاوت‌های چارچوب‌ها و ابزارهای ساخته شده توسط مایکروسافت (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> و <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) چیست؟
- آیا می‌توانم ابزارهای موجود در اکوسیستم Azure خود را مستقیماً ادغام کنم یا نیاز به راه‌حل‌های مستقل هست؟
- Microsoft Foundry Agent Service چیست و چگونه به من کمک می‌کند؟

## اهداف یادگیری

اهداف این درس به شما کمک می‌کند تا:

- نقش چارچوب‌های عامل هوش مصنوعی در توسعه هوش مصنوعی را درک کنید.
- چگونه می‌توان از چارچوب‌های عامل هوش مصنوعی برای ساخت عوامل هوشمند استفاده کرد.
- قابلیت‌های کلیدی که توسط چارچوب‌های عامل هوش مصنوعی فعال می‌شوند.
- تفاوت‌های بین Microsoft Agent Framework و Microsoft Foundry Agent Service.

## چارچوب‌های عامل هوش مصنوعی چیستند و چه چیزهایی را برای توسعه‌دهندگان ممکن می‌کنند؟

چارچوب‌های سنتی هوش مصنوعی می‌توانند به شما کمک کنند تا هوش مصنوعی را در برنامه‌های خود ادغام کرده و این برنامه‌ها را به شکل زیر بهبود ببخشید:

- **شخصی‌سازی**: هوش مصنوعی می‌تواند رفتار و ترجیحات کاربران را تحلیل کند و پیشنهادات، محتوا و تجربیات شخصی‌سازی شده ارائه دهد.
مثال: سرویس‌های پخش مانند Netflix از هوش مصنوعی برای پیشنهاد فیلم‌ها و برنامه‌ها بر اساس سابقه تماشا استفاده می‌کنند و تعامل و رضایت کاربران را افزایش می‌دهند.
- **خودکارسازی و کارایی**: هوش مصنوعی می‌تواند وظایف تکراری را خودکار کند، جریان‌های کاری را تسهیل کرده و کارایی عملیاتی را بهبود دهد.
مثال: برنامه‌های خدمات مشتری از چت‌بات‌های هوشمند برای پاسخ به پرسش‌های رایج استفاده می‌کنند که زمان پاسخگویی را کاهش داده و عاملان انسانی را برای مسائل پیچیده‌تر آزاد می‌کند.
- **تجربه کاربری بهبود یافته**: هوش مصنوعی می‌تواند ویژگی‌های هوشمند مانند تشخیص صدا، پردازش زبان طبیعی و پیش‌بینی متن را فراهم کند تا تجربه کاربری را بهبود بخشد.
مثال: دستیارهای صوتی مانند Siri و Google Assistant از هوش مصنوعی برای فهم و پاسخ به فرمان‌های صوتی استفاده می‌کنند و تعامل کاربران با دستگاه‌ها را آسان‌تر می‌کنند.

### همه اینها عالی به نظر می‌رسد، پس چرا به چارچوب عامل هوش مصنوعی نیاز داریم؟

چارچوب‌های عامل هوش مصنوعی مفهومی فراتر از چارچوب‌های هوش مصنوعی دارند. آنها برای ایجاد عوامل هوشمندی طراحی شده‌اند که می‌توانند با کاربران، سایر عوامل و محیط تعامل داشته باشند تا اهداف خاصی را محقق کنند. این عوامل می‌توانند رفتار خودمختار نشان دهند، تصمیم‌گیری کنند و به شرایط متغیر سازگار شوند. بیایید به برخی قابلیت‌های کلیدی فعال شده توسط چارچوب‌های عامل هوش مصنوعی نگاهی بیندازیم:

- **همکاری و هماهنگی عوامل**: امکان ایجاد چندین عامل هوش مصنوعی که می‌توانند با هم کار کنند، ارتباط برقرار کنند و برای حل وظایف پیچیده هماهنگ شوند.
- **خودکارسازی و مدیریت وظایف**: فراهم کردن مکانیزم‌هایی برای خودکارسازی جریان‌های کاری چندمرحله‌ای، واگذاری وظایف و مدیریت پویا بین عوامل.
- **درک متنی و سازگاری**: تجهیز عوامل به توانایی درک زمینه، سازگاری با محیط‌های متغیر و تصمیم‌گیری بر اساس اطلاعات بلادرنگ.

به طور خلاصه، عوامل به شما اجازه می‌دهند تا کارهای بیشتری انجام دهید، خودکارسازی را به سطح بالاتری ببرید و سیستم‌های هوشمندتری بسازید که می‌توانند یاد بگیرند و از محیط خود سازگار شوند.

## چگونه سریع نمونه‌سازی کنیم، تکرار کنیم و قابلیت‌های عامل را بهبود دهیم؟

این حوزه به سرعت در حال تغییر است، اما مواردی وجود دارد که در اکثر چارچوب‌های عامل هوش مصنوعی مشترک است و به شما کمک می‌کند تا سریع نمونه‌سازی و تکرار کنید، مانند اجزای ماژولار، ابزارهای همکاری و یادگیری بلادرنگ. بیایید به این موارد بپردازیم:

- **استفاده از اجزای ماژولار**: SDK های هوش مصنوعی قطعات از پیش ساخته مانند کانکتورهای هوش مصنوعی و حافظه، فراخوانی توابع با زبان طبیعی یا افزونه‌های کد، قالب‌های درخواست و موارد دیگر را ارائه می‌دهند.
- **استفاده از ابزارهای همکاری**: عوامل را با نقش‌ها و وظایف خاص طراحی کنید تا بتوانند جریان‌های کاری تعاملی را تست و بهبود بخشند.
- **یادگیری بلادرنگ**: حلقه‌های بازخورد ایجاد کنید که در آن عوامل از تعاملات یاد می‌گیرند و رفتار خود را به طور پویا تنظیم می‌کنند.

### استفاده از اجزای ماژولار

SDK هایی مانند Microsoft Agent Framework اجزایی از پیش ساخته مانند کانکتورهای هوش مصنوعی، تعریف ابزارها و مدیریت عامل را ارائه می‌دهند.

**چگونه تیم‌ها می‌توانند از این استفاده کنند**: تیم‌ها می‌توانند این اجزا را به سرعت کنار هم بگذارند تا نمونه عملکردی ایجاد کنند بدون اینکه از ابتدا شروع کنند و این اجازه را می‌دهد آزمایش و تکرار سریعی داشته باشند.

**چگونه در عمل کار می‌کند**: می‌توانید از یک تحلیلگر از پیش ساخته شده برای استخراج اطلاعات از ورودی کاربر، ماژول حافظه برای ذخیره و بازیابی داده‌ها و مولد درخواست برای تعامل با کاربران استفاده کنید، همه این‌ها بدون نیاز به ساخت از صفر.

**نمونه کد**: بیایید نمونه‌ای از نحوه استفاده از Microsoft Agent Framework با `FoundryChatClient` برای پاسخ مدل به ورودی کاربر با فراخوانی ابزار را ببینیم:

``` python
# نمونه پایتون چارچوب عامل مایکروسافت

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# تعریف یک تابع نمونه ابزار برای رزرو سفر
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # خروجی نمونه: پرواز شما به نیویورک در یکم ژانویه ۲۰۲۵ با موفقیت رزرو شده است. سفر خوش! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

چیزی که از این مثال می‌بینید این است که چگونه می‌توانید از تحلیلگر از پیش ساخته شده برای استخراج اطلاعات کلیدی از ورودی کاربر مانند مبدا، مقصد و تاریخ درخواست رزرو پرواز استفاده کنید. این رویکرد ماژولار به شما امکان می‌دهد بر منطق سطح بالاتر تمرکز کنید.

### استفاده از ابزارهای همکاری

چارچوب‌هایی مانند Microsoft Agent Framework امکان ایجاد چندین عامل را فراهم می‌کنند که می‌توانند با هم کار کنند.

**چگونه تیم‌ها می‌توانند از این استفاده کنند**: تیم‌ها می‌توانند عوامل را با نقش‌ها و وظایف خاص طراحی کنند تا بتوانند جریان‌های کاری تعاملی را تست و بهبود بخشند و کارایی کلی سیستم را افزایش دهند.

**چگونه در عمل کار می‌کند**: می‌توانید تیمی از عوامل بسازید که هر عامل عملکرد تخصصی داشته باشد، مانند بازیابی داده، تحلیل یا تصمیم‌گیری. این عوامل می‌توانند ارتباط برقرار کرده و اطلاعات را به اشتراک بگذارند تا هدف مشترکی مانند پاسخ به یک پرسش کاربر یا انجام وظیفه را محقق کنند.

**نمونه کد (Microsoft Agent Framework)**:

```python
# ایجاد چندین عامل که با هم با استفاده از چارچوب عامل مایکروسافت کار می‌کنند

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# عامل بازیابی داده
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# عامل تحلیل داده
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# اجرای عوامل به صورت متوالی روی یک کار
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

چیزی که در کد قبلی می‌بینید این است که چگونه می‌توانید یک وظیفه ایجاد کنید که شامل چندین عامل برای همکاری در تحلیل داده‌ها باشد. هر عامل عملکرد خاصی دارد و وظیفه با هماهنگی عوامل برای رسیدن به نتیجه مطلوب اجرا می‌شود. با ایجاد عوامل اختصاصی با نقش‌های تخصصی، می‌توانید کارایی و عملکرد وظیفه را بهبود بخشید.

### یادگیری در زمان واقعی

چارچوب‌های پیشرفته قابلیت‌هایی برای درک زمینه به طور بلادرنگ و سازگاری فراهم می‌کنند.

**چگونه تیم‌ها می‌توانند از این استفاده کنند**: تیم‌ها می‌توانند حلقه‌های بازخورد پیاده‌سازی کنند که در آن عوامل از تعاملات یاد می‌گیرند و رفتار خود را به طور پویا تنظیم می‌کنند، که منجر به بهبود مداوم و اصلاح قابلیت‌ها می‌شود.

**چگونه در عمل کار می‌کند**: عوامل می‌توانند بازخورد کاربران، داده‌های محیطی و نتایج وظایف را تحلیل کنند تا دانش خود را به‌روزرسانی کرده، الگوریتم‌های تصمیم‌گیری را تنظیم و عملکرد را در طول زمان بهبود بخشند. این فرایند یادگیری تکراری به عوامل اجازه می‌دهد تا با شرایط متغیر و ترجیحات کاربران سازگار شوند و اثربخشی کلی سیستم را افزایش دهند.

## تفاوت‌های بین Microsoft Agent Framework و Microsoft Foundry Agent Service چیست؟

راه‌های مختلفی برای مقایسه این رویکردها وجود دارد، اما بیایید به برخی تفاوت‌های کلیدی در طراحی، قابلیت‌ها و موارد کاربرد هدف آنها نگاه کنیم:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework یک SDK ساده شده برای ساخت عامل‌های هوش مصنوعی با استفاده از `FoundryChatClient` ارائه می‌دهد. این امکان را برای توسعه‌دهندگان فراهم می‌کند تا عامل‌هایی ایجاد کنند که از مدل‌های Azure OpenAI با امکانات فراخوانی ابزار داخلی، مدیریت مکالمه و امنیت سازمانی از طریق هویت Azure بهره‌ می‌برند.

**موارد کاربرد**: ساخت عامل‌های هوش مصنوعی آماده تولید با استفاده از ابزار، جریان‌های کاری چندمرحله‌ای و سناریوهای یکپارچه‌سازی سازمانی.

در اینجا برخی مفاهیم اصلی Microsoft Agent Framework ذکر شده است:

- **عوامل**. یک عامل با `FoundryChatClient` ساخته می‌شود و با نام، دستورالعمل‌ها و ابزارهای مشخص پیکربندی می‌گردد. عامل می‌تواند:
  - **پیام‌های کاربر را پردازش کرده** و پاسخ با استفاده از مدل‌های Azure OpenAI ایجاد کند.
  - **ابزارها را به طور خودکار بر اساس زمینه مکالمه فراخوانی کند.**
  - **وضعیت مکالمه را در چندین تعامل حفظ کند.**

  در اینجا یک قطعه کد است که نحوه ایجاد یک عامل را نشان می‌دهد:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **ابزارها**. چارچوب از تعریف ابزارها به عنوان توابع پایتون که عامل می‌تواند به طور خودکار آنها را فراخوانی کند پشتیبانی می‌کند. ابزارها هنگام ایجاد عامل ثبت می‌شوند:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **هماهنگی چندعاملی**. شما می‌توانید چندین عامل با تخصص‌های مختلف ایجاد کرده و کار آنها را هماهنگ کنید:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **یکپارچگی هویت Azure**. چارچوب از `AzureCliCredential` (یا `DefaultAzureCredential`) برای احراز هویت امن و بدون نیاز به کلید، حذف نیاز به مدیریت مستقیم کلید API استفاده می‌کند.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service افزودنی جدیدتری است که در Microsoft Ignite 2024 معرفی شده است. این سرویس امکان توسعه و استقرار عامل‌های هوش مصنوعی با مدل‌های انعطاف‌پذیرتری مانند فراخوانی مستقیم مدل‌های متن‌باز LLM مانند Llama 3، Mistral و Cohere را فراهم می‌کند.

Microsoft Foundry Agent Service مکانیزم‌های امنیتی قوی‌تر و روش‌های ذخیره‌سازی داده مناسب برای برنامه‌های سازمانی را ارائه می‌دهد.

این سرویس به طور یکپارچه با Microsoft Agent Framework برای ساخت و استقرار عوامل کار می‌کند.

این سرویس در حال حاضر در پیش‌نمایش عمومی بوده و از پایتون و C# برای ساخت عوامل پشتیبانی می‌کند.

با استفاده از کتابخانه SDK پایتون Microsoft Foundry Agent Service می‌توانیم عاملی با ابزاری تعریف شده توسط کاربر ایجاد کنیم:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# تعریف توابع ابزار
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### مفاهیم کلیدی

Microsoft Foundry Agent Service دارای مفاهیم کلیدی زیر است:

- **عامل**. Microsoft Foundry Agent Service با Microsoft Foundry ادغام شده است. در Microsoft Foundry، یک عامل هوش مصنوعی مانند یک میکروسرویس "هوشمند" عمل می‌کند که می‌توان از آن برای پاسخ به سوالات (RAG)، انجام اقدامات یا خودکارسازی کامل جریان‌های کاری استفاده کرد. این امر با ترکیب قدرت مدل‌های تولیدی هوش مصنوعی با ابزارهایی که به آن اجازه دسترسی و تعامل با منابع داده دنیای واقعی را می‌دهند، محقق می‌شود. در اینجا یک نمونه عامل آورده شده است:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    در این نمونه، عاملی با مدل `gpt-4.1-mini`، نام `my-agent` و دستورالعمل‌های `You are helpful agent` ایجاد شده است. عامل با ابزارها و منابعی برای انجام وظایف تفسیر کد مجهز شده است.

- **رشته و پیام‌ها**. رشته (thread) مفهوم مهم دیگر است. این نشان‌دهنده یک مکالمه یا تعامل بین عامل و کاربر است. رشته‌ها می‌توانند برای پیگیری پیشرفت مکالمه، ذخیره اطلاعات زمینه و مدیریت وضعیت تعامل مورد استفاده قرار گیرند. در اینجا نمونه‌ای از یک رشته آمده است:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # درخواست از عامل برای انجام کار بر روی رشته
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # واکشی و ثبت تمام پیام‌ها برای مشاهده پاسخ عامل
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    در کد قبلی، یک رشته ایجاد شده است. سپس پیامی به رشته ارسال می‌شود. با فراخوانی `create_and_process_run`، از عامل خواسته می‌شود روی رشته کار کند. در نهایت پیام‌ها دریافت و ثبت می‌شوند تا پاسخ عامل دیده شود. پیام‌ها نشان‌دهنده پیشرفت مکالمه بین کاربر و عامل هستند. همچنین مهم است که بدانید پیام‌ها می‌توانند انواع مختلفی مانند متن، تصویر یا فایل داشته باشند، به عنوان مثال کار عامل ممکن است نتیجه یک تصویر یا پاسخ متنی باشد. به عنوان توسعه‌دهنده، می‌توانید از این اطلاعات برای پردازش بیشتر پاسخ یا نمایش آن به کاربر استفاده کنید.

- **ادغام با Microsoft Agent Framework**. Microsoft Foundry Agent Service به طور روان با Microsoft Agent Framework کار می‌کند، به این معنی که می‌توانید با `FoundryChatClient` عوامل بسازید و آنها را از طریق این سرویس برای سناریوهای تولیدی مستقر کنید.

**موارد کاربرد**: Microsoft Foundry Agent Service برای برنامه‌های سازمانی طراحی شده است که نیاز به استقرار ایمن، مقیاس‌پذیر و انعطاف‌پذیر عامل‌های هوش مصنوعی دارند.

## تفاوت این رویکردها چیست؟
 
به نظر می‌رسد همپوشانی وجود دارد، اما تفاوت‌های کلیدی در طراحی، قابلیت‌ها و موارد کاربرد آنها وجود دارد:
 
- **Microsoft Agent Framework (MAF)**: یک SDK آماده تولید برای ساخت عامل‌های هوش مصنوعی است. API ساده‌ای برای ایجاد عوامل با امکان فراخوانی ابزار، مدیریت مکالمه و یکپارچگی هویت Azure ارائه می‌کند.
- **Microsoft Foundry Agent Service**: یک پلتفرم و سرویس استقرار در Microsoft Foundry برای عوامل است. اتصال داخلی به سرویس‌هایی مانند Azure OpenAI، Azure AI Search، Bing Search و اجرای کد را ارائه می‌دهد.
 
هنوز مطمئن نیستید کدام را انتخاب کنید؟

### موارد کاربرد
 
بیایید ببینیم آیا می‌توانیم با مرور برخی موارد رایج به شما کمک کنیم:
 
> سوال: من در حال ساخت برنامه‌های عامل هوش مصنوعی آماده تولید هستم و می‌خواهم سریع شروع کنم.
>

> پاسخ: Microsoft Agent Framework انتخاب خوبی است. این چارچوب API ساده و پایتونی از طریق `FoundryChatClient` ارائه می‌دهد که به شما اجازه می‌دهد عوامل با ابزار و دستورات فقط در چند خط کد تعریف کنید.

> سوال: من نیاز به استقرار سازمانی با یکپارچگی Azure مانند جستجو و اجرای کد دارم.
>
> پاسخ: Microsoft Foundry Agent Service بهترین گزینه است. این سرویس پلتفرمی امکانات داخلی برای چندین مدل، Azure AI Search، Bing Search و Azure Functions ارائه می‌دهد. این سرویس ساخت عوامل شما در Foundry Portal و استقرار آنها در مقیاس را ساده می‌کند.
 
> سوال: من هنوز سردرگمم، فقط یک گزینه به من بده.
>
> پاسخ: با Microsoft Agent Framework شروع کنید برای ساخت عوامل خود، سپس زمانی که نیاز به استقرار و مقیاس‌بندی در تولید داشتید، از Microsoft Foundry Agent Service استفاده کنید. این روش به شما اجازه می‌دهد به سرعت منطق عامل خود را تکرار کنید و در عین حال مسیر واضحی برای استقرار سازمانی داشته باشید.
 
بیایید تفاوت‌های کلیدی را در یک جدول خلاصه کنیم:

| چارچوب | تمرکز | مفاهیم کلیدی | موارد کاربرد |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK ساده شده عامل با فراخوانی ابزار | عوامل، ابزارها، هویت Azure | ساخت عامل‌های هوش مصنوعی، استفاده از ابزار، جریان‌های کاری چندمرحله‌ای |
| Microsoft Foundry Agent Service | مدل‌های انعطاف‌پذیر، امنیت سازمانی، تولید کد، فراخوانی ابزار | ماژولار بودن، همکاری، هماهنگی فرایند | استقرار عامل‌های هوش مصنوعی ایمن، مقیاس‌پذیر و انعطاف‌پذیر |

## آیا می‌توانم ابزارهای موجود در اکوسیستم Azure خود را مستقیماً ادغام کنم یا نیاز به راه‌حل‌های مستقل دارم؟


پاسخ بله است، شما می‌توانید ابزارهای موجود در اکوسیستم Azure خود را به‌طور مستقیم با سرویس Microsoft Foundry Agent ادغام کنید، به‌ویژه که این سرویس به‌گونه‌ای ساخته شده است که به‌شکل بی‌درز با سایر سرویس‌های Azure کار کند. به‌عنوان مثال می‌توانید Bing، جستجوی Azure AI و Azure Functions را ادغام کنید. همچنین ادغام عمیقی با Microsoft Foundry وجود دارد.

چارچوب Microsoft Agent همچنین از طریق `FoundryChatClient` و شناسایی Azure با خدمات Azure ادغام می‌شود که به شما امکان می‌دهد مستقیماً از ابزارهای عامل خود سرویس‌های Azure را فراخوانی کنید.

## نمونه کدها

- Python: [چارچوب عامل (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [چارچوب عامل (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [چارچوب عامل](./code_samples/02-dotnet-agent-framework.md)

## سوالات بیشتری درباره چارچوب‌های عامل هوش مصنوعی دارید؟

به [Discord مایکروسافت فاندری](https://discord.com/invite/ATgtXmAS5D) بپیوندید تا با سایر یادگیرندگان ملاقات کنید، در ساعات کاری شرکت کنید و سوالات هوش مصنوعی عامل خود را پاسخ بگیرید.

## منابع

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">سرویس عامل Azure</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">چارچوب عامل مایکروسافت - پاسخ‌های Azure OpenAI</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">سرویس عامل Microsoft Foundry</a>

## درس قبلی

[مقدمه‌ای بر عوامل هوش مصنوعی و کاربردهای عامل](../01-intro-to-ai-agents/README.md)

## درس بعدی

[درک الگوهای طراحی عامل‌گرا](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->