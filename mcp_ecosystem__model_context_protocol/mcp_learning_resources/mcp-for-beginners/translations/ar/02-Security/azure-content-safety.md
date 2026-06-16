# الأمان المتقدم لـ MCP مع أمان محتوى Azure

> **مخاطرة OWASP MCP المعالجة**: [MCP06 - التحايل على تدفق النوايا](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

يوفر أمان محتوى Azure عدة أدوات قوية يمكنها تعزيز أمان تطبيقات MCP الخاصة بك. للحصول على تجربة تطبيق عملية، انظر [ورشة عمل قمة أمان MCP (شيربا)](https://azure-samples.github.io/sherpa/) المخيم 3: أمان الإدخال/الإخراج.

## دروع الموجهات

توفر دروع الموجهات الذكية من Microsoft حماية قوية ضد هجمات حقن الموجهات المباشرة وغير المباشرة من خلال:

1. **الكشف المتقدم**: يستخدم التعلم الآلي لتحديد التعليمات الضارة المضمنة في المحتوى.
2. **التسليط الضوئي**: يحول نص الإدخال لمساعدة أنظمة الذكاء الاصطناعي في التمييز بين التعليمات الصحيحة والمدخلات الخارجية.
3. **الحدود وعلامات البيانات**: يميز الفواصل بين البيانات الموثوقة وغير الموثوقة.
4. **تكامل أمان المحتوى**: يعمل مع Azure AI Content Safety للكشف عن محاولات كسر الحماية والمحتوى الضار.
5. **التحديثات المستمرة**: تقوم Microsoft بتحديث آليات الحماية بانتظام ضد التهديدات الجديدة.

## تنفيذ أمان محتوى Azure مع MCP

يوفر هذا النهج حماية متعددة الطبقات:
- مسح المدخلات قبل المعالجة
- التحقق من صحة المخرجات قبل الإرجاع
- استخدام قوائم الحظر للأنماط الضارة المعروفة
- الاستفادة من نماذج أمان المحتوى المحدثة باستمرار من Azure

## موارد أمان محتوى Azure

لتعلم المزيد عن تنفيذ أمان محتوى Azure مع خوادم MCP الخاصة بك، استشر هذه الموارد الرسمية:

1. [وثائق أمان محتوى Azure AI](https://learn.microsoft.com/azure/ai-services/content-safety/) - الوثائق الرسمية لأمان محتوى Azure.
2. [وثائق درع الموجه](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - تعرف على كيفية منع هجمات حقن الموجهات.
3. [مرجع API لأمان المحتوى](https://learn.microsoft.com/rest/api/contentsafety/) - مرجع API مفصل لتنفيذ أمان المحتوى.
4. [البدء السريع: أمان محتوى Azure مع C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - دليل تنفيذ سريع باستخدام C#.
5. [مكتبات عملاء أمان المحتوى](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - مكتبات عملاء لمختلف لغات البرمجة.
6. [كشف محاولات كسر الحماية](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - إرشادات محددة لكشف ومنع محاولات كسر الحماية.
7. [أفضل الممارسات لأمان المحتوى](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - أفضل الممارسات لتنفيذ أمان المحتوى بشكل فعال.

للحصول على تطبيق أكثر عمقًا، انظر دليل [تنفيذ أمان محتوى Azure](./azure-content-safety-implementation.md).

## ما التالي

- اقرأ: [تنفيذ أمان محتوى Azure](./azure-content-safety-implementation.md)
- العودة إلى: [نظرة عامة على وحدة الأمان](./README.md)
- المتابعة إلى: [الوحدة 3: البدء](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->