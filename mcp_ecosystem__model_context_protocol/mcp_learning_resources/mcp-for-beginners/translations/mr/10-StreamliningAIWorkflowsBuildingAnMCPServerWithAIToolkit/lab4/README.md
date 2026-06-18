# 🐙 मॉड्यूल 4: व्यावहारिक MCP विकास - सानुकूल GitHub क्लोन सर्व्हर

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ जलद प्रारंभ:** फक्त ३० मिनिटांत GitHub रिपॉझिटरी क्लोनिंग आणि VS Code इंटिग्रेशन स्वयंचलित करणारा उत्पादनासाठी तयार MCP सर्व्हर तयार करा!

## 🎯 शिक्षण उद्दिष्टे

या लॅबच्या शेवटी, आपण हे करू शकाल:

- ✅ प्रत्यक्ष विकास कार्यप्रवाहासाठी सानुकूल MCP सर्व्हर तयार करा
- ✅ MCP द्वारे GitHub रिपॉझिटरी क्लोनिंग फंक्शनलिटी लागू करा
- ✅ सानुकूल MCP सर्व्हर VS Code आणि Agent Builder सह समाकलित करा
- ✅ GitHub Copilot Agent Mode सानुकूल MCP साधनांसह वापरा
- ✅ उत्पादन वातावरणात सानुकूल MCP सर्व्हर चाचणी व तैनात करा

## 📋 पूर्वशर्ती

- लॅब 1-3 पूर्ण करणे (MCP मूलभूत गोष्टी आणि प्रगत विकास)
- GitHub Copilot सदस्यत्व ([फ्री साइनअप उपलब्ध](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit आणि GitHub Copilot विस्तारांसह VS Code
- Git CLI इन्स्टॉल आणि कॉन्फिगर केलेले

## 🏗️ प्रकल्प विहंगावलोकन

### **प्रत्यक्ष विकास आव्हान**
विकसक म्हणून, आपण वारंवार GitHub वरून रिपॉझिटरी क्लोन करून VS Code किंवा VS Code Insiders मध्ये उघडतो. ही हाताने केलेली प्रक्रिया:
1. टर्मिनल/कमांड प्रॉम्प्ट उघडणे
2. इच्छित फोल्डरमध्ये जाणे
3. `git clone` कमांड चालवणे
4. क्लोन केलेल्या फोल्डरमध्ये VS Code उघडणे

**आमचे MCP समाधान हे सगळे एका हुशार कमांडमध्ये सोपं करतो!**

### **आपण जे तयार कराल**
एक **GitHub Clone MCP Server** (`git_mcp_server`) जो खालील सेवा देतो:

| वैशिष्ट्य | वर्णन | फायदा |
|---------|-------------|---------|
| 🔄 **स्मार्ट रिपॉझिटरी क्लोनिंग** | GitHub रिपॉझिटरी स्वयंचलित आणि प्रमाणित क्लोनिंग | त्रुटी तपासणी स्वयंचलित |
| 📁 **बुद्धिमान फोल्डर व्यवस्थापन** | फोल्डर अस्तित्व तपासा आणि सुरक्षितपणे तयार करा | आधीच्या डेटाचा अधिलेखित होण्यापासून संरक्षण |
| 🚀 **क्रॉस-प्लॅटफॉर्म VS Code इंटिग्रेशन** | प्रोजेक्ट VS Code/Insiders मध्ये उघडा | कार्यप्रवाह सुलभ बदल |
| 🛡️ **मजबूत त्रुटी हाताळणी** | नेटवर्क, परवानगी आणि पथ समस्या हाताळा | उत्पादनासाठी तयार विश्वासार्हता |

---

## 📖 टप्प्याटप्प्याने अंमलबजावणी

### टप्पा 1: Agent Builder मध्ये GitHub एजंट तयार करा

1. Microsoft Foundry Toolkit विस्तारातून **Agent Builder** सुरू करा
2. खालील कॉन्फिगरेशनसह **नवीन एजंट तयार करा:**
   ```
   Agent Name: GitHubAgent
   ```

3. **सानुकूल MCP सर्व्हर सुरू करा:**
   - **Tools** → **Add Tool** → **MCP Server** येथे जा
   - **"Create A new MCP Server"** निवडा
   - जास्तीत जास्त लवचिकतेसाठी **Python template** निवडा
   - **सर्व्हर नाव:** `git_mcp_server`

### टप्पा 2: GitHub Copilot Agent Mode सेटअप करा

1. VS Code मध्ये **GitHub Copilot** उघडा (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot इंटरफेसमध्ये **Agent Model निवडा**
3. उच्चृत विचारशक्तीसाठी **Claude 3.7 मॉडेल निवडा**
4. टूल प्रवेशासाठी **MCP इंटिग्रेशन सक्षम करा**

> **💡 व्यावसायिक टीप:** Claude 3.7 विकास कार्यप्रवाह आणि त्रुटी हाताळणी पद्धतींचे उत्तम समज देते.

### टप्पा 3: मुख्य MCP सर्व्हर फंक्शनलिटी अंमलात आणा

**GitHub Copilot Agent Mode सोबत खालील तपशीलवार प्रॉम्प्ट वापरा:**

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

### टप्पा 4: आपला MCP सर्व्हर तपासा

#### 4a. Agent Builder मध्ये तपासणी

1. Agent Builder साठी डिबग कॉन्फिगरेशन सुरू करा
2. आपल्या एजंटसाठी या सिस्टम प्रॉम्प्टची विनंती करा:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. वास्तविक वापरकर्ता परिस्थितींसह तपासा:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/mr/DebugAgent.81d152370c503241.webp)

**अपेक्षित परिणाम:**
- ✅ पथ पुष्टीकरणासह यशस्वी क्लोनिंग
- ✅ VS Code आपोआप सुरू होणे
- ✅ अवैध परिस्थितींसाठी स्पष्ट त्रुटी संदेश
- ✅ सीमांत प्रकरणांची योग्य हाताळणी

#### 4b. MCP Inspector मध्ये तपासणी


![MCP Inspector Testing](../../../../translated_images/mr/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 अभिनंदन!** आपण प्रभावी, उत्पादनासाठी तयार MCP सर्व्हर यशस्वीपणे तयार केला आहे जो प्रत्यक्ष विकास कार्यप्रवाहातील आव्हाने सोडवतो. आपला सानुकूल GitHub क्लोन सर्व्हर MCP च्या शक्तीचा वापर करून विकासकांची उत्पादकता वाढवतो.

### 🏆 मिळवलेले यश:
- ✅ **MCP डेव्हलपर** - सानुकूल MCP सर्व्हर तयार केले
- ✅ **Workflow Automator** - विकास प्रक्रिया सुलभ केली  
- ✅ **संमतीत तज्ज्ञ** - विविध विकास साधने जोडली
- ✅ **उत्पादनासाठी तयार** - तैनातीस योग्य उपाय तयार केले

---

## 🎓 कार्यशाळा पूर्ण: Model Context Protocol सोबत तुमचा प्रवास

**प्रिय कार्यशाळा सहभागि,**

Model Context Protocol कार्यशाळेचे सर्व चार मॉड्यूल पूर्ण केल्याबद्दल अभिनंदन! आपण Microsoft Foundry Toolkit मूलभूत समजापासून उत्पादनासाठी तयार MCP सर्व्हर तयार करण्यापर्यंत मोठा प्रवास केला आहे जे प्रत्यक्ष विकास आव्हाने सोडवतात.

### 🚀 आपल्या शिक्षणाचा आढावा:

**[मॉड्यूल 1](../lab1/README.md)**: आपण Microsoft Foundry Toolkit मूलभूत गोष्टी, मॉडेल चाचणी, आणि आपला पहिला AI एजंट तयार केला.

**[मॉड्यूल 2](../lab2/README.md)**: MCP आर्किटेक्चर शिकले, Playwright MCP समाकलित केले, आणि आपला पहिला ब्राउझर ऑटोमेशन एजंट तयार केला.

**[मॉड्यूल 3](../lab3/README.md)**: Weather MCP सर्व्हर सह सानुकूल MCP सर्व्हर विकास केला आणि डीबगिंग साधने पारंगत केली.

**[मॉड्यूल 4](../lab4/README.md)**: आता आपण सर्व काही वापरून व्यावहारिक GitHub रिपॉझिटरी वर्कफ्लो ऑटोमेशन साधन तयार केले आहे.

### 🌟 आपण काय पारंगत आहात:

- ✅ **Microsoft Foundry Toolkit इकोसिस्टम**: मॉडेल्स, एजंट्स, आणि समाकलन नमुने
- ✅ **MCP आर्किटेक्चर**: क्लायंट-सर्व्हर डिझाइन, ट्रान्सपोर्ट प्रोटोकॉल, आणि सुरक्षितता
- ✅ **डेव्हलपर टूल्स**: प्लेग्राउंड ते इंस्पेक्टर ते उत्पादन तैनातीपर्यंत
- ✅ **सानुकूल विकास**: स्वतःचे MCP सर्व्हर तयार करणे, तपासणी आणि तैनात करणे
- ✅ **प्रत्यक्ष अनुप्रयोग**: AI वापरून प्रत्यक्ष वर्कफ्लो आव्हाने सोडवणे

### 🔮 पुढील पावले:

1. **आपला स्वतःचा MCP सर्व्हर तयार करा**: युनिक वर्कफ्लो स्वयंचलीत करण्यासाठी या कौशल्यांचा वापर करा
2. **MCP समुदायात सहभागी व्हा**: आपल्या उत्पादनांची देवाणघेवाण करा आणि इतरांकडून शिका
3. **प्रगत समाकलन शोधा**: MCP सर्व्हर्सना एंटरप्राइझ सिस्टमशी जोडा
4. **ओपन सोर्स मध्ये योगदान द्या**: MCP टूलिंग आणि दस्तऐवजीकरण सुधारण्यास मदत करा

हे कार्यशाळा फक्त सुरुवात आहे हे लक्षात ठेवा. Model Context Protocol इकोसिस्टम प्रगत होत आहे आणि आता आपण AI-संचालित विकास साधनांच्या अग्रभागी आहात.

**आपल्या सहभागासाठी आणि शिकण्याच्या समर्पणासाठी धन्यवाद!**

आशा आहे की या कार्यशाळेने आपण जे तयार करता आणि AI साधनांसोबत कसे संवाद साधता याबाबत नवीन कल्पना दिल्या आहेत.

**आनंदी कोडिंग!**

---

## पुढे काय

मॉड्यूल 10 मधील सर्व लॅब पूर्ण केल्याबद्दल अभिनंदन!

- मागे जा: [मॉड्यूल 10 विहंगावलोकन](../README.md)
- पुढे सुरु ठेवा: [मॉड्यूल 11: MCP सर्व्हर हँड्स-ऑन लॅब्स](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->