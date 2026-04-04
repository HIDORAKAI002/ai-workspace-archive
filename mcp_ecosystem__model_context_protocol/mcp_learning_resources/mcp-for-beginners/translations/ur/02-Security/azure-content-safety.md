# ایڈوانسڈ MCP سیکیورٹی ازور کنٹینٹ سیفٹی کے ساتھ

> **OWASP MCP رسک ایڈریسڈ**: [MCP06 - کانٹیکسچول پیلوڈز کے ذریعے پرامپٹ انجیکشن](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

ازور کنٹینٹ سیفٹی کئی طاقتور ٹول فراہم کرتا ہے جو آپ کے MCP نفاذ کی سیکیورٹی کو بڑھا سکتے ہیں۔ عملی نفاذ کے تجربے کے لیے دیکھیں [MCP سیکیورٹی سمٹ ورکشاپ (شرپا)](https://azure-samples.github.io/sherpa/) کیمپ 3: I/O سیکیورٹی۔

## پرامپٹ شیلڈز

مائیکروسافٹ کے AI پرامپٹ شیلڈز براہِ راست اور بالواسطہ پرامپٹ انجیکشن حملوں کے خلاف مضبوط تحفظ فراہم کرتے ہیں، جن میں شامل ہیں:

1. **ایڈوانسڈ ڈیٹیکشن**: مشین لرننگ کا استعمال کرتے ہوئے مواد میں شامل نقصان دہ ہدایات کی شناخت۔
2. **اسپاٹ لائٹنگ**: ان پٹ ٹیکسٹ کو تبدیل کرنا تاکہ AI سسٹمز درست ہدایات اور بیرونی ان پٹس میں فرق کر سکیں۔
3. **ڈیلیمیٹرز اور ڈیٹا مارکنگ**: قابلِ اعتماد اور غیر قابلِ اعتماد ڈیٹا کے درمیان حد بندی کرنا۔
4. **کنٹینٹ سیفٹی انٹیگریشن**: Azure AI Content Safety کے ساتھ کام کرتا ہے تاکہ جیل بریک کی کوششوں اور نقصان دہ مواد کا پتہ لگایا جا سکے۔
5. **مسلسل اپ ڈیٹس**: مائیکروسافٹ باقاعدگی سے ابھرتے ہوئے خطرات کے خلاف تحفظ کے میکانزم کو اپ ڈیٹ کرتا رہتا ہے۔

## MCP کے ساتھ Azure Content Safety کا نفاذ

یہ طریقہ کار کثیر تہہ حفاظتی تحفظ فراہم کرتا ہے:
- پراسیسنگ سے پہلے ان پٹ کو اسکین کرنا
- واپس کرنے سے پہلے آؤٹ پٹ کی تصدیق کرنا
- مخصوص نقصان دہ پیٹرنز کے لیے بلاک لسٹ استعمال کرنا
- Azure کے مسلسل اپ ڈیٹ ہونے والے کنٹینٹ سیفٹی ماڈلز کا فائدہ اٹھانا

## Azure Content Safety کے وسائل

Azure Content Safety کو اپنی MCP سرورز کے ساتھ نافذ کرنے کے بارے میں مزید جاننے کے لیے، ان سرکاری وسائل سے رجوع کریں:

1. [Azure AI Content Safety دستاویزات](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety کی سرکاری دستاویزات۔
2. [Prompt Shield دستاویزات](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - پرامپٹ انجیکشن حملوں کو روکنے کے طریقے سیکھیں۔
3. [Content Safety API ریفرنس](https://learn.microsoft.com/rest/api/contentsafety/) - کنٹینٹ سیفٹی نافذ کرنے کے لیے تفصیلی API ریفرنس۔
4. [فوراً شروع کریں: C# کے ساتھ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# استعمال کرتے ہوئے فوری نفاذ کی گائیڈ۔
5. [Content Safety کلائنٹ لائبریریز](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - مختلف پروگرامنگ زبانوں کے لیے کلائنٹ لائبریریز۔
6. [جیل بریک کی کوششوں کا پتہ لگانا](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - جیل بریک کی کوششوں کا پتہ لگانے اور روک تھام کے لیے مخصوص رہنمائی۔
7. [کنٹینٹ سیفٹی کے لیے بہترین طریقے](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - مؤثر کنٹینٹ سیفٹی نافذ کرنے کے لیے بہترین طریقے۔

مزید گہرائی میں نفاذ کے لیے، ہماری [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) دیکھیں۔

## اگلا کیا ہے

- پڑھیں: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)  
- واپسی: [سیکیورٹی ماڈیول کا جائزہ](./README.md)  
- جاری رکھیں: [ماڈیول 3: شروعات](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**اعلانِ ذمہ داری**:
اس دستاویز کا ترجمہ اے آئی ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) استعمال کرتے ہوئے کیا گیا ہے۔ اگرچہ ہم درستگی کے لیے بھرپور کوشش کرتے ہیں، براہِ کرم آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا بے دقتیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں مستند ماخذ سمجھی جانی چاہیئے۔ اہم معلومات کے لیے پیشہ ور انسان مترجم کی خدمات لینے کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والے کسی بھی غلط فہمی یا غلط تعبیر کی ذمے داری ہم پر عائد نہیں ہوگی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->