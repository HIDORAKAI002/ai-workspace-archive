## البدء  

[![بناء أول خادم MCP خاص بك](../../../translated_images/ar/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(انقر على الصورة أعلاه لمشاهدة فيديو هذا الدرس)_

يتضمن هذا القسم عدة دروس:

- **1 الخادم الأول لك**، في هذا الدرس الأول، ستتعلم كيفية إنشاء خادمك الأول وفحصه باستخدام أداة الفاحص، وهي طريقة قيمة لاختبار وتصحيح الخادم الخاص بك، [إلى الدرس](01-first-server/README.md)

- **2 العميل**، في هذا الدرس ستتعلم كيفية كتابة عميل يمكنه الاتصال بخادمك، [إلى الدرس](02-client/README.md)

- **3 العميل مع LLM**، طريقة أفضل لكتابة عميل هي بإضافة LLM له ليتمكن من "التفاوض" مع الخادم الخاص بك حول ما يجب فعله، [إلى الدرس](03-llm-client/README.md)

- **4 استخدام وضع وكيل GitHub Copilot للخادم داخل Visual Studio Code**. هنا، ننظر إلى تشغيل خادم MCP من داخل Visual Studio Code، [إلى الدرس](04-vscode/README.md)

- **5 خادم النقل stdio** نقل stdio هو المعيار الموصى به للتواصل المحلي بين خادم MCP والعميل، ويوفر اتصالًا آمنًا قائمًا على العمليات الفرعية مع عزل مدمج للعملية [إلى الدرس](05-stdio-server/README.md)

- **6 البث عبر HTTP مع MCP (HTTP قابل للبث)**. تعرف على نقل البث الحديث عبر HTTP (النهج الموصى به لخوادم MCP البعيدة وفقًا [لمواصفة MCP بتاريخ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http))، إشعارات التقدم، وكيفية تنفيذ خوادم وعملاء MCP قابلة للتوسع وفي الوقت الحقيقي باستخدام HTTP قابل للبث. [إلى الدرس](06-http-streaming/README.md)

- **7 استخدام مجموعة أدوات AI لـ VSCode** لاستهلاك واختبار عملاء وخوادم MCP الخاصة بك [إلى الدرس](07-aitk/README.md)

- **8 الاختبار**. هنا سنركز بشكل خاص على كيفية اختبار الخادم والعميل بطرق مختلفة، [إلى الدرس](08-testing/README.md)

- **9 النشر**. هذا الفصل سينظر في الطرق المختلفة لنشر حلول MCP الخاصة بك، [إلى الدرس](09-deployment/README.md)

- **10 استخدام الخادم المتقدم**. يغطي هذا الفصل استخدام الخادم المتقدم، [إلى الدرس](./10-advanced/README.md)

- **11 التوثيق**. يغطي هذا الفصل كيفية إضافة توثيق بسيط، من التوثيق الأساسي إلى استخدام JWT وRBAC. يُشجع على البدء هنا ثم الاطلاع على المواضيع المتقدمة في الفصل 5 وإجراء تعزيزات أمانية إضافية عبر التوصيات في الفصل 2، [إلى الدرس](./11-simple-auth/README.md)

- **12 مضيفو MCP**. تكوين واستخدام عملاء MCP المشهورين بما في ذلك Claude Desktop وCursor وCline وWindsurf. تعرف على أنواع النقل واستكشاف الأخطاء وإصلاحها، [إلى الدرس](./12-mcp-hosts/README.md)

- **13 مكشف MCP**. تصحيح الأخطاء واختبار خوادم MCP الخاصة بك بشكل تفاعلي باستخدام أداة مكشف MCP. تعلم كيفية استكشاف الأدوات والموارد ورسائل البروتوكول، [إلى الدرس](./13-mcp-inspector/README.md)

- **14 العينة**. إنشاء خوادم MCP تتعاون مع عملاء MCP في مهام تتعلق بـ LLM (غير مدعوم في إصدار المرشح `2026-07-28`؛ لا يزال صالحًا لـ `2025-11-25`). [إلى الدرس](./14-sampling/README.md)

- **15 تطبيقات MCP**. بناء خوادم MCP ترد أيضًا بتعليمات واجهة المستخدم، [إلى الدرس](./15-mcp-apps/README.md)

بروتوكول سياق النموذج (MCP) هو بروتوكول مفتوح يوحد كيفية توفير التطبيقات للسياق لنماذج اللغة الكبيرة. فكر في MCP كبورت USB-C لتطبيقات الذكاء الاصطناعي - فهو يوفر طريقة موحدة لربط نماذج الذكاء الاصطناعي بمصادر بيانات وأدوات مختلفة.

## أهداف التعلم

بنهاية هذا الدرس، ستكون قادرًا على:

- إعداد بيئات التطوير لـ MCP في C# وJava وPython وTypeScript وJavaScript
- بناء ونشر خوادم MCP الأساسية مع ميزات مخصصة (الموارد، المطالبات، والأدوات)
- إنشاء تطبيقات مضيفة تتصل بخوادم MCP
- اختبار وتصحيح تطبيقات MCP
- فهم تحديات الإعداد الشائعة وحلولها
- ربط تطبيقات MCP الخاصة بك بخدمات LLM الشهيرة

## إعداد بيئة MCP الخاصة بك

قبل البدء في العمل مع MCP، من المهم تجهيز بيئة التطوير وفهم سير العمل الأساسي. سيرشدك هذا القسم خلال خطوات الإعداد الأولية لضمان بداية سلسة مع MCP.

### المتطلبات الأساسية

قبل الغوص في تطوير MCP، تأكد من أن لديك:

- **بيئة التطوير**: للغة التي اخترتها (C#، Java، Python، TypeScript، أو JavaScript)
- **IDE/محرر**: Visual Studio، Visual Studio Code، IntelliJ، Eclipse، PyCharm، أو أي محرر كود حديث
- **مديرو الحزم**: NuGet، Maven/Gradle، pip، أو npm/yarn
- **مفاتيح API**: لأي خدمات ذكاء اصطناعي تخطط لاستخدامها في تطبيقات المضيف الخاصة بك


### حزم SDK الرسمية

في الفصول القادمة سترى حلولًا مبنية باستخدام Python وTypeScript وJava و.NET. إليك جميع حزم SDK الرسمية المدعومة.

يوفر MCP حزم SDK رسمية لعدة لغات (متوافقة مع [مواصفة MCP بتاريخ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [حزمة C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - تُصان بالتعاون مع مايكروسوفت
- [حزمة Java SDK](https://github.com/modelcontextprotocol/java-sdk) - تُصان بالتعاون مع Spring AI
- [حزمة TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - التنفيذ الرسمي لـ TypeScript
- [حزمة Python SDK](https://github.com/modelcontextprotocol/python-sdk) - التنفيذ الرسمي لـ Python (FastMCP)
- [حزمة Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - التنفيذ الرسمي لـ Kotlin
- [حزمة Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - تُصان بالتعاون مع Loopwork AI
- [حزمة Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - التنفيذ الرسمي لـ Rust
- [حزمة Go SDK](https://github.com/modelcontextprotocol/go-sdk) - التنفيذ الرسمي لـ Go

## النقاط الرئيسية

- إعداد بيئة تطوير MCP سهل باستخدام حزم SDK الخاصة بكل لغة
- بناء خوادم MCP يتضمن إنشاء وتسجيل أدوات مع مخططات واضحة
- عملاء MCP يتصلون بالخوادم والنماذج للاستفادة من القدرات الموسعة
- الاختبار وتصحيح الأخطاء ضروريان لتطبيقات MCP موثوقة
- خيارات النشر تتراوح من التطوير المحلي إلى الحلول السحابية

## الممارسة

لدينا مجموعة من العينات التي تكمل التمارين التي سترى في جميع الفصول في هذا القسم. بالإضافة إلى ذلك، لكل فصل تمارينه ومهامه الخاصة

- [آلة حاسبة Java](./samples/java/calculator/README.md)
- [آلة حاسبة .Net](../../../03-GettingStarted/samples/csharp)
- [آلة حاسبة JavaScript](./samples/javascript/README.md)
- [آلة حاسبة TypeScript](./samples/typescript/README.md)
- [آلة حاسبة Python](../../../03-GettingStarted/samples/python)

## مصادر إضافية

- [بناء وكلاء باستخدام بروتوكول سياق النموذج على Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [MCP عن بُعد مع تطبيقات الحاويات Azure (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [وكيل .NET OpenAI MCP](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## ما القادم

ابدأ بالدرس الأول: [إنشاء خادم MCP الأول الخاص بك](01-first-server/README.md)

بمجرد إكمال هذه الوحدة، تابع إلى: [الوحدة 4: التنفيذ العملي](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->