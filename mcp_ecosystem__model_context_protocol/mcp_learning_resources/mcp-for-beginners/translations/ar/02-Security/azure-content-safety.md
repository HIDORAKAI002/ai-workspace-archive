# أمان MCP المتقدم مع Azure Content Safety

> **مخاطرة OWASP MCP المعالجة**: [MCP06 - حقن مطالبات عبر حمولة سياقية](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

يوفر Azure Content Safety عدة أدوات قوية يمكنها تعزيز أمان تطبيقات MCP الخاصة بك. لتجربة تطبيقية عملية، راجع [ورشة قمة أمان MCP (Sherpa)](https://azure-samples.github.io/sherpa/) المعسكر 3: أمان الإدخال/الإخراج.

## دروع المطالبات

تقدم دروع مطالبات الذكاء الاصطناعي من مايكروسوفت حماية قوية ضد هجمات حقن المطالبات المباشرة وغير المباشرة من خلال:

1. **كشف متقدم**: يستخدم التعلم الآلي للتعرف على التعليمات الضارة المدمجة في المحتوى.
2. **تسليط الضوء**: يحول نص الإدخال لمساعدة أنظمة الذكاء الاصطناعي على التمييز بين التعليمات الصالحة والمدخلات الخارجية.
3. **الحدود والعلامات**: يحدد الحدود الفاصلة بين البيانات الموثوقة وغير الموثوقة.
4. **تكامل أمان المحتوى**: يعمل مع Azure AI Content Safety لاكتشاف محاولات كسر الحماية والمحتوى الضار.
5. **تحديثات مستمرة**: تقوم مايكروسوفت بتحديث آليات الحماية بانتظام ضد التهديدات الناشئة.

## تنفيذ Azure Content Safety مع MCP

يوفر هذا النهج حماية متعددة الطبقات:
- فحص المدخلات قبل المعالجة
- التحقق من صحة المخرجات قبل الإرجاع
- استخدام قوائم الحظر للأنماط الضارة المعروفة
- الاستفادة من نماذج أمان المحتوى المحدثة باستمرار من Azure

## موارد Azure Content Safety

لتعلم المزيد عن كيفية تنفيذ Azure Content Safety مع خوادم MCP الخاصة بك، استشر هذه الموارد الرسمية:

1. [توثيق Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - التوثيق الرسمي لـ Azure Content Safety.
2. [توثيق درع المطالبات](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - تعلم كيفية منع هجمات حقن المطالبات.
3. [مرجع واجهة برمجة التطبيقات Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - مرجع مفصل لواجهة برمجة التطبيقات لتنفيذ Content Safety.
4. [بدء سريع: Azure Content Safety مع C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - دليل تنفيذ سريع باستخدام C#.
5. [مكتبات عميل Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - مكتبات عميل لمختلف لغات البرمجة.
6. [كشف محاولات كسر الحماية](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - إرشادات محددة حول اكتشاف ومنع محاولات كسر الحماية.
7. [أفضل الممارسات لأمان المحتوى](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - أفضل الممارسات لتنفيذ أمان المحتوى بشكل فعال.

للحصول على تنفيذه بشكل أعمق، راجع دليل [تنفيذ Azure Content Safety](./azure-content-safety-implementation.md).

## ما التالي

- اقرأ: [تنفيذ Azure Content Safety](./azure-content-safety-implementation.md)
- العودة إلى: [نظرة عامة على وحدة الأمان](./README.md)
- المتابعة إلى: [الوحدة 3: البدء](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لضمان الدقة، يُرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة والحاسمة، يُنصح بالاستعانة بترجمة احترافية يقوم بها مترجمون بشريون. نحن غير مسؤولين عن أي سوء فهم أو تفسيرات خاطئة قد تنشأ من استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->