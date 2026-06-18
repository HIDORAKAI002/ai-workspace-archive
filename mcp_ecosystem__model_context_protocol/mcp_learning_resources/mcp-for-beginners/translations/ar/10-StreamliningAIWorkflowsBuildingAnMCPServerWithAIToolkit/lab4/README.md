# 🐙 الوحدة 4: تطوير MCP عملي - خادم استنساخ GitHub مخصص

![المدة](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![الصعوبة](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ بداية سريعة:** بناء خادم MCP جاهز للإنتاج يقوم بأتمتة استنساخ مستودعات GitHub وتكامل VS Code في 30 دقيقة فقط!

## 🎯 أهداف التعلم

بحلول نهاية هذا المختبر، ستكون قادرًا على:

- ✅ إنشاء خادم MCP مخصص لسير عمل تطوير في العالم الحقيقي
- ✅ تنفيذ وظيفة استنساخ مستودعات GitHub عبر MCP
- ✅ دمج خوادم MCP المخصصة مع VS Code وAgent Builder
- ✅ استخدام وضع Agent الخاص بـ GitHub Copilot مع أدوات MCP المخصصة
- ✅ اختبار ونشر خوادم MCP المخصصة في بيئات الإنتاج

## 📋 المتطلبات السابقة

- إتمام المختبرات 1-3 (أساسيات MCP وتطوير متقدم)
- اشتراك GitHub Copilot ([تسجيل مجاني متاح](https://github.com/github-copilot/signup))
- VS Code مع ملحقات Microsoft Foundry Toolkit و GitHub Copilot
- تثبيت وتكوين Git CLI

## 🏗️ نظرة عامة على المشروع

### **تحدي تطوير بالعالم الحقيقي**
كمطورين، نستخدم GitHub كثيرًا لاستنساخ المستودعات وفتحها في VS Code أو VS Code Insiders. هذه العملية اليدوية تشمل:
1. فتح الطرفية/موجه الأوامر
2. التنقل إلى الدليل المطلوب
3. تنفيذ أمر `git clone`
4. فتح VS Code في الدليل المستنسخ

**حل MCP الخاص بنا يبسط هذا إلى أمر ذكي واحد!**

### **ما ستبنيه**
خادم **GitHub Clone MCP** (`git_mcp_server`) الذي يوفر:

| الميزة | الوصف | الفائدة |
|---------|-------------|---------|
| 🔄 **استنساخ مستودعات ذكي** | استنساخ مستودعات GitHub مع التحقق | فحص الأخطاء تلقائيًا |
| 📁 **إدارة أدلة ذكية** | التحقق وإنشاء الأدلة بأمان | يمنع الكتابة فوق الملفات |
| 🚀 **تكامل عبر الأنظمة مع VS Code** | فتح المشاريع في VS Code/Insiders | انتقال سلس لسير العمل |
| 🛡️ **معالجة أخطاء قوية** | التعامل مع مشكلات الشبكة، الصلاحيات، والمسارات | موثوقية جاهزة للإنتاج |

---

## 📖 التنفيذ خطوة بخطوة

### الخطوة 1: إنشاء وكيل GitHub في Agent Builder

1. **فتح Agent Builder** عبر ملحق Microsoft Foundry Toolkit  
2. **إنشاء وكيل جديد** بالتكوين التالي:  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **تهيئة خادم MCP مخصص:**  
   - اذهب إلى **الأدوات** → **إضافة أداة** → **خادم MCP**  
   - اختر **"إنشاء خادم MCP جديد"**  
   - اختر **قالب Python** لأقصى مرونة  
   - **اسم الخادم:** `git_mcp_server`  

### الخطوة 2: تكوين وضع GitHub Copilot Agent

1. **افتح GitHub Copilot** في VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
2. **اختر نموذج الوكيل** في واجهة Copilot  
3. **اختر نموذج Claude 3.7** لتحسين قدرات الاستدلال  
4. **فعل دمج MCP** للوصول إلى الأدوات  

> **💡 نصيحة احترافية:** يوفر Claude 3.7 فهمًا متفوقًا لسير عمل التطوير وأنماط معالجة الأخطاء.

### الخطوة 3: تنفيذ وظيفة خادم MCP الأساسية

**استخدم الموجه التفصيلي التالي مع وضع GitHub Copilot Agent:**  

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```
  
### الخطوة 4: اختبار خادم MCP الخاص بك

#### 4a. اختبار في Agent Builder

1. **تشغيل تكوين التصحيح** لـ Agent Builder  
2. **تهيئة وكيلك مع موجه النظام هذا:**  

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. **اختبر بسيناريوهات مستخدم واقعية:**  

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![اختبار Agent Builder](../../../../translated_images/ar/DebugAgent.81d152370c503241.webp)

**النتائج المتوقعة:**  
- ✅ استنساخ ناجح مع تأكيد المسار  
- ✅ بدء تشغيل VS Code تلقائيًا  
- ✅ رسائل خطأ واضحة للسيناريوهات غير الصحيحة  
- ✅ التعامل الجيد مع حالات الحافة  

#### 4b. اختبار في MCP Inspector

![اختبار MCP Inspector](../../../../translated_images/ar/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 تهانينا!** لقد أنشأت بنجاح خادم MCP عملي وجاهز للإنتاج يحل تحديات سير عمل التطوير الحقيقية. يبرهن خادم استنساخ GitHub المخصص الخاص بك على قوة MCP في أتمتة وتحسين إنتاجية المطورين.

### 🏆 الإنجاز الذي تم فتحه:  
- ✅ **مطور MCP** - أنشأت خادم MCP مخصص  
- ✅ **محرك سير العمل** - بسّطت عمليات التطوير  
- ✅ **خبير التكامل** - ربطت أدوات تطوير متعددة  
- ✅ **جاهز للإنتاج** - بنيت حلول قابلة للنشر  

---

## 🎓 إكمال الورشة: رحلتك مع بروتوكول سياق النموذج

**عزيزي مشارك الورشة،**

تهانينا على إكمال جميع الوحدات الأربع لورشة بروتوكول سياق النموذج! لقد قطعت شوطًا طويلاً من فهم أساسيات Microsoft Foundry Toolkit إلى بناء خوادم MCP جاهزة للإنتاج تحل تحديات تطوير العالم الحقيقي.

### 🚀 ملخص مسار تعلمك:

**[الوحدة 1](../lab1/README.md)**: بدأت باستكشاف أساسيات Microsoft Foundry Toolkit، اختبار النماذج، وإنشاء وكيل AI الأول.

**[الوحدة 2](../lab2/README.md)**: تعلمت بنية MCP، دمج Playwright MCP، وبناء وكيل أتمتة المتصفح الأول.

**[الوحدة 3](../lab3/README.md)**: تقدمت إلى تطوير خادم MCP مخصص مع خادم الطقس MCP وتعلمت أدوات التصحيح.

**[الوحدة 4](../lab4/README.md)**: طبقت الآن كل شيء لإنشاء أداة أتمتة سير عمل مستودع GitHub عملية.

### 🌟 ما أتقنته:

- ✅ **نظام Microsoft Foundry Toolkit**: النماذج، الوكلاء، وأنماط التكامل  
- ✅ **بنية MCP**: تصميم العميل-الخادم، بروتوكولات النقل، والأمان  
- ✅ **أدوات المطور**: من Playground إلى Inspector إلى النشر الإنتاجي  
- ✅ **التطوير المخصص**: بناء، اختبار، ونشر خوادم MCP الخاصة بك  
- ✅ **التطبيقات العملية**: حل تحديات سير العمل الحقيقية بالذكاء الاصطناعي  

### 🔮 خطواتك القادمة:

1. **ابنِ خادم MCP خاص بك**: طبق هذه المهارات لأتمتة سير عملك الفريد  
2. **انضم إلى مجتمع MCP**: شارك إبداعاتك وتعلم من الآخرين  
3. **استكشف التكامل المتقدم**: اربط خوادم MCP بأنظمة المؤسسات  
4. **ساهم في المصادر المفتوحة**: ساعد في تحسين أدوات MCP والوثائق  

تذكر، هذه الورشة هي البداية فقط. نظام بروتوكول سياق النموذج يتطور بسرعة، وأنت الآن مجهز لتكون في طليعة أدوات التطوير المدعومة بالذكاء الاصطناعي.

**شكرًا لمشاركتك وتفانيك في التعلم!**

نأمل أن تكون هذه الورشة قد أطلقت أفكارًا ستغير طريقة بناءك وتفاعلك مع أدوات الذكاء الاصطناعي في رحلتك التطويرية.

**برمجة سعيدة!**

---

## ما هو التالي

تهانينا على إكمال جميع المختبرات في الوحدة 10!

- العودة إلى: [نظرة عامة على الوحدة 10](../README.md)  
- الانتقال إلى: [الوحدة 11: مختبرات عملية لخادم MCP](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->