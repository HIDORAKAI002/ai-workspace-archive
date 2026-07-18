[![چگونه عامل‌های هوش مصنوعی خوبی طراحی کنیم](../../../translated_images/fa/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(برای مشاهده ویدیوی این درس روی تصویر بالا کلیک کنید)_

# الگوی طراحی استفاده از ابزار

ابزارها جالب هستند زیرا به عامل‌های هوش مصنوعی اجازه می‌دهند که دامنه بیشتری از قابلیت‌ها را داشته باشند. به جای اینکه عامل مجموعه محدودی از اقداماتی که می‌تواند انجام دهد داشته باشد، با افزودن یک ابزار، عامل اکنون می‌تواند دامنه وسیعی از اقدامات را انجام دهد. در این فصل، به الگوی طراحی استفاده از ابزار نگاه خواهیم کرد که توضیح می‌دهد چگونه عامل‌های هوش مصنوعی می‌توانند از ابزارهای خاصی برای رسیدن به اهداف خود استفاده کنند.

## مقدمه

در این درس به دنبال پاسخ به سوالات زیر هستیم:

- الگوی طراحی استفاده از ابزار چیست؟
- در چه مواردی می‌توان از آن استفاده کرد؟
- عناصر/بلوک‌های سازنده مورد نیاز برای پیاده‌سازی این الگو چیستند؟
- موارد ویژه‌ای که هنگام استفاده از الگوی طراحی استفاده از ابزار برای ساخت عامل‌های هوش مصنوعی قابل اعتماد باید در نظر گرفت چیست؟

## اهداف یادگیری

پس از اتمام این درس، شما قادر خواهید بود:

- تعریف الگوی طراحی استفاده از ابزار و هدف آن.
- شناسایی موارد استفاده‌ای که الگوی طراحی استفاده از ابزار در آن‌ها کاربرد دارد.
- درک عناصر کلیدی مورد نیاز برای پیاده‌سازی این الگو.
- شناخت ملاحظات برای اطمینان از قابل اعتماد بودن عامل‌های هوش مصنوعی که از این الگو استفاده می‌کنند.

## الگوی طراحی استفاده از ابزار چیست؟

**الگوی طراحی استفاده از ابزار** بر این تمرکز دارد که به مدل‌های زبانی بزرگ (LLM) قابلیت تعامل با ابزارهای خارجی برای رسیدن به اهداف خاص را بدهد. ابزارها کدهایی هستند که یک عامل می‌تواند برای انجام اقدامات آن‌ها را اجرا کند. یک ابزار می‌تواند یک تابع ساده مانند ماشین حساب باشد یا فراخوانی API به یک سرویس ثالث مانند جستجوی قیمت سهام یا پیش‌بینی آب و هوا. در زمینه عامل‌های هوش مصنوعی، ابزارها به گونه‌ای طراحی شده‌اند که توسط عامل‌ها در پاسخ به **فراخوانی‌های تابع تولید شده توسط مدل** اجرا شوند.

## در چه مواردی می‌توان از آن استفاده کرد؟

عامل‌های هوش مصنوعی می‌توانند از ابزارها برای انجام کارهای پیچیده، بازیابی اطلاعات یا اتخاذ تصمیم استفاده کنند. الگوی طراحی استفاده از ابزار اغلب در سناریوهایی که نیاز به تعامل دینامیک با سیستم‌های خارجی مانند پایگاه داده‌ها، خدمات وب یا مفسرهای کد دارند به کار می‌رود. این قابلیت برای موارد مختلفی کاربرد دارد از جمله:

- **بازیابی دینامیک اطلاعات:** عامل‌ها می‌توانند از APIها یا پایگاه‌ داده‌های خارجی برای دریافت داده‌های به‌روز استفاده کنند (مثلاً پرس‌وجو از پایگاه داده SQLite برای تحلیل داده، دریافت قیمت سهام یا اطلاعات هواشناسی).
- **اجرای کد و تفسیر:** عامل‌ها می‌توانند کد یا اسکریپت‌هایی را اجرا کنند تا مسائل ریاضی را حل کنند، گزارش تولید کنند یا شبیه‌سازی انجام دهند.
- **اتوماسیون جریان کاری:** خودکارسازی وظایف تکراری یا چند مرحله‌ای با ادغام ابزارهایی مانند زمان‌بندهای وظیفه، خدمات ایمیل یا خطوط داده.
- **پشتیبانی مشتری:** عامل‌ها می‌توانند با سیستم‌های مدیریت ارتباط با مشتری (CRM)، پلتفرم‌های تیکتینگ یا پایگاه‌های دانش تعامل داشته باشند تا سوالات کاربران را حل کنند.
- **تولید و ویرایش محتوا:** عامل‌ها می‌توانند از ابزارهایی مانند بررسی دستور زبان، خلاصه‌سازی متن یا ارزیابان ایمنی محتوا برای کمک به تولید محتوا استفاده کنند.

## عناصر/بلوک‌های سازنده مورد نیاز برای پیاده‌سازی الگوی استفاده از ابزار چیست؟

این بلوک‌های سازنده به عامل هوش مصنوعی اجازه می‌دهد که دامنه وسیعی از وظایف را انجام دهد. بیایید نگاهی به عناصر کلیدی مورد نیاز برای پیاده‌سازی الگوی طراحی استفاده از ابزار بیندازیم:

- **شمای تابع/ابزار:** تعاریف دقیق ابزارهای موجود، شامل نام تابع، هدف، پارامترهای مورد نیاز و خروجی‌های مورد انتظار. این شمای‌ها به مدل زبانی بزرگ کمک می‌کنند تا بفهمد چه ابزارهایی در دسترس است و چگونه درخواست‌های معتبر بسازد.

- **منطق اجرای تابع:** قوانین و روال‌هایی که تعیین می‌کند چه زمانی و چگونه ابزارها بر اساس نیت کاربر و زمینه مکالمه فراخوانی شوند. این ممکن است شامل ماژول‌های برنامه‌ریز، مکانیزم‌های مسیریابی یا جریان‌های شرطی باشد که استفاده از ابزار را به صورت پویا تصمیم می‌گیرد.

- **سیستم مدیریت پیام:** اجزایی که جریان مکالمه بین ورودی‌های کاربر، پاسخ‌های مدل زبانی، فراخوانی ابزار و خروجی ابزار را مدیریت می‌کنند.

- **چارچوب ادغام ابزار:** زیرساختی که عامل را به ابزارهای مختلف متصل می‌کند، چه آن‌ها توابع ساده باشند یا سرویس‌های خارجی پیچیده.

- **مدیریت خطاها و اعتبارسنجی:** مکانیزم‌هایی برای مدیریت شکست‌های اجرای ابزار، اعتبارسنجی پارامترها و کنترل پاسخ‌های غیرمنتظره.

- **مدیریت وضعیت:** ردیابی زمینه مکالمه، تعاملات قبلی با ابزارها و داده‌های پایدار برای حفظ هماهنگی در تعاملات چند مرحله‌ای.

در ادامه، به جزئیات بیشتر درباره فراخوانی تابع/ابزار می‌پردازیم.
 
### فراخوانی تابع/ابزار

فراخوانی تابع راه اصلی است که به مدل‌های زبانی بزرگ (LLM) امکان تعامل با ابزارها داده می‌شود. اغلب مشاهده خواهید کرد که کلمات «تابع» و «ابزار» به جای یکدیگر استفاده می‌شوند زیرا «توابع» (بخش‌های کد قابل استفاده مجدد) همان «ابزار»هایی هستند که عامل‌ها برای انجام وظایف استفاده می‌کنند. برای اینکه کد یک تابع فراخوانی شود، باید مدل زبانی درخواست کاربر را با توضیحات توابع مقایسه کند. برای این کار، یک شمای شامل توضیحات تمام توابع موجود به مدل زبانی ارسال می‌شود. سپس مدل زبانی تابع مناسب‌ترین برای وظیفه را انتخاب کرده و نام و آرگومان‌های آن را بازمی‌گرداند. تابع انتخاب شده فرخوانی می‌شود، پاسخ آن به مدل زبانی ارسال می‌شود و مدل از این اطلاعات برای پاسخ به درخواست کاربر استفاده می‌کند.

برای توسعه‌دهندگان که می‌خواهند فراخوانی تابع را برای عامل‌ها پیاده‌سازی کنند، به موارد زیر نیاز دارید:

1. یک مدل LLM که از فراخوانی تابع پشتیبانی کند
2. یک شمای شامل توضیحات توابع
3. کد هر تابع توضیح داده شده

برای توضیح بهتر، مثال گرفتن زمان جاری در یک شهر را بررسی می‌کنیم:

1. **راه‌اندازی یک مدل LLM که از فراخوانی تابع پشتیبانی کند:**

    همه مدل‌ها از فراخوانی تابع پشتیبانی نمی‌کنند، بنابراین مهم است بررسی کنید مدلی که استفاده می‌کنید این قابلیت را داشته باشد. <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> از فراخوانی تابع پشتیبانی می‌کند. می‌توانیم با راه‌اندازی کلاینت OpenAI روی <strong>Responses API</strong> سرویس Azure OpenAI شروع کنیم (نقطه انتهایی پایدار `/openai/v1/` — بدون نیاز به `api_version`). 

    ```python
    # مقداردهی اولیه کلاینت OpenAI برای Azure OpenAI (API پاسخ‌ها، نقطه پایان v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **ساختن شمای تابع:**

    سپس یک شمای JSON تعریف می‌کنیم که شامل نام تابع، توضیح اینکه تابع چه کاری انجام می‌دهد و نام‌ها و توضیحات پارامترهای تابع است.
    سپس این شمای را به کلاینتی که قبلاً ایجاد کردیم همراه با درخواست کاربر برای یافتن زمان در سان فرانسیسکو می‌فرستیم. نکته مهم این است که **یک فراخوانی ابزار** برگردانده می‌شود، **نه** پاسخ نهایی به سؤال. همانطور که پیش‌تر گفته شد، LLM نام تابع انتخابی برای وظیفه و آرگومان‌هایی که به آن فرستاده می‌شود را بازمی‌گرداند.

    ```python
    # توضیح عملکرد برای مدل جهت خواندن (قالب ابزار مسطح API پاسخ‌ها)
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
  
    # پیام اولیه کاربر
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # اولین فراخوانی API: از مدل بخواهید که از تابع استفاده کند
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # API پاسخ‌ها تماس‌های ابزار را به‌عنوان آیتم‌های function_call در response.output بازمی‌گرداند.
    # آنها را به گفتگو اضافه کنید تا مدل در نوبت بعدی زمینه کامل را داشته باشد.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **کد تابع لازم برای انجام کار:**

    حال که LLM تابعی که باید اجرا شود را انتخاب کرده است، کد انجام وظیفه باید پیاده‌سازی و اجرا شود.
    می‌توانیم کد دریافت زمان فعلی در پایتون را پیاده کنیم. همچنین باید کدی بنویسیم که نام و آرگومان‌ها را از response_message استخراج کند تا نتیجه نهایی به دست آید.

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
    # مدیریت فراخوانی توابع
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # بازگرداندن نتیجه ابزار به عنوان یک مورد function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # فراخوانی دوم API: دریافت پاسخ نهایی از مدل
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

فراخوانی تابع در مرکز اکثر، اگر نه همه، طراحی استفاده از ابزار عامل‌ها قرار دارد، اما پیاده‌سازی از صفر گاهی اوقات چالش‌برانگیز است.
همانطور که در [درس ۲](../../../02-explore-agentic-frameworks) یاد گرفتیم، چارچوب‌های عامل‌محور بلوک‌های از پیش ساخته شده‌ای را برای پیاده‌سازی استفاده از ابزار در اختیار ما قرار می‌دهند.
 
## مثال‌های استفاده از ابزار با چارچوب‌های عامل‌محور

در اینجا چند مثال از نحوه پیاده‌سازی الگوی طراحی استفاده از ابزار با استفاده از چارچوب‌های مختلف عامل‌محور آمده است:

### چارچوب عامل مایکروسافت

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">چارچوب عامل مایکروسافت</a> یک چارچوب متن‌باز برای ساخت عامل‌های هوش مصنوعی است. این چارچوب فرآیند فراخوانی تابع را ساده می‌کند و به شما اجازه می‌دهد ابزارها را به عنوان توابع پایتون با دکوراتور `@tool` تعریف کنید. چارچوب ارتباط رفت و برگشتی بین مدل و کد شما را مدیریت می‌کند و همچنین دسترسی به ابزارهای از پیش ساخته‌ای مانند جستجوی فایل و مفسر کد از طریق `FoundryChatClient` را فراهم می‌کند.

نمودار زیر فرآیند فراخوانی تابع در چارچوب عامل مایکروسافت را نشان می‌دهد:

![فراخوانی تابع](../../../translated_images/fa/functioncalling-diagram.a84006fc287f6014.webp)

در چارچوب عامل مایکروسافت، ابزارها به صورت توابع با دکوراتور تعریف می‌شوند. می‌توانیم تابع `get_current_time` که قبلاً دیدیم را به کمک دکوراتور `@tool` به یک ابزار تبدیل کنیم. چارچوب به طور خودکار تابع و پارامترهای آن را سریالیزه می‌کند و شمای ارسال به LLM را می‌سازد.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# ایجاد مشتری
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# یک عامل ایجاد کنید و با ابزار اجرا کنید
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### سرویس عامل مایکروسافت فاندری

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">سرویس عامل مایکروسافت فاندری</a> یک چارچوب عامل‌محور جدیدتر است که به توسعه‌دهندگان اجازه می‌دهد به صورت امن عامل‌های هوش مصنوعی با کیفیت بالا، قابل توسعه و مقیاس‌پذیر بسازند، پیاده‌سازی کنند و مدیریت کنند بدون اینکه نیاز به مدیریت منابع ذخیره‌سازی و محاسبات زیرساختی داشته باشند. این سرویس به‌ویژه برای برنامه‌های سازمانی مفید است زیرا به صورت کاملاً مدیریت شده و با امنیت سطح سازمانی ارائه می‌شود.

در مقایسه با توسعه مستقیم با API مدل زبانی بزرگ، سرویس عامل فاندری مایکروسافت مزایایی دارد که شامل:

- فراخوانی خودکار ابزار – نیازی به تجزیه یک فراخوانی ابزار، اجرای آن و مدیریت پاسخ نیست؛ همه این کارها اکنون سرور‌ساید انجام می‌شود
- داده‌های مدیریت شده به صورت امن – به جای مدیریت وضعیت مکالمه خود، می‌توانید روی رشته‌ها برای ذخیره همه اطلاعات مورد نیاز حساب کنید
- ابزارهای آماده استفاده – ابزارهایی که برای تعامل با منابع داده شما، مانند Bing، جستجوی Azure AI و Azure Functions استفاده می‌شوند.

ابزارهای موجود در سرویس عامل فاندری مایکروسافت به دو دسته تقسیم می‌شوند:

1. ابزارهای دانش:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">پایه‌گذاری با جستجوی Bing</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">جستجوی فایل</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">جستجوی Azure AI</a>

2. ابزارهای عملی:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">فراخوانی تابع</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">مفسر کد</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">ابزارهای تعریف شده توسط OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">توابع Azure</a>

سرویس عامل به ما اجازه می‌دهد این ابزارها را به صورت یک `مجموعه ابزار` با هم استفاده کنیم. همچنین از `رشته‌ها` استفاده می‌کند که تاریخچه پیام‌ها از یک مکالمه خاص را نگه می‌دارد.

تصور کنید شما یک نماینده فروش در شرکتی به نام Contoso هستید. می‌خواهید یک عامل مکالمه‌ای بسازید که بتواند به سوالات درباره داده‌های فروش شما پاسخ دهد.

تصویر زیر نشان می‌دهد چگونه می‌توانید از سرویس عامل مایکروسافت فاندری برای تحلیل داده‌های فروش خود استفاده کنید:

![سرویس عامل در عمل](../../../translated_images/fa/agent-service-in-action.34fb465c9a84659e.webp)

برای استفاده از هر یک از این ابزارها با این سرویس می‌توانیم کلاینتی ایجاد کرده و یک ابزار یا مجموعه‌ای از ابزارها تعریف کنیم. برای پیاده‌سازی این کار می‌توانیم از کد پایتون زیر استفاده کنیم. مدل زبانی بزرگ قادر خواهد بود به مجموعه ابزار نگاه کند و تصمیم بگیرد که آیا از تابع ساخته شده توسط کاربر `fetch_sales_data_using_sqlite_query` استفاده کند یا از مفسر کد پیش‌ساخته بسته به درخواست کاربر.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # تابع fetch_sales_data_using_sqlite_query که در فایل fetch_sales_data_functions.py قرار دارد.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# مقداردهی اولیه مجموعه ابزار
toolset = ToolSet()

# مقداردهی اولیه عامل فراخوانی تابع با استفاده از تابع fetch_sales_data_using_sqlite_query و افزودن آن به مجموعه ابزار
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# مقداردهی اولیه ابزار مفسر کد و افزودن آن به مجموعه ابزار
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## نکات ویژه استفاده از الگوی طراحی استفاده از ابزار برای ساخت عامل‌های هوش مصنوعی قابل اعتماد چیست؟

نگرانی رایج در مورد SQL تولید شده دینامیک توسط مدل‌های زبانی بزرگ، امنیت است، به ویژه خطر تزریق SQL یا اقدامات مخرب مانند حذف یا دستکاری پایگاه داده. در حالی که این نگرانی‌ها معتبر هستند، با پیکربندی صحیح مجوزهای دسترسی به پایگاه داده می‌توان به طور مؤثری آن‌ها را کاهش داد. برای اکثر پایگاه داده‌ها، این شامل تنظیم پایگاه داده به صورت فقط‌خواندنی است. برای سرویس‌های پایگاه داده مانند PostgreSQL یا Azure SQL، به اپلیکیشن باید نقش فقط‌خواندنی (SELECT) اختصاص داده شود.

اجرای اپلیکیشن در محیطی امن حفاظت بیشتری به همراه دارد. در سناریوهای سازمانی معمولا داده‌ها از سیستم‌های عملیاتی استخراج و تبدیل شده و در پایگاه داده یا انبار داده فقط‌خواندنی با یک شمای کاربرپسند قرار می‌گیرند. این روش اطمینان می‌دهد که داده‌ها امن، بهینه شده برای عملکرد و دسترسی بوده و اپلیکیشن دسترسی محدود شده و فقط‌خواندنی دارد.

## نمونه کدها

- پایتون: [چارچوب عامل](./code_samples/04-python-agent-framework.ipynb)
- دات‌نت: [چارچوب عامل](./code_samples/04-dotnet-agent-framework.md)

## سوالات بیشتری درباره الگوهای طراحی استفاده از ابزار دارید؟

به [Discord مایکروسافت فاندری](https://discord.com/invite/ATgtXmAS5D) بپیوندید تا با دیگر یادگیرندگان ملاقات کنید، در ساعت‌های اداری شرکت کنید و سوالات خود درباره عامل‌های هوش مصنوعی را مطرح کنید.

## منابع اضافی

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">کارگاه سرویس عامل‌های هوش مصنوعی Azure</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">کارگاه چند عاملی نویسنده خلاق Contoso</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">مرور چارچوب عامل مایکروسافت</a>


## آزمایش دود این عامل (اختیاری)

پس از یادگیری نحوه استقرار عوامل در [درس ۱۶](../16-deploying-scalable-agents/README.md)، می‌توانید عامل `TravelToolAgent` این درس را با [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) آزمایش دود کنید (آیا هنوز ابزارهایش را فرا می‌خواند و پاسخ می‌دهد؟). برای نحوه اجرای آن، به [`tests/README.md`](../tests/README.md) مراجعه کنید.

## درس قبلی

[درک الگوهای طراحی عاملی](../03-agentic-design-patterns/README.md)

## درس بعدی

[RAG عاملی](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->