# តំណាង AI សម្រាប់អ្នកចាប់ផ្តើម - មធ្យមសិក្សា

![AI Agents for Beginners](../../translated_images/km/repo-thumbnailv2.06f4a48036fde647.webp)

## មធ្យមសិក្សាមួយដែលបង្រៀនគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងដើម្បីចាប់ផ្តើមសាងសង់តំណាង AI

[![អាជ្ញាប័ណ្ណ GitHub](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![អ្នករួមចំណែក GitHub](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![បញ្ហារបស់ GitHub](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![ការស្នើសុំបង្រួម GitHub](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![សូមស្វាគមន៍ PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 គាំទ្រភាសាច្រើន

#### គាំទ្រ​តាមរយៈ GitHub Action (ស្វ័យប្រវត្តិ និងទាន់សម័យជានិរន្តរ)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[អារ៉ាប់](../ar/README.md) | [បង់ក្លាដី](../bn/README.md) | [ប៊ុលហ្គារី](../bg/README.md) | [ភាសាប៊ឺម៉ា (មីយ៉ាន់ម៉ា)](../my/README.md) | [ចិន (សាមញ្ញ)](../zh-CN/README.md) | [ចិន (បែបប្រពៃណី, ហុងកុង)](../zh-HK/README.md) | [ចិន (បែបប្រពៃណី, ម៉ាកាវ)](../zh-MO/README.md) | [ចិន (បែបប្រពៃណី, តៃវ៉ាន់)](../zh-TW/README.md) | [គ្រូអុរូប៊ី](../hr/README.md) | [ភេស៊ែក](../cs/README.md) | [ដានម៉ាក](../da/README.md) | [ហូឡង់](../nl/README.md) | [អេស្តូនី](../et/README.md) | [ហ្វិនឡែន](../fi/README.md) | [បារាំង](../fr/README.md) | [អាល្លឺម៉ង់](../de/README.md) | [ក្រិច](../el/README.md) | [Hebrew](../he/README.md) | [ហ៊ីនឌី](../hi/README.md) | [ហុងគ្រី](../hu/README.md) | [ឥណ្ឌូណេស៊ី](../id/README.md) | [អ៊ីតាលី](../it/README.md) | [ជប៉ុន](../ja/README.md) | [កណ្ដា](../kn/README.md) | [ខ្មែរ](./README.md) | [កូរ៉េ](../ko/README.md) | [លីទើវានី](../lt/README.md) | [ម៉ាឡេ](../ms/README.md) | [ម៉ាឡាឡាម](../ml/README.md) | [ម៉ារាធី](../mr/README.md) | [ណេប៉ាល](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [ន័រវែ](../no/README.md) | [ហ្សង់](../fa/README.md) | [ប៉ូឡូញ](../pl/README.md) | [បរមាធិភាព ប្រេស៊ីល](../pt-BR/README.md) | [បរមាធិភាព ព័រទុយហ្គាល់](../pt-PT/README.md) | [ពញជាភាសា (Gurmukhi)](../pa/README.md) | [រូម៉ានី](../ro/README.md) | [រុស្សី](../ru/README.md) | [សំប៊ែរ (Cyrillic)](../sr/README.md) | [ស្លូវ៉ាឃី](../sk/README.md) | [ស្លូវេនី](../sl/README.md) | [ស្ប៉ាញ](../es/README.md) | [ស្វាហ៊ីលី](../sw/README.md) | [ស្ដុកខោល](../sv/README.md) | [តាហ្គាឡូ (ហ្វីលីពីន)](../tl/README.md) | [តាមីល](../ta/README.md) | [តេលូហ្គូ](../te/README.md) | [ថៃ](../th/README.md) | [ទួរគី](../tr/README.md) | [អ៊ុយក្រែន](../uk/README.md) | [អ៊ឺដូ](../ur/README.md) | [វៀតណាម](../vi/README.md)

> **ចូលចិត្តថតចម្លងក្នុងកុំព្យូទ័រឯក?**
>
> ឃ្លាំងនេះរួមបញ្ចូលការប្រែសម្រួលភាសាច្រើនជាង ៥០ ដែលធ្វើឲ្យទំហំហៅក្រោមសម្រាប់ទាញយកធំឡើង។ ដើម្បីថតចម្លងដោយគ្មានការប្រែសម្រួល ប្រើ sparse checkout:
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
> នេះផ្តល់អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការដើម្បីបញ្ចប់មធ្យមសិក្សា ជាមួយនឹងការទាញយកដែលរហ័សជាង។
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**បើអ្នកចង់បានភាសាប្រែបន្ថែម ដែលគាំទ្រនั้นមានរាយនាមនៅ [ទីនេះ](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md)**

[![អ្នកតាមដាន GitHub](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![កាំបិត GitHub](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![ផ្កាយ GitHub](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 ចាប់ផ្តើម

មធ្យមសិក្សានេះមានមេរៀនដែលគ្របដណ្តប់ចំណុចសំខាន់ៗនៃការសាងសង់តំណាង AI។ មេរៀននីមួយមានប្រធានបទផ្ទាល់ខ្លួន អ្នកអាចចាប់ផ្តើមពីណាក៏បានដែលអ្នកចូលចិត្ត!

មានការគាំទ្រភាសាច្រើនសម្រាប់មធ្យមសិក្សានេះ។ សូមទៅកាន់ [ភាសាដែលមានទំនុកចិត្តនៅទីនេះ](#-multi-language-support)។

បើនេះជាលើកដំបូងដែលអ្នកសាងសង់ជាមួយគំរូ Generative AI សូមពិនិត្យមើលមធ្យមសិក្សា [Generative AI សម្រាប់អ្នកចាប់ផ្តើម](https://aka.ms/genai-beginners) របស់យើង ដែលមានមេរៀន ២១គ្រប់គ្រាន់សម្រាប់ការសាងសង់ជាមួយ GenAI។

កុំភ្លេច [ផ្កាយ (🌟) ទុកឲ្យឃ្លាំងនេះ](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) និង [fork ឃ្លាំងនេះ](https://github.com/microsoft/ai-agents-for-beginners/fork) ដើម្បីដំណើរកូដ។

### ជួបអ្នករៀនផ្សេងទៀត ហើយទទួលបានចម្លើយសំណួររបស់អ្នក

បើអ្នកជួបការលំបាក ឬមានសំណួរណាអំពីការសាងសង់តំណាង AI សូមចូលរួមឆានែល Discord ពិសេសរបស់យើងនៅក្នុង [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)។

### អ្វីដែលអ្នកត្រូវការ

មេរៀននីមួយក្នុងមធ្យមសិក្សានេះមានឧទាហរណ៍កូដ ដែលអាចរកបានក្នុងថត code_samples។ អ្នកអាច [fork ឃ្លាំងនេះ](https://github.com/microsoft/ai-agents-for-beginners/fork) ដើម្បីបង្កើតច្បាប់ផ្ទាល់ខ្លួន។

ឧទាហរណ៍កូដក្នុងលំហាត់ទាំងនេះប្រើប្រាស់ Microsoft Agent Framework ជាមួយសេវាកម្ម Azure AI Foundry Agent V2៖

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - ត្រូវការគណនី Azure

មធ្យមសិក្សានេះប្រើបណ្ដាកម្មវិធី និងសេវាកម្ម AI Agent ខាងក្រោមពី Microsoft៖

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

ឧទាហរណ៍កូដខ្លះៗក៏គាំទ្រអ្នកផ្តល់ដែលអាចប្រើជាមួយ OpenAI ដូចជា [MiniMax](https://platform.minimaxi.com/) ដែលផ្តល់គំរូ context ធំៗ (រហូតដល់ 204K tokens)។ សូមមើល [Course Setup](./00-course-setup/README.md) សម្រាប់ព័ត៌មានលម្អិតក្នុងការកំណត់។

សម្រាប់ព័ត៌មានបន្ថែមអំពីរបៀបដំណើរការ​កូដសម្រាប់មធ្យមសិក្សានេះ សូមទៅកាន់ [Course Setup](./00-course-setup/README.md)។

## 🙏 ចង់ជួយមែនទេ?

តើអ្នកមានاقتراح ឬរកឃើញកំហុសអក្សរឬកូដ? [ដាក់ទុក្ខ](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) ឬ [បង្កើតសំណើបង្រួម](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)

## 📂 មេរៀននីមួយមាន

- មេរៀនសរសេរជាអក្សរដែលមាននៅក្នុង README និងវីដេអូចម្អិតខ្លី
- ឧទាហរណ៍កូដ Python ប្រើ Microsoft Agent Framework យោងទៅ Azure AI Foundry
- តំណភ្ជាប់ទៅធនធានបន្ថែមសម្រាប់បន្តការសិក្សារបស់អ្នក

## 🗃️ មេរៀន

| **មេរៀន**                              | **អត្ថបទ និងកូដ**                                  | **វីដេអូ**                                                | **ការសិក្សាបន្ថែម**                                                                      |
|-----------------------------------------|-------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------|
| សេចក្តីផ្តើមទៅឱ្យតំណាង AI និងករណីប្រើប្រាស់ | [តំណ](./01-intro-to-ai-agents/README.md)               | [វីដេអូ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| ស្វែងយល់អំពី Agentic Frameworks       | [តំណ](./02-explore-agentic-frameworks/README.md)       | [វីដេអូ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| យល់ដឹងពីលំនាំរចនាបថ Agentic          | [តំណ](./03-agentic-design-patterns/README.md)          | [វីដេអូ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| លំនាំរចនាបថការប្រើប្រាស់ឧបករណ៍       | [តំណ](./04-tool-use/README.md)                         | [វីដេអូ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| Agentic RAG                             | [តំណ](./05-agentic-rag/README.md)                       | [វីដេអូ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| កសាងតំណាង AI ដែលគួរឱ្យទុកចិត្ត       | [តំណ](./06-building-trustworthy-agents/README.md)       | [វីដេអូ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK ) | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| លំនាំរចនាបថផែនការ                     | [តំណ](./07-planning-design/README.md)                   | [វីដេអូ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| លំនាំរចនាបថអាចមានតំណាងច្រើន         | [តំណ](./08-multi-agent/README.md)                       | [វីដេអូ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)  | [តំណ](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)    |
| គំរូរចនាបាស្តារមេតាកូហ្គ្និចស៊ីន                  | [Link](./09-metacognition/README.md)               | [Video](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| អេជិន AI នៅក្នុងការផលិត                        | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ការប្រើប្រាស់ប្រព័ន្ធវិធានការអេជិន (MCP, A2A និង NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| វិស្សមកាលបច្ចេកវិទ្យាសម្រាប់អេជិន AI           | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ការគ្រប់គ្រងចងចាំអេជិន                           | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| ការស្វែងយល់អំពីស៊ុម Microsoft Agent          | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| ការបង្កើតអេជិនប្រើប្រាស់កុំព្យូទ័រ (CUA)        | [Link](./15-browser-use/README.md)     |                                                            | [Link](https://docs.browser-use.com/examples/templates/playwright-integration)         |
| ការដាក់បញ្ចូលអេជិនអាចពង្រីកបាន               | កំពុងមកដល់                           |                                                            |                                                                                        |
| ការបង្កើតអេជិន AI មូលដ្ឋាន                    | កំពុងមកដល់                               |                                                            |                                                                                        |
| ការសុវត្ថិភាពអេជិន AI                          | កំពុងមកដល់                               |                                                            |                                                                                        |

## 🎒 វគ្គសិក្សាផ្សេងទៀត

ក្រុមការងាររបស់យើងផលិតវគ្គសិក្សាផ្សេងទៀត! សូមពិនិត្យមើល៖

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / អេជិន 
[![AZD សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ស៊េរី AI បង្កើតថ្មី
[![Generative AI សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### ការរៀនមូលដ្ឋាន
[![ML សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![វិទ្យាសាស្ត្រទិន្នន័យសម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![សន្តិសុខបច្ចេកវិទ្យាសម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![អភិវឌ្ឍន៍វេបសម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![អភិវឌ្ឍ XR សម្រាប់អ្នកចាប់ផ្តើម](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ស៊េរី Copilot
[![Copilot សម្រាប់កូដព្រមគ្នា AI](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot សម្រាប់ C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot ផ្សងព្រេង](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 អរគុណពីសហគមន៍

អរគុណចំពោះ [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) សម្រាប់ការរួមចំណែកឧទាហរណ៍កូដសំខាន់ៗបង្ហាញ Agentic RAG។

## ការរួមចំណែក

គម្រោងនេះស្វាគមន៍ការរួមចំណែកនិងយោបល់។  ការរួមចំណែកភាគច្រើនទាមទារឲ្យអ្នកយល់ព្រមលើ
កិច្ចព្រមព្រៀងអាជ្ញាប័ណ្ណជាអ្នករួមចំណែក (Contributor License Agreement - CLA) ដែលប្រកាសថាអ្នកមានសិទ្ធិ នឹងពិតជាបានផ្ដល់យើង
នូវសិទ្ធិប្រើប្រាស់ការរួមចំណែករបស់អ្នក។ សម្រាប់ព័ត៌មានលម្អិត សូមចូលមើល <https://cla.opensource.microsoft.com>។

ពេលអ្នកបញ្ជូនសំណើ Pull Request មួយ គ្រាប់បាល់ CLA នឹងកំណត់ដោយស្វ័យប្រវត្តិថាតើអ្នកត្រូវការ
ផ្ដល់ CLA និងតុបតែង PR តាមឱកាស (ឧ. ការត្រួតពិនិត្យស្ថានភាព ពហុមតិកម្ម)។ សូមធ្វើតាមការណែនាំ
ដែលគ្រាប់បាល់ផ្ដល់ជូន។ អ្នកនឹងត្រូវធ្វើបែបនេះតែម្តងក្នុងគម្រោងទាំងអស់ដែលប្រើ CLA របស់យើង។

គម្រោងនេះបានទទួលយក [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/)។
សម្រាប់ព័ត៌មានបន្ថែម សូមមើល [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) ឬ
ទាក់ទង [opencode@microsoft.com](mailto:opencode@microsoft.com) ប្រសិនបើមានសំណួរឬមតិយោបល់បន្ថែម។

## រូបសញ្ញា

គម្រោងនេះអាចមានរូបសញ្ញាឬ Logo សម្រាប់គម្រោង ផលិតផល ឬសេវាកម្ម។ ការប្រើប្រាស់រូបសញ្ញា ឬ Logo របស់ Microsoft ជាអ្នកមានសិទ្ធិបញ្ជាក់
មានលក្ខខណ្ឌ និងត្រូវតែអនុលោមតាម
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general)។
ការប្រើរូបសញ្ញា ឬ Logo របស់ Microsoft ក្នុងកំណែដែលបានកែប្រែរបស់គម្រោងនេះមិនគួរបង្ករឲ្យមានការភាន់ច្រឡំនៅឬបង្ហាញពីការឧបត្ថម្ភពី Microsoft ទេ។
ការប្រើរូបសញ្ញា ឬ Logo របស់ភាគីទីបី ត្រូវការតាមគោលការណ៍របស់ភាគីទីបីនោះ។

## រកជំនួយ

បើអ្នកឈប់សម្រាក ឬមានសំណួរអំពីការបង្កើតកម្មវិធី AI សូមចូលរួម៖

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

បើអ្នកមានមតិយោបល់និងកំហុសនៅពេលកំពុងបង្កើត សូមចូលទៅកាន់៖

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**៖  
ឯកសារ​នេះ​ត្រូវ​បាន​បកប្រែ​ដោយ​ប្រើ​សេវាកម្ម​បកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ខណៈពេល​យើង​ព្យាយាម​បំពេញភាព​ត្រឹមត្រូវ សូម​យល់ព្រមថា ការបកប្រែ​ដោយ​ស្វ័យប្រវត្តិ​អាច​មាន​កំហុស ឬ ភាពមិនត្រឹមត្រូវ។ ឯកសារ​ដើម​ក្នុង​ភាសា​មូលដ្ឋាន​របស់​វា​ត្រូវ​បានគិត​ជា​ប្រភព​ដែល​ទ្ជិតត្រូវ។ សម្រាប់​ព័ត៌មានសំខាន់ៗ ការ​បកប្រែ​ដោយ​អ្នកជំនាញ​មនុស្ស​ត្រូវ​បាន​ផ្តល់អនុសាសន៍។ យើង​មិន​ទទួលបន្ទុក​ចំពោះ​ការយល់ច្រឡំ ឬ ការបកស្រាយខុសដែល​កើតមាន​ពី​ការ​ប្រើប្រាស់​ការ​បកប្រែ​នេះ​ទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->