# ಆರಂಭಿಕರಿಗೆ AI ಏಜೆಂಟ್ಸ್ - ಒಂದು ಪಾಠ್ಯಕ್ರಮ

![ಆರಂಭಿಕರಿಗಾಗಿ ಜನರೇಟಿವ್ AI](../../translated_images/kn/repo-thumbnailv2.06f4a48036fde647.webp)

## AI ಏಜೆಂಟ್ಸ್ ನಿರ್ಮಾಣ ಪ್ರಾರಂಭಿಸಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲವನ್ನು ಕಲಿಸುವ ಪಾಠ್ಯಕ್ರಮ

[![GitHub ಪರವಾನಗಿ](https://img.shields.io/github/license/microsoft/ai-agents-for-beginners.svg)](https://github.com/microsoft/ai-agents-for-beginners/blob/master/LICENSE?WT.mc_id=academic-105485-koreyst)
[![GitHub ಬಿಡಿಕೆದಾರರು](https://img.shields.io/github/contributors/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/graphs/contributors/?WT.mc_id=academic-105485-koreyst)
[![GitHub ಸಮಸ್ಯೆಗಳು](https://img.shields.io/github/issues/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/issues/?WT.mc_id=academic-105485-koreyst)
[![GitHub ಪುಲ್-ರಿಕ್ವೆಸ್ಟ್‌ಗಳು](https://img.shields.io/github/issues-pr/microsoft/ai-agents-for-beginners.svg)](https://GitHub.com/microsoft/ai-agents-for-beginners/pulls/?WT.mc_id=academic-105485-koreyst)
[![PRs ಸ್ವಾಗತ](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com?WT.mc_id=academic-105485-koreyst)

### 🌐 ಬಹುಭಾಷಾ ಬೆಂಬಲ

#### GitHub ಆ್ಯಕ್ಷನ್ ಮೂಲಕ ಬೆಂಬಲಿತ (ಸ್ವಯಂಕ್ರಿಯ & ಯಾವಾಗಲೂ ನವೀಕೃತ)

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](../my/README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](./README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **ಸ್ಥಳೀಯವಾಗಿ ಕ್ಲೋನ್ ಮಾಡೋಣವೆ?**
>
> ಈ ರೆಪೊಸಿಟರಿ 50+ ಭಾಷಾಂತರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಡೌನ್ಲೋಡ್ ಗಾತ್ರವನ್ನು ಬಹುಮುಖ್ಯವಾಗಿ ಹೆಚ್ಚಿಸುತ್ತದೆ. ಭಾಷಾಂತರಗಳು ಇಲ್ಲದೇ ಕ್ಲೋನ್ ಮಾಡಲು sparse checkout ಬಳಸಿರಿ:
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
> ಇದರಿಂದ ಪಾಠ್ಯಕ್ರಮ ಪೂರ್ಣಗೊಳ್ಳಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲವನ್ನೂ ತುಂಬಾ ವೇಗವಾಗಿ ಡೌನ್ಲೋಡ್ ಮಾಡಬಹುದು.
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

**ನೀವು ಹೆಚ್ಚುವರಿ ಭಾಷೆಯ ಬೆಂಬಲವನ್ನು ಬೇಕಾದರೆ [ಇಲ್ಲಿ](https://github.com/Azure/co-op-translator/blob/main/getting_started/supported-languages.md) ಸಂಗ್ರಹಿಸಲಾಗಿದೆ**

[![GitHub ವಾಚರ್ಸ್](https://img.shields.io/github/watchers/microsoft/ai-agents-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/ai-agents-for-beginners/watchers/?WT.mc_id=academic-105485-koreyst)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/ai-agents-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/ai-agents-for-beginners/network/?WT.mc_id=academic-105485-koreyst)
[![GitHub ಸ್ಟಾರ್ಸ್](https://img.shields.io/github/stars/microsoft/ai-agents-for-beginners.svg?style=social&label=Star)](https://GitHub.com/microsoft/ai-agents-for-beginners/stargazers/?WT.mc_id=academic-105485-koreyst)

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


## 🌱 ಪ್ರಾರಂಭಿಸುವುದು

ಈ ಪಠ್ಯಕ್ರಮವು AI ಏಜೆಂಟ್ಸ್ ನಿರ್ಮಾಣದ ಮೂಲಭೂತಗಳನ್ನು ಒಳಗೊಂಡ ಪಾಠಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಪ್ರತಿ ಪಾಠವು ತನ್ನದೇ ವಿಷಯವನ್ನು ಒಳಗೊಂಡಿದೆ, ಆದ್ದರಿಂದ ನೀವು ಯಾವತ್ತಾದರೂ ಪ್ರಾರಂಭಿಸಬಹುದು!

ಈ ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಬಹುಭಾಷಾ ಬೆಂಬಲ ಇದೆ. [ಇಲ್ಲಿ ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳಿಗೆ ಹೋಗಿ](#-multi-language-support).

ನೀವು ಮೊದಲ ಬಾರಿಗೆ ಜನರೇಟಿವ್ AI ಮಾದರಿಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದರೆ, ನಮ್ಮ [ಜನರೇಟಿವ್ AI ಆರಂಭಿಕರಿಗೆ](https://aka.ms/genai-beginners) ಪಠ್ಯಕ್ರಮವನ್ನು ನೋಡಿ, ಇದು GenAI ಬಳಸಿ ನಿರ್ಮಾಣದ 21 ಪಾಠಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.

ದಯವಿಟ್ಟು ಈ ರೆಪೊವನ್ನು [ಸ್ಟಾರ್ (🌟) ಮಾಡೋಣ](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) ಮತ್ತು [ಫೋರ್ಕ್ ಮಾಡೋಣ](https://github.com/microsoft/ai-agents-for-beginners/fork) ಕೋಡ್ ಓಡಿಸಲು.

### ಇತರ ಕಲಿಕಾರಿಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ, ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರ ಪಡೆಯಿರಿ

ನೀವು ಸಿಲುಕಿ ಹೋದರೆ ಅಥವಾ AI ಏಜೆಂಟ್ಸ್ ನಿರ್ಮಾಣ ಕುರಿತ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಇದ್ದರೆ, ನಮ್ಮ ನಿಶ್ಚಿತ Discord ಚಾನೆಲ್ ನಲ್ಲಿ ಸೇರಿ [Microsoft Foundry Discord ನಲ್ಲಿ](https://aka.ms/ai-agents/discord).

### ನಿಮಗೆ ಬೇಕಾಗಿರುವುದು

ಈ ಪಠ್ಯಕ್ರಮದ ಪ್ರತಿಯೊಂದು ಪಾಠವೂ ಕೋಡ್ ಉದಾಹರಣೆಯನ್ನು ಒಳಗೊಂಡಿದೆ, ಅವುಗಳನ್ನು code_samples ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಕಂಡುಹಿಡಿಯಬಹುದು. ನೀವು [ಈ ರೆಪೊವನ್ನು ಫೋರ್ಕ್ ಮಾಡಿ](https://github.com/microsoft/ai-agents-for-beginners/fork) ನಿಮ್ಮ ಪ್ರತಿಯನ್ನು ರಚಿಸಬಹುದು.

ಈ ಕಾರ್ಯಗಳು Microsoft Agent Framework ಅನ್ನು Azure AI Foundry Agent Service V2 ಜೊತೆ ಉಪಯೋಗಿಸುತ್ತವೆ:

- [Microsoft Foundry](https://aka.ms/ai-agents-beginners/ai-foundry) - Azure ಖಾತೆ ಅಗತ್ಯ

ಈ ಪಠ್ಯಕ್ರಮವು Microsoft ನ ಕೆಳಗಿನ AI ಏಜೆಂಟ್ ಫ್ರೇಮ್ವರ್ಕ್‌ಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಉಪಯೋಗಿಸುತ್ತದೆ:

- [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok)
- [Azure AI Foundry Agent Service V2](https://aka.ms/ai-agents-beginners/ai-agent-service)

ಈ ಪಠ್ಯಕ್ರಮದ ಕೋಡ್ ನಡಿಸುವ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ, [ಪಠ್ಯಕ್ರಮ ಸಿದ್ಧತೆ](./00-course-setup/README.md) ಗೆ ಹೋಗಿ.

## 🙏 ಸಹಾಯ ಮಾಡಬೇಕೆ?

ನೀವು ಸಲಹೆಗಳನ್ನು ಹೊಂದಿದ್ದರೆ ಅಥವಾ ಶಬ್ಧ, ಕೋಡ್ ದೋಷಗಳನ್ನು ಕಂಡುಹಿಡಿದಿದ್ದರೆ? [ಒಂದು ಪ್ರಶ್ನೆಯನ್ನು ಎತ್ತರಿಸಿ](https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst) ಅಥವಾ [ಪುಲ್ ರಿಕ್ವೆಸ್ಟ್ ರಚಿಸಿ](https://github.com/microsoft/ai-agents-for-beginners/pulls?WT.mc_id=academic-105485-koreyst)


## 📂 ಪ್ರತಿಯೊಂದು ಪಾಠವು ಒಳಗೊಂಡಿದೆ

- README ನಲ್ಲಿ ಲಿಖಿತ ಪಾಠ ಮತ್ತು ಒಂದು ಚುಟುಕಿನ ವೀಡಿಯೋ
- Python ಕೋಡ್ ಉದಾಹರಣೆಗಳು Microsoft Agent Framework ನೊಂದಿಗೆ Azure AI Foundry ಬಳಸಿ
- ನಿಮ್ಮ ಅಧ್ಯಯನವನ್ನು ಮುಂದುವರೆಸಲು ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳ ಲಿಂಕ್‌ಗಳು


## 🗃️ ಪಾಠಗಳು

| **ಪಾಠ**                                   | **ಪಠ್ಯ ಮತ್ತು ಕೋಡ್**                                    | **ವೀಡಿಯೋ**                                                  | **ಹೆಚ್ಚಿನ ಅಧ್ಯಯನ**                                                                     |
|------------------------------------------|-------------------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| AI ಏಜೆಂಟ್ಸ್ ಮತ್ತು ಏಜೆಂಟ್ ಬಳಕೆಯ ಪರಿಚಯ     | [ಲಿಂಕ್](./01-intro-to-ai-agents/README.md)             | [ವೀಡಿಯೋ](https://youtu.be/3zgm60bXmQk?si=z8QygFvYQv-9WtO1)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| AI ಏಜೆಂಟಿಕ್ ಫ್ರೇಮ್ವರ್ಕ್‌ಗಳನ್ನು ಅನ್ವೇಷಿಸುವುದು | [ಲಿಂಕ್](./02-explore-agentic-frameworks/README.md)       | [ವೀಡಿಯೋ](https://youtu.be/ODwF-EZo_O8?si=Vawth4hzVaHv-u0H)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| AI ಏಜೆಂಟಿಕ್ ವಿನ್ಯಾಸ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು | [ಲಿಂಕ್](./03-agentic-design-patterns/README.md)          | [ವೀಡಿಯೋ](https://youtu.be/m9lM8qqoOEA?si=BIzHwzstTPL8o9GF)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ಉಪಕರಣ ಬಳಕೆಯ ವಿನ್ಯಾಸ ಮಾದರಿ                | [ಲಿಂಕ್](./04-tool-use/README.md)                         | [ವೀಡಿಯೋ](https://youtu.be/vieRiPRx-gI?si=2z6O2Xu2cu_Jz46N)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ಏಜೆಂಟಿಕ್ RAG                            | [ಲಿಂಕ್](./05-agentic-rag/README.md)                      | [ವೀಡಿಯೋ](https://youtu.be/WcjAARvdL7I?si=gKPWsQpKiIlDH9A3)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ನಂಬಿಗಸ್ತ AI ಏಜೆಂಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವುದು    | [ಲಿಂಕ್](./06-building-trustworthy-agents/README.md)      | [ವೀಡಿಯೋ](https://youtu.be/iZKkMEGBCUQ?si=jZjpiMnGFOE9L8OK )  | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ಯೋಜನೆ ವಿನ್ಯಾಸ ಮಾದರಿ                      | [ಲಿಂಕ್](./07-planning-design/README.md)                  | [ವೀಡಿಯೋ](https://youtu.be/kPfJ2BrBCMY?si=6SC_iv_E5-mzucnC)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ಬಹು-ಏಜೆಂಟ್ ವಿನ್ಯಾಸ ಮಾದರಿ                   | [ಲಿಂಕ್](./08-multi-agent/README.md)                      | [ವೀಡಿಯೋ](https://youtu.be/V6HpE9hZEx0?si=rMgDhEu7wXo2uo6g)   | [ಲಿಂಕ್](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst)  |
| ಮೆಟಾಕಾಗ್ನಿಷನ್ ವಿನ್ಯಾಸ ಮಾದರಿ                  | [Link](./09-metacognition/README.md)               | [Video](https://youtu.be/His9R6gw6Ec?si=8gck6vvdSNCt6OcF)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ಉತ್ಪಾದನೆಯಲ್ಲಿ AI ಏಜೆಂಟ್ಸ್                      | [Link](./10-ai-agents-production/README.md)        | [Video](https://youtu.be/l4TP6IyJxmQ?si=31dnhexRo6yLRJDl)  | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ಏಜೆಂಟಿಕ್ ಪ್ರೋಟೋಕಾಲ್ಗಳ ಬಳಕೆ (MCP, A2A ಮತ್ತು NLWeb) | [Link](./11-agentic-protocols/README.md)           | [Video](https://youtu.be/X-Dh9R3Opn8)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| AI ಏಜೆಂಟ್ಸ್ ಗೆ ಪರಿಪ्रेಕ್ಷ್ಯ ಇಂಜಿನಿಯರಿಂಗ್      | [Link](./12-context-engineering/README.md)         | [Video](https://youtu.be/F5zqRV7gEag)                                 | [Link](https://aka.ms/ai-agents-beginners/collection?WT.mc_id=academic-105485-koreyst) |
| ಏಜೆಂಟಿಕ್ ಮೆಮೊರಿ ನಿರ್ವಹಣೆ                      | [Link](./13-agent-memory/README.md)     |      [Video](https://youtu.be/QrYbHesIxpw?si=vZkVwKrQ4ieCcIPx)                                                      |                                                                                        |
| ಮೈಕ್ರೋಸಾಫ್ಟ್ ಏಜೆಂಟ್ ಫ್ರೇಮ್‌ವಾರ್ಕ್ ಅನ್ವೇಷಣೆ   | [Link](./14-microsoft-agent-framework/README.md)                            |                                                            |                                                                                        |
| ಕಂಪ್ಯೂಟರ್ ಬಳಕೆ ಏಜೆಂಟ್ಸ್ (CUA) ನಿರ್ಮಾಣ         | ಶೀಘ್ರ ಬರುತ್ತಿದೆ                            |                                                            |                                                                                        |
| ಅನುಕ್ರಮಣೀಯ ಏಜೆಂಟ್ಸ್ ನಿಯೋಜನೆ                    | ಶೀಘ್ರ ಬರುತ್ತಿದೆ                            |                                                            |                                                                                        |
| ಸ್ಥಳೀಯ AI ಏಜೆಂಟ್ಸ್ ರಚನೆ                       | ಶೀಘ್ರ ಬರುತ್ತಿದೆ                               |                                                            |                                                                                        |
| AI ಏಜೆಂಟ್ಸ್ ಸುರಕ್ಷತೆ                            | ಶೀಘ್ರ ಬರುತ್ತಿದೆ                               |                                                            |                                                                                        |

## 🎒 ಇತರ ಕೋರ್ಸ್‌ಗಳು

ನಮ್ಮ ತಂಡ ಇತರ ಕೋರ್ಸ್‌ಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ! ಪರಿಶೀಲಿಸಿ:

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### ಲ್ಯಾಂಗ್‌ಚೇನ್
[![LangChain4j for Beginners](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js for Beginners](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain for Beginners](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### ಅಜೂರ್ / ಎಡ್ಜ್ / MCP / ಏಜೆಂಟ್ಸ್
[![AZD for Beginners](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI for Beginners](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP for Beginners](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents for Beginners](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ಜನರೇಟಿವ್ AI ಸರಣಿ
[![Generative AI for Beginners](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### ಕೋರ್ ಲರ್ನಿಂಗ್
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)
[![Web Dev for Beginners](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![IoT for Beginners](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![XR Development for Beginners](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### ಕೊಪೈಲಟ್ ಸರಣಿ
[![Copilot for AI Paired Programming](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![Copilot for C#/.NET](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot Adventure](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

## 🌟 ಸಮುದಾಯದ ಧನ್ಯವಾದಗಳು

Agentic RAG ಅನ್ನು ತೋರಿಸುವ ಅತ್ಯಂತ ನಂಬಿಗಸ್ತ ಕೋಡ್ ಮಾದರಿಗಳಿಗೆ [ಶಿವಾಮ್ ಗೋಯಲ್](https://www.linkedin.com/in/shivam2003/) ಅವರಿಗೆ ಧನ್ಯವಾದಗಳು.

## ಕೊಡುಗೆ ನೀಡುವುದು

ಈ ಯೋಜನೆ ಕೊಡುಗೆಗಳು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ. ಹೆಚ್ಚಿನ ಕೊಡುಗೆಗಳಿಗೆ ನೀವು ಒಪ್ಪಿಗೆ ನೀಡಬೇಕಾಗುತ್ತದೆ
Contributor License Agreement (CLA) - ದಯವಿಟ್ಟು ನೀವು ಈ ಕೊಡುಗೆಗಳನ್ನು ಬಳಸಲು ಅಧಿಕಾರವಿರುವಿರಿ ಮತ್ತು ಅದನ್ನು ನಮಗೆ ನೀಡುತ್ತಿರುವಿರಿ ಎಂದು ಘೋಷಿಸುವ ಒಪ್ಪಂದ. ವಿವರಗಳಿಗೆ, ಭೇಟಿ ನೀಡಿ <https://cla.opensource.microsoft.com>.

ನೀವು ಪುಲ್ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿದಾಗ, CLA ಬಾಟ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನೀವು CLA ನೀಡಬೇಕಿದೆಯೇ ಎಂದು ನಿರ್ಧರಿಸಿ PR ಅನ್ನು ಸೂಕ್ತವಾಗಿ ಅಲಂಕರಿಸುತ್ತದೆ (ಉದಾಹರಣೆ, ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ, ಟಿಪ್ಪಣಿ). ಬಾಟ್‌ನ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ. ನಮ್ಮ CLA ಬಳಸಿ ಎಲ್ಲಾ ರೆಪೊಗಳ ಮೇಲೆ ನೀವು ಇದನ್ನು ಒಮ್ಮೆ ಮಾತ್ರ ಮಾಡುವಿರಾ.

ಈ ಯೋಜನೆ [ಮೈಕ್ರೋಸಾಫ್ಟ್ ಒಪನ್ ಸೋರ್ಸ್ ಕೋಡ್ ಆಫ್ ಕಂಡಕ್ಟ್](https://opensource.microsoft.com/codeofconduct/) ಅನ್ನು ಅನುಸರಿಸಿದೆ.
ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ [ಕೋಡ್ ಆಫ್ ಕಂಡಕ್ಟ್ FAQ](https://opensource.microsoft.com/codeofconduct/faq/) ನೋಡಿರಿ ಅಥವಾ
ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಟಿಪ್ಪಣಿಗಳಿಗಾಗಿ [opencode@microsoft.com](mailto:opencode@microsoft.com) ಸಂಪರ್ಕಿಸಿ.

## ಟ್ರೇಡ್ಮಾರ್ಕ್‌ಗಳು

ಈ ಯೋಜನೆಯಲ್ಲಿ ಯೋಜನೆಗಳು, ಉತ್ಪನ್ನಗಳು ಅಥವಾ ಸೇವೆಗಳ ಟ್ರೇಡ್ಮಾರ್ಕ್‌ಗಳು ಅಥವಾ ಲೋಗೋಗಳು ಇರಬಹುದು. ಮೈಕ್ರೋಸಾಫ್ಟ್
ಟ್ರೇಡ್ಮಾರ್ಕ್‌ಗಳು ಅಥವಾ ಲೋಗೋಗಳ ಅಧಿಕಾರಿತ ಬಳಕೆ,
[ಮೈಕ್ರೋಸಾಫ್ಟ್ ಟ್ರೇಡ್ ಮಾರ್ಕ್ & ಬ್ರ್ಯಾಂಡ್ ಮಾರ್ಗಸೂಚಿಗಳು](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general) ಗೆ ಒಳಪಟ್ಟಿದೆ.
ಈ ಯೋಜನೆಯ ಪರಿಷ್ಕೃತ ಆವೃತ್ತಿಗಳಲ್ಲಿ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಟ್ರೇಡ್ಮಾರ್ಕ್ ಅಥವಾ ಲೋಗೋಗಳ ಬಳಕೆ ಗೊಂದಲಕ್ಕೆ ಅಥವಾ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಹಂಚಿಕೆಗೆ ಕಾರಣವಾಗಿರಬಾರದು.
ಮೂರನೇ ಪಕ್ಷಗಳ ಟ್ರೇಡ್ಮಾರ್ಕ್‌ಗಳು ಅಥವಾ ಲೋಗೋಗಳ ಬಳಕೆ ಆ ಪಾರ್ಟ್‌ಗಳ ನೀತಿಗಳಿಗೆ ಒಳಪಟ್ಟಿದೆ.

## ಸಹಾಯ ಪಡೆಯುವುದು

ನೀವು ಅడ్డಂಕಿ ಎದುರಿಸುತ್ತಿದ್ದರೆ ಅಥವಾ AI ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ಸೇರಿರಿ:

[![Microsoft Foundry Discord](https://img.shields.io/badge/Discord-Azure_AI_Foundry_Community_Discord-blue?style=for-the-badge&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

ಉತ್ಪನ್ನ ಅಭಿಪ್ರಾಯ ಅಥವಾ ನಿರ್ಮಾಣದ ವೇಳೆ ದೋಷಗಳಿದ್ದರೆ ಭೇಟಿ ನೀಡಿ:

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Azure_AI_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ವಿವರಣೆ**:  
ಈ ದಾಖಲೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಎಂಬ AI ಅನುವಾದ ಸೇವೆಯನ್ನು ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ, ಆದರೆ ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪುಗಳು ಅಥವಾ ಅಸೂಕ್ತತೆಗಳು ಇರಬಹುದು ಎಂದು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲದ ಭಾಷೆಯಲ್ಲಿನ ಮೂಲ ದಾಖಲೆ ಅತ್ಯಂತ ನಂಬಿಕೆಯಾಗಿರುವ ಮೂಲಕ ಪರಿಗಣಿಸಬೇಕು. ಮಹತ್ವದ ಮಾಹಿತಿಗೆ, ನಿಪುಣ ಮಾನವ ಅನುವಾದ ಸೂಚಿಸಲಾಗಿದೆ. ಈ ಅನುವಾದದಿಂದ ಉಂಟಾದ ಯಾವುದೇ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ತಪ್ಪುಗಳಿಂದ ಅಥವಾ ವಿವರಣೆಗಳಿಗಾಗೀಯೂ ನಾವು ಜವಾಬ್ದಾರಿಯಾಗುವುದಿಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->