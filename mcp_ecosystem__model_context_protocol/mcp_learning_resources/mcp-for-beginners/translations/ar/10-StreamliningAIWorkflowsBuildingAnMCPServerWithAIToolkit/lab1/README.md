# 🚀 الوحدة 1: أساسيات مجموعة أدوات Microsoft Foundry

[![المدة](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![الصعوبة](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![المتطلبات السابقة](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 أهداف التعلم

بنهاية هذه الوحدة، ستكون قادرًا على:
- ✅ تثبيت وتكوين ملحق Microsoft Foundry Toolkit لـ VS Code
- ✅ التنقل في كتالوج النماذج وفهم مصادر النماذج المختلفة
- ✅ استخدام منطقة اللعب لاختبار النماذج والتجربة
- ✅ إنشاء وكلاء ذكاء اصطناعي مخصصين باستخدام Agent Builder
- ✅ مقارنة أداء النماذج عبر مزودين مختلفين
- ✅ تطبيق أفضل الممارسات لهندسة المطالبات

## 🧠 مقدمة إلى Microsoft Foundry Toolkit

الملحق **Microsoft Foundry Toolkit لـ VS Code** هو الملحق الرائد من مايكروسوفت الذي يحول VS Code إلى بيئة تطوير ذكاء اصطناعي شاملة. يجسر الفجوة بين أبحاث الذكاء الاصطناعي وتطوير التطبيقات العملية، مما يجعل الذكاء الاصطناعي التوليدي متاحًا للمطورين من جميع المستويات.

### 🌟 القدرات الرئيسية

| الميزة | الوصف | حالة الاستخدام |
|---------|-------------|----------|
| **🗂️ كتالوج النماذج** | الوصول إلى أكثر من 100 نموذج من GitHub وONNX وOpenAI وAnthropic وGoogle | اكتشاف النماذج واختيارها |
| **🔌 دعم BYOM** | دمج نماذجك الخاصة (محلية/عن بُعد) | نشر النموذج المخصص |
| **🎮 منطقة اللعب التفاعلية** | اختبار النماذج في الوقت الحقيقي بواجهة دردشة | النمذجة الأولية السريعة والاختبار |
| **📎 دعم متعدد الوسائط** | التعامل مع نصوص، صور، ومرفقات | تطبيقات ذكاء اصطناعي معقدة |
| **⚡ المعالجة الدُفعية** | تشغيل عدة مطالبات في نفس الوقت | تدفقات عمل اختبار فعالة |
| **📊 تقييم النماذج** | مقاييس مدمجة (F1، الصلة، التشابه، التناسق) | تقييم الأداء |

### 🎯 لماذا يعتبر Microsoft Foundry Toolkit مهمًا

- **🚀 تطوير مُسرّع**: من الفكرة إلى النموذج الأولي في دقائق
- **🔄 سير عمل موحد**: واجهة واحدة لعدة مزودي ذكاء اصطناعي
- **🧪 تجارب سهلة**: مقارنة النماذج بدون إعداد معقد
- **📈 جاهز للإنتاج**: انتقال سلس من النموذج الأولي إلى النشر

## 🛠️ المتطلبات والإعداد

### 📦 تثبيت ملحق Microsoft Foundry Toolkit

**الخطوة 1: الوصول إلى سوق الملحقات**
1. افتح Visual Studio Code
2. انتقل إلى عرض الملحقات (`Ctrl+Shift+X` أو `Cmd+Shift+X`)
3. ابحث عن "Microsoft Foundry Toolkit"

**الخطوة 2: اختر إصدارك**
- **🟢 الإصدار الرسمي**: موصى به للاستخدام الإنتاجي
- **🔶 إصدار ما قبل النشر**: الوصول المبكر إلى الميزات الجديدة

**الخطوة 3: التثبيت والتفعيل**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ar/aitkext.d28945a03eed003c.webp)

### ✅ قائمة التحقق من التحقق
- [ ] يظهر أيقونة Microsoft Foundry Toolkit في الشريط الجانبي لـ VS Code
- [ ] الملحق مُمكّن ومفعل
- [ ] لا توجد أخطاء تثبيت في لوحة الإخراج

## 🧪 تمرين عملي 1: استكشاف نماذج GitHub

**🎯 الهدف**: اتقان كتالوج النماذج واختبار أول نموذج ذكاء اصطناعي لك

### 📊 الخطوة 1: التنقل في كتالوج النماذج

كتالوج النماذج هو بوابتك إلى نظام الذكاء الاصطناعي البيئي. يجمع النماذج من مزودين متعددين، مما يسهل اكتشافها ومقارنتها.

**🔍 دليل التنقل:**

انقر على **MODELS - Catalog** في الشريط الجانبي لـ Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/ar/aimodel.263ed2be013d8fb0.webp)

**💡 نصيحة احترافية**: ابحث عن نماذج بقدرات محددة تتوافق مع حالة استخدامك (مثلاً، توليد الشفرات، الكتابة الإبداعية، التحليل).

**⚠️ ملاحظة**: النماذج المستضافة على GitHub (أي نماذج GitHub) مجانية للاستخدام لكنها تخضع لحدود معدلات الطلبات والرموز. إذا كنت تريد الوصول إلى نماذج غير GitHub (أي نماذج خارجية مستضافة عبر Azure AI أو نقاط نهاية أخرى)، ستحتاج إلى توفير مفتاح API أو المصادقة المناسبة.

### 🚀 الخطوة 2: إضافة وتكوين أول نموذج لديك

**استراتيجية اختيار النموذج:**
- **GPT-4.1**: الأفضل للمنطق والتحليل المعقد
- **Phi-4-mini**: خفيف الوزن، استجابات سريعة للمهام البسيطة

**🔧 عملية التكوين:**
1. اختر **OpenAI GPT-4.1** من الكتالوج
2. انقر على **Add to My Models** - هذا يسجل النموذج للاستخدام
3. اختر **Try in Playground** لبدء بيئة الاختبار
4. انتظر تهيئة النموذج (قد يستغرق الإعداد الأولي بعض الوقت)

![Playground Setup](../../../../translated_images/ar/playground.dd6f5141344878ca.webp)

**⚙️ فهم معلمات النموذج:**
- **Temperature**: تتحكم في الإبداع (0 = حتمي، 1 = إبداعي)
- **Max Tokens**: الحد الأقصى لطول الاستجابة
- **Top-p**: عينات النواة لتنوع الاستجابات

### 🎯 الخطوة 3: اتقان واجهة منطقة اللعب

منطقة اللعب هي مختبر تجربتك مع الذكاء الاصطناعي. إليك كيف تعظم إمكاناتها:

**🎨 أفضل ممارسات هندسة المطالبات:**
1. **كن محددًا**: تعليمات واضحة ومفصلة تعطي نتائج أفضل
2. **وفر السياق**: تضمين معلومات خلفية ذات صلة
3. **استخدم الأمثلة**: أرِ النموذج ما تريد عبر أمثلة
4. **كرر**: حسّن المطالبات بناءً على النتائج الأولية

**🧪 سيناريوهات الاختبار:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/ar/result.1dfcf211fb359cf6.webp)

### 🏆 تمرين تحدي: مقارنة أداء النماذج

**🎯 الهدف**: مقارنة نماذج مختلفة باستخدام نفس المطالبات لفهم نقاط القوة لديها

**📋 التعليمات:**
1. أضف **Phi-4-mini** إلى مساحة العمل الخاصة بك
2. استخدم نفس المطالبة لكل من GPT-4.1 و Phi-4-mini

![set](../../../../translated_images/ar/set.88132df189ecde2c.webp)

3. قارن جودة الاستجابة، السرعة، والدقة
4. دوّن نتائجك في قسم النتائج

![Model Comparison](../../../../translated_images/ar/compare.97746cd0f9074955.webp)

**💡 رؤى رئيسية لاكتشافها:**
- متى تستخدم LLM مقابل SLM
- التوازن بين التكلفة والأداء
- القدرات المتخصصة لنماذج مختلفة

## 🤖 تمرين عملي 2: بناء وكلاء مخصصين باستخدام Agent Builder

**🎯 الهدف**: إنشاء وكلاء ذكاء اصطناعي متخصصين مصممين لمهام وسير عمل محددة

### 🏗️ الخطوة 1: فهم Agent Builder

يبرز Agent Builder في Microsoft Foundry Toolkit حقًا. يسمح لك بإنشاء مساعدين ذكاء اصطناعي مخصصين يجمعون بين قوة نماذج اللغة الكبيرة والتعليمات المخصصة، والمعلمات الخاصة، والمعرفة المتخصصة.

**🧠 مكونات بنية الوكيل:**
- **النموذج الأساسي**: نموذج اللغة الكبير الأساسي (GPT-4، Groks، Phi، إلخ)
- **موجه النظام**: يحدد شخصية الوكيل وسلوكه
- **المعلمات**: إعدادات مخصصة للأداء الأمثل
- **تكامل الأدوات**: الاتصال بواجهات برمجة التطبيقات الخارجية وخدمات MCP
- **الذاكرة**: سياق المحادثة واستمراريتها

![Agent Builder Interface](../../../../translated_images/ar/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ الخطوة 2: التعمق في تكوين الوكيل

**🎨 إنشاء موجهات نظام فعالة:**
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

*بالطبع، يمكنك أيضًا استخدام Generate System Prompt لاستخدام الذكاء الاصطناعي لمساعدتك في إنشاء وتحسين الموجهات*

**🔧 تحسين المعلمات:**
| المعلمة | النطاق الموصى به | حالة الاستخدام |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | الردود التقنية/الواقعية |
| **Temperature** | 0.7-0.9 | المهام الإبداعية/العصف الذهني |
| **Max Tokens** | 500-1000 | ردود مختصرة |
| **Max Tokens** | 2000-4000 | شروحات مفصلة |

### 🐍 الخطوة 3: تمرين عملي - وكيل برمجة بايثون

**🎯 المهمة**: إنشاء مساعد برمجة بايثون متخصص

**📋 خطوات التكوين:**

1. **اختيار النموذج**: اختر **Claude 3.5 Sonnet** (ممتاز للكود)

2. **تصميم موجه النظام**:
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

3. **تكوين المعلمات**:
   - Temperature: 0.2 (لكود متسق وموثوق)
   - Max Tokens: 2000 (شروحات مفصلة)
   - Top-p: 0.9 (توازن الإبداع)

![Python Agent Configuration](../../../../translated_images/ar/pythonagent.5e51b406401c165f.webp)

### 🧪 الخطوة 4: اختبار وكيل بايثون الخاص بك

**سيناريوهات الاختبار:**
1. **دالة أساسية**: "أنشئ دالة لإيجاد الأعداد الأولية"
2. **خوارزمية معقدة**: "نفذ شجرة بحث ثنائية مع طرق الإدراج والحذف والبحث"
3. **مشكلة من العالم الحقيقي**: "أنشئ برنامج جمع بيانات ويب يتعامل مع حدود الأداء والمحاولات المتكررة"
4. **تصحيح الأخطاء**: "اصلح هذا الكود [الصق الكود المعيب]"

**🏆 معايير النجاح:**
- ✅ الكود يعمل بدون أخطاء
- ✅ يتضمن توثيقًا مناسبًا
- ✅ يتبع أفضل ممارسات بايثون
- ✅ يقدم شروحات واضحة
- ✅ يقترح تحسينات

## 🎓 خاتمة الوحدة 1 والخطوات التالية

### 📊 اختبار المعرفة

اختبر فهمك:
- [ ] هل يمكنك شرح الفرق بين النماذج في الكتالوج؟
- [ ] هل أنشأت واختبرت بنجاح وكيلًا مخصصًا؟
- [ ] هل تفهم كيفية تحسين المعلمات لحالات استخدام مختلفة؟
- [ ] هل يمكنك تصميم موجهات نظام فعالة؟

### 📚 مصادر إضافية

- **توثيق Microsoft Foundry Toolkit**: [الوثائق الرسمية لمايكروسوفت](https://github.com/microsoft/vscode-ai-toolkit)
- **دليل هندسة المطالبات**: [أفضل الممارسات](https://platform.openai.com/docs/guides/prompt-engineering)
- **النماذج في Microsoft Foundry Toolkit**: [نماذج قيد التطوير](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 تهانينا!** لقد أتقنت أساسيات Microsoft Foundry Toolkit وأصبحت مستعدًا لبناء تطبيقات ذكاء اصطناعي أكثر تقدمًا!

### 🔜 تابع إلى الوحدة التالية

هل أنت مستعد للقدرات المتقدمة؟ تابع إلى **[الوحدة 2: MCP مع أساسيات Microsoft Foundry Toolkit](../lab2/README.md)** حيث ستتعلم كيف:
- توصل وكلائك إلى الأدوات الخارجية باستخدام بروتوكول سياق النموذج (MCP)
- بناء وكلاء أتمتة المتصفح باستخدام Playwright
- دمج خوادم MCP مع وكلاء Microsoft Foundry Toolkit الخاصين بك
- تعزيز وكلائك بالبيانات والقدرات الخارجية

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->