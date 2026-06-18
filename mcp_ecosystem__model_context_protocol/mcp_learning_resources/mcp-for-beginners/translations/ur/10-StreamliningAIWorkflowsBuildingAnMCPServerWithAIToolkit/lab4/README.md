# 🐙 ماڈیول 4: عملی MCP ترقی - حسب ضرورت GitHub کلون سرور

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ فوری آغاز:** ایک پیداواری تیار MCP سرور بنائیں جو صرف 30 منٹ میں GitHub ریپوزیٹری کلوننگ اور VS Code انضمام کو خودکار بنائے!

## 🎯 سیکھنے کے مقاصد

اس لیب کے اختتام پر، آپ قابل ہونگے:

- ✅ حقیقی دنیا کی ترقیاتی ورک فلو کے لیے ایک حسب ضرورت MCP سرور تخلیق کریں
- ✅ MCP کے ذریعے GitHub ریپوزیٹری کلوننگ کی فعالیت کو نافذ کریں
- ✅ حسب ضرورت MCP سرورز کو VS Code اور Agent Builder کے ساتھ مربوط کریں
- ✅ حسب ضرورت MCP ٹولز کے ساتھ GitHub Copilot Agent Mode کا استعمال کریں
- ✅ پیداواری ماحول میں حسب ضرورت MCP سرورز کا ٹیسٹ اور تعینات کریں

## 📋 ضروریات

- لیبز 1-3 مکمل ہو چکی ہوں (MCP بنیادیات اور ترقی کی اعلی سطح)
- GitHub Copilot کی رکنیت ([مفت سائن اپ دستیاب](https://github.com/github-copilot/signup))
- VS Code میں Microsoft Foundry Toolkit اور GitHub Copilot ایکسٹینشنز
- Git CLI انسٹال اور ترتیب دیا گیا ہو

## 🏗️ پراجیکٹ کا جائزہ

### **حقیقی دنیا کا ترقیاتی چیلنج**

بطور ڈویلپرز، ہم اکثر GitHub استعمال کرتے ہیں ریپوزیٹریز کلون کرنے کے لیے اور انہیں VS Code یا VS Code Insiders میں کھولنے کے لیے۔ یہ دستی عمل شامل ہوتا ہے:
1. ٹرمینل/کمانڈ پرامپٹ کھولنا
2. مطلوبہ ڈائریکٹری میں جانا
3. `git clone` کمانڈ چلانا
4. کلون کی گئی ڈائریکٹری میں VS Code کھولنا

**ہمارے MCP حل نے اس کو ایک ذہین کمانڈ میں سادہ بنا دیا ہے!**

### **جو آپ بنائیں گے**

ایک **GitHub Clone MCP Server** (`git_mcp_server`) جو فراہم کرتا ہے:

| فیچر | وضاحت | فائدہ |
|---------|-------------|---------|
| 🔄 **ذہین ریپوزیٹری کلوننگ** | تصدیق کے ساتھ GitHub ریپوز کلون کریں | خودکار غلطی چیکنگ |
| 📁 **ذہین ڈائریکٹری مینجمنٹ** | فولڈرز کا محفوظ چیک اور تخلیق کریں | اوور رائٹنگ سے بچاؤ |
| 🚀 **کراس-پلیٹ فارم VS Code انضمام** | VS Code/Insiders میں پروجیکٹس کھولیں | آسان ورک فلو منتقلی |
| 🛡️ **مضبوط ایرر ہینڈلنگ** | نیٹ ورک، اجازت اور راستے کے مسائل سنبھالیں | پیداواری سطح کی اعتمادیت |

---

## 📖 مرحلہ وار نفاذ

### مرحلہ 1: Agent Builder میں GitHub ایجنٹ بنائیں

1. Microsoft Foundry Toolkit ایکسٹینشن کے ذریعے **Agent Builder شروع کریں**
2. مندرجہ ذیل ترتیب کے ساتھ **نیا ایجنٹ بنائیں:**
   ```
   Agent Name: GitHubAgent
   ```

3. **حسب ضرورت MCP سرور شروع کریں:**
   - **Tools** → **Add Tool** → **MCP Server** پر جائیں
   - **"Create A new MCP Server"** منتخب کریں
   - زیادہ سے زیادہ لچک کے لیے **Python template** منتخب کریں
   - **سرور کا نام:** `git_mcp_server`

### مرحلہ 2: GitHub Copilot Agent Mode ترتیب دیں

1. VS Code میں **GitHub Copilot کھولیں** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot انٹرفیس میں **Agent Model منتخب کریں**
3. بہتر تجزیاتی صلاحیتوں کے لیے **Claude 3.7 ماڈل منتخب کریں**
4. ٹول تک رسائی کے لیے **MCP انضمام فعال کریں**

> **💡 پرو ٹپ:** Claude 3.7 ترقیاتی ورک فلو اور ایرر ہینڈلنگ کے نمونوں کی بہترین سمجھ فراہم کرتا ہے۔

### مرحلہ 3: MCP سرور کی بنیادی فعالیت کو نافذ کریں

**GitHub Copilot Agent Mode کے ساتھ مندرجہ ذیل مفصل پرامپٹ استعمال کریں:**

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

### مرحلہ 4: اپنے MCP سرور کا ٹیسٹ کریں

#### 4a. Agent Builder میں ٹیسٹ کریں

1. Agent Builder کے لیے **ڈی بگ کنفیگریشن شروع کریں**
2. اس سسٹم پرامپٹ کے ساتھ اپنا ایجنٹ ترتیب دیں:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. حقیقی صارف کے منظرناموں کے ساتھ ٹیسٹ کریں:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ur/DebugAgent.81d152370c503241.webp)

**متوقع نتائج:**
- ✅ راستے کی تصدیق کے ساتھ کامیاب کلوننگ
- ✅ خودکار VS Code کا آغاز
- ✅ غیر درست منظرناموں کے لیے واضح خطا پیغامات
- ✅ کنارے کے معاملات کی مناسب ہینڈلنگ

#### 4b. MCP Inspector میں ٹیسٹ کریں

![MCP Inspector Testing](../../../../translated_images/ur/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 مبارک ہو!** آپ نے کامیابی کے ساتھ ایک عملی، پیداواری تیار MCP سرور بنایا ہے جو حقیقی ترقیاتی ورک فلو چیلنجز کو حل کرتا ہے۔ آپ کا حسب ضرورت GitHub کلون سرور MCP کی طاقت کو ڈویلپر کی پیداواری صلاحیت کو خودکار بنانے اور بہتر بنانے کے لیے ظاہر کرتا ہے۔

### 🏆 کامیابی حاصل کی:
- ✅ **MCP ڈویلپر** - حسب ضرورت MCP سرور بنایا
- ✅ **ورک فلو آٹومیٹر** - ترقیاتی عمل کو آسان بنایا  
- ✅ **انضمام ماہر** - متعدد ترقیاتی ٹولز کو مربوط کیا
- ✅ **پیداواری تیار** - تعینات کیے جانے والے حل تیار کیے

---

## 🎓 ورکشاپ مکمل: آپ کا Model Context Protocol کے ساتھ سفر

**محترم ورکشاپ شرکاء،**

Model Context Protocol ورکشاپ کے تمام چار ماڈیولز مکمل کرنے پر مبارک ہو! آپ نے Microsoft Foundry Toolkit کے بنیادی تصورات سے لے کر پیداواری تیار MCP سرورز بنانے تک کا طویل سفر طے کیا ہے جو حقیقی دنیا کے ترقیاتی چیلنجز کو حل کرتے ہیں۔

### 🚀 آپ کا سیکھنے کا راستہ:

**[ماڈیول 1](../lab1/README.md)**: آپ نے Microsoft Foundry Toolkit بنیادیات، ماڈل ٹیسٹنگ، اور اپنا پہلا AI ایجنٹ بنانا شروع کیا۔

**[ماڈیول 2](../lab2/README.md)**: آپ نے MCP معماری سیکھی، Playwright MCP کو مربوط کیا، اور اپنا پہلا براؤزر آٹومیشن ایجنٹ بنایا۔

**[ماڈیول 3](../lab3/README.md)**: آپ نے موسم MCP سرور کے ساتھ حسب ضرورت MCP سرور کی ترقی میں مہارت حاصل کی اور ڈی بگنگ ٹولز میں ماہر بن گئے۔

**[ماڈیول 4](../lab4/README.md)**: آپ نے اب تک سب کچھ عملی GitHub ریپوزیٹری ورک فلو آٹومیشن ٹول بنانے میں لاگو کیا۔

### 🌟 آپ نے کیا مہارت حاصل کی:

- ✅ **Microsoft Foundry Toolkit ماحولیاتی نظام**: ماڈلز، ایجنٹس، اور انضمامی نمونے
- ✅ **MCP معماری**: کلائنٹ-سرور ڈیزائن، ٹرانسپورٹ پروٹوکولز، اور سیکیورٹی
- ✅ **ڈویلپر ٹولز**: پلے گراؤنڈ سے انسپکٹر تک، اور پیداواری تعیناتی تک
- ✅ **حسب ضرورت ترقی**: اپنے MCP سرورز کی تعمیر، جانچ اور تعیناتی
- ✅ **عملی اطلاقات**: AI کے ذریعے حقیقی دنیا کے ورک فلو چیلنجز کا حل

### 🔮 آپ کے اگلے اقدامات:

1. **اپنا MCP سرور بنائیں**: ان مہارتوں کو اپنے منفرد ورک فلو کو خودکار بنانے کے لیے استعمال کریں
2. **MCP کمیونٹی میں شامل ہوں**: اپنی تخلیقات شئیر کریں اور دوسروں سے سیکھیں
3. **اعلی درجے کے انضمام کو دریافت کریں**: MCP سرورز کو انٹرپرائز سسٹمز سے مربوط کریں
4. **اوپن سورس میں تعاون کریں**: MCP ٹولنگ اور دستاویزات کو بہتر بنانے میں مدد کریں

یاد رکھیں، یہ ورکشاپ صرف شروعات ہے۔ Model Context Protocol ماحولیاتی نظام تیزی سے ترقی کر رہا ہے، اور آپ اب AI سے چلنے والے ترقیاتی ٹولز کے محاذ پر ہیں۔

**شکریہ کہ آپ نے شرکت کی اور سیکھنے کے لیے اپنی لگن دکھائی!**

ہم امید کرتے ہیں کہ اس ورکشاپ نے آپ کو ایسے خیالات دیے ہوں گے جو آپ کی ترقیاتی سفر میں AI ٹولز کے ساتھ تعلق اور تعمیر کو بدل دیں گے۔

**خوش کوڈنگ!**

---

## آگے کیا ہے

ماڈیول 10 کی تمام لیبز مکمل کرنے پر مبارک ہو!

- واپس: [ماڈیول 10 کا جائزہ](../README.md)
- جاری رکھیں: [ماڈیول 11: MCP سرور ہینڈز آن لیبز](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->