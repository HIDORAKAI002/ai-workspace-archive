# 🔧 ماژول ۳: توسعه پیشرفته MCP با Microsoft Foundry Toolkit

![مدت زمان](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![پایتون](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 اهداف یادگیری

تا پایان این آزمایشگاه، شما قادر خواهید بود:

- ✅ ایجاد سرورهای سفارشی MCP با استفاده از Microsoft Foundry Toolkit
- ✅ پیکربندی و استفاده از جدیدترین SDK پایتون MCP (نسخه 1.9.3)
- ✅ راه‌اندازی و استفاده از MCP Inspector برای اشکال‌زدایی
- ✅ اشکال‌زدایی سرورهای MCP در هر دو محیط Agent Builder و Inspector
- ✅ درک جریان‌های کاری پیشرفته توسعه سرور MCP

## 📋 پیش‌نیازها

- اتمام آزمایشگاه ۲ (مبانی MCP)
- نصب افزونه Microsoft Foundry Toolkit در VS Code
- محیط پایتون نسخه 3.10+
- Node.js و npm برای راه‌اندازی Inspector

## 🏗️ آنچه خواهید ساخت

در این آزمایشگاه، یک **سرور MCP هواشناسی** ایجاد خواهید کرد که موارد زیر را نشان می‌دهد:
- پیاده‌سازی سرور MCP سفارشی
- ادغام با Agent Builder مایکروسافت فاندری تولکیت
- جریان‌های کاری حرفه‌ای اشکال‌زدایی
- الگوهای استفاده از SDK جدید MCP

---

## 🔧 مرور اجزای اصلی

### 🐍 SDK پایتون MCP
SDK پروتکل مدل کانتکست پایتون پایه ساخت سرورهای سفارشی MCP را فراهم می‌کند. شما نسخه 1.9.3 با قابلیت‌های پیشرفته اشکال‌زدایی را استفاده خواهید کرد.

### 🔍 MCP Inspector
ابزار قدرتمند اشکال‌زدایی که موارد زیر را ارائه می‌دهد:
- نظارت زمان واقعی سرور
- نمایش اجرایی ابزارها
- بررسی درخواست‌ها و پاسخ‌های شبکه
- محیط آزمایشی تعاملی

---

## 📖 پیاده‌سازی گام به گام

### گام ۱: ایجاد WeatherAgent در Agent Builder

1. **Agent Builder را** در VS Code از طریق افزونه Microsoft Foundry Toolkit اجرا کنید
2. **یک عامل جدید بسازید** با پیکربندی زیر:
   - نام عامل: `WeatherAgent`

![ایجاد عامل](../../../../translated_images/fa/Agent.c9c33f6a412b4cde.webp)

### گام ۲: راه‌اندازی پروژه سرور MCP

1. **در Agent Builder به Tools** → **Add Tool** بروید
2. **"MCP Server" را انتخاب کنید**
3. **گزینه "Create A new MCP Server" را انتخاب کنید**
4. **قالب `python-weather` را انتخاب کنید**
5. **اسم سرور خود را بنویسید:** `weather_mcp`

![انتخاب قالب پایتون](../../../../translated_images/fa/Pythontemplate.9d0a2913c6491500.webp)

### گام ۳: پروژه را بازکرده و بررسی کنید

1. **پروژه تولید شده را** در VS Code باز کنید
2. **ساختار پروژه را مرور کنید:**
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

### گام ۴: ارتقا به جدیدترین SDK MCP

> **🔍 چرا ارتقا؟** ما می‌خواهیم از جدیدترین SDK MCP (نسخه 1.9.3) و سرویس Inspector (0.14.0) برای امکانات پیشرفته‌تر و بهتر شدن اشکال‌زدایی استفاده کنیم.

#### 4a. به‌روزرسانی وابستگی‌های پایتون

**فایل `pyproject.toml` را ویرایش کنید:** به روزرسانی در [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)

#### 4b. به‌روزرسانی پیکربندی Inspector

**فایل `inspector/package.json` را ویرایش کنید:** به روزرسانی در [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. به‌روزرسانی وابستگی‌های Inspector

**فایل `inspector/package-lock.json` را ویرایش کنید:** به روزرسانی در [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 توجه:** این فایل شامل تعریف گسترده وابستگی‌ها است. ساختار اساسی زیر آورده شده است - محتوای کامل برای حل درست وابستگی‌ها ضروری است.

> **⚡ قفل کامل پکیج:** فایل package-lock.json کامل بیش از ۳۰۰۰ خط تعریف وابستگی دارد. ساختار کلیدی در بالا آمده است - برای حل کامل وابستگی‌ها از فایل ارائه شده استفاده کنید.

### گام ۵: پیکربندی اشکال‌زدایی VS Code

*توجه: لطفاً فایل مربوطه را در مسیر مشخص شده کپی کنید تا فایل محلی مربوطه جایگزین شود*

#### 5a. به‌روزرسانی پیکربندی لانچ

**فایل `.vscode/launch.json` را ویرایش کنید:**

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

**فایل `.vscode/tasks.json` را ویرایش کنید:**

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

## 🚀 اجرای سرور MCP و آزمایش آن

### گام ۶: نصب وابستگی‌ها

پس از اعمال تغییرات پیکربندی، دستورات زیر را اجرا کنید:

**نصب وابستگی‌های پایتون:**
```bash
uv sync
```

**نصب وابستگی‌های Inspector:**
```bash
cd inspector
npm install
```

### گام ۷: اشکال‌زدایی با Agent Builder

1. **کلید F5 را فشار دهید** یا پیکربندی **"Debug in Agent Builder"** را استفاده کنید
2. **پیکربندی compound** را از پنل اشکال‌زدایی انتخاب کنید
3. **منتظر شروع سرور و باز شدن Agent Builder بمانید**
4. **سرور MCP هواشناسی خود را با پرسش‌های زبان طبیعی آزمایش کنید**

ورودی را اینگونه وارد کنید

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![نتیجه اشکال‌زدایی Agent Builder](../../../../translated_images/fa/Result.6ac570f7d2b1d538.webp)

### گام ۸: اشکال‌زدایی با MCP Inspector

1. **از پیکربندی "Debug in Inspector"** استفاده کنید (Edge یا Chrome)
2. **رابط Inspector را در `http://localhost:6274` باز کنید**
3. **محیط آزمایشی تعاملی را مرور کنید:**
   - مشاهده ابزارهای موجود
   - آزمایش اجرای ابزارها
   - نظارت بر درخواست‌های شبکه
   - اشکال‌زدایی پاسخ‌های سرور

![رابط MCP Inspector](../../../../translated_images/fa/Inspector.5672415cd02fe873.webp)

---

## 🎯 نتایج کلیدی یادگیری

با تکمیل این آزمایشگاه، شما:

- [x] **یک سرور MCP سفارشی ایجاد کرده‌اید** با استفاده از قالب‌های Microsoft Foundry Toolkit
- [x] **به جدیدترین SDK MCP** (نسخه 1.9.3) برای امکانات پیشرفته ارتقا داده‌اید
- [x] **جریان‌های کاری حرفه‌ای اشکال‌زدایی** را برای Agent Builder و Inspector پیکربندی کرده‌اید
- [x] **MCP Inspector را راه‌اندازی کرده‌اید** برای آزمایش تعاملی سرور
- [x] **پیکربندی‌های اشکال‌زدایی VS Code** برای توسعه MCP را تسلط یافته‌اید

## 🔧 ویژگی‌های پیشرفته بررسی شده

| ویژگی | توضیح | مورد استفاده |
|---------|-------------|----------|
| **SDK پایتون MCP نسخه 1.9.3** | پیاده‌سازی جدیدترین پروتکل | توسعه مدرن سرور |
| **MCP Inspector نسخه 0.14.0** | ابزار اشکال‌زدایی تعاملی | آزمایش زمان واقعی سرور |
| **اشکال‌زدایی VS Code** | محیط توسعه یکپارچه | جریان کاری حرفه‌ای اشکال‌زدایی |
| **ادغام Agent Builder** | اتصال مستقیم به Microsoft Foundry Toolkit | آزمایش انتها به انتها عوامل |

## 📚 منابع اضافی

- [مستندات SDK پایتون MCP](https://modelcontextprotocol.io/docs/sdk/python)
- [راهنمای افزونه Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [مستندات اشکال‌زدایی VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [مشخصات پروتکل مدل کانتکست](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 تبریک!** شما با موفقیت آزمایشگاه ۳ را تکمیل کردید و اکنون می‌توانید سرورهای سفارشی MCP را با استفاده از جریان‌های کاری توسعه حرفه‌ای ایجاد، اشکال‌زدایی و مستقر کنید.

### 🔜 ادامه به ماژول بعدی

آماده‌اید مهارت‌های MCP خود را در یک جریان کاری توسعه واقعی به کار بگیرید؟ ادامه دهید به **[ماژول ۴: توسعه عملی MCP - سرور کلون سفارشی GitHub](../lab4/README.md)** که در آن:
- یک سرور MCP آماده تولید برای خودکارسازی عملیات مخزن GitHub خواهید ساخت
- قابلیت کلون کردن مخزن GitHub را از طریق MCP پیاده‌سازی می‌کنید
- سرورهای سفارشی MCP را با VS Code و حالت Agent GitHub Copilot ادغام می‌کنید
- سرورهای سفارشی MCP را در محیط‌های تولید تست و مستقر می‌کنید
- جریان کاری عملی اتوماسیون برای توسعه‌دهندگان را می‌آموزید

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->