# 🐙 Module 4: ಪ್ರಾಯೋಗಿಕ MCP ಅಭಿವೃದ್ಧಿ - ಕಸ್ಟಮ್ GitHub ಕ್ಲೋನ್‌ ಸರ್ವರ್

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ ವೇಗದ ಪ್ರಾರಂಭ:** ಕೇವಲ 30 ನಿಮಿಷಗಳಲ್ಲಿ GitHub ರೆಪೊಸಿಟರಿ ಕ್ಲೋನಿಂಗ್ ಮತ್ತು VS ಕೋಡ್ інтಿಗ್ರೇಶನ್ ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಉತ್ಪಾದನಾ ಸಿದ್ಧ MCP ಸರ್ವರ್ ಅನ್ನು ನಿರ್ಮಿಸಿ!

## 🎯 ಕಲಿಕೆ ಉದ್ದೇಶಗಳು

ಈ ಲ್ಯಾಬ್ ಮುಕ್ತಾಯಕ್ಕೆ ನೀವು ಮಾಡಬಲ್ಲಿರಿ:

- ✅ ವಾಸ್ತವ ಜಗತ್ತಿನ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹಗಳಿಗೆ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್ ರಚಿಸುವುದು
- ✅ MCP ಮೂಲಕ GitHub ರೆಪೊಸಿಟರಿ ಕ್ಲೋನಿಂಗ್ ಕಾರ್ಯವನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸುವುದು
- ✅ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು VS ಕೋಡ್ ಮತ್ತು ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಜೊತೆಗೆ ಇಂಟಿಗ್ರೇಟ್ ಮಾಡುವುದು
- ✅ ಕಸ್ಟಮ್ MCP ಸಾಧನಗಳೊಂದಿಗೆ GitHub Copilot Agent Mode ಬಳಸುವುದು
- ✅ ಉತ್ಪಾದನಾ ಪರಿಸರಗಳಲ್ಲಿ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ನಿಯೋಜಿಸುವುದು

## 📋 ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು

- ಲ್ಯಾಬ್‌ಗಳು 1-3 (MCP ಮೂಲಭೂತ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಉನ್ನತ) ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ
- GitHub Copilot ಚಂದಾದಾರಿಕೆ ([ಉಚಿತ ಸಹಿ ಲಭ್ಯವಿದೆ](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit ಮತ್ತು GitHub Copilot ವಿಸ್ತರಣೆಗಳಿವೆ ಇರುವ VS ಕೋಡ್
- Git CLI ಸ್ಥಾಪಿತ ಮತ್ತು ಸಂರಚಿತವಾಗಿದೆ

## 🏗️ ಯೋಜನಾ ಅವಲೋಕನ

### **ವಾಸ್ತವ ಜಗತ್ತು ಅಭಿವೃದ್ಧಿ ಸವಾಲು**
ಆತ್ಮೀಯ ಡೆವಲಪರ್‌ಗಳಾಗಿ, ನಾವು ನಿರಂತರವಾಗಿ GitHub ಅನ್ನು ಬಳಸಿಕೊಂಡು ರೆಪೊಸಿಟೊರಿಗಳನ್ನು ಕ್ಲೋನ್ಮಾಡಿ VS ಕೋಡ್ ಅಥವಾ VS ಕೋಡ್ ಇನ್ಸೈಡರ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತೇವೆ. ಈ ಕೈಯಲ್ಲಿ ಮಾಡಬೇಕಾದ ಪ್ರಕ್ರಿಯೆಯು:

1. ಟರ್ಮಿನಲ್/ಕಮಾಂಡ್ ಪ್ರಾಂಪ್ಟ್ ತೆರೆಯುವುದು  
2. ಗಮ್ಯಸ್ಥಳ ಡೈರೆಕ್ಟರಿ ಗೆ ಹೋಗುವುದು  
3. `git clone` ಕಮಾಂಡ್ ಅನ್ನು ನಿರ್ವಹಿಸುವುದು  
4. ಕ್ಲೋನ್ ಮಾಡಿದ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ VS ಕೋಡ್ ತೆರೆಯುವುದು

**ನಮ್ಮ MCP ಪರಿಹಾರವು ಇದನ್ನು ಒಂದಿಲ್ಲೊಂದು ಬುದ್ದಿವಂತ ಕಮಾಂಡ್ ಆಗಿ ಸರಳಗೊಳಿಸುತ್ತದೆ!**

### **ನೀವು ನಿರ್ಮಿಸುವುದು ಏನು**
**GitHub Clone MCP Server** (`git_mcp_server`) ಹೀಗಿದೆ:

| ವೈಶಿಷ್ಟ್ಯ | ವಿವರಣೆ | ಲಾಭ |
|---------|-------------|---------|
| 🔄 **ಸ್ಮಾರ್ಟ್ ರೆಪೊಸಿಟರಿ ಕ್ಲೋನಿಂಗ್** | ಮಾನ್ಯತೆ (ವ್ಯಾಲಿಡೇಶನ್) ಸಹಿತ GitHub ರೆಪೊ ಕ್ಲೋನ್ಮಾಡುವುದು | ಸ್ವಯಂಚಾಲಿತ ದೋಷ ತಪಾಸಣೆ |
| 📁 **ಬುದ್ಧಿವಂತ ಡೈರೆಕ್ಟರಿ ನಿರ್ವಹಣೆ** | ಡೈರೆಕ್ಟರಿಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ರಚಿಸಿ | ಮರುಬರೆಯುವಿಕೆಯನ್ನು ತಡೆಯುತ್ತದೆ |
| 🚀 **ಅನೇಕ ವೇದಿಕೆಗಳ VS ಕೋಡ್ інтಿಗ್ರೇಶನ್** | VS ಕೋಡ್/ಇನ್ಸೈಡರ್ಸ್‌ನಲ್ಲಿ ಯೋಜನೆಗಳನ್ನು ತೆರೆಯುವುದು | ಸುಗಮ ಕಾರ್ಯ ಪ್ರವಾಹದ ಬದಲಾವಣೆ |
| 🛡️ **ದೃಢ ದೋಷ ನಿರ್ವಹಣೆ** | ನೆಟ್‌ವರ್ಕ್, ಅನುಮತಿ ಮತ್ತು ಪಥ ಸಮಸ್ಯೆಗಳನ್ನು ತಡೆಹಿಡಿಯುವುದು | ಉತ್ಪಾದನಾ-ತಯಾರ ಮಾಡಿದ ವಿಶ್ವಾಸಾರ್ಹತೆ |

---

## 📖 ಹಂತ ಹಂತವಾಗಿ ಅನುಷ್ಠಾನ

### ಹಂತ 1: ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ನಲ್ಲಿ GitHub ಏಜೆಂಟ್ ರಚಿಸಿ

1. Microsoft Foundry Toolkit ವಿಸ್ತರಣೆ ಮೂಲಕ **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಅನ್ನು ತೆರೆದು**
2. ಕೆಳಗಿನ ಸಂರಚನೆ ಹೊಂದಿರುವ ಹೊಸ ಏಜೆಂಟ್ ರಚಿಸಿ:  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ನ್ನು ಪ್ರಾರಂಭಿಸಿ:**  
   - **Tools** → **Add Tool** → **MCP Server** ಗೆ ಹೋಗಿ  
   - **"Create A new MCP Server"** ಆಯ್ಕೆಮಾಡಿ  
   - ಹೆಚ್ಚು ಅನುಕೂಲಕ್ಕಾಗಿ **Python ಟೆಂಪ್ಲೇಟು** ಆಯ್ಕೆಮಾಡಿ  
   - **ಸರ್ವರ್ ಹೆಸರು:** `git_mcp_server`

### ಹಂತ 2: GitHub Copilot Agent Mode ಸಂರಚನೆ

1. VS ಕೋಡ್‌ನಲ್ಲಿ GitHub Copilot ತೆರೆಯಿರಿ (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
2. Copilot ಇಂಟರ್ಫೇಸ್ನಲ್ಲಿ ಏಜೆಂಟ್ ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ  
3. ಕೌಶಲಪೂರ್ಣ ನಿರ್ಣಯಿತ ಶಕ್ತಿ ಹೊಂದಿರುವ Claude 3.7 ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ  
4. ಸಾಧನ ಪ್ರವೇಶಕ್ಕಾಗಿ MCP інтಿಗ್ರೇಶನ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ

> **💡 ಪರಿಣತಿಯನ್ನುಗಾಗಿ ಟಿಪ್:** Claude 3.7 ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹಗಳು ಮತ್ತು ದೋಷ ನಿರ್ವಹಣಾ ಮಾದರಿಗಳನ್ನು ಉತ್ತಮವಾಗಿ ಗ್ರಹಿಸುತ್ತದೆ.

### ಹಂತ 3: ಮೂಲ MCP ಸರ್ವರ್ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಿ

**GitHub Copilot Agent Mode ಜೊತೆಗೆ ಕೆಳಗಿನ ವಿವರಾತ್ಮಕ ಪ್ರಾಂಪ್ಟ್ ಬಳಸಿ:**  
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


### ಹಂತ 4: ನಿಮ್ಮ MCP ಸರ್ವರ್ ಅನ್ನು ಪರೀಕ್ಷೆ ಮಾಡಿರಿ

#### 4a. ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ನಲ್ಲಿ ಪರೀಕ್ಷೆ

1. ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಪರಿಕರದ ಬಿಡುಗಡೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ  
2. ಈ ಸಿಸ್ಟಮ್ ಪ್ರಾಂಪ್ಟ್ ಬಳಸಿ ನಿಮ್ಮ ಏಜೆಂಟ್ ಅನ್ನು ಸಂರಚಿಸಿ:  
```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. ವಾಸ್ತವ ಹಾದಿ ಉಪಯೋಗಿಗಳ ದೃಶ್ಯಾಂತಗಳನ್ನು ಬಳಸಿ ಪರೀಕ್ಷಿಸಿ:  
```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/kn/DebugAgent.81d152370c503241.webp)

**ನಿರೀಕ್ಷಿತ ಫಲಿತಾಂಶಗಳು:**  
- ✅ ಪಥ ದೃಢೀಕರಣದೊಂದಿಗೆ ಯಶಸ್ವಿ ಕ್ಲೋನಿಂಗ್  
- ✅ ಸ್ವಯಂಚಾಲಿತ VS ಕೋಡ್ ಪ್ರಾರಂಭ  
- ✅ ಅಮಾನ್ಯ ಸಂದರ್ಭದಲ್ಲಿ ಸ್ಪಷ್ಟ ತಪ್ಪು ಸಂದೇಶಗಳು  
- ✅ ಎಡ್ಜ್ ಕೇಸುಗಳನ್ನು ಸರಿಯಾಗಿ ನಿರ್ವಹಿಸುವುದು

#### 4b. MCP ಇನ್ಸ್ಪೆಕ್ಟರ್‌ನಲ್ಲಿ ಪರೀಕ್ಷೆ

![MCP Inspector Testing](../../../../translated_images/kn/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 ಅಭಿನಂದನೆಗಳು!** ನೀವು ವಾಸ್ತವಿಕ, ಉತ್ಪಾದನಾ ಸಿದ್ಧ MCP ಸರ್ವರ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಿದ್ದೀರಾ, ಇದು ವಾಸ್ತವಿಕ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹ ಸವಾಲುಗಳನ್ನು ಪರಿಹರಿಸುತ್ತದೆ. ನಿಮ್ಮ ಕಸ್ಟಮ್ GitHub ಕ್ಲೋನ್ ಸರ್ವರ್ MCP ಶಕ್ತಿಯನ್ನು ತೋರಿಸುತ್ತದೆ, ಡೆವಲಪರ್ ಉತ್ಪಾದಕತೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುಲು ಮತ್ತು ಸುಧಾರಿಸಲು.

### 🏆 ಸಾಧನೆ ಪಡೆದುಕೊಂಡಿದ್ದೀರಿ:
- ✅ **MCP ಡೆವಲಪರ್** - ಕಸ್ಟಮ್ MCP ಸರ್ವರ್ ರಚಿಸಲಾಗಿದೆ  
- ✅ **ಕರ್ತವ್ಯ ಸ್ವಯಂಿಕ ಮಾರ್ಗದರ್ಶಕ** - ಅಭಿವೃದ್ಧಿ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಸುಗಮಗೊಳಿಸಲಾಗಿದೆ  
- ✅ **ಇಂಟಿಗ್ರೇಶನ್ ತಜ್ಞ** - ಅನೇಕ ಅಭಿವೃದ್ಧಿ ಸಾಧನಗಳನ್ನು ಜೋಡಿಸಲಾಗಿದೆ  
- ✅ **ಉತ್ಪಾದನಾ ಸಿದ್ಧ** - ನಿಯೋಜಿಸಲು ಕನಿಷ್ಠಗೊಂಡ ಪರಿಹಾರಗಳನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ  

---

## 🎓 ಕಾರ್ಯಾಗಾರ ಪೂರ್ಣಗೊಳ್ಳಿಕೆ: ನಿಮ್ಮ Model Context Protocol ಯಾತ್ರೆ

**ಪ್ರಿಯ ಕಾರ್ಯಾಗಾರ ಭಾಗವಹಿಸುವವರು,**

Model Context Protocol ಕಾರ್ಯಾಗಾರದ ಎಲ್ಲಾ ನಾಲ್ಕು Modules ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ ಮೇಲೆ ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಅಭಿನಂದನೆಗಳು! ನೀವು Microsoft Foundry Toolkit ಮೂಲಭೂತ ಕಲಿಕೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ, ಉತ್ಪಾದನಾ ಸಿದ್ಧ MCP ಸರ್ವರ್ಗಳ ನಿರ್ಮಾಣದವರೆಗೆ ಸಾಗಿದ್ದೀರಿ, ಅವು ವಾಸ್ತವಿಕ ಅಭಿವೃದ್ಧಿ ಸವಾಲುಗಳನ್ನು ಪರಿಹರಿಸುತ್ತವೆ.

### 🚀 ನಿಮ್ಮ ಕಲಿಕೆಯ ಹಾದಿಯ ಸಂಕ್ಷೇಪಣೆ:

**[Module 1](../lab1/README.md):** Microsoft Foundry Toolkit ಮೂಲಭೂತಗಳು, ಮಾದರಿ ಪರೀಕ್ಷೆ, ಮತ್ತು ನಿಮ್ಮ ಮೊದಲ AI ಏಜೆಂಟ್ ರಚನೆ 

**[Module 2](../lab2/README.md):** MCP ವಿನ್ಯಾಸ, Playwright MCP інтಿಗ್ರೇಶನ್, ಮತ್ತು ಮೊದಲ ಬ್ರೌಸರ್ ಸ್ವಯಂಚಾಲಿತ ಏಜೆಂಟ್ ನಿರ್ಮಾಣ

**[Module 3](../lab3/README.md):** Weather MCP Server ಮೂಲಕ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಡಿಬಗ್ ಉಪಕರಣಗಳಲ್ಲಿ ಪರಿಣತಿ

**[Module 4](../lab4/README.md):** GitHub ರೆಪೊಜಿಟರಿ ಕಾರ್ಯ ಪ್ರವಾಹ ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಉಪಕರಣ ನಿರ್ಮಾಣ

### 🌟 ನೀವು ಪರಿಣತಿ ಪಡೆದಿರುವ темы:

- ✅ **Microsoft Foundry Toolkit ಪರಿಸರ:** ಮಾದರಿ, ಏಜೆಂಟ್ ಮತ್ತು integrado ಮಾದರಿಗಳು  
- ✅ **MCP ವಿನ್ಯಾಸ:** ಕ್ಲೈಂಟ್-ಸರ್ವರ್ ವಿನ್ಯಾಸ, ಸಾರಣಿಯ ಪ್ರೋಟೋಕಾಲುಗಳು ಮತ್ತು ಭದ್ರತೆ  
- ✅ **ಡೆವಲಪರ್ ಸಾಧನಗಳು:** Playground, Inspector ಮತ್ತು ಉತ್ಪಾದನಾ ನಿಯೋಜನೆ  
- ✅ **ಕಸ್ಟಮ್ ಅಭಿವೃದ್ಧಿ:** MCP ಸರ್ವರ್‌ಗಳ ನಿರ್ಮಾಣ, ಪರೀಕ್ಷೆ ಮತ್ತು ನಿಯೋಜನೆ  
- ✅ **ಪ್ರಾಯೋಗಿಕ ವಿನ್ಯಾಸಗಳು:** AI ಬಳಸಿ ವಾಸ್ತವಿಕ ಕಾರ್ಯ ಪ್ರವಾಹ ಸವಾಲುಗಳ ಪರಿಹಾರ

### 🔮 ಮುಂದಿನ ಹಾದಿಗಳು:

1. **ನಿಮ್ಮದೇ MCP ಸರ್ವರ್ ನಿರ್ಮಿಸಿ:** ನೊಂದಾಯಿತ ಕರೆಯಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವುದಕ್ಕೆ ಈ ಕೌಶಲ್ಯಗಳನ್ನು ಬಳಸಿ  
2. **MCP ಸಮುದಾಯದಲ್ಲಿ ಸೇರುವಿರಿ:** ನಿಮ್ಮ ನಿರ್ಮಾಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಇತರರಿಂದ ಕಲಿಯಿರಿ  
3. **ಉನ್ನತ інтಿಗ್ರೇಶನ್ ಅನ್ವೇಷಿಸಿ:** MCP ಸರ್ವರ್ಗಳ Enterprise ವ್ಯವಸ್ಥೆಗಳಿಗೆ ಸಂವಹನ ಸಾಧನೆ  
4. **ಓಪನ್ ಸೌರ್ಸ್‌ಗೆ ಕೊಡುಗೆ ನೀಡಿರಿ:** MCP ಉಪಕರಣಗಳು ಮತ್ತು ಡಾಕ್ಯುಮೆಂಟೇಷನ್ ಸುಧಾರಣೆಗೆ ಸಹಾಯಮಾಡಿ

ಈ ಕಾರ್ಯಾಗಾರವು ಪ್ರಾರಂಭ ಮಾತ್ರವಾಗಿದೆ ಎಂದು ನೆನಪಿಡಿ. Model Context Protocol ಪರಿಸರ ವೇಗವಾಗಿ ಅಭಿವೃದ್ಧಿಯಾಗುತ್ತಿದೆ ಮತ್ತು ನೀವು AI ನಿಂದ ಚಾಲಿತ ಅಭಿವೃದ್ಧಿ ಸಾಧನಗಳಲ್ಲಿ ಮುಂಚೂಣಿಯಲ್ಲಿರುವಿರಿ.

**ನಿಮ್ಮ ಪಾಲ್ಗೊಳ್ಳುವುದಕ್ಕೆ ಮತ್ತು ಕಲಿಕೆಗೆ ಧನ್ಯವಾದಗಳು!**

ಈ ಕಾರ್ಯಾಗಾರ ನಿಮ್ಮೆಲ್ಲ ಕನಸುಗಳನ್ನು ಪ್ರೇರೇಪಿಸಿ, AI ಸಾಧನಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಅಭಿವೃದ್ಧಿ ಯಾತ್ರೆಯನ್ನು ರೂಪಿಸುವಲ್ಲಿ ಸಹಾಯ ಮಾಡಲಿ ಎಂದು ನಮ್ಮ ಹಾರೈಕೆ.

**ಸಂತೋಷದಿಂದ ಕೋಡ್ ಮಾಡಿರಿ!**

---

## ಮುಂದೇನು

Module 10 ನಲ್ಲಿ ಎಲ್ಲಾ ಲ್ಯಾಬ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ ಅಭಿನಂದನೆಗಳು!

- ಹಿಂದಕ್ಕೆ ಹೋಗಿ: [Module 10 Overview](../README.md)  
- ಮುಂದುವರಿಯಿರಿ: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->