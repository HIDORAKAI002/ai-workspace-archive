# 🔧 মডিউল ৩: মাইক্রোসফট ফাউন্ড্রি টুলকিট দিয়ে উন্নত MCP উন্নয়ন

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 শেখার উদ্দেশ্য

এই ল্যাবের শেষে আপনি পারবেন:

- ✅ মাইক্রোসফট ফাউন্ড্রি টুলকিট ব্যবহার করে কাস্টম MCP সার্ভার তৈরি করা
- ✅ সর্বশেষ MCP পাইথন SDK (v1.9.3) কনফিগার ও ব্যবহার করা
- ✅ ডিবাগিং এর জন্য MCP Inspector সেটআপ ও ব্যবহার করা
- ✅ Agent Builder এবং Inspector পরিবেশে MCP সার্ভার ডিবাগ করা
- ✅ উন্নত MCP সার্ভার উন্নয়ন কাজের প্রবাহ বোঝা

## 📋 পূর্বাপর প্রয়োজনীয়তা

- ল্যাব ২ (MCP মূল বিষয়াবলী) সম্পন্ন করা
- VS Code এ Microsoft Foundry Toolkit এক্সটেনশন ইনস্টল করা
- পাইথন 3.10+ পরিবেশ
- Inspector সেটআপের জন্য Node.js এবং npm

## 🏗️ আপনি যা তৈরি করবেন

এই ল্যাবে, আপনি একটি **Weather MCP Server** তৈরি করবেন যা প্রদর্শন করবে:
- কাস্টম MCP সার্ভার বাস্তবায়ন
- Microsoft Foundry Toolkit Agent Builder এর সাথে ইন্টিগ্রেশন
- পেশাদার ডিবাগিং কাজের প্রবাহ
- আধুনিক MCP SDK ব্যবহারের প্যাটার্ন

---

## 🔧 মূল উপাদানসমূহের ওভারভিউ

### 🐍 MCP পাইথন SDK
মডেল কনটেক্সট প্রোটোকল পাইথন SDK কাস্টম MCP সার্ভার তৈরির ভিত্তি প্রদান করে। আপনি সংস্করণ 1.9.3 ব্যবহার করবেন যা উন্নত ডিবাগিং সুবিধা প্রদান করে।

### 🔍 MCP Inspector
একটি শক্তিশালী ডিবাগিং টুল যা প্রদান করে:
- রিয়েল-টাইম সার্ভার মনিটরিং
- টুল কার্যকরী প্রদর্শন
- নেটওয়ার্ক অনুরোধ/প্রতিক্রিয়া পরিদর্শন
- ইন্টারেক্টিভ টেস্টিং পরিবেশ

---

## 📖 ধাপে ধাপে বাস্তবায়ন

### ধাপ ১: Agent Builder-এ একটি WeatherAgent তৈরি করুন

1. VS Code-এ Microsoft Foundry Toolkit এক্সটেনশন মাধ্যমে **Agent Builder লঞ্চ করুন**
2. নিম্নলিখিত কনফিগারেশনের সাথে **একটি নতুন এজেন্ট তৈরি করুন:**
   - এজেন্টের নাম: `WeatherAgent`

![Agent Creation](../../../../translated_images/bn/Agent.c9c33f6a412b4cde.webp)

### ধাপ ২: MCP সার্ভার প্রকল্প শুরু করুন

1. Agent Builder-এ **Tools → Add Tool** যান
2. উপলব্ধ অপশন থেকে **"MCP Server" নির্বাচন করুন**
3. **"Create A new MCP Server" নির্বাচন করুন**
4. `python-weather` টেমপ্লেট নির্বাচন করুন
5. আপনার সার্ভারের নাম দিন: `weather_mcp`

![Python Template Selection](../../../../translated_images/bn/Pythontemplate.9d0a2913c6491500.webp)

### ধাপ ৩: প্রকল্প খুলুন এবং পর্যালোচনা করুন

1. VS Code-এ তৈরি হওয়া প্রকল্প খুলুন
2. প্রকল্পের কাঠামো পর্যালোচনা করুন:
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

### ধাপ ৪: সর্বশেষ MCP SDK এ আপগ্রেড করুন

> **🔍 কেন আপগ্রেড করবেন?** উন্নত বৈশিষ্ট্য এবং উন্নত ডিবাগিং ক্ষমতার জন্য আমরা সর্বশেষ MCP SDK (v1.9.3) এবং Inspector সার্ভিস (0.14.0) ব্যবহার করতে চাই।

#### ৪a. পাইথন ডিপেন্ডেন্সি আপডেট করুন

**`pyproject.toml` সম্পাদনা করুন:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) আপডেট করুন

#### ৪b. Inspector কনফিগারেশন আপডেট করুন

**`inspector/package.json` সম্পাদনা করুন:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) আপডেট করুন

#### ৪c. Inspector ডিপেন্ডেন্সি আপডেট করুন

**`inspector/package-lock.json` সম্পাদনা করুন:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) আপডেট করুন

> **📝 দ্রষ্টব্য:** এই ফাইলে বিস্তৃত ডিপেন্ডেন্সি সংজ্ঞা থাকে। নিচে মৌলিক কাঠামো দেখানো হয়েছে - সম্পূর্ণ কন্টেন্ট সঠিক ডিপেন্ডেন্সি সমাধান নিশ্চিত করে।

> **⚡ সম্পূর্ণ প্যাকেজ লক:** সম্পূর্ণ package-lock.json এ প্রায় ৩০০০ লাইন ডিপেন্ডেন্সি সংজ্ঞা রয়েছে। উপরের অংশেই মূল কাঠামো দেখানো হয়েছে - সম্পূর্ণ ডিপেন্ডেন্সি সমাধানের জন্য প্রদত্ত ফাইলটি ব্যবহার করুন।

### ধাপ ৫: VS Code ডিবাগিং কনফিগার করুন

*দ্রষ্টব্য: অনুগ্রহ করে নির্দিষ্ট পথের ফাইল কপি করে সংশ্লিষ্ট স্থানীয় ফাইল প্রতিস্থাপন করুন*

#### ৫a. লঞ্চ কনফিগারেশন আপডেট করুন

**`.vscode/launch.json` সম্পাদনা করুন:**

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

**`.vscode/tasks.json` সম্পাদনা করুন:**

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

## 🚀 আপনার MCP সার্ভার চালানো এবং পরীক্ষা করা

### ধাপ ৬: ডিপেন্ডেন্সি ইনস্টল করুন

কনফিগারেশন পরিবর্তনের পর নিচের কমান্ডগুলি চালান:

**পাইথন ডিপেন্ডেন্সি ইনস্টল করুন:**
```bash
uv sync
```

**Inspector ডিপেন্ডেন্সি ইনস্টল করুন:**
```bash
cd inspector
npm install
```


### ধাপ ৭: Agent Builder দিয়ে ডিবাগ করুন

1. **F5 চাপুন** অথবা **"Debug in Agent Builder"** কনফিগারেশনের ব্যবহার করুন
2. ডিবাগ প্যানেল থেকে কম্পাউন্ড কনফিগারেশন নির্বাচন করুন
3. সার্ভার শুরু হওয়া এবং Agent Builder খোলার অপেক্ষা করুন
4. ভাঙ্গভাঙ্গা প্রাকৃতিক ভাষার প্রশ্নের মাধ্যমে আপনার weather MCP সার্ভার পরীক্ষা করুন

এইরকম ইনপুট দিন

SYSTEM_PROMPT

```
You are my weather assistant
```


USER_PROMPT

```
How's the weather like in Seattle
```


![Agent Builder Debug Result](../../../../translated_images/bn/Result.6ac570f7d2b1d538.webp)

### ধাপ ৮: MCP Inspector দিয়ে ডিবাগ করুন

1. **"Debug in Inspector"** কনফিগারেশন ব্যবহার করুন (Edge অথবা Chrome)
2. `http://localhost:6274` এ Inspector ইন্টারফেস খুলুন
3. ইন্টারেক্টিভ টেস্টিং পরিবেশ অন্বেষণ করুন:
   - উপলব্ধ টুলগুলি দেখুন
   - টুল কার্যকরী পরীক্ষা করুন
   - নেটওয়ার্ক অনুরোধ পর্যবেক্ষণ করুন
   - সার্ভার প্রতিক্রিয়া ডিবাগ করুন

![MCP Inspector Interface](../../../../translated_images/bn/Inspector.5672415cd02fe873.webp)

---

## 🎯 প্রধান শেখার ফলাফলসমূহ

এই ল্যাব সম্পন্ন করে আপনি:

- [x] **মাইক্রোসফট ফাউন্ড্রি টুলকিট টেমপ্লেট ব্যবহার করে কাস্টম MCP সার্ভার তৈরি করেছেন**
- [x] **উন্নত কর্মক্ষমতার জন্য সর্বশেষ MCP SDK (v1.9.3) তে আপগ্রেড করেছেন**
- [x] **Agent Builder এবং Inspector দুই পরিবেশের জন্য পেশাদার ডিবাগিং কাজের প্রবাহ কনফিগার করেছেন**
- [x] **ইন্টারেক্টিভ সার্ভার পরীক্ষার জন্য MCP Inspector সেটআপ করেছেন**
- [x] **MCP উন্নয়নের জন্য VS Code ডিবাগিং কনফিগারেশন পারদর্শী হয়েছেন**

## 🔧 উন্নত ফিচারসমূহ অন্বেষণ

| ফিচার | বিবরণ | ব্যবহারের ক্ষেত্র |
|---------|-------------|----------|
| **MCP পাইথন SDK v1.9.3** | সর্বশেষ প্রোটোকল বাস্তবায়ন | আধুনিক সার্ভার উন্নয়ন |
| **MCP Inspector 0.14.0** | ইন্টারেক্টিভ ডিবাগিং টুল | রিয়েল-টাইম সার্ভার পরীক্ষণ |
| **VS Code ডিবাগিং** | ইন্টিগ্রেটেড ডেভেলপমেন্ট এনভায়রনমেন্ট | পেশাদার ডিবাগিং কাজের প্রবাহ |
| **Agent Builder ইন্টিগ্রেশন** | সরাসরি Microsoft Foundry Toolkit সংযোগ | এজেন্টের সম্পূর্ণ পরীক্ষণ |

## 📚 অতিরিক্ত সম্পদ

- [MCP পাইথন SDK ডকুমেন্টেশন](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit এক্সটেনশন গাইড](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code ডিবাগিং ডকুমেন্টেশন](https://code.visualstudio.com/docs/editor/debugging)
- [মডেল কনটেক্সট প্রোটোকল স্পেসিফিকেশন](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 অভিনন্দন!** আপনি সফলভাবে ল্যাব ৩ শেষ করেছেন এবং এখন পেশাদার উন্নয়ন কাজের প্রবাহ ব্যবহার করে কাস্টম MCP সার্ভার তৈরি, ডিবাগ ও ডিপ্লয় করতে পারবেন।

### 🔜 পরবর্তী মডিউলে চলুন

আপনার MCP দক্ষতাগুলো বাস্তব-জগতের উন্নয়ন কাজে প্রয়োগ করতে প্রস্তুত? চলুন **[মডিউল ৪: ব্যবহারিক MCP উন্নয়ন - কাস্টম GitHub ক্লোন সার্ভার](../lab4/README.md)** যেখানে আপনি:
- GitHub রিপোজিটরি অপারেশন স্বয়ংক্রিয় করার প্রোডাকশন-রেডি MCP সার্ভার তৈরি করবেন
- MCP মাধ্যমে GitHub রিপোজিটরি ক্লোনিং ফাংশনালিটি বাস্তবায়ন করবেন
- VS Code এবং GitHub Copilot Agent Mode সমন্বয়ে কাস্টম MCP সার্ভার ইন্টিগ্রেট করবেন
- প্রোডাকশন পরিবেশে কাস্টম MCP সার্ভার পরীক্ষা ও ডিপ্লয় করবেন
- ডেভেলপারের জন্য ব্যবহারিক ওয়ার্কফ্লো অটোমেশন শিখবেন

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->