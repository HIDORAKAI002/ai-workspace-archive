# 🐙 मोड्युल ४: व्यवहारिक MCP विकास - कस्टम GitHub क्लोन सर्भर

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ द्रुत सुरुआत:** एक उत्पादन-तयार MCP सर्भर निर्माण गर्नुहोस् जसले GitHub रिपोजिटरी क्लोनिङ र VS Code एकीकरणलाई ३० मिनेटमै स्वचालित बनाउँछ!

## 🎯 सिकाइका उद्देश्यहरू

यस ल्याबको अन्त्यसम्म, तपाईं सक्षम हुनुहुनेछ:

- ✅ वास्तविक विकास कार्यप्रवाहका लागि कस्टम MCP सर्भर सिर्जना गर्न
- ✅ MCP मार्फत GitHub रिपोजिटरी क्लोनिङ कार्यान्वयन गर्न
- ✅ कस्टम MCP सर्भरहरूलाई VS Code र Agent Builder सँग एकीकृत गर्न
- ✅ GitHub Copilot Agent Mode कस्टम MCP उपकरणहरूसँग प्रयोग गर्न
- ✅ उत्पादन वातावरणमा कस्टम MCP सर्भरहरूको परीक्षण र परिनियोजन गर्न

## 📋 पूर्वआवश्यकताहरू

- ल्याब १-३ (MCP आधारभूत कुरा र उन्नत विकास) सम्पन्न गर्नुहोस्
- GitHub Copilot सदस्यता ([नि:शुल्क साइनअप उपलब्ध](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit र GitHub Copilot एक्सटेन्शन सहितको VS Code
- Git CLI इन्स्टल र कन्फिगर गरिएको

## 🏗️ परियोजना अवलोकन

### **वास्तविक विकास चुनौती**
विकासकर्ताहरूको हैसियतले हामी प्रायः GitHub बाट रिपोजिटरीहरू क्लोन गरी VS Code वा VS Code Insiders मा खोल्छौं। यो म्यानुअल प्रक्रिया समावेश गर्दछ:
1. टर्मिनल/कमाण्ड प्रम्प्ट खोल्ने
2. इच्छित डाइरेक्टरीमा जानु
3. `git clone` कमाण्ड चलाउने
4. क्लोन गरिएको डाइरेक्टरीमा VS Code खोल्ने

**हाम्रो MCP समाधान यसलाई एउटै बौद्धिक कमाण्डमा सरल बनाउँछ!**

### **तपाईंले के बनाउनुहुनेछ**
एक **GitHub Clone MCP Server** (`git_mcp_server`) जसले प्रदान गर्दछ:

| सुविधा | विवरण | लाभ |
|---------|---------|---------|
| 🔄 **स्मार्ट रिपोजिटरी क्लोनिङ** | GitHub रिपोजिटरीहरू प्रमाणिकरणसहित क्लोन गर्ने | स्वत: त्रुटि जाँच |
| 📁 **बौद्धिक डाइरेक्टरी व्यवस्थापन** | सुरक्षित रूपमा डाइरेक्टरी जाँच र सिर्जना गर्ने | ओभरराइटिंग रोक्ने |
| 🚀 **प्लेटफर्म-पार VS Code एकीकरण** | VS Code/Insiders मा प्रोजेक्टहरू खोल्ने | सहज कार्यप्रवाह रूपान्तरण |
| 🛡️ **दृढ त्रुटि ह्यान्डलिङ** | नेटवर्क, अनुमति, र पथ समस्याहरू सम्हाल्ने | उत्पादन-तयार विश्वसनीयता |

---

## 📖 चरण-द्वारा-चरण कार्यान्वयन

### चरण १: Agent Builder मा GitHub Agent सिर्जना गर्नुहोस्

1. Microsoft Foundry Toolkit एक्सटेन्शनबाट **Agent Builder सुरू गर्नुहोस्**
2. तलको कन्फिगरेसनसहित **नयाँ एजेन्ट सिर्जना गर्नुहोस्:**
   ```
   Agent Name: GitHubAgent
   ```

3. **कस्टम MCP सर्भर आरम्भ गर्नुहोस्:**
   - **Tools** → **Add Tool** → **MCP Server** जानुहोस्
   - **"Create A new MCP Server"** चयन गर्नुहोस्
   - अधिकतम लचिलोपनको लागि **Python टेम्प्लेट** छान्नुहोस्
   - **सर्भर नाम:** `git_mcp_server`

### चरण २: GitHub Copilot Agent Mode कन्फिगरेसन गर्नुहोस्

1. VS Code मा **GitHub Copilot खोल्नुहोस्** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot इन्टरफेसमा **Agent Model चयन गर्नुहोस्**
3. सुधारिएको तर्क क्षमताका लागि **Claude 3.7 मोडेल छान्नुहोस्**
4. उपकरण पहुँचका लागि **MCP एकीकरण सक्षम पार्नुहोस्**

> **💡 व्यावहारिक सुझाव:** Claude 3.7 ले विकास कार्यप्रवाह र त्रुटि ह्यान्डलिङ ढाँचाहरूको उत्कृष्ट समझ प्रदान गर्दछ।

### चरण ३: मुख्य MCP सर्भर कार्यक्षमता कार्यान्वयन गर्नुहोस्

**GitHub Copilot Agent Mode संग तलको विस्तृत प्राम्प्ट प्रयोग गर्नुहोस्:**

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

### चरण ४: तपाईंको MCP सर्भर परीक्षण गर्नुहोस्

#### ४a. Agent Builder मा परीक्षण

1. Agent Builder को डिबग कन्फिगरेसन सुरू गर्नुहोस्
2. तपाईंको एजेन्टलाई यस सिस्टम प्राम्प्टसंग कन्फिगर गर्नुहोस्:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. यथार्थपरक प्रयोगकर्ता परिदृश्यहरूसँग परीक्षण गर्नुहोस्:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ne/DebugAgent.81d152370c503241.webp)

**अपेक्षित नतिजाहरू:**
- ✅ मार्ग पुष्टिसहित सफल क्लोनिङ
- ✅ स्वत: VS Code सुरूवात
- ✅ अमान्य अवस्थामा स्पष्ट त्रुटि सन्देशहरू
- ✅ अति स‌रह ह्याण्डलिङ

#### ४b. MCP Inspector मा परीक्षण


![MCP Inspector Testing](../../../../translated_images/ne/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 बधाई छ!** तपाईंले व्यवहारिक, उत्पादन-तयार MCP सर्भर सफलतापूर्वक सिर्जना गर्नुभयो जुन वास्तविक विकास कार्यप्रवाह चुनौतीहरू समाधान गर्छ। तपाईंको कस्टम GitHub क्लोन सर्भरले विकासकर्ता उत्पादकत्वलाई स्वचालित र सशक्त बनाउने MCP को शक्ति देखाउँछ।

### 🏆 उपलब्धि प्राप्त भयो:
- ✅ **MCP Developer** - कस्टम MCP सर्भर सिर्जना गरे
- ✅ **Workflow Automator** - विकास प्रक्रियाहरू सरल बनाए  
- ✅ **Integration Expert** - धेरै विकास उपकरणहरूलाई जडान गर्यो
- ✅ **Production Ready** - परिनियोजनयोग्य समाधान निर्माण गर्यो

---

## 🎓 कार्यशाला समाप्ति: Model Context Protocol सँग तपाईंको यात्रा

**प्रिय कार्यशाला सहभागी,**

Model Context Protocol कार्यशालाका सबै चार मोड्युलहरू पूरा गर्न तपाईंलाई बधाई! आधारभूत Microsoft Foundry Toolkit अवधारणाहरू बुझ्नबाट लिएर वास्तविक विकास चुनौतीहरू समाधान गर्ने उत्पादन-तयार MCP सर्भरहरू निर्माण गर्ने यात्रामा तपाईंले लामो बाटो तय गर्नुभएको छ।

### 🚀 तपाईंको सिकाइ पथको पुनरावलोकन:

**[मोड्युल १](../lab1/README.md)**: Microsoft Foundry Toolkit का आधारभूत कुरा, मोडेल परीक्षण, र पहिलो AI एजेन्ट सिर्जना गर्न सुरु गर्नुभयो।

**[मोड्युल २](../lab2/README.md)**: MCP वास्तुकला सिक्नुभयो, Playwright MCP एकीकृत गर्नुभयो, र पहिलो ब्राउजर अटोमेसन एजेन्ट बनाउनु भयो।

**[मोड्युल ३](../lab3/README.md)**: Weather MCP सर्भरसँग कस्टम MCP सर्भर विकासमा प्रगति गर्नुभयो र डिबग उपकरणहरूमा माहिर हुनुभयो।

**[मोड्युल ४](../lab4/README.md)**: अब तपाईंले सबै कुरा लगाएर व्यवहारिक GitHub रिपोजिटरी कार्यप्रवाह स्वचालन उपकरण सिर्जना गर्नुभएको छ।

### 🌟 तपाईंले केमा दक्षता हासिल गर्नुभयो:

- ✅ **Microsoft Foundry Toolkit पारिस्थितिकी तन्त्र**: मोडेलहरू, एजेन्टहरू, र एकीकरण ढाँचाहरू
- ✅ **MCP वास्तुकला**: क्लाइन्ट-सर्भर डिजाइन, ट्रान्सपोर्ट प्रोटोकल, र सुरक्षा
- ✅ **विकासकर्ता उपकरणहरू**: Playground देखि Inspector सम्म र उत्पादन परिनियोजन
- ✅ **कस्टम विकास**: आफ्नै MCP सर्भरहरू निर्माण, परीक्षण, र परिनियोजन
- ✅ **व्यावहारिक प्रयोगहरू**: AI सँग वास्तविक कार्यप्रवाह चुनौतीहरूको समाधान

### 🔮 तपाईंका आगामी कदमहरू:

१. **आफ्नो MCP सर्भर बनाउनुहोस्**: यी सीपहरूलाई तपाईंको अनौठो कार्यप्रवाहहरू स्वचालित बनाउन लागू गर्नुहोस्  
२. **MCP समुदायमा सामेल हुनुहोस्**: आफ्नो सिर्जना साझा गर्नुहोस् र अरूबाट सिक्नुहोस्  
३. **उन्नत एकीकरण अन्वेषण गर्नुहोस्**: MCP सर्भरहरूलाई एंटरप्राइज प्रणालीसँग जडान गर्नुहोस्  
४. **ओपन सोर्समा योगदान गर्नुहोस्**: MCP उपकरणहरू र कागजात सुधार्न मद्दत गर्नुहोस्

पछिल्लो कुरा सम्झनुहोस्, यो कार्यशाला केवल सुरुवात हो। Model Context Protocol पारिस्थितिकी तन्त्र छिटो विकसित हुँदैछ र अब तपाईं AI-सञ्चालित विकास उपकरणहरूको अग्रभागमा हुनुहुन्छ।

**सहभागिताको लागि र सिकाइमा समर्पणका लागि धन्यवाद!**

हामीलाई आशा छ यस कार्यशालाले तपाईंलाई विकास यात्रामा AI उपकरणहरूसँग कसरी बनाउने र अन्तरक्रिया गर्ने भन्ने तरिकामा परिवर्तन ल्याउने विचारहरू उत्पन्न गराएको छ।

**शुभकामना!**

---

## अब के

मोड्युल १० का सबै ल्याबहरू पूरा गर्नुभएकोमा बधाई!

- फर्कनुहोस्: [मोड्युल १० अवलोकन](../README.md)
- जारी राख्नुहोस्: [मोड्युल ११: MCP सर्भर Hands-On ल्याबहरू](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->