# 🐙 మాడ్యూల్ 4: ప్రాయోగిక MCP అభివృద్ధి - అనుకూల GitHub క్లోన్ సర్వర్

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ త్వరిత ప్రారంభం:** కేవలం 30 నిమిషాల్లో GitHub రిపాజిటరీ క్లోనింగ్ మరియు VS కోడ్ ఇంటిగ్రేషన్‌ను ఆటోమేటు చేసే ప్రొడక్షన్-సిద్ధ MCP సర్వర్ ని నిర్మించండి!

## 🎯 నేర్చుకునే లక్ష్యాలు

ఈ ల్యాబ్ ముగిసే సమయానికి, మీరు చేయగలరు:

- ✅ నిజ జీవిత అభివృద్ధి వర్క్‌ఫ్లోలకు అనుకూల MCP సర్వర్ సృష్టించడం
- ✅ MCP ద్వారా GitHub రిపాజిటరీ క్లోనింగ్ ఫంక్షనాలిటీ అమలు చేయడం
- ✅ కస్టమ్ MCP సర్వర్లను VS కోడ్ మరియు ఏజెంట్ బిల్డర్ తో ఇంటిగ్రేట్ చేయడం
- ✅ GitHub Copilot ఏజెంట్ మోడ్‌ను కస్టమ్ MCP టూల్స్ తో ఉపయోగించడం
- ✅ ఉత్పత్తి వాతావరణాలలో కస్టమ్ MCP సర్వర్లను పరీక్షించడం మరియు డిప్లాయ్ చేయడం

## 📋 ముందు అవసరాలు

- లేబ్స్ 1-3 (MCP మౌలిక కాంపోనెంట్లు మరియు అభివృద్ధి ముఖ్యం) పూర్తి చేసిన వారు
- GitHub Copilot సబ్‌స్క్రిప్షన్ ([ఉచిత సైన్ అప్ అందుబాటులో](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit మరియు GitHub Copilot ఎక్స్‌టెన్షన్లతో VS కోడ్
- Git CLI ఇన్‌స్టాల్ చేసి అమర్చబడినది

## 🏗️ ప్రాజెక్ట్ అవలోకనం

### **వాస్తవ అభివృద్ధి సవాలు**
డెవలపర్స్ గా, GitHub వినియోగించి రిపాజిటరీలను క్లోన్ చేసి VS కోడ్ లేదా VS కోడ్ ఇన్సిడర్స్ లో ఓపెన్ చేయడం మన సాధారణ పని. ఇది మాన్యువల్ ప్రక్రియ:

1. టెర్మినల్/కమాండ్ ప్రాంప్ట్ ఓపెన్ చేయడం  
2. కావలసిన డైరెక్టరీకి వెళ్లడం  
3. `git clone` ఆజ్ఞా నడపడం  
4. క్లోన్ అయిన డైరెక్టరీలో VS కోడ్ ను ఓపెన్ చేయడం

**మన MCP పరిష్కారం దీనిని ఒక్కటీ స్మార్ట్ ఆజ్ఞలో మార్చివేస్తుంది!**

### **మీరు నిర్మించబోయేది**
ఒక **GitHub క్లోన్ MCP సర్వర్** (`git_mcp_server`) క్రింది లక్షణాలతో:

| ఫీచర్ | వివరణ | లాభం |
|---------|-------------|---------|
| 🔄 **స్మార్ట్ రిపాజిటరీ క్లోనింగ్** | GitHub రిపోలను ధృవీకరణతో క్లోన్ చేయడం | ఆటోమేటెడ్_Error చెకింగ్ |
| 📁 **ఇంటిలిజెంట్ డైరెక్టరీ నిర్వహణ** | సురక్షితంగా డైరెక్టరీలను తనిఖీ చేసి సృష్టించడం | ఓవర్ రైటింగ్ నివారణ |
| 🚀 **క్రాస్-ప్లాట్‌ఫారం VS కోడ్ ఇంటిగ్రేషన్** | VS కోడ్/ఇన్సిడర్స్ లో ప్రాజెక్టులు ఓపెన్ చేయడం | స్త్రీమ్లైన్ చేసిన వర్క్‌ఫ్లో ట్రాన్సిషన్ |
| 🛡️ **బలమైన ఎర్రర్ హ్యాండ్లింగ్** | నెట్‌వర్క్, అనుమతి, రూట్ సమస్యలను సరిచేయడం | ప్రొడక్షన్-సిద్ధ నమ్మకాద్వారా |

---

## 📖 దశల వారీ అమలు

### దశ 1: ఏజెంట్ బిల్డర్‌లో GitHub ఏజెంట్ సృష్టించు

1. Microsoft Foundry Toolkit ఎక్స్‌టెన్షన్ ద్వారా **ఏజెంట్ బిల్డర్** ని ప్రారంభించండి  
2. క్రింది కాన్ఫిగరేషన్ తో **కొత్త ఏజెంట్** సృష్టించండి:  
   ```
   Agent Name: GitHubAgent
   ```
  
3. **కస్టమ్ MCP సర్వర్ ఆరంబించండి:**  
   - **Tools** → **Add Tool** → **MCP Server** కి వెళ్లండి  
   - **"Create A new MCP Server"** ఎంచుకోండి  
   - గరిష్ట ఫ్లెక్సిబిలిటీ కోసం **Python టెంప్లేట్** ఎంచుకోండి  
   - **సర్వర్ పేరు:** `git_mcp_server`

### దశ 2: GitHub Copilot Agent మోడ్‌ను సెట్టప్ చేయండి

1. VS కోడ్ లో GitHub Copilot (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open") తెరవండి  
2. Copilot ఇంటర్‌ఫేస్ లో ఏజెంట్ మోడల్ ఎంచుకోండి  
3. అభివృద్ధి గల వివరాత్మక విశ్లేషణ కోసం **Claude 3.7 మోడల్** ఎంచుకోండి  
4. టూల్ యాక్సెస్ కోసం MCP ఇంటిగ్రేషన్ చేర్చండి  

> **💡 ప్రో సూచన:** Claude 3.7 అభివృద్ధి వర్క్‌ఫ్లోలు మరియు ఎర్రర్ హ్యాండ్లింగ్ ప్యాటర్న్స్ లో మెరుగైన అవగాహన ఇస్తుంది.

### దశ 3: కోర్ MCP సర్వర్ ఫంక్షనాలిటీ అమలు చేయండి

**GitHub Copilot Agent మోడ్ తో ఈ వివరమైన ప్రాంప్ట్ ఉపయోగించండి:**  

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
  
### దశ 4: మీ MCP సర్వర్‌ను పరీక్షించండి

#### 4a. ఏజెంట్ బిల్డర్ లో పరీక్ష చేయండి

1. ఏజెంట్ బిల్డర్ కోసం డీబగ్ కాన్ఫిగరేషన్ ప్రారంభించండి  
2. మీ ఏజెంట్ ని ఈ సిస్టమ్ ప్రాంప్ట్ తో సెట్టప్ చేయండి:  

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```
  
3. వాస్తవవంతమైన యూజర్ పరిస్థితులతో పరీక్షించండి:  

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```
  
![Agent Builder Testing](../../../../translated_images/te/DebugAgent.81d152370c503241.webp)

**అంచనా ఫలితాలు:**
- ✅ మార్గ నిర్ధారణతో విజయవంతమైన క్లోనింగ్  
- ✅ స్వయంచాలక VS కోడ్ ప్రారంభం  
- ✅ చెల్లని పరిస్థితులకు స్పష్టమైన ఎర్రర్ సందేశాలు  
- ✅ అతి తీరుల పరిస్థితులకు సరైన నిర్వహణ  

#### 4b. MCP ఇన్స్‌పెక్టర్ లో పరీక్షించండి

![MCP Inspector Testing](../../../../translated_images/te/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 అభినందనలు!** మీరు విజయవంతంగా వాస్తవ అభివృద్ధి వర్క్‌ఫ్లో సవాళ్లను పరిష్కరించే ప్రాయోగిక, ఉత్పత్తి సిద్ధ MCP సర్వర్‌ను సృష్టించారు. మీ కస్టమ్ GitHub క్లోన్ సర్వర్ MCP శక్తిని ప్రదర్శించి డెవలపర్ ఉత్పాదకతను ఆటోమేటు చేస్తుంది.

### 🏆 సాధన గుర్తింపు:
- ✅ **MCP డెవలపర్** - కస్టమ్ MCP సర్వర్ సృష్టించారు  
- ✅ **వర్క్‌ఫ్లో ఆటోమేటర్** - అభివృద్ధి ప్రక్రియలను సులభతరం చేశారు  
- ✅ **ఇంటిగ్రేషన్ నిపుణుడు** - పలు టూల్స్‌ను కనెక్ట్ చేశారు  
- ✅ **ప్రొడక్షన్ సిద్ధం** - అమరచే వీలైన పరిష్కారాలు నిర్మించారు  

---

## 🎓 వర్క్‌షాప్ పూర్తి: మీ మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ ప్రయాణం

**ప్రియమైన వర్క్‌షాప్ పాల్గొనేవారు,**

మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ వర్క్‌షాప్ నాలుగు మాడ్యూల్స్‌ను మీరు పూర్తి చేసినందుకు అభినందనలు! Microsoft Foundry Toolkit ప్రాథమిక సిద్దాంతాలు నుండి ప్రొడక్షన్-సిద్ధ MCP సర్వర్ల నిర్మాణం వరకు మీరు ఒక దూరం నడిచారు, అవి నిజమైన అభివృద్ధి సవాళ్లను పరిష్కరిస్తాయి.

### 🚀 మీ నేర్చుకునే మార్గం చరిత్ర:

**[Module 1](../lab1/README.md)**: Microsoft Foundry Toolkit ప్రాథమికాలు, మోడల్ పరీక్ష, మరియు మీ మొదటి AI ఏజెంట్ సృష్టించడం నేర్చుకున్నారు.

**[Module 2](../lab2/README.md)**: MCP వాస్తవ నిర్మాణం, Playwright MCP ఇంటిగ్రేషన్, మొదటి బ్రౌజర్ ఆటోమేషన్ ఏజెంట్ తయారీ ప్రావీణ్యం పొందారు.

**[Module 3](../lab3/README.md)**: వాతావరణ MCP సర్వరుతో కస్టమ్ MCP అభివృద్ధి, మరియు డీబగ్గింగ్ టూల్స్ లో సంపూర్ణ పరిజ్ఞానం సాధించారు.

**[Module 4](../lab4/README.md)**: ఇప్పుడు GitHub రిపాజిటరీ వర్క్‌ఫ్లో ఆటోమేషన్ టూల్ సృష్టిలో మీ కనుగొన్న ప్రతిభను ఉపయోగించారు.

### 🌟 మీ నైపుణ్యాలు:

- ✅ **Microsoft Foundry Toolkit పర్యావరణం**: మోడల్స్, ఏజెంట్లు, ఇంటిగ్రేషన్ నమూనాలు  
- ✅ **MCP ఆర్కిటెక్చర్**: క్లయింట్-సర్వర్ డిజైన్, ట్రాన్స్‌పోర్ట్ ప్రోటోకాల్‌లు, భద్రత  
- ✅ **డెవలపర్ టూల్స్**: ప్లేగ్రౌండ్ నుండి ఇన్‌స్పెక్టర్ వరకు, ప్రొడక్షన్ డిప్లాయ్‌మెంట్  
- ✅ **కస్టమ్ అభివృద్ధి**: మీకంటూ MCP సర్వర్లు నిర్మించడం, పరీక్షించడం, ప్రవేశపెట్టడం  
- ✅ **ప్రాయోగిక అభ్యాసాలు**: AIతో నిజ జీవిత వర్క్‌ఫ్లో సవాళ్ళను పరిష్కరించడం  

### 🔮 మీ తదుపరి దశలు:

1. **మీ స్వంత MCP సర్వర్ నిర్మించండి:** మీ ప్రత్యేక వర్క్‌ఫ్లోలను ఆటోమేట్ చేయడానికి ఈ నైపుణ్యాలను ఉపయోగించండి  
2. **MCP కమ్యూనిటీ లో చేరండి:** మీ సృష్టులను పంచుకుని ఇతరుల నుండి నేర్చుకోండి  
3. **అగ్రగామి ఇంటిగ్రేషన్ యత్నించండి:** MCP సర్వర్లను ఎంటర్ప్రైజ్ సిస్టమ్స్ తో కలుపుకోండి  
4. **ఓపెన్ సోర్స్ లో సహాయం చేయండి:** MCP టూలింగ్, డాక్యూమెంటేషన్ మెరుగుపరచడంలో భాగస్వామ్యం కావండి  

ఈ వర్క్‌షాప్ కేవలం ప్రారంభమే. మోడల్ కాంటెక్స్ట్ ప్రోటోకాల్ పరిసరాలు వేగంగా అభివృద్ది పొందుతున్నాయి, మీరు ఇప్పుడు AI ఆధారిత అభివృద్ధి టూల్స్ లో ముందుండటానికి సిద్ధంగా ఉన్నారు.

**మీ పాల్గొనడముకు మరియు నేర్చుకోడానికి మీ అంకితభావానికి ధన్యవాదాలు!**

ఈ వర్క్‌షాప్ మీ అభివృద్ధి ప్రయాణంలో AI టూల్స్ తో ఎలా నిర్మించాలో, ఎలా పరస్పర చర్య తీసుకోవాలో మార్గదర్శనం ఇచ్చిందని ఆశిస్తున్నాము.

**సంతోషంగా కోడింగ్ చేయండి!**

---

## తర్వాత ఏమిటి

మాడ్యూల్ 10 లోని అన్ని ల్యాబ్స్ పూర్తిచేసినందుకు అభినందనలు!

- తిరిగి: [Module 10 Overview](../README.md)  
- కొనసాగించండి: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->