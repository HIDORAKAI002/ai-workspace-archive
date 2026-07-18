# گزارش تغییرات

تمامی تغییرات مهم دوره **عامل‌های هوش مصنوعی برای مبتدیان** در این فایل مستند شده‌اند.

## [منتشر شده] — ۲۰۲۶-۰۷-۱۳

این نسخه دو درس جدید اضافه می‌کند که قوس استقرار را تکمیل می‌کنند — مقیاس‌پذیر کردن عامل‌ها تا Microsoft Foundry و کاهش به یک ایستگاه کاری — به همراه یک خط لوله تست دود، ناوبری تازه‌شده دوره، مهارت‌های جدید یادگیرنده و برندینگ به‌روزرسانی‌شده.

### اضافه‌شده

- **درس ۱۶ — استقرار عامل‌های مقیاس‌پذیر با Microsoft Foundry.** درس جدید [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) و دفترچه قابل اجرا [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) که یک عامل پشتیبانی مشتری تولیدی می‌سازد (ابزارها، RAG، حافظه، مسیریابی مدل، کش پاسخ، تایید انسانی، دروازه ارزیابی و ردیابی OpenTelemetry)، با نمودارهای Mermaid برای توسعه/استقرار/زمان اجرا، چک دانش، تمرین و چالش.
- **درس ۱۷ — ایجاد عامل‌های هوش مصنوعی محلی با Foundry Local و Qwen.** درس جدید [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) و دفترچه [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) ساخت یک دستیار مهندسی کاملاً روی دستگاه (فراخوانی تابع Qwen از طریق Foundry Local، ابزارهای فایل sandbox شده، RAG محلی با Chroma، MCP محلی اختیاری)، با نمودارهای فقط محلی / RAG محلی / فراخوانی ابزار، چک دانش، تمرین و چالش.
- **خط لوله تست دود.** گردش کار جدید [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) علاوه بر کتابخانه‌های درسی در [tests/](./tests/README.md) برای عامل‌های قابل استقرار در دروس ۰۱، ۰۴، ۰۵ و ۱۶، به همراه README نمایه‌ای که هر کتابخانه را به درس و نام میزبان آن عامل نگاشت می‌دهد. درس ۱۶ بخش «اعتبارسنجی عامل مستقر شده با تست دود» را اضافه کرده؛ دروس ۰۱/۰۴/۰۵ اشاره‌گر تست دود اختیاری دارند.
- **مهارت‌های یادگیرنده.** مهارت‌های جدید Agent Skills زیر `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)، [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (پوشش راهنمایی دروس ۱۶ و ۱۷)، و [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (روش اعتبارسنجی نمونه‌های دفترچه مقابل یک راه‌اندازی Microsoft Foundry / Azure OpenAI زنده).
- **راننده اعتبارسنجی دفترچه‌ها.** اسکریپت جدید [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) که هر دفترچه پایتون را بدون سر اجرا می‌کند با `nbconvert` و یک ماتریس قبولی/رد چاپ می‌کند (به‌علاوه `results.json`). محل ریشه ریپوزیتوری و پایتون را خودکار تشخیص می‌دهد، دفترچه‌های غیر دوره‌ای (`.venv`، `site-packages`، `translations`، دارایی قالب مهارت) و دفترچه‌های `.NET` را به‌طور پیش‌فرض حذف می‌کند، و گزینه‌های `-Filter`، `-Timeout`، `-List`، `-IncludeDotnet` و `-Python` را پشتیبانی می‌کند.
- **ناوبری دوره.** لینک‌های درس قبلی/بعدی به دروس ۱۱ تا ۱۵ افزوده شدند (که قبلاً نبودند) تا کل دوره در هر دو جهت زنجیره ۰۰ → ۱۸ شود.
- **تصاویر بندانگشتی جدید.** تصاویر بندانگشتی دروس ۱۶ و ۱۷، به‌علاوه عکس اجتماعی تازه‌شده مخزن [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (که اکنون دو درس جدید و URL `aka.ms/ai-agents-beginners` را تبلیغ می‌کند).
- **وابستگی‌ها** ([requirements.txt](../../requirements.txt)): افزودن `foundry-local-sdk` و `chromadb` برای درس ۱۷.

### تغییر یافته

- **جدول درسی [README.md](./README.md) اصلی:** دروس ۱۶ و ۱۷ اکنون به محتوایشان لینک دارند (قبلاً «به زودی می‌آید» بود)؛ تصویر مخزن به `repo-thumbnailv3.png` به‌روزرسانی شد.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md):** دروس ۱۶ و ۱۷ به راهنمای درس به درس و مسیرهای یادگیری اضافه شدند و بخش «اعتبارسنجی عامل‌های مستقر شده با تست دود» افزوده شد.
- **[AGENTS.md](./AGENTS.md):** تعداد درس‌ها/توضیحات به‌روزرسانی شد (۰۰–۱۸)، بخش اعتبارسنجی تست دود اضافه شد و نمونه‌های نام‌گذاری درس ۱۶/۱۷ افزوده شد.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md):** «درس قبلی» اکنون به درس ۱۷ اشاره می‌کند (قبلاً درس ۱۵ بود) و زنجیره را می‌بندد.
- **ارجاعات به مدل استاندارد شدند روی مدل‌های غیرمنسوخ.** همه ارجاعات `gpt-4o` / `gpt-4o-mini` در کل دوره (راهنما، `.env.example`، دفترچه‌ها و نمونه‌های پایتون/.NET) با `gpt-4.1-mini` جایگزین شدند — `gpt-4o` (تمام نسخه‌ها) در ۲۰۲۶ بازنشسته می‌شود. نمونه مسیریابی مدل در درس ۱۶ همچنان کنتراست کوچک/بزرگ را با `gpt-4.1-mini` (کوچک) و `gpt-4.1` (بزرگ) حفظ می‌کند. دفترچه‌های پایتون اکنون مدل را از متغیرهای محیطی (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) انتخاب می‌کنند به جای کدگذاری سخت مدل.

### یادداشت‌ها و محدودیت‌های شناخته‌شده

- **در برابر Azure زنده اجرا نشده‌اند.** دفترچه‌های دروس جدید نمونه‌های آموزشی هستند؛ آنها را روی راه‌اندازی Microsoft Foundry / Foundry Local خود اجرا و اعتبارسنجی کنید. گردش کار تست دود نیاز دارد عامل درس مستقر شود و اسرار OIDC Azure (`AZURE_CLIENT_ID`، `AZURE_TENANT_ID`، `AZURE_SUBSCRIPTION_ID`) با نقش **Azure AI User** در محدوده پروژه Foundry پیکربندی شود.
- **درس ۱۷ فقط محلی است.** Endpoint پاسخ Foundry ندارد، بنابراین اقدام تست دود اعمال نمی‌شود؛ آن را با اجرای دفترچه روی ایستگاه کاری خود اعتبارسنجی کنید.

## [منتشر شده] — ۲۰۲۶-۰۷-۰۶

این نسخه دوره را به **API پاسخ‌های Azure OpenAI** منتقل می‌کند، نام محصول را روی **Microsoft Foundry** و **Microsoft Agent Framework (MAF)** استاندارد می‌کند، GitHub Models را بازنشسته می‌کند، نسخه‌های SDK را به‌روزرسانی می‌کند و محتوای جدیدی در مورد مدل‌های محلی و میزبانی سایر فریمورک‌ها روی Foundry اضافه می‌کند.

### اضافه‌شده

- **مهارت مهاجرت** — مهارت عامل [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) از [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses) در `.agents/skills/` نصب شد، شامل ارجاعات و اسکریپت اسکنر.
- **Foundry Local (اجرای مدل‌ها روی دستگاه)** — بخش جدید "ارائه‌دهنده جایگزین: Foundry Local" در [00-course-setup/README.md](./00-course-setup/README.md) که نصب (`winget` / `brew`)، `foundry model run`، `foundry-local-sdk` و اتصال `FoundryLocalManager` به Microsoft Agent Framework از طریق `OpenAIChatClient` را پوشش می‌دهد.
- **میزبانی عامل‌های LangChain / LangGraph روی Microsoft Foundry** — بخش جدیدی در [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) به همراه نمونه قابل اجرا [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) که از `langchain-azure-ai[hosting]` و `ResponsesHostServer` (پروتکل `/responses`) استفاده می‌کند، بر اساس [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — بخش جدید "مثال دنیای واقعی: Microsoft Project Opال" در [15-browser-use/README.md](./15-browser-use/README.md) که Opal را به‌عنوان یک عامل استفاده کامپیوتری سازمانی چارچوب‌بندی می‌کند و آن را به مفاهیم دوره نگاشت می‌دهد (انسان در حلقه، اعتماد/امنیت، برنامه‌ریزی، مهارت‌ها).
- **نمونه دوم پایتون درس ۰۲** — افزودن [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (ببینید "تغییرات" — مهاجرت از دفترچه Semantic Kernel سابق) و لینک دادن آن در README درس.
- بخش «مدل‌ها و ارائه‌دهندگان» به [STUDY_GUIDE.md](./STUDY_GUIDE.md) اضافه شد.

### تغییر یافته

- **چت کامپلیشن‌ها → API پاسخ‌ها (پایتون).** نمونه‌هایی که مستقیم مدل را صدا می‌زدند از Chat Completions به API پاسخ‌ها مهاجرت کردند (`client.responses.create(input=..., store=False)`, `resp.output_text`)، با استفاده از کلاینت `OpenAI` مقابل Endpoint پایدار Azure OpenAI `/openai/v1/` (بدون نسخه API). نمونه‌های مربوط:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — راهنمای کامل فراخوانی تابع (اسکیمای ابزار به فرمت Responses تخت شده، نتایج ابزار به‌صورت `function_call_output`، `max_output_tokens` و غیره بازگردانده می‌شود).
- **GitHub Models → Azure OpenAI.** GitHub Models منسوخ است (در حال بازنشسته شدن در **ژوئیه ۲۰۲۶**) و از API پاسخ‌ها پشتیبانی نمی‌کند. تمام مسیرهای کد GitHub Models به Azure OpenAI / Microsoft Foundry در نمونه‌های پایتون و .NET تبدیل شدند:
  - پایتون: دفترچه‌های کاری درس ۰۸ (`01`–`03`)، درس ۱۴ (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` فایل‌های `*-dotnet-agent-framework.cs` + مستندات همراه `.md`؛ و دفترچه‌های کاری .NET درس ۰۸/`.md` (`01`–`03`) اکنون از `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` با `AzureCliCredential` استفاده می‌کنند.
- **Semantic Kernel → Microsoft Agent Framework.** دفترچه `02-semantic-kernel.ipynb` سابق بازنویسی شد تا از Microsoft Agent Framework با Azure OpenAI (API پاسخ‌ها) استفاده کند و به `02-python-agent-framework-azure-openai.ipynb` تغییر نام داد.
- **استانداردسازی بر اساس `FoundryChatClient` + `as_agent`.** README و کد دفترچه که `AzureAIProjectAgentProvider` را ارجاع می‌داد، روی الگوی رایج درس ۰۱ و نمونه‌های خود فریمورک متمرکز شدند: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` با `provider.as_agent(...)`. این تغییر در README‌ها و دفترچه‌های دروس ۰۲–۱۴ اعمال شد (مثلاً حافظه درس ۱۳، تمام دفترچه‌های درس ۱۴، `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **نام‌گذاری محصول.** در سراسر محتوای انگلیسی تغییر نام داده شد:
  - «Azure AI Foundry» / «Azure AI Studio» → **Microsoft Foundry**
  - «Azure AI Agent Service» → **Microsoft Foundry Agent Service**
  - (بدون تغییر: «Azure OpenAI»، «Azure AI Search»، «Azure AI Inference» و نام متغیرهای محیطی.)
- **وابستگی‌ها** ([requirements.txt](../../requirements.txt)):
  - نسخه‌های `agent-framework>=1.10.0`، `agent-framework-foundry>=1.10.0`، `agent-framework-openai>=1.10.0` ثابت شدند.
  - نسخه `openai>=1.108.1` (حداقل برای API پاسخ‌ها) ثابت شد.
  - حذف `azure-ai-inference` (که فقط توسط نمونه‌های مهاجرت‌شده GitHub Models استفاده می‌شد).
- **پیکربندی محیط** ([.env.example](../../.env.example)): متغیرهای GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) حذف شدند؛ `AZURE_OPENAI_ENDPOINT`، `AZURE_OPENAI_DEPLOYMENT` و `AZURE_OPENAI_API_KEY` اختیاری افزوده شدند؛ نام‌گذاری به Microsoft Foundry به‌روزرسانی شد.
- **مستندات** — [00-course-setup/README.md](./00-course-setup/README.md)، [AGENTS.md](./AGENTS.md)، [README.md](./README.md) و [STUDY_GUIDE.md](./STUDY_GUIDE.md) برای موارد فوق (پیکربندی متغیرهای محیط، قطعه اعتبارسنجی، راهنمای ارائه‌دهنده، نام‌گذاری) به‌روزرسانی شدند.

### حذف‌شده

- مراحل ورود به GitHub Models و متغیرهای محیط مربوط از مستندات راه‌اندازی حذف شدند (توسط Azure OpenAI / Microsoft Foundry جایگزین شدند).

### امنیت / حفظ حریم خصوصی (پاکسازی از به اشتراک‌گذاری عمومی)

- خروجی اجرای دفترچه‌های Jupyter که شناسه اشتراک واقعی **Azure**، نام گروه/منبع و شناسه اتصال Bing را نشت داده بودند، به علاوه مسیرهای فایل محلی و نام‌های کاربری توسعه‌دهنده، پاک شدند:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- تأیید شد که هیچ کلید API، نشانه، شناسه اشتراک یا مسیر شخصی در محتوای انگلیسی ردیابی شده باقی نمانده است (ارجاعات `GITHUB_TOKEN` باقی‌مانده، توکن GitHub Actions در گردش‌های کاری و PAT سرور GitHub MCP در تنظیم درس 11 هستند — هر دو قانونی و مرتبط با مدل‌های GitHub نیستند).

### یادداشت‌ها و محدودیت‌های شناخته شده

- **اجرا/کامپایل نشده‌اند.** این نمونه‌ها آموزشی هستند که برای صحت API/نام‌گذاری به‌روزرسانی شده‌اند؛ آن‌ها بر روی منابع زنده Azure اجرا نشده‌اند و نمونه‌های .NET در این محیط کامپایل نشده‌اند. اعتبارسنجی را نسبت به استقرار Microsoft Foundry / Azure OpenAI خود انجام دهید.
- **استقرار مدل باید از API پاسخ‌ها پشتیبانی کند.** از استقراری مانند `gpt-4.1-mini`، `gpt-4.1` یا مدل `gpt-5.x` استفاده کنید. مدل‌های قدیمی‌تر عملکرد اصلی پاسخ‌ها را پشتیبانی می‌کنند اما همه ویژگی‌ها را خیر.
- **نسخه Agent-framework.** نمونه‌ها هدف نسخه جدیدترین MAF (`>=1.10.0`) هستند. فراخوان استاندارد ایجاد ایجنت `client.as_agent(...)` است؛ APIها در برابر مستندات منتشر شده فریمورک و یک ساخت نصب شده بررسی شده‌اند. اگر نسخه متفاوتی تعیین می‌کنید، در دسترس بودن روش‌ها را تأیید کنید (`as_agent` یا `create_agent`).
- **دفترچه گردش کار درس 08 شماره 04** عمداً `AzureAIAgentClient` (از `agent-framework-azure-ai`) را حفظ کرده است زیرا از ابزارهای میزبانی سرویس Microsoft Foundry Agent استفاده می‌کند (بنیان بینگ، مفسر کد)؛ این قبلاً بر اساس پاسخ‌ها است.
- **استقرار پیش‌فرض .NET.** دو نمونه گردش کار dotNET درس 08 قبلاً مدل خاصی را به صورت سخت‌کد داشتند؛ اکنون به طور پیش‌فرض به `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`) ارجاع می‌دهند. اگر نمونه‌ای به ورودی چندرسانه‌ای/بینایی وابسته است، `AZURE_OPENAI_DEPLOYMENT` را به مدل مناسب تنظیم کنید.
- **Foundry Local** یک نقطه پایان OpenAI-سازگار **Chat Completions** ارائه می‌دهد و برای توسعه محلی در نظر گرفته شده است؛ از Azure OpenAI / Microsoft Foundry برای مجموعه کامل ویژگی‌های API پاسخ‌ها استفاده کنید.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->