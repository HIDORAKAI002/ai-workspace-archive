# ایڈوانسڈ MCP سیکیورٹی ازور کنٹینٹ سیفٹی کے ساتھ

> **OWASP MCP رسک ایڈریس کیا گیا**: [MCP06 - نیت کے بہاؤ کی چالاکی سے تبدیلی](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety کئی طاقتور اوزار فراہم کرتا ہے جو آپ کے MCP امپلیمنٹیشنز کی سیکیورٹی کو بڑھا سکتے ہیں۔ عملی تجربہ حاصل کرنے کے لیے، ملاحظہ کریں [MCP Security Summit ورکشاپ (Sherpa)](https://azure-samples.github.io/sherpa/) کیمپ 3: I/O سیکیورٹی۔

## پرامپٹ شیلڈز

مائیکروسافت کے AI پرامپٹ شیلڈز براہِ راست اور بالواسطہ پرامپٹ انجیکشن حملوں سے مضبوط تحفظ فراہم کرتے ہیں، جن میں شامل ہیں:

1. **ایڈوانسڈ ڈیٹیکشن**: مشین لرننگ کا استعمال کر کے مواد میں شامل بدنیتی پر مبنی ہدایات کی شناخت کرتا ہے۔
2. **اسپاٹ لائٹنگ**: ان پٹ ٹیکسٹ کو تبدیل کرتا ہے تاکہ AI سسٹمز کو درست ہدایات اور خارجی ان پٹ میں فرق کرنے میں مدد ملے۔
3. **ڈیلیمٹرز اور ڈیٹا مارکنگ**: معتبر اور غیر معتبر ڈیٹا کے درمیان حد بندی ظاہر کرتا ہے۔
4. **کنٹینٹ سیفٹی انٹیگریشن**: Azure AI Content Safety کے ساتھ کام کرتا ہے تاکہ جیل بریک کوششوں اور نقصان دہ مواد کا پتہ لگایا جا سکے۔
5. **مسلسل اپڈیٹس**: مائیکروسافٹ باقاعدگی سے نئے خطرات کے خلاف حفاظتی طریقہ کار کو اپ ڈیٹ کرتا ہے۔

## MCP کے ساتھ Azure Content Safety کا نفاذ

یہ طریقہ کار کثیر پرتوں پر مشتمل تحفظ فراہم کرتا ہے:
- پراسیسنگ سے پہلے ان پٹ کی جانچ
- واپس کرنے سے پہلے آؤٹ پٹ کی توثیق
- معلوم شدہ نقصان دہ نمونوں کے لیے بلاک لسٹ کا استعمال
- Azure کے مسلسل اپ ڈیٹ ہونے والے کنٹینٹ سیفٹی ماڈلز کا فائدہ اٹھانا

## Azure Content Safety کے وسائل

اپنے MCP سرورز کے ساتھ Azure Content Safety نافذ کرنے کے بارے میں مزید جاننے کے لیے، ان سرکاری وسائل کا جائزہ لیں:

1. [Azure AI Content Safety دستاویزات](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety کے لیے سرکاری دستاویزات۔
2. [پرامپٹ شیلڈ دستاویزات](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - جانیں کہ پرامپٹ انجیکشن حملوں کو کیسے روکا جائے۔
3. [کنٹینٹ سیفٹی API ریفرنس](https://learn.microsoft.com/rest/api/contentsafety/) - کنٹینٹ سیفٹی نافذ کرنے کے لیے تفصیلی API ریفرنس۔
4. [کیک اسٹارٹ: C# کے ساتھ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# استعمال کرتے ہوئے فوری نافذ کرنے کے لیے گائیڈ۔
5. [کنٹینٹ سیفٹی کلائنٹ لائبریریز](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - مختلف پروگرامنگ زبانوں کے لیے کلائنٹ لائبریریز۔
6. [جیل بریک کوششوں کا پتہ لگانا](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - جیل بریک کوششوں کا پتہ لگانے اور روک تھام کرنے کے بارے میں مخصوص رہنمائی۔
7. [کنٹینٹ سیفٹی کے بہترین طریقے](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - موثر کنٹینٹ سیفٹی نافذ کرنے کے بہترین طریقے۔

مزید تفصیلی نفاذ کے لیے، ملاحظہ کریں ہمارا [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md)۔

## آگے کیا ہے

- پڑھیں: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)  
- واپس جائیں: [Security Module Overview](./README.md)  
- جاری رکھیں: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->