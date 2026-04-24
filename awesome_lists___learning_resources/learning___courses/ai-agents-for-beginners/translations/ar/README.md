# وكلاء الذكاء الاصطناعي للمبتدئين - دورة تعليمية

![AI Agents for Beginners](../../translated_images/ar/repo-thumbnailv2.06f4a48036fde647.webp)

## دورة تُعلّم كل ما تحتاج معرفته للبدء في بناء وكلاء الذكاء الاصطناعي

[![GitHub license](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 دعم متعدد اللغات

#### مدعوم عبر GitHub Action (آلي ودائم التحديث)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](./README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **تفضل الاستنساخ محليًا؟**
>
> يحتوي هذا المستودع على ترجمات لأكثر من 50 لغة مما يزيد بشكل كبير حجم التنزيل. لاستنساخ دون الترجمات، استخدم الفحص الانتقائي:
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
> هذا يوفر لك كل ما تحتاجه لإكمال الدورة بتنزيل أسرع بكثير.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**إذا رغبت في دعم لغات إضافية للترجمة فهي مدرجة [هنا](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md)**

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 البداية

تحتوي هذه الدورة على دروس تغطي أساسيات بناء وكلاء الذكاء الاصطناعي. كل درس يغطي موضوعه الخاص لذا ابدأ من حيث تريد!

هناك دعم متعدد اللغات لهذه الدورة. اطلع على [اللغات المتوفرة هنا](#-multi-language-support).

إذا كانت هذه هي المرة الأولى التي تبني فيها باستخدام نماذج الذكاء الاصطناعي التوليدية، تفقد دورة [الذكاء الاصطناعي التوليدي للمبتدئين](https://aka.ms/genai-beginners) التي تتضمن 21 درسًا حول البناء باستخدام الذكاء الاصطناعي التوليدي.

لا تنسَ أن [تضع نجمة (🌟) على هذا المستودع](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) و [تفرّع هذا المستودع](https://github.com/microsoft/ai-agents-for-beginners/fork) لتشغيل الكود.

### التقي بالمتعلمين الآخرين، واحصل على إجابات لأسئلتك

إذا واجهت مشكلة أو كان لديك أي أسئلة حول بناء وكلاء الذكاء الاصطناعي، انضم إلى قناة ديسكورد المخصصة لنا في [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord).

### ما الذي تحتاجه

يتضمن كل درس في هذه الدورة أمثلة تعليمية برمجية، والتي يمكن العثور عليها في مجلد code_samples. يمكنك [تفريع هذا المستودع](https://github.com/microsoft/ai-agents-for-beginners/fork) لإنشاء نسخة خاصة بك.

تستخدم أمثلة الكود في هذه التمارين إطار عمل Microsoft Agent مع خدمة Azure AI Foundry Agent V2:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - يتطلب حساب أزور

تستخدم هذه الدورة أطر عمل وخدمات وكلاء الذكاء الاصطناعي التالية من مايكروسوفت:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

بعض أمثلة الكود تدعم أيضاً مزودين بديلين متوافقين مع OpenAI مثل [MiniMax](https://platform.minimaxi.com/) التي تقدم نماذج سياق كبير (حتى 204 آلاف رمز). راجع [إعداد الدورة](./00-course-setup/README.md) لمزيد من التفاصيل حول التكوين.

لمزيد من المعلومات حول تشغيل الكود لهذه الدورة، اذهب إلى [إعداد الدورة](./00-course-setup/README.md).

## 🙏 هل ترغب في المساعدة؟

هل لديك اقتراحات أو وجدت أخطاء إملائية أو برمجية؟ [ارفع قضية](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) أو [أنشئ طلب سحب](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)



## 📂 كل درس يتضمن

- درساً مكتوباً في README وفيديو قصير
- أمثلة كود بايثون باستخدام Microsoft Agent Framework مع Azure AI Foundry
- روابط لمصادر إضافية لمواصلة تعلمك


## 🗃️ الدروس

| **الدرس**                                    | **النص والكود**                                      | **الفيديو**                                                | **تعلم إضافي**                                                                          |
|----------------------------------------------|------------------------------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| مقدمة لوكلاء الذكاء الاصطناعي وحالات استخدام الوكلاء | [رابط](./01-intro-to-ai-agents/README.md)             | [فيديو](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| استكشاف أطر عمل وكلاء الذكاء الاصطناعي      | [رابط](./02-explore-agentic-frameworks/README.md)     | [فيديو](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| فهم نماذج تصميم وكلاء الذكاء الاصطناعي       | [رابط](./03-agentic-design-patterns/README.md)        | [فيديو](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| نمط تصميم استخدام الأدوات                   | [رابط](./04-tool-use/README.md)                       | [فيديو](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| RAG الخاص بالوكيل                             | [رابط](./05-agentic-rag/README.md)                    | [فيديو](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| بناء وكلاء ذكاء اصطناعي موثوقين               | [رابط](./06-building-trustworthy-agents/README.md)    | [فيديو](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK )    | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| نمط تصميم التخطيط                            | [رابط](./07-planning-design/README.md)                | [فيديو](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| نمط تصميم الوكلاء المتعددين                  | [رابط](./08-multi-agent/README.md)                    | [فيديو](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)     | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| نمط تصميم الميتا إدراك                 | [رابط](./09-metacognition/README.md)               | [فيديو](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| وكلاء الذكاء الاصطناعي في الإنتاج                      | [رابط](./10-ai-agents-production/README.md)        | [فيديو](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| استخدام بروتوكولات وكيلية (MCP, A2A و NLWeb) | [رابط](./11-agentic-protocols/README.md)           | [فيديو](https://youtu.be/X-Dh9R3Opn8)                                 | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| هندسة السياق لوكلاء الذكاء الاصطناعي            | [رابط](./12-context-engineering/README.md)         | [فيديو](https://youtu.be/F5zqRV7gEag)                                 | [رابط](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| إدارة الذاكرة الوكيل                      | [رابط](./13-agent-memory/README.md)     |      [فيديو](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| استكشاف إطار عمل مايكروسوفت للوكيل                         | [رابط](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| بناء وكلاء استخدام الكمبيوتر (CUA)           | [رابط](./15-browser-use/README.md)     |                                                            | [رابط](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| نشر الوكلاء القابلين للتوسع                    | قادم قريبًا                            |                                                            |                                                                                        |
| إنشاء وكلاء الذكاء الاصطناعي المحليين                     | قادم قريبًا                               |                                                            |                                                                                        |
| تأمين وكلاء الذكاء الاصطناعي                           | قادم قريبًا                               |                                                            |                                                                                        |

## 🎒 دورات أخرى

فريقنا ينتج دورات أخرى! تحقق من:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j للمبتدئين](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js للمبتدئين](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain للمبتدئين](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / Agents
[![AZD للمبتدئين](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI للمبتدئين](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP للمبتدئين](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![وكلاء الذكاء الاصطناعي للمبتدئين](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### سلسلة الذكاء الاصطناعي التوليدي
[![الذكاء الاصطناعي التوليدي للمبتدئين](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![الذكاء الاصطناعي التوليدي (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![الذكاء الاصطناعي التوليدي (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![الذكاء الاصطناعي التوليدي (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### التعلم الأساسي
[![التعلم الآلي للمبتدئين](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![علوم البيانات للمبتدئين](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![الذكاء الاصطناعي للمبتدئين](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![الأمن السيبراني للمبتدئين](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![تطوير الويب للمبتدئين](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![إنترنت الأشياء للمبتدئين](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![تطوير الواقع الممتد للمبتدئين](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### سلسلة كوبايلوت
[![كوبايلوت للبرمجة المزدوجة بالذكاء الاصطناعي](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![كوبايلوت لـ C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![مغامرة كوبايلوت](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 شكر المجتمع

شكر خاص لـ [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) لمساهمته في عينات الشفرات المهمة التي توضح RAG الوكيل. 

## المساهمة

يرحب هذا المشروع بالمساهمات والاقتراحات. تتطلب معظم المساهمات موافقتك على
اتفاقية ترخيص المساهم (CLA) التي تنص على أن لديك الحق في، وفي الواقع تمنحنا
الحقوق لاستخدام مساهمتك. لمزيد من التفاصيل، تفضل بزيارة <https://cla.opensource.microsoft.com>.

عند تقديم طلب سحب، سيحدد روبوت CLA تلقائيًا ما إذا كنت بحاجة إلى تقديم
اتفاقية CLA ويزيّن الطلب بشكل مناسب (مثل فحص الحالة، التعليق). اتبع ببساطة التعليمات
المقدمة من الروبوت. سيتعين عليك القيام بذلك مرة واحدة فقط عبر جميع المستودعات التي تستخدم CLA الخاص بنا.

اعتمد هذا المشروع على [ميثاق سلوك كود المصدر المفتوح لمايكروسوفت](https://opensource.microsoft.com/codeofconduct/).
لمزيد من المعلومات راجع [أسئلة ميثاق السلوك](https://opensource.microsoft.com/codeofconduct/faq/) أو
اتصل بـ [opencode@microsoft.com](mailto:opencode@microsoft.com) لأي أسئلة أو تعليقات إضافية.

## العلامات التجارية

قد يحتوي هذا المشروع على علامات تجارية أو شعارات لمشاريع أو منتجات أو خدمات. يخضع الاستخدام المصرح به لعلامات
مايكروسوفت التجارية أو شعاراتها ويجب أن يتبع
[إرشادات العلامات التجارية والعلامات لمايكروسوفت](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
يجب ألا يسبب استخدام علامات مايكروسوفت التجارية أو شعاراتها في نسخ معدلة من هذا المشروع أي لبس أو يشير إلى رعاية مايكروسوفت.
أي استخدام لعلامات تجارية أو شعارات جهة خارجية يخضع لسياسات تلك الجهات.

## الحصول على المساعدة


إذا واجهت صعوبة أو كان لديك أي أسئلة حول بناء تطبيقات الذكاء الاصطناعي، انضم إلى:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

إذا كان لديك ملاحظات حول المنتج أو أخطاء أثناء البناء، تفضل بزيارة:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء المسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الموثوق به. للمعلومات الحيوية، يُنصح بالترجمة البشرية المهنية. نحن غير مسؤولين عن أي سوء فهم أو تفسيرات خاطئة ناتجة عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->