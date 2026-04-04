# توسعه سرویس عامل هوش مصنوعی آزور

در این تمرین، با استفاده از ابزارهای سرویس عامل هوش مصنوعی آزور در [پرتال Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) یک عامل برای رزرو پرواز ایجاد می‌کنید. این عامل قادر خواهد بود با کاربران تعامل داشته باشد و اطلاعات مربوط به پروازها را ارائه دهد.

## پیش‌نیازها

برای تکمیل این تمرین، به موارد زیر نیاز دارید:  
۱. یک حساب آزور با اشتراک فعال. [به‌صورت رایگان حساب ایجاد کنید](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).  
۲. مجوزهای لازم برای ایجاد یک مرکز Microsoft Foundry یا اینکه یکی برای شما ایجاد شده باشد.  
 - اگر نقش شما Contributor یا Owner است، می‌توانید مراحل این آموزش را دنبال کنید.

## ایجاد مرکز Microsoft Foundry

> **توجه:** Microsoft Foundry قبلاً با نام Azure AI Studio شناخته می‌شد.

۱. این دستورالعمل‌ها را از [پست وبلاگ Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) برای ایجاد مرکز Microsoft Foundry دنبال کنید.  
۲. پس از ایجاد پروژه، هر نکته‌ای که نمایش داده می‌شود را ببندید و صفحه پروژه را در پرتال Microsoft Foundry مرور کنید، که باید مشابه تصویر زیر باشد:

    ![Microsoft Foundry Project](../../../translated_images/fa/azure-ai-foundry.88d0c35298348c2f.webp)

## استقرار یک مدل

۱. در پانل سمت چپ پروژه خود، در بخش **دارایی‌های من**، صفحه **مدل‌ها + نقاط انتهایی** را انتخاب کنید.  
۲. در صفحه **مدل‌ها + نقاط انتهایی**، در تب **استقرار مدل‌ها**، در منوی **+ استقرار مدل**، گزینه **استقرار مدل پایه** را انتخاب کنید.  
۳. مدل `gpt-4o-mini` را در لیست جستجو کنید، سپس آن را انتخاب و تأیید کنید.

    > **توجه**: کاهش TPM به جلوگیری از استفاده بیش از حد از سهمیه موجود در اشتراک مورد استفاده کمک می‌کند.

    ![Model Deployed](../../../translated_images/fa/model-deployment.3749c53fb81e18fd.webp)

## ایجاد یک عامل

حال که مدل را مستقر کرده‌اید، می‌توانید یک عامل ایجاد کنید. عامل یک مدل هوش مصنوعی مکالمه‌ای است که می‌توان از آن برای تعامل با کاربران استفاده کرد.

۱. در پانل سمت چپ پروژه، در بخش **ساخت و سفارشی‌سازی**، صفحه **عوامل** را انتخاب کنید.  
۲. روی **+ ایجاد عامل** کلیک کنید تا یک عامل جدید بسازید. در کادر گفتگوی **راه‌اندازی عامل**:  
 - یک نام برای عامل وارد کنید، مانند `FlightAgent`.  
 - مطمئن شوید که استقرار مدل `gpt-4o-mini` که قبلاً ساخته‌اید انتخاب شده باشد.  
 - **دستورالعمل‌ها** را مطابق با راهنمایی که می‌خواهید عامل دنبال کند، تنظیم کنید. در اینجا یک نمونه وجود دارد:  
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
> برای دریافت راهنمایی جامع، می‌توانید [این مخزن](https://github.com/ShivamGoyal03/RoamMind) را برای کسب اطلاعات بیشتر بررسی کنید.  
> همچنین می‌توانید برای افزایش قابلیت‌های عامل در ارائه اطلاعات بیشتر و انجام خودکار وظایف بر اساس درخواست‌های کاربر، **پایگاه دانش** و **عملیات** اضافه کنید. برای این تمرین می‌توانید این مراحل را رد کنید.

![Agent Setup](../../../translated_images/fa/agent-setup.9bbb8755bf5df672.webp)

۳. برای ایجاد یک عامل چندهوش مصنوعی جدید، کافیست روی **عامل جدید** کلیک کنید. عامل تازه ایجاد شده سپس در صفحه عوامل نمایش داده می‌شود.

## آزمایش عامل

پس از ایجاد عامل، می‌توانید آن را آزمایش کنید تا ببینید چگونه به پرسش‌های کاربر در محیط آزمایش پرتال Microsoft Foundry پاسخ می‌دهد.

۱. در بالای پانل **راه‌اندازی** برای عامل خود، گزینه **آزمایش در محیط اجرا** را انتخاب کنید.  
۲. در پانل **محیط اجرا**، می‌توانید با تایپ سوالات در پنجره چت با عامل تعامل داشته باشید. به عنوان مثال، می‌توانید از عامل بخواهید پروازهایی از سیاتل به نیویورک در روز ۲۸ام را جستجو کند.

    > **توجه**: ممکن است عامل پاسخ‌های دقیقی ارائه نکند، چون در این تمرین داده‌های واقعی به صورت زنده استفاده نمی‌شود. هدف بررسی توانایی عامل در درک و پاسخ به پرسش‌های کاربران بر اساس دستورالعمل‌های ارائه شده است.

    ![Agent Playground](../../../translated_images/fa/agent-playground.dc146586de715010.webp)

۳. پس از آزمایش عامل، می‌توانید با افزودن مقاصد بیشتر، داده‌های آموزشی و عملیات، قابلیت‌های آن را بیشتر سفارشی کنید.

## پاک‌سازی منابع

زمانی که آزمون عامل را به پایان رساندید، می‌توانید برای جلوگیری از هزینه‌های اضافی، آن را حذف کنید.  
۱. [پرتال آزور](https://portal.azure.com) را باز کنید و محتوای گروه منابعی را که منابع مرکز را در آن مستقر کرده‌اید، مشاهده کنید.  
۲. در نوار ابزار، **حذف گروه منابع** را انتخاب کنید.  
۳. نام گروه منابع را وارد کرده و تأیید کنید که می‌خواهید آن را حذف کنید.

## منابع

- [مستندات Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)  
- [پرتال Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)  
- [شروع کار با Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)  
- [مبانی عوامل هوش مصنوعی در آزور](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)  
- [دی‌اس‌سی‌اُرد آزور AI](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:  
این سند با استفاده از سرویس ترجمه‌ی هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما تلاش می‌کنیم دقت را حفظ کنیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی اشتباهات یا نواقصی باشند. سند اصلی به زبان بومی آن به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما مسئولیتی در قبال هرگونه سوءتفاهم یا تفسیر نادرست ناشی از استفاده از این ترجمه نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->