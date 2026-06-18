# 🔧 الوحدة 3: تطوير متقدم لـ MCP باستخدام مجموعة أدوات Microsoft Foundry

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 أهداف التعلم

بنهاية هذا المختبر، ستكون قادرًا على:

- ✅ إنشاء خوادم MCP مخصصة باستخدام مجموعة أدوات Microsoft Foundry
- ✅ تكوين واستخدام أحدث إصدار من MCP Python SDK (النسخة 1.9.3)
- ✅ إعداد واستخدام MCP Inspector لأغراض التصحيح
- ✅ تصحيح خوادم MCP في بيئتي Agent Builder وInspector
- ✅ فهم سير عمل تطوير خوادم MCP المتقدم

## 📋 المتطلبات الأساسية

- إكمال المختبر 2 (أساسيات MCP)
- وجود VS Code مع إضافة Microsoft Foundry Toolkit مثبتة
- بيئة Python 3.10 أو أحدث
- Node.js و npm لإعداد Inspector

## 🏗️ ما ستقوم ببنائه

في هذا المختبر، ستقوم بإنشاء **خادم MCP للطقس** يُظهر ما يلي:
- تنفيذ خادم MCP مخصص
- التكامل مع Agent Builder في مجموعة أدوات Microsoft Foundry
- سير عمل احترافي للتصحيح
- أنماط استخدام حديثة لمكتبة MCP SDK

---

## 🔧 نظرة عامة على المكونات الأساسية

### 🐍 MCP Python SDK
توفر مكتبة Model Context Protocol الخاصة بـ Python الأساس لبناء خوادم MCP مخصصة. ستستخدم النسخة 1.9.3 مع ميزات تصحيح محسنة.

### 🔍 MCP Inspector
أداة تصحيح قوية توفر:
- مراقبة الخادم في الوقت الحقيقي
- تصور تنفيذ الأدوات
- فحص طلبات واستجابات الشبكة
- بيئة اختبار تفاعلية

---

## 📖 التنفيذ خطوة بخطوة

### الخطوة 1: إنشاء WeatherAgent في Agent Builder

1. **افتح Agent Builder** في VS Code عبر إضافة Microsoft Foundry Toolkit
2. **أنشئ وكيلًا جديدًا** بالتكوين التالي:
   - اسم الوكيل: `WeatherAgent`

![Agent Creation](../../../../translated_images/ar/Agent.c9c33f6a412b4cde.webp)

### الخطوة 2: تهيئة مشروع MCP Server

1. **انتقل إلى Tools** → **Add Tool** في Agent Builder
2. **اختر "MCP Server"** من الخيارات المتاحة
3. **اختر "Create A new MCP Server"**
4. **حدد القالب `python-weather`**
5. **قم بتسمية الخادم الخاص بك:** `weather_mcp`

![Python Template Selection](../../../../translated_images/ar/Pythontemplate.9d0a2913c6491500.webp)

### الخطوة 3: افتح وتفحص المشروع

1. **افتح المشروع الذي تم إنشاؤه** في VS Code
2. **راجع هيكل المشروع:**
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

### الخطوة 4: الترقية إلى أحدث إصدار من MCP SDK

> **🔍 لماذا الترقية؟** نريد استخدام أحدث إصدار من MCP SDK (النسخة 1.9.3) وخدمة Inspector (الإصدار 0.14.0) لميزات محسنة وقدرات تصحيح أفضل.

#### 4a. تحديث تبعيات Python

**عدل `pyproject.toml`:** تحديث الملف [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. تحديث تكوين Inspector

**عدل `inspector/package.json`:** تحديث الملف [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. تحديث تبعيات Inspector

**عدل `inspector/package-lock.json`:** تحديث الملف [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 ملاحظة:** يحتوي هذا الملف على تعريفات تبعيات كبيرة. فيما يلي الهيكل الأساسي - المحتوى الكامل يضمن حل الاعتمادية بشكل صحيح.

> **⚡ قفل الحزمة الكامل:** يحتوي package-lock.json الكامل على حوالي 3000 سطر من تعريفات التبعيات. ما سبق يوضح الهيكل الرئيسي - استخدم الملف المرفق لحل كامل للتبعيات.

### الخطوة 5: تكوين تصحيح الأخطاء في VS Code

*ملاحظة: يرجى نسخ الملف في المسار المحدد لاستبدال الملف المحلي المقابل*

#### 5a. تحديث تكوين الإطلاق

**عدل `.vscode/launch.json`:**

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

**عدل `.vscode/tasks.json`:**

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

## 🚀 تشغيل واختبار خادم MCP الخاص بك

### الخطوة 6: تثبيت التبعيات

بعد إجراء تغييرات التكوين، شغّل الأوامر التالية:

**تثبيت تبعيات Python:**
```bash
uv sync
```

**تثبيت تبعيات Inspector:**
```bash
cd inspector
npm install
```

### الخطوة 7: التصحيح باستخدام Agent Builder

1. **اضغط على F5** أو استخدم إعداد "Debug in Agent Builder"
2. **اختر التكوين المركب** من لوحة التصحيح
3. **انتظر حتى يبدأ الخادم** وفتح Agent Builder
4. **اختبر خادم MCP الخاص بالطقس** باستخدام استفسارات اللغة الطبيعية

أدخل مدخلات مثل هذه

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ar/Result.6ac570f7d2b1d538.webp)

### الخطوة 8: التصحيح باستخدام MCP Inspector

1. **استخدم إعداد "Debug in Inspector"** (على متصفح Edge أو Chrome)
2. **افتح واجهة Inspector** على العنوان `http://localhost:6274`
3. **استكشف بيئة الاختبار التفاعلية:**
   - عرض الأدوات المتاحة
   - اختبار تنفيذ الأدوات
   - مراقبة طلبات الشبكة
   - تصحيح استجابات الخادم

![MCP Inspector Interface](../../../../translated_images/ar/Inspector.5672415cd02fe873.webp)

---

## 🎯 النتائج الرئيسية للتعلم

عند إتمام هذا المختبر، تكون قد:

- [x] **أنشأت خادم MCP مخصص** باستخدام قوالب Microsoft Foundry Toolkit
- [x] **قمت بالترقية إلى أحدث MCP SDK** (النسخة 1.9.3) لوظائف محسنة
- [x] **كونت سير عمل احترافي للتصحيح** لكل من Agent Builder وInspector
- [x] **أعددت MCP Inspector** لاختبار الخادم التفاعلي
- [x] **أتقنت تكوينات تصحيح الأخطاء في VS Code** لتطوير MCP

## 🔧 الميزات المتقدمة التي تم استكشافها

| الميزة | الوصف | حالة الاستخدام |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | أحدث تنفيذ للبروتوكول | تطوير الخوادم الحديثة |
| **MCP Inspector 0.14.0** | أداة تصحيح تفاعلية | اختبار الخوادم في الوقت الحقيقي |
| **تصحيح VS Code** | بيئة تطوير متكاملة | سير عمل تصحيح احترافي |
| **تكامل Agent Builder** | اتصال مباشر مع Microsoft Foundry Toolkit | اختبار الوكلاء من البداية إلى النهاية |

## 📚 موارد إضافية

- [توثيق MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [دليل إضافة Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [توثيق تصحيح VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [مواصفات Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 تهانينا!** لقد أكملت بنجاح المختبر 3 وأصبحت الآن قادرًا على إنشاء وتصحيح ونشر خوادم MCP مخصصة باستخدام سير عمل تطوير احترافي.

### 🔜 تابع إلى الوحدة التالية

هل أنت مستعد لتطبيق مهارات MCP على سير عمل تطوير واقعي؟ تابع إلى **[الوحدة 4: تطوير MCP عملي - خادم استنساخ GitHub مخصص](../lab4/README.md)** حيث ستقوم بـ:
- بناء خادم MCP جاهز للإنتاج لأتمتة عمليات مستودعات GitHub
- تنفيذ وظيفة استنساخ مستودعات GitHub عبر MCP
- دمج خوادم MCP مخصصة مع VS Code ووضع GitHub Copilot Agent
- اختبار ونشر خوادم MCP مخصصة في بيئات الإنتاج
- تعلم أتمتة سير العمل العملي للمطورين

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->