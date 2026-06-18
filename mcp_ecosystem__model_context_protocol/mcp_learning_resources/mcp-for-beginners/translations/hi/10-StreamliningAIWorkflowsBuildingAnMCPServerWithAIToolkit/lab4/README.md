# 🐙 मॉड्यूल 4: व्यावहारिक MCP विकास - कस्टम GitHub क्लोन सर्वर

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ त्वरित शुरुआत:** केवल 30 मिनट में एक उत्पादन-तैयार MCP सर्वर बनाएं जो GitHub भंडार क्लोनिंग और VS कोड एकीकरण को स्वचालित करता है!

## 🎯 सीखने के उद्देश्य

इस प्रयोगशाला के अंत तक, आप सक्षम होंगे:

- ✅ वास्तविक विश्व विकास कार्यप्रवाह के लिए कस्टम MCP सर्वर बनाना
- ✅ MCP के माध्यम से GitHub भंडार क्लोनिंग कार्यक्षमता लागू करना
- ✅ कस्टम MCP सर्वरों को VS Code और Agent Builder के साथ एकीकृत करना
- ✅ कस्टम MCP उपकरणों के साथ GitHub Copilot Agent Mode का उपयोग करना
- ✅ उत्पादन वातावरण में कस्टम MCP सर्वरों का परीक्षण और परिनियोजन करना

## 📋 पूर्वापेक्षाएँ

- प्रयोगशालाओं 1-3 (MCP मूल बातें और उन्नत विकास) की पूर्णता
- GitHub Copilot सदस्यता ([नि:शुल्क साइनअप उपलब्ध](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit और GitHub Copilot एक्सटेंशंस के साथ VS Code
- स्थापित और कॉन्फ़िगर किया गया Git CLI

## 🏗️ परियोजना अवलोकन

### **वास्तविक विश्व विकास चुनौती**
डेवलपर्स के रूप में, हम अक्सर GitHub का उपयोग करके रिपॉजिटरी क्लोन करते हैं और उन्हें VS Code या VS Code Insiders में खोलते हैं। यह मैनुअल प्रक्रिया इसमें शामिल है:
1. टर्मिनल/कमांड प्रॉम्प्ट खोलना
2. इच्छित निर्देशिका में नेविगेट करना
3. `git clone` कमांड चलाना
4. क्लोन की गई निर्देशिका में VS Code खोलना

**हमारा MCP समाधान इसे एक ही बुद्धिमान कमांड में सरल करता है!**

### **आप क्या बनाएंगे**
एक **GitHub Clone MCP Server** (`git_mcp_server`) जो प्रदान करता है:

| फीचर | विवरण | लाभ |
|---------|-------------|---------|
| 🔄 **स्मार्ट रिपॉजिटरी क्लोनिंग** | सत्यापन के साथ GitHub रिपॉजिटरी क्लोन करें | स्वचालित त्रुटि जांच |
| 📁 **बुद्धिमान निर्देशिका प्रबंधन** | निर्देशिकाओं को सुरक्षित रूप से जांचें और बनाएं | अधिलेखन से बचाव |
| 🚀 **क्रॉस-प्लेटफ़ॉर्म VS Code एकीकरण** | प्रोजेक्ट्स को VS Code/Insiders में खोलें | निर्बाध कार्यप्रवाह परिवर्तन |
| 🛡️ **मजबूत त्रुटि हैंडलिंग** | नेटवर्क, अनुमति, और पथ समस्याओं को संभालें | उत्पादन-तैयार विश्वसनीयता |

---

## 📖 चरण-दर-चरण कार्यान्वयन

### चरण 1: Agent Builder में GitHub Agent बनाएं

1. **Microsoft Foundry Toolkit एक्सटेंशन के माध्यम से Agent Builder लॉन्च करें**
2. **निम्न कॉन्फ़िगरेशन के साथ एक नया एजेंट बनाएं:**
   ```
   Agent Name: GitHubAgent
   ```

3. **कस्टम MCP सर्वर प्रारंभ करें:**
   - **Tools** → **Add Tool** → **MCP Server** पर जाएं
   - **"Create A new MCP Server"** चुनें
   - अधिकतम लचीलापन के लिए **Python टेम्पलेट** चुनें
   - **सर्वर नाम:** `git_mcp_server`

### चरण 2: GitHub Copilot Agent Mode कॉन्फ़िगर करें

1. VS Code में **GitHub Copilot खोलें** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot इंटरफ़ेस में **Agent Model चुनें**
3. बेहतर तर्क क्षमता के लिए **Claude 3.7 मॉडल चुनें**
4. टूल एक्सेस के लिए **MCP एकीकरण सक्षम करें**

> **💡 प्रो टिप:** Claude 3.7 विकास कार्यप्रवाह और त्रुटि हैंडलिंग पैटर्न की बेहतर समझ प्रदान करता है।

### चरण 3: मुख्य MCP सर्वर कार्यक्षमता लागू करें

**GitHub Copilot Agent Mode के साथ निम्न विस्तृत प्रॉम्प्ट का उपयोग करें:**

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

### चरण 4: अपने MCP सर्वर का परीक्षण करें

#### 4a. Agent Builder में परीक्षण

1. Agent Builder के लिए **डिबग विन्यास लॉन्च करें**
2. इस सिस्टम प्रॉम्प्ट के साथ अपने एजेंट को कॉन्फ़िगर करें:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. वास्तविक उपयोगकर्ता परिदृश्यों के साथ परीक्षण करें:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/hi/DebugAgent.81d152370c503241.webp)

**अपेक्षित परिणाम:**
- ✅ पथ पुष्टि के साथ सफल क्लोनिंग
- ✅ स्वचालित VS Code लॉन्च
- ✅ अमान्य परिदृश्यों के लिए स्पष्ट त्रुटि संदेश
- ✅ किनारे मामलों का उचित प्रबंधन

#### 4b. MCP निरीक्षक में परीक्षण


![MCP Inspector Testing](../../../../translated_images/hi/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 बधाई हो!** आपने एक व्यावहारिक, उत्पादन-तैयार MCP सर्वर सफलतापूर्वक बनाया है जो वास्तविक विकास कार्यप्रवाह चुनौतियों को हल करता है। आपका कस्टम GitHub क्लोन सर्वर डेवलपर उत्पादकता को स्वचालित और बढ़ाने के लिए MCP की शक्ति दिखाता है।

### 🏆 उपलब्धि अनलॉक हुई:
- ✅ **MCP डेवलपर** - कस्टम MCP सर्वर बनाया
- ✅ **वर्कफ्लो ऑटोमेटर** - विकास प्रक्रियाओं को सुव्यवस्थित किया  
- ✅ **इंटीग्रेशन विशेषज्ञ** - कई विकास उपकरण जोड़े
- ✅ **प्रोडक्शन रेडी** - परिनियोज्य समाधान बनाए

---

## 🎓 कार्यशाला पूर्णता: Model Context Protocol के साथ आपकी यात्रा

**प्रिय कार्यशाला प्रतिभागी,**

Model Context Protocol कार्यशाला के सभी चार मॉड्यूल पूरे करने पर बधाई! आपने Microsoft Foundry Toolkit की मूल अवधारणाओं को समझने से लेकर उत्पादन-तैयार MCP सर्वर बनाने तक लंबा सफर तय किया है जो वास्तविक विकास चुनौतियों को हल करते हैं।

### 🚀 आपके सीखने के मार्ग का सारांश:

**[मॉड्यूल 1](../lab1/README.md)**: आपने Microsoft Foundry Toolkit मूल बातें, मॉडल परीक्षण, और अपना पहला AI एजेंट बनाना शुरू किया।

**[मॉड्यूल 2](../lab2/README.md)**: आपने MCP वास्तुकला सीखी, Playwright MCP को एकीकृत किया, और अपना पहला ब्राउज़र ऑटोमेशन एजेंट बनाया।

**[मॉड्यूल 3](../lab3/README.md)**: आपने Weather MCP सर्वर के साथ कस्टम MCP सर्वर विकास में उन्नति की और डिबगिंग उपकरणों में महारत हासिल की।

**[मॉड्यूल 4](../lab4/README.md)**: आपने अब हर चीज़ को एक व्यावहारिक GitHub रिपॉजिटरी वर्कफ़्लो ऑटोमेशन टूल बनाने के लिए लागू किया है।

### 🌟 आपने क्या महारत हासिल की:

- ✅ **Microsoft Foundry Toolkit इकोसिस्टम**: मॉडल, एजेंट, और एकीकरण पैटर्न
- ✅ **MCP वास्तुकला**: क्लाइंट-सर्वर डिज़ाइन, ट्रांसपोर्ट प्रोटोकॉल और सुरक्षा
- ✅ **डेवलपर टूल्स**: प्लेग्राउंड से लेकर इंस्पेक्टर तक उत्पादन परिनियोजन
- ✅ **कस्टम विकास**: अपने स्वयं के MCP सर्वर का निर्माण, परीक्षण और परिनियोजन
- ✅ **व्यावहारिक अनुप्रयोग**: AI के साथ वास्तविक वर्कफ़्लो चुनौतियों का समाधान

### 🔮 आपके अगले कदम:

1. **अपना खुद का MCP सर्वर बनाएं**: इन कौशलों को अपने अद्वितीय वर्कफ़्लोज़ को स्वचालित करने के लिए लागू करें
2. **MCP समुदाय में शामिल हों**: अपनी रचनाओं को साझा करें और दूसरों से सीखें
3. **उन्नत इंटीग्रेशन एक्सप्लोर करें**: MCP सर्वरों को एंटरप्राइज़ सिस्टम से जोड़ें
4. **ओपन सोर्स में योगदान दें**: MCP टूलिंग और दस्तावेजों में सुधार करें

याद रखें, यह कार्यशाला केवल शुरुआत है। Model Context Protocol इकोसिस्टम तेजी से विकसित हो रहा है, और आप अब AI-संचालित विकास टूल के अग्रिम पंक्ति में हैं।

**आपकी भागीदारी और सीखने के प्रति समर्पण के लिए धन्यवाद!**

हमें उम्मीद है कि इस कार्यशाला ने ऐसे विचारों को प्रज्वलित किया है जो आपकी विकास यात्रा में AI उपकरणों को बनाने और इंटरैक्ट करने के तरीके को बदल देंगे।

**कोडिंग शुभ हो!**

---

## आगे क्या है

मॉड्यूल 10 की सभी प्रयोगशालाएं पूरी करने पर बधाई!

- वापस जाएं: [मॉड्यूल 10 अवलोकन](../README.md)
- जारी रखें: [मॉड्यूल 11: MCP सर्वर हैंड्स-ऑन प्रयोगशालाएं](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->