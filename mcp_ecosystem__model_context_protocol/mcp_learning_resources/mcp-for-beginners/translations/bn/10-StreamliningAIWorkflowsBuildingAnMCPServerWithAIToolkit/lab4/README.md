# 🐙 মডিউল ৪: ব্যবহারিক MCP উন্নয়ন - কাস্টম GitHub ক্লোন সার্ভার

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ দ্রুত শুরু:** মাত্র ৩০ মিনিটেই একটি প্রোডাকশন-সিদ্ধ MCP সার্ভার তৈরি করুন যা GitHub রেপোজিটরি ক্লোনিং এবং VS Code একত্রিকরণ স্বয়ংক্রিয়ভাবে সম্পাদন করে!

## 🎯 শেখার উদ্দেশ্যসমূহ

এই ল্যাবের শেষে আপনি সক্ষম হবেন:

- ✅ বাস্তব বিশ্ব উন্নয়ন কর্মপ্রবাহের জন্য একটি কাস্টম MCP সার্ভার তৈরি করতে
- ✅ MCP এর মাধ্যমে GitHub রেপোজিটরি ক্লোনিং কার্যকারিতা বাস্তবায়ন করতে
- ✅ কাস্টম MCP সার্ভারগুলোকে VS Code এবং Agent Builder এর সাথে একত্রিত করতে
- ✅ GitHub Copilot Agent Mode ব্যবহার করে কাস্টম MCP টুলসের সাথে কাজ করতে
- ✅ প্রোডাকশন পরিবেশে কাস্টম MCP সার্ভার পরীক্ষা ও স্থাপনা করতে

## 📋 পূর্বাপেক্ষা

- ল্যাব ১-৩ (MCP মৌলিক এবং উন্নত উন্নয়ন) সম্পন্ন করা
- GitHub Copilot সাবস্ক্রিপশন ([ফ্রি সাইনআপ উপলব্ধ](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit এবং GitHub Copilot এক্সটেনশন্সসহ VS Code
- Git CLI ইনস্টল এবং কনফিগার করা

## 🏗️ প্রকল্পের সারসংক্ষেপ

### **বাস্তব উন্নয়ন চ্যালেঞ্জ**
উন্নয়নকারীরা প্রায়ই GitHub ব্যবহার করেন রেপোজিটরি ক্লোন করে VS Code বা VS Code Insiders এ খুলতে। এই ম্যানুয়াল প্রক্রিয়া অন্তর্ভুক্ত করে:
১. টার্মিনাল/কমান্ড প্রম্পট খোলা
২. ইচ্ছাকৃত ডিরেক্টরিতে যাওয়া
৩. `git clone` কমান্ড চালানো
৪. ক্লোনকৃত ডিরেক্টরিতে VS Code খোলা

**আমাদের MCP সমাধান এটিকে একটি বুদ্ধিমান একক কমান্ডে রূপান্তর করে!**

### **আপনি যা তৈরি করবেন**
একটি **GitHub Clone MCP Server** (`git_mcp_server`) যা প্রদান করে:

| ফিচার | বর্ণনা | সুবিধা |
|---------|-------------|---------|
| 🔄 **স্মার্ট রেপোজিটরি ক্লোনিং** | যাচাইকরণের সাথে GitHub রেপো ক্লোন করা | স্বয়ংক্রিয় ত্রুটি পরীক্ষা |
| 📁 **বুদ্ধিমান ডিরেক্টরি পরিচালনা** | ডিরেক্টরি নিরাপদে চেক ও তৈরি করা | ওভাররাইটিং প্রতিরোধ করে |
| 🚀 **ক্রস-প্ল্যাটফর্ম VS Code একত্রিকরণ** | VS Code/Insiders এ প্রকল্প খোলা | নিরবচ্ছিন্ন কর্মপ্রবাহ পরিবর্তন |
| 🛡️ **মজবুত ত্রুটি সুরক্ষা** | নেটওয়ার্ক, অনুমতি, পাথ সমস্যা পরিচালনা | প্রোডাকশন-সিদ্ধ নির্ভরযোগ্যতা |

---

## 📖 ধাপে ধাপে বাস্তবায়ন

### ধাপ ১: Agent Builder-এ GitHub Agent তৈরি করুন

১. **Microsoft Foundry Toolkit এক্সটেনশনের মাধ্যমে Agent Builder শুরু করুন**  
২. **নিম্নলিখিত কনফিগারেশন সহ একটি নতুন এজেন্ট তৈরি করুন:**  
   ```
   Agent Name: GitHubAgent
   ```
  
৩. **কাস্টম MCP সার্ভার ইনিশিয়ালাইজ করুন:**  
   - **Tools** → **Add Tool** → **MCP Server** তে যান  
   - **"Create A new MCP Server"** নির্বাচন করুন  
   - সর্বোচ্চ নমনীয়তার জন্য **Python টেমপ্লেট** নির্বাচন করুন  
   - **সার্ভার নাম:** `git_mcp_server`

### ধাপ ২: GitHub Copilot Agent Mode কনফিগার করুন

১. VS Code এ **GitHub Copilot খুলুন** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
২. Copilot ইন্টারফেসে **Agent Model নির্বাচন করুন**  
৩. উন্নত যুক্তির জন্য **Claude 3.7 মডেল** নির্বাচন করুন  
৪. টুল অ্যাক্সেসের জন্য **MCP ইন্টিগ্রেশন সক্ষম করুন**

> **💡 পেশাদার টিপ:** Claude 3.7 উন্নত কর্মপ্রবাহ বোধ এবং ত্রুটি সুরক্ষার প্যাটার্ন সম্পর্কে শ্রেষ্ঠ উপলব্ধি প্রদান করে।

### ধাপ ৩: মূল MCP সার্ভার ফাংশনালিটি বাস্তবায়ন করুন

**নিম্নলিখিত বিস্তারিত প্রম্পটটি GitHub Copilot Agent Mode সহ ব্যবহার করুন:** 

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
  
### ধাপ ৪: আপনার MCP সার্ভার পরীক্ষা করুন

#### ৪a. Agent Builder-এ পরীক্ষা

১. Agent Builder এর জন্য **ডিবাগ কনফিগারেশন চালু করুন**  
২. নিম্নলিখিত সিস্টেম প্রম্পট দিয়ে আপনার এজেন্ট কনফিগার করুন:  

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
৩. বাস্তব ব্যবহারকারী পরিস্থিতিতে পরীক্ষা করুন:  

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/bn/DebugAgent.81d152370c503241.webp)

**প্রত্যাশিত ফলাফল:**  
- ✅ ক্লোনিং সফল হয়েছে এবং পাথ নিশ্চিত হয়েছে  
- ✅ স্বয়ংক্রিয়ভাবে VS Code চালু হয়েছে  
- ✅ অবৈধ অবস্থা জন্য পরিষ্কার ত্রুটি বার্তা  
- ✅ প্রান্তিক কেসের সঠিক হ্যান্ডলিং

#### ৪b. MCP Inspector-এ পরীক্ষা

![MCP Inspector Testing](../../../../translated_images/bn/DebugInspector.eb5c95f94c69a8ba.webp)

---


**🎉 অভিনন্দন!** আপনি সফলভাবে একটি ব্যবহারিক, প্রোডাকশন-সিদ্ধ MCP সার্ভার তৈরি করেছেন যা বাস্তব উন্নয়ন কর্মপ্রবাহের সমস্যাগুলো সমাধান করে। আপনার কাস্টম GitHub ক্লোন সার্ভার MCP এর ক্ষমতা প্রদর্শন করে যা উন্নয়নকারীদের উৎপাদনশীলতা স্বয়ংক্রিয় ও উন্নত করে।

### 🏆 অর্জন সম্পন্ন:
- ✅ **MCP ডেভেলপার** - কাস্টম MCP সার্ভার তৈরি করেছেন  
- ✅ **ওয়ার্কফ্লো অটোমেটার** - উন্নয়ন প্রক্রিয়া সরল করেছেন  
- ✅ **ইন্টিগ্রেশন বিশেষজ্ঞ** - বহু উন্নয়ন টুল সংযুক্ত করেছেন  
- ✅ **প্রোডাকশন-সিদ্ধ** - স্থাপনযোগ্য সমাধান নির্মাণ করেছেন

---

## 🎓 কর্মশালা সমাপ্তি: Model Context Protocol এর সাথে আপনার যাত্রা

**প্রিয় কর্মশালা অংশগ্রহণকারী,**

Model Context Protocol কর্মশালার চারটি মডিউল সম্পন্ন করার জন্য অভিনন্দন! আপনি Microsoft Foundry Toolkit এর মৌলিক ধারণা থেকে শুরু করে বাস্তব উন্নয়ন সমস্যা সমাধানে প্রোডাকশন-সিদ্ধ MCP সার্ভার তৈরি পর্যন্ত অনেক দূর এগিয়েছেন।

### 🚀 আপনার শেখার পথ সারাংশ:

**[মডিউল ১](../lab1/README.md):** Microsoft Foundry Toolkit মৌলিক, মডেল পরীক্ষা, এবং প্রথম AI এজেন্ট তৈরি শেখা শুরু করেছেন।

**[মডিউল ২](../lab2/README.md):** MCP আর্কিটেকচার শিখেছেন, Playwright MCP একত্রিত করেছেন, এবং প্রথম ব্রাউজার অটোমেশন এজেন্ট তৈরি করেছেন।

**[মডিউল ৩](../lab3/README.md):** Weather MCP সার্ভারের মাধ্যমে কাস্টম MCP সার্ভার উন্নয়নে দক্ষ হয়েছেন এবং ডিবাগিং টুলস্‍ আয়ত্ত করেছেন।

**[মডিউল ৪](../lab4/README.md):** এখন আপনি একটি বাস্তব GitHub রেপোজিটরি কর্মপ্রবাহ স্বয়ংক্রিয়করণ টুল তৈরি করেছেন।

### 🌟 আপনি যা আয়ত্ত করেছেন:

- ✅ **Microsoft Foundry Toolkit ইকোসিস্টেম:** মডেল, এজেন্ট, এবং একত্রিকরণ প্যাটার্ন  
- ✅ **MCP আর্কিটেকচার:** ক্লায়েন্ট-সার্ভার ডিজাইন, ট্রান্সপোর্ট প্রোটোকল, নিরাপত্তা  
- ✅ **ডেভেলপার টুলস:** প্লেগ্রাউন্ড থেকে ইন্সপেক্টর এবং প্রোডাকশনে স্থাপন  
- ✅ **কাস্টম উন্নয়ন:** নিজস্ব MCP সার্ভার তৈরি, পরীক্ষা ও স্থাপন  
- ✅ **বাস্তব প্রয়োগ:** AI দিয়ে বাস্তব কর্মপ্রবাহ সমস্যা সমাধান

### 🔮 আপনার পরবর্তী ধাপ:

১. **নিজের MCP সার্ভার তৈরি করুন:** আপনার স্বতন্ত্র কর্মপ্রবাহ স্বয়ংক্রিয় করতে এই দক্ষতাগুলি প্রয়োগ করুন  
২. **MCP সম্প্রদায়ে যোগ দিন:** আপনার সৃষ্টি শেয়ার করুন এবং অন্যদের থেকে শিখুন  
৩. **উন্নত একত্রিকরণ অন্বেষণ করুন:** MCP সার্ভারগুলোকে এন্টারপ্রাইজ সিস্টেমের সাথে সংযুক্ত করুন  
৪. **ওপেন সোর্সে অবদান রাখুন:** MCP টুলিং ও ডকুমেন্টেশন উন্নত করতে সহায়তা করুন

এটি শুধুমাত্র শুরু। Model Context Protocol ইকোসিস্টেম দ্রুত বিকশিত হচ্ছে, এবং আপনি এখন AI-চালিত উন্নয়ন টুলসের অগ্রভাগে থাকতে প্রস্তুত।

**অংশগ্রহণ এবং শেখার জন্য ধন্যবাদ!**

আমরা আশা করি এই কর্মশালা এমন কিছু ধারণা দিয়েছে যা আপনার AI টুলস নিয়ে উন্নয়ন যাত্রাকে রূপান্তর করবে।

**শুভকামনা রইল কোডিংয়ে!**

---

## পরবর্তী কী

মডিউল ১০ এর সকল ল্যাব সমাপ্তির জন্য অভিনন্দন!

- ফিরে যান: [Module 10 Overview](../README.md)  
- এগিয়ে যান: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->