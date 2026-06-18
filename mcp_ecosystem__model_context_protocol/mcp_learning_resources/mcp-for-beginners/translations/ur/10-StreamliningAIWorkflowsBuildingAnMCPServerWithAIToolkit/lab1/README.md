# 🚀 ماڈیول 1: Microsoft Foundry Toolkit کی بنیادی باتیں

[![مدت](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![مشکل](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![ضروریات](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 تعلیمی مقاصد

اس ماڈیول کے اختتام پر، آپ کر سکیں گے:
- ✅ Microsoft Foundry Toolkit ایکسٹینشن کو VS Code کے لیے انسٹال اور سیٹ اپ کرنا
- ✅ ماڈل کیٹلاگ میں نیویگیٹ کرنا اور مختلف ماڈل ذرائع کو سمجھنا
- ✅ ماڈل کی جانچ اور تجربے کے لیے Playground کا استعمال کرنا
- ✅ Agent Builder کے ذریعے کسٹم AI ایجنٹس بنانا
- ✅ مختلف فراہم کنندگان کے ماڈلز کی کارکردگی کا موازنہ کرنا
- ✅ پرومپٹ انجینئرنگ کی بہترین مشقیں اپنانا

## 🧠 Microsoft Foundry Toolkit کا تعارف

**Microsoft Foundry Toolkit Extension for VS Code** مائیکروسافٹ کی مرکزی توسیع ہے جو VS Code کو ایک مکمل AI ترقیاتی ماحول میں تبدیل کرتی ہے۔ یہ AI تحقیق اور عملی درخواست کی ترقی کے درمیان پُل کا کام کرتی ہے، اور جنریٹیو AI کو تمام مہارتوں والے ڈیولپرز کے لیے قابل رسائی بناتی ہے۔

### 🌟 کلیدی خصوصیات

| فیچر | وضاحت | استعمال کا کیس |
|---------|-------------|----------|
| **🗂️ ماڈل کیٹلاگ** | GitHub، ONNX، OpenAI، Anthropic، Google کے 100+ ماڈلز تک رسائی | ماڈل دریافت اور انتخاب |
| **🔌 BYOM سپورٹ** | اپنے ماڈلز (مقامی/ریموٹ) کو ایکیگریٹ کریں | کسٹم ماڈل تعیناتی |
| **🎮 انٹرایکٹو پلے گراؤنڈ** | چیٹ انٹرفیس کے ساتھ اصل وقت میں ماڈل ٹیسٹنگ | تیز رفتار پروٹوٹائپنگ اور جانچ |
| **📎 ملٹی موڈل سپورٹ** | متن، تصاویر، اور اٹیچمنٹس کو ہینڈل کریں | پیچیدہ AI ایپلیکیشنز |
| **⚡ بیچ پروسیسنگ** | ایک ساتھ کئی پرومپٹس چلائیں | مؤثر جانچ کے ورک فلو |
| **📊 ماڈل کا تجزیہ** | بلٹ ان میٹرکس (F1، مطابقت، مماثلت، ہم آہنگی) | کارکردگی کا جائزہ |

### 🎯 Microsoft Foundry Toolkit کیوں اہم ہے

- **🚀 تیز تر ترقی**: خیال سے لے کر پروٹوٹائپ چند منٹوں میں
- **🔄 متحد ورک فلو**: متعدد AI فراہم کنندگان کے لیے ایک انٹرفیس
- **🧪 آسان تجربات**: پیچی دہ سیٹ اپ کے بغیر ماڈلز کا موازنہ کریں
- **📈 پروڈکشن کے لیے تیار**: پروٹوٹائپ سے تعیناتی تک آسان منتقلی

## 🛠️ ضروریات اور سیٹ اپ

### 📦 Microsoft Foundry Toolkit ایکسٹینشن انسٹال کریں

**مرحلہ 1: ایکسٹینشنز مارکیٹ پلیس تک رسائی**
1. Visual Studio Code کھولیں
2. ایکسٹینشنز ویو میں جائیں (`Ctrl+Shift+X` یا `Cmd+Shift+X`)
3. "Microsoft Foundry Toolkit" تلاش کریں

**مرحلہ 2: اپنی ورژن منتخب کریں**
- **🟢 ریلیز**: پروڈکشن کے استعمال کے لیے تجویز شدہ
- **🔶 پری ریلیز**: جدید خصوصیات کے لیے ابتدائی رسائی

**مرحلہ 3: انسٹال کریں اور فعال کریں**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ur/aitkext.d28945a03eed003c.webp)

### ✅ تصدیقی چیک لسٹ
- [ ] Microsoft Foundry Toolkit کا آئیکن VS Code سائڈبار میں دکھائی دے رہا ہے
- [ ] ایکسٹینشن فعال اور چالو ہے
- [ ] آؤٹ پٹ پینل میں کوئی انسٹالیشن غلطیاں نہیں ہیں

## 🧪 ہینڈز آن مشق 1: GitHub ماڈلز کی دریافت

**🎯 مقصد**: ماڈل کیٹلاگ میں مہارت حاصل کریں اور اپنا پہلا AI ماڈل آزمائیں

### 📊 مرحلہ 1: ماڈل کیٹلاگ میں نیویگیٹ کریں

ماڈل کیٹلاگ آپ کے AI ماحولیاتی نظام کا گیٹ وے ہے۔ یہ متعدد فراہم کنندگان کے ماڈلز کو یکجا کرتا ہے تاکہ آپ آسانی سے دریافت اور موازنہ کر سکیں۔

**🔍 نیویگیشن گائیڈ:**

Microsoft Foundry Toolkit سائڈبار میں **MODELS - Catalog** پر کلک کریں

![Model Catalog](../../../../translated_images/ur/aimodel.263ed2be013d8fb0.webp)

**💡 پرو ٹپ**: ان ماڈلز کی تلاش کریں جن کی مخصوص صلاحیتیں آپ کے استعمال کے کیس سے میل کھاتی ہوں (جیسے کوڈ جنریشن، تخلیقی تحریر، تجزیہ)۔

**⚠️ نوٹ**: GitHub ہوسٹ کیے گئے ماڈلز (یعنی GitHub ماڈلز) مفت ہیں لیکن درخواستوں اور ٹوکنز کی شرح کی حدوں کے تابع ہیں۔ اگر آپ غیر GitHub ماڈلز (مثلاً Azure AI یا دیگر اینڈ پوائنٹس پر ہوسٹ کیے گئے خارجی ماڈلز) تک رسائی چاہتے ہیں، تو آپ کو مناسب API کلید یا توثیق فراہم کرنا ہوگی۔

### 🚀 مرحلہ 2: اپنا پہلا ماڈل شامل کریں اور ترتیب دیں

**ماڈل انتخاب کی حکمت عملی:**
- **GPT-4.1**: پیچیدہ منطق اور تجزیہ کے لیے بہترین
- **Phi-4-mini**: ہلکا پھلکا، سادہ کاموں کے لیے تیز جواب

**🔧 ترتیب کا عمل:**
1. کیٹلاگ سے **OpenAI GPT-4.1** منتخب کریں
2. **Add to My Models** پر کلک کریں - اس سے ماڈل رجسٹر ہو جائے گا
3. **Try in Playground** منتخب کریں تاکہ ٹیسٹنگ ماحول کھلے
4. ماڈل کی ابتدا کا انتظار کریں (پہلی بار سیٹ اپ میں وقت لگ سکتا ہے)

![Playground Setup](../../../../translated_images/ur/playground.dd6f5141344878ca.webp)

**⚙️ ماڈل پیرامیٹرز کو سمجھنا:**
- **Temperature**: تخلیقی صلاحیت کو کنٹرول کرتا ہے (0 = متعین، 1 = تخلیقی)
- **Max Tokens**: زیادہ سے زیادہ جواب کی لمبائی
- **Top-p**: جوابی تنوع کے لیے نیوکلئیس سیمپلنگ

### 🎯 مرحلہ 3: Playground انٹرفیس پر عبور حاصل کریں

Playground آپ کی AI تجرباتی لیب ہے۔ یہاں اس کی صلاحیت کو زیادہ سے زیادہ کرنے کا طریقہ ہے:

**🎨 پرومپٹ انجینئرنگ کی بہترین مشقیں:**
1. **مخصوص رہیں**: واضح اور تفصیلی ہدایات بہتر نتائج دیتی ہیں
2. **تناظر فراہم کریں**: متعلقہ پس منظر شامل کریں
3. **مثالیں دیں**: ماڈل کو آپ کیا چاہتے ہیں یہ مثالوں سے دکھائیں
4. **دہرائیں**: ابتدائی نتائج کی بنیاد پر پرومپٹس کو بہتر بنائیں

**🧪 جانچ کے منظرنامے:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/ur/result.1dfcf211fb359cf6.webp)

### 🏆 چیلنج مشق: ماڈل کارکردگی کا موازنہ

**🎯 مقصد**: ایک جیسے پرومپٹس استعمال کرکے مختلف ماڈلز کا موازنہ کریں تاکہ ان کی طاقتوں کو سمجھا جا سکے

**📋 ہدایات:**
1. اپنا workspace میں **Phi-4-mini** شامل کریں
2. GPT-4.1 اور Phi-4-mini دونوں کے لیے ایک جیسے پرومپٹ استعمال کریں

![set](../../../../translated_images/ur/set.88132df189ecde2c.webp)

3. جواب کی معیار، رفتار، اور درستگی کا موازنہ کریں
4. نتائج کے سیکشن میں اپنی دریافتیں دستاویزی شکل میں لکھیں

![Model Comparison](../../../../translated_images/ur/compare.97746cd0f9074955.webp)

**💡 دریافت کرنے کے لیے کلیدی بصیرتیں:**
- کب LLM استعمال کرنا ہے اور کب SLM
- لاگت بمقابلہ کارکردگی کے فوائد
- مختلف ماڈلز کی خصوصی صلاحیتیں

## 🤖 ہینڈز آن مشق 2: Agent Builder کے ساتھ کسٹم ایجنٹس بنانا

**🎯 مقصد**: مخصوص کاموں اور ورک فلو کے لیے مخصوص AI ایجنٹس تخلیق کریں

### 🏗️ مرحلہ 1: Agent Builder کو سمجھنا

Agent Builder وہ جگہ ہے جہاں Microsoft Foundry Toolkit واقعی ممتاز ہوتا ہے۔ یہ آپ کو مقصد کے مطابق AI اسسٹنٹس بنانے دیتا ہے جو بڑے زبان ماڈلز کی طاقت کو کسٹم ہدایات، مخصوص پیرامیٹرز، اور خصوصی علم کے ساتھ جوڑتا ہے۔

**🧠 ایجنٹ آرکیٹیکچر کے اجزاء:**
- **کور ماڈل**: بنیادی LLM (GPT-4، Groks، Phi، وغیرہ)
- **سسٹم پرومپٹ**: ایجنٹ کی شخصیت اور رویہ کی وضاحت کرتا ہے
- **پیرامیٹرز**: بہترین کارکردگی کے لیے فائن ٹیون شدہ سیٹنگز
- **ٹولز انٹیگریشن**: خارجی APIs اور MCP سروسز سے کنکشن
- **میموری**: گفتگو کا پس منظر اور سیشن کی مسلسل حیثیت

![Agent Builder Interface](../../../../translated_images/ur/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ مرحلہ 2: ایجنٹ کی ترتیب میں گہرا جائزہ

**🎨 مؤثر سسٹم پرومپٹس بنانا:**
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

*ظاہر ہے، آپ Generate System Prompt بھی استعمال کر سکتے ہیں تاکہ AI آپ کی مدد کرے پرومپٹس تیار اور بہتر بنانے میں*

**🔧 پیرامیٹر کی اصلاح:**
| پیرامیٹر | تجویز کردہ حد | استعمال کا کیس |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | تکنیکی/حقائق پر مبنی جوابات |
| **Temperature** | 0.7-0.9 | تخلیقی/دماغی طوفان کے کام |
| **Max Tokens** | 500-1000 | مختصر جوابات |
| **Max Tokens** | 2000-4000 | تفصیلی وضاحتیں |

### 🐍 مرحلہ 3: عملی مشق - Python پروگرامنگ ایجنٹ

**🎯 مشن**: ایک مخصوص Python کوڈنگ اسسٹنٹ بنائیں

**📋 ترتیب کے مراحل:**

1. **ماڈل منتخب کریں**: **Claude 3.5 Sonnet** منتخب کریں (کوڈ کے لیے بہترین)

2. **سسٹم پرومپٹ ڈیزائن**:
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

3. **پیرامیٹر کی ترتیب**:
   - Temperature: 0.2 (مستقل، قابل اعتماد کوڈ کے لیے)
   - Max Tokens: 2000 (تفصیلی وضاحتیں)
   - Top-p: 0.9 (متوازن تخلیقی صلاحیت)

![Python Agent Configuration](../../../../translated_images/ur/pythonagent.5e51b406401c165f.webp)

### 🧪 مرحلہ 4: اپنے Python ایجنٹ کی جانچ

**جانچ کے منظرنامے:**
1. **بنیادی فنکشن**: "پرائم نمبر تلاش کرنے کے لیے فنکشن بنائیں"
2. **پیچیدہ الگورتھم**: "انسرٹ، ڈیلیٹ، اور سرچ میتھڈز کے ساتھ بائنری سرچ ٹری نافذ کریں"
3. **حقیقی دنیا کا مسئلہ**: "ویب سکریپر بنائیں جو ریٹ لمیٹنگ اور ریٹرا ئیز کو ہینڈل کرے"
4. **ڈیبگنگ**: "اس کوڈ کو درست کریں [خراب کوڈ پیسٹ کریں]"

**🏆 کامیابی کے معیار:**
- ✅ کوڈ بغیر غلطیوں کے چلتا ہے
- ✅ مناسب دستاویزات شامل ہیں
- ✅ Python کی بہترین مشقوں کی پیروی کرتا ہے
- ✅ واضح وضاحتیں فراہم کرتا ہے
- ✅ بہتری کی تجاویز پیش کرتا ہے

## 🎓 ماڈیول 1 کا خلاصہ اور آگے کے اقدامات

### 📊 علم کی جانچ

اپنی سمجھ کا امتحان لیں:
- [ ] کیا آپ کیٹلاگ میں ماڈلز کے فرق کی وضاحت کر سکتے ہیں؟
- [ ] کیا آپ نے کامیابی سے ایک کسٹم ایجنٹ بنایا اور ٹیسٹ کیا ہے؟
- [ ] کیا آپ مختلف استعمال کے کیسز کے لیے پیرامیٹرز کو بہتر بنانا سمجھتے ہیں؟
- [ ] کیا آپ مؤثر سسٹم پرومپٹس ڈیزائن کر سکتے ہیں؟

### 📚 اضافی وسائل

- **Microsoft Foundry Toolkit دستاویزات**: [سرکاری مائیکروسافٹ ڈاکس](https://github.com/microsoft/vscode-ai-toolkit)
- **پرومپٹ انجینئرنگ گائیڈ**: [بہترین مشقیں](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkit میں ماڈلز**: [ڈیولپمنٹ میں ماڈلز](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 مبارک ہو!** آپ نے Microsoft Foundry Toolkit کی بنیادی باتوں پر عبور حاصل کر لیا ہے اور آپ مزید ترقی یافتہ AI ایپلیکیشنز بنانے کے لیے تیار ہیں!

### 🔜 اگلے ماڈیول پر جاری رکھیں

مزید جدید صلاحیتوں کے لیے تیار ہیں؟ جاری رکھیں **[Module 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** جہاں آپ سیکھیں گے کہ:
- اپنے ایجنٹس کو Model Context Protocol (MCP) کے ذریعے خارجی ٹولز سے جوڑنا
- Playwright کے ساتھ براؤزر آٹومیشن ایجنٹس بنانا
- Microsoft Foundry Toolkit کے ایجنٹس کے ساتھ MCP سرورز کو مربوط کرنا
- اپنے ایجنٹس کو خارجی ڈیٹا اور صلاحیتوں کے ساتھ سپرچارج کرنا

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->