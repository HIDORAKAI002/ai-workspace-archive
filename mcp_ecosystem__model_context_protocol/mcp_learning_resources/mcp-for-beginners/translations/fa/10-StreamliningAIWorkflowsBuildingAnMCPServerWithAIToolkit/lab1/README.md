# 🚀 ماژول ۱: اصول اولیه کیت تول Microsoft Foundry

[![مدت زمان](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![سطح سختی](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![پیش‌نیازها](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 اهداف یادگیری

تا پایان این ماژول، شما قادر خواهید بود:
- ✅ نصب و پیکربندی افزونه Microsoft Foundry Toolkit برای VS Code
- ✅ مرور کاتالوگ مدل و درک منابع مختلف مدل‌ها
- ✅ استفاده از Playground برای تست و آزمایش مدل
- ✅ ایجاد نمایندگان سفارشی هوش مصنوعی با استفاده از Agent Builder
- ✅ مقایسه عملکرد مدل‌ها در میان ارائه‌دهندگان مختلف
- ✅ اعمال بهترین روش‌ها برای مهندسی دستورها (Prompt Engineering)

## 🧠 مقدمه‌ای بر Microsoft Foundry Toolkit

**افزونه Microsoft Foundry Toolkit برای VS Code** افزونه اصلی مایکروسافت است که VS Code را به یک محیط جامع توسعه هوش مصنوعی تبدیل می‌کند. این افزونه فاصله بین پژوهش هوش مصنوعی و توسعه کاربردی را پر می‌کند و هوش مصنوعی مولد را برای توسعه‌دهندگان با هر سطح مهارتی قابل دسترسی می‌سازد.

### 🌟 قابلیت‌های کلیدی

| ویژگی | توضیح | کاربرد |
|---------|-------------|----------|
| **🗂️ کاتالوگ مدل‌ها** | دسترسی به بیش از ۱۰۰ مدل از GitHub، ONNX، OpenAI، Anthropic، گوگل | کشف و انتخاب مدل |
| **🔌 پشتیبانی BYOM** | ادغام مدل‌های خودتان (محلی/از راه دور) | استقرار مدل سفارشی |
| **🎮 Playground تعاملی** | تست مدل در زمان واقعی با رابط چت | نمونه‌سازی سریع و تست |
| **📎 پشتیبانی چندمودالیته** | پردازش متن، تصاویر و پیوست‌ها | برنامه‌های هوش مصنوعی پیچیده |
| **⚡ پردازش دسته‌ای** | اجرای همزمان چندین درخواست | جریان‌های کاری تست کارآمد |
| **📊 ارزیابی مدل** | معیارهای داخلی (F1، ارتباط، شباهت، انسجام) | ارزیابی عملکرد |

### 🎯 چرا Microsoft Foundry Toolkit اهمیت دارد

- **🚀 توسعه تسریع‌شده**: از ایده تا نمونه اولیه در چند دقیقه
- **🔄 جریان کاری متحد**: یک رابط برای چندین ارائه‌دهنده هوش مصنوعی
- **🧪 آزمایش آسان**: مقایسه مدل‌ها بدون تنظیمات پیچیده
- **📈 آماده تولید**: انتقال بی‌دردسر از نمونه اولیه به استقرار

## 🛠️ پیش‌نیازها و راه‌اندازی

### 📦 نصب افزونه Microsoft Foundry Toolkit

**گام ۱: دسترسی به بازارچه افزونه‌ها**
1. محیط Visual Studio Code را باز کنید
2. به بخش Extensions بروید (`Ctrl+Shift+X` یا `Cmd+Shift+X`)
3. دنبال "Microsoft Foundry Toolkit" بگردید

**گام ۲: نسخه خود را انتخاب کنید**
- **🟢 نسخه پایدار**: توصیه شده برای استفاده در تولید
- **🔶 نسخه پیش‌انتشار**: دسترسی اولیه به ویژگی‌های جدید

**گام ۳: نصب و فعال‌سازی**

![افزونه Microsoft Foundry Toolkit](../../../../translated_images/fa/aitkext.d28945a03eed003c.webp)

### ✅ چک‌لیست تایید نصب
- [ ] آیکون Microsoft Foundry Toolkit در نوار کناری VS Code دیده می‌شود
- [ ] افزونه فعال و روشن است
- [ ] در پنل خروجی خطای نصب وجود ندارد

## 🧪 تمرین عملی ۱: بررسی مدل‌های GitHub

**🎯 هدف**: مسلط شدن بر کاتالوگ مدل و تست اولین مدل هوش مصنوعی خود

### 📊 گام ۱: مرور کاتالوگ مدل

کاتالوگ مدل دروازه شما به اکوسیستم هوش مصنوعی است. این کاتالوگ مدل‌ها را از ارائه‌دهندگان گوناگون جمع‌آوری می‌کند تا کشف و مقایسه گزینه‌ها آسان شود.

**🔍 راهنمای ناوبری:**

روی **MODELS - Catalog** در نوار کناری Microsoft Foundry Toolkit کلیک کنید

![کاتالوگ مدل](../../../../translated_images/fa/aimodel.263ed2be013d8fb0.webp)

**💡 نکته حرفه‌ای**: دنبال مدل‌هایی باشید که قابلیت‌های خاصی متناسب با نیاز شما دارند (مثلاً تولید کد، نوشتن خلاقانه، تحلیل).

**⚠️ توجه**: مدل‌های میزبانی شده در GitHub (یعنی مدل‌های GitHub) رایگان هستند اما تحت محدودیت نرخ درخواست و توکن هستند. اگر می‌خواهید به مدل‌های غیر GitHub (مدل‌های خارجی میزبانی شده از طریق Azure AI یا سایر نقاط پایانی) دسترسی پیدا کنید، نیاز به کلید API یا احراز هویت مناسب دارید.

### 🚀 گام ۲: افزودن و پیکربندی اولین مدل خود

**استراتژی انتخاب مدل:**
- **GPT-4.1**: بهترین برای استدلال و تحلیل پیچیده
- **Phi-4-mini**: سبک و پاسخ سریع برای کارهای ساده

**🔧 فرایند پیکربندی:**
1. از کاتالوگ مدل **OpenAI GPT-4.1** را انتخاب کنید
2. روی **Add to My Models** کلیک کنید - این کار ثبت مدل برای استفاده است
3. گزینه **Try in Playground** را انتخاب کنید تا محیط تست باز شود
4. منتظر بمانید تا مدل راه‌اندازی شود (راه‌اندازی اولیه ممکن است کمی زمان ببرد)

![راه‌اندازی Playground](../../../../translated_images/fa/playground.dd6f5141344878ca.webp)

**⚙️ آشنایی با پارامترهای مدل:**
- **Temperature**: کنترل درجه خلاقیت (۰ = قطعی، ۱ = خلاقانه)
- **Max Tokens**: حداکثر طول پاسخ
- **Top-p**: نمونه‌برداری هسته‌ای برای تنوع پاسخ

### 🎯 گام ۳: تسلط بر رابط کاربری Playground

Playground آزمایشگاه شما برای آزمایش هوش مصنوعی است. در اینجا روش بهره‌برداری کامل از آن آمده است:

**🎨 بهترین روش‌های مهندسی دستور:**
1. **خاص باشید**: دستورالعمل‌های واضح و دقیق نتایج بهتری می‌دهد
2. **زمینه فراهم کنید**: اطلاعات پس‌زمینه مرتبط را وارد کنید
3. **از نمونه‌ها استفاده کنید**: با نمونه به مدل نشان دهید چه چیزی می‌خواهید
4. **تکرار کنید**: دستورات را بر اساس نتایج اولیه بهبود دهید

**🧪 سناریوهای تست:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![نتایج تست](../../../../translated_images/fa/result.1dfcf211fb359cf6.webp)

### 🏆 تمرین چالشی: مقایسه عملکرد مدل‌ها

**🎯 هدف**: مقایسه مدل‌های مختلف با استفاده از دستورهای یکسان برای درک نقاط قوت آن‌ها

**📋 دستورالعمل‌ها:**
1. **Phi-4-mini** را به فضای کاری خود اضافه کنید
2. از همان دستور برای هر دو مدل GPT-4.1 و Phi-4-mini استفاده کنید

![مجموعه](../../../../translated_images/fa/set.88132df189ecde2c.webp)

3. کیفیت پاسخ، سرعت و دقت را مقایسه کنید
4. یافته‌های خود را در بخش نتایج مستند کنید

![مقایسه مدل](../../../../translated_images/fa/compare.97746cd0f9074955.webp)

**💡 نکات کلیدی برای کشف:**
- چه زمان‌هایی از LLM و چه زمان‌هایی از SLM استفاده شود
- ملاحظات هزینه در مقابل عملکرد
- قابلیت‌های تخصصی مدل‌های مختلف

## 🤖 تمرین عملی ۲: ساخت نمایندگان سفارشی با Agent Builder

**🎯 هدف**: خلق نمایندگان تخصصی هوش مصنوعی برای کارها و جریان‌های کاری خاص

### 🏗️ گام ۱: آشنایی با Agent Builder

Agent Builder جایی است که Microsoft Foundry Toolkit واقعاً می‌درخشد. این بخش به شما امکان می‌دهد دستیاران هوش مصنوعی هدفمندی بسازید که قدرت مدل‌های زبان بزرگ را با دستورالعمل‌های سفارشی، پارامترهای مشخص و دانش ویژه ترکیب می‌کند.

**🧠 اجزای معماری نماینده:**
- **مدل اصلی**: مدل پایه LLM (GPT-4، Groks، Phi و غیره)
- **سیستم Prompt**: تعیین شخصیت و رفتار نماینده
- **پارامترها**: تنظیمات دقیق برای عملکرد بهینه
- **یکپارچه‌سازی ابزارها**: اتصال به APIها و خدمات MCP خارجی
- **حافظه**: زمینه گفتگو و حفظ جلسه

![رابط Agent Builder](../../../../translated_images/fa/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ گام ۲: کاوش عمیق در پیکربندی نماینده

**🎨 ساخت System Promptهای مؤثر:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*البته، شما همچنین می‌توانید از Generate System Prompt استفاده کنید تا AI به شما در تولید و بهینه‌سازی دستورها کمک کند*

**🔧 بهینه‌سازی پارامترها:**
| پارامتر | بازه پیشنهادی | کاربرد |
|-----------|------------------|----------|
| **Temperature** | ۰.۱-۰.۳ | پاسخ‌های فنی/واقعی |
| **Temperature** | ۰.۷-۰.۹ | کارهای خلاقانه/طوفان فکری |
| **Max Tokens** | ۵۰۰-۱۰۰۰ | پاسخ‌های مختصر |
| **Max Tokens** | ۲۰۰۰-۴۰۰۰ | توضیحات دقیق |

### 🐍 گام ۳: تمرین عملی – نماینده برنامه‌نویسی پایتون

**🎯 ماموریت**: ساخت دستیار برنامه‌نویسی تخصصی پایتون

**📋 مراحل پیکربندی:**

1. **انتخاب مدل**: انتخاب **Claude 3.5 Sonnet** (عالی برای کدنویسی)

2. **طراحی System Prompt**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **پیکربندی پارامترها**:
   - دما: ۰.۲ (برای کد قابل اعتماد و ثابت)
   - حداکثر توکن‌ها: ۲۰۰۰ (توضیحات دقیق)
   - Top-p: ۰.۹ (خلاقیت متعادل)

![پیکربندی نماینده پایتون](../../../../translated_images/fa/pythonagent.5e51b406401c165f.webp)

### 🧪 گام ۴: تست نماینده پایتون خود

**سناریوهای تست:**
۱. **تابع پایه**: «یک تابع برای یافتن اعداد اول بساز»
۲. **الگوریتم پیچیده**: «یک درخت جستجوی دودویی با متدهای درج، حذف و جستجو پیاده‌سازی کن»
۳. **مسئله واقعی**: «یک وب‌اسکرپر بساز که محدودیت نرخ و تلاش مجدد را مدیریت کند»
۴. **اشکال‌زدایی**: «این کد را اصلاح کن [کد دارای باگ را بچسبان]»

**🏆 معیارهای موفقیت:**
- ✅ کد بدون خطا اجرا می‌شود
- ✅ مستندات مناسب دارد
- ✅ بهترین روش‌های پایتون را رعایت می‌کند
- ✅ توضیحات واضح ارائه می‌دهد
- ✅ پیشنهادهای بهبود می‌دهد

## 🎓 جمع‌بندی ماژول ۱ و مراحل بعدی

### 📊 آزمون دانش

درک خود را بسنجید:
- [ ] آیا می‌توانید تفاوت مدل‌های کاتالوگ را توضیح دهید؟
- [ ] آیا یک نماینده سفارشی ساخته و آزمایش کرده‌اید؟
- [ ] آیا می‌دانید چگونه پارامترها را برای موارد مختلف بهینه کنید؟
- [ ] آیا می‌توانید System Promptهای مؤثر طراحی کنید؟

### 📚 منابع اضافی

- **مستندات Microsoft Foundry Toolkit**: [مستندات رسمی مایکروسافت](https://github.com/microsoft/vscode-ai-toolkit)
- **راهنمای مهندسی Prompt**: [بهترین روش‌ها](https://platform.openai.com/docs/guides/prompt-engineering)
- **مدل‌ها در Microsoft Foundry Toolkit**: [مدل‌ها در حال توسعه](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 تبریک!** شما اصول اولیه Microsoft Foundry Toolkit را یاد گرفته‌اید و آماده‌اید برنامه‌های پیشرفته‌تری بسازید!

### 🔜 ادامه به ماژول بعدی

آماده قابلیت‌های پیشرفته‌تر هستید؟ ادامه دهید به **[ماژول ۲: اصول MCP با Microsoft Foundry Toolkit](../lab2/README.md)** که در آن خواهید آموخت چگونه:
- نمایندگان خود را به ابزارهای خارجی با استفاده از Model Context Protocol (MCP) متصل کنید
- نمایندگان اتوماسیون مرورگر با Playwright بسازید
- سرورهای MCP را با نمایندگان Microsoft Foundry Toolkit خود ادغام کنید
- نمایندگان خود را با داده‌ها و قابلیت‌های خارجی قوی‌تر کنید

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->