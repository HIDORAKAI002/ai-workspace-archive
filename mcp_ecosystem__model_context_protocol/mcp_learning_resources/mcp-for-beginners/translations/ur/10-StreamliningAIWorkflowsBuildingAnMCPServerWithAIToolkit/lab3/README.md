# 🔧 ماڈیول 3: مائیکروسافٹ فاؤنڈری ٹول کٹ کے ساتھ ایڈوانس MCP ڈیویلپمنٹ

![مدت](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![مائیکروسافٹ فاؤنڈری ٹول کٹ](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![پائتھن](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![انسپکٹر](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 تعلیمی مقاصد

اس لیب کے اختتام تک، آپ قادر ہوں گے:

- ✅ مائیکروسافٹ فاؤنڈری ٹول کٹ استعمال کر کے اپنی مرضی کے مطابق MCP سرورز بنائیں
- ✅ جدید ترین MCP پائتھن SDK (ورژن 1.9.3) ترتیب دیں اور استعمال کریں
- ✅ MCP انسپکٹر کو ڈیبگنگ کے لیے ترتیب دیں اور استعمال کریں
- ✅ ایجنٹ بلڈر اور انسپکٹر دونوں ماحول میں MCP سرورز کو ڈیبگ کریں
- ✅ ایڈوانس MCP سرور ڈیویلپمنٹ کے ورک فلو کو سمجھیں

## 📋 ضروریات

- لیب 2 (MCP بنیادیات) کا مکمل ہونا
- VS Code میں مائیکروسافٹ فاؤنڈری ٹول کٹ ایکسٹینشن انسٹال ہونا
- پائتھن 3.10+ کا ماحول
- انسپکٹر کی ترتیب کے لیے Node.js اور npm

## 🏗️ آپ کیا بنائیں گے

اس لیب میں، آپ ایک **موسمی MCP سرور** بنائیں گے جو دکھاتا ہے:
- اپنی مرضی کا MCP سرور نفاذ
- مائیکروسافٹ فاؤنڈری ٹول کٹ ایجنٹ بلڈر کے ساتھ انٹیگریشن
- پیشہ ورانہ ڈیبگنگ ورک فلو
- جدید MCP SDK استعمال کی مثالیں

---

## 🔧 مرکزی اجزاء کا جائزہ

### 🐍 MCP پائتھن SDK
ماڈل کانٹیکسٹ پروٹوکول پائتھن SDK اپنی مرضی کے MCP سرورز بنانے کی بنیاد فراہم کرتا ہے۔ آپ ورژن 1.9.3 استعمال کریں گے جس میں بہتر ڈیبگنگ صلاحیتیں ہیں۔

### 🔍 MCP انسپکٹر
ایک طاقتور ڈیبگنگ ٹول جو فراہم کرتا ہے:
- ریئل ٹائم سرور مانیٹرنگ
- ٹولز کی عمل آوری کا ویژؤلائزیشن
- نیٹ ورک درخواست/ردعمل کا معائنہ
- انٹرایکٹو ٹیسٹنگ ماحول

---

## 📖 مرحلہ وار نفاذ

### مرحلہ 1: ایجنٹ بلڈر میں WeatherAgent بنائیں

1. **VS Code میں مائیکروسافٹ فاؤنڈری ٹول کٹ ایکسٹینشن کے ذریعے ایجنٹ بلڈر لانچ کریں**
2. **نیا ایجنٹ بنائیں** مندرجہ ذیل ترتیب کے ساتھ:
   - ایجنٹ کا نام: `WeatherAgent`

![ایجنٹ تخلیق](../../../../translated_images/ur/Agent.c9c33f6a412b4cde.webp)

### مرحلہ 2: MCP سرور پراجیکٹ کی شروعات کریں

1. **ایجنٹ بلڈر میں Tools** → **Add Tool** پر جائیں
2. **"MCP Server" منتخب کریں**
3. **"Create A new MCP Server" منتخب کریں**
4. **`python-weather` ٹیمپلیٹ منتخب کریں**
5. **اپنے سرور کا نام رکھیں:** `weather_mcp`

![پائتھن ٹیمپلیٹ انتخاب](../../../../translated_images/ur/Pythontemplate.9d0a2913c6491500.webp)

### مرحلہ 3: پراجیکٹ کھولیں اور جائزہ لیں

1. **جنریٹ شدہ پراجیکٹ VS Code میں کھولیں**
2. **پراجیکٹ کی ساخت کا جائزہ لیں:**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### مرحلہ 4: جدید ترین MCP SDK پر اپ گریڈ کریں

> **🔍 اپ گریڈ کیوں؟** ہم جدید فیچرز اور بہتر ڈیبگنگ صلاحیتوں کے لیے جدید ترین MCP SDK (ورژن 1.9.3) اور انسپکٹر سروس (0.14.0) استعمال کرنا چاہتے ہیں۔

#### 4a. پائتھن انحصاریوں کو اپ ڈیٹ کریں

**`pyproject.toml` ترمیم کریں:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) اپ ڈیٹ کریں


#### 4b. انسپکٹر کنفیگریشن اپ ڈیٹ کریں

**`inspector/package.json` ترمیم کریں:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) اپ ڈیٹ کریں

#### 4c. انسپکٹر انحصاری اپ ڈیٹ کریں

**`inspector/package-lock.json` ترمیم کریں:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) اپ ڈیٹ کریں

> **📝 نوٹ:** یہ فائل مکمل انحصاری تعاریف پر مشتمل ہے۔ نیچے بنیادی ڈھانچہ دکھایا گیا ہے - مکمل فائل بہتر انحصاری حل فراہم کرتی ہے۔

> **⚡ مکمل پیکیج لاک:** مکمل package-lock.json میں تقریباً 3000 لائنز کی انحصاری تعاریف ہوتی ہیں۔ اوپر کلیدی ڈھانچہ دکھایا گیا ہے - مکمل حل کے لیے فراہم کردہ فائل استعمال کریں۔

### مرحلہ 5: VS Code ڈیبگنگ کو ترتیب دیں

*نوٹ: براہ کرم مخصوص راستے کی فائل کو کاپی کر کے متعلقہ لوکل فائل کی جگہ رکھیں*

#### 5a. لانچ کنفیگریشن اپ ڈیٹ کریں

**`.vscode/launch.json` ترمیم کریں:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**`.vscode/tasks.json` ترمیم کریں:**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 اپنے MCP سرور کو چلانا اور ٹیسٹ کرنا

### مرحلہ 6: انحصاری انسٹال کریں

کنفیگریشن تبدیلیاں کرنے کے بعد درج ذیل کمانڈز چلائیں:

**پائتھن انحصاری انسٹال کریں:**
```bash
uv sync
```

**انسپکٹر انحصاری انسٹال کریں:**
```bash
cd inspector
npm install
```


### مرحلہ 7: ایجنٹ بلڈر میں ڈیبگ کریں

1. **F5 دبائیں** یا **"Debug in Agent Builder"** کنفیگریشن استعمال کریں
2. **ڈیبگ پینل سے کمپاؤنڈ کنفیگریشن منتخب کریں**
3. **سرور کے شروع ہونے اور ایجنٹ بلڈر کے کھلنے کا انتظار کریں**
4. **اپنے موسمی MCP سرور کو نیچرل لینگویج سوالات کے ساتھ ٹیسٹ کریں**

اس طرح کا ان پٹ پرامپٹ دیں

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![ایجنٹ بلڈر ڈیبگ نتیجہ](../../../../translated_images/ur/Result.6ac570f7d2b1d538.webp)

### مرحلہ 8: MCP انسپکٹر کے ساتھ ڈیبگ کریں

1. **"Debug in Inspector" کنفیگریشن استعمال کریں** (Edge یا Chrome)
2. **انسپکٹر انٹرفیس کھولیں** `http://localhost:6274` پر
3. **انٹرایکٹو ٹیسٹنگ ماحول کا جائزہ لیں:**
   - دستیاب ٹولز دیکھیں
   - ٹول کی عمل آوری ٹیسٹ کریں
   - نیٹ ورک درخواستوں کی مانیٹرنگ کریں
   - سرور کے ردعمل کو ڈیبگ کریں

![MCP انسپکٹر انٹرفیس](../../../../translated_images/ur/Inspector.5672415cd02fe873.webp)

---

## 🎯 کلیدی تعلیمی نتائج

اس لیب کو مکمل کرنے کے بعد آپ نے:

- [x] **مائیکروسافٹ فاؤنڈری ٹول کٹ ٹیمپلیٹس سے اپنی مرضی کا MCP سرور بنایا**
- [x] **جدید MCP SDK (ورژن 1.9.3) پر اپ گریڈ کیا**
- [x] **ایجنٹ بلڈر اور انسپکٹر دونوں کے لیے پیشہ ورانہ ڈیبگنگ ورک فلو ترتیب دیا**
- [x] **MCP انسپکٹر کو انٹرایکٹو سرور ٹیسٹنگ کے لیے ترتیب دیا**
- [x] **MCP ڈیویلپمنٹ کے لیے VS Code ڈیبگنگ کنفیگریشن میں مہارت حاصل کی**

## 🔧 ایڈوانس خصوصیات کا جائزہ

| خصوصیت | وضاحت | استعمال کا کیس |
|---------|-------------|----------|
| **MCP پائتھن SDK v1.9.3** | جدید پروٹوکول نفاذ | جدید سرور ڈیویلپمنٹ |
| **MCP انسپکٹر 0.14.0** | انٹرایکٹو ڈیبگنگ ٹول | ریئل ٹائم سرور ٹیسٹنگ |
| **VS Code ڈیبگنگ** | مربوط ڈیویلپمنٹ ماحول | پیشہ ورانہ ڈیبگنگ ورک فلو |
| **ایجنٹ بلڈر انٹیگریشن** | مائیکروسافٹ فاؤنڈری ٹول کٹ سے براہ راست کنکشن | مکمل ایجنٹ ٹیسٹنگ |

## 📚 اضافی وسائل

- [MCP پائتھن SDK دستاویزات](https://modelcontextprotocol.io/docs/sdk/python)
- [مائیکروسافٹ فاؤنڈری ٹول کٹ ایکسٹینشن گائیڈ](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code ڈیبگنگ دستاویزات](https://code.visualstudio.com/docs/editor/debugging)
- [ماڈل کانٹیکسٹ پروٹوکول وضاحت](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 مبارک ہو!** آپ نے کامیابی سے لیب 3 مکمل کر لی ہے اور اب آپ پیشہ ورانہ ڈیویلپمنٹ ورک فلو کے ذریعے اپنی مرضی کے MCP سرورز بنا، ڈیبگ اور تعینات کر سکتے ہیں۔

### 🔜 اگلے ماڈیول کی طرف بڑھیں

کیا آپ اپنے MCP ہنر کو حقیقی عالمی ڈیویلپمنٹ ورک فلو میں لاگو کرنے کے لیے تیار ہیں؟ اگلے ماڈیول **[ماڈیول 4: عملی MCP ڈیویلپمنٹ - کسٹم گٹ ہب کلون سرور](../lab4/README.md)** کی طرف بڑھیں جہاں آپ:
- ایک پروڈکشن کے قابل MCP سرور بنائیں گے جو گٹ ہب ریپوزیٹری آپریشنز کو خودکار بنائے گا
- MCP کے ذریعے گٹ ہب ریپوزیٹری کلوننگ کی فعالیت نافذ کریں گے
- VS Code اور گٹ ہب کوپائلٹ ایجنٹ موڈ کے ساتھ اپنی مرضی کے MCP سرورز کو انٹیگریٹ کریں گے
- پروڈکشن ماحول میں MCP سرورز کا ٹیسٹ اور تعینات کریں گے
- ڈویلپرز کے لیے عملی ورک فلو آٹومیشن سیکھیں گے

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->