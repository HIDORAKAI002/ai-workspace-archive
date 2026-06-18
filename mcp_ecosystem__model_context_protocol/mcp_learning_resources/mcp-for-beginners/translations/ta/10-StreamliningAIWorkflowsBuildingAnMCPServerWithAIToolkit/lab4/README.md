# 🐙 தொகுதி 4: நடைமுறை MCP அபிவிருத்தி - தனிப்பயன் GitHub கிளோன் சர்வர்

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ விரைவு தொடக்கம்:** 30 நிமிடங்களில் GitHub கிளோனிங் மற்றும் VS Code இணக்கத்தை தானாகச் செயல்படுத்தும் தயாரிப்பு-தயார் MCP சர்வரை உருவாக்குங்கள்!

## 🎯 கற்றல் குறிக்கோள்கள்

இந்த ஆய்வகத்துக் கைவல்லிய நோக்கங்கள்:

- ✅ உண்மையான அபிவிருத்தி பணிகளுக்கு தனிப்பயன் MCP சர்வரை உருவாக்குதல்
- ✅ MCP மூலமாக GitHub ரெப்போக்களை கிளோன் செய்வது
- ✅ VS Code மற்றும் Agent Builder உடன் தனிப்பயன் MCP சர்வர்களை இணைத்தல்
- ✅ GitHub Copilot Agent Mode ஐ தனிப்பயன் MCP கருவிகளுடன் பயன்படுத்துதல்
- ✅ தயாரிப்பு சூழல்களில் தனிப்பயன் MCP சர்வர்களை சோதித்து வெளியிடல்

## 📋 முன் தேவைகள்

- ஆய்வகங்கள் 1-3 முடித்திருத்தல் (MCP அடிப்படைகள் மற்றும் மேம்பட்ட அபிவிருத்தி)
- GitHub Copilot சந்தா ([இலவச பதிவு கிடைக்கும்](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit மற்றும் GitHub Copilot நீட்சிகளுடன் VS Code
- Git CLI நிறுவப்பட்டு அமைக்கப்பட்டிருப்பு

## 🏗️ திட்டத்தின் மேற்பார்வை

### **உண்மையான அபிவிருத்தி சவால்**
ஆபிவிருத்திகளாக, நாம் அடிக்கடி GitHub ரெப்போக்களை கிளோன் செய்து VS Code அல்லது VS Code Insiders இல் திறக்கிறோம். இந்த கையேட்டு செயல்முறை:

1. கமாண்ட் ப்ராம்ட் அல்லது டெர்மினல் திறக்கிறது
2. தேவையான கோப்பகத்துக்குச் செல்லுதல்
3. `git clone` கட்டளை இயக்குதல்
4. கிளோன் செய்யப்பட்ட கோப்பகத்தில் VS Codeஐத் திறக்குதல்

**எங்களின் MCP தீர்வு இதை ஒரே புத்திசாலி கட்டளையாக்குகிறது!**

### **நீங்கள் உருவாக்கப்போகும்து**
**GitHub Clone MCP Server** (`git_mcp_server`) இது:

| அம்சம் | விளக்கம் | பயன் |
|---------|-------------|---------|
| 🔄 **புத்திசாலி ரெப்போ கிளோனிங்** | சரிபார்ப்பு உடன் GitHub ரெப்போக்களை கிளோன் செய்தல் | தானாக பிழை சரிபார்ப்பு |
| 📁 **நுண்ணறிவு கோப்பக மேலாண்மை** | கோப்பகங்களை பாதுகாப்பாக சரிபார்த்து உருவாக்குதல் | மீளுருவாக்கலை தடுக்கும் |
| 🚀 **விவசாய VS Code ஒருங்கிணைத்தல்** | VS Code/Insiders இல் திட்டங்களை திறக்குதல் | பிரச்சனை இல்லா பணிப்பாடு மாற்றம் |
| 🛡️ **திடமான பிழை கையாளல்** | நெட்வோர், அனுமதி மற்றும் பாதை பிரச்சனைகளை கையாளுதல் | தயாரிப்பு நிலைக்கு பாதுகாப்பு |

---

## 📖 படிப்படியாக செயல்படுத்துதல்

### படி 1: Agent Builder இல் GitHub ஏஜெண்ட் உருவாக்கல்

1. Microsoft Foundry Toolkit நீட்சியின் மூலம் **Agent Builder** திறக்கவும்
2. பின்வரும் அமைப்புடன் புதிய ஏஜெண்ட் உருவாக்கவும்:
   ```
   Agent Name: GitHubAgent
   ```

3. **தனிப்பயன் MCP சர்வரை தொடங்கவும்:**
   - **Tools** → **Add Tool** → **MCP Server**
   - **"Create A new MCP Server"** தேர்ந்தெடுக்கவும்
   - அதிக ச flexibilit உடன் **Python மாதிரி** தேர்வு செய்யவும்
   - **Server Name:** `git_mcp_server`

### படி 2: GitHub Copilot Agent Mode அமைத்தல்

1. VS Code இல் **GitHub Copilot** திறக்கவும் (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot இடைமுகத்தில் **Agent Model** தேர்வு செய்யவும்
3. மேம்பட்ட தார்க்கिक திறனுக்காக **Claude 3.7 model** ஐ தேர்வு செய்யவும்
4. கருவிகள் அணுக MCP ஒருங்கிணைப்பை இயக்கு

> **💡 சிறந்த குறிப்புகள்:** Claude 3.7 அபிவிருத்தி பணிகளின் வேலைப்பாடுகள் மற்றும் பிழை கையாளும் நிலைமைகளை சிறப்பாகப் புரிந்து கொள்கிறது.

### படி 3: கொர் MCP சர்வர் செயல்பாடு அமல்படுத்துதல்

**GitHub Copilot Agent Mode உடன் பின்வரும் விரிவான குறிப்பு பயன்படுத்தவும்:**

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

### படி 4: உங்கள் MCP சர்வரை சோதிக்கவும்

#### 4a. Agent Builder இல் சோதனை

1. Agent Builder க்கான டீபக் வளமைப்பைத் தொடக்கு
2. உங்கள் ஏஜெண்டில் இந்த செட்டிங்கைப் பயன்படுத்தவும்:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. உண்மையான பயனர் சூழல்களுடன் சோதனை செய்யவும்:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/ta/DebugAgent.81d152370c503241.webp)

**எதிர்பார்க்கப்படும் முடிவுகள்:**
- ✅ பாதையை உறுதி செய்து வெற்றிகரமாக கிளோன் செய்தல்
- ✅ தானாக VS Code திறப்பு
- ✅ தவறான நிலைகளுக்கான தெளிவான பிழை செய்திகள்
- ✅ எல்லைக்கருத்துக்களை சரியாக கையாளுதல்

#### 4b. MCP Inspector இல் சோதனை

![MCP Inspector Testing](../../../../translated_images/ta/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 வாழ்த்துக்கள்!** நீங்கள் உண்மையான அபிவிருத்தி பணிசார்ந்த சவால்களைத் தீர்க்கும் நடைமுறை, தயாரிப்பு நிலையான MCP சர்வரை வெற்றிகரமாக உருவாக்கி உள்ளீர்கள். உங்கள் தனிப்பயன் GitHub கிளோன் சர்வர் MCP மூலம் அபிவிருத்தி உற்பத்தித்திறனை தானாகக் கூடியவாறு மேம்படுத்தும் சக்தியை காட்டுகிறது.

### 🏆 சாதனை பெற்ற இடம்:
- ✅ **MCP அபிவிருத்தி நிபுணர்** - தனிப்பயன் MCP சர்வர் உருவாக்கியவர்
- ✅ **வேலைப்பாடு தானியங்கி** - அபிவிருத்தி செயல்முறைகளை ஒருங்கிணைத்தவர்  
- ✅ **ஒற்றுமை நிபுணர்** - பல அபிவிருத்தி கருவிகளை இணைத்தவர்
- ✅ **உற்பத்திக்கு தயாரானவர்** - வெளியிடக்கூடிய தீர்வுகளை உருவாக்கியவர்

---

## 🎓 பணிமனை முடிவு: Model Context Protocol உடன் உங்கள் பயணம்

**அன்புடைய பணிமனை பங்கேற்பாளர்,**

Model Context Protocol பணிமனையின் அனைத்து நான்கு தொகுதிகளையும் வெற்றிகரமாக முடித்ததிற்கு வாழ்த்துக்கள்! நீங்கள் Microsoft Foundry Toolkit கோட்பாடுகளை அறிந்து எளிதில் தயாரிப்பு நிலை MCP சர்வர்களை உருவாக்கும் திறனைக் கொண்டுள்ளீர்கள், அவை உண்மையான அபிவிருத்தி சவால்களை தீர்க்க உதவுகின்றன.

### 🚀 உங்கள் கற்றல் பாதை சுருக்கம்:

**[தொகுதி 1](../lab1/README.md)**: Microsoft Foundry Toolkit அடிப்படைகளை ஆராய்ந்து, முதல் AI ஏஜெண்ட் உருவாக்கம்.

**[தொகுதி 2](../lab2/README.md)**: MCP கட்டமைப்பை கற்றல், Playwright MCP ஒற்றுமை மற்றும் முதல் உலாவி தானியங்கி ஏஜெண்ட்.

**[தொகுதி 3](../lab3/README.md)**: வானிலை MCP சர்வர் மூலம் தனிப்பயன் MCP சர்வர் அபிவிருத்தி மற்றும் பிழைபிடிப்பு கருவிகள் கற்றல்.

**[தொகுதி 4](../lab4/README.md)**: உண்மையான GitHub ரெப்போ வேலைப்பாட்டை தானியக்கமாக்கும் கருவியை உருவாக்குதல்.

### 🌟 நீங்கள் கற்றுக்கொண்டதெல்லாம்:

- ✅ **Microsoft Foundry Toolkit சூழல்**: மாதிரிகள், ஏஜெண்ட்கள் மற்றும் ஒருங்கிணைப்பு மாதிரிகள்
- ✅ **MCP கட்டமைப்பு**: கிளையண்ட்-சர்வர் வடிவமைப்பு, போக்குவரத்து நெறிமுறைகள் மற்றும் பாதுகாப்பு
- ✅ **அபிவிருத்தி கருவிகள்**: Playground, Inspector மற்றும் தயாரிப்பு வெளியீடு வரை
- ✅ **தனிப்பயன் அபிவிருத்தி**: MCP சர்வர்களை உருவாக்கி சோதித்து வெளியிடுதல்
- ✅ **நடைமுறை பயன்பாடுகள்**: AI மூலம் உண்மையான வேலைப்பாடு சவால்களைத் தீர்க்கும் திறன்

### 🔮 அடுத்து என்ன செய்ய வேண்டும்:

1. **உங்கள் MCP சர்வரை உருவாக்குங்கள்**: உங்கள் தனிப்பட்ட வேலைப்பாடுகளை தானியக்கப்படுத்தவும்
2. **MCP சமூகத்தில் சேர்ந்து**: உங்கள் படைப்புகளை பகிர்ந்து மற்றவர்களிடமிருந்து கற்றுக்கொள்ளுங்கள்
3. **மேம்பட்ட ஒருங்கிணைப்பு ஆராயுங்கள்**: MCP சர்வர்களை நிறுவன அமைப்புகளுடன் இணைக்கவும்
4. **திறந்த மூலத்திற்கு பங்களிக்கவும்**: MCP கருவி மற்றும் ஆவணங்களைச் சீரமைக்க உதவுங்கள்

இந்த பணிமனை தான் தொடக்கம். Model Context Protocol சூழல் விரைவாக மேம்படுகிறது, நீங்கள் இப்போது AI-ஆல் இயக்கப்படும் அபிவிருத்தி கருவிகளில் முன்னணி ஆக தயாராக உள்ளீர்கள்.

**உங்கள் பங்கேற்புக்கும் கற்றலுக்குமான அர்ப்பணிப்புக்கும் நன்றி!**

இந்த பணிமனை உங்கள் அபிவிருத்தி பயணத்தில் AI கருவிகளை உருவாக்கும் மற்றும் பயன்படுத்தும் முறைகளில் புரட்சியை ஏற்படுத்தும் என் தூண்டும் எண்ணங்களை எழுப்பியிருக்கிறது என்று நம்புகிறோம்.

**மகிழ்ச்சியான நிரலாக்கம்!**

---

## அடுத்தது என்ன

தொகுதி 10 இல் அனைத்து ஆய்வகங்களையும் முடித்ததற்கு வாழ்த்துக்கள்!

- மீண்டும்: [தொகுதி 10 மேற்பார்வை](../README.md)
- தொடர: [தொகுதி 11: MCP Server Practical Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->