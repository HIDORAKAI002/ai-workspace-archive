# توسعه سرویس عامل Microsoft Foundry

در این تمرین، شما از ابزارهای سرویس عامل Microsoft Foundry در [پرتال Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) استفاده می‌کنید تا یک عامل برای رزرو پرواز ایجاد کنید. این عامل قادر خواهد بود با کاربران تعامل کند و اطلاعاتی درباره پروازها ارائه دهد.

## پیش‌نیازها

برای تکمیل این تمرین، به موارد زیر نیاز دارید:
1. یک حساب Azure با اشتراک فعال. [به صورت رایگان حساب ایجاد کنید](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. شما باید مجوزهای ایجاد هاب Microsoft Foundry را داشته باشید یا شخصی برای شما آن را ایجاد کرده باشد.
    - اگر نقش شما Contributor یا Owner است، می‌توانید مراحل این آموزش را دنبال کنید.

## ایجاد هاب Microsoft Foundry

> **توجه:** Microsoft Foundry قبلاً با نام Azure AI Studio شناخته می‌شد.

1. دستورالعمل‌های موجود در پست بلاگ [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) را برای ایجاد یک هاب Microsoft Foundry دنبال کنید.
2. وقتی پروژه شما ایجاد شد، هر نکته‌ای که نمایش داده می‌شود را ببندید و صفحه پروژه را در پرتال Microsoft Foundry بررسی کنید که باید شبیه تصویر زیر باشد:

    ![Microsoft Foundry Project](../../../translated_images/fa/azure-ai-foundry.88d0c35298348c2f.webp)

## استقرار یک مدل

1. در پنل سمت چپ پروژه خود، در بخش **دارایی‌های من**، صفحه **مدل‌ها + نقاط پایانی** را انتخاب کنید.
2. در صفحه **مدل‌ها + نقاط پایانی**، در تب **استقرار مدل‌ها**، از منوی **+ استقرار مدل** گزینه **استقرار مدل پایه** را انتخاب کنید.
3. مدل `gpt-4.1-mini` را در لیست جستجو کنید، سپس آن را انتخاب کرده و تأیید کنید.

    > **توجه**: کاهش TPM کمک می‌کند تا از استفاده بیش از حد سهمیه موجود در اشتراک خود جلوگیری کنید.

    ![Model Deployed](../../../translated_images/fa/model-deployment.3749c53fb81e18fd.webp)

## ایجاد یک عامل

حال که یک مدل را مستقر کرده‌اید، می‌توانید یک عامل ایجاد کنید. یک عامل مدلی از هوش مصنوعی گفتگو محور است که برای تعامل با کاربران استفاده می‌شود.

1. در پنل سمت چپ پروژه خود، در بخش **ساخت و سفارشی‌سازی**، صفحه **عوامل** را انتخاب کنید.
2. روی **+ ایجاد عامل** کلیک کنید تا یک عامل جدید ایجاد شود. در کادر گفتگوی **راه‌اندازی عامل**:
    - نامی برای عامل وارد کنید، مانند `FlightAgent`.
    - مطمئن شوید که استقرار مدل `gpt-4.1-mini` که قبلاً ایجاد کرده‌اید انتخاب شده باشد.
    - دستورالعمل‌ها را بر اساس راهنمایی که می‌خواهید عامل دنبال کند، تنظیم کنید. در اینجا یک نمونه آمده است:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> برای یک راهنمایی دقیق‌تر، می‌توانید به [این مخزن](https://github.com/ShivamGoyal03/RoamMind) برای اطلاعات بیشتر مراجعه کنید.
    
> علاوه بر این، می‌توانید برای افزایش قابلیت‌های عامل برای ارائه اطلاعات بیشتر و انجام کارهای خودکار بر اساس درخواست‌های کاربر، **پایگاه دانش** و **عملیات** اضافه کنید. برای این تمرین، می‌توانید این مراحل را رد کنید.
    
![Agent Setup](../../../translated_images/fa/agent-setup.9bbb8755bf5df672.webp)

3. برای ایجاد یک عامل چندهوش مصنوعی جدید، فقط روی **عامل جدید** کلیک کنید. عامل تازه ایجاد شده سپس در صفحه عوامل نمایش داده خواهد شد.


## آزمایش عامل

پس از ایجاد عامل، می‌توانید آن را آزمایش کنید تا ببینید چگونه به پرسش‌های کاربران در محیط آزمایش Microsoft Foundry پاسخ می‌دهد.

1. در بالای پنل **راه‌اندازی** برای عامل خود، گزینه **آزمایش در محیط آزمایش** را انتخاب کنید.
2. در پنل **محیط آزمایش**، می‌توانید با تایپ پرسش‌ها در پنجره گفتگو با عامل تعامل کنید. به عنوان مثال، می‌توانید از عامل بخواهید پروازهایی از سیاتل به نیویورک در تاریخ 28ام جستجو کند.

    > **توجه**: ممکن است عامل پاسخ‌های دقیقی ارائه ندهد، زیرا در این تمرین داده‌های زمان واقعی استفاده نمی‌شوند. هدف از این کار آزمایش توانایی عامل برای درک و پاسخ به پرسش‌های کاربران بر اساس دستورالعمل‌های داده شده است.

    ![Agent Playground](../../../translated_images/fa/agent-playground.dc146586de715010.webp)

3. پس از آزمایش عامل، می‌توانید با افزودن مقاصد بیشتر، داده‌های آموزشی و عملیات، قابلیت‌های آن را افزایش دهید.

## پاک‌سازی منابع

وقتی آزمایش عامل را به پایان رساندید، می‌توانید برای جلوگیری از هزینه‌های اضافی، آن را حذف کنید.
1. وارد [پرتال Azure](https://portal.azure.com) شوید و محتوای گروه منابعی که هاب و منابع مورد استفاده در این تمرین را در آن مستقر کرده‌اید، مشاهده کنید.
2. در نوار ابزار، گزینه **حذف گروه منابع** را انتخاب کنید.
3. نام گروه منابع را وارد کرده و تأیید کنید که می‌خواهید آن را حذف کنید.

## منابع

- [مستندات Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [پرتال Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [شروع به کار با Microsoft Foundry](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [اصول عوامل هوش مصنوعی در Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->