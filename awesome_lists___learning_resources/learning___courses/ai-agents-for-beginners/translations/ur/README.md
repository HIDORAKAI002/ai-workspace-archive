# AI ایجنٹس برائے ابتدائی افراد - ایک کورس

![AI Agents for Beginners](../../translated_images/ur/repo-thumbnailv2.06f4a48036fde647.webp)

## ایک کورس جو آپ کو AI ایجنٹس بنانے کے لیے درکار ہر چیز سکھاتا ہے

[![GitHub license](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 کثیراللسانی تعاون

#### GitHub ایکشن کے ذریعے معاونت یافتہ (خودکار اور ہمیشہ تازہ ترین)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](./README.md) | [Vietnamese](../vi/README.md)

> **مقامی طور پر کلون کرنا چاہتے ہیں؟**
>
> اس ریپوزٹری میں 50+ زبانوں کے تراجم شامل ہیں جو ڈاؤن لوڈ کے حجم کو نمایاں طور پر بڑھاتے ہیں۔ بغیر تراجم کے کلون کرنے کے لیے sparse checkout استعمال کریں:
>
> **Bash / macOS / Linux:**
> ```bash
> git clone --filter=blob:none --sparse https://github.com/microsoft/ai-agents-for-beginners.git
> cd ai-agents-for-beginners
> git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
> ```
>
> **CMD (Windows):**
> ```cmd
> git clone --filter=blob:none --sparse https://github.com/microsoft/ai-agents-for-beginners.git
> cd ai-agents-for-beginners
> git sparse-checkout set --no-cone "/*" "!translations" "!translated_images"
> ```
>
> اس سے آپ کو کورس مکمل کرنے کے لیے درکار تمام چیزیں تیز تر ڈاؤن لوڈ کے ساتھ مل جائیں گی۔
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**اگر آپ اضافی ترجمہ شدہ زبانوں کی حمایت چاہتے ہیں تو وہ [یہاں](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) درج ہیں**

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 شروعات

یہ کورس AI ایجنٹس بنانے کے بنیادی اصولوں کا احاطہ کرتا ہے۔ ہر سبق اپنا موضوع رکھتا ہے لہٰذا جہاں چاہیں وہاں سے شروع کریں!

اس کورس کے لیے کثیراللسانی تعاون دستیاب ہے۔ ہماری [دستیاب زبانیں یہاں دیکھیں](#-multi-language-support)۔

اگر یہ آپ کا پہلی بار ہے کہ آپ Generative AI ماڈلز کے ساتھ کام کر رہے ہیں، تو ہمارا [Generative AI For Beginners](https://aka.ms/genai-beginners) کورس بھی دیکھیں، جس میں GenAI کے ساتھ تعمیر کرنے پر 21 اسباق شامل ہیں۔

اس ریپوزٹری کو [سٹار (🌟) کرنا نہ بھولیں](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) اور [فورک کریں](https://github.com/microsoft/ai-agents-for-beginners/fork) تاکہ کوڈ چلایا جا سکے۔

### دوسرے سیکھنے والوں سے ملیں، اپنے سوالات کے جواب حاصل کریں

اگر آپ پھنس جائیں یا AI ایجنٹس بنانے کے بارے میں کوئی سوال ہو، تو ہمارے مخصوص Discord چینل میں شامل ہوں [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)۔

### آپ کو کیا چاہیے

اس کورس کے ہر سبق میں کوڈ کی مثالیں شامل ہیں، جو code_samples فولڈر میں پائی جا سکتی ہیں۔ آپ اپنا کاپی بنانے کے لیے [اس ریپوزٹری کو فورک کر سکتے ہیں](https://github.com/microsoft/ai-agents-for-beginners/fork)۔

ان مشقوں کے کوڈ کی مثالیں Microsoft Agent Framework اور Azure AI Foundry Agent Service V2 استعمال کرتی ہیں:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure اکاؤنٹ ضروری ہے

یہ کورس Microsoft کے مندرجہ ذیل AI Agent فریم ورکس اور سروسز استعمال کرتا ہے:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)


اس کورس کے کوڈ کو چلانے کی مزید معلومات کے لیے، [Course Setup](./00-course-setup/README.md) دیکھیں۔

## 🙏 مدد کرنا چاہتے ہیں؟

کیا آپ کے پاس تجاویز ہیں یا آپ نے املا یا کوڈ میں غلطیاں پائی ہیں؟ [ایک مسئلہ اٹھائیں](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) یا [پُل ریکویسٹ بنائیں](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)۔


## 📂 ہر سبق میں شامل ہیں

- README میں لکھا ہوا سبق اور ایک چھوٹا ویڈیو
- Microsoft Agent Framework کے ساتھ Azure AI Foundry کا استعمال کرتے ہوئے Python کوڈ کی مثالیں
- اضافی وسائل کے لنکس تاکہ آپ اپنی تعلیم جاری رکھ سکیں


## 🗃️ اسباق

| **سبق**                                     | **متن اور کوڈ**                                     | **ویڈیو**                                                   | **اضافی تعلیم**                                                                       |
|----------------------------------------------|----------------------------------------------------|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| AI ایجنٹس کا تعارف اور ایجنٹس کے استعمال کے کیسز | [لنک](./01-intro-to-ai-agents/README.md)            | [ویڈیو](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI Agentic فریم ورکس کی تلاش                   | [لنک](./02-explore-agentic-frameworks/README.md)    | [ویڈیو](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI Agentic ڈیزائن پیٹرنز کو سمجھنا               | [لنک](./03-agentic-design-patterns/README.md)       | [ویڈیو](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ٹول استعمال کرنے کا ڈیزائن پیٹرن                 | [لنک](./04-tool-use/README.md)                      | [ویڈیو](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| Agentic RAG                                   | [لنک](./05-agentic-rag/README.md)                   | [ویڈیو](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| قابل اعتماد AI ایجنٹس کی تعمیر                 | [لنک](./06-building-trustworthy-agents/README.md)   | [ویڈیو](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| منصوبہ بندی کا ڈیزائن پیٹرن                     | [لنک](./07-planning-design/README.md)               | [ویڈیو](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| کثیر ایجنٹ ڈیزائن پیٹرن                         | [لنک](./08-multi-agent/README.md)                   | [ویڈیو](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| metacognition ڈیزائن پیٹرن                       | [لنک](./09-metacognition/README.md)                 | [ویڈیو](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)    | [لنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| پیداوار میں AI ایجنٹس                      | [لِنک](./10-ai-agents-production/README.md)        | [ویڈیو](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [لِنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ایجنٹک پروٹوکولز کا استعمال (MCP, A2A اور NLWeb) | [لِنک](./11-agentic-protocols/README.md)           | [ویڈیو](https://youtu.be/X-Dh9R3Opn8)                                 | [لِنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI ایجنٹس کے لیے کانٹیکسٹ انجینئرنگ            | [لِنک](./12-context-engineering/README.md)         | [ویڈیو](https://youtu.be/F5zqRV7gEag)                                 | [لِنک](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ایجنٹک میموری کا انتظام                      | [لِنک](./13-agent-memory/README.md)     |      [ویڈیو](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| مائیکروسافٹ ایجنٹ فریم ورک کی کھوج                         | [لِنک](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| کمپیوٹر یوز ایجنٹس (CUA) کی تعمیر           | [لِنک](./15-browser-use/README.md)     |                                                            | [لِنک](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| اسکیل ایبل ایجنٹس کی تعیناتی                    | جلد آ رہا ہے                            |                                                            |                                                                                        |
| لوکل AI ایجنٹس بنانا                     | جلد آ رہا ہے                               |                                                            |                                                                                        |
| AI ایجنٹس کی حفاظت                           | جلد آ رہا ہے                               |                                                            |                                                                                        |

## 🎒 دیگر کورسز

ہماری ٹیم دیگر کورسز بھی تیار کرتی ہے! دیکھیں:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### لینگ چین
[![LangChain4j برائے آغاز کنندگان](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js برائے آغاز کنندگان](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain برائے آغاز کنندگان](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### ایزور / ایج / MCP / ایجنٹس
[![AZD برائے آغاز کنندگان](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![ایج AI برائے آغاز کنندگان](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP برائے آغاز کنندگان](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI ایجنٹس برائے آغاز کنندگان](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### جنریٹیو AI سیریز
[![جنریٹیو AI برائے آغاز کنندگان](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![جنریٹیو AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![جنریٹیو AI (جاوا)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![جنریٹیو AI (جاوا اسکرپٹ)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### کور لرننگ
[![ML برائے آغاز کنندگان](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![ڈیٹا سائنس برائے آغاز کنندگان](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI برائے آغاز کنندگان](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![سائبر سکیورٹی برائے آغاز کنندگان](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![ویب ڈیولپمنٹ برائے آغاز کنندگان](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT برائے آغاز کنندگان](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR ڈیولپمنٹ برائے آغاز کنندگان](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### کوپائلٹ سیریز
[![AI جوڑے ہوئے پروگرامنگ کے لیے کوپائلٹ](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![C#/.NET کے لیے کوپائلٹ](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![کوپائلٹ ایڈونچر](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 کمیونٹی کا شکریہ

اہم کوڈ کے نمونے فراہم کرنے کے لیے [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) کا شکریہ جو ایجنٹک RAG کو ظاہر کرتے ہیں۔

## تعاون کرنا

یہ منصوبہ تعاون اور تجاویز خوش آمدید کہتا ہے۔  زیادہ تر تعاون کے لیے آپ کو ایک
کنٹری بیوٹر لائسنس ایگریمنٹ (CLA) سے اتفاق کرنا ہوگا جو ظاہر کرتا ہے کہ آپ کے پاس اس بات کا حق ہے، اور واقعی میں آپ ہمیں
اپنے تعاون کے استعمال کے حقوق فراہم کرتے ہیں۔ تفصیلات کے لیے، ملاحظہ کریں <https://cla.opensource.microsoft.com>۔

جب آپ پل ریکویسٹ جمع کراتے ہیں، تو CLA بوٹ خود بخود تعین کرے گا کہ آیا آپ کو CLA فراہم کرنے کی ضرورت ہے
اور PR کو مناسب طریقے سے سجاوٹ دے گا (مثلاً، اسٹیٹس چیک، تبصرہ)۔ بس بوٹ کی فراہم کردہ ہدایات پر عمل کریں۔
آپ کو ہماری CLA استعمال کرنے والے تمام ریپوز میں یہ صرف ایک بار کرنا ہوگا۔

اس منصوبے نے [مائیکروسافٹ اوپن سورس کوڈ آف کنڈکٹ](https://opensource.microsoft.com/codeofconduct/) کو اپنایا ہے۔
مزید معلومات کے لیے دیکھیں [کوڈ آف کنڈکٹ FAQ](https://opensource.microsoft.com/codeofconduct/faq/) یا
کسی بھی اضافی سوالات یا تبصروں کے لیے رابطہ کریں [opencode@microsoft.com](mailto:opencode@microsoft.com)۔

## ٹریڈ مارکس

یہ منصوبہ پروجیکٹس، مصنوعات، یا خدمات کے لیے ٹریڈ مارکس یا لوگوز پر مشتمل ہوسکتا ہے۔ مائیکروسافٹ کے
ٹریڈ مارکس یا لوگوز کے مجاز استعمال کو [Microsoft کے ٹریڈ مارک اور برانڈ گائیڈلائنز](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) کی پیروی کرنا ضروری ہے۔
اس منصوبے کے ترمیم شدہ ورژنز میں مائیکروسافٹ کے ٹریڈ مارکس یا لوگوز کے استعمال سے الجھن یا مائیکروسافٹ کی اسپانسرشپ کی تاثر نہیں ہونی چاہیے۔
کسی تیسرے فریق کے ٹریڈ مارکس یا لوگوز کے استعمال پر ان تیسری فریق کی پالیسیاں لاگو ہوتی ہیں۔

## مدد حاصل کریں


اگر آپ پھنس جائیں یا AI ایپس بنانے کے بارے میں کوئی سوال ہو، شامل ہوں:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

اگر آپ کے پاس پروڈکٹ فیڈبیک ہو یا تعمیری غلطیاں ہوں تو دیکھیں:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**دستبرداری:**
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کی کوشش کرتے ہیں، براہ کرم یہ بات ذہن میں رکھیں کہ خودکار تراجم میں غلطیاں یا نقائص ہو سکتے ہیں۔ اصل دستاویز اپنی مقامی زبان میں مستند ذریعہ سمجھی جائے گی۔ اہم معلومات کے لیے پیشہ ورانہ انسانی ترجمہ تجویز کیا جاتا ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم پر عائد نہیں ہوتی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->