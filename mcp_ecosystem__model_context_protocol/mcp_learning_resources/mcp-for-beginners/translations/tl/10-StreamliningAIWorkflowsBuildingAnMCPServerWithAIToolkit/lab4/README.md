# 🐙 Module 4: Praktikal na Pagbuo ng MCP - Custom GitHub Clone Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Mabilisang Simula:** Gumawa ng production-ready MCP server na awtomatikong nagki-clone ng GitHub repository at may VS Code integration sa loob lamang ng 30 minuto!

## 🎯 Mga Layunin sa Pag-aaral

Sa pagtatapos ng lab na ito, magagawa mong:

- ✅ Lumikha ng custom MCP server para sa totoong workflow ng pag-develop
- ✅ Ipatupad ang GitHub repository cloning gamit ang MCP
- ✅ Isanib ang custom MCP servers sa VS Code at Agent Builder
- ✅ Gamitin ang GitHub Copilot Agent Mode kasama ang custom MCP tools
- ✅ Subukan at i-deploy ang custom MCP servers sa production environment

## 📋 Mga Kinakailangan

- Natapos ang Labs 1-3 (mga pundasyon at advanced na pagbuo sa MCP)
- Subscription sa GitHub Copilot ([may libreng signup](https://github.com/github-copilot/signup))
- VS Code na may Microsoft Foundry Toolkit at GitHub Copilot extensions
- Naka-install at naka-configure ang Git CLI

## 🏗️ Pangkalahatang-ideya ng Proyekto

### **Tunay na Hamon sa Pag-develop**
Bilang mga developer, madalas nating ginagamit ang GitHub para mag-clone ng repositories at buksan ito sa VS Code o VS Code Insiders. Ang manwal na prosesong ito ay kinabibilangan ng:
1. Pagbukas ng terminal/command prompt
2. Pagpunta sa nais na direktoryo
3. Pag-running ng `git clone` na utos
4. Pagbukas ng VS Code sa cloned na direktoryo

**Pinapadali ng aming solusyon sa MCP ang prosesong ito sa isang matalinong utos lang!**

### **Ano ang Iyong Bubuuin**
Isang **GitHub Clone MCP Server** (`git_mcp_server`) na nagbibigay:

| Tampok | Paglalarawan | Benepisyo |
|---------|-------------|---------|
| 🔄 **Matalinong Pag-clone ng Repository** | Mag-clone ng GitHub repos na may pagpapatunay | Awtomatikong pagche-check ng error |
| 📁 **Matalinong Pamamahala ng Direktoryo** | Suriin at likhain ang mga direktoryo nang ligtas | Pinipigilan ang pagkakapalit |
| 🚀 **Cross-Platform VS Code Integration** | Buksan ang mga proyekto sa VS Code/Insiders | Walang sagabal na paglipat ng workflow |
| 🛡️ **Matibay na Paghawak ng Error** | Harapin ang network, permiso, at mga isyu sa path | Production-ready na pagiging maaasahan |

---

## 📖 Hakbang-hakbang na Implementasyon

### Hakbang 1: Gumawa ng GitHub Agent sa Agent Builder

1. **Buksan ang Agent Builder** gamit ang Microsoft Foundry Toolkit extension
2. **Lumikha ng bagong agent** gamit ang sumusunod na configuration:
   ```
   Agent Name: GitHubAgent
   ```

3. **Simulan ang custom MCP server:**
   - Pumunta sa **Tools** → **Add Tool** → **MCP Server**
   - Piliin ang **"Create A new MCP Server"**
   - Piliin ang **Python template** para sa pinakamaraming fleksibilidad
   - **Pangalan ng Server:** `git_mcp_server`

### Hakbang 2: I-configure ang GitHub Copilot Agent Mode

1. **Buksan ang GitHub Copilot** sa VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Piliin ang Agent Model** sa Copilot interface
3. **Piliin ang Claude 3.7 model** para sa pinalawak na kakayahan sa pangangatwiran
4. **Enable ang MCP integration** para ma-access ang tool

> **💡 Tip:** Nagbibigay ang Claude 3.7 ng mas mahusay na pag-unawa sa mga workflow ng pag-develop at mga pattern ng paghawak ng error.

### Hakbang 3: Ipatupad ang Pangunahing Funktionalidad ng MCP Server

**Gamitin ang sumusunod na detalyadong prompt sa GitHub Copilot Agent Mode:**

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

### Hakbang 4: Subukan ang Iyong MCP Server

#### 4a. Subukan sa Agent Builder

1. **Simulan ang debug configuration** para sa Agent Builder
2. **I-configure ang iyong agent gamit ang sistemang prompt na ito:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Subukan gamit ang makatotohanang mga senaryo ng user:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/tl/DebugAgent.81d152370c503241.webp)

**Inaasahang Resulta:**
- ✅ Matagumpay na pag-clone na may kumpirmasyon sa path
- ✅ Awtomatikong paglulunsad ng VS Code
- ✅ Malinaw na mga error message para sa maling mga scenario
- ✅ Wastong paghawak ng mga edge cases

#### 4b. Subukan sa MCP Inspector


![MCP Inspector Testing](../../../../translated_images/tl/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Binabati kita!** Matagumpay mong nagawa ang isang praktikal, production-ready MCP server na sumusolusyon sa totoong hamon ng workflow sa pag-develop. Ang iyong custom GitHub clone server ay nagpapakita ng kapangyarihan ng MCP para sa awtomatiko at pagpapahusay ng produktibidad ng developer.

### 🏆 Mga Nakamit:
- ✅ **MCP Developer** - Lumikha ng custom MCP server
- ✅ **Workflow Automator** - Pinadali ang mga proseso ng pag-develop  
- ✅ **Integration Expert** - Nakakawing ng maraming development tools
- ✅ **Production Ready** - Gumawa ng mga solusyong handa nang i-deploy

---

## 🎓 Pagtatapos ng Workshop: Ang Iyong Paglalakbay sa Model Context Protocol

**Mahal na Kalahok sa Workshop,**

Binabati kita sa pagtatapos ng apat na modules ng Model Context Protocol workshop! Malaki ang iyong nalakbay mula sa pag-unawa sa mga pundasyon ng Microsoft Foundry Toolkit hanggang sa pagbuo ng production-ready MCP servers na sumusolusyon sa totoong hamon ng pag-develop.

### 🚀 Balik-aral ng Iyong Natutunan:

**[Module 1](../lab1/README.md)**: Nagsimula ka sa pag-aaral ng mga pundasyon ng Microsoft Foundry Toolkit, pagsubok ng mga modelo, at paggawa ng iyong unang AI agent.

**[Module 2](../lab2/README.md)**: Natutunan mo ang arkitektura ng MCP, isinangkot ang Playwright MCP, at bumuo ng iyong unang agent para sa browser automation.

**[Module 3](../lab3/README.md)**: Umusad ka sa custom MCP server development gamit ang Weather MCP server at pinahusay ang iyong kakayahan sa debugging tools.

**[Module 4](../lab4/README.md)**: Ngayon ay naipamalas mo na ang lahat upang gumawa ng praktikal na tool na awtomatiko para sa workflow ng GitHub repository.

### 🌟 Mga Nakamtan Mo:

- ✅ **Microsoft Foundry Toolkit Ecosystem**: Mga modelo, agent, at mga pattern ng integrasyon
- ✅ **MCP Architecture**: Client-server na disenyo, mga protocol sa transport, at seguridad
- ✅ **Developer Tools**: Mula Playground hanggang Inspector at production deployment
- ✅ **Custom Development**: Paggawa, pagsubok, at pag-deploy ng sarili mong MCP servers
- ✅ **Praktikal na Aplikasyon**: Pagsusolusyon sa totoong workflow gamit ang AI

### 🔮 Mga Susunod Mong Hakbang:

1. **Gumawa ng Sariling MCP Server**: I-apply ang mga kasanayang ito para i-automate ang iyong mga natatanging workflow
2. **Sumali sa MCP Community**: Ibahagi ang iyong mga gawa at matuto mula sa iba
3. **Siyasatin ang Advanced Integration**: Ikonekta ang MCP servers sa mga enterprise system
4. **Mag-ambag sa Open Source**: Tumulong sa pagpapabuti ng MCP tooling at dokumentasyon

Tandaan, ang workshop na ito ay simula pa lamang. Ang Model Context Protocol ecosystem ay mabilis na umuunlad, at ngayon ay handa ka nang maging nangunguna sa mga AI-powered na development tools.

**Salamat sa iyong partisipasyon at dedikasyon sa pag-aaral!**

Inaasahan naming ang workshop na ito ay nakapagbigay sa iyo ng mga ideya na magbabago kung paano ka gagawa at makikipag-ugnayan sa mga AI tool sa iyong paglalakbay sa pag-develop.

**Maligayang pag-cocode!**

---

## Ano ang Susunod

Binabati kita sa pagtatapos ng lahat ng labs sa Module 10!

- Bumalik sa: [Module 10 Overview](../README.md)
- Magpatuloy sa: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->