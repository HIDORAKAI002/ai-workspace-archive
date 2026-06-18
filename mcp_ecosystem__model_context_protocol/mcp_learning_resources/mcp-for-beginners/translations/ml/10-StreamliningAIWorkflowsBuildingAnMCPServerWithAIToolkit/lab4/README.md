# 🐙 Module 4: യഥാർത്ഥ MCP വികസനം - കസ്റ്റം GitHub ക്ലോൺ സർവർ

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ വേഗത്തിലുള്ള ആരംഭം:** GitHub റിപ്പോസിറ്ററി ക്ലോണിംഗും VS Code ഇന്റഗ്രേഷനും ഓട്ടോമേറ്റ് ചെയ്യുന്ന ഒരു പ്രൊഡക്ഷൻ റെഡിയായ MCP സർവർ നിർമിക്കാം ആറും 30 മിനിറ്റിൽ!

## 🎯 പഠന ലക്ഷ്യങ്ങൾ

ഈ ലാബ് അവസാനിക്കുന്നത് വരെ, നിങ്ങൾക്ക് കഴിയും:

- ✅ യഥാർത്ഥ വികസന പ്രവാഹങ്ങൾക്ക് വേണ്ടിയുള്ള കസ്റ്റം MCP സർവർ സൃഷ്ടിക്കുക  
- ✅ MCP വഴി GitHub റിപ്പോസിറ്ററി ക്ലോൺ പ്രവർത്തനക്ഷമമാക്കുക  
- ✅ കസ്റ്റം MCP സർവർ പങ്കുവെച്ചു VS Code, Agent Builder എന്നിവ ഒപ്പം ജോലിചെയ്യിക്കുക  
- ✅ GitHub Copilot Agent Mode കസ്റ്റം MCP ടൂളുകളുമായി ഉപയോഗിക്കുക  
- ✅ പ്രൊഡക്ഷൻ പരിസരങ്ങളിൽ കസ്റ്റം MCP സർവർ പരീക്ഷിച്ച് വിന്യസിക്കുക  

## 📋 മുൻ‌അവശ്യങ്ങൾ

- ലാബുകൾ 1-3 പൂർത്തിയാക്കിയിരിക്കണം (MCP അടിസ്ഥാനങ്ങളും ആഡ്വാൻസ്ഡ് ഡെവലപ്പ്മെന്റും)  
- GitHub Copilot സബ്സ്ക്രിപ്ഷൻ ([ഉചിതമായ സൗജന്യ സൈൻ അപ്പും ലഭ്യമാണ്](https://github.com/github-copilot/signup))  
- Microsoft Foundry Toolkit, GitHub Copilot എക്സ്റ്റൻഷനുകളുളള VS Code  
- Git CLI ഇൻസ്റ്റാൾ ചെയ്ത് കോൺഫിഗർ ചെയ്തിട്ടുണ്ടാകണം  

## 🏗️ പ്രോജക്ട് അവലോകനം

### **യഥാർത്ഥ വികസന വെല്ലുവിളി**  
ഡെവലപ്പർമാരായി, GitHub പ്രാവശ്യമായി ഉപയോഗിച്ച് റിപ്പോസിറ്ററികൾ ക്ലോൺ ചെയ്ത് VS Code അല്ലെങ്കിൽ VS Code Insiders ൽ തുറക്കാറുണ്ട്. ഈ മാനുവൽ പ്രക്രിയയിലുണ്ടാകുന്നത്:  
1. ടെർമിനൽ/കമാൻഡ് പ്രോമ്പ്റ്റ് തുറക്കുക  
2. ആവശ്യമായ ഡയറക്ടറിയിലേക്ക് പോകുക  
3. `git clone` കമാൻഡ് റൺ ചെയ്യുക  
4. ക്ലോൺ ചെയ്ത ഡയറക്ടറിയിൽ VS Code തുറക്കുക  

**നമ്മുടെ MCP പരിഹാരം ഇതിനെ ഒറ്റ ബുദ്ധിമുട്ടുള്ള കമാൻഡാക്കി മാറ്റുന്നു!**

### **നീங்கள் നിർമ്മിക്കാനുള്ളത്**  
**GitHub Clone MCP Server** (`git_mcp_server`) നൽകുന്നത്:

| സവിശേഷത | വിവരണം | പ്രയോജനം |
|---------|-------------|---------|
| 🔄 **സ്മാർട്ട് റിപ്പോസിറ്ററി ക്ലോൺ** | GitHub റിപ്പോസിറ്ററികൾ നിരവധി പരിശോധനകളോടെ ക്ലോൺ ചെയ്യുക | സ്വയംപ്പെട്ട പിഴവ് പരിശോധന |
| 📁 **ബുദ്ധിമുട്ടില്ലാത്ത ഡയറക്ടറി നിയന്ത്രണം** | ഡയറക്ടറികൾ സുരക്ഷിതമായി പരിശോധിച്ച് സൃഷ്ടിക്കുക | മറച്ച് എഴുതുന്നത് തടയുക |
| 🚀 **ക്രോസ് പ്ലാറ്റ്ഫോം VS Code ഇന്റഗ്രേഷൻ** | പ്രോജക്ടുകൾ VS Code/Insiders ൽ തുറക്കുക | പ്രക്രിയയിലൊരു തടസം കൂടാതെ മാറുക |
| 🛡️ **വിശ്വാസയോഗ്യമായ പിഴവ് കൈകാര്യം** | നെറ്റ്വർക്ക്, അനുമതി, പാതാസംബന്ധിയായ പ്രശ്‌നങ്ങൾ കൈകാര്യം ചെയ്യുക | പ്രൊഡക്ഷൻ റെഡിയായ വിശ്വാസ്യത |

---

## 📖 ഘട്ടം ഘട്ടമായ നടപ്പിലാക്കൽ

### ഘട്ടം 1: Agent Builder ൽ GitHub ഏജന്റ് സൃഷ്ടിക്കുക

1. **Microsoft Foundry Toolkit എക്സ്റ്റൻഷൻ വഴി Agent Builder തുറക്കുക**  
2. **പുതിയ ഏജന്റ് സൃഷ്ടിക്കുക, താഴെയുള്ള കോൺഫിഗറേഷൻ കാണിക്കുക:**  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **കസ്റ്റം MCP സർവർ ആരംഭിക്കുക:**  
   - **Tools** → **Add Tool** → **MCP Server** എന്ന വഴിയേ പോവുക  
   - **"Create A new MCP Server"** തിരഞ്ഞെടുക്കുക  
   - ഏറ്റവും അധിക സ്വാതന്ത്ര്യമുള്ള Python ടെംപ്ലേറ്റ് തിരഞ്ഞെടുക്കുക  
   - **സർവർ നാമം:** `git_mcp_server`  

### ഘട്ടം 2: GitHub Copilot Agent Mode കോൺഫിഗർ ചെയ്യുക

1. **VS Code ൽ GitHub Copilot തുറക്കുക** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")  
2. Copilot ഇന്റർഫേസിൽ **Agent Model** തിരഞ്ഞെടുക്കുക  
3. കാര്യക്ഷമമായ മനസ്സിലാക്കലിനായി **Claude 3.7 മോഡൽ** തിരഞ്ഞെടുക്കുക  
4. ടൂൾ ആക്സസ് ലഭ്യമാക്കാൻ **MCP ഇന്റഗ്രേഷൻ എനേബിൾ ചെയ്യുക**  

> **💡 പ്രോ ടിപ്പ്:** Claude 3.7 വികസന പ്രവാഹങ്ങളും പിഴവുദിനസാഗരങ്ങളും മെച്ചപ്പെട്ട ഗ്രഹണം നൽകുന്നു.  

### ഘട്ടം 3: MCP സർവർ പ്രാഥമിക ഫംഗ്ഷനാലിറ്റി നടപ്പിലാക്കുക

**GitHub Copilot Agent Mode ഉപയോഗിച്ച് താഴത്തെ പൂർണാദ്ധ്യംപ്രകടം ഉപയോഗിക്കുക:**  

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
  
### ഘട്ടം 4: MCP സർവർ ടെസ്റ്റുചെയ്യുക

#### 4a. Agent Builder ൽ ടെസ്റ്റ്

1. Agent Builder ൽ ഡിബഗ് കോൺഫിഗറേഷൻ ആരംഭിക്കുക  
2. ഏജന്റിനായി ഈ സിസ്റ്റം പ്രോംപ്റ്റ് കോൺഫിഗർ ചെയ്യുക:  

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. യാഥാർത്ഥ്യത്തോട് ചേർന്ന ഉപയോക്തൃ സാഹചര്യം ഉപയോഗിച്ച് പരീക്ഷിക്കുക:  

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/ml/DebugAgent.81d152370c503241.webp)

**പ്രതീക്ഷിച്ച ഫലങ്ങൾ:**  
- ✅ പാത സാധുവെന്ന് ഉറപ്പിച്ചുള്ള വിജയകരമായ ക്ലോൺ  
- ✅ സ്വയം VS Code ആരംഭിക്കുന്നത്  
- ✅ തെറ്റായ സാഹചര്യങ്ങൾക്ക് സുതാര്യമായ പിഴവുവിവരങ്ങൾ  
- ✅ പ്രോത്യേക സാഹചര്യങ്ങൾ ശരിയായി കൈകാര്യം ചെയ്യൽ  

#### 4b. MCP ഇൻസ്പക്ടറിൽ ടെസ്റ്റ്

![MCP Inspector Testing](../../../../translated_images/ml/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 അഭിനന്ദനങ്ങൾ!** യഥാർത്ഥ വികസന പ്രവാഹ വെല്ലുവിളികൾ പരിഹരിക്കുന്ന പ്രോഡക്ഷൻ റെഡിയായ MCP സർവർ നിങ്ങൾ വിജയകരമായി സൃഷ്ടിച്ചു. കസ്റ്റം GitHub ക്ലോൺ MCP സർവർ MCP യുടെ ഉൽപ്പാദനക്ഷമതയും ഡെവലപ്പർ ഉൽപാദനക്ഷമത വർധിപ്പിക്കുന്നതിലെ ശക്തിയും തെളിയിക്കുന്നു.

### 🏆 നേടിയത്:  
- ✅ **MCP ഡെവലപ്പർ** - കസ്റ്റം MCP സർവർ സൃഷ്ടിച്ചു  
- ✅ **പ്രവാഹ ഓട്ടോമേറ്റർ** - വികസന പ്രക്രിയകളെ സുഗമമാക്കി  
- ✅ **ഇന്റഗ്രേഷൻ വിദഗ്ധൻ** - വിവിധ ഡെവലപ്പ്മെന്റ് ടൂളുകൾ കണക്ട് ചെയ്തു  
- ✅ **പ്രൊഡക്ഷൻ റെഡി** - വിന്യസിക്കാവുന്ന പരിഹാരങ്ങൾ നിർമ്മിച്ചു  

---

## 🎓 വർക്‌ഷോപ്പ് പൂർ‍ത്തിയാക്കി: Model Context Protocol യാത്ര

**പ്രിയ വർക്‌ഷോപ്പ് പങ്കാളി,**

Model Context Protocol വർക്‌ഷോപ്പ് നാൽപ്പത് എല്ലാ മോഡ്യൂളുകളും പൂർത്തിയാക്കിയതിൽ നിങ്ങളുടെ അഭിനന്ദനങ്ങൾ! Microsoft Foundry Toolkit അടിസ്ഥാനങ്ങൾ മനസ്സിലാക്കുന്നതിൽ നിന്നു യഥാർത്ഥ പ്രൊഡക്ഷൻ റെഡിയായ MCP സർവറുകൾ നിർമ്മിച്ച് യാഥാർത്ഥ വികസന വെല്ലുവിളികൾ പരിഹരിക്കുന്നതിലേക്ക് നീങ്ങിയാണ് നിങ്ങൾ എത്തിയത്.

### 🚀 നിങ്ങളുടെ പഠന പാത സംഗ്രഹം:  

**[Module 1](../lab1/README.md)**: Microsoft Foundry Toolkit അടിസ്ഥാനങ്ങൾ, മോഡൽ പരിശോധന, ആദ്യ AI ഏജന്റ് സൃഷ്ടിക്കൽ തുടങ്ങിയവ പഠിച്ചു.  

**[Module 2](../lab2/README.md)**: MCP സാങ്കേതിക സമീപനം, Playwright MCP ഇന്റഗ്രേഷൻ, ആദ്യ ബ്രൗസർ ഓട്ടോമേഷൻ ഏജന്റ് നിർമ്മിച്ചു.  

**[Module 3](../lab3/README.md)**: Weather MCP സർവർ ഉപയോഗിച്ച് കസ്റ്റം MCP സർവർ വികസനം, ഡീബഗ്ഗിംഗ് ടൂളുകൾ നിക്ഷിപ്തമായി പഠിച്ചു.  

**[Module 4](../lab4/README.md)**: GitHub റിപ്പോസിറ്ററി പ്രവർത്തന ഓട്ടോമേഷൻ ടൂൾ പ്രായോഗികമായി സൃഷ്ടിച്ചു.  

### 🌟 നിങ്ങൾ കൈവരിച്ചതും:  

- ✅ **Microsoft Foundry Toolkit പരിസരം**: മോഡലുകൾ, ഏജന്റുകൾ, ഇന്റഗ്രേഷൻ മാതൃകകള്‍  
- ✅ **MCP സാങ്കേതിക ഗാഢത്വം**: ക്ലയന്റ്-സർവർ ഡിസൈൻ, ട്രാൻസ്പോർട്ട് പ്രോട്ടോകോൾ, സുരക്ഷ  
- ✅ **ഡെവലപ്പർ ടൂളുകൾ**: പ്ലേഗ്രൗണ്ട്, ഇൻസ്പക്ടർ, പ്രൊഡക്ഷൻ വിന്യാസം  
- ✅ **കസ്റ്റം ഡെവലപ്പ്മെന്റ്**: MCP സർവറുകൾ നിർമ്മിക്കുക, പരീക്ഷിക്കുക, വിന്യസിക്കുക  
- ✅ **പ്രായോഗിക ഉപയോഗങ്ങൾ**: യഥാർത്ഥ പ്രവാഹ വെല്ലുവിളികൾ AI വഴി പരിഹരിക്കൽ  

### 🔮 അടുത്ത ചുവടുകൾ:  

1. **താന്റെ MCP സർവർ നിർമ്മിക്കുക**: നിങ്ങളുടെ പ്രൈവറ്റ് പ്രവാഹങ്ങൾ സ്വയമാറ്റം ചെയ്യാൻ ആർക്കിടെക്ചർ ഉപയോഗിക്കുക  
2. **MCP കമ്മ്യൂണിറ്റിയിൽ ചേരുക**: നിങ്ങളുടെ സൃഷ്ടികൾ പങ്കുവെക്കുകയും മറ്റുള്ളവരിൽ നിന്നും പഠിക്കുകയും ചെയ്യുക  
3. **ഉയർന്ന ഇന്റഗ്രേഷൻ തേടുക**: MCP സർവറുകളിൽ എന്റർപ്രൈസ് സിസ്റ്റങ്ങളുമായി ബന്ധിപ്പിക്കുക  
4. **ഓപ്പൺ സോഴ്‌സ് കൈമാറുക**: MCP ടൂളുകൾ മെച്ചപ്പെടുത്താനും ഡോക്കുമെന്റേഷൻ സഹായിക്കാനും സഹകരിക്കുക  

നിങ്ങൾക്ക് സാങ്കേതിക വിദ്യയുടെ മുന്നണിയിൽ നിൽക്കാൻ ഇനി തയ്യാറാണ്. Model Context Protocol സമ്പ്രദായം ദ്രുതഗതിയിലായി വികസ്വരത്തിലാണ്, വിഭിന്ന AI-ചാലിത വികസന ടൂളുകളുടെ മുന്നേറ്റത്തിൽ നിങ്ങൾ ഇന്ന് തന്നെ എത്തിച്ചേർന്നിരിക്കുന്നു.

**പങ്കാളിത്തത്തിനും പഠനത്തിന് നന്ദി!**

ഈ വർക്‌ഷോപ്പ് AI ടൂളുകളുമായി നിങ്ങളുടെ ഡെവലപ്പ്മെന്റ് യാത്രയെ മാറ്റാൻ സഹായിക്കുന്ന ആശയങ്ങളെ ഉന്നയിച്ചിരിക്കുമെന്ന് ഞങ്ങൾ പ്രതീക്ഷിക്കുന്നു.

**സന്തോഷകരമായ കോഡിങ്!**

---

## അടുത്തത്

Module 10 ലെ എല്ലാ ലാബുകളും പൂർത്തിയാക്കിയതിനായി അഭിനന്ദനങ്ങൾ!

- തിരിച്ചു പോകാൻ: [Module 10 Overview](../README.md)  
- തുടരാൻ: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->